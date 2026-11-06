import { EstadoAlumno } from '../../core/models/alumno.model';
import { Cupo, EstadoMatricula, Matricula } from '../../core/models/matricula.model';
import { Seccion } from '../../core/models/planificacion.model';

/** Cómo está un alumno frente a la matrícula del año activo. */
export type Situacion = 'MATRICULADO' | 'POR_APROBAR' | 'PRE_MATRICULA' | 'SIN_MATRICULA';

/** De peor a mejor: si un alumno tiene varias matrículas en el año, vale la más avanzada (una anulada o retirada no cuenta). */
const AVANCE: Partial<Record<EstadoMatricula, number>> = { PRE_MATRICULA: 1, POR_APROBAR: 2, MATRICULADO: 3 };

export function situacionDe(alumnoId: number, matriculas: readonly Pick<Matricula, 'alumnoId' | 'estado'>[]): Situacion {
  let mejor: EstadoMatricula | null = null;
  for (const m of matriculas) {
    if (m.alumnoId !== alumnoId || !AVANCE[m.estado]) continue;
    if (!mejor || AVANCE[m.estado]! > AVANCE[mejor]!) mejor = m.estado;
  }
  return mejor === 'MATRICULADO' || mejor === 'POR_APROBAR' || mejor === 'PRE_MATRICULA' ? mejor : 'SIN_MATRICULA';
}

export const TEXTO_SITUACION: Record<Situacion, string> = {
  MATRICULADO: 'Matriculado', POR_APROBAR: 'Por aprobar', PRE_MATRICULA: 'Pre-matrícula (falta pagar)', SIN_MATRICULA: 'Sin matrícula'
};
export const CLASE_SITUACION: Record<Situacion, string> = {
  MATRICULADO: 'badge-ok', POR_APROBAR: 'badge-warn', PRE_MATRICULA: 'badge-violet', SIN_MATRICULA: 'badge-gray'
};

/** ¿Se le puede ofrecer «Matricular»? Solo a un alumno activo que aún no tiene matrícula en marcha este año, y con un periodo activo. */
export function puedeMatricular(estadoAlumno: EstadoAlumno, situacion: Situacion, hayAnioActivo: boolean): { puede: boolean; motivo?: string } {
  if (!hayAnioActivo) return { puede: false, motivo: 'No hay un periodo activo: ábrelo para poder matricular.' };
  if (estadoAlumno !== 'ACTIVO') return { puede: false, motivo: `El alumno figura como ${estadoAlumno.toLowerCase()}.` };
  if (situacion !== 'SIN_MATRICULA') return { puede: false, motivo: 'Ya tiene una matrícula este año.' };
  return { puede: true };
}

export interface OpcionSeccion {
  seccion: Seccion;
  vacantes: number;
  disponible: boolean;
}

/** Las secciones activas del año con sus vacantes, ordenadas por grado y nombre; las llenas salen pero no se pueden elegir. */
export function opcionesSeccion(secciones: readonly Seccion[], cupos: readonly Pick<Cupo, 'seccionId' | 'vacantes'>[]): OpcionSeccion[] {
  const vacantes = new Map(cupos.map(c => [c.seccionId, c.vacantes]));
  return secciones
    .filter(s => s.activo)
    .map(seccion => {
      const v = vacantes.get(seccion.id) ?? seccion.capacidad;
      return { seccion, vacantes: v, disponible: v > 0 };
    })
    .sort((a, b) => a.seccion.gradoNombre.localeCompare(b.seccion.gradoNombre, 'es', { numeric: true }) || a.seccion.nombre.localeCompare(b.seccion.nombre, 'es'));
}
