import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso, Grado, MallaGrado } from '../../../core/models/planificacion.model';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { claseNivel } from '../estructura/nivel-estilo';
import { FichaCurso, armarFichas, codigoDeCurso, horasSugeridas, normalizar } from './cursos-estandar';

/** Un curso que se está eligiendo para el grado: ya existe (o es estándar y se creará) con sus horas por semana. */
export interface FilaElegible {
  ficha: FichaCurso;
  sugerido: boolean;
  elegido: boolean;
  horas: number;
}

/** Un curso propio que se escribe en el cuadro para crearlo junto con su alta en el grado. */
export interface CursoNuevo {
  nombre: string;
  codigo: string;
  horas: number;
}

/**
 * Código libre para un curso nuevo: el que sugiere su nombre y, si ya lo usa otro curso, con un número al final («ROB», «ROB2», «ROB3»…).
 */
export function codigoLibre(nombre: string, usados: Iterable<string>): string {
  const ocupados = new Set([...usados].map(c => c.toUpperCase()));
  const base = codigoDeCurso(nombre) || 'CUR';
  if (!ocupados.has(base)) return base;
  for (let n = 2; ; n++) {
    const candidato = `${base.slice(0, 18)}${n}`;
    if (!ocupados.has(candidato)) return candidato;
  }
}

/**
 * Cuadro para agregar varios cursos a la malla de un grado de una vez: los cursos estándar del nivel aparecen primero y marcados como
 * sugeridos, con las horas que se suelen dictar; también se pueden elegir cursos ya existentes o escribir uno propio.
 * Los cursos estándar que aún no existen se crean al guardar.
 */
@Component({
  selector: 'app-agregar-cursos-grado',
  imports: [FormsModule, ModalComponent],
  template: `
    <app-modal [titulo]="'Agregar cursos a ' + grado().nombre" [ancho]="680" (cerrar)="cerrar.emit()">
      <div [class]="'ficha ' + clase()">
        <div>
          <strong>{{ grado().nombre }}</strong>
          <span class="muted">{{ grado().nivelNombre }} · {{ malla()?.cursos?.length ?? 0 }} cursos ya en la malla</span>
        </div>
        <span class="total">{{ totalElegidos() }} nuevos · {{ totalHoras() }} h</span>
      </div>

      @for (bloque of bloques(); track bloque.titulo) {
        @if (bloque.filas.length) {
          <h3 class="bloque-titulo">{{ bloque.titulo }}</h3>
          <div class="lista">
            @for (f of bloque.filas; track f.ficha.clave) {
              <div class="fila" [class.on]="f.elegido">
                <label class="marca">
                  <input type="checkbox" [checked]="f.elegido" (change)="alternar(f, $any($event.target).checked)" />
                  <span class="nombre"><strong>{{ f.ficha.nombre }}</strong><small>{{ f.ficha.area }}{{ f.ficha.existente ? '' : ' · se creará' }}</small></span>
                </label>
                <label class="horas">
                  <input type="number" min="1" max="40" [ngModel]="f.horas" (ngModelChange)="cambiarHoras(f, $event)" [disabled]="!f.elegido"
                         [attr.aria-label]="'Horas por semana de ' + f.ficha.nombre" /> h
                </label>
              </div>
            }
          </div>
        }
      }

      @if (nuevos().length) {
        <h3 class="bloque-titulo">Cursos propios nuevos</h3>
        <div class="lista">
          @for (n of nuevos(); track n.codigo; let i = $index) {
            <div class="fila on">
              <span class="nombre"><strong>{{ n.nombre }}</strong><small>{{ n.codigo }} · se creará</small></span>
              <span class="horas"><input type="number" min="1" max="40" [ngModel]="n.horas" (ngModelChange)="horasNuevo(i, $event)" [attr.aria-label]="'Horas de ' + n.nombre" /> h
                <button type="button" class="btn btn-sm" (click)="quitarNuevo(i)">Quitar</button></span>
            </div>
          }
        </div>
      }

      <div class="propio">
        <input class="input" [ngModel]="nombreNuevo()" (ngModelChange)="nombreNuevo.set($event)" (keydown.enter)="$event.preventDefault(); anadirNuevo()" maxlength="100"
               placeholder="¿Otro curso? Escribe su nombre, p. ej. Robótica" aria-label="Nombre del curso nuevo" />
        <button type="button" class="btn" [disabled]="!nombreNuevo().trim()" (click)="anadirNuevo()">Añadir</button>
      </div>
      @if (error()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ error() }}</div> }

      <ng-container footer>
        <button type="button" class="btn" (click)="cerrar.emit()">Cancelar</button>
        <button type="button" class="btn btn-primary" [disabled]="guardando() || totalElegidos() === 0" (click)="guardar()">
          {{ guardando() ? 'Guardando…' : totalElegidos() ? 'Agregar ' + totalElegidos() + (totalElegidos() === 1 ? ' curso' : ' cursos') : 'Agregar' }}
        </button>
      </ng-container>
    </app-modal>
  `,
  styles: `
    .ficha { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 8px; border-radius: 16px; background: var(--nivel-suave); }
    .ficha strong { display: block; font-size: 1.05rem; }
    .total { font-weight: 800; color: var(--nivel); white-space: nowrap; }
    .bloque-titulo { margin: 14px 0 6px; font-size: .75rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .lista { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .fila { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px; border: 1.5px solid var(--line-2); border-radius: 12px; background: var(--card); }
    .fila.on { border-color: var(--nivel); background: var(--nivel-suave); }
    .marca { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; cursor: pointer; }
    .nombre { display: flex; flex-direction: column; min-width: 0; }
    .nombre small { color: var(--ink-2); font-size: .72rem; }
    .horas { display: flex; align-items: center; gap: 4px; font-size: .8rem; color: var(--ink-2); }
    .horas input { width: 56px; padding: 4px 6px; }
    .propio { display: flex; gap: 8px; margin-top: 16px; }
    .propio .input { flex: 1; }
    @media (max-width: 640px) { .lista { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class AgregarCursosGradoComponent {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);

  readonly grado = input.required<Grado>();
  readonly nivelCodigo = input<string>('');
  readonly cursos = input.required<Curso[]>();
  readonly malla = input<MallaGrado | null>(null);
  readonly guardado = output<void>();
  readonly cerrar = output<void>();

  protected readonly clase = computed(() => claseNivel(this.nivelCodigo()));
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly nombreNuevo = signal('');
  protected readonly nuevos = signal<CursoNuevo[]>([]);
  /** Lo elegido por clave de ficha: si está marcado y con cuántas horas. */
  private readonly estado = signal<Record<string, { elegido: boolean; horas: number }>>({});

  /** Los cursos que el grado todavía no tiene, con su elección actual. */
  private readonly filas = computed<FilaElegible[]>(() => {
    const nivel = this.nivelCodigo();
    const yaEstan = new Set((this.malla()?.cursos ?? []).map(i => i.cursoId));
    return armarFichas(this.cursos().filter(c => c.activo), {})
      .filter(f => !f.existente || !yaEstan.has(f.existente.id))
      .map(ficha => {
        const e = this.estado()[ficha.clave];
        return { ficha, sugerido: !!ficha.estandar?.niveles.includes(nivel), elegido: e?.elegido ?? false, horas: e?.horas ?? horasSugeridas(ficha.estandar, nivel) };
      });
  });

  protected readonly bloques = computed(() => [
    { titulo: `Sugeridos para ${this.grado().nivelNombre}`, filas: this.filas().filter(f => f.sugerido) },
    { titulo: 'Otros cursos', filas: this.filas().filter(f => !f.sugerido) }
  ]);

  protected readonly totalElegidos = computed(() => this.filas().filter(f => f.elegido).length + this.nuevos().length);
  protected readonly totalHoras = computed(() => this.filas().filter(f => f.elegido).reduce((t, f) => t + f.horas, 0) + this.nuevos().reduce((t, n) => t + n.horas, 0));

  protected alternar(f: FilaElegible, elegido: boolean): void {
    this.estado.update(e => ({ ...e, [f.ficha.clave]: { elegido, horas: f.horas } }));
  }

  protected cambiarHoras(f: FilaElegible, valor: number): void {
    this.estado.update(e => ({ ...e, [f.ficha.clave]: { elegido: f.elegido, horas: horasValidas(valor) } }));
  }

  protected anadirNuevo(): void {
    const nombre = this.nombreNuevo().trim();
    if (!nombre) return;
    const existe = this.cursos().some(c => normalizar(c.nombre) === normalizar(nombre)) || this.nuevos().some(n => normalizar(n.nombre) === normalizar(nombre));
    if (existe) {
      this.error.set(`«${nombre}» ya está en la lista: márcalo arriba.`);
      return;
    }
    this.error.set(null);
    const usados = [...this.cursos().map(c => c.codigo), ...this.nuevos().map(n => n.codigo)];
    this.nuevos.update(l => [...l, { nombre, codigo: codigoLibre(nombre, usados), horas: 2 }]);
    this.nombreNuevo.set('');
  }

  protected horasNuevo(i: number, valor: number): void {
    this.nuevos.update(l => l.map((n, j) => (j === i ? { ...n, horas: horasValidas(valor) } : n)));
  }

  protected quitarNuevo(i: number): void {
    this.nuevos.update(l => l.filter((_, j) => j !== i));
  }

  protected guardar(): void {
    const elegidas = this.filas().filter(f => f.elegido);
    const propios = this.nuevos();
    if (!elegidas.length && !propios.length) return;
    this.guardando.set(true);
    this.error.set(null);

    // Primero se crean los cursos que aún no existen (estándar elegidos y propios); después todo entra a la malla de una vez.
    const crear = (nombre: string, codigo: string, area: string | undefined, horas: number): Observable<{ cursoId: number; horasSemanales: number }> =>
      this.api.crearCurso({ codigo, nombre, area, activo: true }).pipe(map(c => ({ cursoId: c.id, horasSemanales: horas })));

    const peticiones: Observable<{ cursoId: number; horasSemanales: number }>[] = [
      ...elegidas.map(f => (f.ficha.existente ? of({ cursoId: f.ficha.existente.id, horasSemanales: f.horas }) : crear(f.ficha.nombre, f.ficha.codigo, f.ficha.area, f.horas))),
      ...propios.map(n => crear(n.nombre, n.codigo, undefined, n.horas))
    ];
    forkJoin(peticiones).subscribe({
      next: items => this.api.agregarMallaLote({ gradoIds: [this.grado().id], cursos: items, sobrescribir: false }).subscribe({
        next: r => {
          this.guardando.set(false);
          this.avisos.success(`${r.creados} ${r.creados === 1 ? 'curso agregado' : 'cursos agregados'} a ${this.grado().nombre}.`);
          this.guardado.emit();
        },
        error: e => this.fallo(e)
      }),
      error: e => this.fallo(e)
    });
  }

  private fallo(e: unknown): void {
    this.guardando.set(false);
    this.error.set(mensajeError(e));
  }
}

/** Horas por semana válidas: entero entre 1 y 40 (lo escrito fuera de rango se acerca al límite). */
export function horasValidas(v: unknown): number {
  const n = Math.trunc(Number(v));
  return Number.isFinite(n) ? Math.min(Math.max(n, 1), 40) : 2;
}
