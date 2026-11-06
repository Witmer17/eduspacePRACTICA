package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Credito;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Movimiento;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Resultado;
import pe.edu.upeu.eduspace.pago.entity.*;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Crédito del alumno. Cada depósito suma a su crédito; cuando una pensión vence (o ya venció) se cobra sola del crédito, de la más antigua a la
 * más reciente: si el crédito no alcanza, la cuota queda con lo que falte (PARCIAL) y si sobra, el resto sigue como crédito.
 * Cada cobro con crédito es un pago más (medio CREDITO, sin caja) y avisa como cualquier pago confirmado.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CreditoService {

    /** Con qué se puede depositar (el crédito mismo no es un medio de depósito). */
    public static final Set<String> MEDIOS_DEPOSITO = Set.of("EFECTIVO", "TARJETA", "YAPE_PLIN", "TRANSFERENCIA");
    public static final BigDecimal MAX_DEPOSITO = new BigDecimal("50000.00");
    private static final int MOVIMIENTOS_VISIBLES = 40;

    private final CreditoAlumnoRepository creditos;
    private final MovimientoCreditoRepository movimientos;
    private final CuotaRepository cuotas;
    private final PagoRepository pagos;
    private final PagoDetalleRepository detalles;
    private final CajaSesionRepository cajas;
    private final PagoService pagoService;
    private final SolicitudDescuentoRepository solicitudesDescuento;

    // ------------------------------------------------------------------ consulta

    @Transactional(readOnly = true)
    public BigDecimal saldoDe(Long alumnoId) {
        return creditos.findById(alumnoId).map(CreditoAlumno::getSaldo).orElse(BigDecimal.ZERO);
    }

    @Transactional(readOnly = true)
    public Credito consultar(Long alumnoId) {
        BigDecimal saldo = saldoDe(alumnoId);
        BigDecimal exigible = cuotas.pensionesExigibles(alumnoId, LocalDate.now()).stream().map(Cuota::getSaldo).reduce(BigDecimal.ZERO, BigDecimal::add);
        List<Movimiento> lista = movimientos.findByAlumnoIdOrderByIdDesc(alumnoId, PageRequest.of(0, MOVIMIENTOS_VISIBLES)).stream().map(this::aMovimiento).toList();
        return new Credito(alumnoId, saldo, exigible, exigible.subtract(saldo).max(BigDecimal.ZERO), saldo.subtract(exigible).max(BigDecimal.ZERO), lista);
    }

    // ------------------------------------------------------------------ depósitos

    /**
     * Suma un depósito al crédito del alumno y, enseguida, cobra de él lo que ya toque. El efectivo exige una caja ABIERTA del que lo recibe;
     * con otro medio, si tiene una caja abierta el depósito queda en ella (así el cierre de caja cuenta lo que entró).
     */
    @Transactional
    public Resultado depositar(Long alumnoId, BigDecimal monto, String medio, String referencia, String idempotencyKey, Long usuarioId) {
        if (idempotencyKey != null && !idempotencyKey.isBlank()) {
            var previo = movimientos.findByIdempotencyKey(idempotencyKey);
            if (previo.isPresent()) return new Resultado(saldoDe(alumnoId), BigDecimal.ZERO, null, List.of());
        }
        CreditoAlumno credito = registrarDeposito(alumnoId, monto, medio, referencia, idempotencyKey, usuarioId);
        return aplicar(credito, usuarioId, LocalDate.now(), "Cobro del crédito tras un depósito");
    }

    /**
     * Suma un depósito SIN cobrar pensiones enseguida: lo usa la pasarela para el dinero de la matrícula, que va primero a la matrícula
     * (si no, una pensión vencida de antes se lo llevaría). Idempotente por clave; devuelve el saldo del crédito.
     */
    @Transactional
    public BigDecimal depositarSinCobro(Long alumnoId, BigDecimal monto, String medio, String referencia, String idempotencyKey, Long usuarioId) {
        if (idempotencyKey != null && !idempotencyKey.isBlank() && movimientos.findByIdempotencyKey(idempotencyKey).isPresent()) {
            return saldoDe(alumnoId);
        }
        return registrarDeposito(alumnoId, monto, medio, referencia, idempotencyKey, usuarioId).getSaldo();
    }

    private CreditoAlumno registrarDeposito(Long alumnoId, BigDecimal monto, String medio, String referencia, String idempotencyKey, Long usuarioId) {
        BigDecimal importe = monto == null ? BigDecimal.ZERO : monto.setScale(2, java.math.RoundingMode.HALF_UP);
        if (importe.signum() <= 0) throw new BusinessRuleException("El depósito debe ser mayor que cero.");
        if (importe.compareTo(MAX_DEPOSITO) > 0) throw new BusinessRuleException("Un depósito no puede pasar de S/ " + MAX_DEPOSITO + ".");
        if (medio == null || !MEDIOS_DEPOSITO.contains(medio)) {
            throw new BusinessRuleException("El medio del depósito debe ser uno de: " + String.join(", ", MEDIOS_DEPOSITO) + ".");
        }
        CajaSesion caja = usuarioId == null ? null : cajas.findFirstByCajeroUsuarioIdAndEstado(usuarioId, "ABIERTA").orElse(null);
        if ("EFECTIVO".equals(medio) && caja == null) {
            throw new BusinessRuleException("Para recibir un depósito en efectivo debe tener una caja ABIERTA.");
        }

        CreditoAlumno credito = bloquear(alumnoId);
        credito.setSaldo(credito.getSaldo().add(importe));
        guardar(credito);
        movimientos.save(MovimientoCredito.builder()
            .alumnoId(alumnoId).tipo(MovimientoCredito.DEPOSITO).monto(importe).saldoDespues(credito.getSaldo())
            .medio(medio).referencia(referencia == null || referencia.isBlank() ? null : referencia.trim())
            .cajaSesionId(caja != null ? caja.getId() : null).registradoPor(usuarioId)
            .detalle("Depósito").idempotencyKey(idempotencyKey == null || idempotencyKey.isBlank() ? null : idempotencyKey).build());
        log.info("Depósito de S/ {} al crédito del alumno {} ({}).", importe, alumnoId, medio);
        return credito;
    }

    // ------------------------------------------------------------------ matrícula

    /**
     * Cobra la matrícula del crédito del alumno: es lo que «genera» la matrícula (el pago confirmado avisa a matrícula-ms).
     * Se valida aquí, en el servidor: la matrícula debe deber algo y el crédito debe alcanzar COMPLETO (no se paga a medias).
     */
    @Transactional
    public Resultado cobrarMatricula(Long alumnoId, Long matriculaId, Long usuarioId) {
        if (solicitudesDescuento.existsByMatriculaIdAndEstado(matriculaId, SolicitudDescuento.PENDIENTE)) {
            throw new BusinessRuleException(MatriculaPagoService.MOTIVO_EN_REVISION);
        }
        CreditoAlumno credito = bloquear(alumnoId);
        Cuota cuota = cuotas.findByMatriculaMatriculaId(matriculaId).stream()
            .filter(c -> "MATRICULA".equals(c.getConcepto().getTipo()))
            .findFirst()
            .orElseThrow(() -> new BusinessRuleException("La matrícula todavía no tiene su cuota: falta configurar la tarifa."));
        if (!alumnoId.equals(cuota.getAlumnoId())) throw new BusinessRuleException("La cuota de matrícula no corresponde a ese alumno.");
        if (!List.of("PENDIENTE", "PARCIAL", "VENCIDA").contains(cuota.getEstado()) || cuota.getSaldo().signum() <= 0) {
            throw new BusinessRuleException("La matrícula ya está pagada.");
        }
        BigDecimal monto = cuota.getSaldo();
        if (credito.getSaldo().compareTo(monto) < 0) {
            throw new BusinessRuleException(String.format("El crédito del alumno (S/ %.2f) no alcanza para la matrícula (S/ %.2f): faltan S/ %.2f.",
                credito.getSaldo(), monto, monto.subtract(credito.getSaldo())));
        }

        Pago pago = pagos.save(Pago.builder()
            .alumnoId(alumnoId).pagadorNombre("Crédito del alumno").montoTotal(monto).medio("CREDITO")
            .referencia("Matrícula pagada con el crédito").estado("CONFIRMADO")
            .registradoPor(usuarioId).pagadoEn(LocalDateTime.now()).build());

        cuota.setSaldo(BigDecimal.ZERO);
        cuota.setEstado("PAGADA");
        cuota.setActualizadaEn(LocalDateTime.now());
        cuotas.save(cuota);
        pago.setDetalles(List.of(detalles.save(PagoDetalle.builder().pago(pago).cuota(cuota).montoAplicado(monto).build())));

        BigDecimal saldoFinal = credito.getSaldo().subtract(monto);
        credito.setSaldo(saldoFinal);
        guardar(credito);
        movimientos.save(MovimientoCredito.builder()
            .alumnoId(alumnoId).tipo(MovimientoCredito.COBRO_CUOTA).monto(monto).saldoDespues(saldoFinal)
            .cuotaId(cuota.getId()).pagoId(pago.getId()).registradoPor(usuarioId).detalle(cuota.getDescripcion()).build());

        // El pago confirmado de la matrícula es lo que hace que matrícula-ms genere la matrícula.
        pagoService.crearOutboxPagoConfirmado(pago, matriculaId, List.of(cuota.getId()), "MATRICULA", "MATRICULA");
        log.info("Matrícula {} del alumno {} pagada con el crédito (S/ {}); queda S/ {}.", matriculaId, alumnoId, monto, saldoFinal);
        return new Resultado(saldoFinal, monto, pago.getId(), List.of(cuota.getId()));
    }

    /** Los últimos depósitos del alumno (sin los anulados), para que la familia vea lo que depositó. */
    @Transactional(readOnly = true)
    public List<Movimiento> ultimosDepositos(Long alumnoId, int cuantos) {
        return movimientos.findByAlumnoIdOrderByIdDesc(alumnoId, PageRequest.of(0, 50)).stream()
            .filter(m -> MovimientoCredito.DEPOSITO.equals(m.getTipo()) && !Boolean.TRUE.equals(m.getAnulado()))
            .limit(cuantos).map(this::aMovimiento).toList();
    }

    /** Cobra ahora del crédito las pensiones que ya vencieron (lo que haría el cobro automático del día). */
    @Transactional
    public Resultado cobrarAhora(Long alumnoId, Long usuarioId) {
        return aplicar(bloquear(alumnoId), usuarioId, LocalDate.now(), "Cobro del crédito a pedido");
    }

    /** El cobro automático: lo llama el job diario por cada alumno con crédito. */
    @Transactional
    public Resultado cobrarAutomatico(Long alumnoId, LocalDate hoy) {
        return aplicar(bloquear(alumnoId), null, hoy, "Cobro automático del crédito");
    }

    // ------------------------------------------------------------------ anulaciones

    /** Anula un depósito mal registrado. Solo si el crédito todavía alcanza para quitarlo (si ya se cobró, primero se anulan esos cobros). */
    @Transactional
    public void anularDeposito(Long movimientoId, String motivo, Long usuarioId) {
        MovimientoCredito dep = movimientos.findById(movimientoId)
            .orElseThrow(() -> new ResourceNotFoundException("Movimiento de crédito no encontrado: " + movimientoId));
        if (!MovimientoCredito.DEPOSITO.equals(dep.getTipo())) throw new BusinessRuleException("Solo se anulan depósitos.");
        if (Boolean.TRUE.equals(dep.getAnulado())) throw new BusinessRuleException("El depósito ya está anulado.");
        if (dep.getCajaSesionId() != null && cajas.findById(dep.getCajaSesionId()).map(c -> "CERRADA".equals(c.getEstado())).orElse(false)) {
            throw new BusinessRuleException("No se puede anular un depósito de una caja ya cerrada sin autorización extraordinaria.");
        }
        CreditoAlumno credito = bloquear(dep.getAlumnoId());
        if (credito.getSaldo().compareTo(dep.getMonto()) < 0) {
            throw new BusinessRuleException(String.format("El crédito del alumno (S/ %.2f) ya no alcanza para anular este depósito (S/ %.2f): parte se cobró de sus cuotas. Anula primero esos cobros.",
                credito.getSaldo(), dep.getMonto()));
        }
        credito.setSaldo(credito.getSaldo().subtract(dep.getMonto()));
        guardar(credito);
        dep.setAnulado(true);
        movimientos.save(dep);
        movimientos.save(MovimientoCredito.builder()
            .alumnoId(dep.getAlumnoId()).tipo(MovimientoCredito.ANULACION).monto(dep.getMonto()).saldoDespues(credito.getSaldo())
            .anulaA(dep.getId()).registradoPor(usuarioId).detalle("Depósito anulado: " + motivo).build());
    }

    /** Un pago hecho con crédito se anuló: lo que había cobrado vuelve al crédito del alumno. */
    @Transactional
    public void devolverPorAnulacion(Pago pago, Long usuarioId) {
        CreditoAlumno credito = bloquear(pago.getAlumnoId());
        for (PagoDetalle d : pago.getDetalles()) {
            credito.setSaldo(credito.getSaldo().add(d.getMontoAplicado()));
            movimientos.save(MovimientoCredito.builder()
                .alumnoId(pago.getAlumnoId()).tipo(MovimientoCredito.REVERSION).monto(d.getMontoAplicado()).saldoDespues(credito.getSaldo())
                .cuotaId(d.getCuota().getId()).pagoId(pago.getId()).registradoPor(usuarioId)
                .detalle("Cobro con crédito anulado: vuelve al crédito").build());
        }
        guardar(credito);
    }

    // ------------------------------------------------------------------ núcleo

    /** Paga con el crédito las pensiones exigibles, de la más antigua a la más reciente, hasta donde alcance. */
    private Resultado aplicar(CreditoAlumno credito, Long usuarioId, LocalDate hoy, String detalle) {
        Long alumnoId = credito.getAlumnoId();
        if (credito.getSaldo().signum() <= 0) return new Resultado(credito.getSaldo(), BigDecimal.ZERO, null, List.of());
        List<Cuota> exigibles = cuotas.pensionesExigibles(alumnoId, hoy);
        if (exigibles.isEmpty()) return new Resultado(credito.getSaldo(), BigDecimal.ZERO, null, List.of());

        BigDecimal disponible = credito.getSaldo();
        List<Cuota> afectadas = new ArrayList<>();
        List<BigDecimal> montos = new ArrayList<>();
        for (Cuota c : exigibles) {
            if (disponible.signum() <= 0) break;
            BigDecimal pagar = disponible.min(c.getSaldo());
            afectadas.add(c);
            montos.add(pagar);
            disponible = disponible.subtract(pagar);
        }
        BigDecimal total = montos.stream().reduce(BigDecimal.ZERO, BigDecimal::add);

        Pago pago = pagos.save(Pago.builder()
            .alumnoId(alumnoId).pagadorNombre("Crédito del alumno").montoTotal(total).medio("CREDITO")
            .referencia(detalle.length() > 80 ? detalle.substring(0, 80) : detalle).estado("CONFIRMADO")
            .registradoPor(usuarioId).pagadoEn(LocalDateTime.now()).build());

        List<PagoDetalle> lineas = new ArrayList<>();
        List<Long> cuotaIds = new ArrayList<>();
        BigDecimal saldoCorriente = credito.getSaldo();
        for (int i = 0; i < afectadas.size(); i++) {
            Cuota c = afectadas.get(i);
            BigDecimal pagar = montos.get(i);
            c.setSaldo(c.getSaldo().subtract(pagar));
            c.setEstado(c.getSaldo().signum() == 0 ? "PAGADA" : "PARCIAL");
            c.setActualizadaEn(LocalDateTime.now());
            cuotas.save(c);
            lineas.add(detalles.save(PagoDetalle.builder().pago(pago).cuota(c).montoAplicado(pagar).build()));
            cuotaIds.add(c.getId());
            saldoCorriente = saldoCorriente.subtract(pagar);
            movimientos.save(MovimientoCredito.builder()
                .alumnoId(alumnoId).tipo(MovimientoCredito.COBRO_CUOTA).monto(pagar).saldoDespues(saldoCorriente)
                .cuotaId(c.getId()).pagoId(pago.getId()).registradoPor(usuarioId)
                .detalle(c.getSaldo().signum() == 0 ? c.getDescripcion() : c.getDescripcion() + " (queda S/ " + c.getSaldo().toPlainString() + " por pagar)").build());
        }
        pago.setDetalles(lineas);
        credito.setSaldo(saldoCorriente);
        guardar(credito);

        Long matriculaId = afectadas.get(0).getMatricula() != null ? afectadas.get(0).getMatricula().getMatriculaId() : null;
        pagoService.crearOutboxPagoConfirmado(pago, matriculaId, cuotaIds, "PENSION", "PENSION");
        log.info("Crédito del alumno {}: cobradas {} cuota(s) por S/ {}; queda S/ {}.", alumnoId, cuotaIds.size(), total, saldoCorriente);
        return new Resultado(saldoCorriente, total, pago.getId(), cuotaIds);
    }

    private CreditoAlumno bloquear(Long alumnoId) {
        return creditos.bloquear(alumnoId).orElseGet(() -> {
            creditos.saveAndFlush(CreditoAlumno.builder().alumnoId(alumnoId).saldo(BigDecimal.ZERO).build());
            return creditos.bloquear(alumnoId).orElseThrow();
        });
    }

    private void guardar(CreditoAlumno c) {
        c.setActualizadoEn(LocalDateTime.now());
        creditos.save(c);
    }

    private Movimiento aMovimiento(MovimientoCredito m) {
        return new Movimiento(m.getId(), m.getTipo(), m.suma() ? 1 : -1, m.getMonto(), m.getSaldoDespues(), m.getMedio(), m.getReferencia(),
            m.getCuotaId(), m.getPagoId(), Boolean.TRUE.equals(m.getAnulado()), m.getDetalle(), m.getRegistradoPor(), m.getCreadoEn());
    }
}
