package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/** Área de trabajo del colegio (Dirección, Docencia, Tesorería…) a la que pertenece cada persona del personal. */
@Entity
@Table(name = "areas")
@Getter
@Setter
public class Area {
    /** Código del área cuyo personal puede dictar cursos y ser tutor. */
    public static final String DOCENCIA = "DOCENCIA";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nombre;
    private String descripcion;
    private Boolean activo = true;
}
