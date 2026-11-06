import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AREA_DOCENCIA, Anio, Area, Asignacion, Curso, Docente, DocenteRequest, MallaGrado, Seccion } from '../../core/models/planificacion.model';
import { puestoDeArea } from './cursos-docente';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { CuentasService } from '../../core/services/cuentas.service';
import { NotificationService } from '../../core/services/notification.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Contrato, ContratoRequest, CuentaDeposito, TipoContrato, TipoCuenta } from '../../core/models/rrhh.model';
import { armarOpciones, cargaSemanal, cursosDelDocente, filtrarGrupos, filtrarPorTexto, opcionesElegidas, sugeridasLibres } from './asignar-cursos';
import { RrhhService } from '../../core/services/rrhh.service';
import { hoyLocal } from './asistencia-personal';
import { BANCOS, TARDANZAS_POR_DIA, TIPOS_CONTRATO, TIPOS_CUENTA, erroresCuenta as validarCuenta, esBilletera, soloDigitos, contratoQueImpideOtro, diasDelMes, duracionContrato, fechaCorta, finDeAnio, finPorMeses, primerDiaMesSiguiente, soles, valorDia } from './rrhh';
import { DOCUMENTO_MINIMO, ROLES_PERSONAL, RolPersonal, documentoSirveDeClave, rolSugerido, usuarioPrevisto } from './cuenta-personal';

/**
 * Personal del colegio por áreas de trabajo: el combo filtra a quienes pertenecen al área elegida, el buscador y el botón
 * «Agregar personal» van en la misma línea y la tabla muestra a las personas con su área. Los docentes son el personal del área Docencia.
 */
@Component({
  selector: 'app-personal',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  templateUrl: './personal.component.html',
  styles: `
    .bloque-cuenta { display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; border: 1.5px dashed var(--line-2); border-radius: 12px; }
    .bloque-cuenta.activa { border-style: solid; border-color: var(--primary); background: var(--primary-soft); }
    .bloque-cuenta .check { display: flex; align-items: center; gap: 8px; font-weight: 700; cursor: pointer; }
    .ayuda-cuenta { margin: 0; line-height: 1.45; }
    .credenciales { margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .credenciales div { display: flex; flex-direction: column; padding: 10px 14px; border-radius: 12px; background: var(--bg); border: 1px solid var(--line); }
    .credenciales dt { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .credenciales dd { margin: 2px 0 0; font-size: 1.15rem; font-weight: 800; user-select: all; }
    .pasos { display: flex; align-items: center; gap: 10px; margin: 0 0 16px; padding: 0; list-style: none; font-weight: 700; color: var(--ink-2); }
    .pasos li { display: flex; align-items: center; gap: 8px; }
    .pasos .separador { flex: 1; height: 2px; background: var(--line-2); border-radius: 2px; }
    .pasos .num-paso { width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%; background: var(--line); color: var(--ink-2); font-size: .8rem; }
    .pasos .activo { color: var(--primary); }
    .pasos .activo .num-paso { background: var(--primary); color: #fff; }
    .pasos .hecho { color: var(--ok); }
    .pasos .hecho .num-paso { background: var(--ok); color: #fff; }
    .persona-paso { margin: 0 0 14px; padding: 8px 12px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); }
    .buscar-asig { flex: 1 1 220px; min-width: 0; padding: 7px 12px; border: 1.5px solid var(--line-2); border-radius: 10px; font: inherit; }
    .exito-paso { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; padding: 10px 14px; border-radius: 12px; background: var(--ok-soft); color: var(--ok); }
    .check-grande { flex: none; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--ok); color: #fff; font-weight: 900; }
    /* Fuera de .form-grid el margen negativo del título de sección lo monta sobre el campo siguiente: se corrige en este paso. */
    .contrato-layout .sec-form { margin: 16px 0 10px; }
    .contrato-layout .sec-form:first-child { margin-top: 0; }
    .contrato-layout { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 18px; align-items: start; }
    .tipos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .tipo { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; text-align: left; font: inherit; color: inherit; cursor: pointer; background: var(--card); border: 1.5px solid var(--line-2); border-radius: 12px; transition: border-color .15s, background .15s; }
    .tipo small { color: var(--ink-2); font-size: .74rem; }
    .tipo:hover { border-color: var(--primary); }
    .tipo.on { border-color: var(--primary); background: var(--primary-soft); box-shadow: inset 4px 0 0 var(--primary); }
    .atajos { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .atajo { padding: 3px 10px; font: inherit; font-size: .76rem; font-weight: 700; color: var(--primary); background: var(--primary-soft); border: 0; border-radius: 999px; cursor: pointer; }
    .atajo:hover { filter: brightness(.95); }
    .vista-contrato { position: sticky; top: 0; display: flex; flex-direction: column; gap: 8px; padding: 14px; border: 1.5px solid var(--primary); border-radius: 16px; background: var(--primary-soft); }
    .vista-contrato h4 { margin: 0; font-size: .74rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--primary); }
    .vista-contrato dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 6px 12px; font-size: .88rem; }
    .vista-contrato dt { color: var(--ink-2); }
    .vista-contrato dd { margin: 0; font-weight: 700; text-align: right; }
    .vista-contrato dd.grande { font-size: 1.25rem; font-variant-numeric: tabular-nums; }
    .vista-contrato dd small { display: block; font-weight: 500; color: var(--ink-2); }
    .vista-contrato .regla { margin: 0; font-size: .78rem; color: var(--ink-2); }
    .barra-asig { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 10px; }
    .barra-asig .check { display: flex; align-items: center; gap: 6px; font-weight: 600; cursor: pointer; margin-right: auto; }
    .carga-asig { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-bottom: 12px; padding: 8px 14px; border-radius: 12px; background: var(--primary-soft); color: var(--primary); font-size: .88rem; }
    .carga-asig .total { margin-left: auto; }
    .seccion-asig { margin-bottom: 12px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 14px; background: var(--bg); }
    .seccion-asig h4 { margin: 0 0 8px; font-size: .95rem; }
    .seccion-asig h4 small { font-weight: 500; color: var(--ink-2); }
    .cursos-asig { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
    .curso-asig { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1.5px solid var(--line-2); border-radius: 10px; background: var(--card); cursor: pointer; }
    .curso-asig.on { border-color: var(--primary); background: var(--primary-soft); }
    .curso-asig.ocupado { opacity: .55; cursor: not-allowed; }
    .curso-asig .nombre { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: .85rem; }
    .curso-asig .nombre small { color: var(--ink-2); font-size: .72rem; }
    .etiqueta-apto { flex: none; padding: 2px 8px; border-radius: 999px; font-size: .62rem; font-weight: 800; text-transform: uppercase; color: var(--primary); background: var(--primary-soft); }
    @media (max-width: 760px) { .contrato-layout, .tipos, .cursos-asig { grid-template-columns: minmax(0, 1fr); } }
    .tabla-personal { min-width: 960px; table-layout: fixed; }
    .tabla-personal .linea-estado { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
    .tabla-personal th { text-transform: uppercase; letter-spacing: .05em; font-size: 11px; background: var(--bg); border-bottom: 1px solid var(--line); }
    .tabla-personal tbody tr:hover { background: var(--primary-soft); }
    .tabla-personal tr.inactivo { opacity: .6; }
    .tabla-personal td { vertical-align: middle; }
    .tabla-personal .c-persona { width: 27%; }
    .tabla-personal .c-area { width: 22%; }
    .tabla-personal .c-doc { width: 12%; white-space: nowrap; }
    .tabla-personal .c-contacto { width: 22%; }
    .tabla-personal .c-estado { width: 12%; white-space: nowrap; }
    .tabla-personal .c-acc { width: 148px; text-align: right; }
    .tabla-personal .num { font-weight: 700; font-variant-numeric: tabular-nums; }
    .tabla-personal .recorte { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .tabla-personal .muted { font-size: 12px; }
    .persona { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .persona-datos { display: flex; flex-direction: column; min-width: 0; }
    .persona-datos strong, .persona-datos .muted { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .avatar-fila { flex: none; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; background: var(--primary-soft); color: var(--primary); font-weight: 800; font-size: .8rem; }
    .tabla-personal .acciones .btn { margin-left: 4px; }
    .btn-icono { display: inline-grid; place-items: center; width: 32px; height: 32px; padding: 0; vertical-align: middle; }
    .btn-icono svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .ficha-cab { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
    .avatar { flex: none; width: 56px; height: 56px; display: grid; place-items: center; border-radius: 50%; background: var(--primary-soft); color: var(--primary); font-weight: 900; font-size: 1.3rem; }
    .ficha-cab strong { display: block; font-size: 1.15rem; }
    .ficha-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .ficha-grupo { padding: 12px 14px; border: 1px solid var(--line); border-radius: 14px; background: var(--bg); }
    .ficha-grupo.ancho { grid-column: 1 / -1; }
    .ficha-grupo h4 { margin: 0 0 8px; font-size: .74rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .ficha-grupo dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: .88rem; }
    .ficha-grupo dt { color: var(--ink-2); }
    .ficha-grupo dd { margin: 0; font-weight: 600; word-break: break-word; }
    .etiquetas { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
    .etiquetas li { padding: 3px 10px; border-radius: 999px; background: var(--primary-soft); color: var(--primary); font-size: .8rem; font-weight: 700; }
    @media (max-width: 640px) { .ficha-grid { grid-template-columns: minmax(0, 1fr); } }
    .sec-form { grid-column: 1 / -1; margin: 6px 0 -4px; padding-top: 10px; border-top: 1px dashed var(--line-2); font-size: .74rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .sec-form:first-child { border-top: 0; padding-top: 0; margin-top: 0; }
    .ayuda-puesto { grid-column: 1 / -1; margin: -4px 0 0; }
    .bloque-cursos { display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; border-radius: 14px; border: 1.5px solid var(--line-2); background: var(--bg); }
    .bloque-cursos .cab { display: flex; justify-content: space-between; align-items: baseline; }
    .bloque-cursos h4 { margin: 0; font-size: .95rem; }
    .niveles { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip-nivel { padding: 4px 12px; font: inherit; font-size: .8rem; font-weight: 700; color: var(--ink-2); background: var(--card); border: 1.5px solid var(--line-2); border-radius: 999px; cursor: pointer; }
    .chip-nivel.on { color: #fff; background: var(--primary); border-color: var(--primary); }
    .lista-cursos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; max-height: 260px; overflow-y: auto; padding-right: 2px; }
    .curso { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1.5px solid var(--line-2); border-radius: 10px; background: var(--card); cursor: pointer; }
    .curso.on { border-color: var(--primary); background: var(--primary-soft); }
    .curso .nombre { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: .85rem; }
    .curso .nombre small { color: var(--ink-2); font-size: .7rem; }
    .cob { flex: none; padding: 2px 8px; border-radius: 999px; font-size: .65rem; font-weight: 800; text-transform: uppercase; letter-spacing: .03em; }
    .cob.asignado { color: var(--ok); background: var(--ok-soft); }
    .cob.apto { color: var(--primary); background: var(--primary-soft); }
    .cob.sin-docente { color: var(--warn); background: var(--warn-soft); }
    @media (max-width: 640px) { .lista-cursos { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class PersonalComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);
  private readonly destruido = inject(DestroyRef);
  private readonly cuentas = inject(CuentasService);
  private readonly rrhh = inject(RrhhService);
  private readonly route = inject(ActivatedRoute, { optional: true });
  /** Las cuentas de acceso las crea solo el administrador (el servicio de autenticación lo exige). */
  protected readonly esAdmin = inject(AuthService).isAdmin;

  protected readonly rolesPersonal = ROLES_PERSONAL;
  protected readonly documentoMinimo = DOCUMENTO_MINIMO;
  protected readonly usuarioPrevisto = usuarioPrevisto;
  /** Cuenta recién creada: se muestra su usuario y su clave inicial para entregárselos a la persona. */
  protected readonly cuentaCreada = signal<{ persona: string; usuario: string; rol: string; documento: string } | null>(null);

  protected readonly areas = signal<Area[]>([]);
  protected readonly personal = signal<Docente[]>([]);

  // --- Cursos: se eligen UNA sola vez, en el paso «Cursos» (por sección). Aquí solo lo necesario para la ficha y el aviso del formulario. ---
  private readonly cursos = signal<Curso[]>([]);
  private readonly asignaciones = signal<Asignacion[]>([]);
  private readonly areaDelForm = signal(0);
  protected readonly puesto = computed(() => puestoDeArea(this.areas().find(a => a.id === this.areaDelForm())?.codigo));
  /** Los cursos que ya dicta quien se está editando (solo lectura: se cambian en el paso «Cursos», asignándolos por sección). */
  protected readonly cursosDeLaPersona = computed(() => {
    const ids = new Set(this.editando()?.cursoIds ?? []);
    return this.cursos().filter(c => ids.has(c.id)).map(c => c.nombre).sort((a, b) => a.localeCompare(b, 'es'));
  });

  // --- Ficha de la persona (botón de ícono de la lista) ---
  private readonly seccionesAnio = signal<Seccion[]>([]);
  protected readonly anioFicha = signal<string | null>(null);
  protected readonly ficha = signal<Docente | null>(null);
  protected readonly fichaCursos = computed(() => {
    const ids = new Set(this.ficha()?.cursoIds ?? []);
    return this.cursos().filter(c => ids.has(c.id)).map(c => c.nombre).sort((a, b) => a.localeCompare(b, 'es'));
  });
  /** Qué dicta y en qué sección (del año activo). */
  protected readonly fichaAsignaciones = computed(() => {
    const id = this.ficha()?.id;
    return this.asignaciones().filter(a => a.docenteId === id).sort((a, b) => a.seccionNombre.localeCompare(b.seccionNombre, 'es') || a.cursoNombre.localeCompare(b.cursoNombre, 'es'));
  });
  protected readonly fichaTutorias = computed(() => this.seccionesAnio().filter(s => s.activo && s.tutorDocenteId === this.ficha()?.id));

  protected verFicha(p: Docente): void {
    this.ficha.set(p);
  }

  protected iniciales(p: Docente): string {
    return `${p.nombres.charAt(0)}${p.apellidos.charAt(0)}`.toUpperCase();
  }

  protected editarDesdeFicha(): void {
    const p = this.ficha();
    this.ficha.set(null);
    if (p) this.editar(p);
  }

  protected readonly total = signal(0);
  protected readonly paginas = signal(1);
  protected readonly pagina = signal(0);
  protected readonly cargando = signal(false);

  protected readonly abierto = signal(false);
  protected readonly editando = signal<Docente | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  // --- Paso 2 de «Agregar personal»: el contrato, en la misma ventana (solo el administrador lo puede crear) ---
  protected readonly paso = signal<'datos' | 'contrato' | 'deposito' | 'cursos'>('datos');
  /** La persona recién guardada a la que se le está haciendo el contrato. */
  protected readonly personaContrato = signal<Docente | null>(null);
  /** Cuenta creada en el paso 1: sus datos se muestran al terminar, no antes. */
  private readonly cuentaPendiente = signal<{ persona: string; usuario: string; rol: string; documento: string } | null>(null);
  protected readonly guardandoContrato = signal(false);
  protected readonly errorContrato = signal<string | null>(null);
  protected readonly tiposContrato = TIPOS_CONTRATO;
  protected readonly dinero = soles;
  protected readonly tardanzasPorDia = TARDANZAS_POR_DIA;
  protected readonly formContrato = this.fb.nonNullable.group({
    tipo: ['PLAZO_FIJO' as TipoContrato, Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: [''],
    remuneracion: [0, [Validators.required, Validators.min(0)]],
    observaciones: ['']
  });
  /** Lo que se escribe en el formulario del contrato, para la vista previa en vivo. */
  private readonly vistaContrato = signal(this.formContrato.getRawValue());
  protected readonly esIndefinido = computed(() => this.vistaContrato().tipo === 'INDEFINIDO');
  protected readonly ayudaFin = computed(() => (this.esIndefinido() ? 'Un contrato indefinido no tiene fecha de fin.' : 'Hasta cuándo rige el contrato.'));
  /** Resumen en vivo del contrato que se está armando. */
  protected readonly resumenContrato = computed(() => {
    const v = this.vistaContrato();
    const inicio = /^\d{4}-\d{2}-\d{2}$/.test(v.fechaInicio) ? v.fechaInicio : '';
    const fin = !this.esIndefinido() && /^\d{4}-\d{2}-\d{2}$/.test(v.fechaFin) ? v.fechaFin : '';
    const rem = Number(v.remuneracion) || 0;
    const incoherente = !!inicio && !!fin && fin < inicio;
    const periodoInicio = inicio.slice(0, 7);
    // «sin fin» e «Indefinido» solo si el contrato lo es de verdad; en un plazo fijo sin fecha de fin todavía se pide elegirla.
    const sinFinAun = !this.esIndefinido() && !fin;
    return {
      inicio, fin, rem, incoherente,
      periodo: inicio ? `${fechaCorta(inicio)} → ${fin ? fechaCorta(fin) : sinFinAun ? 'elige la fecha de fin' : 'sin fin'}` : '',
      duracion: inicio && !incoherente && !sinFinAun ? duracionContrato(inicio, fin || null) : '',
      diasMes: inicio ? diasDelMes(periodoInicio) : 0,
      valorDia: inicio && rem > 0 ? valorDia(rem, periodoInicio) : 0,
      falta: this.faltaParaContrato(v, incoherente)
    };
  });

  /** El contrato vigente (o por iniciar) que ya tiene la persona a la que se le está haciendo el contrato; cada persona tiene uno solo. */
  protected readonly contratoExistente = signal<Contrato | null>(null);

  /** Qué falta para poder crear el contrato (vacío si ya se puede). */
  private faltaParaContrato(v: { tipo: TipoContrato; fechaInicio: string; fechaFin: string; remuneracion: number }, incoherente: boolean): string {
    if (this.contratoExistente()) return 'Ya tiene un contrato: cada persona tiene uno solo. Se renueva en Personal → Pago al personal.';
    if (!v.fechaInicio) return 'Indica la fecha de inicio.';
    if (v.tipo !== 'INDEFINIDO' && !v.fechaFin) return 'Indica la fecha de fin (o elige un atajo).';
    if (incoherente) return 'La fecha de fin no puede ser anterior al inicio.';
    if (!(Number(v.remuneracion) > 0)) return 'Indica el sueldo mensual.';
    return '';
  }

  /** ¿Se ofrece seguir con el contrato? Solo el administrador (contratos y pagos son suyos en el backend). */
  protected puedeCrearContrato(): boolean {
    return this.esAdmin();
  }

  /** 0 = todas las áreas. */
  protected readonly areaFiltro = this.fb.nonNullable.control(0);
  /** Por defecto solo el personal activo; los inactivos (dados de baja) se ven eligiendo «Inactivos». */
  protected readonly estadoFiltro = this.fb.nonNullable.control<'ACTIVO' | 'INACTIVO' | 'TODOS'>('ACTIVO');
  protected readonly busqueda = this.fb.nonNullable.control('');

  protected readonly areaElegida = computed(() => this.areas().find(a => a.id === this.areaFiltroId()) ?? null);
  private readonly areaFiltroId = signal(0);

  protected readonly form = this.fb.nonNullable.group({
    areaId: [0, [Validators.required, Validators.min(1)]],
    cargo: [''],
    tipoDocumento: ['DNI', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', Validators.email],
    telefono: [''],
    especialidad: [''],
    /** Crear también su cuenta de acceso al sistema (opcional). */
    crearCuenta: [false],
    rolCuenta: ['' as RolPersonal | '']
  });

  /** ¿Se ofrece crear la cuenta? Solo el administrador, y solo si la persona aún no tiene una. */
  protected puedeCrearCuenta(): boolean {
    return this.esAdmin() && !this.editando()?.usuarioId;
  }

  protected documentoCorto(): boolean {
    return !documentoSirveDeClave(this.form.controls.numeroDocumento.value);
  }

  constructor() {
    this.formContrato.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(() => this.vistaContrato.set(this.formContrato.getRawValue()));
    // Cuenta de depósito: Yape y Plin son billeteras (sin CCI) y una billetera es siempre Yape o Plin.
    this.formCuenta.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(() => this.vistaCuenta.set(this.formCuenta.getRawValue()));
    this.formCuenta.controls.banco.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(b => {
      if (esBilletera(b)) { this.formCuenta.controls.tipo.setValue('BILLETERA'); this.formCuenta.controls.cci.setValue(''); }
      else if (this.formCuenta.controls.tipo.value === 'BILLETERA') this.formCuenta.controls.tipo.setValue('AHORROS');
    });
    this.formCuenta.controls.tipo.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(t => {
      const b = this.formCuenta.controls.banco;
      if (t === 'BILLETERA' && !esBilletera(b.value)) b.setValue('YAPE');
      if (t === 'BILLETERA') this.formCuenta.controls.cci.setValue('');
    });
    // Al elegir el área, se sugiere el rol que le corresponde (si la persona todavía no eligió uno a mano).
    this.form.controls.areaId.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(id => {
      this.areaDelForm.set(Number(id));
      const c = this.form.controls.rolCuenta;
      if (!c.dirty) c.setValue(rolSugerido(this.areas().find(a => a.id === id)?.codigo));
    });
    this.form.controls.crearCuenta.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(marcada => {
      const c = this.form.controls.rolCuenta;
      if (marcada && !c.value) c.setValue(rolSugerido(this.areas().find(a => a.id === this.form.controls.areaId.value)?.codigo));
    });
    this.areaFiltro.valueChanges.pipe(takeUntilDestroyed(this.destruido)).subscribe(id => {
      this.areaFiltroId.set(id);
      this.cargar(0);
    });
    this.route?.queryParamMap.pipe(takeUntilDestroyed(this.destruido)).subscribe(params => {
      const qp = params.get('areaId');
      if (qp !== null) {
        const id = Number(qp) || 0;
        if (this.areaFiltro.value !== id) {
          this.areaFiltro.setValue(id);
        }
      }
    });
  }

  ngOnInit(): void {
    this.api.areas().subscribe({
      next: a => {
        this.areas.set(a);
        // Desde la página de un área: «Agregar personal» llega con ?nuevo=1 y abre el formulario ya con esa área.
        if (this.route?.snapshot.queryParamMap.get('nuevo') === '1') this.nuevo();
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar las áreas.'))
    });
    this.cargarCursos();
    if (!this.route?.snapshot.queryParamMap.has('areaId')) {
      this.cargar(0);
    }
  }

  /** Cursos, docentes y asignaciones del año: sirven para marcar qué cursos ya tienen docente y cuáles no. */
  private cargarCursos(): void {
    this.api.cursos().pipe(catchError(() => of([] as Curso[]))).subscribe(c => this.cursos.set(c));
    this.api.anios().pipe(catchError(() => of([] as Anio[]))).subscribe(anios => {
      const anio = anios.find(a => a.estado === 'ACTIVO') ?? anios.find(a => a.estado === 'PLANIFICADO');
      if (anio) {
        this.anioFicha.set(anio.nombre);
        this.api.asignaciones(undefined, undefined, anio.id).pipe(catchError(() => of([] as Asignacion[]))).subscribe(a => this.asignaciones.set(a));
        this.api.secciones(anio.id).pipe(catchError(() => of([] as Seccion[]))).subscribe(s => this.seccionesAnio.set(s));
      }
    });
  }

  protected buscar(): void {
    this.cargar(0);
  }

  protected irA(pagina: number): void {
    if (pagina >= 0 && pagina < this.paginas()) {
      this.cargar(pagina);
    }
  }

  private cargar(pagina: number): void {
    this.cargando.set(true);
    this.api.personal(this.busqueda.value.trim(), pagina, 15, this.areaFiltro.value || null, this.estadoFiltro.value).subscribe({
      next: p => {
        this.personal.set(p.contenido);
        this.total.set(p.totalElementos);
        this.paginas.set(Math.max(1, p.totalPaginas));
        this.pagina.set(p.pagina);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar el personal.'));
      }
    });
  }

  /** La especialidad solo se pide al personal docente. */
  protected esDocencia(): boolean {
    const id = this.form.controls.areaId.value;
    return this.areas().find(a => a.id === id)?.codigo === AREA_DOCENCIA;
  }

  protected nuevo(): void {
    // El área del formulario arranca en la que se está viendo (o en Docencia si se ven todas).
    const porDefecto = this.areaFiltro.value || this.areas().find(a => a.codigo === AREA_DOCENCIA)?.id || 0;
    this.form.reset({ areaId: porDefecto, cargo: '', tipoDocumento: 'DNI', numeroDocumento: '', nombres: '', apellidos: '', email: '', telefono: '', especialidad: '', crearCuenta: false, rolCuenta: '' });
    this.areaDelForm.set(porDefecto);
    this.abrir(null);
  }

  protected editar(p: Docente): void {
    this.form.reset({
      areaId: p.areaId ?? 0, cargo: p.cargo ?? '', tipoDocumento: p.tipoDocumento ?? 'DNI', numeroDocumento: p.numeroDocumento,
      nombres: p.nombres, apellidos: p.apellidos, email: p.email ?? '', telefono: p.telefono ?? '', especialidad: p.especialidad ?? '',
      crearCuenta: false, rolCuenta: ''
    });
    this.areaDelForm.set(p.areaId ?? 0);
    this.abrir(p);
  }

  private abrir(p: Docente | null): void {
    this.errorForm.set(null);
    this.editando.set(p);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
    this.paso.set('datos');
    this.personaContrato.set(null);
    // Si se creó una cuenta mientras se hacía el contrato, ahora sí se muestran sus datos de acceso.
    const cuenta = this.cuentaPendiente();
    if (cuenta) {
      this.cuentaPendiente.set(null);
      this.cuentaCreada.set(cuenta);
    }
  }

  /** Guarda a la persona. Con {@code continuar} no cierra la ventana: pasa al paso del contrato. */
  protected guardar(continuar = false): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const body = {
      areaId: v.areaId,
      cargo: v.cargo.trim() || undefined,
      tipoDocumento: v.tipoDocumento,
      numeroDocumento: v.numeroDocumento.trim(),
      nombres: v.nombres.trim(),
      apellidos: v.apellidos.trim(),
      email: v.email.trim() || undefined,
      telefono: v.telefono.trim() || undefined,
      especialidad: this.esDocencia() ? v.especialidad.trim() || undefined : undefined
    };
    const e = this.editando();
    const conCuenta = this.puedeCrearCuenta() && v.crearCuenta;
    if (conCuenta) {
      // La clave inicial es el documento: tiene que servir como clave y hay que saber qué puede hacer la cuenta.
      if (!v.rolCuenta) return this.errorForm.set('Elige el rol de acceso de la cuenta.');
      if (!documentoSirveDeClave(v.numeroDocumento)) {
        return this.errorForm.set(`Para crear la cuenta, el documento (que será su clave inicial) debe tener entre ${DOCUMENTO_MINIMO} y 20 letras o números, sin guiones ni espacios.`);
      }
    }
    // Los cursos NO se piden aquí: se eligen una sola vez, en el paso «Cursos» (por sección), y de ahí se arma la lista de cursos del docente.
    // Sin cursoIds el servidor deja intacta la lista que ya tenía (y vacía la de una persona nueva).
    this.guardando.set(true);
    this.errorForm.set(null);
    this.enviar(e, body, conCuenta, v.rolCuenta, continuar && this.hayPasoSiguiente());
  }

  private enviar(e: Docente | null, body: DocenteRequest, conCuenta: boolean, rolCuenta: RolPersonal | '', continuar = false): void {
    (e ? this.api.actualizarDocente(e.id, body) : this.api.crearDocente(body)).subscribe({
      next: persona => {
        this.cargarCursos();
        if (continuar) {
          // La persona ya está guardada: si pidió cuenta se crea ahora y se sigue (contrato y/o cursos) en la misma ventana.
          if (conCuenta) this.crearCuentaYSeguir(persona, rolCuenta as RolPersonal, !!e);
          else this.continuarFlujo(persona, !!e);
          return;
        }
        if (conCuenta) {
          this.crearCuenta(persona, rolCuenta as RolPersonal, e ? 'Datos actualizados.' : 'Personal registrado.');
          return;
        }
        this.guardando.set(false);
        this.avisos.success(e ? 'Datos actualizados.' : 'Personal registrado.');
        this.cerrar();
        this.cargar(e ? this.pagina() : 0);
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  /**
   * La persona ya está guardada; ahora se le crea la cuenta y se vincula. Si la cuenta falla, la persona queda registrada
   * y se avisa cómo completarla después (no se pierde lo ya hecho).
   */
  private crearCuenta(persona: Docente, rol: RolPersonal, mensajePersona: string): void {
    const paginaActual = this.editando() ? this.pagina() : 0;
    this.cuentas.crearParaPersonal({ id: persona.id, nombres: persona.nombres, apellidos: persona.apellidos, documento: persona.numeroDocumento, email: persona.email ?? undefined }, rol).subscribe({
      next: usuario => {
        this.guardando.set(false);
        this.cerrar();
        this.cargar(paginaActual);
        this.cuentaCreada.set({ persona: `${persona.nombres} ${persona.apellidos}`, usuario: usuario.username, rol: this.rolesPersonal.find(r => r.id === rol)?.etiqueta ?? rol, documento: persona.numeroDocumento });
      },
      error: err => {
        this.guardando.set(false);
        this.cerrar();
        this.cargar(0);
        this.avisos.warning(`${mensajePersona} Pero no se pudo crear su cuenta: ${mensajeError(err)} Puedes crearla en Personal → Cuentas de acceso.`);
      }
    });
  }

  /** Igual que {@link crearCuenta}, pero sin cerrar la ventana: los datos de la cuenta se muestran al terminar el contrato. */
  private crearCuentaYSeguir(persona: Docente, rol: RolPersonal, edicion: boolean): void {
    this.cuentas.crearParaPersonal({ id: persona.id, nombres: persona.nombres, apellidos: persona.apellidos, documento: persona.numeroDocumento, email: persona.email ?? undefined }, rol).subscribe({
      next: usuario => {
        this.cuentaPendiente.set({ persona: `${persona.nombres} ${persona.apellidos}`, usuario: usuario.username, rol: this.rolesPersonal.find(r => r.id === rol)?.etiqueta ?? rol, documento: persona.numeroDocumento });
        this.continuarFlujo(persona, edicion);
      },
      error: err => {
        this.avisos.warning(`Persona guardada, pero no se pudo crear su cuenta: ${mensajeError(err)} Puedes crearla en Personal → Cuentas de acceso.`);
        this.continuarFlujo(persona, edicion);
      }
    });
  }

  // ---------- Pasos siguientes: contrato (administrador) y cursos (docentes) ----------
  /** Después de guardar a la persona: su contrato si el usuario es administrador; si no, directo a los cursos (si es docente). */
  private continuarFlujo(persona: Docente, edicion: boolean): void {
    this.guardando.set(false);
    this.cargar(edicion ? this.pagina() : 0);
    this.personaContrato.set(persona);
    if (this.puedeCrearContrato()) this.iniciarContrato(persona);
    else if (this.esDocentePersona(persona)) this.iniciarCursos(persona);
    else this.cerrar();
  }

  private iniciarContrato(persona: Docente): void {
    this.errorContrato.set(null);
    // Si la persona ya tenía un contrato (se está editando a alguien que ya estaba), no se le puede crear otro: se avisa y se puede seguir.
    this.contratoExistente.set(null);
    this.rrhh.contratos(persona.id).pipe(catchError(() => of([] as Contrato[]))).subscribe(lista => this.contratoExistente.set(contratoQueImpideOtro(lista) ?? null));
    this.tipoContratoElegido('PLAZO_FIJO');
    this.formContrato.reset({ tipo: 'PLAZO_FIJO', fechaInicio: hoyLocal(), fechaFin: '', remuneracion: 0, observaciones: '' });
    this.paso.set('contrato');
  }

  /** Terminado (o saltado) el contrato sigue la cuenta de depósito. */
  private despuesDelContrato(persona: Docente): void {
    this.iniciarDeposito(persona);
  }

  // ---------- Paso de la cuenta para depositar el sueldo (administrador) ----------
  protected readonly bancos = BANCOS;
  protected readonly tiposCuenta = TIPOS_CUENTA;
  protected readonly guardandoCuenta = signal(false);
  protected readonly errorCuenta = signal<string | null>(null);
  /** Cuentas que la persona ya tenía (al editar a alguien que ya estaba): si hay, la nueva no es la principal. */
  protected readonly cuentasExistentes = signal<CuentaDeposito[]>([]);
  protected readonly formCuenta = this.fb.nonNullable.group({
    banco: ['BCP', Validators.required],
    tipo: ['AHORROS' as TipoCuenta, Validators.required],
    numero: [''],
    cci: [''],
    titular: ['', Validators.required]
  });
  private readonly vistaCuenta = signal(this.formCuenta.getRawValue());
  protected readonly esBilleteraCuenta = computed(() => this.vistaCuenta().tipo === 'BILLETERA');
  /** Las mismas reglas que el servidor, en vivo. */
  protected readonly erroresCuenta = computed(() => {
    const v = this.vistaCuenta();
    return validarCuenta(v.banco, v.tipo, v.numero, v.cci);
  });

  private iniciarDeposito(persona: Docente): void {
    this.personaContrato.set(persona);
    this.errorCuenta.set(null);
    this.cuentasExistentes.set([]);
    this.rrhh.cuentas(persona.id).pipe(catchError(() => of([] as CuentaDeposito[]))).subscribe(c => this.cuentasExistentes.set(c));
    this.formCuenta.reset({ banco: 'BCP', tipo: 'AHORROS', numero: '', cci: '', titular: `${persona.nombres} ${persona.apellidos}` });
    this.paso.set('deposito');
  }

  /** Guarda la cuenta de depósito (la primera de la persona es la principal) y sigue con los cursos si es docente. */
  protected guardarCuenta(): void {
    const persona = this.personaContrato();
    const e = this.erroresCuenta();
    if (!persona) return;
    if (this.formCuenta.invalid || e.tipo || e.numero || e.cci) {
      this.formCuenta.markAllAsTouched();
      this.formCuenta.controls.numero.markAsDirty();
      this.formCuenta.controls.cci.markAsDirty();
      return this.errorCuenta.set(e.tipo || e.numero || e.cci || 'Indica el titular de la cuenta.');
    }
    const v = this.formCuenta.getRawValue();
    this.guardandoCuenta.set(true);
    this.errorCuenta.set(null);
    this.rrhh.agregarCuenta({
      personalId: persona.id, banco: v.banco, tipo: v.tipo, numero: soloDigitos(v.numero), cci: v.tipo === 'BILLETERA' ? undefined : soloDigitos(v.cci) || undefined,
      titular: v.titular.trim(), principal: this.cuentasExistentes().length === 0
    }).subscribe({
      next: () => {
        this.guardandoCuenta.set(false);
        this.avisos.success(`Cuenta de depósito registrada para ${persona.nombres} ${persona.apellidos}.`);
        this.despuesDelDeposito(persona);
      },
      error: err => {
        this.guardandoCuenta.set(false);
        this.errorCuenta.set(mensajeError(err));
      }
    });
  }

  protected omitirDeposito(): void {
    const persona = this.personaContrato();
    this.avisos.info('Sin cuenta de depósito por ahora: puedes registrarla en Personal → Pago al personal → «Cuenta de depósito».');
    if (persona) this.despuesDelDeposito(persona);
    else this.cerrar();
  }

  /** Terminada (o saltada) la cuenta: si es docente sigue la asignación de cursos; si no, se cierra. */
  private despuesDelDeposito(persona: Docente): void {
    if (this.esDocentePersona(persona)) this.iniciarCursos(persona);
    else this.cerrar();
  }

  protected esDocentePersona(p: Docente | null): boolean {
    return p?.areaCodigo === AREA_DOCENCIA;
  }

  /** ¿Hay un paso después de guardar? Contrato para el administrador, cursos para un docente (con el área elegida en el formulario). */
  protected hayPasoSiguiente(): boolean {
    return this.puedeCrearContrato() || this.esDocencia();
  }

  protected etiquetaSiguiente(): string {
    const docente = this.esDocencia();
    if (this.puedeCrearContrato()) return docente ? 'Guardar y seguir: contrato y cursos →' : 'Guardar y crear contrato →';
    return 'Guardar y asignar cursos →';
  }

  /** Los pasos de la ventana, según quién la usa y si la persona es docente. */
  protected readonly pasosFlujo = computed(() => {
    const docente = this.paso() === 'datos' ? this.areaDelFormEsDocencia() : this.esDocentePersona(this.personaContrato());
    return [
      { id: 'datos' as const, etiqueta: 'Datos del personal' },
      ...(this.puedeCrearContrato() ? [{ id: 'contrato' as const, etiqueta: 'Contrato' }, { id: 'deposito' as const, etiqueta: 'Cuenta de depósito' }] : []),
      ...(docente ? [{ id: 'cursos' as const, etiqueta: 'Cursos' }] : [])
    ];
  });
  protected readonly pasoActual = computed(() => this.pasosFlujo().findIndex(p => p.id === this.paso()));
  private readonly areaDelFormEsDocencia = computed(() => this.areas().find(a => a.id === this.areaDelForm())?.codigo === AREA_DOCENCIA);

  protected elegirTipo(tipo: TipoContrato): void {
    this.formContrato.controls.tipo.setValue(tipo);
    if (tipo === 'INDEFINIDO') this.formContrato.controls.fechaFin.setValue('');
  }

  private tipoContratoElegido(tipo: TipoContrato): void {
    this.formContrato.controls.tipo.setValue(tipo, { emitEvent: false });
  }

  protected inicioHoy(): void {
    this.formContrato.controls.fechaInicio.setValue(hoyLocal());
  }

  protected inicioMesSiguiente(): void {
    this.formContrato.controls.fechaInicio.setValue(primerDiaMesSiguiente());
  }

  /** Atajos para la fecha de fin: «3 meses», «6 meses», «1 año» o «fin de año». Necesitan la fecha de inicio. */
  protected finEn(meses: number | 'anio'): void {
    const inicio = this.formContrato.controls.fechaInicio.value || hoyLocal();
    if (!this.formContrato.controls.fechaInicio.value) this.formContrato.controls.fechaInicio.setValue(inicio);
    this.formContrato.controls.fechaFin.setValue(meses === 'anio' ? finDeAnio(inicio) : finPorMeses(inicio, meses));
  }

  /** Vuelve a los datos de la persona (ya guardada, ahora en edición). No se ofrece si ya se le creó una cuenta, para no duplicarla. */
  protected volverADatos(): void {
    const p = this.personaContrato();
    if (!p) return;
    this.editar(p);
    this.paso.set('datos');
  }

  protected crearContrato(): void {
    const persona = this.personaContrato();
    const v = this.formContrato.getRawValue();
    const falta = this.resumenContrato().falta;
    if (!persona || falta) {
      this.formContrato.markAllAsTouched();
      return this.errorContrato.set(falta || 'No se pudo identificar a la persona.');
    }
    const body: ContratoRequest = {
      // El cargo ya se escribió en los datos de la persona: el contrato lo hereda (no se pide dos veces).
      personalId: persona.id, tipo: v.tipo, cargo: persona.cargo || undefined, fechaInicio: v.fechaInicio,
      fechaFin: v.tipo === 'INDEFINIDO' ? undefined : v.fechaFin, remuneracion: Number(v.remuneracion), observaciones: v.observaciones.trim() || undefined
    };
    this.guardandoContrato.set(true);
    this.errorContrato.set(null);
    this.rrhh.crearContrato(body).subscribe({
      next: () => {
        this.guardandoContrato.set(false);
        this.avisos.success(`Contrato creado para ${persona.nombres} ${persona.apellidos}.`);
        this.despuesDelContrato(persona);
      },
      error: err => {
        this.guardandoContrato.set(false);
        this.errorContrato.set(mensajeError(err));
      }
    });
  }

  /** Deja a la persona sin contrato por ahora (se crea después en Pago al personal). */
  protected omitirContrato(): void {
    const persona = this.personaContrato();
    this.avisos.info('Sin contrato por ahora: puedes crearlo después en Personal → Pago al personal.');
    if (persona) this.despuesDelContrato(persona);
    else this.cerrar();
  }

  // ---------- Paso de cursos: asignar al docente a secciones ----------
  protected readonly anioAsignar = signal<Anio | null>(null);
  private readonly seccionesAsignar = signal<Seccion[]>([]);
  private readonly mallasAsignar = signal<Record<number, MallaGrado | null>>({});
  private readonly asignacionesAsignar = signal<Asignacion[]>([]);
  protected readonly cargandoAsignar = signal(false);
  protected readonly guardandoAsignar = signal(false);
  protected readonly errorAsignar = signal<string | null>(null);
  protected readonly soloSuyos = signal(true);
  protected readonly elegidasAsignar = signal<ReadonlySet<string>>(new Set());

  private readonly gruposAsignar = computed(() => {
    const p = this.personaContrato();
    return p ? armarOpciones(this.seccionesAsignar(), this.mallasAsignar(), this.asignacionesAsignar(), p) : [];
  });
  /** Las secciones y cursos que se muestran, según «solo sus cursos». */
  protected readonly textoAsignar = signal('');
  protected readonly gruposVisibles = computed(() => filtrarPorTexto(filtrarGrupos(this.gruposAsignar(), this.soloSuyos()), this.textoAsignar()));
  protected readonly cargaAsignar = computed(() => cargaSemanal(this.gruposAsignar(), this.elegidasAsignar()));
  protected readonly cantidadElegida = computed(() => opcionesElegidas(this.gruposAsignar(), this.elegidasAsignar()).length);
  protected readonly sugeridasPendientes = computed(() => sugeridasLibres(filtrarGrupos(this.gruposAsignar(), true)).filter(c => !this.elegidasAsignar().has(c)).length);

  private iniciarCursos(persona: Docente): void {
    this.personaContrato.set(persona);
    this.errorAsignar.set(null);
    this.elegidasAsignar.set(new Set());
    this.textoAsignar.set('');
    // Si ya se sabe qué cursos dicta, se muestran solo esos; si no tiene ninguno marcado, todos los del grado.
    this.soloSuyos.set(!!persona.cursoIds?.length);
    this.paso.set('cursos');
    this.cargarAsignar();
  }

  /** Año (activo o, si no, planificado), sus secciones, la malla de cada grado y lo ya asignado. */
  private cargarAsignar(): void {
    this.cargandoAsignar.set(true);
    this.api.anios().pipe(catchError(() => of([] as Anio[]))).subscribe(anios => {
      const anio = anios.find(a => a.estado === 'ACTIVO') ?? anios.find(a => a.estado === 'PLANIFICADO') ?? null;
      this.anioAsignar.set(anio);
      if (!anio) {
        this.seccionesAsignar.set([]);
        this.asignacionesAsignar.set([]);
        this.cargandoAsignar.set(false);
        return;
      }
      forkJoin({
        secciones: this.api.secciones(anio.id).pipe(catchError(() => of([] as Seccion[]))),
        asignaciones: this.api.asignaciones(undefined, undefined, anio.id).pipe(catchError(() => of([] as Asignacion[])))
      }).subscribe(({ secciones, asignaciones }) => {
        const gradoIds = [...new Set(secciones.filter(s => s.activo).map(s => s.gradoId))];
        (gradoIds.length ? forkJoin(gradoIds.map(g => this.api.malla(g).pipe(catchError(() => of(null))))) : of([] as (MallaGrado | null)[])).subscribe(mallas => {
          this.seccionesAsignar.set(secciones);
          this.asignacionesAsignar.set(asignaciones);
          this.mallasAsignar.set(Object.fromEntries(gradoIds.map((g, i) => [g, mallas[i]])));
          this.cargandoAsignar.set(false);
        });
      });
    });
  }

  protected alternarAsignar(clave: string, on: boolean): void {
    const s = new Set(this.elegidasAsignar());
    if (on) s.add(clave);
    else s.delete(clave);
    this.elegidasAsignar.set(s);
  }

  /** Marca de una vez los cursos que el docente puede dictar y que nadie dicta aún. */
  protected elegirSugeridas(): void {
    this.elegidasAsignar.set(new Set([...this.elegidasAsignar(), ...sugeridasLibres(filtrarGrupos(this.gruposAsignar(), true))]));
  }

  protected limpiarElegidas(): void {
    this.elegidasAsignar.set(new Set());
  }

  /** Crea las asignaciones elegidas. Si alguna falla (p. ej. alguien la tomó mientras tanto) se dice cuáles y se puede reintentar. */
  protected asignarCursos(): void {
    const persona = this.personaContrato();
    const elegidas = opcionesElegidas(this.gruposAsignar(), this.elegidasAsignar());
    if (!persona || !elegidas.length) return;
    this.guardandoAsignar.set(true);
    this.errorAsignar.set(null);
    forkJoin(elegidas.map(o => this.api.crearAsignacion({ seccionId: o.seccionId, cursoId: o.cursoId, docenteId: persona.id }).pipe(
      map(() => ({ ok: true as const, o })),
      catchError(err => of({ ok: false as const, o, motivo: mensajeError(err) }))
    ))).subscribe(res => {
      this.guardandoAsignar.set(false);
      const falladas = res.filter(r => !r.ok);
      const hechas = res.length - falladas.length;
      // Lo que se asignó pasa a ser su lista de cursos (así el armado automático de horarios lo propone para esos cursos).
      const nuevos = res.filter(r => r.ok).map(r => r.o.cursoId);
      if (nuevos.length) this.sincronizarCursos(persona, nuevos);
      this.cargarCursos();
      if (!falladas.length) {
        this.avisos.success(`${hechas} ${hechas === 1 ? 'curso asignado' : 'cursos asignados'} a ${persona.nombres} ${persona.apellidos}.`);
        this.cerrar();
        return;
      }
      if (hechas) this.avisos.success(`${hechas} ${hechas === 1 ? 'curso asignado' : 'cursos asignados'}.`);
      this.errorAsignar.set(`No se pudo asignar: ${falladas.map(f => `${f.o.cursoNombre} (${this.seccionDe(f.o.seccionId)}): ${f.motivo}`).join(' · ')}`);
      this.elegidasAsignar.set(new Set());
      this.cargarAsignar();
    });
  }

  /** Suma los cursos asignados a la lista de cursos del docente (los que ya tenía se conservan). Si falla no se pierde nada: las asignaciones ya existen. */
  private sincronizarCursos(persona: Docente, asignados: readonly number[]): void {
    const cursoIds = cursosDelDocente(persona.cursoIds, asignados);
    const body: DocenteRequest = {
      areaId: persona.areaId, cargo: persona.cargo, tipoDocumento: persona.tipoDocumento, numeroDocumento: persona.numeroDocumento,
      nombres: persona.nombres, apellidos: persona.apellidos, email: persona.email, telefono: persona.telefono, especialidad: persona.especialidad, cursoIds
    };
    this.api.actualizarDocente(persona.id, body).pipe(catchError(() => of(null))).subscribe(() => this.cargar(this.pagina()));
  }

  private seccionDe(seccionId: number): string {
    const s = this.seccionesAsignar().find(x => x.id === seccionId);
    return s ? `${s.gradoNombre} ${s.nombre}` : `sección ${seccionId}`;
  }

  protected omitirCursos(): void {
    this.avisos.info('Sin cursos asignados por ahora: puedes hacerlo después en Cursos y docentes → Asignaciones.');
    this.cerrar();
  }

  protected tieneCuentaPendiente(): boolean {
    return this.cuentaPendiente() !== null;
  }

  protected async darDeBaja(p: Docente): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Dar de baja a ${p.apellidos}, ${p.nombres}?`, 'Dar de baja', true))) return;
    this.api.eliminarDocente(p.id).subscribe({
      next: () => {
        this.avisos.success('Persona dada de baja.');
        this.cargar(this.pagina());
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }
}
