import { Aula, Bloque, Curso, Grado, MallaGrado, Seccion, Turno } from '../../../core/models/planificacion.model';

/** Días de clase por semana con los que se arma el horario (igual que el generador del backend). */
export const DIAS_SEMANA = 5;

export interface Conflicto {
  gravedad: 'danger' | 'warn';
  gradoId: number;
  /** Sección a la que afecta; sin ella, afecta al grado entero. */
  seccionId?: number;
  texto: string;
  /** Identifica un mismo problema visto desde dos grados (p. ej. un aula compartida) para contarlo una sola vez. */
  clave: string;
}

export interface EntradaEstructura {
  grados: Grado[];
  secciones: Seccion[];
  aulas: Aula[];
  cursos: Curso[];
  bloques: Bloque[];
  mallas: Record<number, MallaGrado | null | undefined>;
}

const turnoTexto = (t: Turno) => (t === 'MANANA' ? 'mañana' : 'tarde');
const etiqueta = (s: Seccion) => `${s.gradoNombre} «${s.nombre}»`;

/** Bloques en los que se puede dictar clase (sin recreos) en un turno. */
export function bloquesDeClase(bloques: Bloque[], turno: Turno): number {
  return bloques.filter(b => b.turno === turno && !b.esReceso).length;
}

/**
 * Revisa cómo se relacionan aulas, secciones, cursos (malla) y bloques horarios y devuelve lo que chocaría o faltaría.
 * Solo mira secciones activas del año recibido.
 */
export function detectarConflictos(e: EntradaEstructura): Conflicto[] {
  const aulas = new Map(e.aulas.map(a => [a.id, a]));
  const cursos = new Map(e.cursos.map(c => [c.id, c]));
  const activas = e.secciones.filter(s => s.activo !== false);
  const r: Conflicto[] = [];

  for (const g of e.grados) {
    const secciones = activas.filter(s => s.gradoId === g.id);

    for (const s of secciones) {
      const aula = s.aulaId ? aulas.get(s.aulaId) : undefined;
      if (!s.aulaId) {
        r.push({ gravedad: 'warn', gradoId: g.id, seccionId: s.id, texto: `${etiqueta(s)} no tiene aula asignada.`, clave: `sin-aula:${s.id}` });
      } else if (aula) {
        if (!aula.activo) {
          r.push({ gravedad: 'warn', gradoId: g.id, seccionId: s.id, texto: `${etiqueta(s)} usa el aula ${aula.codigo}, que está inactiva.`, clave: `aula-inactiva:${s.id}` });
        }
        if (s.capacidad > aula.capacidad) {
          r.push({ gravedad: 'danger', gradoId: g.id, seccionId: s.id, texto: `${etiqueta(s)} tiene capacidad ${s.capacidad}, más que el aula ${aula.codigo} (${aula.capacidad}).`, clave: `capacidad:${s.id}` });
        }
        // La misma aula en el mismo turno para dos secciones: no pueden estar a la vez.
        const comparten = activas.filter(o => o.id !== s.id && o.aulaId === s.aulaId && o.turno === s.turno);
        if (comparten.length) {
          const todas = [s, ...comparten].sort((a, b) => a.id - b.id);
          r.push({
            gravedad: 'danger', gradoId: g.id, seccionId: s.id,
            texto: `El aula ${aula.codigo} está asignada en el turno ${turnoTexto(s.turno)} a ${todas.map(etiqueta).join(' y ')}.`,
            clave: `aula-compartida:${s.aulaId}:${s.turno}:${todas.map(x => x.id).join('-')}`
          });
        }
      }
    }

    const malla = e.mallas[g.id];
    if (secciones.length && malla && malla.cursos.length === 0) {
      r.push({ gravedad: 'warn', gradoId: g.id, texto: `${g.nombre} tiene secciones pero ningún curso en su malla: no se podrá armar su horario.`, clave: `sin-malla:${g.id}` });
    }
    for (const c of malla?.cursos ?? []) {
      if (cursos.get(c.cursoId)?.activo === false) {
        r.push({ gravedad: 'warn', gradoId: g.id, texto: `El curso ${c.cursoNombre} está inactivo pero sigue en la malla de ${g.nombre}.`, clave: `curso-inactivo:${g.id}:${c.cursoId}` });
      }
    }

    for (const turno of new Set(secciones.map(s => s.turno))) {
      const disponibles = bloquesDeClase(e.bloques, turno);
      if (disponibles === 0) {
        r.push({ gravedad: 'danger', gradoId: g.id, texto: `No hay bloques horarios de clase en el turno ${turnoTexto(turno)}, que usa ${g.nombre}.`, clave: `sin-bloques:${g.id}:${turno}` });
      } else if (malla && malla.totalHoras > disponibles * DIAS_SEMANA) {
        r.push({
          gravedad: 'danger', gradoId: g.id,
          texto: `La malla de ${g.nombre} pide ${malla.totalHoras} h por semana y el turno ${turnoTexto(turno)} solo ofrece ${disponibles * DIAS_SEMANA} (${disponibles} bloques × ${DIAS_SEMANA} días).`,
          clave: `horas:${g.id}:${turno}`
        });
      }
    }
  }
  return r;
}

/** Cada problema una sola vez, aunque aparezca en dos grados (el aula compartida se ve desde ambos). */
export function sinRepetidos(conflictos: Conflicto[]): Conflicto[] {
  const vistos = new Set<string>();
  return conflictos.filter(c => (vistos.has(c.clave) ? false : (vistos.add(c.clave), true)));
}
