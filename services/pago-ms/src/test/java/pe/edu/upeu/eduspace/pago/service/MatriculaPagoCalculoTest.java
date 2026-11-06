package pe.edu.upeu.eduspace.pago.service;

import org.junit.jupiter.api.Test;
import pe.edu.upeu.eduspace.pago.service.MatriculaPagoService.Calculo;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/** La regla de cuánto falta pagar de la matrícula y cuándo el crédito alcanza para generarla (la decide el servidor). */
class MatriculaPagoCalculoTest {

    private static BigDecimal s(String n) { return new BigDecimal(n); }

    @Test
    void faltaLoQueDebeLaMatriculaMenosElCredito() {
        Calculo c = MatriculaPagoService.calcular(s("350.00"), s("100.00"));
        assertEquals(0, c.faltante().compareTo(s("250.00")));
        assertFalse(c.creditoAlcanza());
    }

    @Test
    void sinCreditoFaltaTodo() {
        Calculo c = MatriculaPagoService.calcular(s("350.00"), BigDecimal.ZERO);
        assertEquals(0, c.faltante().compareTo(s("350.00")));
        assertFalse(c.creditoAlcanza());
        assertFalse(MatriculaPagoService.calcular(s("350.00"), null).creditoAlcanza());
    }

    @Test
    void conCreditoSuficienteNoFaltaNadaYSePuedeGenerar() {
        Calculo c = MatriculaPagoService.calcular(s("350.00"), s("350.00"));
        assertEquals(0, c.faltante().signum());
        assertTrue(c.creditoAlcanza());
        assertTrue(MatriculaPagoService.calcular(s("350.00"), s("900.00")).creditoAlcanza());
    }

    @Test
    void unCentavoDeMenosNoAlcanza() {
        Calculo c = MatriculaPagoService.calcular(s("350.00"), s("349.99"));
        assertFalse(c.creditoAlcanza());
        assertEquals(0, c.faltante().compareTo(s("0.01")));
    }

    @Test
    void sinNadaQuePagarNoHayQueGenerarConCredito() {
        Calculo c = MatriculaPagoService.calcular(BigDecimal.ZERO, s("500.00"));
        assertEquals(0, c.faltante().signum());
        assertFalse(c.creditoAlcanza());   // ya está pagada: no se cobra otra vez
    }
}
