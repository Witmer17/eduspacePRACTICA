import { REGIMENES, proponerPeriodos } from './regimen-periodos';

const dia = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 86_400_000;

describe('régimen de periodos', () => {
  it('cada régimen da su número de periodos con nombre en romanos', () => {
    expect(proponerPeriodos('BIMESTRE', '2026-03-02', '2026-12-18').map(p => p.nombre)).toEqual(['I Bimestre', 'II Bimestre', 'III Bimestre', 'IV Bimestre']);
    expect(proponerPeriodos('TRIMESTRE', '2026-03-02', '2026-12-18').map(p => p.nombre)).toEqual(['I Trimestre', 'II Trimestre', 'III Trimestre']);
    expect(proponerPeriodos('SEMESTRE', '2026-03-02', '2026-12-18').map(p => p.nombre)).toEqual(['I Semestre', 'II Semestre']);
  });

  it('los periodos cubren el año completo, seguidos y sin solaparse', () => {
    for (const r of REGIMENES) {
      const p = proponerPeriodos(r.id, '2026-03-02', '2026-12-18');
      expect(p).toHaveLength(r.cantidad);
      expect(p[0].fechaInicio).toBe('2026-03-02');
      expect(p[p.length - 1].fechaFin).toBe('2026-12-18');
      for (let i = 1; i < p.length; i++) expect(dia(p[i].fechaInicio) - dia(p[i - 1].fechaFin), `${r.id} #${i}`).toBe(1);
      expect(p.map(x => x.numero)).toEqual(p.map((_, i) => i + 1));
      for (const x of p) expect(dia(x.fechaFin) >= dia(x.fechaInicio)).toBe(true);
    }
  });

  it('los periodos quedan parejos: la diferencia entre el más largo y el más corto es de un día como máximo', () => {
    const p = proponerPeriodos('TRIMESTRE', '2026-03-02', '2026-12-18');
    const largos = p.map(x => dia(x.fechaFin) - dia(x.fechaInicio) + 1);
    expect(Math.max(...largos) - Math.min(...largos)).toBeLessThanOrEqual(1);
    expect(largos.reduce((a, b) => a + b, 0)).toBe(dia('2026-12-18') - dia('2026-03-02') + 1);
  });

  it('funciona en año bisiesto y cruzando el fin de año', () => {
    const p = proponerPeriodos('SEMESTRE', '2027-08-01', '2028-02-29');
    expect(p[1].fechaFin).toBe('2028-02-29');
    expect(dia(p[1].fechaInicio) - dia(p[0].fechaFin)).toBe(1);
  });

  it('con fechas inválidas, vacías, invertidas o un año más corto que los periodos no propone nada', () => {
    expect(proponerPeriodos('BIMESTRE', '', '2026-12-18')).toEqual([]);
    expect(proponerPeriodos('BIMESTRE', '2026-03-02', null)).toEqual([]);
    expect(proponerPeriodos('BIMESTRE', '2026-12-18', '2026-03-02')).toEqual([]);
    expect(proponerPeriodos('BIMESTRE', '2026-03-01', '2026-03-03')).toEqual([]);
    expect(proponerPeriodos('BIMESTRE', 'mañana', 'pasado')).toEqual([]);
  });
});
