import { Curso, MallaGrado } from '../../../core/models/planificacion.model';
import { CURSOS_ESTANDAR, agruparPorArea, armarFichas, codigoDeCurso, horasSugeridas, normalizar, planCambiosMalla } from './cursos-estandar';

const curso = (id: number, codigo: string, nombre: string, area?: string, activo = true): Curso => ({ id, codigo, nombre, area, activo });
const malla = (gradoId: number, items: { id: number; cursoId: number; horas: number }[]): MallaGrado => ({
  gradoId, gradoNombre: 'G' + gradoId, totalHoras: items.reduce((t, i) => t + i.horas, 0),
  cursos: items.map(i => ({ id: i.id, cursoId: i.cursoId, cursoCodigo: 'C', cursoNombre: 'C', horasSemanales: i.horas }))
});

describe('catálogo estándar de cursos', () => {
  it('cada curso estándar tiene código único, al menos un nivel y horas para cada uno de sus niveles', () => {
    const codigos = CURSOS_ESTANDAR.map(c => c.codigo);
    expect(new Set(codigos).size).toBe(codigos.length);
    for (const c of CURSOS_ESTANDAR) {
      expect(c.niveles.length, c.codigo).toBeGreaterThan(0);
      for (const n of c.niveles) expect(c.horas[n], `${c.codigo} en ${n}`).toBeGreaterThan(0);
      expect(c.codigo.length).toBeLessThanOrEqual(20);
      expect(c.nombre.length).toBeLessThanOrEqual(100);
    }
  });

  it('normaliza los nombres para compararlos', () => {
    expect(normalizar('Educación  Física')).toBe('educacion fisica');
    expect(normalizar('  Ciencia y Tecnología ')).toBe('ciencia y tecnologia');
    expect(normalizar('Desarrollo Personal, Ciudadanía y Cívica')).toBe('desarrollo personal ciudadania y civica');
  });

  it('sugiere las horas del nivel o 2 si no hay sugerencia', () => {
    const mat = CURSOS_ESTANDAR.find(c => c.codigo === 'MAT')!;
    expect(horasSugeridas(mat, 'PRIMARIA')).toBe(5);
    expect(horasSugeridas(mat, 'INICIAL')).toBe(4);
    expect(horasSugeridas(mat, 'OTRO')).toBe(2);
    expect(horasSugeridas(null, 'PRIMARIA')).toBe(2);
  });

  it('propone un código corto y válido para un curso nuevo', () => {
    expect(codigoDeCurso('Robótica')).toBe('ROB');
    expect(codigoDeCurso('Taller de Robótica Educativa')).toBe('TRE');
    expect(codigoDeCurso('Inglés 2')).toBe('I2');
    expect(codigoDeCurso('Ñ')).toMatch(/^[A-Z0-9]*$/);
    expect(codigoDeCurso('A'.repeat(40)).length).toBeLessThanOrEqual(20);
  });
});

describe('fichas de cursos', () => {
  it('un curso del catálogo que coincide con uno estándar (por nombre o código) se muestra como existente con sus grados', () => {
    const cursos = [curso(1, 'MAT', 'Matemática'), curso(2, 'X-EF', 'EDUCACION FISICA')];
    const mallas = { 4: malla(4, [{ id: 60, cursoId: 1, horas: 5 }]), 5: malla(5, [{ id: 70, cursoId: 1, horas: 4 }, { id: 71, cursoId: 2, horas: 2 }]) };
    const fichas = armarFichas(cursos, mallas);
    const mat = fichas.find(f => f.clave === 'std:MAT')!;
    expect(mat.existente?.id).toBe(1);
    expect(mat.grados).toEqual([{ gradoId: 4, horas: 5, mallaId: 60 }, { gradoId: 5, horas: 4, mallaId: 70 }]);
    expect(fichas.find(f => f.clave === 'std:EF')!.existente?.id).toBe(2); // el nombre coincide aunque cambie la forma de escribirlo
    expect(fichas.find(f => f.clave === 'std:COM')!.existente).toBeNull(); // estándar sin crear
  });

  it('los cursos propios del colegio van aparte, al final, en «Otros»', () => {
    const fichas = armarFichas([curso(9, 'ROB', 'Robótica')], {});
    const robo = fichas.find(f => f.existente?.id === 9)!;
    expect(robo).toMatchObject({ estandar: null, area: 'Otros', clave: 'id:9' });
    const grupos = agruparPorArea(fichas);
    expect(grupos[grupos.length - 1].area).toBe('Otros');
    expect(grupos.map(g => g.area).filter(a => a === 'Otros')).toHaveLength(1);
  });

  it('cada curso estándar aparece una sola vez aunque haya dos parecidos en el catálogo', () => {
    const fichas = armarFichas([curso(1, 'MAT', 'Matemática'), curso(2, 'MAT2', 'Matemática')], {});
    expect(fichas.filter(f => f.existente?.id === 1)).toHaveLength(1);
    expect(fichas.find(f => f.existente?.id === 2)?.estandar).toBeNull(); // el repetido queda como curso propio
  });
});

describe('cambios de malla de un curso', () => {
  const actual = [{ gradoId: 4, horas: 5, mallaId: 60 }, { gradoId: 5, horas: 4, mallaId: 70 }];

  it('agrega los grados nuevos, cambia las horas distintas y quita los que ya no se eligen', () => {
    const plan = planCambiosMalla(actual, [{ gradoId: 4, horas: 6 }, { gradoId: 7, horas: 3 }]);
    expect(plan.agregar).toEqual([{ gradoId: 7, horas: 3 }]);
    expect(plan.cambiar).toEqual([{ mallaId: 60, horas: 6 }]);
    expect(plan.quitar).toEqual([{ mallaId: 70, gradoId: 5 }]);
  });

  it('sin diferencias no hay nada que hacer', () => {
    expect(planCambiosMalla(actual, [{ gradoId: 4, horas: 5 }, { gradoId: 5, horas: 4 }])).toEqual({ agregar: [], cambiar: [], quitar: [] });
  });

  it('un curso sin grados, elegido en varios, los agrega todos; quitar todos los deja sin grados', () => {
    expect(planCambiosMalla([], [{ gradoId: 1, horas: 2 }, { gradoId: 2, horas: 2 }]).agregar).toHaveLength(2);
    expect(planCambiosMalla(actual, []).quitar.map(q => q.mallaId)).toEqual([60, 70]);
  });
});
