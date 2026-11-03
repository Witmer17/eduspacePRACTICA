package pe.edu.eduspace.planificacion.service;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/**
 * Lo que cada persona del personal puede ver de sí misma: su ficha, su contrato, sus pagos, su asistencia y su cuenta de depósito.
 * La persona sale SIEMPRE de la sesión (claim usuarioId del JWT), nunca de un parámetro: nadie puede pedir los datos de otra persona.
 * Es solo lectura; los cambios los hace la administración.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MiPersonalService {

    private final DocenteRepository personal;
    private final DocenteService docentes;
    private final RrhhService rrhh;
    private final CuentaDepositoService cuentas;
    private final AsistenciaPersonalService asistencia;

    /** El id de la persona vinculada a la cuenta; 404 si la cuenta no está vinculada a nadie del personal. */
    private Long idDe(Long usuarioId) {
        if (usuarioId == null) throw new ResourceNotFoundException("Tu cuenta no está vinculada a una persona del personal");
        return personal.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Tu cuenta no está vinculada a una persona del personal")).getId();
    }

    public DocenteResponse ficha(Long usuarioId) {
        return docentes.obtener(idDe(usuarioId));
    }

    public List<ContratoResponse> contratos(Long usuarioId) {
        return rrhh.contratos(idDe(usuarioId));
    }

    public List<PagoResponse> pagos(Long usuarioId, String periodo) {
        return rrhh.pagos(idDe(usuarioId), periodo);
    }

    public List<CuentaResponse> cuentas(Long usuarioId) {
        return cuentas.listar(idDe(usuarioId));
    }

    public List<Asistencia> asistencia(Long usuarioId, LocalDate desde, LocalDate hasta) {
        return asistencia.consultar(desde, hasta, idDe(usuarioId));
    }
}
