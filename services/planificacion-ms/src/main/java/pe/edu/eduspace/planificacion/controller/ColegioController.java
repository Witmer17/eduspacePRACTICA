package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.eduspace.planificacion.dto.ColegioRequest;
import pe.edu.eduspace.planificacion.dto.ColegioResponse;
import pe.edu.eduspace.planificacion.entity.Colegio;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.ColegioRepository;

/** Datos de la institución (nombre, código modular, dirección, contacto…). Consulta con sesión; solo el administrador los modifica. */
@RestController
@RequestMapping("/api/v1/planificacion/colegio")
@RequiredArgsConstructor
public class ColegioController {

    private final ColegioRepository repository;
    private final PlanificacionMapper mapper;

    @GetMapping
    @Transactional(readOnly = true)
    public ColegioResponse obtener() {
        return mapper.toResponse(fila());
    }

    @PutMapping
    @Transactional
    public ColegioResponse actualizar(@Valid @RequestBody ColegioRequest request) {
        Colegio colegio = fila();
        mapper.update(request, colegio);
        if (colegio.getGestion() == null || colegio.getGestion().isBlank()) colegio.setGestion("PRIVADA");
        return mapper.toResponse(repository.save(colegio));
    }

    private Colegio fila() {
        return repository.findById(Colegio.ID).orElseThrow(() -> ResourceNotFoundException.of("Colegio", (long) Colegio.ID));
    }
}
