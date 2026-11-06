import { Anio, Periodo } from '../../core/models/planificacion.model';
import { diasEntre, proponerNuevoPeriodo, situacionDelPeriodo, textoDias } from './periodo-actual';

const anio: Anio = { id: 1, nombre: '2026', fechaInicio: '2026-03-02', fechaFin: '2026-12-18', estado: 'ACTIVO' };
const per = (numero: number, fechaInicio: string, fechaFin: string, estado: Periodo['estado'] = 'ACTIVO', nombre = `Bimestre ${numero}`): Periodo =>
  ({ id: numero, anioId: 1, numero, nombre, fechaInicio, fechaFin, estado });
const bimestres = [
  per(1, '2026-03-02', '2026-05-08', 'CERRADO'), per(2, '2026-05-11', '2026-07-31'), per(3, '2026-08-10', '2026-10-09', 'PLANIFICADO'), per(4, '2026-10-12', '2026-12-18', 'PLANIFICADO')
];

describe('días entre fechas', () => {
  it('cuenta días de calendario, también entre meses y años', () => {
    expect(diasEntre('2026-11-03', '2026-11-03')).toBe(0);
    expect(diasEntre('2026-11-03', '2026-11-04')).toBe(1);
    expect(diasEntre('2026-02-27', '2026-03-02')).toBe(3);
    expect(diasEntre('2026-12-30', '2027-01-02')).toBe(3);
    expect(diasEntre('2026-11-05', '2026-11-03')).toBe(-2);
  });
  it('describe los días en palabras', () => {
    expect(textoDias(0)).toBe('hoy');
    expect(textoDias(1)).toBe('1 día');
    expect(textoDias(27)).toBe('27 días');
  });
});

describe('periodo en el que estamos', () => {
  it('sin año no hay nada', () => {
    expect(situacionDelPeriodo(null, bimestres, '2026-11-03').estado).toBe('sin-anio');
  });

  it('sin periodos lo dice (y aun así sabe cuánto le queda al año)', () => {
    const s = situacionDelPeriodo(anio, [], '2026-11-03');
    expect(s.estado).toBe('sin-periodos');
    expect(s.diasAnio).toBe(45);
  });

  it('el periodo en curso, con días restantes, total y avance', () => {
    const s = situacionDelPeriodo(anio, bimestres, '2026-11-03');
    expect(s.estado).toBe('en-curso');
    expect(s.actual!.numero).toBe(4);
    expect(s.diasRestantes).toBe(45);                  // hasta el 18 de dic
    expect(s.diasTotales).toBe(68);                    // 12 oct – 18 dic, inclusive
    expect(s.avance).toBe(Math.round(((68 - 46 + 1) / 68) * 100));
    expect(s.porTerminar).toBe(false);
    expect(s.faltaSiguiente).toBe(false);
  });

  it('el primer y el último día del periodo cuentan como dentro', () => {
    expect(situacionDelPeriodo(anio, bimestres, '2026-10-12').actual!.numero).toBe(4);
    const ultimo = situacionDelPeriodo(anio, bimestres, '2026-12-18');
    expect(ultimo.actual!.numero).toBe(4);
    expect(ultimo.diasRestantes).toBe(0);
    expect(ultimo.avance).toBe(100);
  });

  it('un periodo cerrado no es «el actual» aunque sus fechas incluyan hoy', () => {
    const s = situacionDelPeriodo(anio, [per(1, '2026-03-02', '2026-12-18', 'CERRADO')], '2026-11-03');
    expect(s.actual).toBeNull();
  });

  it('entre dos periodos (vacaciones): el siguiente y cuántos días faltan', () => {
    const s = situacionDelPeriodo(anio, bimestres, '2026-08-03');
    expect(s.estado).toBe('entre-periodos');
    expect(s.actual).toBeNull();
    expect(s.siguiente!.numero).toBe(3);
    expect(s.diasParaSiguiente).toBe(7);
  });

  it('antes de que empiece el primer periodo', () => {
    const s = situacionDelPeriodo(anio, bimestres, '2026-02-20');
    expect(s.estado).toBe('por-empezar');
    expect(s.siguiente!.numero).toBe(1);
    expect(s.diasParaSiguiente).toBe(10);
  });
});

describe('cuándo falta el nuevo periodo', () => {
  it('avisa cuando al periodo le quedan 14 días o menos', () => {
    expect(situacionDelPeriodo(anio, bimestres, '2026-12-04').porTerminar).toBe(true);    // le quedan 14
    expect(situacionDelPeriodo(anio, bimestres, '2026-12-03').porTerminar).toBe(false);   // le quedan 15
  });

  it('si el periodo termina pronto y hay otro después, no falta nada', () => {
    const s = situacionDelPeriodo(anio, bimestres, '2026-10-05');   // termina el bimestre 3, sigue el 4
    expect(s.porTerminar).toBe(true);
    expect(s.faltaSiguiente).toBe(false);
  });

  it('si termina pronto, no hay otro y el año sigue, falta crear el siguiente', () => {
    const tres = bimestres.slice(0, 3);
    const s = situacionDelPeriodo(anio, tres, '2026-10-05');
    expect(s.faltaSiguiente).toBe(true);
  });

  it('si el periodo termina junto con el año, no falta (es el último)', () => {
    expect(situacionDelPeriodo(anio, bimestres, '2026-12-10').faltaSiguiente).toBe(false);
  });

  it('con todos los periodos pasados y el año aún abierto falta uno; con el año terminado ya no', () => {
    const pasados = [per(1, '2026-03-02', '2026-05-08'), per(2, '2026-05-11', '2026-07-31')];
    expect(situacionDelPeriodo(anio, pasados, '2026-11-03')).toMatchObject({ estado: 'terminado', faltaSiguiente: true });
    expect(situacionDelPeriodo(anio, pasados, '2027-01-10')).toMatchObject({ estado: 'terminado', faltaSiguiente: false, diasAnio: null });
  });
});

describe('proponer el periodo nuevo', () => {
  it('sigue la numeración y el nombre del último', () => {
    expect(proponerNuevoPeriodo(bimestres)).toEqual({ numero: 5, nombre: 'Bimestre 5', ultimoFin: '2026-12-18' });
    expect(proponerNuevoPeriodo([per(2, '2026-01-01', '2026-02-01', 'ACTIVO', 'Trimestre 2')]).nombre).toBe('Trimestre 3');
  });
  it('sin periodos empieza en 1; un nombre sin número usa «Bimestre»', () => {
    expect(proponerNuevoPeriodo([])).toEqual({ numero: 1, nombre: 'Bimestre 1', ultimoFin: null });
    expect(proponerNuevoPeriodo([per(1, '2026-01-01', '2026-02-01', 'ACTIVO', 'Primer periodo')]).nombre).toBe('Bimestre 2');
  });
});
