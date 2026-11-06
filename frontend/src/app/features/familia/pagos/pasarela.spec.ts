import { datosDelMedio, faltaEnDatos } from './pasarela';

describe('pasarela de pago (ayudas del formulario)', () => {
  it('la tarjeta pide número, vencimiento MM/AA y CVV', () => {
    expect(faltaEnDatos({ medio: 'TARJETA' })).toMatch(/número de la tarjeta/);
    expect(faltaEnDatos({ medio: 'TARJETA', tarjetaNumero: '4111 1111 1111 1111' })).toMatch(/MM\/AA/);
    expect(faltaEnDatos({ medio: 'TARJETA', tarjetaNumero: '4111111111111111', vencimiento: '12/28' })).toMatch(/CVV/);
    expect(faltaEnDatos({ medio: 'TARJETA', tarjetaNumero: '4111111111111111', vencimiento: '12/28', cvv: '123' })).toBeNull();
  });

  it('Yape o Plin pide un celular de 9 dígitos que empiece con 9', () => {
    expect(faltaEnDatos({ medio: 'YAPE_PLIN', celular: '12345' })).not.toBeNull();
    expect(faltaEnDatos({ medio: 'YAPE_PLIN', celular: '887654321' })).not.toBeNull();
    expect(faltaEnDatos({ medio: 'YAPE_PLIN', celular: '987 654 321' })).toBeNull();
  });

  it('la transferencia pide banco y titular', () => {
    expect(faltaEnDatos({ medio: 'TRANSFERENCIA' })).toMatch(/banco/);
    expect(faltaEnDatos({ medio: 'TRANSFERENCIA', banco: 'BCP', titular: '  ' })).toMatch(/titular/);
    expect(faltaEnDatos({ medio: 'TRANSFERENCIA', banco: 'BCP', titular: 'Ana' })).toBeNull();
  });

  it('solo se envían los datos del medio elegido', () => {
    const todo = { medio: 'TRANSFERENCIA' as const, tarjetaNumero: '4111111111111111', cvv: '123', celular: '987654321', banco: 'BCP', titular: 'Ana' };
    expect(datosDelMedio(todo)).toEqual({ medio: 'TRANSFERENCIA', banco: 'BCP', titular: 'Ana' });
    expect(datosDelMedio({ ...todo, medio: 'TARJETA' })).not.toHaveProperty('celular');
    expect(datosDelMedio({ ...todo, medio: 'TARJETA' })).not.toHaveProperty('banco');
  });
});
