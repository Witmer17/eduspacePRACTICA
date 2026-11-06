/*
 * Recorrido de la interfaz con Chrome real (Playwright): registrar a un docente con contrato y cursos, marcar su asistencia, pagarle desde
 * la tarjeta con descuento por inasistencias y repartir dinero de caja a un área.
 *
 * Uso (la librería se instala FUERA del proyecto, p. ej. en /tmp/pw-ui):
 *   NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_personal.cjs [urlBase] [carpetaCapturas]
 * Requiere la web en http://localhost:4200, el Gateway, Keycloak y los servicios levantados, y al menos S/ 500 cobrados en pago-ms para el
 * paso del reparto. Deja datos de prueba (una persona «Prueba UI» dada de baja, con su contrato y pagos).
 */
const { chromium } = require('playwright-core');

const BASE = process.argv[2] || 'http://localhost:4200';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas';
const sufijo = String(Date.now()).slice(-7);
const DOC = '6' + sufijo;                  // documento único
const NOMBRE = 'UI', APELLIDO = 'Prueba Docente ' + sufijo.slice(-3);

const resultados = [];
const erroresConsola = [];
const respuestasMalas = [];
let n = 0;

async function paso(nombre, fn, page) {
  try {
    await fn();
    resultados.push({ ok: true, nombre });
    console.log('  OK  ' + nombre);
    return true;
  } catch (e) {
    resultados.push({ ok: false, nombre, motivo: String(e.message).split('\n')[0] });
    console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n').slice(0, 3).join('\n      '));
    try { await page.screenshot({ path: `${CAPTURAS}/${String(++n).padStart(2, '0')}-error.png`, fullPage: true }); } catch { /* sin captura */ }
    return false;
  }
}
const esperar = (cond, msg) => { if (!cond) throw new Error(msg); };
/** Repite la lectura hasta que se cumpla (Angular repinta un instante después del clic) o se acaba el tiempo. */
async function hasta(leer, ok, msg, ms = 8000) {
  const fin = Date.now() + ms;
  let ultimo;
  while (Date.now() < fin) {
    ultimo = await leer();
    if (ok(ultimo)) return ultimo;
    await new Promise(r => setTimeout(r, 120));
  }
  throw new Error(msg + (ultimo !== undefined ? ' — último valor: ' + String(ultimo).replace(/\s+/g, ' ').slice(0, 240) : ''));
}

(async () => {
  require('fs').mkdirSync(CAPTURAS, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-PE' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);
  page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`); });
  const foto = nombre => page.screenshot({ path: `${CAPTURAS}/${nombre}.png`, fullPage: true });

  console.log('== ingreso');
  await paso('inicia sesión como administrador', async () => {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
  }, page);

  console.log('== Personal: tabla y pestañas');
  await paso('la tabla de Personal tiene las columnas ordenadas y sin pagos', async () => {
    await page.goto(BASE + '/personal');
    await page.waitForSelector('table.tabla-personal');
    const cab = (await page.locator('table.tabla-personal thead th').allInnerTexts()).map(t => t.trim().toLowerCase());
    esperar(cab.join('|') === 'persona|área y cursos|documento|contacto|estado|acciones', 'columnas: ' + cab.join('|'));
    await foto('01-personal');
  }, page);
  await paso('el espacio Personal tiene las pestañas Pago al personal y Asistencia del personal', async () => {
    const t = (await page.locator('nav.pestanas, nav.menu-v').first().innerText()).toLowerCase();
    esperar(t.includes('pago al personal') && t.includes('asistencia del personal'), 'menú: ' + t.replace(/\n/g, ' | '));
  }, page);

  console.log('== Agregar docente: datos → contrato → cursos');
  let creado = false;
  await paso('abre «Agregar personal» con el indicador de pasos y el botón de continuar', async () => {
    await page.click('button:has-text("Agregar personal")');
    await page.waitForSelector('app-modal #form-personal');
    const pasos = (await page.locator('app-modal ol.pasos li:not(.separador)').allInnerTexts()).map(t => t.replace(/\s+/g, ' ').trim());
    esperar(pasos.length === 4, 'se esperaban 4 pasos (datos, contrato, cuenta de depósito, cursos): ' + pasos.join(' / '));
    esperar(/Cuenta de depósito/.test(pasos.join(' ')), 'falta el paso de la cuenta de depósito: ' + pasos.join(' / '));
    esperar(await page.getByRole('button', { name: /Guardar y seguir: contrato y cursos/ }).isVisible(), 'falta el botón «Guardar y seguir»');
  }, page);
  await paso('los cursos NO se piden en los datos (se eligen una sola vez, en el paso «Cursos»)', async () => {
    esperar(await page.locator('app-modal .bloque-cursos, app-modal .lista-cursos').count() === 0, 'sigue la lista de cursos en el primer paso');
    esperar(!(await page.locator('app-modal').innerText()).includes('Cursos que dictará'), 'sigue el título «Cursos que dictará»');
    esperar((await page.locator('app-modal').innerText()).includes('paso «Cursos»'), 'no explica dónde se eligen los cursos');
  }, page);
  await paso('rellena los datos del docente', async () => {
    await page.fill('#p-num', DOC);
    await page.fill('#p-nombres', NOMBRE);
    await page.fill('#p-apellidos', APELLIDO);
    await page.fill('#p-email', `ui${sufijo}@colegio.pe`);
    await page.fill('#p-cargo', 'Docente de Matemática');
  }, page);
  await paso('«Guardar y seguir» pasa al contrato en la misma ventana', async () => {
    await page.getByRole('button', { name: /Guardar y seguir: contrato y cursos/ }).click();
    await page.waitForSelector('app-modal .contrato-layout');
    const titulo = await page.locator('app-modal h2, app-modal .modal-titulo, app-modal header').first().innerText();
    esperar(titulo.includes('Contrato de ' + NOMBRE), 'título: ' + titulo);
    esperar(await page.locator('.exito-paso').innerText().then(t => t.includes('quedó registrada')), 'no aparece la confirmación de la persona guardada');
    creado = true;
    // Los títulos de sección no deben montarse sobre el campo que sigue (antes tenían margen negativo y se solapaban).
    const solape = await page.evaluate(() => {
      const f = [...document.querySelectorAll('.contrato-layout form .sec-form')];
      return f.map(h => { const sig = h.nextElementSibling.getBoundingClientRect(); return sig.top - h.getBoundingClientRect().bottom; });
    });
    esperar(solape.length === 3 && solape.every(d => d >= 0), 'los títulos de sección se solapan con el campo siguiente: ' + solape.join(', '));
    // Sin fecha de fin elegida, un plazo fijo no puede decir «sin fin» ni «Indefinido».
    const vista = (await page.locator('.vista-contrato').innerText()).replace(/\s+/g, ' ');
    esperar(vista.includes('elige la fecha de fin') && !/Duración\s*Indefinido/.test(vista), 'la vista previa engaña con el plazo fijo sin fin: ' + vista);
    await foto('02-contrato');
  }, page);
  await paso('el resumen se actualiza en vivo (atajo 6 meses, sueldo 1500, valor del día)', async () => {
    esperar(creado, 'no se guardó la persona');
    await page.getByRole('button', { name: '6 meses' }).click();
    await page.fill('#ct-rem', '1500');
    const leer = async () => (await page.locator('.vista-contrato').innerText()).replace(/\s+/g, ' ');
    const v = await hasta(leer, t => t.includes('Todo listo para crear el contrato'), 'el resumen no quedó listo');
    esperar(/Duración\s*6 meses/.test(v), 'duración: ' + v);
    esperar(/Sueldo mensual\s*S\/\s*1,?500\.00/.test(v), 'sueldo: ' + v);
    esperar(/Valor del día\s*S\/\s*\d+\.\d\d/.test(v), 'valor del día: ' + v);
    await foto('03-contrato-listo');
  }, page);
  await paso('sin sueldo el botón «Crear contrato» se bloquea y dice qué falta', async () => {
    esperar(creado, 'no se guardó la persona');
    await page.fill('#ct-rem', '0');
    await hasta(() => page.locator('.vista-contrato').innerText(), t => t.includes('Indica el sueldo mensual'), 'no avisa que falta el sueldo');
    await hasta(() => page.getByRole('button', { name: /Crear contrato/ }).isDisabled(), d => d, 'el botón debería estar deshabilitado');
    await page.fill('#ct-rem', '1500');
    await hasta(() => page.getByRole('button', { name: /Crear contrato/ }).isEnabled(), e => e, 'el botón debería volver a habilitarse');
  }, page);
  await paso('el contrato NO vuelve a pedir el cargo (lo hereda de los datos)', async () => {
    esperar(creado, 'no se guardó la persona');
    esperar(await page.locator('#ct-cargo').count() === 0, 'el contrato sigue pidiendo el cargo');
  }, page);
  await paso('crea el contrato y sigue a la cuenta de depósito', async () => {
    esperar(creado, 'no se guardó la persona');
    await page.getByRole('button', { name: /Crear contrato y seguir/ }).click();
    await hasta(() => page.locator('app-modal').innerText(), t => t.includes('Cuenta de depósito de ' + NOMBRE), 'no llegó al paso de la cuenta de depósito');
    await page.waitForSelector('app-modal #form-cuenta');
    esperar(await page.inputValue('#cu-titular') === `${NOMBRE} ${APELLIDO}`, 'el titular no viene con el nombre de la persona');
    await foto('04-deposito');
  }, page);
  await paso('la cuenta valida en vivo: número corto, Yape sin CCI y botón de guardar', async () => {
    esperar(creado, 'no se guardó la persona');
    await page.fill('#cu-numero', '123');
    await hasta(() => page.locator('app-modal').innerText(), t => t.includes('entre 8 y 20 dígitos'), 'no avisa que el número es corto');
    await page.getByRole('button', { name: /Guardar cuenta y seguir/ }).click();
    await hasta(() => page.locator('app-modal .aviso-danger').innerText(), t => t.includes('8 y 20 dígitos'), 'guardó con un número inválido');
    await page.selectOption('#cu-banco', 'YAPE');
    esperar(await page.locator('#cu-cci').count() === 0, 'Yape no debería pedir CCI');
    esperar(await page.inputValue('#cu-tipo') === 'BILLETERA', 'Yape debería poner el tipo en Billetera');
    await page.selectOption('#cu-banco', 'BCP');
    esperar(await page.inputValue('#cu-tipo') === 'AHORROS', 'al volver a un banco el tipo debería volver a Ahorros');
    await page.fill('#cu-numero', '194-12345678-0-12');
  }, page);
  await paso('guarda la cuenta y sigue a «Cursos»', async () => {
    esperar(creado, 'no se guardó la persona');
    await page.getByRole('button', { name: /Guardar cuenta y seguir/ }).click();
    await hasta(() => page.locator('app-modal').innerText(), t => t.includes('Cursos de ' + NOMBRE), 'no llegó al paso de cursos');
    await page.waitForSelector('app-modal .carga-asig');
    await foto('05-cursos');
  }, page);
  await paso('en «Cursos» se eligen por sección (con buscador) y la carga semanal se actualiza', async () => {
    esperar(creado, 'no se guardó la persona');
    esperar(await page.locator('app-modal .buscar-asig').isVisible(), 'falta el buscador de cursos');
    await page.fill('.buscar-asig', 'Matemática');
    const libre = page.locator('app-modal .curso-asig:not(.ocupado) input[type=checkbox]:not(:disabled)').first();
    await libre.waitFor();
    await libre.check();
    await hasta(() => page.locator('.carga-asig').innerText(), t => /\+[1-9]\d* h/.test(t), 'la carga no sumó horas');
    await foto('06-cursos-elegidos');
  }, page);
  await paso('asigna los cursos y la ventana se cierra', async () => {
    esperar(creado, 'no se guardó la persona');
    await page.getByRole('button', { name: /^Asignar \d+ cursos?$/ }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('la persona aparece en la tabla de Personal y lo asignado quedó como su lista de cursos', async () => {
    await page.fill('input[type=search]', DOC);
    await page.click('button:has-text("Buscar")');
    const fila = page.locator(`table.tabla-personal tbody tr:has-text("${APELLIDO}")`);
    await fila.waitFor();
    await hasta(() => fila.innerText(), t => /1 curso: Matem/.test(t.replace(/\s+/g, ' ')), 'la lista de cursos del docente no se actualizó con lo asignado');
  }, page);

  console.log('== Asistencia del personal');
  await paso('marca una falta hoy a la persona y guarda el día', async () => {
    await page.goto(BASE + '/personal/asistencia');
    await page.waitForSelector('table.tabla-asistencia tbody tr');
    await page.fill('input[type=search]', DOC);
    const fila = page.locator('table.tabla-asistencia tbody tr', { hasText: APELLIDO });
    await fila.waitFor();
    await fila.locator('select').selectOption('FALTA');
    esperar(await fila.locator('input[type=time]').first().isDisabled(), 'una falta no debería llevar hora');
    await page.getByRole('button', { name: 'Guardar el día' }).click();
    await page.waitForFunction(() => document.body.innerText.includes('Asistencia guardada'));
    await foto('06-asistencia');
  }, page);
  await paso('el resumen del mes muestra la falta', async () => {
    await page.getByRole('tab', { name: 'Resumen del mes' }).click();
    await page.waitForSelector('table.tabla-asistencia th:has-text("Justificada")');
    const fila = page.locator('table.tabla-asistencia tbody tr', { hasText: APELLIDO });
    await fila.waitFor();
    // Se espera a que lleguen los datos del mes (mientras cargan, las celdas muestran «…»).
    const celdas = await hasta(() => fila.locator('td.num').allInnerTexts(), c => c.length >= 3 && !c.some(x => x.includes('…')), 'los datos del mes no terminaron de cargar');
    esperar(celdas[2].trim() === '1', 'faltas del mes: ' + celdas.join(','));
  }, page);

  console.log('== Pago al personal (tarjetas)');
  await paso('la tarjeta muestra contrato, periodo, sueldo y la asistencia del mes', async () => {
    await page.goto(BASE + '/personal/pagos');
    await page.fill('input[type=search]', DOC);
    const t = page.locator('article.tarjeta', { hasText: APELLIDO });
    await t.waitFor();
    const txt = (await t.innerText()).replace(/\s+/g, ' ');
    esperar(/Vigente/.test(txt) && /Plazo fijo/.test(txt), 'contrato: ' + txt.slice(0, 200));
    esperar(/S\/\s*1,?500\.00/.test(txt), 'sueldo: ' + txt.slice(0, 300));
    esperar(/BCP/.test(txt) && /8012/.test(txt), 'la cuenta de depósito registrada en el asistente no aparece en la tarjeta: ' + txt.slice(0, 400));
    esperar(await t.locator('.dia.danger strong').innerText().then(x => x.trim() === '1'), 'la falta no aparece en la tarjeta');
    await foto('07-tarjeta');
  }, page);
  await paso('el desglose usa sueldo ÷ días del mes y 8 tardanzas = 1 día', async () => {
    const t = page.locator('article.tarjeta', { hasText: APELLIDO });
    const c = (await t.locator('.calculo').innerText()).replace(/\s+/g, ' ');
    const dias = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const valor = (Math.round(1500 / dias * 100) / 100).toFixed(2);
    esperar(c.includes(`÷ ${dias} días`), `divisor distinto de ${dias}: ${c}`);
    esperar(c.includes(valor), `valor del día ${valor}: ${c}`);
    esperar(/8 = 1 día/.test(c), 'falta la regla de 8 tardanzas: ' + c);
    esperar(/A descontar: 1 día/.test(c), 'debería descontar 1 día: ' + c);
  }, page);
  await paso('genera la planilla del mes y aparece el sueldo pendiente', async () => {
    await page.getByRole('button', { name: /Generar planilla de/ }).click();
    const t = page.locator('article.tarjeta', { hasText: APELLIDO });
    await t.locator('.lineas li').first().waitFor();
    esperar(await t.locator('.lineas').innerText().then(x => x.includes('Sueldo')), 'no aparece la línea de sueldo');
    // El botón tiene aria-label «Pagar a <persona>» (el monto va en el texto visible).
    await hasta(() => t.getByRole('button', { name: /^Pagar a / }).isVisible(), v => v, 'falta el botón Pagar');
  }, page);
  await paso('descuenta la inasistencia (con confirmación) y el neto baja', async () => {
    const t = page.locator('article.tarjeta', { hasText: APELLIDO });
    await t.getByRole('button', { name: /Descontar inasistencias/ }).click();
    await page.getByRole('button', { name: 'Descontar', exact: true }).click();
    await t.locator('.lineas li', { hasText: 'Descuento' }).waitFor();
    const dias = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const neto = (1500 - Math.round(1500 / dias * 100) / 100).toFixed(2);
    const txt = (await t.innerText()).replace(/\s+/g, ' ');
    esperar(txt.includes(neto.replace(/\B(?=(\d{3})+(?!\d))/g, ',')) || txt.includes(neto), `neto esperado ${neto}: ${txt.slice(-300)}`);
    esperar(await t.getByRole('button', { name: /Descontar inasistencias/ }).count() === 0, 'el botón de descontar debería desaparecer (ya está descontado)');
    await foto('08-descontado');
  }, page);
  await paso('paga desde la tarjeta y queda «Pagado»', async () => {
    const t = page.locator('article.tarjeta', { hasText: APELLIDO });
    await t.getByRole('button', { name: /^Pagar a / }).click();
    await page.waitForSelector('app-modal .neto'); // app-modal no tiene caja propia: se espera a su contenido
    esperar((await page.locator('app-modal .neto').innerText()).replace(/\s+/g, ' ').includes('1,450.00'), 'el modal debería pedir pagar S/ 1,450.00');
    await page.getByRole('button', { name: 'Confirmar pago' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await t.locator('header .badge', { hasText: 'Pagado' }).waitFor();
    esperar(await t.getByRole('button', { name: /^Pagar a / }).count() === 0, 'ya no debería haber nada por pagar');
    await foto('09-pagado');
  }, page);

  console.log('== Áreas de trabajo: dinero de caja');
  let disponible0 = null;
  const dinero = txt => Number(txt.replace(/[^\d.\-−]/g, '').replace('−', '-'));
  await paso('muestra el disponible en caja y el dinero de cada área', async () => {
    await page.goto(BASE + '/configuracion/areas');
    await page.waitForSelector('.tile-caja.principal strong');
    disponible0 = dinero(await page.locator('.tile-caja.principal strong').innerText());
    esperar(disponible0 >= 500, 'hacen falta al menos S/ 500 cobrados para esta prueba (hay ' + disponible0 + ')');
    esperar(await page.locator('article.area .dinero-area').count() > 0, 'las áreas no muestran su dinero');
    await foto('10-areas');
  }, page);
  await paso('no deja asignar más de lo que hay en caja', async () => {
    esperar(disponible0 !== null, 'sin lectura de caja');
    await page.locator('article.area').first().getByRole('button', { name: 'Asignar dinero' }).click();
    await page.fill('#mf-monto', String(disponible0 + 50));
    await hasta(() => page.locator('.vista-caja').innerText(), t => t.includes('No alcanza: faltan S/ 50.00'), 'no avisa que faltan S/ 50.00');
    await hasta(() => page.locator('app-modal button[type=submit]').isDisabled(), d => d, 'el botón debería estar deshabilitado');
  }, page);
  await paso('asigna S/ 300 con atajos y la caja baja 300', async () => {
    esperar(disponible0 !== null, 'sin lectura de caja');
    await page.fill('#mf-monto', '0');
    await page.getByRole('button', { name: '+ S/ 100' }).click();
    await page.getByRole('button', { name: '+ S/ 100' }).click();
    await page.getByRole('button', { name: '+ S/ 100' }).click();
    await hasta(() => page.inputValue('#mf-monto'), v => v === '300', 'el atajo no sumó 300');
    const esperada = `quedará en S/ ${(disponible0 - 300).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    await hasta(async () => (await page.locator('.vista-caja').innerText()).replace(/\s+/g, ' '), t => t.includes('Salen S/ 300.00') && t.includes(esperada), 'la vista previa no dice «Salen S/ 300.00 … ' + esperada + '»');
    await page.fill('#mf-motivo', 'Prueba de interfaz');
    await page.locator('app-modal button[type=submit]').click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    const ahora = dinero(await page.locator('.tile-caja.principal strong').innerText());
    esperar(Math.abs(ahora - (disponible0 - 300)) < 0.01, `la caja debía quedar en ${disponible0 - 300} y quedó en ${ahora}`);
    await foto('11-areas-asignado');
  }, page);
  await paso('devuelve el dinero a caja dejando el área en 0', async () => {
    esperar(disponible0 !== null, 'sin lectura de caja');
    await page.locator('article.area').first().getByRole('button', { name: 'Asignar dinero' }).click();
    await page.getByRole('button', { name: 'Dejar en 0' }).click();
    await hasta(() => page.locator('.vista-caja').innerText(), t => t.includes('Vuelven S/ 300.00'), 'la vista no dice que vuelven 300');
    await hasta(() => page.locator('.movimientos li').count(), c => c >= 1, 'el historial debería listar el movimiento anterior');
    await page.locator('app-modal button[type=submit]').click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    const ahora = dinero(await page.locator('.tile-caja.principal strong').innerText());
    esperar(Math.abs(ahora - disponible0) < 0.01, `la caja debía volver a ${disponible0} y está en ${ahora}`);
  }, page);

  console.log('== Áreas de trabajo: repartir en una sola ventana');
  const abrirReparto = async () => {
    await page.getByRole('button', { name: 'Repartir dinero entre las áreas' }).click();
    await page.waitForSelector('.reparto-tabla tbody tr');
  };
  const totalReparto = async n => dinero(await page.locator(`.reparto-totales div:nth-child(${n}) strong`).innerText());
  const guardarReparto = () => page.locator('app-modal button[type=submit]');
  let nombresReparto = [];
  await paso('«Repartir dinero entre las áreas» lista todas las áreas, cada una con su campo', async () => {
    await page.goto(BASE + '/configuracion/areas');
    await page.waitForSelector('article.area');
    await page.waitForSelector('.tile-caja.principal strong');
    const activas = await page.locator('article.area:not(.apagada)').count();
    await abrirReparto();
    const filas = await page.locator('.reparto-tabla tbody tr').count();
    esperar(filas >= activas && filas > 1, `hay ${activas} áreas activas y la ventana lista ${filas}`);
    esperar(await page.locator('.reparto-tabla input.monto-reparto').count() === filas, 'cada área debería tener su campo de monto');
    esperar((await guardarReparto().innerText()).includes('Sin cambios'), 'sin tocar nada debería decir «Sin cambios»');
    nombresReparto = await page.locator('.reparto-tabla tbody tr td:first-child strong').allInnerTexts();
    await foto('13-reparto');
  }, page);
  await paso('«partes iguales» reparte todo lo disponible y la caja queda en 0', async () => {
    esperar(disponible0 !== null, 'sin lectura de caja');
    await page.getByRole('button', { name: 'Repartir lo disponible en partes iguales' }).click();
    await hasta(() => totalReparto(3), v => Math.abs(v) < 0.011, 'la caja no quedó en 0');
    esperar(Math.abs((await totalReparto(2)) - disponible0) < 0.011, 'debería salir todo lo disponible de caja');
    await hasta(() => guardarReparto().innerText(), t => /Guardar \d+ cambios/.test(t), 'el botón no cuenta los cambios');
    await foto('14-reparto-iguales');
  }, page);
  await paso('«Dejar todo como estaba» y dos montos a mano: totales, filas resaltadas y botón se actualizan', async () => {
    await page.getByRole('button', { name: 'Dejar todo como estaba' }).click();
    await hasta(() => guardarReparto().innerText(), t => t.includes('Sin cambios'), 'debería volver a «Sin cambios»');
    const campos = page.locator('.reparto-tabla input.monto-reparto');
    await campos.nth(0).fill('100');
    await campos.nth(1).fill('250');
    await hasta(() => totalReparto(2), v => Math.abs(v - 350) < 0.011, 'el cambio neto debería ser 350');
    await hasta(() => totalReparto(3), v => Math.abs(v - (disponible0 - 350)) < 0.011, `la caja debería quedar en ${disponible0 - 350}`);
    await hasta(() => guardarReparto().innerText(), t => t.includes('Guardar 2 cambios'), 'debería decir «Guardar 2 cambios»');
    esperar(await page.locator('.reparto-tabla tr.cambia').count() === 2, 'deberían resaltarse 2 filas');
  }, page);
  await paso('un monto que no alcanza o no es válido marca el error y bloquea guardar', async () => {
    const campos = page.locator('.reparto-tabla input.monto-reparto');
    await campos.nth(2).fill(String(disponible0));                 // junto con los 350 de arriba pasa de lo disponible
    await hasta(() => page.locator('app-modal .aviso-danger').innerText(), t => t.includes('No alcanza'), 'no avisa que no alcanza');
    await hasta(() => guardarReparto().isDisabled(), d => d, 'guardar debería estar bloqueado');
    await campos.nth(2).fill('-5');
    await hasta(() => page.locator('.reparto-tabla small.error').first().innerText(), t => t.includes('Monto no válido'), 'no marca el monto negativo');
    await hasta(() => guardarReparto().isDisabled(), d => d, 'guardar debería seguir bloqueado');
    await campos.nth(2).fill('0');                                  // igual que hoy: sin cambio
    await hasta(() => guardarReparto().innerText(), t => t.includes('Guardar 2 cambios'), 'debería volver a poder guardarse');
  }, page);
  await paso('guarda el reparto: la caja y las tarjetas de cada área se actualizan', async () => {
    esperar(nombresReparto.length > 1, 'sin nombres de áreas');
    await page.fill('#rp-motivo', 'Prueba de reparto en bloque');
    await guardarReparto().click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await hasta(async () => dinero(await page.locator('.tile-caja.principal strong').innerText()), v => Math.abs(v - (disponible0 - 350)) < 0.011, `la caja debía quedar en ${disponible0 - 350}`);
    const monto = async nombre => dinero(await page.locator('article.area', { hasText: nombre }).first().locator('.dinero-fila strong').innerText());
    esperar(await monto(nombresReparto[0]) === 100 && await monto(nombresReparto[1]) === 250, `las tarjetas no muestran 100 y 250 (${await monto(nombresReparto[0])}, ${await monto(nombresReparto[1])})`);
    await foto('15-reparto-guardado');
  }, page);
  await paso('«Poner todo en 0» devuelve todo a caja (y el botón dice que vuelve)', async () => {
    await abrirReparto();
    await page.getByRole('button', { name: 'Poner todo en 0' }).click();
    await hasta(() => page.locator('.reparto-totales div:nth-child(2) span').innerText(), t => /vuelve a caja/i.test(t), 'debería decir «Vuelve a caja»'); // el rótulo se muestra en mayúsculas por estilo
    await hasta(() => totalReparto(2), v => Math.abs(v - 350) < 0.011, 'deberían volver 350');
    await guardarReparto().click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await hasta(async () => dinero(await page.locator('.tile-caja.principal strong').innerText()), v => Math.abs(v - disponible0) < 0.011, `la caja debía volver a ${disponible0}`);
  }, page);

  console.log('== salud de la interfaz');
  const malas = respuestasMalas.filter(r => !/\/docentes\/mi/.test(r));
  await paso('sin errores en la consola del navegador', async () => { esperar(erroresConsola.length === 0, erroresConsola.slice(0, 3).join(' || ')); }, page);
  await paso('sin respuestas 4xx/5xx inesperadas', async () => { esperar(malas.length === 0, malas.slice(0, 5).join(' || ')); }, page);

  await browser.close();
  const fallos = resultados.filter(r => !r.ok);
  console.log(`\n${resultados.length - fallos.length}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  if (fallos.length) { console.log('FALLOS:'); fallos.forEach(f => console.log('  - ' + f.nombre + ': ' + f.motivo)); }
  process.exit(fallos.length ? 1 : 0);
})();
