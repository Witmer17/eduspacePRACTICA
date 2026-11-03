package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Cuenta donde se le deposita el pago a una persona del personal. */
@Entity
@Table(name = "cuentas_deposito_personal")
@Getter
@Setter
public class CuentaDeposito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    /** BCP, BBVA, INTERBANK… (ver {@code CuentaDepositoService.BANCOS}). */
    private String banco;
    /** AHORROS, CORRIENTE, SUELDO o BILLETERA (Yape, Plin: el número es el celular). */
    private String tipo;
    private String numero;
    /** Código de cuenta interbancario (20 dígitos); opcional. */
    private String cci;
    private String titular;
    private boolean principal;
    /** Falso = quitada (se conserva por historial pero ya no se ofrece). */
    private boolean activo = true;
    private LocalDateTime creadoEn;

    @PrePersist
    void alCrear() {
        creadoEn = LocalDateTime.now();
    }
}
