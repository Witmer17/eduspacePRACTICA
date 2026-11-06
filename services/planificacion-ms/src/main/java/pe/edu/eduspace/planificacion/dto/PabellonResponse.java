package pe.edu.eduspace.planificacion.dto;

import java.util.List;

/**
 * {@code aulasRegistradas}: las aulas del catálogo que ya pertenecen al pabellón (no puede superar {@code cantidadAulas}).
 * {@code capacidadAlumnos}: cuántos alumnos caben en total en esas aulas.
 * {@code gradoIds}: los grados que usan el pabellón (ordenados).
 */
public record PabellonResponse(Long id, String nombre, Short cantidadAulas, long aulasRegistradas, long capacidadAlumnos, List<Long> gradoIds) {
}
