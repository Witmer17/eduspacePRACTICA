import { PlanPago } from '../../core/models/matricula.model';
import { Tarifa } from '../../core/models/pago.model';
import { Seccion } from '../../core/models/planificacion.model';

export const PLANES_PAGO: PlanPago[] = ['MENSUAL', 'BIMESTRAL', 'SEMESTRAL', 'ANUAL'];

export const AYUDA_PLAN: Record<PlanPago, string> = {
  MENSUAL: 'Una cuota por mes',
  BIMESTRAL: 'Una cuota cada dos meses',
  SEMESTRAL: 'Dos cuotas, una por semestre',
  ANUAL: 'Un solo pago por todo el año'
};

/** Cuántos meses cubre cada cuota (igual que el servidor): la suma siempre es la de los meses de la tarifa. */
export function mesesPorCuota(plan: PlanPago, n: number): number[] {
  const meses = Math.max(n, 1);
  switch (plan) {
    case 'BIMESTRAL': return Array.from({ length: Math.ceil(meses / 2) }, (_, i) => Math.min(2, meses - i * 2));
    case 'SEMESTRAL': {
      if (meses === 1) return [1];
      const primero = Math.ceil(meses / 2);
      return [primero, meses - primero];
    }
    case 'ANUAL': return [meses];
    default: return Array.from({ length: meses }, () => 1);
  }
}

/** Reparte el total del año en proporción a los meses de cada cuota (a 2 decimales hacia abajo; los centavos que sobran van a la última). */
export function repartir(total: number, meses: readonly number[]): number[] {
  const centavos = Math.round(total * 100);
  const suma = meses.reduce((s, m) => s + m, 0);
  const montos: number[] = [];
  let acumulado = 0;
  meses.forEach((m, i) => {
    const c = i === meses.length - 1 ? centavos - acumulado : Math.floor((centavos * m) / suma);
    montos.push(c);
    acumulado += c;
  });
  return montos.map(c => c / 100);
}

/** Lo que cuesta un plan: cuántas cuotas, de cuánto, cuánto se descuenta y cuánto se paga en total por la pensión del año. */
export interface ResumenPlan {
  cuotas: number;
  /** El monto de la primera cuota ya con el descuento del plan (las demás pueden diferir por centavos). */
  cuota: number;
  sinDescuento: number;
  descuento: number;
  total: number;
  porcentaje: number;
}

const redondear = (n: number): number => Math.round(n * 100) / 100;

export function resumenDelPlan(totalPension: number, mesesTarifa: number, plan: PlanPago, porcentaje: number): ResumenPlan {
  const montos = repartir(totalPension, mesesPorCuota(plan, mesesTarifa));
  // El servidor calcula el descuento cuota por cuota, redondeado a 2 decimales
  const descuentos = montos.map(m => Math.round(m * porcentaje) / 100);
  const descuento = redondear(descuentos.reduce((s, d) => s + d, 0));
  return {
    cuotas: montos.length,
    cuota: redondear(montos[0] - descuentos[0]),
    sinDescuento: redondear(totalPension),
    descuento,
    total: redondear(totalPension - descuento),
    porcentaje
  };
}

/** La tarifa de pensión que corresponde a una sección: la de su grado si existe y, si no, la de todo su nivel. */
export function tarifaPension(tarifas: readonly Tarifa[], seccion: Pick<Seccion, 'anioId' | 'nivelId' | 'gradoId'> | null): Tarifa | null {
  if (!seccion) return null;
  const candidatas = tarifas.filter(t => t.conceptoCodigo === 'PENSION' && t.activo && t.anioId === seccion.anioId && t.nivelId === seccion.nivelId
    && (!t.gradoId || t.gradoId === seccion.gradoId));
  return candidatas.find(t => t.gradoId === seccion.gradoId) ?? candidatas[0] ?? null;
}
