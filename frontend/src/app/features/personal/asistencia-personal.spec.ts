import { AsistenciaPersonal } from '../../core/models/asistencia-personal.model';
import { contar, horaCorta, hoyLocal, llevaHoras, rangoDelMes, resumenPorPersona } from './asistencia-personal';

const reg = (personalId: number, estado: AsistenciaPersonal['estado']): AsistenciaPersonal =>
  ({ id: 1, personalId, personalNombre: 'X', fecha: '2026-11-02', estado });

describe('asistencia del personal', () => {
  it('cuenta cada estado y las personas sin marcar', () => {
    const c = contar(['PRESENTE', 'PRESENTE', 'FALTA', '', 'TARDANZA', '']);
    expect(c.PRESENTE).toBe(2);
    expect(c.FALTA).toBe(1);
    expect(c.TARDANZA).toBe(1);
    expect(c.sinMarcar).toBe(2);
  });

  it('solo presente y tardanza llevan horas', () => {
    expect(llevaHoras('PRESENTE')).toBe(true);
    expect(llevaHoras('TARDANZA')).toBe(true);
    expect(llevaHoras('FALTA')).toBe(false);
    expect(llevaHoras('')).toBe(false);
  });

  it('recorta los segundos de la hora', () => {
    expect(horaCorta('08:05:00')).toBe('08:05');
    expect(horaCorta(undefined)).toBe('');
  });

  it('el porcentaje cuenta presentes y tardanzas sobre los días exigibles', () => {
    const m = resumenPorPersona([reg(1, 'PRESENTE'), reg(1, 'TARDANZA'), reg(1, 'FALTA'), reg(1, 'PRESENTE'), reg(1, 'JUSTIFICADA'), reg(1, 'PERMISO')]);
    const s = m.get(1)!;
    expect(s.marcados).toBe(6);
    expect(s.porcentaje).toBe(75); // 3 de 4 días exigibles
    expect(s.justificadas).toBe(1);
    expect(s.permisos).toBe(1);
  });

  it('sin días exigibles no hay porcentaje', () => {
    expect(resumenPorPersona([reg(2, 'PERMISO')]).get(2)!.porcentaje).toBeNull();
  });

  it('da el primer y último día del mes', () => {
    expect(rangoDelMes('2026-11')).toEqual({ desde: '2026-11-01', hasta: '2026-11-30' });
    expect(rangoDelMes('2028-02')).toEqual({ desde: '2028-02-01', hasta: '2028-02-29' });
  });

  it('hoy local no depende de la zona UTC', () => {
    expect(hoyLocal(new Date(2026, 10, 2, 23, 30))).toBe('2026-11-02');
  });
});
