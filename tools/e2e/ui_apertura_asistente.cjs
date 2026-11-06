/*
 * Recorrido con Chrome real del Asistente de apertura de periodo (Apertura de periodo → «Abrir el asistente»): todo en una sola ventana.
 * Crea el año de prueba 2095 desde el propio asistente y pasa por año → periodos → feriados → secciones → docentes → tarifas → campaña → listo,
 * comprobando cada paso contra la API. NO abre el año (eso cerraría el año activo real). Al terminar borra por SQL todo lo del año 2095
 * (no hay API para borrar años) y da de baja al docente de prueba.
 *
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_apertura_asistente.cjs [urlBase] [carpetaCapturas]
 */
const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-asistente';
const GW = 'http://localhost:18080/api/v1/planificacion';
const sufijo = String(Date.now()).slice(-6);
const APELLIDO = 'Prueba Apertura ' + sufijo;
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
async function hasta(leer, ok, msg, ms = 15000) {
  const fin = Date.now() + ms;
  let ultimo;
  while (Date.now() < fin) { ultimo = await leer(); if (ok(ultimo)) return ultimo; await new Promise(r => setTimeout(r, 150)); }
  throw new Error(msg + (ultimo !== undefined ? ' — último valor: ' + String(ultimo).replace(/\s+/g, ' ').slice(0, 300) : ''));
}
const psql = (contenedor, base, sql) => execSync(`podman exec ${contenedor} psql -U eduspace -d ${base} -At -c ${JSON.stringify(sql)}`, { encoding: 'utf8' }).trim();
const iso = ms => new Date(ms).toISOString().slice(0, 10);
const lunes = a => { const ms = Date.UTC(a, 2, 1); return iso(ms + ((1 - new Date(ms).getUTCDay() + 7) % 7) * 86400000); };
const viernes = a => { const ms = Date.UTC(a, 11, 20); return iso(ms - ((new Date(ms).getUTCDay() - 5 + 7) % 7) * 86400000); };

let TOKEN = '';
async function api(metodo, ruta, cuerpo, base = GW) {
  for (let intento = 0; ; intento++) {
    const r = await fetch(base + ruta, { method: metodo, headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
    if (r.status === 429 && intento < 12) { await new Promise(res => setTimeout(res, 5000)); continue; }
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
  if ((await api('GET', '/anios')).json.some(a => a.nombre === '2095')) { console.log('Ya existe el año 2095 de una corrida anterior: quítalo con SQL antes de repetir.'); process.exit(2); }
  const cursos = (await api('GET', '/cursos')).json;
  const docente = (await api('POST', '/docentes', { numeroDocumento: '95' + sufijo, nombres: 'UI', apellidos: APELLIDO, cursoIds: cursos.map(c => c.id) })).json;
  let anioId = 0;

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const modal = async () => (await page.locator('app-modal').innerText()).replace(/\s+/g, ' ');
  const boton = nombre => page.locator('app-modal').getByRole('button', { name: nombre });
  const pasoActual = async () => (await page.locator('app-modal .paso.actual .etq').innerText()).trim();
  const pie = page.locator('app-modal footer.pie');
  const irSiguiente = async titulo => { await pie.getByRole('button', { name: /Siguiente|Omitir/ }).click(); await hasta(pasoActual, x => x === titulo, 'no pasó a ' + titulo); };
  const irA = async titulo => { await page.locator('app-modal .paso', { hasText: titulo }).click(); await hasta(pasoActual, x => x === titulo, 'no llegó al paso ' + titulo); };
  /** Otra pestaña con sesión propia (la sesión vive en sessionStorage, no se comparte) abierta en el Inicio. */
  const abrirInicio = async (ruta = '/inicio') => {
    const p2 = await page.context().newPage();
    p2.setDefaultTimeout(20000);
    await p2.goto(BASE + '/login');
    await p2.fill('#username', 'admin'); await p2.fill('#password', 'admin123'); await p2.click('button[type=submit]');
    await p2.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await p2.goto(BASE + ruta);
    return p2;
  };
  const listas = async () => (await api('GET', `/secciones?anioId=${anioId}`)).json.filter(s => s.activo);

  try {
    console.log('== Abrir el asistente');
    await paso('Apertura de periodo ofrece «Abrir el asistente» y el modal trae los 8 pasos', async () => {
      await page.goto(BASE + '/login');
      await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
      await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
      await page.goto(BASE + '/apertura');
      await page.getByRole('button', { name: 'Abrir el asistente' }).click();
      await page.waitForSelector('app-modal .pasos', { state: 'attached' });
      const pasos = (await page.locator('app-modal .paso .etq').allInnerTexts()).map(x => x.trim());
      esperar(pasos.join(',') === 'Año,Periodos,Feriados,Secciones,Docentes,Tarifas,Campaña,Listo', 'pasos: ' + pasos.join(','));
      esperar(await pasoActual() === 'Año', 'debería empezar en «Año»');
    }, page);

    console.log('== 1. Año');
    await paso('crea el año 2095 ahí mismo: las fechas se proponen solas (primer lunes de marzo → último viernes antes del 20 de dic)', async () => {
      await boton('+ Crear un año nuevo').click();
      await page.fill('#as-an-nombre', '2095');
      await hasta(async () => ({ i: await page.inputValue('#as-an-ini'), f: await page.inputValue('#as-an-fin') }), v => v.i === lunes(2095) && v.f === viernes(2095), `fechas esperadas ${lunes(2095)} → ${viernes(2095)}`);
      await page.screenshot({ path: `${CAPTURAS}/01-anio.png`, fullPage: true });
      await boton('Crear el año').click();
      await hasta(modal, x => x.includes('Año 2095 creado'), 'no confirmó la creación del año');
      const a = (await api('GET', '/anios')).json.find(x => x.nombre === '2095');
      esperar(a && a.estado === 'PLANIFICADO' && a.fechaInicio === lunes(2095), 'año en la API: ' + JSON.stringify(a));
      anioId = a.id;
      await hasta(() => page.locator('app-modal .radio.on').innerText(), x => x.includes('2095'), 'el año 2095 no quedó elegido');
    }, page);
    await paso('«Siguiente» pasa a Periodos, y «← Atrás» regresa', async () => {
      await irSiguiente('Periodos');
      await pie.getByRole('button', { name: '← Atrás' }).click();
      await hasta(pasoActual, x => x === 'Año', 'no regresó a Año');
      await irSiguiente('Periodos');
    }, page);

    console.log('== 2. Periodos');
    await paso('un paso opcional se puede omitir (el botón dice «Omitir» mientras falta) y volver después', async () => {
      const txt = await pie.innerText();
      esperar(/Omitir/.test(txt), 'el pie no ofrece «Omitir»: ' + txt);
      await irA('Feriados'); await irA('Periodos');
    }, page);
    await paso('elige el régimen y crea los 4 bimestres', async () => {
      await page.locator('app-modal').getByRole('radio', { name: /Bimestres/ }).click();
      await boton('Crear estos 4 periodos').click();
      await hasta(modal, x => x.includes('4 periodos guardados'), 'no confirmó los periodos');
      const p = (await api('GET', `/periodos?anioId=${anioId}`)).json;
      esperar(p.length === 4 && p[0].fechaInicio === lunes(2095) && p[3].fechaFin === viernes(2095), 'periodos: ' + JSON.stringify(p.map(x => [x.fechaInicio, x.fechaFin])));
    }, page);

    console.log('== 3. Feriados');
    await paso('carga los feriados nacionales de fecha fija que caen en el año', async () => {
      await irSiguiente('Feriados');
      const marcados = await page.locator('app-modal .lista-checks input:checked').count();
      esperar(marcados >= 8, 'se esperaban ≥ 8 feriados marcados: ' + marcados);
      await boton(/^Cargar \d+ feriados?$/).click();
      await hasta(modal, x => /\d+ feriados guardados/.test(x), 'no confirmó los feriados');
      esperar((await api('GET', `/feriados?anioId=${anioId}`)).json.length === marcados, 'la API no tiene los ' + marcados + ' feriados');
    }, page);

    console.log('== 4. Secciones');
    let esperadas = 0;
    await paso('crea las secciones de cada grado (2 en el primero, 1 en los demás)', async () => {
      await irSiguiente('Secciones');
      // Lo indispensable para matricular no se puede omitir: sin secciones no hay «Siguiente» y los pasos de más allá quedan bloqueados.
      esperar(await pie.getByRole('button', { name: /Completa este paso para seguir/ }).isDisabled(), 'Secciones se puede omitir sin tener secciones');
      esperar(await page.locator('app-modal .paso', { hasText: 'Tarifas' }).isDisabled(), 'el paso Tarifas no está bloqueado con Secciones incompleto');
      esperar(/Indispensable/.test(await modal()), 'no avisa que es indispensable');
      esperar(await page.locator('app-modal .paso', { hasText: 'Docentes' }).isDisabled(), 'Docentes debería estar bloqueado detrás de Secciones incompleto');
      const grupos = page.locator('app-modal .grado-bloque:has(section.fila-secc)');
      // Los grados se muestran en dos columnas.
      const cols = await page.locator('app-modal .rejilla-grados').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
      esperar(cols === 2, 'los grados no están en dos columnas: ' + cols);
      const total = await grupos.count();
      esperar(total >= 1, 'no hay grados para crear secciones');
      // Se listan los GRADOS del colegio (con su casilla «Ofrecer»), y las secciones van dentro de cada grado.
      esperar(await page.locator('app-modal input[aria-label^="Ofrecer "]').count() >= total, 'no se listan los grados con su casilla «Ofrecer»');
      // Cada grado muestra solo la «A» (y lo sugerido del año anterior), no B, C y D.
      esperar(await grupos.first().locator('input[aria-label^="Sección A de"]').count() === 1, 'el grado no muestra la sección A');
      // Los grados ya no salen bloqueados.
      esperar(await page.locator('app-modal input[aria-label^="Ofrecer "]:disabled').count() === 0, 'hay grados bloqueados');
      // «+» agrega la siguiente letra libre ya marcada.
      const antes = await grupos.first().locator('input[type=checkbox]').count();
      await grupos.first().getByRole('button', { name: /Agregar otra sección/ }).click();
      await hasta(() => grupos.first().locator('input[type=checkbox]').count(), n => n === antes + 1, 'el «+» no agregó una sección');
      esperar((await grupos.first().locator('input[type=checkbox]:checked').count()) >= 2, 'la sección agregada con «+» no quedó marcada');
      // Desmarcar un grado que ya existe NO da el error de «No se pueden quitar»: solo se deja sin abrir en este periodo, y se puede volver a marcar.
      if (total >= 2) {
        const etiqueta = await grupos.nth(1).locator('input[aria-label^="Ofrecer "]').getAttribute('aria-label');
        const otro = page.locator(`app-modal .grado-bloque:has(input[aria-label="${etiqueta}"])`);
        const casilla = otro.locator('input[aria-label^="Ofrecer "]');
        await casilla.uncheck();
        await hasta(() => otro.locator('section.fila-secc').count(), n => n === 0, 'al desmarcar el grado siguen sus secciones');
        esperar(!/No se pueden quitar/.test(await modal()), 'apareció el error «No se pueden quitar»');
        await casilla.check();
        await hasta(() => page.locator('app-modal .grado-bloque:has(section.fila-secc)').count(), n => n === total, 'al volver a marcar el grado no regresan sus secciones');
      }
      esperadas = await page.locator('app-modal section.fila-secc input[type=checkbox]:checked:not([disabled])').count();
      esperar(esperadas >= total + 1, `se esperaban ≥ ${total + 1} secciones marcadas: ${esperadas}`);
      await page.screenshot({ path: `${CAPTURAS}/02-secciones.png`, fullPage: true });
      await boton(/^Crear \d+ secciones?$/).click();
      await hasta(modal, x => /\d+ secciones guardados|\d+ sección guardado/.test(x) || /secciones? guardad/.test(x), 'no confirmó las secciones');
      const s = await listas();
      esperar(s.length === esperadas, `secciones en la API: ${s.length}, esperadas ${esperadas}`);
      esperar(s.filter(x => x.gradoId === s[0].gradoId).map(x => x.nombre).sort().join() === 'A,B' || s.some(x => x.nombre === 'B'), 'las secciones del primer grado no se llaman A y B');
    }, page);

    await paso('la Estructura académica muestra lo mismo que se acordó en el asistente (secciones por grado, vacantes) y su detalle abre el mismo año', async () => {
      const p2 = await abrirInicio('/configuracion/estructura');
      try {
        const selAnio = p2.locator('select[aria-label="Año académico"]');
        await selAnio.waitFor({ timeout: 20000 });
        // La primera carga (sin periodo activo) termina antes de elegir el año; y se deja que el Gateway reponga fichas (límite de peticiones).
        await hasta(() => p2.locator('.nivel-titulo, .toolbar .muted').count(), () => true, '');
        await p2.waitForTimeout(8000);
        await selAnio.selectOption({ label: '2095' });
        const api0 = await listas(); // secciones activas del año 2095 según la API
        const grados = (await api('GET', '/grados')).json.filter(g => g.activo);
        // Por cada grado, la tarjeta lista las mismas secciones que la API.
        for (const g of grados) {
          const esperadas = api0.filter(s => s.gradoId === g.id).map(s => s.nombre).sort().join(',');
          const tarjeta = p2.locator('a.g-card', { has: p2.locator('h3.g-nombre', { hasText: new RegExp('^' + g.nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }) });
          await hasta(async () => (await tarjeta.locator('.burbuja').allInnerTexts()).map(x => x.trim()).sort().join(','), x => x === esperadas,
            `secciones de ${g.nombre} en la estructura ≠ API (${esperadas || 'ninguna'}) · tarjetas: ${await p2.locator('a.g-card').count()} · año elegido: ${await selAnio.evaluate(s => s.options[s.selectedIndex]?.text)} · burbujas totales: ${await p2.locator('.burbuja').count()}`);
        }
        // Las vacantes que muestran las tarjetas suman la capacidad de las secciones creadas por el asistente.
        const capacidad = api0.reduce((t, s) => t + s.capacidad, 0);
        await hasta(async () => (await p2.locator('a.g-card .g-cifras div:nth-child(2) dd').allInnerTexts()).reduce((t, x) => t + Number(x), 0), v => v === capacidad, `vacantes en la estructura ≠ ${capacidad}`);
        // El detalle de un grado abre el año elegido (no el activo): trae sus secciones.
        const primero = grados.find(g => api0.some(s => s.gradoId === g.id));
        await p2.locator('a.g-card', { has: p2.locator('h3.g-nombre', { hasText: primero.nombre }) }).first().click();
        await p2.waitForURL(/anioId=/, { timeout: 15000 });
        const nSecc = api0.filter(s => s.gradoId === primero.id).length;
        await p2.screenshot({ path: `${CAPTURAS}/02b-estructura-detalle.png`, fullPage: true });
        await hasta(() => p2.locator('main, .page').first().innerText().then(t => t.replace(/\s+/g, ' ')), t => new RegExp(`(\\b${nSecc} secci(ón|ones)\\b|\\bsecci(ón|ones) ${nSecc}\\b)`).test(t), `el detalle del grado no muestra ${nSecc} secciones del año 2095`);
        await p2.screenshot({ path: `${CAPTURAS}/02b-estructura.png`, fullPage: true });
      } finally { await p2.close(); }
    }, page);

    console.log('== 5. Docentes');
    let porAsignar = 0;
    await paso('lista los cursos sin docente y «Sugerir docentes» propone entre los aptos', async () => {
      await irSiguiente('Docentes');
      const selects = page.locator('app-modal select[aria-label^="Docente de "]');
      porAsignar = await selects.count();
      // lo que debería haber: cursos de la malla de cada grado con sección, sin docente
      let esperados = 0;
      const secs = await listas();
      for (const g of [...new Set(secs.map(s => s.gradoId))]) esperados += ((await api('GET', `/malla/grado/${g}`)).json.cursos || []).length;
      esperar(porAsignar === esperados, `filas de cursos: ${porAsignar}, esperadas ${esperados}`);
      if (porAsignar) {
        await boton('Sugerir docentes').click();
        await hasta(modal, x => /Se sugirió docente|Ningún docente tiene/.test(x), 'no mostró el resultado de sugerir');
      }
    }, page);
    await paso('elige al docente de prueba en todos los cursos y los asigna (en todas las secciones del grado)', async () => {
      if (!porAsignar) { console.log('      (no hay cursos en las mallas de los grados con sección: se omite)'); return; }
      const selects = page.locator('app-modal select[aria-label^="Docente de "]');
      for (let i = 0; i < await selects.count(); i++) await selects.nth(i).selectOption({ label: `${APELLIDO}, UI` });
      // Solo salen docentes que tienen ese curso en su lista: ningún curso ofrece más docentes que los aptos.
      // (sin ★: ya no hay «el resto»; cada lista trae solo a los aptos, y el docente de prueba está en todas)
      for (let i = 0; i < await selects.count(); i++) {
        const textos = await selects.nth(i).locator('option').allInnerTexts();
        esperar(!textos.some(t => t.includes('★')), 'quedó la marca ★ en la lista de docentes');
        esperar(textos.some(t => t.includes(APELLIDO)), 'el docente apto no está en la lista del curso ' + i);
      }
      await page.screenshot({ path: `${CAPTURAS}/03-docentes.png`, fullPage: true });
      await boton(/^Asignar \d+ cursos?$/).click();
      await hasta(modal, x => /asignaci(ón|ones) guardad/.test(x), 'no confirmó las asignaciones');
      const secs = await listas();
      let pares = 0;
      for (const s of secs) pares += ((await api('GET', `/malla/grado/${s.gradoId}`)).json.cursos || []).length;
      const asig = (await api('GET', `/asignaciones?anioId=${anioId}`)).json;
      esperar(asig.length === pares && asig.every(a => a.docenteId === docente.id), `asignaciones: ${asig.length}, esperadas ${pares}`);
      await hasta(modal, x => x.includes('Todos los cursos tienen docente'), 'no dice que todos tienen docente');
    }, page);

    console.log('== 6. Tarifas');
    await paso('muestra los niveles y guarda la matrícula y la pensión de cada uno (o las copia del año anterior)', async () => {
      await irSiguiente('Tarifas');
      const filas = await page.locator('app-modal input[aria-label^="Matrícula de "]').count();
      esperar(filas >= 1, 'no hay niveles para poner tarifas');
      if (await boton(/^Copiar del /).count()) {
        await boton(/^Copiar del /).click();
        await hasta(modal, x => /tarifas? copiadas? guardad|tarifa copiada guardado/.test(x) || /copiad/.test(x), 'no confirmó la copia de tarifas');
      } else {
        const m = page.locator('app-modal input[aria-label^="Matrícula de "]');
        const p = page.locator('app-modal input[aria-label^="Pensión de "]');
        for (let i = 0; i < await m.count(); i++) await m.nth(i).fill(String(100 + i * 20));
        for (let i = 0; i < await p.count(); i++) await p.nth(i).fill(String(1000 + i * 200));
        await boton(/^Guardar \d+ tarifas?$/).click();
        await hasta(modal, x => /tarifas? guardad/.test(x), 'no confirmó las tarifas');
      }
      await hasta(modal, x => x.includes('Todos los niveles tienen su matrícula y su pensión'), 'faltan tarifas por cubrir');
      const tar = (await api('GET', `/tarifas?anioId=${anioId}`, null, 'http://localhost:18080/api/v1/pagos')).json;
      esperar(tar.some(x => x.conceptoCodigo === 'MATRICULA') && tar.some(x => x.conceptoCodigo === 'PENSION'), 'tarifas en la API: ' + tar.length);
      await page.screenshot({ path: `${CAPTURAS}/04-tarifas.png`, fullPage: true });
    }, page);

    console.log('== 7. Campaña');
    await paso('en el Inicio, sin campaña, sale el botón «Abrir campaña de matrícula» con su formulario ya propuesto', async () => {
      const p2 = await abrirInicio();
      try {
        const tarjeta = p2.locator('app-matricula-inicio');
        // Con el Gateway saturado por la propia prueba la tarjeta avisa «No se pudo consultar» y deja «Reintentar»: se usa.
        await hasta(async () => {
          const x = await tarjeta.innerText().catch(() => '');
          if (/No se pudo consultar/.test(x)) { await new Promise(r => setTimeout(r, 6000)); await tarjeta.getByRole('button', { name: 'Reintentar' }).click().catch(() => {}); }
          return x;
        }, x => /Abrir campaña de matrícula/.test(x), 'la tarjeta no ofrece «Abrir campaña de matrícula»', 60000);
        esperar(/No hay una campaña de matrícula para el año 2095/.test(await tarjeta.innerText()), 'texto de la tarjeta: ' + await tarjeta.innerText());
        await tarjeta.getByRole('button', { name: 'Abrir campaña de matrícula' }).click();
        await p2.waitForSelector('app-modal #ci-nombre', { state: 'attached' });
        esperar(await p2.inputValue('#ci-nombre') === 'Matrícula 2095', 'nombre propuesto: ' + await p2.inputValue('#ci-nombre'));
        esperar(!!(await p2.inputValue('#ci-ini')) && !!(await p2.inputValue('#ci-fin')), 'el formulario no trae fechas');
        await p2.screenshot({ path: `${CAPTURAS}/04b-inicio-campania.png`, fullPage: true });
        await p2.locator('app-modal footer.pie').getByRole('button', { name: 'Cancelar' }).click();
        await p2.waitForSelector('app-modal', { state: 'detached' });
      } finally { await p2.close(); }
    }, page);
    await paso('propone la campaña del año y la crea y abre en un solo paso', async () => {
      await irSiguiente('Campaña');
      esperar(await page.inputValue('#as-ca-nombre') === 'Matrícula 2095', 'nombre propuesto: ' + await page.inputValue('#as-ca-nombre'));
      await boton('Crear y abrir ahora').click();
      await hasta(modal, x => x.includes('abierta') && x.includes('ABIERTA'), 'la campaña no quedó abierta');
      const c = (await api('GET', `/campanias?anioId=${anioId}`, null, 'http://localhost:18080/api/v1/matriculas')).json;
      esperar(c.length === 1 && c[0].estado === 'ABIERTA', 'campañas en la API: ' + JSON.stringify(c));
    }, page);

    await paso('en el Inicio, con la campaña abierta, la tarjeta lo dice (y avisa que el año aún no está activo)', async () => {
      const p2 = await abrirInicio();
      try {
        const tarjeta = p2.locator('app-matricula-inicio');
        // Con el Gateway saturado por la propia prueba (límite de peticiones) la tarjeta avisa «No se pudo consultar» y deja «Reintentar»: se usa.
        await hasta(async () => {
          const x = await tarjeta.innerText().catch(() => '');
          if (/No se pudo consultar/.test(x)) { await new Promise(r => setTimeout(r, 6000)); await tarjeta.getByRole('button', { name: 'Reintentar' }).click().catch(() => {}); }
          return x;
        }, x => /Campaña abierta/.test(x), 'la tarjeta no dice «Campaña abierta»', 60000);
        esperar(/aún no está activo/.test(await tarjeta.innerText()), 'no avisa que el año no está activo');
        esperar(await tarjeta.getByRole('button', { name: /Abrir campaña/ }).count() === 0, 'sigue ofreciendo abrir una campaña ya abierta');
      } finally { await p2.close(); }
    }, page);

    console.log('== 8. Listo');
    await paso('el resumen dice qué falta: el año aún no está abierto (no se abre desde la prueba); campaña y grados en orden', async () => {
      await irSiguiente('Listo');
      const items = (await page.locator('app-modal .revision li').allInnerTexts()).map(x => x.replace(/\s+/g, ' ').trim());
      esperar(items.some(x => /todavía no está abierto/.test(x)) && items.some(x => /campaña de matrícula está abierta/.test(x)) && items.some(x => /grados? listos?/.test(x)), 'revisión: ' + items.join(' | '));
      esperar(await boton(/Abrir el año 2095/).isVisible(), 'falta el botón «Abrir el año 2095»');
      esperar(!(await modal()).includes('¡Listo!'), 'no debería decir «¡Listo!» con el año sin abrir');
      await page.screenshot({ path: `${CAPTURAS}/05-listo.png`, fullPage: true });
    }, page);
    await paso('cerrar el asistente deja la página de Apertura al día (y todo lo guardado sigue guardado)', async () => {
      await pie.getByRole('button', { name: 'Cerrar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      esperar((await api('GET', `/periodos?anioId=${anioId}`)).json.length === 4, 'los periodos ya no están');
    }, page);
    await paso('en el celular el asistente cabe sin desplazarse de lado', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.reload();
      await page.getByRole('button', { name: 'Abrir el asistente' }).click();
      await page.waitForSelector('app-modal .pasos', { state: 'attached' });
      await page.waitForTimeout(500);
      const a = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, ven: window.innerWidth }));
      esperar(a.doc <= a.ven + 1, `desplazamiento horizontal: ${a.doc} > ${a.ven}`);
      await page.screenshot({ path: `${CAPTURAS}/06-celular.png`, fullPage: true });
    }, page);
    await paso('sin errores de consola ni respuestas inesperadas (salvo 429)', async () => {
      esperar(!erroresConsola.filter(e => !/429|404/.test(e)).length, 'consola: ' + erroresConsola.slice(0, 3).join(' | ') + ' · respuestas malas: ' + respuestasMalas.filter(r => !r.startsWith('429')).join(' | '));
      // (el 404 de /anios/activo es normal: es lo que responde el servidor mientras no hay un año activo)
      const malas = respuestasMalas.filter(r => !r.startsWith('429') && !r.includes('/anios/activo'));
      esperar(!malas.length, 'respuestas: ' + malas.slice(0, 4).join(' | '));
    }, page);
  } finally {
    // ---- Limpieza: todo lo del año 2095 (sin API para borrar años) y el docente de prueba ----
    try {
      if (anioId) {
        psql('e2e-pg-matricula', 'matricula_db', `delete from cupos_seccion where anio_id = ${anioId}; delete from campanias_matricula where anio_id = ${anioId}`);
        psql('e2e-pg-pago', 'pago_db', `delete from tarifas where anio_id = ${anioId}`);
        psql('e2e-pg-planificacion', 'planificacion_db', `delete from asignaciones where seccion_id in (select id from secciones where anio_academico_id = ${anioId}); delete from secciones where anio_academico_id = ${anioId}; delete from feriados where anio_academico_id = ${anioId}; delete from periodos where anio_academico_id = ${anioId}; delete from anios_academicos where id = ${anioId}`);
      }
    } catch (e) { console.log('(limpieza parcial: ' + String(e.message).split('\n')[0] + ')'); }
    try { await api('DELETE', `/docentes/${docente.id}`); } catch { /* sin docente */ }
    await browser.close();
  }
  const fallos = resultados.filter(r => !r.ok).length;
  console.log(`\n${resultados.length - fallos}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
