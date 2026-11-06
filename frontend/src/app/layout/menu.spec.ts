import { Route } from '@angular/router';
import { routes } from '../app.routes';
import { rutaInicial } from '../core/utils/landing';
import { NAV_AULA, usaBarraAula } from './aula-nav';
import { HUBS, SIN_MENU_VERTICAL, hubDe } from './hubs';
import { ATAJOS_SECRETARIA } from '../features/secretaria/atajos-secretaria';
import { HUBS_CAJA, MENU, usaBarraPersonal } from './menu';

/** Rutas hijas del shell con su regla de roles (`data.roles`); sin regla = cualquier usuario con sesión. */
function rutasDelShell(): Map<string, string[] | undefined> {
  // El shell del portal es el que exige sesión (el otro grupo con hijos es el sitio público).
  const shell = routes.find(r => r.children && r.canActivate) as Route;
  const mapa = new Map<string, string[] | undefined>();
  for (const r of shell.children ?? []) {
    if (r.path) mapa.set('/' + r.path, r.data?.['roles'] as string[] | undefined);
  }
  return mapa;
}

const COMUNES = ['/notificaciones', '/calendario', '/ayuda', '/mi-perfil'];
const ROLES = ['ADMIN', 'SECRETARIA', 'DOCENTE', 'APODERADO', 'ALUMNO', 'CAJERO'];
const itemsDe = (rol: string) => MENU.flatMap(g => g.items).filter(i => i.roles.includes(rol));

describe('menú y rutas', () => {
  it('todo ítem del menú apunta a una ruta que existe', () => {
    const rutas = rutasDelShell();
    const muertos = MENU.flatMap(g => g.items).filter(i => !rutas.has(i.ruta)).map(i => i.ruta);
    expect(muertos).toEqual([]);
  });

  it('un rol solo ve ítems cuya ruta también lo deja entrar (el menú nunca muestra un enlace que el guard rechaza)', () => {
    const rutas = rutasDelShell();
    const incoherentes: string[] = [];
    for (const item of MENU.flatMap(g => g.items)) {
      const permitidos = rutas.get(item.ruta);
      if (!permitidos) continue; // ruta sin restricción de rol
      for (const rol of item.roles) {
        if (!permitidos.includes(rol)) incoherentes.push(`${rol} ve "${item.etiqueta}" pero ${item.ruta} no lo admite`);
      }
    }
    expect(incoherentes).toEqual([]);
  });

  it('el docente no ve nada de administración, ni la familia lo del personal', () => {
    const rutasDocente = itemsDe('DOCENTE').map(i => i.ruta);
    expect(rutasDocente.some(r => r.startsWith('/usuarios') || r.startsWith('/pagos') || r.startsWith('/matriculas') || r.startsWith('/alumnos'))).toBe(false);
    const rutasFamilia = itemsDe('ALUMNO').map(i => i.ruta);
    expect(rutasFamilia.every(r => r.startsWith('/familia') || COMUNES.includes(r))).toBe(true);
    expect(itemsDe('ALUMNO').some(i => i.ruta === '/familia/pagos')).toBe(false); // pagar es del apoderado
    expect(itemsDe('APODERADO').some(i => i.ruta === '/familia/pagos')).toBe(true);
  });

  it('cada rol tiene su pantalla de inicio y esa pantalla es una ruta permitida para él', () => {
    const rutas = rutasDelShell();
    for (const rol of ROLES) {
      const inicio = rutaInicial([rol]);
      const permitidos = rutas.get(inicio);
      expect(rutas.has(inicio) || inicio === '/notificaciones', `${rol} → ${inicio}`).toBe(true);
      if (permitidos) expect(permitidos.includes(rol), `${rol} no puede entrar a su inicio ${inicio}`).toBe(true);
    }
  });

  it('las pantallas comunes (calendario, ayuda, perfil) las ve todo rol y no piden rol en la ruta', () => {
    const rutas = rutasDelShell();
    for (const r of COMUNES) {
      expect(rutas.has(r), r).toBe(true);
      expect(rutas.get(r), `${r} no debe restringir por rol`).toBeUndefined();
      for (const rol of ROLES) expect(itemsDe(rol).some(i => i.ruta === r), `${rol} debería ver ${r}`).toBe(true);
    }
  });

  it('el sitio público no exige sesión y el portal sí', () => {
    const publico = routes.find(r => r.children && !r.canActivate) as Route;
    const hijas = (publico.children ?? []).map(r => '/' + r.path);
    for (const p of ['/', '/nosotros', '/niveles', '/admision', '/noticias', '/contacto']) expect(hijas, p).toContain(p === '/' ? '/' : p);
  });

  it('el ADMIN gana prioridad cuando tiene varios roles', () => {
    expect(rutaInicial(['DOCENTE', 'ADMIN'])).toBe('/inicio');
    expect(rutaInicial(['APODERADO', 'DOCENTE'])).toBe('/docente/inicio');
  });
});

describe('espacios de trabajo (hubs)', () => {
  const rutas = rutasDelShell();

  it('toda pestaña apunta a una ruta que existe y que su rol puede abrir', () => {
    const problemas: string[] = [];
    for (const h of HUBS) {
      for (const p of h.pestanas) {
        if (!rutas.has(p.ruta)) problemas.push(`${h.id}: ${p.ruta} no existe`);
        const permitidos = rutas.get(p.ruta);
        if (permitidos) for (const r of p.roles) if (!permitidos.includes(r)) problemas.push(`${h.id}: ${r} ve «${p.etiqueta}» pero la ruta no lo admite`);
      }
    }
    expect(problemas).toEqual([]);
  });

  it('ninguna ruta está en dos espacios y la primera pestaña la ve todo rol del hub', () => {
    const vistas = HUBS.flatMap(h => h.pestanas.map(p => p.ruta));
    expect(vistas.filter((r, i) => vistas.indexOf(r) !== i)).toEqual([]);
    for (const h of HUBS) {
      const entrada = MENU.flatMap(g => g.items).find(i => i.hub === h.id)!;
      expect(entrada, h.id).toBeDefined();
      for (const rol of entrada.roles) expect(h.pestanas[0].roles.includes(rol), `${rol} no puede abrir la primera pestaña de ${h.id}`).toBe(true);
    }
  });

  it('una URL se asigna a la pestaña más específica y los detalles caen en su pestaña', () => {
    expect(hubDe('/alumnos/importar')?.pestana.etiqueta).toBe('Importar alumnos');
    expect(hubDe('/alumnos/12')?.pestana.etiqueta).toBe('Alumnos');
    expect(hubDe('/matriculas?nueva=1')?.pestana.etiqueta).toBe('Matrículas');
    expect(hubDe('/matriculas/cupos')?.pestana.etiqueta).toBe('Cupos');
    expect(hubDe('/planificacion/aulas-disponibles')?.hub.id).toBe('horarios');
    expect(hubDe('/configuracion/estructura')?.hub.id).toBe('configuracion');
    expect(hubDe('/configuracion')?.pestana.etiqueta).toBe('Resumen');
    expect(hubDe('/configuracion/grados')?.pestana.etiqueta).toBe('Niveles y grados'); // gana la ruta más específica sobre «/configuracion»
    expect(hubDe('/matriculas/campanias')?.hub.id).toBe('apertura');
    expect(hubDe('/planificacion/anios')?.hub.id).toBe('apertura');
    expect(hubDe('/apertura')?.pestana.etiqueta).toBe('Pasos de la apertura');
    expect(hubDe('/planificacion/aulas')).toBeNull(); // el catálogo de aulas ahora se administra dentro de la estructura académica
    expect(hubDe('/planificacion/panel')?.hub.id).toBe('aulas');
    expect(hubDe('/inicio')).toBeNull();
  });

  it('toda opción del menú vertical lleva su ícono', () => {
    const sinIcono = HUBS.flatMap(h => h.pestanas.filter(p => !p.icono.trim()).map(p => `${h.id}: ${p.etiqueta}`));
    expect(sinIcono).toEqual([]);
  });

  it('el menú del personal queda corto', () => {
    // 17 = 16 de siempre + «Caja → Inicio», que el admin también necesita para entrar a caja
    expect(itemsDe('ADMIN').length).toBeLessThanOrEqual(17);
  });
});

describe('barra horizontal del personal', () => {
  it('la usan ADMIN, SECRETARIA y la caja; quien tiene además otro rol (docente…) mantiene el menú lateral', () => {
    expect(usaBarraPersonal(['ADMIN'])).toBe(true);
    expect(usaBarraPersonal(['SECRETARIA'])).toBe(true);
    expect(usaBarraPersonal(['ADMIN', 'SECRETARIA'])).toBe(true);
    expect(usaBarraPersonal(['ADMIN', 'DOCENTE'])).toBe(false);
    expect(usaBarraPersonal(['CAJERO'])).toBe(true);
    expect(usaBarraPersonal(['DOCENTE'])).toBe(false);
    expect(usaBarraPersonal([])).toBe(false);
  });

  it('nunca coincide con la barra de aula: cada rol tiene una sola barra superior', () => {
    for (const roles of [['ADMIN'], ['SECRETARIA'], ['DOCENTE'], ['ALUMNO'], ['APODERADO'], ['CAJERO']]) {
      expect(usaBarraPersonal(roles) && usaBarraAula(roles), roles.join()).toBe(false);
    }
  });

  it('Inicio y los espacios de trabajo existen en el menú del personal', () => {
    const items = MENU.filter(g => ['General', 'Gestión del colegio', 'Administración'].includes(g.titulo)).flatMap(g => g.items);
    const rutasMenu = items.filter(i => i.roles.includes('ADMIN')).map(i => i.ruta);
    expect(rutasMenu).toContain('/inicio');
    // todos los espacios del personal; «Caja» es del cajero y está en su propio grupo (Ventanilla)
    expect(items.filter(i => i.hub && i.roles.includes('ADMIN')).length).toBe(HUBS.filter(h => !HUBS_CAJA.includes(h.id)).length);
  });
});

describe('Matrícula y secretaría', () => {
  const rutas = rutasDelShell();

  it('«Matrícula» es un espacio con el asistente por pasos, las matrículas, lo que está por aprobar y los cupos', () => {
    const tabs = HUBS.find(h => h.id === 'matricula')!.pestanas;
    expect(tabs.map(p => p.ruta)).toEqual(['/matricula/asistente', '/matriculas', '/matriculas/aprobaciones', '/matriculas/cupos']);
    for (const t of tabs) expect(t.roles, t.ruta).toEqual(['ADMIN', 'SECRETARIA']);
    expect(hubDe('/matricula/asistente')?.pestana.etiqueta).toBe('Asistente de matrícula');
    expect(hubDe('/matriculas?nueva=1')?.hub.id).toBe('matricula');
    expect(hubDe('/matriculas/campanias')?.hub.id).toBe('apertura');
    for (const rol of ['ADMIN', 'SECRETARIA']) expect(itemsDe(rol).map(i => i.hub), rol).toContain('matricula');
    expect(itemsDe('DOCENTE').some(i => i.hub === 'matricula')).toBe(false);
  });

  it('el asistente lo abren la secretaría y el administrador', () => {
    expect(rutas.get('/matricula/asistente')).toEqual(['ADMIN', 'SECRETARIA']);
  });

  it('la secretaría entra por su propio inicio y el administrador, por el panel', () => {
    expect(rutaInicial(['SECRETARIA'])).toBe('/secretaria');
    expect(rutaInicial(['ADMIN'])).toBe('/inicio');
    expect(rutaInicial(['SECRETARIA', 'ADMIN'])).toBe('/inicio');
    expect(rutas.get('/secretaria')).toEqual(['SECRETARIA']);
    expect(itemsDe('SECRETARIA').some(i => i.ruta === '/secretaria')).toBe(true);
    expect(itemsDe('SECRETARIA').some(i => i.ruta === '/inicio')).toBe(false);
    expect(itemsDe('ADMIN').some(i => i.ruta === '/secretaria')).toBe(false);
  });

  it('todos los accesos del inicio de la secretaría existen y ella puede abrirlos', () => {
    const problemas: string[] = [];
    for (const a of ATAJOS_SECRETARIA) {
      if (!rutas.has(a.ruta)) { problemas.push(`${a.etiqueta}: ${a.ruta} no existe`); continue; }
      const permitidos = rutas.get(a.ruta);
      if (permitidos && !permitidos.includes('SECRETARIA')) problemas.push(`${a.etiqueta}: ${a.ruta} no la deja entrar`);
    }
    expect(problemas).toEqual([]);
  });
});

describe('Caja', () => {
  const rutas = rutasDelShell();

  it('tiene la barra horizontal del personal con Inicio, Alumnos y Personal, para el cajero y el admin', () => {
    expect(HUBS_CAJA.map(id => HUBS.find(h => h.id === id)!.titulo)).toEqual(['Inicio', 'Alumnos', 'Personal']);
    expect(HUBS_CAJA.map(id => HUBS.find(h => h.id === id)!.pestanas.map(p => p.ruta))).toEqual([['/caja'], ['/caja/alumnos', '/caja/alumnos/morosos', '/caja/alumnos/cobranza'], ['/caja/personal']]);
    for (const id of HUBS_CAJA) {
      // Solo «Caja → Inicio» es para el admin; las demás pestañas de caja son del cajero
      const roles = [...new Set(HUBS.find(h => h.id === id)!.pestanas.flatMap(p => p.roles))];
      expect(roles, id).toEqual(id === 'caja' ? ['CAJERO', 'ADMIN'] : ['CAJERO']);
      expect(itemsDe('CAJERO').some(i => i.hub === id), id).toBe(true);
      expect(itemsDe('ADMIN').some(i => i.hub === id), id).toBe(id === 'caja');
      for (const rol of ['SECRETARIA', 'DOCENTE', 'APODERADO', 'ALUMNO']) expect(itemsDe(rol).some(i => i.hub === id), `${rol} ${id}`).toBe(false);
    }
  });

  it('cada página de caja solo la abre el cajero', () => {
    for (const r of ['/caja', '/caja/alumnos', '/caja/alumnos/morosos', '/caja/alumnos/cobranza', '/caja/personal']) expect(rutas.get(r), r).toEqual(['CAJERO', 'ADMIN']);
  });

  it('cada página cae en su espacio; solo Alumnos (varias páginas) lleva menú vertical', () => {
    expect(hubDe('/caja')?.hub.id).toBe('caja');
    expect(hubDe('/caja/alumnos')?.pestana.etiqueta).toBe('Cuentas por alumno');
    expect(hubDe('/caja/alumnos/morosos')?.pestana.etiqueta).toBe('Morosos');
    expect(hubDe('/caja/alumnos/cobranza')?.hub.id).toBe('caja-alumnos');
    expect(hubDe('/caja/personal')?.hub.id).toBe('caja-personal');
    expect(SIN_MENU_VERTICAL).toEqual(['caja', 'caja-personal']);
  });

  it('el pago al personal del administrador sigue siendo solo suyo (aprueba lo que caja registra)', () => {
    expect(rutas.get('/personal/pagos')).toEqual(['ADMIN']);
  });
});

describe('Personal y Configuración (barra superior del personal)', () => {
  const rutasHub = (id: string) => HUBS.find(h => h.id === id)!.pestanas.map(p => p.ruta);

  it('Personal reúne las personas, su pago, su asistencia, sus cuentas de acceso y los usuarios con su rol', () => {
    expect(rutasHub('personal')).toEqual(['/personal', '/areas', '/personal/pagos', '/personal/asistencia', '/cuentas', '/usuarios']);
    // las páginas de cada área (/areas y /areas/CODIGO) pertenecen al espacio Personal
    expect(hubDe('/areas/PSICOLOGIA')?.hub.id).toBe('personal');
    expect(hubDe('/areas/PSICOLOGIA')?.pestana.etiqueta).toBe('Páginas de áreas');
    expect(hubDe('/personal/pagos')?.hub.id).toBe('personal');
    expect(hubDe('/personal/pagos')?.pestana.etiqueta).toBe('Pago al personal');
    expect(hubDe('/personal/asistencia')?.pestana.etiqueta).toBe('Asistencia del personal');
  });

  it('el pago al personal es solo del administrador; la asistencia también la ve la secretaría', () => {
    const tabs = HUBS.find(h => h.id === 'personal')!.pestanas;
    expect(tabs.find(p => p.ruta === '/personal/pagos')!.roles).toEqual(['ADMIN']);
    expect(tabs.find(p => p.ruta === '/personal/asistencia')!.roles).toEqual(expect.arrayContaining(['ADMIN', 'SECRETARIA']));
    // La entrada del menú va a la primera pestaña: tiene que poder abrirla quien ve el menú.
    expect(tabs[0].roles).toEqual(expect.arrayContaining(['ADMIN', 'SECRETARIA']));
  });

  it('Configuración reúne todo lo configurable del colegio, en orden y por grupos', () => {
    const tabs = HUBS.find(h => h.id === 'configuracion')!.pestanas;
    expect(tabs.map(p => p.ruta)).toEqual([
      '/configuracion', '/configuracion/colegio', '/configuracion/grados', '/configuracion/cursos', '/configuracion/estructura', '/configuracion/areas', '/configuracion/horarios'
    ]);
    // el resumen abre el espacio y no tiene grupo; el resto sí, y los grupos van seguidos (un grupo no se parte en dos)
    expect(tabs[0].grupo).toBeUndefined();
    const grupos = tabs.slice(1).map(p => p.grupo);
    expect(grupos.every(g => !!g)).toBe(true);
    expect(grupos.filter((g, i) => g !== grupos[i - 1])).toEqual(['El colegio', 'Personal']);
  });

  it('Apertura de periodo reúne lo necesario para abrir un año, en orden y por grupos', () => {
    const tabs = HUBS.find(h => h.id === 'apertura')!.pestanas;
    expect(tabs.map(p => p.ruta)).toEqual([
      '/apertura', '/planificacion/anios', '/planificacion/feriados', '/pagos/conceptos', '/pagos/tarifas', '/pagos/descuentos', '/matriculas/campanias'
    ]);
    expect(tabs[0].grupo).toBeUndefined();
    const grupos = tabs.slice(1).map(p => p.grupo);
    expect(grupos.filter((g, i) => g !== grupos[i - 1])).toEqual(['Calendario', 'Cobros del año', 'Matrícula']);
    // la secretaría ve el calendario y la campaña; los cobros son solo del administrador
    expect(tabs.filter(p => p.roles.includes('SECRETARIA')).map(p => p.ruta)).toEqual(['/apertura', '/planificacion/anios', '/planificacion/feriados', '/matriculas/campanias']);
  });

  it('la barra horizontal del personal muestra Inicio, Personal, Configuración y Apertura de periodo', () => {
    const hubsBarra = ['personal', 'configuracion', 'apertura'].map(id => HUBS.find(h => h.id === id)?.titulo);
    expect(hubsBarra).toEqual(['Personal', 'Configuración', 'Apertura de periodo']);
    expect(MENU.flatMap(g => g.items).some(i => i.hub === 'apertura' && i.roles.includes('SECRETARIA'))).toBe(true);
  });

  it('las campañas y las tarifas ya no están en Alumnos ni en Finanzas', () => {
    const fuera = (id: string) => HUBS.find(h => h.id === id)!.pestanas.map(p => p.ruta);
    expect(fuera('alumnos')).not.toContain('/matriculas/campanias');
    expect(fuera('finanzas')).not.toEqual(expect.arrayContaining(['/pagos/conceptos']));
    expect(fuera('finanzas')).toEqual(['/finanzas', '/pagos/cobranza', '/pagos/morosos']);
  });

  it('Alumnos reúne alumnos, apoderados, matrícula, asistencia, notas y cuentas, por grupos, y está en la barra horizontal', () => {
    const tabs = HUBS.find(h => h.id === 'alumnos')!.pestanas;
    expect(tabs.map(p => p.ruta)).toEqual([
      '/alumnos', '/apoderados', '/alumnos/importar',
      '/asistencia/justificaciones', '/asistencia/reporte', '/calificaciones/boletines', '/pagos/cuentas', '/documentos'
    ]);
    const grupos = tabs.map(p => p.grupo);
    expect(grupos.filter((g, i) => g !== grupos[i - 1])).toEqual(['Alumnos', 'Asistencia y notas', 'Pagos', 'Documentos']);
    // la entrada va a la lista de alumnos, que abren ADMIN y SECRETARIA
    expect(tabs[0].roles).toEqual(expect.arrayContaining(['ADMIN', 'SECRETARIA']));
    expect(hubDe('/apoderados')?.pestana.etiqueta).toBe('Apoderados');
    expect(hubDe('/documentos')?.hub.id).toBe('alumnos');
    expect(hubDe('/alumnos/12')?.hub.id).toBe('alumnos');
    expect(hubDe('/calificaciones/boletines')?.hub.id).toBe('alumnos');
    expect(hubDe('/calificaciones/cierre')?.hub.id).toBe('seguimiento');
    for (const rol of ['ADMIN', 'SECRETARIA']) expect(itemsDe(rol).map(i => i.hub), rol).toContain('alumnos');
  });

  it('la secretaria ve en Configuración todo menos lo de cobranza (solo del administrador)', () => {
    const visibles = (id: string) => HUBS.find(h => h.id === id)!.pestanas.filter(p => p.roles.includes('SECRETARIA')).map(p => p.ruta);
    expect(visibles('personal')).toEqual(['/personal', '/areas', '/personal/asistencia']);
    expect(visibles('configuracion')).toHaveLength(7);
    expect(visibles('apertura')).not.toContain('/pagos/tarifas');
  });

  it('cada pantalla de configuración tiene su ruta y solo la abre el personal', () => {
    const rutas = rutasDelShell();
    for (const r of ['/configuracion', '/configuracion/colegio', '/configuracion/grados', '/configuracion/cursos', '/configuracion/areas', '/configuracion/estructura']) {
      expect(rutas.get(r), r).toEqual(['ADMIN', 'SECRETARIA']);
    }
  });

  it('el detalle de un grado cae en «Estructura académica» y solo esa opción admite hijos en el menú vertical', () => {
    const h = hubDe('/configuracion/estructura/4');
    expect(h?.hub.id).toBe('configuracion');
    expect(h?.pestana.ruta).toBe('/configuracion/estructura');
    const conHijos = HUBS.flatMap(x => x.pestanas).filter(p => p.conHijos).map(p => p.ruta);
    expect(conHijos).toEqual(['/configuracion/estructura']);
  });

  it('el detalle de un grado tiene ruta propia que solo abre el personal', () => {
    const detalle = rutasDelShell();
    expect(detalle.has('/configuracion/estructura/:gradoId')).toBe(true);
    expect(detalle.get('/configuracion/estructura/:gradoId')).toEqual(['ADMIN', 'SECRETARIA']);
  });

  it('ambas entradas están en el menú de ADMIN y de SECRETARIA', () => {
    for (const rol of ['ADMIN', 'SECRETARIA']) {
      const hubs = itemsDe(rol).map(i => i.hub);
      expect(hubs, rol).toContain('personal');
      expect(hubs, rol).toContain('configuracion');
    }
  });
});

describe('barra superior de docentes, alumnos y apoderados', () => {
  const rutas = rutasDelShell();

  it('cada enlace existe y su rol puede abrirlo', () => {
    const problemas: string[] = [];
    for (const e of NAV_AULA) {
      if (!rutas.has(e.ruta)) problemas.push(`${e.ruta} no existe`);
      const permitidos = rutas.get(e.ruta);
      if (permitidos) for (const r of e.roles) if (!permitidos.includes(r)) problemas.push(`${r} ve «${e.etiqueta}» pero ${e.ruta} no lo admite`);
    }
    expect(problemas).toEqual([]);
  });

  it('solo quien tiene únicamente roles de aula usa la barra; el personal y la caja mantienen el menú lateral', () => {
    expect(usaBarraAula(['DOCENTE'])).toBe(true);
    expect(usaBarraAula(['APODERADO', 'ALUMNO'])).toBe(true);
    expect(usaBarraAula(['DOCENTE', 'ADMIN'])).toBe(false);
    expect(usaBarraAula(['SECRETARIA'])).toBe(false);
    expect(usaBarraAula(['CAJERO'])).toBe(false);
    expect(usaBarraAula([])).toBe(false);
  });

  it('«Mi trabajo» (contrato, pagos, asistencia) es del docente y de la caja, no de las familias', () => {
    const enBarra = (rol: string) => NAV_AULA.some(e => e.ruta === '/mi-trabajo' && e.roles.includes(rol));
    expect(enBarra('DOCENTE')).toBe(true);
    expect(enBarra('APODERADO')).toBe(false);
    expect(enBarra('ALUMNO')).toBe(false);
    // la caja y quien tiene docente + otro rol usan el menú lateral: ahí también está
    const lateral = MENU.flatMap(g => g.items).find(i => i.ruta === '/mi-trabajo');
    expect(lateral?.roles).toEqual(expect.arrayContaining(['DOCENTE', 'CAJERO']));
    expect(lateral?.roles).not.toContain('APODERADO');
  });

  it('las páginas de un curso mantienen resaltado «Mis cursos»', () => {
    const mis = (rol: string) => NAV_AULA.find(e => e.roles.includes(rol) && e.etiqueta === 'Mis cursos')!;
    expect(mis('DOCENTE').prefijos).toContain('/docente/curso');
    expect(mis('ALUMNO').prefijos).toContain('/familia/curso');
  });
});
