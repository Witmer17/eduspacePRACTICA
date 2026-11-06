import { Tarifa } from '../../core/models/pago.model';
import { mesesPorCuota, repartir, resumenDelPlan, tarifaPension } from './plan-pago';

describe('formas de pago de la pensión', () => {
  it('cada plan agrupa los diez meses de forma distinta', () => {
    expect(mesesPorCuota('MENSUAL', 10)).toHaveLength(10);
    expect(mesesPorCuota('BIMESTRAL', 10)).toEqual([2, 2, 2, 2, 2]);
    expect(mesesPorCuota('SEMESTRAL', 10)).toEqual([5, 5]);
    expect(mesesPorCuota('ANUAL', 10)).toEqual([10]);
  });

  it('con meses impares el último grupo es más corto y los meses siempre suman los de la tarifa', () => {
    expect(mesesPorCuota('BIMESTRAL', 9)).toEqual([2, 2, 2, 2, 1]);
    expect(mesesPorCuota('SEMESTRAL', 9)).toEqual([5, 4]);
    for (const p of ['MENSUAL', 'BIMESTRAL', 'SEMESTRAL', 'ANUAL'] as const) {
      for (let n = 1; n <= 12; n++) expect(mesesPorCuota(p, n).reduce((s, m) => s + m, 0), `${p} ${n}`).toBe(n);
    }
  });

  it('el reparto suma exactamente el total y manda los centavos a la última cuota', () => {
    const r = repartir(1000, [1, 1, 1]);
    expect(r).toEqual([333.33, 333.33, 333.34]);
    expect(Math.round(r.reduce((s, m) => s + m, 0) * 100) / 100).toBe(1000);
    expect(repartir(1000, [5, 5])).toEqual([500, 500]);
  });

  it('el plan semestral descuenta 5 % y el anual 10 % sobre una pensión de S/ 1000', () => {
    const mensual = resumenDelPlan(1000, 10, 'MENSUAL', 0);
    expect(mensual).toMatchObject({ cuotas: 10, cuota: 100, descuento: 0, total: 1000 });
    expect(resumenDelPlan(1000, 10, 'BIMESTRAL', 0)).toMatchObject({ cuotas: 5, cuota: 200, total: 1000 });
    expect(resumenDelPlan(1000, 10, 'SEMESTRAL', 5)).toMatchObject({ cuotas: 2, cuota: 475, descuento: 50, total: 950 });
    expect(resumenDelPlan(1000, 10, 'ANUAL', 10)).toMatchObject({ cuotas: 1, cuota: 900, descuento: 100, total: 900 });
  });

  it('el ahorro de un plan nunca deja la pensión en negativo', () => {
    expect(resumenDelPlan(0, 10, 'ANUAL', 10).total).toBe(0);
  });

  it('la tarifa de pensión de una sección es la de su grado y, si no hay, la de su nivel', () => {
    const t = (id: number, gradoId: number | undefined, concepto = 'PENSION', activo = true) =>
      ({ id, anioId: 1, nivelId: 2, gradoId, conceptoCodigo: concepto, monto: 1000, numCuotas: 10, activo }) as unknown as Tarifa;
    const seccion = { anioId: 1, nivelId: 2, gradoId: 7 };
    expect(tarifaPension([t(1, undefined), t(2, 7)], seccion)?.id).toBe(2);       // gana la de su grado
    expect(tarifaPension([t(1, undefined), t(2, 8)], seccion)?.id).toBe(1);       // la de otro grado no vale
    expect(tarifaPension([t(1, 7, 'MATRICULA')], seccion)).toBeNull();            // solo pensión
    expect(tarifaPension([t(1, 7, 'PENSION', false)], seccion)).toBeNull();       // activa
    expect(tarifaPension([t(1, 7)], null)).toBeNull();
  });
});
