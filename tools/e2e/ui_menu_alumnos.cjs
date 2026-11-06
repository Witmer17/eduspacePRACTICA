/**
 * Menú «Alumnos» en la barra horizontal del personal: reúne alumnos, apoderados, matrículas, asistencia, notas y cuentas.
 * Solo lee (la edición de un apoderado se abre y se cancela). Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_menu_alumnos.cjs
 */
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://localhost:4200';
const OPCIONES = [
  ['Alumnos', '/alumnos'], ['Apoderados', '/apoderados'], ['Importar alumnos', '/alumnos/importar'],
  ['Matrículas', '/matriculas'], ['Por aprobar', '/matriculas/aprobaciones'], ['Cupos', '/matriculas/cupos'],
  ['Justificaciones', '/asistencia/justificaciones'], ['Reporte de asistencia', '/asistencia/reporte'], ['Libretas y boletines', '/calificaciones/boletines'],
  ['Cuentas por alumno', '/pagos/cuentas']
];
let fallos = 0;
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 300)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1000 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  const consola = [];
  page.on('pageerror', e => consola.push('pageerror: ' + String(e).slice(0, 200)));
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/inicio');
    await page.getByRole('link', { name: 'Personal', exact: true }).first().waitFor();

    await paso('la barra horizontal tiene «Alumnos» entre Inicio y Personal', async () => {
      const enlaces = (await page.locator('header a, nav a').allInnerTexts()).map(x => x.trim()).filter(Boolean);
      const i = enlaces.indexOf('Inicio'), a = enlaces.indexOf('Alumnos'), p = enlaces.indexOf('Personal');
      esperar(i >= 0 && a > i && p > a, 'orden de la barra: ' + enlaces.slice(0, 8).join(' | '));
    });

    await paso('«Alumnos» abre la lista de alumnos con el menú vertical de todas sus opciones, por grupos', async () => {
      await page.getByRole('link', { name: 'Alumnos', exact: true }).first().click();
      await page.waitForURL(/\/alumnos$/, { timeout: 20000 });
      await page.locator('.menu-v, nav[aria-label]').first().waitFor();
      const texto = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
      for (const [etiqueta] of OPCIONES) esperar(texto.includes(etiqueta), `falta «${etiqueta}» en el menú de Alumnos`);
      for (const g of ['ALUMNOS', 'MATRÍCULA', 'ASISTENCIA Y NOTAS', 'PAGOS']) esperar(texto.toUpperCase().includes(g), `falta el grupo «${g}»`);
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/12-menu-alumnos.png', fullPage: true });
    });

    for (const [etiqueta, ruta] of OPCIONES) {
      await paso(`${etiqueta} (${ruta}) abre sin errores y sigue dentro del espacio Alumnos`, async () => {
        await page.goto(BASE + ruta);
        await page.waitForTimeout(1500);
        esperar(new URL(page.url()).pathname === ruta, 'redirigió a ' + page.url());
        esperar((await page.locator('body').innerText()).includes('Apoderados') && (await page.locator('body').innerText()).includes('Cuentas por alumno'), 'el menú de Alumnos no se ve en esta pantalla');
        esperar(await page.locator('.aviso-danger').count() === 0, 'aviso de error en pantalla');
      });
    }

    await paso('Apoderados: lista, busca, muestra sus hijos y abre la edición (se cancela)', async () => {
      await page.goto(BASE + '/apoderados');
      await page.locator('table tbody tr strong').first().waitFor({ timeout: 20000 }).catch(() => {});
      const filas = await page.locator('table tbody tr strong').count();
      esperar(filas > 0, 'la lista de apoderados está vacía (texto: ' + (await page.locator('table tbody').innerText()).replace(/\s+/g, ' ').slice(0, 80) + ')');
      const primero = page.locator('table tbody tr').first();
      const nombre = (await primero.locator('strong').first().innerText()).trim();
      // búsqueda por apellido
      const apellido = nombre.split(',')[0].trim().split(' ')[0];
      await page.fill('input[aria-label="Buscar apoderado"]', apellido);
      await page.locator('form.toolbar').getByRole('button', { name: 'Buscar' }).click();
      await page.waitForTimeout(1200);
      esperar((await page.locator('table tbody tr strong').allInnerTexts()).every(t => t.toLowerCase().includes(apellido.toLowerCase())), 'la búsqueda trae apoderados de otro apellido');
      // hijos
      await page.locator('table tbody tr').first().getByRole('button', { name: 'Hijos' }).click();
      await page.waitForSelector('app-modal', { state: 'attached' });
      await page.waitForTimeout(1500);
      const modal = (await page.locator('app-modal').innerText()).replace(/\s+/g, ' ');
      esperar(/Hijos de /.test(modal) && (/Ver expediente/.test(modal) || /no tiene alumnos vinculados/.test(modal)), 'el modal de hijos no muestra hijos ni el aviso: ' + modal.slice(0, 120));
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/13-apoderados.png', fullPage: true });
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Cerrar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
      // edición (solo se abre)
      await page.locator('table tbody tr').first().getByRole('button', { name: 'Editar' }).click();
      await page.waitForSelector('app-modal #ap-nom', { state: 'attached' });
      esperar((await page.inputValue('#ap-nom')).length > 0, 'el formulario no trae los nombres');
      await page.locator('app-modal footer.pie').getByRole('button', { name: 'Cancelar' }).click();
      await page.waitForSelector('app-modal', { state: 'detached' });
    });

    await paso('sin errores de página', async () => { esperar(consola.length === 0, consola.join(' | ')); });
  } finally { await browser.close(); }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
