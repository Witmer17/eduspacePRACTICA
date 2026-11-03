import { Campania } from '../../core/models/matricula.model';
import { Anio, Asignacion, Bloque, Grado, MallaGrado, Periodo, Seccion } from '../../core/models/planificacion.model';

/** Lo que se sabe del año que se va a abrir. `null` = no se pudo consultar. */
export interface DatosApertura {
  anios: Anio[] | null;
  /** Grados que ofrece el colegio. */
  grados: Grado[] | null;
  periodos: Periodo[] | null;
  feriados: number | null;
  secciones: Seccion[] | null;
  mallas: Record<number, MallaGrado | null | undefined>;
  asignaciones: Asignacion[] | null;
  bloques: Bloque[] | null;
  conceptos: number | null;
  tarifas: number | null;
  campanias: Campania[] | null;
}

/** ok: listo · pendiente: falta algo necesario · opcional: conviene pero no bloquea · sin-datos: no se pudo consultar. */
export type EstadoPaso = 'ok' | 'pendiente' | 'opcional' | 'sin-datos';

export interface PasoApertura {
  id: string;
  numero: number;
  titulo: string;
  /** Qué es y para qué sirve, en palabras simples (se muestra al abrir el paso). */
  ayuda: string;
  /** Estado actual en una línea. */
  detalle: string;
  estado: EstadoPaso;
  ruta: string;
  accion: string;
  /** Es necesario para poder abrir el periodo (los opcionales no bloquean). */
  requerido: boolean;
}

/**
 * El año que se está abriendo: el planificado más reciente (el que viene) y, si no hay ninguno, el activo.
 * Un año cerrado nunca se abre de nuevo.
 */
export function anioPorAbrir(anios: readonly Anio[] | null): Anio | null {
  if (!anios) return null;
  const planificados = anios.filter(a => a.estado === 'PLANIFICADO').sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));
  return planificados[0] ?? anios.find(a => a.estado === 'ACTIVO') ?? null;
}

const plural = (n: number, uno: string, varios: string): string => `${n} ${n === 1 ? uno : varios}`;
const turnoTexto = (t: string): string => (t === 'MANANA' ? 'mañana' : 'tarde');

/** Convierte lo que hay del año en la lista de pasos para abrirlo, en el orden en que conviene hacerlos. */
export function evaluarApertura(d: DatosApertura): PasoApertura[] {
  const anio = anioPorAbrir(d.anios);
  const pasos: PasoApertura[] = [];
  const add = (p: Omit<PasoApertura, 'numero'>): void => { pasos.push({ ...p, numero: pasos.length + 1 }); };
  const sd = (id: string, titulo: string, ayuda: string, ruta: string, accion: string, requerido: boolean): void =>
    add({ id, titulo, ayuda, ruta, accion, requerido, estado: 'sin-datos', detalle: 'No se pudo consultar.' });
  const sinAnio = !anio;

  // 1. El año
  add({
    id: 'anio', titulo: 'Crear el año académico', requerido: true, ruta: '/planificacion/anios', accion: anio ? 'Revisar el año' : 'Crear el año',
    ayuda: 'El año escolar con su fecha de inicio y de fin. Todo lo demás (periodos, secciones, horarios, matrículas y cuotas) cuelga de él.',
    ...(d.anios === null ? { estado: 'sin-datos' as const, detalle: 'No se pudo consultar.' }
      : anio ? { estado: 'ok' as const, detalle: `${anio.nombre} · ${anio.estado === 'ACTIVO' ? 'ya está activo' : 'planificado'}` }
      : { estado: 'pendiente' as const, detalle: 'No hay un año por abrir: créalo con sus fechas.' })
  });

  // 2. Periodos
  const ayudaPeriodos = 'Cómo se divide el año: bimestres, trimestres o semestres. Sobre ellos se registran las notas y se cierran las libretas.';
  if (d.periodos === null) sd('periodos', 'Definir los periodos', ayudaPeriodos, '/planificacion/anios', 'Definir periodos', true);
  else add({
    id: 'periodos', titulo: 'Definir los periodos', ayuda: ayudaPeriodos, ruta: '/planificacion/anios', requerido: true,
    accion: d.periodos.length ? 'Revisar periodos' : 'Definir periodos',
    estado: sinAnio ? 'pendiente' : d.periodos.length ? 'ok' : 'pendiente',
    detalle: sinAnio ? 'Primero crea el año.' : d.periodos.length ? plural(d.periodos.length, 'periodo definido', 'periodos definidos') : 'Elige el régimen (bimestral, trimestral…) para generar los periodos.'
  });

  // 3. Feriados
  const ayudaFeriados = 'Los días sin clases. El sistema los usa para no programar clases ni tomar asistencia esos días.';
  if (d.feriados === null) sd('feriados', 'Cargar los feriados', ayudaFeriados, '/planificacion/feriados', 'Cargar feriados', false);
  else add({
    id: 'feriados', titulo: 'Cargar los feriados', ayuda: ayudaFeriados, ruta: '/planificacion/feriados', requerido: false,
    accion: d.feriados ? 'Revisar feriados' : 'Cargar feriados',
    estado: d.feriados > 0 ? 'ok' : 'opcional', detalle: d.feriados > 0 ? plural(d.feriados, 'feriado cargado', 'feriados cargados') : 'Sin feriados, las clases correrían todos los días.'
  });

  // 4. Grados que se abren
  const grados = d.grados ?? [];
  const ayudaGrados = 'Los grados que se dictan este año. Se eligen una sola vez en Configuración → Niveles y grados.';
  if (d.grados === null) sd('grados', 'Grados que se abren', ayudaGrados, '/configuracion/grados', 'Elegir grados', true);
  else add({
    id: 'grados', titulo: 'Grados que se abren', ayuda: ayudaGrados, ruta: '/configuracion/grados', requerido: true, accion: grados.length ? 'Revisar grados' : 'Elegir grados',
    estado: grados.length ? 'ok' : 'pendiente', detalle: grados.length ? plural(grados.length, 'grado ofrecido', 'grados ofrecidos') : 'Elige los grados que ofrece el colegio.'
  });

  // 5. Cursos de cada grado
  const conMalla = grados.filter(g => (d.mallas[g.id]?.cursos.length ?? 0) > 0);
  const ayudaMalla = 'Qué cursos lleva cada grado y cuántas horas por semana. Sin cursos no se puede armar un horario.';
  if (d.grados === null) sd('malla', 'Cursos de cada grado', ayudaMalla, '/configuracion/estructura', 'Asignar cursos', true);
  else add({
    id: 'malla', titulo: 'Cursos de cada grado', ayuda: ayudaMalla, ruta: '/configuracion/estructura', requerido: true,
    accion: conMalla.length === grados.length && grados.length ? 'Revisar cursos' : 'Asignar cursos',
    estado: grados.length > 0 && conMalla.length === grados.length ? 'ok' : 'pendiente',
    detalle: !grados.length ? 'Primero elige los grados.' : conMalla.length === grados.length ? 'Todos los grados tienen cursos.' : `${conMalla.length} de ${grados.length} grados con cursos · faltan ${grados.filter(g => !conMalla.includes(g)).map(g => g.nombre).slice(0, 3).join(', ')}${grados.length - conMalla.length > 3 ? '…' : ''}`
  });

  // 6. Secciones y vacantes del año
  const activas = d.secciones?.filter(s => s.activo) ?? [];
  const conSeccion = grados.filter(g => activas.some(s => s.gradoId === g.id));
  const ayudaSecc = 'Las secciones (A, B, C…) de cada grado en este año, con su turno, sus vacantes y su aula.';
  if (d.secciones === null || d.grados === null) sd('secciones', 'Secciones, vacantes y aulas', ayudaSecc, '/configuracion/estructura', 'Crear secciones', true);
  else add({
    id: 'secciones', titulo: 'Secciones, vacantes y aulas', ayuda: ayudaSecc, ruta: '/configuracion/estructura', requerido: true,
    accion: conSeccion.length === grados.length && grados.length ? 'Revisar secciones' : 'Crear secciones',
    estado: sinAnio || !grados.length ? 'pendiente' : conSeccion.length === grados.length ? 'ok' : 'pendiente',
    detalle: sinAnio ? 'Primero crea el año.' : !grados.length ? 'Primero elige los grados.'
      : `${plural(activas.length, 'sección', 'secciones')} · ${conSeccion.length} de ${grados.length} grados con sección · ${activas.reduce((t, s) => t + s.capacidad, 0)} vacantes`
  });

  // 7. Docentes por curso
  const pares = activas.reduce((t, s) => t + (d.mallas[s.gradoId]?.cursos.length ?? 0), 0);
  const cubiertos = activas.reduce((t, s) => t + (d.mallas[s.gradoId]?.cursos ?? []).filter(c => d.asignaciones?.some(a => a.seccionId === s.id && a.cursoId === c.cursoId)).length, 0);
  const ayudaDoc = 'Qué docente dicta cada curso en cada sección. Con eso se arman los horarios sin choques de docentes.';
  if (d.asignaciones === null) sd('docentes', 'Docente de cada curso', ayudaDoc, '/planificacion/cursos-docentes', 'Asignar docentes', true);
  else add({
    id: 'docentes', titulo: 'Docente de cada curso', ayuda: ayudaDoc, ruta: '/planificacion/cursos-docentes', requerido: true,
    accion: pares > 0 && cubiertos === pares ? 'Revisar docentes' : 'Asignar docentes',
    estado: pares > 0 && cubiertos === pares ? 'ok' : 'pendiente',
    detalle: pares === 0 ? 'Primero crea las secciones con sus cursos.' : `${cubiertos} de ${pares} cursos con docente`
  });

  // 8. Bloques horarios y horarios
  const turnos = [...new Set(activas.map(s => s.turno))];
  const sinBloques = turnos.filter(t => !d.bloques?.some(b => b.turno === t && !b.esReceso));
  const ayudaHor = 'Las horas de clase de cada turno y el horario de cada sección. Se puede armar automáticamente.';
  if (d.bloques === null) sd('horarios', 'Horas de clase y horarios', ayudaHor, '/planificacion/horarios-auto', 'Armar horarios', true);
  else add({
    id: 'horarios', titulo: 'Horas de clase y horarios', ayuda: ayudaHor, ruta: '/planificacion/horarios-auto', requerido: true, accion: 'Armar horarios',
    estado: d.bloques.some(b => !b.esReceso) && sinBloques.length === 0 ? 'ok' : 'pendiente',
    detalle: sinBloques.length ? `Falta definir las horas del turno ${sinBloques.map(turnoTexto).join(' y ')}.` : d.bloques.some(b => !b.esReceso) ? `${plural(d.bloques.filter(b => !b.esReceso).length, 'bloque de clase', 'bloques de clase')} · arma los horarios por sección` : 'Define las horas de clase de cada turno.'
  });

  // 9. Conceptos y tarifas
  const ayudaTar = 'Cuánto se cobra este año: matrícula, pensiones y otros conceptos. Sin tarifas, matricular a un alumno no genera sus cuotas.';
  if (d.conceptos === null || d.tarifas === null) sd('tarifas', 'Conceptos y tarifas de cobro', ayudaTar, '/pagos/tarifas', 'Definir tarifas', true);
  else add({
    id: 'tarifas', titulo: 'Conceptos y tarifas de cobro', ayuda: ayudaTar, ruta: '/pagos/tarifas', requerido: true,
    accion: d.tarifas > 0 ? 'Revisar tarifas' : d.conceptos > 0 ? 'Definir tarifas' : 'Crear conceptos',
    estado: d.conceptos > 0 && d.tarifas > 0 ? 'ok' : 'pendiente',
    detalle: d.conceptos === 0 ? 'Primero crea los conceptos de pago (matrícula, pensión…).' : d.tarifas > 0 ? `${plural(d.conceptos, 'concepto', 'conceptos')} · ${plural(d.tarifas, 'tarifa', 'tarifas')}` : 'Hay conceptos, pero ninguna tarifa para este año.'
  });

  // 10. Campaña de matrícula
  const campanias = d.campanias ?? [];
  const abierta = campanias.some(c => c.estado === 'ABIERTA');
  const ayudaCamp = 'El periodo en el que se reciben matrículas. Se crea con sus fechas y se abre cuando todo lo anterior esté listo.';
  if (d.campanias === null) sd('campania', 'Campaña de matrícula', ayudaCamp, '/matriculas/campanias', 'Preparar campaña', true);
  else add({
    id: 'campania', titulo: 'Campaña de matrícula', ayuda: ayudaCamp, ruta: '/matriculas/campanias', requerido: true,
    accion: abierta ? 'Revisar campaña' : campanias.length ? 'Abrir campaña' : 'Crear campaña',
    estado: abierta ? 'ok' : 'pendiente',
    detalle: abierta ? 'Hay una campaña abierta: ya se puede matricular.' : campanias.length ? 'Hay una campaña creada, pero ninguna abierta.' : 'Crea la campaña con sus fechas.'
  });

  return pasos;
}

/** El primer paso necesario que todavía no está listo; `null` si ya no falta nada. */
export const siguientePaso = (pasos: readonly PasoApertura[]): PasoApertura | null => pasos.find(p => p.requerido && p.estado !== 'ok') ?? null;

export interface AvanceApertura {
  listos: number;
  total: number;
  porcentaje: number;
}

/** Cuántos pasos necesarios están listos (los opcionales no cuentan). */
export function avanceApertura(pasos: readonly PasoApertura[]): AvanceApertura {
  const req = pasos.filter(p => p.requerido);
  const listos = req.filter(p => p.estado === 'ok').length;
  return { listos, total: req.length, porcentaje: req.length ? Math.round((listos / req.length) * 100) : 0 };
}

/**
 * ¿Se puede activar el año? Hace falta un año planificado y que no quede pendiente ningún paso necesario
 * salvo la campaña de matrícula, que se abre cuando el año ya es el activo.
 */
export function sePuedeActivar(anio: Anio | null, pasos: readonly PasoApertura[]): boolean {
  if (!anio || anio.estado !== 'PLANIFICADO') return false;
  return pasos.filter(p => p.requerido && p.id !== 'campania').every(p => p.estado === 'ok');
}
