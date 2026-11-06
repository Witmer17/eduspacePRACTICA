package pe.edu.upeu.eduspace.matricula.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.InternalMatricula;
import pe.edu.upeu.eduspace.matricula.service.MatriculaEnLineaService;
import pe.edu.upeu.eduspace.matricula.service.MatriculaService;

import java.util.List;

/** Solo accesible dentro de la red: el Gateway no enruta /internal/**. */
@RestController
@RequestMapping("/internal/matriculas")
@RequiredArgsConstructor
@Tag(name = "Internal Matrícula")
public class InternalMatriculaController {

    private final MatriculaService service;
    private final MatriculaEnLineaService enLinea;

    @GetMapping("/seccion/{seccionId}")
    public List<InternalMatricula> deSeccion(@PathVariable Long seccionId) {
        return service.vivasDeSeccion(seccionId);
    }

    /** Lo que pago-ms avisa cuando la secretaría resuelve un descuento por hermano pedido desde la matrícula en línea. */
    public record DescuentoResuelto(String estado, String descuento, String motivo) {}

    /** La secretaría resolvió el descuento por hermano: se crean las cuentas del apoderado y se le avisa por correo que ya puede pagar. */
    @PostMapping("/{matriculaId}/descuento-hermano-resuelto")
    public void descuentoHermanoResuelto(@PathVariable Long matriculaId, @RequestBody DescuentoResuelto body) {
        enLinea.descuentoResuelto(matriculaId, body.estado(), body.descuento(), body.motivo());
    }

    @GetMapping("/alumno/{alumnoId}")
    public InternalMatricula deAlumno(@PathVariable Long alumnoId, @RequestParam(required = false) Long anioId) {
        return service.vigenteDeAlumno(alumnoId, anioId);
    }
}
