package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.Cuota;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Long> {

    List<Cuota> findByAlumnoIdOrderByFechaVencimientoAsc(Long alumnoId);

    List<Cuota> findByAlumnoIdAndEstadoOrderByFechaVencimientoAsc(Long alumnoId, String estado);

    List<Cuota> findByMatriculaMatriculaId(Long matriculaId);

    Optional<Cuota> findByMatriculaMatriculaIdAndConceptoIdAndNumeroCuota(Long matriculaId, Long conceptoId, Short numeroCuota);

    @Query("""
        SELECT c FROM Cuota c
        WHERE (:estado IS NULL OR c.estado = :estado)
          AND (:alumnoId IS NULL OR c.alumnoId = :alumnoId)
          AND (:seccionId IS NULL OR c.matricula.seccionId = :seccionId)
          AND (:vencimiento IS NULL OR c.fechaVencimiento = :vencimiento)
    """)
    Page<Cuota> findCuotasFiltradas(@Param("estado") String estado,
                                   @Param("alumnoId") Long alumnoId,
                                   @Param("seccionId") Long seccionId,
                                   @Param("vencimiento") LocalDate vencimiento,
                                   Pageable pageable);

    List<Cuota> findByEstado(String estado);

    /**
     * Las pensiones de un alumno que ya toca cobrar (vencen hoy o ya vencieron) y aún deben algo, de la más antigua a la más reciente.
     * Es lo que el crédito del alumno paga solo.
     */
    @Query("""
        SELECT c FROM Cuota c
        WHERE c.alumnoId = :alumnoId
          AND c.concepto.tipo = 'PENSION'
          AND c.estado IN ('PENDIENTE', 'PARCIAL', 'VENCIDA')
          AND c.fechaVencimiento <= :hoy
          AND c.saldo > 0
        ORDER BY c.fechaVencimiento ASC, c.numeroCuota ASC, c.id ASC
    """)
    List<Cuota> pensionesExigibles(@Param("alumnoId") Long alumnoId, @Param("hoy") LocalDate hoy);

    @Query("""
        SELECT c FROM Cuota c
        WHERE c.estado IN ('PENDIENTE', 'PARCIAL')
          AND c.fechaVencimiento < :hoy
    """)
    List<Cuota> findCuotasPorVencerVencidasSinMarcar(@Param("hoy") LocalDate hoy);

    @Query("""
        SELECT c FROM Cuota c
        WHERE c.estado IN ('PENDIENTE', 'PARCIAL')
          AND c.avisoEnviado = false
          AND c.fechaVencimiento BETWEEN :desde AND :hasta
    """)
    List<Cuota> findCuotasParaAvisoPrevio(@Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);

    @Query("""
        SELECT c FROM Cuota c
        WHERE c.alumnoId = :alumnoId
          AND c.estado = 'VENCIDA'
    """)
    List<Cuota> findDeudasVencidasByAlumnoId(@Param("alumnoId") Long alumnoId);
}

