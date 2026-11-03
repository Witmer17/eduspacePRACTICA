package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import pe.edu.eduspace.planificacion.entity.AsistenciaPersonal;

/** Asistencia del personal. */
public final class AsistenciaPersonalDtos {

    private AsistenciaPersonalDtos() {
    }

    /** {@code estado} vacío = dejar el día sin marcar (borra el registro si existía). */
    public record Marca(@NotNull Long personalId, String estado, LocalTime horaEntrada, LocalTime horaSalida, @Size(max = 255) String observacion) {
    }

    public record RegistroDia(@NotNull LocalDate fecha, @NotEmpty List<@Valid Marca> marcas) {
    }

    public record Asistencia(Long id, Long personalId, String personalNombre, String areaNombre, LocalDate fecha, String estado,
                             LocalTime horaEntrada, LocalTime horaSalida, String observacion) {

        public static Asistencia de(AsistenciaPersonal a) {
            var p = a.getPersonal();
            return new Asistencia(a.getId(), p.getId(), p.nombreCompleto(), p.getArea() == null ? null : p.getArea().getNombre(),
                    a.getFecha(), a.getEstado(), a.getHoraEntrada(), a.getHoraSalida(), a.getObservacion());
        }
    }

    public record ResultadoDia(LocalDate fecha, int guardadas, int borradas) {
    }
}
