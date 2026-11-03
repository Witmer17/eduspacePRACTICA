package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "docentes")
@Getter
@Setter
public class Docente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** Id en auth-ms; número simple, sin relación. */
    private Long usuarioId;
    private String tipoDocumento = "DNI";
    private String numeroDocumento;
    private String nombres;
    private String apellidos;
    private String email;
    private String telefono;
    private String especialidad;
    /** Puesto dentro del área (Director, Psicóloga, Cajero…). */
    private String cargo;
    /** Área de trabajo. Esta tabla es el registro de todo el personal; solo el área DOCENCIA dicta cursos. */
    @ManyToOne(optional = false)
    @JoinColumn(name = "area_id")
    private Area area;
    /** Cursos que puede dictar (su especialidad). Solo tiene sentido para el área DOCENCIA. */
    @ManyToMany
    @JoinTable(name = "docente_cursos", joinColumns = @JoinColumn(name = "docente_id"), inverseJoinColumns = @JoinColumn(name = "curso_id"))
    private Set<Curso> cursos = new LinkedHashSet<>();
    @Enumerated(EnumType.STRING)
    private EstadoDocente estado = EstadoDocente.ACTIVO;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;

    public String nombreCompleto() {
        return apellidos + ", " + nombres;
    }

    /** Puede dictar cursos y ser tutor. Sin área (solo ocurre en pruebas, la columna es obligatoria) se trata como docente. */
    public boolean esDocente() {
        return area == null || Area.DOCENCIA.equals(area.getCodigo());
    }

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
        actualizadoEn = creadoEn;
    }

    @PreUpdate
    void onUpdate() {
        actualizadoEn = LocalDateTime.now();
    }
}
