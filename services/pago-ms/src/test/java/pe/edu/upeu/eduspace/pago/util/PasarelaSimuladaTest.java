package pe.edu.upeu.eduspace.pago.util;

import org.junit.jupiter.api.Test;
import pe.edu.upeu.eduspace.pago.util.PasarelaSimulada.Datos;
import pe.edu.upeu.eduspace.pago.util.PasarelaSimulada.Resultado;

import java.time.YearMonth;

import static org.junit.jupiter.api.Assertions.*;

class PasarelaSimuladaTest {

    private static final YearMonth HOY = YearMonth.of(2026, 11);

    private static Datos tarjeta(String numero, String venc, String cvv) {
        return new Datos("TARJETA", numero, venc, cvv, null, null, "Ana Pérez");
    }

    @Test
    void unaTarjetaValidaSeApruebaYDevuelveSuNumeroDeOperacion() {
        Resultado r = PasarelaSimulada.procesar(tarjeta("4111 1111 1111 1111", "12/28", "123"), HOY);
        assertTrue(r.aprobada());
        assertTrue(r.transaccionId().matches("TC-\\d{10}"), r.transaccionId());
        assertEquals("VISA ****1111", r.detalle());
        assertEquals("Ana Pérez", r.pagador());
        assertEquals("TARJETA", r.medio());
    }

    @Test
    void cadaPagoTieneSuPropioNumeroDeOperacion() {
        var a = PasarelaSimulada.procesar(tarjeta("4111111111111111", "12/28", "123"), HOY).transaccionId();
        var b = PasarelaSimulada.procesar(tarjeta("4111111111111111", "12/28", "123"), HOY).transaccionId();
        assertNotEquals(a, b);
    }

    @Test
    void laTarjetaDePruebaDeRechazoYLosDatosMalosSeRechazanSinNumeroDeOperacion() {
        assertFalse(PasarelaSimulada.procesar(tarjeta("4000 0000 0000 0002", "12/28", "123"), HOY).aprobada());
        assertFalse(PasarelaSimulada.procesar(tarjeta("4111111111111112", "12/28", "123"), HOY).aprobada());   // Luhn
        assertFalse(PasarelaSimulada.procesar(tarjeta("4111111111111111", "10/26", "123"), HOY).aprobada());   // vencida
        assertFalse(PasarelaSimulada.procesar(tarjeta("4111111111111111", "12/28", "12"), HOY).aprobada());    // CVV
        assertNull(PasarelaSimulada.procesar(tarjeta("4111111111111111", "12/28", "12"), HOY).transaccionId());
    }

    @Test
    void yapeExigeUnCelularYRechazaElDePrueba() {
        Resultado ok = PasarelaSimulada.procesar(new Datos("YAPE_PLIN", null, null, null, "987654321", null, "Ana"), HOY);
        assertTrue(ok.aprobada());
        assertTrue(ok.transaccionId().startsWith("YP-"));
        assertFalse(PasarelaSimulada.procesar(new Datos("YAPE_PLIN", null, null, null, "12345", null, "Ana"), HOY).aprobada());
        assertFalse(PasarelaSimulada.procesar(new Datos("YAPE_PLIN", null, null, null, "987654300", null, "Ana"), HOY).aprobada());
    }

    @Test
    void laTransferenciaExigeBancoYTitular() {
        Resultado ok = PasarelaSimulada.procesar(new Datos("TRANSFERENCIA", null, null, null, null, "bcp", "Ana Pérez"), HOY);
        assertTrue(ok.aprobada());
        assertTrue(ok.transaccionId().startsWith("TR-"));
        assertEquals("BCP", ok.detalle());
        assertFalse(PasarelaSimulada.procesar(new Datos("TRANSFERENCIA", null, null, null, null, null, "Ana"), HOY).aprobada());
        assertFalse(PasarelaSimulada.procesar(new Datos("TRANSFERENCIA", null, null, null, null, "BCP", " "), HOY).aprobada());
    }

    @Test
    void unMedioDesconocidoSeRechaza() {
        assertFalse(PasarelaSimulada.procesar(new Datos("BITCOIN", null, null, null, null, null, null), HOY).aprobada());
        assertFalse(PasarelaSimulada.procesar(null, HOY).aprobada());
    }
}
