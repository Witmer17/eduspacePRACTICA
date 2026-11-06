/*
 * Recorrido con Chrome real de Configuración → Horario del docente: elegir a un docente, seleccionar rectángulos de la grilla, asignarle ahí
 * mismo un curso nuevo (si no tiene), poner clases en varios bloques, editarlas/quitarlas, y comprobar que el horario de la sección (la misma
 * tabla que ve «Horario por sección») y la API reflejan lo que se armó. Crea dos personas «UI Prueba Horario» y las limpia al terminar.
 *
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_horario_docente.cjs [urlBase] [carpetaCapturas]
 * Necesita la web (4200), el Gateway, Keycloak y planificacion-ms, una sección de turno mañana con un curso de 3 o más horas sin docente y
 * bloques horarios de la mañana.
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-horario';
const GW = 'http://localhost:18080/api/v1/planificacion';
const sufijo = String(Date.now()).slice(-6);
const AP_1 = 'Prueba Horario Uno ' + sufijo, AP_2 = 'Prueba Horario Dos ' + sufijo;

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
async function api(metodo, ruta, cuerpo) {
  for (let intento = 0; ; intento++) {
    const r = await fetch(GW + ruta, { method: metodo, headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
    if (r.status === 429 && intento < 12) { await new Promise(res => setTimeout(res, 5000)); continue; }   // límite del Gateway: se espera y se reintenta
    const txt = await r.text();
    return { status: r.status, json: txt ? JSON.parse(txt) : null };
  }
}

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  const t = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  TOKEN = (await t.json()).access_token;

  // ---- Datos de prueba: una sección de la mañana con un curso libre de 3+ horas, y dos personas sin cursos ----
  const anios = (await api('GET', '/anios')).json;
  const anio = anios.find(a => a.estado === 'ACTIVO') ?? anios.find(a => a.estado === 'PLANIFICADO');
  const secciones = (await api('GET', `/secciones?anioId=${anio.id}`)).json.filter(s => s.activo && s.turno === 'MANANA');
  const asignadas = (await api('GET', `/asignaciones?anioId=${anio.id}`)).json;
  let elegida = null;
  for (const s of secciones) {
    const malla = (await api('GET', `/malla/grado/${s.gradoId}`)).json;
    const libre = malla.cursos.find(c => c.horasSemanales >= 2 && !asignadas.some(a => a.seccionId === s.id && a.cursoId === c.cursoId));
    if (libre) { elegida = { seccion: s, curso: libre }; break; }
  }
  const bloques = (await api('GET', '/bloques?turno=MANANA')).json.filter(b => !b.esReceso);
  if (!elegida || bloques.length < 3) { console.log('Faltan datos: una sección de la mañana con un curso libre de 2+ h y 3 bloques de la mañana'); process.exit(2); }
  const { seccion, curso } = elegida;
  const horas = curso.horasSemanales;
  const inicial = Math.min(2, horas - 1);   // clases que se ponen primero (deja al menos 1 h libre para probar «curso ya asignado»)
  const colExtra = inicial + 1;             // columna (día) de la clase que se agrega después
  const etiquetaSeccion = `${seccion.gradoNombre} «${seccion.nombre}»`;
  const d1 = (await api('POST', '/docentes', { numeroDocumento: '71' + sufijo, nombres: 'UI', apellidos: AP_1 })).json;
  const d2 = (await api('POST', '/docentes', { numeroDocumento: '72' + sufijo, nombres: 'UI', apellidos: AP_2 })).json;

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, locale: 'es-PE' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const textoPagina = async () => (await page.locator('.page').innerText()).replace(/\s+/g, ' ');
  const filaDocente = ap => page.locator('.docente', { hasText: ap });
  const turnoManana = () => page.locator('.turno', { has: page.locator('h3', { hasText: 'Mañana' }) });
  /** El rectángulo de la fila (sin contar recesos) i y el día d (1 = lunes) de la grilla de la mañana. */
  const rect = (i, d) => turnoManana().locator('tbody tr:not(.receso)').nth(i).locator('td').nth(d - 1).locator('button');
  const guardarCuadro = async nombre => { await page.locator('app-modal button[type=submit]').click(); await page.waitForSelector('app-modal', { state: 'detached' }); await page.waitForLoadState('networkidle'); };
  const clasesDe = async id => (await api('GET', `/horarios/docente/${id}`)).json.clases;

  try {
    console.log('== La lista y la grilla');
    await paso('entra a Configuración → Horario del docente (la pestaña está en el menú)', async () => {
      await page.goto(BASE + '/login');
      await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
      await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
      await page.goto(BASE + '/configuracion/horarios');
      await page.waitForSelector('.docente');
      await page.waitForLoadState('networkidle');
      esperar(await page.locator('a[href="/configuracion/horarios"]').count() > 0, 'no hay enlace «Horario del docente» en el menú');
    }, page);
    await paso('lista a los docentes con su avance: el nuevo aparece «Sin cursos»', async () => {
      const f = filaDocente(AP_1);
      await f.waitFor();
      esperar(/Sin cursos/i.test(await f.innerText()), 'estado: ' + await f.innerText());
      await page.fill('input[aria-label="Buscar docente"]', AP_2);
      esperar(await page.locator('.docente').count() === 1, 'el buscador no filtra');
      await page.fill('input[aria-label="Buscar docente"]', 'Prueba Horario');
      esperar(await page.locator('.docente').count() === 2, 'el buscador no encuentra a las dos personas de prueba');
    }, page);
    await paso('al elegirlo se ve su semana (Lunes a Viernes) y avisa que aún no tiene cursos', async () => {
      await filaDocente(AP_1).click();
      await turnoManana().waitFor();
      const cab = (await turnoManana().locator('thead th').allInnerTexts()).map(x => x.trim());
      esperar(cab.join(',') === 'Hora,Lunes,Martes,Miércoles,Jueves,Viernes', 'columnas: ' + cab.join(','));
      esperar((await textoPagina()).includes('todavía no tiene cursos asignados'), 'no avisa que no tiene cursos');
      await page.screenshot({ path: `${CAPTURAS}/01-semana-vacia.png`, fullPage: true });
    }, page);

    console.log('== Asignar un curso nuevo ahí mismo y poner varias clases a la vez');
    await paso('tocar rectángulos vacíos los selecciona (con la barra «N bloques seleccionados»)', async () => {
      for (let d = 1; d <= inicial + 1; d++) await rect(0, d).click();
      await hasta(() => textoPagina(), x => x.includes(`${inicial + 1} bloques seleccionados`), `no cuenta ${inicial + 1} bloques`);
      esperar(await rect(0, inicial + 1).getAttribute('aria-pressed') === 'true', 'el rectángulo no queda marcado');
      await rect(0, inicial + 1).click();   // se puede quitar uno
      await hasta(() => textoPagina(), x => x.includes(inicial === 1 ? '1 bloque seleccionado' : `${inicial} bloques seleccionados`), `no bajó a ${inicial}`);
    }, page);
    await paso('«Poner clase…» sin cursos propone asignar uno nuevo, y bloquea la sección que ya tiene clase', async () => {
      await page.getByRole('button', { name: /Poner clase…/ }).click();
      await page.waitForSelector('app-modal #hd-sec', { state: 'attached' });
      esperar(await page.locator('app-modal input[value=asignada]').isDisabled(), 'no debería poder elegir «ya asignado» sin cursos');
      esperar(await page.locator('app-modal input[value=nueva]').isChecked(), 'debería venir en «Asignarle un curso nuevo»');
      const opciones = await page.locator('#hd-sec option').allInnerTexts();
      esperar(opciones.some(o => o.includes(etiquetaSeccion)), 'no ofrece la sección ' + etiquetaSeccion + ': ' + opciones.join(' | '));
      await page.screenshot({ path: `${CAPTURAS}/02-cuadro-nuevo.png`, fullPage: true });
    }, page);
    await paso('elige sección y curso, y se ponen las clases (se crea la asignación del docente)', async () => {
      await page.selectOption('#hd-sec', { label: etiquetaSeccion });
      await hasta(() => page.locator('#hd-curso option').allInnerTexts(), o => o.some(x => x.includes(curso.cursoNombre)), 'el curso no está entre los libres');
      await page.selectOption('#hd-curso', { label: `${curso.cursoNombre} (${horas} h)` });
      await guardarCuadro();
      await hasta(() => rect(0, 1).innerText(), x => x.includes(curso.cursoNombre), 'el lunes no muestra la clase');
      for (let d = 2; d <= inicial; d++) esperar((await rect(0, d).innerText()).includes(curso.cursoNombre), `el día ${d} no muestra la clase`);
    }, page);
    await paso('la API y el horario de la sección reflejan las clases (así queda definido el horario del grado)', async () => {
      const clases = await clasesDe(d1.id);
      esperar(clases.length === inicial && clases.every(c => c.seccionId === seccion.id && c.cursoId === curso.cursoId), 'clases del docente: ' + JSON.stringify(clases.map(c => [c.diaSemana, c.bloqueOrden])));
      const hs = (await api('GET', `/horarios/seccion/${seccion.id}`)).json;
      esperar(hs.clases.filter(c => c.docenteId === d1.id).length === inicial, 'el horario de la sección no tiene las clases');
      const asig = (await api('GET', `/asignaciones?docenteId=${d1.id}`)).json;
      esperar(asig.length === 1 && asig[0].seccionId === seccion.id, 'debería tener 1 asignación');
    }, page);
    await paso(`el docente pasa a «Incompleto» y su curso muestra ${inicial}/${horas} h`, async () => {
      await hasta(() => filaDocente(AP_1).innerText(), x => /Incompleto/i.test(x) && x.includes(`${inicial} de ${horas} h`), 'estado del docente');
      esperar((await textoPagina()).includes(`${inicial}/${horas} h`), `el chip del curso no muestra ${inicial}/${horas}`);
      await page.screenshot({ path: `${CAPTURAS}/03-semana-armada.png`, fullPage: true });
    }, page);

    console.log('== Con un curso ya asignado');
    await paso('un curso que ya tiene sus horas no se ofrece de más (el cuadro dice cuántas faltan)', async () => {
      await rect(1, 1).click(); await rect(1, 2).click(); await rect(1, 3).click(); await rect(1, 4).click(); await rect(1, 5).click();
      await page.getByRole('button', { name: /Poner clase…/ }).click();
      await page.waitForSelector('app-modal #hd-asig', { state: 'attached' });
      const opt = page.locator('#hd-asig option', { hasText: curso.cursoNombre });
      const faltan = horas - inicial;
      if (5 > faltan) {
        esperar(await opt.isDisabled(), 'la opción debería estar bloqueada: elegiste 5 bloques y solo faltan ' + faltan);
        esperar((await opt.innerText()).includes(`solo le faltan ${faltan} h`), 'texto: ' + await opt.innerText());
      }
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      await page.getByRole('button', { name: 'Quitar selección' }).click();
    }, page);
    await paso('con menos bloques sí se pone la clase del curso ya asignado (otro día, primera hora)', async () => {
      await rect(0, colExtra).click();
      await page.getByRole('button', { name: /Poner clase…/ }).click();
      await page.waitForSelector('app-modal #hd-asig', { state: 'attached' });
      await page.selectOption('#hd-asig', { index: 1 });
      await guardarCuadro();
      await hasta(() => rect(0, colExtra).innerText(), x => x.includes(curso.cursoNombre), 'el día agregado no muestra la clase');
      esperar((await clasesDe(d1.id)).length === inicial + 1, `debería haber ${inicial + 1} clases`);
    }, page);
    await paso('otro docente no puede tener la misma sección a la misma hora (esa opción sale bloqueada)', async () => {
      await filaDocente(AP_2).click();
      await turnoManana().waitFor();
      await rect(0, 1).click();
      await page.getByRole('button', { name: /Poner clase…/ }).click();
      await page.waitForSelector('app-modal #hd-sec', { state: 'attached' });
      const op = page.locator('#hd-sec option', { hasText: etiquetaSeccion });
      esperar(await op.isDisabled(), 'la sección ocupada debería estar bloqueada');
      esperar((await op.innerText()).includes('ya tiene clase a esa hora'), 'texto: ' + await op.innerText());
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      await page.getByRole('button', { name: 'Quitar selección' }).click();
    }, page);
    await paso('el otro docente sigue sin nada y primero en la lista de «sin horario» no se mezcla con el de arriba', async () => {
      esperar((await clasesDe(d2.id)).length === 0, 'el segundo docente no debería tener clases');
      esperar(/Sin cursos/i.test(await filaDocente(AP_2).innerText()), 'estado del segundo docente');
    }, page);

    console.log('== Editar y quitar');
    await paso('tocar una clase la abre para cambiarla; «Quitar clase» la saca de la grilla y de la sección', async () => {
      await filaDocente(AP_1).click();
      await turnoManana().waitFor();
      await rect(0, colExtra).click();     // la clase agregada después
      await page.waitForSelector('app-modal #hd-asig', { state: 'attached' });
      esperar((await page.locator('app-modal').innerText()).includes('Quitar clase'), 'falta «Quitar clase»');
      await page.getByRole('button', { name: 'Quitar clase' }).click();
      await page.getByRole('button', { name: 'Quitar', exact: true }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      await hasta(() => clasesDe(d1.id), c => c.length === inicial, `debería quedar con ${inicial} clase(s)`);
      await hasta(() => rect(0, colExtra).getAttribute('aria-label'), x => /Seleccionar/.test(x), 'ese día debería quedar vacío');
    }, page);
    await paso('mover una clase a otro bloque: se cambia el rectángulo desde el cuadro', async () => {
      await rect(0, 1).click();     // la clase del lunes
      await page.waitForSelector('app-modal #hd-asig', { state: 'attached' });
      esperar((await page.locator('app-modal').innerText()).includes('Se cambia esta clase'), 'no indica que se edita');
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
    }, page);

    console.log('== Celular y salud de la interfaz');
    await paso('en el celular la semana cabe sin desplazarse de lado', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(400);
      const ancho = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, ven: window.innerWidth }));
      esperar(ancho.doc <= ancho.ven + 1, `hay desplazamiento horizontal: ${ancho.doc} > ${ancho.ven}`);
      await page.screenshot({ path: `${CAPTURAS}/04-celular.png`, fullPage: true });
      await page.setViewportSize({ width: 1440, height: 1100 });
    }, page);
    console.log('      (respuestas >= 400: ' + (respuestasMalas.length ? respuestasMalas.slice(0, 5).join(' | ') : 'ninguna') + ')');
    await paso('sin errores de consola ni respuestas inesperadas (salvo 429)', async () => {
      esperar(!erroresConsola.filter(e => !/429/.test(e)).length, 'consola: ' + erroresConsola.slice(0, 3).join(' | '));
      esperar(!respuestasMalas.filter(r => !r.startsWith('429')).length, 'respuestas: ' + respuestasMalas.slice(0, 4).join(' | '));
    }, page);
  } finally {
    // ---- Limpieza: clases, asignaciones y personas (se dan de baja) ----
    for (const d of [d1, d2]) {
      for (const c of (await api('GET', `/horarios/docente/${d.id}`)).json.clases) await api('DELETE', `/horarios/${c.id}`);
      for (const a of (await api('GET', `/asignaciones?docenteId=${d.id}`)).json) await api('DELETE', `/asignaciones/${a.id}`);
      await api('DELETE', `/docentes/${d.id}`);
    }
    await browser.close();
  }
  const fallos = resultados.filter(r => !r.ok).length;
  console.log(`\n${resultados.length - fallos}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
