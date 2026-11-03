package pe.edu.eduspace.planificacion.service;

import org.springframework.data.domain.Pageable;
import pe.edu.eduspace.planificacion.dto.DocenteRequest;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.PageResponse;

public interface DocenteService {
    /** Solo el personal del área Docencia (lo que esperan los selectores de docente, tutor y asignaciones). */
    PageResponse<DocenteResponse> buscar(String q, Pageable pageable);

    /** Personal de un área; con {@code todas} (y sin área), el de todas las áreas. */
    PageResponse<DocenteResponse> buscar(String q, Long areaId, boolean todas, Pageable pageable);

    DocenteResponse obtener(Long id);

    DocenteResponse crear(DocenteRequest request);

    DocenteResponse actualizar(Long id, DocenteRequest request);

    DocenteResponse vincularUsuario(Long id, Long usuarioId);

    /** Inactiva al docente si tiene asignaciones o tutorías; si no, lo elimina. */
    void eliminar(Long id);
}
