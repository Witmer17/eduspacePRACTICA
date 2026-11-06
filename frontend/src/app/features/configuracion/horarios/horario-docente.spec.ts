import { Asignacion, Bloque, ClaseHorario, Docente, MallaGrado, Seccion } from '../../../core/models/planificacion.model';
import {
  cargaDeAsignaciones, claveCelda, cursosLibresDeSeccion, horasDeMalla, opcionesParaRectangulo, resumenDocentes, seccionesDelTurno, turnosDelDocente
} from './horario-docente';

const seccion = (id: number, gradoId: number, turno: 'MANANA' | 'TARDE' = 'MANANA', activo = true): Seccion =>
  ({ id, anioId: 1, anioNombre: '2026', gradoId, gradoNombre: `Grado ${gradoId}`, nivelId: 1, nombre: 'A', turno, capacidad: 30, activo });
const malla = (gradoId: number, cursos: [number, string, number][]): MallaGrado =>
  ({ gradoId, gradoNombre: `Grado ${gradoId}`, totalHoras: 0, cursos: cursos.map(([cursoId, cursoNombre, horasSemanales], i) => ({ id: i, cursoId, cursoCodigo: cursoNombre, cursoNombre, horasSemanales })) });
const asig = (id: number, seccionId: number, cursoId: number, docenteId = 1): Asignacion =>
  ({ id, seccionId, seccionNombre: 'A', cursoId, cursoNombre: `Curso ${cursoId}`, docenteId, docenteNombre: 'D' });
const clase = (id: number, asignacionId: number, seccionId: number, bloqueId: number, diaSemana: number, docenteId = 1): ClaseHorario =>
  ({ id, asignacionId, seccionId, seccionNombre: 'A', cursoId: 10, cursoNombre: 'C', docenteId, docenteNombre: 'D', bloqueId, bloqueOrden: bloqueId, horaInicio: '08:00', horaFin: '08:45', diaSemana });
const bloque = (id: number, turno: 'MANANA' | 'TARDE' = 'MANANA'): Bloque => ({ id, turno, orden: id, horaInicio: '08:00', horaFin: '08:45', esReceso: false });
const docente = (id: number, apellidos = 'A'): Docente => ({ id, numeroDocumento: String(id), nombres: 'N', apellidos, estado: 'ACTIVO' });

const secciones = [seccion(1, 4), seccion(2, 12, 'TARDE'), seccion(3, 4, 'MANANA', false)];
const mallas = { 4: malla(4, [[10, 'Matemática', 3], [11, 'Arte', 2]]), 12: malla(12, [[10, 'Matemática', 5]]) };

describe('horas de cada asignación del docente', () => {
  it('las horas que le tocan salen de la malla del grado de la sección', () => {
    expect(horasDeMalla(secciones[0], 10, mallas)).toBe(3);
    expect(horasDeMalla(secciones[1], 10, mallas)).toBe(5);
    expect(horasDeMalla(secciones[0], 99, mallas)).toBe(0);
    expect(horasDeMalla(undefined, 10, mallas)).toBe(0);
  });

  it('cuenta las clases ya puestas y ordena por grado y curso', () => {
    const c = cargaDeAsignaciones([asig(2, 2, 10), asig(1, 1, 10), asig(3, 1, 11)], [clase(1, 1, 1, 1, 1), clase(2, 1, 1, 2, 1), clase(3, 2, 2, 1, 1)], secciones, mallas);
    expect(c.map(x => x.asignacion.id)).toEqual([1, 3, 2]);
    expect(c[0]).toMatchObject({ requeridas: 3, programadas: 2, turno: 'MANANA' });
    expect(c[1]).toMatchObject({ requeridas: 2, programadas: 0 });
    expect(c[2]).toMatchObject({ requeridas: 5, programadas: 1, turno: 'TARDE' });
  });
});

describe('qué se puede poner en un rectángulo', () => {
  const cargas = cargaDeAsignaciones([asig(1, 1, 10), asig(2, 2, 10), asig(3, 1, 11)], [], secciones, mallas);

  it('solo las secciones del turno del bloque (las de otro turno salen bloqueadas con su motivo)', () => {
    const o = opcionesParaRectangulo(cargas, bloque(1, 'MANANA'), 1, []);
    expect(o.map(x => x.impedimento)).toEqual(['', '', 'turno']);   // orden: grado 12 (tarde) queda al final por el orden de la lista
    expect(o.find(x => x.impedimento === 'turno')!.texto).toBe('es de turno tarde');
  });

  it('una sección que ya tiene clase a esa hora (de otro docente) no se puede repetir', () => {
    const ocupada = clase(9, 50, 1, 1, 1, 77);
    const o = opcionesParaRectangulo(cargas, bloque(1), 1, [ocupada]);
    expect(o.filter(x => x.carga.asignacion.seccionId === 1).every(x => x.impedimento === 'seccion-ocupada')).toBe(true);
    expect(opcionesParaRectangulo(cargas, bloque(1), 2, [ocupada]).filter(x => x.carga.asignacion.seccionId === 1).every(x => x.impedimento === '')).toBe(true);   // otro día
    expect(opcionesParaRectangulo(cargas, bloque(2), 1, [ocupada]).filter(x => x.carga.asignacion.seccionId === 1).every(x => x.impedimento === '')).toBe(true);   // otro bloque
  });

  it('un curso que ya tiene todas sus horas no admite otra, salvo la clase que se está cambiando', () => {
    const llenas = cargaDeAsignaciones([asig(1, 1, 11)], [clase(1, 1, 1, 1, 1), clase(2, 1, 1, 2, 1)], secciones, mallas);   // Arte: 2 de 2 h
    expect(opcionesParaRectangulo(llenas, bloque(3), 1, [])[0]).toMatchObject({ impedimento: 'completo', texto: 'ya tiene sus 2 h' });
    const editando = clase(2, 1, 1, 2, 1);
    expect(opcionesParaRectangulo(llenas, bloque(2), 1, [editando], editando)[0].impedimento).toBe('');
  });

  it('el curso no tiene tope si su malla no lo define (0 horas)', () => {
    const sinMalla = cargaDeAsignaciones([asig(1, 1, 99)], [clase(1, 1, 1, 1, 1)], secciones, mallas);
    expect(opcionesParaRectangulo(sinMalla, bloque(2), 1, [])[0].impedimento).toBe('');
  });
});

describe('asignar un curso nuevo desde el horario', () => {
  it('ofrece los cursos de la malla del grado que todavía no tienen docente en esa sección', () => {
    const libres = cursosLibresDeSeccion(secciones[0], mallas, [asig(1, 1, 10, 5)]);
    expect(libres.map(c => c.nombre)).toEqual(['Arte']);
    expect(libres[0]).toEqual({ cursoId: 11, nombre: 'Arte', horas: 2 });
    expect(cursosLibresDeSeccion(secciones[0], mallas, []).map(c => c.nombre)).toEqual(['Arte', 'Matemática']);
    expect(cursosLibresDeSeccion(seccion(9, 77), mallas, [])).toEqual([]);
  });

  it('las secciones de un turno son las activas de ese turno', () => {
    expect(seccionesDelTurno(secciones, 'MANANA').map(s => s.id)).toEqual([1]);   // la 3 está inactiva
    expect(seccionesDelTurno(secciones, 'TARDE').map(s => s.id)).toEqual([2]);
  });
});

describe('turnos que se muestran', () => {
  const bloques = [bloque(1, 'MANANA'), bloque(2, 'TARDE')];
  it('los turnos de sus secciones y de sus clases; sin nada, los dos', () => {
    expect(turnosDelDocente(cargaDeAsignaciones([asig(1, 1, 10)], [], secciones, mallas), [], bloques)).toEqual(['MANANA']);
    expect(turnosDelDocente(cargaDeAsignaciones([asig(1, 1, 10), asig(2, 2, 10)], [], secciones, mallas), [], bloques)).toEqual(['MANANA', 'TARDE']);
    expect(turnosDelDocente([], [], bloques)).toEqual(['MANANA', 'TARDE']);
    expect(turnosDelDocente([], [clase(1, 1, 1, 2, 1)], bloques)).toEqual(['TARDE']);
  });
});

describe('lista de docentes con su horario', () => {
  const docentes = [docente(1, 'Zeta'), docente(2, 'Alfa'), docente(3, 'Beta'), docente(4, 'Gamma')];
  const asignaciones = [asig(1, 1, 10, 1), asig(2, 1, 11, 2), asig(3, 2, 10, 3)];
  const clases = [clase(1, 1, 1, 1, 1), clase(2, 1, 1, 2, 1), clase(3, 1, 1, 3, 1), clase(4, 2, 1, 1, 2)];

  it('cuenta horas que le tocan y horas puestas, y da su estado', () => {
    const r = resumenDocentes(docentes, asignaciones, clases, secciones, mallas);
    const de = (id: number) => r.find(x => x.docente.id === id)!;
    expect(de(1)).toMatchObject({ requeridas: 3, programadas: 3, estado: 'completo', asignaciones: 1 });
    expect(de(2)).toMatchObject({ requeridas: 2, programadas: 1, estado: 'incompleto' });
    expect(de(3)).toMatchObject({ requeridas: 5, programadas: 0, estado: 'sin-horario' });
    expect(de(4)).toMatchObject({ requeridas: 0, programadas: 0, estado: 'sin-asignaciones', asignaciones: 0 });
  });

  it('primero a quien le falta programar; luego los completos y los sin cursos', () => {
    expect(resumenDocentes(docentes, asignaciones, clases, secciones, mallas).map(x => x.docente.id)).toEqual([3, 2, 1, 4]);
  });

  it('la clave de un rectángulo junta bloque y día', () => {
    expect(claveCelda(7, 3)).toBe('7|3');
  });
});
