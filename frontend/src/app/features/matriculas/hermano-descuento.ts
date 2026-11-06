import { Vinculo } from '../../core/models/alumno.model';
import { Situacion } from '../alumnos/matricula-alumno';

/** Lo que la secretaría revisa del hermano antes de pedir el descuento. */
export interface VerificacionHermano {
  /** ¿Es otro alumno distinto del que se matricula? */
  distinto: boolean;
  /** ¿Consta matriculado (confirmado) este año? Es la condición para dar el descuento. */
  matriculado: boolean;
  /** ¿Comparten al menos un apoderado (mismo documento)? Es una pista, no una exigencia: pueden ser hermanos con distinto apoderado. */
  mismoApoderado: boolean;
}

/** ¿Los dos alumnos comparten algún apoderado? Se compara por tipo y número de documento. */
export function comparteApoderado(a: readonly Vinculo[], b: readonly Vinculo[]): boolean {
  const clave = (v: Vinculo) => `${(v.apoderado.tipoDocumento ?? 'DNI').toUpperCase()}:${v.apoderado.numeroDocumento.trim().toUpperCase()}`;
  const mios = new Set(a.map(clave));
  return b.some(v => mios.has(clave(v)));
}

export function verificarHermano(alumnoId: number, hermanoId: number, situacionHermano: Situacion, vinculosAlumno: readonly Vinculo[], vinculosHermano: readonly Vinculo[]): VerificacionHermano {
  return {
    distinto: alumnoId !== hermanoId,
    matriculado: situacionHermano === 'MATRICULADO',
    mismoApoderado: comparteApoderado(vinculosAlumno, vinculosHermano)
  };
}

/** El motivo que se envía a la solicitud: queda registrado para quien apruebe y para la familia. */
export function motivoHermano(hermanoNombre: string, hermanoDocumento: string, mismoApoderado: boolean): string {
  const base = `Hermano matriculado: ${hermanoNombre} (documento ${hermanoDocumento}), verificado por secretaría`;
  return mismoApoderado ? `${base}; comparten apoderado.` : `${base}.`;
}

/** ¿Se puede pedir el descuento? Hace falta un hermano distinto y matriculado, un descuento elegido y que la secretaría confirme los datos. */
export function puedePedirDescuento(v: VerificacionHermano | null, descuentoId: number, confirmado: boolean): boolean {
  return !!v && v.distinto && v.matriculado && descuentoId > 0 && confirmado;
}
