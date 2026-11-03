package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.GradoOfertaResponse;
import pe.edu.eduspace.planificacion.dto.GradoResponse;
import pe.edu.eduspace.planificacion.dto.NivelResponse;
import pe.edu.eduspace.planificacion.dto.OfertaGradosRequest;
import pe.edu.eduspace.planificacion.service.GradoService;
import pe.edu.eduspace.planificacion.service.NivelService;

@RestController
@RequestMapping("/api/v1/planificacion")
@RequiredArgsConstructor
public class NivelGradoController {

    private final NivelService nivelService;
    private final GradoService gradoService;

    @GetMapping("/niveles")
    public List<NivelResponse> niveles() {
        return nivelService.listar();
    }

    @GetMapping("/niveles/{id}")
    public NivelResponse nivel(@PathVariable Long id) {
        return nivelService.obtener(id);
    }

    @PutMapping("/niveles/{id}")
    public NivelResponse actualizarNivel(@PathVariable Long id, @Valid @RequestBody CatalogoUpdateRequest request) {
        return nivelService.actualizar(id, request);
    }

    @GetMapping("/grados")
    public List<GradoResponse> grados(@RequestParam(required = false) Long nivelId) {
        return gradoService.listar(nivelId);
    }

    /** Los 14 grados posibles (Inicial, Primaria y Secundaria), marcando cuáles ofrece el colegio. */
    @GetMapping("/grados/oferta")
    public List<GradoOfertaResponse> oferta() {
        return gradoService.oferta();
    }

    /** Elige los grados que ofrece el colegio (solo el administrador). */
    @PutMapping("/grados/oferta")
    public List<GradoOfertaResponse> actualizarOferta(@Valid @RequestBody OfertaGradosRequest request) {
        return gradoService.actualizarOferta(request);
    }

    @GetMapping("/grados/{id}")
    public GradoResponse grado(@PathVariable Long id) {
        return gradoService.obtener(id);
    }

    @PutMapping("/grados/{id}")
    public GradoResponse actualizarGrado(@PathVariable Long id, @Valid @RequestBody CatalogoUpdateRequest request) {
        return gradoService.actualizar(id, request);
    }
}
