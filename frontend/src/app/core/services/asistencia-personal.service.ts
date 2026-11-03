import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaPersonal, MarcaAsistencia, ResultadoDiaAsistencia } from '../models/asistencia-personal.model';

const API = '/api/v1/planificacion/asistencia-personal';

/** Asistencia del personal (ADMIN y SECRETARIA). */
@Injectable({ providedIn: 'root' })
export class AsistenciaPersonalService {
  private readonly http = inject(HttpClient);

  consultar(desde: string, hasta: string, personalId?: number): Observable<AsistenciaPersonal[]> {
    let params = new HttpParams().set('desde', desde).set('hasta', hasta);
    if (personalId) params = params.set('personalId', personalId);
    return this.http.get<AsistenciaPersonal[]>(API, { params });
  }

  registrarDia(fecha: string, marcas: MarcaAsistencia[]): Observable<ResultadoDiaAsistencia> {
    return this.http.put<ResultadoDiaAsistencia>(`${API}/dia`, { fecha, marcas });
  }
}
