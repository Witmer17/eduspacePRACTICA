/** Cómo se divide el año académico: bimestres (4), trimestres (3) o semestres (2). */
export type Regimen = 'BIMESTRE' | 'TRIMESTRE' | 'SEMESTRE';

export interface InfoRegimen {
  id: Regimen;
  /** Plural, para el selector: «Bimestres». */
  etiqueta: string;
  /** Singular, para nombrar cada periodo: «I Bimestre». */
  singular: string;
  cantidad: number;
  ayuda: string;
}

export const REGIMENES: InfoRegimen[] = [
  { id: 'BIMESTRE', etiqueta: 'Bimestres', singular: 'Bimestre', cantidad: 4, ayuda: '4 periodos de unos 2 meses' },
  { id: 'TRIMESTRE', etiqueta: 'Trimestres', singular: 'Trimestre', cantidad: 3, ayuda: '3 periodos de unos 3 meses' },
  { id: 'SEMESTRE', etiqueta: 'Semestres', singular: 'Semestre', cantidad: 2, ayuda: '2 periodos de unos 5 meses' }
];

/** Duraciones que se ofrecen al crear un periodo a mano. En un colegio peruano lo común son bimestres (2 meses) y trimestres (3); el semestre dura 6. */
export interface Duracion {
  meses: number;
  /** Cómo se llama un periodo de esa duración. */
  singular: string;
}

export const DURACIONES: Duracion[] = [
  { meses: 2, singular: 'Bimestre' },
  { meses: 3, singular: 'Trimestre' },
  { meses: 4, singular: 'Cuatrimestre' },
  { meses: 6, singular: 'Semestre' }
];

const SINGULARES = new Set(['Bimestre', 'Trimestre', 'Cuatrimestre', 'Semestre']);

/** ¿El nombre es de los que se arman solos («Bimestre 3», «Trimestre 1») o está vacío? Solo esos se cambian al elegir otra duración. */
export function esNombreAutomatico(nombre: string): boolean {
  const t = (nombre ?? '').trim();
  if (!t) return true;
  const m = /^(\S+)\s+\d+$/.exec(t);
  if (m && SINGULARES.has(m[1])) return true;
  const r = /^(I|II|III|IV|V|VI)\s+(\S+)$/.exec(t);          // «II Bimestre», como los que arma el régimen
  return !!r && SINGULARES.has(r[2]);
}

export const nombreDePeriodo = (singular: string, numero: number): string => `${singular} ${numero}`;

const aTextoUtc = (ms: number): string => new Date(ms).toISOString().slice(0, 10);

/**
 * Fin de un periodo que dura {@code meses} meses desde {@code inicio} (AAAA-MM-DD): el día anterior al mismo día, {@code meses} después
 * (el 12 de oct + 2 meses termina el 11 de dic; el 1 de mar + 3 meses, el 31 de may). Nunca pasa del fin del año: en ese caso se recorta
 * y se avisa con {@code recortado}.
 */
export function finDelPeriodo(inicio: string, meses: number, finAnio?: string | null): { fin: string; recortado: boolean } {
  const [a, m, d] = inicio.split('-').map(Number);
  const destino = Date.UTC(a, m - 1 + meses, 1);
  const ultimoDia = new Date(Date.UTC(new Date(destino).getUTCFullYear(), new Date(destino).getUTCMonth() + 1, 0)).getUTCDate();
  // El día 1 termina el último día del mes anterior; los demás, el día anterior al mismo día (o el último del mes si no existe).
  const fin = d === 1
    ? aTextoUtc(destino - DIA_MS)
    : aTextoUtc(Date.UTC(new Date(destino).getUTCFullYear(), new Date(destino).getUTCMonth(), Math.min(d - 1, ultimoDia)));
  return finAnio && fin > finAnio ? { fin: finAnio, recortado: true } : { fin, recortado: false };
}

interface RangoPeriodo { id?: number; nombre: string; fechaInicio: string; fechaFin: string }

/**
 * Lo que conviene avisar antes de guardar un periodo: fechas incompletas o al revés, fuera del año, o que se cruza con otro periodo.
 * {@code editandoId} es el periodo que se está cambiando (no cuenta como «otro»).
 */
export function avisosDelPeriodo(
  inicio: string, fin: string, anio: { nombre: string; fechaInicio: string; fechaFin: string } | null, otros: readonly RangoPeriodo[], editandoId?: number | null
): string[] {
  const a: string[] = [];
  if (!inicio || !fin) return a;
  if (fin < inicio) { a.push('El fin no puede ser anterior al inicio.'); return a; }
  if (anio && (inicio < anio.fechaInicio || fin > anio.fechaFin)) a.push(`Queda fuera del año ${anio.nombre} (del ${anio.fechaInicio} al ${anio.fechaFin}).`);
  for (const o of otros) {
    if (o.id !== undefined && o.id === editandoId) continue;
    if (inicio <= o.fechaFin && fin >= o.fechaInicio) a.push(`Se cruza con ${o.nombre} (del ${o.fechaInicio} al ${o.fechaFin}).`);
  }
  return a;
}

export interface PeriodoPropuesto {
  numero: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
}

const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const DIA_MS = 86_400_000;

const aMs = (iso: string): number => {
  const [a, m, d] = iso.split('-').map(Number);
  return Date.UTC(a, m - 1, d);
};
const aIso = (ms: number): string => new Date(ms).toISOString().slice(0, 10);

/**
 * Reparte el año en periodos consecutivos y sin huecos: cada uno empieza el día siguiente al fin del anterior, el primero
 * en la fecha de inicio del año y el último en la de fin. Los días sobrantes se dan de uno en uno a los primeros periodos.
 * Devuelve una lista vacía si las fechas no son válidas o el año es más corto que el número de periodos.
 */
export function proponerPeriodos(regimen: Regimen, inicio: string | null | undefined, fin: string | null | undefined): PeriodoPropuesto[] {
  const info = REGIMENES.find(r => r.id === regimen);
  if (!info || !inicio || !fin || !/^\d{4}-\d{2}-\d{2}$/.test(inicio) || !/^\d{4}-\d{2}-\d{2}$/.test(fin)) return [];
  const desde = aMs(inicio);
  const hasta = aMs(fin);
  const dias = Math.round((hasta - desde) / DIA_MS) + 1;
  if (!Number.isFinite(dias) || dias < info.cantidad) return [];

  const base = Math.floor(dias / info.cantidad);
  const sobran = dias % info.cantidad;
  const r: PeriodoPropuesto[] = [];
  let cursor = desde;
  for (let i = 0; i < info.cantidad; i++) {
    const largo = base + (i < sobran ? 1 : 0);
    r.push({ numero: i + 1, nombre: `${ROMANOS[i]} ${info.singular}`, fechaInicio: aIso(cursor), fechaFin: aIso(cursor + (largo - 1) * DIA_MS) });
    cursor += largo * DIA_MS;
  }
  return r;
}
