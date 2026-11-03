package pe.edu.upeu.eduspace.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.auth.dto.Dtos.*;
import pe.edu.upeu.eduspace.auth.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación")
public class AuthController {

    private final AuthService service;

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión (usuario o correo + clave)")
    public TokenResponse login(@Valid @RequestBody LoginRequest req) {
        return service.login(req.username(), req.password());
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar el access token; el refresh token se rota en cada uso")
    public TokenResponse refresh(@Valid @RequestBody RefreshRequest req) {
        return service.refrescar(req.refreshToken());
    }

    @PostMapping("/logout")
    @Operation(summary = "Cerrar sesión (revoca el refresh token)")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshRequest req) {
        service.logout(req.refreshToken());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/cambiar-clave")
    @Operation(summary = "Cambiar la propia clave (también en Keycloak); cierra las demás sesiones")
    public ResponseEntity<Void> cambiarClave(@Valid @RequestBody CambiarClaveRequest req, @AuthenticationPrincipal Jwt jwt) {
        service.cambiarClave(usuarioId(jwt), req.claveActual(), req.claveNueva());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/estado-clave")
    @Operation(summary = "¿La persona de la sesión debe cambiar su clave antes de continuar?")
    public EstadoClaveResponse estadoClave(@AuthenticationPrincipal Jwt jwt) {
        return new EstadoClaveResponse(service.debeCambiarClave(usuarioId(jwt)));
    }

    private static long usuarioId(Jwt jwt) {
        Object id = jwt.getClaim("usuarioId");
        if (!(id instanceof Number n)) throw new AccessDeniedException("El token no contiene usuarioId.");
        return n.longValue();
    }
}
