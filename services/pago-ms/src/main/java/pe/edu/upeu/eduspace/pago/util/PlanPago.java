package pe.edu.upeu.eduspace.pago.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

/**
 * Forma de pago de las pensiones, que se acuerda al matricular. La tarifa de pensión es el TOTAL del año repartido en «n» meses; cada plan lo
 * agrupa distinto: mensual (una cuota por mes), bimestral (una cada dos meses), semestral (dos cuotas, una por semestre) y anual (un solo pago).
 * Los planes semestral y anual llevan un descuento sobre la pensión (porcentajes en {@code app.pago}).
 */
public enum PlanPago {
    MENSUAL("Mensual"),
    BIMESTRAL("Bimestral"),
    SEMESTRAL("Semestral"),
    ANUAL("Anual");

    private final String etiqueta;

    PlanPago(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String etiqueta() {
        return etiqueta;
    }

    /** El plan de un texto; sin plan (o desconocido) es mensual, que es como se generaban las cuotas antes. */
    public static PlanPago de(String texto) {
        if (texto == null || texto.isBlank()) return MENSUAL;
        try {
            return valueOf(texto.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return MENSUAL;
        }
    }

    /** Cuántos meses cubre cada cuota, de la primera a la última, para una tarifa de «n» meses (la suma siempre es n). */
    public int[] mesesPorCuota(int n) {
        int meses = Math.max(n, 1);
        switch (this) {
            case BIMESTRAL: {
                int[] r = new int[(meses + 1) / 2];
                for (int i = 0; i < r.length; i++) r[i] = Math.min(2, meses - i * 2);
                return r;
            }
            case SEMESTRAL: {
                if (meses == 1) return new int[] { 1 };
                int primero = (meses + 1) / 2;
                return new int[] { primero, meses - primero };
            }
            case ANUAL:
                return new int[] { meses };
            default: {
                int[] r = new int[meses];
                java.util.Arrays.fill(r, 1);
                return r;
            }
        }
    }

    /**
     * Reparte el total de la pensión del año entre las cuotas del plan, en proporción a los meses que cubre cada una (redondeo a 2 decimales
     * hacia abajo y la diferencia de centavos va a la última cuota, para que la suma sea exactamente el total).
     */
    public List<BigDecimal> repartir(BigDecimal total, int n) {
        int[] meses = mesesPorCuota(n);
        int totalMeses = java.util.Arrays.stream(meses).sum();
        List<BigDecimal> montos = new ArrayList<>();
        BigDecimal acumulado = BigDecimal.ZERO;
        for (int i = 0; i < meses.length; i++) {
            BigDecimal monto = i == meses.length - 1
                ? total.subtract(acumulado)
                : total.multiply(BigDecimal.valueOf(meses[i])).divide(BigDecimal.valueOf(totalMeses), 2, RoundingMode.DOWN);
            montos.add(monto);
            acumulado = acumulado.add(monto);
        }
        return montos;
    }

    /** El descuento del plan sobre un monto: porcentaje del monto, redondeado a 2 decimales. */
    public static BigDecimal descuentoDelPlan(BigDecimal monto, BigDecimal porcentaje) {
        if (porcentaje == null || porcentaje.signum() <= 0) return BigDecimal.ZERO;
        return monto.multiply(porcentaje).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }
}
