package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RechazoRequest;
import pe.edu.eduspace.planificacion.service.CuentaDepositoService;
import pe.edu.eduspace.planificacion.service.RrhhService;

/**
 * Pago al personal con aprobación. Caja ve la planilla del mes y SOLICITA cada pago (medio, fecha, referencia); el administrador lo APRUEBA
 * o lo RECHAZA con un motivo. Es un controlador aparte de {@code rrhh} (contratos, sueldos, cuentas: solo administrador) para que caja
 * llegue únicamente a lo que necesita. Ver SecurityConfig.
 */
@RestController
@RequestMapping("/api/v1/planificacion/pago-personal")
@RequiredArgsConstructor
public class PagoPersonalController {

    private final RrhhService service;
    private final CuentaDepositoService cuentas;

    /** Los pagos de un mes (pendientes, por aprobar y pagados): es lo que caja ve para pagar. */
    @GetMapping("/planilla")
    public List<PagoResponse> planilla(@RequestParam String periodo) {
        return service.pagos(null, periodo);
    }

    /** Dónde se le deposita a una persona (para que caja sepa a qué cuenta pagar). */
    @GetMapping("/cuentas")
    public List<CuentaResponse> cuentas(@RequestParam Long personalId) {
        return cuentas.listar(personalId);
    }

    @GetMapping("/por-aprobar")
    public List<PagoResponse> porAprobar() {
        return service.porAprobar();
    }

    @GetMapping("/por-aprobar/conteo")
    public Map<String, Long> conteo() {
        return Map.of("pendientes", service.contarPorAprobar());
    }

    @PostMapping("/pagos/{id}/solicitar")
    public PagoResponse solicitar(@PathVariable Long id, @Valid @RequestBody PagarRequest request, @AuthenticationPrincipal Jwt jwt) {
        return service.solicitar(id, request, usuarioId(jwt));
    }

    @PostMapping("/pagos/{id}/aprobar")
    public PagoResponse aprobar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return service.aprobar(id, usuarioId(jwt));
    }

    @PostMapping("/pagos/{id}/rechazar")
    public PagoResponse rechazar(@PathVariable Long id, @Valid @RequestBody RechazoRequest request, @AuthenticationPrincipal Jwt jwt) {
        return service.rechazar(id, request.motivo(), usuarioId(jwt));
    }

    private static Long usuarioId(Jwt jwt) {
        Object v = jwt.getClaim("usuarioId");
        if (v instanceof Number n) return n.longValue();
        return v == null ? null : Long.valueOf(v.toString());
    }
}
