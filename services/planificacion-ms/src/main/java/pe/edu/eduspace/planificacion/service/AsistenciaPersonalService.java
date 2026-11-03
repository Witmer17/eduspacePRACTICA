package pe.edu.eduspace.planificacion.service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Marca;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.RegistroDia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.ResultadoDia;
import pe.edu.eduspace.planificacion.entity.AsistenciaPersonal;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.AsistenciaPersonalRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/** Asistencia diaria del personal: se registra el día completo de una vez y se consulta por rango de fechas. */
@Service
@RequiredArgsConstructor
@Transactional
public class AsistenciaPersonalService {

    /** Máximo de días que se consultan de una vez (un año). */
    static final int MAX_DIAS = 366;

    private final AsistenciaPersonalRepository repository;
    private final DocenteRepository personal;

    @Transactional(readOnly = true)
    public List<Asistencia> consultar(LocalDate desde, LocalDate hasta, Long personalId) {
        if (desde == null || hasta == null) throw new BusinessRuleException("Indica el rango de fechas (desde y hasta)");
        if (hasta.isBefore(desde)) throw new BusinessRuleException("La fecha final no puede ser anterior a la inicial");
        if (desde.plusDays(MAX_DIAS).isBefore(hasta)) throw new BusinessRuleException("El rango no puede pasar de " + MAX_DIAS + " días");
        var lista = personalId == null ? repository.findByFechaBetweenOrderByFechaAscIdAsc(desde, hasta)
                : repository.findByPersonalIdAndFechaBetweenOrderByFechaAsc(personalId, desde, hasta);
        return lista.stream().map(Asistencia::de).toList();
    }

    /** Guarda las marcas del día. Todo o nada: si una marca es inválida no se guarda ninguna. */
    public ResultadoDia registrarDia(RegistroDia r) {
        if (r.fecha().isAfter(LocalDate.now())) throw new BusinessRuleException("No se puede registrar asistencia de una fecha futura");
        Set<Long> vistos = new HashSet<>();
        int guardadas = 0;
        int borradas = 0;
        for (Marca m : r.marcas()) {
            if (!vistos.add(m.personalId())) throw new BusinessRuleException("La persona " + m.personalId() + " aparece repetida en el día");
            var existente = repository.findByPersonalIdAndFecha(m.personalId(), r.fecha());
            String estado = m.estado() == null ? "" : m.estado().trim().toUpperCase();
            if (estado.isEmpty()) {
                if (existente.isPresent()) {
                    repository.delete(existente.get());
                    borradas++;
                }
                continue;
            }
            if (!AsistenciaPersonal.ESTADOS.contains(estado)) throw new BusinessRuleException("Estado no válido: " + m.estado());
            Docente persona = personal.findById(m.personalId()).orElseThrow(() -> ResourceNotFoundException.of("Personal", m.personalId()));
            if (persona.getEstado() != EstadoDocente.ACTIVO) {
                throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le registra asistencia");
            }
            boolean horas = AsistenciaPersonal.llevaHoras(estado);
            if (horas && m.horaEntrada() != null && m.horaSalida() != null && m.horaSalida().isBefore(m.horaEntrada())) {
                throw new BusinessRuleException("La salida de " + persona.nombreCompleto() + " no puede ser anterior a su entrada");
            }
            AsistenciaPersonal a = existente.orElseGet(AsistenciaPersonal::new);
            a.setPersonal(persona);
            a.setFecha(r.fecha());
            a.setEstado(estado);
            a.setHoraEntrada(horas ? m.horaEntrada() : null);
            a.setHoraSalida(horas ? m.horaSalida() : null);
            a.setObservacion(m.observacion() == null || m.observacion().isBlank() ? null : m.observacion().trim());
            repository.save(a);
            guardadas++;
        }
        return new ResultadoDia(r.fecha(), guardadas, borradas);
    }
}
