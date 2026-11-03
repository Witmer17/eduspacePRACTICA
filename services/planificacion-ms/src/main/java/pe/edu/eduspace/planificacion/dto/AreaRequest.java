package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** Alta de un área de trabajo. El código no cambia después (lo usan las reglas, p. ej. DOCENCIA). */
public record AreaRequest(
        @NotBlank @Size(max = 30) @Pattern(regexp = "[A-Z0-9_]+", message = "El código usa solo mayúsculas, números y guion bajo") String codigo,
        @NotBlank @Size(max = 100) String nombre,
        @Size(max = 255) String descripcion) {
}
