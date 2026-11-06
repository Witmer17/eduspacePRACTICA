package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/** Un descuento que la familia pide para la matrícula de su hijo y que la secretaría debe probar antes de poder pagarla. */
@Entity
@Table(name = "solicitudes_descuento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudDescuento {

    public static final String PENDIENTE = "PENDIENTE";
    public static final String APROBADA = "APROBADA";
    public static final String RECHAZADA = "RECHAZADA";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "descuento_id", nullable = false)
    private Descuento descuento;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(nullable = false, length = 300)
    private String motivo;

    /** Si es por hermanos: el hermano ya matriculado con el que se prueba. */
    @Column(name = "hermano_alumno_id")
    private Long hermanoAlumnoId;

    /** INTERNA: la pide la familia con sesión o la secretaría. PUBLICA: viene de la matrícula en línea, con documentos que la secretaría debe revisar. */
    @Column(nullable = false, length = 10)
    @Builder.Default
    private String origen = "INTERNA";

    /** Datos del hermano tal como los declaró la familia en la matrícula en línea (la secretaría los compara con los documentos). */
    @Column(name = "hermano_documento", length = 20)
    private String hermanoDocumento;

    @Column(name = "hermano_nombre", length = 220)
    private String hermanoNombre;

    @Column(nullable = false, length = 10)
    @Builder.Default
    private String estado = PENDIENTE;

    @Column(name = "solicitada_por")
    private Long solicitadaPor;

    @Column(name = "solicitada_en", nullable = false)
    @Builder.Default
    private LocalDateTime solicitadaEn = LocalDateTime.now();

    @Column(name = "resuelta_por")
    private Long resueltaPor;

    @Column(name = "resuelta_en")
    private LocalDateTime resueltaEn;

    @Column(name = "motivo_resolucion", length = 300)
    private String motivoResolucion;
}
