import { codigoLibre, horasValidas } from './agregar-cursos-grado.component';

describe('cursos nuevos de un grado', () => {
  it('el código sugerido se conserva si está libre y recibe un número si ya existe', () => {
    expect(codigoLibre('Robótica', ['MAT'])).toBe('ROB');
    expect(codigoLibre('Robótica', ['rob'])).toBe('ROB2');
    expect(codigoLibre('Robótica', ['ROB', 'ROB2'])).toBe('ROB3');
  });

  it('un nombre sin letras aprovechables recibe un código genérico', () => {
    expect(codigoLibre('¿?', [])).toBe('CUR');
  });

  it('las horas escritas se llevan al rango 1–40', () => {
    expect(horasValidas(3)).toBe(3);
    expect(horasValidas(0)).toBe(1);
    expect(horasValidas(99)).toBe(40);
    expect(horasValidas('4')).toBe(4);
    expect(horasValidas('abc')).toBe(2);
    expect(horasValidas(2.9)).toBe(2);
  });
});
