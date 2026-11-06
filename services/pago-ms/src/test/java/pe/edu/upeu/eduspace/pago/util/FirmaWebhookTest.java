package pe.edu.upeu.eduspace.pago.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FirmaWebhookTest {

    private static final String CUERPO = "{\"ordenCodigo\":\"ORD-1\",\"transaccionId\":\"TR-1\",\"estado\":\"APROBADO\",\"monto\":100.00}";

    @Test
    void laFirmaDeUnCuerpoSeValidaConElMismoSecreto() {
        String firma = FirmaWebhook.firmar("secreto", CUERPO);
        assertEquals(64, firma.length());
        assertTrue(FirmaWebhook.valida("secreto", CUERPO, firma));
        assertTrue(FirmaWebhook.valida("secreto", CUERPO, firma.toUpperCase()));
    }

    @Test
    void sinFirmaConOtroSecretoOConElCuerpoCambiadoSeRechaza() {
        String firma = FirmaWebhook.firmar("secreto", CUERPO);
        assertFalse(FirmaWebhook.valida("otro-secreto", CUERPO, firma));
        assertFalse(FirmaWebhook.valida("secreto", CUERPO.replace("100.00", "1.00"), firma));
        assertFalse(FirmaWebhook.valida("secreto", CUERPO, null));
        assertFalse(FirmaWebhook.valida("secreto", CUERPO, ""));
        assertFalse(FirmaWebhook.valida("", CUERPO, firma));
        assertFalse(FirmaWebhook.valida(null, CUERPO, firma));
    }
}
