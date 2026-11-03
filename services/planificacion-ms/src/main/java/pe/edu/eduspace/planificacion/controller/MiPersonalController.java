package pe.edu.eduspace.planificacion.controller;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.service.MiPersonalService;

/**
 * Los datos propios de quien trabaja en el colegio (docente, caja, secretaría…): su contrato, sus pagos, su asistencia y su cuenta de depósito.
 * Solo lectura y siempre de la persona de la sesión; no recibe ningún id (ver SecurityConfig: lectura para cualquier sesión iniciada).
 */
@RestController
@RequestMapping("/api/v1/planificacion/mi-personal")
@RequiredArgsConstructor
public class MiPersonalController {

    private final MiPersonalService service;

    @GetMapping
    public DocenteResponse ficha(@AuthenticationPrincipal Jwt jwt) {
        return service.ficha(jwt.getClaim("usuarioId"));
    }

    @GetMapping("/contratos")
    public List<ContratoResponse> contratos(@AuthenticationPrincipal Jwt jwt) {
        return service.contratos(jwt.getClaim("usuarioId"));
    }

    @GetMapping("/pagos")
    public List<PagoResponse> pagos(@AuthenticationPrincipal Jwt jwt, @RequestParam(required = false) String periodo) {
        return service.pagos(jwt.getClaim("usuarioId"), periodo);
    }

    @GetMapping("/cuentas")
    public List<CuentaResponse> cuentas(@AuthenticationPrincipal Jwt jwt) {
        return service.cuentas(jwt.getClaim("usuarioId"));
    }

    @GetMapping("/asistencia")
    public List<Asistencia> asistencia(@AuthenticationPrincipal Jwt jwt,
                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return service.asistencia(jwt.getClaim("usuarioId"), desde, hasta);
    }
}
