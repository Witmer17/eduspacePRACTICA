package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pe.edu.upeu.eduspace.pago.entity.AsignacionArea;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/** Reparto del dinero de caja entre las áreas de trabajo. */
public final class FondoDtos {

    private FondoDtos() {
    }

    /** Cuánto se cobró, cuánto se repartió y cuánto queda en caja. */
    public record Resumen(BigDecimal totalCobrado, BigDecimal totalAsignado, BigDecimal disponible, List<AreaAsignada> areas) {
    }

    public record AreaAsignada(Long areaId, BigDecimal asignado) {
    }

    /** {@code monto} es el total que debe quedar asignado al área (no el cambio): el servidor calcula la diferencia. */
    public record FijarAsignacion(@NotNull @DecimalMin("0.00") @Digits(integer = 10, fraction = 2) BigDecimal monto,
                                  @Size(max = 255) String motivo) {
    }

    /** El total que debe quedar asignado a un área. */
    public record AreaMonto(@NotNull Long areaId, @NotNull @DecimalMin("0.00") @Digits(integer = 10, fraction = 2) BigDecimal monto) {
    }

    /** Reparto de varias áreas a la vez: todo o nada. El motivo (opcional) se anota en cada movimiento. */
    public record FijarVarias(@NotEmpty @Size(max = 200) List<@Valid AreaMonto> areas, @Size(max = 255) String motivo) {
    }

    public record Movimiento(Long id, Long areaId, BigDecimal monto, BigDecimal saldoArea, String motivo, Long creadoPor, LocalDateTime creadoEn) {
        public static Movimiento de(AsignacionArea a) {
            return new Movimiento(a.getId(), a.getAreaId(), a.getMonto(), a.getSaldoArea(), a.getMotivo(), a.getCreadoPor(), a.getCreadoEn());
        }
    }
}
