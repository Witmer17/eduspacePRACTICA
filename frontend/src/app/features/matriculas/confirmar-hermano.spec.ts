import { puedeConfirmarHermano, situacionHermano } from './confirmar-hermano';

describe('confirmar el descuento por hermano (web pública)', () => {
  it('distingue hermano no encontrado, no matriculado y listo', () => {
    expect(situacionHermano({ hermanoAlumnoId: null, hermanoMatriculado: null })).toBe('NO_ENCONTRADO');
    expect(situacionHermano({ hermanoAlumnoId: 14, hermanoMatriculado: false })).toBe('NO_MATRICULADO');
    expect(situacionHermano({ hermanoAlumnoId: 14, hermanoMatriculado: true })).toBe('LISTO');
  });

  it('un pedido público solo se confirma con el hermano matriculado y el parentesco confirmado', () => {
    const listo = { origen: 'PUBLICA' as const, hermanoAlumnoId: 14, hermanoMatriculado: true };
    expect(puedeConfirmarHermano(listo, true)).toBe(true);
    expect(puedeConfirmarHermano(listo, false)).toBe(false);
    expect(puedeConfirmarHermano({ ...listo, hermanoMatriculado: false }, true)).toBe(false);
    expect(puedeConfirmarHermano({ ...listo, hermanoAlumnoId: null, hermanoMatriculado: null }, true)).toBe(false);
  });

  it('los pedidos que no vienen de la web se aprueban directo', () => {
    expect(puedeConfirmarHermano({ origen: 'INTERNA', hermanoAlumnoId: null, hermanoMatriculado: null }, false)).toBe(true);
    expect(puedeConfirmarHermano({ origen: undefined, hermanoAlumnoId: null, hermanoMatriculado: null }, false)).toBe(true);
  });
});
