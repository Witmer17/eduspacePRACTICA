import { DOCUMENTOS_REQUERIDOS, Documento, TipoDocumento } from '../../core/models/alumno.model';

/** Los pasos del asistente de matrícula, en orden. */
export type PasoMatricula = 'alumno' | 'familia' | 'documentos' | 'seccion' | 'confirmar';

export const PASOS_MATRICULA: { id: PasoMatricula; titulo: string; ayuda: string }[] = [
  { id: 'alumno', titulo: 'Alumno', ayuda: 'Busca al alumno o regístralo' },
  { id: 'familia', titulo: 'Familia', ayuda: 'Su apoderado y responsable de pago' },
  { id: 'documentos', titulo: 'Documentos', ayuda: 'DNI, partida y ficha SIAGIE' },
  { id: 'seccion', titulo: 'Grado y sección', ayuda: 'Elige dónde estudiará' },
  { id: 'confirmar', titulo: 'Confirmar', ayuda: 'Revisa y matricula' }
];

export const indicePaso = (p: PasoMatricula): number => PASOS_MATRICULA.findIndex(x => x.id === p);
export const siguientePaso = (p: PasoMatricula): PasoMatricula => PASOS_MATRICULA[Math.min(indicePaso(p) + 1, PASOS_MATRICULA.length - 1)].id;
export const pasoAnterior = (p: PasoMatricula): PasoMatricula => PASOS_MATRICULA[Math.max(indicePaso(p) - 1, 0)].id;

export type EstadoDocumento = 'verificado' | 'sin-verificar' | 'falta';

export interface FilaDocumento {
  tipo: TipoDocumento;
  estado: EstadoDocumento;
  /** El documento subido (el más reciente de ese tipo), si lo hay. */
  documento?: Documento;
}

/** Los documentos que la matrícula exige, cada uno con su estado: verificado, subido sin verificar o que falta. Si hay varios del mismo tipo vale el mejor. */
export function estadoDelExpediente(docs: readonly Documento[]): FilaDocumento[] {
  return DOCUMENTOS_REQUERIDOS.map(tipo => {
    const delTipo = docs.filter(d => d.tipo === tipo);
    const verificado = delTipo.find(d => d.verificado);
    const documento = verificado ?? [...delTipo].sort((a, b) => b.subidoEn.localeCompare(a.subidoEn))[0];
    return { tipo, documento, estado: verificado ? 'verificado' : documento ? 'sin-verificar' : 'falta' } satisfies FilaDocumento;
  });
}

/** El servidor rechaza la matrícula si falta algún documento requerido o no está verificado. */
export const expedienteCompleto = (docs: readonly Documento[]): boolean => estadoDelExpediente(docs).every(f => f.estado === 'verificado');

export const ETIQUETA_DOCUMENTO: Record<TipoDocumento, string> = {
  DNI: 'DNI del alumno', PARTIDA_NACIMIENTO: 'Partida de nacimiento', FICHA_SIAGIE: 'Ficha SIAGIE',
  CERTIFICADO_ESTUDIOS: 'Certificado de estudios', CARNET_VACUNACION: 'Carnet de vacunación', FOTO: 'Foto', OTRO: 'Otro documento'
};

/** ¿Se puede avanzar desde este paso? Devuelve el motivo si no. */
export function puedeAvanzar(paso: PasoMatricula, e: {
  alumnoListo: boolean; motivoBloqueo?: string; familiaLista: boolean; expediente: boolean; seccionElegida: boolean;
}): { puede: boolean; motivo?: string } {
  switch (paso) {
    case 'alumno':
      return e.alumnoListo ? { puede: true } : { puede: false, motivo: e.motivoBloqueo ?? 'Elige al alumno o completa sus datos.' };
    case 'familia':
      return e.familiaLista ? { puede: true } : { puede: false, motivo: 'Falta el apoderado: completa sus datos o elige uno ya registrado.' };
    case 'documentos':
      return e.expediente ? { puede: true } : { puede: false, motivo: 'Faltan documentos por subir o verificar: sin ellos la matrícula no se acepta.' };
    case 'seccion':
      return e.seccionElegida ? { puede: true } : { puede: false, motivo: 'Elige la sección (las llenas no se pueden elegir).' };
    default:
      return { puede: true };
  }
}
