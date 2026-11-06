import { DescuentoVista, PensionOferta } from '../../core/models/matricula-publica.model';

/**
 * Descuento por código en la matrícula en línea: cuánto se descuenta de la matrícula y de cada cuota de pensión. Es el MISMO cálculo que hace el
 * servidor al generar las cuotas (pago-ms), para que lo que la familia ve antes de pagar coincida con lo que se cobra:
 * el porcentaje se redondea a céntimos (hacia arriba en la mitad), el monto fijo se descuenta de cada cuota, y nunca pasa del monto.
 */

type Concepto = 'MATRICULA' | 'PENSION';
type Regla = Pick<DescuentoVista, 'tipo' | 'valor' | 'aplicaA'>;

const aCentimos = (n: number): number => Math.round(n * 100 + 1e-9);
const deCentimos = (c: number): number => c / 100;

/** Lo que se descuenta de un monto (en soles): 0 si el descuento no aplica a ese concepto. */
export function descuentoSobre(base: number, d: Regla | null, concepto: Concepto): number {
  if (!d || !(base > 0)) return 0;
  if (d.aplicaA !== 'TODO' && d.aplicaA !== concepto) return 0;
  const b = aCentimos(base);
  const c = d.tipo === 'PORCENTAJE' ? Math.round((b * d.valor) / 100 + 1e-9) : aCentimos(d.valor);
  return deCentimos(Math.min(c, b));
}

export interface CostoMatricula { base: number; descuento: number; total: number }

export interface CostoPension {
  cuotas: number;
  /** Primera cuota sin descuento y con descuento (todas valen lo mismo salvo la última, que absorbe el redondeo). */
  mensualBase: number;
  mensual: number;
  descuentoTotal: number;
  total: number;
  totalSinDescuento: number;
}

export interface Costos { matricula: CostoMatricula | null; pension: CostoPension | null; hayDescuento: boolean }

/** El monto total de la pensión se reparte en cuotas redondeadas hacia abajo y la última lleva la diferencia (como en pago-ms). */
function repartir(totalPension: number, cuotas: number): number[] {
  const totalC = aCentimos(totalPension);
  const cuota = Math.floor(totalC / cuotas);
  const lista = Array.from({ length: cuotas }, () => cuota);
  lista[cuotas - 1] = totalC - cuota * (cuotas - 1);
  return lista.map(deCentimos);
}

export function costosConDescuento(matricula: number | null, pension: PensionOferta | null, d: Regla | null): Costos {
  const m: CostoMatricula | null = matricula === null ? null : (() => {
    const descuento = descuentoSobre(matricula, d, 'MATRICULA');
    return { base: matricula, descuento, total: deCentimos(aCentimos(matricula) - aCentimos(descuento)) };
  })();
  let p: CostoPension | null = null;
  if (pension && pension.cuotas > 0) {
    const bases = repartir(pension.total, pension.cuotas);
    const descuentos = bases.map(b => descuentoSobre(b, d, 'PENSION'));
    const totales = bases.map((b, i) => deCentimos(aCentimos(b) - aCentimos(descuentos[i])));
    const suma = (xs: number[]): number => deCentimos(xs.reduce((s, x) => s + aCentimos(x), 0));
    p = { cuotas: pension.cuotas, mensualBase: bases[0], mensual: totales[0], descuentoTotal: suma(descuentos), total: suma(totales), totalSinDescuento: suma(bases) };
  }
  return { matricula: m, pension: p, hayDescuento: (m?.descuento ?? 0) > 0 || (p?.descuentoTotal ?? 0) > 0 };
}

/** «10 %» o «S/ 20.00». */
export function textoValor(d: Pick<DescuentoVista, 'tipo' | 'valor'>): string {
  return d.tipo === 'PORCENTAJE' ? `${d.valor} %` : `S/ ${d.valor.toFixed(2)}`;
}

/** A qué se aplica, en palabras: «la matrícula», «la pensión» o «la matrícula y la pensión». */
export function textoAplica(aplicaA: DescuentoVista['aplicaA']): string {
  return aplicaA === 'MATRICULA' ? 'la matrícula' : aplicaA === 'PENSION' ? 'cada cuota de la pensión' : 'la matrícula y cada cuota de la pensión';
}

/** El código como lo guarda el sistema: sin espacios y en mayúsculas. */
export const normalizarCodigo = (c: string): string => (c ?? '').trim().toUpperCase();
