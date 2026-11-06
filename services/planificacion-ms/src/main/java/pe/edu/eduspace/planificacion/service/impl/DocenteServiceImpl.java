package pe.edu.eduspace.planificacion.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.DocenteRequest;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.PageResponse;
import pe.edu.eduspace.planificacion.entity.Area;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AreaRepository;
import pe.edu.eduspace.planificacion.repository.AsignacionRepository;
import pe.edu.eduspace.planificacion.repository.CursoRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.service.DocenteService;

/** Registro del personal del colegio. Cada persona pertenece a un área; solo la de Docencia dicta cursos y puede ser tutora. */
@Service
@RequiredArgsConstructor
@Transactional
public class DocenteServiceImpl implements DocenteService {

    private final DocenteRepository repository;
    private final AreaRepository areaRepository;
    private final CursoRepository cursoRepository;
    private final AsignacionRepository asignacionRepository;
    private final SeccionRepository seccionRepository;
    private final PlanificacionMapper mapper;
    private final pe.edu.eduspace.planificacion.service.RrhhService rrhh;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DocenteResponse> buscar(String q, Pageable pageable) {
        return buscar(q, null, false, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DocenteResponse> buscar(String q, Long areaId, boolean todas, Pageable pageable) {
        String texto = q == null ? "" : q.trim();
        if (areaId == null && todas) {
            return PageResponse.of(repository.buscar(texto, pageable).map(mapper::toResponse));
        }
        Long area = areaId != null ? areaId : areaDocencia().getId();
        return PageResponse.of(repository.buscarPorArea(texto, area, pageable).map(mapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DocenteResponse> buscar(String q, Long areaId, boolean todas, pe.edu.eduspace.planificacion.entity.EstadoDocente estado, Pageable pageable) {
        if (estado == null) {
            return buscar(q, areaId, todas, pageable);
        }
        String texto = q == null ? "" : q.trim();
        if (areaId == null && todas) {
            return PageResponse.of(repository.buscarPorEstado(texto, estado, pageable).map(mapper::toResponse));
        }
        Long area = areaId != null ? areaId : areaDocencia().getId();
        return PageResponse.of(repository.buscarPorAreaYEstado(texto, area, estado, pageable).map(mapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public DocenteResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public DocenteResponse crear(DocenteRequest request) {
        String tipo = tipoDocumento(request);
        if (repository.existsByTipoDocumentoAndNumeroDocumento(tipo, request.numeroDocumento())) {
            throw new BusinessRuleException("Ya existe una persona del personal con " + tipo + " " + request.numeroDocumento());
        }
        Docente docente = mapper.toEntity(request);
        docente.setTipoDocumento(tipo);
        docente.setEstado(EstadoDocente.ACTIVO);
        docente.setArea(request.areaId() == null ? areaDocencia() : areaActiva(request.areaId()));
        aplicarCursos(docente, request);
        return mapper.toResponse(repository.save(docente));
    }

    /**
     * Fija los cursos que puede dictar. Solo el área Docencia los tiene: para otra área, pedir cursos es un error y al pasar a otra
     * área se vacían. Si no se escribió una especialidad, se arma con los nombres de los cursos (así el armado automático la entiende).
     */
    private void aplicarCursos(Docente docente, DocenteRequest request) {
        if (!docente.esDocente()) {
            if (request.cursoIds() != null && !request.cursoIds().isEmpty()) {
                throw new BusinessRuleException("Solo el personal del área Docencia dicta cursos");
            }
            docente.getCursos().clear();
            return;
        }
        if (request.cursoIds() == null) return;
        var ids = new java.util.LinkedHashSet<>(request.cursoIds());
        var cursos = cursoRepository.findAllById(ids);
        if (cursos.size() != ids.size()) {
            throw new BusinessRuleException("Alguno de los cursos elegidos no existe");
        }
        docente.getCursos().clear();
        docente.getCursos().addAll(cursos);
        if ((docente.getEspecialidad() == null || docente.getEspecialidad().isBlank()) && !cursos.isEmpty()) {
            String nombres = cursos.stream().map(c -> c.getNombre()).sorted().collect(java.util.stream.Collectors.joining(", "));
            docente.setEspecialidad(nombres.length() <= 100 ? nombres : nombres.substring(0, 97) + "...");
        }
    }

    @Override
    public DocenteResponse actualizar(Long id, DocenteRequest request) {
        Docente docente = buscar(id);
        String tipo = tipoDocumento(request);
        if (repository.existsByTipoDocumentoAndNumeroDocumentoAndIdNot(tipo, request.numeroDocumento(), id)) {
            throw new BusinessRuleException("Ya existe otra persona del personal con " + tipo + " " + request.numeroDocumento());
        }
        Area nueva = request.areaId() == null ? docente.getArea() : areaActiva(request.areaId());
        if (docente.esDocente() && !Area.DOCENCIA.equals(nueva.getCodigo())
                && (asignacionRepository.existsByDocenteId(id) || seccionRepository.countByTutorId(id) > 0)) {
            throw new BusinessRuleException(docente.nombreCompleto() + " dicta cursos o es tutor(a): quita sus asignaciones antes de pasarla a otra área");
        }
        mapper.update(request, docente);
        docente.setTipoDocumento(tipo);
        docente.setArea(nueva);
        aplicarCursos(docente, request);
        return mapper.toResponse(repository.save(docente));
    }

    @Override
    public DocenteResponse vincularUsuario(Long id, Long usuarioId) {
        Docente docente = buscar(id);
        if (repository.existsByUsuarioIdAndIdNot(usuarioId, id)) {
            throw new BusinessRuleException("El usuario " + usuarioId + " ya está vinculado a otra persona del personal");
        }
        docente.setUsuarioId(usuarioId);
        return mapper.toResponse(repository.save(docente));
    }

    @Override
    public void eliminar(Long id) {
        Docente docente = buscar(id);
        if (asignacionRepository.existsByDocenteId(id) || seccionRepository.countByTutorId(id) > 0 || rrhh.tieneHistorial(id)) {
            docente.setEstado(EstadoDocente.INACTIVO);
            repository.save(docente);
        } else {
            repository.delete(docente);
        }
    }

    private Area areaDocencia() {
        return areaRepository.findByCodigo(Area.DOCENCIA)
                .orElseThrow(() -> new BusinessRuleException("Falta el área Docencia en el catálogo de áreas"));
    }

    private Area areaActiva(Long areaId) {
        Area area = areaRepository.findById(areaId).orElseThrow(() -> ResourceNotFoundException.of("Área", areaId));
        if (!Boolean.TRUE.equals(area.getActivo())) {
            throw new BusinessRuleException("El área " + area.getNombre() + " está inactiva");
        }
        return area;
    }

    private String tipoDocumento(DocenteRequest request) {
        return request.tipoDocumento() == null || request.tipoDocumento().isBlank() ? "DNI" : request.tipoDocumento();
    }

    private Docente buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Personal", id));
    }
}
