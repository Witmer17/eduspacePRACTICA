package pe.edu.eduspace.planificacion.integration;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jayway.jsonpath.JsonPath;
import java.util.List;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

/** Lo que el administrador configura del colegio: grados que ofrece, áreas de trabajo y datos de la institución. */
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ConfiguracionColegioIntegrationTest extends PostgresIntegrationTestBase {

    @Autowired MockMvc mvc;
    @Autowired JdbcTemplate jdbc;
    @MockitoBean KafkaTemplate<String, String> kafkaTemplate;

    JwtRequestPostProcessor usuario(String rol) {
        return jwt().jwt(j -> j.claim("usuarioId", 1L).claim("realm_access", java.util.Map.of("roles", List.of(rol))))
                .authorities(new SimpleGrantedAuthority("ROLE_" + rol));
    }

    ResultActions enviar(String metodo, String ruta, String cuerpo, String rol) throws Exception {
        var req = switch (metodo) {
            case "POST" -> post(ruta);
            case "PUT" -> put(ruta);
            case "PATCH" -> patch(ruta);
            default -> throw new IllegalArgumentException(metodo);
        };
        return mvc.perform(req.with(usuario(rol)).contentType(MediaType.APPLICATION_JSON).content(cuerpo == null ? "" : cuerpo));
    }

    /** Todos los grados de la oferta, marcados como elegidos, salvo los que se indiquen. */
    static String todosMenos(String... quitar) {
        var fuera = java.util.Set.of(quitar);
        var partes = new java.util.ArrayList<String>();
        for (var e : java.util.Map.of("INICIAL", 3, "PRIMARIA", 6, "SECUNDARIA", 5).entrySet()) {
            for (int n = 1; n <= e.getValue(); n++) {
                if (!fuera.contains(e.getKey() + ":" + n)) partes.add("{\"nivelCodigo\":\"" + e.getKey() + "\",\"numero\":" + n + "}");
            }
        }
        return "{\"seleccionados\":[" + String.join(",", partes) + "]}";
    }

    // ---------------------------------------------------------------- grados que ofrece el colegio
    @Test
    @Order(1)
    void oferta_muestraLos14GradosPosiblesYCuantosOfreceElColegio() throws Exception {
        mvc.perform(get("/api/v1/planificacion/grados/oferta").with(usuario("SECRETARIA")))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(14))
                .andExpect(jsonPath("$[0].nivelCodigo").value("INICIAL")).andExpect(jsonPath("$[0].nombre").value("3 años"))
                .andExpect(jsonPath("$[3].nombre").value("1° de Primaria")).andExpect(jsonPath("$[13].nombre").value("5° de Secundaria"))
                .andExpect(jsonPath("$[?(@.seleccionado == true)]", hasSize(14)));
    }

    @Test
    @Order(2)
    void oferta_quitarUnGradoSinUsoLoDesactivaYLosDemasPantallasYaNoLoOfrecen_yVolverAElegirloLoReactiva() throws Exception {
        enviar("PUT", "/api/v1/planificacion/grados/oferta", todosMenos("SECUNDARIA:5"), "ADMIN").andExpect(status().isOk())
                .andExpect(jsonPath("$[13].seleccionado").value(false)).andExpect(jsonPath("$[12].seleccionado").value(true));
        mvc.perform(get("/api/v1/planificacion/grados").with(usuario("ADMIN")))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(13));

        enviar("PUT", "/api/v1/planificacion/grados/oferta", todosMenos(), "ADMIN").andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.seleccionado == true)]", hasSize(14)));
        mvc.perform(get("/api/v1/planificacion/grados").with(usuario("ADMIN"))).andExpect(jsonPath("$.length()").value(14));
    }

    @Test
    @Order(3)
    void oferta_unGradoConCursosEnSuMallaNoSePuedeQuitar_ynadaCambiaSiFalla() throws Exception {
        Long gradoId = jdbc.queryForObject("select g.id from grados g join niveles n on n.id = g.nivel_id where n.codigo = 'PRIMARIA' and g.numero = 6", Long.class);
        Long cursoId = jdbc.queryForObject("insert into cursos (codigo, nombre) values ('OFERTA-T', 'Curso de prueba') returning id", Long.class);
        Long mallaId = jdbc.queryForObject("insert into grado_cursos (grado_id, curso_id, horas_semanales) values (?, ?, 2) returning id", Long.class, gradoId, cursoId);
        try {
            enviar("PUT", "/api/v1/planificacion/grados/oferta", todosMenos("PRIMARIA:6", "SECUNDARIA:4"), "ADMIN")
                    .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("6° de Primaria")));
            // al fallar no se aplica ningún cambio: 5° de Secundaria... y «4° de Secundaria» siguen ofrecidos
            mvc.perform(get("/api/v1/planificacion/grados").with(usuario("ADMIN"))).andExpect(jsonPath("$.length()").value(14));
            mvc.perform(get("/api/v1/planificacion/grados/oferta").with(usuario("ADMIN")))
                    .andExpect(jsonPath("$[8].enUso").value(true)).andExpect(jsonPath("$[8].detalleUso", containsString("1 curso")));
        } finally {
            jdbc.update("delete from grado_cursos where id = ?", mallaId);
            jdbc.update("delete from cursos where id = ?", cursoId);
        }
    }

    @Test
    @Order(4)
    void oferta_soloElAdministradorLaCambia_yValidaLoQueRecibe() throws Exception {
        enviar("PUT", "/api/v1/planificacion/grados/oferta", todosMenos(), "SECRETARIA").andExpect(status().isForbidden());
        enviar("PUT", "/api/v1/planificacion/grados/oferta", "{\"seleccionados\":[]}", "ADMIN").andExpect(status().isBadRequest());
        enviar("PUT", "/api/v1/planificacion/grados/oferta", "{\"seleccionados\":[{\"nivelCodigo\":\"PRIMARIA\",\"numero\":9}]}", "ADMIN")
                .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("no es un grado")));
    }

    // ---------------------------------------------------------------- áreas de trabajo
    @Test
    @Order(5)
    void areas_seCreanSeRenombranYSeDesactivan_conSusReglas() throws Exception {
        String body = enviar("POST", "/api/v1/planificacion/areas", "{\"codigo\":\"DEPORTES\",\"nombre\":\"Deportes\",\"descripcion\":\"Educación física y torneos\"}", "ADMIN")
                .andExpect(status().isCreated()).andExpect(jsonPath("$.activo").value(true)).andReturn().getResponse().getContentAsString();
        long id = ((Number) JsonPath.read(body, "$.id")).longValue();

        enviar("POST", "/api/v1/planificacion/areas", "{\"codigo\":\"DEPORTES\",\"nombre\":\"Otra\"}", "ADMIN").andExpect(status().isConflict());
        enviar("POST", "/api/v1/planificacion/areas", "{\"codigo\":\"con espacios\",\"nombre\":\"Mal\"}", "ADMIN").andExpect(status().isBadRequest());
        enviar("POST", "/api/v1/planificacion/areas", "{\"codigo\":\"X\",\"nombre\":\"Sin permiso\"}", "SECRETARIA").andExpect(status().isForbidden());

        enviar("PUT", "/api/v1/planificacion/areas/" + id, "{\"nombre\":\"Deportes y recreación\",\"descripcion\":\"\"}", "ADMIN")
                .andExpect(status().isOk()).andExpect(jsonPath("$.nombre").value("Deportes y recreación")).andExpect(jsonPath("$.codigo").value("DEPORTES"));

        // un área inactiva sale de la lista normal pero se ve al pedir todas
        enviar("PATCH", "/api/v1/planificacion/areas/" + id + "/activo?activo=false", null, "ADMIN").andExpect(status().isOk()).andExpect(jsonPath("$.activo").value(false));
        mvc.perform(get("/api/v1/planificacion/areas").with(usuario("ADMIN"))).andExpect(jsonPath("$.length()").value(14));
        mvc.perform(get("/api/v1/planificacion/areas?todas=true").with(usuario("ADMIN"))).andExpect(jsonPath("$.length()").value(15));
        enviar("PATCH", "/api/v1/planificacion/areas/" + id + "/activo?activo=true", null, "ADMIN").andExpect(jsonPath("$.activo").value(true));
        jdbc.update("delete from areas where id = ?", id);
    }

    @Test
    @Order(6)
    void areas_docenciaNoSeDesactiva_yUnAreaConPersonalActivoTampoco() throws Exception {
        Long docencia = jdbc.queryForObject("select id from areas where codigo = 'DOCENCIA'", Long.class);
        enviar("PATCH", "/api/v1/planificacion/areas/" + docencia + "/activo?activo=false", null, "ADMIN")
                .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("Docencia")));

        Long seguridad = jdbc.queryForObject("select id from areas where codigo = 'SEGURIDAD'", Long.class);
        Long persona = jdbc.queryForObject("insert into docentes (tipo_documento, numero_documento, nombres, apellidos, estado, area_id) values ('DNI', '47000123', 'Vigilante', 'Prueba', 'ACTIVO', ?) returning id", Long.class, seguridad);
        try {
            enviar("PATCH", "/api/v1/planificacion/areas/" + seguridad + "/activo?activo=false", null, "ADMIN")
                    .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("1 persona")));
        } finally {
            jdbc.update("delete from docentes where id = ?", persona);
        }
        enviar("PATCH", "/api/v1/planificacion/areas/999999/activo?activo=false", null, "ADMIN").andExpect(status().isNotFound());
    }

    // ---------------------------------------------------------------- pabellones y aulas
    @Test
    @Order(8)
    void pabellones_loNombraElUsuario_yNoDejanRegistrarMasAulasDeLasDeclaradas() throws Exception {
        String body = enviar("POST", "/api/v1/planificacion/pabellones", "{\"nombre\":\"Central\",\"cantidadAulas\":2}", "ADMIN")
                .andExpect(status().isCreated()).andExpect(jsonPath("$.nombre").value("Central"))
                .andExpect(jsonPath("$.cantidadAulas").value(2)).andExpect(jsonPath("$.aulasRegistradas").value(0)).andReturn().getResponse().getContentAsString();
        long pabellon = ((Number) JsonPath.read(body, "$.id")).longValue();
        java.util.List<Long> aulasCreadas = new java.util.ArrayList<>();
        try {
            // el nombre no se repite, ni cambiando mayúsculas
            enviar("POST", "/api/v1/planificacion/pabellones", "{\"nombre\":\"CENTRAL\",\"cantidadAulas\":1}", "ADMIN").andExpect(status().isConflict());
            enviar("POST", "/api/v1/planificacion/pabellones", "{\"nombre\":\"\",\"cantidadAulas\":1}", "ADMIN").andExpect(status().isBadRequest());
            enviar("POST", "/api/v1/planificacion/pabellones", "{\"nombre\":\"Malo\",\"cantidadAulas\":-1}", "ADMIN").andExpect(status().isBadRequest());
            enviar("POST", "/api/v1/planificacion/pabellones", "{\"nombre\":\"Sin permiso\",\"cantidadAulas\":1}", "SECRETARIA").andExpect(status().isForbidden());

            for (int n = 1; n <= 2; n++) {
                String aula = enviar("POST", "/api/v1/planificacion/aulas",
                        "{\"codigo\":\"PABT-" + n + "\",\"nombre\":\"Aula " + n + "\",\"capacidad\":30,\"pabellonId\":" + pabellon + "}", "ADMIN")
                        .andExpect(status().isCreated()).andExpect(jsonPath("$.pabellonNombre").value("Central")).andReturn().getResponse().getContentAsString();
                aulasCreadas.add(((Number) JsonPath.read(aula, "$.id")).longValue());
            }
            // el pabellón declara 2 aulas: la tercera no entra
            enviar("POST", "/api/v1/planificacion/aulas", "{\"codigo\":\"PABT-3\",\"nombre\":\"Aula 3\",\"capacidad\":30,\"pabellonId\":" + pabellon + "}", "ADMIN")
                    .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("declara 2 aulas")));
            // un aula sin pabellón sigue siendo válida
            String suelta = enviar("POST", "/api/v1/planificacion/aulas", "{\"codigo\":\"PABT-S\",\"nombre\":\"Suelta\",\"capacidad\":30}", "ADMIN")
                    .andExpect(status().isCreated()).andExpect(jsonPath("$.pabellonId").doesNotExist()).andReturn().getResponse().getContentAsString();
            aulasCreadas.add(((Number) JsonPath.read(suelta, "$.id")).longValue());
            // editar un aula que ya está en el pabellón no cuenta como una más
            enviar("PUT", "/api/v1/planificacion/aulas/" + aulasCreadas.get(0),
                    "{\"codigo\":\"PABT-1\",\"nombre\":\"Aula uno\",\"capacidad\":28,\"pabellonId\":" + pabellon + "}", "ADMIN").andExpect(status().isOk());
            // inexistente
            enviar("POST", "/api/v1/planificacion/aulas", "{\"codigo\":\"PABT-X\",\"nombre\":\"X\",\"capacidad\":30,\"pabellonId\":999999}", "ADMIN").andExpect(status().isNotFound());

            mvc.perform(get("/api/v1/planificacion/pabellones").with(usuario("SECRETARIA")))
                    .andExpect(status().isOk()).andExpect(jsonPath("$[?(@.nombre == 'Central')].aulasRegistradas", hasItem(2)));

            // no se puede declarar menos aulas de las ya registradas, ni eliminar un pabellón con aulas
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon, "{\"nombre\":\"Central\",\"cantidadAulas\":1}", "ADMIN")
                    .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("2 aulas registradas")));
            mvc.perform(delete("/api/v1/planificacion/pabellones/" + pabellon).with(usuario("ADMIN"))).andExpect(status().isConflict());
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon, "{\"nombre\":\"Central\",\"cantidadAulas\":5}", "ADMIN")
                    .andExpect(status().isOk()).andExpect(jsonPath("$.cantidadAulas").value(5));
        } finally {
            for (Long id : aulasCreadas) jdbc.update("delete from aulas where id = ?", id);
        }
        // sin aulas, ya se puede eliminar
        mvc.perform(delete("/api/v1/planificacion/pabellones/" + pabellon).with(usuario("ADMIN"))).andExpect(status().isNoContent());
        mvc.perform(delete("/api/v1/planificacion/pabellones/" + pabellon).with(usuario("ADMIN"))).andExpect(status().isNotFound());
    }

    @Test
    @Order(9)
    void pabellones_lasAulasDeclaradasSePuedenCrearDeVerdad_sinRepetirCodigosNiPasarse() throws Exception {
        String body = enviar("POST", "/api/v1/planificacion/pabellones", "{\"nombre\":\"Gen\",\"cantidadAulas\":3}", "ADMIN")
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        long pabellon = ((Number) JsonPath.read(body, "$.id")).longValue();
        // un código que ya existe: el generador debe saltarlo
        jdbc.update("insert into aulas (codigo, nombre, tipo, capacidad, activo) values ('GEN-02', 'Ya existía', 'AULA', 30, true)");
        try {
            enviar("POST", "/api/v1/planificacion/pabellones/" + pabellon + "/aulas", "{\"capacidad\":28}", "ADMIN")
                    .andExpect(status().isOk()).andExpect(jsonPath("$.aulasRegistradas").value(3)).andExpect(jsonPath("$.cantidadAulas").value(3));
            org.assertj.core.api.Assertions.assertThat(jdbc.queryForList("select codigo from aulas where pabellon_id = ? order by codigo", String.class, pabellon))
                    .containsExactly("GEN-01", "GEN-03", "GEN-04");
            org.assertj.core.api.Assertions.assertThat(jdbc.queryForObject("select min(capacidad) from aulas where pabellon_id = ?", Integer.class, pabellon)).isEqualTo(28);

            // repetirlo no crea más: ya están todas las declaradas
            enviar("POST", "/api/v1/planificacion/pabellones/" + pabellon + "/aulas", null, "ADMIN").andExpect(status().isOk()).andExpect(jsonPath("$.aulasRegistradas").value(3));
            org.assertj.core.api.Assertions.assertThat(jdbc.queryForObject("select count(*) from aulas where pabellon_id = ?", Integer.class, pabellon)).isEqualTo(3);

            // si se sube la cantidad, se crean solo las que faltan, con la capacidad por defecto
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon, "{\"nombre\":\"Gen\",\"cantidadAulas\":4}", "ADMIN").andExpect(status().isOk());
            enviar("POST", "/api/v1/planificacion/pabellones/" + pabellon + "/aulas", null, "ADMIN").andExpect(jsonPath("$.aulasRegistradas").value(4));
            org.assertj.core.api.Assertions.assertThat(jdbc.queryForObject("select capacidad from aulas where codigo = 'GEN-05'", Integer.class)).isEqualTo(30);

            enviar("POST", "/api/v1/planificacion/pabellones/" + pabellon + "/aulas", "{\"capacidad\":0}", "ADMIN").andExpect(status().isBadRequest());
            enviar("POST", "/api/v1/planificacion/pabellones/" + pabellon + "/aulas", null, "SECRETARIA").andExpect(status().isForbidden());
            enviar("POST", "/api/v1/planificacion/pabellones/999999/aulas", null, "ADMIN").andExpect(status().isNotFound());
        } finally {
            jdbc.update("delete from aulas where codigo like 'GEN-%'");
            jdbc.update("delete from pabellones where id = ?", pabellon);
        }
    }

    @Test
    @Order(10)
    void pabellones_fijarLaCapacidadDeSusAulas_todoONada_yRespetandoLasSeccionesQueLasUsan() throws Exception {
        String body = enviar("POST", "/api/v1/planificacion/pabellones", "{\"nombre\":\"Cap\",\"cantidadAulas\":3}", "ADMIN").andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        long pabellon = ((Number) JsonPath.read(body, "$.id")).longValue();
        enviar("POST", "/api/v1/planificacion/pabellones/" + pabellon + "/aulas", "{\"capacidad\":30}", "ADMIN").andExpect(status().isOk());
        java.util.List<Long> aulas = jdbc.queryForList("select id from aulas where pabellon_id = ? order by codigo", Long.class, pabellon);
        Long anio = jdbc.queryForObject("insert into anios_academicos (nombre, fecha_inicio, fecha_fin, estado) values ('CAP-T', '2090-01-01', '2090-12-31', 'PLANIFICADO') returning id", Long.class);
        Long grado = jdbc.queryForObject("select min(id) from grados", Long.class);
        // una sección activa con 30 vacantes usa la primera aula
        jdbc.update("insert into secciones (anio_academico_id, grado_id, aula_id, nombre, turno, capacidad, activo) values (?, ?, ?, 'Z', 'MANANA', 30, true)", anio, grado, aulas.get(0));
        Long ajena = jdbc.queryForObject("insert into aulas (codigo, nombre, tipo, capacidad, activo) values ('CAPX-1', 'Ajena', 'AULA', 30, true) returning id", Long.class);
        try {
            String todas35 = "{\"aulas\":[" + aulas.stream().map(id -> "{\"aulaId\":" + id + ",\"capacidad\":35}").collect(java.util.stream.Collectors.joining(",")) + "]}";
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon + "/capacidades", todas35, "ADMIN")
                    .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(3)).andExpect(jsonPath("$[0].capacidad").value(35));
            mvc.perform(get("/api/v1/planificacion/pabellones").with(usuario("SECRETARIA")))
                    .andExpect(jsonPath("$[?(@.nombre == 'Cap')].capacidadAlumnos", hasItem(105)));

            // bajar el aula que usa una sección de 30 vacantes a 25 se rechaza, y no se cambia ninguna aula (todo o nada)
            String mezcla = "{\"aulas\":[{\"aulaId\":" + aulas.get(1) + ",\"capacidad\":20},{\"aulaId\":" + aulas.get(0) + ",\"capacidad\":25}]}";
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon + "/capacidades", mezcla, "ADMIN")
                    .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("«Z»")));
            org.assertj.core.api.Assertions.assertThat(jdbc.queryForObject("select capacidad from aulas where id = ?", Integer.class, aulas.get(1))).isEqualTo(35);
            // sí se puede bajar a 30 (justo las vacantes de la sección) y otras aulas sin sección a lo que se quiera
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon + "/capacidades",
                    "{\"aulas\":[{\"aulaId\":" + aulas.get(0) + ",\"capacidad\":30},{\"aulaId\":" + aulas.get(2) + ",\"capacidad\":15}]}", "ADMIN").andExpect(status().isOk());

            // un aula que no es del pabellón, datos inválidos, permisos y pabellón inexistente
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon + "/capacidades", "{\"aulas\":[{\"aulaId\":" + ajena + ",\"capacidad\":30}]}", "ADMIN")
                    .andExpect(status().isConflict()).andExpect(jsonPath("$.mensaje", containsString("no pertenece")));
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon + "/capacidades", "{\"aulas\":[{\"aulaId\":" + aulas.get(0) + ",\"capacidad\":0}]}", "ADMIN").andExpect(status().isBadRequest());
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon + "/capacidades", "{\"aulas\":[]}", "ADMIN").andExpect(status().isBadRequest());
            enviar("PUT", "/api/v1/planificacion/pabellones/" + pabellon + "/capacidades", todas35, "SECRETARIA").andExpect(status().isForbidden());
            enviar("PUT", "/api/v1/planificacion/pabellones/999999/capacidades", todas35, "ADMIN").andExpect(status().isNotFound());
        } finally {
            jdbc.update("delete from secciones where anio_academico_id = ?", anio);
            jdbc.update("delete from anios_academicos where id = ?", anio);
            jdbc.update("delete from aulas where codigo like 'CAP%'");
            jdbc.update("delete from pabellones where id = ?", pabellon);
        }
    }

    // ---------------------------------------------------------------- datos del colegio
    @Test
    @Order(7)
    void colegio_seConsultaConSesion_yElAdministradorLoEdita() throws Exception {
        mvc.perform(get("/api/v1/planificacion/colegio").with(usuario("SECRETARIA")))
                .andExpect(status().isOk()).andExpect(jsonPath("$.nombre").value("Colegio Horizonte del Valle")).andExpect(jsonPath("$.gestion").value("PRIVADA"));
        mvc.perform(get("/api/v1/planificacion/colegio")).andExpect(status().isUnauthorized());

        String datos = "{\"nombre\":\"Colegio Horizonte del Valle\",\"nombreCorto\":\"Horizonte\",\"lema\":\"Aprender para el mundo\",\"codigoModular\":\"0123456\","
                + "\"ruc\":\"20123456789\",\"gestion\":\"PRIVADA\",\"director\":\"Ana Torres\",\"telefono\":\"01 555 0100\",\"email\":\"info@horizonte.edu.pe\"}";
        enviar("PUT", "/api/v1/planificacion/colegio", datos, "ADMIN").andExpect(status().isOk())
                .andExpect(jsonPath("$.lema").value("Aprender para el mundo")).andExpect(jsonPath("$.director").value("Ana Torres"));
        mvc.perform(get("/api/v1/planificacion/colegio").with(usuario("ADMIN"))).andExpect(jsonPath("$.ruc").value("20123456789"));

        enviar("PUT", "/api/v1/planificacion/colegio", datos, "SECRETARIA").andExpect(status().isForbidden());
        enviar("PUT", "/api/v1/planificacion/colegio", datos.replace("20123456789", "123"), "ADMIN").andExpect(status().isBadRequest());
        enviar("PUT", "/api/v1/planificacion/colegio", datos.replace("info@horizonte.edu.pe", "no-es-correo"), "ADMIN").andExpect(status().isBadRequest());
        enviar("PUT", "/api/v1/planificacion/colegio", datos.replace("\"nombre\":\"Colegio Horizonte del Valle\"", "\"nombre\":\"\""), "ADMIN").andExpect(status().isBadRequest());
        // solo existe una fila: la institución
        org.assertj.core.api.Assertions.assertThat(jdbc.queryForObject("select count(*) from colegio", Integer.class)).isEqualTo(1);
    }
}
