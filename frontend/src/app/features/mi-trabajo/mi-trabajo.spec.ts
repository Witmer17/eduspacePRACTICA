import { PagoPersonal } from '../../core/models/rrhh.model';
import { cobradoEnElAnio, pagosPorMes } from './mi-trabajo';

let id = 0;
const pago = (periodo: string, concepto: PagoPersonal['concepto'], monto: number, estado: PagoPersonal['estado']): PagoPersonal => ({
  id: ++id, personalId: 1, personalNombre: 'X', periodo, concepto, monto, montoFirmado: concepto === 'DESCUENTO' || concepto === 'ADELANTO' ? -monto : monto, estado
});

describe('Mi trabajo: pagos', () => {
  const pagos = [
    pago('2026-09', 'SUELDO', 1500, 'PAGADO'),
    pago('2026-10', 'SUELDO', 1500, 'PAGADO'),
    pago('2026-10', 'BONO', 200, 'PAGADO'),
    pago('2026-11', 'SUELDO', 1500, 'PENDIENTE'),
    pago('2026-11', 'DESCUENTO', 50.5, 'PENDIENTE')
  ];

  it('agrupa por mes, el más reciente primero, con lo que le toca y lo que falta', () => {
    const m = pagosPorMes(pagos);
    expect(m.map(x => x.periodo)).toEqual(['2026-11', '2026-10', '2026-09']);
    expect(m[0]).toMatchObject({ neto: 1449.5, porCobrar: 1449.5, alDia: false });
    expect(m[1]).toMatchObject({ neto: 1700, porCobrar: 0, alDia: true });
  });

  it('sin pagos no hay meses', () => {
    expect(pagosPorMes([])).toEqual([]);
  });

  it('un mes con una parte pagada y otra no no está al día', () => {
    const m = pagosPorMes([pago('2026-12', 'SUELDO', 1000, 'PAGADO'), pago('2026-12', 'BONO', 100, 'PENDIENTE')]);
    expect(m[0]).toMatchObject({ neto: 1100, porCobrar: 100, alDia: false });
  });

  it('lo cobrado en el año cuenta solo lo pagado de ese año, con sus descuentos', () => {
    expect(cobradoEnElAnio(pagos, 2026)).toBe(3200);
    expect(cobradoEnElAnio(pagos, 2025)).toBe(0);
    expect(cobradoEnElAnio([pago('2026-01', 'SUELDO', 1000, 'PAGADO'), pago('2026-01', 'ADELANTO', 300, 'PAGADO')], 2026)).toBe(700);
  });
});
