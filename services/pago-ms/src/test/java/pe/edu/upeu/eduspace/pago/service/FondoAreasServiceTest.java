package pe.edu.upeu.eduspace.pago.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.Resumen;
import pe.edu.upeu.eduspace.pago.entity.AsignacionArea;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.repository.AsignacionAreaRepository;
import pe.edu.upeu.eduspace.pago.repository.FondoCajaRepository;
import pe.edu.upeu.eduspace.pago.repository.PagoRepository;

/** Reglas del reparto de caja entre áreas (sin base de datos: los repositorios son simulados). */
class FondoAreasServiceTest {

    private PagoRepository pagos;
    private AsignacionAreaRepository asignaciones;
    private FondoCajaRepository fondo;
    private FondoAreasService service;

    private static BigDecimal s(String n) {
        return new BigDecimal(n);
    }

    @BeforeEach
    void preparar() {
        pagos = mock(PagoRepository.class);
        asignaciones = mock(AsignacionAreaRepository.class);
        fondo = mock(FondoCajaRepository.class);
        service = new FondoAreasService(pagos, asignaciones, fondo);
        when(asignaciones.totalesPorArea()).thenReturn(Collections.emptyList());
    }

    /** Se cobraron {@code cobrado}; ya hay {@code asignadoTotal} repartido, de los cuales {@code delArea} es del área 7. */
    private void escenario(String cobrado, String asignadoTotal, String delArea) {
        when(pagos.totalCobrado()).thenReturn(s(cobrado));
        when(asignaciones.totalAsignado()).thenReturn(s(asignadoTotal));
        when(asignaciones.totalDelArea(7L)).thenReturn(s(delArea));
    }

    @Test
    void elDisponibleEsLoCobradoMenosLoAsignado() {
        escenario("10000.00", "3500.00", "0");
        Resumen r = service.resumen();
        assertEquals(0, r.totalCobrado().compareTo(s("10000")));
        assertEquals(0, r.totalAsignado().compareTo(s("3500")));
        assertEquals(0, r.disponible().compareTo(s("6500")));
    }

    @Test
    void asignarSacaDeCajaLaDiferencia() {
        escenario("10000.00", "3500.00", "1000.00");
        service.fijarAsignacion(7L, s("2500"), "Útiles del trimestre", 1L);

        ArgumentCaptor<AsignacionArea> c = ArgumentCaptor.forClass(AsignacionArea.class);
        verify(asignaciones).save(c.capture());
        assertEquals(0, c.getValue().getMonto().compareTo(s("1500")));       // 2500 - 1000 sale de caja
        assertEquals(0, c.getValue().getSaldoArea().compareTo(s("2500")));
        assertEquals("Útiles del trimestre", c.getValue().getMotivo());
        assertEquals(7L, c.getValue().getAreaId());
        verify(fondo).bloquear();
    }

    @Test
    void bajarLaAsignacionDevuelveDineroACaja() {
        escenario("10000.00", "3500.00", "1000.00");
        service.fijarAsignacion(7L, s("400"), "  ", 1L);

        ArgumentCaptor<AsignacionArea> c = ArgumentCaptor.forClass(AsignacionArea.class);
        verify(asignaciones).save(c.capture());
        assertEquals(0, c.getValue().getMonto().compareTo(s("-600")));       // vuelven 600
        assertEquals(0, c.getValue().getSaldoArea().compareTo(s("400")));
        assertEquals(null, c.getValue().getMotivo());                        // motivo en blanco se guarda vacío
    }

    @Test
    void dejarloEnCeroDevuelveTodo() {
        escenario("10000.00", "3500.00", "1000.00");
        service.fijarAsignacion(7L, BigDecimal.ZERO, null, 1L);
        ArgumentCaptor<AsignacionArea> c = ArgumentCaptor.forClass(AsignacionArea.class);
        verify(asignaciones).save(c.capture());
        assertEquals(0, c.getValue().getMonto().compareTo(s("-1000")));
    }

    @Test
    void noSePuedeAsignarMasDeLoQueHayEnCaja() {
        escenario("10000.00", "9000.00", "500.00");   // disponible: 1000
        BusinessRuleException e = assertThrows(BusinessRuleException.class, () -> service.fijarAsignacion(7L, s("2000"), null, 1L)); // pide 1500 más
        assertTrue(e.getMessage().contains("No hay suficiente dinero en caja"), e.getMessage());
        assertTrue(e.getMessage().contains("1000.00"), e.getMessage());
        verify(asignaciones, never()).save(any());
    }

    @Test
    void sePuedeAsignarJustoTodoLoDisponible() {
        escenario("10000.00", "9000.00", "500.00");   // disponible: 1000
        service.fijarAsignacion(7L, s("1500"), null, 1L);                // pide justo 1000 más
        verify(asignaciones).save(any());
    }

    @Test
    void sinCambioNoSeRegistraNada() {
        escenario("10000.00", "3500.00", "1000.00");
        service.fijarAsignacion(7L, s("1000.00"), "igual", 1L);
        verify(asignaciones, never()).save(any());
    }

    @Test
    void reducirSiempreSePuedeAunqueLaCajaEsteEnNegativo() {
        escenario("1000.00", "3000.00", "2000.00");   // se anularon pagos: disponible -2000
        service.fijarAsignacion(7L, s("1500"), null, 1L);
        verify(asignaciones).save(any());
    }

    @Test
    void rechazaMontosNegativosYAreasInvalidas() {
        escenario("10000.00", "0", "0");
        assertThrows(BusinessRuleException.class, () -> service.fijarAsignacion(7L, s("-1"), null, 1L));
        assertThrows(BusinessRuleException.class, () -> service.fijarAsignacion(null, s("10"), null, 1L));
        assertThrows(BusinessRuleException.class, () -> service.fijarAsignacion(0L, s("10"), null, 1L));
        verify(asignaciones, never()).save(any());
    }

    // ---------- Reparto de varias áreas a la vez ----------

    private static pe.edu.upeu.eduspace.pago.dto.FondoDtos.AreaMonto am(long area, String monto) {
        return new pe.edu.upeu.eduspace.pago.dto.FondoDtos.AreaMonto(area, s(monto));
    }

    /** Cobrado, asignado total y lo que ya tiene cada una de las áreas 1, 2 y 3. */
    private void escenarioVarias(String cobrado, String asignadoTotal, String a1, String a2, String a3) {
        when(pagos.totalCobrado()).thenReturn(s(cobrado));
        when(asignaciones.totalAsignado()).thenReturn(s(asignadoTotal));
        when(asignaciones.totalDelArea(1L)).thenReturn(s(a1));
        when(asignaciones.totalDelArea(2L)).thenReturn(s(a2));
        when(asignaciones.totalDelArea(3L)).thenReturn(s(a3));
    }

    @SuppressWarnings("unchecked")
    private List<AsignacionArea> guardados() {
        ArgumentCaptor<List<AsignacionArea>> c = ArgumentCaptor.forClass(List.class);
        verify(asignaciones).saveAll(c.capture());
        return c.getValue();
    }

    @Test
    void variasAreasSeGuardanJuntasYSoloLasQueCambian() {
        escenarioVarias("10000", "1000", "500", "300", "200");               // disponible 9000
        service.fijarVarias(List.of(am(1, "800"), am(2, "300"), am(3, "0")), "Reparto de noviembre", 1L);

        List<AsignacionArea> g = guardados();
        assertEquals(2, g.size());                                          // el área 2 no cambió
        assertEquals(0, g.get(0).getMonto().compareTo(s("300")));            // área 1: +300
        assertEquals(0, g.get(1).getMonto().compareTo(s("-200")));           // área 3: vuelven 200
        assertEquals("Reparto de noviembre", g.get(0).getMotivo());
        assertEquals(0, g.get(1).getSaldoArea().compareTo(s("0")));
    }

    @Test
    void loQueBajanUnasPagaLoQueSubenOtras() {
        escenarioVarias("1000", "1000", "600", "400", "0");                  // caja en 0
        // 1 baja 300 y 3 sube 300: el neto es 0, se puede aunque no haya dinero libre
        service.fijarVarias(List.of(am(1, "300"), am(3, "300")), null, 1L);
        assertEquals(2, guardados().size());
    }

    @Test
    void siElNetoPasaDeLoDisponibleNoSeGuardaNingunaAunqueOtrasSiPudieran() {
        escenarioVarias("10000", "9000", "0", "0", "0");                     // disponible 1000
        BusinessRuleException e = assertThrows(BusinessRuleException.class,
                () -> service.fijarVarias(List.of(am(1, "400"), am(2, "400"), am(3, "400")), null, 1L)); // pide 1200
        assertTrue(e.getMessage().contains("No hay suficiente dinero en caja"), e.getMessage());
        assertTrue(e.getMessage().contains("1000.00") && e.getMessage().contains("1200.00"), e.getMessage());
        verify(asignaciones, never()).saveAll(any());
        verify(asignaciones, never()).save(any());
    }

    @Test
    void sePuedeRepartirJustoTodoLoDisponible() {
        escenarioVarias("10000", "9000", "0", "0", "0");                     // disponible 1000
        service.fijarVarias(List.of(am(1, "500"), am(2, "250"), am(3, "250")), null, 1L);
        assertEquals(3, guardados().size());
    }

    @Test
    void sinCambiosNoSeGuardaNada() {
        escenarioVarias("10000", "1000", "500", "300", "200");
        service.fijarVarias(List.of(am(1, "500"), am(2, "300"), am(3, "200")), "igual", 1L);
        verify(asignaciones, never()).saveAll(any());
    }

    @Test
    void variasRechazaListasVaciasRepetidasYNegativos() {
        escenarioVarias("10000", "0", "0", "0", "0");
        assertThrows(BusinessRuleException.class, () -> service.fijarVarias(List.of(), null, 1L));
        assertThrows(BusinessRuleException.class, () -> service.fijarVarias(null, null, 1L));
        assertThrows(BusinessRuleException.class, () -> service.fijarVarias(List.of(am(1, "10"), am(1, "20")), null, 1L));
        assertThrows(BusinessRuleException.class, () -> service.fijarVarias(List.of(am(1, "-5")), null, 1L));
        assertThrows(BusinessRuleException.class, () -> service.fijarVarias(List.of(am(0, "5")), null, 1L));
        verify(asignaciones, never()).saveAll(any());
    }

    @Test
    void elResumenListaLasAreasConDinero() {
        escenario("5000.00", "1200.00", "0");
        List<Object[]> filas = List.of(new Object[]{9L, s("200")}, new Object[]{3L, s("1000")});
        when(asignaciones.totalesPorArea()).thenReturn(filas);
        Resumen r = service.resumen();
        assertEquals(List.of(3L, 9L), r.areas().stream().map(a -> a.areaId()).toList()); // ordenadas por área
        assertEquals(0, r.areas().get(0).asignado().compareTo(s("1000")));
    }
}
