package pe.edu.eduspace.planificacion.entity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class DocenteAreaTest {

    private static Area area(String codigo) {
        Area a = new Area();
        a.setCodigo(codigo);
        return a;
    }

    @Test
    void soloElAreaDocenciaPuedeDictarCursos() {
        Docente docente = new Docente();
        docente.setArea(area(Area.DOCENCIA));
        assertThat(docente.esDocente()).isTrue();

        for (String otra : new String[] {"DIRECCION", "TESORERIA", "SECRETARIA", "TI", "SEGURIDAD"}) {
            Docente personal = new Docente();
            personal.setArea(area(otra));
            assertThat(personal.esDocente()).as(otra).isFalse();
        }
    }

    @Test
    void sinAreaSeTrataComoDocenteParaNoRomperRegistrosAnteriores() {
        assertThat(new Docente().esDocente()).isTrue();
    }
}
