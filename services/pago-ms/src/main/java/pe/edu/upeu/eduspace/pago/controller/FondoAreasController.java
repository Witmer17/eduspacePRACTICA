package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.FijarAsignacion;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.FijarVarias;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.Movimiento;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.Resumen;
import pe.edu.upeu.eduspace.pago.security.UsuarioActual;
import pe.edu.upeu.eduspace.pago.service.FondoAreasService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos/fondo")
@RequiredArgsConstructor
@Tag(name = "Fondo de áreas", description = "Reparto del dinero de caja entre las áreas de trabajo (solo ADMIN)")
public class FondoAreasController {

    private final FondoAreasService service;

    @GetMapping
    @Operation(summary = "Lo cobrado, lo asignado a las áreas y lo que queda disponible en caja")
    public Resumen resumen() {
        return service.resumen();
    }

    @PutMapping("/areas")
    @Operation(summary = "Reparte varias áreas a la vez (todo o nada); cada monto es el total que debe quedar en el área")
    public Resumen fijarVarias(@Valid @RequestBody FijarVarias request, @AuthenticationPrincipal Jwt jwt) {
        return service.fijarVarias(request.areas(), request.motivo(), UsuarioActual.id(jwt));
    }

    @PutMapping("/areas/{areaId}")
    @Operation(summary = "Deja asignado a un área el monto indicado (sale de caja o vuelve a caja la diferencia)")
    public Resumen fijar(@PathVariable Long areaId, @Valid @RequestBody FijarAsignacion request, @AuthenticationPrincipal Jwt jwt) {
        return service.fijarAsignacion(areaId, request.monto(), request.motivo(), UsuarioActual.id(jwt));
    }

    @GetMapping("/areas/{areaId}/movimientos")
    @Operation(summary = "Últimos movimientos de dinero de un área")
    public List<Movimiento> movimientos(@PathVariable Long areaId) {
        return service.movimientos(areaId);
    }
}
