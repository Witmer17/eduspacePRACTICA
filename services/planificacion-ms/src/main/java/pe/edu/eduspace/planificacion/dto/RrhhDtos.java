package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import pe.edu.eduspace.planificacion.entity.ContratoPersonal;
import pe.edu.eduspace.planificacion.entity.PagoPersonal;

/** Contratos y pagos del personal (recursos humanos). */
public final class RrhhDtos {

    private RrhhDtos() {
    }

    public record ContratoRequest(
            @NotNull Long personalId,
            @NotBlank @Pattern(regexp = "PLAZO_FIJO|INDEFINIDO|POR_HORAS|LOCACION") String tipo,
            @Size(max = 100) String cargo,
            @NotNull LocalDate fechaInicio,
            LocalDate fechaFin,
            @NotNull @DecimalMin("0.00") BigDecimal remuneracion,
            @Size(max = 500) String observaciones) {
    }

    /** Renovación: el inicio lo pone el servidor (día siguiente al fin del contrato anterior). Lo que no se indique se hereda del anterior. */
    public record RenovarRequest(
            @Pattern(regexp = "PLAZO_FIJO|INDEFINIDO|POR_HORAS|LOCACION") String tipo,
            @Size(max = 100) String cargo,
            LocalDate fechaFin,
            @DecimalMin("0.00") BigDecimal remuneracion,
            @Size(max = 500) String observaciones) {
    }

    public record RescisionRequest(LocalDate fecha, @Size(max = 255) String motivo) {
    }

    public record ContratoResponse(
            Long id, Long personalId, String personalNombre, String areaNombre, String tipo, String cargo,
            LocalDate fechaInicio, LocalDate fechaFin, BigDecimal remuneracion, String estado, String estadoEfectivo,
            LocalDate fechaRescision, String motivoRescision, String observaciones) {

        public static ContratoResponse de(ContratoPersonal c) {
            var p = c.getPersonal();
            return new ContratoResponse(c.getId(), p.getId(), p.nombreCompleto(), p.getArea() == null ? null : p.getArea().getNombre(),
                    c.getTipo(), c.getCargo(), c.getFechaInicio(), c.getFechaFin(), c.getRemuneracion(), c.getEstado(),
                    c.estadoEfectivo(LocalDate.now()), c.getFechaRescision(), c.getMotivoRescision(), c.getObservaciones());
        }
    }

    public record PagoRequest(
            @NotNull Long personalId,
            Long contratoId,
            @NotBlank @Pattern(regexp = "\\d{4}-(0[1-9]|1[0-2])") String periodo,
            @NotBlank @Pattern(regexp = "SUELDO|BONO|DESCUENTO|ADELANTO|OTRO") String concepto,
            @Size(max = 200) String descripcion,
            @NotNull @DecimalMin(value = "0.01") BigDecimal monto) {
    }

    public record PagarRequest(LocalDate fechaPago, @Size(max = 30) String medio, @Size(max = 100) String referencia) {
    }

    /** El administrador rechaza un pago solicitado por caja: el motivo es obligatorio. */
    public record RechazoRequest(@NotBlank @Size(max = 300) String motivo) {
    }

    public record PagoResponse(
            Long id, Long personalId, String personalNombre, String areaNombre, Long contratoId, String periodo, String concepto,
            String descripcion, BigDecimal monto, BigDecimal montoFirmado, String estado, LocalDate fechaPago, String medio, String referencia,
            java.time.LocalDateTime solicitadoEn, String motivoRechazo) {

        public static PagoResponse de(PagoPersonal p) {
            var d = p.getPersonal();
            return new PagoResponse(p.getId(), d.getId(), d.nombreCompleto(), d.getArea() == null ? null : d.getArea().getNombre(),
                    p.getContrato() == null ? null : p.getContrato().getId(), p.getPeriodo(), p.getConcepto(), p.getDescripcion(),
                    p.getMonto(), p.resta() ? p.getMonto().negate() : p.getMonto(), p.getEstado(), p.getFechaPago(), p.getMedio(), p.getReferencia(),
                    p.getSolicitadoEn(), p.getMotivoRechazo());
        }
    }

    /** Cuenta para depósito. El número y el CCI solo llevan dígitos; la billetera (Yape, Plin) usa el celular de 9 dígitos. */
    public record CuentaRequest(
            @NotNull Long personalId,
            @NotBlank @Size(max = 30) String banco,
            @NotBlank @Pattern(regexp = "AHORROS|CORRIENTE|SUELDO|BILLETERA") String tipo,
            @NotBlank @Size(max = 30) String numero,
            @Size(max = 30) String cci,
            @NotBlank @Size(max = 150) String titular,
            Boolean principal) {
    }

    public record CuentaResponse(Long id, Long personalId, String personalNombre, String banco, String tipo, String numero, String cci, String titular, boolean principal) {
        public static CuentaResponse de(pe.edu.eduspace.planificacion.entity.CuentaDeposito c) {
            return new CuentaResponse(c.getId(), c.getPersonal().getId(), c.getPersonal().nombreCompleto(), c.getBanco(), c.getTipo(),
                    c.getNumero(), c.getCci(), c.getTitular(), c.isPrincipal());
        }
    }

    public record PlanillaGenerada(String periodo, int creados, int yaExistian) {
    }
}
