import { describe, expect, it } from 'vitest';
import { datosFaltantes, enumerar, valorODash } from './datos-alumno';

describe('datos personales del alumno', () => {
  it('dice qué falta: vacíos, espacios o nulos cuentan como faltantes', () => {
    expect(datosFaltantes({ direccion: 'Av. Sol 1', distrito: 'Surco', telefono: '999', email: 'a@b.pe', colegioProcedencia: 'I.E. 1' })).toEqual([]);
    expect(datosFaltantes({ direccion: undefined, distrito: '', telefono: '987654321', email: '  ', colegioProcedencia: undefined }))
      .toEqual(['dirección', 'distrito', 'correo', 'colegio de procedencia']);
  });

  it('muestra «Sin registrar» cuando falta el dato', () => {
    expect(valorODash('Av. Sol 1')).toBe('Av. Sol 1');
    expect(valorODash('')).toBe('Sin registrar');
    expect(valorODash(null)).toBe('Sin registrar');
    expect(valorODash(undefined)).toBe('Sin registrar');
  });

  it('enumera en español', () => {
    expect(enumerar([])).toBe('');
    expect(enumerar(['dirección'])).toBe('dirección');
    expect(enumerar(['dirección', 'correo'])).toBe('dirección y correo');
    expect(enumerar(['dirección', 'correo', 'colegio de procedencia'])).toBe('dirección, correo y colegio de procedencia');
  });
});
