export type EstadoCuota = 'PENDIENTE' | 'PARCIAL' | 'PAGADA' | 'VENCIDA' | 'ANULADA';
export type MedioPago = 'EFECTIVO' | 'TARJETA' | 'YAPE_PLIN' | 'TRANSFERENCIA' | 'ONLINE_SIMULADO' | 'CREDITO';
export type TipoComprobante = 'RECIBO' | 'BOLETA';

export const MEDIOS_PAGO: MedioPago[] = ['EFECTIVO', 'TARJETA', 'YAPE_PLIN', 'TRANSFERENCIA'];

export interface Cuota {
  id: number;
  matriculaId: number;
  alumnoId: number;
  anioId: number;
  conceptoId: number;
  conceptoNombre: string;
  conceptoTipo: string;
  descripcion: string;
  numeroCuota: number;
  montoBase: number;
  descuento: number;
  mora: number;
  montoTotal: number;
  saldo: number;
  fechaVencimiento: string;
  estado: EstadoCuota;
  diasAtraso: number;
  avisoEnviado: boolean;
}

/** La orden de pago de lo que falta de la matrícula: el servidor calcula el monto, la persona no lo elige. */
export interface OrdenPago {
  codigo: string;
  monto: number;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA' | 'EXPIRADA';
  expiraEn: string;
}

/** La última solicitud de descuento de la matrícula: en revisión, aprobada o rechazada (con su motivo). */
export interface SolicitudDescuentoEstado {
  id: number;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
  descuentoNombre: string;
  tipo: 'PORCENTAJE' | 'MONTO_FIJO';
  valor: number;
  motivo: string;
  motivoResolucion?: string | null;
}

/** Un descuento que se puede pedir para la matrícula. */
export interface OpcionDescuento {
  id: number;
  nombre: string;
  tipo: 'PORCENTAJE' | 'MONTO_FIJO';
  valor: number;
}

/** Lo que se envía al pedir un descuento. */
export interface PedidoDescuento {
  descuentoId: number;
  motivo: string;
  hermanoAlumnoId?: number | null;
}

/** Una solicitud de descuento tal como la ve la secretaría: con el hermano y lo que costaría la matrícula con el descuento. */
export interface SolicitudDescuento {
  id: number;
  alumnoId: number;
  alumnoNombre?: string | null;
  matriculaId: number;
  descuentoNombre: string;
  tipo: 'PORCENTAJE' | 'MONTO_FIJO';
  valor: number;
  motivo: string;
  hermanoAlumnoId?: number | null;
  hermanoNombre?: string | null;
  /** Lo verifica el sistema: ¿ese hermano está matriculado este año? */
  hermanoMatriculado?: boolean | null;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
  motivoResolucion?: string | null;
  solicitadaEn: string;
  matriculaImporte?: number | null;
  matriculaConDescuento?: number | null;
  /** PUBLICA: la pidió la familia desde la matrícula en línea, con documentos del hermano que la secretaría debe revisar. */
  origen?: 'INTERNA' | 'PUBLICA';
  /** Documento del hermano tal como lo declaró la familia (compáralo con los archivos). */
  hermanoDocumento?: string | null;
}

/** Cuánto falta de la matrícula, el crédito del alumno y si ya se puede generar (lo decide el servidor). */
/** De qué es la matrícula (grado, sección, turno) y la forma de pago de las pensiones acordada, con su descuento. */
export interface DetalleMatriculaPago {
  grado?: string | null;
  seccion?: string | null;
  turno?: string | null;
  planPago: string;
  planEtiqueta: string;
  planDescuento: number;
}

export interface EstadoMatriculaPago {
  alumnoId: number;
  matriculaId: number;
  estadoMatricula: string;
  cuotaId?: number | null;
  importe?: number | null;
  descuento?: number | null;
  total?: number | null;
  saldo: number;
  credito: number;
  faltante: number;
  pagada: boolean;
  puedeGenerar: boolean;
  motivo?: string | null;
  ordenVigente?: OrdenPago | null;
  depositos: MovimientoCredito[];
  solicitudDescuento?: SolicitudDescuentoEstado | null;
  detalle?: DetalleMatriculaPago | null;
}

export type MedioPasarela = 'TARJETA' | 'YAPE_PLIN' | 'TRANSFERENCIA';

/** Lo que se escribe en la pantalla de la pasarela simulada. */
export interface DatosPasarela {
  medio: MedioPasarela;
  tarjetaNumero?: string;
  vencimiento?: string;
  cvv?: string;
  celular?: string;
  banco?: string;
  titular?: string;
}

/** Lo que devuelve la pasarela: aprobado o no, con su número de operación. */
export interface ResultadoPasarela {
  aprobada: boolean;
  transaccionId?: string | null;
  mensaje: string;
  medio: string;
  detalle?: string | null;
  monto: number;
  fecha: string;
  orden: string;
  estado: EstadoMatriculaPago;
}

/** Un alumno con pre-matrícula que aún debe la matrícula (lo que Caja necesita cobrar). */
export interface MatriculaPorPagar {
  alumnoId: number;
  alumnoNombre: string;
  matriculaId: number;
  saldo: number;
  credito: number;
  faltante: number;
  descuentoEnRevision?: boolean;
  detalle?: DetalleMatriculaPago | null;
}

/** Un descuento asignado a un alumno (p. ej. «Hermanos · 5 %»). */
export interface DescuentoDelAlumno {
  id: number;
  nombre: string;
  tipo: 'PORCENTAJE' | 'MONTO_FIJO';
  valor: number;
  aplicaA: string;
  anioId: number;
  motivo?: string | null;
}

export interface EstadoCuenta {
  alumnoId: number;
  alumnoNombre: string;
  responsableNombre: string;
  totalCobrado: number;
  totalPendiente: number;
  totalVencido: number;
  /** El crédito (saldo a favor) del alumno: lo depositado que aún no se cobró de sus cuotas. */
  credito?: number;
  cuotas: Cuota[];
}

export type TipoMovimientoCredito = 'DEPOSITO' | 'COBRO_CUOTA' | 'REVERSION' | 'ANULACION';

/** Una línea del libro del crédito: `signo` +1 si suma al crédito y -1 si resta. */
export interface MovimientoCredito {
  id: number;
  tipo: TipoMovimientoCredito;
  signo: 1 | -1;
  monto: number;
  saldoDespues: number;
  medio?: string | null;
  referencia?: string | null;
  cuotaId?: number | null;
  pagoId?: number | null;
  anulado: boolean;
  detalle?: string | null;
  registradoPor?: number | null;
  creadoEn: string;
}

/** El crédito de un alumno: lo que ya toca cobrar (`exigible`), lo que el crédito no cubre (`faltante`) y lo que sobraría (`sobrante`). */
export interface CreditoAlumno {
  alumnoId: number;
  saldo: number;
  exigible: number;
  faltante: number;
  sobrante: number;
  movimientos: MovimientoCredito[];
}

export interface ResultadoCredito {
  saldo: number;
  aplicado: number;
  pagoId?: number | null;
  cuotaIds: number[];
}

export interface DepositoCredito {
  monto: number;
  medio: Exclude<MedioPago, 'ONLINE_SIMULADO' | 'CREDITO'>;
  referencia?: string;
  idempotencyKey?: string;
}

export interface Comprobante {
  id: number;
  pagoId: number;
  tipo: TipoComprobante;
  serie: string;
  numero: number;
  numeroCompleto: string;
  total: number;
  estado: 'EMITIDO' | 'ANULADO';
  rutaPdf?: string;
  emitidoEn: string;
}

export interface PagoDetalle {
  id: number;
  cuotaId: number;
  cuotaDescripcion: string;
  montoAplicado: number;
  nuevoSaldoCuota: number;
  nuevoEstadoCuota: string;
}

export interface Pago {
  id: number;
  alumnoId: number;
  pagadorNombre?: string;
  pagadorDocumento?: string;
  montoTotal: number;
  medio: MedioPago;
  referencia?: string;
  /** PENDIENTE y RECHAZADO: pago de un apoderado por aprobar en caja, o rechazado con motivo. */
  estado: 'CONFIRMADO' | 'ANULADO' | 'PENDIENTE' | 'RECHAZADO';
  cajaSesionId?: number;
  registradoPor?: number;
  pagadoEn: string;
  aprobadoEn?: string;
  motivoRechazo?: string;
  idempotencyKey: string;
  comprobante?: Comprobante;
  detalles: PagoDetalle[];
}

export interface RegistrarPago {
  alumnoId: number;
  pagadorNombre?: string;
  pagadorDocumento?: string;
  montoTotal: number;
  medio: MedioPago;
  referencia?: string;
  idempotencyKey: string;
  tipoComprobante?: TipoComprobante;
  detalles: { cuotaId: number; montoAplicado: number }[];
}

export interface Caja {
  id: number;
  cajeroUsuarioId: number;
  aperturaEn: string;
  montoApertura: number;
  cierreEn?: string;
  montoCierreDeclarado?: number;
  montoCierreSistema?: number;
  diferencia?: number;
  estado: 'ABIERTA' | 'CERRADA';
}

export interface CierreCaja {
  cajaId: number;
  cajeroUsuarioId: number;
  aperturaEn: string;
  cierreEn?: string;
  montoApertura: number;
  cobrosEfectivo: number;
  cobrosOtrosMedios: number;
  totalCobrado: number;
  efectivoEsperado: number;
  montoDeclarado?: number;
  diferencia?: number;
  totalesPorMedio: Record<string, number>;
}

export interface FiltroCuotas {
  estado?: EstadoCuota | '';
  alumnoId?: number;
  seccionId?: number;
  vencimiento?: string;
  page?: number;
  size?: number;
}
