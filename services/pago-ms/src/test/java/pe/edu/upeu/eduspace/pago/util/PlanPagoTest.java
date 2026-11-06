package pe.edu.upeu.eduspace.pago.util;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PlanPagoTest {

    private static BigDecimal d(String n) { return new BigDecimal(n); }

    private static BigDecimal suma(List<BigDecimal> l) { return l.stream().reduce(BigDecimal.ZERO, BigDecimal::add); }

    @Test
    void cadaPlanAgrupaLosDiezMesesDeFormaDistinta() {
        assertArrayEquals(new int[] { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 }, PlanPago.MENSUAL.mesesPorCuota(10));
        assertArrayEquals(new int[] { 2, 2, 2, 2, 2 }, PlanPago.BIMESTRAL.mesesPorCuota(10));
        assertArrayEquals(new int[] { 5, 5 }, PlanPago.SEMESTRAL.mesesPorCuota(10));
        assertArrayEquals(new int[] { 10 }, PlanPago.ANUAL.mesesPorCuota(10));
    }

    @Test
    void conUnNumeroDeMesesImparElUltimoGrupoEsMasCorto() {
        assertArrayEquals(new int[] { 2, 2, 2, 2, 1 }, PlanPago.BIMESTRAL.mesesPorCuota(9));
        assertArrayEquals(new int[] { 5, 4 }, PlanPago.SEMESTRAL.mesesPorCuota(9));
        assertArrayEquals(new int[] { 1 }, PlanPago.SEMESTRAL.mesesPorCuota(1));
        assertArrayEquals(new int[] { 1 }, PlanPago.BIMESTRAL.mesesPorCuota(1));
    }

    @Test
    void losMesesSiempreSumanLosDeLaTarifa() {
        for (PlanPago p : PlanPago.values()) {
            for (int n = 1; n <= 12; n++) assertEquals(n, java.util.Arrays.stream(p.mesesPorCuota(n)).sum(), p + " con " + n);
        }
    }

    @Test
    void elRepartoSumaExactamenteElTotalDelAnio() {
        for (PlanPago p : PlanPago.values()) assertEquals(0, suma(p.repartir(d("1000.00"), 10)).compareTo(d("1000.00")), p.name());
        // con centavos que no se dividen exacto: la diferencia va a la última cuota
        List<BigDecimal> m = PlanPago.MENSUAL.repartir(d("1000.00"), 3);
        assertEquals(0, suma(m).compareTo(d("1000.00")));
        assertEquals(0, m.get(0).compareTo(d("333.33")));
        assertEquals(0, m.get(2).compareTo(d("333.34")));
    }

    @Test
    void cadaCuotaEsProporcionalAlosMesesQueCubre() {
        List<BigDecimal> bi = PlanPago.BIMESTRAL.repartir(d("1000.00"), 10);
        assertEquals(5, bi.size());
        assertEquals(0, bi.get(0).compareTo(d("200.00")));
        List<BigDecimal> sem = PlanPago.SEMESTRAL.repartir(d("1000.00"), 10);
        assertEquals(2, sem.size());
        assertEquals(0, sem.get(0).compareTo(d("500.00")));
        List<BigDecimal> anual = PlanPago.ANUAL.repartir(d("1000.00"), 10);
        assertEquals(1, anual.size());
        assertEquals(0, anual.get(0).compareTo(d("1000.00")));
    }

    @Test
    void elPlanMensualSigueRepartiendoComoAntes() {
        // antes: total / n hacia abajo y la diferencia a la última
        List<BigDecimal> m = PlanPago.MENSUAL.repartir(d("1000.00"), 10);
        assertEquals(10, m.size());
        assertEquals(0, m.get(0).compareTo(d("100.00")));
    }

    @Test
    void elDescuentoDelPlanEsUnPorcentajeDelMonto() {
        assertEquals(0, PlanPago.descuentoDelPlan(d("500.00"), d("5")).compareTo(d("25.00")));
        assertEquals(0, PlanPago.descuentoDelPlan(d("1000.00"), d("10")).compareTo(d("100.00")));
        assertEquals(0, PlanPago.descuentoDelPlan(d("1000.00"), BigDecimal.ZERO).signum());
        assertEquals(0, PlanPago.descuentoDelPlan(d("1000.00"), null).signum());
    }

    @Test
    void unTextoSinPlanODesconocidoEsMensual() {
        assertEquals(PlanPago.MENSUAL, PlanPago.de(null));
        assertEquals(PlanPago.MENSUAL, PlanPago.de(" "));
        assertEquals(PlanPago.MENSUAL, PlanPago.de("QUINCENAL"));
        assertEquals(PlanPago.ANUAL, PlanPago.de("anual"));
        assertEquals(PlanPago.SEMESTRAL, PlanPago.de(" Semestral "));
    }
}
