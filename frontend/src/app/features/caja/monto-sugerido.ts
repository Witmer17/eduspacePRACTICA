import { Cuota } from '../../core/models/cobro.model';

const PAGABLES = ['PENDIENTE', 'PARCIAL', 'VENCIDA'];
const r2 = (n: number): number => Math.round(n * 100) / 100;

export interface MontosSugeridos {
  /** Lo que debe ahora: lo vencido, lo que vence hoy y la matrícula. Si no debe nada ahora, la próxima cuota. */
  ahora: number;
  /** Todo lo pendiente, también lo que aún no vence. */
  todo: number;
  /** Solo la próxima cuota. */
  proxima: number;
}

/** «2026-11-05» de hoy, en hora local. */
export function hoyIso(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Lo que Caja cobra sin tener que escribirlo: «lo que debe ahora» (vencido, lo que vence hoy y la matrícula), con atajos para cobrar todo lo
 * pendiente o solo la próxima cuota. El dinero se aplica a las cuotas de la más antigua a la más nueva, así que estos montos nunca sobran.
 */
export function montosSugeridos(
  cuotas: readonly Pick<Cuota, 'estado' | 'saldo' | 'fechaVencimiento' | 'conceptoTipo' | 'diasAtraso'>[],
  hoy: string = hoyIso()
): MontosSugeridos {
  const pendientes = cuotas
    .filter(c => PAGABLES.includes(c.estado) && c.saldo > 0)
    .sort((a, b) => a.fechaVencimiento.localeCompare(b.fechaVencimiento));
  const todo = r2(pendientes.reduce((s, c) => s + c.saldo, 0));
  const proxima = pendientes.length ? r2(pendientes[0].saldo) : 0;
  const exigibles = pendientes.filter(c => c.estado === 'VENCIDA' || c.diasAtraso > 0 || c.fechaVencimiento <= hoy || c.conceptoTipo === 'MATRICULA');
  const ahora = exigibles.length ? r2(exigibles.reduce((s, c) => s + c.saldo, 0)) : proxima;
  return { ahora, todo, proxima };
}
