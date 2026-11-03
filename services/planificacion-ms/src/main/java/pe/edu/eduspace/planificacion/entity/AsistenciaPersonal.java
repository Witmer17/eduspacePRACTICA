package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

/** Asistencia de una persona del personal en un día. */
@Entity
@Table(name = "asistencia_personal")
@Getter
@Setter
public class AsistenciaPersonal {
    /** Estados válidos; FALTA y JUSTIFICADA no llevan horas. */
    public static final java.util.Set<String> ESTADOS = java.util.Set.of("PRESENTE", "TARDANZA", "FALTA", "JUSTIFICADA", "PERMISO");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    private LocalDate fecha;
    private String estado;
    private LocalTime horaEntrada;
    private LocalTime horaSalida;
    private String observacion;
    private LocalDateTime actualizadoEn;

    @PrePersist
    @PreUpdate
    void alGuardar() {
        actualizadoEn = LocalDateTime.now();
    }

    public static boolean llevaHoras(String estado) {
        return "PRESENTE".equals(estado) || "TARDANZA".equals(estado);
    }
}
