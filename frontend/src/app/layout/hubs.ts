/**
 * Espacios de trabajo del personal: cada uno reúne las pantallas que se usan juntas (p. ej. todo lo de matrícula, o todo
 * lo de horarios), para no saltar por el menú entre ellas. Las rutas no cambian: el menú vertical del espacio se muestra
 * junto a cualquier pantalla que figure aquí, con un ícono por opción.
 */
export interface Pestana {
  etiqueta: string;
  ruta: string;
  roles: string[];
  /** Trazo SVG (24×24, estilo lineal) que acompaña a la opción en el menú vertical. */
  icono: string;
  /** Solo existe con el login propio (con Keycloak las cuentas se administran en su consola). */
  soloEduspace?: boolean;
  /** Título del grupo del menú vertical al que pertenece (las opciones seguidas con el mismo grupo se agrupan bajo un encabezado). */
  grupo?: string;
  /** Tiene un árbol debajo en el menú vertical: lista todos los grados del colegio, por nivel (ver ArbolEstructuraService). */
  conHijos?: boolean;
}

/** Espacios de una sola página (Inicio y Personal de Caja): la barra superior ya los nombra, no llevan menú vertical. */
export const SIN_MENU_VERTICAL = ['caja', 'caja-personal'];

export interface Hub {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  pestanas: Pestana[];
}

const PERSONAL = ['ADMIN', 'SECRETARIA'];
const ADMIN = ['ADMIN'];
const CAJA = ['CAJERO'];
/** El admin ve solo «Caja → Inicio» en el menú (el menú del personal debe quedar corto); desde ahí entra a las demás pantallas. */
const CAJA_ADMIN = ['CAJERO', 'ADMIN'];

export const HUBS: Hub[] = [
  // Caja usa la misma barra horizontal que administración: Inicio (ventanilla de cobro), Alumnos (cuentas, morosos, cobranza) y Personal (pago al personal).
  {
    id: 'caja',
    titulo: 'Inicio',
    descripcion: 'Inicio de caja',
    icono: 'M3 11l9-8 9 8M5 10v10h14V10',
    pestanas: [{ etiqueta: 'Inicio', ruta: '/caja', roles: CAJA_ADMIN, icono: 'M3 11l9-8 9 8M5 10v10h14V10' }]
  },
  {
    id: 'caja-alumnos',
    titulo: 'Alumnos',
    descripcion: 'Alumnos',
    icono: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
    pestanas: [
      { etiqueta: 'Cuentas por alumno', ruta: '/caja/alumnos', roles: CAJA, icono: 'M3 7h18v10H3zM3 11h18' },
      { etiqueta: 'Morosos', ruta: '/caja/alumnos/morosos', roles: CAJA, icono: 'M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z' },
      { etiqueta: 'Cobranza', ruta: '/caja/alumnos/cobranza', roles: CAJA, icono: 'M12 3v18M16 7H10a3 3 0 000 6h4a3 3 0 010 6H7' }
    ]
  },
  {
    id: 'caja-personal',
    titulo: 'Personal',
    descripcion: 'Personal',
    icono: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
    pestanas: [{ etiqueta: 'Personal', ruta: '/caja/personal', roles: CAJA, icono: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z' }]
  },
  {
    id: 'alumnos',
    titulo: 'Alumnos',
    descripcion: 'Alumnos y apoderados, asistencia, notas, cuentas y documentos de cada alumno',
    icono: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
    pestanas: [
      { grupo: 'Alumnos', etiqueta: 'Alumnos', ruta: '/alumnos', roles: PERSONAL, icono: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z' },
      { grupo: 'Alumnos', etiqueta: 'Apoderados', ruta: '/apoderados', roles: PERSONAL, icono: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8' },
      { grupo: 'Alumnos', etiqueta: 'Importar alumnos', ruta: '/alumnos/importar', roles: PERSONAL, icono: 'M12 3v12M7 10l5 5 5-5M4 21h16' },
      { grupo: 'Asistencia y notas', etiqueta: 'Justificaciones', ruta: '/asistencia/justificaciones', roles: PERSONAL, icono: 'M7 3h8l4 4v14H7zM15 3v4h4M10 13h6M10 17h6' },
      { grupo: 'Asistencia y notas', etiqueta: 'Reporte de asistencia', ruta: '/asistencia/reporte', roles: PERSONAL, icono: 'M3 20h18M6 20V10M12 20V4M18 20v-7' },
      { grupo: 'Asistencia y notas', etiqueta: 'Libretas y boletines', ruta: '/calificaciones/boletines', roles: PERSONAL, icono: 'M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4zM8 8h8' },
      { grupo: 'Pagos', etiqueta: 'Cuentas por alumno', ruta: '/pagos/cuentas', roles: PERSONAL, icono: 'M3 7h18v10H3zM3 11h18' },
      { grupo: 'Documentos', etiqueta: 'Documentos', ruta: '/documentos', roles: PERSONAL, icono: 'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6' }
    ]
  },
  {
    id: 'matricula',
    titulo: 'Matrícula',
    descripcion: 'Matricular a un alumno paso a paso, aprobar las matrículas pagadas y ver los cupos',
    icono: 'M4 5h16v14H4zM8 9h8M8 13h5',
    pestanas: [
      { etiqueta: 'Asistente de matrícula', ruta: '/matricula/asistente', roles: PERSONAL, icono: 'M5 12l5 5L20 7' },
      { etiqueta: 'Matrículas', ruta: '/matriculas', roles: PERSONAL, icono: 'M4 5h16v14H4zM8 9h8M8 13h5' },
      { etiqueta: 'Por aprobar', ruta: '/matriculas/aprobaciones', roles: PERSONAL, icono: 'M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0' },
      { etiqueta: 'Cupos', ruta: '/matriculas/cupos', roles: PERSONAL, icono: 'M4 6h16M4 12h16M4 18h10' }
    ]
  },
  {
    id: 'aulas',
    titulo: 'Aulas y secciones',
    descripcion: 'Elegir una sección y ver su tutor, alumnos, cursos y docentes',
    icono: 'M3 21V8l9-5 9 5v13M9 21v-6h6v6',
    pestanas: [{ etiqueta: 'Panel de aulas', ruta: '/planificacion/panel', roles: PERSONAL, icono: 'M3 21V8l9-5 9 5v13M9 21v-6h6v6' }]
  },
  {
    id: 'cursos',
    titulo: 'Cursos y docentes',
    descripcion: 'Quién dicta qué curso en cada sección',
    icono: 'M5 4h14v16H5zM9 9h6M9 13h6',
    pestanas: [
      { etiqueta: 'Panel de cursos', ruta: '/planificacion/cursos-docentes', roles: PERSONAL, icono: 'M5 4h14v16H5zM9 9h6M9 13h6' },
      { etiqueta: 'Asignaciones', ruta: '/planificacion/asignaciones', roles: PERSONAL, icono: 'M9 11l3 3 8-8M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h9' }
    ]
  },
  {
    id: 'horarios',
    titulo: 'Horarios',
    descripcion: 'Armado automático, edición y aulas libres',
    icono: 'M4 5h16v15H4zM4 10h16M10 5v15',
    pestanas: [
      { etiqueta: 'Armado automático', ruta: '/planificacion/horarios-auto', roles: PERSONAL, icono: 'M13 2L4 14h7l-1 8 9-12h-7z' },
      { etiqueta: 'Horario por sección', ruta: '/planificacion/horarios', roles: PERSONAL, icono: 'M4 5h16v15H4zM4 10h16M10 5v15' },
      { etiqueta: 'Aulas disponibles', ruta: '/planificacion/aulas-disponibles', roles: PERSONAL, icono: 'M6 3h12v18H6zM14 12h.01' }
    ]
  },
  {
    id: 'seguimiento',
    titulo: 'Cierre de notas',
    descripcion: 'Cierre y reapertura de los periodos de notas',
    icono: 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z',
    pestanas: [{ etiqueta: 'Cierre de periodo', ruta: '/calificaciones/cierre', roles: PERSONAL, icono: 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z' }]
  },
  {
    id: 'finanzas',
    titulo: 'Finanzas',
    descripcion: 'Resumen, cobranza y morosos',
    icono: 'M3 20h18M6 20v-6M11 20V8M16 20v-9M21 20V4',
    pestanas: [
      { etiqueta: 'Resumen', ruta: '/finanzas', roles: PERSONAL, icono: 'M3 20h18M6 20v-6M11 20V8M16 20v-9M21 20V4' },
      { etiqueta: 'Cobranza', ruta: '/pagos/cobranza', roles: PERSONAL, icono: 'M12 3v18M16 7H10a3 3 0 000 6h4a3 3 0 010 6H7' },
      { etiqueta: 'Morosos y alertas', ruta: '/pagos/morosos', roles: PERSONAL, icono: 'M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z' }
    ]
  },
  {
    id: 'administracion',
    titulo: 'Avisos',
    descripcion: 'Avisos a las familias y plantillas de los avisos automáticos',
    icono: 'M6 9a6 6 0 0112 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 004 0',
    pestanas: [{ etiqueta: 'Avisos y plantillas', ruta: '/notificaciones/envio', roles: ADMIN, icono: 'M6 9a6 6 0 0112 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 004 0' }]
  },
  {
    id: 'personal',
    titulo: 'Personal',
    descripcion: 'Las personas contratadas, por área de trabajo, con su pago, asistencia, cuentas de acceso, usuarios y roles',
    icono: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
    pestanas: [
      { etiqueta: 'Áreas', ruta: '/personal', roles: PERSONAL, icono: 'M3 21V8l9-5 9 5v13M3 21h18M9 21v-5h6v5M9 11h.01M15 11h.01' },
      { etiqueta: 'Páginas de áreas', ruta: '/areas', roles: PERSONAL, icono: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
      // La entrada del menú va a la primera pestaña (Áreas), que abren ADMIN y SECRETARIA; el pago es solo del administrador.
      { etiqueta: 'Pago al personal', ruta: '/personal/pagos', roles: ADMIN, icono: 'M2 6h20v13H2zM2 10h20M6 15h4' },
      { etiqueta: 'Asistencia del personal', ruta: '/personal/asistencia', roles: PERSONAL, icono: 'M9 12l2 2 4-4M5 4h14v17H5zM9 2h6v4H9z' },
      { etiqueta: 'Cuentas de acceso', ruta: '/cuentas', roles: ADMIN, icono: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6' },
      { etiqueta: 'Usuarios y roles', ruta: '/usuarios', roles: ADMIN, icono: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z' }
    ]
  },
  {
    id: 'configuracion',
    titulo: 'Configuración',
    descripcion: 'Lo permanente del colegio: datos, grados, cursos, estructura y áreas de trabajo (lo de cada año está en Apertura de periodo)',
    icono: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 4v6M9 14v6',
    pestanas: [
      { etiqueta: 'Resumen', ruta: '/configuracion', roles: PERSONAL, icono: 'M9 11l3 3 8-8M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h9' },
      { grupo: 'El colegio', etiqueta: 'Datos del colegio', ruta: '/configuracion/colegio', roles: PERSONAL, icono: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01' },
      { grupo: 'El colegio', etiqueta: 'Niveles y grados', ruta: '/configuracion/grados', roles: PERSONAL, icono: 'M3 21h18M6 21V10l6-5 6 5v11M10 21v-6h4v6' },
      { grupo: 'El colegio', etiqueta: 'Cursos', ruta: '/configuracion/cursos', roles: PERSONAL, icono: 'M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5zM4 19.5V21h16' },
      // Aulas físicas, secciones, cursos, malla y bloques horarios se reúnen aquí, por grado.
      { grupo: 'El colegio', etiqueta: 'Estructura académica', ruta: '/configuracion/estructura', roles: PERSONAL, icono: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', conHijos: true },
      { grupo: 'Personal', etiqueta: 'Áreas de trabajo', ruta: '/configuracion/areas', roles: PERSONAL, icono: 'M3 21V8l9-5 9 5v13M3 21h18M9 21v-5h6v5M9 11h.01M15 11h.01' },
      // La semana de cada docente en una grilla: lo que se arma aquí es el horario de los grados.
      { grupo: 'Personal', etiqueta: 'Horario del docente', ruta: '/configuracion/horarios', roles: PERSONAL, icono: 'M4 5h16v15H4zM4 10h16M10 5v15' }
    ]
  },
  {
    id: 'apertura',
    titulo: 'Apertura de periodo',
    descripcion: 'Todo lo necesario para abrir un año escolar, paso a paso: año y periodos, feriados, cobros y campaña de matrícula',
    icono: 'M5 21V4M5 4h12l-2 4 2 4H5',
    pestanas: [
      { etiqueta: 'Pasos de la apertura', ruta: '/apertura', roles: PERSONAL, icono: 'M9 11l3 3 8-8M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h9' },
      { grupo: 'Calendario', etiqueta: 'Años y periodos', ruta: '/planificacion/anios', roles: PERSONAL, icono: 'M4 5h16v15H4zM4 10h16M9 3v4M15 3v4' },
      { grupo: 'Calendario', etiqueta: 'Feriados', ruta: '/planificacion/feriados', roles: PERSONAL, icono: 'M12 3l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.4l6-.9z' },
      { grupo: 'Cobros del año', etiqueta: 'Conceptos de pago', ruta: '/pagos/conceptos', roles: ADMIN, icono: 'M3 3h8l10 10-8 8L3 11zM7.5 7.5h.01' },
      { grupo: 'Cobros del año', etiqueta: 'Tarifas', ruta: '/pagos/tarifas', roles: ADMIN, icono: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
      { grupo: 'Cobros del año', etiqueta: 'Descuentos', ruta: '/pagos/descuentos', roles: ADMIN, icono: 'M19 5L5 19M7 7h.01M17 17h.01' },
      { grupo: 'Matrícula', etiqueta: 'Campañas de matrícula', ruta: '/matriculas/campanias', roles: PERSONAL, icono: 'M5 21V4M5 4h12l-2 4 2 4H5' }
    ]
  }
];

/** Quita parámetros y fragmento de una URL. */
export const sinParametros = (url: string): string => url.split(/[?#]/)[0];

const coincide = (url: string, ruta: string): boolean => url === ruta || url.startsWith(ruta + '/');

/** El hub al que pertenece una URL y su pestaña (gana la ruta más específica: `/alumnos/importar` antes que `/alumnos`). */
export function hubDe(url: string): { hub: Hub; pestana: Pestana } | null {
  const u = sinParametros(url);
  let mejor: { hub: Hub; pestana: Pestana } | null = null;
  for (const hub of HUBS) {
    for (const pestana of hub.pestanas) {
      if (coincide(u, pestana.ruta) && (!mejor || pestana.ruta.length > mejor.pestana.ruta.length)) mejor = { hub, pestana };
    }
  }
  return mejor;
}
