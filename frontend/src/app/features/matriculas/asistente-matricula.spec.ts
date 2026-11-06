import { Documento, TipoDocumento } from '../../core/models/alumno.model';
import { estadoDelExpediente, expedienteCompleto, pasoAnterior, puedeAvanzar, siguientePaso, PASOS_MATRICULA } from './asistente-matricula';

const doc = (tipo: TipoDocumento, verificado: boolean, subidoEn = '2026-11-01T10:00:00'): Documento =>
  ({ id: 1, alumnoId: 1, tipo, nombreArchivo: 'a.pdf', contentType: 'application/pdf', tamanoBytes: 1, verificado, subidoEn });

describe('asistente de matrícula', () => {
  it('los pasos van en orden y no se pasa de los extremos', () => {
    expect(PASOS_MATRICULA.map(p => p.id)).toEqual(['alumno', 'familia', 'documentos', 'seccion', 'confirmar']);
    expect(siguientePaso('alumno')).toBe('familia');
    expect(siguientePaso('confirmar')).toBe('confirmar');
    expect(pasoAnterior('seccion')).toBe('documentos');
    expect(pasoAnterior('alumno')).toBe('alumno');
  });

  it('el expediente pide DNI, partida y ficha SIAGIE, cada uno verificado', () => {
    expect(estadoDelExpediente([]).map(f => f.estado)).toEqual(['falta', 'falta', 'falta']);
    const f = estadoDelExpediente([doc('DNI', true), doc('PARTIDA_NACIMIENTO', false)]);
    expect(f.map(x => [x.tipo, x.estado])).toEqual([['DNI', 'verificado'], ['PARTIDA_NACIMIENTO', 'sin-verificar'], ['FICHA_SIAGIE', 'falta']]);
    expect(expedienteCompleto([doc('DNI', true), doc('PARTIDA_NACIMIENTO', true), doc('FICHA_SIAGIE', true)])).toBe(true);
    expect(expedienteCompleto([doc('DNI', true), doc('PARTIDA_NACIMIENTO', true), doc('FICHA_SIAGIE', false)])).toBe(false);
  });

  it('otros documentos no cuentan y, con varios del mismo tipo, vale el verificado', () => {
    expect(expedienteCompleto([doc('FOTO', true), doc('OTRO', true)])).toBe(false);
    const f = estadoDelExpediente([doc('DNI', false, '2026-11-03T00:00:00'), doc('DNI', true, '2026-11-01T00:00:00')]);
    expect(f[0].estado).toBe('verificado');
  });

  it('cada paso solo avanza con lo que necesita y explica qué falta', () => {
    const base = { alumnoListo: false, familiaLista: false, expediente: false, seccionElegida: false };
    expect(puedeAvanzar('alumno', base)).toEqual({ puede: false, motivo: 'Elige al alumno o completa sus datos.' });
    expect(puedeAvanzar('alumno', { ...base, motivoBloqueo: 'Ya tiene una matrícula este año.' }).motivo).toBe('Ya tiene una matrícula este año.');
    expect(puedeAvanzar('alumno', { ...base, alumnoListo: true }).puede).toBe(true);
    expect(puedeAvanzar('familia', base).puede).toBe(false);
    expect(puedeAvanzar('documentos', base).puede).toBe(false);
    expect(puedeAvanzar('documentos', { ...base, expediente: true }).puede).toBe(true);
    expect(puedeAvanzar('seccion', base).puede).toBe(false);
    expect(puedeAvanzar('confirmar', base).puede).toBe(true);
  });
});
