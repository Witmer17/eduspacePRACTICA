package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.GradoOfertaResponse;
import pe.edu.eduspace.planificacion.dto.GradoResponse;
import pe.edu.eduspace.planificacion.dto.OfertaGradosRequest;

public interface GradoService {
    /** Los grados que ofrece el colegio (activos). */
    List<GradoResponse> listar(Long nivelId);

    /** Los grados posibles (oferta estándar) marcando cuáles ofrece el colegio y cuáles están en uso. */
    List<GradoOfertaResponse> oferta();

    /** Deja como ofrecidos solo los grados indicados: crea o activa los elegidos y desactiva los demás si no están en uso. */
    List<GradoOfertaResponse> actualizarOferta(OfertaGradosRequest request);

    GradoResponse obtener(Long id);

    GradoResponse actualizar(Long id, CatalogoUpdateRequest request);
}
