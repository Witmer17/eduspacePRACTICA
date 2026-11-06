import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Anio, Asignacion, Curso, Docente, DocenteRequest, Grado, MallaGrado, Nivel, Seccion } from '../../../core/models/planificacion.model';
import { Cobertura, EstadoCobertura, cambiosDocentesDeCurso, coberturaCursos, seccionesPorCurso, textoCobertura } from '../../personal/cursos-docente';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ConfigHeroComponent } from '../../../shared/components/config-hero/config-hero.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { claseNivel } from '../estructura/nivel-estilo';
import { horasValidas } from './agregar-cursos-grado.component';
import { AsignacionGrado, FichaCurso, agruparPorArea, armarFichas, codigoDeCurso, horasSugeridas, planCambiosMalla } from './cursos-estandar';

/** El mismo docente con otra lista de cursos (el PUT pide todos los datos de la persona). */
function pedidoDeDocente(d: Docente, cursoIds: number[]): DocenteRequest {
  return {
    tipoDocumento: d.tipoDocumento, numeroDocumento: d.numeroDocumento, nombres: d.nombres, apellidos: d.apellidos, email: d.email,
    telefono: d.telefono, especialidad: d.especialidad, cargo: d.cargo, areaId: d.areaId, cursoIds
  };
}

/** Lo que se edita de un curso en el cuadro «Establecer curso». */
interface Edicion {
  ficha: FichaCurso;
  codigo: string;
  nombre: string;
  area: string;
  /** Por id de grado: si el curso se dicta en él y cuántas horas por semana. */
  grados: Record<number, { on: boolean; horas: number }>;
}

/**
 * Los cursos del colegio. Se muestran los cursos del currículo estándar agrupados por área (más los propios del colegio) y se toca uno
 * para establecerlo: su nombre, su área y los grados donde se dicta con sus horas por semana. Al guardar se crea o actualiza el curso
 * y se ajusta la malla de cada grado (agregar, cambiar horas o quitar).
 */
@Component({
  selector: 'app-cursos-oferta',
  imports: [FormsModule, ConfigHeroComponent, ModalComponent],
  template: `
    <div class="page n-primaria">
      <app-config-hero titulo="Cursos" subtitulo="Elige los cursos que dicta el colegio y en qué grados. Toca un curso para establecerlo con sus horas por semana en cada grado."
                       icono="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5zM4 19.5V21h16">
        @if (puedeEditar()) { <button type="button" class="btn btn-primary" (click)="nuevo()">Nuevo curso</button> }
      </app-config-hero>

      @if (!puedeEditar()) { <div class="aviso aviso-warn">Solo el administrador puede modificar los cursos; tú puedes consultarlos.</div> }
      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      <div class="resumen">
        <strong>{{ enUso() }}</strong> de {{ fichas().length }} cursos se dictan en algún grado
        @if (cargando()) { <span class="muted">Cargando…</span> }
        <span class="leyenda">
          <span class="cob asignado">Con docente · {{ conteo().asignado }}</span>
          @if (conteo().parcial) { <span class="cob parcial" title="Tienen docente en algunas secciones, pero faltan otras">Faltan secciones · {{ conteo().parcial }}</span> }
          <span class="cob apto" title="Hay docentes que pueden dictarlos, pero ninguna sección tiene docente asignado">Sin asignar · {{ conteo().apto }}</span>
          <span class="cob sin-docente">Sin docente · {{ conteo()['sin-docente'] }}</span>
        </span>
        <label class="check"><input type="checkbox" [checked]="soloSinDocente()" (change)="soloSinDocente.set($any($event.target).checked)" /> Solo los que faltan docente</label>
      </div>

      <div class="areas">
        @for (g of grupos(); track g.area) {
          <section class="cfg-bloque" [attr.aria-label]="g.area">
            <h2>{{ g.area }}</h2>
            <div class="tiles">
              @for (f of g.fichas; track f.clave) {
                <button type="button" class="tile" [class.on]="f.grados.length > 0" [disabled]="!puedeEditar() || cargando() || docentesCargando()" (click)="editar(f)">
                  <span class="texto">
                    <strong>{{ f.nombre }}</strong>
                    <small>
                      @if (f.grados.length) { {{ f.grados.length }} {{ f.grados.length === 1 ? 'grado' : 'grados' }} · {{ horasTotales(f) }} h por semana en total }
                      @else if (f.existente) { Creado, sin grados todavía }
                      @else { Toca para establecerlo }
                    </small>
                  </span>
                  <span [class]="'cob ' + cobDe(f).estado" [title]="titulo(f)">{{ etiqueta(cobDe(f).estado) }}</span>
                  <span class="marca" aria-hidden="true">{{ f.grados.length ? '✓' : '+' }}</span>
                </button>
              }
            </div>
          </section>
        }
      </div>
    </div>

    <!-- Establecer un curso: datos y grados donde se dicta -->
    @if (edicion(); as e) {
      <app-modal [titulo]="e.ficha.existente ? 'Curso ' + e.ficha.nombre : 'Establecer curso'" [ancho]="700" (cerrar)="cerrar()">
        <div class="form-grid">
          <div class="field">
            <label for="cu-nombre">Nombre</label>
            <input id="cu-nombre" [ngModel]="e.nombre" (ngModelChange)="cambiar('nombre', $event)" maxlength="100" />
          </div>
          <div class="field">
            <label for="cu-codigo">Código</label>
            <input id="cu-codigo" [ngModel]="e.codigo" (ngModelChange)="cambiar('codigo', $event)" maxlength="20" />
          </div>
          <div class="field full">
            <label for="cu-area">Área curricular</label>
            <input id="cu-area" [ngModel]="e.area" (ngModelChange)="cambiar('area', $event)" maxlength="60" list="areas-curriculares" placeholder="Matemática, Ciencias, Arte…" />
            <datalist id="areas-curriculares">@for (a of areasConocidas(); track a) { <option [value]="a"></option> }</datalist>
          </div>
        </div>

        <h3 class="sub">Grados donde se dicta</h3>
        <div class="grados-nivel">
          @for (n of nivelesConGrados(); track n.nivel.id) {
            <div [class]="'nivel ' + n.clase">
              <div class="nivel-cab">
                <strong>{{ n.nivel.nombre }}</strong>
                <span>
                  <button type="button" class="enlace" (click)="marcarNivel(n.nivel.id, true)">Todos</button>
                  <button type="button" class="enlace" (click)="marcarNivel(n.nivel.id, false)">Ninguno</button>
                </span>
              </div>
              @for (g of n.grados; track g.id) {
                <div class="fila-grado" [class.on]="e.grados[g.id]?.on">
                  <label><input type="checkbox" [checked]="e.grados[g.id]?.on" (change)="marcarGrado(g, $any($event.target).checked)" /> {{ g.nombre }}</label>
                  <label class="horas"><input type="number" min="1" max="40" [ngModel]="e.grados[g.id]?.horas" (ngModelChange)="horasGrado(g.id, $event)"
                                              [disabled]="!e.grados[g.id]?.on" [attr.aria-label]="'Horas por semana en ' + g.nombre" /> h</label>
                </div>
              }
            </div>
          }
        </div>
        <h3 class="sub">Docentes que lo dictan</h3>
        <div class="docentes-curso">
          <div class="barra-doc">
            <input class="input" type="search" placeholder="Buscar docente" aria-label="Buscar docente"
                   [ngModel]="filtroDocente()" (ngModelChange)="filtroDocente.set($event)" />
            <span class="muted">{{ docentesElegidos().size }} {{ docentesElegidos().size === 1 ? 'elegido' : 'elegidos' }}</span>
          </div>
          <div class="lista-docentes">
            @for (d of docentesVisibles(); track d.id) {
              <label class="doc" [class.on]="docentesElegidos().has(d.id)">
                <input type="checkbox" [checked]="docentesElegidos().has(d.id)" (change)="alternarDocente(d.id, $any($event.target).checked)" />
                <span class="nombre"><strong>{{ d.apellidos }}, {{ d.nombres }}</strong><small>{{ d.especialidad || d.cargo || 'Docente' }}</small></span>
              </label>
            } @empty {
              <span class="muted">{{ docentesActivos().length ? 'Ningún docente coincide con la búsqueda.' : 'Aún no hay docentes registrados: agrégalos en Personal.' }}</span>
            }
          </div>
          @if (dictadoEn(e); as dictado) {
            <p class="muted" style="margin: 0">Ya se dicta en: {{ dictado }}.</p>
          }
          <p class="muted" style="margin: 0">Marcar a un docente lo deja <strong>apto</strong> para este curso (el armado de horarios le propondrá secciones). Para dejarlo <strong>asignado</strong>, elige abajo su sección.</p>
        </div>

        @if (seccionesDelCurso().length) {
          <h3 class="sub">Secciones donde se dicta</h3>
          <div class="secciones-curso">
            @for (s of seccionesDelCurso(); track s.id) {
              <div class="fila-seccion" [class.on]="!!seccionDocente()[s.id]">
                <span class="nombre"><strong>{{ s.gradoNombre }} «{{ s.nombre }}»</strong><small>{{ s.turno === 'MANANA' ? 'Mañana' : 'Tarde' }}</small></span>
                <select [ngModel]="seccionDocente()[s.id] ?? 0" (ngModelChange)="elegirDocenteSeccion(s.id, +$event)" [attr.aria-label]="'Docente de ' + s.gradoNombre + ' ' + s.nombre">
                  <option [ngValue]="0">Sin docente</option>
                  @for (d of docentesOrdenados(); track d.id) { <option [ngValue]="d.id">{{ d.apellidos }}, {{ d.nombres }}</option> }
                </select>
              </div>
            }
          </div>
          <p class="muted" style="margin: 0">{{ resumenSecciones() }} Quien elijas aquí queda también como docente apto del curso.</p>
        } @else if (e.ficha.existente) {
          <p class="muted" style="margin: 0">Cuando el curso esté en la malla de un grado con secciones activas, podrás asignar aquí a su docente por sección.</p>
        }
        @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }

        <ng-container footer>
          <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="guardando()" (click)="guardar()">{{ guardando() ? 'Guardando…' : 'Guardar curso' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .resumen { display: flex; align-items: center; gap: 12px; font-size: .95rem; }
    .resumen strong { font-size: 1.4rem; }
    .areas { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: start; }
    .cfg-bloque h2 { margin: 0 0 10px; font-size: 1rem; font-weight: 800; color: var(--nivel); }
    .tiles { display: flex; flex-direction: column; gap: 8px; }
    .tile { display: flex; align-items: center; gap: 12px; padding: 10px 12px; text-align: left; font: inherit; color: inherit; cursor: pointer;
      background: var(--card); border: 1.5px solid var(--line-2); border-radius: 14px; transition: border-color .15s, background .15s; }
    .tile:hover:not(:disabled) { border-color: var(--nivel); }
    .tile:disabled { cursor: default; }
    .tile.on { border-color: var(--nivel); background: var(--nivel-suave); box-shadow: inset 4px 0 0 var(--nivel); }
    .texto { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .texto small { color: var(--ink-2); font-size: .74rem; }
    .marca { flex: none; width: 24px; text-align: center; font-weight: 800; color: var(--nivel); }
    .leyenda { display: flex; gap: 6px; flex-wrap: wrap; margin-left: auto; }
    .check { display: flex; align-items: center; gap: 6px; font-size: .85rem; cursor: pointer; }
    .cob { flex: none; padding: 2px 8px; border-radius: 999px; font-size: .65rem; font-weight: 800; text-transform: uppercase; letter-spacing: .03em; }
    .cob.asignado { color: var(--ok); background: var(--ok-soft); }
    .cob.apto { color: var(--primary); background: var(--primary-soft); }
    .cob.sin-docente { color: var(--warn); background: var(--warn-soft); }
    .cob.parcial { color: #8a5a00; background: #fff1cf; }
    .secciones-curso { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .fila-seccion { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 10px; border: 1.5px solid var(--line-2); border-radius: 10px; background: var(--card); }
    .fila-seccion.on { border-color: var(--nivel); background: var(--nivel-suave); }
    .fila-seccion .nombre { min-width: 0; display: flex; flex-direction: column; font-size: .85rem; }
    .fila-seccion .nombre small { color: var(--ink-2); font-size: .7rem; }
    .fila-seccion select { max-width: 55%; min-width: 0; padding: 5px 8px; border: 1.5px solid var(--line-2); border-radius: 8px; font: inherit; background: var(--card); }
    @media (max-width: 700px) { .secciones-curso { grid-template-columns: minmax(0, 1fr); } }
    .resumen { flex-wrap: wrap; }
    .sub { margin: 18px 0 8px; font-size: .78rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .grados-nivel { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .nivel { padding: 10px; border: 1px solid var(--line); border-radius: 14px; background: var(--bg); }
    .nivel-cab { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; color: var(--nivel); }
    .enlace { border: 0; background: none; padding: 0 0 0 8px; font: inherit; font-size: .75rem; font-weight: 600; color: var(--nivel); cursor: pointer; text-decoration: underline; }
    .fila-grado { display: flex; justify-content: space-between; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 8px; font-size: .85rem; }
    .fila-grado.on { background: var(--nivel-suave); }
    .fila-grado label { display: flex; align-items: center; gap: 6px; }
    .horas { color: var(--ink-2); }
    .horas input { width: 50px; padding: 3px 5px; }
    .docentes-curso { display: flex; flex-direction: column; gap: 8px; }
    .barra-doc { display: flex; align-items: center; gap: 12px; }
    .barra-doc .input { flex: 1; }
    .lista-docentes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; max-height: 220px; overflow-y: auto; padding-right: 2px; }
    .doc { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1.5px solid var(--line-2); border-radius: 10px; background: var(--card); cursor: pointer; }
    .doc.on { border-color: var(--nivel); background: var(--nivel-suave); }
    .doc .nombre { min-width: 0; display: flex; flex-direction: column; font-size: .85rem; }
    .doc .nombre small { color: var(--ink-2); font-size: .7rem; }
    @media (max-width: 1100px) { .areas, .grados-nivel { grid-template-columns: minmax(0, 1fr); } .lista-docentes { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class CursosOfertaComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);

  protected readonly puedeEditar = inject(AuthService).isAdmin;
  protected readonly cargando = signal(true);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly errorForm = signal<string | null>(null);

  private readonly cursos = signal<Curso[]>([]);
  private readonly grados = signal<Grado[]>([]);
  private readonly niveles = signal<Nivel[]>([]);
  private readonly mallas = signal<Record<number, MallaGrado | null>>({});
  protected readonly edicion = signal<Edicion | null>(null);

  private readonly docentes = signal<Docente[]>([]);
  protected readonly docentesCargando = signal(false);
  private readonly asignaciones = signal<Asignacion[]>([]);
  private readonly secciones = signal<Seccion[]>([]);
  protected readonly soloSinDocente = signal(false);
  /** Las secciones activas de cada curso (las de los grados que lo tienen en su malla): sirven para saber si TODAS tienen docente. */
  private readonly seccionesDeCursos = computed(() => seccionesPorCurso(this.secciones(), this.mallas()));
  private readonly cobertura = computed(() => coberturaCursos(this.docentes(), this.asignaciones(), this.seccionesDeCursos()));

  // --- Docente por sección del curso en edición ---
  /** Por id de sección: el docente elegido (0 = sin docente). Arranca con lo que ya está asignado. */
  protected readonly seccionDocente = signal<Record<number, number>>({});
  protected readonly seccionesDelCurso = computed(() => {
    const id = this.edicion()?.ficha.existente?.id;
    return id ? [...(this.seccionesDeCursos().get(id) ?? [])].sort((a, b) => a.nivelId - b.nivelId || a.gradoNombre.localeCompare(b.gradoNombre, 'es', { numeric: true }) || a.nombre.localeCompare(b.nombre, 'es')) : [];
  });
  /** Docentes para el desplegable de una sección: los marcados como aptos primero. */
  protected readonly docentesOrdenados = computed(() => {
    const elegidos = this.docentesElegidos();
    return [...this.docentesActivos()].sort((a, b) => Number(elegidos.has(b.id)) - Number(elegidos.has(a.id)) || a.apellidos.localeCompare(b.apellidos, 'es') || a.nombres.localeCompare(b.nombres, 'es'));
  });
  protected readonly resumenSecciones = computed(() => {
    const n = this.seccionesDelCurso().length;
    const con = this.seccionesDelCurso().filter(s => this.seccionDocente()[s.id]).length;
    return con === n ? `Las ${n} ${n === 1 ? 'sección tiene' : 'secciones tienen'} docente.` : `${con} de ${n} ${n === 1 ? 'sección tiene' : 'secciones tienen'} docente.`;
  });

  protected elegirDocenteSeccion(seccionId: number, docenteId: number): void {
    this.seccionDocente.update(m => ({ ...m, [seccionId]: docenteId }));
    // Quien dicta una sección es apto para el curso: se marca en la lista de docentes.
    if (docenteId) this.docentesElegidos.update(s => new Set([...s, docenteId]));
  }

  // --- Docentes que dictan el curso en edición ---
  protected readonly filtroDocente = signal('');
  protected readonly docentesElegidos = signal<ReadonlySet<number>>(new Set());
  protected readonly docentesActivos = computed(() => this.docentes().filter(d => d.estado === 'ACTIVO'));
  /** Los docentes que coinciden con la búsqueda; los elegidos primero y luego por apellido. */
  protected readonly docentesVisibles = computed(() => {
    const q = this.filtroDocente().trim().toLowerCase();
    const elegidos = this.docentesElegidos();
    return this.docentesActivos()
      .filter(d => !q || `${d.apellidos} ${d.nombres} ${d.especialidad ?? ''}`.toLowerCase().includes(q))
      .sort((a, b) => Number(elegidos.has(b.id)) - Number(elegidos.has(a.id)) || a.apellidos.localeCompare(b.apellidos, 'es') || a.nombres.localeCompare(b.nombres, 'es'));
  });

  protected alternarDocente(id: number, on: boolean): void {
    const s = new Set(this.docentesElegidos());
    if (on) s.add(id);
    else s.delete(id);
    this.docentesElegidos.set(s);
  }

  /** «1.º A (Pérez), 2.º B (Díaz)…»: dónde ya tiene docente asignado este curso en el año. */
  protected dictadoEn(e: Edicion): string {
    const id = e.ficha.existente?.id;
    if (!id) return '';
    return this.asignaciones().filter(a => a.cursoId === id).map(a => `${a.seccionNombre} (${a.docenteNombre})`).join(', ');
  }

  protected readonly fichas = computed(() => armarFichas(this.cursos(), this.mallas()));
  /** Las fichas a mostrar: todas, o solo las que no tienen docente (ni asignado ni apto). */
  private readonly visibles = computed(() => (this.soloSinDocente() ? this.fichas().filter(f => this.cobDe(f).estado === 'sin-docente') : this.fichas()));
  protected readonly grupos = computed(() => agruparPorArea(this.visibles()));
  protected readonly conteo = computed(() => {
    const c: Record<EstadoCobertura, number> = { asignado: 0, parcial: 0, apto: 0, 'sin-docente': 0 };
    for (const f of this.fichas()) c[this.cobDe(f).estado]++;
    return c;
  });

  protected cobDe(f: FichaCurso): Cobertura {
    return this.cobertura()(f.existente?.id);
  }

  protected etiqueta(e: EstadoCobertura): string {
    return e === 'asignado' ? 'Con docente' : e === 'parcial' ? 'Faltan secciones' : e === 'apto' ? 'Sin asignar' : 'Sin docente';
  }

  protected titulo(f: FichaCurso): string {
    return textoCobertura(this.cobDe(f));
  }
  protected readonly enUso = computed(() => this.fichas().filter(f => f.grados.length > 0).length);
  protected readonly areasConocidas = computed(() => [...new Set(this.fichas().map(f => f.area).filter(a => a !== 'Otros'))]);

  protected readonly nivelesConGrados = computed(() =>
    [...this.niveles()].sort((a, b) => a.orden - b.orden).map(nivel => ({
      nivel, clase: claseNivel(nivel.codigo), grados: this.grados().filter(g => g.nivelId === nivel.id).sort((a, b) => a.numero - b.numero)
    })).filter(n => n.grados.length)
  );

  ngOnInit(): void {
    this.cargar();
  }

  protected horasTotales(f: FichaCurso): number {
    return f.grados.reduce((t, g) => t + g.horas, 0);
  }

  private cargar(): void {
    this.cargando.set(true);
    // Quién puede dictar cada curso y dónde ya está asignado (si algo falla, solo se pierden las marcas).
    // Mientras se recargan los docentes no se abre un curso: el cuadro mostraría los docentes marcados de antes (datos viejos).
    this.docentesCargando.set(true);
    this.api.docentes('', 0, 200).pipe(map(p => p.contenido), catchError(() => of([] as Docente[]))).subscribe(d => { this.docentes.set(d); this.docentesCargando.set(false); });
    this.api.anios().pipe(catchError(() => of([] as Anio[]))).subscribe(anios => {
      const anio = anios.find(a => a.estado === 'ACTIVO') ?? anios.find(a => a.estado === 'PLANIFICADO');
      if (anio) {
        this.api.asignaciones(undefined, undefined, anio.id).pipe(catchError(() => of([] as Asignacion[]))).subscribe(a => this.asignaciones.set(a));
        this.api.secciones(anio.id).pipe(catchError(() => of([] as Seccion[]))).subscribe(s => this.secciones.set(s));
      }
    });
    forkJoin({ cursos: this.api.cursos(), grados: this.api.grados(), niveles: this.api.niveles() }).subscribe({
      next: ({ cursos, grados, niveles }) => {
        this.cursos.set(cursos);
        this.grados.set(grados);
        this.niveles.set(niveles);
        const pedidas = grados.map(g => this.api.malla(g.id).pipe(catchError(() => of(null))));
        (pedidas.length ? forkJoin(pedidas) : of([] as (MallaGrado | null)[])).subscribe(ms => {
          this.mallas.set(Object.fromEntries(grados.map((g, i) => [g.id, ms[i]])));
          this.cargando.set(false);
        });
      },
      error: e => {
        this.cargando.set(false);
        this.error.set(mensajeError(e, 'No se pudieron cargar los cursos.'));
      }
    });
  }

  private nivelCodigoDe(g: Grado): string {
    return this.niveles().find(n => n.id === g.nivelId)?.codigo ?? '';
  }

  /** Abre el cuadro de un curso: sus grados actuales con sus horas; un curso sin grados propone los del nivel donde se suele dictar. */
  protected editar(f: FichaCurso): void {
    const grados: Edicion['grados'] = {};
    for (const g of this.grados()) {
      const actual = f.grados.find(a => a.gradoId === g.id);
      grados[g.id] = { on: !!actual, horas: actual?.horas ?? horasSugeridas(f.estandar, this.nivelCodigoDe(g)) };
    }
    this.errorForm.set(null);
    // Los docentes que ya lo dictan quedan marcados.
    const cursoId = f.existente?.id;
    // (y quien ya dicta una sección también es apto, aunque su lista de cursos no lo diga)
    const yaDictan = new Set(this.asignaciones().filter(a => a.cursoId === cursoId).map(a => a.docenteId));
    this.docentesElegidos.set(new Set(cursoId ? this.docentesActivos().filter(d => d.cursoIds?.includes(cursoId) || yaDictan.has(d.id)).map(d => d.id) : []));
    // Y cada sección arranca con el docente que ya tiene asignado.
    this.seccionDocente.set(Object.fromEntries(this.asignaciones().filter(a => a.cursoId === cursoId).map(a => [a.seccionId, a.docenteId])));
    this.filtroDocente.set('');
    this.edicion.set({ ficha: f, codigo: f.codigo, nombre: f.nombre, area: f.area === 'Otros' ? '' : f.area, grados });
  }

  protected nuevo(): void {
    const grados: Edicion['grados'] = Object.fromEntries(this.grados().map(g => [g.id, { on: false, horas: 2 }]));
    const vacia: FichaCurso = { clave: 'nuevo', nombre: '', codigo: '', area: '', existente: null, estandar: null, grados: [] };
    this.errorForm.set(null);
    this.docentesElegidos.set(new Set());
    this.seccionDocente.set({});
    this.filtroDocente.set('');
    this.edicion.set({ ficha: vacia, codigo: '', nombre: '', area: '', grados });
  }

  protected cerrar(): void {
    this.edicion.set(null);
  }

  protected cambiar(campo: 'nombre' | 'codigo' | 'area', valor: string): void {
    this.edicion.update(e => {
      if (!e) return e;
      const siguiente = { ...e, [campo]: valor };
      // Un curso nuevo propone su código a partir del nombre mientras no se haya escrito uno a mano.
      if (campo === 'nombre' && !e.ficha.existente && (e.codigo === '' || e.codigo === codigoDeCurso(e.nombre))) siguiente.codigo = codigoDeCurso(valor);
      return siguiente;
    });
  }

  protected marcarGrado(g: Grado, on: boolean): void {
    this.edicion.update(e => (e ? { ...e, grados: { ...e.grados, [g.id]: { ...e.grados[g.id], on } } } : e));
  }

  protected horasGrado(gradoId: number, valor: number): void {
    this.edicion.update(e => (e ? { ...e, grados: { ...e.grados, [gradoId]: { ...e.grados[gradoId], horas: horasValidas(valor) } } } : e));
  }

  protected marcarNivel(nivelId: number, on: boolean): void {
    this.edicion.update(e => {
      if (!e) return e;
      const grados = { ...e.grados };
      for (const g of this.grados().filter(x => x.nivelId === nivelId)) grados[g.id] = { ...grados[g.id], on };
      return { ...e, grados };
    });
  }

  protected guardar(): void {
    const e = this.edicion();
    if (!e) return;
    const nombre = e.nombre.trim();
    const codigo = e.codigo.trim().toUpperCase();
    if (!nombre || !codigo) return this.errorForm.set('El curso necesita nombre y código.');

    const deseado: AsignacionGrado[] = Object.entries(e.grados).filter(([, v]) => v.on).map(([id, v]) => ({ gradoId: Number(id), horas: horasValidas(v.horas) }));
    const body = { codigo, nombre, area: e.area.trim() || undefined, activo: true };
    this.guardando.set(true);
    this.errorForm.set(null);

    const existente = e.ficha.existente;
    const huboCambioDatos = !existente || existente.nombre !== nombre || existente.codigo !== codigo || (existente.area ?? '') !== (body.area ?? '');
    const curso$ = existente ? (huboCambioDatos ? this.api.actualizarCurso(existente.id, body) : of(existente)) : this.api.crearCurso(body);

    curso$.subscribe({
      next: curso => {
        const plan = planCambiosMalla(e.ficha.grados, deseado);
        // Docente de cada sección: se crea, se cambia o se quita la asignación según lo elegido (solo de un curso que ya existía).
        const porSeccion = this.seccionDocente();
        const asignacionesCurso = this.asignaciones().filter(a => a.cursoId === curso.id);
        const deSecciones = (e.ficha.existente ? this.seccionesDelCurso() : []).flatMap((s): Observable<unknown>[] => {
          const quiere = porSeccion[s.id] ?? 0;
          const actual = asignacionesCurso.find(a => a.seccionId === s.id);
          if (quiere && !actual) return [this.api.crearAsignacion({ seccionId: s.id, cursoId: curso.id, docenteId: quiere })];
          if (quiere && actual && actual.docenteId !== quiere) return [this.api.cambiarDocenteAsignacion(actual.id, quiere)];
          if (!quiere && actual) return [this.api.eliminarAsignacion(actual.id)];
          return [];
        });
        // Quien dicta una sección también es apto del curso, aunque se haya desmarcado en la lista.
        const aptos = new Set([...this.docentesElegidos(), ...Object.values(porSeccion).filter(id => id > 0)]);
        const tareas = [
          ...plan.agregar.map(a => this.api.agregarCursoMalla(a.gradoId, curso.id, a.horas)),
          ...plan.cambiar.map(c => this.api.cambiarHorasMalla(c.mallaId, c.horas)),
          ...plan.quitar.map(q => this.api.quitarCursoMalla(q.mallaId)),
          ...deSecciones,
          // Docentes que se añaden o se quitan de este curso (se actualiza la lista de cursos de cada uno).
          ...cambiosDocentesDeCurso(this.docentes(), curso.id, aptos)
            .map(c => this.api.actualizarDocente(c.docente.id, pedidoDeDocente(c.docente, c.cursoIds)))
        ];
        const terminar = (): void => {
          this.guardando.set(false);
          this.avisos.success(`Curso «${nombre}» guardado.`);
          this.cerrar();
          this.cargar();
        };
        if (!tareas.length) return terminar();
        forkJoin(tareas).subscribe({
          next: terminar,
          error: err => {
            this.guardando.set(false);
            this.errorForm.set(mensajeError(err));
            this.cargar(); // algunos cambios pudieron aplicarse: se refresca lo que se muestra
          }
        });
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }
}
