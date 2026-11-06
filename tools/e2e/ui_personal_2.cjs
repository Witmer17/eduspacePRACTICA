/*
 * Segunda tanda del recorrido de interfaz (lo que ui_personal.cjs no cubre): crear cuenta de acceso dentro del flujo de pasos, «← Datos» y
 * «Omitir por ahora», filtros y meses anteriores de Pago al personal, las ventanas «Bonos y descuentos» y «Contratos» (rescindir),
 * docentes del curso en Configuración → Cursos, áreas desactivadas con dinero, el flujo como SECRETARÍA y la vista de celular.
 *
 *   NODE_PATH=/tmp/pw-ui/node_modules node tools/e2e/ui_personal_2.cjs [urlBase] [carpetaCapturas]
 * Se lanza con tools/e2e/ui_personal.sh (que prepara el dinero de caja y limpia lo que se crea).
 */
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = process.argv[2] || 'http://localhost:4200';
const GW = 'http://localhost:18080';
const KC = 'http://localhost:18090';
const CAPTURAS = process.argv[3] || '/tmp/pw-ui/capturas2';
const sufijo = String(Date.now()).slice(-7);
const CLAVE_SEC = 'Clave12345';
const USUARIO_SEC = 'secretaria907';

const resultados = [];
const erroresConsola = [];
const respuestasMalas = [];
let n = 0;

let pasoActual = '(inicio)';
async function paso(nombre, fn, page) {
  pasoActual = nombre;
  try { await fn(); resultados.push({ ok: true, nombre }); console.log('  OK  ' + nombre); return true; }
  catch (e) {
    resultados.push({ ok: false, nombre, motivo: String(e.message).split('\n')[0] });
    console.log('  ERR ' + nombre + '\n      ' + String(e.message).split('\n').slice(0, 3).join('\n      '));
    try { await page.screenshot({ path: `${CAPTURAS}/${String(++n).padStart(2, '0')}-error.png`, fullPage: true }); } catch { /* sin captura */ }
    return false;
  }
}
const esperar = (c, m) => { if (!c) throw new Error(m); };
async function hasta(leer, ok, msg, ms = 8000) {
  const fin = Date.now() + ms; let ultimo;
  while (Date.now() < fin) { ultimo = await leer(); if (ok(ultimo)) return ultimo; await new Promise(r => setTimeout(r, 120)); }
  throw new Error(msg + (ultimo !== undefined ? ' — último valor: ' + String(ultimo).replace(/\s+/g, ' ').slice(0, 240) : ''));
}

// ---------- API (para preparar datos y limpiar) ----------
async function token(usuario, clave) {
  const r = await fetch(`${KC}/realms/eduspace/protocol/openid-connect/token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', client_id: 'eduspace-e2e', username: usuario, password: clave }) });
  const j = await r.json();
  if (!j.access_token) throw new Error('Sin token de Keycloak para ' + usuario + ': ' + JSON.stringify(j));
  return j.access_token;
}
let TK = null;
async function api(metodo, ruta, cuerpo) {
  const r = await fetch(GW + ruta, { method: metodo, headers: { Authorization: 'Bearer ' + TK, 'Content-Type': 'application/json' }, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
  const t = await r.text();
  let j = null; try { j = t ? JSON.parse(t) : null; } catch { j = t; }
  return { status: r.status, json: j };
}

// ---------- Utilidades de pantalla ----------
async function entrar(page, usuario, clave) {
  await page.goto(BASE + '/login');
  await page.fill('#username', usuario);
  await page.fill('#password', clave);
  await page.click('button[type=submit]');
  await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 30000 });
}
async function abrirAgregar(page) {
  await page.goto(BASE + '/personal');
  await page.waitForSelector('table.tabla-personal');
  await page.click('button:has-text("Agregar personal")');
  await page.waitForSelector('app-modal #form-personal');
}
async function datos(page, { doc, apellido, curso, area }) {
  if (area) await page.selectOption('#p-area', { label: area });
  await page.fill('#p-num', doc);
  await page.fill('#p-nombres', 'UI');
  await page.fill('#p-apellidos', apellido);
  await page.fill('#p-email', `ui${doc}@colegio.pe`);
  // Los cursos ya no se eligen en los datos (solo en el paso «Cursos», por sección): el parámetro {curso} queda por compatibilidad y no hace nada.
}
/** En el paso «Cursos»: busca un curso y marca el primero libre. */
async function elegirCursoLibre(page, texto) {
  await page.fill('.buscar-asig', texto);
  const libre = page.locator('app-modal .curso-asig:not(.ocupado) input[type=checkbox]:not(:disabled)').first();
  await libre.waitFor();
  await libre.check();
}
const pasosVisibles = async page => (await page.locator('app-modal ol.pasos li:not(.separador)').allInnerTexts()).map(t => t.replace(/\s+/g, ' ').trim());
const textoModal = page => page.locator('app-modal').innerText();
const sinPaginaAncha = page => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
const mesAnterior = () => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - 1); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; };
const mesActual = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; };

(async () => {
  fs.mkdirSync(CAPTURAS, { recursive: true });
  TK = await token('admin', 'admin123');
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const vigila = page => {
    page.setDefaultTimeout(15000);
    page.on('console', m => { if (m.type() === 'error') erroresConsola.push(m.text().slice(0, 200)); });
    page.on('pageerror', e => erroresConsola.push('pageerror: ' + String(e).slice(0, 200)));
    page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/kc/')) respuestasMalas.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')} [en: ${pasoActual}]`); });
  };

  // ===================== ADMINISTRADOR =====================
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-PE' });
  const page = await ctx.newPage();
  vigila(page);
  const foto = (p, nombre) => p.screenshot({ path: `${CAPTURAS}/${nombre}.png`, fullPage: true });
  await entrar(page, 'admin', 'admin123');

  // --- Cuántas peticiones dispara cada pantalla (el Gateway limita a 300 por minuto por IP) ---
  console.log('== Peticiones por pantalla');
  const conteo = {};
  await paso('mide las peticiones a la API de cada pantalla al abrirla', async () => {
    let c = 0;
    page.on('request', r => { if (r.url().includes('/api/')) c++; });
    for (const [nombre, ruta, sel] of [['Personal', '/personal', 'table.tabla-personal'], ['Pago al personal', '/personal/pagos', 'article.tarjeta, .vacio-guia'],
      ['Asistencia del personal', '/personal/asistencia', 'table.tabla-asistencia'], ['Cursos', '/configuracion/cursos', '.tile'], ['Áreas de trabajo', '/configuracion/areas', 'article.area']]) {
      c = 0;
      await page.goto(BASE + ruta);
      await page.waitForSelector(sel);
      await page.waitForLoadState('networkidle');
      conteo[nombre] = c;
    }
    console.log('      ' + Object.entries(conteo).map(([k, v]) => `${k}: ${v}`).join(' · '));
  }, page);
  await paso('ninguna pantalla pasa de 40 peticiones al abrirse', async () => {
    const mal = Object.entries(conteo).filter(([, v]) => v > 40);
    esperar(!mal.length, 'demasiadas peticiones: ' + mal.map(([k, v]) => `${k} ${v}`).join(', ') + ' (con 300 por minuto y por IP, varias personas del mismo colegio las agotan rápido)');
  }, page);

  // --- «← Datos» y «Omitir» (docente) ---
  console.log('== Docente: «← Datos» y «Omitir por ahora»');
  const DOC_A = '5' + sufijo, AP_A = 'Prueba Atras ' + sufijo.slice(-3);
  let creadoA = false;
  await paso('«Guardar y seguir» y luego «← Datos» vuelve a editar a la misma persona', async () => {
    await abrirAgregar(page);
    await datos(page, { doc: DOC_A, apellido: AP_A, curso: 'Comunicación' });
    await page.getByRole('button', { name: /Guardar y seguir: contrato y cursos/ }).click();
    await page.waitForSelector('app-modal .contrato-layout');
    creadoA = true;
    esperar(await page.getByRole('button', { name: /← Datos/ }).isVisible(), 'falta «← Datos»');
    await page.getByRole('button', { name: /← Datos/ }).click();
    await page.waitForSelector('app-modal #form-personal');
    esperar((await textoModal(page)).includes('Editar personal'), 'debería estar en «Editar personal»');
    esperar(await page.inputValue('#p-nombres') === 'UI' && await page.inputValue('#p-apellidos') === AP_A, 'los datos no quedaron cargados');
    esperar((await pasosVisibles(page)).length === 4, 'el indicador debería seguir con 4 pasos (datos, contrato, cuenta de depósito, cursos)');
    await foto(page, '01-atras');
  }, page);
  await paso('cambia el cargo y vuelve a continuar sin duplicar a la persona', async () => {
    esperar(creadoA, 'no se guardó la persona');
    await page.fill('#p-cargo', 'Docente de prueba');
    await page.getByRole('button', { name: /Guardar y seguir: contrato y cursos/ }).click();
    await page.waitForSelector('app-modal .contrato-layout');
    esperar((await textoModal(page)).includes('Contrato de UI'), 'no volvió al contrato');
  }, page);
  await paso('crea el contrato (3 meses, S/ 1200), omite la cuenta de depósito y los cursos, y la ventana se cierra', async () => {
    esperar(creadoA, 'no se guardó la persona');
    await page.getByRole('button', { name: '3 meses' }).click();
    await page.fill('#ct-rem', '1200');
    await hasta(() => page.getByRole('button', { name: /Crear contrato y seguir/ }).isEnabled(), e => e, 'el botón no se habilitó');
    await page.getByRole('button', { name: /Crear contrato y seguir/ }).click();
    await hasta(() => textoModal(page), t => t.includes('Cuenta de depósito de UI'), 'no llegó a la cuenta de depósito');
    await page.getByRole('button', { name: 'Omitir por ahora' }).click();
    await hasta(() => textoModal(page), t => t.includes('Cursos de UI'), 'no llegó a cursos');
    await page.getByRole('button', { name: /Terminar sin asignar|^Omitir$/ }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('la persona aparece una sola vez, con el cargo cambiado', async () => {
    await page.fill('input[type=search]', DOC_A);
    await page.click('button:has-text("Buscar")');
    await page.waitForSelector(`table.tabla-personal tbody tr:has-text("${AP_A}")`);
    const filas = await page.locator('table.tabla-personal tbody tr', { hasText: AP_A }).count();
    esperar(filas === 1, 'aparece ' + filas + ' veces');
    esperar((await page.locator('table.tabla-personal tbody tr', { hasText: AP_A }).innerText()).includes('Docente de prueba'), 'el cargo no se actualizó');
  }, page);

  // --- Persona de otra área con cuenta de acceso ---
  console.log('== Otra área: cuenta de acceso dentro del flujo');
  const DOC_B = '7' + sufijo, AP_B = 'Prueba Cuenta ' + sufijo.slice(-3);
  await paso('un área que no es Docencia tiene 3 pasos (datos, contrato, cuenta de depósito; sin «Cursos»)', async () => {
    await abrirAgregar(page);
    await page.selectOption('#p-area', { label: 'Administración y recursos humanos' });
    await hasta(() => pasosVisibles(page), p => p.length === 3, 'se esperaban 3 pasos');
    esperar(!(await pasosVisibles(page)).join(' ').includes('Cursos'), 'no debería tener paso de cursos');
    esperar(await page.getByRole('button', { name: /Guardar y crear contrato/ }).isVisible(), 'el botón debería decir «Guardar y crear contrato →»');
  }, page);
  await paso('marca «crear cuenta», guarda y continúa: «← Datos» desaparece (la cuenta ya existe)', async () => {
    await datos(page, { doc: DOC_B, apellido: AP_B });
    await page.check('#p-cuenta');
    await hasta(() => page.inputValue('#p-rol'), v => v !== '', 'el rol no se sugirió').catch(async () => { await page.selectOption('#p-rol', { index: 1 }); });
    await page.getByRole('button', { name: /Guardar y crear contrato/ }).click();
    await page.waitForSelector('app-modal .contrato-layout');
    esperar((await page.locator('.exito-paso').innerText()).includes('cuenta de acceso fue creada'), 'no avisa que la cuenta se creó');
    esperar(await page.getByRole('button', { name: /← Datos/ }).count() === 0, '«← Datos» no debería ofrecerse con la cuenta ya creada');
    await foto(page, '02-con-cuenta');
  }, page);
  await paso('«Omitir por ahora» (contrato y cuenta de depósito) cierra y recién ahí muestra el usuario y la clave inicial', async () => {
    await page.getByRole('button', { name: 'Omitir por ahora' }).click();
    await hasta(() => textoModal(page), t => t.includes('Cuenta de depósito de UI'), 'tras omitir el contrato debería venir la cuenta de depósito');
    esperar(!(await textoModal(page)).includes('Cuenta creada'), 'los datos de la cuenta de acceso no deben mostrarse antes de terminar');
    await page.getByRole('button', { name: 'Omitir por ahora' }).click();
    await page.waitForSelector('app-modal .credenciales');
    const t = (await textoModal(page)).replace(/\s+/g, ' ');
    esperar(t.includes('Cuenta creada') && /Usuario\s*ui\./i.test(t) && t.includes(DOC_B), 'datos de la cuenta: ' + t.slice(0, 200));
    await foto(page, '03-cuenta-creada');
    await page.getByRole('button', { name: 'Entendido' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);

  // --- Pago al personal: filtros, meses anteriores, bonos y contratos ---
  console.log('== Pago al personal: filtros, mes anterior, bonos y contratos');
  const tarjetaA = () => page.locator('article.tarjeta', { hasText: AP_A });
  await paso('el filtro «Sin generar» muestra a la persona y «Pagados» no', async () => {
    await page.goto(BASE + '/personal/pagos');
    await page.fill('input[type=search]', DOC_A);
    await tarjetaA().waitFor();
    await page.selectOption('select[aria-label="Filtrar por estado del pago"]', 'sin-generar');
    await tarjetaA().waitFor();
    await page.selectOption('select[aria-label="Filtrar por estado del pago"]', 'pagado');
    await hasta(() => tarjetaA().count(), c => c === 0, 'con «Pagados» no debería verse');
    await page.selectOption('select[aria-label="Filtrar por estado del pago"]', 'todos');
    await tarjetaA().waitFor();
  }, page);
  await paso('el filtro por área deja solo a Docencia', async () => {
    await page.selectOption('select[aria-label="Filtrar por área"]', { label: 'Administración y recursos humanos' });
    await hasta(() => tarjetaA().count(), c => c === 0, 'el docente no debería verse en Administración');
    await page.selectOption('select[aria-label="Filtrar por área"]', { label: 'Docencia' });
    await tarjetaA().waitFor();
    await page.selectOption('select[aria-label="Filtrar por área"]', '0').catch(() => page.selectOption('select[aria-label="Filtrar por área"]', { index: 0 }));
  }, page);
  await paso('en el mes anterior no tiene contrato ni asistencia', async () => {
    await page.fill('#pp-mes', mesAnterior());
    await hasta(() => tarjetaA().innerText(), t => t.includes('No tiene contrato en'), 'debería decir que no tiene contrato en el mes anterior');
    const t = (await tarjetaA().innerText()).replace(/\s+/g, ' ');
    esperar(t.includes('Sin asistencia registrada'), 'debería decir que no hay asistencia: ' + t.slice(0, 200));
    esperar(await page.getByRole('button', { name: /Generar planilla de/ }).isEnabled(), 'generar planilla debería seguir disponible');
    await page.fill('#pp-mes', mesActual());
    await hasta(() => tarjetaA().innerText(), t2 => t2.includes('Vigente'), 'al volver al mes actual debería verse el contrato');
  }, page);
  await paso('«Bonos y descuentos» abre en Pagos y registra un bono que aparece en la tarjeta', async () => {
    await tarjetaA().getByRole('button', { name: 'Bonos y descuentos' }).click();
    await page.waitForSelector('app-modal [role=tab][aria-selected=true]');
    esperar((await page.locator('app-modal [role=tab][aria-selected=true]').innerText()).startsWith('Pagos'), 'debería abrir en la pestaña Pagos');
    await page.getByRole('button', { name: 'Registrar pago' }).click();
    await page.selectOption('#p-con', 'BONO');
    await page.fill('#p-monto', '100');
    await page.fill('#p-desc', 'Bono de prueba');
    await page.getByRole('button', { name: 'Registrar', exact: true }).click();
    await hasta(() => textoModal(page), t => t.includes('Bono de prueba'), 'el bono no aparece en la ventana');
    await foto(page, '04-bono');
    await page.locator('app-modal button.btn', { hasText: /^Cerrar$/ }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await hasta(() => tarjetaA().innerText(), t => t.includes('Bono de prueba'), 'la tarjeta no muestra el bono');
  }, page);
  await paso('«Contratos» muestra el contrato y «Rescindir» lo deja rescindido (con confirmación)', async () => {
    await tarjetaA().getByRole('button', { name: 'Contratos', exact: true }).click();
    await page.waitForSelector('app-modal table');
    await hasta(() => page.locator('app-modal', { hasText: 'Contratos y pagos' }).innerText(), t => t.includes('Vigente'), 'debería listar el contrato vigente');
    await page.locator('app-modal tbody').getByRole('button', { name: 'Rescindir' }).click();
    await page.fill('#r-motivo', 'Prueba de interfaz');
    await page.locator('app-modal .caja').getByRole('button', { name: 'Rescindir' }).click();
    await page.locator('app-confirm button.btn-danger').click(); // diálogo de confirmación
    await hasta(() => page.locator('app-modal', { hasText: 'Contratos y pagos' }).innerText(), t => t.includes('Rescindido'), 'el contrato no quedó rescindido');
    await page.locator('app-modal button.btn', { hasText: /^Cerrar$/ }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await hasta(() => tarjetaA().innerText(), t => t.includes('Rescindido'), 'la tarjeta no refleja la rescisión');
    await foto(page, '05-rescindido');
  }, page);

  // --- Docentes del curso ---
  console.log('== Configuración → Cursos: docentes del curso');
  await paso('asigna a la persona como docente de Matemática desde el curso y queda marcada al reabrir', async () => {
    await page.goto(BASE + '/configuracion/cursos');
    await page.waitForSelector('.tile');
    const abrir = () => page.locator('.tile', { has: page.locator('strong', { hasText: /^Matemática$/ }) }).first().click();
    await abrir();
    await page.waitForSelector('input[aria-label="Buscar docente"]');
    await page.fill('input[aria-label="Buscar docente"]', AP_A);
    const fila = page.locator('label.doc', { hasText: AP_A });
    await fila.waitFor();
    esperar(!(await fila.locator('input').isChecked()), 'no debería estar marcada todavía');
    await fila.click();
    await hasta(() => fila.locator('input').isChecked(), c => c, 'no se marcó');
    await page.getByRole('button', { name: 'Guardar curso' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await abrir();
    await page.fill('input[aria-label="Buscar docente"]', AP_A);
    await hasta(() => page.locator('label.doc', { hasText: AP_A }).locator('input').isChecked(), c => c, 'al reabrir no quedó marcada');
    await foto(page, '06-docentes-curso');
    await page.getByRole('button', { name: 'Cancelar' }).click();
  }, page);

  // --- Áreas desactivadas con dinero ---
  console.log('== Áreas desactivadas con dinero');
  let areaId = null;
  await paso('prepara un área desactivada con S/ 200 asignados', async () => {
    const lista = await api('GET', '/api/v1/planificacion/areas?todas=true');
    let a = (lista.json || []).find(x => x.codigo === 'UI_AREA_PRUEBA');
    if (!a) a = (await api('POST', '/api/v1/planificacion/areas', { codigo: 'UI_AREA_PRUEBA', nombre: 'UI Área de prueba', descripcion: 'Creada por la prueba de interfaz' })).json;
    areaId = a.id;
    await api('PATCH', `/api/v1/planificacion/areas/${areaId}/activo?activo=true`);
    const f = await api('PUT', `/api/v1/pagos/fondo/areas/${areaId}`, { monto: 200, motivo: 'UI prueba' });
    esperar(f.status === 200, 'no se pudo asignar dinero (¿hay S/ 200 en caja?): ' + JSON.stringify(f.json).slice(0, 150));
    const d = await api('PATCH', `/api/v1/planificacion/areas/${areaId}/activo?activo=false`);
    esperar(d.status === 200, 'no se pudo desactivar el área: ' + d.status);
  }, page);
  await paso('el banner avisa del dinero en áreas desactivadas y permite mostrarlas', async () => {
    esperar(areaId, 'sin área de prueba');
    await page.goto(BASE + '/configuracion/areas');
    const aviso = page.locator('.aviso', { hasText: 'siguen asignados a áreas desactivadas' });
    await aviso.waitFor();
    esperar((await aviso.innerText()).includes('200.00'), 'debería citar S/ 200.00: ' + (await aviso.innerText()));
    await aviso.getByRole('button', { name: 'Mostrarlas' }).click();
    await page.locator('article.area.apagada', { hasText: 'UI Área de prueba' }).waitFor();
    await foto(page, '07-areas-inactivas');
  }, page);
  await paso('devolverlo a caja desde el área desactivada hace desaparecer el aviso', async () => {
    esperar(areaId, 'sin área de prueba');
    await page.locator('article.area', { hasText: 'UI Área de prueba' }).getByRole('button', { name: 'Asignar dinero' }).click();
    await page.getByRole('button', { name: 'Dejar en 0' }).click();
    await hasta(() => page.locator('.vista-caja').innerText(), t => t.includes('Vuelven S/ 200.00'), 'no dice que vuelven 200');
    await page.locator('app-modal button[type=submit]').click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await hasta(() => page.locator('.aviso', { hasText: 'siguen asignados a áreas desactivadas' }).count(), c => c === 0, 'el aviso debería desaparecer');
  }, page);

  // --- Un contrato por persona: renovar; y cuenta de depósito ---
  console.log('== Un contrato por persona (renovar) y cuenta de depósito');
  await new Promise(r => setTimeout(r, 30000)); // el Gateway limita a 300 peticiones por minuto y por IP: se deja pasar la ventana
  const hoyD = new Date();
  const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const sumar = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const AP_R = 'Prueba Renueva ' + sufijo.slice(-3);
  const tarjetaR = () => page.locator('article.tarjeta', { hasText: AP_R });
  const modalRrhh = () => page.locator('app-modal', { hasText: 'Contratos y pagos' });
  let personaR = null;
  await paso('prepara a una persona con un contrato vigente que vence pronto', async () => {
    const areas = (await api('GET', '/api/v1/planificacion/areas')).json;
    const admin = areas.find(a => a.codigo === 'ADMINISTRACION');
    const p = await api('POST', '/api/v1/planificacion/docentes', { numeroDocumento: '2' + sufijo, nombres: 'UI', apellidos: AP_R, areaId: admin.id, cargo: 'Contadora' });
    esperar(p.status === 201, 'no se creó la persona: ' + p.status);
    personaR = p.json;
    const c = await api('POST', '/api/v1/planificacion/rrhh/contratos', { personalId: personaR.id, tipo: 'PLAZO_FIJO', fechaInicio: ymd(sumar(hoyD, -60)), fechaFin: ymd(sumar(hoyD, 20)), remuneracion: 1500 });
    esperar(c.status === 201, 'no se creó el contrato: ' + c.status + ' ' + JSON.stringify(c.json).slice(0, 120));
  }, page);
  await paso('con un contrato vigente no hay «Nuevo contrato»: se ofrece «Renovar contrato»', async () => {
    esperar(personaR, 'sin persona de prueba');
    await page.goto(BASE + '/personal/pagos');
    await page.fill('input[type=search]', AP_R);
    await tarjetaR().waitFor();
    await tarjetaR().getByRole('button', { name: 'Contratos', exact: true }).click();
    await hasta(() => modalRrhh().innerText(), t => t.includes('Ya tiene un contrato vigente'), 'debería explicar que cada persona tiene un solo contrato');
    esperar(await modalRrhh().locator('.acciones-barra').getByRole('button', { name: 'Nuevo contrato' }).count() === 0, '«Nuevo contrato» no debería ofrecerse');
    esperar(await modalRrhh().locator('.acciones-barra').getByRole('button', { name: 'Renovar contrato' }).isVisible(), 'falta «Renovar contrato»');
    await foto(page, '14-un-contrato');
  }, page);
  await paso('«Renovar contrato»: empieza el día siguiente, atajo de un año y el cambio de sueldo se anota', async () => {
    await modalRrhh().locator('.acciones-barra').getByRole('button', { name: 'Renovar contrato' }).click();
    const esperadoInicio = sumar(hoyD, 21);
    const textoInicio = `${String(esperadoInicio.getDate()).padStart(2, '0')} ${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][esperadoInicio.getMonth()]} ${esperadoInicio.getFullYear()}`;
    await hasta(() => modalRrhh().locator('.renovar-cab').innerText(), t => t.includes(textoInicio), `el nuevo contrato debería empezar el ${textoInicio} (día siguiente al fin)`);
    await modalRrhh().getByRole('button', { name: '1 año' }).click();
    await hasta(() => modalRrhh().locator('.resumen-renovar').innerText(), t => t.includes('1 año') && t.includes(textoInicio), 'el resumen no refleja 1 año desde el día siguiente');
    await page.fill('#rn-rem', '1700');
    await hasta(() => modalRrhh().locator('#form-renovar').innerText(), t => /\+\s*S\/\s*200\.00/.test(t), 'no anota el aumento de sueldo (+S/ 200.00)');
    await foto(page, '15-renovar');
    await modalRrhh().locator('#form-renovar button[type=submit]').click();
    await hasta(() => modalRrhh().locator('tbody tr').count(), c => c === 2, 'la lista debería tener 2 contratos');
    esperar((await modalRrhh().locator('tbody').innerText()).includes('Por iniciar'), 'el contrato renovado debería figurar «Por iniciar»');
  }, page);
  await paso('una renovación hecha por error se cancela rescindiéndola antes de que empiece', async () => {
    const fila = modalRrhh().locator('tbody tr', { hasText: 'Por iniciar' });
    await fila.getByRole('button', { name: 'Rescindir' }).click();
    await hasta(() => modalRrhh().locator('.caja').innerText(), t => t.includes('Cancelar el contrato que empieza'), 'debería hablar de cancelar el contrato que aún no empieza');
    await modalRrhh().locator('.caja').getByRole('button', { name: 'Rescindir' }).click();
    await page.locator('app-confirm button.btn-danger').click();
    await hasta(() => modalRrhh().locator('tbody').innerText(), t => t.includes('Rescindido'), 'la renovación no quedó rescindida');
    esperar(await modalRrhh().locator('.acciones-barra').getByRole('button', { name: 'Renovar contrato' }).isVisible(), 'debería poder renovarse de nuevo');
  }, page);
  await paso('«Cuenta de depósito»: el formulario valida en vivo y Yape pasa a billetera', async () => {
    await modalRrhh().getByRole('tab', { name: /Cuenta de depósito/ }).click();
    await hasta(() => modalRrhh().innerText(), t => t.includes('Aún no tiene una cuenta'), 'debería decir que no tiene cuenta');
    await modalRrhh().getByRole('button', { name: 'Agregar cuenta' }).first().click();
    esperar((await page.inputValue('#cu-titular')).includes('UI'), 'el titular debería venir con el nombre de la persona');
    await page.fill('#cu-numero', '1234567');
    await hasta(() => modalRrhh().locator('#form-cuenta').innerText(), t => t.includes('entre 8 y 20 dígitos'), 'no avisa que el número es corto');
    await hasta(() => modalRrhh().locator('#form-cuenta button[type=submit]').isDisabled(), d => d, 'guardar debería estar bloqueado');
    await page.selectOption('#cu-banco', 'YAPE');
    await hasta(() => page.inputValue('#cu-tipo'), v => v === 'BILLETERA', 'elegir Yape debería poner el tipo «Billetera»');
    esperar(await page.locator('#cu-cci').count() === 0, 'una billetera no lleva CCI');
    esperar((await modalRrhh().locator('label[for=cu-numero]').innerText()).includes('Celular'), 'el campo debería pedir el celular');
    await page.fill('#cu-numero', '12345');
    await hasta(() => modalRrhh().locator('#form-cuenta').innerText(), t => t.includes('9 dígitos'), 'no avisa que el celular tiene 9 dígitos');
    await page.selectOption('#cu-banco', 'BCP');
    await hasta(() => page.inputValue('#cu-tipo'), v => v === 'AHORROS', 'volver a un banco debería devolver «Ahorros»');
  }, page);
  await paso('agrega la cuenta del BCP (principal) y luego Yape; hacer principal mueve la insignia', async () => {
    await page.fill('#cu-numero', '194-12345678-0-12');
    await page.fill('#cu-cci', '002 194 001234567801 12');
    await hasta(() => modalRrhh().locator('#form-cuenta button[type=submit]').isEnabled(), e => e, 'con datos válidos debería poder guardarse');
    await modalRrhh().locator('#form-cuenta button[type=submit]').click();
    await hasta(() => modalRrhh().locator('.cuentas .cuenta').count(), c => c === 1, 'la cuenta no apareció');
    esperar((await modalRrhh().locator('.cuenta').first().innerText()).includes('Principal'), 'la primera cuenta debería ser la principal');
    await modalRrhh().getByRole('button', { name: 'Agregar cuenta' }).first().click();
    await page.selectOption('#cu-banco', 'YAPE');
    await page.fill('#cu-numero', '987654321');
    await page.uncheck('#form-cuenta input[type=checkbox]');
    await modalRrhh().locator('#form-cuenta button[type=submit]').click();
    await hasta(() => modalRrhh().locator('.cuentas .cuenta').count(), c => c === 2, 'la segunda cuenta no apareció');
    const yape = modalRrhh().locator('.cuenta', { hasText: 'Yape' });
    esperar(!(await yape.innerText()).includes('Principal'), 'Yape no debería ser principal todavía');
    await yape.getByRole('button', { name: 'Hacer principal' }).click();
    await hasta(() => modalRrhh().locator('.cuenta', { hasText: 'Yape' }).innerText(), t => t.includes('Principal'), 'Yape debería pasar a ser la principal');
    esperar(!(await modalRrhh().locator('.cuenta', { hasText: 'BCP' }).innerText()).includes('Principal'), 'el BCP ya no debería ser la principal');
    await foto(page, '16-cuentas');
    await page.locator('app-modal button.btn', { hasText: /^Cerrar$/ }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('la tarjeta muestra la cuenta de depósito y la ventana «Pagar» sus datos', async () => {
    await hasta(() => tarjetaR().locator('.deposito').innerText(), t => t.includes('Yape') && t.includes('4321'), 'la tarjeta debería mostrar «Yape · •••• 4321»');
    // La renovación cancelada antes de empezar no puede aparecer como el contrato del mes (antes la tarjeta mostraba «Rescindido»).
    const bloque = (await tarjetaR().locator('.bloque').first().innerText()).replace(/\s+/g, ' ');
    esperar(!bloque.includes('Rescindido') && /Por vencer|Vigente/.test(bloque), 'la tarjeta muestra el contrato equivocado: ' + bloque.slice(0, 160));
    await page.getByRole('button', { name: /Generar planilla de/ }).click();
    await tarjetaR().getByRole('button', { name: /^Pagar a / }).waitFor();
    await tarjetaR().getByRole('button', { name: /^Pagar a / }).click();
    await page.waitForSelector('app-modal .destino');
    const d = (await page.locator('app-modal .destino').innerText()).replace(/\s+/g, ' ');
    esperar(d.includes('987654321') && d.includes('Titular'), 'la ventana de pago no muestra los datos de la cuenta: ' + d);
    await foto(page, '17-pagar-con-cuenta');
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('quien no tiene cuenta lo dice y lleva directo a agregarla', async () => {
    await page.fill('input[type=search]', AP_A);
    await tarjetaA().waitFor();
    esperar((await tarjetaA().locator('.deposito').innerText()).includes('Sin cuenta de depósito'), 'debería avisar que no tiene cuenta');
    await tarjetaA().getByRole('button', { name: 'Agregar cuenta' }).click();
    await hasta(() => modalRrhh().locator('[role=tab][aria-selected=true]').innerText(), t => t.includes('Cuenta de depósito'), 'debería abrir en la pestaña de la cuenta');
    await page.locator('app-modal button.btn', { hasText: /^Cerrar$/ }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);
  await paso('una persona que ya tiene contrato: «Guardar y crear contrato» lo avisa y no deja crear otro', async () => {
    await abrirAgregar(page);
    // Se edita a la persona de prueba (ya tiene contrato) desde la tabla, y se continúa al paso del contrato.
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
    await page.fill('input[type=search]', AP_R);
    await page.click('button:has-text("Buscar")');
    await page.locator('table.tabla-personal tbody tr', { hasText: AP_R }).getByRole('button', { name: /Editar a/ }).click();
    await page.waitForSelector('app-modal #form-personal');
    await page.getByRole('button', { name: /Guardar y crear contrato/ }).click();
    await page.waitForSelector('app-modal .contrato-layout');
    await hasta(() => textoModal(page), t => t.includes('ya tiene un contrato'), 'debería avisar que ya tiene un contrato');
    await hasta(() => page.getByRole('button', { name: /Crear contrato/ }).isDisabled(), d => d, '«Crear contrato» debería estar bloqueado');
    await foto(page, '18-ya-tiene-contrato');
    await page.getByRole('button', { name: 'Omitir por ahora' }).click();       // sigue la cuenta de depósito
    await hasta(() => textoModal(page), t => t.includes('Cuenta de depósito de UI'), 'debería seguir la cuenta de depósito');
    await page.getByRole('button', { name: 'Omitir por ahora' }).click();
    await page.waitForSelector('app-modal', { state: 'detached' });
  }, page);

  // El Gateway limita a 300 peticiones por minuto y por IP: se suelta la sesión del administrador y se deja pasar la ventana.
  await page.goto('about:blank');
  await new Promise(r => setTimeout(r, 25000));

  // ===================== SECRETARÍA =====================
  console.log('== Secretaría');
  let ctxS = null, pageS = null;
  const DOC_C = '4' + sufijo, AP_C = 'Prueba Secre ' + sufijo.slice(-3);
  await paso('prepara y activa la cuenta de secretaría', async () => {
    const lista = (await api('GET', '/api/v1/auth/usuarios?size=100')).json.contenido;
    let u = lista.find(x => x.username === USUARIO_SEC);
    if (!u) {
      const c = await api('POST', '/api/v1/auth/usuarios', { username: USUARIO_SEC, email: `${USUARIO_SEC}@colegio.pe`, nombres: 'Secretaria', apellidos: 'Prueba', roles: ['SECRETARIA'], clave: CLAVE_SEC });
      esperar(c.status < 300, 'no se pudo crear la cuenta: ' + c.status + ' ' + JSON.stringify(c.json).slice(0, 150));
    } else if (!u.activo) {
      esperar((await api('PATCH', `/api/v1/auth/usuarios/${u.id}/activar`)).status === 200, 'no se pudo activar');
    }
  }, page);
  await paso('entra como secretaría', async () => {
    ctxS = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-PE' });
    pageS = await ctxS.newPage();
    vigila(pageS);
    await entrar(pageS, USUARIO_SEC, CLAVE_SEC);
    esperar(!pageS.url().includes('cambiar-clave'), 'la cuenta pide cambiar la clave');
  }, page);
  await paso('Personal no ofrece Pago al personal pero sí Asistencia del personal', async () => {
    await pageS.goto(BASE + '/personal');
    await pageS.waitForSelector('table.tabla-personal');
    const menu = (await pageS.locator('nav.menu-v').innerText()).toLowerCase();
    esperar(!menu.includes('pago al personal') && menu.includes('asistencia del personal'), 'menú: ' + menu.replace(/\n/g, ' | '));
    esperar(!menu.includes('cuentas de acceso'), 'la secretaría no debería ver «Cuentas de acceso»');
  }, pageS || page);
  await paso('entrar a /personal/pagos por la barra de direcciones no muestra el pago', async () => {
    await pageS.goto(BASE + '/personal/pagos');
    await pageS.waitForLoadState('networkidle');
    esperar(!(await pageS.locator('body').innerText()).includes('Generar planilla'), 'la secretaría ve la pantalla de pagos');
    esperar(!pageS.url().endsWith('/personal/pagos'), 'no la redirigió: ' + pageS.url());
  }, pageS || page);
  await paso('la secretaría marca asistencia (Asistencia del personal funciona)', async () => {
    await pageS.goto(BASE + '/personal/asistencia');
    await pageS.waitForSelector('table.tabla-asistencia tbody tr');
    await pageS.fill('input[type=search]', DOC_A);
    const fila = pageS.locator('table.tabla-asistencia tbody tr', { hasText: AP_A });
    await fila.waitFor();
    await fila.locator('select').selectOption('PRESENTE');
    await pageS.getByRole('button', { name: 'Guardar el día' }).click();
    await pageS.waitForFunction(() => document.body.innerText.includes('Asistencia guardada'));
  }, pageS || page);
  await paso('«Agregar personal» de docente: 2 pasos y botón «Guardar y asignar cursos →» (sin contrato ni cuenta)', async () => {
    await abrirAgregar(pageS);
    await datos(pageS, { doc: DOC_C, apellido: AP_C, curso: 'Matemática' });
    esperar((await pasosVisibles(pageS)).length === 2, 'se esperaban 2 pasos (datos, cursos): ' + (await pasosVisibles(pageS)).join(' / '));
    esperar(await pageS.getByRole('button', { name: /Guardar y asignar cursos/ }).isVisible(), 'falta «Guardar y asignar cursos →»');
    esperar(await pageS.locator('#p-cuenta').count() === 0, 'la secretaría no debería poder crear cuentas');
    await foto(pageS, '08-secretaria-datos');
  }, pageS || page);
  await paso('guarda y llega directo a «Cursos»; elige y asigna', async () => {
    await pageS.getByRole('button', { name: /Guardar y asignar cursos/ }).click();
    await hasta(() => textoModal(pageS), t => t.includes('Cursos de UI'), 'no llegó a cursos');
    esperar(!(await textoModal(pageS)).includes('Contrato de'), 'no debería pasar por el contrato');
    await elegirCursoLibre(pageS, 'Matemática');
    await pageS.getByRole('button', { name: /^Asignar \d+ cursos?$/ }).click();
    await pageS.waitForSelector('app-modal', { state: 'detached' });
    await foto(pageS, '09-secretaria-asignado');
  }, pageS || page);
  await paso('Configuración → Áreas no muestra el dinero de caja a la secretaría', async () => {
    await pageS.goto(BASE + '/configuracion/areas');
    await pageS.waitForSelector('article.area');
    esperar(await pageS.locator('.caja').count() === 0 && await pageS.getByRole('button', { name: 'Asignar dinero' }).count() === 0, 'la secretaría ve el dinero de caja');
  }, pageS || page);

  await pageS.goto('about:blank');
  await new Promise(r => setTimeout(r, 25000));

  // ===================== CELULAR =====================
  console.log('== Celular (390 × 844)');
  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'es-PE' });
  const pageM = await ctxM.newPage();
  vigila(pageM);
  await paso('entra como administrador desde el celular', async () => { await entrar(pageM, 'admin', 'admin123'); }, pageM);
  for (const [nombre, ruta, esperaSel] of [
    ['Personal', '/personal', 'table.tabla-personal'],
    ['Pago al personal', '/personal/pagos', 'article.tarjeta'],
    ['Asistencia del personal', '/personal/asistencia', 'table.tabla-asistencia'],
    ['Áreas de trabajo', '/configuracion/areas', '.tile-caja']
  ]) {
    await paso(`${nombre}: la página no se sale de la pantalla`, async () => {
      await pageM.goto(BASE + ruta);
      await pageM.waitForSelector(esperaSel);
      await pageM.waitForTimeout(400);
      esperar(await sinPaginaAncha(pageM), 'hay desplazamiento horizontal de toda la página (' + await pageM.evaluate(() => document.documentElement.scrollWidth) + ' px)');
      await foto(pageM, `10-celular-${ruta.replace(/\W+/g, '_')}`);
    }, pageM);
  }
  await paso('Pago al personal: las tarjetas ocupan una sola columna', async () => {
    await pageM.goto(BASE + '/personal/pagos');
    await pageM.waitForSelector('article.tarjeta');
    const ancho = await pageM.evaluate(() => { const t = document.querySelector('article.tarjeta').getBoundingClientRect(); return { w: t.width, vw: window.innerWidth }; });
    esperar(ancho.w <= ancho.vw && ancho.w > ancho.vw * 0.7, `la tarjeta mide ${Math.round(ancho.w)} px en una pantalla de ${ancho.vw}`);
  }, pageM);
  await paso('«Agregar personal» y su paso de contrato caben en el celular', async () => {
    await pageM.goto(BASE + '/personal');
    await pageM.waitForSelector('table.tabla-personal');
    await pageM.click('button:has-text("Agregar personal")');
    await pageM.waitForSelector('app-modal #form-personal');
    const cabe = await pageM.evaluate(() => { const m = document.querySelector('app-modal [role=dialog], app-modal .modal, app-modal > div'); const r = (m || document.querySelector('app-modal')).getBoundingClientRect(); return r.width <= window.innerWidth + 1 && document.documentElement.scrollWidth <= window.innerWidth + 1; });
    esperar(cabe, 'la ventana se sale de la pantalla');
    await foto(pageM, '11-celular-modal');
  }, pageM);
  await paso('Áreas: la ventana «Asignar dinero» cabe en el celular', async () => {
    await pageM.goto(BASE + '/configuracion/areas');
    await pageM.waitForSelector('article.area');
    await pageM.locator('article.area').first().getByRole('button', { name: 'Asignar dinero' }).click();
    await pageM.waitForSelector('#mf-monto');
    esperar(await sinPaginaAncha(pageM), 'la ventana ensancha la página');
    await foto(pageM, '12-celular-asignar');
  }, pageM);
  await paso('Áreas: la ventana «Repartir dinero entre las áreas» cabe en el celular y sus campos se alcanzan', async () => {
    await pageM.goto(BASE + '/configuracion/areas');
    await pageM.waitForSelector('article.area');
    await pageM.getByRole('button', { name: 'Repartir dinero entre las áreas' }).click();
    await pageM.waitForSelector('.reparto-tabla tbody tr');
    esperar(await sinPaginaAncha(pageM), 'la ventana ensancha la página');
    const campo = await pageM.evaluate(() => { const c = document.querySelector('.reparto-tabla input.monto-reparto').getBoundingClientRect(); return { derecha: c.right, ancho: window.innerWidth }; });
    esperar(campo.derecha <= campo.ancho + 1, `el campo de monto se sale de la pantalla (${Math.round(campo.derecha)} px de ${campo.ancho})`);
    await foto(pageM, '13-celular-reparto');
  }, pageM);

  // ===================== SALUD =====================
  console.log('== salud de la interfaz');
  // Los 429 (límite de peticiones del Gateway) se cuentan aparte: la automatización navega más rápido que una persona.
  const limitadas = respuestasMalas.filter(r => r.startsWith('429'));
  const otrasMalas = respuestasMalas.filter(r => !r.startsWith('429') && !/\/docentes\/mi/.test(r));
  const otrosErrores = erroresConsola.filter(e => !e.includes('status of 429'));
  console.log(`      (el Gateway respondió 429 en ${limitadas.length} peticiones durante todo el recorrido)`);
  await paso('sin errores en la consola del navegador (salvo 429)', async () => { esperar(otrosErrores.length === 0, otrosErrores.slice(0, 3).join(' || ')); }, page);
  await paso('sin respuestas 4xx/5xx inesperadas (salvo 429)', async () => { esperar(otrasMalas.length === 0, otrasMalas.slice(0, 6).join(' || ')); }, page);
  // Una o dos respuestas 429 son la ráfaga de la automatización (una persona tarda minutos en lo que aquí pasa en segundos); más de 3 sería un problema.
  await paso('el recorrido no agotó el límite de peticiones del Gateway (se admiten hasta 3 por la ráfaga de la prueba)', async () => { esperar(limitadas.length <= 3, `${limitadas.length} respuestas 429: ` + limitadas.slice(0, 3).join(' || ')); }, page);

  // La cuenta de secretaría vuelve a quedar desactivada.
  try {
    const u = (await api('GET', '/api/v1/auth/usuarios?size=100')).json.contenido.find(x => x.username === USUARIO_SEC);
    if (u && u.activo) await api('PATCH', `/api/v1/auth/usuarios/${u.id}/desactivar`);
  } catch { /* se limpia en limpiar_pruebas_ui.py */ }

  await browser.close();
  const fallos = resultados.filter(r => !r.ok);
  console.log(`\n${resultados.length - fallos.length}/${resultados.length} pasos correctos · capturas en ${CAPTURAS}`);
  if (fallos.length) { console.log('FALLOS:'); fallos.forEach(f => console.log('  - ' + f.nombre + ': ' + f.motivo)); }
  process.exit(fallos.length ? 1 : 0);
})();
