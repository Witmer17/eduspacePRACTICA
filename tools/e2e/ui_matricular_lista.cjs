/**
 * Lista de alumnos: columna «Matrícula {año}» con el estado de cada alumno y botón «Matricular» para quien no está matriculado.
 * «Matricular» abre el asistente de matrícula (/matricula/asistente?alumnoId=…) con el alumno ya elegido. No se crea ninguna matrícula.
 * Requiere un año activo. Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_matricular_lista.cjs
 */
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://localhost:4200';
const GW = 'http://localhost:18080/api/v1';
let fallos = 0, TOKEN = '';
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 320)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };
const api = async r => (await fetch(GW + r, { headers: { Authorization: 'Bearer ' + TOKEN } })).json();
async function hasta(leer, ok, msg, ms = 15000) {
  const fin = Date.now() + ms; let u;
  while (Date.now() < fin) { u = await leer(); if (ok(u)) return u; await new Promise(r => setTimeout(r, 150)); }
  throw new Error(msg + ' — último valor: ' + String(u).replace(/\s+/g, ' ').slice(0, 260));
}

(async () => {
  const tk = await fetch('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: 'admin', password: 'admin123' }) });
  TOKEN = (await tk.json()).access_token;
  const anios = await api('/planificacion/anios');
  const activo = anios.find(a => a.estado === 'ACTIVO');
  if (!activo) { console.log('No hay un año activo: no se puede probar.'); process.exit(0); }
  const mats = (await api(`/matriculas?anioId=${activo.id}&size=100`)).contenido;
  const alumnos = (await api('/alumnos?size=50')).contenido;
  const estadoDe = id => { const m = mats.filter(x => x.alumnoId === id).map(x => x.estado); return m.includes('MATRICULADO') ? 'Matriculado' : m.includes('POR_APROBAR') ? 'Por aprobar' : m.includes('PRE_MATRICULA') ? 'Pre-matrícula' : 'Sin matrícula'; };

  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  let envios = [];
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/alumnos');

    await paso('la tabla tiene la columna «Matrícula {año}» y cada alumno muestra su estado real', async () => {
      await page.locator('table tbody tr strong').first().waitFor({ timeout: 20000 });
      esperar((await page.locator('table thead').innerText()).includes('Matrícula ' + activo.nombre), 'falta la columna «Matrícula ' + activo.nombre + '»');
      await hasta(() => page.locator('table tbody tr .badge:not(.badge-ok):not(.badge-gray)').count().then(() => page.locator('table tbody tr').first().innerText()), t => !/…/.test(t), 'la matrícula no terminó de cargar');
      const filas = await page.locator('table tbody tr').filter({ has: page.locator('strong') }).all();
      esperar(filas.length === alumnos.length, `filas ${filas.length} ≠ alumnos ${alumnos.length}`);
      for (const f of filas) {
        const nombre = (await f.locator('strong').innerText()).trim();
        const al = alumnos.find(a => a.nombreCompleto === nombre);
        const t = (await f.innerText()).replace(/\s+/g, ' ');
        esperar(t.includes(estadoDe(al.id)), `«${nombre}» debería decir ${estadoDe(al.id)}: ${t}`);
      }
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/26-lista-matricula.png', fullPage: true });
    });

    await paso('«Matricular» aparece solo en quien no tiene matrícula (activo) y no en quien ya la tiene', async () => {
      const filas = await page.locator('table tbody tr').filter({ has: page.locator('strong') }).all();
      for (const f of filas) {
        const nombre = (await f.locator('strong').innerText()).trim();
        const al = alumnos.find(a => a.nombreCompleto === nombre);
        // activo: enlace al asistente; no activo: botón deshabilitado
        const enlace = await f.getByRole('link', { name: /^Matricular/ }).count();
        const boton = await f.getByRole('button', { name: /^Matricular/ }).count();
        esperar((enlace + boton === 1) === (estadoDe(al.id) === 'Sin matrícula'), `«${nombre}» (${estadoDe(al.id)}, ${al.estado}): enlace=${enlace} botón=${boton}`);
        if (enlace + boton) esperar((boton === 1) === (al.estado !== 'ACTIVO'), 'solo el alumno no activo debe tener el botón deshabilitado en lugar del enlace');
      }
    });

    const libre = alumnos.find(a => estadoDe(a.id) === 'Sin matrícula' && a.estado === 'ACTIVO');
    if (!libre) { console.log('  (no hay un alumno activo sin matrícula: se omite el paso del asistente)'); }
    else {
      const fila = () => page.locator('table tbody tr').filter({ has: page.locator('strong', { hasText: libre.nombreCompleto }) });
      await paso('«Matricular» abre el asistente con el alumno ya elegido', async () => {
        await fila().getByRole('link', { name: /^Matricular/ }).click();
        await page.waitForURL(u => u.pathname === '/matricula/asistente' && u.searchParams.get('alumnoId') === String(libre.id), { timeout: 20000 });
        await hasta(() => page.locator('.asistente-cuerpo').innerText(), t => t.includes(libre.nombreCompleto), 'el asistente no mostró al alumno');
        esperar((await page.locator('ol.pasos').innerText()).includes('Documentos'), 'faltan los pasos del asistente');
        await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/27-asistente-desde-lista.png', fullPage: true });
      });
    }
  } finally { await browser.close(); }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
