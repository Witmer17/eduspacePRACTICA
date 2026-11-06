import { Asignacion, Bloque, ClaseHorario, Docente, MallaGrado, Seccion, Turno } from '../../../core/models/planificacion.model';

/** Lógica pura del horario por docente: horas que le tocan, qué se puede poner en cada rectángulo y a quién le falta programar. */

export type Mallas = Readonly<Record<number, MallaGrado | null | undefined>>;

/** Una clase equivale a una hora de la malla (así lo valida el servidor). */
export function horasDeMalla(seccion: Seccion | undefined, cursoId: number, mallas: Mallas): number {
  return seccion ? mallas[seccion.gradoId]?.cursos.find(c => c.cursoId === cursoId)?.horasSemanales ?? 0 : 0;
}

/** Una asignación del docente con las horas que le tocan y las que ya están puestas en el horario. */
export interface CargaAsignacion {
  asignacion: Asignacion;
  seccion: Seccion | undefined;
  turno: Turno | undefined;
  requeridas: number;
  programadas: number;
}

export function cargaDeAsignaciones(
  asignaciones: readonly Asignacion[], clases: readonly ClaseHorario[], secciones: readonly Seccion[], mallas: Mallas
): CargaAsignacion[] {
  const porAsignacion = new Map<number, number>();
  for (const c of clases) porAsignacion.set(c.asignacionId, (porAsignacion.get(c.asignacionId) ?? 0) + 1);
  return asignaciones.map(a => {
    const seccion = secciones.find(s => s.id === a.seccionId);
    return { asignacion: a, seccion, turno: seccion?.turno, requeridas: horasDeMalla(seccion, a.cursoId, mallas), programadas: porAsignacion.get(a.id) ?? 0 };
  }).sort((x, y) => (x.seccion?.gradoNombre ?? '').localeCompare(y.seccion?.gradoNombre ?? '', 'es', { numeric: true })
    || (x.seccion?.nombre ?? '').localeCompare(y.seccion?.nombre ?? '', 'es') || x.asignacion.cursoNombre.localeCompare(y.asignacion.cursoNombre, 'es'));
}

export const claveCelda = (bloqueId: number, dia: number): string => `${bloqueId}|${dia}`;

/** Motivo por el que una asignación no se puede poner en un rectángulo (vacío = se puede). */
export type Impedimento = '' | 'turno' | 'seccion-ocupada' | 'completo';

export interface OpcionClase {
  carga: CargaAsignacion;
  impedimento: Impedimento;
  texto: string;
}

/**
 * Qué cursos ya asignados al docente se pueden poner en un bloque y día: el turno de la sección debe ser el del bloque, la sección no puede
 * tener ya otra clase ahí, y el curso no puede pasar de sus horas semanales. {@code editando} es la clase que se está cambiando (no cuenta).
 */
export function opcionesParaRectangulo(
  cargas: readonly CargaAsignacion[], bloque: Pick<Bloque, 'id' | 'turno'>, dia: number, clasesAnio: readonly ClaseHorario[], editando?: ClaseHorario | null
): OpcionClase[] {
  const seccionesOcupadas = new Set(clasesAnio.filter(c => c.bloqueId === bloque.id && c.diaSemana === dia && c.id !== editando?.id).map(c => c.seccionId));
  return cargas.map(carga => {
    const propia = editando?.asignacionId === carga.asignacion.id;
    let impedimento: Impedimento = '';
    let texto = '';
    if (carga.turno && carga.turno !== bloque.turno) { impedimento = 'turno'; texto = `es de turno ${carga.turno === 'MANANA' ? 'mañana' : 'tarde'}`; }
    else if (seccionesOcupadas.has(carga.asignacion.seccionId)) { impedimento = 'seccion-ocupada'; texto = 'la sección ya tiene clase a esa hora'; }
    else if (!propia && carga.requeridas > 0 && carga.programadas >= carga.requeridas) { impedimento = 'completo'; texto = `ya tiene sus ${carga.requeridas} h`; }
    return { carga, impedimento, texto };
  });
}

/** Cursos de la malla del grado de una sección que todavía no tienen docente en ella (los que se pueden asignar ahí mismo). */
export function cursosLibresDeSeccion(seccion: Seccion, mallas: Mallas, asignacionesAnio: readonly Asignacion[]): { cursoId: number; nombre: string; horas: number }[] {
  const ocupados = new Set(asignacionesAnio.filter(a => a.seccionId === seccion.id).map(a => a.cursoId));
  return (mallas[seccion.gradoId]?.cursos ?? []).filter(c => !ocupados.has(c.cursoId)).map(c => ({ cursoId: c.cursoId, nombre: c.cursoNombre, horas: c.horasSemanales }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

/** Secciones activas en las que se puede dar clase en un bloque: las de su turno. */
export const seccionesDelTurno = (secciones: readonly Seccion[], turno: Turno): Seccion[] =>
  secciones.filter(s => s.activo && s.turno === turno).sort((a, b) => a.nivelId - b.nivelId || a.gradoNombre.localeCompare(b.gradoNombre, 'es', { numeric: true }) || a.nombre.localeCompare(b.nombre, 'es'));

/** Los turnos que se muestran en la grilla de un docente: aquellos en los que da clase o tiene secciones asignadas (o ambos si no tiene nada). */
export function turnosDelDocente(cargas: readonly CargaAsignacion[], clases: readonly ClaseHorario[], bloques: readonly Bloque[]): Turno[] {
  const t = new Set<Turno>();
  for (const c of cargas) if (c.turno) t.add(c.turno);
  const turnoDeBloque = new Map(bloques.map(b => [b.id, b.turno]));
  for (const c of clases) { const x = turnoDeBloque.get(c.bloqueId); if (x) t.add(x); }
  const todos: Turno[] = ['MANANA', 'TARDE'];
  return t.size ? todos.filter(x => t.has(x)) : todos;
}

export interface ResumenDocente {
  docente: Docente;
  /** Horas semanales que le tocan por sus asignaciones. */
  requeridas: number;
  /** Horas ya puestas en el horario. */
  programadas: number;
  asignaciones: number;
  estado: 'sin-asignaciones' | 'sin-horario' | 'incompleto' | 'completo';
}

/** Para listar a los docentes: cuántas horas les tocan y cuántas ya tienen en el horario. */
export function resumenDocentes(
  docentes: readonly Docente[], asignacionesAnio: readonly Asignacion[], clasesAnio: readonly ClaseHorario[], secciones: readonly Seccion[], mallas: Mallas
): ResumenDocente[] {
  const clasesPorAsignacion = new Map<number, number>();
  for (const c of clasesAnio) clasesPorAsignacion.set(c.asignacionId, (clasesPorAsignacion.get(c.asignacionId) ?? 0) + 1);
  return docentes.map(docente => {
    const propias = asignacionesAnio.filter(a => a.docenteId === docente.id);
    const requeridas = propias.reduce((s, a) => s + horasDeMalla(secciones.find(x => x.id === a.seccionId), a.cursoId, mallas), 0);
    const programadas = propias.reduce((s, a) => s + (clasesPorAsignacion.get(a.id) ?? 0), 0);
    const estado = !propias.length ? 'sin-asignaciones' : programadas === 0 ? 'sin-horario' : programadas < requeridas ? 'incompleto' : 'completo';
    return { docente, requeridas, programadas, asignaciones: propias.length, estado } satisfies ResumenDocente;
  }).sort((a, b) => peso(a.estado) - peso(b.estado) || a.docente.apellidos.localeCompare(b.docente.apellidos, 'es') || a.docente.nombres.localeCompare(b.docente.nombres, 'es'));
}

/** Primero a quienes les falta programar horario; al final los completos y los que no tienen nada asignado. */
const peso = (e: ResumenDocente['estado']): number => ({ 'sin-horario': 0, incompleto: 1, completo: 2, 'sin-asignaciones': 3 })[e];

export const ETIQUETA_ESTADO_DOCENTE: Record<ResumenDocente['estado'], string> = {
  'sin-asignaciones': 'Sin cursos', 'sin-horario': 'Sin horario', incompleto: 'Incompleto', completo: 'Completo'
};
