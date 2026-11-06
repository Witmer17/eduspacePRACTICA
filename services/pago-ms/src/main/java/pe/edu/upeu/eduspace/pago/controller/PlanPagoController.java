package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;
import pe.edu.upeu.eduspace.pago.util.PlanPago;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

/** Las formas de pago de las pensiones que se acuerdan al matricular, con su descuento (la configuración manda; la pantalla solo la muestra). */
@RestController
@RequestMapping("/api/v1/pagos/planes-pago")
@RequiredArgsConstructor
@Tag(name = "Formas de pago", description = "Mensual, bimestral, semestral y anual, con el descuento de cada una")
public class PlanPagoController {

    private final PagoProperties props;

    /** {@code mesesPorCuota} es cuántos meses cubre cada cuota (para una tarifa de 10 meses: 1, 2, 5 y 10). */
    public record Opcion(String id, String etiqueta, BigDecimal descuentoPorcentaje, int cuotasEnDiezMeses) {}

    @GetMapping
    @Operation(summary = "Formas de pago de la pensión con su descuento (cualquier usuario con sesión del portal)")
    public List<Opcion> planes() {
        return Arrays.stream(PlanPago.values())
            .map(p -> new Opcion(p.name(), p.etiqueta(), descuento(p), p.mesesPorCuota(10).length))
            .toList();
    }

    private BigDecimal descuento(PlanPago p) {
        return switch (p) {
            case SEMESTRAL -> props.getDescuentoPlanSemestral();
            case ANUAL -> props.getDescuentoPlanAnual();
            default -> BigDecimal.ZERO;
        };
    }
}
