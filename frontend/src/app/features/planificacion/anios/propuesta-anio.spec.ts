import { avisosDelAnio, fechasDelAnio, primerLunesDesde, proponerAnio, ultimoViernesHasta } from './propuesta-anio';

describe('días de la semana para las fechas del año escolar', () => {
  it('el primer lunes desde una fecha (ella misma si ya es lunes)', () => {
    expect(primerLunesDesde(2026, 3, 1)).toBe('2026-03-02');   // 1 de marzo de 2026 es domingo
    expect(primerLunesDesde(2027, 3, 1)).toBe('2027-03-01');   // lunes
    expect(primerLunesDesde(2028, 3, 1)).toBe('2028-03-06');   // miércoles
  });

  it('el último viernes hasta una fecha (ella misma si ya es viernes)', () => {
    expect(ultimoViernesHasta(2026, 12, 20)).toBe('2026-12-18');   // 20 de dic de 2026 es domingo
    expect(ultimoViernesHasta(2027, 12, 20)).toBe('2027-12-17');   // lunes
    expect(ultimoViernesHasta(2030, 12, 20)).toBe('2030-12-20');   // viernes
  });

  it('cruza de mes y de año al buscar el día', () => {
    expect(primerLunesDesde(2026, 12, 29)).toBe('2027-01-04');   // martes: el lunes siguiente ya es del año siguiente
    expect(primerLunesDesde(2025, 12, 30)).toBe('2026-01-05');
  });
});

describe('fechas propuestas de un año escolar', () => {
  it('coinciden con las del año 2026 que ya usa el colegio (2 de marzo al 18 de diciembre)', () => {
    expect(fechasDelAnio('2026')).toEqual({ fechaInicio: '2026-03-02', fechaFin: '2026-12-18' });
  });

  it('empiezan siempre en lunes y terminan siempre en viernes', () => {
    for (let a = 2024; a <= 2040; a++) {
      const f = fechasDelAnio(String(a))!;
      expect(new Date(f.fechaInicio + 'T00:00:00Z').getUTCDay(), `inicio ${a}`).toBe(1);
      expect(new Date(f.fechaFin + 'T00:00:00Z').getUTCDay(), `fin ${a}`).toBe(5);
      expect(f.fechaInicio.startsWith(`${a}-03-0`), `inicio ${a} en la primera semana de marzo`).toBe(true);
      expect(f.fechaFin <= `${a}-12-20` && f.fechaFin >= `${a}-12-14`, `fin ${a}`).toBe(true);
    }
  });

  it('un nombre que no es un año de 4 dígitos no tiene propuesta', () => {
    for (const n of ['', 'Año escolar', '26', '20266', '2026-B']) expect(fechasDelAnio(n), n).toBeNull();
    expect(fechasDelAnio(' 2027 ')).not.toBeNull();
  });
});

describe('año que sigue al último', () => {
  it('es el siguiente al mayor año creado, con sus fechas', () => {
    expect(proponerAnio([{ nombre: '2025' }, { nombre: '2026' }])).toEqual({ nombre: '2027', fechaInicio: '2027-03-01', fechaFin: '2027-12-17' });
    expect(proponerAnio([{ nombre: '2026' }, { nombre: '2024' }]).nombre).toBe('2027');
  });
  it('ignora nombres que no son años y, sin ninguno, usa el año de hoy', () => {
    expect(proponerAnio([{ nombre: 'Piloto' }], new Date(2026, 10, 3)).nombre).toBe('2026');
    expect(proponerAnio([], new Date(2026, 10, 3))).toMatchObject({ nombre: '2026', fechaInicio: '2026-03-02' });
  });
});

describe('avisos antes de guardar un año', () => {
  const otros = [{ id: 1, nombre: '2026', fechaInicio: '2026-03-02', fechaFin: '2026-12-18' }];
  it('un año nuevo que no se cruza ni se repite está bien', () => {
    expect(avisosDelAnio('2027', '2027-03-01', '2027-12-17', otros)).toEqual([]);
  });
  it('avisa si el nombre ya existe (sin importar mayúsculas)', () => {
    expect(avisosDelAnio('2026', '2027-03-01', '2027-12-17', otros)).toEqual(['Ya existe el año 2026.']);
  });
  it('avisa si el fin es anterior al inicio', () => {
    expect(avisosDelAnio('2027', '2027-12-17', '2027-03-01', otros)).toEqual(['El fin no puede ser anterior al inicio.']);
  });
  it('avisa con qué año se cruza', () => {
    expect(avisosDelAnio('2027', '2026-12-01', '2027-12-17', otros)).toEqual(['Se cruza con el año 2026 (del 2026-03-02 al 2026-12-18).']);
  });
  it('sin fechas completas solo valida el nombre, y al editar un año él mismo no cuenta', () => {
    expect(avisosDelAnio('2027', '', '', otros)).toEqual([]);
    expect(avisosDelAnio('2026', '2026-03-02', '2026-12-18', otros, 1)).toEqual([]);
  });
});
