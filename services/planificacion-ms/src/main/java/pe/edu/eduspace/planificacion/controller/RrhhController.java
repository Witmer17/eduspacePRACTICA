package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PlanillaGenerada;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RenovarRequest;
import pe.edu.eduspace.planificacion.service.CuentaDepositoService;
import pe.edu.eduspace.planificacion.service.RrhhService;
import pe.edu.eduspace.planificacion.util.Respuestas;

/** Contratos y pagos del personal. Información sensible: todo (también la lectura) es solo para ADMIN (ver SecurityConfig). */
@RestController
@RequestMapping("/api/v1/planificacion/rrhh")
@RequiredArgsConstructor
public class RrhhController {

    private final RrhhService service;
    private final CuentaDepositoService cuentasService;

    @GetMapping("/contratos")
    public List<ContratoResponse> contratos(@RequestParam(required = false) Long personalId) {
        return service.contratos(personalId);
    }

    @PostMapping("/contratos")
    public ResponseEntity<ContratoResponse> crearContrato(@Valid @RequestBody ContratoRequest request) {
        ContratoResponse creado = service.crearContrato(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/contratos/{id}")
    public ContratoResponse actualizarContrato(@PathVariable Long id, @Valid @RequestBody ContratoRequest request) {
        return service.actualizarContrato(id, request);
    }

    @PostMapping("/contratos/{id}/renovar")
    public ResponseEntity<ContratoResponse> renovar(@PathVariable Long id, @Valid @RequestBody RenovarRequest request) {
        ContratoResponse creado = service.renovar(id, request);
        return ResponseEntity.status(201).body(creado);
    }

    @GetMapping("/cuentas")
    public List<CuentaResponse> cuentas(@RequestParam(required = false) Long personalId) {
        return cuentasService.listar(personalId);
    }

    @PostMapping("/cuentas")
    public ResponseEntity<CuentaResponse> agregarCuenta(@Valid @RequestBody CuentaRequest request) {
        CuentaResponse creada = cuentasService.agregar(request);
        return Respuestas.creado(creada.id(), creada);
    }

    @PutMapping("/cuentas/{id}")
    public CuentaResponse actualizarCuenta(@PathVariable Long id, @Valid @RequestBody CuentaRequest request) {
        return cuentasService.actualizar(id, request);
    }

    @PostMapping("/cuentas/{id}/principal")
    public CuentaResponse hacerPrincipal(@PathVariable Long id) {
        return cuentasService.hacerPrincipal(id);
    }

    @DeleteMapping("/cuentas/{id}")
    public ResponseEntity<Void> quitarCuenta(@PathVariable Long id) {
        cuentasService.quitar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/contratos/{id}/rescindir")
    public ContratoResponse rescindir(@PathVariable Long id, @Valid @RequestBody RescisionRequest request) {
        return service.rescindir(id, request);
    }

    @GetMapping("/pagos")
    public List<PagoResponse> pagos(@RequestParam(required = false) Long personalId, @RequestParam(required = false) String periodo) {
        return service.pagos(personalId, periodo);
    }

    @PostMapping("/pagos")
    public ResponseEntity<PagoResponse> registrarPago(@Valid @RequestBody PagoRequest request) {
        PagoResponse creado = service.registrarPago(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PostMapping("/pagos/{id}/pagar")
    public PagoResponse pagar(@PathVariable Long id, @Valid @RequestBody PagarRequest request) {
        return service.pagar(id, request);
    }

    @DeleteMapping("/pagos/{id}")
    public ResponseEntity<Void> eliminarPago(@PathVariable Long id) {
        service.eliminarPago(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/planilla/{periodo}")
    public PlanillaGenerada generarPlanilla(@PathVariable String periodo) {
        return service.generarPlanilla(periodo);
    }
}
