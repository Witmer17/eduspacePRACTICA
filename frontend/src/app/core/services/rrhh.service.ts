import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato, ContratoRequest, CuentaDeposito, CuentaRequest, PagarRequest, PagoPersonal, PagoRequest, PlanillaGenerada, RenovarRequest } from '../models/rrhh.model';

const API = '/api/v1/planificacion/rrhh';

/** Contratos y pagos del personal (todo exige rol ADMIN en el backend). */
@Injectable({ providedIn: 'root' })
export class RrhhService {
  private readonly http = inject(HttpClient);

  contratos(personalId?: number): Observable<Contrato[]> {
    let params = new HttpParams();
    if (personalId) params = params.set('personalId', personalId);
    return this.http.get<Contrato[]>(`${API}/contratos`, { params });
  }
  crearContrato(body: ContratoRequest): Observable<Contrato> {
    return this.http.post<Contrato>(`${API}/contratos`, body);
  }
  actualizarContrato(id: number, body: ContratoRequest): Observable<Contrato> {
    return this.http.put<Contrato>(`${API}/contratos/${id}`, body);
  }
  rescindir(id: number, fecha: string | undefined, motivo: string | undefined): Observable<Contrato> {
    return this.http.post<Contrato>(`${API}/contratos/${id}/rescindir`, { fecha, motivo });
  }
  /** Renueva el contrato: el nuevo empieza el día siguiente al fin del anterior. */
  renovar(id: number, body: RenovarRequest): Observable<Contrato> {
    return this.http.post<Contrato>(`${API}/contratos/${id}/renovar`, body);
  }

  // Cuentas para depósito
  cuentas(personalId?: number): Observable<CuentaDeposito[]> {
    let params = new HttpParams();
    if (personalId) params = params.set('personalId', personalId);
    return this.http.get<CuentaDeposito[]>(`${API}/cuentas`, { params });
  }
  agregarCuenta(body: CuentaRequest): Observable<CuentaDeposito> {
    return this.http.post<CuentaDeposito>(`${API}/cuentas`, body);
  }
  actualizarCuenta(id: number, body: CuentaRequest): Observable<CuentaDeposito> {
    return this.http.put<CuentaDeposito>(`${API}/cuentas/${id}`, body);
  }
  cuentaPrincipal(id: number): Observable<CuentaDeposito> {
    return this.http.post<CuentaDeposito>(`${API}/cuentas/${id}/principal`, {});
  }
  quitarCuenta(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/cuentas/${id}`);
  }

  pagosDe(personalId: number): Observable<PagoPersonal[]> {
    return this.http.get<PagoPersonal[]>(`${API}/pagos`, { params: new HttpParams().set('personalId', personalId) });
  }
  pagosDelPeriodo(periodo: string): Observable<PagoPersonal[]> {
    return this.http.get<PagoPersonal[]>(`${API}/pagos`, { params: new HttpParams().set('periodo', periodo) });
  }
  registrarPago(body: PagoRequest): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos`, body);
  }
  pagar(id: number, body: PagarRequest): Observable<PagoPersonal> {
    return this.http.post<PagoPersonal>(`${API}/pagos/${id}/pagar`, body);
  }
  eliminarPago(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/pagos/${id}`);
  }
  generarPlanilla(periodo: string): Observable<PlanillaGenerada> {
    return this.http.post<PlanillaGenerada>(`${API}/planilla/${periodo}`, {});
  }
}
