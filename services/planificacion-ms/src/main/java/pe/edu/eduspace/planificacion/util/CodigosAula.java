package pe.edu.eduspace.planificacion.util;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

/** Códigos automáticos de las aulas de un pabellón: «A-01», «A-02»… sin repetir los que ya existen. */
public final class CodigosAula {

    private static final int LARGO_PREFIJO = 12;

    private CodigosAula() {
    }

    /** El nombre del pabellón como prefijo de código: sin tildes ni símbolos, en mayúsculas; «Central 2» → «CENTRAL2». */
    public static String prefijo(String nombrePabellon) {
        String limpio = Normalizer.normalize(nombrePabellon == null ? "" : nombrePabellon, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "").toUpperCase().replaceAll("[^A-Z0-9]", "");
        if (limpio.isEmpty()) return "P";
        return limpio.length() > LARGO_PREFIJO ? limpio.substring(0, LARGO_PREFIJO) : limpio;
    }

    /**
     * Los {@code cantidad} códigos siguientes que no existan: «A-01», «A-02»… Salta los ya tomados (aunque estén en otro pabellón)
     * para no chocar con el código único de cada aula.
     */
    public static List<String> siguientes(String nombrePabellon, int cantidad, Predicate<String> yaExiste) {
        String prefijo = prefijo(nombrePabellon);
        List<String> codigos = new ArrayList<>();
        for (int n = 1; codigos.size() < cantidad && n <= 9_999; n++) {
            String candidato = prefijo + "-" + String.format("%02d", n);
            if (!yaExiste.test(candidato)) codigos.add(candidato);
        }
        return codigos;
    }
}
