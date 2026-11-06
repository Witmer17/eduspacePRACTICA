import { Asignacion, MallaGrado, Seccion } from '../../core/models/planificacion.model';

/** Lógica pura del paso «Asignar cursos» al registrar a un docente (qué cursos de qué secciones se le pueden dar). */

/** Un curso de una sección que se le puede asignar (o no) al docente. */
export interface OpcionAsignar {
  /** Identificador de la opción: sección y curso. */
  clave: string;
  seccionId: number;
  cursoId: number;
  cursoNombre: string;
  horas: number;
  /** Es uno de los cursos que el docente puede dictar (su especialidad). */
  apto: boolean;
  /** Quién lo dicta ya en esa sección; vacío si está libre. */
  ocupadoPor?: string;
  /** Lo dicta ya este mismo docente. */
  esMia: boolean;
}

export interface GrupoAsignar {
  seccion: Seccion;
  opciones: OpcionAsignar[];
}

export const claveAsignar = (seccionId: number, cursoId: number): string => `${seccionId}-${cursoId}`;

/**
 * Las secciones activas con los cursos de la malla de su grado. Cada curso indica si el docente puede dictarlo, y si la sección ya
 * tiene docente para él (solo se admite uno por sección y curso). Primero los cursos del docente, luego por nombre.
 */
export function armarOpciones(
  secciones: readonly Seccion[],
  mallas: Readonly<Record<number, MallaGrado | null>>,
  asignaciones: readonly Asignacion[],
  docente: { id: number; cursoIds?: readonly number[] | null }
): GrupoAsignar[] {
  const suyos = new Set(docente.cursoIds ?? []);
  return secciones
    .filter(s => s.activo)
    .map(seccion => {
      const opciones = (mallas[seccion.gradoId]?.cursos ?? []).map(item => {
        const ocupada = asignaciones.find(a => a.seccionId === seccion.id && a.cursoId === item.cursoId);
        return {
          clave: claveAsignar(seccion.id, item.cursoId), seccionId: seccion.id, cursoId: item.cursoId, cursoNombre: item.cursoNombre,
          horas: item.horasSemanales, apto: suyos.has(item.cursoId), ocupadoPor: ocupada?.docenteNombre, esMia: ocupada?.docenteId === docente.id
        } satisfies OpcionAsignar;
      }).sort((a, b) => Number(b.apto) - Number(a.apto) || a.cursoNombre.localeCompare(b.cursoNombre, 'es'));
      return { seccion, opciones };
    })
    .filter(g => g.opciones.length > 0)
    .sort((a, b) => a.seccion.nivelId - b.seccion.nivelId || a.seccion.gradoNombre.localeCompare(b.seccion.gradoNombre, 'es', { numeric: true }) || a.seccion.nombre.localeCompare(b.seccion.nombre, 'es'));
}

/** Con «solo sus cursos» se ven los que el docente puede dictar y los que ya dicta; las secciones sin ninguno se ocultan. */
export function filtrarGrupos(grupos: readonly GrupoAsignar[], soloSuyos: boolean): GrupoAsignar[] {
  if (!soloSuyos) return [...grupos];
  return grupos.map(g => ({ seccion: g.seccion, opciones: g.opciones.filter(o => o.apto || o.esMia) })).filter(g => g.opciones.length > 0);
}

const sinTildes = (t: string): string => (t ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();

/**
 * Filtra por texto (sin importar mayúsculas ni tildes): si coincide con el grado o la sección se ve toda la sección; si coincide con el nombre
 * de un curso, solo esos cursos. Las secciones sin ninguna coincidencia se ocultan. Sin texto no filtra.
 */
export function filtrarPorTexto(grupos: readonly GrupoAsignar[], texto: string): GrupoAsignar[] {
  const q = sinTildes(texto);
  if (!q) return [...grupos];
  return grupos
    .map(g => {
      const seccion = sinTildes(`${g.seccion.gradoNombre} ${g.seccion.nombre}`);
      return seccion.includes(q) ? g : { seccion: g.seccion, opciones: g.opciones.filter(o => sinTildes(o.cursoNombre).includes(q)) };
    })
    .filter(g => g.opciones.length > 0);
}

/** Los cursos (sin repetir) que quedan en la lista del docente: los que ya tenía más los recién asignados. */
export function cursosDelDocente(actuales: readonly number[] | null | undefined, asignados: readonly number[]): number[] {
  return [...new Set([...(actuales ?? []), ...asignados])].sort((a, b) => a - b);
}

/** Las opciones libres que el docente puede dictar: lo que «elegir todos los sugeridos» marca. */
export function sugeridasLibres(grupos: readonly GrupoAsignar[]): string[] {
  return grupos.flatMap(g => g.opciones.filter(o => o.apto && !o.ocupadoPor).map(o => o.clave));
}

/** Horas por semana que ya dicta (actuales) y las que sumaría con lo elegido (nuevas). */
export function cargaSemanal(grupos: readonly GrupoAsignar[], elegidas: ReadonlySet<string>): { actuales: number; nuevas: number; total: number } {
  let actuales = 0;
  let nuevas = 0;
  for (const o of grupos.flatMap(g => g.opciones)) {
    if (o.esMia) actuales += o.horas;
    else if (!o.ocupadoPor && elegidas.has(o.clave)) nuevas += o.horas;
  }
  return { actuales, nuevas, total: actuales + nuevas };
}

/** Las opciones elegidas que todavía se pueden asignar (libres). */
export function opcionesElegidas(grupos: readonly GrupoAsignar[], elegidas: ReadonlySet<string>): OpcionAsignar[] {
  return grupos.flatMap(g => g.opciones).filter(o => !o.ocupadoPor && elegidas.has(o.clave));
}
