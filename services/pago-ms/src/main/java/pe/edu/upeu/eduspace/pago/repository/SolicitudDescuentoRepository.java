package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.SolicitudDescuento;

import java.util.List;
import java.util.Optional;

@Repository
public interface SolicitudDescuentoRepository extends JpaRepository<SolicitudDescuento, Long> {

    boolean existsByMatriculaIdAndEstado(Long matriculaId, String estado);

    /** La última solicitud de esa matrícula (la que la familia ve: en revisión, aprobada o rechazada). */
    Optional<SolicitudDescuento> findFirstByMatriculaIdOrderByIdDesc(Long matriculaId);

    List<SolicitudDescuento> findByEstadoOrderBySolicitadaEnAsc(String estado);

    long countByEstado(String estado);
}
