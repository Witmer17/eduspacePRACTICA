package pe.edu.eduspace.planificacion.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PlanillaGenerada;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RenovarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest;
import pe.edu.eduspace.planificacion.entity.ContratoPersonal;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.entity.PagoPersonal;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.ContratoPersonalRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;
import pe.edu.eduspace.planificacion.repository.PagoPersonalRepository;

/**
 * Contratos y pagos del personal. Cada persona tiene un solo contrato a la vez: si ya tiene uno vigente o por iniciar solo puede renovarse
 * (el nuevo empieza al día siguiente del fin del anterior) o rescindirse. Además, ningún contrato puede cruzarse en fechas con otro no
 * rescindido de la misma persona. Los contratos de personas distintas no se afectan entre sí, aunque tengan el mismo periodo.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RrhhService {

    private final ContratoPersonalRepository contratos;
    private final PagoPersonalRepository pagos;
    private final DocenteRepository personal;
    private final pe.edu.eduspace.planificacion.repository.AsistenciaPersonalRepository asistencias;

    // ---- Contratos ----

    @Transactional(readOnly = true)
    public List<ContratoResponse> contratos(Long personalId) {
        var lista = personalId == null ? contratos.findAllByOrderByFechaInicioDesc() : contratos.findByPersonalIdOrderByFechaInicioDesc(personalId);
        return lista.stream().map(ContratoResponse::de).toList();
    }

    public ContratoResponse crearContrato(ContratoRequest r) {
        Docente persona = persona(r.personalId());
        if (persona.getEstado() != EstadoDocente.ACTIVO) {
            throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le puede hacer un contrato");
        }
        // Cada persona tiene un solo contrato a la vez: si ya tiene uno que rige (o que está por empezar) no se crea otro; se renueva o se rescinde.
        LocalDate hoy = LocalDate.now();
        for (ContratoPersonal otro : contratos.findByPersonalIdOrderByFechaInicioDesc(persona.getId())) {
            String estado = otro.estadoEfectivo(hoy);
            if ("VIGENTE".equals(estado) || "POR_VENCER".equals(estado) || "POR_INICIAR".equals(estado)) {
                throw new BusinessRuleException(persona.nombreCompleto() + " ya tiene un contrato "
                        + ("POR_INICIAR".equals(estado) ? "por iniciar" : "vigente") + " (desde " + otro.getFechaInicio()
                        + (otro.getFechaFin() == null ? ", indefinido" : " hasta " + otro.getFechaFin())
                        + "). Cada persona tiene un solo contrato: para continuar usa «Renovar contrato», o rescíndelo antes de crear otro");
            }
        }
        ContratoPersonal c = new ContratoPersonal();
        c.setPersonal(persona);
        aplicar(c, r);
        return ContratoResponse.de(contratos.save(c));
    }

    /**
     * Renueva un contrato: el nuevo empieza el día siguiente al fin del anterior (sin huecos ni cruces) y el anterior queda como está, terminando
     * en su fecha. Solo se renueva el último contrato de la persona, que no esté rescindido y que tenga fecha de fin. Tipo, cargo y sueldo se
     * heredan del anterior si no se indican.
     */
    public ContratoResponse renovar(Long id, RenovarRequest r) {
        ContratoPersonal anterior = contrato(id);
        Docente persona = anterior.getPersonal();
        if (persona.getEstado() != EstadoDocente.ACTIVO) {
            throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le puede renovar el contrato");
        }
        if (ContratoPersonal.RESCINDIDO.equals(anterior.getEstado())) {
            throw new BusinessRuleException("Un contrato rescindido no se renueva: crea un contrato nuevo");
        }
        if (anterior.getFechaFin() == null) {
            throw new BusinessRuleException("Un contrato indefinido no necesita renovación");
        }
        boolean yaRenovado = contratos.findByPersonalIdOrderByFechaInicioDesc(persona.getId()).stream()
                .anyMatch(o -> !o.getId().equals(anterior.getId()) && !ContratoPersonal.RESCINDIDO.equals(o.getEstado())
                        && o.getFechaInicio().isAfter(anterior.getFechaInicio()));
        if (yaRenovado) {
            throw new BusinessRuleException("Este contrato ya fue renovado: renueva el más reciente de " + persona.nombreCompleto());
        }
        ContratoRequest nuevo = new ContratoRequest(persona.getId(), r.tipo() != null ? r.tipo() : anterior.getTipo(),
                r.cargo() != null && !r.cargo().isBlank() ? r.cargo() : anterior.getCargo(),
                anterior.getFechaFin().plusDays(1), r.fechaFin(),
                r.remuneracion() != null ? r.remuneracion() : anterior.getRemuneracion(), r.observaciones());
        ContratoPersonal c = new ContratoPersonal();
        c.setPersonal(persona);
        aplicar(c, nuevo);
        return ContratoResponse.de(contratos.save(c));
    }

    public ContratoResponse actualizarContrato(Long id, ContratoRequest r) {
        ContratoPersonal c = contrato(id);
        if (ContratoPersonal.RESCINDIDO.equals(c.getEstado())) {
            throw new BusinessRuleException("Un contrato rescindido no se puede modificar");
        }
        if (!c.getPersonal().getId().equals(r.personalId())) {
            throw new BusinessRuleException("No se puede cambiar de persona un contrato: crea uno nuevo");
        }
        aplicar(c, r);
        return ContratoResponse.de(contratos.save(c));
    }

    public ContratoResponse rescindir(Long id, RescisionRequest r) {
        ContratoPersonal c = contrato(id);
        if (ContratoPersonal.RESCINDIDO.equals(c.getEstado())) {
            throw new BusinessRuleException("El contrato ya está rescindido");
        }
        // Sin fecha indicada se rescinde hoy; si el contrato aún no empezó (p. ej. una renovación hecha por error), se cancela: queda rescindido el día
        // anterior a su inicio, es decir, sin llegar a regir ni un día (uno rescindido su primer día sí rigió ese día).
        boolean cancelacion = r.fecha() == null && LocalDate.now().isBefore(c.getFechaInicio());
        LocalDate fecha = r.fecha() != null ? r.fecha() : cancelacion ? c.getFechaInicio().minusDays(1) : LocalDate.now();
        if (cancelacion) {
            c.setEstado(ContratoPersonal.RESCINDIDO);
            c.setFechaRescision(fecha);
            c.setMotivoRescision(r.motivo());
            return ContratoResponse.de(contratos.save(c));
        }
        if (fecha.isBefore(c.getFechaInicio())) {
            throw new BusinessRuleException("La rescisión no puede ser anterior al inicio del contrato");
        }
        c.setEstado(ContratoPersonal.RESCINDIDO);
        c.setFechaRescision(fecha);
        c.setMotivoRescision(r.motivo());
        return ContratoResponse.de(contratos.save(c));
    }

    private void aplicar(ContratoPersonal c, ContratoRequest r) {
        boolean indefinido = "INDEFINIDO".equals(r.tipo());
        if (!indefinido && r.fechaFin() == null) {
            throw new BusinessRuleException("Un contrato de tipo " + r.tipo() + " necesita fecha de fin");
        }
        if (r.fechaFin() != null && r.fechaFin().isBefore(r.fechaInicio())) {
            throw new BusinessRuleException("La fecha de fin no puede ser anterior a la de inicio");
        }
        LocalDate fin = indefinido ? null : r.fechaFin();
        for (ContratoPersonal otro : contratos.findByPersonalIdOrderByFechaInicioDesc(c.getPersonal().getId())) {
            if (otro.getId().equals(c.getId()) || ContratoPersonal.RESCINDIDO.equals(otro.getEstado())) continue;
            if (seCruzan(r.fechaInicio(), fin, otro.getFechaInicio(), otro.getFechaFin())) {
                throw new BusinessRuleException("Las fechas se cruzan con otro contrato de " + c.getPersonal().nombreCompleto()
                        + " (desde " + otro.getFechaInicio() + (otro.getFechaFin() == null ? ", indefinido" : " hasta " + otro.getFechaFin())
                        + "). Rescíndelo o ajusta las fechas");
            }
        }
        c.setTipo(r.tipo());
        c.setCargo(r.cargo() != null && !r.cargo().isBlank() ? r.cargo().trim() : c.getPersonal().getCargo());
        c.setFechaInicio(r.fechaInicio());
        c.setFechaFin(fin);
        c.setRemuneracion(r.remuneracion());
        c.setObservaciones(r.observaciones());
    }

    /** Dos rangos de fechas se cruzan; un fin nulo es «sin límite». */
    static boolean seCruzan(LocalDate ini1, LocalDate fin1, LocalDate ini2, LocalDate fin2) {
        boolean empiezaAntesDeQueTermine = fin2 == null || !ini1.isAfter(fin2);
        boolean terminaDespuesDeQueEmpiece = fin1 == null || !fin1.isBefore(ini2);
        return empiezaAntesDeQueTermine && terminaDespuesDeQueEmpiece;
    }

    // ---- Pagos ----

    @Transactional(readOnly = true)
    public List<PagoResponse> pagos(Long personalId, String periodo) {
        List<PagoPersonal> lista;
        if (personalId != null) {
            lista = pagos.findByPersonalIdOrderByPeriodoDescIdDesc(personalId);
            if (periodo != null && !periodo.isBlank()) lista = lista.stream().filter(p -> periodo.equals(p.getPeriodo())).toList();
        } else if (periodo != null && !periodo.isBlank()) {
            lista = pagos.findByPeriodoOrderByIdAsc(periodo);
        } else {
            throw new BusinessRuleException("Indica la persona o el periodo (AAAA-MM)");
        }
        return lista.stream().map(PagoResponse::de).toList();
    }

    public PagoResponse registrarPago(PagoRequest r) {
        Docente persona = persona(r.personalId());
        PagoPersonal p = new PagoPersonal();
        p.setPersonal(persona);
        if (r.contratoId() != null) {
            ContratoPersonal c = contrato(r.contratoId());
            if (!c.getPersonal().getId().equals(persona.getId())) {
                throw new BusinessRuleException("Ese contrato no es de " + persona.nombreCompleto());
            }
            p.setContrato(c);
        }
        p.setPeriodo(r.periodo());
        p.setConcepto(r.concepto());
        p.setDescripcion(r.descripcion());
        p.setMonto(r.monto());
        return PagoResponse.de(pagos.save(p));
    }

    /**
     * Los pagos al personal ya no se marcan como pagados directamente: caja los SOLICITA ({@link #solicitar}) y el administrador los
     * APRUEBA ({@link #aprobar}). Se conserva el endpoint para dar un mensaje claro a quien aún lo use.
     */
    public PagoResponse pagar(Long id, PagarRequest r) {
        throw new BusinessRuleException("Los pagos al personal los registra caja y los aprueba el administrador: apruébalo desde «Por aprobar».");
    }

    /** Caja registra cómo se pagó (medio, fecha, referencia). El pago queda POR_APROBAR hasta que el administrador lo apruebe. */
    public PagoResponse solicitar(Long id, PagarRequest r, Long cajeroUsuarioId) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.PENDIENTE.equals(p.getEstado())) {
            throw new BusinessRuleException(PagoPersonal.PAGADO.equals(p.getEstado())
                    ? "Este pago ya está pagado" : "Este pago ya espera la aprobación del administrador");
        }
        if (r.medio() == null || r.medio().isBlank()) {
            throw new BusinessRuleException("Indica el medio con el que se paga");
        }
        p.setEstado(PagoPersonal.POR_APROBAR);
        p.setFechaPago(r.fechaPago() == null ? LocalDate.now() : r.fechaPago());
        p.setMedio(r.medio());
        p.setReferencia(r.referencia());
        p.setSolicitadoPor(cajeroUsuarioId);
        p.setSolicitadoEn(java.time.LocalDateTime.now());
        p.setMotivoRechazo(null);
        return PagoResponse.de(pagos.save(p));
    }

    /** El administrador aprueba: el pago pasa a PAGADO. */
    public PagoResponse aprobar(Long id, Long adminUsuarioId) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.POR_APROBAR.equals(p.getEstado())) {
            throw new BusinessRuleException("Este pago no está esperando aprobación");
        }
        p.setEstado(PagoPersonal.PAGADO);
        p.setAprobadoPor(adminUsuarioId);
        p.setAprobadoEn(java.time.LocalDateTime.now());
        return PagoResponse.de(pagos.save(p));
    }

    /** El administrador rechaza: vuelve a PENDIENTE y caja ve el motivo para corregirlo o volver a solicitarlo. */
    public PagoResponse rechazar(Long id, String motivo, Long adminUsuarioId) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.POR_APROBAR.equals(p.getEstado())) {
            throw new BusinessRuleException("Este pago no está esperando aprobación");
        }
        p.setEstado(PagoPersonal.PENDIENTE);
        p.setMotivoRechazo(motivo);
        p.setAprobadoPor(adminUsuarioId);
        p.setAprobadoEn(java.time.LocalDateTime.now());
        p.setFechaPago(null);
        p.setMedio(null);
        p.setReferencia(null);
        return PagoResponse.de(pagos.save(p));
    }

    @Transactional(readOnly = true)
    public List<PagoResponse> porAprobar() {
        return pagos.findByEstadoOrderBySolicitadoEnAscIdAsc(PagoPersonal.POR_APROBAR).stream().map(PagoResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public long contarPorAprobar() {
        return pagos.countByEstado(PagoPersonal.POR_APROBAR);
    }

    public void eliminarPago(Long id) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.PENDIENTE.equals(p.getEstado())) {
            throw new BusinessRuleException("Solo se elimina un pago pendiente: este ya está por aprobar o pagado");
        }
        pagos.delete(p);
    }

    /**
     * Crea el sueldo pendiente del periodo: UNO por persona y por mes (sin duplicar el ya generado). Si en ese mes se cruzan dos contratos de la misma
     * persona (el que termina y su renovación, que empieza al día siguiente), el sueldo es el del contrato que cubre más días del mes; en empate,
     * el más reciente. Así una renovación a mitad de mes no hace que se pague el mes dos veces.
     */
    public PlanillaGenerada generarPlanilla(String periodo) {
        YearMonth mes;
        try {
            mes = YearMonth.parse(periodo);
        } catch (Exception e) {
            throw new BusinessRuleException("El periodo debe tener el formato AAAA-MM");
        }
        LocalDate desde = mes.atDay(1);
        LocalDate hasta = mes.atEndOfMonth();
        // Por persona: el contrato elegido para este mes.
        java.util.Map<Long, ContratoPersonal> elegidos = new java.util.LinkedHashMap<>();
        for (ContratoPersonal c : contratos.findByEstado(ContratoPersonal.VIGENTE)) {
            if (c.getPersonal().getEstado() != EstadoDocente.ACTIVO) continue;
            if (!seCruzan(desde, hasta, c.getFechaInicio(), c.finEfectivo())) continue;
            // Un contrato sin remuneración (ad honorem) no genera sueldo: la base exige monto > 0.
            if (c.getRemuneracion().signum() <= 0) continue;
            elegidos.merge(c.getPersonal().getId(), c, (actual, otro) -> mejorParaElMes(actual, otro, desde, hasta));
        }
        int creados = 0;
        int existian = 0;
        for (ContratoPersonal c : elegidos.values()) {
            if (pagos.existsByPersonalIdAndPeriodoAndConcepto(c.getPersonal().getId(), periodo, PagoPersonal.SUELDO)) {
                existian++;
                continue;
            }
            PagoPersonal p = new PagoPersonal();
            p.setPersonal(c.getPersonal());
            p.setContrato(c);
            p.setPeriodo(periodo);
            p.setConcepto(PagoPersonal.SUELDO);
            p.setDescripcion("Sueldo " + periodo);
            p.setMonto(c.getRemuneracion());
            pagos.save(p);
            creados++;
        }
        return new PlanillaGenerada(periodo, creados, existian);
    }

    /** Entre dos contratos de la misma persona, el que cubre más días del mes; si empatan, el de inicio más reciente. */
    static ContratoPersonal mejorParaElMes(ContratoPersonal a, ContratoPersonal b, LocalDate desde, LocalDate hasta) {
        long da = diasEnElMes(a, desde, hasta);
        long db = diasEnElMes(b, desde, hasta);
        if (da != db) return da > db ? a : b;
        return a.getFechaInicio().isAfter(b.getFechaInicio()) ? a : b;
    }

    /** Días del mes en que rige un contrato (fechas inclusivas). */
    static long diasEnElMes(ContratoPersonal c, LocalDate desde, LocalDate hasta) {
        LocalDate ini = c.getFechaInicio().isAfter(desde) ? c.getFechaInicio() : desde;
        LocalDate fin = c.finEfectivo() == null || c.finEfectivo().isAfter(hasta) ? hasta : c.finEfectivo();
        return fin.isBefore(ini) ? 0 : java.time.temporal.ChronoUnit.DAYS.between(ini, fin) + 1;
    }

    /** ¿Tiene historial de contratos, pagos o asistencia? Entonces la persona se da de baja, no se borra. */
    @Transactional(readOnly = true)
    public boolean tieneHistorial(Long personalId) {
        return contratos.existsByPersonalId(personalId) || pagos.existsByPersonalId(personalId) || asistencias.existsByPersonalId(personalId);
    }

    private Docente persona(Long id) {
        return personal.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Personal", id));
    }

    private ContratoPersonal contrato(Long id) {
        return contratos.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Contrato", id));
    }

    private PagoPersonal pago(Long id) {
        return pagos.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Pago", id));
    }
}
