import { Grado } from '../../../core/models/planificacion.model';
import { CIRCUNFERENCIA, claseNivel, emblema, trazoAnillo } from './nivel-estilo';

const g = (numero: number, nombre: string): Grado => ({ id: numero, nivelId: 1, nivelNombre: '', numero, nombre, activo: true });

describe('estilo por nivel', () => {
  it('cada nivel tiene su clase de color y cualquier otro usa la neutra', () => {
    expect(claseNivel('INICIAL')).toBe('n-inicial');
    expect(claseNivel('Primaria')).toBe('n-primaria');
    expect(claseNivel('SECUNDARIA')).toBe('n-secundaria');
    expect(claseNivel('SUPERIOR')).toBe('n-otro');
    expect(claseNivel(undefined)).toBe('n-otro');
  });

  it('el emblema muestra la edad en Inicial y el número de grado en los demás', () => {
    expect(emblema(g(1, '3 años'), 'INICIAL')).toBe('3');
    expect(emblema(g(3, '5 años'), 'INICIAL')).toBe('5');
    expect(emblema(g(1, '1° de Primaria'), 'PRIMARIA')).toBe('1°');
    expect(emblema(g(5, '5° de Secundaria'), 'SECUNDARIA')).toBe('5°');
  });

  it('el arco del anillo crece con la ocupación y nunca se sale de la vuelta completa', () => {
    expect(trazoAnillo(0)).toBe(0);
    expect(trazoAnillo(50)).toBeCloseTo(CIRCUNFERENCIA / 2);
    expect(trazoAnillo(100)).toBeCloseTo(CIRCUNFERENCIA);
    expect(trazoAnillo(180)).toBeCloseTo(CIRCUNFERENCIA);
    expect(trazoAnillo(-5)).toBe(0);
  });
});
