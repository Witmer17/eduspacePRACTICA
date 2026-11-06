import { describe, expect, it } from 'vitest';
import { Colegio } from '../../core/models/planificacion.model';
import { DocumentoArmado } from './documentos';
import { ancho, crearPdf, envolver, winAnsi } from './pdf-simple';

const colegio = { nombre: 'Colegio Horizonte del Valle', lema: 'Formando líderes', direccion: 'Av. Los Olivos 245', distrito: 'Los Olivos', telefono: '987654321', ruc: '20548712963', gestion: 'PRIVADA' } as Colegio;
const doc = (extra: Partial<DocumentoArmado> = {}): DocumentoArmado => ({
  numero: 'CM-2026-AL2026-00004', titulo: 'Constancia de matrícula', lugarYFecha: 'Los Olivos, 4 de noviembre de 2026', firma: { nombre: 'María Elena Quispe', cargo: 'Director(a)' },
  bloques: [
    { k: 'parrafo', texto: 'La Dirección de la Institución Educativa «Horizonte del Valle», que suscribe,' },
    { k: 'titulo', texto: 'HACE CONSTAR' },
    { k: 'parrafo', texto: 'Que el alumno Mendoza Ramos, Diego (DNI 11815700) se encuentra MATRICULADO en 3° de Primaria (paréntesis) — año 2026.' }
  ],
  ...extra
});
const texto = (b: Uint8Array): string => Array.from(b, x => String.fromCharCode(x)).join('');

describe('PDF sin librerías', () => {
  it('es un PDF válido: cabecera, fin, y la tabla de referencias apunta a cada objeto', () => {
    const t = texto(crearPdf(doc(), colegio));
    expect(t.startsWith('%PDF-1.4')).toBe(true);
    expect(t.trimEnd().endsWith('%%EOF')).toBe(true);
    const inicioXref = Number(/startxref\n(\d+)\n%%EOF/.exec(t)![1]);
    expect(t.slice(inicioXref, inicioXref + 4)).toBe('xref');
    const filas = [...t.slice(inicioXref).matchAll(/(\d{10}) 00000 n /g)].map(m => Number(m[1]));
    filas.forEach((off, i) => expect(t.slice(off, off + `${i + 1} 0 obj`.length), `objeto ${i + 1}`).toBe(`${i + 1} 0 obj`));
    expect(t).toContain('/Type /Catalog');
    expect(/\/Count (\d+)/.exec(t)![1]).toBe('1');
  });

  it('escribe el texto con tildes y eñes en WinAnsi, y escapa los paréntesis', () => {
    const t = texto(crearPdf(doc(), colegio));
    expect(t).toContain('CONSTANCIA DE MATRÍCULA');
    expect(t).toContain('Los Olivos, 4 de noviembre de 2026');
    expect(t).toContain('\\(paréntesis\\)');
    expect(t).toContain('año 2026');
    expect(winAnsi('año — «sí»')).toBe('año \x97 «sí»');
    expect(winAnsi('日本')).toBe('??');
  });

  it('un documento largo ocupa varias hojas y cada página queda en el índice', () => {
    const filas = Array.from({ length: 120 }, (_, i) => [`Pensión ${i + 1}`, '05/03/2026', 'S/ 300.00', 'S/ 0.00', 'S/ 0.00', 'S/ 300.00', 'PENDIENTE']);
    const t = texto(crearPdf(doc({ bloques: [{ k: 'tabla', columnas: ['Concepto', 'Vence', 'Monto', 'Descuento', 'Mora', 'Saldo', 'Estado'], filas }] }), colegio));
    const paginas = Number(/\/Count (\d+)/.exec(t)![1]);
    expect(paginas).toBeGreaterThanOrEqual(3);
    expect((t.match(/\/Type \/Page /g) ?? []).length).toBe(paginas);
    expect(t).toContain('Pensión 120');
    // la firma queda al final y no se pierde
    expect(t).toContain('María Elena Quispe');
  });

  it('funciona sin datos del colegio y con datos en dos columnas', () => {
    const t = texto(crearPdf(doc({ bloques: [{ k: 'datos', filas: [['Código', 'AL2026-00004'], ['Nombre', 'Quispe Rojas, Lucía'], ['Estado', 'ACTIVO']] }] }), null));
    expect(t).toContain('Colegio');
    expect(t).toContain('AL2026-00004');
    expect(t).toContain('Quispe Rojas, Lucía');
  });

  it('el ajuste de líneas respeta el ancho y corta las palabras larguísimas', () => {
    const lineas = envolver('uno dos tres cuatro cinco seis siete ocho nueve diez', 11, 90);
    expect(lineas.length).toBeGreaterThan(2);
    lineas.forEach(l => expect(ancho(l, 11)).toBeLessThanOrEqual(90 + 0.01));
    const larga = envolver('x'.repeat(200), 11, 100);
    larga.forEach(l => expect(ancho(l, 11)).toBeLessThanOrEqual(100 + 0.01));
    expect(larga.join('')).toBe('x'.repeat(200));
    expect(envolver('', 11, 100)).toEqual(['']);
  });
});
