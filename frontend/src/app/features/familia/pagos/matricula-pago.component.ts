import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, effect, inject, input, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoMatriculaPago, MedioPasarela, OpcionDescuento, OrdenPago, ResultadoPasarela } from '../../../core/models/cobro.model';
import { FamiliaContextoService } from '../../../core/services/familia-contexto.service';
import { CobroService } from '../../../core/services/cobro.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BANCOS_PASARELA, ETIQUETA_MEDIO, MEDIOS_PASARELA, datosDelMedio, faltaEnDatos } from './pasarela';

const ESPERA_MS = 3000;
const INTENTOS_MAX = 12;

/**
 * La matrícula de un hijo dentro de «Pagos»: cuánto cuesta, cuánto hay a favor en su cuenta y cuánto falta. Se paga lo que falta con la pasarela
 * (simulada, con el ciclo de una real: el servidor crea la orden con el monto, la pasarela cobra y devuelve un número de operación); ese dinero
 * queda en su crédito y de ahí se cobra la matrícula, que se genera sola. Con crédito suficiente se puede generar sin pagar. Todas las reglas las
 * valida el servidor: los botones solo las reflejan.
 */
@Component({
  selector: 'app-matricula-pago',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, ModalComponent],
  template: `
    @if (estado(); as e) {
      @if (e.estadoMatricula === 'PRE_MATRICULA') {
        <section class="card tarjeta" aria-labelledby="t-mat">
          <div class="card-body">
            <div class="cab">
              <h2 id="t-mat">Matrícula pendiente de pago</h2>
              @if (e.pagada) { <span class="badge badge-ok">Pagada</span> } @else { <span class="badge badge-warn">Falta pagar</span> }
            </div>

            @if (e.total !== null && e.total !== undefined) {
              <div class="cifras">
                <div class="cifra"><span>Matrícula</span><strong>S/ {{ e.total | number: '1.2-2' }}</strong>@if ((e.descuento ?? 0) > 0) { <small>incluye S/ {{ e.descuento | number: '1.2-2' }} de descuento</small> }</div>
                <div class="cifra"><span>A favor en su cuenta</span><strong class="ok">S/ {{ e.credito | number: '1.2-2' }}</strong></div>
                <div class="cifra" [class.alerta]="e.faltante > 0"><span>Falta pagar</span><strong>S/ {{ e.faltante | number: '1.2-2' }}</strong></div>
              </div>
            }

            @if (e.solicitudDescuento; as sd) {
              @if (sd.estado === 'PENDIENTE') {
                <div class="aviso aviso-warn" role="status"><strong>Descuento en revisión:</strong> {{ sd.descuentoNombre }} ({{ sd.tipo === 'PORCENTAJE' ? sd.valor + ' %' : 'S/ ' + (sd.valor | number: '1.2-2') }}). La secretaría lo revisa; hasta que responda no se puede pagar la matrícula.</div>
              } @else if (sd.estado === 'APROBADA') {
                <div class="aviso aviso-ok" role="status"><strong>Descuento aprobado:</strong> {{ sd.descuentoNombre }}. El monto de la matrícula ya lo incluye.</div>
              } @else {
                <div class="aviso aviso-danger" role="alert"><strong>Descuento rechazado:</strong> {{ sd.motivoResolucion }}. Puedes pagar el monto completo o pedir otro.</div>
              }
            }

            @if (e.pagada) {
              <div class="aviso aviso-ok" role="status">
                @if (esperando()) { <strong>¡Pagada!</strong> Estamos generando la matrícula… } @else { La matrícula ya está pagada y se está generando. }
              </div>
            } @else {
              <div class="acciones">
                @if (e.faltante > 0 && !enRevision()) {
                  <button type="button" class="btn btn-primary grande" (click)="abrirPago()">Pagar lo que falta (S/ {{ e.faltante | number: '1.2-2' }})</button>
                }
                @if (!enRevision()) {
                  <button type="button" class="btn grande" (click)="abrirDescuento()">Solicitar descuento</button>
                }
                @if (e.puedeGenerar) {
                  <button type="button" class="btn btn-primary grande" [disabled]="generando()" (click)="generar()">{{ generando() ? 'Generando…' : 'Generar matrícula con mi crédito' }}</button>
                }
              </div>
              @if (!e.puedeGenerar && e.motivo) { <p class="muted nota">{{ e.motivo }}</p> }
              @if (e.faltante > 0) { <p class="muted nota">Pagas solo lo que falta: el dinero queda en la cuenta del alumno y de ahí se cobra la matrícula.</p> }
            }

            @if (e.depositos.length) {
              <h3 class="sub">Tus depósitos</h3>
              <ul class="depositos">
                @for (d of e.depositos; track d.id) {
                  <li><span class="muted">{{ d.creadoEn | date: 'dd/MM/yyyy HH:mm' }}</span><span>{{ medio(d.medio) }}@if (d.referencia) { · {{ d.referencia }} }</span><strong>S/ {{ d.monto | number: '1.2-2' }}</strong></li>
                }
              </ul>
            }
          </div>
        </section>
      }
    }

    @if (pidiendo()) {
      <app-modal titulo="Solicitar descuento" [ancho]="500" (cerrar)="pidiendo.set(false)">
        <p style="margin-top: 0">La secretaría revisa tu solicitud. Mientras tanto no se puede pagar la matrícula; cuando la apruebe, el monto se recalcula solo.</p>
        <form [formGroup]="formDescuento" class="form-grid" (ngSubmit)="enviarDescuento()" novalidate>
          <div class="field full"><label for="ds-desc">Descuento</label>
            <select id="ds-desc" formControlName="descuentoId"><option [ngValue]="0">Elegir…</option>@for (o of opcionesDescuento(); track o.id) { <option [ngValue]="o.id">{{ o.nombre }} · {{ o.tipo === 'PORCENTAJE' ? o.valor + ' %' : 'S/ ' + o.valor }}</option> }</select>
            @if (!opcionesDescuento().length) { <span class="muted">Por ahora el colegio no tiene descuentos para la matrícula.</span> }
          </div>
          <div class="field full"><label for="ds-her">¿Es por un hermano? Elige cuál</label>
            <select id="ds-her" formControlName="hermanoAlumnoId"><option [ngValue]="0">No es por un hermano</option>@for (h of hermanos(); track h.alumnoId) { <option [ngValue]="h.alumnoId">{{ h.nombreCompleto }}</option> }</select>
          </div>
          <div class="field full"><label for="ds-mot">Motivo</label><input id="ds-mot" formControlName="motivo" maxlength="300" placeholder="Ej.: mi hijo Diego ya está matriculado este año" /></div>
        </form>
        @if (errorDescuento()) { <div class="aviso aviso-danger" role="alert">{{ errorDescuento() }}</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="pidiendo.set(false)">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="enviando()" (click)="enviarDescuento()">{{ enviando() ? 'Enviando…' : 'Enviar solicitud' }}</button>
        </ng-container>
      </app-modal>
    }

    @if (abierto()) {
      <app-modal [titulo]="resultado()?.aprobada ? 'Pago aprobado' : 'Pagar la matrícula'" [ancho]="520" (cerrar)="cerrar()">
        @if (resultado(); as r) {
          @if (r.aprobada) {
            <div class="aviso aviso-ok" role="status">Se recibieron <strong>S/ {{ r.monto | number: '1.2-2' }}</strong>.</div>
            <dl class="datos" style="margin-top: 14px">
              <div><dt>N.º de operación</dt><dd><strong>{{ r.transaccionId }}</strong></dd></div>
              <div><dt>Medio</dt><dd>{{ medio(r.medio) }}@if (r.detalle) { · {{ r.detalle }} }</dd></div>
              <div><dt>Fecha</dt><dd>{{ r.fecha | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
              <div><dt>Orden</dt><dd>{{ r.orden }}</dd></div>
            </dl>
            <p class="muted" style="margin-bottom: 0">El dinero quedó en la cuenta del alumno y se pagó la matrícula con él. La matrícula se genera en unos segundos.</p>
          }
        } @else {
          @if (cargandoOrden()) { <p class="muted">Preparando tu pago…</p> }
          @else if (orden(); as o) {
            <div class="orden">
              <span class="muted">Monto a pagar (lo calcula el sistema)</span>
              <strong>S/ {{ o.monto | number: '1.2-2' }}</strong>
              <small class="muted">Orden {{ o.codigo }} · vence {{ o.expiraEn | date: 'HH:mm' }}</small>
            </div>

            <div class="medios" role="radiogroup" aria-label="Medio de pago">
              @for (m of medios; track m.id) {
                <button type="button" role="radio" class="medio" [class.on]="medioElegido() === m.id" [attr.aria-checked]="medioElegido() === m.id" (click)="elegirMedio(m.id)">
                  <strong>{{ m.etiqueta }}</strong><small>{{ m.ayuda }}</small>
                </button>
              }
            </div>

            <form [formGroup]="form" class="form-grid" (ngSubmit)="pagar()" novalidate>
              @switch (medioElegido()) {
                @case ('TARJETA') {
                  <div class="field full"><label for="pg-num">Número de tarjeta</label><input id="pg-num" formControlName="tarjetaNumero" inputmode="numeric" autocomplete="off" placeholder="4111 1111 1111 1111" /></div>
                  <div class="field"><label for="pg-ven">Vencimiento</label><input id="pg-ven" formControlName="vencimiento" placeholder="MM/AA" autocomplete="off" /></div>
                  <div class="field"><label for="pg-cvv">CVV</label><input id="pg-cvv" formControlName="cvv" inputmode="numeric" maxlength="4" autocomplete="off" /></div>
                  <div class="field full"><label for="pg-tit">Titular</label><input id="pg-tit" formControlName="titular" autocomplete="off" /></div>
                }
                @case ('YAPE_PLIN') {
                  <div class="field"><label for="pg-cel">Celular</label><input id="pg-cel" formControlName="celular" inputmode="numeric" maxlength="11" placeholder="987 654 321" /></div>
                  <div class="field"><label for="pg-tit2">Titular</label><input id="pg-tit2" formControlName="titular" /></div>
                }
                @default {
                  <div class="field"><label for="pg-ban">Banco</label>
                    <select id="pg-ban" formControlName="banco"><option value="">Elegir…</option>@for (b of bancos; track b.id) { <option [value]="b.id">{{ b.etiqueta }}</option> }</select></div>
                  <div class="field"><label for="pg-tit3">Titular de la cuenta</label><input id="pg-tit3" formControlName="titular" /></div>
                }
              }
            </form>
            <p class="muted nota">Es una pasarela de demostración: no se hace ningún cargo real. Tarjeta que termina en 0002 o celular que termina en 00 simulan un rechazo.</p>
            @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }
          } @else if (error()) {
            <div class="aviso aviso-danger" role="alert">{{ error() }}</div>
          }
        }
        <ng-container footer>
          @if (resultado()?.aprobada) {
            <button type="button" class="btn btn-primary" (click)="cerrar()">Listo</button>
          } @else {
            <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
            <button type="button" class="btn btn-primary" [disabled]="pagando() || !orden()" (click)="pagar()">{{ pagando() ? 'Procesando…' : 'Pagar S/ ' + ((orden()?.monto ?? 0) | number: '1.2-2') }}</button>
          }
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .tarjeta { margin-bottom: 16px; border: 1.5px solid var(--primary); }
    .cab { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
    h2 { margin: 0; font-size: 1.1rem; }
    .sub { margin: 16px 0 6px; font-size: .95rem; }
    .cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-bottom: 12px; }
    .cifra { display: flex; flex-direction: column; padding: 10px 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .cifra span { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .cifra strong { font-size: 1.3rem; font-variant-numeric: tabular-nums; }
    .cifra strong.ok { color: var(--ok); }
    .cifra small { color: var(--ink-2); }
    .cifra.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .acciones { display: flex; flex-wrap: wrap; gap: 10px; }
    .grande { min-height: 48px; padding: 0 22px; }
    .nota { margin: 10px 0 0; font-size: .85rem; }
    .depositos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
    .depositos li { display: grid; grid-template-columns: 130px minmax(0, 1fr) auto; gap: 10px; padding: 6px 0; border-top: 1px solid var(--line); font-size: .9rem; }
    .orden { display: flex; flex-direction: column; padding: 12px 16px; margin-bottom: 14px; border-radius: 12px; background: var(--primary-soft); }
    .orden strong { font-size: 1.9rem; font-variant-numeric: tabular-nums; }
    .medios { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 14px; }
    .medio { display: flex; flex-direction: column; align-items: flex-start; padding: 10px 12px; border: 1.5px solid var(--line-2); border-radius: 12px; background: var(--card); font: inherit; text-align: left; cursor: pointer; }
    .medio small { color: var(--ink-2); }
    .medio.on { border-color: var(--primary); background: var(--primary-soft); box-shadow: inset 0 0 0 1px var(--primary); }
    @media (max-width: 520px) { .medios { grid-template-columns: minmax(0, 1fr); } .depositos li { grid-template-columns: minmax(0, 1fr) auto; } .depositos li .muted { grid-column: 1 / -1; } }
  `
})
export class MatriculaPagoComponent {
  private readonly api = inject(CobroService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destruido = inject(DestroyRef);
  private readonly familia = inject(FamiliaContextoService);

  /** El hijo cuya matrícula se muestra. */
  readonly alumnoId = input.required<number>();

  protected readonly medios = MEDIOS_PASARELA;
  protected readonly bancos = BANCOS_PASARELA;
  protected readonly medio = (m?: string | null): string => (m ? ETIQUETA_MEDIO[m] ?? m : '');

  protected readonly estado = signal<EstadoMatriculaPago | null>(null);
  protected readonly generando = signal(false);
  /** Ya pagó: se vuelve a preguntar unos segundos hasta que la matrícula quede generada. */
  protected readonly esperando = signal(false);
  private temporizador?: ReturnType<typeof setTimeout>;
  private intentos = 0;

  // --- solicitar un descuento ---
  protected readonly pidiendo = signal(false);
  protected readonly enviando = signal(false);
  protected readonly errorDescuento = signal<string | null>(null);
  protected readonly opcionesDescuento = signal<OpcionDescuento[]>([]);
  protected readonly formDescuento = this.fb.nonNullable.group({
    descuentoId: [0, [Validators.required, Validators.min(1)]],
    hermanoAlumnoId: [0],
    motivo: ['', [Validators.required, Validators.maxLength(300)]]
  });
  /** Los otros hijos del apoderado: el hermano con el que se prueba el descuento. */
  protected hermanos(): { alumnoId: number; nombreCompleto: string }[] {
    return this.familia.hijos().filter(h => h.alumnoId !== this.alumnoId());
  }
  /** ¿Hay una solicitud esperando la respuesta de la secretaría? (el servidor también lo exige). */
  protected enRevision(): boolean {
    return this.estado()?.solicitudDescuento?.estado === 'PENDIENTE';
  }

  // --- la pantalla de pago ---
  protected readonly abierto = signal(false);
  protected readonly orden = signal<OrdenPago | null>(null);
  protected readonly cargandoOrden = signal(false);
  protected readonly pagando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly resultado = signal<ResultadoPasarela | null>(null);
  protected readonly medioElegido = signal<MedioPasarela>('TARJETA');
  protected readonly form = this.fb.nonNullable.group({
    tarjetaNumero: [''], vencimiento: [''], cvv: [''], celular: [''], banco: [''], titular: ['']
  });

  constructor() {
    effect(() => {
      const id = this.alumnoId();
      untracked(() => this.cargar(id));
    });
    this.destruido.onDestroy(() => clearTimeout(this.temporizador));
  }

  private cargar(id: number): void {
    clearTimeout(this.temporizador);
    this.estado.set(null);
    this.esperando.set(false);
    this.api.matriculaDe(id).subscribe({
      // 404: el alumno no tiene una matrícula por pagar; la tarjeta simplemente no se muestra
      next: e => { this.estado.set(e); this.vigilar(id, e); },
      error: () => this.estado.set(null)
    });
  }

  /** Si ya está pagada pero aún no se generó, vuelve a mirar cada pocos segundos (la matrícula se genera por un aviso entre servicios). */
  private vigilar(id: number, e: EstadoMatriculaPago): void {
    clearTimeout(this.temporizador);
    if (e.estadoMatricula !== 'PRE_MATRICULA' || !e.pagada || this.intentos >= INTENTOS_MAX) { this.esperando.set(false); return; }
    this.esperando.set(true);
    this.intentos++;
    this.temporizador = setTimeout(() => this.api.matriculaDe(id).subscribe({ next: n => { this.estado.set(n); this.vigilar(id, n); }, error: () => this.esperando.set(false) }), ESPERA_MS);
  }

  // ---------- Solicitar descuento ----------
  protected abrirDescuento(): void {
    this.formDescuento.reset({ descuentoId: 0, hermanoAlumnoId: 0, motivo: '' });
    this.errorDescuento.set(null);
    this.pidiendo.set(true);
    this.api.opcionesDescuento().subscribe({ next: o => this.opcionesDescuento.set(o), error: () => this.opcionesDescuento.set([]) });
  }

  protected enviarDescuento(): void {
    if (this.formDescuento.invalid) {
      this.errorDescuento.set('Elige el descuento y cuenta el motivo.');
      return;
    }
    const v = this.formDescuento.getRawValue();
    this.enviando.set(true);
    this.errorDescuento.set(null);
    this.api.solicitarDescuento(this.alumnoId(), { descuentoId: v.descuentoId, motivo: v.motivo.trim(), hermanoAlumnoId: v.hermanoAlumnoId || null }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.pidiendo.set(false);
        this.avisos.success('Solicitud enviada. La secretaría la revisará.');
        this.cargar(this.alumnoId());
      },
      error: e => { this.enviando.set(false); this.errorDescuento.set(mensajeError(e, 'No se pudo enviar la solicitud.')); }
    });
  }

  // ---------- Pagar lo que falta ----------
  protected abrirPago(): void {
    this.resultado.set(null);
    this.error.set(null);
    this.orden.set(null);
    this.form.reset({ tarjetaNumero: '', vencimiento: '', cvv: '', celular: '', banco: '', titular: '' });
    this.medioElegido.set('TARJETA');
    this.abierto.set(true);
    this.cargandoOrden.set(true);
    this.api.crearOrdenMatricula(this.alumnoId()).subscribe({
      next: o => { this.orden.set(o); this.cargandoOrden.set(false); },
      error: e => { this.cargandoOrden.set(false); this.error.set(mensajeError(e, 'No se pudo preparar el pago.')); }
    });
  }

  protected elegirMedio(m: MedioPasarela): void {
    this.medioElegido.set(m);
    this.error.set(null);
  }

  protected pagar(): void {
    const o = this.orden();
    if (!o || this.pagando()) return;
    const datos = datosDelMedio({ medio: this.medioElegido(), ...this.form.getRawValue() });
    const falta = faltaEnDatos(datos);
    if (falta) { this.error.set(falta); return; }
    this.pagando.set(true);
    this.error.set(null);
    this.api.pagarEnPasarela(o.codigo, datos).subscribe({
      next: r => {
        this.pagando.set(false);
        if (r.aprobada) {
          this.resultado.set(r);
          this.estado.set(r.estado);
          this.intentos = 0;
          this.vigilar(this.alumnoId(), r.estado);
        } else {
          // La pasarela rechazó este intento: la orden sigue abierta y se puede reintentar con otros datos.
          this.error.set(r.mensaje);
        }
      },
      error: e => { this.pagando.set(false); this.error.set(mensajeError(e, 'No se pudo procesar el pago.')); }
    });
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  // ---------- Generar con el crédito ----------
  protected generar(): void {
    this.generando.set(true);
    this.api.generarMatricula(this.alumnoId()).subscribe({
      next: e => {
        this.generando.set(false);
        this.estado.set(e);
        this.intentos = 0;
        this.avisos.success('Matrícula pagada con tu crédito. Se está generando.');
        this.vigilar(this.alumnoId(), e);
      },
      error: err => {
        this.generando.set(false);
        this.avisos.error(mensajeError(err, 'No se pudo generar la matrícula.'));
        this.cargar(this.alumnoId());   // el servidor manda: se vuelve a leer el estado real
      }
    });
  }
}
