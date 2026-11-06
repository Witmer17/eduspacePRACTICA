import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Docente } from '../../core/models/planificacion.model';
import { Contrato, ContratoRequest, CuentaDeposito, CuentaRequest, PagoPersonal, RenovarRequest, TipoContrato, TipoCuenta } from '../../core/models/rrhh.model';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { RrhhService } from '../../core/services/rrhh.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { hoyLocal } from './asistencia-personal';
import {
  BANCOS, CONCEPTOS_PAGO, TIPOS_CONTRATO, TIPOS_CUENTA, claseEstadoContrato, contratoQueImpideOtro, contratoRenovable, diaSiguiente, diasHasta,
  duracionContrato, erroresCuenta as validarCuenta, esBilletera, etiquetaBanco, etiquetaConcepto, etiquetaEstadoContrato, etiquetaTipo, etiquetaTipoCuenta, fechaCorta,
  finDeAnio, finPorMeses, nombrePeriodo, periodoDe, periodoValido, soles, soloDigitos, totalesPlanilla
} from './rrhh';

/** Contratos y pagos de una persona del personal (solo administrador). Dos pestañas dentro de un modal. */
@Component({
  selector: 'app-personal-rrhh',
  imports: [ReactiveFormsModule, ModalComponent],
  template: `
    <app-modal [titulo]="'Contratos y pagos · ' + persona().nombres + ' ' + persona().apellidos" [ancho]="860" (cerrar)="cerrar.emit()">
      <div class="pestanas" role="tablist">
        <button type="button" role="tab" [class.on]="pestana() === 'contratos'" [attr.aria-selected]="pestana() === 'contratos'" (click)="pestana.set('contratos')">Contratos ({{ contratos().length }})</button>
        <button type="button" role="tab" [class.on]="pestana() === 'pagos'" [attr.aria-selected]="pestana() === 'pagos'" (click)="pestana.set('pagos')">Pagos ({{ pagos().length }})</button>
        <button type="button" role="tab" [class.on]="pestana() === 'cuenta'" [attr.aria-selected]="pestana() === 'cuenta'" (click)="pestana.set('cuenta')">Cuenta de depósito ({{ cuentas().length }})</button>
      </div>

      @if (pestana() === 'contratos') {
        @if (contratoPorVencer(); as c) {
          <div class="aviso aviso-warn" role="status">
            @if (diasFin(c) < 0) { El contrato venció hace {{ -diasFin(c) }} {{ -diasFin(c) === 1 ? 'día' : 'días' }}. }
            @else { El contrato vence en {{ diasFin(c) }} {{ diasFin(c) === 1 ? 'día' : 'días' }} ({{ c.fechaFin }}). }
            Renuévalo con «Renovar contrato».
          </div>
        }
        <div class="barra">
          <span class="muted">
            @if (contratoVigente(); as v) { Ya tiene un contrato {{ v.estadoEfectivo === 'POR_INICIAR' ? 'por iniciar' : 'vigente' }}: cada persona tiene un solo contrato. Para continuar se renueva. }
            @else { {{ contratos().length ? 'Historial de contratos, el más reciente primero.' : 'Todavía no tiene contratos.' }} }
          </span>
          <span class="acciones-barra">
            @if (renovable(); as r) { <button type="button" class="btn btn-primary btn-sm" (click)="abrirRenovar(r)">Renovar contrato</button> }
            @if (!contratoVigente()) { <button type="button" class="btn btn-sm" [class.btn-primary]="!renovable()" (click)="nuevoContrato()">Nuevo contrato</button> }
          </span>
        </div>

        <!-- Renovar: el nuevo contrato empieza el día siguiente al fin del anterior -->
        @if (renovando(); as ant) {
          <form [formGroup]="formRenovar" (ngSubmit)="guardarRenovacion()" class="form-grid caja" id="form-renovar" novalidate>
            <div class="full renovar-cab">
              <strong>Renovar el contrato que termina el {{ fechaCorta(ant.fechaFin!) }}</strong>
              <span class="muted">El nuevo empieza el <strong>{{ fechaCorta(inicioRenovacion()) }}</strong>, el día siguiente: sin huecos ni cruces. Lo que no cambies se hereda.</span>
            </div>
            <div class="field">
              <label for="rn-tipo">Tipo de contrato</label>
              <select id="rn-tipo" formControlName="tipo">
                @for (t of tipos; track t.id) { <option [value]="t.id">{{ t.etiqueta }}</option> }
              </select>
            </div>
            <div class="field">
              <label for="rn-cargo">Cargo</label>
              <input id="rn-cargo" formControlName="cargo" maxlength="100" />
            </div>
            <div class="field">
              <label for="rn-fin">Nuevo fin {{ esIndefinidoRenovar() ? '(no aplica)' : '' }}</label>
              <input id="rn-fin" type="date" formControlName="fechaFin" [readonly]="esIndefinidoRenovar()" [min]="inicioRenovacion()" />
              @if (!esIndefinidoRenovar()) {
                <div class="atajos">
                  <button type="button" class="atajo" (click)="finRenovacion(3)">3 meses</button>
                  <button type="button" class="atajo" (click)="finRenovacion(6)">6 meses</button>
                  <button type="button" class="atajo" (click)="finRenovacion(12)">1 año</button>
                  <button type="button" class="atajo" (click)="finRenovacion('anio')">Fin de año</button>
                </div>
              }
            </div>
            <div class="field">
              <label for="rn-rem">Sueldo mensual (S/)</label>
              <input id="rn-rem" type="number" min="0" step="0.01" formControlName="remuneracion" />
              @if (cambioSueldo(); as cs) { <span class="muted">{{ cs }}</span> }
            </div>
            <div class="field full">
              <label for="rn-obs">Observaciones</label>
              <input id="rn-obs" formControlName="observaciones" maxlength="500" placeholder="Renovación anual…" />
            </div>
            <div class="full resumen-renovar" aria-live="polite">{{ resumenRenovacion() }}</div>
            @if (errorRenovar()) { <div class="aviso aviso-danger full" role="alert">{{ errorRenovar() }}</div> }
            <div class="full acciones-form">
              <button type="button" class="btn btn-sm" (click)="renovando.set(null)">Cancelar</button>
              <button type="submit" class="btn btn-primary btn-sm" [disabled]="guardando() || !renovacionLista()">{{ guardando() ? 'Renovando…' : 'Renovar contrato' }}</button>
            </div>
          </form>
        }

        @if (formContratoAbierto()) {
          <form [formGroup]="formContrato" (ngSubmit)="guardarContrato()" class="form-grid caja" novalidate>
            <div class="field">
              <label for="c-tipo">Tipo de contrato</label>
              <select id="c-tipo" formControlName="tipo">
                @for (t of tipos; track t.id) { <option [value]="t.id">{{ t.etiqueta }}</option> }
              </select>
              <span class="muted">{{ ayudaTipo() }}</span>
            </div>
            <div class="field">
              <label for="c-cargo">Cargo</label>
              <input id="c-cargo" formControlName="cargo" [placeholder]="persona().cargo || 'Cargo del contrato'" />
            </div>
            <div class="field">
              <label for="c-ini">Inicio</label>
              <input id="c-ini" type="date" formControlName="fechaInicio" />
              @if (formContrato.controls.fechaInicio.touched && formContrato.controls.fechaInicio.invalid) { <span class="error">Obligatorio.</span> }
            </div>
            <div class="field">
              <label for="c-fin">Fin {{ esIndefinido() ? '(no aplica)' : '' }}</label>
              <input id="c-fin" type="date" formControlName="fechaFin" [readonly]="esIndefinido()" />
            </div>
            <div class="field">
              <label for="c-rem">Remuneración mensual (S/)</label>
              <input id="c-rem" type="number" min="0" step="0.01" formControlName="remuneracion" />
              @if (formContrato.controls.remuneracion.touched && formContrato.controls.remuneracion.invalid) { <span class="error">Indica un monto válido.</span> }
            </div>
            <div class="field">
              <label for="c-obs">Observaciones</label>
              <input id="c-obs" formControlName="observaciones" maxlength="500" />
            </div>
            @if (errorContrato()) { <div class="aviso aviso-danger full" role="alert">{{ errorContrato() }}</div> }
            <div class="full acciones-form">
              <button type="button" class="btn btn-sm" (click)="formContratoAbierto.set(false)">Cancelar</button>
              <button type="submit" class="btn btn-primary btn-sm" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : editandoContrato() ? 'Guardar cambios' : 'Crear contrato' }}</button>
            </div>
          </form>
        }

        @if (rescindiendo(); as r) {
          <div class="caja">
            <strong>{{ r.estadoEfectivo === 'POR_INICIAR' ? 'Cancelar el contrato que empieza el ' + r.fechaInicio + ' (se rescinde antes de regir)' : 'Rescindir el contrato desde ' + r.fechaInicio }}</strong>
            <div class="form-grid" style="margin-top: 8px">
              @if (r.estadoEfectivo !== 'POR_INICIAR') {
                <div class="field"><label for="r-fecha">Fecha de rescisión</label><input id="r-fecha" type="date" [formControl]="fechaRescision" /></div>
              }
              <div class="field" [class.full]="r.estadoEfectivo === 'POR_INICIAR'"><label for="r-motivo">Motivo</label><input id="r-motivo" [formControl]="motivoRescision" maxlength="255" /></div>
            </div>
            <div class="acciones-form">
              <button type="button" class="btn btn-sm" (click)="rescindiendo.set(null)">Cancelar</button>
              <button type="button" class="btn btn-danger btn-sm" [disabled]="guardando()" (click)="confirmarRescision(r)">Rescindir</button>
            </div>
          </div>
        }

        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Tipo</th><th>Vigencia</th><th>Remuneración</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              @for (c of contratos(); track c.id) {
                <tr>
                  <td>{{ tipoDe(c) }}@if (c.cargo) { <div class="muted">{{ c.cargo }}</div> }</td>
                  <td>{{ c.fechaInicio }} → {{ c.fechaFin ?? 'indefinido' }}@if (c.fechaRescision) { <div class="muted">Rescindido el {{ c.fechaRescision }}{{ c.motivoRescision ? ': ' + c.motivoRescision : '' }}</div> }</td>
                  <td>{{ dinero(c.remuneracion) }}</td>
                  <td><span [class]="'badge ' + claseEstado(c)">{{ etiquetaEstado(c) }}</span></td>
                  <td class="acciones">
                    @if (c.estado === 'VIGENTE') {
                      @if (renovable()?.id === c.id) { <button type="button" class="btn btn-sm" (click)="abrirRenovar(c)">Renovar</button> }
                      <button type="button" class="btn btn-sm" (click)="editarContrato(c)">Editar</button>
                      <button type="button" class="btn btn-sm" (click)="pedirRescision(c)">Rescindir</button>
                    }
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="vacio">{{ cargando() ? 'Cargando…' : 'Sin contratos.' }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      } @else if (pestana() === 'pagos') {
        <div class="resumen">
          <div><span>Pagado</span><strong>{{ dinero(totales().pagado) }}</strong></div>
          <div><span>Pendiente</span><strong>{{ dinero(totales().pendiente) }}</strong></div>
        </div>
        <div class="barra">
          <span class="muted">Descuentos y adelantos restan del total.</span>
          <button type="button" class="btn btn-primary btn-sm" (click)="nuevoPago()">Registrar pago</button>
        </div>

        @if (formPagoAbierto()) {
          <form [formGroup]="formPago" (ngSubmit)="guardarPago()" class="form-grid caja" novalidate>
            <div class="field">
              <label for="p-per">Periodo</label>
              <input id="p-per" type="month" formControlName="periodo" />
              @if (formPago.controls.periodo.touched && !periodoOk()) { <span class="error">Elige el mes.</span> }
            </div>
            <div class="field">
              <label for="p-con">Concepto</label>
              <select id="p-con" formControlName="concepto">
                @for (c of conceptos; track c.id) { <option [value]="c.id">{{ c.etiqueta }}{{ c.resta ? ' (resta)' : '' }}</option> }
              </select>
            </div>
            <div class="field">
              <label for="p-monto">Monto (S/)</label>
              <input id="p-monto" type="number" min="0.01" step="0.01" formControlName="monto" />
              @if (formPago.controls.monto.touched && formPago.controls.monto.invalid) { <span class="error">Debe ser mayor que cero.</span> }
            </div>
            <div class="field">
              <label for="p-desc">Descripción</label>
              <input id="p-desc" formControlName="descripcion" maxlength="200" />
            </div>
            @if (errorPago()) { <div class="aviso aviso-danger full" role="alert">{{ errorPago() }}</div> }
            <div class="full acciones-form">
              <button type="button" class="btn btn-sm" (click)="formPagoAbierto.set(false)">Cancelar</button>
              <button type="submit" class="btn btn-primary btn-sm" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : 'Registrar' }}</button>
            </div>
          </form>
        }

        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Periodo</th><th>Concepto</th><th>Monto</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              @for (p of pagos(); track p.id) {
                <tr>
                  <td>{{ nombrePeriodo(p.periodo) }}</td>
                  <td>{{ etiquetaConcepto(p) }}@if (p.descripcion) { <div class="muted">{{ p.descripcion }}</div> }</td>
                  <td [class.neg]="p.montoFirmado < 0">{{ dinero(p.montoFirmado) }}</td>
                  <td>
                    <span [class]="'badge ' + (p.estado === 'PAGADO' ? 'badge-ok' : p.estado === 'POR_APROBAR' ? 'badge-violet' : 'badge-warn')">{{ p.estado === 'PAGADO' ? 'Pagado' : p.estado === 'POR_APROBAR' ? 'Por aprobar' : 'Pendiente' }}</span>
                    @if (p.fechaPago) { <div class="muted">{{ p.fechaPago }}{{ p.medio ? ' · ' + p.medio : '' }}</div> }
                    @if (p.estado === 'PENDIENTE' && p.motivoRechazo) { <div class="muted" style="color: var(--danger)">Rechazado: {{ p.motivoRechazo }}</div> }
                  </td>
                  <td class="acciones">
                    @if (p.estado === 'PENDIENTE') {
                      <button type="button" class="btn btn-sm" (click)="eliminarPago(p)">Quitar</button>
                    }
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="vacio">{{ cargando() ? 'Cargando…' : 'Sin pagos registrados. Genera la planilla del mes o registra uno.' }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <!-- Cuenta para depósito: dónde se le paga a esta persona -->
        <div class="barra">
          <span class="muted">{{ cuentas().length ? 'La cuenta principal es la que se muestra al pagar.' : 'Aún no tiene una cuenta donde depositarle.' }}</span>
          <button type="button" class="btn btn-primary btn-sm" (click)="nuevaCuenta()">Agregar cuenta</button>
        </div>

        @if (formCuentaAbierto()) {
          <form [formGroup]="formCuenta" (ngSubmit)="guardarCuenta()" class="form-grid caja" id="form-cuenta" novalidate>
            <div class="field">
              <label for="cu-banco">Banco o billetera</label>
              <select id="cu-banco" formControlName="banco">
                @for (b of bancos; track b.id) { <option [value]="b.id">{{ b.etiqueta }}</option> }
              </select>
            </div>
            <div class="field">
              <label for="cu-tipo">Tipo de cuenta</label>
              <select id="cu-tipo" formControlName="tipo">
                @for (t of tiposCuenta; track t.id) { <option [value]="t.id">{{ t.etiqueta }}</option> }
              </select>
              @if (erroresCuenta().tipo) { <span class="error">{{ erroresCuenta().tipo }}</span> }
            </div>
            <div class="field">
              <label for="cu-numero">{{ esBilleteraCuenta() ? 'Celular (9 dígitos)' : 'Número de cuenta' }}</label>
              <input id="cu-numero" formControlName="numero" inputmode="numeric" autocomplete="off" [placeholder]="esBilleteraCuenta() ? '987654321' : '194-12345678-0-12'" />
              @if (formCuenta.controls.numero.dirty && erroresCuenta().numero) { <span class="error">{{ erroresCuenta().numero }}</span> }
            </div>
            @if (!esBilleteraCuenta()) {
              <div class="field">
                <label for="cu-cci">CCI (opcional, 20 dígitos)</label>
                <input id="cu-cci" formControlName="cci" inputmode="numeric" autocomplete="off" placeholder="002 194 001234567801 12" />
                @if (formCuenta.controls.cci.dirty && erroresCuenta().cci) { <span class="error">{{ erroresCuenta().cci }}</span> }
              </div>
            }
            <div class="field full">
              <label for="cu-titular">Titular de la cuenta</label>
              <input id="cu-titular" formControlName="titular" maxlength="150" />
              @if (formCuenta.controls.titular.touched && formCuenta.controls.titular.invalid) { <span class="error">Indica el titular.</span> }
              <span class="muted">Normalmente es la propia persona; si la cuenta es de un familiar, escribe su nombre.</span>
            </div>
            <label class="check full"><input type="checkbox" formControlName="principal" /> Es la cuenta principal (la que se usa para depositar)</label>
            @if (errorCuenta()) { <div class="aviso aviso-danger full" role="alert">{{ errorCuenta() }}</div> }
            <div class="full acciones-form">
              <button type="button" class="btn btn-sm" (click)="formCuentaAbierto.set(false)">Cancelar</button>
              <button type="submit" class="btn btn-primary btn-sm" [disabled]="guardando() || !cuentaValida()">{{ guardando() ? 'Guardando…' : editandoCuenta() ? 'Guardar cambios' : 'Agregar cuenta' }}</button>
            </div>
          </form>
        }

        <div class="cuentas">
          @for (c of cuentas(); track c.id) {
            <article class="cuenta" [class.principal]="c.principal">
              <header>
                <strong>{{ etiquetaBanco(c.banco) }}</strong>
                <span class="muted">{{ etiquetaTipoCuenta(c.tipo) }}</span>
                @if (c.principal) { <span class="badge badge-ok">Principal</span> }
              </header>
              <dl>
                <dt>{{ c.tipo === 'BILLETERA' ? 'Celular' : 'N.º de cuenta' }}</dt>
                <dd><span class="num">{{ c.numero }}</span> <button type="button" class="copiar" (click)="copiar(c.numero)" [attr.aria-label]="'Copiar el número de ' + etiquetaBanco(c.banco)">Copiar</button></dd>
                @if (c.cci) { <dt>CCI</dt><dd><span class="num">{{ c.cci }}</span> <button type="button" class="copiar" (click)="copiar(c.cci)" aria-label="Copiar el CCI">Copiar</button></dd> }
                <dt>Titular</dt><dd>{{ c.titular }}</dd>
              </dl>
              <footer>
                @if (!c.principal) { <button type="button" class="btn btn-sm" (click)="hacerPrincipal(c)">Hacer principal</button> }
                <button type="button" class="btn btn-sm" (click)="editarCuenta(c)">Editar</button>
                <button type="button" class="btn btn-sm" (click)="quitarCuenta(c)">Quitar</button>
              </footer>
            </article>
          } @empty {
            <p class="vacio-bloque">{{ cargando() ? 'Cargando…' : 'Sin cuentas. Agrega la cuenta bancaria, Yape o Plin donde se le deposita su sueldo.' }}</p>
          }
        </div>
      }

      <ng-container footer>
        <button type="button" class="btn" (click)="cerrar.emit()">Cerrar</button>
      </ng-container>
    </app-modal>
  `,
  styles: `
    .pestanas { display: flex; gap: 6px; margin-bottom: 12px; border-bottom: 1px solid var(--line); }
    .pestanas button { padding: 8px 14px; font: inherit; font-weight: 700; color: var(--ink-2); background: none; border: 0; border-bottom: 3px solid transparent; cursor: pointer; }
    .pestanas button.on { color: var(--primary); border-bottom-color: var(--primary); }
    .barra { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin: 8px 0; }
    .caja { margin: 8px 0 12px; padding: 12px 14px; border: 1.5px solid var(--line-2); border-radius: 12px; background: var(--bg); }
    .acciones-form { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
    .resumen { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .resumen div { display: flex; flex-direction: column; padding: 10px 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .resumen span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .resumen strong { font-size: 1.15rem; }
    .neg { color: var(--danger, #b3261e); }
    .acciones-barra { display: flex; gap: 8px; }
    .renovar-cab { display: flex; flex-direction: column; gap: 2px; }
    .resumen-renovar { padding: 8px 12px; border-radius: 10px; background: var(--primary-soft); color: var(--primary); font-weight: 700; }
    .atajos { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .atajo { padding: 3px 10px; font: inherit; font-size: .76rem; font-weight: 700; color: var(--primary); background: var(--primary-soft); border: 0; border-radius: 999px; cursor: pointer; }
    .check { display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; }
    .cuentas { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 12px; margin-top: 8px; }
    .cuenta { display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; border: 1.5px solid var(--line-2); border-radius: 14px; background: var(--card); }
    .cuenta.principal { border-color: var(--ok); background: var(--ok-soft); }
    .cuenta header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .cuenta dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: .88rem; }
    .cuenta dt { color: var(--ink-2); }
    .cuenta dd { margin: 0; font-weight: 600; word-break: break-all; }
    .cuenta .num { font-variant-numeric: tabular-nums; letter-spacing: .02em; user-select: all; }
    .copiar { margin-left: 6px; padding: 1px 8px; font: inherit; font-size: .7rem; font-weight: 700; color: var(--primary); background: var(--primary-soft); border: 0; border-radius: 999px; cursor: pointer; }
    .cuenta footer { display: flex; gap: 6px; flex-wrap: wrap; }
    .vacio-bloque { margin: 0; color: var(--ink-2); font-size: .88rem; }
  `
})
export class PersonalRrhhComponent implements OnInit {
  readonly persona = input.required<Docente>();
  /** Pestaña con la que se abre. */
  readonly pestanaInicial = input<'contratos' | 'pagos' | 'cuenta'>('contratos');
  readonly cerrar = output<void>();

  private readonly api = inject(RrhhService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly tipos = TIPOS_CONTRATO;
  protected readonly conceptos = CONCEPTOS_PAGO;
  protected readonly dinero = soles;
  protected readonly nombrePeriodo = nombrePeriodo;

  protected readonly pestana = signal<'contratos' | 'pagos' | 'cuenta'>('contratos');
  protected readonly contratos = signal<Contrato[]>([]);
  protected readonly pagos = signal<PagoPersonal[]>([]);
  protected readonly cuentas = signal<CuentaDeposito[]>([]);
  protected readonly bancos = BANCOS;
  protected readonly tiposCuenta = TIPOS_CUENTA;
  protected readonly etiquetaBanco = etiquetaBanco;
  protected readonly etiquetaTipoCuenta = etiquetaTipoCuenta;
  protected readonly fechaCorta = fechaCorta;
  protected readonly cargando = signal(true);
  protected readonly guardando = signal(false);
  protected readonly totales = computed(() => totalesPlanilla(this.pagos()));

  // --- Contratos ---
  protected readonly formContratoAbierto = signal(false);
  protected readonly editandoContrato = signal<Contrato | null>(null);
  protected readonly errorContrato = signal<string | null>(null);
  protected readonly rescindiendo = signal<Contrato | null>(null);
  protected readonly fechaRescision = this.fb.nonNullable.control('');
  protected readonly motivoRescision = this.fb.nonNullable.control('');
  protected readonly formContrato = this.fb.nonNullable.group({
    tipo: ['PLAZO_FIJO' as TipoContrato, Validators.required],
    cargo: [''],
    fechaInicio: ['', Validators.required],
    fechaFin: [''],
    remuneracion: [0, [Validators.required, Validators.min(0)]],
    observaciones: ['']
  });
  private readonly tipoElegido = signal<TipoContrato>('PLAZO_FIJO');
  protected readonly esIndefinido = computed(() => this.tipoElegido() === 'INDEFINIDO');
  protected readonly ayudaTipo = computed(() => TIPOS_CONTRATO.find(t => t.id === this.tipoElegido())?.ayuda ?? '');

  /** El contrato vigente que ya venció o vence en 30 días o menos (para avisar que hay que renovar). */
  protected readonly contratoPorVencer = computed(() => {
    const lista = this.contratos();
    // Si ya tiene otro contrato rigiendo o por iniciar, no hay nada que renovar.
    if (lista.some(c => c.estadoEfectivo === 'VIGENTE' || c.estadoEfectivo === 'POR_INICIAR')) return undefined;
    return lista.find(c => c.estadoEfectivo === 'POR_VENCER') ?? lista.find(c => c.estadoEfectivo === 'VENCIDO');
  });

  // --- Pagos ---
  protected readonly formPagoAbierto = signal(false);
  protected readonly errorPago = signal<string | null>(null);
  protected readonly formPago = this.fb.nonNullable.group({
    periodo: [periodoDe(new Date()), Validators.required],
    concepto: ['BONO' as PagoPersonal['concepto'], Validators.required],
    monto: [0, [Validators.required, Validators.min(0.01)]],
    descripcion: ['']
  });

  // --- Un solo contrato por persona: si ya tiene uno, se renueva ---
  /** El contrato que rige (o está por iniciar): mientras exista no se crea otro. */
  protected readonly contratoVigente = computed(() => contratoQueImpideOtro(this.contratos()));
  /** El último contrato, si se puede renovar (no rescindido y con fecha de fin). */
  protected readonly renovable = computed(() => contratoRenovable(this.contratos()));
  protected readonly renovando = signal<Contrato | null>(null);
  protected readonly errorRenovar = signal<string | null>(null);
  protected readonly formRenovar = this.fb.nonNullable.group({
    tipo: ['PLAZO_FIJO' as TipoContrato, Validators.required],
    cargo: [''],
    fechaFin: [''],
    remuneracion: [0, [Validators.required, Validators.min(0.01)]],
    observaciones: ['']
  });
  private readonly vistaRenovar = signal(this.formRenovar.getRawValue());
  protected readonly esIndefinidoRenovar = computed(() => this.vistaRenovar().tipo === 'INDEFINIDO');
  /** El contrato renovado empieza el día siguiente al fin del anterior. */
  protected readonly inicioRenovacion = computed(() => {
    const c = this.renovando();
    return c?.fechaFin ? diaSiguiente(c.fechaFin) : '';
  });
  protected readonly renovacionLista = computed(() => {
    const v = this.vistaRenovar();
    const fin = /^\d{4}-\d{2}-\d{2}$/.test(v.fechaFin) ? v.fechaFin : '';
    return Number(v.remuneracion) > 0 && (v.tipo === 'INDEFINIDO' || (!!fin && fin >= this.inicioRenovacion()));
  });
  protected readonly resumenRenovacion = computed(() => {
    const v = this.vistaRenovar();
    const inicio = this.inicioRenovacion();
    if (!inicio) return '';
    const fin = /^\d{4}-\d{2}-\d{2}$/.test(v.fechaFin) ? v.fechaFin : '';
    const indef = v.tipo === 'INDEFINIDO';
    const hasta = indef ? 'sin fin' : fin ? (fin >= inicio ? fechaCorta(fin) : 'la fecha de fin es anterior al inicio') : 'elige la fecha de fin';
    const dur = indef ? 'Indefinido' : fin && fin >= inicio ? duracionContrato(inicio, fin) : '';
    return `Nuevo contrato: ${fechaCorta(inicio)} → ${hasta}${dur ? ' · ' + dur : ''} · ${soles(Number(v.remuneracion) || 0)} al mes`;
  });
  /** Si cambia el sueldo respecto al contrato que se renueva: «Antes S/ 1,500.00 · +S/ 200.00». */
  protected readonly cambioSueldo = computed(() => {
    const ant = this.renovando();
    const nuevo = Number(this.vistaRenovar().remuneracion);
    if (!ant || !Number.isFinite(nuevo) || Math.abs(nuevo - ant.remuneracion) < 0.005) return '';
    const dif = Math.round((nuevo - ant.remuneracion) * 100) / 100;
    return `Antes ${soles(ant.remuneracion)} · ${dif > 0 ? '+' : '−'}${soles(Math.abs(dif))}`;
  });

  // --- Cuentas para depósito ---
  protected readonly formCuentaAbierto = signal(false);
  protected readonly editandoCuenta = signal<CuentaDeposito | null>(null);
  protected readonly errorCuenta = signal<string | null>(null);
  protected readonly formCuenta = this.fb.nonNullable.group({
    banco: ['BCP'],
    tipo: ['AHORROS' as TipoCuenta],
    numero: [''],
    cci: [''],
    titular: ['', Validators.required],
    principal: [true]
  });
  private readonly vistaCuenta = signal(this.formCuenta.getRawValue());
  protected readonly esBilleteraCuenta = computed(() => this.vistaCuenta().tipo === 'BILLETERA');
  protected readonly erroresCuenta = computed(() => {
    const v = this.vistaCuenta();
    return validarCuenta(v.banco, v.tipo, v.numero, v.cci);
  });
  protected readonly cuentaValida = computed(() => {
    const e = this.erroresCuenta();
    return !e.tipo && !e.numero && !e.cci && this.vistaCuenta().titular.trim().length > 0;
  });

  constructor() {
    this.formContrato.controls.tipo.valueChanges.subscribe(t => {
      this.tipoElegido.set(t);
      if (t === 'INDEFINIDO') this.formContrato.controls.fechaFin.setValue('');
    });
    this.formRenovar.valueChanges.subscribe(() => this.vistaRenovar.set(this.formRenovar.getRawValue()));
    this.formRenovar.controls.tipo.valueChanges.subscribe(t => { if (t === 'INDEFINIDO') this.formRenovar.controls.fechaFin.setValue(''); });
    this.formCuenta.valueChanges.subscribe(() => this.vistaCuenta.set(this.formCuenta.getRawValue()));
    // Yape y Plin son billeteras: al elegirlos el tipo pasa a «Billetera» (sin CCI); y al revés, «Billetera» se queda en Yape o Plin.
    this.formCuenta.controls.banco.valueChanges.subscribe(b => {
      const t = this.formCuenta.controls.tipo;
      if (esBilletera(b)) { t.setValue('BILLETERA'); this.formCuenta.controls.cci.setValue(''); }
      else if (t.value === 'BILLETERA') t.setValue('AHORROS');
    });
    this.formCuenta.controls.tipo.valueChanges.subscribe(t => {
      const b = this.formCuenta.controls.banco;
      if (t === 'BILLETERA' && !esBilletera(b.value)) b.setValue('YAPE');
      if (t === 'BILLETERA') this.formCuenta.controls.cci.setValue('');
    });
  }

  ngOnInit(): void {
    this.pestana.set(this.pestanaInicial());
    this.recargar();
  }

  private recargar(): void {
    const id = this.persona().id;
    this.cargando.set(true);
    this.api.contratos(id).subscribe({
      next: c => this.contratos.set(c),
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar los contratos.'))
    });
    this.api.pagosDe(id).subscribe({
      next: p => { this.pagos.set(p); this.cargando.set(false); },
      error: e => { this.cargando.set(false); this.avisos.error(mensajeError(e, 'No se pudieron cargar los pagos.')); }
    });
    this.api.cuentas(id).subscribe({
      next: c => this.cuentas.set(c),
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar las cuentas de depósito.'))
    });
  }

  // ---------- Renovar ----------
  protected abrirRenovar(c: Contrato): void {
    this.formContratoAbierto.set(false);
    this.rescindiendo.set(null);
    this.errorRenovar.set(null);
    this.formRenovar.reset({ tipo: c.tipo, cargo: c.cargo ?? this.persona().cargo ?? '', fechaFin: '', remuneracion: c.remuneracion, observaciones: '' });
    this.renovando.set(c);
  }

  /** Atajos para el nuevo fin, contando desde el inicio del contrato renovado. */
  protected finRenovacion(meses: number | 'anio'): void {
    const inicio = this.inicioRenovacion();
    if (!inicio) return;
    this.formRenovar.controls.fechaFin.setValue(meses === 'anio' ? finDeAnio(inicio) : finPorMeses(inicio, meses));
  }

  protected guardarRenovacion(): void {
    const ant = this.renovando();
    if (!ant || !this.renovacionLista()) {
      this.errorRenovar.set('Completa el nuevo fin y el sueldo.');
      return;
    }
    const v = this.formRenovar.getRawValue();
    const body: RenovarRequest = {
      tipo: v.tipo, cargo: v.cargo.trim() || undefined, fechaFin: v.tipo === 'INDEFINIDO' ? undefined : v.fechaFin,
      remuneracion: Number(v.remuneracion), observaciones: v.observaciones.trim() || undefined
    };
    this.guardando.set(true);
    this.errorRenovar.set(null);
    this.api.renovar(ant.id, body).subscribe({
      next: nuevo => {
        this.guardando.set(false);
        this.renovando.set(null);
        this.avisos.success(`Contrato renovado: el nuevo empieza el ${fechaCorta(nuevo.fechaInicio)}.`);
        this.recargar();
      },
      error: err => { this.guardando.set(false); this.errorRenovar.set(mensajeError(err)); }
    });
  }

  // ---------- Cuentas para depósito ----------
  protected nuevaCuenta(): void {
    const p = this.persona();
    this.editandoCuenta.set(null);
    this.errorCuenta.set(null);
    this.formCuenta.reset({ banco: 'BCP', tipo: 'AHORROS', numero: '', cci: '', titular: `${p.nombres} ${p.apellidos}`, principal: this.cuentas().length === 0 });
    this.formCuentaAbierto.set(true);
  }

  protected editarCuenta(c: CuentaDeposito): void {
    this.editandoCuenta.set(c);
    this.errorCuenta.set(null);
    this.formCuenta.reset({ banco: c.banco, tipo: c.tipo, numero: c.numero, cci: c.cci ?? '', titular: c.titular, principal: c.principal });
    this.formCuentaAbierto.set(true);
  }

  protected guardarCuenta(): void {
    if (!this.cuentaValida()) {
      this.formCuenta.markAllAsTouched();
      this.formCuenta.controls.numero.markAsDirty();
      this.formCuenta.controls.cci.markAsDirty();
      return;
    }
    const v = this.formCuenta.getRawValue();
    const cci = soloDigitos(v.cci);
    const body: CuentaRequest = {
      personalId: this.persona().id, banco: v.banco, tipo: v.tipo, numero: soloDigitos(v.numero), cci: v.tipo === 'BILLETERA' || !cci ? undefined : cci,
      titular: v.titular.trim(), principal: v.principal
    };
    const e = this.editandoCuenta();
    this.guardando.set(true);
    this.errorCuenta.set(null);
    (e ? this.api.actualizarCuenta(e.id, body) : this.api.agregarCuenta(body)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.formCuentaAbierto.set(false);
        this.avisos.success(e ? 'Cuenta actualizada.' : 'Cuenta agregada.');
        this.recargar();
      },
      error: err => { this.guardando.set(false); this.errorCuenta.set(mensajeError(err)); }
    });
  }

  protected hacerPrincipal(c: CuentaDeposito): void {
    this.api.cuentaPrincipal(c.id).subscribe({
      next: () => { this.avisos.success(`${etiquetaBanco(c.banco)} es ahora la cuenta principal.`); this.recargar(); },
      error: err => this.avisos.error(mensajeError(err))
    });
  }

  protected async quitarCuenta(c: CuentaDeposito): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Quitar la cuenta ${etiquetaBanco(c.banco)} ${c.numero}?`, 'Quitar', true))) return;
    this.api.quitarCuenta(c.id).subscribe({
      next: () => { this.avisos.success('Cuenta quitada.'); this.recargar(); },
      error: err => this.avisos.error(mensajeError(err))
    });
  }

  protected copiar(texto: string): void {
    navigator.clipboard?.writeText(texto).then(() => this.avisos.success('Copiado.'), () => this.avisos.warning('No se pudo copiar: selecciónalo y cópialo a mano.'));
  }

  protected tipoDe(c: Contrato): string { return etiquetaTipo(c.tipo); }
  protected claseEstado(c: Contrato): string { return claseEstadoContrato(c.estadoEfectivo); }
  protected etiquetaEstado(c: Contrato): string { return etiquetaEstadoContrato(c.estadoEfectivo); }
  protected diasFin(c: Contrato): number { return c.fechaFin ? diasHasta(c.fechaFin) : 0; }
  protected etiquetaConcepto(p: PagoPersonal): string { return etiquetaConcepto(p.concepto); }
  protected periodoOk(): boolean { return periodoValido(this.formPago.controls.periodo.value); }

  // ---------- Contratos ----------
  protected nuevoContrato(): void {
    const anterior = this.contratos()[0];
    this.editandoContrato.set(null);
    this.errorContrato.set(null);
    this.rescindiendo.set(null);
    this.tipoElegido.set('PLAZO_FIJO');
    this.formContrato.reset({ tipo: 'PLAZO_FIJO', cargo: this.persona().cargo ?? '', fechaInicio: '', fechaFin: '', remuneracion: anterior?.remuneracion ?? 0, observaciones: '' });
    this.formContratoAbierto.set(true);
  }

  protected editarContrato(c: Contrato): void {
    this.editandoContrato.set(c);
    this.errorContrato.set(null);
    this.rescindiendo.set(null);
    this.tipoElegido.set(c.tipo);
    this.formContrato.reset({ tipo: c.tipo, cargo: c.cargo ?? '', fechaInicio: c.fechaInicio, fechaFin: c.fechaFin ?? '', remuneracion: c.remuneracion, observaciones: c.observaciones ?? '' });
    this.formContratoAbierto.set(true);
  }

  protected guardarContrato(): void {
    if (this.formContrato.invalid) {
      this.formContrato.markAllAsTouched();
      return;
    }
    const v = this.formContrato.getRawValue();
    if (v.tipo !== 'INDEFINIDO' && !v.fechaFin) return this.errorContrato.set('Este tipo de contrato necesita fecha de fin.');
    if (v.fechaFin && v.fechaFin < v.fechaInicio) return this.errorContrato.set('La fecha de fin no puede ser anterior al inicio.');
    const body: ContratoRequest = {
      personalId: this.persona().id, tipo: v.tipo, cargo: v.cargo.trim() || undefined, fechaInicio: v.fechaInicio,
      fechaFin: v.tipo === 'INDEFINIDO' ? undefined : v.fechaFin || undefined, remuneracion: Number(v.remuneracion),
      observaciones: v.observaciones.trim() || undefined
    };
    const e = this.editandoContrato();
    this.guardando.set(true);
    this.errorContrato.set(null);
    (e ? this.api.actualizarContrato(e.id, body) : this.api.crearContrato(body)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.formContratoAbierto.set(false);
        this.avisos.success(e ? 'Contrato actualizado.' : 'Contrato creado.');
        this.recargar();
      },
      error: err => { this.guardando.set(false); this.errorContrato.set(mensajeError(err)); }
    });
  }

  protected pedirRescision(c: Contrato): void {
    this.formContratoAbierto.set(false);
    // Un contrato que aún no empezó (p. ej. una renovación hecha por error) se cancela: no lleva fecha, el servidor lo deja sin llegar a regir.
    this.fechaRescision.setValue(hoyLocal());
    this.motivoRescision.setValue('');
    this.rescindiendo.set(c);
  }

  protected async confirmarRescision(c: Contrato): Promise<void> {
    if (!(await this.confirmacion.confirmar('¿Rescindir este contrato? No se podrá modificar después.', 'Rescindir', true))) return;
    this.guardando.set(true);
    // Un contrato por iniciar se cancela sin fecha (el servidor lo rescinde el día anterior a su inicio).
    const fecha = c.estadoEfectivo === 'POR_INICIAR' ? undefined : this.fechaRescision.value || undefined;
    this.api.rescindir(c.id, fecha, this.motivoRescision.value.trim() || undefined).subscribe({
      next: () => { this.guardando.set(false); this.rescindiendo.set(null); this.avisos.success('Contrato rescindido.'); this.recargar(); },
      error: err => { this.guardando.set(false); this.avisos.error(mensajeError(err)); }
    });
  }

  // ---------- Pagos ----------
  protected nuevoPago(): void {
    this.errorPago.set(null);
    const vigente = this.contratos().find(c => c.estadoEfectivo === 'VIGENTE' || c.estadoEfectivo === 'POR_VENCER');
    this.formPago.reset({ periodo: periodoDe(new Date()), concepto: vigente ? 'SUELDO' : 'BONO', monto: vigente?.remuneracion ?? 0, descripcion: '' });
    this.formPagoAbierto.set(true);
  }

  protected guardarPago(): void {
    if (this.formPago.invalid || !this.periodoOk()) {
      this.formPago.markAllAsTouched();
      return;
    }
    const v = this.formPago.getRawValue();
    const vigente = this.contratos().find(c => c.estadoEfectivo === 'VIGENTE' || c.estadoEfectivo === 'POR_VENCER');
    this.guardando.set(true);
    this.errorPago.set(null);
    this.api.registrarPago({
      personalId: this.persona().id, contratoId: vigente?.id, periodo: v.periodo, concepto: v.concepto,
      monto: Number(v.monto), descripcion: v.descripcion.trim() || undefined
    }).subscribe({
      next: () => { this.guardando.set(false); this.formPagoAbierto.set(false); this.avisos.success('Pago registrado.'); this.recargar(); },
      error: err => { this.guardando.set(false); this.errorPago.set(mensajeError(err)); }
    });
  }

  protected async eliminarPago(p: PagoPersonal): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Quitar este pago de ${nombrePeriodo(p.periodo)}?`, 'Quitar', true))) return;
    this.api.eliminarPago(p.id).subscribe({
      next: () => { this.avisos.success('Pago quitado.'); this.recargar(); },
      error: err => this.avisos.error(mensajeError(err))
    });
  }
}
