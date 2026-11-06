package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/** Contratos del crédito del alumno (saldo a favor que se cobra solo de sus pensiones). */
public final class CreditoDtos {

    private CreditoDtos() {
    }

    public record DepositoRequest(
        @NotNull @DecimalMin(value = "0.01", message = "El depósito debe ser mayor que cero") BigDecimal monto,
        @NotBlank String medio,
        @Size(max = 80) String referencia,
        @Size(max = 80) String idempotencyKey) {
    }

    public record AnularDepositoRequest(@NotBlank @Size(max = 200) String motivo) {
    }

    /** Un movimiento del libro: `signo` es +1 si suma al crédito y -1 si resta. */
    public record Movimiento(Long id, String tipo, int signo, BigDecimal monto, BigDecimal saldoDespues, String medio, String referencia,
                             Long cuotaId, Long pagoId, boolean anulado, String detalle, Long registradoPor, LocalDateTime creadoEn) {
    }

    /**
     * El crédito de un alumno. `exigible` es lo que ya toca cobrar de sus pensiones (vencidas o que vencen hoy) y `faltante`, lo que el crédito
     * no alcanza a cubrir de eso (quedará como deuda); `sobrante`, lo que quedaría como crédito después de cobrarlo.
     */
    public record Credito(Long alumnoId, BigDecimal saldo, BigDecimal exigible, BigDecimal faltante, BigDecimal sobrante, List<Movimiento> movimientos) {
    }

    /** Lo que pasó al depositar o al cobrar del crédito: el saldo final y lo que se aplicó a las cuotas. */
    public record Resultado(BigDecimal saldo, BigDecimal aplicado, Long pagoId, List<Long> cuotaIds) {
    }
}
