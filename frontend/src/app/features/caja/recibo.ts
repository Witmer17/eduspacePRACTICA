import { Cuota, DescuentoDelAlumno, Pago } from '../../core/models/cobro.model';
import { Colegio } from '../../core/models/planificacion.model';

/** Una cuota pagada en el recibo, con lo que el alumno necesita ver: el importe, el descuento que tuvo y cuánto queda. */
export interface LineaRecibo {
  descripcion: string;
  importe: number;
  descuento: number;
  mora: number;
  pagado: number;
  saldo: number;
}

export interface ReciboVista {
  pago: Pago;
  alumno: string;
  codigo?: string;
  documento?: string;
  responsable?: string;
  cajero: string;
  lineas: LineaRecibo[];
  hayMora: boolean;
  totalDescuento: number;
}

const r2 = (n: number): number => Math.round(n * 100) / 100;

/**
 * Arma lo que se imprime en el recibo con el pago ya registrado y las cuotas tal como estaban al cobrar
 * (el importe y el descuento salen de la cuota; lo pagado y lo que queda, de la respuesta del servidor).
 */
export function armarRecibo(
  pago: Pago,
  cuotas: readonly Cuota[],
  datos: { alumno: string; codigo?: string; documento?: string; responsable?: string; cajero: string }
): ReciboVista {
  const lineas: LineaRecibo[] = pago.detalles.map(d => {
    const c = cuotas.find(x => x.id === d.cuotaId);
    return {
      descripcion: d.cuotaDescripcion,
      importe: c ? c.montoBase : d.montoAplicado,
      descuento: c ? c.descuento : 0,
      mora: c ? c.mora : 0,
      pagado: d.montoAplicado,
      saldo: d.nuevoSaldoCuota
    };
  });
  return {
    pago,
    ...datos,
    lineas,
    hayMora: lineas.some(l => l.mora > 0),
    totalDescuento: r2(lineas.reduce((s, l) => s + l.descuento, 0))
  };
}

/** «Hermanos · 5 %» o «Beca · S/ 50.00». */
export function etiquetaDescuento(d: Pick<DescuentoDelAlumno, 'nombre' | 'tipo' | 'valor'>): string {
  return `${d.nombre} · ${d.tipo === 'PORCENTAJE' ? `${d.valor} %` : `S/ ${d.valor.toFixed(2)}`}`;
}

/** Una línea con lo que identifica al colegio: dirección, teléfono, correo, RUC. */
export function lineaColegio(c: Colegio | null): string {
  if (!c) return '';
  return [[c.direccion, c.distrito].filter(Boolean).join(', '), c.telefono && `Tel. ${c.telefono}`, c.email, c.ruc && `RUC ${c.ruc}`].filter(Boolean).join(' · ');
}

/** Descuento total que ya llevan aplicado las cuotas del alumno (suma de lo descontado en cada una). */
export function descuentoEnCuotas(cuotas: readonly Pick<Cuota, 'descuento' | 'estado'>[]): number {
  return r2(cuotas.filter(c => c.estado !== 'ANULADA').reduce((s, c) => s + c.descuento, 0));
}
