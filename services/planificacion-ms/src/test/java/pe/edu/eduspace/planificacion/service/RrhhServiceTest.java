package pe.edu.eduspace.planificacion.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;

class RrhhServiceTest {

    private static LocalDate d(String s) {
        return LocalDate.parse(s);
    }

    @Test
    void rangosQueSeSuperponenSeCruzan() {
        assertTrue(RrhhService.seCruzan(d("2026-03-01"), d("2026-12-31"), d("2026-06-01"), d("2027-06-01")));
        assertTrue(RrhhService.seCruzan(d("2026-03-01"), d("2026-03-31"), d("2026-03-31"), d("2026-04-30")));
    }

    @Test
    void rangosSeparadosNoSeCruzan() {
        assertFalse(RrhhService.seCruzan(d("2026-03-01"), d("2026-03-31"), d("2026-04-01"), d("2026-12-31")));
        assertFalse(RrhhService.seCruzan(d("2026-05-01"), d("2026-12-31"), d("2025-01-01"), d("2026-04-30")));
    }

    @Test
    void sinFinEsSinLimite() {
        assertTrue(RrhhService.seCruzan(d("2030-01-01"), null, d("2026-01-01"), null));
        assertTrue(RrhhService.seCruzan(d("2030-01-01"), d("2030-12-31"), d("2026-01-01"), null));
        assertFalse(RrhhService.seCruzan(d("2025-01-01"), d("2025-12-31"), d("2026-01-01"), null));
    }
}
