import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FondoResumen, MovimientoFondo } from '../models/fondo.model';

const API = '/api/v1/pagos/fondo';

/** Dinero de caja y su reparto entre las áreas de trabajo (solo ADMIN en el backend). */
@Injectable({ providedIn: 'root' })
export class FondoService {
  private readonly http = inject(HttpClient);

  resumen(): Observable<FondoResumen> {
    return this.http.get<FondoResumen>(API);
  }

  /** Deja asignado al área el monto indicado (el total, no la diferencia). */
  fijar(areaId: number, monto: number, motivo?: string): Observable<FondoResumen> {
    return this.http.put<FondoResumen>(`${API}/areas/${areaId}`, { monto, motivo });
  }

  /** Reparte varias áreas a la vez, todo o nada: cada monto es el total que debe quedar en esa área. */
  fijarVarias(areas: { areaId: number; monto: number }[], motivo?: string): Observable<FondoResumen> {
    return this.http.put<FondoResumen>(`${API}/areas`, { areas, motivo });
  }

  movimientos(areaId: number): Observable<MovimientoFondo[]> {
    return this.http.get<MovimientoFondo[]>(`${API}/areas/${areaId}/movimientos`);
  }
}
