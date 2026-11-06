/*
 * Recorrido con Chrome real del campo «Año académico» del formulario «Nuevo periodo»: viene con el año activo, se puede cambiar a otro año
 * (se vuelven a proponer número, nombre e inicio con los periodos de ESE año), el periodo se guarda en el año elegido y al editar el año no se cambia.
 * Crea un año de prueba (2099) y deja su periodo borrado; el año no tiene API para borrarse: quítalo con SQL (ver el final del recorrido).
 *
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_periodo_anio.cjs [urlBase] [carpetaCapturas]
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-periodo-anio';
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

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  const t = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  const TOKEN = (await t.json()).access_token;
  const api = async (metodo, ruta, cuerpo) => {
    const r = await fetch(GW + ruta, { method: metodo, headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
    const txt = await r.text();
    return { status: r.status, json: txt ? JSON.parse(txt) : null };
  };
  let anios = (await api('GET', '/anios')).json;
  const activo = anios.find(a => a.estado === 'ACTIVO');
  let prueba = anios.find(a => a.nombre === '2099');
  if (!prueba) prueba = (await api('POST', '/anios', { nombre: '2099', fechaInicio: '2099-03-01', fechaFin: '2099-12-15' })).json;
  const periodosPrueba = (await api('GET', `/periodos?anioId=${prueba.id}`)).json;
  for (const p of periodosPrueba) await api('DELETE', `/periodos/${p.id}`);                 // por si una corrida anterior dejó alguno
  const periodosActivo = (await api('GET', `/periodos?anioId=${activo.id}`)).json;

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(15000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const modal = async () => (await page.locator('app-modal').innerText()).replace(/\s+/g, ' ');

  let creado = null;
  try {
    await paso('«Nuevo periodo» muestra el campo «Año académico» con el año activo elegido', async () => {
      await page.goto(BASE + '/login');
      await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
      await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
      await page.goto(BASE + '/planificacion/anios?nuevoPeriodo=1');
      await page.waitForSelector('#p-anio', { state: 'attached' });
      const etiqueta = await page.locator('label[for=p-anio]').innerText();
      esperar(/Año académico/.test(etiqueta), 'etiqueta: ' + etiqueta);
      const elegido = await page.locator('#p-anio').evaluate(s => s.options[s.selectedIndex].textContent.trim());
      esperar(elegido.includes(activo.nombre) && elegido.includes('(activo)'), 'año elegido: ' + elegido);
      esperar((await modal()).includes('El año va del'), 'no muestra las fechas del año');
      await page.screenshot({ path: `${CAPTURAS}/01-campo-anio.png`, fullPage: true });
    }, page);
    await paso('el selector ofrece los años no cerrados (2026 y 2099)', async () => {
      const ops = (await page.locator('#p-anio option').allInnerTexts()).map(x => x.trim());
      esperar(ops.some(o => o.includes(activo.nombre)) && ops.some(o => o.includes('2099')), 'opciones: ' + ops.join(' | '));
    }, page);
    await paso('con el año activo propone el siguiente número y nombre de SUS periodos', async () => {
      const ultimo = [...periodosActivo].sort((a, b) => a.numero - b.numero).at(-1);
      esperar(await page.inputValue('#p-num') === String((ultimo?.numero ?? 0) + 1), 'número: ' + await page.inputValue('#p-num'));
    }, page);
    await paso('al cambiar a 2099 se vuelve a proponer con los periodos de ese año (Bimestre 1, inicio = inicio del año)', async () => {
      await page.selectOption('#p-anio', { label: 'Año 2099' });
      await hasta(() => page.inputValue('#p-ini'), v => v === '2099-03-01', 'el inicio no pasó al del año 2099');
      esperar(await page.inputValue('#p-num') === '1', 'número: ' + await page.inputValue('#p-num'));
      esperar(await page.inputValue('#p-nombre') === 'Bimestre 1', 'nombre: ' + await page.inputValue('#p-nombre'));
      esperar(await page.inputValue('#p-fin') === '', 'el fin debería quedar vacío para elegirlo');
      esperar((await modal()).includes('2099'), 'no muestra las fechas del año 2099');
      esperar((await page.getByRole('button', { name: /Hasta fin de año/ }).innerText()).includes('15 dic 2099'), 'el botón «Hasta fin de año» no muestra el fin del año elegido');
      await page.screenshot({ path: `${CAPTURAS}/02-anio-2099.png`, fullPage: true });
    }, page);
    await paso('«3 meses» respeta el año elegido (1 mar → 31 may) y no avisa nada', async () => {
      await page.getByRole('button', { name: /3 meses/ }).click();
      esperar(await page.inputValue('#p-fin') === '2099-05-31', 'fin: ' + await page.inputValue('#p-fin'));
      esperar(await page.inputValue('#p-nombre') === 'Trimestre 1', 'nombre: ' + await page.inputValue('#p-nombre'));
      esperar(await page.locator('app-modal .aviso-warn').count() === 0, 'avisos: ' + (await page.locator('app-modal .aviso-warn').allInnerTexts()).join(' | '));
    }, page);
    await paso('guardar crea el periodo en el año elegido (2099) y la pantalla pasa a ese año', async () => {
      await page.locator('app-modal button[type=submit]').click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      const lista = (await api('GET', `/periodos?anioId=${prueba.id}`)).json;
      esperar(lista.length === 1 && lista[0].nombre === 'Trimestre 1' && lista[0].fechaInicio === '2099-03-01' && lista[0].fechaFin === '2099-05-31', 'periodos de 2099: ' + JSON.stringify(lista));
      creado = lista[0];
      esperar((await api('GET', `/periodos?anioId=${activo.id}`)).json.length === periodosActivo.length, 'el año activo no debería haber cambiado');
      await hasta(() => page.locator('.page').innerText(), x => x.includes('Periodos de 2099') && x.includes('Trimestre 1'), 'la pantalla no pasó al año 2099');
    }, page);
    await paso('al editar el periodo el año no se puede cambiar', async () => {
      await page.locator('tr', { hasText: 'Trimestre 1' }).getByRole('button', { name: /Editar/ }).first().click();
      await page.waitForSelector('#p-anio', { state: 'attached' });
      esperar(await page.locator('#p-anio').isDisabled(), 'el año debería estar bloqueado al editar');
      const elegido = await page.locator('#p-anio').evaluate(s => s.options[s.selectedIndex].textContent.trim());
      esperar(elegido.includes('2099'), 'año: ' + elegido);
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
    }, page);
    await paso('sin errores de consola ni respuestas inesperadas', async () => {
      esperar(!erroresConsola.filter(e => !/429/.test(e)).length, 'consola: ' + erroresConsola.slice(0, 3).join(' | '));
      esperar(!respuestasMalas.filter(r => !r.startsWith('429')).length, 'respuestas: ' + respuestasMalas.slice(0, 4).join(' | '));
    }, page);
  } finally {
    if (creado) await api('DELETE', `/periodos/${creado.id}`);
    await browser.close();
  }
  const fallos = resultados.filter(r => !r.ok).length;
  console.log(`\n${resultados.length - fallos}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  console.log(`(Queda el año de prueba 2099 (id ${prueba.id}): para quitarlo → delete from anios_academicos where nombre = '2099' en planificacion_db)`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
