/** Lógica pura para crear un año académico: nombre y fechas propuestos, y avisos antes de guardar. */

const DIA_MS = 86_400_000;
const aIso = (ms: number): string => new Date(ms).toISOString().slice(0, 10);

/** El primer lunes desde esa fecha (ella misma si ya es lunes). */
export function primerLunesDesde(anio: number, mes: number, dia: number): string {
  const ms = Date.UTC(anio, mes - 1, dia);
  const dow = new Date(ms).getUTCDay();                     // 0 = domingo … 6 = sábado
  return aIso(ms + ((1 - dow + 7) % 7) * DIA_MS);
}

/** El último viernes hasta esa fecha (ella misma si ya es viernes). */
export function ultimoViernesHasta(anio: number, mes: number, dia: number): string {
  const ms = Date.UTC(anio, mes - 1, dia);
  const dow = new Date(ms).getUTCDay();
  return aIso(ms - ((dow - 5 + 7) % 7) * DIA_MS);
}

/**
 * Las fechas habituales de un año escolar en el Perú: empieza el primer lunes de marzo y termina el último viernes hasta el 20 de diciembre
 * (2026: del 2 de marzo al 18 de diciembre). Si el nombre no es un año de 4 dígitos no hay propuesta.
 */
export function fechasDelAnio(nombre: string): { fechaInicio: string; fechaFin: string } | null {
  const t = (nombre ?? '').trim();
  if (!/^\d{4}$/.test(t)) return null;
  const a = Number(t);
  return { fechaInicio: primerLunesDesde(a, 3, 1), fechaFin: ultimoViernesHasta(a, 12, 20) };
}

/** El año que sigue al último creado («2026» → «2027», con sus fechas); si no hay ninguno, el año de {@code hoy}. */
export function proponerAnio(anios: readonly { nombre: string }[], hoy: Date = new Date()): { nombre: string; fechaInicio: string; fechaFin: string } {
  const numericos = anios.map(a => a.nombre.trim()).filter(n => /^\d{4}$/.test(n)).map(Number);
  const nombre = String(numericos.length ? Math.max(...numericos) + 1 : hoy.getFullYear());
  return { nombre, ...fechasDelAnio(nombre)! };
}

interface RangoAnio { id?: number; nombre: string; fechaInicio: string; fechaFin: string }

/** Avisos antes de guardar un año: fin anterior al inicio, nombre repetido o fechas que se cruzan con otro año. */
export function avisosDelAnio(nombre: string, inicio: string, fin: string, otros: readonly RangoAnio[], editandoId?: number | null): string[] {
  const a: string[] = [];
  const propios = otros.filter(o => o.id === undefined || o.id !== editandoId);
  if (nombre.trim() && propios.some(o => o.nombre.trim().toLowerCase() === nombre.trim().toLowerCase())) a.push(`Ya existe el año ${nombre.trim()}.`);
  if (!inicio || !fin) return a;
  if (fin < inicio) { a.push('El fin no puede ser anterior al inicio.'); return a; }
  for (const o of propios) if (inicio <= o.fechaFin && fin >= o.fechaInicio) a.push(`Se cruza con el año ${o.nombre} (del ${o.fechaInicio} al ${o.fechaFin}).`);
  return a;
}
