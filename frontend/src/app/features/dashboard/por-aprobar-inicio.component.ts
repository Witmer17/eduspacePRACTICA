import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Matricula } from '../../core/models/matricula.model';
import { Seccion } from '../../core/models/planificacion.model';
import { MatriculaService } from '../../core/services/matricula.service';
import { PlanificacionService } from '../../core/services/planificacion.service';

const MAX_FILAS = 6;

/** Lo que se cuenta del origen de una matrícula pagada: la matrícula en línea deja «en línea» en sus observaciones. */
export const origenMatricula = (m: Pick<Matricula, 'observaciones'>): 'En línea' | 'Presencial' =>
  (m.observaciones ?? '').toLowerCase().includes('en línea') ? 'En línea' : 'Presencial';

/**
 * Tarjeta del Inicio (administración y secretaría): los alumnos cuya matrícula ya está pagada y espera su aprobación. Muestra los más antiguos primero
 * (llevan más tiempo esperando), cuántos hay en total y lleva a la pantalla donde se revisan y aprueban.
 */
@Component({
  selector: 'app-por-aprobar-inicio',
  imports: [DatePipe, RouterLink],
  template: `
    <section class="card" [class.pendiente]="total() > 0" aria-labelledby="t-aprobar">
      <div class="card-body">
        <div class="sec-cab">
          <h2 id="t-aprobar" class="sec-titulo">Alumnos por aprobar su matrícula
            @if (total() > 0) { <span class="badge badge-warn">{{ total() }}</span> }
          </h2>
          <a class="btn btn-sm" [class.btn-primary]="total() > 0" routerLink="/matriculas/aprobaciones">{{ total() > 0 ? 'Revisar y aprobar' : 'Ver aprobaciones' }}</a>
        </div>
        @if (estado() === 'cargando') {
          <p class="muted">Cargando…</p>
        } @else if (estado() === 'error') {
          <p class="muted">No se pudo leer la lista de matrículas por aprobar. <button type="button" class="enlace" (click)="cargar()">Reintentar</button></p>
        } @else if (total() === 0) {
          <div class="aviso aviso-ok">No hay matrículas esperando aprobación.</div>
        } @else {
          <p class="muted" style="margin: 0 0 8px">Ya pagaron: al aprobarlas se matricula al alumno, se generan las pensiones y la familia recibe su acceso por correo.</p>
          <ul class="lista">
            @for (m of filas(); track m.id) {
              <li>
                <div class="txt">
                  <strong>{{ m.alumnoNombre }}</strong>
                  <span class="muted">{{ seccionDe(m) }} · {{ m.codigo }}</span>
                </div>
                <span class="der">
                  <span class="badge badge-gray">{{ origen(m) }}</span>
                  <small class="muted">{{ (m.pagadaEn ?? m.creadoEn) | date: 'dd/MM HH:mm' }}</small>
                </span>
              </li>
            }
          </ul>
          @if (total() > filas().length) { <p class="muted" style="margin-top: 8px">y {{ total() - filas().length }} más…</p> }
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: contents; }
    .pendiente { border-left: 4px solid var(--warn, #d9822b); }
    .sec-cab { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; }
    .lista { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .lista li { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 8px 10px; border: 1px solid var(--line); border-radius: 12px; }
    .txt { display: flex; flex-direction: column; min-width: 0; }
    .der { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .enlace { border: 0; background: none; padding: 0; font: inherit; color: var(--primary); text-decoration: underline; cursor: pointer; }
  `
})
export class PorAprobarInicioComponent implements OnInit {
  private readonly matriculas = inject(MatriculaService);

  private readonly plan = inject(PlanificacionService);
  /** Las secciones (de todos los años), para decir en cuál se matriculó cada alumno. */
  private readonly secciones = signal<Seccion[]>([]);

  protected readonly estado = signal<'cargando' | 'ok' | 'error'>('cargando');
  protected readonly pendientes = signal<Matricula[]>([]);
  protected readonly total = signal(0);
  protected readonly origen = origenMatricula;
  /** Las que más tiempo llevan esperando, primero. */
  protected readonly filas = computed(() =>
    [...this.pendientes()].sort((a, b) => (a.pagadaEn ?? a.creadoEn ?? '').localeCompare(b.pagadaEn ?? b.creadoEn ?? '')).slice(0, MAX_FILAS));

  ngOnInit(): void {
    this.plan.secciones().pipe(catchError(() => of([] as Seccion[]))).subscribe(s => this.secciones.set(s));
    this.cargar();
  }

  protected cargar(): void {
    this.estado.set('cargando');
    this.matriculas.listar({ estado: 'POR_APROBAR', size: 100 }).pipe(catchError(() => of(null))).subscribe(p => {
      if (!p) { this.estado.set('error'); return; }
      this.pendientes.set(p.contenido);
      this.total.set(p.totalElementos);
      this.estado.set('ok');
    });
  }

  protected seccionDe(m: Matricula): string {
    const s = this.secciones().find(x => x.id === m.seccionId);
    return s ? `${s.gradoNombre} · ${s.nombre}` : `Sección ${m.seccionId}`;
  }
}
