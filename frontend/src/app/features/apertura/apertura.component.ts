import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Campania } from '../../core/models/matricula.model';
import { MallaGrado } from '../../core/models/planificacion.model';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { MatriculaService } from '../../core/services/matricula.service';
import { NotificationService } from '../../core/services/notification.service';
import { PagoConfigService } from '../../core/services/pago-config.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { ConfigHeroComponent } from '../../shared/components/config-hero/config-hero.component';
import { DatosApertura, EstadoPaso, PasoApertura, anioPorAbrir, avanceApertura, evaluarApertura, sePuedeActivar, siguientePaso } from './apertura';

/** Un servicio apagado o sin permiso no debe tumbar la pantalla: ese paso queda «sin datos». */
const seguro = <T>(obs: Observable<T>): Observable<T | null> => obs.pipe(catchError(() => of(null)));

/**
 * Apertura de periodo: una guía paso a paso para dejar listo el año escolar que va a empezar (año y periodos, feriados, grados, cursos,
 * secciones, docentes, horarios, tarifas y matrícula). Cada paso dice qué falta, explica para qué sirve y lleva a su pantalla;
 * al final, con todo listo, se activa el año desde aquí.
 */
@Component({
  selector: 'app-apertura',
  imports: [RouterLink, ConfigHeroComponent],
  template: `
    <div class="page n-primaria">
      <app-config-hero [titulo]="anio() ? 'Apertura de ' + anio()!.nombre : 'Apertura de periodo'"
                       subtitulo="Sigue los pasos en orden: cada uno te dice qué falta, para qué sirve y te lleva a su pantalla. Al terminar, abre el año."
                       icono="M5 21V4M5 4h12l-2 4 2 4H5">
        <div class="avance" role="img" [attr.aria-label]="avance().porcentaje + ' por ciento listo'">
          <strong>{{ avance().porcentaje }}<small>%</small></strong>
          <span>{{ avance().listos }} de {{ avance().total }} pasos</span>
        </div>
      </app-config-hero>

      @if (cargando()) { <p class="muted">Revisando el año…</p> }

      <!-- Qué hacer ahora -->
      @if (!cargando()) {
        @if (siguiente(); as s) {
          <section class="ahora" aria-label="Siguiente paso">
            <span class="num" aria-hidden="true">{{ s.numero }}</span>
            <div class="ahora-texto">
              <small>Siguiente paso</small>
              <strong>{{ s.titulo }}</strong>
              <span>{{ s.detalle }}</span>
            </div>
            <a class="btn btn-primary" [routerLink]="s.ruta">{{ s.accion }} →</a>
          </section>
        } @else if (anio()?.estado === 'ACTIVO') {
          <section class="ahora lista" aria-label="Año abierto">
            <span class="num" aria-hidden="true">✓</span>
            <div class="ahora-texto"><small>Todo listo</small><strong>{{ anio()!.nombre }} está abierto</strong><span>Todos los pasos están completos y el año ya está activo.</span></div>
            <a class="btn" routerLink="/matriculas">Ir a matrículas</a>
          </section>
        } @else if (anio()) {
          <section class="ahora lista" aria-label="Listo para abrir">
            <span class="num" aria-hidden="true">✓</span>
            <div class="ahora-texto"><small>Todo listo</small><strong>Puedes abrir {{ anio()!.nombre }}</strong><span>No falta ningún paso necesario.</span></div>
          </section>
        }
      }

      <div class="barra-filtros">
        <label class="check"><input type="checkbox" [checked]="soloPendientes()" (change)="soloPendientes.set($any($event.target).checked)" /> Mostrar solo lo que falta</label>
        <button type="button" class="btn btn-sm" [disabled]="cargando()" (click)="cargar()">Volver a revisar</button>
      </div>

      <ol class="pasos">
        @for (p of visibles(); track p.id) {
          <li [class]="'paso ' + p.estado" [class.abierto]="abierto() === p.id">
            <button type="button" class="paso-cab" [attr.aria-expanded]="abierto() === p.id" (click)="alternar(p.id)">
              <span class="marca" aria-hidden="true">{{ p.estado === 'ok' ? '✓' : p.numero }}</span>
              <span class="paso-texto">
                <strong>{{ p.titulo }} @if (!p.requerido) { <em class="opc">opcional</em> }</strong>
                <span class="detalle">{{ p.detalle }}</span>
              </span>
              <span class="estado">{{ etiqueta(p.estado) }}</span>
              <span class="flecha" aria-hidden="true">{{ abierto() === p.id ? '▴' : '▾' }}</span>
            </button>
            @if (abierto() === p.id) {
              <div class="paso-cuerpo">
                <p>{{ p.ayuda }}</p>
                <a class="btn btn-primary btn-sm" [routerLink]="p.ruta">{{ p.accion }}</a>
              </div>
            }
          </li>
        } @empty {
          @if (!cargando()) { <li class="vacio">No falta ningún paso.</li> }
        }
      </ol>

      <!-- Abrir el año -->
      @if (anio(); as a) {
        @if (a.estado === 'PLANIFICADO') {
          <section class="abrir" aria-label="Abrir el año">
            <div>
              <h2>Abrir el año {{ a.nombre }}</h2>
              @if (puedeActivar()) {
                <p>Todo lo necesario está listo. Al abrirlo, el año pasa a ser el activo: las matrículas, los horarios y los cobros trabajan con él. El año activo actual dejará de serlo.</p>
              } @else {
                <p>Aún faltan pasos necesarios: {{ faltan().join(', ') }}.</p>
              }
              @if (!esAdmin()) { <p class="muted">Solo el administrador puede abrir el año.</p> }
              @else if (puedeActivar() && !hayCampania()) { <p class="muted">La campaña de matrícula se abre después, ya con el año activo.</p> }
            </div>
            <button type="button" class="btn btn-primary" [disabled]="!puedeActivar() || !esAdmin() || activando()" (click)="activar()">
              {{ activando() ? 'Abriendo…' : 'Abrir el año' }}
            </button>
          </section>
        }
      }
    </div>
  `,
  styles: `
    .avance { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 104px; height: 104px; border-radius: 50%; background: rgb(255 255 255 / .16); border: 2px solid rgb(255 255 255 / .55); text-align: center; }
    .avance strong { font-size: 1.9rem; font-weight: 900; line-height: 1; }
    .avance small { font-size: .85rem; }
    .avance span { font-size: .62rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; opacity: .9; max-width: 80px; }
    .ahora { display: flex; align-items: center; gap: 16px; padding: 16px 18px; border-radius: 18px; background: var(--nivel-suave); border: 1.5px solid var(--nivel); }
    .ahora.lista { border-color: var(--ok); background: var(--ok-soft); }
    .ahora .num { flex: none; width: 46px; height: 46px; display: grid; place-items: center; border-radius: 50%; background: var(--nivel); color: #fff; font-size: 1.3rem; font-weight: 900; }
    .ahora.lista .num { background: var(--ok); }
    .ahora-texto { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .ahora-texto small { font-size: .7rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .ahora-texto strong { font-size: 1.1rem; }
    .barra-filtros { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .check { display: flex; align-items: center; gap: 8px; font-size: .9rem; cursor: pointer; }
    .pasos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; position: relative; }
    .paso { background: var(--card); border: 1.5px solid var(--line-2); border-radius: 16px; overflow: hidden; transition: border-color .15s; }
    .paso.ok { border-color: var(--ok); }
    .paso.pendiente { border-color: var(--warn); }
    .paso.abierto { box-shadow: 0 4px 16px rgb(0 0 0 / .06); }
    .paso-cab { display: flex; align-items: center; gap: 14px; width: 100%; padding: 12px 16px; text-align: left; font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
    .marca { flex: none; width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; font-weight: 800; background: var(--line); color: var(--ink-2); }
    .paso.ok .marca { background: var(--ok-soft); color: var(--ok); }
    .paso.pendiente .marca { background: var(--warn-soft); color: var(--warn); }
    .paso-texto { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .detalle { font-size: .82rem; color: var(--ink-2); }
    .paso.pendiente .detalle { color: var(--warn); }
    .opc { margin-left: 6px; font-size: .68rem; font-weight: 700; font-style: normal; text-transform: uppercase; color: var(--ink-2); }
    .estado { flex: none; font-size: .72rem; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; color: var(--ink-2); }
    .paso.ok .estado { color: var(--ok); }
    .paso.pendiente .estado { color: var(--warn); }
    .flecha { flex: none; color: var(--ink-2); }
    .paso-cuerpo { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0 16px 14px 64px; }
    .paso-cuerpo p { margin: 0; color: var(--ink-2); line-height: 1.45; }
    .vacio { padding: 18px; text-align: center; color: var(--ink-2); }
    .abrir { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 18px 20px; border-radius: 18px; border: 2px dashed var(--line-2); }
    .abrir h2 { margin: 0 0 4px; font-size: 1.1rem; }
    .abrir p { margin: 0 0 4px; }
    @media (max-width: 720px) { .ahora, .abrir, .paso-cuerpo { flex-direction: column; align-items: stretch; padding-left: 16px; } }
  `
})
export class AperturaComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly pagos = inject(PagoConfigService);
  private readonly matriculas = inject(MatriculaService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  protected readonly esAdmin = inject(AuthService).isAdmin;

  protected readonly cargando = signal(true);
  protected readonly activando = signal(false);
  protected readonly soloPendientes = signal(false);
  /** Paso abierto (con su explicación); al cargar se abre el primero que falta. */
  protected readonly abierto = signal<string | null>(null);
  private readonly datos = signal<DatosApertura | null>(null);

  protected readonly anio = computed(() => anioPorAbrir(this.datos()?.anios ?? null));
  protected readonly pasos = computed<PasoApertura[]>(() => (this.datos() ? evaluarApertura(this.datos()!) : []));
  protected readonly siguiente = computed(() => siguientePaso(this.pasos()));
  protected readonly avance = computed(() => avanceApertura(this.pasos()));
  protected readonly visibles = computed(() => (this.soloPendientes() ? this.pasos().filter(p => p.estado !== 'ok') : this.pasos()));
  protected readonly puedeActivar = computed(() => sePuedeActivar(this.anio(), this.pasos()));
  protected readonly hayCampania = computed(() => this.pasos().find(p => p.id === 'campania')?.estado === 'ok');
  protected readonly faltan = computed(() => this.pasos().filter(p => p.requerido && p.id !== 'campania' && p.estado !== 'ok').map(p => p.titulo.toLowerCase()));

  ngOnInit(): void {
    this.cargar();
  }

  protected etiqueta(e: EstadoPaso): string {
    return e === 'ok' ? 'Listo' : e === 'pendiente' ? 'Falta' : e === 'opcional' ? 'Opcional' : 'Sin datos';
  }

  protected alternar(id: string): void {
    this.abierto.update(a => (a === id ? null : id));
  }

  protected cargar(): void {
    this.cargando.set(true);
    forkJoin({
      anios: seguro(this.api.anios()),
      grados: seguro(this.api.grados()),
      bloques: seguro(this.api.bloques()),
      conceptos: seguro(this.pagos.conceptos().pipe(map(c => c.filter(x => x.activo).length)))
    }).subscribe(base => {
      const anioId = anioPorAbrir(base.anios)?.id;
      const nulo = <T>(valor: T): Observable<T | null> => of(base.anios === null ? null : valor);
      forkJoin({
        periodos: anioId ? seguro(this.api.periodos(anioId)) : nulo([]),
        feriados: anioId ? seguro(this.api.feriados(anioId).pipe(map(f => f.length))) : nulo(0),
        secciones: anioId ? seguro(this.api.secciones(anioId)) : nulo([]),
        asignaciones: anioId ? seguro(this.api.asignaciones(undefined, undefined, anioId)) : nulo([]),
        tarifas: anioId ? seguro(this.pagos.tarifas(anioId).pipe(map(t => t.filter(x => x.activo).length))) : nulo(0),
        campanias: anioId ? seguro(this.matriculas.campanias(anioId)) : nulo([] as Campania[]),
        mallas: base.grados?.length
          ? forkJoin(base.grados.map(g => this.api.malla(g.id).pipe(catchError(() => of(null))))).pipe(
              map(ms => Object.fromEntries(base.grados!.map((g, i) => [g.id, ms[i]])) as Record<number, MallaGrado | null>))
          : of({} as Record<number, MallaGrado | null>)
      }).subscribe(r => {
        const datos: DatosApertura = { ...base, ...r };
        this.datos.set(datos);
        this.cargando.set(false);
        // Se abre de entrada el primer paso que falta, para que se vea qué hacer sin buscar.
        if (this.abierto() === null) this.abierto.set(siguientePaso(evaluarApertura(datos))?.id ?? null);
      });
    });
  }

  protected async activar(): Promise<void> {
    const a = this.anio();
    if (!a || !this.puedeActivar()) return;
    if (!(await this.confirmacion.confirmar(`¿Abrir el año ${a.nombre}? Pasará a ser el año activo y el actual dejará de serlo.`, 'Abrir el año'))) return;
    this.activando.set(true);
    this.api.activarAnio(a.id).subscribe({
      next: () => {
        this.activando.set(false);
        this.avisos.success(`El año ${a.nombre} está abierto.`);
        this.abierto.set(null);
        this.cargar();
      },
      error: e => {
        this.activando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo abrir el año.'));
      }
    });
  }
}
