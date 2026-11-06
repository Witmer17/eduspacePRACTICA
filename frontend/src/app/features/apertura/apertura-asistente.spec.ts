import { Asignacion, Docente, Grado, MallaGrado, Seccion } from '../../core/models/planificacion.model';
import {
  cursosPendientes, evaluarListo, feriadosFijosDelAnio, filasDeSecciones, nombresDeSecciones, opcionesDeSecciones, proponerCampania, seleccionInicial, siguienteLetra,
  sugerirDocentes, sumarDias, tarifasFaltantes
} from './apertura-asistente';

const grado = (id: number, nivelId: number, numero: number): Grado => ({ id, nivelId, nivelNombre: `Nivel ${nivelId}`, numero, nombre: `Grado ${id}`, activo: true });
const seccion = (id: number, gradoId: number, nombre = 'A', activo = true, nivelId = 1): Seccion =>
  ({ id, anioId: 1, anioNombre: '2027', gradoId, gradoNombre: `Grado ${gradoId}`, nivelId, nombre, turno: 'MANANA', capacidad: 30, activo });
const malla = (gradoId: number, cursos: [number, string][]): MallaGrado =>
  ({ gradoId, gradoNombre: `Grado ${gradoId}`, totalHoras: 0, cursos: cursos.map(([cursoId, cursoNombre], i) => ({ id: i, cursoId, cursoCodigo: cursoNombre, cursoNombre, horasSemanales: 2 })) });
const asig = (id: number, seccionId: number, cursoId: number, docenteId: number): Asignacion => ({ id, seccionId, seccionNombre: 'A', cursoId, cursoNombre: 'C', docenteId, docenteNombre: 'D' });
const doc = (id: number, cursoIds: number[], estado: Docente['estado'] = 'ACTIVO') => ({ id, cursoIds, estado });

describe('campaña propuesta', () => {
  const anio = { nombre: '2027', fechaInicio: '2027-03-01', fechaFin: '2027-12-17' };
  it('empieza hoy y termina 30 días después del inicio de clases', () => {
    expect(proponerCampania(anio, '2026-11-03')).toEqual({ nombre: 'Matrícula 2027', fechaInicio: '2026-11-03', fechaFin: '2027-03-31' });
  });
  it('si el año ya empezó hace más de 30 días, dura 30 días desde hoy', () => {
    expect(proponerCampania(anio, '2027-05-10')).toEqual({ nombre: 'Matrícula 2027', fechaInicio: '2027-05-10', fechaFin: '2027-06-09' });
  });
  it('nunca pasa del fin del año; si el año ya terminó, usa el inicio del año', () => {
    expect(proponerCampania(anio, '2027-12-10').fechaFin).toBe('2027-12-17');
    const pasado = proponerCampania(anio, '2028-02-01');
    expect(pasado.fechaInicio).toBe('2027-03-01');
    expect(pasado.fechaFin >= pasado.fechaInicio).toBe(true);
  });
  it('suma días entre meses y años', () => {
    expect(sumarDias('2027-12-20', 15)).toBe('2028-01-04');
    expect(sumarDias('2028-02-27', 2)).toBe('2028-02-29');
  });
});

describe('feriados fijos del año', () => {
  it('trae los feriados de fecha fija que caen dentro del año escolar', () => {
    const f = feriadosFijosDelAnio({ fechaInicio: '2027-03-01', fechaFin: '2027-12-17' }, []);
    expect(f.map(x => x.fecha)).toEqual(['2027-05-01', '2027-06-29', '2027-07-28', '2027-07-29', '2027-08-06', '2027-08-30', '2027-10-08', '2027-11-01', '2027-12-08', '2027-12-09']);
    expect(f[0].descripcion).toBe('Día del Trabajo');
  });
  it('deja fuera lo que ya está cargado y lo que cae fuera del año', () => {
    const f = feriadosFijosDelAnio({ fechaInicio: '2027-03-01', fechaFin: '2027-12-17' }, ['2027-05-01', '2027-12-08']);
    expect(f.some(x => x.fecha === '2027-05-01' || x.fecha === '2027-12-08')).toBe(false);
    expect(f.some(x => x.fecha === '2027-12-25' || x.fecha === '2027-01-01')).toBe(false);
  });
  it('un año que cruza de año toma los feriados de los dos', () => {
    const f = feriadosFijosDelAnio({ fechaInicio: '2027-09-01', fechaFin: '2028-02-28' }, []);
    expect(f.map(x => x.fecha)).toContain('2027-12-25');
    expect(f.map(x => x.fecha)).toContain('2028-01-01');
    expect(f.map(x => x.fecha)).not.toContain('2027-08-30');
  });
});

describe('secciones por grado', () => {
  it('nombra A, B, C… y salta las que ya existen', () => {
    expect(nombresDeSecciones(3, [])).toEqual(['A', 'B', 'C']);
    expect(nombresDeSecciones(2, ['A', 'c'])).toEqual(['B', 'D']);
    expect(nombresDeSecciones(0, [])).toEqual([]);
  });
  it('cuenta secciones activas y cursos de cada grado, ordenados por nivel y número', () => {
    const grados = [grado(2, 2, 1), grado(1, 1, 1), grado(3, 2, 2)];
    const filas = filasDeSecciones(grados, [seccion(10, 1), seccion(11, 1, 'B', false), seccion(12, 2)], { 1: malla(1, [[5, 'Arte']]), 2: null });
    expect(filas.map(f => f.grado.id)).toEqual([1, 2, 3]);
    expect(filas[0]).toMatchObject({ cursos: 1 });
    expect(filas[0].activas.map(s => s.id)).toEqual([10]);   // la inactiva no cuenta
    expect(filas[1].activas.length).toBe(1);
    expect(filas[2]).toMatchObject({ cursos: 0, activas: [] });
  });
});

describe('secciones para marcar', () => {
  it('sin nada existente ofrece A, B, C y D para marcar, todas nuevas', () => {
    const o = opcionesDeSecciones([], [], []);
    expect(o.map(x => x.nombre)).toEqual(['A', 'B', 'C', 'D']);
    expect(o.every(x => x.estado === 'nueva' && !x.delAnterior && !x.extra)).toBe(true);
  });

  it('muestra TODAS las que existen en el año: las activas (no se recrean) y las inactivas (se pueden reactivar)', () => {
    const o = opcionesDeSecciones([seccion(1, 4, 'A'), seccion(2, 4, 'B', false), seccion(3, 4, 'F')], [], []);
    expect(o.map(x => [x.nombre, x.estado])).toEqual([['A', 'activa'], ['B', 'inactiva'], ['C', 'nueva'], ['D', 'nueva'], ['F', 'activa']]);
    expect(o.find(x => x.nombre === 'B')!.seccion!.id).toBe(2);
  });

  it('suma las del año anterior (marcadas como tales) y las extras que se agreguen, sin repetir', () => {
    const o = opcionesDeSecciones([seccion(1, 4, 'A')], ['A', 'B', 'E'], ['G', 'e']);
    expect(o.map(x => x.nombre)).toEqual(['A', 'B', 'C', 'D', 'E', 'G']);
    expect(o.find(x => x.nombre === 'B')).toMatchObject({ estado: 'nueva', delAnterior: true });
    expect(o.find(x => x.nombre === 'E')).toMatchObject({ delAnterior: true, extra: true });
    expect(o.find(x => x.nombre === 'A')).toMatchObject({ estado: 'activa', delAnterior: true });
  });

  it('si hay una activa y otra inactiva con el mismo nombre, gana la activa', () => {
    expect(opcionesDeSecciones([seccion(1, 4, 'A', false), seccion(2, 4, 'A', true)], [], []).find(x => x.nombre === 'A')!.estado).toBe('activa');
  });

  it('la próxima letra libre para «+ Otra sección»', () => {
    expect(siguienteLetra([])).toBe('A');
    expect(siguienteLetra(['A', 'b', 'C'])).toBe('D');
    expect(siguienteLetra('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))).toBeNull();
  });

  it('al empezar viene marcada la A, o las del año anterior; un grado que ya tiene secciones activas no marca nada', () => {
    expect(seleccionInicial(opcionesDeSecciones([], [], []))).toEqual(['A']);
    expect(seleccionInicial(opcionesDeSecciones([], ['A', 'B'], []))).toEqual(['A', 'B']);
    expect(seleccionInicial(opcionesDeSecciones([seccion(1, 4, 'A')], ['A', 'B'], []))).toEqual([]);
    expect(seleccionInicial(opcionesDeSecciones([seccion(1, 4, 'A', false)], [], []))).toEqual(['A']);
  });
});

describe('docentes por curso', () => {
  const secs = [seccion(1, 4, 'A'), seccion(2, 4, 'B'), seccion(3, 5, 'A', true, 2)];
  const mallas = { 4: malla(4, [[10, 'Matemática'], [11, 'Arte']]), 5: malla(5, [[10, 'Matemática']]) };

  it('lista los cursos que no tienen docente en alguna sección, con las secciones que faltan', () => {
    const p = cursosPendientes(secs, mallas, [asig(1, 1, 10, 7)]);
    const mat4 = p.find(x => x.clave === '4-10')!;
    expect(mat4.secciones.map(s => s.id)).toEqual([2]);          // la A ya tiene docente, falta la B
    expect(p.find(x => x.clave === '4-11')!.secciones.length).toBe(2);
    expect(p.find(x => x.clave === '5-10')!.secciones.length).toBe(1);
    expect(p.length).toBe(3);
  });

  it('un curso con docente en todas sus secciones ya no aparece; una sección inactiva no cuenta', () => {
    const p = cursosPendientes([...secs, seccion(9, 4, 'C', false)], mallas, [asig(1, 1, 11, 7), asig(2, 2, 11, 7)]);
    expect(p.find(x => x.clave === '4-11')).toBeUndefined();
    expect(p.find(x => x.clave === '4-10')!.secciones.map(s => s.id)).toEqual([1, 2]);
  });

  it('propone entre los aptos al que menos secciones lleva y reparte la carga', () => {
    const p = cursosPendientes(secs, mallas, []);
    const s = sugerirDocentes(p, [doc(1, [10, 11]), doc(2, [10]), doc(3, [], 'ACTIVO'), doc(4, [10], 'INACTIVO')], []);
    expect(s['4-11']).toBe(1);                  // solo el 1 es apto de Arte
    expect(s['4-10']).toBe(2);                  // Matemática: el 2 (libre) antes que el 1 (ya lleva 2 secciones de Arte)
    expect([1, 2]).toContain(s['5-10']);
    expect(Object.values(s)).not.toContain(3);  // sin cursos aptos no se propone
    expect(Object.values(s)).not.toContain(4);  // un docente de baja no se propone
  });

  it('un curso sin ningún apto queda sin propuesta, y se tiene en cuenta lo que el docente ya dicta', () => {
    const p = cursosPendientes(secs, mallas, []);
    const s = sugerirDocentes(p, [doc(1, [10]), doc(2, [10])], [asig(1, 99, 10, 1), asig(2, 98, 10, 1)]);
    expect(s['4-11']).toBeUndefined();
    expect(s['4-10']).toBe(2);                  // el 1 ya dicta 2 clases
  });
});

describe('tarifas que faltan', () => {
  const niveles = new Map([[1, [grado(1, 1, 1)]], [2, [grado(4, 2, 1), grado(5, 2, 2)]]]);
  const t = (nivelId: number, conceptoCodigo: string, gradoId?: number, activo = true) => ({ nivelId, gradoId, conceptoCodigo, activo });

  it('sin tarifas faltan las dos de cada nivel', () => {
    expect(tarifasFaltantes(niveles, [])).toEqual([{ nivelId: 1, faltaMatricula: true, faltaPension: true }, { nivelId: 2, faltaMatricula: true, faltaPension: true }]);
  });
  it('una tarifa de todo el nivel cubre; las desactivadas no cuentan', () => {
    const f = tarifasFaltantes(niveles, [t(1, 'MATRICULA'), t(1, 'PENSION', undefined, false)]);
    expect(f[0]).toEqual({ nivelId: 1, faltaMatricula: false, faltaPension: true });
  });
  it('tarifas por grado cubren el nivel solo si están todos sus grados', () => {
    expect(tarifasFaltantes(niveles, [t(2, 'MATRICULA', 4)])[1].faltaMatricula).toBe(true);
    expect(tarifasFaltantes(niveles, [t(2, 'MATRICULA', 4), t(2, 'MATRICULA', 5)])[1].faltaMatricula).toBe(false);
  });
});

describe('¿ya se puede matricular?', () => {
  const grados = [grado(1, 1, 1), grado(4, 2, 1)];
  const base = {
    anio: { estado: 'ACTIVO' as const }, grados, secciones: [seccion(1, 1)], periodos: 4, pendientesDocente: 0,
    tarifas: [{ nivelId: 1, gradoId: undefined, conceptoCodigo: 'MATRICULA', activo: true }], campanias: [{ estado: 'ABIERTA' as const }]
  };

  it('listo: año activo, campaña abierta y un grado con sección y tarifa de matrícula', () => {
    const r = evaluarListo(base);
    expect(r.puedeMatricular).toBe(true);
    expect(r.gradosListos).toBe(1);
  });
  it('sin año activo, sin campaña abierta o sin grado listo NO se puede', () => {
    expect(evaluarListo({ ...base, anio: { estado: 'PLANIFICADO' } }).puedeMatricular).toBe(false);
    expect(evaluarListo({ ...base, campanias: [{ estado: 'PLANIFICADA' }] }).puedeMatricular).toBe(false);
    expect(evaluarListo({ ...base, campanias: [] }).items.find(i => i.id === 'campania')!.texto).toContain('Falta crear');
    expect(evaluarListo({ ...base, secciones: [] }).puedeMatricular).toBe(false);
    expect(evaluarListo({ ...base, tarifas: [] }).puedeMatricular).toBe(false);
  });
  it('una tarifa de pensión sola no basta, y una sección inactiva no da vacantes', () => {
    expect(evaluarListo({ ...base, tarifas: [{ nivelId: 1, gradoId: undefined, conceptoCodigo: 'PENSION', activo: true }] }).puedeMatricular).toBe(false);
    expect(evaluarListo({ ...base, secciones: [seccion(1, 1, 'A', false)] }).puedeMatricular).toBe(false);
  });
  it('periodos y docentes se avisan pero no impiden matricular', () => {
    const r = evaluarListo({ ...base, periodos: 0, pendientesDocente: 5 });
    expect(r.puedeMatricular).toBe(true);
    expect(r.items.find(i => i.id === 'periodos')).toMatchObject({ ok: false, requerido: false });
    expect(r.items.find(i => i.id === 'docentes')!.texto).toContain('5 cursos sin docente');
  });
});
