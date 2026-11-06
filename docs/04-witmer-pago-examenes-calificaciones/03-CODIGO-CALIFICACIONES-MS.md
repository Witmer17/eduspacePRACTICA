# 📘 CÓDIGO COMPLETO MICROSERVICIO CALIFICACIONES-MS

> **Microservicio:** `calificaciones-ms`  
> **Propósito:** Registro auxiliar de notas por curso y sección, criterios ponderados con pesos que suman 100%, autocompletado reactivo de notas de exámenes y tareas por Kafka, promedios automáticos, cierre de actas y boletines escolares.  
> **Total de clases incluidas:** 83 clases (100% completas, sin omisiones ni truncamientos).

---

## 📑 Índice de Clases del Microservicio


### Entidades JPA

- [1. Boletin.java](#1-boletinjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/Boletin.java`)
- [2. CierrePeriodo.java](#2-cierreperiodojava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/CierrePeriodo.java`)
- [3. CriterioEvaluacion.java](#3-criterioevaluacionjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/CriterioEvaluacion.java`)
- [4. EscalaLiteral.java](#4-escalaliteraljava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/EscalaLiteral.java`)
- [5. EventoProcesado.java](#5-eventoprocesadojava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/EventoProcesado.java`)
- [6. MatriculaLocal.java](#6-matriculalocaljava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/MatriculaLocal.java`)
- [7. Nota.java](#7-notajava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/Nota.java`)
- [8. NotaPendiente.java](#8-notapendientejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/NotaPendiente.java`)
- [9. ParametroEvaluacion.java](#9-parametroevaluacionjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/ParametroEvaluacion.java`)
- [10. PromedioPeriodo.java](#10-promedioperiodojava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/PromedioPeriodo.java`)
- [11. ResultadoAnual.java](#11-resultadoanualjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/ResultadoAnual.java`)

### Repositorios Spring Data JPA

- [12. BoletinRepository.java](#12-boletinrepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/BoletinRepository.java`)
- [13. CierrePeriodoRepository.java](#13-cierreperiodorepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/CierrePeriodoRepository.java`)
- [14. CriterioEvaluacionRepository.java](#14-criterioevaluacionrepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/CriterioEvaluacionRepository.java`)
- [15. EscalaLiteralRepository.java](#15-escalaliteralrepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/EscalaLiteralRepository.java`)
- [16. EventoProcesadoRepository.java](#16-eventoprocesadorepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/EventoProcesadoRepository.java`)
- [17. MatriculaLocalRepository.java](#17-matriculalocalrepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/MatriculaLocalRepository.java`)
- [18. NotaPendienteRepository.java](#18-notapendienterepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/NotaPendienteRepository.java`)
- [19. NotaRepository.java](#19-notarepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/NotaRepository.java`)
- [20. ParametroEvaluacionRepository.java](#20-parametroevaluacionrepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/ParametroEvaluacionRepository.java`)
- [21. PromedioPeriodoRepository.java](#21-promedioperiodorepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/PromedioPeriodoRepository.java`)
- [22. ResultadoAnualRepository.java](#22-resultadoanualrepositoryjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/ResultadoAnualRepository.java`)

### DTOs (Data Transfer Objects)

- [23. BoletinResponse.java](#23-boletinresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/BoletinResponse.java`)
- [24. CierrePeriodoRequest.java](#24-cierreperiodorequestjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CierrePeriodoRequest.java`)
- [25. CierrePeriodoResponse.java](#25-cierreperiodoresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CierrePeriodoResponse.java`)
- [26. CriterioRequest.java](#26-criteriorequestjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CriterioRequest.java`)
- [27. CriterioResponse.java](#27-criterioresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CriterioResponse.java`)
- [28. GenerarBoletinRequest.java](#28-generarboletinrequestjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/GenerarBoletinRequest.java`)
- [29. LibretaAlumnoResponse.java](#29-libretaalumnoresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/LibretaAlumnoResponse.java`)
- [30. NotaItemRequest.java](#30-notaitemrequestjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaItemRequest.java`)
- [31. NotaPendienteResponse.java](#31-notapendienteresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaPendienteResponse.java`)
- [32. NotaRequest.java](#32-notarequestjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaRequest.java`)
- [33. NotaResponse.java](#33-notaresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaResponse.java`)
- [34. NotasLoteRequest.java](#34-notasloterequestjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotasLoteRequest.java`)
- [35. PageResponse.java](#35-pageresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/PageResponse.java`)
- [36. PromedioResponse.java](#36-promedioresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/PromedioResponse.java`)
- [37. ReaperturaRequest.java](#37-reaperturarequestjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/ReaperturaRequest.java`)
- [38. RegistroNotasSeccionResponse.java](#38-registronotasseccionresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/RegistroNotasSeccionResponse.java`)
- [39. ResultadoAnualResponse.java](#39-resultadoanualresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/ResultadoAnualResponse.java`)
- [40. ValidarPesosResponse.java](#40-validarpesosresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/ValidarPesosResponse.java`)

### Servicios y Lógica de Negocio

- [41. BoletinService.java](#41-boletinservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/BoletinService.java`)
- [42. CierrePeriodoService.java](#42-cierreperiodoservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/CierrePeriodoService.java`)
- [43. ConsultaService.java](#43-consultaservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/ConsultaService.java`)
- [44. CriterioService.java](#44-criterioservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/CriterioService.java`)
- [45. DocenteAutorizacionService.java](#45-docenteautorizacionservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/DocenteAutorizacionService.java`)
- [46. MatriculaLocalService.java](#46-matriculalocalservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/MatriculaLocalService.java`)
- [47. NotaEventoService.java](#47-notaeventoservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/NotaEventoService.java`)
- [48. NotaService.java](#48-notaservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/NotaService.java`)
- [49. PromedioService.java](#49-promedioservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/PromedioService.java`)
- [50. ResultadoAnualService.java](#50-resultadoanualservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/ResultadoAnualService.java`)

### Controladores REST API

- [51. BoletinController.java](#51-boletincontrollerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/controller/BoletinController.java`)
- [52. CalificacionesController.java](#52-calificacionescontrollerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/controller/CalificacionesController.java`)
- [53. CriterioController.java](#53-criteriocontrollerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/controller/CriterioController.java`)

### Mensajería Kafka (Consumers / Publishers)

- [54. BoletinEventProducer.java](#54-boletineventproducerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/BoletinEventProducer.java`)
- [55. ExamenCalificadoConsumer.java](#55-examencalificadoconsumerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/ExamenCalificadoConsumer.java`)
- [56. MatriculaEventConsumer.java](#56-matriculaeventconsumerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/MatriculaEventConsumer.java`)
- [57. TareaCalificadaConsumer.java](#57-tareacalificadaconsumerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/TareaCalificadaConsumer.java`)

### Eventos de Dominio

- [58. BoletinGeneradoEvent.java](#58-boletingeneradoeventjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/BoletinGeneradoEvent.java`)
- [59. EventoSobre.java](#59-eventosobrejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/EventoSobre.java`)
- [60. ExamenCalificadoEvent.java](#60-examencalificadoeventjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/ExamenCalificadoEvent.java`)
- [61. MatriculaEvent.java](#61-matriculaeventjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/MatriculaEvent.java`)
- [62. TareaCalificadaEvent.java](#62-tareacalificadaeventjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/TareaCalificadaEvent.java`)

### Tareas Programadas (Schedulers / Jobs)

- [63. LimpiezaJob.java](#63-limpiezajobjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/scheduler/LimpiezaJob.java`)

### Configuración Spring Boot

- [64. CacheConfig.java](#64-cacheconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/CacheConfig.java`)
- [65. CalificacionesProperties.java](#65-calificacionespropertiesjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/CalificacionesProperties.java`)
- [66. FeignConfig.java](#66-feignconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/FeignConfig.java`)
- [67. KafkaConfig.java](#67-kafkaconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/KafkaConfig.java`)
- [68. KafkaErrorHandlingConfig.java](#68-kafkaerrorhandlingconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/KafkaErrorHandlingConfig.java`)
- [69. MinioConfig.java](#69-minioconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/MinioConfig.java`)
- [70. OpenApiConfig.java](#70-openapiconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/OpenApiConfig.java`)
- [71. SecurityConfig.java](#71-securityconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/SecurityConfig.java`)
- [72. ShedLockConfig.java](#72-shedlockconfigjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/ShedLockConfig.java`)

### Manejo de Excepciones y Errores

- [73. BusinessRuleException.java](#73-businessruleexceptionjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/BusinessRuleException.java`)
- [74. ErrorResponse.java](#74-errorresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/ErrorResponse.java`)
- [75. GlobalExceptionHandler.java](#75-globalexceptionhandlerjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/GlobalExceptionHandler.java`)
- [76. ResourceNotFoundException.java](#76-resourcenotfoundexceptionjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/ResourceNotFoundException.java`)

### Seguridad, Filtros y Clientes

- [77. AlumnosClient.java](#77-alumnosclientjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/client/AlumnosClient.java`)
- [78. AsignacionDocenteResponse.java](#78-asignaciondocenteresponsejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/client/AsignacionDocenteResponse.java`)
- [79. CorrelationIdFilter.java](#79-correlationidfilterjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/filter/CorrelationIdFilter.java`)
- [80. IdentidadService.java](#80-identidadservicejava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/security/IdentidadService.java`)
- [81. PdfTexto.java](#81-pdftextojava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/util/PdfTexto.java`)
- [82. PlanificacionClient.java](#82-planificacionclientjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/client/PlanificacionClient.java`)

### Clase Principal de Arranque

- [83. CalificacionesApplication.java](#83-calificacionesapplicationjava) (`services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/CalificacionesApplication.java`)

---

<a id="1-boletinjava"></a>
## 1. `Boletin.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/Boletin.java`

### **¿Qué hace esta clase?**
Modela el boletín de notas o libreta escolar consolidada de un alumno para un periodo académico, conteniendo el resumen de todas sus asignaturas y enlace al archivo PDF oficial generado.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "boletines")
public class Boletin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "periodo_id")
    private Long periodoId;

    @Column(name = "version", nullable = false)
    private Integer version;

    @Column(name = "estado", nullable = false, length = 8)
    private String estado;

    @Column(name = "ruta_pdf", nullable = false, length = 400)
    private String rutaPdf;

    @Column(name = "generado_por")
    private Long generadoPor;

    @Column(name = "generado_en", nullable = false)
    private LocalDateTime generadoEn;
}
```

---

<a id="2-cierreperiodojava"></a>
## 2. `CierrePeriodo.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/CierrePeriodo.java`

### **¿Qué hace esta clase?**
Representa el acta de cierre definitivo de un periodo académico para un curso y sección. Al cerrarse, congela las calificaciones para impedir modificaciones no autorizadas y habilita la generación de libretas.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cierres_periodo")
public class CierrePeriodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seccion_id", nullable = false)
    private Long seccionId;

    @Column(name = "periodo_id", nullable = false)
    private Long periodoId;

    @Column(name = "estado", nullable = false, length = 10)
    private String estado;

    @Column(name = "cerrado_por")
    private Long cerradoPor;

    @Column(name = "cerrado_en")
    private LocalDateTime cerradoEn;

    @Column(name = "reabierto_por")
    private Long reabiertoPor;

    @Column(name = "reabierto_en")
    private LocalDateTime reabiertoEn;

    @Column(name = "motivo_reapertura", length = 300)
    private String motivoReapertura;
}
```

---

<a id="3-criterioevaluacionjava"></a>
## 3. `CriterioEvaluacion.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/CriterioEvaluacion.java`

### **¿Qué hace esta clase?**
Entidad que define un rubro de evaluación en el registro auxiliar del docente para un curso y periodo (ej. 'Examen bimestral' peso 40%, 'Tareas' peso 30%, 'Participación' peso 30%). Incluye el campo `origen` (ORIGEN_MANUAL, ORIGEN_TAREAS, ORIGEN_EXAMENES), que determina si las notas de este criterio se autocompletan asíncronamente desde otros microservicios vía Kafka o si son digitadas manualmente.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "criterios_evaluacion")
public class CriterioEvaluacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(name = "periodo_id", nullable = false)
    private Long periodoId;

    @Column(name = "seccion_id", nullable = false)
    private Long seccionId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "nombre", nullable = false, length = 80)
    private String nombre;

    @Column(name = "peso", nullable = false, precision = 5, scale = 2)
    private BigDecimal peso;

    @Column(name = "origen_tipo", nullable = false, length = 10)
    private String origenTipo;

    @Column(name = "creado_por")
    private Long creadoPor;

    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn;
}
```

---

<a id="4-escalaliteraljava"></a>
## 4. `EscalaLiteral.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/EscalaLiteral.java`

### **¿Qué hace esta clase?**
Tabla de equivalencias paramétricas entre calificaciones numéricas (0-20) y letras oficiales (AD: 18-20 Destacado, A: 14-17 Esperado, B: 11-13 En Proceso, C: 0-10 En Inicio).

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "escalas_literales")
public class EscalaLiteral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nivel_codigo", nullable = false, length = 15)
    private String nivelCodigo;

    @Column(name = "literal", nullable = false, length = 5)
    private String literal;

    @Column(name = "nota_min", nullable = false, precision = 5, scale = 2)
    private BigDecimal notaMin;

    @Column(name = "nota_max", nullable = false, precision = 5, scale = 2)
    private BigDecimal notaMax;

    @Column(name = "descripcion", length = 100)
    private String descripcion;
}
```

---

<a id="5-eventoprocesadojava"></a>
## 5. `EventoProcesado.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/EventoProcesado.java`

### **¿Qué hace esta clase?**
Implementa el patrón de Consumidor Idempotente. Guarda los IDs de eventos ya procesados provenientes de Kafka para asegurar que si un evento se reenvía por reintentos de la red, no sea procesado dos veces.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "eventos_procesados")
public class EventoProcesado {

    @Id
    @Column(name = "event_id")
    private UUID eventId;

    @Column(name = "event_type", nullable = false, length = 80)
    private String eventType;

    @Column(name = "procesado_en", nullable = false)
    private LocalDateTime procesadoEn;
}
```

---

<a id="6-matriculalocaljava"></a>
## 6. `MatriculaLocal.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/MatriculaLocal.java`

### **¿Qué hace esta clase?**
Read-model y réplica local de la matrícula en la base de datos de pagos. Mantiene sincronizada la información del alumno, nivel, grado, sección y apoderado responsable sin requerir llamadas REST sincrónicas lentas hacia otros servicios.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "matriculas_local")
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

    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn;
}
```

---

<a id="7-notajava"></a>
## 7. `Nota.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/Nota.java`

### **¿Qué hace esta clase?**
Almacena la calificación obtenida por un alumno en un criterio de evaluación determinado. Registra el valor numérico (0.00 a 20.00), el origen del dato, si fue sobrescrito manualmente por el docente y fecha de última modificación.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notas")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "seccion_id", nullable = false)
    private Long seccionId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "periodo_id", nullable = false)
    private Long periodoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criterio_id", nullable = false)
    private CriterioEvaluacion criterio;

    @Column(name = "valor", nullable = false, precision = 5, scale = 2)
    private BigDecimal valor;

    @Column(name = "origen", nullable = false, length = 10)
    private String origen;

    @Column(name = "origen_id")
    private Long origenId;

    @Column(name = "registrado_por")
    private Long registradoPor;

    @Column(name = "registrado_en", nullable = false)
    private LocalDateTime registradoEn;

    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn;
}
```

---

<a id="8-notapendientejava"></a>
## 8. `NotaPendiente.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/NotaPendiente.java`

### **¿Qué hace esta clase?**
Bandeja de notas asíncronas recibidas por Kafka (desde examenes-ms o tareas-ms) antes de que el docente configure sus criterios de evaluación. Permite reconciliar y aplicar las notas pendientes de forma automática tan pronto como se crea el criterio correspondiente.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "notas_pendientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotaPendiente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String origen;

    @Column(name = "origen_id", nullable = false)
    private Long origenId;

    @Column(length = 200)
    private String titulo;

    @Column(name = "alumno_id")
    private Long alumnoId;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "seccion_id")
    private Long seccionId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "periodo_id", nullable = false)
    private Long periodoId;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal valor;

    @Builder.Default
    @Column(nullable = false, length = 20)
    private String estado = "PENDIENTE";

    @Builder.Default
    @Column(name = "fecha_evento", nullable = false)
    private LocalDateTime fechaEvento = LocalDateTime.now();

    @Column(name = "aplicada_en")
    private LocalDateTime aplicadaEn;
}
```

---

<a id="9-parametroevaluacionjava"></a>
## 9. `ParametroEvaluacion.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/ParametroEvaluacion.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `ParametroEvaluacion` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "parametros_evaluacion")
public class ParametroEvaluacion {

    @Id
    @Column(name = "clave", length = 40)
    private String clave;

    @Column(name = "valor", nullable = false, length = 40)
    private String valor;

    @Column(name = "detalle", length = 200)
    private String detalle;
}
```

---

<a id="10-promedioperiodojava"></a>
## 10. `PromedioPeriodo.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/PromedioPeriodo.java`

### **¿Qué hace esta clase?**
Almacena el promedio ponderado final de un alumno en un curso y periodo (bimestre). Calcula la nota vigesimal mediante la fórmula de pesos y la traduce a la escala literal oficial del MINEDU (AD, A, B, C).

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "promedios_periodo")
public class PromedioPeriodo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "seccion_id", nullable = false)
    private Long seccionId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "periodo_id", nullable = false)
    private Long periodoId;

    @Column(name = "promedio", nullable = false, precision = 5, scale = 2)
    private BigDecimal promedio;

    @Column(name = "literal", length = 5)
    private String literal;

    @Column(name = "estado", nullable = false, length = 10)
    private String estado;

    @Column(name = "calculado_en", nullable = false)
    private LocalDateTime calculadoEn;
}
```

---

<a id="11-resultadoanualjava"></a>
## 11. `ResultadoAnual.java` — Entidades JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/entity/ResultadoAnual.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `ResultadoAnual` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "resultados_anuales")
public class ResultadoAnual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "promedio_final", nullable = false, precision = 5, scale = 2)
    private BigDecimal promedioFinal;

    @Column(name = "literal", length = 5)
    private String literal;

    @Column(name = "estado", nullable = false, length = 14)
    private String estado;

    @Column(name = "calculado_en", nullable = false)
    private LocalDateTime calculadoEn;
}
```

---

<a id="12-boletinrepositoryjava"></a>
## 12. `BoletinRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/BoletinRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Boletin`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.Boletin;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoletinRepository extends JpaRepository<Boletin, Long> {

    Optional<Boletin> findFirstByMatriculaIdAndPeriodoIdAndEstado(Long matriculaId, Long periodoId, String estado);

    List<Boletin> findByMatriculaIdAndPeriodoIdOrderByVersionDesc(Long matriculaId, Long periodoId);

    Optional<Boletin> findFirstByMatriculaIdAndPeriodoIdIsNullAndEstado(Long matriculaId, String estado);

    List<Boletin> findByMatriculaIdAndPeriodoIdIsNullOrderByVersionDesc(Long matriculaId);

    List<Boletin> findByAlumnoIdOrderByGeneradoEnDesc(Long alumnoId);

    List<Boletin> findByMatriculaIdOrderByGeneradoEnDesc(Long matriculaId);
}
```

---

<a id="13-cierreperiodorepositoryjava"></a>
## 13. `CierrePeriodoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/CierrePeriodoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `CierrePeriodo`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.CierrePeriodo;

import java.util.List;
import java.util.Optional;

@Repository
public interface CierrePeriodoRepository extends JpaRepository<CierrePeriodo, Long> {

    Optional<CierrePeriodo> findBySeccionIdAndPeriodoId(Long seccionId, Long periodoId);

    List<CierrePeriodo> findBySeccionId(Long seccionId);
}
```

---

<a id="14-criterioevaluacionrepositoryjava"></a>
## 14. `CriterioEvaluacionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/CriterioEvaluacionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `CriterioEvaluacion`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.CriterioEvaluacion;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface CriterioEvaluacionRepository extends JpaRepository<CriterioEvaluacion, Long> {

    List<CriterioEvaluacion> findByPeriodoIdAndSeccionIdAndCursoId(Long periodoId, Long seccionId, Long cursoId);

    List<CriterioEvaluacion> findByPeriodoIdAndSeccionIdAndCursoIdAndOrigenTipo(Long periodoId, Long seccionId, Long cursoId, String origenTipo);

    Optional<CriterioEvaluacion> findFirstByPeriodoIdAndSeccionIdAndCursoIdAndOrigenTipo(Long periodoId, Long seccionId, Long cursoId, String origenTipo);

    Optional<CriterioEvaluacion> findByPeriodoIdAndSeccionIdAndCursoIdAndNombre(Long periodoId, Long seccionId, Long cursoId, String nombre);

    @Query("SELECT COALESCE(SUM(c.peso), 0) FROM CriterioEvaluacion c WHERE c.periodoId = :periodoId AND c.seccionId = :seccionId AND c.cursoId = :cursoId")
    BigDecimal sumPesoByPeriodoAndSeccionAndCurso(@Param("periodoId") Long periodoId,
                                                  @Param("seccionId") Long seccionId,
                                                  @Param("cursoId") Long cursoId);

    @Query("SELECT DISTINCT c.cursoId FROM CriterioEvaluacion c WHERE c.periodoId = :periodoId AND c.seccionId = :seccionId")
    List<Long> findDistinctCursosByPeriodoAndSeccion(@Param("periodoId") Long periodoId,
                                                    @Param("seccionId") Long seccionId);
}
```

---

<a id="15-escalaliteralrepositoryjava"></a>
## 15. `EscalaLiteralRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/EscalaLiteralRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EscalaLiteral`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.EscalaLiteral;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface EscalaLiteralRepository extends JpaRepository<EscalaLiteral, Long> {

    List<EscalaLiteral> findByNivelCodigoOrderByNotaMinDesc(String nivelCodigo);

    @Query("SELECT e FROM EscalaLiteral e WHERE e.nivelCodigo = :nivelCodigo AND :nota >= e.notaMin AND :nota <= e.notaMax")
    Optional<EscalaLiteral> findByNivelCodigoAndNota(@Param("nivelCodigo") String nivelCodigo, @Param("nota") BigDecimal nota);
}
```

---

<a id="16-eventoprocesadorepositoryjava"></a>
## 16. `EventoProcesadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/EventoProcesadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EventoProcesado`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.EventoProcesado;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface EventoProcesadoRepository extends JpaRepository<EventoProcesado, UUID> {

    boolean existsByEventId(UUID eventId);

    @Modifying
    @Query("DELETE FROM EventoProcesado e WHERE e.procesadoEn < :limite")
    int deleteAntiguos(@Param("limite") LocalDateTime limite);
}
```

---

<a id="17-matriculalocalrepositoryjava"></a>
## 17. `MatriculaLocalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/MatriculaLocalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `MatriculaLocal`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatriculaLocalRepository extends JpaRepository<MatriculaLocal, Long> {

    List<MatriculaLocal> findBySeccionIdAndEstado(Long seccionId, String estado);

    List<MatriculaLocal> findBySeccionId(Long seccionId);

    List<MatriculaLocal> findByAlumnoId(Long alumnoId);

    Optional<MatriculaLocal> findByAlumnoIdAndAnioId(Long alumnoId, Long anioId);
}
```

---

<a id="18-notapendienterepositoryjava"></a>
## 18. `NotaPendienteRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/NotaPendienteRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `NotaPendiente`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.calificaciones.entity.NotaPendiente;

import java.util.List;
import java.util.Optional;

public interface NotaPendienteRepository extends JpaRepository<NotaPendiente, Long> {

    Optional<NotaPendiente> findByMatriculaIdAndOrigenAndOrigenId(Long matriculaId, String origen, Long origenId);

    @Query("""
        SELECT p FROM NotaPendiente p
        WHERE p.estado <> 'APLICADA'
          AND (:seccionId IS NULL OR p.seccionId = :seccionId)
          AND (:cursoId IS NULL OR p.cursoId = :cursoId)
        ORDER BY p.fechaEvento DESC
        """)
    List<NotaPendiente> findAbiertas(@Param("seccionId") Long seccionId, @Param("cursoId") Long cursoId);

    List<NotaPendiente> findByPeriodoIdAndSeccionIdAndCursoIdAndOrigenAndEstado(
        Long periodoId, Long seccionId, Long cursoId, String origen, String estado);
}
```

---

<a id="19-notarepositoryjava"></a>
## 19. `NotaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/NotaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Nota`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.Nota;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {

    List<Nota> findByPeriodoIdAndSeccionIdAndCursoId(Long periodoId, Long seccionId, Long cursoId);

    List<Nota> findByMatriculaIdAndPeriodoIdAndCursoId(Long matriculaId, Long periodoId, Long cursoId);

    List<Nota> findByMatriculaIdAndCriterioId(Long matriculaId, Long criterioId);

    Optional<Nota> findByMatriculaIdAndCriterioIdAndOrigenAndOrigenId(Long matriculaId, Long criterioId, String origen, Long origenId);

    List<Nota> findByAlumnoIdAndPeriodoId(Long alumnoId, Long periodoId);

    List<Nota> findByPeriodoIdAndSeccionId(Long periodoId, Long seccionId);

    List<Nota> findByCriterioId(Long criterioId);

    @Query("SELECT n FROM Nota n WHERE n.criterio.id = :criterioId AND n.matriculaId = :matriculaId")
    Optional<Nota> findByCriterioIdAndMatriculaId(@Param("criterioId") Long criterioId, @Param("matriculaId") Long matriculaId);

    @Query("SELECT n FROM Nota n WHERE n.criterio.id = :criterioId AND n.matriculaId = :matriculaId AND n.origen = :origen AND (:origenId IS NULL OR n.origenId = :origenId)")
    Optional<Nota> findByCriterioAndMatriculaAndOrigen(@Param("criterioId") Long criterioId,
                                                      @Param("matriculaId") Long matriculaId,
                                                      @Param("origen") String origen,
                                                      @Param("origenId") Long origenId);
}
```

---

<a id="20-parametroevaluacionrepositoryjava"></a>
## 20. `ParametroEvaluacionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/ParametroEvaluacionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `ParametroEvaluacion`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.ParametroEvaluacion;

@Repository
public interface ParametroEvaluacionRepository extends JpaRepository<ParametroEvaluacion, String> {
}
```

---

<a id="21-promedioperiodorepositoryjava"></a>
## 21. `PromedioPeriodoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/PromedioPeriodoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `PromedioPeriodo`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.PromedioPeriodo;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromedioPeriodoRepository extends JpaRepository<PromedioPeriodo, Long> {

    Optional<PromedioPeriodo> findByMatriculaIdAndCursoIdAndPeriodoId(Long matriculaId, Long cursoId, Long periodoId);

    List<PromedioPeriodo> findByPeriodoIdAndSeccionIdAndCursoId(Long periodoId, Long seccionId, Long cursoId);

    List<PromedioPeriodo> findByPeriodoIdAndSeccionId(Long periodoId, Long seccionId);

    List<PromedioPeriodo> findByMatriculaIdAndPeriodoId(Long matriculaId, Long periodoId);

    List<PromedioPeriodo> findByMatriculaId(Long matriculaId);

    List<PromedioPeriodo> findByAlumnoIdAndPeriodoId(Long alumnoId, Long periodoId);

    List<PromedioPeriodo> findByAlumnoId(Long alumnoId);
}
```

---

<a id="22-resultadoanualrepositoryjava"></a>
## 22. `ResultadoAnualRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/repository/ResultadoAnualRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `ResultadoAnual`. Define consultas personalizadas y operaciones CRUD con base de datos.

```java
package pe.edu.upeu.eduspace.calificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.calificaciones.entity.ResultadoAnual;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultadoAnualRepository extends JpaRepository<ResultadoAnual, Long> {

    Optional<ResultadoAnual> findByMatriculaIdAndCursoId(Long matriculaId, Long cursoId);

    List<ResultadoAnual> findByAlumnoIdAndAnioId(Long alumnoId, Long anioId);

    List<ResultadoAnual> findByMatriculaId(Long matriculaId);

    @Query("SELECT r FROM ResultadoAnual r WHERE r.matriculaId IN :matriculaIds")
    List<ResultadoAnual> findByMatriculaIdIn(@Param("matriculaIds") List<Long> matriculaIds);
}
```

---

<a id="23-boletinresponsejava"></a>
## 23. `BoletinResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/BoletinResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Boletin`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoletinResponse {

    private Long id;
    private Long matriculaId;
    private Long alumnoId;
    private Long periodoId;
    private Integer version;
    private String estado;
    private String rutaPdf;
    private String urlDescarga;
    private Long generadoPor;
    private LocalDateTime generadoEn;
}
```

---

<a id="24-cierreperiodorequestjava"></a>
## 24. `CierrePeriodoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CierrePeriodoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `CierrePeriodo`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CierrePeriodoRequest {

    @NotNull(message = "seccionId es obligatorio")
    private Long seccionId;

    @NotNull(message = "periodoId es obligatorio")
    private Long periodoId;
}
```

---

<a id="25-cierreperiodoresponsejava"></a>
## 25. `CierrePeriodoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CierrePeriodoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `CierrePeriodo`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CierrePeriodoResponse {

    private Long id;
    private Long seccionId;
    private Long periodoId;
    private String estado;
    private Long cerradoPor;
    private LocalDateTime cerradoEn;
    private Long reabiertoPor;
    private LocalDateTime reabiertoEn;
    private String motivoReapertura;
}
```

---

<a id="26-criteriorequestjava"></a>
## 26. `CriterioRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CriterioRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `Criterio`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriterioRequest {

    @NotNull(message = "anioId es obligatorio")
    private Long anioId;

    @NotNull(message = "periodoId es obligatorio")
    private Long periodoId;

    @NotNull(message = "seccionId es obligatorio")
    private Long seccionId;

    @NotNull(message = "cursoId es obligatorio")
    private Long cursoId;

    @NotBlank(message = "El nombre del criterio es obligatorio")
    @Size(max = 80, message = "El nombre no puede exceder 80 caracteres")
    private String nombre;

    @NotNull(message = "El peso del criterio es obligatorio")
    @DecimalMin(value = "0.01", message = "El peso debe ser mayor a 0")
    @DecimalMax(value = "100.00", message = "El peso no puede exceder 100")
    private BigDecimal peso;

    @Pattern(regexp = "MANUAL|TAREAS|EXAMENES", message = "origenTipo debe ser MANUAL, TAREAS o EXAMENES")
    @Builder.Default
    private String origenTipo = "MANUAL";
}
```

---

<a id="27-criterioresponsejava"></a>
## 27. `CriterioResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/CriterioResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Criterio`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriterioResponse {

    private Long id;
    private Long anioId;
    private Long periodoId;
    private Long seccionId;
    private Long cursoId;
    private String nombre;
    private BigDecimal peso;
    private String origenTipo;
    private Long creadoPor;
    private LocalDateTime creadoEn;
}
```

---

<a id="28-generarboletinrequestjava"></a>
## 28. `GenerarBoletinRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/GenerarBoletinRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `GenerarBoletin`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenerarBoletinRequest {

    private Long seccionId;
    private Long periodoId; // null para boletín anual
    private Long alumnoId;  // opcional, para generar solo a un alumno
    private Long anioId;
}
```

---

<a id="29-libretaalumnoresponsejava"></a>
## 29. `LibretaAlumnoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/LibretaAlumnoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `LibretaAlumno`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LibretaAlumnoResponse {

    private Long alumnoId;
    private String alumnoNombre;
    private Long matriculaId;
    private Long anioId;
    private Long nivelId;
    private Long gradoId;
    private Long seccionId;
    private List<CursoLibretaDto> cursos;
    private List<ResultadoAnualResponse> resultadosAnuales;
    private List<BoletinResponse> boletines;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CursoLibretaDto {
        private Long cursoId;
        private String cursoNombre;
        private Map<Long, PeriodoNotaDto> notasPorPeriodo; // periodoId -> { promedio, literal, estado }
        private BigDecimal promedioFinal;
        private String literalFinal;
        private String estadoFinal;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PeriodoNotaDto {
        private Long periodoId;
        private BigDecimal promedio;
        private String literal;
        private String estado; // BORRADOR, CERRADO
    }
}
```

---

<a id="30-notaitemrequestjava"></a>
## 30. `NotaItemRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaItemRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `NotaItem`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotaItemRequest {

    @NotNull(message = "matriculaId es obligatorio")
    private Long matriculaId;

    @NotNull(message = "alumnoId es obligatorio")
    private Long alumnoId;

    @NotNull(message = "El valor de la nota es obligatorio")
    @DecimalMin(value = "0.00", message = "La nota mínima es 0")
    @DecimalMax(value = "20.00", message = "La nota máxima es 20")
    private BigDecimal valor;
}
```

---

<a id="31-notapendienteresponsejava"></a>
## 31. `NotaPendienteResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaPendienteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `NotaPendiente`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotaPendienteResponse {

    private String id;
    private String origen; // TAREA, EXAMEN
    private Long origenId;
    private String titulo;
    private Long alumnoId;
    private Long matriculaId;
    private Long seccionId;
    private Long cursoId;
    private Long periodoId;
    private BigDecimal valor;
    private LocalDateTime fechaEvento;
    /** PENDIENTE (sin criterio) o PERIODO_CERRADO (requiere reapertura). */
    private String motivo;
}
```

---

<a id="32-notarequestjava"></a>
## 32. `NotaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `Nota`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotaRequest {

    @NotNull(message = "matriculaId es obligatorio")
    private Long matriculaId;

    @NotNull(message = "alumnoId es obligatorio")
    private Long alumnoId;

    @NotNull(message = "seccionId es obligatorio")
    private Long seccionId;

    @NotNull(message = "cursoId es obligatorio")
    private Long cursoId;

    @NotNull(message = "periodoId es obligatorio")
    private Long periodoId;

    @NotNull(message = "criterioId es obligatorio")
    private Long criterioId;

    @NotNull(message = "El valor de la nota es obligatorio")
    @DecimalMin(value = "0.00", message = "La nota mínima es 0")
    @DecimalMax(value = "20.00", message = "La nota máxima es 20")
    private BigDecimal valor;

    @Pattern(regexp = "MANUAL|TAREA|EXAMEN", message = "origen debe ser MANUAL, TAREA o EXAMEN")
    @Builder.Default
    private String origen = "MANUAL";

    private Long origenId;
}
```

---

<a id="33-notaresponsejava"></a>
## 33. `NotaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Nota`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotaResponse {

    private Long id;
    private Long matriculaId;
    private Long alumnoId;
    private Long seccionId;
    private Long cursoId;
    private Long periodoId;
    private Long criterioId;
    private String criterioNombre;
    private BigDecimal valor;
    private String origen;
    private Long origenId;
    private Long registradoPor;
    private LocalDateTime registradoEn;
    private LocalDateTime actualizadoEn;
}
```

---

<a id="34-notasloterequestjava"></a>
## 34. `NotasLoteRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/NotasLoteRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `NotasLote`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotasLoteRequest {

    @NotNull(message = "seccionId es obligatorio")
    private Long seccionId;

    @NotNull(message = "cursoId es obligatorio")
    private Long cursoId;

    @NotNull(message = "periodoId es obligatorio")
    private Long periodoId;

    @NotNull(message = "criterioId es obligatorio")
    private Long criterioId;

    @NotEmpty(message = "La lista de notas no puede estar vacía")
    @Valid
    private List<NotaItemRequest> notas;
}
```

---

<a id="35-pageresponsejava"></a>
## 35. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Page`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {

    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
```

---

<a id="36-promedioresponsejava"></a>
## 36. `PromedioResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/PromedioResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Promedio`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromedioResponse {

    private Long id;
    private Long matriculaId;
    private Long alumnoId;
    private String alumnoNombre;
    private Long seccionId;
    private Long cursoId;
    private Long periodoId;
    private BigDecimal promedio;
    private String literal;
    private String estado;
    private LocalDateTime calculadoEn;
}
```

---

<a id="37-reaperturarequestjava"></a>
## 37. `ReaperturaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/ReaperturaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request) que valida y transporta los parámetros enviados desde el cliente para operaciones de `Reapertura`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReaperturaRequest {

    @NotNull(message = "seccionId es obligatorio")
    private Long seccionId;

    @NotNull(message = "periodoId es obligatorio")
    private Long periodoId;

    @NotBlank(message = "El motivo de reapertura es obligatorio para auditoría")
    @Size(max = 300, message = "El motivo no puede exceder 300 caracteres")
    private String motivo;
}
```

---

<a id="38-registronotasseccionresponsejava"></a>
## 38. `RegistroNotasSeccionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/RegistroNotasSeccionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `RegistroNotasSeccion`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistroNotasSeccionResponse {

    private Long seccionId;
    private Long cursoId;
    private Long periodoId;
    private String estadoPeriodo; // ABIERTO, CERRADO, REABIERTO
    private List<CriterioResponse> criterios;
    private List<FilaRegistroAlumno> alumnos;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FilaRegistroAlumno {
        private Long matriculaId;
        private Long alumnoId;
        private String alumnoNombre;
        private Map<Long, BigDecimal> notasPorCriterioId; // criterioId -> valor
        private BigDecimal promedio;
        private String literal;
    }
}
```

---

<a id="39-resultadoanualresponsejava"></a>
## 39. `ResultadoAnualResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/ResultadoAnualResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `ResultadoAnual`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoAnualResponse {

    private Long id;
    private Long matriculaId;
    private Long alumnoId;
    private Long anioId;
    private Long cursoId;
    private BigDecimal promedioFinal;
    private String literal;
    private String estado;
    private LocalDateTime calculadoEn;
}
```

---

<a id="40-validarpesosresponsejava"></a>
## 40. `ValidarPesosResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/dto/ValidarPesosResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `ValidarPesos`.

```java
package pe.edu.upeu.eduspace.calificaciones.dto;

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
public class ValidarPesosResponse {

    private Long periodoId;
    private Long seccionId;
    private Long cursoId;
    private BigDecimal sumaPesos;
    private boolean esValido; // true si suma == 100.00
    private String mensaje;
    private List<CriterioResponse> criterios;
}
```

---

<a id="41-boletinservicejava"></a>
## 41. `BoletinService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/BoletinService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `Boletin`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import pe.edu.upeu.eduspace.calificaciones.util.PdfTexto;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.client.AlumnosClient;
import pe.edu.upeu.eduspace.calificaciones.client.PlanificacionClient;
import pe.edu.upeu.eduspace.calificaciones.dto.BoletinResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.GenerarBoletinRequest;
import pe.edu.upeu.eduspace.calificaciones.entity.Boletin;
import pe.edu.upeu.eduspace.calificaciones.entity.CierrePeriodo;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.calificaciones.entity.PromedioPeriodo;
import pe.edu.upeu.eduspace.calificaciones.event.BoletinGeneradoEvent;
import pe.edu.upeu.eduspace.calificaciones.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.calificaciones.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.calificaciones.messaging.BoletinEventProducer;
import pe.edu.upeu.eduspace.calificaciones.repository.BoletinRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.CierrePeriodoRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.PromedioPeriodoRepository;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoletinService {

    private final BoletinRepository boletinRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final PromedioPeriodoRepository promedioRepository;
    private final CierrePeriodoRepository cierrePeriodoRepository;
    private final BoletinEventProducer boletinEventProducer;
    private final PlanificacionClient planificacionClient;
    private final AlumnosClient alumnosClient;
    private final MinioClient minioClient;

    @Value("${app.minio.bucket-boletines:boletines}")
    private String bucketBoletines;

    @Transactional
    public List<BoletinResponse> generarBoletines(GenerarBoletinRequest request, Long usuarioId) {
        Long seccionId = request.getSeccionId();
        Long periodoId = request.getPeriodoId();

        // 1. Si es de periodo, validar que esté CERRADO
        if (periodoId != null) {
            CierrePeriodo cierre = cierrePeriodoRepository.findBySeccionIdAndPeriodoId(seccionId, periodoId)
                .orElseThrow(() -> new BusinessRuleException("El periodo debe estar CERRADO antes de emitir boletines"));

            if (!"CERRADO".equalsIgnoreCase(cierre.getEstado())) {
                throw new BusinessRuleException("No se pueden generar boletines: el periodo no está CERRADO");
            }
        }

        List<MatriculaLocal> matriculas;
        if (request.getAlumnoId() != null) {
            // un alumno puede tener matrículas de varios años: se elige la de la sección (o el año) pedida
            MatriculaLocal m = matriculaLocalRepository.findByAlumnoId(request.getAlumnoId())
                .stream()
                .filter(x -> seccionId == null || seccionId.equals(x.getSeccionId()))
                .filter(x -> request.getAnioId() == null || request.getAnioId().equals(x.getAnioId()))
                .max(java.util.Comparator.comparing(MatriculaLocal::getActualizadoEn))
                .orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada para alumno " + request.getAlumnoId()));
            matriculas = List.of(m);
        } else {
            matriculas = matriculaLocalRepository.findBySeccionId(seccionId);
        }

        String periodoNombre = "Anual";
        if (periodoId != null) {
            try {
                Map<String, Object> pInfo = planificacionClient.getPeriodoPorId(periodoId);
                periodoNombre = pInfo != null && pInfo.get("nombre") != null ? pInfo.get("nombre").toString() : "Periodo " + periodoId;
            } catch (Exception e) {
                periodoNombre = "Periodo " + periodoId;
            }
        }

        List<BoletinResponse> responses = new ArrayList<>();

        for (MatriculaLocal m : matriculas) {
            // Versionado: anular boletín anterior vigente si existía
            int proximaVersion = 1;
            List<Boletin> anteriores = periodoId != null
                ? boletinRepository.findByMatriculaIdAndPeriodoIdOrderByVersionDesc(m.getMatriculaId(), periodoId)
                : boletinRepository.findByMatriculaIdAndPeriodoIdIsNullOrderByVersionDesc(m.getMatriculaId());

            if (!anteriores.isEmpty()) {
                proximaVersion = anteriores.get(0).getVersion() + 1;
                for (Boletin anterior : anteriores) {
                    if ("VIGENTE".equalsIgnoreCase(anterior.getEstado())) {
                        anterior.setEstado("ANULADO");
                        boletinRepository.save(anterior);
                    }
                }
            }

            String rutaPdf = String.format("boletines/%d/%s-v%d.pdf",
                m.getMatriculaId(),
                periodoId != null ? "periodo-" + periodoId : "anual",
                proximaVersion);

            Boletin boletin = Boletin.builder()
                .matriculaId(m.getMatriculaId())
                .alumnoId(m.getAlumnoId())
                .periodoId(periodoId)
                .version(proximaVersion)
                .estado("VIGENTE")
                .rutaPdf(rutaPdf)
                .generadoPor(usuarioId)
                .generadoEn(LocalDateTime.now())
                .build();

            Boletin guardado = boletinRepository.save(boletin);

            // Generar y subir archivo a MinIO
            subirBoletinMinio(guardado, m, periodoNombre);

            // Publicar evento en Kafka
            boletinEventProducer.publicarBoletinGenerado(BoletinGeneradoEvent.builder()
                .boletinId(guardado.getId())
                .alumnoId(guardado.getAlumnoId())
                .matriculaId(guardado.getMatriculaId())
                .periodoId(guardado.getPeriodoId())
                .periodoNombre(periodoNombre)
                .build());

            responses.add(toResponse(guardado));
        }

        return responses;
    }

    private void subirBoletinMinio(Boletin b, MatriculaLocal m, String periodoNombre) {
        try {
            List<PromedioPeriodo> promedios = b.getPeriodoId() != null
                ? promedioRepository.findByMatriculaIdAndPeriodoId(m.getMatriculaId(), b.getPeriodoId())
                : promedioRepository.findByMatriculaId(m.getMatriculaId());

            StringBuilder sb = new StringBuilder();
            sb.append("=================================================================\n");
            sb.append("                  EDUSPACE - BOLETÍN DE NOTAS OFICIAL            \n");
            sb.append("=================================================================\n");
            sb.append(String.format("Alumno: %s (ID: %d)\n", m.getAlumnoNombre(), m.getAlumnoId()));
            sb.append(String.format("Matrícula: %d | Sección ID: %d | Periodo: %s\n", m.getMatriculaId(), m.getSeccionId(), periodoNombre));
            sb.append(String.format("Versión: %d | Estado: %s | Emitido: %s\n", b.getVersion(), b.getEstado(), b.getGeneradoEn()));
            sb.append("-----------------------------------------------------------------\n");
            sb.append(String.format("%-10s %-25s %-10s %-8s\n", "CURSO ID", "ASIGNATURA", "PROMEDIO", "LITERAL"));
            sb.append("-----------------------------------------------------------------\n");

            for (PromedioPeriodo p : promedios) {
                sb.append(String.format("%-10d %-25s %-10.2f %-8s\n",
                    p.getCursoId(), "Curso " + p.getCursoId(), p.getPromedio(), p.getLiteral() != null ? p.getLiteral() : "-"));
            }
            sb.append("=================================================================\n");
            sb.append("Documento oficial firmado digitalmente por EduSpace Calificaciones\n");

            byte[] bytes = PdfTexto.generar("EDUSPACE - BOLETIN DE NOTAS", sb.toString());
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(bucketBoletines)
                    .object(b.getRutaPdf())
                    .stream(new ByteArrayInputStream(bytes), bytes.length, -1)
                    .contentType("application/pdf")
                    .build()
            );
            log.info("Boletín subido a MinIO en {}", b.getRutaPdf());
        } catch (Exception e) {
            log.warn("Error al subir boletín a MinIO: {}", e.getMessage());
        }
    }

    public String obtenerUrlDescarga(Long boletinId) {
        Boletin b = boletinRepository.findById(boletinId)
            .orElseThrow(() -> new ResourceNotFoundException("Boletín no encontrado: " + boletinId));

        try {
            return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                    .method(Method.GET)
                    .bucket(bucketBoletines)
                    .object(b.getRutaPdf())
                    .expiry(15, TimeUnit.MINUTES)
                    .build()
            );
        } catch (Exception e) {
            log.warn("No se pudo generar URL firmada de MinIO: {}", e.getMessage());
            return "/api/v1/calificaciones/boletines/" + boletinId + "/descargar-directa";
        }
    }

    @Transactional(readOnly = true)
    public List<BoletinResponse> listarBoletinesPorAlumno(Long alumnoId) {
        return boletinRepository.findByAlumnoIdOrderByGeneradoEnDesc(alumnoId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public BoletinResponse obtenerPorId(Long id) {
        Boletin b = boletinRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Boletín no encontrado con ID: " + id));
        return toResponse(b);
    }

    public BoletinResponse toResponse(Boletin b) {
        return BoletinResponse.builder()
            .id(b.getId())
            .matriculaId(b.getMatriculaId())
            .alumnoId(b.getAlumnoId())
            .periodoId(b.getPeriodoId())
            .version(b.getVersion())
            .estado(b.getEstado())
            .rutaPdf(b.getRutaPdf())
            .urlDescarga("/api/v1/calificaciones/boletines/" + b.getId() + "/url")
            .generadoPor(b.getGeneradoPor())
            .generadoEn(b.getGeneradoEn())
            .build();
    }
}
```

---

<a id="42-cierreperiodoservicejava"></a>
## 42. `CierrePeriodoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/CierrePeriodoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `CierrePeriodo`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.dto.CierrePeriodoRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.CierrePeriodoResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.ReaperturaRequest;
import pe.edu.upeu.eduspace.calificaciones.entity.CierrePeriodo;
import pe.edu.upeu.eduspace.calificaciones.entity.CriterioEvaluacion;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.calificaciones.entity.Nota;
import pe.edu.upeu.eduspace.calificaciones.entity.PromedioPeriodo;
import pe.edu.upeu.eduspace.calificaciones.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.calificaciones.repository.CierrePeriodoRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.CriterioEvaluacionRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.NotaRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.PromedioPeriodoRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CierrePeriodoService {

    private final CierrePeriodoRepository cierrePeriodoRepository;
    private final CriterioEvaluacionRepository criterioRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final NotaRepository notaRepository;
    private final PromedioPeriodoRepository promedioRepository;
    private final PromedioService promedioService;
    private final NotaEventoService notaEventoService;

    @Transactional
    public CierrePeriodoResponse cerrarPeriodo(CierrePeriodoRequest request, Long usuarioId) {
        Long seccionId = request.getSeccionId();
        Long periodoId = request.getPeriodoId();

        CierrePeriodo cierre = cierrePeriodoRepository.findBySeccionIdAndPeriodoId(seccionId, periodoId)
            .orElseGet(() -> CierrePeriodo.builder()
                .seccionId(seccionId)
                .periodoId(periodoId)
                .estado("ABIERTO")
                .build());

        if ("CERRADO".equalsIgnoreCase(cierre.getEstado())) {
            throw new BusinessRuleException("El periodo ya se encuentra CERRADO para esta sección");
        }

        // 1. Obtener todos los cursos que tienen criterios definidos en esta sección y periodo
        List<Long> cursoIds = criterioRepository.findDistinctCursosByPeriodoAndSeccion(periodoId, seccionId);
        if (cursoIds.isEmpty()) {
            throw new BusinessRuleException("No se puede cerrar el periodo: no existen criterios de evaluación configurados en ningún curso");
        }

        // 2. Obtener alumnos matriculados activos
        List<MatriculaLocal> matriculas = matriculaLocalRepository.findBySeccionIdAndEstado(seccionId, "MATRICULADO");
        if (matriculas.isEmpty()) {
            matriculas = matriculaLocalRepository.findBySeccionId(seccionId);
        }

        // 3. Validar para cada curso: suma de pesos = 100% y notas completas
        for (Long cursoId : cursoIds) {
            BigDecimal sumaPesos = criterioRepository.sumPesoByPeriodoAndSeccionAndCurso(periodoId, seccionId, cursoId);
            if (sumaPesos.compareTo(new BigDecimal("100.00")) != 0) {
                throw new BusinessRuleException(String.format(
                    "No se puede cerrar: el curso %d tiene suma de pesos igual a %.2f%% (debe ser exactamente 100%%)",
                    cursoId, sumaPesos
                ));
            }

            List<CriterioEvaluacion> criterios = criterioRepository.findByPeriodoIdAndSeccionIdAndCursoId(periodoId, seccionId, cursoId);

            // Validar que cada alumno tenga nota en cada criterio
            for (MatriculaLocal m : matriculas) {
                for (CriterioEvaluacion c : criterios) {
                    List<Nota> notas = notaRepository.findByMatriculaIdAndCriterioId(m.getMatriculaId(), c.getId());
                    if (notas.isEmpty()) {
                        throw new BusinessRuleException(String.format(
                            "Falta registrar nota en el curso %d, criterio '%s' para el alumno '%s' (matrícula %d)",
                            cursoId, c.getNombre(), m.getAlumnoNombre(), m.getMatriculaId()
                        ));
                    }
                }
                // Asegurar cálculo final del promedio
                promedioService.calcularYGuardarPromedio(m.getMatriculaId(), cursoId, periodoId);
            }
        }

        // 4. Congelar todos los promedios de la sección y periodo a 'CERRADO'
        List<PromedioPeriodo> promedios = promedioRepository.findByPeriodoIdAndSeccionId(periodoId, seccionId);
        for (PromedioPeriodo p : promedios) {
            p.setEstado("CERRADO");
            promedioRepository.save(p);
        }

        // 5. Actualizar estado del cierre de periodo
        cierre.setEstado("CERRADO");
        cierre.setCerradoPor(usuarioId);
        cierre.setCerradoEn(LocalDateTime.now());
        CierrePeriodo guardado = cierrePeriodoRepository.save(cierre);

        log.info("Periodo cerrado exitosamente: seccionId={}, periodoId={}, cerradoPor={}", seccionId, periodoId, usuarioId);
        return toResponse(guardado);
    }

    @Transactional
    public CierrePeriodoResponse reabrirPeriodo(ReaperturaRequest request, Long usuarioId) {
        Long seccionId = request.getSeccionId();
        Long periodoId = request.getPeriodoId();

        CierrePeriodo cierre = cierrePeriodoRepository.findBySeccionIdAndPeriodoId(seccionId, periodoId)
            .orElseThrow(() -> new BusinessRuleException("No existe registro de cierre para este periodo y sección"));

        if (!"CERRADO".equalsIgnoreCase(cierre.getEstado())) {
            throw new BusinessRuleException("El periodo no se encuentra en estado CERRADO, estado actual: " + cierre.getEstado());
        }

        cierre.setEstado("REABIERTO");
        cierre.setReabiertoPor(usuarioId);
        cierre.setReabiertoEn(LocalDateTime.now());
        cierre.setMotivoReapertura(request.getMotivo());
        CierrePeriodo guardado = cierrePeriodoRepository.save(cierre);
        notaEventoService.reprocesarPeriodoReabierto(seccionId, periodoId);

        // Descongelar promedios para permitir recálculo
        List<PromedioPeriodo> promedios = promedioRepository.findByPeriodoIdAndSeccionId(periodoId, seccionId);
        for (PromedioPeriodo p : promedios) {
            p.setEstado("BORRADOR");
            promedioRepository.save(p);
        }

        log.info("Periodo reabierto con éxito: seccionId={}, periodoId={}, motivo='{}'", seccionId, periodoId, request.getMotivo());
        return toResponse(guardado);
    }

    public CierrePeriodoResponse toResponse(CierrePeriodo c) {
        return CierrePeriodoResponse.builder()
            .id(c.getId())
            .seccionId(c.getSeccionId())
            .periodoId(c.getPeriodoId())
            .estado(c.getEstado())
            .cerradoPor(c.getCerradoPor())
            .cerradoEn(c.getCerradoEn())
            .reabiertoPor(c.getReabiertoPor())
            .reabiertoEn(c.getReabiertoEn())
            .motivoReapertura(c.getMotivoReapertura())
            .build();
    }
}
```

---

<a id="43-consultaservicejava"></a>
## 43. `ConsultaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/ConsultaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `Consulta`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.client.AlumnosClient;
import pe.edu.upeu.eduspace.calificaciones.dto.BoletinResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.CriterioResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.LibretaAlumnoResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.PromedioResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.RegistroNotasSeccionResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.ResultadoAnualResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.CierrePeriodo;
import pe.edu.upeu.eduspace.calificaciones.entity.CriterioEvaluacion;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.calificaciones.entity.Nota;
import pe.edu.upeu.eduspace.calificaciones.entity.PromedioPeriodo;
import pe.edu.upeu.eduspace.calificaciones.entity.ResultadoAnual;
import pe.edu.upeu.eduspace.calificaciones.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.calificaciones.repository.BoletinRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.CierrePeriodoRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.CriterioEvaluacionRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.NotaRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.PromedioPeriodoRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.ResultadoAnualRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsultaService {

    private final MatriculaLocalRepository matriculaLocalRepository;
    private final CriterioEvaluacionRepository criterioRepository;
    private final NotaRepository notaRepository;
    private final PromedioPeriodoRepository promedioRepository;
    private final CierrePeriodoRepository cierrePeriodoRepository;
    private final ResultadoAnualRepository resultadoAnualRepository;
    private final BoletinRepository boletinRepository;
    private final CriterioService criterioService;
    private final PromedioService promedioService;
    private final ResultadoAnualService resultadoAnualService;
    private final BoletinService boletinService;
    private final AlumnosClient alumnosClient;

    @Transactional(readOnly = true)
    public RegistroNotasSeccionResponse obtenerRegistroSeccion(Long seccionId, Long cursoId, Long periodoId) {
        String estadoPeriodo = cierrePeriodoRepository.findBySeccionIdAndPeriodoId(seccionId, periodoId)
            .map(CierrePeriodo::getEstado)
            .orElse("ABIERTO");

        List<CriterioResponse> criterios = criterioService.listarPorCursoYPeriodo(periodoId, seccionId, cursoId);
        // Solo los matriculados (pagada la matrícula): un pre-matriculado todavía no es alumno de la sección
        List<MatriculaLocal> matriculas = matriculaLocalRepository.findBySeccionIdAndEstado(seccionId, "MATRICULADO");
        List<Nota> notas = notaRepository.findByPeriodoIdAndSeccionIdAndCursoId(periodoId, seccionId, cursoId);

        // Agrupar notas por matriculaId -> (criterioId -> valor)
        Map<Long, Map<Long, BigDecimal>> notasPorMatricula = new HashMap<>();
        for (Nota n : notas) {
            notasPorMatricula.computeIfAbsent(n.getMatriculaId(), k -> new HashMap<>())
                .put(n.getCriterio().getId(), n.getValor());
        }

        List<PromedioPeriodo> promedios = promedioRepository.findByPeriodoIdAndSeccionIdAndCursoId(periodoId, seccionId, cursoId);
        Map<Long, PromedioPeriodo> promedioPorMatricula = promedios.stream()
            .collect(Collectors.toMap(PromedioPeriodo::getMatriculaId, p -> p, (a, b) -> a));

        List<RegistroNotasSeccionResponse.FilaRegistroAlumno> filas = new ArrayList<>();
        for (MatriculaLocal m : matriculas) {
            PromedioPeriodo prom = promedioPorMatricula.get(m.getMatriculaId());
            filas.add(RegistroNotasSeccionResponse.FilaRegistroAlumno.builder()
                .matriculaId(m.getMatriculaId())
                .alumnoId(m.getAlumnoId())
                .alumnoNombre(m.getAlumnoNombre())
                .notasPorCriterioId(notasPorMatricula.getOrDefault(m.getMatriculaId(), Collections.emptyMap()))
                .promedio(prom != null ? prom.getPromedio() : null)
                .literal(prom != null ? prom.getLiteral() : null)
                .build());
        }

        return RegistroNotasSeccionResponse.builder()
            .seccionId(seccionId)
            .cursoId(cursoId)
            .periodoId(periodoId)
            .estadoPeriodo(estadoPeriodo)
            .criterios(criterios)
            .alumnos(filas)
            .build();
    }

    @Transactional(readOnly = true)
    public List<PromedioResponse> obtenerPromediosSeccion(Long seccionId, Long periodoId) {
        List<MatriculaLocal> matriculas = matriculaLocalRepository.findBySeccionId(seccionId);
        Map<Long, String> nombresMap = matriculas.stream()
            .collect(Collectors.toMap(MatriculaLocal::getMatriculaId, MatriculaLocal::getAlumnoNombre, (a, b) -> a));

        List<PromedioPeriodo> promedios = promedioRepository.findByPeriodoIdAndSeccionId(periodoId, seccionId);
        return promedios.stream()
            .map(p -> promedioService.toResponse(p, nombresMap.getOrDefault(p.getMatriculaId(), "Alumno " + p.getAlumnoId())))
            .toList();
    }

    @Transactional(readOnly = true)
    public LibretaAlumnoResponse obtenerLibretaAlumno(Long alumnoId, Long anioId, boolean esAlumnoOApoderado) {
        MatriculaLocal matricula;
        if (anioId != null) {
            matricula = matriculaLocalRepository.findByAlumnoIdAndAnioId(alumnoId, anioId)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró matrícula para alumno " + alumnoId + " en año " + anioId));
        } else {
            List<MatriculaLocal> mats = matriculaLocalRepository.findByAlumnoId(alumnoId);
            if (mats.isEmpty()) {
                throw new ResourceNotFoundException("No se encontraron matrículas para alumno con ID: " + alumnoId);
            }
            matricula = mats.get(0);
        }

        List<PromedioPeriodo> promedios = promedioRepository.findByMatriculaId(matricula.getMatriculaId());

        // Regla §3.4 / §3.5: Alumno/apoderado solo ve periodos cerrados
        if (esAlumnoOApoderado) {
            promedios = promedios.stream()
                .filter(p -> "CERRADO".equalsIgnoreCase(p.getEstado()))
                .toList();
        }

        // Agrupar promedios por curso
        Map<Long, List<PromedioPeriodo>> porCurso = promedios.stream()
            .collect(Collectors.groupingBy(PromedioPeriodo::getCursoId));

        List<ResultadoAnual> resultadosAnuales = resultadoAnualRepository.findByMatriculaId(matricula.getMatriculaId());
        Map<Long, ResultadoAnual> resAnualMap = resultadosAnuales.stream()
            .collect(Collectors.toMap(ResultadoAnual::getCursoId, r -> r, (a, b) -> a));

        List<LibretaAlumnoResponse.CursoLibretaDto> cursos = new ArrayList<>();
        for (Map.Entry<Long, List<PromedioPeriodo>> entry : porCurso.entrySet()) {
            Long cursoId = entry.getKey();
            Map<Long, LibretaAlumnoResponse.PeriodoNotaDto> notasPorPeriodo = new HashMap<>();

            for (PromedioPeriodo p : entry.getValue()) {
                notasPorPeriodo.put(p.getPeriodoId(), LibretaAlumnoResponse.PeriodoNotaDto.builder()
                    .periodoId(p.getPeriodoId())
                    .promedio(p.getPromedio())
                    .literal(p.getLiteral())
                    .estado(p.getEstado())
                    .build());
            }

            ResultadoAnual res = resAnualMap.get(cursoId);
            cursos.add(LibretaAlumnoResponse.CursoLibretaDto.builder()
                .cursoId(cursoId)
                .cursoNombre("Curso " + cursoId)
                .notasPorPeriodo(notasPorPeriodo)
                .promedioFinal(res != null ? res.getPromedioFinal() : null)
                .literalFinal(res != null ? res.getLiteral() : null)
                .estadoFinal(res != null ? res.getEstado() : null)
                .build());
        }

        List<BoletinResponse> boletines = boletinRepository.findByMatriculaIdOrderByGeneradoEnDesc(matricula.getMatriculaId())
            .stream()
            .filter(b -> "VIGENTE".equalsIgnoreCase(b.getEstado()))
            .map(boletinService::toResponse)
            .toList();

        return LibretaAlumnoResponse.builder()
            .alumnoId(alumnoId)
            .alumnoNombre(matricula.getAlumnoNombre())
            .matriculaId(matricula.getMatriculaId())
            .anioId(matricula.getAnioId())
            .nivelId(matricula.getNivelId())
            .gradoId(matricula.getGradoId())
            .seccionId(matricula.getSeccionId())
            .cursos(cursos)
            .resultadosAnuales(resultadosAnuales.stream().map(resultadoAnualService::toResponse).toList())
            .boletines(boletines)
            .build();
    }

    @Transactional(readOnly = true)
    public List<LibretaAlumnoResponse> obtenerLibretasDeAlumnos(java.util.Collection<Long> alumnoIds, Long anioId) {
        List<LibretaAlumnoResponse> libretas = new ArrayList<>();
        for (Long alumnoId : alumnoIds) {
            try {
                libretas.add(obtenerLibretaAlumno(alumnoId, anioId, true));
            } catch (Exception e) {
                log.warn("No se pudo obtener libreta del alumno {}: {}", alumnoId, e.getMessage());
            }
        }
        return libretas;
    }
}
```

---

<a id="44-criterioservicejava"></a>
## 44. `CriterioService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/CriterioService.java`

### **¿Qué hace esta clase?**
Gestiona la configuración de criterios de evaluación de un curso y sección. Valida que la suma de porcentajes de los criterios sume exactamente 100% y reconcilia notas pendientes al crearse un criterio nuevo.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.client.PlanificacionClient;
import pe.edu.upeu.eduspace.calificaciones.dto.CriterioRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.CriterioResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.ValidarPesosResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.CierrePeriodo;
import pe.edu.upeu.eduspace.calificaciones.entity.CriterioEvaluacion;
import pe.edu.upeu.eduspace.calificaciones.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.calificaciones.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.calificaciones.repository.CierrePeriodoRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.CriterioEvaluacionRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.NotaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CriterioService {

    private final CriterioEvaluacionRepository criterioRepository;
    private final CierrePeriodoRepository cierrePeriodoRepository;
    private final NotaRepository notaRepository;
    private final PlanificacionClient planificacionClient;
    private final NotaEventoService notaEventoService;
    private final DocenteAutorizacionService autorizacion;

    @Transactional
    public CriterioResponse crearCriterio(CriterioRequest request, Long usuarioId, boolean esAdmin) {
        validarPeriodoAbierto(request.getSeccionId(), request.getPeriodoId());

        if (!esAdmin && usuarioId != null) {
            validarAsignacionDocente(usuarioId, request.getSeccionId(), request.getCursoId());
        }

        criterioRepository.findByPeriodoIdAndSeccionIdAndCursoIdAndNombre(
            request.getPeriodoId(), request.getSeccionId(), request.getCursoId(), request.getNombre().trim()
        ).ifPresent(c -> {
            throw new BusinessRuleException("Ya existe un criterio con el nombre '" + request.getNombre() + "' para este curso y periodo");
        });

        BigDecimal sumaActual = criterioRepository.sumPesoByPeriodoAndSeccionAndCurso(
            request.getPeriodoId(), request.getSeccionId(), request.getCursoId()
        );
        if (sumaActual.add(request.getPeso()).compareTo(new BigDecimal("100.00")) > 0) {
            throw new BusinessRuleException(String.format(
                "La suma total de pesos excedería el 100%% (Actual: %.2f%%, Criterio: %.2f%%)",
                sumaActual, request.getPeso()
            ));
        }

        CriterioEvaluacion criterio = CriterioEvaluacion.builder()
            .anioId(request.getAnioId())
            .periodoId(request.getPeriodoId())
            .seccionId(request.getSeccionId())
            .cursoId(request.getCursoId())
            .nombre(request.getNombre().trim())
            .peso(request.getPeso())
            .origenTipo(request.getOrigenTipo() != null ? request.getOrigenTipo().toUpperCase() : "MANUAL")
            .creadoPor(usuarioId)
            .creadoEn(LocalDateTime.now())
            .build();

        CriterioEvaluacion guardado = criterioRepository.save(criterio);
        log.info("Criterio de evaluación creado: id={}, nombre={}, peso={}", guardado.getId(), guardado.getNombre(), guardado.getPeso());
        int aplicadas = notaEventoService.aplicarPendientes(guardado);
        if (aplicadas > 0) log.info("{} nota(s) pendientes aplicadas al nuevo criterio {}", aplicadas, guardado.getId());
        return toResponse(guardado);
    }

    @Transactional
    public CriterioResponse actualizarCriterio(Long id, CriterioRequest request, Long usuarioId, boolean esAdmin) {
        CriterioEvaluacion criterio = criterioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Criterio no encontrado con ID: " + id));

        validarPeriodoAbierto(criterio.getSeccionId(), criterio.getPeriodoId());

        if (!esAdmin && usuarioId != null) {
            validarAsignacionDocente(usuarioId, criterio.getSeccionId(), criterio.getCursoId());
        }

        // Si cambió de nombre, validar que no choque
        if (!criterio.getNombre().equalsIgnoreCase(request.getNombre().trim())) {
            criterioRepository.findByPeriodoIdAndSeccionIdAndCursoIdAndNombre(
                criterio.getPeriodoId(), criterio.getSeccionId(), criterio.getCursoId(), request.getNombre().trim()
            ).ifPresent(c -> {
                throw new BusinessRuleException("Ya existe un criterio con el nombre '" + request.getNombre() + "'");
            });
        }

        // Validar nueva suma de pesos
        BigDecimal sumaSinActual = criterioRepository.sumPesoByPeriodoAndSeccionAndCurso(
            criterio.getPeriodoId(), criterio.getSeccionId(), criterio.getCursoId()
        ).subtract(criterio.getPeso());

        if (sumaSinActual.add(request.getPeso()).compareTo(new BigDecimal("100.00")) > 0) {
            throw new BusinessRuleException(String.format(
                "La suma total de pesos excedería el 100%% (Actual restante: %.2f%%, Nuevo peso: %.2f%%)",
                sumaSinActual, request.getPeso()
            ));
        }

        criterio.setNombre(request.getNombre().trim());
        criterio.setPeso(request.getPeso());
        if (request.getOrigenTipo() != null) {
            criterio.setOrigenTipo(request.getOrigenTipo().toUpperCase());
        }

        CriterioEvaluacion guardado = criterioRepository.save(criterio);
        return toResponse(guardado);
    }

    @Transactional
    public void eliminarCriterio(Long id, Long usuarioId, boolean esAdmin) {
        CriterioEvaluacion criterio = criterioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Criterio no encontrado con ID: " + id));

        validarPeriodoAbierto(criterio.getSeccionId(), criterio.getPeriodoId());

        if (!esAdmin && usuarioId != null) {
            validarAsignacionDocente(usuarioId, criterio.getSeccionId(), criterio.getCursoId());
        }

        if (!notaRepository.findByCriterioId(id).isEmpty()) {
            throw new BusinessRuleException("No se puede eliminar el criterio porque ya contiene notas registradas");
        }

        criterioRepository.delete(criterio);
        log.info("Criterio de evaluación eliminado: id={}", id);
    }

    @Transactional(readOnly = true)
    public List<CriterioResponse> listarPorCursoYPeriodo(Long periodoId, Long seccionId, Long cursoId) {
        return criterioRepository.findByPeriodoIdAndSeccionIdAndCursoId(periodoId, seccionId, cursoId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public ValidarPesosResponse validarPesos(Long periodoId, Long seccionId, Long cursoId) {
        List<CriterioEvaluacion> lista = criterioRepository.findByPeriodoIdAndSeccionIdAndCursoId(periodoId, seccionId, cursoId);
        BigDecimal suma = lista.stream()
            .map(CriterioEvaluacion::getPeso)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        boolean esValido = suma.compareTo(new BigDecimal("100.00")) == 0;
        String mensaje = esValido
            ? "Los criterios suman exactamente 100.00%"
            : String.format("Los criterios suman %.2f%% (debe ser exactamente 100.00%% para permitir cierre)", suma);

        return ValidarPesosResponse.builder()
            .periodoId(periodoId)
            .seccionId(seccionId)
            .cursoId(cursoId)
            .sumaPesos(suma)
            .esValido(esValido)
            .mensaje(mensaje)
            .criterios(lista.stream().map(this::toResponse).toList())
            .build();
    }

    public void validarPeriodoAbierto(Long seccionId, Long periodoId) {
        cierrePeriodoRepository.findBySeccionIdAndPeriodoId(seccionId, periodoId).ifPresent(c -> {
            if ("CERRADO".equalsIgnoreCase(c.getEstado())) {
                throw new BusinessRuleException(String.format(
                    "El periodo %d de la sección %d se encuentra CERRADO. No se permiten modificaciones.",
                    periodoId, seccionId
                ));
            }
        });
    }

    private void validarAsignacionDocente(Long usuarioId, Long seccionId, Long cursoId) {
        autorizacion.exigirAsignacion(usuarioId, false, seccionId, cursoId);
    }

    public CriterioResponse toResponse(CriterioEvaluacion c) {
        return CriterioResponse.builder()
            .id(c.getId())
            .anioId(c.getAnioId())
            .periodoId(c.getPeriodoId())
            .seccionId(c.getSeccionId())
            .cursoId(c.getCursoId())
            .nombre(c.getNombre())
            .peso(c.getPeso())
            .origenTipo(c.getOrigenTipo())
            .creadoPor(c.getCreadoPor())
            .creadoEn(c.getCreadoEn())
            .build();
    }
}
```

---

<a id="45-docenteautorizacionservicejava"></a>
## 45. `DocenteAutorizacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/DocenteAutorizacionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `DocenteAutorizacion`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.calificaciones.client.PlanificacionClient;
import pe.edu.upeu.eduspace.calificaciones.exception.BusinessRuleException;

/**
 * El docente solo califica en las secciones y cursos que tiene asignados. Si planificacion-ms no responde se
 * DENIEGA (nunca se asume permiso); ADMIN no está sujeto a asignación.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DocenteAutorizacionService {

    private final PlanificacionClient planificacionClient;

    public void exigirAsignacion(Long usuarioId, boolean esAdmin, Long seccionId, Long cursoId) {
        if (esAdmin) return;
        if (usuarioId == null) throw new AccessDeniedException("No se pudo identificar al docente.");
        PlanificacionClient.DocenteInterno docente;
        try {
            docente = planificacionClient.getDocentePorUsuario(usuarioId);
        } catch (feign.FeignException.NotFound e) {
            throw new AccessDeniedException("El usuario no está registrado como docente.");
        } catch (Exception e) {
            log.warn("planificacion-ms no disponible al validar docente: {}", e.getMessage());
            throw new BusinessRuleException("No se puede validar la asignación docente en este momento; intente nuevamente.");
        }
        if (docente == null || docente.docenteId() == null) {
            throw new AccessDeniedException("El usuario no está registrado como docente.");
        }
        boolean asignado;
        try {
            asignado = Boolean.TRUE.equals(planificacionClient.validarAsignacionDocente(docente.docenteId(), seccionId, cursoId));
        } catch (Exception e) {
            log.warn("planificacion-ms no disponible al validar asignación: {}", e.getMessage());
            throw new BusinessRuleException("No se puede validar la asignación docente en este momento; intente nuevamente.");
        }
        if (!asignado) {
            throw new AccessDeniedException("El docente no tiene asignación para este curso y sección.");
        }
    }
}
```

---

<a id="46-matriculalocalservicejava"></a>
## 46. `MatriculaLocalService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/MatriculaLocalService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `MatriculaLocal`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.calificaciones.event.MatriculaEvent;
import pe.edu.upeu.eduspace.calificaciones.repository.MatriculaLocalRepository;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MatriculaLocalService {

    private final MatriculaLocalRepository matriculaLocalRepository;

    @Transactional
    public void sincronizarMatricula(MatriculaEvent evento) {
        if (evento == null || evento.getMatriculaId() == null) {
            return;
        }

        MatriculaLocal local = matriculaLocalRepository.findById(evento.getMatriculaId())
            .orElseGet(() -> MatriculaLocal.builder()
                .matriculaId(evento.getMatriculaId())
                .alumnoId(evento.getAlumnoId())
                .alumnoNombre(evento.getAlumnoNombre() != null ? evento.getAlumnoNombre() : "Alumno " + evento.getAlumnoId())
                .anioId(evento.getAnioId() != null ? evento.getAnioId() : 0L)
                .nivelId(evento.getNivelId())
                .gradoId(evento.getGradoId() != null ? evento.getGradoId() : 0L)
                .seccionId(evento.getSeccionId() != null ? evento.getSeccionId() : 0L)
                .estado(evento.getEstado() != null ? evento.getEstado() : "PRE_MATRICULA")
                .actualizadoEn(LocalDateTime.now())
                .build());

        if (evento.getAlumnoNombre() != null && !evento.getAlumnoNombre().isBlank()) {
            local.setAlumnoNombre(evento.getAlumnoNombre());
        }
        if (evento.getNivelId() != null) {
            local.setNivelId(evento.getNivelId());
        }
        if (evento.getGradoId() != null) {
            local.setGradoId(evento.getGradoId());
        }
        if (evento.getSeccionId() != null) {
            local.setSeccionId(evento.getSeccionId());
        }
        if (evento.getEstado() != null) {
            local.setEstado(evento.getEstado());
        }
        local.setActualizadoEn(LocalDateTime.now());

        matriculaLocalRepository.save(local);
        log.info("Matrícula sincronizada en réplica local: id={}, alumno={}, estado={}",
            local.getMatriculaId(), local.getAlumnoId(), local.getEstado());
    }
}
```

---

<a id="47-notaeventoservicejava"></a>
## 47. `NotaEventoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/NotaEventoService.java`

### **¿Qué hace esta clase?**
Servicio que recibe eventos asíncronos de Kafka (`examen.calificado` y `tarea.calificada`). Busca el criterio asociado con origen automático e inserta o actualiza la nota del alumno de forma transparente.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaPendienteResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.CierrePeriodo;
import pe.edu.upeu.eduspace.calificaciones.entity.CriterioEvaluacion;
import pe.edu.upeu.eduspace.calificaciones.entity.EventoProcesado;
import pe.edu.upeu.eduspace.calificaciones.entity.Nota;
import pe.edu.upeu.eduspace.calificaciones.event.ExamenCalificadoEvent;
import pe.edu.upeu.eduspace.calificaciones.event.TareaCalificadaEvent;
import pe.edu.upeu.eduspace.calificaciones.repository.CierrePeriodoRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.CriterioEvaluacionRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.calificaciones.entity.NotaPendiente;
import pe.edu.upeu.eduspace.calificaciones.repository.NotaPendienteRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.NotaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotaEventoService {

    private final NotaRepository notaRepository;
    private final CriterioEvaluacionRepository criterioRepository;
    private final CierrePeriodoRepository cierrePeriodoRepository;
    private final EventoProcesadoRepository eventoProcesadoRepository;
    private final PromedioService promedioService;
    private final NotaPendienteRepository pendienteRepository;

    @Transactional
    public void procesarTareaCalificada(UUID eventId, TareaCalificadaEvent event) {
        if (eventId != null && eventoProcesadoRepository.existsByEventId(eventId)) {
            log.info("Evento tarea.calificada ya procesado previamente: {}", eventId);
            return;
        }

        procesarNotaExterna(
            "TAREA",
            event.getTareaId(),
            event.getTitulo(),
            event.getAlumnoId(),
            event.getMatriculaId(),
            event.getSeccionId(),
            event.getCursoId(),
            event.getPeriodoId(),
            event.getNota()
        );

        if (eventId != null) {
            eventoProcesadoRepository.save(EventoProcesado.builder()
                .eventId(eventId)
                .eventType("tarea.calificada")
                .procesadoEn(LocalDateTime.now())
                .build());
        }
    }

    @Transactional
    public void procesarExamenCalificado(UUID eventId, ExamenCalificadoEvent event) {
        if (eventId != null && eventoProcesadoRepository.existsByEventId(eventId)) {
            log.info("Evento examen.calificado ya procesado previamente: {}", eventId);
            return;
        }

        procesarNotaExterna(
            "EXAMEN",
            event.getExamenId(),
            event.getTitulo(),
            event.getAlumnoId(),
            event.getMatriculaId(),
            event.getSeccionId(),
            event.getCursoId(),
            event.getPeriodoId(),
            event.getNota()
        );

        if (eventId != null) {
            eventoProcesadoRepository.save(EventoProcesado.builder()
                .eventId(eventId)
                .eventType("examen.calificado")
                .procesadoEn(LocalDateTime.now())
                .build());
        }
    }

    private void procesarNotaExterna(String origen,
                                     Long origenId,
                                     String titulo,
                                     Long alumnoId,
                                     Long matriculaId,
                                     Long seccionId,
                                     Long cursoId,
                                     Long periodoId,
                                     BigDecimal valor) {
        if (matriculaId == null || cursoId == null || periodoId == null || valor == null) {
            log.warn("Evento de nota incompleto recibido de origen {}: origenId={}", origen, origenId);
            return;
        }

        // 1. Verificar si el periodo está CERRADO
        Optional<CierrePeriodo> cierreOpt = cierrePeriodoRepository.findBySeccionIdAndPeriodoId(seccionId, periodoId);
        if (cierreOpt.isPresent() && "CERRADO".equalsIgnoreCase(cierreOpt.get().getEstado())) {
            log.warn("ALERTA DOCENTE: periodo {} de la sección {} CERRADO; la nota de {} {} del alumno {} no se aplica (reabra el periodo para incorporarla).",
                periodoId, seccionId, origen, origenId, alumnoId);
            guardarPendiente("PERIODO_CERRADO", origen, origenId, titulo, alumnoId, matriculaId, seccionId, cursoId, periodoId, valor);
            return;
        }

        // 2. Buscar criterio correspondiente (origenTipo: 'TAREAS' o 'EXAMENES')
        String tipoBuscado = "TAREA".equalsIgnoreCase(origen) ? "TAREAS" : "EXAMENES";
        Optional<CriterioEvaluacion> criterioOpt = criterioRepository.findFirstByPeriodoIdAndSeccionIdAndCursoIdAndOrigenTipo(
            periodoId, seccionId, cursoId, tipoBuscado
        );

        if (criterioOpt.isEmpty()) {
            // El docente no ha creado el criterio aún -> guardar en cola de pendientes visible al docente
            log.info("No existe criterio de tipo {} para curso={}, periodo={}, seccion={}. Guardando en pendientes.",
                tipoBuscado, cursoId, periodoId, seccionId);

            guardarPendiente("PENDIENTE", origen, origenId, titulo, alumnoId, matriculaId, seccionId, cursoId, periodoId, valor);
            return;
        }

        aplicarNota(criterioOpt.get(), origen, origenId, alumnoId, matriculaId, seccionId, cursoId, periodoId, valor);
    }

    private void guardarPendiente(String estado, String origen, Long origenId, String titulo, Long alumnoId,
                                  Long matriculaId, Long seccionId, Long cursoId, Long periodoId, BigDecimal valor) {
        NotaPendiente p = pendienteRepository.findByMatriculaIdAndOrigenAndOrigenId(matriculaId, origen, origenId)
            .orElseGet(() -> NotaPendiente.builder()
                .origen(origen).origenId(origenId).matriculaId(matriculaId).build());
        p.setTitulo(titulo != null ? titulo : origen + " " + origenId);
        p.setAlumnoId(alumnoId);
        p.setSeccionId(seccionId);
        p.setCursoId(cursoId);
        p.setPeriodoId(periodoId);
        p.setValor(valor);
        p.setEstado(estado);
        p.setFechaEvento(LocalDateTime.now());
        p.setAplicadaEn(null);
        pendienteRepository.save(p);
    }

    private void aplicarNota(CriterioEvaluacion criterio, String origen, Long origenId, Long alumnoId, Long matriculaId,
                             Long seccionId, Long cursoId, Long periodoId, BigDecimal valor) {
        // 3. UPSERT por uk_nota_origen: (matricula_id, criterio_id, origen, origen_id)
        Nota nota = notaRepository.findByCriterioAndMatriculaAndOrigen(criterio.getId(), matriculaId, origen, origenId)
            .orElseGet(() -> Nota.builder()
                .matriculaId(matriculaId)
                .alumnoId(alumnoId)
                .seccionId(seccionId)
                .cursoId(cursoId)
                .periodoId(periodoId)
                .criterio(criterio)
                .origen(origen)
                .origenId(origenId)
                .registradoEn(LocalDateTime.now())
                .build());

        nota.setValor(valor);
        nota.setActualizadoEn(LocalDateTime.now());
        notaRepository.save(nota);

        // 4. Recalcular promedio ponderado
        promedioService.calcularYGuardarPromedio(matriculaId, cursoId, periodoId);

        log.info("Nota de {} aplicada exitosamente: matricula={}, curso={}, valor={}", origen, matriculaId, cursoId, valor);
        pendienteRepository.findByMatriculaIdAndOrigenAndOrigenId(matriculaId, origen, origenId).ifPresent(p -> {
            p.setEstado("APLICADA");
            p.setAplicadaEn(LocalDateTime.now());
            pendienteRepository.save(p);
        });
    }

    /** Al crear un criterio TAREAS/EXAMENES: incorpora las notas que esperaban por él. */
    @Transactional
    public int aplicarPendientes(CriterioEvaluacion criterio) {
        String origen = "TAREAS".equalsIgnoreCase(criterio.getOrigenTipo()) ? "TAREA"
                      : "EXAMENES".equalsIgnoreCase(criterio.getOrigenTipo()) ? "EXAMEN" : null;
        if (origen == null) return 0;
        List<NotaPendiente> lista = pendienteRepository.findByPeriodoIdAndSeccionIdAndCursoIdAndOrigenAndEstado(
            criterio.getPeriodoId(), criterio.getSeccionId(), criterio.getCursoId(), origen, "PENDIENTE");
        for (NotaPendiente p : lista) {
            aplicarNota(criterio, origen, p.getOrigenId(), p.getAlumnoId(), p.getMatriculaId(),
                p.getSeccionId(), p.getCursoId(), p.getPeriodoId(), p.getValor());
        }
        return lista.size();
    }

    /** Tras reabrir un periodo: las notas que llegaron con el periodo cerrado se intentan aplicar. */
    @Transactional
    public void reprocesarPeriodoReabierto(Long seccionId, Long periodoId) {
        for (NotaPendiente p : pendienteRepository.findAbiertas(seccionId, null)) {
            if (!"PERIODO_CERRADO".equals(p.getEstado()) || !periodoId.equals(p.getPeriodoId())) continue;
            p.setEstado("PENDIENTE");
            pendienteRepository.save(p);
            String tipo = "TAREA".equals(p.getOrigen()) ? "TAREAS" : "EXAMENES";
            criterioRepository.findFirstByPeriodoIdAndSeccionIdAndCursoIdAndOrigenTipo(periodoId, seccionId, p.getCursoId(), tipo)
                .ifPresent(c -> aplicarNota(c, p.getOrigen(), p.getOrigenId(), p.getAlumnoId(), p.getMatriculaId(),
                    p.getSeccionId(), p.getCursoId(), p.getPeriodoId(), p.getValor()));
        }
    }

    @Transactional(readOnly = true)
    public List<NotaPendienteResponse> listarPendientes(Long seccionId, Long cursoId) {
        return pendienteRepository.findAbiertas(seccionId, cursoId).stream()
            .map(p -> NotaPendienteResponse.builder()
                .id(String.valueOf(p.getId()))
                .origen(p.getOrigen())
                .origenId(p.getOrigenId())
                .titulo(p.getTitulo())
                .alumnoId(p.getAlumnoId())
                .matriculaId(p.getMatriculaId())
                .seccionId(p.getSeccionId())
                .cursoId(p.getCursoId())
                .periodoId(p.getPeriodoId())
                .valor(p.getValor())
                .fechaEvento(p.getFechaEvento())
                .motivo(p.getEstado())
                .build())
            .toList();
    }
}
```

---

<a id="48-notaservicejava"></a>
## 48. `NotaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/NotaService.java`

### **¿Qué hace esta clase?**
Servicio de registro de notas. Procesa el guardado en bloque de notas por parte del profesor, valida rangos permitidos (0-20) y recalcula automáticamente los promedios ponderados en tiempo real.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaItemRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.NotasLoteRequest;
import pe.edu.upeu.eduspace.calificaciones.entity.CriterioEvaluacion;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.calificaciones.entity.Nota;
import pe.edu.upeu.eduspace.calificaciones.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.calificaciones.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.calificaciones.repository.CriterioEvaluacionRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.NotaRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotaService {

    private final NotaRepository notaRepository;
    private final CriterioEvaluacionRepository criterioRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final CriterioService criterioService;
    private final PromedioService promedioService;
    private final DocenteAutorizacionService autorizacion;

    @Transactional
    public NotaResponse registrarOActualizarNota(Long notaId, NotaRequest request, Long usuarioId, boolean esAdmin) {
        autorizacion.exigirAsignacion(usuarioId, esAdmin, request.getSeccionId(), request.getCursoId());
        criterioService.validarPeriodoAbierto(request.getSeccionId(), request.getPeriodoId());

        CriterioEvaluacion criterio = criterioRepository.findById(request.getCriterioId())
            .orElseThrow(() -> new ResourceNotFoundException("Criterio no encontrado con ID: " + request.getCriterioId()));

        MatriculaLocal matricula = matriculaLocalRepository.findById(request.getMatriculaId())
            .orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada con ID: " + request.getMatriculaId()));

        if (!matricula.getSeccionId().equals(request.getSeccionId())) {
            throw new BusinessRuleException("La matrícula no pertenece a la sección especificada");
        }

        Nota nota;
        if (notaId != null) {
            nota = notaRepository.findById(notaId)
                .orElseThrow(() -> new ResourceNotFoundException("Nota no encontrada con ID: " + notaId));
            nota.setValor(request.getValor());
            nota.setActualizadoEn(LocalDateTime.now());
        } else {
            nota = notaRepository.findByCriterioIdAndMatriculaId(criterio.getId(), matricula.getMatriculaId())
                .orElseGet(() -> Nota.builder()
                    .matriculaId(matricula.getMatriculaId())
                    .alumnoId(matricula.getAlumnoId())
                    .seccionId(request.getSeccionId())
                    .cursoId(request.getCursoId())
                    .periodoId(request.getPeriodoId())
                    .criterio(criterio)
                    .origen(request.getOrigen() != null ? request.getOrigen() : "MANUAL")
                    .origenId(request.getOrigenId())
                    .registradoPor(usuarioId)
                    .registradoEn(LocalDateTime.now())
                    .build());

            nota.setValor(request.getValor());
            nota.setActualizadoEn(LocalDateTime.now());
        }

        Nota guardada = notaRepository.save(nota);

        // Recalcular promedio del alumno para este curso y periodo
        promedioService.calcularYGuardarPromedio(matricula.getMatriculaId(), request.getCursoId(), request.getPeriodoId());

        return toResponse(guardada);
    }

    @Transactional
    public List<NotaResponse> registrarNotasLote(NotasLoteRequest request, Long usuarioId, boolean esAdmin) {
        autorizacion.exigirAsignacion(usuarioId, esAdmin, request.getSeccionId(), request.getCursoId());
        criterioService.validarPeriodoAbierto(request.getSeccionId(), request.getPeriodoId());

        CriterioEvaluacion criterio = criterioRepository.findById(request.getCriterioId())
            .orElseThrow(() -> new ResourceNotFoundException("Criterio no encontrado con ID: " + request.getCriterioId()));

        List<NotaResponse> responses = new ArrayList<>();

        for (NotaItemRequest item : request.getNotas()) {
            MatriculaLocal matricula = matriculaLocalRepository.findById(item.getMatriculaId())
                .orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada: " + item.getMatriculaId()));

            if (!matricula.getSeccionId().equals(request.getSeccionId())) {
                throw new BusinessRuleException("El alumno con matrícula " + item.getMatriculaId() + " no pertenece a la sección " + request.getSeccionId());
            }

            Nota nota = notaRepository.findByCriterioIdAndMatriculaId(criterio.getId(), matricula.getMatriculaId())
                .orElseGet(() -> Nota.builder()
                    .matriculaId(matricula.getMatriculaId())
                    .alumnoId(matricula.getAlumnoId())
                    .seccionId(request.getSeccionId())
                    .cursoId(request.getCursoId())
                    .periodoId(request.getPeriodoId())
                    .criterio(criterio)
                    .origen("MANUAL")
                    .registradoPor(usuarioId)
                    .registradoEn(LocalDateTime.now())
                    .build());

            nota.setValor(item.getValor());
            nota.setActualizadoEn(LocalDateTime.now());

            Nota guardada = notaRepository.save(nota);
            promedioService.calcularYGuardarPromedio(matricula.getMatriculaId(), request.getCursoId(), request.getPeriodoId());
            responses.add(toResponse(guardada));
        }

        log.info("Lote de {} notas registradas para criterio id={}, seccionId={}", responses.size(), criterio.getId(), request.getSeccionId());
        return responses;
    }

    public NotaResponse toResponse(Nota n) {
        return NotaResponse.builder()
            .id(n.getId())
            .matriculaId(n.getMatriculaId())
            .alumnoId(n.getAlumnoId())
            .seccionId(n.getSeccionId())
            .cursoId(n.getCursoId())
            .periodoId(n.getPeriodoId())
            .criterioId(n.getCriterio().getId())
            .criterioNombre(n.getCriterio().getNombre())
            .valor(n.getValor())
            .origen(n.getOrigen())
            .origenId(n.getOrigenId())
            .registradoPor(n.getRegistradoPor())
            .registradoEn(n.getRegistradoEn())
            .actualizadoEn(n.getActualizadoEn())
            .build();
    }
}
```

---

<a id="49-promedioservicejava"></a>
## 49. `PromedioService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/PromedioService.java`

### **¿Qué hace esta clase?**
Calcula los promedios ponderados del periodo escolar: `SUMA(Nota * Peso) / SUMA(Pesos)` y realiza la conversión a la escala literal según los estándares de evaluación escolar.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.client.PlanificacionClient;
import pe.edu.upeu.eduspace.calificaciones.dto.PromedioResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.CriterioEvaluacion;
import pe.edu.upeu.eduspace.calificaciones.entity.EscalaLiteral;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.calificaciones.entity.Nota;
import pe.edu.upeu.eduspace.calificaciones.entity.PromedioPeriodo;
import pe.edu.upeu.eduspace.calificaciones.repository.CriterioEvaluacionRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.EscalaLiteralRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.NotaRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.PromedioPeriodoRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class PromedioService {

    private final PromedioPeriodoRepository promedioRepository;
    private final CriterioEvaluacionRepository criterioRepository;
    private final NotaRepository notaRepository;
    private final EscalaLiteralRepository escalaLiteralRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final PlanificacionClient planificacionClient;

    private static final String NIVEL_POR_DEFECTO = "PRIMARIA";
    private final Map<Long, String> codigosNivel = new ConcurrentHashMap<>();

    /** Código del nivel de la matrícula (INICIAL, PRIMARIA…); si no se puede resolver, la escala PRIMARIA. */
    public String nivelCodigo(MatriculaLocal matricula) {
        if (matricula == null || matricula.getNivelId() == null) return NIVEL_POR_DEFECTO;
        Long nivelId = matricula.getNivelId();
        String cacheado = codigosNivel.get(nivelId);
        if (cacheado != null) return cacheado;
        try {
            Object codigo = planificacionClient.getNivelPorId(nivelId).get("codigo");
            if (codigo != null) {
                codigosNivel.put(nivelId, codigo.toString());
                return codigo.toString();
            }
        } catch (Exception e) {
            log.warn("No se pudo resolver el nivel {}: se usa la escala {}", nivelId, NIVEL_POR_DEFECTO);
        }
        return NIVEL_POR_DEFECTO;
    }

    @Transactional
    public PromedioPeriodo calcularYGuardarPromedio(Long matriculaId, Long cursoId, Long periodoId) {
        MatriculaLocal matricula = matriculaLocalRepository.findById(matriculaId).orElse(null);
        Long seccionId = matricula != null ? matricula.getSeccionId() : 0L;
        Long alumnoId = matricula != null ? matricula.getAlumnoId() : 0L;

        List<CriterioEvaluacion> criterios = criterioRepository.findByPeriodoIdAndSeccionIdAndCursoId(periodoId, seccionId, cursoId);
        if (criterios.isEmpty()) {
            return null;
        }

        BigDecimal sumaPonderada = BigDecimal.ZERO;
        BigDecimal sumaPesosEvaluados = BigDecimal.ZERO;

        for (CriterioEvaluacion criterio : criterios) {
            List<Nota> notasCriterio = notaRepository.findByMatriculaIdAndCriterioId(matriculaId, criterio.getId());
            if (!notasCriterio.isEmpty()) {
                // Si hay varias notas (ej: múltiples tareas o exámenes bajo este criterio), promedio simple
                BigDecimal promedioCriterio = notasCriterio.stream()
                    .map(Nota::getValor)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .divide(BigDecimal.valueOf(notasCriterio.size()), 4, RoundingMode.HALF_UP);

                BigDecimal ponderacion = promedioCriterio.multiply(criterio.getPeso())
                    .divide(new BigDecimal("100.00"), 4, RoundingMode.HALF_UP);

                sumaPonderada = sumaPonderada.add(ponderacion);
                sumaPesosEvaluados = sumaPesosEvaluados.add(criterio.getPeso());
            }
        }

        // Si la suma de pesos evaluados es mayor a 0 pero no llega a 100 en borrador, normalizar o mantener según diseño
        // Regla §3.4: "Si un criterio no tiene notas todavía, se calcula con los criterios disponibles y el promedio queda BORRADOR"
        BigDecimal promedioFinal;
        if (sumaPesosEvaluados.compareTo(BigDecimal.ZERO) > 0) {
            if (sumaPesosEvaluados.compareTo(new BigDecimal("100.00")) == 0) {
                promedioFinal = sumaPonderada.setScale(2, RoundingMode.HALF_UP);
            } else {
                // Normalizado proporcional a los pesos evaluados para estimación borrador
                promedioFinal = sumaPonderada.multiply(new BigDecimal("100.00"))
                    .divide(sumaPesosEvaluados, 2, RoundingMode.HALF_UP);
            }
        } else {
            promedioFinal = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        String literal = obtenerLiteral(promedioFinal, nivelCodigo(matricula));

        PromedioPeriodo promedio = promedioRepository.findByMatriculaIdAndCursoIdAndPeriodoId(matriculaId, cursoId, periodoId)
            .orElseGet(() -> PromedioPeriodo.builder()
                .matriculaId(matriculaId)
                .alumnoId(alumnoId)
                .seccionId(seccionId)
                .cursoId(cursoId)
                .periodoId(periodoId)
                .estado("BORRADOR")
                .build());

        promedio.setPromedio(promedioFinal);
        promedio.setLiteral(literal);
        promedio.setCalculadoEn(LocalDateTime.now());

        PromedioPeriodo guardado = promedioRepository.save(promedio);
        log.debug("Promedio calculado: matricula={}, curso={}, periodo={}, promedio={}, literal={}",
            matriculaId, cursoId, periodoId, promedioFinal, literal);
        return guardado;
    }

    public String obtenerLiteral(BigDecimal nota, String nivelCodigo) {
        if (nota == null) return null;
        return escalaLiteralRepository.findByNivelCodigoAndNota(nivelCodigo, nota)
            .or(() -> NIVEL_POR_DEFECTO.equals(nivelCodigo) ? java.util.Optional.empty()
                : escalaLiteralRepository.findByNivelCodigoAndNota(NIVEL_POR_DEFECTO, nota))
            .map(EscalaLiteral::getLiteral)
            .orElseGet(() -> {
                double val = nota.doubleValue();
                if (val >= 18.0) return "AD";
                if (val >= 14.0) return "A";
                if (val >= 11.0) return "B";
                return "C";
            });
    }

    public PromedioResponse toResponse(PromedioPeriodo p, String alumnoNombre) {
        return PromedioResponse.builder()
            .id(p.getId())
            .matriculaId(p.getMatriculaId())
            .alumnoId(p.getAlumnoId())
            .alumnoNombre(alumnoNombre)
            .seccionId(p.getSeccionId())
            .cursoId(p.getCursoId())
            .periodoId(p.getPeriodoId())
            .promedio(p.getPromedio())
            .literal(p.getLiteral())
            .estado(p.getEstado())
            .calculadoEn(p.getCalculadoEn())
            .build();
    }
}
```

---

<a id="50-resultadoanualservicejava"></a>
## 50. `ResultadoAnualService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/service/ResultadoAnualService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `ResultadoAnual`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.calificaciones.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.dto.ResultadoAnualResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.calificaciones.entity.PromedioPeriodo;
import pe.edu.upeu.eduspace.calificaciones.entity.ResultadoAnual;
import pe.edu.upeu.eduspace.calificaciones.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.PromedioPeriodoRepository;
import pe.edu.upeu.eduspace.calificaciones.repository.ResultadoAnualRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResultadoAnualService {

    private final ResultadoAnualRepository resultadoAnualRepository;
    private final PromedioPeriodoRepository promedioRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final PromedioService promedioService;

    @Transactional
    public List<ResultadoAnualResponse> calcularResultadosSeccion(Long seccionId) {
        List<MatriculaLocal> matriculas = matriculaLocalRepository.findBySeccionId(seccionId);
        List<ResultadoAnualResponse> responses = new ArrayList<>();

        for (MatriculaLocal m : matriculas) {
            List<ResultadoAnual> resultados = calcularResultadosMatricula(m);
            responses.addAll(resultados.stream().map(this::toResponse).toList());
        }

        return responses;
    }

    @Transactional
    public List<ResultadoAnual> calcularResultadosMatricula(MatriculaLocal matricula) {
        List<PromedioPeriodo> promedios = promedioRepository.findByMatriculaId(matricula.getMatriculaId());

        // Agrupar por curso
        Map<Long, List<PromedioPeriodo>> porCurso = promedios.stream()
            .collect(Collectors.groupingBy(PromedioPeriodo::getCursoId));

        List<ResultadoAnual> lista = new ArrayList<>();

        for (Map.Entry<Long, List<PromedioPeriodo>> entry : porCurso.entrySet()) {
            Long cursoId = entry.getKey();
            List<PromedioPeriodo> promsCurso = entry.getValue();

            if (promsCurso.isEmpty()) continue;

            // Promedio simple de los periodos
            BigDecimal suma = promsCurso.stream()
                .map(PromedioPeriodo::getPromedio)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal promedioFinal = suma.divide(BigDecimal.valueOf(promsCurso.size()), 2, RoundingMode.HALF_UP);

            // Regla de promoción (§3.4):
            // APROBADO: >= 11.00
            // RECUPERACION: >= 8.00 y < 11.00
            // DESAPROBADO: < 8.00
            String estado;
            if (promedioFinal.compareTo(new BigDecimal("11.00")) >= 0) {
                estado = "APROBADO";
            } else if (promedioFinal.compareTo(new BigDecimal("8.00")) >= 0) {
                estado = "RECUPERACION";
            } else {
                estado = "DESAPROBADO";
            }

            String literal = promedioService.obtenerLiteral(promedioFinal, promedioService.nivelCodigo(matricula));

            ResultadoAnual res = resultadoAnualRepository.findByMatriculaIdAndCursoId(matricula.getMatriculaId(), cursoId)
                .orElseGet(() -> ResultadoAnual.builder()
                    .matriculaId(matricula.getMatriculaId())
                    .alumnoId(matricula.getAlumnoId())
                    .anioId(matricula.getAnioId())
                    .cursoId(cursoId)
                    .build());

            res.setPromedioFinal(promedioFinal);
            res.setLiteral(literal);
            res.setEstado(estado);
            res.setCalculadoEn(LocalDateTime.now());

            lista.add(resultadoAnualRepository.save(res));
        }

        return lista;
    }

    public ResultadoAnualResponse toResponse(ResultadoAnual r) {
        return ResultadoAnualResponse.builder()
            .id(r.getId())
            .matriculaId(r.getMatriculaId())
            .alumnoId(r.getAlumnoId())
            .anioId(r.getAnioId())
            .cursoId(r.getCursoId())
            .promedioFinal(r.getPromedioFinal())
            .literal(r.getLiteral())
            .estado(r.getEstado())
            .calculadoEn(r.getCalculadoEn())
            .build();
    }
}
```

---

<a id="51-boletincontrollerjava"></a>
## 51. `BoletinController.java` — Controladores REST API

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/controller/BoletinController.java`

### **¿Qué hace esta clase?**
Controlador REST para la generación, consulta y descarga de boletines y libretas de calificaciones oficiales (`/api/boletines`).

```java
package pe.edu.upeu.eduspace.calificaciones.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.eduspace.calificaciones.dto.BoletinResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.GenerarBoletinRequest;
import pe.edu.upeu.eduspace.calificaciones.service.BoletinService;

import java.util.List;
import java.util.Map;

@Tag(name = "Boletines Oficiales", description = "Generación y descarga de boletines académicos oficiales en MinIO")
@RestController
@RequestMapping("/api/v1/calificaciones/boletines")
@RequiredArgsConstructor
public class BoletinController {

    private final BoletinService boletinService;
    private final pe.edu.upeu.eduspace.calificaciones.security.IdentidadService identidad;

    @Operation(summary = "Generar boletines oficiales (por alumno o toda la sección)")
    @PostMapping("/generar")
    @PreAuthorize("hasAnyRole('SECRETARIA', 'ADMIN')")
    public ResponseEntity<List<BoletinResponse>> generarBoletines(
            @Valid @RequestBody GenerarBoletinRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        return ResponseEntity.ok(boletinService.generarBoletines(request, usuarioId));
    }

    @Operation(summary = "Obtener URL prefirmada de descarga de MinIO para un boletín")
    @GetMapping("/{id}/url")
    @PreAuthorize("hasAnyRole('ALUMNO', 'APODERADO', 'DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<Map<String, String>> obtenerUrlDescarga(@PathVariable("id") Long id,
                                                                  @AuthenticationPrincipal Jwt jwt) {
        identidad.exigirAcceso(jwt, boletinService.obtenerPorId(id).getAlumnoId());
        String url = boletinService.obtenerUrlDescarga(id);
        return ResponseEntity.ok(Map.of("boletinId", String.valueOf(id), "urlDescarga", url));
    }

    @Operation(summary = "Consultar el detalle de un boletín")
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ALUMNO', 'APODERADO', 'DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<BoletinResponse> obtenerPorId(@PathVariable("id") Long id,
                                                        @AuthenticationPrincipal Jwt jwt) {
        BoletinResponse b = boletinService.obtenerPorId(id);
        identidad.exigirAcceso(jwt, b.getAlumnoId());
        return ResponseEntity.ok(b);
    }

    @Operation(summary = "Listar los boletines generados para un alumno")
    @GetMapping
    @PreAuthorize("hasAnyRole('ALUMNO', 'APODERADO', 'DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<List<BoletinResponse>> listarBoletinesPorAlumno(@RequestParam("alumnoId") Long alumnoId,
                                                                          @AuthenticationPrincipal Jwt jwt) {
        identidad.exigirAcceso(jwt, alumnoId);
        return ResponseEntity.ok(boletinService.listarBoletinesPorAlumno(alumnoId));
    }

    private Long extraerUsuarioId(Jwt jwt) {
        if (jwt == null) return null;
        Object val = jwt.getClaim("usuarioId");
        if (val instanceof Number n) return n.longValue();
        if (val instanceof String s && !s.isBlank()) {
            try { return Long.parseLong(s); } catch (NumberFormatException ignored) {}
        }
        try {
            return Long.parseLong(jwt.getSubject());
        } catch (Exception ignored) {
            return null;
        }
    }
}
```

---

<a id="52-calificacionescontrollerjava"></a>
## 52. `CalificacionesController.java` — Controladores REST API

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/controller/CalificacionesController.java`

### **¿Qué hace esta clase?**
Controlador REST para el registro auxiliar docente. Permite consultar la grilla de notas de una sección por curso y registrar calificaciones en bloque (`/api/calificaciones`).

```java
package pe.edu.upeu.eduspace.calificaciones.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.eduspace.calificaciones.dto.CierrePeriodoRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.CierrePeriodoResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.LibretaAlumnoResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaPendienteResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.NotasLoteRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.PromedioResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.ReaperturaRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.RegistroNotasSeccionResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.ResultadoAnualResponse;
import pe.edu.upeu.eduspace.calificaciones.service.CierrePeriodoService;
import pe.edu.upeu.eduspace.calificaciones.service.ConsultaService;
import pe.edu.upeu.eduspace.calificaciones.service.NotaEventoService;
import pe.edu.upeu.eduspace.calificaciones.service.NotaService;
import pe.edu.upeu.eduspace.calificaciones.service.ResultadoAnualService;

import java.util.List;

@Tag(name = "Calificaciones y Notas", description = "Registro de notas, matriz de sección, cierres de periodo, libretas y resultados anuales")
@RestController
@RequestMapping("/api/v1/calificaciones")
@RequiredArgsConstructor
public class CalificacionesController {

    private final pe.edu.upeu.eduspace.calificaciones.security.IdentidadService identidad;

    private final NotaService notaService;
    private final NotaEventoService notaEventoService;
    private final CierrePeriodoService cierrePeriodoService;
    private final ConsultaService consultaService;
    private final ResultadoAnualService resultadoAnualService;

    @Operation(summary = "Obtener matriz de registro auxiliar de la sección (alumnos x criterios)")
    @GetMapping("/registro")
    @PreAuthorize("hasAnyRole('DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<RegistroNotasSeccionResponse> obtenerRegistro(
            @RequestParam("seccionId") Long seccionId,
            @RequestParam("cursoId") Long cursoId,
            @RequestParam("periodoId") Long periodoId) {
        return ResponseEntity.ok(consultaService.obtenerRegistroSeccion(seccionId, cursoId, periodoId));
    }

    @Operation(summary = "Registrar notas de toda una sección en lote para un criterio")
    @PutMapping("/notas/lote")
    @PreAuthorize("hasAnyRole('DOCENTE', 'ADMIN')")
    public ResponseEntity<List<NotaResponse>> registrarNotasLote(
            @Valid @RequestBody NotasLoteRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        return ResponseEntity.ok(notaService.registrarNotasLote(request, usuarioId, identidad.roles(jwt).contains("ADMIN")));
    }

    @Operation(summary = "Actualizar una nota individual")
    @PutMapping("/notas/{id}")
    @PreAuthorize("hasAnyRole('DOCENTE', 'ADMIN')")
    public ResponseEntity<NotaResponse> actualizarNota(
            @PathVariable("id") Long id,
            @Valid @RequestBody NotaRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        return ResponseEntity.ok(notaService.registrarOActualizarNota(id, request, usuarioId, identidad.roles(jwt).contains("ADMIN")));
    }

    @Operation(summary = "Consultar notas recibidas de tareas o exámenes pendientes de asignar criterio")
    @GetMapping("/pendientes-asignar")
    @PreAuthorize("hasAnyRole('DOCENTE', 'ADMIN')")
    public ResponseEntity<List<NotaPendienteResponse>> listarPendientesAsignar(
            @RequestParam(value = "seccionId", required = false) Long seccionId,
            @RequestParam(value = "cursoId", required = false) Long cursoId) {
        return ResponseEntity.ok(notaEventoService.listarPendientes(seccionId, cursoId));
    }

    @Operation(summary = "Cerrar periodo académico para una sección (congela promedios)")
    @PostMapping("/periodos/cerrar")
    @PreAuthorize("hasAnyRole('SECRETARIA', 'ADMIN')")
    public ResponseEntity<CierrePeriodoResponse> cerrarPeriodo(
            @Valid @RequestBody CierrePeriodoRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        return ResponseEntity.ok(cierrePeriodoService.cerrarPeriodo(request, usuarioId));
    }

    @Operation(summary = "Reabrir periodo académico cerrado (exclusivo ADMIN con motivo auditado)")
    @PostMapping("/periodos/reabrir")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CierrePeriodoResponse> reabrirPeriodo(
            @Valid @RequestBody ReaperturaRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        return ResponseEntity.ok(cierrePeriodoService.reabrirPeriodo(request, usuarioId));
    }

    @Operation(summary = "Consultar promedios de todos los alumnos de una sección en un periodo")
    @GetMapping("/promedios")
    @PreAuthorize("hasAnyRole('DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<List<PromedioResponse>> obtenerPromediosSeccion(
            @RequestParam("seccionId") Long seccionId,
            @RequestParam("periodoId") Long periodoId) {
        return ResponseEntity.ok(consultaService.obtenerPromediosSeccion(seccionId, periodoId));
    }

    @Operation(summary = "Consultar libreta oficial de calificaciones de un alumno")
    @GetMapping("/alumnos/{alumnoId}/libreta")
    @PreAuthorize("hasAnyRole('ALUMNO', 'APODERADO', 'DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<LibretaAlumnoResponse> obtenerLibretaAlumno(
            @PathVariable("alumnoId") Long alumnoId,
            @RequestParam(value = "anioId", required = false) Long anioId,
            @AuthenticationPrincipal Jwt jwt) {
        identidad.exigirAcceso(jwt, alumnoId);
        boolean esAlumnoOApoderado = !identidad.esStaff(jwt);
        return ResponseEntity.ok(consultaService.obtenerLibretaAlumno(alumnoId, anioId, esAlumnoOApoderado));
    }

    @Operation(summary = "Consultar resultados anuales de promoción por sección")
    @GetMapping("/resultados-anuales")
    @PreAuthorize("hasAnyRole('SECRETARIA', 'ADMIN')")
    public ResponseEntity<List<ResultadoAnualResponse>> obtenerResultadosAnuales(
            @RequestParam("seccionId") Long seccionId) {
        return ResponseEntity.ok(resultadoAnualService.calcularResultadosSeccion(seccionId));
    }

    @Operation(summary = "Consultar libretas de los hijos del apoderado autenticado")
    @GetMapping("/mias")
    @PreAuthorize("hasAnyRole('APODERADO', 'ALUMNO')")
    public ResponseEntity<List<LibretaAlumnoResponse>> obtenerLibretasMias(
            @RequestParam(value = "anioId", required = false) Long anioId,
            @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(consultaService.obtenerLibretasDeAlumnos(identidad.alumnosDelUsuario(jwt), anioId));
    }

    private Long extraerUsuarioId(Jwt jwt) {
        if (jwt == null) return null;
        Object val = jwt.getClaim("usuarioId");
        if (val instanceof Number n) return n.longValue();
        if (val instanceof String s && !s.isBlank()) {
            try { return Long.parseLong(s); } catch (NumberFormatException ignored) {}
        }
        try {
            return Long.parseLong(jwt.getSubject());
        } catch (Exception ignored) {
            return null;
        }
    }
}
```

---

<a id="53-criteriocontrollerjava"></a>
## 53. `CriterioController.java` — Controladores REST API

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/controller/CriterioController.java`

### **¿Qué hace esta clase?**
Controlador REST para la configuración de criterios de evaluación y ponderaciones de cursos (`/api/criterios`).

```java
package pe.edu.upeu.eduspace.calificaciones.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.upeu.eduspace.calificaciones.dto.CriterioRequest;
import pe.edu.upeu.eduspace.calificaciones.dto.CriterioResponse;
import pe.edu.upeu.eduspace.calificaciones.dto.ValidarPesosResponse;
import pe.edu.upeu.eduspace.calificaciones.service.CriterioService;

import java.util.List;

@Tag(name = "Criterios de Evaluación", description = "Gestión de criterios y ponderaciones por periodo, sección y curso")
@RestController
@RequestMapping("/api/v1/calificaciones/criterios")
@RequiredArgsConstructor
public class CriterioController {

    private final CriterioService criterioService;
    private final pe.edu.upeu.eduspace.calificaciones.security.IdentidadService identidad;

    @Operation(summary = "Listar criterios de un curso y periodo")
    @GetMapping
    @PreAuthorize("hasAnyRole('DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<List<CriterioResponse>> listarCriterios(
            @RequestParam("periodoId") Long periodoId,
            @RequestParam("seccionId") Long seccionId,
            @RequestParam("cursoId") Long cursoId) {
        return ResponseEntity.ok(criterioService.listarPorCursoYPeriodo(periodoId, seccionId, cursoId));
    }

    @Operation(summary = "Crear un nuevo criterio de evaluación")
    @PostMapping
    @PreAuthorize("hasAnyRole('DOCENTE', 'ADMIN')")
    public ResponseEntity<CriterioResponse> crearCriterio(
            @Valid @RequestBody CriterioRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        boolean esAdmin = esAdmin(jwt);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(criterioService.crearCriterio(request, usuarioId, esAdmin));
    }

    @Operation(summary = "Actualizar un criterio existente")
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('DOCENTE', 'ADMIN')")
    public ResponseEntity<CriterioResponse> actualizarCriterio(
            @PathVariable("id") Long id,
            @Valid @RequestBody CriterioRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        boolean esAdmin = esAdmin(jwt);
        return ResponseEntity.ok(criterioService.actualizarCriterio(id, request, usuarioId, esAdmin));
    }

    @Operation(summary = "Eliminar un criterio de evaluación")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('DOCENTE', 'ADMIN')")
    public ResponseEntity<Void> eliminarCriterio(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal Jwt jwt) {
        Long usuarioId = extraerUsuarioId(jwt);
        boolean esAdmin = esAdmin(jwt);
        criterioService.eliminarCriterio(id, usuarioId, esAdmin);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Validar si la suma de pesos de un curso y periodo alcanza el 100%")
    @GetMapping("/validar")
    @PreAuthorize("hasAnyRole('DOCENTE', 'SECRETARIA', 'ADMIN')")
    public ResponseEntity<ValidarPesosResponse> validarPesos(
            @RequestParam("periodoId") Long periodoId,
            @RequestParam("seccionId") Long seccionId,
            @RequestParam("cursoId") Long cursoId) {
        return ResponseEntity.ok(criterioService.validarPesos(periodoId, seccionId, cursoId));
    }

    private Long extraerUsuarioId(Jwt jwt) {
        if (jwt == null) return null;
        Object val = jwt.getClaim("usuarioId");
        if (val instanceof Number n) return n.longValue();
        if (val instanceof String s && !s.isBlank()) {
            try { return Long.parseLong(s); } catch (NumberFormatException ignored) {}
        }
        try {
            return Long.parseLong(jwt.getSubject());
        } catch (Exception ignored) {
            return null;
        }
    }

    private boolean esAdmin(Jwt jwt) {
        return identidad.roles(jwt).contains("ADMIN");
    }
}
```

---

<a id="54-boletineventproducerjava"></a>
## 54. `BoletinEventProducer.java` — Mensajería Kafka (Consumers / Publishers)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/BoletinEventProducer.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.calificaciones.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import tools.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.calificaciones.config.KafkaConfig;
import pe.edu.upeu.eduspace.calificaciones.event.BoletinGeneradoEvent;
import pe.edu.upeu.eduspace.calificaciones.event.EventoSobre;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class BoletinEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public void publicarBoletinGenerado(BoletinGeneradoEvent payload) {
        EventoSobre<BoletinGeneradoEvent> sobre = EventoSobre.<BoletinGeneradoEvent>builder()
            .eventId(UUID.randomUUID())
            .eventType(KafkaConfig.TOPIC_BOLETIN_GENERADO)
            .occurredAt(LocalDateTime.now())
            .version(1)
            .traceId(UUID.randomUUID().toString())
            .payload(payload)
            .build();

        String key = String.valueOf(payload.getBoletinId());
        kafkaTemplate.send(KafkaConfig.TOPIC_BOLETIN_GENERADO, key, EventoSobre.escribir(objectMapper, sobre));
        log.info("Evento boletin.generado publicado: boletinId={}, alumnoId={}", payload.getBoletinId(), payload.getAlumnoId());
    }
}
```

---

<a id="55-examencalificadoconsumerjava"></a>
## 55. `ExamenCalificadoConsumer.java` — Mensajería Kafka (Consumers / Publishers)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/ExamenCalificadoConsumer.java`

### **¿Qué hace esta clase?**
Consumidor Kafka que escucha eventos `examen.calificado` emitidos por `examenes-ms`. Entrega el payload a `NotaEventoService` para autocompletar la nota en el registro auxiliar del docente.

```java
package pe.edu.upeu.eduspace.calificaciones.messaging;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.config.KafkaConfig;
import pe.edu.upeu.eduspace.calificaciones.event.EventoSobre;
import pe.edu.upeu.eduspace.calificaciones.event.ExamenCalificadoEvent;
import pe.edu.upeu.eduspace.calificaciones.service.NotaEventoService;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExamenCalificadoConsumer {

    private final NotaEventoService notaEventoService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = KafkaConfig.TOPIC_EXAMEN_CALIFICADO, groupId = "calificaciones-ms")
    @Transactional
    public void procesarExamenCalificado(String mensajeJson) {
        try {
            EventoSobre<ExamenCalificadoEvent> sobre = EventoSobre.leer(objectMapper, mensajeJson, ExamenCalificadoEvent.class);

            if (sobre.getTraceId() != null) {
                MDC.put("traceId", sobre.getTraceId());
            }

            log.info("Recibido evento examen.calificado: eventId={}, examenId={}, nota={}",
                sobre.getEventId(), sobre.getPayload().getExamenId(), sobre.getPayload().getNota());

            notaEventoService.procesarExamenCalificado(sobre.getEventId(), sobre.getPayload());
        } catch (Exception e) {
            log.error("Error al procesar evento examen.calificado: {}", e.getMessage(), e);
        } finally {
            MDC.remove("traceId");
        }
    }
}
```

---

<a id="56-matriculaeventconsumerjava"></a>
## 56. `MatriculaEventConsumer.java` — Mensajería Kafka (Consumers / Publishers)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/MatriculaEventConsumer.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Kafka que escucha el topic `matricula.creada` emitido por el microservicio de matrícula. Al recibir una nueva matrícula, replica los datos en `matriculas_local` y dispara el `GeneradorCuotasService` para crear las cuotas de pensión y matrícula.

```java
package pe.edu.upeu.eduspace.calificaciones.messaging;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.config.KafkaConfig;
import pe.edu.upeu.eduspace.calificaciones.entity.EventoProcesado;
import pe.edu.upeu.eduspace.calificaciones.event.EventoSobre;
import pe.edu.upeu.eduspace.calificaciones.event.MatriculaEvent;
import pe.edu.upeu.eduspace.calificaciones.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.calificaciones.service.MatriculaLocalService;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class MatriculaEventConsumer {

    private final EventoProcesadoRepository eventoProcesadoRepository;
    private final MatriculaLocalService matriculaLocalService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = {
        KafkaConfig.TOPIC_MATRICULA_CREADA,
        KafkaConfig.TOPIC_MATRICULA_CONFIRMADA,
        KafkaConfig.TOPIC_MATRICULA_TRASLADADA,
        KafkaConfig.TOPIC_MATRICULA_RETIRADA,
        KafkaConfig.TOPIC_MATRICULA_ANULADA
    }, groupId = "calificaciones-ms")
    @Transactional
    public void procesarEventoMatricula(String mensajeJson) {
        try {
            EventoSobre<MatriculaEvent> sobre = EventoSobre.leer(objectMapper, mensajeJson, MatriculaEvent.class);

            if (sobre.getTraceId() != null) {
                MDC.put("traceId", sobre.getTraceId());
            }

            if (eventoProcesadoRepository.existsByEventId(sobre.getEventId())) {
                log.info("Evento ya procesado en calificaciones-ms: {}. Omitiendo.", sobre.getEventId());
                return;
            }

            eventoProcesadoRepository.save(EventoProcesado.builder()
                .eventId(sobre.getEventId())
                .eventType(sobre.getEventType())
                .procesadoEn(LocalDateTime.now())
                .build());

            MatriculaEvent event = sobre.getPayload();
            matriculaLocalService.sincronizarMatricula(event);
        } catch (Exception e) {
            log.error("Error al procesar evento de matrícula en calificaciones-ms: {}", e.getMessage(), e);
        } finally {
            MDC.remove("traceId");
        }
    }
}
```

---

<a id="57-tareacalificadaconsumerjava"></a>
## 57. `TareaCalificadaConsumer.java` — Mensajería Kafka (Consumers / Publishers)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/messaging/TareaCalificadaConsumer.java`

### **¿Qué hace esta clase?**
Consumidor Kafka que escucha eventos `tarea.calificada` de `tareas-ms` para asentar notas de tareas en el registro docente de forma automática.

```java
package pe.edu.upeu.eduspace.calificaciones.messaging;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.config.KafkaConfig;
import pe.edu.upeu.eduspace.calificaciones.event.EventoSobre;
import pe.edu.upeu.eduspace.calificaciones.event.TareaCalificadaEvent;
import pe.edu.upeu.eduspace.calificaciones.service.NotaEventoService;

@Slf4j
@Component
@RequiredArgsConstructor
public class TareaCalificadaConsumer {

    private final NotaEventoService notaEventoService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = KafkaConfig.TOPIC_TAREA_CALIFICADA, groupId = "calificaciones-ms")
    @Transactional
    public void procesarTareaCalificada(String mensajeJson) {
        try {
            EventoSobre<TareaCalificadaEvent> sobre = EventoSobre.leer(objectMapper, mensajeJson, TareaCalificadaEvent.class);

            if (sobre.getTraceId() != null) {
                MDC.put("traceId", sobre.getTraceId());
            }

            log.info("Recibido evento tarea.calificada: eventId={}, tareaId={}, nota={}",
                sobre.getEventId(), sobre.getPayload().getTareaId(), sobre.getPayload().getNota());

            notaEventoService.procesarTareaCalificada(sobre.getEventId(), sobre.getPayload());
        } catch (Exception e) {
            log.error("Error al procesar evento tarea.calificada: {}", e.getMessage(), e);
        } finally {
            MDC.remove("traceId");
        }
    }
}
```

---

<a id="58-boletingeneradoeventjava"></a>
## 58. `BoletinGeneradoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/BoletinGeneradoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.calificaciones.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoletinGeneradoEvent {

    private Long boletinId;
    private Long alumnoId;
    private Long matriculaId;
    private Long periodoId;
    private String periodoNombre;
}
```

---

<a id="59-eventosobrejava"></a>
## 59. `EventoSobre.java` — Eventos de Dominio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/EventoSobre.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.calificaciones.event;

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

<a id="60-examencalificadoeventjava"></a>
## 60. `ExamenCalificadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/ExamenCalificadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.calificaciones.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamenCalificadoEvent {

    private Long examenId;
    private Long intentoId;
    private Long alumnoId;
    private Long matriculaId;
    private Long seccionId;
    private Long cursoId;
    private Long periodoId;
    private String titulo;
    private BigDecimal nota; // Escala 0-20
}
```

---

<a id="61-matriculaeventjava"></a>
## 61. `MatriculaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/MatriculaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.calificaciones.event;

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
}
```

---

<a id="62-tareacalificadaeventjava"></a>
## 62. `TareaCalificadaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/event/TareaCalificadaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio para publicación o recepción en Apache Kafka.

```java
package pe.edu.upeu.eduspace.calificaciones.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TareaCalificadaEvent {

    private Long tareaId;
    private Long entregaId;
    private Long alumnoId;
    private Long matriculaId;
    private Long seccionId;
    private Long cursoId;
    private Long periodoId;
    private String titulo;
    private BigDecimal nota; // Escala 0-20
    private BigDecimal puntajeMaximo;
}
```

---

<a id="63-limpiezajobjava"></a>
## 63. `LimpiezaJob.java` — Tareas Programadas (Schedulers / Jobs)

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/scheduler/LimpiezaJob.java`

### **¿Qué hace esta clase?**
Tarea en segundo plano (Scheduler) ejecutada periódicamente mediante cron para mantenimiento y procesos automáticos de `Limpieza`.

```java
package pe.edu.upeu.eduspace.calificaciones.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.calificaciones.repository.EventoProcesadoRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class LimpiezaJob {

    private final EventoProcesadoRepository eventoProcesadoRepository;

    @Scheduled(cron = "0 0 3 * * ?", zone = "America/Lima")
    @SchedulerLock(name = "calificaciones_limpieza_eventos_procesados", lockAtLeastFor = "1m", lockAtMostFor = "15m")
    @Transactional
    public void limpiarEventosProcesadosAntiguos() {
        LocalDateTime limite = LocalDateTime.now().minusDays(30);
        int eliminados = eventoProcesadoRepository.deleteAntiguos(limite);
        if (eliminados > 0) {
            log.info("Limpieza periódica en calificaciones-ms: se eliminaron {} eventos procesados antiguos (> 30 días)", eliminados);
        }
    }
}
```

---

<a id="64-cacheconfigjava"></a>
## 64. `CacheConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/CacheConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Cache`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    public static final String CACHE_ASIGNACIONES = "asignacionesDocenteCache";
    public static final String CACHE_PLANIFICACION = "planificacionInfoCache";
    public static final String CACHE_ALUMNOS = "alumnosNombresCache";

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(
            CACHE_ASIGNACIONES,
            CACHE_PLANIFICACION,
            CACHE_ALUMNOS
        );
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .expireAfterWrite(5, TimeUnit.MINUTES)
            .maximumSize(1000));
        return cacheManager;
    }
}
```

---

<a id="65-calificacionespropertiesjava"></a>
## 65. `CalificacionesProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/CalificacionesProperties.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `CalificacionesProperties` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.math.BigDecimal;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.calificaciones")
public class CalificacionesProperties {

    private BigDecimal notaMaxima = new BigDecimal("20.00");
    private BigDecimal notaMinimaAprobatoria = new BigDecimal("11.00");
    private BigDecimal notaMinimaRecuperacion = new BigDecimal("8.00");
}
```

---

<a id="66-feignconfigjava"></a>
## 66. `FeignConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/FeignConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Feign`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

import feign.Logger;
import feign.RequestInterceptor;
import org.slf4j.MDC;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@Configuration
@EnableFeignClients(basePackages = "pe.edu.upeu.eduspace.calificaciones.client")
public class FeignConfig {

    public static final String CORRELATION_ID_HEADER = "X-Correlation-Id";

    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.BASIC;
    }

    @Bean
    public RequestInterceptor requestInterceptor(@Value("${eduspace.service-token:}") String serviceToken) {
        return template -> {
            if (serviceToken != null && !serviceToken.isBlank() && template.path().contains("/internal/")) {
                template.header("X-Service-Token", serviceToken);
            }
            String correlationId = MDC.get("correlationId");
            if (correlationId != null && !correlationId.isBlank()) {
                template.header(CORRELATION_ID_HEADER, correlationId);
            }

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth instanceof JwtAuthenticationToken jwtAuth) {
                template.header("Authorization", "Bearer " + jwtAuth.getToken().getTokenValue());
            }
        };
    }
}
```

---

<a id="67-kafkaconfigjava"></a>
## 67. `KafkaConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/KafkaConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Kafka`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class KafkaConfig {

    public static final String TOPIC_BOLETIN_GENERADO = "boletin.generado";
    public static final String TOPIC_TAREA_CALIFICADA = "tarea.calificada";
    public static final String TOPIC_EXAMEN_CALIFICADO = "examen.calificado";

    public static final String TOPIC_MATRICULA_CREADA = "matricula.creada";
    public static final String TOPIC_MATRICULA_CONFIRMADA = "matricula.confirmada";
    public static final String TOPIC_MATRICULA_TRASLADADA = "matricula.trasladada";
    public static final String TOPIC_MATRICULA_RETIRADA = "matricula.retirada";
    public static final String TOPIC_MATRICULA_ANULADA = "matricula.anulada";

    @Bean
    public NewTopic boletinGeneradoTopic() {
        return TopicBuilder.name(TOPIC_BOLETIN_GENERADO).partitions(3).replicas(1).build();
    }
}
```

---

<a id="68-kafkaerrorhandlingconfigjava"></a>
## 68. `KafkaErrorHandlingConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/KafkaErrorHandlingConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `KafkaErrorHandling`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

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
    private static final String[] TOPICOS_CONSUMIDOS = {"matricula.creada", "matricula.confirmada", "matricula.trasladada", "matricula.retirada", "matricula.anulada", "examen.calificado", "tarea.calificada"};

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

<a id="69-minioconfigjava"></a>
## 69. `MinioConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/MinioConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Minio`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

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

    @Value("${app.minio.bucket-boletines:boletines}")
    private String bucketBoletines;

    @Bean
    public MinioClient minioClient() {
        MinioClient client = MinioClient.builder()
            .endpoint(endpoint)
            .credentials(accessKey, secretKey)
            .build();

        try {
            boolean exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucketBoletines).build());
            if (!exists) {
                client.makeBucket(MakeBucketArgs.builder().bucket(bucketBoletines).build());
                log.info("Bucket creado en MinIO: {}", bucketBoletines);
            }
        } catch (Exception e) {
            log.warn("No se pudo verificar/crear el bucket {} en MinIO: {}", bucketBoletines, e.getMessage());
        }

        return client;
    }
}
```

---

<a id="70-openapiconfigjava"></a>
## 70. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `OpenApi`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
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
                .title("EduSpace - Calificaciones Microservice API")
                .version("1.0.0")
                .description("API oficial para gestión de criterios de evaluación, registro de notas, promedios ponderados, cierre de periodos y boletines oficiales en MinIO.")
                .contact(new Contact().name("EduSpace Engineering Team").email("soporte@eduspace.upeu.edu.pe"))
                .license(new License().name("Apache 2.0").url("https://springdoc.org")))
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

<a id="71-securityconfigjava"></a>
## 71. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `Security`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

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
                .requestMatchers("/internal/**").denyAll()

                // Criterios de evaluación y registro de notas
                .requestMatchers(HttpMethod.POST, "/api/v1/calificaciones/criterios/**").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/calificaciones/criterios/**").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/calificaciones/criterios/**").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/calificaciones/criterios/**").hasAnyRole("DOCENTE", "ADMIN", "SECRETARIA")

                .requestMatchers(HttpMethod.PUT, "/api/v1/calificaciones/notas/**").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers("/api/v1/calificaciones/registro", "/api/v1/calificaciones/pendientes-asignar").hasAnyRole("DOCENTE", "ADMIN")

                // Cierre y reapertura de periodos
                .requestMatchers(HttpMethod.POST, "/api/v1/calificaciones/periodos/cerrar").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers(HttpMethod.POST, "/api/v1/calificaciones/periodos/reabrir").hasRole("ADMIN")

                // Boletines
                .requestMatchers(HttpMethod.POST, "/api/v1/calificaciones/boletines/generar").hasAnyRole("SECRETARIA", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/calificaciones/boletines/**").hasAnyRole("SECRETARIA", "ADMIN", "DOCENTE", "ALUMNO", "APODERADO")

                // Consultas y libretas
                .requestMatchers("/api/v1/calificaciones/alumnos/*/libreta").hasAnyRole("ALUMNO", "APODERADO", "DOCENTE", "SECRETARIA", "ADMIN")
                .requestMatchers("/api/v1/calificaciones/mias").hasAnyRole("APODERADO", "ALUMNO")
                .requestMatchers("/api/v1/calificaciones/promedios", "/api/v1/calificaciones/resultados-anuales").hasAnyRole("DOCENTE", "SECRETARIA", "ADMIN")

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
            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            if (realmAccess != null && realmAccess.get("roles") instanceof List<?> roles) {
                for (Object role : roles) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toString().toUpperCase()));
                }
            }
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

<a id="72-shedlockconfigjava"></a>
## 72. `ShedLockConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/config/ShedLockConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Framework para `ShedLock`.

```java
package pe.edu.upeu.eduspace.calificaciones.config;

import net.javacrumbs.shedlock.core.LockProvider;
import net.javacrumbs.shedlock.provider.jdbctemplate.JdbcTemplateLockProvider;
import net.javacrumbs.shedlock.spring.annotation.EnableSchedulerLock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.sql.DataSource;

@Configuration
@EnableScheduling
@EnableSchedulerLock(defaultLockAtMostFor = "10m")
public class ShedLockConfig {

    @Bean
    public LockProvider lockProvider(DataSource dataSource) {
        return new JdbcTemplateLockProvider(
            JdbcTemplateLockProvider.Configuration.builder()
                .withJdbcTemplate(new JdbcTemplate(dataSource))
                .usingDbTime()
                .build()
        );
    }
}
```

---

<a id="73-businessruleexceptionjava"></a>
## 73. `BusinessRuleException.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción de dominio para manejar errores controlados en el microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.exception;

public class BusinessRuleException extends RuntimeException {
    public BusinessRuleException(String message) {
        super(message);
    }
}
```

---

<a id="74-errorresponsejava"></a>
## 74. `ErrorResponse.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `Error`.

```java
package pe.edu.upeu.eduspace.calificaciones.exception;

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

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private String traceId;
    private List<ValidationError> errors;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ValidationError {
        private String field;
        private String message;
    }
}
```

---

<a id="75-globalexceptionhandlerjava"></a>
## 75. `GlobalExceptionHandler.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción de dominio para manejar errores controlados en el microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pe.edu.upeu.eduspace.calificaciones.filter.CorrelationIdFilter;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        log.warn("Recurso no encontrado: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI(), null));
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ErrorResponse> handleBusinessRule(BusinessRuleException ex, HttpServletRequest request) {
        log.warn("Violación de regla de negocio: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI(), null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ErrorResponse.ValidationError> validationErrors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(this::mapFieldError)
            .toList();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(buildResponse(HttpStatus.BAD_REQUEST, "Error de validación en la solicitud", request.getRequestURI(), validationErrors));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(buildResponse(HttpStatus.FORBIDDEN, "Acceso denegado: no cuenta con los permisos necesarios", request.getRequestURI(), null));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalState(IllegalStateException ex, HttpServletRequest request) {
        log.warn("Estado ilegal: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(buildResponse(HttpStatus.CONFLICT, ex.getMessage(), request.getRequestURI(), null));
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
        return ResponseEntity.status(status).body(buildResponse(status, mensaje, request.getRequestURI(), null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        log.error("Error no controlado en la aplicación", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno en el servidor", request.getRequestURI(), null));
    }

    private ErrorResponse.ValidationError mapFieldError(FieldError error) {
        return new ErrorResponse.ValidationError(error.getField(), error.getDefaultMessage());
    }

    private ErrorResponse buildResponse(HttpStatus status, String message, String uri, List<ErrorResponse.ValidationError> errors) {
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(status.value())
            .error(status.getReasonPhrase())
            .message(message)
            .path(uri)
            .traceId(MDC.get(CorrelationIdFilter.MDC_KEY))
            .errors(errors)
            .build();
    }
}
```

---

<a id="76-resourcenotfoundexceptionjava"></a>
## 76. `ResourceNotFoundException.java` — Manejo de Excepciones y Errores

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción de dominio para manejar errores controlados en el microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

---

<a id="77-alumnosclientjava"></a>
## 77. `AlumnosClient.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/client/AlumnosClient.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `AlumnosClient` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@FeignClient(name = "alumnos-ms", fallback = AlumnosClient.AlumnosClientFallback.class)
public interface AlumnosClient {

    @GetMapping("/internal/apoderados/usuario/{usuarioId}/alumnos")
    List<HijoResumen> getHijosPorUsuario(@PathVariable("usuarioId") Long usuarioId);

    @GetMapping("/internal/alumnos/usuario/{usuarioId}")
    AlumnoUsuario getAlumnoDeUsuario(@PathVariable("usuarioId") Long usuarioId);

    record AlumnoUsuario(Long alumnoId) {}

    @GetMapping("/internal/alumnos/{id}")
    Map<String, Object> getAlumnoPorId(@PathVariable("id") Long alumnoId);

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    class HijoResumen {
        private Long alumnoId;
        private String codigo;
        private String nombreCompleto;
        private String estado;
        private String parentesco;
    }

    @Component
    class AlumnosClientFallback implements AlumnosClient {

        @Override
        public List<HijoResumen> getHijosPorUsuario(Long usuarioId) {
            return Collections.emptyList();
        }

        @Override
        public AlumnoUsuario getAlumnoDeUsuario(Long usuarioId) {
            return null;
        }

        @Override
        public Map<String, Object> getAlumnoPorId(Long alumnoId) {
            return Map.of("id", alumnoId, "nombreCompleto", "Alumno " + alumnoId);
        }
    }
}
```

---

<a id="78-asignaciondocenteresponsejava"></a>
## 78. `AsignacionDocenteResponse.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/client/AsignacionDocenteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response) que transporta los datos estructurados devueltos al frontend para `AsignacionDocente`.

```java
package pe.edu.upeu.eduspace.calificaciones.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionDocenteResponse {

    private Long asignacionId;
    private Long docenteId;
    private Long seccionId;
    private Long cursoId;
    private String cursoNombre;
}
```

---

<a id="79-correlationidfilterjava"></a>
## 79. `CorrelationIdFilter.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `CorrelationIdFilter` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.filter;

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

<a id="80-identidadservicejava"></a>
## 80. `IdentidadService.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/security/IdentidadService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de negocio para `Identidad`. Implementa validaciones, reglas de negocio y persistencia.

```java
package pe.edu.upeu.eduspace.calificaciones.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.calificaciones.client.AlumnosClient;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** Control de pertenencia: un alumno o apoderado solo ve datos de sus propios alumnos. */
@Service
@RequiredArgsConstructor
public class IdentidadService {

    private static final Set<String> ROLES_STAFF = Set.of("ADMIN", "SECRETARIA", "DOCENTE");

    private final AlumnosClient alumnosClient;

    public Set<String> roles(Jwt jwt) {
        Set<String> roles = new HashSet<>();
        if (jwt == null) return roles;
        if (jwt.getClaim("realm_access") instanceof Map<?, ?> m && m.get("roles") instanceof List<?> l) {
            l.forEach(r -> roles.add(r.toString().toUpperCase().replace("ROLE_", "")));
        }
        List<String> directos = jwt.getClaimAsStringList("roles");
        if (directos != null) directos.forEach(r -> roles.add(r.toUpperCase().replace("ROLE_", "")));
        return roles;
    }

    public boolean esStaff(Jwt jwt) {
        return roles(jwt).stream().anyMatch(ROLES_STAFF::contains);
    }

    public Long usuarioId(Jwt jwt) {
        Object v = jwt == null ? null : jwt.getClaim("usuarioId");
        if (v instanceof Number n) return n.longValue();
        if (v instanceof String s && s.matches("\\d+")) return Long.parseLong(s);
        throw new AccessDeniedException("El token no contiene el claim usuarioId.");
    }

    /** Alumnos del usuario: él mismo (rol ALUMNO) y/o sus hijos (rol APODERADO). */
    public Set<Long> alumnosDelUsuario(Jwt jwt) {
        Set<Long> ids = new HashSet<>();
        Set<String> roles = roles(jwt);
        Long uid = usuarioId(jwt);
        if (roles.contains("ALUMNO")) {
            AlumnosClient.AlumnoUsuario a = null;
            try {
                a = alumnosClient.getAlumnoDeUsuario(uid);
            } catch (feign.FeignException.NotFound e) {
                // el usuario no es un alumno
            }
            if (a != null && a.alumnoId() != null) ids.add(a.alumnoId());
        }
        if (roles.contains("APODERADO")) {
            try {
                for (AlumnosClient.HijoResumen h : alumnosClient.getHijosPorUsuario(uid)) ids.add(h.getAlumnoId());
            } catch (feign.FeignException.NotFound e) {
                // el usuario no tiene hijos registrados
            }
        }
        return ids;
    }

    public void exigirAcceso(Jwt jwt, Long alumnoId) {
        if (esStaff(jwt)) return;
        if (!alumnosDelUsuario(jwt).contains(alumnoId)) {
            throw new AccessDeniedException("No tiene acceso a la información de este alumno.");
        }
    }
}
```

---

<a id="81-pdftextojava"></a>
## 81. `PdfTexto.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/util/PdfTexto.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PdfTexto` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.util;

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

<a id="82-planificacionclientjava"></a>
## 82. `PlanificacionClient.java` — Seguridad, Filtros y Clientes

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/client/PlanificacionClient.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `PlanificacionClient` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@FeignClient(name = "planificacion-ms", fallback = PlanificacionClient.PlanificacionClientFallback.class)
public interface PlanificacionClient {

    @GetMapping("/internal/docentes/usuario/{usuarioId}/asignaciones")
    List<AsignacionDocenteResponse> getAsignacionesDocente(@PathVariable("usuarioId") Long usuarioId,
                                                           @RequestParam(value = "anioId", required = false) Long anioId);

    @GetMapping("/internal/asignaciones/validar")
    Boolean validarAsignacionDocente(@RequestParam("docenteId") Long docenteId,
                                     @RequestParam("seccionId") Long seccionId,
                                     @RequestParam("cursoId") Long cursoId);

    @GetMapping("/internal/docentes/usuario/{usuarioId}")
    DocenteInterno getDocentePorUsuario(@PathVariable("usuarioId") Long usuarioId);

    record DocenteInterno(Long docenteId, String nombre, String estado) {}

    @GetMapping("/internal/cursos/{id}")
    Map<String, Object> getCursoPorId(@PathVariable("id") Long cursoId);

    @GetMapping("/internal/periodos/{id}")
    Map<String, Object> getPeriodoPorId(@PathVariable("id") Long periodoId);

    @GetMapping("/internal/anios/{id}")
    Map<String, Object> getAnioActivo(@PathVariable("id") Long anioId);

    @GetMapping("/internal/niveles/{id}")
    Map<String, Object> getNivelPorId(@PathVariable("id") Long nivelId);

    @Component
    class PlanificacionClientFallback implements PlanificacionClient {

        @Override
        public List<AsignacionDocenteResponse> getAsignacionesDocente(Long usuarioId, Long anioId) {
            return Collections.emptyList();
        }

        @Override
        public Boolean validarAsignacionDocente(Long docenteId, Long seccionId, Long cursoId) {
            // Regla de seguridad (H2): si cae el servicio, denegar acceso de escritura
            return false;
        }

        @Override
        public DocenteInterno getDocentePorUsuario(Long usuarioId) {
            return null;
        }

        @Override
        public Map<String, Object> getCursoPorId(Long cursoId) {
            return Map.of("id", cursoId, "nombre", "Curso " + cursoId);
        }

        @Override
        public Map<String, Object> getPeriodoPorId(Long periodoId) {
            return Map.of("id", periodoId, "nombre", "Periodo " + periodoId);
        }

        @Override
        public Map<String, Object> getAnioActivo(Long anioId) {
            return Map.of("id", anioId, "nombre", "Año " + anioId);
        }

        @Override
        public Map<String, Object> getNivelPorId(Long nivelId) {
            return Map.of();
        }
    }
}
```

---

<a id="83-calificacionesapplicationjava"></a>
## 83. `CalificacionesApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/CalificacionesApplication.java`

### **¿Qué hace esta clase?**
Clase auxiliar y de soporte para `CalificacionesApplication` dentro de la arquitectura del microservicio.

```java
package pe.edu.upeu.eduspace.calificaciones;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableScheduling;
import pe.edu.upeu.eduspace.calificaciones.config.CalificacionesProperties;

@SpringBootApplication
@EnableDiscoveryClient
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties(CalificacionesProperties.class)
public class CalificacionesApplication {

    public static void main(String[] args) {
        SpringApplication.run(CalificacionesApplication.class, args);
    }
}
```

---

