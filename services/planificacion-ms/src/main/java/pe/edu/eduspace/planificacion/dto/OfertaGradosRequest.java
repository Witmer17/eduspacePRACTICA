package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/** Los grados que ofrece el colegio. Los que no estén en la lista se desactivan (si no tienen secciones ni malla). */
public record OfertaGradosRequest(@NotEmpty(message = "Elige al menos un grado") @Valid List<Clave> seleccionados) {

    public record Clave(@NotBlank String nivelCodigo, @NotNull Short numero) {
    }
}
