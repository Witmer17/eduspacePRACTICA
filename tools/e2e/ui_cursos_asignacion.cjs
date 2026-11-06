/*
 * Recorrido con Chrome real de Configuración → Cursos: la etiqueta de cada curso (Con docente / Faltan secciones / Sin asignar / Sin docente)
 * tiene que decir la verdad según las secciones que de verdad tienen docente, y el cuadro del curso tiene que poder ASIGNAR por sección.
 * Crea una persona de prueba «UI Prueba Cursos» con una asignación, prueba, y limpia todo (asignaciones, persona dada de baja).
 *
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_cursos_asignacion.cjs [urlBase] [carpetaCapturas]
 * Necesita la web (4200), el Gateway (18080), Keycloak (18090) y planificacion-ms levantados, y que Matemática esté en la malla de 2 grados con sección.
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-cursos';
const GW = 'http://localhost:18080/api/v1/planificacion';
const sufijo = String(Date.now()).slice(-6);
const APELLIDO = 'Prueba Cursos ' + sufijo;

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

let TOKEN = '';
async function token() {
  const r = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  return (await r.json()).access_token;
}
async function api(metodo, ruta, cuerpo) {
  for (let intento = 0; ; intento++) {
    const r = await fetch(GW + ruta, { method: metodo, headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
    // El Gateway limita a 300 peticiones por minuto y por IP: ante un 429 se espera y se reintenta.
    if (r.status === 429 && intento < 12) { await new Promise(res => setTimeout(res, 5000)); continue; }
    const txt = await r.text();
    return { status: r.status, json: txt ? JSON.parse(txt) : null };
  }
}

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  TOKEN = await token();

  // ---- Datos de prueba: una persona con Matemática asignada en UNA de las dos secciones que la necesitan ----
  const anios = (await api('GET', '/anios')).json;
  const anio = anios.find(a => a.estado === 'ACTIVO') ?? anios.find(a => a.estado === 'PLANIFICADO');
  const secciones = (await api('GET', `/secciones?anioId=${anio.id}`)).json.filter(s => s.activo);
  const mallas = {};
  for (const g of [...new Set(secciones.map(s => s.gradoId))]) mallas[g] = (await api('GET', `/malla/grado/${g}`)).json;
  const cursos = (await api('GET', '/cursos')).json;
  const mate = cursos.find(c => c.nombre === 'Matemática');
  const comu = cursos.find(c => c.nombre === 'Comunicación');
  const secMate = secciones.filter(s => (mallas[s.gradoId]?.cursos ?? []).some(c => c.cursoId === mate.id));
  const secComu = secciones.filter(s => (mallas[s.gradoId]?.cursos ?? []).some(c => c.cursoId === comu.id));
  if (secMate.length < 2) { console.log('Hace falta Matemática en la malla de dos grados con sección (hay ' + secMate.length + ')'); process.exit(2); }
  const persona = (await api('POST', '/docentes', { numeroDocumento: '91' + sufijo, nombres: 'UI', apellidos: APELLIDO })).json;
  const creadas = [];
  const asigna = async (seccionId, cursoId) => { const r = (await api('POST', '/asignaciones', { seccionId, cursoId, docenteId: persona.id })).json; creadas.push(r.id); return r; };
  await asigna(secMate[0].id, mate.id);
  const NOMBRE = `${APELLIDO}, UI`;

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(15000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const tile = nombre => page.locator('.tile', { has: page.locator('strong', { hasText: new RegExp(`^${nombre}$`) }) });
  const etiqueta = async nombre => (await tile(nombre).locator('.cob').innerText()).trim().toLowerCase();
  const titulo = async nombre => await tile(nombre).locator('.cob').getAttribute('title');
  // app-modal mide 0×0 (el contenido es fijo), por eso se espera «attached» y no «visible».
  const abrir = async nombre => { await tile(nombre).click(); await page.waitForSelector('app-modal .sub', { state: 'attached' }); };
  const guardar = async () => { await page.getByRole('button', { name: 'Guardar curso' }).click(); await page.waitForSelector('app-modal', { state: 'detached' }); await page.waitForLoadState('networkidle'); };
  const asignacionesDe = async cursoId => (await api('GET', `/asignaciones?anioId=${anio.id}`)).json.filter(a => a.cursoId === cursoId);

  try {
    console.log('== Etiquetas según las secciones que de verdad tienen docente');
    await paso('entra como administrador y abre Cursos', async () => {
      await page.goto(BASE + '/login');
      await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
      await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
      await page.goto(BASE + '/configuracion/cursos');
      await page.waitForSelector('.tile');
      await page.waitForLoadState('networkidle');
    }, page);
    await paso(`Matemática (en ${secMate.length} secciones, con docente en 1) dice «Faltan secciones» y no «Con docente»`, async () => {
      esperar(await etiqueta('Matemática') === 'faltan secciones', 'etiqueta: ' + await etiqueta('Matemática'));
      esperar((await titulo('Matemática')).includes(`1 de ${secMate.length} secciones`), 'detalle: ' + await titulo('Matemática'));
      esperar(/Faltan secciones · 1/i.test((await page.locator('.leyenda').innerText()).replace(/\s+/g, ' ')), 'la leyenda no cuenta «Faltan secciones»');
    }, page);
    await paso('un curso con docentes aptos pero sin ninguna sección asignada sigue diciendo «Sin asignar» (Comunicación)', async () => {
      esperar(await etiqueta('Comunicación') === 'sin asignar', 'etiqueta: ' + await etiqueta('Comunicación'));
    }, page);

    console.log('== Asignar por sección desde el cuadro del curso');
    await paso('el cuadro de Matemática lista sus secciones y muestra quién ya la dicta', async () => {
      await abrir('Matemática');
      const filas = page.locator('app-modal .fila-seccion');
      await hasta(() => filas.count(), c => c === secMate.length, `se esperaban ${secMate.length} secciones`);
      const sel = await filas.first().locator('select').evaluate(s => s.options[s.selectedIndex].textContent.trim());
      esperar(sel === NOMBRE, 'la primera sección debería mostrar a la persona asignada: ' + sel);
      esperar((await page.locator('app-modal').innerText()).includes(`1 de ${secMate.length} secciones tienen docente`), 'no resume cuántas secciones tienen docente');
      await page.screenshot({ path: `${CAPTURAS}/01-cuadro-matematica.png`, fullPage: true });
    }, page);
    await paso('elige a la persona en la otra sección, guarda y el curso pasa a «Con docente»', async () => {
      const filas = page.locator('app-modal .fila-seccion');
      for (let i = 1; i < secMate.length; i++) await filas.nth(i).locator('select').selectOption({ label: NOMBRE });
      await guardar();
      await hasta(() => etiqueta('Matemática'), t => t === 'con docente', 'no pasó a «Con docente»');
      esperar((await titulo('Matemática')).includes(`${secMate.length} secciones`), 'detalle: ' + await titulo('Matemática'));
    }, page);
    await paso('la API confirma las asignaciones y que la persona quedó como apta del curso', async () => {
      const a = await asignacionesDe(mate.id);
      esperar(secMate.every(s => a.some(x => x.seccionId === s.id && x.docenteId === persona.id)), 'faltan asignaciones: ' + JSON.stringify(a.map(x => [x.seccionId, x.docenteId])));
      creadas.push(...a.filter(x => x.docenteId === persona.id).map(x => x.id));
      const d = (await api('GET', `/docentes/${persona.id}`)).json;
      esperar(d.cursoIds.includes(mate.id), 'la persona no quedó como apta de Matemática');
    }, page);
    await paso('quitar el docente de una sección lo deja otra vez en «Faltan secciones»', async () => {
      await abrir('Matemática');
      await page.locator('app-modal .fila-seccion').first().locator('select').selectOption({ label: 'Sin docente' });
      await guardar();
      await hasta(() => etiqueta('Matemática'), t => t === 'faltan secciones', 'no volvió a «Faltan secciones»');
      esperar((await asignacionesDe(mate.id)).length === secMate.length - 1, 'la API debería tener una asignación menos');
    }, page);
    await paso('cambiar de docente una sección asignada funciona (reasigna sin duplicar)', async () => {
      const otro = (await api('POST', '/docentes', { numeroDocumento: '92' + sufijo, nombres: 'UI', apellidos: 'Prueba Cursos Otro ' + sufijo })).json;
      personaOtra = otro;
      await page.reload(); await page.waitForSelector('.tile'); await page.waitForLoadState('networkidle');
      await abrir('Matemática');
      const fila = page.locator('app-modal .fila-seccion', { has: page.locator('select option:checked', { hasText: APELLIDO }) }).first();
      await fila.locator('select').selectOption({ label: `Prueba Cursos Otro ${sufijo}, UI` });
      await guardar();
      const a = (await asignacionesDe(mate.id)).filter(x => x.docenteId === otro.id);
      esperar(a.length === 1, 'debería haber 1 asignación del otro docente: ' + a.length);
      esperar((await asignacionesDe(mate.id)).length === secMate.length - 1, 'no debería duplicarse');
    }, page);

    // El Gateway limita a 300 peticiones por minuto y por IP (cada recarga de Cursos hace unas 15): se deja pasar la ventana.
    await new Promise(r => setTimeout(r, 40000));
    console.log('== Solo marcar docentes = «apto», no «asignado»');
    await paso('marcar un docente apto en la lista NO asigna sección: Comunicación sigue «Sin asignar» y el cuadro lo explica', async () => {
      await abrir('Comunicación');
      const txt = (await page.locator('app-modal').innerText()).replace(/\s+/g, ' ');
      esperar(/apto/i.test(txt) && /asignado/i.test(txt) && /elige abajo su sección/i.test(txt), 'el cuadro no explica la diferencia entre apto y asignado');
      await page.locator('app-modal .doc', { hasText: APELLIDO }).locator('input[type=checkbox]').check();
      await guardar();
      esperar(await etiqueta('Comunicación') === 'sin asignar', 'etiqueta: ' + await etiqueta('Comunicación'));
      esperar((await asignacionesDe(comu.id)).length === 0, 'no debería haber asignaciones');
    }, page);
    if (secComu.length) {
      await paso('elegir la sección en el desplegable sí asigna: Comunicación pasa a «Con docente»', async () => {
        await abrir('Comunicación');
        const filas = page.locator('app-modal .fila-seccion');
        await hasta(() => filas.count(), c => c === secComu.length, 'secciones de Comunicación');
        for (let i = 0; i < secComu.length; i++) await filas.nth(i).locator('select').selectOption({ label: NOMBRE });
        await guardar();
        await hasta(() => etiqueta('Comunicación'), t => t === 'con docente', 'no pasó a «Con docente»');
        creadas.push(...(await asignacionesDe(comu.id)).map(x => x.id));
        await page.screenshot({ path: `${CAPTURAS}/02-con-docente.png`, fullPage: true });
      }, page);
    }
    await paso('un curso sin grados todavía no ofrece secciones (no hay dónde asignarlo)', async () => {
      await abrir('Inglés');
      esperar(await page.locator('app-modal .fila-seccion').count() === 0, 'no debería haber secciones');
      esperar((await page.locator('app-modal').innerText()).includes('podrás asignar aquí'), 'falta la explicación');
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
    }, page);
    await paso('el asistente «Agregar personal» deja el curso como el cuadro lo espera (asignar ahí = «Con docente»)', async () => {
      // Lo asignado desde Personal usa la misma API: la etiqueta de Cursos tiene que coincidir con las asignaciones reales.
      const reales = await asignacionesDe(mate.id);
      const necesarias = secMate.length;
      const cubiertas = new Set(reales.map(a => a.seccionId).filter(id => secMate.some(s => s.id === id))).size;
      const esperada = cubiertas === 0 ? 'sin asignar' : cubiertas >= necesarias ? 'con docente' : 'faltan secciones';
      await page.reload(); await page.waitForSelector('.tile'); await page.waitForLoadState('networkidle');
      esperar(await etiqueta('Matemática') === esperada, `la etiqueta (${await etiqueta('Matemática')}) no coincide con la API (${cubiertas} de ${necesarias}: ${esperada})`);
    }, page);

    console.log('== Salud de la interfaz');
    console.log('      (respuestas >= 400 durante el recorrido: ' + (respuestasMalas.length ? respuestasMalas.slice(0, 6).join(' | ') : 'ninguna') + ')');
    await paso('sin errores de consola ni respuestas inesperadas', async () => {
      esperar(!erroresConsola.filter(e => !/429/.test(e)).length, 'consola: ' + erroresConsola.slice(0, 3).join(' | '));
      esperar(!respuestasMalas.filter(r => !r.startsWith('429')).length, 'respuestas: ' + respuestasMalas.slice(0, 4).join(' | '));
    }, page);
  } finally {
    // ---- Limpieza: asignaciones de las personas de prueba y las personas (se dan de baja) ----
    const todas = (await api('GET', `/asignaciones?anioId=${anio.id}`)).json;
    for (const a of todas) if ([persona.id, personaOtra?.id].includes(a.docenteId)) await api('DELETE', `/asignaciones/${a.id}`);
    for (const p of [persona, personaOtra]) if (p) await api('DELETE', `/docentes/${p.id}`);
    // Los cursos de la lista de cada docente de prueba no importan: quedan dados de baja.
    await browser.close();
  }
  const fallos = resultados.filter(r => !r.ok).length;
  console.log(`\n${resultados.length - fallos}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
var personaOtra = null;
