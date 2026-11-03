package pe.edu.eduspace.planificacion.service;

import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.entity.CuentaDeposito;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.CuentaDepositoRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/**
 * Cuentas donde se le deposita el pago a cada persona. Puede tener varias; una sola es la principal (la primera que se agrega lo es). Las que se
 * quitan se desactivan, no se borran.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class CuentaDepositoService {

    static final Set<String> BANCOS = Set.of("BCP", "BBVA", "INTERBANK", "SCOTIABANK", "BANCO_NACION", "BANBIF", "MIBANCO", "PICHINCHA",
            "CAJA_AREQUIPA", "CAJA_HUANCAYO", "CAJA_PIURA", "YAPE", "PLIN", "OTRO");

    private final CuentaDepositoRepository cuentas;
    private final DocenteRepository personal;

    @Transactional(readOnly = true)
    public List<CuentaResponse> listar(Long personalId) {
        var lista = personalId == null ? cuentas.findByActivoTrueOrderByPersonalIdAscPrincipalDescIdAsc()
                : cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(personalId);
        return lista.stream().map(CuentaResponse::de).toList();
    }

    public CuentaResponse agregar(CuentaRequest r) {
        Docente persona = personal.findById(r.personalId()).orElseThrow(() -> ResourceNotFoundException.of("Personal", r.personalId()));
        if (persona.getEstado() != EstadoDocente.ACTIVO) {
            throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le agregan cuentas");
        }
        CuentaDeposito c = new CuentaDeposito();
        c.setPersonal(persona);
        aplicar(c, r);
        if (cuentas.existsByPersonalIdAndBancoAndNumeroAndActivoTrue(persona.getId(), c.getBanco(), c.getNumero())) {
            throw new BusinessRuleException(persona.nombreCompleto() + " ya tiene la cuenta " + c.getBanco() + " " + c.getNumero());
        }
        var actuales = cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(persona.getId());
        // La primera cuenta es la principal; si se pide que esta lo sea, las demás dejan de serlo.
        boolean sera = actuales.isEmpty() || Boolean.TRUE.equals(r.principal());
        if (sera) quitarPrincipal(actuales);
        c.setPrincipal(sera);
        return CuentaResponse.de(cuentas.save(c));
    }

    public CuentaResponse actualizar(Long id, CuentaRequest r) {
        CuentaDeposito c = cuenta(id);
        if (!c.getPersonal().getId().equals(r.personalId())) {
            throw new BusinessRuleException("No se puede cambiar de persona una cuenta: agrégala a la otra persona");
        }
        aplicar(c, r);
        if (cuentas.existsByPersonalIdAndBancoAndNumeroAndActivoTrueAndIdNot(c.getPersonal().getId(), c.getBanco(), c.getNumero(), id)) {
            throw new BusinessRuleException(c.getPersonal().nombreCompleto() + " ya tiene la cuenta " + c.getBanco() + " " + c.getNumero());
        }
        return CuentaResponse.de(cuentas.save(c));
    }

    /** Pasa a ser la cuenta principal de su persona (la que era principal deja de serlo). */
    public CuentaResponse hacerPrincipal(Long id) {
        CuentaDeposito c = cuenta(id);
        quitarPrincipal(cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(c.getPersonal().getId()));
        c.setPrincipal(true);
        return CuentaResponse.de(cuentas.save(c));
    }

    /** Quita la cuenta (queda desactivada). Si era la principal, la más antigua de las que quedan pasa a serlo. */
    public void quitar(Long id) {
        CuentaDeposito c = cuenta(id);
        boolean eraPrincipal = c.isPrincipal();
        c.setActivo(false);
        c.setPrincipal(false);
        cuentas.saveAndFlush(c);
        if (eraPrincipal) {
            cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(c.getPersonal().getId()).stream()
                    .min(java.util.Comparator.comparing(CuentaDeposito::getId))
                    .ifPresent(otra -> { otra.setPrincipal(true); cuentas.save(otra); });
        }
    }

    private void aplicar(CuentaDeposito c, CuentaRequest r) {
        String banco = r.banco().trim().toUpperCase();
        if (!BANCOS.contains(banco)) throw new BusinessRuleException("Banco no reconocido: " + r.banco());
        String numero = r.numero().replaceAll("[\\s-]", "");
        String cci = r.cci() == null ? "" : r.cci().replaceAll("[\\s-]", "");
        boolean billetera = "BILLETERA".equals(r.tipo());
        if (billetera != ("YAPE".equals(banco) || "PLIN".equals(banco))) {
            throw new BusinessRuleException(billetera ? "Una billetera es Yape o Plin" : "Yape y Plin son billeteras: elige el tipo «Billetera»");
        }
        if (!numero.matches("\\d+")) throw new BusinessRuleException("El número de cuenta solo lleva dígitos");
        if (billetera) {
            if (numero.length() != 9) throw new BusinessRuleException("El celular de la billetera tiene 9 dígitos");
            if (!cci.isEmpty()) throw new BusinessRuleException("Una billetera no lleva CCI");
        } else {
            if (numero.length() < 8 || numero.length() > 20) throw new BusinessRuleException("El número de cuenta tiene entre 8 y 20 dígitos");
            if (!cci.isEmpty() && !cci.matches("\\d{20}")) throw new BusinessRuleException("El CCI tiene exactamente 20 dígitos");
        }
        c.setBanco(banco);
        c.setTipo(r.tipo());
        c.setNumero(numero);
        c.setCci(cci.isEmpty() ? null : cci);
        c.setTitular(r.titular().trim());
    }

    /** Deja sin principal a la persona. Se guarda al momento: el índice único de «una sola principal» exige que la anterior ya no lo sea. */
    private void quitarPrincipal(List<CuentaDeposito> actuales) {
        List<CuentaDeposito> principales = actuales.stream().filter(CuentaDeposito::isPrincipal).toList();
        principales.forEach(o -> o.setPrincipal(false));
        if (!principales.isEmpty()) cuentas.saveAllAndFlush(principales);
    }

    private CuentaDeposito cuenta(Long id) {
        return cuentas.findById(id).filter(CuentaDeposito::isActivo).orElseThrow(() -> ResourceNotFoundException.of("Cuenta", id));
    }
}
