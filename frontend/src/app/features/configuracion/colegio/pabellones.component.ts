import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Aula, Pabellon } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

/** Aulas que aún se pueden registrar en un pabellón (nunca negativo). */
export const aulasLibres = (p: Pick<Pabellon, 'cantidadAulas' | 'aulasRegistradas'>): number => Math.max(p.cantidadAulas - p.aulasRegistradas, 0);

/** Porcentaje de las aulas declaradas que ya están registradas (0–100). */
export const avancePabellon = (p: Pick<Pabellon, 'cantidadAulas' | 'aulasRegistradas'>): number =>
  p.cantidadAulas > 0 ? Math.min(Math.round((p.aulasRegistradas / p.cantidadAulas) * 100), 100) : 0;

/** Un aula con la capacidad que se está escribiendo (que puede diferir de la guardada). */
export interface FilaCapacidad {
  aula: Aula;
  capacidad: number;
}

/** Una capacidad válida: entero de 1 a 500 alumnos. */
export const capacidadValida = (n: number): boolean => Number.isInteger(n) && n >= 1 && n <= 500;

/** Las aulas cuya capacidad cambió, listas para enviar. */
export const cambiosCapacidad = (filas: readonly FilaCapacidad[]): { aulaId: number; capacidad: number }[] =>
  filas.filter(f => f.capacidad !== f.aula.capacidad).map(f => ({ aulaId: f.aula.id, capacidad: f.capacidad }));

/** Alumnos que caben en total, según lo que se está escribiendo (las capacidades inválidas no suman). */
export const totalCapacidad = (filas: readonly FilaCapacidad[]): number => filas.reduce((t, f) => t + (capacidadValida(f.capacidad) ? f.capacidad : 0), 0);

/**
 * Cómo se verán los códigos de las aulas que se crean: «A-01, A-02…». `desde` es cuántas aulas ya tiene (para seguir la numeración).
 * Es solo una muestra: el servidor es quien decide los códigos y salta los que ya existen.
 */
export function ejemploCodigosDe(nombre: string, cantidad: number, desde = 0): string {
  const prefijo = (nombre.normalize('NFD').replace(/\p{M}/gu, '').toUpperCase().replace(/[^A-Z0-9]/g, '') || 'P').slice(0, 12);
  const codigo = (n: number) => `${prefijo}-${String(n).padStart(2, '0')}`;
  if (cantidad <= 0) return '—';
  if (cantidad === 1) return codigo(desde + 1);
  return cantidad === 2 ? `${codigo(desde + 1)} y ${codigo(desde + 2)}` : `${codigo(desde + 1)}, ${codigo(desde + 2)}… ${codigo(desde + cantidad)}`;
}

/**
 * Los pabellones del colegio: el usuario les pone el nombre que quiera (A, B, «Central»…) y dice cuántas aulas tiene cada uno.
 * Al registrar las aulas se elige su pabellón y el sistema no deja pasar de la cantidad declarada.
 */
@Component({
  selector: 'app-pabellones',
  imports: [ReactiveFormsModule, RouterLink, ModalComponent],
  template: `
    <section class="cfg-bloque pab" aria-labelledby="t-pab">
      <div class="cab">
        <div>
          <h2 id="t-pab">Pabellones y aulas</h2>
          <p class="muted">Ponle a cada pabellón el nombre que prefieras (A, B, Central…) e indica cuántas aulas tiene.</p>
        </div>
        @if (puedeEditar()) { <button type="button" class="btn btn-primary" (click)="nuevo()">Agregar pabellón</button> }
      </div>

      @if (pabellones().length) {
        <div class="totales">
          <span><strong>{{ pabellones().length }}</strong> {{ pabellones().length === 1 ? 'pabellón' : 'pabellones' }}</span>
          <span><strong>{{ totalDeclaradas() }}</strong> aulas declaradas</span>
          <span><strong>{{ totalRegistradas() }}</strong> registradas</span>
          <a class="btn btn-sm" routerLink="/configuracion/estructura">Registrar aulas</a>
        </div>
      }

      <div class="pabellones">
        @for (p of pabellones(); track p.id) {
          <article class="pabellon">
            <span class="nombre-circulo" [class.largo]="p.nombre.length > 2" aria-hidden="true">{{ p.nombre.length <= 3 ? p.nombre : p.nombre.charAt(0) }}</span>
            <div class="datos">
              <h3>Pabellón {{ p.nombre }}</h3>
              <span class="muted">{{ p.cantidadAulas }} {{ p.cantidadAulas === 1 ? 'aula' : 'aulas' }} · {{ p.aulasRegistradas }} registradas
                @if (aulasLibres(p) > 0) { · faltan {{ aulasLibres(p) }} }</span>
              @if (p.aulasRegistradas > 0) { <span class="cap-total"><strong>{{ p.capacidadAlumnos }}</strong> alumnos de capacidad en total</span> }
              <div class="barra" role="img" [attr.aria-label]="p.aulasRegistradas + ' de ' + p.cantidadAulas + ' aulas registradas'"><span [style.width.%]="avance(p)"></span></div>
            </div>
            @if (puedeEditar()) {
              <div class="acciones">
                @if (aulasLibres(p) > 0) {
                  <button type="button" class="btn btn-sm btn-primary" (click)="abrirCrearAulas(p)">Crear {{ aulasLibres(p) === 1 ? 'el aula' : 'las ' + aulasLibres(p) + ' aulas' }}</button>
                }
                @if (p.aulasRegistradas > 0) {
                  <button type="button" class="btn btn-sm" (click)="abrirCapacidades(p)">Alumnos por aula</button>
                }
                <button type="button" class="btn btn-sm" (click)="editar(p)">Editar</button>
                <button type="button" class="btn btn-sm" (click)="eliminar(p)">Eliminar</button>
              </div>
            }
          </article>
        } @empty {
          <p class="muted vacio-chico">{{ cargando() ? 'Cargando…' : 'Aún no hay pabellones. Agrega el primero (por ejemplo «A» con 12 aulas).' }}</p>
        }
      </div>
    </section>

    <!-- Cuántos alumnos caben en cada aula del pabellón -->
    @if (paraCapacidad(); as p) {
      <app-modal [titulo]="'Alumnos por aula · Pabellón ' + p.nombre" [ancho]="560" (cerrar)="paraCapacidad.set(null)">
        <p style="margin: 0 0 12px">Indica cuántos alumnos entran en cada salón. Es el tope de las vacantes de las secciones que usen esa aula.</p>
        <div class="aplicar-todas">
          <label for="cap-todas">Para todas las aulas</label>
          <input id="cap-todas" type="number" min="1" max="500" [formControl]="capacidadTodas" />
          <button type="button" class="btn btn-sm" [disabled]="capacidadTodas.invalid" (click)="aplicarATodas()">Aplicar a todas</button>
        </div>
        <div class="filas-cap" role="list">
          @for (f of filasCap(); track f.aula.id; let i = $index) {
            <div class="fila-cap" role="listitem" [class.cambiada]="f.capacidad !== f.aula.capacidad">
              <span class="cod">{{ f.aula.codigo }}</span>
              <span class="muted nom">{{ f.aula.nombre }}</span>
              <input type="number" min="1" max="500" [value]="f.capacidad" [attr.aria-label]="'Alumnos que caben en ' + f.aula.codigo"
                     [class.invalida]="!capacidadValida(f.capacidad)" (input)="cambiarFila(i, +$any($event.target).value)" />
              <span class="muted unidad">alumnos</span>
            </div>
          }
        </div>
        <p class="resumen-cap"><strong>{{ totalCap() }}</strong> alumnos de capacidad en total
          @if (numCambios() > 0) { · <span class="cambios">{{ numCambios() }} {{ numCambios() === 1 ? 'aula cambia' : 'aulas cambian' }}</span> }</p>
        @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="paraCapacidad.set(null)">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="guardando() || numCambios() === 0 || hayInvalidas()" (click)="guardarCapacidades()">
            {{ guardando() ? 'Guardando…' : 'Guardar capacidades' }}
          </button>
        </ng-container>
      </app-modal>
    }

    @if (paraAulas(); as p) {
      <app-modal [titulo]="'Crear las aulas del pabellón ' + p.nombre" [ancho]="440" (cerrar)="paraAulas.set(null)">
        <p style="margin: 0 0 12px">El pabellón declara <strong>{{ p.cantidadAulas }}</strong> y tiene <strong>{{ p.aulasRegistradas }}</strong> registradas. Se crearán las <strong>{{ aulasLibres(p) }}</strong> que faltan, con códigos como <strong>{{ ejemploCodigosDe(p) }}</strong>.</p>
        <div class="field">
          <label for="pb-capa2">Capacidad de cada aula</label>
          <input id="pb-capa2" type="number" min="1" max="500" [formControl]="capacidadNuevas" />
          @if (capacidadNuevas.invalid) { <span class="error">Entre 1 y 500.</span> }
        </div>
        @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="paraAulas.set(null)">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="guardando() || capacidadNuevas.invalid" (click)="crearAulas()">{{ guardando() ? 'Creando…' : 'Crear ' + aulasLibres(p) + (aulasLibres(p) === 1 ? ' aula' : ' aulas') }}</button>
        </ng-container>
      </app-modal>
    }

    @if (abierto()) {
      <app-modal [titulo]="editando() ? 'Editar pabellón ' + editando()!.nombre : 'Nuevo pabellón'" [ancho]="460" (cerrar)="cerrar()">
        <form [formGroup]="form" (ngSubmit)="guardar()" id="form-pabellon" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="pb-nombre">Nombre del pabellón</label>
              <input id="pb-nombre" formControlName="nombre" maxlength="30" placeholder="A" />
              @if (form.controls.nombre.touched && form.controls.nombre.invalid) { <span class="error">Obligatorio.</span> }
            </div>
            <div class="field">
              <label for="pb-cant">Cantidad de aulas</label>
              <input id="pb-cant" type="number" min="0" max="500" formControlName="cantidadAulas" />
              @if (form.controls.cantidadAulas.invalid) { <span class="error">Un número entre 0 y 500.</span> }
            </div>
          </div>
          <p class="muted" style="margin: 12px 0 0">El nombre es libre: una letra, un número o una palabra. No puede repetirse.</p>
          @if (!editando()) {
            <div class="crear-aulas">
              <label class="check"><input type="checkbox" formControlName="crearAulas" /> Crear también las aulas ahora</label>
              @if (form.controls.crearAulas.value && form.controls.cantidadAulas.value > 0) {
                <div class="field">
                  <label for="pb-capa">Capacidad de cada aula</label>
                  <input id="pb-capa" type="number" min="1" max="500" formControlName="capacidadAulas" />
                </div>
                <span class="muted">Se crearán {{ form.controls.cantidadAulas.value }} aulas con códigos {{ ejemploCodigos() }}.</span>
              } @else {
                <span class="muted">Sin esto, la cantidad solo se declara y las aulas se registran una por una.</span>
              }
            </div>
          }
          @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
        </form>
        <ng-container footer>
          <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
          <button type="submit" form="form-pabellon" class="btn btn-primary" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : 'Guardar' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .pab { margin-top: 16px; }
    .cab { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
    .cab h2 { margin: 0; }
    .cab p { margin: 4px 0 12px; }
    .totales { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin-bottom: 14px; font-size: .9rem; color: var(--ink-2); }
    .totales strong { font-size: 1.25rem; color: var(--ink); }
    .pabellones { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 12px; }
    .pabellon { display: flex; align-items: center; gap: 14px; padding: 14px; border: 1px solid var(--line); border-radius: 14px; background: var(--bg); }
    .nombre-circulo { flex: none; width: 52px; height: 52px; display: grid; place-items: center; border-radius: 50%; background: linear-gradient(135deg, var(--nivel), var(--nivel-2)); color: #fff; font-weight: 900; font-size: 1.35rem; box-shadow: 0 6px 14px -8px var(--nivel); }
    .datos { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .datos h3 { margin: 0; font-size: 1rem; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .barra { height: 6px; border-radius: 99px; background: var(--line); overflow: hidden; }
    .barra span { display: block; height: 100%; border-radius: 99px; background: var(--nivel); }
    .acciones { display: flex; flex-direction: column; gap: 6px; }
    .vacio-chico { margin: 4px 0 0; }
    .cap-total { font-size: .8rem; color: var(--nivel); }
    .cap-total strong { font-size: 1rem; }
    .aplicar-todas { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 10px 12px; margin-bottom: 12px; border-radius: 12px; background: var(--nivel-suave); }
    .aplicar-todas label { font-weight: 700; font-size: .85rem; }
    .aplicar-todas input { width: 90px; }
    .filas-cap { display: flex; flex-direction: column; max-height: 46vh; overflow-y: auto; border: 1px solid var(--line); border-radius: 12px; }
    .fila-cap { display: grid; grid-template-columns: 96px minmax(0, 1fr) 96px 62px; align-items: center; gap: 10px; padding: 8px 12px; border-top: 1px solid var(--line); }
    .fila-cap:first-child { border-top: 0; }
    .fila-cap.cambiada { background: var(--warn-soft); }
    .fila-cap .cod { font-weight: 800; }
    .fila-cap .nom { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .fila-cap input { width: 100%; }
    .fila-cap input.invalida { border-color: var(--danger); }
    .resumen-cap { margin: 12px 0 0; }
    .resumen-cap strong { font-size: 1.15rem; }
    .cambios { color: var(--warn); font-weight: 700; }
    .crear-aulas { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; padding: 12px 14px; border-radius: 12px; border: 1.5px dashed var(--line-2); }
    .check { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; }
  `
})
export class PabellonesComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly puedeEditar = inject(AuthService).isAdmin;
  protected readonly pabellones = signal<Pabellon[]>([]);
  protected readonly cargando = signal(true);
  protected readonly totalDeclaradas = computed(() => this.pabellones().reduce((t, p) => t + p.cantidadAulas, 0));
  protected readonly totalRegistradas = computed(() => this.pabellones().reduce((t, p) => t + p.aulasRegistradas, 0));

  protected readonly aulasLibres = aulasLibres;
  protected readonly avance = avancePabellon;

  protected readonly abierto = signal(false);
  protected readonly editando = signal<Pabellon | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    cantidadAulas: [10, [Validators.required, Validators.min(0), Validators.max(500)]],
    /** Solo al crear: crea de una vez las aulas que el pabellón declara. */
    crearAulas: [true],
    capacidadAulas: [30, [Validators.min(1), Validators.max(500)]]
  });

  // --- Alumnos que caben en cada aula del pabellón ---
  protected readonly paraCapacidad = signal<Pabellon | null>(null);
  protected readonly filasCap = signal<FilaCapacidad[]>([]);
  protected readonly capacidadTodas = this.fb.nonNullable.control(30, [Validators.required, Validators.min(1), Validators.max(500)]);
  protected readonly totalCap = computed(() => totalCapacidad(this.filasCap()));
  protected readonly numCambios = computed(() => cambiosCapacidad(this.filasCap()).length);
  protected readonly hayInvalidas = computed(() => this.filasCap().some(f => !capacidadValida(f.capacidad)));
  protected readonly capacidadValida = capacidadValida;

  protected abrirCapacidades(p: Pabellon): void {
    this.errorForm.set(null);
    this.api.aulas().subscribe({
      next: todas => {
        const propias = todas.filter(a => a.pabellonId === p.id).sort((a, b) => a.codigo.localeCompare(b.codigo, 'es', { numeric: true }));
        this.filasCap.set(propias.map(aula => ({ aula, capacidad: aula.capacidad })));
        this.capacidadTodas.setValue(propias[0]?.capacidad ?? 30);
        this.paraCapacidad.set(p);
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar las aulas del pabellón.'))
    });
  }

  protected aplicarATodas(): void {
    if (this.capacidadTodas.invalid) return;
    const n = Math.trunc(this.capacidadTodas.value);
    this.filasCap.update(f => f.map(x => ({ ...x, capacidad: n })));
  }

  protected cambiarFila(i: number, valor: number): void {
    this.filasCap.update(f => f.map((x, j) => (j === i ? { ...x, capacidad: valor } : x)));
  }

  protected guardarCapacidades(): void {
    const p = this.paraCapacidad();
    const cambios = cambiosCapacidad(this.filasCap());
    if (!p || !cambios.length || this.hayInvalidas()) return;
    this.guardando.set(true);
    this.errorForm.set(null);
    this.api.fijarCapacidadesPabellon(p.id, cambios).subscribe({
      next: () => {
        this.guardando.set(false);
        this.paraCapacidad.set(null);
        this.avisos.success(`Pabellón ${p.nombre}: ${cambios.length} ${cambios.length === 1 ? 'aula actualizada' : 'aulas actualizadas'}.`);
        this.cargar();
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  /** Pabellón al que se le están creando las aulas que le faltan. */
  protected readonly paraAulas = signal<Pabellon | null>(null);
  protected readonly capacidadNuevas = this.fb.nonNullable.control(30, [Validators.required, Validators.min(1), Validators.max(500)]);

  /** «A-01, A-02…» para que se vea cómo se llamarán las aulas. */
  protected ejemploCodigos(): string {
    return ejemploCodigosDe(this.form.controls.nombre.value, this.form.controls.cantidadAulas.value);
  }
  protected ejemploCodigosDe(p: Pabellon): string {
    return ejemploCodigosDe(p.nombre, aulasLibres(p), p.aulasRegistradas);
  }

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.api.pabellones().subscribe({
      next: p => {
        this.pabellones.set(p);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los pabellones.'));
      }
    });
  }

  protected nuevo(): void {
    // Sugerencia: la siguiente letra libre (A, B, C…), que el usuario puede cambiar por lo que quiera.
    const usados = new Set(this.pabellones().map(p => p.nombre.toUpperCase()));
    const letra = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').find(l => !usados.has(l)) ?? '';
    this.form.reset({ nombre: letra, cantidadAulas: 10, crearAulas: true, capacidadAulas: 30 });
    this.errorForm.set(null);
    this.editando.set(null);
    this.abierto.set(true);
  }

  protected editar(p: Pabellon): void {
    this.form.reset({ nombre: p.nombre, cantidadAulas: p.cantidadAulas, crearAulas: false, capacidadAulas: 30 });
    this.errorForm.set(null);
    this.editando.set(p);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const body = { nombre: v.nombre.trim(), cantidadAulas: Number(v.cantidadAulas) };
    const e = this.editando();
    this.guardando.set(true);
    this.errorForm.set(null);
    (e ? this.api.actualizarPabellon(e.id, body) : this.api.crearPabellon(body)).subscribe({
      next: creado => {
        // Al crear, si se pidió, se crean de una vez las aulas que el pabellón declara.
        if (!e && v.crearAulas && body.cantidadAulas > 0) {
          this.api.crearAulasPabellon(creado.id, Number(v.capacidadAulas) || undefined).subscribe({
            next: p => this.terminar(`Pabellón ${p.nombre} creado con ${p.aulasRegistradas} aulas.`),
            error: err => {
              this.terminar('Pabellón creado, pero no se pudieron crear sus aulas: usa «Crear las aulas».');
              this.avisos.error(mensajeError(err));
            }
          });
          return;
        }
        this.terminar(e ? 'Pabellón actualizado.' : 'Pabellón creado.');
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  private terminar(mensaje: string): void {
    this.guardando.set(false);
    this.avisos.success(mensaje);
    this.cerrar();
    this.cargar();
  }

  protected abrirCrearAulas(p: Pabellon): void {
    this.capacidadNuevas.setValue(30);
    this.errorForm.set(null);
    this.paraAulas.set(p);
  }

  protected crearAulas(): void {
    const p = this.paraAulas();
    if (!p || this.capacidadNuevas.invalid) return;
    this.guardando.set(true);
    this.errorForm.set(null);
    this.api.crearAulasPabellon(p.id, this.capacidadNuevas.value).subscribe({
      next: r => {
        this.guardando.set(false);
        this.paraAulas.set(null);
        this.avisos.success(`Pabellón ${r.nombre}: ${r.aulasRegistradas} de ${r.cantidadAulas} aulas creadas.`);
        this.cargar();
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  protected async eliminar(p: Pabellon): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Eliminar el pabellón ${p.nombre}?`, 'Eliminar', true))) return;
    this.api.eliminarPabellon(p.id).subscribe({
      next: () => {
        this.avisos.success('Pabellón eliminado.');
        this.cargar();
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }
}
