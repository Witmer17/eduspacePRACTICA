import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Caja, CierreCaja, Comprobante, CreditoAlumno, Cuota, DatosPasarela, DescuentoDelAlumno, EstadoMatriculaPago, MatriculaPorPagar, OpcionDescuento, OrdenPago, PedidoDescuento, ResultadoPasarela, SolicitudDescuento, DepositoCredito, EstadoCuenta, FiltroCuotas, Pago, RegistrarPago, ResultadoCredito } from '../models/cobro.model';
import { Page } from '../models/page.model';

const API = '/api/v1/pagos';

/** Cobros, cuentas por alumno, caja y comprobantes (la configuración de tarifas está en PagoConfigService). */
@Injectable({ providedIn: 'root' })
export class CobroService {
  private readonly http = inject(HttpClient);

  estadoCuenta(alumnoId: number): Observable<EstadoCuenta> {
    return this.http.get<EstadoCuenta>(`${API}/alumnos/${alumnoId}/estado-cuenta`);
  }

  // Pago de la matrícula: la orden la crea el servidor con lo que falta; la pasarela (simulada) cobra y avisa; de ahí sale la matrícula
  matriculaDe(alumnoId: number): Observable<EstadoMatriculaPago> {
    return this.http.get<EstadoMatriculaPago>(`${API}/alumnos/${alumnoId}/matricula`);
  }
  crearOrdenMatricula(alumnoId: number): Observable<OrdenPago> {
    return this.http.post<OrdenPago>(`${API}/alumnos/${alumnoId}/matricula/orden`, {});
  }
  pagarEnPasarela(codigoOrden: string, datos: DatosPasarela): Observable<ResultadoPasarela> {
    return this.http.post<ResultadoPasarela>(`${API}/pasarela/ordenes/${codigoOrden}/pagar`, datos);
  }
  /** «Generar matrícula» con el crédito del alumno; el servidor rechaza si el crédito no alcanza. */
  generarMatricula(alumnoId: number): Observable<EstadoMatriculaPago> {
    return this.http.post<EstadoMatriculaPago>(`${API}/alumnos/${alumnoId}/matricula/generar`, {});
  }
  // Solicitud de descuento de la matrícula (hermanos, etc.): la pide la familia o la secretaría y la prueba la secretaría
  opcionesDescuento(): Observable<OpcionDescuento[]> {
    return this.http.get<OpcionDescuento[]>(`${API}/solicitudes-descuento/opciones`);
  }
  solicitarDescuento(alumnoId: number, pedido: PedidoDescuento): Observable<SolicitudDescuento> {
    return this.http.post<SolicitudDescuento>(`${API}/alumnos/${alumnoId}/matricula/descuento`, pedido);
  }
  solicitudesDescuento(): Observable<SolicitudDescuento[]> {
    return this.http.get<SolicitudDescuento[]>(`${API}/solicitudes-descuento`);
  }
  aprobarSolicitudDescuento(id: number): Observable<SolicitudDescuento> {
    return this.http.post<SolicitudDescuento>(`${API}/solicitudes-descuento/${id}/aprobar`, {});
  }
  rechazarSolicitudDescuento(id: number, motivo: string): Observable<SolicitudDescuento> {
    return this.http.post<SolicitudDescuento>(`${API}/solicitudes-descuento/${id}/rechazar`, { motivo });
  }
  matriculasPorPagar(): Observable<MatriculaPorPagar[]> {
    return this.http.get<MatriculaPorPagar[]>(`${API}/matriculas/por-pagar`);
  }

  /** Los descuentos vigentes del alumno, con su nombre y valor. */
  descuentosDe(alumnoId: number): Observable<DescuentoDelAlumno[]> {
    return this.http.get<DescuentoDelAlumno[]>(`${API}/alumnos/${alumnoId}/descuentos`);
  }

  // Crédito del alumno
  credito(alumnoId: number): Observable<CreditoAlumno> {
    return this.http.get<CreditoAlumno>(`${API}/alumnos/${alumnoId}/credito`);
  }
  depositarCredito(alumnoId: number, body: DepositoCredito): Observable<ResultadoCredito> {
    return this.http.post<ResultadoCredito>(`${API}/alumnos/${alumnoId}/credito/depositos`, body);
  }
  cobrarDelCredito(alumnoId: number): Observable<ResultadoCredito> {
    return this.http.post<ResultadoCredito>(`${API}/alumnos/${alumnoId}/credito/cobrar`, {});
  }
  anularDeposito(movimientoId: number, motivo: string): Observable<void> {
    return this.http.post<void>(`${API}/creditos/movimientos/${movimientoId}/anular`, { motivo });
  }

  cuotas(f: FiltroCuotas = {}): Observable<Page<Cuota>> {
    let params = new HttpParams().set('page', f.page ?? 0).set('size', f.size ?? 20);
    if (f.estado) params = params.set('estado', f.estado);
    if (f.alumnoId) params = params.set('alumnoId', f.alumnoId);
    if (f.seccionId) params = params.set('seccionId', f.seccionId);
    if (f.vencimiento) params = params.set('vencimiento', f.vencimiento);
    return this.http.get<Page<Cuota>>(`${API}/cuotas`, { params });
  }

  misCuotas(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(`${API}/mias/cuotas`);
  }

  registrar(body: RegistrarPago): Observable<Pago> {
    return this.http.post<Pago>(API, body);
  }

  pagarOnline(body: RegistrarPago): Observable<Pago> {
    return this.http.post<Pago>(`${API}/online`, body);
  }

  // Pagos de apoderados por aprobar: los aprueba o rechaza caja (o el administrador)
  porAprobar(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${API}/por-aprobar`);
  }
  conteoPorAprobar(): Observable<number> {
    return this.http.get<{ pendientes: number }>(`${API}/por-aprobar/conteo`).pipe(map(r => r.pendientes));
  }
  aprobar(id: number): Observable<Pago> {
    return this.http.post<Pago>(`${API}/${id}/aprobar`, {});
  }
  rechazar(id: number, motivo: string): Observable<Pago> {
    return this.http.post<Pago>(`${API}/${id}/rechazar`, { motivo });
  }
  /** Lo que el apoderado pagó y sigue en revisión, o fue rechazado (con motivo). */
  misPendientes(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${API}/mias/pendientes`);
  }

  anular(id: number, motivo: string): Observable<Pago> {
    return this.http.patch<Pago>(`${API}/${id}/anular`, { motivo });
  }

  pago(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${API}/${id}`);
  }

  comprobante(pagoId: number): Observable<Comprobante> {
    return this.http.get<Comprobante>(`${API}/${pagoId}/comprobante`);
  }

  reporteCobranza(desde?: string, hasta?: string, medio?: string, page = 0, size = 20): Observable<Page<Pago>> {
    let params = new HttpParams().set('page', page).set('size', size);
    // pago-ms recibe fecha y hora (LocalDateTime): el día completo va de 00:00:00 a 23:59:59.
    if (desde) params = params.set('desde', `${desde}T00:00:00`);
    if (hasta) params = params.set('hasta', `${hasta}T23:59:59`);
    if (medio) params = params.set('medio', medio);
    return this.http.get<Page<Pago>>(`${API}/reportes/cobranza`, { params });
  }

  asignarDescuento(alumnoId: number, descuentoId: number, anioId: number, motivo?: string): Observable<unknown> {
    return this.http.post(`${API}/descuentos/asignar`, { alumnoId, descuentoId, anioId, motivo });
  }

  // Caja
  cajaActual(): Observable<Caja> {
    return this.http.get<Caja>(`${API}/caja/actual`);
  }
  abrirCaja(montoApertura: number): Observable<Caja> {
    return this.http.post<Caja>(`${API}/caja/abrir`, { montoApertura });
  }
  cerrarCaja(montoCierreDeclarado: number): Observable<CierreCaja> {
    return this.http.post<CierreCaja>(`${API}/caja/cerrar`, { montoCierreDeclarado });
  }
  reporteCaja(id: number): Observable<CierreCaja> {
    // Con la caja abierta el servicio no calcula el efectivo esperado (solo al cerrar): apertura + cobros en efectivo.
    return this.http.get<CierreCaja>(`${API}/caja/${id}/reporte`).pipe(
      map(r => ({ ...r, efectivoEsperado: r.efectivoEsperado ?? r.montoApertura + r.cobrosEfectivo }))
    );
  }
}
