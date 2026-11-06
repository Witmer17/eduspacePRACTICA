package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** El crédito (saldo a favor) de un alumno: lo depositado y aún no cobrado de sus cuotas. */
@Entity
@Table(name = "creditos_alumno")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditoAlumno {

    @Id
    @Column(name = "alumno_id")
    private Long alumnoId;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(name = "actualizado_en", nullable = false)
    @Builder.Default
    private LocalDateTime actualizadoEn = LocalDateTime.now();

    @Version
    @Column(nullable = false)
    @Builder.Default
    private Long version = 0L;
}
