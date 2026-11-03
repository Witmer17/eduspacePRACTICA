package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Contrato de una persona del personal. Estado guardado: VIGENTE o RESCINDIDO; "vencido" y "por vencer" se calculan por fecha. */
@Entity
@Table(name = "contratos_personal")
@Getter
@Setter
public class ContratoPersonal {
    public static final String VIGENTE = "VIGENTE";
    public static final String RESCINDIDO = "RESCINDIDO";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    /** PLAZO_FIJO, INDEFINIDO, POR_HORAS, LOCACION. */
    private String tipo;
    private String cargo;
    private LocalDate fechaInicio;
    /** Vacía en contratos indefinidos. */
    private LocalDate fechaFin;
    /** Remuneración mensual. */
    private BigDecimal remuneracion;
    private String estado = VIGENTE;
    private LocalDate fechaRescision;
    private String motivoRescision;
    private String observaciones;
    private LocalDateTime creadoEn;

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
    }

    /** VIGENTE, POR_VENCER (termina en 30 días o menos), VENCIDO, RESCINDIDO o POR_INICIAR. */
    public String estadoEfectivo(LocalDate hoy) {
        if (RESCINDIDO.equals(estado)) return RESCINDIDO;
        if (fechaInicio.isAfter(hoy)) return "POR_INICIAR";
        if (fechaFin != null && fechaFin.isBefore(hoy)) return "VENCIDO";
        if (fechaFin != null && !fechaFin.isAfter(hoy.plusDays(30))) return "POR_VENCER";
        return VIGENTE;
    }

    /** Fecha hasta la que rige: la rescisión si la hubo, si no el fin (o nada si es indefinido). */
    public LocalDate finEfectivo() {
        if (RESCINDIDO.equals(estado) && fechaRescision != null) {
            return fechaFin == null || fechaRescision.isBefore(fechaFin) ? fechaRescision : fechaFin;
        }
        return fechaFin;
    }
}
