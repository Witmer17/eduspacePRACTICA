# 📘 CÓDIGO COMPLETO FRONTEND — VISTAS Y SERVICIOS (WITMER)

> **Módulos:** Ventanilla de Caja, Pagos Familiares, Registro Auxiliar de Notas Docente, Exámenes Docente, Rendición de Exámenes Alumno y Boletines de Calificaciones.  
> **Total de archivos incluidos:** 52 archivos (TypeScript y plantillas HTML completas).

---

## 📑 Índice de Archivos Frontend


### Modelos e Interfaces Core

- [1. calificacion.model.ts](#1-calificacionmodelts) (`frontend/src/app/core/models/calificacion.model.ts`)
- [2. cobro.model.ts](#2-cobromodelts) (`frontend/src/app/core/models/cobro.model.ts`)
- [3. examen.model.ts](#3-examenmodelts) (`frontend/src/app/core/models/examen.model.ts`)
- [4. pago.model.ts](#4-pagomodelts) (`frontend/src/app/core/models/pago.model.ts`)

### Servicios HTTP Core

- [5. calificacion.service.ts](#5-calificacionservicets) (`frontend/src/app/core/services/calificacion.service.ts`)
- [6. cobro.service.ts](#6-cobroservicets) (`frontend/src/app/core/services/cobro.service.ts`)
- [7. examen.service.ts](#7-examenservicets) (`frontend/src/app/core/services/examen.service.ts`)
- [8. pago-config.service.ts](#8-pago-configservicets) (`frontend/src/app/core/services/pago-config.service.ts`)
- [9. pago-personal.service.ts](#9-pago-personalservicets) (`frontend/src/app/core/services/pago-personal.service.ts`)

### Feature Ventanilla de Caja

- [10. caja-personal.component.ts](#10-caja-personalcomponentts) (`frontend/src/app/features/caja/caja-personal.component.ts`)
- [11. caja.component.html](#11-cajacomponenthtml) (`frontend/src/app/features/caja/caja.component.html`)
- [12. caja.component.ts](#12-cajacomponentts) (`frontend/src/app/features/caja/caja.component.ts`)
- [13. monto-sugerido.ts](#13-monto-sugeridots) (`frontend/src/app/features/caja/monto-sugerido.ts`)
- [14. recibo.ts](#14-recibots) (`frontend/src/app/features/caja/recibo.ts`)

### Feature Portal Familia - Pagos

- [15. familia-pagos.component.html](#15-familia-pagoscomponenthtml) (`frontend/src/app/features/familia/pagos/familia-pagos.component.html`)
- [16. familia-pagos.component.ts](#16-familia-pagoscomponentts) (`frontend/src/app/features/familia/pagos/familia-pagos.component.ts`)
- [17. matricula-pago.component.ts](#17-matricula-pagocomponentts) (`frontend/src/app/features/familia/pagos/matricula-pago.component.ts`)
- [18. pasarela.ts](#18-pasarelats) (`frontend/src/app/features/familia/pagos/pasarela.ts`)

### Feature Registro Auxiliar - Notas Docente

- [19. docente-notas.component.html](#19-docente-notascomponenthtml) (`frontend/src/app/features/docente/notas/docente-notas.component.html`)
- [20. docente-notas.component.ts](#20-docente-notascomponentts) (`frontend/src/app/features/docente/notas/docente-notas.component.ts`)

### Feature Exámenes Docente y Banco

- [21. docente-banco.component.html](#21-docente-bancocomponenthtml) (`frontend/src/app/features/docente/examenes/docente-banco.component.html`)
- [22. docente-banco.component.ts](#22-docente-bancocomponentts) (`frontend/src/app/features/docente/examenes/docente-banco.component.ts`)
- [23. docente-examenes.component.html](#23-docente-examenescomponenthtml) (`frontend/src/app/features/docente/examenes/docente-examenes.component.html`)
- [24. docente-examenes.component.ts](#24-docente-examenescomponentts) (`frontend/src/app/features/docente/examenes/docente-examenes.component.ts`)

### Feature Rendir Examen - Estudiante

- [25. familia-examenes.component.html](#25-familia-examenescomponenthtml) (`frontend/src/app/features/familia/examenes/familia-examenes.component.html`)
- [26. familia-examenes.component.ts](#26-familia-examenescomponentts) (`frontend/src/app/features/familia/examenes/familia-examenes.component.ts`)
- [27. rendir-examen.component.html](#27-rendir-examencomponenthtml) (`frontend/src/app/features/familia/examenes/rendir-examen.component.html`)
- [28. rendir-examen.component.ts](#28-rendir-examencomponentts) (`frontend/src/app/features/familia/examenes/rendir-examen.component.ts`)

### Feature Calificaciones, Cierre y Boletines

- [29. boletines.component.html](#29-boletinescomponenthtml) (`frontend/src/app/features/calificaciones/boletines/boletines.component.html`)
- [30. boletines.component.ts](#30-boletinescomponentts) (`frontend/src/app/features/calificaciones/boletines/boletines.component.ts`)
- [31. cierre.component.html](#31-cierrecomponenthtml) (`frontend/src/app/features/calificaciones/cierre/cierre.component.html`)
- [32. cierre.component.ts](#32-cierrecomponentts) (`frontend/src/app/features/calificaciones/cierre/cierre.component.ts`)
- [33. libreta-vista.component.html](#33-libreta-vistacomponenthtml) (`frontend/src/app/features/calificaciones/libreta-vista/libreta-vista.component.html`)
- [34. libreta-vista.component.ts](#34-libreta-vistacomponentts) (`frontend/src/app/features/calificaciones/libreta-vista/libreta-vista.component.ts`)

### Feature Gestión Administrativa de Cobranza

- [35. cobranza.component.html](#35-cobranzacomponenthtml) (`frontend/src/app/features/pagos/cobranza/cobranza.component.html`)
- [36. cobranza.component.ts](#36-cobranzacomponentts) (`frontend/src/app/features/pagos/cobranza/cobranza.component.ts`)
- [37. conceptos.component.html](#37-conceptoscomponenthtml) (`frontend/src/app/features/pagos/conceptos/conceptos.component.html`)
- [38. conceptos.component.ts](#38-conceptoscomponentts) (`frontend/src/app/features/pagos/conceptos/conceptos.component.ts`)
- [39. credito.ts](#39-creditots) (`frontend/src/app/features/pagos/cuentas/credito.ts`)
- [40. cuentas.component.html](#40-cuentascomponenthtml) (`frontend/src/app/features/pagos/cuentas/cuentas.component.html`)
- [41. cuentas.component.ts](#41-cuentascomponentts) (`frontend/src/app/features/pagos/cuentas/cuentas.component.ts`)
- [42. descuentos.component.html](#42-descuentoscomponenthtml) (`frontend/src/app/features/pagos/descuentos/descuentos.component.html`)
- [43. descuentos.component.ts](#43-descuentoscomponentts) (`frontend/src/app/features/pagos/descuentos/descuentos.component.ts`)
- [44. morosos.component.html](#44-morososcomponenthtml) (`frontend/src/app/features/pagos/morosos/morosos.component.html`)
- [45. morosos.component.ts](#45-morososcomponentts) (`frontend/src/app/features/pagos/morosos/morosos.component.ts`)
- [46. tarifas.component.html](#46-tarifascomponenthtml) (`frontend/src/app/features/pagos/tarifas/tarifas.component.html`)
- [47. tarifas.component.ts](#47-tarifascomponentts) (`frontend/src/app/features/pagos/tarifas/tarifas.component.ts`)

### Otros Componentes Frontend

- [48. familia-boletines.component.ts](#48-familia-boletinescomponentts) (`frontend/src/app/features/familia/boletines/familia-boletines.component.ts`)
- [49. familia-notas.component.ts](#49-familia-notascomponentts) (`frontend/src/app/features/familia/notas/familia-notas.component.ts`)
- [50. pago-personal.component.ts](#50-pago-personalcomponentts) (`frontend/src/app/features/personal/pago-personal.component.ts`)
- [51. pagos-por-aprobar.component.ts](#51-pagos-por-aprobarcomponentts) (`frontend/src/app/features/personal/pagos-por-aprobar.component.ts`)
- [52. plan-pago.ts](#52-plan-pagots) (`frontend/src/app/features/matriculas/plan-pago.ts`)

---

<a id="1-calificacionmodelts"></a>
## 1. `calificacion.model.ts` — Modelos e Interfaces Core

**Ruta del archivo:** `frontend/src/app/core/models/calificacion.model.ts`

### **¿Qué hace este archivo?**
Modelos e interfaces TypeScript para calificaciones escolares: Criterio, Nota, Promedio, EscalaLiteral, CierrePeriodo y Boletín.

```typescript
export type OrigenCriterio = 'MANUAL' | 'TAREAS' | 'EXAMENES';
export type EstadoCierre = 'ABIERTO' | 'CERRADO' | 'REABIERTO';

export interface Criterio {
  id: number;
  anioId: number;
  periodoId: number;
  seccionId: number;
  cursoId: number;
  nombre: string;
  peso: number;
  origenTipo: OrigenCriterio;
  creadoPor?: number;
  creadoEn?: string;
}
export interface CriterioRequest {
  anioId: number;
  periodoId: number;
  seccionId: number;
  cursoId: number;
  nombre: string;
  peso: number;
  origenTipo: OrigenCriterio;
}

export interface ValidarPesos {
  periodoId: number;
  seccionId: number;
  cursoId: number;
  sumaPesos: number;
  esValido: boolean;
  mensaje: string;
  criterios: Criterio[];
}

export interface FilaRegistro {
  matriculaId: number;
  alumnoId: number;
  alumnoNombre: string;
  notasPorCriterioId: Record<string, number | null>;
  promedio?: number;
  literal?: string;
}
export interface RegistroNotas {
  seccionId: number;
  cursoId: number;
  periodoId: number;
  estadoPeriodo: string;
  criterios: Criterio[];
  alumnos: FilaRegistro[];
}

export interface NotaItem {
  matriculaId: number;
  alumnoId: number;
  valor: number;
}
export interface NotasLote {
  seccionId: number;
  cursoId: number;
  periodoId: number;
  criterioId: number;
  notas: NotaItem[];
}

export interface NotaPendiente {
  id: string;
  origen: 'TAREA' | 'EXAMEN';
  origenId: number;
  titulo: string;
  alumnoId: number;
  matriculaId: number;
  seccionId: number;
  cursoId: number;
  periodoId: number;
  valor: number;
  fechaEvento: string;
  motivo?: string;
}

export interface Promedio {
  id: number;
  matriculaId: number;
  alumnoId: number;
  alumnoNombre: string;
  seccionId: number;
  cursoId: number;
  periodoId: number;
  promedio: number;
  literal: string;
  estado: 'BORRADOR' | 'CERRADO';
  calculadoEn: string;
}

export interface CierrePeriodo {
  id: number;
  seccionId: number;
  periodoId: number;
  estado: EstadoCierre;
  cerradoPor?: number;
  cerradoEn?: string;
  reabiertoPor?: number;
  reabiertoEn?: string;
  motivoReapertura?: string;
}

export interface Boletin {
  id: number;
  matriculaId: number;
  alumnoId: number;
  periodoId: number;
  version: number;
  estado: 'VIGENTE' | 'ANULADO';
  rutaPdf?: string;
  urlDescarga?: string;
  generadoPor?: number;
  generadoEn: string;
}

export interface ResultadoAnual {
  id: number;
  matriculaId: number;
  alumnoId: number;
  anioId: number;
  cursoId: number;
  promedioFinal: number;
  literal: string;
  estado: 'APROBADO' | 'DESAPROBADO' | 'RECUPERACION';
  calculadoEn: string;
}

export interface PeriodoNota {
  periodoId: number;
  promedio: number;
  literal: string;
  estado: string;
}
export interface CursoLibreta {
  cursoId: number;
  cursoNombre: string;
  notasPorPeriodo: Record<string, PeriodoNota>;
  promedioFinal?: number;
  literalFinal?: string;
  estadoFinal?: string;
}
export interface Libreta {
  alumnoId: number;
  alumnoNombre: string;
  matriculaId: number;
  anioId: number;
  nivelId: number;
  gradoId: number;
  seccionId: number;
  cursos: CursoLibreta[];
  resultadosAnuales: ResultadoAnual[];
  boletines: Boletin[];
}

export interface GenerarBoletin {
  seccionId?: number;
  periodoId?: number;
  alumnoId?: number;
  anioId?: number;
}
```

---

<a id="2-cobromodelts"></a>
## 2. `cobro.model.ts` — Modelos e Interfaces Core

**Ruta del archivo:** `frontend/src/app/core/models/cobro.model.ts`

### **¿Qué hace este archivo?**
Modelos e interfaces TypeScript para transacciones de cobro: Pago, Cuota, CajaSesion, Comprobante, Medios de Pago y Estado de Cuenta.

```typescript
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
```

---

<a id="3-examenmodelts"></a>
## 3. `examen.model.ts` — Modelos e Interfaces Core

**Ruta del archivo:** `frontend/src/app/core/models/examen.model.ts`

### **¿Qué hace este archivo?**
Modelos e interfaces TypeScript para el módulo de evaluaciones: Examen, Pregunta, Opcion, Intento, Respuestas y Resultados.

```typescript
export type TipoPregunta = 'OPCION_UNICA' | 'OPCION_MULTIPLE' | 'VERDADERO_FALSO' | 'ABIERTA';
export type EstadoExamen = 'BORRADOR' | 'PUBLICADO' | 'CERRADO' | 'CALIFICADO';
export type EstadoIntento = 'EN_CURSO' | 'ENVIADO' | 'CALIFICADO' | 'VENCIDO';

export const TIPOS_PREGUNTA: TipoPregunta[] = ['OPCION_UNICA', 'OPCION_MULTIPLE', 'VERDADERO_FALSO', 'ABIERTA'];

export interface Opcion {
  id?: number;
  texto: string;
  esCorrecta?: boolean;
  orden?: number;
}

export interface Pregunta {
  id: number;
  cursoId: number;
  docenteId: number;
  tema?: string;
  tipo: TipoPregunta;
  enunciado: string;
  puntaje: number;
  activa: boolean;
  creadaEn: string;
  opciones: Opcion[];
}
export interface PreguntaRequest {
  cursoId: number;
  tema?: string;
  tipo: TipoPregunta;
  enunciado: string;
  puntaje: number;
  activa?: boolean;
  opciones?: Opcion[];
}

export interface ExamenPreguntaItem {
  preguntaId: number;
  orden: number;
  puntaje: number;
}
export interface ExamenCreate {
  anioId: number;
  periodoId: number;
  seccionId: number;
  cursoId: number;
  titulo: string;
  instrucciones?: string;
  fechaInicio: string;
  fechaFin: string;
  duracionMin: number;
  intentosMax?: number;
  barajarPreguntas?: boolean;
  preguntas: ExamenPreguntaItem[];
}

export interface Examen {
  id: number;
  anioId: number;
  periodoId: number;
  seccionId: number;
  cursoId: number;
  docenteId: number;
  titulo: string;
  instrucciones?: string;
  fechaInicio: string;
  fechaFin: string;
  duracionMin: number;
  intentosMax: number;
  barajarPreguntas: boolean;
  puntajeTotal: number;
  estado: EstadoExamen;
  creadoEn?: string;
  publicadoEn?: string;
}

export interface PreguntaItemDetalle {
  preguntaId: number;
  orden: number;
  puntaje: number;
  tema?: string;
  tipo: TipoPregunta;
  enunciado: string;
  opciones: Opcion[];
}
export interface ExamenDetalle extends Examen {
  preguntas: PreguntaItemDetalle[];
}

export interface IntentoResumen {
  intentoId: number;
  alumnoId: number;
  alumnoNombre: string;
  numeroIntento: number;
  estado: EstadoIntento;
  puntajeObtenido?: number;
  nota?: number;
  requiereRevision?: boolean;
}
export interface ResultadosExamen {
  examenId: number;
  titulo: string;
  puntajeTotal: number;
  totalIntentos: number;
  alumnosEvaluados: number;
  promedioNotas?: number;
  notaMaxima?: number;
  notaMinima?: number;
  intentos: IntentoResumen[];
}

export interface ExamenDisponible {
  examenId: number;
  cursoId: number;
  titulo: string;
  instrucciones?: string;
  fechaInicio: string;
  fechaFin: string;
  duracionMin: number;
  intentosMax: number;
  intentosRealizados: number;
  puedeRendir: boolean;
  puntajeTotal: number;
}

export interface OpcionEstudiante {
  id: number;
  texto: string;
  orden: number;
}
export interface PreguntaEstudiante {
  preguntaId: number;
  orden: number;
  puntaje: number;
  tipo: TipoPregunta;
  enunciado: string;
  opciones: OpcionEstudiante[];
  opcionesRespondidas?: number[];
  textoRespondido?: string;
}
export interface IntentoIniciado {
  intentoId: number;
  examenId: number;
  tituloExamen: string;
  numeroIntento: number;
  iniciadoEn: string;
  venceEn: string;
  puntajeTotal: number;
  preguntas: PreguntaEstudiante[];
}

export interface IntentoResultado {
  intentoId: number;
  examenId: number;
  tituloExamen: string;
  numeroIntento: number;
  estado: EstadoIntento;
  puntajeObtenido?: number;
  puntajeTotal: number;
  nota?: number;
  iniciadoEn: string;
  enviadoEn?: string;
  calificadoEn?: string;
  requiereRevisionAbiertas?: boolean;
}

export interface GuardarRespuesta {
  opcionesIds?: number[];
  textoRespuesta?: string;
}
```

---

<a id="4-pagomodelts"></a>
## 4. `pago.model.ts` — Modelos e Interfaces Core

**Ruta del archivo:** `frontend/src/app/core/models/pago.model.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `pago.model`.

```typescript
export type TipoConcepto = 'MATRICULA' | 'PENSION' | 'OTRO';
export type TipoDescuento = 'PORCENTAJE' | 'MONTO_FIJO';
export type AplicaA = 'MATRICULA' | 'PENSION' | 'TODO';

export const TIPOS_CONCEPTO: TipoConcepto[] = ['MATRICULA', 'PENSION', 'OTRO'];
export const TIPOS_DESCUENTO: TipoDescuento[] = ['PORCENTAJE', 'MONTO_FIJO'];
export const APLICA_A: AplicaA[] = ['MATRICULA', 'PENSION', 'TODO'];

export interface Concepto {
  id: number;
  codigo: string;
  nombre: string;
  tipo: TipoConcepto;
  activo: boolean;
}
export type ConceptoRequest = Omit<Concepto, 'id'>;

export interface Tarifa {
  id: number;
  anioId: number;
  nivelId: number;
  gradoId?: number;
  conceptoId: number;
  conceptoCodigo: string;
  conceptoNombre: string;
  monto: number;
  numCuotas: number;
  mesInicio: number;
  diaVencimiento: number;
  activo: boolean;
}
export interface TarifaRequest {
  anioId: number;
  nivelId: number;
  gradoId?: number | null;
  conceptoId: number;
  monto: number;
  numCuotas: number;
  mesInicio: number;
  diaVencimiento: number;
  activo: boolean;
}

export interface Descuento {
  id: number;
  nombre: string;
  tipo: TipoDescuento;
  valor: number;
  aplicaA: AplicaA;
  activo: boolean;
  /** Código que la familia escribe en la matrícula en línea para canjearlo; vacío = solo lo asigna el administrador. */
  codigo?: string | null;
}
export type DescuentoRequest = Omit<Descuento, 'id'>;

export interface AlertaAdmin {
  id: number;
  tipo: string;
  matriculaId?: number;
  anioId?: number;
  nivelId?: number;
  gradoId?: number;
  detalle: string;
  resuelta: boolean;
  creadaEn: string;
  resueltaEn?: string;
}

export interface DetalleMoroso {
  alumnoId: number;
  alumnoNombre: string;
  matriculaId: number;
  responsableNombre: string;
  saldoTotalVencido: number;
  cuotasVencidas: number;
}

export interface Morosos {
  seccionId?: number;
  gradoId?: number;
  totalAlumnosMorosos: number;
  totalDeudaAcumulada: number;
  listaMorosos: DetalleMoroso[];
}
```

---

<a id="5-calificacionservicets"></a>
## 5. `calificacion.service.ts` — Servicios HTTP Core

**Ruta del archivo:** `frontend/src/app/core/services/calificacion.service.ts`

### **¿Qué hace este archivo?**
Servicio Angular para comunicación HTTP con `calificaciones-ms`. Métodos para consultar el registro auxiliar, guardar notas por lote, configurar criterios y emitir libretas.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Boletin,
  CierrePeriodo,
  Criterio,
  CriterioRequest,
  GenerarBoletin,
  Libreta,
  NotaPendiente,
  NotasLote,
  Promedio,
  RegistroNotas,
  ResultadoAnual,
  ValidarPesos
} from '../models/calificacion.model';

const API = '/api/v1/calificaciones';

@Injectable({ providedIn: 'root' })
export class CalificacionService {
  private readonly http = inject(HttpClient);

  private tri(periodoId: number, seccionId: number, cursoId: number): HttpParams {
    return new HttpParams().set('periodoId', periodoId).set('seccionId', seccionId).set('cursoId', cursoId);
  }

  // Criterios (docente)
  criterios(periodoId: number, seccionId: number, cursoId: number): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(`${API}/criterios`, { params: this.tri(periodoId, seccionId, cursoId) });
  }
  validarPesos(periodoId: number, seccionId: number, cursoId: number): Observable<ValidarPesos> {
    return this.http.get<ValidarPesos>(`${API}/criterios/validar`, { params: this.tri(periodoId, seccionId, cursoId) });
  }
  crearCriterio(body: CriterioRequest): Observable<Criterio> {
    return this.http.post<Criterio>(`${API}/criterios`, body);
  }
  actualizarCriterio(id: number, body: CriterioRequest): Observable<Criterio> {
    return this.http.put<Criterio>(`${API}/criterios/${id}`, body);
  }
  eliminarCriterio(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/criterios/${id}`);
  }

  // Registro de notas (docente)
  registro(seccionId: number, cursoId: number, periodoId: number): Observable<RegistroNotas> {
    return this.http.get<RegistroNotas>(`${API}/registro`, { params: this.tri(periodoId, seccionId, cursoId) });
  }
  guardarLote(body: NotasLote): Observable<unknown> {
    return this.http.put(`${API}/notas/lote`, body);
  }
  pendientes(seccionId?: number, cursoId?: number): Observable<NotaPendiente[]> {
    let params = new HttpParams();
    if (seccionId) params = params.set('seccionId', seccionId);
    if (cursoId) params = params.set('cursoId', cursoId);
    return this.http.get<NotaPendiente[]>(`${API}/pendientes-asignar`, { params });
  }

  // Secretaría / Admin
  promedios(seccionId: number, periodoId: number): Observable<Promedio[]> {
    return this.http.get<Promedio[]>(`${API}/promedios`, { params: new HttpParams().set('seccionId', seccionId).set('periodoId', periodoId) });
  }
  cerrarPeriodo(seccionId: number, periodoId: number): Observable<CierrePeriodo> {
    return this.http.post<CierrePeriodo>(`${API}/periodos/cerrar`, { seccionId, periodoId });
  }
  reabrirPeriodo(seccionId: number, periodoId: number, motivo: string): Observable<CierrePeriodo> {
    return this.http.post<CierrePeriodo>(`${API}/periodos/reabrir`, { seccionId, periodoId, motivo });
  }
  resultadosAnuales(seccionId: number): Observable<ResultadoAnual[]> {
    return this.http.get<ResultadoAnual[]>(`${API}/resultados-anuales`, { params: new HttpParams().set('seccionId', seccionId) });
  }
  generarBoletines(body: GenerarBoletin): Observable<Boletin[]> {
    return this.http.post<Boletin[]>(`${API}/boletines/generar`, body);
  }
  boletines(alumnoId: number): Observable<Boletin[]> {
    return this.http.get<Boletin[]>(`${API}/boletines`, { params: new HttpParams().set('alumnoId', alumnoId) });
  }
  urlBoletin(id: number): Observable<{ url?: string; urlDescarga?: string }> {
    return this.http.get<{ url?: string; urlDescarga?: string }>(`${API}/boletines/${id}/url`);
  }

  // Familia
  libreta(alumnoId: number, anioId?: number): Observable<Libreta> {
    let params = new HttpParams();
    if (anioId) params = params.set('anioId', anioId);
    return this.http.get<Libreta>(`${API}/alumnos/${alumnoId}/libreta`, { params });
  }
  mias(anioId?: number): Observable<Libreta[]> {
    let params = new HttpParams();
    if (anioId) params = params.set('anioId', anioId);
    return this.http.get<Libreta[]>(`${API}/mias`, { params });
  }
}
```

---

<a id="6-cobroservicets"></a>
## 6. `cobro.service.ts` — Servicios HTTP Core

**Ruta del archivo:** `frontend/src/app/core/services/cobro.service.ts`

### **¿Qué hace este archivo?**
Servicio Angular para comunicación HTTP con el microservicio de pagos (`pago-ms`) a través del Gateway. Implementa métodos para abrir caja, consultar cuotas por alumno, registrar pago con idempotencia y cerrar caja.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Caja, CierreCaja, Comprobante, CreditoAlumno, Cuota, DatosPasarela, DescuentoDelAlumno, EstadoMatriculaPago, MatriculaPorPagar, OpcionDescuento, OrdenPago, PedidoDescuento, ResultadoPasarela, SolicitudDescuento, DepositoCredito, EstadoCuenta, FiltroCuotas, Pago, RegistrarPago, ResultadoCredito } from '../models/cobro.model';
import { Page } from '../models/page.model';

const API = '/api/v1/pagos';

/** Cobros, cuentas por alumno, caja y comprobantes (la configuración de tarifas está en PagoConfigService). */
@Injectable({ providedIn: 'root' })
export class CobroService {
  private readonly http = inject(HttpClient);

  estadoCuenta(alumnoId: number): Observable<EstadoCuenta> {
    return this.http.get<EstadoCuenta>(`${API}/alumnos/${alumnoId}/estado-cuenta`);
  }

  // Pago de la matrícula: la orden la crea el servidor con lo que falta; la pasarela (simulada) cobra y avisa; de ahí sale la matrícula
  matriculaDe(alumnoId: number): Observable<EstadoMatriculaPago> {
    return this.http.get<EstadoMatriculaPago>(`${API}/alumnos/${alumnoId}/matricula`);
  }
  crearOrdenMatricula(alumnoId: number): Observable<OrdenPago> {
    return this.http.post<OrdenPago>(`${API}/alumnos/${alumnoId}/matricula/orden`, {});
  }
  pagarEnPasarela(codigoOrden: string, datos: DatosPasarela): Observable<ResultadoPasarela> {
    return this.http.post<ResultadoPasarela>(`${API}/pasarela/ordenes/${codigoOrden}/pagar`, datos);
  }
  /** «Generar matrícula» con el crédito del alumno; el servidor rechaza si el crédito no alcanza. */
  generarMatricula(alumnoId: number): Observable<EstadoMatriculaPago> {
    return this.http.post<EstadoMatriculaPago>(`${API}/alumnos/${alumnoId}/matricula/generar`, {});
  }
  // Solicitud de descuento de la matrícula (hermanos, etc.): la pide la familia o la secretaría y la prueba la secretaría
  opcionesDescuento(): Observable<OpcionDescuento[]> {
    return this.http.get<OpcionDescuento[]>(`${API}/solicitudes-descuento/opciones`);
  }
  solicitarDescuento(alumnoId: number, pedido: PedidoDescuento): Observable<SolicitudDescuento> {
    return this.http.post<SolicitudDescuento>(`${API}/alumnos/${alumnoId}/matricula/descuento`, pedido);
  }
  solicitudesDescuento(): Observable<SolicitudDescuento[]> {
    return this.http.get<SolicitudDescuento[]>(`${API}/solicitudes-descuento`);
  }
  aprobarSolicitudDescuento(id: number): Observable<SolicitudDescuento> {
    return this.http.post<SolicitudDescuento>(`${API}/solicitudes-descuento/${id}/aprobar`, {});
  }
  rechazarSolicitudDescuento(id: number, motivo: string): Observable<SolicitudDescuento> {
    return this.http.post<SolicitudDescuento>(`${API}/solicitudes-descuento/${id}/rechazar`, { motivo });
  }
  matriculasPorPagar(): Observable<MatriculaPorPagar[]> {
    return this.http.get<MatriculaPorPagar[]>(`${API}/matriculas/por-pagar`);
  }

  /** Los descuentos vigentes del alumno, con su nombre y valor. */
  descuentosDe(alumnoId: number): Observable<DescuentoDelAlumno[]> {
    return this.http.get<DescuentoDelAlumno[]>(`${API}/alumnos/${alumnoId}/descuentos`);
  }

  // Crédito del alumno
  credito(alumnoId: number): Observable<CreditoAlumno> {
    return this.http.get<CreditoAlumno>(`${API}/alumnos/${alumnoId}/credito`);
  }
  depositarCredito(alumnoId: number, body: DepositoCredito): Observable<ResultadoCredito> {
    return this.http.post<ResultadoCredito>(`${API}/alumnos/${alumnoId}/credito/depositos`, body);
  }
  cobrarDelCredito(alumnoId: number): Observable<ResultadoCredito> {
    return this.http.post<ResultadoCredito>(`${API}/alumnos/${alumnoId}/credito/cobrar`, {});
  }
  anularDeposito(movimientoId: number, motivo: string): Observable<void> {
    return this.http.post<void>(`${API}/creditos/movimientos/${movimientoId}/anular`, { motivo });
  }

  cuotas(f: FiltroCuotas = {}): Observable<Page<Cuota>> {
    let params = new HttpParams().set('page', f.page ?? 0).set('size', f.size ?? 20);
    if (f.estado) params = params.set('estado', f.estado);
    if (f.alumnoId) params = params.set('alumnoId', f.alumnoId);
    if (f.seccionId) params = params.set('seccionId', f.seccionId);
    if (f.vencimiento) params = params.set('vencimiento', f.vencimiento);
    return this.http.get<Page<Cuota>>(`${API}/cuotas`, { params });
  }

  misCuotas(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(`${API}/mias/cuotas`);
  }

  registrar(body: RegistrarPago): Observable<Pago> {
    return this.http.post<Pago>(API, body);
  }

  pagarOnline(body: RegistrarPago): Observable<Pago> {
    return this.http.post<Pago>(`${API}/online`, body);
  }

  // Pagos de apoderados por aprobar: los aprueba o rechaza caja (o el administrador)
  porAprobar(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${API}/por-aprobar`);
  }
  conteoPorAprobar(): Observable<number> {
    return this.http.get<{ pendientes: number }>(`${API}/por-aprobar/conteo`).pipe(map(r => r.pendientes));
  }
  aprobar(id: number): Observable<Pago> {
    return this.http.post<Pago>(`${API}/${id}/aprobar`, {});
  }
  rechazar(id: number, motivo: string): Observable<Pago> {
    return this.http.post<Pago>(`${API}/${id}/rechazar`, { motivo });
  }
  /** Lo que el apoderado pagó y sigue en revisión, o fue rechazado (con motivo). */
  misPendientes(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${API}/mias/pendientes`);
  }

  anular(id: number, motivo: string): Observable<Pago> {
    return this.http.patch<Pago>(`${API}/${id}/anular`, { motivo });
  }

  pago(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${API}/${id}`);
  }

  comprobante(pagoId: number): Observable<Comprobante> {
    return this.http.get<Comprobante>(`${API}/${pagoId}/comprobante`);
  }

  reporteCobranza(desde?: string, hasta?: string, medio?: string, page = 0, size = 20): Observable<Page<Pago>> {
    let params = new HttpParams().set('page', page).set('size', size);
    // pago-ms recibe fecha y hora (LocalDateTime): el día completo va de 00:00:00 a 23:59:59.
    if (desde) params = params.set('desde', `${desde}T00:00:00`);
    if (hasta) params = params.set('hasta', `${hasta}T23:59:59`);
    if (medio) params = params.set('medio', medio);
    return this.http.get<Page<Pago>>(`${API}/reportes/cobranza`, { params });
  }

  asignarDescuento(alumnoId: number, descuentoId: number, anioId: number, motivo?: string): Observable<unknown> {
    return this.http.post(`${API}/descuentos/asignar`, { alumnoId, descuentoId, anioId, motivo });
  }

  // Caja
  cajaActual(): Observable<Caja> {
    return this.http.get<Caja>(`${API}/caja/actual`);
  }
  abrirCaja(montoApertura: number): Observable<Caja> {
    return this.http.post<Caja>(`${API}/caja/abrir`, { montoApertura });
  }
  cerrarCaja(montoCierreDeclarado: number): Observable<CierreCaja> {
    return this.http.post<CierreCaja>(`${API}/caja/cerrar`, { montoCierreDeclarado });
  }
  reporteCaja(id: number): Observable<CierreCaja> {
    // Con la caja abierta el servicio no calcula el efectivo esperado (solo al cerrar): apertura + cobros en efectivo.
    return this.http.get<CierreCaja>(`${API}/caja/${id}/reporte`).pipe(
      map(r => ({ ...r, efectivoEsperado: r.efectivoEsperado ?? r.montoApertura + r.cobrosEfectivo }))
    );
  }
}
```

---

<a id="7-examenservicets"></a>
## 7. `examen.service.ts` — Servicios HTTP Core

**Ruta del archivo:** `frontend/src/app/core/services/examen.service.ts`

### **¿Qué hace este archivo?**
Servicio Angular para comunicación HTTP con `examenes-ms`. Métodos para crear exámenes, administrar preguntas, iniciar intentos y calificar.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EstadoExamen,
  Examen,
  ExamenCreate,
  ExamenDetalle,
  ExamenDisponible,
  GuardarRespuesta,
  IntentoIniciado,
  IntentoResultado,
  Pregunta,
  PreguntaRequest,
  ResultadosExamen,
  TipoPregunta
} from '../models/examen.model';
import { Page } from '../models/page.model';

const API = '/api/v1/examenes';

@Injectable({ providedIn: 'root' })
export class ExamenService {
  private readonly http = inject(HttpClient);

  // Banco de preguntas (docente)
  preguntas(cursoId: number, tema?: string, tipo?: TipoPregunta | '', page = 0, size = 15): Observable<Page<Pregunta>> {
    let params = new HttpParams().set('cursoId', cursoId).set('page', page).set('size', size);
    if (tema) params = params.set('tema', tema);
    if (tipo) params = params.set('tipo', tipo);
    return this.http.get<Page<Pregunta>>(`${API}/preguntas`, { params });
  }
  crearPregunta(body: PreguntaRequest): Observable<Pregunta> {
    return this.http.post<Pregunta>(`${API}/preguntas`, body);
  }
  actualizarPregunta(id: number, body: PreguntaRequest): Observable<Pregunta> {
    return this.http.put<Pregunta>(`${API}/preguntas/${id}`, body);
  }
  eliminarPregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/preguntas/${id}`);
  }

  // Exámenes (docente)
  listar(f: { seccionId?: number; cursoId?: number; docenteId?: number; estado?: EstadoExamen | '' } = {}, page = 0, size = 15): Observable<Page<Examen>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (f.seccionId) params = params.set('seccionId', f.seccionId);
    if (f.cursoId) params = params.set('cursoId', f.cursoId);
    if (f.docenteId) params = params.set('docenteId', f.docenteId);
    if (f.estado) params = params.set('estado', f.estado);
    return this.http.get<Page<Examen>>(API, { params });
  }
  detalle(id: number): Observable<ExamenDetalle> {
    return this.http.get<ExamenDetalle>(`${API}/${id}`);
  }
  crear(body: ExamenCreate): Observable<Examen> {
    return this.http.post<Examen>(API, body);
  }
  actualizar(id: number, body: ExamenCreate): Observable<Examen> {
    return this.http.put<Examen>(`${API}/${id}`, body);
  }
  publicar(id: number): Observable<Examen> {
    return this.http.patch<Examen>(`${API}/${id}/publicar`, {});
  }
  cerrar(id: number): Observable<Examen> {
    return this.http.patch<Examen>(`${API}/${id}/cerrar`, {});
  }
  resultados(id: number): Observable<ResultadosExamen> {
    return this.http.get<ResultadosExamen>(`${API}/${id}/resultados`);
  }
  pendientesRevision(id: number): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${API}/${id}/pendientes-revision`);
  }
  revisarRespuesta(respuestaId: number, puntajeObtenido: number): Observable<unknown> {
    return this.http.patch(`${API}/respuestas/${respuestaId}/revisar`, { puntajeObtenido });
  }

  // Alumno / apoderado
  disponibles(): Observable<ExamenDisponible[]> {
    return this.http.get<ExamenDisponible[]>(`${API}/disponibles`);
  }
  mios(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${API}/mias`);
  }
  iniciarIntento(examenId: number): Observable<IntentoIniciado> {
    return this.http.post<IntentoIniciado>(`${API}/${examenId}/intentos`, {});
  }
  guardarRespuesta(intentoId: number, preguntaId: number, body: GuardarRespuesta): Observable<unknown> {
    return this.http.put(`${API}/intentos/${intentoId}/respuestas/${preguntaId}`, body);
  }
  enviar(intentoId: number): Observable<IntentoResultado> {
    return this.http.post<IntentoResultado>(`${API}/intentos/${intentoId}/enviar`, {});
  }
  resultado(intentoId: number): Observable<IntentoResultado> {
    return this.http.get<IntentoResultado>(`${API}/intentos/${intentoId}/resultado`);
  }
}
```

---

<a id="8-pago-configservicets"></a>
## 8. `pago-config.service.ts` — Servicios HTTP Core

**Ruta del archivo:** `frontend/src/app/core/services/pago-config.service.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `pago-config.service`.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AlertaAdmin,
  Concepto,
  ConceptoRequest,
  Descuento,
  DescuentoRequest,
  Morosos,
  Tarifa,
  TarifaRequest
} from '../models/pago.model';
import { OpcionPlanPago } from '../models/matricula.model';

const API = '/api/v1/pagos';

/** Configuración de cobranza que administra el ADMIN: conceptos, tarifas y descuentos; más alertas y morosidad. */
@Injectable({ providedIn: 'root' })
export class PagoConfigService {
  private readonly http = inject(HttpClient);

  conceptos(): Observable<Concepto[]> {
    return this.http.get<Concepto[]>(`${API}/conceptos`);
  }
  crearConcepto(body: ConceptoRequest): Observable<Concepto> {
    return this.http.post<Concepto>(`${API}/conceptos`, body);
  }
  actualizarConcepto(id: number, body: ConceptoRequest): Observable<Concepto> {
    return this.http.put<Concepto>(`${API}/conceptos/${id}`, body);
  }

  /** Las formas de pago de la pensión (mensual, bimestral, semestral, anual) con su descuento. */
  planesPago(): Observable<OpcionPlanPago[]> {
    return this.http.get<OpcionPlanPago[]>(`${API}/planes-pago`);
  }

  tarifas(anioId: number): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${API}/tarifas`, { params: new HttpParams().set('anioId', anioId) });
  }
  crearTarifa(body: TarifaRequest): Observable<Tarifa> {
    return this.http.post<Tarifa>(`${API}/tarifas`, body);
  }
  actualizarTarifa(id: number, body: TarifaRequest): Observable<Tarifa> {
    return this.http.put<Tarifa>(`${API}/tarifas/${id}`, body);
  }

  descuentos(): Observable<Descuento[]> {
    return this.http.get<Descuento[]>(`${API}/descuentos`);
  }
  crearDescuento(body: DescuentoRequest): Observable<Descuento> {
    return this.http.post<Descuento>(`${API}/descuentos`, body);
  }
  actualizarDescuento(id: number, body: DescuentoRequest): Observable<Descuento> {
    return this.http.put<Descuento>(`${API}/descuentos/${id}`, body);
  }

  alertas(resueltas = false): Observable<AlertaAdmin[]> {
    return this.http.get<AlertaAdmin[]>(`${API}/alertas`, { params: new HttpParams().set('resueltas', resueltas) });
  }
  resolverAlerta(id: number): Observable<AlertaAdmin> {
    return this.http.patch<AlertaAdmin>(`${API}/alertas/${id}/resolver`, {});
  }

  morosos(seccionId?: number, gradoId?: number): Observable<Morosos> {
    let params = new HttpParams();
    if (seccionId) params = params.set('seccionId', seccionId);
    if (gradoId) params = params.set('gradoId', gradoId);
    return this.http.get<Morosos>(`${API}/morosos`, { params });
  }
}
```

---

<a id="9-pago-personalservicets"></a>
## 9. `pago-personal.service.ts` — Servicios HTTP Core

**Ruta del archivo:** `frontend/src/app/core/services/pago-personal.service.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `pago-personal.service`.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CuentaDeposito, PagarRequest, PagoPersonal } from '../models/rrhh.model';

const API = '/api/v1/planificacion/pago-personal';

/**
 * Pago al personal con aprobación. Caja ve la planilla del mes y SOLICITA cada pago (medio, fecha, referencia);
 * el administrador lo APRUEBA o lo RECHAZA con un motivo. Lo usan caja y el administrador.
 */
@Injectable({ providedIn: 'root' })
export class PagoPersonalService {
  private readonly http = inject(HttpClient);

  /** Los pagos de un mes (pendientes, por aprobar y pagados). */
  planilla(periodo: string): Observable<PagoPersonal[]> {
    return this.http.get<PagoPersonal[]>(`${API}/planilla`, { params: new HttpParams().set('periodo', periodo) });
  }

  /** Dónde se le deposita a una persona. */
  cuentas(personalId: number): Observable<CuentaDeposito[]> {
    return this.http.get<CuentaDeposito[]>(`${API}/cuentas`, { params: new HttpParams().set('personalId', personalId) });
  }

  porAprobar(): Observable<PagoPersonal[]> {
    return this.http.get<PagoPersonal[]>(`${API}/por-aprobar`);
  }

  /** Cuántos pagos esperan la aprobación del administrador. */
  conteoPorAprobar(): Observable<number> {
    return this.http.get<{ pendientes: number }>(`${API}/por-aprobar/conteo`).pipe(map(r => r.pendientes));
  }

  /** Caja: registra cómo se pagó; queda por aprobar. */
  solicitar(id: number, body: PagarRequest): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos/${id}/solicitar`, body);
  }

  /** Administrador: aprueba el pago (pasa a pagado). */
  aprobar(id: number): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos/${id}/aprobar`, {});
  }

  /** Administrador: lo devuelve a pendiente con el motivo. */
  rechazar(id: number, motivo: string): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos/${id}/rechazar`, { motivo });
  }
}
```

---

<a id="10-caja-personalcomponentts"></a>
## 10. `caja-personal.component.ts` — Feature Ventanilla de Caja

**Ruta del archivo:** `frontend/src/app/features/caja/caja-personal.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `caja-personal.component`.

```typescript
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CuentaDeposito, PagoPersonal } from '../../core/models/rrhh.model';
import { NotificationService } from '../../core/services/notification.service';
import { PagoPersonalService } from '../../core/services/pago-personal.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { hoyLocal } from '../personal/asistencia-personal';
import { etiquetaBanco, etiquetaConcepto, etiquetaTipoCuenta, nombrePeriodo, periodoDe, periodoValido, soles } from '../personal/rrhh';

/** Todo lo de una persona en el mes: sus líneas de pago y lo que falta. */
interface Persona {
  personalId: number;
  nombre: string;
  area?: string;
  lineas: PagoPersonal[];
  /** Lo que caja todavía no registró (neto con signo). */
  porPagar: number;
  /** Lo que ya registró y espera la aprobación del administrador. */
  porAprobar: number;
  pagado: number;
  /** Motivo con el que el administrador devolvió algún pago (para corregirlo). */
  rechazo?: string;
}

const redondear = (n: number): number => Math.round(n * 100) / 100;

/**
 * Caja paga al personal: ve la planilla del mes, elige a quién pagar y registra cómo se pagó (medio, fecha, referencia).
 * El pago NO queda pagado hasta que el administrador lo aprueba.
 */
@Component({
  selector: 'app-caja-personal',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Pago al personal" subtitulo="Registra los pagos del mes. Cada pago que registres lo aprueba el administrador antes de quedar pagado." />

      <div class="barra">
        <div class="field" style="margin: 0">
          <label for="cp-mes">Mes</label>
          <input id="cp-mes" type="month" [formControl]="periodo" [max]="mesActual" />
        </div>
        <input class="input grow" type="search" [formControl]="busqueda" placeholder="Buscar por nombre o área" aria-label="Buscar personal" />
      </div>

      <div class="totales">
        <div [class.alerta]="total().porPagar !== 0"><span>Por pagar</span><strong>{{ dinero(total().porPagar) }}</strong></div>
        <div [class.viol]="total().porAprobar !== 0"><span>Esperando al administrador</span><strong>{{ dinero(total().porAprobar) }}</strong></div>
        <div><span>Pagado</span><strong class="ok">{{ dinero(total().pagado) }}</strong></div>
      </div>

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      <div class="lista">
        @for (p of personas(); track p.personalId) {
          <article class="persona" [class.por-pagar]="p.porPagar !== 0" [class.espera]="p.porPagar === 0 && p.porAprobar !== 0">
            <header>
              <div class="quien"><strong>{{ p.nombre }}</strong><span class="muted">{{ p.area || 'Sin área' }}</span></div>
              @if (p.porPagar !== 0) { <span class="badge badge-warn">Por pagar</span> }
              @else if (p.porAprobar !== 0) { <span class="badge badge-violet">Por aprobar</span> }
              @else { <span class="badge badge-ok">Pagado</span> }
            </header>
            <ul class="lineas">
              @for (l of p.lineas; track l.id) {
                <li>
                  <span class="concepto">{{ concepto(l) }}@if (l.descripcion) { <small>{{ l.descripcion }}</small> }</span>
                  <span class="monto" [class.neg]="l.montoFirmado < 0">{{ dinero(l.montoFirmado) }}</span>
                  <span [class]="'mini ' + (l.estado === 'PAGADO' ? 'ok' : l.estado === 'POR_APROBAR' ? 'viol' : 'warn')">{{ l.estado === 'PAGADO' ? 'Pagado' : l.estado === 'POR_APROBAR' ? 'Por aprobar' : 'Pend.' }}</span>
                </li>
              }
            </ul>
            @if (p.rechazo) { <div class="aviso aviso-danger" role="status">El administrador lo devolvió: {{ p.rechazo }}</div> }
            @if (p.porPagar !== 0) {
              <button type="button" class="btn btn-primary" (click)="abrirPago(p)" [attr.aria-label]="'Pagar a ' + p.nombre">Pagar {{ dinero(p.porPagar) }}</button>
            }
          </article>
        } @empty {
          <div class="vacio-guia">
            <strong>{{ cargando() ? 'Cargando…' : 'No hay pagos en ' + nombreMes() }}</strong>
            @if (!cargando()) { <span>La planilla del mes la genera el administrador en Personal → Pago al personal.</span> }
          </div>
        }
      </div>
    </div>

    @if (pagando(); as p) {
      <app-modal [titulo]="'Pagar a ' + p.nombre" [ancho]="520" (cerrar)="pagando.set(null)">
        <p style="margin: 0 0 8px">Se registrará el pago de estas líneas de <strong>{{ nombreMes() }}</strong>:</p>
        <ul class="lineas">
          @for (l of pendientesDe(p); track l.id) {
            <li><span class="concepto">{{ concepto(l) }}@if (l.descripcion) { <small>{{ l.descripcion }}</small> }</span><span class="monto" [class.neg]="l.montoFirmado < 0">{{ dinero(l.montoFirmado) }}</span></li>
          }
        </ul>
        <div class="neto"><span>Total a pagar</span><strong>{{ dinero(p.porPagar) }}</strong></div>

        @if (cuenta(); as cu) {
          <div class="destino">
            <h4>Depositar a</h4>
            <dl>
              <dt>{{ etiquetaBanco(cu.banco) }} · {{ etiquetaTipoCuenta(cu.tipo) }}</dt>
              <dd><span class="num">{{ cu.numero }}</span> <button type="button" class="copiar" (click)="copiar(cu.numero)" aria-label="Copiar el número de cuenta">Copiar</button></dd>
              @if (cu.cci) { <dt>CCI</dt><dd><span class="num">{{ cu.cci }}</span> <button type="button" class="copiar" (click)="copiar(cu.cci)" aria-label="Copiar el CCI">Copiar</button></dd> }
              <dt>Titular</dt><dd>{{ cu.titular }}</dd>
            </dl>
          </div>
        } @else if (cargandoCuenta()) {
          <p class="muted">Buscando su cuenta de depósito…</p>
        } @else {
          <div class="aviso aviso-warn" style="margin-top: 10px" role="status">No tiene cuenta de depósito registrada. Puedes pagarle en efectivo o cheque; el administrador puede agregar su cuenta.</div>
        }

        <div class="form-grid" style="margin-top: 12px">
          <div class="field"><label for="cp-fecha">Fecha del pago</label><input id="cp-fecha" type="date" [formControl]="fechaPago" /></div>
          <div class="field">
            <label for="cp-medio">Medio</label>
            <select id="cp-medio" [formControl]="medioPago">
              <option value="TRANSFERENCIA">Transferencia</option><option value="EFECTIVO">Efectivo</option>
              <option value="CHEQUE">Cheque</option><option value="YAPE_PLIN">Yape / Plin</option>
            </select>
          </div>
          <div class="field full"><label for="cp-ref">N.º de operación o referencia {{ medioPago.value === 'EFECTIVO' ? '(opcional)' : '' }}</label><input id="cp-ref" [formControl]="referenciaPago" maxlength="100" /></div>
        </div>
        @if (errorPago()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorPago() }}</div> }
        <p class="muted" style="margin-bottom: 0">Quedará «por aprobar»: el administrador recibe el aviso y lo confirma.</p>
        <ng-container footer>
          <button type="button" class="btn" (click)="pagando.set(null)">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="guardando()" (click)="enviar(p)">{{ guardando() ? 'Enviando…' : 'Enviar a aprobación' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .barra { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
    .grow { flex: 1 1 240px; }
    .totales { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; }
    .totales div { display: flex; flex-direction: column; padding: 12px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); }
    .totales div.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .totales div.viol { border-color: var(--violet); background: var(--violet-soft); }
    .totales span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .totales strong { font-size: 1.4rem; font-variant-numeric: tabular-nums; }
    .totales strong.ok { color: var(--ok); }
    .lista { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; align-items: start; }
    .persona { display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1.5px solid var(--line-2); border-radius: 18px; background: var(--card); }
    .persona.por-pagar { border-color: var(--warn); }
    .persona.espera { border-color: var(--violet); }
    .persona header { display: flex; align-items: center; gap: 10px; }
    .quien { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .quien strong, .quien .muted { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .lineas { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    .lineas li { display: flex; align-items: center; gap: 8px; }
    .concepto { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: .88rem; }
    .concepto small { color: var(--ink-2); font-size: .72rem; }
    .monto { font-variant-numeric: tabular-nums; font-weight: 700; }
    .monto.neg { color: var(--danger, #b3261e); }
    .mini { flex: none; padding: 1px 8px; border-radius: 999px; font-size: .62rem; font-weight: 800; text-transform: uppercase; }
    .mini.ok { color: var(--ok); background: var(--ok-soft); }
    .mini.warn { color: var(--warn); background: var(--warn-soft); }
    .mini.viol { color: var(--violet); background: var(--violet-soft); }
    .neto { display: flex; justify-content: space-between; align-items: baseline; padding-top: 8px; margin-top: 4px; border-top: 1px solid var(--line-2); }
    .neto strong { font-size: 1.25rem; font-variant-numeric: tabular-nums; }
    .destino { margin-top: 10px; padding: 10px 14px; border: 1.5px solid var(--primary); border-radius: 12px; background: var(--primary-soft); }
    .destino h4 { margin: 0 0 6px; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--primary); }
    .destino dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: .88rem; }
    .destino dt { color: var(--ink-2); }
    .destino dd { margin: 0; font-weight: 700; word-break: break-all; }
    .destino .num { font-variant-numeric: tabular-nums; letter-spacing: .02em; user-select: all; }
    .copiar { margin-left: 6px; padding: 1px 8px; font: inherit; font-size: .7rem; font-weight: 700; color: var(--primary); background: var(--card); border: 0; border-radius: 999px; cursor: pointer; }
    .vacio-guia { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 4px; padding: 28px; text-align: center; border: 2px dashed var(--line-2); border-radius: 16px; color: var(--ink-2); }
    @media (max-width: 700px) { .totales { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class CajaPersonalComponent implements OnInit {
  private readonly api = inject(PagoPersonalService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly dinero = soles;
  protected readonly etiquetaBanco = etiquetaBanco;
  protected readonly etiquetaTipoCuenta = etiquetaTipoCuenta;
  protected readonly mesActual = periodoDe(new Date());
  protected readonly periodo = this.fb.nonNullable.control(this.mesActual);
  protected readonly busqueda = this.fb.nonNullable.control('');
  private readonly periodoSig = signal(this.mesActual);
  private readonly texto = signal('');
  protected readonly nombreMes = computed(() => nombrePeriodo(this.periodoSig()));

  private readonly pagos = signal<PagoPersonal[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly pagando = signal<Persona | null>(null);
  protected readonly cuenta = signal<CuentaDeposito | null>(null);
  protected readonly cargandoCuenta = signal(false);
  protected readonly guardando = signal(false);
  protected readonly errorPago = signal<string | null>(null);
  protected readonly fechaPago = this.fb.nonNullable.control(hoyLocal());
  protected readonly medioPago = this.fb.nonNullable.control('TRANSFERENCIA');
  protected readonly referenciaPago = this.fb.nonNullable.control('');

  private readonly todas = computed<Persona[]>(() => {
    const porPersona = new Map<number, PagoPersonal[]>();
    for (const l of this.pagos()) porPersona.set(l.personalId, [...(porPersona.get(l.personalId) ?? []), l]);
    return [...porPersona.entries()]
      .map(([personalId, lineas]) => {
        lineas.sort((a, b) => a.id - b.id);
        const suma = (estado: PagoPersonal['estado']): number => redondear(lineas.filter(l => l.estado === estado).reduce((s, l) => s + l.montoFirmado, 0));
        return {
          personalId, nombre: lineas[0].personalNombre, area: lineas[0].areaNombre, lineas,
          porPagar: suma('PENDIENTE'), porAprobar: suma('POR_APROBAR'), pagado: suma('PAGADO'),
          rechazo: lineas.find(l => l.estado === 'PENDIENTE' && l.motivoRechazo)?.motivoRechazo
        };
      })
      // Primero a quien falta pagar, luego a quien espera al administrador, al final lo pagado.
      .sort((a, b) => peso(a) - peso(b) || a.nombre.localeCompare(b.nombre, 'es'));
  });

  protected readonly personas = computed(() => {
    const q = this.texto().trim().toLowerCase();
    return this.todas().filter(p => !q || `${p.nombre} ${p.area ?? ''}`.toLowerCase().includes(q));
  });

  protected readonly total = computed(() => ({
    porPagar: redondear(this.todas().reduce((s, p) => s + p.porPagar, 0)),
    porAprobar: redondear(this.todas().reduce((s, p) => s + p.porAprobar, 0)),
    pagado: redondear(this.todas().reduce((s, p) => s + p.pagado, 0))
  }));

  constructor() {
    this.busqueda.valueChanges.subscribe(v => this.texto.set(v));
    this.periodo.valueChanges.subscribe(v => {
      this.periodoSig.set(v);
      if (periodoValido(v)) this.cargar();
    });
  }

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.api.planilla(this.periodo.value).subscribe({
      next: l => { this.pagos.set(l); this.cargando.set(false); },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar la planilla.')); }
    });
  }

  protected concepto(l: PagoPersonal): string { return etiquetaConcepto(l.concepto); }
  protected pendientesDe(p: Persona): PagoPersonal[] { return p.lineas.filter(l => l.estado === 'PENDIENTE'); }

  protected copiar(texto: string): void {
    navigator.clipboard?.writeText(texto).then(() => this.avisos.success('Copiado.'), () => this.avisos.warning('No se pudo copiar: selecciónalo y cópialo a mano.'));
  }

  protected abrirPago(p: Persona): void {
    this.fechaPago.setValue(hoyLocal());
    this.medioPago.setValue('TRANSFERENCIA');
    this.referenciaPago.setValue('');
    this.errorPago.set(null);
    this.cuenta.set(null);
    this.pagando.set(p);
    this.cargandoCuenta.set(true);
    this.api.cuentas(p.personalId).pipe(catchError(() => of([] as CuentaDeposito[]))).subscribe(lista => {
      this.cuenta.set(lista.find(c => c.principal) ?? lista[0] ?? null);
      this.cargandoCuenta.set(false);
    });
  }

  protected enviar(p: Persona): void {
    const lineas = this.pendientesDe(p);
    if (!lineas.length) return;
    if (this.medioPago.value !== 'EFECTIVO' && !this.referenciaPago.value.trim()) {
      this.errorPago.set('Anota el número de operación o la referencia del pago.');
      return;
    }
    this.guardando.set(true);
    this.errorPago.set(null);
    const datos = { fechaPago: this.fechaPago.value || undefined, medio: this.medioPago.value, referencia: this.referenciaPago.value.trim() || undefined };
    forkJoin(lineas.map(l => this.api.solicitar(l.id, datos))).subscribe({
      next: () => {
        this.guardando.set(false);
        this.pagando.set(null);
        this.avisos.success(`Pago de ${p.nombre} enviado al administrador para su aprobación.`);
        this.cargar();
      },
      error: e => { this.guardando.set(false); this.errorPago.set(mensajeError(e)); this.cargar(); }
    });
  }
}

function peso(p: Persona): number {
  return p.porPagar !== 0 ? 0 : p.porAprobar !== 0 ? 1 : 2;
}
```

---

<a id="11-cajacomponenthtml"></a>
## 11. `caja.component.html` — Feature Ventanilla de Caja

**Ruta del archivo:** `frontend/src/app/features/caja/caja.component.html`

### **¿Qué hace este archivo?**
Plantilla visual de la ventanilla de cobranza. Contiene el encabezado de estado de caja, el buscador de alumnos, la tabla reactiva de cuotas pendientes con casillas de selección, el formulario de pagador y medios de pago, y el modal de comprobante emitido.

```html
<div class="page">
  <app-page-header titulo="Caja" subtitulo="Elige al alumno y anota el efectivo que entrega." />

  <!-- El recibo del último pago: se imprime solo la hoja -->
  @if (recibo(); as r) {
    <div class="barra-recibo no-imprimir">
      <div class="aviso aviso-ok" role="status" style="margin: 0">Se recibieron <strong>S/ {{ r.pago.montoTotal | number: '1.2-2' }}</strong> en efectivo.</div>
      <span class="espacio"></span>
      <button type="button" class="btn btn-primary" (click)="imprimir()">Imprimir recibo</button>
      <button type="button" class="btn" (click)="cerrarRecibo()">Listo</button>
    </div>
    <article class="hoja-documento hoja-recibo" aria-label="Recibo de pago">
      <header class="rc-cab">
        <img src="/img/colegio-escudo.svg" alt="" />
        <div>
          <strong>{{ colegio()?.nombre ?? 'Colegio' }}</strong>
          @if (colegio()?.lema) { <em>{{ colegio()?.lema }}</em> }
          <small>{{ lineaColegio(colegio()) }}</small>
        </div>
      </header>
      <div class="rc-titulo">
        <h1>{{ r.pago.comprobante?.tipo === 'BOLETA' ? 'Boleta' : 'Recibo' }} de pago</h1>
        <strong>N.º {{ r.pago.comprobante?.numeroCompleto ?? 'en proceso' }}</strong>
      </div>
      <dl class="rc-datos">
        <div><dt>Alumno</dt><dd>{{ r.alumno }}</dd></div>
        <div><dt>Fecha y hora</dt><dd>{{ r.pago.pagadoEn | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
        @if (r.codigo) { <div><dt>Código</dt><dd>{{ r.codigo }}</dd></div> }
        @if (r.documento) { <div><dt>Documento</dt><dd>{{ r.documento }}</dd></div> }
        <div><dt>Recibido de</dt><dd>{{ r.pago.pagadorNombre ?? r.responsable ?? '—' }}</dd></div>
        <div><dt>Forma de pago</dt><dd>Efectivo</dd></div>
      </dl>
      <table class="rc-tabla">
        <thead><tr><th>Concepto</th><th class="num">Importe</th><th class="num">Descuento</th>@if (r.hayMora) { <th class="num">Mora</th> }<th class="num">Pagado</th><th class="num">Saldo</th></tr></thead>
        <tbody>
          @for (l of r.lineas; track l.descripcion) {
            <tr>
              <td>{{ l.descripcion }}</td>
              <td class="num">{{ l.importe | number: '1.2-2' }}</td>
              <td class="num">{{ l.descuento > 0 ? '− ' + (l.descuento | number: '1.2-2') : '—' }}</td>
              @if (r.hayMora) { <td class="num">{{ l.mora > 0 ? (l.mora | number: '1.2-2') : '—' }}</td> }
              <td class="num"><strong>{{ l.pagado | number: '1.2-2' }}</strong></td>
              <td class="num">{{ l.saldo | number: '1.2-2' }}</td>
            </tr>
          }
        </tbody>
      </table>
      <div class="rc-total"><span>Total recibido</span><strong>S/ {{ r.pago.montoTotal | number: '1.2-2' }}</strong></div>
      @if (r.totalDescuento > 0) { <p style="margin: 8px 0 0; font-size: .85rem; color: #4a5266">Incluye S/ {{ r.totalDescuento | number: '1.2-2' }} de descuento en las cuotas pagadas.</p> }
      <footer class="rc-pie">
        <span>Atendió: {{ r.cajero || '—' }}<br />Gracias por su pago.</span>
        <div class="rc-firma"><span class="linea"></span>Caja</div>
      </footer>
    </article>
  }

  <section class="card no-imprimir" style="margin-bottom: 16px">
    <div class="card-body">
      <h2 style="margin-bottom: 12px">¿De qué alumno es el dinero?</h2>
      <app-buscador-alumno [soloActivos]="false" (elegidoAlumno)="elegirAlumno($event)" />
    </div>
  </section>

  @if (alumno(); as a) {
    <section class="card" style="margin-bottom: 16px" aria-label="Datos del alumno">
      <div class="card-body ficha">
        <div class="quien">
          <h2 style="margin: 0">{{ cuenta()?.alumnoNombre ?? a.nombreCompleto }}</h2>
          @if (a.estado) { <span class="badge" [class.badge-ok]="a.estado === 'ACTIVO'" [class.badge-gray]="a.estado !== 'ACTIVO'">{{ a.estado }}</span> }
        </div>
        <dl class="ficha-datos">
          @if (a.codigo) { <div><dt>Código</dt><dd>{{ a.codigo }}</dd></div> }
          @if (a.numeroDocumento) { <div><dt>{{ a.tipoDocumento ?? 'Documento' }}</dt><dd>{{ a.numeroDocumento }}</dd></div> }
          <div><dt>Responsable de pago</dt><dd>{{ cuenta()?.responsableNombre ?? '—' }}</dd></div>
        </dl>
        <div>
          <div class="muted" style="font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 6px">Descuento</div>
          @if (descuentos().length) {
            <div class="chips">@for (d of descuentos(); track d.id) { <span class="badge badge-violet" [title]="d.motivo ?? ''">{{ etiquetaDescuento(d) }}</span> }</div>
          } @else {
            <span class="muted">Sin descuento asignado.</span>
          }
          @if (descuentoAplicado() > 0) { <div class="muted" style="margin-top: 4px">Ya descontado en sus cuotas: <strong>S/ {{ descuentoAplicado() | number: '1.2-2' }}</strong></div> }
        </div>
        @if (matricula(); as m) {
          <div aria-label="Matrícula del alumno">
            <div class="muted" style="font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 6px">Matrícula</div>
            <div class="chips">
              <span class="badge" [class.badge-ok]="m.estadoMatricula === 'MATRICULADO'" [class.badge-warn]="m.estadoMatricula === 'PRE_MATRICULA' || m.estadoMatricula === 'POR_APROBAR'" [class.badge-gray]="m.estadoMatricula !== 'MATRICULADO' && m.estadoMatricula !== 'PRE_MATRICULA' && m.estadoMatricula !== 'POR_APROBAR'">{{ estadoMatricula(m.estadoMatricula) }}</span>
            </div>
            <dl class="ficha-datos" style="margin-top: 8px">
              @if (m.detalle?.grado) { <div><dt>Grado</dt><dd>{{ m.detalle!.grado }}@if (m.detalle!.seccion) { · Sección {{ m.detalle!.seccion }} }</dd></div> }
              @if (m.detalle?.turno) { <div><dt>Turno</dt><dd>{{ m.detalle!.turno === 'TARDE' ? 'Tarde' : m.detalle!.turno === 'MANANA' ? 'Mañana' : m.detalle!.turno }}</dd></div> }
              @if (m.detalle; as d) {
                <div><dt>Forma de pago</dt><dd>{{ d.planEtiqueta }}@if (d.planDescuento > 0) { <span class="badge badge-ok" style="margin-left: 6px">{{ d.planDescuento }} % de descuento</span> }</dd></div>
              }
              @if (m.total !== null && m.total !== undefined) {
                <div><dt>Matrícula</dt><dd>S/ {{ m.total | number: '1.2-2' }}@if (m.descuento) { <span class="muted"> (descuento S/ {{ m.descuento | number: '1.2-2' }})</span> }</dd></div>
                <div><dt>Falta pagar</dt><dd [style.color]="m.faltante > 0 ? 'var(--warn)' : 'var(--ok)'">S/ {{ m.faltante | number: '1.2-2' }}@if (m.credito > 0) { <span class="muted"> · a favor S/ {{ m.credito | number: '1.2-2' }}</span> }</dd></div>
              }
            </dl>
            @if (m.estadoMatricula === 'PRE_MATRICULA') {
              @if (m.puedeGenerar) {
                <button type="button" class="btn btn-primary btn-sm" [disabled]="confirmando()" (click)="confirmarMatricula()">{{ confirmando() ? 'Confirmando…' : 'Confirmar matrícula' }}</button>
                <span class="muted" style="margin-left: 8px">Su saldo a favor cubre la matrícula.</span>
              } @else if (m.motivo) {
                <p class="muted" style="margin: 6px 0 0">{{ m.motivo }}</p>
              }
            } @else if (m.estadoMatricula === 'MATRICULADO') {
              <p class="muted" style="margin: 6px 0 0">La matrícula está confirmada: sus pensiones se generan según la forma de pago acordada.</p>
            }
          </div>
        }
        @if (cuenta(); as c) {
          <div class="cifras">
            <div class="cifra"><span>Pagado</span><strong style="color: var(--ok)">S/ {{ c.totalCobrado | number: '1.2-2' }}</strong></div>
            <div class="cifra"><span>Debe ahora</span><strong>S/ {{ totalPendiente() | number: '1.2-2' }}</strong></div>
            <div class="cifra"><span>De eso, vencido</span><strong [style.color]="c.totalVencido > 0 ? 'var(--danger)' : ''">S/ {{ c.totalVencido | number: '1.2-2' }}</strong></div>
            <div class="cifra"><span>A favor en su cuenta</span><strong>S/ {{ (credito()?.saldo ?? 0) | number: '1.2-2' }}</strong></div>
          </div>
        } @else if (cargandoCuenta()) {
          <p class="muted" style="margin: 0">Cargando la cuenta…</p>
        }
      </div>
    </section>

    <div class="dos">
      <!-- Recibir pago en efectivo -->
      <section class="card" aria-labelledby="t-recibir">
        <div class="card-body">
          <h2 id="t-recibir" style="margin-bottom: 4px">Recibir pago</h2>
          <p class="muted" style="margin-top: 0">El dinero se aplica solo a sus cuotas pendientes, de la más antigua a la más nueva.</p>
          @if (cuenta() && pagables().length === 0) {
            <div class="vacio-card">No tiene cuotas pendientes. Si entrega dinero, agrégalo a su cuenta.</div>
          } @else {
            @if (sugeridos(); as sg) {
              <div class="atajos" role="group" aria-label="Montos sugeridos">
                <span class="muted">Ya viene lo que debe ahora. Cobrar:</span>
                <button type="button" class="chip" [class.on]="montoActual() === sg.ahora" (click)="usarMonto(sg.ahora)">Lo que debe ahora · S/ {{ sg.ahora | number: '1.2-2' }}</button>
                @if (sg.todo !== sg.ahora) { <button type="button" class="chip" [class.on]="montoActual() === sg.todo" (click)="usarMonto(sg.todo)">Todo lo pendiente · S/ {{ sg.todo | number: '1.2-2' }}</button> }
                @if (sg.proxima !== sg.ahora && sg.proxima !== sg.todo) { <button type="button" class="chip" [class.on]="montoActual() === sg.proxima" (click)="usarMonto(sg.proxima)">Solo la próxima cuota · S/ {{ sg.proxima | number: '1.2-2' }}</button> }
              </div>
            }
            <div class="field">
              <label for="efectivo">Efectivo recibido (S/)</label>
              <input id="efectivo" class="input monto-input" type="number" min="0" step="0.10" inputmode="decimal" [formControl]="efectivo" />
            </div>
            @if (reparto(); as r) {
              @if (r.lista.length) {
                <ul class="reparto" aria-label="A qué cuotas se aplica">
                  @for (x of r.lista; track x.cuota.id) {
                    <li><span>{{ x.cuota.descripcion }}@if (x.monto < x.cuota.saldo) { <span class="muted"> (queda S/ {{ x.cuota.saldo - x.monto | number: '1.2-2' }})</span> }</span><strong>S/ {{ x.monto | number: '1.2-2' }}</strong></li>
                  }
                </ul>
              }
              @if (r.sobrante > 0) {
                <div class="aviso aviso-warn" style="margin-top: 10px" role="status">Sobran <strong>S/ {{ r.sobrante | number: '1.2-2' }}</strong>: es más de lo que debe (S/ {{ totalPendiente() | number: '1.2-2' }}). Baja el monto o agrega la diferencia a su cuenta.</div>
              }
            }
            @if (errorCobro()) { <div class="aviso aviso-danger" style="margin-top: 10px" role="alert">{{ errorCobro() }}</div> }
            <button type="button" class="btn btn-primary" style="margin-top: 14px; min-height: 48px; padding: 0 24px" [disabled]="cobrando() || efectivo.invalid || !reparto().lista.length || reparto().sobrante > 0" (click)="cobrar()">
              {{ cobrando() ? 'Registrando…' : 'Registrar pago' }}
            </button>
          }
        </div>
      </section>

      <!-- Agregar dinero a la cuenta del alumno -->
      <section class="card" aria-labelledby="t-agregar">
        <div class="card-body">
          <h2 id="t-agregar" style="margin-bottom: 4px">Agregar dinero a su cuenta</h2>
          <p class="muted" style="margin-top: 0">Queda a favor del alumno y se descuenta de las pensiones cuando vencen.</p>
          @if (credito(); as cr) {
            <div class="credito-linea" style="margin-bottom: 12px">
              <span>En su cuenta ahora: <strong>S/ {{ cr.saldo | number: '1.2-2' }}</strong></span>
              @if (puedeUsarCredito()) { <button type="button" class="btn btn-sm" (click)="usarCredito()">Pagar lo vencido con su cuenta</button> }
            </div>
          }
          <div class="field">
            <label for="aporte">Dinero a agregar (S/)</label>
            <input id="aporte" class="input monto-input" type="number" min="0" step="0.10" inputmode="decimal" [formControl]="aporte" />
          </div>
          @if (errorAporte()) { <div class="aviso aviso-danger" style="margin-top: 10px" role="alert">{{ errorAporte() }}</div> }
          <button type="button" class="btn btn-primary" style="margin-top: 14px; min-height: 48px; padding: 0 24px" [disabled]="aportando() || aporte.invalid" (click)="agregar()">
            {{ aportando() ? 'Agregando…' : 'Agregar a su cuenta' }}
          </button>
        </div>
      </section>
    </div>
  }

  <div class="bloque" [style.margin-top.px]="alumno() ? 16 : 0">
    <!-- Pagos de apoderados por aprobar -->
    @if (porAprobar().length) {
      <section class="card destacada" aria-labelledby="t-aprobar">
        <div class="card-body">
          <h2 id="t-aprobar" style="margin-bottom: 4px">Pagos por aprobar <span class="badge badge-violet">{{ porAprobar().length }}</span></h2>
          <p class="muted" style="margin-top: 0">Pagos en línea de los apoderados: verifica que llegó el dinero y apruébalos.</p>
          @for (p of porAprobar(); track p.id) {
            <article class="por-aprobar">
              <div class="pa-cab"><strong>{{ nombres.nombre(p.alumnoId) }}</strong><strong>S/ {{ p.montoTotal | number: '1.2-2' }}</strong></div>
              <div class="muted">
                {{ p.pagadoEn | date: 'dd/MM HH:mm' }} · {{ p.medio.replace('_', ' / ') }}@if (p.referencia) { · Op. {{ p.referencia }} }
                @if (p.pagadorNombre) { <div>Pagó: {{ p.pagadorNombre }}</div> }
              </div>
              <ul class="pa-cuotas">@for (d of p.detalles; track d.id) { <li>{{ d.cuotaDescripcion }} · S/ {{ d.montoAplicado | number: '1.2-2' }}</li> }</ul>
              <div class="toolbar">
                <button type="button" class="btn btn-primary" [disabled]="resolviendo() === p.id" (click)="aprobar(p)" [attr.aria-label]="'Aprobar el pago de ' + nombres.nombre(p.alumnoId)">Aprobar</button>
                <button type="button" class="btn" [disabled]="resolviendo() === p.id" (click)="pedirRechazo(p)" [attr.aria-label]="'Rechazar el pago de ' + nombres.nombre(p.alumnoId)">Rechazar</button>
              </div>
            </article>
          }
        </div>
      </section>
    }

    <!-- Matrículas por pagar: alumnos con pre-matrícula que aún deben la matrícula -->
    <section class="card" [class.destacada]="matriculasPorPagar().length" aria-labelledby="t-matriculas">
      <div class="card-body">
        <div class="toolbar" style="justify-content: space-between">
          <h2 id="t-matriculas" style="margin: 0">Matrículas por pagar <span class="badge" [class.badge-violet]="matriculasPorPagar().length" [class.badge-gray]="!matriculasPorPagar().length">{{ matriculasPorPagar().length }}</span></h2>
        </div>
        <p class="muted" style="margin: 6px 0 10px">Alumnos que se están matriculando y aún deben la matrícula. Al pagarla completa (aquí, con la pasarela o con su crédito) la matrícula se genera sola.</p>
        @for (m of verMatriculas(); track m.matriculaId) {
          <div class="fila">
            <div class="nombre"><strong>{{ m.alumnoNombre }}</strong><span class="muted">Matrícula S/ {{ m.saldo | number: '1.2-2' }}@if (m.credito > 0) { · a favor S/ {{ m.credito | number: '1.2-2' }} }</span>
              @if (m.detalle; as d) { <span class="muted">@if (d.grado) { {{ d.grado }}@if (d.seccion) { · Sección {{ d.seccion }} } · }Pago {{ d.planEtiqueta.toLowerCase() }}@if (d.planDescuento > 0) { (−{{ d.planDescuento }} %) }</span> }
            </div>
            @if (m.descuentoEnRevision) {
              <span class="badge badge-violet" title="La secretaría debe aprobar el descuento antes de cobrar">Descuento en revisión</span>
              <button type="button" class="btn btn-sm" disabled>Cobrar</button>
            } @else {
              <span class="debe" style="color: var(--warn)">Falta S/ {{ m.faltante | number: '1.2-2' }}</span>
              <button type="button" class="btn btn-sm" (click)="cobrarMatricula(m)" [attr.aria-label]="'Cobrar la matrícula de ' + m.alumnoNombre">Cobrar</button>
            }
          </div>
        } @empty {
          <p class="muted" style="margin: 0">No hay matrículas esperando pago.</p>
        }
        @if (matriculasPorPagar().length > verMatriculas().length) { <p class="muted" style="margin: 10px 0 0">y {{ matriculasPorPagar().length - verMatriculas().length }} más.</p> }
      </div>
    </section>

    <!-- Morosos: el aviso a las familias sale solo -->
    <section class="card" aria-labelledby="t-morosos">
      <div class="card-body">
        <div class="toolbar" style="justify-content: space-between">
          <h2 id="t-morosos" style="margin: 0">Morosos <span class="badge" [class.badge-danger]="totalMorosos() > 0" [class.badge-gray]="!totalMorosos()">{{ totalMorosos() }}</span></h2>
          @if (totalMorosos() > 0) { <span class="muted">Deuda vencida: <strong style="color: var(--danger)">S/ {{ deudaMorosos() | number: '1.2-2' }}</strong></span> }
        </div>
        <div class="aviso aviso-ok" style="margin: 10px 0" role="status">Las familias reciben el aviso <strong>solas</strong>: uno antes de que venza la cuota y otro el día que vence. No hace falta enviar nada.</div>
        @if (cargandoMorosos()) {
          <p class="muted">Cargando…</p>
        } @else {
          @for (m of verMorosos(); track m.alumnoId) {
            <div class="fila">
              <div class="nombre"><strong>{{ m.alumnoNombre }}</strong><span class="muted">{{ m.responsableNombre || 'Sin responsable' }} · {{ m.cuotasVencidas }} {{ m.cuotasVencidas === 1 ? 'cuota vencida' : 'cuotas vencidas' }}</span></div>
              <span class="debe">S/ {{ m.saldoTotalVencido | number: '1.2-2' }}</span>
              <button type="button" class="btn btn-sm" (click)="cobrarA(m)" [attr.aria-label]="'Cobrar a ' + m.alumnoNombre">Cobrar</button>
            </div>
          } @empty {
            <p class="muted" style="margin: 0">No hay alumnos con cuotas vencidas.</p>
          }
          @if (totalMorosos() > verMorosos().length) { <p class="muted" style="margin: 10px 0 0">y {{ totalMorosos() - verMorosos().length }} más (en Alumnos → Morosos).</p> }
        }
      </div>
    </section>
  </div>
</div>

@if (rechazando(); as p) {
  <app-modal titulo="Rechazar el pago" [ancho]="460" (cerrar)="rechazando.set(null)">
    <p style="margin-top: 0">Pago de <strong>S/ {{ p.montoTotal | number: '1.2-2' }}</strong> de {{ nombres.nombre(p.alumnoId) }}. Las cuotas siguen pendientes y el apoderado verá el motivo.</p>
    <div class="field">
      <label for="rz-motivo">Motivo</label>
      <input id="rz-motivo" class="input" [formControl]="motivoRechazo" maxlength="300" placeholder="Ej.: el número de operación no existe" />
    </div>
    @if (errorRechazo()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorRechazo() }}</div> }
    <ng-container footer>
      <button type="button" class="btn" (click)="rechazando.set(null)">Cancelar</button>
      <button type="button" class="btn btn-danger" [disabled]="resolviendo() === p.id" (click)="rechazar(p)">Rechazar pago</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="12-cajacomponentts"></a>
## 12. `caja.component.ts` — Feature Ventanilla de Caja

**Ruta del archivo:** `frontend/src/app/features/caja/caja.component.ts`

### **¿Qué hace este archivo?**
Componente TypeScript de la ventanilla de caja. Maneja la apertura de caja del cajero, la búsqueda interactiva del alumno mediante el buscador por DNI/nombre, la selección de cuotas pendientes con cálculo automático del total a cobrar, y el envío del pago usando UUID como idempotencyKey para garantizar cobros únicos y seguros.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AlumnoResumen } from '../../core/models/alumno.model';
import { Colegio } from '../../core/models/planificacion.model';
import { CreditoAlumno, Cuota, DescuentoDelAlumno, EstadoCuenta, EstadoMatriculaPago, MatriculaPorPagar, Pago } from '../../core/models/cobro.model';
import { DetalleMoroso } from '../../core/models/pago.model';
import { AlumnoService } from '../../core/services/alumno.service';
import { AuthService } from '../../core/services/auth.service';
import { CobroService } from '../../core/services/cobro.service';
import { NombresAlumnoService } from '../../core/services/nombres-alumno.service';
import { NotificationService } from '../../core/services/notification.service';
import { PagoConfigService } from '../../core/services/pago-config.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { uuid } from '../../core/utils/uuid';
import { BuscadorAlumnoComponent } from '../../shared/components/buscador-alumno/buscador-alumno.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { puedeCobrarAhora } from '../pagos/cuentas/credito';
import { montosSugeridos } from './monto-sugerido';
import { ReciboVista, armarRecibo, descuentoEnCuotas, etiquetaDescuento, lineaColegio } from './recibo';

const PAGABLES = ['PENDIENTE', 'VENCIDA', 'PARCIAL'];
const MAX_MOROSOS = 8;
const r2 = (n: number): number => Math.round(n * 100) / 100;

/** Cuánto del efectivo recibido cubre cada cuota (de la más antigua a la más nueva). */
interface Reparto {
  cuota: Cuota;
  monto: number;
}

/**
 * Inicio de caja, lo más simple posible: se elige al alumno y se anota el efectivo que entrega.
 *  - «Recibir pago»: el dinero se aplica solo a sus cuotas pendientes, de la más antigua a la más nueva.
 *  - «Agregar dinero a su cuenta»: queda a favor del alumno y se descuenta de las pensiones cuando vencen.
 * La caja se abre sola la primera vez (el servidor la pide para recibir efectivo), así que no hay apertura ni cierre que atender.
 * Abajo: los pagos de apoderados por aprobar y los morosos (a las familias les llega el aviso solo).
 */
@Component({
  selector: 'app-caja',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, BuscadorAlumnoComponent, ModalComponent, PageHeaderComponent],
  templateUrl: './caja.component.html',
  styles: `
    .dos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: start; }
    .bloque { display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px; }
    .quien { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 6px 16px; }
    .atajos { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; margin-bottom: 12px; }
    .chip { padding: 6px 12px; border: 1.5px solid var(--line-2); border-radius: 999px; background: var(--card); font: inherit; font-size: .85rem; font-weight: 600; color: var(--ink-2); cursor: pointer; }
    .chip:hover { border-color: var(--primary); }
    .chip.on { border-color: var(--primary); background: var(--primary-soft); color: var(--primary); }
    .monto-input { font-size: 1.6rem; font-weight: 700; max-width: 220px; min-height: 52px; }
    .reparto { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; font-size: .9rem; }
    .reparto li { display: flex; justify-content: space-between; gap: 12px; }
    .vacio-card { padding: 22px; text-align: center; color: var(--ink-2); border: 2px dashed var(--line-2); border-radius: 14px; }
    .credito-linea { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 10px 14px; border-radius: 12px; background: var(--ok-soft); }
    .fila { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 14px; align-items: center; padding: 10px 0; border-top: 1px solid var(--line); }
    .fila:first-of-type { border-top: 0; }
    .fila .debe { font-variant-numeric: tabular-nums; font-weight: 700; color: var(--danger); }
    .nombre { display: flex; flex-direction: column; min-width: 0; }
    .nombre strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .destacada { border: 1.5px solid var(--violet, #6b4fd8); }
    .por-aprobar { display: flex; flex-direction: column; gap: 6px; padding: 12px 0; border-top: 1px solid var(--line); }
    .por-aprobar:first-of-type { border-top: 0; }
    .pa-cab { display: flex; justify-content: space-between; gap: 10px; }
    .pa-cuotas { margin: 0; padding-left: 18px; font-size: .85rem; color: var(--ink-2); }
    .ficha { display: grid; gap: 14px; }
    .ficha-datos { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px 18px; margin: 0; }
    .ficha-datos div { display: flex; flex-direction: column; }
    .ficha-datos dt { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .ficha-datos dd { margin: 0; font-weight: 600; }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
    .cifra { display: flex; flex-direction: column; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .cifra span { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .cifra strong { font-size: 1.15rem; font-variant-numeric: tabular-nums; }
    .barra-recibo { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
    .barra-recibo .espacio { flex: 1; }
    /* El recibo: papel blanco; al imprimir solo sale esta hoja (ver styles.css) */
    .hoja-recibo { width: min(100%, 720px); margin: 0 auto 24px; padding: 40px 48px; background: #fff; color: #1a1f2e; border: 1px solid var(--line); border-radius: 6px; box-shadow: 0 10px 30px -18px rgb(0 0 0 / .35); font-family: Georgia, 'Times New Roman', serif; line-height: 1.5; }
    .rc-cab { display: flex; align-items: center; gap: 14px; padding-bottom: 12px; border-bottom: 2px solid #1a1f2e; }
    .rc-cab img { width: 56px; height: 56px; }
    .rc-cab div { display: flex; flex-direction: column; }
    .rc-cab small, .rc-cab em { font-size: .78rem; color: #4a5266; }
    .rc-titulo { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin: 18px 0 12px; }
    .rc-titulo h1 { margin: 0; font-size: 1.3rem; text-transform: uppercase; letter-spacing: .08em; }
    .rc-datos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 24px; margin: 0 0 14px; }
    .rc-datos div { display: flex; flex-direction: column; padding: 3px 0; border-bottom: 1px solid #e4e8f1; }
    .rc-datos dt { font-size: .7rem; color: #4a5266; text-transform: uppercase; letter-spacing: .05em; }
    .rc-datos dd { margin: 0; font-weight: 600; }
    .rc-tabla { width: 100%; border-collapse: collapse; font-size: .85rem; margin-bottom: 12px; }
    .rc-tabla th, .rc-tabla td { padding: 6px 8px; border: 1px solid #cfd5e3; text-align: left; }
    .rc-tabla th { background: #f1f4fa; font-size: .72rem; text-transform: uppercase; letter-spacing: .04em; }
    .rc-tabla .num { text-align: right; font-variant-numeric: tabular-nums; }
    .rc-total { display: flex; justify-content: flex-end; align-items: baseline; gap: 16px; padding-top: 8px; border-top: 2px solid #1a1f2e; font-size: 1.2rem; }
    .rc-pie { margin-top: 36px; display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; font-size: .8rem; color: #4a5266; }
    .rc-firma { width: 200px; text-align: center; }
    .rc-firma .linea { display: block; border-top: 1.5px solid #1a1f2e; margin-bottom: 4px; }
    @media (max-width: 720px) { .hoja-recibo { padding: 22px 16px; } .rc-datos { grid-template-columns: 1fr; } }
    @media (max-width: 900px) { .dos { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class CajaComponent implements OnInit {
  private readonly api = inject(CobroService);
  private readonly config = inject(PagoConfigService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  protected readonly nombres = inject(NombresAlumnoService);
  private readonly alumnosApi = inject(AlumnoService);
  private readonly plan = inject(PlanificacionService);
  private readonly cajero = inject(AuthService).currentUser;

  // --- el alumno ---
  protected readonly alumno = signal<AlumnoResumen | null>(null);
  protected readonly cuenta = signal<EstadoCuenta | null>(null);
  protected readonly credito = signal<CreditoAlumno | null>(null);
  /** Descuentos que tiene asignados el alumno (por nombre) y lo que ya llevan descontado sus cuotas. */
  protected readonly descuentos = signal<DescuentoDelAlumno[]>([]);
  protected readonly etiquetaDescuento = etiquetaDescuento;
  protected readonly descuentoAplicado = computed(() => descuentoEnCuotas(this.cuenta()?.cuotas ?? []));
  protected readonly cargandoCuenta = signal(false);
  protected readonly pagables = computed(() => (this.cuenta()?.cuotas ?? []).filter(c => PAGABLES.includes(c.estado)));
  protected readonly totalPendiente = computed(() => r2(this.pagables().reduce((s, c) => s + c.saldo, 0)));
  /** Lo que Caja sugiere cobrar: lo que debe ahora (vencido, hoy y matrícula), todo lo pendiente o solo la próxima cuota. */
  protected readonly sugeridos = computed(() => montosSugeridos(this.cuenta()?.cuotas ?? []));
  protected readonly montoActual = computed(() => r2(this.montoEfectivo()));
  protected readonly puedeUsarCredito = computed(() => (this.credito() ? puedeCobrarAhora(this.credito()!) : false));

  // --- recibir pago en efectivo ---
  protected readonly efectivo = this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]);
  private readonly montoEfectivo = signal(0);
  protected readonly cobrando = signal(false);
  protected readonly errorCobro = signal<string | null>(null);
  protected readonly recibo = signal<ReciboVista | null>(null);
  protected readonly colegio = signal<Colegio | null>(null);
  protected readonly lineaColegio = lineaColegio;
  /** Una clave por intento: pulsar «Registrar» dos veces no cobra dos veces. */
  private claveCobro = uuid();
  /** A qué cuotas va el dinero y si sobra algo. */
  protected readonly reparto = computed(() => {
    let resto = r2(this.montoEfectivo());
    const lista: Reparto[] = [];
    for (const cuota of this.pagables()) {
      if (resto <= 0) break;
      const monto = r2(Math.min(resto, cuota.saldo));
      lista.push({ cuota, monto });
      resto = r2(resto - monto);
    }
    return { lista, sobrante: resto };
  });

  // --- agregar dinero a la cuenta ---
  protected readonly aporte = this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]);
  protected readonly aportando = signal(false);
  protected readonly errorAporte = signal<string | null>(null);
  private claveAporte = uuid();

  // --- pagos de apoderados por aprobar ---
  protected readonly porAprobar = signal<Pago[]>([]);
  protected readonly resolviendo = signal<number | null>(null);
  protected readonly rechazando = signal<Pago | null>(null);
  protected readonly motivoRechazo = this.fb.nonNullable.control('');
  protected readonly errorRechazo = signal<string | null>(null);

  // --- matrícula del alumno elegido: detalle (grado, sección, forma de pago) y confirmación ---
  protected readonly matricula = signal<EstadoMatriculaPago | null>(null);
  protected readonly confirmando = signal(false);
  protected readonly estadoMatricula = (e: string): string =>
    ({ PRE_MATRICULA: 'Pre-matrícula', POR_APROBAR: 'Por aprobar', MATRICULADO: 'Matrícula confirmada', RETIRADO: 'Retirado', ANULADO: 'Anulada', TRASLADADO: 'Trasladado' } as Record<string, string>)[e] ?? e;

  // --- matrículas por pagar: alumnos con pre-matrícula que aún deben la matrícula ---
  protected readonly matriculasPorPagar = signal<MatriculaPorPagar[]>([]);
  protected readonly verMatriculas = computed(() => this.matriculasPorPagar().slice(0, MAX_MOROSOS));

  // --- morosos ---
  protected readonly morosos = signal<DetalleMoroso[]>([]);
  protected readonly totalMorosos = signal(0);
  protected readonly deudaMorosos = signal(0);
  protected readonly cargandoMorosos = signal(true);
  protected readonly verMorosos = computed(() => this.morosos().slice(0, MAX_MOROSOS));

  private cajaLista = false;

  constructor() {
    this.efectivo.valueChanges.subscribe(v => this.montoEfectivo.set(Number(v) || 0));
  }

  ngOnInit(): void {
    this.cargarPorAprobar();
    this.cargarMorosos();
    this.cargarMatriculasPorPagar();
    this.plan.colegio().pipe(catchError(() => of(null))).subscribe(c => this.colegio.set(c));
  }

  /** El servidor pide una caja abierta para recibir efectivo: se abre sola (con S/ 0) la primera vez, sin que la persona tenga que saberlo. */
  private asegurarCaja(): Observable<void> {
    if (this.cajaLista) return of(undefined);
    return this.api.cajaActual().pipe(
      catchError((e: HttpErrorResponse) => (e.status === 404 ? this.api.abrirCaja(0) : throwError(() => e))),
      tap(() => (this.cajaLista = true)),
      map(() => undefined)
    );
  }

  // ---------- Elegir alumno ----------
  protected elegirAlumno(a: AlumnoResumen | null): void {
    this.limpiar();
    this.alumno.set(a);
    if (a) this.cargarCuenta(a.id);
  }

  /** Desde la lista de morosos: se abre la cuenta de ese alumno para cobrarle. */
  protected cobrarA(m: DetalleMoroso): void {
    this.limpiar();
    this.alumno.set({ id: m.alumnoId, nombreCompleto: m.alumnoNombre } as AlumnoResumen);
    this.cargarCuenta(m.alumnoId);
    // Código y documento: se completan buscándolo por su nombre (caja solo recibe el resumen del alumno).
    this.alumnosApi.listar(m.alumnoNombre, '', 0, 5).pipe(catchError(() => of(null))).subscribe(p => {
      const f = p?.contenido.find(x => x.id === m.alumnoId);
      if (f && this.alumno()?.id === f.id) this.alumno.set(f);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private limpiar(): void {
    this.alumno.set(null);
    this.cuenta.set(null);
    this.credito.set(null);
    this.descuentos.set([]);
    this.matricula.set(null);
    this.efectivo.setValue(0);
    this.aporte.setValue(0);
    this.errorCobro.set(null);
    this.errorAporte.set(null);
    this.claveCobro = uuid();
    this.claveAporte = uuid();
  }

  private cargarCuenta(alumnoId: number): void {
    this.cargandoCuenta.set(true);
    this.api.estadoCuenta(alumnoId).subscribe({
      // El efectivo ya viene con lo que debe ahora: quien cobra no tiene que escribirlo (puede cambiarlo si pagan menos).
      next: c => { this.cuenta.set(c); this.cargandoCuenta.set(false); this.efectivo.setValue(this.sugeridos().ahora); },
      error: e => { this.cargandoCuenta.set(false); this.avisos.error(mensajeError(e, 'No se pudo cargar la cuenta del alumno.')); }
    });
    this.api.credito(alumnoId).subscribe({ next: c => this.credito.set(c), error: () => this.credito.set(null) });
    this.api.descuentosDe(alumnoId).subscribe({ next: d => this.descuentos.set(d), error: () => this.descuentos.set([]) });
    this.cargarMatricula(alumnoId);
  }

  /** La matrícula del alumno (si la tiene): grado, sección, forma de pago y si ya se puede confirmar. Sin matrícula simplemente no se muestra. */
  private cargarMatricula(alumnoId: number): void {
    this.api.matriculaDe(alumnoId).subscribe({
      next: m => { if (this.alumno()?.id === alumnoId) this.matricula.set(m); },
      error: () => this.matricula.set(null)
    });
  }

  /** Confirma la matrícula: el servidor valida todo (pagada o con el crédito suficiente, sin descuento en revisión) y la genera. */
  protected confirmarMatricula(): void {
    const a = this.alumno();
    if (!a || this.confirmando()) return;
    this.confirmando.set(true);
    this.api.generarMatricula(a.id).subscribe({
      next: m => {
        this.confirmando.set(false);
        this.matricula.set(m);
        this.avisos.success(`La matrícula de ${a.nombreCompleto} quedó confirmada.`);
        this.recargar();
      },
      error: e => { this.confirmando.set(false); this.avisos.error(mensajeError(e, 'No se pudo confirmar la matrícula.')); }
    });
  }

  private recargar(): void {
    const a = this.alumno();
    if (a) this.cargarCuenta(a.id);
    this.cargarMorosos();
    this.cargarMatriculasPorPagar();
  }

  // ---------- Recibir pago ----------
  protected cobrar(): void {
    const a = this.alumno();
    const { lista, sobrante } = this.reparto();
    const total = r2(this.montoEfectivo());
    if (!a || !lista.length || sobrante > 0 || total <= 0) return;
    const cuotasAntes = [...this.pagables()];
    this.cobrando.set(true);
    this.errorCobro.set(null);
    this.asegurarCaja()
      .pipe(switchMap(() => this.api.registrar({
        alumnoId: a.id,
        pagadorNombre: this.cuenta()?.responsableNombre || undefined,
        montoTotal: total,
        medio: 'EFECTIVO',
        idempotencyKey: this.claveCobro,
        tipoComprobante: 'RECIBO',
        detalles: lista.map(r => ({ cuotaId: r.cuota.id, montoAplicado: r.monto }))
      })))
      .subscribe({
        next: p => {
          this.cobrando.set(false);
          this.recibo.set(armarRecibo(p, cuotasAntes, {
            alumno: this.cuenta()?.alumnoNombre ?? a.nombreCompleto,
            codigo: a.codigo,
            documento: a.numeroDocumento ? `${a.tipoDocumento ?? 'DNI'} ${a.numeroDocumento}` : undefined,
            responsable: this.cuenta()?.responsableNombre || undefined,
            cajero: this.cajero()?.username ?? ''
          }));
          this.avisos.success('Pago registrado.');
          queueMicrotask(() => document.querySelector('.hoja-recibo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
          this.efectivo.setValue(0);
          this.claveCobro = uuid();
          this.recargar();
        },
        error: e => { this.cobrando.set(false); this.errorCobro.set(mensajeError(e, 'No se pudo registrar el pago.')); }
      });
  }

  /** Un atajo de monto: cobrar todo lo pendiente o solo la próxima cuota. */
  protected usarMonto(monto: number): void {
    this.efectivo.setValue(monto);
  }

  protected cerrarRecibo(): void {
    this.recibo.set(null);
  }

  protected imprimir(): void {
    window.print();
  }

  // ---------- Agregar dinero a la cuenta ----------
  protected agregar(): void {
    const a = this.alumno();
    const monto = r2(Number(this.aporte.value) || 0);
    if (!a || monto <= 0) return;
    this.aportando.set(true);
    this.errorAporte.set(null);
    this.asegurarCaja()
      .pipe(switchMap(() => this.api.depositarCredito(a.id, { monto, medio: 'EFECTIVO', idempotencyKey: this.claveAporte })))
      .subscribe({
        next: r => {
          this.aportando.set(false);
          this.avisos.success(r.aplicado > 0
            ? `Dinero agregado a la cuenta. Se usaron S/ ${r.aplicado.toFixed(2)} para pagar lo vencido.`
            : 'Dinero agregado a la cuenta del alumno.');
          this.aporte.setValue(0);
          this.claveAporte = uuid();
          this.recargar();
        },
        error: e => { this.aportando.set(false); this.errorAporte.set(mensajeError(e, 'No se pudo agregar el dinero.')); }
      });
  }

  protected usarCredito(): void {
    const a = this.alumno();
    if (!a) return;
    this.api.cobrarDelCredito(a.id).subscribe({
      next: r => { this.avisos.success(r.aplicado > 0 ? `Se pagaron S/ ${r.aplicado.toFixed(2)} de lo vencido con su cuenta.` : 'No había nada vencido que pagar.'); this.recargar(); },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo usar el dinero de la cuenta.'))
    });
  }

  // ---------- Matrículas por pagar ----------
  private cargarMatriculasPorPagar(): void {
    this.api.matriculasPorPagar().subscribe({ next: l => this.matriculasPorPagar.set(l), error: () => this.matriculasPorPagar.set([]) });
  }

  /** Desde la lista de matrículas por pagar: se abre la cuenta del alumno para cobrarle (la matrícula entra en sus cuotas pendientes). */
  protected cobrarMatricula(m: MatriculaPorPagar): void {
    this.limpiar();
    this.alumno.set({ id: m.alumnoId, nombreCompleto: m.alumnoNombre } as AlumnoResumen);
    this.cargarCuenta(m.alumnoId);
    this.alumnosApi.listar(m.alumnoNombre, '', 0, 5).pipe(catchError(() => of(null))).subscribe(p => {
      const f = p?.contenido.find(x => x.id === m.alumnoId);
      if (f && this.alumno()?.id === f.id) this.alumno.set(f);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------- Morosos ----------
  private cargarMorosos(): void {
    this.config.morosos().subscribe({
      next: m => {
        this.morosos.set([...m.listaMorosos].sort((a, b) => b.saldoTotalVencido - a.saldoTotalVencido));
        this.totalMorosos.set(m.totalAlumnosMorosos);
        this.deudaMorosos.set(m.totalDeudaAcumulada);
        this.cargandoMorosos.set(false);
      },
      error: () => { this.morosos.set([]); this.cargandoMorosos.set(false); }
    });
  }

  // ---------- Pagos de apoderados por aprobar ----------
  protected cargarPorAprobar(): void {
    this.api.porAprobar().subscribe({
      next: l => { this.porAprobar.set(l); this.nombres.cargar(l.map(p => p.alumnoId)); },
      error: () => this.porAprobar.set([])
    });
  }

  protected aprobar(p: Pago): void {
    this.resolviendo.set(p.id);
    this.api.aprobar(p.id).subscribe({
      next: r => {
        this.resolviendo.set(null);
        this.avisos.success(`Pago aprobado${r.comprobante ? ': ' + r.comprobante.numeroCompleto : ''}.`);
        this.cargarPorAprobar();
        this.cargarMorosos();
      },
      error: e => { this.resolviendo.set(null); this.avisos.error(mensajeError(e, 'No se pudo aprobar el pago.')); this.cargarPorAprobar(); }
    });
  }

  protected pedirRechazo(p: Pago): void {
    this.motivoRechazo.setValue('');
    this.errorRechazo.set(null);
    this.rechazando.set(p);
  }

  protected rechazar(p: Pago): void {
    const motivo = this.motivoRechazo.value.trim();
    if (!motivo) {
      this.errorRechazo.set('El motivo es obligatorio: el apoderado lo verá.');
      return;
    }
    this.resolviendo.set(p.id);
    this.api.rechazar(p.id, motivo).subscribe({
      next: () => { this.resolviendo.set(null); this.rechazando.set(null); this.avisos.success('Pago rechazado. El apoderado verá el motivo.'); this.cargarPorAprobar(); },
      error: e => { this.resolviendo.set(null); this.errorRechazo.set(mensajeError(e)); }
    });
  }
}
```

---

<a id="13-monto-sugeridots"></a>
## 13. `monto-sugerido.ts` — Feature Ventanilla de Caja

**Ruta del archivo:** `frontend/src/app/features/caja/monto-sugerido.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `monto-sugerido`.

```typescript
import { Cuota } from '../../core/models/cobro.model';

const PAGABLES = ['PENDIENTE', 'PARCIAL', 'VENCIDA'];
const r2 = (n: number): number => Math.round(n * 100) / 100;

export interface MontosSugeridos {
  /** Lo que debe ahora: lo vencido, lo que vence hoy y la matrícula. Si no debe nada ahora, la próxima cuota. */
  ahora: number;
  /** Todo lo pendiente, también lo que aún no vence. */
  todo: number;
  /** Solo la próxima cuota. */
  proxima: number;
}

/** «2026-11-05» de hoy, en hora local. */
export function hoyIso(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Lo que Caja cobra sin tener que escribirlo: «lo que debe ahora» (vencido, lo que vence hoy y la matrícula), con atajos para cobrar todo lo
 * pendiente o solo la próxima cuota. El dinero se aplica a las cuotas de la más antigua a la más nueva, así que estos montos nunca sobran.
 */
export function montosSugeridos(
  cuotas: readonly Pick<Cuota, 'estado' | 'saldo' | 'fechaVencimiento' | 'conceptoTipo' | 'diasAtraso'>[],
  hoy: string = hoyIso()
): MontosSugeridos {
  const pendientes = cuotas
    .filter(c => PAGABLES.includes(c.estado) && c.saldo > 0)
    .sort((a, b) => a.fechaVencimiento.localeCompare(b.fechaVencimiento));
  const todo = r2(pendientes.reduce((s, c) => s + c.saldo, 0));
  const proxima = pendientes.length ? r2(pendientes[0].saldo) : 0;
  const exigibles = pendientes.filter(c => c.estado === 'VENCIDA' || c.diasAtraso > 0 || c.fechaVencimiento <= hoy || c.conceptoTipo === 'MATRICULA');
  const ahora = exigibles.length ? r2(exigibles.reduce((s, c) => s + c.saldo, 0)) : proxima;
  return { ahora, todo, proxima };
}
```

---

<a id="14-recibots"></a>
## 14. `recibo.ts` — Feature Ventanilla de Caja

**Ruta del archivo:** `frontend/src/app/features/caja/recibo.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `recibo`.

```typescript
import { Cuota, DescuentoDelAlumno, Pago } from '../../core/models/cobro.model';
import { Colegio } from '../../core/models/planificacion.model';

/** Una cuota pagada en el recibo, con lo que el alumno necesita ver: el importe, el descuento que tuvo y cuánto queda. */
export interface LineaRecibo {
  descripcion: string;
  importe: number;
  descuento: number;
  mora: number;
  pagado: number;
  saldo: number;
}

export interface ReciboVista {
  pago: Pago;
  alumno: string;
  codigo?: string;
  documento?: string;
  responsable?: string;
  cajero: string;
  lineas: LineaRecibo[];
  hayMora: boolean;
  totalDescuento: number;
}

const r2 = (n: number): number => Math.round(n * 100) / 100;

/**
 * Arma lo que se imprime en el recibo con el pago ya registrado y las cuotas tal como estaban al cobrar
 * (el importe y el descuento salen de la cuota; lo pagado y lo que queda, de la respuesta del servidor).
 */
export function armarRecibo(
  pago: Pago,
  cuotas: readonly Cuota[],
  datos: { alumno: string; codigo?: string; documento?: string; responsable?: string; cajero: string }
): ReciboVista {
  const lineas: LineaRecibo[] = pago.detalles.map(d => {
    const c = cuotas.find(x => x.id === d.cuotaId);
    return {
      descripcion: d.cuotaDescripcion,
      importe: c ? c.montoBase : d.montoAplicado,
      descuento: c ? c.descuento : 0,
      mora: c ? c.mora : 0,
      pagado: d.montoAplicado,
      saldo: d.nuevoSaldoCuota
    };
  });
  return {
    pago,
    ...datos,
    lineas,
    hayMora: lineas.some(l => l.mora > 0),
    totalDescuento: r2(lineas.reduce((s, l) => s + l.descuento, 0))
  };
}

/** «Hermanos · 5 %» o «Beca · S/ 50.00». */
export function etiquetaDescuento(d: Pick<DescuentoDelAlumno, 'nombre' | 'tipo' | 'valor'>): string {
  return `${d.nombre} · ${d.tipo === 'PORCENTAJE' ? `${d.valor} %` : `S/ ${d.valor.toFixed(2)}`}`;
}

/** Una línea con lo que identifica al colegio: dirección, teléfono, correo, RUC. */
export function lineaColegio(c: Colegio | null): string {
  if (!c) return '';
  return [[c.direccion, c.distrito].filter(Boolean).join(', '), c.telefono && `Tel. ${c.telefono}`, c.email, c.ruc && `RUC ${c.ruc}`].filter(Boolean).join(' · ');
}

/** Descuento total que ya llevan aplicado las cuotas del alumno (suma de lo descontado en cada una). */
export function descuentoEnCuotas(cuotas: readonly Pick<Cuota, 'descuento' | 'estado'>[]): number {
  return r2(cuotas.filter(c => c.estado !== 'ANULADA').reduce((s, c) => s + c.descuento, 0));
}
```

---

<a id="15-familia-pagoscomponenthtml"></a>
## 15. `familia-pagos.component.html` — Feature Portal Familia - Pagos

**Ruta del archivo:** `frontend/src/app/features/familia/pagos/familia-pagos.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML para la vista de pagos del estudiante y apoderado, con tarjetas de resumen de deuda, lista de cuotas y tabla de pagos realizados.

```html
<div class="page">
  <app-page-header titulo="Pagos" [subtitulo]="ctx.seleccionado()?.nombreCompleto ?? ''">
    <button type="button" class="btn" (click)="elegirVencidas()" [disabled]="pagables().length === 0">Elegir vencidas</button>
    <button type="button" class="btn btn-primary" [disabled]="elegidas().size === 0" (click)="abrirPago()">Pagar S/ {{ totalElegido() | number: '1.2-2' }}</button>
  </app-page-header>

  <app-selector-hijo />

  <!-- La matrícula pendiente de pago: lo que falta, el crédito a favor y cómo pagarlo -->
  @if (ctx.seleccionado(); as h) { <app-matricula-pago [alumnoId]="h.alumnoId" /> }

  @for (p of enRevision(); track p.id) {
    <div class="aviso aviso-warn" role="status">
      <strong>Pago en revisión: S/ {{ p.montoTotal | number: '1.2-2' }}</strong> enviado el {{ p.pagadoEn | date: 'dd/MM HH:mm' }}.
      Caja lo confirma y te llega el comprobante. Mientras tanto esas cuotas no se pueden volver a pagar.
    </div>
  }
  @for (p of rechazados(); track p.id) {
    <div class="aviso aviso-danger" role="alert">
      <strong>Pago rechazado: S/ {{ p.montoTotal | number: '1.2-2' }}</strong>. Motivo: {{ p.motivoRechazo }}.
      Las cuotas siguen pendientes: puedes volver a pagarlas o acercarte a caja.
    </div>
  }

  @if (cuenta(); as c) {
    <section class="kpis" aria-label="Resumen de la cuenta">
      <div class="kpi"><div class="etiqueta">Pagado</div><div class="valor" style="color: var(--ok)">S/ {{ c.totalCobrado | number: '1.2-2' }}</div></div>
      <div class="kpi"><div class="etiqueta">Por pagar</div><div class="valor">S/ {{ c.totalPendiente | number: '1.2-2' }}</div></div>
      <div class="kpi"><div class="etiqueta">Vencido</div><div class="valor" [style.color]="c.totalVencido > 0 ? 'var(--danger)' : ''">S/ {{ c.totalVencido | number: '1.2-2' }}</div></div>
    </section>

    <div class="card">
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th style="width: 44px"></th><th>Concepto</th><th>Vence</th><th>Monto</th><th>Mora</th><th>Saldo</th><th>Estado</th></tr></thead>
          <tbody>
            @for (q of c.cuotas; track q.id) {
              <tr>
                <td>
                  @if (pagable(q)) {
                    <input type="checkbox" [checked]="elegidas().has(q.id)" (change)="alternar(q.id, $any($event.target).checked)" [attr.aria-label]="'Elegir ' + q.descripcion" style="width: 18px; height: 18px" />
                  }
                </td>
                <td><strong>{{ q.descripcion }}</strong></td>
                <td>{{ q.fechaVencimiento | date: 'dd/MM/yyyy' }}@if (q.diasAtraso > 0) { <div class="muted" style="color: var(--danger)">{{ q.diasAtraso }} días de atraso</div> }</td>
                <td>{{ q.montoTotal | number: '1.2-2' }}</td>
                <td [style.color]="q.mora > 0 ? 'var(--danger)' : ''">{{ q.mora | number: '1.2-2' }}</td>
                <td><strong>{{ q.saldo | number: '1.2-2' }}</strong></td>
                <td>
                  @if (enCaja(q.id)) { <span class="badge badge-violet">EN REVISIÓN</span> }
                  @else { <span [class]="'badge ' + clase(q.estado)">{{ q.estado }}</span> }
                </td>
              </tr>
            } @empty {
              <tr><td colspan="7" class="vacio">Todavía no hay cuotas.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  } @else if (cargando()) {
    <div class="muted">Cargando…</div>
  }
</div>

@if (confirmando() && recibo(); as r) {
  <app-modal titulo="Pago enviado" [ancho]="480" (cerrar)="cerrar()">
    <div class="aviso aviso-ok" role="status">Enviaste <strong>S/ {{ r.montoTotal | number: '1.2-2' }}</strong>. Caja lo revisa y, al aprobarlo, te llega el comprobante.</div>
    <dl class="datos" style="margin-top: 14px">
      <div><dt>Estado</dt><dd>{{ r.estado === 'PENDIENTE' ? 'En revisión' : r.comprobante?.numeroCompleto ?? 'En proceso' }}</dd></div>
      <div><dt>Fecha</dt><dd>{{ r.pagadoEn | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
    </dl>
    <ng-container footer><button type="button" class="btn btn-primary" (click)="cerrar()">Listo</button></ng-container>
  </app-modal>
} @else if (confirmando()) {
  <app-modal titulo="Confirmar pago" [ancho]="480" (cerrar)="cerrar()">
    <p style="margin-top: 0">Vas a pagar <strong>{{ elegidas().size }}</strong> cuota(s) de {{ ctx.seleccionado()?.nombreCompleto }} por un total de <strong>S/ {{ totalElegido() | number: '1.2-2' }}</strong>.</p>
    <div class="aviso aviso-warn">Es un pago en línea de demostración: no se hace ningún cargo real.</div>
    @if (errorPago()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorPago() }}</div> }
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="button" class="btn btn-primary" [disabled]="pagando()" (click)="pagar()">{{ pagando() ? 'Procesando…' : 'Pagar ahora' }}</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="16-familia-pagoscomponentts"></a>
## 16. `familia-pagos.component.ts` — Feature Portal Familia - Pagos

**Ruta del archivo:** `frontend/src/app/features/familia/pagos/familia-pagos.component.ts`

### **¿Qué hace este archivo?**
Componente TypeScript del portal del alumno y apoderado. Carga el estado de cuenta del estudiante, muestra las deudas pendientes con semáforos de vencimiento y el historial de pagos realizados con opción de visualizar o descargar el recibo.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal, untracked } from '@angular/core';
import { EstadoCuenta, EstadoCuota, Pago } from '../../../core/models/cobro.model';
import { CobroService } from '../../../core/services/cobro.service';
import { FamiliaContextoService } from '../../../core/services/familia-contexto.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SelectorHijoComponent } from '../../../shared/components/selector-hijo/selector-hijo.component';
import { uuid } from '../../../core/utils/uuid';
import { MatriculaPagoComponent } from './matricula-pago.component';

const CLASE: Record<EstadoCuota, string> = { PENDIENTE: 'badge-warn', PARCIAL: 'badge-violet', PAGADA: 'badge-ok', VENCIDA: 'badge-danger', ANULADA: 'badge-gray' };
const PAGABLES: EstadoCuota[] = ['PENDIENTE', 'VENCIDA', 'PARCIAL'];

@Component({
  selector: 'app-familia-pagos',
  imports: [DatePipe, DecimalPipe, ModalComponent, PageHeaderComponent, SelectorHijoComponent, MatriculaPagoComponent],
  templateUrl: './familia-pagos.component.html'
})
export class FamiliaPagosComponent implements OnInit {
  protected readonly ctx = inject(FamiliaContextoService);
  private readonly api = inject(CobroService);
  private readonly avisos = inject(NotificationService);

  protected readonly cuenta = signal<EstadoCuenta | null>(null);
  protected readonly cargando = signal(true);
  protected readonly elegidas = signal<Set<number>>(new Set());

  /** Lo que el apoderado pagó y caja aún no aprueba, o rechazó (con motivo). */
  private readonly enviados = signal<Pago[]>([]);
  private readonly alumnoId = computed(() => this.ctx.seleccionado()?.alumnoId);
  /** Cuotas del hijo elegido con un pago en revisión: no se pueden volver a pagar hasta que caja responda. */
  private readonly cuotasEnRevision = computed(() => new Set(
    this.enviados().filter(p => p.estado === 'PENDIENTE' && p.alumnoId === this.alumnoId()).flatMap(p => p.detalles.map(d => d.cuotaId))
  ));
  protected readonly enRevision = computed(() => this.enviados().filter(p => p.estado === 'PENDIENTE' && p.alumnoId === this.alumnoId()));
  /** Rechazos recientes (14 días) del hijo elegido, para que el apoderado vea el motivo y vuelva a pagar. */
  protected readonly rechazados = computed(() => {
    const limite = Date.now() - 14 * 86_400_000;
    return this.enviados().filter(p => p.estado === 'RECHAZADO' && p.alumnoId === this.alumnoId() && new Date(p.aprobadoEn ?? p.pagadoEn).getTime() >= limite);
  });
  /** La cuota de matrícula no se elige aquí: se paga arriba, con su orden (el servidor también lo exige). */
  protected readonly pagables = computed(() => (this.cuenta()?.cuotas ?? []).filter(c => PAGABLES.includes(c.estado) && !this.cuotasEnRevision().has(c.id) && c.conceptoTipo !== 'MATRICULA'));
  protected readonly totalElegido = computed(() => this.pagables().filter(c => this.elegidas().has(c.id)).reduce((s, c) => s + c.saldo, 0));

  protected readonly confirmando = signal(false);
  protected readonly pagando = signal(false);
  protected readonly errorPago = signal<string | null>(null);
  protected readonly recibo = signal<Pago | null>(null);
  /** Clave de idempotencia del intento: si se pulsa "Pagar" dos veces, el servidor cobra una sola vez. */
  private claveIntento = '';

  constructor() {
    effect(() => {
      const h = this.ctx.seleccionado();
      untracked(() => this.cargar(h?.alumnoId));
    });
  }

  ngOnInit(): void {
    this.ctx.cargar().subscribe({ error: e => this.avisos.error(mensajeError(e)) });
    this.cargarEnviados();
  }

  private cargarEnviados(): void {
    this.api.misPendientes().subscribe({ next: l => this.enviados.set(l), error: () => this.enviados.set([]) });
  }

  protected clase(e: EstadoCuota): string {
    return CLASE[e];
  }

  protected pagable(c: { id: number; estado: EstadoCuota }): boolean {
    return PAGABLES.includes(c.estado) && !this.cuotasEnRevision().has(c.id) && !this.esMatricula(c.id);
  }

  private esMatricula(cuotaId: number): boolean {
    return this.cuenta()?.cuotas.find(c => c.id === cuotaId)?.conceptoTipo === 'MATRICULA';
  }

  /** ¿La cuota tiene un pago esperando la aprobación de caja? */
  protected enCaja(id: number): boolean {
    return this.cuotasEnRevision().has(id);
  }

  private cargar(alumnoId?: number): void {
    this.elegidas.set(new Set());
    this.cuenta.set(null);
    if (!alumnoId) {
      this.cargando.set(false);
      return;
    }
    this.cargando.set(true);
    this.api.estadoCuenta(alumnoId).subscribe({
      next: c => {
        this.cuenta.set(c);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar la cuenta.'));
      }
    });
  }

  protected alternar(id: number, marcada: boolean): void {
    this.elegidas.update(s => {
      const n = new Set(s);
      if (marcada) n.add(id);
      else n.delete(id);
      return n;
    });
  }

  protected elegirVencidas(): void {
    this.elegidas.set(new Set(this.pagables().filter(c => c.estado === 'VENCIDA' || c.diasAtraso > 0).map(c => c.id)));
  }

  // --- pagar ---
  protected abrirPago(): void {
    if (this.elegidas().size === 0) return;
    this.claveIntento = uuid();
    this.errorPago.set(null);
    this.recibo.set(null);
    this.confirmando.set(true);
  }

  protected cerrar(): void {
    this.confirmando.set(false);
    if (this.recibo()) {
      this.cargar(this.ctx.seleccionado()?.alumnoId);
      this.cargarEnviados();
    }
  }

  protected pagar(): void {
    const h = this.ctx.seleccionado();
    if (!h) return;
    const detalles = this.pagables().filter(c => this.elegidas().has(c.id)).map(c => ({ cuotaId: c.id, montoAplicado: c.saldo }));
    this.pagando.set(true);
    this.errorPago.set(null);
    this.api
      .pagarOnline({ alumnoId: h.alumnoId, montoTotal: detalles.reduce((s, d) => s + d.montoAplicado, 0), medio: 'ONLINE_SIMULADO', idempotencyKey: this.claveIntento, detalles })
      .subscribe({
        next: p => {
          this.pagando.set(false);
          this.recibo.set(p);
          this.avisos.success('Pago enviado. Caja lo revisa y te llegará el comprobante al aprobarlo.');
        },
        error: e => {
          this.pagando.set(false);
          this.errorPago.set(mensajeError(e, 'No se pudo procesar el pago.'));
        }
      });
  }
}
```

---

<a id="17-matricula-pagocomponentts"></a>
## 17. `matricula-pago.component.ts` — Feature Portal Familia - Pagos

**Ruta del archivo:** `frontend/src/app/features/familia/pagos/matricula-pago.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `matricula-pago.component`.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, effect, inject, input, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoMatriculaPago, MedioPasarela, OpcionDescuento, OrdenPago, ResultadoPasarela } from '../../../core/models/cobro.model';
import { FamiliaContextoService } from '../../../core/services/familia-contexto.service';
import { CobroService } from '../../../core/services/cobro.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BANCOS_PASARELA, ETIQUETA_MEDIO, MEDIOS_PASARELA, datosDelMedio, faltaEnDatos } from './pasarela';

const ESPERA_MS = 3000;
const INTENTOS_MAX = 12;

/**
 * La matrícula de un hijo dentro de «Pagos»: cuánto cuesta, cuánto hay a favor en su cuenta y cuánto falta. Se paga lo que falta con la pasarela
 * (simulada, con el ciclo de una real: el servidor crea la orden con el monto, la pasarela cobra y devuelve un número de operación); ese dinero
 * queda en su crédito y de ahí se cobra la matrícula, que se genera sola. Con crédito suficiente se puede generar sin pagar. Todas las reglas las
 * valida el servidor: los botones solo las reflejan.
 */
@Component({
  selector: 'app-matricula-pago',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, ModalComponent],
  template: `
    @if (estado(); as e) {
      @if (e.estadoMatricula === 'PRE_MATRICULA') {
        <section class="card tarjeta" aria-labelledby="t-mat">
          <div class="card-body">
            <div class="cab">
              <h2 id="t-mat">Matrícula pendiente de pago</h2>
              @if (e.pagada) { <span class="badge badge-ok">Pagada</span> } @else { <span class="badge badge-warn">Falta pagar</span> }
            </div>

            @if (e.total !== null && e.total !== undefined) {
              <div class="cifras">
                <div class="cifra"><span>Matrícula</span><strong>S/ {{ e.total | number: '1.2-2' }}</strong>@if ((e.descuento ?? 0) > 0) { <small>incluye S/ {{ e.descuento | number: '1.2-2' }} de descuento</small> }</div>
                <div class="cifra"><span>A favor en su cuenta</span><strong class="ok">S/ {{ e.credito | number: '1.2-2' }}</strong></div>
                <div class="cifra" [class.alerta]="e.faltante > 0"><span>Falta pagar</span><strong>S/ {{ e.faltante | number: '1.2-2' }}</strong></div>
              </div>
            }

            @if (e.solicitudDescuento; as sd) {
              @if (sd.estado === 'PENDIENTE') {
                <div class="aviso aviso-warn" role="status"><strong>Descuento en revisión:</strong> {{ sd.descuentoNombre }} ({{ sd.tipo === 'PORCENTAJE' ? sd.valor + ' %' : 'S/ ' + (sd.valor | number: '1.2-2') }}). La secretaría lo revisa; hasta que responda no se puede pagar la matrícula.</div>
              } @else if (sd.estado === 'APROBADA') {
                <div class="aviso aviso-ok" role="status"><strong>Descuento aprobado:</strong> {{ sd.descuentoNombre }}. El monto de la matrícula ya lo incluye.</div>
              } @else {
                <div class="aviso aviso-danger" role="alert"><strong>Descuento rechazado:</strong> {{ sd.motivoResolucion }}. Puedes pagar el monto completo o pedir otro.</div>
              }
            }

            @if (e.pagada) {
              <div class="aviso aviso-ok" role="status">
                @if (esperando()) { <strong>¡Pagada!</strong> Estamos generando la matrícula… } @else { La matrícula ya está pagada y se está generando. }
              </div>
            } @else {
              <div class="acciones">
                @if (e.faltante > 0 && !enRevision()) {
                  <button type="button" class="btn btn-primary grande" (click)="abrirPago()">Pagar lo que falta (S/ {{ e.faltante | number: '1.2-2' }})</button>
                }
                @if (!enRevision()) {
                  <button type="button" class="btn grande" (click)="abrirDescuento()">Solicitar descuento</button>
                }
                @if (e.puedeGenerar) {
                  <button type="button" class="btn btn-primary grande" [disabled]="generando()" (click)="generar()">{{ generando() ? 'Generando…' : 'Generar matrícula con mi crédito' }}</button>
                }
              </div>
              @if (!e.puedeGenerar && e.motivo) { <p class="muted nota">{{ e.motivo }}</p> }
              @if (e.faltante > 0) { <p class="muted nota">Pagas solo lo que falta: el dinero queda en la cuenta del alumno y de ahí se cobra la matrícula.</p> }
            }

            @if (e.depositos.length) {
              <h3 class="sub">Tus depósitos</h3>
              <ul class="depositos">
                @for (d of e.depositos; track d.id) {
                  <li><span class="muted">{{ d.creadoEn | date: 'dd/MM/yyyy HH:mm' }}</span><span>{{ medio(d.medio) }}@if (d.referencia) { · {{ d.referencia }} }</span><strong>S/ {{ d.monto | number: '1.2-2' }}</strong></li>
                }
              </ul>
            }
          </div>
        </section>
      }
    }

    @if (pidiendo()) {
      <app-modal titulo="Solicitar descuento" [ancho]="500" (cerrar)="pidiendo.set(false)">
        <p style="margin-top: 0">La secretaría revisa tu solicitud. Mientras tanto no se puede pagar la matrícula; cuando la apruebe, el monto se recalcula solo.</p>
        <form [formGroup]="formDescuento" class="form-grid" (ngSubmit)="enviarDescuento()" novalidate>
          <div class="field full"><label for="ds-desc">Descuento</label>
            <select id="ds-desc" formControlName="descuentoId"><option [ngValue]="0">Elegir…</option>@for (o of opcionesDescuento(); track o.id) { <option [ngValue]="o.id">{{ o.nombre }} · {{ o.tipo === 'PORCENTAJE' ? o.valor + ' %' : 'S/ ' + o.valor }}</option> }</select>
            @if (!opcionesDescuento().length) { <span class="muted">Por ahora el colegio no tiene descuentos para la matrícula.</span> }
          </div>
          <div class="field full"><label for="ds-her">¿Es por un hermano? Elige cuál</label>
            <select id="ds-her" formControlName="hermanoAlumnoId"><option [ngValue]="0">No es por un hermano</option>@for (h of hermanos(); track h.alumnoId) { <option [ngValue]="h.alumnoId">{{ h.nombreCompleto }}</option> }</select>
          </div>
          <div class="field full"><label for="ds-mot">Motivo</label><input id="ds-mot" formControlName="motivo" maxlength="300" placeholder="Ej.: mi hijo Diego ya está matriculado este año" /></div>
        </form>
        @if (errorDescuento()) { <div class="aviso aviso-danger" role="alert">{{ errorDescuento() }}</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="pidiendo.set(false)">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="enviando()" (click)="enviarDescuento()">{{ enviando() ? 'Enviando…' : 'Enviar solicitud' }}</button>
        </ng-container>
      </app-modal>
    }

    @if (abierto()) {
      <app-modal [titulo]="resultado()?.aprobada ? 'Pago aprobado' : 'Pagar la matrícula'" [ancho]="520" (cerrar)="cerrar()">
        @if (resultado(); as r) {
          @if (r.aprobada) {
            <div class="aviso aviso-ok" role="status">Se recibieron <strong>S/ {{ r.monto | number: '1.2-2' }}</strong>.</div>
            <dl class="datos" style="margin-top: 14px">
              <div><dt>N.º de operación</dt><dd><strong>{{ r.transaccionId }}</strong></dd></div>
              <div><dt>Medio</dt><dd>{{ medio(r.medio) }}@if (r.detalle) { · {{ r.detalle }} }</dd></div>
              <div><dt>Fecha</dt><dd>{{ r.fecha | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
              <div><dt>Orden</dt><dd>{{ r.orden }}</dd></div>
            </dl>
            <p class="muted" style="margin-bottom: 0">El dinero quedó en la cuenta del alumno y se pagó la matrícula con él. La matrícula se genera en unos segundos.</p>
          }
        } @else {
          @if (cargandoOrden()) { <p class="muted">Preparando tu pago…</p> }
          @else if (orden(); as o) {
            <div class="orden">
              <span class="muted">Monto a pagar (lo calcula el sistema)</span>
              <strong>S/ {{ o.monto | number: '1.2-2' }}</strong>
              <small class="muted">Orden {{ o.codigo }} · vence {{ o.expiraEn | date: 'HH:mm' }}</small>
            </div>

            <div class="medios" role="radiogroup" aria-label="Medio de pago">
              @for (m of medios; track m.id) {
                <button type="button" role="radio" class="medio" [class.on]="medioElegido() === m.id" [attr.aria-checked]="medioElegido() === m.id" (click)="elegirMedio(m.id)">
                  <strong>{{ m.etiqueta }}</strong><small>{{ m.ayuda }}</small>
                </button>
              }
            </div>

            <form [formGroup]="form" class="form-grid" (ngSubmit)="pagar()" novalidate>
              @switch (medioElegido()) {
                @case ('TARJETA') {
                  <div class="field full"><label for="pg-num">Número de tarjeta</label><input id="pg-num" formControlName="tarjetaNumero" inputmode="numeric" autocomplete="off" placeholder="4111 1111 1111 1111" /></div>
                  <div class="field"><label for="pg-ven">Vencimiento</label><input id="pg-ven" formControlName="vencimiento" placeholder="MM/AA" autocomplete="off" /></div>
                  <div class="field"><label for="pg-cvv">CVV</label><input id="pg-cvv" formControlName="cvv" inputmode="numeric" maxlength="4" autocomplete="off" /></div>
                  <div class="field full"><label for="pg-tit">Titular</label><input id="pg-tit" formControlName="titular" autocomplete="off" /></div>
                }
                @case ('YAPE_PLIN') {
                  <div class="field"><label for="pg-cel">Celular</label><input id="pg-cel" formControlName="celular" inputmode="numeric" maxlength="11" placeholder="987 654 321" /></div>
                  <div class="field"><label for="pg-tit2">Titular</label><input id="pg-tit2" formControlName="titular" /></div>
                }
                @default {
                  <div class="field"><label for="pg-ban">Banco</label>
                    <select id="pg-ban" formControlName="banco"><option value="">Elegir…</option>@for (b of bancos; track b.id) { <option [value]="b.id">{{ b.etiqueta }}</option> }</select></div>
                  <div class="field"><label for="pg-tit3">Titular de la cuenta</label><input id="pg-tit3" formControlName="titular" /></div>
                }
              }
            </form>
            <p class="muted nota">Es una pasarela de demostración: no se hace ningún cargo real. Tarjeta que termina en 0002 o celular que termina en 00 simulan un rechazo.</p>
            @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }
          } @else if (error()) {
            <div class="aviso aviso-danger" role="alert">{{ error() }}</div>
          }
        }
        <ng-container footer>
          @if (resultado()?.aprobada) {
            <button type="button" class="btn btn-primary" (click)="cerrar()">Listo</button>
          } @else {
            <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
            <button type="button" class="btn btn-primary" [disabled]="pagando() || !orden()" (click)="pagar()">{{ pagando() ? 'Procesando…' : 'Pagar S/ ' + ((orden()?.monto ?? 0) | number: '1.2-2') }}</button>
          }
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .tarjeta { margin-bottom: 16px; border: 1.5px solid var(--primary); }
    .cab { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
    h2 { margin: 0; font-size: 1.1rem; }
    .sub { margin: 16px 0 6px; font-size: .95rem; }
    .cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-bottom: 12px; }
    .cifra { display: flex; flex-direction: column; padding: 10px 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
    .cifra span { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .cifra strong { font-size: 1.3rem; font-variant-numeric: tabular-nums; }
    .cifra strong.ok { color: var(--ok); }
    .cifra small { color: var(--ink-2); }
    .cifra.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .acciones { display: flex; flex-wrap: wrap; gap: 10px; }
    .grande { min-height: 48px; padding: 0 22px; }
    .nota { margin: 10px 0 0; font-size: .85rem; }
    .depositos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
    .depositos li { display: grid; grid-template-columns: 130px minmax(0, 1fr) auto; gap: 10px; padding: 6px 0; border-top: 1px solid var(--line); font-size: .9rem; }
    .orden { display: flex; flex-direction: column; padding: 12px 16px; margin-bottom: 14px; border-radius: 12px; background: var(--primary-soft); }
    .orden strong { font-size: 1.9rem; font-variant-numeric: tabular-nums; }
    .medios { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 14px; }
    .medio { display: flex; flex-direction: column; align-items: flex-start; padding: 10px 12px; border: 1.5px solid var(--line-2); border-radius: 12px; background: var(--card); font: inherit; text-align: left; cursor: pointer; }
    .medio small { color: var(--ink-2); }
    .medio.on { border-color: var(--primary); background: var(--primary-soft); box-shadow: inset 0 0 0 1px var(--primary); }
    @media (max-width: 520px) { .medios { grid-template-columns: minmax(0, 1fr); } .depositos li { grid-template-columns: minmax(0, 1fr) auto; } .depositos li .muted { grid-column: 1 / -1; } }
  `
})
export class MatriculaPagoComponent {
  private readonly api = inject(CobroService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destruido = inject(DestroyRef);
  private readonly familia = inject(FamiliaContextoService);

  /** El hijo cuya matrícula se muestra. */
  readonly alumnoId = input.required<number>();

  protected readonly medios = MEDIOS_PASARELA;
  protected readonly bancos = BANCOS_PASARELA;
  protected readonly medio = (m?: string | null): string => (m ? ETIQUETA_MEDIO[m] ?? m : '');

  protected readonly estado = signal<EstadoMatriculaPago | null>(null);
  protected readonly generando = signal(false);
  /** Ya pagó: se vuelve a preguntar unos segundos hasta que la matrícula quede generada. */
  protected readonly esperando = signal(false);
  private temporizador?: ReturnType<typeof setTimeout>;
  private intentos = 0;

  // --- solicitar un descuento ---
  protected readonly pidiendo = signal(false);
  protected readonly enviando = signal(false);
  protected readonly errorDescuento = signal<string | null>(null);
  protected readonly opcionesDescuento = signal<OpcionDescuento[]>([]);
  protected readonly formDescuento = this.fb.nonNullable.group({
    descuentoId: [0, [Validators.required, Validators.min(1)]],
    hermanoAlumnoId: [0],
    motivo: ['', [Validators.required, Validators.maxLength(300)]]
  });
  /** Los otros hijos del apoderado: el hermano con el que se prueba el descuento. */
  protected hermanos(): { alumnoId: number; nombreCompleto: string }[] {
    return this.familia.hijos().filter(h => h.alumnoId !== this.alumnoId());
  }
  /** ¿Hay una solicitud esperando la respuesta de la secretaría? (el servidor también lo exige). */
  protected enRevision(): boolean {
    return this.estado()?.solicitudDescuento?.estado === 'PENDIENTE';
  }

  // --- la pantalla de pago ---
  protected readonly abierto = signal(false);
  protected readonly orden = signal<OrdenPago | null>(null);
  protected readonly cargandoOrden = signal(false);
  protected readonly pagando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly resultado = signal<ResultadoPasarela | null>(null);
  protected readonly medioElegido = signal<MedioPasarela>('TARJETA');
  protected readonly form = this.fb.nonNullable.group({
    tarjetaNumero: [''], vencimiento: [''], cvv: [''], celular: [''], banco: [''], titular: ['']
  });

  constructor() {
    effect(() => {
      const id = this.alumnoId();
      untracked(() => this.cargar(id));
    });
    this.destruido.onDestroy(() => clearTimeout(this.temporizador));
  }

  private cargar(id: number): void {
    clearTimeout(this.temporizador);
    this.estado.set(null);
    this.esperando.set(false);
    this.api.matriculaDe(id).subscribe({
      // 404: el alumno no tiene una matrícula por pagar; la tarjeta simplemente no se muestra
      next: e => { this.estado.set(e); this.vigilar(id, e); },
      error: () => this.estado.set(null)
    });
  }

  /** Si ya está pagada pero aún no se generó, vuelve a mirar cada pocos segundos (la matrícula se genera por un aviso entre servicios). */
  private vigilar(id: number, e: EstadoMatriculaPago): void {
    clearTimeout(this.temporizador);
    if (e.estadoMatricula !== 'PRE_MATRICULA' || !e.pagada || this.intentos >= INTENTOS_MAX) { this.esperando.set(false); return; }
    this.esperando.set(true);
    this.intentos++;
    this.temporizador = setTimeout(() => this.api.matriculaDe(id).subscribe({ next: n => { this.estado.set(n); this.vigilar(id, n); }, error: () => this.esperando.set(false) }), ESPERA_MS);
  }

  // ---------- Solicitar descuento ----------
  protected abrirDescuento(): void {
    this.formDescuento.reset({ descuentoId: 0, hermanoAlumnoId: 0, motivo: '' });
    this.errorDescuento.set(null);
    this.pidiendo.set(true);
    this.api.opcionesDescuento().subscribe({ next: o => this.opcionesDescuento.set(o), error: () => this.opcionesDescuento.set([]) });
  }

  protected enviarDescuento(): void {
    if (this.formDescuento.invalid) {
      this.errorDescuento.set('Elige el descuento y cuenta el motivo.');
      return;
    }
    const v = this.formDescuento.getRawValue();
    this.enviando.set(true);
    this.errorDescuento.set(null);
    this.api.solicitarDescuento(this.alumnoId(), { descuentoId: v.descuentoId, motivo: v.motivo.trim(), hermanoAlumnoId: v.hermanoAlumnoId || null }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.pidiendo.set(false);
        this.avisos.success('Solicitud enviada. La secretaría la revisará.');
        this.cargar(this.alumnoId());
      },
      error: e => { this.enviando.set(false); this.errorDescuento.set(mensajeError(e, 'No se pudo enviar la solicitud.')); }
    });
  }

  // ---------- Pagar lo que falta ----------
  protected abrirPago(): void {
    this.resultado.set(null);
    this.error.set(null);
    this.orden.set(null);
    this.form.reset({ tarjetaNumero: '', vencimiento: '', cvv: '', celular: '', banco: '', titular: '' });
    this.medioElegido.set('TARJETA');
    this.abierto.set(true);
    this.cargandoOrden.set(true);
    this.api.crearOrdenMatricula(this.alumnoId()).subscribe({
      next: o => { this.orden.set(o); this.cargandoOrden.set(false); },
      error: e => { this.cargandoOrden.set(false); this.error.set(mensajeError(e, 'No se pudo preparar el pago.')); }
    });
  }

  protected elegirMedio(m: MedioPasarela): void {
    this.medioElegido.set(m);
    this.error.set(null);
  }

  protected pagar(): void {
    const o = this.orden();
    if (!o || this.pagando()) return;
    const datos = datosDelMedio({ medio: this.medioElegido(), ...this.form.getRawValue() });
    const falta = faltaEnDatos(datos);
    if (falta) { this.error.set(falta); return; }
    this.pagando.set(true);
    this.error.set(null);
    this.api.pagarEnPasarela(o.codigo, datos).subscribe({
      next: r => {
        this.pagando.set(false);
        if (r.aprobada) {
          this.resultado.set(r);
          this.estado.set(r.estado);
          this.intentos = 0;
          this.vigilar(this.alumnoId(), r.estado);
        } else {
          // La pasarela rechazó este intento: la orden sigue abierta y se puede reintentar con otros datos.
          this.error.set(r.mensaje);
        }
      },
      error: e => { this.pagando.set(false); this.error.set(mensajeError(e, 'No se pudo procesar el pago.')); }
    });
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  // ---------- Generar con el crédito ----------
  protected generar(): void {
    this.generando.set(true);
    this.api.generarMatricula(this.alumnoId()).subscribe({
      next: e => {
        this.generando.set(false);
        this.estado.set(e);
        this.intentos = 0;
        this.avisos.success('Matrícula pagada con tu crédito. Se está generando.');
        this.vigilar(this.alumnoId(), e);
      },
      error: err => {
        this.generando.set(false);
        this.avisos.error(mensajeError(err, 'No se pudo generar la matrícula.'));
        this.cargar(this.alumnoId());   // el servidor manda: se vuelve a leer el estado real
      }
    });
  }
}
```

---

<a id="18-pasarelats"></a>
## 18. `pasarela.ts` — Feature Portal Familia - Pagos

**Ruta del archivo:** `frontend/src/app/features/familia/pagos/pasarela.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `pasarela`.

```typescript
import { DatosPasarela, MedioPasarela } from '../../../core/models/cobro.model';

export const MEDIOS_PASARELA: { id: MedioPasarela; etiqueta: string; ayuda: string }[] = [
  { id: 'TARJETA', etiqueta: 'Tarjeta', ayuda: 'Débito o crédito' },
  { id: 'YAPE_PLIN', etiqueta: 'Yape o Plin', ayuda: 'Desde tu celular' },
  { id: 'TRANSFERENCIA', etiqueta: 'Transferencia', ayuda: 'Desde tu banco' }
];

export const BANCOS_PASARELA: { id: string; etiqueta: string }[] = [
  { id: 'BCP', etiqueta: 'BCP' }, { id: 'BBVA', etiqueta: 'BBVA' }, { id: 'INTERBANK', etiqueta: 'Interbank' },
  { id: 'SCOTIABANK', etiqueta: 'Scotiabank' }, { id: 'BANCO_NACION', etiqueta: 'Banco de la Nación' }
];

export const ETIQUETA_MEDIO: Record<string, string> = {
  TARJETA: 'Tarjeta', YAPE_PLIN: 'Yape o Plin', TRANSFERENCIA: 'Transferencia', EFECTIVO: 'Efectivo', CREDITO: 'Crédito', ONLINE_SIMULADO: 'En línea'
};

/**
 * Aviso a la persona de lo que falta en el formulario, ANTES de enviarlo. Es solo una ayuda: quien decide si el pago es válido es la
 * pasarela (el servidor), que vuelve a validar todo.
 */
export function faltaEnDatos(d: DatosPasarela): string | null {
  switch (d.medio) {
    case 'TARJETA':
      if (!/^\d{13,19}$/.test((d.tarjetaNumero ?? '').replace(/[\s-]/g, ''))) return 'Escribe el número de la tarjeta.';
      if (!/^\d{2}\s*\/\s*\d{2,4}$/.test(d.vencimiento ?? '')) return 'El vencimiento va como MM/AA.';
      if (!/^\d{3,4}$/.test(d.cvv ?? '')) return 'Escribe el código de seguridad (CVV).';
      return null;
    case 'YAPE_PLIN':
      return /^9\d{8}$/.test((d.celular ?? '').replace(/\s/g, '')) ? null : 'El celular debe tener 9 dígitos y empezar con 9.';
    default:
      if (!d.banco) return 'Elige el banco desde el que transfieres.';
      return (d.titular ?? '').trim() ? null : 'Escribe el titular de la cuenta.';
  }
}

/** Solo los datos del medio elegido (no se envía nada de los otros). */
export function datosDelMedio(d: DatosPasarela): DatosPasarela {
  switch (d.medio) {
    case 'TARJETA': return { medio: d.medio, tarjetaNumero: d.tarjetaNumero, vencimiento: d.vencimiento, cvv: d.cvv, titular: d.titular };
    case 'YAPE_PLIN': return { medio: d.medio, celular: d.celular, titular: d.titular };
    default: return { medio: d.medio, banco: d.banco, titular: d.titular };
  }
}
```

---

<a id="19-docente-notascomponenthtml"></a>
## 19. `docente-notas.component.html` — Feature Registro Auxiliar - Notas Docente

**Ruta del archivo:** `frontend/src/app/features/docente/notas/docente-notas.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML del registro auxiliar docente. Muestra la cabecera de la asignatura, el panel de gestión de criterios de evaluación con indicador de suma de pesos (100/100), y la matriz editable de notas por estudiante con cálculo visual de promedios.

```html
<div [class.page]="!embebido()">
  @if (!embebido()) {
    <app-page-header titulo="Notas" subtitulo="Define los criterios de evaluación de cada curso (los pesos suman 100) y registra las notas de 0 a 20.">
      <button type="button" class="btn btn-primary" [disabled]="!hayCambios() || guardando() || cerrado()" (click)="guardarNotas()">{{ guardando() ? 'Guardando…' : 'Guardar notas' }}</button>
    </app-page-header>
  }

  <form class="toolbar" [formGroup]="filtro">
    @if (!embebido()) {
      <select class="input" formControlName="asignacion" (change)="cargar()" aria-label="Curso y sección">
        @for (a of ctx()?.asignaciones ?? []; track a.id) { <option [ngValue]="a.id">{{ a.cursoNombre }} · {{ a.seccionNombre }}</option> }
      </select>
    }
    <select class="input" formControlName="periodoId" (change)="cargar()" aria-label="Periodo">
      @for (p of ctx()?.periodos ?? []; track p.id) { <option [ngValue]="p.id">{{ p.nombre }}</option> }
    </select>
    @if (registro()) { <span [class]="'badge ' + (cerrado() ? 'badge-warn' : 'badge-ok')">{{ cerrado() ? 'Periodo cerrado: solo lectura' : 'Periodo abierto' }}</span> }
    @if (hayCambios()) { <span class="muted">Hay notas sin guardar</span> }
    @if (embebido()) { <button type="button" class="btn btn-primary" [disabled]="!hayCambios() || guardando() || cerrado()" (click)="guardarNotas()">{{ guardando() ? 'Guardando…' : 'Guardar notas' }}</button> }
  </form>

  <section class="card">
    <div class="card-body">
      <div class="toolbar" style="justify-content: space-between; margin-bottom: 10px">
        <h2>Criterios de evaluación</h2>
        <span>
          @if (pesos(); as p) { <span [class]="'badge ' + (p.esValido ? 'badge-ok' : 'badge-warn')">Suma de pesos: {{ p.sumaPesos }} / 100</span> }
          <button type="button" class="btn btn-sm" style="margin-left: 8px" [disabled]="cerrado()" (click)="nuevoCriterio()">Nuevo criterio</button>
        </span>
      </div>
      @if (pesos() && !pesos()!.esValido) { <div class="aviso aviso-warn" style="margin-bottom: 10px">{{ pesos()!.mensaje }}</div> }
      <div class="table-wrap">
        <table class="table" style="min-width: 0">
          <thead><tr><th>Criterio</th><th>Peso</th><th>Origen</th><th></th></tr></thead>
          <tbody>
            @for (c of registro()?.criterios ?? []; track c.id) {
              <tr>
                <td><strong>{{ c.nombre }}</strong></td>
                <td>{{ c.peso }} %</td>
                <td><span class="badge badge-gray">{{ c.origenTipo === 'MANUAL' ? 'Manual' : c.origenTipo === 'TAREAS' ? 'Tareas' : 'Exámenes' }}</span></td>
                <td class="acciones">
                  <button type="button" class="btn btn-sm" [disabled]="cerrado()" (click)="editarCriterio(c)">Editar</button>
                  <button type="button" class="btn btn-sm" [disabled]="cerrado()" (click)="eliminarCriterio(c)">Eliminar</button>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="4" class="vacio">Aún no hay criterios para este curso y periodo. Crea al menos uno.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="card">
    <div class="card-body" style="padding-bottom: 0"><h2>Registro de notas</h2><div class="muted">Los criterios de tareas y exámenes se llenan solos con las notas de esas actividades.</div></div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Alumno</th>
            @for (c of registro()?.criterios ?? []; track c.id) { <th>{{ c.nombre }} ({{ c.peso }}%)</th> }
            <th>Promedio</th>
          </tr>
        </thead>
        <tbody>
          @for (f of registro()?.alumnos ?? []; track f.matriculaId) {
            <tr>
              <td><strong>{{ f.alumnoNombre }}</strong></td>
              @for (c of registro()?.criterios ?? []; track c.id) {
                <td>
                  <input type="number" min="0" max="20" step="0.5" class="input" style="width: 84px; min-height: 36px" [disabled]="!editable(c)"
                    [value]="valor(f.matriculaId, c.id, f.notasPorCriterioId?.[c.id]) ?? ''" (input)="editar(f.matriculaId, c.id, $any($event.target).value)"
                    [attr.aria-label]="'Nota de ' + f.alumnoNombre + ' en ' + c.nombre" />
                </td>
              }
              <td><strong [style.color]="(f.promedio ?? 20) < 11 ? 'var(--danger)' : ''">{{ f.promedio !== undefined && f.promedio !== null ? (f.promedio | number: '1.1-1') + ' (' + f.literal + ')' : '—' }}</strong></td>
            </tr>
          } @empty {
            <tr><td [attr.colspan]="(registro()?.criterios?.length ?? 0) + 2" class="vacio">{{ cargando() ? 'Cargando…' : 'No hay alumnos matriculados en esta sección.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </section>

  @if (pendientes().length > 0) {
    <section class="card">
      <div class="card-body" style="padding-bottom: 0">
        <h2>Notas de tareas y exámenes sin asignar a un criterio</h2>
        <div class="muted">Crea un criterio de origen «Tareas» o «Exámenes» para que se apliquen.</div>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Origen</th><th>Actividad</th><th>Alumno</th><th>Nota</th><th>Fecha</th></tr></thead>
          <tbody>
            @for (p of pendientes(); track p.id) {
              <tr><td>{{ p.origen === 'TAREA' ? 'Tarea' : 'Examen' }}</td><td>{{ p.titulo }}</td><td>Alumno {{ p.alumnoId }}</td><td>{{ p.valor }}</td><td class="muted">{{ p.fechaEvento | date: 'dd/MM HH:mm' }}</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  }
</div>

@if (abierto()) {
  <app-modal [titulo]="editando() ? 'Editar criterio' : 'Nuevo criterio'" [ancho]="460" (cerrar)="cerrarDialogo()">
    <form [formGroup]="formCriterio" (ngSubmit)="guardarCriterio()" id="form-criterio" novalidate>
      <div class="form-grid">
        <div class="field full"><label for="k-nombre">Nombre</label><input id="k-nombre" formControlName="nombre" placeholder="Examen bimestral" /></div>
        <div class="field"><label for="k-peso">Peso (%)</label><input id="k-peso" type="number" min="1" max="100" formControlName="peso" /></div>
        <div class="field">
          <label for="k-origen">Origen de la nota</label>
          <select id="k-origen" formControlName="origenTipo"><option value="MANUAL">Manual</option><option value="TAREAS">Tareas</option><option value="EXAMENES">Exámenes</option></select>
        </div>
      </div>
      @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrarDialogo()">Cancelar</button>
      <button type="submit" form="form-criterio" class="btn btn-primary">Guardar</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="20-docente-notascomponentts"></a>
## 20. `docente-notas.component.ts` — Feature Registro Auxiliar - Notas Docente

**Ruta del archivo:** `frontend/src/app/features/docente/notas/docente-notas.component.ts`

### **¿Qué hace este archivo?**
Componente TypeScript del registro auxiliar de notas del profesor. Carga los alumnos matriculados en la sección, los criterios de evaluación vigentes (con su peso y origen), enlaza las notas autocompletadas de tareas y exámenes, permite ingresar notas manuales y calcula en tiempo real el promedio ponderado y la escala literal.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Criterio, NotaPendiente, OrigenCriterio, RegistroNotas, ValidarPesos } from '../../../core/models/calificacion.model';
import { Asignacion } from '../../../core/models/planificacion.model';
import { CalificacionService } from '../../../core/services/calificacion.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ContextoDocente, DocenteContextoService } from '../../../core/services/docente-contexto.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-docente-notas',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, ModalComponent, PageHeaderComponent],
  templateUrl: './docente-notas.component.html'
})
export class DocenteNotasComponent implements OnInit {
  private readonly api = inject(CalificacionService);
  private readonly contexto = inject(DocenteContextoService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  /** Dentro de la página de un curso: ya viene elegido el curso y se ocultan la cabecera y el selector de curso. */
  readonly seccionId = input<number | null>(null);
  readonly cursoId = input<number | null>(null);
  readonly embebido = input(false);

  protected readonly ctx = signal<ContextoDocente | null>(null);
  protected readonly registro = signal<RegistroNotas | null>(null);
  protected readonly pesos = signal<ValidarPesos | null>(null);
  protected readonly pendientes = signal<NotaPendiente[]>([]);
  protected readonly cargando = signal(false);
  protected readonly guardando = signal(false);

  protected readonly filtro = this.fb.nonNullable.group({ asignacion: 0, periodoId: 0 });

  /** Notas editadas y aún sin guardar: `matriculaId|criterioId` → valor. */
  protected readonly editadas = signal<Record<string, number | null>>({});
  protected readonly hayCambios = computed(() => Object.keys(this.editadas()).length > 0);
  protected readonly cerrado = computed(() => this.registro()?.estadoPeriodo === 'CERRADO');

  // criterio
  protected readonly abierto = signal(false);
  protected readonly editando = signal<Criterio | null>(null);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly formCriterio = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    peso: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    origenTipo: ['MANUAL' as OrigenCriterio, Validators.required]
  });

  ngOnInit(): void {
    this.contexto.cargar().subscribe({
      next: c => {
        this.ctx.set(c);
        const elegida = c.asignaciones.find(a => a.seccionId === this.seccionId() && a.cursoId === this.cursoId()) ?? c.asignaciones[0];
        this.filtro.patchValue({ asignacion: elegida?.id ?? 0, periodoId: c.periodoActivo?.id ?? 0 });
        this.cargar();
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo cargar tu información de docente.'))
    });
  }

  protected asignacion(): Asignacion | undefined {
    return this.ctx()?.asignaciones.find(a => a.id === this.filtro.controls.asignacion.value);
  }

  protected cargar(): void {
    const a = this.asignacion();
    const periodoId = this.filtro.controls.periodoId.value;
    this.editadas.set({});
    if (!a || !periodoId) {
      this.registro.set(null);
      return;
    }
    this.cargando.set(true);
    this.api.registro(a.seccionId, a.cursoId, periodoId).subscribe({
      next: r => {
        this.registro.set(r);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.registro.set(null);
        this.avisos.error(mensajeError(e, 'No se pudo cargar el registro de notas.'));
      }
    });
    this.api.validarPesos(periodoId, a.seccionId, a.cursoId).subscribe({ next: p => this.pesos.set(p), error: () => this.pesos.set(null) });
    this.api.pendientes(a.seccionId, a.cursoId).subscribe({ next: p => this.pendientes.set(p), error: () => this.pendientes.set([]) });
  }

  // --- notas ---
  protected valor(matriculaId: number, criterioId: number, original?: number | null): number | null {
    const clave = `${matriculaId}|${criterioId}`;
    return clave in this.editadas() ? this.editadas()[clave] : (original ?? null);
  }

  protected editar(matriculaId: number, criterioId: number, texto: string): void {
    const n = texto === '' ? null : Number(texto);
    this.editadas.update(m => ({ ...m, [`${matriculaId}|${criterioId}`]: n }));
  }

  protected editable(c: Criterio): boolean {
    return c.origenTipo === 'MANUAL' && !this.cerrado();
  }

  protected guardarNotas(): void {
    const r = this.registro();
    const a = this.asignacion();
    if (!r || !a) return;
    const porCriterio = new Map<number, { matriculaId: number; alumnoId: number; valor: number }[]>();
    for (const [clave, valor] of Object.entries(this.editadas())) {
      if (valor === null) continue;
      if (valor < 0 || valor > 20) {
        this.avisos.error('Las notas van de 0 a 20.');
        return;
      }
      const [mid, cid] = clave.split('|').map(Number);
      const alumno = r.alumnos.find(x => x.matriculaId === mid);
      if (!alumno) continue;
      porCriterio.set(cid, [...(porCriterio.get(cid) ?? []), { matriculaId: mid, alumnoId: alumno.alumnoId, valor }]);
    }
    if (porCriterio.size === 0) return;
    this.guardando.set(true);
    let pendientes = porCriterio.size;
    let fallo: string | null = null;
    for (const [criterioId, notas] of porCriterio) {
      this.api.guardarLote({ seccionId: a.seccionId, cursoId: a.cursoId, periodoId: r.periodoId, criterioId, notas }).subscribe({
        next: () => {
          if (--pendientes === 0) this.terminarGuardado(fallo);
        },
        error: e => {
          fallo = mensajeError(e, 'No se pudieron guardar algunas notas.');
          if (--pendientes === 0) this.terminarGuardado(fallo);
        }
      });
    }
  }

  private terminarGuardado(fallo: string | null): void {
    this.guardando.set(false);
    if (fallo) this.avisos.error(fallo);
    else this.avisos.success('Notas guardadas.');
    this.cargar();
  }

  // --- criterios ---
  protected nuevoCriterio(): void {
    const resto = Math.max(0, 100 - (this.pesos()?.sumaPesos ?? 0));
    this.formCriterio.reset({ nombre: '', peso: resto || 10, origenTipo: 'MANUAL' });
    this.editando.set(null);
    this.errorForm.set(null);
    this.abierto.set(true);
  }

  protected editarCriterio(c: Criterio): void {
    this.formCriterio.reset({ nombre: c.nombre, peso: c.peso, origenTipo: c.origenTipo });
    this.editando.set(c);
    this.errorForm.set(null);
    this.abierto.set(true);
  }

  protected cerrarDialogo(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardarCriterio(): void {
    const a = this.asignacion();
    if (!a || this.formCriterio.invalid) {
      this.formCriterio.markAllAsTouched();
      return;
    }
    const v = this.formCriterio.getRawValue();
    const body = { anioId: this.ctx()!.anio.id, periodoId: this.filtro.controls.periodoId.value, seccionId: a.seccionId, cursoId: a.cursoId, nombre: v.nombre.trim(), peso: v.peso, origenTipo: v.origenTipo };
    const e = this.editando();
    (e ? this.api.actualizarCriterio(e.id, body) : this.api.crearCriterio(body)).subscribe({
      next: () => {
        this.avisos.success(e ? 'Criterio actualizado.' : 'Criterio creado.');
        this.cerrarDialogo();
        this.cargar();
      },
      error: err => this.errorForm.set(mensajeError(err))
    });
  }

  protected async eliminarCriterio(c: Criterio): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Eliminar el criterio "${c.nombre}" y sus notas?`, 'Eliminar', true))) return;
    this.api.eliminarCriterio(c.id).subscribe({
      next: () => {
        this.avisos.success('Criterio eliminado.');
        this.cargar();
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }
}
```

---

<a id="21-docente-bancocomponenthtml"></a>
## 21. `docente-banco.component.html` — Feature Exámenes Docente y Banco

**Ruta del archivo:** `frontend/src/app/features/docente/examenes/docente-banco.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `docente-banco`.

```html
<div class="page">
  <app-page-header titulo="Banco de preguntas" subtitulo="Preguntas reutilizables por curso. Solo tú ves y editas las tuyas.">
    <button type="button" class="btn btn-primary" [disabled]="!filtro.controls.cursoId.value" (click)="nueva()">Nueva pregunta</button>
  </app-page-header>

  <form class="toolbar" [formGroup]="filtro" (ngSubmit)="cargar(0)">
    <select class="input" formControlName="cursoId" (change)="cargar(0)" aria-label="Curso">
      @for (c of cursos(); track c.id) { <option [ngValue]="c.id">{{ c.nombre }}</option> }
    </select>
    <select class="input" formControlName="tipo" (change)="cargar(0)" aria-label="Tipo">
      <option value="">Todos los tipos</option>
      @for (t of tipos; track t) { <option [value]="t">{{ etiquetaTipo(t) }}</option> }
    </select>
    <input class="input grow" type="search" formControlName="tema" placeholder="Filtrar por tema" aria-label="Tema" />
    <button type="submit" class="btn">Buscar</button>
  </form>

  <div class="card">
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Pregunta</th><th>Tipo</th><th>Tema</th><th>Puntaje</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          @for (p of preguntas(); track p.id) {
            <tr>
              <td style="max-width: 420px"><strong>{{ p.enunciado }}</strong><div class="muted">{{ p.opciones.length }} opciones</div></td>
              <td>{{ etiquetaTipo(p.tipo) }}</td>
              <td>{{ p.tema ?? '—' }}</td>
              <td>{{ p.puntaje }}</td>
              <td><span [class]="'badge ' + (p.activa ? 'badge-ok' : 'badge-gray')">{{ p.activa ? 'Activa' : 'Inactiva' }}</span></td>
              <td class="acciones">
                <button type="button" class="btn btn-sm" (click)="editar(p)">Editar</button>
                <button type="button" class="btn btn-sm" (click)="eliminar(p)">Eliminar</button>
              </td>
            </tr>
          } @empty {
            <tr><td colspan="6" class="vacio">{{ cargando() ? 'Cargando…' : 'No hay preguntas con esos filtros.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
    <div class="toolbar" style="padding: 12px 16px; justify-content: space-between">
      <span class="muted">{{ total() }} preguntas · página {{ pagina() + 1 }} de {{ paginas() }}</span>
      <span>
        <button type="button" class="btn btn-sm" [disabled]="pagina() === 0" (click)="irA(pagina() - 1)">Anterior</button>
        <button type="button" class="btn btn-sm" [disabled]="pagina() + 1 >= paginas()" (click)="irA(pagina() + 1)">Siguiente</button>
      </span>
    </div>
  </div>
</div>

@if (abierto()) {
  <app-modal [titulo]="editando() ? 'Editar pregunta' : 'Nueva pregunta'" [ancho]="680" (cerrar)="cerrar()">
    <form [formGroup]="form" (ngSubmit)="guardar()" id="form-pregunta" novalidate>
      <div class="form-grid">
        <div class="field">
          <label for="q-curso">Curso</label>
          <select id="q-curso" formControlName="cursoId">@for (c of cursos(); track c.id) { <option [ngValue]="c.id">{{ c.nombre }}</option> }</select>
        </div>
        <div class="field">
          <label for="q-tipo">Tipo</label>
          <select id="q-tipo" formControlName="tipo" (change)="alCambiarTipo()">@for (t of tipos; track t) { <option [value]="t">{{ etiquetaTipo(t) }}</option> }</select>
        </div>
        <div class="field"><label for="q-tema">Tema</label><input id="q-tema" formControlName="tema" placeholder="Fracciones" /></div>
        <div class="field"><label for="q-pts">Puntaje</label><input id="q-pts" type="number" min="0.5" step="0.5" formControlName="puntaje" /></div>
        <div class="field full">
          <label for="q-enun">Enunciado</label>
          <textarea id="q-enun" rows="3" formControlName="enunciado" style="padding: 10px 12px; min-height: 80px"></textarea>
          @if (form.controls.enunciado.touched && form.controls.enunciado.invalid) { <span class="error">Obligatorio.</span> }
        </div>
        @if (form.controls.tipo.value !== 'ABIERTA') {
          <div class="field full">
            <span style="font-weight: 600; font-size: 13px">Opciones (marca la correcta)</span>
            <div formArrayName="opciones" style="display: flex; flex-direction: column; gap: 8px">
              @for (o of opciones.controls; track $index) {
                <div [formGroupName]="$index" style="display: flex; gap: 10px; align-items: center">
                  <input type="checkbox" formControlName="esCorrecta" (change)="marcarCorrecta($index, $any($event.target).checked)" [attr.aria-label]="'Opción ' + ($index + 1) + ' correcta'" style="width: 18px; height: 18px" />
                  <input class="input" style="flex: 1" formControlName="texto" [readonly]="form.controls.tipo.value === 'VERDADERO_FALSO'" [attr.aria-label]="'Texto de la opción ' + ($index + 1)" />
                  @if (form.controls.tipo.value !== 'VERDADERO_FALSO' && opciones.length > 2) { <button type="button" class="btn btn-sm" (click)="quitarOpcion($index)" aria-label="Quitar opción">×</button> }
                </div>
              }
            </div>
            @if (form.controls.tipo.value !== 'VERDADERO_FALSO') { <button type="button" class="btn btn-sm" style="align-self: flex-start" (click)="agregarOpcion()">Agregar opción</button> }
          </div>
        } @else {
          <div class="field full muted">Las preguntas abiertas las califica el docente después de que el alumno envíe el examen.</div>
        }
        <div class="field full"><label class="check"><input type="checkbox" formControlName="activa" /> Pregunta activa</label></div>
      </div>
      @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="submit" form="form-pregunta" class="btn btn-primary" [disabled]="guardando()">Guardar</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="22-docente-bancocomponentts"></a>
## 22. `docente-banco.component.ts` — Feature Exámenes Docente y Banco

**Ruta del archivo:** `frontend/src/app/features/docente/examenes/docente-banco.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `docente-banco.component`.

```typescript
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Opcion, Pregunta, TIPOS_PREGUNTA, TipoPregunta } from '../../../core/models/examen.model';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ContextoDocente, DocenteContextoService } from '../../../core/services/docente-contexto.service';
import { ExamenService } from '../../../core/services/examen.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

const ETIQUETA: Record<TipoPregunta, string> = {
  OPCION_UNICA: 'Opción única',
  OPCION_MULTIPLE: 'Opción múltiple',
  VERDADERO_FALSO: 'Verdadero / Falso',
  ABIERTA: 'Pregunta abierta'
};

@Component({
  selector: 'app-docente-banco',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  templateUrl: './docente-banco.component.html'
})
export class DocenteBancoComponent implements OnInit {
  private readonly api = inject(ExamenService);
  private readonly contexto = inject(DocenteContextoService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly tipos = TIPOS_PREGUNTA;
  protected readonly etiquetaTipo = (t: TipoPregunta) => ETIQUETA[t];
  protected readonly ctx = signal<ContextoDocente | null>(null);
  protected readonly preguntas = signal<Pregunta[]>([]);
  protected readonly total = signal(0);
  protected readonly paginas = signal(1);
  protected readonly pagina = signal(0);
  protected readonly cargando = signal(false);

  /** Cursos distintos que dicta el docente. */
  protected readonly cursos = computed(() => {
    const m = new Map<number, string>();
    for (const a of this.ctx()?.asignaciones ?? []) m.set(a.cursoId, a.cursoNombre);
    return [...m].map(([id, nombre]) => ({ id, nombre }));
  });

  protected readonly filtro = this.fb.nonNullable.group({ cursoId: 0, tema: '', tipo: '' as TipoPregunta | '' });

  protected readonly abierto = signal(false);
  protected readonly editando = signal<Pregunta | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    cursoId: [0, [Validators.required, Validators.min(1)]],
    tema: [''],
    tipo: ['OPCION_UNICA' as TipoPregunta, Validators.required],
    enunciado: ['', Validators.required],
    puntaje: [2, [Validators.required, Validators.min(0.5)]],
    activa: [true],
    opciones: this.fb.array([])
  });

  protected get opciones(): FormArray {
    return this.form.controls.opciones as unknown as FormArray;
  }

  ngOnInit(): void {
    this.contexto.cargar().subscribe({
      next: c => {
        this.ctx.set(c);
        this.filtro.patchValue({ cursoId: this.cursos()[0]?.id ?? 0 });
        this.cargar(0);
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo cargar tu información de docente.'))
    });
  }

  protected irA(p: number): void {
    if (p >= 0 && p < this.paginas()) this.cargar(p);
  }

  protected cargar(pagina = 0): void {
    const f = this.filtro.getRawValue();
    if (!f.cursoId) return;
    this.cargando.set(true);
    this.api.preguntas(f.cursoId, f.tema.trim() || undefined, f.tipo, pagina).subscribe({
      next: p => {
        this.preguntas.set(p.contenido);
        this.total.set(p.totalElementos);
        this.paginas.set(Math.max(1, p.totalPaginas));
        this.pagina.set(p.pagina);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar el banco de preguntas.'));
      }
    });
  }

  // --- formulario ---
  private opcionForm(texto = '', esCorrecta = false) {
    return this.fb.nonNullable.group({ texto: [texto, Validators.required], esCorrecta: [esCorrecta] });
  }

  private armarOpciones(tipo: TipoPregunta, previas: Opcion[] = []): void {
    this.opciones.clear();
    if (tipo === 'ABIERTA') return;
    if (tipo === 'VERDADERO_FALSO') {
      const v = previas.find(o => o.texto === 'Verdadero')?.esCorrecta ?? true;
      this.opciones.push(this.opcionForm('Verdadero', v));
      this.opciones.push(this.opcionForm('Falso', !v));
      return;
    }
    const base = previas.length ? previas : [{ texto: '', esCorrecta: true }, { texto: '', esCorrecta: false }, { texto: '', esCorrecta: false }];
    for (const o of base) this.opciones.push(this.opcionForm(o.texto, !!o.esCorrecta));
  }

  protected alCambiarTipo(): void {
    this.armarOpciones(this.form.controls.tipo.value);
  }

  protected agregarOpcion(): void {
    this.opciones.push(this.opcionForm());
  }

  protected quitarOpcion(i: number): void {
    if (this.opciones.length > 2) this.opciones.removeAt(i);
  }

  /** En opción única y verdadero/falso solo una opción puede ser la correcta. */
  protected marcarCorrecta(i: number, valor: boolean): void {
    const tipo = this.form.controls.tipo.value;
    if (tipo !== 'OPCION_MULTIPLE' && valor) {
      this.opciones.controls.forEach((c, idx) => c.get('esCorrecta')!.setValue(idx === i, { emitEvent: false }));
    }
  }

  protected nueva(): void {
    this.form.reset({ cursoId: this.filtro.controls.cursoId.value, tema: '', tipo: 'OPCION_UNICA', enunciado: '', puntaje: 2, activa: true });
    this.armarOpciones('OPCION_UNICA');
    this.editando.set(null);
    this.errorForm.set(null);
    this.abierto.set(true);
  }

  protected editar(p: Pregunta): void {
    this.form.reset({ cursoId: p.cursoId, tema: p.tema ?? '', tipo: p.tipo, enunciado: p.enunciado, puntaje: p.puntaje, activa: p.activa });
    this.armarOpciones(p.tipo, [...p.opciones].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0)));
    this.editando.set(p);
    this.errorForm.set(null);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const opciones = v.opciones as { texto: string; esCorrecta: boolean }[];
    if (v.tipo !== 'ABIERTA' && !opciones.some(o => o.esCorrecta)) {
      this.errorForm.set('Marca al menos una opción correcta.');
      return;
    }
    const body = {
      cursoId: v.cursoId,
      tema: v.tema.trim() || undefined,
      tipo: v.tipo,
      enunciado: v.enunciado.trim(),
      puntaje: v.puntaje,
      activa: v.activa,
      opciones: v.tipo === 'ABIERTA' ? [] : opciones.map((o, i) => ({ texto: o.texto.trim(), esCorrecta: o.esCorrecta, orden: i + 1 }))
    };
    const e = this.editando();
    this.guardando.set(true);
    (e ? this.api.actualizarPregunta(e.id, body) : this.api.crearPregunta(body)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(e ? 'Pregunta actualizada.' : 'Pregunta agregada al banco.');
        this.cerrar();
        this.cargar(this.pagina());
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  protected async eliminar(p: Pregunta): Promise<void> {
    if (!(await this.confirmacion.confirmar('¿Eliminar esta pregunta? Si ya se usó en un examen, solo se desactiva.', 'Eliminar', true))) return;
    this.api.eliminarPregunta(p.id).subscribe({
      next: () => {
        this.avisos.success('Pregunta eliminada.');
        this.cargar(this.pagina());
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }
}
```

---

<a id="23-docente-examenescomponenthtml"></a>
## 23. `docente-examenes.component.html` — Feature Exámenes Docente y Banco

**Ruta del archivo:** `frontend/src/app/features/docente/examenes/docente-examenes.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `docente-examenes`.

```html
<div [class.page]="!embebido()">
  @if (!embebido()) {
    <app-page-header titulo="Exámenes" subtitulo="Arma exámenes con preguntas de tu banco, publícalos y revisa los resultados. El tiempo lo controla el servidor.">
      <a class="btn" routerLink="/docente/banco">Banco de preguntas</a>
      <button type="button" class="btn btn-primary" [disabled]="!ctx()?.asignaciones?.length" (click)="nuevo()">Nuevo examen</button>
    </app-page-header>
  }

  <div class="toolbar">
    @if (embebido()) {
      <button type="button" class="btn btn-primary" [disabled]="!ctx()?.asignaciones?.length" (click)="nuevo()">Nuevo examen</button>
      <a class="btn" routerLink="/docente/banco">Banco de preguntas</a>
    }
    <select class="input" [formControl]="estado" (change)="cargar(0)" aria-label="Estado">
      <option value="">Todos</option>
      <option value="BORRADOR">Borradores</option>
      <option value="PUBLICADO">Publicados</option>
      <option value="CERRADO">Cerrados</option>
      <option value="CALIFICADO">Calificados</option>
    </select>
  </div>

  <div class="card">
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Examen</th>@if (!embebido()) { <th>Curso y sección</th> }<th>Ventana</th><th>Duración</th><th>Puntaje</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          @for (x of examenes(); track x.id) {
            <tr>
              <td><strong>{{ x.titulo }}</strong></td>
              @if (!embebido()) { <td>{{ etiqueta(x) }}</td> }
              <td class="muted">{{ x.fechaInicio | date: 'dd/MM HH:mm' }} → {{ x.fechaFin | date: 'dd/MM HH:mm' }}</td>
              <td>{{ x.duracionMin }} min · {{ x.intentosMax }} {{ x.intentosMax === 1 ? 'intento' : 'intentos' }}</td>
              <td>{{ x.puntajeTotal }}</td>
              <td><span [class]="'badge ' + clase(x.estado)">{{ x.estado }}</span></td>
              <td class="acciones">
                @if (x.estado === 'BORRADOR') {
                  <button type="button" class="btn btn-sm" (click)="editar(x)">Editar</button>
                  <button type="button" class="btn btn-sm btn-primary" (click)="publicar(x)">Publicar</button>
                } @else {
                  <button type="button" class="btn btn-sm" (click)="verResultados(x)">Resultados</button>
                }
                @if (x.estado === 'PUBLICADO') { <button type="button" class="btn btn-sm" (click)="cerrarExamen(x)">Cerrar</button> }
              </td>
            </tr>
          } @empty {
            <tr><td colspan="7" class="vacio">{{ cargando() ? 'Cargando…' : 'Aún no creaste exámenes.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
    <div class="toolbar" style="padding: 12px 16px; justify-content: space-between">
      <span class="muted">{{ total() }} exámenes · página {{ pagina() + 1 }} de {{ paginas() }}</span>
      <span>
        <button type="button" class="btn btn-sm" [disabled]="pagina() === 0" (click)="irA(pagina() - 1)">Anterior</button>
        <button type="button" class="btn btn-sm" [disabled]="pagina() + 1 >= paginas()" (click)="irA(pagina() + 1)">Siguiente</button>
      </span>
    </div>
  </div>
</div>

@if (abierto()) {
  <app-modal [titulo]="editando() ? 'Editar examen' : 'Nuevo examen'" [ancho]="760" (cerrar)="cerrar()">
    <form [formGroup]="form" (ngSubmit)="guardar()" id="form-examen" novalidate>
      <div class="form-grid">
        @if (!embebido()) {
          <div class="field">
            <label for="x-asig">Curso y sección</label>
            <select id="x-asig" formControlName="asignacion" (change)="cargarBanco()">
              @for (a of ctx()?.asignaciones ?? []; track a.id) { <option [ngValue]="a.id">{{ a.cursoNombre }} · {{ a.seccionNombre }}</option> }
            </select>
          </div>
        }
        <div class="field">
          <label for="x-per">Periodo</label>
          <select id="x-per" formControlName="periodoId">@for (p of ctx()?.periodos ?? []; track p.id) { <option [ngValue]="p.id">{{ p.nombre }}</option> }</select>
        </div>
        <div class="field full"><label for="x-tit">Título</label><input id="x-tit" formControlName="titulo" />
          @if (form.controls.titulo.touched && form.controls.titulo.invalid) { <span class="error">Obligatorio.</span> }</div>
        <div class="field full"><label for="x-ins">Instrucciones</label><textarea id="x-ins" rows="2" formControlName="instrucciones" style="padding: 10px 12px; min-height: 64px"></textarea></div>
        <div class="field"><label for="x-ini">Se puede rendir desde</label><input id="x-ini" type="datetime-local" formControlName="fechaInicio" /></div>
        <div class="field"><label for="x-fin">Hasta</label><input id="x-fin" type="datetime-local" formControlName="fechaFin" /></div>
        <div class="field"><label for="x-dur">Duración (minutos)</label><input id="x-dur" type="number" min="1" formControlName="duracionMin" /></div>
        <div class="field"><label for="x-int">Intentos permitidos</label><input id="x-int" type="number" min="1" formControlName="intentosMax" /></div>
        <div class="field full"><label class="check"><input type="checkbox" formControlName="barajarPreguntas" /> Barajar el orden de las preguntas</label></div>
      </div>

      <h2 style="margin: 18px 0 8px">Preguntas del examen <span class="badge" style="margin-left: 6px">{{ nElegidas() }} elegidas · {{ puntajeTotal() }} puntos</span></h2>
      <div class="table-wrap" style="max-height: 280px; overflow-y: auto; border: 1px solid var(--line); border-radius: 10px">
        <table class="table" style="min-width: 0">
          <tbody>
            @for (p of banco(); track p.id) {
              <tr>
                <td style="width: 40px"><input type="checkbox" [checked]="estaElegida(p)" (change)="alternar(p, $any($event.target).checked)" [attr.aria-label]="'Incluir: ' + p.enunciado" style="width: 18px; height: 18px" /></td>
                <td>{{ p.enunciado }}<div class="muted">{{ p.tipo.replaceAll('_', ' ').toLowerCase() }}{{ p.tema ? ' · ' + p.tema : '' }}</div></td>
                <td style="width: 70px" class="muted">{{ p.puntaje }} pts</td>
              </tr>
            } @empty {
              <tr><td class="vacio">No hay preguntas activas en el banco de este curso. Créalas en «Banco de preguntas».</td></tr>
            }
          </tbody>
        </table>
      </div>
      @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="submit" form="form-examen" class="btn btn-primary" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : 'Guardar borrador' }}</button>
    </ng-container>
  </app-modal>
}

@if (resultados(); as r) {
  <app-modal [titulo]="'Resultados · ' + r.titulo" [ancho]="720" (cerrar)="cerrarResultados()">
    <section class="kpis" style="margin-bottom: 16px">
      <div class="kpi"><div class="etiqueta">Alumnos evaluados</div><div class="valor">{{ r.alumnosEvaluados }}</div></div>
      <div class="kpi"><div class="etiqueta">Promedio</div><div class="valor">{{ r.promedioNotas !== undefined && r.promedioNotas !== null ? (r.promedioNotas | number: '1.1-1') : '—' }}</div></div>
      <div class="kpi"><div class="etiqueta">Nota máx. / mín.</div><div class="valor" style="font-size: 22px">{{ r.notaMaxima ?? '—' }} / {{ r.notaMinima ?? '—' }}</div></div>
    </section>
    @if (pendientesRevision() > 0) {
      <div class="aviso aviso-warn" style="margin-bottom: 12px">{{ pendientesRevision() }} intento(s) tienen preguntas abiertas pendientes de revisión.</div>
    }
    <div class="table-wrap">
      <table class="table" style="min-width: 0">
        <thead><tr><th>Alumno</th><th>Intento</th><th>Estado</th><th>Puntaje</th><th>Nota</th></tr></thead>
        <tbody>
          @for (i of r.intentos; track i.intentoId) {
            <tr>
              <td><strong>{{ i.alumnoNombre }}</strong></td>
              <td>{{ i.numeroIntento }}</td>
              <td><span class="badge">{{ i.estado.replace('_', ' ') }}</span>@if (i.requiereRevision) { <span class="badge badge-warn" style="margin-left: 4px">Revisar</span> }</td>
              <td>{{ i.puntajeObtenido ?? '—' }} / {{ r.puntajeTotal }}</td>
              <td [style.color]="(i.nota ?? 20) < 11 ? 'var(--danger)' : ''"><strong>{{ i.nota ?? '—' }}</strong></td>
            </tr>
          } @empty {
            <tr><td colspan="5" class="vacio">Nadie rindió este examen todavía.</td></tr>
          }
        </tbody>
      </table>
    </div>
    <ng-container footer><button type="button" class="btn btn-primary" (click)="cerrarResultados()">Cerrar</button></ng-container>
  </app-modal>
}
```

---

<a id="24-docente-examenescomponentts"></a>
## 24. `docente-examenes.component.ts` — Feature Exámenes Docente y Banco

**Ruta del archivo:** `frontend/src/app/features/docente/examenes/docente-examenes.component.ts`

### **¿Qué hace este archivo?**
Componente TypeScript para la gestión de exámenes del docente: listado de evaluaciones, programación de fechas, creación y edición de pruebas, publicación en un clic y cierre de evaluaciones.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EstadoExamen, Examen, Pregunta, ResultadosExamen } from '../../../core/models/examen.model';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ContextoDocente, DocenteContextoService } from '../../../core/services/docente-contexto.service';
import { ExamenService } from '../../../core/services/examen.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

const CLASE: Record<EstadoExamen, string> = { BORRADOR: 'badge-gray', PUBLICADO: 'badge-ok', CERRADO: 'badge-warn', CALIFICADO: 'badge-violet' };

const aLocal = (iso: string): string => iso.slice(0, 16);
const enLocal = (d: Date): string => new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);

@Component({
  selector: 'app-docente-examenes',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, DecimalPipe, ModalComponent, PageHeaderComponent],
  templateUrl: './docente-examenes.component.html'
})
export class DocenteExamenesComponent implements OnInit {
  private readonly api = inject(ExamenService);
  private readonly contexto = inject(DocenteContextoService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  /** Dentro de la página de un curso: solo los exámenes de esa sección y curso, sin cabecera. */
  readonly seccionId = input<number | null>(null);
  readonly cursoId = input<number | null>(null);
  readonly embebido = input(false);

  protected readonly ctx = signal<ContextoDocente | null>(null);
  protected readonly examenes = signal<Examen[]>([]);
  protected readonly total = signal(0);
  protected readonly paginas = signal(1);
  protected readonly pagina = signal(0);
  protected readonly cargando = signal(false);
  protected readonly estado = this.fb.nonNullable.control<EstadoExamen | ''>('');

  // crear / editar
  protected readonly abierto = signal(false);
  protected readonly editando = signal<Examen | null>(null);
  protected readonly banco = signal<Pregunta[]>([]);
  /** preguntaId → puntaje elegido para este examen. */
  protected readonly elegidas = signal<Record<number, number>>({});
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    asignacion: [0, [Validators.required, Validators.min(1)]],
    periodoId: [0, [Validators.required, Validators.min(1)]],
    titulo: ['', [Validators.required, Validators.maxLength(150)]],
    instrucciones: [''],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    duracionMin: [40, [Validators.required, Validators.min(1)]],
    intentosMax: [1, [Validators.required, Validators.min(1)]],
    barajarPreguntas: [true]
  });

  protected readonly puntajeTotal = computed(() => Object.values(this.elegidas()).reduce((s, n) => s + n, 0));
  protected readonly nElegidas = computed(() => Object.keys(this.elegidas()).length);

  // resultados
  protected readonly resultados = signal<ResultadosExamen | null>(null);
  protected readonly pendientesRevision = signal(0);

  ngOnInit(): void {
    this.contexto.cargar().subscribe({
      next: c => {
        this.ctx.set(c);
        this.cargar(0);
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo cargar tu información de docente.'))
    });
  }

  protected clase(e: EstadoExamen): string {
    return CLASE[e];
  }

  protected etiqueta(x: Examen): string {
    const a = this.ctx()?.asignaciones.find(y => y.seccionId === x.seccionId && y.cursoId === x.cursoId);
    return a ? `${a.cursoNombre} · ${a.seccionNombre}` : `Sección ${x.seccionId}`;
  }

  protected irA(p: number): void {
    if (p >= 0 && p < this.paginas()) this.cargar(p);
  }

  protected cargar(pagina = 0): void {
    this.cargando.set(true);
    this.api.listar({ estado: this.estado.value, seccionId: this.seccionId() ?? undefined, cursoId: this.cursoId() ?? undefined }, pagina).subscribe({
      next: p => {
        this.examenes.set(p.contenido);
        this.total.set(p.totalElementos);
        this.paginas.set(Math.max(1, p.totalPaginas));
        this.pagina.set(p.pagina);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los exámenes.'));
      }
    });
  }

  // --- crear / editar ---
  protected nuevo(): void {
    const c = this.ctx();
    const inicio = new Date(Date.now() + 86_400_000);
    inicio.setHours(8, 0, 0, 0);
    const fin = new Date(inicio.getTime() + 4 * 3_600_000);
    this.form.reset({
      asignacion: c?.asignaciones.find(a => a.seccionId === this.seccionId() && a.cursoId === this.cursoId())?.id ?? c?.asignaciones[0]?.id ?? 0, periodoId: c?.periodoActivo?.id ?? 0, titulo: '', instrucciones: '',
      fechaInicio: enLocal(inicio), fechaFin: enLocal(fin), duracionMin: 40, intentosMax: 1, barajarPreguntas: true
    });
    this.form.controls.asignacion.enable();
    this.elegidas.set({});
    this.editando.set(null);
    this.errorForm.set(null);
    this.cargarBanco();
    this.abierto.set(true);
  }

  protected editar(x: Examen): void {
    const a = this.ctx()?.asignaciones.find(y => y.seccionId === x.seccionId && y.cursoId === x.cursoId);
    this.form.reset({
      asignacion: a?.id ?? 0, periodoId: x.periodoId, titulo: x.titulo, instrucciones: x.instrucciones ?? '',
      fechaInicio: aLocal(x.fechaInicio), fechaFin: aLocal(x.fechaFin), duracionMin: x.duracionMin, intentosMax: x.intentosMax, barajarPreguntas: x.barajarPreguntas
    });
    this.form.controls.asignacion.disable();
    this.editando.set(x);
    this.errorForm.set(null);
    this.cargarBanco();
    this.api.detalle(x.id).subscribe(d => this.elegidas.set(Object.fromEntries(d.preguntas.map(p => [p.preguntaId, p.puntaje]))));
    this.abierto.set(true);
  }

  protected cargarBanco(): void {
    const a = this.ctx()?.asignaciones.find(y => y.id === this.form.controls.asignacion.value);
    if (!a) {
      this.banco.set([]);
      return;
    }
    this.elegidas.set({});
    this.api.preguntas(a.cursoId, undefined, undefined, 0, 100).subscribe({
      next: p => this.banco.set(p.contenido.filter(x => x.activa)),
      error: e => this.avisos.error(mensajeError(e, 'No se pudo cargar el banco de preguntas.'))
    });
  }

  protected estaElegida(p: Pregunta): boolean {
    return p.id in this.elegidas();
  }

  protected alternar(p: Pregunta, marcada: boolean): void {
    this.elegidas.update(m => {
      const n = { ...m };
      if (marcada) n[p.id] = p.puntaje;
      else delete n[p.id];
      return n;
    });
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardar(): void {
    const v = this.form.getRawValue();
    const a = this.ctx()?.asignaciones.find(y => y.id === v.asignacion);
    if (this.form.invalid || !a) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.nElegidas() === 0) {
      this.errorForm.set('Elige al menos una pregunta del banco.');
      return;
    }
    if (v.fechaFin <= v.fechaInicio) {
      this.errorForm.set('La ventana debe terminar después de empezar.');
      return;
    }
    const preguntas = Object.entries(this.elegidas()).map(([id, puntaje], i) => ({ preguntaId: Number(id), orden: i + 1, puntaje }));
    const body = {
      anioId: this.ctx()!.anio.id, periodoId: v.periodoId, seccionId: a.seccionId, cursoId: a.cursoId, titulo: v.titulo.trim(),
      instrucciones: v.instrucciones.trim() || undefined, fechaInicio: v.fechaInicio + ':00', fechaFin: v.fechaFin + ':00',
      duracionMin: v.duracionMin, intentosMax: v.intentosMax, barajarPreguntas: v.barajarPreguntas, preguntas
    };
    const e = this.editando();
    this.guardando.set(true);
    (e ? this.api.actualizar(e.id, body) : this.api.crear(body)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(e ? 'Examen actualizado.' : 'Examen creado como borrador. Publícalo cuando esté listo.');
        this.cerrar();
        this.cargar(this.pagina());
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  protected async publicar(x: Examen): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Publicar "${x.titulo}"? Ya no podrás cambiar sus preguntas y los alumnos reciben un aviso.`, 'Publicar'))) return;
    this.api.publicar(x.id).subscribe({
      next: () => {
        this.avisos.success('Examen publicado.');
        this.cargar(this.pagina());
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  protected async cerrarExamen(x: Examen): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Cerrar "${x.titulo}" ahora? Los intentos en curso se envían y se califican.`, 'Cerrar examen', true))) return;
    this.api.cerrar(x.id).subscribe({
      next: () => {
        this.avisos.success('Examen cerrado.');
        this.cargar(this.pagina());
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  // --- resultados ---
  protected verResultados(x: Examen): void {
    this.resultados.set(null);
    this.pendientesRevision.set(0);
    this.api.resultados(x.id).subscribe({
      next: r => this.resultados.set(r),
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar los resultados.'))
    });
    this.api.pendientesRevision(x.id).subscribe({ next: p => this.pendientesRevision.set(p.length), error: () => undefined });
  }

  protected cerrarResultados(): void {
    this.resultados.set(null);
  }
}
```

---

<a id="25-familia-examenescomponenthtml"></a>
## 25. `familia-examenes.component.html` — Feature Rendir Examen - Estudiante

**Ruta del archivo:** `frontend/src/app/features/familia/examenes/familia-examenes.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `familia-examenes`.

```html
<div class="page">
  <app-page-header titulo="Exámenes" subtitulo="Rinde tus exámenes en línea y revisa tus resultados. El tiempo lo controla el servidor." />

  @if (esAlumno()) {
    <section class="card">
      <div class="card-body" style="padding-bottom: 0"><h2>Disponibles para rendir</h2></div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Examen</th><th>Disponible hasta</th><th>Duración</th><th>Intentos</th><th></th></tr></thead>
          <tbody>
            @for (e of disponibles(); track e.examenId) {
              <tr>
                <td><strong>{{ e.titulo }}</strong>@if (e.instrucciones) { <div class="muted">{{ e.instrucciones }}</div> }</td>
                <td>{{ e.fechaFin | date: 'dd/MM HH:mm' }}</td>
                <td>{{ e.duracionMin }} min</td>
                <td>{{ e.intentosRealizados }} de {{ e.intentosMax }}</td>
                <td class="acciones">
                  @if (e.puedeRendir) { <a class="btn btn-sm btn-primary" [routerLink]="['/familia/examenes', e.examenId, 'rendir']">Rendir examen</a> }
                  @else { <span class="badge badge-gray">Sin intentos</span> }
                </td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="vacio">No hay exámenes disponibles ahora.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  }

  <section class="card">
    <div class="card-body" style="padding-bottom: 0"><h2>Resultados</h2></div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Examen</th><th>Enviado</th><th>Puntaje</th><th>Nota</th><th>Estado</th></tr></thead>
        <tbody>
          @for (r of mios(); track r.intentoId) {
            <tr>
              <td><strong>{{ r.tituloExamen }}</strong><div class="muted">Intento {{ r.numeroIntento }}</div></td>
              <td class="muted">{{ r.enviadoEn ? (r.enviadoEn | date: 'dd/MM HH:mm') : '—' }}</td>
              <td>{{ r.puntajeObtenido ?? '—' }} / {{ r.puntajeTotal }}</td>
              <td>
                @if (r.nota !== undefined && r.nota !== null) { <strong [style.color]="r.nota < 11 ? 'var(--danger)' : ''">{{ r.nota }}</strong> }
                @else { <span class="muted">{{ r.requiereRevisionAbiertas ? 'Pendiente de revisión' : '—' }}</span> }
              </td>
              <td><span [class]="'badge ' + clase(r.estado)">{{ r.estado.replace('_', ' ') }}</span></td>
            </tr>
          } @empty {
            <tr><td colspan="5" class="vacio">{{ cargando() ? 'Cargando…' : 'Todavía no hay resultados.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </section>
</div>
```

---

<a id="26-familia-examenescomponentts"></a>
## 26. `familia-examenes.component.ts` — Feature Rendir Examen - Estudiante

**Ruta del archivo:** `frontend/src/app/features/familia/examenes/familia-examenes.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `familia-examenes.component`.

```typescript
import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExamenDisponible, IntentoResultado } from '../../../core/models/examen.model';
import { ExamenService } from '../../../core/services/examen.service';
import { FamiliaContextoService } from '../../../core/services/familia-contexto.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-familia-examenes',
  imports: [RouterLink, DatePipe, PageHeaderComponent],
  templateUrl: './familia-examenes.component.html'
})
export class FamiliaExamenesComponent implements OnInit {
  protected readonly ctx = inject(FamiliaContextoService);
  private readonly api = inject(ExamenService);
  private readonly avisos = inject(NotificationService);

  protected readonly disponibles = signal<ExamenDisponible[]>([]);
  protected readonly mios = signal<IntentoResultado[]>([]);
  protected readonly cargando = signal(true);
  protected readonly esAlumno = computed(() => !this.ctx.esApoderado());

  ngOnInit(): void {
    this.ctx.cargar().subscribe({ error: e => this.avisos.error(mensajeError(e)) });
    this.api.mios().subscribe({
      next: r => {
        this.mios.set(r as IntentoResultado[]);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los resultados.'));
      }
    });
    if (!this.ctx.esApoderado()) this.api.disponibles().subscribe({ next: d => this.disponibles.set(d), error: () => this.disponibles.set([]) });
  }

  protected clase(e: string): string {
    return e === 'CALIFICADO' ? 'badge-ok' : e === 'ENVIADO' ? 'badge-warn' : e === 'EN_CURSO' ? 'badge' : 'badge-gray';
  }
}
```

---

<a id="27-rendir-examencomponenthtml"></a>
## 27. `rendir-examen.component.html` — Feature Rendir Examen - Estudiante

**Ruta del archivo:** `frontend/src/app/features/familia/examenes/rendir-examen.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `rendir-examen`.

```html
<div class="page">
  @switch (fase()) {
    @case ('inicio') {
      <app-page-header [titulo]="examen()?.titulo ?? 'Examen'" subtitulo="Lee estas indicaciones antes de comenzar.">
        <a class="btn" routerLink="/familia/examenes">Volver</a>
      </app-page-header>
      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }
      @if (examen(); as e) {
        <section class="card">
          <div class="card-body">
            @if (e.instrucciones) { <p style="margin-top: 0; white-space: pre-line">{{ e.instrucciones }}</p> }
            <ul style="line-height: 1.8; padding-left: 20px">
              <li>Tienes <strong>{{ e.duracionMin }} minutos</strong> desde que comienzas. El tiempo lo controla el servidor: cerrar la página no lo detiene.</li>
              <li>Tus respuestas se guardan solas mientras avanzas.</li>
              <li>Intentos: {{ e.intentosRealizados }} de {{ e.intentosMax }} usados. Puntaje total: {{ e.puntajeTotal }}.</li>
              <li>Si el tiempo termina, el examen se envía automáticamente.</li>
            </ul>
            <button type="button" class="btn btn-primary" [disabled]="iniciando() || !e.puedeRendir" (click)="comenzar()">
              {{ iniciando() ? 'Iniciando…' : e.intentosRealizados > 0 ? 'Continuar o comenzar' : 'Comenzar examen' }}
            </button>
          </div>
        </section>
      } @else if (!cargando()) {
        <div class="aviso aviso-warn">Este examen no está disponible para ti en este momento.</div>
      }
    }

    @case ('rindiendo') {
      <div class="cabecera-examen">
        <div><strong>{{ intento()?.tituloExamen }}</strong><div class="muted">{{ contestadas() }} de {{ preguntas().length }} respondidas</div></div>
        <div class="reloj" [class.poco]="poco()" role="timer" [attr.aria-label]="'Tiempo restante ' + reloj()">{{ reloj() }}</div>
        <button type="button" class="btn btn-primary" [disabled]="enviando()" (click)="enviar()">{{ enviando() ? 'Enviando…' : 'Enviar examen' }}</button>
      </div>
      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      @for (p of preguntas(); track p.preguntaId; let n = $index) {
        <section class="card">
          <div class="card-body">
            <div class="toolbar" style="justify-content: space-between; margin-bottom: 10px">
              <strong>Pregunta {{ n + 1 }}</strong>
              <span class="muted">{{ p.puntaje }} pts @if (guardadas().has(p.preguntaId)) { · <span style="color: var(--ok)">guardada</span> }</span>
            </div>
            <p style="margin: 0 0 14px; white-space: pre-line">{{ p.enunciado }}</p>
            @if (p.tipo === 'ABIERTA') {
              <textarea class="respuesta" rows="4" [value]="respuestas()[p.preguntaId]?.texto ?? ''" (input)="escribir(p, $any($event.target).value)" (blur)="guardarTexto(p)" [attr.aria-label]="'Respuesta de la pregunta ' + (n + 1)"></textarea>
            } @else {
              <div style="display: flex; flex-direction: column; gap: 8px" role="group" [attr.aria-label]="'Opciones de la pregunta ' + (n + 1)">
                @for (o of p.opciones; track o.id) {
                  <label class="opcion" [class.marcada]="marcada(p, o.id)">
                    <input [type]="p.tipo === 'OPCION_MULTIPLE' ? 'checkbox' : 'radio'" [name]="'p' + p.preguntaId" [checked]="marcada(p, o.id)" (change)="elegir(p, o.id, $any($event.target).checked)" />
                    {{ o.texto }}
                  </label>
                }
              </div>
              @if (p.tipo === 'OPCION_MULTIPLE') { <div class="muted" style="margin-top: 8px">Puede haber más de una respuesta correcta.</div> }
            }
          </div>
        </section>
      }
    }

    @case ('enviado') {
      <app-page-header titulo="Examen enviado" [subtitulo]="resultado()?.tituloExamen ?? ''" />
      @if (resultado(); as r) {
        <section class="card">
          <div class="card-body">
            @if (r.nota !== undefined && r.nota !== null) {
              <div class="kpi" style="border: 0; padding: 0"><div class="etiqueta">Tu nota</div><div class="valor">{{ r.nota }}</div><div class="nota">{{ r.puntajeObtenido }} de {{ r.puntajeTotal }} puntos</div></div>
            } @else if (r.requiereRevisionAbiertas) {
              <div class="aviso aviso-warn">Tus respuestas se enviaron. Tu docente debe revisar las preguntas abiertas; la nota final aparecerá cuando termine. Puntaje parcial: <strong>{{ r.puntajeObtenido }}</strong> de {{ r.puntajeTotal }}.</div>
            } @else {
              <div class="aviso aviso-ok">Tus respuestas se enviaron correctamente.</div>
            }
            <button type="button" class="btn btn-primary" style="margin-top: 16px" (click)="volver()">Volver a exámenes</button>
          </div>
        </section>
      }
    }
  }
</div>
```

---

<a id="28-rendir-examencomponentts"></a>
## 28. `rendir-examen.component.ts` — Feature Rendir Examen - Estudiante

**Ruta del archivo:** `frontend/src/app/features/familia/examenes/rendir-examen.component.ts`

### **¿Qué hace este archivo?**
Componente TypeScript para que el alumno rinda un examen en línea. Controla el temporizador regresivo de tiempo límite, el guardado continuo de respuestas y la entrega definitiva con confirmación.

```typescript
import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { interval } from 'rxjs';
import { ExamenDisponible, IntentoIniciado, IntentoResultado, PreguntaEstudiante } from '../../../core/models/examen.model';
import { ConfirmService } from '../../../core/services/confirm.service';
import { ExamenService } from '../../../core/services/examen.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

interface Respuesta {
  opciones: number[];
  texto: string;
}

type Fase = 'inicio' | 'rindiendo' | 'enviado';

@Component({
  selector: 'app-rendir-examen',
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './rendir-examen.component.html',
  styleUrl: './rendir-examen.component.css'
})
export class RendirExamenComponent {
  private readonly api = inject(ExamenService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly router = inject(Router);

  /** Parámetro de ruta `:id` = id del examen. */
  readonly id = input.required<string>();

  protected readonly fase = signal<Fase>('inicio');
  protected readonly examen = signal<ExamenDisponible | null>(null);
  protected readonly intento = signal<IntentoIniciado | null>(null);
  protected readonly resultado = signal<IntentoResultado | null>(null);
  protected readonly respuestas = signal<Record<number, Respuesta>>({});
  protected readonly guardadas = signal<Set<number>>(new Set());
  protected readonly cargando = signal(true);
  protected readonly iniciando = signal(false);
  protected readonly enviando = signal(false);
  protected readonly error = signal<string | null>(null);

  // Reloj: solo muestra lo que queda según `venceEn`; quien cierra el intento a la hora es el servidor.
  private readonly ahora = signal(Date.now());
  protected readonly restanteSeg = computed(() => {
    const i = this.intento();
    if (!i) return 0;
    return Math.max(0, Math.floor((Date.parse(i.venceEn) - this.ahora()) / 1000));
  });
  protected readonly reloj = computed(() => {
    const s = this.restanteSeg();
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  });
  protected readonly poco = computed(() => this.restanteSeg() <= 300);
  protected readonly preguntas = computed(() => [...(this.intento()?.preguntas ?? [])].sort((a, b) => a.orden - b.orden));
  protected readonly contestadas = computed(() => this.preguntas().filter(p => this.estaRespondida(p)).length);

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => {
        this.ahora.set(Date.now());
        if (this.fase() === 'rindiendo' && this.restanteSeg() === 0 && !this.enviando()) this.enviarAutomatico();
      });
    queueMicrotask(() => this.cargarExamen());
  }

  private cargarExamen(): void {
    this.api.disponibles().subscribe({
      next: d => {
        this.examen.set(d.find(e => e.examenId === Number(this.id())) ?? null);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.error.set(mensajeError(e, 'No se pudo cargar el examen.'));
      }
    });
  }

  // --- empezar ---
  protected comenzar(): void {
    this.iniciando.set(true);
    this.error.set(null);
    this.api.iniciarIntento(Number(this.id())).subscribe({
      next: i => {
        this.iniciando.set(false);
        this.intento.set(i);
        const previas: Record<number, Respuesta> = {};
        for (const p of i.preguntas) previas[p.preguntaId] = { opciones: p.opcionesRespondidas ?? [], texto: p.textoRespondido ?? '' };
        this.respuestas.set(previas);
        this.guardadas.set(new Set(i.preguntas.filter(p => (p.opcionesRespondidas?.length ?? 0) > 0 || p.textoRespondido).map(p => p.preguntaId)));
        this.fase.set('rindiendo');
      },
      error: e => {
        this.iniciando.set(false);
        this.error.set(mensajeError(e, 'No se pudo iniciar el examen.'));
      }
    });
  }

  // --- responder ---
  protected estaRespondida(p: PreguntaEstudiante): boolean {
    const r = this.respuestas()[p.preguntaId];
    return !!r && (r.opciones.length > 0 || r.texto.trim().length > 0);
  }

  protected marcada(p: PreguntaEstudiante, opcionId: number): boolean {
    return this.respuestas()[p.preguntaId]?.opciones.includes(opcionId) ?? false;
  }

  protected elegir(p: PreguntaEstudiante, opcionId: number, marcada: boolean): void {
    const actual = this.respuestas()[p.preguntaId]?.opciones ?? [];
    const opciones = p.tipo === 'OPCION_MULTIPLE' ? (marcada ? [...new Set([...actual, opcionId])] : actual.filter(x => x !== opcionId)) : [opcionId];
    this.respuestas.update(r => ({ ...r, [p.preguntaId]: { ...(r[p.preguntaId] ?? { texto: '' }), opciones } }));
    this.guardar(p, { opcionesIds: opciones });
  }

  protected escribir(p: PreguntaEstudiante, texto: string): void {
    this.respuestas.update(r => ({ ...r, [p.preguntaId]: { opciones: r[p.preguntaId]?.opciones ?? [], texto } }));
  }

  protected guardarTexto(p: PreguntaEstudiante): void {
    this.guardar(p, { textoRespuesta: this.respuestas()[p.preguntaId]?.texto ?? '' });
  }

  /** Guardado incremental: cada respuesta se envía apenas cambia, así no se pierde nada si se corta la conexión. */
  private guardar(p: PreguntaEstudiante, cuerpo: { opcionesIds?: number[]; textoRespuesta?: string }): void {
    const i = this.intento();
    if (!i) return;
    this.api.guardarRespuesta(i.intentoId, p.preguntaId, cuerpo).subscribe({
      next: () => this.guardadas.update(s => new Set(s).add(p.preguntaId)),
      error: e => this.avisos.error(mensajeError(e, 'No se pudo guardar tu respuesta. Revisa tu conexión.'))
    });
  }

  // --- enviar ---
  protected async enviar(): Promise<void> {
    const faltan = this.preguntas().length - this.contestadas();
    const aviso = faltan > 0 ? `Te faltan ${faltan} pregunta(s) sin responder. Al enviar ya no podrás cambiar nada. ¿Enviar el examen?` : 'Al enviar ya no podrás cambiar tus respuestas. ¿Enviar el examen?';
    if (!(await this.confirmacion.confirmar(aviso, 'Enviar examen'))) return;
    this.mandar();
  }

  private enviarAutomatico(): void {
    this.avisos.warning('Se acabó el tiempo: tu examen se envió automáticamente.');
    this.mandar();
  }

  private mandar(): void {
    const i = this.intento();
    if (!i || this.enviando()) return;
    this.enviando.set(true);
    this.api.enviar(i.intentoId).subscribe({
      next: r => {
        this.enviando.set(false);
        this.resultado.set(r);
        this.fase.set('enviado');
      },
      error: e => {
        this.enviando.set(false);
        this.error.set(mensajeError(e, 'No se pudo enviar el examen.'));
      }
    });
  }

  protected volver(): void {
    this.router.navigate(['/familia/examenes']);
  }
}
```

---

<a id="29-boletinescomponenthtml"></a>
## 29. `boletines.component.html` — Feature Calificaciones, Cierre y Boletines

**Ruta del archivo:** `frontend/src/app/features/calificaciones/boletines/boletines.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `boletines`.

```html
<div class="page">
  <app-page-header titulo="Libretas y boletines" subtitulo="Notas por curso y periodo, resultado anual y boletines oficiales de un alumno." />

  <section class="card">
    <div class="card-body"><app-buscador-alumno [soloActivos]="false" (elegidoAlumno)="elegir($event)" /></div>
  </section>

  @if (libreta(); as l) {
    <app-libreta-vista [libreta]="l" />
  } @else if (cargando()) {
    <div class="muted">Cargando libreta…</div>
  } @else if (sinDatos()) {
    <div class="aviso aviso-warn">Este alumno no tiene matrícula con notas en el año activo.</div>
  } @else {
    <div class="vacio-guia"><strong>Busca a un alumno</strong><span>Verás sus notas por curso y periodo, el resultado anual y los boletines que puedes descargar.</span></div>
  }
</div>
```

---

<a id="30-boletinescomponentts"></a>
## 30. `boletines.component.ts` — Feature Calificaciones, Cierre y Boletines

**Ruta del archivo:** `frontend/src/app/features/calificaciones/boletines/boletines.component.ts`

### **¿Qué hace este archivo?**
Componente TypeScript para la emisión de libretas escolares. Permite a docentes y administradores generar los boletines por periodo y descargar los PDFs consolidados.

```typescript
import { Component, inject, signal } from '@angular/core';
import { AlumnoResumen } from '../../../core/models/alumno.model';
import { Libreta } from '../../../core/models/calificacion.model';
import { CalificacionService } from '../../../core/services/calificacion.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { BuscadorAlumnoComponent } from '../../../shared/components/buscador-alumno/buscador-alumno.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LibretaVistaComponent } from '../libreta-vista/libreta-vista.component';

@Component({
  selector: 'app-boletines',
  imports: [BuscadorAlumnoComponent, LibretaVistaComponent, PageHeaderComponent],
  templateUrl: './boletines.component.html'
})
export class BoletinesComponent {
  private readonly api = inject(CalificacionService);
  private readonly avisos = inject(NotificationService);

  protected readonly libreta = signal<Libreta | null>(null);
  protected readonly cargando = signal(false);
  protected readonly sinDatos = signal(false);

  protected elegir(a: AlumnoResumen | null): void {
    this.libreta.set(null);
    this.sinDatos.set(false);
    if (!a) return;
    this.cargando.set(true);
    this.api.libreta(a.id).subscribe({
      next: l => {
        this.libreta.set(l);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.sinDatos.set(true);
        this.avisos.warning(mensajeError(e, 'Este alumno aún no tiene libreta.'));
      }
    });
  }
}
```

---

<a id="31-cierrecomponenthtml"></a>
## 31. `cierre.component.html` — Feature Calificaciones, Cierre y Boletines

**Ruta del archivo:** `frontend/src/app/features/calificaciones/cierre/cierre.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `cierre`.

```html
<div class="page">
  <app-page-header titulo="Cierre de periodo y boletines" subtitulo="Promedios por alumno y curso. Al cerrar, los promedios se congelan y se pueden generar los boletines oficiales.">
    <button type="button" class="btn" [disabled]="ocupado() || promedios().length === 0 || cerrado" (click)="cerrarPeriodo()">Cerrar periodo</button>
    @if (esAdmin()) { <button type="button" class="btn" [disabled]="ocupado() || !cerrado" (click)="abrirReapertura()">Reabrir…</button> }
    <button type="button" class="btn btn-primary" [disabled]="ocupado() || !cerrado" (click)="generarBoletines()">Generar boletines</button>
  </app-page-header>

  <form class="toolbar" [formGroup]="filtro">
    <select class="input" formControlName="anioId" (change)="alCambiarAnio()" aria-label="Año académico">
      @for (a of anios(); track a.id) { <option [ngValue]="a.id">Año {{ a.nombre }}</option> }
    </select>
    <select class="input" formControlName="seccionId" (change)="cargar()" aria-label="Sección">
      @for (s of secciones(); track s.id) { <option [ngValue]="s.id">{{ s.gradoNombre }} · {{ s.nombre }}</option> }
    </select>
    <select class="input" formControlName="periodoId" (change)="cargar()" aria-label="Periodo">
      @for (p of periodos(); track p.id) { <option [ngValue]="p.id">{{ p.nombre }} ({{ p.estado.toLowerCase() }})</option> }
    </select>
    @if (promedios().length > 0) { <span [class]="'badge ' + (cerrado ? 'badge-ok' : 'badge-warn')">{{ cerrado ? 'Periodo cerrado' : 'Abierto (promedios en borrador)' }}</span> }
  </form>

  <div class="card">
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Alumno</th><th>Curso</th><th>Promedio</th><th>Literal</th><th>Estado</th></tr></thead>
        <tbody>
          @for (p of promedios(); track p.id) {
            <tr>
              <td><strong>{{ p.alumnoNombre }}</strong></td>
              <td>{{ curso(p.cursoId) }}</td>
              <td [style.color]="p.promedio < 11 ? 'var(--danger)' : ''">{{ p.promedio | number: '1.2-2' }}</td>
              <td><span class="badge">{{ p.literal }}</span></td>
              <td><span [class]="'badge ' + (p.estado === 'CERRADO' ? 'badge-ok' : 'badge-warn')">{{ p.estado === 'CERRADO' ? 'Cerrado' : 'Borrador' }}</span></td>
            </tr>
          } @empty {
            <tr><td colspan="5" class="vacio">{{ cargando() ? 'Cargando…' : 'Aún no hay promedios calculados para esta sección y periodo (los docentes deben registrar notas).' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </div>

  @if (boletines().length > 0) {
    <section class="card">
      <div class="card-body" style="padding-bottom: 0"><h2>Boletines generados ({{ boletines().length }})</h2></div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Alumno</th><th>Versión</th><th>Estado</th><th>Generado</th><th></th></tr></thead>
          <tbody>
            @for (b of boletines(); track b.id) {
              <tr>
                <td>Alumno {{ b.alumnoId }}</td>
                <td>v{{ b.version }}</td>
                <td><span [class]="'badge ' + (b.estado === 'VIGENTE' ? 'badge-ok' : 'badge-gray')">{{ b.estado }}</span></td>
                <td class="muted">{{ b.generadoEn | date: 'dd/MM/yyyy HH:mm' }}</td>
                <td class="acciones"><button type="button" class="btn btn-sm" (click)="descargar(b)">Descargar PDF</button></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  }

  <section class="card">
    <div class="card-body toolbar" style="justify-content: space-between">
      <h2>Resultados anuales</h2>
      <button type="button" class="btn btn-sm" (click)="verResultadosAnuales()">Ver resultados de la sección</button>
    </div>
    @if (resultados().length > 0) {
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Alumno</th><th>Curso</th><th>Promedio final</th><th>Literal</th><th>Resultado</th></tr></thead>
          <tbody>
            @for (r of resultados(); track r.id) {
              <tr>
                <td>Alumno {{ r.alumnoId }}</td>
                <td>{{ curso(r.cursoId) }}</td>
                <td>{{ r.promedioFinal | number: '1.2-2' }}</td>
                <td><span class="badge">{{ r.literal }}</span></td>
                <td><span [class]="'badge ' + claseResultado(r.estado)">{{ r.estado }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  </section>
</div>

@if (reabriendo()) {
  <app-modal titulo="Reabrir periodo" [ancho]="480" (cerrar)="cerrarDialogo()">
    <p style="margin-top: 0">Reabrir permite corregir notas de un periodo cerrado. Queda registrado quién lo hizo y por qué.</p>
    <div class="field">
      <label for="r-motivo">Motivo</label>
      <textarea id="r-motivo" rows="3" [formControl]="motivo" style="padding: 10px 12px; min-height: 80px"></textarea>
    </div>
    @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrarDialogo()">Cancelar</button>
      <button type="button" class="btn btn-danger" [disabled]="ocupado()" (click)="reabrir()">Reabrir periodo</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="32-cierrecomponentts"></a>
## 32. `cierre.component.ts` — Feature Calificaciones, Cierre y Boletines

**Ruta del archivo:** `frontend/src/app/features/calificaciones/cierre/cierre.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `cierre.component`.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Boletin, Promedio, ResultadoAnual } from '../../../core/models/calificacion.model';
import { Anio, Periodo, Seccion } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { CalificacionService } from '../../../core/services/calificacion.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-cierre-periodo',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, ModalComponent, PageHeaderComponent],
  templateUrl: './cierre.component.html'
})
export class CierrePeriodoComponent implements OnInit {
  private readonly api = inject(CalificacionService);
  private readonly plan = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly esAdmin = inject(AuthService).isAdmin;

  protected readonly anios = signal<Anio[]>([]);
  protected readonly secciones = signal<Seccion[]>([]);
  protected readonly periodos = signal<Periodo[]>([]);
  protected readonly cursos = signal<Record<number, string>>({});
  protected readonly promedios = signal<Promedio[]>([]);
  protected readonly resultados = signal<ResultadoAnual[]>([]);
  protected readonly boletines = signal<Boletin[]>([]);
  protected readonly cargando = signal(false);
  protected readonly ocupado = signal(false);

  protected readonly filtro = this.fb.nonNullable.group({ anioId: 0, seccionId: 0, periodoId: 0 });

  protected readonly reabriendo = signal(false);
  protected readonly motivo = this.fb.nonNullable.control('');
  protected readonly errorForm = signal<string | null>(null);

  ngOnInit(): void {
    this.plan.anios().subscribe(a => {
      this.anios.set(a);
      this.filtro.patchValue({ anioId: a.find(x => x.estado === 'ACTIVO')?.id ?? 0 });
      this.alCambiarAnio();
    });
  }

  protected alCambiarAnio(): void {
    const anioId = this.filtro.controls.anioId.value;
    this.promedios.set([]);
    if (!anioId) return;
    // Periodos y secciones se piden juntos: los promedios necesitan ambos y si uno llega después la tabla quedaba vacía.
    forkJoin({ periodos: this.plan.periodos(anioId), secciones: this.plan.secciones(anioId) }).subscribe(({ periodos, secciones }) => {
      this.periodos.set(periodos);
      this.secciones.set(secciones);
      this.filtro.patchValue({
        periodoId: periodos.find(x => x.estado === 'ACTIVO')?.id ?? 0,
        seccionId: secciones[0]?.id ?? 0
      });
      this.cargar();
    });
  }

  protected cargar(): void {
    const { seccionId, periodoId } = this.filtro.getRawValue();
    this.promedios.set([]);
    this.resultados.set([]);
    if (!seccionId || !periodoId) return;
    const sec = this.secciones().find(s => s.id === seccionId);
    if (sec) {
      this.plan.malla(sec.gradoId).subscribe(m => this.cursos.set(Object.fromEntries(m.cursos.map(c => [c.cursoId, c.cursoNombre]))));
    }
    this.cargando.set(true);
    this.api.promedios(seccionId, periodoId).subscribe({
      next: p => {
        this.promedios.set(p);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los promedios.'));
      }
    });
  }

  protected curso(id: number): string {
    return this.cursos()[id] ?? `Curso ${id}`;
  }

  protected get cerrado(): boolean {
    return this.promedios().length > 0 && this.promedios().every(p => p.estado === 'CERRADO');
  }

  protected async cerrarPeriodo(): Promise<void> {
    const { seccionId, periodoId } = this.filtro.getRawValue();
    if (!(await this.confirmacion.confirmar('¿Cerrar el periodo para esta sección? Se congelan los promedios y ya no se podrán cambiar notas sin una reapertura autorizada.', 'Cerrar periodo', true))) return;
    this.ocupado.set(true);
    this.api.cerrarPeriodo(seccionId, periodoId).subscribe({
      next: () => {
        this.ocupado.set(false);
        this.avisos.success('Periodo cerrado.');
        this.cargar();
      },
      error: e => {
        this.ocupado.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cerrar el periodo.'));
      }
    });
  }

  protected abrirReapertura(): void {
    this.motivo.setValue('');
    this.errorForm.set(null);
    this.reabriendo.set(true);
  }

  protected cerrarDialogo(): void {
    this.reabriendo.set(false);
  }

  protected reabrir(): void {
    if (!this.motivo.value.trim()) {
      this.errorForm.set('El motivo de la reapertura es obligatorio y queda auditado.');
      return;
    }
    const { seccionId, periodoId } = this.filtro.getRawValue();
    this.ocupado.set(true);
    this.api.reabrirPeriodo(seccionId, periodoId, this.motivo.value.trim()).subscribe({
      next: () => {
        this.ocupado.set(false);
        this.avisos.success('Periodo reabierto.');
        this.cerrarDialogo();
        this.cargar();
      },
      error: e => {
        this.ocupado.set(false);
        this.errorForm.set(mensajeError(e));
      }
    });
  }

  protected generarBoletines(): void {
    const { seccionId, periodoId } = this.filtro.getRawValue();
    this.ocupado.set(true);
    this.api.generarBoletines({ seccionId, periodoId }).subscribe({
      next: b => {
        this.ocupado.set(false);
        this.boletines.set(b);
        this.avisos.success(`${b.length} boletines generados. Las familias reciben un aviso.`);
      },
      error: e => {
        this.ocupado.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron generar los boletines. El periodo debe estar cerrado.'));
      }
    });
  }

  protected descargar(b: Boletin): void {
    this.api.urlBoletin(b.id).subscribe({
      next: r => {
        const url = r.urlDescarga ?? r.url;
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo abrir el boletín.'))
    });
  }

  protected verResultadosAnuales(): void {
    this.api.resultadosAnuales(this.filtro.controls.seccionId.value).subscribe({
      next: r => this.resultados.set(r),
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar los resultados anuales.'))
    });
  }

  protected claseResultado(e: string): string {
    return e === 'APROBADO' ? 'badge-ok' : e === 'RECUPERACION' ? 'badge-warn' : 'badge-danger';
  }
}
```

---

<a id="33-libreta-vistacomponenthtml"></a>
## 33. `libreta-vista.component.html` — Feature Calificaciones, Cierre y Boletines

**Ruta del archivo:** `frontend/src/app/features/calificaciones/libreta-vista/libreta-vista.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `libreta-vista`.

```html
<section class="card">
  <div class="card-body" style="padding-bottom: 0">
    <h2>{{ libreta().alumnoNombre }}</h2>
    <div class="muted">Notas de 0 a 20. En rojo, lo que está por debajo de 11.</div>
  </div>
  <div class="table-wrap">
    <table class="table">
      <thead>
        <tr>
          <th>Curso</th>
          @for (p of columnas(); track p) { <th>{{ nombrePeriodo(p) }}</th> }
          <th>Promedio final</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        @for (c of libreta().cursos; track c.cursoId) {
          <tr>
            <td><strong>{{ nombreCurso(c) }}</strong></td>
            @for (p of columnas(); track p) { <td [style.color]="claseNota(c, p)">{{ nota(c, p) }}</td> }
            <td>{{ c.promedioFinal !== undefined && c.promedioFinal !== null ? (c.promedioFinal | number: '1.1-1') + ' (' + c.literalFinal + ')' : '—' }}</td>
            <td><span [class]="'badge ' + claseResultado(c.estadoFinal)">{{ c.estadoFinal ?? 'En curso' }}</span></td>
          </tr>
        } @empty {
          <tr><td [attr.colspan]="columnas().length + 3" class="vacio">Aún no hay notas registradas.</td></tr>
        }
      </tbody>
    </table>
  </div>
</section>

<section class="card">
  <div class="card-body" style="padding-bottom: 0"><h2>Boletines</h2></div>
  <div class="table-wrap">
    <table class="table">
      <thead><tr><th>Periodo</th><th>Versión</th><th>Estado</th><th>Generado</th><th></th></tr></thead>
      <tbody>
        @for (b of libreta().boletines; track b.id) {
          <tr>
            <td>{{ nombrePeriodo(b.periodoId) }}</td>
            <td>v{{ b.version }}</td>
            <td><span [class]="'badge ' + (b.estado === 'VIGENTE' ? 'badge-ok' : 'badge-gray')">{{ b.estado }}</span></td>
            <td class="muted">{{ b.generadoEn | date: 'dd/MM/yyyy HH:mm' }}</td>
            <td class="acciones"><button type="button" class="btn btn-sm" (click)="descargar(b)">Descargar PDF</button></td>
          </tr>
        } @empty {
          <tr><td colspan="5" class="vacio">Todavía no hay boletines generados.</td></tr>
        }
      </tbody>
    </table>
  </div>
</section>
```

---

<a id="34-libreta-vistacomponentts"></a>
## 34. `libreta-vista.component.ts` — Feature Calificaciones, Cierre y Boletines

**Ruta del archivo:** `frontend/src/app/features/calificaciones/libreta-vista/libreta-vista.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `libreta-vista.component`.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Boletin, Libreta } from '../../../core/models/calificacion.model';
import { Periodo } from '../../../core/models/planificacion.model';
import { CalificacionService } from '../../../core/services/calificacion.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';

/** Libreta de un alumno: notas por curso y periodo, resultado anual y boletines. La usan secretaría y las familias. */
@Component({
  selector: 'app-libreta-vista',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './libreta-vista.component.html'
})
export class LibretaVistaComponent {
  private readonly plan = inject(PlanificacionService);
  private readonly api = inject(CalificacionService);
  private readonly avisos = inject(NotificationService);

  readonly libreta = input.required<Libreta>();
  protected readonly periodos = signal<Periodo[]>([]);
  /** calificaciones-ms solo devuelve «Curso N»: el nombre real sale de la malla del grado. */
  private readonly nombresCurso = signal<Map<number, string>>(new Map());

  protected readonly columnas = computed(() => {
    const ids = new Set<number>();
    for (const c of this.libreta().cursos) for (const k of Object.keys(c.notasPorPeriodo ?? {})) ids.add(Number(k));
    for (const p of this.periodos()) ids.add(p.id);
    return [...ids].sort((a, b) => a - b);
  });

  constructor() {
    effect(() => {
      const anio = this.libreta().anioId;
      this.plan.periodos(anio).subscribe({ next: p => this.periodos.set(p), error: () => this.periodos.set([]) });
    });
    effect(() => {
      const grado = this.libreta().gradoId;
      this.plan.malla(grado).subscribe({ next: m => this.nombresCurso.set(new Map(m.cursos.map(c => [c.cursoId, c.cursoNombre]))), error: () => this.nombresCurso.set(new Map()) });
    });
  }

  protected nombreCurso(c: Libreta['cursos'][number]): string {
    return this.nombresCurso().get(c.cursoId) ?? c.cursoNombre;
  }

  protected nombrePeriodo(id: number): string {
    return this.periodos().find(p => p.id === id)?.nombre ?? `Periodo ${id}`;
  }

  protected nota(c: Libreta['cursos'][number], periodoId: number): string {
    const n = c.notasPorPeriodo?.[String(periodoId)];
    return n ? `${n.promedio.toFixed(1)} (${n.literal})` : '—';
  }

  protected claseNota(c: Libreta['cursos'][number], periodoId: number): string {
    const n = c.notasPorPeriodo?.[String(periodoId)];
    return n && n.promedio < 11 ? 'var(--danger)' : '';
  }

  protected claseResultado(e?: string): string {
    return e === 'APROBADO' ? 'badge-ok' : e === 'RECUPERACION' ? 'badge-warn' : e ? 'badge-danger' : 'badge-gray';
  }

  protected descargar(b: Boletin): void {
    this.api.urlBoletin(b.id).subscribe({
      next: r => {
        const url = r.urlDescarga ?? r.url;
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo abrir el boletín.'))
    });
  }
}
```

---

<a id="35-cobranzacomponenthtml"></a>
## 35. `cobranza.component.html` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/cobranza/cobranza.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `cobranza`.

```html
<div class="page">
  <app-page-header titulo="Cobranza" subtitulo="Pagos registrados por periodo y medio de pago, con su comprobante." />

  <form class="toolbar" [formGroup]="filtro" (ngSubmit)="cargar(0)">
    <label class="muted" for="c-desde">Desde</label>
    <input id="c-desde" class="input" type="date" formControlName="desde" />
    <label class="muted" for="c-hasta">Hasta</label>
    <input id="c-hasta" class="input" type="date" formControlName="hasta" />
    <select class="input" formControlName="medio" (change)="cargar(0)" aria-label="Medio de pago">
      <option value="">Todos los medios</option>
      @for (m of medios; track m) { <option [value]="m">{{ m.replace('_', '/') }}</option> }
    </select>
    <button type="submit" class="btn btn-primary">Consultar</button>
  </form>

  <section class="kpis" aria-label="Resumen">
    <div class="kpi"><div class="etiqueta">Pagos en el periodo</div><div class="valor">{{ total() }}</div></div>
    <div class="kpi"><div class="etiqueta">Cobrado en esta página</div><div class="valor" style="color: var(--ok)">S/ {{ totalPagina() | number: '1.2-2' }}</div></div>
  </section>

  <div class="card">
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Fecha</th><th>Alumno</th><th>Pagador</th><th>Medio</th><th>Comprobante</th><th>Monto</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          @for (p of pagos(); track p.id) {
            <tr>
              <td class="muted">{{ p.pagadoEn | date: 'dd/MM/yyyy HH:mm' }}</td>
              <td><strong>{{ nombres.nombre(p.alumnoId) }}</strong></td>
              <td>{{ p.pagadorNombre ?? '—' }}</td>
              <td>{{ p.medio.replace('_', '/') }}</td>
              <td>{{ p.comprobante?.numeroCompleto ?? '—' }}</td>
              <td><strong>S/ {{ p.montoTotal | number: '1.2-2' }}</strong></td>
              <td><span [class]="'badge ' + (p.estado === 'CONFIRMADO' ? 'badge-ok' : 'badge-gray')">{{ p.estado }}</span></td>
              <td class="acciones">
                <button type="button" class="btn btn-sm" (click)="ver(p)">Detalle</button>
                @if (esAdmin() && p.estado === 'CONFIRMADO') { <button type="button" class="btn btn-sm" (click)="pedirAnulacion(p)">Anular</button> }
              </td>
            </tr>
          } @empty {
            <tr><td colspan="8" class="vacio">{{ cargando() ? 'Cargando…' : 'No hay pagos en ese periodo.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
    <div class="toolbar" style="padding: 12px 16px; justify-content: space-between">
      <span class="muted">Página {{ pagina() + 1 }} de {{ paginas() }}</span>
      <span>
        <button type="button" class="btn btn-sm" [disabled]="pagina() === 0" (click)="irA(pagina() - 1)">Anterior</button>
        <button type="button" class="btn btn-sm" [disabled]="pagina() + 1 >= paginas()" (click)="irA(pagina() + 1)">Siguiente</button>
      </span>
    </div>
  </div>
</div>

@if (detalle(); as p) {
  <app-modal [titulo]="'Pago ' + (p.comprobante?.numeroCompleto ?? '#' + p.id)" [ancho]="620" (cerrar)="cerrar()">
    <dl class="datos" style="margin-bottom: 16px">
      <div><dt>Alumno</dt><dd>{{ nombres.nombre(p.alumnoId) }}</dd></div>
      <div><dt>Pagador</dt><dd>{{ p.pagadorNombre ?? '—' }} {{ p.pagadorDocumento ?? '' }}</dd></div>
      <div><dt>Medio</dt><dd>{{ p.medio.replace('_', '/') }} {{ p.referencia ?? '' }}</dd></div>
      <div><dt>Fecha</dt><dd>{{ p.pagadoEn | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
      <div><dt>Total</dt><dd>S/ {{ p.montoTotal | number: '1.2-2' }}</dd></div>
      <div><dt>Comprobante</dt><dd>{{ p.comprobante ? p.comprobante.tipo + ' ' + p.comprobante.numeroCompleto + ' (' + p.comprobante.estado + ')' : '—' }}</dd></div>
    </dl>
    <h2 style="margin-bottom: 8px">Cuotas pagadas</h2>
    <div class="table-wrap">
      <table class="table" style="min-width: 0">
        <thead><tr><th>Cuota</th><th>Aplicado</th><th>Saldo</th><th>Estado</th></tr></thead>
        <tbody>
          @for (d of p.detalles; track d.id) {
            <tr><td>{{ d.cuotaDescripcion }}</td><td>S/ {{ d.montoAplicado | number: '1.2-2' }}</td><td>S/ {{ d.nuevoSaldoCuota | number: '1.2-2' }}</td><td><span class="badge">{{ d.nuevoEstadoCuota }}</span></td></tr>
          }
        </tbody>
      </table>
    </div>
    <ng-container footer><button type="button" class="btn btn-primary" (click)="cerrar()">Cerrar</button></ng-container>
  </app-modal>
}

@if (anulando(); as p) {
  <app-modal titulo="Anular pago" [ancho]="480" (cerrar)="cerrar()">
    <p style="margin-top: 0">Se anulará el pago de <strong>S/ {{ p.montoTotal | number: '1.2-2' }}</strong> de {{ nombres.nombre(p.alumnoId) }} y su comprobante. Esta acción queda auditada.</p>
    <div class="field">
      <label for="a-motivo">Motivo</label>
      <textarea id="a-motivo" rows="3" [formControl]="motivo" style="padding: 10px 12px; min-height: 80px"></textarea>
    </div>
    @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="button" class="btn btn-danger" [disabled]="guardando()" (click)="anular()">Anular pago</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="36-cobranzacomponentts"></a>
## 36. `cobranza.component.ts` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/cobranza/cobranza.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `cobranza.component`.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MEDIOS_PAGO, Pago } from '../../../core/models/cobro.model';
import { AuthService } from '../../../core/services/auth.service';
import { CobroService } from '../../../core/services/cobro.service';
import { NombresAlumnoService } from '../../../core/services/nombres-alumno.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

const hoy = (): string => new Date().toISOString().slice(0, 10);
const inicioMes = (): string => hoy().slice(0, 8) + '01';

@Component({
  selector: 'app-cobranza',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, ModalComponent, PageHeaderComponent],
  templateUrl: './cobranza.component.html'
})
export class CobranzaComponent implements OnInit {
  private readonly api = inject(CobroService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  protected readonly nombres = inject(NombresAlumnoService);

  protected readonly esAdmin = inject(AuthService).isAdmin;
  protected readonly medios = MEDIOS_PAGO;

  protected readonly pagos = signal<Pago[]>([]);
  protected readonly total = signal(0);
  protected readonly paginas = signal(1);
  protected readonly pagina = signal(0);
  protected readonly cargando = signal(false);

  protected readonly filtro = this.fb.nonNullable.group({ desde: inicioMes(), hasta: hoy(), medio: '' });

  protected readonly detalle = signal<Pago | null>(null);
  protected readonly anulando = signal<Pago | null>(null);
  protected readonly motivo = this.fb.nonNullable.control('');
  protected readonly errorForm = signal<string | null>(null);
  protected readonly guardando = signal(false);

  ngOnInit(): void {
    this.cargar(0);
  }

  protected irA(p: number): void {
    if (p >= 0 && p < this.paginas()) this.cargar(p);
  }

  protected cargar(pagina = 0): void {
    const f = this.filtro.getRawValue();
    this.cargando.set(true);
    this.api.reporteCobranza(f.desde || undefined, f.hasta || undefined, f.medio || undefined, pagina).subscribe({
      next: p => {
        this.pagos.set(p.contenido);
        this.total.set(p.totalElementos);
        this.paginas.set(Math.max(1, p.totalPaginas));
        this.pagina.set(p.pagina);
        this.cargando.set(false);
        this.nombres.cargar(p.contenido.map(x => x.alumnoId));
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar el reporte.'));
      }
    });
  }

  protected totalPagina(): number {
    return this.pagos().filter(p => p.estado === 'CONFIRMADO').reduce((s, p) => s + p.montoTotal, 0);
  }

  protected ver(p: Pago): void {
    this.detalle.set(p);
  }

  protected cerrar(): void {
    this.detalle.set(null);
    this.anulando.set(null);
  }

  protected pedirAnulacion(p: Pago): void {
    this.motivo.setValue('');
    this.errorForm.set(null);
    this.anulando.set(p);
  }

  protected anular(): void {
    const p = this.anulando();
    if (!p) return;
    if (!this.motivo.value.trim()) {
      this.errorForm.set('El motivo es obligatorio.');
      return;
    }
    this.guardando.set(true);
    this.api.anular(p.id, this.motivo.value.trim()).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success('Pago anulado. Las cuotas vuelven a quedar pendientes y el comprobante se anula.');
        this.cerrar();
        this.cargar(this.pagina());
      },
      error: e => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(e));
      }
    });
  }
}
```

---

<a id="37-conceptoscomponenthtml"></a>
## 37. `conceptos.component.html` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/conceptos/conceptos.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `conceptos`.

```html
<div class="page">
  <app-page-header titulo="Conceptos de pago" subtitulo="Matrícula, pensión y otros cobros. Las tarifas se definen sobre estos conceptos.">
    <button type="button" class="btn btn-primary" (click)="nuevo()">Nuevo concepto</button>
  </app-page-header>

  <div class="card">
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Código</th><th>Nombre</th><th>Tipo</th><th>Estado</th><th></th></tr>
        </thead>
        <tbody>
          @for (c of conceptos(); track c.id) {
            <tr>
              <td>{{ c.codigo }}</td>
              <td><strong>{{ c.nombre }}</strong></td>
              <td><span class="badge">{{ c.tipo }}</span></td>
              <td><span [class]="'badge ' + (c.activo ? 'badge-ok' : 'badge-gray')">{{ c.activo ? 'Activo' : 'Inactivo' }}</span></td>
              <td class="acciones"><button type="button" class="btn btn-sm" (click)="editar(c)">Editar</button></td>
            </tr>
          } @empty {
            <tr><td colspan="5" class="vacio">{{ cargando() ? 'Cargando…' : 'Aún no hay conceptos.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </div>
</div>

@if (abierto()) {
  <app-modal [titulo]="editando() ? 'Editar concepto' : 'Nuevo concepto'" [ancho]="480" (cerrar)="cerrar()">
    <form [formGroup]="form" (ngSubmit)="guardar()" id="form-concepto" novalidate>
      <div class="form-grid">
        <div class="field">
          <label for="co-codigo">Código</label>
          <input id="co-codigo" formControlName="codigo" placeholder="PENSION" />
          @if (form.controls.codigo.touched && form.controls.codigo.invalid) { <span class="error">Obligatorio.</span> }
        </div>
        <div class="field">
          <label for="co-tipo">Tipo</label>
          <select id="co-tipo" formControlName="tipo">
            @for (t of tipos; track t) { <option [value]="t">{{ t }}</option> }
          </select>
        </div>
        <div class="field full">
          <label for="co-nombre">Nombre</label>
          <input id="co-nombre" formControlName="nombre" />
          @if (form.controls.nombre.touched && form.controls.nombre.invalid) { <span class="error">Obligatorio.</span> }
        </div>
        <div class="field full">
          <label class="check"><input type="checkbox" formControlName="activo" /> Concepto activo</label>
        </div>
      </div>
      @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="submit" form="form-concepto" class="btn btn-primary" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : 'Guardar' }}</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="38-conceptoscomponentts"></a>
## 38. `conceptos.component.ts` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/conceptos/conceptos.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `conceptos.component`.

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Concepto, TIPOS_CONCEPTO, TipoConcepto } from '../../../core/models/pago.model';
import { NotificationService } from '../../../core/services/notification.service';
import { PagoConfigService } from '../../../core/services/pago-config.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-conceptos',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  templateUrl: './conceptos.component.html'
})
export class ConceptosComponent implements OnInit {
  private readonly api = inject(PagoConfigService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly tipos = TIPOS_CONCEPTO;
  protected readonly conceptos = signal<Concepto[]>([]);
  protected readonly cargando = signal(false);
  protected readonly abierto = signal(false);
  protected readonly editando = signal<Concepto | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    codigo: ['', [Validators.required, Validators.maxLength(20)]],
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    tipo: ['PENSION' as TipoConcepto, Validators.required],
    activo: [true]
  });

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.api.conceptos().subscribe({
      next: c => {
        this.conceptos.set(c);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los conceptos.'));
      }
    });
  }

  protected nuevo(): void {
    this.form.reset({ codigo: '', nombre: '', tipo: 'PENSION', activo: true });
    this.abrir(null);
  }

  protected editar(c: Concepto): void {
    this.form.reset({ codigo: c.codigo, nombre: c.nombre, tipo: c.tipo, activo: c.activo });
    this.abrir(c);
  }

  private abrir(c: Concepto | null): void {
    this.errorForm.set(null);
    this.editando.set(c);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const body = { ...v, codigo: v.codigo.trim().toUpperCase(), nombre: v.nombre.trim() };
    const e = this.editando();
    this.guardando.set(true);
    (e ? this.api.actualizarConcepto(e.id, body) : this.api.crearConcepto(body)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(e ? 'Concepto actualizado.' : 'Concepto creado.');
        this.cerrar();
        this.cargar();
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }
}
```

---

<a id="39-creditots"></a>
## 39. `credito.ts` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/cuentas/credito.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `credito`.

```typescript
import { CreditoAlumno, MovimientoCredito, TipoMovimientoCredito } from '../../../core/models/cobro.model';

const soles = (n: number): string => `S/ ${n.toFixed(2)}`;

/** Lo que pasaría con el crédito del alumno, en una frase para la familia y para quien atiende. */
export function explicarCredito(c: Pick<CreditoAlumno, 'saldo' | 'exigible' | 'faltante' | 'sobrante'>): string {
  if (c.saldo <= 0 && c.exigible <= 0) return 'Sin crédito ni pensiones por cobrar. Cada depósito se suma al crédito y se cobra solo de la pensión cuando vence.';
  if (c.exigible <= 0) return 'No hay pensiones vencidas: el crédito queda a favor y se cobrará solo cuando venza cada pensión.';
  if (c.saldo <= 0) return `Hay ${soles(c.exigible)} de pensiones vencidas y el alumno no tiene crédito.`;
  if (c.faltante > 0) return `Las pensiones vencidas suman ${soles(c.exigible)}: el crédito cubre ${soles(c.saldo)} y quedarán ${soles(c.faltante)} por pagar.`;
  if (c.sobrante > 0) return `El crédito cubre todo lo vencido (${soles(c.exigible)}) y quedarán ${soles(c.sobrante)} de crédito.`;
  return `El crédito cubre exactamente lo vencido (${soles(c.exigible)}).`;
}

const ETIQUETA: Record<TipoMovimientoCredito, string> = {
  DEPOSITO: 'Depósito', COBRO_CUOTA: 'Cobro de pensión', REVERSION: 'Cobro anulado (vuelve al crédito)', ANULACION: 'Depósito anulado'
};

export const etiquetaMovimiento = (m: Pick<MovimientoCredito, 'tipo'>): string => ETIQUETA[m.tipo];

/** ¿Se puede cobrar ahora del crédito? Hace falta crédito y algo vencido. */
export const puedeCobrarAhora = (c: Pick<CreditoAlumno, 'saldo' | 'exigible'>): boolean => c.saldo > 0 && c.exigible > 0;

/** Un depósito se puede anular si no está anulado todavía. */
export const sePuedeAnular = (m: Pick<MovimientoCredito, 'tipo' | 'anulado'>): boolean => m.tipo === 'DEPOSITO' && !m.anulado;
```

---

<a id="40-cuentascomponenthtml"></a>
## 40. `cuentas.component.html` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/cuentas/cuentas.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `cuentas`.

```html
<div class="page">
  <app-page-header titulo="Cuentas por alumno" subtitulo="Cuotas, descuentos, mora, saldos y crédito de cada alumno.">
    @if (esAdmin() && alumno()) { <button type="button" class="btn" (click)="abrirDescuento()">Asignar descuento</button> }
  </app-page-header>

  <section class="card">
    <div class="card-body"><app-buscador-alumno [soloActivos]="false" (elegidoAlumno)="elegir($event)" /></div>
  </section>

  @if (!cuenta() && !cargando()) {
    <div class="vacio-guia"><strong>Busca a un alumno</strong><span>Verás sus cuotas, descuentos, mora, saldo y crédito, y podrás depositarle crédito o asignarle un descuento.</span></div>
  }

  @if (cuenta(); as c) {
    <section class="kpis" aria-label="Resumen de la cuenta">
      <div class="kpi"><div class="etiqueta">Total cobrado</div><div class="valor" style="color: var(--ok)">S/ {{ c.totalCobrado | number: '1.2-2' }}</div></div>
      <div class="kpi"><div class="etiqueta">Pendiente</div><div class="valor">S/ {{ c.totalPendiente | number: '1.2-2' }}</div></div>
      <div class="kpi"><div class="etiqueta">Vencido</div><div class="valor" [style.color]="c.totalVencido > 0 ? 'var(--danger)' : ''">S/ {{ c.totalVencido | number: '1.2-2' }}</div></div>
      <div class="kpi"><div class="etiqueta">Crédito a favor</div><div class="valor" [style.color]="(credito()?.saldo ?? c.credito ?? 0) > 0 ? 'var(--ok)' : ''">S/ {{ credito()?.saldo ?? c.credito ?? 0 | number: '1.2-2' }}</div></div>
    </section>

    <!-- Crédito del alumno -->
    <section class="card" aria-labelledby="t-credito">
      <div class="card-body">
        <div class="credito-cab">
          <div>
            <h2 id="t-credito" class="sec-titulo" style="margin: 0">Crédito del alumno</h2>
            <p class="muted" style="margin: 4px 0 0">Cada depósito suma a su crédito. Cuando vence una pensión se cobra sola del crédito: si no alcanza, la cuota queda con lo que falte; si sobra, el resto sigue como crédito.</p>
          </div>
          @if (esAdmin()) {
            <div class="credito-acciones">
              @if (credito(); as cr) {
                @if (puedeCobrarAhora(cr)) { <button type="button" class="btn" [disabled]="guardandoCredito()" (click)="cobrarDelCredito()" title="Cobra ahora del crédito las pensiones que ya vencieron">Cobrar del crédito ahora</button> }
              }
              <button type="button" class="btn btn-primary" (click)="abrirDeposito()">Depositar</button>
            </div>
          }
        </div>
        @if (credito(); as cr) {
          <div class="credito-cifras">
            <div><span class="muted">Crédito</span><strong style="color: var(--ok)">S/ {{ cr.saldo | number: '1.2-2' }}</strong></div>
            <div><span class="muted">Pensiones por cobrar hoy</span><strong [style.color]="cr.exigible > 0 ? 'var(--danger)' : ''">S/ {{ cr.exigible | number: '1.2-2' }}</strong></div>
            <div><span class="muted">Quedaría por pagar</span><strong [style.color]="cr.faltante > 0 ? 'var(--danger)' : ''">S/ {{ cr.faltante | number: '1.2-2' }}</strong></div>
            <div><span class="muted">Quedaría de crédito</span><strong>S/ {{ cr.sobrante | number: '1.2-2' }}</strong></div>
          </div>
          <div class="aviso" [class.aviso-warn]="cr.faltante > 0" [class.aviso-ok]="cr.faltante === 0 && cr.saldo > 0" role="status">{{ explicacion(cr) }}</div>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Fecha</th><th>Movimiento</th><th>Detalle</th><th>Monto</th><th>Crédito después</th><th></th></tr></thead>
              <tbody>
                @for (m of cr.movimientos; track m.id) {
                  <tr [class.anulado]="m.anulado">
                    <td>{{ m.creadoEn | date: 'dd/MM/yyyy HH:mm' }}</td>
                    <td><strong>{{ etiqueta(m) }}</strong>@if (m.anulado) { <span class="badge badge-gray" style="margin-left: 6px">anulado</span> }</td>
                    <td class="muted">{{ m.medio ? m.medio + (m.referencia ? ' · ' + m.referencia : '') : (m.detalle ?? '') }}</td>
                    <td [style.color]="m.signo > 0 ? 'var(--ok)' : 'var(--danger)'"><strong>{{ m.signo > 0 ? '+' : '−' }} S/ {{ m.monto | number: '1.2-2' }}</strong></td>
                    <td>S/ {{ m.saldoDespues | number: '1.2-2' }}</td>
                    <td class="acciones">@if (esAdmin() && sePuedeAnular(m)) { <button type="button" class="btn btn-sm" (click)="pedirAnular(m)">Anular</button> }</td>
                  </tr>
                } @empty {
                  <tr><td colspan="6" class="vacio">Aún no hay movimientos de crédito.</td></tr>
                }
              </tbody>
            </table>
          </div>
        } @else if (errorCredito()) {
          <p class="muted">No se pudo leer el crédito del alumno. <button type="button" class="enlace" (click)="elegir(alumno())">Reintentar</button></p>
        } @else {
          <p class="muted">Cargando el crédito…</p>
        }
      </div>
    </section>
    <div class="muted">Responsable de pago: <strong>{{ c.responsableNombre ?? '—' }}</strong></div>

    <div class="card">
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Concepto</th><th>Vence</th><th>Monto</th><th>Descuento</th><th>Mora</th><th>Saldo</th><th>Estado</th></tr></thead>
          <tbody>
            @for (q of c.cuotas; track q.id) {
              <tr>
                <td><strong>{{ q.descripcion }}</strong></td>
                <td>{{ q.fechaVencimiento | date: 'dd/MM/yyyy' }}@if (q.diasAtraso > 0) { <div class="muted" style="color: var(--danger)">{{ q.diasAtraso }} días de atraso</div> }</td>
                <td>{{ q.montoBase | number: '1.2-2' }}</td>
                <td>{{ q.descuento | number: '1.2-2' }}</td>
                <td [style.color]="q.mora > 0 ? 'var(--danger)' : ''">{{ q.mora | number: '1.2-2' }}</td>
                <td><strong>{{ q.saldo | number: '1.2-2' }}</strong></td>
                <td><span [class]="'badge ' + clase(q.estado)">{{ q.estado }}</span></td>
              </tr>
            } @empty {
              <tr><td colspan="7" class="vacio">Este alumno aún no tiene cuotas (se generan al matricularse, si hay tarifa).</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  } @else if (cargando()) {
    <div class="muted">Cargando…</div>
  }
</div>

@if (abierto()) {
  <app-modal titulo="Asignar descuento" [ancho]="480" (cerrar)="cerrar()">
    <form [formGroup]="form" (ngSubmit)="asignar()" id="form-desc" novalidate>
      <div class="form-grid">
        <div class="field full">
          <label for="d-desc">Descuento</label>
          <select id="d-desc" formControlName="descuentoId">
            <option [ngValue]="0" disabled>Elige…</option>
            @for (d of descuentos(); track d.id) { <option [ngValue]="d.id">{{ d.nombre }} ({{ d.tipo === 'PORCENTAJE' ? d.valor + ' %' : 'S/ ' + d.valor }} · {{ d.aplicaA }})</option> }
          </select>
        </div>
        <div class="field full">
          <label for="d-anio">Año lectivo</label>
          <select id="d-anio" formControlName="anioId">@for (a of anios(); track a.id) { <option [ngValue]="a.id">{{ a.nombre }}</option> }</select>
        </div>
        <div class="field full"><label for="d-motivo">Motivo (opcional)</label><input id="d-motivo" formControlName="motivo" placeholder="Hermanos" /></div>
      </div>
      @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="submit" form="form-desc" class="btn btn-primary" [disabled]="guardando()">Asignar</button>
    </ng-container>
  </app-modal>
}

@if (depositando()) {
  <app-modal titulo="Depositar al crédito" [ancho]="460" (cerrar)="depositando.set(false)">
    <form [formGroup]="formDeposito" (ngSubmit)="guardarDeposito()" id="form-deposito" novalidate>
      <div class="form-grid">
        <div class="field full">
          <label for="dep-monto">Monto (S/)</label>
          <input id="dep-monto" type="number" min="0.01" max="50000" step="0.01" formControlName="monto" />
          @if (formDeposito.controls.monto.touched && formDeposito.controls.monto.invalid) { <span class="error">Un monto entre 0,01 y 50 000.</span> }
        </div>
        <div class="field full">
          <label for="dep-medio">Medio</label>
          <select id="dep-medio" formControlName="medio">
            <option value="TRANSFERENCIA">Transferencia</option><option value="YAPE_PLIN">Yape o Plin</option><option value="TARJETA">Tarjeta</option><option value="EFECTIVO">Efectivo (requiere caja abierta)</option>
          </select>
        </div>
        <div class="field full"><label for="dep-ref">Referencia (opcional)</label><input id="dep-ref" formControlName="referencia" maxlength="80" placeholder="N.º de operación" /></div>
      </div>
      <p class="muted" style="margin: 10px 0 0">Si el alumno tiene pensiones vencidas, se cobran enseguida del crédito (de la más antigua a la más reciente).</p>
      @if (errorDeposito()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorDeposito() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="depositando.set(false)">Cancelar</button>
      <button type="submit" form="form-deposito" class="btn btn-primary" [disabled]="guardandoCredito()">{{ guardandoCredito() ? 'Guardando…' : 'Depositar' }}</button>
    </ng-container>
  </app-modal>
}

@if (paraAnular(); as m) {
  <app-modal titulo="Anular depósito" [ancho]="460" (cerrar)="paraAnular.set(null)">
    <p style="margin: 0 0 12px">Se quitarán <strong>S/ {{ m.monto | number: '1.2-2' }}</strong> del crédito. Solo se puede si el crédito todavía alcanza (si ya se cobró de las pensiones, primero hay que anular esos cobros).</p>
    <div class="field"><label for="anu-motivo">Motivo</label><input id="anu-motivo" [formControl]="motivoAnulacion" maxlength="200" /></div>
    @if (errorDeposito()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorDeposito() }}</div> }
    <ng-container footer>
      <button type="button" class="btn" (click)="paraAnular.set(null)">Cancelar</button>
      <button type="button" class="btn btn-danger" [disabled]="guardandoCredito() || motivoAnulacion.invalid" (click)="anularDeposito()">{{ guardandoCredito() ? 'Anulando…' : 'Anular depósito' }}</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="41-cuentascomponentts"></a>
## 41. `cuentas.component.ts` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/cuentas/cuentas.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `cuentas.component`.

```typescript
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoResumen } from '../../../core/models/alumno.model';
import { CreditoAlumno, EstadoCuenta, EstadoCuota, MovimientoCredito } from '../../../core/models/cobro.model';
import { Descuento } from '../../../core/models/pago.model';
import { Anio } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { CobroService } from '../../../core/services/cobro.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PagoConfigService } from '../../../core/services/pago-config.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { BuscadorAlumnoComponent } from '../../../shared/components/buscador-alumno/buscador-alumno.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { etiquetaMovimiento, explicarCredito, puedeCobrarAhora, sePuedeAnular } from './credito';

const CLASE: Record<EstadoCuota, string> = { PENDIENTE: 'badge-warn', PARCIAL: 'badge-violet', PAGADA: 'badge-ok', VENCIDA: 'badge-danger', ANULADA: 'badge-gray' };

@Component({
  selector: 'app-cuentas',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, BuscadorAlumnoComponent, ModalComponent, PageHeaderComponent],
  templateUrl: './cuentas.component.html',
  styles: `
    .credito-cab { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; flex-wrap: wrap; margin-bottom: 12px; }
    .credito-acciones { display: flex; gap: 8px; flex-wrap: wrap; }
    .credito-cifras { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-bottom: 12px; }
    .credito-cifras div { display: flex; flex-direction: column; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; }
    .credito-cifras strong { font-size: 1.25rem; }
    tr.anulado td { opacity: .55; text-decoration: line-through; }
    tr.anulado td:last-child, tr.anulado td:nth-child(2) { text-decoration: none; }
    .enlace { border: 0; background: none; padding: 0; font: inherit; color: var(--primary); text-decoration: underline; cursor: pointer; }
  `
})
export class CuentasComponent {
  private readonly api = inject(CobroService);
  private readonly config = inject(PagoConfigService);
  private readonly plan = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  /** Solo el ADMIN asigna descuentos; la secretaria consulta la cuenta. */
  protected readonly esAdmin = inject(AuthService).isAdmin;

  protected readonly alumno = signal<AlumnoResumen | null>(null);
  protected readonly cuenta = signal<EstadoCuenta | null>(null);
  protected readonly cargando = signal(false);

  protected readonly abierto = signal(false);
  protected readonly descuentos = signal<Descuento[]>([]);
  protected readonly anios = signal<Anio[]>([]);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    descuentoId: [0, [Validators.required, Validators.min(1)]],
    anioId: [0, [Validators.required, Validators.min(1)]],
    motivo: ['']
  });

  protected clase(e: EstadoCuota): string {
    return CLASE[e];
  }

  // --- Crédito del alumno: lo que se deposita suma y se cobra solo de las pensiones cuando vencen ---
  protected readonly credito = signal<CreditoAlumno | null>(null);
  protected readonly errorCredito = signal(false);
  protected readonly depositando = signal(false);
  protected readonly guardandoCredito = signal(false);
  protected readonly errorDeposito = signal<string | null>(null);
  protected readonly formDeposito = this.fb.nonNullable.group({
    monto: [0, [Validators.required, Validators.min(0.01), Validators.max(50000)]],
    medio: ['TRANSFERENCIA' as 'EFECTIVO' | 'TARJETA' | 'YAPE_PLIN' | 'TRANSFERENCIA', Validators.required],
    referencia: ['']
  });
  /** Clave que evita sumar dos veces el mismo depósito si se pulsa dos veces o se reintenta. */
  private claveDeposito = '';
  protected readonly paraAnular = signal<MovimientoCredito | null>(null);
  protected readonly motivoAnulacion = this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(200)]);

  protected readonly explicacion = (c: CreditoAlumno): string => explicarCredito(c);
  protected readonly etiqueta = etiquetaMovimiento;
  protected readonly puedeCobrarAhora = puedeCobrarAhora;
  protected readonly sePuedeAnular = sePuedeAnular;

  private cargarCredito(): void {
    const a = this.alumno();
    if (!a) return;
    this.errorCredito.set(false);
    this.api.credito(a.id).subscribe({
      next: c => this.credito.set(c),
      error: () => { this.credito.set(null); this.errorCredito.set(true); }
    });
  }

  protected abrirDeposito(): void {
    this.formDeposito.reset({ monto: 0, medio: 'TRANSFERENCIA', referencia: '' });
    this.claveDeposito = `dep-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    this.errorDeposito.set(null);
    this.depositando.set(true);
  }

  protected guardarDeposito(): void {
    const a = this.alumno();
    if (!a || this.formDeposito.invalid) { this.formDeposito.markAllAsTouched(); return; }
    const v = this.formDeposito.getRawValue();
    this.guardandoCredito.set(true);
    this.errorDeposito.set(null);
    this.api.depositarCredito(a.id, { monto: Math.round(Number(v.monto) * 100) / 100, medio: v.medio, referencia: v.referencia.trim() || undefined, idempotencyKey: this.claveDeposito }).subscribe({
      next: r => {
        this.guardandoCredito.set(false);
        this.depositando.set(false);
        this.avisos.success(r.aplicado > 0
          ? `Depósito registrado. Se cobraron S/ ${r.aplicado.toFixed(2)} de las pensiones vencidas; el crédito queda en S/ ${r.saldo.toFixed(2)}.`
          : `Depósito registrado. El crédito queda en S/ ${r.saldo.toFixed(2)}.`);
        this.cargar();
      },
      error: e => { this.guardandoCredito.set(false); this.errorDeposito.set(mensajeError(e)); }
    });
  }

  protected cobrarDelCredito(): void {
    const a = this.alumno();
    if (!a) return;
    this.guardandoCredito.set(true);
    this.api.cobrarDelCredito(a.id).subscribe({
      next: r => {
        this.guardandoCredito.set(false);
        this.avisos.success(r.aplicado > 0 ? `Se cobraron S/ ${r.aplicado.toFixed(2)} del crédito; queda S/ ${r.saldo.toFixed(2)}.` : 'No había nada por cobrar del crédito.');
        this.cargar();
      },
      error: e => { this.guardandoCredito.set(false); this.avisos.error(mensajeError(e)); }
    });
  }

  protected pedirAnular(m: MovimientoCredito): void {
    this.motivoAnulacion.reset('');
    this.errorDeposito.set(null);
    this.paraAnular.set(m);
  }

  protected anularDeposito(): void {
    const m = this.paraAnular();
    if (!m || this.motivoAnulacion.invalid) { this.motivoAnulacion.markAsTouched(); return; }
    this.guardandoCredito.set(true);
    this.api.anularDeposito(m.id, this.motivoAnulacion.value.trim()).subscribe({
      next: () => { this.guardandoCredito.set(false); this.paraAnular.set(null); this.avisos.success('Depósito anulado.'); this.cargar(); },
      error: e => { this.guardandoCredito.set(false); this.errorDeposito.set(mensajeError(e)); }
    });
  }

  protected elegir(a: AlumnoResumen | null): void {
    this.alumno.set(a);
    this.cuenta.set(null);
    this.credito.set(null);
    if (a) this.cargar();
  }

  private cargar(): void {
    const a = this.alumno();
    if (!a) return;
    this.cargando.set(true);
    this.cargarCredito();
    this.api.estadoCuenta(a.id).subscribe({
      next: c => {
        this.cuenta.set(c);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar la cuenta del alumno.'));
      }
    });
  }

  protected abrirDescuento(): void {
    this.errorForm.set(null);
    this.config.descuentos().subscribe(d => this.descuentos.set(d.filter(x => x.activo)));
    this.plan.anios().subscribe(a => {
      this.anios.set(a);
      this.form.reset({ descuentoId: 0, anioId: a.find(x => x.estado === 'ACTIVO')?.id ?? 0, motivo: '' });
    });
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  protected asignar(): void {
    const a = this.alumno();
    if (!a || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.guardando.set(true);
    this.api.asignarDescuento(a.id, v.descuentoId, v.anioId, v.motivo.trim() || undefined).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success('Descuento asignado. Se aplica a las cuotas pendientes que correspondan.');
        this.cerrar();
        this.cargar();
      },
      error: e => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(e));
      }
    });
  }
}
```

---

<a id="42-descuentoscomponenthtml"></a>
## 42. `descuentos.component.html` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/descuentos/descuentos.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `descuentos`.

```html
<div class="page">
  <app-page-header titulo="Descuentos" subtitulo="Catálogo de descuentos. Editarlos no altera las cuotas que ya se generaron.">
    <button type="button" class="btn btn-primary" (click)="nuevo()">Nuevo descuento</button>
  </app-page-header>

  <div class="card">
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Nombre</th><th>Tipo</th><th>Valor</th><th>Aplica a</th><th>Código en la matrícula en línea</th><th>Estado</th><th></th></tr>
        </thead>
        <tbody>
          @for (d of descuentos(); track d.id) {
            <tr>
              <td><strong>{{ d.nombre }}</strong></td>
              <td>{{ d.tipo === 'PORCENTAJE' ? 'Porcentaje' : 'Monto fijo' }}</td>
              <td>{{ valor(d) }}</td>
              <td><span class="badge">{{ d.aplicaA }}</span></td>
              <td>@if (d.codigo) { <code class="codigo-desc">{{ d.codigo }}</code> } @else { <span class="muted">Solo lo asigna el administrador</span> }</td>
              <td><span [class]="'badge ' + (d.activo ? 'badge-ok' : 'badge-gray')">{{ d.activo ? 'Activo' : 'Inactivo' }}</span></td>
              <td class="acciones"><button type="button" class="btn btn-sm" (click)="editar(d)">Editar</button></td>
            </tr>
          } @empty {
            <tr><td colspan="7" class="vacio">{{ cargando() ? 'Cargando…' : 'Aún no hay descuentos.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </div>
</div>

@if (abierto()) {
  <app-modal [titulo]="editando() ? 'Editar descuento' : 'Nuevo descuento'" [ancho]="480" (cerrar)="cerrar()">
    <form [formGroup]="form" (ngSubmit)="guardar()" id="form-descuento" novalidate>
      <div class="form-grid">
        <div class="field full">
          <label for="de-nombre">Nombre</label>
          <input id="de-nombre" formControlName="nombre" placeholder="Hermanos" />
          @if (form.controls.nombre.touched && form.controls.nombre.invalid) { <span class="error">Obligatorio.</span> }
        </div>
        <div class="field">
          <label for="de-tipo">Tipo</label>
          <select id="de-tipo" formControlName="tipo">
            <option value="PORCENTAJE">Porcentaje</option>
            <option value="MONTO_FIJO">Monto fijo (S/)</option>
          </select>
        </div>
        <div class="field">
          <label for="de-valor">Valor</label>
          <input id="de-valor" type="number" step="0.01" min="0.01" formControlName="valor" />
          @if (form.controls.valor.touched && form.controls.valor.invalid) { <span class="error">Debe ser mayor que 0.</span> }
        </div>
        <div class="field">
          <label for="de-aplica">Aplica a</label>
          <select id="de-aplica" formControlName="aplicaA">
            @for (a of aplicaA; track a) { <option [value]="a">{{ a }}</option> }
          </select>
        </div>
        <div class="field">
          <label class="check" style="margin-top: 22px"><input type="checkbox" formControlName="activo" /> Descuento activo</label>
        </div>
        <div class="field full">
          <label for="de-codigo">Código para la matrícula en línea (opcional)</label>
          <input id="de-codigo" formControlName="codigo" placeholder="HERMANOS10" autocomplete="off" style="text-transform: uppercase" />
          @if (form.controls.codigo.invalid) { <span class="error">De 3 a 40 letras, números, guion o guion bajo, sin espacios.</span> }
          @else { <span class="muted">Si escribes un código, las familias pueden escribirlo en la página pública al matricularse y el descuento se aplica solo. Sin código, solo lo asigna el administrador en Cuentas por alumno.</span> }
        </div>
      </div>
      @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="submit" form="form-descuento" class="btn btn-primary" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : 'Guardar' }}</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="43-descuentoscomponentts"></a>
## 43. `descuentos.component.ts` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/descuentos/descuentos.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `descuentos.component`.

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { APLICA_A, AplicaA, Descuento, TIPOS_DESCUENTO, TipoDescuento } from '../../../core/models/pago.model';
import { NotificationService } from '../../../core/services/notification.service';
import { PagoConfigService } from '../../../core/services/pago-config.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-descuentos',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  templateUrl: './descuentos.component.html',
  styles: `.codigo-desc { padding: 2px 8px; border-radius: 8px; background: var(--primary-soft); color: var(--primary); font-weight: 800; letter-spacing: .04em; }`
})
export class DescuentosComponent implements OnInit {
  private readonly api = inject(PagoConfigService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly tipos = TIPOS_DESCUENTO;
  protected readonly aplicaA = APLICA_A;
  protected readonly descuentos = signal<Descuento[]>([]);
  protected readonly cargando = signal(false);
  protected readonly abierto = signal(false);
  protected readonly editando = signal<Descuento | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    tipo: ['PORCENTAJE' as TipoDescuento, Validators.required],
    valor: [0, [Validators.required, Validators.min(0.01)]],
    aplicaA: ['PENSION' as AplicaA, Validators.required],
    activo: [true],
    /** Opcional: si lo tiene, la familia puede canjear el descuento en la matrícula en línea. */
    codigo: ['', [Validators.pattern(/^[A-Za-z0-9_-]{3,40}$|^$/)]]
  });

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.api.descuentos().subscribe({
      next: d => {
        this.descuentos.set(d);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los descuentos.'));
      }
    });
  }

  protected valor(d: Descuento): string {
    return d.tipo === 'PORCENTAJE' ? `${d.valor} %` : `S/ ${d.valor.toFixed(2)}`;
  }

  protected nuevo(): void {
    this.form.reset({ nombre: '', tipo: 'PORCENTAJE', valor: 10, aplicaA: 'PENSION', activo: true, codigo: '' });
    this.abrir(null);
  }

  protected editar(d: Descuento): void {
    this.form.reset({ nombre: d.nombre, tipo: d.tipo, valor: d.valor, aplicaA: d.aplicaA, activo: d.activo, codigo: d.codigo ?? '' });
    this.abrir(d);
  }

  private abrir(d: Descuento | null): void {
    this.errorForm.set(null);
    this.editando.set(d);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    if (v.tipo === 'PORCENTAJE' && v.valor > 100) {
      this.errorForm.set('Un porcentaje no puede superar 100.');
      return;
    }
    const body = { ...v, nombre: v.nombre.trim(), codigo: v.codigo.trim().toUpperCase() || null };
    const e = this.editando();
    this.guardando.set(true);
    (e ? this.api.actualizarDescuento(e.id, body) : this.api.crearDescuento(body)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(e ? 'Descuento actualizado. No cambia las cuotas ya generadas.' : 'Descuento creado.');
        this.cerrar();
        this.cargar();
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }
}
```

---

<a id="44-morososcomponenthtml"></a>
## 44. `morosos.component.html` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/morosos/morosos.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `morosos`.

```html
<div class="page">
  <app-page-header titulo="Morosos y alertas" subtitulo="Cuotas vencidas y situaciones de cobranza que requieren atención." />

  <section class="kpis" aria-label="Resumen de morosidad">
    <div class="kpi">
      <div class="etiqueta">Alumnos con deuda vencida</div>
      <div class="valor">{{ morosos()?.totalAlumnosMorosos ?? '—' }}</div>
    </div>
    <div class="kpi">
      <div class="etiqueta">Deuda vencida acumulada</div>
      <div class="valor" style="color: var(--danger)">{{ morosos() ? soles(morosos()!.totalDeudaAcumulada) : '—' }}</div>
    </div>
  </section>

  <div class="card">
    <div class="card-body" style="padding-bottom: 0"><h2>Alumnos morosos</h2></div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Alumno</th><th>Responsable de pago</th><th>Cuotas vencidas</th><th>Saldo vencido</th></tr>
        </thead>
        <tbody>
          @for (m of morosos()?.listaMorosos ?? []; track m.alumnoId) {
            <tr>
              <td><strong>{{ m.alumnoNombre }}</strong></td>
              <td>{{ m.responsableNombre }}</td>
              <td>{{ m.cuotasVencidas }}</td>
              <td style="color: var(--danger); font-weight: 600">{{ soles(m.saldoTotalVencido) }}</td>
            </tr>
          } @empty {
            <tr><td colspan="4" class="vacio">{{ cargando() ? 'Cargando…' : 'No hay alumnos con deuda vencida.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </div>

  @if (veAlertas) {
  <div class="card">
    <div class="card-body toolbar" style="justify-content: space-between">
      <h2>Alertas de cobranza</h2>
      <button type="button" class="btn btn-sm" (click)="alternarResueltas()">{{ verResueltas() ? 'Ver pendientes' : 'Ver resueltas' }}</button>
    </div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Tipo</th><th>Detalle</th><th>Fecha</th><th></th></tr>
        </thead>
        <tbody>
          @for (a of alertas(); track a.id) {
            <tr>
              <td><span [class]="'badge ' + (a.tipo === 'SIN_TARIFA' ? 'badge-warn' : 'badge-violet')">{{ etiqueta(a.tipo) }}</span></td>
              <td>{{ a.detalle }}</td>
              <td class="muted">{{ a.creadaEn | date: 'dd/MM/yyyy HH:mm' }}</td>
              <td class="acciones">
                @if (!a.resuelta) {
                  <button type="button" class="btn btn-sm" (click)="resolver(a)">Marcar resuelta</button>
                } @else {
                  <span class="badge badge-ok">Resuelta</span>
                }
              </td>
            </tr>
          } @empty {
            <tr><td colspan="4" class="vacio">{{ verResueltas() ? 'No hay alertas resueltas.' : 'No hay alertas pendientes.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </div>
  }
</div>
```

---

<a id="45-morososcomponentts"></a>
## 45. `morosos.component.ts` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/morosos/morosos.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `morosos.component`.

```typescript
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { AlertaAdmin, Morosos } from '../../../core/models/pago.model';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PagoConfigService } from '../../../core/services/pago-config.service';
import { mensajeError } from '../../../core/utils/errores';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

const ETIQUETA_ALERTA: Record<string, string> = {
  SIN_TARIFA: 'Sin tarifa',
  CUOTA_PARCIAL: 'Cuota parcial',
  PERIODO_CERRADO: 'Periodo cerrado',
  OTRA: 'Otra'
};

@Component({
  selector: 'app-morosos',
  imports: [DatePipe, PageHeaderComponent],
  templateUrl: './morosos.component.html'
})
export class MorososComponent implements OnInit {
  private readonly api = inject(PagoConfigService);
  private readonly avisos = inject(NotificationService);
  /** Las alertas de cobranza son de administración y secretaría; caja solo ve el reporte de morosos. */
  protected readonly veAlertas = inject(AuthService).tieneAlgunRol(['ADMIN', 'SECRETARIA']);

  protected readonly morosos = signal<Morosos | null>(null);
  protected readonly alertas = signal<AlertaAdmin[]>([]);
  protected readonly verResueltas = signal(false);
  protected readonly cargando = signal(false);

  ngOnInit(): void {
    this.cargar();
  }

  protected etiqueta(tipo: string): string {
    return ETIQUETA_ALERTA[tipo] ?? tipo;
  }

  protected soles(n: number): string {
    return 'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.api.morosos().subscribe({
      next: m => {
        this.morosos.set(m);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar el reporte de morosidad.'));
      }
    });
    if (this.veAlertas) this.cargarAlertas();
  }

  protected alternarResueltas(): void {
    this.verResueltas.update(v => !v);
    this.cargarAlertas();
  }

  private cargarAlertas(): void {
    this.api.alertas(this.verResueltas()).subscribe({
      next: a => this.alertas.set(a),
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar las alertas.'))
    });
  }

  protected resolver(a: AlertaAdmin): void {
    this.api.resolverAlerta(a.id).subscribe({
      next: () => {
        this.avisos.success('Alerta resuelta.');
        this.cargarAlertas();
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }
}
```

---

<a id="46-tarifascomponenthtml"></a>
## 46. `tarifas.component.html` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/tarifas/tarifas.component.html`

### **¿Qué hace este archivo?**
Plantilla HTML de vista Angular correspondiente a `tarifas`.

```html
<div class="page">
  <app-page-header titulo="Tarifas" subtitulo="Monto y calendario de cuotas por año, nivel y, opcionalmente, grado. Sin tarifa, la matrícula no genera cuotas y se crea una alerta.">
    <button type="button" class="btn btn-primary" [disabled]="!anioId.value" (click)="nueva()">Nueva tarifa</button>
  </app-page-header>

  <div class="toolbar">
    <select class="input" [formControl]="anioId" (change)="cargar()" aria-label="Año académico">
      @for (a of anios(); track a.id) { <option [ngValue]="a.id">Año {{ a.nombre }}</option> }
    </select>
  </div>

  <div class="card">
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr><th>Concepto</th><th>Nivel</th><th>Grado</th><th>Monto</th><th>Cuotas</th><th>Calendario</th><th>Estado</th><th></th></tr>
        </thead>
        <tbody>
          @for (t of tarifas(); track t.id) {
            <tr>
              <td><strong>{{ t.conceptoNombre }}</strong></td>
              <td>{{ nombreNivel(t.nivelId) }}</td>
              <td>{{ nombreGrado(t.gradoId) }}</td>
              <td>{{ soles(t.monto) }}</td>
              <td>{{ t.numCuotas }}</td>
              <td class="muted">desde {{ meses[t.mesInicio - 1] }}, vence el día {{ t.diaVencimiento }}</td>
              <td><span [class]="'badge ' + (t.activo ? 'badge-ok' : 'badge-gray')">{{ t.activo ? 'Activa' : 'Inactiva' }}</span></td>
              <td class="acciones"><button type="button" class="btn btn-sm" (click)="editar(t)">Editar</button></td>
            </tr>
          } @empty {
            <tr><td colspan="8" class="vacio">{{ cargando() ? 'Cargando…' : 'Este año aún no tiene tarifas.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </div>
</div>

@if (abierto()) {
  <app-modal [titulo]="editando() ? 'Editar tarifa' : 'Nueva tarifa'" (cerrar)="cerrar()">
    <form [formGroup]="form" (ngSubmit)="guardar()" id="form-tarifa" novalidate>
      @if (editando()) {
        <div class="aviso aviso-warn" style="margin-bottom: 14px">
          El monto y el calendario de una tarifa existente no se pueden cambiar. Desactívala y crea una nueva con los valores correctos.
        </div>
      }
      <div class="form-grid">
        <div class="field full">
          <label for="t-concepto">Concepto</label>
          <select id="t-concepto" formControlName="conceptoId">
            <option [ngValue]="0" disabled>Elige…</option>
            @for (c of conceptos(); track c.id) { <option [ngValue]="c.id">{{ c.nombre }} ({{ c.tipo }})</option> }
          </select>
          @if (form.controls.conceptoId.touched && form.controls.conceptoId.invalid) { <span class="error">Elige un concepto.</span> }
        </div>
        <div class="field">
          <label for="t-nivel">Nivel</label>
          <select id="t-nivel" formControlName="nivelId" (change)="cambioNivel()">
            <option [ngValue]="0" disabled>Elige…</option>
            @for (n of niveles(); track n.id) { <option [ngValue]="n.id">{{ n.nombre }}</option> }
          </select>
          @if (form.controls.nivelId.touched && form.controls.nivelId.invalid) { <span class="error">Elige un nivel.</span> }
        </div>
        <div class="field">
          <label for="t-grado">Grado</label>
          <select id="t-grado" formControlName="gradoId">
            <option [ngValue]="0">Todos los grados del nivel</option>
            @for (g of gradosDelNivel(); track g.id) { <option [ngValue]="g.id">{{ g.nombre }}</option> }
          </select>
        </div>
        <div class="field">
          <label for="t-monto">Monto por cuota (S/)</label>
          <input id="t-monto" type="number" step="0.01" min="0.01" formControlName="monto" />
          @if (form.controls.monto.touched && form.controls.monto.invalid) { <span class="error">Debe ser mayor que 0.</span> }
        </div>
        <div class="field">
          <label for="t-cuotas">N.º de cuotas</label>
          <input id="t-cuotas" type="number" min="1" max="12" formControlName="numCuotas" />
        </div>
        <div class="field">
          <label for="t-mes">Mes de la primera cuota</label>
          <select id="t-mes" formControlName="mesInicio">
            @for (m of meses; track $index) { <option [ngValue]="$index + 1">{{ m }}</option> }
          </select>
        </div>
        <div class="field">
          <label for="t-dia">Día de vencimiento</label>
          <input id="t-dia" type="number" min="1" max="28" formControlName="diaVencimiento" />
        </div>
        <div class="field full">
          <label class="check"><input type="checkbox" formControlName="activo" /> Tarifa activa</label>
        </div>
      </div>
      @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ errorForm() }}</div> }
    </form>
    <ng-container footer>
      <button type="button" class="btn" (click)="cerrar()">Cancelar</button>
      <button type="submit" form="form-tarifa" class="btn btn-primary" [disabled]="guardando()">{{ guardando() ? 'Guardando…' : 'Guardar' }}</button>
    </ng-container>
  </app-modal>
}
```

---

<a id="47-tarifascomponentts"></a>
## 47. `tarifas.component.ts` — Feature Gestión Administrativa de Cobranza

**Ruta del archivo:** `frontend/src/app/features/pagos/tarifas/tarifas.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `tarifas.component`.

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Anio, Grado, Nivel } from '../../../core/models/planificacion.model';
import { Concepto, Tarifa } from '../../../core/models/pago.model';
import { NotificationService } from '../../../core/services/notification.service';
import { PagoConfigService } from '../../../core/services/pago-config.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

@Component({
  selector: 'app-tarifas',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  templateUrl: './tarifas.component.html'
})
export class TarifasComponent implements OnInit {
  private readonly api = inject(PagoConfigService);
  private readonly plan = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly meses = MESES;
  protected readonly anios = signal<Anio[]>([]);
  protected readonly niveles = signal<Nivel[]>([]);
  protected readonly grados = signal<Grado[]>([]);
  protected readonly conceptos = signal<Concepto[]>([]);
  protected readonly tarifas = signal<Tarifa[]>([]);
  protected readonly cargando = signal(false);

  protected readonly abierto = signal(false);
  protected readonly editando = signal<Tarifa | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly anioId = this.fb.nonNullable.control(0);

  protected readonly form = this.fb.nonNullable.group({
    nivelId: [0, [Validators.required, Validators.min(1)]],
    gradoId: [0],
    conceptoId: [0, [Validators.required, Validators.min(1)]],
    monto: [0, [Validators.required, Validators.min(0.01)]],
    numCuotas: [10, [Validators.required, Validators.min(1), Validators.max(12)]],
    mesInicio: [3, [Validators.required, Validators.min(1), Validators.max(12)]],
    diaVencimiento: [5, [Validators.required, Validators.min(1), Validators.max(28)]],
    activo: [true]
  });

  ngOnInit(): void {
    this.plan.anios().subscribe(a => {
      this.anios.set(a);
      this.anioId.setValue(a.find(x => x.estado === 'ACTIVO')?.id ?? 0);
      this.cargar();
    });
    this.plan.niveles().subscribe(n => this.niveles.set(n));
    this.plan.grados().subscribe(g => this.grados.set(g));
    this.api.conceptos().subscribe(c => this.conceptos.set(c.filter(x => x.activo)));
  }

  protected gradosDelNivel(): Grado[] {
    const nivel = this.form.controls.nivelId.value;
    return this.grados().filter(g => g.nivelId === nivel);
  }

  protected cargar(): void {
    if (!this.anioId.value) {
      this.tarifas.set([]);
      return;
    }
    this.cargando.set(true);
    this.api.tarifas(this.anioId.value).subscribe({
      next: t => {
        this.tarifas.set(t);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar las tarifas.'));
      }
    });
  }

  protected nombreNivel(id: number): string {
    return this.niveles().find(n => n.id === id)?.nombre ?? String(id);
  }

  protected nombreGrado(id?: number): string {
    return id ? (this.grados().find(g => g.id === id)?.nombre ?? String(id)) : 'Todos los grados';
  }

  protected soles(n: number): string {
    return 'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  protected nueva(): void {
    this.form.enable();
    this.form.reset({ nivelId: 0, gradoId: 0, conceptoId: 0, monto: 0, numCuotas: 10, mesInicio: 3, diaVencimiento: 5, activo: true });
    this.abrir(null);
  }

  protected editar(t: Tarifa): void {
    this.form.reset({
      nivelId: t.nivelId, gradoId: t.gradoId ?? 0, conceptoId: t.conceptoId, monto: t.monto,
      numCuotas: t.numCuotas, mesInicio: t.mesInicio, diaVencimiento: t.diaVencimiento, activo: t.activo
    });
    // Una tarifa existente solo se activa o desactiva: para otro monto o calendario se crea una nueva.
    this.form.disable();
    this.form.controls.activo.enable();
    this.abrir(t);
  }

  private abrir(t: Tarifa | null): void {
    this.errorForm.set(null);
    this.editando.set(t);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected cambioNivel(): void {
    this.form.controls.gradoId.setValue(0);
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const body = { ...v, anioId: this.anioId.value, gradoId: v.gradoId || null };
    const e = this.editando();
    this.guardando.set(true);
    (e ? this.api.actualizarTarifa(e.id, body) : this.api.crearTarifa(body)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(e ? 'Tarifa actualizada.' : 'Tarifa creada.');
        this.cerrar();
        this.cargar();
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }
}
```

---

<a id="48-familia-boletinescomponentts"></a>
## 48. `familia-boletines.component.ts` — Otros Componentes Frontend

**Ruta del archivo:** `frontend/src/app/features/familia/boletines/familia-boletines.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `familia-boletines.component`.

```typescript
import { DatePipe } from '@angular/common';
import { Component, OnInit, effect, inject, signal, untracked } from '@angular/core';
import { Boletin } from '../../../core/models/calificacion.model';
import { Periodo } from '../../../core/models/planificacion.model';
import { CalificacionService } from '../../../core/services/calificacion.service';
import { FamiliaContextoService } from '../../../core/services/familia-contexto.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SelectorHijoComponent } from '../../../shared/components/selector-hijo/selector-hijo.component';

/** Boletines oficiales del hijo seleccionado: los vigentes primero y descarga con un clic. */
@Component({
  selector: 'app-familia-boletines',
  imports: [DatePipe, PageHeaderComponent, SelectorHijoComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Boletines" subtitulo="Documentos oficiales de notas por periodo, listos para descargar." />
      <app-selector-hijo />
      @if (cargando()) {
        <div class="muted">Cargando…</div>
      } @else if (boletines().length === 0) {
        <div class="aviso">Aún no hay boletines publicados. Aparecerán aquí cuando el colegio cierre cada periodo.</div>
      } @else {
        <div class="card"><div class="table-wrap">
          <table class="table">
            <thead><tr><th>Periodo</th><th>Versión</th><th>Generado</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              @for (b of boletines(); track b.id) {
                <tr>
                  <td><strong>{{ periodo(b.periodoId) }}</strong></td>
                  <td>v{{ b.version }}</td>
                  <td>{{ b.generadoEn | date: 'd MMM y, HH:mm' }}</td>
                  <td><span [class]="'badge ' + (b.estado === 'VIGENTE' ? 'badge-ok' : 'badge-gray')">{{ b.estado === 'VIGENTE' ? 'Vigente' : 'Reemplazado' }}</span></td>
                  <td style="text-align: right">
                    @if (b.estado === 'VIGENTE') { <button type="button" class="btn btn-primary btn-sm" (click)="descargar(b)">Descargar PDF</button> }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div></div>
      }
    </div>
  `
})
export class FamiliaBoletinesComponent implements OnInit {
  protected readonly ctx = inject(FamiliaContextoService);
  private readonly api = inject(CalificacionService);
  private readonly plan = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);

  protected readonly boletines = signal<Boletin[]>([]);
  protected readonly periodos = signal<Periodo[]>([]);
  protected readonly cargando = signal(true);

  ngOnInit(): void {
    this.plan.anioActivo().subscribe({ next: a => this.plan.periodos(a.id).subscribe(p => this.periodos.set(p)), error: () => undefined });
    this.ctx.cargar().subscribe({ error: e => this.avisos.error(mensajeError(e)) });
  }

  constructor() {
    // Al elegir otro hijo (o cuando termina de cargar el contexto) se piden sus boletines.
    effect(() => {
      this.ctx.seleccionado();
      untracked(() => this.cargar());
    });
  }

  private cargar(): void {
    const hijo = this.ctx.seleccionado();
    if (!hijo) {
      this.cargando.set(false);
      return;
    }
    this.cargando.set(true);
    this.api.boletines(hijo.alumnoId).subscribe({
      next: b => {
        // Vigentes primero, y dentro de cada grupo lo más reciente arriba.
        this.boletines.set([...b].sort((x, y) => Number(y.estado === 'VIGENTE') - Number(x.estado === 'VIGENTE') || y.generadoEn.localeCompare(x.generadoEn)));
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los boletines.'));
      }
    });
  }

  protected periodo(id: number): string {
    return this.periodos().find(p => p.id === id)?.nombre ?? `Periodo ${id}`;
  }

  protected descargar(b: Boletin): void {
    this.api.urlBoletin(b.id).subscribe({
      next: r => {
        const url = r.urlDescarga ?? r.url;
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo abrir el boletín.'))
    });
  }
}
```

---

<a id="49-familia-notascomponentts"></a>
## 49. `familia-notas.component.ts` — Otros Componentes Frontend

**Ruta del archivo:** `frontend/src/app/features/familia/notas/familia-notas.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `familia-notas.component`.

```typescript
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Libreta } from '../../../core/models/calificacion.model';
import { CalificacionService } from '../../../core/services/calificacion.service';
import { FamiliaContextoService } from '../../../core/services/familia-contexto.service';
import { NotificationService } from '../../../core/services/notification.service';
import { mensajeError } from '../../../core/utils/errores';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SelectorHijoComponent } from '../../../shared/components/selector-hijo/selector-hijo.component';
import { LibretaVistaComponent } from '../../calificaciones/libreta-vista/libreta-vista.component';

@Component({
  selector: 'app-familia-notas',
  imports: [PageHeaderComponent, SelectorHijoComponent, LibretaVistaComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Notas y boletines" [subtitulo]="ctx.seleccionado()?.nombreCompleto ?? ''" />
      <app-selector-hijo />
      @if (libreta(); as l) {
        <app-libreta-vista [libreta]="l" />
      } @else if (cargando()) {
        <div class="muted">Cargando…</div>
      } @else {
        <div class="aviso aviso-warn">Todavía no hay notas para mostrar. Aparecen cuando los docentes las registran.</div>
      }
    </div>
  `
})
export class FamiliaNotasComponent implements OnInit {
  protected readonly ctx = inject(FamiliaContextoService);
  private readonly api = inject(CalificacionService);
  private readonly avisos = inject(NotificationService);

  protected readonly libretas = signal<Libreta[]>([]);
  protected readonly cargando = signal(true);
  protected readonly libreta = computed(() => this.libretas().find(l => l.alumnoId === this.ctx.seleccionado()?.alumnoId) ?? null);

  ngOnInit(): void {
    this.ctx.cargar().subscribe({ error: e => this.avisos.error(mensajeError(e)) });
    this.api.mias().subscribe({
      next: l => {
        this.libretas.set(l);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar las notas.'));
      }
    });
  }
}
```

---

<a id="50-pago-personalcomponentts"></a>
## 50. `pago-personal.component.ts` — Otros Componentes Frontend

**Ruta del archivo:** `frontend/src/app/features/personal/pago-personal.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `pago-personal.component`.

```typescript
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AsistenciaPersonal } from '../../core/models/asistencia-personal.model';
import { Area, Docente } from '../../core/models/planificacion.model';
import { Contrato, CuentaDeposito, PagoPersonal } from '../../core/models/rrhh.model';
import { AsistenciaPersonalService } from '../../core/services/asistencia-personal.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { RrhhService } from '../../core/services/rrhh.service';
import { mensajeError } from '../../core/utils/errores';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ResumenPersona, rangoDelMes, resumenPorPersona } from './asistencia-personal';
import { PagosPorAprobarComponent } from './pagos-por-aprobar.component';
import { PersonalRrhhComponent } from './personal-rrhh.component';
import {
  CLASE_ESTADO_PAGO, DescuentoAsistencia, ETIQUETA_ESTADO_PAGO, EstadoPagoMes, TARDANZAS_POR_DIA, avisoPeriodo, claseEstadoContrato, contratoDelPeriodo,
  contratosPorPersona, descuentoAsistencia, duracionContrato, estadoPagoMes, etiquetaBanco, etiquetaConcepto, etiquetaEstadoContrato, etiquetaTipo, etiquetaTipoCuenta, fechaCorta, mascara, nombrePeriodo, periodoDe, periodoValido, soles, totalesPlanilla
} from './rrhh';

/** Todo lo que hace falta para pagar a una persona en el mes, ya calculado. */
interface Tarjeta {
  p: Docente;
  contrato: Contrato | undefined;
  pagos: PagoPersonal[];
  estado: EstadoPagoMes;
  asistencia: ResumenPersona | undefined;
  /** Su cuenta principal de depósito (la primera que tenga, si ninguna es principal); vacío si no tiene. */
  cuenta: CuentaDeposito | undefined;
  neto: number;
  pagado: number;
  pendiente: number;
  /** Cómo sale el descuento por inasistencias (valor del día, faltas, tardanzas); solo si tiene contrato en el mes. */
  calculo: DescuentoAsistencia | undefined;
  /** Lo que ya se descontó por inasistencias en este mes. */
  descontado: number;
  /** Lo que falta descontar (lo que corresponde menos lo ya descontado); 0 si el sueldo ya se pagó. */
  porDescontar: number;
}

type FiltroEstado = 'todos' | EstadoPagoMes;

/** Marca del descuento por inasistencias, para no descontarlo dos veces. */
const PREFIJO_INASISTENCIAS = 'Descuento por inasistencias';

/**
 * Pago al personal: una tarjeta por persona con su contrato y periodo, la asistencia del mes elegido, el detalle del pago (sueldo, bonos,
 * descuentos) y lo que falta pagar, para pagar desde la misma tarjeta. Solo el administrador (el backend lo exige).
 */
@Component({
  selector: 'app-pago-personal',
  imports: [ReactiveFormsModule, PageHeaderComponent, PersonalRrhhComponent, PagosPorAprobarComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Pago al personal" subtitulo="Cada persona con su contrato, su asistencia del mes y lo que se le debe pagar. Genera la planilla del mes; caja registra los pagos y tú los apruebas." />

      <app-pagos-por-aprobar (cambio)="cargarMes()" />

      <div class="barra">
        <div class="field" style="margin: 0">
          <label for="pp-mes">Mes</label>
          <input id="pp-mes" type="month" [formControl]="periodo" [max]="mesActual" />
        </div>
        <button type="button" class="btn btn-primary" [disabled]="generando() || !valido()" (click)="generar()">
          {{ generando() ? 'Generando…' : 'Generar planilla de ' + nombreMes() }}
        </button>
        <span class="muted">Crea el sueldo pendiente de cada contrato que rige en el mes; si ya existe, no lo duplica.</span>
      </div>

      <div class="totales">
        <div><span>Neto del mes</span><strong>{{ dinero(totales().neto) }}</strong></div>
        <div><span>Pagado</span><strong class="ok">{{ dinero(totales().pagado) }}</strong></div>
        <div [class.alerta]="totales().pendiente > 0"><span>Por pagar</span><strong>{{ dinero(totales().pendiente) }}</strong></div>
        <div [class.alerta]="porPagar() > 0"><span>Personas por pagar</span><strong>{{ porPagar() }}</strong></div>
      </div>

      <div class="toolbar linea">
        <select class="input area-sel" [formControl]="areaFiltro" aria-label="Filtrar por área">
          <option [ngValue]="0">Todas las áreas</option>
          @for (a of areas(); track a.id) { <option [ngValue]="a.id">{{ a.nombre }}</option> }
        </select>
        <select class="input area-sel" [formControl]="estadoFiltro" aria-label="Filtrar por estado del pago">
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendientes de pago</option>
          <option value="por-aprobar">Por aprobar</option>
          <option value="pagado">Pagados</option>
          <option value="sin-generar">Sin generar</option>
          <option value="sin-contrato">Sin contrato</option>
        </select>
        <input class="input grow" type="search" [formControl]="busqueda" placeholder="Buscar por nombre o documento" aria-label="Buscar personal" />
      </div>

      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      <div class="rejilla">
        @for (t of tarjetas(); track t.p.id) {
          <article class="tarjeta" [class]="'tarjeta ' + t.estado">
            <header class="cab">
              <span class="avatar-fila" aria-hidden="true">{{ t.p.nombres.charAt(0) }}{{ t.p.apellidos.charAt(0) }}</span>
              <div class="quien">
                <strong>{{ t.p.apellidos }}, {{ t.p.nombres }}</strong>
                <span class="muted">{{ t.p.cargo || 'Sin cargo indicado' }}</span>
              </div>
              <span [class]="'badge ' + claseEstado(t.estado)">{{ etiquetaEstado(t.estado) }}</span>
            </header>
            <div class="sub">
              <span class="badge badge-violet">{{ t.p.areaNombre ?? '—' }}</span>
              <span class="muted">{{ t.p.tipoDocumento ?? 'DNI' }} {{ t.p.numeroDocumento }}</span>
            </div>
            <!-- Dónde se le deposita -->
            @if (t.cuenta; as cu) {
              <div class="deposito" [title]="'Titular: ' + cu.titular">
                <span class="etq">Depósito</span>
                <strong>{{ etiquetaBanco(cu.banco) }}</strong> <span class="muted">{{ etiquetaTipoCuenta(cu.tipo) }} · {{ mascara(cu.numero) }}</span>
                <button type="button" class="enlace" (click)="abrirDetalle(t.p, 'cuenta')">Cambiar</button>
              </div>
            } @else {
              <div class="deposito sin">
                <span>Sin cuenta de depósito</span>
                <button type="button" class="enlace" (click)="abrirDetalle(t.p, 'cuenta')">Agregar cuenta</button>
              </div>
            }

            <section class="bloque">
              <h4>Contrato</h4>
              @if (t.contrato; as c) {
                <div class="fila-dato"><span [class]="'badge ' + claseContrato(c)">{{ etiquetaContrato(c) }}</span><span class="muted">{{ tipoContrato(c) }}</span></div>
                <div class="periodo">{{ fechaCorta(c.fechaInicio) }} → {{ c.fechaFin ? fechaCorta(c.fechaFin) : 'sin fin' }}</div>
                <div class="muted">{{ duracion(c.fechaInicio, c.fechaFin) }}@if (aviso(c); as a) { · <span class="aviso-periodo" [class.rojo]="c.estadoEfectivo === 'VENCIDO' || c.estadoEfectivo === 'RESCINDIDO'">{{ a }}</span> }</div>
                <div class="sueldo-base">Sueldo mensual <strong>{{ dinero(c.remuneracion) }}</strong></div>
              } @else {
                <p class="vacio-bloque">No tiene contrato en {{ nombreMes() }}. Créalo en «Contratos y pagos».</p>
              }
            </section>

            <section class="bloque">
              <h4>Asistencia · {{ nombreMes() }}</h4>
              @if (t.asistencia; as a) {
                <div class="dias">
                  <div class="dia ok"><strong>{{ a.presentes }}</strong><span>Presente</span></div>
                  <div class="dia warn"><strong>{{ a.tardanzas }}</strong><span>Tardanza</span></div>
                  <div class="dia danger"><strong>{{ a.faltas }}</strong><span>Falta</span></div>
                  <div class="dia violet"><strong>{{ a.justificadas }}</strong><span>Justif.</span></div>
                  <div class="dia gris"><strong>{{ a.permisos }}</strong><span>Permiso</span></div>
                </div>
                @if (a.porcentaje !== null) {
                  <div class="barra-asis" role="img" [attr.aria-label]="'Asistencia ' + a.porcentaje + '%'"><span [style.width.%]="a.porcentaje" [class]="claseBarra(a.porcentaje)"></span></div>
                  <div class="muted">{{ a.porcentaje }}% de asistencia · {{ a.marcados }} {{ a.marcados === 1 ? 'día marcado' : 'días marcados' }}</div>
                } @else { <div class="muted">{{ a.marcados }} {{ a.marcados === 1 ? 'día marcado' : 'días marcados' }}, sin días exigibles.</div> }
              } @else {
                <p class="vacio-bloque">Sin asistencia registrada en {{ nombreMes() }}.</p>
              }
              @if (t.calculo; as c) {
                <div class="calculo" aria-label="Cómo se calcula el descuento por inasistencias">
                  <div class="fila-calculo"><span>Valor del día</span><span><strong>{{ dinero(c.valorDia) }}</strong> <small>({{ dinero(t.contrato!.remuneracion) }} ÷ {{ c.diasMes }} días)</small></span></div>
                  <div class="fila-calculo"><span>Faltas sin justificar</span><span><strong>{{ c.faltas }}</strong> {{ c.faltas === 1 ? 'día' : 'días' }}</span></div>
                  <div class="fila-calculo">
                    <span>Tardanzas <small>({{ tardanzasPorDia }} = 1 día)</small></span>
                    <span><strong>{{ c.tardanzas }}</strong> → {{ c.diasPorTardanzas }} {{ c.diasPorTardanzas === 1 ? 'día' : 'días' }}@if (c.tardanzasSobrantes) { <small> · sobran {{ c.tardanzasSobrantes }}</small> }</span>
                  </div>
                  <div class="fila-calculo total"><span>A descontar: {{ c.diasADescontar }} {{ c.diasADescontar === 1 ? 'día' : 'días' }}</span><strong [class.neg]="c.monto > 0">{{ dinero(c.monto) }}</strong></div>
                  @if (t.descontado > 0) { <div class="muted">Ya descontado en este mes: {{ dinero(t.descontado) }}@if (t.porDescontar > 0) { · falta {{ dinero(t.porDescontar) }} }</div> }
                </div>
              }
            </section>

            <section class="bloque">
              <h4>Pago de {{ nombreMes() }}</h4>
              @if (t.pagos.length) {
                <ul class="lineas">
                  @for (l of t.pagos; track l.id) {
                    <li>
                      <span class="concepto">{{ concepto(l) }}@if (l.descripcion) { <small>{{ l.descripcion }}</small> }</span>
                      <span class="monto" [class.neg]="l.montoFirmado < 0">{{ dinero(l.montoFirmado) }}</span>
                      <span [class]="'mini ' + (l.estado === 'PAGADO' ? 'ok' : l.estado === 'POR_APROBAR' ? 'viol' : 'warn')"
                        [title]="l.estado === 'PAGADO' ? 'Pagado el ' + l.fechaPago : l.estado === 'POR_APROBAR' ? 'Caja lo registró: falta tu aprobación' : (l.motivoRechazo ? 'Rechazado: ' + l.motivoRechazo : 'Pendiente: lo paga caja')">{{ l.estado === 'PAGADO' ? 'Pagado' : l.estado === 'POR_APROBAR' ? 'Por aprobar' : 'Pend.' }}</span>
                    </li>
                  }
                </ul>
                <div class="neto"><span>Neto del mes</span><strong>{{ dinero(t.neto) }}</strong></div>
                <div class="resumen-pago">
                  <span>Pagado <strong>{{ dinero(t.pagado) }}</strong></span>
                  <span [class.por-pagar]="t.pendiente !== 0">Por pagar <strong>{{ dinero(t.pendiente) }}</strong></span>
                </div>
              } @else if (t.contrato) {
                <p class="vacio-bloque">Aún no se generó el sueldo de {{ nombreMes() }} ({{ dinero(t.contrato.remuneracion) }}). Usa «Generar planilla».</p>
              } @else {
                <p class="vacio-bloque">Sin pagos en este mes.</p>
              }
            </section>

            <footer class="pie">
              @if (t.estado === 'pendiente') {
                <p class="espera">Falta pagar {{ dinero(t.pendiente) }}: lo registra caja y luego lo apruebas arriba.</p>
              } @else if (t.estado === 'por-aprobar') {
                <p class="espera viol">Caja ya registró el pago de {{ dinero(t.pendiente) }}: falta tu aprobación (arriba en «Pagos por aprobar»).</p>
              }
              @if (t.porDescontar > 0 && t.calculo) {
                <button type="button" class="btn btn-sm" (click)="descontarInasistencias(t)" [title]="resumenDias(t.calculo)">Descontar inasistencias {{ dinero(t.porDescontar) }}</button>
              }
              <button type="button" class="btn btn-sm" (click)="abrirDetalle(t.p, 'pagos')">Bonos y descuentos</button>
              <button type="button" class="btn btn-sm" (click)="abrirDetalle(t.p, 'contratos')">Contratos</button>
            </footer>
          </article>
        } @empty {
          <div class="vacio-guia">
            <strong>{{ cargando() ? 'Cargando…' : personal().length ? 'Nadie coincide con ese filtro' : 'Aún no hay personal activo' }}</strong>
            @if (!cargando() && !personal().length) { <span>Regístralo en Personal → Áreas.</span> }
          </div>
        }
      </div>
    </div>

    @if (detalle(); as d) {
      <app-personal-rrhh [persona]="d.p" [pestanaInicial]="d.pestana" (cerrar)="cerrarDetalle()" />
    }
  `,
  styles: `
    .barra { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
    .totales { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .totales div { display: flex; flex-direction: column; padding: 12px 16px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); }
    .totales div.alerta { border-color: var(--warn); background: var(--warn-soft); }
    .totales span { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .totales strong { font-size: 1.4rem; font-variant-numeric: tabular-nums; }
    .totales strong.ok { color: var(--ok); }
    .rejilla { display: grid; grid-template-columns: repeat(auto-fill, minmax(370px, 1fr)); gap: 16px; align-items: start; }
    .tarjeta { display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1.5px solid var(--line-2); border-radius: 18px; background: var(--card); }
    .tarjeta.pendiente { border-color: var(--warn); }
    .tarjeta.pagado { border-color: var(--ok); }
    .cab { display: flex; align-items: center; gap: 12px; }
    .quien { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .quien strong, .quien .muted { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .avatar-fila { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; background: var(--primary-soft); color: var(--primary); font-weight: 800; }
    .sub { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: -6px; }
    .bloque { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 14px; background: var(--bg); }
    .bloque h4 { margin: 0 0 2px; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .fila-dato { display: flex; align-items: center; gap: 8px; }
    .periodo { font-weight: 700; }
    .sueldo-base { display: flex; justify-content: space-between; align-items: baseline; padding-top: 6px; border-top: 1px dashed var(--line-2); }
    .sueldo-base strong { font-size: 1.2rem; font-variant-numeric: tabular-nums; }
    .aviso-periodo { font-weight: 700; color: var(--warn); }
    .aviso-periodo.rojo { color: #8e1c12; }
    .vacio-bloque { margin: 0; color: var(--ink-2); font-size: .85rem; }
    .dias { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
    .dia { display: flex; flex-direction: column; align-items: center; padding: 6px 2px; border-radius: 10px; }
    .dia strong { font-size: 1.15rem; line-height: 1.1; }
    .dia span { font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; }
    .dia.ok { color: var(--ok); background: var(--ok-soft); }
    .dia.warn { color: var(--warn); background: var(--warn-soft); }
    .dia.danger { color: #8e1c12; background: var(--danger-soft); }
    .dia.violet { color: var(--violet); background: var(--violet-soft); }
    .dia.gris { color: var(--ink-2); background: var(--card); border: 1px solid var(--line); }
    .calculo { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; padding-top: 8px; border-top: 1px dashed var(--line-2); font-size: .85rem; }
    .fila-calculo { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
    .fila-calculo small { color: var(--ink-2); }
    .fila-calculo.total { padding-top: 4px; font-weight: 700; }
    .fila-calculo.total strong { font-variant-numeric: tabular-nums; }
    .fila-calculo .neg, .calculo .neg { color: var(--danger, #b3261e); }
    .deposito { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; margin-top: -6px; padding: 6px 10px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); font-size: .85rem; }
    .deposito .etq { font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
    .deposito.sin { background: var(--warn-soft); border-color: var(--warn); color: var(--warn); font-weight: 700; }
    .enlace, .enlace-aviso { padding: 0; margin-left: auto; font: inherit; font-size: .78rem; font-weight: 800; color: var(--primary); background: none; border: 0; text-decoration: underline; cursor: pointer; }
    .enlace-aviso { margin-left: 0; color: inherit; }
    .destino { margin-top: 10px; padding: 10px 14px; border: 1.5px solid var(--primary); border-radius: 12px; background: var(--primary-soft); }
    .destino h4 { margin: 0 0 6px; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--primary); }
    .destino dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: .88rem; }
    .destino dt { color: var(--ink-2); }
    .destino dd { margin: 0; font-weight: 700; word-break: break-all; }
    .destino .num { font-variant-numeric: tabular-nums; letter-spacing: .02em; user-select: all; }
    .copiar { margin-left: 6px; padding: 1px 8px; font: inherit; font-size: .7rem; font-weight: 700; color: var(--primary); background: var(--card); border: 0; border-radius: 999px; cursor: pointer; }
    .barra-asis { height: 8px; border-radius: 999px; background: var(--line); overflow: hidden; }
    .barra-asis span { display: block; height: 100%; border-radius: 999px; }
    .barra-asis span.ok { background: var(--ok); }
    .barra-asis span.warn { background: var(--warn); }
    .barra-asis span.danger { background: #c0392b; }
    .lineas { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    .lineas li { display: flex; align-items: center; gap: 8px; }
    .concepto { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: .88rem; }
    .concepto small { color: var(--ink-2); font-size: .72rem; }
    .monto { font-variant-numeric: tabular-nums; font-weight: 700; }
    .monto.neg { color: var(--danger, #b3261e); }
    .mini { flex: none; padding: 1px 8px; border-radius: 999px; font-size: .62rem; font-weight: 800; text-transform: uppercase; }
    .mini.ok { color: var(--ok); background: var(--ok-soft); }
    .mini.warn { color: var(--warn); background: var(--warn-soft); }
    .mini.viol { color: var(--violet); background: var(--violet-soft); }
    .espera { margin: 0; flex: 1 1 100%; font-size: .85rem; color: var(--warn); font-weight: 600; }
    .espera.viol { color: var(--violet); }
    .neto { display: flex; justify-content: space-between; align-items: baseline; padding-top: 8px; margin-top: 4px; border-top: 1px solid var(--line-2); }
    .neto strong { font-size: 1.25rem; font-variant-numeric: tabular-nums; }
    .resumen-pago { display: flex; justify-content: space-between; font-size: .82rem; color: var(--ink-2); }
    .resumen-pago .por-pagar strong { color: var(--warn); }
    .pie { display: flex; flex-wrap: wrap; gap: 8px; }
    .pie .btn-primary { flex: 1 1 100%; }
    @media (max-width: 900px) { .totales { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 460px) { .rejilla { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class PagoPersonalComponent implements OnInit {
  private readonly plan = inject(PlanificacionService);
  private readonly rrhh = inject(RrhhService);
  private readonly asistencia = inject(AsistenciaPersonalService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly dinero = soles;
  protected readonly tardanzasPorDia = TARDANZAS_POR_DIA;
  protected readonly fechaCorta = fechaCorta;
  protected readonly duracion = duracionContrato;
  protected readonly mesActual = periodoDe(new Date());

  protected readonly periodo = this.fb.nonNullable.control(this.mesActual);
  private readonly periodoSig = signal(this.mesActual);
  protected readonly nombreMes = computed(() => nombrePeriodo(this.periodoSig()));

  protected readonly areas = signal<Area[]>([]);
  protected readonly personal = signal<Docente[]>([]);
  private readonly contratos = signal<Map<number, Contrato[]>>(new Map());
  private readonly pagos = signal<PagoPersonal[]>([]);
  private readonly asistencias = signal<AsistenciaPersonal[]>([]);
  /** La cuenta principal de depósito de cada persona (por id). */
  private readonly cuentas = signal<Map<number, CuentaDeposito>>(new Map());
  protected readonly etiquetaBanco = etiquetaBanco;
  protected readonly etiquetaTipoCuenta = etiquetaTipoCuenta;
  protected readonly mascara = mascara;

  protected readonly cargando = signal(true);
  protected readonly generando = signal(false);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly areaFiltro = this.fb.nonNullable.control(0);
  protected readonly estadoFiltro = this.fb.nonNullable.control<FiltroEstado>('todos');
  protected readonly busqueda = this.fb.nonNullable.control('');
  private readonly area = signal(0);
  private readonly estado = signal<FiltroEstado>('todos');
  private readonly texto = signal('');

  protected readonly detalle = signal<{ p: Docente; pestana: 'contratos' | 'pagos' | 'cuenta' } | null>(null);

  /** Una tarjeta por persona activa, con todo calculado para el mes elegido. */
  private readonly todas = computed<Tarjeta[]>(() => {
    const periodo = this.periodoSig();
    const resumenes = resumenPorPersona(this.asistencias());
    const pagosPorPersona = new Map<number, PagoPersonal[]>();
    for (const l of this.pagos()) pagosPorPersona.set(l.personalId, [...(pagosPorPersona.get(l.personalId) ?? []), l]);
    return this.personal().map(p => {
      const contrato = contratoDelPeriodo(this.contratos().get(p.id) ?? [], periodo);
      const pagos = (pagosPorPersona.get(p.id) ?? []).sort((a, b) => a.id - b.id);
      const t = totalesPlanilla(pagos);
      const asistencia = resumenes.get(p.id);
      const calculo = contrato ? descuentoAsistencia(contrato.remuneracion, periodo, asistencia?.faltas ?? 0, asistencia?.tardanzas ?? 0) : undefined;
      const descontado = Math.round(pagos.filter(l => l.concepto === 'DESCUENTO' && (l.descripcion ?? '').startsWith(PREFIJO_INASISTENCIAS)).reduce((s, l) => s + l.monto, 0) * 100) / 100;
      // Solo se descuenta mientras el sueldo esté pendiente, y solo la diferencia con lo ya descontado (por si se marcaron más faltas después).
      const sueldoPendiente = pagos.some(l => l.concepto === 'SUELDO' && l.estado === 'PENDIENTE');
      const porDescontar = calculo && sueldoPendiente ? Math.max(0, Math.round((calculo.monto - descontado) * 100) / 100) : 0;
      return { p, contrato, pagos, estado: estadoPagoMes(contrato, pagos), asistencia, cuenta: this.cuentas().get(p.id), neto: t.neto, pagado: t.pagado, pendiente: t.pendiente, calculo, descontado, porDescontar };
    });
  });

  protected readonly tarjetas = computed(() => {
    const q = this.texto().trim().toLowerCase();
    return this.todas().filter(t => (!this.area() || t.p.areaId === this.area())
      && (this.estado() === 'todos' || t.estado === this.estado())
      && (!q || `${t.p.apellidos} ${t.p.nombres} ${t.p.numeroDocumento}`.toLowerCase().includes(q)));
  });

  /** Los totales miran a todo el personal del mes, no solo a lo filtrado. */
  protected readonly totales = computed(() => totalesPlanilla(this.pagos()));
  protected readonly porPagar = computed(() => this.todas().filter(t => t.pendiente > 0).length);

  constructor() {
    this.areaFiltro.valueChanges.subscribe(v => this.area.set(Number(v)));
    this.estadoFiltro.valueChanges.subscribe(v => this.estado.set(v));
    this.busqueda.valueChanges.subscribe(v => this.texto.set(v));
    this.periodo.valueChanges.subscribe(v => {
      this.periodoSig.set(v);
      if (periodoValido(v)) this.cargarMes();
    });
  }

  ngOnInit(): void {
    this.plan.areas().pipe(catchError(() => of([] as Area[]))).subscribe(a => this.areas.set(a));
    this.plan.todoElPersonalActivo().subscribe({
      next: p => this.personal.set(p),
      error: e => this.error.set(mensajeError(e, 'No se pudo cargar el personal.'))
    });
    this.rrhh.contratos().subscribe({
      next: c => this.contratos.set(contratosPorPersona(c)),
      error: e => this.error.set(mensajeError(e, 'No se pudieron cargar los contratos.'))
    });
    this.cargarCuentas();
    this.cargarMes();
  }

  /** Las cuentas de depósito de todo el personal; de cada persona se queda con la principal. */
  private cargarCuentas(): void {
    this.rrhh.cuentas().pipe(catchError(() => of([] as CuentaDeposito[]))).subscribe(lista => {
      const m = new Map<number, CuentaDeposito>();
      for (const c of lista) if (!m.has(c.personalId) || c.principal) m.set(c.personalId, c);
      this.cuentas.set(m);
    });
  }

  protected valido(): boolean {
    return periodoValido(this.periodo.value);
  }

  /** Los pagos y la asistencia del mes elegido. */
  protected cargarMes(): void {
    const mes = this.periodo.value;
    const { desde, hasta } = rangoDelMes(mes);
    this.cargando.set(true);
    forkJoin({
      pagos: this.rrhh.pagosDelPeriodo(mes),
      asistencias: this.asistencia.consultar(desde, hasta).pipe(catchError(() => of([] as AsistenciaPersonal[])))
    }).subscribe({
      next: ({ pagos, asistencias }) => {
        this.pagos.set(pagos);
        this.asistencias.set(asistencias);
        this.cargando.set(false);
      },
      error: e => { this.cargando.set(false); this.error.set(mensajeError(e, 'No se pudo cargar el mes.')); }
    });
  }

  protected claseEstado(e: EstadoPagoMes): string { return CLASE_ESTADO_PAGO[e]; }
  protected etiquetaEstado(e: EstadoPagoMes): string { return ETIQUETA_ESTADO_PAGO[e]; }
  protected claseContrato(c: Contrato): string { return claseEstadoContrato(c.estadoEfectivo); }
  protected etiquetaContrato(c: Contrato): string { return etiquetaEstadoContrato(c.estadoEfectivo); }
  protected tipoContrato(c: Contrato): string { return etiquetaTipo(c.tipo); }
  protected concepto(l: PagoPersonal): string { return etiquetaConcepto(l.concepto); }
  protected claseBarra(p: number): string { return p >= 95 ? 'ok' : p >= 85 ? 'warn' : 'danger'; }
  /** El aviso de vencimiento solo tiene sentido para el mes en curso. */
  protected aviso(c: Contrato): string { return this.periodoSig() === this.mesActual ? avisoPeriodo(c) : ''; }

  protected generar(): void {
    this.generando.set(true);
    this.rrhh.generarPlanilla(this.periodo.value).subscribe({
      next: r => {
        this.generando.set(false);
        this.avisos.success(r.creados ? `Se generaron ${r.creados} ${r.creados === 1 ? 'sueldo' : 'sueldos'}${r.yaExistian ? ` (${r.yaExistian} ya existían)` : ''}.` : r.yaExistian ? 'La planilla de este mes ya estaba generada.' : 'No hay contratos vigentes con sueldo en este mes.');
        this.cargarMes();
      },
      error: e => { this.generando.set(false); this.avisos.error(mensajeError(e)); }
    });
  }

  // ---------- Inasistencias ----------
  /** Texto corto de cómo se llegó al descuento: «2 faltas + 9 tardanzas (1 día) = 3 días». */
  protected resumenDias(c: DescuentoAsistencia): string {
    const partes: string[] = [];
    if (c.faltas) partes.push(`${c.faltas} ${c.faltas === 1 ? 'falta' : 'faltas'}`);
    if (c.diasPorTardanzas) partes.push(`${c.tardanzas} tardanzas (${c.diasPorTardanzas} ${c.diasPorTardanzas === 1 ? 'día' : 'días'})`);
    return `${partes.join(' + ')} = ${c.diasADescontar} ${c.diasADescontar === 1 ? 'día' : 'días'}`;
  }

  protected async descontarInasistencias(t: Tarjeta): Promise<void> {
    if (!t.contrato || !t.calculo || t.porDescontar <= 0) return;
    const c = t.calculo;
    const ya = t.descontado > 0 ? ` Ya se descontaron ${soles(t.descontado)}; se descuenta la diferencia.` : '';
    const aviso = `¿Descontar ${soles(t.porDescontar)} a ${t.p.nombres} ${t.p.apellidos}? ${this.resumenDias(c)} × ${soles(c.valorDia)} por día (sueldo ${soles(t.contrato.remuneracion)} ÷ ${c.diasMes} días).${ya}`;
    if (!(await this.confirmacion.confirmar(aviso, 'Descontar'))) return;
    this.rrhh.registrarPago({
      personalId: t.p.id, contratoId: t.contrato.id, periodo: this.periodo.value, concepto: 'DESCUENTO',
      monto: t.porDescontar, descripcion: `${PREFIJO_INASISTENCIAS}: ${this.resumenDias(c)}`.slice(0, 200)
    }).subscribe({
      next: () => { this.avisos.success('Descuento registrado.'); this.cargarMes(); },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  // ---------- Detalle ----------
  protected abrirDetalle(p: Docente, pestana: 'contratos' | 'pagos' | 'cuenta'): void {
    this.detalle.set({ p, pestana });
  }

  protected cerrarDetalle(): void {
    this.detalle.set(null);
    // Pudo crearse un contrato o un pago: se vuelve a leer todo lo que muestran las tarjetas.
    this.rrhh.contratos().subscribe(c => this.contratos.set(contratosPorPersona(c)));
    this.cargarCuentas();
    this.cargarMes();
  }
}
```

---

<a id="51-pagos-por-aprobarcomponentts"></a>
## 51. `pagos-por-aprobar.component.ts` — Otros Componentes Frontend

**Ruta del archivo:** `frontend/src/app/features/personal/pagos-por-aprobar.component.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `pagos-por-aprobar.component`.

```typescript
import { Component, OnInit, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PagoPersonal } from '../../core/models/rrhh.model';
import { NotificationService } from '../../core/services/notification.service';
import { PagoPersonalService } from '../../core/services/pago-personal.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { etiquetaConcepto, fechaCorta, nombrePeriodo, soles } from './rrhh';

/**
 * Pagos al personal que caja ya registró y esperan la aprobación del administrador. Se aprueba o se rechaza con un motivo (caja lo verá).
 * Solo se muestra si hay algo por aprobar.
 */
@Component({
  selector: 'app-pagos-por-aprobar',
  imports: [ReactiveFormsModule, ModalComponent],
  template: `
    @if (lista().length) {
      <section class="por-aprobar" aria-labelledby="pa-titulo">
        <header>
          <h2 id="pa-titulo">Pagos por aprobar <span class="cuenta">{{ lista().length }}</span></h2>
          <span class="muted">Caja ya los registró. Al aprobar quedan como pagados.</span>
        </header>
        <ul>
          @for (p of lista(); track p.id) {
            <li>
              <div class="quien">
                <strong>{{ p.personalNombre }}</strong>
                <span class="muted">{{ concepto(p) }} de {{ mes(p.periodo) }}@if (p.areaNombre) { · {{ p.areaNombre }} }</span>
              </div>
              <div class="como">
                <span>{{ p.medio?.replace('_', ' / ') }}@if (p.fechaPago) { · {{ fecha(p.fechaPago) }} }</span>
                @if (p.referencia) { <span class="muted">Op. {{ p.referencia }}</span> }
              </div>
              <strong class="monto" [class.neg]="p.montoFirmado < 0">{{ dinero(p.montoFirmado) }}</strong>
              <div class="acciones">
                <button type="button" class="btn btn-primary btn-sm" [disabled]="ocupado()" (click)="aprobar(p)" [attr.aria-label]="'Aprobar el pago de ' + p.personalNombre">Aprobar</button>
                <button type="button" class="btn btn-sm" [disabled]="ocupado()" (click)="pedirRechazo(p)" [attr.aria-label]="'Rechazar el pago de ' + p.personalNombre">Rechazar</button>
              </div>
            </li>
          }
        </ul>
        @if (lista().length > 1) {
          <div class="todos"><button type="button" class="btn" [disabled]="ocupado()" (click)="aprobarTodos()">Aprobar los {{ lista().length }} pagos</button></div>
        }
      </section>
    }

    @if (rechazando(); as p) {
      <app-modal titulo="Rechazar el pago" [ancho]="460" (cerrar)="rechazando.set(null)">
        <p style="margin-top: 0">Pago de <strong>{{ concepto(p) }}</strong> a <strong>{{ p.personalNombre }}</strong> ({{ dinero(p.montoFirmado) }}). Vuelve a pendiente y caja verá el motivo.</p>
        <div class="field">
          <label for="pa-motivo">Motivo</label>
          <input id="pa-motivo" [formControl]="motivo" maxlength="300" placeholder="Ej.: el número de operación no coincide" />
        </div>
        @if (errorRechazo()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorRechazo() }}</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="rechazando.set(null)">Cancelar</button>
          <button type="button" class="btn btn-danger" [disabled]="ocupado()" (click)="rechazar(p)">Rechazar pago</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .por-aprobar { display: flex; flex-direction: column; gap: 10px; padding: 16px; margin-bottom: 16px; border: 1.5px solid var(--violet, #6b4fd8); border-radius: 16px; background: var(--violet-soft, #f1edff); }
    header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    h2 { margin: 0; font-size: 1.05rem; }
    .cuenta { margin-left: 6px; font-size: .8rem; background: var(--card); color: var(--violet, #6b4fd8); border-radius: 999px; padding: 1px 9px; }
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    li { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) auto auto; gap: 14px; align-items: center; padding: 10px 14px; border-radius: 12px; background: var(--card); }
    .quien, .como { display: flex; flex-direction: column; min-width: 0; font-size: .9rem; }
    .monto { font-variant-numeric: tabular-nums; font-size: 1.05rem; }
    .monto.neg { color: var(--danger, #b3261e); }
    .acciones { display: flex; gap: 6px; }
    .todos { display: flex; justify-content: flex-end; }
    @media (max-width: 800px) { li { grid-template-columns: minmax(0, 1fr) auto; } .como, .acciones { grid-column: 1 / -1; } }
  `
})
export class PagosPorAprobarComponent implements OnInit {
  private readonly api = inject(PagoPersonalService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  /** Avisa que se aprobó o rechazó algo, para que la página que lo contiene recargue sus números. */
  readonly cambio = output<void>();

  protected readonly dinero = soles;
  protected readonly lista = signal<PagoPersonal[]>([]);
  protected readonly ocupado = signal(false);
  protected readonly rechazando = signal<PagoPersonal | null>(null);
  protected readonly errorRechazo = signal<string | null>(null);
  protected readonly motivo = this.fb.nonNullable.control('');

  ngOnInit(): void {
    this.cargar();
  }

  /** Se llama también desde fuera cuando cambian los pagos. */
  cargar(): void {
    this.api.porAprobar().subscribe({
      next: l => this.lista.set(l),
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar los pagos por aprobar.'))
    });
  }

  protected concepto(p: PagoPersonal): string { return etiquetaConcepto(p.concepto); }
  protected mes(periodo: string): string { return nombrePeriodo(periodo); }
  protected fecha(f: string): string { return fechaCorta(f); }

  protected aprobar(p: PagoPersonal): void {
    this.ocupado.set(true);
    this.api.aprobar(p.id).subscribe({
      next: () => { this.ocupado.set(false); this.avisos.success(`Pago aprobado: ${p.personalNombre}.`); this.terminado(); },
      error: e => { this.ocupado.set(false); this.avisos.error(mensajeError(e)); this.terminado(); }
    });
  }

  protected aprobarTodos(): void {
    const pendientes = this.lista();
    this.ocupado.set(true);
    let hechos = 0;
    const siguiente = (i: number): void => {
      if (i >= pendientes.length) {
        this.ocupado.set(false);
        this.avisos.success(`${hechos} ${hechos === 1 ? 'pago aprobado' : 'pagos aprobados'}.`);
        this.terminado();
        return;
      }
      this.api.aprobar(pendientes[i].id).subscribe({
        next: () => { hechos++; siguiente(i + 1); },
        error: e => { this.ocupado.set(false); this.avisos.error(mensajeError(e)); this.terminado(); }
      });
    };
    siguiente(0);
  }

  protected pedirRechazo(p: PagoPersonal): void {
    this.motivo.setValue('');
    this.errorRechazo.set(null);
    this.rechazando.set(p);
  }

  protected rechazar(p: PagoPersonal): void {
    const motivo = this.motivo.value.trim();
    if (!motivo) {
      this.errorRechazo.set('El motivo es obligatorio: caja lo verá para corregirlo.');
      return;
    }
    this.ocupado.set(true);
    this.api.rechazar(p.id, motivo).subscribe({
      next: () => { this.ocupado.set(false); this.rechazando.set(null); this.avisos.success('Pago rechazado: vuelve a pendiente.'); this.terminado(); },
      error: e => { this.ocupado.set(false); this.errorRechazo.set(mensajeError(e)); }
    });
  }

  private terminado(): void {
    this.cargar();
    this.cambio.emit();
  }
}
```

---

<a id="52-plan-pagots"></a>
## 52. `plan-pago.ts` — Otros Componentes Frontend

**Ruta del archivo:** `frontend/src/app/features/matriculas/plan-pago.ts`

### **¿Qué hace este archivo?**
Archivo TypeScript correspondiente a `plan-pago`.

```typescript
import { PlanPago } from '../../core/models/matricula.model';
import { Tarifa } from '../../core/models/pago.model';
import { Seccion } from '../../core/models/planificacion.model';

export const PLANES_PAGO: PlanPago[] = ['MENSUAL', 'BIMESTRAL', 'SEMESTRAL', 'ANUAL'];

export const AYUDA_PLAN: Record<PlanPago, string> = {
  MENSUAL: 'Una cuota por mes',
  BIMESTRAL: 'Una cuota cada dos meses',
  SEMESTRAL: 'Dos cuotas, una por semestre',
  ANUAL: 'Un solo pago por todo el año'
};

/** Cuántos meses cubre cada cuota (igual que el servidor): la suma siempre es la de los meses de la tarifa. */
export function mesesPorCuota(plan: PlanPago, n: number): number[] {
  const meses = Math.max(n, 1);
  switch (plan) {
    case 'BIMESTRAL': return Array.from({ length: Math.ceil(meses / 2) }, (_, i) => Math.min(2, meses - i * 2));
    case 'SEMESTRAL': {
      if (meses === 1) return [1];
      const primero = Math.ceil(meses / 2);
      return [primero, meses - primero];
    }
    case 'ANUAL': return [meses];
    default: return Array.from({ length: meses }, () => 1);
  }
}

/** Reparte el total del año en proporción a los meses de cada cuota (a 2 decimales hacia abajo; los centavos que sobran van a la última). */
export function repartir(total: number, meses: readonly number[]): number[] {
  const centavos = Math.round(total * 100);
  const suma = meses.reduce((s, m) => s + m, 0);
  const montos: number[] = [];
  let acumulado = 0;
  meses.forEach((m, i) => {
    const c = i === meses.length - 1 ? centavos - acumulado : Math.floor((centavos * m) / suma);
    montos.push(c);
    acumulado += c;
  });
  return montos.map(c => c / 100);
}

/** Lo que cuesta un plan: cuántas cuotas, de cuánto, cuánto se descuenta y cuánto se paga en total por la pensión del año. */
export interface ResumenPlan {
  cuotas: number;
  /** El monto de la primera cuota ya con el descuento del plan (las demás pueden diferir por centavos). */
  cuota: number;
  sinDescuento: number;
  descuento: number;
  total: number;
  porcentaje: number;
}

const redondear = (n: number): number => Math.round(n * 100) / 100;

export function resumenDelPlan(totalPension: number, mesesTarifa: number, plan: PlanPago, porcentaje: number): ResumenPlan {
  const montos = repartir(totalPension, mesesPorCuota(plan, mesesTarifa));
  // El servidor calcula el descuento cuota por cuota, redondeado a 2 decimales
  const descuentos = montos.map(m => Math.round(m * porcentaje) / 100);
  const descuento = redondear(descuentos.reduce((s, d) => s + d, 0));
  return {
    cuotas: montos.length,
    cuota: redondear(montos[0] - descuentos[0]),
    sinDescuento: redondear(totalPension),
    descuento,
    total: redondear(totalPension - descuento),
    porcentaje
  };
}

/** La tarifa de pensión que corresponde a una sección: la de su grado si existe y, si no, la de todo su nivel. */
export function tarifaPension(tarifas: readonly Tarifa[], seccion: Pick<Seccion, 'anioId' | 'nivelId' | 'gradoId'> | null): Tarifa | null {
  if (!seccion) return null;
  const candidatas = tarifas.filter(t => t.conceptoCodigo === 'PENSION' && t.activo && t.anioId === seccion.anioId && t.nivelId === seccion.nivelId
    && (!t.gradoId || t.gradoId === seccion.gradoId));
  return candidatas.find(t => t.gradoId === seccion.gradoId) ?? candidatas[0] ?? null;
}
```

---

