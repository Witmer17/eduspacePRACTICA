package pe.edu.upeu.eduspace.pago.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/** Lo que pago-ms le avisa a matricula-ms (solo dentro de la red, con el token de servicio). */
@FeignClient(name = "matricula-ms")
public interface MatriculaClient {

    /**
     * La secretaría resolvió un descuento por hermano pedido desde la matrícula en línea: matricula-ms crea las cuentas del apoderado y le avisa por
     * correo que ya puede pagar. {@code estado} es APROBADA o RECHAZADA.
     */
    @PostMapping("/internal/matriculas/{matriculaId}/descuento-hermano-resuelto")
    void descuentoHermanoResuelto(@PathVariable("matriculaId") Long matriculaId, @RequestBody DescuentoResuelto body);

    record DescuentoResuelto(String estado, String descuento, String motivo) {}
}
