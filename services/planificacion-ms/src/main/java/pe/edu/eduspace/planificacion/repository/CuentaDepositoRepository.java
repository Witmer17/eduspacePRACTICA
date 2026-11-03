package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.CuentaDeposito;

public interface CuentaDepositoRepository extends JpaRepository<CuentaDeposito, Long> {
    /** Las cuentas activas de una persona: la principal primero. */
    List<CuentaDeposito> findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(Long personalId);

    /** Las cuentas activas de todo el personal (para mostrar a cuál se deposita en la planilla). */
    List<CuentaDeposito> findByActivoTrueOrderByPersonalIdAscPrincipalDescIdAsc();

    boolean existsByPersonalIdAndBancoAndNumeroAndActivoTrue(Long personalId, String banco, String numero);

    boolean existsByPersonalIdAndBancoAndNumeroAndActivoTrueAndIdNot(Long personalId, String banco, String numero, Long id);
}
