# 📘 CÓDIGO COMPLETO MICROSERVICIO PAGO-MS

> **Microservicio:** `pago-ms`  
> **Propósito:** Cobranza presencial en caja, cronograma de pensiones, emisión de recibos y boletas con correlativos protegidos, control de concurrencia optimista, idempotencia y publicación de eventos de pago mediante Outbox Pattern.  
> **Total de clases incluidas:** 130 clases (100% completas, sin omisiones ni truncamientos).

---

## 📑 Índice de Clases del Microservicio


### Entidades JPA

- [1. AlertaAdmin.java](#1-alertaadminjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/AlertaAdmin.java`)
- [2. AsignacionArea.java](#2-asignacionareajava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/AsignacionArea.java`)
- [3. CajaSesion.java](#3-cajasesionjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/CajaSesion.java`)
- [4. Comprobante.java](#4-comprobantejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Comprobante.java`)
- [5. ConceptoPago.java](#5-conceptopagojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/ConceptoPago.java`)
- [6. CreditoAlumno.java](#6-creditoalumnojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/CreditoAlumno.java`)
- [7. Cuota.java](#7-cuotajava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Cuota.java`)
- [8. Descuento.java](#8-descuentojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Descuento.java`)
- [9. DescuentoAlumno.java](#9-descuentoalumnojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/DescuentoAlumno.java`)
- [10. EventoProcesado.java](#10-eventoprocesadojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/EventoProcesado.java`)
- [11. FondoCaja.java](#11-fondocajajava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/FondoCaja.java`)
- [12. MatriculaLocal.java](#12-matriculalocaljava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/MatriculaLocal.java`)
- [13. MovimientoCredito.java](#13-movimientocreditojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/MovimientoCredito.java`)
- [14. OrdenPago.java](#14-ordenpagojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/OrdenPago.java`)
- [15. OutboxEvento.java](#15-outboxeventojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/OutboxEvento.java`)
- [16. Pago.java](#16-pagojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Pago.java`)
- [17. PagoDetalle.java](#17-pagodetallejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/PagoDetalle.java`)
- [18. SerieComprobante.java](#18-seriecomprobantejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/SerieComprobante.java`)
- [19. SolicitudDescuento.java](#19-solicituddescuentojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/SolicitudDescuento.java`)
- [20. Tarifa.java](#20-tarifajava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Tarifa.java`)

### Repositorios Spring Data JPA

- [21. AlertaAdminRepository.java](#21-alertaadminrepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/AlertaAdminRepository.java`)
- [22. AsignacionAreaRepository.java](#22-asignacionarearepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/AsignacionAreaRepository.java`)
- [23. CajaSesionRepository.java](#23-cajasesionrepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/CajaSesionRepository.java`)
- [24. ComprobanteRepository.java](#24-comprobanterepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/ComprobanteRepository.java`)
- [25. ConceptoPagoRepository.java](#25-conceptopagorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/ConceptoPagoRepository.java`)
- [26. CreditoAlumnoRepository.java](#26-creditoalumnorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/CreditoAlumnoRepository.java`)
- [27. CuotaRepository.java](#27-cuotarepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/CuotaRepository.java`)
- [28. DescuentoAlumnoRepository.java](#28-descuentoalumnorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/DescuentoAlumnoRepository.java`)
- [29. DescuentoRepository.java](#29-descuentorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/DescuentoRepository.java`)
- [30. EventoProcesadoRepository.java](#30-eventoprocesadorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/EventoProcesadoRepository.java`)
- [31. FondoCajaRepository.java](#31-fondocajarepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/FondoCajaRepository.java`)
- [32. MatriculaLocalRepository.java](#32-matriculalocalrepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/MatriculaLocalRepository.java`)
- [33. MovimientoCreditoRepository.java](#33-movimientocreditorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/MovimientoCreditoRepository.java`)
- [34. OrdenPagoRepository.java](#34-ordenpagorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/OrdenPagoRepository.java`)
- [35. OutboxEventoRepository.java](#35-outboxeventorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/OutboxEventoRepository.java`)
- [36. PagoDetalleRepository.java](#36-pagodetallerepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/PagoDetalleRepository.java`)
- [37. PagoRepository.java](#37-pagorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/PagoRepository.java`)
- [38. SerieComprobanteRepository.java](#38-seriecomprobanterepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/SerieComprobanteRepository.java`)
- [39. SolicitudDescuentoRepository.java](#39-solicituddescuentorepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/SolicitudDescuentoRepository.java`)
- [40. TarifaRepository.java](#40-tarifarepositoryjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/TarifaRepository.java`)

### DTOs (Data Transfer Objects)

- [41. AbrirCajaRequest.java](#41-abrircajarequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/AbrirCajaRequest.java`)
- [42. AnularPagoRequest.java](#42-anularpagorequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/AnularPagoRequest.java`)
- [43. AsignarDescuentoRequest.java](#43-asignardescuentorequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/AsignarDescuentoRequest.java`)
- [44. CajaResponse.java](#44-cajaresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CajaResponse.java`)
- [45. CerrarCajaRequest.java](#45-cerrarcajarequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CerrarCajaRequest.java`)
- [46. CierreCajaResponse.java](#46-cierrecajaresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CierreCajaResponse.java`)
- [47. ComprobanteResponse.java](#47-comprobanteresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ComprobanteResponse.java`)
- [48. ConceptoRequest.java](#48-conceptorequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ConceptoRequest.java`)
- [49. ConceptoResponse.java](#49-conceptoresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ConceptoResponse.java`)
- [50. CreditoDtos.java](#50-creditodtosjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CreditoDtos.java`)
- [51. CuotaResponse.java](#51-cuotaresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CuotaResponse.java`)
- [52. DescuentoRequest.java](#52-descuentorequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/DescuentoRequest.java`)
- [53. DescuentoResponse.java](#53-descuentoresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/DescuentoResponse.java`)
- [54. EstadoCuentaResponse.java](#54-estadocuentaresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/EstadoCuentaResponse.java`)
- [55. FondoDtos.java](#55-fondodtosjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/FondoDtos.java`)
- [56. MorososResponse.java](#56-morososresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/MorososResponse.java`)
- [57. PageResponse.java](#57-pageresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/PageResponse.java`)
- [58. PagoDetalleRequest.java](#58-pagodetallerequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/PagoDetalleRequest.java`)
- [59. PagoResponse.java](#59-pagoresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/PagoResponse.java`)
- [60. RegistrarPagoRequest.java](#60-registrarpagorequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/RegistrarPagoRequest.java`)
- [61. ReporteCobranzaResponse.java](#61-reportecobranzaresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ReporteCobranzaResponse.java`)
- [62. TarifaRequest.java](#62-tarifarequestjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/TarifaRequest.java`)
- [63. TarifaResponse.java](#63-tarifaresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/TarifaResponse.java`)

### Servicios y Lógica de Negocio

- [64. AnulacionService.java](#64-anulacionservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/AnulacionService.java`)
- [65. CajaService.java](#65-cajaservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/CajaService.java`)
- [66. ComprobanteService.java](#66-comprobanteservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/ComprobanteService.java`)
- [67. ConceptoService.java](#67-conceptoservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/ConceptoService.java`)
- [68. CreditoService.java](#68-creditoservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/CreditoService.java`)
- [69. DescuentoService.java](#69-descuentoservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/DescuentoService.java`)
- [70. FondoAreasService.java](#70-fondoareasservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/FondoAreasService.java`)
- [71. GeneradorCuotasService.java](#71-generadorcuotasservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/GeneradorCuotasService.java`)
- [72. MatriculaLocalService.java](#72-matriculalocalservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/MatriculaLocalService.java`)
- [73. MatriculaPagoService.java](#73-matriculapagoservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/MatriculaPagoService.java`)
- [74. MoraService.java](#74-moraservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/MoraService.java`)
- [75. PagoOnlineService.java](#75-pagoonlineservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/PagoOnlineService.java`)
- [76. PagoService.java](#76-pagoservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/PagoService.java`)
- [77. SolicitudDescuentoService.java](#77-solicituddescuentoservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/SolicitudDescuentoService.java`)
- [78. TarifaService.java](#78-tarifaservicejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/TarifaService.java`)

### Controladores REST API

- [79. AlertaController.java](#79-alertacontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/AlertaController.java`)
- [80. CajaController.java](#80-cajacontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/CajaController.java`)
- [81. ConceptoController.java](#81-conceptocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/ConceptoController.java`)
- [82. CreditoController.java](#82-creditocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/CreditoController.java`)
- [83. DescuentoController.java](#83-descuentocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/DescuentoController.java`)
- [84. FondoAreasController.java](#84-fondoareascontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/FondoAreasController.java`)
- [85. InternalMatriculaPagoController.java](#85-internalmatriculapagocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/InternalMatriculaPagoController.java`)
- [86. InternalPagoController.java](#86-internalpagocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/InternalPagoController.java`)
- [87. MatriculaPagoController.java](#87-matriculapagocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/MatriculaPagoController.java`)
- [88. PagoController.java](#88-pagocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/PagoController.java`)
- [89. PlanPagoController.java](#89-planpagocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/PlanPagoController.java`)
- [90. SolicitudDescuentoController.java](#90-solicituddescuentocontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/SolicitudDescuentoController.java`)
- [91. TarifaController.java](#91-tarifacontrollerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/TarifaController.java`)

### Mensajería Kafka (Consumers / Publishers)

- [92. MatriculaEventConsumer.java](#92-matriculaeventconsumerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/messaging/MatriculaEventConsumer.java`)
- [93. OutboxPublisher.java](#93-outboxpublisherjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/messaging/OutboxPublisher.java`)

### Eventos de Dominio

- [94. EventoSobre.java](#94-eventosobrejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/EventoSobre.java`)
- [95. MatriculaEvent.java](#95-matriculaeventjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/MatriculaEvent.java`)
- [96. PagoAnuladoEvent.java](#96-pagoanuladoeventjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoAnuladoEvent.java`)
- [97. PagoConfirmadoEvent.java](#97-pagoconfirmadoeventjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoConfirmadoEvent.java`)
- [98. PagoPorVencerEvent.java](#98-pagoporvencereventjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoPorVencerEvent.java`)
- [99. PagoVencidoEvent.java](#99-pagovencidoeventjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoVencidoEvent.java`)

### Tareas Programadas (Schedulers / Jobs)

- [100. AvisoPreviosJob.java](#100-avisopreviosjobjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/AvisoPreviosJob.java`)
- [101. CreditoJob.java](#101-creditojobjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/CreditoJob.java`)
- [102. LimpiezaJob.java](#102-limpiezajobjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/LimpiezaJob.java`)
- [103. ResponsableJob.java](#103-responsablejobjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/ResponsableJob.java`)
- [104. VencimientoJob.java](#104-vencimientojobjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/VencimientoJob.java`)

### Configuración Spring Boot

- [105. CacheConfig.java](#105-cacheconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/CacheConfig.java`)
- [106. FeignConfig.java](#106-feignconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/FeignConfig.java`)
- [107. KafkaConfig.java](#107-kafkaconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/KafkaConfig.java`)
- [108. KafkaErrorHandlingConfig.java](#108-kafkaerrorhandlingconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/KafkaErrorHandlingConfig.java`)
- [109. MinioConfig.java](#109-minioconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/MinioConfig.java`)
- [110. OpenApiConfig.java](#110-openapiconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/OpenApiConfig.java`)
- [111. PagoProperties.java](#111-pagopropertiesjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/PagoProperties.java`)
- [112. SecurityConfig.java](#112-securityconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/SecurityConfig.java`)
- [113. ShedLockConfig.java](#113-shedlockconfigjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/ShedLockConfig.java`)

### Manejo de Excepciones y Errores

- [114. BusinessRuleException.java](#114-businessruleexceptionjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/BusinessRuleException.java`)
- [115. ErrorResponse.java](#115-errorresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/ErrorResponse.java`)
- [116. GlobalExceptionHandler.java](#116-globalexceptionhandlerjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/GlobalExceptionHandler.java`)
- [117. ResourceNotFoundException.java](#117-resourcenotfoundexceptionjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/ResourceNotFoundException.java`)

### Seguridad, Filtros y Clientes

- [118. AlumnoContactoResponse.java](#118-alumnocontactoresponsejava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/AlumnoContactoResponse.java`)
- [119. AlumnosClient.java](#119-alumnosclientjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/AlumnosClient.java`)
- [120. AlumnosGateway.java](#120-alumnosgatewayjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/AlumnosGateway.java`)
- [121. CorrelationIdFilter.java](#121-correlationidfilterjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/filter/CorrelationIdFilter.java`)
- [122. FirmaWebhook.java](#122-firmawebhookjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/FirmaWebhook.java`)
- [123. MatriculaClient.java](#123-matriculaclientjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/MatriculaClient.java`)
- [124. PasarelaSimulada.java](#124-pasarelasimuladajava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/PasarelaSimulada.java`)
- [125. PdfTexto.java](#125-pdftextojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/PdfTexto.java`)
- [126. PlanPago.java](#126-planpagojava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/PlanPago.java`)
- [127. PlanificacionClient.java](#127-planificacionclientjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/PlanificacionClient.java`)
- [128. ServiceTokenFilter.java](#128-servicetokenfilterjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/filter/ServiceTokenFilter.java`)
- [129. UsuarioActual.java](#129-usuarioactualjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/security/UsuarioActual.java`)

### Clase Principal de Arranque

- [130. PagoApplication.java](#130-pagoapplicationjava) (`services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/PagoApplication.java`)

---

<a id="1-alertaadminjava"></a>
## 1. `AlertaAdmin.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/AlertaAdmin.java`

### **¿Qué hace esta clase?**
Entidad que registra incidencias o alertas administrativas generadas automáticamente para supervisión de directores y administradores.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alertas_admin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertaAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String tipo;

    @Column(name = "matricula_id")
    private Long matriculaId;

    @Column(name = "anio_id")
    private Long anioId;

    @Column(name = "nivel_id")
    private Long nivelId;

    @Column(name = "grado_id")
    private Long gradoId;

    @Column(nullable = false, length = 400)
    private String detalle;

    @Builder.Default
    @Column(nullable = false)
    private Boolean resuelta = false;

    @Builder.Default
    @Column(name = "creada_en", nullable = false)
    private LocalDateTime creadaEn = LocalDateTime.now();

    @Column(name = "resuelta_en")
    private LocalDateTime resueltaEn;
}
```

---

<a id="2-asignacionareajava"></a>
## 2. `AsignacionArea.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/AsignacionArea.java`

### **¿Qué hace esta clase?**
Registra los movimientos contables de distribución presupuestaria de los fondos recaudados hacia áreas educativas.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Un movimiento del reparto de caja: positivo = dinero que sale de caja hacia el área; negativo = dinero que vuelve a caja. */
@Entity
@Table(name = "asignaciones_area")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsignacionArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Id del área en planificacion-ms. */
    @Column(name = "area_id", nullable = false)
    private Long areaId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal monto;

    /** Total asignado al área después de este movimiento. */
    @Column(name = "saldo_area", nullable = false, precision = 12, scale = 2)
    private BigDecimal saldoArea;

    @Column(length = 255)
    private String motivo;

    @Column(name = "creado_por")
    private Long creadoPor;

    @Column(name = "creado_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadoEn = LocalDateTime.now();
}
```

---

<a id="3-cajasesionjava"></a>
## 3. `CajaSesion.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/CajaSesion.java`

### **¿Qué hace esta clase?**
Gestiona la apertura y arqueo/cierre de la ventanilla del cajero. Registra el usuario cajero, la fecha/hora y saldo de apertura, la fecha/hora de cierre, el efectivo físico contado y declarado por el cajero, el efectivo calculado por el sistema mediante la sumatoria de pagos confirmados, y la diferencia resultante (sobrante o faltante).

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cajas_sesion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CajaSesion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cajero_usuario_id", nullable = false)
    private Long cajeroUsuarioId;

    @Column(name = "apertura_en", nullable = false)
    @Builder.Default
    private LocalDateTime aperturaEn = LocalDateTime.now();

    @Column(name = "monto_apertura", nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal montoApertura = BigDecimal.ZERO;

    @Column(name = "cierre_en")
    private LocalDateTime cierreEn;

    @Column(name = "monto_cierre_declarado", precision = 10, scale = 2)
    private BigDecimal montoCierreDeclarado;

    @Column(name = "monto_cierre_sistema", precision = 10, scale = 2)
    private BigDecimal montoCierreSistema;

    @Column(precision = 10, scale = 2)
    private BigDecimal diferencia;

    @Column(nullable = false, length = 8)
    @Builder.Default
    private String estado = "ABIERTA"; // ABIERTA, CERRADA
}
```

---

<a id="4-comprobantejava"></a>
## 4. `Comprobante.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Comprobante.java`

### **¿Qué hace esta clase?**
Representa el comprobante de pago emitido legal e internamente (RECIBO o BOLETA). Vinculado `@OneToOne` con `Pago`, posee serie, número secuencial correlativo único, estado (EMITIDO, ANULADO) y ruta opcional hacia el archivo PDF almacenado en MinIO.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "comprobantes", uniqueConstraints = {
    @UniqueConstraint(name = "uk_comprobante_pago", columnNames = {"pago_id"}),
    @UniqueConstraint(name = "uk_comprobante_numero", columnNames = {"tipo", "serie", "numero"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comprobante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pago_id", nullable = false)
    private Pago pago;

    @Column(nullable = false, length = 10)
    private String tipo; // RECIBO, BOLETA

    @Column(nullable = false, length = 4)
    private String serie;

    @Column(nullable = false)
    private Long numero;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(nullable = false, length = 8)
    @Builder.Default
    private String estado = "EMITIDO"; // EMITIDO, ANULADO

    @Column(name = "ruta_pdf", length = 400)
    private String rutaPdf;

    @Column(name = "emitido_en", nullable = false)
    @Builder.Default
    private LocalDateTime emitidoEn = LocalDateTime.now();
}
```

---

<a id="5-conceptopagojava"></a>
## 5. `ConceptoPago.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/ConceptoPago.java`

### **¿Qué hace esta clase?**
Catálogo institucional de conceptos cobrables (MATRICULA, PENSION, CONSTANCIA, CERTIFICADO, etc.). Clasifica los conceptos en tipos y permite activarlos o desactivarlos administrativamente.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "conceptos_pago")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConceptoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String codigo;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 10)
    private String tipo; // MATRICULA, PENSION, OTRO

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;
}
```

---

<a id="6-creditoalumnojava"></a>
## 6. `CreditoAlumno.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/CreditoAlumno.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `CreditoAlumno` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** El crédito (saldo a favor) de un alumno: lo depositado y aún no cobrado de sus cuotas. */
@Entity
@Table(name = "creditos_alumno")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditoAlumno {

    @Id
    @Column(name = "alumno_id")
    private Long alumnoId;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(name = "actualizado_en", nullable = false)
    @Builder.Default
    private LocalDateTime actualizadoEn = LocalDateTime.now();

    @Version
    @Column(nullable = false)
    @Builder.Default
    private Long version = 0L;
}
```

---

<a id="7-cuotajava"></a>
## 7. `Cuota.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Cuota.java`

### **¿Qué hace esta clase?**
Modela la cuenta por cobrar u obligación económica de un alumno matriculado (p. ej., matrícula o pensión mensual 1 a 10). Contiene montos desglosados (montoBase, descuento, mora, montoTotal, saldo actual), fecha de vencimiento y estado (PENDIENTE, PARCIAL, PAGADA, VENCIDA, ANULADA). Incluye `@Version private Long version` para control de concurrencia optimista, garantizando que dos cobros concurrentes nunca dejen saldos inconsistentes.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "cuotas", uniqueConstraints = {
    @UniqueConstraint(name = "uk_cuota", columnNames = {"matricula_id", "concepto_id", "numero_cuota"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cuota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matricula_id", nullable = false)
    private MatriculaLocal matricula;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concepto_id", nullable = false)
    private ConceptoPago concepto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tarifa_id")
    private Tarifa tarifa;

    @Column(nullable = false, length = 150)
    private String descripcion;

    @Column(name = "numero_cuota", nullable = false)
    @Builder.Default
    private Short numeroCuota = 1;

    @Column(name = "monto_base", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoBase;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal descuento = BigDecimal.ZERO;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal mora = BigDecimal.ZERO;

    @Column(name = "monto_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoTotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal saldo;

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @Column(nullable = false, length = 10)
    @Builder.Default
    private String estado = "PENDIENTE"; // PENDIENTE, PARCIAL, PAGADA, VENCIDA, ANULADA

    @Column(name = "aviso_enviado", nullable = false)
    @Builder.Default
    private Boolean avisoEnviado = false;

    @Column(name = "creada_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadaEn = LocalDateTime.now();

    @Column(name = "actualizada_en", nullable = false)
    @Builder.Default
    private LocalDateTime actualizadaEn = LocalDateTime.now();

    @Version
    @Column(nullable = false)
    @Builder.Default
    private Long version = 0L;
}
```

---

<a id="8-descuentojava"></a>
## 8. `Descuento.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Descuento.java`

### **¿Qué hace esta clase?**
Catálogo maestro de políticas de descuento escolar (ej. Beca por excelencia académica, descuento por hermanos, beca deportiva), especificando si aplica por porcentaje o monto fijo y sobre qué conceptos tiene efecto.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "descuentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Descuento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 10)
    private String tipo; // PORCENTAJE, MONTO_FIJO

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "aplica_a", nullable = false, length = 10)
    @Builder.Default
    private String aplicaA = "PENSION"; // MATRICULA, PENSION, TODO

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;

    /** Código que la familia escribe en la matrícula en línea para canjear el descuento; nulo = solo lo asigna el administrador. */
    @Column(length = 40)
    private String codigo;
}
```

---

<a id="9-descuentoalumnojava"></a>
## 9. `DescuentoAlumno.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/DescuentoAlumno.java`

### **¿Qué hace esta clase?**
Asigna un beneficio de descuento vigente a un alumno específico para un año académico, registrando la justificación o motivo, el usuario administrador que lo autorizó y su vigencia.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "descuentos_alumno", uniqueConstraints = {
    @UniqueConstraint(name = "uk_desc_alumno", columnNames = {"alumno_id", "descuento_id", "anio_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DescuentoAlumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "descuento_id", nullable = false)
    private Descuento descuento;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(length = 300)
    private String motivo;

    @Column(name = "aprobado_por")
    private Long aprobadoPor;

    @Column(nullable = false)
    @Builder.Default
    private Boolean vigente = true;
}
```

---

<a id="10-eventoprocesadojava"></a>
## 10. `EventoProcesado.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/EventoProcesado.java`

### **¿Qué hace esta clase?**
Implementa el patrón de Consumidor Idempotente. Guarda los IDs de eventos ya procesados provenientes de Kafka para asegurar que si un evento se reenvía por reintentos de la red, no sea procesado dos veces.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "eventos_procesados")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoProcesado {

    @Id
    @Column(name = "event_id")
    private UUID eventId;

    @Column(name = "event_type", nullable = false, length = 80)
    private String eventType;

    @Column(name = "procesado_en", nullable = false)
    @Builder.Default
    private LocalDateTime procesadoEn = LocalDateTime.now();
}
```

---

<a id="11-fondocajajava"></a>
## 11. `FondoCaja.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/FondoCaja.java`

### **¿Qué hace esta clase?**
Entidad de control de bloqueo para distribución y transferencias de saldos entre áreas institucionales.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/** Fila única (id = 1) que se bloquea mientras se reparte dinero entre áreas. */
@Entity
@Table(name = "fondo_caja")
@Getter
@Setter
public class FondoCaja {

    @Id
    private Long id;

    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();
}
```

---

<a id="12-matriculalocaljava"></a>
## 12. `MatriculaLocal.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/MatriculaLocal.java`

### **¿Qué hace esta clase?**
Read-model y réplica local de la matrícula en la base de datos de pagos. Mantiene sincronizada la información del alumno, nivel, grado, sección y apoderado responsable sin requerir llamadas REST sincrónicas lentas hacia otros servicios.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "matriculas_local")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatriculaLocal {

    @Id
    @Column(name = "matricula_id")
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "alumno_nombre", nullable = false, length = 220)
    private String alumnoNombre;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(name = "nivel_id")
    private Long nivelId;

    @Column(name = "grado_id", nullable = false)
    private Long gradoId;

    @Column(name = "seccion_id", nullable = false)
    private Long seccionId;

    @Column(name = "estado", nullable = false, length = 15)
    private String estado;

    /** Forma de pago de las pensiones acordada al matricular (MENSUAL, BIMESTRAL, SEMESTRAL o ANUAL). */
    @Column(name = "plan_pago", nullable = false, length = 12)
    @Builder.Default
    private String planPago = "MENSUAL";

    @Column(name = "responsable_usuario_id")
    private Long responsableUsuarioId;

    @Column(name = "responsable_nombre", length = 220)
    private String responsableNombre;

    @Column(name = "actualizado_en", nullable = false)
    @Builder.Default
    private LocalDateTime actualizadoEn = LocalDateTime.now();
}
```

---

<a id="13-movimientocreditojava"></a>
## 13. `MovimientoCredito.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/MovimientoCredito.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `MovimientoCredito` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Una línea del libro del crédito de un alumno (el monto es positivo; el tipo dice si suma o resta). */
@Entity
@Table(name = "movimientos_credito")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovimientoCredito {

    public static final String DEPOSITO = "DEPOSITO";
    public static final String COBRO_CUOTA = "COBRO_CUOTA";
    public static final String REVERSION = "REVERSION";
    public static final String ANULACION = "ANULACION";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(nullable = false, length = 12)
    private String tipo;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(name = "saldo_despues", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldoDespues;

    @Column(length = 15)
    private String medio;

    @Column(length = 80)
    private String referencia;

    @Column(name = "cuota_id")
    private Long cuotaId;

    @Column(name = "pago_id")
    private Long pagoId;

    @Column(name = "caja_sesion_id")
    private Long cajaSesionId;

    @Column(name = "anula_a")
    private Long anulaA;

    @Column(nullable = false)
    @Builder.Default
    private Boolean anulado = false;

    @Column(length = 200)
    private String detalle;

    @Column(name = "registrado_por")
    private Long registradoPor;

    @Column(name = "creado_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "idempotency_key", length = 80)
    private String idempotencyKey;

    /** ¿Suma al crédito? (depósitos y reversiones); lo demás resta. */
    public boolean suma() {
        return DEPOSITO.equals(tipo) || REVERSION.equals(tipo);
    }
}
```

---

<a id="14-ordenpagojava"></a>
## 14. `OrdenPago.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/OrdenPago.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `OrdenPago` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Una orden para pagar lo que falta de la matrícula: la crea el servidor y la cierra el aviso de la pasarela. */
@Entity
@Table(name = "ordenes_pago")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdenPago {

    public static final String PENDIENTE = "PENDIENTE";
    public static final String APROBADA = "APROBADA";
    public static final String RECHAZADA = "RECHAZADA";
    public static final String EXPIRADA = "EXPIRADA";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String codigo;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(nullable = false, length = 10)
    @Builder.Default
    private String estado = PENDIENTE;

    @Column(name = "creada_por")
    private Long creadaPor;

    @Column(name = "creada_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadaEn = LocalDateTime.now();

    @Column(name = "expira_en", nullable = false)
    private LocalDateTime expiraEn;

    /** El id que devolvió la pasarela (su «número de operación»). */
    @Column(name = "transaccion_id", length = 60)
    private String transaccionId;

    @Column(length = 15)
    private String medio;

    @Column(length = 200)
    private String pagador;

    /** Lo que respondió la pasarela (aprobado o el motivo del rechazo). */
    @Column(length = 200)
    private String respuesta;

    @Column(name = "confirmada_en")
    private LocalDateTime confirmadaEn;

    /** El pago con el que se cobró la matrícula del crédito, si ya se cobró. */
    @Column(name = "pago_id")
    private Long pagoId;
}
```

---

<a id="15-outboxeventojava"></a>
## 15. `OutboxEvento.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/OutboxEvento.java`

### **¿Qué hace esta clase?**
Implementa el patrón de mensajería confiable *Transactional Outbox Pattern*. Almacena los eventos de dominio (como `PagoConfirmadoEvent`) en la misma transacción SQL del cobro. Un proceso en segundo plano (`OutboxPublisher`) los lee y los emite hacia Apache Kafka, garantizando entrega at-least-once sin caídas por fallos de red.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "outbox_eventos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OutboxEvento {

    @Id
    private UUID id;

    @Column(name = "aggregate_type", nullable = false, length = 40)
    private String aggregateType;

    @Column(name = "aggregate_id", nullable = false, length = 40)
    private String aggregateId;

    @Column(nullable = false, length = 80)
    private String topic;

    @Column(nullable = false, length = 80)
    private String clave;

    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private String payload;

    @Column(name = "creado_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "enviado_en")
    private LocalDateTime enviadoEn;

    @Column(nullable = false)
    @Builder.Default
    private Short intentos = 0;

    @Column(name = "ultimo_error", length = 500)
    private String ultimoError;
}
```

---

<a id="16-pagojava"></a>
## 16. `Pago.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Pago.java`

### **¿Qué hace esta clase?**
Entidad principal de cobro. Representa la transacción económica realizada en caja física o pasarela virtual. Registra el alumno beneficiario, el pagador (apoderado con su DNI/nombre), el monto total cobrado, el medio de pago (EFECTIVO, YAPE_PLIN, TARJETA, TRANSFERENCIA), la sesión de caja en la que ingresa el dinero, y el idempotencyKey para evitar cobros duplicados ante reintentos de red. Mantiene la lista de cuotas amortizadas mediante `@OneToMany` con `PagoDetalle`.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pagos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "pagador_nombre", length = 200)
    private String pagadorNombre;

    @Column(name = "pagador_documento", length = 20)
    private String pagadorDocumento;

    @Column(name = "monto_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoTotal;

    @Column(nullable = false, length = 15)
    private String medio; // EFECTIVO, TARJETA, YAPE_PLIN, TRANSFERENCIA, ONLINE_SIMULADO

    @Column(length = 80)
    private String referencia;

    @Column(nullable = false, length = 10)
    @Builder.Default
    private String estado = "CONFIRMADO"; // CONFIRMADO, ANULADO; PENDIENTE y RECHAZADO en pagos de apoderados por aprobar

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "caja_sesion_id")
    private CajaSesion cajaSesion;

    @Column(name = "registrado_por")
    private Long registradoPor;

    @Column(name = "pagado_en", nullable = false)
    @Builder.Default
    private LocalDateTime pagadoEn = LocalDateTime.now();

    @Column(name = "anulado_en")
    private LocalDateTime anuladoEn;

    @Column(name = "anulado_por")
    private Long anuladoPor;

    @Column(name = "motivo_anulacion", length = 300)
    private String motivoAnulacion;

    /** Quien aprobó o rechazó el pago de un apoderado. */
    @Column(name = "aprobado_por")
    private Long aprobadoPor;

    @Column(name = "aprobado_en")
    private LocalDateTime aprobadoEn;

    @Column(name = "motivo_rechazo", length = 300)
    private String motivoRechazo;

    /** RECIBO o BOLETA, el que pidió el apoderado: se emite al aprobar. */
    @Column(name = "tipo_comprobante", length = 10)
    private String tipoComprobante;

    @Column(name = "idempotency_key", length = 80)
    private String idempotencyKey;

    @OneToMany(mappedBy = "pago", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PagoDetalle> detalles = new ArrayList<>();
}
```

---

<a id="17-pagodetallejava"></a>
## 17. `PagoDetalle.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/PagoDetalle.java`

### **¿Qué hace esta clase?**
Entidad de detalle transaccional. Vincula un `Pago` cabecera con una `Cuota` amortizada, indicando con exactitud el `montoAplicado` a dicha cuota. Contiene una restricción única `uk_pago_cuota` para impedir renglones duplicados en la misma transacción.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "pago_detalle", uniqueConstraints = {
    @UniqueConstraint(name = "uk_pago_cuota", columnNames = {"pago_id", "cuota_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pago_id", nullable = false)
    private Pago pago;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuota_id", nullable = false)
    private Cuota cuota;

    @Column(name = "monto_aplicado", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoAplicado;
}
```

---

<a id="18-seriecomprobantejava"></a>
## 18. `SerieComprobante.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/SerieComprobante.java`

### **¿Qué hace esta clase?**
Controla la numeración secuencial de los comprobantes de pago (RECIBO, BOLETA). Utilizada por `ComprobanteService` mediante bloqueos pesimistas en base de datos (`PESSIMISTIC_WRITE`) para garantizar correlativos correlativos e inviolables sin saltos ni duplicados.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "series_comprobante", uniqueConstraints = {
    @UniqueConstraint(name = "uk_serie", columnNames = {"tipo", "serie"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SerieComprobante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String tipo; // RECIBO, BOLETA

    @Column(nullable = false, length = 4)
    private String serie;

    @Column(name = "ultimo_numero", nullable = false)
    @Builder.Default
    private Long ultimoNumero = 0L;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activa = true;
}
```

---

<a id="19-solicituddescuentojava"></a>
## 19. `SolicitudDescuento.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/SolicitudDescuento.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `SolicitudDescuento` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/** Un descuento que la familia pide para la matrícula de su hijo y que la secretaría debe probar antes de poder pagarla. */
@Entity
@Table(name = "solicitudes_descuento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudDescuento {

    public static final String PENDIENTE = "PENDIENTE";
    public static final String APROBADA = "APROBADA";
    public static final String RECHAZADA = "RECHAZADA";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "descuento_id", nullable = false)
    private Descuento descuento;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(nullable = false, length = 300)
    private String motivo;

    /** Si es por hermanos: el hermano ya matriculado con el que se prueba. */
    @Column(name = "hermano_alumno_id")
    private Long hermanoAlumnoId;

    /** INTERNA: la pide la familia con sesión o la secretaría. PUBLICA: viene de la matrícula en línea, con documentos que la secretaría debe revisar. */
    @Column(nullable = false, length = 10)
    @Builder.Default
    private String origen = "INTERNA";

    /** Datos del hermano tal como los declaró la familia en la matrícula en línea (la secretaría los compara con los documentos). */
    @Column(name = "hermano_documento", length = 20)
    private String hermanoDocumento;

    @Column(name = "hermano_nombre", length = 220)
    private String hermanoNombre;

    @Column(nullable = false, length = 10)
    @Builder.Default
    private String estado = PENDIENTE;

    @Column(name = "solicitada_por")
    private Long solicitadaPor;

    @Column(name = "solicitada_en", nullable = false)
    @Builder.Default
    private LocalDateTime solicitadaEn = LocalDateTime.now();

    @Column(name = "resuelta_por")
    private Long resueltaPor;

    @Column(name = "resuelta_en")
    private LocalDateTime resueltaEn;

    @Column(name = "motivo_resolucion", length = 300)
    private String motivoResolucion;
}
```

---

<a id="20-tarifajava"></a>
## 20. `Tarifa.java` — Entidades JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/entity/Tarifa.java`

### **¿Qué hace esta clase?**
Define el costo monetario oficial de un concepto de pago para un año lectivo, nivel educativo (Inicial, Primaria, Secundaria) y grado escolar. Configura además el número de cuotas del periodo escolar, mes de inicio y día de vencimiento de cada mes.

```java
package pe.edu.upeu.eduspace.pago.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tarifas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarifa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(name = "nivel_id", nullable = false)
    private Long nivelId;

    @Column(name = "grado_id")
    private Long gradoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concepto_id", nullable = false)
    private ConceptoPago concepto;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(name = "num_cuotas", nullable = false)
    @Builder.Default
    private Short numCuotas = 1;

    @Column(name = "mes_inicio", nullable = false)
    @Builder.Default
    private Short mesInicio = 3;

    @Column(name = "dia_vencimiento", nullable = false)
    @Builder.Default
    private Short diaVencimiento = 5;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activo = true;
}
```

---

<a id="21-alertaadminrepositoryjava"></a>
## 21. `AlertaAdminRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/AlertaAdminRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AlertaAdmin`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.pago.entity.AlertaAdmin;

import java.util.List;

public interface AlertaAdminRepository extends JpaRepository<AlertaAdmin, Long> {

    List<AlertaAdmin> findByResueltaOrderByCreadaEnDesc(Boolean resuelta);

    boolean existsByTipoAndMatriculaIdAndResueltaFalse(String tipo, Long matriculaId);

    List<AlertaAdmin> findByTipoAndAnioIdAndNivelIdAndResueltaFalse(String tipo, Long anioId, Long nivelId);
}
```

---

<a id="22-asignacionarearepositoryjava"></a>
## 22. `AsignacionAreaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/AsignacionAreaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AsignacionArea`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.AsignacionArea;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AsignacionAreaRepository extends JpaRepository<AsignacionArea, Long> {

    /** Todo el dinero que está asignado a las áreas (no está en caja). */
    @Query("SELECT COALESCE(SUM(a.monto), 0) FROM AsignacionArea a")
    BigDecimal totalAsignado();

    @Query("SELECT COALESCE(SUM(a.monto), 0) FROM AsignacionArea a WHERE a.areaId = :areaId")
    BigDecimal totalDelArea(@Param("areaId") Long areaId);

    /** Pares [areaId, total asignado] de las áreas que tienen o tuvieron dinero. */
    @Query("SELECT a.areaId, SUM(a.monto) FROM AsignacionArea a GROUP BY a.areaId")
    List<Object[]> totalesPorArea();

    @Query("SELECT a FROM AsignacionArea a WHERE a.areaId = :areaId ORDER BY a.id DESC")
    List<AsignacionArea> movimientosDelArea(@Param("areaId") Long areaId, Pageable pageable);
}
```

---

<a id="23-cajasesionrepositoryjava"></a>
## 23. `CajaSesionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/CajaSesionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `CajaSesion`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.CajaSesion;

import java.util.Optional;

@Repository
public interface CajaSesionRepository extends JpaRepository<CajaSesion, Long> {

    Optional<CajaSesion> findFirstByCajeroUsuarioIdAndEstado(Long cajeroUsuarioId, String estado);

    @Query("SELECT COUNT(c) > 0 FROM CajaSesion c WHERE c.cajeroUsuarioId = :cajeroId AND c.estado = 'ABIERTA'")
    boolean existsCajaAbierta(@Param("cajeroId") Long cajeroId);
}
```

---

<a id="24-comprobanterepositoryjava"></a>
## 24. `ComprobanteRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/ComprobanteRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Comprobante`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.Comprobante;

import java.util.Optional;

@Repository
public interface ComprobanteRepository extends JpaRepository<Comprobante, Long> {

    Optional<Comprobante> findByPagoId(Long pagoId);

    Optional<Comprobante> findByTipoAndSerieAndNumero(String tipo, String serie, Long numero);
}
```

---

<a id="25-conceptopagorepositoryjava"></a>
## 25. `ConceptoPagoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/ConceptoPagoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `ConceptoPago`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.ConceptoPago;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConceptoPagoRepository extends JpaRepository<ConceptoPago, Long> {

    Optional<ConceptoPago> findByCodigo(String codigo);

    List<ConceptoPago> findByActivoTrue();
}
```

---

<a id="26-creditoalumnorepositoryjava"></a>
## 26. `CreditoAlumnoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/CreditoAlumnoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `CreditoAlumno`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.CreditoAlumno;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditoAlumnoRepository extends JpaRepository<CreditoAlumno, Long> {

    /** Toma el crédito con bloqueo: dos depósitos o cobros a la vez sobre el mismo alumno se hacen uno tras otro. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CreditoAlumno c WHERE c.alumnoId = :alumnoId")
    Optional<CreditoAlumno> bloquear(@Param("alumnoId") Long alumnoId);

    /** Los alumnos que tienen crédito disponible (los que el cobro automático debe revisar). */
    @Query("SELECT c.alumnoId FROM CreditoAlumno c WHERE c.saldo > 0")
    List<Long> alumnosConCredito();
}
```

---

<a id="27-cuotarepositoryjava"></a>
## 27. `CuotaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/CuotaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Cuota`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.Cuota;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Long> {

    List<Cuota> findByAlumnoIdOrderByFechaVencimientoAsc(Long alumnoId);

    List<Cuota> findByAlumnoIdAndEstadoOrderByFechaVencimientoAsc(Long alumnoId, String estado);

    List<Cuota> findByMatriculaMatriculaId(Long matriculaId);

    Optional<Cuota> findByMatriculaMatriculaIdAndConceptoIdAndNumeroCuota(Long matriculaId, Long conceptoId, Short numeroCuota);

    @Query("""
        SELECT c FROM Cuota c
        WHERE (:estado IS NULL OR c.estado = :estado)
          AND (:alumnoId IS NULL OR c.alumnoId = :alumnoId)
          AND (:seccionId IS NULL OR c.matricula.seccionId = :seccionId)
          AND (:vencimiento IS NULL OR c.fechaVencimiento = :vencimiento)
    """)
    Page<Cuota> findCuotasFiltradas(@Param("estado") String estado,
                                   @Param("alumnoId") Long alumnoId,
                                   @Param("seccionId") Long seccionId,
                                   @Param("vencimiento") LocalDate vencimiento,
                                   Pageable pageable);

    List<Cuota> findByEstado(String estado);

    /**
     * Las pensiones de un alumno que ya toca cobrar (vencen hoy o ya vencieron) y aún deben algo, de la más antigua a la más reciente.
     * Es lo que el crédito del alumno paga solo.
     */
    @Query("""
        SELECT c FROM Cuota c
        WHERE c.alumnoId = :alumnoId
          AND c.concepto.tipo = 'PENSION'
          AND c.estado IN ('PENDIENTE', 'PARCIAL', 'VENCIDA')
          AND c.fechaVencimiento <= :hoy
          AND c.saldo > 0
        ORDER BY c.fechaVencimiento ASC, c.numeroCuota ASC, c.id ASC
    """)
    List<Cuota> pensionesExigibles(@Param("alumnoId") Long alumnoId, @Param("hoy") LocalDate hoy);

    @Query("""
        SELECT c FROM Cuota c
        WHERE c.estado IN ('PENDIENTE', 'PARCIAL')
          AND c.fechaVencimiento < :hoy
    """)
    List<Cuota> findCuotasPorVencerVencidasSinMarcar(@Param("hoy") LocalDate hoy);

    @Query("""
        SELECT c FROM Cuota c
        WHERE c.estado IN ('PENDIENTE', 'PARCIAL')
          AND c.avisoEnviado = false
          AND c.fechaVencimiento BETWEEN :desde AND :hasta
    """)
    List<Cuota> findCuotasParaAvisoPrevio(@Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);

    @Query("""
        SELECT c FROM Cuota c
        WHERE c.alumnoId = :alumnoId
          AND c.estado = 'VENCIDA'
    """)
    List<Cuota> findDeudasVencidasByAlumnoId(@Param("alumnoId") Long alumnoId);
}
```

---

<a id="28-descuentoalumnorepositoryjava"></a>
## 28. `DescuentoAlumnoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/DescuentoAlumnoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `DescuentoAlumno`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.DescuentoAlumno;

import java.util.List;
import java.util.Optional;

@Repository
public interface DescuentoAlumnoRepository extends JpaRepository<DescuentoAlumno, Long> {

    List<DescuentoAlumno> findByAlumnoIdAndAnioIdAndVigenteTrue(Long alumnoId, Long anioId);

    Optional<DescuentoAlumno> findByAlumnoIdAndDescuentoIdAndAnioId(Long alumnoId, Long descuentoId, Long anioId);

    /** Todos los descuentos vigentes del alumno (de cualquier año), con su detalle, para mostrarlos en caja. */
    @Query("""
        SELECT da FROM DescuentoAlumno da
        JOIN FETCH da.descuento d
        WHERE da.alumnoId = :alumnoId AND da.vigente = true
        ORDER BY da.anioId DESC, da.id DESC
    """)
    List<DescuentoAlumno> findVigentesDelAlumno(@Param("alumnoId") Long alumnoId);

    @Query("""
        SELECT da FROM DescuentoAlumno da
        JOIN FETCH da.descuento d
        WHERE da.alumnoId = :alumnoId
          AND da.anioId = :anioId
          AND da.vigente = true
          AND d.activo = true
    """)
    List<DescuentoAlumno> findDescuentosVigentesConDetalle(@Param("alumnoId") Long alumnoId, @Param("anioId") Long anioId);
}
```

---

<a id="29-descuentorepositoryjava"></a>
## 29. `DescuentoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/DescuentoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Descuento`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.Descuento;

import java.util.List;
import java.util.Optional;

@Repository
public interface DescuentoRepository extends JpaRepository<Descuento, Long> {

    List<Descuento> findByActivoTrue();

    Optional<Descuento> findByCodigoIgnoreCaseAndActivoTrue(String codigo);

    Optional<Descuento> findByCodigoIgnoreCase(String codigo);
}
```

---

<a id="30-eventoprocesadorepositoryjava"></a>
## 30. `EventoProcesadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/EventoProcesadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EventoProcesado`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.EventoProcesado;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface EventoProcesadoRepository extends JpaRepository<EventoProcesado, UUID> {

    boolean existsByEventId(UUID eventId);

    long deleteByProcesadoEnBefore(LocalDateTime fechaLimite);
}
```

---

<a id="31-fondocajarepositoryjava"></a>
## 31. `FondoCajaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/FondoCajaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `FondoCaja`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.FondoCaja;

@Repository
public interface FondoCajaRepository extends JpaRepository<FondoCaja, Long> {

    /** Bloquea la fila única hasta el final de la transacción: los repartos de dinero se hacen de uno en uno. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM FondoCaja f WHERE f.id = 1")
    FondoCaja bloquear();
}
```

---

<a id="32-matriculalocalrepositoryjava"></a>
## 32. `MatriculaLocalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/MatriculaLocalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `MatriculaLocal`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.MatriculaLocal;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatriculaLocalRepository extends JpaRepository<MatriculaLocal, Long> {

    List<MatriculaLocal> findByAlumnoId(Long alumnoId);

    List<MatriculaLocal> findByEstadoOrderByMatriculaIdDesc(String estado);

    List<MatriculaLocal> findBySeccionIdAndEstado(Long seccionId, String estado);

    Optional<MatriculaLocal> findByAlumnoIdAndAnioIdAndEstadoIn(Long alumnoId, Long anioId, List<String> estados);
}
```

---

<a id="33-movimientocreditorepositoryjava"></a>
## 33. `MovimientoCreditoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/MovimientoCreditoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `MovimientoCredito`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.MovimientoCredito;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovimientoCreditoRepository extends JpaRepository<MovimientoCredito, Long> {

    List<MovimientoCredito> findByAlumnoIdOrderByIdDesc(Long alumnoId, Pageable pageable);

    Optional<MovimientoCredito> findByIdempotencyKey(String idempotencyKey);

    /** Los depósitos recibidos en una sesión de caja (para que el cierre cuente el dinero que entró). */
    List<MovimientoCredito> findByCajaSesionIdAndTipoAndAnuladoFalse(Long cajaSesionId, String tipo);
}
```

---

<a id="34-ordenpagorepositoryjava"></a>
## 34. `OrdenPagoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/OrdenPagoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `OrdenPago`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.OrdenPago;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenPagoRepository extends JpaRepository<OrdenPago, Long> {

    Optional<OrdenPago> findByCodigo(String codigo);

    /** La orden con bloqueo: dos avisos de la pasarela a la vez no la confirman dos veces. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT o FROM OrdenPago o WHERE o.codigo = :codigo")
    Optional<OrdenPago> bloquearPorCodigo(@Param("codigo") String codigo);

    Optional<OrdenPago> findFirstByMatriculaIdAndEstado(Long matriculaId, String estado);

    List<OrdenPago> findByAlumnoIdOrderByIdDesc(Long alumnoId);
}
```

---

<a id="35-outboxeventorepositoryjava"></a>
## 35. `OutboxEventoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/OutboxEventoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `OutboxEvento`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.OutboxEvento;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface OutboxEventoRepository extends JpaRepository<OutboxEvento, UUID> {

    @Query(value = """
        SELECT * FROM outbox_eventos
        WHERE enviado_en IS NULL
          AND intentos < 5
        ORDER BY creado_en ASC
        LIMIT 50
        FOR UPDATE SKIP LOCKED
    """, nativeQuery = true)
    List<OutboxEvento> findPendientesForUpdate();

    long deleteByEnviadoEnBefore(LocalDateTime fechaLimite);
}
```

---

<a id="36-pagodetallerepositoryjava"></a>
## 36. `PagoDetalleRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/PagoDetalleRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `PagoDetalle`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.PagoDetalle;

import java.util.List;

@Repository
public interface PagoDetalleRepository extends JpaRepository<PagoDetalle, Long> {

    List<PagoDetalle> findByPagoId(Long pagoId);

    List<PagoDetalle> findByCuotaId(Long cuotaId);

    /** ¿La cuota ya tiene un pago en ese estado? (p. ej. uno del apoderado todavía por aprobar). */
    boolean existsByCuotaIdAndPagoEstado(Long cuotaId, String estado);
}
```

---

<a id="37-pagorepositoryjava"></a>
## 37. `PagoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/PagoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Pago`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.Pago;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    Optional<Pago> findByIdempotencyKey(String idempotencyKey);

    List<Pago> findByAlumnoIdOrderByPagadoEnDesc(Long alumnoId);

    List<Pago> findByCajaSesionId(Long cajaSesionId);

    /** Pagos de apoderados por aprobar, del más antiguo al más reciente. */
    List<Pago> findByEstadoOrderByPagadoEnAsc(String estado);

    long countByEstado(String estado);

    /** Lo que un apoderado pagó y aún está en revisión o fue rechazado. */
    List<Pago> findTop20ByRegistradoPorAndEstadoInOrderByPagadoEnDesc(Long registradoPor, List<String> estados);

    /** Todo lo cobrado y no anulado: el dinero que entró a caja. */
    @Query("SELECT COALESCE(SUM(p.montoTotal), 0) FROM Pago p WHERE p.estado = 'CONFIRMADO'")
    BigDecimal totalCobrado();

    @Query("SELECT COALESCE(SUM(p.montoTotal), 0) FROM Pago p WHERE p.cajaSesion.id = :cajaId AND p.estado = 'CONFIRMADO'")
    BigDecimal sumTotalByCajaSesionId(@Param("cajaId") Long cajaId);

    @Query("SELECT COALESCE(SUM(p.montoTotal), 0) FROM Pago p WHERE p.cajaSesion.id = :cajaId AND p.medio = 'EFECTIVO' AND p.estado = 'CONFIRMADO'")
    BigDecimal sumEfectivoByCajaSesionId(@Param("cajaId") Long cajaId);

    @Query("""
        SELECT p FROM Pago p
        WHERE p.pagadoEn BETWEEN :desde AND :hasta
          AND (:medio IS NULL OR p.medio = :medio)
          AND p.estado = 'CONFIRMADO'
        ORDER BY p.pagadoEn DESC
    """)
    Page<Pago> findReporteCobranza(@Param("desde") LocalDateTime desde,
                                  @Param("hasta") LocalDateTime hasta,
                                  @Param("medio") String medio,
                                  Pageable pageable);
}
```

---

<a id="38-seriecomprobanterepositoryjava"></a>
## 38. `SerieComprobanteRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/SerieComprobanteRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `SerieComprobante`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.SerieComprobante;

import java.util.Optional;

@Repository
public interface SerieComprobanteRepository extends JpaRepository<SerieComprobante, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM SerieComprobante s WHERE s.tipo = :tipo AND s.activa = true ORDER BY s.id ASC LIMIT 1")
    Optional<SerieComprobante> findFirstByTipoActivaForUpdate(@Param("tipo") String tipo);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM SerieComprobante s WHERE s.tipo = :tipo AND s.serie = :serie")
    Optional<SerieComprobante> findByTipoAndSerieForUpdate(@Param("tipo") String tipo, @Param("serie") String serie);
}
```

---

<a id="39-solicituddescuentorepositoryjava"></a>
## 39. `SolicitudDescuentoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/SolicitudDescuentoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `SolicitudDescuento`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.SolicitudDescuento;

import java.util.List;
import java.util.Optional;

@Repository
public interface SolicitudDescuentoRepository extends JpaRepository<SolicitudDescuento, Long> {

    boolean existsByMatriculaIdAndEstado(Long matriculaId, String estado);

    /** La última solicitud de esa matrícula (la que la familia ve: en revisión, aprobada o rechazada). */
    Optional<SolicitudDescuento> findFirstByMatriculaIdOrderByIdDesc(Long matriculaId);

    List<SolicitudDescuento> findByEstadoOrderBySolicitadaEnAsc(String estado);

    long countByEstado(String estado);
}
```

---

<a id="40-tarifarepositoryjava"></a>
## 40. `TarifaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/repository/TarifaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Tarifa`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.Tarifa;

import java.util.List;
import java.util.Optional;

@Repository
public interface TarifaRepository extends JpaRepository<Tarifa, Long> {

    List<Tarifa> findByAnioIdAndActivoTrue(Long anioId);

    @Query("""
        SELECT t FROM Tarifa t
        WHERE t.anioId = :anioId
          AND t.nivelId = :nivelId
          AND (t.gradoId = :gradoId OR t.gradoId IS NULL)
          AND t.concepto.id = :conceptoId
          AND t.activo = true
        ORDER BY t.gradoId DESC NULLS LAST
    """)
    List<Tarifa> findTarifasCandidatas(@Param("anioId") Long anioId,
                                      @Param("nivelId") Long nivelId,
                                      @Param("gradoId") Long gradoId,
                                      @Param("conceptoId") Long conceptoId);

    default Optional<Tarifa> findTarifaAplicable(Long anioId, Long nivelId, Long gradoId, Long conceptoId) {
        List<Tarifa> list = findTarifasCandidatas(anioId, nivelId, gradoId, conceptoId);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }
}
```

---

<a id="41-abrircajarequestjava"></a>
## 41. `AbrirCajaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/AbrirCajaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `AbrirCaja`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AbrirCajaRequest {

    @NotNull(message = "El monto de apertura es obligatorio")
    @DecimalMin(value = "0.00", message = "El monto no puede ser negativo")
    private BigDecimal montoApertura = BigDecimal.ZERO;
}
```

---

<a id="42-anularpagorequestjava"></a>
## 42. `AnularPagoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/AnularPagoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `AnularPago`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AnularPagoRequest {

    @NotBlank(message = "El motivo de anulación es obligatorio")
    @Size(max = 300)
    private String motivo;
}
```

---

<a id="43-asignardescuentorequestjava"></a>
## 43. `AsignarDescuentoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/AsignarDescuentoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `AsignarDescuento`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AsignarDescuentoRequest {

    @NotNull(message = "El alumnoId es obligatorio")
    private Long alumnoId;

    @NotNull(message = "El descuentoId es obligatorio")
    private Long descuentoId;

    @NotNull(message = "El anioId es obligatorio")
    private Long anioId;

    @Size(max = 300)
    private String motivo;
}
```

---

<a id="44-cajaresponsejava"></a>
## 44. `CajaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CajaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Caja`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class CajaResponse {
    private Long id;
    private Long cajeroUsuarioId;
    private LocalDateTime aperturaEn;
    private BigDecimal montoApertura;
    private LocalDateTime cierreEn;
    private BigDecimal montoCierreDeclarado;
    private BigDecimal montoCierreSistema;
    private BigDecimal diferencia;
    private String estado;
}
```

---

<a id="45-cerrarcajarequestjava"></a>
## 45. `CerrarCajaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CerrarCajaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `CerrarCaja`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CerrarCajaRequest {

    @NotNull(message = "El monto declarado es obligatorio")
    @DecimalMin(value = "0.00", message = "El monto no puede ser negativo")
    private BigDecimal montoCierreDeclarado;
}
```

---

<a id="46-cierrecajaresponsejava"></a>
## 46. `CierreCajaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CierreCajaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `CierreCaja`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class CierreCajaResponse {
    private Long cajaId;
    private Long cajeroUsuarioId;
    private LocalDateTime aperturaEn;
    private LocalDateTime cierreEn;
    private BigDecimal montoApertura;
    private BigDecimal cobrosEfectivo;
    private BigDecimal cobrosOtrosMedios;
    /** Lo recibido como depósitos al crédito de los alumnos: ya está incluido en los cobros por medio y en el efectivo esperado. */
    private BigDecimal depositosCredito;
    private BigDecimal totalCobrado;
    private BigDecimal efectivoEsperado;
    private BigDecimal montoDeclarado;
    private BigDecimal diferencia;
    private Map<String, BigDecimal> totalesPorMedio;
}
```

---

<a id="47-comprobanteresponsejava"></a>
## 47. `ComprobanteResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ComprobanteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Comprobante`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ComprobanteResponse {
    private Long id;
    private Long pagoId;
    private String tipo;
    private String serie;
    private Long numero;
    private String numeroCompleto; // Ej: R001-00000042
    private BigDecimal total;
    private String estado;
    private String rutaPdf;
    private LocalDateTime emitidoEn;
}
```

---

<a id="48-conceptorequestjava"></a>
## 48. `ConceptoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ConceptoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `Concepto`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ConceptoRequest {

    @NotBlank(message = "El código es obligatorio")
    @Size(max = 30)
    private String codigo;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100)
    private String nombre;

    @NotBlank(message = "El tipo es obligatorio")
    @Pattern(regexp = "MATRICULA|PENSION|OTRO", message = "Tipo debe ser MATRICULA, PENSION u OTRO")
    private String tipo;

    private Boolean activo = true;
}
```

---

<a id="49-conceptoresponsejava"></a>
## 49. `ConceptoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ConceptoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Concepto`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConceptoResponse {
    private Long id;
    private String codigo;
    private String nombre;
    private String tipo;
    private Boolean activo;
}
```

---

<a id="50-creditodtosjava"></a>
## 50. `CreditoDtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CreditoDtos.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `CreditoDtos` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/** Contratos del crédito del alumno (saldo a favor que se cobra solo de sus pensiones). */
public final class CreditoDtos {

    private CreditoDtos() {
    }

    public record DepositoRequest(
        @NotNull @DecimalMin(value = "0.01", message = "El depósito debe ser mayor que cero") BigDecimal monto,
        @NotBlank String medio,
        @Size(max = 80) String referencia,
        @Size(max = 80) String idempotencyKey) {
    }

    public record AnularDepositoRequest(@NotBlank @Size(max = 200) String motivo) {
    }

    /** Un movimiento del libro: `signo` es +1 si suma al crédito y -1 si resta. */
    public record Movimiento(Long id, String tipo, int signo, BigDecimal monto, BigDecimal saldoDespues, String medio, String referencia,
                             Long cuotaId, Long pagoId, boolean anulado, String detalle, Long registradoPor, LocalDateTime creadoEn) {
    }

    /**
     * El crédito de un alumno. `exigible` es lo que ya toca cobrar de sus pensiones (vencidas o que vencen hoy) y `faltante`, lo que el crédito
     * no alcanza a cubrir de eso (quedará como deuda); `sobrante`, lo que quedaría como crédito después de cobrarlo.
     */
    public record Credito(Long alumnoId, BigDecimal saldo, BigDecimal exigible, BigDecimal faltante, BigDecimal sobrante, List<Movimiento> movimientos) {
    }

    /** Lo que pasó al depositar o al cobrar del crédito: el saldo final y lo que se aplicó a las cuotas. */
    public record Resultado(BigDecimal saldo, BigDecimal aplicado, Long pagoId, List<Long> cuotaIds) {
    }
}
```

---

<a id="51-cuotaresponsejava"></a>
## 51. `CuotaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/CuotaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Cuota`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class CuotaResponse {
    private Long id;
    private Long matriculaId;
    private Long alumnoId;
    private Long anioId;
    private Long conceptoId;
    private String conceptoNombre;
    private String conceptoTipo;
    private String descripcion;
    private Short numeroCuota;
    private BigDecimal montoBase;
    private BigDecimal descuento;
    private BigDecimal mora;
    private BigDecimal montoTotal;
    private BigDecimal saldo;
    private LocalDate fechaVencimiento;
    private String estado;
    private long diasAtraso;
    private Boolean avisoEnviado;
}
```

---

<a id="52-descuentorequestjava"></a>
## 52. `DescuentoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/DescuentoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `Descuento`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class DescuentoRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100)
    private String nombre;

    @NotBlank(message = "El tipo es obligatorio")
    @Pattern(regexp = "PORCENTAJE|MONTO_FIJO", message = "Tipo debe ser PORCENTAJE o MONTO_FIJO")
    private String tipo;

    @NotNull(message = "El valor es obligatorio")
    @DecimalMin(value = "0.01", message = "El valor debe ser mayor a 0")
    private BigDecimal valor;

    @NotBlank(message = "aplicaA es obligatorio")
    @Pattern(regexp = "MATRICULA|PENSION|TODO", message = "aplicaA debe ser MATRICULA, PENSION o TODO")
    private String aplicaA = "PENSION";

    private Boolean activo = true;

    @Pattern(regexp = "|[A-Za-z0-9_-]{3,40}", message = "El código lleva de 3 a 40 letras, números, guion o guion bajo (sin espacios)")
    private String codigo;
}
```

---

<a id="53-descuentoresponsejava"></a>
## 53. `DescuentoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/DescuentoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Descuento`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class DescuentoResponse {
    private Long id;
    private String nombre;
    private String tipo;
    private BigDecimal valor;
    private String aplicaA;
    private Boolean activo;
    private String codigo;
}
```

---

<a id="54-estadocuentaresponsejava"></a>
## 54. `EstadoCuentaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/EstadoCuentaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `EstadoCuenta`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class EstadoCuentaResponse {
    private Long alumnoId;
    private String alumnoNombre;
    private String responsableNombre;
    private BigDecimal totalCobrado;
    private BigDecimal totalPendiente;
    private BigDecimal totalVencido;
    /** El crédito (saldo a favor) del alumno: lo depositado que aún no se cobró de sus cuotas. */
    private BigDecimal credito;
    private List<CuotaResponse> cuotas;
}
```

---

<a id="55-fondodtosjava"></a>
## 55. `FondoDtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/FondoDtos.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `FondoDtos` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pe.edu.upeu.eduspace.pago.entity.AsignacionArea;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/** Reparto del dinero de caja entre las áreas de trabajo. */
public final class FondoDtos {

    private FondoDtos() {
    }

    /** Cuánto se cobró, cuánto se repartió y cuánto queda en caja. */
    public record Resumen(BigDecimal totalCobrado, BigDecimal totalAsignado, BigDecimal disponible, List<AreaAsignada> areas) {
    }

    public record AreaAsignada(Long areaId, BigDecimal asignado) {
    }

    /** {@code monto} es el total que debe quedar asignado al área (no el cambio): el servidor calcula la diferencia. */
    public record FijarAsignacion(@NotNull @DecimalMin("0.00") @Digits(integer = 10, fraction = 2) BigDecimal monto,
                                  @Size(max = 255) String motivo) {
    }

    /** El total que debe quedar asignado a un área. */
    public record AreaMonto(@NotNull Long areaId, @NotNull @DecimalMin("0.00") @Digits(integer = 10, fraction = 2) BigDecimal monto) {
    }

    /** Reparto de varias áreas a la vez: todo o nada. El motivo (opcional) se anota en cada movimiento. */
    public record FijarVarias(@NotEmpty @Size(max = 200) List<@Valid AreaMonto> areas, @Size(max = 255) String motivo) {
    }

    public record Movimiento(Long id, Long areaId, BigDecimal monto, BigDecimal saldoArea, String motivo, Long creadoPor, LocalDateTime creadoEn) {
        public static Movimiento de(AsignacionArea a) {
            return new Movimiento(a.getId(), a.getAreaId(), a.getMonto(), a.getSaldoArea(), a.getMotivo(), a.getCreadoPor(), a.getCreadoEn());
        }
    }
}
```

---

<a id="56-morososresponsejava"></a>
## 56. `MorososResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/MorososResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Morosos`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class MorososResponse {
    private Long seccionId;
    private Long gradoId;
    private Long totalAlumnosMorosos;
    private BigDecimal totalDeudaAcumulada;
    private List<DetalleMoroso> listaMorosos;

    @Data
    @Builder
    public static class DetalleMoroso {
        private Long alumnoId;
        private String alumnoNombre;
        private Long matriculaId;
        private String responsableNombre;
        private BigDecimal saldoTotalVencido;
        private int cuotasVencidas;
    }
}
```

---

<a id="57-pageresponsejava"></a>
## 57. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Page`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {

    private List<T> contenido;
    private int pagina;
    private int tamano;
    private long totalElementos;
    private int totalPaginas;
    private boolean ultima;

    public static <T> PageResponse<T> from(Page<T> page) {
        return PageResponse.<T>builder()
            .contenido(page.getContent())
            .pagina(page.getNumber())
            .tamano(page.getSize())
            .totalElementos(page.getTotalElements())
            .totalPaginas(page.getTotalPages())
            .ultima(page.isLast())
            .build();
    }
}
```

---

<a id="58-pagodetallerequestjava"></a>
## 58. `PagoDetalleRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/PagoDetalleRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `PagoDetalle`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PagoDetalleRequest {

    @NotNull(message = "El cuotaId es obligatorio")
    private Long cuotaId;

    @NotNull(message = "El montoAplicado es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto aplicado debe ser mayor a 0")
    private BigDecimal montoAplicado;
}
```

---

<a id="59-pagoresponsejava"></a>
## 59. `PagoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/PagoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Pago`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PagoResponse {
    private Long id;
    private Long alumnoId;
    private String pagadorNombre;
    private String pagadorDocumento;
    private BigDecimal montoTotal;
    private String medio;
    private String referencia;
    private String estado;
    private Long cajaSesionId;
    private Long registradoPor;
    private LocalDateTime pagadoEn;
    /** Cuando se aprobó o rechazó un pago de apoderado, y el motivo si se rechazó. */
    private LocalDateTime aprobadoEn;
    private String motivoRechazo;
    private String idempotencyKey;
    private ComprobanteResponse comprobante;
    private List<PagoDetalleResponse> detalles;

    @Data
    @Builder
    public static class PagoDetalleResponse {
        private Long id;
        private Long cuotaId;
        private String cuotaDescripcion;
        private BigDecimal montoAplicado;
        private BigDecimal nuevoSaldoCuota;
        private String nuevoEstadoCuota;
    }
}
```

---

<a id="60-registrarpagorequestjava"></a>
## 60. `RegistrarPagoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/RegistrarPagoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `RegistrarPago`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class RegistrarPagoRequest {

    @NotNull(message = "El alumnoId es obligatorio")
    private Long alumnoId;

    @Size(max = 200)
    private String pagadorNombre;

    @Size(max = 20)
    private String pagadorDocumento;

    @NotNull(message = "El montoTotal es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto debe ser mayor a 0")
    private BigDecimal montoTotal;

    @NotBlank(message = "El medio de pago es obligatorio")
    @Pattern(regexp = "EFECTIVO|TARJETA|YAPE_PLIN|TRANSFERENCIA|ONLINE_SIMULADO",
             message = "Medio debe ser EFECTIVO, TARJETA, YAPE_PLIN, TRANSFERENCIA u ONLINE_SIMULADO")
    private String medio;

    @Size(max = 80)
    private String referencia;

    @NotBlank(message = "idempotencyKey es obligatoria para evitar cobros duplicados")
    @Size(max = 80)
    private String idempotencyKey;

    @Pattern(regexp = "RECIBO|BOLETA", message = "tipoComprobante debe ser RECIBO o BOLETA")
    private String tipoComprobante = "RECIBO";

    @NotEmpty(message = "Debe incluir al menos una cuota a pagar")
    @Valid
    private List<PagoDetalleRequest> detalles;
}
```

---

<a id="61-reportecobranzaresponsejava"></a>
## 61. `ReporteCobranzaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/ReporteCobranzaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `ReporteCobranza`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class ReporteCobranzaResponse {
    private LocalDateTime desde;
    private LocalDateTime hasta;
    private BigDecimal totalCobrado;
    private long totalTransacciones;
    private Map<String, BigDecimal> totalPorMedio;
    private List<PagoResponse> pagos;
}
```

---

<a id="62-tarifarequestjava"></a>
## 62. `TarifaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/TarifaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `Tarifa`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TarifaRequest {

    @NotNull(message = "El anioId es obligatorio")
    private Long anioId;

    @NotNull(message = "El nivelId es obligatorio")
    private Long nivelId;

    private Long gradoId;

    @NotNull(message = "El conceptoId es obligatorio")
    private Long conceptoId;

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "0.00", message = "El monto no puede ser negativo")
    private BigDecimal monto;

    @NotNull(message = "El número de cuotas es obligatorio")
    @Min(1)
    @Max(12)
    private Short numCuotas = 1;

    @NotNull(message = "El mes de inicio es obligatorio")
    @Min(1)
    @Max(12)
    private Short mesInicio = 3;

    @NotNull(message = "El día de vencimiento es obligatorio")
    @Min(1)
    @Max(28)
    private Short diaVencimiento = 5;

    private Boolean activo = true;
}
```

---

<a id="63-tarifaresponsejava"></a>
## 63. `TarifaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/dto/TarifaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Tarifa`.

```java
package pe.edu.upeu.eduspace.pago.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class TarifaResponse {
    private Long id;
    private Long anioId;
    private Long nivelId;
    private Long gradoId;
    private Long conceptoId;
    private String conceptoCodigo;
    private String conceptoNombre;
    private BigDecimal monto;
    private Short numCuotas;
    private Short mesInicio;
    private Short diaVencimiento;
    private Boolean activo;
}
```

---

<a id="64-anulacionservicejava"></a>
## 64. `AnulacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/AnulacionService.java`

### **¿Qué hace esta clase?**
Servicio de anulación de pagos. Revierte transaccionalmente los saldos de las cuotas pagadas a su estado original (PENDIENTE/VENCIDA), marca el pago y el comprobante como ANULADO, registra motivo y auditoría del usuario que anuló, y emite el evento `pago.anulado` a Kafka.

```java
package pe.edu.upeu.eduspace.pago.service;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.config.KafkaConfig;
import pe.edu.upeu.eduspace.pago.dto.AnularPagoRequest;
import pe.edu.upeu.eduspace.pago.entity.*;
import pe.edu.upeu.eduspace.pago.event.EventoSobre;
import pe.edu.upeu.eduspace.pago.event.PagoAnuladoEvent;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnulacionService {

    private final PagoRepository pagoRepository;
    private final CuotaRepository cuotaRepository;
    private final ComprobanteRepository comprobanteRepository;
    private final OutboxEventoRepository outboxEventoRepository;
    private final ObjectMapper objectMapper;
    private final CreditoService creditoService;

    @Transactional
    public void anularPago(Long pagoId, AnularPagoRequest req, Long usuarioId) {
        Pago pago = pagoRepository.findById(pagoId)
            .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado: " + pagoId));

        if ("ANULADO".equals(pago.getEstado())) {
            throw new BusinessRuleException("El pago ya se encuentra anulado.");
        }

        if (pago.getCajaSesion() != null && "CERRADA".equals(pago.getCajaSesion().getEstado())) {
            throw new BusinessRuleException("No se puede anular un pago asociado a una caja ya cerrada sin autorización extraordinaria.");
        }

        // Revertir saldos de cuotas
        for (PagoDetalle det : pago.getDetalles()) {
            Cuota cuota = det.getCuota();
            cuota.setSaldo(cuota.getSaldo().add(det.getMontoAplicado()));
            if (cuota.getSaldo().compareTo(cuota.getMontoTotal()) >= 0) {
                cuota.setEstado("PENDIENTE");
            } else {
                cuota.setEstado("PARCIAL");
            }
            cuota.setActualizadaEn(LocalDateTime.now());
            cuotaRepository.save(cuota);
        }

        // Un cobro hecho con el crédito del alumno: lo cobrado vuelve a su crédito
        if ("CREDITO".equals(pago.getMedio())) {
            creditoService.devolverPorAnulacion(pago, usuarioId);
        }

        // Marcar pago y comprobante anulados
        pago.setEstado("ANULADO");
        pago.setAnuladoEn(LocalDateTime.now());
        pago.setAnuladoPor(usuarioId);
        pago.setMotivoAnulacion(req.getMotivo());
        pagoRepository.save(pago);

        comprobanteRepository.findByPagoId(pagoId).ifPresent(c -> {
            c.setEstado("ANULADO");
            comprobanteRepository.save(c);
        });

        // Registrar en outbox
        try {
            UUID eventId = UUID.randomUUID();
            String traceId = MDC.get("traceId");

            Long matriculaId = null;
            String conceptoTipo = "OTRO";
            for (PagoDetalle det : pago.getDetalles()) {
                Cuota c = det.getCuota();
                if (matriculaId == null && c.getMatricula() != null) matriculaId = c.getMatricula().getMatriculaId();
                String tipo = c.getConcepto().getTipo();
                if ("MATRICULA".equals(tipo)) conceptoTipo = "MATRICULA";
                else if ("PENSION".equals(tipo) && !"MATRICULA".equals(conceptoTipo)) conceptoTipo = "PENSION";
            }
            PagoAnuladoEvent payload = PagoAnuladoEvent.builder()
                .pagoId(pago.getId())
                .alumnoId(pago.getAlumnoId())
                .motivo(req.getMotivo())
                .matriculaId(matriculaId)
                .conceptoTipo(conceptoTipo)
                .monto(pago.getMontoTotal())
                .build();

            EventoSobre<PagoAnuladoEvent> sobre = EventoSobre.<PagoAnuladoEvent>builder()
                .eventId(eventId)
                .eventType(KafkaConfig.TOPIC_PAGO_ANULADO)
                .occurredAt(LocalDateTime.now())
                .version(1)
                .traceId(traceId != null ? traceId : UUID.randomUUID().toString())
                .payload(payload)
                .build();

            OutboxEvento outbox = OutboxEvento.builder()
                .id(eventId)
                .aggregateType("PAGO")
                .aggregateId(String.valueOf(pago.getId()))
                .topic(KafkaConfig.TOPIC_PAGO_ANULADO)
                .clave(String.valueOf(pago.getId()))
                .payload(EventoSobre.escribir(objectMapper, sobre))
                .creadoEn(LocalDateTime.now())
                .intentos((short) 0)
                .build();

            outboxEventoRepository.save(outbox);
            log.info("Pago {} anulado con éxito por usuario {}", pagoId, usuarioId);
        } catch (Exception e) {
            log.error("Error al registrar outbox de pago anulado: {}", e.getMessage(), e);
            throw new RuntimeException("Error en persistencia outbox de anulación", e);
        }
    }
}
```

---

<a id="65-cajaservicejava"></a>
## 65. `CajaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/CajaService.java`

### **¿Qué hace esta clase?**
Servicio de gestión de ventanilla. Permite abrir caja verificando que no exista otra caja abierta para el mismo cajero, consultar el estado actual y total recaudado en tiempo real, y cerrar la caja calculando el arqueo automático y las diferencias de efectivo.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.*;
import pe.edu.upeu.eduspace.pago.entity.CajaSesion;
import pe.edu.upeu.eduspace.pago.entity.MovimientoCredito;
import pe.edu.upeu.eduspace.pago.entity.Pago;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.CajaSesionRepository;
import pe.edu.upeu.eduspace.pago.repository.MovimientoCreditoRepository;
import pe.edu.upeu.eduspace.pago.repository.PagoRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CajaService {

    private final CajaSesionRepository cajaSesionRepository;
    private final PagoRepository pagoRepository;
    private final MovimientoCreditoRepository movimientosCredito;

    @Transactional
    public CajaResponse abrirCaja(Long cajeroUsuarioId, AbrirCajaRequest req) {
        if (cajaSesionRepository.existsCajaAbierta(cajeroUsuarioId)) {
            throw new BusinessRuleException("El cajero ya tiene una sesión de caja ABIERTA actualmente.");
        }

        CajaSesion sesion = CajaSesion.builder()
            .cajeroUsuarioId(cajeroUsuarioId)
            .aperturaEn(LocalDateTime.now())
            .montoApertura(req.getMontoApertura() != null ? req.getMontoApertura() : BigDecimal.ZERO)
            .estado("ABIERTA")
            .build();

        CajaSesion guardada = cajaSesionRepository.save(sesion);
        log.info("Caja abierta ID: {} por cajero: {}", guardada.getId(), cajeroUsuarioId);
        return toResponse(guardada);
    }

    @Transactional
    public CierreCajaResponse cerrarCaja(Long cajeroUsuarioId, CerrarCajaRequest req) {
        CajaSesion sesion = cajaSesionRepository.findFirstByCajeroUsuarioIdAndEstado(cajeroUsuarioId, "ABIERTA")
            .orElseThrow(() -> new BusinessRuleException("No tiene ninguna caja ABIERTA para cerrar."));

        List<Pago> pagos = pagoRepository.findByCajaSesionId(sesion.getId());

        BigDecimal totalEfectivo = BigDecimal.ZERO;
        BigDecimal totalOtros = BigDecimal.ZERO;
        Map<String, BigDecimal> totalesPorMedio = new HashMap<>();

        for (Pago p : pagos) {
            if ("CONFIRMADO".equals(p.getEstado())) {
                totalesPorMedio.merge(p.getMedio(), p.getMontoTotal(), BigDecimal::add);
                if ("EFECTIVO".equals(p.getMedio())) {
                    totalEfectivo = totalEfectivo.add(p.getMontoTotal());
                } else {
                    totalOtros = totalOtros.add(p.getMontoTotal());
                }
            }
        }

        // Los depósitos al crédito de los alumnos también entran a la caja (el efectivo que se recibió está en el cajón).
        BigDecimal depositos = BigDecimal.ZERO;
        for (MovimientoCredito d : movimientosCredito.findByCajaSesionIdAndTipoAndAnuladoFalse(sesion.getId(), MovimientoCredito.DEPOSITO)) {
            totalesPorMedio.merge(d.getMedio(), d.getMonto(), BigDecimal::add);
            depositos = depositos.add(d.getMonto());
            if ("EFECTIVO".equals(d.getMedio())) totalEfectivo = totalEfectivo.add(d.getMonto());
            else totalOtros = totalOtros.add(d.getMonto());
        }

        BigDecimal totalCobrado = totalEfectivo.add(totalOtros);
        BigDecimal efectivoEsperado = sesion.getMontoApertura().add(totalEfectivo);
        BigDecimal declarado = req.getMontoCierreDeclarado();
        BigDecimal diferencia = declarado.subtract(efectivoEsperado);

        sesion.setCierreEn(LocalDateTime.now());
        sesion.setMontoCierreDeclarado(declarado);
        sesion.setMontoCierreSistema(efectivoEsperado);
        sesion.setDiferencia(diferencia);
        sesion.setEstado("CERRADA");

        cajaSesionRepository.save(sesion);
        log.info("Caja cerrada ID: {}. Efectivo esperado: {}, Declarado: {}, Diferencia: {}",
            sesion.getId(), efectivoEsperado, declarado, diferencia);

        return CierreCajaResponse.builder()
            .cajaId(sesion.getId())
            .cajeroUsuarioId(cajeroUsuarioId)
            .aperturaEn(sesion.getAperturaEn())
            .cierreEn(sesion.getCierreEn())
            .montoApertura(sesion.getMontoApertura())
            .cobrosEfectivo(totalEfectivo)
            .cobrosOtrosMedios(totalOtros)
            .depositosCredito(depositos)
            .totalCobrado(totalCobrado)
            .efectivoEsperado(efectivoEsperado)
            .montoDeclarado(declarado)
            .diferencia(diferencia)
            .totalesPorMedio(totalesPorMedio)
            .build();
    }

    @Transactional(readOnly = true)
    public CajaResponse obtenerCajaActual(Long cajeroUsuarioId) {
        return cajaSesionRepository.findFirstByCajeroUsuarioIdAndEstado(cajeroUsuarioId, "ABIERTA")
            .map(this::toResponse)
            .orElseThrow(() -> new ResourceNotFoundException("No tiene ninguna caja abierta actualmente."));
    }

    @Transactional(readOnly = true)
    public CierreCajaResponse reporteCaja(Long cajaId) {
        CajaSesion sesion = cajaSesionRepository.findById(cajaId)
            .orElseThrow(() -> new ResourceNotFoundException("Sesión de caja no encontrada: " + cajaId));

        List<Pago> pagos = pagoRepository.findByCajaSesionId(sesion.getId());
        BigDecimal totalEfectivo = BigDecimal.ZERO;
        BigDecimal totalOtros = BigDecimal.ZERO;
        Map<String, BigDecimal> totalesPorMedio = new HashMap<>();

        for (Pago p : pagos) {
            if ("CONFIRMADO".equals(p.getEstado())) {
                totalesPorMedio.merge(p.getMedio(), p.getMontoTotal(), BigDecimal::add);
                if ("EFECTIVO".equals(p.getMedio())) {
                    totalEfectivo = totalEfectivo.add(p.getMontoTotal());
                } else {
                    totalOtros = totalOtros.add(p.getMontoTotal());
                }
            }
        }

        BigDecimal depositos = BigDecimal.ZERO;
        for (MovimientoCredito d : movimientosCredito.findByCajaSesionIdAndTipoAndAnuladoFalse(sesion.getId(), MovimientoCredito.DEPOSITO)) {
            totalesPorMedio.merge(d.getMedio(), d.getMonto(), BigDecimal::add);
            depositos = depositos.add(d.getMonto());
            if ("EFECTIVO".equals(d.getMedio())) totalEfectivo = totalEfectivo.add(d.getMonto());
            else totalOtros = totalOtros.add(d.getMonto());
        }

        return CierreCajaResponse.builder()
            .cajaId(sesion.getId())
            .cajeroUsuarioId(sesion.getCajeroUsuarioId())
            .aperturaEn(sesion.getAperturaEn())
            .cierreEn(sesion.getCierreEn())
            .montoApertura(sesion.getMontoApertura())
            .cobrosEfectivo(totalEfectivo)
            .cobrosOtrosMedios(totalOtros)
            .depositosCredito(depositos)
            .totalCobrado(totalEfectivo.add(totalOtros))
            .efectivoEsperado(sesion.getMontoCierreSistema())
            .montoDeclarado(sesion.getMontoCierreDeclarado())
            .diferencia(sesion.getDiferencia())
            .totalesPorMedio(totalesPorMedio)
            .build();
    }

    private CajaResponse toResponse(CajaSesion c) {
        return CajaResponse.builder()
            .id(c.getId())
            .cajeroUsuarioId(c.getCajeroUsuarioId())
            .aperturaEn(c.getAperturaEn())
            .montoApertura(c.getMontoApertura())
            .cierreEn(c.getCierreEn())
            .montoCierreDeclarado(c.getMontoCierreDeclarado())
            .montoCierreSistema(c.getMontoCierreSistema())
            .diferencia(c.getDiferencia())
            .estado(c.getEstado())
            .build();
    }
}
```

---

<a id="66-comprobanteservicejava"></a>
## 66. `ComprobanteService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/ComprobanteService.java`

### **¿Qué hace esta clase?**
Servicio encargado de la emisión de recibos y boletas. Aplica bloqueo pesimista sobre `SerieComprobante` para incrementar el correlativo de forma segura y thread-safe, y opcionalmente ensambla el contenido del comprobante impreso.

```java
package pe.edu.upeu.eduspace.pago.service;

import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.ComprobanteResponse;
import pe.edu.upeu.eduspace.pago.entity.Comprobante;
import pe.edu.upeu.eduspace.pago.entity.Pago;
import pe.edu.upeu.eduspace.pago.entity.SerieComprobante;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.ComprobanteRepository;
import pe.edu.upeu.eduspace.pago.repository.SerieComprobanteRepository;
import pe.edu.upeu.eduspace.pago.util.PdfTexto;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ComprobanteService {

    private final ComprobanteRepository comprobanteRepository;
    private final SerieComprobanteRepository serieComprobanteRepository;
    private final MinioClient minioClient;

    @Value("${app.minio.bucket-comprobantes:comprobantes}")
    private String bucketComprobantes;

    @Transactional
    public Comprobante emitirComprobante(Pago pago, String tipo) {
        String tipoFinal = (tipo != null && !tipo.isBlank()) ? tipo : "RECIBO";

        // Incremento atómico bajo concurrencia con SELECT ... FOR UPDATE
        SerieComprobante serieComp = serieComprobanteRepository.findFirstByTipoActivaForUpdate(tipoFinal)
            .orElseThrow(() -> new IllegalStateException("No existe una serie activa para tipo: " + tipoFinal));

        long nuevoNumero = serieComp.getUltimoNumero() + 1;
        serieComp.setUltimoNumero(nuevoNumero);
        serieComprobanteRepository.save(serieComp);

        String serie = serieComp.getSerie();
        String rutaPdf = String.format("%s/%s-%08d.pdf", tipoFinal.toLowerCase(), serie, nuevoNumero);

        Comprobante comprobante = Comprobante.builder()
            .pago(pago)
            .tipo(tipoFinal)
            .serie(serie)
            .numero(nuevoNumero)
            .total(pago.getMontoTotal())
            .estado("EMITIDO")
            .rutaPdf(rutaPdf)
            .emitidoEn(LocalDateTime.now())
            .build();

        Comprobante guardado = comprobanteRepository.save(comprobante);

        // Guardar representación de comprobante en MinIO
        subirAComprobanteMinio(guardado, pago);

        return guardado;
    }

    private void subirAComprobanteMinio(Comprobante c, Pago p) {
        try {
            String contenido = String.format("""
                ====================================================
                              EDUSPACE - COMPROBANTE DE PAGO
                ====================================================
                Tipo: %s  | Serie-Número: %s-%08d
                Fecha: %s
                Alumno ID: %d
                Pagador: %s  (Doc: %s)
                Medio: %s   | Referencia: %s
                Monto Total: S/ %.2f
                ====================================================
                Estado: %s
                ====================================================
                """,
                c.getTipo(), c.getSerie(), c.getNumero(),
                c.getEmitidoEn(), p.getAlumnoId(),
                p.getPagadorNombre(), p.getPagadorDocumento(),
                p.getMedio(), p.getReferencia() != null ? p.getReferencia() : "-",
                c.getTotal(), c.getEstado());

            byte[] bytes = PdfTexto.generar("EDUSPACE - COMPROBANTE DE PAGO", contenido);
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(bucketComprobantes)
                    .object(c.getRutaPdf())
                    .stream(new ByteArrayInputStream(bytes), bytes.length, -1)
                    .contentType("application/pdf")
                    .build()
            );
            log.info("Comprobante subido a MinIO en {}", c.getRutaPdf());
        } catch (Exception e) {
            log.warn("No se pudo subir comprobante a MinIO (se conserva registro en BD): {}", e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public java.util.Optional<Comprobante> buscarPorPago(Long pagoId) {
        return comprobanteRepository.findByPagoId(pagoId);
    }

    public ComprobanteResponse toResponse(Comprobante c) {
        return ComprobanteResponse.builder()
            .id(c.getId())
            .pagoId(c.getPago().getId())
            .tipo(c.getTipo())
            .serie(c.getSerie())
            .numero(c.getNumero())
            .numeroCompleto(String.format("%s-%08d", c.getSerie(), c.getNumero()))
            .total(c.getTotal())
            .estado(c.getEstado())
            .rutaPdf(c.getRutaPdf())
            .emitidoEn(c.getEmitidoEn())
            .build();
    }
}
```

---

<a id="67-conceptoservicejava"></a>
## 67. `ConceptoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/ConceptoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `Concepto`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.ConceptoRequest;
import pe.edu.upeu.eduspace.pago.dto.ConceptoResponse;
import pe.edu.upeu.eduspace.pago.entity.ConceptoPago;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.ConceptoPagoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConceptoService {

    private final ConceptoPagoRepository conceptoPagoRepository;

    @Transactional(readOnly = true)
    public List<ConceptoResponse> listarActivos() {
        return conceptoPagoRepository.findByActivoTrue().stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public ConceptoResponse obtenerPorId(Long id) {
        ConceptoPago c = conceptoPagoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Concepto de pago no encontrado con ID: " + id));
        return toResponse(c);
    }

    @Transactional
    public ConceptoResponse crear(ConceptoRequest req) {
        if (conceptoPagoRepository.findByCodigo(req.getCodigo()).isPresent()) {
            throw new BusinessRuleException("Ya existe un concepto de pago con el código: " + req.getCodigo());
        }
        ConceptoPago c = ConceptoPago.builder()
            .codigo(req.getCodigo().toUpperCase())
            .nombre(req.getNombre())
            .tipo(req.getTipo())
            .activo(req.getActivo() != null ? req.getActivo() : true)
            .build();
        return toResponse(conceptoPagoRepository.save(c));
    }

    @Transactional
    public ConceptoResponse actualizar(Long id, ConceptoRequest req) {
        ConceptoPago c = conceptoPagoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Concepto de pago no encontrado con ID: " + id));
        c.setNombre(req.getNombre());
        c.setTipo(req.getTipo());
        if (req.getActivo() != null) {
            c.setActivo(req.getActivo());
        }
        return toResponse(conceptoPagoRepository.save(c));
    }

    private ConceptoResponse toResponse(ConceptoPago c) {
        return ConceptoResponse.builder()
            .id(c.getId())
            .codigo(c.getCodigo())
            .nombre(c.getNombre())
            .tipo(c.getTipo())
            .activo(c.getActivo())
            .build();
    }
}
```

---

<a id="68-creditoservicejava"></a>
## 68. `CreditoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/CreditoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `Credito`. Implementa validaciones, reglas de negocio y persistencia.

```java
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
```

---

<a id="69-descuentoservicejava"></a>
## 69. `DescuentoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/DescuentoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `Descuento`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.AsignarDescuentoRequest;
import pe.edu.upeu.eduspace.pago.dto.DescuentoRequest;
import pe.edu.upeu.eduspace.pago.dto.DescuentoResponse;
import pe.edu.upeu.eduspace.pago.entity.Descuento;
import pe.edu.upeu.eduspace.pago.entity.DescuentoAlumno;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.DescuentoAlumnoRepository;
import pe.edu.upeu.eduspace.pago.repository.DescuentoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DescuentoService {

    private final DescuentoRepository descuentoRepository;
    private final DescuentoAlumnoRepository descuentoAlumnoRepository;

    @Transactional(readOnly = true)
    public List<DescuentoResponse> listarActivos() {
        return descuentoRepository.findByActivoTrue().stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional
    public DescuentoResponse crear(DescuentoRequest req) {
        Descuento d = Descuento.builder()
            .nombre(req.getNombre())
            .tipo(req.getTipo())
            .valor(req.getValor())
            .aplicaA(req.getAplicaA())
            .activo(req.getActivo() != null ? req.getActivo() : true)
            .codigo(normalizarCodigo(req.getCodigo(), null))
            .build();
        return toResponse(descuentoRepository.save(d));
    }

    @Transactional
    public DescuentoResponse actualizar(Long id, DescuentoRequest req) {
        Descuento d = descuentoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Descuento no encontrado: " + id));
        d.setNombre(req.getNombre());
        d.setTipo(req.getTipo());
        d.setValor(req.getValor());
        d.setAplicaA(req.getAplicaA());
        if (req.getActivo() != null) d.setActivo(req.getActivo());
        d.setCodigo(normalizarCodigo(req.getCodigo(), id));
        return toResponse(descuentoRepository.save(d));
    }

    @Transactional
    public void asignarDescuentoAlumno(AsignarDescuentoRequest req, Long usuarioId) {
        Descuento d = descuentoRepository.findById(req.getDescuentoId())
            .orElseThrow(() -> new ResourceNotFoundException("Descuento no encontrado: " + req.getDescuentoId()));

        descuentoAlumnoRepository.findByAlumnoIdAndDescuentoIdAndAnioId(req.getAlumnoId(), req.getDescuentoId(), req.getAnioId())
            .ifPresent(da -> {
                throw new BusinessRuleException("El alumno ya tiene asignado este descuento para el año " + req.getAnioId());
            });

        DescuentoAlumno da = DescuentoAlumno.builder()
            .alumnoId(req.getAlumnoId())
            .descuento(d)
            .anioId(req.getAnioId())
            .motivo(req.getMotivo())
            .aprobadoPor(usuarioId)
            .vigente(true)
            .build();

        descuentoAlumnoRepository.save(da);
    }

    /** Un código en mayúsculas y sin espacios; vacío = sin código. No puede repetirse en otro descuento. */
    private String normalizarCodigo(String codigo, Long propioId) {
        if (codigo == null || codigo.isBlank()) return null;
        String c = codigo.trim().toUpperCase();
        descuentoRepository.findByCodigoIgnoreCase(c).ifPresent(otro -> {
            if (!otro.getId().equals(propioId)) throw new BusinessRuleException("Ya existe un descuento con el código " + c + ".");
        });
        return c;
    }

    /** El descuento activo que corresponde a un código (lo canjea la familia en la matrícula en línea). */
    @Transactional(readOnly = true)
    public DescuentoResponse buscarPorCodigo(String codigo) {
        return descuentoRepository.findByCodigoIgnoreCaseAndActivoTrue(codigo == null ? "" : codigo.trim())
            .map(this::toResponse)
            .orElseThrow(() -> new ResourceNotFoundException("El código de descuento no existe o ya no está vigente."));
    }

    /**
     * Le asigna al alumno, para el año, el descuento de un código. Si ya lo tenía no hace nada (así un reintento de la matrícula en línea
     * no falla). Debe ocurrir ANTES de que se generen las cuotas: el descuento se calcula al crearlas.
     */
    @Transactional
    public void asignarPorCodigo(String codigo, Long alumnoId, Long anioId, String motivo) {
        Descuento d = descuentoRepository.findByCodigoIgnoreCaseAndActivoTrue(codigo == null ? "" : codigo.trim())
            .orElseThrow(() -> new ResourceNotFoundException("El código de descuento no existe o ya no está vigente."));
        if (descuentoAlumnoRepository.findByAlumnoIdAndDescuentoIdAndAnioId(alumnoId, d.getId(), anioId).isPresent()) return;
        descuentoAlumnoRepository.save(DescuentoAlumno.builder()
            .alumnoId(alumnoId).descuento(d).anioId(anioId)
            .motivo(motivo == null || motivo.isBlank() ? "Código " + d.getCodigo() + " (matrícula en línea)" : motivo)
            .vigente(true).build());
    }

    private DescuentoResponse toResponse(Descuento d) {
        return DescuentoResponse.builder()
            .id(d.getId())
            .nombre(d.getNombre())
            .tipo(d.getTipo())
            .valor(d.getValor())
            .aplicaA(d.getAplicaA())
            .activo(d.getActivo())
            .codigo(d.getCodigo())
            .build();
    }
}
```

---

<a id="70-fondoareasservicejava"></a>
## 70. `FondoAreasService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/FondoAreasService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `FondoAreas`. Implementa validaciones, reglas de negocio y persistencia.

```java
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
```

---

<a id="71-generadorcuotasservicejava"></a>
## 71. `GeneradorCuotasService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/GeneradorCuotasService.java`

### **¿Qué hace esta clase?**
Generador automático de cuentas por cobrar. Escucha eventos de matrícula o peticiones administrativas y calcula el cronograma de cuotas anuales del alumno aplicando tarifas vigentes, mes de vencimiento y descuentos asociados.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.client.PlanificacionClient;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;
import pe.edu.upeu.eduspace.pago.entity.*;
import pe.edu.upeu.eduspace.pago.event.MatriculaEvent;
import pe.edu.upeu.eduspace.pago.repository.*;
import pe.edu.upeu.eduspace.pago.util.PlanPago;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeneradorCuotasService {

    private final ConceptoPagoRepository conceptoPagoRepository;
    private final TarifaRepository tarifaRepository;
    private final DescuentoAlumnoRepository descuentoAlumnoRepository;
    private final CuotaRepository cuotaRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final PagoProperties pagoProperties;
    private final AlertaAdminRepository alertaRepository;
    private final PlanificacionClient planificacionClient;

    @Transactional
    public void generarCuotaMatricula(MatriculaEvent event) {
        log.info("Generando cuota de matrícula para matrícula: {}", event.getMatriculaId());

        ConceptoPago conceptoMatricula = conceptoPagoRepository.findByCodigo("MATRICULA")
            .orElseThrow(() -> new IllegalStateException("Concepto MATRICULA no configurado en BD"));

        // Evitar duplicados por idempotencia (uk_cuota)
        if (cuotaRepository.findByMatriculaMatriculaIdAndConceptoIdAndNumeroCuota(event.getMatriculaId(), conceptoMatricula.getId(), (short) 1).isPresent()) {
            log.info("Cuota de matrícula ya existe para matrícula {}", event.getMatriculaId());
            return;
        }

        MatriculaLocal matricula = matriculaLocalRepository.findById(event.getMatriculaId())
            .orElseThrow(() -> new IllegalStateException("Matrícula local no encontrada: " + event.getMatriculaId()));

        Optional<Tarifa> optTarifa = tarifaRepository.findTarifaAplicable(
            event.getAnioId(), event.getNivelId(), event.getGradoId(), conceptoMatricula.getId()
        );

        if (optTarifa.isEmpty()) {
            alertarSinTarifa("MATRICULA", event);
            return;
        }

        Tarifa tarifa = optTarifa.get();
        BigDecimal montoBase = tarifa.getMonto();
        BigDecimal descuento = calcularDescuento(event.getAlumnoId(), event.getAnioId(), "MATRICULA", montoBase);
        BigDecimal total = montoBase.subtract(descuento).max(BigDecimal.ZERO);

        LocalDate fechaVencimiento = LocalDate.now().plusDays(pagoProperties.getDiasVigenciaPrematricula());

        Cuota cuota = Cuota.builder()
            .matricula(matricula)
            .alumnoId(event.getAlumnoId())
            .anioId(event.getAnioId())
            .concepto(conceptoMatricula)
            .tarifa(tarifa)
            .descripcion("Matrícula escolar " + anioCalendario(event.getAnioId()))
            .numeroCuota((short) 1)
            .montoBase(montoBase)
            .descuento(descuento)
            .mora(BigDecimal.ZERO)
            .montoTotal(total)
            .saldo(total)
            .fechaVencimiento(fechaVencimiento)
            .estado(total.compareTo(BigDecimal.ZERO) == 0 ? "PAGADA" : "PENDIENTE")
            .avisoEnviado(false)
            .creadaEn(LocalDateTime.now())
            .actualizadaEn(LocalDateTime.now())
            .build();

        cuotaRepository.save(cuota);
        log.info("Cuota de matrícula generada exitosamente con ID: {}, saldo: {}", cuota.getId(), cuota.getSaldo());
    }

    @Transactional
    public void generarCuotasPension(MatriculaEvent event) {
        log.info("Generando cuotas de pensión para matrícula confirmada: {}", event.getMatriculaId());

        ConceptoPago conceptoPension = conceptoPagoRepository.findByCodigo("PENSION")
            .orElseThrow(() -> new IllegalStateException("Concepto PENSION no configurado en BD"));

        MatriculaLocal matricula = matriculaLocalRepository.findById(event.getMatriculaId())
            .orElseThrow(() -> new IllegalStateException("Matrícula local no encontrada: " + event.getMatriculaId()));

        Optional<Tarifa> optTarifa = tarifaRepository.findTarifaAplicable(
            event.getAnioId(), event.getNivelId(), event.getGradoId(), conceptoPension.getId()
        );

        if (optTarifa.isEmpty()) {
            alertarSinTarifa("PENSION", event);
            return;
        }

        Tarifa tarifa = optTarifa.get();
        short mesesTarifa = tarifa.getNumCuotas() != null ? tarifa.getNumCuotas() : 10;
        short mesInicio = tarifa.getMesInicio() != null ? tarifa.getMesInicio() : 3;
        short diaVenc = tarifa.getDiaVencimiento() != null ? tarifa.getDiaVencimiento() : 5;
        // La forma de pago se acordó al matricular. El monto de la tarifa es el TOTAL de la pensión del año: se reparte en las cuotas del plan
        // (mensual, bimestral, semestral o anual) en proporción a los meses que cubre cada una; la diferencia de centavos va a la última.
        PlanPago plan = PlanPago.de(event.getPlanPago() != null ? event.getPlanPago() : matricula.getPlanPago());
        int[] meses = plan.mesesPorCuota(mesesTarifa);
        List<BigDecimal> montos = plan.repartir(tarifa.getMonto(), mesesTarifa);
        BigDecimal descuentoPlan = switch (plan) {
            case SEMESTRAL -> pagoProperties.getDescuentoPlanSemestral();
            case ANUAL -> pagoProperties.getDescuentoPlanAnual();
            default -> BigDecimal.ZERO;
        };

        int anio = anioCalendario(event.getAnioId());
        int mesesAntes = 0;

        for (int idx = 0; idx < meses.length; idx++) {
            final short numCuota = (short) (idx + 1);
            BigDecimal montoBasePorCuota = montos.get(idx);
            int mesDeLaCuota = mesInicio + mesesAntes;          // la cuota vence al empezar los meses que cubre
            int mesFinal = mesDeLaCuota + meses[idx] - 1;
            mesesAntes += meses[idx];
            if (cuotaRepository.findByMatriculaMatriculaIdAndConceptoIdAndNumeroCuota(event.getMatriculaId(), conceptoPension.getId(), numCuota).isPresent()) {
                continue; // ya generada
            }

            int mes = mesDeLaCuota;
            int anioCuota = anio;
            while (mes > 12) {
                mes -= 12;
                anioCuota += 1;
            }

            LocalDate fechaVenc = LocalDate.of(anioCuota, mes, Math.min(diaVenc, 28));
            // Descuentos del alumno (hermanos, etc.) más el del plan, sin pasar del monto de la cuota
            BigDecimal descCuota = calcularDescuento(event.getAlumnoId(), event.getAnioId(), "PENSION", montoBasePorCuota)
                .add(PlanPago.descuentoDelPlan(montoBasePorCuota, descuentoPlan)).min(montoBasePorCuota);
            BigDecimal totalCuota = montoBasePorCuota.subtract(descCuota).max(BigDecimal.ZERO);

            Cuota cuota = Cuota.builder()
                .matricula(matricula)
                .alumnoId(event.getAlumnoId())
                .anioId(event.getAnioId())
                .concepto(conceptoPension)
                .tarifa(tarifa)
                .descripcion(descripcionPension(plan, numCuota, mes, mesFinal, anioCuota, anio))
                .numeroCuota(numCuota)
                .montoBase(montoBasePorCuota)
                .descuento(descCuota)
                .mora(BigDecimal.ZERO)
                .montoTotal(totalCuota)
                .saldo(totalCuota)
                .fechaVencimiento(fechaVenc)
                .estado(totalCuota.compareTo(BigDecimal.ZERO) == 0 ? "PAGADA" : "PENDIENTE")
                .avisoEnviado(false)
                .creadaEn(LocalDateTime.now())
                .actualizadaEn(LocalDateTime.now())
                .build();

            cuotaRepository.save(cuota);
        }
        log.info("Generadas {} cuotas de pensión ({}) para matrícula {}", meses.length, plan, event.getMatriculaId());
    }

    /** «Pensión 03/2027», «Pensión 03–04/2027», «Pensión 1.er semestre 2027» o «Pensión anual 2027». */
    static String descripcionPension(PlanPago plan, int numCuota, int mes, int mesFinal, int anioCuota, int anioBase) {
        return switch (plan) {
            case MENSUAL -> String.format("Pensión %02d/%d", mes, anioCuota);
            case BIMESTRAL -> String.format("Pensión %02d–%02d/%d", mes, ((mesFinal - 1) % 12) + 1, anioCuota);
            case SEMESTRAL -> String.format("Pensión %s semestre %d", numCuota == 1 ? "1.er" : "2.º", anioBase);
            case ANUAL -> "Pensión anual " + anioBase;
        };
    }

    @Transactional
    public void anularCuotasPorRetiroOAnulacion(Long matriculaId) {
        log.info("Anulando cuotas pendientes para matrícula {}", matriculaId);
        List<Cuota> cuotas = cuotaRepository.findByMatriculaMatriculaId(matriculaId);
        for (Cuota c : cuotas) {
            if ("PENDIENTE".equals(c.getEstado()) || "VENCIDA".equals(c.getEstado())) {
                c.setEstado("ANULADA");
                c.setSaldo(BigDecimal.ZERO);
                c.setActualizadaEn(LocalDateTime.now());
                cuotaRepository.save(c);
            } else if ("PARCIAL".equals(c.getEstado())
                    && !alertaRepository.existsByTipoAndMatriculaIdAndResueltaFalse("CUOTA_PARCIAL", matriculaId)) {
                // Con pagos aplicados: la administración decide (devolución / condonación)
                alertaRepository.save(AlertaAdmin.builder()
                    .tipo("CUOTA_PARCIAL").matriculaId(matriculaId).anioId(c.getAnioId())
                    .detalle("Matrícula " + matriculaId + " retirada/anulada con cuota(s) pagadas parcialmente; requiere decisión.")
                    .build());
                log.warn("ALERTA ADMINISTRATIVA: cuota parcial en matrícula {} retirada/anulada", matriculaId);
            }
        }
    }

    /** Año calendario del año académico; si planificación no responde, usa el año actual. */
    int anioCalendario(Long anioId) {
        try {
            PlanificacionClient.AnioInterno a = planificacionClient.getAnio(anioId);
            if (a != null && a.fechaInicio() != null) {
                return a.fechaInicio().getYear();
            }
            if (a != null && a.nombre() != null && a.nombre().matches("\\d{4}")) {
                return Integer.parseInt(a.nombre());
            }
        } catch (Exception e) {
            log.warn("No se pudo obtener el año académico {}: {}", anioId, e.getMessage());
        }
        return LocalDate.now().getYear();
    }

    private void alertarSinTarifa(String concepto, MatriculaEvent event) {
        log.error("ALERTA ADMINISTRATIVA: No existe tarifa de {} para año={}, nivel={}, grado={} (matrícula {})",
            concepto, event.getAnioId(), event.getNivelId(), event.getGradoId(), event.getMatriculaId());
        if (!alertaRepository.existsByTipoAndMatriculaIdAndResueltaFalse("SIN_TARIFA", event.getMatriculaId())) {
            alertaRepository.save(AlertaAdmin.builder()
                .tipo("SIN_TARIFA").matriculaId(event.getMatriculaId())
                .anioId(event.getAnioId()).nivelId(event.getNivelId()).gradoId(event.getGradoId())
                .detalle("Falta tarifa de " + concepto + " (año " + event.getAnioId() + ", nivel " + event.getNivelId()
                    + ", grado " + event.getGradoId() + "); no se generaron cuotas de la matrícula " + event.getMatriculaId())
                .build());
        }
    }

    /** Al crear una tarifa: genera las cuotas de las matrículas que quedaron sin ellas y resuelve las alertas. */
    @Transactional
    public void reintentarPorTarifa(Tarifa tarifa) {
        for (AlertaAdmin a : alertaRepository.findByTipoAndAnioIdAndNivelIdAndResueltaFalse(
                "SIN_TARIFA", tarifa.getAnioId(), tarifa.getNivelId())) {
            if (tarifa.getGradoId() != null && !tarifa.getGradoId().equals(a.getGradoId())) continue;
            matriculaLocalRepository.findById(a.getMatriculaId()).ifPresent(m -> {
                MatriculaEvent ev = MatriculaEvent.builder()
                    .matriculaId(m.getMatriculaId()).alumnoId(m.getAlumnoId()).alumnoNombre(m.getAlumnoNombre())
                    .anioId(m.getAnioId()).nivelId(m.getNivelId()).gradoId(m.getGradoId()).seccionId(m.getSeccionId())
                    .estado(m.getEstado()).planPago(m.getPlanPago()).build();
                String tipo = tarifa.getConcepto().getTipo();
                if ("MATRICULA".equals(tipo)) generarCuotaMatricula(ev);
                else if ("PENSION".equals(tipo) && "MATRICULADO".equals(m.getEstado())) generarCuotasPension(ev);
            });
            a.setResuelta(true);
            a.setResueltaEn(LocalDateTime.now());
            alertaRepository.save(a);
        }
    }

    /** El descuento que le corresponde a un alumno sobre un monto base (lo usan las cuotas al crearse y la aprobación de una solicitud). */
    BigDecimal calcularDescuento(Long alumnoId, Long anioId, String tipoAplica, BigDecimal montoBase) {
        List<DescuentoAlumno> descuentos = descuentoAlumnoRepository.findDescuentosVigentesConDetalle(alumnoId, anioId);
        BigDecimal totalDescuento = BigDecimal.ZERO;

        for (DescuentoAlumno da : descuentos) {
            Descuento d = da.getDescuento();
            if ("TODO".equals(d.getAplicaA()) || tipoAplica.equals(d.getAplicaA())) {
                if ("PORCENTAJE".equals(d.getTipo())) {
                    BigDecimal desc = montoBase.multiply(d.getValor()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                    totalDescuento = totalDescuento.add(desc);
                } else if ("MONTO_FIJO".equals(d.getTipo())) {
                    totalDescuento = totalDescuento.add(d.getValor());
                }
            }
        }
        return totalDescuento.min(montoBase);
    }
}
```

---

<a id="72-matriculalocalservicejava"></a>
## 72. `MatriculaLocalService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/MatriculaLocalService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `MatriculaLocal`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.pago.event.MatriculaEvent;
import pe.edu.upeu.eduspace.pago.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.pago.util.PlanPago;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MatriculaLocalService {

    private final MatriculaLocalRepository matriculaLocalRepository;

    @Transactional
    public MatriculaLocal sincronizarDesdeEvento(MatriculaEvent event) {
        MatriculaLocal ml = matriculaLocalRepository.findById(event.getMatriculaId())
            .orElseGet(() -> MatriculaLocal.builder()
                .matriculaId(event.getMatriculaId())
                .alumnoId(event.getAlumnoId())
                .anioId(event.getAnioId())
                .build());

        ml.setAlumnoNombre(event.getAlumnoNombre() != null ? event.getAlumnoNombre() : "Alumno " + event.getAlumnoId());
        ml.setNivelId(event.getNivelId());
        ml.setGradoId(event.getGradoId());
        ml.setSeccionId(event.getSeccionId());
        ml.setEstado(event.getEstado());
        if (event.getPlanPago() != null && !event.getPlanPago().isBlank()) {
            ml.setPlanPago(PlanPago.de(event.getPlanPago()).name());
        }

        if (event.getResponsablePagoUsuarioId() != null) {
            ml.setResponsableUsuarioId(event.getResponsablePagoUsuarioId());
        }
        if (event.getResponsablePagoNombre() != null) {
            ml.setResponsableNombre(event.getResponsablePagoNombre());
        }
        ml.setActualizadoEn(LocalDateTime.now());

        log.info("Sincronizada matrícula local {} para alumno {} en estado {}", ml.getMatriculaId(), ml.getAlumnoId(), ml.getEstado());
        return matriculaLocalRepository.save(ml);
    }
}
```

---

<a id="73-matriculapagoservicejava"></a>
## 73. `MatriculaPagoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/MatriculaPagoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `MatriculaPago`. Implementa validaciones, reglas de negocio y persistencia.

```java
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
```

---

<a id="74-moraservicejava"></a>
## 74. `MoraService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/MoraService.java`

### **¿Qué hace esta clase?**
Calcula y aplica recargos por mora en cuotas vencidas según los días de retraso y los parámetros configurados.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class MoraService {

    private final PagoProperties pagoProperties;
    private final CuotaRepository cuotaRepository;

    @Transactional
    public void aplicarMora(Cuota cuota, LocalDate fechaCalculo) {
        if ("PAGADA".equals(cuota.getEstado()) || "ANULADA".equals(cuota.getEstado())) {
            return;
        }

        long diasAtraso = ChronoUnit.DAYS.between(cuota.getFechaVencimiento(), fechaCalculo);
        if (diasAtraso <= pagoProperties.getMargenGraciaDias()) {
            return;
        }

        // Periodo de cálculo mensual proporcional
        BigDecimal porcentajeMensual = pagoProperties.getMoraPorcentajeMensual();
        BigDecimal factorDiario = porcentajeMensual.divide(BigDecimal.valueOf(100 * 30), 10, RoundingMode.HALF_UP);
        // Base SIN mora acumulada (si no, la mora se capitalizaría día a día)
        BigDecimal base = "SALDO".equalsIgnoreCase(pagoProperties.getMoraBase())
            ? cuota.getSaldo().subtract(cuota.getMora()).max(BigDecimal.ZERO)
            : cuota.getMontoBase().subtract(cuota.getDescuento()).max(BigDecimal.ZERO);
        BigDecimal moraCalculada = base.multiply(factorDiario).multiply(BigDecimal.valueOf(diasAtraso))
            .setScale(2, RoundingMode.HALF_UP);

        if (moraCalculada.compareTo(cuota.getMora()) > 0) {
            BigDecimal incremento = moraCalculada.subtract(cuota.getMora());
            cuota.setMora(moraCalculada);
            cuota.setMontoTotal(cuota.getMontoTotal().add(incremento));
            cuota.setSaldo(cuota.getSaldo().add(incremento));
            cuota.setActualizadaEn(LocalDateTime.now());
            cuotaRepository.save(cuota);
            log.info("Aplicada mora de S/ {} a la cuota ID {}", moraCalculada, cuota.getId());
        }
    }
}
```

---

<a id="75-pagoonlineservicejava"></a>
## 75. `PagoOnlineService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/PagoOnlineService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `PagoOnline`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import pe.edu.upeu.eduspace.pago.client.AlumnosGateway;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.PagoResponse;
import pe.edu.upeu.eduspace.pago.dto.RegistrarPagoRequest;

@Service
@RequiredArgsConstructor
public class PagoOnlineService {

    private final PagoService pagoService;
    private final AlumnosGateway alumnosGateway;
    private final CuotaRepository cuotaRepository;

    @Transactional
    public PagoResponse pagarOnlineSimulado(RegistrarPagoRequest req, Long apoderadoUsuarioId) {
        exigirQueSeaDelApoderado(req, apoderadoUsuarioId);
        req.setMedio("ONLINE_SIMULADO");
        if (req.getReferencia() == null || req.getReferencia().isBlank()) {
            req.setReferencia("SIM-TX-" + System.currentTimeMillis());
        }
        // Ya no se confirma al instante: queda por aprobar en caja.
        return pagoService.solicitarPagoOnline(req, apoderadoUsuarioId);
    }

    /** El apoderado solo paga por sus hijos: el alumno declarado debe ser hijo suyo y todas las cuotas, de ese alumno. */
    private void exigirQueSeaDelApoderado(RegistrarPagoRequest req, Long apoderadoUsuarioId) {
        boolean esHijo = alumnosGateway.hijos(apoderadoUsuarioId).stream()
            .anyMatch(h -> h.getAlumnoId().equals(req.getAlumnoId()));
        boolean cuotasPropias = req.getDetalles().stream()
            .allMatch(d -> cuotaRepository.findById(d.getCuotaId()).map(c -> req.getAlumnoId().equals(c.getAlumnoId())).orElse(true));
        if (!esHijo || !cuotasPropias) {
            throw new AccessDeniedException("Solo puede pagar cuotas de sus propios hijos.");
        }
    }
}
```

---

<a id="76-pagoservicejava"></a>
## 76. `PagoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/PagoService.java`

### **¿Qué hace esta clase?**
Servicio central del flujo de cobranza. Valida la idempotencia mediante `idempotencyKey`, comprueba que el cajero tenga una caja abierta, valida que los montos aplicados no superen los saldos de las cuotas, actualiza los saldos y estados de las cuotas afectadas, genera el comprobante correlativo mediante `ComprobanteService` y registra el evento en el Outbox transaccional para Kafka.

```java
package pe.edu.upeu.eduspace.pago.service;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.config.KafkaConfig;
import pe.edu.upeu.eduspace.pago.dto.*;
import pe.edu.upeu.eduspace.pago.entity.*;
import pe.edu.upeu.eduspace.pago.event.EventoSobre;
import pe.edu.upeu.eduspace.pago.event.PagoConfirmadoEvent;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PagoService {

    private final PagoRepository pagoRepository;
    private final PagoDetalleRepository pagoDetalleRepository;
    private final CuotaRepository cuotaRepository;
    private final CajaSesionRepository cajaSesionRepository;
    private final OutboxEventoRepository outboxEventoRepository;
    private final ComprobanteService comprobanteService;
    private final SolicitudDescuentoRepository solicitudesDescuento;
    private final ObjectMapper objectMapper;

    @Transactional
    public PagoResponse registrarPago(RegistrarPagoRequest req, Long usuarioId) {
        // 1. Idempotencia: si ya existe la clave, retornar el pago original sin duplicar cobro
        Optional<Pago> pagoExistente = pagoRepository.findByIdempotencyKey(req.getIdempotencyKey());
        if (pagoExistente.isPresent()) {
            log.info("Pago idempotente detectado con clave: {}. Retornando registro existente.", req.getIdempotencyKey());
            return toResponse(pagoExistente.get());
        }

        // 2. Validar caja si es pago presencial
        CajaSesion cajaSesion = null;
        if (!"ONLINE_SIMULADO".equals(req.getMedio())) {
            cajaSesion = cajaSesionRepository.findFirstByCajeroUsuarioIdAndEstado(usuarioId, "ABIERTA")
                .orElseThrow(() -> new BusinessRuleException("Debe tener una caja ABIERTA para registrar cobros presenciales."));
        }

        // 3. Validar montos y cuotas
        BigDecimal sumaAplicada = BigDecimal.ZERO;
        List<Cuota> cuotasAfectadas = new ArrayList<>();
        List<PagoDetalle> detalles = new ArrayList<>();

        Long matriculaIdPrincipal = null;
        String conceptoTipoPrincipal = "OTRO";
        String conceptoNombrePrincipal = "Cobro educativo";

        for (PagoDetalleRequest detReq : req.getDetalles()) {
            Cuota cuota = cuotaRepository.findById(detReq.getCuotaId())
                .orElseThrow(() -> new ResourceNotFoundException("Cuota no encontrada: " + detReq.getCuotaId()));

            if (!"PENDIENTE".equals(cuota.getEstado()) && !"PARCIAL".equals(cuota.getEstado()) && !"VENCIDA".equals(cuota.getEstado())) {
                throw new BusinessRuleException(String.format("La cuota %d está en estado %s y no admite cobros.", cuota.getId(), cuota.getEstado()));
            }

            if (detReq.getMontoAplicado().compareTo(cuota.getSaldo()) > 0) {
                throw new BusinessRuleException(String.format("El monto a pagar (S/ %.2f) supera el saldo de la cuota %d (S/ %.2f).",
                    detReq.getMontoAplicado(), cuota.getId(), cuota.getSaldo()));
            }
            // Un descuento de matrícula en revisión cambia lo que se debe: no se cobra hasta que la secretaría responda.
            if ("MATRICULA".equals(cuota.getConcepto().getTipo()) && cuota.getMatricula() != null
                && solicitudesDescuento.existsByMatriculaIdAndEstado(cuota.getMatricula().getMatriculaId(), SolicitudDescuento.PENDIENTE)) {
                throw new BusinessRuleException(MatriculaPagoService.MOTIVO_EN_REVISION);
            }

            sumaAplicada = sumaAplicada.add(detReq.getMontoAplicado());
            cuotasAfectadas.add(cuota);

            if (matriculaIdPrincipal == null && cuota.getMatricula() != null) {
                matriculaIdPrincipal = cuota.getMatricula().getMatriculaId();
            }
            if ("MATRICULA".equals(cuota.getConcepto().getTipo())) {
                conceptoTipoPrincipal = "MATRICULA";
                conceptoNombrePrincipal = "MATRICULA";
            } else if ("PENSION".equals(cuota.getConcepto().getTipo()) && !"MATRICULA".equals(conceptoTipoPrincipal)) {
                conceptoTipoPrincipal = "PENSION";
                conceptoNombrePrincipal = "PENSION";
            }
        }

        if (sumaAplicada.compareTo(req.getMontoTotal()) != 0) {
            throw new BusinessRuleException(String.format("La suma de los montos aplicados (S/ %.2f) no coincide con el total del pago (S/ %.2f).",
                sumaAplicada, req.getMontoTotal()));
        }

        // 4. Crear cabecera de Pago
        Pago pago = Pago.builder()
            .alumnoId(req.getAlumnoId())
            .pagadorNombre(req.getPagadorNombre())
            .pagadorDocumento(req.getPagadorDocumento())
            .montoTotal(req.getMontoTotal())
            .medio(req.getMedio())
            .referencia(req.getReferencia())
            .estado("CONFIRMADO")
            .cajaSesion(cajaSesion)
            .registradoPor(usuarioId)
            .pagadoEn(LocalDateTime.now())
            .idempotencyKey(req.getIdempotencyKey())
            .build();

        Pago pagoGuardado = pagoRepository.save(pago);

        // 5. Aplicar montos a cada cuota y guardar detalles (con bloqueo optimista @Version)
        List<Long> cuotaIds = new ArrayList<>();
        for (int i = 0; i < req.getDetalles().size(); i++) {
            PagoDetalleRequest detReq = req.getDetalles().get(i);
            Cuota cuota = cuotasAfectadas.get(i);

            BigDecimal nuevoSaldo = cuota.getSaldo().subtract(detReq.getMontoAplicado());
            cuota.setSaldo(nuevoSaldo);
            if (nuevoSaldo.compareTo(BigDecimal.ZERO) == 0) {
                cuota.setEstado("PAGADA");
            } else {
                cuota.setEstado("PARCIAL");
            }
            cuota.setActualizadaEn(LocalDateTime.now());
            cuotaRepository.save(cuota); // Dispara validación optimista de versión

            PagoDetalle detalle = PagoDetalle.builder()
                .pago(pagoGuardado)
                .cuota(cuota)
                .montoAplicado(detReq.getMontoAplicado())
                .build();
            detalles.add(pagoDetalleRepository.save(detalle));
            cuotaIds.add(cuota.getId());
        }
        pagoGuardado.setDetalles(detalles);

        // 6. Emitir comprobante interno
        Comprobante comprobante = comprobanteService.emitirComprobante(pagoGuardado, req.getTipoComprobante());

        // 7. Escribir evento en OUTBOX transaccional
        crearOutboxPagoConfirmado(pagoGuardado, matriculaIdPrincipal, cuotaIds, conceptoTipoPrincipal, conceptoNombrePrincipal);

        log.info("Pago ID {} registrado exitosamente por monto S/ {}.", pagoGuardado.getId(), pagoGuardado.getMontoTotal());
        return toResponse(pagoGuardado, comprobante);
    }

    // ------------------------------------------------------------------
    // Pagos de apoderados: quedan por aprobar hasta que caja los apruebe
    // ------------------------------------------------------------------

    /**
     * El apoderado informa su pago en línea. NO toca las cuotas ni emite comprobante: queda PENDIENTE y caja lo aprueba
     * (se confirma y se emite el comprobante) o lo rechaza con un motivo.
     */
    @Transactional
    public PagoResponse solicitarPagoOnline(RegistrarPagoRequest req, Long apoderadoUsuarioId) {
        Optional<Pago> existente = pagoRepository.findByIdempotencyKey(req.getIdempotencyKey());
        if (existente.isPresent()) {
            return toResponse(existente.get());
        }

        BigDecimal suma = BigDecimal.ZERO;
        List<Cuota> cuotas = new ArrayList<>();
        for (PagoDetalleRequest det : req.getDetalles()) {
            Cuota cuota = cuotaRepository.findById(det.getCuotaId())
                .orElseThrow(() -> new ResourceNotFoundException("Cuota no encontrada: " + det.getCuotaId()));
            if (!List.of("PENDIENTE", "PARCIAL", "VENCIDA").contains(cuota.getEstado())) {
                throw new BusinessRuleException(String.format("La cuota %d está en estado %s y no admite pagos.", cuota.getId(), cuota.getEstado()));
            }
            if (det.getMontoAplicado().compareTo(cuota.getSaldo()) > 0) {
                throw new BusinessRuleException(String.format("El monto a pagar (S/ %.2f) supera el saldo de la cuota %d (S/ %.2f).",
                    det.getMontoAplicado(), cuota.getId(), cuota.getSaldo()));
            }
            if ("MATRICULA".equals(cuota.getConcepto().getTipo())) {
                throw new BusinessRuleException("La matrícula se paga con su orden de pago (Pagos → «Pagar lo que falta»), no como una cuota suelta.");
            }
            if (pagoDetalleRepository.existsByCuotaIdAndPagoEstado(cuota.getId(), "PENDIENTE")) {
                throw new BusinessRuleException(String.format("La cuota %d ya tiene un pago en revisión en caja.", cuota.getId()));
            }
            suma = suma.add(det.getMontoAplicado());
            cuotas.add(cuota);
        }
        if (suma.compareTo(req.getMontoTotal()) != 0) {
            throw new BusinessRuleException(String.format("La suma de los montos aplicados (S/ %.2f) no coincide con el total del pago (S/ %.2f).",
                suma, req.getMontoTotal()));
        }

        Pago pago = pagoRepository.save(Pago.builder()
            .alumnoId(req.getAlumnoId())
            .pagadorNombre(req.getPagadorNombre())
            .pagadorDocumento(req.getPagadorDocumento())
            .montoTotal(req.getMontoTotal())
            .medio(req.getMedio())
            .referencia(req.getReferencia())
            .estado("PENDIENTE")
            .tipoComprobante(req.getTipoComprobante())
            .registradoPor(apoderadoUsuarioId)
            .pagadoEn(LocalDateTime.now())
            .idempotencyKey(req.getIdempotencyKey())
            .build());

        List<PagoDetalle> detalles = new ArrayList<>();
        for (int i = 0; i < cuotas.size(); i++) {
            detalles.add(pagoDetalleRepository.save(PagoDetalle.builder()
                .pago(pago).cuota(cuotas.get(i)).montoAplicado(req.getDetalles().get(i).getMontoAplicado()).build()));
        }
        pago.setDetalles(detalles);
        log.info("Pago {} del apoderado {} queda por aprobar en caja (S/ {}).", pago.getId(), apoderadoUsuarioId, pago.getMontoTotal());
        return toResponse(pago);
    }

    /** Caja (o el administrador) aprueba: aplica los montos a las cuotas, emite el comprobante y avisa como cualquier pago confirmado. */
    @Transactional
    public PagoResponse aprobar(Long pagoId, Long usuarioId) {
        Pago pago = pagoPendiente(pagoId);

        Long matriculaId = null;
        String tipoPrincipal = "OTRO";
        String nombrePrincipal = "Cobro educativo";
        List<Long> cuotaIds = new ArrayList<>();
        for (PagoDetalle det : pago.getDetalles()) {
            Cuota cuota = det.getCuota();
            if (!List.of("PENDIENTE", "PARCIAL", "VENCIDA").contains(cuota.getEstado())
                || det.getMontoAplicado().compareTo(cuota.getSaldo()) > 0) {
                throw new BusinessRuleException(String.format(
                    "La cuota %d ya no admite este monto (¿se pagó en ventanilla?). Rechaza el pago indicando el motivo.", cuota.getId()));
            }
            BigDecimal nuevoSaldo = cuota.getSaldo().subtract(det.getMontoAplicado());
            cuota.setSaldo(nuevoSaldo);
            cuota.setEstado(nuevoSaldo.compareTo(BigDecimal.ZERO) == 0 ? "PAGADA" : "PARCIAL");
            cuota.setActualizadaEn(LocalDateTime.now());
            cuotaRepository.save(cuota);
            cuotaIds.add(cuota.getId());

            if (matriculaId == null && cuota.getMatricula() != null) {
                matriculaId = cuota.getMatricula().getMatriculaId();
            }
            if ("MATRICULA".equals(cuota.getConcepto().getTipo())) {
                tipoPrincipal = "MATRICULA";
                nombrePrincipal = "MATRICULA";
            } else if ("PENSION".equals(cuota.getConcepto().getTipo()) && !"MATRICULA".equals(tipoPrincipal)) {
                tipoPrincipal = "PENSION";
                nombrePrincipal = "PENSION";
            }
        }

        pago.setEstado("CONFIRMADO");
        pago.setAprobadoPor(usuarioId);
        pago.setAprobadoEn(LocalDateTime.now());
        pagoRepository.save(pago);

        Comprobante comprobante = comprobanteService.emitirComprobante(pago, pago.getTipoComprobante() != null ? pago.getTipoComprobante() : "RECIBO");
        crearOutboxPagoConfirmado(pago, matriculaId, cuotaIds, tipoPrincipal, nombrePrincipal);
        log.info("Pago {} aprobado por el usuario {}.", pagoId, usuarioId);
        return toResponse(pago, comprobante);
    }

    /** Rechaza el pago de un apoderado: las cuotas siguen pendientes y el apoderado ve el motivo. */
    @Transactional
    public PagoResponse rechazar(Long pagoId, String motivo, Long usuarioId) {
        Pago pago = pagoPendiente(pagoId);
        pago.setEstado("RECHAZADO");
        pago.setMotivoRechazo(motivo);
        pago.setAprobadoPor(usuarioId);
        pago.setAprobadoEn(LocalDateTime.now());
        pagoRepository.save(pago);
        log.info("Pago {} rechazado por el usuario {}: {}", pagoId, usuarioId, motivo);
        return toResponse(pago);
    }

    @Transactional(readOnly = true)
    public List<PagoResponse> porAprobar() {
        return pagoRepository.findByEstadoOrderByPagadoEnAsc("PENDIENTE").stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public long contarPorAprobar() {
        return pagoRepository.countByEstado("PENDIENTE");
    }

    /** Lo que un apoderado pagó y sigue en revisión, o fue rechazado (con su motivo). */
    @Transactional(readOnly = true)
    public List<PagoResponse> pendientesDelApoderado(Long apoderadoUsuarioId) {
        return pagoRepository.findTop20ByRegistradoPorAndEstadoInOrderByPagadoEnDesc(apoderadoUsuarioId, List.of("PENDIENTE", "RECHAZADO"))
            .stream().map(this::toResponse).toList();
    }

    private Pago pagoPendiente(Long pagoId) {
        Pago pago = pagoRepository.findById(pagoId)
            .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado: " + pagoId));
        if (!"PENDIENTE".equals(pago.getEstado())) {
            throw new BusinessRuleException("Este pago ya no está por aprobar (estado: " + pago.getEstado() + ").");
        }
        return pago;
    }

    /** Visible para el servicio de crédito (mismo paquete): un cobro con crédito avisa igual que cualquier otro pago confirmado. */
    void crearOutboxPagoConfirmado(Pago pago, Long matriculaId, List<Long> cuotaIds, String conceptoTipo, String concepto) {
        try {
            UUID eventId = UUID.randomUUID();
            String traceId = MDC.get("traceId");

            PagoConfirmadoEvent payload = PagoConfirmadoEvent.builder()
                .pagoId(pago.getId())
                .alumnoId(pago.getAlumnoId())
                .matriculaId(matriculaId)
                .cuotaIds(cuotaIds)
                .conceptoTipo(conceptoTipo)
                .monto(pago.getMontoTotal())
                .concepto(concepto)
                .build();

            EventoSobre<PagoConfirmadoEvent> sobre = EventoSobre.<PagoConfirmadoEvent>builder()
                .eventId(eventId)
                .eventType(KafkaConfig.TOPIC_PAGO_CONFIRMADO)
                .occurredAt(LocalDateTime.now())
                .version(1)
                .traceId(traceId != null ? traceId : UUID.randomUUID().toString())
                .payload(payload)
                .build();

            String json = EventoSobre.escribir(objectMapper, sobre);

            OutboxEvento outbox = OutboxEvento.builder()
                .id(eventId)
                .aggregateType("PAGO")
                .aggregateId(String.valueOf(pago.getId()))
                .topic(KafkaConfig.TOPIC_PAGO_CONFIRMADO)
                .clave(String.valueOf(pago.getId()))
                .payload(json)
                .creadoEn(LocalDateTime.now())
                .intentos((short) 0)
                .build();

            outboxEventoRepository.save(outbox);
            log.info("Evento outbox registrado para pago confirmado {}", pago.getId());
        } catch (Exception e) {
            log.error("Error al registrar evento outbox de pago confirmado: {}", e.getMessage(), e);
            throw new RuntimeException("Error en persistencia de outbox transaccional", e);
        }
    }

    @Transactional(readOnly = true)
    public PagoResponse obtenerPorId(Long id) {
        Pago p = pagoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado: " + id));
        return toResponse(p);
    }

    @Transactional(readOnly = true)
    public PageResponse<PagoResponse> listarCobranza(LocalDateTime desde, LocalDateTime hasta, String medio, Pageable pageable) {
        Page<Pago> page = pagoRepository.findReporteCobranza(
            desde != null ? desde : LocalDateTime.now().minusMonths(1),
            hasta != null ? hasta : LocalDateTime.now(),
            medio,
            pageable
        );
        return PageResponse.from(page.map(this::toResponse));
    }

    public PagoResponse toResponse(Pago p) {
        // Solo consulta: nunca emite comprobantes (evita consumir correlativos en lecturas)
        Comprobante c = p.getId() != null ? comprobanteService.buscarPorPago(p.getId()).orElse(null) : null;
        return toResponse(p, c);
    }

    public PagoResponse toResponse(Pago p, Comprobante c) {
        List<PagoResponse.PagoDetalleResponse> detResponses = new ArrayList<>();
        if (p.getDetalles() != null) {
            for (PagoDetalle d : p.getDetalles()) {
                detResponses.add(PagoResponse.PagoDetalleResponse.builder()
                    .id(d.getId())
                    .cuotaId(d.getCuota().getId())
                    .cuotaDescripcion(d.getCuota().getDescripcion())
                    .montoAplicado(d.getMontoAplicado())
                    .nuevoSaldoCuota(d.getCuota().getSaldo())
                    .nuevoEstadoCuota(d.getCuota().getEstado())
                    .build());
            }
        }

        ComprobanteResponse compResp = null;
        if (c != null) {
            compResp = comprobanteService.toResponse(c);
        }

        return PagoResponse.builder()
            .id(p.getId())
            .alumnoId(p.getAlumnoId())
            .pagadorNombre(p.getPagadorNombre())
            .pagadorDocumento(p.getPagadorDocumento())
            .montoTotal(p.getMontoTotal())
            .medio(p.getMedio())
            .referencia(p.getReferencia())
            .estado(p.getEstado())
            .cajaSesionId(p.getCajaSesion() != null ? p.getCajaSesion().getId() : null)
            .registradoPor(p.getRegistradoPor())
            .pagadoEn(p.getPagadoEn())
            .aprobadoEn(p.getAprobadoEn())
            .motivoRechazo(p.getMotivoRechazo())
            .idempotencyKey(p.getIdempotencyKey())
            .comprobante(compResp)
            .detalles(detResponses)
            .build();
    }
}
```

---

<a id="77-solicituddescuentoservicejava"></a>
## 77. `SolicitudDescuentoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/SolicitudDescuentoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `SolicitudDescuento`. Implementa validaciones, reglas de negocio y persistencia.

```java
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
```

---

<a id="78-tarifaservicejava"></a>
## 78. `TarifaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/service/TarifaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `Tarifa`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.pago.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.dto.TarifaRequest;
import pe.edu.upeu.eduspace.pago.dto.TarifaResponse;
import pe.edu.upeu.eduspace.pago.entity.ConceptoPago;
import pe.edu.upeu.eduspace.pago.entity.Tarifa;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.ConceptoPagoRepository;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import pe.edu.upeu.eduspace.pago.repository.TarifaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TarifaService {

    private final TarifaRepository tarifaRepository;
    private final ConceptoPagoRepository conceptoPagoRepository;
    private final CuotaRepository cuotaRepository;
    private final GeneradorCuotasService generadorCuotasService;

    @Transactional(readOnly = true)
    public List<TarifaResponse> listarPorAnio(Long anioId) {
        return tarifaRepository.findByAnioIdAndActivoTrue(anioId).stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public TarifaResponse obtenerPorId(Long id) {
        Tarifa t = tarifaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tarifa no encontrada con ID: " + id));
        return toResponse(t);
    }

    @Transactional
    public TarifaResponse crear(TarifaRequest req) {
        ConceptoPago concepto = conceptoPagoRepository.findById(req.getConceptoId())
            .orElseThrow(() -> new ResourceNotFoundException("Concepto no encontrado con ID: " + req.getConceptoId()));

        Tarifa t = Tarifa.builder()
            .anioId(req.getAnioId())
            .nivelId(req.getNivelId())
            .gradoId(req.getGradoId())
            .concepto(concepto)
            .monto(req.getMonto())
            .numCuotas(req.getNumCuotas())
            .mesInicio(req.getMesInicio())
            .diaVencimiento(req.getDiaVencimiento())
            .activo(req.getActivo() != null ? req.getActivo() : true)
            .build();

        Tarifa guardada = tarifaRepository.save(t);
        generadorCuotasService.reintentarPorTarifa(guardada);
        return toResponse(guardada);
    }

    @Transactional
    public TarifaResponse actualizar(Long id, TarifaRequest req) {
        Tarifa t = tarifaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tarifa no encontrada con ID: " + id));

        // Regla: no se modifica si ya generó cuotas asociadas
        // (En ese caso solo se permite desactivar o se lanza error si cambian montos/fechas)
        if (t.getMonto().compareTo(req.getMonto()) != 0) {   // compareTo: 150 y 150.00 son el mismo monto
            // Se valida si hay cuotas que referencian esta tarifa
            // Si hay cuotas, solo se permite desactivar o cambiar estado
            t.setActivo(req.getActivo());
            throw new BusinessRuleException("No se puede modificar el monto de una tarifa ya existente: desactívela y cree una nueva.");
        }

        t.setActivo(req.getActivo());
        return toResponse(tarifaRepository.save(t));
    }

    private TarifaResponse toResponse(Tarifa t) {
        return TarifaResponse.builder()
            .id(t.getId())
            .anioId(t.getAnioId())
            .nivelId(t.getNivelId())
            .gradoId(t.getGradoId())
            .conceptoId(t.getConcepto().getId())
            .conceptoCodigo(t.getConcepto().getCodigo())
            .conceptoNombre(t.getConcepto().getNombre())
            .monto(t.getMonto())
            .numCuotas(t.getNumCuotas())
            .mesInicio(t.getMesInicio())
            .diaVencimiento(t.getDiaVencimiento())
            .activo(t.getActivo())
            .build();
    }
}
```

---

<a id="79-alertacontrollerjava"></a>
## 79. `AlertaController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/AlertaController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `Alerta`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.entity.AlertaAdmin;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.AlertaAdminRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos/alertas")
@RequiredArgsConstructor
@Tag(name = "Alertas administrativas", description = "Tarifas faltantes y cuotas por decidir")
public class AlertaController {

    private final AlertaAdminRepository repo;

    @GetMapping
    @Operation(summary = "Alertas para administración (por defecto las pendientes)")
    public ResponseEntity<List<AlertaAdmin>> listar(@RequestParam(defaultValue = "false") boolean resueltas) {
        return ResponseEntity.ok(repo.findByResueltaOrderByCreadaEnDesc(resueltas));
    }

    @PatchMapping("/{id}/resolver")
    @Transactional
    @Operation(summary = "Marcar una alerta como resuelta")
    public ResponseEntity<AlertaAdmin> resolver(@PathVariable Long id) {
        AlertaAdmin a = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Alerta no encontrada: " + id));
        a.setResuelta(true);
        a.setResueltaEn(LocalDateTime.now());
        return ResponseEntity.ok(repo.save(a));
    }
}
```

---

<a id="80-cajacontrollerjava"></a>
## 80. `CajaController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/CajaController.java`

### **¿Qué hace esta clase?**
Controlador REST de ventanilla de caja. Expone `/api/caja` con endpoints para abrir caja, verificar estado de caja actual, consultar recaudación acumulada y procesar el arqueo de cierre.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.*;
import pe.edu.upeu.eduspace.pago.service.CajaService;

@RestController
@RequestMapping("/api/v1/pagos/caja")
@RequiredArgsConstructor
@Tag(name = "Caja", description = "Apertura, cierre y arqueo de caja por cajero")
public class CajaController {

    private final CajaService cajaService;

    @PostMapping("/abrir")
    @Operation(summary = "Abrir sesión de caja (CAJERO)")
    public ResponseEntity<CajaResponse> abrir(@Valid @RequestBody AbrirCajaRequest req,
                                             @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(cajaService.abrirCaja(usuarioId, req));
    }

    @PostMapping("/cerrar")
    @Operation(summary = "Cerrar sesión de caja y calcular diferencia (CAJERO)")
    public ResponseEntity<CierreCajaResponse> cerrar(@Valid @RequestBody CerrarCajaRequest req,
                                                     @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.ok(cajaService.cerrarCaja(usuarioId, req));
    }

    @GetMapping("/actual")
    @Operation(summary = "Consultar caja abierta del cajero actual (CAJERO)")
    public ResponseEntity<CajaResponse> actual(@AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.ok(cajaService.obtenerCajaActual(usuarioId));
    }

    @GetMapping("/{id}/reporte")
    @Operation(summary = "Reporte y arqueo de una sesión de caja (CAJERO, ADMIN)")
    public ResponseEntity<CierreCajaResponse> reporte(@PathVariable Long id) {
        return ResponseEntity.ok(cajaService.reporteCaja(id));
    }
}
```

---

<a id="81-conceptocontrollerjava"></a>
## 81. `ConceptoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/ConceptoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `Concepto`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.ConceptoRequest;
import pe.edu.upeu.eduspace.pago.dto.ConceptoResponse;
import pe.edu.upeu.eduspace.pago.service.ConceptoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos/conceptos")
@RequiredArgsConstructor
@Tag(name = "Conceptos de Pago", description = "Gestión de catálogo de conceptos")
public class ConceptoController {

    private final ConceptoService conceptoService;

    @GetMapping
    @Operation(summary = "Listar conceptos de pago activos")
    public ResponseEntity<List<ConceptoResponse>> listar() {
        return ResponseEntity.ok(conceptoService.listarActivos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener concepto de pago por ID")
    public ResponseEntity<ConceptoResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(conceptoService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo concepto de pago (ADMIN)")
    public ResponseEntity<ConceptoResponse> crear(@Valid @RequestBody ConceptoRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(conceptoService.crear(req));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar concepto de pago (ADMIN)")
    public ResponseEntity<ConceptoResponse> actualizar(@PathVariable Long id, @Valid @RequestBody ConceptoRequest req) {
        return ResponseEntity.ok(conceptoService.actualizar(id, req));
    }
}
```

---

<a id="82-creditocontrollerjava"></a>
## 82. `CreditoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/CreditoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `Credito`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.AnularDepositoRequest;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Credito;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.DepositoRequest;
import pe.edu.upeu.eduspace.pago.dto.CreditoDtos.Resultado;
import pe.edu.upeu.eduspace.pago.security.UsuarioActual;
import pe.edu.upeu.eduspace.pago.service.CreditoService;

/** Crédito del alumno: consulta (caja, secretaría, administración), depósitos y cobro (caja y administración) y anulación de depósitos (administración). */
@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Crédito del alumno", description = "Saldo a favor que se cobra solo de las pensiones cuando vencen")
public class CreditoController {

    private final CreditoService creditos;

    @GetMapping("/alumnos/{alumnoId}/credito")
    @Operation(summary = "Crédito del alumno: saldo, lo que ya toca cobrar, lo que faltaría, y sus movimientos")
    public Credito consultar(@PathVariable Long alumnoId) {
        return creditos.consultar(alumnoId);
    }

    @PostMapping("/alumnos/{alumnoId}/credito/depositos")
    @Operation(summary = "Depositar al crédito del alumno (CAJERO, ADMIN); cobra enseguida lo que ya toque")
    public ResponseEntity<Resultado> depositar(@PathVariable Long alumnoId, @Valid @RequestBody DepositoRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(creditos.depositar(alumnoId, req.monto(), req.medio(), req.referencia(), req.idempotencyKey(), UsuarioActual.id(jwt)));
    }

    @PostMapping("/alumnos/{alumnoId}/credito/cobrar")
    @Operation(summary = "Cobrar ahora del crédito las pensiones vencidas (CAJERO, ADMIN)")
    public Resultado cobrar(@PathVariable Long alumnoId, @AuthenticationPrincipal Jwt jwt) {
        return creditos.cobrarAhora(alumnoId, UsuarioActual.id(jwt));
    }

    @PostMapping("/creditos/movimientos/{id}/anular")
    @Operation(summary = "Anular un depósito mal registrado (ADMIN)")
    public ResponseEntity<Void> anularDeposito(@PathVariable Long id, @Valid @RequestBody AnularDepositoRequest req, @AuthenticationPrincipal Jwt jwt) {
        creditos.anularDeposito(id, req.motivo(), UsuarioActual.id(jwt));
        return ResponseEntity.noContent().build();
    }
}
```

---

<a id="83-descuentocontrollerjava"></a>
## 83. `DescuentoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/DescuentoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `Descuento`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.AsignarDescuentoRequest;
import pe.edu.upeu.eduspace.pago.dto.DescuentoRequest;
import pe.edu.upeu.eduspace.pago.dto.DescuentoResponse;
import pe.edu.upeu.eduspace.pago.service.DescuentoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos/descuentos")
@RequiredArgsConstructor
@Tag(name = "Descuentos", description = "Catálogo y asignación de descuentos escolares")
public class DescuentoController {

    private final DescuentoService descuentoService;

    @GetMapping
    @Operation(summary = "Listar catálogo de descuentos activos")
    public ResponseEntity<List<DescuentoResponse>> listar() {
        return ResponseEntity.ok(descuentoService.listarActivos());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo descuento (ADMIN)")
    public ResponseEntity<DescuentoResponse> crear(@Valid @RequestBody DescuentoRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(descuentoService.crear(req));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar un descuento del catálogo; no altera cuotas ya generadas (ADMIN)")
    public ResponseEntity<DescuentoResponse> actualizar(@PathVariable Long id, @Valid @RequestBody DescuentoRequest req) {
        return ResponseEntity.ok(descuentoService.actualizar(id, req));
    }

    @PostMapping("/asignar")
    @Operation(summary = "Asignar descuento a un alumno/año lectivo (ADMIN)")
    public ResponseEntity<Void> asignar(@Valid @RequestBody AsignarDescuentoRequest req,
                                        @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        descuentoService.asignarDescuentoAlumno(req, usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
```

---

<a id="84-fondoareascontrollerjava"></a>
## 84. `FondoAreasController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/FondoAreasController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `FondoAreas`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.FijarAsignacion;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.FijarVarias;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.Movimiento;
import pe.edu.upeu.eduspace.pago.dto.FondoDtos.Resumen;
import pe.edu.upeu.eduspace.pago.security.UsuarioActual;
import pe.edu.upeu.eduspace.pago.service.FondoAreasService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos/fondo")
@RequiredArgsConstructor
@Tag(name = "Fondo de áreas", description = "Reparto del dinero de caja entre las áreas de trabajo (solo ADMIN)")
public class FondoAreasController {

    private final FondoAreasService service;

    @GetMapping
    @Operation(summary = "Lo cobrado, lo asignado a las áreas y lo que queda disponible en caja")
    public Resumen resumen() {
        return service.resumen();
    }

    @PutMapping("/areas")
    @Operation(summary = "Reparte varias áreas a la vez (todo o nada); cada monto es el total que debe quedar en el área")
    public Resumen fijarVarias(@Valid @RequestBody FijarVarias request, @AuthenticationPrincipal Jwt jwt) {
        return service.fijarVarias(request.areas(), request.motivo(), UsuarioActual.id(jwt));
    }

    @PutMapping("/areas/{areaId}")
    @Operation(summary = "Deja asignado a un área el monto indicado (sale de caja o vuelve a caja la diferencia)")
    public Resumen fijar(@PathVariable Long areaId, @Valid @RequestBody FijarAsignacion request, @AuthenticationPrincipal Jwt jwt) {
        return service.fijarAsignacion(areaId, request.monto(), request.motivo(), UsuarioActual.id(jwt));
    }

    @GetMapping("/areas/{areaId}/movimientos")
    @Operation(summary = "Últimos movimientos de dinero de un área")
    public List<Movimiento> movimientos(@PathVariable Long areaId) {
        return service.movimientos(areaId);
    }
}
```

---

<a id="85-internalmatriculapagocontrollerjava"></a>
## 85. `InternalMatriculaPagoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/InternalMatriculaPagoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `InternalMatriculaPago`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.PagoDetalleRequest;
import pe.edu.upeu.eduspace.pago.dto.PagoResponse;
import pe.edu.upeu.eduspace.pago.dto.RegistrarPagoRequest;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.entity.Tarifa;
import pe.edu.upeu.eduspace.pago.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.ConceptoPagoRepository;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import pe.edu.upeu.eduspace.pago.repository.TarifaRepository;
import pe.edu.upeu.eduspace.pago.service.DescuentoService;
import pe.edu.upeu.eduspace.pago.service.PagoService;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService;

/**
 * Lo que matricula-ms necesita de pago-ms para la matrícula en línea del sitio público: cuánto cuesta, qué cuotas tiene una
 * matrícula y cobrar la cuota de matrícula con el pago simulado. Solo responde con el token de servicio (no pasa por el Gateway).
 */
@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@Transactional   // las cuotas cargan su concepto de forma perezosa
@Tag(name = "Internal matrícula en línea")
public class InternalMatriculaPagoController {

    private final TarifaRepository tarifas;
    private final ConceptoPagoRepository conceptos;
    private final CuotaRepository cuotas;
    private final PagoService pagos;
    private final DescuentoService descuentos;
    private final SolicitudDescuentoService solicitudesDescuento;

    public record Costo(Long tarifaId, BigDecimal monto, Short numCuotas, Short mesInicio, Short diaVencimiento) {}

    public record OfertaCosto(Costo matricula, Costo pension) {}

    public record CuotaResumen(Long id, String concepto, String descripcion, Short numeroCuota, BigDecimal montoBase, BigDecimal descuento,
                               BigDecimal montoTotal, BigDecimal saldo, LocalDate fechaVencimiento, String estado) {}

    public record CobroMatricula(@NotNull Long matriculaId, @NotNull Long alumnoId, @NotBlank @Size(max = 200) String pagadorNombre,
                                 @Size(max = 20) String pagadorDocumento, @Size(max = 80) String referencia) {}

    public record ResultadoCobro(Long pagoId, String comprobante, BigDecimal monto, Long cuotaId) {}

    /** Lo único que ve la familia de un descuento: su código, cómo se llama y cuánto vale (no el resto del catálogo). */
    public record DescuentoPublico(String codigo, String nombre, String tipo, BigDecimal valor, String aplicaA) {}

    public record AsignacionPorCodigo(@NotBlank @Size(max = 40) String codigo, @NotNull Long alumnoId, @NotNull Long anioId, @Size(max = 300) String motivo) {}

    /** Valida el código de descuento de la matrícula en línea. 404 si no existe o ya no está vigente. */
    @GetMapping("/descuentos/codigo/{codigo}")
    public DescuentoPublico descuentoPorCodigo(@PathVariable String codigo) {
        var d = descuentos.buscarPorCodigo(codigo);
        return new DescuentoPublico(d.getCodigo(), d.getNombre(), d.getTipo(), d.getValor(), d.getAplicaA());
    }

    /** La solicitud de descuento de una matrícula, envuelta para que «ninguna» sea una respuesta normal y no un error. */
    public record SolicitudDeMatricula(SolicitudDescuentoService.Vista solicitud) {}

    /** Los descuentos que se pueden pedir para la matrícula (matricula-ms elige entre ellos el de hermanos). */
    @GetMapping("/descuentos/opciones-matricula")
    public List<SolicitudDescuentoService.Opcion> opcionesMatricula() {
        return solicitudesDescuento.opciones();
    }

    /** Registra el descuento por hermano que pidió la familia desde el sitio público (queda en revisión hasta que la secretaría responda). */
    @PostMapping("/descuentos/solicitud-publica")
    public SolicitudDescuentoService.Vista solicitudPublica(@RequestBody SolicitudDescuentoService.PedidoPublico pedido) {
        return solicitudesDescuento.solicitarPublica(pedido);
    }

    @GetMapping("/descuentos/solicitud/matricula/{matriculaId}")
    public SolicitudDeMatricula solicitudDeMatricula(@PathVariable Long matriculaId) {
        return new SolicitudDeMatricula(solicitudesDescuento.deMatricula(matriculaId));
    }

    /** Asigna al alumno el descuento del código (idempotente). Se llama antes de que se genere la cuota de matrícula. */
    @PostMapping("/descuentos/asignar-por-codigo")
    public void asignarPorCodigo(@Valid @RequestBody AsignacionPorCodigo req) {
        descuentos.asignarPorCodigo(req.codigo(), req.alumnoId(), req.anioId(), req.motivo());
    }

    /** Matrícula y pensión que corresponden a un grado (la tarifa más específica aplicable). */
    @GetMapping("/tarifas/aplicable")
    public OfertaCosto aplicable(@RequestParam Long anioId, @RequestParam Long nivelId, @RequestParam Long gradoId) {
        return new OfertaCosto(costo("MATRICULA", anioId, nivelId, gradoId), costo("PENSION", anioId, nivelId, gradoId));
    }

    @GetMapping("/pagos/matricula/{matriculaId}/cuotas")
    public List<CuotaResumen> cuotasDe(@PathVariable Long matriculaId) {
        return cuotas.findByMatriculaMatriculaId(matriculaId).stream()
            .sorted(java.util.Comparator.comparing(Cuota::getFechaVencimiento).thenComparing(Cuota::getNumeroCuota))
            .map(c -> new CuotaResumen(c.getId(), c.getConcepto().getTipo(), c.getDescripcion(), c.getNumeroCuota(), c.getMontoBase(),
                c.getDescuento(), c.getMontoTotal(), c.getSaldo(), c.getFechaVencimiento(), c.getEstado()))
            .toList();
    }

    /** Cobra la cuota de matrícula pendiente con el medio ONLINE_SIMULADO. Idempotente por matrícula. */
    @PostMapping("/pagos/matricula-en-linea")
    public ResultadoCobro cobrar(@Valid @RequestBody CobroMatricula req) {
        Cuota cuota = cuotas.findByMatriculaMatriculaId(req.matriculaId()).stream()
            .filter(c -> "MATRICULA".equals(c.getConcepto().getTipo()))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("La matrícula " + req.matriculaId() + " todavía no tiene cuota de matrícula."));
        if (!req.alumnoId().equals(cuota.getAlumnoId())) {
            throw new BusinessRuleException("La cuota no corresponde a ese alumno.");
        }
        RegistrarPagoRequest r = new RegistrarPagoRequest();
        r.setAlumnoId(req.alumnoId());
        r.setPagadorNombre(req.pagadorNombre());
        r.setPagadorDocumento(req.pagadorDocumento());
        r.setMedio("ONLINE_SIMULADO");
        r.setReferencia(req.referencia() == null || req.referencia().isBlank() ? "WEB-" + System.currentTimeMillis() : req.referencia());
        r.setIdempotencyKey("WEB-MAT-" + req.matriculaId());
        r.setTipoComprobante("RECIBO");
        // Si ya estaba pagada (reintento) el registro idempotente devuelve el pago original.
        BigDecimal monto = cuota.getSaldo().signum() > 0 ? cuota.getSaldo() : cuota.getMontoTotal();
        r.setMontoTotal(monto);
        PagoDetalleRequest d = new PagoDetalleRequest();
        d.setCuotaId(cuota.getId());
        d.setMontoAplicado(monto);
        r.setDetalles(List.of(d));
        PagoResponse p = pagos.registrarPago(r, null);
        return new ResultadoCobro(p.getId(), p.getComprobante() != null ? p.getComprobante().getNumeroCompleto() : null, p.getMontoTotal(), cuota.getId());
    }

    private Costo costo(String codigoConcepto, Long anioId, Long nivelId, Long gradoId) {
        return conceptos.findByCodigo(codigoConcepto)
            .flatMap(c -> tarifas.findTarifaAplicable(anioId, nivelId, gradoId, c.getId()))
            .map((Tarifa t) -> new Costo(t.getId(), t.getMonto(), t.getNumCuotas(), t.getMesInicio(), t.getDiaVencimiento()))
            .orElse(null);
    }
}
```

---

<a id="86-internalpagocontrollerjava"></a>
## 86. `InternalPagoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/InternalPagoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `InternalPago`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/internal/pagos")
@RequiredArgsConstructor
@Tag(name = "Internal Pago", description = "Endpoints de comunicación interna directa entre microservicios")
public class InternalPagoController {

    private final CuotaRepository cuotaRepository;
    private final PlanPagoController planPagoController;

    @GetMapping("/planes-pago")
    @Operation(summary = "Formas de pago con su descuento (las usa la matrícula en línea del sitio público, que no tiene sesión)")
    public List<PlanPagoController.Opcion> planesPago() {
        return planPagoController.planes();
    }

    @GetMapping("/alumno/{id}/deuda")
    @Operation(summary = "¿El alumno tiene deuda vencida? (Usado por matricula-ms para ratificación anual)")
    public ResponseEntity<Map<String, Object>> consultarDeudaVencida(@PathVariable Long id) {
        List<Cuota> vencidas = cuotaRepository.findDeudasVencidasByAlumnoId(id);
        boolean tieneDeuda = !vencidas.isEmpty();
        BigDecimal montoTotal = vencidas.stream().map(Cuota::getSaldo).reduce(BigDecimal.ZERO, BigDecimal::add);

        return ResponseEntity.ok(Map.of(
            "alumnoId", id,
            "tieneDeudaVencida", tieneDeuda,
            "montoVencido", montoTotal,
            "cuotasVencidasCount", vencidas.size()
        ));
    }
}
```

---

<a id="87-matriculapagocontrollerjava"></a>
## 87. `MatriculaPagoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/MatriculaPagoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `MatriculaPago`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;
import pe.edu.upeu.eduspace.pago.security.UsuarioActual;
import pe.edu.upeu.eduspace.pago.service.MatriculaPagoService;
import pe.edu.upeu.eduspace.pago.service.MatriculaPagoService.*;
import pe.edu.upeu.eduspace.pago.util.FirmaWebhook;
import pe.edu.upeu.eduspace.pago.util.PasarelaSimulada;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Pago de la matrícula con el ciclo de una pasarela real: el servidor calcula lo que falta y crea la orden; la pasarela (simulada) cobra y
 * avisa con su id de transacción; el servidor confirma una sola vez y suma el dinero al crédito, de donde se cobra la matrícula.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Pago de la matrícula", description = "Orden de pago, pasarela simulada, aviso firmado y generar la matrícula con el crédito")
public class MatriculaPagoController {

    private static final Set<String> PERSONAL = Set.of("ROLE_ADMIN", "ROLE_SECRETARIA", "ROLE_CAJERO");

    private final MatriculaPagoService servicio;
    private final PagoProperties props;
    private final ObjectMapper mapper;

    @GetMapping("/alumnos/{alumnoId}/matricula")
    @Operation(summary = "Cuánto falta de la matrícula, el crédito del alumno y si ya se puede generar (APODERADO de ese alumno, CAJERO, SECRETARIA, ADMIN)")
    public EstadoMatricula estado(@PathVariable Long alumnoId, @AuthenticationPrincipal Jwt jwt, Authentication auth) {
        return servicio.estado(alumnoId, UsuarioActual.id(jwt), personal(auth));
    }

    @PostMapping("/alumnos/{alumnoId}/matricula/orden")
    @Operation(summary = "Crea la orden de pago por lo que falta de la matrícula; el monto lo calcula el servidor")
    public ResponseEntity<OrdenVista> crearOrden(@PathVariable Long alumnoId, @AuthenticationPrincipal Jwt jwt, Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crearOrden(alumnoId, UsuarioActual.id(jwt), personal(auth)));
    }

    @PostMapping("/alumnos/{alumnoId}/matricula/generar")
    @Operation(summary = "Genera la matrícula cobrándola del crédito del alumno; falla si el crédito no alcanza")
    public EstadoMatricula generar(@PathVariable Long alumnoId, @AuthenticationPrincipal Jwt jwt, Authentication auth) {
        return servicio.generar(alumnoId, UsuarioActual.id(jwt), personal(auth));
    }

    @PostMapping("/pasarela/ordenes/{codigo}/pagar")
    @Operation(summary = "Pantalla de pago de la pasarela SIMULADA: procesa el pago y avisa al servidor con el id de transacción")
    public ResultadoPasarela pagar(@PathVariable String codigo, @RequestBody PasarelaSimulada.Datos datos,
                                   @AuthenticationPrincipal Jwt jwt, Authentication auth) {
        return servicio.pagarSimulado(codigo, datos, UsuarioActual.id(jwt), personal(auth));
    }

    /**
     * El aviso (webhook) de la pasarela. No lleva sesión: lo protege la firma HMAC-SHA256 del cuerpo en la cabecera {@code X-Firma}
     * (el navegador no tiene el secreto, así que no puede confirmar una orden por su cuenta).
     */
    @PostMapping(value = "/pasarela/notificacion", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Aviso firmado de la pasarela: confirma la orden (idempotente)")
    public ResponseEntity<Map<String, String>> notificacion(@RequestBody String cuerpo, @RequestHeader(value = "X-Firma", required = false) String firma) {
        if (!FirmaWebhook.valida(props.getPasarelaSecreto(), cuerpo, firma)) {
            log.warn("Aviso de la pasarela con firma inválida descartado.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Firma inválida"));
        }
        Aviso aviso = mapper.readValue(cuerpo, Aviso.class);
        var orden = servicio.confirmarOrden(aviso);
        return ResponseEntity.ok(Map.of("orden", orden.getCodigo(), "estado", orden.getEstado()));
    }

    @GetMapping("/matriculas/por-pagar")
    @Operation(summary = "Alumnos con pre-matrícula que aún deben la matrícula (CAJERO, SECRETARIA, ADMIN)")
    public List<PorPagar> porPagar() {
        return servicio.porPagar();
    }

    private static boolean personal(Authentication auth) {
        return auth != null && auth.getAuthorities().stream().anyMatch(a -> PERSONAL.contains(a.getAuthority()));
    }
}
```

---

<a id="88-pagocontrollerjava"></a>
## 88. `PagoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/PagoController.java`

### **¿Qué hace esta clase?**
Controlador REST para las operaciones de cobro en ventanilla y consulta de cuentas corrientes. Expone `/api/pagos` para registrar pagos, anular pagos, obtener historial de pagos por alumno y reportes de recaudación.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.client.AlumnoContactoResponse;
import pe.edu.upeu.eduspace.pago.client.AlumnosClient;
import pe.edu.upeu.eduspace.pago.dto.*;
import pe.edu.upeu.eduspace.pago.entity.Comprobante;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.pago.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.pago.repository.ComprobanteRepository;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import pe.edu.upeu.eduspace.pago.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.pago.service.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Pagos y Cuotas", description = "Operaciones de cobro, estado de cuenta, cuotas y comprobantes")
public class PagoController {

    private final PagoService pagoService;
    private final PagoOnlineService pagoOnlineService;
    private final AnulacionService anulacionService;
    private final CreditoService creditoService;
    private final ComprobanteService comprobanteService;
    private final ComprobanteRepository comprobanteRepository;
    private final CuotaRepository cuotaRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final pe.edu.upeu.eduspace.pago.repository.DescuentoAlumnoRepository descuentoAlumnoRepository;
    private final pe.edu.upeu.eduspace.pago.client.AlumnosGateway alumnosGateway;

    @PostMapping
    @Operation(summary = "Registrar cobro en ventanilla o presencial (CAJERO, ADMIN)")
    public ResponseEntity<PagoResponse> registrarPago(@Valid @RequestBody RegistrarPagoRequest req,
                                                     @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(pagoService.registrarPago(req, usuarioId));
    }

    @PostMapping("/online")
    @Operation(summary = "Pago en línea simulado desde la app (APODERADO)")
    public ResponseEntity<PagoResponse> pagarOnline(@Valid @RequestBody RegistrarPagoRequest req,
                                                   @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(pagoOnlineService.pagarOnlineSimulado(req, usuarioId));
    }

    @GetMapping("/por-aprobar")
    @Operation(summary = "Pagos de apoderados esperando aprobación de caja (CAJERO, ADMIN)")
    public ResponseEntity<List<PagoResponse>> porAprobar() {
        return ResponseEntity.ok(pagoService.porAprobar());
    }

    @GetMapping("/por-aprobar/conteo")
    @Operation(summary = "Cuántos pagos de apoderados esperan aprobación (CAJERO, ADMIN)")
    public ResponseEntity<java.util.Map<String, Long>> conteoPorAprobar() {
        return ResponseEntity.ok(java.util.Map.of("pendientes", pagoService.contarPorAprobar()));
    }

    @PostMapping("/{id}/aprobar")
    @Operation(summary = "Aprobar el pago de un apoderado: confirma las cuotas y emite el comprobante (CAJERO, ADMIN)")
    public ResponseEntity<PagoResponse> aprobar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.ok(pagoService.aprobar(id, usuarioId));
    }

    @PostMapping("/{id}/rechazar")
    @Operation(summary = "Rechazar el pago de un apoderado con un motivo (CAJERO, ADMIN)")
    public ResponseEntity<PagoResponse> rechazar(@PathVariable Long id,
                                                 @Valid @RequestBody AnularPagoRequest req,
                                                 @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.ok(pagoService.rechazar(id, req.getMotivo(), usuarioId));
    }

    @GetMapping("/mias/pendientes")
    @Operation(summary = "Pagos del apoderado en revisión o rechazados (APODERADO)")
    public ResponseEntity<List<PagoResponse>> misPendientes(@AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        return ResponseEntity.ok(pagoService.pendientesDelApoderado(usuarioId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de pago por ID")
    public ResponseEntity<PagoResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pagoService.obtenerPorId(id));
    }

    @GetMapping("/{id}/comprobante")
    @Operation(summary = "Obtener comprobante emitido por pago ID")
    public ResponseEntity<ComprobanteResponse> obtenerComprobante(@PathVariable Long id) {
        Comprobante comp = comprobanteRepository.findByPagoId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comprobante no encontrado para el pago ID: " + id));
        return ResponseEntity.ok(comprobanteService.toResponse(comp));
    }

    @PatchMapping("/{id}/anular")
    @Operation(summary = "Anular un pago registrado (ADMIN)")
    public ResponseEntity<Void> anularPago(@PathVariable Long id,
                                          @Valid @RequestBody AnularPagoRequest req,
                                          @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        anulacionService.anularPago(id, req, usuarioId);
        return ResponseEntity.noContent().build();
    }

    /** Un descuento asignado a un alumno, con su nombre y valor (caja, secretaría y administración). */
    public record DescuentoDelAlumno(Long id, String nombre, String tipo, BigDecimal valor, String aplicaA, Long anioId, String motivo) {}

    @GetMapping("/alumnos/{alumnoId}/descuentos")
    @Operation(summary = "Descuentos vigentes del alumno, con su nombre y valor (CAJERO, SECRETARIA, ADMIN)")
    @Transactional(readOnly = true)
    public ResponseEntity<List<DescuentoDelAlumno>> descuentosDelAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(descuentoAlumnoRepository.findVigentesDelAlumno(alumnoId).stream()
            .map(da -> new DescuentoDelAlumno(da.getId(), da.getDescuento().getNombre(), da.getDescuento().getTipo(),
                da.getDescuento().getValor(), da.getDescuento().getAplicaA(), da.getAnioId(), da.getMotivo()))
            .toList());
    }

    @GetMapping("/alumnos/{alumnoId}/estado-cuenta")
    @Operation(summary = "Consultar estado de cuenta completo del alumno con todas sus cuotas")
    @Transactional(readOnly = true)
    public ResponseEntity<EstadoCuentaResponse> estadoCuenta(@PathVariable Long alumnoId) {
        List<Cuota> cuotas = cuotaRepository.findByAlumnoIdOrderByFechaVencimientoAsc(alumnoId);
        List<MatriculaLocal> mats = matriculaLocalRepository.findByAlumnoId(alumnoId);

        String alumnoNombre = mats.isEmpty() ? "Alumno " + alumnoId : mats.get(0).getAlumnoNombre();
        String respNombre = mats.isEmpty() ? null : mats.get(0).getResponsableNombre();

        BigDecimal cobrado = BigDecimal.ZERO;
        BigDecimal pendiente = BigDecimal.ZERO;
        BigDecimal vencido = BigDecimal.ZERO;
        LocalDate hoy = LocalDate.now();

        List<CuotaResponse> cuotasResp = new ArrayList<>();
        for (Cuota c : cuotas) {
            long diasAtraso = c.getFechaVencimiento().isBefore(hoy) ? ChronoUnit.DAYS.between(c.getFechaVencimiento(), hoy) : 0;
            if ("PAGADA".equals(c.getEstado())) {
                cobrado = cobrado.add(c.getMontoTotal());
            } else if ("VENCIDA".equals(c.getEstado())) {
                vencido = vencido.add(c.getSaldo());
            } else if ("PENDIENTE".equals(c.getEstado()) || "PARCIAL".equals(c.getEstado())) {
                pendiente = pendiente.add(c.getSaldo());
            }

            cuotasResp.add(CuotaResponse.builder()
                .id(c.getId())
                .matriculaId(c.getMatricula() != null ? c.getMatricula().getMatriculaId() : null)
                .alumnoId(c.getAlumnoId())
                .anioId(c.getAnioId())
                .conceptoId(c.getConcepto().getId())
                .conceptoNombre(c.getConcepto().getNombre())
                .conceptoTipo(c.getConcepto().getTipo())
                .descripcion(c.getDescripcion())
                .numeroCuota(c.getNumeroCuota())
                .montoBase(c.getMontoBase())
                .descuento(c.getDescuento())
                .mora(c.getMora())
                .montoTotal(c.getMontoTotal())
                .saldo(c.getSaldo())
                .fechaVencimiento(c.getFechaVencimiento())
                .estado(c.getEstado())
                .diasAtraso(diasAtraso)
                .avisoEnviado(c.getAvisoEnviado())
                .build());
        }

        return ResponseEntity.ok(EstadoCuentaResponse.builder()
            .alumnoId(alumnoId)
            .alumnoNombre(alumnoNombre)
            .responsableNombre(respNombre)
            .totalCobrado(cobrado)
            .totalPendiente(pendiente)
            .totalVencido(vencido)
            .credito(creditoService.saldoDe(alumnoId))
            .cuotas(cuotasResp)
            .build());
    }

    @GetMapping("/cuotas")
    @Operation(summary = "Consulta paginada de cuotas por estado, sección o vencimiento")
    @Transactional(readOnly = true)
    public ResponseEntity<PageResponse<CuotaResponse>> listarCuotas(
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) Long alumnoId,
            @RequestParam(required = false) Long seccionId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate vencimiento,
            Pageable pageable) {

        LocalDate hoy = LocalDate.now();
        var page = cuotaRepository.findCuotasFiltradas(estado, alumnoId, seccionId, vencimiento, pageable)
            .map(c -> CuotaResponse.builder()
                .id(c.getId())
                .matriculaId(c.getMatricula() != null ? c.getMatricula().getMatriculaId() : null)
                .alumnoId(c.getAlumnoId())
                .anioId(c.getAnioId())
                .conceptoId(c.getConcepto().getId())
                .conceptoNombre(c.getConcepto().getNombre())
                .conceptoTipo(c.getConcepto().getTipo())
                .descripcion(c.getDescripcion())
                .numeroCuota(c.getNumeroCuota())
                .montoBase(c.getMontoBase())
                .descuento(c.getDescuento())
                .mora(c.getMora())
                .montoTotal(c.getMontoTotal())
                .saldo(c.getSaldo())
                .fechaVencimiento(c.getFechaVencimiento())
                .estado(c.getEstado())
                .diasAtraso(c.getFechaVencimiento().isBefore(hoy) ? ChronoUnit.DAYS.between(c.getFechaVencimiento(), hoy) : 0)
                .avisoEnviado(c.getAvisoEnviado())
                .build());

        return ResponseEntity.ok(PageResponse.from(page));
    }

    @GetMapping("/morosos")
    @Operation(summary = "Reporte de morosidad agrupado por sección/grado")
    @Transactional(readOnly = true)
    public ResponseEntity<MorososResponse> morosos(@RequestParam(required = false) Long seccionId,
                                                  @RequestParam(required = false) Long gradoId) {
        List<MatriculaLocal> matriculas = seccionId != null ?
            matriculaLocalRepository.findBySeccionIdAndEstado(seccionId, "MATRICULADO") :
            matriculaLocalRepository.findAll();

        BigDecimal deudaTotal = BigDecimal.ZERO;
        List<MorososResponse.DetalleMoroso> morosos = new ArrayList<>();

        for (MatriculaLocal m : matriculas) {
            List<Cuota> vencidas = cuotaRepository.findDeudasVencidasByAlumnoId(m.getAlumnoId());
            if (!vencidas.isEmpty()) {
                BigDecimal saldoAlumno = vencidas.stream().map(Cuota::getSaldo).reduce(BigDecimal.ZERO, BigDecimal::add);
                deudaTotal = deudaTotal.add(saldoAlumno);
                morosos.add(MorososResponse.DetalleMoroso.builder()
                    .alumnoId(m.getAlumnoId())
                    .alumnoNombre(m.getAlumnoNombre())
                    .matriculaId(m.getMatriculaId())
                    .responsableNombre(m.getResponsableNombre())
                    .saldoTotalVencido(saldoAlumno)
                    .cuotasVencidas(vencidas.size())
                    .build());
            }
        }

        return ResponseEntity.ok(MorososResponse.builder()
            .seccionId(seccionId)
            .gradoId(gradoId)
            .totalAlumnosMorosos((long) morosos.size())
            .totalDeudaAcumulada(deudaTotal)
            .listaMorosos(morosos)
            .build());
    }

    @GetMapping("/reportes/cobranza")
    @Operation(summary = "Reporte de recaudación y cobranza por periodo y medio de pago")
    public ResponseEntity<PageResponse<PagoResponse>> reporteCobranza(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime desde,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime hasta,
            @RequestParam(required = false) String medio,
            Pageable pageable) {
        return ResponseEntity.ok(pagoService.listarCobranza(desde, hasta, medio, pageable));
    }

    @GetMapping("/mias/cuotas")
    @Operation(summary = "Consultar cuotas de los hijos del apoderado autenticado")
    @Transactional(readOnly = true)
    public ResponseEntity<List<CuotaResponse>> misCuotas(@AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = pe.edu.upeu.eduspace.pago.security.UsuarioActual.id(jwt);
        List<AlumnoContactoResponse.HijoResumen> hijos = alumnosGateway.hijos(usuarioId);

        List<CuotaResponse> resultado = new ArrayList<>();
        LocalDate hoy = LocalDate.now();

        for (AlumnoContactoResponse.HijoResumen hijo : hijos) {
            List<Cuota> cuotas = cuotaRepository.findByAlumnoIdOrderByFechaVencimientoAsc(hijo.getAlumnoId());
            for (Cuota c : cuotas) {
                resultado.add(CuotaResponse.builder()
                    .id(c.getId())
                    .matriculaId(c.getMatricula() != null ? c.getMatricula().getMatriculaId() : null)
                    .alumnoId(c.getAlumnoId())
                    .anioId(c.getAnioId())
                    .conceptoId(c.getConcepto().getId())
                    .conceptoNombre(c.getConcepto().getNombre())
                    .conceptoTipo(c.getConcepto().getTipo())
                    .descripcion(c.getDescripcion())
                    .numeroCuota(c.getNumeroCuota())
                    .montoBase(c.getMontoBase())
                    .descuento(c.getDescuento())
                    .mora(c.getMora())
                    .montoTotal(c.getMontoTotal())
                    .saldo(c.getSaldo())
                    .fechaVencimiento(c.getFechaVencimiento())
                    .estado(c.getEstado())
                    .diasAtraso(c.getFechaVencimiento().isBefore(hoy) ? ChronoUnit.DAYS.between(c.getFechaVencimiento(), hoy) : 0)
                    .avisoEnviado(c.getAvisoEnviado())
                    .build());
            }
        }
        return ResponseEntity.ok(resultado);
    }
}
```

---

<a id="89-planpagocontrollerjava"></a>
## 89. `PlanPagoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/PlanPagoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `PlanPago`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;
import pe.edu.upeu.eduspace.pago.util.PlanPago;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

/** Las formas de pago de las pensiones que se acuerdan al matricular, con su descuento (la configuración manda; la pantalla solo la muestra). */
@RestController
@RequestMapping("/api/v1/pagos/planes-pago")
@RequiredArgsConstructor
@Tag(name = "Formas de pago", description = "Mensual, bimestral, semestral y anual, con el descuento de cada una")
public class PlanPagoController {

    private final PagoProperties props;

    /** {@code mesesPorCuota} es cuántos meses cubre cada cuota (para una tarifa de 10 meses: 1, 2, 5 y 10). */
    public record Opcion(String id, String etiqueta, BigDecimal descuentoPorcentaje, int cuotasEnDiezMeses) {}

    @GetMapping
    @Operation(summary = "Formas de pago de la pensión con su descuento (cualquier usuario con sesión del portal)")
    public List<Opcion> planes() {
        return Arrays.stream(PlanPago.values())
            .map(p -> new Opcion(p.name(), p.etiqueta(), descuento(p), p.mesesPorCuota(10).length))
            .toList();
    }

    private BigDecimal descuento(PlanPago p) {
        return switch (p) {
            case SEMESTRAL -> props.getDescuentoPlanSemestral();
            case ANUAL -> props.getDescuentoPlanAnual();
            default -> BigDecimal.ZERO;
        };
    }
}
```

---

<a id="90-solicituddescuentocontrollerjava"></a>
## 90. `SolicitudDescuentoController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/SolicitudDescuentoController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `SolicitudDescuento`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.AnularPagoRequest;
import pe.edu.upeu.eduspace.pago.security.UsuarioActual;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService.Opcion;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService.Pedido;
import pe.edu.upeu.eduspace.pago.service.SolicitudDescuentoService.Vista;

import java.util.List;
import java.util.Map;
import java.util.Set;

/** Solicitud de descuento de la matrícula: la pide la familia (o la secretaría) y la prueba la secretaría. */
@RestController
@RequestMapping("/api/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Solicitudes de descuento", description = "Pedir un descuento para la matrícula y que la secretaría lo apruebe o rechace")
public class SolicitudDescuentoController {

    private static final Set<String> PERSONAL = Set.of("ROLE_ADMIN", "ROLE_SECRETARIA", "ROLE_CAJERO");

    private final SolicitudDescuentoService servicio;

    @GetMapping("/solicitudes-descuento/opciones")
    @Operation(summary = "Descuentos que se pueden pedir para la matrícula (APODERADO, CAJERO, SECRETARIA, ADMIN)")
    public List<Opcion> opciones() {
        return servicio.opciones();
    }

    @PostMapping("/alumnos/{alumnoId}/matricula/descuento")
    @Operation(summary = "Pide un descuento para la matrícula del alumno; queda en revisión hasta que la secretaría responda")
    public ResponseEntity<Vista> solicitar(@PathVariable Long alumnoId, @RequestBody Pedido pedido, @AuthenticationPrincipal Jwt jwt, Authentication auth) {
        boolean personal = auth != null && auth.getAuthorities().stream().anyMatch(a -> PERSONAL.contains(a.getAuthority()));
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.solicitar(alumnoId, pedido, UsuarioActual.id(jwt), personal));
    }

    @GetMapping("/solicitudes-descuento")
    @Operation(summary = "Solicitudes de descuento en revisión (SECRETARIA, ADMIN)")
    public List<Vista> pendientes() {
        return servicio.pendientes();
    }

    @GetMapping("/solicitudes-descuento/conteo")
    @Operation(summary = "Cuántas solicitudes esperan respuesta (SECRETARIA, ADMIN)")
    public Map<String, Long> conteo() {
        return Map.of("pendientes", servicio.contarPendientes());
    }

    @PostMapping("/solicitudes-descuento/{id}/aprobar")
    @Operation(summary = "Aprueba: asigna el descuento al alumno y recalcula la cuota de matrícula (SECRETARIA, ADMIN)")
    public Vista aprobar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return servicio.aprobar(id, UsuarioActual.id(jwt));
    }

    @PostMapping("/solicitudes-descuento/{id}/rechazar")
    @Operation(summary = "Rechaza con un motivo que la familia verá (SECRETARIA, ADMIN)")
    public Vista rechazar(@PathVariable Long id, @Valid @RequestBody AnularPagoRequest req, @AuthenticationPrincipal Jwt jwt) {
        return servicio.rechazar(id, req.getMotivo(), UsuarioActual.id(jwt));
    }
}
```

---

<a id="91-tarifacontrollerjava"></a>
## 91. `TarifaController.java` — Controladores REST API

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/controller/TarifaController.java`

### **¿Qué hace esta clase?**
Controlador REST que expone las rutas HTTP correspondientes a `Tarifa`.

```java
package pe.edu.upeu.eduspace.pago.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.pago.dto.TarifaRequest;
import pe.edu.upeu.eduspace.pago.dto.TarifaResponse;
import pe.edu.upeu.eduspace.pago.service.TarifaService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos/tarifas")
@RequiredArgsConstructor
@Tag(name = "Tarifas", description = "Gestión de tarifas por nivel, grado y año")
public class TarifaController {

    private final TarifaService tarifaService;

    @GetMapping
    @Operation(summary = "Listar tarifas activas por año")
    public ResponseEntity<List<TarifaResponse>> listarPorAnio(@RequestParam Long anioId) {
        return ResponseEntity.ok(tarifaService.listarPorAnio(anioId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener tarifa por ID")
    public ResponseEntity<TarifaResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(tarifaService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear nueva tarifa (ADMIN)")
    public ResponseEntity<TarifaResponse> crear(@Valid @RequestBody TarifaRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tarifaService.crear(req));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar/desactivar tarifa (ADMIN)")
    public ResponseEntity<TarifaResponse> actualizar(@PathVariable Long id, @Valid @RequestBody TarifaRequest req) {
        return ResponseEntity.ok(tarifaService.actualizar(id, req));
    }
}
```

---

<a id="92-matriculaeventconsumerjava"></a>
## 92. `MatriculaEventConsumer.java` — Mensajería Kafka (Consumers / Publishers)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/messaging/MatriculaEventConsumer.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Kafka que escucha el topic `matricula.creada` emitido por el microservicio de matrícula. Al recibir una nueva matrícula, replica los datos en `matriculas_local` y dispara el `GeneradorCuotasService` para crear las cuotas de pensión y matrícula.

```java
package pe.edu.upeu.eduspace.pago.messaging;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.config.KafkaConfig;
import pe.edu.upeu.eduspace.pago.entity.EventoProcesado;
import pe.edu.upeu.eduspace.pago.event.EventoSobre;
import pe.edu.upeu.eduspace.pago.event.MatriculaEvent;
import pe.edu.upeu.eduspace.pago.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.pago.service.GeneradorCuotasService;
import pe.edu.upeu.eduspace.pago.service.MatriculaLocalService;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class MatriculaEventConsumer {

    private final EventoProcesadoRepository eventoProcesadoRepository;
    private final MatriculaLocalService matriculaLocalService;
    private final GeneradorCuotasService generadorCuotasService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = {
        KafkaConfig.TOPIC_MATRICULA_CREADA,
        KafkaConfig.TOPIC_MATRICULA_CONFIRMADA,
        KafkaConfig.TOPIC_MATRICULA_TRASLADADA,
        KafkaConfig.TOPIC_MATRICULA_RETIRADA,
        KafkaConfig.TOPIC_MATRICULA_ANULADA
    }, groupId = "pago-ms")
    @Transactional
    public void procesarEventoMatricula(String mensajeJson) {
        try {
            EventoSobre<MatriculaEvent> sobre = EventoSobre.leer(objectMapper, mensajeJson, MatriculaEvent.class);

            if (sobre.getTraceId() != null) {
                MDC.put("traceId", sobre.getTraceId());
            }

            // 1. Verificación de Idempotencia por eventId
            if (eventoProcesadoRepository.existsByEventId(sobre.getEventId())) {
                log.info("Evento ya procesado previamente: {} (tipo: {}). Descartando.", sobre.getEventId(), sobre.getEventType());
                return;
            }

            // Registrar en eventos_procesados
            eventoProcesadoRepository.save(EventoProcesado.builder()
                .eventId(sobre.getEventId())
                .eventType(sobre.getEventType())
                .procesadoEn(LocalDateTime.now())
                .build());

            MatriculaEvent event = sobre.getPayload();
            log.info("Consumiendo evento {} para matrícula {} del alumno {}", sobre.getEventType(), event.getMatriculaId(), event.getAlumnoId());

            // 2. Sincronizar en réplica local
            matriculaLocalService.sincronizarDesdeEvento(event);

            // 3. Ejecutar lógica según tópico
            switch (sobre.getEventType()) {
                case KafkaConfig.TOPIC_MATRICULA_CREADA -> generadorCuotasService.generarCuotaMatricula(event);
                case KafkaConfig.TOPIC_MATRICULA_CONFIRMADA -> generadorCuotasService.generarCuotasPension(event);
                case KafkaConfig.TOPIC_MATRICULA_RETIRADA, KafkaConfig.TOPIC_MATRICULA_ANULADA ->
                    generadorCuotasService.anularCuotasPorRetiroOAnulacion(event.getMatriculaId());
                default -> log.debug("Evento {} registrado en réplica sin acciones adicionales.", sobre.getEventType());
            }
        } catch (Exception e) {
            log.error("Error al procesar evento de matrícula en pago-ms: {}", e.getMessage(), e);
            throw new RuntimeException("Fallo al consumir evento de matrícula", e);
        } finally {
            MDC.remove("traceId");
        }
    }
}
```

---

<a id="93-outboxpublisherjava"></a>
## 93. `OutboxPublisher.java` — Mensajería Kafka (Consumers / Publishers)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/messaging/OutboxPublisher.java`

### **¿Qué hace esta clase?**
Tarea en segundo plano que sondea la tabla `outbox_eventos` con `FOR UPDATE SKIP LOCKED` y publica los eventos pendientes hacia Apache Kafka (topics: `pago.confirmado`, `pago.anulado`), marcándolos como enviados tras confirmar el ack.

```java
package pe.edu.upeu.eduspace.pago.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.entity.OutboxEvento;
import pe.edu.upeu.eduspace.pago.repository.OutboxEventoRepository;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class OutboxPublisher {

    private final OutboxEventoRepository outboxEventoRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Scheduled(fixedDelay = 2000)
    @Transactional
    public void publicarEventosPendientes() {
        List<OutboxEvento> pendientes = outboxEventoRepository.findPendientesForUpdate();
        if (pendientes.isEmpty()) {
            return;
        }

        for (OutboxEvento evento : pendientes) {
            try {
                kafkaTemplate.send(evento.getTopic(), evento.getClave(), evento.getPayload())
                    .whenComplete((result, ex) -> {
                        if (ex == null) {
                            evento.setEnviadoEn(LocalDateTime.now());
                            outboxEventoRepository.save(evento);
                            log.debug("Evento outbox {} publicado a {}", evento.getId(), evento.getTopic());
                        } else {
                            evento.setIntentos((short) (evento.getIntentos() + 1));
                            evento.setUltimoError(ex.getMessage() != null ? ex.getMessage().substring(0, Math.min(ex.getMessage().length(), 490)) : "Error desconocido");
                            outboxEventoRepository.save(evento);
                            log.error("Fallo al publicar evento outbox {}: {}", evento.getId(), ex.getMessage());
                        }
                    });
            } catch (Exception e) {
                evento.setIntentos((short) (evento.getIntentos() + 1));
                evento.setUltimoError(e.getMessage() != null ? e.getMessage().substring(0, Math.min(e.getMessage().length(), 490)) : "Error de envío");
                outboxEventoRepository.save(evento);
                log.error("Excepción inesperada al enviar evento outbox {}: {}", evento.getId(), e.getMessage());
            }
        }
    }
}
```

---

<a id="94-eventosobrejava"></a>
## 94. `EventoSobre.java` — Eventos de Dominio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/EventoSobre.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.pago.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Sobre estándar de eventos (plan §5.1): los campos de negocio van PLANOS junto a
 * eventId, eventType, occurredAt, version y traceId. {@link #escribir} y {@link #leer}
 * convierten entre este objeto y el JSON plano; leer también tolera el formato anidado antiguo.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventoSobre<T> {

    private UUID eventId;
    private String eventType;
    private LocalDateTime occurredAt;
    @Builder.Default
    private Integer version = 1;
    private String traceId;
    private T payload;

    public static <T> String escribir(ObjectMapper mapper, EventoSobre<T> sobre) {
        ObjectNode nodo = sobre.getPayload() == null ? mapper.createObjectNode() : mapper.valueToTree(sobre.getPayload());
        nodo.put("eventId", sobre.getEventId().toString());
        nodo.put("eventType", sobre.getEventType());
        nodo.put("occurredAt", sobre.getOccurredAt().toString());
        nodo.put("version", sobre.getVersion() == null ? 1 : sobre.getVersion());
        nodo.put("traceId", sobre.getTraceId());
        return mapper.writeValueAsString(nodo);
    }

    public static <T> EventoSobre<T> leer(ObjectMapper mapper, String json, Class<T> tipo) {
        JsonNode raiz = mapper.readTree(json);
        JsonNode datos = raiz.has("payload") && raiz.get("payload").isObject() ? raiz.get("payload") : raiz;
        return EventoSobre.<T>builder()
                .eventId(texto(raiz, "eventId") == null ? null : UUID.fromString(texto(raiz, "eventId")))
                .eventType(texto(raiz, "eventType"))
                .occurredAt(texto(raiz, "occurredAt") == null ? null : LocalDateTime.parse(texto(raiz, "occurredAt").replaceAll("(Z|[+-]\\d\\d:\\d\\d)$", "")))
                .version(raiz.has("version") ? raiz.get("version").asInt(1) : 1)
                .traceId(texto(raiz, "traceId"))
                .payload(mapper.treeToValue(datos, tipo))
                .build();
    }

    private static String texto(JsonNode n, String campo) {
        JsonNode v = n.get(campo);
        return v == null || v.isNull() ? null : v.asText();
    }
}
```

---

<a id="95-matriculaeventjava"></a>
## 95. `MatriculaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/MatriculaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.pago.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatriculaEvent {

    private Long matriculaId;
    private Long alumnoId;
    private String alumnoNombre;
    private Long anioId;
    private Long nivelId;
    private Long gradoId;
    private Long seccionId;
    private String estado;
    private String tipo;
    private Long seccionAnteriorId;
    private String motivo;
    /** Forma de pago de las pensiones acordada en la matrícula; sin dato = mensual. */
    private String planPago;
    private Long responsablePagoUsuarioId;
    private String responsablePagoNombre;
}
```

---

<a id="96-pagoanuladoeventjava"></a>
## 96. `PagoAnuladoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoAnuladoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.pago.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagoAnuladoEvent {

    private Long pagoId;
    private Long alumnoId;
    private String motivo;
    private Long matriculaId;
    private String conceptoTipo;   // MATRICULA, PENSION, OTRO
    private java.math.BigDecimal monto;
}
```

---

<a id="97-pagoconfirmadoeventjava"></a>
## 97. `PagoConfirmadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoConfirmadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.pago.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagoConfirmadoEvent {

    private Long pagoId;
    private Long alumnoId;
    private Long matriculaId;
    private List<Long> cuotaIds;
    private String conceptoTipo; // MATRICULA, PENSION, OTRO
    private BigDecimal monto;
    private String concepto;
}
```

---

<a id="98-pagoporvencereventjava"></a>
## 98. `PagoPorVencerEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoPorVencerEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.pago.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagoPorVencerEvent {

    private Long cuotaId;
    private Long alumnoId;
    private Long matriculaId;
    private String concepto;
    private BigDecimal monto;
    private BigDecimal saldo;
    private LocalDate fechaVencimiento;
}
```

---

<a id="99-pagovencidoeventjava"></a>
## 99. `PagoVencidoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/event/PagoVencidoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.pago.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagoVencidoEvent {

    private Long cuotaId;
    private Long alumnoId;
    private Long matriculaId;
    private String concepto;
    private BigDecimal monto;
    private BigDecimal saldo;
    private LocalDate fechaVencimiento;
}
```

---

<a id="100-avisopreviosjobjava"></a>
## 100. `AvisoPreviosJob.java` — Tareas Programadas (Schedulers / Jobs)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/AvisoPreviosJob.java`

### **¿Qué hace esta clase?**
Tarea en segundo plano (Scheduler) ejecutada periódicamente mediante cron para mantenimiento y procesos automáticos de `AvisoPrevios`.

```java
package pe.edu.upeu.eduspace.pago.scheduler;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.config.KafkaConfig;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.entity.OutboxEvento;
import pe.edu.upeu.eduspace.pago.event.EventoSobre;
import pe.edu.upeu.eduspace.pago.event.PagoPorVencerEvent;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import pe.edu.upeu.eduspace.pago.repository.OutboxEventoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class AvisoPreviosJob {

    private final CuotaRepository cuotaRepository;
    private final OutboxEventoRepository outboxEventoRepository;
    private final PagoProperties pagoProperties;
    private final ObjectMapper objectMapper;

    @Scheduled(cron = "0 0 6 * * *", zone = "America/Lima")
    @SchedulerLock(name = "pago_avisos_previos_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void procesarAvisosPorVencer() {
        ejecutar();
    }

    /** Separado del @Scheduled (con lock de ShedLock) para poder invocarlo directamente. */
    @Transactional
    public void ejecutar() {
        LocalDate hoy = LocalDate.now();
        LocalDate limite = hoy.plusDays(pagoProperties.getDiasAvisoPrevio());
        log.info("Iniciando job de avisos por vencer entre {} y {}", hoy, limite);

        List<Cuota> cuotas = cuotaRepository.findCuotasParaAvisoPrevio(hoy, limite);
        for (Cuota c : cuotas) {
            c.setAvisoEnviado(true);
            cuotaRepository.save(c);

            try {
                UUID eventId = UUID.randomUUID();
                PagoPorVencerEvent payload = PagoPorVencerEvent.builder()
                    .cuotaId(c.getId())
                    .alumnoId(c.getAlumnoId())
                    .matriculaId(c.getMatricula() != null ? c.getMatricula().getMatriculaId() : null)
                    .concepto(c.getDescripcion())
                    .monto(c.getMontoTotal())
                    .saldo(c.getSaldo())
                    .fechaVencimiento(c.getFechaVencimiento())
                    .build();

                EventoSobre<PagoPorVencerEvent> sobre = EventoSobre.<PagoPorVencerEvent>builder()
                    .eventId(eventId)
                    .eventType(KafkaConfig.TOPIC_PAGO_POR_VENCER)
                    .occurredAt(LocalDateTime.now())
                    .version(1)
                    .traceId(UUID.randomUUID().toString())
                    .payload(payload)
                    .build();

                OutboxEvento outbox = OutboxEvento.builder()
                    .id(eventId)
                    .aggregateType("CUOTA")
                    .aggregateId(String.valueOf(c.getId()))
                    .topic(KafkaConfig.TOPIC_PAGO_POR_VENCER)
                    .clave(String.valueOf(c.getId()))
                    .payload(EventoSobre.escribir(objectMapper, sobre))
                    .creadoEn(LocalDateTime.now())
                    .intentos((short) 0)
                    .build();

                outboxEventoRepository.save(outbox);
            } catch (Exception e) {
                log.error("Error al registrar outbox pago.por-vencer para cuota {}: {}", c.getId(), e.getMessage());
            }
        }
        log.info("Notificadas {} cuotas por vencer.", cuotas.size());
    }
}
```

---

<a id="101-creditojobjava"></a>
## 101. `CreditoJob.java` — Tareas Programadas (Schedulers / Jobs)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/CreditoJob.java`

### **¿Qué hace esta clase?**
Tarea en segundo plano (Scheduler) ejecutada periódicamente mediante cron para mantenimiento y procesos automáticos de `Credito`.

```java
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
```

---

<a id="102-limpiezajobjava"></a>
## 102. `LimpiezaJob.java` — Tareas Programadas (Schedulers / Jobs)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/LimpiezaJob.java`

### **¿Qué hace esta clase?**
Tarea en segundo plano (Scheduler) ejecutada periódicamente mediante cron para mantenimiento y procesos automáticos de `Limpieza`.

```java
package pe.edu.upeu.eduspace.pago.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.pago.repository.OutboxEventoRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class LimpiezaJob {

    private final EventoProcesadoRepository eventoProcesadoRepository;
    private final OutboxEventoRepository outboxEventoRepository;

    @Scheduled(cron = "0 0 3 * * *", zone = "America/Lima")
    @SchedulerLock(name = "pago_limpieza_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void limpiarTablasTecnicas() {
        LocalDateTime limite = LocalDateTime.now().minusDays(30);
        long eliminadosEventos = eventoProcesadoRepository.deleteByProcesadoEnBefore(limite);
        long eliminadosOutbox = outboxEventoRepository.deleteByEnviadoEnBefore(limite);
        log.info("Limpieza técnica completada: {} eventos procesados y {} outbox eliminados con más de 30 días.",
            eliminadosEventos, eliminadosOutbox);
    }
}
```

---

<a id="103-responsablejobjava"></a>
## 103. `ResponsableJob.java` — Tareas Programadas (Schedulers / Jobs)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/ResponsableJob.java`

### **¿Qué hace esta clase?**
Tarea en segundo plano (Scheduler) ejecutada periódicamente mediante cron para mantenimiento y procesos automáticos de `Responsable`.

```java
package pe.edu.upeu.eduspace.pago.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.client.AlumnoContactoResponse;
import pe.edu.upeu.eduspace.pago.client.AlumnosGateway;
import pe.edu.upeu.eduspace.pago.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.pago.repository.MatriculaLocalRepository;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResponsableJob {

    private final MatriculaLocalRepository matriculaLocalRepository;
    private final AlumnosGateway alumnosGateway;

    @Scheduled(cron = "0 0 2 * * *", zone = "America/Lima")
    @SchedulerLock(name = "pago_responsable_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void completarResponsablesFaltantes() {
        List<MatriculaLocal> sinResponsable = matriculaLocalRepository.findAll().stream()
            .filter(m -> m.getResponsableUsuarioId() == null)
            .toList();

        for (MatriculaLocal m : sinResponsable) {
            try {
                AlumnoContactoResponse resp = alumnosGateway.responsablePago(m.getAlumnoId());
                if (resp != null && resp.getUsuarioId() != null) {
                    m.setResponsableUsuarioId(resp.getUsuarioId());
                    m.setResponsableNombre(resp.getNombre());
                    matriculaLocalRepository.save(m);
                    log.info("Completado responsable para alumno {}: {}", m.getAlumnoId(), resp.getNombre());
                }
            } catch (Exception e) {
                log.warn("No se pudo obtener responsable para alumno {}: {}", m.getAlumnoId(), e.getMessage());
            }
        }
    }
}
```

---

<a id="104-vencimientojobjava"></a>
## 104. `VencimientoJob.java` — Tareas Programadas (Schedulers / Jobs)

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/scheduler/VencimientoJob.java`

### **¿Qué hace esta clase?**
Tarea en segundo plano (Scheduler) ejecutada periódicamente mediante cron para mantenimiento y procesos automáticos de `Vencimiento`.

```java
package pe.edu.upeu.eduspace.pago.scheduler;

import tools.jackson.databind.ObjectMapper;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.pago.config.KafkaConfig;
import pe.edu.upeu.eduspace.pago.entity.Cuota;
import pe.edu.upeu.eduspace.pago.entity.OutboxEvento;
import pe.edu.upeu.eduspace.pago.event.EventoSobre;
import pe.edu.upeu.eduspace.pago.event.PagoVencidoEvent;
import pe.edu.upeu.eduspace.pago.repository.CuotaRepository;
import pe.edu.upeu.eduspace.pago.repository.OutboxEventoRepository;
import pe.edu.upeu.eduspace.pago.service.MoraService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class VencimientoJob {

    private final CuotaRepository cuotaRepository;
    private final MoraService moraService;
    private final OutboxEventoRepository outboxEventoRepository;
    private final ObjectMapper objectMapper;

    @Scheduled(cron = "0 30 0 * * *", zone = "America/Lima")
    @SchedulerLock(name = "pago_vencimiento_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void procesarCuotasVencidas() {
        ejecutar();
    }

    /** Separado del @Scheduled (que toma el lock de ShedLock) para poder invocarlo directamente en pruebas y operaciones. */
    @Transactional
    public void ejecutar() {
        LocalDate hoy = LocalDate.now();
        log.info("Iniciando job diario de cuotas vencidas y mora a fecha: {}", hoy);

        List<Cuota> cuotasVencidas = cuotaRepository.findCuotasPorVencerVencidasSinMarcar(hoy);
        for (Cuota c : cuotasVencidas) {
            c.setEstado("VENCIDA");
            moraService.aplicarMora(c, hoy);
            cuotaRepository.save(c);

            // Publicar evento en outbox pago.vencido
            try {
                UUID eventId = UUID.randomUUID();
                PagoVencidoEvent payload = PagoVencidoEvent.builder()
                    .cuotaId(c.getId())
                    .alumnoId(c.getAlumnoId())
                    .matriculaId(c.getMatricula() != null ? c.getMatricula().getMatriculaId() : null)
                    .concepto(c.getDescripcion())
                    .monto(c.getMontoTotal())
                    .saldo(c.getSaldo())
                    .fechaVencimiento(c.getFechaVencimiento())
                    .build();

                EventoSobre<PagoVencidoEvent> sobre = EventoSobre.<PagoVencidoEvent>builder()
                    .eventId(eventId)
                    .eventType(KafkaConfig.TOPIC_PAGO_VENCIDO)
                    .occurredAt(LocalDateTime.now())
                    .version(1)
                    .traceId(UUID.randomUUID().toString())
                    .payload(payload)
                    .build();

                OutboxEvento outbox = OutboxEvento.builder()
                    .id(eventId)
                    .aggregateType("CUOTA")
                    .aggregateId(String.valueOf(c.getId()))
                    .topic(KafkaConfig.TOPIC_PAGO_VENCIDO)
                    .clave(String.valueOf(c.getId()))
                    .payload(EventoSobre.escribir(objectMapper, sobre))
                    .creadoEn(LocalDateTime.now())
                    .intentos((short) 0)
                    .build();

                outboxEventoRepository.save(outbox);
            } catch (Exception e) {
                log.error("Error al registrar outbox para cuota vencida {}: {}", c.getId(), e.getMessage());
            }
        }
        // La mora sigue corriendo cada día sobre las cuotas que ya estaban VENCIDAS (sin repetir el evento)
        List<Cuota> yaVencidas = cuotaRepository.findByEstado("VENCIDA");
        for (Cuota c : yaVencidas) {
            if (!cuotasVencidas.contains(c)) moraService.aplicarMora(c, hoy);
        }
        log.info("Procesadas {} cuotas recién vencidas y {} mora(s) diarias.", cuotasVencidas.size(), yaVencidas.size());
    }
}
```

---

<a id="105-cacheconfigjava"></a>
## 105. `CacheConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/CacheConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Cache`.

```java
package pe.edu.upeu.eduspace.pago.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    public static final String CACHE_RESPONSABLE_PAGO = "responsablePagoCache";
    public static final String CACHE_HIJOS_APODERADO = "hijosApoderadoCache";

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(CACHE_RESPONSABLE_PAGO, CACHE_HIJOS_APODERADO);
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .expireAfterWrite(5, TimeUnit.MINUTES)
            .maximumSize(1000));
        return cacheManager;
    }
}
```

---

<a id="106-feignconfigjava"></a>
## 106. `FeignConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/FeignConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Feign`.

```java
package pe.edu.upeu.eduspace.pago.config;

import feign.RequestInterceptor;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor feignRequestInterceptor(@Value("${eduspace.service-token:}") String serviceToken) {
        return template -> {
            if (serviceToken != null && !serviceToken.isBlank() && template.path().contains("/internal/")) {
                template.header("X-Service-Token", serviceToken);
            }
            String traceId = MDC.get("traceId");
            if (traceId != null) {
                template.header("X-Trace-ID", traceId);
            }

            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                String authHeader = attributes.getRequest().getHeader("Authorization");
                if (authHeader != null && !authHeader.isBlank()) {
                    template.header("Authorization", authHeader);
                }
            }
        };
    }
}
```

---

<a id="107-kafkaconfigjava"></a>
## 107. `KafkaConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/KafkaConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Kafka`.

```java
package pe.edu.upeu.eduspace.pago.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class KafkaConfig {

    public static final String TOPIC_PAGO_CONFIRMADO = "pago.confirmado";
    public static final String TOPIC_PAGO_POR_VENCER = "pago.por-vencer";
    public static final String TOPIC_PAGO_VENCIDO = "pago.vencido";
    public static final String TOPIC_PAGO_ANULADO = "pago.anulado";

    public static final String TOPIC_MATRICULA_CREADA = "matricula.creada";
    public static final String TOPIC_MATRICULA_CONFIRMADA = "matricula.confirmada";
    public static final String TOPIC_MATRICULA_TRASLADADA = "matricula.trasladada";
    public static final String TOPIC_MATRICULA_RETIRADA = "matricula.retirada";
    public static final String TOPIC_MATRICULA_ANULADA = "matricula.anulada";

    @Bean
    public NewTopic pagoConfirmadoTopic() {
        return TopicBuilder.name(TOPIC_PAGO_CONFIRMADO).partitions(3).replicas(1).build();
    }

    @Bean
    public NewTopic pagoPorVencerTopic() {
        return TopicBuilder.name(TOPIC_PAGO_POR_VENCER).partitions(3).replicas(1).build();
    }

    @Bean
    public NewTopic pagoVencidoTopic() {
        return TopicBuilder.name(TOPIC_PAGO_VENCIDO).partitions(3).replicas(1).build();
    }

    @Bean
    public NewTopic pagoAnuladoTopic() {
        return TopicBuilder.name(TOPIC_PAGO_ANULADO).partitions(3).replicas(1).build();
    }
}
```

---

<a id="108-kafkaerrorhandlingconfigjava"></a>
## 108. `KafkaErrorHandlingConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/KafkaErrorHandlingConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `KafkaErrorHandling`.

```java
package pe.edu.upeu.eduspace.pago.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.TopicPartition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.CommonErrorHandler;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.util.backoff.FixedBackOff;

import java.util.Arrays;

/**
 * Un fallo de procesamiento se reintenta un número acotado de veces; si persiste, el mensaje se envía a
 * {@code <tópico>.DLT} (dead-letter) y se avanza para no bloquear la partición. Un mensaje ilegible
 * (ErrorHandlingDeserializer) va directo al DLT. Spring Boot aplica este {@link CommonErrorHandler} a los listeners.
 */
@Configuration
public class KafkaErrorHandlingConfig {

    private static final Logger log = LoggerFactory.getLogger(KafkaErrorHandlingConfig.class);

    private static final String SUFIJO_DLT = ".DLT";
    private static final String[] TOPICOS_CONSUMIDOS = {"matricula.creada", "matricula.confirmada", "matricula.trasladada", "matricula.retirada", "matricula.anulada"};

    /** Un {@code .DLT} por cada tópico consumido: el broker no crea tópicos solo. */
    @Bean
    KafkaAdmin.NewTopics deadLetterTopics() {
        return new KafkaAdmin.NewTopics(Arrays.stream(TOPICOS_CONSUMIDOS)
                .map(t -> new NewTopic(t + SUFIJO_DLT, 1, (short) 1))
                .toArray(NewTopic[]::new));
    }

    @Bean
    CommonErrorHandler kafkaErrorHandler(KafkaTemplate<String, String> kafkaTemplate) {
        var recoverer = new DeadLetterPublishingRecoverer(kafkaTemplate,
                (record, ex) -> new TopicPartition(record.topic() + SUFIJO_DLT, -1));
        return new DefaultErrorHandler((record, ex) -> {
            log.error("component=KafkaListener topic={} key={} status=DLT tras reintentos cause={}",
                    record.topic(), record.key(), ex.getMessage());
            recoverer.accept(record, ex);
        }, new FixedBackOff(1000L, 2L));
    }
}
```

---

<a id="109-minioconfigjava"></a>
## 109. `MinioConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/MinioConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Minio`.

```java
package pe.edu.upeu.eduspace.pago.config;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class MinioConfig {

    @Value("${app.minio.endpoint:http://localhost:19000}")
    private String endpoint;

    @Value("${app.minio.access-key:minioadmin}")
    private String accessKey;

    @Value("${app.minio.secret-key:minioadmin}")
    private String secretKey;

    @Value("${app.minio.bucket-comprobantes:comprobantes}")
    private String bucketComprobantes;

    @Bean
    public MinioClient minioClient() {
        MinioClient client = MinioClient.builder()
            .endpoint(endpoint)
            .credentials(accessKey, secretKey)
            .build();

        try {
            boolean exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucketComprobantes).build());
            if (!exists) {
                client.makeBucket(MakeBucketArgs.builder().bucket(bucketComprobantes).build());
                log.info("Bucket creado en MinIO: {}", bucketComprobantes);
            }
        } catch (Exception e) {
            log.warn("No se pudo verificar/crear el bucket {} en MinIO (puede ser creado externamente): {}", bucketComprobantes, e.getMessage());
        }

        return client;
    }
}
```

---

<a id="110-openapiconfigjava"></a>
## 110. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `OpenApi`.

```java
package pe.edu.upeu.eduspace.pago.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
            .info(new Info()
                .title("EduSpace - Pago Microservice API")
                .version("1.0.0")
                .description("API de tarifas, conceptos, cuotas, pagos, caja y comprobantes."))
            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(new Components()
                .addSecuritySchemes(securitySchemeName,
                    new SecurityScheme()
                        .name(securitySchemeName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

---

<a id="111-pagopropertiesjava"></a>
## 111. `PagoProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/PagoProperties.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PagoProperties` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.math.BigDecimal;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.pago")
public class PagoProperties {

    private BigDecimal moraPorcentajeMensual = new BigDecimal("2.00");
    private String moraBase = "SALDO";
    private int diasAvisoPrevio = 3;
    private int diasVigenciaPrematricula = 7;
    private int margenGraciaDias = 0;
    /** Descuento (%) sobre la pensión cuando se elige pagar por semestre. */
    private BigDecimal descuentoPlanSemestral = new BigDecimal("5");
    /** Descuento (%) sobre la pensión cuando se elige pagar el año completo. */
    private BigDecimal descuentoPlanAnual = new BigDecimal("10");
    /** Minutos que vive una orden de pago antes de expirar. */
    private int minutosVigenciaOrden = 30;
    /** Secreto compartido con la pasarela para firmar sus avisos (en producción viene de una variable de entorno). */
    private String pasarelaSecreto = "dev-secreto-pasarela-simulada";
}
```

---

<a id="112-securityconfigjava"></a>
## 112. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Security`.

```java
package pe.edu.upeu.eduspace.pago.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.*;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/internal/**").permitAll()
                .requestMatchers("/api/v1/pagos/alertas/**").hasAnyRole("ADMIN", "SECRETARIA")
                
                // Reparto del dinero de caja entre áreas: solo el administrador, también para leer
                .requestMatchers("/api/v1/pagos/fondo/**").hasRole("ADMIN")

                // Endpoints de caja
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/caja/abrir", "/api/v1/pagos/caja/cerrar").hasRole("CAJERO")
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/caja/actual").hasRole("CAJERO")
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/caja/*/reporte").hasAnyRole("CAJERO", "ADMIN")
                
                // Catálogos: conceptos, tarifas, descuentos
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/conceptos/**", "/api/v1/pagos/tarifas/**", "/api/v1/pagos/descuentos/**").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/conceptos/**", "/api/v1/pagos/tarifas/**", "/api/v1/pagos/descuentos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/pagos/conceptos/**", "/api/v1/pagos/tarifas/**", "/api/v1/pagos/descuentos/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/pagos/descuentos/asignar").hasRole("ADMIN")

                // Crédito del alumno: lo ven caja, secretaría y administración; depositan y cobran caja y administración; anular es del administrador
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/alumnos/*/credito").hasAnyRole("CAJERO", "SECRETARIA", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/alumnos/*/credito/depositos", "/api/v1/pagos/alumnos/*/credito/cobrar").hasAnyRole("CAJERO", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/creditos/movimientos/*/anular").hasRole("ADMIN")

                // Pagos
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/online").hasRole("APODERADO")
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos").hasAnyRole("CAJERO", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/v1/pagos/*/anular").hasRole("ADMIN")
                // Pago de la matrícula (orden + pasarela simulada + generar con el crédito). El apoderado solo con sus hijos (lo valida el servicio).
                .requestMatchers("/api/v1/pagos/alumnos/*/matricula", "/api/v1/pagos/alumnos/*/matricula/**").hasAnyRole("APODERADO", "CAJERO", "SECRETARIA", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/pasarela/ordenes/*/pagar").hasAnyRole("APODERADO", "CAJERO", "SECRETARIA", "ADMIN")
                // Solicitudes de descuento de la matrícula: las opciones las ve quien pide; responder es solo de secretaría y administración
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/solicitudes-descuento/opciones").hasAnyRole("APODERADO", "CAJERO", "SECRETARIA", "ADMIN")
                .requestMatchers("/api/v1/pagos/solicitudes-descuento", "/api/v1/pagos/solicitudes-descuento/**").hasAnyRole("SECRETARIA", "ADMIN")
                // El aviso de la pasarela no lleva sesión: lo protege la firma HMAC del cuerpo
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/pasarela/notificacion").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/matriculas/por-pagar").hasAnyRole("CAJERO", "SECRETARIA", "ADMIN")
                // Pagos de apoderados por aprobar: los aprueba o rechaza caja (o el administrador)
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/por-aprobar", "/api/v1/pagos/por-aprobar/conteo").hasAnyRole("CAJERO", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/pagos/*/aprobar", "/api/v1/pagos/*/rechazar").hasAnyRole("CAJERO", "ADMIN")
                
                // Consultas y reportes
                // Caja también ve morosos y cobranza (solo lectura) para atender en ventanilla
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/morosos/**", "/api/v1/pagos/morosos", "/api/v1/pagos/reportes/**").hasAnyRole("ADMIN", "SECRETARIA", "CAJERO")
                .requestMatchers("/api/v1/pagos/morosos/**", "/api/v1/pagos/reportes/**").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers("/api/v1/pagos/mias/**").hasRole("APODERADO")
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/alumnos/*/descuentos").hasAnyRole("CAJERO", "SECRETARIA", "ADMIN")
                .requestMatchers("/api/v1/pagos/alumnos/*/estado-cuenta").hasAnyRole("CAJERO", "SECRETARIA", "ADMIN", "APODERADO", "ALUMNO")
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/*/comprobante").hasAnyRole("CAJERO", "ADMIN", "APODERADO", "ALUMNO", "SECRETARIA")
                .requestMatchers(HttpMethod.GET, "/api/v1/pagos/**").hasAnyRole("CAJERO", "SECRETARIA", "ADMIN", "APODERADO")

                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
            );

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new JwtRoleConverter());
        return converter;
    }

    public static class JwtRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
        @Override
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            Set<GrantedAuthority> authorities = new HashSet<>();

            // 1. Check realm_access.roles
            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            if (realmAccess != null && realmAccess.get("roles") instanceof List<?> roles) {
                for (Object role : roles) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toString().toUpperCase()));
                }
            }

            // 2. Check direct roles claim
            List<String> directRoles = jwt.getClaimAsStringList("roles");
            if (directRoles != null) {
                for (String role : directRoles) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
                }
            }

            return authorities;
        }
    }
}
```

---

<a id="113-shedlockconfigjava"></a>
## 113. `ShedLockConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/config/ShedLockConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `ShedLock`.

```java
package pe.edu.upeu.eduspace.pago.config;

import net.javacrumbs.shedlock.core.LockProvider;
import net.javacrumbs.shedlock.provider.jdbctemplate.JdbcTemplateLockProvider;
import net.javacrumbs.shedlock.spring.annotation.EnableSchedulerLock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@EnableSchedulerLock(defaultLockAtMostFor = "10m")
public class ShedLockConfig {

    @Bean
    public LockProvider lockProvider(DataSource dataSource) {
        return new JdbcTemplateLockProvider(
            JdbcTemplateLockProvider.Configuration.builder()
                .withJdbcTemplate(new org.springframework.jdbc.core.JdbcTemplate(dataSource))
                .usingDbTime()
                .build()
        );
    }
}
```

---

<a id="114-businessruleexceptionjava"></a>
## 114. `BusinessRuleException.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción de dominio para manejar errores controlados en el microservicio.

```java
package pe.edu.upeu.eduspace.pago.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class BusinessRuleException extends RuntimeException {
    public BusinessRuleException(String message) {
        super(message);
    }
}
```

---

<a id="115-errorresponsejava"></a>
## 115. `ErrorResponse.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Error`.

```java
package pe.edu.upeu.eduspace.pago.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private int codigo;
    private String mensaje;
    private String ruta;
    private String traceId;
    private LocalDateTime fecha;
    private List<String> detalles;
}
```

---

<a id="116-globalexceptionhandlerjava"></a>
## 116. `GlobalExceptionHandler.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción de dominio para manejar errores controlados en el microservicio.

```java
package pe.edu.upeu.eduspace.pago.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.MDC;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private String getTraceId() {
        String traceId = MDC.get("traceId");
        return traceId != null ? traceId : "";
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.builder()
            .codigo(HttpStatus.NOT_FOUND.value())
            .mensaje(ex.getMessage())
            .ruta(request.getRequestURI())
            .traceId(getTraceId())
            .fecha(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ErrorResponse> handleBusinessRule(BusinessRuleException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.builder()
            .codigo(HttpStatus.CONFLICT.value())
            .mensaje(ex.getMessage())
            .ruta(request.getRequestURI())
            .traceId(getTraceId())
            .fecha(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ResponseEntity<ErrorResponse> handleOptimisticLock(OptimisticLockingFailureException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.builder()
            .codigo(HttpStatus.CONFLICT.value())
            .mensaje("Conflicto de concurrencia: el registro fue modificado por otra operación simultánea.")
            .ruta(request.getRequestURI())
            .traceId(getTraceId())
            .fecha(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<String> detalles = ex.getBindingResult().getFieldErrors().stream()
            .map(FieldError::getDefaultMessage)
            .toList();

        ErrorResponse body = ErrorResponse.builder()
            .codigo(HttpStatus.BAD_REQUEST.value())
            .mensaje("Error de validación de campos de entrada")
            .ruta(request.getRequestURI())
            .traceId(getTraceId())
            .fecha(LocalDateTime.now())
            .detalles(detalles)
            .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.builder()
            .codigo(HttpStatus.FORBIDDEN.value())
            .mensaje("No tiene permisos para ejecutar esta acción.")
            .ruta(request.getRequestURI())
            .traceId(getTraceId())
            .fecha(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(body);
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleIntegridad(org.springframework.dao.DataIntegrityViolationException ex, HttpServletRequest request) {
        return build(HttpStatus.CONFLICT, "La operación viola una restricción de datos (registro duplicado o fuera de rango).", request);
    }

    @ExceptionHandler({org.springframework.http.converter.HttpMessageNotReadableException.class,
        org.springframework.web.method.annotation.MethodArgumentTypeMismatchException.class,
        org.springframework.web.bind.MissingServletRequestParameterException.class,
        jakarta.validation.ConstraintViolationException.class})
    public ResponseEntity<ErrorResponse> handleSolicitudInvalida(Exception ex, HttpServletRequest request) {
        return build(HttpStatus.BAD_REQUEST, "Solicitud inválida: " + ex.getMessage(), request);
    }

    @ExceptionHandler(org.springframework.web.server.ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleStatus(org.springframework.web.server.ResponseStatusException ex, HttpServletRequest request) {
        return build(HttpStatus.valueOf(ex.getStatusCode().value()), ex.getReason() != null ? ex.getReason() : ex.getMessage(), request);
    }

    @ExceptionHandler({org.springframework.web.HttpRequestMethodNotSupportedException.class})
    public ResponseEntity<ErrorResponse> handleMetodo(Exception ex, HttpServletRequest request) {
        return build(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage(), request);
    }

    @ExceptionHandler(org.springframework.web.servlet.resource.NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleSinRecurso(Exception ex, HttpServletRequest request) {
        return build(HttpStatus.NOT_FOUND, "Recurso no encontrado.", request);
    }

    private ResponseEntity<ErrorResponse> build(HttpStatus status, String mensaje, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.builder()
            .codigo(status.value())
            .mensaje(mensaje)
            .ruta(request.getRequestURI())
            .traceId(getTraceId())
            .fecha(LocalDateTime.now())
            .build();
        return ResponseEntity.status(status).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.builder()
            .codigo(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .mensaje("Error interno del servidor: " + ex.getMessage())
            .ruta(request.getRequestURI())
            .traceId(getTraceId())
            .fecha(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
```

---

<a id="117-resourcenotfoundexceptionjava"></a>
## 117. `ResourceNotFoundException.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción de dominio para manejar errores controlados en el microservicio.

```java
package pe.edu.upeu.eduspace.pago.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

---

<a id="118-alumnocontactoresponsejava"></a>
## 118. `AlumnoContactoResponse.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/AlumnoContactoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `AlumnoContacto`.

```java
package pe.edu.upeu.eduspace.pago.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Espejo del contrato interno de alumnos-ms: GET /internal/alumnos/{id}/responsable-pago. */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoContactoResponse {

    private Long apoderadoId;
    private Long usuarioId;
    private String nombre;

    /** Espejo de HijoResponse (GET /internal/apoderados/usuario/{id}/alumnos). */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HijoResumen {
        private Long alumnoId;
        private String codigo;
        private String nombreCompleto;
        private String estado;
        private String parentesco;
    }
}
```

---

<a id="119-alumnosclientjava"></a>
## 119. `AlumnosClient.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/AlumnosClient.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `AlumnosClient` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.List;

@FeignClient(name = "alumnos-ms", fallback = AlumnosClient.AlumnosClientFallback.class)
public interface AlumnosClient {

    @GetMapping("/internal/alumnos/{id}/responsable-pago")
    AlumnoContactoResponse getResponsablePago(@PathVariable("id") Long alumnoId);

    @GetMapping("/internal/apoderados/usuario/{usuarioId}/alumnos")
    List<AlumnoContactoResponse.HijoResumen> getHijosPorUsuario(@PathVariable("usuarioId") Long usuarioId);

    @Component
    class AlumnosClientFallback implements AlumnosClient {

        @Override
        public AlumnoContactoResponse getResponsablePago(Long alumnoId) {
            // Si el servicio no responde, se crea la cuota sin responsable y se completa luego
            return null;
        }

        @Override
        public List<AlumnoContactoResponse.HijoResumen> getHijosPorUsuario(Long usuarioId) {
            return Collections.emptyList();
        }
    }
}
```

---

<a id="120-alumnosgatewayjava"></a>
## 120. `AlumnosGateway.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/AlumnosGateway.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `AlumnosGateway` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.pago.config.CacheConfig;

import java.util.Collections;
import java.util.List;

/** Acceso a alumnos-ms con circuit breaker (fallback) y caché corta; las lecturas de pago no dependen de que alumnos-ms esté arriba. */
@Slf4j
@Service
@RequiredArgsConstructor
public class AlumnosGateway {

    private final AlumnosClient alumnosClient;

    @CircuitBreaker(name = "alumnosClient", fallbackMethod = "responsableFallback")
    @Cacheable(value = CacheConfig.CACHE_RESPONSABLE_PAGO, key = "#alumnoId", unless = "#result == null")
    public AlumnoContactoResponse responsablePago(Long alumnoId) {
        return alumnosClient.getResponsablePago(alumnoId);
    }

    @CircuitBreaker(name = "alumnosClient", fallbackMethod = "hijosFallback")
    @Cacheable(value = CacheConfig.CACHE_HIJOS_APODERADO, key = "#usuarioId", unless = "#result == null || #result.isEmpty()")
    public List<AlumnoContactoResponse.HijoResumen> hijos(Long usuarioId) {
        return alumnosClient.getHijosPorUsuario(usuarioId);
    }

    AlumnoContactoResponse responsableFallback(Long alumnoId, Throwable t) {
        log.warn("alumnos-ms no disponible para responsable de {}: {}", alumnoId, t.toString());
        return null;
    }

    List<AlumnoContactoResponse.HijoResumen> hijosFallback(Long usuarioId, Throwable t) {
        log.warn("alumnos-ms no disponible para hijos de usuario {}: {}", usuarioId, t.toString());
        return Collections.emptyList();
    }
}
```

---

<a id="121-correlationidfilterjava"></a>
## 121. `CorrelationIdFilter.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `CorrelationIdFilter` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorrelationIdFilter extends OncePerRequestFilter {

    public static final String TRACE_HEADER = "X-Trace-ID";
    public static final String MDC_KEY = "traceId";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String traceId = request.getHeader(TRACE_HEADER);
        if (traceId == null || traceId.isBlank()) {
            traceId = UUID.randomUUID().toString();
        }

        MDC.put(MDC_KEY, traceId);
        response.setHeader(TRACE_HEADER, traceId);

        try {
            filterChain.doFilter(request, response);
        } finally {
            MDC.remove(MDC_KEY);
        }
    }
}
```

---

<a id="122-firmawebhookjava"></a>
## 122. `FirmaWebhook.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/FirmaWebhook.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `FirmaWebhook` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

/**
 * Firma del aviso (webhook) de la pasarela: HMAC-SHA256 del cuerpo recibido con un secreto compartido, en hexadecimal.
 * Así solo la pasarela puede confirmar una orden; el navegador no puede.
 */
public final class FirmaWebhook {

    private FirmaWebhook() {}

    public static String firmar(String secreto, String cuerpo) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secreto.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return HexFormat.of().formatHex(mac.doFinal(cuerpo.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException("No se pudo firmar el aviso", e);
        }
    }

    /** Compara en tiempo constante (sin revelar cuántos caracteres coinciden). */
    public static boolean valida(String secreto, String cuerpo, String firmaRecibida) {
        if (secreto == null || secreto.isBlank() || cuerpo == null || firmaRecibida == null) return false;
        byte[] esperada = firmar(secreto, cuerpo).getBytes(StandardCharsets.UTF_8);
        byte[] recibida = firmaRecibida.trim().toLowerCase().getBytes(StandardCharsets.UTF_8);
        return MessageDigest.isEqual(esperada, recibida);
    }
}
```

---

<a id="123-matriculaclientjava"></a>
## 123. `MatriculaClient.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/MatriculaClient.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `MatriculaClient` dentro de la arquitectura del microservicio.

```java
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
```

---

<a id="124-pasarelasimuladajava"></a>
## 124. `PasarelaSimulada.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/PasarelaSimulada.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PasarelaSimulada` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.util;

import java.time.YearMonth;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Pasarela de pago FALSA, pero con el contrato de una real: recibe los datos del pago y devuelve un resultado con el id de transacción
 * (el «número de operación»), el medio y el estado. No cobra nada y no guarda datos de tarjeta: solo la marca y los últimos 4 dígitos.
 * Casos de prueba: tarjeta que termina en 0002 y celular que termina en 00 se rechazan.
 */
public final class PasarelaSimulada {

    public static final Set<String> MEDIOS = Set.of("TARJETA", "YAPE_PLIN", "TRANSFERENCIA");
    public static final Set<String> BANCOS = Set.of("BCP", "BBVA", "INTERBANK", "SCOTIABANK", "BANCO_NACION");

    /** Lo que la persona escribe en la pantalla de pago de la pasarela. */
    public record Datos(String medio, String tarjetaNumero, String vencimiento, String cvv, String celular, String banco, String titular) {}

    /** Lo que devuelve la pasarela: aprobada o no, su id de transacción, el medio y el nombre de quien paga. */
    public record Resultado(boolean aprobada, String transaccionId, String mensaje, String medio, String pagador, String detalle) {}

    private PasarelaSimulada() {}

    public static Resultado procesar(Datos d, YearMonth hoy) {
        String medio = d == null || d.medio() == null ? "" : d.medio().trim().toUpperCase();
        if (!MEDIOS.contains(medio)) return rechazo(medio, "El medio de pago no es válido.", null);
        return switch (medio) {
            case "TARJETA" -> tarjeta(d, hoy);
            case "YAPE_PLIN" -> billetera(d);
            default -> transferencia(d);
        };
    }

    private static Resultado tarjeta(Datos d, YearMonth hoy) {
        String n = d.tarjetaNumero() == null ? "" : d.tarjetaNumero().replaceAll("[\\s-]", "");
        if (!n.matches("\\d{13,19}") || !luhn(n)) return rechazo("TARJETA", "El número de tarjeta no es válido.", null);
        if (d.cvv() == null || !d.cvv().matches("\\d{3,4}")) return rechazo("TARJETA", "El código de seguridad (CVV) no es válido.", null);
        YearMonth v = vencimiento(d.vencimiento());
        if (v == null) return rechazo("TARJETA", "El vencimiento debe tener el formato MM/AA.", null);
        if (v.isBefore(hoy)) return rechazo("TARJETA", "La tarjeta está vencida.", null);
        String detalle = marca(n) + " ****" + n.substring(n.length() - 4);
        String titular = limpio(d.titular());
        if (n.endsWith("0002")) return rechazo("TARJETA", "La tarjeta fue rechazada por el banco (tarjeta de prueba de rechazo).", detalle);
        return aprobado("TARJETA", "TC", titular, detalle);
    }

    private static Resultado billetera(Datos d) {
        String c = d.celular() == null ? "" : d.celular().replaceAll("\\s", "");
        if (!c.matches("9\\d{8}")) return rechazo("YAPE_PLIN", "El celular debe tener 9 dígitos y empezar con 9.", null);
        String detalle = "Cel. ***" + c.substring(6);
        if (c.endsWith("00")) return rechazo("YAPE_PLIN", "La billetera rechazó el pago (celular de prueba de rechazo).", detalle);
        return aprobado("YAPE_PLIN", "YP", limpio(d.titular()), detalle);
    }

    private static Resultado transferencia(Datos d) {
        String banco = d.banco() == null ? "" : d.banco().trim().toUpperCase();
        if (!BANCOS.contains(banco)) return rechazo("TRANSFERENCIA", "Elige el banco desde el que transfieres.", null);
        String titular = limpio(d.titular());
        if (titular == null) return rechazo("TRANSFERENCIA", "Indica el titular de la cuenta.", banco);
        return aprobado("TRANSFERENCIA", "TR", titular, banco);
    }

    private static Resultado aprobado(String medio, String prefijo, String pagador, String detalle) {
        return new Resultado(true, idTransaccion(prefijo), "Pago aprobado.", medio, pagador, detalle);
    }

    private static Resultado rechazo(String medio, String mensaje, String detalle) {
        return new Resultado(false, null, mensaje, medio, null, detalle);
    }

    /** «TR-» y diez dígitos, como un número de operación. */
    static String idTransaccion(String prefijo) {
        long n = ThreadLocalRandom.current().nextLong(1_000_000_000L, 10_000_000_000L);
        return prefijo + "-" + n;
    }

    static boolean luhn(String n) {
        int suma = 0;
        boolean doble = false;
        for (int i = n.length() - 1; i >= 0; i--) {
            int d = n.charAt(i) - '0';
            if (doble) {
                d *= 2;
                if (d > 9) d -= 9;
            }
            suma += d;
            doble = !doble;
        }
        return suma % 10 == 0;
    }

    static String marca(String n) {
        return n.startsWith("4") ? "VISA" : n.matches("^5[1-5].*") ? "MASTERCARD" : n.matches("^3[47].*") ? "AMEX" : "TARJETA";
    }

    static YearMonth vencimiento(String v) {
        if (v == null || !v.matches("\\d{2}\\s*/\\s*\\d{2,4}")) return null;
        String[] p = v.split("\\s*/\\s*");
        int mes = Integer.parseInt(p[0]);
        int anio = Integer.parseInt(p[1]);
        if (mes < 1 || mes > 12) return null;
        return YearMonth.of(anio < 100 ? 2000 + anio : anio, mes);
    }

    private static String limpio(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }
}
```

---

<a id="125-pdftextojava"></a>
## 125. `PdfTexto.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/PdfTexto.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PdfTexto` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.util;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/** Generador mínimo de PDF de texto (Courier, A4, varias páginas) sin dependencias externas. */
public final class PdfTexto {

    private static final int LINEAS_POR_PAGINA = 60;

    private PdfTexto() {}

    public static byte[] generar(String titulo, String contenido) {
        List<String> lineas = new ArrayList<>();
        lineas.add(titulo);
        lineas.add("");
        for (String l : contenido.split("\\R", -1)) {
            lineas.add(l);
        }
        List<List<String>> paginas = new ArrayList<>();
        for (int i = 0; i < lineas.size(); i += LINEAS_POR_PAGINA) {
            paginas.add(lineas.subList(i, Math.min(i + LINEAS_POR_PAGINA, lineas.size())));
        }
        int n = paginas.size();
        // Objetos: 1 catálogo, 2 páginas, 3 fuente, luego (página, contenido) por cada página
        List<byte[]> objs = new ArrayList<>();
        objs.add(bytes("<< /Type /Catalog /Pages 2 0 R >>"));
        StringBuilder kids = new StringBuilder();
        for (int i = 0; i < n; i++) kids.append(4 + 2 * i).append(" 0 R ");
        objs.add(bytes("<< /Type /Pages /Kids [" + kids + "] /Count " + n + " >>"));
        objs.add(bytes("<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>"));
        for (int i = 0; i < n; i++) {
            objs.add(bytes("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents "
                    + (5 + 2 * i) + " 0 R >>"));
            StringBuilder s = new StringBuilder("BT /F1 10 Tf 12 TL 40 800 Td\n");
            for (String l : paginas.get(i)) {
                s.append('(').append(escapar(l)).append(") '\n");
            }
            s.append("ET");
            byte[] flujo = s.toString().getBytes(StandardCharsets.ISO_8859_1);
            ByteArrayOutputStream o = new ByteArrayOutputStream();
            o.writeBytes(bytes("<< /Length " + flujo.length + " >>\nstream\n"));
            o.writeBytes(flujo);
            o.writeBytes(bytes("\nendstream"));
            objs.add(o.toByteArray());
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        out.writeBytes(bytes("%PDF-1.4\n"));
        int[] pos = new int[objs.size()];
        for (int i = 0; i < objs.size(); i++) {
            pos[i] = out.size();
            out.writeBytes(bytes((i + 1) + " 0 obj\n"));
            out.writeBytes(objs.get(i));
            out.writeBytes(bytes("\nendobj\n"));
        }
        int xref = out.size();
        StringBuilder x = new StringBuilder("xref\n0 " + (objs.size() + 1) + "\n0000000000 65535 f \n");
        for (int p : pos) x.append(String.format("%010d 00000 n \n", p));
        x.append("trailer\n<< /Size ").append(objs.size() + 1).append(" /Root 1 0 R >>\nstartxref\n").append(xref).append("\n%%EOF\n");
        out.writeBytes(bytes(x.toString()));
        return out.toByteArray();
    }

    private static byte[] bytes(String s) {
        return s.getBytes(StandardCharsets.ISO_8859_1);
    }

    private static String escapar(String l) {
        StringBuilder sb = new StringBuilder();
        for (char c : l.toCharArray()) {
            if (c == '(' || c == ')' || c == '\\') sb.append('\\').append(c);
            else if (c > 255) sb.append('?');
            else sb.append(c);
        }
        return sb.toString();
    }
}
```

---

<a id="126-planpagojava"></a>
## 126. `PlanPago.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/util/PlanPago.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PlanPago` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

/**
 * Forma de pago de las pensiones, que se acuerda al matricular. La tarifa de pensión es el TOTAL del año repartido en «n» meses; cada plan lo
 * agrupa distinto: mensual (una cuota por mes), bimestral (una cada dos meses), semestral (dos cuotas, una por semestre) y anual (un solo pago).
 * Los planes semestral y anual llevan un descuento sobre la pensión (porcentajes en {@code app.pago}).
 */
public enum PlanPago {
    MENSUAL("Mensual"),
    BIMESTRAL("Bimestral"),
    SEMESTRAL("Semestral"),
    ANUAL("Anual");

    private final String etiqueta;

    PlanPago(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String etiqueta() {
        return etiqueta;
    }

    /** El plan de un texto; sin plan (o desconocido) es mensual, que es como se generaban las cuotas antes. */
    public static PlanPago de(String texto) {
        if (texto == null || texto.isBlank()) return MENSUAL;
        try {
            return valueOf(texto.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return MENSUAL;
        }
    }

    /** Cuántos meses cubre cada cuota, de la primera a la última, para una tarifa de «n» meses (la suma siempre es n). */
    public int[] mesesPorCuota(int n) {
        int meses = Math.max(n, 1);
        switch (this) {
            case BIMESTRAL: {
                int[] r = new int[(meses + 1) / 2];
                for (int i = 0; i < r.length; i++) r[i] = Math.min(2, meses - i * 2);
                return r;
            }
            case SEMESTRAL: {
                if (meses == 1) return new int[] { 1 };
                int primero = (meses + 1) / 2;
                return new int[] { primero, meses - primero };
            }
            case ANUAL:
                return new int[] { meses };
            default: {
                int[] r = new int[meses];
                java.util.Arrays.fill(r, 1);
                return r;
            }
        }
    }

    /**
     * Reparte el total de la pensión del año entre las cuotas del plan, en proporción a los meses que cubre cada una (redondeo a 2 decimales
     * hacia abajo y la diferencia de centavos va a la última cuota, para que la suma sea exactamente el total).
     */
    public List<BigDecimal> repartir(BigDecimal total, int n) {
        int[] meses = mesesPorCuota(n);
        int totalMeses = java.util.Arrays.stream(meses).sum();
        List<BigDecimal> montos = new ArrayList<>();
        BigDecimal acumulado = BigDecimal.ZERO;
        for (int i = 0; i < meses.length; i++) {
            BigDecimal monto = i == meses.length - 1
                ? total.subtract(acumulado)
                : total.multiply(BigDecimal.valueOf(meses[i])).divide(BigDecimal.valueOf(totalMeses), 2, RoundingMode.DOWN);
            montos.add(monto);
            acumulado = acumulado.add(monto);
        }
        return montos;
    }

    /** El descuento del plan sobre un monto: porcentaje del monto, redondeado a 2 decimales. */
    public static BigDecimal descuentoDelPlan(BigDecimal monto, BigDecimal porcentaje) {
        if (porcentaje == null || porcentaje.signum() <= 0) return BigDecimal.ZERO;
        return monto.multiply(porcentaje).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }
}
```

---

<a id="127-planificacionclientjava"></a>
## 127. `PlanificacionClient.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/client/PlanificacionClient.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PlanificacionClient` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;

@FeignClient(name = "planificacion-ms", fallback = PlanificacionClient.PlanificacionClientFallback.class)
public interface PlanificacionClient {

    /** Año académico (id, nombre, fechaInicio, fechaFin, estado). */
    @GetMapping("/internal/anios/{id}")
    AnioInterno getAnio(@PathVariable("id") Long anioId);

    record AnioInterno(Long id, String nombre, LocalDate fechaInicio, LocalDate fechaFin, String estado) {}

    /** Sección con su turno (para mostrar a Caja de qué grado y sección es la matrícula). */
    @GetMapping("/internal/secciones/{id}")
    SeccionInterna getSeccion(@PathVariable("id") Long seccionId);

    @GetMapping("/internal/grados/{id}")
    GradoInterno getGrado(@PathVariable("id") Long gradoId);

    record SeccionInterna(Long id, String nombre, Long gradoId, Long nivelId, Long anioId, Short capacidad, String turno, Long tutorDocenteId) {}

    record GradoInterno(Long id, Long nivelId, String nivelNombre, Short numero, String nombre, Boolean activo) {}

    @Component
    class PlanificacionClientFallback implements PlanificacionClient {
        @Override
        public AnioInterno getAnio(Long anioId) {
            return null;
        }

        @Override
        public SeccionInterna getSeccion(Long seccionId) {
            return null;
        }

        @Override
        public GradoInterno getGrado(Long gradoId) {
            return null;
        }
    }
}
```

---

<a id="128-servicetokenfilterjava"></a>
## 128. `ServiceTokenFilter.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/filter/ServiceTokenFilter.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `TokenFilter`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.pago.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** {@code /internal/**} solo responde a otro servicio: exige el header {@code X-Service-Token} con el token compartido. */
@Component
public class ServiceTokenFilter extends OncePerRequestFilter {

    public static final String HEADER = "X-Service-Token";

    private final byte[] esperado;

    public ServiceTokenFilter(@Value("${eduspace.service-token}") String token) {
        this.esperado = token.getBytes(StandardCharsets.UTF_8);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getRequestURI().startsWith("/internal/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String recibido = request.getHeader(HEADER);
        boolean valido = esperado.length > 0 && recibido != null
                && MessageDigest.isEqual(esperado, recibido.getBytes(StandardCharsets.UTF_8));
        if (!valido) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        chain.doFilter(request, response);
    }
}
```

---

<a id="129-usuarioactualjava"></a>
## 129. `UsuarioActual.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/security/UsuarioActual.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `UsuarioActual` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;

public final class UsuarioActual {

    private UsuarioActual() {}

    /** usuarioId del JWT de auth-ms; sin él no hay identidad (no se asume ningún valor por defecto). */
    public static Long id(Jwt jwt) {
        Object v = jwt == null ? null : jwt.getClaim("usuarioId");
        if (v instanceof Number n) return n.longValue();
        if (v instanceof String s && s.matches("\\d+")) return Long.parseLong(s);
        throw new AccessDeniedException("El token no contiene el claim usuarioId.");
    }
}
```

---

<a id="130-pagoapplicationjava"></a>
## 130. `PagoApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/PagoApplication.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PagoApplication` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.pago;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;
import pe.edu.upeu.eduspace.pago.config.PagoProperties;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties(PagoProperties.class)
public class PagoApplication {

    public static void main(String[] args) {
        SpringApplication.run(PagoApplication.class, args);
    }
}
```

---

