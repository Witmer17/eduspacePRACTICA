import { Asignacion, Docente } from '../../core/models/planificacion.model';
import { FichaCurso } from '../configuracion/cursos/cursos-estandar';

/** Niveles por los que se filtran los cursos al elegir qué dictará un docente. */
export const NIVELES_CURSO = [
  { codigo: 'INICIAL', nombre: 'Inicial' },
  { codigo: 'PRIMARIA', nombre: 'Primaria' },
  { codigo: 'SECUNDARIA', nombre: 'Secundaria' }
] as const;

/** Qué se pide al contratar a alguien según su área de trabajo (el mismo cuadro sirve para todas las áreas). */
export interface PuestoArea {
  /** El área dicta cursos: se eligen los que podrá enseñar. */
  pideCursos: boolean;
  /** Ejemplo del cargo para el campo «Cargo». */
  cargoEjemplo: string;
  /** Qué hará esta persona, en una línea. */
  ayuda: string;
}

const PUESTOS: Record<string, PuestoArea> = {
  DOCENCIA: { pideCursos: true, cargoEjemplo: 'Docente de aula, Docente de área…', ayuda: 'Dicta cursos: elige los que podrá enseñar para proponerle secciones al armar los horarios.' },
  DIRECCION: { pideCursos: false, cargoEjemplo: 'Director(a), Subdirector(a)', ayuda: 'Conduce la gestión del colegio.' },
  ACADEMICA: { pideCursos: false, cargoEjemplo: 'Coordinador(a) de Primaria, de Matemática…', ayuda: 'Da seguimiento pedagógico; no dicta cursos desde aquí.' },
  AUXILIARES: { pideCursos: false, cargoEjemplo: 'Auxiliar de educación', ayuda: 'Apoya la disciplina, el ingreso y los recreos.' },
  PSICOLOGIA: { pideCursos: false, cargoEjemplo: 'Psicólogo(a), Tutor(a)', ayuda: 'Orientación y bienestar del estudiante.' },
  SECRETARIA: { pideCursos: false, cargoEjemplo: 'Secretario(a) académico(a)', ayuda: 'Matrícula, expedientes y atención a las familias.' },
  ADMISION: { pideCursos: false, cargoEjemplo: 'Responsable de admisión', ayuda: 'Atiende a las familias interesadas y las comunicaciones.' },
  TESORERIA: { pideCursos: false, cargoEjemplo: 'Cajero(a), Tesorero(a)', ayuda: 'Cobra matrículas y pensiones.' },
  ADMINISTRACION: { pideCursos: false, cargoEjemplo: 'Contador(a), Logística', ayuda: 'Planillas, contratos, compras y contabilidad.' },
  TI: { pideCursos: false, cargoEjemplo: 'Soporte técnico, Administrador de plataforma', ayuda: 'Sistemas, plataforma y laboratorio de cómputo.' },
  BIBLIOTECA: { pideCursos: false, cargoEjemplo: 'Bibliotecario(a), Encargado de laboratorio', ayuda: 'Biblioteca y laboratorios.' },
  SALUD: { pideCursos: false, cargoEjemplo: 'Enfermero(a)', ayuda: 'Tópico y primeros auxilios.' },
  SEGURIDAD: { pideCursos: false, cargoEjemplo: 'Vigilante', ayuda: 'Control de ingreso y seguridad.' },
  MANTENIMIENTO: { pideCursos: false, cargoEjemplo: 'Mantenimiento, Limpieza', ayuda: 'Infraestructura y limpieza.' }
};

const OTRA_AREA: PuestoArea = { pideCursos: false, cargoEjemplo: 'Puesto dentro del área', ayuda: 'Indica su puesto dentro del área.' };

/** Lo que se pide al contratar a alguien de un área; las áreas nuevas que añada el colegio usan una pauta general. */
export const puestoDeArea = (codigo: string | null | undefined): PuestoArea => PUESTOS[(codigo ?? '').toUpperCase()] ?? OTRA_AREA;

/** Los cursos que se ofrecen para un nivel: los estándar de ese nivel y los propios del colegio (que pueden ser de cualquiera). */
export const fichasDelNivel = (fichas: readonly FichaCurso[], nivelCodigo: string | null): FichaCurso[] =>
  nivelCodigo ? fichas.filter(f => !f.estandar || f.estandar.niveles.includes(nivelCodigo)) : [...fichas];

/** sin-docente: nadie puede dictarlo · apto: hay quien puede, pero no está asignado a ninguna sección · asignado: ya lo dicta alguien. */
export type EstadoCobertura = 'asignado' | 'apto' | 'sin-docente';

export interface Cobertura {
  estado: EstadoCobertura;
  /** Docentes activos que lo tienen entre sus cursos. */
  aptos: number;
  /** Secciones donde ya tiene docente asignado. */
  asignaciones: number;
}

/** Para cada curso, si tiene docente: asignado a secciones, solo con docentes aptos, o sin nadie. Devuelve una función por id de curso. */
export function coberturaCursos(docentes: readonly Docente[], asignaciones: readonly Asignacion[]): (cursoId: number | null | undefined) => Cobertura {
  const aptos = new Map<number, number>();
  for (const d of docentes) {
    if (d.estado !== 'ACTIVO') continue;
    for (const id of new Set(d.cursoIds ?? [])) aptos.set(id, (aptos.get(id) ?? 0) + 1);
  }
  const asignadas = new Map<number, number>();
  for (const a of asignaciones) asignadas.set(a.cursoId, (asignadas.get(a.cursoId) ?? 0) + 1);
  return cursoId => {
    const n = cursoId ? aptos.get(cursoId) ?? 0 : 0;
    const a = cursoId ? asignadas.get(cursoId) ?? 0 : 0;
    return { aptos: n, asignaciones: a, estado: a > 0 ? 'asignado' : n > 0 ? 'apto' : 'sin-docente' };
  };
}

/**
 * Al elegir qué docentes dictan un curso: los docentes cuya lista de cursos debe cambiar (se añade o se quita el curso) y la lista nueva.
 * Solo cuentan los docentes activos; no se toca a quien ya estaba como quería.
 */
export function cambiosDocentesDeCurso(docentes: readonly Docente[], cursoId: number, elegidos: ReadonlySet<number>): { docente: Docente; cursoIds: number[] }[] {
  const cambios: { docente: Docente; cursoIds: number[] }[] = [];
  for (const d of docentes) {
    if (d.estado !== 'ACTIVO') continue;
    const actuales = d.cursoIds ?? [];
    const loTiene = actuales.includes(cursoId);
    const loQuiere = elegidos.has(d.id);
    if (loTiene === loQuiere) continue;
    cambios.push({ docente: d, cursoIds: loQuiere ? [...actuales, cursoId] : actuales.filter(id => id !== cursoId) });
  }
  return cambios;
}

/** Texto corto de la cobertura de un curso. */
export function textoCobertura(c: Cobertura): string {
  const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;
  switch (c.estado) {
    case 'asignado': return `Con docente · ${plural(c.asignaciones, 'sección', 'secciones')}`;
    case 'apto': return `${plural(c.aptos, 'docente puede', 'docentes pueden')} dictarlo · sin asignar`;
    default: return 'Sin docente';
  }
}

/** Primero lo que no tiene docente (lo urgente), luego lo que tiene aptos sin asignar, al final lo cubierto; respeta el orden de origen dentro de cada grupo. */
export function sinDocentePrimero<T>(items: readonly T[], coberturaDe: (item: T) => Cobertura): T[] {
  const peso: Record<EstadoCobertura, number> = { 'sin-docente': 0, apto: 1, asignado: 2 };
  return items.map((item, i) => ({ item, i, p: peso[coberturaDe(item).estado] })).sort((a, b) => a.p - b.p || a.i - b.i).map(x => x.item);
}
