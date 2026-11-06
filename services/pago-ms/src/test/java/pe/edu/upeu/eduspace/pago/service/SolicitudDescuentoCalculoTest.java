package pe.edu.upeu.eduspace.pago.service;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** Cuánto queda de la matrícula tras aprobar un descuento: nunca negativo y sin tocar lo que no corresponde. */
class SolicitudDescuentoCalculoTest {

    private static BigDecimal d(String n) { return new BigDecimal(n); }

    @Test
    void elDescuentoSeRestaDeLaMatricula() {
        assertEquals(0, SolicitudDescuentoService.montoConDescuento(d("120.00"), d("6.00")).compareTo(d("114.00")));
    }

    @Test
    void sinDescuentoQuedaIgual() {
        assertEquals(0, SolicitudDescuentoService.montoConDescuento(d("120.00"), null).compareTo(d("120.00")));
        assertEquals(0, SolicitudDescuentoService.montoConDescuento(d("120.00"), BigDecimal.ZERO).compareTo(d("120.00")));
    }

    @Test
    void unDescuentoMayorQueLaMatriculaNoLaDejaEnNegativo() {
        assertEquals(0, SolicitudDescuentoService.montoConDescuento(d("120.00"), d("500.00")).signum());
    }
}
