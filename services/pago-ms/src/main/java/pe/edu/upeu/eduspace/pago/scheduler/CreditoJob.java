package pe.edu.upeu.eduspace.pago.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Resultado;
import pe.edu.upeu.eduspace.pago.repository.CreditoAlumnoRepository;
import pe.edu.upeu.eduspace.pago.service.CreditoService;

import java.time.LocalDate;
import java.math.BigDecimal;

/**
 * Cobro automático del crédito: todos los días, antes de marcar las cuotas vencidas (00:30) y de calcular la mora, cada alumno con crédito paga
 * con él las pensiones que vencen hoy o ya vencieron. Así una pensión cubierta por el crédito no llega a quedar vencida ni genera mora.
 * Cada alumno se procesa en su propia transacción: si uno falla, los demás siguen.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CreditoJob {

    private final CreditoAlumnoRepository creditos;
    private final CreditoService servicio;

    @Scheduled(cron = "0 15 0 * * *", zone = "America/Lima")
    @SchedulerLock(name = "pago_credito_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    public void cobrarCreditos() {
        ejecutar(LocalDate.now());
    }

    /** Separado del @Scheduled (que toma el lock de ShedLock) para poder invocarlo directamente en pruebas y operaciones. */
    public int ejecutar(LocalDate hoy) {
        int cobrados = 0;
        BigDecimal total = BigDecimal.ZERO;
        for (Long alumnoId : creditos.alumnosConCredito()) {
            try {
                Resultado r = servicio.cobrarAutomatico(alumnoId, hoy);
                if (r.aplicado().signum() > 0) { cobrados++; total = total.add(r.aplicado()); }
            } catch (Exception e) {
                log.error("No se pudo cobrar el crédito del alumno {}: {}", alumnoId, e.getMessage());
            }
        }
        log.info("Cobro automático del crédito a fecha {}: {} alumno(s), S/ {}.", hoy, cobrados, total);
        return cobrados;
    }
}
