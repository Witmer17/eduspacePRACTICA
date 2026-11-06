import { Component, OnInit, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PagoPersonal } from '../../core/models/rrhh.model';
import { NotificationService } from '../../core/services/notification.service';
import { PagoPersonalService } from '../../core/services/pago-personal.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { etiquetaConcepto, fechaCorta, nombrePeriodo, soles } from './rrhh';

/**
 * Pagos al personal que caja ya registró y esperan la aprobación del administrador. Se aprueba o se rechaza con un motivo (caja lo verá).
 * Solo se muestra si hay algo por aprobar.
 */
@Component({
  selector: 'app-pagos-por-aprobar',
  imports: [ReactiveFormsModule, ModalComponent],
  template: `
    @if (lista().length) {
      <section class="por-aprobar" aria-labelledby="pa-titulo">
        <header>
          <h2 id="pa-titulo">Pagos por aprobar <span class="cuenta">{{ lista().length }}</span></h2>
          <span class="muted">Caja ya los registró. Al aprobar quedan como pagados.</span>
        </header>
        <ul>
          @for (p of lista(); track p.id) {
            <li>
              <div class="quien">
                <strong>{{ p.personalNombre }}</strong>
                <span class="muted">{{ concepto(p) }} de {{ mes(p.periodo) }}@if (p.areaNombre) { · {{ p.areaNombre }} }</span>
              </div>
              <div class="como">
                <span>{{ p.medio?.replace('_', ' / ') }}@if (p.fechaPago) { · {{ fecha(p.fechaPago) }} }</span>
                @if (p.referencia) { <span class="muted">Op. {{ p.referencia }}</span> }
              </div>
              <strong class="monto" [class.neg]="p.montoFirmado < 0">{{ dinero(p.montoFirmado) }}</strong>
              <div class="acciones">
                <button type="button" class="btn btn-primary btn-sm" [disabled]="ocupado()" (click)="aprobar(p)" [attr.aria-label]="'Aprobar el pago de ' + p.personalNombre">Aprobar</button>
                <button type="button" class="btn btn-sm" [disabled]="ocupado()" (click)="pedirRechazo(p)" [attr.aria-label]="'Rechazar el pago de ' + p.personalNombre">Rechazar</button>
              </div>
            </li>
          }
        </ul>
        @if (lista().length > 1) {
          <div class="todos"><button type="button" class="btn" [disabled]="ocupado()" (click)="aprobarTodos()">Aprobar los {{ lista().length }} pagos</button></div>
        }
      </section>
    }

    @if (rechazando(); as p) {
      <app-modal titulo="Rechazar el pago" [ancho]="460" (cerrar)="rechazando.set(null)">
        <p style="margin-top: 0">Pago de <strong>{{ concepto(p) }}</strong> a <strong>{{ p.personalNombre }}</strong> ({{ dinero(p.montoFirmado) }}). Vuelve a pendiente y caja verá el motivo.</p>
        <div class="field">
          <label for="pa-motivo">Motivo</label>
          <input id="pa-motivo" [formControl]="motivo" maxlength="300" placeholder="Ej.: el número de operación no coincide" />
        </div>
        @if (errorRechazo()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorRechazo() }}</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="rechazando.set(null)">Cancelar</button>
          <button type="button" class="btn btn-danger" [disabled]="ocupado()" (click)="rechazar(p)">Rechazar pago</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .por-aprobar { display: flex; flex-direction: column; gap: 10px; padding: 16px; margin-bottom: 16px; border: 1.5px solid var(--violet, #6b4fd8); border-radius: 16px; background: var(--violet-soft, #f1edff); }
    header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    h2 { margin: 0; font-size: 1.05rem; }
    .cuenta { margin-left: 6px; font-size: .8rem; background: var(--card); color: var(--violet, #6b4fd8); border-radius: 999px; padding: 1px 9px; }
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    li { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) auto auto; gap: 14px; align-items: center; padding: 10px 14px; border-radius: 12px; background: var(--card); }
    .quien, .como { display: flex; flex-direction: column; min-width: 0; font-size: .9rem; }
    .monto { font-variant-numeric: tabular-nums; font-size: 1.05rem; }
    .monto.neg { color: var(--danger, #b3261e); }
    .acciones { display: flex; gap: 6px; }
    .todos { display: flex; justify-content: flex-end; }
    @media (max-width: 800px) { li { grid-template-columns: minmax(0, 1fr) auto; } .como, .acciones { grid-column: 1 / -1; } }
  `
})
export class PagosPorAprobarComponent implements OnInit {
  private readonly api = inject(PagoPersonalService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  /** Avisa que se aprobó o rechazó algo, para que la página que lo contiene recargue sus números. */
  readonly cambio = output<void>();

  protected readonly dinero = soles;
  protected readonly lista = signal<PagoPersonal[]>([]);
  protected readonly ocupado = signal(false);
  protected readonly rechazando = signal<PagoPersonal | null>(null);
  protected readonly errorRechazo = signal<string | null>(null);
  protected readonly motivo = this.fb.nonNullable.control('');

  ngOnInit(): void {
    this.cargar();
  }

  /** Se llama también desde fuera cuando cambian los pagos. */
  cargar(): void {
    this.api.porAprobar().subscribe({
      next: l => this.lista.set(l),
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar los pagos por aprobar.'))
    });
  }

  protected concepto(p: PagoPersonal): string { return etiquetaConcepto(p.concepto); }
  protected mes(periodo: string): string { return nombrePeriodo(periodo); }
  protected fecha(f: string): string { return fechaCorta(f); }

  protected aprobar(p: PagoPersonal): void {
    this.ocupado.set(true);
    this.api.aprobar(p.id).subscribe({
      next: () => { this.ocupado.set(false); this.avisos.success(`Pago aprobado: ${p.personalNombre}.`); this.terminado(); },
      error: e => { this.ocupado.set(false); this.avisos.error(mensajeError(e)); this.terminado(); }
    });
  }

  protected aprobarTodos(): void {
    const pendientes = this.lista();
    this.ocupado.set(true);
    let hechos = 0;
    const siguiente = (i: number): void => {
      if (i >= pendientes.length) {
        this.ocupado.set(false);
        this.avisos.success(`${hechos} ${hechos === 1 ? 'pago aprobado' : 'pagos aprobados'}.`);
        this.terminado();
        return;
      }
      this.api.aprobar(pendientes[i].id).subscribe({
        next: () => { hechos++; siguiente(i + 1); },
        error: e => { this.ocupado.set(false); this.avisos.error(mensajeError(e)); this.terminado(); }
      });
    };
    siguiente(0);
  }

  protected pedirRechazo(p: PagoPersonal): void {
    this.motivo.setValue('');
    this.errorRechazo.set(null);
    this.rechazando.set(p);
  }

  protected rechazar(p: PagoPersonal): void {
    const motivo = this.motivo.value.trim();
    if (!motivo) {
      this.errorRechazo.set('El motivo es obligatorio: caja lo verá para corregirlo.');
      return;
    }
    this.ocupado.set(true);
    this.api.rechazar(p.id, motivo).subscribe({
      next: () => { this.ocupado.set(false); this.rechazando.set(null); this.avisos.success('Pago rechazado: vuelve a pendiente.'); this.terminado(); },
      error: e => { this.ocupado.set(false); this.errorRechazo.set(mensajeError(e)); }
    });
  }

  private terminado(): void {
    this.cargar();
    this.cambio.emit();
  }
}
