import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AsistenciaPersonal, EstadoAsistenciaPersonal, MarcaAsistencia } from '../../core/models/asistencia-personal.model';
import { Area, Docente } from '../../core/models/planificacion.model';
import { AsistenciaPersonalService } from '../../core/services/asistencia-personal.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ESTADOS_ASISTENCIA, contar, etiquetaEstado, horaCorta, hoyLocal, llevaHoras, rangoDelMes, resumenPorPersona } from './asistencia-personal';
import { nombrePeriodo, periodoDe } from './rrhh';

interface Fila {
  estado: EstadoAsistenciaPersonal | '';
  entrada: string;
  salida: string;
  obs: string;
}

const FILA_VACIA: Fila = { estado: '', entrada: '', salida: '', obs: '' };

/**
 * Asistencia del personal. «Registro del día»: se marca a cada persona (presente, tardanza, falta, justificada o permiso) con sus horas y
 * se guarda el día completo. «Resumen del mes»: cuántas veces estuvo, faltó o llegó tarde cada persona y su porcentaje de asistencia.
 */
@Component({
  selector: 'app-asistencia-personal',
  imports: [ReactiveFormsModule, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Asistencia del personal" subtitulo="Registra cada día quién vino, quién llegó tarde y quién faltó, y revisa el resumen del mes." />

      <div class="pestanas" role="tablist">
        <button type="button" role="tab" [class.on]="pestana() === 'dia'" [attr.aria-selected]="pestana() === 'dia'" (click)="pestana.set('dia')">Registro del día</button>
        <button type="button" role="tab" [class.on]="pestana() === 'mes'" [attr.aria-selected]="pestana() === 'mes'" (click)="irAMes()">Resumen del mes</button>
      </div>

      <div class="toolbar linea">
        @if (pestana() === 'dia') {
          <label class="campo-fecha">Fecha <input class="input" type="date" [formControl]="fecha" [max]="hoy" aria-label="Fecha de la asistencia" /></label>
        } @else {
          <label class="campo-fecha">Mes <input class="input" type="month" [formControl]="mes" [max]="mesActual" aria-label="Mes del resumen" /></label>
        }
        <select class="input area-sel" [formControl]="areaFiltro" aria-label="Filtrar por área">
          <option [ngValue]="0">Todas las áreas</option>
          @for (a of areas(); track a.id) { <option [ngValue]="a.id">{{ a.nombre }}</option> }
        </select>
        <input class="input grow" type="search" [formControl]="busqueda" placeholder="Buscar por nombre o documento" aria-label="Buscar personal" />
      </div>

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      @if (pestana() === 'dia') {
        <div class="chips" aria-label="Resumen del día">
          <span class="chip ok">Presentes · {{ conteo().PRESENTE }}</span>
          <span class="chip warn">Tardanzas · {{ conteo().TARDANZA }}</span>
          <span class="chip danger">Faltas · {{ conteo().FALTA }}</span>
          <span class="chip violet">Justificadas · {{ conteo().JUSTIFICADA }}</span>
          <span class="chip gris">Permisos · {{ conteo().PERMISO }}</span>
          <span class="chip gris">Sin marcar · {{ conteo().sinMarcar }}</span>
          <span class="acciones-dia">
            <button type="button" class="btn btn-sm" (click)="todosPresentes()" [disabled]="!visibles().length || cargando()">Marcar presentes a los que faltan marcar</button>
            <button type="button" class="btn btn-primary" [disabled]="guardando() || !modificado() || cargando()" (click)="guardar()">{{ guardando() ? 'Guardando…' : 'Guardar el día' }}</button>
          </span>
        </div>

        <div class="card">
          <div class="table-wrap">
            <table class="table tabla-asistencia">
              <thead><tr><th class="c-persona">Persona</th><th class="c-area">Área</th><th class="c-estado">Asistencia</th><th class="c-hora">Entrada</th><th class="c-hora">Salida</th><th>Observación</th></tr></thead>
              <tbody>
                @for (p of visibles(); track p.id) {
                  @let f = fila(p.id);
                  <tr [class.marcada]="f.estado !== ''">
                    <td class="c-persona">
                      <div class="persona">
                        <span class="avatar-fila" aria-hidden="true">{{ p.nombres.charAt(0) }}{{ p.apellidos.charAt(0) }}</span>
                        <div class="persona-datos"><strong>{{ p.apellidos }}, {{ p.nombres }}</strong><span class="muted">{{ p.cargo || 'Sin cargo indicado' }}</span></div>
                      </div>
                    </td>
                    <td class="c-area"><span class="badge badge-violet">{{ p.areaNombre ?? '—' }}</span></td>
                    <td class="c-estado">
                      <select class="input" [class]="'input est-' + f.estado" [value]="f.estado" [disabled]="cargando()" (change)="cambiarEstado(p.id, $any($event.target).value)" [attr.aria-label]="'Asistencia de ' + p.nombres + ' ' + p.apellidos">
                        <option value="">— Sin marcar —</option>
                        @for (e of estados; track e.id) { <option [value]="e.id" [selected]="f.estado === e.id">{{ e.etiqueta }}</option> }
                      </select>
                    </td>
                    <td class="c-hora"><input class="input" type="time" [value]="f.entrada" [disabled]="!conHoras(f) || cargando()" (change)="cambiarCampo(p.id, 'entrada', $any($event.target).value)" [attr.aria-label]="'Entrada de ' + p.nombres" /></td>
                    <td class="c-hora"><input class="input" type="time" [value]="f.salida" [disabled]="!conHoras(f) || cargando()" (change)="cambiarCampo(p.id, 'salida', $any($event.target).value)" [attr.aria-label]="'Salida de ' + p.nombres" /></td>
                    <td><input class="input" maxlength="255" [value]="f.obs" [disabled]="f.estado === '' || cargando()" placeholder="Motivo, permiso, aviso…" (input)="cambiarCampo(p.id, 'obs', $any($event.target).value)" [attr.aria-label]="'Observación de ' + p.nombres" /></td>
                  </tr>
                } @empty {
                  <tr><td colspan="6" class="vacio">{{ cargando() ? 'Cargando…' : personal().length ? 'Nadie coincide con ese filtro.' : 'Aún no hay personal activo. Regístralo en Personal → Áreas.' }}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      } @else {
        <p class="muted" style="margin: 0">Resumen de {{ nombreMes() }}. El porcentaje cuenta presentes y tardanzas sobre los días en que debía venir (las faltas justificadas y los permisos no lo bajan).</p>
        <div class="card">
          <div class="table-wrap">
            <table class="table tabla-asistencia">
              <thead><tr><th class="c-persona">Persona</th><th class="c-area">Área</th><th class="num">Presente</th><th class="num">Tardanza</th><th class="num">Falta</th><th class="num">Justificada</th><th class="num">Permiso</th><th class="num">Días marcados</th><th class="num">Asistencia</th></tr></thead>
              <tbody>
                @for (p of visibles(); track p.id) {
                  @let s = resumenDe(p.id);
                  <tr>
                    <td class="c-persona">
                      <div class="persona">
                        <span class="avatar-fila" aria-hidden="true">{{ p.nombres.charAt(0) }}{{ p.apellidos.charAt(0) }}</span>
                        <div class="persona-datos"><strong>{{ p.apellidos }}, {{ p.nombres }}</strong><span class="muted">{{ p.cargo || 'Sin cargo indicado' }}</span></div>
                      </div>
                    </td>
                    <td class="c-area"><span class="badge badge-violet">{{ p.areaNombre ?? '—' }}</span></td>
                    <!-- Mientras llegan los datos del mes se muestra «…»: un 0 pasajero parecería «sin faltas». -->
                    <td class="num">{{ cargando() ? '…' : s?.presentes ?? 0 }}</td>
                    <td class="num">{{ cargando() ? '…' : s?.tardanzas ?? 0 }}</td>
                    <td class="num" [class.alerta]="!cargando() && (s?.faltas ?? 0) > 0">{{ cargando() ? '…' : s?.faltas ?? 0 }}</td>
                    <td class="num">{{ cargando() ? '…' : s?.justificadas ?? 0 }}</td>
                    <td class="num">{{ cargando() ? '…' : s?.permisos ?? 0 }}</td>
                    <td class="num">{{ cargando() ? '…' : s?.marcados ?? 0 }}</td>
                    <td class="num">
                      @if (s?.porcentaje != null) { <span [class]="'badge ' + clasePorcentaje(s!.porcentaje!)">{{ s!.porcentaje }}%</span> }
                      @else { <span class="muted">—</span> }
                    </td>
                  </tr>
                } @empty {
                  <tr><td colspan="9" class="vacio">{{ cargando() ? 'Cargando…' : 'No hay personal con ese filtro.' }}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .pestanas { display: flex; gap: 6px; border-bottom: 1px solid var(--line); }
    .pestanas button { padding: 8px 14px; font: inherit; font-weight: 700; color: var(--ink-2); background: none; border: 0; border-bottom: 3px solid transparent; cursor: pointer; }
    .pestanas button.on { color: var(--primary); border-bottom-color: var(--primary); }
    .campo-fecha { display: flex; align-items: center; gap: 8px; font-weight: 600; }
    .chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .chip { padding: 4px 12px; border-radius: 999px; font-size: .8rem; font-weight: 700; }
    .chip.ok { color: var(--ok); background: var(--ok-soft); }
    .chip.warn { color: var(--warn); background: var(--warn-soft); }
    .chip.danger { color: #8e1c12; background: var(--danger-soft); }
    .chip.violet { color: var(--violet); background: var(--violet-soft); }
    .chip.gris { color: var(--ink-2); background: var(--bg); border: 1px solid var(--line); }
    .acciones-dia { margin-left: auto; display: flex; gap: 8px; flex-wrap: wrap; }
    .tabla-asistencia { min-width: 900px; }
    .tabla-asistencia th { text-transform: uppercase; letter-spacing: .05em; font-size: 11px; background: var(--bg); border-bottom: 1px solid var(--line); }
    .tabla-asistencia tbody tr:hover { background: var(--primary-soft); }
    .tabla-asistencia tr.marcada td:first-child { box-shadow: inset 4px 0 0 var(--primary); }
    .tabla-asistencia .c-persona { width: 26%; }
    .tabla-asistencia .c-area { width: 16%; }
    .tabla-asistencia .c-estado { width: 19%; }
    .tabla-asistencia .c-hora { width: 100px; }
    .tabla-asistencia .input { width: 100%; }
    .tabla-asistencia .num { text-align: center; white-space: nowrap; }
    .tabla-asistencia td.alerta { color: #8e1c12; font-weight: 800; }
    .est-PRESENTE { border-color: var(--ok); }
    .est-TARDANZA { border-color: var(--warn); }
    .est-FALTA { border-color: #c0392b; }
    .persona { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .persona-datos { display: flex; flex-direction: column; min-width: 0; }
    .persona-datos strong, .persona-datos .muted { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .persona-datos .muted { font-size: 12px; }
    .avatar-fila { flex: none; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; background: var(--primary-soft); color: var(--primary); font-weight: 800; font-size: .8rem; }
  `
})
export class AsistenciaPersonalComponent implements OnInit {
  private readonly api = inject(AsistenciaPersonalService);
  private readonly plan = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute, { optional: true });

  protected readonly estados = ESTADOS_ASISTENCIA;
  protected readonly hoy = hoyLocal();
  protected readonly mesActual = periodoDe(new Date());

  protected readonly pestana = signal<'dia' | 'mes'>('dia');
  protected readonly areas = signal<Area[]>([]);
  protected readonly personal = signal<Docente[]>([]);
  protected readonly cargando = signal(true);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly fecha = this.fb.nonNullable.control(this.hoy);
  private fechaCargada = this.hoy;
  protected readonly mes = this.fb.nonNullable.control(this.mesActual);
  protected readonly areaFiltro = this.fb.nonNullable.control(0);
  protected readonly busqueda = this.fb.nonNullable.control('');
  private readonly filtroArea = signal(0);
  private readonly filtroTexto = signal('');

  /** Lo marcado en pantalla por persona; lo que no está aquí está sin marcar. */
  protected readonly filas = signal<Record<number, Fila>>({});
  protected readonly modificado = signal(false);
  private readonly registrosMes = signal<AsistenciaPersonal[]>([]);
  private readonly resumenMes = computed(() => resumenPorPersona(this.registrosMes()));

  protected readonly visibles = computed(() => {
    const q = this.filtroTexto().trim().toLowerCase();
    const area = this.filtroArea();
    return this.personal().filter(p => (!area || p.areaId === area)
      && (!q || `${p.apellidos} ${p.nombres} ${p.numeroDocumento}`.toLowerCase().includes(q)));
  });
  protected readonly conteo = computed(() => contar(this.visibles().map(p => this.fila(p.id).estado)));
  private readonly mesElegido = signal(this.mesActual);
  protected readonly nombreMes = computed(() => nombrePeriodo(this.mesElegido()));

  constructor() {
    this.areaFiltro.valueChanges.subscribe(v => this.filtroArea.set(Number(v)));
    this.busqueda.valueChanges.subscribe(v => this.filtroTexto.set(v));
    this.fecha.valueChanges.subscribe(v => void this.alCambiarFecha(v));
    this.mes.valueChanges.subscribe(v => {
      this.mesElegido.set(v);
      this.cargarMes();
    });
  }

  ngOnInit(): void {
    this.plan.areas().pipe(catchError(() => of([] as Area[]))).subscribe(a => {
      this.areas.set(a);
      // Desde la página de un área: «Marcar asistencia del área» llega con ?areaId= y deja filtrada esa área.
      const id = Number(this.route?.snapshot.queryParamMap.get('areaId')) || 0;
      if (id && a.some(x => x.id === id)) this.areaFiltro.setValue(id);
    });
    this.plan.todoElPersonalActivo().subscribe({
      // La lista aparece recién cuando ya se cargó la asistencia del día: si apareciera antes, lo que se marque mientras llega la respuesta
      // se perdería (la respuesta reemplaza lo marcado).
      next: p => this.cargarDia(this.fecha.value, () => this.personal.set(p)),
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar el personal.')); }
    });
  }

  protected fila(id: number): Fila {
    return this.filas()[id] ?? FILA_VACIA;
  }

  protected conHoras(f: Fila): boolean {
    return llevaHoras(f.estado);
  }

  protected resumenDe(id: number) {
    return this.resumenMes().get(id);
  }

  protected clasePorcentaje(p: number): string {
    return p >= 95 ? 'badge-ok' : p >= 85 ? 'badge-warn' : 'badge-danger';
  }

  // ---------- Registro del día ----------
  private cargarDia(fecha: string, alTerminar?: () => void): void {
    this.cargando.set(true);
    this.error.set(null);
    this.api.consultar(fecha, fecha).subscribe({
      next: regs => {
        const filas: Record<number, Fila> = {};
        for (const r of regs) filas[r.personalId] = { estado: r.estado, entrada: horaCorta(r.horaEntrada), salida: horaCorta(r.horaSalida), obs: r.observacion ?? '' };
        this.filas.set(filas);
        this.fechaCargada = fecha;
        this.modificado.set(false);
        this.cargando.set(false);
        alTerminar?.();
      },
      error: e => {
        this.cargando.set(false);
        this.error.set(mensajeError(e, 'No se pudo cargar la asistencia del día.'));
        alTerminar?.();
      }
    });
  }

  private async alCambiarFecha(nueva: string): Promise<void> {
    if (!nueva) return;
    if (this.modificado() && !(await this.confirmacion.confirmar('Tienes cambios sin guardar. ¿Descartarlos y cambiar de fecha?', 'Descartar', true))) {
      this.fecha.setValue(this.fechaCargada, { emitEvent: false });
      return;
    }
    this.cargarDia(nueva);
  }

  private cambiar(id: number, cambio: Partial<Fila>): void {
    if (this.cargando()) return; // lo que llegue del servidor reemplazaría este cambio
    this.filas.update(f => ({ ...f, [id]: { ...(f[id] ?? FILA_VACIA), ...cambio } }));
    this.modificado.set(true);
  }

  protected cambiarEstado(id: number, valor: string): void {
    const estado = valor as EstadoAsistenciaPersonal | '';
    // Las faltas, justificaciones y permisos no llevan horas.
    this.cambiar(id, llevaHoras(estado) ? { estado } : { estado, entrada: '', salida: '', ...(estado === '' ? { obs: '' } : {}) });
  }

  protected cambiarCampo(id: number, campo: 'entrada' | 'salida' | 'obs', valor: string): void {
    this.cambiar(id, { [campo]: valor });
  }

  protected todosPresentes(): void {
    const pendientes = this.visibles().filter(p => this.fila(p.id).estado === '');
    if (!pendientes.length) return this.avisos.info('Todos los que ves ya están marcados.');
    this.filas.update(f => {
      const siguiente = { ...f };
      for (const p of pendientes) siguiente[p.id] = { ...FILA_VACIA, estado: 'PRESENTE' };
      return siguiente;
    });
    this.modificado.set(true);
  }

  protected guardar(): void {
    const marcas: MarcaAsistencia[] = this.personal().map(p => {
      const f = this.fila(p.id);
      return { personalId: p.id, estado: f.estado, horaEntrada: f.entrada || undefined, horaSalida: f.salida || undefined, observacion: f.obs.trim() || undefined };
    });
    if (marcas.some(m => m.horaEntrada && m.horaSalida && m.horaSalida < m.horaEntrada)) {
      return this.avisos.error('Hay una salida anterior a su entrada. Corrígela antes de guardar.');
    }
    this.guardando.set(true);
    this.api.registrarDia(this.fecha.value, marcas).subscribe({
      next: r => {
        this.guardando.set(false);
        this.modificado.set(false);
        this.avisos.success(`Asistencia guardada (${r.guardadas} ${r.guardadas === 1 ? 'registro' : 'registros'}).`);
      },
      error: e => { this.guardando.set(false); this.avisos.error(mensajeError(e)); }
    });
  }

  // ---------- Resumen del mes ----------
  protected async irAMes(): Promise<void> {
    if (this.modificado() && !(await this.confirmacion.confirmar('Tienes cambios sin guardar en el día. ¿Descartarlos?', 'Descartar', true))) return;
    if (this.modificado()) this.cargarDia(this.fechaCargada);
    this.pestana.set('mes');
    this.cargarMes();
  }

  private cargarMes(): void {
    if (!/^\d{4}-\d{2}$/.test(this.mes.value)) return;
    const { desde, hasta } = rangoDelMes(this.mes.value);
    this.cargando.set(true);
    this.api.consultar(desde, hasta).subscribe({
      next: regs => { this.registrosMes.set(regs); this.cargando.set(false); },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar el resumen del mes.')); }
    });
  }
}
