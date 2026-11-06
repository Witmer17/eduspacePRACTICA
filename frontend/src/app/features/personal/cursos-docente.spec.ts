import { Asignacion, Docente, MallaGrado, Seccion } from '../../core/models/planificacion.model';
import { armarFichas } from '../configuracion/cursos/cursos-estandar';
import { cambiosDocentesDeCurso, coberturaCursos, fichasDelNivel, puestoDeArea, seccionesPorCurso, sinDocentePrimero, textoCobertura } from './cursos-docente';

const docente = (id: number, cursoIds: number[], estado: Docente['estado'] = 'ACTIVO'): Docente =>
  ({ id, numeroDocumento: String(id), nombres: 'N', apellidos: 'A', estado, cursoIds });
/** Una asignación por (sección, curso): aquí la sección es la misma que el id, así que cada una está en una sección distinta. */
const asig = (id: number, cursoId: number, seccionId = id): Asignacion => ({ id, seccionId, seccionNombre: 'A', cursoId, cursoNombre: 'C', docenteId: 1, docenteNombre: 'D' });
const seccion = (id: number, gradoId: number, activo = true): Seccion =>
  ({ id, anioId: 1, anioNombre: '2026', gradoId, gradoNombre: `Grado ${gradoId}`, nivelId: 1, nombre: 'A', turno: 'MANANA', capacidad: 30, activo });
const malla = (gradoId: number, cursoIds: number[]): MallaGrado =>
  ({ gradoId, gradoNombre: `Grado ${gradoId}`, totalHoras: 0, cursos: cursoIds.map((cursoId, i) => ({ id: i, cursoId, cursoCodigo: 'C', cursoNombre: 'C', horasSemanales: 2 })) });

describe('docentes que dictan un curso', () => {
  const todos = [docente(1, [10]), docente(2, [11]), docente(3, [], 'ACTIVO'), docente(4, [10], 'INACTIVO')];

  it('añade el curso a quien se elige y se lo quita a quien se desmarca', () => {
    const c = cambiosDocentesDeCurso(todos, 10, new Set([2]));
    expect(c.map(x => [x.docente.id, x.cursoIds])).toEqual([[1, []], [2, [11, 10]]]);
  });

  it('no toca a quien ya estaba como se quiere ni a los inactivos', () => {
    expect(cambiosDocentesDeCurso(todos, 10, new Set([1]))).toEqual([]);
  });

  it('un docente sin cursos recibe solo ese curso', () => {
    expect(cambiosDocentesDeCurso(todos, 12, new Set([3]))[0].cursoIds).toEqual([12]);
  });
});

describe('puesto según el área', () => {
  it('solo Docencia pide los cursos que dictará', () => {
    expect(puestoDeArea('DOCENCIA').pideCursos).toBe(true);
    expect(puestoDeArea('docencia').pideCursos).toBe(true);
    for (const a of ['TESORERIA', 'PSICOLOGIA', 'SEGURIDAD', 'TI', 'DIRECCION']) expect(puestoDeArea(a).pideCursos, a).toBe(false);
  });

  it('un área nueva que añada el colegio usa una pauta general', () => {
    const p = puestoDeArea('TRANSPORTE');
    expect(p.pideCursos).toBe(false);
    expect(p.cargoEjemplo).toBeTruthy();
    expect(puestoDeArea(null).pideCursos).toBe(false);
  });
});

describe('cursos por nivel', () => {
  const fichas = armarFichas([{ id: 9, codigo: 'ROB', nombre: 'Robótica', activo: true }], {});

  it('Inicial no ofrece cursos de secundaria, y los propios del colegio salen en todos los niveles', () => {
    const inicial = fichasDelNivel(fichas, 'INICIAL').map(f => f.codigo);
    expect(inicial).toContain('PSI');
    expect(inicial).toContain('ROB');
    expect(inicial).not.toContain('EPT');
    expect(inicial).not.toContain('DPCC');
    expect(fichasDelNivel(fichas, 'SECUNDARIA').map(f => f.codigo)).toEqual(expect.arrayContaining(['CS', 'DPCC', 'EPT', 'ROB']));
    expect(fichasDelNivel(fichas, 'SECUNDARIA').map(f => f.codigo)).not.toContain('PSI');
  });

  it('sin nivel elegido salen todos', () => {
    expect(fichasDelNivel(fichas, null)).toHaveLength(fichas.length);
  });
});

describe('cobertura de cursos con docente', () => {
  const cob = coberturaCursos([docente(1, [10, 11]), docente(2, [11]), docente(3, [12], 'INACTIVO')], [asig(1, 10), asig(2, 10)]);

  it('asignado si ya lo dicta alguien en alguna sección', () => {
    expect(cob(10)).toMatchObject({ estado: 'asignado', aptos: 1, asignaciones: 2 });
  });

  it('apto si hay docentes que pueden dictarlo pero ninguna sección lo tiene asignado', () => {
    expect(cob(11)).toMatchObject({ estado: 'apto', aptos: 2, asignaciones: 0 });
  });

  it('sin docente si nadie activo lo puede dictar (un docente de baja no cuenta) o el curso aún no existe', () => {
    expect(cob(12).estado).toBe('sin-docente');
    expect(cob(99).estado).toBe('sin-docente');
    expect(cob(undefined).estado).toBe('sin-docente');
  });

  it('un curso asignado sin que el docente lo tenga entre sus cursos también cuenta como cubierto', () => {
    expect(coberturaCursos([], [asig(1, 5)])(5).estado).toBe('asignado');
  });

  it('describe cada caso con palabras simples', () => {
    expect(textoCobertura(cob(10))).toBe('Con docente · 2 secciones');
    expect(textoCobertura(cob(11))).toBe('2 docentes pueden dictarlo · sin asignar a ninguna sección');
    expect(textoCobertura(coberturaCursos([docente(1, [7])], [])(7))).toBe('1 docente puede dictarlo · sin asignar a ninguna sección');
    expect(textoCobertura(cob(12))).toBe('Sin docente');
  });

  it('pone primero los cursos sin docente, luego los que tienen aptos, y al final los cubiertos, sin mover el orden entre iguales', () => {
    const ids = [10, 11, 12, 13];
    expect(sinDocentePrimero(ids, id => cob(id))).toEqual([12, 13, 11, 10]);
  });
});

describe('cobertura por sección (todas las secciones que lo necesitan)', () => {
  // Matemática (10) está en la malla de los grados 4 y 12, que tienen una sección cada uno (1 y 2) más una sección inactiva (3, grado 4).
  const secciones = [seccion(1, 4), seccion(2, 12), seccion(3, 4, false)];
  const mallas = { 4: malla(4, [10]), 12: malla(12, [10, 11]) };
  const necesarias = seccionesPorCurso(secciones, mallas);
  const docentes = [docente(1, [10, 11])];

  it('las secciones de cada curso son las activas de los grados que lo tienen en la malla', () => {
    expect(necesarias.get(10)!.map(s => s.id)).toEqual([1, 2]);   // la inactiva no cuenta
    expect(necesarias.get(11)!.map(s => s.id)).toEqual([2]);
    expect(necesarias.get(99)).toBeUndefined();
  });

  it('con docente en una de dos secciones NO está asignado del todo: faltan secciones', () => {
    const c = coberturaCursos(docentes, [asig(1, 10, 1)], necesarias)(10);
    expect(c).toMatchObject({ estado: 'parcial', necesarias: 2, cubiertas: 1, asignaciones: 1 });
    expect(textoCobertura(c)).toBe('Con docente en 1 de 2 secciones · faltan 1');
  });

  it('con docente en todas sus secciones está asignado', () => {
    const c = coberturaCursos(docentes, [asig(1, 10, 1), asig(2, 10, 2)], necesarias)(10);
    expect(c).toMatchObject({ estado: 'asignado', necesarias: 2, cubiertas: 2 });
    expect(textoCobertura(c)).toBe('Con docente · 2 secciones');
  });

  it('con aptos pero sin ninguna asignación sigue siendo «apto» (sin asignar), también cuando hay secciones que lo necesitan', () => {
    expect(coberturaCursos(docentes, [], necesarias)(10)).toMatchObject({ estado: 'apto', necesarias: 2, cubiertas: 0 });
  });

  it('una asignación en una sección que ya no necesita el curso cuenta como asignado (no se esconde)', () => {
    expect(coberturaCursos(docentes, [asig(1, 11, 1)], necesarias)(11)).toMatchObject({ estado: 'parcial', necesarias: 1, cubiertas: 0 });
    expect(coberturaCursos(docentes, [asig(1, 10, 99)], new Map())(10).estado).toBe('asignado');
  });

  it('una asignación en una sección inactiva no cuenta para las secciones que faltan', () => {
    expect(coberturaCursos(docentes, [asig(1, 10, 3)], necesarias)(10)).toMatchObject({ estado: 'parcial', cubiertas: 0 });
  });

  it('ordena: sin docente, apto, faltan secciones y al final los completos', () => {
    const cob2 = coberturaCursos([docente(1, [10, 11])], [asig(1, 10, 1), asig(2, 10, 2), asig(3, 11, 2)], new Map([[10, [{ id: 1 }, { id: 2 }]], [11, [{ id: 2 }, { id: 7 }]], [12, [{ id: 1 }]]]));
    expect(sinDocentePrimero([10, 11, 12], id => cob2(id))).toEqual([12, 11, 10]);
    expect(cob2(11).estado).toBe('parcial');
  });
});
