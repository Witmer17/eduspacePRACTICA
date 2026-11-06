package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Una orden para pagar lo que falta de la matrícula: la crea el servidor y la cierra el aviso de la pasarela. */
@Entity
@Table(name = "ordenes_pago")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdenPago {

    public static final String PENDIENTE = "PENDIENTE";
    public static final String APROBADA = "APROBADA";
    public static final String RECHAZADA = "RECHAZADA";
    public static final String EXPIRADA = "EXPIRADA";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String codigo;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(nullable = false, length = 10)
    @Builder.Default
    private String estado = PENDIENTE;

    @Column(name = "creada_por")
    private Long creadaPor;

    @Column(name = "creada_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadaEn = LocalDateTime.now();

    @Column(name = "expira_en", nullable = false)
    private LocalDateTime expiraEn;

    /** El id que devolvió la pasarela (su «número de operación»). */
    @Column(name = "transaccion_id", length = 60)
    private String transaccionId;

    @Column(length = 15)
    private String medio;

    @Column(length = 200)
    private String pagador;

    /** Lo que respondió la pasarela (aprobado o el motivo del rechazo). */
    @Column(length = 200)
    private String respuesta;

    @Column(name = "confirmada_en")
    private LocalDateTime confirmadaEn;

    /** El pago con el que se cobró la matrícula del crédito, si ya se cobró. */
    @Column(name = "pago_id")
    private Long pagoId;
}
