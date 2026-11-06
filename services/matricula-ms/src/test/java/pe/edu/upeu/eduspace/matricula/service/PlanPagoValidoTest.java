package pe.edu.upeu.eduspace.matricula.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** La forma de pago de las pensiones que se guarda en la matrícula: sin dato o desconocida es mensual. */
class PlanPagoValidoTest {

    @Test
    void sinPlanODesconocidoEsMensual() {
        assertEquals("MENSUAL", MatriculaService.planValido(null));
        assertEquals("MENSUAL", MatriculaService.planValido("  "));
        assertEquals("MENSUAL", MatriculaService.planValido("QUINCENAL"));
    }

    @Test
    void losPlanesValidosSeAceptanSinImportarMayusculasNiEspacios() {
        assertEquals("BIMESTRAL", MatriculaService.planValido("bimestral"));
        assertEquals("SEMESTRAL", MatriculaService.planValido(" Semestral "));
        assertEquals("ANUAL", MatriculaService.planValido("ANUAL"));
        assertEquals("MENSUAL", MatriculaService.planValido("mensual"));
    }
}
