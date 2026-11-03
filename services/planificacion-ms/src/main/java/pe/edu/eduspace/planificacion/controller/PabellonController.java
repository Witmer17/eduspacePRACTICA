package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AulaResponse;
import pe.edu.eduspace.planificacion.dto.AulasPabellonRequest;
import pe.edu.eduspace.planificacion.dto.CapacidadesPabellonRequest;
import pe.edu.eduspace.planificacion.dto.PabellonRequest;
import pe.edu.eduspace.planificacion.dto.PabellonResponse;
import pe.edu.eduspace.planificacion.entity.Aula;
import pe.edu.eduspace.planificacion.entity.Pabellon;
import pe.edu.eduspace.planificacion.entity.Seccion;
import pe.edu.eduspace.planificacion.entity.TipoAula;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.AulaRepository;
import pe.edu.eduspace.planificacion.repository.PabellonRepository;
import pe.edu.eduspace.planificacion.util.CodigosAula;
import pe.edu.eduspace.planificacion.util.Respuestas;

/**
 * Pabellones del colegio: el nombre lo decide el usuario (A, B, «Central»…) y declara cuántas aulas tiene.
 * Se consultan con sesión; solo el administrador los crea, cambia o elimina.
 */
@RestController
@RequestMapping("/api/v1/planificacion/pabellones")
@RequiredArgsConstructor
public class PabellonController {

    private static final short DEFECTO_CAPACIDAD = 30;

    private final PabellonRepository repository;
    private final AulaRepository aulas;
    private final SeccionRepository secciones;
    private final PlanificacionMapper mapper;

    @GetMapping
    @Transactional(readOnly = true)
    public List<PabellonResponse> listar() {
        return repository.findAllByOrderByNombre().stream().map(this::respuesta).toList();
    }

    @PostMapping
    @Transactional
    public ResponseEntity<PabellonResponse> crear(@Valid @RequestBody PabellonRequest request) {
        String nombre = request.nombre().trim();
        if (repository.existsByNombreIgnoreCase(nombre)) {
            throw new BusinessRuleException("Ya existe un pabellón llamado «" + nombre + "»");
        }
        Pabellon p = new Pabellon();
        p.setNombre(nombre);
        p.setCantidadAulas(request.cantidadAulas());
        PabellonResponse creado = respuesta(repository.save(p));
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    @Transactional
    public PabellonResponse actualizar(@PathVariable Long id, @Valid @RequestBody PabellonRequest request) {
        Pabellon p = buscar(id);
        String nombre = request.nombre().trim();
        if (repository.existsByNombreIgnoreCaseAndIdNot(nombre, id)) {
            throw new BusinessRuleException("Ya existe un pabellón llamado «" + nombre + "»");
        }
        long registradas = aulas.countByPabellonId(id);
        if (request.cantidadAulas() < registradas) {
            throw new BusinessRuleException("El pabellón " + p.getNombre() + " ya tiene " + registradas
                    + " aulas registradas: no puede declarar menos. Mueve o elimina aulas primero.");
        }
        p.setNombre(nombre);
        p.setCantidadAulas(request.cantidadAulas());
        return respuesta(repository.save(p));
    }

    /**
     * Crea las aulas que le faltan al pabellón para llegar a las que declara (códigos «A-01», «A-02»…). Si ya están todas, no hace nada.
     * Cada aula nace activa, de tipo AULA y con la capacidad indicada (30 por defecto).
     */
    @PostMapping("/{id}/aulas")
    @Transactional
    public PabellonResponse crearAulas(@PathVariable Long id, @Valid @RequestBody(required = false) AulasPabellonRequest request) {
        Pabellon p = buscar(id);
        long faltan = p.getCantidadAulas() - aulas.countByPabellonId(id);
        if (faltan > 0) {
            short capacidad = request == null || request.capacidad() == null ? DEFECTO_CAPACIDAD : request.capacidad();
            for (String codigo : CodigosAula.siguientes(p.getNombre(), (int) faltan, aulas::existsByCodigo)) {
                Aula aula = new Aula();
                aula.setCodigo(codigo);
                aula.setNombre("Aula " + codigo);
                aula.setTipo(TipoAula.AULA);
                aula.setCapacidad(capacidad);
                aula.setActivo(true);
                aula.setPabellon(p);
                aulas.save(aula);
            }
        }
        return respuesta(p);
    }

    /**
     * Fija cuántos alumnos caben en cada aula del pabellón, todo o nada. Rechaza una capacidad menor que las vacantes de una sección
     * que ya usa esa aula (hay que bajar primero las vacantes de la sección) y las aulas que no son del pabellón.
     */
    @PutMapping("/{id}/capacidades")
    @Transactional
    public List<AulaResponse> fijarCapacidades(@PathVariable Long id, @Valid @RequestBody CapacidadesPabellonRequest request) {
        Pabellon p = buscar(id);
        Map<Long, Aula> delPabellon = aulas.findByPabellonIdOrderByCodigo(id).stream().collect(Collectors.toMap(Aula::getId, a -> a));
        List<String> problemas = new ArrayList<>();
        for (CapacidadesPabellonRequest.Item item : request.aulas()) {
            Aula aula = delPabellon.get(item.aulaId());
            if (aula == null) {
                throw new BusinessRuleException("El aula " + item.aulaId() + " no pertenece al pabellón " + p.getNombre());
            }
            for (Seccion s : secciones.findByAulaIdAndActivoTrue(aula.getId())) {
                if (s.getCapacidad() > item.capacidad()) {
                    problemas.add(aula.getCodigo() + " la usa " + s.getGrado().getNombre() + " «" + s.getNombre() + "» con " + s.getCapacidad() + " vacantes");
                }
            }
        }
        if (!problemas.isEmpty()) {
            throw new BusinessRuleException("No se pudo cambiar: " + String.join("; ", problemas) + ". Baja primero las vacantes de esa sección.");
        }
        for (CapacidadesPabellonRequest.Item item : request.aulas()) {
            delPabellon.get(item.aulaId()).setCapacidad(item.capacidad());
        }
        aulas.saveAll(delPabellon.values());
        return aulas.findByPabellonIdOrderByCodigo(id).stream().map(mapper::toResponse).toList();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Pabellon p = buscar(id);
        long registradas = aulas.countByPabellonId(id);
        if (registradas > 0) {
            throw new BusinessRuleException("El pabellón " + p.getNombre() + " tiene " + registradas + " aulas registradas: muévelas a otro pabellón antes de eliminarlo");
        }
        repository.delete(p);
        return ResponseEntity.noContent().build();
    }

    private PabellonResponse respuesta(Pabellon p) {
        return new PabellonResponse(p.getId(), p.getNombre(), p.getCantidadAulas(), aulas.countByPabellonId(p.getId()), aulas.sumaCapacidad(p.getId()));
    }

    private Pabellon buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Pabellón", id));
    }
}
