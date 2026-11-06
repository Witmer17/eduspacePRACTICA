import { Colegio } from '../../core/models/planificacion.model';
import { Bloque, DocumentoArmado } from './documentos';

/**
 * Escritor de PDF mínimo y sin dependencias: texto en Helvetica (WinAnsi, con tildes y eñes), párrafos con salto de línea, datos en dos columnas,
 * tablas y firma, en hojas A4 (con salto de página). Sirve para guardar el documento generado como archivo en el expediente del alumno.
 */
const ANCHO = 595;
const ALTO = 842;
const MARGEN = 56;
const UTIL = ANCHO - 2 * MARGEN;
const PIE = 70;

/** Anchos de Helvetica (milésimas de em) de ' ' a '~'. */
const W = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584];

/** Caracteres fuera de Latin-1 que WinAnsi sí tiene. */
const ESPECIALES: Record<string, number> = { '—': 0x97, '–': 0x96, '’': 0x92, '‘': 0x91, '“': 0x93, '”': 0x94, '…': 0x85, '•': 0x95, '€': 0x80 };
const BASE_ACENTOS: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U', Ñ: 'N' };

/** Un texto como bytes WinAnsi (cada carácter ≤ 255) para escribirlo dentro de una cadena PDF. */
export function winAnsi(texto: string): string {
  let r = '';
  for (const ch of texto) {
    const c = ch.codePointAt(0)!;
    if (ESPECIALES[ch] !== undefined) r += String.fromCharCode(ESPECIALES[ch]);
    else if (c === 0x0a || c === 0x0d || c === 0x09) r += ' ';
    else if (c >= 32 && c <= 255) r += ch;
    else r += '?';
  }
  return r;
}

const escapar = (s: string): string => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

function anchoChar(ch: string): number {
  const base = BASE_ACENTOS[ch] ?? ch;
  const c = base.charCodeAt(0);
  if (c >= 32 && c <= 126) return W[c - 32];
  if (ch === '¿' || ch === '?') return 556;
  if (ch === '¡') return 333;
  if (ch === '«' || ch === '»' || ch === '°' || ch === 'º' || ch === 'ª') return 556;
  if (ch === '·') return 278;
  return 556;
}

/** Ancho aproximado de un texto en puntos (la negrita se calcula un poco más ancha). */
export function ancho(texto: string, tam: number, negrita = false): number {
  let t = 0;
  for (const ch of texto) t += anchoChar(ch);
  return (t * tam * (negrita ? 1.07 : 1)) / 1000;
}

/** Parte un texto en líneas que caben en `max` puntos (palabra a palabra; una palabra más larga se corta). */
export function envolver(texto: string, tam: number, max: number, negrita = false): string[] {
  const lineas: string[] = [];
  let actual = '';
  for (const palabra of texto.split(/\s+/).filter(Boolean)) {
    let p = palabra;
    while (ancho(p, tam, negrita) > max) {           // palabra más larga que la línea: se corta
      let n = p.length;
      while (n > 1 && ancho(p.slice(0, n), tam, negrita) > max) n--;
      if (actual) { lineas.push(actual); actual = ''; }
      lineas.push(p.slice(0, n));
      p = p.slice(n);
    }
    const prueba = actual ? `${actual} ${p}` : p;
    if (ancho(prueba, tam, negrita) <= max) actual = prueba;
    else { if (actual) lineas.push(actual); actual = p; }
  }
  if (actual) lineas.push(actual);
  return lineas.length ? lineas : [''];
}

type Fuente = 'F1' | 'F2' | 'F3';

class Hoja {
  private paginas: string[] = [];
  private cont = '';
  y = ALTO - MARGEN;

  constructor() { this.nueva(); }

  nueva(): void {
    if (this.cont) this.paginas.push(this.cont);
    this.cont = '';
    this.y = ALTO - MARGEN;
  }

  asegurar(alto: number): void {
    if (this.y - alto < PIE) this.nueva();
  }

  texto(x: number, y: number, t: string, fuente: Fuente, tam: number, gris = 0): void {
    this.cont += `BT ${gris} g /${fuente} ${tam} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapar(winAnsi(t))}) Tj ET\n`;
  }

  rect(x: number, y: number, w: number, h: number, modo: 'f' | 'S', gris = 0): void {
    this.cont += modo === 'f' ? `${gris} g ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f\n` : `0.6 G 0.5 w ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re S\n`;
  }

  contenidos(): string[] {
    return this.cont ? [...this.paginas, this.cont] : this.paginas;
  }
}

function pintarBloque(h: Hoja, b: Bloque): void {
  switch (b.k) {
    case 'titulo': {
      h.asegurar(40);
      h.y -= 12;
      const t = b.texto;
      h.texto(MARGEN + (UTIL - ancho(t, 12, true)) / 2, h.y, t, 'F2', 12);
      h.y -= 20;
      break;
    }
    case 'parrafo': {
      const lineas = envolver(b.texto, 11, UTIL, !!b.destacado);
      for (const l of lineas) {
        h.asegurar(18);
        h.texto(MARGEN, h.y, l, b.destacado ? 'F2' : 'F1', 11);
        h.y -= 17;
      }
      h.y -= 8;
      break;
    }
    case 'datos': {
      const col = (UTIL - 20) / 2;
      for (let i = 0; i < b.filas.length; i += 2) {
        const par = b.filas.slice(i, i + 2);
        const valores = par.map(f => envolver(f[1], 10.5, col, true));
        const alto = 12 + Math.max(...valores.map(v => v.length)) * 13 + 6;
        h.asegurar(alto);
        par.forEach((f, j) => {
          const x = MARGEN + j * (col + 20);
          h.texto(x, h.y, f[0].toUpperCase(), 'F1', 7.5, 0.35);
          valores[j].forEach((l, k) => h.texto(x, h.y - 13 - k * 13, l, 'F2', 10.5));
          h.rect(x, h.y - alto + 12, col, 0.4, 'f', 0.8);
        });
        h.y -= alto;
      }
      h.y -= 6;
      break;
    }
    case 'tabla': {
      const pesos = b.columnas.map((c, i) => Math.min(Math.max(c.length, ...b.filas.map(f => (f[i] ?? '').length), 6), 26));
      const suma = pesos.reduce((t, p) => t + p, 0);
      const anchos = pesos.map(p => (UTIL * p) / suma);
      const fila = (celdas: string[], cabecera: boolean): void => {
        const tam = 8;
        const lineas = celdas.map((c, i) => envolver(c, tam, anchos[i] - 8, cabecera));
        const alto = Math.max(...lineas.map(l => l.length)) * 10 + 8;
        h.asegurar(alto + 2);
        let x = MARGEN;
        if (cabecera) h.rect(MARGEN, h.y - alto, UTIL, alto, 'f', 0.93);
        lineas.forEach((ls, i) => {
          ls.forEach((l, k) => h.texto(x + 4, h.y - 11 - k * 10, l, cabecera ? 'F2' : 'F1', tam));
          h.rect(x, h.y - alto, anchos[i], alto, 'S');
          x += anchos[i];
        });
        h.y -= alto;
      };
      fila(b.columnas, true);
      if (!b.filas.length) fila(['Sin registros.', ...b.columnas.slice(1).map(() => '')], false);
      for (const f of b.filas) fila(b.columnas.map((_, i) => f[i] ?? ''), false);
      h.y -= 14;
      break;
    }
  }
}

/** Arma el PDF del documento: cabecera del colegio, título, cuerpo, lugar y fecha, y firma. */
export function crearPdf(doc: DocumentoArmado, colegio: Colegio | null): Uint8Array {
  const h = new Hoja();
  // Cabecera
  h.texto(MARGEN, h.y - 12, colegio?.nombre ?? 'Colegio', 'F2', 15);
  let y = h.y - 12;
  if (colegio?.lema) { y -= 14; h.texto(MARGEN, y, colegio.lema, 'F3', 9, 0.3); }
  const info = [[colegio?.direccion, colegio?.distrito].filter(Boolean).join(', '), colegio?.telefono && `Tel. ${colegio.telefono}`, colegio?.email, colegio?.ruc && `RUC ${colegio.ruc}`].filter(Boolean).join('  ·  ');
  if (info) for (const l of envolver(info, 8.5, UTIL)) { y -= 12; h.texto(MARGEN, y, l, 'F1', 8.5, 0.3); }
  y -= 10;
  h.rect(MARGEN, y, UTIL, 1.5, 'f', 0);
  h.y = y - 38;
  // Título
  const titulo = doc.titulo.toUpperCase();
  h.texto(MARGEN + (UTIL - ancho(titulo, 17, true)) / 2, h.y, titulo, 'F2', 17);
  h.y -= 18;
  const num = `N.º ${doc.numero}`;
  h.texto(MARGEN + (UTIL - ancho(num, 9)) / 2, h.y, num, 'F1', 9, 0.35);
  h.y -= 34;
  for (const b of doc.bloques) pintarBloque(h, b);
  // Lugar, fecha y firma
  h.asegurar(150);
  h.y -= 18;
  h.texto(MARGEN + UTIL - ancho(doc.lugarYFecha, 11), h.y, doc.lugarYFecha, 'F1', 11);
  h.y -= 76;
  const caja = 240;
  const x0 = MARGEN + (UTIL - caja) / 2;
  h.rect(x0, h.y, caja, 1, 'f', 0);
  h.y -= 14;
  h.texto(x0 + (caja - ancho(doc.firma.nombre, 11, true)) / 2, h.y, doc.firma.nombre, 'F2', 11);
  h.y -= 13;
  h.texto(x0 + (caja - ancho(doc.firma.cargo, 9)) / 2, h.y, doc.firma.cargo, 'F1', 9, 0.35);
  return ensamblar(h.contenidos());
}

/** Junta las páginas en un archivo PDF válido (con tabla de referencias cruzadas). */
function ensamblar(paginas: string[]): Uint8Array {
  const objetos: string[] = [];
  const n = paginas.length;
  // 1 catálogo, 2 páginas, 3-5 fuentes, luego (contenido, página) por cada hoja
  const idsPagina = paginas.map((_, i) => 7 + i * 2);
  objetos[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objetos[2] = `<< /Type /Pages /Kids [${idsPagina.map(id => `${id} 0 R`).join(' ')}] /Count ${n} >>`;
  objetos[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objetos[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  objetos[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>';
  objetos[6] = '<< /Producer (EduSpace) >>';
  paginas.forEach((c, i) => {
    const idC = 8 + i * 2;
    objetos[idC] = `<< /Length ${c.length} >>\nstream\n${c}endstream`;
    objetos[idPagina(i)] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ANCHO} ${ALTO}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${idC} 0 R >>`;
  });
  function idPagina(i: number): number { return 7 + i * 2; }

  let pdf = '%PDF-1.4\n%âãÏÓ\n';
  const offsets: number[] = [];
  for (let id = 1; id < objetos.length; id++) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objetos[id]}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objetos.length}\n0000000000 65535 f \n`;
  for (let id = 1; id < objetos.length; id++) pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objetos.length} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
  return bytes;
}
