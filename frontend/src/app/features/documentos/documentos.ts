import { Alumno } from '../../core/models/alumno.model';
import { EstadoCuenta } from '../../core/models/cobro.model';
import { Matricula } from '../../core/models/matricula.model';
import { Colegio, Seccion } from '../../core/models/planificacion.model';

/**
 * Generador de documentos del colegio con la información que ya existe en el sistema (alumno, matrícula, sección, cuenta y datos del colegio).
 * Todo se arma aquí como bloques de texto (sin HTML): la pantalla los muestra en una hoja y se imprime o se guarda como PDF.
 */
export type TipoDocumento = 'CONSTANCIA_MATRICULA' | 'CONSTANCIA_ESTUDIOS' | 'CONSTANCIA_NO_ADEUDO' | 'FICHA_ALUMNO' | 'ESTADO_CUENTA';

export interface DatosDocumento {
  colegio: Colegio | null;
  alumno: Alumno;
  matriculas: readonly Matricula[];
  secciones: readonly Seccion[];
  /** `null` = no se pudo leer la cuenta del alumno. */
  cuenta: EstadoCuenta | null;
  fecha: Date;
}

export interface Disponibilidad {
  tipo: TipoDocumento;
  titulo: string;
  descripcion: string;
  disponible: boolean;
  /** Por qué no se puede emitir (cuando `disponible` es falso). */
  motivo?: string;
}

export type Bloque =
  | { k: 'titulo'; texto: string }
  | { k: 'parrafo'; texto: string; destacado?: boolean }
  | { k: 'datos'; filas: [string, string][] }
  | { k: 'tabla'; columnas: string[]; filas: string[][] };

export interface DocumentoArmado {
  numero: string;
  titulo: string;
  bloques: Bloque[];
  /** Quién firma (el director del colegio, si está en sus datos). */
  firma: { nombre: string; cargo: string };
  lugarYFecha: string;
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];

/** «4 de noviembre de 2026». */
export const fechaLarga = (d: Date): string => `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;

/** «04/11/2026» a partir de una fecha ISO (AAAA-MM-DD) o con hora. */
export function fechaCorta(iso?: string | null): string {
  if (!iso) return '—';
  const [a, m, d] = iso.slice(0, 10).split('-');
  return a && m && d ? `${d}/${m}/${a}` : '—';
}

const soles = (n: number): string => `S/ ${n.toFixed(2)}`;
const esMujer = (a: Pick<Alumno, 'sexo'>): boolean => (a.sexo ?? '').toUpperCase().startsWith('F');
const turnoTexto = (t: string): string => (t === 'TARDE' ? 'tarde' : 'mañana');

/** La matrícula vigente del alumno: la última (por año) que esté MATRICULADO. */
export function matriculaVigente(matriculas: readonly Matricula[], alumnoId: number): Matricula | null {
  return [...matriculas].filter(m => m.alumnoId === alumnoId && m.estado === 'MATRICULADO').sort((a, b) => b.anioId - a.anioId || b.id - a.id)[0] ?? null;
}

export const seccionDe = (m: Pick<Matricula, 'seccionId'>, secciones: readonly Seccion[]): Seccion | null => secciones.find(s => s.id === m.seccionId) ?? null;

/** Qué documentos se pueden emitir para este alumno con lo que hay hoy, y por qué no los que faltan. */
export function disponibilidad(d: DatosDocumento): Disponibilidad[] {
  const vigente = matriculaVigente(d.matriculas, d.alumno.id);
  const sinMatricula = 'El alumno no tiene una matrícula vigente (MATRICULADO).';
  const vencido = d.cuenta ? d.cuenta.totalVencido : null;
  return [
    { tipo: 'CONSTANCIA_MATRICULA', titulo: 'Constancia de matrícula', descripcion: 'Certifica que el alumno está matriculado: año, grado, sección y turno.', disponible: !!vigente, motivo: vigente ? undefined : sinMatricula },
    {
      tipo: 'CONSTANCIA_ESTUDIOS', titulo: 'Constancia de estudios', descripcion: 'Certifica que el alumno cursa estudios en el colegio.',
      disponible: !!vigente && d.alumno.estado === 'ACTIVO', motivo: !vigente ? sinMatricula : d.alumno.estado !== 'ACTIVO' ? `El alumno figura como ${d.alumno.estado.toLowerCase()}.` : undefined
    },
    {
      tipo: 'CONSTANCIA_NO_ADEUDO', titulo: 'Constancia de no adeudo', descripcion: 'Certifica que el alumno no tiene cuotas vencidas.',
      disponible: vencido === 0, motivo: vencido === null ? 'No se pudo leer la cuenta del alumno.' : vencido > 0 ? `Tiene ${soles(vencido)} vencido: debe regularizarlo antes.` : undefined
    },
    { tipo: 'FICHA_ALUMNO', titulo: 'Ficha del alumno', descripcion: 'Datos personales y de sus apoderados.', disponible: true },
    {
      tipo: 'ESTADO_CUENTA', titulo: 'Estado de cuenta', descripcion: 'Cuotas, pagos pendientes, vencido y crédito del alumno.',
      disponible: !!d.cuenta, motivo: d.cuenta ? undefined : 'No se pudo leer la cuenta del alumno.'
    }
  ];
}

const PREFIJO: Record<TipoDocumento, string> = { CONSTANCIA_MATRICULA: 'CM', CONSTANCIA_ESTUDIOS: 'CE', CONSTANCIA_NO_ADEUDO: 'NA', FICHA_ALUMNO: 'FA', ESTADO_CUENTA: 'EC' };

function encabezado(c: Colegio | null): string {
  if (!c) return 'La Dirección del colegio';
  const partes = [`la Institución Educativa «${c.nombre}»`];
  if (c.codigoModular) partes.push(`con código modular ${c.codigoModular}`);
  if (c.ugel) partes.push(`de la ${c.ugel}`);
  return `La Dirección de ${partes.join(', ')}`;
}

function lugarYFecha(c: Colegio | null, f: Date): string {
  const lugar = c?.distrito || c?.provincia || c?.departamento;
  return lugar ? `${lugar}, ${fechaLarga(f)}` : fechaLarga(f);
}

/** El nombre completo del alumno y su documento, como se cita en las constancias. */
const citaAlumno = (a: Alumno): string => `${a.nombreCompleto} (${a.tipoDocumento ?? 'DNI'} ${a.numeroDocumento})`;

// ---------------------------------------------------------------- documentos requeridos del expediente

/** Los documentos sin los cuales no se matricula: el sistema puede armar una ficha con los datos registrados de cada uno. */
export type TipoRequerido = 'DNI' | 'PARTIDA_NACIMIENTO' | 'FICHA_SIAGIE';

export const NOMBRE_REQUERIDO: Record<TipoRequerido, string> = {
  DNI: 'Ficha de identidad (DNI)',
  PARTIDA_NACIMIENTO: 'Ficha de la partida de nacimiento',
  FICHA_SIAGIE: 'Ficha SIAGIE del alumno'
};

const NOTA_ORIGINAL: Bloque = {
  k: 'parrafo', destacado: false,
  texto: 'Documento informativo generado por EduSpace con los datos registrados del alumno. No reemplaza al documento original, que debe presentarse en secretaría para su verificación.'
};

const DOCUMENTO_DE: Record<string, string> = { DNI: 'DNI', CE: 'Carné de extranjería', PASAPORTE: 'Pasaporte' };

function parentesco(v: Alumno['apoderados'][number]): string {
  return v.parentesco.charAt(0) + v.parentesco.slice(1).toLowerCase();
}

/** Arma la ficha de uno de los documentos requeridos con lo que ya existe del alumno (sin inventar datos: lo que falta sale como «—»). */
export function armarRequerido(tipo: TipoRequerido, d: DatosDocumento): DocumentoArmado {
  const a = d.alumno;
  const f = d.fecha;
  const base = {
    numero: `${tipo === 'DNI' ? 'ID' : tipo === 'PARTIDA_NACIMIENTO' ? 'PN' : 'SG'}-${f.getFullYear()}-${a.codigo}`,
    firma: { nombre: d.colegio?.director?.trim() || 'Secretaría', cargo: d.colegio?.director?.trim() ? 'Director(a)' : 'Secretaría académica' },
    lugarYFecha: lugarYFecha(d.colegio, f)
  };
  const documento = `${DOCUMENTO_DE[a.tipoDocumento ?? 'DNI'] ?? a.tipoDocumento} ${a.numeroDocumento}`;
  const sexo = esMujer(a) ? 'Femenino' : 'Masculino';
  const nacimiento = fechaLarga(new Date(`${a.fechaNacimiento.slice(0, 10)}T12:00:00`));

  switch (tipo) {
    case 'DNI':
      return { ...base, titulo: NOMBRE_REQUERIDO.DNI, bloques: [
        { k: 'titulo', texto: 'Datos de identidad' },
        { k: 'datos', filas: [
          ['Documento', documento], ['Apellido paterno', a.apellidoPaterno], ['Apellido materno', a.apellidoMaterno || '—'], ['Nombres', a.nombres],
          ['Fecha de nacimiento', fechaCorta(a.fechaNacimiento)], ['Sexo', sexo], ['Nacionalidad', a.nacionalidad || '—'], ['Código de alumno', a.codigo]
        ] },
        { k: 'datos', filas: [['Domicilio', [a.direccion, a.distrito].filter(Boolean).join(', ') || '—']] },
        NOTA_ORIGINAL
      ] };
    case 'PARTIDA_NACIMIENTO':
      return { ...base, titulo: NOMBRE_REQUERIDO.PARTIDA_NACIMIENTO, bloques: [
        { k: 'titulo', texto: 'Datos del nacimiento' },
        { k: 'datos', filas: [
          ['Nombres y apellidos', `${a.nombres} ${a.apellidoPaterno}${a.apellidoMaterno ? ' ' + a.apellidoMaterno : ''}`], ['Documento', documento],
          ['Fecha de nacimiento', nacimiento], ['Sexo', sexo], ['Nacionalidad', a.nacionalidad || '—'], ['Código de alumno', a.codigo]
        ] },
        { k: 'titulo', texto: 'Padres o apoderados registrados' },
        { k: 'tabla', columnas: ['Nombre', 'Parentesco', 'Documento'], filas: a.apoderados.map(v => [
          `${v.apoderado.apellidos}, ${v.apoderado.nombres}`, parentesco(v), `${DOCUMENTO_DE[v.apoderado.tipoDocumento ?? 'DNI'] ?? 'DNI'} ${v.apoderado.numeroDocumento}`
        ]) },
        NOTA_ORIGINAL
      ] };
    case 'FICHA_SIAGIE': {
      const vigente = matriculaVigente(d.matriculas, a.id);
      const sec = vigente ? seccionDe(vigente, d.secciones) : null;
      return { ...base, titulo: NOMBRE_REQUERIDO.FICHA_SIAGIE, bloques: [
        { k: 'titulo', texto: 'Datos del estudiante' },
        { k: 'datos', filas: [
          ['Código de alumno', a.codigo], ['Documento', documento], ['Apellidos', [a.apellidoPaterno, a.apellidoMaterno].filter(Boolean).join(' ')], ['Nombres', a.nombres],
          ['Fecha de nacimiento', fechaCorta(a.fechaNacimiento)], ['Sexo', sexo], ['Nacionalidad', a.nacionalidad || '—'], ['Estado', a.estado],
          ['Dirección', a.direccion || '—'], ['Distrito', a.distrito || '—'], ['Teléfono', a.telefono || '—'], ['Correo', a.email || '—'],
          ['Colegio de procedencia', a.colegioProcedencia || '—'],
          ['Matrícula vigente', vigente ? `${vigente.codigo}${sec ? ` · ${sec.gradoNombre} «${sec.nombre}», ${sec.anioNombre}` : ''}` : 'Sin matrícula vigente']
        ] },
        { k: 'titulo', texto: 'Apoderados' },
        { k: 'tabla', columnas: ['Nombre', 'Parentesco', 'Documento', 'Teléfono', 'Correo', 'Rol'], filas: a.apoderados.map(v => [
          `${v.apoderado.apellidos}, ${v.apoderado.nombres}`, parentesco(v), `${DOCUMENTO_DE[v.apoderado.tipoDocumento ?? 'DNI'] ?? 'DNI'} ${v.apoderado.numeroDocumento}`,
          v.apoderado.telefono || '—', v.apoderado.email || '—', [v.esPrincipal ? 'principal' : '', v.esResponsablePago ? 'responsable de pago' : ''].filter(Boolean).join(', ') || '—'
        ]) },
        NOTA_ORIGINAL
      ] };
    }
  }
}

/** Arma el documento pedido. Quien llama debe haber comprobado `disponibilidad` antes. */
export function armar(tipo: TipoDocumento, d: DatosDocumento): DocumentoArmado {
  const a = d.alumno;
  const anioNumero = d.fecha.getFullYear();
  const vigente = matriculaVigente(d.matriculas, a.id);
  const sec = vigente ? seccionDe(vigente, d.secciones) : null;
  const articulo = esMujer(a) ? 'la alumna' : 'el alumno';
  const base = {
    numero: `${PREFIJO[tipo]}-${anioNumero}-${a.codigo}`,
    firma: { nombre: d.colegio?.director?.trim() || 'Director(a)', cargo: d.colegio?.director?.trim() ? 'Director(a)' : 'Dirección' },
    lugarYFecha: lugarYFecha(d.colegio, d.fecha)
  };
  const cierre: Bloque = { k: 'parrafo', texto: 'Se expide la presente a solicitud del interesado, para los fines que estime conveniente.' };
  const ubicacion = vigente
    ? (sec ? `${sec.gradoNombre}, sección «${sec.nombre}», turno ${turnoTexto(sec.turno)}, del año escolar ${sec.anioNombre}` : 'el grado y la sección que figuran en su matrícula')
    : '';

  switch (tipo) {
    case 'CONSTANCIA_MATRICULA':
      return { ...base, titulo: 'Constancia de matrícula', bloques: [
        { k: 'parrafo', texto: `${encabezado(d.colegio)}, que suscribe,` },
        { k: 'titulo', texto: 'HACE CONSTAR' },
        { k: 'parrafo', texto: `Que ${articulo} ${citaAlumno(a)}, con código ${a.codigo}, se encuentra MATRICULAD${esMujer(a) ? 'A' : 'O'} en ${ubicacion}, con matrícula N.º ${vigente?.codigo ?? '—'}.` },
        cierre
      ] };
    case 'CONSTANCIA_ESTUDIOS':
      return { ...base, titulo: 'Constancia de estudios', bloques: [
        { k: 'parrafo', texto: `${encabezado(d.colegio)}, que suscribe,` },
        { k: 'titulo', texto: 'HACE CONSTAR' },
        { k: 'parrafo', texto: `Que ${articulo} ${citaAlumno(a)}, con código ${a.codigo}, cursa estudios regulares en esta institución educativa, en ${ubicacion}.` },
        cierre
      ] };
    case 'CONSTANCIA_NO_ADEUDO':
      return { ...base, titulo: 'Constancia de no adeudo', bloques: [
        { k: 'parrafo', texto: `${encabezado(d.colegio)}, que suscribe,` },
        { k: 'titulo', texto: 'HACE CONSTAR' },
        { k: 'parrafo', texto: `Que ${articulo} ${citaAlumno(a)}, con código ${a.codigo}, no registra cuotas vencidas ni deudas pendientes con esta institución educativa a la fecha de emisión de este documento.` },
        cierre
      ] };
    case 'FICHA_ALUMNO':
      return { ...base, titulo: 'Ficha del alumno', bloques: [
        { k: 'titulo', texto: 'Datos del alumno' },
        { k: 'datos', filas: [
          ['Código', a.codigo], ['Nombre completo', a.nombreCompleto], ['Documento', `${a.tipoDocumento ?? 'DNI'} ${a.numeroDocumento}`],
          ['Fecha de nacimiento', fechaCorta(a.fechaNacimiento)], ['Sexo', esMujer(a) ? 'Femenino' : 'Masculino'], ['Nacionalidad', a.nacionalidad || '—'],
          ['Dirección', [a.direccion, a.distrito].filter(Boolean).join(', ') || '—'], ['Teléfono', a.telefono || '—'], ['Correo', a.email || '—'],
          ['Colegio de procedencia', a.colegioProcedencia || '—'], ['Estado', a.estado]
        ] },
        ...(vigente ? [{ k: 'datos' as const, filas: [['Matrícula vigente', `${vigente.codigo} · ${ubicacion}`] as [string, string]] }] : []),
        { k: 'titulo', texto: 'Apoderados' },
        { k: 'tabla', columnas: ['Nombre', 'Parentesco', 'Documento', 'Teléfono', 'Correo', 'Rol'], filas: a.apoderados.map(v => [
          `${v.apoderado.apellidos}, ${v.apoderado.nombres}`, v.parentesco.toLowerCase(), `${v.apoderado.tipoDocumento ?? 'DNI'} ${v.apoderado.numeroDocumento}`,
          v.apoderado.telefono || '—', v.apoderado.email || '—', [v.esPrincipal ? 'principal' : '', v.esResponsablePago ? 'responsable de pago' : ''].filter(Boolean).join(', ') || '—'
        ]) }
      ] };
    case 'ESTADO_CUENTA': {
      const c = d.cuenta!;
      return { ...base, titulo: 'Estado de cuenta', bloques: [
        { k: 'datos', filas: [['Alumno', citaAlumno(a)], ['Código', a.codigo], ['Responsable de pago', c.responsableNombre || '—']] },
        { k: 'datos', filas: [['Total cobrado', soles(c.totalCobrado)], ['Pendiente', soles(c.totalPendiente)], ['Vencido', soles(c.totalVencido)], ['Crédito a favor', soles(c.credito ?? 0)]] },
        { k: 'tabla', columnas: ['Concepto', 'Vence', 'Monto', 'Descuento', 'Mora', 'Saldo', 'Estado'], filas: c.cuotas.map(q => [
          q.descripcion, fechaCorta(q.fechaVencimiento), soles(q.montoBase), soles(q.descuento), soles(q.mora), soles(q.saldo), q.estado
        ]) }
      ] };
    }
  }
}
