package pe.edu.eduspace.planificacion.dto;

/**
 * {@code aulasRegistradas}: las aulas del catálogo que ya pertenecen al pabellón (no puede superar {@code cantidadAulas}).
 * {@code capacidadAlumnos}: cuántos alumnos caben en total en esas aulas.
 */
public record PabellonResponse(Long id, String nombre, Short cantidadAulas, long aulasRegistradas, long capacidadAlumnos) {
}
