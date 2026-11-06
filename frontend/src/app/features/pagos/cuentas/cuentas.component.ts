import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoResumen } from '../../../core/models/alumno.model';
import { CreditoAlumno, EstadoCuenta, EstadoCuota, MovimientoCredito } from '../../../core/models/cobro.model';
import { Descuento } from '../../../core/models/pago.model';
import { Anio } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { CobroService } from '../../../core/services/cobro.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PagoConfigService } from '../../../core/services/pago-config.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { BuscadorAlumnoComponent } from '../../../shared/components/buscador-alumno/buscador-alumno.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { etiquetaMovimiento, explicarCredito, puedeCobrarAhora, sePuedeAnular } from './credito';

const CLASE: Record<EstadoCuota, string> = { PENDIENTE: 'badge-warn', PARCIAL: 'badge-violet', PAGADA: 'badge-ok', VENCIDA: 'badge-danger', ANULADA: 'badge-gray' };

@Component({
  selector: 'app-cuentas',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, BuscadorAlumnoComponent, ModalComponent, PageHeaderComponent],
  templateUrl: './cuentas.component.html',
  styles: `
    .credito-cab { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap; margin-bottom: 12px; }
    .credito-acciones { display: flex; gap: 8px; flex-wrap: wrap; }
    .credito-cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-bottom: 12px; }
    .credito-cifras div { display: flex; flex-direction: column; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; }
    .credito-cifras strong { font-size: 1.25rem; }
    tr.anulado td { opacity: .55; text-decoration: line-through; }
    tr.anulado td:last-child, tr.anulado td:nth-child(2) { text-decoration: none; }
    .enlace { border: 0; background: none; padding: 0; font: inherit; color: var(--primary); text-decoration: underline; cursor: pointer; }
  `
})
export class CuentasComponent {
  private readonly api = inject(CobroService);
  private readonly config = inject(PagoConfigService);
  private readonly plan = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  /** Solo el ADMIN asigna descuentos; la secretaria consulta la cuenta. */
  protected readonly esAdmin = inject(AuthService).isAdmin;

  protected readonly alumno = signal<AlumnoResumen | null>(null);
  protected readonly cuenta = signal<EstadoCuenta | null>(null);
  protected readonly cargando = signal(false);

  protected readonly abierto = signal(false);
  protected readonly descuentos = signal<Descuento[]>([]);
  protected readonly anios = signal<Anio[]>([]);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    descuentoId: [0, [Validators.required, Validators.min(1)]],
    anioId: [0, [Validators.required, Validators.min(1)]],
    motivo: ['']
  });

  protected clase(e: EstadoCuota): string {
    return CLASE[e];
  }

  // --- Crédito del alumno: lo que se deposita suma y se cobra solo de las pensiones cuando vencen ---
  protected readonly credito = signal<CreditoAlumno | null>(null);
  protected readonly errorCredito = signal(false);
  protected readonly depositando = signal(false);
  protected readonly guardandoCredito = signal(false);
  protected readonly errorDeposito = signal<string | null>(null);
  protected readonly formDeposito = this.fb.nonNullable.group({
    monto: [0, [Validators.required, Validators.min(0.01), Validators.max(50000)]],
    medio: ['TRANSFERENCIA' as 'EFECTIVO' | 'TARJETA' | 'YAPE_PLIN' | 'TRANSFERENCIA', Validators.required],
    referencia: ['']
  });
  /** Clave que evita sumar dos veces el mismo depósito si se pulsa dos veces o se reintenta. */
  private claveDeposito = '';
  protected readonly paraAnular = signal<MovimientoCredito | null>(null);
  protected readonly motivoAnulacion = this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(200)]);

  protected readonly explicacion = (c: CreditoAlumno): string => explicarCredito(c);
  protected readonly etiqueta = etiquetaMovimiento;
  protected readonly puedeCobrarAhora = puedeCobrarAhora;
  protected readonly sePuedeAnular = sePuedeAnular;

  private cargarCredito(): void {
    const a = this.alumno();
    if (!a) return;
    this.errorCredito.set(false);
    this.api.credito(a.id).subscribe({
      next: c => this.credito.set(c),
      error: () => { this.credito.set(null); this.errorCredito.set(true); }
    });
  }

  protected abrirDeposito(): void {
    this.formDeposito.reset({ monto: 0, medio: 'TRANSFERENCIA', referencia: '' });
    this.claveDeposito = `dep-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    this.errorDeposito.set(null);
    this.depositando.set(true);
  }

  protected guardarDeposito(): void {
    const a = this.alumno();
    if (!a || this.formDeposito.invalid) { this.formDeposito.markAllAsTouched(); return; }
    const v = this.formDeposito.getRawValue();
    this.guardandoCredito.set(true);
    this.errorDeposito.set(null);
    this.api.depositarCredito(a.id, { monto: Math.round(Number(v.monto) * 100) / 100, medio: v.medio, referencia: v.referencia.trim() || undefined, idempotencyKey: this.claveDeposito }).subscribe({
      next: r => {
        this.guardandoCredito.set(false);
        this.depositando.set(false);
        this.avisos.success(r.aplicado > 0
          ? `Depósito registrado. Se cobraron S/ ${r.aplicado.toFixed(2)} de las pensiones vencidas; el crédito queda en S/ ${r.saldo.toFixed(2)}.`
          : `Depósito registrado. El crédito queda en S/ ${r.saldo.toFixed(2)}.`);
        this.cargar();
      },
      error: e => { this.guardandoCredito.set(false); this.errorDeposito.set(mensajeError(e)); }
    });
  }

  protected cobrarDelCredito(): void {
    const a = this.alumno();
    if (!a) return;
    this.guardandoCredito.set(true);
    this.api.cobrarDelCredito(a.id).subscribe({
      next: r => {
        this.guardandoCredito.set(false);
        this.avisos.success(r.aplicado > 0 ? `Se cobraron S/ ${r.aplicado.toFixed(2)} del crédito; queda S/ ${r.saldo.toFixed(2)}.` : 'No había nada por cobrar del crédito.');
        this.cargar();
      },
      error: e => { this.guardandoCredito.set(false); this.avisos.error(mensajeError(e)); }
    });
  }

  protected pedirAnular(m: MovimientoCredito): void {
    this.motivoAnulacion.reset('');
    this.errorDeposito.set(null);
    this.paraAnular.set(m);
  }

  protected anularDeposito(): void {
    const m = this.paraAnular();
    if (!m || this.motivoAnulacion.invalid) { this.motivoAnulacion.markAsTouched(); return; }
    this.guardandoCredito.set(true);
    this.api.anularDeposito(m.id, this.motivoAnulacion.value.trim()).subscribe({
      next: () => { this.guardandoCredito.set(false); this.paraAnular.set(null); this.avisos.success('Depósito anulado.'); this.cargar(); },
      error: e => { this.guardandoCredito.set(false); this.errorDeposito.set(mensajeError(e)); }
    });
  }

  protected elegir(a: AlumnoResumen | null): void {
    this.alumno.set(a);
    this.cuenta.set(null);
    this.credito.set(null);
    if (a) this.cargar();
  }

  private cargar(): void {
    const a = this.alumno();
    if (!a) return;
    this.cargando.set(true);
    this.cargarCredito();
    this.api.estadoCuenta(a.id).subscribe({
      next: c => {
        this.cuenta.set(c);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar la cuenta del alumno.'));
      }
    });
  }

  protected abrirDescuento(): void {
    this.errorForm.set(null);
    this.config.descuentos().subscribe(d => this.descuentos.set(d.filter(x => x.activo)));
    this.plan.anios().subscribe(a => {
      this.anios.set(a);
      this.form.reset({ descuentoId: 0, anioId: a.find(x => x.estado === 'ACTIVO')?.id ?? 0, motivo: '' });
    });
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  protected asignar(): void {
    const a = this.alumno();
    if (!a || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.guardando.set(true);
    this.api.asignarDescuento(a.id, v.descuentoId, v.anioId, v.motivo.trim() || undefined).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success('Descuento asignado. Se aplica a las cuotas pendientes que correspondan.');
        this.cerrar();
        this.cargar();
      },
      error: e => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(e));
      }
    });
  }
}
