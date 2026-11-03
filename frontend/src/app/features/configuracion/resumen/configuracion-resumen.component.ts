import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Campania } from '../../../core/models/matricula.model';
import { MallaGrado } from '../../../core/models/planificacion.model';
import { MatriculaService } from '../../../core/services/matricula.service';
import { PagoConfigService } from '../../../core/services/pago-config.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { ConfigHeroComponent } from '../../../shared/components/config-hero/config-hero.component';
import { DatosConfig, EstadoItem, ItemConfig, avance, evaluarConfiguracion } from './estado-configuracion';

/** Un servicio apagado o sin permiso no debe tumbar el resumen: ese paso queda «sin datos». */
const seguro = <T>(obs: Observable<T>): Observable<T | null> => obs.pipe(catchError(() => of(null)));

/**
 * Punto de partida de Configuración: qué está listo y qué falta para dejar el colegio funcionando, en el orden en que conviene hacerlo,
 * con un enlace directo a la pantalla de cada paso.
 */
@Component({
  selector: 'app-configuracion-resumen',
  imports: [RouterLink, ConfigHeroComponent],
  template: `
    <div class="page n-otro">
      <app-config-hero titulo="Configuración del colegio" subtitulo="Lo que hace falta para que el colegio funcione, paso a paso. Cada fila lleva a su pantalla."
                       icono="M4 7h9M17 7h3M4 17h3M11 17h9M15 4v6M9 14v6">
        <div class="avance" role="img" [attr.aria-label]="resumen().porcentaje + ' por ciento configurado'">
          <strong>{{ resumen().porcentaje }}<small>%</small></strong>
          <span>{{ resumen().listos }} de {{ resumen().total }} pasos</span>
        </div>
      </app-config-hero>

      @if (cargando()) { <p class="muted">Revisando la configuración…</p> }

      <div class="cfg-dos">
        @for (g of grupos(); track g.titulo) {
          <section class="cfg-bloque" [attr.aria-label]="g.titulo">
            <h2>{{ g.titulo }}</h2>
            <ul class="pasos">
              @for (i of g.items; track i.id) {
                <li [class]="'paso ' + i.estado">
                  <span class="marca" aria-hidden="true">{{ marca(i.estado) }}</span>
                  <div class="paso-texto">
                    <strong>{{ i.titulo }}</strong>
                    <span class="muted">{{ i.detalle }}</span>
                  </div>
                  <a class="btn btn-sm" [routerLink]="i.ruta" [attr.aria-label]="(i.estado === 'ok' ? 'Revisar ' : 'Configurar ') + i.titulo">{{ i.estado === 'ok' ? 'Revisar' : 'Configurar' }}</a>
                </li>
              }
            </ul>
          </section>
        }
      </div>
    </div>
  `,
  styles: `
    .avance { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 104px; height: 104px; border-radius: 50%; background: rgb(255 255 255 / .16); border: 2px solid rgb(255 255 255 / .55); text-align: center; }
    .avance strong { font-size: 1.9rem; font-weight: 900; line-height: 1; }
    .avance small { font-size: .85rem; }
    .avance span { font-size: .62rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; opacity: .9; max-width: 80px; }
    .pasos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
    .paso { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px dashed var(--line); }
    .paso:first-child { border-top: 0; }
    .marca { flex: none; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; font-weight: 800; font-size: .9rem; background: var(--line); color: var(--ink-2); }
    .paso.ok .marca { background: var(--ok-soft); color: var(--ok); }
    .paso.pendiente .marca { background: var(--warn-soft); color: var(--warn); }
    .paso-texto { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .paso-texto strong { font-size: .93rem; }
    .paso.pendiente .paso-texto .muted { color: var(--warn); }
  `
})
export class ConfiguracionResumenComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly pagos = inject(PagoConfigService);
  private readonly matriculas = inject(MatriculaService);

  protected readonly cargando = signal(true);
  private readonly items = signal<ItemConfig[]>([]);
  protected readonly resumen = computed(() => avance(this.items()));

  /** Los pasos agrupados por tema, en el orden en que aparecen. */
  protected readonly grupos = computed(() => {
    const m = new Map<string, ItemConfig[]>();
    for (const i of this.items()) m.set(i.grupo, [...(m.get(i.grupo) ?? []), i]);
    return [...m.entries()].map(([titulo, items]) => ({ titulo, items }));
  });

  protected marca(e: EstadoItem): string {
    return e === 'ok' ? '✓' : e === 'pendiente' ? '!' : e === 'opcional' ? '–' : '?';
  }

  ngOnInit(): void {
    forkJoin({
      colegio: seguro(this.api.colegio()),
      oferta: seguro(this.api.ofertaGrados()),
      anios: seguro(this.api.anios()),
      aulas: seguro(this.api.aulas()),
      cursos: seguro(this.api.cursos()),
      grados: seguro(this.api.grados()),
      bloques: seguro(this.api.bloques()),
      areas: seguro(this.api.areas()),
      personal: seguro(this.api.personal('', 0, 1).pipe(map(p => p.totalElementos))),
      feriados: seguro(this.api.feriados().pipe(map(f => f.length))),
      conceptos: seguro(this.pagos.conceptos().pipe(map(c => c.filter(x => x.activo).length)))
    }).subscribe(base => {
      const activo = base.anios?.find(a => a.estado === 'ACTIVO') ?? null;
      const anioId = activo?.id;
      forkJoin({
        periodos: anioId ? seguro(this.api.periodos(anioId)) : of(base.anios === null ? null : []),
        secciones: anioId ? seguro(this.api.secciones(anioId)) : of(base.anios === null ? null : []),
        tarifas: anioId ? seguro(this.pagos.tarifas(anioId).pipe(map(t => t.filter(x => x.activo).length))) : of(base.anios === null ? null : 0),
        campanias: anioId ? seguro(this.matriculas.campanias(anioId)) : of(base.anios === null ? null : ([] as Campania[])),
        mallas: base.grados?.length
          ? forkJoin(base.grados.map(g => this.api.malla(g.id).pipe(catchError(() => of(null))))).pipe(
              map(ms => Object.fromEntries(base.grados!.map((g, i) => [g.id, ms[i]])) as Record<number, MallaGrado | null>))
          : of({} as Record<number, MallaGrado | null>)
      }).subscribe(r => {
        const datos: DatosConfig = { ...base, ...r };
        this.items.set(evaluarConfiguracion(datos));
        this.cargando.set(false);
      });
    });
  }
}
