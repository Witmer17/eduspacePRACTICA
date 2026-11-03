package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Aula;
import pe.edu.eduspace.planificacion.entity.TipoAula;

public interface AulaRepository extends JpaRepository<Aula, Long> {
    List<Aula> findByTipoOrderByCodigo(TipoAula tipo);

    List<Aula> findAllByOrderByCodigo();

    /** Aulas que ya pertenecen a un pabellón (para no registrar más de las declaradas). */
    long countByPabellonId(Long pabellonId);

    List<Aula> findByPabellonIdOrderByCodigo(Long pabellonId);

    /** Alumnos que caben en todas las aulas de un pabellón. */
    @org.springframework.data.jpa.repository.Query("select coalesce(sum(a.capacidad), 0) from Aula a where a.pabellon.id = :pabellonId")
    long sumaCapacidad(@org.springframework.data.repository.query.Param("pabellonId") Long pabellonId);

    long countByPabellonIdAndIdNot(Long pabellonId, Long id);

    boolean existsByCodigo(String codigo);

    boolean existsByCodigoAndIdNot(String codigo, Long id);
}
