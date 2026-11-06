import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CuentaDeposito, PagarRequest, PagoPersonal } from '../models/rrhh.model';

const API = '/api/v1/planificacion/pago-personal';

/**
 * Pago al personal con aprobación. Caja ve la planilla del mes y SOLICITA cada pago (medio, fecha, referencia);
 * el administrador lo APRUEBA o lo RECHAZA con un motivo. Lo usan caja y el administrador.
 */
@Injectable({ providedIn: 'root' })
export class PagoPersonalService {
  private readonly http = inject(HttpClient);

  /** Los pagos de un mes (pendientes, por aprobar y pagados). */
  planilla(periodo: string): Observable<PagoPersonal[]> {
    return this.http.get<PagoPersonal[]>(`${API}/planilla`, { params: new HttpParams().set('periodo', periodo) });
  }

  /** Dónde se le deposita a una persona. */
  cuentas(personalId: number): Observable<CuentaDeposito[]> {
    return this.http.get<CuentaDeposito[]>(`${API}/cuentas`, { params: new HttpParams().set('personalId', personalId) });
  }

  porAprobar(): Observable<PagoPersonal[]> {
    return this.http.get<PagoPersonal[]>(`${API}/por-aprobar`);
  }

  /** Cuántos pagos esperan la aprobación del administrador. */
  conteoPorAprobar(): Observable<number> {
    return this.http.get<{ pendientes: number }>(`${API}/por-aprobar/conteo`).pipe(map(r => r.pendientes));
  }

  /** Caja: registra cómo se pagó; queda por aprobar. */
  solicitar(id: number, body: PagarRequest): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos/${id}/solicitar`, body);
  }

  /** Administrador: aprueba el pago (pasa a pagado). */
  aprobar(id: number): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos/${id}/aprobar`, {});
  }

  /** Administrador: lo devuelve a pendiente con el motivo. */
  rechazar(id: number, motivo: string): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos/${id}/rechazar`, { motivo });
  }
}
