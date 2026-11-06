/**
 * Sin periodo activo: las pantallas que muestran información de un periodo salen vacías y avisan «No hay un periodo activo».
 * Solo lee. Requiere que NO haya un año activo (si lo hay, termina sin probar nada).
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_sin_periodo_activo.cjs
 */
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://localhost:4200';
const API = 'http://localhost:18080/api/v1/planificacion';
const RUTAS = ['/configuracion/estructura', '/matriculas', '/matriculas/cupos', '/planificacion/secciones', '/planificacion/asignaciones', '/planificacion/horarios',
  '/planificacion/horarios-auto', '/planificacion/feriados', '/planificacion/panel', '/planificacion/cursos-docentes', '/planificacion/aulas-disponibles',
  '/pagos/tarifas', '/pagos/cuentas', '/asistencia/reporte', '/calificaciones/cierre'];
const NO_DEPENDEN = ['/matriculas/campanias', '/planificacion/anios', '/apertura', '/inicio'];
let fallos = 0;
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 300)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };

(async () => {
  const t = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  const token = (await t.json()).access_token;
  const anios = await (await fetch(API + '/anios', { headers: { Authorization: 'Bearer ' + token } })).json();
  if (anios.some(a => a.estado === 'ACTIVO')) { console.log('Hay un año activo: esta prueba solo corre sin año activo.'); process.exit(0); }

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  let malas = [];
  page.on('response', r => { if (r.status() >= 400 && r.status() !== 429 && !r.url().includes('/kc/') && !r.url().includes('/anios/activo')) malas.push(`${r.status()} ${r.request().method()} ${r.url().replace(/^https?:\/\/[^/]+/, '')}`); });
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    for (const ruta of RUTAS) {
      await paso(`${ruta}: avisa «No hay un periodo activo» y no muestra datos de otro año`, async () => {
        malas = [];
        await page.goto(BASE + ruta);
        await page.locator('app-sin-periodo-activo').waitFor({ timeout: 20000 });
        esperar(/No hay un periodo activo/.test(await page.locator('app-sin-periodo-activo').innerText()), 'texto del aviso');
        await page.waitForTimeout(1500);
        // ninguna fila de datos (las tablas dicen «sin resultados» o están vacías) ni tarjetas con secciones
        const filas = await page.locator('table tbody tr').evaluateAll(trs => trs.filter(tr => tr.querySelectorAll('td').length > 1 && !tr.querySelector('td[colspan]')).length);
        esperar(filas === 0, `${filas} fila(s) de datos con el año sin activar`);
        esperar(await page.locator('.burbuja').count() === 0, 'hay secciones en pantalla');
        esperar(malas.length === 0, 'respuestas malas: ' + malas.slice(0, 3).join(' | '));
      });
    }
    for (const ruta of NO_DEPENDEN) {
      await paso(`${ruta}: no muestra el aviso (sirve para preparar el periodo)`, async () => {
        await page.goto(BASE + ruta);
        await page.waitForTimeout(1800);
        esperar(await page.locator('app-sin-periodo-activo').count() === 0, 'muestra el aviso de periodo activo');
      });
    }
    await page.goto(BASE + '/configuracion/estructura');
    await page.locator('app-sin-periodo-activo').waitFor();
    await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/08-sin-periodo.png', fullPage: true });
  } finally { await browser.close(); }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
