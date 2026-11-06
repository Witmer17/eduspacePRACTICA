import { DatosPasarela, MedioPasarela } from '../../../core/models/cobro.model';

export const MEDIOS_PASARELA: { id: MedioPasarela; etiqueta: string; ayuda: string }[] = [
  { id: 'TARJETA', etiqueta: 'Tarjeta', ayuda: 'Débito o crédito' },
  { id: 'YAPE_PLIN', etiqueta: 'Yape o Plin', ayuda: 'Desde tu celular' },
  { id: 'TRANSFERENCIA', etiqueta: 'Transferencia', ayuda: 'Desde tu banco' }
];

export const BANCOS_PASARELA: { id: string; etiqueta: string }[] = [
  { id: 'BCP', etiqueta: 'BCP' }, { id: 'BBVA', etiqueta: 'BBVA' }, { id: 'INTERBANK', etiqueta: 'Interbank' },
  { id: 'SCOTIABANK', etiqueta: 'Scotiabank' }, { id: 'BANCO_NACION', etiqueta: 'Banco de la Nación' }
];

export const ETIQUETA_MEDIO: Record<string, string> = {
  TARJETA: 'Tarjeta', YAPE_PLIN: 'Yape o Plin', TRANSFERENCIA: 'Transferencia', EFECTIVO: 'Efectivo', CREDITO: 'Crédito', ONLINE_SIMULADO: 'En línea'
};

/**
 * Aviso a la persona de lo que falta en el formulario, ANTES de enviarlo. Es solo una ayuda: quien decide si el pago es válido es la
 * pasarela (el servidor), que vuelve a validar todo.
 */
export function faltaEnDatos(d: DatosPasarela): string | null {
  switch (d.medio) {
    case 'TARJETA':
      if (!/^\d{13,19}$/.test((d.tarjetaNumero ?? '').replace(/[\s-]/g, ''))) return 'Escribe el número de la tarjeta.';
      if (!/^\d{2}\s*\/\s*\d{2,4}$/.test(d.vencimiento ?? '')) return 'El vencimiento va como MM/AA.';
      if (!/^\d{3,4}$/.test(d.cvv ?? '')) return 'Escribe el código de seguridad (CVV).';
      return null;
    case 'YAPE_PLIN':
      return /^9\d{8}$/.test((d.celular ?? '').replace(/\s/g, '')) ? null : 'El celular debe tener 9 dígitos y empezar con 9.';
    default:
      if (!d.banco) return 'Elige el banco desde el que transfieres.';
      return (d.titular ?? '').trim() ? null : 'Escribe el titular de la cuenta.';
  }
}

/** Solo los datos del medio elegido (no se envía nada de los otros). */
export function datosDelMedio(d: DatosPasarela): DatosPasarela {
  switch (d.medio) {
    case 'TARJETA': return { medio: d.medio, tarjetaNumero: d.tarjetaNumero, vencimiento: d.vencimiento, cvv: d.cvv, titular: d.titular };
    case 'YAPE_PLIN': return { medio: d.medio, celular: d.celular, titular: d.titular };
    default: return { medio: d.medio, banco: d.banco, titular: d.titular };
  }
}
