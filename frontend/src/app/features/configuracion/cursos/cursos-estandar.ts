import { Curso, MallaGrado } from '../../../core/models/planificacion.model';

/** Un curso del currículo estándar (Inicial, Primaria y Secundaria) que el colegio puede elegir con un toque. */
export interface CursoEstandar {
  codigo: string;
  nombre: string;
  /** Área curricular: sirve para agrupar los cursos en pantalla y se guarda como `area` del curso. */
  area: string;
  /** Niveles en los que se suele dictar (códigos de nivel: INICIAL, PRIMARIA, SECUNDARIA). */
  niveles: string[];
  /** Horas por semana que se proponen en cada nivel. */
  horas: Record<string, number>;
}

export const CURSOS_ESTANDAR: CursoEstandar[] = [
  { codigo: 'MAT', nombre: 'Matemática', area: 'Matemática', niveles: ['INICIAL', 'PRIMARIA', 'SECUNDARIA'], horas: { INICIAL: 4, PRIMARIA: 5, SECUNDARIA: 5 } },
  { codigo: 'COM', nombre: 'Comunicación', area: 'Comunicación', niveles: ['INICIAL', 'PRIMARIA', 'SECUNDARIA'], horas: { INICIAL: 4, PRIMARIA: 5, SECUNDARIA: 5 } },
  { codigo: 'ING', nombre: 'Inglés', area: 'Idiomas', niveles: ['INICIAL', 'PRIMARIA', 'SECUNDARIA'], horas: { INICIAL: 2, PRIMARIA: 3, SECUNDARIA: 3 } },
  { codigo: 'PS', nombre: 'Personal Social', area: 'Ciencias sociales', niveles: ['INICIAL', 'PRIMARIA'], horas: { INICIAL: 3, PRIMARIA: 3 } },
  { codigo: 'CS', nombre: 'Ciencias Sociales', area: 'Ciencias sociales', niveles: ['SECUNDARIA'], horas: { SECUNDARIA: 3 } },
  { codigo: 'DPCC', nombre: 'Desarrollo Personal, Ciudadanía y Cívica', area: 'Ciencias sociales', niveles: ['SECUNDARIA'], horas: { SECUNDARIA: 2 } },
  { codigo: 'CT', nombre: 'Ciencia y Tecnología', area: 'Ciencias', niveles: ['INICIAL', 'PRIMARIA', 'SECUNDARIA'], horas: { INICIAL: 3, PRIMARIA: 4, SECUNDARIA: 4 } },
  { codigo: 'AC', nombre: 'Arte y Cultura', area: 'Arte', niveles: ['INICIAL', 'PRIMARIA', 'SECUNDARIA'], horas: { INICIAL: 2, PRIMARIA: 2, SECUNDARIA: 2 } },
  { codigo: 'PSI', nombre: 'Psicomotricidad', area: 'Educación física', niveles: ['INICIAL'], horas: { INICIAL: 3 } },
  { codigo: 'EF', nombre: 'Educación Física', area: 'Educación física', niveles: ['PRIMARIA', 'SECUNDARIA'], horas: { PRIMARIA: 2, SECUNDARIA: 2 } },
  { codigo: 'ER', nombre: 'Educación Religiosa', area: 'Formación', niveles: ['PRIMARIA', 'SECUNDARIA'], horas: { PRIMARIA: 2, SECUNDARIA: 2 } },
  { codigo: 'TUT', nombre: 'Tutoría', area: 'Formación', niveles: ['PRIMARIA', 'SECUNDARIA'], horas: { PRIMARIA: 1, SECUNDARIA: 1 } },
  { codigo: 'EPT', nombre: 'Educación para el Trabajo', area: 'Formación', niveles: ['SECUNDARIA'], horas: { SECUNDARIA: 2 } },
  { codigo: 'COMP', nombre: 'Computación', area: 'Tecnología', niveles: ['PRIMARIA', 'SECUNDARIA'], horas: { PRIMARIA: 1, SECUNDARIA: 2 } }
];

/** Texto sin tildes, en minúsculas y sin símbolos, para comparar nombres de cursos («Educación Física» = «educacion fisica»). */
export const normalizar = (t: string): string => (t ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Horas por semana que se proponen para un curso estándar en un nivel; sin sugerencia, 2. */
export const horasSugeridas = (c: CursoEstandar | null | undefined, nivelCodigo: string): number => c?.horas[nivelCodigo] ?? 2;

/**
 * Un código para un curso nuevo sacado de su nombre: las iniciales de las palabras importantes («Taller de Robótica» → TR) o, si es una sola
 * palabra, sus primeras letras («Robótica» → ROB). Máximo 20 caracteres, solo mayúsculas y números.
 */
export function codigoDeCurso(nombre: string): string {
  const palabras = normalizar(nombre).split(' ').filter(p => p.length > 2 || /\d/.test(p));
  const base = palabras.length > 1 ? palabras.map(p => p[0]).join('') : (palabras[0] ?? normalizar(nombre).replace(/ /g, '')).slice(0, 3);
  return base.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
}

/** Un grado donde se dicta un curso, con sus horas por semana y, si ya está guardado, el id de su fila de malla. */
export interface AsignacionGrado {
  gradoId: number;
  horas: number;
  mallaId?: number;
}

/** Un curso para mostrar: el que ya existe en el catálogo, el estándar que aún no se ha creado, o uno propio del colegio. */
export interface FichaCurso {
  clave: string;
  nombre: string;
  codigo: string;
  area: string;
  existente: Curso | null;
  estandar: CursoEstandar | null;
  grados: AsignacionGrado[];
}

/**
 * Junta los cursos del catálogo con los estándar: un estándar cuyo nombre (o código) ya existe aparece como curso existente;
 * los demás estándar aparecen sin crear, y los cursos propios del colegio (que no son estándar) van al final en «Otros».
 */
export function armarFichas(cursos: readonly Curso[], mallas: Record<number, MallaGrado | null | undefined>): FichaCurso[] {
  const gradosDe = (cursoId: number): AsignacionGrado[] =>
    Object.entries(mallas).flatMap(([gradoId, m]) => (m?.cursos ?? []).filter(i => i.cursoId === cursoId).map(i => ({ gradoId: Number(gradoId), horas: i.horasSemanales, mallaId: i.id })));

  const usados = new Set<number>();
  const fichas: FichaCurso[] = CURSOS_ESTANDAR.map(est => {
    const existente = cursos.find(c => !usados.has(c.id) && (normalizar(c.nombre) === normalizar(est.nombre) || c.codigo.toUpperCase() === est.codigo)) ?? null;
    if (existente) usados.add(existente.id);
    return {
      clave: 'std:' + est.codigo, nombre: existente?.nombre ?? est.nombre, codigo: existente?.codigo ?? est.codigo, area: existente?.area || est.area,
      existente, estandar: est, grados: existente ? gradosDe(existente.id) : []
    };
  });
  const propios = cursos.filter(c => !usados.has(c.id)).map<FichaCurso>(c => ({
    clave: 'id:' + c.id, nombre: c.nombre, codigo: c.codigo, area: c.area || 'Otros', existente: c, estandar: null, grados: gradosDe(c.id)
  }));
  return [...fichas, ...propios];
}

/** Agrupa las fichas por área curricular, en el orden en que aparecen; «Otros» va al final. */
export function agruparPorArea(fichas: readonly FichaCurso[]): { area: string; fichas: FichaCurso[] }[] {
  const grupos = new Map<string, FichaCurso[]>();
  for (const f of fichas) grupos.set(f.area, [...(grupos.get(f.area) ?? []), f]);
  return [...grupos.entries()]
    .map(([area, fs]) => ({ area, fichas: fs }))
    .sort((a, b) => Number(a.area === 'Otros') - Number(b.area === 'Otros'));
}

export interface CambiosMalla {
  agregar: { gradoId: number; horas: number }[];
  cambiar: { mallaId: number; horas: number }[];
  quitar: { mallaId: number; gradoId: number }[];
}

/** Qué hay que hacer en la malla para pasar de los grados actuales de un curso a los que se eligieron (con sus horas). */
export function planCambiosMalla(actual: readonly AsignacionGrado[], deseado: readonly AsignacionGrado[]): CambiosMalla {
  const porGrado = new Map(actual.map(a => [a.gradoId, a]));
  const quieren = new Set(deseado.map(d => d.gradoId));
  const plan: CambiosMalla = { agregar: [], cambiar: [], quitar: [] };
  for (const d of deseado) {
    const hay = porGrado.get(d.gradoId);
    if (!hay) plan.agregar.push({ gradoId: d.gradoId, horas: d.horas });
    else if (hay.horas !== d.horas && hay.mallaId !== undefined) plan.cambiar.push({ mallaId: hay.mallaId, horas: d.horas });
  }
  for (const a of actual) if (!quieren.has(a.gradoId) && a.mallaId !== undefined) plan.quitar.push({ mallaId: a.mallaId, gradoId: a.gradoId });
  return plan;
}
