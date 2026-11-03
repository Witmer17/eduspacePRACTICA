package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** El nombre es libre (A, B, «Central»…); la cantidad es cuántas aulas tiene el pabellón. */
public record PabellonRequest(
        @NotBlank @Size(max = 30) String nombre,
        @NotNull @Min(0) @Max(500) Short cantidadAulas) {
}
