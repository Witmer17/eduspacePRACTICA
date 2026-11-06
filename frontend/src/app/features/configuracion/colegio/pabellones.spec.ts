import { Aula } from '../../../core/models/planificacion.model';
import { FilaCapacidad, aulasLibres, avancePabellon, cambioSeleccion, cambiosCapacidad, capacidadValida, gradosPorNivel, marcarGrupo, totalCapacidad } from './pabellones.component';

const fila = (id: number, guardada: number, escrita: number): FilaCapacidad => ({
  aula: { id, codigo: 'A-0' + id, nombre: 'Aula', tipo: 'AULA', capacidad: guardada, activo: true } as Aula,
  capacidad: escrita
});

describe('pabellones: grados de cada pabellón', () => {
  const g = (id: number, nivelId: number, numero: number) => ({ id, nivelId, nivelNombre: nivelId === 1 ? 'Inicial' : 'Primaria', numero, nombre: `G${id}` });

  it('agrupa los grados por nivel, en orden', () => {
    const r = gradosPorNivel([g(3, 2, 1), g(2, 1, 2), g(1, 1, 1), g(4, 2, 2)]);
    expect(r.map(n => n.nivel)).toEqual(['Inicial', 'Primaria']);
    expect(r[0].grados.map(x => x.id)).toEqual([1, 2]);
    expect(r[1].grados.map(x => x.id)).toEqual([3, 4]);
  });

  it('marca o quita un grupo sin tocar los demás ni la selección original', () => {
    const base = new Set([1, 9]);
    expect([...marcarGrupo(base, [2, 3], true)].sort()).toEqual([1, 2, 3, 9]);
    expect([...marcarGrupo(base, [1, 5], false)]).toEqual([9]);
    expect([...base]).toEqual([1, 9]);
  });

  it('detecta si cambió la selección respecto de lo guardado', () => {
    expect(cambioSeleccion(new Set([1, 2]), [2, 1])).toBe(false);
    expect(cambioSeleccion(new Set([1]), [1, 2])).toBe(true);
    expect(cambioSeleccion(new Set([1, 3]), [1, 2])).toBe(true);
    expect(cambioSeleccion(new Set(), [])).toBe(false);
  });
});

describe('pabellones: alumnos por aula', () => {
  it('una capacidad válida es un entero de 1 a 500', () => {
    expect(capacidadValida(30)).toBe(true);
    expect(capacidadValida(1)).toBe(true);
    expect(capacidadValida(500)).toBe(true);
    expect(capacidadValida(0)).toBe(false);
    expect(capacidadValida(501)).toBe(false);
    expect(capacidadValida(2.5)).toBe(false);
    expect(capacidadValida(Number.NaN)).toBe(false);
  });

  it('solo se envían las aulas cuya capacidad cambió', () => {
    const filas = [fila(1, 30, 30), fila(2, 30, 35), fila(3, 20, 15)];
    expect(cambiosCapacidad(filas)).toEqual([{ aulaId: 2, capacidad: 35 }, { aulaId: 3, capacidad: 15 }]);
    expect(cambiosCapacidad([fila(1, 30, 30)])).toEqual([]);
  });

  it('el total suma lo que se escribe e ignora las capacidades inválidas', () => {
    expect(totalCapacidad([fila(1, 30, 30), fila(2, 30, 35), fila(3, 20, 15)])).toBe(80);
    expect(totalCapacidad([fila(1, 30, 30), fila(2, 30, 0), fila(3, 20, Number.NaN)])).toBe(30);
    expect(totalCapacidad([])).toBe(0);
  });
});

describe('pabellones: aulas declaradas y registradas', () => {
  it('las aulas libres son las declaradas menos las registradas, sin bajar de cero', () => {
    expect(aulasLibres({ cantidadAulas: 10, aulasRegistradas: 4 })).toBe(6);
    expect(aulasLibres({ cantidadAulas: 3, aulasRegistradas: 3 })).toBe(0);
    expect(aulasLibres({ cantidadAulas: 2, aulasRegistradas: 5 })).toBe(0);
    expect(aulasLibres({ cantidadAulas: 0, aulasRegistradas: 0 })).toBe(0);
  });

  it('el avance es el porcentaje de aulas ya registradas, entre 0 y 100', () => {
    expect(avancePabellon({ cantidadAulas: 8, aulasRegistradas: 2 })).toBe(25);
    expect(avancePabellon({ cantidadAulas: 3, aulasRegistradas: 3 })).toBe(100);
    expect(avancePabellon({ cantidadAulas: 2, aulasRegistradas: 5 })).toBe(100);
    expect(avancePabellon({ cantidadAulas: 0, aulasRegistradas: 0 })).toBe(0);
  });
});
