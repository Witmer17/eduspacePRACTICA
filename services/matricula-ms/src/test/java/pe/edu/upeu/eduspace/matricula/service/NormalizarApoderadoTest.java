package pe.edu.upeu.eduspace.matricula.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

/** Los datos del apoderado se comparan sin que cuenten mayúsculas, tildes ni espacios sobrantes. */
class NormalizarApoderadoTest {

    @Test
    void ignoraMayusculasTildesYEspaciosSobrantes() {
        assertEquals(MatriculaEnLineaService.normalizarTexto("Carmen Rosa"), MatriculaEnLineaService.normalizarTexto("  CARMEN   rosa "));
        assertEquals(MatriculaEnLineaService.normalizarTexto("Torres Vega"), MatriculaEnLineaService.normalizarTexto("Tórres Vega"));
    }

    @Test
    void unNombreDistintoNoCoincide() {
        assertNotEquals(MatriculaEnLineaService.normalizarTexto("Carmen Rosa"), MatriculaEnLineaService.normalizarTexto("Carmen Luisa"));
        assertNotEquals(MatriculaEnLineaService.normalizarTexto("Torres Vega"), MatriculaEnLineaService.normalizarTexto("Torres"));
    }

    @Test
    void unNuloEsTextoVacio() {
        assertEquals("", MatriculaEnLineaService.normalizarTexto(null));
    }
}
