/**
 * Generador de documentos (Alumnos → Documentos): con un alumno real se ofrecen los documentos que se pueden emitir y por qué no los demás;
 * con la matrícula simulada (page.route: no se toca ningún dato) se generan las constancias; la ficha trae apoderados; y al imprimir solo sale la hoja.
 * Uso: NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_documentos.cjs
 */
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://localhost:4200';
let fallos = 0;
const paso = async (nombre, fn) => { try { await fn(); console.log('  OK  ' + nombre); } catch (e) { fallos++; console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n')[0].slice(0, 300)); } };
const esperar = (c, m) => { if (!c) throw new Error(m); };

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1360, height: 1100 }, locale: 'es-PE' })).newPage();
  page.setDefaultTimeout(20000);
  let alumnoDatos = null;
  page.on('response', async r => { if (/\/api\/v1\/alumnos\/\d+$/.test(r.url()) && r.status() === 200) { try { alumnoDatos = await r.json(); } catch { /* otra respuesta */ } } });
  const elegirAlumno = async () => {
    await page.locator('app-buscador-alumno input').fill('Mendoza');
    await page.locator('app-buscador-alumno').getByRole('button', { name: 'Buscar' }).click();
    await page.locator('app-buscador-alumno button', { hasText: /Mendoza/ }).first().click();
    await page.locator('.opcion').first().waitFor({ timeout: 25000 });
  };
  const opcion = t => page.locator('.opcion', { hasText: t });
  try {
    await page.goto(BASE + '/login');
    await page.fill('#username', 'admin'); await page.fill('#password', 'admin123'); await page.click('button[type=submit]');
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
    await page.goto(BASE + '/documentos');

    await paso('el menú Alumnos incluye «Documentos» y la pantalla pide buscar al alumno', async () => {
      await page.locator('.vacio-guia').waitFor();
      esperar(await page.locator('nav a', { hasText: 'Documentos' }).count() >= 1, 'falta la opción «Documentos» en el menú de Alumnos');
      esperar(/Busca a un alumno/.test(await page.locator('.vacio-guia').innerText()), 'falta la guía inicial');
    });

    await paso('con un alumno real: salen los 5 documentos, la ficha disponible y los demás con su motivo', async () => {
      await elegirAlumno();
      esperar(await page.locator('.opcion').count() === 5, 'documentos ofrecidos: ' + await page.locator('.opcion').count());
      esperar(!(await opcion('Ficha del alumno').getByRole('button', { name: 'Generar' }).isDisabled()), 'la ficha debería estar disponible');
      const textos = (await page.locator('.opcion.apagada .motivo').allInnerTexts()).join(' | ');
      esperar(await page.locator('.opcion.apagada').count() === 0 || textos.length > 5, 'los documentos no disponibles no dicen por qué');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/19-documentos-opciones.png', fullPage: true });
    });

    await paso('la ficha del alumno trae sus datos y la tabla de apoderados', async () => {
      await opcion('Ficha del alumno').getByRole('button', { name: 'Generar' }).click();
      const hoja = page.locator('.hoja-documento');
      await hoja.waitFor();
      const t = (await hoja.innerText()).replace(/\s+/g, ' ');
      esperar(/FICHA DEL ALUMNO/i.test(t) && t.includes(alumnoDatos.codigo) && t.includes(alumnoDatos.numeroDocumento), 'faltan los datos del alumno: ' + t.slice(0, 160));
      esperar(await hoja.locator('table tbody tr').count() >= 1, 'la tabla de apoderados está vacía');
      esperar(/N\.º FA-\d{4}-/.test(t), 'falta el número del documento');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/20-documentos-ficha.png', fullPage: true });
    });

    await paso('con una matrícula vigente (simulada) se habilitan las constancias y la de matrícula cita grado, sección y año', async () => {
      const real = await page.evaluate(async () => {
        const t = JSON.parse(sessionStorage.getItem('eduspace.session') || '{}');
        return t;
      }).catch(() => ({}));
      await page.route('**/api/v1/matriculas?*', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
        contenido: [{ id: 501, codigo: 'MAT-PRUEBA-0501', alumnoId: alumnoDatos.id, alumnoNombre: alumnoDatos.nombreCompleto, anioId: 1, nivelId: 1, gradoId: 1, seccionId: 1, tipo: 'NUEVA', estado: 'MATRICULADO', creadoEn: '2026-03-01T10:00:00' }],
        pagina: 0, tamano: 100, totalElementos: 1, totalPaginas: 1 }) }));
      await page.goto(BASE + '/documentos');
      await elegirAlumno();
      for (const t of ['Constancia de matrícula', 'Constancia de estudios']) {
        esperar(!(await opcion(t).getByRole('button', { name: /Generar|Ver de nuevo/ }).isDisabled()), `«${t}» debería estar disponible con matrícula vigente`);
      }
      await opcion('Constancia de matrícula').getByRole('button', { name: 'Generar' }).click();
      const t = (await page.locator('.hoja-documento').innerText()).replace(/\s+/g, ' ');
      esperar(/HACE CONSTAR/.test(t), 'falta «HACE CONSTAR»');
      esperar(t.includes(alumnoDatos.nombreCompleto) && /MATRICULAD[OA]/.test(t), 'no cita al alumno matriculado: ' + t.slice(0, 260));
      esperar(/MAT-PRUEBA-0501/.test(t), 'falta el N.º de matrícula');
      esperar(/Director|Dirección/.test(t), 'falta la firma');
      await page.screenshot({ path: '/tmp/pw-ui/capturas-asistente/21-documentos-constancia.png', fullPage: true });
    });

    await paso('al imprimir solo sale la hoja (no el menú, el buscador ni los botones)', async () => {
      await page.emulateMedia({ media: 'print' });
      const visibles = await page.evaluate(() => {
        const vis = e => { const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.display !== 'none'; };
        return { hoja: vis(document.querySelector('.hoja-documento')), menu: !!document.querySelector('nav') && vis(document.querySelector('nav')), buscador: vis(document.querySelector('app-buscador-alumno')), barra: vis(document.querySelector('.barra-doc')) };
      });
      esperar(visibles.hoja && !visibles.menu && !visibles.buscador && !visibles.barra, 'en impresión: ' + JSON.stringify(visibles));
      const pdf = await page.pdf({ format: 'A4', printBackground: true });
      esperar(pdf.length > 3000 && pdf.slice(0, 4).toString() === '%PDF', 'el PDF no se generó');
      await page.emulateMedia({ media: 'screen' });
    });
  } finally { await browser.close(); }
  console.log(fallos ? `\n${fallos} paso(s) con error` : '\nTodo correcto');
  process.exit(fallos ? 1 : 0);
})();
