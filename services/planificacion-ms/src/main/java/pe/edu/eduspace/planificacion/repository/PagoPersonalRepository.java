package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.PagoPersonal;

public interface PagoPersonalRepository extends JpaRepository<PagoPersonal, Long> {
    List<PagoPersonal> findByPersonalIdOrderByPeriodoDescIdDesc(Long personalId);

    List<PagoPersonal> findByPeriodoOrderByIdAsc(String periodo);

    /** ¿Ya tiene esa persona un pago de ese concepto en el periodo (de cualquiera de sus contratos)? */
    boolean existsByPersonalIdAndPeriodoAndConcepto(Long personalId, String periodo, String concepto);

    boolean existsByContratoIdAndPeriodoAndConcepto(Long contratoId, String periodo, String concepto);

    boolean existsByPersonalId(Long personalId);
}
