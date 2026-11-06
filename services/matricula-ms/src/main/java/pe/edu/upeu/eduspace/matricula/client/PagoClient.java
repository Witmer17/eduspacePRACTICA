package pe.edu.upeu.eduspace.matricula.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

/** Consulta de deuda para la ratificación (pago-ms). */
@FeignClient(name = "pago-ms")
public interface PagoClient {

    @GetMapping("/internal/pagos/alumno/{id}/deuda")
    Deuda deuda(@PathVariable("id") Long alumnoId);

    @GetMapping("/internal/tarifas/aplicable")
    OfertaCosto tarifa(@RequestParam("anioId") Long anioId, @RequestParam("nivelId") Long nivelId, @RequestParam("gradoId") Long gradoId);

    @GetMapping("/internal/pagos/matricula/{id}/cuotas")
    java.util.List<CuotaResumen> cuotas(@PathVariable("id") Long matriculaId);

    @PostMapping("/internal/pagos/matricula-en-linea")
    ResultadoCobro cobrar(@RequestBody CobroMatricula body);

    /** Valida un código de descuento (404 si no existe o ya no está vigente). */
    @GetMapping("/internal/descuentos/codigo/{codigo}")
    DescuentoPublico descuentoPorCodigo(@PathVariable("codigo") String codigo);

    /** Le asigna al alumno el descuento del código; debe hacerse antes de que se genere la cuota de matrícula. */
    @PostMapping("/internal/descuentos/asignar-por-codigo")
    void asignarDescuentoPorCodigo(@RequestBody AsignacionPorCodigo body);

    /** Formas de pago de la pensión con su descuento (la configuración vive en pago-ms). */
    @GetMapping("/internal/pagos/planes-pago")
    java.util.List<PlanOpcion> planesPago();

    /** Descuentos que se pueden pedir para la matrícula; de ahí se elige el de hermanos. */
    @GetMapping("/internal/descuentos/opciones-matricula")
    java.util.List<OpcionDescuento> opcionesMatricula();

    /** Registra el descuento por hermano que pidió la familia (idempotente: si ya está en revisión devuelve esa). */
    @PostMapping("/internal/descuentos/solicitud-publica")
    SolicitudDescuento solicitudPublica(@RequestBody PedidoHermano body);

    @GetMapping("/internal/descuentos/solicitud/matricula/{matriculaId}")
    SolicitudDeMatricula solicitudDeMatricula(@PathVariable("matriculaId") Long matriculaId);

    record OpcionDescuento(Long id, String nombre, String tipo, BigDecimal valor) {}

    record PedidoHermano(Long matriculaId, Long descuentoId, Long hermanoAlumnoId, String hermanoDocumento, String hermanoNombre) {}

    /** Lo que matricula-ms necesita de una solicitud: su estado (PENDIENTE, APROBADA, RECHAZADA) y por qué se rechazó. */
    record SolicitudDescuento(Long id, String descuentoNombre, String estado, String motivoResolucion) {}

    record SolicitudDeMatricula(SolicitudDescuento solicitud) {}

    record PlanOpcion(String id, String etiqueta, BigDecimal descuentoPorcentaje, int cuotasEnDiezMeses) {}

    record DescuentoPublico(String codigo, String nombre, String tipo, BigDecimal valor, String aplicaA) {}

    record AsignacionPorCodigo(String codigo, Long alumnoId, Long anioId, String motivo) {}

    record Costo(Long tarifaId, BigDecimal monto, Short numCuotas, Short mesInicio, Short diaVencimiento) {}

    record OfertaCosto(Costo matricula, Costo pension) {}

    record CuotaResumen(Long id, String concepto, String descripcion, Short numeroCuota, BigDecimal montoBase, BigDecimal descuento,
                        BigDecimal montoTotal, BigDecimal saldo, String fechaVencimiento, String estado) {}

    record CobroMatricula(Long matriculaId, Long alumnoId, String pagadorNombre, String pagadorDocumento, String referencia) {}

    record ResultadoCobro(Long pagoId, String comprobante, BigDecimal monto, Long cuotaId) {}

    record Deuda(Long alumnoId, boolean tieneDeudaVencida, BigDecimal montoVencido, Integer cuotasVencidasCount) {}
}
