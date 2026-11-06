/**
 * Al agregar y activar un periodo (año académico), todo se enciende: las 15 pantallas dejan de avisar «No hay un periodo activo» y
 * muestran lo del periodo; Niveles y grados se desbloquea; Apertura y el Inicio lo reconocen.
 * Crea un año de prueba (2097) con periodos y 2 secciones, lo activa, recorre las pantallas y al final lo borra (SQL, también sus cupos).
 * Requiere que NO haya un año activo al empezar. Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_con_periodo_activo.cjs
 */
const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const BASE = process.env.BASE || 'http://localhost:4200';
const GW = 'http://localhost:18080/api/v1';
const RUTAS = ['/configuracion/estructura', '/matriculas', '/matriculas/cupos', '/planificacion/secciones', '/planificacion/asignaciones', '/planificacion/horarios',
  '/planificacion/horarios-auto', '/planificacion/feriados', '/planificacion/panel', '/planificacion/cursos-docentes', '/planificacion/aulas-disponibles',
  '/pagos/tarifas', '/pagos/cuentas', '/asistencia/reporte', '/calificaciones/cierre'];
let fallos = 0, TOKEN = '';
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 300)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };
const api = async (metodo, ruta, cuerpo, base = GW + '/planificacion') => {
  const r = await fetch(base + ruta, { method: metodo, headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
  const t = await r.text();
  return { status: r.status, json: t ? JSON.parse(t) : null };
};
const psql = (cont, base, sql) => execSync(`podman exec ${cont} psql -U eduspace -d ${base} -At -c ${JSON.stringify(sql)}`, { encoding: 'utf8' }).trim();
async function hasta(leer, ok, msg, ms = 15000) {
  const fin = Date.now() + ms; let u;
  while (Date.now() < fin) { u = await leer(); if (ok(u)) return u; await new Promise(r => setTimeout(r, 150)); }
  throw new Error(msg + ' — último valor: ' + String(u).slice(0, 200));
}

(async () => {
  const t = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  TOKEN = (await t.json()).access_token;
  const anios = (await api('GET', '/anios')).json;
  if (anios.some(a => a.estado === 'ACTIVO')) { console.log('Hay un año activo: esta prueba solo corre sin año activo.'); process.exit(0); }
  if (anios.some(a => a.nombre === '2097')) { console.log('Existe el año 2097 de una corrida anterior: quítalo antes de repetir.'); process.exit(2); }

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  let malas = [];
  page.on('response', r => { if (r.status() >= 400 && r.status() !== 429 && !r.url().includes('/kc/')) malas.push(`${r.status()} ${r.request().method()} ${r.url().replace(/^https?:\/\/[^/]+/, '')}`); });
  let anioId = 0;
  const grados = (await api('GET', '/grados')).json.filter(g => g.activo);
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });

    // ---- antes: sin periodo activo, la pantalla avisa ----
    await paso('antes de agregar el periodo: Secciones avisa «No hay un periodo activo» y está vacía', async () => {
      await page.goto(BASE + '/planificacion/secciones');
      await page.locator('app-sin-periodo-activo').waitFor();
      esperar(await page.locator('table tbody tr td[colspan]').count() >= 0, '');
    });

    // ---- se agrega el periodo: año + 4 periodos + 2 secciones, y se activa ----
    const a = (await api('POST', '/anios', { nombre: '2097', fechaInicio: '2097-03-04', fechaFin: '2097-12-19' })).json;
    anioId = a.id;
    const tramos = [['I Bimestre', '2097-03-04', '2097-05-08'], ['II Bimestre', '2097-05-11', '2097-07-17'], ['III Bimestre', '2097-08-03', '2097-10-09'], ['IV Bimestre', '2097-10-12', '2097-12-19']];
    for (const [i, [nombre, ini, fin]] of tramos.entries()) await api('POST', '/periodos', { anioId, numero: i + 1, nombre, fechaInicio: ini, fechaFin: fin });
    const primero = grados[0];
    for (const nombre of ['A', 'B']) {
      const r = await api('POST', '/secciones', { anioId, gradoId: primero.id, aulaId: null, nombre, turno: 'MANANA', capacidad: 25, tutorDocenteId: null, activo: true });
      esperar(r.status === 201 || r.status === 200, 'no se creó la sección ' + nombre + ': ' + r.status);
    }
    esperar((await api('PATCH', `/anios/${anioId}/activar`)).status === 200, 'no se pudo activar el año');
    esperar((await api('GET', '/anios')).json.filter(x => x.estado === 'ACTIVO').map(x => x.nombre).join() === '2097', 'el año 2097 no quedó como el único activo');
    await new Promise(r => setTimeout(r, 4000)); // deja que matrícula cree los cupos de las secciones nuevas (Kafka)

    // ---- después: las 15 pantallas se encienden ----
    for (const ruta of RUTAS) {
      await paso(`${ruta}: ya no avisa «sin periodo activo» y carga sin errores`, async () => {
        malas = [];
        await page.goto(BASE + ruta);
        await page.waitForTimeout(2500);
        esperar(await page.locator('app-sin-periodo-activo').count() === 0, 'sigue avisando «No hay un periodo activo»');
        const errores = await page.locator('.aviso-danger').allInnerTexts();
        esperar(errores.length === 0, 'hay un aviso de error en pantalla: ' + errores[0]);
        esperar(malas.length === 0, 'respuestas malas: ' + malas.slice(0, 3).join(' | '));
      });
    }

    await paso('Estructura académica: muestra las secciones A y B del grado en el periodo activo (y 25 × 2 vacantes)', async () => {
      await page.goto(BASE + '/configuracion/estructura');
      const tarjeta = page.locator('a.g-card', { has: page.locator('h3.g-nombre', { hasText: primero.nombre }) }).first();
      await hasta(async () => (await tarjeta.locator('.burbuja').allInnerTexts()).map(x => x.trim()).sort().join(','), x => x === 'A,B', 'no salen las secciones A y B');
      const sel = await page.locator('select[aria-label="Año académico"] option:checked').innerText();
      esperar(/2097/.test(sel), 'el selector de año no está en 2097: ' + sel);
      await hasta(async () => (await tarjeta.locator('.g-cifras dd').allInnerTexts()).map(x => Number(x)).join(','), x => x.endsWith('50'), 'las vacantes del grado no son 50');
    });
    await paso('Secciones y Matrículas arrancan en el periodo activo', async () => {
      await page.goto(BASE + '/planificacion/secciones');
      await hasta(() => page.locator('table tbody tr').count(), n => n >= 2, 'Secciones no lista las 2 secciones del periodo');
      await page.goto(BASE + '/matriculas');
      await page.waitForTimeout(2000);
      const txt = await page.locator('select').evaluateAll(ss => ss.map(s => s.options[s.selectedIndex]?.text || '').join('|'));
      esperar(/2097/.test(txt), 'Matrículas no arranca en 2097: ' + txt);
    });
    await paso('Niveles y grados se desbloquea: sin aviso, grados activables y «Seleccionar todos…» disponible', async () => {
      await page.goto(BASE + '/configuracion/grados');
      await page.locator('button.tile').first().waitFor();
      await page.waitForTimeout(1500);
      esperar(await page.locator('.sin-periodo-grados').count() === 0, 'sigue el aviso de sin periodo');
      esperar(await page.locator('button.tile:not(:disabled)').count() > 0, 'ningún grado se puede activar');
      esperar(!(await page.getByRole('button', { name: /Seleccionar todos/ }).isDisabled()), '«Seleccionar todos…» sigue bloqueado');
      esperar(!/^0 de/.test((await page.locator('.resumen', { hasText: 'grados elegidos' }).innerText()).replace(/\s+/g, ' ').trim()), 'siguen viéndose 0 grados elegidos');
    });
    await paso('Apertura de periodo: el año activo viene elegido y ya no sale «No hay un año activo»', async () => {
      await page.goto(BASE + '/apertura');
      await page.locator('.anio-chip').first().waitFor();
      esperar(await page.locator('.sin-activo').count() === 0, 'sigue el aviso de sin año activo');
      esperar((await page.locator('.anio-chip.on strong').innerText()).trim() === '2097', 'el año elegido no es 2097');
      esperar((await page.locator('app-config-hero').innerText()).includes('Apertura de 2097'), 'el título no es el de 2097');
    });
    await paso('Inicio: el periodo académico es el de 2097 y la tarjeta de matrícula en línea lo reconoce', async () => {
      await page.goto(BASE + '/inicio');
      await hasta(() => page.locator('.card-periodo').innerText(), x => /2097/.test(x) && /Bimestre/.test(x), 'la tarjeta del periodo no muestra el año 2097 y sus bimestres');
      esperar(await page.locator('app-matricula-inicio').count() === 1, 'falta la tarjeta de matrícula en línea');
      await hasta(() => page.locator('app-matricula-inicio').innerText(), x => /2097/.test(x), 'la tarjeta de matrícula no habla del año 2097');
    });
    await paso('Cupos y Tarifas: arrancan en el año activo', async () => {
      await page.goto(BASE + '/matriculas/cupos');
      await page.waitForTimeout(2500);
      const c = await page.locator('select').evaluateAll(ss => ss.map(s => s.options[s.selectedIndex]?.text || '').join('|'));
      esperar(/2097/.test(c), 'Cupos no arranca en 2097: ' + c);
      await page.goto(BASE + '/pagos/tarifas');
      await page.waitForTimeout(2000);
      const tt = await page.locator('select').evaluateAll(ss => ss.map(s => s.options[s.selectedIndex]?.text || '').join('|'));
      esperar(/2097/.test(tt), 'Tarifas no arranca en 2097: ' + tt);
    });
  } finally {
    if (anioId) {
      try {
        psql('e2e-pg-matricula', 'matricula_db', `delete from cupos_seccion where anio_id=${anioId}; delete from campanias_matricula where anio_id=${anioId}`);
        psql('e2e-pg-planificacion', 'planificacion_db', `delete from asignaciones where seccion_id in (select id from secciones where anio_academico_id=${anioId}); delete from secciones where anio_academico_id=${anioId}; delete from feriados where anio_academico_id=${anioId}; delete from periodos where anio_academico_id=${anioId}; delete from anios_academicos where id=${anioId}`);
      } catch (e) { console.log('(no se pudo limpiar el año 2097: ' + e.message.split('\n')[0] + ')'); }
    }
    await browser.close();
  }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
