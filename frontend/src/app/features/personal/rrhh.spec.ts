import { Contrato, PagoPersonal } from '../../core/models/rrhh.model';
import { avisoPeriodo, contratoActual, contratoDelPeriodo, contratoQueImpideOtro, contratoRenovable, contratosPorPersona, fueCancelado, cumpleFiltro, descuentoAsistencia, diaSiguiente, diasDelMes, diasHasta, erroresCuenta, estadoPagoMes, etiquetaBanco, etiquetaTipoCuenta, finDeAnio, finEfectivo, finPorMeses, masaSalarial, mascara, primerDiaMesSiguiente, soloDigitos, valorDia, duracionContrato, fechaCorta, nombrePeriodo, periodoDe, periodoValido, totalesPlanilla } from './rrhh';

function pago(montoFirmado: number, estado: 'PENDIENTE' | 'PAGADO'): PagoPersonal {
  return { id: 1, personalId: 1, personalNombre: 'X', periodo: '2026-11', concepto: 'SUELDO', monto: Math.abs(montoFirmado), montoFirmado, estado };
}

function contrato(id: number, personalId: number, inicio: string, estadoEfectivo: Contrato['estadoEfectivo']): Contrato {
  return { id, personalId, personalNombre: 'X', tipo: 'PLAZO_FIJO', fechaInicio: inicio, remuneracion: 1000, estado: estadoEfectivo === 'RESCINDIDO' ? 'RESCINDIDO' : 'VIGENTE', estadoEfectivo };
}

describe('contrato que resume a una persona', () => {
  it('prefiere el que rige hoy aunque haya otros más recientes por iniciar', () => {
    const lista = [contrato(1, 1, '2027-01-01', 'POR_INICIAR'), contrato(2, 1, '2026-01-01', 'POR_VENCER'), contrato(3, 1, '2025-01-01', 'VENCIDO')];
    expect(contratoActual(lista)?.id).toBe(2);
  });

  it('si ninguno rige, el por iniciar; si no, el más reciente', () => {
    expect(contratoActual([contrato(1, 1, '2025-01-01', 'VENCIDO'), contrato(2, 1, '2027-01-01', 'POR_INICIAR')])?.id).toBe(2);
    expect(contratoActual([contrato(1, 1, '2024-01-01', 'VENCIDO'), contrato(2, 1, '2025-06-01', 'RESCINDIDO')])?.id).toBe(2);
  });

  it('sin contratos no hay ninguno', () => {
    expect(contratoActual([])).toBeUndefined();
  });

  it('agrupa por persona', () => {
    const m = contratosPorPersona([contrato(1, 1, '2026-01-01', 'VIGENTE'), contrato(2, 2, '2026-01-01', 'VIGENTE'), contrato(3, 1, '2025-01-01', 'VENCIDO')]);
    expect(m.get(1)?.length).toBe(2);
    expect(m.get(2)?.length).toBe(1);
  });
});

describe('un contrato por persona y renovación', () => {
  const k = (id: number, inicio: string, fin: string | undefined, e: Contrato['estadoEfectivo'], estado: Contrato['estado'] = 'VIGENTE'): Contrato =>
    ({ ...contrato(id, 1, inicio, e), fechaFin: fin, estado });

  it('un contrato que rige o está por iniciar impide crear otro', () => {
    expect(contratoQueImpideOtro([k(1, '2026-01-01', '2026-12-31', 'VIGENTE')])?.id).toBe(1);
    expect(contratoQueImpideOtro([k(1, '2026-01-01', '2026-11-20', 'POR_VENCER')])?.id).toBe(1);
    expect(contratoQueImpideOtro([k(1, '2027-01-01', '2027-12-31', 'POR_INICIAR')])?.id).toBe(1);
  });

  it('uno vencido o rescindido no impide crear otro', () => {
    expect(contratoQueImpideOtro([k(1, '2025-01-01', '2025-12-31', 'VENCIDO'), k(2, '2026-01-01', '2026-06-01', 'RESCINDIDO', 'RESCINDIDO')])).toBeUndefined();
    expect(contratoQueImpideOtro([])).toBeUndefined();
  });

  it('se renueva el último contrato, si no está rescindido y tiene fecha de fin', () => {
    expect(contratoRenovable([k(1, '2025-01-01', '2025-12-31', 'VENCIDO'), k(2, '2026-01-01', '2026-12-31', 'VIGENTE')])?.id).toBe(2);
    expect(contratoRenovable([k(1, '2025-01-01', '2025-12-31', 'VENCIDO')])?.id).toBe(1);        // vencido también se renueva
  });

  it('un indefinido o un rescindido no se renuevan', () => {
    expect(contratoRenovable([k(1, '2026-01-01', undefined, 'VIGENTE')])).toBeUndefined();
    expect(contratoRenovable([k(1, '2026-01-01', '2026-12-31', 'RESCINDIDO', 'RESCINDIDO')])).toBeUndefined();
    expect(contratoRenovable([])).toBeUndefined();
  });

  it('el contrato renovado empieza el día siguiente', () => {
    expect(diaSiguiente('2026-12-31')).toBe('2027-01-01');
    expect(diaSiguiente('2026-02-28')).toBe('2026-03-01');
    expect(diaSiguiente('2028-02-28')).toBe('2028-02-29');
    expect(diaSiguiente('2026-06-15')).toBe('2026-06-16');
  });
});

describe('cuentas para depósito', () => {
  it('una cuenta de banco válida no tiene errores', () => {
    expect(erroresCuenta('BCP', 'AHORROS', '194-1234 5678-901', '')).toEqual({ tipo: '', numero: '', cci: '' });
    expect(erroresCuenta('BBVA', 'CORRIENTE', '001100001234567890', '00211000123456789012')).toEqual({ tipo: '', numero: '', cci: '' });
  });

  it('valida el largo y los dígitos del número', () => {
    expect(erroresCuenta('BCP', 'AHORROS', '1234567', '').numero).toContain('entre 8 y 20');
    expect(erroresCuenta('BCP', 'AHORROS', '123456789012345678901', '').numero).toContain('entre 8 y 20');
    expect(erroresCuenta('BCP', 'AHORROS', '1941234abc5678', '').numero).toContain('dígitos');
    expect(erroresCuenta('BCP', 'AHORROS', '', '').numero).toContain('Indica');
  });

  it('el CCI tiene exactamente 20 dígitos y es opcional', () => {
    expect(erroresCuenta('BCP', 'AHORROS', '19412345678901', '1234567890123456789').cci).toContain('20 dígitos');
    expect(erroresCuenta('BCP', 'AHORROS', '19412345678901', '002 194 0012 3456 7890 12'.replace(/ /g, '').slice(0, 20)).cci).toBe('');
  });

  it('Yape y Plin son billeteras: celular de 9 dígitos y sin CCI', () => {
    expect(erroresCuenta('YAPE', 'BILLETERA', '987654321', '')).toEqual({ tipo: '', numero: '', cci: '' });
    expect(erroresCuenta('PLIN', 'BILLETERA', '98765432', '').numero).toContain('9 dígitos');
    expect(erroresCuenta('YAPE', 'BILLETERA', '987654321', '00211000123456789012').cci).toContain('no lleva CCI');
    expect(erroresCuenta('YAPE', 'AHORROS', '987654321', '').tipo).toContain('billeteras');
    expect(erroresCuenta('BCP', 'BILLETERA', '987654321', '').tipo).toContain('Yape o Plin');
  });

  it('muestra solo los últimos 4 dígitos', () => {
    expect(mascara('19412345678901')).toBe('•••• 8901');
    expect(mascara('1234')).toBe('1234');
  });

  it('etiquetas de banco y tipo', () => {
    expect(etiquetaBanco('BANCO_NACION')).toBe('Banco de la Nación');
    expect(etiquetaBanco('ZZZ')).toBe('ZZZ');
    expect(etiquetaTipoCuenta('SUELDO')).toBe('Cuenta sueldo');
    expect(soloDigitos('194-1234 5678')).toBe('19412345678');
  });
});

describe('tarjetas de pago del mes', () => {
  const c = (id: number, inicio: string, fin: string | undefined, extra: Partial<Contrato> = {}): Contrato =>
    ({ ...contrato(id, 1, inicio, 'VIGENTE'), fechaFin: fin, ...extra });
  const pago = (concepto: PagoPersonal['concepto'], estado: PagoPersonal['estado'], monto = 1000): PagoPersonal =>
    ({ id: 1, personalId: 1, personalNombre: 'X', periodo: '2026-11', concepto, monto, montoFirmado: monto, estado });

  it('elige el contrato que se cruza con el mes', () => {
    const viejo = c(1, '2025-01-01', '2025-12-31');
    const nuevo = c(2, '2026-01-01', '2026-12-31');
    expect(contratoDelPeriodo([viejo, nuevo], '2026-11')?.id).toBe(2);
    expect(contratoDelPeriodo([viejo, nuevo], '2025-06')?.id).toBe(1);
    expect(contratoDelPeriodo([viejo, nuevo], '2027-02')).toBeUndefined();
    expect(contratoDelPeriodo([c(3, '2026-01-01', undefined)], '2030-01')?.id).toBe(3);
  });

  it('en el mes de una renovación se elige el contrato que cubre más días (como la planilla)', () => {
    const viejo = c(1, '2026-01-01', '2026-12-10');   // 10 días de diciembre
    const nuevo = c(2, '2026-12-11', '2027-12-31');   // 21 días
    expect(contratoDelPeriodo([viejo, nuevo], '2026-12')?.id).toBe(2);
    expect(contratoDelPeriodo([viejo, nuevo], '2026-11')?.id).toBe(1);
    expect(contratoDelPeriodo([viejo, nuevo], '2027-01')?.id).toBe(2);
    const v2 = c(3, '2026-01-01', '2026-12-20');      // 20 días
    const n2 = c(4, '2026-12-21', '2027-12-31');      // 11 días
    expect(contratoDelPeriodo([v2, n2], '2026-12')?.id).toBe(3);
  });

  it('si empatan en días gana el más reciente', () => {
    expect(contratoDelPeriodo([c(1, '2026-01-01', '2026-04-15'), c(2, '2026-04-16', '2027-04-15')], '2026-04')?.id).toBe(2);
  });

  it('una renovación cancelada antes de empezar no cuenta, aunque su fecha se cruce con el mes', () => {
    const viejo = c(1, '2026-09-03', '2026-11-22');
    const cancelado = c(2, '2026-11-23', '2027-11-22', { estado: 'RESCINDIDO', fechaRescision: '2026-11-22' });   // rescindido el día anterior a su inicio
    expect(fueCancelado(cancelado)).toBe(true);
    expect(fueCancelado(viejo)).toBe(false);
    expect(contratoDelPeriodo([viejo, cancelado], '2026-11')?.id).toBe(1);   // antes mostraba el cancelado
    expect(contratoDelPeriodo([cancelado], '2026-11')).toBeUndefined();
  });

  it('uno rescindido su primer día sí rigió ese día: no es una cancelación', () => {
    const primerDia = c(5, '2026-11-02', '2027-02-01', { estado: 'RESCINDIDO', fechaRescision: '2026-11-02' });
    expect(fueCancelado(primerDia)).toBe(false);
    expect(contratoDelPeriodo([primerDia], '2026-11')?.id).toBe(5);          // la tarjeta lo muestra como rescindido
  });

  it('un contrato rescindido rige solo hasta su rescisión', () => {
    const r = c(4, '2026-01-01', '2026-12-31', { estado: 'RESCINDIDO', fechaRescision: '2026-06-15' });
    expect(finEfectivo(r)).toBe('2026-06-15');
    expect(contratoDelPeriodo([r], '2026-06')?.id).toBe(4);
    expect(contratoDelPeriodo([r], '2026-07')).toBeUndefined();
  });

  it('estado del pago del mes', () => {
    const k = c(1, '2026-01-01', undefined);
    expect(estadoPagoMes(undefined, [])).toBe('sin-contrato');
    expect(estadoPagoMes(k, [])).toBe('sin-generar');
    expect(estadoPagoMes(k, [pago('SUELDO', 'PENDIENTE')])).toBe('pendiente');
    expect(estadoPagoMes(k, [pago('SUELDO', 'PAGADO'), pago('BONO', 'PENDIENTE', 50)])).toBe('pendiente');
    expect(estadoPagoMes(k, [pago('SUELDO', 'PAGADO')])).toBe('pagado');
  });

  it('un pago que caja ya registró espera al administrador: «por aprobar», no «pagado» ni «pendiente»', () => {
    const k = c(1, '2026-01-01', undefined);
    expect(estadoPagoMes(k, [pago('SUELDO', 'POR_APROBAR')])).toBe('por-aprobar');
    // si queda algo sin registrar, sigue pendiente de pago
    expect(estadoPagoMes(k, [pago('SUELDO', 'POR_APROBAR'), pago('BONO', 'PENDIENTE', 50)])).toBe('pendiente');
    // lo que espera aprobación todavía cuenta como por pagar en los totales
    const t = totalesPlanilla([pago('SUELDO', 'PAGADO', 1000), pago('BONO', 'POR_APROBAR', 200)]);
    expect(t.pagado).toBe(1000);
    expect(t.pendiente).toBe(200);
  });

});

describe('atajos de fechas del contrato', () => {
  it('un contrato de N meses termina el día anterior al mismo día N meses después', () => {
    expect(finPorMeses('2026-11-01', 6)).toBe('2027-04-30');
    expect(finPorMeses('2026-03-01', 12)).toBe('2027-02-28');
    expect(finPorMeses('2026-11-15', 3)).toBe('2027-02-14');
    expect(finPorMeses('2026-01-01', 1)).toBe('2026-01-31');
  });

  it('si ese día no existe en el mes de destino termina su último día', () => {
    expect(finPorMeses('2026-01-31', 1)).toBe('2026-02-28');
    expect(finPorMeses('2026-08-31', 6)).toBe('2027-02-28');
    expect(finPorMeses('2028-01-31', 1)).toBe('2028-02-29');
  });

  it('fin de año y primer día del mes siguiente', () => {
    expect(finDeAnio('2026-11-02')).toBe('2026-12-31');
    expect(primerDiaMesSiguiente(new Date(2026, 10, 2))).toBe('2026-12-01');
    expect(primerDiaMesSiguiente(new Date(2026, 11, 20))).toBe('2027-01-01');
  });
});

describe('descuento por inasistencias', () => {
  it('cada mes tiene sus días', () => {
    expect(diasDelMes('2026-02')).toBe(28);
    expect(diasDelMes('2028-02')).toBe(29);
    expect(diasDelMes('2026-11')).toBe(30);
    expect(diasDelMes('2026-12')).toBe(31);
  });

  it('el día vale el sueldo entre los días de ese mes', () => {
    expect(valorDia(1500, '2026-11')).toBe(50);   // 30 días
    expect(valorDia(1500, '2026-12')).toBe(48.39); // 31 días
    expect(valorDia(1400, '2026-02')).toBe(50);   // 28 días
    expect(valorDia(0, '2026-11')).toBe(0);
  });

  it('cada falta es un día y cada 8 tardanzas otro día', () => {
    const d = descuentoAsistencia(1500, '2026-11', 2, 9);
    expect(d.diasMes).toBe(30);
    expect(d.valorDia).toBe(50);
    expect(d.diasPorTardanzas).toBe(1);
    expect(d.tardanzasSobrantes).toBe(1);
    expect(d.diasADescontar).toBe(3);
    expect(d.monto).toBe(150);
  });

  it('menos de 8 tardanzas no descuentan; 16 son dos días', () => {
    expect(descuentoAsistencia(1500, '2026-11', 0, 7)).toMatchObject({ diasPorTardanzas: 0, diasADescontar: 0, monto: 0, tardanzasSobrantes: 7 });
    expect(descuentoAsistencia(1500, '2026-11', 0, 8).diasADescontar).toBe(1);
    expect(descuentoAsistencia(1500, '2026-11', 0, 16)).toMatchObject({ diasADescontar: 2, monto: 100 });
  });

  it('usa los días reales del mes y no pasa del sueldo', () => {
    expect(descuentoAsistencia(1550, '2026-12', 1, 0).monto).toBe(50);   // 1550 / 31
    expect(descuentoAsistencia(1000, '2026-11', 40, 0).monto).toBe(1000);
    expect(descuentoAsistencia(0, '2026-11', 3, 8).monto).toBe(0);
  });
});

describe('lista de contratos y sueldos', () => {
  const vig = contrato(1, 1, '2026-01-01', 'VIGENTE');
  const porVencer = { ...contrato(2, 2, '2026-01-01', 'POR_VENCER'), remuneracion: 2500.5 };
  const vencido = contrato(3, 3, '2025-01-01', 'VENCIDO');

  it('los filtros separan quién tiene contrato vigente', () => {
    expect(cumpleFiltro(vig, 'rigen')).toBe(true);
    expect(cumpleFiltro(porVencer, 'rigen')).toBe(true);
    expect(cumpleFiltro(vencido, 'rigen')).toBe(false);
    expect(cumpleFiltro(porVencer, 'por-vencer')).toBe(true);
    expect(cumpleFiltro(vig, 'por-vencer')).toBe(false);
    expect(cumpleFiltro(undefined, 'sin-vigente')).toBe(true);
    expect(cumpleFiltro(vencido, 'sin-vigente')).toBe(true);
    expect(cumpleFiltro(vig, 'sin-vigente')).toBe(false);
    expect(cumpleFiltro(undefined, 'todos')).toBe(true);
  });

  it('la masa salarial suma solo los contratos que rigen', () => {
    expect(masaSalarial([vig, porVencer, vencido, undefined])).toBe(3500.5);
    expect(masaSalarial([])).toBe(0);
  });

  it('avisa del vencimiento solo cuando importa', () => {
    const hoy = new Date(2026, 10, 2);
    expect(avisoPeriodo({ ...porVencer, fechaFin: '2026-11-14' }, hoy)).toBe('Vence en 12 días');
    expect(avisoPeriodo({ ...vencido, fechaFin: '2026-10-30' }, hoy)).toBe('Venció hace 3 días');
    expect(avisoPeriodo(vig, hoy)).toBe('');
  });
});

describe('fechas de contrato', () => {
  it('abrevia la fecha', () => {
    expect(fechaCorta('2026-01-05')).toBe('05 ene 2026');
    expect(fechaCorta('2026-12-31')).toBe('31 dic 2026');
    expect(fechaCorta(undefined)).toBe('—');
  });

  it('calcula la duración', () => {
    expect(duracionContrato('2026-01-01')).toBe('Indefinido');
    expect(duracionContrato('2026-03-01', '2026-03-15')).toBe('15 días');
    expect(duracionContrato('2026-03-01', '2026-10-31')).toBe('8 meses');
    expect(duracionContrato('2026-01-01', '2026-12-31')).toBe('1 año');
    expect(duracionContrato('2026-01-01', '2027-12-31')).toBe('2 años');
    expect(duracionContrato('2026-01-01', '2026-01-31')).toBe('1 mes');
  });
});

describe('rrhh', () => {
  it('arma el periodo AAAA-MM de una fecha', () => {
    expect(periodoDe(new Date(2026, 10, 2))).toBe('2026-11');
    expect(periodoDe(new Date(2026, 0, 31))).toBe('2026-01');
  });

  it('valida el periodo', () => {
    expect(periodoValido('2026-11')).toBe(true);
    expect(periodoValido('2026-13')).toBe(false);
    expect(periodoValido('')).toBe(false);
  });

  it('nombra el periodo en español', () => {
    expect(nombrePeriodo('2026-11')).toBe('noviembre 2026');
    expect(nombrePeriodo('x')).toBe('x');
  });

  it('suma la planilla restando descuentos y adelantos', () => {
    const t = totalesPlanilla([pago(1500, 'PAGADO'), pago(-200, 'PAGADO'), pago(1200.55, 'PENDIENTE')]);
    expect(t.pagado).toBe(1300);
    expect(t.pendiente).toBe(1200.55);
    expect(t.neto).toBe(2500.55);
  });

  it('cuenta los días hasta una fecha', () => {
    const hoy = new Date(2026, 10, 2);
    expect(diasHasta('2026-11-12', hoy)).toBe(10);
    expect(diasHasta('2026-11-01', hoy)).toBe(-1);
    expect(diasHasta('2026-11-02', hoy)).toBe(0);
  });
});
