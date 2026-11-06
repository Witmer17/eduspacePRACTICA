package pe.edu.eduspace.planificacion.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.planificacion.entity.Docente;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
    /** {@code q} nunca es nulo (texto vacío = sin filtro): PostgreSQL no infiere el tipo de un parámetro nulo en LIKE. */
    @Query("""
            select d from Docente d
            where lower(d.apellidos) like lower(concat('%', :q, '%'))
               or lower(d.nombres) like lower(concat('%', :q, '%'))
               or d.numeroDocumento like concat('%', :q, '%')
            """)
    Page<Docente> buscar(@Param("q") String q, Pageable pageable);

    /** Igual que {@link #buscar}, pero solo el personal de un área. */
    @Query("""
            select d from Docente d
            where d.area.id = :areaId
              and (lower(d.apellidos) like lower(concat('%', :q, '%'))
                or lower(d.nombres) like lower(concat('%', :q, '%'))
                or d.numeroDocumento like concat('%', :q, '%'))
            """)
    Page<Docente> buscarPorArea(@Param("q") String q, @Param("areaId") Long areaId, Pageable pageable);

    /** Igual que {@link #buscar}, pero solo las personas con ese estado (ACTIVO o INACTIVO). */
    @Query("""
            select d from Docente d
            where d.estado = :estado
              and (lower(d.apellidos) like lower(concat('%', :q, '%'))
                or lower(d.nombres) like lower(concat('%', :q, '%'))
                or d.numeroDocumento like concat('%', :q, '%'))
            """)
    Page<Docente> buscarPorEstado(@Param("q") String q, @Param("estado") pe.edu.eduspace.planificacion.entity.EstadoDocente estado, Pageable pageable);

    /** Igual que {@link #buscarPorEstado}, pero solo el personal de un área. */
    @Query("""
            select d from Docente d
            where d.area.id = :areaId
              and d.estado = :estado
              and (lower(d.apellidos) like lower(concat('%', :q, '%'))
                or lower(d.nombres) like lower(concat('%', :q, '%'))
                or d.numeroDocumento like concat('%', :q, '%'))
            """)
    Page<Docente> buscarPorAreaYEstado(@Param("q") String q, @Param("areaId") Long areaId,
                                       @Param("estado") pe.edu.eduspace.planificacion.entity.EstadoDocente estado, Pageable pageable);

    /** Personas del área con ese estado (para no desactivar un área con personal activo). */
    long countByAreaIdAndEstado(Long areaId, pe.edu.eduspace.planificacion.entity.EstadoDocente estado);

    Optional<Docente> findByUsuarioId(Long usuarioId);

    boolean existsByTipoDocumentoAndNumeroDocumento(String tipo, String numero);

    boolean existsByTipoDocumentoAndNumeroDocumentoAndIdNot(String tipo, String numero, Long id);

    boolean existsByUsuarioIdAndIdNot(Long usuarioId, Long id);
}
