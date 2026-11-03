import { AsistenciaPersonal, EstadoAsistenciaPersonal } from '../../core/models/asistencia-personal.model';

/** Lógica pura de la asistencia del personal (estados, conteos, resumen del mes). */

export const ESTADOS_ASISTENCIA: { id: EstadoAsistenciaPersonal; etiqueta: string; clase: string; conHoras: boolean }[] = [
  { id: 'PRESENTE', etiqueta: 'Presente', clase: 'badge-ok', conHoras: true },
  { id: 'TARDANZA', etiqueta: 'Tardanza', clase: 'badge-warn', conHoras: true },
  { id: 'FALTA', etiqueta: 'Falta', clase: 'badge-danger', conHoras: false },
  { id: 'JUSTIFICADA', etiqueta: 'Falta justificada', clase: 'badge-violet', conHoras: false },
  { id: 'PERMISO', etiqueta: 'Permiso o licencia', clase: 'badge-gray', conHoras: false }
];

export function etiquetaEstado(e: EstadoAsistenciaPersonal | ''): string {
  return ESTADOS_ASISTENCIA.find(x => x.id === e)?.etiqueta ?? 'Sin marcar';
}

export function llevaHoras(e: EstadoAsistenciaPersonal | ''): boolean {
  return ESTADOS_ASISTENCIA.find(x => x.id === e)?.conHoras ?? false;
}

/** Recorta «08:05:00» a «08:05» (el campo de hora del navegador no acepta segundos). */
export function horaCorta(h: string | null | undefined): string {
  return h ? h.slice(0, 5) : '';
}

export interface Conteo {
  PRESENTE: number;
  TARDANZA: number;
  FALTA: number;
  JUSTIFICADA: number;
  PERMISO: number;
  sinMarcar: number;
}

/** Cuántas personas hay en cada estado; las que no tienen estado cuentan como «sin marcar». */
export function contar(estados: readonly (EstadoAsistenciaPersonal | '')[]): Conteo {
  const c: Conteo = { PRESENTE: 0, TARDANZA: 0, FALTA: 0, JUSTIFICADA: 0, PERMISO: 0, sinMarcar: 0 };
  for (const e of estados) {
    if (e) c[e]++;
    else c.sinMarcar++;
  }
  return c;
}

export interface ResumenPersona {
  personalId: number;
  presentes: number;
  tardanzas: number;
  faltas: number;
  justificadas: number;
  permisos: number;
  /** Días con algún estado marcado. */
  marcados: number;
  /** % de días marcados en que estuvo (presente o con tardanza); null si no hay días marcados. */
  porcentaje: number | null;
}

/** Resume los registros de un rango por persona. Las faltas justificadas y los permisos no bajan el porcentaje: no cuentan como días exigibles. */
export function resumenPorPersona(registros: readonly AsistenciaPersonal[]): Map<number, ResumenPersona> {
  const m = new Map<number, ResumenPersona>();
  for (const r of registros) {
    const s = m.get(r.personalId) ?? { personalId: r.personalId, presentes: 0, tardanzas: 0, faltas: 0, justificadas: 0, permisos: 0, marcados: 0, porcentaje: null };
    s.marcados++;
    if (r.estado === 'PRESENTE') s.presentes++;
    else if (r.estado === 'TARDANZA') s.tardanzas++;
    else if (r.estado === 'FALTA') s.faltas++;
    else if (r.estado === 'JUSTIFICADA') s.justificadas++;
    else if (r.estado === 'PERMISO') s.permisos++;
    m.set(r.personalId, s);
  }
  for (const s of m.values()) {
    const exigibles = s.presentes + s.tardanzas + s.faltas;
    s.porcentaje = exigibles ? Math.round(((s.presentes + s.tardanzas) / exigibles) * 100) : null;
  }
  return m;
}

/** Primer y último día (AAAA-MM-DD) de un mes AAAA-MM. */
export function rangoDelMes(periodo: string): { desde: string; hasta: string } {
  const [a, m] = periodo.split('-').map(Number);
  const ultimo = new Date(a, m, 0).getDate();
  const mm = String(m).padStart(2, '0');
  return { desde: `${a}-${mm}-01`, hasta: `${a}-${mm}-${String(ultimo).padStart(2, '0')}` };
}

/** Hoy como AAAA-MM-DD en hora local (no UTC: de noche `toISOString` daría el día siguiente). */
export function hoyLocal(ahora: Date = new Date()): string {
  return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
}
