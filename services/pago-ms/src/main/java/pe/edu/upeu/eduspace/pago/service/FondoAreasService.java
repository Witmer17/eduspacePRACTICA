package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.AreaAsignada;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.AreaMonto;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.Movimiento;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.Resumen;
import pe.edu.upeu.eduspace.pago.entity.AsignacionArea;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.repository.AsignacionAreaRepository;
import pe.edu.upeu.eduspace.pago.repository.FondoCajaRepository;
import pe.edu.upeu.eduspace.pago.repository.PagoRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Reparto del dinero de caja entre las áreas de trabajo. El dinero en caja es lo cobrado (pagos CONFIRMADO) menos lo que ya se asignó a las
 * áreas: asignar dinero a un área lo saca de caja y quitárselo lo devuelve. Los repartos se hacen de uno en uno (se bloquea una fila única).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class FondoAreasService {

    /** Cuántos movimientos recientes de un área se devuelven. */
    static final int MOVIMIENTOS_MAX = 20;

    private final PagoRepository pagoRepository;
    private final AsignacionAreaRepository asignacionRepository;
    private final FondoCajaRepository fondoRepository;

    @Transactional(readOnly = true)
    public Resumen resumen() {
        BigDecimal cobrado = dinero(pagoRepository.totalCobrado());
        BigDecimal asignado = dinero(asignacionRepository.totalAsignado());
        List<AreaAsignada> areas = asignacionRepository.totalesPorArea().stream()
                .map(f -> new AreaAsignada((Long) f[0], dinero((BigDecimal) f[1])))
                .sorted(Comparator.comparing(AreaAsignada::areaId))
                .toList();
        return new Resumen(cobrado, asignado, cobrado.subtract(asignado), areas);
    }

    /**
     * Deja asignado al área exactamente {@code nuevoTotal}. Si es más de lo que tenía, la diferencia sale de caja y tiene que haber suficiente
     * disponible; si es menos, la diferencia vuelve a caja. Sin cambio no se registra nada.
     */
    @Transactional
    public Resumen fijarAsignacion(Long areaId, BigDecimal nuevoTotal, String motivo, Long usuarioId) {
        if (areaId == null || areaId <= 0) throw new BusinessRuleException("Indica el área");
        BigDecimal nuevo = dinero(nuevoTotal);
        if (nuevo.signum() < 0) throw new BusinessRuleException("El monto asignado no puede ser negativo");
        fondoRepository.bloquear();

        BigDecimal actual = dinero(asignacionRepository.totalDelArea(areaId));
        BigDecimal cambio = nuevo.subtract(actual);
        if (cambio.signum() == 0) return resumen();

        if (cambio.signum() > 0) {
            BigDecimal disponible = dinero(pagoRepository.totalCobrado()).subtract(dinero(asignacionRepository.totalAsignado()));
            if (cambio.compareTo(disponible) > 0) {
                throw new BusinessRuleException("No hay suficiente dinero en caja: disponible S/ " + disponible.max(BigDecimal.ZERO).toPlainString()
                        + " y se necesitan S/ " + cambio.toPlainString() + " más para esa área");
            }
        }
        asignacionRepository.save(AsignacionArea.builder()
                .areaId(areaId).monto(cambio).saldoArea(nuevo)
                .motivo(motivo == null || motivo.isBlank() ? null : motivo.trim()).creadoPor(usuarioId).build());
        log.info("Reparto de caja: área {} de S/ {} a S/ {} (cambio {}) por el usuario {}", areaId, actual, nuevo, cambio, usuarioId);
        return resumen();
    }

    /**
     * Reparte de una vez varias áreas (lo que hace la ventana con todas las áreas). Cada monto es el total que debe quedar en esa área. Es
     * todo o nada: el cambio NETO (lo que sube unas menos lo que bajan otras) no puede pasar de lo disponible en caja; si no alcanza, no se
     * guarda ninguna. Las áreas sin cambio no generan movimiento.
     */
    @Transactional
    public Resumen fijarVarias(List<AreaMonto> areas, String motivo, Long usuarioId) {
        if (areas == null || areas.isEmpty()) throw new BusinessRuleException("Indica al menos un área");
        Set<Long> vistas = new HashSet<>();
        for (AreaMonto a : areas) {
            if (a.areaId() == null || a.areaId() <= 0) throw new BusinessRuleException("Hay un área sin identificar");
            if (!vistas.add(a.areaId())) throw new BusinessRuleException("El área " + a.areaId() + " aparece repetida");
            if (a.monto() == null || a.monto().signum() < 0) throw new BusinessRuleException("El monto asignado no puede ser negativo");
        }
        fondoRepository.bloquear();

        BigDecimal neto = BigDecimal.ZERO;
        List<AsignacionArea> nuevos = new ArrayList<>();
        String nota = motivo == null || motivo.isBlank() ? null : motivo.trim();
        for (AreaMonto a : areas) {
            BigDecimal actual = dinero(asignacionRepository.totalDelArea(a.areaId()));
            BigDecimal nuevo = dinero(a.monto());
            BigDecimal cambio = nuevo.subtract(actual);
            if (cambio.signum() == 0) continue;
            neto = neto.add(cambio);
            nuevos.add(AsignacionArea.builder().areaId(a.areaId()).monto(cambio).saldoArea(nuevo).motivo(nota).creadoPor(usuarioId).build());
        }
        if (nuevos.isEmpty()) return resumen();

        if (neto.signum() > 0) {
            BigDecimal disponible = dinero(pagoRepository.totalCobrado()).subtract(dinero(asignacionRepository.totalAsignado()));
            if (neto.compareTo(disponible) > 0) {
                throw new BusinessRuleException("No hay suficiente dinero en caja: disponible S/ " + disponible.max(BigDecimal.ZERO).toPlainString()
                        + " y el reparto necesita S/ " + neto.toPlainString() + " más");
            }
        }
        asignacionRepository.saveAll(nuevos);
        log.info("Reparto de caja en bloque: {} áreas cambiadas, neto {} por el usuario {}", nuevos.size(), neto, usuarioId);
        return resumen();
    }

    @Transactional(readOnly = true)
    public List<Movimiento> movimientos(Long areaId) {
        return asignacionRepository.movimientosDelArea(areaId, PageRequest.of(0, MOVIMIENTOS_MAX)).stream().map(Movimiento::de).toList();
    }

    private static BigDecimal dinero(BigDecimal n) {
        return (n == null ? BigDecimal.ZERO : n).setScale(2, RoundingMode.HALF_UP);
    }
}
