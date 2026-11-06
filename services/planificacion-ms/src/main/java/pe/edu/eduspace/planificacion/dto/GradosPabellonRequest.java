package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

/** Los grados que usan un pabellón: reemplaza la lista anterior (vacía = ninguno). */
public record GradosPabellonRequest(@NotNull List<Long> gradoIds) {
}
