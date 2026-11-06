/**
 * Matrícula en línea: los datos opcionales del alumno (dirección, distrito, colegio de procedencia y correo) llegan hasta su expediente.
 * Hace una reserva de verdad con una familia de prueba (llega hasta la ventana de pago) y, al terminar, anula la reserva y borra todo lo suyo (SQL).
 * Requiere un año activo con campaña abierta, vacantes y tarifa de matrícula.
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_publico_datos_alumno.cjs
 */
const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const BASE = process.env.BASE || 'http://localhost:4200';
const GW = 'http://localhost:18080/api/v1';
const sufijo = String(Date.now()).slice(-6);
const DOC_AL = '86' + sufijo, DOC_AP = '85' + sufijo;
let fallos = 0, TOKEN = '';
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 320)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };
const psql = (cont, base, sql) => execSync(`podman exec ${cont} psql -U eduspace -d ${base} -At -v ON_ERROR_STOP=1 -c ${JSON.stringify(sql)}`, { encoding: 'utf8' }).trim();

(async () => {
  const tk = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' }) });
  TOKEN = (await tk.json()).access_token;
  const oferta = await (await fetch(GW + '/publico/matricula/oferta')).json();
  const nivel = (oferta.niveles || []).find(n => n.grados.some(g => g.matricula && g.vacantes > 0));
  if (!oferta.abierta || !nivel) { console.log('La matrícula en línea no está disponible (sin campaña abierta, vacantes o tarifa): no se puede probar.'); process.exit(0); }
  const grado = nivel.grados.find(g => g.matricula && g.vacantes > 0);

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 1100 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  try {
    await paso('el formulario pide datos opcionales del alumno: dirección, distrito, colegio de procedencia y correo', async () => {
      await page.goto(BASE + '/matricula-en-linea');
      await page.getByRole('tab', { name: nivel.nombre }).click();
      await page.locator('.mel-grado', { hasText: grado.nombre }).click();
      await page.getByRole('button', { name: 'Continuar' }).click();
      await page.waitForSelector('#a-doc');
      for (const id of ['#a-dir', '#a-dis', '#a-col', '#a-mail']) esperar(await page.locator(id).count() === 1, 'falta el campo ' + id);
      await page.fill('#a-doc', DOC_AL); await page.fill('#a-nom', 'Zz'); await page.fill('#a-ap', 'Publico' + sufijo); await page.fill('#a-am', 'Prueba'); await page.fill('#a-fn', '2018-05-10');
      await page.fill('#a-dir', 'Av. Los Pinos 456'); await page.fill('#a-dis', 'San Borja'); await page.fill('#a-col', 'Nido Los Pinos'); await page.fill('#a-mail', 'alumno' + sufijo + '@correo.pe');
      await page.fill('#p-doc', DOC_AP); await page.fill('#p-nom', 'Rosa'); await page.fill('#p-ape', 'Publico ' + sufijo); await page.fill('#p-tel', '987654321');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/25-publico-datos-alumno.png', fullPage: true });
    });
    await paso('un correo del alumno mal escrito se avisa y no deja avanzar', async () => {
      await page.fill('#a-mail', 'esto-no-es-un-correo');
      await page.getByRole('button', { name: 'Revisar y pagar' }).click();
      await page.waitForTimeout(600);
      esperar(await page.locator('.mel-cuenta').count() === 0, 'avanzó con un correo inválido');
      esperar(/El correo no es válido/.test(await page.locator('body').innerText()), 'no avisó que el correo no es válido');
      await page.fill('#a-mail', 'alumno' + sufijo + '@correo.pe');
    });
    await paso('al reservar, esos datos quedan en el expediente del alumno', async () => {
      await page.getByRole('button', { name: 'Revisar y pagar' }).click();
      await page.waitForSelector('.mel-cuenta');
      await page.getByLabel(/Acepto el tratamiento/).check();
      await page.getByRole('button', { name: 'Pagar la matrícula' }).click();
      await page.waitForSelector('#t-num', { state: 'attached' });
      const fila = psql('e2e-pg-alumnos', 'alumnos_db', `select direccion || '|' || distrito || '|' || colegio_procedencia || '|' || email from alumnos where numero_documento = '${DOC_AL}'`);
      esperar(fila === `Av. Los Pinos 456|San Borja|Nido Los Pinos|alumno${sufijo}@correo.pe`, 'en la base del expediente: ' + fila);
    });
  } finally {
    await browser.close();
    // ---- limpieza: anula la reserva (libera el cupo) y borra todo lo de la familia de prueba ----
    try {
      const mid = psql('e2e-pg-matricula', 'matricula_db', `select matricula_id from matriculas_publicas where alumno_documento = '${DOC_AL}' limit 1`);
      if (mid) {
        await fetch(GW + `/matriculas/${mid}/anular`, { method: 'PATCH', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify({ motivo: 'Fin de la prueba' }) });
        psql('e2e-pg-pago', 'pago_db', `begin; delete from cuotas where matricula_id = ${mid}; delete from matriculas_local where matricula_id = ${mid}; commit`);
        psql('e2e-pg-matricula', 'matricula_db', `begin; delete from matricula_requisitos where matricula_id = ${mid}; delete from matricula_historial where matricula_id = ${mid}; delete from matriculas_publicas where matricula_id = ${mid}; delete from matriculas where id = ${mid}; commit`);
      }
      const aid = psql('e2e-pg-alumnos', 'alumnos_db', `select id from alumnos where numero_documento = '${DOC_AL}'`);
      if (aid) psql('e2e-pg-alumnos', 'alumnos_db', `begin; delete from alumno_estado_historial where alumno_id = ${aid}; delete from alumno_apoderado where alumno_id = ${aid}; delete from alumnos where id = ${aid}; delete from apoderados where numero_documento = '${DOC_AP}'; commit`);
    } catch (e) { console.log('(limpieza parcial: ' + String(e.message).split('\n')[0].slice(0, 240) + ')'); }
  }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
