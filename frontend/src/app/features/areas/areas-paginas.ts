import { Contrato } from '../../core/models/rrhh.model';
import { ResumenPersona } from '../personal/asistencia-personal';
import { rige } from '../personal/rrhh';

/**
 * Páginas de las áreas de trabajo. Algunas áreas ya tienen su propia sección en el sistema (Secretaría → Matrícula, Tesorería → Finanzas…): su
 * tarjeta lleva ahí. Las demás (y cualquier área nueva que cree el colegio) tienen una página genérica con su personal, su asistencia, su dinero
 * y accesos a lo que necesitan.
 */

/** Sección propia que ya existe para un área. {@code roles} = quién la puede abrir (las demás personas usan la página genérica del área). */
export interface PaginaPropia {
  ruta: string;
  etiqueta: string;
  roles: readonly string[];
}

const PERSONAL = ['ADMIN', 'SECRETARIA'];

export const PAGINAS_PROPIAS: Readonly<Record<string, PaginaPropia>> = {
  ACADEMICA: { ruta: '/planificacion/panel', etiqueta: 'Aulas y secciones', roles: PERSONAL },
  DOCENCIA: { ruta: '/planificacion/cursos-docentes', etiqueta: 'Cursos y docentes', roles: PERSONAL },
  SECRETARIA: { ruta: '/matriculas', etiqueta: 'Matrícula', roles: PERSONAL },
  TESORERIA: { ruta: '/finanzas', etiqueta: 'Finanzas', roles: PERSONAL },
  ADMINISTRACION: { ruta: '/personal/pagos', etiqueta: 'Pago al personal', roles: ['ADMIN'] }
};

/** La sección propia del área si existe y la persona puede abrirla; si no, {@code undefined} (le toca la página genérica). */
export function paginaPropiaDe(codigo: string, roles: readonly string[]): PaginaPropia | undefined {
  const p = PAGINAS_PROPIAS[(codigo ?? '').toUpperCase()];
  return p && p.roles.some(r => roles.includes(r)) ? p : undefined;
}

/** A dónde lleva la tarjeta de un área: su sección propia o su página genérica. */
export function rutaDelArea(codigo: string, roles: readonly string[]): string {
  return paginaPropiaDe(codigo, roles)?.ruta ?? `/areas/${encodeURIComponent(codigo)}`;
}

/** Algo a lo que se puede entrar desde la página de un área, y quiénes lo ven. */
export interface Acceso {
  etiqueta: string;
  ruta: string;
  roles: readonly string[];
  ayuda: string;
}

/** Qué hace cada área, en una línea por cosa. Las áreas nuevas (sin entrada aquí) usan la descripción que se les escribió. */
export const FUNCIONES: Readonly<Record<string, readonly string[]>> = {
  DIRECCION: ['Conducir la gestión del colegio.', 'Aprobar matrículas, contratos y el reparto del dinero.', 'Revisar el avance del año y de cada área.'],
  AUXILIARES: ['Disciplina y convivencia en patios y aulas.', 'Control de ingreso, salida y recreos.', 'Apoyo a docentes y cuidado de los estudiantes.'],
  PSICOLOGIA: ['Orientación y bienestar del estudiante.', 'Seguimiento de casos y convivencia escolar.', 'Trabajo con tutores y familias.'],
  ADMISION: ['Atender a las familias interesadas y las visitas guiadas.', 'Campañas de matrícula y comunicaciones.', 'Redes, comunicados e imagen del colegio.'],
  TI: ['Soporte técnico y plataforma educativa.', 'Cuentas de acceso del personal, alumnos y familias.', 'Laboratorio de cómputo y sistemas.'],
  BIBLIOTECA: ['Biblioteca y centro de recursos.', 'Laboratorios de ciencias.', 'Materiales de los cursos.'],
  SALUD: ['Tópico y primeros auxilios.', 'Fichas de salud de los estudiantes.', 'Control de salud escolar.'],
  SEGURIDAD: ['Vigilancia y control de ingreso.', 'Plan de contingencia y simulacros.', 'Registro de visitas y salidas.'],
  MANTENIMIENTO: ['Infraestructura, jardinería y limpieza.', 'Estado de aulas, pabellones y servicios.', 'Servicios generales.']
};

export function funcionesDe(codigo: string): readonly string[] {
  return FUNCIONES[(codigo ?? '').toUpperCase()] ?? [];
}

/** Pantallas del sistema que cada área suele necesitar. Se filtran por rol: cada persona ve solo las que puede abrir. */
export const ACCESOS: Readonly<Record<string, readonly Acceso[]>> = {
  DIRECCION: [
    { etiqueta: 'Panel del administrador', ruta: '/inicio', roles: PERSONAL, ayuda: 'Estadísticas, pre-matrículas y aulas.' },
    { etiqueta: 'Matrículas por aprobar', ruta: '/matriculas/aprobaciones', roles: ['ADMIN'], ayuda: 'Aprobar o rechazar matrículas.' },
    { etiqueta: 'Finanzas', ruta: '/finanzas', roles: PERSONAL, ayuda: 'Resumen de cobranza y morosos.' },
    { etiqueta: 'Pago al personal', ruta: '/personal/pagos', roles: ['ADMIN'], ayuda: 'Contratos, planilla y depósitos.' }
  ],
  AUXILIARES: [
    { etiqueta: 'Justificaciones de asistencia', ruta: '/asistencia/justificaciones', roles: PERSONAL, ayuda: 'Inasistencias de alumnos justificadas por las familias.' },
    { etiqueta: 'Reporte de asistencia', ruta: '/asistencia/reporte', roles: PERSONAL, ayuda: 'Asistencia de los alumnos por sección.' },
    { etiqueta: 'Aulas y secciones', ruta: '/planificacion/panel', roles: PERSONAL, ayuda: 'Tutores, alumnos y cursos de cada sección.' },
    { etiqueta: 'Calendario', ruta: '/calendario', roles: PERSONAL, ayuda: 'Feriados y fechas del año.' }
  ],
  PSICOLOGIA: [
    { etiqueta: 'Alumnos', ruta: '/alumnos', roles: PERSONAL, ayuda: 'Fichas, apoderados y datos de cada alumno.' },
    { etiqueta: 'Aulas y secciones', ruta: '/planificacion/panel', roles: PERSONAL, ayuda: 'Tutor y alumnos de cada sección.' },
    { etiqueta: 'Justificaciones de asistencia', ruta: '/asistencia/justificaciones', roles: PERSONAL, ayuda: 'Ausencias que pueden tener un motivo de bienestar.' },
    { etiqueta: 'Libretas y boletines', ruta: '/calificaciones/boletines', roles: PERSONAL, ayuda: 'Rendimiento de los alumnos.' }
  ],
  ADMISION: [
    { etiqueta: 'Campañas de matrícula', ruta: '/matriculas/campanias', roles: PERSONAL, ayuda: 'Fechas y metas de cada campaña.' },
    { etiqueta: 'Matrículas', ruta: '/matriculas', roles: PERSONAL, ayuda: 'Pre-matrículas y matrículas.' },
    { etiqueta: 'Cupos', ruta: '/matriculas/cupos', roles: PERSONAL, ayuda: 'Vacantes por sección.' },
    { etiqueta: 'Avisos y plantillas', ruta: '/notificaciones/envio', roles: ['ADMIN'], ayuda: 'Comunicados a las familias.' },
    { etiqueta: 'Sitio público', ruta: '/admision', roles: PERSONAL, ayuda: 'Cómo ven la admisión las familias.' }
  ],
  TI: [
    { etiqueta: 'Cuentas de acceso', ruta: '/cuentas', roles: ['ADMIN'], ayuda: 'Crear y restablecer cuentas del personal y de las familias.' },
    { etiqueta: 'Usuarios y roles', ruta: '/usuarios', roles: ['ADMIN'], ayuda: 'Quién puede entrar y con qué rol.' },
    { etiqueta: 'Importar alumnos', ruta: '/alumnos/importar', roles: PERSONAL, ayuda: 'Carga masiva desde un archivo.' }
  ],
  BIBLIOTECA: [
    { etiqueta: 'Cursos', ruta: '/configuracion/cursos', roles: PERSONAL, ayuda: 'Cursos del colegio y quiénes los dictan.' },
    { etiqueta: 'Aulas y secciones', ruta: '/planificacion/panel', roles: PERSONAL, ayuda: 'Cursos y docentes de cada sección.' }
  ],
  SALUD: [
    { etiqueta: 'Alumnos', ruta: '/alumnos', roles: PERSONAL, ayuda: 'Ficha de salud de cada alumno.' },
    { etiqueta: 'Justificaciones de asistencia', ruta: '/asistencia/justificaciones', roles: PERSONAL, ayuda: 'Ausencias por motivos de salud.' }
  ],
  SEGURIDAD: [
    { etiqueta: 'Aulas y secciones', ruta: '/planificacion/panel', roles: PERSONAL, ayuda: 'Aulas y pabellones del colegio.' },
    { etiqueta: 'Calendario', ruta: '/calendario', roles: PERSONAL, ayuda: 'Fechas del año y feriados.' },
    { etiqueta: 'Reporte de asistencia', ruta: '/asistencia/reporte', roles: PERSONAL, ayuda: 'Asistencia de los alumnos por sección.' }
  ],
  MANTENIMIENTO: [
    { etiqueta: 'Aulas y secciones', ruta: '/planificacion/panel', roles: PERSONAL, ayuda: 'Aulas y pabellones por mantener.' },
    { etiqueta: 'Estructura académica', ruta: '/configuracion/estructura', roles: PERSONAL, ayuda: 'Pabellones y aulas.' }
  ]
};

/** Los accesos del área que la persona puede abrir (las áreas sin accesos definidos no muestran ninguno). */
export function accesosDe(codigo: string, roles: readonly string[]): Acceso[] {
  return (ACCESOS[(codigo ?? '').toUpperCase()] ?? []).filter(a => a.roles.some(r => roles.includes(r)));
}

export interface KpisArea {
  personas: number;
  /** Presentes y tardanzas sobre los días exigibles del grupo (las justificadas y los permisos no cuentan); {@code null} si no hay datos. */
  asistencia: number | null;
  faltas: number;
  tardanzas: number;
  /** Sin contrato que rija (solo tiene sentido para quien puede ver los contratos). */
  sinContrato: number;
  porVencer: number;
  sinCuentaDeAcceso: number;
}

/** Los números de arriba de la página de un área, a partir de su personal, la asistencia del mes y el contrato de cada persona. */
export function kpisDeArea(
  personal: readonly { id: number; usuarioId?: number | null }[],
  resumenes: ReadonlyMap<number, ResumenPersona>,
  contratoDe: (personalId: number) => Contrato | undefined
): KpisArea {
  let presentes = 0, tardanzas = 0, faltas = 0, sinContrato = 0, porVencer = 0, sinCuenta = 0;
  for (const p of personal) {
    const r = resumenes.get(p.id);
    if (r) { presentes += r.presentes; tardanzas += r.tardanzas; faltas += r.faltas; }
    const c = contratoDe(p.id);
    if (!rige(c)) sinContrato++;
    else if (c?.estadoEfectivo === 'POR_VENCER') porVencer++;
    if (!p.usuarioId) sinCuenta++;
  }
  const exigibles = presentes + tardanzas + faltas;
  return {
    personas: personal.length, asistencia: exigibles ? Math.round(((presentes + tardanzas) / exigibles) * 100) : null,
    faltas, tardanzas, sinContrato, porVencer, sinCuentaDeAcceso: sinCuenta
  };
}

/** Cosas que conviene atender de una persona del área (vacío si no hay nada). */
export function alertasDe(c: Contrato | undefined, tieneCuentaDeAcceso: boolean, verContratos: boolean): string[] {
  const a: string[] = [];
  if (verContratos) {
    if (!rige(c)) a.push('Sin contrato vigente');
    else if (c?.estadoEfectivo === 'POR_VENCER') a.push('Contrato por vencer');
  }
  if (!tieneCuentaDeAcceso) a.push('Sin cuenta de acceso');
  return a;
}
