import { Campania } from '../../core/models/matricula.model';
import { Anio, Asignacion, Docente, Grado, MallaGrado, Seccion } from '../../core/models/planificacion.model';
import { Tarifa } from '../../core/models/pago.model';

/** Lógica pura del asistente de apertura de periodo: propuestas (campaña, feriados, secciones, docentes) y si ya se puede matricular. */

const DIA_MS = 86_400_000;
const aMs = (iso: string): number => { const [a, m, d] = iso.split('-').map(Number); return Date.UTC(a, m - 1, d); };
const aIso = (ms: number): string => new Date(ms).toISOString().slice(0, 10);
export const sumarDias = (iso: string, dias: number): string => aIso(aMs(iso) + dias * DIA_MS);

// ---------------------------------------------------------------- campaña

/** Nombre y fechas propuestos para la campaña de matrícula: empieza hoy (o al empezar el año si aún falta) y dura hasta 30 días después del inicio de clases. */
export function proponerCampania(anio: Pick<Anio, 'nombre' | 'fechaInicio' | 'fechaFin'>, hoy: string): { nombre: string; fechaInicio: string; fechaFin: string } {
  const inicio = hoy <= anio.fechaFin ? hoy : anio.fechaInicio;
  let fin = sumarDias(anio.fechaInicio, 30);
  if (fin < inicio) fin = sumarDias(inicio, 30);
  if (fin > anio.fechaFin) fin = anio.fechaFin;
  return { nombre: `Matrícula ${anio.nombre}`, fechaInicio: inicio, fechaFin: fin < inicio ? inicio : fin };
}

// ---------------------------------------------------------------- feriados

/** Feriados nacionales de fecha fija en el Perú (los de Semana Santa cambian cada año: se cargan a mano). */
const FERIADOS_FIJOS: readonly [string, string][] = [
  ['01-01', 'Año Nuevo'], ['05-01', 'Día del Trabajo'], ['06-29', 'San Pedro y San Pablo'], ['07-28', 'Fiestas Patrias'], ['07-29', 'Fiestas Patrias'],
  ['08-06', 'Batalla de Junín'], ['08-30', 'Santa Rosa de Lima'], ['10-08', 'Combate de Angamos'], ['11-01', 'Día de Todos los Santos'],
  ['12-08', 'Inmaculada Concepción'], ['12-09', 'Batalla de Ayacucho'], ['12-25', 'Navidad']
];

/** Los feriados fijos que caen dentro del año escolar y que todavía no están cargados. */
export function feriadosFijosDelAnio(anio: Pick<Anio, 'fechaInicio' | 'fechaFin'>, yaCargados: readonly string[]): { fecha: string; descripcion: string }[] {
  const tengo = new Set(yaCargados);
  const lista: { fecha: string; descripcion: string }[] = [];
  for (let a = Number(anio.fechaInicio.slice(0, 4)); a <= Number(anio.fechaFin.slice(0, 4)); a++) {
    for (const [md, descripcion] of FERIADOS_FIJOS) {
      const fecha = `${a}-${md}`;
      if (fecha >= anio.fechaInicio && fecha <= anio.fechaFin && !tengo.has(fecha)) lista.push({ fecha, descripcion });
    }
  }
  return lista.sort((x, y) => x.fecha.localeCompare(y.fecha));
}

// ---------------------------------------------------------------- secciones

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** Los nombres de las secciones nuevas de un grado (A, B, C…), saltando los que ya existen. */
export function nombresDeSecciones(cantidad: number, existentes: readonly string[]): string[] {
  const usados = new Set(existentes.map(n => n.trim().toUpperCase()));
  const r: string[] = [];
  for (let i = 0; i < LETRAS.length && r.length < cantidad; i++) if (!usados.has(LETRAS[i])) r.push(LETRAS[i]);
  return r;
}

/** Una sección que se puede marcar en el asistente: ya activa (no se toca), inactiva (se puede reactivar) o nueva (se crea). */
export interface OpcionSeccion {
  nombre: string;
  estado: 'activa' | 'inactiva' | 'nueva';
  /** La sección existente (activa o inactiva) del año; las nuevas no la tienen. */
  seccion?: Seccion;
  /** El año anterior tuvo una sección con este nombre en el grado. */
  delAnterior: boolean;
  /** Se agregó con «+ Otra sección». */
  extra: boolean;
}

/**
 * Todas las secciones de un grado que se pueden marcar: las que existen en el año (activas e inactivas), las que tuvo el año anterior, las letras
 * A–D de siempre y las extras que se agreguen; sin repetir y en orden. Las que ya están activas no se vuelven a crear.
 */
export function opcionesDeSecciones(existentes: readonly Seccion[], previas: readonly string[], extras: readonly string[]): OpcionSeccion[] {
  const letra = (n: string): string => n.trim().toUpperCase();
  const mapa = new Map<string, OpcionSeccion>();
  const poner = (nombre: string, parcial: Partial<OpcionSeccion>): void => {
    const k = letra(nombre);
    if (!k) return;
    mapa.set(k, { nombre: k, estado: 'nueva', delAnterior: false, extra: false, ...mapa.get(k), ...parcial });
  };
  for (const n of LETRAS.slice(0, 4)) poner(n, {});
  for (const n of previas) poner(n, { delAnterior: true });
  for (const n of extras) poner(n, { extra: true });
  // Lo que ya existe en el año manda: una activa no se recrea; una inactiva se puede reactivar. Si hay duplicadas, gana la activa.
  for (const s of [...existentes].sort((a, b) => Number(a.activo) - Number(b.activo))) poner(s.nombre, { estado: s.activo ? 'activa' : 'inactiva', seccion: s });
  return [...mapa.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { numeric: true }));
}

/** La próxima letra libre (A, B, C…) para «+ Otra sección»; {@code null} si se acabaron. */
export function siguienteLetra(usadas: readonly string[]): string | null {
  const u = new Set(usadas.map(n => n.trim().toUpperCase()));
  return [...LETRAS].find(l => !u.has(l)) ?? null;
}

/**
 * Lo que viene marcado al empezar: en un grado que aún no tiene secciones, las que tuvo el año anterior (o solo la A si no hubo);
 * en uno que ya las tiene, nada (lo existente ya está activo y no se vuelve a crear).
 */
export function seleccionInicial(opciones: readonly OpcionSeccion[]): string[] {
  if (opciones.some(o => o.estado === 'activa')) return [];
  const previas = opciones.filter(o => o.delAnterior && o.estado !== 'activa').map(o => o.nombre);
  return previas.length ? previas : opciones.filter(o => o.nombre === 'A').map(o => o.nombre);
}

export interface FilaSecciones { grado: Grado; activas: Seccion[]; cursos: number }

/** Por cada grado ofrecido: cuántas secciones activas tiene en el año y cuántos cursos lleva. */
export function filasDeSecciones(grados: readonly Grado[], secciones: readonly Seccion[], mallas: Readonly<Record<number, MallaGrado | null | undefined>>): FilaSecciones[] {
  return [...grados].sort((a, b) => a.nivelId - b.nivelId || a.numero - b.numero)
    .map(grado => ({ grado, activas: secciones.filter(s => s.activo && s.gradoId === grado.id), cursos: mallas[grado.id]?.cursos.length ?? 0 }));
}

// ---------------------------------------------------------------- docentes

export interface CursoPendiente {
  clave: string;
  gradoId: number;
  cursoId: number;
  cursoNombre: string;
  /** Secciones activas del grado que aún no tienen docente para este curso. */
  secciones: Seccion[];
}

/** Los cursos de la malla de cada grado que, en alguna de sus secciones activas, todavía no tienen docente. */
export function cursosPendientes(
  secciones: readonly Seccion[], mallas: Readonly<Record<number, MallaGrado | null | undefined>>, asignaciones: readonly Asignacion[]
): CursoPendiente[] {
  const r: CursoPendiente[] = [];
  const gradoIds = [...new Set(secciones.filter(s => s.activo).map(s => s.gradoId))];
  for (const gradoId of gradoIds) {
    const activas = secciones.filter(s => s.activo && s.gradoId === gradoId);
    for (const item of mallas[gradoId]?.cursos ?? []) {
      const sin = activas.filter(s => !asignaciones.some(a => a.seccionId === s.id && a.cursoId === item.cursoId));
      if (sin.length) r.push({ clave: `${gradoId}-${item.cursoId}`, gradoId, cursoId: item.cursoId, cursoNombre: item.cursoNombre, secciones: sin });
    }
  }
  return r.sort((a, b) => (activas(secciones, a.gradoId)[0]?.nivelId ?? 0) - (activas(secciones, b.gradoId)[0]?.nivelId ?? 0)
    || (activas(secciones, a.gradoId)[0]?.gradoNombre ?? '').localeCompare(activas(secciones, b.gradoId)[0]?.gradoNombre ?? '', 'es', { numeric: true })
    || a.cursoNombre.localeCompare(b.cursoNombre, 'es'));
}
const activas = (secciones: readonly Seccion[], gradoId: number): Seccion[] => secciones.filter(s => s.activo && s.gradoId === gradoId);

/**
 * Propone un docente para cada curso pendiente: entre los aptos para ese curso (los que lo tienen en su lista) elige al que menos secciones lleva,
 * contando las que ya tiene y las que se le van proponiendo. Los cursos con menos aptos se reparten primero. Sin aptos, sin propuesta.
 */
export function sugerirDocentes(
  pendientes: readonly CursoPendiente[], docentes: readonly Pick<Docente, 'id' | 'cursoIds' | 'estado'>[], asignaciones: readonly Asignacion[]
): Record<string, number> {
  const carga = new Map<number, number>();
  for (const a of asignaciones) carga.set(a.docenteId, (carga.get(a.docenteId) ?? 0) + 1);
  const aptosDe = (cursoId: number): number[] => docentes.filter(d => d.estado === 'ACTIVO' && d.cursoIds?.includes(cursoId)).map(d => d.id);
  const orden = [...pendientes].sort((a, b) => aptosDe(a.cursoId).length - aptosDe(b.cursoId).length);
  const r: Record<string, number> = {};
  for (const p of orden) {
    const aptos = aptosDe(p.cursoId);
    if (!aptos.length) continue;
    const elegido = [...aptos].sort((x, y) => (carga.get(x) ?? 0) - (carga.get(y) ?? 0) || x - y)[0];
    r[p.clave] = elegido;
    carga.set(elegido, (carga.get(elegido) ?? 0) + p.secciones.length);
  }
  return r;
}

// ---------------------------------------------------------------- tarifas

export interface NivelTarifas { nivelId: number; faltaMatricula: boolean; faltaPension: boolean }

/** Por cada nivel que ofrece grados: qué tarifa le falta (matrícula y/o pensión) en el año. Una tarifa por grado también cuenta como cubierta. */
export function tarifasFaltantes(gradosDelNivel: ReadonlyMap<number, readonly Grado[]>, tarifas: readonly Pick<Tarifa, 'nivelId' | 'gradoId' | 'conceptoCodigo' | 'activo'>[]): NivelTarifas[] {
  const cubierta = (nivelId: number, grados: readonly Grado[], codigo: string): boolean => {
    const propias = tarifas.filter(t => t.activo && t.nivelId === nivelId && t.conceptoCodigo === codigo);
    return propias.some(t => !t.gradoId) || (grados.length > 0 && grados.every(g => propias.some(t => t.gradoId === g.id)));
  };
  return [...gradosDelNivel.entries()].map(([nivelId, grados]) => ({ nivelId, faltaMatricula: !cubierta(nivelId, grados, 'MATRICULA'), faltaPension: !cubierta(nivelId, grados, 'PENSION') }));
}

// ---------------------------------------------------------------- ¿ya se puede matricular?

export interface ItemListo { id: string; ok: boolean; requerido: boolean; texto: string }

export interface Listo {
  items: ItemListo[];
  /** Lo necesario para que la página pública deje matricular. */
  puedeMatricular: boolean;
  gradosListos: number;
}

/**
 * Si el año ya está listo para que se matriculen: año activo, campaña abierta y al menos un grado con sección (vacantes) y tarifa de matrícula.
 * Los docentes y los horarios no impiden matricular (se terminan después): solo se avisan.
 */
export function evaluarListo(d: {
  anio: Pick<Anio, 'estado'> | null; grados: readonly Grado[]; secciones: readonly Seccion[]; tarifas: readonly Pick<Tarifa, 'nivelId' | 'gradoId' | 'conceptoCodigo' | 'activo'>[];
  campanias: readonly Pick<Campania, 'estado'>[]; pendientesDocente: number; periodos: number;
}): Listo {
  const gradosListos = d.grados.filter(g =>
    d.secciones.some(s => s.activo && s.gradoId === g.id)
    && d.tarifas.some(t => t.activo && t.conceptoCodigo === 'MATRICULA' && t.nivelId === g.nivelId && (!t.gradoId || t.gradoId === g.id))).length;
  const items: ItemListo[] = [
    { id: 'anio', ok: d.anio?.estado === 'ACTIVO', requerido: true, texto: d.anio ? (d.anio.estado === 'ACTIVO' ? 'El año está abierto (activo).' : 'El año todavía no está abierto: ábrelo para que se pueda matricular.') : 'No hay un año elegido.' },
    { id: 'campania', ok: d.campanias.some(c => c.estado === 'ABIERTA'), requerido: true, texto: d.campanias.some(c => c.estado === 'ABIERTA') ? 'La campaña de matrícula está abierta.' : d.campanias.length ? 'Hay una campaña, pero no está abierta.' : 'Falta crear y abrir la campaña de matrícula.' },
    { id: 'grados', ok: gradosListos > 0, requerido: true, texto: gradosListos > 0 ? `${gradosListos} ${gradosListos === 1 ? 'grado listo' : 'grados listos'} (con secciones y tarifa de matrícula).` : 'Ningún grado tiene a la vez secciones (vacantes) y tarifa de matrícula.' },
    { id: 'periodos', ok: d.periodos > 0, requerido: false, texto: d.periodos > 0 ? `${d.periodos} ${d.periodos === 1 ? 'periodo definido' : 'periodos definidos'}.` : 'Sin periodos: las notas y las libretas los necesitan (se pueden definir después).' },
    { id: 'docentes', ok: d.pendientesDocente === 0 && d.secciones.some(s => s.activo), requerido: false, texto: d.pendientesDocente === 0 ? 'Todos los cursos tienen docente.' : `${d.pendientesDocente} ${d.pendientesDocente === 1 ? 'curso sin docente' : 'cursos sin docente'} (se asignan después, no impide matricular).` }
  ];
  return { items, puedeMatricular: items.filter(i => i.requerido).every(i => i.ok), gradosListos };
}
