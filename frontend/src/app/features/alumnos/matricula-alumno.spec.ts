import { describe, expect, it } from 'vitest';
import { Seccion } from '../../core/models/planificacion.model';
import { opcionesSeccion, puedeMatricular, situacionDe } from './matricula-alumno';

const sec = (id: number, gradoNombre: string, nombre: string, activo = true): Seccion => ({ id, anioId: 1, anioNombre: '2027', gradoId: id, gradoNombre, nivelId: 1, nombre, turno: 'MANANA', capacidad: 30, activo });

describe('matricular desde la lista de alumnos', () => {
  it('la situación es la matrícula más avanzada del año; anuladas, retiradas y de otros alumnos no cuentan', () => {
    const m = (alumnoId: number, estado: 'PRE_MATRICULA' | 'POR_APROBAR' | 'MATRICULADO' | 'ANULADO' | 'RETIRADO' | 'TRASLADADO') => ({ alumnoId, estado });
    expect(situacionDe(1, [])).toBe('SIN_MATRICULA');
    expect(situacionDe(1, [m(1, 'ANULADO'), m(1, 'RETIRADO'), m(1, 'TRASLADADO')])).toBe('SIN_MATRICULA');
    expect(situacionDe(1, [m(1, 'PRE_MATRICULA')])).toBe('PRE_MATRICULA');
    expect(situacionDe(1, [m(1, 'PRE_MATRICULA'), m(1, 'POR_APROBAR')])).toBe('POR_APROBAR');
    expect(situacionDe(1, [m(1, 'POR_APROBAR'), m(1, 'MATRICULADO'), m(1, 'ANULADO')])).toBe('MATRICULADO');
    expect(situacionDe(1, [m(2, 'MATRICULADO')])).toBe('SIN_MATRICULA');
  });

  it('«Matricular» solo para un alumno activo sin matrícula en marcha y con periodo activo; si no, dice por qué', () => {
    expect(puedeMatricular('ACTIVO', 'SIN_MATRICULA', true)).toEqual({ puede: true });
    expect(puedeMatricular('ACTIVO', 'SIN_MATRICULA', false).motivo).toMatch(/periodo activo/);
    expect(puedeMatricular('RETIRADO', 'SIN_MATRICULA', true).motivo).toMatch(/retirado/);
    expect(puedeMatricular('INACTIVO', 'SIN_MATRICULA', true).puede).toBe(false);
    for (const s of ['MATRICULADO', 'POR_APROBAR', 'PRE_MATRICULA'] as const) expect(puedeMatricular('ACTIVO', s, true)).toMatchObject({ puede: false, motivo: 'Ya tiene una matrícula este año.' });
  });

  it('las secciones salen ordenadas con sus vacantes; las llenas no se pueden elegir y las inactivas no salen', () => {
    const r = opcionesSeccion([sec(3, '2° de Primaria', 'A'), sec(1, '1° de Primaria', 'B'), sec(2, '1° de Primaria', 'A'), sec(4, '3 años', 'A', false)],
      [{ seccionId: 1, vacantes: 0 }, { seccionId: 2, vacantes: 12 }]);
    expect(r.map(o => [o.seccion.gradoNombre, o.seccion.nombre])).toEqual([['1° de Primaria', 'A'], ['1° de Primaria', 'B'], ['2° de Primaria', 'A']]);
    expect(r.map(o => o.vacantes)).toEqual([12, 0, 30]);          // sin dato de cupo se toma la capacidad
    expect(r.map(o => o.disponible)).toEqual([true, false, true]);
  });
});
