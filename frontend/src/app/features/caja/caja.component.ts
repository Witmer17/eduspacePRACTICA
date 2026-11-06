import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AlumnoResumen } from '../../core/models/alumno.model';
import { Colegio } from '../../core/models/planificacion.model';
import { CreditoAlumno, Cuota, DescuentoDelAlumno, EstadoCuenta, EstadoMatriculaPago, MatriculaPorPagar, Pago } from '../../core/models/cobro.model';
import { DetalleMoroso } from '../../core/models/pago.model';
import { AlumnoService } from '../../core/services/alumno.service';
import { AuthService } from '../../core/services/auth.service';
import { CobroService } from '../../core/services/cobro.service';
import { NombresAlumnoService } from '../../core/services/nombres-alumno.service';
import { NotificationService } from '../../core/services/notification.service';
import { PagoConfigService } from '../../core/services/pago-config.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { uuid } from '../../core/utils/uuid';
import { BuscadorAlumnoComponent } from '../../shared/components/buscador-alumno/buscador-alumno.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { puedeCobrarAhora } from '../pagos/cuentas/credito';
import { montosSugeridos } from './monto-sugerido';
import { ReciboVista, armarRecibo, descuentoEnCuotas, etiquetaDescuento, lineaColegio } from './recibo';

const PAGABLES = ['PENDIENTE', 'VENCIDA', 'PARCIAL'];
const MAX_MOROSOS = 8;
const r2 = (n: number): number => Math.round(n * 100) / 100;

/** Cuánto del efectivo recibido cubre cada cuota (de la más antigua a la más nueva). */
interface Reparto {
  cuota: Cuota;
  monto: number;
}

/**
 * Inicio de caja, lo más simple posible: se elige al alumno y se anota el efectivo que entrega.
 *  - «Recibir pago»: el dinero se aplica solo a sus cuotas pendientes, de la más antigua a la más nueva.
 *  - «Agregar dinero a su cuenta»: queda a favor del alumno y se descuenta de las pensiones cuando vencen.
 * La caja se abre sola la primera vez (el servidor la pide para recibir efectivo), así que no hay apertura ni cierre que atender.
 * Abajo: los pagos de apoderados por aprobar y los morosos (a las familias les llega el aviso solo).
 */
@Component({
  selector: 'app-caja',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, BuscadorAlumnoComponent, ModalComponent, PageHeaderComponent],
  templateUrl: './caja.component.html',
  styles: `
    .dos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: start; }
    .bloque { display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px; }
    .quien { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 6px 16px; }
    .atajos { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; margin-bottom: 12px; }
    .chip { padding: 6px 12px; border: 1.5px solid var(--line-2); border-radius: 999px; background: var(--card); font: inherit; font-size: .85rem; font-weight: 600; color: var(--ink-2); cursor: pointer; }
    .chip:hover { border-color: var(--primary); }
    .chip.on { border-color: var(--primary); background: var(--primary-soft); color: var(--primary); }
    .monto-input { font-size: 1.6rem; font-weight: 700; max-width: 220px; min-height: 52px; }
    .reparto { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; font-size: .9rem; }
    .reparto li { display: flex; justify-content: space-between; gap: 12px; }
    .vacio-card { padding: 22px; text-align: center; color: var(--ink-2); border: 2px dashed var(--line-2); border-radius: 14px; }
    .credito-linea { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 10px 14px; border-radius: 12px; background: var(--ok-soft); }
    .fila { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 14px; align-items: center; padding: 10px 0; border-top: 1px solid var(--line); }
    .fila:first-of-type { border-top: 0; }
    .fila .debe { font-variant-numeric: tabular-nums; font-weight: 700; color: var(--danger); }
    .nombre { display: flex; flex-direction: column; min-width: 0; }
    .nombre strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .destacada { border: 1.5px solid var(--violet, #6b4fd8); }
    .por-aprobar { display: flex; flex-direction: column; gap: 6px; padding: 12px 0; border-top: 1px solid var(--line); }
    .por-aprobar:first-of-type { border-top: 0; }
    .pa-cab { display: flex; justify-content: space-between; gap: 10px; }
    .pa-cuotas { margin: 0; padding-left: 18px; font-size: .85rem; color: var(--ink-2); }
    .ficha { display: grid; gap: 14px; }
    .ficha-datos { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px 18px; margin: 0; }
    .ficha-datos div { display: flex; flex-direction: column; }
    .ficha-datos dt { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .ficha-datos dd { margin: 0; font-weight: 600; }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
    .cifra { display: flex; flex-direction: column; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .cifra span { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .cifra strong { font-size: 1.15rem; font-variant-numeric: tabular-nums; }
    .barra-recibo { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
    .barra-recibo .espacio { flex: 1; }
    /* El recibo: papel blanco; al imprimir solo sale esta hoja (ver styles.css) */
    .hoja-recibo { width: min(100%, 720px); margin: 0 auto 24px; padding: 40px 48px; background: #fff; color: #1a1f2e; border: 1px solid var(--line); border-radius: 6px; box-shadow: 0 10px 30px -18px rgb(0 0 0 / .35); font-family: Georgia, 'Times New Roman', serif; line-height: 1.5; }
    .rc-cab { display: flex; align-items: center; gap: 14px; padding-bottom: 12px; border-bottom: 2px solid #1a1f2e; }
    .rc-cab img { width: 56px; height: 56px; }
    .rc-cab div { display: flex; flex-direction: column; }
    .rc-cab small, .rc-cab em { font-size: .78rem; color: #4a5266; }
    .rc-titulo { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin: 18px 0 12px; }
    .rc-titulo h1 { margin: 0; font-size: 1.3rem; text-transform: uppercase; letter-spacing: .08em; }
    .rc-datos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 24px; margin: 0 0 14px; }
    .rc-datos div { display: flex; flex-direction: column; padding: 3px 0; border-bottom: 1px solid #e4e8f1; }
    .rc-datos dt { font-size: .7rem; color: #4a5266; text-transform: uppercase; letter-spacing: .05em; }
    .rc-datos dd { margin: 0; font-weight: 600; }
    .rc-tabla { width: 100%; border-collapse: collapse; font-size: .85rem; margin-bottom: 12px; }
    .rc-tabla th, .rc-tabla td { padding: 6px 8px; border: 1px solid #cfd5e3; text-align: left; }
    .rc-tabla th { background: #f1f4fa; font-size: .72rem; text-transform: uppercase; letter-spacing: .04em; }
    .rc-tabla .num { text-align: right; font-variant-numeric: tabular-nums; }
    .rc-total { display: flex; justify-content: flex-end; align-items: baseline; gap: 16px; padding-top: 8px; border-top: 2px solid #1a1f2e; font-size: 1.2rem; }
    .rc-pie { margin-top: 36px; display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; font-size: .8rem; color: #4a5266; }
    .rc-firma { width: 200px; text-align: center; }
    .rc-firma .linea { display: block; border-top: 1.5px solid #1a1f2e; margin-bottom: 4px; }
    @media (max-width: 720px) { .hoja-recibo { padding: 22px 16px; } .rc-datos { grid-template-columns: 1fr; } }
    @media (max-width: 900px) { .dos { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class CajaComponent implements OnInit {
  private readonly api = inject(CobroService);
  private readonly config = inject(PagoConfigService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  protected readonly nombres = inject(NombresAlumnoService);
  private readonly alumnosApi = inject(AlumnoService);
  private readonly plan = inject(PlanificacionService);
  private readonly cajero = inject(AuthService).currentUser;

  // --- el alumno ---
  protected readonly alumno = signal<AlumnoResumen | null>(null);
  protected readonly cuenta = signal<EstadoCuenta | null>(null);
  protected readonly credito = signal<CreditoAlumno | null>(null);
  /** Descuentos que tiene asignados el alumno (por nombre) y lo que ya llevan descontado sus cuotas. */
  protected readonly descuentos = signal<DescuentoDelAlumno[]>([]);
  protected readonly etiquetaDescuento = etiquetaDescuento;
  protected readonly descuentoAplicado = computed(() => descuentoEnCuotas(this.cuenta()?.cuotas ?? []));
  protected readonly cargandoCuenta = signal(false);
  protected readonly pagables = computed(() => (this.cuenta()?.cuotas ?? []).filter(c => PAGABLES.includes(c.estado)));
  protected readonly totalPendiente = computed(() => r2(this.pagables().reduce((s, c) => s + c.saldo, 0)));
  /** Lo que Caja sugiere cobrar: lo que debe ahora (vencido, hoy y matrícula), todo lo pendiente o solo la próxima cuota. */
  protected readonly sugeridos = computed(() => montosSugeridos(this.cuenta()?.cuotas ?? []));
  protected readonly montoActual = computed(() => r2(this.montoEfectivo()));
  protected readonly puedeUsarCredito = computed(() => (this.credito() ? puedeCobrarAhora(this.credito()!) : false));

  // --- recibir pago en efectivo ---
  protected readonly efectivo = this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]);
  private readonly montoEfectivo = signal(0);
  protected readonly cobrando = signal(false);
  protected readonly errorCobro = signal<string | null>(null);
  protected readonly recibo = signal<ReciboVista | null>(null);
  protected readonly colegio = signal<Colegio | null>(null);
  protected readonly lineaColegio = lineaColegio;
  /** Una clave por intento: pulsar «Registrar» dos veces no cobra dos veces. */
  private claveCobro = uuid();
  /** A qué cuotas va el dinero y si sobra algo. */
  protected readonly reparto = computed(() => {
    let resto = r2(this.montoEfectivo());
    const lista: Reparto[] = [];
    for (const cuota of this.pagables()) {
      if (resto <= 0) break;
      const monto = r2(Math.min(resto, cuota.saldo));
      lista.push({ cuota, monto });
      resto = r2(resto - monto);
    }
    return { lista, sobrante: resto };
  });

  // --- agregar dinero a la cuenta ---
  protected readonly aporte = this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]);
  protected readonly aportando = signal(false);
  protected readonly errorAporte = signal<string | null>(null);
  private claveAporte = uuid();

  // --- pagos de apoderados por aprobar ---
  protected readonly porAprobar = signal<Pago[]>([]);
  protected readonly resolviendo = signal<number | null>(null);
  protected readonly rechazando = signal<Pago | null>(null);
  protected readonly motivoRechazo = this.fb.nonNullable.control('');
  protected readonly errorRechazo = signal<string | null>(null);

  // --- matrícula del alumno elegido: detalle (grado, sección, forma de pago) y confirmación ---
  protected readonly matricula = signal<EstadoMatriculaPago | null>(null);
  protected readonly confirmando = signal(false);
  protected readonly estadoMatricula = (e: string): string =>
    ({ PRE_MATRICULA: 'Pre-matrícula', POR_APROBAR: 'Por aprobar', MATRICULADO: 'Matrícula confirmada', RETIRADO: 'Retirado', ANULADO: 'Anulada', TRASLADADO: 'Trasladado' } as Record<string, string>)[e] ?? e;

  // --- matrículas por pagar: alumnos con pre-matrícula que aún deben la matrícula ---
  protected readonly matriculasPorPagar = signal<MatriculaPorPagar[]>([]);
  protected readonly verMatriculas = computed(() => this.matriculasPorPagar().slice(0, MAX_MOROSOS));

  // --- morosos ---
  protected readonly morosos = signal<DetalleMoroso[]>([]);
  protected readonly totalMorosos = signal(0);
  protected readonly deudaMorosos = signal(0);
  protected readonly cargandoMorosos = signal(true);
  protected readonly verMorosos = computed(() => this.morosos().slice(0, MAX_MOROSOS));

  private cajaLista = false;

  constructor() {
    this.efectivo.valueChanges.subscribe(v => this.montoEfectivo.set(Number(v) || 0));
  }

  ngOnInit(): void {
    this.cargarPorAprobar();
    this.cargarMorosos();
    this.cargarMatriculasPorPagar();
    this.plan.colegio().pipe(catchError(() => of(null))).subscribe(c => this.colegio.set(c));
  }

  /** El servidor pide una caja abierta para recibir efectivo: se abre sola (con S/ 0) la primera vez, sin que la persona tenga que saberlo. */
  private asegurarCaja(): Observable<void> {
    if (this.cajaLista) return of(undefined);
    return this.api.cajaActual().pipe(
      catchError((e: HttpErrorResponse) => (e.status === 404 ? this.api.abrirCaja(0) : throwError(() => e))),
      tap(() => (this.cajaLista = true)),
      map(() => undefined)
    );
  }

  // ---------- Elegir alumno ----------
  protected elegirAlumno(a: AlumnoResumen | null): void {
    this.limpiar();
    this.alumno.set(a);
    if (a) this.cargarCuenta(a.id);
  }

  /** Desde la lista de morosos: se abre la cuenta de ese alumno para cobrarle. */
  protected cobrarA(m: DetalleMoroso): void {
    this.limpiar();
    this.alumno.set({ id: m.alumnoId, nombreCompleto: m.alumnoNombre } as AlumnoResumen);
    this.cargarCuenta(m.alumnoId);
    // Código y documento: se completan buscándolo por su nombre (caja solo recibe el resumen del alumno).
    this.alumnosApi.listar(m.alumnoNombre, '', 0, 5).pipe(catchError(() => of(null))).subscribe(p => {
      const f = p?.contenido.find(x => x.id === m.alumnoId);
      if (f && this.alumno()?.id === f.id) this.alumno.set(f);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private limpiar(): void {
    this.alumno.set(null);
    this.cuenta.set(null);
    this.credito.set(null);
    this.descuentos.set([]);
    this.matricula.set(null);
    this.efectivo.setValue(0);
    this.aporte.setValue(0);
    this.errorCobro.set(null);
    this.errorAporte.set(null);
    this.claveCobro = uuid();
    this.claveAporte = uuid();
  }

  private cargarCuenta(alumnoId: number): void {
    this.cargandoCuenta.set(true);
    this.api.estadoCuenta(alumnoId).subscribe({
      // El efectivo ya viene con lo que debe ahora: quien cobra no tiene que escribirlo (puede cambiarlo si pagan menos).
      next: c => { this.cuenta.set(c); this.cargandoCuenta.set(false); this.efectivo.setValue(this.sugeridos().ahora); },
      error: e => { this.cargandoCuenta.set(false); this.avisos.error(mensajeError(e, 'No se pudo cargar la cuenta del alumno.')); }
    });
    this.api.credito(alumnoId).subscribe({ next: c => this.credito.set(c), error: () => this.credito.set(null) });
    this.api.descuentosDe(alumnoId).subscribe({ next: d => this.descuentos.set(d), error: () => this.descuentos.set([]) });
    this.cargarMatricula(alumnoId);
  }

  /** La matrícula del alumno (si la tiene): grado, sección, forma de pago y si ya se puede confirmar. Sin matrícula simplemente no se muestra. */
  private cargarMatricula(alumnoId: number): void {
    this.api.matriculaDe(alumnoId).subscribe({
      next: m => { if (this.alumno()?.id === alumnoId) this.matricula.set(m); },
      error: () => this.matricula.set(null)
    });
  }

  /** Confirma la matrícula: el servidor valida todo (pagada o con el crédito suficiente, sin descuento en revisión) y la genera. */
  protected confirmarMatricula(): void {
    const a = this.alumno();
    if (!a || this.confirmando()) return;
    this.confirmando.set(true);
    this.api.generarMatricula(a.id).subscribe({
      next: m => {
        this.confirmando.set(false);
        this.matricula.set(m);
        this.avisos.success(`La matrícula de ${a.nombreCompleto} quedó confirmada.`);
        this.recargar();
      },
      error: e => { this.confirmando.set(false); this.avisos.error(mensajeError(e, 'No se pudo confirmar la matrícula.')); }
    });
  }

  private recargar(): void {
    const a = this.alumno();
    if (a) this.cargarCuenta(a.id);
    this.cargarMorosos();
    this.cargarMatriculasPorPagar();
  }

  // ---------- Recibir pago ----------
  protected cobrar(): void {
    const a = this.alumno();
    const { lista, sobrante } = this.reparto();
    const total = r2(this.montoEfectivo());
    if (!a || !lista.length || sobrante > 0 || total <= 0) return;
    const cuotasAntes = [...this.pagables()];
    this.cobrando.set(true);
    this.errorCobro.set(null);
    this.asegurarCaja()
      .pipe(switchMap(() => this.api.registrar({
        alumnoId: a.id,
        pagadorNombre: this.cuenta()?.responsableNombre || undefined,
        montoTotal: total,
        medio: 'EFECTIVO',
        idempotencyKey: this.claveCobro,
        tipoComprobante: 'RECIBO',
        detalles: lista.map(r => ({ cuotaId: r.cuota.id, montoAplicado: r.monto }))
      })))
      .subscribe({
        next: p => {
          this.cobrando.set(false);
          this.recibo.set(armarRecibo(p, cuotasAntes, {
            alumno: this.cuenta()?.alumnoNombre ?? a.nombreCompleto,
            codigo: a.codigo,
            documento: a.numeroDocumento ? `${a.tipoDocumento ?? 'DNI'} ${a.numeroDocumento}` : undefined,
            responsable: this.cuenta()?.responsableNombre || undefined,
            cajero: this.cajero()?.username ?? ''
          }));
          this.avisos.success('Pago registrado.');
          queueMicrotask(() => document.querySelector('.hoja-recibo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
          this.efectivo.setValue(0);
          this.claveCobro = uuid();
          this.recargar();
        },
        error: e => { this.cobrando.set(false); this.errorCobro.set(mensajeError(e, 'No se pudo registrar el pago.')); }
      });
  }

  /** Un atajo de monto: cobrar todo lo pendiente o solo la próxima cuota. */
  protected usarMonto(monto: number): void {
    this.efectivo.setValue(monto);
  }

  protected cerrarRecibo(): void {
    this.recibo.set(null);
  }

  protected imprimir(): void {
    window.print();
  }

  // ---------- Agregar dinero a la cuenta ----------
  protected agregar(): void {
    const a = this.alumno();
    const monto = r2(Number(this.aporte.value) || 0);
    if (!a || monto <= 0) return;
    this.aportando.set(true);
    this.errorAporte.set(null);
    this.asegurarCaja()
      .pipe(switchMap(() => this.api.depositarCredito(a.id, { monto, medio: 'EFECTIVO', idempotencyKey: this.claveAporte })))
      .subscribe({
        next: r => {
          this.aportando.set(false);
          this.avisos.success(r.aplicado > 0
            ? `Dinero agregado a la cuenta. Se usaron S/ ${r.aplicado.toFixed(2)} para pagar lo vencido.`
            : 'Dinero agregado a la cuenta del alumno.');
          this.aporte.setValue(0);
          this.claveAporte = uuid();
          this.recargar();
        },
        error: e => { this.aportando.set(false); this.errorAporte.set(mensajeError(e, 'No se pudo agregar el dinero.')); }
      });
  }

  protected usarCredito(): void {
    const a = this.alumno();
    if (!a) return;
    this.api.cobrarDelCredito(a.id).subscribe({
      next: r => { this.avisos.success(r.aplicado > 0 ? `Se pagaron S/ ${r.aplicado.toFixed(2)} de lo vencido con su cuenta.` : 'No había nada vencido que pagar.'); this.recargar(); },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo usar el dinero de la cuenta.'))
    });
  }

  // ---------- Matrículas por pagar ----------
  private cargarMatriculasPorPagar(): void {
    this.api.matriculasPorPagar().subscribe({ next: l => this.matriculasPorPagar.set(l), error: () => this.matriculasPorPagar.set([]) });
  }

  /** Desde la lista de matrículas por pagar: se abre la cuenta del alumno para cobrarle (la matrícula entra en sus cuotas pendientes). */
  protected cobrarMatricula(m: MatriculaPorPagar): void {
    this.limpiar();
    this.alumno.set({ id: m.alumnoId, nombreCompleto: m.alumnoNombre } as AlumnoResumen);
    this.cargarCuenta(m.alumnoId);
    this.alumnosApi.listar(m.alumnoNombre, '', 0, 5).pipe(catchError(() => of(null))).subscribe(p => {
      const f = p?.contenido.find(x => x.id === m.alumnoId);
      if (f && this.alumno()?.id === f.id) this.alumno.set(f);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------- Morosos ----------
  private cargarMorosos(): void {
    this.config.morosos().subscribe({
      next: m => {
        this.morosos.set([...m.listaMorosos].sort((a, b) => b.saldoTotalVencido - a.saldoTotalVencido));
        this.totalMorosos.set(m.totalAlumnosMorosos);
        this.deudaMorosos.set(m.totalDeudaAcumulada);
        this.cargandoMorosos.set(false);
      },
      error: () => { this.morosos.set([]); this.cargandoMorosos.set(false); }
    });
  }

  // ---------- Pagos de apoderados por aprobar ----------
  protected cargarPorAprobar(): void {
    this.api.porAprobar().subscribe({
      next: l => { this.porAprobar.set(l); this.nombres.cargar(l.map(p => p.alumnoId)); },
      error: () => this.porAprobar.set([])
    });
  }

  protected aprobar(p: Pago): void {
    this.resolviendo.set(p.id);
    this.api.aprobar(p.id).subscribe({
      next: r => {
        this.resolviendo.set(null);
        this.avisos.success(`Pago aprobado${r.comprobante ? ': ' + r.comprobante.numeroCompleto : ''}.`);
        this.cargarPorAprobar();
        this.cargarMorosos();
      },
      error: e => { this.resolviendo.set(null); this.avisos.error(mensajeError(e, 'No se pudo aprobar el pago.')); this.cargarPorAprobar(); }
    });
  }

  protected pedirRechazo(p: Pago): void {
    this.motivoRechazo.setValue('');
    this.errorRechazo.set(null);
    this.rechazando.set(p);
  }

  protected rechazar(p: Pago): void {
    const motivo = this.motivoRechazo.value.trim();
    if (!motivo) {
      this.errorRechazo.set('El motivo es obligatorio: el apoderado lo verá.');
      return;
    }
    this.resolviendo.set(p.id);
    this.api.rechazar(p.id, motivo).subscribe({
      next: () => { this.resolviendo.set(null); this.rechazando.set(null); this.avisos.success('Pago rechazado. El apoderado verá el motivo.'); this.cargarPorAprobar(); },
      error: e => { this.resolviendo.set(null); this.errorRechazo.set(mensajeError(e)); }
    });
  }
}
