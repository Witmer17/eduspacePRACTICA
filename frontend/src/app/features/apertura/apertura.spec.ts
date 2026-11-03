import { Anio, Bloque, Grado, MallaGrado, Seccion } from '../../core/models/planificacion.model';
import { Campania } from '../../core/models/matricula.model';
import { DatosApertura, anioPorAbrir, avanceApertura, evaluarApertura, sePuedeActivar, siguientePaso } from './apertura';

const anio = (id: number, estado: Anio['estado'], inicio = '2027-03-01'): Anio => ({ id, nombre: 'Año ' + id, fechaInicio: inicio, fechaFin: '2027-12-20', estado });
const grado = (id: number): Grado => ({ id, nivelId: 1, nivelNombre: 'Primaria', numero: id, nombre: `${id}° de Primaria`, activo: true });
const malla = (gradoId: number, cursoIds: number[]): MallaGrado => ({
  gradoId, gradoNombre: 'G', totalHoras: cursoIds.length * 2,
  cursos: cursoIds.map(c => ({ id: c * 10 + gradoId, cursoId: c, cursoCodigo: 'C', cursoNombre: 'C', horasSemanales: 2 }))
});
const seccion = (id: number, gradoId: number): Seccion => ({ id, gradoId, anioId: 1, nombre: 'A', turno: 'MANANA', capacidad: 30, activo: true } as Seccion);
const bloque: Bloque = { id: 1, turno: 'MANANA', orden: 1, horaInicio: '08:00', horaFin: '08:45', esReceso: false };
const campania = (estado: Campania['estado']): Campania => ({ id: 1, anioId: 1, nombre: 'Matrícula 2027', fechaInicio: '2026-12-01', fechaFin: '2027-02-28', estado });

const vacio: DatosApertura = {
  anios: [], grados: [], periodos: [], feriados: 0, secciones: [], mallas: {}, asignaciones: [], bloques: [], conceptos: 0, tarifas: 0, campanias: []
};
/** Un año planificado con todo listo menos lo que se pase en `cambios`. */
const completo = (cambios: Partial<DatosApertura> = {}): DatosApertura => ({
  anios: [anio(1, 'PLANIFICADO')], grados: [grado(1)],
  periodos: [{ id: 1, anioId: 1, numero: 1, nombre: 'I', fechaInicio: '2027-03-01', fechaFin: '2027-05-30', estado: 'PLANIFICADO' }],
  feriados: 5, secciones: [seccion(1, 1)], mallas: { 1: malla(1, [7]) },
  asignaciones: [{ id: 1, seccionId: 1, seccionNombre: 'A', cursoId: 7, cursoNombre: 'Mat', docenteId: 1, docenteNombre: 'Ana' }],
  bloques: [bloque], conceptos: 2, tarifas: 2, campanias: [campania('ABIERTA')], ...cambios
});
const estado = (d: DatosApertura, id: string) => evaluarApertura(d).find(p => p.id === id)!.estado;

describe('año por abrir', () => {
  it('es el planificado más reciente; sin planificados, el activo; un año cerrado no se reabre', () => {
    expect(anioPorAbrir([anio(1, 'ACTIVO'), anio(2, 'PLANIFICADO', '2028-03-01'), anio(3, 'PLANIFICADO', '2027-03-01')])?.id).toBe(2);
    expect(anioPorAbrir([anio(1, 'ACTIVO'), anio(2, 'CERRADO')])?.id).toBe(1);
    expect(anioPorAbrir([anio(2, 'CERRADO')])).toBeNull();
    expect(anioPorAbrir(null)).toBeNull();
  });
});

describe('pasos de la apertura', () => {
  it('numera los pasos en orden y los marca como necesarios u opcionales', () => {
    const pasos = evaluarApertura(vacio);
    expect(pasos.map(p => p.numero)).toEqual(pasos.map((_, i) => i + 1));
    expect(pasos.find(p => p.id === 'feriados')!.requerido).toBe(false);
    expect(pasos.filter(p => p.requerido).length).toBe(pasos.length - 1);
  });

  it('sin nada creado, todo lo necesario está pendiente y el primer paso es crear el año', () => {
    const pasos = evaluarApertura(vacio);
    expect(pasos.filter(p => p.requerido).every(p => p.estado === 'pendiente')).toBe(true);
    expect(siguientePaso(pasos)?.id).toBe('anio');
    expect(estado(vacio, 'feriados')).toBe('opcional'); // sin feriados no bloquea
  });

  it('con todo listo no falta nada y el avance es 100 %', () => {
    const pasos = evaluarApertura(completo());
    expect(pasos.filter(p => p.requerido).every(p => p.estado === 'ok')).toBe(true);
    expect(siguientePaso(pasos)).toBeNull();
    expect(avanceApertura(pasos)).toEqual({ listos: 9, total: 9, porcentaje: 100 });
  });

  it('un grado sin cursos deja pendiente los cursos, y una sección sin docente deja pendiente los docentes', () => {
    expect(estado(completo({ grados: [grado(1), grado(2)], mallas: { 1: malla(1, [7]) } }), 'malla')).toBe('pendiente');
    expect(estado(completo({ asignaciones: [] }), 'docentes')).toBe('pendiente');
    expect(estado(completo({ secciones: [] }), 'secciones')).toBe('pendiente');
  });

  it('falta de bloques horarios en el turno de una sección deja pendientes los horarios', () => {
    expect(estado(completo({ bloques: [] }), 'horarios')).toBe('pendiente');
    expect(estado(completo({ secciones: [{ ...seccion(1, 1), turno: 'TARDE' }] }), 'horarios')).toBe('pendiente');
  });

  it('las tarifas necesitan conceptos y al menos una tarifa del año', () => {
    expect(estado(completo({ conceptos: 0, tarifas: 0 }), 'tarifas')).toBe('pendiente');
    expect(estado(completo({ tarifas: 0 }), 'tarifas')).toBe('pendiente');
  });

  it('la campaña está lista solo si hay una abierta', () => {
    expect(estado(completo({ campanias: [campania('PLANIFICADA')] }), 'campania')).toBe('pendiente');
    expect(estado(completo({ campanias: [] }), 'campania')).toBe('pendiente');
  });

  it('lo que no se pudo consultar queda «sin datos» y no cuenta como listo', () => {
    const d = completo({ tarifas: null, campanias: null });
    expect(estado(d, 'tarifas')).toBe('sin-datos');
    expect(avanceApertura(evaluarApertura(d)).listos).toBe(7);
    expect(siguientePaso(evaluarApertura(d))?.id).toBe('tarifas');
  });
});

describe('activar el año', () => {
  it('se puede cuando todo lo necesario está listo salvo la campaña (que se abre ya con el año activo)', () => {
    const d = completo({ campanias: [] });
    expect(sePuedeActivar(anio(1, 'PLANIFICADO'), evaluarApertura(d))).toBe(true);
  });

  it('no se puede si falta un paso necesario, si el año ya está activo o si no hay año', () => {
    expect(sePuedeActivar(anio(1, 'PLANIFICADO'), evaluarApertura(completo({ tarifas: 0 })))).toBe(false);
    expect(sePuedeActivar(anio(1, 'ACTIVO'), evaluarApertura(completo()))).toBe(false);
    expect(sePuedeActivar(null, evaluarApertura(completo()))).toBe(false);
  });
});
