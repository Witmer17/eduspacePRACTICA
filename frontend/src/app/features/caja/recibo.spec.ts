import { Cuota, Pago } from '../../core/models/cobro.model';
import { armarRecibo, descuentoEnCuotas, etiquetaDescuento, lineaColegio } from './recibo';

const cuota = (id: number, montoBase: number, descuento: number, mora = 0): Cuota =>
  ({ id, montoBase, descuento, mora, estado: 'PENDIENTE' }) as Cuota;

const pago = {
  id: 7, alumnoId: 1, montoTotal: 250, medio: 'EFECTIVO', estado: 'CONFIRMADO', pagadoEn: '2026-11-05T10:00:00',
  detalles: [
    { id: 1, cuotaId: 10, cuotaDescripcion: 'Pensión marzo', montoAplicado: 190, nuevoSaldoCuota: 0, nuevoEstadoCuota: 'PAGADA' },
    { id: 2, cuotaId: 11, cuotaDescripcion: 'Pensión abril', montoAplicado: 60, nuevoSaldoCuota: 130, nuevoEstadoCuota: 'PARCIAL' }
  ]
} as unknown as Pago;

describe('recibo de caja', () => {
  it('cada línea lleva el importe y el descuento de su cuota, lo pagado y lo que queda', () => {
    const r = armarRecibo(pago, [cuota(10, 200, 10), cuota(11, 200, 10)], { alumno: 'Ana Pérez', cajero: 'caja1' });
    expect(r.lineas).toEqual([
      { descripcion: 'Pensión marzo', importe: 200, descuento: 10, mora: 0, pagado: 190, saldo: 0 },
      { descripcion: 'Pensión abril', importe: 200, descuento: 10, mora: 0, pagado: 60, saldo: 130 }
    ]);
    expect(r.totalDescuento).toBe(20);
    expect(r.hayMora).toBe(false);
  });

  it('si la cuota no se conoce, usa lo pagado como importe y no inventa descuento', () => {
    const r = armarRecibo(pago, [], { alumno: 'Ana', cajero: 'caja1' });
    expect(r.lineas[0]).toMatchObject({ importe: 190, descuento: 0 });
    expect(r.totalDescuento).toBe(0);
  });

  it('muestra la mora solo cuando alguna cuota la tiene', () => {
    expect(armarRecibo(pago, [cuota(10, 200, 0, 15)], { alumno: 'Ana', cajero: 'c' }).hayMora).toBe(true);
  });

  it('el descuento se escribe con su nombre y su valor', () => {
    expect(etiquetaDescuento({ nombre: 'Hermanos', tipo: 'PORCENTAJE', valor: 5 })).toBe('Hermanos · 5 %');
    expect(etiquetaDescuento({ nombre: 'Beca', tipo: 'MONTO_FIJO', valor: 50 })).toBe('Beca · S/ 50.00');
  });

  it('suma lo descontado en las cuotas, sin contar las anuladas', () => {
    expect(descuentoEnCuotas([{ descuento: 10, estado: 'PENDIENTE' }, { descuento: 10, estado: 'PAGADA' }, { descuento: 99, estado: 'ANULADA' }])).toBe(20);
  });

  it('la línea del colegio junta dirección, teléfono, correo y RUC', () => {
    expect(lineaColegio(null)).toBe('');
    expect(lineaColegio({ nombre: 'X', gestion: 'PRIVADA', direccion: 'Av. 1', distrito: 'Lima', telefono: '123', ruc: '2060' })).toBe('Av. 1, Lima · Tel. 123 · RUC 2060');
  });
});
