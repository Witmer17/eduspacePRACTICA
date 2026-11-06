# 📘 CÓDIGO COMPLETO — `matricula-ms`

> **Microservicio:** `matricula-ms`  
> **Puerto:** `8093`  
> **Base de datos:** `eduspace_matricula`  
> **Propósito:** Proceso de matrícula escolar completa. Gestiona la inscripción del alumno en un año lectivo, grado y sección, validando cupos disponibles, requisitos documentarios y estados (EN_PROCESO, MATRICULADO, RETIRADO, TRASLADADO). Emite eventos Kafka para que los demás servicios repliquen la matrícula.  
> **Total de clases incluidas:** 64 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `CampaniaMatricula.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/CampaniaMatricula.java`
- 2. `CupoSeccion.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/CupoSeccion.java`
- 3. `EventoProcesado.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/EventoProcesado.java`
- 4. `Matricula.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/Matricula.java`
- 5. `MatriculaHistorial.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/MatriculaHistorial.java`
- 6. `MatriculaPublica.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/MatriculaPublica.java`
- 7. `MatriculaRequisito.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/MatriculaRequisito.java`
- 8. `OutboxEvento.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/OutboxEvento.java`

### Repositorios Spring Data JPA

- 9. `CampaniaRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/CampaniaRepository.java`
- 10. `CupoSeccionRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/CupoSeccionRepository.java`
- 11. `EventoProcesadoRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/EventoProcesadoRepository.java`
- 12. `HistorialRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/HistorialRepository.java`
- 13. `MatriculaPublicaRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/MatriculaPublicaRepository.java`
- 14. `MatriculaRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/MatriculaRepository.java`
- 15. `OutboxEventoRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/OutboxEventoRepository.java`
- 16. `RequisitoRepository.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/RequisitoRepository.java`

### DTOs (Data Transfer Objects)

- 17. `Dtos.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/dto/Dtos.java`
- 18. `PageResponse.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/dto/PageResponse.java`
- 19. `PublicoDtos.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/dto/PublicoDtos.java`

### Servicios y Lógica de Negocio

- 20. `CampaniaService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/CampaniaService.java`
- 21. `CupoService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/CupoService.java`
- 22. `EventoOutboxService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/EventoOutboxService.java`
- 23. `MatriculaEnLineaService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/MatriculaEnLineaService.java`
- 24. `MatriculaMapper.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/MatriculaMapper.java`
- 25. `MatriculaService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/MatriculaService.java`
- 26. `RatificacionService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/RatificacionService.java`
- 27. `RequisitoService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/RequisitoService.java`

### Controladores REST API

- 28. `CampaniaController.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/CampaniaController.java`
- 29. `InternalMatriculaController.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/InternalMatriculaController.java`
- 30. `MatriculaController.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/MatriculaController.java`
- 31. `PublicoMatriculaController.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/PublicoMatriculaController.java`

### Mensajería Kafka

- 32. `OutboxPublisher.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/messaging/OutboxPublisher.java`
- 33. `PagoEventConsumer.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/messaging/PagoEventConsumer.java`

### Eventos de Dominio

- 34. `EventoSobre.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/event/EventoSobre.java`
- 35. `MatriculaEvent.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/event/MatriculaEvent.java`
- 36. `PagoConfirmadoEvent.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/event/PagoConfirmadoEvent.java`

### Tareas Programadas (Schedulers)

- 37. `LimpiezaJob.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/scheduler/LimpiezaJob.java`
- 38. `VencimientoJob.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/scheduler/VencimientoJob.java`

### Configuración Spring Boot

- 39. `CacheConfig.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/CacheConfig.java`
- 40. `FeignConfig.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/FeignConfig.java`
- 41. `KafkaConfig.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/KafkaConfig.java`
- 42. `KafkaErrorHandlingConfig.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/KafkaErrorHandlingConfig.java`
- 43. `MatriculaProperties.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/MatriculaProperties.java`
- 44. `OpenApiConfig.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/OpenApiConfig.java`
- 45. `SecurityConfig.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/SecurityConfig.java`
- 46. `ShedLockConfig.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/ShedLockConfig.java`

### Manejo de Excepciones

- 47. `BusinessRuleException.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/BusinessRuleException.java`
- 48. `ErrorResponse.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/ErrorResponse.java`
- 49. `GlobalExceptionHandler.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/GlobalExceptionHandler.java`
- 50. `ResourceNotFoundException.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/ResourceNotFoundException.java`
- 51. `ServicioNoDisponibleException.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/ServicioNoDisponibleException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 52. `AlumnosClient.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/AlumnosClient.java`
- 53. `AlumnosGateway.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/AlumnosGateway.java`
- 54. `AuthClient.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/AuthClient.java`
- 55. `CorrelationIdFilter.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/filter/CorrelationIdFilter.java`
- 56. `IdentidadService.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/security/IdentidadService.java`
- 57. `NotificacionesClient.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/NotificacionesClient.java`
- 58. `PagoClient.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/PagoClient.java`
- 59. `PdfConstancia.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/util/PdfConstancia.java`
- 60. `PlanificacionClient.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/PlanificacionClient.java`
- 61. `PlanificacionGateway.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/PlanificacionGateway.java`
- 62. `ServiceTokenFilter.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/filter/ServiceTokenFilter.java`
- 63. `TarjetaSimulada.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/util/TarjetaSimulada.java`

### Clase Principal de Arranque

- 64. `MatriculaApplication.java` — `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/MatriculaApplication.java`

---

## 1. `CampaniaMatricula.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/CampaniaMatricula.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `matricula-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.matricula.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "campanias_matricula")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaniaMatricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Builder.Default
    @Column(nullable = false, length = 12)
    private String estado = "PLANIFICADA";

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
}
```

---

## 2. `CupoSeccion.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/CupoSeccion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `matricula-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.matricula.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cupos_seccion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CupoSeccion {

    @Id
    @Column(name = "seccion_id")
    private Long seccionId;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(name = "nivel_id")
    private Long nivelId;

    @Column(name = "grado_id", nullable = false)
    private Long gradoId;

    @Column(name = "seccion_nombre", nullable = false, length = 10)
    private String seccionNombre;

    @Column(nullable = false)
    private Short capacidad;

    @Builder.Default
    @Column(nullable = false)
    private Short ocupados = 0;

    @Builder.Default
    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();
}
```

---

## 3. `EventoProcesado.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/EventoProcesado.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.matricula.entity;

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

## 4. `Matricula.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/Matricula.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `matricula-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.matricula.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "matriculas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 25, unique = true)
    private String codigo;

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

    @Column(name = "campania_id")
    private Long campaniaId;

    @Builder.Default
    @Column(nullable = false, length = 15)
    private String tipo = "NUEVA";

    @Builder.Default
    @Column(nullable = false, length = 15)
    private String estado = "PRE_MATRICULA";

    /** Forma de pago de las pensiones acordada al matricular (MENSUAL, BIMESTRAL, SEMESTRAL o ANUAL). */
    @Builder.Default
    @Column(name = "plan_pago", nullable = false, length = 12)
    private String planPago = "MENSUAL";

    @Column(name = "matricula_anterior_id")
    private Long matriculaAnteriorId;

    @Column(name = "vence_en")
    private LocalDateTime venceEn;

    @Column(length = 500)
    private String observaciones;

    @Column(name = "creado_por")
    private Long creadoPor;

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "confirmada_en")
    private LocalDateTime confirmadaEn;

    @Column(name = "pagada_en")
    private LocalDateTime pagadaEn;

    @Column(name = "aprobada_por")
    private Long aprobadaPor;

    @Column(name = "aprobada_en")
    private LocalDateTime aprobadaEn;

    @Column(name = "cerrada_en")
    private LocalDateTime cerradaEn;

    @Column(name = "motivo_cierre", length = 300)
    private String motivoCierre;

    @Builder.Default
    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();

    @Version
    @Column(nullable = false)
    private Long version;
}
```

---

## 5. `MatriculaHistorial.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/MatriculaHistorial.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `matricula-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.matricula.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "matricula_historial")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatriculaHistorial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "tipo_cambio", nullable = false, length = 20)
    private String tipoCambio;

    @Column(name = "estado_anterior", length = 15)
    private String estadoAnterior;

    @Column(name = "estado_nuevo", length = 15)
    private String estadoNuevo;

    @Column(name = "seccion_anterior_id")
    private Long seccionAnteriorId;

    @Column(name = "seccion_nueva_id")
    private Long seccionNuevaId;

    @Column(length = 300)
    private String motivo;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Builder.Default
    @Column(nullable = false)
    private LocalDateTime fecha = LocalDateTime.now();
}
```

---

## 6. `MatriculaPublica.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/MatriculaPublica.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `matricula-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.matricula.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Trámite de matrícula iniciado desde el sitio público (ver V3). */
@Entity
@Table(name = "matriculas_publicas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatriculaPublica {

    @Id
    @Column(name = "matricula_id")
    private Long matriculaId;

    @Column(name = "token_hash", nullable = false, length = 64)
    private String tokenHash;

    @Column(name = "apoderado_id", nullable = false)
    private Long apoderadoId;

    @Column(name = "apoderado_usuario_id")
    private Long apoderadoUsuarioId;

    @Column(name = "apoderado_nombre", nullable = false, length = 200)
    private String apoderadoNombre;

    @Column(name = "apoderado_nombres", length = 100)
    private String apoderadoNombres;

    @Column(name = "apoderado_apellidos", length = 150)
    private String apoderadoApellidos;

    @Column(name = "apoderado_documento", nullable = false, length = 20)
    private String apoderadoDocumento;

    @Column(name = "apoderado_email", length = 150)
    private String apoderadoEmail;

    @Column(name = "alumno_nombres", nullable = false, length = 100)
    private String alumnoNombres;

    @Column(name = "alumno_apellidos", nullable = false, length = 160)
    private String alumnoApellidos;

    @Column(name = "alumno_documento", nullable = false, length = 20)
    private String alumnoDocumento;

    @Builder.Default
    @Column(nullable = false, length = 12)
    private String estado = "INICIADA";

    @Column(name = "pago_id")
    private Long pagoId;

    @Column(length = 30)
    private String comprobante;

    @Column(name = "monto_matricula", precision = 10, scale = 2)
    private BigDecimal montoMatricula;

    @Column(name = "alumno_usuario", length = 80)
    private String alumnoUsuario;

    @Column(name = "apoderado_usuario", length = 80)
    private String apoderadoUsuario;

    @Column(name = "correo_estado", length = 12)
    private String correoEstado;

    /**
     * Si la familia pidió descuento por hermano: el documento que escribió y, si ya es alumno del colegio, su nombre (la solicitud vive en pago-ms
     * y la secretaría confirma el parentesco antes de que se pueda pagar).
     */
    @Column(name = "hermano_documento", length = 20)
    private String hermanoDocumento;

    @Column(name = "hermano_nombre", length = 220)
    private String hermanoNombre;

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "pagada_en")
    private LocalDateTime pagadaEn;
}
```

---

## 7. `MatriculaRequisito.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/MatriculaRequisito.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `matricula-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.matricula.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "matricula_requisitos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatriculaRequisito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(nullable = false, length = 30)
    private String tipo;

    @Builder.Default
    @Column(nullable = false)
    private Boolean cumplido = false;

    @Column(length = 300)
    private String observacion;

    @Column(name = "verificado_por")
    private Long verificadoPor;

    @Column(name = "verificado_en")
    private LocalDateTime verificadoEn;
}
```

---

## 8. `OutboxEvento.java` — Entidades JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/entity/OutboxEvento.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.matricula.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private String payload;

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "enviado_en")
    private LocalDateTime enviadoEn;

    @Builder.Default
    @Column(nullable = false)
    private Short intentos = 0;

    @Column(name = "ultimo_error", length = 500)
    private String ultimoError;
}
```

---

## 9. `CampaniaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/CampaniaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Campania`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.matricula.entity.CampaniaMatricula;

import java.util.List;
import java.util.Optional;

public interface CampaniaRepository extends JpaRepository<CampaniaMatricula, Long> {

    Optional<CampaniaMatricula> findFirstByAnioIdAndEstado(Long anioId, String estado);

    List<CampaniaMatricula> findByAnioIdOrderByFechaInicioDesc(Long anioId);

    List<CampaniaMatricula> findAllByOrderByFechaInicioDesc();

    boolean existsByAnioIdAndNombre(Long anioId, String nombre);
}
```

---

## 10. `CupoSeccionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/CupoSeccionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `CupoSeccion`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.matricula.entity.CupoSeccion;

import java.util.List;

public interface CupoSeccionRepository extends JpaRepository<CupoSeccion, Long> {

    /** Reserva atómica: solo incrementa si queda cupo. Devuelve filas afectadas (0 = sin cupo). */
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE CupoSeccion c SET c.ocupados = c.ocupados + 1, c.actualizadoEn = CURRENT_TIMESTAMP "
         + "WHERE c.seccionId = :seccionId AND c.ocupados < c.capacidad")
    int reservar(@Param("seccionId") Long seccionId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE CupoSeccion c SET c.ocupados = c.ocupados - 1, c.actualizadoEn = CURRENT_TIMESTAMP "
         + "WHERE c.seccionId = :seccionId AND c.ocupados > 0")
    int liberar(@Param("seccionId") Long seccionId);

    List<CupoSeccion> findByAnioIdAndGradoIdOrderBySeccionNombre(Long anioId, Long gradoId);

    List<CupoSeccion> findByAnioIdOrderByGradoIdAscSeccionNombreAsc(Long anioId);

    /** Alta idempotente (varias solicitudes simultáneas a una sección nueva no chocan). */
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(value = "INSERT INTO cupos_seccion (seccion_id, anio_id, nivel_id, grado_id, seccion_nombre, capacidad, ocupados, actualizado_en) "
        + "VALUES (:id, :anioId, :nivelId, :gradoId, :nombre, :capacidad, 0, now()) ON CONFLICT (seccion_id) DO NOTHING", nativeQuery = true)
    int insertarSiNoExiste(@Param("id") Long id, @Param("anioId") Long anioId, @Param("nivelId") Long nivelId,
                           @Param("gradoId") Long gradoId, @Param("nombre") String nombre, @Param("capacidad") short capacidad);

    /** Ajusta la capacidad cuando planificación la cambia, sin dejarla por debajo de lo ocupado. */
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE CupoSeccion c SET c.capacidad = :capacidad, c.actualizadoEn = CURRENT_TIMESTAMP "
         + "WHERE c.seccionId = :id AND c.capacidad <> :capacidad AND c.ocupados <= :capacidad")
    int ajustarCapacidad(@Param("id") Long id, @Param("capacidad") short capacidad);
}
```

---

## 11. `EventoProcesadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/EventoProcesadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EventoProcesado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import pe.edu.upeu.eduspace.matricula.entity.EventoProcesado;

import java.time.LocalDateTime;
import java.util.UUID;

public interface EventoProcesadoRepository extends JpaRepository<EventoProcesado, UUID> {

    boolean existsByEventId(UUID eventId);

    @Modifying
    long deleteByProcesadoEnBefore(LocalDateTime limite);
}
```

---

## 12. `HistorialRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/HistorialRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Historial`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaHistorial;

import java.util.List;

public interface HistorialRepository extends JpaRepository<MatriculaHistorial, Long> {

    List<MatriculaHistorial> findByMatriculaIdOrderByFechaDescIdDesc(Long matriculaId);
}
```

---

## 13. `MatriculaPublicaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/MatriculaPublicaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `MatriculaPublica`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaPublica;

public interface MatriculaPublicaRepository extends JpaRepository<MatriculaPublica, Long> {

    /** ¿Esa matrícula nació de la matrícula en línea del sitio público? */
    boolean existsByMatriculaId(Long matriculaId);

    /** Último intento de matrícula en línea de un alumno (para retomar una reserva que venció sin pago). */
    java.util.Optional<MatriculaPublica> findFirstByAlumnoDocumentoAndEstadoOrderByCreadoEnDesc(String alumnoDocumento, String estado);
}
```

---

## 14. `MatriculaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/MatriculaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Matricula`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.matricula.entity.Matricula;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {

    @Query("SELECT m FROM Matricula m WHERE m.alumnoId = :alumnoId AND m.anioId = :anioId "
         + "AND m.estado IN ('PRE_MATRICULA','POR_APROBAR','MATRICULADO')")
    Optional<Matricula> findVivaByAlumnoAndAnio(@Param("alumnoId") Long alumnoId, @Param("anioId") Long anioId);

    List<Matricula> findByAlumnoIdOrderByAnioIdDesc(Long alumnoId);

    Optional<Matricula> findByCodigo(String codigo);

    List<Matricula> findByAlumnoIdIn(Collection<Long> alumnoIds);

    List<Matricula> findBySeccionIdAndEstadoIn(Long seccionId, Collection<String> estados);

    long countBySeccionIdAndEstado(Long seccionId, String estado);

    @Query("SELECT m FROM Matricula m WHERE m.estado = 'PRE_MATRICULA' AND m.venceEn < :ahora")
    List<Matricula> findPreMatriculasVencidas(@Param("ahora") LocalDateTime ahora);

    /** {@code texto} nunca es nulo (texto vacío = sin filtro): PostgreSQL no infiere el tipo de un parámetro nulo en LIKE. */
    @Query("""
        SELECT m FROM Matricula m
        WHERE (:anioId IS NULL OR m.anioId = :anioId)
          AND (:gradoId IS NULL OR m.gradoId = :gradoId)
          AND (:seccionId IS NULL OR m.seccionId = :seccionId)
          AND (:estado IS NULL OR m.estado = :estado)
          AND (:texto = '' OR LOWER(m.alumnoNombre) LIKE LOWER(CONCAT('%', :texto, '%')) OR LOWER(m.codigo) LIKE LOWER(CONCAT('%', :texto, '%')))
            order by m.id desc
        """)
    Page<Matricula> buscar(@Param("anioId") Long anioId, @Param("gradoId") Long gradoId, @Param("seccionId") Long seccionId,
                           @Param("estado") String estado, @Param("texto") String texto, Pageable pageable);

    @Query(value = "SELECT nextval('matricula_codigo_seq')", nativeQuery = true)
    Long siguienteCorrelativo();
}
```

---

## 15. `OutboxEventoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/OutboxEventoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `OutboxEvento`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.matricula.entity.OutboxEvento;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface OutboxEventoRepository extends JpaRepository<OutboxEvento, UUID> {

    @Query(value = """
        SELECT * FROM outbox_eventos
        WHERE enviado_en IS NULL AND intentos < :maxIntentos
        ORDER BY creado_en ASC
        LIMIT 50
        FOR UPDATE SKIP LOCKED
        """, nativeQuery = true)
    List<OutboxEvento> tomarLotePendiente(@Param("maxIntentos") int maxIntentos);

    @Modifying
    long deleteByEnviadoEnBefore(LocalDateTime limite);

    long countByEnviadoEnIsNull();
}
```

---

## 16. `RequisitoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/repository/RequisitoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Requisito`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.matricula.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaRequisito;

import java.util.List;
import java.util.Optional;

public interface RequisitoRepository extends JpaRepository<MatriculaRequisito, Long> {

    List<MatriculaRequisito> findByMatriculaIdOrderByTipo(Long matriculaId);

    Optional<MatriculaRequisito> findByMatriculaIdAndTipo(Long matriculaId, String tipo);
}
```

---

## 17. `Dtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/dto/Dtos.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `Dtos`.

```java
package pe.edu.upeu.eduspace.matricula.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/** DTOs de la API de matrícula agrupados por tamaño; todos son records inmutables. */
public final class Dtos {

    private Dtos() {}

    public record MatriculaCreateRequest(
        @NotNull(message = "alumnoId es obligatorio") Long alumnoId,
        @NotNull(message = "seccionId es obligatorio") Long seccionId,
        @Pattern(regexp = "NUEVA|RATIFICACION|REINGRESO", message = "tipo debe ser NUEVA, RATIFICACION o REINGRESO") String tipo,
        @Size(max = 500) String observaciones,
        @Pattern(regexp = "MENSUAL|BIMESTRAL|SEMESTRAL|ANUAL", message = "planPago debe ser MENSUAL, BIMESTRAL, SEMESTRAL o ANUAL") String planPago) {}

    public record TrasladoRequest(
        @NotNull(message = "nuevaSeccionId es obligatorio") Long nuevaSeccionId,
        @NotBlank(message = "El motivo es obligatorio") @Size(max = 300) String motivo) {}

    public record RetiroRequest(@NotBlank(message = "El motivo es obligatorio") @Size(max = 300) String motivo) {}

    public record AnulacionRequest(@Size(max = 300) String motivo) {}

    public record RequisitoRequest(@NotNull(message = "cumplido es obligatorio") Boolean cumplido,
                                   @Size(max = 300) String observacion) {}

    /**
     * Ratificación al año siguiente. Individual: {@code matriculaAnteriorId}. Masiva: {@code seccionOrigenId}.
     * Destino: {@code seccionDestinoId}, o {@code gradoDestinoId} para elegir la primera sección con cupo.
     */
    public record RatificacionRequest(
        @NotNull(message = "anioDestinoId es obligatorio") Long anioDestinoId,
        Long matriculaAnteriorId,
        Long seccionOrigenId,
        Long seccionDestinoId,
        Long gradoDestinoId) {}

    public record CampaniaRequest(
        @NotNull Long anioId,
        @NotBlank @Size(max = 80) String nombre,
        @NotNull LocalDate fechaInicio,
        @NotNull LocalDate fechaFin) {}

    public record RequisitoResponse(Long id, String tipo, Boolean cumplido, String observacion, Long verificadoPor,
                                    LocalDateTime verificadoEn) {}

    public record HistorialResponse(Long id, String tipoCambio, String estadoAnterior, String estadoNuevo,
                                    Long seccionAnteriorId, Long seccionNuevaId, String motivo, Long usuarioId,
                                    LocalDateTime fecha) {}

    public record MatriculaResponse(Long id, String codigo, Long alumnoId, String alumnoNombre, Long anioId, Long nivelId,
                                    Long gradoId, Long seccionId, Long campaniaId, String tipo, String estado,
                                    Long matriculaAnteriorId, LocalDateTime venceEn, String observaciones,
                                    LocalDateTime creadoEn, LocalDateTime confirmadaEn, LocalDateTime cerradaEn,
                                    String motivoCierre, LocalDateTime pagadaEn, LocalDateTime aprobadaEn, String planPago) {}

    public record MatriculaDetalleResponse(MatriculaResponse matricula, List<RequisitoResponse> requisitos,
                                           List<HistorialResponse> historial) {}

    public record CupoResponse(Long seccionId, String seccionNombre, Long anioId, Long gradoId, Short capacidad,
                               Short ocupados, int vacantes) {}

    public record CampaniaResponse(Long id, Long anioId, String nombre, LocalDate fechaInicio, LocalDate fechaFin,
                                   String estado) {}

    public record AlumnoSeccionResponse(Long matriculaId, String codigo, Long alumnoId, String alumnoNombre, String estado) {}

    public record RatificacionResultado(int solicitadas, int creadas, List<MatriculaResponse> matriculas,
                                        List<ErrorRatificacion> errores) {}

    public record ErrorRatificacion(Long matriculaAnteriorId, Long alumnoId, String motivo) {}

    public record InternalMatricula(Long matriculaId, Long alumnoId, String alumnoNombre, Long anioId, Long nivelId,
                                    Long gradoId, Long seccionId, String estado, String tipo) {}
}
```

---

## 18. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Page`.

```java
package pe.edu.upeu.eduspace.matricula.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public record PageResponse<T>(List<T> contenido, int pagina, int tamano, long totalElementos, int totalPaginas) {

    public static <T> PageResponse<T> from(Page<T> p) {
        return new PageResponse<>(p.getContent(), p.getNumber(), p.getSize(), p.getTotalElements(), p.getTotalPages());
    }
}
```

---

## 19. `PublicoDtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/dto/PublicoDtos.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `PublicoDtos`.

```java
package pe.edu.upeu.eduspace.matricula.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/** API pública (sin sesión) de la matrícula en línea del sitio web del colegio. */
public final class PublicoDtos {

    private PublicoDtos() {}

    // ----- oferta (qué grados hay, cuántas vacantes y cuánto cuesta)
    public record PensionOferta(BigDecimal total, int cuotas, BigDecimal mensual) {}

    public record GradoOferta(Long id, String nombre, int vacantes, BigDecimal matricula, PensionOferta pension) {}

    public record NivelOferta(Long id, String nombre, List<GradoOferta> grados) {}

    /** Una forma de pago de las pensiones con su descuento (semestral 5 %, anual 10 %: lo manda pago-ms). */
    public record PlanOferta(String id, String etiqueta, BigDecimal descuentoPorcentaje) {}

    /** Un descuento que la familia puede pedir por tener un hermano matriculado (lo confirma la secretaría). */
    public record DescuentoHermanoOferta(Long id, String nombre, String tipo, BigDecimal valor) {}

    public record Oferta(Long anioId, String anio, boolean abierta, String mensaje, List<NivelOferta> niveles, List<PlanOferta> planes,
                         List<DescuentoHermanoOferta> descuentosHermano) {}

    // ----- solicitud
    public record AlumnoSolicitud(
        @Pattern(regexp = "DNI|CE|PASAPORTE", message = "El tipo de documento del alumno debe ser DNI, CE o PASAPORTE") String tipoDocumento,
        @NotBlank(message = "El documento del alumno es obligatorio") @Pattern(regexp = "[A-Za-z0-9]{6,20}", message = "El documento del alumno solo admite letras y números (6 a 20)") String numeroDocumento,
        @NotBlank(message = "Los nombres del alumno son obligatorios") @Size(max = 100) String nombres,
        @NotBlank(message = "El apellido paterno del alumno es obligatorio") @Size(max = 80) String apellidoPaterno,
        @Size(max = 80) String apellidoMaterno,
        @NotNull(message = "La fecha de nacimiento es obligatoria") @Past(message = "La fecha de nacimiento no puede ser futura") LocalDate fechaNacimiento,
        @NotBlank(message = "El sexo es obligatorio") @Pattern(regexp = "[MF]", message = "El sexo debe ser M o F") String sexo,
        /** Datos opcionales del alumno: si la familia los escribe, quedan en su expediente. */
        @Size(max = 200, message = "La dirección es muy larga") String direccion,
        @Size(max = 80, message = "El distrito es muy largo") String distrito,
        @Size(max = 150, message = "El colegio de procedencia es muy largo") String colegioProcedencia,
        @Email(message = "El correo del alumno no es válido") @Size(max = 150) String email) {}

    public record ApoderadoSolicitud(
        @Pattern(regexp = "DNI|CE|PASAPORTE", message = "El tipo de documento del apoderado debe ser DNI, CE o PASAPORTE") String tipoDocumento,
        @NotBlank(message = "El documento del apoderado es obligatorio") @Pattern(regexp = "[A-Za-z0-9]{6,20}", message = "El documento del apoderado solo admite letras y números (6 a 20)") String numeroDocumento,
        @NotBlank(message = "Los nombres del apoderado son obligatorios") @Size(max = 100) String nombres,
        @NotBlank(message = "Los apellidos del apoderado son obligatorios") @Size(max = 150) String apellidos,
        @NotBlank(message = "El teléfono del apoderado es obligatorio") @Pattern(regexp = "[0-9+() -]{6,20}", message = "El teléfono no es válido") String telefono,
        @Email(message = "El correo no es válido") @Size(max = 150) String email,
        @NotBlank(message = "El parentesco es obligatorio") @Pattern(regexp = "PADRE|MADRE|ABUELO|ABUELA|TIO|TIA|HERMANO|TUTOR|OTRO", message = "Parentesco no válido") String parentesco) {}

    /** El hermano por el que se pide descuento: solo su documento. La secretaría lo busca y confirma el parentesco. */
    public record HermanoSolicitud(
        @NotBlank(message = "El documento del hermano es obligatorio") @Pattern(regexp = "[A-Za-z0-9]{6,20}", message = "El documento del hermano solo admite letras y números (6 a 20)") String numeroDocumento) {}

    public record Solicitud(
        @NotNull(message = "Elige el grado") Long gradoId,
        @NotNull @Valid AlumnoSolicitud alumno,
        @NotNull @Valid ApoderadoSolicitud apoderado,
        @AssertTrue(message = "Debes aceptar el tratamiento de datos personales") boolean acepto,
        /** Campo trampa: las personas no lo ven ni lo llenan; si llega con texto es un robot. */
        @Size(max = 0, message = "Solicitud no válida") String sitio,
        /** Código de descuento que la familia escribió (opcional); se valida en el servidor y se aplica a las cuotas del alumno. */
        @Size(max = 40, message = "El código de descuento es muy largo") @Pattern(regexp = "|[A-Za-z0-9_-]+", message = "El código de descuento solo lleva letras, números y guiones") String codigoDescuento,
        /** Forma de pago de las pensiones que acuerda la familia (opcional; sin dato es mensual). */
        @Pattern(regexp = "|MENSUAL|BIMESTRAL|SEMESTRAL|ANUAL", message = "La forma de pago debe ser MENSUAL, BIMESTRAL, SEMESTRAL o ANUAL") String planPago,
        /** Hermano matriculado por el que se pide descuento (opcional): hasta que la secretaría lo confirme no se puede pagar. */
        @Valid HermanoSolicitud hermano) {}

    /** El descuento de un código, tal como lo ve la familia antes de pagar. */
    public record DescuentoVista(String codigo, String nombre, String tipo, BigDecimal valor, String aplicaA) {}

    /** {@code montoBase} y {@code descuento} desglosan la matrícula: lo que se paga ahora ({@code montoMatricula}) es la base menos el descuento. */
    public record Inicio(String referencia, String token, String codigo, String alumno, String grado, String seccion, String turno,
                         BigDecimal montoMatricula, String vencePago, BigDecimal montoBase, BigDecimal descuento) {}

    // ----- pago (la pasarela es simulada)
    public record Tarjeta(
        @NotBlank(message = "Escribe el número de la tarjeta") @Size(max = 25) String numero,
        @NotBlank(message = "Escribe el nombre del titular") @Size(max = 80) String titular,
        @NotBlank(message = "Escribe el vencimiento (MM/AA)") @Size(max = 7) String vencimiento,
        @NotBlank(message = "Escribe el CVV") @Size(max = 4) String cvv) {}

    public record PagoRequest(@NotNull @Valid Tarjeta tarjeta) {}

    // ----- resumen de una matrícula (lo que se muestra al terminar y en la constancia)
    public record PensionResumen(String descripcion, String vence, BigDecimal monto) {}

    public record ClaseResumen(String dia, String hora, String curso, String docente) {}

    /**
     * Cómo va el descuento por hermano: EN_REVISION (la secretaría confirma el parentesco; aún no se puede pagar), APROBADO (se paga el monto ya
     * descontado) o RECHAZADO (se paga completo; {@code motivo} dice por qué). No revela datos del hermano: la familia solo ve el documento que escribió.
     */
    public record HermanoEstado(String estado, String descuento, String motivo, String documento) {}

    public record Resumen(String estado, String referencia, String codigo, String alumno, String alumnoDocumento, String apoderado,
                          String grado, String seccion, String turno, BigDecimal montoMatricula, String comprobante, String pagadoEn,
                          List<PensionResumen> pensiones, BigDecimal totalPensiones, List<ClaseResumen> horario, String usuarioAlumno,
                          String usuarioApoderado, String correo, String correoDestino, String mensajeCuentas,
                          HermanoEstado descuentoHermano) {}
}
```

---

## 20. `CampaniaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/CampaniaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Campania`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.CampaniaRequest;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.CampaniaResponse;
import pe.edu.upeu.eduspace.matricula.entity.CampaniaMatricula;
import pe.edu.upeu.eduspace.matricula.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.matricula.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.matricula.repository.CampaniaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CampaniaService {

    private final CampaniaRepository repo;

    @Transactional(readOnly = true)
    public List<CampaniaResponse> listar(Long anioId) {
        var lista = anioId != null ? repo.findByAnioIdOrderByFechaInicioDesc(anioId) : repo.findAllByOrderByFechaInicioDesc();
        return lista.stream().map(MatriculaMapper::toResponse).toList();
    }

    @Transactional
    public CampaniaResponse crear(CampaniaRequest req) {
        validar(req);
        if (repo.existsByAnioIdAndNombre(req.anioId(), req.nombre().trim())) {
            throw new BusinessRuleException("Ya existe una campaña con ese nombre para el año.");
        }
        return MatriculaMapper.toResponse(repo.save(CampaniaMatricula.builder()
            .anioId(req.anioId()).nombre(req.nombre().trim())
            .fechaInicio(req.fechaInicio()).fechaFin(req.fechaFin()).estado("PLANIFICADA").build()));
    }

    @Transactional
    public CampaniaResponse actualizar(Long id, CampaniaRequest req) {
        validar(req);
        CampaniaMatricula c = obtener(id);
        if ("CERRADA".equals(c.getEstado())) {
            throw new BusinessRuleException("Una campaña CERRADA no se puede modificar.");
        }
        c.setNombre(req.nombre().trim());
        c.setFechaInicio(req.fechaInicio());
        c.setFechaFin(req.fechaFin());
        return MatriculaMapper.toResponse(repo.save(c));
    }

    /** Solo una campaña ABIERTA por año. */
    @Transactional
    public CampaniaResponse abrir(Long id) {
        CampaniaMatricula c = obtener(id);
        if ("ABIERTA".equals(c.getEstado())) return MatriculaMapper.toResponse(c);
        if ("CERRADA".equals(c.getEstado())) {
            throw new BusinessRuleException("Una campaña CERRADA no se puede reabrir; cree una nueva.");
        }
        repo.findFirstByAnioIdAndEstado(c.getAnioId(), "ABIERTA").ifPresent(otra -> {
            throw new BusinessRuleException("Ya hay una campaña ABIERTA para este año: " + otra.getNombre());
        });
        c.setEstado("ABIERTA");
        return MatriculaMapper.toResponse(repo.save(c));
    }

    @Transactional
    public CampaniaResponse cerrar(Long id) {
        CampaniaMatricula c = obtener(id);
        if (!"ABIERTA".equals(c.getEstado())) {
            throw new BusinessRuleException("Solo se puede cerrar una campaña ABIERTA.");
        }
        c.setEstado("CERRADA");
        return MatriculaMapper.toResponse(repo.save(c));
    }

    private CampaniaMatricula obtener(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Campaña no encontrada: " + id));
    }

    private void validar(CampaniaRequest req) {
        if (req.fechaFin().isBefore(req.fechaInicio())) {
            throw new BusinessRuleException("La fecha fin no puede ser anterior a la fecha inicio.");
        }
    }
}
```

---

## 21. `CupoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/CupoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Cupo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.matricula.client.PlanificacionClient;
import pe.edu.upeu.eduspace.matricula.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.CupoResponse;
import pe.edu.upeu.eduspace.matricula.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.matricula.repository.CupoSeccionRepository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CupoService {

    private final CupoSeccionRepository cupoRepository;
    private final PlanificacionGateway planificacion;

    /** Crea o sincroniza la fila de cupo de la sección la primera vez que se usa. */
    @Transactional
    public void asegurar(PlanificacionClient.Seccion s) {
        short capacidad = s.capacidad() == null ? 0 : s.capacidad();
        if (capacidad <= 0) {
            throw new BusinessRuleException("La sección " + s.nombre() + " no tiene capacidad configurada en planificación.");
        }
        cupoRepository.insertarSiNoExiste(s.id(), s.anioId(), s.nivelId(), s.gradoId(), s.nombre(), capacidad);
        cupoRepository.ajustarCapacidad(s.id(), capacidad);
    }

    /** Reserva atómica de un cupo; sin cupo → 409. Debe ejecutarse dentro de la transacción de la matrícula. */
    @Transactional
    public void reservar(Long seccionId) {
        if (cupoRepository.reservar(seccionId) == 0) {
            throw new BusinessRuleException("La sección no tiene cupos disponibles.");
        }
    }

    @Transactional
    public void liberar(Long seccionId) {
        if (cupoRepository.liberar(seccionId) == 0) {
            log.warn("No se pudo liberar cupo de la sección {} (ya estaba en 0)", seccionId);
        }
    }

    /** Vacantes por grado: sincroniza con planificación las secciones del grado y devuelve su ocupación. */
    @Transactional
    public List<CupoResponse> vacantes(Long anioId, Long gradoId) {
        List<PlanificacionClient.Seccion> vigentes = planificacion.secciones(anioId, gradoId);
        for (PlanificacionClient.Seccion s : vigentes) {
            try {
                asegurar(s);
            } catch (BusinessRuleException e) {
                log.warn("Sección {} omitida de vacantes: {}", s.id(), e.getMessage());
            }
        }
        List<CupoResponse> res = new ArrayList<>();
        var cupos = gradoId != null
            ? cupoRepository.findByAnioIdAndGradoIdOrderBySeccionNombre(anioId, gradoId)
            : cupoRepository.findByAnioIdOrderByGradoIdAscSeccionNombreAsc(anioId);
        // Una sección eliminada en planificación deja su fila de cupo aquí: no se muestra. Si planificación no devolvió
        // secciones (caída o año vacío) no se puede afirmar nada y se devuelve lo que hay.
        var ids = vigentes.stream().map(PlanificacionClient.Seccion::id).collect(java.util.stream.Collectors.toSet());
        cupos.stream().filter(c -> ids.isEmpty() || ids.contains(c.getSeccionId())).forEach(c -> res.add(MatriculaMapper.toResponse(c)));
        return res;
    }
}
```

---

## 22. `EventoOutboxService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/EventoOutboxService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `EventoOutbox`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.MDC;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.matricula.entity.OutboxEvento;
import pe.edu.upeu.eduspace.matricula.event.EventoSobre;
import pe.edu.upeu.eduspace.matricula.event.MatriculaEvent;
import pe.edu.upeu.eduspace.matricula.repository.OutboxEventoRepository;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.UUID;

/** Escribe eventos en el outbox dentro de la MISMA transacción del cambio de negocio. */
@Service
@RequiredArgsConstructor
public class EventoOutboxService {

    private final OutboxEventoRepository outboxRepository;
    private final ObjectMapper objectMapper;

    @Transactional(propagation = Propagation.MANDATORY)
    public void registrar(String topic, MatriculaEvent payload) {
        UUID eventId = UUID.randomUUID();
        String traceId = MDC.get("traceId");
        EventoSobre<MatriculaEvent> sobre = EventoSobre.<MatriculaEvent>builder()
            .eventId(eventId)
            .eventType(topic)
            .occurredAt(LocalDateTime.now())
            .version(1)
            .traceId(traceId != null ? traceId : UUID.randomUUID().toString())
            .payload(payload)
            .build();
        outboxRepository.save(OutboxEvento.builder()
            .id(eventId)
            .aggregateType("MATRICULA")
            .aggregateId(String.valueOf(payload.getMatriculaId()))
            .topic(topic)
            .clave(String.valueOf(payload.getMatriculaId()))
            .payload(EventoSobre.escribir(objectMapper, sobre))
            .build());
    }
}
```

---

## 23. `MatriculaEnLineaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/MatriculaEnLineaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `MatriculaEnLinea`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.service;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pe.edu.upeu.eduspace.matricula.client.*;
import pe.edu.upeu.eduspace.matricula.config.MatriculaProperties;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.CupoResponse;
import pe.edu.upeu.eduspace.matricula.dto.PublicoDtos.*;
import pe.edu.upeu.eduspace.matricula.entity.Matricula;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaPublica;
import pe.edu.upeu.eduspace.matricula.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.matricula.exception.ServicioNoDisponibleException;
import pe.edu.upeu.eduspace.matricula.repository.CampaniaRepository;
import pe.edu.upeu.eduspace.matricula.repository.MatriculaPublicaRepository;
import pe.edu.upeu.eduspace.matricula.repository.MatriculaRepository;
import pe.edu.upeu.eduspace.matricula.util.PdfConstancia;
import pe.edu.upeu.eduspace.matricula.util.TarjetaSimulada;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Matrícula en línea desde el sitio público, de punta a punta: registra al alumno y a su apoderado, reserva el cupo
 * (pre-matrícula) y cobra la matrícula con la pasarela simulada; la matrícula queda POR_APROBAR. Cuando la administración la aprueba
 * se crean las cuentas de acceso (usuario nombre.apellido, clave inicial = documento) y se envía por correo la aprobación con los datos
 * para iniciar sesión, la constancia en PDF, el horario y las finanzas. Si la rechaza, se avisa por correo con el motivo.
 * Quien inicia el trámite recibe un token que debe presentar para pagar, ver el resumen o bajar la constancia.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MatriculaEnLineaService {

    private static final String[] DIAS = {"", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"};
    private static final DateTimeFormatter FECHA = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter FECHA_HORA = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    private static final SecureRandom RANDOM = new SecureRandom();

    private final MatriculaService matriculaService;
    private final MatriculaRepository matriculas;
    private final MatriculaPublicaRepository publicas;
    private final CampaniaRepository campanias;
    private final CupoService cupos;
    private final PlanificacionGateway planificacion;
    private final PlanificacionClient planificacionClient;
    private final AlumnosClient alumnos;
    private final PagoClient pago;
    private final AuthClient auth;
    private final NotificacionesClient notificaciones;
    private final MatriculaProperties props;

    // ------------------------------------------------------------------ oferta

    public Oferta oferta() {
        PlanificacionClient.Anio anio = planificacion.anioActivo();
        boolean abierta = campanias.findFirstByAnioIdAndEstado(anio.id(), "ABIERTA").isPresent();
        if (!abierta) {
            return new Oferta(anio.id(), anio.nombre(), false, "Las matrículas en línea no están abiertas por ahora. Escríbenos desde Contacto.", List.of(), List.of(), List.of());
        }
        Map<Long, Integer> vacantesPorGrado = new HashMap<>();
        for (CupoResponse c : cupos.vacantes(anio.id(), null)) vacantesPorGrado.merge(c.gradoId(), c.vacantes(), Integer::sum);
        Map<Long, List<GradoOferta>> porNivel = new TreeMap<>();
        Map<Long, String> nombreNivel = new HashMap<>();
        for (Long gradoId : new TreeSet<>(vacantesPorGrado.keySet())) {
            PlanificacionClient.Grado g = planificacion.grado(gradoId);
            PagoClient.OfertaCosto costo = costo(anio.id(), g.nivelId(), gradoId);
            PensionOferta pension = null;
            if (costo != null && costo.pension() != null) {
                int cuotas = costo.pension().numCuotas() == null ? 10 : costo.pension().numCuotas();
                pension = new PensionOferta(costo.pension().monto(), cuotas, costo.pension().monto().divide(BigDecimal.valueOf(cuotas), 2, RoundingMode.HALF_UP));
            }
            porNivel.computeIfAbsent(g.nivelId(), k -> new ArrayList<>()).add(new GradoOferta(g.id(), g.nombre(), vacantesPorGrado.get(gradoId),
                costo != null && costo.matricula() != null ? costo.matricula().monto() : null, pension));
            nombreNivel.put(g.nivelId(), g.nivelNombre());
        }
        List<NivelOferta> niveles = porNivel.entrySet().stream().map(e -> new NivelOferta(e.getKey(), nombreNivel.get(e.getKey()), e.getValue())).toList();
        return new Oferta(anio.id(), anio.nombre(), true, null, niveles, planes(), descuentosHermano());
    }

    /**
     * Los descuentos de la matrícula que son «por hermano» (el nombre empieza con «herm…»: tolera «Hermanos», «Hermano» o una errata como
     * «Hermmanos»); si no hay ninguno, la opción no se ofrece. No se exponen los demás descuentos del colegio: solo los que la familia puede pedir aquí.
     */
    private List<DescuentoHermanoOferta> descuentosHermano() {
        try {
            return pago.opcionesMatricula().stream().filter(d -> d.nombre() != null && d.nombre().toLowerCase().contains("herm"))
                .map(d -> new DescuentoHermanoOferta(d.id(), d.nombre(), d.tipo(), d.valor())).toList();
        } catch (Exception e) {
            log.warn("Sin descuentos por hermano desde pago-ms: {}", e.getMessage());
            return List.of();
        }
    }

    /** Las formas de pago con su descuento; si pago-ms no responde se ofrece solo la mensual (sin descuento) en vez de romper la oferta. */
    private List<PlanOferta> planes() {
        try {
            return pago.planesPago().stream().map(p -> new PlanOferta(p.id(), p.etiqueta(), p.descuentoPorcentaje())).toList();
        } catch (Exception e) {
            log.warn("Sin formas de pago desde pago-ms: {}", e.getMessage());
            return List.of(new PlanOferta("MENSUAL", "Mensual", BigDecimal.ZERO));
        }
    }

    // ------------------------------------------------------------------ iniciar

    public Inicio iniciar(Solicitud s) {
        PlanificacionClient.Anio anio = planificacion.anioActivo();
        if (campanias.findFirstByAnioIdAndEstado(anio.id(), "ABIERTA").isEmpty()) {
            throw new BusinessRuleException("Las matrículas en línea no están abiertas por ahora.");
        }
        PlanificacionClient.Grado grado = planificacion.grado(s.gradoId());
        List<CupoResponse> disponibles = cupos.vacantes(anio.id(), grado.id()).stream().filter(c -> c.vacantes() > 0)
            .sorted(Comparator.comparingInt(CupoResponse::vacantes).reversed().thenComparing(CupoResponse::seccionNombre)).toList();
        if (disponibles.isEmpty()) throw new BusinessRuleException("No quedan vacantes en " + grado.nombre() + ".");
        PagoClient.OfertaCosto costo = costo(anio.id(), grado.nivelId(), grado.id());
        if (costo == null || costo.matricula() == null) {
            throw new BusinessRuleException(grado.nombre() + " todavía no tiene tarifa de matrícula. Comunícate con secretaría.");
        }
        CupoResponse cupo = disponibles.get(0);          // la sección con más vacantes: reparte a los alumnos entre secciones
        // Un código de descuento se valida ANTES de registrar a nadie: así un código mal escrito no deja un alumno a medias.
        String codigoDescuento = vacioANulo(s.codigoDescuento());
        if (codigoDescuento != null) descuentoPorCodigo(codigoDescuento);
        // Lo mismo con el hermano (solo su documento): se valida antes de registrar a nadie. Debe haber un descuento «por hermano», el hermano ser otra
        // persona y haber un correo donde mandar el usuario y la clave con los que se paga (la secretaría confirma el parentesco antes de poder pagar).
        HermanoSolicitud hermano = s.hermano();
        DescuentoHermanoOferta descuentoHermano = null;
        if (hermano != null) {
            descuentoHermano = descuentosHermano().stream().findFirst()
                .orElseThrow(() -> new BusinessRuleException("Por ahora el colegio no ofrece descuento por hermano."));
            if (hermano.numeroDocumento().trim().equalsIgnoreCase(s.alumno().numeroDocumento().trim())) {
                throw new BusinessRuleException("El hermano no puede ser el mismo alumno que se matricula.");
            }
            if (vacioANulo(s.apoderado().email()) == null) {
                throw new BusinessRuleException("Escribe tu correo: ahí te enviaremos el usuario y la clave para pagar la matrícula con el descuento.");
            }
            verificarApoderadoDelHermano(hermano.numeroDocumento().trim(), s.apoderado());
        }

        AlumnoSolicitud a = s.alumno();
        ApoderadoSolicitud ap = s.apoderado();
        Long alumnoId;
        String alumnoNombre;
        Long apoderadoId;
        Long apoderadoUsuarioId;
        MatriculaPublica previa = retomable(a.numeroDocumento().trim(), ap.numeroDocumento().trim());
        if (previa != null) {
            // Una reserva anterior de esta misma familia venció sin pago: se reutiliza el registro del alumno en vez de pedir otro.
            alumnoId = matriculas.findById(previa.getMatriculaId()).orElseThrow().getAlumnoId();
            alumnoNombre = previa.getAlumnoApellidos() + ", " + previa.getAlumnoNombres();
            apoderadoId = previa.getApoderadoId();
            apoderadoUsuarioId = previa.getApoderadoUsuarioId();
        } else {
            AlumnosClient.AlumnoRegistrado reg = registrar(a, ap);
            alumnoId = reg.id();
            alumnoNombre = reg.nombreCompleto();
            apoderadoId = reg.apoderados().get(0).apoderado().id();
            apoderadoUsuarioId = reg.apoderados().get(0).apoderado().usuarioId();
        }

        // El descuento se calcula al generar las cuotas: tiene que estar asignado al alumno ANTES de crear la matrícula (que las dispara).
        if (codigoDescuento != null) asignarDescuento(codigoDescuento, alumnoId, anio.id());
        var m = matriculaService.crearEnLinea(alumnoId, cupo.seccionId(), props.getDiasReservaEnLinea(), vacioANulo(s.planPago()));
        PagoClient.CuotaResumen cuota = esperarCuotaMatricula(m.id());
        if (cuota == null) {
            matriculaService.anular(m.id(), "Matrícula en línea sin cuota de matrícula", null);
            throw new ServicioNoDisponibleException("No pudimos generar la cuota de matrícula. Intenta de nuevo en unos minutos.");
        }

        String token = generarToken();
        MatriculaPublica mp = publicas.save(MatriculaPublica.builder()
            .matriculaId(m.id()).tokenHash(hash(token)).apoderadoId(apoderadoId).apoderadoUsuarioId(apoderadoUsuarioId)
            .apoderadoNombre(ap.nombres().trim() + " " + ap.apellidos().trim()).apoderadoNombres(ap.nombres().trim()).apoderadoApellidos(ap.apellidos().trim()).apoderadoDocumento(ap.numeroDocumento().trim())
            .apoderadoEmail(vacioANulo(ap.email())).alumnoNombres(a.nombres().trim())
            .alumnoApellidos((a.apellidoPaterno().trim() + " " + (a.apellidoMaterno() == null ? "" : a.apellidoMaterno().trim())).trim())
            .alumnoDocumento(a.numeroDocumento().trim()).montoMatricula(cuota.saldo())
            .hermanoDocumento(hermano == null ? null : hermano.numeroDocumento().trim()).build());
        if (hermano != null) pedirDescuentoHermano(mp, m.id(), m.codigo(), descuentoHermano.id());
        log.info("Matrícula en línea iniciada: {} (sección {})", m.codigo(), cupo.seccionNombre());
        return new Inicio(m.codigo(), token, m.codigo(), alumnoNombre, grado.nombre(), cupo.seccionNombre(), turno(cupo.seccionId()),
            cuota.saldo(), m.venceEn() == null ? null : m.venceEn().format(FECHA_HORA), cuota.montoBase(), cuota.descuento());
    }

    // ------------------------------------------------------------------ código de descuento

    /** El descuento de un código para mostrarlo a la familia; lo mismo que se aplicará al reservar. */
    public DescuentoVista descuentoPorCodigo(String codigo) {
        try {
            PagoClient.DescuentoPublico d = pago.descuentoPorCodigo(codigo.trim());
            return new DescuentoVista(d.codigo(), d.nombre(), d.tipo(), d.valor(), d.aplicaA());
        } catch (FeignException.NotFound e) {
            throw new BusinessRuleException("Ese código de descuento no existe o ya no está vigente.");
        } catch (FeignException e) {
            throw new ServicioNoDisponibleException("No pudimos validar el código de descuento en este momento. Intenta de nuevo en unos minutos.");
        }
    }

    private void asignarDescuento(String codigo, Long alumnoId, Long anioId) {
        try {
            pago.asignarDescuentoPorCodigo(new PagoClient.AsignacionPorCodigo(codigo.trim(), alumnoId, anioId, null));
        } catch (FeignException.NotFound e) {
            throw new BusinessRuleException("Ese código de descuento ya no está vigente.");
        } catch (FeignException e) {
            throw new ServicioNoDisponibleException("No pudimos aplicar el código de descuento en este momento. Intenta de nuevo en unos minutos.");
        }
    }

    private AlumnosClient.AlumnoRegistrado registrar(AlumnoSolicitud a, ApoderadoSolicitud ap) {
        try {
            return alumnos.registrar(new AlumnosClient.RegistroAlumno(def(a.tipoDocumento()), a.numeroDocumento().trim(), a.nombres().trim(),
                a.apellidoPaterno().trim(), vacioANulo(a.apellidoMaterno()), a.fechaNacimiento().toString(), a.sexo(), "Peruana", ap.telefono().trim(),
                vacioANulo(a.email()), vacioANulo(a.direccion()), vacioANulo(a.distrito()), vacioANulo(a.colegioProcedencia()), List.of(new AlumnosClient.VinculoApoderado(new AlumnosClient.ApoderadoDatos(def(ap.tipoDocumento()), ap.numeroDocumento().trim(),
                    ap.nombres().trim(), ap.apellidos().trim(), ap.telefono().trim(), vacioANulo(ap.email())), ap.parentesco(), true, true, true, true))));
        } catch (FeignException.Conflict e) {
            throw new BusinessRuleException("Ya hay un alumno registrado con ese documento. Si ya tiene matrícula, ingresa al portal; si no, acércate a secretaría.");
        } catch (FeignException.BadRequest e) {
            throw new BusinessRuleException("Revisa los datos del alumno y del apoderado (documento, fecha de nacimiento y teléfono).");
        } catch (FeignException e) {
            throw new ServicioNoDisponibleException("No pudimos registrar la solicitud en este momento. Intenta de nuevo en unos minutos.");
        }
    }

    /** Intento anterior sin pago, ya vencido, del mismo alumno y con el mismo apoderado (mismo documento). */
    private MatriculaPublica retomable(String alumnoDocumento, String apoderadoDocumento) {
        return publicas.findFirstByAlumnoDocumentoAndEstadoOrderByCreadoEnDesc(alumnoDocumento, "INICIADA")
            .filter(p -> apoderadoDocumento.equalsIgnoreCase(p.getApoderadoDocumento()))
            .filter(p -> matriculas.findById(p.getMatriculaId()).map(x -> "ANULADO".equals(x.getEstado())).orElse(false))
            .orElse(null);
    }

    // ------------------------------------------------------------------ pagar (pasarela simulada)

    public Resumen pagar(String referencia, String token, Tarjeta tarjeta) {
        MatriculaPublica mp = autorizar(referencia, token);
        Matricula m = matriculas.findById(mp.getMatriculaId()).orElseThrow();
        if (!"INICIADA".equals(mp.getEstado())) return resumen(mp, m);
        if (!"PRE_MATRICULA".equals(m.getEstado())) {
            throw new BusinessRuleException("La reserva de esta matrícula ya no está vigente (estado " + m.getEstado() + "). Inicia una nueva solicitud.");
        }
        exigirDescuentoResuelto(mp);   // con un descuento por hermano en revisión no se cobra (pago-ms también lo impide)
        var r = TarjetaSimulada.procesar(tarjeta.numero(), tarjeta.vencimiento(), tarjeta.cvv(), YearMonth.now());
        if (!r.aprobada()) throw new ResponseStatusException(HttpStatus.PAYMENT_REQUIRED, r.mensaje());

        PagoClient.ResultadoCobro cobro;
        try {
            cobro = pago.cobrar(new PagoClient.CobroMatricula(m.getId(), m.getAlumnoId(), mp.getApoderadoNombre(), mp.getApoderadoDocumento(), r.referencia()));
        } catch (FeignException e) {
            log.warn("pago-ms rechazó el cobro de la matrícula {}: {}", m.getCodigo(), e.status());
            throw new ServicioNoDisponibleException("No pudimos registrar el pago. No se hizo ningún cobro; intenta de nuevo.");
        }
        matriculaService.confirmarPorPago(m.getId(), cobro.pagoId());   // → POR_APROBAR; idempotente: el evento pago.confirmado llegará después
        mp.setEstado("PAGADA");
        mp.setPagoId(cobro.pagoId());
        mp.setComprobante(cobro.comprobante());
        mp.setMontoMatricula(cobro.monto());
        mp.setPagadaEn(LocalDateTime.now());
        publicas.save(mp);

        Matricula enRevision = matriculas.findById(m.getId()).orElseThrow();
        Resumen res = resumen(mp, enRevision);
        enviarCorreoRecibido(mp, enRevision, res);
        publicas.save(mp);
        return resumen(mp, enRevision);
    }

    // ------------------------------------------------------------------ descuento por hermano

    /**
     * Los datos del apoderado que escribe la familia deben coincidir con los del apoderado registrado del hermano: mismo documento y mismos nombres y
     * apellidos. Si no coinciden se le dice a la familia qué no coincide, antes de registrar nada. Si el documento del hermano no es de un alumno del
     * colegio no hay con qué comparar: la secretaría lo revisa.
     */
    private void verificarApoderadoDelHermano(String documentoHermano, ApoderadoSolicitud ap) {
        AlumnosClient.AlumnoBasico h;
        try {
            h = alumnos.alumnoPorDocumento(documentoHermano);
        } catch (FeignException.NotFound e) {
            return;
        } catch (FeignException e) {
            throw new ServicioNoDisponibleException("No pudimos comprobar los datos de tu hermano en este momento. Intenta de nuevo en unos minutos.");
        }
        List<AlumnosClient.ApoderadoDeAlumno> delHermano = alumnos.apoderadosDe(h.id());
        if (delHermano.isEmpty()) return;
        String doc = normalizarTexto(ap.numeroDocumento());
        var coincide = delHermano.stream().filter(x -> normalizarTexto(x.numeroDocumento()).equals(doc)).findFirst();
        if (coincide.isEmpty()) {
            throw new BusinessRuleException("Los datos del apoderado no coinciden: el documento que escribiste no es el del apoderado registrado de tu hermano. "
                + "Revisa el documento del apoderado o comunícate con secretaría.");
        }
        boolean nombres = normalizarTexto(coincide.get().nombres()).equals(normalizarTexto(ap.nombres()));
        boolean apellidos = normalizarTexto(coincide.get().apellidos()).equals(normalizarTexto(ap.apellidos()));
        if (!nombres || !apellidos) {
            String cuales = !nombres && !apellidos ? "nombres y apellidos" : !nombres ? "nombres" : "apellidos";
            throw new BusinessRuleException("Los datos del apoderado no coinciden con los registrados para tu hermano (" + cuales + "). "
                + "Revísalos o comunícate con secretaría.");
        }
    }

    /** Para comparar textos: sin espacios sobrantes, sin mayúsculas ni tildes, con los espacios interiores unidos. */
    static String normalizarTexto(String t) {
        if (t == null) return "";
        String s = java.text.Normalizer.normalize(t.trim(), java.text.Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        return s.toLowerCase(java.util.Locale.ROOT).replaceAll("\\s+", " ");
    }

    /**
     * Registra la solicitud de descuento por hermano en pago-ms con el documento que escribió la familia. Si ese documento es de un alumno del colegio
     * se enlaza para que la secretaría vea de inmediato si consta matriculado; si no, la solicitud igual se crea (la secretaría decide) y la familia
     * no se entera de si existe o no, así la web pública no sirve para averiguar qué documentos son de alumnos. Si no se puede registrar, la reserva
     * se anula para no dejar un trámite que prometía un descuento que nadie va a revisar.
     */
    private void pedirDescuentoHermano(MatriculaPublica mp, Long matriculaId, String codigo, Long descuentoId) {
        Long hermanoId = null;
        try {
            var h = alumnos.alumnoPorDocumento(mp.getHermanoDocumento());
            hermanoId = h.id();
            mp.setHermanoNombre(h.nombreCompleto());
            publicas.save(mp);
        } catch (FeignException.NotFound e) {
            log.info("El hermano pedido en {} no está registrado en el colegio; la secretaría lo verificará.", codigo);
        } catch (FeignException e) {
            log.warn("No se pudo buscar al hermano de {}: {}", codigo, e.getMessage());
        }
        try {
            pago.solicitudPublica(new PagoClient.PedidoHermano(matriculaId, descuentoId, hermanoId, mp.getHermanoDocumento(), mp.getHermanoNombre()));
        } catch (FeignException e) {
            log.warn("pago-ms no registró el descuento por hermano de {}: {}", codigo, e.status());
            matriculaService.anular(matriculaId, "Matrícula en línea sin solicitud de descuento por hermano", null);
            throw new ServicioNoDisponibleException("No pudimos registrar tu solicitud de descuento por hermano. Intenta de nuevo en unos minutos.");
        }
    }

    /**
     * La secretaría resolvió el descuento por hermano (aprobado o rechazado): la matrícula queda validada y en deuda. Se crean las cuentas de acceso del
     * apoderado y se le avisa por correo con su usuario y clave para que pague desde su cuenta (Pagos) o en caja, y la reserva se alarga para que dé tiempo.
     * Lo llama pago-ms; es idempotente (las cuentas ya creadas se respetan).
     */
    public void descuentoResuelto(Long matriculaId, String estado, String descuento, String motivo) {
        MatriculaPublica mp = publicas.findById(matriculaId).orElse(null);
        if (mp == null || mp.getHermanoDocumento() == null) return;
        Matricula m = matriculas.findById(matriculaId).orElseThrow();
        if (!"PRE_MATRICULA".equals(m.getEstado())) return;
        matriculaService.extenderReserva(matriculaId, props.getDiasReservaEnLinea());
        crearCuentas(mp, m);
        publicas.save(mp);
        enviarCorreoDescuentoResuelto(mp, m, estado, descuento, motivo);
        publicas.save(mp);
    }

    /** Tras pagar (en caja o en la cuenta del apoderado) una matrícula con descuento por hermano: ya quedó MATRICULADA, así que se entrega el acceso y la constancia. */
    public void accesoTrasPago(Long matriculaId) {
        MatriculaPublica mp = publicas.findById(matriculaId).orElse(null);
        if (mp == null || mp.getHermanoDocumento() == null) return;
        Matricula m = matriculas.findById(matriculaId).orElse(null);
        if (m == null || !"MATRICULADO".equals(m.getEstado())) return;
        aprobada(matriculaId);
    }

    private void enviarCorreoDescuentoResuelto(MatriculaPublica mp, Matricula m, String estado, String descuento, String motivo) {
        if (mp.getApoderadoEmail() == null) {
            mp.setCorreoEstado("OMITIDO");
            return;
        }
        try {
            BigDecimal monto = pago.cuotas(m.getId()).stream().filter(c -> "MATRICULA".equals(c.concepto())).map(PagoClient.CuotaResumen::saldo).findFirst().orElse(mp.getMontoMatricula());
            boolean aprobado = "APROBADA".equals(estado);
            String resultado = aprobado
                ? "La secretaría confirmó el parentesco de hermanos y aplicó el descuento «" + descuento + "»."
                : "La secretaría no pudo confirmar el descuento por hermano" + (motivo == null || motivo.isBlank() ? "" : " (" + motivo + ")") + ": la matrícula se paga completa.";
            String usuario = mp.getApoderadoUsuario() != null ? mp.getApoderadoUsuario() : "el que ya tenías";
            String cuerpo = resultado + " Matrícula de " + m.getAlumnoNombre() + " (" + m.getCodigo() + "): " + soles(monto) + ". Paga desde tu cuenta de apoderado (Pagos) en "
                + props.getPortalUrl() + " con el usuario " + usuario + " y como clave inicial tu número de documento, o acércate a caja. Si pagas en caja, ahí mismo quedas matriculado.";
            String html = "<p>Hola " + esc(mp.getApoderadoNombre()) + ",</p><p>" + esc(resultado) + "</p>"
                + "<p>Matrícula de <strong>" + esc(m.getAlumnoNombre()) + "</strong> (" + esc(m.getCodigo()) + "): <strong>" + soles(monto) + "</strong>.</p>"
                + "<h3 style=\"margin:18px 0 6px\">¿Cómo pagar?</h3><ul><li><strong>Desde tu cuenta de apoderado:</strong> ingresa a <a href=\"" + esc(props.getPortalUrl()) + "\">" + esc(props.getPortalUrl())
                + "</a> con el usuario <strong>" + esc(usuario) + "</strong>; tu clave inicial es tu número de documento (el sistema te pedirá cambiarla). La matrícula aparece en <em>Pagos</em>.</li>"
                + "<li><strong>En caja del colegio:</strong> indica el nombre del alumno; al pagar ahí queda matriculado.</li></ul>"
                + "<p style=\"font-size:13px;color:#4b5875\">Tu vacante queda reservada unos días más.</p>";
            notificaciones.enviar(new NotificacionesClient.Correo(mp.getApoderadoEmail(), "Tu matrícula está lista para pagar · " + props.getColegio(),
                marco("Matrícula lista para pagar", html), cuerpo, List.of()));
            mp.setCorreoEstado("ENVIADO");
        } catch (Exception e) {
            log.warn("No se pudo enviar el aviso de descuento resuelto de la matrícula {}: {}", m.getCodigo(), e.getMessage());
            mp.setCorreoEstado("ERROR");
        }
    }

    /** La solicitud de descuento de esta matrícula en pago-ms (null si todavía no se pidió, o si pago-ms no responde). */
    private PagoClient.SolicitudDescuento solicitudDe(Long matriculaId) {
        try {
            var r = pago.solicitudDeMatricula(matriculaId);
            return r == null ? null : r.solicitud();
        } catch (Exception e) {
            log.warn("No se pudo consultar el descuento de la matrícula {}: {}", matriculaId, e.getMessage());
            return null;
        }
    }

    /**
     * Con descuento por hermano no se paga desde esta página: primero la secretaría confirma el parentesco y deja la matrícula en deuda, y entonces la
     * familia paga desde su cuenta de apoderado o en caja (donde la matrícula se genera en el acto).
     */
    private void exigirDescuentoResuelto(MatriculaPublica mp) {
        if (mp.getHermanoDocumento() == null) return;
        throw new BusinessRuleException("Esta matrícula pidió descuento por hermano: la secretaría debe confirmar el parentesco. Después paga desde tu cuenta de apoderado (revisa tu correo) o en caja.");
    }

    private HermanoEstado hermanoEstado(MatriculaPublica mp) {
        if (mp.getHermanoDocumento() == null) return null;
        var s = solicitudDe(mp.getMatriculaId());
        String estado = s == null ? "EN_REVISION" : switch (s.estado()) {
            case "APROBADA" -> "APROBADO";
            case "RECHAZADA" -> "RECHAZADO";
            default -> "EN_REVISION";
        };
        return new HermanoEstado(estado, s == null ? null : s.descuentoNombre(), s == null ? null : s.motivoResolucion(), mp.getHermanoDocumento());
    }

    // ------------------------------------------------------------------ aprobación / rechazo (las dispara la administración)

    /**
     * Después de aprobar la matrícula: crea las cuentas de acceso y envía al apoderado el correo de aprobación con el usuario y la
     * clave inicial, la constancia, el horario y las finanzas. Solo aplica a trámites del sitio público; los demás los atiende secretaría.
     * Los pasos de cuentas y correo no deshacen la aprobación: si fallan quedan registrados y se pueden reenviar.
     */
    public void aprobada(Long matriculaId) {
        MatriculaPublica mp = publicas.findById(matriculaId).orElse(null);
        if (mp == null || "APROBADA".equals(mp.getEstado()) || "RECHAZADA".equals(mp.getEstado())) return;
        accesoYCorreo(mp, matriculas.findById(matriculaId).orElseThrow());
        mp.setEstado("APROBADA");
        publicas.save(mp);
    }

    /** Reenvía el correo de acceso de una matrícula ya aprobada (por ejemplo si el apoderado lo perdió o falló el envío). */
    public Resumen reenviarAcceso(Long matriculaId) {
        MatriculaPublica mp = publicas.findById(matriculaId)
            .orElseThrow(() -> new BusinessRuleException("Esta matrícula no se hizo en línea: el acceso lo entrega secretaría."));
        Matricula m = matriculas.findById(matriculaId).orElseThrow();
        if (!"MATRICULADO".equals(m.getEstado())) throw new BusinessRuleException("Solo se reenvía el acceso de una matrícula aprobada.");
        accesoYCorreo(mp, m);
        mp.setEstado("APROBADA");
        publicas.save(mp);
        return resumen(mp, m);
    }

    /** Después de rechazar: avisa por correo al apoderado (si dejó uno) con el motivo. */
    public void rechazada(Long matriculaId, String motivo) {
        MatriculaPublica mp = publicas.findById(matriculaId).orElse(null);
        if (mp == null) return;
        mp.setEstado("RECHAZADA");
        if (mp.getApoderadoEmail() == null) {
            mp.setCorreoEstado("OMITIDO");
        } else {
            Matricula m = matriculas.findById(matriculaId).orElseThrow();
            try {
                String cuerpo = "La matrícula de " + m.getAlumnoNombre() + " (" + m.getCodigo() + ") no fue aprobada. Motivo: " + motivo
                    + ". El colegio se comunicará contigo para devolver el pago de la matrícula.";
                notificaciones.enviar(new NotificacionesClient.Correo(mp.getApoderadoEmail(), "Matrícula no aprobada · " + props.getColegio(),
                    marco("Matrícula no aprobada", "<p>Hola " + esc(mp.getApoderadoNombre()) + ",</p><p>" + esc(cuerpo) + "</p>"), cuerpo, List.of()));
                mp.setCorreoEstado("ENVIADO");
            } catch (Exception e) {
                log.warn("No se pudo enviar el correo de rechazo de la matrícula {}: {}", m.getCodigo(), e.getMessage());
                mp.setCorreoEstado("ERROR");
            }
        }
        publicas.save(mp);
    }

    private void accesoYCorreo(MatriculaPublica mp, Matricula m) {
        crearCuentas(mp, m);
        publicas.save(mp);
        Resumen res = resumenAprobado(mp, m);
        enviarCorreoAprobacion(mp, m, res);
    }

    // ------------------------------------------------------------------ consultas

    public Resumen resumen(String referencia, String token) {
        MatriculaPublica mp = autorizar(referencia, token);
        return resumen(mp, matriculas.findById(mp.getMatriculaId()).orElseThrow());
    }

    public byte[] constancia(String referencia, String token) {
        MatriculaPublica mp = autorizar(referencia, token);
        if (!"APROBADA".equals(mp.getEstado())) throw new BusinessRuleException("La constancia se emite cuando la administración aprueba la matrícula.");
        Matricula m = matriculas.findById(mp.getMatriculaId()).orElseThrow();
        return pdf(mp, m, resumen(mp, m));
    }

    // ------------------------------------------------------------------ cuentas y correo

    private void crearCuentas(MatriculaPublica mp, Matricula m) {
        if (mp.getAlumnoUsuario() == null) {
            try {
                AuthClient.Cuenta c = auth.crear(new AuthClient.CuentaPersona(mp.getAlumnoNombres(), mp.getAlumnoApellidos(), mp.getAlumnoDocumento(), "ALUMNO", null));
                mp.setAlumnoUsuario(c.username());     // la cuenta ya existe: se registra aunque el vínculo falle
                alumnos.vincularAlumno(m.getAlumnoId(), new AlumnosClient.VinculoUsuario(c.id()));
            } catch (Exception e) {
                log.warn("Cuenta del alumno de la matrícula {} incompleta (revisar el vínculo en Cuentas de acceso): {}", m.getCodigo(), e.getMessage());
            }
        }
        if (mp.getApoderadoUsuarioId() == null && mp.getApoderadoUsuario() == null) {
            try {
                String[] partes = mp.getApoderadoNombre().split(" ", 2);
                String nombres = mp.getApoderadoNombres() != null ? mp.getApoderadoNombres() : partes[0];
                String apellidos = mp.getApoderadoApellidos() != null ? mp.getApoderadoApellidos() : (partes.length > 1 ? partes[1] : partes[0]);
                AuthClient.Cuenta c = auth.crear(new AuthClient.CuentaPersona(nombres, apellidos, mp.getApoderadoDocumento(), "APODERADO", mp.getApoderadoEmail()));
                mp.setApoderadoUsuario(c.username());
                mp.setApoderadoUsuarioId(c.id());
                alumnos.vincularApoderado(mp.getApoderadoId(), new AlumnosClient.VinculoUsuario(c.id()));
            } catch (Exception e) {
                log.warn("Cuenta del apoderado de la matrícula {} incompleta (revisar el vínculo en Cuentas de acceso): {}", m.getCodigo(), e.getMessage());
            }
        }
    }

    /** Pago recibido: aviso breve de que la matrícula está en revisión (todavía sin usuario ni clave). Sin correo del apoderado se omite. */
    private void enviarCorreoRecibido(MatriculaPublica mp, Matricula m, Resumen r) {
        if (mp.getApoderadoEmail() == null) {
            mp.setCorreoEstado("OMITIDO");
            return;
        }
        try {
            String cuerpo = "Recibimos el pago de la matrícula de " + r.alumno() + " (" + m.getCodigo() + ") por " + soles(r.montoMatricula())
                + (r.comprobante() == null ? "" : ", comprobante " + r.comprobante()) + ". La administración la revisará y, cuando la apruebe, te enviaremos otro correo con tu usuario y clave para ingresar.";
            notificaciones.enviar(new NotificacionesClient.Correo(mp.getApoderadoEmail(), "Pago recibido · matrícula en revisión · " + props.getColegio(),
                marco("Pago recibido", "<p>Hola " + esc(mp.getApoderadoNombre()) + ",</p><p>" + esc(cuerpo) + "</p><p style=\"font-size:13px;color:#4b5875\">Tu cupo está reservado mientras se revisa. Este pago fue simulado (demostración).</p>"),
                cuerpo, List.of()));
            mp.setCorreoEstado("ENVIADO");
        } catch (Exception e) {
            log.warn("No se pudo enviar el correo de pago recibido de la matrícula {}: {}", m.getCodigo(), e.getMessage());
            mp.setCorreoEstado("ERROR");
        }
    }

    /** Matrícula aprobada: correo con los datos para iniciar sesión y la constancia en PDF. Sin correo del apoderado se omite. */
    private void enviarCorreoAprobacion(MatriculaPublica mp, Matricula m, Resumen r) {
        if (mp.getApoderadoEmail() == null) {
            mp.setCorreoEstado("OMITIDO");
            return;
        }
        try {
            byte[] pdf = pdf(mp, m, r);
            notificaciones.enviar(new NotificacionesClient.Correo(mp.getApoderadoEmail(),
                "Matrícula aprobada · " + r.alumno() + " · " + props.getColegio(), html(r), texto(r),
                List.of(new NotificacionesClient.Adjunto("Constancia-matricula-" + m.getCodigo() + ".pdf", "application/pdf", Base64.getEncoder().encodeToString(pdf)))));
            mp.setCorreoEstado("ENVIADO");
        } catch (Exception e) {
            log.warn("No se pudo enviar el correo de aprobación de la matrícula {}: {}", m.getCodigo(), e.getMessage());
            mp.setCorreoEstado("ERROR");
        }
    }

    private String marco(String titulo, String cuerpoHtml) {
        return "<div style=\"font-family:Arial,Helvetica,sans-serif;color:#14213d;max-width:620px;margin:auto\">"
            + "<div style=\"background:#1f3a87;color:#fff;padding:18px 22px;border-radius:12px 12px 0 0\"><strong style=\"font-size:18px\">" + esc(props.getColegio())
            + "</strong><br/><span>" + esc(titulo) + "</span></div>"
            + "<div style=\"border:1px solid #e3e8f3;border-top:0;padding:20px 22px;border-radius:0 0 12px 12px\">" + cuerpoHtml + "</div></div>";
    }

    // ------------------------------------------------------------------ armado del resumen

    private Resumen resumen(MatriculaPublica mp, Matricula m) {
        PlanificacionClient.Grado grado = planificacion.grado(m.getGradoId());
        PlanificacionClient.Seccion sec = planificacion.seccion(m.getSeccionId());
        List<PensionResumen> pensiones = List.of();
        BigDecimal total = BigDecimal.ZERO;
        List<ClaseResumen> horario = List.of();
        if ("APROBADA".equals(mp.getEstado())) {
            List<PagoClient.CuotaResumen> cuotas = esperarPensiones(m.getId());
            pensiones = cuotas.stream().filter(c -> "PENSION".equals(c.concepto())).map(c -> new PensionResumen(c.descripcion(), fechaCorta(c.fechaVencimiento()), c.montoTotal())).toList();
            total = pensiones.stream().map(PensionResumen::monto).reduce(BigDecimal.ZERO, BigDecimal::add);
            horario = horario(sec.id());
        }
        String correoDestino = mp.getApoderadoEmail() == null ? null : enmascarar(mp.getApoderadoEmail());
        boolean aprobada = "APROBADA".equals(mp.getEstado());
        String cuentas = mp.getAlumnoUsuario() == null && aprobada
            ? "No pudimos crear las cuentas automáticamente: secretaría las creará y te avisará." : null;
        HermanoEstado hermano = hermanoEstado(mp);
        BigDecimal montoMatricula = mp.getMontoMatricula();
        if (hermano != null && "INICIADA".equals(mp.getEstado())) {
            // Mientras se decide el descuento el monto cambia (al aprobar se recalcula): se muestra el que se pagará de verdad
            try {
                montoMatricula = pago.cuotas(m.getId()).stream().filter(c -> "MATRICULA".equals(c.concepto())).map(PagoClient.CuotaResumen::saldo).findFirst().orElse(montoMatricula);
            } catch (Exception e) {
                log.warn("No se pudo leer el monto actual de la matrícula {}: {}", m.getCodigo(), e.getMessage());
            }
        }
        return new Resumen(mp.getEstado(), m.getCodigo(), m.getCodigo(), m.getAlumnoNombre(), mp.getAlumnoDocumento(), mp.getApoderadoNombre(), grado.nombre(),
            sec.nombre(), turnoTexto(sec.turno()), montoMatricula, mp.getComprobante(),
            mp.getPagadaEn() == null ? null : mp.getPagadaEn().format(FECHA_HORA), pensiones, total, horario, aprobada ? mp.getAlumnoUsuario() : null,
            aprobada ? mp.getApoderadoUsuario() : null, mp.getCorreoEstado(), correoDestino, cuentas, hermano);
    }

    /** Resumen completo para el correo de aprobación (el trámite se marca APROBADA justo después de enviarlo). */
    private Resumen resumenAprobado(MatriculaPublica mp, Matricula m) {
        String previo = mp.getEstado();
        mp.setEstado("APROBADA");
        try {
            return resumen(mp, m);
        } finally {
            mp.setEstado(previo);
        }
    }

    private List<ClaseResumen> horario(Long seccionId) {
        try {
            var h = planificacionClient.horario(seccionId);
            return h.clases().stream().sorted(Comparator.comparing((PlanificacionClient.Clase c) -> c.diaSemana()).thenComparing(PlanificacionClient.Clase::bloqueOrden))
                .map(c -> new ClaseResumen(DIAS[c.diaSemana()], c.horaInicio().substring(0, 5) + "–" + c.horaFin().substring(0, 5), c.cursoNombre(), c.docenteNombre())).toList();
        } catch (Exception e) {
            log.warn("Sin horario para la sección {}: {}", seccionId, e.getMessage());
            return List.of();
        }
    }

    private byte[] pdf(MatriculaPublica mp, Matricula m, Resumen r) {
        TreeMap<Short, String[]> filas = new TreeMap<>();
        TreeMap<Short, String> horas = new TreeMap<>();
        try {
            for (var c : planificacionClient.horario(m.getSeccionId()).clases()) {
                filas.computeIfAbsent(c.bloqueOrden(), k -> new String[5])[c.diaSemana() - 1] = c.cursoNombre();
                horas.put(c.bloqueOrden(), c.horaInicio().substring(0, 5) + "–" + c.horaFin().substring(0, 5));
            }
        } catch (Exception e) {
            log.warn("PDF sin horario de la sección {}: {}", m.getSeccionId(), e.getMessage());
        }
        List<PdfConstancia.FilaHorario> horario = filas.entrySet().stream().map(e -> new PdfConstancia.FilaHorario(horas.get(e.getKey()), e.getValue())).toList();
        List<PdfConstancia.Fila> pensiones = r.pensiones().stream().map(p -> new PdfConstancia.Fila(p.descripcion(), p.vence(), soles(p.monto()))).toList();
        return PdfConstancia.generar(new PdfConstancia.Datos(props.getColegio(), String.valueOf(LocalDate.now().getYear()), m.getCodigo(), LocalDate.now().format(FECHA),
            r.alumno(), r.alumnoDocumento(), r.grado(), r.seccion(), r.turno(), r.apoderado(), mp.getApoderadoDocumento(),
            mp.getApoderadoEmail(), soles(r.montoMatricula()), r.comprobante(), "Pago en línea (simulado)", r.pagadoEn(), pensiones, soles(r.totalPensiones()),
            horario, r.usuarioAlumno(), r.usuarioApoderado()));
    }

    // ------------------------------------------------------------------ correo (HTML y texto)

    private String html(Resumen r) {
        StringBuilder h = new StringBuilder();
        h.append("<div style=\"font-family:Arial,Helvetica,sans-serif;color:#14213d;max-width:620px;margin:auto\">")
            .append("<div style=\"background:#1f3a87;color:#fff;padding:18px 22px;border-radius:12px 12px 0 0\"><strong style=\"font-size:18px\">")
            .append(esc(props.getColegio())).append("</strong><br/><span>Matrícula aprobada</span></div>")
            .append("<div style=\"border:1px solid #e3e8f3;border-top:0;padding:20px 22px;border-radius:0 0 12px 12px\">")
            .append("<p>Hola ").append(esc(r.apoderado())).append(", la administración <strong>aprobó</strong> la matrícula de <strong>").append(esc(r.alumno())).append("</strong>. Ya pueden ingresar al portal.</p>")
            .append("<h3 style=\"margin:18px 0 6px\">Matrícula</h3><p style=\"margin:0\">Código <strong>").append(esc(r.codigo())).append("</strong> · ")
            .append(esc(r.grado())).append(" · sección ").append(esc(r.seccion())).append(" · turno ").append(esc(r.turno())).append("</p>")
            .append("<h3 style=\"margin:18px 0 6px\">Finanzas</h3><p style=\"margin:0\">Matrícula pagada: <strong>").append(soles(r.montoMatricula())).append("</strong>")
            .append(r.comprobante() == null ? "" : " · comprobante " + esc(r.comprobante())).append("</p>");
        if (!r.pensiones().isEmpty()) {
            h.append("<p style=\"margin:10px 0 4px\">Calendario de pensiones (total ").append(soles(r.totalPensiones())).append("):</p><table style=\"border-collapse:collapse;width:100%;font-size:14px\">");
            for (PensionResumen p : r.pensiones()) {
                h.append("<tr><td style=\"padding:4px 8px;border-bottom:1px solid #eef1f8\">").append(esc(p.descripcion())).append("</td><td style=\"padding:4px 8px;border-bottom:1px solid #eef1f8\">vence ")
                    .append(esc(p.vence())).append("</td><td style=\"padding:4px 8px;border-bottom:1px solid #eef1f8;text-align:right\">").append(soles(p.monto())).append("</td></tr>");
            }
            h.append("</table><p style=\"font-size:13px;color:#4b5875\">Puedes pagar en el portal (Pagos) o en caja del colegio.</p>");
        }
        h.append("<h3 style=\"margin:18px 0 6px\">Para iniciar sesión</h3><div style=\"background:#eef3ff;border:1px solid #c9d6f5;border-radius:10px;padding:12px 14px;font-size:15px\">")
            .append("Portal: <a href=\"").append(esc(props.getPortalUrl())).append("\">").append(esc(props.getPortalUrl())).append("</a><br/>")
            .append("Alumno · usuario: <strong>").append(r.usuarioAlumno() == null ? "lo creará secretaría" : esc(r.usuarioAlumno())).append("</strong> · clave inicial: su número de documento<br/>")
            .append("Apoderado · usuario: <strong>").append(r.usuarioApoderado() == null ? "ya tenías cuenta o la creará secretaría" : esc(r.usuarioApoderado())).append("</strong> · clave inicial: su número de documento</div>")
            .append("<p style=\"font-size:13px;color:#4b5875;margin:8px 0 0\">Por seguridad, el sistema te pedirá crear una clave nueva en tu primer ingreso. También puedes usar la app móvil del colegio con los mismos datos.</p>");
        if (!r.horario().isEmpty()) {
            h.append("<h3 style=\"margin:18px 0 6px\">Horario</h3><p style=\"margin:0;font-size:14px\">Está en la constancia adjunta (PDF). Primeras clases: ");
            r.horario().stream().limit(3).forEach(c -> h.append(esc(c.dia())).append(' ').append(esc(c.hora())).append(" ").append(esc(c.curso())).append("; "));
            h.append("</p>");
        } else {
            h.append("<h3 style=\"margin:18px 0 6px\">Horario</h3><p style=\"margin:0\">Todavía no está publicado; te avisaremos por el portal.</p>");
        }
        h.append("<h3 style=\"margin:18px 0 6px\">Pendiente</h3><p style=\"margin:0\">Presenta en secretaría copia del DNI del alumno, partida de nacimiento y ficha SIAGIE.</p>")
            .append("<p style=\"margin-top:20px;font-size:12px;color:#6b7694\">Adjuntamos la constancia de matrícula en PDF. Este pago fue simulado (demostración).</p></div></div>");
        return h.toString();
    }

    private String texto(Resumen r) {
        return "Matrícula aprobada: " + r.alumno() + " (" + r.codigo() + ") · " + r.grado() + " · sección " + r.seccion() + ". Matrícula pagada: "
            + soles(r.montoMatricula()) + ". Usuario del alumno: " + (r.usuarioAlumno() == null ? "lo creará secretaría" : r.usuarioAlumno())
            + ". Apoderado: " + (r.usuarioApoderado() == null ? "ya tenías cuenta o la creará secretaría" : r.usuarioApoderado())
            + ". La clave inicial de cada uno es su número de documento y el sistema pedirá cambiarla. Portal: " + props.getPortalUrl() + ". Adjuntamos la constancia en PDF.";
    }

    // ------------------------------------------------------------------ utilidades

    private PagoClient.OfertaCosto costo(Long anioId, Long nivelId, Long gradoId) {
        try {
            return pago.tarifa(anioId, nivelId, gradoId);
        } catch (Exception e) {
            log.warn("Sin tarifas para el grado {}: {}", gradoId, e.getMessage());
            return null;
        }
    }

    private PagoClient.CuotaResumen esperarCuotaMatricula(Long matriculaId) {
        for (int i = 0; i < 25; i++) {
            try {
                var c = pago.cuotas(matriculaId).stream().filter(x -> "MATRICULA".equals(x.concepto())).findFirst();
                if (c.isPresent()) return c.get();
            } catch (Exception e) {
                log.debug("Esperando la cuota de la matrícula {}: {}", matriculaId, e.getMessage());
            }
            dormir(400);
        }
        return null;
    }

    /** Las pensiones las genera pago-ms al recibir matricula.confirmada (asíncrono): se espera unos segundos. */
    private List<PagoClient.CuotaResumen> esperarPensiones(Long matriculaId) {
        List<PagoClient.CuotaResumen> ultimas = List.of();
        for (int i = 0; i < 20; i++) {
            try {
                ultimas = pago.cuotas(matriculaId);
                if (ultimas.stream().anyMatch(c -> "PENSION".equals(c.concepto()))) return ultimas;
            } catch (Exception e) {
                log.debug("Esperando las pensiones de la matrícula {}: {}", matriculaId, e.getMessage());
            }
            dormir(400);
        }
        return ultimas;
    }

    private MatriculaPublica autorizar(String referencia, String token) {
        Matricula m = matriculas.findByCodigo(referencia == null ? "" : referencia.trim()).orElse(null);
        MatriculaPublica mp = m == null ? null : publicas.findById(m.getId()).orElse(null);
        boolean valido = mp != null && token != null && MessageDigest.isEqual(hash(token).getBytes(StandardCharsets.UTF_8), mp.getTokenHash().getBytes(StandardCharsets.UTF_8));
        if (!valido) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "El enlace de la matrícula no es válido.");
        return mp;
    }

    private String turno(Long seccionId) {
        return turnoTexto(planificacion.seccion(seccionId).turno());
    }

    private static String turnoTexto(String t) {
        return "TARDE".equalsIgnoreCase(t) ? "tarde" : "mañana";
    }

    private static String generarToken() {
        byte[] b = new byte[24];
        RANDOM.nextBytes(b);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(b);
    }

    static String hash(String token) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private static void dormir(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private static String def(String tipo) {
        return tipo == null || tipo.isBlank() ? "DNI" : tipo;
    }

    private static String vacioANulo(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }

    private static String fechaCorta(String iso) {
        try {
            return LocalDate.parse(iso).format(FECHA);
        } catch (Exception e) {
            return iso;
        }
    }

    static String soles(BigDecimal v) {
        return "S/ " + (v == null ? "0.00" : v.setScale(2, RoundingMode.HALF_UP).toPlainString());
    }

    static String enmascarar(String correo) {
        int i = correo.indexOf('@');
        return i <= 1 ? "***" : correo.charAt(0) + "***" + correo.substring(i);
    }

    private static String esc(String s) {
        return s == null ? "" : s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
    }
}
```

---

## 24. `MatriculaMapper.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/MatriculaMapper.java`

### **¿Qué hace esta clase?**
Clase de mapeo (Mapper) que convierte entre entidades JPA y DTOs de solicitud/respuesta.

```java
package pe.edu.upeu.eduspace.matricula.service;

import pe.edu.upeu.eduspace.matricula.dto.Dtos.*;
import pe.edu.upeu.eduspace.matricula.entity.*;

public final class MatriculaMapper {

    private MatriculaMapper() {}

    public static MatriculaResponse toResponse(Matricula m) {
        return new MatriculaResponse(m.getId(), m.getCodigo(), m.getAlumnoId(), m.getAlumnoNombre(), m.getAnioId(),
            m.getNivelId(), m.getGradoId(), m.getSeccionId(), m.getCampaniaId(), m.getTipo(), m.getEstado(),
            m.getMatriculaAnteriorId(), m.getVenceEn(), m.getObservaciones(), m.getCreadoEn(), m.getConfirmadaEn(),
            m.getCerradaEn(), m.getMotivoCierre(), m.getPagadaEn(), m.getAprobadaEn(), m.getPlanPago());
    }

    public static RequisitoResponse toResponse(MatriculaRequisito r) {
        return new RequisitoResponse(r.getId(), r.getTipo(), r.getCumplido(), r.getObservacion(), r.getVerificadoPor(),
            r.getVerificadoEn());
    }

    public static HistorialResponse toResponse(MatriculaHistorial h) {
        return new HistorialResponse(h.getId(), h.getTipoCambio(), h.getEstadoAnterior(), h.getEstadoNuevo(),
            h.getSeccionAnteriorId(), h.getSeccionNuevaId(), h.getMotivo(), h.getUsuarioId(), h.getFecha());
    }

    public static CupoResponse toResponse(CupoSeccion c) {
        return new CupoResponse(c.getSeccionId(), c.getSeccionNombre(), c.getAnioId(), c.getGradoId(), c.getCapacidad(),
            c.getOcupados(), c.getCapacidad() - c.getOcupados());
    }

    public static CampaniaResponse toResponse(CampaniaMatricula c) {
        return new CampaniaResponse(c.getId(), c.getAnioId(), c.getNombre(), c.getFechaInicio(), c.getFechaFin(), c.getEstado());
    }
}
```

---

## 25. `MatriculaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/MatriculaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Matricula`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;
import pe.edu.upeu.eduspace.matricula.client.AlumnosClient;
import pe.edu.upeu.eduspace.matricula.client.AlumnosGateway;
import pe.edu.upeu.eduspace.matricula.client.PagoClient;
import pe.edu.upeu.eduspace.matricula.client.PlanificacionClient;
import pe.edu.upeu.eduspace.matricula.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.matricula.config.KafkaConfig;
import pe.edu.upeu.eduspace.matricula.config.MatriculaProperties;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.*;
import pe.edu.upeu.eduspace.matricula.dto.PageResponse;
import pe.edu.upeu.eduspace.matricula.entity.Matricula;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaHistorial;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaRequisito;
import pe.edu.upeu.eduspace.matricula.event.MatriculaEvent;
import pe.edu.upeu.eduspace.matricula.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.matricula.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.matricula.repository.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class MatriculaService {

    static final List<String> REQUISITOS = List.of("FICHA_FIRMADA", "CONSTANCIA_NO_ADEUDO", "CERTIFICADO_ESTUDIOS", "EXPEDIENTE_COMPLETO");

    private final MatriculaRepository matriculaRepository;
    private final CampaniaRepository campaniaRepository;
    private final RequisitoRepository requisitoRepository;
    private final HistorialRepository historialRepository;
    private final CupoService cupoService;
    private final EventoOutboxService outbox;
    private final AlumnosGateway alumnos;
    private final PlanificacionGateway planificacion;
    private final MatriculaProperties props;
    private final PagoClient pagoClient;
    private final MatriculaPublicaRepository publicas;
    private final TransactionTemplate tx;

    public MatriculaService(MatriculaRepository matriculaRepository, CampaniaRepository campaniaRepository,
                            RequisitoRepository requisitoRepository, HistorialRepository historialRepository,
                            CupoService cupoService, EventoOutboxService outbox, AlumnosGateway alumnos,
                            PlanificacionGateway planificacion, MatriculaProperties props,
                            PagoClient pagoClient, MatriculaPublicaRepository publicas,
                            PlatformTransactionManager txManager) {
        this.matriculaRepository = matriculaRepository;
        this.campaniaRepository = campaniaRepository;
        this.requisitoRepository = requisitoRepository;
        this.historialRepository = historialRepository;
        this.cupoService = cupoService;
        this.outbox = outbox;
        this.alumnos = alumnos;
        this.planificacion = planificacion;
        this.props = props;
        this.pagoClient = pagoClient;
        this.publicas = publicas;
        this.tx = new TransactionTemplate(txManager);
    }

    // ------------------------------------------------------------------ consultas

    @Transactional(readOnly = true)
    public PageResponse<MatriculaResponse> listar(Long anioId, Long gradoId, Long seccionId, String estado, String texto, Pageable pageable) {
        Page<Matricula> page = matriculaRepository.buscar(anioId, gradoId, seccionId, vacioANull(estado), texto == null ? "" : texto.trim(), pageable);
        return PageResponse.from(page.map(MatriculaMapper::toResponse));
    }

    @Transactional(readOnly = true)
    public MatriculaDetalleResponse detalle(Long id) {
        Matricula m = obtener(id);
        return new MatriculaDetalleResponse(MatriculaMapper.toResponse(m),
            requisitoRepository.findByMatriculaIdOrderByTipo(id).stream().map(MatriculaMapper::toResponse).toList(),
            historialRepository.findByMatriculaIdOrderByFechaDescIdDesc(id).stream().map(MatriculaMapper::toResponse).toList());
    }

    @Transactional(readOnly = true)
    public Matricula obtener(Long id) {
        return matriculaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada: " + id));
    }

    @Transactional(readOnly = true)
    public List<MatriculaResponse> delosAlumnos(Set<Long> alumnoIds) {
        if (alumnoIds.isEmpty()) return List.of();
        return matriculaRepository.findByAlumnoIdIn(alumnoIds).stream().map(MatriculaMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<AlumnoSeccionResponse> alumnosDeSeccion(Long seccionId) {
        return matriculaRepository.findBySeccionIdAndEstadoIn(seccionId, List.of("PRE_MATRICULA", "POR_APROBAR", "MATRICULADO")).stream()
            .map(m -> new AlumnoSeccionResponse(m.getId(), m.getCodigo(), m.getAlumnoId(), m.getAlumnoNombre(), m.getEstado()))
            .sorted(java.util.Comparator.comparing(AlumnoSeccionResponse::alumnoNombre))
            .toList();
    }

    @Transactional(readOnly = true)
    public List<InternalMatricula> vivasDeSeccion(Long seccionId) {
        return matriculaRepository.findBySeccionIdAndEstadoIn(seccionId, List.of("PRE_MATRICULA", "POR_APROBAR", "MATRICULADO")).stream()
            .map(this::internal).toList();
    }

    @Transactional(readOnly = true)
    public InternalMatricula vigenteDeAlumno(Long alumnoId, Long anioId) {
        Long anio = anioId != null ? anioId : planificacion.anioActivo().id();
        return matriculaRepository.findVivaByAlumnoAndAnio(alumnoId, anio)
            .map(this::internal)
            .orElseThrow(() -> new ResourceNotFoundException("El alumno " + alumnoId + " no tiene matrícula vigente en el año " + anio));
    }

    private InternalMatricula internal(Matricula m) {
        return new InternalMatricula(m.getId(), m.getAlumnoId(), m.getAlumnoNombre(), m.getAnioId(), m.getNivelId(),
            m.getGradoId(), m.getSeccionId(), m.getEstado(), m.getTipo());
    }

    // ------------------------------------------------------------------ creación

    /** Validaciones externas fuera de la transacción; cupo + matrícula + historial + outbox en UNA transacción. */
    public MatriculaResponse crear(MatriculaCreateRequest req, Long usuarioId) {
        return crearInterno(req.alumnoId(), req.seccionId(), req.tipo() != null ? req.tipo() : "NUEVA",
            req.observaciones(), null, usuarioId, true, props.getDiasVigenciaPrematricula(), req.planPago());
    }

    MatriculaResponse crearInterno(Long alumnoId, Long seccionId, String tipo, String observaciones,
                                   Long matriculaAnteriorId, Long usuarioId) {
        return crearInterno(alumnoId, seccionId, tipo, observaciones, matriculaAnteriorId, usuarioId, true, props.getDiasVigenciaPrematricula(), null);
    }

    /**
     * Pre-matrícula de la matrícula en línea: el expediente (DNI, partida y ficha SIAGIE) se verifica después en secretaría,
     * y la reserva vence pronto (el cupo no queda retenido si no se paga).
     */
    public MatriculaResponse crearEnLinea(Long alumnoId, Long seccionId, int diasVigencia, String planPago) {
        return crearInterno(alumnoId, seccionId, "NUEVA", "Matrícula en línea (sitio web)", null, null, false, diasVigencia, planPago);
    }

    /** La forma de pago acordada: sin dato (o desconocida) es mensual, como se generaban las cuotas antes. */
    static String planValido(String planPago) {
        if (planPago == null || planPago.isBlank()) return "MENSUAL";
        String p = planPago.trim().toUpperCase();
        return List.of("MENSUAL", "BIMESTRAL", "SEMESTRAL", "ANUAL").contains(p) ? p : "MENSUAL";
    }

    private MatriculaResponse crearInterno(Long alumnoId, Long seccionId, String tipo, String observaciones,
                                           Long matriculaAnteriorId, Long usuarioId, boolean exigirExpediente, int diasVigencia, String planPago) {
        PlanificacionClient.Seccion sec = planificacion.seccion(seccionId);
        var campania = campaniaRepository.findFirstByAnioIdAndEstado(sec.anioId(), "ABIERTA")
            .orElseThrow(() -> new BusinessRuleException("No hay una campaña de matrícula ABIERTA para el año de la sección."));

        AlumnosClient.AlumnoBasico alumno = alumnos.alumno(alumnoId);
        if (!"ACTIVO".equalsIgnoreCase(alumno.estado())) {
            throw new BusinessRuleException("El alumno no está ACTIVO (estado actual: " + alumno.estado() + ").");
        }
        if (matriculaRepository.findVivaByAlumnoAndAnio(alumnoId, sec.anioId()).isPresent()) {
            throw new BusinessRuleException("El alumno ya tiene una matrícula vigente en este año.");
        }
        if (exigirExpediente) {
            AlumnosClient.Expediente exp = alumnos.expediente(alumnoId);
            if (!exp.completo()) {
                throw new BusinessRuleException("El expediente del alumno está incompleto. Faltan: "
                    + (exp.faltantes() == null ? "documentos" : String.join(", ", exp.faltantes())));
            }
        }

        PlanificacionClient.Anio anio = planificacion.anio(sec.anioId());
        AlumnosClient.ResponsablePago responsable = alumnos.responsablePagoOpcional(alumnoId);
        PlanificacionClient.Grado grado = planificacion.grado(sec.gradoId());

        return tx.execute(status -> {
            cupoService.asegurar(sec);
            cupoService.reservar(sec.id());

            LocalDateTime ahora = LocalDateTime.now();
            String codigo = String.format("MAT-%s-%06d", anio.nombre() != null ? anio.nombre() : sec.anioId(),
                matriculaRepository.siguienteCorrelativo());
            Matricula m = matriculaRepository.save(Matricula.builder()
                .codigo(codigo)
                .alumnoId(alumnoId)
                .alumnoNombre(alumno.nombreCompleto())
                .anioId(sec.anioId())
                .nivelId(sec.nivelId())
                .gradoId(sec.gradoId())
                .seccionId(sec.id())
                .campaniaId(campania.getId())
                .tipo(tipo)
                .estado("PRE_MATRICULA")
                .planPago(planValido(planPago))
                .matriculaAnteriorId(matriculaAnteriorId)
                .venceEn(ahora.plusDays(diasVigencia))
                .observaciones(observaciones)
                .creadoPor(usuarioId)
                .creadoEn(ahora)
                .actualizadoEn(ahora)
                .build());

            for (String tipoReq : REQUISITOS) {
                boolean cumplido = "EXPEDIENTE_COMPLETO".equals(tipoReq) && exigirExpediente;
                requisitoRepository.save(MatriculaRequisito.builder()
                    .matriculaId(m.getId()).tipo(tipoReq).cumplido(cumplido)
                    .verificadoPor(cumplido ? usuarioId : null).verificadoEn(cumplido ? ahora : null)
                    .observacion(cumplido ? "Verificado automáticamente contra alumnos-ms" : null)
                    .build());
            }
            historial(m.getId(), "CREACION", null, "PRE_MATRICULA", null, sec.id(), observaciones, usuarioId);

            MatriculaEvent ev = evento(m, anio.nombre(), grado.nombre(), sec.nombre(), null, null);
            if (responsable != null) {
                ev.setResponsablePagoUsuarioId(responsable.usuarioId());
                ev.setResponsablePagoNombre(responsable.nombre());
            }
            outbox.registrar(KafkaConfig.TOPIC_MATRICULA_CREADA, ev);
            log.info("Matrícula {} creada para alumno {} en sección {}", codigo, alumnoId, sec.id());
            return MatriculaMapper.toResponse(m);
        });
    }

    // ------------------------------------------------------------------ confirmación (por pago)

    /**
     * Registra el pago de la matrícula: la pre-matrícula pasa a POR_APROBAR (ya no vence y sigue ocupando el cupo), pero todavía NO
     * es una matrícula: no se publica {@code matricula.confirmada} ni se generan pensiones hasta que la administración la apruebe.
     * Idempotente: si ya estaba POR_APROBAR o MATRICULADO no hace nada.
     */
    @Transactional
    public void confirmarPorPago(Long matriculaId, Long pagoId) {
        Matricula m = matriculaRepository.findById(matriculaId)
            .orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada: " + matriculaId));
        if ("MATRICULADO".equals(m.getEstado()) || "POR_APROBAR".equals(m.getEstado())) {
            log.info("Matrícula {} ya tenía el pago registrado ({}); pago {} ignorado.", matriculaId, m.getEstado(), pagoId);
            return;
        }
        if (!"PRE_MATRICULA".equals(m.getEstado())) {
            log.warn("ALERTA: pago {} recibido para matrícula {} en estado {}; requiere decisión manual.", pagoId, matriculaId, m.getEstado());
            historial(m.getId(), "CONFIRMACION", m.getEstado(), m.getEstado(), null, null,
                "Pago " + pagoId + " recibido con la matrícula en estado " + m.getEstado() + "; no se aprobó.", null);
            return;
        }
        String anterior = m.getEstado();
        m.setEstado("POR_APROBAR");
        m.setPagadaEn(LocalDateTime.now());
        m.setVenceEn(null);
        m.setActualizadoEn(LocalDateTime.now());
        matriculaRepository.save(m);
        historial(m.getId(), "PAGO", anterior, "POR_APROBAR", null, null, "Pago de matrícula " + pagoId + "; pendiente de aprobación", null);
    }

    /**
     * Pago confirmado de la matrícula hecho en caja, con la pasarela o con el crédito: si la cuota de matrícula quedó pagada POR COMPLETO, la
     * matrícula se GENERA aquí mismo (MATRICULADO + {@code matricula.confirmada}: pensiones, asistencia, tareas…), sin el paso «Por aprobar».
     * Un pago parcial no la genera. La matrícula en línea del sitio público sigue su camino de siempre (POR_APROBAR, con el acceso por correo).
     * Idempotente: si ya estaba POR_APROBAR o MATRICULADO no hace nada.
     */
    @Transactional
    public void confirmarYGenerarPorPago(Long matriculaId, Long pagoId) {
        Matricula m = matriculaRepository.findById(matriculaId)
            .orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada: " + matriculaId));
        if ("MATRICULADO".equals(m.getEstado()) || "POR_APROBAR".equals(m.getEstado())) {
            log.info("Matrícula {} ya tenía el pago registrado ({}); pago {} ignorado.", matriculaId, m.getEstado(), pagoId);
            return;
        }
        if (!"PRE_MATRICULA".equals(m.getEstado())) {
            confirmarPorPago(matriculaId, pagoId);   // deja la alerta de siempre para decisión manual
            return;
        }
        // Matrícula en línea: queda POR_APROBAR, salvo la que pidió descuento por hermano. Esa ya pasó por la secretaría (confirmó el parentesco y la dejó
        // en deuda) y no se puede pagar antes, así que quien paga en caja o desde la cuenta del apoderado queda matriculado en el acto.
        if (publicas.existsByMatriculaId(matriculaId) && !publicas.findById(matriculaId).map(p -> p.getHermanoDocumento() != null).orElse(false)) {
            confirmarPorPago(matriculaId, pagoId);
            return;
        }
        if (!matriculaPagadaPorCompleto(matriculaId)) {
            historial(m.getId(), "PAGO", m.getEstado(), m.getEstado(), null, null,
                "Pago " + pagoId + " de la matrícula; todavía falta pagar el resto para generarla.", null);
            log.info("Matrícula {}: pago {} parcial, no se genera todavía.", matriculaId, pagoId);
            return;
        }
        LocalDateTime ahora = LocalDateTime.now();
        m.setEstado("MATRICULADO");
        m.setPagadaEn(ahora);
        m.setConfirmadaEn(ahora);
        m.setAprobadaEn(ahora);
        m.setVenceEn(null);
        m.setActualizadoEn(ahora);
        matriculaRepository.save(m);
        historial(m.getId(), "PAGO", "PRE_MATRICULA", "MATRICULADO", null, null, "Pago de matrícula " + pagoId + " completo; matrícula generada", null);
        outbox.registrar(KafkaConfig.TOPIC_MATRICULA_CONFIRMADA, eventoConNombres(m, null, null));
        log.info("Matrícula {} generada por el pago {}.", m.getCodigo(), pagoId);
    }

    /** Alarga la reserva de una pre-matrícula (por ejemplo cuando la secretaría tardó en resolver un descuento y la familia necesita tiempo para pagar). */
    @Transactional
    public void extenderReserva(Long matriculaId, int dias) {
        Matricula m = matriculaRepository.findById(matriculaId)
            .orElseThrow(() -> new ResourceNotFoundException("Matrícula no encontrada: " + matriculaId));
        if (!"PRE_MATRICULA".equals(m.getEstado())) return;
        m.setVenceEn(LocalDateTime.now().plusDays(dias));
        m.setActualizadoEn(LocalDateTime.now());
        matriculaRepository.save(m);
    }

    /** ¿La cuota de matrícula ya no debe nada? Se consulta a pago-ms (el evento no dice cuánto queda). */
    private boolean matriculaPagadaPorCompleto(Long matriculaId) {
        var cuotas = pagoClient.cuotas(matriculaId).stream().filter(c -> "MATRICULA".equalsIgnoreCase(c.concepto())).toList();
        return !cuotas.isEmpty() && cuotas.stream().allMatch(c -> c.saldo() != null && c.saldo().signum() == 0);
    }

    // ------------------------------------------------------------------ aprobación administrativa

    /**
     * Aprueba una matrícula pagada: pasa a MATRICULADO y publica {@code matricula.confirmada} (pensiones, asistencia, tareas, etc.).
     * Idempotente: si ya estaba MATRICULADO devuelve el estado actual sin publicar otra vez.
     */
    @Transactional
    public MatriculaResponse aprobar(Long id, Long usuarioId) {
        Matricula m = obtener(id);
        if ("MATRICULADO".equals(m.getEstado())) return MatriculaMapper.toResponse(m);
        if ("PRE_MATRICULA".equals(m.getEstado())) {
            throw new BusinessRuleException("La matrícula aún no tiene el pago confirmado; no se puede aprobar.");
        }
        if (!"POR_APROBAR".equals(m.getEstado())) {
            throw new BusinessRuleException("Solo se puede aprobar una matrícula POR_APROBAR (estado actual: " + m.getEstado() + ").");
        }
        LocalDateTime ahora = LocalDateTime.now();
        m.setEstado("MATRICULADO");
        m.setConfirmadaEn(ahora);
        m.setAprobadaEn(ahora);
        m.setAprobadaPor(usuarioId);
        m.setVenceEn(null);
        m.setActualizadoEn(ahora);
        matriculaRepository.save(m);
        historial(m.getId(), "APROBACION", "POR_APROBAR", "MATRICULADO", null, null, "Aprobada por la administración", usuarioId);
        outbox.registrar(KafkaConfig.TOPIC_MATRICULA_CONFIRMADA, eventoConNombres(m, null, null));
        log.info("Matrícula {} aprobada por el usuario {}", m.getCodigo(), usuarioId);
        return MatriculaMapper.toResponse(m);
    }

    /** Rechaza una matrícula pagada: se anula, se libera el cupo y se publica {@code matricula.anulada}. El pago se devuelve desde Finanzas. */
    @Transactional
    public MatriculaResponse rechazar(Long id, String motivo, Long usuarioId) {
        Matricula m = obtener(id);
        if (!"POR_APROBAR".equals(m.getEstado())) {
            throw new BusinessRuleException("Solo se puede rechazar una matrícula POR_APROBAR (estado actual: " + m.getEstado() + ").");
        }
        if (motivo == null || motivo.isBlank()) throw new BusinessRuleException("Indica el motivo del rechazo.");
        return cerrar(m, "ANULADO", "RECHAZO", KafkaConfig.TOPIC_MATRICULA_ANULADA, motivo.trim(), usuarioId);
    }

    // ------------------------------------------------------------------ traslado

    public MatriculaResponse trasladar(Long id, TrasladoRequest req, Long usuarioId) {
        Matricula previa = obtener(id);
        PlanificacionClient.Seccion nueva = planificacion.seccion(req.nuevaSeccionId());
        if (nueva.id().equals(previa.getSeccionId())) {
            throw new BusinessRuleException("La matrícula ya pertenece a esa sección.");
        }
        if (!nueva.gradoId().equals(previa.getGradoId()) || !nueva.anioId().equals(previa.getAnioId())) {
            throw new BusinessRuleException("El traslado de sección debe ser dentro del mismo grado y año.");
        }
        return tx.execute(status -> {
            // Primero el cupo (consultas atómicas); si no hay cupo se lanza antes de tocar nada
            cupoService.asegurar(nueva);
            cupoService.reservar(nueva.id());
            Matricula m = obtener(id);
            if (!Set.of("PRE_MATRICULA", "MATRICULADO").contains(m.getEstado())) {
                throw new BusinessRuleException("Solo se puede trasladar de sección una matrícula vigente (estado " + m.getEstado() + ").");
            }
            Long anterior = m.getSeccionId();
            cupoService.liberar(anterior);
            m.setSeccionId(nueva.id());
            m.setActualizadoEn(LocalDateTime.now());
            matriculaRepository.save(m);
            historial(m.getId(), "TRASLADO_SECCION", m.getEstado(), m.getEstado(), anterior, nueva.id(), req.motivo(), usuarioId);
            outbox.registrar(KafkaConfig.TOPIC_MATRICULA_TRASLADADA, eventoConNombres(m, req.motivo(), anterior));
            return MatriculaMapper.toResponse(m);
        });
    }

    // ------------------------------------------------------------------ retiro / anulación

    @Transactional
    public MatriculaResponse retirar(Long id, RetiroRequest req, Long usuarioId) {
        Matricula m = obtener(id);
        if (!"MATRICULADO".equals(m.getEstado())) {
            throw new BusinessRuleException("Solo se puede retirar una matrícula MATRICULADO (estado actual: " + m.getEstado() + ").");
        }
        return cerrar(m, "RETIRADO", "RETIRO", KafkaConfig.TOPIC_MATRICULA_RETIRADA, req.motivo(), usuarioId);
    }

    @Transactional
    public MatriculaResponse anular(Long id, String motivo, Long usuarioId) {
        Matricula m = obtener(id);
        if (!"PRE_MATRICULA".equals(m.getEstado())) {
            throw new BusinessRuleException("Solo se puede anular una PRE_MATRICULA (estado actual: " + m.getEstado() + ").");
        }
        return cerrar(m, "ANULADO", "ANULACION", KafkaConfig.TOPIC_MATRICULA_ANULADA, motivo, usuarioId);
    }

    /** Usado por el job de vencimiento: anula una PRE_MATRICULA vencida liberando su cupo. */
    @Transactional
    public void anularPorVencimiento(Long id) {
        Matricula m = obtener(id);
        if ("PRE_MATRICULA".equals(m.getEstado()) && m.getVenceEn() != null && m.getVenceEn().isBefore(LocalDateTime.now())) {
            cerrar(m, "ANULADO", "ANULACION", KafkaConfig.TOPIC_MATRICULA_ANULADA, "Pre-matrícula vencida sin pago", null);
        }
    }

    private MatriculaResponse cerrar(Matricula m, String estadoNuevo, String tipoCambio, String topic, String motivo, Long usuarioId) {
        String anterior = m.getEstado();
        cupoService.liberar(m.getSeccionId());
        Matricula ref = obtener(m.getId());
        ref.setEstado(estadoNuevo);
        ref.setCerradaEn(LocalDateTime.now());
        ref.setMotivoCierre(motivo);
        ref.setVenceEn(null);
        ref.setActualizadoEn(LocalDateTime.now());
        matriculaRepository.save(ref);
        historial(ref.getId(), tipoCambio, anterior, estadoNuevo, null, null, motivo, usuarioId);
        outbox.registrar(topic, eventoConNombres(ref, motivo, null));
        log.info("Matrícula {} -> {} ({})", ref.getId(), estadoNuevo, motivo);
        return MatriculaMapper.toResponse(ref);
    }

    // ------------------------------------------------------------------ utilidades

    void historial(Long matriculaId, String tipo, String anterior, String nuevo, Long secAnterior, Long secNueva,
                   String motivo, Long usuarioId) {
        historialRepository.save(MatriculaHistorial.builder()
            .matriculaId(matriculaId).tipoCambio(tipo).estadoAnterior(anterior).estadoNuevo(nuevo)
            .seccionAnteriorId(secAnterior).seccionNuevaId(secNueva).motivo(motivo).usuarioId(usuarioId).build());
    }

    private MatriculaEvent evento(Matricula m, String anio, String gradoNombre, String seccionNombre, String motivo, Long seccionAnterior) {
        return MatriculaEvent.builder()
            .matriculaId(m.getId()).alumnoId(m.getAlumnoId()).alumnoNombre(m.getAlumnoNombre())
            .anio(anio).anioId(m.getAnioId()).nivelId(m.getNivelId())
            .gradoId(m.getGradoId()).gradoNombre(gradoNombre)
            .seccionId(m.getSeccionId()).seccionNombre(seccionNombre)
            .estado(m.getEstado()).tipo(m.getTipo()).motivo(motivo).seccionAnteriorId(seccionAnterior)
            .planPago(m.getPlanPago())
            .build();
    }

    /** Arma el evento con nombres de año/grado/sección; si planificación no responde, van sin nombres (solo informativos). */
    private MatriculaEvent eventoConNombres(Matricula m, String motivo, Long seccionAnterior) {
        String anio = null, grado = null, seccion = null;
        try { anio = planificacion.anio(m.getAnioId()).nombre(); } catch (Exception e) { log.debug("Sin nombre de año: {}", e.getMessage()); }
        try { grado = planificacion.grado(m.getGradoId()).nombre(); } catch (Exception e) { log.debug("Sin nombre de grado: {}", e.getMessage()); }
        try { seccion = planificacion.seccion(m.getSeccionId()).nombre(); } catch (Exception e) { log.debug("Sin nombre de sección: {}", e.getMessage()); }
        MatriculaEvent ev = evento(m, anio, grado, seccion, motivo, seccionAnterior);
        AlumnosClient.ResponsablePago rp = alumnos.responsablePagoOpcional(m.getAlumnoId());
        if (rp != null) {
            ev.setResponsablePagoUsuarioId(rp.usuarioId());
            ev.setResponsablePagoNombre(rp.nombre());
        }
        return ev;
    }

    private static String vacioANull(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }
}
```

---

## 26. `RatificacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/RatificacionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Ratificacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.matricula.client.PagoClient;
import pe.edu.upeu.eduspace.matricula.client.PlanificacionClient;
import pe.edu.upeu.eduspace.matricula.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.*;
import pe.edu.upeu.eduspace.matricula.entity.Matricula;
import pe.edu.upeu.eduspace.matricula.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.matricula.repository.CupoSeccionRepository;
import pe.edu.upeu.eduspace.matricula.repository.MatriculaRepository;

import java.util.ArrayList;
import java.util.List;

/**
 * Ratificación para el año siguiente (individual o masiva). Cada alumno se procesa en su propia transacción:
 * los que fallan se reportan sin detener a los demás. La decisión de "aprobó" la toma secretaría (MVP).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RatificacionService {

    private final MatriculaRepository matriculaRepository;
    private final MatriculaService matriculaService;
    private final PlanificacionGateway planificacion;
    private final CupoSeccionRepository cupoRepository;
    private final PagoClient pagoClient;

    public RatificacionResultado ratificar(RatificacionRequest req, Long usuarioId) {
        List<Matricula> origen = new ArrayList<>();
        if (req.matriculaAnteriorId() != null) {
            origen.add(matriculaService.obtener(req.matriculaAnteriorId()));
        } else if (req.seccionOrigenId() != null) {
            origen.addAll(matriculaRepository.findBySeccionIdAndEstadoIn(req.seccionOrigenId(), List.of("MATRICULADO")));
        } else {
            throw new BusinessRuleException("Indique matriculaAnteriorId (individual) o seccionOrigenId (masiva).");
        }
        if (req.seccionDestinoId() == null && req.gradoDestinoId() == null) {
            throw new BusinessRuleException("Indique seccionDestinoId o gradoDestinoId para ubicar a los alumnos.");
        }

        List<MatriculaResponse> creadas = new ArrayList<>();
        List<ErrorRatificacion> errores = new ArrayList<>();
        for (Matricula anterior : origen) {
            try {
                creadas.add(ratificarUna(anterior, req, usuarioId));
            } catch (Exception e) {
                log.warn("Ratificación fallida para matrícula {}: {}", anterior.getId(), e.getMessage());
                errores.add(new ErrorRatificacion(anterior.getId(), anterior.getAlumnoId(), e.getMessage()));
            }
        }
        return new RatificacionResultado(origen.size(), creadas.size(), creadas, errores);
    }

    private MatriculaResponse ratificarUna(Matricula anterior, RatificacionRequest req, Long usuarioId) {
        if (!"MATRICULADO".equals(anterior.getEstado())) {
            throw new BusinessRuleException("La matrícula anterior no está MATRICULADO (estado " + anterior.getEstado() + ").");
        }
        if (anterior.getAnioId().equals(req.anioDestinoId())) {
            throw new BusinessRuleException("El año destino debe ser distinto al de la matrícula anterior.");
        }
        PagoClient.Deuda deuda;
        try {
            deuda = pagoClient.deuda(anterior.getAlumnoId());
        } catch (Exception e) {
            throw new BusinessRuleException("No se pudo verificar la deuda del alumno en pago-ms; intente más tarde.");
        }
        if (deuda != null && deuda.tieneDeudaVencida()) {
            throw new BusinessRuleException("El alumno tiene deuda vencida (S/ " + deuda.montoVencido() + "); debe regularizarla.");
        }
        Long seccionDestino = req.seccionDestinoId() != null ? req.seccionDestinoId() : primeraSeccionConCupo(req);
        return matriculaService.crearInterno(anterior.getAlumnoId(), seccionDestino, "RATIFICACION",
            "Ratificación de la matrícula " + anterior.getCodigo(), anterior.getId(), usuarioId);
    }

    private Long primeraSeccionConCupo(RatificacionRequest req) {
        for (PlanificacionClient.Seccion s : planificacion.secciones(req.anioDestinoId(), req.gradoDestinoId())) {
            var cupo = cupoRepository.findById(s.id());
            int libres = cupo.map(c -> c.getCapacidad() - c.getOcupados()).orElse(s.capacidad() == null ? 0 : (int) s.capacidad());
            if (libres > 0) return s.id();
        }
        throw new BusinessRuleException("No hay secciones con cupo en el grado destino.");
    }
}
```

---

## 27. `RequisitoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/service/RequisitoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Requisito`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.RequisitoRequest;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.RequisitoResponse;
import pe.edu.upeu.eduspace.matricula.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.matricula.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.matricula.repository.MatriculaRepository;
import pe.edu.upeu.eduspace.matricula.repository.RequisitoRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RequisitoService {

    private final RequisitoRepository requisitoRepository;
    private final MatriculaRepository matriculaRepository;

    @Transactional
    public RequisitoResponse marcar(Long matriculaId, String tipo, RequisitoRequest req, Long usuarioId) {
        String t = tipo.toUpperCase();
        if (!MatriculaService.REQUISITOS.contains(t)) {
            throw new BusinessRuleException("Tipo de requisito inválido: " + tipo + ". Válidos: " + MatriculaService.REQUISITOS);
        }
        if (!matriculaRepository.existsById(matriculaId)) {
            throw new ResourceNotFoundException("Matrícula no encontrada: " + matriculaId);
        }
        var r = requisitoRepository.findByMatriculaIdAndTipo(matriculaId, t)
            .orElseThrow(() -> new ResourceNotFoundException("Requisito no encontrado: " + t));
        r.setCumplido(req.cumplido());
        r.setObservacion(req.observacion());
        r.setVerificadoPor(usuarioId);
        r.setVerificadoEn(LocalDateTime.now());
        return MatriculaMapper.toResponse(requisitoRepository.save(r));
    }
}
```

---

## 28. `CampaniaController.java` — Controladores REST API

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/CampaniaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Campania`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.matricula.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.CampaniaRequest;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.CampaniaResponse;
import pe.edu.upeu.eduspace.matricula.service.CampaniaService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/matriculas/campanias")
@RequiredArgsConstructor
@Tag(name = "Campañas de matrícula")
public class CampaniaController {

    private final CampaniaService service;

    @GetMapping
    public List<CampaniaResponse> listar(@RequestParam(required = false) Long anioId) {
        return service.listar(anioId);
    }

    @PostMapping
    @Operation(summary = "Crear campaña (ADMIN)")
    public ResponseEntity<CampaniaResponse> crear(@Valid @RequestBody CampaniaRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(req));
    }

    @PutMapping("/{id}")
    public CampaniaResponse actualizar(@PathVariable Long id, @Valid @RequestBody CampaniaRequest req) {
        return service.actualizar(id, req);
    }

    @PatchMapping("/{id}/abrir")
    @Operation(summary = "Abrir campaña (una ABIERTA por año)")
    public CampaniaResponse abrir(@PathVariable Long id) {
        return service.abrir(id);
    }

    @PatchMapping("/{id}/cerrar")
    public CampaniaResponse cerrar(@PathVariable Long id) {
        return service.cerrar(id);
    }
}
```

---

## 29. `InternalMatriculaController.java` — Controladores REST API

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/InternalMatriculaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `InternalMatricula`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.matricula.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.InternalMatricula;
import pe.edu.upeu.eduspace.matricula.service.MatriculaEnLineaService;
import pe.edu.upeu.eduspace.matricula.service.MatriculaService;

import java.util.List;

/** Solo accesible dentro de la red: el Gateway no enruta /internal/**. */
@RestController
@RequestMapping("/internal/matriculas")
@RequiredArgsConstructor
@Tag(name = "Internal Matrícula")
public class InternalMatriculaController {

    private final MatriculaService service;
    private final MatriculaEnLineaService enLinea;

    @GetMapping("/seccion/{seccionId}")
    public List<InternalMatricula> deSeccion(@PathVariable Long seccionId) {
        return service.vivasDeSeccion(seccionId);
    }

    /** Lo que pago-ms avisa cuando la secretaría resuelve un descuento por hermano pedido desde la matrícula en línea. */
    public record DescuentoResuelto(String estado, String descuento, String motivo) {}

    /** La secretaría resolvió el descuento por hermano: se crean las cuentas del apoderado y se le avisa por correo que ya puede pagar. */
    @PostMapping("/{matriculaId}/descuento-hermano-resuelto")
    public void descuentoHermanoResuelto(@PathVariable Long matriculaId, @RequestBody DescuentoResuelto body) {
        enLinea.descuentoResuelto(matriculaId, body.estado(), body.descuento(), body.motivo());
    }

    @GetMapping("/alumno/{alumnoId}")
    public InternalMatricula deAlumno(@PathVariable Long alumnoId, @RequestParam(required = false) Long anioId) {
        return service.vigenteDeAlumno(alumnoId, anioId);
    }
}
```

---

## 30. `MatriculaController.java` — Controladores REST API

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/MatriculaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Matricula`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.matricula.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.matricula.dto.Dtos.*;
import pe.edu.upeu.eduspace.matricula.dto.PageResponse;
import pe.edu.upeu.eduspace.matricula.security.IdentidadService;
import pe.edu.upeu.eduspace.matricula.service.CupoService;
import pe.edu.upeu.eduspace.matricula.service.MatriculaEnLineaService;
import pe.edu.upeu.eduspace.matricula.service.MatriculaService;
import pe.edu.upeu.eduspace.matricula.service.RatificacionService;
import pe.edu.upeu.eduspace.matricula.service.RequisitoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/matriculas")
@RequiredArgsConstructor
@Tag(name = "Matrículas", description = "Matrícula, cupos, traslados, retiros y ratificación")
public class MatriculaController {

    private final MatriculaService service;
    private final CupoService cupoService;
    private final RequisitoService requisitoService;
    private final RatificacionService ratificacionService;
    private final IdentidadService identidad;
    private final MatriculaEnLineaService enLinea;

    @GetMapping
    @Operation(summary = "Listar matrículas con filtros (ADMIN, SECRETARIA, DOCENTE)")
    public PageResponse<MatriculaResponse> listar(@RequestParam(required = false) Long anioId,
                                                  @RequestParam(required = false) Long gradoId,
                                                  @RequestParam(required = false) Long seccionId,
                                                  @RequestParam(required = false) String estado,
                                                  @RequestParam(required = false) String texto,
                                                  Pageable pageable) {
        return service.listar(anioId, gradoId, seccionId, estado, texto, pageable);
    }

    @GetMapping("/mias")
    @Operation(summary = "Matrículas de los hijos del apoderado (o del propio alumno)")
    public List<MatriculaResponse> mias(@AuthenticationPrincipal Jwt jwt) {
        return service.delosAlumnos(identidad.alumnosDelUsuario(jwt));
    }

    @GetMapping("/cupos")
    @Operation(summary = "Vacantes disponibles por sección")
    public List<CupoResponse> cupos(@RequestParam Long anioId, @RequestParam(required = false) Long gradoId) {
        return cupoService.vacantes(anioId, gradoId);
    }

    @GetMapping("/seccion/{seccionId}/alumnos")
    @Operation(summary = "Alumnos de una sección")
    public List<AlumnoSeccionResponse> alumnosDeSeccion(@PathVariable Long seccionId) {
        return service.alumnosDeSeccion(seccionId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalle con historial y requisitos (staff o dueño)")
    public MatriculaDetalleResponse detalle(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        MatriculaDetalleResponse d = service.detalle(id);
        identidad.exigirAcceso(jwt, d.matricula().alumnoId());
        return d;
    }

    @PostMapping
    @Operation(summary = "Crear matrícula en PRE_MATRICULA (ADMIN, SECRETARIA)")
    public ResponseEntity<MatriculaResponse> crear(@Valid @RequestBody MatriculaCreateRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(req, identidad.usuarioId(jwt)));
    }

    @PatchMapping("/{id}/traslado")
    @Operation(summary = "Trasladar de sección (mismo grado y año)")
    public MatriculaResponse trasladar(@PathVariable Long id, @Valid @RequestBody TrasladoRequest req, @AuthenticationPrincipal Jwt jwt) {
        return service.trasladar(id, req, identidad.usuarioId(jwt));
    }

    @PatchMapping("/{id}/retiro")
    @Operation(summary = "Retirar una matrícula MATRICULADO")
    public MatriculaResponse retirar(@PathVariable Long id, @Valid @RequestBody RetiroRequest req, @AuthenticationPrincipal Jwt jwt) {
        return service.retirar(id, req, identidad.usuarioId(jwt));
    }

    @PatchMapping("/{id}/anular")
    @Operation(summary = "Anular una PRE_MATRICULA")
    public MatriculaResponse anular(@PathVariable Long id, @RequestBody(required = false) AnulacionRequest req, @AuthenticationPrincipal Jwt jwt) {
        return service.anular(id, req == null ? null : req.motivo(), identidad.usuarioId(jwt));
    }

    @PatchMapping("/{id}/aprobar")
    @Operation(summary = "Aprobar una matrícula pagada (ADMIN o SECRETARIA): pasa a MATRICULADO y, si fue en línea, envía el acceso por correo")
    public MatriculaResponse aprobar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        MatriculaResponse r = service.aprobar(id, identidad.usuarioId(jwt));
        enLinea.aprobada(id);
        return r;
    }

    @PatchMapping("/{id}/rechazar")
    @Operation(summary = "Rechazar una matrícula pagada (ADMIN o SECRETARIA): se anula, libera el cupo y avisa por correo")
    public MatriculaResponse rechazar(@PathVariable Long id, @Valid @RequestBody AnulacionRequest req, @AuthenticationPrincipal Jwt jwt) {
        MatriculaResponse r = service.rechazar(id, req.motivo(), identidad.usuarioId(jwt));
        enLinea.rechazada(id, req.motivo());
        return r;
    }

    @PostMapping("/{id}/reenviar-acceso")
    @Operation(summary = "Reenviar el correo de acceso de una matrícula en línea ya aprobada (ADMIN o SECRETARIA)")
    public void reenviarAcceso(@PathVariable Long id) {
        enLinea.reenviarAcceso(id);
    }

    @PutMapping("/{id}/requisitos/{tipo}")
    @Operation(summary = "Marcar un requisito de la matrícula")
    public RequisitoResponse requisito(@PathVariable Long id, @PathVariable String tipo,
                                       @Valid @RequestBody RequisitoRequest req, @AuthenticationPrincipal Jwt jwt) {
        return requisitoService.marcar(id, tipo, req, identidad.usuarioId(jwt));
    }

    @PostMapping("/ratificacion")
    @Operation(summary = "Ratificación individual o masiva para el año siguiente")
    public RatificacionResultado ratificar(@Valid @RequestBody RatificacionRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ratificacionService.ratificar(req, identidad.usuarioId(jwt));
    }
}
```

---

## 31. `PublicoMatriculaController.java` — Controladores REST API

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/controller/PublicoMatriculaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `PublicoMatricula`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.matricula.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.matricula.dto.PublicoDtos.*;
import pe.edu.upeu.eduspace.matricula.service.MatriculaEnLineaService;

/**
 * Matrícula en línea del sitio web del colegio: no exige sesión. Protegida por el límite de peticiones del Gateway, la validación
 * de datos, el campo trampa y un token por trámite (quien lo inicia es quien puede pagar y bajar la constancia).
 */
@RestController
@RequestMapping("/api/v1/publico/matricula")
@RequiredArgsConstructor
@Tag(name = "Matrícula en línea (público)")
public class PublicoMatriculaController {

    static final String TOKEN = "X-Matricula-Token";

    private final MatriculaEnLineaService servicio;

    @GetMapping("/oferta")
    @Operation(summary = "Grados con vacantes y sus costos de matrícula y pensión")
    public Oferta oferta() {
        return servicio.oferta();
    }

    @GetMapping("/descuento/{codigo}")
    @Operation(summary = "Valida un código de descuento (404 si no existe o ya no está vigente)")
    public DescuentoVista descuento(@PathVariable String codigo) {
        return servicio.descuentoPorCodigo(codigo);
    }

    @PostMapping
    @Operation(summary = "Registra al alumno y a su apoderado y reserva el cupo; devuelve el token del trámite")
    public ResponseEntity<Inicio> iniciar(@Valid @RequestBody Solicitud solicitud) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.iniciar(solicitud));
    }

    @PostMapping("/{referencia}/pagar")
    @Operation(summary = "Paga la matrícula con la pasarela simulada, confirma la matrícula, crea las cuentas y envía el correo")
    public Resumen pagar(@PathVariable String referencia, @RequestHeader(TOKEN) String token, @Valid @RequestBody PagoRequest pago) {
        return servicio.pagar(referencia, token, pago.tarjeta());
    }

    @GetMapping("/{referencia}")
    public Resumen resumen(@PathVariable String referencia, @RequestHeader(TOKEN) String token) {
        return servicio.resumen(referencia, token);
    }

    @GetMapping(value = "/{referencia}/constancia", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> constancia(@PathVariable String referencia, @RequestHeader(TOKEN) String token) {
        byte[] pdf = servicio.constancia(referencia, token);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename("Constancia-matricula-" + referencia + ".pdf").build().toString())
            .header(HttpHeaders.CACHE_CONTROL, "no-store")
            .contentType(MediaType.APPLICATION_PDF).body(pdf);
    }
}
```

---

## 32. `OutboxPublisher.java` — Mensajería Kafka

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/messaging/OutboxPublisher.java`

### **¿Qué hace esta clase?**
Productor/publicador de eventos Apache Kafka. Envía eventos de dominio hacia topics específicos para que otros microservicios los procesen de forma asíncrona.

```java
package pe.edu.upeu.eduspace.matricula.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.matricula.config.MatriculaProperties;
import pe.edu.upeu.eduspace.matricula.entity.OutboxEvento;
import pe.edu.upeu.eduspace.matricula.repository.OutboxEventoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Envía a Kafka los eventos pendientes del outbox. Toma un lote con FOR UPDATE SKIP LOCKED (varias réplicas
 * no se pisan), espera la confirmación del broker y marca enviado; si falla suma un intento y guarda el error.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class OutboxPublisher {

    private final OutboxEventoRepository repo;
    private final KafkaTemplate<String, String> kafka;
    private final MatriculaProperties props;

    @Scheduled(fixedDelay = 1500)
    @Transactional
    public void publicarPendientes() {
        List<OutboxEvento> lote = repo.tomarLotePendiente(props.getMaxIntentosOutbox());
        for (OutboxEvento e : lote) {
            try {
                kafka.send(e.getTopic(), e.getClave(), e.getPayload()).get(5, TimeUnit.SECONDS);
                e.setEnviadoEn(LocalDateTime.now());
                e.setUltimoError(null);
            } catch (Exception ex) {
                if (ex instanceof InterruptedException) Thread.currentThread().interrupt();
                e.setIntentos((short) (e.getIntentos() + 1));
                e.setUltimoError(recortar(ex.getMessage()));
                if (e.getIntentos() >= props.getMaxIntentosOutbox()) {
                    log.error("ALERTA: evento outbox {} ({}) superó {} intentos: {}", e.getId(), e.getTopic(),
                        props.getMaxIntentosOutbox(), e.getUltimoError());
                } else {
                    log.warn("Fallo al publicar outbox {} ({}), intento {}: {}", e.getId(), e.getTopic(), e.getIntentos(), e.getUltimoError());
                }
                break; // conserva el orden: no se adelantan eventos posteriores
            }
        }
    }

    private static String recortar(String s) {
        if (s == null) return "Error desconocido";
        return s.length() > 480 ? s.substring(0, 480) : s;
    }
}
```

---

## 33. `PagoEventConsumer.java` — Mensajería Kafka

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/messaging/PagoEventConsumer.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Apache Kafka. Escucha mensajes de un topic específico y procesa los eventos de dominio recibidos de otros microservicios.

```java
package pe.edu.upeu.eduspace.matricula.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import pe.edu.upeu.eduspace.matricula.config.KafkaConfig;
import pe.edu.upeu.eduspace.matricula.entity.EventoProcesado;
import pe.edu.upeu.eduspace.matricula.entity.MatriculaHistorial;
import pe.edu.upeu.eduspace.matricula.event.EventoSobre;
import pe.edu.upeu.eduspace.matricula.event.PagoConfirmadoEvent;
import pe.edu.upeu.eduspace.matricula.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.matricula.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.matricula.repository.HistorialRepository;
import pe.edu.upeu.eduspace.matricula.service.MatriculaEnLineaService;
import pe.edu.upeu.eduspace.matricula.service.MatriculaService;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;

/**
 * pago.confirmado -> si la matrícula queda pagada por completo, la genera (solo concepto MATRICULA; la matrícula en línea queda por aprobar). pago.anulado -> deja constancia en el
 * historial; la reversión es una decisión manual de secretaría.
 */
@Slf4j
@Component
public class PagoEventConsumer {

    private static final int REINTENTOS_MATRICULA_NO_VISIBLE = 5;

    private final EventoProcesadoRepository eventoRepo;
    private final HistorialRepository historialRepo;
    private final MatriculaService matriculaService;
    private final MatriculaEnLineaService enLinea;
    private final ObjectMapper objectMapper;
    private final TransactionTemplate tx;

    public PagoEventConsumer(EventoProcesadoRepository eventoRepo, HistorialRepository historialRepo,
                             MatriculaService matriculaService, MatriculaEnLineaService enLinea, ObjectMapper objectMapper,
                             PlatformTransactionManager txManager) {
        this.eventoRepo = eventoRepo;
        this.historialRepo = historialRepo;
        this.matriculaService = matriculaService;
        this.enLinea = enLinea;
        this.objectMapper = objectMapper;
        this.tx = new TransactionTemplate(txManager);
    }

    @KafkaListener(topics = KafkaConfig.TOPIC_PAGO_CONFIRMADO, groupId = "matricula-ms")
    public void pagoConfirmado(String json) {
        procesar(json, false);
    }

    @KafkaListener(topics = KafkaConfig.TOPIC_PAGO_ANULADO, groupId = "matricula-ms")
    public void pagoAnulado(String json) {
        procesar(json, true);
    }

    /** Público para pruebas: procesa un mensaje con el sobre estándar. */
    public void procesar(String json, boolean anulado) {
        EventoSobre<PagoConfirmadoEvent> sobre;
        try {
            sobre = EventoSobre.leer(objectMapper, json, PagoConfirmadoEvent.class);
        } catch (Exception e) {
            log.error("pago.* mal formado descartado: {}", e.getMessage());
            return;
        }
        PagoConfirmadoEvent ev = sobre.getPayload();
        if (sobre.getTraceId() != null) MDC.put("traceId", sobre.getTraceId());
        try {
            if (sobre.getEventId() == null) {
                log.warn("Evento pago.* sin eventId descartado");
                return;
            }
            if (!"MATRICULA".equalsIgnoreCase(ev.getConceptoTipo()) || ev.getMatriculaId() == null) {
                log.debug("Evento {} ignorado (concepto {}).", sobre.getEventId(), ev.getConceptoTipo());
                return;
            }
            if (eventoRepo.existsByEventId(sobre.getEventId())) {
                log.info("Evento {} ya procesado; se ignora.", sobre.getEventId());
                return;
            }
            procesarConReintento(sobre, ev, anulado);
        } finally {
            MDC.remove("traceId");
        }
    }

    /**
     * Una matrícula en línea con descuento por hermano queda MATRICULADA al pagarse (en caja o en la cuenta del apoderado): se entrega el acceso y la
     * constancia por correo. Va después de confirmar la transacción y no deshace el pago si falla (se puede reenviar el acceso desde la matrícula).
     */
    private void entregarAcceso(Long matriculaId) {
        try {
            enLinea.accesoTrasPago(matriculaId);
        } catch (Exception e) {
            log.warn("No se pudo entregar el acceso de la matrícula {} tras el pago: {}", matriculaId, e.getMessage());
        }
    }

    private void procesarConReintento(EventoSobre<PagoConfirmadoEvent> sobre, PagoConfirmadoEvent ev, boolean anulado) {
        ResourceNotFoundException ultimo = null;
        for (int i = 1; i <= REINTENTOS_MATRICULA_NO_VISIBLE; i++) {
            try {
                tx.executeWithoutResult(status -> {
                    if (anulado) {
                        historialRepo.save(MatriculaHistorial.builder()
                            .matriculaId(ev.getMatriculaId()).tipoCambio("ANULACION")
                            .motivo("Pago de matrícula " + ev.getPagoId() + " anulado en pago-ms; requiere decisión de secretaría.").build());
                        log.warn("ALERTA SECRETARÍA: pago {} de la matrícula {} fue anulado.", ev.getPagoId(), ev.getMatriculaId());
                    } else {
                        matriculaService.confirmarYGenerarPorPago(ev.getMatriculaId(), ev.getPagoId());
                    }
                    eventoRepo.save(EventoProcesado.builder()
                        .eventId(sobre.getEventId()).eventType(sobre.getEventType() != null ? sobre.getEventType() : "pago.*").build());
                });
                if (!anulado) entregarAcceso(ev.getMatriculaId());
                return;
            } catch (ResourceNotFoundException e) {
                ultimo = e;
                log.warn("Matrícula {} aún no visible (intento {}/{}).", ev.getMatriculaId(), i, REINTENTOS_MATRICULA_NO_VISIBLE);
                try { Thread.sleep(500L * i); } catch (InterruptedException ie) { Thread.currentThread().interrupt(); return; }
            }
        }
        // Agotados los reintentos: se lanza para que el contenedor lo derive al manejo de errores (DLT/reintento del broker)
        throw new IllegalStateException("Matrícula " + ev.getMatriculaId() + " no existe tras reintentos", ultimo);
    }
}
```

---

## 34. `EventoSobre.java` — Eventos de Dominio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/event/EventoSobre.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.matricula.event;

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

## 35. `MatriculaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/event/MatriculaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.matricula.event;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Datos de negocio de matricula.* (el sobre estándar los lleva planos junto a eventId, eventType, etc.). */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatriculaEvent {

    private Long matriculaId;
    private Long alumnoId;
    private String alumnoNombre;
    private String anio;
    private Long anioId;
    private Long nivelId;
    private Long gradoId;
    private String gradoNombre;
    private Long seccionId;
    private String seccionNombre;
    private String estado;
    private String tipo;
    private Long seccionAnteriorId;
    private String motivo;
    /** Forma de pago de las pensiones acordada al matricular: pago-ms genera las cuotas según el plan. */
    private String planPago;
    private Long responsablePagoUsuarioId;
    private String responsablePagoNombre;
}
```

---

## 36. `PagoConfirmadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/event/PagoConfirmadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.matricula.event;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/** Copia propia del contrato pago.confirmado (solo lo que matrícula necesita). */
@Data
@NoArgsConstructor
public class PagoConfirmadoEvent {
    private Long pagoId;
    private Long alumnoId;
    private Long matriculaId;
    private String conceptoTipo;
    private BigDecimal monto;
}
```

---

## 37. `LimpiezaJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/scheduler/LimpiezaJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.matricula.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.matricula.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.matricula.repository.OutboxEventoRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class LimpiezaJob {

    private final EventoProcesadoRepository eventoRepo;
    private final OutboxEventoRepository outboxRepo;

    @Scheduled(cron = "0 0 3 * * *", zone = "America/Lima")
    @SchedulerLock(name = "matricula_limpieza_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void limpiar() {
        LocalDateTime limite = LocalDateTime.now().minusDays(30);
        long e = eventoRepo.deleteByProcesadoEnBefore(limite);
        long o = outboxRepo.deleteByEnviadoEnBefore(limite);
        log.info("Limpieza técnica: {} eventos procesados y {} outbox enviados eliminados.", e, o);
    }
}
```

---

## 38. `VencimientoJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/scheduler/VencimientoJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.matricula.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.matricula.entity.Matricula;
import pe.edu.upeu.eduspace.matricula.repository.MatriculaRepository;
import pe.edu.upeu.eduspace.matricula.service.MatriculaService;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class VencimientoJob {

    private final MatriculaRepository repo;
    private final MatriculaService service;

    @Scheduled(cron = "0 0 * * * *", zone = "America/Lima")
    @SchedulerLock(name = "matricula_vencimiento_job", lockAtLeastFor = "30s", lockAtMostFor = "10m")
    public void anularVencidas() {
        ejecutar();
    }

    /** Separado del @Scheduled para poder probarlo directamente. */
    public int ejecutar() {
        List<Matricula> vencidas = repo.findPreMatriculasVencidas(LocalDateTime.now());
        int n = 0;
        for (Matricula m : vencidas) {
            try {
                service.anularPorVencimiento(m.getId());
                n++;
            } catch (Exception e) {
                log.error("No se pudo anular la matrícula vencida {}: {}", m.getId(), e.getMessage());
            }
        }
        if (n > 0) log.info("{} pre-matrícula(s) vencidas anuladas", n);
        return n;
    }
}
```

---

## 39. `CacheConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/CacheConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.matricula.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    public static final String CACHE_SECCION = "seccionCache";
    public static final String CACHE_ANIO_ACTIVO = "anioActivoCache";
    public static final String CACHE_GRADO = "gradoCache";

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager m = new CaffeineCacheManager(CACHE_SECCION, CACHE_ANIO_ACTIVO, CACHE_GRADO);
        m.setCaffeine(Caffeine.newBuilder().expireAfterWrite(5, TimeUnit.MINUTES).maximumSize(1000));
        return m;
    }
}
```

---

## 40. `FeignConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/FeignConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.matricula.config;

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

## 41. `KafkaConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/KafkaConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.matricula.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class KafkaConfig {

    public static final String TOPIC_MATRICULA_CREADA = "matricula.creada";
    public static final String TOPIC_MATRICULA_CONFIRMADA = "matricula.confirmada";
    public static final String TOPIC_MATRICULA_TRASLADADA = "matricula.trasladada";
    public static final String TOPIC_MATRICULA_RETIRADA = "matricula.retirada";
    public static final String TOPIC_MATRICULA_ANULADA = "matricula.anulada";

    public static final String TOPIC_PAGO_CONFIRMADO = "pago.confirmado";
    public static final String TOPIC_PAGO_ANULADO = "pago.anulado";

    @Bean
    NewTopic matriculaCreada() { return TopicBuilder.name(TOPIC_MATRICULA_CREADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic matriculaConfirmada() { return TopicBuilder.name(TOPIC_MATRICULA_CONFIRMADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic matriculaTrasladada() { return TopicBuilder.name(TOPIC_MATRICULA_TRASLADADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic matriculaRetirada() { return TopicBuilder.name(TOPIC_MATRICULA_RETIRADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic matriculaAnulada() { return TopicBuilder.name(TOPIC_MATRICULA_ANULADA).partitions(3).replicas(1).build(); }
}
```

---

## 42. `KafkaErrorHandlingConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/KafkaErrorHandlingConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.matricula.config;

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
    private static final String[] TOPICOS_CONSUMIDOS = {"pago.confirmado", "pago.anulado"};

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

## 43. `MatriculaProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/MatriculaProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.upeu.eduspace.matricula.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.matricula")
public class MatriculaProperties {

    /** Días que una PRE_MATRICULA espera el pago antes de anularse. */
    private int diasVigenciaPrematricula = 7;
    private int maxIntentosOutbox = 10;
    /** Matrícula en línea (sitio público). */
    private String colegio = "Colegio Horizonte del Valle";
    /** Dirección del portal que se menciona en el correo de confirmación. */
    private String portalUrl = "http://localhost:4200";
    /** Días que la reserva de una matrícula en línea espera el pago antes de liberar el cupo. */
    private int diasReservaEnLinea = 1;
}
```

---

## 44. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.matricula.config;

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
                .title("EduSpace - Matricula Microservice API")
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

## 45. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.matricula.config;

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
                .requestMatchers("/internal/**").permitAll()
                .requestMatchers("/api/v1/publico/**").permitAll()   // matrícula en línea: sin sesión (ver PublicoMatriculaController)

                // Campañas
                .requestMatchers(HttpMethod.GET, "/api/v1/matriculas/campanias/**").hasAnyRole("ADMIN", "SECRETARIA", "DOCENTE")
                .requestMatchers("/api/v1/matriculas/campanias/**").hasRole("ADMIN")

                // Apoderado / alumno: solo lo propio (el filtro fino está en el servicio)
                .requestMatchers(HttpMethod.GET, "/api/v1/matriculas/mias").hasAnyRole("APODERADO", "ALUMNO")

                // Lectura de staff (antes del comodín /* para que /cupos no se confunda con un id)
                .requestMatchers(HttpMethod.GET, "/api/v1/matriculas", "/api/v1/matriculas/seccion/*/alumnos").hasAnyRole("ADMIN", "SECRETARIA", "DOCENTE")
                .requestMatchers(HttpMethod.GET, "/api/v1/matriculas/cupos").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers(HttpMethod.GET, "/api/v1/matriculas/*").hasAnyRole("ADMIN", "SECRETARIA", "DOCENTE", "APODERADO", "ALUMNO")

                // Escritura
                // Confirmar una matrícula pagada (aprobar/rechazar) y reenviar el acceso: administración y secretaría
                .requestMatchers(HttpMethod.PATCH, "/api/v1/matriculas/*/aprobar", "/api/v1/matriculas/*/rechazar").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers(HttpMethod.POST, "/api/v1/matriculas/*/reenviar-acceso").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers("/api/v1/matriculas/**").hasAnyRole("ADMIN", "SECRETARIA")
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
            if (jwt.getClaim("realm_access") instanceof Map<?, ?> ra && ra.get("roles") instanceof List<?> roles) {
                for (Object role : roles) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toString().toUpperCase()));
                }
            }
            List<String> directRoles = jwt.getClaimAsStringList("roles");
            if (directRoles != null) {
                for (String role : directRoles) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase().replace("ROLE_", "")));
                }
            }
            return authorities;
        }
    }
}
```

---

## 46. `ShedLockConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/config/ShedLockConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.matricula.config;

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

## 47. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.matricula.exception;

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

## 48. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.upeu.eduspace.matricula.exception;

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

## 49. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.matricula.exception;

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

    @ExceptionHandler(ServicioNoDisponibleException.class)
    public ResponseEntity<ErrorResponse> handleNoDisponible(ServicioNoDisponibleException ex, HttpServletRequest request) {
        return build(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage(), request);
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

## 50. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.matricula.exception;

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

## 51. `ServicioNoDisponibleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/exception/ServicioNoDisponibleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.matricula.exception;

/** Un servicio del que depende la operación no responde (se mapea a 503). */
public class ServicioNoDisponibleException extends RuntimeException {
    public ServicioNoDisponibleException(String mensaje) {
        super(mensaje);
    }
}
```

---

## 52. `AlumnosClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/AlumnosClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.matricula.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Contrato interno de alumnos-ms (adenda A3). */
@FeignClient(name = "alumnos-ms")
public interface AlumnosClient {

    @GetMapping("/internal/alumnos/{id}")
    AlumnoBasico alumno(@PathVariable("id") Long id);

    /** El alumno con ese número de documento (404 si no hay): así se ubica al hermano que declara la familia. */
    @GetMapping("/internal/alumnos/documento/{numero}")
    AlumnoBasico alumnoPorDocumento(@PathVariable("numero") String numero);

    /** Los apoderados registrados de un alumno, con su documento y nombres (para comprobar los datos del apoderado de un hermano). */
    @GetMapping("/internal/alumnos/{id}/apoderados")
    List<ApoderadoDeAlumno> apoderadosDe(@PathVariable("id") Long id);

    record ApoderadoDeAlumno(Long id, String tipoDocumento, String numeroDocumento, String nombres, String apellidos) {}

    @GetMapping("/internal/alumnos/{id}/expediente-completo")
    Expediente expediente(@PathVariable("id") Long id);

    @GetMapping("/internal/alumnos/{id}/responsable-pago")
    ResponsablePago responsablePago(@PathVariable("id") Long id);

    @GetMapping("/internal/alumnos/usuario/{usuarioId}")
    AlumnoUsuario alumnoDeUsuario(@PathVariable("usuarioId") Long usuarioId);

    @GetMapping("/internal/apoderados/usuario/{usuarioId}/alumnos")
    List<Hijo> hijosDeUsuario(@PathVariable("usuarioId") Long usuarioId);

    /** Alta del alumno con su apoderado (matrícula en línea). 409 si ya existe un alumno con ese documento. */
    @PostMapping("/internal/alumnos")
    AlumnoRegistrado registrar(@RequestBody RegistroAlumno body);

    @PostMapping("/internal/alumnos/{id}/usuario")
    void vincularAlumno(@PathVariable("id") Long id, @RequestBody VinculoUsuario body);

    @PostMapping("/internal/apoderados/{id}/usuario")
    void vincularApoderado(@PathVariable("id") Long id, @RequestBody VinculoUsuario body);

    record AlumnoBasico(Long id, String codigo, String nombreCompleto, String estado) {}

    record Expediente(boolean completo, List<String> faltantes) {}

    record ResponsablePago(Long apoderadoId, Long usuarioId, String nombre) {}

    record AlumnoUsuario(Long alumnoId) {}

    record Hijo(Long alumnoId, String codigo, String nombreCompleto, String estado, String parentesco) {}

    record VinculoUsuario(Long usuarioId) {}

    record RegistroAlumno(String tipoDocumento, String numeroDocumento, String nombres, String apellidoPaterno, String apellidoMaterno,
                          String fechaNacimiento, String sexo, String nacionalidad, String telefono, String email,
                          String direccion, String distrito, String colegioProcedencia,
                          List<VinculoApoderado> apoderados) {}

    record VinculoApoderado(ApoderadoDatos apoderado, String parentesco, Boolean esPrincipal, Boolean esResponsablePago,
                            Boolean viveConAlumno, Boolean puedeRecoger) {}

    record ApoderadoDatos(String tipoDocumento, String numeroDocumento, String nombres, String apellidos, String telefono, String email) {}

    record AlumnoRegistrado(Long id, String codigo, String nombreCompleto, List<VinculoRegistrado> apoderados) {}

    record VinculoRegistrado(Long id, ApoderadoRegistrado apoderado) {}

    record ApoderadoRegistrado(Long id, Long usuarioId, String numeroDocumento, String nombres, String apellidos, String email) {}
}
```

---

## 53. `AlumnosGateway.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/AlumnosGateway.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `matricula-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.matricula.client;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.matricula.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.matricula.exception.ServicioNoDisponibleException;

import java.util.Collections;
import java.util.List;

/** alumnos-ms con circuit breaker: sin validar al alumno no se puede matricular (503). */
@Slf4j
@Service
@RequiredArgsConstructor
public class AlumnosGateway {

    private final AlumnosClient client;

    @CircuitBreaker(name = "alumnosClient", fallbackMethod = "alumnoFallback")
    public AlumnosClient.AlumnoBasico alumno(Long id) {
        try {
            return client.alumno(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Alumno no encontrado: " + id);
        }
    }

    @CircuitBreaker(name = "alumnosClient", fallbackMethod = "expedienteFallback")
    public AlumnosClient.Expediente expediente(Long id) {
        try {
            return client.expediente(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Alumno no encontrado: " + id);
        }
    }

    /** El responsable de pago es informativo: si falta o alumnos-ms cae, se matricula igual (pago-ms lo completa luego). */
    public AlumnosClient.ResponsablePago responsablePagoOpcional(Long id) {
        try {
            return client.responsablePago(id);
        } catch (Exception e) {
            log.warn("Sin responsable de pago para alumno {}: {}", id, e.getMessage());
            return null;
        }
    }

    @CircuitBreaker(name = "alumnosClient", fallbackMethod = "alumnoUsuarioFallback")
    public Long alumnoIdDeUsuario(Long usuarioId) {
        try {
            AlumnosClient.AlumnoUsuario a = client.alumnoDeUsuario(usuarioId);
            return a == null ? null : a.alumnoId();
        } catch (FeignException.NotFound e) {
            return null;
        }
    }

    @CircuitBreaker(name = "alumnosClient", fallbackMethod = "hijosFallback")
    public List<AlumnosClient.Hijo> hijosDeUsuario(Long usuarioId) {
        try {
            return client.hijosDeUsuario(usuarioId);
        } catch (FeignException.NotFound e) {
            return Collections.emptyList();
        }
    }

    AlumnosClient.AlumnoBasico alumnoFallback(Long id, Throwable t) {
        throw noDisponible("alumnos-ms", t);
    }

    AlumnosClient.Expediente expedienteFallback(Long id, Throwable t) {
        throw noDisponible("alumnos-ms", t);
    }

    Long alumnoUsuarioFallback(Long usuarioId, Throwable t) {
        throw noDisponible("alumnos-ms", t);
    }

    List<AlumnosClient.Hijo> hijosFallback(Long usuarioId, Throwable t) {
        throw noDisponible("alumnos-ms", t);
    }

    private RuntimeException noDisponible(String servicio, Throwable t) {
        if (t instanceof ResourceNotFoundException r) return r;
        log.warn("{} no disponible: {}", servicio, t.toString());
        return new ServicioNoDisponibleException("No se puede validar con " + servicio + " en este momento; intente nuevamente.");
    }
}
```

---

## 54. `AuthClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/AuthClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.matricula.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/** Alta de cuentas de acceso (auth-ms, solo con el token de servicio). */
@FeignClient(name = "auth-ms")
public interface AuthClient {

    @PostMapping("/internal/cuentas")
    Cuenta crear(@RequestBody CuentaPersona body);

    record CuentaPersona(String nombres, String apellidos, String documento, String rol, String email) {}

    record Cuenta(Long id, String username) {}
}
```

---

## 55. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.upeu.eduspace.matricula.filter;

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

## 56. `IdentidadService.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/security/IdentidadService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Identidad`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.matricula.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.matricula.client.AlumnosClient;
import pe.edu.upeu.eduspace.matricula.client.AlumnosGateway;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** Traduce el usuarioId del JWT a los alumnos que el usuario puede ver (él mismo o sus hijos). */
@Service
@RequiredArgsConstructor
public class IdentidadService {

    private static final Set<String> STAFF = Set.of("ADMIN", "SECRETARIA", "DOCENTE");

    private final AlumnosGateway alumnos;

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
        return roles(jwt).stream().anyMatch(STAFF::contains);
    }

    public Long usuarioId(Jwt jwt) {
        Object v = jwt == null ? null : jwt.getClaim("usuarioId");
        if (v instanceof Number n) return n.longValue();
        if (v instanceof String s && s.matches("\\d+")) return Long.parseLong(s);
        throw new AccessDeniedException("El token no contiene el claim usuarioId.");
    }

    public Set<Long> alumnosDelUsuario(Jwt jwt) {
        Set<Long> ids = new HashSet<>();
        Set<String> roles = roles(jwt);
        Long uid = usuarioId(jwt);
        if (roles.contains("ALUMNO")) {
            Long a = alumnos.alumnoIdDeUsuario(uid);
            if (a != null) ids.add(a);
        }
        if (roles.contains("APODERADO")) {
            for (AlumnosClient.Hijo h : alumnos.hijosDeUsuario(uid)) ids.add(h.alumnoId());
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

## 57. `NotificacionesClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/NotificacionesClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.matricula.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/** Envío de correos (notificaciones-ms, solo con el token de servicio). */
@FeignClient(name = "notificaciones-ms")
public interface NotificacionesClient {

    @PostMapping("/internal/correos")
    Respuesta enviar(@RequestBody Correo body);

    record Correo(String para, String asunto, String html, String texto, List<Adjunto> adjuntos) {}

    record Adjunto(String nombre, String contentType, String base64) {}

    record Respuesta(boolean enviado) {}
}
```

---

## 58. `PagoClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/PagoClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
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
```

---

## 59. `PdfConstancia.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/util/PdfConstancia.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `matricula-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.matricula.util;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Constancia de matrícula en PDF (A4) sin dependencias externas: encabezado de color, datos del alumno y del apoderado,
 * pago de la matrícula, calendario de pensiones, horario semanal y datos de acceso al sistema.
 */
public final class PdfConstancia {

    public record Fila(String a, String b, String c) {}

    public record FilaHorario(String hora, String[] dias) {}

    public record Datos(String colegio, String anio, String codigo, String emitidaEn, String alumno, String alumnoDoc, String grado,
                        String seccion, String turno, String apoderado, String apoderadoDoc, String contacto, String montoMatricula,
                        String comprobante, String medioPago, String pagadoEn, List<Fila> pensiones, String totalPensiones,
                        List<FilaHorario> horario, String usuarioAlumno, String usuarioApoderado) {}

    private static final double[] AZUL = {0.12, 0.23, 0.53};
    private static final double[] GRIS = {0.35, 0.38, 0.45};
    private static final double[] SUAVE = {0.93, 0.95, 0.99};
    private static final double[] NEGRO = {0.08, 0.1, 0.16};
    private static final double[] BLANCO = {1, 1, 1};
    private static final String[] DIAS = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes"};

    private final List<StringBuilder> paginas = new ArrayList<>();
    private StringBuilder pag;
    private double y;

    private PdfConstancia() {
        nuevaPagina();
    }

    public static byte[] generar(Datos d) {
        PdfConstancia p = new PdfConstancia();
        p.encabezado(d);
        p.seccion("Datos de la matrícula");
        p.par("Código", d.codigo(), "Año escolar", d.anio());
        p.par("Estado", "MATRICULADO", "Emitida el", d.emitidaEn());
        p.seccion("Alumno");
        p.par("Nombre", d.alumno(), "Documento", d.alumnoDoc());
        p.par("Grado", d.grado(), "Sección y turno", d.seccion() + " · " + d.turno());
        p.seccion("Apoderado");
        p.par("Nombre", d.apoderado(), "Documento", d.apoderadoDoc());
        p.par("Correo", d.contacto() == null ? "No indicó correo" : d.contacto(), "", "");
        p.seccion("Pago de la matrícula");
        p.par("Monto pagado", d.montoMatricula(), "Comprobante", d.comprobante() == null ? "—" : d.comprobante());
        p.par("Medio", d.medioPago(), "Fecha de pago", d.pagadoEn());
        p.seccion("Pensiones del año");
        if (d.pensiones().isEmpty()) {
            p.nota("El calendario de pensiones se mostrará en tu cuenta cuando esté generado.");
        } else {
            p.tabla3(d.pensiones(), "Cuota", "Vence", "Monto");
            p.par("Total pensiones", d.totalPensiones(), "", "");
        }
        p.seccion("Horario semanal");
        if (d.horario().isEmpty()) {
            p.nota("El horario de tu sección todavía no está publicado. Te avisaremos por el portal y por correo.");
        } else {
            p.horario(d.horario());
        }
        p.seccion("Cómo entrar al sistema");
        p.par("Usuario del alumno", d.usuarioAlumno() == null ? "(lo creará secretaría)" : d.usuarioAlumno(), "Usuario del apoderado",
            d.usuarioApoderado() == null ? "(ya tenías cuenta o la creará secretaría)" : d.usuarioApoderado());
        p.nota("La clave inicial de cada cuenta es el número de documento de su titular. Al entrar por primera vez el sistema pedirá cambiarla.");
        p.seccion("Pendiente en secretaría");
        p.nota("Presenta en secretaría antes del inicio de clases: copia del DNI del alumno, partida de nacimiento y ficha SIAGIE.");
        return p.cerrar();
    }

    // ------------------------------------------------------------------ bloques

    private void encabezado(Datos d) {
        rect(0, 842 - 96, 595, 96, AZUL);
        texto(40, 842 - 42, 20, true, BLANCO, d.colegio());
        texto(40, 842 - 68, 13, false, BLANCO, "CONSTANCIA DE MATRÍCULA " + d.anio());
        y = 842 - 126;
    }

    private void seccion(String titulo) {
        asegurar(70);
        y -= 6;
        rect(40, y - 4, 515, 20, SUAVE);
        texto(46, y + 1, 11, true, AZUL, titulo.toUpperCase(Locale.ROOT));
        y -= 24;
    }

    private void par(String e1, String v1, String e2, String v2) {
        asegurar(24);
        texto(46, y, 8.5, false, GRIS, e1);
        texto(46, y - 12, 10.5, true, NEGRO, recortar(v1, 38));
        if (e2 != null && !e2.isBlank()) {
            texto(310, y, 8.5, false, GRIS, e2);
            texto(310, y - 12, 10.5, true, NEGRO, recortar(v2, 38));
        }
        y -= 30;
    }

    private void nota(String texto) {
        for (String l : partir(texto, 95)) {
            asegurar(14);
            texto(46, y, 9.5, false, GRIS, l);
            y -= 13;
        }
        y -= 6;
    }

    private void tabla3(List<Fila> filas, String h1, String h2, String h3) {
        asegurar(20);
        texto(46, y, 9, true, AZUL, h1);
        texto(300, y, 9, true, AZUL, h2);
        texto(470, y, 9, true, AZUL, h3);
        y -= 4;
        linea(40, y, 555, y);
        y -= 13;
        for (Fila f : filas) {
            asegurar(16);
            texto(46, y, 9.5, false, NEGRO, recortar(f.a(), 50));
            texto(300, y, 9.5, false, NEGRO, f.b());
            texto(470, y, 9.5, false, NEGRO, f.c());
            y -= 14;
        }
        y -= 4;
    }

    private void horario(List<FilaHorario> filas) {
        asegurar(24 + 13.0 * filas.size());      // la tabla no se parte entre dos páginas
        texto(46, y, 8.5, true, AZUL, "Hora");
        for (int i = 0; i < 5; i++) texto(104 + i * 90, y, 8.5, true, AZUL, DIAS[i]);
        y -= 4;
        linea(40, y, 555, y);
        y -= 12;
        for (FilaHorario f : filas) {
            asegurar(16);
            texto(46, y, 8.5, true, NEGRO, f.hora());
            for (int i = 0; i < 5; i++) texto(104 + i * 90, y, 8, false, NEGRO, recortar(f.dias()[i] == null ? "" : f.dias()[i], 17));
            y -= 13;
        }
        y -= 6;
    }

    // ------------------------------------------------------------------ PDF de bajo nivel

    private void asegurar(double alto) {
        if (y - alto < 60) {
            nuevaPagina();
            y = 842 - 50;
        }
    }

    private void nuevaPagina() {
        pag = new StringBuilder();
        paginas.add(pag);
    }

    private void texto(double x, double yy, double tam, boolean negrita, double[] rgb, String t) {
        pag.append("BT /").append(negrita ? "F2" : "F1").append(' ').append(f(tam)).append(" Tf ")
            .append(f(rgb[0])).append(' ').append(f(rgb[1])).append(' ').append(f(rgb[2])).append(" rg ")
            .append(f(x)).append(' ').append(f(yy)).append(" Td (").append(escapar(t)).append(") Tj ET\n");
    }

    private void rect(double x, double yy, double w, double h, double[] rgb) {
        pag.append(f(rgb[0])).append(' ').append(f(rgb[1])).append(' ').append(f(rgb[2])).append(" rg ")
            .append(f(x)).append(' ').append(f(yy)).append(' ').append(f(w)).append(' ').append(f(h)).append(" re f\n");
    }

    private void linea(double x1, double y1, double x2, double y2) {
        pag.append("0.8 0.82 0.88 RG 0.6 w ").append(f(x1)).append(' ').append(f(y1)).append(" m ").append(f(x2)).append(' ')
            .append(f(y2)).append(" l S\n");
    }

    private byte[] cerrar() {
        int n = paginas.size();
        List<byte[]> objs = new ArrayList<>();
        objs.add(b("<< /Type /Catalog /Pages 2 0 R >>"));
        StringBuilder kids = new StringBuilder();
        for (int i = 0; i < n; i++) kids.append(5 + 2 * i).append(" 0 R ");
        objs.add(b("<< /Type /Pages /Kids [" + kids + "] /Count " + n + " >>"));
        objs.add(b("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"));
        objs.add(b("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"));
        for (int i = 0; i < n; i++) {
            objs.add(b("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents "
                + (6 + 2 * i) + " 0 R >>"));
            byte[] flujo = paginas.get(i).toString().getBytes(StandardCharsets.ISO_8859_1);
            ByteArrayOutputStream o = new ByteArrayOutputStream();
            o.writeBytes(b("<< /Length " + flujo.length + " >>\nstream\n"));
            o.writeBytes(flujo);
            o.writeBytes(b("\nendstream"));
            objs.add(o.toByteArray());
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        out.writeBytes(b("%PDF-1.4\n"));
        int[] pos = new int[objs.size()];
        for (int i = 0; i < objs.size(); i++) {
            pos[i] = out.size();
            out.writeBytes(b((i + 1) + " 0 obj\n"));
            out.writeBytes(objs.get(i));
            out.writeBytes(b("\nendobj\n"));
        }
        int xref = out.size();
        StringBuilder x = new StringBuilder("xref\n0 " + (objs.size() + 1) + "\n0000000000 65535 f \n");
        for (int p : pos) x.append(String.format("%010d 00000 n \n", p));
        x.append("trailer\n<< /Size ").append(objs.size() + 1).append(" /Root 1 0 R >>\nstartxref\n").append(xref).append("\n%%EOF\n");
        out.writeBytes(b(x.toString()));
        return out.toByteArray();
    }

    // ------------------------------------------------------------------ utilidades

    private static String f(double v) {
        return String.format(Locale.ROOT, "%.2f", v);
    }

    private static byte[] b(String s) {
        return s.getBytes(StandardCharsets.ISO_8859_1);
    }

    static String escapar(String t) {
        StringBuilder sb = new StringBuilder();
        for (char c : (t == null ? "" : t).toCharArray()) {
            if (c == '(' || c == ')' || c == '\\') sb.append('\\').append(c);
            else if (c == '\u2013') sb.append((char) 150);        // – (WinAnsi 0x96)
            else if (c == '\u2014') sb.append((char) 151);        // — (WinAnsi 0x97)
            else if (c > 255) sb.append('?');
            else if (c < 32) sb.append(' ');
            else sb.append(c);
        }
        return sb.toString();
    }

    static String recortar(String t, int max) {
        String s = t == null ? "" : t;
        return s.length() <= max ? s : s.substring(0, max - 1) + ".";
    }

    static List<String> partir(String texto, int max) {
        List<String> r = new ArrayList<>();
        StringBuilder l = new StringBuilder();
        for (String w : texto.split("\\s+")) {
            if (l.length() + w.length() + 1 > max) {
                r.add(l.toString());
                l.setLength(0);
            }
            if (l.length() > 0) l.append(' ');
            l.append(w);
        }
        if (l.length() > 0) r.add(l.toString());
        return r;
    }
}
```

---

## 60. `PlanificacionClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/PlanificacionClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.matricula.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

/** Contrato interno de planificacion-ms (adenda A2). */
@FeignClient(name = "planificacion-ms")
public interface PlanificacionClient {

    @GetMapping("/internal/secciones/{id}")
    Seccion seccion(@PathVariable("id") Long id);

    @GetMapping("/internal/secciones")
    List<Seccion> secciones(@RequestParam(value = "anioId", required = false) Long anioId,
                            @RequestParam(value = "gradoId", required = false) Long gradoId);

    @GetMapping("/internal/anios/activo")
    Anio anioActivo();

    @GetMapping("/internal/anios/{id}")
    Anio anio(@PathVariable("id") Long id);

    @GetMapping("/internal/grados/{id}")
    Grado grado(@PathVariable("id") Long id);

    @GetMapping("/internal/horarios/seccion/{id}")
    HorarioSeccion horario(@PathVariable("id") Long id);

    record Seccion(Long id, String nombre, Long gradoId, Long nivelId, Long anioId, Short capacidad, String turno,
                   Long tutorDocenteId) {}

    record Anio(Long id, String nombre, LocalDate fechaInicio, LocalDate fechaFin, String estado) {}

    record Grado(Long id, Long nivelId, String nivelNombre, Short numero, String nombre, Boolean activo) {}

    record HorarioSeccion(Long seccionId, String seccionNombre, String turno, List<Clase> clases) {}

    record Clase(String cursoNombre, String docenteNombre, Short diaSemana, Short bloqueOrden, String horaInicio, String horaFin,
                 String aulaNombre) {}
}
```

---

## 61. `PlanificacionGateway.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/client/PlanificacionGateway.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `matricula-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.matricula.client;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.matricula.config.CacheConfig;
import pe.edu.upeu.eduspace.matricula.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.matricula.exception.ServicioNoDisponibleException;

import java.util.List;

/** planificacion-ms con circuit breaker y caché corta (sección, año activo, grado). */
@Slf4j
@Service
@RequiredArgsConstructor
public class PlanificacionGateway {

    private final PlanificacionClient client;

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "seccionFallback")
    @Cacheable(value = CacheConfig.CACHE_SECCION, key = "#id")
    public PlanificacionClient.Seccion seccion(Long id) {
        try {
            return client.seccion(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Sección no encontrada: " + id);
        }
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "seccionesFallback")
    public List<PlanificacionClient.Seccion> secciones(Long anioId, Long gradoId) {
        return client.secciones(anioId, gradoId);
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "anioActivoFallback")
    @Cacheable(value = CacheConfig.CACHE_ANIO_ACTIVO, key = "'activo'")
    public PlanificacionClient.Anio anioActivo() {
        try {
            return client.anioActivo();
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("No hay un año académico activo.");
        }
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "anioFallback")
    @Cacheable(value = CacheConfig.CACHE_ANIO_ACTIVO, key = "#id")
    public PlanificacionClient.Anio anio(Long id) {
        try {
            return client.anio(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Año académico no encontrado: " + id);
        }
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "gradoFallback")
    @Cacheable(value = CacheConfig.CACHE_GRADO, key = "#id")
    public PlanificacionClient.Grado grado(Long id) {
        try {
            return client.grado(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Grado no encontrado: " + id);
        }
    }

    PlanificacionClient.Seccion seccionFallback(Long id, Throwable t) { throw noDisponible(t); }

    List<PlanificacionClient.Seccion> seccionesFallback(Long anioId, Long gradoId, Throwable t) { throw noDisponible(t); }

    PlanificacionClient.Anio anioActivoFallback(Throwable t) { throw noDisponible(t); }

    PlanificacionClient.Anio anioFallback(Long id, Throwable t) { throw noDisponible(t); }

    PlanificacionClient.Grado gradoFallback(Long id, Throwable t) { throw noDisponible(t); }

    private RuntimeException noDisponible(Throwable t) {
        if (t instanceof ResourceNotFoundException r) return r;
        log.warn("planificacion-ms no disponible: {}", t.toString());
        return new ServicioNoDisponibleException("No se puede validar con planificacion-ms en este momento; intente nuevamente.");
    }
}
```

---

## 62. `ServiceTokenFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/filter/ServiceTokenFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.upeu.eduspace.matricula.filter;

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

## 63. `TarjetaSimulada.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/util/TarjetaSimulada.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `matricula-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.matricula.util;

import java.time.YearMonth;

/**
 * Pasarela de pago FALSA para la matrícula en línea: no cobra nada. Valida el formato (número con algoritmo de Luhn, vencimiento
 * vigente, CVV) y aprueba, salvo la tarjeta de prueba que termina en 0002, que se rechaza para poder ver el caso de error.
 * Los datos de la tarjeta no se guardan ni se escriben en el registro: solo se conserva la marca y los últimos 4 dígitos.
 */
public final class TarjetaSimulada {

    public record Resultado(boolean aprobada, String mensaje, String referencia) {}

    private TarjetaSimulada() {}

    public static Resultado procesar(String numero, String vencimiento, String cvv, YearMonth hoy) {
        String n = numero == null ? "" : numero.replaceAll("[\\s-]", "");
        if (!n.matches("\\d{13,19}") || !luhn(n)) return new Resultado(false, "El número de tarjeta no es válido.", null);
        if (cvv == null || !cvv.matches("\\d{3,4}")) return new Resultado(false, "El código de seguridad (CVV) no es válido.", null);
        YearMonth v = parsear(vencimiento);
        if (v == null) return new Resultado(false, "El vencimiento debe tener el formato MM/AA.", null);
        if (v.isBefore(hoy)) return new Resultado(false, "La tarjeta está vencida.", null);
        String ref = marca(n) + " ****" + n.substring(n.length() - 4);
        if (n.endsWith("0002")) return new Resultado(false, "La tarjeta fue rechazada por el banco (tarjeta de prueba de rechazo).", ref);
        return new Resultado(true, "Pago aprobado (simulado).", ref);
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

    static YearMonth parsear(String v) {
        if (v == null || !v.matches("\\d{2}\\s*/\\s*\\d{2,4}")) return null;
        String[] p = v.split("\\s*/\\s*");
        int mes = Integer.parseInt(p[0]);
        int anio = Integer.parseInt(p[1]);
        if (mes < 1 || mes > 12) return null;
        return YearMonth.of(anio < 100 ? 2000 + anio : anio, mes);
    }
}
```

---

## 64. `MatriculaApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/MatriculaApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.upeu.eduspace.matricula;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;
import pe.edu.upeu.eduspace.matricula.config.MatriculaProperties;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties(MatriculaProperties.class)
public class MatriculaApplication {

    public static void main(String[] args) {
        SpringApplication.run(MatriculaApplication.class, args);
    }
}
```

---

