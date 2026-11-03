import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Grado, Nivel } from '../models/planificacion.model';
import { ArbolEstructuraService, RUTA_ESTRUCTURA, agruparGrados } from './arbol-estructura.service';
import { PlanificacionService } from './planificacion.service';

const nivel = (id: number, codigo: string, nombre: string, orden: number): Nivel => ({ id, codigo, nombre, orden, activo: true });
const grado = (id: number, nivelId: number, numero: number, nombre: string, activo = true): Grado => ({ id, nivelId, nivelNombre: '', numero, nombre, activo });

const NIVELES = [nivel(3, 'SECUNDARIA', 'Secundaria', 3), nivel(1, 'INICIAL', 'Inicial', 1), nivel(2, 'PRIMARIA', 'Primaria', 2)];
const GRADOS = [grado(12, 3, 3, '3° de Secundaria'), grado(5, 2, 2, '2° de Primaria'), grado(1, 1, 1, '3 años'), grado(4, 2, 1, '1° de Primaria'), grado(9, 2, 6, '6° de Primaria', false)];

describe('árbol de estructura académica', () => {
  it('lista todos los grados activos agrupados por nivel, en el orden del colegio', () => {
    const g = agruparGrados(NIVELES, GRADOS);
    expect(g.map(x => x.nivel)).toEqual(['Inicial', 'Primaria', 'Secundaria']);
    expect(g[1].hijos.map(h => h.etiqueta)).toEqual(['1° de Primaria', '2° de Primaria']); // el inactivo no sale
    expect(g[1].hijos[0].ruta).toBe(`${RUTA_ESTRUCTURA}/4`);
  });

  it('un nivel sin grados no aparece', () => {
    expect(agruparGrados(NIVELES, [grado(1, 1, 1, '3 años')]).map(x => x.nivel)).toEqual(['Inicial']);
  });

  it('lee los grados una sola vez, aunque se pida varias veces', () => {
    const api = { niveles: vi.fn(() => of(NIVELES)), grados: vi.fn(() => of(GRADOS)) };
    TestBed.configureTestingModule({ providers: [{ provide: PlanificacionService, useValue: api }] });
    const s = TestBed.inject(ArbolEstructuraService);
    s.asegurar();
    s.asegurar();
    expect(api.grados).toHaveBeenCalledTimes(1);
    expect(s.grupos()).toHaveLength(3);
  });

  it('si falla la lectura queda vacío y se reintenta la próxima vez', () => {
    let falla = true;
    const api = { niveles: vi.fn(() => (falla ? throwError(() => new Error('caído')) : of(NIVELES))), grados: vi.fn(() => of(GRADOS)) };
    TestBed.configureTestingModule({ providers: [{ provide: PlanificacionService, useValue: api }] });
    const s = TestBed.inject(ArbolEstructuraService);
    s.asegurar();
    expect(s.grupos()).toEqual([]);
    falla = false;
    s.asegurar();
    expect(s.grupos()).toHaveLength(3);
  });
});
