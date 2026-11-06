import { DURACIONES, REGIMENES, avisosDelPeriodo, esNombreAutomatico, finDelPeriodo, nombreDePeriodo, proponerPeriodos } from './regimen-periodos';

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

describe('duración rápida de un periodo', () => {
  it('ofrece bimestre, trimestre, cuatrimestre y semestre (2, 3, 4 y 6 meses)', () => {
    expect(DURACIONES.map(d => [d.meses, d.singular])).toEqual([[2, 'Bimestre'], [3, 'Trimestre'], [4, 'Cuatrimestre'], [6, 'Semestre']]);
  });

  it('termina el día anterior al mismo día de N meses después', () => {
    expect(finDelPeriodo('2026-10-12', 2).fin).toBe('2026-12-11');
    expect(finDelPeriodo('2026-03-16', 3).fin).toBe('2026-06-15');
    expect(finDelPeriodo('2026-03-16', 4).fin).toBe('2026-07-15');
    expect(finDelPeriodo('2026-03-16', 6).fin).toBe('2026-09-15');
  });

  it('empezando el día 1 termina el último día del mes (marzo + 3 meses = 31 de mayo)', () => {
    expect(finDelPeriodo('2026-03-01', 3).fin).toBe('2026-05-31');
    expect(finDelPeriodo('2026-03-01', 2).fin).toBe('2026-04-30');
    expect(finDelPeriodo('2026-01-01', 2).fin).toBe('2026-02-28');
    expect(finDelPeriodo('2028-01-01', 2).fin).toBe('2028-02-29');   // año bisiesto
  });

  it('cruza el fin de año y respeta meses cortos', () => {
    expect(finDelPeriodo('2026-11-03', 3).fin).toBe('2027-02-02');
    expect(finDelPeriodo('2026-12-31', 2).fin).toBe('2027-02-28');
    expect(finDelPeriodo('2026-08-31', 6).fin).toBe('2027-02-28');   // el día anterior sería el 30 de febrero, que no existe: último día del mes de destino
    expect(finDelPeriodo('2026-08-30', 6).fin).toBe('2027-02-28');   // 29 de febrero tampoco existe en 2027
    expect(finDelPeriodo('2027-08-30', 6).fin).toBe('2028-02-29');   // pero en un año bisiesto sí
  });

  it('nunca pasa del fin del año: se recorta y lo dice', () => {
    expect(finDelPeriodo('2026-10-12', 3, '2026-12-18')).toEqual({ fin: '2026-12-18', recortado: true });
    expect(finDelPeriodo('2026-10-12', 2, '2026-12-18')).toEqual({ fin: '2026-12-11', recortado: false });
  });

  it('solo cambia los nombres que se arman solos, no los que alguien escribió', () => {
    for (const n of ['', '  ', 'Bimestre 3', 'Trimestre 1', 'Semestre 2', 'Cuatrimestre 1', 'II Bimestre']) expect(esNombreAutomatico(n), n).toBe(true);
    for (const n of ['Vacaciones útiles', 'Periodo de recuperación', 'Bimestre', 'Nivelación 2026']) expect(esNombreAutomatico(n), n).toBe(false);
    expect(nombreDePeriodo('Trimestre', 2)).toBe('Trimestre 2');
  });
});

describe('avisos antes de guardar un periodo', () => {
  const anio = { nombre: '2026', fechaInicio: '2026-03-02', fechaFin: '2026-12-18' };
  const otros = [
    { id: 1, nombre: 'Bimestre 1', fechaInicio: '2026-03-02', fechaFin: '2026-05-08' },
    { id: 2, nombre: 'Bimestre 2', fechaInicio: '2026-05-11', fechaFin: '2026-07-31' }
  ];

  it('sin fechas completas no avisa nada', () => {
    expect(avisosDelPeriodo('', '2026-08-01', anio, otros)).toEqual([]);
    expect(avisosDelPeriodo('2026-08-01', '', anio, otros)).toEqual([]);
  });

  it('un periodo que sigue sin cruzarse ni salirse del año está bien', () => {
    expect(avisosDelPeriodo('2026-08-03', '2026-10-02', anio, otros)).toEqual([]);
  });

  it('avisa si el fin es anterior al inicio', () => {
    expect(avisosDelPeriodo('2026-10-02', '2026-09-01', anio, otros)).toEqual(['El fin no puede ser anterior al inicio.']);
  });

  it('avisa si se sale del año', () => {
    expect(avisosDelPeriodo('2026-12-01', '2027-01-30', anio, otros)[0]).toContain('fuera del año 2026');
    expect(avisosDelPeriodo('2026-02-01', '2026-02-27', anio, otros)[0]).toContain('fuera del año 2026');
  });

  it('avisa con cuál periodo se cruza (también si solo coincide un día)', () => {
    expect(avisosDelPeriodo('2026-07-01', '2026-09-30', anio, otros)).toEqual(['Se cruza con Bimestre 2 (del 2026-05-11 al 2026-07-31).']);
    expect(avisosDelPeriodo('2026-07-31', '2026-09-30', anio, otros)).toHaveLength(1);
    expect(avisosDelPeriodo('2026-04-01', '2026-06-01', anio, otros)).toHaveLength(2);
  });

  it('al editar un periodo, él mismo no cuenta como «otro»', () => {
    expect(avisosDelPeriodo('2026-05-11', '2026-07-31', anio, otros, 2)).toEqual([]);
  });
});
