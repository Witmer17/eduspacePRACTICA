import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FondoResumen, MovimientoFondo } from '../../../core/models/fondo.model';
import { AREA_DOCENCIA, Area } from '../../../core/models/planificacion.model';
import { FondoService } from '../../../core/services/fondo.service';
import { fechaCorta, soles } from '../../personal/rrhh';
import { ResultadoFila, aCentimos, evaluarAsignacion, evaluarReparto, maximoAsignable, partesIguales, porcentajeDe } from './fondo';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ConfigHeroComponent } from '../../../shared/components/config-hero/config-hero.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

/** El código del área: mayúsculas, números y guion bajo, sin tildes ni espacios (lo que el servidor acepta). */
export function codigoDeArea(nombre: string): string {
  return nombre.normalize('NFD').replace(/\p{M}/gu, '').toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 30);
}

/**
 * Las áreas de trabajo del colegio (Dirección, Docencia, Tesorería…): a ellas pertenece todo el personal.
 * Aquí se crean, se renombran y se activan o desactivan; Docencia es la única cuyo personal dicta cursos y no se puede desactivar.
 */
@Component({
  selector: 'app-areas-config',
  imports: [ReactiveFormsModule, RouterLink, ConfigHeroComponent, ModalComponent],
  template: `
    <div class="page n-inicial">
      <app-config-hero titulo="Áreas de trabajo" subtitulo="Las áreas en que se organiza el personal del colegio. Cada persona contratada pertenece a una."
                       icono="M3 21V8l9-5 9 5v13M3 21h18M9 21v-5h6v5M9 11h.01M15 11h.01">
        @if (puedeEditar()) {
          <button type="button" class="btn" [disabled]="!fondo()" (click)="abrirReparto()" title="Pon el monto de todas las áreas en una sola ventana">Repartir dinero entre las áreas</button>
          <button type="button" class="btn" (click)="nueva()">Nueva área</button>
        }
      </app-config-hero>

      @if (!puedeEditar()) {
        <div class="aviso aviso-warn">Solo el administrador puede modificar las áreas; tú puedes consultarlas.</div>
      }

      <div class="resumen">
        <span><strong>{{ activas().length }}</strong> activas</span>
        @if (inactivas() > 0) {
          <label class="check"><input type="checkbox" [checked]="verInactivas()" (change)="verInactivas.set(!verInactivas())" /> Mostrar las {{ inactivas() }} inactivas</label>
        }
        <a class="btn btn-sm" routerLink="/personal">Ver el personal por área</a>
      </div>

      <!-- Dinero de caja y su reparto entre las áreas (solo el administrador lo ve y lo cambia) -->
      @if (puedeEditar()) {
        <section class="caja" aria-label="Dinero en caja">
          @if (fondo(); as f) {
            <div class="caja-tiles">
              <div class="tile-caja principal" [class.negativo]="f.disponible < 0">
                <span>Disponible en caja</span>
                <strong>{{ dinero(f.disponible) }}</strong>
                <small>Baja cada vez que asignas dinero a un área</small>
              </div>
              <div class="tile-caja"><span>Cobrado</span><strong>{{ dinero(f.totalCobrado) }}</strong><small>pagos confirmados</small></div>
              <div class="tile-caja"><span>Asignado a las áreas</span><strong>{{ dinero(f.totalAsignado) }}</strong><small>{{ porcentaje(f.totalAsignado, f.totalCobrado) }}% de lo cobrado</small></div>
            </div>
            @if (f.disponible < 0) {
              <div class="aviso aviso-warn" role="status">La caja quedó en negativo: se anularon pagos después de repartir el dinero. Quita dinero a alguna área para cuadrarla.</div>
            }
            @if (dineroEnInactivas() > 0) {
              <div class="aviso aviso-warn" role="status">
                {{ dinero(dineroEnInactivas()) }} siguen asignados a áreas desactivadas.
                @if (!verInactivas()) { <button type="button" class="enlace-aviso" (click)="verInactivas.set(true)">Mostrarlas</button> para devolverlos a caja. }
                @else { Devuélvelos a caja con «Asignar dinero» → «Dejar en 0». }
              </div>
            }
            @if (dineroSinArea() > 0) {
              <div class="aviso aviso-warn" role="status">{{ dinero(dineroSinArea()) }} están asignados a áreas que ya no existen en el colegio y no se pueden devolver desde esta pantalla.</div>
            }
          } @else if (errorFondo()) {
            <div class="aviso aviso-danger" role="alert">{{ errorFondo() }}</div>
          } @else {
            <p class="muted">Cargando el dinero de caja…</p>
          }
        </section>
      }

      <div class="areas">
        @for (a of visibles(); track a.id) {
          <article class="area" [class.apagada]="!a.activo">
            <header>
              <span class="area-inicial" aria-hidden="true">{{ a.nombre.charAt(0) }}</span>
              <div class="area-titulo">
                <h2>{{ a.nombre }}</h2>
                <code>{{ a.codigo }}</code>
              </div>
              <span [class]="'badge ' + (a.activo ? 'badge-ok' : 'badge-gray')">{{ a.activo ? 'Activa' : 'Inactiva' }}</span>
            </header>
            <p class="area-desc">{{ a.descripcion || 'Sin descripción.' }}</p>
            @if (a.codigo === docencia) { <span class="nota">Su personal dicta cursos y puede ser tutor. No se puede desactivar.</span> }
            @if (puedeEditar() && fondo(); as f) {
              <div class="dinero-area">
                <div class="dinero-fila"><span>Dinero asignado</span><strong>{{ dinero(asignadoDe(a.id)) }}</strong></div>
                <div class="barra-dinero" role="img" [attr.aria-label]="porcentaje(asignadoDe(a.id), f.totalCobrado) + '% de lo cobrado'"><span [style.width.%]="porcentaje(asignadoDe(a.id), f.totalCobrado)"></span></div>
              </div>
            }
            @if (puedeEditar()) {
              <footer>
                <button type="button" class="btn btn-sm btn-primary" [disabled]="!fondo()" (click)="abrirAsignar(a)">Asignar dinero</button>
                <a class="btn btn-sm" [routerLink]="['/areas', a.codigo]">Abrir página</a>
                <button type="button" class="btn btn-sm" (click)="editar(a)">Editar</button>
                <button type="button" class="btn btn-sm" [disabled]="a.codigo === docencia" (click)="alternar(a)">{{ a.activo ? 'Desactivar' : 'Activar' }}</button>
              </footer>
            }
          </article>
        } @empty {
          <p class="muted">{{ cargando() ? 'Cargando…' : 'Aún no hay áreas.' }}</p>
        }
      </div>
    </div>

    <!-- Repartir dinero de caja entre todas las áreas en una sola ventana -->
    @if (repartoAbierto()) {
      @let ev = evaluacionReparto();
      <app-modal titulo="Repartir dinero entre las áreas" [ancho]="820" (cerrar)="cerrarReparto()">
        <div class="reparto-totales" aria-live="polite">
          <div><span>Disponible en caja</span><strong>{{ dinero(fondo()?.disponible ?? 0) }}</strong></div>
          <div><span>{{ ev.cambioNeto < 0 ? 'Vuelve a caja' : 'Sale de caja' }}</span><strong>{{ dinero(abs(ev.cambioNeto)) }}</strong></div>
          <div [class.negativo]="ev.cajaDespues < 0"><span>La caja quedará en</span><strong>{{ dinero(ev.cajaDespues) }}</strong></div>
        </div>

        <div class="reparto-atajos" role="group" aria-label="Atajos del reparto">
          <button type="button" class="atajo" (click)="repartirEnPartesIguales()" title="Suma lo disponible, en partes iguales, a las áreas activas">Repartir lo disponible en partes iguales</button>
          <button type="button" class="atajo" (click)="todoEnCero()">Poner todo en 0</button>
          <button type="button" class="atajo" (click)="restablecerReparto()">Dejar todo como estaba</button>
        </div>

        <form (submit)="$event.preventDefault(); guardarReparto()" id="form-reparto" novalidate>
          <div class="table-wrap reparto-tabla">
            <table class="table">
              <thead><tr><th>Área</th><th class="der">Asignado hoy</th><th class="der">Nuevo monto (S/)</th><th class="der">Cambio</th><th></th></tr></thead>
              <tbody>
                @for (f of filasReparto(); track f.area.id) {
                  @let r = resultadoReparto(f.area.id);
                  <tr [class.apagada]="!f.area.activo" [class.cambia]="r.cambio !== 0">
                    <td>
                      <strong>{{ f.area.nombre }}</strong>
                      @if (!f.area.activo) { <span class="badge badge-gray">Inactiva</span> }
                    </td>
                    <td class="der">{{ dinero(f.actual) }}</td>
                    <td class="der">
                      <input class="input monto-reparto" [class.error]="!!r.error" type="number" min="0" step="0.01" inputmode="decimal"
                             [value]="f.texto" (input)="cambiarMontoReparto(f.area.id, $any($event.target).value)"
                             [attr.aria-label]="'Nuevo monto para ' + f.area.nombre" [attr.aria-invalid]="!!r.error" />
                      @if (r.error) { <small class="error">{{ r.error }}</small> }
                    </td>
                    <td class="der cambio" [class.sube]="r.cambio > 0" [class.baja]="r.cambio < 0">{{ r.cambio === 0 ? '—' : (r.cambio > 0 ? '+ ' : '− ') + dinero(abs(r.cambio)) }}</td>
                    <td class="der">
                      <button type="button" class="btn btn-sm" [disabled]="f.texto === textoDe(f.actual)" (click)="restablecerFila(f.area.id)" [attr.aria-label]="'Volver al monto de ' + f.area.nombre" title="Volver al monto de hoy">↺</button>
                    </td>
                  </tr>
                } @empty {
                  <tr><td colspan="5" class="vacio">No hay áreas.</td></tr>
                }
              </tbody>
            </table>
          </div>
          <div class="field" style="margin-top: 12px">
            <label for="rp-motivo">Motivo (opcional, se anota en cada cambio)</label>
            <input id="rp-motivo" class="input" [value]="motivoReparto()" (input)="motivoReparto.set($any($event.target).value)" maxlength="255" placeholder="Reparto de noviembre, presupuesto del trimestre…" />
          </div>
          @if (ev.error) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ ev.error }}</div> }
          @if (errorReparto()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorReparto() }}</div> }
        </form>
        <ng-container footer>
          <button type="button" class="btn" (click)="cerrarReparto()">Cancelar</button>
          <button type="submit" form="form-reparto" class="btn btn-primary" [disabled]="guardandoReparto() || !!ev.error || ev.cambiadas === 0">{{ guardandoReparto() ? 'Guardando…' : ev.cambiadas === 0 ? 'Sin cambios' : 'Guardar ' + ev.cambiadas + (ev.cambiadas === 1 ? ' cambio' : ' cambios') }}</button>
        </ng-container>
      </app-modal>
    }

    <!-- Asignar dinero de caja a un área -->
    @if (asignando(); as ar) {
      @let ev = evaluacion();
      <app-modal [titulo]="'Dinero para ' + ar.nombre" [ancho]="580" (cerrar)="cerrarAsignar()">
        <div class="caja-modal">
          <div><span>Disponible en caja</span><strong>{{ dinero(fondo()?.disponible ?? 0) }}</strong></div>
          <div><span>Asignado ahora</span><strong>{{ dinero(actualAsig()) }}</strong></div>
        </div>
        <form (submit)="$event.preventDefault(); guardarAsignacion()" id="form-asignar" novalidate>
          <div class="form-grid">
            <div class="field full">
              <label for="mf-monto">Monto que debe tener asignada el área (S/)</label>
              <input id="mf-monto" type="number" min="0" step="0.01" [formControl]="montoAsig" inputmode="decimal" />
              <div class="atajos" role="group" aria-label="Atajos de monto">
                <button type="button" class="atajo" (click)="sumarMonto(100)">+ S/ 100</button>
                <button type="button" class="atajo" (click)="sumarMonto(500)">+ S/ 500</button>
                <button type="button" class="atajo" (click)="sumarMonto(1000)">+ S/ 1 000</button>
                <button type="button" class="atajo" (click)="usarTodoLoDisponible()">Todo lo disponible</button>
                <button type="button" class="atajo" (click)="dejarEnCero()">Dejar en 0</button>
              </div>
            </div>
            <div class="field full">
              <label for="mf-motivo">Motivo (opcional)</label>
              <input id="mf-motivo" [formControl]="motivoAsig" maxlength="255" placeholder="Útiles del trimestre, mantenimiento…" />
            </div>
          </div>

          <!-- Vista previa: qué pasa con la caja -->
          <div class="vista-caja" [class.error]="!!ev.error" [class.igual]="!ev.error && ev.direccion === 'igual'" aria-live="polite">
            @if (ev.error) {
              <strong>{{ ev.error }}</strong>
            } @else if (ev.direccion === 'igual') {
              <span>Sin cambios: el área ya tiene ese monto.</span>
            } @else {
              <span>{{ ev.direccion === 'sale' ? 'Salen' : 'Vuelven' }} <strong>{{ dinero(abs(ev.cambio)) }}</strong> {{ ev.direccion === 'sale' ? 'de caja hacia el área' : 'del área a caja' }}.</span>
              <span>La caja quedará en <strong>{{ dinero(ev.cajaDespues) }}</strong>.</span>
            }
          </div>
          @if (errorAsignar()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorAsignar() }}</div> }
        </form>

        @if (movimientosArea().length) {
          <h3 class="sub-mov">Últimos movimientos</h3>
          <ul class="movimientos">
            @for (m of movimientosArea(); track m.id) {
              <li>
                <span class="mov-fecha">{{ fecha(m.creadoEn) }}</span>
                <span class="mov-motivo">{{ m.motivo || (m.monto > 0 ? 'Asignación' : 'Devolución a caja') }}</span>
                <strong [class.devuelve]="m.monto < 0">{{ m.monto > 0 ? '+' : '−' }} {{ dinero(abs(m.monto)) }}</strong>
                <span class="mov-saldo muted">queda {{ dinero(m.saldoArea) }}</span>
              </li>
            }
          </ul>
        }
        <ng-container footer>
          <button type="button" class="btn" (click)="cerrarAsignar()">Cancelar</button>
          <button type="submit" form="form-asignar" class="btn btn-primary" [disabled]="guardandoAsignar() || !!ev.error || ev.direccion === 'igual'">{{ guardandoAsignar() ? 'Guardando…' : ev.direccion === 'vuelve' ? 'Devolver a caja' : 'Asignar' }}</button>
        </ng-container>
      </app-modal>
    }

    @if (abierto()) {
      <app-modal [titulo]="editando() ? 'Editar área' : 'Nueva área de trabajo'" [ancho]="500" (cerrar)="cerrar()">
        <form [formGroup]="form" (ngSubmit)="guardar()" id="form-area" novalidate>
          <div class="form-grid">
            <div class="field full">
              <label for="ar-nombre">Nombre</label>
              <input id="ar-nombre" formControlName="nombre" placeholder="Deportes y recreación" (input)="sugerirCodigo()" />
              @if (form.controls.nombre.touched && form.controls.nombre.invalid) { <span class="error">Obligatorio.</span> }
            </div>
            <div class="field full">
              <label for="ar-codigo">Código</label>
              <input id="ar-codigo" formControlName="codigo" placeholder="DEPORTES" />
              @if (editando()) { <span class="muted">El código no cambia: lo usan las reglas del sistema.</span> }
              @else if (form.controls.codigo.touched && form.controls.codigo.invalid) { <span class="error">Solo mayúsculas, números y guion bajo.</span> }
            </div>
            <div class="field full">
              <label for="ar-desc">Descripción</label>
              <textarea id="ar-desc" formControlName="descripcion" rows="3" maxlength="255"></textarea>
            </div>
          </div>
          @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
        </form>
        <ng-container footer>
          <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
          <button type="submit" form="form-area" class="btn btn-primary" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : 'Guardar' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .resumen { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
    .resumen strong { font-size: 1.4rem; }
    .check { display: inline-flex; align-items: center; gap: 6px; font-size: .88rem; color: var(--ink-2); cursor: pointer; }
    .areas { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 16px; }
    .area { display: flex; flex-direction: column; gap: 10px; padding: 16px; background: var(--card); border: 1px solid var(--line); border-top: 4px solid var(--nivel); border-radius: 16px; }
    .area.apagada { opacity: .6; border-top-color: var(--line-2); }
    .area header { display: flex; align-items: center; gap: 12px; }
    .area-inicial { flex: none; width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px; background: linear-gradient(135deg, var(--nivel), var(--nivel-2)); color: #fff; font-weight: 900; font-size: 1.15rem; }
    .area-titulo { flex: 1; min-width: 0; }
    .area-titulo h2 { margin: 0; font-size: 1rem; font-weight: 800; line-height: 1.2; }
    .area-titulo code { font-size: .72rem; color: var(--ink-2); }
    .area-desc { margin: 0; font-size: .88rem; color: var(--ink-2); line-height: 1.4; flex: 1; }
    .nota { font-size: .76rem; padding: 6px 10px; border-radius: 8px; background: var(--nivel-suave); color: var(--nivel); }
    .area footer { display: flex; gap: 8px; flex-wrap: wrap; }
    .caja { display: flex; flex-direction: column; gap: 10px; }
    .enlace-aviso { padding: 0; font: inherit; font-weight: 800; color: inherit; background: none; border: 0; text-decoration: underline; cursor: pointer; }
    .caja-tiles { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 12px; }
    .tile-caja { display: flex; flex-direction: column; gap: 2px; padding: 12px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); }
    .tile-caja span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .tile-caja strong { font-size: 1.45rem; font-variant-numeric: tabular-nums; }
    .tile-caja small { color: var(--ink-2); font-size: .76rem; }
    .tile-caja.principal { border: 2px solid var(--nivel); background: var(--nivel-suave); }
    .tile-caja.principal strong { font-size: 1.9rem; color: var(--nivel); }
    .tile-caja.negativo { border-color: #c0392b; background: var(--danger-soft); }
    .tile-caja.negativo strong { color: #8e1c12; }
    .dinero-area { display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; border-radius: 12px; background: var(--bg); border: 1px solid var(--line); }
    .dinero-fila { display: flex; justify-content: space-between; align-items: baseline; }
    .dinero-fila span { font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-2); }
    .dinero-fila strong { font-size: 1.15rem; font-variant-numeric: tabular-nums; }
    .barra-dinero { height: 6px; border-radius: 999px; background: var(--line); overflow: hidden; }
    .barra-dinero span { display: block; height: 100%; border-radius: 999px; background: var(--nivel); }
    .reparto-totales { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 12px; }
    .reparto-totales div { display: flex; flex-direction: column; padding: 10px 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .reparto-totales div.negativo { border-color: #c0392b; background: var(--danger-soft); color: #8e1c12; }
    .reparto-totales span { font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-2); }
    .reparto-totales strong { font-size: 1.2rem; font-variant-numeric: tabular-nums; }
    .reparto-atajos { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .reparto-tabla { max-height: 46vh; overflow-y: auto; border: 1px solid var(--line); border-radius: 12px; }
    .reparto-tabla th { position: sticky; top: 0; background: var(--bg); z-index: 1; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
    .reparto-tabla .der { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .reparto-tabla tr.apagada { opacity: .65; }
    .reparto-tabla tr.cambia { background: var(--primary-soft); }
    .reparto-tabla td strong { margin-right: 6px; }
    .monto-reparto { width: 130px; text-align: right; }
    .monto-reparto.error { border-color: #c0392b; }
    .reparto-tabla small.error { display: block; color: #8e1c12; font-size: .72rem; }
    .cambio.sube { color: #8e1c12; font-weight: 700; }
    .cambio.baja { color: var(--ok); font-weight: 700; }
    /* Celular: cada área es una tarjeta apilada (nombre / hoy y campo / cambio y restablecer) en vez de una tabla que obliga a desplazarse. */
    @media (max-width: 760px) {
      .reparto-totales { grid-template-columns: minmax(0, 1fr); }
      .reparto-tabla table.table { min-width: 0; }
      .reparto-tabla thead { display: none; }
      .reparto-tabla tbody tr { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 10px; align-items: center; padding: 10px 12px; border-bottom: 1px solid var(--line); }
      .reparto-tabla td { display: block; padding: 0; border: 0; }
      .reparto-tabla td:nth-child(1) { grid-column: 1 / -1; }
      .reparto-tabla td:nth-child(2) { grid-column: 1; grid-row: 2; text-align: left; }
      .reparto-tabla td:nth-child(2)::before { content: 'Hoy: '; color: var(--ink-2); font-weight: 400; }
      .reparto-tabla td:nth-child(3) { grid-column: 2; grid-row: 2; }
      .reparto-tabla td:nth-child(4) { grid-column: 1; grid-row: 3; text-align: left; }
      .reparto-tabla td:nth-child(5) { grid-column: 2; grid-row: 3; }
      .monto-reparto { width: 120px; }
    }
    .caja-modal { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-bottom: 14px; }
    .caja-modal div { display: flex; flex-direction: column; padding: 10px 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .caja-modal span { font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-2); }
    .caja-modal strong { font-size: 1.25rem; font-variant-numeric: tabular-nums; }
    .atajos { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .atajo { padding: 3px 10px; font: inherit; font-size: .76rem; font-weight: 700; color: var(--primary); background: var(--primary-soft); border: 0; border-radius: 999px; cursor: pointer; }
    .atajo:hover { filter: brightness(.95); }
    .vista-caja { display: flex; flex-direction: column; gap: 2px; margin-top: 14px; padding: 12px 14px; border-radius: 12px; border: 1.5px solid var(--primary); background: var(--primary-soft); }
    .vista-caja.igual { border-color: var(--line-2); background: var(--bg); color: var(--ink-2); }
    .vista-caja.error { border-color: #c0392b; background: var(--danger-soft); color: #8e1c12; }
    .sub-mov { margin: 18px 0 6px; font-size: .74rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .movimientos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; max-height: 180px; overflow-y: auto; }
    .movimientos li { display: grid; grid-template-columns: 78px 1fr auto auto; gap: 8px; align-items: baseline; font-size: .82rem; padding: 4px 0; border-bottom: 1px dashed var(--line); }
    .mov-fecha, .mov-saldo { font-size: .74rem; color: var(--ink-2); }
    .movimientos strong { font-variant-numeric: tabular-nums; }
    .movimientos strong.devuelve { color: var(--ok); }
    @media (max-width: 760px) { .caja-tiles { grid-template-columns: minmax(0, 1fr); } .movimientos li { grid-template-columns: 1fr auto; } .mov-fecha, .mov-saldo { display: none; } }
  `
})
export class AreasConfigComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly puedeEditar = inject(AuthService).isAdmin;
  protected readonly docencia = AREA_DOCENCIA;
  protected readonly areas = signal<Area[]>([]);
  protected readonly cargando = signal(true);
  protected readonly verInactivas = signal(false);

  protected readonly activas = computed(() => this.areas().filter(a => a.activo));
  protected readonly inactivas = computed(() => this.areas().filter(a => !a.activo).length);
  protected readonly visibles = computed(() => (this.verInactivas() ? this.areas() : this.activas()));

  protected readonly abierto = signal(false);
  protected readonly editando = signal<Area | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    codigo: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[A-Z0-9_]+$/)]],
    descripcion: ['']
  });

  // --- Dinero de caja y su reparto entre áreas ---
  private readonly fondoApi = inject(FondoService);
  protected readonly dinero = soles;
  protected readonly porcentaje = porcentajeDe;
  protected readonly abs = Math.abs;
  protected readonly fondo = signal<FondoResumen | null>(null);
  protected readonly errorFondo = signal<string | null>(null);

  protected readonly asignando = signal<Area | null>(null);
  protected readonly montoAsig = this.fb.control<number | null>(0);
  protected readonly motivoAsig = this.fb.nonNullable.control('');
  private readonly montoSig = signal<number>(0);
  protected readonly movimientosArea = signal<MovimientoFondo[]>([]);
  protected readonly guardandoAsignar = signal(false);
  protected readonly errorAsignar = signal<string | null>(null);

  /** Lo que tiene asignado hoy el área que se está editando. */
  protected readonly actualAsig = computed(() => {
    const a = this.asignando();
    return a ? this.asignadoDe(a.id) : 0;
  });
  /** Qué pasaría con la caja con el monto escrito (se actualiza al teclear). */
  protected readonly evaluacion = computed(() => evaluarAsignacion(this.fondo()?.disponible ?? 0, this.actualAsig(), this.montoSig()));

  /** Dinero que sigue asignado a áreas desactivadas (hay que devolverlo a caja o reactivarlas). */
  protected readonly dineroEnInactivas = computed(() => {
    const inactivas = new Set(this.areas().filter(a => !a.activo).map(a => a.id));
    return aCentimos((this.fondo()?.areas ?? []).filter(x => inactivas.has(x.areaId)).reduce((t, x) => t + x.asignado, 0));
  });
  /** Dinero asignado a un id de área que ya no existe (otra base): no se puede ver ni devolver desde aquí. */
  protected readonly dineroSinArea = computed(() => {
    if (this.cargando()) return 0;
    const conocidas = new Set(this.areas().map(a => a.id));
    return aCentimos((this.fondo()?.areas ?? []).filter(x => !conocidas.has(x.areaId)).reduce((t, x) => t + x.asignado, 0));
  });

  protected asignadoDe(areaId: number): number {
    return this.fondo()?.areas.find(x => x.areaId === areaId)?.asignado ?? 0;
  }

  protected fecha(creadoEn: string): string {
    return fechaCorta(creadoEn.slice(0, 10));
  }

  private cargarFondo(): void {
    if (!this.puedeEditar()) return;
    this.fondoApi.resumen().subscribe({
      next: f => { this.fondo.set(f); this.errorFondo.set(null); },
      error: e => this.errorFondo.set(mensajeError(e, 'No se pudo cargar el dinero de caja.'))
    });
  }

  protected abrirAsignar(a: Area): void {
    const actual = this.asignadoDe(a.id);
    this.errorAsignar.set(null);
    this.motivoAsig.setValue('');
    this.montoAsig.setValue(actual);
    this.montoSig.set(actual);
    this.movimientosArea.set([]);
    this.asignando.set(a);
    this.fondoApi.movimientos(a.id).subscribe({ next: m => this.movimientosArea.set(m), error: () => this.movimientosArea.set([]) });
  }

  protected cerrarAsignar(): void {
    this.asignando.set(null);
  }

  protected sumarMonto(cantidad: number): void {
    this.fijarMonto(aCentimos((Number.isFinite(this.montoSig()) ? this.montoSig() : 0) + cantidad));
  }

  /** Deja al área con todo lo que ya tenía más todo lo que queda en caja. */
  protected usarTodoLoDisponible(): void {
    this.fijarMonto(maximoAsignable(this.fondo()?.disponible ?? 0, this.actualAsig()));
  }

  protected dejarEnCero(): void {
    this.fijarMonto(0);
  }

  private fijarMonto(valor: number): void {
    this.montoAsig.setValue(valor);
    this.montoSig.set(valor);
  }

  protected guardarAsignacion(): void {
    const a = this.asignando();
    const ev = this.evaluacion();
    if (!a || ev.error || ev.direccion === 'igual') return;
    this.guardandoAsignar.set(true);
    this.errorAsignar.set(null);
    this.fondoApi.fijar(a.id, aCentimos(this.montoSig()), this.motivoAsig.value.trim() || undefined).subscribe({
      next: f => {
        this.guardandoAsignar.set(false);
        this.fondo.set(f);
        this.avisos.success(ev.direccion === 'sale'
          ? `${soles(ev.cambio)} asignados a ${a.nombre}. Caja: ${soles(f.disponible)}.`
          : `${soles(-ev.cambio)} devueltos a caja desde ${a.nombre}. Caja: ${soles(f.disponible)}.`);
        this.cerrarAsignar();
      },
      error: e => {
        this.guardandoAsignar.set(false);
        this.errorAsignar.set(mensajeError(e));
        this.cargarFondo(); // quizá la caja cambió mientras tanto
      }
    });
  }

  // --- Repartir entre todas las áreas en una sola ventana ---
  protected readonly repartoAbierto = signal(false);
  /** Una fila por área (las activas y las inactivas que aún tienen dinero): lo que tienen hoy y lo que se está escribiendo. */
  protected readonly filasReparto = signal<{ area: Area; actual: number; texto: string }[]>([]);
  protected readonly motivoReparto = signal('');
  protected readonly guardandoReparto = signal(false);
  protected readonly errorReparto = signal<string | null>(null);

  protected readonly textoDe = (n: number): string => String(n);
  /** Lo escrito en un campo: vacío = sin tocar (null); texto no numérico = NaN (error de esa fila). */
  private nuevoDe(texto: string): number | null {
    const t = texto.trim();
    return t === '' ? null : Number(t);
  }

  protected readonly evaluacionReparto = computed(() =>
    evaluarReparto(this.fondo()?.disponible ?? 0, this.filasReparto().map(f => ({ id: f.area.id, actual: f.actual, nuevo: this.nuevoDe(f.texto) }))));

  protected resultadoReparto(id: number): ResultadoFila {
    return this.evaluacionReparto().filas.find(r => r.id === id) ?? { id, cambio: 0, error: '' };
  }

  protected abrirReparto(): void {
    if (!this.fondo()) return;
    this.filasReparto.set([...this.areas()]
      .filter(a => a.activo || this.asignadoDe(a.id) > 0)
      .sort((a, b) => Number(b.activo) - Number(a.activo) || a.nombre.localeCompare(b.nombre, 'es'))
      .map(a => ({ area: a, actual: this.asignadoDe(a.id), texto: String(this.asignadoDe(a.id)) })));
    this.motivoReparto.set('');
    this.errorReparto.set(null);
    this.repartoAbierto.set(true);
  }

  protected cerrarReparto(): void {
    this.repartoAbierto.set(false);
  }

  protected cambiarMontoReparto(id: number, valor: string): void {
    this.filasReparto.update(fs => fs.map(f => (f.area.id === id ? { ...f, texto: valor } : f)));
  }

  protected restablecerFila(id: number): void {
    this.filasReparto.update(fs => fs.map(f => (f.area.id === id ? { ...f, texto: String(f.actual) } : f)));
  }

  protected restablecerReparto(): void {
    this.filasReparto.update(fs => fs.map(f => ({ ...f, texto: String(f.actual) })));
  }

  protected todoEnCero(): void {
    this.filasReparto.update(fs => fs.map(f => ({ ...f, texto: '0' })));
  }

  /**
   * Suma lo disponible, en partes iguales, a lo que ya tienen las áreas activas. Lo que se haya devuelto a caja desde áreas inactivas en esta
   * misma ventana también se reparte.
   */
  protected repartirEnPartesIguales(): void {
    const filas = this.filasReparto();
    const activas = filas.filter(f => f.area.activo);
    const devuelto = filas.filter(f => !f.area.activo).reduce((t, f) => {
      const n = this.nuevoDe(f.texto);
      return t + (n !== null && Number.isFinite(n) && n >= 0 ? f.actual - n : 0);
    }, 0);
    const libre = aCentimos((this.fondo()?.disponible ?? 0) + devuelto);
    if (!activas.length || libre <= 0) {
      this.avisos.info('No hay dinero disponible para repartir en partes iguales.');
      return;
    }
    const nuevos = partesIguales(libre, activas.map(f => f.actual));
    const porId = new Map(activas.map((f, i) => [f.area.id, nuevos[i]]));
    this.filasReparto.update(fs => fs.map(f => (porId.has(f.area.id) ? { ...f, texto: String(porId.get(f.area.id)) } : f)));
  }

  protected guardarReparto(): void {
    const ev = this.evaluacionReparto();
    if (ev.error || ev.cambiadas === 0) return;
    const cambios = this.filasReparto()
      .filter(f => this.resultadoReparto(f.area.id).cambio !== 0)
      .map(f => ({ areaId: f.area.id, monto: aCentimos(this.nuevoDe(f.texto) ?? f.actual) }));
    this.guardandoReparto.set(true);
    this.errorReparto.set(null);
    this.fondoApi.fijarVarias(cambios, this.motivoReparto().trim() || undefined).subscribe({
      next: f => {
        this.guardandoReparto.set(false);
        this.fondo.set(f);
        this.avisos.success(`${cambios.length} ${cambios.length === 1 ? 'área actualizada' : 'áreas actualizadas'}. Caja: ${soles(f.disponible)}.`);
        this.cerrarReparto();
      },
      error: e => {
        this.guardandoReparto.set(false);
        this.errorReparto.set(mensajeError(e));
        this.cargarFondo(); // quizá la caja cambió mientras tanto
      }
    });
  }

  ngOnInit(): void {
    this.cargar();
    this.cargarFondo();
    this.montoAsig.valueChanges.subscribe(v => this.montoSig.set(v === null ? NaN : Number(v)));
  }

  private cargar(): void {
    this.api.areas(true).subscribe({
      next: a => {
        this.areas.set(a);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar las áreas.'));
      }
    });
  }

  protected nueva(): void {
    this.form.reset({ nombre: '', codigo: '', descripcion: '' });
    this.form.controls.codigo.enable();
    this.errorForm.set(null);
    this.editando.set(null);
    this.abierto.set(true);
  }

  protected editar(a: Area): void {
    this.form.reset({ nombre: a.nombre, codigo: a.codigo, descripcion: a.descripcion ?? '' });
    this.form.controls.codigo.disable();
    this.errorForm.set(null);
    this.editando.set(a);
    this.abierto.set(true);
  }

  /** Mientras se escribe el nombre de un área nueva, se propone el código (se puede corregir). */
  protected sugerirCodigo(): void {
    if (this.editando() || this.form.controls.codigo.dirty) return;
    this.form.controls.codigo.setValue(codigoDeArea(this.form.controls.nombre.value));
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const e = this.editando();
    const descripcion = v.descripcion.trim() || undefined;
    this.guardando.set(true);
    this.errorForm.set(null);
    (e ? this.api.actualizarArea(e.id, { nombre: v.nombre.trim(), descripcion }) : this.api.crearArea({ codigo: v.codigo, nombre: v.nombre.trim(), descripcion })).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(e ? 'Área actualizada.' : 'Área creada.');
        this.cerrar();
        this.cargar();
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  protected async alternar(a: Area): Promise<void> {
    if (a.activo && !(await this.confirmacion.confirmar(`¿Desactivar el área ${a.nombre}? Dejará de ofrecerse al registrar personal.`, 'Desactivar', true))) return;
    this.api.cambiarEstadoArea(a.id, !a.activo).subscribe({
      next: () => {
        this.avisos.success(a.activo ? 'Área desactivada.' : 'Área activada.');
        this.cargar();
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }
}
