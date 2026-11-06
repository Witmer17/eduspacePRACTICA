import { describe, expect, it } from 'vitest';
import { dependeDelAnioActivo } from './rutas-del-anio';

describe('pantallas que dependen del periodo activo', () => {
  it('las de información de un periodo sí (con o sin parámetros ni detalle)', () => {
    expect(dependeDelAnioActivo('/configuracion/estructura')).toBe(true);
    expect(dependeDelAnioActivo('/configuracion/estructura/4?anioId=2')).toBe(true);
    expect(dependeDelAnioActivo('/matriculas?estado=PRE_MATRICULA')).toBe(true);
    expect(dependeDelAnioActivo('/matriculas/cupos')).toBe(true);
    expect(dependeDelAnioActivo('/pagos/tarifas/')).toBe(true);
    expect(dependeDelAnioActivo('/planificacion/horarios-auto')).toBe(true);
  });

  it('las que preparan un periodo nuevo o no dependen de él, no', () => {
    expect(dependeDelAnioActivo('/apertura')).toBe(false);
    expect(dependeDelAnioActivo('/planificacion/anios')).toBe(false);
    expect(dependeDelAnioActivo('/matriculas/campanias')).toBe(false);
    expect(dependeDelAnioActivo('/matriculas/aprobaciones')).toBe(false);
    expect(dependeDelAnioActivo('/configuracion/grados')).toBe(false);
    expect(dependeDelAnioActivo('/inicio')).toBe(false);
    expect(dependeDelAnioActivo('/matricula-en-linea')).toBe(false);
  });
});
