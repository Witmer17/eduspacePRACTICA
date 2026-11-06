package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Una línea del libro del crédito de un alumno (el monto es positivo; el tipo dice si suma o resta). */
@Entity
@Table(name = "movimientos_credito")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovimientoCredito {

    public static final String DEPOSITO = "DEPOSITO";
    public static final String COBRO_CUOTA = "COBRO_CUOTA";
    public static final String REVERSION = "REVERSION";
    public static final String ANULACION = "ANULACION";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(nullable = false, length = 12)
    private String tipo;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(name = "saldo_despues", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldoDespues;

    @Column(length = 15)
    private String medio;

    @Column(length = 80)
    private String referencia;

    @Column(name = "cuota_id")
    private Long cuotaId;

    @Column(name = "pago_id")
    private Long pagoId;

    @Column(name = "caja_sesion_id")
    private Long cajaSesionId;

    @Column(name = "anula_a")
    private Long anulaA;

    @Column(nullable = false)
    @Builder.Default
    private Boolean anulado = false;

    @Column(length = 200)
    private String detalle;

    @Column(name = "registrado_por")
    private Long registradoPor;

    @Column(name = "creado_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "idempotency_key", length = 80)
    private String idempotencyKey;

    /** ¿Suma al crédito? (depósitos y reversiones); lo demás resta. */
    public boolean suma() {
        return DEPOSITO.equals(tipo) || REVERSION.equals(tipo);
    }
}
