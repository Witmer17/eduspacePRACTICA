package pe.edu.upeu.eduspace.pago;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import io.minio.MinioClient;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import pe.edu.upeu.eduspace.pago.client.AlumnosGateway;
import pe.edu.upeu.eduspace.pago.client.PlanificacionClient;
import pe.edu.upeu.eduspace.pago.dto.AbrirCajaRequest;
import pe.edu.upeu.eduspace.pago.dto.AnularPagoRequest;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Resultado;
import pe.edu.upeu.eduspace.pago.dto.TarifaRequest;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.messaging.MatriculaEventConsumer;
import pe.edu.upeu.eduspace.pago.scheduler.CreditoJob;
import pe.edu.upeu.eduspace.pago.service.AnulacionService;
import pe.edu.upeu.eduspace.pago.service.CajaService;
import pe.edu.upeu.eduspace.pago.service.CreditoService;
import pe.edu.upeu.eduspace.pago.service.TarifaService;

/**
 * Crédito del alumno: cada depósito suma; cuando una pensión vence se cobra sola del crédito (de la más antigua a la más reciente);
 * si falta, la cuota queda con lo que falte; si sobra, el resto sigue como crédito.
 */
@AutoConfigureMockMvc
class CreditoIntegrationTest extends PostgresIntegrationTestBase {

    @Autowired MatriculaEventConsumer consumer;
    @Autowired CreditoService creditos;
    @Autowired CreditoJob creditoJob;
    @Autowired CajaService cajas;
    @Autowired AnulacionService anulaciones;
    @Autowired TarifaService tarifas;
    @Autowired JdbcTemplate jdbc;
    @Autowired MockMvc mvc;

    @MockitoBean PlanificacionClient planificacionClient;
    @MockitoBean AlumnosGateway alumnosGateway;
    @MockitoBean MinioClient minio;
    @MockitoBean KafkaTemplate<String, String> kafka;

    static final long ANIO = 1, NIVEL = 1, GRADO = 3, ALUMNO = 1, CAJERO = 20, ADMIN = 1;
    static final LocalDate AYER = LocalDate.now().minusDays(1), HOY = LocalDate.now(), MANANA = LocalDate.now().plusDays(1);

    @BeforeEach
    void preparar() {
        jdbc.execute("TRUNCATE alertas_admin, comprobantes, pago_detalle, pagos, cajas_sesion, descuentos_alumno, descuentos, cuotas, tarifas, matriculas_local, "
            + "outbox_eventos, eventos_procesados, movimientos_credito, creditos_alumno RESTART IDENTITY CASCADE");
        jdbc.update("update series_comprobante set ultimo_numero = 0");
        reset(planificacionClient, alumnosGateway, minio, kafka);
        when(planificacionClient.getAnio(ANIO)).thenReturn(new PlanificacionClient.AnioInterno(ANIO, "2026",
            LocalDate.of(2026, 3, 1), LocalDate.of(2026, 12, 20), "ACTIVO"));
        when(kafka.send(anyString(), anyString(), anyString())).thenReturn(CompletableFuture.completedFuture(null));
    }

    // ------------------------------------------------------------------ ayudas

    long concepto(String codigo) {
        return jdbc.queryForObject("select id from conceptos_pago where codigo = ?", Long.class, codigo);
    }

    void tarifa(String codigo, String monto, int cuotas) {
        TarifaRequest r = new TarifaRequest();
        r.setAnioId(ANIO); r.setNivelId(NIVEL); r.setGradoId(GRADO); r.setConceptoId(concepto(codigo));
        r.setMonto(new BigDecimal(monto)); r.setNumCuotas((short) cuotas); r.setMesInicio((short) 3); r.setDiaVencimiento((short) 5);
        tarifas.crear(r);
    }

    String evento(String tipo) {
        return """
            {"eventId":"%s","eventType":"%s","occurredAt":"2026-02-01T10:00:00","version":1,"traceId":"t",
             "matriculaId":1,"alumnoId":%d,"alumnoNombre":"Alumno 1","anioId":%d,"nivelId":%d,"gradoId":%d,"seccionId":10,
             "estado":"PRE_MATRICULA","tipo":"NUEVA","responsablePagoUsuarioId":700,"responsablePagoNombre":"Papá"}
            """.formatted(UUID.randomUUID(), tipo, ALUMNO, ANIO, NIVEL, GRADO);
    }

    /** Matrícula con pensión de 900 en 3 cuotas de 300; las fechas de vencimiento se fijan a mano para controlar qué toca cobrar. */
    List<Long> pensiones(LocalDate v1, LocalDate v2, LocalDate v3) {
        tarifa("PENSION", "900.00", 3);
        consumer.procesarEventoMatricula(evento("matricula.creada"));
        consumer.procesarEventoMatricula(evento("matricula.confirmada"));
        List<Long> ids = jdbc.queryForList("select c.id from cuotas c join conceptos_pago p on p.id = c.concepto_id where p.tipo = 'PENSION' order by c.numero_cuota", Long.class);
        assertThat(ids).hasSize(3);
        LocalDate[] fechas = {v1, v2, v3};
        for (int i = 0; i < 3; i++) jdbc.update("update cuotas set fecha_vencimiento = ? where id = ?", fechas[i], ids.get(i));
        return ids;
    }

    BigDecimal saldoCuota(long id) { return jdbc.queryForObject("select saldo from cuotas where id = ?", BigDecimal.class, id); }
    String estadoCuota(long id) { return jdbc.queryForObject("select estado from cuotas where id = ?", String.class, id); }
    BigDecimal credito() { return creditos.saldoDe(ALUMNO); }

    void abrirCaja() {
        AbrirCajaRequest r = new AbrirCajaRequest();
        r.setMontoApertura(new BigDecimal("100"));
        cajas.abrirCaja(CAJERO, r);
    }

    JwtRequestPostProcessor usuario(long id, String rol) {
        return jwt().jwt(j -> j.claim("usuarioId", id).claim("realm_access", Map.of("roles", List.of(rol)))).authorities(new SimpleGrantedAuthority("ROLE_" + rol));
    }

    // ------------------------------------------------------------------ el depósito suma al crédito

    @Test
    void cadaDepositoSumaAlCredito_yNoCobraNadaSiNingunaPensionVence() {
        pensiones(MANANA, MANANA.plusMonths(1), MANANA.plusMonths(2));
        Resultado r = creditos.depositar(ALUMNO, new BigDecimal("200"), "TRANSFERENCIA", "OP-1", null, ADMIN);
        assertThat(r.saldo()).isEqualByComparingTo("200.00");
        assertThat(r.aplicado()).isEqualByComparingTo("0");
        creditos.depositar(ALUMNO, new BigDecimal("50.50"), "YAPE_PLIN", null, null, ADMIN);
        assertThat(credito()).isEqualByComparingTo("250.50");
        // ninguna cuota se tocó, y no hay pago con crédito
        assertThat(jdbc.queryForObject("select count(*) from pagos", Integer.class)).isZero();
        assertThat(jdbc.queryForObject("select count(*) from movimientos_credito where tipo = 'DEPOSITO'", Integer.class)).isEqualTo(2);
    }

    // ------------------------------------------------------------------ cobro automático

    @Test
    void alVencerLaPension_seCobraDelCredito_dejandoLaDeudaQueFalte() {
        List<Long> q = pensiones(AYER, HOY, MANANA);
        // 500 de crédito: paga la vencida (300) y cubre 200 de la de hoy; la de mañana no se toca
        Resultado r = creditos.depositar(ALUMNO, new BigDecimal("500"), "TRANSFERENCIA", null, null, ADMIN);
        assertThat(r.aplicado()).isEqualByComparingTo("500.00");
        assertThat(r.cuotaIds()).containsExactly(q.get(0), q.get(1));
        assertThat(credito()).isEqualByComparingTo("0.00");
        assertThat(estadoCuota(q.get(0))).isEqualTo("PAGADA");
        assertThat(saldoCuota(q.get(0))).isEqualByComparingTo("0.00");
        assertThat(estadoCuota(q.get(1))).isEqualTo("PARCIAL");
        assertThat(saldoCuota(q.get(1))).isEqualByComparingTo("100.00");     // la deuda que falta
        assertThat(estadoCuota(q.get(2))).isEqualTo("PENDIENTE");
        assertThat(saldoCuota(q.get(2))).isEqualByComparingTo("300.00");

        // un solo pago con medio CREDITO, sin caja, con una línea por cuota
        Map<String, Object> pago = jdbc.queryForMap("select medio, monto_total, caja_sesion_id, estado from pagos");
        assertThat(pago.get("medio")).isEqualTo("CREDITO");
        assertThat((BigDecimal) pago.get("monto_total")).isEqualByComparingTo("500.00");
        assertThat(pago.get("caja_sesion_id")).isNull();
        assertThat(jdbc.queryForObject("select count(*) from pago_detalle", Integer.class)).isEqualTo(2);
        // el libro cuadra: depósito +500, cobros -300 y -200, saldo final 0
        List<Map<String, Object>> libro = jdbc.queryForList("select tipo, monto, saldo_despues from movimientos_credito order by id");
        assertThat(libro).extracting(m -> m.get("tipo")).containsExactly("DEPOSITO", "COBRO_CUOTA", "COBRO_CUOTA");
        assertThat((BigDecimal) libro.get(2).get("saldo_despues")).isEqualByComparingTo("0.00");
        // avisa como cualquier pago confirmado
        assertThat(jdbc.queryForObject("select count(*) from outbox_eventos where topic = 'pago.confirmado'", Integer.class)).isEqualTo(1);
    }

    @Test
    void siSobra_elRestoSigueComoCredito_yLaPensionFuturaSeCobraSolaCuandoVence() {
        List<Long> q = pensiones(AYER, MANANA, MANANA.plusMonths(1));
        creditos.depositar(ALUMNO, new BigDecimal("1000"), "TRANSFERENCIA", null, null, ADMIN);
        assertThat(estadoCuota(q.get(0))).isEqualTo("PAGADA");
        assertThat(estadoCuota(q.get(1))).isEqualTo("PENDIENTE");               // aún no vence: no se cobra por adelantado
        assertThat(credito()).isEqualByComparingTo("700.00");                   // lo que sobra queda como crédito

        // llega el día de la siguiente pensión: el cobro automático la paga sola
        assertThat(creditoJob.ejecutar(MANANA)).isEqualTo(1);
        assertThat(estadoCuota(q.get(1))).isEqualTo("PAGADA");
        assertThat(credito()).isEqualByComparingTo("400.00");
        // y si no hay nada por cobrar, el job no hace nada más
        assertThat(creditoJob.ejecutar(MANANA)).isZero();
        assertThat(credito()).isEqualByComparingTo("400.00");
    }

    @Test
    void conPocoCredito_laPensionQuedaParcial_yUnDepositoPosteriorCubreLoQueFalta() {
        List<Long> q = pensiones(AYER, MANANA, MANANA.plusMonths(1));
        creditos.depositar(ALUMNO, new BigDecimal("120"), "TRANSFERENCIA", null, null, ADMIN);
        assertThat(estadoCuota(q.get(0))).isEqualTo("PARCIAL");
        assertThat(saldoCuota(q.get(0))).isEqualByComparingTo("180.00");
        assertThat(credito()).isEqualByComparingTo("0.00");
        // otro depósito de 200: paga los 180 que faltan y 20 quedan como crédito
        creditos.depositar(ALUMNO, new BigDecimal("200"), "TRANSFERENCIA", null, null, ADMIN);
        assertThat(estadoCuota(q.get(0))).isEqualTo("PAGADA");
        assertThat(credito()).isEqualByComparingTo("20.00");
    }

    @Test
    void elCobroAutomaticoSoloTocaPensiones_laMatriculaNoSeCobraDelCredito() {
        tarifa("MATRICULA", "350.00", 1);
        consumer.procesarEventoMatricula(evento("matricula.creada"));
        long matricula = jdbc.queryForObject("select c.id from cuotas c join conceptos_pago p on p.id = c.concepto_id where p.tipo = 'MATRICULA'", Long.class);
        jdbc.update("update cuotas set fecha_vencimiento = ? where id = ?", AYER, matricula);
        creditos.depositar(ALUMNO, new BigDecimal("500"), "TRANSFERENCIA", null, null, ADMIN);
        assertThat(estadoCuota(matricula)).isEqualTo("PENDIENTE");
        assertThat(credito()).isEqualByComparingTo("500.00");
    }

    @Test
    void elCobroManualYLaConsultaDicenLoQueFaltaYLoQueSobra() {
        List<Long> q = pensiones(AYER, HOY, MANANA);
        // primero el crédito entra sin que nada venza (se simula moviendo las fechas después)
        jdbc.update("update cuotas set fecha_vencimiento = ? where id in (?, ?)", MANANA, q.get(0), q.get(1));
        creditos.depositar(ALUMNO, new BigDecimal("450"), "TRANSFERENCIA", null, null, ADMIN);
        jdbc.update("update cuotas set fecha_vencimiento = ? where id = ?", AYER, q.get(0));
        jdbc.update("update cuotas set fecha_vencimiento = ? where id = ?", HOY, q.get(1));
        var c = creditos.consultar(ALUMNO);
        assertThat(c.saldo()).isEqualByComparingTo("450.00");
        assertThat(c.exigible()).isEqualByComparingTo("600.00");
        assertThat(c.faltante()).isEqualByComparingTo("150.00");
        assertThat(c.sobrante()).isEqualByComparingTo("0.00");
        creditos.cobrarAhora(ALUMNO, ADMIN);
        assertThat(credito()).isEqualByComparingTo("0.00");
        assertThat(saldoCuota(q.get(1))).isEqualByComparingTo("150.00");
    }

    // ------------------------------------------------------------------ caja

    @Test
    void elEfectivoExigeCajaAbierta_yElDepositoEntraAlCierreDeCaja() {
        pensiones(MANANA, MANANA.plusMonths(1), MANANA.plusMonths(2));
        assertThatThrownBy(() -> creditos.depositar(ALUMNO, new BigDecimal("100"), "EFECTIVO", null, null, CAJERO))
            .isInstanceOf(BusinessRuleException.class).hasMessageContaining("caja ABIERTA");
        abrirCaja();
        creditos.depositar(ALUMNO, new BigDecimal("100"), "EFECTIVO", null, null, CAJERO);
        creditos.depositar(ALUMNO, new BigDecimal("40"), "YAPE_PLIN", null, null, CAJERO);
        var cierre = cajas.reporteCaja(jdbc.queryForObject("select id from cajas_sesion", Long.class));
        assertThat(cierre.getDepositosCredito()).isEqualByComparingTo("140.00");
        assertThat(cierre.getCobrosEfectivo()).isEqualByComparingTo("100.00");
        assertThat(cierre.getCobrosOtrosMedios()).isEqualByComparingTo("40.00");
        // el efectivo esperado al cerrar suma la apertura (100) y el efectivo del depósito (100)
        var cerrada = cajas.cerrarCaja(CAJERO, cierreRequest("200"));
        assertThat(cerrada.getEfectivoEsperado()).isEqualByComparingTo("200.00");
        assertThat(cerrada.getDiferencia()).isEqualByComparingTo("0.00");
    }

    pe.edu.upeu.eduspace.pago.dto.CerrarCajaRequest cierreRequest(String declarado) {
        var r = new pe.edu.upeu.eduspace.pago.dto.CerrarCajaRequest();
        r.setMontoCierreDeclarado(new BigDecimal(declarado));
        return r;
    }

    // ------------------------------------------------------------------ validaciones y anulaciones

    @Test
    void rechazaDepositosInvalidos() {
        assertThatThrownBy(() -> creditos.depositar(ALUMNO, BigDecimal.ZERO, "TRANSFERENCIA", null, null, ADMIN)).isInstanceOf(BusinessRuleException.class);
        assertThatThrownBy(() -> creditos.depositar(ALUMNO, new BigDecimal("-5"), "TRANSFERENCIA", null, null, ADMIN)).isInstanceOf(BusinessRuleException.class);
        assertThatThrownBy(() -> creditos.depositar(ALUMNO, new BigDecimal("60000"), "TRANSFERENCIA", null, null, ADMIN)).hasMessageContaining("50000");
        assertThatThrownBy(() -> creditos.depositar(ALUMNO, new BigDecimal("10"), "CREDITO", null, null, ADMIN)).hasMessageContaining("medio");
        assertThatThrownBy(() -> creditos.depositar(ALUMNO, new BigDecimal("10"), "ONLINE_SIMULADO", null, null, ADMIN)).hasMessageContaining("medio");
        assertThat(credito()).isEqualByComparingTo("0");
    }

    @Test
    void elMismoDepositoReintentadoConLaMismaClaveNoSumaDosVeces() {
        creditos.depositar(ALUMNO, new BigDecimal("100"), "TRANSFERENCIA", null, "dep-1", ADMIN);
        creditos.depositar(ALUMNO, new BigDecimal("100"), "TRANSFERENCIA", null, "dep-1", ADMIN);
        assertThat(credito()).isEqualByComparingTo("100.00");
    }

    @Test
    void anularUnPagoHechoConCredito_devuelveLoCobradoAlCreditoYReabreLaCuota() {
        List<Long> q = pensiones(AYER, MANANA, MANANA.plusMonths(1));
        creditos.depositar(ALUMNO, new BigDecimal("300"), "TRANSFERENCIA", null, null, ADMIN);
        assertThat(estadoCuota(q.get(0))).isEqualTo("PAGADA");
        long pago = jdbc.queryForObject("select id from pagos", Long.class);
        AnularPagoRequest req = new AnularPagoRequest();
        req.setMotivo("Error de cobro");
        anulaciones.anularPago(pago, req, ADMIN);
        assertThat(estadoCuota(q.get(0))).isEqualTo("PENDIENTE");
        assertThat(saldoCuota(q.get(0))).isEqualByComparingTo("300.00");
        assertThat(credito()).isEqualByComparingTo("300.00");
        assertThat(jdbc.queryForObject("select count(*) from movimientos_credito where tipo = 'REVERSION'", Integer.class)).isEqualTo(1);
    }

    @Test
    void anularUnDeposito_soloSiElCreditoTodaviaAlcanza() {
        pensiones(MANANA, MANANA.plusMonths(1), MANANA.plusMonths(2));
        creditos.depositar(ALUMNO, new BigDecimal("200"), "TRANSFERENCIA", null, null, ADMIN);
        long dep = jdbc.queryForObject("select id from movimientos_credito where tipo = 'DEPOSITO'", Long.class);
        creditos.anularDeposito(dep, "Se registró dos veces", ADMIN);
        assertThat(credito()).isEqualByComparingTo("0.00");
        assertThatThrownBy(() -> creditos.anularDeposito(dep, "otra vez", ADMIN)).hasMessageContaining("ya está anulado");

        // un depósito que ya se cobró de las cuotas no se puede anular sin anular antes esos cobros
        jdbc.update("update cuotas set fecha_vencimiento = ? where numero_cuota = 1", AYER);
        creditos.depositar(ALUMNO, new BigDecimal("300"), "TRANSFERENCIA", null, null, ADMIN);
        long dep2 = jdbc.queryForObject("select id from movimientos_credito where tipo = 'DEPOSITO' and not anulado", Long.class);
        assertThatThrownBy(() -> creditos.anularDeposito(dep2, "x", ADMIN)).hasMessageContaining("ya no alcanza");
    }

    // ------------------------------------------------------------------ seguridad

    @Test
    void soloCajaYAdministracionDepositan_laSecretariaSoloConsulta_ylaFamiliaNoVeElLibro() throws Exception {
        String cuerpo = "{\"monto\":100,\"medio\":\"TRANSFERENCIA\"}";
        mvc.perform(post("/api/v1/pagos/alumnos/1/credito/depositos").with(usuario(ADMIN, "ADMIN")).contentType(MediaType.APPLICATION_JSON).content(cuerpo))
            .andExpect(status().isCreated()).andExpect(jsonPath("$.saldo").value(100.0));
        mvc.perform(post("/api/v1/pagos/alumnos/1/credito/depositos").with(usuario(5, "SECRETARIA")).contentType(MediaType.APPLICATION_JSON).content(cuerpo))
            .andExpect(status().isForbidden());
        mvc.perform(post("/api/v1/pagos/alumnos/1/credito/depositos").with(usuario(5, "APODERADO")).contentType(MediaType.APPLICATION_JSON).content(cuerpo))
            .andExpect(status().isForbidden());
        mvc.perform(get("/api/v1/pagos/alumnos/1/credito").with(usuario(5, "SECRETARIA")))
            .andExpect(status().isOk()).andExpect(jsonPath("$.saldo").value(100.0)).andExpect(jsonPath("$.movimientos.length()").value(1));
        mvc.perform(get("/api/v1/pagos/alumnos/1/credito").with(usuario(5, "APODERADO"))).andExpect(status().isForbidden());
        // anular un depósito es del administrador
        long dep = jdbc.queryForObject("select id from movimientos_credito", Long.class);
        mvc.perform(post("/api/v1/pagos/creditos/movimientos/" + dep + "/anular").with(usuario(CAJERO, "CAJERO")).contentType(MediaType.APPLICATION_JSON).content("{\"motivo\":\"x\"}"))
            .andExpect(status().isForbidden());
        // validaciones del cuerpo: monto cero o medio vacío son 400
        mvc.perform(post("/api/v1/pagos/alumnos/1/credito/depositos").with(usuario(ADMIN, "ADMIN")).contentType(MediaType.APPLICATION_JSON).content("{\"monto\":0,\"medio\":\"TRANSFERENCIA\"}"))
            .andExpect(status().isBadRequest());
        // el estado de cuenta trae el crédito
        mvc.perform(get("/api/v1/pagos/alumnos/1/estado-cuenta").with(usuario(ADMIN, "ADMIN"))).andExpect(status().isOk()).andExpect(jsonPath("$.credito").value(100.0));
    }
}
