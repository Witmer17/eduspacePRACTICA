import { Anio, Area, Aula, Bloque, Colegio, Curso, Grado, GradoOferta, MallaGrado, Periodo, Seccion } from '../../../core/models/planificacion.model';
import { DatosConfig, avance, evaluarConfiguracion } from './estado-configuracion';

const grado = (id: number, nombre = 'G' + id): Grado => ({ id, nivelId: 1, nivelNombre: 'Primaria', numero: id, nombre, activo: true });
const malla = (g: Grado, n: number): MallaGrado => ({ gradoId: g.id, gradoNombre: g.nombre, totalHoras: n * 2, cursos: Array.from({ length: n }, (_, i) => ({ id: i + 1, cursoId: i + 1, cursoCodigo: 'C', cursoNombre: 'C' + i, horasSemanales: 2 })) });
const seccion = (id: number, g: Grado, extra: Partial<Seccion> = {}): Seccion => ({ id, anioId: 1, anioNombre: '2026', gradoId: g.id, gradoNombre: g.nombre, nivelId: 1, nombre: 'A', turno: 'MANANA', capacidad: 25, activo: true, ...extra });
const bloque = (id: number, turno: 'MANANA' | 'TARDE', receso = false): Bloque => ({ id, turno, orden: id, horaInicio: '08:00', horaFin: '08:45', esReceso: receso });
const anio = (estado: Anio['estado']): Anio => ({ id: 1, nombre: '2026', fechaInicio: '2026-03-02', fechaFin: '2026-12-18', estado });
const area = (codigo: string, activo = true): Area => ({ id: codigo.length, codigo, nombre: codigo, activo });
const oferta = (seleccionado: boolean): GradoOferta => ({ gradoId: 1, nivelCodigo: 'PRIMARIA', nivelNombre: 'Primaria', numero: 1, nombre: '1° de Primaria', seleccionado, enUso: false });
const colegio = (extra: Partial<Colegio> = {}): Colegio => ({ nombre: 'Colegio X', gestion: 'PRIVADA', ...extra });

const g1 = grado(1);
const completo = (): DatosConfig => ({
  colegio: colegio({ codigoModular: '0123456', direccion: 'Av. Lima 123' }), oferta: [oferta(true)], anios: [anio('ACTIVO')],
  periodos: [{ id: 1 } as Periodo], feriados: 3, aulas: [{ id: 1, activo: true } as Aula], cursos: [{ id: 1, activo: true } as Curso],
  grados: [g1], mallas: { 1: malla(g1, 3) }, secciones: [seccion(1, g1)], bloques: [bloque(1, 'MANANA'), bloque(2, 'MANANA', true)],
  areas: [area('DOCENCIA'), area('DIRECCION')], personal: 5, conceptos: 2, tarifas: 4, campanias: [{ estado: 'ABIERTA' } as never]
});
const estado = (d: DatosConfig, id: string) => evaluarConfiguracion(d).find(i => i.id === id)!;

describe('estado de la configuración del colegio', () => {
  it('un colegio completo tiene todo listo', () => {
    const items = evaluarConfiguracion(completo());
    expect(items.filter(i => i.estado !== 'ok').map(i => i.id)).toEqual([]);
    expect(avance(items)).toEqual({ listos: items.length, total: items.length, porcentaje: 100 });
  });

  it('un colegio sin nada avisa de lo que falta, en orden', () => {
    const vacio: DatosConfig = {
      colegio: colegio(), oferta: [oferta(false)], anios: [], periodos: [], feriados: 0, aulas: [], cursos: [], grados: [], mallas: {},
      secciones: [], bloques: [], areas: [], personal: 0, conceptos: 0, tarifas: 0, campanias: []
    };
    const items = evaluarConfiguracion(vacio);
    expect(estado(vacio, 'colegio').estado).toBe('pendiente');
    expect(estado(vacio, 'colegio').detalle).toContain('código modular');
    expect(estado(vacio, 'anio').detalle).toContain('Crea el año');
    expect(estado(vacio, 'periodos').detalle).toContain('activa un año');
    expect(estado(vacio, 'feriados').estado).toBe('opcional');
    expect(items.filter(i => i.estado === 'pendiente').length).toBeGreaterThanOrEqual(10);
    expect(avance(items).porcentaje).toBe(0);
  });

  it('un año creado pero no activo es pendiente y lo dice', () => {
    const d = completo();
    d.anios = [anio('PLANIFICADO')];
    expect(estado(d, 'anio')).toMatchObject({ estado: 'pendiente', detalle: expect.stringContaining('ninguno activo') });
  });

  it('la malla y las secciones se cuentan por grado: falta uno y queda pendiente', () => {
    const d = completo();
    const g2 = grado(2);
    d.grados = [g1, g2];
    d.mallas = { 1: malla(g1, 3), 2: malla(g2, 0) };
    d.secciones = [seccion(1, g1)];
    expect(estado(d, 'malla')).toMatchObject({ estado: 'pendiente', detalle: '1 de 2 grados con cursos' });
    expect(estado(d, 'secciones')).toMatchObject({ estado: 'pendiente', detalle: '1 de 2 grados con sección' });
  });

  it('un turno usado por una sección debe tener bloques de clase (los recreos no cuentan)', () => {
    const d = completo();
    d.secciones = [seccion(1, g1, { turno: 'TARDE' })];
    d.bloques = [bloque(1, 'MANANA'), bloque(2, 'TARDE', true)];
    expect(estado(d, 'bloques')).toMatchObject({ estado: 'pendiente', detalle: 'Falta el turno tarde.' });
  });

  it('sin el área Docencia activa las áreas quedan pendientes', () => {
    const d = completo();
    d.areas = [area('DOCENCIA', false), area('DIRECCION')];
    expect(estado(d, 'areas').estado).toBe('pendiente');
  });

  it('lo que no se pudo consultar no cuenta para el avance y no se da por pendiente', () => {
    const d = completo();
    d.tarifas = null;
    d.conceptos = null;
    d.campanias = null;
    const items = evaluarConfiguracion(d);
    expect(estado(d, 'tarifas').estado).toBe('sin-datos');
    expect(avance(items).porcentaje).toBe(100);
    expect(avance(items).total).toBe(items.length - 2); // tarifas y campaña no se pudieron consultar
  });

  it('los pasos opcionales no cuentan para el avance', () => {
    const d = completo();
    d.feriados = 0;
    const items = evaluarConfiguracion(d);
    expect(estado(d, 'feriados').estado).toBe('opcional');
    expect(avance(items).porcentaje).toBe(100);
  });
});
