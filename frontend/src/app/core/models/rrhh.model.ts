/** Contratos y pagos del personal (solo los ve el administrador). */
export type TipoContrato = 'PLAZO_FIJO' | 'INDEFINIDO' | 'POR_HORAS' | 'LOCACION';
export type EstadoContrato = 'VIGENTE' | 'POR_VENCER' | 'VENCIDO' | 'RESCINDIDO' | 'POR_INICIAR';
export type ConceptoPago = 'SUELDO' | 'BONO' | 'DESCUENTO' | 'ADELANTO' | 'OTRO';

export interface Contrato {
  id: number;
  personalId: number;
  personalNombre: string;
  areaNombre?: string;
  tipo: TipoContrato;
  cargo?: string;
  fechaInicio: string;
  fechaFin?: string;
  remuneracion: number;
  estado: 'VIGENTE' | 'RESCINDIDO';
  estadoEfectivo: EstadoContrato;
  fechaRescision?: string;
  motivoRescision?: string;
  observaciones?: string;
}

export interface ContratoRequest {
  personalId: number;
  tipo: TipoContrato;
  cargo?: string;
  fechaInicio: string;
  fechaFin?: string;
  remuneracion: number;
  observaciones?: string;
}

/** Renovación: el inicio lo pone el servidor (día siguiente al fin del contrato anterior). Lo que no se indique se hereda. */
export interface RenovarRequest {
  tipo?: TipoContrato;
  cargo?: string;
  fechaFin?: string;
  remuneracion?: number;
  observaciones?: string;
}

export type TipoCuenta = 'AHORROS' | 'CORRIENTE' | 'SUELDO' | 'BILLETERA';

/** Cuenta donde se le deposita el pago a una persona. */
export interface CuentaDeposito {
  id: number;
  personalId: number;
  personalNombre: string;
  banco: string;
  tipo: TipoCuenta;
  numero: string;
  cci?: string;
  titular: string;
  principal: boolean;
}

export interface CuentaRequest {
  personalId: number;
  banco: string;
  tipo: TipoCuenta;
  numero: string;
  cci?: string;
  titular: string;
  principal?: boolean;
}

export interface PagoPersonal {
  id: number;
  personalId: number;
  personalNombre: string;
  areaNombre?: string;
  contratoId?: number;
  /** AAAA-MM */
  periodo: string;
  concepto: ConceptoPago;
  descripcion?: string;
  monto: number;
  /** Negativo si es descuento o adelanto. */
  montoFirmado: number;
  estado: 'PENDIENTE' | 'PAGADO';
  fechaPago?: string;
  medio?: string;
  referencia?: string;
}

export interface PagoRequest {
  personalId: number;
  contratoId?: number;
  periodo: string;
  concepto: ConceptoPago;
  descripcion?: string;
  monto: number;
}

export interface PagarRequest {
  fechaPago?: string;
  medio?: string;
  referencia?: string;
}

export interface PlanillaGenerada {
  periodo: string;
  creados: number;
  yaExistian: number;
}
