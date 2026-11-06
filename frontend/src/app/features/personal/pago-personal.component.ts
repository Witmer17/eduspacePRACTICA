import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AsistenciaPersonal } from '../../core/models/asistencia-personal.model';
import { Area, Docente } from '../../core/models/planificacion.model';
import { Contrato, CuentaDeposito, PagoPersonal } from '../../core/models/rrhh.model';
import { AsistenciaPersonalService } from '../../core/services/asistencia-personal.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { RrhhService } from '../../core/services/rrhh.service';
import { mensajeError } from '../../core/utils/errores';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ResumenPersona, rangoDelMes, resumenPorPersona } from './asistencia-personal';
import { PagosPorAprobarComponent } from './pagos-por-aprobar.component';
import { PersonalRrhhComponent } from './personal-rrhh.component';
import {
  CLASE_ESTADO_PAGO, DescuentoAsistencia, ETIQUETA_ESTADO_PAGO, EstadoPagoMes, TARDANZAS_POR_DIA, avisoPeriodo, claseEstadoContrato, contratoDelPeriodo,
  contratosPorPersona, descuentoAsistencia, duracionContrato, estadoPagoMes, etiquetaBanco, etiquetaConcepto, etiquetaEstadoContrato, etiquetaTipo, etiquetaTipoCuenta, fechaCorta, mascara, nombrePeriodo, periodoDe, periodoValido, soles, totalesPlanilla
} from './rrhh';

/** Todo lo que hace falta para pagar a una persona en el mes, ya calculado. */
interface Tarjeta {
  p: Docente;
  contrato: Contrato | undefined;
  pagos: PagoPersonal[];
  estado: EstadoPagoMes;
  asistencia: ResumenPersona | undefined;
  /** Su cuenta principal de depósito (la primera que tenga, si ninguna es principal); vacío si no tiene. */
  cuenta: CuentaDeposito | undefined;
  neto: number;
  pagado: number;
  pendiente: number;
  /** Cómo sale el descuento por inasistencias (valor del día, faltas, tardanzas); solo si tiene contrato en el mes. */
  calculo: DescuentoAsistencia | undefined;
  /** Lo que ya se descontó por inasistencias en este mes. */
  descontado: number;
  /** Lo que falta descontar (lo que corresponde menos lo ya descontado); 0 si el sueldo ya se pagó. */
  porDescontar: number;
}

type FiltroEstado = 'todos' | EstadoPagoMes;

/** Marca del descuento por inasistencias, para no descontarlo dos veces. */
const PREFIJO_INASISTENCIAS = 'Descuento por inasistencias';

/**
 * Pago al personal: una tarjeta por persona con su contrato y periodo, la asistencia del mes elegido, el detalle del pago (sueldo, bonos,
 * descuentos) y lo que falta pagar, para pagar desde la misma tarjeta. Solo el administrador (el backend lo exige).
 */
@Component({
  selector: 'app-pago-personal',
  imports: [ReactiveFormsModule, PageHeaderComponent, PersonalRrhhComponent, PagosPorAprobarComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Pago al personal" subtitulo="Cada persona con su contrato, su asistencia del mes y lo que se le debe pagar. Genera la planilla del mes; caja registra los pagos y tú los apruebas." />

      <app-pagos-por-aprobar (cambio)="cargarMes()" />

      <div class="barra">
        <div class="field" style="margin: 0">
          <label for="pp-mes">Mes</label>
          <input id="pp-mes" type="month" [formControl]="periodo" [max]="mesActual" />
        </div>
        <button type="button" class="btn btn-primary" [disabled]="generando() || !valido()" (click)="generar()">
          {{ generando() ? 'Generando…' : 'Generar planilla de ' + nombreMes() }}
        </button>
        <span class="muted">Crea el sueldo pendiente de cada contrato que rige en el mes; si ya existe, no lo duplica.</span>
      </div>

      <div class="totales">
        <div><span>Neto del mes</span><strong>{{ dinero(totales().neto) }}</strong></div>
        <div><span>Pagado</span><strong class="ok">{{ dinero(totales().pagado) }}</strong></div>
        <div [class.alerta]="totales().pendiente > 0"><span>Por pagar</span><strong>{{ dinero(totales().pendiente) }}</strong></div>
        <div [class.alerta]="porPagar() > 0"><span>Personas por pagar</span><strong>{{ porPagar() }}</strong></div>
      </div>

      <div class="toolbar linea">
        <select class="input area-sel" [formControl]="areaFiltro" aria-label="Filtrar por área">
          <option [ngValue]="0">Todas las áreas</option>
          @for (a of areas(); track a.id) { <option [ngValue]="a.id">{{ a.nombre }}</option> }
        </select>
        <select class="input area-sel" [formControl]="estadoFiltro" aria-label="Filtrar por estado del pago">
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendientes de pago</option>
          <option value="por-aprobar">Por aprobar</option>
          <option value="pagado">Pagados</option>
          <option value="sin-generar">Sin generar</option>
          <option value="sin-contrato">Sin contrato</option>
        </select>
        <input class="input grow" type="search" [formControl]="busqueda" placeholder="Buscar por nombre o documento" aria-label="Buscar personal" />
      </div>

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      <div class="rejilla">
        @for (t of tarjetas(); track t.p.id) {
          <article class="tarjeta" [class]="'tarjeta ' + t.estado">
            <header class="cab">
              <span class="avatar-fila" aria-hidden="true">{{ t.p.nombres.charAt(0) }}{{ t.p.apellidos.charAt(0) }}</span>
              <div class="quien">
                <strong>{{ t.p.apellidos }}, {{ t.p.nombres }}</strong>
                <span class="muted">{{ t.p.cargo || 'Sin cargo indicado' }}</span>
              </div>
              <span [class]="'badge ' + claseEstado(t.estado)">{{ etiquetaEstado(t.estado) }}</span>
            </header>
            <div class="sub">
              <span class="badge badge-violet">{{ t.p.areaNombre ?? '—' }}</span>
              <span class="muted">{{ t.p.tipoDocumento ?? 'DNI' }} {{ t.p.numeroDocumento }}</span>
            </div>
            <!-- Dónde se le deposita -->
            @if (t.cuenta; as cu) {
              <div class="deposito" [title]="'Titular: ' + cu.titular">
                <span class="etq">Depósito</span>
                <strong>{{ etiquetaBanco(cu.banco) }}</strong> <span class="muted">{{ etiquetaTipoCuenta(cu.tipo) }} · {{ mascara(cu.numero) }}</span>
                <button type="button" class="enlace" (click)="abrirDetalle(t.p, 'cuenta')">Cambiar</button>
              </div>
            } @else {
              <div class="deposito sin">
                <span>Sin cuenta de depósito</span>
                <button type="button" class="enlace" (click)="abrirDetalle(t.p, 'cuenta')">Agregar cuenta</button>
              </div>
            }

            <section class="bloque">
              <h4>Contrato</h4>
              @if (t.contrato; as c) {
                <div class="fila-dato"><span [class]="'badge ' + claseContrato(c)">{{ etiquetaContrato(c) }}</span><span class="muted">{{ tipoContrato(c) }}</span></div>
                <div class="periodo">{{ fechaCorta(c.fechaInicio) }} → {{ c.fechaFin ? fechaCorta(c.fechaFin) : 'sin fin' }}</div>
                <div class="muted">{{ duracion(c.fechaInicio, c.fechaFin) }}@if (aviso(c); as a) { · <span class="aviso-periodo" [class.rojo]="c.estadoEfectivo === 'VENCIDO' || c.estadoEfectivo === 'RESCINDIDO'">{{ a }}</span> }</div>
                <div class="sueldo-base">Sueldo mensual <strong>{{ dinero(c.remuneracion) }}</strong></div>
              } @else {
                <p class="vacio-bloque">No tiene contrato en {{ nombreMes() }}. Créalo en «Contratos y pagos».</p>
              }
            </section>

            <section class="bloque">
              <h4>Asistencia · {{ nombreMes() }}</h4>
              @if (t.asistencia; as a) {
                <div class="dias">
                  <div class="dia ok"><strong>{{ a.presentes }}</strong><span>Presente</span></div>
                  <div class="dia warn"><strong>{{ a.tardanzas }}</strong><span>Tardanza</span></div>
                  <div class="dia danger"><strong>{{ a.faltas }}</strong><span>Falta</span></div>
                  <div class="dia violet"><strong>{{ a.justificadas }}</strong><span>Justif.</span></div>
                  <div class="dia gris"><strong>{{ a.permisos }}</strong><span>Permiso</span></div>
                </div>
                @if (a.porcentaje !== null) {
                  <div class="barra-asis" role="img" [attr.aria-label]="'Asistencia ' + a.porcentaje + '%'"><span [style.width.%]="a.porcentaje" [class]="claseBarra(a.porcentaje)"></span></div>
                  <div class="muted">{{ a.porcentaje }}% de asistencia · {{ a.marcados }} {{ a.marcados === 1 ? 'día marcado' : 'días marcados' }}</div>
                } @else { <div class="muted">{{ a.marcados }} {{ a.marcados === 1 ? 'día marcado' : 'días marcados' }}, sin días exigibles.</div> }
              } @else {
                <p class="vacio-bloque">Sin asistencia registrada en {{ nombreMes() }}.</p>
              }
              @if (t.calculo; as c) {
                <div class="calculo" aria-label="Cómo se calcula el descuento por inasistencias">
                  <div class="fila-calculo"><span>Valor del día</span><span><strong>{{ dinero(c.valorDia) }}</strong> <small>({{ dinero(t.contrato!.remuneracion) }} ÷ {{ c.diasMes }} días)</small></span></div>
                  <div class="fila-calculo"><span>Faltas sin justificar</span><span><strong>{{ c.faltas }}</strong> {{ c.faltas === 1 ? 'día' : 'días' }}</span></div>
                  <div class="fila-calculo">
                    <span>Tardanzas <small>({{ tardanzasPorDia }} = 1 día)</small></span>
                    <span><strong>{{ c.tardanzas }}</strong> → {{ c.diasPorTardanzas }} {{ c.diasPorTardanzas === 1 ? 'día' : 'días' }}@if (c.tardanzasSobrantes) { <small> · sobran {{ c.tardanzasSobrantes }}</small> }</span>
                  </div>
                  <div class="fila-calculo total"><span>A descontar: {{ c.diasADescontar }} {{ c.diasADescontar === 1 ? 'día' : 'días' }}</span><strong [class.neg]="c.monto > 0">{{ dinero(c.monto) }}</strong></div>
                  @if (t.descontado > 0) { <div class="muted">Ya descontado en este mes: {{ dinero(t.descontado) }}@if (t.porDescontar > 0) { · falta {{ dinero(t.porDescontar) }} }</div> }
                </div>
              }
            </section>

            <section class="bloque">
              <h4>Pago de {{ nombreMes() }}</h4>
              @if (t.pagos.length) {
                <ul class="lineas">
                  @for (l of t.pagos; track l.id) {
                    <li>
                      <span class="concepto">{{ concepto(l) }}@if (l.descripcion) { <small>{{ l.descripcion }}</small> }</span>
                      <span class="monto" [class.neg]="l.montoFirmado < 0">{{ dinero(l.montoFirmado) }}</span>
                      <span [class]="'mini ' + (l.estado === 'PAGADO' ? 'ok' : l.estado === 'POR_APROBAR' ? 'viol' : 'warn')"
                        [title]="l.estado === 'PAGADO' ? 'Pagado el ' + l.fechaPago : l.estado === 'POR_APROBAR' ? 'Caja lo registró: falta tu aprobación' : (l.motivoRechazo ? 'Rechazado: ' + l.motivoRechazo : 'Pendiente: lo paga caja')">{{ l.estado === 'PAGADO' ? 'Pagado' : l.estado === 'POR_APROBAR' ? 'Por aprobar' : 'Pend.' }}</span>
                    </li>
                  }
                </ul>
                <div class="neto"><span>Neto del mes</span><strong>{{ dinero(t.neto) }}</strong></div>
                <div class="resumen-pago">
                  <span>Pagado <strong>{{ dinero(t.pagado) }}</strong></span>
                  <span [class.por-pagar]="t.pendiente !== 0">Por pagar <strong>{{ dinero(t.pendiente) }}</strong></span>
                </div>
              } @else if (t.contrato) {
                <p class="vacio-bloque">Aún no se generó el sueldo de {{ nombreMes() }} ({{ dinero(t.contrato.remuneracion) }}). Usa «Generar planilla».</p>
              } @else {
                <p class="vacio-bloque">Sin pagos en este mes.</p>
              }
            </section>

            <footer class="pie">
              @if (t.estado === 'pendiente') {
                <p class="espera">Falta pagar {{ dinero(t.pendiente) }}: lo registra caja y luego lo apruebas arriba.</p>
              } @else if (t.estado === 'por-aprobar') {
                <p class="espera viol">Caja ya registró el pago de {{ dinero(t.pendiente) }}: falta tu aprobación (arriba en «Pagos por aprobar»).</p>
              }
              @if (t.porDescontar > 0 && t.calculo) {
                <button type="button" class="btn btn-sm" (click)="descontarInasistencias(t)" [title]="resumenDias(t.calculo)">Descontar inasistencias {{ dinero(t.porDescontar) }}</button>
              }
              <button type="button" class="btn btn-sm" (click)="abrirDetalle(t.p, 'pagos')">Bonos y descuentos</button>
              <button type="button" class="btn btn-sm" (click)="abrirDetalle(t.p, 'contratos')">Contratos</button>
            </footer>
          </article>
        } @empty {
          <div class="vacio-guia">
            <strong>{{ cargando() ? 'Cargando…' : personal().length ? 'Nadie coincide con ese filtro' : 'Aún no hay personal activo' }}</strong>
            @if (!cargando() && !personal().length) { <span>Regístralo en Personal → Áreas.</span> }
          </div>
        }
      </div>
    </div>

    @if (detalle(); as d) {
      <app-personal-rrhh [persona]="d.p" [pestanaInicial]="d.pestana" (cerrar)="cerrarDetalle()" />
    }
  `,
  styles: `
    .barra { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
    .totales { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .totales div { display: flex; flex-direction: column; padding: 12px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); }
    .totales div.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .totales span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .totales strong { font-size: 1.4rem; font-variant-numeric: tabular-nums; }
    .totales strong.ok { color: var(--ok); }
    .rejilla { display: grid; grid-template-columns: repeat(auto-fill, minmax(370px, 1fr)); gap: 16px; align-items: start; }
    .tarjeta { display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1.5px solid var(--line-2); border-radius: 18px; background: var(--card); }
    .tarjeta.pendiente { border-color: var(--warn); }
    .tarjeta.pagado { border-color: var(--ok); }
    .cab { display: flex; align-items: center; gap: 12px; }
    .quien { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .quien strong, .quien .muted { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .avatar-fila { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; background: var(--primary-soft); color: var(--primary); font-weight: 800; }
    .sub { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: -6px; }
    .bloque { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 14px; background: var(--bg); }
    .bloque h4 { margin: 0 0 2px; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .fila-dato { display: flex; align-items: center; gap: 8px; }
    .periodo { font-weight: 700; }
    .sueldo-base { display: flex; justify-content: space-between; align-items: baseline; padding-top: 6px; border-top: 1px dashed var(--line-2); }
    .sueldo-base strong { font-size: 1.2rem; font-variant-numeric: tabular-nums; }
    .aviso-periodo { font-weight: 700; color: var(--warn); }
    .aviso-periodo.rojo { color: #8e1c12; }
    .vacio-bloque { margin: 0; color: var(--ink-2); font-size: .85rem; }
    .dias { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
    .dia { display: flex; flex-direction: column; align-items: center; padding: 6px 2px; border-radius: 10px; }
    .dia strong { font-size: 1.15rem; line-height: 1.1; }
    .dia span { font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; }
    .dia.ok { color: var(--ok); background: var(--ok-soft); }
    .dia.warn { color: var(--warn); background: var(--warn-soft); }
    .dia.danger { color: #8e1c12; background: var(--danger-soft); }
    .dia.violet { color: var(--violet); background: var(--violet-soft); }
    .dia.gris { color: var(--ink-2); background: var(--card); border: 1px solid var(--line); }
    .calculo { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; padding-top: 8px; border-top: 1px dashed var(--line-2); font-size: .85rem; }
    .fila-calculo { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
    .fila-calculo small { color: var(--ink-2); }
    .fila-calculo.total { padding-top: 4px; font-weight: 700; }
    .fila-calculo.total strong { font-variant-numeric: tabular-nums; }
    .fila-calculo .neg, .calculo .neg { color: var(--danger, #b3261e); }
    .deposito { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; margin-top: -6px; padding: 6px 10px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); font-size: .85rem; }
    .deposito .etq { font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .deposito.sin { background: var(--warn-soft); border-color: var(--warn); color: var(--warn); font-weight: 700; }
    .enlace, .enlace-aviso { padding: 0; margin-left: auto; font: inherit; font-size: .78rem; font-weight: 800; color: var(--primary); background: none; border: 0; text-decoration: underline; cursor: pointer; }
    .enlace-aviso { margin-left: 0; color: inherit; }
    .destino { margin-top: 10px; padding: 10px 14px; border: 1.5px solid var(--primary); border-radius: 12px; background: var(--primary-soft); }
    .destino h4 { margin: 0 0 6px; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--primary); }
    .destino dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: .88rem; }
    .destino dt { color: var(--ink-2); }
    .destino dd { margin: 0; font-weight: 700; word-break: break-all; }
    .destino .num { font-variant-numeric: tabular-nums; letter-spacing: .02em; user-select: all; }
    .copiar { margin-left: 6px; padding: 1px 8px; font: inherit; font-size: .7rem; font-weight: 700; color: var(--primary); background: var(--card); border: 0; border-radius: 999px; cursor: pointer; }
    .barra-asis { height: 8px; border-radius: 999px; background: var(--line); overflow: hidden; }
    .barra-asis span { display: block; height: 100%; border-radius: 999px; }
    .barra-asis span.ok { background: var(--ok); }
    .barra-asis span.warn { background: var(--warn); }
    .barra-asis span.danger { background: #c0392b; }
    .lineas { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    .lineas li { display: flex; align-items: center; gap: 8px; }
    .concepto { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: .88rem; }
    .concepto small { color: var(--ink-2); font-size: .72rem; }
    .monto { font-variant-numeric: tabular-nums; font-weight: 700; }
    .monto.neg { color: var(--danger, #b3261e); }
    .mini { flex: none; padding: 1px 8px; border-radius: 999px; font-size: .62rem; font-weight: 800; text-transform: uppercase; }
    .mini.ok { color: var(--ok); background: var(--ok-soft); }
    .mini.warn { color: var(--warn); background: var(--warn-soft); }
    .mini.viol { color: var(--violet); background: var(--violet-soft); }
    .espera { margin: 0; flex: 1 1 100%; font-size: .85rem; color: var(--warn); font-weight: 600; }
    .espera.viol { color: var(--violet); }
    .neto { display: flex; justify-content: space-between; align-items: baseline; padding-top: 8px; margin-top: 4px; border-top: 1px solid var(--line-2); }
    .neto strong { font-size: 1.25rem; font-variant-numeric: tabular-nums; }
    .resumen-pago { display: flex; justify-content: space-between; font-size: .82rem; color: var(--ink-2); }
    .resumen-pago .por-pagar strong { color: var(--warn); }
    .pie { display: flex; flex-wrap: wrap; gap: 8px; }
    .pie .btn-primary { flex: 1 1 100%; }
    @media (max-width: 900px) { .totales { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 460px) { .rejilla { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class PagoPersonalComponent implements OnInit {
  private readonly plan = inject(PlanificacionService);
  private readonly rrhh = inject(RrhhService);
  private readonly asistencia = inject(AsistenciaPersonalService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly dinero = soles;
  protected readonly tardanzasPorDia = TARDANZAS_POR_DIA;
  protected readonly fechaCorta = fechaCorta;
  protected readonly duracion = duracionContrato;
  protected readonly mesActual = periodoDe(new Date());

  protected readonly periodo = this.fb.nonNullable.control(this.mesActual);
  private readonly periodoSig = signal(this.mesActual);
  protected readonly nombreMes = computed(() => nombrePeriodo(this.periodoSig()));

  protected readonly areas = signal<Area[]>([]);
  protected readonly personal = signal<Docente[]>([]);
  private readonly contratos = signal<Map<number, Contrato[]>>(new Map());
  private readonly pagos = signal<PagoPersonal[]>([]);
  private readonly asistencias = signal<AsistenciaPersonal[]>([]);
  /** La cuenta principal de depósito de cada persona (por id). */
  private readonly cuentas = signal<Map<number, CuentaDeposito>>(new Map());
  protected readonly etiquetaBanco = etiquetaBanco;
  protected readonly etiquetaTipoCuenta = etiquetaTipoCuenta;
  protected readonly mascara = mascara;

  protected readonly cargando = signal(true);
  protected readonly generando = signal(false);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly areaFiltro = this.fb.nonNullable.control(0);
  protected readonly estadoFiltro = this.fb.nonNullable.control<FiltroEstado>('todos');
  protected readonly busqueda = this.fb.nonNullable.control('');
  private readonly area = signal(0);
  private readonly estado = signal<FiltroEstado>('todos');
  private readonly texto = signal('');

  protected readonly detalle = signal<{ p: Docente; pestana: 'contratos' | 'pagos' | 'cuenta' } | null>(null);

  /** Una tarjeta por persona activa, con todo calculado para el mes elegido. */
  private readonly todas = computed<Tarjeta[]>(() => {
    const periodo = this.periodoSig();
    const resumenes = resumenPorPersona(this.asistencias());
    const pagosPorPersona = new Map<number, PagoPersonal[]>();
    for (const l of this.pagos()) pagosPorPersona.set(l.personalId, [...(pagosPorPersona.get(l.personalId) ?? []), l]);
    return this.personal().map(p => {
      const contrato = contratoDelPeriodo(this.contratos().get(p.id) ?? [], periodo);
      const pagos = (pagosPorPersona.get(p.id) ?? []).sort((a, b) => a.id - b.id);
      const t = totalesPlanilla(pagos);
      const asistencia = resumenes.get(p.id);
      const calculo = contrato ? descuentoAsistencia(contrato.remuneracion, periodo, asistencia?.faltas ?? 0, asistencia?.tardanzas ?? 0) : undefined;
      const descontado = Math.round(pagos.filter(l => l.concepto === 'DESCUENTO' && (l.descripcion ?? '').startsWith(PREFIJO_INASISTENCIAS)).reduce((s, l) => s + l.monto, 0) * 100) / 100;
      // Solo se descuenta mientras el sueldo esté pendiente, y solo la diferencia con lo ya descontado (por si se marcaron más faltas después).
      const sueldoPendiente = pagos.some(l => l.concepto === 'SUELDO' && l.estado === 'PENDIENTE');
      const porDescontar = calculo && sueldoPendiente ? Math.max(0, Math.round((calculo.monto - descontado) * 100) / 100) : 0;
      return { p, contrato, pagos, estado: estadoPagoMes(contrato, pagos), asistencia, cuenta: this.cuentas().get(p.id), neto: t.neto, pagado: t.pagado, pendiente: t.pendiente, calculo, descontado, porDescontar };
    });
  });

  protected readonly tarjetas = computed(() => {
    const q = this.texto().trim().toLowerCase();
    return this.todas().filter(t => (!this.area() || t.p.areaId === this.area())
      && (this.estado() === 'todos' || t.estado === this.estado())
      && (!q || `${t.p.apellidos} ${t.p.nombres} ${t.p.numeroDocumento}`.toLowerCase().includes(q)));
  });

  /** Los totales miran a todo el personal del mes, no solo a lo filtrado. */
  protected readonly totales = computed(() => totalesPlanilla(this.pagos()));
  protected readonly porPagar = computed(() => this.todas().filter(t => t.pendiente > 0).length);

  constructor() {
    this.areaFiltro.valueChanges.subscribe(v => this.area.set(Number(v)));
    this.estadoFiltro.valueChanges.subscribe(v => this.estado.set(v));
    this.busqueda.valueChanges.subscribe(v => this.texto.set(v));
    this.periodo.valueChanges.subscribe(v => {
      this.periodoSig.set(v);
      if (periodoValido(v)) this.cargarMes();
    });
  }

  ngOnInit(): void {
    this.plan.areas().pipe(catchError(() => of([] as Area[]))).subscribe(a => this.areas.set(a));
    this.plan.todoElPersonalActivo().subscribe({
      next: p => this.personal.set(p),
      error: e => this.error.set(mensajeError(e, 'No se pudo cargar el personal.'))
    });
    this.rrhh.contratos().subscribe({
      next: c => this.contratos.set(contratosPorPersona(c)),
      error: e => this.error.set(mensajeError(e, 'No se pudieron cargar los contratos.'))
    });
    this.cargarCuentas();
    this.cargarMes();
  }

  /** Las cuentas de depósito de todo el personal; de cada persona se queda con la principal. */
  private cargarCuentas(): void {
    this.rrhh.cuentas().pipe(catchError(() => of([] as CuentaDeposito[]))).subscribe(lista => {
      const m = new Map<number, CuentaDeposito>();
      for (const c of lista) if (!m.has(c.personalId) || c.principal) m.set(c.personalId, c);
      this.cuentas.set(m);
    });
  }

  protected valido(): boolean {
    return periodoValido(this.periodo.value);
  }

  /** Los pagos y la asistencia del mes elegido. */
  protected cargarMes(): void {
    const mes = this.periodo.value;
    const { desde, hasta } = rangoDelMes(mes);
    this.cargando.set(true);
    forkJoin({
      pagos: this.rrhh.pagosDelPeriodo(mes),
      asistencias: this.asistencia.consultar(desde, hasta).pipe(catchError(() => of([] as AsistenciaPersonal[])))
    }).subscribe({
      next: ({ pagos, asistencias }) => {
        this.pagos.set(pagos);
        this.asistencias.set(asistencias);
        this.cargando.set(false);
      },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar el mes.')); }
    });
  }

  protected claseEstado(e: EstadoPagoMes): string { return CLASE_ESTADO_PAGO[e]; }
  protected etiquetaEstado(e: EstadoPagoMes): string { return ETIQUETA_ESTADO_PAGO[e]; }
  protected claseContrato(c: Contrato): string { return claseEstadoContrato(c.estadoEfectivo); }
  protected etiquetaContrato(c: Contrato): string { return etiquetaEstadoContrato(c.estadoEfectivo); }
  protected tipoContrato(c: Contrato): string { return etiquetaTipo(c.tipo); }
  protected concepto(l: PagoPersonal): string { return etiquetaConcepto(l.concepto); }
  protected claseBarra(p: number): string { return p >= 95 ? 'ok' : p >= 85 ? 'warn' : 'danger'; }
  /** El aviso de vencimiento solo tiene sentido para el mes en curso. */
  protected aviso(c: Contrato): string { return this.periodoSig() === this.mesActual ? avisoPeriodo(c) : ''; }

  protected generar(): void {
    this.generando.set(true);
    this.rrhh.generarPlanilla(this.periodo.value).subscribe({
      next: r => {
        this.generando.set(false);
        this.avisos.success(r.creados ? `Se generaron ${r.creados} ${r.creados === 1 ? 'sueldo' : 'sueldos'}${r.yaExistian ? ` (${r.yaExistian} ya existían)` : ''}.` : r.yaExistian ? 'La planilla de este mes ya estaba generada.' : 'No hay contratos vigentes con sueldo en este mes.');
        this.cargarMes();
      },
      error: e => { this.generando.set(false); this.avisos.error(mensajeError(e)); }
    });
  }

  // ---------- Inasistencias ----------
  /** Texto corto de cómo se llegó al descuento: «2 faltas + 9 tardanzas (1 día) = 3 días». */
  protected resumenDias(c: DescuentoAsistencia): string {
    const partes: string[] = [];
    if (c.faltas) partes.push(`${c.faltas} ${c.faltas === 1 ? 'falta' : 'faltas'}`);
    if (c.diasPorTardanzas) partes.push(`${c.tardanzas} tardanzas (${c.diasPorTardanzas} ${c.diasPorTardanzas === 1 ? 'día' : 'días'})`);
    return `${partes.join(' + ')} = ${c.diasADescontar} ${c.diasADescontar === 1 ? 'día' : 'días'}`;
  }

  protected async descontarInasistencias(t: Tarjeta): Promise<void> {
    if (!t.contrato || !t.calculo || t.porDescontar <= 0) return;
    const c = t.calculo;
    const ya = t.descontado > 0 ? ` Ya se descontaron ${soles(t.descontado)}; se descuenta la diferencia.` : '';
    const aviso = `¿Descontar ${soles(t.porDescontar)} a ${t.p.nombres} ${t.p.apellidos}? ${this.resumenDias(c)} × ${soles(c.valorDia)} por día (sueldo ${soles(t.contrato.remuneracion)} ÷ ${c.diasMes} días).${ya}`;
    if (!(await this.confirmacion.confirmar(aviso, 'Descontar'))) return;
    this.rrhh.registrarPago({
      personalId: t.p.id, contratoId: t.contrato.id, periodo: this.periodo.value, concepto: 'DESCUENTO',
      monto: t.porDescontar, descripcion: `${PREFIJO_INASISTENCIAS}: ${this.resumenDias(c)}`.slice(0, 200)
    }).subscribe({
      next: () => { this.avisos.success('Descuento registrado.'); this.cargarMes(); },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  // ---------- Detalle ----------
  protected abrirDetalle(p: Docente, pestana: 'contratos' | 'pagos' | 'cuenta'): void {
    this.detalle.set({ p, pestana });
  }

  protected cerrarDetalle(): void {
    this.detalle.set(null);
    // Pudo crearse un contrato o un pago: se vuelve a leer todo lo que muestran las tarjetas.
    this.rrhh.contratos().subscribe(c => this.contratos.set(contratosPorPersona(c)));
    this.cargarCuentas();
    this.cargarMes();
  }
}
