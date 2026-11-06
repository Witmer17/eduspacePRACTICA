/**
 * Niveles y grados (sin periodo activo: desactivados y con aviso; con periodo activo: «Seleccionar todos…» con su tabla) y
 * pabellones con la selección de sus grados.
 * Crea un pabellón de prueba (ZZPRUEBA) y, para probar la tabla, un año de prueba (2096) que activa; al final los borra (API / SQL).
 * NO guarda grados ni secciones. Requiere que NO haya un año activo al empezar.
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_grados_pabellon.cjs
 */
const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const BASE = process.env.BASE || 'http://localhost:4200';
const API = 'http://localhost:18080/api/v1/planificacion';
let fallos = 0, TOKEN = '';
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 300)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };
const api = async (metodo, ruta, cuerpo) => {
  const r = await fetch(API + ruta, { method: metodo, headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
  const t = await r.text();
  return { status: r.status, json: t ? JSON.parse(t) : null };
};
const psql = sql => execSync(`podman exec e2e-pg-planificacion psql -U eduspace -d planificacion_db -At -c ${JSON.stringify(sql)}`, { encoding: 'utf8' }).trim();
async function hasta(leer, ok, msg, ms = 15000) {
  const fin = Date.now() + ms; let u;
  while (Date.now() < fin) { u = await leer(); if (ok(u)) return u; await new Promise(r => setTimeout(r, 150)); }
  throw new Error(msg + ' — último valor: ' + String(u).slice(0, 200));
}

(async () => {
  const t = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' })
  });
  TOKEN = (await t.json()).access_token;
  const anios = (await api('GET', '/anios')).json;
  if (anios.some(a => a.estado === 'ACTIVO')) { console.log('Hay un año activo: esta prueba solo corre sin año activo.'); process.exit(0); }
  if (anios.some(a => a.nombre === '2096')) { console.log('Existe el año 2096 de una corrida anterior: quítalo antes de repetir.'); process.exit(2); }

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  let pabId = 0, anioId = 0;
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });

    await paso('sin periodo activo: Niveles y grados sale desactivado, con aviso y «Iniciar nuevo periodo»', async () => {
      await page.goto(BASE + '/configuracion/grados');
      await page.locator('.sin-periodo-grados').waitFor();
      esperar(/Para activarlos, primero inicia un nuevo periodo/.test(await page.locator('.sin-periodo-grados').innerText()), 'texto del aviso');
      const tiles = page.locator('button.tile');
      esperar(await tiles.count() >= 10, 'no salen los grados');
      esperar(await page.locator('button.tile.on').count() === 0, 'hay grados activados sin periodo activo');
      esperar(await page.locator('button.tile:not(:disabled)').count() === 0, 'hay grados que se pueden activar sin periodo activo');
      esperar(await page.getByRole('button', { name: /Seleccionar todos/ }).isDisabled(), '«Seleccionar todos…» debería estar bloqueado');
      esperar(await page.getByRole('link', { name: 'Iniciar nuevo periodo' }).count() === 1, 'falta «Iniciar nuevo periodo»');
      const resumen = (await page.locator('.resumen', { hasText: 'grados elegidos' }).innerText()).replace(/\s+/g, ' ').trim();
      esperar(/^0 de \d+ grados elegidos/.test(resumen), 'el resumen no dice 0 elegidos: ' + resumen);
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/09-grados-sin-periodo.png', fullPage: true });
    });

    await paso('«Iniciar nuevo periodo» abre el asistente de apertura', async () => {
      await page.getByRole('link', { name: 'Iniciar nuevo periodo' }).click();
      await page.waitForSelector('app-modal .pasos', { state: 'attached', timeout: 20000 });
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Cerrar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
    });

    // ---- pabellón de prueba y sus grados ----
    const pab = (await api('POST', '/pabellones', { nombre: 'ZZPRUEBA', cantidadAulas: 0 })).json;
    pabId = pab.id;
    const grados = (await api('GET', '/grados')).json.filter(g => g.activo);
    await paso('pabellón: «Grados del pabellón» abre una tabla de casillas por nivel y guarda la selección', async () => {
      await page.goto(BASE + '/configuracion/colegio');
      const tarjeta = page.locator('article.pabellon', { hasText: 'Pabellón ZZPRUEBA' });
      await tarjeta.waitFor({ timeout: 20000 });
      esperar(/Sin grados elegidos/.test(await tarjeta.innerText()), 'debería decir «Sin grados elegidos»');
      await tarjeta.getByRole('button', { name: 'Grados del pabellón' }).click();
      await page.waitForSelector('app-modal .casilla-grado', { state: 'attached' });
      esperar(await page.locator('app-modal .casilla-grado').count() === grados.length, 'las casillas no son los grados ofrecidos');
      esperar(await page.locator('app-modal footer.pie').getByRole('button', { name: 'Guardar grados' }).isDisabled(), 'guardar debería estar bloqueado sin cambios');
      // todos los de un nivel y uno suelto de otro
      await page.locator('app-modal fieldset', { hasText: grados[0].nivelNombre }).getByRole('button', { name: 'todos' }).click();
      const delNivel = grados.filter(g => g.nivelId === grados[0].nivelId).length;
      await hasta(() => page.locator('app-modal .casilla-grado.on').count(), n => n === delNivel, 'no se marcaron todos los del nivel');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/10-pabellon-grados.png', fullPage: true });
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Guardar grados' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      const guardados = (await api('GET', '/pabellones')).json.find(p => p.id === pabId).gradoIds.sort((a, b) => a - b);
      const esperados = grados.filter(g => g.nivelId === grados[0].nivelId).map(g => g.id).sort((a, b) => a - b);
      esperar(JSON.stringify(guardados) === JSON.stringify(esperados), `grados guardados ${guardados} ≠ ${esperados}`);
      await hasta(() => tarjeta.innerText(), x => /Grados:/.test(x) && !/Sin grados elegidos/.test(x), 'la tarjeta no muestra los grados');
    });

    // ---- con periodo activo: «Seleccionar todos…» y su tabla (no se guarda nada) ----
    const a = (await api('POST', '/anios', { nombre: '2096', fechaInicio: '2096-03-02', fechaFin: '2096-12-18' })).json;
    anioId = a.id;
    await api('PATCH', `/anios/${anioId}/activar`);
    await paso('con periodo activo: «Seleccionar todos…» abre la tabla; se asigna cantidad a todos de una vez y se aplica', async () => {
      await page.goto(BASE + '/configuracion/grados');
      await page.locator('button.tile').first().waitFor();
      esperar(await page.locator('.sin-periodo-grados').count() === 0, 'sigue el aviso de sin periodo');
      await page.getByRole('button', { name: /Seleccionar todos/ }).click();
      await page.waitForSelector('app-modal .tabla-todos', { state: 'attached' });
      const filas = page.locator('app-modal .tabla-todos tbody tr');
      const n = await filas.count();
      esperar(n >= 10, 'la tabla no trae todos los grados: ' + n);
      // «Para todos los marcados»: 3 secciones, tarde, 25 vacantes
      await page.locator('app-modal input[aria-label="Secciones para todos"]').fill('3');
      await page.locator('app-modal select[aria-label="Turno para todos"]').selectOption('TARDE');
      await page.locator('app-modal input[aria-label="Vacantes para todos"]').fill('25');
      await page.getByRole('button', { name: 'Aplicar a los marcados' }).click();
      const libres = await page.locator('app-modal .tabla-todos tbody tr:not(.fija)').count();
      await hasta(() => page.locator('app-modal .resumen-todos').innerText(), x => x.includes(`${libres * 3} secciones`) && x.includes(`${libres * 3 * 25} vacantes`), 'los totales no coinciden con 3 secciones × 25 vacantes por grado');
      // se desmarca uno: baja la cuenta
      await page.locator('app-modal .tabla-todos tbody tr:not(.fija) input[type=checkbox]').first().uncheck();
      await hasta(() => page.locator('app-modal .resumen-todos').innerText(), x => x.includes(`${libres - 1} grados`), 'al desmarcar un grado no bajó la cuenta');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/11-seleccionar-todos.png', fullPage: true });
      await page.locator('app-modal footer.pie').getByRole('button', { name: /^Aplicar a \d+ grados?$/ }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      // quedan marcados los fijos (ya establecidos) y todos los de la tabla menos el que se desmarcó: en total, todos menos uno
      await hasta(() => page.locator('button.tile.on').count(), c => c === n - 1, 'los grados aplicados no quedaron marcados');
      esperar(/3 secciones/.test(await page.locator('button.tile.on small.nuevo').first().innerText()), 'el grado no muestra sus 3 secciones');
      esperar(!(await page.getByRole('button', { name: 'Guardar cambios' }).isDisabled()), '«Guardar cambios» debería estar habilitado');
      // (no se guarda: se recarga la página y todo vuelve a como estaba)
    });
  } finally {
    if (anioId) { try { psql(`delete from feriados where anio_academico_id=${anioId}; delete from periodos where anio_academico_id=${anioId}; delete from secciones where anio_academico_id=${anioId}; delete from anios_academicos where id=${anioId}`); } catch (e) { console.log('(no se pudo limpiar el año 2096: ' + e.message.split('\n')[0] + ')'); } }
    if (pabId) await api('DELETE', `/pabellones/${pabId}`);
    await browser.close();
  }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
