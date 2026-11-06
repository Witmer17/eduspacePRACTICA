/*
 * Recorrido con Chrome real de la matrícula en línea del sitio público (/matricula-en-linea) con código de descuento:
 *  - el campo trampa anti-robots ya no se autocompleta y, si llegara lleno, la familia ve un mensaje claro en vez de «Solicitud no válida»;
 *  - «¿Tienes un código de descuento?»: código inválido, código válido (matrícula y pensión con descuento), quitarlo y volver a ponerlo;
 *  - al reservar, la matrícula y el botón de pago salen con el descuento (lo que dice el servidor).
 * Crea un descuento de prueba con código, una reserva (que se anula) y un alumno «UI Prueba» (que se da de baja). No llega a cobrar.
 *
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_matricula_en_linea_descuento.cjs [urlBase] [carpetaCapturas]
 */
const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-mel-descuento';
const GW = 'http://localhost:18080/api/v1';
const sufijo = String(Date.now()).slice(-6);
const CODIGO = 'UIWEB' + sufijo;
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
const psql = (contenedor, base, sql) => execSync(`podman exec ${contenedor} psql -U eduspace -d ${base} -At -c ${JSON.stringify(sql)}`, { encoding: 'utf8' }).trim();
const dinero = x => x.toFixed(2);

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
  const oferta = (await (await fetch(GW + '/publico/matricula/oferta')).json());
  const nivel = oferta.niveles.find(n => n.grados.some(g => g.matricula && g.vacantes > 0 && g.pension));
  const grado = nivel.grados.find(g => g.matricula && g.vacantes > 0 && g.pension);
  const base = grado.matricula, desc = Math.round(base * 10) / 100, total = base - desc;
  const mensualBase = Math.floor((grado.pension.total * 100) / grado.pension.cuotas) / 100;
  const mensualDesc = Math.round((mensualBase - Math.round(mensualBase * 10) / 100) * 100) / 100;
  const d = (await api('POST', '/pagos/descuentos', { nombre: 'UI Prueba web', tipo: 'PORCENTAJE', valor: 10, aplicaA: 'TODO', activo: true, codigo: CODIGO })).json;

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(15000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const texto = async () => (await page.locator('main, .pub-main, body').first().innerText()).replace(/\s+/g, ' ');
  const tarjetaCostos = () => page.locator('.pub-tarjeta', { has: page.locator('h3', { hasText: 'Costos' }) });
  const costos = async () => (await tarjetaCostos().innerText()).replace(/\s+/g, ' ');

  try {
    console.log('== Datos de la familia');
    await paso('abre la matrícula en línea, elige el grado y llena los datos', async () => {
      await page.goto(BASE + '/matricula-en-linea');
      await page.getByRole('tab', { name: nivel.nombre }).click();
      await page.locator('.mel-grado', { hasText: grado.nombre }).click();
      await page.getByRole('button', { name: 'Continuar' }).click();
      await page.waitForSelector('#a-doc');
      await page.fill('#a-doc', '88' + sufijo);
      await page.fill('#a-nom', 'UI');
      await page.fill('#a-ap', 'Prueba Descuento Web');
      await page.fill('#a-am', sufijo);
      await page.fill('#a-fn', '2018-05-10');
      await page.fill('#p-doc', '89' + sufijo);
      await page.fill('#p-nom', 'UI');
      await page.fill('#p-ape', 'Prueba Apoderado ' + sufijo);
      await page.fill('#p-tel', '987654321');
    }, page);
    await paso('el campo trampa anti-robots es de solo lectura (el navegador no lo autocompleta)', async () => {
      const trampa = page.locator('.mel-trampa input');
      esperar(await trampa.getAttribute('readonly') !== null, 'el campo trampa no es de solo lectura');
      esperar(await trampa.inputValue() === '', 'el campo trampa no está vacío');
    }, page);
    // Simula lo que hace un autocompletado: pone texto en el campo trampa sin que la persona lo toque.
    await page.evaluate(() => { const i = document.querySelector('.mel-trampa input'); i.value = 'https://autocompletado.example'; i.dispatchEvent(new Event('input', { bubbles: true })); });
    await page.getByRole('button', { name: 'Revisar y pagar' }).click();
    await page.waitForSelector('.mel-cuenta');

    console.log('== Costos y código de descuento');
    await paso('sin código: matrícula y pensión sin descuento, y el campo «¿Tienes un código de descuento?» a la vista', async () => {
      const c = await costos();
      esperar(c.includes(`S/ ${dinero(base)}`), 'no muestra la matrícula: ' + c);
      esperar(!/Descuento/.test(c.replace(/¿Tienes un código de descuento\?/, '')), 'muestra un descuento sin haber puesto código: ' + c);
      esperar(await page.getByText('¿Tienes un código de descuento?').isVisible(), 'falta el campo del código');
      await page.screenshot({ path: `${CAPTURAS}/01-sin-codigo.png`, fullPage: true });
    }, page);
    await paso('un código que no existe avisa con un mensaje claro y no cambia los costos', async () => {
      await page.fill('#mel-codigo-in', 'NOEXISTE' + sufijo);
      await page.getByRole('button', { name: 'Aplicar' }).click();
      await hasta(costos, x => /no existe o ya no está vigente/.test(x), 'no avisó que el código no existe');
      esperar(!(await costos()).includes('Matrícula a pagar ahora S/ ' + dinero(total)), 'cambió el total con un código inválido');
    }, page);
    await paso('un código válido (en minúsculas) aplica el descuento: matrícula, pensión por cuota y total', async () => {
      await page.fill('#mel-codigo-in', CODIGO.toLowerCase());
      await page.keyboard.press('Enter');
      const c = await hasta(costos, x => x.includes(`Código ${CODIGO}`), 'no aplicó el código');
      esperar(c.includes('UI Prueba web') && c.includes('10 %'), 'no muestra el nombre y el valor del descuento: ' + c);
      esperar(c.includes(`− S/ ${dinero(desc)}`), `no muestra el descuento de la matrícula (S/ ${dinero(desc)}): ${c}`);
      esperar(c.includes(`Matrícula a pagar ahora S/ ${dinero(total)}`), `no muestra el total S/ ${dinero(total)}: ${c}`);
      esperar(c.includes(`S/ ${dinero(mensualDesc)}`) && c.includes('Descuento en las pensiones'), `no muestra las pensiones con descuento (S/ ${dinero(mensualDesc)} por cuota): ${c}`);
      await page.screenshot({ path: `${CAPTURAS}/02-con-codigo.png`, fullPage: true });
    }, page);
    await paso('«Quitar» deja los costos originales y se puede volver a aplicar', async () => {
      await page.getByRole('button', { name: 'Quitar' }).click();
      await hasta(costos, x => !x.includes(`Código ${CODIGO}`) && x.includes(`Matrícula a pagar ahora S/ ${dinero(base)}`), 'no volvió a los costos originales');
      await page.fill('#mel-codigo-in', CODIGO);
      await page.getByRole('button', { name: 'Aplicar' }).click();
      await hasta(costos, x => x.includes(`Código ${CODIGO}`), 'no volvió a aplicar el código');
    }, page);

    console.log('== Reservar y pagar');
    await paso('un autocompletado del navegador (campo trampa lleno) ya no muestra «Solicitud no válida»: avisa con claridad y deja reintentar', async () => {
      await page.getByLabel(/Acepto el tratamiento/).check();
      await page.getByRole('button', { name: 'Pagar la matrícula' }).click();
      const t = await hasta(texto, x => /No pudimos validar el envío/.test(x), 'no mostró el mensaje amable');
      esperar(!/Solicitud no válida/.test(t), 'sigue mostrando «Solicitud no válida»');
      await page.screenshot({ path: `${CAPTURAS}/03-trampa.png`, fullPage: true });
    }, page);
    await paso('al reintentar reserva la vacante y abre el pago con el descuento aplicado', async () => {
      await page.getByRole('button', { name: 'Pagar la matrícula' }).click();
      await page.waitForSelector('#t-num', { state: 'attached' });
      const boton = (await page.locator('button[form=form-tarjeta]').innerText()).replace(/\s+/g, ' ');
      esperar(boton.includes(`Pagar S/ ${dinero(total)}`), `el botón de pago no dice S/ ${dinero(total)}: ${boton}`);
      await page.screenshot({ path: `${CAPTURAS}/04-pago.png`, fullPage: true });
    }, page);
    await paso('el servidor tiene la cuota de matrícula con el descuento y el descuento asignado al alumno', async () => {
      const cuota = psql('e2e-pg-pago', 'pago_db', `select c.monto_base || '|' || c.descuento || '|' || c.saldo from cuotas c join matriculas_local m on m.matricula_id = c.matricula_id where m.alumno_nombre like '%${sufijo}%' limit 1`);
      esperar(cuota === `${dinero(base)}|${dinero(desc)}|${dinero(total)}`, 'cuota: ' + cuota);
      esperar(psql('e2e-pg-pago', 'pago_db', `select count(*) from descuentos_alumno where descuento_id = ${d.id}`) === '1', 'el descuento no quedó asignado al alumno');
    }, page);
    await paso('con la matrícula reservada el código aparece aplicado y ya no se puede quitar', async () => {
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('#t-num', { state: 'detached' });
      const c = await costos();
      esperar(c.includes(`Código ${CODIGO}`) && c.includes(`Matrícula a pagar ahora S/ ${dinero(total)}`), 'costos: ' + c);
      esperar(await page.getByRole('button', { name: 'Quitar' }).count() === 0, 'no debería poder quitar el código de una reserva hecha');
    }, page);
    await paso('sin errores de consola ni respuestas inesperadas (salvo el 400 buscado del campo trampa, el 409 del código inválido y 429)', async () => {
      esperar(!erroresConsola.filter(e => !/429|status of 4(00|09)/.test(e)).length, 'consola: ' + erroresConsola.slice(0, 3).join(' | '));
      const malas = respuestasMalas.filter(r => !/^429/.test(r) && !/POST \/api\/v1\/publico\/matricula$/.test(r) && !/GET \/api\/v1\/publico\/matricula\/descuento\//.test(r));
      esperar(!malas.length, 'respuestas: ' + malas.slice(0, 4).join(' | '));
    }, page);
  } finally {
    // ---- Limpieza: se anula la reserva y se da de baja al alumno; el descuento de prueba se quita del catálogo ----
    try {
      const mid = psql('e2e-pg-matricula', 'matricula_db', `select m.id from matriculas m join matriculas_publicas p on p.matricula_id = m.id where p.alumno_documento = '88${sufijo}' limit 1`);
      if (mid) await api('PATCH', `/matriculas/${mid}/anular`, { motivo: 'Fin de la prueba' });
      const aid = psql('e2e-pg-alumnos', 'alumnos_db', `select id from alumnos where numero_documento = '88${sufijo}'`);
      if (aid) await api('PATCH', `/alumnos/${aid}/estado`, { estado: 'INACTIVO', motivo: 'Prueba de descuento por código' });
    } catch (e) { console.log('(limpieza parcial: ' + String(e.message).split('\n')[0] + ')'); }
    try { psql('e2e-pg-pago', 'pago_db', `delete from descuentos_alumno where descuento_id = ${d.id}; delete from descuentos where id = ${d.id}`); } catch { /* ya no está */ }
    await browser.close();
  }
  const fallos = resultados.filter(r => !r.ok).length;
  console.log(`\n${resultados.length - fallos}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
