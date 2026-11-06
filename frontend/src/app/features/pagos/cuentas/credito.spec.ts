import { describe, expect, it } from 'vitest';
import { etiquetaMovimiento, explicarCredito, puedeCobrarAhora, sePuedeAnular } from './credito';

const c = (saldo: number, exigible: number) => ({ saldo, exigible, faltante: Math.max(exigible - saldo, 0), sobrante: Math.max(saldo - exigible, 0) });

describe('crédito del alumno', () => {
  it('explica qué pasaría: falta, sobra o queda a favor', () => {
    expect(explicarCredito(c(0, 0))).toMatch(/Sin crédito/);
    expect(explicarCredito(c(200, 0))).toMatch(/queda a favor/);
    expect(explicarCredito(c(0, 300))).toMatch(/no tiene crédito/);
    expect(explicarCredito(c(450, 600))).toBe('Las pensiones vencidas suman S/ 600.00: el crédito cubre S/ 450.00 y quedarán S/ 150.00 por pagar.');
    expect(explicarCredito(c(1000, 300))).toBe('El crédito cubre todo lo vencido (S/ 300.00) y quedarán S/ 700.00 de crédito.');
    expect(explicarCredito(c(300, 300))).toMatch(/exactamente/);
  });

  it('solo se cobra ahora con crédito y algo vencido; solo se anulan depósitos vigentes', () => {
    expect(puedeCobrarAhora(c(100, 50))).toBe(true);
    expect(puedeCobrarAhora(c(0, 50))).toBe(false);
    expect(puedeCobrarAhora(c(100, 0))).toBe(false);
    expect(sePuedeAnular({ tipo: 'DEPOSITO', anulado: false })).toBe(true);
    expect(sePuedeAnular({ tipo: 'DEPOSITO', anulado: true })).toBe(false);
    expect(sePuedeAnular({ tipo: 'COBRO_CUOTA', anulado: false })).toBe(false);
  });

  it('cada tipo de movimiento tiene su etiqueta', () => {
    expect(etiquetaMovimiento({ tipo: 'DEPOSITO' })).toBe('Depósito');
    expect(etiquetaMovimiento({ tipo: 'COBRO_CUOTA' })).toBe('Cobro de pensión');
    expect(etiquetaMovimiento({ tipo: 'REVERSION' })).toMatch(/vuelve al crédito/);
    expect(etiquetaMovimiento({ tipo: 'ANULACION' })).toBe('Depósito anulado');
  });
});
