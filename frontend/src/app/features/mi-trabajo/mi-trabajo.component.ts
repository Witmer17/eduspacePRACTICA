import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AsistenciaPersonal } from '../../core/models/asistencia-personal.model';
import { Docente } from '../../core/models/planificacion.model';
import { Contrato, CuentaDeposito, PagoPersonal } from '../../core/models/rrhh.model';
import { MiPersonalService } from '../../core/services/mi-personal.service';
import { mensajeError } from '../../core/utils/errores';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ESTADOS_ASISTENCIA, etiquetaEstado, horaCorta, rangoDelMes, resumenPorPersona } from '../personal/asistencia-personal';
import {
  claseEstadoContrato, contratoActual, contratoDelPeriodo, descuentoAsistencia, diasHasta, duracionContrato, esBilletera, etiquetaBanco,
  etiquetaConcepto, etiquetaEstadoContrato, etiquetaTipo, etiquetaTipoCuenta, fechaCorta, finEfectivo, mascara, nombrePeriodo, periodoDe,
  periodoValido, soles
} from '../personal/rrhh';
import { cobradoEnElAnio, pagosPorMes } from './mi-trabajo';

/**
 * «Mi trabajo»: lo que cada persona del personal (docente, caja…) ve de sí misma — su contrato, su asistencia del mes con lo que
 * se le descontaría, sus pagos y la cuenta donde se le deposita. Solo lectura: los cambios los hace la administración.
 */
@Component({
  selector: 'app-mi-trabajo',
  imports: [ReactiveFormsModule, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Mi trabajo" [subtitulo]="ficha() ? (ficha()!.cargo || 'Personal') + ' · ' + (ficha()!.areaNombre || 'Sin área') : 'Mi contrato, mi asistencia y mis pagos'" />

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }
      @if (sinFicha()) {
        <div class="aviso aviso-warn" role="status">Tu cuenta todavía no está vinculada a tu ficha del personal. Pide a la administración que la vincule para ver aquí tu contrato y tus pagos.</div>
      }

      @if (!sinFicha() && !error()) {
        <!-- Contrato -->
        <section class="bloque">
          <h2>Mi contrato</h2>
          @if (contrato(); as c) {
            <div class="contrato">
              <div class="dato"><span>Estado</span><span [class]="'badge ' + claseContrato(c)">{{ etiquetaContrato(c) }}</span></div>
              <div class="dato"><span>Tipo</span><strong>{{ tipo(c) }}</strong></div>
              <div class="dato"><span>Sueldo</span><strong>{{ dinero(c.remuneracion) }}</strong></div>
              <div class="dato"><span>Desde</span><strong>{{ fecha(c.fechaInicio) }}</strong></div>
              <div class="dato"><span>Hasta</span><strong>{{ finDe(c) ? fecha(finDe(c)!) : 'Sin fecha de fin' }}</strong></div>
              <div class="dato"><span>Duración</span><strong>{{ duracion(c.fechaInicio, finDe(c)) }}</strong></div>
            </div>
            @if (avisoFin(); as a) { <div class="aviso aviso-warn" role="status">{{ a }}</div> }
            @if (c.estadoEfectivo === 'VENCIDO') { <div class="aviso aviso-danger" role="status">Tu contrato venció. Habla con la administración para renovarlo.</div> }
            @if (anteriores().length) {
              <details class="historial">
                <summary>Contratos anteriores ({{ anteriores().length }})</summary>
                <ul>
                  @for (a of anteriores(); track a.id) {
                    <li><span>{{ tipo(a) }} · {{ fecha(a.fechaInicio) }} → {{ finDe(a) ? fecha(finDe(a)!) : 'sin fin' }}</span><strong>{{ dinero(a.remuneracion) }}</strong><span [class]="'badge ' + claseContrato(a)">{{ etiquetaContrato(a) }}</span></li>
                  }
                </ul>
              </details>
            }
          } @else { <p class="muted">{{ cargando() ? 'Cargando…' : 'Todavía no tienes un contrato registrado.' }}</p> }
        </section>

        <!-- Asistencia -->
        <section class="bloque">
          <div class="cabecera">
            <h2>Mi asistencia</h2>
            <label class="mes">Mes <input class="input" type="month" [formControl]="mes" [max]="mesActual" aria-label="Mes de la asistencia" /></label>
          </div>
          @if (cargandoMes()) { <p class="muted">Cargando…</p> }
          @else if (!registros().length) { <p class="muted">No hay asistencia registrada en {{ nombreMes() }}.</p> }
          @else {
            <div class="contadores">
              <div class="cont ok"><strong>{{ resumen().presentes }}</strong><span>Presentes</span></div>
              <div class="cont warn"><strong>{{ resumen().tardanzas }}</strong><span>Tardanzas</span></div>
              <div class="cont danger"><strong>{{ resumen().faltas }}</strong><span>Faltas</span></div>
              <div class="cont"><strong>{{ resumen().justificadas + resumen().permisos }}</strong><span>Justificadas y permisos</span></div>
              <div class="cont"><strong>{{ resumen().porcentaje === null ? '—' : resumen().porcentaje + '%' }}</strong><span>Asistencia</span></div>
            </div>
            @if (descuento(); as d) {
              <div class="descuento" [class.sin]="d.diasADescontar === 0">
                @if (d.diasADescontar === 0) {
                  <strong>Sin descuento por inasistencias este mes.</strong>
                  @if (d.tardanzas > 0) { <span class="muted">Llevas {{ d.tardanzas }} {{ d.tardanzas === 1 ? 'tardanza' : 'tardanzas' }}: con 8 se descuenta un día.</span> }
                } @else {
                  <strong>Descuento estimado: {{ dinero(d.monto) }}</strong>
                  <span class="muted">{{ d.diasADescontar }} {{ d.diasADescontar === 1 ? 'día' : 'días' }} ({{ d.faltas }} {{ d.faltas === 1 ? 'falta' : 'faltas' }}@if (d.diasPorTardanzas) { + {{ d.diasPorTardanzas }} por {{ d.tardanzas - d.tardanzasSobrantes }} tardanzas }) a {{ dinero(d.valorDia) }} el día (tu sueldo ÷ {{ d.diasMes }} días).</span>
                }
              </div>
            }
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Día</th><th>Estado</th><th>Entrada</th><th>Salida</th><th>Observación</th></tr></thead>
                <tbody>
                  @for (r of registros(); track r.id) {
                    <tr>
                      <td>{{ fecha(r.fecha) }}</td>
                      <td><span [class]="'badge ' + claseAsistencia(r.estado)">{{ etiquetaAsistencia(r.estado) }}</span></td>
                      <td>{{ hora(r.horaEntrada) || '—' }}</td><td>{{ hora(r.horaSalida) || '—' }}</td><td>{{ r.observacion || '' }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </section>

        <!-- Pagos -->
        <section class="bloque">
          <div class="cabecera">
            <h2>Mis pagos</h2>
            @if (pagos().length) { <span class="muted">Cobrado en {{ anio }}: <strong>{{ dinero(cobradoAnio()) }}</strong></span> }
          </div>
          @for (m of meses(); track m.periodo) {
            <article class="mes-pago">
              <header>
                <strong>{{ nombrePeriodo(m.periodo) }}</strong>
                <span class="neto" [class.resta]="m.neto < 0">{{ m.neto < 0 ? '− ' : '' }}{{ dinero(abs(m.neto)) }}</span>
                <span [class]="'badge ' + (m.alDia ? 'badge-ok' : 'badge-warn')">{{ m.alDia ? 'Pagado' : m.porCobrar > 0 ? 'Falta ' + dinero(m.porCobrar) : 'Pendiente' }}</span>
              </header>
              <ul>
                @for (p of m.pagos; track p.id) {
                  <li>
                    <span>{{ concepto(p.concepto) }}@if (p.descripcion) { <span class="muted"> · {{ p.descripcion }}</span> }</span>
                    <span class="muted">{{ p.estado === 'PAGADO' ? 'Pagado' + (p.fechaPago ? ' el ' + fecha(p.fechaPago) : '') : 'Pendiente' }}</span>
                    <strong [class.resta]="p.montoFirmado < 0">{{ p.montoFirmado < 0 ? '− ' : '' }}{{ dinero(abs(p.montoFirmado)) }}</strong>
                  </li>
                }
              </ul>
            </article>
          } @empty { <p class="muted">{{ cargando() ? 'Cargando…' : 'Todavía no tienes pagos registrados.' }}</p> }
        </section>

        <!-- Cuenta de depósito -->
        <section class="bloque">
          <h2>Dónde me depositan</h2>
          @for (c of cuentas(); track c.id) {
            <div class="cuenta">
              <div>
                <strong>{{ banco(c.banco) }}</strong>
                @if (c.principal) { <span class="badge badge-ok">Principal</span> }
                <div class="muted">{{ billetera(c.banco) ? 'Celular' : tipoCuenta(c.tipo) }} {{ mascara(c.numero) }}@if (c.cci) { · CCI {{ mascara(c.cci) }} } · Titular: {{ c.titular }}</div>
              </div>
            </div>
          } @empty {
            <p class="muted">{{ cargando() ? 'Cargando…' : 'No tienes una cuenta registrada: todavía no se puede depositarte.' }}</p>
            @if (!cargando()) { <div class="aviso aviso-warn" role="status">Entrega los datos de tu cuenta (banco, número y titular) a la administración para registrarla.</div> }
          }
          @if (cuentas().length) { <p class="muted nota">Para cambiar tu cuenta pídelo a la administración.</p> }
        </section>
      }
    </div>
  `,
  styles: `
    .bloque { display: flex; flex-direction: column; gap: 12px; padding: 18px; background: var(--card); border: 1px solid var(--line); border-radius: 16px; margin-bottom: 16px; }
    .bloque h2 { margin: 0; font-size: 1.05rem; }
    .cabecera { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .mes { display: flex; align-items: center; gap: 8px; font-weight: 600; }
    .contrato { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
    .dato { display: flex; flex-direction: column; gap: 3px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .dato > span:first-child { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .dato .badge { align-self: flex-start; }
    .historial summary { cursor: pointer; font-weight: 600; color: var(--primary); }
    .historial ul, .mes-pago ul { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; }
    .historial li { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 12px; align-items: center; padding: 6px 0; border-top: 1px solid var(--line); font-size: .9rem; }
    .contadores { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }
    .cont { display: flex; flex-direction: column; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .cont strong { font-size: 1.5rem; font-variant-numeric: tabular-nums; }
    .cont span { font-size: .72rem; color: var(--ink-2); }
    .cont.ok strong { color: var(--ok); } .cont.warn strong { color: var(--warn); } .cont.danger strong { color: #8e1c12; }
    .descuento { display: flex; flex-direction: column; gap: 2px; padding: 10px 14px; border-radius: 12px; background: var(--warn-soft); }
    .descuento.sin { background: var(--ok-soft); }
    .mes-pago { padding: 12px 14px; border: 1px solid var(--line); border-radius: 14px; }
    .mes-pago header { display: flex; align-items: center; gap: 12px; }
    .mes-pago header strong { flex: 1; text-transform: capitalize; }
    .neto { font-size: 1.15rem; font-weight: 800; font-variant-numeric: tabular-nums; }
    .mes-pago li { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 14px; padding: 6px 0; border-top: 1px dashed var(--line); font-size: .9rem; align-items: baseline; }
    .resta { color: #8e1c12; }
    .cuenta { display: flex; padding: 10px 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .nota { margin: 0; font-size: .82rem; }
    @media (max-width: 640px) {
      .mes-pago li, .historial li { grid-template-columns: minmax(0, 1fr) auto; }
      .mes-pago li > .muted, .historial li > .badge { grid-column: 1 / -1; }
    }
  `
})
export class MiTrabajoComponent implements OnInit {
  private readonly api = inject(MiPersonalService);
  private readonly fb = inject(FormBuilder);
  private readonly destruido = inject(DestroyRef);

  protected readonly dinero = soles;
  protected readonly fecha = fechaCorta;
  protected readonly mascara = mascara;
  protected readonly nombrePeriodo = nombrePeriodo;
  protected readonly abs = Math.abs;
  protected readonly banco = etiquetaBanco;
  protected readonly tipoCuenta = etiquetaTipoCuenta;
  protected readonly billetera = esBilletera;
  protected readonly anio = new Date().getFullYear();
  protected readonly mesActual = periodoDe(new Date());
  protected readonly mes = this.fb.nonNullable.control(this.mesActual);
  private readonly mesElegido = signal(this.mesActual);
  protected readonly nombreMes = computed(() => nombrePeriodo(this.mesElegido()));

  protected readonly ficha = signal<Docente | null>(null);
  protected readonly contratos = signal<Contrato[]>([]);
  protected readonly pagos = signal<PagoPersonal[]>([]);
  protected readonly cuentas = signal<CuentaDeposito[]>([]);
  protected readonly registros = signal<AsistenciaPersonal[]>([]);
  protected readonly cargando = signal(true);
  protected readonly cargandoMes = signal(false);
  protected readonly sinFicha = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly contrato = computed(() => contratoActual(this.contratos()));
  protected readonly anteriores = computed(() => this.contratos().filter(c => c.id !== this.contrato()?.id));
  protected readonly meses = computed(() => pagosPorMes(this.pagos()));
  protected readonly cobradoAnio = computed(() => cobradoEnElAnio(this.pagos(), this.anio));
  protected readonly resumen = computed(() => resumenPorPersona(this.registros()).get(this.ficha()?.id ?? -1)
    ?? { personalId: 0, presentes: 0, tardanzas: 0, faltas: 0, justificadas: 0, permisos: 0, marcados: 0, porcentaje: null });
  /** El descuento estimado del mes elegido, con el contrato que rige en ese mes; sin contrato no hay con qué calcular. */
  protected readonly descuento = computed(() => {
    const c = contratoDelPeriodo(this.contratos(), this.mesElegido());
    return c ? descuentoAsistencia(c.remuneracion, this.mesElegido(), this.resumen().faltas, this.resumen().tardanzas) : null;
  });
  /** Aviso si el contrato termina pronto. */
  protected readonly avisoFin = computed(() => {
    const c = this.contrato();
    const fin = c ? finEfectivo(c) : undefined;
    if (!c || !fin || c.estadoEfectivo !== 'POR_VENCER') return null;
    const d = diasHasta(fin);
    return d <= 0 ? 'Tu contrato termina hoy.' : `Tu contrato termina en ${d} ${d === 1 ? 'día' : 'días'} (${fechaCorta(fin)}). Habla con la administración si debe renovarse.`;
  });

  constructor() {
    this.mes.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(v => {
      this.mesElegido.set(v);
      if (periodoValido(v)) this.cargarAsistencia();
    });
  }

  ngOnInit(): void {
    this.api.ficha().subscribe({
      next: f => {
        this.ficha.set(f);
        forkJoin({
          contratos: this.api.contratos().pipe(catchError(() => of([] as Contrato[]))),
          pagos: this.api.pagos().pipe(catchError(() => of([] as PagoPersonal[]))),
          cuentas: this.api.cuentas().pipe(catchError(() => of([] as CuentaDeposito[])))
        }).subscribe(r => { this.contratos.set(r.contratos); this.pagos.set(r.pagos); this.cuentas.set(r.cuentas); this.cargando.set(false); });
        this.cargarAsistencia();
      },
      error: e => {
        this.cargando.set(false);
        if (e?.status === 404) this.sinFicha.set(true);
        else this.error.set(mensajeError(e, 'No se pudo cargar tu información.'));
      }
    });
  }

  protected tipo(c: Contrato): string { return etiquetaTipo(c.tipo); }
  protected claseContrato(c: Contrato): string { return claseEstadoContrato(c.estadoEfectivo); }
  protected etiquetaContrato(c: Contrato): string { return etiquetaEstadoContrato(c.estadoEfectivo); }
  protected finDe(c: Contrato): string | undefined { return finEfectivo(c); }
  protected duracion(inicio: string, fin?: string): string { return duracionContrato(inicio, fin); }
  protected concepto(c: PagoPersonal['concepto']): string { return etiquetaConcepto(c); }
  protected hora(h?: string): string { return horaCorta(h); }
  protected etiquetaAsistencia(e: AsistenciaPersonal['estado']): string { return etiquetaEstado(e); }
  protected claseAsistencia(e: AsistenciaPersonal['estado']): string { return ESTADOS_ASISTENCIA.find(x => x.id === e)?.clase ?? 'badge-gray'; }

  private cargarAsistencia(): void {
    if (!periodoValido(this.mes.value)) return;
    const { desde, hasta } = rangoDelMes(this.mes.value);
    this.cargandoMes.set(true);
    this.api.asistencia(desde, hasta).pipe(catchError(() => of([] as AsistenciaPersonal[]))).subscribe(r => { this.registros.set(r); this.cargandoMes.set(false); });
  }
}
