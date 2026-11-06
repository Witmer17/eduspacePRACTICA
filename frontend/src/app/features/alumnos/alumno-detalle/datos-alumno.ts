import { Alumno } from '../../../core/models/alumno.model';

/** Los datos personales que conviene tener completos en el expediente, con el nombre que se muestra. */
const CAMPOS: { clave: keyof Alumno; nombre: string }[] = [
  { clave: 'direccion', nombre: 'dirección' },
  { clave: 'distrito', nombre: 'distrito' },
  { clave: 'telefono', nombre: 'teléfono' },
  { clave: 'email', nombre: 'correo' },
  { clave: 'colegioProcedencia', nombre: 'colegio de procedencia' }
];

const vacio = (v: unknown): boolean => v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

/** Qué datos personales del alumno faltan (vacíos o sin registrar). */
export function datosFaltantes(a: Pick<Alumno, 'direccion' | 'distrito' | 'telefono' | 'email' | 'colegioProcedencia'>): string[] {
  return CAMPOS.filter(c => vacio((a as Record<string, unknown>)[c.clave])).map(c => c.nombre);
}

/** Texto para mostrar un dato: el valor, o «Sin registrar» si falta. */
export const valorODash = (v: string | null | undefined): string => (vacio(v) ? 'Sin registrar' : v!.trim());

/** «A», «A y B» o «A, B y C». */
export function enumerar(lista: readonly string[]): string {
  if (lista.length <= 1) return lista.join('');
  return `${lista.slice(0, -1).join(', ')} y ${lista[lista.length - 1]}`;
}
