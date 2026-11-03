package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.ContratoPersonal;

public interface ContratoPersonalRepository extends JpaRepository<ContratoPersonal, Long> {
    List<ContratoPersonal> findByPersonalIdOrderByFechaInicioDesc(Long personalId);

    List<ContratoPersonal> findAllByOrderByFechaInicioDesc();

    List<ContratoPersonal> findByEstado(String estado);

    boolean existsByPersonalId(Long personalId);
}
