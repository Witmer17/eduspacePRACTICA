package pe.edu.upeu.eduspace.pago.util;

import java.time.YearMonth;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Pasarela de pago FALSA, pero con el contrato de una real: recibe los datos del pago y devuelve un resultado con el id de transacción
 * (el «número de operación»), el medio y el estado. No cobra nada y no guarda datos de tarjeta: solo la marca y los últimos 4 dígitos.
 * Casos de prueba: tarjeta que termina en 0002 y celular que termina en 00 se rechazan.
 */
public final class PasarelaSimulada {

    public static final Set<String> MEDIOS = Set.of("TARJETA", "YAPE_PLIN", "TRANSFERENCIA");
    public static final Set<String> BANCOS = Set.of("BCP", "BBVA", "INTERBANK", "SCOTIABANK", "BANCO_NACION");

    /** Lo que la persona escribe en la pantalla de pago de la pasarela. */
    public record Datos(String medio, String tarjetaNumero, String vencimiento, String cvv, String celular, String banco, String titular) {}

    /** Lo que devuelve la pasarela: aprobada o no, su id de transacción, el medio y el nombre de quien paga. */
    public record Resultado(boolean aprobada, String transaccionId, String mensaje, String medio, String pagador, String detalle) {}

    private PasarelaSimulada() {}

    public static Resultado procesar(Datos d, YearMonth hoy) {
        String medio = d == null || d.medio() == null ? "" : d.medio().trim().toUpperCase();
        if (!MEDIOS.contains(medio)) return rechazo(medio, "El medio de pago no es válido.", null);
        return switch (medio) {
            case "TARJETA" -> tarjeta(d, hoy);
            case "YAPE_PLIN" -> billetera(d);
            default -> transferencia(d);
        };
    }

    private static Resultado tarjeta(Datos d, YearMonth hoy) {
        String n = d.tarjetaNumero() == null ? "" : d.tarjetaNumero().replaceAll("[\\s-]", "");
        if (!n.matches("\\d{13,19}") || !luhn(n)) return rechazo("TARJETA", "El número de tarjeta no es válido.", null);
        if (d.cvv() == null || !d.cvv().matches("\\d{3,4}")) return rechazo("TARJETA", "El código de seguridad (CVV) no es válido.", null);
        YearMonth v = vencimiento(d.vencimiento());
        if (v == null) return rechazo("TARJETA", "El vencimiento debe tener el formato MM/AA.", null);
        if (v.isBefore(hoy)) return rechazo("TARJETA", "La tarjeta está vencida.", null);
        String detalle = marca(n) + " ****" + n.substring(n.length() - 4);
        String titular = limpio(d.titular());
        if (n.endsWith("0002")) return rechazo("TARJETA", "La tarjeta fue rechazada por el banco (tarjeta de prueba de rechazo).", detalle);
        return aprobado("TARJETA", "TC", titular, detalle);
    }

    private static Resultado billetera(Datos d) {
        String c = d.celular() == null ? "" : d.celular().replaceAll("\\s", "");
        if (!c.matches("9\\d{8}")) return rechazo("YAPE_PLIN", "El celular debe tener 9 dígitos y empezar con 9.", null);
        String detalle = "Cel. ***" + c.substring(6);
        if (c.endsWith("00")) return rechazo("YAPE_PLIN", "La billetera rechazó el pago (celular de prueba de rechazo).", detalle);
        return aprobado("YAPE_PLIN", "YP", limpio(d.titular()), detalle);
    }

    private static Resultado transferencia(Datos d) {
        String banco = d.banco() == null ? "" : d.banco().trim().toUpperCase();
        if (!BANCOS.contains(banco)) return rechazo("TRANSFERENCIA", "Elige el banco desde el que transfieres.", null);
        String titular = limpio(d.titular());
        if (titular == null) return rechazo("TRANSFERENCIA", "Indica el titular de la cuenta.", banco);
        return aprobado("TRANSFERENCIA", "TR", titular, banco);
    }

    private static Resultado aprobado(String medio, String prefijo, String pagador, String detalle) {
        return new Resultado(true, idTransaccion(prefijo), "Pago aprobado.", medio, pagador, detalle);
    }

    private static Resultado rechazo(String medio, String mensaje, String detalle) {
        return new Resultado(false, null, mensaje, medio, null, detalle);
    }

    /** «TR-» y diez dígitos, como un número de operación. */
    static String idTransaccion(String prefijo) {
        long n = ThreadLocalRandom.current().nextLong(1_000_000_000L, 10_000_000_000L);
        return prefijo + "-" + n;
    }

    static boolean luhn(String n) {
        int suma = 0;
        boolean doble = false;
        for (int i = n.length() - 1; i >= 0; i--) {
            int d = n.charAt(i) - '0';
            if (doble) {
                d *= 2;
                if (d > 9) d -= 9;
            }
            suma += d;
            doble = !doble;
        }
        return suma % 10 == 0;
    }

    static String marca(String n) {
        return n.startsWith("4") ? "VISA" : n.matches("^5[1-5].*") ? "MASTERCARD" : n.matches("^3[47].*") ? "AMEX" : "TARJETA";
    }

    static YearMonth vencimiento(String v) {
        if (v == null || !v.matches("\\d{2}\\s*/\\s*\\d{2,4}")) return null;
        String[] p = v.split("\\s*/\\s*");
        int mes = Integer.parseInt(p[0]);
        int anio = Integer.parseInt(p[1]);
        if (mes < 1 || mes > 12) return null;
        return YearMonth.of(anio < 100 ? 2000 + anio : anio, mes);
    }

    private static String limpio(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }
}
