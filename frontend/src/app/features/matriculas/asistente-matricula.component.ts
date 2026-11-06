import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, forkJoin, of, retry, switchMap } from 'rxjs';
import { OpcionDescuento, SolicitudDescuento } from '../../core/models/cobro.model';
import { CobroService } from '../../core/services/cobro.service';
import { VerificacionHermano, motivoHermano, puedePedirDescuento, verificarHermano } from './hermano-descuento';
import { Alumno, AlumnoCreate, AlumnoResumen, Apoderado, Documento, PARENTESCOS, Parentesco, TipoDocumento, Vinculo, VinculoApoderadoRequest } from '../../core/models/alumno.model';
import { Cupo, Matricula, OpcionPlanPago, PlanPago, TIPOS_MATRICULA, TipoMatricula } from '../../core/models/matricula.model';
import { Tarifa } from '../../core/models/pago.model';
import { PagoConfigService } from '../../core/services/pago-config.service';
import { AYUDA_PLAN, PLANES_PAGO, resumenDelPlan, tarifaPension } from './plan-pago';
import { Anio, Seccion } from '../../core/models/planificacion.model';
import { AlumnoService } from '../../core/services/alumno.service';
import { MatriculaService } from '../../core/services/matricula.service';
import { NotificationService } from '../../core/services/notification.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { BuscadorAlumnoComponent } from '../../shared/components/buscador-alumno/buscador-alumno.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { CLASE_SITUACION, OpcionSeccion, Situacion, TEXTO_SITUACION, opcionesSeccion, puedeMatricular, situacionDe } from '../alumnos/matricula-alumno';
import { TipoRequerido } from '../documentos/documentos';
import { DocumentosDatosService } from '../documentos/documentos-datos.service';
import {
  ETIQUETA_DOCUMENTO, FilaDocumento, PASOS_MATRICULA, PasoMatricula, estadoDelExpediente, expedienteCompleto, indicePaso, pasoAnterior, puedeAvanzar, siguientePaso
} from './asistente-matricula';

const limpio = (s: string): string | undefined => s.trim() || undefined;

/**
 * Asistente de matrícula, paso a paso para la secretaría: 1) alumno (existente o nuevo), 2) familia (apoderado y responsable de pago),
 * 3) documentos requeridos (subir y verificar), 4) grado y sección con vacantes, 5) confirmar. Crea la pre-matrícula; se confirma cuando
 * se paga la matrícula en caja y luego se aprueba.
 */
@Component({
  selector: 'app-asistente-matricula',
  imports: [ReactiveFormsModule, DatePipe, RouterLink, BuscadorAlumnoComponent, PageHeaderComponent],
  templateUrl: './asistente-matricula.component.html',
  styleUrl: './asistente-matricula.component.css'
})
export class AsistenteMatriculaComponent implements OnInit {
  private readonly alumnosApi = inject(AlumnoService);
  private readonly generadorDocs = inject(DocumentosDatosService);
  private readonly matriculasApi = inject(MatriculaService);
  private readonly plan = inject(PlanificacionService);
  private readonly pagoConfig = inject(PagoConfigService);
  private readonly cobroApi = inject(CobroService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly ruta = inject(ActivatedRoute);

  protected readonly pasos = PASOS_MATRICULA;
  protected readonly parentescos = PARENTESCOS;
  protected readonly tiposMatricula = TIPOS_MATRICULA;
  protected readonly etiquetaDoc = ETIQUETA_DOCUMENTO;
  protected readonly indice = indicePaso;

  protected readonly paso = signal<PasoMatricula>('alumno');
  protected readonly ocupado = signal(false);
  protected readonly error = signal<string | null>(null);

  // --- el año y sus secciones ---
  protected readonly anio = signal<Anio | null>(null);
  protected readonly cargandoAnio = signal(true);
  private readonly secciones = signal<Seccion[]>([]);
  private readonly cupos = signal<Cupo[]>([]);
  private readonly matriculasAnio = signal<Matricula[]>([]);
  protected readonly opciones = computed<OpcionSeccion[]>(() => opcionesSeccion(this.secciones(), this.cupos()));
  protected readonly grados = computed(() => [...new Set(this.opciones().map(o => o.seccion.gradoNombre))]);
  protected readonly gradoElegido = signal('');
  protected readonly seccionesDelGrado = computed(() => this.opciones().filter(o => o.seccion.gradoNombre === this.gradoElegido()));

  // --- paso 1: alumno ---
  protected readonly modo = signal<'existente' | 'nuevo'>('existente');
  protected readonly alumno = signal<Alumno | null>(null);
  protected readonly bloqueo = signal<string | null>(null);
  protected readonly verificando = signal(false);
  protected readonly formAlumno = this.fb.nonNullable.group({
    tipoDocumento: ['DNI'],
    numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: [''],
    fechaNacimiento: ['', Validators.required],
    sexo: ['', Validators.required],
    direccion: [''],
    distrito: [''],
    telefono: [''],
    email: ['', Validators.email],
    colegioProcedencia: ['']
  });

  // --- paso 2: familia ---
  protected readonly vinculos = signal<Vinculo[]>([]);
  protected readonly apoderadoExistente = signal(false);
  protected readonly apoderadoElegido = signal<Apoderado | null>(null);
  protected readonly resultadosApoderado = signal<Apoderado[]>([]);
  protected readonly busquedaApoderado = this.fb.nonNullable.control('');
  protected readonly formApoderado = this.fb.nonNullable.group({
    parentesco: ['MADRE' as Parentesco, Validators.required],
    tipoDocumento: ['DNI'],
    numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    telefono: [''],
    email: ['', Validators.email]
  });

  // --- paso 3: documentos ---
  protected readonly documentos = signal<Documento[]>([]);
  protected readonly filasDocumentos = computed<FilaDocumento[]>(() => estadoDelExpediente(this.documentos()));
  protected readonly expediente = computed(() => expedienteCompleto(this.documentos()));
  protected readonly subiendo = signal<TipoDocumento | null>(null);
  protected readonly generando = signal(false);
  protected readonly faltan = computed(() => this.filasDocumentos().filter(f => f.estado === 'falta').map(f => f.tipo as TipoRequerido));
  protected readonly sinVerificar = computed(() => this.filasDocumentos().filter(f => f.estado === 'sin-verificar'));

  // --- paso 4 y 5: sección y confirmación ---
  protected readonly formMatricula = this.fb.nonNullable.group({
    seccionId: [0, [Validators.required, Validators.min(1)]],
    tipo: ['NUEVA' as TipoMatricula, Validators.required],
    observaciones: ['']
  });
  protected readonly seccionId = signal(0);
  protected readonly seccionElegida = computed(() => this.opciones().find(o => o.seccion.id === this.seccionId()) ?? null);

  // --- forma de pago de las pensiones (acuerdo de la matrícula) ---
  protected readonly planElegido = signal<PlanPago>('MENSUAL');
  private readonly planesServidor = signal<OpcionPlanPago[]>([]);
  private readonly tarifas = signal<Tarifa[]>([]);
  protected readonly tarifaDeLaSeccion = computed(() => tarifaPension(this.tarifas(), this.seccionElegida()?.seccion ?? null));
  /** Las cuatro formas de pago con su costo; sin tarifa de pensión solo se muestra el nombre y el descuento. */
  protected readonly planes = computed(() => {
    const t = this.tarifaDeLaSeccion();
    const porId = new Map(this.planesServidor().map(p => [p.id, p]));
    return PLANES_PAGO.map(id => {
      const op = porId.get(id);
      const porcentaje = op?.descuentoPorcentaje ?? (id === 'SEMESTRAL' ? 5 : id === 'ANUAL' ? 10 : 0);
      return {
        id,
        etiqueta: op?.etiqueta ?? id.charAt(0) + id.slice(1).toLowerCase(),
        ayuda: AYUDA_PLAN[id],
        porcentaje,
        resumen: t ? resumenDelPlan(t.monto, t.numCuotas, id, porcentaje) : null
      };
    });
  });
  protected readonly planActual = computed(() => this.planes().find(p => p.id === this.planElegido()) ?? this.planes()[0]);
  protected readonly resultado = signal<Matricula | null>(null);

  // --- descuento por hermano matriculado: la secretaría busca al hermano, comprueba sus datos y los confirma ---
  protected readonly conHermano = signal(false);
  protected readonly hermano = signal<Alumno | null>(null);
  protected readonly situacionHermano = signal<Situacion | null>(null);
  protected readonly ubicacionHermano = signal<string | null>(null);
  protected readonly verificacionHermano = signal<VerificacionHermano | null>(null);
  protected readonly verificandoHermano = signal(false);
  protected readonly errorHermano = signal<string | null>(null);
  protected readonly hermanoConfirmado = signal(false);
  protected readonly opcionesDescuento = signal<OpcionDescuento[]>([]);
  protected readonly descuentoId = signal(0);
  protected readonly textoSituacion = TEXTO_SITUACION;
  protected readonly claseSituacion = CLASE_SITUACION;
  /** La solicitud que se pidió al matricular (queda en revisión hasta aprobarla) y su resultado. */
  protected readonly solicitud = signal<SolicitudDescuento | null>(null);
  protected readonly errorSolicitud = signal<string | null>(null);
  protected readonly resolviendoSolicitud = signal(false);
  protected readonly descuentoElegido = computed(() => this.opcionesDescuento().find(o => o.id === this.descuentoId()) ?? null);
  /** Con el descuento por hermano marcado, hacen falta todos los datos confirmados para poder matricular. */
  protected readonly hermanoListo = computed(() =>
    !this.conHermano() || puedePedirDescuento(this.verificacionHermano(), this.descuentoId(), this.hermanoConfirmado()));

  /** El estado de los formularios no es una señal: este contador fuerza a recalcular `avance` cuando cambian. */
  private readonly tick = signal(0);

  /** Lo que ya tiene el paso actual para poder seguir. */
  protected readonly avance = computed(() => {
    this.tick();
    const nuevo = this.modo() === 'nuevo';
    return puedeAvanzar(this.paso(), {
      alumnoListo: nuevo ? this.formAlumno.valid : !!this.alumno() && !this.bloqueo(),
      motivoBloqueo: this.bloqueo() ?? undefined,
      familiaLista: this.vinculos().length > 0 || (this.apoderadoExistente() ? !!this.apoderadoElegido() : this.formApoderado.valid),
      expediente: this.expediente(),
      seccionElegida: !!this.seccionElegida()?.disponible
    });
  });

  constructor() {
    // El estado de los formularios no es una señal: se vuelve a calcular `avance` cuando cambian.
    this.formAlumno.valueChanges.subscribe(() => this.refrescarAvance());
    this.formApoderado.valueChanges.subscribe(() => this.refrescarAvance());
  }

  private refrescarAvance(): void {
    this.tick.update(n => n + 1);
  }

  ngOnInit(): void {
    this.plan.anios().pipe(catchError(() => of([] as Anio[]))).subscribe(anios => {
      const activo = anios.find(x => x.estado === 'ACTIVO') ?? null;
      this.anio.set(activo);
      if (!activo) { this.cargandoAnio.set(false); return; }
      forkJoin({
        secciones: this.plan.secciones(activo.id).pipe(catchError(() => of([] as Seccion[]))),
        cupos: this.matriculasApi.cupos(activo.id).pipe(catchError(() => of([] as Cupo[])))
      }).subscribe(r => {
        this.secciones.set(r.secciones);
        this.cupos.set(r.cupos);
        this.cargandoAnio.set(false);
        // Desde la lista de alumnos se llega con ?alumnoId= (se salta la búsqueda). Recién registrado, con ?paso=documentos:
        // ya tiene apoderado, así que se sigue por los documentos.
        const id = Number(this.ruta.snapshot.queryParamMap.get('alumnoId'));
        const paso = this.ruta.snapshot.queryParamMap.get('paso');
        if (id) {
          this.elegirPorId(id, undefined, () => {
            if (paso === 'documentos' && this.alumno() && !this.bloqueo() && this.vinculos().length) this.ir('documentos');
          });
        }
      });
    });
  }

  // ---------- Paso 1: alumno ----------
  protected cambiarModo(m: 'existente' | 'nuevo'): void {
    this.modo.set(m);
    this.error.set(null);
    this.alumno.set(null);
    this.bloqueo.set(null);
  }

  protected elegirAlumno(a: AlumnoResumen | null): void {
    this.alumno.set(null);
    this.bloqueo.set(null);
    if (a) this.elegirPorId(a.id, a);
  }

  private elegirPorId(id: number, resumen?: AlumnoResumen, despues?: () => void): void {
    this.verificando.set(true);
    this.error.set(null);
    this.alumnosApi.obtener(id).subscribe({
      next: a => {
        // ¿Ya tiene matrícula este año? Se mira en las matrículas del año de ese alumno.
        this.matriculasApi.listar({ anioId: this.anio()?.id, texto: resumen?.nombreCompleto ?? a.nombreCompleto, size: 50 }).pipe(catchError(() => of(null))).subscribe(p => {
          const sit = situacionDe(a.id, p?.contenido ?? []);
          const v = puedeMatricular(a.estado, sit, !!this.anio());
          this.alumno.set(a);
          this.bloqueo.set(v.puede ? null : v.motivo ?? 'No se puede matricular.');
          this.vinculos.set(a.apoderados ?? []);
          this.verificando.set(false);
          despues?.();
        });
      },
      error: e => { this.verificando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar al alumno.')); }
    });
  }

  // ---------- Paso 2: familia ----------
  protected modoApoderado(existente: boolean): void {
    this.apoderadoExistente.set(existente);
    this.apoderadoElegido.set(null);
  }

  protected buscarApoderado(): void {
    const q = this.busquedaApoderado.value.trim();
    if (q.length < 2) { this.resultadosApoderado.set([]); return; }
    this.alumnosApi.buscarApoderados(q).subscribe({
      next: p => this.resultadosApoderado.set(p.contenido),
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  protected elegirApoderado(a: Apoderado): void {
    this.apoderadoElegido.set(a);
    this.resultadosApoderado.set([]);
  }

  private vinculoPedido(): VinculoApoderadoRequest {
    const v = this.formApoderado.getRawValue();
    return {
      parentesco: v.parentesco,
      esPrincipal: true,
      esResponsablePago: true,
      viveConAlumno: true,
      puedeRecoger: true,
      ...(this.apoderadoExistente()
        ? { apoderadoId: this.apoderadoElegido()!.id }
        : { apoderado: { tipoDocumento: v.tipoDocumento, numeroDocumento: v.numeroDocumento.trim(), nombres: v.nombres.trim(), apellidos: v.apellidos.trim(), telefono: limpio(v.telefono), email: limpio(v.email) } })
    };
  }

  // ---------- Paso 3: documentos ----------
  private cargarDocumentos(): void {
    const a = this.alumno();
    if (!a) return;
    this.alumnosApi.documentos(a.id).pipe(catchError(() => of([] as Documento[]))).subscribe(d => this.documentos.set(d));
  }

  protected subir(tipo: TipoDocumento, entrada: HTMLInputElement): void {
    const a = this.alumno();
    const archivo = entrada.files?.[0];
    if (!a || !archivo) return;
    this.subiendo.set(tipo);
    this.alumnosApi.subirDocumento(a.id, tipo, archivo).subscribe({
      next: () => { this.subiendo.set(null); entrada.value = ''; this.avisos.success('Documento subido. Verifícalo cuando hayas revisado el original.'); this.cargarDocumentos(); },
      error: e => { this.subiendo.set(null); entrada.value = ''; this.avisos.error(mensajeError(e, 'No se pudo subir el documento.')); }
    });
  }

  /**
   * Por ahora, para no estar subiendo archivos: genera como PDF los documentos requeridos que faltan (DNI, partida y ficha SIAGIE) con los datos
   * registrados del alumno y los guarda en su expediente. Quedan «sin verificar»: la ficha no reemplaza al original.
   */
  protected generarFaltantes(): void {
    const a = this.alumno();
    const tipos = this.faltan();
    if (!a || !tipos.length || this.generando()) return;
    this.generando.set(true);
    this.generadorDocs.cargar(a.id).pipe(switchMap(datos => forkJoin(tipos.map(t => this.generadorDocs.guardarRequerido(t, datos))))).subscribe({
      next: () => {
        this.generando.set(false);
        this.avisos.success(`Se generaron ${tipos.length} ${tipos.length === 1 ? 'documento' : 'documentos'} con los datos del alumno. Revísalos y verifícalos.`);
        this.cargarDocumentos();
      },
      error: e => { this.generando.set(false); this.avisos.error(mensajeError(e, 'No se pudieron generar los documentos.')); this.cargarDocumentos(); }
    });
  }

  protected verificarTodos(): void {
    const a = this.alumno();
    const filas = this.sinVerificar().filter(f => f.documento);
    if (!a || !filas.length) return;
    forkJoin(filas.map(f => this.alumnosApi.verificarDocumento(a.id, f.documento!.id, true))).subscribe({
      next: () => { this.avisos.success('Documentos verificados.'); this.cargarDocumentos(); },
      error: e => { this.avisos.error(mensajeError(e, 'No se pudieron verificar los documentos.')); this.cargarDocumentos(); }
    });
  }

  protected verificar(f: FilaDocumento): void {
    const a = this.alumno();
    if (!a || !f.documento) return;
    this.alumnosApi.verificarDocumento(a.id, f.documento.id, true).subscribe({
      next: () => this.cargarDocumentos(),
      error: e => this.avisos.error(mensajeError(e, 'No se pudo verificar el documento.'))
    });
  }

  // ---------- Paso 4: sección ----------
  protected elegirGrado(g: string): void {
    this.gradoElegido.set(g);
    this.elegirSeccion(0);
  }

  protected elegirSeccion(id: number): void {
    this.seccionId.set(id);
    this.formMatricula.controls.seccionId.setValue(id);
  }

  // ---------- Navegación ----------
  protected atras(): void {
    this.error.set(null);
    this.paso.set(pasoAnterior(this.paso()));
  }

  protected siguiente(): void {
    this.error.set(null);
    const p = this.paso();
    if (!this.avance().puede) return;

    // Alumno nuevo: se guarda al terminar el paso de la familia (el servicio exige al menos un apoderado).
    if (p === 'familia' && this.modo() === 'nuevo' && !this.alumno()) {
      this.crearAlumno();
      return;
    }
    // Alumno existente sin apoderados: se agrega el que se acaba de completar.
    if (p === 'familia' && this.alumno() && this.vinculos().length === 0) {
      this.agregarApoderado();
      return;
    }
    this.ir(siguientePaso(p));
  }

  private cargarPlanes(): void {
    const anioId = this.anio()?.id;
    if (!anioId || this.tarifas().length) return;
    this.pagoConfig.planesPago().pipe(catchError(() => of([] as OpcionPlanPago[]))).subscribe(p => this.planesServidor.set(p));
    this.pagoConfig.tarifas(anioId).pipe(catchError(() => of([] as Tarifa[]))).subscribe(t => this.tarifas.set(t));
  }

  protected elegirPlan(id: PlanPago): void {
    this.planElegido.set(id);
  }

  private ir(p: PasoMatricula): void {
    this.paso.set(p);
    if (p === 'seccion') this.cargarPlanes();
    if (p === 'documentos') this.cargarDocumentos();
    queueMicrotask(() => document.querySelector('.asistente-cuerpo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  private crearAlumno(): void {
    const v = this.formAlumno.getRawValue();
    const body: AlumnoCreate = {
      tipoDocumento: v.tipoDocumento,
      numeroDocumento: v.numeroDocumento.trim(),
      nombres: v.nombres.trim(),
      apellidoPaterno: v.apellidoPaterno.trim(),
      apellidoMaterno: limpio(v.apellidoMaterno),
      fechaNacimiento: v.fechaNacimiento,
      sexo: v.sexo,
      nacionalidad: 'Peruana',
      direccion: limpio(v.direccion),
      distrito: limpio(v.distrito),
      telefono: limpio(v.telefono),
      email: limpio(v.email),
      colegioProcedencia: limpio(v.colegioProcedencia),
      apoderados: [this.vinculoPedido()]
    };
    this.ocupado.set(true);
    this.alumnosApi.crear(body).subscribe({
      next: a => {
        this.ocupado.set(false);
        this.alumno.set(a);
        this.vinculos.set(a.apoderados ?? []);
        this.avisos.success(`Alumno ${a.codigo} registrado.`);
        this.ir('documentos');
      },
      error: e => { this.ocupado.set(false); this.error.set(mensajeError(e, 'No se pudo registrar al alumno.')); }
    });
  }

  private agregarApoderado(): void {
    const a = this.alumno();
    if (!a) return;
    this.ocupado.set(true);
    this.alumnosApi.agregarVinculo(a.id, this.vinculoPedido()).subscribe({
      next: v => { this.ocupado.set(false); this.vinculos.set([v]); this.ir('documentos'); },
      error: e => { this.ocupado.set(false); this.error.set(mensajeError(e, 'No se pudo agregar al apoderado.')); }
    });
  }

  // ---------- Descuento por hermano ----------
  protected alternarHermano(activo: boolean): void {
    this.conHermano.set(activo);
    this.limpiarHermano();
    if (activo && !this.opcionesDescuento().length) {
      this.cobroApi.opcionesDescuento().pipe(catchError(() => of([] as OpcionDescuento[]))).subscribe(o => {
        this.opcionesDescuento.set(o);
        // Si el colegio solo tiene un descuento para la matrícula (lo normal: «Hermanos»), ya viene elegido
        if (o.length === 1) this.descuentoId.set(o[0].id);
      });
    }
  }

  private limpiarHermano(): void {
    this.hermano.set(null);
    this.situacionHermano.set(null);
    this.ubicacionHermano.set(null);
    this.verificacionHermano.set(null);
    this.hermanoConfirmado.set(false);
    this.errorHermano.set(null);
    this.documentoHermano.setValue('');
  }

  /** El hermano se busca solo por documento: se lista por ese número y se toma el alumno cuyo documento coincide exactamente. */
  protected readonly documentoHermano = this.fb.nonNullable.control('');

  protected buscarHermano(): void {
    const doc = this.documentoHermano.value.trim();
    if (doc.length < 6) return;
    this.errorHermano.set(null);
    this.verificandoHermano.set(true);
    this.alumnosApi.listar(doc, '', 0, 8).pipe(catchError(() => of(null))).subscribe(p => {
      const encontrado = p?.contenido.find(a => a.numeroDocumento?.trim().toUpperCase() === doc.toUpperCase());
      if (!p) {
        this.verificandoHermano.set(false);
        this.errorHermano.set('No se pudo buscar al hermano. Intenta de nuevo.');
      } else if (!encontrado) {
        this.verificandoHermano.set(false);
        this.errorHermano.set(`No hay ningún alumno con el documento ${doc}. Revisa el número.`);
      } else {
        this.elegirHermano(encontrado);   // comprueba por su cuenta si consta matriculado y apaga «verificando» al terminar
      }
    });
  }

  /** Comprueba por su cuenta lo que importa del hermano: que sea otro alumno, que conste matriculado este año y si comparten apoderado. */
  protected elegirHermano(r: AlumnoResumen | null): void {
    this.limpiarHermano();
    const a = this.alumno();
    if (!r || !a) return;
    this.verificandoHermano.set(true);
    this.alumnosApi.obtener(r.id).subscribe({
      next: h => {
        this.matriculasApi.listar({ anioId: this.anio()?.id, texto: h.nombreCompleto, size: 50 }).pipe(catchError(() => of(null))).subscribe(p => {
          const lista = p?.contenido ?? [];
          const sit = situacionDe(h.id, lista);
          const suya = lista.filter(m => m.alumnoId === h.id && m.estado === 'MATRICULADO')[0];
          const sec = suya ? this.secciones().find(s => s.id === suya.seccionId) : undefined;
          this.hermano.set(h);
          this.situacionHermano.set(sit);
          this.ubicacionHermano.set(sec ? `${sec.gradoNombre} · Sección ${sec.nombre}` : null);
          this.verificacionHermano.set(verificarHermano(a.id, h.id, sit, this.vinculos(), h.apoderados ?? []));
          this.verificandoHermano.set(false);
        });
      },
      error: e => { this.verificandoHermano.set(false); this.errorHermano.set(mensajeError(e, 'No se pudo cargar al hermano.')); }
    });
  }

  /** Por qué todavía no se puede pedir el descuento (se muestra junto al botón). */
  protected faltaParaDescuento(): string | null {
    if (!this.conHermano()) return null;
    const v = this.verificacionHermano();
    if (!this.hermano() || !v) return 'Busca y elige al hermano para pedir el descuento.';
    if (!v.distinto) return 'El hermano no puede ser el mismo alumno.';
    if (!v.matriculado) return 'El hermano no consta matriculado este año: sin eso no corresponde el descuento.';
    if (!this.descuentoId()) return 'Elige el descuento que se va a pedir.';
    if (!this.hermanoConfirmado()) return 'Marca que confirmaste los datos del hermano.';
    return null;
  }

  // ---------- Paso 5: matricular ----------
  protected matricular(): void {
    const a = this.alumno();
    const s = this.seccionElegida();
    if (!a || !s?.disponible || !this.hermanoListo()) return;
    const v = this.formMatricula.getRawValue();
    this.ocupado.set(true);
    this.error.set(null);
    this.matriculasApi.crear({ alumnoId: a.id, seccionId: s.seccion.id, tipo: v.tipo, observaciones: limpio(v.observaciones), planPago: this.planElegido() }).subscribe({
      next: m => {
        this.ocupado.set(false);
        this.resultado.set(m);
        this.avisos.success(`Pre-matrícula ${m.codigo} creada.`);
        if (this.conHermano()) this.pedirDescuento(a.id);
      },
      error: e => { this.ocupado.set(false); this.error.set(mensajeError(e, 'No se pudo crear la matrícula.')); }
    });
  }

  /**
   * Con la pre-matrícula ya creada se pide el descuento. La cuota de matrícula y la copia de la matrícula en pago-ms se generan por un aviso entre
   * servicios (unos segundos), así que si todavía no están se reintenta antes de rendirse.
   */
  private pedirDescuento(alumnoId: number): void {
    const h = this.hermano();
    if (!h) return;
    this.errorSolicitud.set(null);
    this.resolviendoSolicitud.set(true);
    const motivo = motivoHermano(h.nombreCompleto, h.numeroDocumento, !!this.verificacionHermano()?.mismoApoderado);
    this.cobroApi.solicitarDescuento(alumnoId, { descuentoId: this.descuentoId(), motivo, hermanoAlumnoId: h.id })
      .pipe(retry({ count: 6, delay: 1500 }))
      .subscribe({
        next: s => { this.resolviendoSolicitud.set(false); this.solicitud.set(s); },
        error: e => {
          this.resolviendoSolicitud.set(false);
          this.errorSolicitud.set(mensajeError(e, 'No se pudo pedir el descuento.'));
        }
      });
  }

  /** La secretaría da el visto bueno: se asigna el descuento al alumno y se recalcula la cuota de matrícula. */
  protected aprobarDescuento(): void {
    const s = this.solicitud();
    if (!s || this.resolviendoSolicitud()) return;
    this.resolviendoSolicitud.set(true);
    this.errorSolicitud.set(null);
    this.cobroApi.aprobarSolicitudDescuento(s.id).subscribe({
      next: r => { this.resolviendoSolicitud.set(false); this.solicitud.set(r); this.avisos.success('Descuento aprobado: la matrícula se recalculó.'); },
      error: e => { this.resolviendoSolicitud.set(false); this.errorSolicitud.set(mensajeError(e, 'No se pudo aprobar el descuento.')); }
    });
  }

  protected otroAlumno(): void {
    this.alumno.set(null);
    this.bloqueo.set(null);
    this.vinculos.set([]);
    this.documentos.set([]);
    this.resultado.set(null);
    this.conHermano.set(false);
    this.limpiarHermano();
    this.descuentoId.set(0);
    this.solicitud.set(null);
    this.errorSolicitud.set(null);
    this.apoderadoElegido.set(null);
    this.apoderadoExistente.set(false);
    this.formAlumno.reset({ tipoDocumento: 'DNI' });
    this.formApoderado.reset({ parentesco: 'MADRE', tipoDocumento: 'DNI' });
    this.formMatricula.reset({ seccionId: 0, tipo: 'NUEVA', observaciones: '' });
    this.seccionId.set(0);
    this.planElegido.set('MENSUAL');
    this.gradoElegido.set('');
    this.modo.set('existente');
    this.paso.set('alumno');
    this.error.set(null);
    this.matriculasApi.cupos(this.anio()!.id).pipe(catchError(() => of([] as Cupo[]))).subscribe(c => this.cupos.set(c));
  }

  protected nombreAlumno(): string {
    const a = this.alumno();
    if (a) return a.nombreCompleto;
    const v = this.formAlumno.getRawValue();
    return `${v.apellidoPaterno} ${v.apellidoMaterno}, ${v.nombres}`.replace(/\s+/g, ' ').trim();
  }
}
