/*
 * Recorrido con Chrome real de «crear un año nuevo»: nombre y fechas propuestos (primer lunes de marzo → último viernes hasta el 20 de dic),
 * las fechas se ajustan al escribir otro año (salvo las que se tocaron a mano), avisos de año repetido, el enlace «+ Crear un año nuevo»
 * dentro del formulario de periodo (y que vuelve a él con el año elegido) y el botón «+ Nuevo año» del Inicio.
 * Crea el año de prueba 2097; no hay API para borrar años: quítalo con SQL (el recorrido lo recuerda al final).
 *
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_nuevo_anio.cjs [urlBase] [carpetaCapturas]
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-nuevo-anio';
const GW = 'http://localhost:18080/api/v1/planificacion';
const resultados = [];
const erroresConsola = [];
const respuestasMalas = [];
let n = 0;
async function paso(nombre, fn, page) {
  try { await fn(); resultados.push({ ok: true, nombre }); console.log('  OK  ' + nombre); }
  catch (e) {
    resultados.push({ ok: false, nombre });
    console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n').slice(0, 3).join('\n      '));
    try { await page.screenshot({ path: `${CAPTURAS}/${String(++n).padStart(2, '0')}-error.png`, fullPage: true }); } catch { /* sin captura */ }
  }
}
const esperar = (cond, msg) => { if (!cond) throw new Error(msg); };
async function hasta(leer, ok, msg, ms = 8000) {
  const fin = Date.now() + ms;
  let ultimo;
  while (Date.now() < fin) { ultimo = await leer(); if (ok(ultimo)) return ultimo; await new Promise(r => setTimeout(r, 120)); }
  throw new Error(msg + (ultimo !== undefined ? ' — último valor: ' + String(ultimo).replace(/\s+/g, ' ').slice(0, 300) : ''));
}
// Las mismas reglas que la pantalla, calculadas aparte: primer lunes desde el 1 de marzo y último viernes hasta el 20 de diciembre.
const iso = ms => new Date(ms).toISOString().slice(0, 10);
const lunes = a => { const ms = Date.UTC(a, 2, 1); return iso(ms + ((1 - new Date(ms).getUTCDay() + 7) % 7) * 86400000); };
const viernes = a => { const ms = Date.UTC(a, 11, 20); return iso(ms - ((new Date(ms).getUTCDay() - 5 + 7) % 7) * 86400000); };

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  const t = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  const TOKEN = (await t.json()).access_token;
  const api = async ruta => (await (await fetch(GW + ruta, { headers: { Authorization: 'Bearer ' + TOKEN } })).json());
  const existentes = await api('/anios');
  if (existentes.some(a => a.nombre === '2097')) { console.log('Ya existe el año 2097 de una corrida anterior: quítalo con SQL antes de repetir.'); process.exit(2); }
  const mayor = Math.max(...existentes.map(a => Number(a.nombre)).filter(Number.isFinite));

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(15000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const modal = async () => (await page.locator('app-modal').innerText()).replace(/\s+/g, ' ');
  const titulo = async () => (await page.locator('app-modal h2, app-modal .modal-titulo, app-modal header').first().innerText()).trim();
  const valores = async () => ({ nombre: await page.inputValue('#a-nombre'), ini: await page.inputValue('#a-ini'), fin: await page.inputValue('#a-fin') });

  await paso('entra a «Nuevo periodo» y ofrece «+ Crear un año nuevo» junto al campo del año', async () => {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/planificacion/anios?nuevoPeriodo=1');
    await page.waitForSelector('#p-anio', { state: 'attached' });
    esperar(await page.getByRole('button', { name: '+ Crear un año nuevo' }).isVisible(), 'falta el enlace «+ Crear un año nuevo»');
  }, page);
  await paso('al tocarlo abre «Nuevo año académico» ya propuesto: el año que sigue, de lunes de marzo a viernes de diciembre', async () => {
    await page.getByRole('button', { name: '+ Crear un año nuevo' }).click();
    await page.waitForSelector('#a-nombre', { state: 'attached' });
    esperar((await titulo()).includes('Nuevo año académico'), 'título: ' + await titulo());
    const v = await valores();
    esperar(v.nombre === String(mayor + 1), `nombre propuesto ${v.nombre}, esperado ${mayor + 1}`);
    esperar(v.ini === lunes(mayor + 1) && v.fin === viernes(mayor + 1), `fechas propuestas ${v.ini} → ${v.fin}, esperadas ${lunes(mayor + 1)} → ${viernes(mayor + 1)}`);
    await page.screenshot({ path: `${CAPTURAS}/01-propuesta.png`, fullPage: true });
  }, page);
  await paso('al escribir otro año (2097) las fechas se ajustan solas', async () => {
    await page.fill('#a-nombre', '2097');
    await hasta(valores, v => v.ini === lunes(2097) && v.fin === viernes(2097), `fechas para 2097 (esperadas ${lunes(2097)} → ${viernes(2097)})`);
  }, page);
  await paso('las fechas que se tocaron a mano NO se pisan al cambiar el nombre', async () => {
    await page.fill('#a-fin', '2097-12-10');
    await page.fill('#a-nombre', '2096');
    await page.waitForTimeout(300);
    const v = await valores();
    esperar(v.fin === '2097-12-10', 'se pisó el fin escrito a mano: ' + v.fin);
    await page.fill('#a-nombre', '2097');
  }, page);
  await paso('«Usar las fechas habituales» las vuelve a proponer', async () => {
    await page.getByRole('button', { name: /Usar las fechas habituales/ }).click();
    await hasta(valores, v => v.ini === lunes(2097) && v.fin === viernes(2097), 'no repuso las fechas habituales');
  }, page);
  await paso('avisa si el año ya existe y si las fechas se cruzan con otro año', async () => {
    await page.fill('#a-nombre', existentes[0].nombre);
    await hasta(modal, x => x.includes(`Ya existe el año ${existentes[0].nombre}`), 'no avisa que el año ya existe');
    await page.fill('#a-nombre', '2097');
    await page.fill('#a-ini', existentes[0].fechaInicio);
    await hasta(modal, x => /Se cruza con el año/.test(x), 'no avisa el cruce de fechas');
    await page.getByRole('button', { name: /Usar las fechas habituales/ }).click();
  }, page);
  await paso('cancelar regresa al formulario de periodo (no se pierde el hilo)', async () => {
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await hasta(async () => ((await page.locator('#p-anio').count()) > 0 ? await titulo() : ''), t => t.includes('Nuevo periodo'), 'no volvió a «Nuevo periodo»');
  }, page);
  await paso('crear el año desde el periodo (2097) vuelve al formulario de periodo con ese año elegido y su inicio', async () => {
    await page.getByRole('button', { name: '+ Crear un año nuevo' }).click();
    await page.waitForSelector('#a-nombre', { state: 'attached' });
    await page.fill('#a-nombre', '2097');
    await hasta(valores, v => v.ini === lunes(2097), 'fechas de 2097');
    await page.locator('app-modal button[type=submit]').click();
    await page.waitForSelector('#p-anio', { state: 'attached' });
    await hasta(() => page.locator('#p-anio').evaluate(s => s.options[s.selectedIndex].textContent.trim()), x => x.includes('2097'), 'el año recién creado no quedó elegido');
    await hasta(() => page.inputValue('#p-ini'), v => v === lunes(2097), 'el inicio propuesto no es el del año 2097');
    esperar(await page.inputValue('#p-num') === '1' && await page.inputValue('#p-nombre') === 'Bimestre 1', 'número/nombre propuestos');
    await page.screenshot({ path: `${CAPTURAS}/02-periodo-en-anio-nuevo.png`, fullPage: true });
    const lista = await api('/anios');
    const nuevo = lista.find(a => a.nombre === '2097');
    esperar(nuevo && nuevo.estado === 'PLANIFICADO' && nuevo.fechaInicio === lunes(2097) && nuevo.fechaFin === viernes(2097), 'el año 2097 no quedó creado como se esperaba: ' + JSON.stringify(nuevo));
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('desde el Inicio, «+ Nuevo año» abre el formulario de año directamente', async () => {
    await page.goto(BASE + '/inicio');
    await page.locator('.card-periodo').waitFor();
    await hasta(async () => (await page.locator('.card-periodo').innerText()), x => !x.includes('Cargando el periodo'), 'sigue cargando');
    await page.locator('.card-periodo').getByRole('link', { name: '+ Nuevo año' }).click();
    await page.waitForURL(/planificacion\/anios\?nuevoAnio=1/);
    await page.waitForSelector('#a-nombre', { state: 'attached' });
    esperar((await titulo()).includes('Nuevo año académico'), 'título: ' + await titulo());
    esperar(await page.inputValue('#a-nombre') === '2098', 'debería proponer 2098 (el siguiente al 2097): ' + await page.inputValue('#a-nombre'));
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('sin errores de consola ni respuestas inesperadas (salvo 429)', async () => {
    esperar(!erroresConsola.filter(e => !/429/.test(e)).length, 'consola: ' + erroresConsola.slice(0, 3).join(' | '));
    esperar(!respuestasMalas.filter(r => !r.startsWith('429')).length, 'respuestas: ' + respuestasMalas.slice(0, 4).join(' | '));
  }, page);

  await browser.close();
  const fallos = resultados.filter(r => !r.ok).length;
  console.log(`\n${resultados.length - fallos}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  console.log("(Queda el año de prueba 2097: quítalo con  delete from anios_academicos where nombre = '2097'  en planificacion_db)");
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
