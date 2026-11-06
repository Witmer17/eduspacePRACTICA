package pe.edu.upeu.eduspace.pago.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

/**
 * Firma del aviso (webhook) de la pasarela: HMAC-SHA256 del cuerpo recibido con un secreto compartido, en hexadecimal.
 * Así solo la pasarela puede confirmar una orden; el navegador no puede.
 */
public final class FirmaWebhook {

    private FirmaWebhook() {}

    public static String firmar(String secreto, String cuerpo) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secreto.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return HexFormat.of().formatHex(mac.doFinal(cuerpo.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException("No se pudo firmar el aviso", e);
        }
    }

    /** Compara en tiempo constante (sin revelar cuántos caracteres coinciden). */
    public static boolean valida(String secreto, String cuerpo, String firmaRecibida) {
        if (secreto == null || secreto.isBlank() || cuerpo == null || firmaRecibida == null) return false;
        byte[] esperada = firmar(secreto, cuerpo).getBytes(StandardCharsets.UTF_8);
        byte[] recibida = firmaRecibida.trim().toLowerCase().getBytes(StandardCharsets.UTF_8);
        return MessageDigest.isEqual(esperada, recibida);
    }
}
