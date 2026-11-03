import { PagoPersonal } from '../../core/models/rrhh.model';

/** Lógica pura de «Mi trabajo»: lo que cada persona del personal ve de su propio contrato, pagos y asistencia. */

export interface PagosDelMes {
  periodo: string;
  pagos: PagoPersonal[];
  /** Lo que le toca recibir en el mes: sueldos y bonos menos descuentos y adelantos. */
  neto: number;
  /** De ese neto, lo que aún no se le ha pagado. */
  porCobrar: number;
  /** Todo lo del mes ya está pagado (y hay algo). */
  alDia: boolean;
}

const aCentimos = (n: number): number => Math.round(n * 100) / 100;

/** Agrupa los pagos por mes (el más reciente primero) con lo que le toca y lo que falta pagarle. */
export function pagosPorMes(pagos: readonly PagoPersonal[]): PagosDelMes[] {
  const m = new Map<string, PagoPersonal[]>();
  for (const p of pagos) m.set(p.periodo, [...(m.get(p.periodo) ?? []), p]);
  return [...m.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([periodo, lista]) => ({
      periodo,
      pagos: [...lista].sort((a, b) => a.id - b.id),
      neto: aCentimos(lista.reduce((s, p) => s + p.montoFirmado, 0)),
      porCobrar: aCentimos(lista.filter(p => p.estado === 'PENDIENTE').reduce((s, p) => s + p.montoFirmado, 0)),
      alDia: lista.length > 0 && lista.every(p => p.estado === 'PAGADO')
    }));
}

/** Total cobrado en el año calendario (solo lo ya pagado, con sus descuentos). */
export function cobradoEnElAnio(pagos: readonly PagoPersonal[], anio: number): number {
  return aCentimos(pagos.filter(p => p.estado === 'PAGADO' && p.periodo.startsWith(`${anio}-`)).reduce((s, p) => s + p.montoFirmado, 0));
}
