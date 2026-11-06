import { Asignacion, MallaGrado, Seccion } from '../../core/models/planificacion.model';
import { armarOpciones, cargaSemanal, claveAsignar, cursosDelDocente, filtrarGrupos, filtrarPorTexto, opcionesElegidas, sugeridasLibres } from './asignar-cursos';

const seccion = (id: number, gradoId: number, nombre: string, extra: Partial<Seccion> = {}): Seccion =>
  ({ id, anioId: 1, anioNombre: '2026', gradoId, gradoNombre: `Grado ${gradoId}`, nivelId: 1, nombre, turno: 'MANANA', capacidad: 30, activo: true, ...extra });
const malla = (gradoId: number, cursos: [number, string, number][]): MallaGrado =>
  ({ gradoId, gradoNombre: `Grado ${gradoId}`, totalHoras: 0, cursos: cursos.map(([cursoId, cursoNombre, horasSemanales], i) => ({ id: i, cursoId, cursoCodigo: cursoNombre, cursoNombre, horasSemanales })) });
const asig = (seccionId: number, cursoId: number, docenteId: number, docenteNombre: string): Asignacion =>
  ({ id: 1, seccionId, seccionNombre: 'A', cursoId, cursoNombre: 'C', docenteId, docenteNombre });

const mallas = { 4: malla(4, [[10, 'Matemática', 6], [11, 'Arte', 2], [12, 'Comunicación', 5]]), 5: malla(5, [[10, 'Matemática', 6]]) };
const secciones = [seccion(1, 4, 'A'), seccion(2, 4, 'B'), seccion(3, 5, 'A'), seccion(4, 4, 'C', { activo: false })];

describe('buscar y sincronizar los cursos del docente (se eligen una sola vez, en este paso)', () => {
  const g = armarOpciones(secciones, mallas, [], { id: 7 });

  it('sin texto no filtra', () => {
    expect(filtrarPorTexto(g, '').length).toBe(3);
    expect(filtrarPorTexto(g, '   ').length).toBe(3);
  });

  it('por nombre de curso deja solo ese curso, sin importar mayúsculas ni tildes', () => {
    const f = filtrarPorTexto(g, 'MATEMATICA');
    expect(f.map(x => x.seccion.id)).toEqual([1, 2, 3]);
    expect(f.every(x => x.opciones.length === 1 && x.opciones[0].cursoNombre === 'Matemática')).toBe(true);
    const c = filtrarPorTexto(g, 'comunicacion');
    expect(c.map(x => x.seccion.id)).toEqual([1, 2]);                // el grado 5 no tiene Comunicación: su sección se oculta
  });

  it('por grado o sección deja toda la sección', () => {
    const f = filtrarPorTexto(g, 'grado 5');
    expect(f.map(x => x.seccion.id)).toEqual([3]);
    expect(filtrarPorTexto(g, 'grado 4 b').map(x => x.seccion.id)).toEqual([2]);
    expect(filtrarPorTexto(g, 'grado 4 b')[0].opciones.length).toBe(3);
  });

  it('un texto que no coincide no deja nada', () => {
    expect(filtrarPorTexto(g, 'física cuántica')).toEqual([]);
  });

  it('la lista de cursos del docente suma lo asignado a lo que ya tenía, sin repetir', () => {
    expect(cursosDelDocente(undefined, [10, 11, 10])).toEqual([10, 11]);
    expect(cursosDelDocente([12, 10], [10, 11])).toEqual([10, 11, 12]);
    expect(cursosDelDocente(null, [])).toEqual([]);
  });
});

describe('asignar cursos a un docente', () => {
  it('arma las secciones activas con los cursos de la malla de su grado, primero los del docente', () => {
    const g = armarOpciones(secciones, mallas, [], { id: 7, cursoIds: [12] });
    expect(g.map(x => x.seccion.id)).toEqual([1, 2, 3]); // la inactiva no aparece
    expect(g[0].opciones.map(o => o.cursoNombre)).toEqual(['Comunicación', 'Arte', 'Matemática']);
    expect(g[0].opciones[0].apto).toBe(true);
    expect(g[0].opciones[1].apto).toBe(false);
  });

  it('marca lo que ya tiene docente y lo que ya dicta este docente', () => {
    const g = armarOpciones(secciones, mallas, [asig(1, 10, 99, 'Pérez'), asig(2, 10, 7, 'Díaz')], { id: 7, cursoIds: [10] });
    const mat1 = g[0].opciones.find(o => o.cursoId === 10)!;
    const mat2 = g[1].opciones.find(o => o.cursoId === 10)!;
    expect(mat1).toMatchObject({ ocupadoPor: 'Pérez', esMia: false });
    expect(mat2).toMatchObject({ ocupadoPor: 'Díaz', esMia: true });
    expect(g[2].opciones[0].ocupadoPor).toBeUndefined();
  });

  it('una sección sin malla no aparece', () => {
    expect(armarOpciones([seccion(9, 8, 'A')], { 8: null }, [], { id: 1 })).toEqual([]);
  });

  it('«solo sus cursos» deja los que puede dictar y los que ya dicta', () => {
    const g = armarOpciones(secciones, mallas, [asig(2, 11, 7, 'Díaz')], { id: 7, cursoIds: [12] });
    const f = filtrarGrupos(g, true);
    expect(f[0].opciones.map(o => o.cursoNombre)).toEqual(['Comunicación']);
    expect(f.find(x => x.seccion.id === 2)!.opciones.map(o => o.cursoNombre)).toEqual(['Comunicación', 'Arte']);
    expect(f.find(x => x.seccion.id === 3)).toBeUndefined(); // 5.º solo tiene Matemática, que no dicta
    expect(filtrarGrupos(g, false)).toHaveLength(3);
  });

  it('los sugeridos libres son sus cursos que nadie dicta en esa sección', () => {
    const g = armarOpciones(secciones, mallas, [asig(1, 10, 99, 'Pérez')], { id: 7, cursoIds: [10] });
    expect(sugeridasLibres(g)).toEqual([claveAsignar(2, 10), claveAsignar(3, 10)]);
  });

  it('la carga semanal suma lo que ya dicta y lo elegido, sin contar lo ocupado por otro', () => {
    const g = armarOpciones(secciones, mallas, [asig(1, 10, 7, 'Yo'), asig(2, 10, 99, 'Otro')], { id: 7, cursoIds: [10, 11] });
    const c = cargaSemanal(g, new Set([claveAsignar(1, 11), claveAsignar(2, 10), claveAsignar(3, 10)]));
    expect(c).toEqual({ actuales: 6, nuevas: 2 + 6, total: 14 }); // Arte (2) + Matemática 5.º (6); la de 2.B está ocupada
  });

  it('las opciones elegidas son solo las libres', () => {
    const g = armarOpciones(secciones, mallas, [asig(2, 10, 99, 'Otro')], { id: 7, cursoIds: [10] });
    const e = opcionesElegidas(g, new Set([claveAsignar(1, 10), claveAsignar(2, 10)]));
    expect(e.map(o => o.clave)).toEqual([claveAsignar(1, 10)]);
  });
});
