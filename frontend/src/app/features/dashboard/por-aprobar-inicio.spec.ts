import { describe, expect, it } from 'vitest';
import { origenMatricula } from './por-aprobar-inicio.component';

describe('Inicio: alumnos por aprobar su matrícula', () => {
  it('distingue la matrícula en línea de la presencial por sus observaciones', () => {
    expect(origenMatricula({ observaciones: 'Matrícula en línea · pago simulado' })).toBe('En línea');
    expect(origenMatricula({ observaciones: 'MATRÍCULA EN LÍNEA' })).toBe('En línea');
    expect(origenMatricula({ observaciones: 'Pagada en caja' })).toBe('Presencial');
    expect(origenMatricula({})).toBe('Presencial');
  });
});
