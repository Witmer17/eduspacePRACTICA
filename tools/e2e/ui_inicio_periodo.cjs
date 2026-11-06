/*
 * Recorrido con Chrome real del Inicio: la tarjeta «Periodo académico» (periodo en curso, días por finalizar, barra de avance) y el botón
 * «+ Nuevo periodo», que lleva a la creación con el formulario ya abierto y propuesto. Los valores esperados se calculan aparte con la API.
 *
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_inicio_periodo.cjs [urlBase] [carpetaCapturas]
 * No crea ni borra datos (el formulario de periodo nuevo se cancela).
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-inicio';
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
const hoyLocal = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const dias = (a, b) => { const [a1, m1, d1] = a.split('-').map(Number); const [a2, m2, d2] = b.split('-').map(Number); return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000); };
const sumarDia = f => { const [a, m, d] = f.split('-').map(Number); const x = new Date(Date.UTC(a, m - 1, d + 1)); return x.toISOString().slice(0, 10); };

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  const t = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  const TOKEN = (await t.json()).access_token;
  const api = async ruta => (await (await fetch(GW + ruta, { headers: { Authorization: 'Bearer ' + TOKEN } })).json());
  const anio = await api('/anios/activo').catch(() => null) ?? (await api('/anios')).find(a => a.estado === 'ACTIVO');
  const periodos = await api(`/periodos?anioId=${anio.id}`);
  const hoy = hoyLocal();
  const actual = periodos.filter(p => p.fechaInicio <= hoy && hoy <= p.fechaFin && p.estado !== 'CERRADO').sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio))[0];
  const ultimo = [...periodos].sort((a, b) => a.numero - b.numero).at(-1);

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(15000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const tarjeta = () => page.locator('.card-periodo');
  const texto = async () => (await tarjeta().innerText()).replace(/\s+/g, ' ');

  await paso('el administrador entra al Inicio y ve la tarjeta «Periodo académico»', async () => {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/inicio');
    await tarjeta().waitFor();
    await hasta(texto, x => !x.includes('Cargando el periodo'), 'sigue cargando');
    esperar((await texto()).includes('Periodo académico'), 'falta el título');
    await page.screenshot({ path: `${CAPTURAS}/01-inicio.png`, fullPage: true });
  }, page);
  await paso(`muestra el año ${anio.nombre} y cuántos días le quedan`, async () => {
    const x = await texto();
    esperar(x.includes('Año académico ' + anio.nombre), 'no muestra el año');
    const resta = dias(hoy, anio.fechaFin);
    if (resta >= 0) esperar(x.includes(`al año le quedan ${resta === 0 ? 'hoy' : resta === 1 ? '1 día' : resta + ' días'}`), `días del año (esperado ${resta}): ${x}`);
  }, page);
  if (actual) {
    await paso(`muestra el periodo en curso (${actual.nombre}) con sus fechas y los días por finalizar`, async () => {
      const x = await texto();
      esperar(x.includes(actual.nombre), 'no muestra el nombre del periodo: ' + x);
      const resta = dias(hoy, actual.fechaFin);
      const num = (await tarjeta().locator('.periodo-dias strong').innerText()).trim();
      esperar(num === String(resta), `días por finalizar: la pantalla dice ${num}, el cálculo ${resta}`);
      esperar(/por finalizar|termina hoy/.test(await tarjeta().locator('.periodo-dias').innerText()), 'falta el texto «días por finalizar»');
      const total = dias(actual.fechaInicio, actual.fechaFin) + 1;
      const avance = Math.round(((total - resta) / total) * 100);
      esperar(x.includes(`${avance}% del periodo transcurrido`), `avance esperado ${avance}%: ${x}`);
    }, page);
  }
  await paso('«+ Nuevo periodo» lleva a la creación y abre el formulario ya propuesto', async () => {
    await tarjeta().getByRole('link', { name: /Nuevo periodo/ }).first().click();
    await page.waitForURL(/planificacion\/anios\?nuevoPeriodo=1/);
    await page.waitForSelector('app-modal #pe-nombre, app-modal form', { state: 'attached' });
    const modal = (await page.locator('app-modal').innerText()).replace(/\s+/g, ' ');
    esperar(modal.includes('Nuevo periodo'), 'el cuadro no es «Nuevo periodo»: ' + modal.slice(0, 120));
    const campos = await page.locator('app-modal input').evaluateAll(els => els.map(e => e.value));
    esperar(campos.includes(String((ultimo?.numero ?? 0) + 1)), `el número propuesto no es ${(ultimo?.numero ?? 0) + 1}: ${campos.join(' | ')}`);
    const siguienteNombre = ultimo ? ultimo.nombre.replace(/\d+\s*$/, String(ultimo.numero + 1)) : 'Bimestre 1';
    esperar(campos.includes(siguienteNombre), `el nombre propuesto no es «${siguienteNombre}»: ${campos.join(' | ')}`);
    const inicio = ultimo ? (sumarDia(ultimo.fechaFin) <= anio.fechaFin ? sumarDia(ultimo.fechaFin) : '') : anio.fechaInicio;
    esperar(campos.includes(inicio), `el inicio propuesto no es «${inicio || '(vacío)'}»: ${campos.join(' | ')}`);
    await page.screenshot({ path: `${CAPTURAS}/02-nuevo-periodo.png`, fullPage: true });
  }, page);
  await paso('el formulario ofrece duraciones rápidas: 2, 3, 4 y 6 meses y «hasta fin de año»', async () => {
    const t = (await page.locator('app-modal .atajos-duracion').innerText()).replace(/\s+/g, ' ');
    for (const x of ['2 meses Bimestre', '3 meses Trimestre', '4 meses Cuatrimestre', '6 meses Semestre', 'Hasta fin de año']) esperar(t.includes(x), `falta «${x}»: ${t}`);
  }, page);
  await paso('sin fecha de inicio, un botón de duración pide primero el inicio', async () => {
    await page.fill('#p-ini', '');
    await page.getByRole('button', { name: /3 meses/ }).click();
    await hasta(async () => (await page.locator('app-modal .aviso-danger').count()) ? await page.locator('app-modal .aviso-danger').innerText() : '', x => /Elige primero la fecha de inicio/.test(x), 'no pidió la fecha de inicio');
  }, page);
  await paso('con inicio 12 oct, «2 meses» termina el 11 dic y el nombre pasa a «Bimestre N»', async () => {
    await page.fill('#p-ini', '2026-10-12');
    await page.getByRole('button', { name: /2 meses/ }).click();
    esperar(await page.inputValue('#p-fin') === '2026-12-11', 'fin: ' + await page.inputValue('#p-fin'));
    esperar(/^Bimestre \d+$/.test(await page.inputValue('#p-nombre')), 'nombre: ' + await page.inputValue('#p-nombre'));
    await hasta(() => page.getByRole('button', { name: /2 meses/ }).getAttribute('aria-pressed'), v => v === 'true', 'el botón activo no se marca');
    esperar((await page.locator('.resumen-periodo').innerText()).includes('61 días'), 'resumen: ' + await page.locator('.resumen-periodo').innerText());
  }, page);
  await paso('«3 meses» se recorta al fin del año y el nombre pasa a «Trimestre N»; «4 meses» y «6 meses» también', async () => {
    await page.getByRole('button', { name: /3 meses/ }).click();
    esperar(await page.inputValue('#p-fin') === anio.fechaFin, `no recortó al fin del año (${anio.fechaFin}): ` + await page.inputValue('#p-fin'));
    esperar(/^Trimestre \d+$/.test(await page.inputValue('#p-nombre')), 'nombre: ' + await page.inputValue('#p-nombre'));
    await page.getByRole('button', { name: /6 meses/ }).click();
    esperar(/^Semestre \d+$/.test(await page.inputValue('#p-nombre')), 'nombre semestre: ' + await page.inputValue('#p-nombre'));
    await page.getByRole('button', { name: /4 meses/ }).click();
    esperar(/^Cuatrimestre \d+$/.test(await page.inputValue('#p-nombre')), 'nombre cuatrimestre: ' + await page.inputValue('#p-nombre'));
  }, page);
  await paso('«Hasta fin de año» pone el fin del año; un nombre escrito a mano no se pisa', async () => {
    await page.fill('#p-nombre', 'Vacaciones útiles');
    await page.getByRole('button', { name: /2 meses/ }).click();
    esperar(await page.inputValue('#p-nombre') === 'Vacaciones útiles', 'se pisó el nombre escrito a mano');
    await page.getByRole('button', { name: /Hasta fin de año/ }).click();
    esperar(await page.inputValue('#p-fin') === anio.fechaFin, 'fin: ' + await page.inputValue('#p-fin'));
    await hasta(() => page.getByRole('button', { name: /Hasta fin de año/ }).getAttribute('aria-pressed'), v => v === 'true', 'no se marca «hasta fin de año»');
  }, page);
  await paso('avisa si el periodo se cruza con otro o se sale del año', async () => {
    const avisos = (await page.locator('app-modal .aviso-warn').allInnerTexts()).join(' | ');
    if (periodos.some(p => '2026-10-12' <= p.fechaFin && anio.fechaFin >= p.fechaInicio)) esperar(/Se cruza con/.test(avisos), 'no avisa del cruce: ' + avisos);
    await page.fill('#p-fin', '2027-02-01');
    await hasta(async () => (await page.locator('app-modal .aviso-warn').allInnerTexts()).join(' | '), x => /fuera del año/.test(x), 'no avisa que se sale del año');
    await page.screenshot({ path: `${CAPTURAS}/02b-duraciones.png`, fullPage: true });
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('el cuadro se abre una sola vez: al cerrarlo no vuelve a aparecer', async () => {
    await page.waitForTimeout(500);
    esperar(await page.locator('app-modal').count() === 0, 'el cuadro reapareció');
  }, page);
  await paso('en el celular la tarjeta cabe sin desplazarse de lado', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + '/inicio');
    await tarjeta().waitFor();
    await hasta(texto, x => !x.includes('Cargando el periodo'), 'sigue cargando');
    const a = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, ven: window.innerWidth }));
    esperar(a.doc <= a.ven + 1, `hay desplazamiento horizontal: ${a.doc} > ${a.ven}`);
    await page.screenshot({ path: `${CAPTURAS}/03-celular.png`, fullPage: true });
  }, page);
  await paso('sin errores de consola ni respuestas inesperadas (salvo 429)', async () => {
    esperar(!erroresConsola.filter(e => !/429/.test(e)).length, 'consola: ' + erroresConsola.slice(0, 3).join(' | '));
    esperar(!respuestasMalas.filter(r => !r.startsWith('429')).length, 'respuestas: ' + respuestasMalas.slice(0, 4).join(' | '));
  }, page);

  await browser.close();
  const fallos = resultados.filter(r => !r.ok).length;
  console.log(`\n${resultados.length - fallos}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
