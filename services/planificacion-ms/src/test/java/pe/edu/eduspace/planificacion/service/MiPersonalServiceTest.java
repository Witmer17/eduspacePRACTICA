package pe.edu.eduspace.planificacion.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/** «Lo mío» del personal: la persona sale siempre de la cuenta de la sesión y una cuenta sin ficha no ve nada. */
class MiPersonalServiceTest {

    private DocenteRepository personal;
    private RrhhService rrhh;
    private CuentaDepositoService cuentas;
    private AsistenciaPersonalService asistencia;
    private MiPersonalService service;

    @BeforeEach
    void preparar() {
        personal = mock(DocenteRepository.class);
        rrhh = mock(RrhhService.class);
        cuentas = mock(CuentaDepositoService.class);
        asistencia = mock(AsistenciaPersonalService.class);
        service = new MiPersonalService(personal, mock(DocenteService.class), rrhh, cuentas, asistencia);
    }

    private void vincular(long usuarioId, long personalId) {
        Docente d = mock(Docente.class);
        when(d.getId()).thenReturn(personalId);
        when(personal.findByUsuarioId(usuarioId)).thenReturn(Optional.of(d));
    }

    @Test
    void contratosPagosCuentasYAsistenciaSonSiempreDeLaPersonaDeLaSesion() {
        vincular(7L, 42L);
        when(rrhh.contratos(42L)).thenReturn(List.of());
        when(rrhh.pagos(42L, "2026-11")).thenReturn(List.of());
        when(cuentas.listar(42L)).thenReturn(List.of());
        LocalDate desde = LocalDate.of(2026, 11, 1);
        LocalDate hasta = LocalDate.of(2026, 11, 30);
        when(asistencia.consultar(desde, hasta, 42L)).thenReturn(List.of());

        assertEquals(List.of(), service.contratos(7L));
        assertEquals(List.of(), service.pagos(7L, "2026-11"));
        assertEquals(List.of(), service.cuentas(7L));
        assertEquals(List.of(), service.asistencia(7L, desde, hasta));

        verify(rrhh).contratos(42L);
        verify(rrhh).pagos(42L, "2026-11");
        verify(cuentas).listar(42L);
        verify(asistencia).consultar(desde, hasta, 42L);
    }

    @Test
    void unaCuentaSinFichaNoVeNadaNiConsultaTodoElPersonal() {
        when(personal.findByUsuarioId(9L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> service.contratos(9L));
        assertThrows(ResourceNotFoundException.class, () -> service.pagos(9L, null));
        assertThrows(ResourceNotFoundException.class, () -> service.cuentas(9L));
        assertThrows(ResourceNotFoundException.class, () -> service.asistencia(9L, LocalDate.now(), LocalDate.now()));
        // sin ficha jamás se llega a pedir «todos» (personalId nulo devolvería los datos de todo el personal)
        verify(rrhh, never()).contratos(null);
        verify(cuentas, never()).listar(null);
    }

    @Test
    void unaSesionSinUsuarioIdTampocoVeNada() {
        assertThrows(ResourceNotFoundException.class, () -> service.contratos(null));
        assertThrows(ResourceNotFoundException.class, () -> service.ficha(null));
    }
}
