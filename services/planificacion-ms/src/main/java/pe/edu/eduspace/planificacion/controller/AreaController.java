package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AreaRequest;
import pe.edu.eduspace.planificacion.dto.AreaResponse;
import pe.edu.eduspace.planificacion.dto.AreaUpdateRequest;
import pe.edu.eduspace.planificacion.entity.Area;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AreaRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;
import pe.edu.eduspace.planificacion.util.Respuestas;

/**
 * Catálogo de áreas de trabajo del colegio. Cualquier usuario con sesión las consulta (por defecto solo las activas);
 * solo el administrador las crea, renombra, activa o desactiva.
 */
@RestController
@RequestMapping("/api/v1/planificacion/areas")
@RequiredArgsConstructor
public class AreaController {

    private final AreaRepository repository;
    private final DocenteRepository personal;
    private final PlanificacionMapper mapper;

    /** Con {@code todas=true} incluye las inactivas (para administrarlas). */
    @GetMapping
    @Transactional(readOnly = true)
    public List<AreaResponse> listar(@RequestParam(defaultValue = "false") boolean todas) {
        List<Area> areas = todas ? repository.findAllByOrderByNombre() : repository.findByActivoTrueOrderByNombre();
        return areas.stream().map(mapper::toResponse).toList();
    }

    @PostMapping
    @Transactional
    public ResponseEntity<AreaResponse> crear(@Valid @RequestBody AreaRequest request) {
        if (repository.existsByCodigo(request.codigo())) {
            throw new BusinessRuleException("Ya existe un área con el código " + request.codigo());
        }
        Area area = mapper.toEntity(request);
        area.setActivo(true);
        AreaResponse creada = mapper.toResponse(repository.save(area));
        return Respuestas.creado(creada.id(), creada);
    }

    @PutMapping("/{id}")
    @Transactional
    public AreaResponse actualizar(@PathVariable Long id, @Valid @RequestBody AreaUpdateRequest request) {
        Area area = buscar(id);
        area.setNombre(request.nombre().trim());
        area.setDescripcion(request.descripcion() == null || request.descripcion().isBlank() ? null : request.descripcion().trim());
        return mapper.toResponse(repository.save(area));
    }

    /** Activa o desactiva un área. Docencia no se desactiva y un área con personal activo tampoco. */
    @PatchMapping("/{id}/activo")
    @Transactional
    public AreaResponse cambiarEstado(@PathVariable Long id, @RequestParam boolean activo) {
        Area area = buscar(id);
        if (!activo) {
            if (Area.DOCENCIA.equals(area.getCodigo())) {
                throw new BusinessRuleException("El área Docencia no se puede desactivar: de ella salen los docentes que dictan cursos");
            }
            long activos = personal.countByAreaIdAndEstado(id, EstadoDocente.ACTIVO);
            if (activos > 0) {
                throw new BusinessRuleException("El área " + area.getNombre() + " tiene " + activos + " persona(s) activa(s): pásalas a otra área o dalas de baja antes de desactivarla");
            }
        }
        area.setActivo(activo);
        return mapper.toResponse(repository.save(area));
    }

    private Area buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Área", id));
    }
}
