import { codigoDeArea } from './areas/areas-config.component';
import { ejemploCodigosDe } from './colegio/pabellones.component';
import { Aula, GradoOferta } from '../../core/models/planificacion.model';
import { MAX_SECCIONES, capacidadSugerida, emblemaOferta, filaValida, filasParaTodos, mismoConjunto, nombresSecciones, opcionesAula, reemplazar, resumenConfig, totalesTodos } from './grados/grados-oferta.component';

const aula = (id: number, codigo: string, capacidad: number, pabellonId: number | null = null, extra: Partial<Aula> = {}): Aula =>
  ({ id, codigo, nombre: codigo, tipo: 'AULA', capacidad, activo: true, pabellonId, pabellonNombre: pabellonId ? 'P' + pabellonId : null, ...extra });
const vacio = { pabellonId: 0, capacidad: 30, ocupadas: new Set<number>(), propias: [] as number[], actual: 0 };

describe('configuración: aula y pabellón al establecer un grado', () => {
  const AULAS = [aula(1, 'A-101', 30, 1), aula(2, 'A-102', 25, 1), aula(3, 'B-201', 40, 2), aula(4, 'B-202', 35, 2, { activo: false }), aula(5, 'LIBRE-1', 30)];

  it('ofrece solo aulas activas, ordenadas por código', () => {
    expect(opcionesAula(AULAS, vacio).map(o => o.aula.codigo)).toEqual(['A-101', 'A-102', 'B-201', 'LIBRE-1']);
  });

  it('con un pabellón elegido, solo las aulas de ese pabellón', () => {
    expect(opcionesAula(AULAS, { ...vacio, pabellonId: 2 }).map(o => o.aula.codigo)).toEqual(['B-201']);
    expect(opcionesAula(AULAS, { ...vacio, pabellonId: 1 }).map(o => o.aula.codigo)).toEqual(['A-101', 'A-102']);
  });

  it('descarta con su motivo las aulas que no alcanzan, las ya usadas en el turno y las elegidas para otra sección', () => {
    const o = opcionesAula(AULAS, { ...vacio, ocupadas: new Set([1]), propias: [3] });
    const por = (c: string) => o.find(x => x.aula.codigo === c)!;
    expect(por('A-101')).toMatchObject({ disponible: false, motivo: expect.stringContaining('otra sección en ese turno') });
    expect(por('A-102')).toMatchObject({ disponible: false, motivo: expect.stringContaining('no alcanza') });
    expect(por('B-201')).toMatchObject({ disponible: false, motivo: expect.stringContaining('elegida para otra sección') });
    expect(por('LIBRE-1').disponible).toBe(true);
  });

  it('el aula que ya tiene esta sección siempre se puede volver a elegir', () => {
    const o = opcionesAula(AULAS, { ...vacio, ocupadas: new Set([1]), actual: 1 });
    expect(o.find(x => x.aula.id === 1)!.disponible).toBe(true);
  });

  it('el resumen incluye el aula y el pabellón de cada sección', () => {
    const txt = resumenConfig({ secciones: 2, turno: 'MANANA', capacidad: 30, aulas: [1, 0] }, AULAS);
    expect(txt).toBe('2 secciones (A, B) · Mañana · 30 vacantes · A: A-101 (pab. P1), B: sin aula');
    expect(resumenConfig({ secciones: 2, turno: 'MANANA', capacidad: 30, aulas: [1, 0] })).toBe('2 secciones (A, B) · Mañana · 30 vacantes');
  });

  it('reemplazar cambia una posición sin tocar la lista original y rellena huecos con 0', () => {
    const base = [4, 5];
    expect(reemplazar(base, 0, 9)).toEqual([9, 5]);
    expect(reemplazar(base, 3, 7)).toEqual([4, 5, 0, 7]);
    expect(base).toEqual([4, 5]);
  });
});

describe('configuración: aulas que se crean con un pabellón', () => {
  it('muestra cómo se llamarán las aulas, siguiendo la numeración de las que ya tiene', () => {
    expect(ejemploCodigosDe('A', 10)).toBe('A-01, A-02… A-10');
    expect(ejemploCodigosDe('A', 2)).toBe('A-01 y A-02');
    expect(ejemploCodigosDe('A', 1)).toBe('A-01');
    expect(ejemploCodigosDe('A', 6, 4)).toBe('A-05, A-06… A-10');
    expect(ejemploCodigosDe('Central', 3)).toBe('CENTRAL-01, CENTRAL-02… CENTRAL-03');
    expect(ejemploCodigosDe('Pabellón Ñ', 2)).toBe('PABELLONN-01 y PABELLONN-02');
    expect(ejemploCodigosDe('A', 0)).toBe('—');
    expect(ejemploCodigosDe('???', 1)).toBe('P-01');
  });
});

describe('configuración: seleccionar todos los grados con su tabla', () => {
  const oferta = [
    { nivelCodigo: 'INICIAL', nivelNombre: 'Inicial', numero: 1, nombre: '3 años', seleccionado: false, enUso: false },
    { nivelCodigo: 'PRIMARIA', nivelNombre: 'Primaria', numero: 1, nombre: '1° de Primaria', seleccionado: true, enUso: true, detalleUso: '2 secciones' },
    { nivelCodigo: 'PRIMARIA', nivelNombre: 'Primaria', numero: 2, nombre: '2° de Primaria', seleccionado: false, enUso: false }
  ] as GradoOferta[];

  it('arma una fila por grado: marcados, con secciones/turno/vacantes por defecto, y los que ya están en uso quedan fijos', () => {
    const filas = filasParaTodos(oferta, new Set(['PRIMARIA:1']), {});
    expect(filas.map(f => [f.nombre, f.incluir, f.fija])).toEqual([['3 años', true, false], ['1° de Primaria', false, true], ['2° de Primaria', true, false]]);
    expect(filas[0]).toMatchObject({ secciones: 1, turno: 'MANANA', capacidad: 20 }); // Inicial: 20 vacantes
    expect(filas[2].capacidad).toBe(30);
    expect(filas[1].detalle).toBe('2 secciones');
  });

  it('respeta lo que ya se había establecido para un grado', () => {
    const filas = filasParaTodos(oferta, new Set(), { 'PRIMARIA:2': { secciones: 3, turno: 'TARDE', capacidad: 25, aulas: [] } });
    expect(filas[2]).toMatchObject({ secciones: 3, turno: 'TARDE', capacidad: 25 });
  });

  it('valida las secciones (0 a 8) y las vacantes (1 a 60)', () => {
    expect(filaValida({ secciones: 0, capacidad: 1 })).toBe(true);
    expect(filaValida({ secciones: MAX_SECCIONES, capacidad: 60 })).toBe(true);
    expect(filaValida({ secciones: MAX_SECCIONES + 1, capacidad: 30 })).toBe(false);
    expect(filaValida({ secciones: 1, capacidad: 0 })).toBe(false);
    expect(filaValida({ secciones: 1, capacidad: 61 })).toBe(false);
    expect(filaValida({ secciones: 1.5, capacidad: 30 })).toBe(false);
  });

  it('suma grados, secciones y vacantes solo de las filas marcadas y no fijas', () => {
    const filas = filasParaTodos(oferta, new Set(['PRIMARIA:1']), {});
    filas[0].secciones = 2; filas[0].capacidad = 20;
    filas[2].secciones = 3; filas[2].capacidad = 30;
    expect(totalesTodos(filas)).toEqual({ grados: 2, secciones: 5, vacantes: 2 * 20 + 3 * 30 });
    filas[2].incluir = false;
    expect(totalesTodos(filas)).toEqual({ grados: 1, secciones: 2, vacantes: 40 });
  });
});

describe('configuración: establecer un grado nuevo', () => {
  it('las secciones se nombran A, B, C… y no pasan del máximo', () => {
    expect(nombresSecciones(0)).toEqual([]);
    expect(nombresSecciones(1)).toEqual(['A']);
    expect(nombresSecciones(3)).toEqual(['A', 'B', 'C']);
    expect(nombresSecciones(99)).toHaveLength(MAX_SECCIONES);
    expect(nombresSecciones(-4)).toEqual([]);
    expect(nombresSecciones(Number.NaN)).toEqual([]);
    expect(nombresSecciones(2.9)).toEqual(['A', 'B']);
  });

  it('Inicial empieza con menos vacantes por sección que los demás niveles', () => {
    expect(capacidadSugerida('INICIAL')).toBe(20);
    expect(capacidadSugerida('PRIMARIA')).toBe(30);
    expect(capacidadSugerida('SECUNDARIA')).toBe(30);
  });

  it('el resumen dice qué se creará con el grado', () => {
    expect(resumenConfig({ secciones: 2, turno: 'MANANA', capacidad: 30 })).toBe('2 secciones (A, B) · Mañana · 30 vacantes');
    expect(resumenConfig({ secciones: 1, turno: 'TARDE', capacidad: 25 })).toBe('1 sección (A) · Tarde · 25 vacantes');
    expect(resumenConfig({ secciones: 0, turno: 'MANANA', capacidad: 30 })).toBe('Solo el grado, sin secciones');
  });
});

describe('configuración: grados y áreas', () => {
  it('el emblema de la oferta es la edad en Inicial y el número en los demás niveles', () => {
    expect(emblemaOferta({ nivelCodigo: 'INICIAL', numero: 1 })).toBe('3');
    expect(emblemaOferta({ nivelCodigo: 'INICIAL', numero: 3 })).toBe('5');
    expect(emblemaOferta({ nivelCodigo: 'PRIMARIA', numero: 6 })).toBe('6°');
    expect(emblemaOferta({ nivelCodigo: 'SECUNDARIA', numero: 1 })).toBe('1°');
  });

  it('detecta si cambió la elección de grados, sin importar el orden', () => {
    expect(mismoConjunto(new Set(['A:1', 'B:2']), new Set(['B:2', 'A:1']))).toBe(true);
    expect(mismoConjunto(new Set(['A:1']), new Set(['A:1', 'B:2']))).toBe(false);
    expect(mismoConjunto(new Set(['A:1', 'C:3']), new Set(['A:1', 'B:2']))).toBe(false);
    expect(mismoConjunto(new Set(), new Set())).toBe(true);
  });

  it('propone un código de área válido: mayúsculas, sin tildes ni espacios', () => {
    expect(codigoDeArea('Deportes y recreación')).toBe('DEPORTES_Y_RECREACION');
    expect(codigoDeArea('  Tópico   y salud ')).toBe('TOPICO_Y_SALUD');
    expect(codigoDeArea('Ñandú & Cía.')).toBe('NANDU_CIA');
    expect(codigoDeArea('A'.repeat(50))).toHaveLength(30);
    expect(codigoDeArea('???')).toBe('');
    expect(codigoDeArea('Sala 2B')).toMatch(/^[A-Z0-9_]+$/);
  });
});
