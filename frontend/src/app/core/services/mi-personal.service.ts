import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaPersonal } from '../models/asistencia-personal.model';
import { Docente } from '../models/planificacion.model';
import { Contrato, CuentaDeposito, PagoPersonal } from '../models/rrhh.model';

const API = '/api/v1/planificacion/mi-personal';

/** Lo propio de quien trabaja en el colegio (docente, caja…): su ficha, contrato, pagos, asistencia y cuenta de depósito. Solo lectura. */
@Injectable({ providedIn: 'root' })
export class MiPersonalService {
  private readonly http = inject(HttpClient);

  ficha(): Observable<Docente> {
    return this.http.get<Docente>(API);
  }
  contratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${API}/contratos`);
  }
  pagos(periodo?: string): Observable<PagoPersonal[]> {
    let params = new HttpParams();
    if (periodo) params = params.set('periodo', periodo);
    return this.http.get<PagoPersonal[]>(`${API}/pagos`, { params });
  }
  cuentas(): Observable<CuentaDeposito[]> {
    return this.http.get<CuentaDeposito[]>(`${API}/cuentas`);
  }
  asistencia(desde: string, hasta: string): Observable<AsistenciaPersonal[]> {
    return this.http.get<AsistenciaPersonal[]>(`${API}/asistencia`, { params: new HttpParams().set('desde', desde).set('hasta', hasta) });
  }
}
