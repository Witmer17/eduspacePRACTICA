import { Asignacion, Docente } from '../../core/models/planificacion.model';
import { armarFichas } from '../configuracion/cursos/cursos-estandar';
import { cambiosDocentesDeCurso, coberturaCursos, fichasDelNivel, puestoDeArea, sinDocentePrimero, textoCobertura } from './cursos-docente';

const docente = (id: number, cursoIds: number[], estado: Docente['estado'] = 'ACTIVO'): Docente =>
  ({ id, numeroDocumento: String(id), nombres: 'N', apellidos: 'A', estado, cursoIds });
const asig = (id: number, cursoId: number): Asignacion => ({ id, seccionId: 1, seccionNombre: 'A', cursoId, cursoNombre: 'C', docenteId: 1, docenteNombre: 'D' });

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
    expect(cob(10)).toEqual({ estado: 'asignado', aptos: 1, asignaciones: 2 });
  });

  it('apto si hay docentes que pueden dictarlo pero ninguna sección lo tiene asignado', () => {
    expect(cob(11)).toEqual({ estado: 'apto', aptos: 2, asignaciones: 0 });
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
    expect(textoCobertura(cob(11))).toBe('2 docentes pueden dictarlo · sin asignar');
    expect(textoCobertura(coberturaCursos([docente(1, [7])], [])(7))).toBe('1 docente puede dictarlo · sin asignar');
    expect(textoCobertura(cob(12))).toBe('Sin docente');
  });

  it('pone primero los cursos sin docente, luego los que tienen aptos, y al final los cubiertos, sin mover el orden entre iguales', () => {
    const ids = [10, 11, 12, 13];
    expect(sinDocentePrimero(ids, id => cob(id))).toEqual([12, 13, 11, 10]);
  });
});
