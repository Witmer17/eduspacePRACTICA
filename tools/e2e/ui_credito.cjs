/**
 * Crédito del alumno en «Cuentas por alumno»: depósitos que suman, cobro automático de la pensión vencida, deuda que queda, crédito que sobra,
 * «Cobrar del crédito ahora» y anulación de un depósito. Crea un alumno de prueba (con 3 pensiones de 300: una vencida, una que vence hoy y una futura),
 * y al terminar borra todo lo suyo (SQL en alumnos_db y pago_db).
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_credito.cjs
 */
const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const BASE = process.env.BASE || 'http://localhost:4200';
const GW = 'http://localhost:18080/api/v1';
const sufijo = String(Date.now()).slice(-6);
const NOMBRE = 'Zzcredito' + sufijo;
let fallos = 0, TOKEN = '';
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 320)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };
const psql = (cont, base, sql) => execSync(`podman exec ${cont} psql -U eduspace -d ${base} -At -c ${JSON.stringify(sql)}`, { encoding: 'utf8' }).trim();
async function hasta(leer, ok, msg, ms = 15000) {
  const fin = Date.now() + ms; let u;
  while (Date.now() < fin) { u = await leer(); if (ok(u)) return u; await new Promise(r => setTimeout(r, 150)); }
  throw new Error(msg + ' — último valor: ' + String(u).replace(/\s+/g, ' ').slice(0, 260));
}
const api = async (m, r, b) => { const x = await fetch(GW + r, { method: m, headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: b ? JSON.stringify(b) : undefined }); const t = await x.text(); return { status: x.status, json: t ? JSON.parse(t) : null }; };

(async () => {
  const tk = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' }) });
  TOKEN = (await tk.json()).access_token;

  // ---- alumno de prueba y sus pensiones ----
  const al = await api('POST', '/alumnos', { numeroDocumento: '97' + sufijo, nombres: 'Prueba', apellidoPaterno: NOMBRE, apellidoMaterno: 'Soto', fechaNacimiento: '2017-04-10', sexo: 'M',
    apoderados: [{ apoderado: { numeroDocumento: '96' + sufijo, nombres: 'Rosa', apellidos: NOMBRE + ' Vega', telefono: '987654321' }, parentesco: 'MADRE', esPrincipal: true, esResponsablePago: true }] });
  esperar(al.status === 201 || al.status === 200, 'no se creó el alumno de prueba: ' + al.status + ' ' + JSON.stringify(al.json).slice(0, 200));
  const alumnoId = al.json.id;
  const matId = 880000 + Number(sufijo.slice(-3));
  const concepto = psql('e2e-pg-pago', 'pago_db', "select id from conceptos_pago where tipo = 'PENSION' and activo order by id limit 1");
  psql('e2e-pg-pago', 'pago_db', `insert into matriculas_local (matricula_id, alumno_id, alumno_nombre, anio_id, nivel_id, grado_id, seccion_id, estado, responsable_nombre) values (${matId}, ${alumnoId}, 'Prueba ${NOMBRE}', 1, 1, 3, 10, 'MATRICULADO', 'Rosa Prueba')`);
  const fechas = ["current_date - 1", "current_date", "current_date + 30"];
  for (let i = 0; i < 3; i++) {
    psql('e2e-pg-pago', 'pago_db', `insert into cuotas (matricula_id, alumno_id, anio_id, concepto_id, descripcion, numero_cuota, monto_base, monto_total, saldo, fecha_vencimiento, estado) values (${matId}, ${alumnoId}, 1, ${concepto}, 'Pensión de prueba ${i + 1}', ${i + 1}, 300, 300, 300, ${fechas[i]}, 'PENDIENTE')`);
  }

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1200 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  const malas = [];
  page.on('response', r => { if (r.status() >= 400 && r.status() !== 429 && !r.url().includes('/kc/')) malas.push(`${r.status()} ${r.request().method()} ${r.url().replace(/^https?:\/\/[^/]+/, '')}`); });
  const tarjeta = () => page.locator('section[aria-labelledby="t-credito"]');
  const texto = async () => (await tarjeta().innerText()).replace(/\s+/g, ' ');
  const depositar = async (monto, medio = 'TRANSFERENCIA') => {
    await tarjeta().getByRole('button', { name: 'Depositar', exact: true }).click();
    await page.waitForSelector('app-modal #dep-monto', { state: 'attached' });
    await page.fill('#dep-monto', String(monto));
    await page.selectOption('#dep-medio', medio);
    await page.locator('app-modal footer.pie').getByRole('button', { name: 'Depositar' }).click();
    await page.waitForSelector('app-modal', { state: 'detached', timeout: 20000 });
  };
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/pagos/cuentas');

    await paso('se busca al alumno: la cuenta muestra «Crédito del alumno» en cero y las pensiones por cobrar', async () => {
      await page.locator('app-buscador-alumno input').fill(NOMBRE);
      await page.locator('app-buscador-alumno').getByRole('button', { name: 'Buscar' }).click();
      await page.locator('app-buscador-alumno button', { hasText: NOMBRE }).first().click();
      await tarjeta().waitFor();
      await hasta(texto, x => /Pensiones por cobrar hoy S\/ 600\.00/.test(x), 'no muestra 600.00 por cobrar hoy');
      const x = await texto();
      esperar(/Crédito S\/ 0\.00/.test(x), 'crédito inicial: ' + x);
      esperar(/Quedaría por pagar S\/ 600\.00/.test(x), 'debería quedar por pagar 600: ' + x);
      esperar(/no tiene crédito/.test(x), 'falta la explicación');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/15-credito-0.png', fullPage: true });
    });

    await paso('un depósito de 200 suma, y se cobra solo de la pensión vencida: queda la deuda que falta (100)', async () => {
      await depositar(200);
      await hasta(texto, x => /Crédito S\/ 0\.00/.test(x) && /Quedaría por pagar S\/ 400\.00/.test(x), 'tras el depósito de 200 no quedan 400 por pagar con crédito 0');
      const x = await texto();
      esperar(/Depósito/.test(x) && /Cobro de pensión/.test(x), 'faltan los movimientos del libro: ' + x);
      // la cuenta (cuotas) refleja la cuota 1 con 100 de saldo, parcial
      const fila = page.locator('table tbody tr', { hasText: 'Pensión de prueba 1' }).last();
      await hasta(() => fila.innerText(), t => /PARCIAL/.test(t) && /100\.00/.test(t), 'la pensión 1 no quedó PARCIAL con saldo 100');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/16-credito-parcial.png', fullPage: true });
    });

    await paso('otro depósito de 1000: paga lo que falta (100) y la de hoy (300); lo que sobra (600) queda como crédito; la futura no se toca', async () => {
      await depositar(1000, 'YAPE_PLIN');
      await hasta(texto, x => /Crédito S\/ 600\.00/.test(x) && /Pensiones por cobrar hoy S\/ 0\.00/.test(x), 'no quedaron 600 de crédito con nada por cobrar');
      const futura = page.locator('table tbody tr', { hasText: 'Pensión de prueba 3' }).last();
      esperar(/PENDIENTE/.test(await futura.innerText()) && /300\.00/.test(await futura.innerText()), 'la pensión futura no debería tocarse');
      esperar(/queda a favor/.test(await texto()), 'falta la explicación de crédito a favor');
    });

    await paso('en la base hay un pago de medio CREDITO sin caja por cada cobro, y el libro cuadra', async () => {
      const n = Number(psql('e2e-pg-pago', 'pago_db', `select count(*) from pagos where alumno_id = ${alumnoId} and medio = 'CREDITO' and caja_sesion_id is null`));
      esperar(n === 2, 'pagos CREDITO: ' + n);
      const suma = psql('e2e-pg-pago', 'pago_db', `select sum(case when tipo in ('DEPOSITO','REVERSION') then monto else -monto end) from movimientos_credito where alumno_id = ${alumnoId}`);
      const saldo = psql('e2e-pg-pago', 'pago_db', `select saldo from creditos_alumno where alumno_id = ${alumnoId}`);
      esperar(Number(suma) === 600 && Number(saldo) === 600, `libro ${suma} ≠ saldo ${saldo}`);
    });

    await paso('el cobro automático del día: al vencer la pensión futura, el job la paga del crédito (se simula adelantando su fecha)', async () => {
      psql('e2e-pg-pago', 'pago_db', `update cuotas set fecha_vencimiento = current_date where alumno_id = ${alumnoId} and numero_cuota = 3`);
      await page.reload();
      await page.locator('app-buscador-alumno input').fill(NOMBRE);
      await page.locator('app-buscador-alumno').getByRole('button', { name: 'Buscar' }).click();
      await page.locator('app-buscador-alumno button', { hasText: NOMBRE }).first().click();
      await hasta(texto, x => /Pensiones por cobrar hoy S\/ 300\.00/.test(x) && /Quedaría de crédito S\/ 300\.00/.test(x), 'no muestra 300 por cobrar y 300 de sobrante');
      await tarjeta().getByRole('button', { name: 'Cobrar del crédito ahora' }).click();
      await hasta(texto, x => /Crédito S\/ 300\.00/.test(x) && /Pensiones por cobrar hoy S\/ 0\.00/.test(x), 'el cobro manual no dejó 300 de crédito');
      esperar(/PAGADA/.test(await page.locator('table tbody tr', { hasText: 'Pensión de prueba 3' }).last().innerText()), 'la pensión 3 no quedó PAGADA');
    });

    await paso('anular un depósito que ya no alcanza se rechaza con el motivo; uno que sí alcanza se anula', async () => {
      // el depósito de 200 ya se cobró de las pensiones: no se puede anular (crédito 300 ≥ 200 → sí alcanza); el de 1000 no alcanza
      const filas = tarjeta().locator('table tbody tr', { hasText: 'Depósito' });
      const grande = filas.filter({ hasText: /1[,.]?000\.00/ }).getByRole('button', { name: 'Anular' });
      await grande.first().click();
      await page.fill('#anu-motivo', 'prueba');
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Anular depósito' }).click();
      await hasta(() => page.locator('app-modal .aviso-danger').innerText().catch(() => ''), x => /ya no alcanza/.test(x), 'no avisó que el crédito ya no alcanza');
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      const chico = filas.filter({ hasText: '200.00' }).getByRole('button', { name: 'Anular' });
      await chico.first().click();
      await page.fill('#anu-motivo', 'registrado dos veces');
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Anular depósito' }).click();
      await page.waitForSelector('app-modal', { state: 'detached', timeout: 20000 });
      await hasta(texto, x => /Crédito S\/ 100\.00/.test(x) && /anulado/.test(x), 'el depósito de 200 no se anuló (crédito debería quedar en 100)');
    });

    await paso('sin respuestas inesperadas del servidor (salvo el rechazo esperado de la anulación)', async () => {
      const raras = malas.filter(m => !/\/creditos\/movimientos\/\d+\/anular$/.test(m));
      esperar(raras.length === 0, raras.slice(0, 3).join(' | '));
    });
  } finally {
    await browser.close();
    try {
      psql('e2e-pg-pago', 'pago_db', `delete from movimientos_credito where alumno_id = ${alumnoId}; delete from creditos_alumno where alumno_id = ${alumnoId}; delete from pago_detalle where pago_id in (select id from pagos where alumno_id = ${alumnoId}); delete from outbox_eventos where aggregate_id in (select id::text from pagos where alumno_id = ${alumnoId}) and aggregate_type = 'PAGO'; delete from pagos where alumno_id = ${alumnoId}; delete from cuotas where alumno_id = ${alumnoId}; delete from matriculas_local where alumno_id = ${alumnoId}`);
      psql('e2e-pg-alumnos', 'alumnos_db', `delete from alumno_estado_historial where alumno_id = ${alumnoId}; delete from alumno_apoderado where alumno_id = ${alumnoId}; delete from alumnos where id = ${alumnoId}; delete from apoderados where numero_documento = '96${sufijo}'`);
    } catch (e) { console.log('(limpieza parcial: ' + String(e.message).split('\n')[0].slice(0, 200) + ')'); }
  }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
