import { SolicitudDescuento } from '../../core/models/cobro.model';

/** Lo que dice el panel de la secretaría de un pedido de descuento por hermano hecho desde la web pública. */
export type SituacionHermano = 'NO_ENCONTRADO' | 'NO_MATRICULADO' | 'LISTO';

/**
 * El hermano se busca por el documento que escribió la familia. Solo se puede confirmar el descuento si ese documento es de un alumno del colegio
 * que consta matriculado este año; si no existe o no está matriculado, lo que corresponde es rechazar (con el motivo).
 */
export function situacionHermano(s: Pick<SolicitudDescuento, 'hermanoAlumnoId' | 'hermanoMatriculado'>): SituacionHermano {
  if (!s.hermanoAlumnoId) return 'NO_ENCONTRADO';
  return s.hermanoMatriculado ? 'LISTO' : 'NO_MATRICULADO';
}

/** Un pedido de la web pública se confirma cuando el hermano está encontrado y matriculado y la secretaría marcó que confirmó el parentesco. */
export function puedeConfirmarHermano(s: Pick<SolicitudDescuento, 'origen' | 'hermanoAlumnoId' | 'hermanoMatriculado'>, parentescoConfirmado: boolean): boolean {
  if (s.origen !== 'PUBLICA') return true;   // los demás pedidos se aprueban directo, como siempre
  return situacionHermano(s) === 'LISTO' && parentescoConfirmado;
}

export const TEXTO_SITUACION_HERMANO: Record<SituacionHermano, string> = {
  NO_ENCONTRADO: 'No hay ningún alumno del colegio con ese documento.',
  NO_MATRICULADO: 'El alumno existe, pero no consta matriculado este año.',
  LISTO: 'Consta matriculado este año.'
};
