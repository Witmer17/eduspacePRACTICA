import { Vinculo } from '../../core/models/alumno.model';
import { comparteApoderado, motivoHermano, puedePedirDescuento, verificarHermano } from './hermano-descuento';

const vinculo = (doc: string, tipo = 'DNI'): Vinculo => ({
  id: 1, parentesco: 'MADRE', esPrincipal: true, esResponsablePago: true, viveConAlumno: true, puedeRecoger: true,
  apoderado: { id: 1, tipoDocumento: tipo, numeroDocumento: doc, nombres: 'Ana', apellidos: 'Pérez' }
});

describe('hermano-descuento', () => {
  it('detecta un apoderado en común por documento', () => {
    expect(comparteApoderado([vinculo('12345678')], [vinculo('12345678')])).toBe(true);
    expect(comparteApoderado([vinculo('12345678')], [vinculo('87654321')])).toBe(false);
    expect(comparteApoderado([vinculo('12345678', 'DNI')], [vinculo('12345678', 'CE')])).toBe(false);
  });

  it('el hermano debe ser otro alumno y constar matriculado', () => {
    expect(verificarHermano(1, 2, 'MATRICULADO', [], [])).toMatchObject({ distinto: true, matriculado: true });
    expect(verificarHermano(1, 1, 'MATRICULADO', [], []).distinto).toBe(false);
    expect(verificarHermano(1, 2, 'POR_APROBAR', [], []).matriculado).toBe(false);
    expect(verificarHermano(1, 2, 'SIN_MATRICULA', [], []).matriculado).toBe(false);
  });

  it('solo se pide el descuento con hermano matriculado, descuento elegido y datos confirmados', () => {
    const ok = verificarHermano(1, 2, 'MATRICULADO', [], []);
    expect(puedePedirDescuento(ok, 3, true)).toBe(true);
    expect(puedePedirDescuento(ok, 0, true)).toBe(false);
    expect(puedePedirDescuento(ok, 3, false)).toBe(false);
    expect(puedePedirDescuento(null, 3, true)).toBe(false);
    expect(puedePedirDescuento(verificarHermano(1, 2, 'PRE_MATRICULA', [], []), 3, true)).toBe(false);
  });

  it('el motivo nombra al hermano y si comparten apoderado', () => {
    expect(motivoHermano('Lucía Ramírez', '70112233', true)).toContain('comparten apoderado');
    expect(motivoHermano('Lucía Ramírez', '70112233', false)).not.toContain('comparten');
    expect(motivoHermano('Lucía Ramírez', '70112233', false)).toContain('70112233');
  });
});
