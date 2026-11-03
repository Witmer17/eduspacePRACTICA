package pe.edu.eduspace.planificacion.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.AsistenciaPersonal;

public interface AsistenciaPersonalRepository extends JpaRepository<AsistenciaPersonal, Long> {
    List<AsistenciaPersonal> findByFechaBetweenOrderByFechaAscIdAsc(LocalDate desde, LocalDate hasta);

    List<AsistenciaPersonal> findByPersonalIdAndFechaBetweenOrderByFechaAsc(Long personalId, LocalDate desde, LocalDate hasta);

    Optional<AsistenciaPersonal> findByPersonalIdAndFecha(Long personalId, LocalDate fecha);

    boolean existsByPersonalId(Long personalId);
}
