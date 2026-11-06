/**
 * Apertura de periodo: arriba se eligen los años que no están cerrados para ver qué falta de cada uno (por defecto, el activo).
 * Solo lee (no crea ni cambia nada). Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_apertura_anios.cjs
 */
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://localhost:4200';
const API = 'http://localhost:18080/api/v1/planificacion';
let fallos = 0;
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0]); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };
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
  const token = (await t.json()).access_token;
  const anios = await (await fetch(API + '/anios', { headers: { Authorization: 'Bearer ' + token } })).json();
  const abiertos = anios.filter(a => a.estado !== 'CERRADO').sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
  const activo = anios.find(a => a.estado === 'ACTIVO');

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/apertura');
    const chips = page.locator('.anio-chip');
    await page.locator('.anio-chip, .sin-activo').first().waitFor({ timeout: 20000 });
    if (!abiertos.length) {
      // Sin años abiertos: avisa y ofrece «Aperturar periodo», que abre el asistente.
      await paso('sin años abiertos: avisa «No hay un año activo» y «Aperturar periodo» abre el asistente', async () => {
        await page.locator('.sin-activo').waitFor();
        await page.getByRole('button', { name: 'Aperturar periodo' }).click();
        await page.waitForSelector('app-modal .pasos', { state: 'attached' });
      });
      await browser.close();
      console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
      process.exit(fallos ? 1 : 0);
    }

    await paso('lista los años que no están cerrados (y no el cerrado)', async () => {
      const nombres = (await chips.locator('strong').allInnerTexts()).map(x => x.trim());
      esperar(nombres.join(',') === abiertos.map(a => a.nombre).join(','), `chips: ${nombres} · esperados: ${abiertos.map(a => a.nombre)}`);
    });
    await paso(activo ? `por defecto está elegido el año activo (${activo.nombre})` : 'sin año activo: avisa y ofrece «Aperturar periodo»', async () => {
      if (activo) {
        const on = (await page.locator('.anio-chip.on strong').innerText()).trim();
        esperar(on === activo.nombre, `elegido: ${on}`);
        esperar(await page.locator('.sin-activo').count() === 0, 'avisa «sin año activo» habiendo uno activo');
        esperar((await page.locator('app-config-hero').innerText()).includes('Apertura de ' + activo.nombre), 'el título no es el del año activo');
      } else {
        await page.locator('.sin-activo').waitFor();
        await page.getByRole('button', { name: 'Aperturar periodo' }).click();
        await page.waitForSelector('app-modal .pasos', { state: 'attached' });
        await page.locator('app-modal footer.pie').getByRole('button', { name: 'Cerrar' }).click();
        await page.waitForSelector('app-modal', { state: 'detached' });
      }
    });
    const otro = abiertos.find(a => a.id !== (activo && activo.id));
    if (otro) {
      await paso(`al elegir el año ${otro.nombre} se ven sus pasos (título y estado)`, async () => {
        await page.locator('.anio-chip', { hasText: otro.nombre }).click();
        await hasta(() => page.locator('app-config-hero').innerText(), x => x.includes('Apertura de ' + otro.nombre), 'el título no cambió');
        await hasta(() => page.locator('ol.pasos li').count(), n => n > 0, 'no salieron los pasos');
        esperar((await page.locator('.anio-chip.on strong').innerText()).trim() === otro.nombre, 'el chip elegido no es ' + otro.nombre);
        await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/07-apertura-anios.png', fullPage: true });
      });
      if (activo) await paso(`volver al activo (${activo.nombre}) funciona`, async () => {
        await page.locator('.anio-chip', { hasText: activo.nombre }).click();
        await hasta(() => page.locator('app-config-hero').innerText(), x => x.includes('Apertura de ' + activo.nombre), 'no regresó al activo');
      });
    }
  } finally { await browser.close(); }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
