# 📘 CÓDIGO COMPLETO — `notificaciones-ms`

> **Microservicio:** `notificaciones-ms`  
> **Puerto:** `8099`  
> **Base de datos:** `eduspace_notificaciones`  
> **Propósito:** Sistema centralizado de notificaciones multi-canal. Escucha eventos de todos los microservicios (pagos confirmados, exámenes publicados, matrículas aprobadas) y envía notificaciones por EMAIL (Mailpit/SMTP), notificaciones internas en la aplicación y alertas para docentes, alumnos y apoderados.  
> **Total de clases incluidas:** 101 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `Canal.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/Canal.java`
- 2. `DispositivoPush.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/DispositivoPush.java`
- 3. `EstadoNotificacion.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/EstadoNotificacion.java`
- 4. `EventoProcesado.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/EventoProcesado.java`
- 5. `IntentoEnvio.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/IntentoEnvio.java`
- 6. `Notificacion.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/Notificacion.java`
- 7. `PlantillaNotificacion.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/PlantillaNotificacion.java`
- 8. `Plataforma.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/Plataforma.java`
- 9. `PreferenciaNotificacion.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/PreferenciaNotificacion.java`

### Repositorios Spring Data JPA

- 10. `DispositivoPushRepository.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/DispositivoPushRepository.java`
- 11. `EventoProcesadoRepository.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/EventoProcesadoRepository.java`
- 12. `IntentoEnvioRepository.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/IntentoEnvioRepository.java`
- 13. `NotificacionInsertador.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/NotificacionInsertador.java`
- 14. `NotificacionRepository.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/NotificacionRepository.java`
- 15. `PlantillaRepository.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/PlantillaRepository.java`
- 16. `PreferenciaRepository.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/PreferenciaRepository.java`

### DTOs (Data Transfer Objects)

- 17. `ConteoNoLeidasResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/ConteoNoLeidasResponse.java`
- 18. `DispositivoRequest.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/DispositivoRequest.java`
- 19. `DispositivoResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/DispositivoResponse.java`
- 20. `EnvioManualRequest.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/EnvioManualRequest.java`
- 21. `EnvioManualResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/EnvioManualResponse.java`
- 22. `NotificacionAdminResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/NotificacionAdminResponse.java`
- 23. `NotificacionEditarRequest.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/NotificacionEditarRequest.java`
- 24. `NotificacionResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/NotificacionResponse.java`
- 25. `PageResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PageResponse.java`
- 26. `PlantillaCrearRequest.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PlantillaCrearRequest.java`
- 27. `PlantillaRequest.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PlantillaRequest.java`
- 28. `PlantillaResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PlantillaResponse.java`
- 29. `PreferenciaRequest.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PreferenciaRequest.java`
- 30. `PreferenciaResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PreferenciaResponse.java`

### Servicios y Lógica de Negocio

- 31. `ContactosAlumnoService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/ContactosAlumnoService.java`
- 32. `CorreoService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/CorreoService.java`
- 33. `Destino.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/Destino.java`
- 34. `DispositivoService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/DispositivoService.java`
- 35. `DispositivoServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/DispositivoServiceImpl.java`
- 36. `EmailSender.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EmailSender.java`
- 37. `EnvioManualService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EnvioManualService.java`
- 38. `EnvioManualServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/EnvioManualServiceImpl.java`
- 39. `EnvioNotificacionService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EnvioNotificacionService.java`
- 40. `EnvioNotificacionServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/EnvioNotificacionServiceImpl.java`
- 41. `EventoNotificable.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EventoNotificable.java`
- 42. `LogPushSender.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/LogPushSender.java`
- 43. `NotificacionAdminService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionAdminService.java`
- 44. `NotificacionAdminServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/NotificacionAdminServiceImpl.java`
- 45. `NotificacionCreadaEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionCreadaEvent.java`
- 46. `NotificacionOrquestador.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionOrquestador.java`
- 47. `NotificacionOrquestadorImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/NotificacionOrquestadorImpl.java`
- 48. `NotificacionService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionService.java`
- 49. `NotificacionServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/NotificacionServiceImpl.java`
- 50. `PendienteCodec.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/PendienteCodec.java`
- 51. `PlantillaService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/PlantillaService.java`
- 52. `PlantillaServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/PlantillaServiceImpl.java`
- 53. `PreferenciaService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/PreferenciaService.java`
- 54. `PreferenciaServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/PreferenciaServiceImpl.java`
- 55. `PushSender.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/PushSender.java`
- 56. `ReintentoService.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/ReintentoService.java`
- 57. `ReintentoServiceImpl.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/ReintentoServiceImpl.java`
- 58. `ResultadoResolucion.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/ResultadoResolucion.java`
- 59. `SmtpEmailSender.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/SmtpEmailSender.java`

### Controladores REST API

- 60. `AdminNotificacionController.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/controller/AdminNotificacionController.java`
- 61. `InternalCorreoController.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/controller/InternalCorreoController.java`
- 62. `NotificacionController.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/controller/NotificacionController.java`

### Mensajería Kafka

- 63. `EnvioInmediatoListener.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/messaging/EnvioInmediatoListener.java`
- 64. `NotificacionEventConsumer.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/messaging/NotificacionEventConsumer.java`

### Eventos de Dominio

- 65. `AsistenciaFaltaRegistradaEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/AsistenciaFaltaRegistradaEvent.java`
- 66. `BoletinGeneradoEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/BoletinGeneradoEvent.java`
- 67. `ExamenCalificadoEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/ExamenCalificadoEvent.java`
- 68. `ExamenPublicadoEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/ExamenPublicadoEvent.java`
- 69. `HorarioPublicadoEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/HorarioPublicadoEvent.java`
- 70. `JustificacionResueltaEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/JustificacionResueltaEvent.java`
- 71. `MaterialPublicadoEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/MaterialPublicadoEvent.java`
- 72. `MatriculaEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/MatriculaEvent.java`
- 73. `PagoConfirmadoEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/PagoConfirmadoEvent.java`
- 74. `PagoVencidoEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/PagoVencidoEvent.java`
- 75. `TareaCalificadaEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/TareaCalificadaEvent.java`
- 76. `TareaPublicadaEvent.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/TareaPublicadaEvent.java`
- 77. `Topicos.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/Topicos.java`

### Tareas Programadas (Schedulers)

- 78. `ReintentoScheduler.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/scheduler/ReintentoScheduler.java`

### Configuración Spring Boot

- 79. `AppProperties.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/AppProperties.java`
- 80. `FeignConfig.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/FeignConfig.java`
- 81. `KafkaConsumerConfig.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/KafkaConsumerConfig.java`
- 82. `MailConfig.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/MailConfig.java`
- 83. `OpenApiConfig.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/OpenApiConfig.java`
- 84. `SchedulingConfig.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/SchedulingConfig.java`
- 85. `SecurityConfig.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/SecurityConfig.java`
- 86. `ShedLockConfig.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/ShedLockConfig.java`

### Manejo de Excepciones

- 87. `BusinessRuleException.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/BusinessRuleException.java`
- 88. `ErrorResponse.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/ErrorResponse.java`
- 89. `GlobalExceptionHandler.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/GlobalExceptionHandler.java`
- 90. `ResourceNotFoundException.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/ResourceNotFoundException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 91. `AlumnosClient.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/AlumnosClient.java`
- 92. `AlumnosGateway.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/AlumnosGateway.java`
- 93. `ContactosDto.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/ContactosDto.java`
- 94. `ContactosResultado.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/ContactosResultado.java`
- 95. `CorrelationIdFilter.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/filter/CorrelationIdFilter.java`
- 96. `Datos.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/util/Datos.java`
- 97. `Respuestas.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/util/Respuestas.java`
- 98. `ServiceTokenFilter.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/filter/ServiceTokenFilter.java`
- 99. `UsuarioActual.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/util/UsuarioActual.java`

### Clase Principal de Arranque

- 100. `NotificacionesMsApplication.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/NotificacionesMsApplication.java`

### Mappers

- 101. `NotificacionMapper.java` — `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/mapper/NotificacionMapper.java`

---

## 1. `Canal.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/Canal.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

public enum Canal { IN_APP, EMAIL, PUSH }
```

---

## 2. `DispositivoPush.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/DispositivoPush.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dispositivos_push")
@Getter
@Setter
public class DispositivoPush {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private String token;
    @Enumerated(EnumType.STRING)
    private Plataforma plataforma;
    private Boolean activo = true;
    private LocalDateTime registradoEn;
    private LocalDateTime ultimoUso;

    @PrePersist
    void onCreate() {
        if (registradoEn == null) {
            registradoEn = LocalDateTime.now();
        }
    }
}
```

---

## 3. `EstadoNotificacion.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/EstadoNotificacion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

public enum EstadoNotificacion { PENDIENTE, ENVIADA, FALLIDA, DESCARTADA }
```

---

## 4. `EventoProcesado.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/EventoProcesado.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

/** Idempotencia por {@code eventId}: un evento ya procesado no vuelve a generar notificaciones. */
@Entity
@Table(name = "eventos_procesados")
@Getter
@Setter
public class EventoProcesado {
    @Id
    private UUID eventId;
    private String eventType;
    private LocalDateTime procesadoEn;
}
```

---

## 5. `IntentoEnvio.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/IntentoEnvio.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "intentos_envio")
@Getter
@Setter
public class IntentoEnvio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "notificacion_id")
    private Notificacion notificacion;
    private Short numeroIntento;
    private Boolean exitoso;
    private String error;
    private LocalDateTime intentadoEn;

    @PrePersist
    void onCreate() {
        if (intentadoEn == null) {
            intentadoEn = LocalDateTime.now();
        }
    }
}
```

---

## 6. `Notificacion.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/Notificacion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "notificaciones")
@Getter
@Setter
public class Notificacion {

    /** Destinatario "aún sin resolver": la notificación espera a que alumnos-ms vuelva para conocer a quién va. */
    public static final long SIN_DESTINATARIO = 0L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** Destinatario (usuario_id en auth-ms); número simple, sin relación. */
    private Long usuarioId;
    private String tipo;
    @Enumerated(EnumType.STRING)
    private Canal canal = Canal.IN_APP;
    private String titulo;
    private String mensaje;
    /** Datos extra del evento en JSON (deep-link del cliente, correo del destinatario, etc.). */
    @JdbcTypeCode(SqlTypes.JSON)
    private String datosJson;
    private String eventoOrigen;
    private String eventoClave;
    @Enumerated(EnumType.STRING)
    private EstadoNotificacion estado = EstadoNotificacion.PENDIENTE;
    private Boolean leida = false;
    private LocalDateTime leidaEn;
    private LocalDateTime creadaEn;
    private LocalDateTime enviadaEn;

    @PrePersist
    void onCreate() {
        if (creadaEn == null) {
            creadaEn = LocalDateTime.now();
        }
    }
}
```

---

## 7. `PlantillaNotificacion.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/PlantillaNotificacion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "plantillas_notificacion")
@Getter
@Setter
public class PlantillaNotificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    @Enumerated(EnumType.STRING)
    private Canal canal;
    private String asunto;
    /** Texto con marcadores {{campo}}. */
    private String cuerpo;
    private Boolean activa = true;
    private LocalDateTime actualizadoEn;

    @PrePersist
    @PreUpdate
    void touch() {
        actualizadoEn = LocalDateTime.now();
    }
}
```

---

## 8. `Plataforma.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/Plataforma.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

public enum Plataforma { ANDROID, IOS, WEB }
```

---

## 9. `PreferenciaNotificacion.java` — Entidades JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/entity/PreferenciaNotificacion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `notificaciones-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.notificaciones.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "preferencias_notificacion")
@Getter
@Setter
public class PreferenciaNotificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private String tipo;
    @Enumerated(EnumType.STRING)
    private Canal canal;
    private Boolean habilitada = true;
}
```

---

## 10. `DispositivoPushRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/DispositivoPushRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `DispositivoPush`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.notificaciones.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.notificaciones.entity.DispositivoPush;

public interface DispositivoPushRepository extends JpaRepository<DispositivoPush, Long> {
    Optional<DispositivoPush> findByToken(String token);

    List<DispositivoPush> findByUsuarioIdAndActivoTrue(Long usuarioId);
}
```

---

## 11. `EventoProcesadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/EventoProcesadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EventoProcesado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.notificaciones.repository;

import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.notificaciones.entity.EventoProcesado;

public interface EventoProcesadoRepository extends JpaRepository<EventoProcesado, UUID> {

    /** Devuelve 1 si el evento era nuevo y 0 si ya estaba registrado (se decide en la misma transacción que las notificaciones). */
    @Modifying
    @Query(value = "INSERT INTO eventos_procesados (event_id, event_type) VALUES (:id, :tipo) ON CONFLICT DO NOTHING",
            nativeQuery = true)
    int registrarSiNoExiste(@Param("id") UUID id, @Param("tipo") String tipo);

    @Modifying
    @Query("delete from EventoProcesado e where e.procesadoEn < :limite")
    int borrarAnterioresA(@Param("limite") LocalDateTime limite);
}
```

---

## 12. `IntentoEnvioRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/IntentoEnvioRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `IntentoEnvio`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.notificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.notificaciones.entity.IntentoEnvio;

public interface IntentoEnvioRepository extends JpaRepository<IntentoEnvio, Long> {
    long countByNotificacionId(Long notificacionId);
}
```

---

## 13. `NotificacionInsertador.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/NotificacionInsertador.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import pe.edu.eduspace.notificaciones.entity.Notificacion;

/**
 * Inserta una notificación solo si no existe ya la misma (usuario, tipo, canal, evento): Kafka entrega al menos una
 * vez y la restricción única de la base es la red de seguridad. {@code ON CONFLICT DO NOTHING} evita que la violación
 * marque la transacción como revertida.
 */
@Repository
public class NotificacionInsertador {

    private static final String SQL = """
            INSERT INTO notificaciones (usuario_id, tipo, canal, titulo, mensaje, datos_json, evento_origen, evento_clave,
                                        estado, creada_en, enviada_en)
            VALUES (:usuario, :tipo, :canal, :titulo, :mensaje, CAST(:datos AS jsonb), :origen, :clave, :estado, now(), :enviada)
            ON CONFLICT DO NOTHING
            RETURNING id
            """;

    private final NamedParameterJdbcTemplate jdbc;

    public NotificacionInsertador(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /** @return el id creado, o vacío si ya existía una igual. */
    public Optional<Long> insertar(Notificacion n) {
        var params = new MapSqlParameterSource()
                .addValue("usuario", n.getUsuarioId())
                .addValue("tipo", n.getTipo())
                .addValue("canal", n.getCanal().name())
                .addValue("titulo", n.getTitulo())
                .addValue("mensaje", n.getMensaje())
                .addValue("datos", n.getDatosJson())
                .addValue("origen", n.getEventoOrigen())
                .addValue("clave", n.getEventoClave())
                .addValue("estado", n.getEstado().name())
                .addValue("enviada", n.getEnviadaEn() == null ? null : java.sql.Timestamp.valueOf((LocalDateTime) n.getEnviadaEn()));
        return jdbc.query(SQL, params, rs -> rs.next() ? Optional.of(rs.getLong(1)) : Optional.empty());
    }
}
```

---

## 14. `NotificacionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/NotificacionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Notificacion`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.notificaciones.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;
import pe.edu.eduspace.notificaciones.entity.Notificacion;

public interface NotificacionRepository extends JpaRepository<Notificacion, Long>, JpaSpecificationExecutor<Notificacion> {

    Page<Notificacion> findByUsuarioIdAndCanalOrderByCreadaEnDescIdDesc(Long usuarioId, Canal canal, Pageable pageable);

    Page<Notificacion> findByUsuarioIdAndCanalAndLeidaOrderByCreadaEnDescIdDesc(Long usuarioId, Canal canal, Boolean leida,
                                                                                Pageable pageable);

    long countByUsuarioIdAndCanalAndLeidaFalse(Long usuarioId, Canal canal);

    Optional<Notificacion> findByIdAndUsuarioId(Long id, Long usuarioId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("""
            update Notificacion n set n.leida = true, n.leidaEn = current_timestamp
            where n.usuarioId = :usuarioId and n.canal = :canal and n.leida = false
            """)
    int marcarTodasLeidas(@Param("usuarioId") Long usuarioId, @Param("canal") Canal canal);

    /** Pendientes o fallidas con menos de {@code maxIntentos} intentos registrados, las más antiguas primero. */
    @Query("""
            select n from Notificacion n
            where n.estado in :estados
              and (select count(i) from IntentoEnvio i where i.notificacion.id = n.id) < :maxIntentos
            order by n.creadaEn, n.id
            """)
    List<Notificacion> pendientes(@Param("estados") List<EstadoNotificacion> estados,
                                  @Param("maxIntentos") long maxIntentos, Pageable pageable);
}
```

---

## 15. `PlantillaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/PlantillaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Plantilla`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.notificaciones.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.PlantillaNotificacion;

public interface PlantillaRepository extends JpaRepository<PlantillaNotificacion, Long> {
    Optional<PlantillaNotificacion> findByCodigoAndCanal(String codigo, Canal canal);

    List<PlantillaNotificacion> findAllByOrderByCodigoAscCanalAsc();
}
```

---

## 16. `PreferenciaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/repository/PreferenciaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Preferencia`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.notificaciones.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.PreferenciaNotificacion;

public interface PreferenciaRepository extends JpaRepository<PreferenciaNotificacion, Long> {
    Optional<PreferenciaNotificacion> findByUsuarioIdAndTipoAndCanal(Long usuarioId, String tipo, Canal canal);

    List<PreferenciaNotificacion> findByUsuarioIdOrderByTipoAscCanalAsc(Long usuarioId);
}
```

---

## 17. `ConteoNoLeidasResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/ConteoNoLeidasResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ConteoNoLeidas`.

```java
package pe.edu.eduspace.notificaciones.dto;

public record ConteoNoLeidasResponse(long noLeidas) {
}
```

---

## 18. `DispositivoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/DispositivoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Dispositivo`.

```java
package pe.edu.eduspace.notificaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pe.edu.eduspace.notificaciones.entity.Plataforma;

public record DispositivoRequest(@NotBlank @Size(max = 400) String token, @NotNull Plataforma plataforma) {
}
```

---

## 19. `DispositivoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/DispositivoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Dispositivo`.

```java
package pe.edu.eduspace.notificaciones.dto;

import pe.edu.eduspace.notificaciones.entity.Plataforma;

public record DispositivoResponse(Long id, Plataforma plataforma, Boolean activo) {
}
```

---

## 20. `EnvioManualRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/EnvioManualRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `EnvioManual`.

```java
package pe.edu.eduspace.notificaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;
import pe.edu.eduspace.notificaciones.entity.Canal;

/** Aviso manual de un ADMIN a usuarios concretos, por la bandeja (IN_APP) y/o push. */
public record EnvioManualRequest(@NotEmpty List<Long> usuarioIds, @NotBlank @Size(max = 200) String titulo,
                                 @NotBlank String mensaje, @NotEmpty List<Canal> canales) {
}
```

---

## 21. `EnvioManualResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/EnvioManualResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `EnvioManual`.

```java
package pe.edu.eduspace.notificaciones.dto;

public record EnvioManualResponse(int creadas, int omitidas) {
}
```

---

## 22. `NotificacionAdminResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/NotificacionAdminResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `NotificacionAdmin`.

```java
package pe.edu.eduspace.notificaciones.dto;

import java.time.LocalDateTime;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;

/** Una notificación vista por el ADMIN (cualquier destinatario, cualquier canal). */
public record NotificacionAdminResponse(Long id, Long usuarioId, String tipo, Canal canal, EstadoNotificacion estado, String titulo,
                                        String mensaje, Boolean leida, LocalDateTime creadaEn, LocalDateTime enviadaEn) {
}
```

---

## 23. `NotificacionEditarRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/NotificacionEditarRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `NotificacionEditar`.

```java
package pe.edu.eduspace.notificaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NotificacionEditarRequest(@NotBlank @Size(max = 200) String titulo, @NotBlank String mensaje) {
}
```

---

## 24. `NotificacionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/NotificacionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Notificacion`.

```java
package pe.edu.eduspace.notificaciones.dto;

import java.time.LocalDateTime;
import java.util.Map;

public record NotificacionResponse(Long id, String tipo, String titulo, String mensaje, Map<String, Object> datos,
                                   Boolean leida, LocalDateTime leidaEn, LocalDateTime creadaEn) {
}
```

---

## 25. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Page`.

```java
package pe.edu.eduspace.notificaciones.dto;

import java.util.List;
import org.springframework.data.domain.Page;

public record PageResponse<T>(List<T> contenido, int pagina, int tamano, long total, int totalPaginas) {
    public static <T> PageResponse<T> of(Page<T> page) {
        return new PageResponse<>(page.getContent(), page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages());
    }
}
```

---

## 26. `PlantillaCrearRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PlantillaCrearRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `PlantillaCrear`.

```java
package pe.edu.eduspace.notificaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import pe.edu.eduspace.notificaciones.entity.Canal;

/** Alta de una plantilla propia. El código va en MAYÚSCULAS con guion bajo (p. ej. {@code COMUNICADO_FERIADO}). */
public record PlantillaCrearRequest(
        @NotBlank @Size(max = 60) @Pattern(regexp = "[A-Z][A-Z0-9_]{2,59}", message = "usa mayúsculas, números y guion bajo (mínimo 3 caracteres)") String codigo,
        @NotNull Canal canal,
        @Size(max = 200) String asunto,
        @NotBlank String cuerpo,
        Boolean activa) {
}
```

---

## 27. `PlantillaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PlantillaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Plantilla`.

```java
package pe.edu.eduspace.notificaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PlantillaRequest(@Size(max = 200) String asunto, @NotBlank String cuerpo, Boolean activa) {
}
```

---

## 28. `PlantillaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PlantillaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Plantilla`.

```java
package pe.edu.eduspace.notificaciones.dto;

import java.time.LocalDateTime;
import pe.edu.eduspace.notificaciones.entity.Canal;

public record PlantillaResponse(Long id, String codigo, Canal canal, String asunto, String cuerpo, Boolean activa,
                                LocalDateTime actualizadoEn) {
}
```

---

## 29. `PreferenciaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PreferenciaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Preferencia`.

```java
package pe.edu.eduspace.notificaciones.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pe.edu.eduspace.notificaciones.entity.Canal;

public record PreferenciaRequest(@NotBlank @Size(max = 60) String tipo, @NotNull Canal canal, @NotNull Boolean habilitada) {
}
```

---

## 30. `PreferenciaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/dto/PreferenciaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Preferencia`.

```java
package pe.edu.eduspace.notificaciones.dto;

import pe.edu.eduspace.notificaciones.entity.Canal;

public record PreferenciaResponse(String tipo, Canal canal, Boolean habilitada) {
}
```

---

## 31. `ContactosAlumnoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/ContactosAlumnoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `ContactosAlumno`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Service;
import pe.edu.eduspace.notificaciones.client.AlumnosGateway;
import pe.edu.eduspace.notificaciones.client.ContactosDto;
import pe.edu.eduspace.notificaciones.client.ContactosResultado;
import pe.edu.eduspace.notificaciones.config.AppProperties;

/**
 * Contactos de un alumno con caché local de vencimiento corto (adenda A6): cuando alumnos-ms está caído se sirven
 * desde la caché; sin caché, el resultado es "no disponible" y la notificación queda PENDIENTE.
 */
@Service
public class ContactosAlumnoService {

    private final AlumnosGateway gateway;
    private final Cache<Long, ContactosDto> cache;

    public ContactosAlumnoService(AlumnosGateway gateway, AppProperties props) {
        this.gateway = gateway;
        this.cache = Caffeine.newBuilder().expireAfterWrite(props.contactos().cacheTtl())
                .maximumSize(props.contactos().cacheMaxSize()).build();
    }

    public ContactosResultado resolver(Long alumnoId) {
        ContactosDto enCache = cache.getIfPresent(alumnoId);
        if (enCache != null) {
            return ContactosResultado.disponible(enCache);
        }
        ContactosResultado resultado = gateway.contactos(alumnoId);
        if (resultado.estado() == ContactosResultado.Estado.DISPONIBLE) {
            cache.put(alumnoId, resultado.datos());
        }
        return resultado;
    }

    /** Solo para pruebas y diagnóstico. */
    public void vaciarCache() {
        cache.invalidateAll();
    }
}
```

---

## 32. `CorreoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/CorreoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Correo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import jakarta.mail.internet.MimeMessage;
import java.util.Base64;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pe.edu.eduspace.notificaciones.config.AppProperties;
import pe.edu.eduspace.notificaciones.exception.BusinessRuleException;

/**
 * Envía un correo con cuerpo HTML y archivos adjuntos (p. ej. la constancia de matrícula en PDF). Lo piden otros servicios
 * con el token de servicio. En DEV el servidor SMTP es Mailpit; en PROD se configura {@code spring.mail.*} con el proveedor real.
 */
@Slf4j
@Service
public class CorreoService {

    public record Adjunto(String nombre, String contentType, String base64) {}

    private final JavaMailSender mail;
    private final AppProperties props;

    public CorreoService(JavaMailSender mail, AppProperties props) {
        this.mail = mail;
        this.props = props;
    }

    public void enviar(String para, String asunto, String html, String texto, List<Adjunto> adjuntos) {
        try {
            MimeMessage m = mail.createMimeMessage();
            MimeMessageHelper h = new MimeMessageHelper(m, true, "UTF-8");   // siempre multipart: texto + HTML (con o sin adjuntos)
            h.setFrom(props.mail().from());
            h.setTo(para);
            h.setSubject(asunto);
            h.setText(texto == null ? "" : texto, html);
            if (adjuntos != null) {
                for (Adjunto a : adjuntos) {
                    byte[] bytes = Base64.getDecoder().decode(a.base64());
                    h.addAttachment(a.nombre(), new ByteArrayResource(bytes), a.contentType() == null ? "application/octet-stream" : a.contentType());
                }
            }
            mail.send(m);
            log.info("Correo enviado a {} ({} adjunto(s))", enmascarar(para), adjuntos == null ? 0 : adjuntos.size());
        } catch (Exception e) {
            log.warn("No se pudo enviar el correo a {}: {}", enmascarar(para), e.getMessage());
            throw new BusinessRuleException("No se pudo enviar el correo: " + e.getMessage());
        }
    }

    /** En los registros no se escribe la dirección completa. */
    static String enmascarar(String correo) {
        int i = correo == null ? -1 : correo.indexOf('@');
        return i <= 1 ? "***" : correo.charAt(0) + "***" + correo.substring(i);
    }
}
```

---

## 33. `Destino.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/Destino.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service;

/** A quién va una notificación de un evento. */
public enum Destino {
    /** El alumno (si tiene cuenta) y todos sus apoderados con cuenta. */
    ALUMNO_Y_APODERADOS,
    /** El responsable de pago; si no hay, el apoderado principal; si no hay, todos los apoderados. */
    RESPONSABLE_PAGO,
    /** Todos los apoderados con cuenta (no el alumno). */
    APODERADOS,
    /** Usuarios ya indicados en el evento (docentes del horario), sin consultar a alumnos-ms. */
    USUARIOS_DIRECTOS
}
```

---

## 34. `DispositivoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/DispositivoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Dispositivo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import java.util.List;
import pe.edu.eduspace.notificaciones.dto.DispositivoRequest;
import pe.edu.eduspace.notificaciones.dto.DispositivoResponse;

public interface DispositivoService {
    /** Registra el token; si ya existía en otro usuario, se reasigna (el dispositivo cambió de dueño). */
    DispositivoResponse registrar(Long usuarioId, DispositivoRequest request);

    void desactivar(Long usuarioId, String token);

    List<String> tokensActivos(Long usuarioId);
}
```

---

## 35. `DispositivoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/DispositivoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Dispositivo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.dto.DispositivoRequest;
import pe.edu.eduspace.notificaciones.dto.DispositivoResponse;
import pe.edu.eduspace.notificaciones.entity.DispositivoPush;
import pe.edu.eduspace.notificaciones.exception.ResourceNotFoundException;
import pe.edu.eduspace.notificaciones.mapper.NotificacionMapper;
import pe.edu.eduspace.notificaciones.repository.DispositivoPushRepository;
import pe.edu.eduspace.notificaciones.service.DispositivoService;

@Service
@RequiredArgsConstructor
@Transactional
public class DispositivoServiceImpl implements DispositivoService {

    private final DispositivoPushRepository repository;
    private final NotificacionMapper mapper;

    @Override
    public DispositivoResponse registrar(Long usuarioId, DispositivoRequest request) {
        DispositivoPush dispositivo = repository.findByToken(request.token()).orElseGet(DispositivoPush::new);
        dispositivo.setToken(request.token());
        dispositivo.setUsuarioId(usuarioId);
        dispositivo.setPlataforma(request.plataforma());
        dispositivo.setActivo(true);
        dispositivo.setUltimoUso(LocalDateTime.now());
        return mapper.toResponse(repository.save(dispositivo));
    }

    @Override
    public void desactivar(Long usuarioId, String token) {
        DispositivoPush dispositivo = repository.findByToken(token)
                .filter(d -> usuarioId.equals(d.getUsuarioId()))
                .orElseThrow(() -> new ResourceNotFoundException("El dispositivo no está registrado para este usuario"));
        dispositivo.setActivo(false);
        repository.save(dispositivo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> tokensActivos(Long usuarioId) {
        return repository.findByUsuarioIdAndActivoTrue(usuarioId).stream().map(DispositivoPush::getToken).toList();
    }
}
```

---

## 36. `EmailSender.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EmailSender.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service;

/** Envía un correo; lanza una excepción si el servidor SMTP lo rechaza (el reintento la registra). */
public interface EmailSender {
    void enviar(String para, String asunto, String cuerpo);
}
```

---

## 37. `EnvioManualService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EnvioManualService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `EnvioManual`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import pe.edu.eduspace.notificaciones.dto.EnvioManualRequest;
import pe.edu.eduspace.notificaciones.dto.EnvioManualResponse;

public interface EnvioManualService {
    EnvioManualResponse enviar(EnvioManualRequest request);
}
```

---

## 38. `EnvioManualServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/EnvioManualServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `EnvioManual`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.dto.EnvioManualRequest;
import pe.edu.eduspace.notificaciones.dto.EnvioManualResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;
import pe.edu.eduspace.notificaciones.entity.Notificacion;
import pe.edu.eduspace.notificaciones.exception.BusinessRuleException;
import pe.edu.eduspace.notificaciones.repository.NotificacionInsertador;
import pe.edu.eduspace.notificaciones.service.*;

/** Aviso manual de un ADMIN a usuarios concretos. El correo no está disponible: no se conocen direcciones de usuarios sueltos. */
@Service
@RequiredArgsConstructor
@Transactional
public class EnvioManualServiceImpl implements EnvioManualService {

    static final String TIPO = "AVISO_MANUAL";

    private final NotificacionInsertador insertador;
    private final PreferenciaService preferencias;
    private final DispositivoService dispositivos;
    private final ApplicationEventPublisher publisher;

    @Override
    public EnvioManualResponse enviar(EnvioManualRequest request) {
        if (request.canales().contains(Canal.EMAIL)) {
            throw new BusinessRuleException("El envío manual por correo no está disponible: use IN_APP y/o PUSH");
        }
        String clave = UUID.randomUUID().toString();
        int creadas = 0;
        int omitidas = 0;
        for (Long usuarioId : request.usuarioIds().stream().distinct().toList()) {
            for (Canal canal : request.canales().stream().distinct().toList()) {
                boolean sinDispositivo = canal == Canal.PUSH && dispositivos.tokensActivos(usuarioId).isEmpty();
                if (sinDispositivo || !preferencias.habilitada(usuarioId, TIPO, canal)) {
                    omitidas++;
                    continue;
                }
                Notificacion n = new Notificacion();
                n.setUsuarioId(usuarioId);
                n.setTipo(TIPO);
                n.setCanal(canal);
                n.setTitulo(request.titulo());
                n.setMensaje(request.mensaje());
                n.setEventoOrigen("manual");
                n.setEventoClave(clave);
                n.setEstado(canal == Canal.IN_APP ? EstadoNotificacion.ENVIADA : EstadoNotificacion.PENDIENTE);
                n.setEnviadaEn(canal == Canal.IN_APP ? LocalDateTime.now() : null);
                var id = insertador.insertar(n);
                if (id.isPresent()) {
                    creadas++;
                    if (canal != Canal.IN_APP) {
                        publisher.publishEvent(new NotificacionCreadaEvent(id.get()));
                    }
                } else {
                    omitidas++;
                }
            }
        }
        return new EnvioManualResponse(creadas, omitidas);
    }
}
```

---

## 39. `EnvioNotificacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EnvioNotificacionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `EnvioNotificacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

/** Un intento de entrega de una notificación pendiente o fallida, en su propia transacción. */
public interface EnvioNotificacionService {
    void intentar(Long notificacionId);
}
```

---

## 40. `EnvioNotificacionServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/EnvioNotificacionServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `EnvioNotificacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.config.AppProperties;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;
import pe.edu.eduspace.notificaciones.entity.IntentoEnvio;
import pe.edu.eduspace.notificaciones.entity.Notificacion;
import pe.edu.eduspace.notificaciones.repository.IntentoEnvioRepository;
import pe.edu.eduspace.notificaciones.repository.NotificacionRepository;
import pe.edu.eduspace.notificaciones.service.*;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

/**
 * Entrega de EMAIL y PUSH, y resolución de las notificaciones PENDIENTES por falta de contactos. Cada intento deja
 * una fila en {@code intentos_envio}; al tercer fallo la notificación queda FALLIDA definitiva.
 */
@Service
public class EnvioNotificacionServiceImpl implements EnvioNotificacionService {

    private static final Logger log = LoggerFactory.getLogger(EnvioNotificacionServiceImpl.class);
    private static final TypeReference<Map<String, Object>> MAPA = new TypeReference<>() {
    };

    /** Se descarta sin reintentos: no hay a quién ni cómo entregarla. */
    private static final class Descartada extends RuntimeException {
        Descartada(String motivo) {
            super(motivo);
        }
    }

    private final NotificacionRepository repository;
    private final IntentoEnvioRepository intentoRepository;
    private final EmailSender emailSender;
    private final PushSender pushSender;
    private final DispositivoService dispositivos;
    private final NotificacionOrquestador orquestador;
    private final PendienteCodec codec;
    private final ObjectMapper objectMapper;
    private final AppProperties props;

    public EnvioNotificacionServiceImpl(NotificacionRepository repository, IntentoEnvioRepository intentoRepository,
                                        EmailSender emailSender, PushSender pushSender, DispositivoService dispositivos,
                                        NotificacionOrquestador orquestador, PendienteCodec codec,
                                        ObjectMapper objectMapper, AppProperties props) {
        this.repository = repository;
        this.intentoRepository = intentoRepository;
        this.emailSender = emailSender;
        this.pushSender = pushSender;
        this.dispositivos = dispositivos;
        this.orquestador = orquestador;
        this.codec = codec;
        this.objectMapper = objectMapper;
        this.props = props;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void intentar(Long notificacionId) {
        Notificacion n = repository.findById(notificacionId).orElse(null);
        if (n == null || (n.getEstado() != EstadoNotificacion.PENDIENTE && n.getEstado() != EstadoNotificacion.FALLIDA)) {
            return;
        }
        long previos = intentoRepository.countByNotificacionId(notificacionId);
        int max = props.reintentos().maxIntentos();
        if (previos >= max) {
            return;
        }
        short numero = (short) (previos + 1);
        boolean esPendienteDeContactos = Notificacion.SIN_DESTINATARIO == n.getUsuarioId();
        try {
            entregar(n);
            registrar(n, numero, true, null);
            n.setEstado(EstadoNotificacion.ENVIADA);
            n.setEnviadaEn(LocalDateTime.now());
        } catch (Descartada ex) {
            registrar(n, numero, false, ex.getMessage());
            n.setEstado(EstadoNotificacion.DESCARTADA);
            log.warn("component=EnvioNotificacion eventType={} key={} status=DESCARTADA cause={}", n.getTipo(), n.getId(), ex.getMessage());
        } catch (RuntimeException ex) {
            registrar(n, numero, false, ex.getMessage());
            // una pendiente de contactos sigue PENDIENTE mientras queden intentos; las demás pasan a FALLIDA
            n.setEstado(numero >= max || !esPendienteDeContactos ? EstadoNotificacion.FALLIDA : EstadoNotificacion.PENDIENTE);
            log.warn("component=EnvioNotificacion eventType={} key={} status={} intento={} cause={}", n.getTipo(), n.getId(),
                    n.getEstado(), numero, ex.getMessage());
        }
        repository.save(n);
    }

    private void entregar(Notificacion n) {
        if (Notificacion.SIN_DESTINATARIO == n.getUsuarioId()) {
            resolverPendiente(n);
            return;
        }
        switch (n.getCanal()) {
            case EMAIL -> {
                Object email = datos(n).get("email");
                if (email == null || email.toString().isBlank()) {
                    throw new Descartada("La notificación no tiene dirección de correo");
                }
                emailSender.enviar(email.toString(), n.getTitulo(), n.getMensaje());
            }
            case PUSH -> {
                List<String> tokens = dispositivos.tokensActivos(n.getUsuarioId());
                if (tokens.isEmpty()) {
                    throw new Descartada("El usuario no tiene dispositivos activos");
                }
                pushSender.enviar(tokens, n.getTitulo(), n.getMensaje());
            }
            case IN_APP -> {
                // la bandeja no necesita entrega: ya está disponible
            }
        }
    }

    private void resolverPendiente(Notificacion n) {
        PendienteCodec.Pendiente pendiente = codec.leer(n.getDatosJson());
        ResultadoResolucion resultado = orquestador.reintentarPendiente(pendiente.evento(), pendiente.alumnoId());
        switch (resultado) {
            case RESUELTO -> log.info("component=EnvioNotificacion eventType={} key={} status=RESUELTA alumnoId={}",
                    n.getTipo(), n.getId(), pendiente.alumnoId());
            case NO_EXISTE -> throw new Descartada("El alumno " + pendiente.alumnoId() + " no existe en alumnos-ms");
            case PENDIENTE -> throw new IllegalStateException("alumnos-ms sigue sin responder");
        }
    }

    private Map<String, Object> datos(Notificacion n) {
        try {
            return n.getDatosJson() == null ? Map.of() : objectMapper.readValue(n.getDatosJson(), MAPA);
        } catch (RuntimeException ex) {
            return Map.of();
        }
    }

    private void registrar(Notificacion n, short numero, boolean exitoso, String error) {
        IntentoEnvio intento = new IntentoEnvio();
        intento.setNotificacion(n);
        intento.setNumeroIntento(numero);
        intento.setExitoso(exitoso);
        intento.setError(error == null ? null : error.substring(0, Math.min(error.length(), 500)));
        intentoRepository.save(intento);
    }
}
```

---

## 41. `EventoNotificable.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/EventoNotificable.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Un evento de otro servicio ya traducido a lo que este servicio necesita para notificar: qué plantilla, a quién,
 * con qué datos y bajo qué clave se evita duplicarlo.
 *
 * @param eventId       {@code eventId} del sobre estándar; nulo si el productor no lo envía
 * @param eventType     tópico de origen (queda en {@code evento_origen})
 * @param claveEvento   identificador de la entidad del evento (queda en {@code evento_clave})
 * @param plantilla     código de plantilla, que también es el tipo de la notificación
 * @param alumnoIds     alumnos cuyos contactos hay que resolver (vacío con {@link Destino#USUARIOS_DIRECTOS})
 * @param usuarioIds    destinatarios directos (solo con {@link Destino#USUARIOS_DIRECTOS})
 * @param datos         valores para los marcadores {{campo}} de la plantilla
 */
public record EventoNotificable(UUID eventId, String eventType, String claveEvento, String plantilla, Destino destino,
                                List<Long> alumnoIds, List<Long> usuarioIds, Map<String, String> datos) {

    public EventoNotificable {
        alumnoIds = alumnoIds == null ? List.of() : alumnoIds;
        usuarioIds = usuarioIds == null ? List.of() : usuarioIds;
        datos = datos == null ? Map.of() : datos;
    }
}
```

---

## 42. `LogPushSender.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/LogPushSender.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import pe.edu.eduspace.notificaciones.service.PushSender;

/** MVP: solo deja constancia del envío en el log (sin proveedor push real). */
@Component
public class LogPushSender implements PushSender {

    private static final Logger log = LoggerFactory.getLogger(LogPushSender.class);

    @Override
    public void enviar(List<String> tokens, String titulo, String mensaje) {
        log.info("component=LogPushSender eventType=PUSH status=SIMULADO dispositivos={} titulo={}", tokens.size(), titulo);
    }
}
```

---

## 43. `NotificacionAdminService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionAdminService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `NotificacionAdmin`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import org.springframework.data.domain.Pageable;
import pe.edu.eduspace.notificaciones.dto.NotificacionAdminResponse;
import pe.edu.eduspace.notificaciones.dto.NotificacionEditarRequest;
import pe.edu.eduspace.notificaciones.dto.PageResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;

/** Administración de las notificaciones ya generadas: consultar, corregir el texto y eliminar. */
public interface NotificacionAdminService {

    PageResponse<NotificacionAdminResponse> listar(String tipo, Canal canal, EstadoNotificacion estado, Long usuarioId, String texto,
                                                   Pageable pageable);

    NotificacionAdminResponse editar(Long id, NotificacionEditarRequest request);

    void eliminar(Long id);
}
```

---

## 44. `NotificacionAdminServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/NotificacionAdminServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `NotificacionAdmin`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.dto.NotificacionAdminResponse;
import pe.edu.eduspace.notificaciones.dto.NotificacionEditarRequest;
import pe.edu.eduspace.notificaciones.dto.PageResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;
import pe.edu.eduspace.notificaciones.entity.Notificacion;
import pe.edu.eduspace.notificaciones.exception.ResourceNotFoundException;
import pe.edu.eduspace.notificaciones.repository.NotificacionRepository;
import pe.edu.eduspace.notificaciones.service.NotificacionAdminService;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificacionAdminServiceImpl implements NotificacionAdminService {

    private final NotificacionRepository repository;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<NotificacionAdminResponse> listar(String tipo, Canal canal, EstadoNotificacion estado, Long usuarioId,
                                                          String texto, Pageable pageable) {
        Specification<Notificacion> filtro = (root, query, cb) -> {
            List<Predicate> p = new ArrayList<>();
            if (tipo != null && !tipo.isBlank()) {
                p.add(cb.equal(root.get("tipo"), tipo.trim()));
            }
            if (canal != null) {
                p.add(cb.equal(root.get("canal"), canal));
            }
            if (estado != null) {
                p.add(cb.equal(root.get("estado"), estado));
            }
            if (usuarioId != null) {
                p.add(cb.equal(root.get("usuarioId"), usuarioId));
            }
            if (texto != null && !texto.isBlank()) {
                String like = "%" + texto.trim().toLowerCase() + "%";
                p.add(cb.or(cb.like(cb.lower(root.get("titulo")), like), cb.like(cb.lower(root.get("mensaje")), like)));
            }
            return cb.and(p.toArray(Predicate[]::new));
        };
        Pageable orden = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Order.desc("creadaEn"), Sort.Order.desc("id")));
        return PageResponse.of(repository.findAll(filtro, orden).map(this::respuesta));
    }

    @Override
    public NotificacionAdminResponse editar(Long id, NotificacionEditarRequest request) {
        Notificacion n = repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Notificación", id));
        n.setTitulo(request.titulo().trim());
        n.setMensaje(request.mensaje().trim());
        return respuesta(repository.save(n));
    }

    @Override
    public void eliminar(Long id) {
        Notificacion n = repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Notificación", id));
        repository.delete(n); // sus intentos de envío se borran en cascada (FK ON DELETE CASCADE)
    }

    private NotificacionAdminResponse respuesta(Notificacion n) {
        return new NotificacionAdminResponse(n.getId(), n.getUsuarioId(), n.getTipo(), n.getCanal(), n.getEstado(), n.getTitulo(),
                n.getMensaje(), n.getLeida(), n.getCreadaEn(), n.getEnviadaEn());
    }
}
```

---

## 45. `NotificacionCreadaEvent.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionCreadaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.service;

/** Se publica al crear una notificación EMAIL o PUSH; el envío ocurre después del commit, fuera de la transacción. */
public record NotificacionCreadaEvent(Long notificacionId) {
}
```

---

## 46. `NotificacionOrquestador.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionOrquestador.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service;

/** Convierte un evento de otro servicio en notificaciones para los usuarios correctos. */
public interface NotificacionOrquestador {

    /**
     * Procesa el evento en una sola transacción: descarta los repetidos por {@code eventId}, resuelve destinatarios,
     * respeta preferencias y crea las notificaciones por canal. Si alumnos-ms no responde deja una notificación
     * PENDIENTE por alumno para reintentar.
     */
    void procesar(EventoNotificable evento);

    /** Reintento de un alumno que quedó pendiente: no crea otra pendiente si sigue sin responder. */
    ResultadoResolucion reintentarPendiente(EventoNotificable evento, Long alumnoId);
}
```

---

## 47. `NotificacionOrquestadorImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/NotificacionOrquestadorImpl.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.client.ContactosDto;
import pe.edu.eduspace.notificaciones.client.ContactosDto.ApoderadoDto;
import pe.edu.eduspace.notificaciones.client.ContactosResultado;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;
import pe.edu.eduspace.notificaciones.entity.Notificacion;
import pe.edu.eduspace.notificaciones.entity.PlantillaNotificacion;
import pe.edu.eduspace.notificaciones.repository.EventoProcesadoRepository;
import pe.edu.eduspace.notificaciones.repository.NotificacionInsertador;
import pe.edu.eduspace.notificaciones.service.*;

@Service
@Transactional
public class NotificacionOrquestadorImpl implements NotificacionOrquestador {

    private static final Logger log = LoggerFactory.getLogger(NotificacionOrquestadorImpl.class);

    /** Quien recibe: su usuario en auth-ms y, para el correo, la dirección. */
    private record Destinatario(Long usuarioId, String email) {
    }

    private final EventoProcesadoRepository eventoRepository;
    private final ContactosAlumnoService contactos;
    private final PlantillaService plantillas;
    private final PreferenciaService preferencias;
    private final DispositivoService dispositivos;
    private final NotificacionInsertador insertador;
    private final ApplicationEventPublisher publisher;
    private final PendienteCodec codec;

    public NotificacionOrquestadorImpl(EventoProcesadoRepository eventoRepository, ContactosAlumnoService contactos,
                                       PlantillaService plantillas, PreferenciaService preferencias,
                                       DispositivoService dispositivos, NotificacionInsertador insertador,
                                       ApplicationEventPublisher publisher, PendienteCodec codec) {
        this.eventoRepository = eventoRepository;
        this.contactos = contactos;
        this.plantillas = plantillas;
        this.preferencias = preferencias;
        this.dispositivos = dispositivos;
        this.insertador = insertador;
        this.publisher = publisher;
        this.codec = codec;
    }

    @Override
    public void procesar(EventoNotificable evento) {
        // idempotencia por eventId: se decide en la misma transacción que crea las notificaciones
        if (evento.eventId() != null && eventoRepository.registrarSiNoExiste(evento.eventId(), evento.eventType()) == 0) {
            log.info("component=NotificacionOrquestador eventType={} key={} status=DUPLICADO eventId={}",
                    evento.eventType(), evento.claveEvento(), evento.eventId());
            return;
        }
        if (evento.destino() == Destino.USUARIOS_DIRECTOS) {
            for (Long usuarioId : evento.usuarioIds().stream().distinct().toList()) {
                notificar(new Destinatario(usuarioId, null), evento, evento.datos(), null);
            }
            return;
        }
        for (Long alumnoId : evento.alumnoIds().stream().distinct().toList()) {
            ContactosResultado resultado = contactos.resolver(alumnoId);
            switch (resultado.estado()) {
                case DISPONIBLE -> notificarContactos(evento, alumnoId, resultado.datos());
                case NO_DISPONIBLE -> crearPendiente(evento, alumnoId);
                case NO_EXISTE -> log.warn("component=NotificacionOrquestador eventType={} key={} status=DESCARTADO alumnoId={} cause=ALUMNO_NO_EXISTE",
                        evento.eventType(), evento.claveEvento(), alumnoId);
            }
        }
    }

    @Override
    public ResultadoResolucion reintentarPendiente(EventoNotificable evento, Long alumnoId) {
        ContactosResultado resultado = contactos.resolver(alumnoId);
        return switch (resultado.estado()) {
            case DISPONIBLE -> {
                notificarContactos(evento, alumnoId, resultado.datos());
                yield ResultadoResolucion.RESUELTO;
            }
            case NO_DISPONIBLE -> ResultadoResolucion.PENDIENTE;
            case NO_EXISTE -> ResultadoResolucion.NO_EXISTE;
        };
    }

    private void notificarContactos(EventoNotificable evento, Long alumnoId, ContactosDto c) {
        Map<String, String> datos = new LinkedHashMap<>(evento.datos());
        datos.putIfAbsent("alumno", c.nombreCompleto());
        datos.put("alumnoId", String.valueOf(alumnoId));
        List<Destinatario> destinatarios = destinatarios(evento.destino(), c);
        if (destinatarios.isEmpty()) {
            log.warn("component=NotificacionOrquestador eventType={} key={} status=SIN_DESTINATARIOS alumnoId={}",
                    evento.eventType(), evento.claveEvento(), alumnoId);
        }
        for (Destinatario d : destinatarios) {
            notificar(d, evento, datos, alumnoId);
        }
    }

    /** Quién recibe según el destino; solo quienes tienen cuenta (usuario_id) pueden tener bandeja. */
    private List<Destinatario> destinatarios(Destino destino, ContactosDto c) {
        Map<Long, Destinatario> resultado = new LinkedHashMap<>();
        List<ApoderadoDto> apoderados = c.apoderadosOVacio().stream().filter(a -> a.usuarioId() != null).toList();
        switch (destino) {
            case ALUMNO_Y_APODERADOS -> {
                if (c.usuarioId() != null) {
                    resultado.put(c.usuarioId(), new Destinatario(c.usuarioId(), null));
                }
                apoderados.forEach(a -> resultado.merge(a.usuarioId(), new Destinatario(a.usuarioId(), a.email()), (x, y) -> x));
            }
            case APODERADOS -> apoderados.forEach(a -> resultado.put(a.usuarioId(), new Destinatario(a.usuarioId(), a.email())));
            case RESPONSABLE_PAGO -> {
                List<ApoderadoDto> elegidos = apoderados.stream().filter(a -> Boolean.TRUE.equals(a.esResponsablePago())).toList();
                if (elegidos.isEmpty()) {
                    elegidos = apoderados.stream().filter(a -> Boolean.TRUE.equals(a.esPrincipal())).toList();
                }
                if (elegidos.isEmpty()) {
                    elegidos = apoderados;
                }
                elegidos.forEach(a -> resultado.put(a.usuarioId(), new Destinatario(a.usuarioId(), a.email())));
            }
            case USUARIOS_DIRECTOS -> {
            }
        }
        return new ArrayList<>(resultado.values());
    }

    /** Una notificación por canal habilitado, con su plantilla; la restricción única evita los duplicados. */
    private void notificar(Destinatario destinatario, EventoNotificable evento, Map<String, String> datos, Long alumnoId) {
        for (Canal canal : Canal.values()) {
            Optional<PlantillaNotificacion> plantilla = plantillas.activa(evento.plantilla(), canal);
            if (plantilla.isEmpty()) {
                if (canal == Canal.IN_APP) {
                    log.warn("component=NotificacionOrquestador eventType={} key={} status=SIN_PLANTILLA plantilla={}",
                            evento.eventType(), evento.claveEvento(), evento.plantilla());
                }
                continue;
            }
            if (canal == Canal.EMAIL && (destinatario.email() == null || destinatario.email().isBlank())) {
                continue;
            }
            if (canal == Canal.PUSH && dispositivos.tokensActivos(destinatario.usuarioId()).isEmpty()) {
                continue;
            }
            if (!preferencias.habilitada(destinatario.usuarioId(), evento.plantilla(), canal)) {
                continue;
            }
            PlantillaService.Texto texto = plantillas.armar(plantilla.get(), datos);
            Map<String, Object> extra = new LinkedHashMap<>(datos);
            if (canal == Canal.EMAIL) {
                extra.put("email", destinatario.email());
            }
            Notificacion n = new Notificacion();
            n.setUsuarioId(destinatario.usuarioId());
            n.setTipo(evento.plantilla());
            n.setCanal(canal);
            n.setTitulo(texto.asunto().isBlank() ? "Notificación" : texto.asunto());
            n.setMensaje(texto.cuerpo());
            n.setDatosJson(codec.escribirDatos(extra));
            n.setEventoOrigen(evento.eventType());
            n.setEventoClave(evento.claveEvento());
            n.setEstado(canal == Canal.IN_APP ? EstadoNotificacion.ENVIADA : EstadoNotificacion.PENDIENTE);
            n.setEnviadaEn(canal == Canal.IN_APP ? LocalDateTime.now() : null);
            Optional<Long> id = insertador.insertar(n);
            if (id.isEmpty()) {
                log.info("component=NotificacionOrquestador eventType={} key={} status=YA_EXISTIA usuarioId={} canal={}",
                        evento.eventType(), evento.claveEvento(), destinatario.usuarioId(), canal);
            } else if (canal != Canal.IN_APP) {
                publisher.publishEvent(new NotificacionCreadaEvent(id.get()));
            }
        }
    }

    /** alumnos-ms no respondió: se guarda lo necesario para volver a resolver los destinatarios más tarde. */
    private void crearPendiente(EventoNotificable evento, Long alumnoId) {
        Notificacion n = new Notificacion();
        n.setUsuarioId(Notificacion.SIN_DESTINATARIO);
        n.setTipo(evento.plantilla());
        n.setCanal(Canal.IN_APP);
        n.setTitulo("Pendiente: destinatarios sin resolver");
        n.setMensaje("Se notificará cuando alumnos-ms responda (alumno " + alumnoId + ", evento " + evento.eventType() + ").");
        n.setDatosJson(codec.escribir(evento, alumnoId));
        n.setEventoOrigen(evento.eventType());
        n.setEventoClave(evento.claveEvento() + ":" + alumnoId);
        n.setEstado(EstadoNotificacion.PENDIENTE);
        boolean creada = insertador.insertar(n).isPresent();
        log.warn("component=NotificacionOrquestador eventType={} key={} status=PENDIENTE alumnoId={} nueva={}",
                evento.eventType(), evento.claveEvento(), alumnoId, creada);
    }
}
```

---

## 48. `NotificacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/NotificacionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Notificacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import org.springframework.data.domain.Pageable;
import pe.edu.eduspace.notificaciones.dto.ConteoNoLeidasResponse;
import pe.edu.eduspace.notificaciones.dto.NotificacionResponse;
import pe.edu.eduspace.notificaciones.dto.PageResponse;

/** Bandeja del usuario autenticado: solo ve y modifica las suyas. */
public interface NotificacionService {
    PageResponse<NotificacionResponse> bandeja(Long usuarioId, Boolean leida, Pageable pageable);

    ConteoNoLeidasResponse conteoNoLeidas(Long usuarioId);

    NotificacionResponse marcarLeida(Long usuarioId, Long id);

    int marcarTodasLeidas(Long usuarioId);
}
```

---

## 49. `NotificacionServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/NotificacionServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Notificacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.dto.ConteoNoLeidasResponse;
import pe.edu.eduspace.notificaciones.dto.NotificacionResponse;
import pe.edu.eduspace.notificaciones.dto.PageResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.Notificacion;
import pe.edu.eduspace.notificaciones.exception.ResourceNotFoundException;
import pe.edu.eduspace.notificaciones.repository.NotificacionRepository;
import pe.edu.eduspace.notificaciones.service.NotificacionService;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificacionServiceImpl implements NotificacionService {

    private static final TypeReference<Map<String, Object>> MAPA = new TypeReference<>() {
    };

    private final NotificacionRepository repository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<NotificacionResponse> bandeja(Long usuarioId, Boolean leida, Pageable pageable) {
        Page<Notificacion> page = leida == null
                ? repository.findByUsuarioIdAndCanalOrderByCreadaEnDescIdDesc(usuarioId, Canal.IN_APP, pageable)
                : repository.findByUsuarioIdAndCanalAndLeidaOrderByCreadaEnDescIdDesc(usuarioId, Canal.IN_APP, leida, pageable);
        return PageResponse.of(page.map(this::respuesta));
    }

    @Override
    @Transactional(readOnly = true)
    public ConteoNoLeidasResponse conteoNoLeidas(Long usuarioId) {
        return new ConteoNoLeidasResponse(repository.countByUsuarioIdAndCanalAndLeidaFalse(usuarioId, Canal.IN_APP));
    }

    @Override
    public NotificacionResponse marcarLeida(Long usuarioId, Long id) {
        // una notificación ajena se trata como inexistente (404): no se revela que existe
        Notificacion n = repository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> ResourceNotFoundException.of("Notificación", id));
        if (!Boolean.TRUE.equals(n.getLeida())) {
            n.setLeida(true);
            n.setLeidaEn(LocalDateTime.now());
            repository.save(n);
        }
        return respuesta(n);
    }

    @Override
    public int marcarTodasLeidas(Long usuarioId) {
        return repository.marcarTodasLeidas(usuarioId, Canal.IN_APP);
    }

    private NotificacionResponse respuesta(Notificacion n) {
        return new NotificacionResponse(n.getId(), n.getTipo(), n.getTitulo(), n.getMensaje(), datos(n.getDatosJson()),
                n.getLeida(), n.getLeidaEn(), n.getCreadaEn());
    }

    private Map<String, Object> datos(String json) {
        if (json == null || json.isBlank()) {
            return Map.of();
        }
        try {
            return objectMapper.readValue(json, MAPA);
        } catch (RuntimeException ex) {
            return Map.of();
        }
    }
}
```

---

## 50. `PendienteCodec.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/PendienteCodec.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;
import pe.edu.eduspace.notificaciones.service.Destino;
import pe.edu.eduspace.notificaciones.service.EventoNotificable;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

/** Guarda y recupera, dentro de una notificación PENDIENTE, lo necesario para volver a resolver sus destinatarios. */
@Component
class PendienteCodec {

    private static final TypeReference<Map<String, Object>> MAPA = new TypeReference<>() {
    };
    private static final TypeReference<Map<String, String>> MAPA_TEXTO = new TypeReference<>() {
    };

    private final ObjectMapper objectMapper;

    PendienteCodec(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    String escribir(EventoNotificable e, Long alumnoId) {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("alumnoId", alumnoId);
        payload.put("destino", e.destino().name());
        payload.put("plantilla", e.plantilla());
        payload.put("eventType", e.eventType());
        payload.put("claveEvento", e.claveEvento());
        payload.put("datos", e.datos());
        return objectMapper.writeValueAsString(payload);
    }

    Pendiente leer(String json) {
        Map<String, Object> payload = objectMapper.readValue(json, MAPA);
        Map<String, String> datos = objectMapper.convertValue(payload.get("datos"), MAPA_TEXTO);
        Long alumnoId = ((Number) payload.get("alumnoId")).longValue();
        EventoNotificable evento = new EventoNotificable(null, (String) payload.get("eventType"),
                (String) payload.get("claveEvento"), (String) payload.get("plantilla"),
                Destino.valueOf((String) payload.get("destino")), List.of(alumnoId), List.of(), datos);
        return new Pendiente(evento, alumnoId);
    }

    record Pendiente(EventoNotificable evento, Long alumnoId) {
    }

    String escribirDatos(Map<String, ?> datos) {
        return objectMapper.writeValueAsString(datos);
    }
}
```

---

## 51. `PlantillaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/PlantillaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Plantilla`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import pe.edu.eduspace.notificaciones.dto.PlantillaCrearRequest;
import pe.edu.eduspace.notificaciones.dto.PlantillaRequest;
import pe.edu.eduspace.notificaciones.dto.PlantillaResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.PlantillaNotificacion;

public interface PlantillaService {

    /** Texto ya armado de una plantilla: asunto (título) y cuerpo (mensaje). */
    record Texto(String asunto, String cuerpo) {
    }

    Optional<PlantillaNotificacion> activa(String codigo, Canal canal);

    /** Reemplaza los marcadores {{campo}}; un dato faltante deja un texto neutro en lugar de fallar. */
    Texto armar(PlantillaNotificacion plantilla, Map<String, String> datos);

    List<PlantillaResponse> listar();

    PlantillaResponse crear(PlantillaCrearRequest request);

    PlantillaResponse actualizar(Long id, PlantillaRequest request);

    /** Solo las plantillas propias: las que usa el sistema para sus avisos automáticos no se borran (se desactivan). */
    void eliminar(Long id);
}
```

---

## 52. `PlantillaServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/PlantillaServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Plantilla`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Set;
import pe.edu.eduspace.notificaciones.dto.PlantillaCrearRequest;
import pe.edu.eduspace.notificaciones.dto.PlantillaRequest;
import pe.edu.eduspace.notificaciones.dto.PlantillaResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.PlantillaNotificacion;
import pe.edu.eduspace.notificaciones.exception.BusinessRuleException;
import pe.edu.eduspace.notificaciones.exception.ResourceNotFoundException;
import pe.edu.eduspace.notificaciones.mapper.NotificacionMapper;
import pe.edu.eduspace.notificaciones.repository.PlantillaRepository;
import pe.edu.eduspace.notificaciones.service.PlantillaService;

@Service
@RequiredArgsConstructor
@Transactional
public class PlantillaServiceImpl implements PlantillaService {

    static final String SIN_DATO = "(sin dato)";
    /** Códigos que usan los avisos automáticos (eventos de los demás servicios): borrarlos los dejaría sin texto. */
    static final Set<String> DEL_SISTEMA = Set.of("ASISTENCIA_FALTA", "BOLETIN_GENERADO", "EXAMEN_CALIFICADO", "EXAMEN_PUBLICADO",
            "HORARIO_PUBLICADO", "JUSTIFICACION_RESUELTA", "MATERIAL_PUBLICADO", "MATRICULA_ANULADA", "MATRICULA_CONFIRMADA", "MATRICULA_CREADA",
            "PAGO_CONFIRMADO", "PAGO_POR_VENCER", "PAGO_VENCIDO", "TAREA_CALIFICADA", "TAREA_PUBLICADA", "TAREA_RECORDATORIO");
    private static final Pattern MARCADOR = Pattern.compile("\\{\\{\\s*([A-Za-z0-9_]+)\\s*}}");

    private final PlantillaRepository repository;
    private final NotificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Optional<PlantillaNotificacion> activa(String codigo, Canal canal) {
        return repository.findByCodigoAndCanal(codigo, canal).filter(p -> Boolean.TRUE.equals(p.getActiva()));
    }

    @Override
    public Texto armar(PlantillaNotificacion plantilla, Map<String, String> datos) {
        String asunto = plantilla.getAsunto() == null ? "" : reemplazar(plantilla.getAsunto(), datos);
        return new Texto(asunto, reemplazar(plantilla.getCuerpo(), datos));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlantillaResponse> listar() {
        return repository.findAllByOrderByCodigoAscCanalAsc().stream().map(mapper::toResponse).toList();
    }

    @Override
    public PlantillaResponse crear(PlantillaCrearRequest request) {
        if (repository.findByCodigoAndCanal(request.codigo(), request.canal()).isPresent()) {
            throw new BusinessRuleException("Ya existe una plantilla " + request.codigo() + " para el canal " + request.canal());
        }
        PlantillaNotificacion p = new PlantillaNotificacion();
        p.setCodigo(request.codigo());
        p.setCanal(request.canal());
        p.setAsunto(request.asunto());
        p.setCuerpo(request.cuerpo());
        p.setActiva(request.activa() == null || request.activa());
        return mapper.toResponse(repository.save(p));
    }

    @Override
    public void eliminar(Long id) {
        PlantillaNotificacion p = repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Plantilla", id));
        if (DEL_SISTEMA.contains(p.getCodigo())) {
            throw new BusinessRuleException("«" + p.getCodigo() + "» es una plantilla del sistema: no se elimina, solo se desactiva");
        }
        repository.delete(p);
    }

    @Override
    public PlantillaResponse actualizar(Long id, PlantillaRequest request) {
        PlantillaNotificacion plantilla = repository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Plantilla", id));
        plantilla.setAsunto(request.asunto());
        plantilla.setCuerpo(request.cuerpo());
        if (request.activa() != null) {
            plantilla.setActiva(request.activa());
        }
        return mapper.toResponse(repository.save(plantilla));
    }

    private String reemplazar(String texto, Map<String, String> datos) {
        Matcher m = MARCADOR.matcher(texto);
        StringBuilder out = new StringBuilder();
        while (m.find()) {
            String valor = datos.get(m.group(1));
            m.appendReplacement(out, Matcher.quoteReplacement(valor == null || valor.isBlank() ? SIN_DATO : valor));
        }
        m.appendTail(out);
        return out.toString();
    }
}
```

---

## 53. `PreferenciaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/PreferenciaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Preferencia`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

import java.util.List;
import pe.edu.eduspace.notificaciones.dto.PreferenciaRequest;
import pe.edu.eduspace.notificaciones.dto.PreferenciaResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;

public interface PreferenciaService {
    /** Por defecto todo está habilitado: solo se guardan los cambios del usuario. */
    boolean habilitada(Long usuarioId, String tipo, Canal canal);

    List<PreferenciaResponse> listar(Long usuarioId);

    List<PreferenciaResponse> guardar(Long usuarioId, List<PreferenciaRequest> cambios);
}
```

---

## 54. `PreferenciaServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/PreferenciaServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Preferencia`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.dto.PreferenciaRequest;
import pe.edu.eduspace.notificaciones.dto.PreferenciaResponse;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.PreferenciaNotificacion;
import pe.edu.eduspace.notificaciones.mapper.NotificacionMapper;
import pe.edu.eduspace.notificaciones.repository.PreferenciaRepository;
import pe.edu.eduspace.notificaciones.service.PreferenciaService;

@Service
@RequiredArgsConstructor
@Transactional
public class PreferenciaServiceImpl implements PreferenciaService {

    private final PreferenciaRepository repository;
    private final NotificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public boolean habilitada(Long usuarioId, String tipo, Canal canal) {
        return repository.findByUsuarioIdAndTipoAndCanal(usuarioId, tipo, canal)
                .map(p -> Boolean.TRUE.equals(p.getHabilitada())).orElse(true);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PreferenciaResponse> listar(Long usuarioId) {
        return repository.findByUsuarioIdOrderByTipoAscCanalAsc(usuarioId).stream().map(mapper::toResponse).toList();
    }

    @Override
    public List<PreferenciaResponse> guardar(Long usuarioId, List<PreferenciaRequest> cambios) {
        for (PreferenciaRequest c : cambios) {
            PreferenciaNotificacion p = repository.findByUsuarioIdAndTipoAndCanal(usuarioId, c.tipo(), c.canal())
                    .orElseGet(() -> {
                        PreferenciaNotificacion nueva = new PreferenciaNotificacion();
                        nueva.setUsuarioId(usuarioId);
                        nueva.setTipo(c.tipo());
                        nueva.setCanal(c.canal());
                        return nueva;
                    });
            p.setHabilitada(c.habilitada());
            repository.save(p);
        }
        return listar(usuarioId);
    }
}
```

---

## 55. `PushSender.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/PushSender.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service;

import java.util.List;

/** Envío a dispositivos. MVP: {@code LogPushSender}; fase 2: implementación con FCM. */
public interface PushSender {
    void enviar(List<String> tokens, String titulo, String mensaje);
}
```

---

## 56. `ReintentoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/ReintentoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Reintento`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service;

/** Toma lo pendiente y lo fallido y lo vuelve a intentar; también limpia los eventos procesados antiguos. */
public interface ReintentoService {
    /** @return cuántas notificaciones se intentaron en este ciclo */
    int procesarPendientes();

    /** @return cuántos registros de {@code eventos_procesados} se borraron */
    int limpiarEventosProcesados();
}
```

---

## 57. `ReintentoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/ReintentoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Reintento`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.notificaciones.config.AppProperties;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;
import pe.edu.eduspace.notificaciones.entity.Notificacion;
import pe.edu.eduspace.notificaciones.repository.EventoProcesadoRepository;
import pe.edu.eduspace.notificaciones.repository.NotificacionRepository;
import pe.edu.eduspace.notificaciones.service.EnvioNotificacionService;
import pe.edu.eduspace.notificaciones.service.ReintentoService;

@Service
public class ReintentoServiceImpl implements ReintentoService {

    private static final Logger log = LoggerFactory.getLogger(ReintentoServiceImpl.class);

    private final NotificacionRepository repository;
    private final EventoProcesadoRepository eventoRepository;
    private final EnvioNotificacionService envio;
    private final AppProperties props;

    public ReintentoServiceImpl(NotificacionRepository repository, EventoProcesadoRepository eventoRepository,
                                EnvioNotificacionService envio, AppProperties props) {
        this.repository = repository;
        this.eventoRepository = eventoRepository;
        this.envio = envio;
        this.props = props;
    }

    @Override
    public int procesarPendientes() {
        List<Notificacion> lote = repository.pendientes(List.of(EstadoNotificacion.PENDIENTE, EstadoNotificacion.FALLIDA),
                props.reintentos().maxIntentos(), PageRequest.of(0, props.reintentos().lote()));
        int intentadas = 0;
        for (Notificacion n : lote) {
            try {
                envio.intentar(n.getId());
                intentadas++;
            } catch (RuntimeException ex) {
                log.error("component=ReintentoService eventType={} key={} status=ERROR cause={}", n.getTipo(), n.getId(), ex.getMessage());
            }
        }
        if (intentadas > 0) {
            log.info("component=ReintentoService eventType=Ciclo status=OK intentadas={}", intentadas);
        }
        return intentadas;
    }

    @Override
    @Transactional
    public int limpiarEventosProcesados() {
        int borrados = eventoRepository.borrarAnterioresA(LocalDateTime.now().minusDays(props.limpieza().diasEventosProcesados()));
        log.info("component=ReintentoService eventType=LimpiezaEventosProcesados status=OK borrados={}", borrados);
        return borrados;
    }
}
```

---

## 58. `ResultadoResolucion.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/ResultadoResolucion.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service;

/** Qué pasó al intentar resolver los destinatarios de un alumno. */
public enum ResultadoResolucion {
    /** Se crearon las notificaciones. */
    RESUELTO,
    /** alumnos-ms no respondió: queda una notificación PENDIENTE para reintentar. */
    PENDIENTE,
    /** El alumno no existe en alumnos-ms: el evento se descarta. */
    NO_EXISTE
}
```

---

## 59. `SmtpEmailSender.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/service/impl/SmtpEmailSender.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import pe.edu.eduspace.notificaciones.config.AppProperties;
import pe.edu.eduspace.notificaciones.service.EmailSender;

@Component
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;
    private final AppProperties props;

    public SmtpEmailSender(JavaMailSender mailSender, AppProperties props) {
        this.mailSender = mailSender;
        this.props = props;
    }

    @Override
    public void enviar(String para, String asunto, String cuerpo) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setFrom(props.mail().from());
        mensaje.setTo(para);
        mensaje.setSubject(asunto);
        mensaje.setText(cuerpo);
        mailSender.send(mensaje);
    }
}
```

---

## 60. `AdminNotificacionController.java` — Controladores REST API

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/controller/AdminNotificacionController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `AdminNotificacion`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.notificaciones.controller;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.notificaciones.dto.EnvioManualRequest;
import pe.edu.eduspace.notificaciones.dto.EnvioManualResponse;
import pe.edu.eduspace.notificaciones.dto.NotificacionAdminResponse;
import pe.edu.eduspace.notificaciones.dto.NotificacionEditarRequest;
import pe.edu.eduspace.notificaciones.dto.PageResponse;
import pe.edu.eduspace.notificaciones.dto.PlantillaCrearRequest;
import pe.edu.eduspace.notificaciones.dto.PlantillaRequest;
import pe.edu.eduspace.notificaciones.entity.Canal;
import pe.edu.eduspace.notificaciones.entity.EstadoNotificacion;
import pe.edu.eduspace.notificaciones.service.NotificacionAdminService;
import pe.edu.eduspace.notificaciones.dto.PlantillaResponse;
import pe.edu.eduspace.notificaciones.service.EnvioManualService;
import pe.edu.eduspace.notificaciones.service.PlantillaService;

/** Plantillas (alta, edición, baja), envío manual y administración de lo ya enviado: solo ADMIN (la regla está en SecurityConfig, antes de leer el cuerpo). */
@RestController
@RequestMapping("/api/v1/notificaciones")
@RequiredArgsConstructor
public class AdminNotificacionController {

    private final PlantillaService plantillas;
    private final EnvioManualService envioManual;
    private final NotificacionAdminService administracion;

    @GetMapping("/plantillas")
    public List<PlantillaResponse> plantillas() {
        return plantillas.listar();
    }

    @PostMapping("/plantillas")
    public ResponseEntity<PlantillaResponse> crearPlantilla(@Valid @RequestBody PlantillaCrearRequest request) {
        return ResponseEntity.status(201).body(plantillas.crear(request));
    }

    @DeleteMapping("/plantillas/{id}")
    public ResponseEntity<Void> eliminarPlantilla(@PathVariable Long id) {
        plantillas.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/plantillas/{id}")
    public PlantillaResponse actualizarPlantilla(@PathVariable Long id, @Valid @RequestBody PlantillaRequest request) {
        return plantillas.actualizar(id, request);
    }

    @PostMapping("/enviar")
    public EnvioManualResponse enviar(@Valid @RequestBody EnvioManualRequest request) {
        return envioManual.enviar(request);
    }

    @GetMapping("/admin")
    public PageResponse<NotificacionAdminResponse> listar(@RequestParam(required = false) String tipo,
                                                          @RequestParam(required = false) Canal canal,
                                                          @RequestParam(required = false) EstadoNotificacion estado,
                                                          @RequestParam(required = false) Long usuarioId,
                                                          @RequestParam(required = false) String texto,
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "20") int size) {
        return administracion.listar(tipo, canal, estado, usuarioId, texto,
                PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), 100)));
    }

    @PutMapping("/admin/{id}")
    public NotificacionAdminResponse editar(@PathVariable Long id, @Valid @RequestBody NotificacionEditarRequest request) {
        return administracion.editar(id, request);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        administracion.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 61. `InternalCorreoController.java` — Controladores REST API

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/controller/InternalCorreoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `InternalCorreo`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.notificaciones.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.notificaciones.service.CorreoService;

/** Envío de correos que otros servicios solicitan (no pasa por el Gateway; exige el token de servicio). */
@RestController
@RequestMapping("/internal/correos")
@RequiredArgsConstructor
public class InternalCorreoController {

    private final CorreoService correos;

    public record AdjuntoDto(@NotBlank @Size(max = 120) String nombre, @Size(max = 100) String contentType, @NotBlank String base64) {}

    public record CorreoRequest(@NotBlank @Email @Size(max = 150) String para, @NotBlank @Size(max = 200) String asunto,
                                @NotBlank String html, String texto, List<@Valid AdjuntoDto> adjuntos) {}

    public record CorreoResponse(boolean enviado) {}

    @PostMapping
    public CorreoResponse enviar(@Valid @RequestBody CorreoRequest r) {
        List<CorreoService.Adjunto> adj = r.adjuntos() == null ? List.of()
            : r.adjuntos().stream().map(a -> new CorreoService.Adjunto(a.nombre(), a.contentType(), a.base64())).toList();
        correos.enviar(r.para(), r.asunto(), r.html(), r.texto(), adj);
        return new CorreoResponse(true);
    }
}
```

---

## 62. `NotificacionController.java` — Controladores REST API

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/controller/NotificacionController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Notificacion`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.notificaciones.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.notificaciones.dto.*;
import pe.edu.eduspace.notificaciones.service.DispositivoService;
import pe.edu.eduspace.notificaciones.service.NotificacionService;
import pe.edu.eduspace.notificaciones.service.PreferenciaService;
import pe.edu.eduspace.notificaciones.util.UsuarioActual;

/** Bandeja, preferencias y dispositivos del usuario autenticado: siempre actúa sobre sus propios datos. */
@RestController
@RequestMapping("/api/v1/notificaciones")
@RequiredArgsConstructor
public class NotificacionController {

    private final NotificacionService service;
    private final PreferenciaService preferencias;
    private final DispositivoService dispositivos;

    @GetMapping("/mias")
    public PageResponse<NotificacionResponse> bandeja(@RequestParam(required = false) Boolean leida,
                                                      @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "20") int size) {
        int tamano = Math.min(Math.max(size, 1), 100);
        return service.bandeja(yo(), leida, PageRequest.of(Math.max(page, 0), tamano));
    }

    @GetMapping("/mias/no-leidas/conteo")
    public ConteoNoLeidasResponse conteo() {
        return service.conteoNoLeidas(yo());
    }

    @PatchMapping("/mias/leer-todas")
    public Map<String, Integer> leerTodas() {
        return Map.of("marcadas", service.marcarTodasLeidas(yo()));
    }

    @PatchMapping("/{id}/leida")
    public NotificacionResponse marcarLeida(@PathVariable Long id) {
        return service.marcarLeida(yo(), id);
    }

    @GetMapping("/preferencias")
    public List<PreferenciaResponse> preferencias() {
        return preferencias.listar(yo());
    }

    @PutMapping("/preferencias")
    public List<PreferenciaResponse> cambiarPreferencias(@RequestBody @Valid List<@Valid PreferenciaRequest> cambios) {
        return preferencias.guardar(yo(), cambios);
    }

    @PostMapping("/dispositivos")
    public ResponseEntity<DispositivoResponse> registrar(@Valid @RequestBody DispositivoRequest request) {
        return ResponseEntity.status(201).body(dispositivos.registrar(yo(), request));
    }

    @DeleteMapping("/dispositivos/{token}")
    public ResponseEntity<Void> darDeBaja(@PathVariable String token) {
        dispositivos.desactivar(yo(), token);
        return ResponseEntity.noContent().build();
    }

    private Long yo() {
        Long id = UsuarioActual.id();
        if (id == null) {
            throw new AccessDeniedException("El token no trae el claim usuarioId");
        }
        return id;
    }
}
```

---

## 63. `EnvioInmediatoListener.java` — Mensajería Kafka

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/messaging/EnvioInmediatoListener.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.messaging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import pe.edu.eduspace.notificaciones.service.EnvioNotificacionService;
import pe.edu.eduspace.notificaciones.service.NotificacionCreadaEvent;

/**
 * Entrega los correos y pushes recién creados, después del commit y fuera de la transacción del consumidor (el SMTP
 * puede tardar). Si falla, el planificador de reintentos la retoma.
 */
@Component
public class EnvioInmediatoListener {

    private static final Logger log = LoggerFactory.getLogger(EnvioInmediatoListener.class);

    private final EnvioNotificacionService envio;

    public EnvioInmediatoListener(EnvioNotificacionService envio) {
        this.envio = envio;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, fallbackExecution = true)
    public void alCrear(NotificacionCreadaEvent evento) {
        try {
            envio.intentar(evento.notificacionId());
        } catch (RuntimeException ex) {
            log.error("component=EnvioInmediatoListener eventType=Envio key={} status=ERROR cause={}", evento.notificacionId(), ex.getMessage());
        }
    }
}
```

---

## 64. `NotificacionEventConsumer.java` — Mensajería Kafka

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/messaging/NotificacionEventConsumer.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Apache Kafka. Escucha mensajes de un topic específico y procesa los eventos de dominio recibidos de otros microservicios.

```java
package pe.edu.eduspace.notificaciones.messaging;

import java.util.List;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import pe.edu.eduspace.notificaciones.event.*;
import pe.edu.eduspace.notificaciones.service.Destino;
import pe.edu.eduspace.notificaciones.service.EventoNotificable;
import pe.edu.eduspace.notificaciones.service.NotificacionOrquestador;
import pe.edu.eduspace.notificaciones.util.Datos;
import tools.jackson.databind.ObjectMapper;

/**
 * Un método de escucha por tópico. Cada uno: registra el evento en el log, decide plantilla y destinatarios, y
 * delega en el orquestador. Un evento mal formado se descarta con log (no bloquea la cola); un fallo de proceso
 * (por ejemplo, la base caída) se propaga para que el manejador de errores lo reintente.
 */
@Component
public class NotificacionEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(NotificacionEventConsumer.class);

    private final NotificacionOrquestador orquestador;
    private final ObjectMapper objectMapper;

    public NotificacionEventConsumer(NotificacionOrquestador orquestador, ObjectMapper objectMapper) {
        this.orquestador = orquestador;
        this.objectMapper = objectMapper;
    }

    // ---------------- matrícula ----------------

    @KafkaListener(topics = Topicos.MATRICULA_CREADA)
    public void matriculaCreada(ConsumerRecord<String, String> r) {
        matricula(r, "MATRICULA_CREADA", Destino.ALUMNO_Y_APODERADOS);
    }

    @KafkaListener(topics = Topicos.MATRICULA_CONFIRMADA)
    public void matriculaConfirmada(ConsumerRecord<String, String> r) {
        matricula(r, "MATRICULA_CONFIRMADA", Destino.ALUMNO_Y_APODERADOS);
    }

    @KafkaListener(topics = Topicos.MATRICULA_ANULADA)
    public void matriculaAnulada(ConsumerRecord<String, String> r) {
        matricula(r, "MATRICULA_ANULADA", Destino.RESPONSABLE_PAGO);
    }

    private void matricula(ConsumerRecord<String, String> r, String plantilla, Destino destino) {
        MatriculaEvent e = leer(r, MatriculaEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.matriculaId()), plantilla, destino, List.of(e.alumnoId()),
                Datos.de("alumno", e.alumnoNombre(), "anio", e.anio() != null ? e.anio() : e.anioId(),
                        "grado", e.gradoNombre(), "seccion", e.seccionNombre(), "motivo", e.motivo()));
    }

    // ---------------- pagos ----------------

    @KafkaListener(topics = Topicos.PAGO_CONFIRMADO)
    public void pagoConfirmado(ConsumerRecord<String, String> r) {
        PagoConfirmadoEvent e = leer(r, PagoConfirmadoEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.pagoId()), "PAGO_CONFIRMADO", Destino.RESPONSABLE_PAGO, List.of(e.alumnoId()),
                Datos.de("monto", Datos.dinero(e.monto()), "concepto", e.concepto()));
    }

    @KafkaListener(topics = Topicos.PAGO_VENCIDO)
    public void pagoVencido(ConsumerRecord<String, String> r) {
        cuota(r, "PAGO_VENCIDO");
    }

    @KafkaListener(topics = Topicos.PAGO_POR_VENCER)
    public void pagoPorVencer(ConsumerRecord<String, String> r) {
        cuota(r, "PAGO_POR_VENCER");
    }

    private void cuota(ConsumerRecord<String, String> r, String plantilla) {
        PagoVencidoEvent e = leer(r, PagoVencidoEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.cuotaId()), plantilla, Destino.RESPONSABLE_PAGO, List.of(e.alumnoId()),
                Datos.de("concepto", e.concepto(), "fecha", Datos.fecha(e.fechaVencimiento()),
                        "monto", Datos.dinero(e.saldo() != null ? e.saldo() : e.monto())));
    }

    // ---------------- asistencia ----------------

    @KafkaListener(topics = Topicos.ASISTENCIA_FALTA)
    public void faltaRegistrada(ConsumerRecord<String, String> r) {
        AsistenciaFaltaRegistradaEvent e = leer(r, AsistenciaFaltaRegistradaEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        Long id = e.asistenciaDetalleId() != null ? e.asistenciaDetalleId() : e.asistenciaId();
        procesar(r, e.eventId(), clave(r, id), "ASISTENCIA_FALTA", Destino.ALUMNO_Y_APODERADOS, List.of(e.alumnoId()),
                Datos.de("fecha", Datos.fecha(e.fecha())));
    }

    // ---------------- tareas ----------------

    @KafkaListener(topics = Topicos.TAREA_PUBLICADA)
    public void tareaPublicada(ConsumerRecord<String, String> r) {
        TareaPublicadaEvent e = leer(r, TareaPublicadaEvent.class);
        if (e == null || requerido(r, "alumnoIds", e.alumnoIds())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.tareaId()), "TAREA_PUBLICADA", Destino.ALUMNO_Y_APODERADOS, e.alumnoIds(),
                Datos.de("curso", e.cursoNombre(), "titulo", e.titulo(), "fecha", Datos.fecha(e.fechaEntrega())));
    }

    @KafkaListener(topics = Topicos.MATERIAL_PUBLICADO)
    public void materialPublicado(ConsumerRecord<String, String> r) {
        MaterialPublicadoEvent e = leer(r, MaterialPublicadoEvent.class);
        if (e == null || requerido(r, "alumnoIds", e.alumnoIds())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.materialId()), "MATERIAL_PUBLICADO", Destino.ALUMNO_Y_APODERADOS, e.alumnoIds(),
                Datos.de("curso", e.cursoNombre(), "titulo", e.titulo()));
    }

    /** tareas-ms lo publica una vez por tarea, con los alumnos que aún no entregaron (vence en menos de 24 h). */
    @KafkaListener(topics = Topicos.TAREA_RECORDATORIO)
    public void tareaRecordatorio(ConsumerRecord<String, String> r) {
        TareaPublicadaEvent e = leer(r, TareaPublicadaEvent.class);
        if (e == null || requerido(r, "alumnoIds", e.alumnoIds())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.tareaId()), "TAREA_RECORDATORIO", Destino.ALUMNO_Y_APODERADOS, e.alumnoIds(),
                Datos.de("curso", e.cursoNombre(), "titulo", e.titulo(), "fecha", Datos.fecha(e.fechaEntrega())));
    }

    @KafkaListener(topics = Topicos.TAREA_CALIFICADA)
    public void tareaCalificada(ConsumerRecord<String, String> r) {
        TareaCalificadaEvent e = leer(r, TareaCalificadaEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        String clave = e.entregaId() != null ? String.valueOf(e.entregaId()) : e.tareaId() + ":" + e.alumnoId();
        procesar(r, e.eventId(), clave, "TAREA_CALIFICADA", Destino.ALUMNO_Y_APODERADOS, List.of(e.alumnoId()),
                Datos.de("titulo", e.titulo(), "nota", Datos.nota(e.nota())));
    }

    // ---------------- exámenes ----------------

    @KafkaListener(topics = Topicos.EXAMEN_PUBLICADO)
    public void examenPublicado(ConsumerRecord<String, String> r) {
        ExamenPublicadoEvent e = leer(r, ExamenPublicadoEvent.class);
        if (e == null || requerido(r, "alumnoIds", e.alumnoIds())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.examenId()), "EXAMEN_PUBLICADO", Destino.ALUMNO_Y_APODERADOS, e.alumnoIds(),
                Datos.de("curso", e.cursoNombre(), "titulo", e.titulo(), "fecha", Datos.fecha(e.fechaInicio())));
    }

    @KafkaListener(topics = Topicos.EXAMEN_CALIFICADO)
    public void examenCalificado(ConsumerRecord<String, String> r) {
        ExamenCalificadoEvent e = leer(r, ExamenCalificadoEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        String clave = e.intentoId() != null ? String.valueOf(e.intentoId()) : e.examenId() + ":" + e.alumnoId();
        procesar(r, e.eventId(), clave, "EXAMEN_CALIFICADO", Destino.ALUMNO_Y_APODERADOS, List.of(e.alumnoId()),
                Datos.de("curso", e.cursoNombre(), "titulo", e.titulo(), "nota", Datos.nota(e.nota())));
    }

    // ---------------- boletín, horario, justificaciones ----------------

    @KafkaListener(topics = Topicos.BOLETIN_GENERADO)
    public void boletinGenerado(ConsumerRecord<String, String> r) {
        BoletinGeneradoEvent e = leer(r, BoletinGeneradoEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.boletinId()), "BOLETIN_GENERADO", Destino.ALUMNO_Y_APODERADOS, List.of(e.alumnoId()),
                Datos.de("periodo", e.periodoNombre()));
    }

    /** Avisa solo a docentes: los {@code docenteUsuarioIds} ya vienen en el evento, sin consultar a alumnos-ms. */
    @KafkaListener(topics = Topicos.HORARIO_PUBLICADO)
    public void horarioPublicado(ConsumerRecord<String, String> r) {
        HorarioPublicadoEvent e = leer(r, HorarioPublicadoEvent.class);
        if (e == null || requerido(r, "docenteUsuarioIds", e.docenteUsuarioIds())) {
            return;
        }
        String clave = e.seccionId() + ":v" + e.versionHorario();
        log.info("component=NotificacionEventConsumer eventType={} key={} status=RECIBIDO", r.topic(), clave);
        orquestador.procesar(new EventoNotificable(e.eventId(), r.topic(), clave, "HORARIO_PUBLICADO",
                Destino.USUARIOS_DIRECTOS, List.of(), e.docenteUsuarioIds(),
                Datos.de("seccion", e.seccionNombre(), "version", e.versionHorario())));
    }

    @KafkaListener(topics = Topicos.JUSTIFICACION_RESUELTA)
    public void justificacionResuelta(ConsumerRecord<String, String> r) {
        JustificacionResueltaEvent e = leer(r, JustificacionResueltaEvent.class);
        if (e == null || requerido(r, "alumnoId", e.alumnoId())) {
            return;
        }
        procesar(r, e.eventId(), clave(r, e.justificacionId()), "JUSTIFICACION_RESUELTA", Destino.APODERADOS,
                List.of(e.alumnoId()), Datos.de("resultado", e.resultado() == null ? null : e.resultado().toLowerCase()));
    }

    // ---------------- comunes ----------------

    private void procesar(ConsumerRecord<String, String> r, java.util.UUID eventId, String clave, String plantilla,
                          Destino destino, List<Long> alumnoIds, java.util.Map<String, String> datos) {
        log.info("component=NotificacionEventConsumer eventType={} key={} status=RECIBIDO", r.topic(), clave);
        orquestador.procesar(new EventoNotificable(eventId, r.topic(), clave, plantilla, destino, alumnoIds, List.of(), datos));
    }

    /** Clave de deduplicación: el id de la entidad del evento; si falta, la clave del mensaje de Kafka. */
    private String clave(ConsumerRecord<String, String> r, Long id) {
        return id != null ? String.valueOf(id) : r.key();
    }

    /** Un evento sin el dato imprescindible se descarta con log en lugar de bloquear la cola. */
    private boolean requerido(ConsumerRecord<String, String> r, String campo, Object valor) {
        boolean falta = valor == null || (valor instanceof List<?> l && l.isEmpty());
        if (falta) {
            log.warn("component=NotificacionEventConsumer eventType={} key={} status=DESCARTADO cause=FALTA_{}", r.topic(), r.key(), campo);
        }
        return falta;
    }

    private <T> T leer(ConsumerRecord<String, String> r, Class<T> tipo) {
        try {
            return objectMapper.readValue(r.value(), tipo);
        } catch (RuntimeException ex) {
            log.warn("component=NotificacionEventConsumer eventType={} key={} status=DESCARTADO cause=EVENTO_MAL_FORMADO {}",
                    r.topic(), r.key(), ex.getClass().getSimpleName());
            return null;
        }
    }
}
```

---

## 65. `AsistenciaFaltaRegistradaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/AsistenciaFaltaRegistradaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AsistenciaFaltaRegistradaEvent(UUID eventId, Long alumnoId, Long asistenciaId, Long asistenciaDetalleId,
                                             Object fecha) {
}
```

---

## 66. `BoletinGeneradoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/BoletinGeneradoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record BoletinGeneradoEvent(UUID eventId, Long alumnoId, Long boletinId, String periodoNombre) {
}
```

---

## 67. `ExamenCalificadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/ExamenCalificadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ExamenCalificadoEvent(UUID eventId, Long alumnoId, Long examenId, Long intentoId, String cursoNombre,
                                    String titulo, BigDecimal nota) {
}
```

---

## 68. `ExamenPublicadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/ExamenPublicadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ExamenPublicadoEvent(UUID eventId, Long examenId, String cursoNombre, String titulo, Object fechaInicio,
                                   List<Long> alumnoIds) {
}
```

---

## 69. `HorarioPublicadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/HorarioPublicadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.UUID;

/** {@code versionHorario} es la versión del horario; {@code version} del sobre es la del contrato y se ignora. */
@JsonIgnoreProperties(ignoreUnknown = true)
public record HorarioPublicadoEvent(UUID eventId, Long seccionId, String seccionNombre, Integer versionHorario,
                                    List<Long> docenteUsuarioIds) {
}
```

---

## 70. `JustificacionResueltaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/JustificacionResueltaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record JustificacionResueltaEvent(UUID eventId, Long alumnoId, Long justificacionId, String resultado) {
}
```

---

## 71. `MaterialPublicadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/MaterialPublicadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MaterialPublicadoEvent(UUID eventId, Long materialId, String cursoNombre, String titulo, List<Long> alumnoIds) {
}
```

---

## 72. `MatriculaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/MatriculaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.UUID;

/** Copia propia del contrato de {@code matricula.creada / .confirmada / .anulada}: solo los campos que este servicio usa. */
@JsonIgnoreProperties(ignoreUnknown = true)
public record MatriculaEvent(UUID eventId, Long alumnoId, String alumnoNombre, Long matriculaId, String anio, Long anioId,
                             String gradoNombre, String seccionNombre, String motivo) {
}
```

---

## 73. `PagoConfirmadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/PagoConfirmadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PagoConfirmadoEvent(UUID eventId, Long alumnoId, Long pagoId, BigDecimal monto, String concepto) {
}
```

---

## 74. `PagoVencidoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/PagoVencidoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;
import java.util.UUID;

/** Sirve para {@code pago.vencido} y {@code pago.por-vencer}. La fecha se lee como objeto: puede llegar como texto o como arreglo. */
@JsonIgnoreProperties(ignoreUnknown = true)
public record PagoVencidoEvent(UUID eventId, Long alumnoId, Long cuotaId, String concepto, BigDecimal monto,
                               BigDecimal saldo, Object fechaVencimiento) {
}
```

---

## 75. `TareaCalificadaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/TareaCalificadaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.math.BigDecimal;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TareaCalificadaEvent(UUID eventId, Long alumnoId, Long tareaId, Long entregaId, String titulo,
                                   BigDecimal nota) {
}
```

---

## 76. `TareaPublicadaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/TareaPublicadaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.notificaciones.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TareaPublicadaEvent(UUID eventId, Long tareaId, String cursoNombre, String titulo, Object fechaEntrega,
                                  List<Long> alumnoIds) {
}
```

---

## 77. `Topicos.java` — Eventos de Dominio

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/event/Topicos.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.event;

/** Tópicos que consume este servicio (catálogo del informe general §3.2 y adenda A5). */
public final class Topicos {

    public static final String MATRICULA_CREADA = "matricula.creada";
    public static final String MATRICULA_CONFIRMADA = "matricula.confirmada";
    public static final String MATRICULA_ANULADA = "matricula.anulada";
    public static final String PAGO_CONFIRMADO = "pago.confirmado";
    public static final String PAGO_VENCIDO = "pago.vencido";
    public static final String PAGO_POR_VENCER = "pago.por-vencer";
    public static final String ASISTENCIA_FALTA = "asistencia.falta-registrada";
    public static final String TAREA_PUBLICADA = "tarea.publicada";
    public static final String TAREA_RECORDATORIO = "tarea.recordatorio";
    public static final String TAREA_CALIFICADA = "tarea.calificada";
    public static final String MATERIAL_PUBLICADO = "material.publicado";
    public static final String EXAMEN_PUBLICADO = "examen.publicado";
    public static final String EXAMEN_CALIFICADO = "examen.calificado";
    public static final String BOLETIN_GENERADO = "boletin.generado";
    public static final String HORARIO_PUBLICADO = "horario.publicado";
    public static final String JUSTIFICACION_RESUELTA = "justificacion.resuelta";

    private Topicos() {
    }
}
```

---

## 78. `ReintentoScheduler.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/scheduler/ReintentoScheduler.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.eduspace.notificaciones.scheduler;

import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pe.edu.eduspace.notificaciones.service.ReintentoService;

/**
 * Tareas periódicas. Con varias réplicas de este servicio, ShedLock (tabla {@code shedlock}) hace que cada ciclo
 * lo ejecute una sola.
 */
@Component
public class ReintentoScheduler {

    private final ReintentoService servicio;

    public ReintentoScheduler(ReintentoService servicio) {
        this.servicio = servicio;
    }

    @Scheduled(fixedDelayString = "${app.reintentos.intervalo:PT1M}", initialDelayString = "${app.reintentos.espera-inicial:PT30S}")
    @SchedulerLock(name = "reintentoScheduler", lockAtMostFor = "PT5M", lockAtLeastFor = "PT10S")
    public void reintentar() {
        servicio.procesarPendientes();
    }

    @Scheduled(cron = "${app.limpieza.cron:0 30 3 * * *}")
    @SchedulerLock(name = "limpiezaEventosProcesados", lockAtMostFor = "PT10M", lockAtLeastFor = "PT1M")
    public void limpiar() {
        servicio.limpiarEventosProcesados();
    }
}
```

---

## 79. `AppProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/AppProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.eduspace.notificaciones.config;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

/** Parámetros de negocio de notificaciones-ms (prefijo {@code app}). */
@ConfigurationProperties(prefix = "app")
public record AppProperties(Reintentos reintentos, Contactos contactos, Limpieza limpieza, Mail mail) {

    public AppProperties {
        reintentos = reintentos == null ? new Reintentos(null, null) : reintentos;
        contactos = contactos == null ? new Contactos(null, null) : contactos;
        limpieza = limpieza == null ? new Limpieza(null) : limpieza;
        mail = mail == null ? new Mail(null) : mail;
    }

    /** Intentos máximos por notificación y tamaño del lote de cada ciclo del planificador. */
    public record Reintentos(Integer maxIntentos, Integer lote) {
        public Reintentos {
            maxIntentos = maxIntentos == null ? 3 : maxIntentos;
            lote = lote == null ? 100 : lote;
        }
    }

    /** Caché local de contactos de alumnos-ms (adenda A6). */
    public record Contactos(Duration cacheTtl, Long cacheMaxSize) {
        public Contactos {
            cacheTtl = cacheTtl == null ? Duration.ofMinutes(5) : cacheTtl;
            cacheMaxSize = cacheMaxSize == null ? 5000L : cacheMaxSize;
        }
    }

    /** Días que se conservan los eventos procesados (adenda A4). */
    public record Limpieza(Integer diasEventosProcesados) {
        public Limpieza {
            diasEventosProcesados = diasEventosProcesados == null ? 30 : diasEventosProcesados;
        }
    }

    public record Mail(String from) {
        public Mail {
            from = from == null || from.isBlank() ? "notificaciones@eduspace.pe" : from;
        }
    }
}
```

---

## 80. `FeignConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/FeignConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.notificaciones.config;

import feign.RequestInterceptor;
import org.slf4j.MDC;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pe.edu.eduspace.notificaciones.client.AlumnosClient;
import pe.edu.eduspace.notificaciones.filter.CorrelationIdFilter;

@Configuration
@EnableFeignClients(basePackageClasses = AlumnosClient.class)
public class FeignConfig {

    /** Propaga {@code X-Trace-ID} en cada llamada a otro servicio. */
    @Bean
    RequestInterceptor traceIdInterceptor(@Value("${eduspace.service-token:}") String serviceToken) {
        return template -> {
            if (serviceToken != null && !serviceToken.isBlank() && template.path().contains("/internal/")) {
                template.header("X-Service-Token", serviceToken);
            }
            String traceId = MDC.get(CorrelationIdFilter.MDC_KEY);
            if (traceId != null) {
                template.header(CorrelationIdFilter.HEADER, traceId);
            }
        };
    }
}
```

---

## 81. `KafkaConsumerConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/KafkaConsumerConfig.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Apache Kafka. Escucha mensajes de un topic específico y procesa los eventos de dominio recibidos de otros microservicios.

```java
package pe.edu.eduspace.notificaciones.config;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Map;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.kafka.autoconfigure.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import pe.edu.eduspace.notificaciones.event.Topicos;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.util.backoff.FixedBackOff;

/**
 * Consumidor con {@code group-id = notificaciones-ms}. El valor llega como texto JSON y cada consumidor lo
 * convierte a su propia copia del contrato (sin cabeceras de tipo). Un fallo de procesamiento se reintenta un
 * número acotado de veces; si persiste, el mensaje se envía a {@code <tópico>.DLT} (dead-letter) para revisarlo
 * y reprocesarlo, y se avanza para no bloquear la partición.
 */
@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    private static final Logger log = LoggerFactory.getLogger(KafkaConsumerConfig.class);

    @Bean
    ConsumerFactory<String, String> eventConsumerFactory(KafkaProperties kafkaProperties) {
        Map<String, Object> props = kafkaProperties.buildConsumerProperties();
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "notificaciones-ms");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        props.put(ErrorHandlingDeserializer.KEY_DESERIALIZER_CLASS, StringDeserializer.class);
        props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, StringDeserializer.class);
        props.putIfAbsent(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        return new DefaultKafkaConsumerFactory<>(props);
    }

    private static final String SUFIJO_DLT = ".DLT";

    @Bean
    KafkaTemplate<String, String> dltKafkaTemplate(KafkaProperties kafkaProperties) {
        Map<String, Object> props = kafkaProperties.buildProducerProperties();
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        return new KafkaTemplate<>(new DefaultKafkaProducerFactory<>(props));
    }

    /** Un {@code .DLT} por cada tópico consumido, para que existan antes del primer fallo. */
    @Bean
    KafkaAdmin.NewTopics deadLetterTopics() {
        NewTopic[] topics = Arrays.stream(Topicos.class.getDeclaredFields())
                .filter(f -> f.getType() == String.class && java.lang.reflect.Modifier.isPublic(f.getModifiers()))
                .map(this::valor)
                .map(t -> new NewTopic(t + SUFIJO_DLT, 1, (short) 1))
                .toArray(NewTopic[]::new);
        return new KafkaAdmin.NewTopics(topics);
    }

    private String valor(Field f) {
        try {
            return (String) f.get(null);
        } catch (IllegalAccessException ex) {
            throw new IllegalStateException(ex);
        }
    }

    @Bean
    ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory(
            ConsumerFactory<String, String> eventConsumerFactory,
            KafkaTemplate<String, String> dltKafkaTemplate,
            @Value("${spring.kafka.listener.auto-startup:true}") boolean autoStartup) {
        var factory = new ConcurrentKafkaListenerContainerFactory<String, String>();
        factory.setAutoStartup(autoStartup);
        factory.setConsumerFactory(eventConsumerFactory);
        // los tópicos los crea cada productor: que falten al arrancar no debe tumbar este servicio
        factory.getContainerProperties().setMissingTopicsFatal(false);
        var recoverer = new DeadLetterPublishingRecoverer(dltKafkaTemplate,
                (record, ex) -> new TopicPartition(record.topic() + SUFIJO_DLT, -1));
        var handler = new DefaultErrorHandler((record, ex) -> {
            log.error("component=NotificacionEventConsumer eventType={} key={} status=DLT tras reintentos cause={}",
                    record.topic(), record.key(), ex.getMessage());
            recoverer.accept(record, ex);
        }, new FixedBackOff(1000L, 2L));
        factory.setCommonErrorHandler(handler);
        return factory;
    }
}
```

---

## 82. `MailConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/MailConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.notificaciones.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/** Habilita las propiedades de la aplicación; el servidor SMTP lo configura {@code spring.mail.*} (Mailpit en DEV). */
@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class MailConfig {
}
```

---

## 83. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.notificaciones.config;

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
    OpenAPI notificacionesOpenApi() {
        return new OpenAPI()
                .info(new Info().title("EduSpace · notificaciones-ms").version("v1")
                        .description("Bandeja de notificaciones, plantillas, preferencias, dispositivos push y envíos"))
                .components(new Components().addSecuritySchemes("bearer",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearer"));
    }
}
```

---

## 84. `SchedulingConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/SchedulingConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.notificaciones.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class SchedulingConfig {
}
```

---

## 85. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.notificaciones.config;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

/**
 * Resource server (JWT RS256 de auth-ms). La bandeja, las preferencias y los dispositivos los puede usar
 * cualquier usuario autenticado sobre sus propios datos; plantillas y envío manual son solo ADMIN.
 */
@Configuration
public class SecurityConfig {

    @Value("${app.security.swagger-public:true}")
    private boolean swaggerPublic;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/actuator/health/**", "/actuator/info", "/actuator/prometheus").permitAll();
                    if (swaggerPublic) {
                        auth.requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll();
                    }
                    auth.requestMatchers("/internal/**").permitAll();   // protegido por ServiceTokenFilter (X-Service-Token)
                    auth.requestMatchers("/api/v1/notificaciones/plantillas/**", "/api/v1/notificaciones/enviar", "/api/v1/notificaciones/admin/**").hasRole("ADMIN");
                    auth.anyRequest().authenticated();
                })
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2ResourceServer(o -> o.jwt(j -> j.jwtAuthenticationConverter(jwtAuthenticationConverter())));
        return http.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new RealmRolesConverter());
        return converter;
    }

    /** Convierte {@code realm_access.roles} en autoridades con prefijo {@code ROLE_}. */
    static class RealmRolesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
        @Override
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            Object realm = jwt.getClaim("realm_access");
            if (realm instanceof Map<?, ?> map && map.get("roles") instanceof Collection<?> roles) {
                return roles.stream().map(r -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + r)).toList();
            }
            return List.of();
        }
    }
}
```

---

## 86. `ShedLockConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/config/ShedLockConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.notificaciones.config;

import javax.sql.DataSource;
import net.javacrumbs.shedlock.core.LockProvider;
import net.javacrumbs.shedlock.provider.jdbctemplate.JdbcTemplateLockProvider;
import net.javacrumbs.shedlock.spring.annotation.EnableSchedulerLock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

/** Las tareas programadas corren en una sola réplica a la vez (tabla {@code shedlock}, migración V2). */
@Configuration
@EnableSchedulerLock(defaultLockAtMostFor = "PT10M")
public class ShedLockConfig {

    @Bean
    LockProvider lockProvider(DataSource dataSource) {
        return new JdbcTemplateLockProvider(JdbcTemplateLockProvider.Configuration.builder()
                .withJdbcTemplate(new JdbcTemplate(dataSource)).usingDbTime().build());
    }
}
```

---

## 87. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.notificaciones.exception;

/** Violación de una regla de negocio: se traduce a HTTP 409. */
public class BusinessRuleException extends RuntimeException {
    public BusinessRuleException(String message) {
        super(message);
    }
}
```

---

## 88. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.eduspace.notificaciones.exception;

import java.time.OffsetDateTime;
import java.util.List;

public record ErrorResponse(String codigo, String mensaje, String ruta, String traceId,
                            OffsetDateTime fecha, List<String> detalles) {
}
```

---

## 89. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.notificaciones.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.time.OffsetDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.FieldError;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> notFound(ResourceNotFoundException ex, HttpServletRequest req) {
        return build(HttpStatus.NOT_FOUND, "NO_ENCONTRADO", ex.getMessage(), req, List.of());
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ErrorResponse> rule(BusinessRuleException ex, HttpServletRequest req) {
        return build(HttpStatus.CONFLICT, "REGLA_DE_NEGOCIO", ex.getMessage(), req, List.of());
    }

    /** Validación de un parámetro completo (por ejemplo, una lista de objetos con @Valid). */
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse> parameterValidation(HandlerMethodValidationException ex, HttpServletRequest req) {
        List<String> detalles = ex.getParameterValidationResults().stream()
                .flatMap(r -> r.getResolvableErrors().stream())
                .map(e -> e instanceof FieldError fe ? fe.getField() + ": " + fe.getDefaultMessage() : e.getDefaultMessage())
                .toList();
        return build(HttpStatus.BAD_REQUEST, "VALIDACION", "Datos de entrada inválidos", req, detalles);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        List<String> detalles = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage()).toList();
        return build(HttpStatus.BAD_REQUEST, "VALIDACION", "Datos de entrada inválidos", req, detalles);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class,
            MissingServletRequestParameterException.class, IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> badRequest(Exception ex, HttpServletRequest req) {
        return build(HttpStatus.BAD_REQUEST, "PETICION_INVALIDA", "La petición no es válida", req, List.of());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> integrity(DataIntegrityViolationException ex, HttpServletRequest req) {
        log.warn("component=exception eventType=DataIntegrity key={} status=CONFLICT cause={}",
                req.getRequestURI(), ex.getMostSpecificCause().getMessage());
        return build(HttpStatus.CONFLICT, "DUPLICADO_O_REFERENCIADO",
                "La operación viola una restricción de unicidad o referencia de datos", req, List.of());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> denied(AccessDeniedException ex, HttpServletRequest req) {
        return build(HttpStatus.FORBIDDEN, "SIN_PERMISO", "No tiene permiso para esta operación", req, List.of());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> other(Exception ex, HttpServletRequest req) {
        // los errores HTTP propios de Spring MVC (ruta inexistente, método o tipo no soportado) conservan su estado
        if (ex instanceof org.springframework.web.ErrorResponse er && er.getStatusCode().is4xxClientError()) {
            HttpStatus status = HttpStatus.valueOf(er.getStatusCode().value());
            String codigo = switch (status) {
                case NOT_FOUND -> "NO_ENCONTRADO";
                case METHOD_NOT_ALLOWED -> "METODO_NO_PERMITIDO";
                case UNSUPPORTED_MEDIA_TYPE -> "TIPO_NO_SOPORTADO";
                default -> "PETICION_INVALIDA";
            };
            return build(status, codigo, status.getReasonPhrase(), req, List.of());
        }
        log.error("component=exception eventType=Unexpected key={} status=ERROR", req.getRequestURI(), ex);
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "ERROR_INTERNO", "Error interno del servidor", req, List.of());
    }

    private ResponseEntity<ErrorResponse> build(HttpStatus status, String codigo, String mensaje,
                                                HttpServletRequest req, List<String> detalles) {
        return ResponseEntity.status(status).body(new ErrorResponse(codigo, mensaje, req.getRequestURI(),
                MDC.get("traceId"), OffsetDateTime.now(), detalles));
    }
}
```

---

## 90. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.notificaciones.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException of(String recurso, Object id) {
        return new ResourceNotFoundException(recurso + " con id " + id + " no existe");
    }
}
```

---

## 91. `AlumnosClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/AlumnosClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.eduspace.notificaciones.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Cliente de alumnos-ms (resuelto por Eureka). Si {@code app.clients.alumnos.url} tiene valor, se llama directo a esa
 * URL (pruebas y desarrollo sin Eureka).
 */
@FeignClient(name = "alumnos-ms", url = "${app.clients.alumnos.url:}")
public interface AlumnosClient {

    @GetMapping("/internal/alumnos/{id}/contactos")
    ContactosDto contactos(@PathVariable("id") Long alumnoId);
}
```

---

## 92. `AlumnosGateway.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/AlumnosGateway.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.client;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Envuelve la llamada Feign con el circuit breaker {@code alumnosClient}. Es un bean distinto de quien lo invoca
 * ({@code ContactosAlumnoService}): la anotación solo actúa cuando la llamada cruza el proxy, no si se llama a un
 * método de la misma clase. El fallback devuelve "contactos no disponibles" para que el consumidor deje la
 * notificación PENDIENTE y se reintente en lugar de perderla.
 */
@Component
public class AlumnosGateway {

    private static final Logger log = LoggerFactory.getLogger(AlumnosGateway.class);

    private final AlumnosClient client;

    public AlumnosGateway(AlumnosClient client) {
        this.client = client;
    }

    @CircuitBreaker(name = "alumnosClient", fallbackMethod = "noDisponible")
    public ContactosResultado contactos(Long alumnoId) {
        try {
            return ContactosResultado.disponible(client.contactos(alumnoId));
        } catch (FeignException.NotFound ex) {
            // un 404 es una respuesta válida ("no existe"), no una falla del servicio: no abre el circuito
            return ContactosResultado.noExiste();
        }
    }

    ContactosResultado noDisponible(Long alumnoId, Throwable causa) {
        log.warn("component=AlumnosGateway eventType=Contactos key={} status=NO_DISPONIBLE cause={}", alumnoId,
                causa.getClass().getSimpleName());
        return ContactosResultado.noDisponible();
    }
}
```

---

## 93. `ContactosDto.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/ContactosDto.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `ContactosDto`.

```java
package pe.edu.eduspace.notificaciones.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

/**
 * Copia local del contrato {@code GET /internal/alumnos/{id}/contactos} de alumnos-ms. Es propiedad de este
 * servicio: no se comparte código entre servicios, y los campos que no usamos se ignoran.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record ContactosDto(Long alumnoId, String nombreCompleto, Long usuarioId, List<ApoderadoDto> apoderados) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ApoderadoDto(Long apoderadoId, Long usuarioId, String nombreCompleto, String email, String telefono,
                               Boolean esPrincipal, Boolean esResponsablePago) {
    }

    public List<ApoderadoDto> apoderadosOVacio() {
        return apoderados == null ? List.of() : apoderados;
    }
}
```

---

## 94. `ContactosResultado.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/client/ContactosResultado.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.client;

/** Resultado de pedir los contactos de un alumno: datos, "alumnos-ms no disponible" o "el alumno no existe". */
public record ContactosResultado(Estado estado, ContactosDto datos) {

    public enum Estado { DISPONIBLE, NO_DISPONIBLE, NO_EXISTE }

    public static ContactosResultado disponible(ContactosDto datos) {
        return new ContactosResultado(Estado.DISPONIBLE, datos);
    }

    public static ContactosResultado noDisponible() {
        return new ContactosResultado(Estado.NO_DISPONIBLE, null);
    }

    public static ContactosResultado noExiste() {
        return new ContactosResultado(Estado.NO_EXISTE, null);
    }
}
```

---

## 95. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.eduspace.notificaciones.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorrelationIdFilter extends OncePerRequestFilter {

    public static final String HEADER = "X-Trace-ID";
    public static final String MDC_KEY = "traceId";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String traceId = request.getHeader(HEADER);
        if (traceId == null || traceId.isBlank()) {
            traceId = UUID.randomUUID().toString();
        }
        MDC.put(MDC_KEY, traceId);
        response.setHeader(HEADER, traceId);
        try {
            chain.doFilter(request, response);
        } finally {
            MDC.remove(MDC_KEY);
        }
    }
}
```

---

## 96. `Datos.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/util/Datos.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Armado de los datos que rellenan los marcadores de las plantillas. */
public final class Datos {

    private static final DateTimeFormatter FECHA = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private Datos() {
    }

    /** Pares clave/valor alternados; los valores nulos o vacíos se omiten (la plantilla pondrá un texto neutro). */
    public static Map<String, String> de(Object... pares) {
        Map<String, String> datos = new LinkedHashMap<>();
        for (int i = 0; i + 1 < pares.length; i += 2) {
            Object valor = pares[i + 1];
            if (valor != null && !String.valueOf(valor).isBlank()) {
                datos.put(String.valueOf(pares[i]), String.valueOf(valor));
            }
        }
        return datos;
    }

    /** Dinero con dos decimales: 150 → "150.00". */
    public static String dinero(BigDecimal monto) {
        return monto == null ? null : monto.setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    /** Nota sin ceros sobrantes: 17.50 → "17.5"; 18.00 → "18". */
    public static String nota(BigDecimal nota) {
        return nota == null ? null : nota.stripTrailingZeros().toPlainString();
    }

    /**
     * Fecha legible dd/MM/yyyy. Acepta texto ISO (con o sin hora) y el arreglo {@code [aaaa, mm, dd, ...]} que
     * producen algunos serializadores.
     */
    public static String fecha(Object valor) {
        if (valor == null) {
            return null;
        }
        try {
            if (valor instanceof List<?> partes && partes.size() >= 3) {
                return LocalDate.of(((Number) partes.get(0)).intValue(), ((Number) partes.get(1)).intValue(),
                        ((Number) partes.get(2)).intValue()).format(FECHA);
            }
            String texto = String.valueOf(valor);
            return texto.length() >= 10 ? LocalDate.parse(texto.substring(0, 10)).format(FECHA) : texto;
        } catch (RuntimeException ex) {
            return String.valueOf(valor);
        }
    }
}
```

---

## 97. `Respuestas.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/util/Respuestas.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.util;

import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public final class Respuestas {

    private Respuestas() {
    }

    /** 201 con cabecera {@code Location} apuntando a {@code <ruta actual>/{id}}. */
    public static <T> ResponseEntity<T> creado(Long id, T cuerpo) {
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(id).toUri()).body(cuerpo);
    }
}
```

---

## 98. `ServiceTokenFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/filter/ServiceTokenFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.eduspace.notificaciones.filter;

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

## 99. `UsuarioActual.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/util/UsuarioActual.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `notificaciones-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.notificaciones.util;

import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

/** Datos del usuario autenticado: claim {@code usuarioId} del token y sus roles. */
public final class UsuarioActual {

    private UsuarioActual() {
    }

    public static Long id() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Jwt jwt) {
            Object claim = jwt.getClaim("usuarioId");
            if (claim instanceof Number n) {
                return n.longValue();
            }
            if (claim instanceof String s && !s.isBlank()) {
                return Long.valueOf(s);
            }
        }
        return null;
    }

    /** Roles sin el prefijo {@code ROLE_}. */
    public static Set<String> roles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return Set.of();
        }
        return auth.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .filter(a -> a.startsWith("ROLE_")).map(a -> a.substring(5)).collect(Collectors.toSet());
    }

    public static boolean tieneAlgunRol(String... roles) {
        Set<String> mios = roles();
        for (String rol : roles) {
            if (mios.contains(rol)) {
                return true;
            }
        }
        return false;
    }
}
```

---

## 100. `NotificacionesMsApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/NotificacionesMsApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.eduspace.notificaciones;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotificacionesMsApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotificacionesMsApplication.class, args);
    }
}
```

---

## 101. `NotificacionMapper.java` — Mappers

**Ruta del archivo:** `services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones/mapper/NotificacionMapper.java`

### **¿Qué hace esta clase?**
Clase de mapeo (Mapper) que convierte entre entidades JPA y DTOs de solicitud/respuesta.

```java
package pe.edu.eduspace.notificaciones.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pe.edu.eduspace.notificaciones.dto.DispositivoResponse;
import pe.edu.eduspace.notificaciones.dto.PlantillaResponse;
import pe.edu.eduspace.notificaciones.dto.PreferenciaResponse;
import pe.edu.eduspace.notificaciones.entity.DispositivoPush;
import pe.edu.eduspace.notificaciones.entity.PlantillaNotificacion;
import pe.edu.eduspace.notificaciones.entity.PreferenciaNotificacion;

/** Conversiones entidad → DTO. La bandeja arma su respuesta aparte porque parsea el JSON de datos. */
@Mapper
public interface NotificacionMapper {

    PlantillaResponse toResponse(PlantillaNotificacion plantilla);

    PreferenciaResponse toResponse(PreferenciaNotificacion preferencia);

    DispositivoResponse toResponse(DispositivoPush dispositivo);
}
```

---

