import { Anio, Periodo } from '../../core/models/planificacion.model';

/** Lógica pura de la tarjeta «Periodo académico» del inicio: en qué periodo se está, cuántos días le quedan y si falta crear el siguiente. */

/** Días de calendario entre dos fechas AAAA-MM-DD (negativo si {@code hasta} es anterior). */
export function diasEntre(desde: string, hasta: string): number {
  const [a1, m1, d1] = desde.split('-').map(Number);
  const [a2, m2, d2] = hasta.split('-').map(Number);
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86_400_000);
}

/** Con cuántos días de anticipación se avisa que el periodo está por terminar. */
export const DIAS_AVISO = 14;

export type EstadoInicio = 'sin-anio' | 'sin-periodos' | 'en-curso' | 'entre-periodos' | 'terminado' | 'por-empezar';

export interface SituacionPeriodo {
  estado: EstadoInicio;
  /** El periodo en que estamos hoy (por fechas), si hay. */
  actual: Periodo | null;
  /** Días que le quedan al periodo actual contando hoy (0 = termina hoy). */
  diasRestantes: number | null;
  diasTotales: number | null;
  /** % del periodo transcurrido (0–100). */
  avance: number | null;
  /** El próximo periodo que empieza después de hoy. */
  siguiente: Periodo | null;
  diasParaSiguiente: number | null;
  /** Días que le quedan al año académico (0 = termina hoy); null si ya terminó o no hay año. */
  diasAnio: number | null;
  /** El periodo actual termina pronto y no hay otro después: conviene crear el nuevo. */
  faltaSiguiente: boolean;
  porTerminar: boolean;
}

/**
 * Situación de hoy: el periodo que contiene la fecha (si hay varios, el que empezó último) y, si no hay ninguno, el próximo.
 * Los periodos CERRADOS no cuentan como «el actual» (ya se cerraron las notas), aunque sus fechas incluyan hoy.
 */
export function situacionDelPeriodo(anio: Anio | null, periodos: readonly Periodo[], hoy: string): SituacionPeriodo {
  const vacia: SituacionPeriodo = { estado: 'sin-anio', actual: null, diasRestantes: null, diasTotales: null, avance: null, siguiente: null, diasParaSiguiente: null, diasAnio: null, faltaSiguiente: false, porTerminar: false };
  if (!anio) return vacia;
  const diasAnio = anio.fechaFin >= hoy ? diasEntre(hoy, anio.fechaFin) : null;
  const ordenados = [...periodos].sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
  const actual = [...ordenados].reverse().find(p => p.fechaInicio <= hoy && hoy <= p.fechaFin && p.estado !== 'CERRADO') ?? null;
  const siguiente = ordenados.find(p => p.fechaInicio > hoy) ?? null;
  const base = { ...vacia, diasAnio, siguiente, diasParaSiguiente: siguiente ? diasEntre(hoy, siguiente.fechaInicio) : null };
  if (!ordenados.length) return { ...base, estado: 'sin-periodos' };
  if (actual) {
    const total = diasEntre(actual.fechaInicio, actual.fechaFin) + 1;
    const restantes = diasEntre(hoy, actual.fechaFin);
    const transcurridos = total - (restantes + 1);
    const porTerminar = restantes <= DIAS_AVISO;
    return {
      ...base, estado: 'en-curso', actual, diasRestantes: restantes, diasTotales: total,
      avance: Math.max(0, Math.min(100, Math.round(((transcurridos + 1) / total) * 100))),
      porTerminar, faltaSiguiente: porTerminar && !siguiente && (diasAnio === null || diasAnio > restantes)
    };
  }
  if (siguiente) return { ...base, estado: ordenados.every(p => p.fechaInicio > hoy) ? 'por-empezar' : 'entre-periodos' };
  // Ya pasaron todos los periodos: si el año sigue, falta uno; si el año terminó, se terminó.
  return { ...base, estado: 'terminado', faltaSiguiente: diasAnio !== null && diasAnio > 0 };
}

/** «1 día», «15 días», «hoy» para los días que faltan. */
export function textoDias(n: number): string {
  return n === 0 ? 'hoy' : n === 1 ? '1 día' : `${n} días`;
}

/** Nombre y número propuestos para un periodo nuevo a partir del último («Bimestre 2» → «Bimestre 3»). */
export function proponerNuevoPeriodo(periodos: readonly Pick<Periodo, 'nombre' | 'numero' | 'fechaFin'>[]): { numero: number; nombre: string; ultimoFin: string | null } {
  const ult = [...periodos].sort((a, b) => a.numero - b.numero).at(-1);
  const numero = (ult?.numero ?? 0) + 1;
  const m = ult ? /^(.*?)(\d+)\s*$/.exec(ult.nombre) : null;
  return { numero, nombre: m ? `${m[1]}${numero}` : `Bimestre ${numero}`, ultimoFin: ult?.fechaFin ?? null };
}
