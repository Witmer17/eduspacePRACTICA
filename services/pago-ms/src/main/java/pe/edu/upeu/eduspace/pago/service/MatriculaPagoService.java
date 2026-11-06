package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.client.AlumnosGateway;
import pe.edu.upeu.eduspace.pago.client.PlanificacionClient;
import pe.edu.upeu.eduspace.pago.util.PlanPago;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Movimiento;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.pago.entity.OrdenPago;
import pe.edu.upeu.eduspace.pago.entity.SolicitudDescuento;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import pe.edu.upeu.eduspace.pago.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.pago.repository.OrdenPagoRepository;
import pe.edu.upeu.eduspace.pago.repository.SolicitudDescuentoRepository;
import pe.edu.upeu.eduspace.pago.util.PasarelaSimulada;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;

/**
 * El pago de la matrícula, con todas las reglas en el servidor (los botones del frontend solo las reflejan):
 * cuánto falta (lo que debe la cuota de matrícula menos el crédito del alumno), la orden de pago, la confirmación del aviso de la
 * pasarela y «generar la matrícula» con el crédito. Pagar la matrícula (en caja, con la pasarela o con el crédito) es lo que hace que
 * matrícula-ms la genere.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MatriculaPagoService {

    private static final List<String> POR_PAGAR = List.of("PENDIENTE", "PARCIAL", "VENCIDA");
    static final String MOTIVO_EN_REVISION = "Hay una solicitud de descuento en revisión: la secretaría debe darle su visto bueno antes de pagar o generar la matrícula.";

    private final CuotaRepository cuotas;
    private final MatriculaLocalRepository matriculas;
    private final OrdenPagoRepository ordenes;
    private final SolicitudDescuentoRepository solicitudes;
    private final CreditoService credito;
    private final AlumnosGateway alumnosGateway;
    private final PagoProperties props;
    private final PlanificacionClient planificacion;

    // ------------------------------------------------------------------ lo que se muestra

    public record OrdenVista(String codigo, BigDecimal monto, String estado, LocalDateTime expiraEn) {}

    /** La última solicitud de descuento de la matrícula: en revisión, aprobada o rechazada (con su motivo). */
    public record SolicitudVista(Long id, String estado, String descuentoNombre, String tipo, BigDecimal valor, String motivo, String motivoResolucion) {}

    /** De qué es la matrícula (grado, sección, turno) y la forma de pago de las pensiones acordada, con su descuento. */
    public record DetalleMatricula(String grado, String seccion, String turno, String planPago, String planEtiqueta, BigDecimal planDescuento) {}

    public record EstadoMatricula(
        Long alumnoId, Long matriculaId, String estadoMatricula, Long cuotaId,
        BigDecimal importe, BigDecimal descuento, BigDecimal total, BigDecimal saldo, BigDecimal credito, BigDecimal faltante,
        boolean pagada, boolean puedeGenerar, String motivo, OrdenVista ordenVigente, List<Movimiento> depositos, SolicitudVista solicitudDescuento,
        DetalleMatricula detalle) {}

    /** Lo que ve Caja de un alumno que aún debe la matrícula. */
    public record PorPagar(Long alumnoId, String alumnoNombre, Long matriculaId, BigDecimal saldo, BigDecimal credito, BigDecimal faltante, boolean descuentoEnRevision,
                           DetalleMatricula detalle) {}

    /** Grado, sección, turno y forma de pago de una matrícula; si planificacion-ms no responde se muestran solo la forma de pago (no se rompe la pantalla). */
    DetalleMatricula detalleDe(MatriculaLocal m) {
        String grado = null, seccion = null, turno = null;
        try {
            var s = planificacion.getSeccion(m.getSeccionId());
            if (s != null) {
                seccion = s.nombre();
                turno = s.turno();
            }
            var g = planificacion.getGrado(m.getGradoId());
            if (g != null) grado = g.nombre();
        } catch (Exception e) {
            log.warn("Sin grado/sección de la matrícula {}: {}", m.getMatriculaId(), e.getMessage());
        }
        PlanPago plan = PlanPago.de(m.getPlanPago());
        BigDecimal descuentoPlan = switch (plan) {
            case SEMESTRAL -> props.getDescuentoPlanSemestral();
            case ANUAL -> props.getDescuentoPlanAnual();
            default -> BigDecimal.ZERO;
        };
        return new DetalleMatricula(grado, seccion, turno, plan.name(), plan.etiqueta(), descuentoPlan);
    }

    /** Lo que decide el servidor a partir de dos números: cuánto falta pagar y si el crédito ya alcanza para generar la matrícula. */
    public record Calculo(BigDecimal faltante, boolean creditoAlcanza) {}

    /** Falta pagar lo que debe la matrícula menos el crédito (nunca negativo); el crédito alcanza si cubre todo lo que debe. */
    public static Calculo calcular(BigDecimal saldoMatricula, BigDecimal creditoAlumno) {
        BigDecimal saldo = saldoMatricula == null ? BigDecimal.ZERO : saldoMatricula;
        BigDecimal cred = creditoAlumno == null ? BigDecimal.ZERO : creditoAlumno;
        return new Calculo(saldo.subtract(cred).max(BigDecimal.ZERO), saldo.signum() > 0 && cred.compareTo(saldo) >= 0);
    }

    @Transactional(readOnly = true)
    public EstadoMatricula estado(Long alumnoId, Long usuarioId, boolean personal) {
        exigirAcceso(alumnoId, usuarioId, personal);
        return estadoDe(alumnoId);
    }

    private EstadoMatricula estadoDe(Long alumnoId) {
        MatriculaLocal m = matriculaVigente(alumnoId);
        Cuota cuota = cuotas.findByMatriculaMatriculaId(m.getMatriculaId()).stream()
            .filter(c -> "MATRICULA".equals(c.getConcepto().getTipo())).findFirst().orElse(null);
        BigDecimal cred = credito.saldoDe(alumnoId);
        List<Movimiento> depositos = credito.ultimosDepositos(alumnoId, 5);
        OrdenPago orden = ordenes.findFirstByMatriculaIdAndEstado(m.getMatriculaId(), OrdenPago.PENDIENTE)
            .filter(o -> o.getExpiraEn().isAfter(LocalDateTime.now())).orElse(null);
        OrdenVista vista = orden == null ? null : new OrdenVista(orden.getCodigo(), orden.getMonto(), orden.getEstado(), orden.getExpiraEn());
        SolicitudVista sol = solicitudes.findFirstByMatriculaIdOrderByIdDesc(m.getMatriculaId())
            .map(x -> new SolicitudVista(x.getId(), x.getEstado(), x.getDescuento().getNombre(), x.getDescuento().getTipo(), x.getDescuento().getValor(),
                x.getMotivo(), x.getMotivoResolucion())).orElse(null);
        boolean enRevision = sol != null && SolicitudDescuento.PENDIENTE.equals(sol.estado());

        if (cuota == null) {
            return new EstadoMatricula(alumnoId, m.getMatriculaId(), m.getEstado(), null, null, null, null, BigDecimal.ZERO, cred, BigDecimal.ZERO,
                false, false, "Todavía no se generó la cuota de matrícula: falta configurar la tarifa (Apertura de periodo).", vista, depositos, sol, detalleDe(m));
        }
        boolean pagada = "PAGADA".equals(cuota.getEstado()) || cuota.getSaldo().signum() <= 0;
        BigDecimal saldo = pagada ? BigDecimal.ZERO : cuota.getSaldo();
        Calculo c = calcular(saldo, cred);
        String motivo = null;
        boolean puede = false;
        if (!"PRE_MATRICULA".equals(m.getEstado())) {
            motivo = "MATRICULADO".equals(m.getEstado()) ? "El alumno ya está matriculado." : "La matrícula está en estado " + m.getEstado() + ".";
        } else if (pagada) {
            motivo = "La matrícula ya está pagada: se genera en unos segundos.";
        } else if (enRevision) {
            motivo = MOTIVO_EN_REVISION;
        } else if (!c.creditoAlcanza()) {
            motivo = String.format("Faltan S/ %.2f: el crédito (S/ %.2f) no alcanza para la matrícula (S/ %.2f).", c.faltante(), cred, saldo);
        } else {
            puede = true;
        }
        return new EstadoMatricula(alumnoId, m.getMatriculaId(), m.getEstado(), cuota.getId(), cuota.getMontoBase(), cuota.getDescuento(),
            cuota.getMontoTotal(), saldo, cred, c.faltante(), pagada, puede, motivo, vista, depositos, sol, detalleDe(m));
    }

    /** La matrícula del alumno que se está pagando: la que sigue en pre-matrícula (la más reciente). */
    MatriculaLocal matriculaVigente(Long alumnoId) {
        List<MatriculaLocal> lista = matriculas.findByAlumnoId(alumnoId).stream()
            .sorted((a, b) -> b.getMatriculaId().compareTo(a.getMatriculaId())).toList();
        return lista.stream().filter(x -> "PRE_MATRICULA".equals(x.getEstado())).findFirst()
            .or(() -> lista.stream().findFirst())
            .orElseThrow(() -> new ResourceNotFoundException("El alumno no tiene una matrícula por pagar."));
    }

    // ------------------------------------------------------------------ orden de pago

    /** Crea (o reutiliza) la orden por lo que falta de la matrícula. El monto lo calcula el servidor. */
    @Transactional
    public OrdenVista crearOrden(Long alumnoId, Long usuarioId, boolean personal) {
        exigirAcceso(alumnoId, usuarioId, personal);
        EstadoMatricula e = estadoDe(alumnoId);
        if (!"PRE_MATRICULA".equals(e.estadoMatricula())) throw new BusinessRuleException(e.motivo());
        if (e.cuotaId() == null) throw new BusinessRuleException(e.motivo());
        if (e.pagada()) throw new BusinessRuleException("La matrícula ya está pagada.");
        if (e.solicitudDescuento() != null && SolicitudDescuento.PENDIENTE.equals(e.solicitudDescuento().estado())) throw new BusinessRuleException(MOTIVO_EN_REVISION);
        if (e.faltante().signum() <= 0) {
            throw new BusinessRuleException("El crédito del alumno ya cubre la matrícula: no hace falta pagar, genérala directamente.");
        }
        var vigente = ordenes.findFirstByMatriculaIdAndEstado(e.matriculaId(), OrdenPago.PENDIENTE);
        if (vigente.isPresent()) {
            OrdenPago o = vigente.get();
            if (o.getExpiraEn().isAfter(LocalDateTime.now()) && o.getMonto().compareTo(e.faltante()) == 0) {
                return new OrdenVista(o.getCodigo(), o.getMonto(), o.getEstado(), o.getExpiraEn());
            }
            // Cambió lo que falta (o venció): esa orden ya no sirve y se abre otra con el monto actual.
            o.setEstado(OrdenPago.EXPIRADA);
            ordenes.saveAndFlush(o);
        }
        OrdenPago nueva = ordenes.save(OrdenPago.builder()
            .codigo("ORD-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase())
            .alumnoId(alumnoId).matriculaId(e.matriculaId()).monto(e.faltante()).creadaPor(usuarioId)
            .expiraEn(LocalDateTime.now().plusMinutes(props.getMinutosVigenciaOrden())).build());
        log.info("Orden {} por S/ {} para la matrícula {} del alumno {}.", nueva.getCodigo(), nueva.getMonto(), nueva.getMatriculaId(), alumnoId);
        return new OrdenVista(nueva.getCodigo(), nueva.getMonto(), nueva.getEstado(), nueva.getExpiraEn());
    }

    public record ResultadoPasarela(boolean aprobada, String transaccionId, String mensaje, String medio, String detalle, BigDecimal monto,
                                    LocalDateTime fecha, String orden, EstadoMatricula estado) {}

    /**
     * La pantalla de pago de la pasarela simulada: procesa los datos y, como haría una real, AVISA al servidor con el id de transacción y el
     * estado. Ese aviso pasa por el mismo {@link #confirmarOrden} que el webhook firmado.
     */
    @Transactional
    public ResultadoPasarela pagarSimulado(String codigo, PasarelaSimulada.Datos datos, Long usuarioId, boolean personal) {
        OrdenPago orden = ordenes.findByCodigo(codigo).orElseThrow(() -> new ResourceNotFoundException("Orden no encontrada: " + codigo));
        exigirAcceso(orden.getAlumnoId(), usuarioId, personal);
        if (!OrdenPago.PENDIENTE.equals(orden.getEstado())) throw new BusinessRuleException("Esta orden ya está " + orden.getEstado().toLowerCase() + ".");
        if (orden.getExpiraEn().isBefore(LocalDateTime.now())) {
            orden.setEstado(OrdenPago.EXPIRADA);
            ordenes.save(orden);
            throw new BusinessRuleException("La orden venció: genera una nueva para pagar lo que falta.");
        }
        PasarelaSimulada.Resultado r = PasarelaSimulada.procesar(datos, YearMonth.now());
        Aviso aviso = new Aviso(codigo, r.transaccionId(), r.aprobada() ? "APROBADO" : "RECHAZADO", orden.getMonto(), r.medio(), r.pagador(), r.mensaje(), r.detalle());
        confirmarOrden(aviso);
        OrdenPago actual = ordenes.findByCodigo(codigo).orElseThrow();
        return new ResultadoPasarela(r.aprobada(), r.transaccionId(), r.mensaje(), r.medio(), r.detalle(), orden.getMonto(),
            actual.getConfirmadaEn() != null ? actual.getConfirmadaEn() : LocalDateTime.now(), codigo, estadoDe(orden.getAlumnoId()));
    }

    /** El aviso que manda la pasarela cuando termina un pago. */
    public record Aviso(String ordenCodigo, String transaccionId, String estado, BigDecimal monto, String medio, String pagador, String mensaje, String detalle) {}

    /**
     * Confirma una orden con el aviso de la pasarela. Es idempotente (el mismo aviso dos veces no cobra dos veces), exige que el monto sea
     * EXACTAMENTE el de la orden y, si el pago fue aprobado, suma el dinero al crédito del alumno y cobra la matrícula de ese crédito.
     */
    @Transactional
    public OrdenPago confirmarOrden(Aviso a) {
        OrdenPago o = ordenes.bloquearPorCodigo(a.ordenCodigo()).orElseThrow(() -> new ResourceNotFoundException("Orden no encontrada: " + a.ordenCodigo()));
        boolean aprobado = "APROBADO".equalsIgnoreCase(a.estado());

        if (o.getTransaccionId() != null && o.getTransaccionId().equals(a.transaccionId())) return o;           // aviso repetido
        if (!OrdenPago.PENDIENTE.equals(o.getEstado())) {
            if (aprobado) log.warn("ALERTA: aviso aprobado de la transacción {} para la orden {}, que ya está {}.", a.transaccionId(), o.getCodigo(), o.getEstado());
            throw new BusinessRuleException("La orden " + o.getCodigo() + " ya está " + o.getEstado().toLowerCase() + ".");
        }
        if (aprobado && (a.monto() == null || a.monto().compareTo(o.getMonto()) != 0)) {
            o.setEstado(OrdenPago.RECHAZADA);
            o.setRespuesta("El monto del aviso no coincide con la orden.");
            ordenes.save(o);
            log.warn("ALERTA: la transacción {} informó S/ {} pero la orden {} es por S/ {}.", a.transaccionId(), a.monto(), o.getCodigo(), o.getMonto());
            throw new BusinessRuleException("El monto del aviso no coincide con la orden: no se confirmó.");
        }

        o.setMedio(a.medio());
        o.setPagador(a.pagador());
        o.setRespuesta(a.mensaje() == null ? null : (a.mensaje().length() > 200 ? a.mensaje().substring(0, 200) : a.mensaje()));
        if (!aprobado) {
            // La pasarela rechazó este intento (datos mal, tarjeta de prueba de rechazo…): la orden sigue abierta para reintentar.
            ordenes.save(o);
            return o;
        }
        o.setConfirmadaEn(LocalDateTime.now());
        o.setTransaccionId(a.transaccionId());
        o.setEstado(OrdenPago.APROBADA);
        ordenes.saveAndFlush(o);

        String referencia = ("Op. " + a.transaccionId() + (a.detalle() == null ? "" : " · " + a.detalle()));
        credito.depositarSinCobro(o.getAlumnoId(), o.getMonto(), a.medio(), referencia.length() > 80 ? referencia.substring(0, 80) : referencia,
            "ORD-" + o.getCodigo(), null);
        // Con el dinero ya en el crédito, se cobra la matrícula (lo que la genera). Si por algo ya no se puede (p. ej. ya la pagaron en caja),
        // el dinero queda como crédito a favor del alumno y la orden queda aprobada.
        try {
            var r = credito.cobrarMatricula(o.getAlumnoId(), o.getMatriculaId(), null);
            o.setPagoId(r.pagoId());
            ordenes.save(o);
        } catch (BusinessRuleException e) {
            log.warn("Orden {} aprobada pero la matrícula no se cobró del crédito: {}", o.getCodigo(), e.getMessage());
        }
        return o;
    }

    // ------------------------------------------------------------------ generar con el crédito

    /** «Generar matrícula»: con el crédito suficiente cobra la matrícula del crédito. El servidor valida todo (el botón solo lo refleja). */
    @Transactional
    public EstadoMatricula generar(Long alumnoId, Long usuarioId, boolean personal) {
        exigirAcceso(alumnoId, usuarioId, personal);
        EstadoMatricula e = estadoDe(alumnoId);
        if (!e.puedeGenerar()) throw new BusinessRuleException(e.motivo() != null ? e.motivo() : "No se puede generar la matrícula.");
        credito.cobrarMatricula(alumnoId, e.matriculaId(), usuarioId);
        return estadoDe(alumnoId);
    }

    // ------------------------------------------------------------------ caja

    /** Los alumnos con pre-matrícula que aún deben la matrícula (lo que Caja necesita cobrar). */
    @Transactional(readOnly = true)
    public List<PorPagar> porPagar() {
        return matriculas.findByEstadoOrderByMatriculaIdDesc("PRE_MATRICULA").stream()
            .map(m -> cuotas.findByMatriculaMatriculaId(m.getMatriculaId()).stream()
                .filter(c -> "MATRICULA".equals(c.getConcepto().getTipo()) && POR_PAGAR.contains(c.getEstado()) && c.getSaldo().signum() > 0)
                .findFirst()
                .map(c -> {
                    BigDecimal cred = credito.saldoDe(m.getAlumnoId());
                    return new PorPagar(m.getAlumnoId(), m.getAlumnoNombre(), m.getMatriculaId(), c.getSaldo(), cred, calcular(c.getSaldo(), cred).faltante(),
                        solicitudes.existsByMatriculaIdAndEstado(m.getMatriculaId(), SolicitudDescuento.PENDIENTE), detalleDe(m));
                }).orElse(null))
            .filter(java.util.Objects::nonNull)
            .toList();
    }

    // ------------------------------------------------------------------ acceso

    /** El personal (caja, secretaría, administrador) puede con cualquier alumno; el apoderado, solo con sus hijos. */
    void exigirAcceso(Long alumnoId, Long usuarioId, boolean personal) {
        if (personal) return;
        boolean esHijo = usuarioId != null && alumnosGateway.hijos(usuarioId).stream().anyMatch(h -> alumnoId.equals(h.getAlumnoId()));
        if (!esHijo) throw new AccessDeniedException("Solo puede pagar la matrícula de sus propios hijos.");
    }
}
