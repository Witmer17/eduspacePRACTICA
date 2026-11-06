/**
 * Inicio: tarjeta «Alumnos por aprobar su matrícula». Con los datos reales (sin matrículas por aprobar) dice que no hay; con la respuesta
 * de la API simulada (page.route, no se toca ningún dato) muestra la cuenta, las más antiguas primero, el origen y el enlace a aprobarlas.
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_por_aprobar_inicio.cjs
 */
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://localhost:4200';
let fallos = 0;
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 300)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };
const mat = (id, nombre, pagada, obs) => ({ id, codigo: 'MAT-' + id, alumnoId: id, alumnoNombre: nombre, anioId: 1, nivelId: 1, gradoId: 1, seccionId: 99999, tipo: 'NUEVA', estado: 'POR_APROBAR', creadoEn: pagada, pagadaEn: pagada, observaciones: obs });

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(20000);
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });

    await paso('con los datos reales: la tarjeta muestra lo mismo que hay por aprobar (nadie → «No hay matrículas esperando»)', async () => {
      const tk = await (await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
      })).json();
      const real = await (await fetch('http://localhost:18080/api/v1/matriculas?estado=POR_APROBAR&size=100', { headers: { Authorization: 'Bearer ' + tk.access_token } })).json();
      const n = real.totalElementos ?? real.total ?? (real.contenido || []).length;
      await page.goto(BASE + '/inicio');
      const t = page.locator('app-por-aprobar-inicio');
      await t.waitFor();
      await page.waitForFunction(() => !/Cargando…/.test(document.querySelector('app-por-aprobar-inicio')?.textContent ?? ''), null, { timeout: 20000 });
      const x = (await t.innerText()).replace(/\s+/g, ' ');
      esperar(/Alumnos por aprobar su matrícula/.test(x), 'falta el título');
      if (n === 0) esperar(/No hay matrículas esperando aprobación/.test(x), 'texto de la tarjeta: ' + x);
      else {
        esperar((await t.locator('.badge-warn').first().innerText()).trim() === String(n), `el contador no es ${n}: ${x}`);
        esperar(await t.locator('li').count() === Math.min(n, 6), 'filas distintas a las pendientes reales');
        esperar(/Revisar y aprobar/.test(x), 'falta el botón «Revisar y aprobar»');
      }
    });

    await paso('con 8 pendientes simuladas: cuenta, 6 filas (las más antiguas primero), origen y «y 2 más…»', async () => {
      const lista = [
        mat(1, 'Ana Reciente', '2026-11-03T10:00:00', 'Matrícula en línea'),
        mat(2, 'Beto Antiguo', '2026-10-20T08:00:00', 'Pagada en caja'),
        mat(3, 'Carla Medio', '2026-10-28T09:30:00', 'Matrícula en línea'),
        ...[4, 5, 6, 7, 8].map(i => mat(i, 'Alumno ' + i, `2026-11-0${i - 3}T12:00:00`, 'Pagada en caja'))
      ];
      await page.route('**/api/v1/matriculas?*estado=POR_APROBAR*', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ contenido: lista, pagina: 0, tamano: 100, totalElementos: 8, totalPaginas: 1 }) }));
      await page.goto(BASE + '/inicio');
      const t = page.locator('app-por-aprobar-inicio');
      await t.locator('li').first().waitFor();
      esperar(await t.locator('li').count() === 6, 'filas: ' + await t.locator('li').count());
      esperar((await t.locator('.badge-warn').innerText()).trim() === '8', 'el contador no es 8');
      const nombres = await t.locator('li strong').allInnerTexts();
      esperar(nombres[0] === 'Beto Antiguo' && nombres[1] === 'Carla Medio', 'orden: ' + nombres.join(','));
      const x = (await t.innerText()).replace(/\s+/g, ' ');
      esperar(/En línea/.test(x) && /Presencial/.test(x), 'faltan los orígenes');
      esperar(/y 2 más/.test(x), 'falta «y 2 más…»');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/14-por-aprobar.png', fullPage: true });
      await t.getByRole('link', { name: 'Revisar y aprobar' }).click();
      await page.waitForURL(/\/matriculas\/aprobaciones$/, { timeout: 15000 });
    });
  } finally { await browser.close(); }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
