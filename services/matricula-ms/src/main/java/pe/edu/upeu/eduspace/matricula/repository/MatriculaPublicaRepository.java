package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaPublica;

public interface MatriculaPublicaRepository extends JpaRepository<MatriculaPublica, Long> {

    /** ¿Esa matrícula nació de la matrícula en línea del sitio público? */
    boolean existsByMatriculaId(Long matriculaId);

    /** Último intento de matrícula en línea de un alumno (para retomar una reserva que venció sin pago). */
    java.util.Optional<MatriculaPublica> findFirstByAlumnoDocumentoAndEstadoOrderByCreadoEnDesc(String alumnoDocumento, String estado);
}
