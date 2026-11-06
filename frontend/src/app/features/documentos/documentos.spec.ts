import { describe, expect, it } from 'vitest';
import { Alumno } from '../../core/models/alumno.model';
import { EstadoCuenta } from '../../core/models/cobro.model';
import { Matricula } from '../../core/models/matricula.model';
import { Colegio, Seccion } from '../../core/models/planificacion.model';
import { DatosDocumento, NOMBRE_REQUERIDO, armar, armarRequerido, disponibilidad, fechaCorta, fechaLarga, matriculaVigente } from './documentos';

const alumno = (extra: Partial<Alumno> = {}): Alumno => ({
  id: 7, codigo: 'AL2026-00007', tipoDocumento: 'DNI', numeroDocumento: '71234567', nombres: 'Lucía', apellidoPaterno: 'Quispe', apellidoMaterno: 'Rojas',
  nombreCompleto: 'Quispe Rojas, Lucía', fechaNacimiento: '2015-04-09', sexo: 'F', estado: 'ACTIVO',
  apoderados: [{ id: 1, apoderado: { id: 3, numeroDocumento: '40111222', nombres: 'Rosa', apellidos: 'Rojas Vega', telefono: '987654321', email: 'rosa@correo.pe' }, parentesco: 'MADRE', esPrincipal: true, esResponsablePago: true, viveConAlumno: true, puedeRecoger: true }],
  ...extra
});
const mat = (extra: Partial<Matricula> = {}): Matricula => ({ id: 1, codigo: 'MAT-2026-0001', alumnoId: 7, alumnoNombre: 'Quispe Rojas, Lucía', anioId: 5, nivelId: 2, gradoId: 3, seccionId: 10, tipo: 'NUEVA', estado: 'MATRICULADO', creadoEn: '2026-03-01T10:00:00', ...extra });
const seccion: Seccion = { id: 10, anioId: 5, anioNombre: '2026', gradoId: 3, gradoNombre: '3° de Primaria', nivelId: 2, nombre: 'A', turno: 'MANANA', capacidad: 30, activo: true };
const colegio = { nombre: 'Colegio Horizonte del Valle', codigoModular: '0123456', ugel: 'UGEL 03', gestion: 'PRIVADA', director: 'Mg. Ana Torres', distrito: 'Miraflores' } as Colegio;
const cuenta = (vencido: number): EstadoCuenta => ({ alumnoId: 7, alumnoNombre: 'x', responsableNombre: 'Rosa Rojas', totalCobrado: 350, totalPendiente: 1000, totalVencido: vencido, credito: 40, cuotas: [] });
const datos = (extra: Partial<DatosDocumento> = {}): DatosDocumento => ({ colegio, alumno: alumno(), matriculas: [mat()], secciones: [seccion], cuenta: cuenta(0), fecha: new Date(2026, 10, 4), ...extra });

describe('generador de documentos', () => {
  it('escribe las fechas en español', () => {
    expect(fechaLarga(new Date(2026, 10, 4))).toBe('4 de noviembre de 2026');
    expect(fechaLarga(new Date(2026, 8, 1))).toBe('1 de setiembre de 2026');
    expect(fechaCorta('2015-04-09')).toBe('09/04/2015');
    expect(fechaCorta('2026-11-04T10:00:00')).toBe('04/11/2026');
    expect(fechaCorta(undefined)).toBe('—');
  });

  it('la matrícula vigente es la última MATRICULADO del alumno (ignora otras y otros alumnos)', () => {
    const lista = [mat({ id: 1, anioId: 4 }), mat({ id: 2, anioId: 5 }), mat({ id: 3, anioId: 6, estado: 'ANULADO' }), mat({ id: 4, anioId: 9, alumnoId: 99 })];
    expect(matriculaVigente(lista, 7)?.id).toBe(2);
    expect(matriculaVigente([], 7)).toBeNull();
  });

  it('con matrícula y sin deuda se pueden emitir las cinco; sin matrícula no hay constancias de matrícula ni de estudios', () => {
    expect(disponibilidad(datos()).every(x => x.disponible)).toBe(true);
    const sin = disponibilidad(datos({ matriculas: [] }));
    expect(sin.find(x => x.tipo === 'CONSTANCIA_MATRICULA')).toMatchObject({ disponible: false });
    expect(sin.find(x => x.tipo === 'CONSTANCIA_ESTUDIOS')?.motivo).toMatch(/matrícula vigente/);
    expect(sin.find(x => x.tipo === 'FICHA_ALUMNO')?.disponible).toBe(true);
  });

  it('la constancia de no adeudo se niega con deuda vencida y dice cuánto; sin leer la cuenta tampoco', () => {
    const conDeuda = disponibilidad(datos({ cuenta: cuenta(250) })).find(x => x.tipo === 'CONSTANCIA_NO_ADEUDO')!;
    expect(conDeuda.disponible).toBe(false);
    expect(conDeuda.motivo).toMatch(/S\/ 250\.00 vencido/);
    const sinCuenta = disponibilidad(datos({ cuenta: null }));
    expect(sinCuenta.find(x => x.tipo === 'CONSTANCIA_NO_ADEUDO')?.disponible).toBe(false);
    expect(sinCuenta.find(x => x.tipo === 'ESTADO_CUENTA')?.disponible).toBe(false);
  });

  it('un alumno retirado no recibe constancia de estudios', () => {
    const r = disponibilidad(datos({ alumno: alumno({ estado: 'RETIRADO' }) }));
    expect(r.find(x => x.tipo === 'CONSTANCIA_ESTUDIOS')).toMatchObject({ disponible: false });
    expect(r.find(x => x.tipo === 'CONSTANCIA_ESTUDIOS')?.motivo).toMatch(/retirado/);
  });

  it('la constancia de matrícula cita al alumno, su grado, sección, turno y año, y la firma el director', () => {
    const d = armar('CONSTANCIA_MATRICULA', datos());
    expect(d.numero).toBe('CM-2026-AL2026-00007');
    expect(d.firma).toEqual({ nombre: 'Mg. Ana Torres', cargo: 'Director(a)' });
    expect(d.lugarYFecha).toBe('Miraflores, 4 de noviembre de 2026');
    const texto = d.bloques.map(b => ('texto' in b ? b.texto : '')).join(' ');
    expect(texto).toContain('«Colegio Horizonte del Valle»');
    expect(texto).toContain('código modular 0123456');
    expect(texto).toContain('de la UGEL 03');
    expect(texto).toContain('la alumna Quispe Rojas, Lucía (DNI 71234567)');
    expect(texto).toContain('MATRICULADA en 3° de Primaria, sección «A», turno mañana, del año escolar 2026');
    expect(texto).toContain('matrícula N.º MAT-2026-0001');
  });

  it('usa «alumno» y «MATRICULADO» para un varón, y funciona sin los datos del colegio', () => {
    const d = armar('CONSTANCIA_MATRICULA', datos({ alumno: alumno({ sexo: 'M' }), colegio: null }));
    const texto = d.bloques.map(b => ('texto' in b ? b.texto : '')).join(' ');
    expect(texto).toContain('el alumno');
    expect(texto).toContain('MATRICULADO');
    expect(texto).toContain('La Dirección del colegio');
    expect(d.firma).toEqual({ nombre: 'Director(a)', cargo: 'Dirección' });
    expect(d.lugarYFecha).toBe('4 de noviembre de 2026');
  });

  it('la ficha trae los datos del alumno y la tabla de apoderados', () => {
    const d = armar('FICHA_ALUMNO', datos());
    const tabla = d.bloques.find(b => b.k === 'tabla');
    expect(tabla && tabla.k === 'tabla' && tabla.filas[0]).toEqual(['Rojas Vega, Rosa', 'madre', 'DNI 40111222', '987654321', 'rosa@correo.pe', 'principal, responsable de pago']);
    const datosBloque = d.bloques.find(b => b.k === 'datos');
    expect(datosBloque && datosBloque.k === 'datos' && datosBloque.filas.find(f => f[0] === 'Fecha de nacimiento')?.[1]).toBe('09/04/2015');
  });

  it('el estado de cuenta resume cobrado, pendiente, vencido y crédito', () => {
    const d = armar('ESTADO_CUENTA', datos({ cuenta: cuenta(120) }));
    const resumen = d.bloques.filter(b => b.k === 'datos')[1];
    expect(resumen.k === 'datos' && resumen.filas).toEqual([['Total cobrado', 'S/ 350.00'], ['Pendiente', 'S/ 1000.00'], ['Vencido', 'S/ 120.00'], ['Crédito a favor', 'S/ 40.00']]);
  });

  describe('documentos requeridos del expediente', () => {
    const texto = (d: ReturnType<typeof armarRequerido>): string => d.bloques.map(b => ('texto' in b ? b.texto : 'filas' in b ? b.filas.map(f => (Array.isArray(f) ? f.join(' ') : f)).join(' ') : '')).join(' ');

    it('la ficha de identidad trae los datos del documento y avisa que no reemplaza al original', () => {
      const d = armarRequerido('DNI', datos());
      expect(d.titulo).toBe(NOMBRE_REQUERIDO.DNI);
      expect(d.numero).toBe('ID-2026-AL2026-00007');
      const t = texto(d);
      expect(t).toContain('DNI 71234567');
      expect(t).toContain('Quispe');
      expect(t).toContain('Rojas');
      expect(t).toContain('09/04/2015');
      expect(t).toContain('Femenino');
      expect(t).toContain('No reemplaza al documento original');
    });

    it('la partida de nacimiento escribe la fecha larga y lista a los padres registrados', () => {
      const d = armarRequerido('PARTIDA_NACIMIENTO', datos());
      expect(d.numero).toBe('PN-2026-AL2026-00007');
      const t = texto(d);
      expect(t).toContain('9 de abril de 2015');
      expect(t).toContain('Lucía Quispe Rojas');
      const tabla = d.bloques.find(b => b.k === 'tabla');
      expect(tabla && tabla.k === 'tabla' && tabla.filas[0]).toEqual(['Rojas Vega, Rosa', 'Madre', 'DNI 40111222']);
    });

    it('la ficha SIAGIE trae contacto, matrícula vigente y apoderados; lo que falta sale como «—», sin inventar nada', () => {
      const completa = armarRequerido('FICHA_SIAGIE', datos());
      const t = texto(completa);
      expect(completa.numero).toBe('SG-2026-AL2026-00007');
      expect(t).toContain('MAT-2026-0001 · 3° de Primaria «A», 2026');
      const sinDatos = armarRequerido('FICHA_SIAGIE', datos({ matriculas: [], alumno: alumno({ apoderados: [] }) }));
      const t2 = texto(sinDatos);
      expect(t2).toContain('Sin matrícula vigente');
      expect(t2).toContain('Dirección —');
      expect(t2).toContain('Correo —');
      const tabla = sinDatos.bloques.find(b => b.k === 'tabla');
      expect(tabla && tabla.k === 'tabla' && tabla.filas).toEqual([]);
    });

    it('con carné de extranjería o pasaporte lo dice con su nombre', () => {
      expect(texto(armarRequerido('DNI', datos({ alumno: alumno({ tipoDocumento: 'CE' }) })))).toContain('Carné de extranjería 71234567');
      expect(texto(armarRequerido('DNI', datos({ alumno: alumno({ tipoDocumento: 'PASAPORTE' }) })))).toContain('Pasaporte 71234567');
    });
  });
});
