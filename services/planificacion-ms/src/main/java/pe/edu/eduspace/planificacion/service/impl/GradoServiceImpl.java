package pe.edu.eduspace.planificacion.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.GradoOfertaResponse;
import pe.edu.eduspace.planificacion.dto.GradoResponse;
import pe.edu.eduspace.planificacion.dto.OfertaGradosRequest;
import pe.edu.eduspace.planificacion.entity.Grado;
import pe.edu.eduspace.planificacion.entity.Nivel;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.GradoCursoRepository;
import pe.edu.eduspace.planificacion.repository.GradoRepository;
import pe.edu.eduspace.planificacion.repository.NivelRepository;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.service.GradoService;

@Service
@RequiredArgsConstructor
@Transactional
public class GradoServiceImpl implements GradoService {

    /** Grados que tiene cada nivel en la oferta estándar: Inicial 3, 4 y 5 años; Primaria 1.° a 6.°; Secundaria 1.° a 5.°. */
    static final Map<String, Integer> GRADOS_POR_NIVEL = new LinkedHashMap<>(Map.of("INICIAL", 3, "PRIMARIA", 6, "SECUNDARIA", 5));

    private final GradoRepository repository;
    private final NivelRepository nivelRepository;
    private final SeccionRepository seccionRepository;
    private final GradoCursoRepository gradoCursoRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<GradoResponse> listar(Long nivelId) {
        List<Grado> grados = nivelId == null
                ? repository.findAllByOrderByNivelOrdenAscNumeroAsc()
                : repository.findByNivelIdOrderByNumero(nivelId);
        // Solo los grados que el colegio ofrece: el resto de pantallas no deben ofrecer los desactivados.
        return grados.stream().filter(g -> Boolean.TRUE.equals(g.getActivo())).map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public GradoResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public GradoResponse actualizar(Long id, CatalogoUpdateRequest request) {
        Grado grado = buscar(id);
        grado.setNombre(request.nombre());
        if (request.activo() != null) {
            grado.setActivo(request.activo());
        }
        return mapper.toResponse(repository.save(grado));
    }

    @Override
    @Transactional(readOnly = true)
    public List<GradoOfertaResponse> oferta() {
        List<GradoOfertaResponse> r = new ArrayList<>();
        for (Nivel nivel : nivelesEstandar()) {
            for (int numero = 1; numero <= GRADOS_POR_NIVEL.get(nivel.getCodigo()); numero++) {
                Grado existente = repository.findByNivelIdAndNumero(nivel.getId(), (short) numero).orElse(null);
                long secciones = existente == null ? 0 : seccionRepository.countByGradoId(existente.getId());
                long cursos = existente == null ? 0 : gradoCursoRepository.countByGradoId(existente.getId());
                r.add(new GradoOfertaResponse(existente == null ? null : existente.getId(), nivel.getCodigo(), nivel.getNombre(), numero,
                        nombreEstandar(nivel, numero), existente != null && Boolean.TRUE.equals(existente.getActivo()),
                        secciones + cursos > 0, detalleUso(secciones, cursos)));
            }
        }
        return r;
    }

    @Override
    public List<GradoOfertaResponse> actualizarOferta(OfertaGradosRequest request) {
        Set<String> elegidos = new HashSet<>();
        for (OfertaGradosRequest.Clave c : request.seleccionados()) {
            Integer max = GRADOS_POR_NIVEL.get(c.nivelCodigo());
            if (max == null || c.numero() < 1 || c.numero() > max) {
                throw new BusinessRuleException("«" + c.nivelCodigo() + " " + c.numero() + "» no es un grado de la oferta estándar");
            }
            elegidos.add(clave(c.nivelCodigo(), c.numero()));
        }

        // Primero se revisa todo: si algún grado desmarcado está en uso, no se cambia nada.
        List<String> enUso = new ArrayList<>();
        for (Nivel nivel : nivelesEstandar()) {
            for (int numero = 1; numero <= GRADOS_POR_NIVEL.get(nivel.getCodigo()); numero++) {
                if (elegidos.contains(clave(nivel.getCodigo(), numero))) continue;
                Grado existente = repository.findByNivelIdAndNumero(nivel.getId(), (short) numero).orElse(null);
                if (existente != null && Boolean.TRUE.equals(existente.getActivo())
                        && (seccionRepository.countByGradoId(existente.getId()) > 0 || gradoCursoRepository.countByGradoId(existente.getId()) > 0)) {
                    enUso.add(existente.getNombre());
                }
            }
        }
        if (!enUso.isEmpty()) {
            throw new BusinessRuleException("No se pueden quitar " + String.join(", ", enUso)
                    + ": tienen secciones o cursos en su malla. Quítalos primero de la estructura académica.");
        }

        for (Nivel nivel : nivelesEstandar()) {
            for (int numero = 1; numero <= GRADOS_POR_NIVEL.get(nivel.getCodigo()); numero++) {
                boolean elegido = elegidos.contains(clave(nivel.getCodigo(), numero));
                Grado existente = repository.findByNivelIdAndNumero(nivel.getId(), (short) numero).orElse(null);
                if (elegido && existente == null) {
                    Grado g = new Grado();
                    g.setNivel(nivel);
                    g.setNumero((short) numero);
                    g.setNombre(nombreEstandar(nivel, numero));
                    g.setActivo(true);
                    repository.save(g);
                } else if (existente != null && Boolean.TRUE.equals(existente.getActivo()) != elegido) {
                    existente.setActivo(elegido);
                    repository.save(existente);
                }
            }
        }
        return oferta();
    }

    private List<Nivel> nivelesEstandar() {
        return nivelRepository.findAllByOrderByOrden().stream().filter(n -> GRADOS_POR_NIVEL.containsKey(n.getCodigo())).toList();
    }

    /** «3 años» en Inicial (la edad); «1° de Primaria» en los demás niveles. */
    static String nombreEstandar(Nivel nivel, int numero) {
        return "INICIAL".equals(nivel.getCodigo()) ? (numero + 2) + " años" : numero + "° de " + nivel.getNombre();
    }

    private static String clave(String nivelCodigo, int numero) {
        return nivelCodigo + ":" + numero;
    }

    private static String detalleUso(long secciones, long cursos) {
        if (secciones + cursos == 0) return null;
        List<String> partes = new ArrayList<>();
        if (secciones > 0) partes.add(secciones + (secciones == 1 ? " sección" : " secciones"));
        if (cursos > 0) partes.add(cursos + (cursos == 1 ? " curso en su malla" : " cursos en su malla"));
        return String.join(" y ", partes);
    }

    private Grado buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Grado", id));
    }
}
