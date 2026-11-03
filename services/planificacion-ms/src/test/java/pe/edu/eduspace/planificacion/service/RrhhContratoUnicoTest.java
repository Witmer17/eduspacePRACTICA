package pe.edu.eduspace.planificacion.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RenovarRequest;
import pe.edu.eduspace.planificacion.entity.ContratoPersonal;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.repository.AsistenciaPersonalRepository;
import pe.edu.eduspace.planificacion.repository.ContratoPersonalRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;
import pe.edu.eduspace.planificacion.repository.PagoPersonalRepository;

/** Cada persona tiene un solo contrato a la vez: si ya tiene uno, solo se renueva. Las personas distintas no se afectan entre sí. */
class RrhhContratoUnicoTest {

    private ContratoPersonalRepository contratos;
    private DocenteRepository personal;
    private RrhhService service;
    private final LocalDate hoy = LocalDate.now();

    @BeforeEach
    void preparar() {
        contratos = mock(ContratoPersonalRepository.class);
        personal = mock(DocenteRepository.class);
        service = new RrhhService(contratos, mock(PagoPersonalRepository.class), personal, mock(AsistenciaPersonalRepository.class));
        when(contratos.save(any())).thenAnswer(i -> i.getArgument(0));
    }

    private Docente persona(long id, String nombres, String apellidos) {
        Docente d = new Docente();
        d.setId(id);
        d.setNombres(nombres);
        d.setApellidos(apellidos);
        d.setEstado(EstadoDocente.ACTIVO);
        d.setCargo("Docente");
        when(personal.findById(id)).thenReturn(Optional.of(d));
        return d;
    }

    private ContratoPersonal contrato(long id, Docente p, LocalDate inicio, LocalDate fin) {
        ContratoPersonal c = new ContratoPersonal();
        c.setId(id);
        c.setPersonal(p);
        c.setTipo(fin == null ? "INDEFINIDO" : "PLAZO_FIJO");
        c.setCargo("Docente de aula");
        c.setFechaInicio(inicio);
        c.setFechaFin(fin);
        c.setRemuneracion(new BigDecimal("1500.00"));
        return c;
    }

    private ContratoRequest pedido(long personaId, LocalDate inicio, LocalDate fin) {
        return new ContratoRequest(personaId, "PLAZO_FIJO", null, inicio, fin, new BigDecimal("1800"), null);
    }

    // ---------- Un contrato por persona ----------

    @Test
    void siYaTieneUnContratoVigenteNoSeCreaOtroYSeSugiereRenovar() {
        Docente ana = persona(1, "Ana", "Pérez");
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(contrato(10, ana, hoy.minusMonths(1), hoy.plusMonths(6))));
        BusinessRuleException e = assertThrows(BusinessRuleException.class, () -> service.crearContrato(pedido(1, hoy.plusYears(2), hoy.plusYears(3))));
        assertTrue(e.getMessage().contains("ya tiene un contrato vigente"), e.getMessage());
        assertTrue(e.getMessage().contains("Renovar contrato"), e.getMessage());
        verify(contratos, never()).save(any());
    }

    @Test
    void tampocoSiYaTieneUnoPorIniciar() {
        Docente ana = persona(1, "Ana", "Pérez");
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(contrato(10, ana, hoy.plusMonths(1), hoy.plusMonths(8))));
        BusinessRuleException e = assertThrows(BusinessRuleException.class, () -> service.crearContrato(pedido(1, hoy.minusYears(1), hoy.minusMonths(6))));
        assertTrue(e.getMessage().contains("por iniciar"), e.getMessage());
    }

    @Test
    void unIndefinidoVigenteTambienImpideOtro() {
        Docente ana = persona(1, "Ana", "Pérez");
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(contrato(10, ana, hoy.minusYears(2), null)));
        assertThrows(BusinessRuleException.class, () -> service.crearContrato(pedido(1, hoy, hoy.plusMonths(3))));
    }

    @Test
    void siSuUnicoContratoYaVencioSePuedeCrearUnoNuevo() {
        Docente ana = persona(1, "Ana", "Pérez");
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(contrato(10, ana, hoy.minusYears(1), hoy.minusMonths(2))));
        service.crearContrato(pedido(1, hoy, hoy.plusMonths(6)));
        verify(contratos).save(any());
    }

    @Test
    void siSuContratoFueRescindidoSePuedeCrearUnoNuevo() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal viejo = contrato(10, ana, hoy.minusMonths(2), hoy.plusMonths(6));
        viejo.setEstado(ContratoPersonal.RESCINDIDO);
        viejo.setFechaRescision(hoy.minusDays(5));
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(viejo));
        service.crearContrato(pedido(1, hoy, hoy.plusMonths(6)));
        verify(contratos).save(any());
    }

    @Test
    void otraPersonaPuedeTenerExactamenteElMismoPeriodo() {
        Docente ana = persona(1, "Ana", "Pérez");
        persona(2, "Beto", "Ruiz");
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(contrato(10, ana, hoy, hoy.plusMonths(6))));
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(2L)).thenReturn(List.of());   // Beto no tiene contratos
        service.crearContrato(pedido(2, hoy, hoy.plusMonths(6)));                           // mismo inicio y mismo fin que Ana
        verify(contratos).save(any());
    }

    // ---------- Renovar ----------

    @Test
    void renovarEmpiezaElDiaSiguienteAlFinDelAnteriorYHeredaSueldoYCargo() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal anterior = contrato(10, ana, LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(contratos.findById(10L)).thenReturn(Optional.of(anterior));
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(anterior));

        service.renovar(10L, new RenovarRequest(null, null, LocalDate.of(2027, 12, 31), null, "Renovación anual"));

        ArgumentCaptor<ContratoPersonal> c = ArgumentCaptor.forClass(ContratoPersonal.class);
        verify(contratos).save(c.capture());
        assertEquals(LocalDate.of(2027, 1, 1), c.getValue().getFechaInicio());
        assertEquals(LocalDate.of(2027, 12, 31), c.getValue().getFechaFin());
        assertEquals(0, c.getValue().getRemuneracion().compareTo(new BigDecimal("1500")));   // hereda el sueldo
        assertEquals("Docente de aula", c.getValue().getCargo());                            // hereda el cargo
        assertEquals("PLAZO_FIJO", c.getValue().getTipo());
        assertEquals("Renovación anual", c.getValue().getObservaciones());
    }

    @Test
    void renovarPermiteCambiarElSueldoYPasarAIndefinido() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal anterior = contrato(10, ana, LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(contratos.findById(10L)).thenReturn(Optional.of(anterior));
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(anterior));

        service.renovar(10L, new RenovarRequest("INDEFINIDO", "Coordinadora", null, new BigDecimal("2200"), null));

        ArgumentCaptor<ContratoPersonal> c = ArgumentCaptor.forClass(ContratoPersonal.class);
        verify(contratos).save(c.capture());
        assertEquals("INDEFINIDO", c.getValue().getTipo());
        assertEquals(null, c.getValue().getFechaFin());
        assertEquals(0, c.getValue().getRemuneracion().compareTo(new BigDecimal("2200")));
        assertEquals("Coordinadora", c.getValue().getCargo());
    }

    @Test
    void unContratoIndefinidoNoSeRenueva() {
        Docente ana = persona(1, "Ana", "Pérez");
        when(contratos.findById(10L)).thenReturn(Optional.of(contrato(10, ana, hoy.minusYears(1), null)));
        BusinessRuleException e = assertThrows(BusinessRuleException.class, () -> service.renovar(10L, new RenovarRequest(null, null, hoy.plusYears(1), null, null)));
        assertTrue(e.getMessage().contains("indefinido"), e.getMessage());
    }

    @Test
    void unContratoRescindidoNoSeRenueva() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal c = contrato(10, ana, hoy.minusMonths(3), hoy.plusMonths(3));
        c.setEstado(ContratoPersonal.RESCINDIDO);
        when(contratos.findById(10L)).thenReturn(Optional.of(c));
        assertThrows(BusinessRuleException.class, () -> service.renovar(10L, new RenovarRequest(null, null, hoy.plusYears(1), null, null)));
    }

    @Test
    void soloSeRenuevaElUltimoContratoNoUnoQueYaFueRenovado() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal primero = contrato(10, ana, LocalDate.of(2025, 1, 1), LocalDate.of(2025, 12, 31));
        ContratoPersonal segundo = contrato(11, ana, LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(contratos.findById(10L)).thenReturn(Optional.of(primero));
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(segundo, primero));
        BusinessRuleException e = assertThrows(BusinessRuleException.class, () -> service.renovar(10L, new RenovarRequest(null, null, LocalDate.of(2027, 12, 31), null, null)));
        assertTrue(e.getMessage().contains("ya fue renovado"), e.getMessage());
        verify(contratos, never()).save(any());
    }

    @Test
    void laNuevaFechaDeFinNoPuedeSerAnteriorAlInicioDeLaRenovacion() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal anterior = contrato(10, ana, LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(contratos.findById(10L)).thenReturn(Optional.of(anterior));
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(anterior));
        assertThrows(BusinessRuleException.class, () -> service.renovar(10L, new RenovarRequest(null, null, LocalDate.of(2026, 12, 31), null, null)));
        verify(contratos, never()).save(any());
    }

    @Test
    void unPlazoFijoRenovadoSinFechaDeFinSeRechaza() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal anterior = contrato(10, ana, LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(contratos.findById(10L)).thenReturn(Optional.of(anterior));
        when(contratos.findByPersonalIdOrderByFechaInicioDesc(1L)).thenReturn(List.of(anterior));
        assertThrows(BusinessRuleException.class, () -> service.renovar(10L, new RenovarRequest(null, null, null, null, null)));
    }

    // ---------- Planilla: un solo sueldo por persona y mes, aunque se cruce una renovación ----------

    private PagoPersonalRepository pagosRepo;

    private RrhhService servicioConPagos() {
        pagosRepo = mock(PagoPersonalRepository.class);
        return new RrhhService(contratos, pagosRepo, personal, mock(AsistenciaPersonalRepository.class));
    }

    private ContratoPersonal conSueldo(long id, Docente p, String inicio, String fin, String sueldo) {
        ContratoPersonal c = contrato(id, p, LocalDate.parse(inicio), fin == null ? null : LocalDate.parse(fin));
        c.setRemuneracion(new BigDecimal(sueldo));
        return c;
    }

    @Test
    void enElMesDeLaRenovacionSePagaUnSoloSueldoElDelContratoQueCubreMasDias() {
        var svc = servicioConPagos();
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal viejo = conSueldo(10, ana, "2026-01-01", "2026-12-10", "1500");   // 10 días de diciembre
        ContratoPersonal nuevo = conSueldo(11, ana, "2026-12-11", "2027-12-31", "1800");   // 21 días de diciembre
        when(contratos.findByEstado(ContratoPersonal.VIGENTE)).thenReturn(List.of(viejo, nuevo));

        var r = svc.generarPlanilla("2026-12");

        assertEquals(1, r.creados());
        ArgumentCaptor<pe.edu.eduspace.planificacion.entity.PagoPersonal> c = ArgumentCaptor.forClass(pe.edu.eduspace.planificacion.entity.PagoPersonal.class);
        verify(pagosRepo).save(c.capture());                                              // UN solo pago
        assertEquals(0, c.getValue().getMonto().compareTo(new BigDecimal("1800")));       // el del contrato que cubre más días
    }

    @Test
    void sielViejoCubreMasDiasGanaElViejo() {
        var svc = servicioConPagos();
        Docente ana = persona(1, "Ana", "Pérez");
        when(contratos.findByEstado(ContratoPersonal.VIGENTE)).thenReturn(List.of(
                conSueldo(10, ana, "2026-01-01", "2026-12-20", "1500"), conSueldo(11, ana, "2026-12-21", "2027-12-31", "1800")));
        svc.generarPlanilla("2026-12");
        ArgumentCaptor<pe.edu.eduspace.planificacion.entity.PagoPersonal> c = ArgumentCaptor.forClass(pe.edu.eduspace.planificacion.entity.PagoPersonal.class);
        verify(pagosRepo).save(c.capture());
        assertEquals(0, c.getValue().getMonto().compareTo(new BigDecimal("1500")));       // 20 días contra 11
    }

    @Test
    void siEmpatanEnDiasGanaElMasReciente() {
        var svc = servicioConPagos();
        Docente ana = persona(1, "Ana", "Pérez");
        // Abril tiene 30 días: 15 del viejo y 15 del nuevo
        when(contratos.findByEstado(ContratoPersonal.VIGENTE)).thenReturn(List.of(
                conSueldo(10, ana, "2026-01-01", "2026-04-15", "1500"), conSueldo(11, ana, "2026-04-16", "2027-04-15", "1800")));
        svc.generarPlanilla("2026-04");
        ArgumentCaptor<pe.edu.eduspace.planificacion.entity.PagoPersonal> c = ArgumentCaptor.forClass(pe.edu.eduspace.planificacion.entity.PagoPersonal.class);
        verify(pagosRepo).save(c.capture());
        assertEquals(0, c.getValue().getMonto().compareTo(new BigDecimal("1800")));
    }

    @Test
    void siLaPersonaYaTieneSuSueldoDelMesNoSeGeneraOtroDeCualquierContrato() {
        var svc = servicioConPagos();
        Docente ana = persona(1, "Ana", "Pérez");
        when(contratos.findByEstado(ContratoPersonal.VIGENTE)).thenReturn(List.of(
                conSueldo(10, ana, "2026-01-01", "2026-12-10", "1500"), conSueldo(11, ana, "2026-12-11", "2027-12-31", "1800")));
        when(pagosRepo.existsByPersonalIdAndPeriodoAndConcepto(1L, "2026-12", "SUELDO")).thenReturn(true);
        var r = svc.generarPlanilla("2026-12");
        assertEquals(0, r.creados());
        assertEquals(1, r.yaExistian());
        verify(pagosRepo, never()).save(any());
    }

    @Test
    void cadaPersonaTieneSuPropioSueldoYLosContratosFueraDelMesNoCuentan() {
        var svc = servicioConPagos();
        Docente ana = persona(1, "Ana", "Pérez");
        Docente beto = persona(2, "Beto", "Ruiz");
        when(contratos.findByEstado(ContratoPersonal.VIGENTE)).thenReturn(List.of(
                conSueldo(10, ana, "2026-01-01", "2026-12-31", "1500"),
                conSueldo(11, beto, "2026-01-01", "2026-12-31", "1500"),                 // mismo periodo que Ana: cada una cobra lo suyo
                conSueldo(12, ana, "2027-01-01", "2027-12-31", "2000")));                // futuro: no cuenta en diciembre
        var r = svc.generarPlanilla("2026-12");
        assertEquals(2, r.creados());
    }

    // ---------- Rescindir un contrato que aún no empezó (cancelar una renovación) ----------

    @Test
    void unContratoPorIniciarSeCancelaRescindiendoloElDiaAnteriorASuInicio() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal futuro = contrato(10, ana, hoy.plusMonths(2), hoy.plusMonths(14));
        when(contratos.findById(10L)).thenReturn(Optional.of(futuro));

        var r = service.rescindir(10L, new pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest(null, "Renovación por error"));

        assertEquals(ContratoPersonal.RESCINDIDO, futuro.getEstado());
        assertEquals(futuro.getFechaInicio().minusDays(1), futuro.getFechaRescision());   // sin fecha: rescindido el día anterior a su inicio, sin llegar a regir
        assertEquals("RESCINDIDO", r.estadoEfectivo());
        assertEquals(futuro.getFechaInicio().minusDays(1), futuro.finEfectivo());        // su fin efectivo es anterior al inicio: cero días de vigencia
    }

    @Test
    void unaFechaDeRescisionExplicitaAnteriorAlInicioSigueSiendoUnError() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal futuro = contrato(10, ana, hoy.plusMonths(2), hoy.plusMonths(14));
        when(contratos.findById(10L)).thenReturn(Optional.of(futuro));
        assertThrows(BusinessRuleException.class,
                () -> service.rescindir(10L, new pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest(hoy, "x")));
    }

    @Test
    void unContratoRescindidoSuPrimerDiaSiRigioEseDia() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal c = contrato(10, ana, hoy, hoy.plusMonths(3));          // empieza hoy
        when(contratos.findById(10L)).thenReturn(Optional.of(c));
        service.rescindir(10L, new pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest(null, "se fue"));
        assertEquals(hoy, c.getFechaRescision());                                // no es una cancelación: rigió ese día
        assertEquals(hoy, c.finEfectivo());
    }

    @Test
    void unContratoVigenteSigueRescindiendoseHoy() {
        Docente ana = persona(1, "Ana", "Pérez");
        ContratoPersonal vigente = contrato(10, ana, hoy.minusMonths(2), hoy.plusMonths(4));
        when(contratos.findById(10L)).thenReturn(Optional.of(vigente));
        service.rescindir(10L, new pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest(null, null));
        assertEquals(hoy, vigente.getFechaRescision());
    }

    @Test
    void aUnaPersonaDadaDeBajaNoSeLeRenueva() {
        Docente ana = persona(1, "Ana", "Pérez");
        ana.setEstado(EstadoDocente.INACTIVO);
        when(contratos.findById(10L)).thenReturn(Optional.of(contrato(10, ana, hoy.minusMonths(6), hoy.plusMonths(1))));
        assertThrows(BusinessRuleException.class, () -> service.renovar(10L, new RenovarRequest(null, null, hoy.plusYears(1), null, null)));
    }
}
