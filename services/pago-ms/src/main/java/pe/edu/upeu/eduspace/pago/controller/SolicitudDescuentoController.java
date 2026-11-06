package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.AnularPagoRequest;
import pe.edu.upeu.eduspace.pago.security.UsuarioActual;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService.Opcion;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService.Pedido;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService.Vista;

import java.util.List;
import java.util.Map;
import java.util.Set;

/** Solicitud de descuento de la matrícula: la pide la familia (o la secretaría) y la prueba la secretaría. */
@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Solicitudes de descuento", description = "Pedir un descuento para la matrícula y que la secretaría lo apruebe o rechace")
public class SolicitudDescuentoController {

    private static final Set<String> PERSONAL = Set.of("ROLE_ADMIN", "ROLE_SECRETARIA", "ROLE_CAJERO");

    private final SolicitudDescuentoService servicio;

    @GetMapping("/solicitudes-descuento/opciones")
    @Operation(summary = "Descuentos que se pueden pedir para la matrícula (APODERADO, CAJERO, SECRETARIA, ADMIN)")
    public List<Opcion> opciones() {
        return servicio.opciones();
    }

    @PostMapping("/alumnos/{alumnoId}/matricula/descuento")
    @Operation(summary = "Pide un descuento para la matrícula del alumno; queda en revisión hasta que la secretaría responda")
    public ResponseEntity<Vista> solicitar(@PathVariable Long alumnoId, @RequestBody Pedido pedido, @AuthenticationPrincipal Jwt jwt, Authentication auth) {
        boolean personal = auth != null && auth.getAuthorities().stream().anyMatch(a -> PERSONAL.contains(a.getAuthority()));
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.solicitar(alumnoId, pedido, UsuarioActual.id(jwt), personal));
    }

    @GetMapping("/solicitudes-descuento")
    @Operation(summary = "Solicitudes de descuento en revisión (SECRETARIA, ADMIN)")
    public List<Vista> pendientes() {
        return servicio.pendientes();
    }

    @GetMapping("/solicitudes-descuento/conteo")
    @Operation(summary = "Cuántas solicitudes esperan respuesta (SECRETARIA, ADMIN)")
    public Map<String, Long> conteo() {
        return Map.of("pendientes", servicio.contarPendientes());
    }

    @PostMapping("/solicitudes-descuento/{id}/aprobar")
    @Operation(summary = "Aprueba: asigna el descuento al alumno y recalcula la cuota de matrícula (SECRETARIA, ADMIN)")
    public Vista aprobar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return servicio.aprobar(id, UsuarioActual.id(jwt));
    }

    @PostMapping("/solicitudes-descuento/{id}/rechazar")
    @Operation(summary = "Rechaza con un motivo que la familia verá (SECRETARIA, ADMIN)")
    public Vista rechazar(@PathVariable Long id, @Valid @RequestBody AnularPagoRequest req, @AuthenticationPrincipal Jwt jwt) {
        return servicio.rechazar(id, req.getMotivo(), UsuarioActual.id(jwt));
    }
}
