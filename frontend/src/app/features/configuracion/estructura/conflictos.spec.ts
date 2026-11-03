import { Aula, Bloque, Curso, Grado, MallaGrado, Seccion } from '../../../core/models/planificacion.model';
import { Conflicto, detectarConflictos, sinRepetidos } from './conflictos';

const grado = (id: number, nombre: string): Grado => ({ id, nivelId: 1, nivelNombre: 'Primaria', numero: id, nombre, activo: true });
const aula = (id: number, codigo: string, capacidad = 30, activo = true): Aula => ({ id, codigo, nombre: codigo, tipo: 'AULA', capacidad, activo });
const seccion = (id: number, g: Grado, nombre: string, extra: Partial<Seccion> = {}): Seccion => ({
  id, anioId: 1, anioNombre: '2026', gradoId: g.id, gradoNombre: g.nombre, nivelId: 1, aulaId: 1, nombre, turno: 'MANANA', capacidad: 25, activo: true, ...extra
});
const bloque = (id: number, turno: 'MANANA' | 'TARDE', orden: number, esReceso = false): Bloque => ({ id, turno, orden, horaInicio: '08:00', horaFin: '08:45', esReceso });
const curso = (id: number, activo = true): Curso => ({ id, codigo: 'C' + id, nombre: 'Curso ' + id, activo });
const malla = (g: Grado, horas: number[]): MallaGrado => ({
  gradoId: g.id, gradoNombre: g.nombre, totalHoras: horas.reduce((a, b) => a + b, 0),
  cursos: horas.map((h, i) => ({ id: i + 1, cursoId: i + 1, cursoCodigo: 'C' + (i + 1), cursoNombre: 'Curso ' + (i + 1), horasSemanales: h }))
});

const g1 = grado(1, '1° de Primaria');
const g2 = grado(2, '2° de Primaria');
const BLOQUES = [bloque(1, 'MANANA', 1), bloque(2, 'MANANA', 2), bloque(3, 'MANANA', 3, true)];
const base = () => ({
  grados: [g1, g2], aulas: [aula(1, 'PRI-1A'), aula(2, 'PRI-2A')], cursos: [curso(1), curso(2)], bloques: BLOQUES,
  secciones: [seccion(10, g1, 'A', { aulaId: 1 }), seccion(20, g2, 'A', { aulaId: 2 })],
  mallas: { 1: malla(g1, [2, 2]), 2: malla(g2, [2, 2]) } as Record<number, MallaGrado>
});
const textos = (c: Conflicto[]) => c.map(x => x.texto);

describe('conflictos de la estructura académica', () => {
  it('sin problemas no devuelve nada', () => {
    expect(detectarConflictos(base())).toEqual([]);
  });

  it('avisa de la sección sin aula', () => {
    const e = base();
    e.secciones = [seccion(10, g1, 'A', { aulaId: undefined })];
    const r = detectarConflictos(e);
    expect(r).toHaveLength(1);
    expect(r[0]).toMatchObject({ gravedad: 'warn', seccionId: 10, gradoId: 1 });
  });

  it('marca como grave que la capacidad supere la del aula', () => {
    const e = base();
    e.secciones = [seccion(10, g1, 'A', { aulaId: 1, capacidad: 40 })];
    expect(detectarConflictos(e)).toMatchObject([{ gravedad: 'danger', seccionId: 10 }]);
  });

  it('detecta la misma aula en el mismo turno para dos grados, y no si los turnos son distintos', () => {
    const e = base();
    e.secciones = [seccion(10, g1, 'A', { aulaId: 1 }), seccion(20, g2, 'A', { aulaId: 1 })];
    const r = detectarConflictos(e);
    expect(r.filter(c => c.clave.startsWith('aula-compartida'))).toHaveLength(2); // visto desde cada grado
    expect(sinRepetidos(r)).toHaveLength(1); // pero es un solo problema
    expect(textos(r)[0]).toContain('PRI-1A');

    e.bloques = [...BLOQUES, bloque(4, 'TARDE', 1), bloque(5, 'TARDE', 2)];
    e.secciones = [seccion(10, g1, 'A', { aulaId: 1, turno: 'MANANA' }), seccion(20, g2, 'A', { aulaId: 1, turno: 'TARDE' })];
    expect(detectarConflictos(e)).toEqual([]);
  });

  it('un turno sin bloques de clase impide armar el horario', () => {
    const e = base();
    e.secciones = [seccion(10, g1, 'A', { turno: 'TARDE' })];
    expect(detectarConflictos(e)).toMatchObject([{ gravedad: 'danger', gradoId: 1 }]);
    expect(textos(detectarConflictos(e))[0]).toContain('tarde');
  });

  it('la malla no puede pedir más horas que los bloques de la semana (los recreos no cuentan)', () => {
    const e = base();
    e.mallas[1] = malla(g1, [6, 5]); // 11 h > 2 bloques × 5 días = 10
    const r = detectarConflictos(e);
    expect(r).toHaveLength(1);
    expect(r[0].texto).toContain('11 h');
    expect(r[0].texto).toContain('10');
  });

  it('un grado con secciones y sin cursos, y un curso inactivo en la malla, son avisos', () => {
    const e = base();
    e.mallas[2] = malla(g2, []);
    e.cursos = [curso(1, false), curso(2)];
    const r = detectarConflictos(e);
    expect(r.some(c => c.clave === 'sin-malla:2' && c.gravedad === 'warn')).toBe(true);
    expect(r.some(c => c.clave === 'curso-inactivo:1:1')).toBe(true);
  });

  it('ignora las secciones inactivas', () => {
    const e = base();
    e.secciones = [seccion(10, g1, 'A', { aulaId: undefined, activo: false })];
    expect(detectarConflictos(e)).toEqual([]);
  });
});
