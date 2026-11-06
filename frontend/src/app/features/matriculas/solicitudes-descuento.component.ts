import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDescuento } from '../../core/models/cobro.model';
import { CobroService } from '../../core/services/cobro.service';
import { TEXTO_SITUACION_HERMANO, puedeConfirmarHermano, situacionHermano } from './confirmar-hermano';
import { NotificationService } from '../../core/services/notification.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';

/**
 * Solicitudes de descuento de la matrícula que esperan la respuesta de la secretaría (o del administrador). Para cada una se ve a quién
 * corresponde, el motivo, el hermano (con lo que el sistema comprueba: si consta matriculado este año) y cuánto costaría la matrícula con el
 * descuento. Al aprobar se aplica el descuento y la matrícula se recalcula; al rechazar, la familia ve el motivo. Se oculta si no hay nada.
 */
@Component({
  selector: 'app-solicitudes-descuento',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, ModalComponent],
  template: `
    @if (lista().length) {
      <section class="card pendiente" aria-labelledby="sd-titulo">
        <div class="card-body">
          <h2 id="sd-titulo">Descuentos por aprobar <span class="cuenta">{{ lista().length }}</span></h2>
          <p class="muted" style="margin-top: 0">Mientras no respondas, la familia no puede pagar esa matrícula.</p>
          @for (s of lista(); track s.id) {
            <article class="fila">
              <div class="cab">
                <strong>{{ s.alumnoNombre || 'Alumno ' + s.alumnoId }}</strong>
                <span class="badge badge-violet">{{ s.descuentoNombre }} · {{ s.tipo === 'PORCENTAJE' ? s.valor + ' %' : 'S/ ' + (s.valor | number: '1.2-2') }}</span>
              </div>
              <div class="muted">«{{ s.motivo }}» · pedido el {{ s.solicitadaEn | date: 'dd/MM HH:mm' }}</div>
              @if (s.hermanoAlumnoId) {
                <div class="hermano" [class.ok]="s.hermanoMatriculado" [class.no]="!s.hermanoMatriculado">
                  Hermano: <strong>{{ s.hermanoNombre || 'Alumno ' + s.hermanoAlumnoId }}</strong> ·
                  {{ s.hermanoMatriculado ? '✓ consta matriculado este año' : '✗ no consta matriculado este año' }}
                </div>
              }
              @if (s.matriculaImporte !== null && s.matriculaImporte !== undefined) {
                <div class="monto">Matrícula S/ {{ s.matriculaImporte | number: '1.2-2' }} → con el descuento <strong>S/ {{ (s.matriculaConDescuento ?? s.matriculaImporte) | number: '1.2-2' }}</strong></div>
              }
              @if (s.origen === 'PUBLICA') {
                <!-- Pedido desde la matrícula en línea: la familia solo escribió el documento del hermano; la secretaría lo busca y confirma el parentesco -->
                <div class="publica">
                  <strong>Pedido desde la matrícula en línea</strong>
                  <div>Documento del hermano que escribió la familia: <strong>{{ s.hermanoDocumento || '—' }}</strong></div>
                  <div [class.ok]="situacion(s) === 'LISTO'" [class.no]="situacion(s) !== 'LISTO'" class="hermano">
                    @if (s.hermanoAlumnoId) { Hermano: <strong>{{ s.hermanoNombre }}</strong> · }
                    {{ textoSituacion[situacion(s)] }}
                  </div>
                  @if (situacion(s) === 'LISTO') {
                    <label class="verifico">
                      <input type="checkbox" [checked]="verificadas().has(s.id)" (change)="marcarVerificada(s.id, $any($event.target).checked)" />
                      <span>Confirmo el parentesco de hermanos entre {{ s.alumnoNombre }} y {{ s.hermanoNombre }}: valido la matrícula y la dejo en deuda para que se pague en Caja o en la cuenta del apoderado.</span>
                    </label>
                  } @else {
                    <span class="muted">No se puede confirmar. Rechaza el pedido indicando el motivo (por ejemplo, el documento no corresponde a un hermano matriculado): la familia podrá pagar completo.</span>
                  }
                </div>
              }
              <div class="acciones">
                <button type="button" class="btn btn-primary btn-sm" [disabled]="ocupado() || !puedeAprobar(s)" (click)="aprobar(s)" [attr.aria-label]="'Aprobar el descuento de ' + s.alumnoNombre">{{ s.origen === 'PUBLICA' ? 'Confirmar descuento de hermano' : 'Aprobar' }}</button>
                <button type="button" class="btn btn-sm" [disabled]="ocupado()" (click)="pedirRechazo(s)" [attr.aria-label]="'Rechazar el descuento de ' + s.alumnoNombre">Rechazar</button>
              </div>
            </article>
          }
        </div>
      </section>
    }

    @if (rechazando(); as s) {
      <app-modal titulo="Rechazar el descuento" [ancho]="460" (cerrar)="rechazando.set(null)">
        <p style="margin-top: 0">Descuento <strong>{{ s.descuentoNombre }}</strong> de {{ s.alumnoNombre }}. La familia verá el motivo y podrá pagar el monto completo.</p>
        <div class="field"><label for="sd-motivo">Motivo</label><input id="sd-motivo" class="input" [formControl]="motivo" maxlength="300" placeholder="Ej.: el hermano no está matriculado este año" /></div>
        @if (error()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ error() }}</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="rechazando.set(null)">Cancelar</button>
          <button type="button" class="btn btn-danger" [disabled]="ocupado()" (click)="rechazar(s)">Rechazar</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .pendiente { margin-bottom: 16px; border: 1.5px solid var(--violet, #6b4fd8); }
    h2 { margin: 0 0 4px; font-size: 1.05rem; }
    .cuenta { margin-left: 6px; font-size: .8rem; background: var(--violet-soft, #f1edff); color: var(--violet, #6b4fd8); border-radius: 999px; padding: 1px 9px; }
    .fila { display: flex; flex-direction: column; gap: 4px; padding: 12px 0; border-top: 1px solid var(--line); }
    .fila:first-of-type { border-top: 0; }
    .cab { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
    .hermano { font-size: .88rem; padding: 4px 10px; border-radius: 8px; width: fit-content; }
    .hermano.ok { background: var(--ok-soft); color: var(--ok); }
    .hermano.no { background: var(--warn-soft); color: var(--warn); }
    .monto { font-size: .92rem; }
    .publica { display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; border-radius: 10px; background: var(--primary-soft); font-size: .92rem; }
    .verifico { display: flex; align-items: flex-start; gap: 8px; cursor: pointer; }
    .verifico input { margin-top: 3px; }
    .acciones { display: flex; gap: 6px; margin-top: 4px; }
  `
})
export class SolicitudesDescuentoComponent implements OnInit {
  private readonly api = inject(CobroService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  /** Avisa que se aprobó o rechazó algo, para que quien lo contiene recargue sus números. */
  readonly cambio = output<void>();

  protected readonly lista = signal<SolicitudDescuento[]>([]);
  protected readonly ocupado = signal(false);
  protected readonly rechazando = signal<SolicitudDescuento | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly motivo = this.fb.nonNullable.control('');

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.api.solicitudesDescuento().subscribe({
      next: l => this.lista.set(l),
      error: () => this.lista.set([])
    });
  }

  // --- pedidos de la matrícula en línea: la secretaría confirma el parentesco de hermanos ---
  protected readonly verificadas = signal<ReadonlySet<number>>(new Set());
  protected readonly textoSituacion = TEXTO_SITUACION_HERMANO;
  protected readonly situacion = situacionHermano;

  protected marcarVerificada(id: number, si: boolean): void {
    this.verificadas.update(v => {
      const n = new Set(v);
      if (si) n.add(id); else n.delete(id);
      return n;
    });
  }

  /** Un pedido de la matrícula en línea solo se confirma con el hermano encontrado y matriculado y el parentesco confirmado; los demás se aprueban directo. */
  protected puedeAprobar(s: SolicitudDescuento): boolean {
    return puedeConfirmarHermano(s, this.verificadas().has(s.id));
  }

  protected aprobar(s: SolicitudDescuento): void {
    this.ocupado.set(true);
    this.api.aprobarSolicitudDescuento(s.id).subscribe({
      next: () => { this.ocupado.set(false); this.avisos.success('Descuento aprobado: la matrícula se recalculó.'); this.terminado(); },
      error: e => { this.ocupado.set(false); this.avisos.error(mensajeError(e)); this.terminado(); }
    });
  }

  protected pedirRechazo(s: SolicitudDescuento): void {
    this.motivo.setValue('');
    this.error.set(null);
    this.rechazando.set(s);
  }

  protected rechazar(s: SolicitudDescuento): void {
    const motivo = this.motivo.value.trim();
    if (!motivo) { this.error.set('El motivo es obligatorio: la familia lo verá.'); return; }
    this.ocupado.set(true);
    this.api.rechazarSolicitudDescuento(s.id, motivo).subscribe({
      next: () => { this.ocupado.set(false); this.rechazando.set(null); this.avisos.success('Descuento rechazado.'); this.terminado(); },
      error: e => { this.ocupado.set(false); this.error.set(mensajeError(e)); }
    });
  }

  private terminado(): void {
    this.cargar();
    this.cambio.emit();
  }
}
