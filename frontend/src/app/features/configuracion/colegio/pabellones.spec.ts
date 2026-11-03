import { Aula } from '../../../core/models/planificacion.model';
import { FilaCapacidad, aulasLibres, avancePabellon, cambiosCapacidad, capacidadValida, totalCapacidad } from './pabellones.component';

const fila = (id: number, guardada: number, escrita: number): FilaCapacidad => ({
  aula: { id, codigo: 'A-0' + id, nombre: 'Aula', tipo: 'AULA', capacidad: guardada, activo: true } as Aula,
  capacidad: escrita
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
