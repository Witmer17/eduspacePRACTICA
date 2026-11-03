import { aCentimos, evaluarAsignacion, evaluarReparto, maximoAsignable, partesIguales, porcentajeDe } from './fondo';

describe('reparto de varias áreas a la vez', () => {
  it('suma los cambios y calcula cómo queda la caja', () => {
    const e = evaluarReparto(1000, [{ id: 1, actual: 0, nuevo: 300 }, { id: 2, actual: 100, nuevo: 250 }, { id: 3, actual: 50, nuevo: null }]);
    expect(e.filas.map(f => f.cambio)).toEqual([300, 150, 0]);
    expect(e).toMatchObject({ cambioNeto: 450, cajaDespues: 550, cambiadas: 2, error: '' });
  });

  it('lo que baja un área paga lo que sube otra: solo importa el neto', () => {
    const e = evaluarReparto(0, [{ id: 1, actual: 600, nuevo: 300 }, { id: 2, actual: 0, nuevo: 300 }]);
    expect(e).toMatchObject({ cambioNeto: 0, cajaDespues: 0, cambiadas: 2, error: '' });
  });

  it('si el neto pasa de lo disponible, dice cuánto falta', () => {
    const e = evaluarReparto(1000, [{ id: 1, actual: 0, nuevo: 700 }, { id: 2, actual: 0, nuevo: 500 }]);
    expect(e.error).toBe('No alcanza: faltan S/ 200.00 en caja.');
    expect(e.cajaDespues).toBe(-200);
  });

  it('se puede repartir justo todo lo disponible', () => {
    expect(evaluarReparto(1000, [{ id: 1, actual: 0, nuevo: 600 }, { id: 2, actual: 0, nuevo: 400 }]).error).toBe('');
  });

  it('devolver dinero siempre se puede, aunque la caja esté en negativo', () => {
    const e = evaluarReparto(-500, [{ id: 1, actual: 1000, nuevo: 0 }]);
    expect(e.error).toBe('');
    expect(e.cajaDespues).toBe(500);
  });

  it('un monto negativo o no numérico marca esa fila y bloquea el guardado', () => {
    const e = evaluarReparto(1000, [{ id: 1, actual: 0, nuevo: -5 }, { id: 2, actual: 0, nuevo: NaN }, { id: 3, actual: 0, nuevo: 10 }]);
    expect(e.filas.map(f => f.error)).toEqual(['Monto no válido', 'Monto no válido', '']);
    expect(e.error).toBe('Corrige los montos marcados.');
  });

  it('sin tocar ninguna fila no hay cambios', () => {
    expect(evaluarReparto(1000, [{ id: 1, actual: 100, nuevo: null }, { id: 2, actual: 0, nuevo: 0 }])).toMatchObject({ cambiadas: 0, cambioNeto: 0, error: '' });
  });

  it('partes iguales: los centavos sobrantes van a las primeras áreas', () => {
    expect(partesIguales(1000, [0, 0, 0])).toEqual([333.34, 333.33, 333.33]);
    expect(partesIguales(900, [100, 0, 50])).toEqual([400, 300, 350]);
    expect(partesIguales(0.05, [0, 0, 0])).toEqual([0.02, 0.02, 0.01]);
  });

  it('partes iguales no reparte nada si no hay dinero disponible', () => {
    expect(partesIguales(0, [10, 20])).toEqual([10, 20]);
    expect(partesIguales(-50, [10, 20])).toEqual([10, 20]);
    expect(partesIguales(100, [])).toEqual([]);
  });

  it('partes iguales suma exactamente lo disponible', () => {
    const antes = [120.5, 0, 33.33, 9];
    const despues = partesIguales(1234.56, antes);
    expect(aCentimos(despues.reduce((t, x) => t + x, 0) - antes.reduce((t, x) => t + x, 0))).toBe(1234.56);
  });
});

describe('reparto de caja entre áreas', () => {
  it('asignar más saca la diferencia de caja', () => {
    const e = evaluarAsignacion(6500, 1000, 2500);
    expect(e).toMatchObject({ cambio: 1500, direccion: 'sale', cajaDespues: 5000, error: '' });
  });

  it('asignar menos devuelve la diferencia a caja', () => {
    const e = evaluarAsignacion(6500, 1000, 400);
    expect(e).toMatchObject({ cambio: -600, direccion: 'vuelve', cajaDespues: 7100, error: '' });
  });

  it('dejarla igual no cambia la caja', () => {
    expect(evaluarAsignacion(6500, 1000, 1000)).toMatchObject({ cambio: 0, direccion: 'igual', cajaDespues: 6500, error: '' });
  });

  it('no deja asignar más de lo que hay en caja y dice cuánto falta', () => {
    const e = evaluarAsignacion(1000, 500, 2000); // pide 1500 más y hay 1000
    expect(e.error).toBe('No alcanza: faltan S/ 500.00 en caja.');
    expect(e.cajaDespues).toBe(-500);
  });

  it('se puede dejar justo todo lo disponible', () => {
    expect(evaluarAsignacion(1000, 500, 1500).error).toBe('');
    expect(evaluarAsignacion(1000, 500, 1500).cajaDespues).toBe(0);
  });

  it('devolver dinero siempre se puede, aunque la caja esté en negativo', () => {
    const e = evaluarAsignacion(-2000, 2000, 1500);
    expect(e.error).toBe('');
    expect(e.cajaDespues).toBe(-1500);
  });

  it('con la caja en negativo no se puede sacar nada más', () => {
    expect(evaluarAsignacion(-100, 0, 50).error).toBe('No alcanza: faltan S/ 50.00 en caja.');
  });

  it('rechaza montos vacíos o negativos', () => {
    expect(evaluarAsignacion(1000, 0, NaN).error).toContain('monto válido');
    expect(evaluarAsignacion(1000, 0, -5).error).toContain('monto válido');
  });

  it('redondea a centavos sin errores de coma flotante', () => {
    expect(aCentimos(0.1 + 0.2)).toBe(0.3);
    expect(evaluarAsignacion(100.1, 0, 33.3).cajaDespues).toBe(66.8);
  });

  it('lo máximo asignable es lo que ya tiene más lo disponible', () => {
    expect(maximoAsignable(1000, 500)).toBe(1500);
    expect(maximoAsignable(-300, 500)).toBe(500);
  });

  it('calcula qué parte de lo cobrado tiene un área', () => {
    expect(porcentajeDe(2500, 10000)).toBe(25);
    expect(porcentajeDe(0, 10000)).toBe(0);
    expect(porcentajeDe(500, 0)).toBe(0);
    expect(porcentajeDe(20000, 10000)).toBe(100);
  });
});
