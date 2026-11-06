import { Injectable, inject, signal } from '@angular/core';
import { AlumnoService } from './alumno.service';

/** Resuelve nombres de alumnos a partir de sus ids (varias APIs devuelven solo el id) y los recuerda mientras dura la sesión. */
@Injectable({ providedIn: 'root' })
export class NombresAlumnoService {
  private readonly api = inject(AlumnoService);
  private readonly pedidos = new Set<number>();
  private readonly mapaSignal = signal<Record<number, string>>({});
  readonly nombres = this.mapaSignal.asReadonly();

  nombre(id: number): string {
    return this.mapaSignal()[id] ?? `Alumno ${id}`;
  }

  /** Pide en un solo viaje los nombres que aún no se conocen (lotes de hasta 200). */
  cargar(ids: number[]): void {
    const nuevos = [...new Set(ids)].filter(id => !this.pedidos.has(id));
    for (let i = 0; i < nuevos.length; i += 200) {
      const lote = nuevos.slice(i, i + 200);
      lote.forEach(id => this.pedidos.add(id));
      this.api.resumenes(lote).subscribe({
        next: lista => this.mapaSignal.update(m => ({ ...m, ...Object.fromEntries(lista.map(a => [a.id, a.nombreCompleto])) })),
        error: () => lote.forEach(id => this.pedidos.delete(id))
      });
    }
  }
}
