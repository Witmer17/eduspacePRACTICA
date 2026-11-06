import { CreditoAlumno, MovimientoCredito, TipoMovimientoCredito } from '../../../core/models/cobro.model';

const soles = (n: number): string => `S/ ${n.toFixed(2)}`;

/** Lo que pasaría con el crédito del alumno, en una frase para la familia y para quien atiende. */
export function explicarCredito(c: Pick<CreditoAlumno, 'saldo' | 'exigible' | 'faltante' | 'sobrante'>): string {
  if (c.saldo <= 0 && c.exigible <= 0) return 'Sin crédito ni pensiones por cobrar. Cada depósito se suma al crédito y se cobra solo de la pensión cuando vence.';
  if (c.exigible <= 0) return 'No hay pensiones vencidas: el crédito queda a favor y se cobrará solo cuando venza cada pensión.';
  if (c.saldo <= 0) return `Hay ${soles(c.exigible)} de pensiones vencidas y el alumno no tiene crédito.`;
  if (c.faltante > 0) return `Las pensiones vencidas suman ${soles(c.exigible)}: el crédito cubre ${soles(c.saldo)} y quedarán ${soles(c.faltante)} por pagar.`;
  if (c.sobrante > 0) return `El crédito cubre todo lo vencido (${soles(c.exigible)}) y quedarán ${soles(c.sobrante)} de crédito.`;
  return `El crédito cubre exactamente lo vencido (${soles(c.exigible)}).`;
}

const ETIQUETA: Record<TipoMovimientoCredito, string> = {
  DEPOSITO: 'Depósito', COBRO_CUOTA: 'Cobro de pensión', REVERSION: 'Cobro anulado (vuelve al crédito)', ANULACION: 'Depósito anulado'
};

export const etiquetaMovimiento = (m: Pick<MovimientoCredito, 'tipo'>): string => ETIQUETA[m.tipo];

/** ¿Se puede cobrar ahora del crédito? Hace falta crédito y algo vencido. */
export const puedeCobrarAhora = (c: Pick<CreditoAlumno, 'saldo' | 'exigible'>): boolean => c.saldo > 0 && c.exigible > 0;

/** Un depósito se puede anular si no está anulado todavía. */
export const sePuedeAnular = (m: Pick<MovimientoCredito, 'tipo' | 'anulado'>): boolean => m.tipo === 'DEPOSITO' && !m.anulado;
