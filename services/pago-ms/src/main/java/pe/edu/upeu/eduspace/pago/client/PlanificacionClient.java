package pe.edu.upeu.eduspace.pago.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;

@FeignClient(name = "planificacion-ms", fallback = PlanificacionClient.PlanificacionClientFallback.class)
public interface PlanificacionClient {

    /** Año académico (id, nombre, fechaInicio, fechaFin, estado). */
    @GetMapping("/internal/anios/{id}")
    AnioInterno getAnio(@PathVariable("id") Long anioId);

    record AnioInterno(Long id, String nombre, LocalDate fechaInicio, LocalDate fechaFin, String estado) {}

    /** Sección con su turno (para mostrar a Caja de qué grado y sección es la matrícula). */
    @GetMapping("/internal/secciones/{id}")
    SeccionInterna getSeccion(@PathVariable("id") Long seccionId);

    @GetMapping("/internal/grados/{id}")
    GradoInterno getGrado(@PathVariable("id") Long gradoId);

    record SeccionInterna(Long id, String nombre, Long gradoId, Long nivelId, Long anioId, Short capacidad, String turno, Long tutorDocenteId) {}

    record GradoInterno(Long id, Long nivelId, String nivelNombre, Short numero, String nombre, Boolean activo) {}

    @Component
    class PlanificacionClientFallback implements PlanificacionClient {
        @Override
        public AnioInterno getAnio(Long anioId) {
            return null;
        }

        @Override
        public SeccionInterna getSeccion(Long seccionId) {
            return null;
        }

        @Override
        public GradoInterno getGrado(Long gradoId) {
            return null;
        }
    }
}
