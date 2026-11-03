package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

/** {@code areaId} vacío = área Docencia (así siguen funcionando quienes registran docentes sin indicar área). */
public record DocenteRequest(
        @Size(max = 10) String tipoDocumento,
        @NotBlank @Size(max = 20) String numeroDocumento,
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 100) String apellidos,
        @Email @Size(max = 150) String email,
        @Size(max = 20) String telefono,
        @Size(max = 100) String especialidad,
        @Size(max = 100) String cargo,
        Long areaId,
        /** Cursos que puede dictar (solo personal de Docencia). {@code null} = no cambiar los que ya tiene. */
        List<Long> cursoIds) {
}
