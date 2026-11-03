/** Roles de acceso que puede tener una persona del personal (el administrador no se crea desde aquí). */
export type RolPersonal = 'DOCENTE' | 'SECRETARIA' | 'CAJERO';

export interface InfoRol {
  id: RolPersonal;
  etiqueta: string;
  ayuda: string;
}

export const ROLES_PERSONAL: InfoRol[] = [
  { id: 'DOCENTE', etiqueta: 'Docente', ayuda: 'Pasa lista, pone notas y crea tareas y exámenes de sus cursos' },
  { id: 'SECRETARIA', etiqueta: 'Secretaría', ayuda: 'Matrícula, expedientes, horarios y consulta de la estructura' },
  { id: 'CAJERO', etiqueta: 'Caja', ayuda: 'Cobros en ventanilla y comprobantes' }
];

/** Documento mínimo para usarlo como clave inicial (la política de claves de Keycloak pide al menos 8 caracteres). */
export const DOCUMENTO_MINIMO = 8;

/**
 * El rol de acceso que suele corresponder a cada área de trabajo. Las áreas que no tienen un rol propio en el sistema
 * (psicología, seguridad, mantenimiento…) devuelven vacío: quien crea la cuenta elige el rol.
 */
export function rolSugerido(areaCodigo: string | null | undefined): RolPersonal | '' {
  switch ((areaCodigo ?? '').toUpperCase()) {
    case 'DOCENCIA': return 'DOCENTE';
    case 'TESORERIA': return 'CAJERO';
    case 'SECRETARIA':
    case 'ADMISION': return 'SECRETARIA';
    default: return '';
  }
}

/** ¿El documento sirve como clave inicial? Solo letras y números, de 8 a 20 caracteres. */
export function documentoSirveDeClave(documento: string): boolean {
  return /^[A-Za-z0-9]{8,20}$/.test((documento ?? '').trim());
}

/**
 * El usuario que se le asignará: primer nombre, punto y primer apellido, en minúsculas y sin tildes («María José» «Aguilar Ortiz» → maria.aguilar).
 * Es una muestra: si ya existe, el servidor le añade un número.
 */
export function usuarioPrevisto(nombres: string, apellidos: string): string {
  const parte = (t: string) => (t.trim().split(/\s+/)[0] ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const base = `${parte(nombres)}.${parte(apellidos)}`.replace(/^\.|\.$/g, '');
  return base.length >= 3 ? base : base + 'usr';
}
