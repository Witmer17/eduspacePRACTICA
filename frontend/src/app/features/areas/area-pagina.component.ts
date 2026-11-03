import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AsistenciaPersonal } from '../../core/models/asistencia-personal.model';
import { FondoResumen, MovimientoFondo } from '../../core/models/fondo.model';
import { Area, Docente } from '../../core/models/planificacion.model';
import { Contrato } from '../../core/models/rrhh.model';
import { AsistenciaPersonalService } from '../../core/services/asistencia-personal.service';
import { AuthService } from '../../core/services/auth.service';
import { FondoService } from '../../core/services/fondo.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { RrhhService } from '../../core/services/rrhh.service';
import { mensajeError } from '../../core/utils/errores';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ResumenPersona, rangoDelMes, resumenPorPersona } from '../personal/asistencia-personal';
import {
  accesosDe, alertasDe, funcionesDe, kpisDeArea, paginaPropiaDe
} from './areas-paginas';
import { claseEstadoContrato, contratoActual, contratosPorPersona, etiquetaEstadoContrato, fechaCorta, nombrePeriodo, periodoDe, periodoValido, soles } from '../personal/rrhh';

/**
 * Página de un área de trabajo: su personal con la asistencia del mes, lo que hay que atender (contratos por vencer, personas sin cuenta de acceso),
 * lo que hace el área, accesos a las pantallas que suele necesitar y, para el administrador, su dinero asignado. Sirve a cualquier área, también
 * a las que cree el colegio después. Las áreas que ya tienen su propia sección (Matrícula, Finanzas…) apuntan allí.
 */
@Component({
  selector: 'app-area-pagina',
  imports: [ReactiveFormsModule, RouterLink, PageHeaderComponent],
  template: `
    <div class="page">
      @if (noExiste()) {
        <app-page-header titulo="Área no encontrada" subtitulo="No existe un área con ese código." />
        <a class="btn" routerLink="/areas">Ver todas las áreas</a>
      } @else if (area(); as a) {
        <app-page-header [titulo]="a.nombre" [subtitulo]="a.descripcion || 'Área de trabajo del colegio.'" />

        @if (!a.activo) { <div class="aviso aviso-warn" role="status">Esta área está <strong>desactivada</strong>: ya no se ofrece al registrar personal.</div> }
        @if (propia(); as p) {
          <div class="aviso aviso-ok" role="status">Esta área ya tiene su propia sección: <a [routerLink]="p.ruta"><strong>{{ p.etiqueta }}</strong></a>.</div>
        }
        @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

        <div class="barra">
          <a class="btn btn-sm" routerLink="/areas">← Todas las áreas</a>
          <label class="mes">Mes <input class="input" type="month" [formControl]="mes" [max]="mesActual" aria-label="Mes de la asistencia" /></label>
          <span class="espacio"></span>
          <a class="btn btn-sm" routerLink="/personal/asistencia" [queryParams]="{ areaId: a.id }">Marcar asistencia del área</a>
          <a class="btn btn-sm btn-primary" routerLink="/personal" [queryParams]="{ areaId: a.id, nuevo: 1 }">Agregar personal</a>
        </div>

        <!-- Números del área -->
        <div class="tiles">
          <div class="tile"><span>Personal activo</span><strong>{{ kpis().personas }}</strong></div>
          <div class="tile" [class.alerta]="kpis().asistencia !== null && kpis().asistencia! < 85">
            <span>Asistencia · {{ nombreMes() }}</span>
            <strong>{{ cargandoMes() ? '…' : kpis().asistencia === null ? '—' : kpis().asistencia + '%' }}</strong>
            <small>presentes y tardanzas sobre los días exigibles</small>
          </div>
          <div class="tile" [class.alerta]="kpis().faltas > 0"><span>Faltas</span><strong>{{ cargandoMes() ? '…' : kpis().faltas }}</strong><small>{{ kpis().tardanzas }} {{ kpis().tardanzas === 1 ? 'tardanza' : 'tardanzas' }}</small></div>
          @if (esAdmin()) {
            <div class="tile" [class.alerta]="kpis().sinContrato + kpis().porVencer > 0">
              <span>Contratos por atender</span><strong>{{ kpis().sinContrato + kpis().porVencer }}</strong>
              <small>{{ kpis().sinContrato }} sin contrato · {{ kpis().porVencer }} por vencer</small>
            </div>
            <div class="tile"><span>Dinero asignado</span><strong>{{ fondo() ? dinero(asignado()) : '—' }}</strong><small>de lo cobrado en el colegio</small></div>
          }
        </div>

        <div class="dos-columnas">
          <section class="bloque">
            <h3>Qué hace esta área</h3>
            @if (funciones().length) { <ul class="lista">@for (f of funciones(); track f) { <li>{{ f }}</li> }</ul> }
            @else { <p class="muted">{{ a.descripcion || 'Aún no se describieron sus funciones: edita el área para escribirlas.' }}</p> }
            @if (accesos().length) {
              <h3>Accesos</h3>
              <div class="accesos">
                @for (x of accesos(); track x.ruta) {
                  <a class="acceso" [routerLink]="x.ruta"><strong>{{ x.etiqueta }}</strong><small>{{ x.ayuda }}</small></a>
                }
              </div>
            }
          </section>

          <section class="bloque">
            <h3>Para atender</h3>
            @if (atencion().length) {
              <ul class="atencion">
                @for (x of atencion(); track x.id) {
                  <li><strong>{{ x.nombre }}</strong> <span class="etiquetas">@for (m of x.motivos; track m) { <span class="badge badge-warn">{{ m }}</span> }</span></li>
                }
              </ul>
            } @else { <p class="muted">{{ personal().length ? 'Nada pendiente: todos con su contrato y su cuenta de acceso en orden.' : 'Aún no hay personal en esta área.' }}</p> }

            @if (esAdmin()) {
              <h3>Dinero del área</h3>
              @if (fondo()) {
                <div class="dinero-fila"><span>Asignado hoy</span><strong>{{ dinero(asignado()) }}</strong></div>
                @if (movimientos().length) {
                  <ul class="movimientos">
                    @for (m of movimientos(); track m.id) {
                      <li><span class="muted">{{ fecha(m.creadoEn) }}</span><span class="mov-motivo">{{ m.motivo || (m.monto > 0 ? 'Asignación' : 'Devolución a caja') }}</span><strong [class.devuelve]="m.monto < 0">{{ m.monto > 0 ? '+' : '−' }} {{ dinero(abs(m.monto)) }}</strong></li>
                    }
                  </ul>
                } @else { <p class="muted">Todavía no se le asignó dinero.</p> }
                <a class="btn btn-sm" routerLink="/configuracion/areas">Asignar o devolver dinero</a>
              } @else { <p class="muted">Cargando el dinero…</p> }
            }
          </section>
        </div>

        <!-- Personal del área -->
        <section class="bloque ancho">
          <h3>Personal del área</h3>
          <div class="table-wrap">
            <table class="table tabla-area">
              <thead>
                <tr>
                  <th>Persona</th><th>Asistencia · {{ nombreMes() }}</th>
                  @if (esAdmin()) { <th>Contrato</th> }
                  <th>Cuenta de acceso</th><th></th>
                </tr>
              </thead>
              <tbody>
                @for (f of filas(); track f.p.id) {
                  <tr>
                    <td>
                      <div class="persona">
                        <span class="avatar-fila" aria-hidden="true">{{ f.p.nombres.charAt(0) }}{{ f.p.apellidos.charAt(0) }}</span>
                        <div class="persona-datos"><strong>{{ f.p.apellidos }}, {{ f.p.nombres }}</strong><span class="muted">{{ f.p.cargo || 'Sin cargo indicado' }}</span></div>
                      </div>
                    </td>
                    <td>
                      @if (cargandoMes()) { <span class="muted">…</span> }
                      @else if (f.resumen; as r) {
                        <span class="mini ok" title="Presentes">{{ r.presentes }} P</span>
                        <span class="mini warn" title="Tardanzas">{{ r.tardanzas }} T</span>
                        <span class="mini danger" title="Faltas">{{ r.faltas }} F</span>
                        @if (r.porcentaje !== null) { <strong class="pct">{{ r.porcentaje }}%</strong> }
                      } @else { <span class="muted">Sin registro</span> }
                    </td>
                    @if (esAdmin()) {
                      <td>
                        @if (f.contrato; as c) { <span [class]="'badge ' + claseContrato(c)">{{ etiquetaContrato(c) }}</span> <div class="muted">{{ dinero(c.remuneracion) }}@if (c.fechaFin) { · hasta {{ fechaCorta(c.fechaFin) }} }</div> }
                        @else { <span class="badge badge-gray">Sin contrato</span> }
                      </td>
                    }
                    <td><span [class]="'badge ' + (f.p.usuarioId ? 'badge-ok' : 'badge-gray')">{{ f.p.usuarioId ? 'Con cuenta' : 'Sin cuenta' }}</span></td>
                    <td class="acciones"><a class="btn btn-sm" routerLink="/personal" [queryParams]="{ areaId: a.id }">Ver ficha</a></td>
                  </tr>
                } @empty {
                  <tr><td [attr.colspan]="esAdmin() ? 5 : 4" class="vacio">{{ cargando() ? 'Cargando…' : 'Todavía no hay personal activo en esta área.' }}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      } @else {
        <app-page-header titulo="Cargando…" subtitulo="" />
      }
    </div>
  `,
  styles: `
    .barra { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .barra .espacio { flex: 1; }
    .mes { display: flex; align-items: center; gap: 8px; font-weight: 600; }
    .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 12px; }
    .tile { display: flex; flex-direction: column; gap: 2px; padding: 12px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); }
    .tile.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .tile span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .tile strong { font-size: 1.6rem; font-variant-numeric: tabular-nums; }
    .tile small { color: var(--ink-2); font-size: .74rem; }
    .dos-columnas { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: start; }
    .bloque { display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1px solid var(--line); border-radius: 16px; background: var(--card); }
    .bloque.ancho { margin-top: 0; }
    .bloque h3 { margin: 0; font-size: .74rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .bloque h3:not(:first-child) { margin-top: 8px; }
    .lista { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 4px; }
    .accesos { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 8px; }
    .acceso { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; border: 1.5px solid var(--line-2); border-radius: 12px; background: var(--bg); text-decoration: none; color: inherit; }
    .acceso:hover { border-color: var(--primary); background: var(--primary-soft); }
    .acceso small { color: var(--ink-2); font-size: .74rem; }
    .atencion { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .atencion li { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .etiquetas { display: flex; gap: 6px; flex-wrap: wrap; }
    .dinero-fila { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 12px; border-radius: 12px; background: var(--bg); border: 1px solid var(--line); }
    .dinero-fila strong { font-size: 1.3rem; font-variant-numeric: tabular-nums; }
    .movimientos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; font-size: .84rem; }
    .movimientos li { display: grid; grid-template-columns: 78px minmax(0, 1fr) auto; gap: 8px; align-items: baseline; padding: 4px 0; border-bottom: 1px dashed var(--line); }
    .movimientos strong { font-variant-numeric: tabular-nums; }
    .movimientos strong.devuelve { color: var(--ok); }
    .mov-motivo { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .tabla-area th { text-transform: uppercase; letter-spacing: .05em; font-size: 11px; background: var(--bg); border-bottom: 1px solid var(--line); }
    .tabla-area tbody tr:hover { background: var(--primary-soft); }
    .persona { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .persona-datos { display: flex; flex-direction: column; min-width: 0; }
    .persona-datos .muted { font-size: 12px; }
    .avatar-fila { flex: none; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; background: var(--primary-soft); color: var(--primary); font-weight: 800; font-size: .8rem; }
    .mini { display: inline-block; margin-right: 4px; padding: 1px 8px; border-radius: 999px; font-size: .72rem; font-weight: 800; }
    .mini.ok { color: var(--ok); background: var(--ok-soft); }
    .mini.warn { color: var(--warn); background: var(--warn-soft); }
    .mini.danger { color: #8e1c12; background: var(--danger-soft); }
    .pct { margin-left: 6px; font-variant-numeric: tabular-nums; }
    @media (max-width: 900px) { .dos-columnas { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class AreaPaginaComponent {
  private readonly plan = inject(PlanificacionService);
  private readonly rrhh = inject(RrhhService);
  private readonly asistencia = inject(AsistenciaPersonalService);
  private readonly fondoApi = inject(FondoService);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly destruido = inject(DestroyRef);

  protected readonly esAdmin = this.auth.isAdmin;
  protected readonly dinero = soles;
  protected readonly fechaCorta = fechaCorta;
  protected readonly abs = Math.abs;
  protected readonly mesActual = periodoDe(new Date());
  protected readonly mes = this.fb.nonNullable.control(this.mesActual);
  private readonly mesElegido = signal(this.mesActual);
  protected readonly nombreMes = computed(() => nombrePeriodo(this.mesElegido()));

  protected readonly area = signal<Area | null>(null);
  protected readonly noExiste = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly cargando = signal(true);
  protected readonly cargandoMes = signal(false);
  protected readonly personal = signal<Docente[]>([]);
  private readonly contratos = signal<Map<number, Contrato[]>>(new Map());
  private readonly registros = signal<AsistenciaPersonal[]>([]);
  protected readonly fondo = signal<FondoResumen | null>(null);
  protected readonly movimientos = signal<MovimientoFondo[]>([]);

  protected readonly funciones = computed(() => funcionesDe(this.area()?.codigo ?? ''));
  protected readonly accesos = computed(() => accesosDe(this.area()?.codigo ?? '', this.auth.roles()));
  protected readonly propia = computed(() => paginaPropiaDe(this.area()?.codigo ?? '', this.auth.roles()));
  private readonly resumenes = computed(() => {
    const ids = new Set(this.personal().map(p => p.id));
    return resumenPorPersona(this.registros().filter(r => ids.has(r.personalId)));
  });

  /** El contrato de cada persona solo se conoce (y se muestra) para el administrador. */
  private contratoDe(id: number): Contrato | undefined {
    return this.esAdmin() ? contratoActual(this.contratos().get(id) ?? []) : undefined;
  }

  protected readonly filas = computed(() => [...this.personal()]
    .sort((a, b) => a.apellidos.localeCompare(b.apellidos, 'es') || a.nombres.localeCompare(b.nombres, 'es'))
    .map(p => ({ p, resumen: this.resumenes().get(p.id) as ResumenPersona | undefined, contrato: this.contratoDe(p.id) })));
  protected readonly kpis = computed(() => kpisDeArea(this.personal(), this.resumenes(), id => this.contratoDe(id)));
  protected readonly atencion = computed(() => this.filas()
    .map(f => ({ id: f.p.id, nombre: `${f.p.apellidos}, ${f.p.nombres}`, motivos: alertasDe(f.contrato, !!f.p.usuarioId, this.esAdmin()) }))
    .filter(x => x.motivos.length));
  protected readonly asignado = computed(() => {
    const a = this.area();
    return a ? this.fondo()?.areas.find(x => x.areaId === a.id)?.asignado ?? 0 : 0;
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destruido)).subscribe(p => this.cargar(p.get('codigo') ?? ''));
    this.mes.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(v => {
      this.mesElegido.set(v);
      if (periodoValido(v)) this.cargarAsistencia();
    });
  }

  protected claseContrato(c: Contrato): string { return claseEstadoContrato(c.estadoEfectivo); }
  protected etiquetaContrato(c: Contrato): string { return etiquetaEstadoContrato(c.estadoEfectivo); }
  protected fecha(creadoEn: string): string { return fechaCorta(creadoEn.slice(0, 10)); }

  private cargar(codigo: string): void {
    this.area.set(null);
    this.noExiste.set(false);
    this.error.set(null);
    this.cargando.set(true);
    this.personal.set([]);
    this.plan.areas(true).subscribe({
      next: areas => {
        const a = areas.find(x => x.codigo.toUpperCase() === codigo.toUpperCase());
        if (!a) { this.noExiste.set(true); this.cargando.set(false); return; }
        this.area.set(a);
        this.plan.todoElPersonalActivo().subscribe({
          next: todos => { this.personal.set(todos.filter(p => p.areaId === a.id)); this.cargando.set(false); this.cargarAsistencia(); },
          error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar el personal del área.')); }
        });
        if (this.esAdmin()) {
          forkJoin({
            contratos: this.rrhh.contratos().pipe(catchError(() => of([] as Contrato[]))),
            fondo: this.fondoApi.resumen().pipe(catchError(() => of(null))),
            movimientos: this.fondoApi.movimientos(a.id).pipe(catchError(() => of([] as MovimientoFondo[])))
          }).subscribe(r => { this.contratos.set(contratosPorPersona(r.contratos)); this.fondo.set(r.fondo); this.movimientos.set(r.movimientos.slice(0, 5)); });
        }
      },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar el área.')); }
    });
  }

  private cargarAsistencia(): void {
    if (!periodoValido(this.mes.value)) return;
    const { desde, hasta } = rangoDelMes(this.mes.value);
    this.cargandoMes.set(true);
    this.asistencia.consultar(desde, hasta).pipe(catchError(() => of([] as AsistenciaPersonal[]))).subscribe(r => { this.registros.set(r); this.cargandoMes.set(false); });
  }
}
