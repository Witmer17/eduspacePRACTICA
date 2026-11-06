import { Injectable, inject, signal } from '@angular/core';
import { PlanificacionService } from './planificacion.service';

/**
 * ¿Hay un periodo (año académico) activo? Lo consulta el shell al abrir una pantalla que muestra información de un periodo,
 * para avisar «No hay un periodo activo» en lugar de enseñar datos de otro año.
 */
@Injectable({ providedIn: 'root' })
export class AnioActivoService {
  private readonly api = inject(PlanificacionService);

  /** `null` = aún no se sabe (o no se pudo consultar: entonces no se avisa nada). */
  readonly hayActivo = signal<boolean | null>(null);

  refrescar(): void {
    this.api.anios().subscribe({
      next: anios => this.hayActivo.set(anios.some(a => a.estado === 'ACTIVO')),
      error: () => this.hayActivo.set(null)
    });
  }
}
