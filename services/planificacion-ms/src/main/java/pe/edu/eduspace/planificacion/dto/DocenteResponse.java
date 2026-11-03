package pe.edu.eduspace.planificacion.dto;

import java.util.List;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;

/** Persona del personal del colegio con su área de trabajo (docente cuando el área es DOCENCIA) y los cursos que puede dictar. */
public record DocenteResponse(Long id, Long usuarioId, String tipoDocumento, String numeroDocumento, String nombres,
                              String apellidos, String email, String telefono, String especialidad, String cargo,
                              Long areaId, String areaCodigo, String areaNombre, EstadoDocente estado, List<Long> cursoIds) {
}
