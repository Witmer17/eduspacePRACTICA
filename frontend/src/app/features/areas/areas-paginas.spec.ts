import { Contrato } from '../../core/models/rrhh.model';
import { ResumenPersona } from '../personal/asistencia-personal';
import { HUBS } from '../../layout/hubs';
import { ACCESOS, FUNCIONES, PAGINAS_PROPIAS, accesosDe, alertasDe, funcionesDe, kpisDeArea, paginaPropiaDe, rutaDelArea } from './areas-paginas';

const contrato = (estadoEfectivo: Contrato['estadoEfectivo']): Contrato =>
  ({ id: 1, personalId: 1, personalNombre: 'X', tipo: 'PLAZO_FIJO', fechaInicio: '2026-01-01', remuneracion: 1000, estado: 'VIGENTE', estadoEfectivo });
const resumen = (id: number, p: number, t: number, f: number): ResumenPersona =>
  ({ personalId: id, presentes: p, tardanzas: t, faltas: f, justificadas: 0, permisos: 0, marcados: p + t + f, porcentaje: null });

describe('páginas de las áreas', () => {
  it('las áreas que ya tienen su sección llevan ahí; las demás, a su página genérica', () => {
    const admin = ['ADMIN'];
    expect(rutaDelArea('TESORERIA', admin)).toBe('/finanzas');
    expect(rutaDelArea('SECRETARIA', admin)).toBe('/matriculas');
    expect(rutaDelArea('DOCENCIA', admin)).toBe('/planificacion/cursos-docentes');
    expect(rutaDelArea('AUXILIARES', admin)).toBe('/areas/AUXILIARES');
    expect(rutaDelArea('PSICOLOGIA', admin)).toBe('/areas/PSICOLOGIA');
    expect(rutaDelArea('ADMISION', admin)).toBe('/areas/ADMISION');
    expect(rutaDelArea('SEGURIDAD', admin)).toBe('/areas/SEGURIDAD');
  });

  it('una área nueva (sin sección propia) tiene página genérica, con el código bien escapado', () => {
    expect(rutaDelArea('DEPORTES', ['ADMIN'])).toBe('/areas/DEPORTES');
    expect(rutaDelArea('A_B', ['ADMIN'])).toBe('/areas/A_B');
  });

  it('si la sección propia es solo del administrador, la secretaría usa la página genérica', () => {
    expect(paginaPropiaDe('ADMINISTRACION', ['ADMIN'])?.ruta).toBe('/personal/pagos');
    expect(paginaPropiaDe('ADMINISTRACION', ['SECRETARIA'])).toBeUndefined();
    expect(rutaDelArea('ADMINISTRACION', ['SECRETARIA'])).toBe('/areas/ADMINISTRACION');
    expect(rutaDelArea('TESORERIA', ['SECRETARIA'])).toBe('/finanzas');
  });

  it('el código se reconoce sin importar mayúsculas', () => {
    expect(paginaPropiaDe('tesoreria', ['ADMIN'])?.etiqueta).toBe('Finanzas');
    expect(funcionesDe('psicologia').length).toBeGreaterThan(0);
  });

  it('cada área con página genérica tiene sus funciones y sus accesos', () => {
    for (const codigo of ['DIRECCION', 'AUXILIARES', 'PSICOLOGIA', 'ADMISION', 'TI', 'BIBLIOTECA', 'SALUD', 'SEGURIDAD', 'MANTENIMIENTO']) {
      expect(FUNCIONES[codigo]?.length, 'funciones de ' + codigo).toBeGreaterThan(0);
      expect(ACCESOS[codigo]?.length, 'accesos de ' + codigo).toBeGreaterThan(0);
    }
  });

  it('los accesos se filtran por rol', () => {
    expect(accesosDe('TI', ['SECRETARIA']).map(a => a.ruta)).toEqual(['/alumnos/importar']);       // cuentas y usuarios son del administrador
    expect(accesosDe('TI', ['ADMIN']).map(a => a.ruta)).toEqual(['/cuentas', '/usuarios', '/alumnos/importar']);
    expect(accesosDe('DEPORTES', ['ADMIN'])).toEqual([]);                                          // un área nueva no tiene accesos definidos
  });

  it('todo acceso apunta a una pantalla que existe y que su rol puede abrir', () => {
    const rutasDeHubs = HUBS.flatMap(h => h.pestanas.map(p => ({ ruta: p.ruta, roles: p.roles })));
    const sueltas = new Set(['/inicio', '/calendario', '/admision']);   // fuera de los espacios de trabajo: panel del administrador, calendario y sitio público
    for (const [codigo, lista] of Object.entries(ACCESOS)) {
      for (const a of lista) {
        if (sueltas.has(a.ruta)) continue;
        const destino = rutasDeHubs.find(r => r.ruta === a.ruta);
        expect(destino, `${codigo}: ${a.ruta} no existe en los espacios de trabajo`).toBeDefined();
        expect(a.roles.every(r => destino!.roles.includes(r)), `${codigo}: ${a.ruta} lo ofrece a quien no puede abrirlo`).toBe(true);
      }
    }
  });

  it('las secciones propias existen y las puede abrir quien se indica', () => {
    const rutasDeHubs = HUBS.flatMap(h => h.pestanas.map(p => ({ ruta: p.ruta, roles: p.roles })));
    for (const [codigo, p] of Object.entries(PAGINAS_PROPIAS)) {
      const d = rutasDeHubs.find(r => r.ruta === p.ruta);
      expect(d, `${codigo}: ${p.ruta}`).toBeDefined();
      expect(p.roles.every(r => d!.roles.includes(r)), `${codigo} promete ${p.ruta} a quien no puede abrirlo`).toBe(true);
    }
  });
});

describe('números de la página de un área', () => {
  const personal = [{ id: 1, usuarioId: 10 }, { id: 2, usuarioId: null }, { id: 3, usuarioId: 12 }];
  const contratos: Record<number, Contrato | undefined> = { 1: contrato('VIGENTE'), 2: contrato('POR_VENCER'), 3: undefined };
  const resumenes = new Map([[1, resumen(1, 18, 2, 0)], [2, resumen(2, 15, 0, 5)]]);

  it('calcula personas, asistencia, faltas y alertas', () => {
    const k = kpisDeArea(personal, resumenes, id => contratos[id]);
    expect(k).toMatchObject({ personas: 3, faltas: 5, tardanzas: 2, sinContrato: 1, porVencer: 1, sinCuentaDeAcceso: 1 });
    expect(k.asistencia).toBe(88);   // (18 presentes + 2 tardanzas + 15 presentes) = 35 de 40 días exigibles = 87.5 %, redondeado
  });

  it('sin asistencia registrada no hay porcentaje', () => {
    expect(kpisDeArea(personal, new Map(), () => undefined).asistencia).toBeNull();
    expect(kpisDeArea([], new Map(), () => undefined)).toMatchObject({ personas: 0, asistencia: null, faltas: 0 });
  });

  it('las alertas de una persona dependen de si se pueden ver los contratos', () => {
    expect(alertasDe(contrato('VIGENTE'), true, true)).toEqual([]);
    expect(alertasDe(contrato('POR_VENCER'), true, true)).toEqual(['Contrato por vencer']);
    expect(alertasDe(undefined, false, true)).toEqual(['Sin contrato vigente', 'Sin cuenta de acceso']);
    expect(alertasDe(undefined, false, false)).toEqual(['Sin cuenta de acceso']);   // la secretaría no ve contratos: no se los inventa
    expect(alertasDe(contrato('VENCIDO'), true, true)).toEqual(['Sin contrato vigente']);
  });
});
