import { ConceptoPago, Contrato, EstadoContrato, PagoPersonal, TipoContrato, TipoCuenta } from '../../core/models/rrhh.model';

/** Lógica pura de contratos y pagos del personal (etiquetas, totales, periodos). */

export const TIPOS_CONTRATO: { id: TipoContrato; etiqueta: string; ayuda: string }[] = [
  { id: 'PLAZO_FIJO', etiqueta: 'Plazo fijo', ayuda: 'Con fecha de inicio y de fin.' },
  { id: 'INDEFINIDO', etiqueta: 'Indefinido', ayuda: 'Sin fecha de fin.' },
  { id: 'POR_HORAS', etiqueta: 'Por horas', ayuda: 'Docentes contratados por horas; con fecha de fin.' },
  { id: 'LOCACION', etiqueta: 'Locación de servicios', ayuda: 'Servicio independiente; con fecha de fin.' }
];

export const CONCEPTOS_PAGO: { id: ConceptoPago; etiqueta: string; resta: boolean }[] = [
  { id: 'SUELDO', etiqueta: 'Sueldo', resta: false },
  { id: 'BONO', etiqueta: 'Bono', resta: false },
  { id: 'DESCUENTO', etiqueta: 'Descuento', resta: true },
  { id: 'ADELANTO', etiqueta: 'Adelanto', resta: true },
  { id: 'OTRO', etiqueta: 'Otro', resta: false }
];

export function etiquetaTipo(t: TipoContrato): string {
  return TIPOS_CONTRATO.find(x => x.id === t)?.etiqueta ?? t;
}

export function etiquetaConcepto(c: ConceptoPago): string {
  return CONCEPTOS_PAGO.find(x => x.id === c)?.etiqueta ?? c;
}

export function etiquetaEstadoContrato(e: EstadoContrato): string {
  switch (e) {
    case 'VIGENTE': return 'Vigente';
    case 'POR_VENCER': return 'Por vencer';
    case 'VENCIDO': return 'Vencido';
    case 'RESCINDIDO': return 'Rescindido';
    case 'POR_INICIAR': return 'Por iniciar';
  }
}

/** Clase de insignia según el estado (las mismas que usa el resto de la app). */
export function claseEstadoContrato(e: EstadoContrato): string {
  switch (e) {
    case 'VIGENTE': return 'badge-ok';
    case 'POR_VENCER': return 'badge-warn';
    case 'VENCIDO': return 'badge-danger';
    default: return 'badge-gray';
  }
}

/**
 * El contrato que mejor resume a una persona: el que rige hoy (vigente o por vencer), si no el que está por iniciar,
 * y si no el más reciente (vencido o rescindido). Sin contratos, undefined.
 */
export function contratoActual(contratos: readonly Contrato[]): Contrato | undefined {
  const orden = [...contratos].sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));
  return orden.find(c => c.estadoEfectivo === 'VIGENTE' || c.estadoEfectivo === 'POR_VENCER')
    ?? orden.find(c => c.estadoEfectivo === 'POR_INICIAR')
    ?? orden[0];
}

/** Filtros de la lista de contratos y sueldos. */
export type FiltroContrato = 'todos' | 'rigen' | 'por-vencer' | 'sin-vigente';

export const FILTROS_CONTRATO: { id: FiltroContrato; etiqueta: string }[] = [
  { id: 'todos', etiqueta: 'Todos' },
  { id: 'rigen', etiqueta: 'Con contrato vigente' },
  { id: 'por-vencer', etiqueta: 'Por vencer' },
  { id: 'sin-vigente', etiqueta: 'Sin contrato vigente' }
];

/** ¿El contrato rige hoy (vigente o por vencer)? */
export const rige = (c: Contrato | undefined): boolean => c?.estadoEfectivo === 'VIGENTE' || c?.estadoEfectivo === 'POR_VENCER';

/** «sin-vigente» incluye a quien no tiene contrato, o solo tiene uno vencido, rescindido o que aún no empieza. */
export function cumpleFiltro(c: Contrato | undefined, filtro: FiltroContrato): boolean {
  switch (filtro) {
    case 'rigen': return rige(c);
    case 'por-vencer': return c?.estadoEfectivo === 'POR_VENCER';
    case 'sin-vigente': return !rige(c);
    default: return true;
  }
}

/** Lo que cuesta la planilla de un mes completo: suma de las remuneraciones de los contratos que rigen. */
export function masaSalarial(contratos: readonly (Contrato | undefined)[]): number {
  return Math.round(contratos.filter(rige).reduce((t, c) => t + c!.remuneracion, 0) * 100) / 100;
}

/** Aviso corto sobre el periodo de un contrato; vacío si no hay nada que advertir. */
export function avisoPeriodo(c: Contrato, hoy: Date = new Date()): string {
  const cuando = (d: number): string => (d === 0 ? 'hoy' : d === 1 ? 'mañana' : d < 0 ? `hace ${-d} días` : `en ${d} días`);
  switch (c.estadoEfectivo) {
    case 'POR_INICIAR': return `Inicia ${cuando(diasHasta(c.fechaInicio, hoy))}`;
    case 'RESCINDIDO': return `Rescindido el ${fechaCorta(c.fechaRescision)}`;
    case 'VENCIDO': return `Venció ${cuando(diasHasta(c.fechaFin ?? c.fechaInicio, hoy))}`;
    case 'POR_VENCER': return `Vence ${cuando(diasHasta(c.fechaFin ?? c.fechaInicio, hoy))}`;
    default: return '';
  }
}

/**
 * El contrato por el que NO se puede crear otro: el que rige (vigente o por vencer) o el que aún no empieza. Cada persona tiene un solo
 * contrato a la vez; para continuar se renueva.
 */
export function contratoQueImpideOtro(contratos: readonly Contrato[]): Contrato | undefined {
  return contratos.find(c => c.estadoEfectivo === 'VIGENTE' || c.estadoEfectivo === 'POR_VENCER' || c.estadoEfectivo === 'POR_INICIAR');
}

/** El contrato que se puede renovar: el último de la persona (inicio más reciente) si no está rescindido y tiene fecha de fin. */
export function contratoRenovable(contratos: readonly Contrato[]): Contrato | undefined {
  const ultimo = [...contratos].filter(c => c.estado !== 'RESCINDIDO').sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio))[0];
  return ultimo?.fechaFin ? ultimo : undefined;
}

/** El día siguiente a una fecha AAAA-MM-DD (cuando empieza el contrato renovado). */
export function diaSiguiente(fecha: string): string {
  const [a, m, d] = fecha.split('-').map(Number);
  const f = new Date(Date.UTC(a, m - 1, d + 1));
  return `${f.getUTCFullYear()}-${String(f.getUTCMonth() + 1).padStart(2, '0')}-${String(f.getUTCDate()).padStart(2, '0')}`;
}

// ---------- Cuentas para depósito ----------

export const BANCOS: { id: string; etiqueta: string; billetera?: boolean }[] = [
  { id: 'BCP', etiqueta: 'BCP' }, { id: 'BBVA', etiqueta: 'BBVA' }, { id: 'INTERBANK', etiqueta: 'Interbank' }, { id: 'SCOTIABANK', etiqueta: 'Scotiabank' },
  { id: 'BANCO_NACION', etiqueta: 'Banco de la Nación' }, { id: 'BANBIF', etiqueta: 'BanBif' }, { id: 'MIBANCO', etiqueta: 'Mibanco' },
  { id: 'PICHINCHA', etiqueta: 'Banco Pichincha' }, { id: 'CAJA_AREQUIPA', etiqueta: 'Caja Arequipa' }, { id: 'CAJA_HUANCAYO', etiqueta: 'Caja Huancayo' },
  { id: 'CAJA_PIURA', etiqueta: 'Caja Piura' }, { id: 'YAPE', etiqueta: 'Yape', billetera: true }, { id: 'PLIN', etiqueta: 'Plin', billetera: true },
  { id: 'OTRO', etiqueta: 'Otro banco o caja' }
];

export const TIPOS_CUENTA: { id: TipoCuenta; etiqueta: string }[] = [
  { id: 'AHORROS', etiqueta: 'Ahorros' }, { id: 'CORRIENTE', etiqueta: 'Corriente' }, { id: 'SUELDO', etiqueta: 'Cuenta sueldo' }, { id: 'BILLETERA', etiqueta: 'Billetera' }
];

export const esBilletera = (banco: string): boolean => banco === 'YAPE' || banco === 'PLIN';
export const etiquetaBanco = (id: string): string => BANCOS.find(b => b.id === id)?.etiqueta ?? id;
export const etiquetaTipoCuenta = (id: TipoCuenta): string => TIPOS_CUENTA.find(t => t.id === id)?.etiqueta ?? id;
/** Quita espacios y guiones: 194-1234 5678-901 → 19412345678901. */
export const soloDigitos = (s: string): string => (s ?? '').replace(/[\s-]/g, '');

/** Los últimos 4 dígitos con el resto oculto: «•••• 8901». */
export function mascara(numero: string): string {
  return numero.length <= 4 ? numero : `•••• ${numero.slice(-4)}`;
}

export interface ErroresCuenta {
  tipo: string;
  numero: string;
  cci: string;
}

/** Las mismas reglas que el servidor: billetera = Yape o Plin con celular de 9 dígitos y sin CCI; una cuenta tiene 8 a 20 dígitos y el CCI, 20. */
export function erroresCuenta(banco: string, tipo: TipoCuenta, numero: string, cci: string): ErroresCuenta {
  const n = soloDigitos(numero);
  const c = soloDigitos(cci);
  const billetera = tipo === 'BILLETERA';
  const r: ErroresCuenta = { tipo: '', numero: '', cci: '' };
  if (billetera !== esBilletera(banco)) r.tipo = billetera ? 'Una billetera es Yape o Plin.' : 'Yape y Plin son billeteras: elige el tipo «Billetera».';
  if (!n) r.numero = billetera ? 'Indica el celular.' : 'Indica el número de cuenta.';
  else if (!/^\d+$/.test(n)) r.numero = 'Solo lleva dígitos.';
  else if (billetera ? n.length !== 9 : n.length < 8 || n.length > 20) r.numero = billetera ? 'El celular tiene 9 dígitos.' : 'El número tiene entre 8 y 20 dígitos.';
  if (c) {
    if (billetera) r.cci = 'Una billetera no lleva CCI.';
    else if (!/^\d{20}$/.test(c)) r.cci = 'El CCI tiene exactamente 20 dígitos.';
  }
  return r;
}

/** Hasta cuándo rige un contrato: la rescisión (si fue antes del fin) o su fin; vacío si es indefinido. */
export function finEfectivo(c: Contrato): string | undefined {
  if (c.estado === 'RESCINDIDO' && c.fechaRescision) return !c.fechaFin || c.fechaRescision < c.fechaFin ? c.fechaRescision : c.fechaFin;
  return c.fechaFin;
}

/**
 * El contrato que corresponde a un mes (AAAA-MM): el que se cruza con sus fechas. Si hay varios gana el de inicio más reciente;
 * si ninguno se cruza, undefined (para el mes en curso se puede caer en {@link contratoActual}).
 */
export function contratoDelPeriodo(contratos: readonly Contrato[], periodo: string): Contrato | undefined {
  if (!periodoValido(periodo)) return undefined;
  const desde = `${periodo}-01`;
  const hasta = `${periodo}-${String(diasDelMes(periodo)).padStart(2, '0')}`;
  // Misma regla que la planilla: de los contratos que rigen en el mes (sin contar los cancelados antes de empezar), el que cubre más días;
  // si empatan, el de inicio más reciente. Así, en el mes de una renovación, la tarjeta muestra el contrato por el que se paga.
  let mejor: Contrato | undefined;
  let mejorDias = 0;
  for (const c of contratos) {
    if (fueCancelado(c)) continue;
    const dias = diasDeContratoEnMes(c, desde, hasta);
    if (dias === 0) continue;
    if (!mejor || dias > mejorDias || (dias === mejorDias && c.fechaInicio > mejor.fechaInicio)) { mejor = c; mejorDias = dias; }
  }
  return mejor;
}

/** Rescindido antes de su inicio: se canceló antes de empezar, no llegó a regir ni un día (uno rescindido su primer día sí rigió ese día). */
export function fueCancelado(c: Contrato): boolean {
  return c.estado === 'RESCINDIDO' && !!c.fechaRescision && c.fechaRescision < c.fechaInicio;
}

/** Días del mes (AAAA-MM-DD a AAAA-MM-DD, inclusivos) en que rige un contrato. */
function diasDeContratoEnMes(c: Contrato, desde: string, hasta: string): number {
  const ini = c.fechaInicio > desde ? c.fechaInicio : desde;
  const finContrato = finEfectivo(c);
  const fin = !finContrato || finContrato > hasta ? hasta : finContrato;
  if (fin < ini) return 0;
  const [a1, m1, d1] = ini.split('-').map(Number);
  const [a2, m2, d2] = fin.split('-').map(Number);
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86_400_000) + 1;
}

/** Estado del pago de una persona en el mes. */
export type EstadoPagoMes = 'sin-contrato' | 'sin-generar' | 'pendiente' | 'por-aprobar' | 'pagado';

export function estadoPagoMes(contrato: Contrato | undefined, pagos: readonly PagoPersonal[]): EstadoPagoMes {
  if (pagos.some(p => p.estado === 'PENDIENTE')) return 'pendiente';
  // Caja ya registró el pago y el administrador aún no lo aprueba.
  if (pagos.some(p => p.estado === 'POR_APROBAR')) return 'por-aprobar';
  if (pagos.some(p => p.concepto === 'SUELDO')) return 'pagado';
  if (!contrato) return pagos.length ? 'pagado' : 'sin-contrato';
  return 'sin-generar';
}

export const ETIQUETA_ESTADO_PAGO: Record<EstadoPagoMes, string> = {
  'sin-contrato': 'Sin contrato', 'sin-generar': 'Sin generar', pendiente: 'Pendiente de pago', 'por-aprobar': 'Por aprobar', pagado: 'Pagado'
};

export const CLASE_ESTADO_PAGO: Record<EstadoPagoMes, string> = {
  'sin-contrato': 'badge-gray', 'sin-generar': 'badge-gray', pendiente: 'badge-warn', 'por-aprobar': 'badge-violet', pagado: 'badge-ok'
};

const dosDigitos = (n: number): string => String(n).padStart(2, '0');
const aTexto = (f: Date): string => `${f.getFullYear()}-${dosDigitos(f.getMonth() + 1)}-${dosDigitos(f.getDate())}`;

/**
 * Fecha de fin de un contrato que dura {@code meses} meses desde {@code inicio} (AAAA-MM-DD): el día anterior al mismo día, {@code meses}
 * después. El 1 de nov + 6 meses termina el 30 de abr; el 15 de nov + 3 meses, el 14 de feb. Si ese día no existe en el mes de destino
 * (inicio el 31), termina su último día.
 */
export function finPorMeses(inicio: string, meses: number): string {
  const [a, m, d] = inicio.split('-').map(Number);
  // Día 0 de un mes = último día del mes anterior.
  if (d === 1) return aTexto(new Date(a, m - 1 + meses, 0));
  const ultimoDia = new Date(a, m - 1 + meses + 1, 0).getDate();
  return aTexto(new Date(a, m - 1 + meses, Math.min(d - 1, ultimoDia)));
}

/** 31 de diciembre del año de {@code inicio}. */
export function finDeAnio(inicio: string): string {
  return `${inicio.slice(0, 4)}-12-31`;
}

/** Primer día del mes siguiente a {@code hoy}. */
export function primerDiaMesSiguiente(hoy: Date = new Date()): string {
  return aTexto(new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1));
}

/** Cuántas tardanzas equivalen a un día de descuento. */
export const TARDANZAS_POR_DIA = 8;

/** Días que tiene un mes AAAA-MM (28, 29, 30 o 31). */
export function diasDelMes(periodo: string): number {
  if (!periodoValido(periodo)) return 30;
  const [a, m] = periodo.split('-').map(Number);
  return new Date(a, m, 0).getDate();
}

const aCentimos = (n: number): number => Math.round(n * 100) / 100;

/** Lo que vale un día de trabajo en el mes: el sueldo dividido entre los días de ese mes. */
export function valorDia(remuneracion: number, periodo: string): number {
  return remuneracion > 0 ? aCentimos(remuneracion / diasDelMes(periodo)) : 0;
}

/** Cómo se llega al descuento por inasistencias de un mes. */
export interface DescuentoAsistencia {
  diasMes: number;
  /** Sueldo ÷ días del mes. */
  valorDia: number;
  /** Faltas sin justificar: cada una descuenta un día. */
  faltas: number;
  tardanzas: number;
  /** Días que suman las tardanzas (cada {@link TARDANZAS_POR_DIA} hacen un día). */
  diasPorTardanzas: number;
  /** Tardanzas que no alcanzan para otro día. */
  tardanzasSobrantes: number;
  diasADescontar: number;
  /** Total a descontar; nunca pasa del sueldo. */
  monto: number;
}

/**
 * Descuento por inasistencias: cada falta sin justificar es un día y cada 8 tardanzas otro día. Las faltas justificadas y los permisos
 * no descuentan. El día vale sueldo ÷ días del mes y el total nunca pasa del sueldo.
 */
export function descuentoAsistencia(remuneracion: number, periodo: string, faltas: number, tardanzas: number): DescuentoAsistencia {
  const diasMes = diasDelMes(periodo);
  const diasPorTardanzas = Math.floor(Math.max(0, tardanzas) / TARDANZAS_POR_DIA);
  const diasADescontar = Math.max(0, faltas) + diasPorTardanzas;
  const monto = remuneracion > 0 ? Math.min(remuneracion, aCentimos((remuneracion / diasMes) * diasADescontar)) : 0;
  return {
    diasMes, valorDia: valorDia(remuneracion, periodo), faltas: Math.max(0, faltas), tardanzas: Math.max(0, tardanzas), diasPorTardanzas,
    tardanzasSobrantes: Math.max(0, tardanzas) % TARDANZAS_POR_DIA, diasADescontar, monto
  };
}

/** Agrupa los contratos por persona. */
export function contratosPorPersona(contratos: readonly Contrato[]): Map<number, Contrato[]> {
  const m = new Map<number, Contrato[]>();
  for (const c of contratos) m.set(c.personalId, [...(m.get(c.personalId) ?? []), c]);
  return m;
}

/** «AAAA-MM» del mes de una fecha. */
export function periodoDe(fecha: Date): string {
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
}

export function periodoValido(p: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(p);
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** «2026-11» → «noviembre 2026». */
export function nombrePeriodo(p: string): string {
  if (!periodoValido(p)) return p;
  return `${MESES[Number(p.slice(5)) - 1]} ${p.slice(0, 4)}`;
}

const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** «2026-01-05» → «05 ene 2026». */
export function fechaCorta(f: string | null | undefined): string {
  if (!f || !/^\d{4}-\d{2}-\d{2}/.test(f)) return '—';
  return `${f.slice(8, 10)} ${MESES_CORTOS[Number(f.slice(5, 7)) - 1]} ${f.slice(0, 4)}`;
}

/** Cuánto dura un contrato (fechas inclusivas): «Indefinido», «12 días», «8 meses», «1 año»… */
export function duracionContrato(inicio: string, fin?: string | null): string {
  if (!fin) return 'Indefinido';
  const [a1, m1, d1] = inicio.split('-').map(Number);
  const [a2, m2, d2] = fin.split('-').map(Number);
  const dias = Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86_400_000) + 1;
  if (dias < 28) return `${dias} ${dias === 1 ? 'día' : 'días'}`;
  const meses = Math.round(dias / 30.4375);
  if (meses >= 12 && meses % 12 === 0) return `${meses / 12} ${meses === 12 ? 'año' : 'años'}`;
  return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
}

export function soles(n: number): string {
  return `S/ ${n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export interface TotalesPlanilla {
  neto: number;
  pagado: number;
  pendiente: number;
}

/** Neto = ingresos − descuentos y adelantos. Lo pagado y lo pendiente se miden con el mismo signo. */
export function totalesPlanilla(pagos: readonly PagoPersonal[]): TotalesPlanilla {
  let pagado = 0;
  let pendiente = 0;
  for (const p of pagos) {
    if (p.estado === 'PAGADO') pagado += p.montoFirmado;
    else pendiente += p.montoFirmado;
  }
  return { neto: redondear(pagado + pendiente), pagado: redondear(pagado), pendiente: redondear(pendiente) };
}

function redondear(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Días que faltan para una fecha AAAA-MM-DD (negativo si ya pasó). */
export function diasHasta(fecha: string, hoy: Date = new Date()): number {
  const [a, m, d] = fecha.split('-').map(Number);
  const base = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return Math.round((Date.UTC(a, m - 1, d) - base) / 86_400_000);
}
