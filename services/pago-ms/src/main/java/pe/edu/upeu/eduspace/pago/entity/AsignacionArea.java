package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Un movimiento del reparto de caja: positivo = dinero que sale de caja hacia el área; negativo = dinero que vuelve a caja. */
@Entity
@Table(name = "asignaciones_area")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsignacionArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Id del área en planificacion-ms. */
    @Column(name = "area_id", nullable = false)
    private Long areaId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal monto;

    /** Total asignado al área después de este movimiento. */
    @Column(name = "saldo_area", nullable = false, precision = 12, scale = 2)
    private BigDecimal saldoArea;

    @Column(length = 255)
    private String motivo;

    @Column(name = "creado_por")
    private Long creadoPor;

    @Column(name = "creado_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadoEn = LocalDateTime.now();
}
