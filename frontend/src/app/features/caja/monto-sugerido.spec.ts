import { montosSugeridos } from './monto-sugerido';

const cuota = (fechaVencimiento: string, saldo: number, estado = 'PENDIENTE', conceptoTipo = 'PENSION', diasAtraso = 0) =>
  ({ fechaVencimiento, saldo, estado, conceptoTipo, diasAtraso }) as Parameters<typeof montosSugeridos>[0][number];

describe('monto que Caja sugiere cobrar', () => {
  const HOY = '2026-11-05';

  it('lo que debe ahora es lo vencido más lo que vence hoy; lo futuro no entra', () => {
    const m = montosSugeridos([
      cuota('2026-09-05', 100, 'VENCIDA', 'PENSION', 61), cuota('2026-10-05', 100, 'VENCIDA', 'PENSION', 31),
      cuota('2026-11-05', 100), cuota('2026-12-05', 100), cuota('2027-01-05', 100)
    ], HOY);
    expect(m.ahora).toBe(300);
    expect(m.todo).toBe(500);
    expect(m.proxima).toBe(100);
  });

  it('la matrícula pendiente cuenta como lo que debe ahora aunque su fecha sea futura', () => {
    const m = montosSugeridos([cuota('2027-03-05', 120, 'PENDIENTE', 'MATRICULA'), cuota('2027-04-05', 100)], HOY);
    expect(m.ahora).toBe(120);
    expect(m.todo).toBe(220);
  });

  it('si no debe nada ahora, se sugiere la próxima cuota', () => {
    const m = montosSugeridos([cuota('2026-12-05', 80), cuota('2027-01-05', 80)], HOY);
    expect(m.ahora).toBe(80);
    expect(m.proxima).toBe(80);
    expect(m.todo).toBe(160);
  });

  it('una cuota pagada por partes cuenta por lo que queda, y las pagadas o anuladas no cuentan', () => {
    const m = montosSugeridos([cuota('2026-10-05', 35.5, 'PARCIAL', 'PENSION', 31), cuota('2026-09-05', 0, 'PAGADA'), cuota('2026-08-05', 90, 'ANULADA')], HOY);
    expect(m.ahora).toBe(35.5);
    expect(m.todo).toBe(35.5);
  });

  it('sin cuotas pendientes no sugiere nada', () => {
    expect(montosSugeridos([], HOY)).toEqual({ ahora: 0, todo: 0, proxima: 0 });
    expect(montosSugeridos([cuota('2026-10-05', 0, 'PAGADA')], HOY).ahora).toBe(0);
  });

  it('el orden en que lleguen las cuotas no cambia la próxima', () => {
    const m = montosSugeridos([cuota('2027-02-05', 70), cuota('2026-12-05', 40)], HOY);
    expect(m.proxima).toBe(40);
  });
});
