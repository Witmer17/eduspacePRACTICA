package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/** La capacidad (alumnos que caben) de varias aulas de un pabellón, en un solo paso. */
public record CapacidadesPabellonRequest(@NotEmpty @Valid List<Item> aulas) {

    public record Item(@NotNull Long aulaId, @NotNull @Min(1) @Max(500) Short capacidad) {
    }
}
