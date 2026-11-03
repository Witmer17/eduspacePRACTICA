/** Lógica pura del reparto de caja entre áreas: qué pasa con la caja al cambiar lo asignado a una. */

export const aCentimos = (n: number): number => Math.round(n * 100) / 100;

export interface EvaluacionAsignacion {
  /** Diferencia con lo que ya tenía: positivo sale de caja, negativo vuelve a caja. */
  cambio: number;
  direccion: 'sale' | 'vuelve' | 'igual';
  /** Lo que quedaría en caja si se confirma. */
  cajaDespues: number;
  /** Vacío si se puede confirmar. */
  error: string;
}

/**
 * Qué ocurre si el área pasa de {@code actual} a {@code nuevo}. Sacar más dinero del que hay disponible no se puede; devolver siempre se puede
 * (aunque la caja esté en negativo por pagos anulados).
 */
export function evaluarAsignacion(disponible: number, actual: number, nuevo: number): EvaluacionAsignacion {
  if (!Number.isFinite(nuevo) || nuevo < 0) {
    return { cambio: 0, direccion: 'igual', cajaDespues: aCentimos(disponible), error: 'Indica un monto válido (0 o más).' };
  }
  const cambio = aCentimos(nuevo - actual);
  const cajaDespues = aCentimos(disponible - cambio);
  const direccion = cambio > 0 ? 'sale' : cambio < 0 ? 'vuelve' : 'igual';
  const error = cambio > 0 && cambio > disponible ? `No alcanza: faltan S/ ${aCentimos(cambio - Math.max(disponible, 0)).toFixed(2)} en caja.` : '';
  return { cambio, direccion, cajaDespues, error };
}

/** Una fila de la ventana «Repartir entre las áreas»: lo que tiene hoy el área y lo que se escribió ({@code null} = sin tocar). */
export interface FilaReparto {
  id: number;
  actual: number;
  nuevo: number | null;
}

export interface ResultadoFila {
  id: number;
  /** Diferencia con lo que tiene hoy: positivo sale de caja, negativo vuelve a caja. */
  cambio: number;
  /** Vacío si el monto es válido. */
  error: string;
}

export interface EvaluacionReparto {
  filas: ResultadoFila[];
  /** Lo que suben unas menos lo que bajan otras: lo que realmente sale de caja (negativo si vuelve más de lo que sale). */
  cambioNeto: number;
  cajaDespues: number;
  /** Áreas cuyo monto cambia. */
  cambiadas: number;
  /** Vacío si se puede guardar. */
  error: string;
}

/**
 * Evalúa un reparto de varias áreas a la vez. Lo que baja un área paga lo que sube otra: solo el cambio NETO tiene que caber en lo disponible.
 * Una fila vacía no se toca; un monto negativo o no numérico es un error de esa fila.
 */
export function evaluarReparto(disponible: number, filas: readonly FilaReparto[]): EvaluacionReparto {
  const resultado: ResultadoFila[] = filas.map(f => {
    if (f.nuevo === null) return { id: f.id, cambio: 0, error: '' };
    if (!Number.isFinite(f.nuevo) || f.nuevo < 0) return { id: f.id, cambio: 0, error: 'Monto no válido' };
    return { id: f.id, cambio: aCentimos(f.nuevo - f.actual), error: '' };
  });
  const cambioNeto = aCentimos(resultado.reduce((t, r) => t + r.cambio, 0));
  const hayErrores = resultado.some(r => r.error);
  const error = hayErrores ? 'Corrige los montos marcados.'
    : cambioNeto > 0 && cambioNeto > disponible ? `No alcanza: faltan S/ ${aCentimos(cambioNeto - Math.max(disponible, 0)).toFixed(2)} en caja.` : '';
  return { filas: resultado, cambioNeto, cajaDespues: aCentimos(disponible - cambioNeto), cambiadas: resultado.filter(r => r.cambio !== 0).length, error };
}

/**
 * Reparte lo disponible en partes iguales sumándolo a lo que ya tiene cada área. Los centavos que sobran se dan de uno en uno a las primeras
 * (1 000 entre 3 = 333.34, 333.33, 333.33). Sin nada disponible, las áreas quedan como estaban.
 */
export function partesIguales(disponible: number, actuales: readonly number[]): number[] {
  const n = actuales.length;
  if (n === 0 || disponible <= 0) return [...actuales];
  const centavos = Math.floor(disponible * 100 + 1e-6);
  const base = Math.floor(centavos / n);
  const resto = centavos - base * n;
  return actuales.map((a, i) => aCentimos(a + (base + (i < resto ? 1 : 0)) / 100));
}

/** Lo máximo que se le puede dejar a un área: lo que ya tiene más todo lo disponible en caja. */
export function maximoAsignable(disponible: number, actual: number): number {
  return aCentimos(actual + Math.max(disponible, 0));
}

/** Qué parte de lo cobrado tiene asignada un área (0 a 100); 0 si no se cobró nada. */
export function porcentajeDe(asignado: number, cobrado: number): number {
  return cobrado > 0 ? Math.min(100, Math.round((asignado / cobrado) * 100)) : 0;
}
