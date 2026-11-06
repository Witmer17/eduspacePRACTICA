import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { proponerNuevoPeriodo } from '../../dashboard/periodo-actual';
import { diaSiguiente, fechaCorta } from '../../personal/rrhh';
import { Anio, EstadoPlan, Periodo } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DURACIONES, Duracion, REGIMENES, Regimen, avisosDelPeriodo, esNombreAutomatico, finDelPeriodo, nombreDePeriodo, proponerPeriodos } from './regimen-periodos';
import { diasEntre } from '../../dashboard/periodo-actual';
import { avisosDelAnio, fechasDelAnio, proponerAnio } from './propuesta-anio';

type Dialogo = 'ninguno' | 'anio' | 'periodo' | 'regimen';

const CLASE_ESTADO: Record<EstadoPlan, string> = { PLANIFICADO: 'badge-warn', ACTIVO: 'badge-ok', CERRADO: 'badge-gray' };
const SIGUIENTE: Record<EstadoPlan, EstadoPlan | null> = { PLANIFICADO: 'ACTIVO', ACTIVO: 'CERRADO', CERRADO: null };

@Component({
  selector: 'app-anios',
  imports: [ReactiveFormsModule, DatePipe, RouterLink, ModalComponent, PageHeaderComponent],
  templateUrl: './anios.component.html',
  styles: `
    .btn-icono { display: inline-grid; place-items: center; width: 32px; height: 32px; padding: 0; vertical-align: middle; }
    .btn-icono svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .btn-borrar:not(:disabled):hover { color: var(--danger, #c0392b); border-color: var(--danger, #c0392b); }
    .regimenes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .regimen { display: flex; flex-direction: column; gap: 3px; padding: 14px; text-align: left; border: 1.5px solid var(--line-2); border-radius: 14px; background: var(--card); cursor: pointer; font: inherit; color: inherit; }
    .regimen span { font-size: .78rem; color: var(--ink-2); }
    .regimen:hover { border-color: var(--primary); }
    .regimen.on { border-color: var(--primary); background: var(--primary-soft); box-shadow: inset 0 0 0 1px var(--primary); }
    .regimen:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
    @media (max-width: 560px) { .regimenes { grid-template-columns: 1fr; } }
    .atajos-duracion { display: flex; flex-wrap: wrap; gap: 8px; }
    .atajo-d { display: flex; flex-direction: column; align-items: flex-start; gap: 1px; padding: 7px 12px; font: inherit; color: inherit; cursor: pointer; background: var(--card); border: 1.5px solid var(--line-2); border-radius: 12px; }
    .atajo-d strong { font-size: .88rem; }
    .atajo-d small { color: var(--ink-2); font-size: .72rem; }
    .atajo-d:hover { border-color: var(--primary); }
    .atajo-d.on { border-color: var(--primary); background: var(--primary-soft); box-shadow: inset 3px 0 0 var(--primary); }
    .crear-anio { align-self: flex-start; padding: 0; background: none; border: 0; font: inherit; font-weight: 700; font-size: .85rem; color: var(--primary); cursor: pointer; }
    .crear-anio:hover { text-decoration: underline; }
    .atajo-fechas { align-self: flex-start; padding: 4px 10px; font: inherit; font-size: .8rem; font-weight: 600; color: var(--primary); background: var(--primary-soft); border: 1.5px solid transparent; border-radius: 999px; cursor: pointer; }
    .atajo-fechas:hover { border-color: var(--primary); }
    .resumen-periodo { margin: 10px 0 0; font-weight: 700; font-variant-numeric: tabular-nums; }
  `
})
export class AniosComponent implements OnInit {
  private readonly api = inject(PlanificacionService);

  /** En planificación solo el ADMIN escribe (horarios, asignaciones y docentes también los edita SECRETARIA). */
  protected readonly puedeEditar = inject(AuthService).isAdmin;
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);
  /** ?nuevoPeriodo=1 (botón «Nuevo periodo» del inicio): abre directamente el formulario de un periodo nuevo. */
  private readonly consulta = inject(ActivatedRoute, { optional: true })?.snapshot.queryParamMap;
  private abrirNuevoPeriodo = this.consulta?.get('nuevoPeriodo') === '1';
  /** ?nuevoAnio=1 (botón «+ Nuevo año» del inicio): abre directamente el formulario de un año nuevo. */
  private abrirNuevoAnio = this.consulta?.get('nuevoAnio') === '1';
  /** El año se está creando desde el formulario de periodo: al guardarlo (o cancelar) se vuelve a ese formulario. */
  private volverAPeriodo = false;

  protected readonly anios = signal<Anio[]>([]);
  protected readonly periodos = signal<Periodo[]>([]);
  protected readonly anioSel = signal<Anio | null>(null);
  protected readonly dialogo = signal<Dialogo>('ninguno');
  protected readonly editando = signal<Anio | Periodo | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly formAnio = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required]
  });

  protected readonly formPeriodo = this.fb.nonNullable.group({
    anioId: [0, [Validators.required, Validators.min(1)]],
    numero: [1, [Validators.required, Validators.min(1)]],
    nombre: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required]
  });

  // --- Duración rápida al crear un periodo a mano: 2, 3, 4 o 6 meses desde el inicio, o hasta el fin del año ---
  protected readonly duraciones = DURACIONES;
  private readonly vistaPeriodo = signal(this.formPeriodo.getRawValue());
  /** El año al que se le agrega el periodo (campo «Año académico» del formulario) y los periodos que ya tiene (para proponer y avisar cruces). */
  protected readonly anioDelForm = computed(() => this.anios().find(a => a.id === this.vistaPeriodo().anioId) ?? null);
  private readonly periodosDelForm = signal<Periodo[]>([]);
  /** Años donde se puede crear un periodo: los que no están cerrados (más el del periodo que se edita). */
  protected readonly aniosParaPeriodo = computed(() => this.anios().filter(a => a.estado !== 'CERRADO' || a.id === this.vistaPeriodo().anioId));
  protected readonly duracionActiva = computed(() => {
    const v = this.vistaPeriodo();
    return v.fechaInicio && v.fechaFin ? DURACIONES.find(d => finDelPeriodo(v.fechaInicio, d.meses, this.anioDelForm()?.fechaFin).fin === v.fechaFin)?.meses ?? 0 : 0;
  });
  protected readonly hastaFinDeAnioActivo = computed(() => !!this.anioDelForm() && this.vistaPeriodo().fechaFin === this.anioDelForm()!.fechaFin);
  /** «Del 12 oct al 18 dic · 68 días»: lo que quedaría con las fechas escritas. */
  protected readonly resumenPeriodo = computed(() => {
    const v = this.vistaPeriodo();
    if (!v.fechaInicio || !v.fechaFin || v.fechaFin < v.fechaInicio) return '';
    const dias = diasEntre(v.fechaInicio, v.fechaFin) + 1;
    return `${fechaCorta(v.fechaInicio)} → ${fechaCorta(v.fechaFin)} · ${dias} ${dias === 1 ? 'día' : 'días'}`;
  });
  protected readonly avisosPeriodo = computed(() => {
    const v = this.vistaPeriodo();
    return avisosDelPeriodo(v.fechaInicio, v.fechaFin, this.anioDelForm(), this.periodosDelForm(), (this.editando() as Periodo | null)?.id ?? null);
  });

  // --- Año nuevo: nombre y fechas propuestos, y avisos de nombre repetido o cruce de fechas ---
  private readonly vistaAnio = signal(this.formAnio.getRawValue());
  protected readonly avisosAnio = computed(() => {
    const v = this.vistaAnio();
    return avisosDelAnio(v.nombre, v.fechaInicio, v.fechaFin, this.anios(), (this.editando() as Anio | null)?.id ?? null);
  });
  private nombreAnioAnterior = '';
  private reiniciandoAnio = false;

  constructor() {
    this.formPeriodo.valueChanges.subscribe(() => this.vistaPeriodo.set(this.formPeriodo.getRawValue()));
    this.formAnio.valueChanges.subscribe(() => this.vistaAnio.set(this.formAnio.getRawValue()));
    // Al escribir otro año («2028»), las fechas se ajustan solas mientras sigan siendo las propuestas (o estén vacías); las que se escribieron a mano se respetan.
    this.formAnio.controls.nombre.valueChanges.subscribe(nombre => {
      if (this.reiniciandoAnio) return;
      const c = this.formAnio.controls;
      const antes = fechasDelAnio(this.nombreAnioAnterior);
      const sinTocar = (!c.fechaInicio.value && !c.fechaFin.value) || (!!antes && c.fechaInicio.value === antes.fechaInicio && c.fechaFin.value === antes.fechaFin);
      const nuevas = fechasDelAnio(nombre);
      if (nuevas && sinTocar) c.fechaInicio.setValue(nuevas.fechaInicio), c.fechaFin.setValue(nuevas.fechaFin);
      this.nombreAnioAnterior = nombre;
    });
  }

  /** «Usar las fechas habituales»: primer lunes de marzo → último viernes hasta el 20 de diciembre del año escrito. */
  protected fechasHabitualesDelAnio(): void {
    const f = fechasDelAnio(this.formAnio.controls.nombre.value);
    if (!f) return this.errorForm.set('Escribe el nombre como un año de 4 dígitos (por ejemplo 2027) para proponer las fechas.');
    this.errorForm.set(null);
    this.formAnio.patchValue(f);
  }

  /** Desde el formulario de periodo: crear el año que falta y volver al periodo ya con ese año elegido. */
  protected crearAnioDesdePeriodo(): void {
    this.volverAPeriodo = true;
    this.nuevoAnio();
  }

  /** Pone el fin a {@code meses} meses del inicio (sin pasar del fin del año) y, si el nombre se armó solo, lo cambia a «Trimestre 3», «Semestre 1»… */
  protected elegirDuracion(d: Duracion): void {
    const c = this.formPeriodo.controls;
    if (!c.fechaInicio.value) return this.errorForm.set('Elige primero la fecha de inicio.');
    this.errorForm.set(null);
    c.fechaFin.setValue(finDelPeriodo(c.fechaInicio.value, d.meses, this.anioDelForm()?.fechaFin).fin);
    if (esNombreAutomatico(c.nombre.value)) c.nombre.setValue(nombreDePeriodo(d.singular, c.numero.value));
  }

  protected hastaFinDeAnio(): void {
    const c = this.formPeriodo.controls;
    const anio = this.anioDelForm();
    if (!anio) return;
    if (!c.fechaInicio.value) return this.errorForm.set('Elige primero la fecha de inicio.');
    this.errorForm.set(null);
    c.fechaFin.setValue(anio.fechaFin);
  }

  protected readonly fechaCorta = fechaCorta;

  // --- Régimen de periodos: bimestres, trimestres o semestres, con las fechas repartidas por todo el año ---
  protected readonly regimenes = REGIMENES;
  protected readonly regimen = signal<Regimen>('BIMESTRE');
  protected readonly propuesta = computed(() => {
    const a = this.anioSel();
    return a ? proponerPeriodos(this.regimen(), a.fechaInicio, a.fechaFin) : [];
  });
  /** Se pueden rehacer los periodos mientras ninguno haya empezado (todos PLANIFICADO). */
  protected readonly sePuedeRedefinir = computed(() => this.periodos().every(p => p.estado === 'PLANIFICADO'));

  ngOnInit(): void {
    this.cargarAnios();
  }

  protected definirPeriodos(): void {
    this.regimen.set(this.periodos().length === 3 ? 'TRIMESTRE' : this.periodos().length === 2 ? 'SEMESTRE' : 'BIMESTRE');
    this.abrir('regimen', null);
  }

  protected crearPeriodosDelRegimen(): void {
    const anio = this.anioSel();
    const nuevos = this.propuesta();
    if (!anio || nuevos.length === 0) return;
    // Si ya había periodos (todos sin empezar), se reemplazan por los del régimen elegido.
    const borrar = this.periodos().map(p => this.api.eliminarPeriodo(p.id));
    this.ejecutar(borrar.length ? forkJoin(borrar) : of([] as void[]), () => {
      this.ejecutar(forkJoin(nuevos.map(p => this.api.crearPeriodo({ anioId: anio.id, ...p }))), () => {
        this.avisos.success(`Se crearon ${nuevos.length} periodos (${REGIMENES.find(r => r.id === this.regimen())!.etiqueta.toLowerCase()}).`);
        this.cerrar();
        this.seleccionar(anio);
      });
    });
  }

  protected clase(e: EstadoPlan): string {
    return CLASE_ESTADO[e];
  }

  protected siguiente(e: EstadoPlan): EstadoPlan | null {
    return SIGUIENTE[e];
  }

  private cargarAnios(seleccionarId?: number): void {
    this.api.anios().subscribe({
      next: lista => {
        this.anios.set(lista);
        const actual = lista.find(a => a.id === (seleccionarId ?? this.anioSel()?.id)) ?? lista.find(a => a.estado === 'ACTIVO') ?? lista[0] ?? null;
        this.seleccionar(actual);
        // Llegó desde el inicio con «+ Nuevo año»: se abre el formulario (una sola vez).
        if (this.abrirNuevoAnio && this.puedeEditar()) { this.abrirNuevoAnio = false; this.nuevoAnio(); }
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar los años.'))
    });
  }

  protected seleccionar(a: Anio | null): void {
    this.anioSel.set(a);
    this.periodos.set([]);
    if (a) {
      this.api.periodos(a.id).subscribe({
        next: p => {
          this.periodos.set(p);
          // Llegó desde el inicio con «Nuevo periodo»: se abre el formulario (una sola vez) cuando ya se conocen los periodos del año.
          if (this.abrirNuevoPeriodo && this.puedeEditar() && a.estado !== 'CERRADO') {
            this.abrirNuevoPeriodo = false;
            this.nuevoPeriodo();
          }
        },
        error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar los periodos.'))
      });
    }
  }

  // --- Años ---
  protected nuevoAnio(): void {
    const p = proponerAnio(this.anios());
    this.reiniciandoAnio = true;
    this.formAnio.reset({ nombre: p.nombre, fechaInicio: p.fechaInicio, fechaFin: p.fechaFin });
    this.reiniciandoAnio = false;
    this.nombreAnioAnterior = p.nombre;
    this.vistaAnio.set(this.formAnio.getRawValue());
    this.abrir('anio', null);
  }

  protected editarAnio(a: Anio): void {
    this.reiniciandoAnio = true;
    this.formAnio.reset({ nombre: a.nombre, fechaInicio: a.fechaInicio, fechaFin: a.fechaFin });
    this.reiniciandoAnio = false;
    this.nombreAnioAnterior = a.nombre;
    this.vistaAnio.set(this.formAnio.getRawValue());
    this.abrir('anio', a);
  }

  protected guardarAnio(): void {
    if (this.formAnio.invalid) {
      this.formAnio.markAllAsTouched();
      return;
    }
    const body = this.formAnio.getRawValue();
    const e = this.editando() as Anio | null;
    this.ejecutar(e ? this.api.actualizarAnio(e.id, body) : this.api.crearAnio(body), a => {
      this.avisos.success(e ? 'Año actualizado.' : 'Año creado.');
      // Venía del formulario de periodo: se vuelve a él con el año recién creado (se abre al cargar sus periodos).
      if (this.volverAPeriodo) { this.volverAPeriodo = false; this.abrirNuevoPeriodo = true; }
      this.cerrar();
      this.cargarAnios(a.id);
    });
  }

  protected async activarAnio(a: Anio): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Activar el año ${a.nombre}? El año activo actual dejará de serlo.`, 'Activar'))) return;
    this.api.activarAnio(a.id).subscribe({
      next: () => {
        this.avisos.success(`Año ${a.nombre} activado.`);
        this.cargarAnios(a.id);
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  protected async cerrarAnio(a: Anio): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Cerrar el año ${a.nombre}? Esta acción termina el ciclo académico.`, 'Cerrar año', true))) return;
    this.api.cerrarAnio(a.id).subscribe({
      next: () => {
        this.avisos.success(`Año ${a.nombre} cerrado.`);
        this.cargarAnios(a.id);
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  // --- Periodos ---
  protected nuevoPeriodo(): void {
    const anio = this.anioSel();
    this.periodosDelForm.set(this.periodos());
    this.formPeriodo.controls.anioId.enable();
    this.formPeriodo.reset({ anioId: anio?.id ?? 0, ...this.propuestaPara(anio, this.periodos()), fechaFin: '' });
    this.vistaPeriodo.set(this.formPeriodo.getRawValue());
    this.abrir('periodo', null);
  }

  /** Sigue al último periodo del año: su número, su nombre («Bimestre 2» → «Bimestre 3») y empieza el día después de que termina (si cabe en el año). */
  private propuestaPara(anio: Anio | null, periodos: readonly Periodo[]): { numero: number; nombre: string; fechaInicio: string } {
    const p = proponerNuevoPeriodo(periodos);
    const despues = p.ultimoFin ? diaSiguiente(p.ultimoFin) : '';
    // Si el último ya termina con el año, no se propone fecha (cualquiera estaría fuera del año): se elige a mano.
    const inicio = p.ultimoFin ? (despues && (!anio || despues <= anio.fechaFin) ? despues : '') : anio?.fechaInicio ?? '';
    return { numero: p.numero, nombre: p.nombre, fechaInicio: inicio };
  }

  /** Se cambió el «Año académico» del formulario: se traen sus periodos y se vuelve a proponer número, nombre e inicio (el fin se elige de nuevo). */
  protected alCambiarAnioDelPeriodo(): void {
    // El valor del <select> trae el formato de Angular («2: 2»): se lee del control, ya actualizado, y no del evento.
    queueMicrotask(() => this.elegirAnioDelPeriodo(this.formPeriodo.controls.anioId.value));
  }

  private elegirAnioDelPeriodo(id: number): void {
    const anio = this.anios().find(a => a.id === id) ?? null;
    this.errorForm.set(null);
    if (!anio) return;
    const aplicar = (lista: Periodo[]): void => {
      this.periodosDelForm.set(lista);
      if (this.editando()) return;
      this.formPeriodo.patchValue({ ...this.propuestaPara(anio, lista), fechaFin: '' });
    };
    if (anio.id === this.anioSel()?.id) return aplicar(this.periodos());
    this.api.periodos(anio.id).subscribe({ next: aplicar, error: e => this.errorForm.set(mensajeError(e, 'No se pudieron cargar los periodos de ese año.')) });
  }

  protected editarPeriodo(p: Periodo): void {
    this.periodosDelForm.set(this.periodos());
    this.formPeriodo.reset({ anioId: p.anioId, numero: p.numero, nombre: p.nombre, fechaInicio: p.fechaInicio, fechaFin: p.fechaFin });
    this.vistaPeriodo.set(this.formPeriodo.getRawValue());
    this.formPeriodo.controls.anioId.disable();   // un periodo no cambia de año
    this.abrir('periodo', p);
  }

  protected guardarPeriodo(): void {
    const anio = this.anioDelForm();
    if (this.formPeriodo.invalid || !anio) {
      this.formPeriodo.markAllAsTouched();
      this.errorForm.set(anio ? null : 'Elige el año académico del periodo.');
      return;
    }
    const body = this.formPeriodo.getRawValue();
    const e = this.editando() as Periodo | null;
    this.ejecutar(e ? this.api.actualizarPeriodo(e.id, body) : this.api.crearPeriodo(body), () => {
      this.avisos.success(e ? 'Periodo actualizado.' : 'Periodo creado.');
      this.cerrar();
      this.seleccionar(anio);
    });
  }

  protected avanzarPeriodo(p: Periodo): void {
    const sig = SIGUIENTE[p.estado];
    if (!sig) return;
    this.api.cambiarEstadoPeriodo(p.id, sig).subscribe({
      next: () => {
        this.avisos.success(`Periodo ${p.nombre}: ${sig.toLowerCase()}.`);
        this.seleccionar(this.anioSel());
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  protected async eliminarPeriodo(p: Periodo): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Eliminar el periodo ${p.nombre}?`, 'Eliminar', true))) return;
    this.api.eliminarPeriodo(p.id).subscribe({
      next: () => {
        this.avisos.success('Periodo eliminado.');
        this.seleccionar(this.anioSel());
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  // --- comunes ---
  protected cerrar(): void {
    // Cancelar el año que se creaba desde el periodo: se regresa al formulario de periodo.
    if (this.dialogo() === 'anio' && this.volverAPeriodo) {
      this.volverAPeriodo = false;
      this.errorForm.set(null);
      this.nuevoPeriodo();
      return;
    }
    this.dialogo.set('ninguno');
    this.editando.set(null);
    this.errorForm.set(null);
  }

  private abrir(d: Dialogo, e: Anio | Periodo | null): void {
    this.errorForm.set(null);
    this.editando.set(e);
    this.dialogo.set(d);
  }

  private ejecutar<T>(obs: Observable<T>, ok: (r: T) => void): void {
    this.guardando.set(true);
    this.errorForm.set(null);
    obs.subscribe({
      next: r => {
        this.guardando.set(false);
        ok(r);
      },
      error: e => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(e));
      }
    });
  }
}
