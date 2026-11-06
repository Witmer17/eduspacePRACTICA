import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Anio } from '../../core/models/planificacion.model';
import { Campania } from '../../core/models/matricula.model';
import { MatriculaService } from '../../core/services/matricula.service';
import { NotificationService } from '../../core/services/notification.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { anioPorAbrir } from '../apertura/apertura';
import { proponerCampania } from '../apertura/apertura-asistente';
import { hoyLocal } from '../personal/asistencia-personal';
import { fechaCorta } from '../personal/rrhh';

/**
 * Tarjeta del Inicio: ¿se puede matricular?
 * - Con una campaña abierta: lo dice y muestra hasta cuándo.
 * - Con una campaña creada pero sin abrir: botón «Abrir campaña».
 * - Sin campaña: botón «Abrir campaña de matrícula» con su formulario (nombre y fechas) que la crea y la abre.
 */
@Component({
  selector: 'app-matricula-inicio',
  imports: [FormsModule, RouterLink, ModalComponent],
  template: `
    @if (cargado()) {
      <section class="card tarjeta" [class.abierta]="estado() === 'abierta'" aria-labelledby="t-matr">
        <div class="card-body cuerpo">
          <div class="texto">
            <h2 id="t-matr" class="sec-titulo" style="margin: 0">Matrícula en línea</h2>
            @switch (estado()) {
              @case ('sin-anio') {
                <p class="muted">No hay un año por abrir. Crea el año con el asistente de apertura y luego abre su campaña.</p>
              }
              @case ('error') {
                <p class="muted">No se pudo consultar la campaña de matrícula{{ anio() ? ' del año ' + anio()!.nombre : '' }}. Inténtalo de nuevo en unos segundos.</p>
              }
              @case ('abierta') {
                <p><span class="punto"></span> <strong>Campaña abierta:</strong> {{ campania()!.nombre }} · {{ fechaCorta(campania()!.fechaInicio) }} al {{ fechaCorta(campania()!.fechaFin) }}</p>
                @if (anio()!.estado !== 'ACTIVO') {
                  <p class="muted">El año {{ anio()!.nombre }} aún no está activo: <a routerLink="/apertura" [queryParams]="{ asistente: 1 }">ábrelo desde el asistente</a> para que los alumnos puedan matricularse.</p>
                }
              }
              @case ('planificada') {
                <p>La campaña <strong>{{ campania()!.nombre }}</strong> ({{ fechaCorta(campania()!.fechaInicio) }} al {{ fechaCorta(campania()!.fechaFin) }}) está creada pero <strong>sin abrir</strong>: los alumnos todavía no pueden matricularse.</p>
              }
              @default {
                <p>No hay una campaña de matrícula para el año {{ anio()!.nombre }}: los alumnos todavía no pueden matricularse.</p>
              }
            }
          </div>
          @if (estado() === 'error') {
            <div class="acciones"><button type="button" class="btn" (click)="cargar()">Reintentar</button></div>
          }
          @if (puedeAbrir() && estado() !== 'abierta' && estado() !== 'sin-anio' && estado() !== 'error') {
            <div class="acciones">
              @if (estado() === 'planificada') {
                <button type="button" class="btn btn-primary" [disabled]="ocupado()" (click)="abrirExistente()">{{ ocupado() ? 'Abriendo…' : 'Abrir campaña' }}</button>
              } @else {
                <button type="button" class="btn btn-primary" (click)="abrirFormulario()">Abrir campaña de matrícula</button>
              }
            </div>
          }
          @if (puedeAbrir() && estado() === 'sin-anio') {
            <div class="acciones"><a class="btn btn-primary" routerLink="/apertura" [queryParams]="{ asistente: 1 }">Asistente de apertura</a></div>
          }
        </div>
      </section>
    }

    @if (formulario()) {
      <app-modal titulo="Abrir campaña de matrícula" [ancho]="520" (cerrar)="formulario.set(false)">
        <form class="form-grid" id="form-campania-inicio" (ngSubmit)="crearYAbrir()" novalidate>
          <p class="muted full">Año {{ anio()?.nombre }}. Al guardarla se abre y la página pública deja matricular (con el año activo, secciones y tarifa de matrícula).</p>
          <div class="field full"><label for="ci-nombre">Nombre de la campaña</label><input id="ci-nombre" name="nombre" [ngModel]="nueva().nombre" (ngModelChange)="nueva.update(c => ({ ...c, nombre: $event }))" /></div>
          <div class="field"><label for="ci-ini">Desde</label><input id="ci-ini" name="ini" type="date" [ngModel]="nueva().fechaInicio" (ngModelChange)="nueva.update(c => ({ ...c, fechaInicio: $event }))" /></div>
          <div class="field"><label for="ci-fin">Hasta</label><input id="ci-fin" name="fin" type="date" [ngModel]="nueva().fechaFin" (ngModelChange)="nueva.update(c => ({ ...c, fechaFin: $event }))" /></div>
          @if (error()) { <div class="aviso aviso-danger full" role="alert">{{ error() }}</div> }
        </form>
        <ng-container footer>
          <button type="button" class="btn" (click)="formulario.set(false)">Cancelar</button>
          <button type="submit" form="form-campania-inicio" class="btn btn-primary" [disabled]="ocupado() || !valida()">{{ ocupado() ? 'Abriendo…' : 'Crear y abrir' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    :host { display: contents; }
    .tarjeta { margin-bottom: 16px; }
    .tarjeta.abierta { border-left: 4px solid var(--ok, #1e8e5a); }
    .cuerpo { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .texto p { margin: 6px 0 0; }
    .punto { display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: var(--ok, #1e8e5a); margin-right: 4px; }
    .acciones { display: flex; gap: 8px; }
  `
})
export class MatriculaInicioComponent implements OnInit {
  private readonly planificacion = inject(PlanificacionService);
  private readonly matriculas = inject(MatriculaService);
  private readonly avisos = inject(NotificationService);

  protected readonly fechaCorta = fechaCorta;
  /** Quien puede abrir campañas (administración): si es falso, la tarjeta solo informa. */
  readonly puedeAbrir = input(true);

  protected readonly cargado = signal(false);
  protected readonly anio = signal<Anio | null>(null);
  private readonly campanias = signal<Campania[]>([]);
  protected readonly ocupado = signal(false);
  protected readonly formulario = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly nueva = signal({ nombre: '', fechaInicio: '', fechaFin: '' });

  protected readonly campania = computed(() => this.campanias().find(c => c.estado === 'ABIERTA') ?? this.campanias().find(c => c.estado === 'PLANIFICADA') ?? null);
  /** No se pudieron leer las campañas del año (servicio apagado o muchas peticiones). */
  protected readonly falloCampanias = signal(false);
  protected readonly estado = computed<'sin-anio' | 'error' | 'abierta' | 'planificada' | 'sin-campania'>(() => {
    if (this.falloCampanias()) return 'error';
    if (!this.anio()) return 'sin-anio';
    const c = this.campania();
    return !c ? 'sin-campania' : c.estado === 'ABIERTA' ? 'abierta' : 'planificada';
  });
  protected readonly valida = computed(() => { const c = this.nueva(); return !!c.nombre.trim() && !!c.fechaInicio && !!c.fechaFin && c.fechaFin >= c.fechaInicio; });

  ngOnInit(): void {
    this.cargar();
  }

  protected cargar(): void {
    this.planificacion.anios().pipe(catchError(() => of(undefined))).subscribe(anios => {
      // Si no se pudieron leer los años, no se afirma que «no hay un año por abrir»: se avisa y se deja reintentar.
      this.falloCampanias.set(anios === undefined);
      const a = anioPorAbrir(anios ?? null);
      this.anio.set(a);
      if (!a) { this.cargado.set(true); return; }
      // Si no se pudo consultar, no se afirma que «no hay campaña»: se avisa y se deja reintentar.
      forkJoin({ c: this.matriculas.campanias(a.id).pipe(catchError(() => of(null))) }).subscribe(r => {
        this.falloCampanias.set(r.c === null);
        this.campanias.set(r.c ?? []);
        this.cargado.set(true);
      });
    });
  }

  protected abrirFormulario(): void {
    const a = this.anio();
    if (!a) return;
    this.nueva.set(proponerCampania(a, hoyLocal()));
    this.error.set(null);
    this.formulario.set(true);
  }

  protected abrirExistente(): void {
    const c = this.campania();
    if (!c) return;
    this.ocupado.set(true);
    this.matriculas.abrirCampania(c.id).subscribe({
      next: () => { this.ocupado.set(false); this.avisos.success(`Campaña «${c.nombre}» abierta.`); this.cargar(); },
      error: e => { this.ocupado.set(false); this.avisos.error(mensajeError(e, 'No se pudo abrir la campaña.')); }
    });
  }

  protected crearYAbrir(): void {
    const a = this.anio();
    if (!a || !this.valida() || this.ocupado()) return;
    const c = this.nueva();
    this.ocupado.set(true);
    this.error.set(null);
    this.matriculas.crearCampania({ anioId: a.id, nombre: c.nombre.trim(), fechaInicio: c.fechaInicio, fechaFin: c.fechaFin }).subscribe({
      next: creada => this.matriculas.abrirCampania(creada.id).subscribe({
        next: () => { this.ocupado.set(false); this.formulario.set(false); this.avisos.success(`Campaña «${creada.nombre}» creada y abierta.`); this.cargar(); },
        error: e => { this.ocupado.set(false); this.formulario.set(false); this.avisos.error(mensajeError(e, 'La campaña se creó, pero no se pudo abrir.')); this.cargar(); }
      }),
      error: e => { this.ocupado.set(false); this.error.set(mensajeError(e, 'No se pudo crear la campaña.')); }
    });
  }
}
