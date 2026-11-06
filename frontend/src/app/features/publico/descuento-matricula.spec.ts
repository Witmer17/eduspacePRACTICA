import { DescuentoVista } from '../../core/models/matricula-publica.model';
import { costosConDescuento, descuentoSobre, normalizarCodigo, textoAplica, textoValor } from './descuento-matricula';

type Regla = Pick<DescuentoVista, 'tipo' | 'valor' | 'aplicaA'>;
const pct = (valor: number, aplicaA: DescuentoVista['aplicaA'] = 'TODO'): Regla => ({ tipo: 'PORCENTAJE', valor, aplicaA });
const fijo = (valor: number, aplicaA: DescuentoVista['aplicaA'] = 'TODO'): Regla => ({ tipo: 'MONTO_FIJO', valor, aplicaA });

describe('descuento de un monto', () => {
  it('un porcentaje se calcula sobre el monto y se redondea a céntimos', () => {
    expect(descuentoSobre(100, pct(10), 'MATRICULA')).toBe(10);
    expect(descuentoSobre(80, pct(12.5), 'MATRICULA')).toBe(10);
    expect(descuentoSobre(33.33, pct(10), 'PENSION')).toBe(3.33);      // 3.333 → 3.33
    expect(descuentoSobre(0.05, pct(10), 'PENSION')).toBe(0.01);       // 0.005 → hacia arriba, como el servidor
  });

  it('un monto fijo se descuenta tal cual, sin pasar del monto', () => {
    expect(descuentoSobre(100, fijo(20), 'MATRICULA')).toBe(20);
    expect(descuentoSobre(15, fijo(20), 'MATRICULA')).toBe(15);
  });

  it('solo aplica al concepto que dice (TODO aplica a los dos)', () => {
    expect(descuentoSobre(100, pct(10, 'PENSION'), 'MATRICULA')).toBe(0);
    expect(descuentoSobre(100, pct(10, 'MATRICULA'), 'PENSION')).toBe(0);
    expect(descuentoSobre(100, pct(10, 'MATRICULA'), 'MATRICULA')).toBe(10);
    expect(descuentoSobre(100, pct(10, 'TODO'), 'PENSION')).toBe(10);
  });

  it('sin descuento o sin monto no descuenta nada; un 100 % deja en cero', () => {
    expect(descuentoSobre(100, null, 'MATRICULA')).toBe(0);
    expect(descuentoSobre(0, pct(10), 'MATRICULA')).toBe(0);
    expect(descuentoSobre(100, pct(100), 'MATRICULA')).toBe(100);
  });
});

describe('costos con descuento (matrícula y pensión)', () => {
  const pension = { total: 300, cuotas: 10, mensual: 30 };

  it('sin descuento deja los costos como están', () => {
    const c = costosConDescuento(100, pension, null);
    expect(c.hayDescuento).toBe(false);
    expect(c.matricula).toEqual({ base: 100, descuento: 0, total: 100 });
    expect(c.pension).toMatchObject({ cuotas: 10, mensualBase: 30, mensual: 30, total: 300, descuentoTotal: 0 });
  });

  it('10 % a todo: matrícula S/ 90 y 10 cuotas de S/ 27', () => {
    const c = costosConDescuento(100, pension, pct(10));
    expect(c.hayDescuento).toBe(true);
    expect(c.matricula).toEqual({ base: 100, descuento: 10, total: 90 });
    expect(c.pension).toMatchObject({ mensualBase: 30, mensual: 27, total: 270, descuentoTotal: 30, totalSinDescuento: 300 });
  });

  it('solo a la matrícula: la pensión no cambia', () => {
    const c = costosConDescuento(100, pension, fijo(25, 'MATRICULA'));
    expect(c.matricula?.total).toBe(75);
    expect(c.pension?.total).toBe(300);
  });

  it('un monto fijo a la pensión se descuenta de CADA cuota (como el servidor)', () => {
    const c = costosConDescuento(100, pension, fijo(5, 'PENSION'));
    expect(c.matricula?.total).toBe(100);
    expect(c.pension).toMatchObject({ mensual: 25, descuentoTotal: 50, total: 250 });
  });

  it('reparte la pensión como el servidor: cuotas redondeadas hacia abajo y la última lleva la diferencia', () => {
    const c = costosConDescuento(null, { total: 250, cuotas: 3, mensual: 83.33 }, pct(10, 'PENSION'));
    // 250 / 3 = 83.33 (×2) y la última 83.34; el 10 % de cada una: 8.33 + 8.33 + 8.33 (8.334 → 8.33)
    expect(c.pension).toMatchObject({ mensualBase: 83.33, totalSinDescuento: 250, descuentoTotal: 24.99, total: 225.01 });
  });

  it('sin tarifa de matrícula o de pensión no inventa montos', () => {
    expect(costosConDescuento(null, null, pct(10))).toEqual({ matricula: null, pension: null, hayDescuento: false });
    expect(costosConDescuento(100, null, pct(10)).pension).toBeNull();
  });
});

describe('textos del descuento', () => {
  it('el valor y a qué se aplica', () => {
    expect(textoValor({ tipo: 'PORCENTAJE', valor: 10 })).toBe('10 %');
    expect(textoValor({ tipo: 'MONTO_FIJO', valor: 20 })).toBe('S/ 20.00');
    expect(textoAplica('MATRICULA')).toBe('la matrícula');
    expect(textoAplica('PENSION')).toBe('cada cuota de la pensión');
    expect(textoAplica('TODO')).toBe('la matrícula y cada cuota de la pensión');
  });

  it('el código se normaliza sin espacios y en mayúsculas', () => {
    expect(normalizarCodigo('  hermanos-10 ')).toBe('HERMANOS-10');
    expect(normalizarCodigo('')).toBe('');
  });
});
