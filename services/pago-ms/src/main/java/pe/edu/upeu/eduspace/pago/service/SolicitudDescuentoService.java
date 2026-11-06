package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import pe.edu.upeu.eduspace.pago.client.AlumnosGateway;
import pe.edu.upeu.eduspace.pago.client.MatriculaClient;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.entity.Descuento;
import pe.edu.upeu.eduspace.pago.entity.DescuentoAlumno;
import pe.edu.upeu.eduspace.pago.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.pago.entity.SolicitudDescuento;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import pe.edu.upeu.eduspace.pago.repository.DescuentoAlumnoRepository;
import pe.edu.upeu.eduspace.pago.repository.DescuentoRepository;
import pe.edu.upeu.eduspace.pago.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.pago.repository.SolicitudDescuentoRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Solicitud de descuento de la matrícula (hermanos, etc.). La familia o la secretaría la piden; mientras está EN REVISIÓN la matrícula no se
 * puede pagar ni generar (lo valida el servidor en todos los caminos de pago). La secretaría la aprueba —se asigna el descuento al alumno y se
 * recalcula la cuota de matrícula— o la rechaza con un motivo; después se paga el monto que corresponda.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SolicitudDescuentoService {

    private final SolicitudDescuentoRepository solicitudes;
    private final DescuentoRepository descuentos;
    private final DescuentoAlumnoRepository descuentosAlumno;
    private final MatriculaLocalRepository matriculas;
    private final CuotaRepository cuotas;
    private final GeneradorCuotasService generador;
    private final MatriculaPagoService matriculaPago;
    private final AlumnosGateway alumnosGateway;
    private final MatriculaClient matriculaClient;

    public record Opcion(Long id, String nombre, String tipo, BigDecimal valor) {}

    public record Pedido(Long descuentoId, String motivo, Long hermanoAlumnoId) {}

    /** Lo que declara la familia en la matrícula en línea (el hermano se ubica por su documento si ya es alumno del colegio). */
    public record PedidoPublico(Long matriculaId, Long descuentoId, Long hermanoAlumnoId, String hermanoDocumento, String hermanoNombre) {}

    public record Vista(Long id, Long alumnoId, String alumnoNombre, Long matriculaId, String descuentoNombre, String tipo, BigDecimal valor,
                        String motivo, Long hermanoAlumnoId, String hermanoNombre, Boolean hermanoMatriculado, String estado, String motivoResolucion,
                        LocalDateTime solicitadaEn, BigDecimal matriculaImporte, BigDecimal matriculaConDescuento,
                        String origen, String hermanoDocumento) {}

    /** El monto de la matrícula tras aplicar el descuento (nunca negativo). */
    public static BigDecimal montoConDescuento(BigDecimal montoBase, BigDecimal descuento) {
        return montoBase.subtract(descuento == null ? BigDecimal.ZERO : descuento).max(BigDecimal.ZERO);
    }

    /** Los descuentos que se pueden pedir para la matrícula (los activos que aplican a matrícula o a todo). */
    @Transactional(readOnly = true)
    public List<Opcion> opciones() {
        return descuentos.findByActivoTrue().stream()
            .filter(d -> "MATRICULA".equals(d.getAplicaA()) || "TODO".equals(d.getAplicaA()))
            .map(d -> new Opcion(d.getId(), d.getNombre(), d.getTipo(), d.getValor())).toList();
    }

    @Transactional
    public Vista solicitar(Long alumnoId, Pedido p, Long usuarioId, boolean personal) {
        matriculaPago.exigirAcceso(alumnoId, usuarioId, personal);
        if (p == null || p.descuentoId() == null) throw new BusinessRuleException("Elige el descuento que pides.");
        if (p.motivo() == null || p.motivo().isBlank()) throw new BusinessRuleException("Cuenta por qué corresponde el descuento (por ejemplo, el nombre del hermano).");
        MatriculaLocal m = matriculaPago.matriculaVigente(alumnoId);
        if (!"PRE_MATRICULA".equals(m.getEstado())) throw new BusinessRuleException("Solo se pide un descuento mientras la matrícula está por pagar.");
        Cuota cuota = cuotaMatricula(m.getMatriculaId());
        if (cuota.getSaldo().compareTo(cuota.getMontoTotal()) != 0) throw new BusinessRuleException("La matrícula ya tiene pagos: no se puede cambiar su descuento.");
        Descuento d = descuentos.findById(p.descuentoId()).orElseThrow(() -> new ResourceNotFoundException("Descuento no encontrado: " + p.descuentoId()));
        if (!Boolean.TRUE.equals(d.getActivo()) || !("MATRICULA".equals(d.getAplicaA()) || "TODO".equals(d.getAplicaA()))) {
            throw new BusinessRuleException("Ese descuento no se puede pedir para la matrícula.");
        }
        if (descuentosAlumno.findByAlumnoIdAndDescuentoIdAndAnioId(alumnoId, d.getId(), m.getAnioId()).isPresent()) {
            throw new BusinessRuleException("El alumno ya tiene ese descuento este año.");
        }
        if (solicitudes.existsByMatriculaIdAndEstado(m.getMatriculaId(), SolicitudDescuento.PENDIENTE)) {
            throw new BusinessRuleException("Ya hay una solicitud de descuento en revisión: espera la respuesta de la secretaría.");
        }
        Long hermano = p.hermanoAlumnoId();
        if (hermano != null) {
            if (hermano.equals(alumnoId)) throw new BusinessRuleException("El hermano no puede ser el mismo alumno.");
            // El personal (secretaría, caja, administración) declara el hermano tras verificar sus datos; el apoderado solo puede elegir entre sus hijos.
            if (!personal && alumnosGateway.hijos(usuarioId).stream().noneMatch(h -> hermano.equals(h.getAlumnoId()))) {
                throw new BusinessRuleException("Ese alumno no figura entre tus hijos.");
            }
        }
        SolicitudDescuento s = solicitudes.save(SolicitudDescuento.builder()
            .alumnoId(alumnoId).matriculaId(m.getMatriculaId()).descuento(d).anioId(m.getAnioId())
            .motivo(p.motivo().trim().length() > 300 ? p.motivo().trim().substring(0, 300) : p.motivo().trim())
            .hermanoAlumnoId(hermano).solicitadaPor(usuarioId).build());
        log.info("Solicitud de descuento {} ({}) para la matrícula {} del alumno {}.", s.getId(), d.getNombre(), m.getMatriculaId(), alumnoId);
        return vista(s);
    }

    /**
     * Descuento por hermano pedido desde la matrícula en línea (sin sesión: lo llama matricula-ms con el token de servicio, después de recibir los
     * documentos del hermano). Es idempotente: si ya hay una solicitud en revisión para esa matrícula se devuelve esa, para que subir más archivos no falle.
     * Las mismas reglas que {@link #solicitar}: la matrícula debe estar por pagar y su cuota sin pagos.
     */
    @Transactional
    public Vista solicitarPublica(PedidoPublico p) {
        MatriculaLocal m = matriculas.findById(p.matriculaId()).orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada: " + p.matriculaId()));
        var vigente = solicitudes.findFirstByMatriculaIdOrderByIdDesc(m.getMatriculaId());
        if (vigente.isPresent() && SolicitudDescuento.PENDIENTE.equals(vigente.get().getEstado())) return vista(vigente.get());
        if (vigente.isPresent()) throw new BusinessRuleException("El descuento de esta matrícula ya fue " + vigente.get().getEstado().toLowerCase() + " por la secretaría.");
        if (!"PRE_MATRICULA".equals(m.getEstado())) throw new BusinessRuleException("Solo se pide un descuento mientras la matrícula está por pagar.");
        Cuota cuota = cuotaMatricula(m.getMatriculaId());
        if (cuota.getSaldo().compareTo(cuota.getMontoTotal()) != 0) throw new BusinessRuleException("La matrícula ya tiene pagos: no se puede cambiar su descuento.");
        Descuento d = descuentos.findById(p.descuentoId()).orElseThrow(() -> new ResourceNotFoundException("Descuento no encontrado: " + p.descuentoId()));
        if (!Boolean.TRUE.equals(d.getActivo()) || !("MATRICULA".equals(d.getAplicaA()) || "TODO".equals(d.getAplicaA()))) {
            throw new BusinessRuleException("Ese descuento no se puede pedir para la matrícula.");
        }
        if (descuentosAlumno.findByAlumnoIdAndDescuentoIdAndAnioId(m.getAlumnoId(), d.getId(), m.getAnioId()).isPresent()) {
            throw new BusinessRuleException("El alumno ya tiene ese descuento este año.");
        }
        Long hermano = p.hermanoAlumnoId() != null && !p.hermanoAlumnoId().equals(m.getAlumnoId()) ? p.hermanoAlumnoId() : null;
        String documento = p.hermanoDocumento() == null ? null : p.hermanoDocumento().trim();
        String nombre = p.hermanoNombre() == null ? null : p.hermanoNombre().trim();
        String motivo = "Matrícula en línea: la familia dice tener un hermano matriculado" + (documento == null || documento.isBlank() ? "" : " con documento " + documento)
            + (nombre == null || nombre.isBlank() ? " (no consta en el colegio)" : " (" + nombre + ")") + ". Confirma el parentesco de hermanos.";
        SolicitudDescuento s = solicitudes.save(SolicitudDescuento.builder()
            .alumnoId(m.getAlumnoId()).matriculaId(m.getMatriculaId()).descuento(d).anioId(m.getAnioId())
            .motivo(motivo.length() > 300 ? motivo.substring(0, 300) : motivo)
            .hermanoAlumnoId(hermano).hermanoDocumento(documento).hermanoNombre(nombre).origen("PUBLICA").build());
        log.info("Solicitud de descuento por hermano {} (matrícula en línea) para la matrícula {}.", s.getId(), m.getMatriculaId());
        return vista(s);
    }

    /** La última solicitud de una matrícula (en revisión, aprobada o rechazada), o nada si nunca se pidió. */
    @Transactional(readOnly = true)
    public Vista deMatricula(Long matriculaId) {
        return solicitudes.findFirstByMatriculaIdOrderByIdDesc(matriculaId).map(this::vista).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<Vista> pendientes() {
        return solicitudes.findByEstadoOrderBySolicitadaEnAsc(SolicitudDescuento.PENDIENTE).stream().map(this::vista).toList();
    }

    @Transactional(readOnly = true)
    public long contarPendientes() {
        return solicitudes.countByEstado(SolicitudDescuento.PENDIENTE);
    }

    /** La secretaría aprueba: se asigna el descuento al alumno y se recalcula la cuota de matrícula. Solo si la cuota aún no tiene pagos. */
    @Transactional
    public Vista aprobar(Long id, Long usuarioId) {
        SolicitudDescuento s = pendiente(id);
        MatriculaLocal m = matriculas.findById(s.getMatriculaId()).orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada: " + s.getMatriculaId()));
        if (!"PRE_MATRICULA".equals(m.getEstado())) throw new BusinessRuleException("La matrícula ya no está por pagar (" + m.getEstado() + "): no se puede aplicar el descuento.");
        Cuota cuota = cuotaMatricula(s.getMatriculaId());
        if (cuota.getSaldo().compareTo(cuota.getMontoTotal()) != 0) {
            throw new BusinessRuleException("La matrícula ya tiene pagos: no se puede cambiar su descuento. Rechaza la solicitud o ajusta con la administración.");
        }
        if (descuentosAlumno.findByAlumnoIdAndDescuentoIdAndAnioId(s.getAlumnoId(), s.getDescuento().getId(), s.getAnioId()).isEmpty()) {
            descuentosAlumno.save(DescuentoAlumno.builder().alumnoId(s.getAlumnoId()).descuento(s.getDescuento()).anioId(s.getAnioId())
                .motivo(s.getMotivo()).aprobadoPor(usuarioId).vigente(true).build());
        }
        BigDecimal descuento = generador.calcularDescuento(s.getAlumnoId(), s.getAnioId(), "MATRICULA", cuota.getMontoBase());
        BigDecimal total = montoConDescuento(cuota.getMontoBase(), descuento).add(cuota.getMora());
        if (total.signum() <= 0) {
            throw new BusinessRuleException("Ese descuento cubre toda la matrícula: la administración debe resolverlo (no se aprueba aquí).");
        }
        cuota.setDescuento(descuento);
        cuota.setMontoTotal(total);
        cuota.setSaldo(total);
        cuota.setActualizadaEn(LocalDateTime.now());
        cuotas.save(cuota);
        resolver(s, SolicitudDescuento.APROBADA, null, usuarioId);
        log.info("Solicitud {} aprobada por {}: matrícula {} queda en S/ {}.", id, usuarioId, s.getMatriculaId(), total);
        avisarFamiliaPublica(s);
        return vista(s);
    }

    /**
     * Si el pedido vino de la matrícula en línea, la familia aún no tiene cuenta: al resolverlo la secretaría, matricula-ms se la crea y le avisa por
     * correo que ya puede pagar (en su cuenta o en caja). El aviso va DESPUÉS de confirmar la transacción (para que vea la cuota ya recalculada) y no
     * deshace la decisión si falla: queda en el registro para reenviar el acceso a mano.
     */
    private void avisarFamiliaPublica(SolicitudDescuento s) {
        if (!"PUBLICA".equals(s.getOrigen())) return;
        var aviso = new MatriculaClient.DescuentoResuelto(s.getEstado(), s.getDescuento().getNombre(), s.getMotivoResolucion());
        Runnable enviar = () -> {
            try {
                matriculaClient.descuentoHermanoResuelto(s.getMatriculaId(), aviso);
            } catch (Exception e) {
                log.warn("No se pudo avisar a matricula-ms de la solicitud {} (matrícula {}): {}. La familia no recibió su acceso: reenvíalo desde la matrícula.",
                    s.getId(), s.getMatriculaId(), e.getMessage());
            }
        };
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    enviar.run();
                }
            });
        } else {
            enviar.run();
        }
    }

    @Transactional
    public Vista rechazar(Long id, String motivo, Long usuarioId) {
        if (motivo == null || motivo.isBlank()) throw new BusinessRuleException("Indica el motivo del rechazo: la familia lo verá.");
        SolicitudDescuento s = pendiente(id);
        resolver(s, SolicitudDescuento.RECHAZADA, motivo.trim().length() > 300 ? motivo.trim().substring(0, 300) : motivo.trim(), usuarioId);
        avisarFamiliaPublica(s);
        return vista(s);
    }

    private SolicitudDescuento pendiente(Long id) {
        SolicitudDescuento s = solicitudes.findById(id).orElseThrow(() -> new ResourceNotFoundException("Solicitud no encontrada: " + id));
        if (!SolicitudDescuento.PENDIENTE.equals(s.getEstado())) throw new BusinessRuleException("Esta solicitud ya está " + s.getEstado().toLowerCase() + ".");
        return s;
    }

    private void resolver(SolicitudDescuento s, String estado, String motivo, Long usuarioId) {
        s.setEstado(estado);
        s.setMotivoResolucion(motivo);
        s.setResueltaPor(usuarioId);
        s.setResueltaEn(LocalDateTime.now());
        solicitudes.save(s);
    }

    private Cuota cuotaMatricula(Long matriculaId) {
        return cuotas.findByMatriculaMatriculaId(matriculaId).stream()
            .filter(c -> "MATRICULA".equals(c.getConcepto().getTipo())).findFirst()
            .orElseThrow(() -> new BusinessRuleException("La matrícula todavía no tiene su cuota: falta configurar la tarifa."));
    }

    private Vista vista(SolicitudDescuento s) {
        MatriculaLocal m = matriculas.findById(s.getMatriculaId()).orElse(null);
        String hermanoNombre = null;
        Boolean hermanoMatriculado = null;
        if (s.getHermanoAlumnoId() != null) {
            var hermano = matriculas.findByAlumnoId(s.getHermanoAlumnoId());
            hermanoNombre = hermano.stream().findFirst().map(MatriculaLocal::getAlumnoNombre).orElse(null);
            // El sistema verifica por su cuenta si ese hermano está matriculado este año: es lo que la secretaría necesita ver.
            hermanoMatriculado = hermano.stream().anyMatch(x -> "MATRICULADO".equals(x.getEstado()) && s.getAnioId().equals(x.getAnioId()));
        }
        Cuota cuota = m == null ? null : cuotas.findByMatriculaMatriculaId(m.getMatriculaId()).stream()
            .filter(c -> "MATRICULA".equals(c.getConcepto().getTipo())).findFirst().orElse(null);
        BigDecimal importe = cuota == null ? null : cuota.getMontoBase();
        BigDecimal conDescuento = null;
        if (cuota != null && SolicitudDescuento.PENDIENTE.equals(s.getEstado())) {
            // Lo que costaría con este descuento, para que la secretaría lo vea antes de aprobar
            Descuento d = s.getDescuento();
            BigDecimal desc = "PORCENTAJE".equals(d.getTipo())
                ? cuota.getMontoBase().multiply(d.getValor()).divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP) : d.getValor();
            conDescuento = montoConDescuento(cuota.getMontoBase(), cuota.getDescuento().add(desc));
        } else if (cuota != null) {
            conDescuento = cuota.getMontoTotal();
        }
        // Sin matrícula propia del hermano en este servicio, se muestra el nombre que declaró la familia
        if (hermanoNombre == null) hermanoNombre = s.getHermanoNombre();
        return new Vista(s.getId(), s.getAlumnoId(), m == null ? null : m.getAlumnoNombre(), s.getMatriculaId(), s.getDescuento().getNombre(),
            s.getDescuento().getTipo(), s.getDescuento().getValor(), s.getMotivo(), s.getHermanoAlumnoId(), hermanoNombre, hermanoMatriculado,
            s.getEstado(), s.getMotivoResolucion(), s.getSolicitadaEn(), importe, conDescuento, s.getOrigen(), s.getHermanoDocumento());
    }
}
