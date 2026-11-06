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
    /** Caja ya solicitó el pago (medio y referencia) y espera que el administrador lo apruebe. */
    public static final String POR_APROBAR = "POR_APROBAR";
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
    /** Quien pidió el pago (caja) y quien lo aprobó o rechazó (administrador). */
    private Long solicitadoPor;
    private LocalDateTime solicitadoEn;
    private Long aprobadoPor;
    private LocalDateTime aprobadoEn;
    /** Por qué el administrador devolvió el pago a pendiente; se borra al volver a solicitarlo. */
    private String motivoRechazo;

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
    }

    public boolean resta() {
        return "DESCUENTO".equals(concepto) || "ADELANTO".equals(concepto);
    }
}
