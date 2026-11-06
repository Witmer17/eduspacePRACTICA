import { PlanPago } from './matricula.model';

/** Matrícula en línea del sitio público (API sin sesión de matricula-ms). */
export interface PensionOferta { total: number; cuotas: number; mensual: number }
export interface GradoOferta { id: number; nombre: string; vacantes: number; matricula: number | null; pension: PensionOferta | null }
export interface NivelOferta { id: number; nombre: string; grados: GradoOferta[] }
/** Una forma de pago de las pensiones con su descuento (semestral 5 %, anual 10 %: lo manda el servidor). */
export interface PlanOferta { id: PlanPago; etiqueta: string; descuentoPorcentaje: number }
/** Un descuento que se puede pedir por tener un hermano matriculado (lo confirma la secretaría). */
export interface DescuentoHermanoOferta { id: number; nombre: string; tipo: 'PORCENTAJE' | 'MONTO_FIJO'; valor: number }
export interface OfertaMatricula {
  anioId: number; anio: string; abierta: boolean; mensaje: string | null; niveles: NivelOferta[]; planes?: PlanOferta[];
  /** Vacío si el colegio no ofrece descuento por hermano: entonces la opción no se muestra. */
  descuentosHermano?: DescuentoHermanoOferta[];
}

/** El hermano por el que se pide descuento: solo su documento. La secretaría lo busca y confirma el parentesco. */
export interface HermanoSolicitud { numeroDocumento: string }

/**
 * Cómo va el descuento por hermano: EN_REVISION (la secretaría confirma el parentesco: aún no se puede pagar), APROBADO (se paga el monto ya
 * descontado) o RECHAZADO (se paga completo; `motivo` dice por qué). `documento` es el que escribió la familia.
 */
export interface HermanoEstado {
  estado: 'EN_REVISION' | 'APROBADO' | 'RECHAZADO';
  descuento: string | null; motivo: string | null; documento: string | null;
}

export interface SolicitudMatricula {
  gradoId: number;
  alumno: {
    tipoDocumento: string; numeroDocumento: string; nombres: string; apellidoPaterno: string; apellidoMaterno: string;
    fechaNacimiento: string; sexo: string;
    /** Opcionales: si la familia los escribe, quedan en el expediente del alumno. */
    direccion?: string | null; distrito?: string | null; colegioProcedencia?: string | null; email?: string | null;
  };
  apoderado: {
    tipoDocumento: string; numeroDocumento: string; nombres: string; apellidos: string; telefono: string; email: string | null; parentesco: string;
  };
  acepto: boolean;
  /** Campo trampa anti-robots: siempre vacío. */
  sitio: string;
  /** Código de descuento (opcional): el servidor lo valida y lo asigna al alumno antes de generar las cuotas. */
  codigoDescuento?: string | null;
  /** Forma de pago de las pensiones que acuerda la familia (sin dato es mensual). */
  planPago?: PlanPago;
  /** Hermano matriculado por el que se pide descuento (opcional): hasta que la secretaría lo confirme no se puede pagar. */
  hermano?: HermanoSolicitud | null;
}

/** Un descuento por código, como lo ve la familia antes de pagar. */
export interface DescuentoVista { codigo: string; nombre: string; tipo: 'PORCENTAJE' | 'MONTO_FIJO'; valor: number; aplicaA: 'MATRICULA' | 'PENSION' | 'TODO' }

export interface InicioMatricula {
  referencia: string; token: string; codigo: string; alumno: string; grado: string; seccion: string; turno: string;
  montoMatricula: number; vencePago: string | null;
  /** La matrícula sin descuento y lo descontado (lo que se paga es la base menos el descuento). */
  montoBase?: number; descuento?: number;
}

export interface Tarjeta { numero: string; titular: string; vencimiento: string; cvv: string }

export interface PensionResumen { descripcion: string; vence: string; monto: number }
export interface ClaseResumen { dia: string; hora: string; curso: string; docente: string }

export interface ResumenMatricula {
  /** INICIADA → PAGADA (en revisión) → APROBADA | RECHAZADA */
  estado: 'INICIADA' | 'PAGADA' | 'APROBADA' | 'RECHAZADA';
  referencia: string; codigo: string; alumno: string; alumnoDocumento: string; apoderado: string; grado: string; seccion: string; turno: string;
  montoMatricula: number | null; comprobante: string | null; pagadoEn: string | null;
  pensiones: PensionResumen[]; totalPensiones: number; horario: ClaseResumen[];
  usuarioAlumno: string | null; usuarioApoderado: string | null;
  correo: 'ENVIADO' | 'OMITIDO' | 'ERROR' | null; correoDestino: string | null; mensajeCuentas: string | null;
  /** Solo si la familia pidió descuento por hermano. */
  descuentoHermano?: HermanoEstado | null;
}
