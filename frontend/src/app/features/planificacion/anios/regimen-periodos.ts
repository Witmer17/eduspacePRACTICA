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
