package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.RegistroDia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.ResultadoDia;
import pe.edu.eduspace.planificacion.service.AsistenciaPersonalService;

/** Asistencia del personal: lectura y escritura solo para ADMIN y SECRETARIA (ver SecurityConfig). */
@RestController
@RequestMapping("/api/v1/planificacion/asistencia-personal")
@RequiredArgsConstructor
public class AsistenciaPersonalController {

    private final AsistenciaPersonalService service;

    @GetMapping
    public List<Asistencia> consultar(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
                                      @RequestParam(required = false) Long personalId) {
        return service.consultar(desde, hasta, personalId);
    }

    @PutMapping("/dia")
    public ResultadoDia registrarDia(@Valid @RequestBody RegistroDia request) {
        return service.registrarDia(request);
    }
}
