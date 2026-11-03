/** Reparto del dinero de caja entre las áreas de trabajo (solo administrador). */
export interface AreaAsignada {
  areaId: number;
  asignado: number;
}

export interface FondoResumen {
  /** Todo lo cobrado y no anulado. */
  totalCobrado: number;
  /** Lo repartido entre las áreas (ya no está en caja). */
  totalAsignado: number;
  /** Lo que queda en caja: cobrado − asignado. Puede ser negativo si se anulan pagos después de repartir. */
  disponible: number;
  areas: AreaAsignada[];
}

export interface MovimientoFondo {
  id: number;
  areaId: number;
  /** Positivo: salió de caja hacia el área. Negativo: volvió a caja. */
  monto: number;
  /** Total del área después de este movimiento. */
  saldoArea: number;
  motivo?: string;
  creadoPor?: number;
  creadoEn: string;
}
