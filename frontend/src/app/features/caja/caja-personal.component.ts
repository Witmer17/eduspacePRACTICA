import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CuentaDeposito, PagoPersonal } from '../../core/models/rrhh.model';
import { NotificationService } from '../../core/services/notification.service';
import { PagoPersonalService } from '../../core/services/pago-personal.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { hoyLocal } from '../personal/asistencia-personal';
import { etiquetaBanco, etiquetaConcepto, etiquetaTipoCuenta, nombrePeriodo, periodoDe, periodoValido, soles } from '../personal/rrhh';

/** Todo lo de una persona en el mes: sus líneas de pago y lo que falta. */
interface Persona {
  personalId: number;
  nombre: string;
  area?: string;
  lineas: PagoPersonal[];
  /** Lo que caja todavía no registró (neto con signo). */
  porPagar: number;
  /** Lo que ya registró y espera la aprobación del administrador. */
  porAprobar: number;
  pagado: number;
  /** Motivo con el que el administrador devolvió algún pago (para corregirlo). */
  rechazo?: string;
}

const redondear = (n: number): number => Math.round(n * 100) / 100;

/**
 * Caja paga al personal: ve la planilla del mes, elige a quién pagar y registra cómo se pagó (medio, fecha, referencia).
 * El pago NO queda pagado hasta que el administrador lo aprueba.
 */
@Component({
  selector: 'app-caja-personal',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Pago al personal" subtitulo="Registra los pagos del mes. Cada pago que registres lo aprueba el administrador antes de quedar pagado." />

      <div class="barra">
        <div class="field" style="margin: 0">
          <label for="cp-mes">Mes</label>
          <input id="cp-mes" type="month" [formControl]="periodo" [max]="mesActual" />
        </div>
        <input class="input grow" type="search" [formControl]="busqueda" placeholder="Buscar por nombre o área" aria-label="Buscar personal" />
      </div>

      <div class="totales">
        <div [class.alerta]="total().porPagar !== 0"><span>Por pagar</span><strong>{{ dinero(total().porPagar) }}</strong></div>
        <div [class.viol]="total().porAprobar !== 0"><span>Esperando al administrador</span><strong>{{ dinero(total().porAprobar) }}</strong></div>
        <div><span>Pagado</span><strong class="ok">{{ dinero(total().pagado) }}</strong></div>
      </div>

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      <div class="lista">
        @for (p of personas(); track p.personalId) {
          <article class="persona" [class.por-pagar]="p.porPagar !== 0" [class.espera]="p.porPagar === 0 && p.porAprobar !== 0">
            <header>
              <div class="quien"><strong>{{ p.nombre }}</strong><span class="muted">{{ p.area || 'Sin área' }}</span></div>
              @if (p.porPagar !== 0) { <span class="badge badge-warn">Por pagar</span> }
              @else if (p.porAprobar !== 0) { <span class="badge badge-violet">Por aprobar</span> }
              @else { <span class="badge badge-ok">Pagado</span> }
            </header>
            <ul class="lineas">
              @for (l of p.lineas; track l.id) {
                <li>
                  <span class="concepto">{{ concepto(l) }}@if (l.descripcion) { <small>{{ l.descripcion }}</small> }</span>
                  <span class="monto" [class.neg]="l.montoFirmado < 0">{{ dinero(l.montoFirmado) }}</span>
                  <span [class]="'mini ' + (l.estado === 'PAGADO' ? 'ok' : l.estado === 'POR_APROBAR' ? 'viol' : 'warn')">{{ l.estado === 'PAGADO' ? 'Pagado' : l.estado === 'POR_APROBAR' ? 'Por aprobar' : 'Pend.' }}</span>
                </li>
              }
            </ul>
            @if (p.rechazo) { <div class="aviso aviso-danger" role="status">El administrador lo devolvió: {{ p.rechazo }}</div> }
            @if (p.porPagar !== 0) {
              <button type="button" class="btn btn-primary" (click)="abrirPago(p)" [attr.aria-label]="'Pagar a ' + p.nombre">Pagar {{ dinero(p.porPagar) }}</button>
            }
          </article>
        } @empty {
          <div class="vacio-guia">
            <strong>{{ cargando() ? 'Cargando…' : 'No hay pagos en ' + nombreMes() }}</strong>
            @if (!cargando()) { <span>La planilla del mes la genera el administrador en Personal → Pago al personal.</span> }
          </div>
        }
      </div>
    </div>

    @if (pagando(); as p) {
      <app-modal [titulo]="'Pagar a ' + p.nombre" [ancho]="520" (cerrar)="pagando.set(null)">
        <p style="margin: 0 0 8px">Se registrará el pago de estas líneas de <strong>{{ nombreMes() }}</strong>:</p>
        <ul class="lineas">
          @for (l of pendientesDe(p); track l.id) {
            <li><span class="concepto">{{ concepto(l) }}@if (l.descripcion) { <small>{{ l.descripcion }}</small> }</span><span class="monto" [class.neg]="l.montoFirmado < 0">{{ dinero(l.montoFirmado) }}</span></li>
          }
        </ul>
        <div class="neto"><span>Total a pagar</span><strong>{{ dinero(p.porPagar) }}</strong></div>

        @if (cuenta(); as cu) {
          <div class="destino">
            <h4>Depositar a</h4>
            <dl>
              <dt>{{ etiquetaBanco(cu.banco) }} · {{ etiquetaTipoCuenta(cu.tipo) }}</dt>
              <dd><span class="num">{{ cu.numero }}</span> <button type="button" class="copiar" (click)="copiar(cu.numero)" aria-label="Copiar el número de cuenta">Copiar</button></dd>
              @if (cu.cci) { <dt>CCI</dt><dd><span class="num">{{ cu.cci }}</span> <button type="button" class="copiar" (click)="copiar(cu.cci)" aria-label="Copiar el CCI">Copiar</button></dd> }
              <dt>Titular</dt><dd>{{ cu.titular }}</dd>
            </dl>
          </div>
        } @else if (cargandoCuenta()) {
          <p class="muted">Buscando su cuenta de depósito…</p>
        } @else {
          <div class="aviso aviso-warn" style="margin-top: 10px" role="status">No tiene cuenta de depósito registrada. Puedes pagarle en efectivo o cheque; el administrador puede agregar su cuenta.</div>
        }

        <div class="form-grid" style="margin-top: 12px">
          <div class="field"><label for="cp-fecha">Fecha del pago</label><input id="cp-fecha" type="date" [formControl]="fechaPago" /></div>
          <div class="field">
            <label for="cp-medio">Medio</label>
            <select id="cp-medio" [formControl]="medioPago">
              <option value="TRANSFERENCIA">Transferencia</option><option value="EFECTIVO">Efectivo</option>
              <option value="CHEQUE">Cheque</option><option value="YAPE_PLIN">Yape / Plin</option>
            </select>
          </div>
          <div class="field full"><label for="cp-ref">N.º de operación o referencia {{ medioPago.value === 'EFECTIVO' ? '(opcional)' : '' }}</label><input id="cp-ref" [formControl]="referenciaPago" maxlength="100" /></div>
        </div>
        @if (errorPago()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorPago() }}</div> }
        <p class="muted" style="margin-bottom: 0">Quedará «por aprobar»: el administrador recibe el aviso y lo confirma.</p>
        <ng-container footer>
          <button type="button" class="btn" (click)="pagando.set(null)">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="guardando()" (click)="enviar(p)">{{ guardando() ? 'Enviando…' : 'Enviar a aprobación' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .barra { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
    .grow { flex: 1 1 240px; }
    .totales { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; }
    .totales div { display: flex; flex-direction: column; padding: 12px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); }
    .totales div.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .totales div.viol { border-color: var(--violet); background: var(--violet-soft); }
    .totales span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .totales strong { font-size: 1.4rem; font-variant-numeric: tabular-nums; }
    .totales strong.ok { color: var(--ok); }
    .lista { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; align-items: start; }
    .persona { display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1.5px solid var(--line-2); border-radius: 18px; background: var(--card); }
    .persona.por-pagar { border-color: var(--warn); }
    .persona.espera { border-color: var(--violet); }
    .persona header { display: flex; align-items: center; gap: 10px; }
    .quien { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .quien strong, .quien .muted { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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
    .neto { display: flex; justify-content: space-between; align-items: baseline; padding-top: 8px; margin-top: 4px; border-top: 1px solid var(--line-2); }
    .neto strong { font-size: 1.25rem; font-variant-numeric: tabular-nums; }
    .destino { margin-top: 10px; padding: 10px 14px; border: 1.5px solid var(--primary); border-radius: 12px; background: var(--primary-soft); }
    .destino h4 { margin: 0 0 6px; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--primary); }
    .destino dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: .88rem; }
    .destino dt { color: var(--ink-2); }
    .destino dd { margin: 0; font-weight: 700; word-break: break-all; }
    .destino .num { font-variant-numeric: tabular-nums; letter-spacing: .02em; user-select: all; }
    .copiar { margin-left: 6px; padding: 1px 8px; font: inherit; font-size: .7rem; font-weight: 700; color: var(--primary); background: var(--card); border: 0; border-radius: 999px; cursor: pointer; }
    .vacio-guia { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 4px; padding: 28px; text-align: center; border: 2px dashed var(--line-2); border-radius: 16px; color: var(--ink-2); }
    @media (max-width: 700px) { .totales { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class CajaPersonalComponent implements OnInit {
  private readonly api = inject(PagoPersonalService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly dinero = soles;
  protected readonly etiquetaBanco = etiquetaBanco;
  protected readonly etiquetaTipoCuenta = etiquetaTipoCuenta;
  protected readonly mesActual = periodoDe(new Date());
  protected readonly periodo = this.fb.nonNullable.control(this.mesActual);
  protected readonly busqueda = this.fb.nonNullable.control('');
  private readonly periodoSig = signal(this.mesActual);
  private readonly texto = signal('');
  protected readonly nombreMes = computed(() => nombrePeriodo(this.periodoSig()));

  private readonly pagos = signal<PagoPersonal[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly pagando = signal<Persona | null>(null);
  protected readonly cuenta = signal<CuentaDeposito | null>(null);
  protected readonly cargandoCuenta = signal(false);
  protected readonly guardando = signal(false);
  protected readonly errorPago = signal<string | null>(null);
  protected readonly fechaPago = this.fb.nonNullable.control(hoyLocal());
  protected readonly medioPago = this.fb.nonNullable.control('TRANSFERENCIA');
  protected readonly referenciaPago = this.fb.nonNullable.control('');

  private readonly todas = computed<Persona[]>(() => {
    const porPersona = new Map<number, PagoPersonal[]>();
    for (const l of this.pagos()) porPersona.set(l.personalId, [...(porPersona.get(l.personalId) ?? []), l]);
    return [...porPersona.entries()]
      .map(([personalId, lineas]) => {
        lineas.sort((a, b) => a.id - b.id);
        const suma = (estado: PagoPersonal['estado']): number => redondear(lineas.filter(l => l.estado === estado).reduce((s, l) => s + l.montoFirmado, 0));
        return {
          personalId, nombre: lineas[0].personalNombre, area: lineas[0].areaNombre, lineas,
          porPagar: suma('PENDIENTE'), porAprobar: suma('POR_APROBAR'), pagado: suma('PAGADO'),
          rechazo: lineas.find(l => l.estado === 'PENDIENTE' && l.motivoRechazo)?.motivoRechazo
        };
      })
      // Primero a quien falta pagar, luego a quien espera al administrador, al final lo pagado.
      .sort((a, b) => peso(a) - peso(b) || a.nombre.localeCompare(b.nombre, 'es'));
  });

  protected readonly personas = computed(() => {
    const q = this.texto().trim().toLowerCase();
    return this.todas().filter(p => !q || `${p.nombre} ${p.area ?? ''}`.toLowerCase().includes(q));
  });

  protected readonly total = computed(() => ({
    porPagar: redondear(this.todas().reduce((s, p) => s + p.porPagar, 0)),
    porAprobar: redondear(this.todas().reduce((s, p) => s + p.porAprobar, 0)),
    pagado: redondear(this.todas().reduce((s, p) => s + p.pagado, 0))
  }));

  constructor() {
    this.busqueda.valueChanges.subscribe(v => this.texto.set(v));
    this.periodo.valueChanges.subscribe(v => {
      this.periodoSig.set(v);
      if (periodoValido(v)) this.cargar();
    });
  }

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.api.planilla(this.periodo.value).subscribe({
      next: l => { this.pagos.set(l); this.cargando.set(false); },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar la planilla.')); }
    });
  }

  protected concepto(l: PagoPersonal): string { return etiquetaConcepto(l.concepto); }
  protected pendientesDe(p: Persona): PagoPersonal[] { return p.lineas.filter(l => l.estado === 'PENDIENTE'); }

  protected copiar(texto: string): void {
    navigator.clipboard?.writeText(texto).then(() => this.avisos.success('Copiado.'), () => this.avisos.warning('No se pudo copiar: selecciónalo y cópialo a mano.'));
  }

  protected abrirPago(p: Persona): void {
    this.fechaPago.setValue(hoyLocal());
    this.medioPago.setValue('TRANSFERENCIA');
    this.referenciaPago.setValue('');
    this.errorPago.set(null);
    this.cuenta.set(null);
    this.pagando.set(p);
    this.cargandoCuenta.set(true);
    this.api.cuentas(p.personalId).pipe(catchError(() => of([] as CuentaDeposito[]))).subscribe(lista => {
      this.cuenta.set(lista.find(c => c.principal) ?? lista[0] ?? null);
      this.cargandoCuenta.set(false);
    });
  }

  protected enviar(p: Persona): void {
    const lineas = this.pendientesDe(p);
    if (!lineas.length) return;
    if (this.medioPago.value !== 'EFECTIVO' && !this.referenciaPago.value.trim()) {
      this.errorPago.set('Anota el número de operación o la referencia del pago.');
      return;
    }
    this.guardando.set(true);
    this.errorPago.set(null);
    const datos = { fechaPago: this.fechaPago.value || undefined, medio: this.medioPago.value, referencia: this.referenciaPago.value.trim() || undefined };
    forkJoin(lineas.map(l => this.api.solicitar(l.id, datos))).subscribe({
      next: () => {
        this.guardando.set(false);
        this.pagando.set(null);
        this.avisos.success(`Pago de ${p.nombre} enviado al administrador para su aprobación.`);
        this.cargar();
      },
      error: e => { this.guardando.set(false); this.errorPago.set(mensajeError(e)); this.cargar(); }
    });
  }
}

function peso(p: Persona): number {
  return p.porPagar !== 0 ? 0 : p.porAprobar !== 0 ? 1 : 2;
}
