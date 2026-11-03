/** Asistencia diaria del personal del colegio. */
export type EstadoAsistenciaPersonal = 'PRESENTE' | 'TARDANZA' | 'FALTA' | 'JUSTIFICADA' | 'PERMISO';

export interface AsistenciaPersonal {
  id: number;
  personalId: number;
  personalNombre: string;
  areaNombre?: string;
  /** AAAA-MM-DD */
  fecha: string;
  estado: EstadoAsistenciaPersonal;
  /** HH:mm o HH:mm:ss */
  horaEntrada?: string;
  horaSalida?: string;
  observacion?: string;
}

/** Estado vacío = dejar el día sin marcar. */
export interface MarcaAsistencia {
  personalId: number;
  estado: EstadoAsistenciaPersonal | '';
  horaEntrada?: string;
  horaSalida?: string;
  observacion?: string;
}

export interface ResultadoDiaAsistencia {
  fecha: string;
  guardadas: number;
  borradas: number;
}
