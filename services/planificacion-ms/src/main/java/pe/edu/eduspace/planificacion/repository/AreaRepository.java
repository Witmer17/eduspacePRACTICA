package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Area;

public interface AreaRepository extends JpaRepository<Area, Long> {
    List<Area> findByActivoTrueOrderByNombre();

    List<Area> findAllByOrderByNombre();

    Optional<Area> findByCodigo(String codigo);

    boolean existsByCodigo(String codigo);
}
