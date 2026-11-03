package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Una línea de la planilla: sueldo, bono, descuento o adelanto de un periodo (YYYY-MM). */
@Entity
@Table(name = "pagos_personal")
@Getter
@Setter
public class PagoPersonal {
    public static final String PENDIENTE = "PENDIENTE";
    public static final String PAGADO = "PAGADO";
    public static final String SUELDO = "SUELDO";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    @ManyToOne
    @JoinColumn(name = "contrato_id")
    private ContratoPersonal contrato;
    private String periodo;
    /** SUELDO, BONO, DESCUENTO, ADELANTO u OTRO. DESCUENTO y ADELANTO restan. */
    private String concepto;
    private String descripcion;
    /** Siempre positivo; el signo lo da el concepto. */
    private BigDecimal monto;
    private String estado = PENDIENTE;
    private LocalDate fechaPago;
    private String medio;
    private String referencia;
    private LocalDateTime creadoEn;

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
    }

    public boolean resta() {
        return "DESCUENTO".equals(concepto) || "ADELANTO".equals(concepto);
    }
}
