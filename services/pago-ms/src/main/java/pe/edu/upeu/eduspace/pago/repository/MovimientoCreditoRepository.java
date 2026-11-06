package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.MovimientoCredito;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovimientoCreditoRepository extends JpaRepository<MovimientoCredito, Long> {

    List<MovimientoCredito> findByAlumnoIdOrderByIdDesc(Long alumnoId, Pageable pageable);

    Optional<MovimientoCredito> findByIdempotencyKey(String idempotencyKey);

    /** Los depósitos recibidos en una sesión de caja (para que el cierre cuente el dinero que entró). */
    List<MovimientoCredito> findByCajaSesionIdAndTipoAndAnuladoFalse(Long cajaSesionId, String tipo);
}
