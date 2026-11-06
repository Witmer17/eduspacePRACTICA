/**
 * Expediente del alumno: (1) el aviso de datos personales incompletos y «Completar datos» guardan dirección, distrito, correo y colegio de procedencia;
 * (2) «Generar documentos faltantes» arma solo los requeridos que faltan (DNI, partida de nacimiento y ficha SIAGIE) como PDF con los datos registrados, los guarda en
 * «Expediente y documentos» sin verificar, y los PDF son válidos (se comprueba con pdfinfo y pdftotext). Crea un alumno de prueba (sin esos datos) y lo borra al terminar.
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_expediente_documentos.cjs
 */
const { chromium } = require('playwright-core');
const { execSync, execFileSync } = require('child_process');
const fs = require('fs');
const BASE = process.env.BASE || 'http://localhost:4200';
const GW = 'http://localhost:18080/api/v1';
const sufijo = String(Date.now()).slice(-6);
const APELLIDO = 'Zzexpediente' + sufijo;
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
  // Alumno de prueba con lo mínimo (como llega por la matrícula en línea): sin dirección, distrito, correo ni colegio de procedencia
  const al = await api('POST', '/alumnos', { numeroDocumento: '97' + sufijo, nombres: 'Prueba', apellidoPaterno: APELLIDO, apellidoMaterno: 'Soto', fechaNacimiento: '2016-05-05', sexo: 'F', nacionalidad: 'Peruana', telefono: '987654321',
    apoderados: [{ apoderado: { numeroDocumento: '96' + sufijo, nombres: 'Rosa', apellidos: APELLIDO + ' Vega', telefono: '987654321' }, parentesco: 'MADRE', esPrincipal: true, esResponsablePago: true }] });
  esperar(al.status === 201 || al.status === 200, 'no se creó el alumno de prueba: ' + al.status);
  const alumnoId = al.json.id;

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1300 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/alumnos/' + alumnoId);
    const tarjetaDatos = () => page.locator('section.card', { has: page.locator('h2', { hasText: 'Datos personales' }) });

    await paso('datos personales: lo que falta sale como «Sin registrar» y un aviso dice qué falta', async () => {
      await tarjetaDatos().locator('.aviso-warn').waitFor();
      const t = (await tarjetaDatos().innerText()).replace(/\s+/g, ' ');
      esperar(/Datos personales incompletos: falta dirección, distrito, correo y colegio de procedencia/.test(t), 'aviso: ' + t.slice(-220));
      esperar((t.match(/Sin registrar/g) ?? []).length === 4, 'debería haber 4 «Sin registrar»: ' + t);
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/22-datos-incompletos.png', fullPage: true });
    });

    await paso('«Completar datos» guarda dirección, distrito, correo y colegio de procedencia (y el aviso desaparece)', async () => {
      await tarjetaDatos().getByRole('button', { name: 'Completar datos' }).click();
      await page.waitForSelector('#d-dir', { state: 'attached' });
      await page.fill('#d-dir', 'Jr. Las Flores 123');
      await page.fill('#d-dis', 'Surco');
      await page.fill('#d-mail', 'alumno' + sufijo + '@correo.pe');
      await page.fill('#d-col', 'I.E. Santa Rosa');
      await page.locator('app-modal footer.pie').getByRole('button', { name: /Guardar/ }).click();
      await page.waitForSelector('app-modal', { state: 'detached', timeout: 20000 });
      await hasta(() => tarjetaDatos().innerText(), t => /Jr\. Las Flores 123/.test(t) && /Surco/.test(t) && /@correo\.pe/.test(t) && /I\.E\. Santa Rosa/.test(t) && !/Sin registrar/.test(t), 'la pantalla no muestra los datos guardados');
      esperar(await tarjetaDatos().locator('.aviso-warn').count() === 0, 'el aviso de datos incompletos sigue');
      const fila = psql('e2e-pg-alumnos', 'alumnos_db', `select direccion || '|' || distrito || '|' || email || '|' || colegio_procedencia from alumnos where id = ${alumnoId}`);
      esperar(fila === `Jr. Las Flores 123|Surco|alumno${sufijo}@correo.pe|I.E. Santa Rosa`, 'en la base: ' + fila);
    });

    await paso('el expediente muestra DNI, partida de nacimiento y ficha SIAGIE como «Falta»', async () => {
      const t = (await page.locator('section.card', { has: page.locator('h2', { hasText: 'Expediente y documentos' }) }).innerText()).replace(/\s+/g, ' ');
      for (const x of ['DNI: Falta', 'PARTIDA NACIMIENTO: Falta', 'FICHA SIAGIE: Falta']) esperar(t.includes(x), `falta «${x}»: ${t.slice(0, 260)}`);
    });

    await paso('«Generar documentos faltantes» lista solo los tres requeridos (no ofrece constancias ni otros)', async () => {
      await page.getByRole('button', { name: 'Generar documentos faltantes' }).click();
      await page.waitForSelector('app-modal .gen-fila', { state: 'attached' });
      esperar(await page.locator('app-modal .gen-fila').count() === 3, 'filas: ' + await page.locator('app-modal .gen-fila').count());
      const t = (await page.locator('app-modal').innerText()).replace(/\s+/g, ' ');
      esperar(/Ficha de identidad \(DNI\)/.test(t) && /Ficha de la partida de nacimiento/.test(t) && /Ficha SIAGIE del alumno/.test(t), 'faltan los tres documentos');
      esperar(!/Constancia/.test(t), 'ofrece constancias: ' + t);
      esperar(/Generar los 3 faltantes/.test(t), 'falta el botón de generar todos');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/23-generar-faltantes.png', fullPage: true });
    });

    await paso('se genera solo el DNI: aparece en la lista y quedan 2 por generar', async () => {
      await hasta(() => page.locator('app-modal .gen-fila', { hasText: 'Ficha de identidad' }).getByRole('button', { name: 'Generar' }).isDisabled(), d => d === false, 'el botón no se habilitó');
      await page.locator('app-modal .gen-fila', { hasText: 'Ficha de identidad' }).getByRole('button', { name: 'Generar' }).click();
      await hasta(() => page.locator('app-modal').innerText(), t => /Generar los 2 faltantes/.test(t), 'no bajó a 2 faltantes');
      const t = (await page.locator('app-modal .gen-fila', { hasText: 'Ficha de identidad' }).innerText()).replace(/\s+/g, ' ');
      esperar(/Ya está subido/.test(t), 'el DNI debería figurar subido: ' + t);
    });

    await paso('«Generar los 2 faltantes» completa partida de nacimiento y ficha SIAGIE; después ya no falta nada', async () => {
      await page.getByRole('button', { name: 'Generar los 2 faltantes' }).click();
      await hasta(() => page.locator('app-modal').innerText(), t => /No falta ningún documento requerido/.test(t), 'no terminó de generar', 30000);
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Cerrar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      const t = (await page.locator('section.card', { has: page.locator('h2', { hasText: 'Expediente y documentos' }) }).innerText()).replace(/\s+/g, ' ');
      for (const x of ['DNI: Subido, sin verificar', 'PARTIDA NACIMIENTO: Subido, sin verificar', 'FICHA SIAGIE: Subido, sin verificar']) esperar(t.includes(x), `falta «${x}»: ${t.slice(0, 300)}`);
      esperar(await page.getByRole('button', { name: 'Generar documentos faltantes' }).isDisabled(), 'el botón debería quedar deshabilitado sin faltantes');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/24-expediente-con-documentos.png', fullPage: true });
    });

    await paso('en la lista hay exactamente esos tres archivos, con su tipo y sin verificar (la verificación la hace quien revisa el original)', async () => {
      const docs = (await api('GET', `/alumnos/${alumnoId}/documentos`)).json;
      esperar(docs.length === 3, 'documentos: ' + docs.length);
      esperar(docs.map(d => d.tipo).sort().join() === 'DNI,FICHA_SIAGIE,PARTIDA_NACIMIENTO', 'tipos: ' + docs.map(d => d.tipo));
      esperar(docs.every(d => d.contentType === 'application/pdf' && d.verificado === false), 'estado: ' + JSON.stringify(docs.map(d => [d.tipo, d.verificado])));
    });

    await paso('los tres PDF son válidos y traen los datos del alumno (pdfinfo y pdftotext)', async () => {
      const docs = (await api('GET', `/alumnos/${alumnoId}/documentos`)).json;
      for (const d of docs) {
        const url = (await api('GET', `/alumnos/${alumnoId}/documentos/${d.id}/descarga`)).json;
        const ruta = Object.values(url).find(v => typeof v === 'string' && v.startsWith('http'));
        esperar(ruta, 'sin enlace de descarga: ' + JSON.stringify(url));
        const bytes = Buffer.from(await (await fetch(ruta)).arrayBuffer());
        const archivo = `/tmp/prueba-expediente-${d.id}.pdf`;
        fs.writeFileSync(archivo, bytes);
        esperar(bytes.slice(0, 4).toString() === '%PDF', d.tipo + ': no empieza con %PDF');
        const info = execFileSync('pdfinfo', [archivo], { encoding: 'utf8' });
        esperar(/Pages:\s+1/.test(info), d.tipo + ' pdfinfo: ' + info.replace(/\n/g, ' | ').slice(0, 200));
        const txt = execFileSync('pdftotext', ['-layout', archivo, '-'], { encoding: 'utf8' }).replace(/\s+/g, ' ');
        esperar(txt.includes(APELLIDO) && txt.includes('No reemplaza al documento original'), `${d.tipo}: no cita al alumno o no trae el aviso: ${txt.slice(0, 200)}`);
        if (d.tipo === 'DNI') esperar(/DNI 97\d{6}/.test(txt) && /Femenino/.test(txt) && /05\/05\/2016/.test(txt), 'DNI: ' + txt.slice(0, 300));
        if (d.tipo === 'PARTIDA_NACIMIENTO') esperar(/5 de mayo de 2016/.test(txt) && /Rosa/.test(txt) && /Madre/.test(txt), 'PARTIDA: ' + txt.slice(0, 300));
        if (d.tipo === 'FICHA_SIAGIE') esperar(/Jr\. Las Flores 123/.test(txt) && /Surco/.test(txt) && /I\.E\. Santa Rosa/.test(txt) && /@correo\.pe/.test(txt) && /Apoderados/.test(txt), 'SIAGIE: ' + txt.slice(0, 400));
        fs.unlinkSync(archivo);
      }
    });
  } finally {
    await browser.close();
    try {
      // (los archivos en MinIO quedan; son dos PDF de prueba)
      psql('e2e-pg-alumnos', 'alumnos_db', `delete from alumno_documentos where alumno_id = ${alumnoId}; delete from alumno_estado_historial where alumno_id = ${alumnoId}; delete from alumno_salud where alumno_id = ${alumnoId}`);
      psql('e2e-pg-alumnos', 'alumnos_db', `delete from alumno_apoderado where alumno_id = ${alumnoId}; delete from apoderados where numero_documento = '96${sufijo}'; delete from alumnos where id = ${alumnoId}`);
    } catch (e) { console.log('(limpieza parcial: ' + String(e.message).split('\n')[0].slice(0, 220) + ')'); }
  }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
