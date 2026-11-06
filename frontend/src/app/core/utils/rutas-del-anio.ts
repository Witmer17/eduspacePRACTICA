/**
 * Pantallas cuya información es «de un periodo»: se muestran con el año académico ACTIVO. Si no hay ninguno activo, quedan vacías
 * y el sistema avisa «No hay un periodo activo». No están aquí las que sirven justamente para preparar un periodo nuevo
 * (Apertura, Años y periodos, Campañas, Grados, Cursos, Mallas).
 */
export const RUTAS_DEL_ANIO_ACTIVO: readonly string[] = [
  '/configuracion/estructura',
  '/matriculas',
  '/matriculas/cupos',
  '/planificacion/secciones',
  '/planificacion/asignaciones',
  '/planificacion/horarios',
  '/planificacion/horarios-auto',
  '/planificacion/feriados',
  '/planificacion/panel',
  '/planificacion/cursos-docentes',
  '/planificacion/aulas-disponibles',
  '/pagos/tarifas',
  '/pagos/cuentas',
  '/asistencia/reporte',
  '/calificaciones/cierre'
];

/** Rutas que cuelgan de una de arriba pero sirven para preparar un periodo (no se vacían): campañas y aprobaciones de matrícula. */
const EXCEPCIONES: readonly string[] = ['/matriculas/campanias', '/matriculas/aprobaciones'];

/** ¿La pantalla de esta URL muestra información del periodo activo? */
export function dependeDelAnioActivo(url: string): boolean {
  const ruta = url.split(/[?#]/)[0].replace(/\/+$/, '');
  if (EXCEPCIONES.some(e => ruta === e || ruta.startsWith(e + '/'))) return false;
  return RUTAS_DEL_ANIO_ACTIVO.some(r => ruta === r || ruta.startsWith(r + '/'));
}
