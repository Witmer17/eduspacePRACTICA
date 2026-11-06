package pe.edu.upeu.eduspace.pago;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import pe.edu.upeu.eduspace.pago.dto.DescuentoRequest;
import pe.edu.upeu.eduspace.pago.entity.Descuento;
import pe.edu.upeu.eduspace.pago.entity.DescuentoAlumno;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.DescuentoAlumnoRepository;
import pe.edu.upeu.eduspace.pago.repository.DescuentoRepository;
import pe.edu.upeu.eduspace.pago.service.DescuentoService;

/** Códigos de descuento: se guardan en mayúsculas, no se repiten y se asignan a un alumno una sola vez (la matrícula en línea puede reintentar). */
class DescuentoCodigoServiceTest {

    private DescuentoRepository descuentos;
    private DescuentoAlumnoRepository asignados;
    private DescuentoService service;

    @BeforeEach
    void preparar() {
        descuentos = mock(DescuentoRepository.class);
        asignados = mock(DescuentoAlumnoRepository.class);
        service = new DescuentoService(descuentos, asignados);
        when(descuentos.save(any(Descuento.class))).thenAnswer(i -> i.getArgument(0));
    }

    private static DescuentoRequest pedido(String codigo) {
        DescuentoRequest r = new DescuentoRequest();
        r.setNombre("Hermanos");
        r.setTipo("PORCENTAJE");
        r.setValor(new BigDecimal("10"));
        r.setAplicaA("TODO");
        r.setCodigo(codigo);
        return r;
    }

    private static Descuento descuento(Long id, String codigo) {
        return Descuento.builder().id(id).nombre("Hermanos").tipo("PORCENTAJE").valor(new BigDecimal("10")).aplicaA("TODO").activo(true).codigo(codigo).build();
    }

    @Test
    void elCodigoSeGuardaEnMayusculasYSinEspacios() {
        when(descuentos.findByCodigoIgnoreCase("HERMANOS10")).thenReturn(Optional.empty());
        assertEquals("HERMANOS10", service.crear(pedido("  hermanos10 ")).getCodigo());
    }

    @Test
    void sinCodigoOConCodigoVacioQuedaSinCodigo() {
        assertNull(service.crear(pedido(null)).getCodigo());
        assertNull(service.crear(pedido("   ")).getCodigo());
        verify(descuentos, never()).findByCodigoIgnoreCase(any());
    }

    @Test
    void unCodigoRepetidoSeRechazaConUnMensajeClaro() {
        when(descuentos.findByCodigoIgnoreCase("HERMANOS10")).thenReturn(Optional.of(descuento(7L, "HERMANOS10")));
        BusinessRuleException e = assertThrows(BusinessRuleException.class, () -> service.crear(pedido("hermanos10")));
        assertTrue(e.getMessage().contains("Ya existe un descuento con el código HERMANOS10"));
    }

    @Test
    void alEditarUnDescuentoSuPropioCodigoNoCuentaComoRepetido() {
        Descuento actual = descuento(7L, "HERMANOS10");
        when(descuentos.findById(7L)).thenReturn(Optional.of(actual));
        when(descuentos.findByCodigoIgnoreCase("HERMANOS10")).thenReturn(Optional.of(actual));
        assertEquals("HERMANOS10", service.actualizar(7L, pedido("Hermanos10")).getCodigo());
    }

    @Test
    void alEditarNoSePuedeTomarElCodigoDeOtroDescuento() {
        when(descuentos.findById(8L)).thenReturn(Optional.of(descuento(8L, null)));
        when(descuentos.findByCodigoIgnoreCase("HERMANOS10")).thenReturn(Optional.of(descuento(7L, "HERMANOS10")));
        assertThrows(BusinessRuleException.class, () -> service.actualizar(8L, pedido("HERMANOS10")));
    }

    @Test
    void buscarPorCodigoSoloEncuentraDescuentosActivos() {
        when(descuentos.findByCodigoIgnoreCaseAndActivoTrue("HERMANOS10")).thenReturn(Optional.of(descuento(7L, "HERMANOS10")));
        assertEquals("Hermanos", service.buscarPorCodigo(" HERMANOS10 ").getNombre());
        when(descuentos.findByCodigoIgnoreCaseAndActivoTrue("VIEJO")).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> service.buscarPorCodigo("VIEJO"));
        assertThrows(ResourceNotFoundException.class, () -> service.buscarPorCodigo(null));
    }

    @Test
    void asignarPorCodigoGuardaLaAsignacionAlAlumnoParaElAnio() {
        Descuento d = descuento(7L, "HERMANOS10");
        when(descuentos.findByCodigoIgnoreCaseAndActivoTrue("HERMANOS10")).thenReturn(Optional.of(d));
        when(asignados.findByAlumnoIdAndDescuentoIdAndAnioId(50L, 7L, 1L)).thenReturn(Optional.empty());

        service.asignarPorCodigo("hermanos10".toUpperCase(), 50L, 1L, null);

        ArgumentCaptor<DescuentoAlumno> c = ArgumentCaptor.forClass(DescuentoAlumno.class);
        verify(asignados).save(c.capture());
        assertEquals(50L, c.getValue().getAlumnoId());
        assertEquals(1L, c.getValue().getAnioId());
        assertEquals(d, c.getValue().getDescuento());
        assertTrue(Boolean.TRUE.equals(c.getValue().getVigente()));
        assertTrue(c.getValue().getMotivo().contains("HERMANOS10"));
    }

    @Test
    void asignarPorCodigoEsIdempotenteParaQueUnReintentoNoFalle() {
        when(descuentos.findByCodigoIgnoreCaseAndActivoTrue("HERMANOS10")).thenReturn(Optional.of(descuento(7L, "HERMANOS10")));
        when(asignados.findByAlumnoIdAndDescuentoIdAndAnioId(50L, 7L, 1L)).thenReturn(Optional.of(new DescuentoAlumno()));
        service.asignarPorCodigo("HERMANOS10", 50L, 1L, null);
        verify(asignados, never()).save(any());
    }

    @Test
    void asignarUnCodigoQueNoExisteNoAsignaNada() {
        when(descuentos.findByCodigoIgnoreCaseAndActivoTrue("NADA")).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> service.asignarPorCodigo("NADA", 50L, 1L, null));
        verify(asignados, never()).save(any());
    }
}
