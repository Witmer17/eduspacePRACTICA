package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

/** Cómo crear las aulas que le faltan a un pabellón. Sin capacidad, cada aula nace con 30. */
public record AulasPabellonRequest(@Min(1) @Max(500) Short capacidad) {
}
