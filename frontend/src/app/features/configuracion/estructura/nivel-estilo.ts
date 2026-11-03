import { Grado } from '../../../core/models/planificacion.model';

/** Radio del anillo de ocupación de la tarjeta (el SVG mide 64×64). */
export const RADIO_ANILLO = 26;
export const CIRCUNFERENCIA = 2 * Math.PI * RADIO_ANILLO;

/** Clase global (`styles.css`) que da a un nivel sus colores: `--nivel`, `--nivel-2` y `--nivel-suave`. */
export function claseNivel(codigo: string | undefined | null): string {
  switch ((codigo ?? '').toUpperCase()) {
    case 'INICIAL': return 'n-inicial';
    case 'PRIMARIA': return 'n-primaria';
    case 'SECUNDARIA': return 'n-secundaria';
    default: return 'n-otro';
  }
}

/** Lo que va en el emblema de un grado: la edad en Inicial («3 años» → 3) y el número de grado en el resto («1° de Primaria» → 1°). */
export function emblema(grado: Grado, nivelCodigo: string | undefined | null): string {
  return (nivelCodigo ?? '').toUpperCase() === 'INICIAL' ? String(grado.numero + 2) : `${grado.numero}°`;
}

/** Largo del arco del anillo para un porcentaje de ocupación (0–100). */
export function trazoAnillo(porcentaje: number): number {
  return (Math.min(Math.max(porcentaje, 0), 100) / 100) * CIRCUNFERENCIA;
}
