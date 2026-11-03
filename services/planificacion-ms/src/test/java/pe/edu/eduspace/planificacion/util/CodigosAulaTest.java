package pe.edu.eduspace.planificacion.util;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Set;
import org.junit.jupiter.api.Test;

class CodigosAulaTest {

    @Test
    void elPrefijoSaleDelNombreDelPabellonSinTildesNiSimbolos() {
        assertThat(CodigosAula.prefijo("A")).isEqualTo("A");
        assertThat(CodigosAula.prefijo("Central 2")).isEqualTo("CENTRAL2");
        assertThat(CodigosAula.prefijo("Ñandú")).isEqualTo("NANDU");
        assertThat(CodigosAula.prefijo("Pabellón Ñandú")).isEqualTo("PABELLONNAND"); // se corta en 12 caracteres
        assertThat(CodigosAula.prefijo("¿¡!?")).isEqualTo("P");
        assertThat(CodigosAula.prefijo(null)).isEqualTo("P");
        assertThat(CodigosAula.prefijo("NOMBRE-MUY-LARGO-DE-PABELLON")).hasSizeLessThanOrEqualTo(12);
    }

    @Test
    void generaLosCodigosEnOrden() {
        assertThat(CodigosAula.siguientes("A", 3, c -> false)).containsExactly("A-01", "A-02", "A-03");
        assertThat(CodigosAula.siguientes("A", 0, c -> false)).isEmpty();
    }

    @Test
    void saltaLosCodigosQueYaExisten() {
        Set<String> tomados = Set.of("A-01", "A-03");
        assertThat(CodigosAula.siguientes("A", 3, tomados::contains)).containsExactly("A-02", "A-04", "A-05");
    }

    @Test
    void elCodigoCabeEnLaColumnaDelAula() {
        String mayor = CodigosAula.siguientes("NOMBRE-MUY-LARGO-DE-PABELLON", 1, c -> false).get(0);
        assertThat(mayor.length()).isLessThanOrEqualTo(20); // aulas.codigo es VARCHAR(20)
    }
}
