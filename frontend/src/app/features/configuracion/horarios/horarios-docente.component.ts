import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, firstValueFrom, forkJoin, of } from 'rxjs';
import {
  Anio, Asignacion, Aula, Bloque, ClaseHorario, DIAS_SEMANA, Docente, MallaGrado, Seccion, Turno
} from '../../../core/models/planificacion.model';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ConfigHeroComponent } from '../../../shared/components/config-hero/config-hero.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import {
  ETIQUETA_ESTADO_DOCENTE, Mallas, OpcionClase, cargaDeAsignaciones, claveCelda, cursosLibresDeSeccion, opcionesParaRectangulo,
  resumenDocentes, seccionesDelTurno, turnosDelDocente
} from './horario-docente';

/** Un rectángulo de la grilla: un bloque de un día. */
interface Celda {
  bloque: Bloque;
  dia: number;
}

/** El cuadro abierto: las celdas a las que se pone clase (vacío = solo asignar un curso) y la clase que se edita, si hay. */
interface Dialogo {
  celdas: Celda[];
  clase: ClaseHorario | null;
}

const DIAS = [1, 2, 3, 4, 5];
const NOMBRE_TURNO: Record<Turno, string> = { MANANA: 'Mañana', TARDE: 'Tarde' };

/**
 * Horario por docente (Configuración → Horario del docente). Se elige a un docente de la lista y se ve su semana en una grilla de
 * rectángulos (bloques × días): al tocar uno vacío se selecciona (se pueden marcar varios) y se le pone la clase de un curso que ya tiene
 * asignado, o se le asigna ahí mismo un curso nuevo de una sección. Lo que se arma aquí es el horario de cada grado (la misma tabla que
 * ve Horarios por sección); el servidor sigue rechazando choques de docente, aula y sección.
 */
@Component({
  selector: 'app-horarios-docente',
  imports: [ReactiveFormsModule, FormsModule, RouterLink, ConfigHeroComponent, ModalComponent],
  template: `
    <div class="page n-primaria">
      <app-config-hero titulo="Horario del docente" subtitulo="Elige a un docente y arma su semana tocando los rectángulos: así queda definido el horario de cada grado."
                       icono="M4 5h16v15H4zM4 10h16M10 5v15" />

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }
      @if (sinAnio()) {
        <div class="aviso aviso-warn" role="status">No hay un año activo ni planificado. Ábrelo en <a routerLink="/apertura"><strong>Apertura de periodo</strong></a> para poder armar horarios.</div>
      }

      <div class="cuerpo">
        <!-- Lista de docentes con el avance de su horario -->
        <aside class="lista" aria-label="Docentes">
          <div class="lista-cab">
            <select class="input" [ngModel]="anioId()" (ngModelChange)="cambiarAnio(+$event)" aria-label="Año académico">
              @for (a of anios(); track a.id) { <option [ngValue]="a.id">Año {{ a.nombre }}</option> }
            </select>
            <input class="input" type="search" placeholder="Buscar docente" aria-label="Buscar docente" [ngModel]="busqueda()" (ngModelChange)="busqueda.set($event)" />
          </div>
          <div class="lista-cuerpo">
            @for (r of resumenesVisibles(); track r.docente.id) {
              <button type="button" class="docente" [class.on]="r.docente.id === docenteId()" (click)="elegirDocente(r.docente.id)"
                      [attr.aria-label]="r.docente.apellidos + ', ' + r.docente.nombres + ': ' + r.programadas + ' de ' + r.requeridas + ' horas'">
                <span class="nombre"><strong>{{ r.docente.apellidos }}, {{ r.docente.nombres }}</strong>
                  <small>{{ r.asignaciones ? r.asignaciones + (r.asignaciones === 1 ? ' curso' : ' cursos') + ' · ' + r.programadas + ' de ' + r.requeridas + ' h' : 'Sin cursos asignados' }}</small></span>
                <span [class]="'est ' + r.estado">{{ etiquetaEstado[r.estado] }}</span>
              </button>
            } @empty {
              <p class="muted pad">{{ cargando() ? 'Cargando…' : 'Ningún docente coincide.' }}</p>
            }
          </div>
        </aside>

        <!-- Su semana -->
        <section class="detalle" aria-label="Horario del docente">
          @if (docente(); as d) {
            <header class="enc">
              <div>
                <h2>{{ d.apellidos }}, {{ d.nombres }}</h2>
                <span class="muted">{{ horasProgramadas() }} de {{ horasRequeridas() }} h programadas en la semana</span>
              </div>
              <div class="acciones">
                <button type="button" class="btn" (click)="abrirNuevoCurso()">Asignar otro curso</button>
              </div>
            </header>

            <div class="cargas" aria-label="Cursos del docente">
              @for (c of cargas(); track c.asignacion.id) {
                <span class="carga" [class.completa]="c.requeridas > 0 && c.programadas >= c.requeridas" [style.--tono]="tono(c.asignacion.cursoId)">
                  <strong>{{ c.asignacion.cursoNombre }}</strong>
                  <small>{{ c.seccion?.gradoNombre }} «{{ c.seccion?.nombre }}» · {{ c.programadas }}/{{ c.requeridas }} h</small>
                </span>
              } @empty {
                <span class="muted">Este docente todavía no tiene cursos asignados: toca un rectángulo o «Asignar otro curso» para dárselos aquí mismo.</span>
              }
            </div>

            @if (seleccion().length) {
              <div class="barra-sel" role="status">
                <span><strong>{{ seleccion().length }}</strong> {{ seleccion().length === 1 ? 'bloque seleccionado' : 'bloques seleccionados' }}</span>
                <button type="button" class="btn btn-primary btn-sm" (click)="abrirSeleccion()">Poner clase…</button>
                <button type="button" class="btn btn-sm" (click)="limpiarSeleccion()">Quitar selección</button>
              </div>
            } @else {
              <p class="ayuda">Toca los rectángulos vacíos para seleccionarlos (puedes marcar varios) y luego «Poner clase…». Toca una clase para cambiarla o quitarla.</p>
            }

            @for (t of turnos(); track t) {
              <div class="turno">
                <h3>{{ nombreTurno[t] }}</h3>
                <div class="table-wrap">
                  <table class="grilla">
                    <thead>
                      <tr><th scope="col">Hora</th>@for (dia of dias; track dia) { <th scope="col">{{ nombreDia(dia) }}</th> }</tr>
                    </thead>
                    <tbody>
                      @for (b of bloquesDe(t); track b.id) {
                        <tr [class.receso]="b.esReceso">
                          <th scope="row" class="hora">{{ hora(b.horaInicio) }}<br /><span class="muted">{{ hora(b.horaFin) }}</span></th>
                          @if (b.esReceso) {
                            <td [attr.colspan]="dias.length" class="receso-txt">Receso</td>
                          } @else {
                            @for (dia of dias; track dia) {
                              <td>
                                @if (claseEn(b, dia); as c) {
                                  <button type="button" class="clase" [style.--tono]="tono(c.cursoId)" (click)="abrirClase(c, b, dia)"
                                          [attr.aria-label]="c.cursoNombre + ', ' + c.seccionNombre + ', ' + nombreDia(dia) + ' ' + hora(b.horaInicio)">
                                    <strong>{{ c.cursoNombre }}</strong>
                                    <span>{{ c.seccionNombre }}</span>
                                    @if (c.aulaNombre) { <span class="muted">{{ c.aulaNombre }}</span> }
                                  </button>
                                } @else {
                                  <button type="button" class="vacia" [class.sel]="estaSeleccionada(b, dia)" [attr.aria-pressed]="estaSeleccionada(b, dia)"
                                          (click)="alternarCelda(b, dia)" [attr.aria-label]="(estaSeleccionada(b, dia) ? 'Quitar de la selección ' : 'Seleccionar ') + nombreDia(dia) + ' ' + hora(b.horaInicio)">
                                    {{ estaSeleccionada(b, dia) ? '✓' : '+' }}
                                  </button>
                                }
                              </td>
                            }
                          }
                        </tr>
                      } @empty {
                        <tr><td [attr.colspan]="dias.length + 1" class="vacio">No hay bloques horarios para el turno {{ nombreTurno[t].toLowerCase() }}. Créalos en Bloques horarios.</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }
          } @else {
            <div class="vacio-guia">{{ cargando() ? 'Cargando…' : 'Elige a un docente de la lista para ver y armar su horario.' }}</div>
          }
        </section>
      </div>
    </div>

    @if (dialogo(); as dg) {
      <app-modal [titulo]="tituloDialogo()" [ancho]="560" (cerrar)="cerrar()">
        <form [formGroup]="form" (ngSubmit)="guardar()" id="form-clase-docente" novalidate>
          @if (!dg.clase) {
            <div class="modos" role="radiogroup" aria-label="Qué hacer">
              <label [class.on]="form.controls.modo.value === 'asignada'" [class.off]="!cargas().length">
                <input type="radio" formControlName="modo" value="asignada" [attr.disabled]="cargas().length ? null : true" /> Un curso que ya tiene asignado
              </label>
              <label [class.on]="form.controls.modo.value === 'nueva'">
                <input type="radio" formControlName="modo" value="nueva" /> Asignarle un curso nuevo ahora
              </label>
            </div>
          }

          <div class="form-grid">
            @if (form.controls.modo.value === 'asignada') {
              <div class="field full">
                <label for="hd-asig">{{ dg.clase ? 'Curso de esta clase' : 'Curso' }}</label>
                <select id="hd-asig" formControlName="asignacionId">
                  <option [ngValue]="0" disabled>Elige…</option>
                  @for (o of opcionesDialogo(); track o.carga.asignacion.id) {
                    <option [ngValue]="o.carga.asignacion.id" [disabled]="!!o.impedimento">
                      {{ o.carga.asignacion.cursoNombre }} · {{ o.carga.seccion?.gradoNombre }} «{{ o.carga.seccion?.nombre }}» ({{ o.carga.programadas }}/{{ o.carga.requeridas }} h){{ o.impedimento ? ' — ' + o.texto : '' }}
                    </option>
                  }
                </select>
              </div>
            } @else {
              <div class="field">
                <label for="hd-sec">Sección</label>
                <select id="hd-sec" formControlName="seccionId">
                  <option [ngValue]="0" disabled>Elige…</option>
                  @for (s of seccionesDialogo(); track s.id) {
                    <option [ngValue]="s.id" [disabled]="seccionOcupada(s)">{{ s.gradoNombre }} «{{ s.nombre }}»{{ seccionOcupada(s) ? ' — ya tiene clase a esa hora' : '' }}</option>
                  }
                </select>
              </div>
              <div class="field">
                <label for="hd-curso">Curso</label>
                <select id="hd-curso" formControlName="cursoId">
                  <option [ngValue]="0" disabled>{{ form.controls.seccionId.value ? (cursosLibres().length ? 'Elige…' : 'No quedan cursos sin docente') : 'Elige primero la sección' }}</option>
                  @for (c of cursosLibres(); track c.cursoId) { <option [ngValue]="c.cursoId">{{ c.nombre }} ({{ c.horas }} h)</option> }
                </select>
              </div>
            }
            @if (dg.celdas.length) {
              <div class="field full">
                <label for="hd-aula">Aula (opcional)</label>
                <select id="hd-aula" formControlName="aulaId">
                  <option [ngValue]="0">Aula de la sección</option>
                  @for (a of aulas(); track a.id) { <option [ngValue]="a.id" [disabled]="aulaOcupada(a.id)">{{ a.nombre }} ({{ a.tipo }}){{ aulaOcupada(a.id) ? ' — ocupada' : '' }}</option> }
                </select>
              </div>
              <div class="field full">
                <span class="muted">{{ dg.clase ? 'Se cambia esta clase.' : (dg.celdas.length === 1 ? 'Se pone 1 clase: ' : 'Se ponen ' + dg.celdas.length + ' clases: ') }}{{ resumenCeldas() }}</span>
              </div>
            }
          </div>
          @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
        </form>
        <ng-container footer>
          @if (dg.clase) { <button type="button" class="btn" (click)="quitar()" style="margin-right: auto">Quitar clase</button> }
          <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
          <button type="submit" form="form-clase-docente" class="btn btn-primary" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : textoGuardar() }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .cuerpo { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 16px; align-items: start; }
    .lista { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; position: sticky; top: 12px; max-height: calc(100vh - 40px); }
    .lista-cab { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-bottom: 1px solid var(--line); }
    .lista-cuerpo { overflow-y: auto; display: flex; flex-direction: column; }
    .pad { padding: 16px; margin: 0; }
    .docente { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; text-align: left; font: inherit; color: inherit; background: none; border: 0; border-bottom: 1px solid var(--line); cursor: pointer; }
    .docente:hover { background: var(--bg); }
    .docente.on { background: var(--primary-soft); box-shadow: inset 4px 0 0 var(--primary); }
    .docente .nombre { min-width: 0; display: flex; flex-direction: column; }
    .docente .nombre strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .9rem; }
    .docente .nombre small { color: var(--ink-2); font-size: .74rem; }
    .est { flex: none; padding: 2px 8px; border-radius: 999px; font-size: .62rem; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
    .est.completo { color: var(--ok); background: var(--ok-soft); }
    .est.incompleto { color: #8a5a00; background: #fff1cf; }
    .est.sin-horario { color: var(--warn); background: var(--warn-soft); }
    .est.sin-asignaciones { color: var(--ink-2); background: var(--line); }
    .detalle { min-width: 0; display: flex; flex-direction: column; gap: 12px; }
    .enc { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
    .enc h2 { margin: 0; font-size: 1.2rem; }
    .cargas { display: flex; flex-wrap: wrap; gap: 8px; }
    .carga { display: inline-flex; flex-direction: column; padding: 6px 12px; border-radius: 12px; border: 1.5px solid hsl(var(--tono, 220) 55% 70%); background: hsl(var(--tono, 220) 80% 95%); font-size: .82rem; }
    .carga small { color: var(--ink-2); font-size: .72rem; }
    .carga.completa { opacity: .75; }
    .ayuda { margin: 0; color: var(--ink-2); font-size: .85rem; }
    .barra-sel { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 8px 12px; border-radius: 12px; background: var(--primary-soft); border: 1.5px solid var(--primary); position: sticky; top: 8px; z-index: 2; }
    .turno h3 { margin: 0 0 6px; font-size: .78rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .grilla { width: 100%; border-collapse: separate; border-spacing: 4px; table-layout: fixed; }
    .grilla th { font-size: .75rem; color: var(--ink-2); font-weight: 700; padding: 4px; }
    .grilla th.hora { width: 64px; font-variant-numeric: tabular-nums; }
    .grilla td { padding: 0; height: 64px; vertical-align: stretch; }
    .receso-txt { text-align: center; color: var(--ink-2); font-size: .8rem; background: repeating-linear-gradient(45deg, var(--bg), var(--bg) 6px, var(--line) 6px, var(--line) 7px); border-radius: 8px; height: 28px !important; }
    .clase, .vacia { width: 100%; height: 100%; min-height: 56px; border-radius: 10px; font: inherit; cursor: pointer; }
    .clase { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 1px; padding: 6px 8px; text-align: left; color: var(--ink); border: 1.5px solid hsl(var(--tono, 220) 55% 62%); background: hsl(var(--tono, 220) 85% 92%); }
    .clase strong { font-size: .8rem; line-height: 1.15; }
    .clase span { font-size: .7rem; }
    .clase:hover { filter: brightness(.97); box-shadow: 0 2px 8px rgba(0,0,0,.12); }
    .vacia { display: grid; place-items: center; color: var(--ink-2); font-size: 1.1rem; background: var(--card); border: 1.5px dashed var(--line-2); }
    .vacia:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-soft); }
    .vacia.sel { border-style: solid; border-color: var(--primary); background: var(--primary); color: #fff; font-weight: 900; }
    .vacio, .vacio-guia { padding: 28px; text-align: center; color: var(--ink-2); }
    .vacio-guia { border: 2px dashed var(--line-2); border-radius: 16px; }
    .modos { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
    .modos label { flex: 1 1 200px; display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1.5px solid var(--line-2); border-radius: 12px; cursor: pointer; font-weight: 600; font-size: .88rem; }
    .modos label.on { border-color: var(--primary); background: var(--primary-soft); }
    .modos label.off { opacity: .5; cursor: not-allowed; }
    @media (max-width: 1000px) { .cuerpo { grid-template-columns: minmax(0, 1fr); } .lista { position: static; max-height: 280px; } }
    @media (max-width: 640px) { .grilla { border-spacing: 2px; } .grilla td { height: 54px; } .grilla th.hora { width: 48px; } .clase strong { font-size: .7rem; } .clase span { font-size: .62rem; } }
  `
})
export class HorariosDocenteComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly dias = DIAS;
  protected readonly nombreTurno = NOMBRE_TURNO;
  protected readonly etiquetaEstado = ETIQUETA_ESTADO_DOCENTE;
  protected readonly nombreDia = (d: number): string => DIAS_SEMANA[d];
  protected readonly hora = (h: string): string => h.slice(0, 5);

  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly sinAnio = signal(false);
  protected readonly anios = signal<Anio[]>([]);
  protected readonly anioId = signal(0);
  private readonly docentes = signal<Docente[]>([]);
  private readonly secciones = signal<Seccion[]>([]);
  private readonly mallas = signal<Mallas>({});
  private readonly bloques = signal<Bloque[]>([]);
  protected readonly aulas = signal<Aula[]>([]);
  private readonly asignacionesAnio = signal<Asignacion[]>([]);
  private readonly clasesAnio = signal<ClaseHorario[]>([]);

  protected readonly busqueda = signal('');
  protected readonly docenteId = signal<number | null>(null);
  protected readonly seleccion = signal<Celda[]>([]);
  protected readonly dialogo = signal<Dialogo | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    modo: ['asignada' as 'asignada' | 'nueva'],
    asignacionId: [0],
    seccionId: [0],
    cursoId: [0],
    aulaId: [0]
  });
  /** Lo que se elige en el cuadro, como señales (los formularios no son reactivos para los computed). */
  private readonly vista = signal(this.form.getRawValue());

  // ---- Lista de docentes ----
  private readonly resumenes = computed(() => resumenDocentes(this.docentes(), this.asignacionesAnio(), this.clasesAnio(), this.secciones(), this.mallas()));
  protected readonly resumenesVisibles = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    return this.resumenes().filter(r => !q || `${r.docente.apellidos} ${r.docente.nombres}`.toLowerCase().includes(q));
  });

  // ---- Docente elegido ----
  protected readonly docente = computed(() => this.docentes().find(d => d.id === this.docenteId()) ?? null);
  private readonly clasesDocente = computed(() => this.clasesAnio().filter(c => c.docenteId === this.docenteId()));
  protected readonly cargas = computed(() => cargaDeAsignaciones(this.asignacionesAnio().filter(a => a.docenteId === this.docenteId()), this.clasesDocente(), this.secciones(), this.mallas()));
  protected readonly horasRequeridas = computed(() => this.cargas().reduce((s, c) => s + c.requeridas, 0));
  protected readonly horasProgramadas = computed(() => this.cargas().reduce((s, c) => s + c.programadas, 0));
  /** Los turnos de la grilla: solo los que tienen bloques, salvo que el docente ya tenga una sección de ese turno (entonces se avisa que faltan los bloques). */
  protected readonly turnos = computed(() => {
    const t = turnosDelDocente(this.cargas(), this.clasesDocente(), this.bloques());
    const conBloques = t.filter(x => this.bloques().some(b => b.turno === x) || this.cargas().some(c => c.turno === x));
    return conBloques.length ? conBloques : t;
  });
  private readonly porCelda = computed(() => {
    const m = new Map<string, ClaseHorario>();
    for (const c of this.clasesDocente()) m.set(claveCelda(c.bloqueId, c.diaSemana), c);
    return m;
  });

  protected bloquesDe(t: Turno): Bloque[] {
    return this.bloques().filter(b => b.turno === t).sort((a, b) => a.orden - b.orden);
  }

  protected claseEn(b: Bloque, dia: number): ClaseHorario | undefined {
    return this.porCelda().get(claveCelda(b.id, dia));
  }

  /** Un tono (matiz de color) estable por curso, para que se distingan de un vistazo. */
  protected tono(cursoId: number): number {
    return (cursoId * 47) % 360;
  }

  // ---- Selección de rectángulos ----
  protected estaSeleccionada(b: Bloque, dia: number): boolean {
    return this.seleccion().some(c => c.bloque.id === b.id && c.dia === dia);
  }

  protected alternarCelda(b: Bloque, dia: number): void {
    if (this.estaSeleccionada(b, dia)) return this.seleccion.update(s => s.filter(c => !(c.bloque.id === b.id && c.dia === dia)));
    // Una clase es de un solo turno: al marcar un rectángulo de otro turno se empieza una selección nueva.
    this.seleccion.update(s => [...s.filter(c => c.bloque.turno === b.turno), { bloque: b, dia }]);
  }

  protected limpiarSeleccion(): void {
    this.seleccion.set([]);
  }

  // ---- Carga ----
  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => this.vista.set(this.form.getRawValue()));
    // Al cambiar la sección del cuadro, el curso elegido ya no vale.
    this.form.controls.seccionId.valueChanges.subscribe(() => this.form.controls.cursoId.setValue(0, { emitEvent: true }));
    this.api.anios().pipe(catchError(() => of([] as Anio[]))).subscribe(anios => {
      this.anios.set(anios);
      const a = anios.find(x => x.estado === 'ACTIVO') ?? anios.find(x => x.estado === 'PLANIFICADO');
      if (!a) { this.sinAnio.set(true); this.cargando.set(false); return; }
      this.anioId.set(a.id);
      this.cargar();
    });
  }

  protected cambiarAnio(id: number): void {
    this.anioId.set(id);
    this.docenteId.set(null);
    this.seleccion.set([]);
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.error.set(null);
    const anio = this.anioId();
    forkJoin({
      docentes: this.api.docentes('', 0, 200).pipe(catchError(() => of({ contenido: [] as Docente[] }))),
      secciones: this.api.secciones(anio),
      bloques: this.api.bloques(),
      aulas: this.api.aulas().pipe(catchError(() => of([] as Aula[]))),
      asignaciones: this.api.asignaciones(undefined, undefined, anio).pipe(catchError(() => of([] as Asignacion[]))),
      clases: this.api.horariosAnio(anio).pipe(catchError(() => of([] as ClaseHorario[])))
    }).subscribe({
      next: ({ docentes, secciones, bloques, aulas, asignaciones, clases }) => {
        this.docentes.set(docentes.contenido.filter(d => d.estado === 'ACTIVO'));
        this.secciones.set(secciones);
        this.bloques.set(bloques);
        this.aulas.set(aulas.filter(a => a.activo));
        this.asignacionesAnio.set(asignaciones);
        this.clasesAnio.set(clases);
        const gradoIds = [...new Set(secciones.filter(s => s.activo).map(s => s.gradoId))];
        (gradoIds.length ? forkJoin(gradoIds.map(g => this.api.malla(g).pipe(catchError(() => of(null))))) : of([] as (MallaGrado | null)[])).subscribe(ms => {
          this.mallas.set(Object.fromEntries(gradoIds.map((g, i) => [g, ms[i]])));
          this.cargando.set(false);
        });
      },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar el horario.')); }
    });
  }

  /** Vuelve a pedir lo que cambia al poner o quitar clases y asignar cursos. */
  private refrescar(): Promise<void> {
    const anio = this.anioId();
    return firstValueFrom(forkJoin({
      asignaciones: this.api.asignaciones(undefined, undefined, anio).pipe(catchError(() => of(this.asignacionesAnio()))),
      clases: this.api.horariosAnio(anio).pipe(catchError(() => of(this.clasesAnio())))
    })).then(({ asignaciones, clases }) => { this.asignacionesAnio.set(asignaciones); this.clasesAnio.set(clases); });
  }

  protected elegirDocente(id: number): void {
    this.docenteId.set(id);
    this.seleccion.set([]);
  }

  // ---- Cuadro de clase ----
  protected abrirSeleccion(): void {
    if (!this.seleccion().length) return;
    this.abrir({ celdas: [...this.seleccion()].sort((a, b) => a.dia - b.dia || a.bloque.orden - b.bloque.orden), clase: null });
  }

  protected abrirClase(c: ClaseHorario, b: Bloque, dia: number): void {
    this.abrir({ celdas: [{ bloque: b, dia }], clase: c });
  }

  protected abrirNuevoCurso(): void {
    this.abrir({ celdas: [], clase: null }, 'nueva');
  }

  private abrir(d: Dialogo, modo?: 'asignada' | 'nueva'): void {
    this.errorForm.set(null);
    this.dialogo.set(d);
    const m = modo ?? (this.cargas().length ? 'asignada' : 'nueva');
    this.form.reset({ modo: m, asignacionId: d.clase?.asignacionId ?? 0, seccionId: 0, cursoId: 0, aulaId: d.clase?.aulaId ?? 0 });
    this.vista.set(this.form.getRawValue());
  }

  protected cerrar(): void {
    this.dialogo.set(null);
  }

  protected tituloDialogo(): string {
    const d = this.dialogo();
    const nombre = this.docente() ? `${this.docente()!.nombres} ${this.docente()!.apellidos}` : '';
    if (!d || !d.celdas.length) return `Asignar un curso a ${nombre}`;
    if (d.clase) return `Clase · ${this.nombreDia(d.celdas[0].dia)} ${this.hora(d.celdas[0].bloque.horaInicio)}–${this.hora(d.celdas[0].bloque.horaFin)}`;
    return d.celdas.length === 1
      ? `Poner clase · ${this.nombreDia(d.celdas[0].dia)} ${this.hora(d.celdas[0].bloque.horaInicio)}–${this.hora(d.celdas[0].bloque.horaFin)}`
      : `Poner clase en ${d.celdas.length} bloques`;
  }

  protected textoGuardar(): string {
    const d = this.dialogo();
    if (!d?.celdas.length) return 'Asignar curso';
    return d.clase ? 'Guardar' : d.celdas.length === 1 ? 'Poner clase' : `Poner ${d.celdas.length} clases`;
  }

  protected resumenCeldas(): string {
    return (this.dialogo()?.celdas ?? []).map(c => `${this.nombreDia(c.dia).slice(0, 3)} ${this.hora(c.bloque.horaInicio)}`).join(' · ');
  }

  /** Los cursos ya asignados con lo que impide ponerlos en TODOS los rectángulos elegidos. */
  protected readonly opcionesDialogo = computed<OpcionClase[]>(() => {
    const d = this.dialogo();
    if (!d) return [];
    const cargas = this.cargas();
    if (!d.celdas.length) return cargas.map(carga => ({ carga, impedimento: '', texto: '' }) satisfies OpcionClase);
    const porCelda = d.celdas.map(c => opcionesParaRectangulo(cargas, c.bloque, c.dia, this.clasesAnio(), d.clase));
    return cargas.map((carga, i) => {
      const mala = porCelda.map(o => o[i]).find(o => o.impedimento);
      const faltan = carga.requeridas - carga.programadas;
      if (mala) return mala;
      if (!d.clase && carga.requeridas > 0 && d.celdas.length > faltan) return { carga, impedimento: 'completo', texto: `solo le faltan ${faltan} h` } satisfies OpcionClase;
      return { carga, impedimento: '', texto: '' } satisfies OpcionClase;
    });
  });

  /** Secciones donde se le puede asignar un curso nuevo: las del turno de los bloques elegidos (todas las activas si no hay bloques). */
  protected readonly seccionesDialogo = computed(() => {
    const d = this.dialogo();
    const turno = d?.celdas[0]?.bloque.turno;
    return turno ? seccionesDelTurno(this.secciones(), turno) : this.secciones().filter(s => s.activo).sort((a, b) => a.nivelId - b.nivelId || a.gradoNombre.localeCompare(b.gradoNombre, 'es', { numeric: true }) || a.nombre.localeCompare(b.nombre, 'es'));
  });

  protected seccionOcupada(s: Seccion): boolean {
    const d = this.dialogo();
    return !!d?.celdas.some(c => this.clasesAnio().some(x => x.seccionId === s.id && x.bloqueId === c.bloque.id && x.diaSemana === c.dia));
  }

  protected readonly cursosLibres = computed(() => {
    const s = this.secciones().find(x => x.id === this.vista().seccionId);
    return s ? cursosLibresDeSeccion(s, this.mallas(), this.asignacionesAnio()) : [];
  });

  protected aulaOcupada(aulaId: number): boolean {
    const d = this.dialogo();
    return !!d?.celdas.some(c => this.clasesAnio().some(x => x.aulaId === aulaId && x.bloqueId === c.bloque.id && x.diaSemana === c.dia && x.id !== d.clase?.id));
  }

  protected async guardar(): Promise<void> {
    const d = this.dialogo();
    const docente = this.docente();
    if (!d || !docente) return;
    const v = this.form.getRawValue();
    this.errorForm.set(null);

    let asignacionId = v.asignacionId;
    if (v.modo === 'nueva') {
      if (!v.seccionId || !v.cursoId) return this.errorForm.set('Elige la sección y el curso que se le asignan.');
      const horas = this.cursosLibres().find(c => c.cursoId === v.cursoId)?.horas ?? 0;
      if (d.celdas.length && horas > 0 && d.celdas.length > horas) return this.errorForm.set(`Elegiste ${d.celdas.length} bloques pero este curso tiene ${horas} h por semana.`);
    } else {
      if (!asignacionId) return this.errorForm.set('Elige el curso.');
      const o = this.opcionesDialogo().find(x => x.carga.asignacion.id === asignacionId);
      if (o?.impedimento) return this.errorForm.set(`No se puede: ${o.texto}.`);
    }

    this.guardando.set(true);
    try {
      if (v.modo === 'nueva') {
        const a = await firstValueFrom(this.api.crearAsignacion({ seccionId: v.seccionId, cursoId: v.cursoId, docenteId: docente.id }));
        asignacionId = a.id;
      }
      if (!d.celdas.length) {
        await this.refrescar();
        this.avisos.success('Curso asignado. Ya puedes ponerle sus horas en la grilla.');
        this.dialogo.set(null);
        return;
      }
      const fallos: Celda[] = [];
      const motivos: string[] = [];
      let hechas = 0;
      for (const c of d.celdas) {
        const cuerpo = { asignacionId, bloqueId: c.bloque.id, diaSemana: c.dia, aulaId: v.aulaId || null };
        try {
          await firstValueFrom(d.clase ? this.api.actualizarClase(d.clase.id, cuerpo) : this.api.agregarClase(cuerpo));
          hechas++;
        } catch (e) {
          fallos.push(c);
          motivos.push(`${this.nombreDia(c.dia)} ${this.hora(c.bloque.horaInicio)}: ${mensajeError(e)}`);
        }
      }
      await this.refrescar();
      this.dialogo.set(null);
      this.seleccion.set(fallos);
      if (!fallos.length) this.avisos.success(d.clase ? 'Clase actualizada.' : hechas === 1 ? 'Clase puesta en el horario.' : `${hechas} clases puestas en el horario.`);
      else this.avisos.warning(`${hechas ? hechas + ' clase(s) puesta(s). ' : ''}No se pudo: ${motivos.join(' · ')}${v.modo === 'nueva' ? ' (el curso quedó asignado al docente)' : ''}`);
    } catch (e) {
      this.errorForm.set(mensajeError(e));
    } finally {
      this.guardando.set(false);
    }
  }

  protected async quitar(): Promise<void> {
    const c = this.dialogo()?.clase;
    if (!c) return;
    if (!(await this.confirmacion.confirmar(`¿Quitar ${c.cursoNombre} (${c.seccionNombre}) de este bloque?`, 'Quitar', true))) return;
    try {
      await firstValueFrom(this.api.quitarClase(c.id));
      await this.refrescar();
      this.avisos.success('Clase quitada.');
      this.dialogo.set(null);
    } catch (e) {
      this.errorForm.set(mensajeError(e));
    }
  }
}
