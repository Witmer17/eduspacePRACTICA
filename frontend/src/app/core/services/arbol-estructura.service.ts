import { Injectable, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Grado, Nivel } from '../models/planificacion.model';
import { PlanificacionService } from './planificacion.service';

/** Ruta de «Estructura académica»: de ella cuelgan todos los grados en el menú vertical. */
export const RUTA_ESTRUCTURA = '/configuracion/estructura';

/** Entrada que cuelga de una opción del menú vertical (un grado bajo «Estructura académica»). */
export interface HijoMenu {
  ruta: string;
  etiqueta: string;
}

/** Los grados de un nivel (Inicial, Primaria, Secundaria), tal como se listan en el árbol del menú. */
export interface GrupoArbol {
  nivel: string;
  codigo: string;
  hijos: HijoMenu[];
}

/** Agrupa los grados por nivel, en el orden del colegio (nivel y luego número de grado). Sin grados un nivel no aparece. */
export function agruparGrados(niveles: Nivel[], grados: Grado[]): GrupoArbol[] {
  return [...niveles]
    .sort((a, b) => a.orden - b.orden)
    .map(n => ({
      nivel: n.nombre,
      codigo: n.codigo,
      hijos: grados
        .filter(g => g.nivelId === n.id && g.activo !== false)
        .sort((a, b) => a.numero - b.numero)
        .map(g => ({ ruta: `${RUTA_ESTRUCTURA}/${g.id}`, etiqueta: g.nombre }))
    }))
    .filter(g => g.hijos.length > 0);
}

/**
 * El árbol de «Estructura académica» en el menú vertical: todos los grados del colegio, agrupados por nivel.
 * Los grados son un catálogo fijo, así que se leen una sola vez por sesión del navegador.
 */
@Injectable({ providedIn: 'root' })
export class ArbolEstructuraService {
  private readonly api = inject(PlanificacionService);
  private cargado = false;
  private cargando = false;

  readonly grupos = signal<GrupoArbol[]>([]);

  /** Lee los grados la primera vez que hacen falta; si falla, se reintenta en la siguiente ocasión. */
  asegurar(): void {
    if (this.cargado || this.cargando) return;
    this.cargando = true;
    forkJoin({ niveles: this.api.niveles(), grados: this.api.grados() }).subscribe({
      next: ({ niveles, grados }) => {
        this.grupos.set(agruparGrados(niveles, grados));
        this.cargado = true;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}
