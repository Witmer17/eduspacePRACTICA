import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Anio } from '../../core/models/planificacion.model';
import { AuthService } from '../../core/services/auth.service';
import { MatriculaService } from '../../core/services/matricula.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { PorAprobarInicioComponent } from '../dashboard/por-aprobar-inicio.component';
import { SolicitudesDescuentoComponent } from '../matriculas/solicitudes-descuento.component';
import { ATAJOS_SECRETARIA } from './atajos-secretaria';

/**
 * Inicio de la secretaría: lo que hace cada día, sin estadísticas de administración.
 * Arriba, matricular (el asistente por pasos); luego las matrículas por aprobar y los accesos a lo demás de su trabajo.
 */
@Component({
  selector: 'app-secretaria-inicio',
  imports: [RouterLink, PorAprobarInicioComponent, SolicitudesDescuentoComponent],
  template: `
    <div class="page">
      <section class="hero">
        <div>
          <p class="hola">{{ saludoHora() }}</p>
          <h1>{{ usuario()?.username }}</h1>
          <p class="sub">{{ anio() ? 'Año académico ' + anio()!.nombre : cargando() ? 'Cargando…' : 'No hay un año académico activo' }}</p>
        </div>
        <a class="btn btn-primary grande" routerLink="/matricula/asistente" [class.apagado]="!cargando() && !anio()">+ Matricular a un alumno</a>
      </section>

      @if (!cargando() && !anio()) {
        <div class="aviso aviso-warn" role="status">No hay un año académico activo, así que no se puede matricular. Pide al administrador que abra el periodo.</div>
      }

      <section class="cifras" aria-label="Resumen de matrícula">
        <a class="cifra" routerLink="/matriculas" [queryParams]="{ estado: 'PRE_MATRICULA' }" [class.alerta]="preMatriculas() > 0">
          <span>Pre-matrículas por pagar</span><strong>{{ preMatriculas() }}</strong><small>Esperan que la familia pague en Caja</small>
        </a>
        <a class="cifra" routerLink="/matriculas/aprobaciones" [class.alerta]="porAprobar() > 0">
          <span>Matrículas por aprobar</span><strong>{{ porAprobar() }}</strong><small>Ya pagaron: falta tu aprobación</small>
        </a>
      </section>

      <!-- Descuentos que las familias piden para la matrícula: sin tu respuesta no pueden pagarla -->
      <app-solicitudes-descuento />

      <app-por-aprobar-inicio />

      <h2 class="titulo-sec">Tu trabajo</h2>
      <div class="atajos">
        @for (a of atajos; track a.ruta) {
          <a class="atajo" [routerLink]="a.ruta" [queryParams]="a.consulta ?? null">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="a.icono" /></svg>
            <span><strong>{{ a.etiqueta }}</strong><small>{{ a.ayuda }}</small></span>
          </a>
        }
      </div>
    </div>
  `,
  styles: `
    .hero { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
    .hola { margin: 0; color: var(--primary); font-weight: 700; font-size: .9rem; }
    h1 { margin: 2px 0 4px; font-size: 1.9rem; letter-spacing: -.02em; }
    .sub { margin: 0; color: var(--ink-2); }
    .grande { min-height: 52px; padding: 0 26px; font-size: 1.05rem; }
    .apagado { opacity: .5; pointer-events: none; }
    .cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 16px; }
    .cifra { display: flex; flex-direction: column; gap: 2px; padding: 14px 18px; border: 1.5px solid var(--line-2); border-radius: 16px; background: var(--card); color: var(--ink); text-decoration: none; }
    .cifra span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .cifra strong { font-size: 2rem; line-height: 1.1; font-variant-numeric: tabular-nums; }
    .cifra small { color: var(--ink-2); }
    .cifra.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .cifra:hover { border-color: var(--primary); }
    .titulo-sec { margin: 22px 0 12px; font-size: 1.05rem; }
    .atajos { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
    .atajo { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1.5px solid var(--line-2); border-radius: 14px; background: var(--card); color: var(--ink); text-decoration: none; }
    .atajo svg { flex: none; color: var(--primary); }
    .atajo span { display: flex; flex-direction: column; min-width: 0; }
    .atajo small { color: var(--ink-2); }
    .atajo:hover { border-color: var(--primary); background: var(--primary-soft); }
  `
})
export class SecretariaInicioComponent implements OnInit {
  private readonly plan = inject(PlanificacionService);
  private readonly matriculas = inject(MatriculaService);
  protected readonly usuario = inject(AuthService).currentUser;

  protected readonly atajos = ATAJOS_SECRETARIA;
  protected readonly anio = signal<Anio | null>(null);
  protected readonly cargando = signal(true);
  protected readonly preMatriculas = signal(0);
  protected readonly porAprobar = signal(0);
  protected readonly saludoHora = computed(() => {
    const h = new Date().getHours();
    return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
  });

  ngOnInit(): void {
    this.plan.anios().pipe(catchError(() => of([] as Anio[]))).subscribe(anios => {
      const activo = anios.find(x => x.estado === 'ACTIVO') ?? null;
      this.anio.set(activo);
      this.cargando.set(false);
      if (!activo) return;
      this.matriculas.listar({ anioId: activo.id, estado: 'PRE_MATRICULA', size: 1 }).pipe(catchError(() => of(null))).subscribe(p => this.preMatriculas.set(p?.totalElementos ?? 0));
      this.matriculas.listar({ anioId: activo.id, estado: 'POR_APROBAR', size: 1 }).pipe(catchError(() => of(null))).subscribe(p => this.porAprobar.set(p?.totalElementos ?? 0));
    });
  }
}
