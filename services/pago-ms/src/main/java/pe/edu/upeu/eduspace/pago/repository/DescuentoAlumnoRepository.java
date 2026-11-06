package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.DescuentoAlumno;

import java.util.List;
import java.util.Optional;

@Repository
public interface DescuentoAlumnoRepository extends JpaRepository<DescuentoAlumno, Long> {

    List<DescuentoAlumno> findByAlumnoIdAndAnioIdAndVigenteTrue(Long alumnoId, Long anioId);

    Optional<DescuentoAlumno> findByAlumnoIdAndDescuentoIdAndAnioId(Long alumnoId, Long descuentoId, Long anioId);

    /** Todos los descuentos vigentes del alumno (de cualquier año), con su detalle, para mostrarlos en caja. */
    @Query("""
        SELECT da FROM DescuentoAlumno da
        JOIN FETCH da.descuento d
        WHERE da.alumnoId = :alumnoId AND da.vigente = true
        ORDER BY da.anioId DESC, da.id DESC
    """)
    List<DescuentoAlumno> findVigentesDelAlumno(@Param("alumnoId") Long alumnoId);

    @Query("""
        SELECT da FROM DescuentoAlumno da
        JOIN FETCH da.descuento d
        WHERE da.alumnoId = :alumnoId
          AND da.anioId = :anioId
          AND da.vigente = true
          AND d.activo = true
    """)
    List<DescuentoAlumno> findDescuentosVigentesConDetalle(@Param("alumnoId") Long alumnoId, @Param("anioId") Long anioId);
}

