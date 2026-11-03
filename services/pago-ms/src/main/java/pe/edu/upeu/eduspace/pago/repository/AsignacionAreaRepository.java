package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.AsignacionArea;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AsignacionAreaRepository extends JpaRepository<AsignacionArea, Long> {

    /** Todo el dinero que está asignado a las áreas (no está en caja). */
    @Query("SELECT COALESCE(SUM(a.monto), 0) FROM AsignacionArea a")
    BigDecimal totalAsignado();

    @Query("SELECT COALESCE(SUM(a.monto), 0) FROM AsignacionArea a WHERE a.areaId = :areaId")
    BigDecimal totalDelArea(@Param("areaId") Long areaId);

    /** Pares [areaId, total asignado] de las áreas que tienen o tuvieron dinero. */
    @Query("SELECT a.areaId, SUM(a.monto) FROM AsignacionArea a GROUP BY a.areaId")
    List<Object[]> totalesPorArea();

    @Query("SELECT a FROM AsignacionArea a WHERE a.areaId = :areaId ORDER BY a.id DESC")
    List<AsignacionArea> movimientosDelArea(@Param("areaId") Long areaId, Pageable pageable);
}
