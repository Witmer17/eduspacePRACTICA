package pe.edu.upeu.eduspace.pago.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.math.BigDecimal;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.pago")
public class PagoProperties {

    private BigDecimal moraPorcentajeMensual = new BigDecimal("2.00");
    private String moraBase = "SALDO";
    private int diasAvisoPrevio = 3;
    private int diasVigenciaPrematricula = 7;
    private int margenGraciaDias = 0;
    /** Descuento (%) sobre la pensión cuando se elige pagar por semestre. */
    private BigDecimal descuentoPlanSemestral = new BigDecimal("5");
    /** Descuento (%) sobre la pensión cuando se elige pagar el año completo. */
    private BigDecimal descuentoPlanAnual = new BigDecimal("10");
    /** Minutos que vive una orden de pago antes de expirar. */
    private int minutosVigenciaOrden = 30;
    /** Secreto compartido con la pasarela para firmar sus avisos (en producción viene de una variable de entorno). */
    private String pasarelaSecreto = "dev-secreto-pasarela-simulada";
}

