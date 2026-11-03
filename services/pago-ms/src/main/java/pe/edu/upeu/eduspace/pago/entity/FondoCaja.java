package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/** Fila única (id = 1) que se bloquea mientras se reparte dinero entre áreas. */
@Entity
@Table(name = "fondo_caja")
@Getter
@Setter
public class FondoCaja {

    @Id
    private Long id;

    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();
}
