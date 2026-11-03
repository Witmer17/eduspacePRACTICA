package pe.edu.eduspace.planificacion.dto;

/**
 * Un grado de la oferta estándar (Inicial 3 a 5 años, Primaria 1.° a 6.°, Secundaria 1.° a 5.°).
 * {@code seleccionado}: el colegio lo ofrece. {@code enUso}: ya tiene secciones o cursos en su malla, así que no se puede quitar.
 */
public record GradoOfertaResponse(Long gradoId, String nivelCodigo, String nivelNombre, int numero, String nombre,
                                  boolean seleccionado, boolean enUso, String detalleUso) {
}
