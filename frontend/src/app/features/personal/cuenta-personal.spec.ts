import { DOCUMENTO_MINIMO, ROLES_PERSONAL, documentoSirveDeClave, rolSugerido, usuarioPrevisto } from './cuenta-personal';

describe('cuenta de acceso del personal', () => {
  it('cada área con rol propio sugiere el suyo; el resto lo deja a elegir', () => {
    expect(rolSugerido('DOCENCIA')).toBe('DOCENTE');
    expect(rolSugerido('TESORERIA')).toBe('CAJERO');
    expect(rolSugerido('SECRETARIA')).toBe('SECRETARIA');
    expect(rolSugerido('ADMISION')).toBe('SECRETARIA');
    for (const sinRol of ['PSICOLOGIA', 'SEGURIDAD', 'MANTENIMIENTO', 'DIRECCION', 'TI', undefined, null, '']) expect(rolSugerido(sinRol as string)).toBe('');
  });

  it('los roles ofrecidos no incluyen al administrador ni a las familias', () => {
    expect(ROLES_PERSONAL.map(r => r.id)).toEqual(['DOCENTE', 'SECRETARIA', 'CAJERO']);
    expect(rolSugerido('DIRECCION')).not.toBe('ADMIN');
  });

  it('el documento sirve de clave si tiene 8 a 20 letras o números', () => {
    expect(DOCUMENTO_MINIMO).toBe(8);
    expect(documentoSirveDeClave('40123456')).toBe(true);
    expect(documentoSirveDeClave(' 40123456 ')).toBe(true);
    expect(documentoSirveDeClave('X1234567A')).toBe(true);
    expect(documentoSirveDeClave('1234567')).toBe(false);
    expect(documentoSirveDeClave('1234-5678')).toBe(false);
    expect(documentoSirveDeClave('1'.repeat(21))).toBe(false);
    expect(documentoSirveDeClave('')).toBe(false);
  });

  it('el usuario previsto es nombre.apellido, sin tildes ni símbolos', () => {
    expect(usuarioPrevisto('María José', 'Aguilar Ortiz')).toBe('maria.aguilar');
    expect(usuarioPrevisto('Ñahui', 'Quispe')).toBe('nahui.quispe');
    expect(usuarioPrevisto("D'Angelo", 'O’Brien')).toBe('dangelo.obrien');
    expect(usuarioPrevisto('Al', '')).toBe('alusr');
    expect(usuarioPrevisto('', '')).toBe('usr');
  });
});
