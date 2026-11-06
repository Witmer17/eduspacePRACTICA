package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.AnularDepositoRequest;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Credito;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.DepositoRequest;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Resultado;
import pe.edu.upeu.eduspace.pago.security.UsuarioActual;
import pe.edu.upeu.eduspace.pago.service.CreditoService;

/** Crédito del alumno: consulta (caja, secretaría, administración), depósitos y cobro (caja y administración) y anulación de depósitos (administración). */
@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Crédito del alumno", description = "Saldo a favor que se cobra solo de las pensiones cuando vencen")
public class CreditoController {

    private final CreditoService creditos;

    @GetMapping("/alumnos/{alumnoId}/credito")
    @Operation(summary = "Crédito del alumno: saldo, lo que ya toca cobrar, lo que faltaría, y sus movimientos")
    public Credito consultar(@PathVariable Long alumnoId) {
        return creditos.consultar(alumnoId);
    }

    @PostMapping("/alumnos/{alumnoId}/credito/depositos")
    @Operation(summary = "Depositar al crédito del alumno (CAJERO, ADMIN); cobra enseguida lo que ya toque")
    public ResponseEntity<Resultado> depositar(@PathVariable Long alumnoId, @Valid @RequestBody DepositoRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(creditos.depositar(alumnoId, req.monto(), req.medio(), req.referencia(), req.idempotencyKey(), UsuarioActual.id(jwt)));
    }

    @PostMapping("/alumnos/{alumnoId}/credito/cobrar")
    @Operation(summary = "Cobrar ahora del crédito las pensiones vencidas (CAJERO, ADMIN)")
    public Resultado cobrar(@PathVariable Long alumnoId, @AuthenticationPrincipal Jwt jwt) {
        return creditos.cobrarAhora(alumnoId, UsuarioActual.id(jwt));
    }

    @PostMapping("/creditos/movimientos/{id}/anular")
    @Operation(summary = "Anular un depósito mal registrado (ADMIN)")
    public ResponseEntity<Void> anularDeposito(@PathVariable Long id, @Valid @RequestBody AnularDepositoRequest req, @AuthenticationPrincipal Jwt jwt) {
        creditos.anularDeposito(id, req.motivo(), UsuarioActual.id(jwt));
        return ResponseEntity.noContent().build();
    }
}
