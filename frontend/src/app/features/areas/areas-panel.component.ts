import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FondoResumen } from '../../core/models/fondo.model';
import { Area, Docente } from '../../core/models/planificacion.model';
import { AuthService } from '../../core/services/auth.service';
import { FondoService } from '../../core/services/fondo.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { soles } from '../personal/rrhh';
import { paginaPropiaDe, rutaDelArea } from './areas-paginas';

/**
 * Todas las áreas de trabajo del colegio, cada una con su tarjeta. Las que ya tienen una sección propia en el sistema (Secretaría → Matrícula,
 * Tesorería → Finanzas…) llevan ahí; las demás abren su página, que muestra su personal, su asistencia, su dinero y accesos a lo que necesitan.
 */
@Component({
  selector: 'app-areas-panel',
  imports: [RouterLink, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Áreas de trabajo" subtitulo="Cada área con su gente. Abre una para ver su personal, su asistencia y lo que necesita; las que ya tienen su propia sección te llevan allí." />

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      <div class="resumen">
        <span><strong>{{ visibles().length }}</strong> {{ visibles().length === 1 ? 'área' : 'áreas' }}</span>
        <span class="muted">{{ totalPersonal() }} {{ totalPersonal() === 1 ? 'persona' : 'personas' }} en total</span>
        @if (inactivas() > 0) {
          <label class="check"><input type="checkbox" [checked]="verInactivas()" (change)="verInactivas.set(!verInactivas())" /> Mostrar las {{ inactivas() }} inactivas</label>
        }
      </div>

      <div class="rejilla">
        @for (a of visibles(); track a.id) {
          @let propia = propiaDe(a);
          <article class="area" [class.apagada]="!a.activo">
            <header>
              <span class="inicial" aria-hidden="true">{{ a.nombre.charAt(0) }}</span>
              <div class="titulo">
                <h2>{{ a.nombre }}</h2>
                <span class="muted">{{ a.activo ? 'Activa' : 'Inactiva' }}</span>
              </div>
              @if (propia) { <span class="badge badge-ok" [title]="'Ya tiene su sección: ' + propia.etiqueta">Con sección propia</span> }
            </header>
            <p class="desc">{{ a.descripcion || 'Sin descripción.' }}</p>
            <div class="datos">
              <div><span>Personal</span><strong>{{ personasDe(a.id) }}</strong></div>
              @if (esAdmin() && fondo()) { <div><span>Dinero asignado</span><strong>{{ dinero(asignadoDe(a.id)) }}</strong></div> }
            </div>
            <footer>
              <a class="btn btn-primary btn-sm" [routerLink]="ruta(a)">{{ propia ? 'Ir a ' + propia.etiqueta : 'Abrir la página del área' }}</a>
              <a class="btn btn-sm" routerLink="/personal" [queryParams]="{ areaId: a.id }">Ver su personal</a>
            </footer>
          </article>
        } @empty {
          <p class="muted">{{ cargando() ? 'Cargando…' : 'Aún no hay áreas.' }}</p>
        }
      </div>
    </div>
  `,
  styles: `
    .resumen { display: flex; align-items: baseline; gap: 18px; flex-wrap: wrap; }
    .resumen strong { font-size: 1.4rem; }
    .check { display: inline-flex; align-items: center; gap: 6px; font-size: .88rem; color: var(--ink-2); cursor: pointer; }
    .rejilla { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 16px; }
    .area { display: flex; flex-direction: column; gap: 10px; padding: 16px; background: var(--card); border: 1px solid var(--line); border-top: 4px solid var(--primary); border-radius: 16px; }
    .area.apagada { opacity: .6; border-top-color: var(--line-2); }
    .area header { display: flex; align-items: center; gap: 12px; }
    .inicial { flex: none; width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px; background: var(--primary-soft); color: var(--primary); font-weight: 900; font-size: 1.15rem; }
    .titulo { flex: 1; min-width: 0; }
    .titulo h2 { margin: 0; font-size: 1rem; font-weight: 800; line-height: 1.2; }
    .desc { margin: 0; flex: 1; font-size: .88rem; color: var(--ink-2); line-height: 1.4; }
    .datos { display: flex; gap: 10px; }
    .datos div { flex: 1; display: flex; flex-direction: column; padding: 8px 12px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .datos span { font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .datos strong { font-size: 1.2rem; font-variant-numeric: tabular-nums; }
    .area footer { display: flex; gap: 8px; flex-wrap: wrap; }
  `
})
export class AreasPanelComponent implements OnInit {
  private readonly plan = inject(PlanificacionService);
  private readonly fondoApi = inject(FondoService);
  private readonly auth = inject(AuthService);

  protected readonly esAdmin = this.auth.isAdmin;
  protected readonly dinero = soles;
  protected readonly areas = signal<Area[]>([]);
  protected readonly personal = signal<Docente[]>([]);
  protected readonly fondo = signal<FondoResumen | null>(null);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly verInactivas = signal(false);

  protected readonly inactivas = computed(() => this.areas().filter(a => !a.activo).length);
  protected readonly visibles = computed(() =>
    [...this.areas()].filter(a => a.activo || this.verInactivas()).sort((a, b) => Number(b.activo) - Number(a.activo) || a.nombre.localeCompare(b.nombre, 'es')));
  protected readonly totalPersonal = computed(() => this.personal().length);

  ngOnInit(): void {
    this.plan.areas(true).subscribe({
      next: a => { this.areas.set(a); this.cargando.set(false); },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudieron cargar las áreas.')); }
    });
    this.plan.todoElPersonalActivo().pipe(catchError(() => of([] as Docente[]))).subscribe(p => this.personal.set(p));
    if (this.esAdmin()) this.fondoApi.resumen().pipe(catchError(() => of(null))).subscribe(f => this.fondo.set(f));
  }

  protected personasDe(areaId: number): number {
    return this.personal().filter(p => p.areaId === areaId).length;
  }

  protected asignadoDe(areaId: number): number {
    return this.fondo()?.areas.find(x => x.areaId === areaId)?.asignado ?? 0;
  }

  protected propiaDe(a: Area) {
    return paginaPropiaDe(a.codigo, this.auth.roles());
  }

  protected ruta(a: Area): string {
    return rutaDelArea(a.codigo, this.auth.roles());
  }
}
