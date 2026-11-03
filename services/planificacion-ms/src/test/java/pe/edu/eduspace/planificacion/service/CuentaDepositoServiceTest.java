package pe.edu.eduspace.planificacion.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaRequest;
import pe.edu.eduspace.planificacion.entity.CuentaDeposito;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.repository.CuentaDepositoRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/** Cuentas para depósito: validación del número y del CCI, una sola principal y borrado lógico. */
class CuentaDepositoServiceTest {

    private CuentaDepositoRepository cuentas;
    private DocenteRepository personal;
    private CuentaDepositoService service;
    private Docente ana;
    /** Lo que «hay guardado» para Ana en cada prueba. */
    private final List<CuentaDeposito> deAna = new ArrayList<>();

    @BeforeEach
    void preparar() {
        cuentas = mock(CuentaDepositoRepository.class);
        personal = mock(DocenteRepository.class);
        service = new CuentaDepositoService(cuentas, personal);
        ana = new Docente();
        ana.setId(1L);
        ana.setNombres("Ana");
        ana.setApellidos("Pérez");
        ana.setEstado(EstadoDocente.ACTIVO);
        when(personal.findById(1L)).thenReturn(Optional.of(ana));
        when(cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(1L)).thenAnswer(i -> new ArrayList<>(deAna));
        when(cuentas.save(any())).thenAnswer(i -> i.getArgument(0));
    }

    private CuentaRequest bcp(String numero) {
        return new CuentaRequest(1L, "BCP", "AHORROS", numero, null, "Ana Pérez", null);
    }

    private CuentaDeposito existente(long id, String banco, String numero, boolean principal) {
        CuentaDeposito c = new CuentaDeposito();
        c.setId(id);
        c.setPersonal(ana);
        c.setBanco(banco);
        c.setTipo("AHORROS");
        c.setNumero(numero);
        c.setTitular("Ana Pérez");
        c.setPrincipal(principal);
        c.setActivo(true);
        deAna.add(c);
        when(cuentas.findById(id)).thenReturn(Optional.of(c));
        return c;
    }

    private CuentaDeposito guardada() {
        ArgumentCaptor<CuentaDeposito> c = ArgumentCaptor.forClass(CuentaDeposito.class);
        verify(cuentas).save(c.capture());
        return c.getValue();
    }

    @Test
    void laPrimeraCuentaEsLaPrincipal() {
        service.agregar(bcp("19412345678901"));
        assertTrue(guardada().isPrincipal());
    }

    @Test
    void laSegundaNoEsPrincipalSalvoQueSePida() {
        existente(5, "BBVA", "001100001234567890", true);
        service.agregar(bcp("19412345678901"));
        assertFalse(guardada().isPrincipal());
    }

    @Test
    void siSePideQueSeaPrincipalLaAnteriorDejaDeSerlo() {
        CuentaDeposito vieja = existente(5, "BBVA", "001100001234567890", true);
        service.agregar(new CuentaRequest(1L, "BCP", "AHORROS", "19412345678901", null, "Ana Pérez", true));
        assertTrue(guardada().isPrincipal());
        assertFalse(vieja.isPrincipal());
        verify(cuentas).saveAllAndFlush(any());   // la anterior se guarda ANTES para no chocar con el índice único de «una sola principal»
    }

    @Test
    void sinEspaciosNiGuiones() {
        service.agregar(new CuentaRequest(1L, "bcp", "AHORROS", "194-1234 5678-901", "002 194 0012 3456 7890 12".replace(" ", "").substring(0, 20), "Ana", null));
        CuentaDeposito c = guardada();
        assertEquals("BCP", c.getBanco());
        assertEquals("19412345678901", c.getNumero());
        assertEquals(20, c.getCci().length());
    }

    @Test
    void noSeRepiteLaMismaCuenta() {
        when(cuentas.existsByPersonalIdAndBancoAndNumeroAndActivoTrue(1L, "BCP", "19412345678901")).thenReturn(true);
        BusinessRuleException e = assertThrows(BusinessRuleException.class, () -> service.agregar(bcp("19412345678901")));
        assertTrue(e.getMessage().contains("ya tiene la cuenta"), e.getMessage());
        verify(cuentas, never()).save(any());
    }

    @Test
    void validaElNumeroElCciYElBanco() {
        assertThrows(BusinessRuleException.class, () -> service.agregar(bcp("1941234")));                 // 7 dígitos: corto
        assertThrows(BusinessRuleException.class, () -> service.agregar(bcp("123456789012345678901")));   // 21 dígitos: largo
        assertThrows(BusinessRuleException.class, () -> service.agregar(bcp("1941234abc5678")));          // letras
        assertThrows(BusinessRuleException.class, () -> service.agregar(new CuentaRequest(1L, "BCP", "AHORROS", "19412345678901", "1234567890123456789", "Ana", null))); // CCI de 19
        assertThrows(BusinessRuleException.class, () -> service.agregar(new CuentaRequest(1L, "BANCO_FANTASMA", "AHORROS", "19412345678901", null, "Ana", null)));
        verify(cuentas, never()).save(any());
    }

    @Test
    void yapeYPlinSonBilleterasConCelularDeNueveDigitosYSinCci() {
        service.agregar(new CuentaRequest(1L, "YAPE", "BILLETERA", "987654321", null, "Ana Pérez", null));
        assertEquals("987654321", guardada().getNumero());
        assertThrows(BusinessRuleException.class, () -> service.agregar(new CuentaRequest(1L, "PLIN", "BILLETERA", "98765432", null, "Ana", null)));          // 8 dígitos
        assertThrows(BusinessRuleException.class, () -> service.agregar(new CuentaRequest(1L, "YAPE", "AHORROS", "987654321", null, "Ana", null)));            // Yape no es de ahorros
        assertThrows(BusinessRuleException.class, () -> service.agregar(new CuentaRequest(1L, "BCP", "BILLETERA", "987654321", null, "Ana", null)));            // un banco no es billetera
        assertThrows(BusinessRuleException.class, () -> service.agregar(new CuentaRequest(1L, "YAPE", "BILLETERA", "987654322", "00219400123456789012", "Ana", null))); // billetera sin CCI
    }

    @Test
    void aUnaPersonaDadaDeBajaNoSeLeAgregaCuenta() {
        ana.setEstado(EstadoDocente.INACTIVO);
        assertThrows(BusinessRuleException.class, () -> service.agregar(bcp("19412345678901")));
    }

    @Test
    void hacerPrincipalQuitaLaPrincipalAnterior() {
        CuentaDeposito a = existente(5, "BBVA", "001100001234567890", true);
        CuentaDeposito b = existente(6, "BCP", "19412345678901", false);
        service.hacerPrincipal(6L);
        assertFalse(a.isPrincipal());
        assertTrue(b.isPrincipal());
    }

    @Test
    void quitarLaPrincipalPromueveALaMasAntiguaQueQueda() {
        CuentaDeposito a = existente(5, "BBVA", "001100001234567890", true);
        CuentaDeposito b = existente(6, "BCP", "19412345678901", false);
        CuentaDeposito c = existente(7, "INTERBANK", "8983000012345", false);
        // al quitar la 5, «las que quedan activas» son la 6 y la 7
        when(cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(1L)).thenAnswer(i -> deAna.stream().filter(CuentaDeposito::isActivo).toList());
        service.quitar(5L);
        assertFalse(a.isActivo());
        assertFalse(a.isPrincipal());
        assertTrue(b.isPrincipal());       // la más antigua de las que quedan
        assertFalse(c.isPrincipal());
    }

    @Test
    void unaCuentaQuitadaYaNoSePuedeEditarNiMarcar() {
        CuentaDeposito a = existente(5, "BBVA", "001100001234567890", true);
        a.setActivo(false);
        assertThrows(pe.edu.eduspace.planificacion.exception.ResourceNotFoundException.class, () -> service.hacerPrincipal(5L));
    }
}
