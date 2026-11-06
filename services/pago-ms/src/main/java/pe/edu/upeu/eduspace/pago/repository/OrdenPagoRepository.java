package pe.edu.upeu.eduspace.pago.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.OrdenPago;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenPagoRepository extends JpaRepository<OrdenPago, Long> {

    Optional<OrdenPago> findByCodigo(String codigo);

    /** La orden con bloqueo: dos avisos de la pasarela a la vez no la confirman dos veces. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT o FROM OrdenPago o WHERE o.codigo = :codigo")
    Optional<OrdenPago> bloquearPorCodigo(@Param("codigo") String codigo);

    Optional<OrdenPago> findFirstByMatriculaIdAndEstado(Long matriculaId, String estado);

    List<OrdenPago> findByAlumnoIdOrderByIdDesc(Long alumnoId);
}
