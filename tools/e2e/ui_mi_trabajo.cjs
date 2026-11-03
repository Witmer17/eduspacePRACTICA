/*
 * Recorrido de «Mi trabajo» con Chrome real (Playwright): un docente ve SU contrato, asistencia con descuento estimado, pagos y cuenta de depósito,
 * sin nada de otra persona; caja sin contrato ni cuenta; una cuenta sin ficha recibe el aviso; y todo cabe en un celular.
 *
 * Uso: python3 tools/e2e/13_mi_trabajo.py --preparar   (crea los datos y los deja en /tmp/mi_trabajo_estado.json)
 *      NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_mi_trabajo.cjs [urlBase] [carpetaCapturas]
 *      python3 tools/e2e/13_mi_trabajo.py --limpiar    (quita los datos de prueba; lo hace ui_mi_trabajo.sh)
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas-mi-trabajo';
const E = JSON.parse(fs.readFileSync('/tmp/mi_trabajo_estado.json', 'utf8'));
const CLAVE = 'Clave12345';

const resultados = [];
const erroresConsola = [];
const respuestasMalas = [];
let n = 0;

async function paso(nombre, fn, page) {
  try {
    await fn();
    resultados.push({ ok: true, nombre });
    console.log('  OK  ' + nombre);
  } catch (e) {
    resultados.push({ ok: false, nombre });
    console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n').slice(0, 3).join('\n      '));
    try { await page.screenshot({ path: `${CAPTURAS}/${String(++n).padStart(2, '0')}-error.png`, fullPage: true }); } catch { /* sin captura */ }
  }
}
const esperar = (cond, msg) => { if (!cond) throw new Error(msg); };
async function hasta(leer, ok, msg, ms = 8000) {
  const fin = Date.now() + ms;
  let ultimo;
  while (Date.now() < fin) {
    ultimo = await leer();
    if (ok(ultimo)) return ultimo;
    await new Promise(r => setTimeout(r, 120));
  }
  throw new Error(msg + (ultimo !== undefined ? ' — último valor: ' + String(ultimo).replace(/\s+/g, ' ').slice(0, 300) : ''));
}

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });

  async function sesion(usuario, viewport = { width: 1440, height: 900 }) {
    const ctx = await browser.newContext({ viewport, locale: 'es-PE' });
    const page = await ctx.newPage();
    page.setDefaultTimeout(15000);
    page.on('console', m => { if (m.type() === 'error') erroresConsola.push(`${usuario}: ${m.text().slice(0, 200)}`); });
    page.on('pageerror', e => erroresConsola.push(`${usuario} pageerror: ${String(e).slice(0, 200)}`));
    page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${usuario}: ${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
    await page.goto(BASE + '/login');
    await page.fill('#username', usuario);
    await page.fill('#password', CLAVE);
    await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    return { ctx, page };
  }
  const texto = async page => (await page.locator('main, .page').first().innerText()).replace(/\s+/g, ' ');

  console.log('== docente: entra por su inicio');
  let { ctx, page } = await sesion(E.docente);
  await paso('al entrar cae en el inicio del docente, que ofrece «Mi trabajo»', async () => {
    esperar(page.url().includes('/docente/inicio'), 'no cayó en /docente/inicio: ' + page.url());
    await page.locator('a[href="/mi-trabajo"]').first().waitFor();
  }, page);
  await paso('el menú tiene «Mi trabajo»', async () => {
    const barra = await page.locator('header a[href="/mi-trabajo"], nav a[href="/mi-trabajo"]').count();
    esperar(barra > 0, 'no hay «Mi trabajo» en la barra superior del docente');
  }, page);
  await paso('desde el inicio llega a Mi trabajo', async () => {
    await page.locator('a.enlace[href="/mi-trabajo"]').click();
    await page.waitForURL(/\/mi-trabajo/);
    await hasta(() => texto(page), t => t.includes('Mi contrato'), 'no se pintó la página');
  }, page);

  console.log('== docente: lo suyo');
  await paso('la cabecera dice su cargo y su área', async () => {
    const t = await hasta(() => texto(page), x => x.includes('Docente de aula'), 'no aparece su cargo');
    esperar(/Docencia/i.test(t), 'no aparece su área: ' + t.slice(0, 200));
  }, page);
  await paso('contrato: plazo fijo, S/ 1 500, vigente, hasta el 31 de dic', async () => {
    const t = await hasta(() => texto(page), x => /Plazo fijo/.test(x) && /1[ ,.]?500/.test(x), 'faltan datos del contrato');
    esperar(/Vigente|Por vencer/.test(t), 'no dice vigente: ' + t.slice(0, 300));
  }, page);
  await paso('asistencia del mes: 1 presente, 1 falta y descuento estimado de un día (S/ 50)', async () => {
    const t = await hasta(() => texto(page), x => /Descuento estimado/.test(x), 'no aparece el descuento estimado');
    esperar(/50/.test(t.split('Descuento estimado')[1] || ''), 'el descuento no es de S/ 50 (sueldo ÷ 30): ' + t.split('Descuento estimado')[1]?.slice(0, 120));
    esperar(/Presentes\s*1|1\s*Presentes/.test(t), 'no cuenta 1 presente');
  }, page);
  await paso('pagos: el descuento pendiente y el sueldo pagado, con lo cobrado en el año', async () => {
    const t = await hasta(() => texto(page), x => /Mis pagos/.test(x) && /Descuento/.test(x), 'no aparecen los pagos');
    esperar(/Sueldo/.test(t), 'falta el sueldo');
    esperar(/Pagado/.test(t), 'falta el pagado');
    esperar(/Pendiente/.test(t), 'falta el pendiente');
  }, page);
  await paso('cuenta de depósito: BCP con el número oculto y «Principal»', async () => {
    const t = await hasta(() => texto(page), x => /Dónde me depositan/.test(x) && /BCP/.test(x), 'no aparece la cuenta');
    esperar(/•••• 8901/.test(t), 'el número no está enmascarado: ' + t.slice(-300));
    esperar(!t.includes('19412345678901'), 'se ve el número completo');
    esperar(/Principal/.test(t), 'no dice principal');
  }, page);
  await paso('NO aparece nada de la otra persona (su Yape, su sueldo de S/ 2 000)', async () => {
    const t = await texto(page);
    esperar(!/Yape/i.test(t), 'aparece el Yape del colega');
    esperar(!/2[ ,.]?000/.test(t), 'aparece el sueldo del colega');
    esperar(!/Mi Trabajo Dos/.test(t), 'aparece el nombre del colega');
  }, page);
  await paso('cambiar a un mes sin registros avisa que no hay asistencia', async () => {
    await page.fill('input[type=month]', '2026-03');
    await hasta(() => texto(page), x => /No hay asistencia registrada en/.test(x), 'no avisó que no hay asistencia');
  }, page);
  await page.fill('input[type=month]', new Date().toISOString().slice(0, 7));
  await page.screenshot({ path: `${CAPTURAS}/docente.png`, fullPage: true });
  await paso('no hay botones de editar: es solo lectura', async () => {
    const botones = await page.locator('main button, .page button').allInnerTexts();
    esperar(!botones.some(b => /guardar|editar|eliminar|agregar|quitar/i.test(b)), 'hay botones de cambio: ' + botones.join(' | '));
  }, page);
  await paso('un docente no puede abrir el pago al personal del administrador', async () => {
    await page.goto(BASE + '/personal/pagos');
    await page.waitForLoadState('networkidle');
    esperar(!page.url().includes('/personal/pagos'), 'abrió /personal/pagos');
  }, page);
  await ctx.close();

  console.log('== caja: sin contrato ni cuenta');
  ({ ctx, page } = await sesion(E.caja));
  await paso('caja entra a Mi trabajo y ve avisos claros, sin datos ajenos', async () => {
    await page.goto(BASE + '/mi-trabajo');
    const t = await hasta(() => texto(page), x => /Todavía no tienes un contrato/.test(x), 'no avisa que no hay contrato');
    esperar(/No tienes una cuenta registrada/.test(t), 'no avisa que falta la cuenta');
    esperar(/Todavía no tienes pagos/.test(t), 'no avisa que no hay pagos');
    esperar(!/BCP|Yape/i.test(t), 'aparece una cuenta ajena');
  }, page);
  await ctx.close();

  console.log('== cuenta sin ficha');
  ({ ctx, page } = await sesion(E.sin_ficha));
  await paso('la cuenta sin ficha del personal recibe el aviso de vincularla', async () => {
    await page.goto(BASE + '/mi-trabajo');
    await hasta(() => texto(page), x => /no está vinculada a tu ficha/.test(x), 'no mostró el aviso');
    const t = await texto(page);
    esperar(!/Dónde me depositan|Mis pagos|Mi asistencia/.test(t), 'muestra secciones sin tener ficha');
  }, page);
  await ctx.close();

  console.log('== celular 390×844');
  ({ ctx, page } = await sesion(E.docente, { width: 390, height: 844 }));
  await paso('en el celular Mi trabajo cabe sin desplazarse de lado', async () => {
    await page.goto(BASE + '/mi-trabajo');
    await hasta(() => texto(page), x => /Dónde me depositan/.test(x) && /BCP/.test(x), 'no cargó');
    const ancho = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, ven: window.innerWidth }));
    esperar(ancho.doc <= ancho.ven + 1, `hay desplazamiento horizontal: ${ancho.doc} > ${ancho.ven}`);
    await page.screenshot({ path: `${CAPTURAS}/celular.png`, fullPage: true });
  }, page);
  await ctx.close();

  await browser.close();
  // Esperados: el 404 de la cuenta sin ficha (es lo que se prueba) y los 429 del límite del Gateway.
  const malas = respuestasMalas.filter(r => !r.includes(' 429 ') && !(r.startsWith(E.sin_ficha + ':') && r.includes(' 404 ')));
  console.log('\n== consola y red');
  const sinRuido = erroresConsola.filter(e => !/429|status of 4(01|03|04)/.test(e));
  console.log('  errores de consola:', sinRuido.length, sinRuido.slice(0, 5));
  console.log('  respuestas >= 400 inesperadas:', malas.length, malas.slice(0, 8));
  const fallos = resultados.filter(r => !r.ok).length + (sinRuido.length ? 1 : 0) + (malas.length ? 1 : 0);
  console.log(`\nPASOS: ${resultados.length - resultados.filter(r => !r.ok).length}/${resultados.length} OK` + (fallos ? `  —  ${fallos} problema(s)` : ''));
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
