# 📘 CÓDIGO COMPLETO — `tareas-ms`

> **Microservicio:** `tareas-ms`  
> **Puerto:** `8098`  
> **Base de datos:** `eduspace_tareas`  
> **Propósito:** Gestión de tareas y actividades académicas. Permite a los docentes crear, publicar y calificar tareas/trabajos asignados a secciones. Los alumnos pueden ver las tareas pendientes y entregar sus trabajos. Emite eventos `tarea.calificada` a Kafka para que calificaciones-ms registre las notas automáticamente.  
> **Total de clases incluidas:** 58 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `Entrega.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/Entrega.java`
- 2. `EntregaArchivo.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/EntregaArchivo.java`
- 3. `EventoProcesado.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/EventoProcesado.java`
- 4. `Material.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/Material.java`
- 5. `MatriculaLocal.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/MatriculaLocal.java`
- 6. `Tarea.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/Tarea.java`
- 7. `TareaAdjunto.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/TareaAdjunto.java`

### Repositorios Spring Data JPA

- 8. `EntregaArchivoRepository.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/EntregaArchivoRepository.java`
- 9. `EntregaRepository.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/EntregaRepository.java`
- 10. `EventoProcesadoRepository.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/EventoProcesadoRepository.java`
- 11. `MaterialRepository.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/MaterialRepository.java`
- 12. `MatriculaLocalRepository.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/MatriculaLocalRepository.java`
- 13. `TareaAdjuntoRepository.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/TareaAdjuntoRepository.java`
- 14. `TareaRepository.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/TareaRepository.java`

### DTOs (Data Transfer Objects)

- 15. `Dtos.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/dto/Dtos.java`
- 16. `PageResponse.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/dto/PageResponse.java`

### Servicios y Lógica de Negocio

- 17. `ArchivoService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/ArchivoService.java`
- 18. `CalificacionService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/CalificacionService.java`
- 19. `EntregaService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/EntregaService.java`
- 20. `MaterialService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/MaterialService.java`
- 21. `MatriculaLocalService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/MatriculaLocalService.java`
- 22. `PendientesService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/PendientesService.java`
- 23. `TareaService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/TareaService.java`

### Controladores REST API

- 24. `MaterialController.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/controller/MaterialController.java`
- 25. `TareaController.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/controller/TareaController.java`

### Mensajería Kafka

- 26. `MatriculaEventConsumer.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/messaging/MatriculaEventConsumer.java`
- 27. `TareaEventProducer.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/messaging/TareaEventProducer.java`

### Eventos de Dominio

- 28. `EventoSobre.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/EventoSobre.java`
- 29. `MaterialPublicadoEvent.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/MaterialPublicadoEvent.java`
- 30. `MatriculaEvent.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/MatriculaEvent.java`
- 31. `TareaCalificadaEvent.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/TareaCalificadaEvent.java`
- 32. `TareaEntregadaEvent.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/TareaEntregadaEvent.java`
- 33. `TareaPublicadaEvent.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/TareaPublicadaEvent.java`

### Tareas Programadas (Schedulers)

- 34. `CierreAutomaticoJob.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/scheduler/CierreAutomaticoJob.java`
- 35. `LimpiezaJob.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/scheduler/LimpiezaJob.java`
- 36. `RecordatorioJob.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/scheduler/RecordatorioJob.java`

### Configuración Spring Boot

- 37. `CacheConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/CacheConfig.java`
- 38. `FeignConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/FeignConfig.java`
- 39. `KafkaConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/KafkaConfig.java`
- 40. `KafkaErrorHandlingConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/KafkaErrorHandlingConfig.java`
- 41. `MinioConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/MinioConfig.java`
- 42. `OpenApiConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/OpenApiConfig.java`
- 43. `SecurityConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/SecurityConfig.java`
- 44. `ShedLockConfig.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/ShedLockConfig.java`
- 45. `TareasProperties.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/TareasProperties.java`

### Manejo de Excepciones

- 46. `BusinessRuleException.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/BusinessRuleException.java`
- 47. `ErrorResponse.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/ErrorResponse.java`
- 48. `GlobalExceptionHandler.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/GlobalExceptionHandler.java`
- 49. `ResourceNotFoundException.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/ResourceNotFoundException.java`
- 50. `ServicioNoDisponibleException.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/ServicioNoDisponibleException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 51. `AlumnosClient.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/AlumnosClient.java`
- 52. `AlumnosGateway.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/AlumnosGateway.java`
- 53. `CorrelationIdFilter.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/filter/CorrelationIdFilter.java`
- 54. `IdentidadService.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/security/IdentidadService.java`
- 55. `MatriculaClient.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/MatriculaClient.java`
- 56. `PlanificacionClient.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/PlanificacionClient.java`
- 57. `PlanificacionGateway.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/PlanificacionGateway.java`

### Clase Principal de Arranque

- 58. `TareasApplication.java` — `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/TareasApplication.java`

---

## 1. `Entrega.java` — Entidades JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/Entrega.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `tareas-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.tareas.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "entregas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tarea_id", nullable = false)
    private Long tareaId;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(length = 1000)
    private String comentario;

    @Builder.Default
    @Column(name = "entregada_en", nullable = false)
    private LocalDateTime entregadaEn = LocalDateTime.now();

    @Builder.Default
    @Column(name = "es_tardia", nullable = false)
    private Boolean esTardia = false;

    @Builder.Default
    @Column(nullable = false)
    private Short version = 1;

    @Builder.Default
    @Column(nullable = false, length = 10)
    private String estado = "ENTREGADA";

    @Column(precision = 5, scale = 2)
    private BigDecimal nota;

    @Column(columnDefinition = "TEXT")
    private String retroalimentacion;

    @Column(name = "calificada_en")
    private LocalDateTime calificadaEn;

    @Column(name = "calificada_por")
    private Long calificadaPor;
}
```

---

## 2. `EntregaArchivo.java` — Entidades JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/EntregaArchivo.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `tareas-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.tareas.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "entrega_archivos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntregaArchivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entrega_id", nullable = false)
    private Long entregaId;

    @Column(name = "nombre_archivo", nullable = false, length = 200)
    private String nombreArchivo;

    @Column(name = "ruta_storage", nullable = false, length = 400)
    private String rutaStorage;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "tamano_bytes")
    private Long tamanoBytes;

    @Builder.Default
    @Column(name = "subido_en", nullable = false)
    private LocalDateTime subidoEn = LocalDateTime.now();
}
```

---

## 3. `EventoProcesado.java` — Entidades JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/EventoProcesado.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.entity;

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

## 4. `Material.java` — Entidades JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/Material.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `tareas-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.tareas.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/** Material de un curso para una sección: un archivo (en MinIO) o un enlace. */
@Entity
@Table(name = "materiales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(name = "seccion_id", nullable = false)
    private Long seccionId;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "docente_id", nullable = false)
    private Long docenteId;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(length = 1000)
    private String descripcion;

    @Column(nullable = false, length = 8)
    private String tipo;

    @Column(length = 500)
    private String enlace;

    @Column(name = "nombre_archivo", length = 200)
    private String nombreArchivo;

    @Column(name = "ruta_storage", length = 400)
    private String rutaStorage;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "tamano_bytes")
    private Long tamanoBytes;

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
}
```

---

## 5. `MatriculaLocal.java` — Entidades JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/MatriculaLocal.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `tareas-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.tareas.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/** Réplica local de la matrícula, mantenida por eventos matricula.*. */
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

    @Column(nullable = false, length = 15)
    private String estado;

    @Builder.Default
    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();
}
```

---

## 6. `Tarea.java` — Entidades JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/Tarea.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `tareas-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.tareas.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tareas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarea {

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

    @Column(name = "docente_id", nullable = false)
    private Long docenteId;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "publicada_en")
    private LocalDateTime publicadaEn;

    @Column(name = "fecha_entrega", nullable = false)
    private LocalDateTime fechaEntrega;

    @Builder.Default
    @Column(name = "permite_tardia", nullable = false)
    private Boolean permiteTardia = false;

    @Builder.Default
    @Column(name = "puntaje_maximo", nullable = false, precision = 5, scale = 2)
    private BigDecimal puntajeMaximo = new BigDecimal("20");

    @Builder.Default
    @Column(nullable = false, length = 10)
    private String estado = "BORRADOR";

    @Builder.Default
    @Column(name = "creada_en", nullable = false)
    private LocalDateTime creadaEn = LocalDateTime.now();

    @Builder.Default
    @Column(name = "actualizada_en", nullable = false)
    private LocalDateTime actualizadaEn = LocalDateTime.now();

    @Builder.Default
    @Column(name = "recordatorio_enviado", nullable = false)
    private Boolean recordatorioEnviado = false;
}
```

---

## 7. `TareaAdjunto.java` — Entidades JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/entity/TareaAdjunto.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `tareas-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.tareas.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tarea_adjuntos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TareaAdjunto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tarea_id", nullable = false)
    private Long tareaId;

    @Column(name = "nombre_archivo", nullable = false, length = 200)
    private String nombreArchivo;

    @Column(name = "ruta_storage", nullable = false, length = 400)
    private String rutaStorage;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "tamano_bytes")
    private Long tamanoBytes;
}
```

---

## 8. `EntregaArchivoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/EntregaArchivoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EntregaArchivo`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import pe.edu.upeu.eduspace.tareas.entity.EntregaArchivo;

import java.util.List;

public interface EntregaArchivoRepository extends JpaRepository<EntregaArchivo, Long> {

    List<EntregaArchivo> findByEntregaIdOrderByIdAsc(Long entregaId);

    @Modifying
    void deleteByEntregaId(Long entregaId);
}
```

---

## 9. `EntregaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/EntregaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Entrega`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.tareas.entity.Entrega;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface EntregaRepository extends JpaRepository<Entrega, Long> {

    Optional<Entrega> findByTareaIdAndMatriculaId(Long tareaId, Long matriculaId);

    List<Entrega> findByTareaIdOrderByEntregadaEnAsc(Long tareaId);

    List<Entrega> findByAlumnoIdIn(Collection<Long> alumnoIds);

    long countByTareaId(Long tareaId);

    long countByTareaIdAndEstado(Long tareaId, String estado);

    @Query("SELECT e FROM Entrega e WHERE e.tareaId = :tareaId AND e.estado = 'ENTREGADA'")
    List<Entrega> sinCalificar(@Param("tareaId") Long tareaId);
}
```

---

## 10. `EventoProcesadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/EventoProcesadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EventoProcesado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.tareas.entity.EventoProcesado;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface EventoProcesadoRepository extends JpaRepository<EventoProcesado, UUID> {

    boolean existsByEventId(UUID eventId);

    long deleteByProcesadoEnBefore(LocalDateTime fechaLimite);
}
```

---

## 11. `MaterialRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/MaterialRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Material`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.tareas.entity.Material;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    List<Material> findBySeccionIdAndCursoIdOrderByCreadoEnDescIdDesc(Long seccionId, Long cursoId);
}
```

---

## 12. `MatriculaLocalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/MatriculaLocalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `MatriculaLocal`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.tareas.entity.MatriculaLocal;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface MatriculaLocalRepository extends JpaRepository<MatriculaLocal, Long> {

    List<MatriculaLocal> findBySeccionIdAndEstadoOrderByAlumnoNombre(Long seccionId, String estado);

    List<MatriculaLocal> findBySeccionId(Long seccionId);

    Optional<MatriculaLocal> findFirstByAlumnoIdAndEstadoOrderByAnioIdDesc(Long alumnoId, String estado);

    List<MatriculaLocal> findByAlumnoIdIn(Collection<Long> alumnoIds);
}
```

---

## 13. `TareaAdjuntoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/TareaAdjuntoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `TareaAdjunto`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.tareas.entity.TareaAdjunto;

import java.util.List;

public interface TareaAdjuntoRepository extends JpaRepository<TareaAdjunto, Long> {

    List<TareaAdjunto> findByTareaIdOrderByIdAsc(Long tareaId);
}
```

---

## 14. `TareaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/repository/TareaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Tarea`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.tareas.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

    @Query("""
        SELECT t FROM Tarea t
        WHERE (:seccionId IS NULL OR t.seccionId = :seccionId)
          AND (:cursoId IS NULL OR t.cursoId = :cursoId)
          AND (:periodoId IS NULL OR t.periodoId = :periodoId)
          AND (:docenteId IS NULL OR t.docenteId = :docenteId)
          AND (:estado IS NULL OR t.estado = :estado)
        """)
    Page<Tarea> buscar(@Param("seccionId") Long seccionId, @Param("cursoId") Long cursoId, @Param("periodoId") Long periodoId,
                       @Param("docenteId") Long docenteId, @Param("estado") String estado, Pageable pageable);

    List<Tarea> findBySeccionIdInAndEstadoOrderByFechaEntregaAsc(Collection<Long> seccionIds, String estado);

    List<Tarea> findBySeccionIdInAndEstadoInOrderByFechaEntregaDesc(Collection<Long> seccionIds, Collection<String> estados);

    /** Publicadas que vencen dentro de la ventana y aún sin recordatorio. */
    @Query("SELECT t FROM Tarea t WHERE t.estado = 'PUBLICADA' AND t.recordatorioEnviado = false "
         + "AND t.fechaEntrega > :ahora AND t.fechaEntrega <= :limite")
    List<Tarea> porVencer(@Param("ahora") LocalDateTime ahora, @Param("limite") LocalDateTime limite);

    /** Vencidas que no admiten entrega tardía: se cierran solas. */
    @Query("SELECT t FROM Tarea t WHERE t.estado = 'PUBLICADA' AND t.permiteTardia = false AND t.fechaEntrega < :ahora")
    List<Tarea> vencidasSinTardia(@Param("ahora") LocalDateTime ahora);
}
```

---

## 15. `Dtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/dto/Dtos.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `Dtos`.

```java
package pe.edu.upeu.eduspace.tareas.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public final class Dtos {

    private Dtos() {}

    public record TareaCreateRequest(
        @NotNull Long periodoId,
        @NotNull Long seccionId,
        @NotNull Long cursoId,
        @NotBlank @Size(max = 200) String titulo,
        String descripcion,
        @NotNull LocalDateTime fechaEntrega,
        Boolean permiteTardia,
        @DecimalMin(value = "0.01", message = "puntajeMaximo debe ser mayor a 0") @DecimalMax(value = "999.99") BigDecimal puntajeMaximo) {}

    public record TareaUpdateRequest(
        @Size(max = 200) String titulo,
        String descripcion,
        LocalDateTime fechaEntrega,
        Boolean permiteTardia,
        @DecimalMin("0.01") BigDecimal puntajeMaximo) {}

    public record AdjuntoResponse(Long id, String nombreArchivo, String contentType, Long tamanoBytes) {}

    public record TareaResponse(Long id, Long anioId, Long periodoId, Long seccionId, Long cursoId, Long docenteId,
                                String titulo, String descripcion, LocalDateTime publicadaEn, LocalDateTime fechaEntrega,
                                Boolean permiteTardia, BigDecimal puntajeMaximo, String estado,
                                List<AdjuntoResponse> adjuntos, Integer entregadas, Integer calificadas, Integer pendientes) {}

    public record ArchivoUrlRequest(
        @NotBlank String nombreArchivo,
        @NotBlank String contentType,
        @NotNull @Positive Long tamanoBytes) {}

    public record ArchivoUrlResponse(String uploadUrl, String ruta, int expiraMinutos) {}

    public record ArchivoRef(
        @NotBlank @Size(max = 200) String nombreArchivo,
        @NotBlank @Size(max = 400) String ruta,
        @NotBlank String contentType,
        @NotNull @Positive Long tamanoBytes) {}

    public record EntregaRequest(@Size(max = 1000) String comentario, @Valid List<ArchivoRef> archivos) {}

    public record ArchivoResponse(Long id, String nombreArchivo, String contentType, Long tamanoBytes) {}

    public record EntregaResponse(Long id, Long tareaId, Long matriculaId, Long alumnoId, String alumnoNombre, String comentario,
                                  LocalDateTime entregadaEn, Boolean esTardia, Short version, String estado, BigDecimal nota,
                                  String retroalimentacion, LocalDateTime calificadaEn, List<ArchivoResponse> archivos) {}

    public record CalificarRequest(
        @NotNull(message = "La nota es obligatoria") @DecimalMin(value = "0", message = "La nota no puede ser negativa") BigDecimal nota,
        @Size(max = 4000) String retroalimentacion) {}

    public record DevolverRequest(@NotBlank(message = "Indique qué debe corregir el alumno") @Size(max = 4000) String retroalimentacion) {}

    public record NotaItem(@NotNull Long entregaId, @NotNull @DecimalMin("0") BigDecimal nota, @Size(max = 4000) String retroalimentacion) {}

    public record CalificacionMasivaRequest(@NotEmpty @Valid List<NotaItem> notas) {}

    public record CalificacionMasivaResultado(int calificadas, List<String> errores) {}

    /** Estado de cada alumno de la sección para la tarea (incluye los que no entregaron). */
    public record EntregaAlumno(Long matriculaId, Long alumnoId, String alumnoNombre, String estado, EntregaResponse entrega) {}

    public record TareaPendienteResponse(Long tareaId, String titulo, Long cursoId, LocalDateTime fechaEntrega, Boolean vencida,
                                         Boolean permiteTardia, Long alumnoId, String alumnoNombre, String estadoEntrega) {}

    public record DescargaResponse(String urlDescarga, String nombreArchivo) {}

    // ---------------------------------------------------------------- materiales del curso

    public record MaterialArchivoUrlRequest(
        @NotNull Long seccionId, @NotNull Long cursoId,
        @NotBlank String nombreArchivo, @NotBlank String contentType, @NotNull @Positive Long tamanoBytes) {}

    /** tipo ARCHIVO: lleva {@code archivo} (ya subido con la URL firmada); tipo ENLACE: lleva {@code enlace}. */
    public record MaterialRequest(
        @NotNull Long seccionId, @NotNull Long cursoId,
        @NotBlank @Size(min = 3, max = 150) String titulo, @Size(max = 1000) String descripcion,
        @NotBlank String tipo, @Size(max = 500) String enlace, @Valid ArchivoRef archivo) {}

    public record MaterialResponse(Long id, Long seccionId, Long cursoId, Long docenteId, String titulo, String descripcion, String tipo,
                                   String enlace, String nombreArchivo, String contentType, Long tamanoBytes, LocalDateTime creadoEn) {}
}
```

---

## 16. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Page`.

```java
package pe.edu.upeu.eduspace.tareas.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public record PageResponse<T>(List<T> contenido, int pagina, int tamano, long totalElementos, int totalPaginas) {

    public static <T> PageResponse<T> from(Page<T> p) {
        return new PageResponse<>(p.getContent(), p.getNumber(), p.getSize(), p.getTotalElements(), p.getTotalPages());
    }
}
```

---

## 17. `ArchivoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/ArchivoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Archivo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.service;

import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.tareas.config.TareasProperties;
import pe.edu.upeu.eduspace.tareas.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.tareas.exception.ServicioNoDisponibleException;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

/** URLs firmadas de MinIO. El tipo y tamaño se validan ANTES de firmar. */
@Slf4j
@Service
@RequiredArgsConstructor
public class ArchivoService {

    private static final int EXPIRA_MIN = 15;

    private final MinioClient minio;
    private final TareasProperties props;

    @Value("${app.minio.bucket-entregas:tareas-entregas}")
    private String bucket;

    public void validar(String contentType, long tamanoBytes) {
        if (!props.getTiposArchivo().contains(contentType)) {
            throw new BusinessRuleException("Tipo de archivo no permitido: " + contentType);
        }
        long maxBytes = props.getArchivoMaxMb() * 1024L * 1024L;
        if (tamanoBytes <= 0 || tamanoBytes > maxBytes) {
            throw new BusinessRuleException("El archivo excede el tamaño máximo de " + props.getArchivoMaxMb() + " MB.");
        }
    }

    public String nuevaRuta(String prefijo, String nombre) {
        return prefijo + UUID.randomUUID() + "-" + sanear(nombre);
    }

    public String urlSubida(String ruta) {
        return firmar(Method.PUT, ruta);
    }

    public String urlDescarga(String ruta) {
        return firmar(Method.GET, ruta);
    }

    /** Borra el archivo del almacenamiento; si falla solo se registra (el registro en la base ya se eliminó). */
    public void eliminar(String ruta) {
        try {
            minio.removeObject(io.minio.RemoveObjectArgs.builder().bucket(bucket).object(ruta).build());
        } catch (Exception e) {
            log.warn("No se pudo borrar {} de MinIO: {}", ruta, e.getMessage());
        }
    }

    public int expiraMinutos() {
        return EXPIRA_MIN;
    }

    private String firmar(Method metodo, String ruta) {
        try {
            return minio.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .method(metodo).bucket(bucket).object(ruta).expiry(EXPIRA_MIN, TimeUnit.MINUTES).build());
        } catch (Exception e) {
            log.error("No se pudo firmar URL de MinIO: {}", e.getMessage());
            throw new ServicioNoDisponibleException("El almacenamiento de archivos no está disponible.");
        }
    }

    static String sanear(String nombre) {
        String base = nombre == null ? "archivo" : nombre.replaceAll(".*[\\\\/]", "");
        base = base.replaceAll("[^A-Za-z0-9._-]", "_");
        return base.length() > 80 ? base.substring(base.length() - 80) : base;
    }
}
```

---

## 18. `CalificacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/CalificacionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Calificacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.config.KafkaConfig;
import pe.edu.upeu.eduspace.tareas.dto.Dtos.*;
import pe.edu.upeu.eduspace.tareas.entity.Entrega;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;
import pe.edu.upeu.eduspace.tareas.event.TareaCalificadaEvent;
import pe.edu.upeu.eduspace.tareas.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.tareas.messaging.TareaEventProducer;
import pe.edu.upeu.eduspace.tareas.repository.EntregaRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalificacionService {

    private static final BigDecimal ESCALA = new BigDecimal("20");

    private final EntregaService entregaService;
    private final TareaService tareaService;
    private final EntregaRepository entregaRepo;
    private final TareaEventProducer producer;

    /** Califica (o recalifica). Publica tarea.calificada con la nota convertida a escala 0–20. */
    @Transactional
    public EntregaResponse calificar(Long entregaId, CalificarRequest req, Long usuarioId, boolean esAdmin) {
        Entrega e = entregaService.obtener(entregaId);
        Tarea t = tareaService.obtener(e.getTareaId());
        tareaService.exigirDueno(t, usuarioId, esAdmin);
        validarNota(req.nota(), t);
        aplicar(e, t, req.nota(), req.retroalimentacion(), usuarioId);
        return entregaService.obtenerEntrega(entregaId);
    }

    @Transactional
    public CalificacionMasivaResultado calificarMasivo(Long tareaId, CalificacionMasivaRequest req, Long usuarioId, boolean esAdmin) {
        Tarea t = tareaService.obtener(tareaId);
        tareaService.exigirDueno(t, usuarioId, esAdmin);
        int ok = 0;
        List<String> errores = new ArrayList<>();
        for (NotaItem it : req.notas()) {
            try {
                Entrega e = entregaService.obtener(it.entregaId());
                if (!e.getTareaId().equals(tareaId)) throw new BusinessRuleException("la entrega no pertenece a esta tarea");
                validarNota(it.nota(), t);
                aplicar(e, t, it.nota(), it.retroalimentacion(), usuarioId);
                ok++;
            } catch (Exception ex) {
                errores.add("Entrega " + it.entregaId() + ": " + ex.getMessage());
            }
        }
        return new CalificacionMasivaResultado(ok, errores);
    }

    /** Devuelve la entrega al alumno para que la corrija y la reenvíe. */
    @Transactional
    public EntregaResponse devolver(Long entregaId, DevolverRequest req, Long usuarioId, boolean esAdmin) {
        Entrega e = entregaService.obtener(entregaId);
        Tarea t = tareaService.obtener(e.getTareaId());
        tareaService.exigirDueno(t, usuarioId, esAdmin);
        if ("CALIFICADA".equals(e.getEstado())) {
            throw new BusinessRuleException("Una entrega CALIFICADA no se puede devolver.");
        }
        if ("CERRADA".equals(t.getEstado())) throw new BusinessRuleException("La tarea está CERRADA.");
        e.setEstado("DEVUELTA");
        e.setRetroalimentacion(req.retroalimentacion());
        entregaRepo.save(e);
        return entregaService.obtenerEntrega(entregaId);
    }

    private void aplicar(Entrega e, Tarea t, BigDecimal nota, String retro, Long usuarioId) {
        if (!"ENTREGADA".equals(e.getEstado()) && !"CALIFICADA".equals(e.getEstado())) {
            throw new BusinessRuleException("Solo se califica una entrega ENTREGADA o ya CALIFICADA (estado " + e.getEstado() + ").");
        }
        e.setNota(nota.setScale(2, RoundingMode.HALF_UP));
        e.setRetroalimentacion(retro);
        e.setEstado("CALIFICADA");
        e.setCalificadaEn(LocalDateTime.now());
        e.setCalificadaPor(usuarioId);
        entregaRepo.save(e);
        producer.publicar(KafkaConfig.TOPIC_TAREA_CALIFICADA, String.valueOf(e.getId()), TareaCalificadaEvent.builder()
            .tareaId(t.getId()).entregaId(e.getId()).alumnoId(e.getAlumnoId()).matriculaId(e.getMatriculaId())
            .seccionId(t.getSeccionId()).cursoId(t.getCursoId()).periodoId(t.getPeriodoId()).titulo(t.getTitulo())
            .nota(aEscala20(e.getNota(), t.getPuntajeMaximo())).puntajeMaximo(t.getPuntajeMaximo()).puntajeObtenido(e.getNota())
            .build());
    }

    private static void validarNota(BigDecimal nota, Tarea t) {
        if (nota.compareTo(t.getPuntajeMaximo()) > 0) {
            throw new BusinessRuleException("La nota (" + nota + ") no puede superar el puntaje máximo (" + t.getPuntajeMaximo() + ").");
        }
    }

    /** nota20 = nota / puntajeMaximo × 20, a 2 decimales. */
    static BigDecimal aEscala20(BigDecimal nota, BigDecimal puntajeMaximo) {
        return nota.multiply(ESCALA).divide(puntajeMaximo, 2, RoundingMode.HALF_UP);
    }
}
```

---

## 19. `EntregaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/EntregaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Entrega`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.config.KafkaConfig;
import pe.edu.upeu.eduspace.tareas.config.TareasProperties;
import pe.edu.upeu.eduspace.tareas.dto.Dtos.*;
import pe.edu.upeu.eduspace.tareas.entity.Entrega;
import pe.edu.upeu.eduspace.tareas.entity.EntregaArchivo;
import pe.edu.upeu.eduspace.tareas.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;
import pe.edu.upeu.eduspace.tareas.event.TareaEntregadaEvent;
import pe.edu.upeu.eduspace.tareas.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.tareas.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.tareas.messaging.TareaEventProducer;
import pe.edu.upeu.eduspace.tareas.repository.EntregaArchivoRepository;
import pe.edu.upeu.eduspace.tareas.repository.EntregaRepository;
import pe.edu.upeu.eduspace.tareas.repository.MatriculaLocalRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class EntregaService {

    private final TareaService tareaService;
    private final EntregaRepository entregaRepo;
    private final EntregaArchivoRepository archivoRepo;
    private final MatriculaLocalRepository matriculaRepo;
    private final MatriculaLocalService matriculaLocalService;
    private final ArchivoService archivos;
    private final TareasProperties props;
    private final TareaEventProducer producer;

    /** URL firmada de subida; la ruta incluye tarea y alumno para poder verificar luego que el archivo es suyo. */
    @Transactional(readOnly = true)
    public ArchivoUrlResponse urlSubida(Long tareaId, ArchivoUrlRequest req, Long alumnoId) {
        Tarea t = tareaService.obtener(tareaId);
        matriculaDelAlumno(t, alumnoId);
        if (!"PUBLICADA".equals(t.getEstado())) throw new BusinessRuleException("La tarea no admite entregas (estado " + t.getEstado() + ").");
        archivos.validar(req.contentType(), req.tamanoBytes());
        String ruta = archivos.nuevaRuta(prefijo(tareaId, alumnoId), req.nombreArchivo());
        return new ArchivoUrlResponse(archivos.urlSubida(ruta), ruta, archivos.expiraMinutos());
    }

    /**
     * Registra o reenvía la entrega. Valida matrícula de la sección, estado de la tarea, plazo (tardía si la tarea
     * lo permite) y que cada archivo declarado esté bajo el prefijo del propio alumno. Reenviar sube la versión
     * mientras no esté CALIFICADA.
     */
    @Transactional
    public EntregaResponse registrar(Long tareaId, EntregaRequest req, Long alumnoId) {
        Tarea t = tareaService.obtener(tareaId);
        MatriculaLocal m = matriculaDelAlumno(t, alumnoId);
        if (!"PUBLICADA".equals(t.getEstado())) {
            throw new BusinessRuleException("La tarea no admite entregas (estado " + t.getEstado() + ").");
        }
        LocalDateTime ahora = LocalDateTime.now();
        boolean tardia = ahora.isAfter(t.getFechaEntrega());
        if (tardia && !Boolean.TRUE.equals(t.getPermiteTardia())) {
            throw new BusinessRuleException("El plazo de entrega venció y la tarea no admite entregas tardías.");
        }
        List<ArchivoRef> refs = req.archivos() == null ? List.of() : req.archivos();
        boolean sinComentario = req.comentario() == null || req.comentario().isBlank();
        if (refs.isEmpty() && sinComentario) {
            throw new BusinessRuleException("La entrega debe incluir al menos un archivo o un comentario.");
        }
        validarArchivos(refs, tareaId, alumnoId);

        Entrega e = entregaRepo.findByTareaIdAndMatriculaId(tareaId, m.getMatriculaId()).orElse(null);
        if (e != null && "CALIFICADA".equals(e.getEstado())) {
            throw new BusinessRuleException("La entrega ya fue calificada; no admite reenvío.");
        }
        if (e == null) {
            e = Entrega.builder().tareaId(tareaId).matriculaId(m.getMatriculaId()).alumnoId(alumnoId).version((short) 1).build();
        } else {
            e.setVersion((short) (e.getVersion() + 1));
            archivoRepo.deleteByEntregaId(e.getId());
        }
        e.setComentario(req.comentario());
        e.setEntregadaEn(ahora);
        e.setEsTardia(tardia);
        e.setEstado("ENTREGADA");
        e = entregaRepo.save(e);
        for (ArchivoRef r : refs) {
            archivoRepo.save(EntregaArchivo.builder().entregaId(e.getId()).nombreArchivo(r.nombreArchivo())
                .rutaStorage(r.ruta()).contentType(r.contentType()).tamanoBytes(r.tamanoBytes()).build());
        }
        producer.publicar(KafkaConfig.TOPIC_TAREA_ENTREGADA, String.valueOf(e.getId()), TareaEntregadaEvent.builder()
            .tareaId(tareaId).entregaId(e.getId()).alumnoId(alumnoId).matriculaId(m.getMatriculaId())
            .seccionId(t.getSeccionId()).version(e.getVersion()).esTardia(e.getEsTardia()).build());
        return toResponse(e, m.getAlumnoNombre());
    }

    /** Docente: todos los alumnos de la sección con el estado de su entrega (incluye los que no entregaron). */
    @Transactional(readOnly = true)
    public List<EntregaAlumno> deLaTarea(Long tareaId, Long usuarioId, boolean esAdmin) {
        Tarea t = tareaService.obtener(tareaId);
        tareaService.exigirDueno(t, usuarioId, esAdmin);
        matriculaLocalService.cargarInicialSiVacia(t.getSeccionId());
        var porMatricula = new java.util.HashMap<Long, Entrega>();
        entregaRepo.findByTareaIdOrderByEntregadaEnAsc(tareaId).forEach(x -> porMatricula.put(x.getMatriculaId(), x));
        List<EntregaAlumno> res = new ArrayList<>();
        for (MatriculaLocal m : matriculaRepo.findBySeccionIdAndEstadoOrderByAlumnoNombre(t.getSeccionId(), "MATRICULADO")) {
            Entrega e = porMatricula.get(m.getMatriculaId());
            res.add(new EntregaAlumno(m.getMatriculaId(), m.getAlumnoId(), m.getAlumnoNombre(),
                e == null ? "SIN_ENTREGAR" : e.getEstado(), e == null ? null : toResponse(e, m.getAlumnoNombre())));
        }
        return res;
    }

    @Transactional(readOnly = true)
    public EntregaResponse obtenerEntrega(Long entregaId) {
        Entrega e = obtener(entregaId);
        String nombre = matriculaRepo.findById(e.getMatriculaId()).map(MatriculaLocal::getAlumnoNombre).orElse("Alumno " + e.getAlumnoId());
        return toResponse(e, nombre);
    }

    /** URL de descarga de un archivo de la entrega: docente de la tarea o dueño (alumno / su apoderado). */
    @Transactional(readOnly = true)
    public DescargaResponse urlArchivo(Long entregaId, Long archivoId, Long usuarioId, boolean esAdmin,
                                       Set<Long> alumnosDelUsuario, boolean esDocente) {
        Entrega e = obtener(entregaId);
        Tarea t = tareaService.obtener(e.getTareaId());
        if (esDocente || esAdmin) {
            tareaService.exigirDueno(t, usuarioId, esAdmin);
        } else if (!alumnosDelUsuario.contains(e.getAlumnoId())) {
            throw new AccessDeniedException("No puede descargar archivos de esta entrega.");
        }
        EntregaArchivo a = archivoRepo.findById(archivoId).filter(x -> x.getEntregaId().equals(entregaId))
            .orElseThrow(() -> new ResourceNotFoundException("Archivo no encontrado: " + archivoId));
        return new DescargaResponse(archivos.urlDescarga(a.getRutaStorage()), a.getNombreArchivo());
    }

    /** ¿Alguno de los alumnos está matriculado en la sección? */
    @Transactional(readOnly = true)
    public boolean deSeccion(Long seccionId, Set<Long> alumnoIds) {
        return matriculaRepo.findBySeccionIdAndEstadoOrderByAlumnoNombre(seccionId, "MATRICULADO").stream()
            .anyMatch(m -> alumnoIds.contains(m.getAlumnoId()));
    }

    Entrega obtener(Long id) {
        return entregaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Entrega no encontrada: " + id));
    }

    EntregaResponse toResponse(Entrega e, String alumnoNombre) {
        List<ArchivoResponse> arch = archivoRepo.findByEntregaIdOrderByIdAsc(e.getId()).stream()
            .map(a -> new ArchivoResponse(a.getId(), a.getNombreArchivo(), a.getContentType(), a.getTamanoBytes())).toList();
        return new EntregaResponse(e.getId(), e.getTareaId(), e.getMatriculaId(), e.getAlumnoId(), alumnoNombre, e.getComentario(),
            e.getEntregadaEn(), e.getEsTardia(), e.getVersion(), e.getEstado(), e.getNota(), e.getRetroalimentacion(),
            e.getCalificadaEn(), arch);
    }

    private MatriculaLocal matriculaDelAlumno(Tarea t, Long alumnoId) {
        matriculaLocalService.cargarInicialSiVacia(t.getSeccionId());
        return matriculaRepo.findBySeccionIdAndEstadoOrderByAlumnoNombre(t.getSeccionId(), "MATRICULADO").stream()
            .filter(m -> m.getAlumnoId().equals(alumnoId)).findFirst()
            .orElseThrow(() -> new BusinessRuleException("El alumno no está matriculado en la sección de esta tarea."));
    }

    private void validarArchivos(List<ArchivoRef> refs, Long tareaId, Long alumnoId) {
        if (refs.size() > props.getMaxArchivosEntrega()) {
            throw new BusinessRuleException("Máximo " + props.getMaxArchivosEntrega() + " archivos por entrega.");
        }
        String prefijo = prefijo(tareaId, alumnoId);
        long total = 0;
        for (ArchivoRef r : refs) {
            if (!r.ruta().startsWith(prefijo)) {
                throw new BusinessRuleException("El archivo '" + r.nombreArchivo() + "' no fue subido con una URL firmada de esta entrega.");
            }
            archivos.validar(r.contentType(), r.tamanoBytes());
            total += r.tamanoBytes();
        }
        if (total > props.getEntregaMaxMb() * 1024L * 1024L) {
            throw new BusinessRuleException("La entrega excede el tamaño máximo de " + props.getEntregaMaxMb() + " MB.");
        }
    }

    private static String prefijo(Long tareaId, Long alumnoId) {
        return "tareas/" + tareaId + "/entregas/" + alumnoId + "/";
    }
}
```

---

## 20. `MaterialService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/MaterialService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Material`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.client.PlanificacionClient;
import pe.edu.upeu.eduspace.tareas.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.tareas.config.KafkaConfig;
import pe.edu.upeu.eduspace.tareas.dto.Dtos.*;
import pe.edu.upeu.eduspace.tareas.entity.Material;
import pe.edu.upeu.eduspace.tareas.event.MaterialPublicadoEvent;
import pe.edu.upeu.eduspace.tareas.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.tareas.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.tareas.messaging.TareaEventProducer;
import pe.edu.upeu.eduspace.tareas.repository.MaterialRepository;

import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Materiales de curso. Cada docente sube archivos o enlaces de SUS cursos (el que tiene asignado en esa sección); los alumnos y
 * apoderados de la sección los ven y los descargan con una URL firmada de corta duración. Al publicar se avisa a la familia.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MaterialService {

    private final MaterialRepository repo;
    private final PlanificacionGateway planificacion;
    private final ArchivoService archivos;
    private final TareaService tareaService;
    private final EntregaService entregaService;
    private final MatriculaLocalService matriculaLocalService;
    private final TareaEventProducer producer;

    private static String prefijo(Long seccionId, Long cursoId) {
        return "materiales/" + seccionId + "/" + cursoId + "/";
    }

    /** Paso 1 (archivo): valida tipo y tamaño y entrega la URL firmada para subirlo. */
    public ArchivoUrlResponse urlSubida(MaterialArchivoUrlRequest req, Long usuarioId, boolean esAdmin) {
        validarDocente(req.seccionId(), req.cursoId(), usuarioId, esAdmin);
        archivos.validar(req.contentType(), req.tamanoBytes());
        String ruta = archivos.nuevaRuta(prefijo(req.seccionId(), req.cursoId()), req.nombreArchivo());
        return new ArchivoUrlResponse(archivos.urlSubida(ruta), ruta, archivos.expiraMinutos());
    }

    /** Paso 2: registra el material (archivo ya subido o enlace) y avisa a la familia. */
    @Transactional
    public MaterialResponse crear(MaterialRequest req, Long usuarioId, boolean esAdmin) {
        Long docenteId = validarDocente(req.seccionId(), req.cursoId(), usuarioId, esAdmin);
        PlanificacionClient.Seccion seccion = planificacion.seccion(req.seccionId());
        Material.MaterialBuilder m = Material.builder().anioId(seccion.anioId()).seccionId(req.seccionId()).cursoId(req.cursoId())
            .docenteId(docenteId).titulo(req.titulo().trim()).descripcion(vacioANulo(req.descripcion()));
        String tipo = req.tipo() == null ? "" : req.tipo().toUpperCase();
        if ("ENLACE".equals(tipo)) {
            String url = req.enlace() == null ? "" : req.enlace().trim();
            if (!(url.startsWith("http://") || url.startsWith("https://")) || url.length() < 10) {
                throw new BusinessRuleException("El enlace debe empezar con http:// o https://");
            }
            m.tipo("ENLACE").enlace(url);
        } else if ("ARCHIVO".equals(tipo)) {
            ArchivoRef a = req.archivo();
            if (a == null) throw new BusinessRuleException("Falta el archivo del material.");
            if (!a.ruta().startsWith(prefijo(req.seccionId(), req.cursoId()))) {
                throw new BusinessRuleException("El archivo no corresponde a este curso. Súbelo de nuevo.");
            }
            archivos.validar(a.contentType(), a.tamanoBytes());
            m.tipo("ARCHIVO").nombreArchivo(a.nombreArchivo()).rutaStorage(a.ruta()).contentType(a.contentType()).tamanoBytes(a.tamanoBytes());
        } else {
            throw new BusinessRuleException("El tipo debe ser ARCHIVO o ENLACE.");
        }
        Material guardado = repo.save(m.build());

        matriculaLocalService.cargarInicialSiVacia(req.seccionId());
        List<Long> alumnoIds = tareaService.alumnosDeSeccion(req.seccionId());
        producer.publicar(KafkaConfig.TOPIC_MATERIAL_PUBLICADO, String.valueOf(guardado.getId()), MaterialPublicadoEvent.builder()
            .materialId(guardado.getId()).seccionId(req.seccionId()).cursoId(req.cursoId())
            .cursoNombre(planificacion.nombreCursoOpcional(req.cursoId())).titulo(guardado.getTitulo()).alumnoIds(alumnoIds).build());
        log.info("Material {} publicado en sección {} curso {} ({} alumno(s))", guardado.getId(), req.seccionId(), req.cursoId(), alumnoIds.size());
        return toResponse(guardado);
    }

    /** Lista los materiales de un curso en una sección: personal siempre; familias solo si tienen un alumno en esa sección. */
    @Transactional(readOnly = true)
    public List<MaterialResponse> listar(Long seccionId, Long cursoId, boolean esStaff, Set<Long> alumnosDelUsuario) {
        exigirParticipante(seccionId, esStaff, alumnosDelUsuario);
        return repo.findBySeccionIdAndCursoIdOrderByCreadoEnDescIdDesc(seccionId, cursoId).stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public DescargaResponse urlDescarga(Long id, boolean esStaff, Set<Long> alumnosDelUsuario) {
        Material m = obtener(id);
        exigirParticipante(m.getSeccionId(), esStaff, alumnosDelUsuario);
        if (!"ARCHIVO".equals(m.getTipo())) throw new BusinessRuleException("Este material es un enlace, no un archivo.");
        return new DescargaResponse(archivos.urlDescarga(m.getRutaStorage()), m.getNombreArchivo());
    }

    @Transactional
    public void eliminar(Long id, Long usuarioId, boolean esAdmin) {
        Material m = obtener(id);
        if (!esAdmin) {
            PlanificacionClient.Docente d = planificacion.docentePorUsuario(usuarioId);
            if (d == null || !Objects.equals(d.docenteId(), m.getDocenteId())) throw new AccessDeniedException("El material pertenece a otro docente.");
        }
        repo.delete(m);
        if ("ARCHIVO".equals(m.getTipo()) && m.getRutaStorage() != null) archivos.eliminar(m.getRutaStorage());
    }

    // ------------------------------------------------------------------ utilidades

    private Material obtener(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Material no encontrado: " + id));
    }

    private void exigirParticipante(Long seccionId, boolean esStaff, Set<Long> alumnosDelUsuario) {
        if (esStaff) return;
        if (alumnosDelUsuario == null || !entregaService.deSeccion(seccionId, alumnosDelUsuario)) {
            throw new AccessDeniedException("No participa en este curso.");
        }
    }

    /** El docente solo sube material de las secciones y cursos que tiene asignados; el ADMIN debe tener un docente asociado. */
    private Long validarDocente(Long seccionId, Long cursoId, Long usuarioId, boolean esAdmin) {
        PlanificacionClient.Docente d = planificacion.docentePorUsuario(usuarioId);
        if (esAdmin) {
            if (d == null) throw new BusinessRuleException("El ADMIN debe tener un docente asociado para subir materiales; use una cuenta de docente.");
            return d.docenteId();
        }
        if (d == null || d.docenteId() == null) throw new AccessDeniedException("El usuario no está registrado como docente.");
        if (!planificacion.asignacionValida(d.docenteId(), seccionId, cursoId)) {
            throw new AccessDeniedException("El docente no está asignado a esta sección y curso.");
        }
        return d.docenteId();
    }

    private static String vacioANulo(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }

    private MaterialResponse toResponse(Material m) {
        return new MaterialResponse(m.getId(), m.getSeccionId(), m.getCursoId(), m.getDocenteId(), m.getTitulo(), m.getDescripcion(), m.getTipo(),
            m.getEnlace(), m.getNombreArchivo(), m.getContentType(), m.getTamanoBytes(), m.getCreadoEn());
    }
}
```

---

## 21. `MatriculaLocalService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/MatriculaLocalService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `MatriculaLocal`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.client.MatriculaClient;
import pe.edu.upeu.eduspace.tareas.config.KafkaConfig;
import pe.edu.upeu.eduspace.tareas.entity.EventoProcesado;
import pe.edu.upeu.eduspace.tareas.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.tareas.event.EventoSobre;
import pe.edu.upeu.eduspace.tareas.event.MatriculaEvent;
import pe.edu.upeu.eduspace.tareas.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.tareas.repository.MatriculaLocalRepository;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MatriculaLocalService {

    private final MatriculaLocalRepository repo;
    private final EventoProcesadoRepository eventoRepo;
    private final MatriculaClient matriculaClient;

    /** UPSERT idempotente de la réplica. Un evento más viejo que lo ya aplicado se registra pero no se aplica. */
    @Transactional
    public void procesar(EventoSobre<MatriculaEvent> sobre) {
        if (sobre.getEventId() != null && eventoRepo.existsByEventId(sobre.getEventId())) {
            log.info("Evento {} ya procesado; se ignora.", sobre.getEventId());
            return;
        }
        MatriculaEvent ev = sobre.getPayload();
        if (ev.getMatriculaId() == null || ev.getAlumnoId() == null || ev.getSeccionId() == null) {
            log.warn("Evento {} incompleto descartado: {}", sobre.getEventType(), ev);
            return;
        }
        LocalDateTime cuando = sobre.getOccurredAt() != null ? sobre.getOccurredAt() : LocalDateTime.now();
        MatriculaLocal actual = repo.findById(ev.getMatriculaId()).orElse(null);
        if (actual != null && cuando.isBefore(actual.getActualizadoEn())) {
            log.info("Evento {} de la matrícula {} es más viejo que lo aplicado; se ignora.", sobre.getEventType(), ev.getMatriculaId());
        } else {
            repo.save(MatriculaLocal.builder()
                .matriculaId(ev.getMatriculaId())
                .alumnoId(ev.getAlumnoId())
                .alumnoNombre(ev.getAlumnoNombre() != null ? ev.getAlumnoNombre() : (actual != null ? actual.getAlumnoNombre() : "Alumno " + ev.getAlumnoId()))
                .anioId(ev.getAnioId() != null ? ev.getAnioId() : actual != null ? actual.getAnioId() : 0L)
                .nivelId(ev.getNivelId() != null ? ev.getNivelId() : actual != null ? actual.getNivelId() : null)
                .gradoId(ev.getGradoId() != null ? ev.getGradoId() : actual != null ? actual.getGradoId() : 0L)
                .seccionId(ev.getSeccionId())
                .estado(estadoDe(sobre.getEventType(), ev.getEstado()))
                .actualizadoEn(cuando)
                .build());
        }
        if (sobre.getEventId() != null) {
            eventoRepo.save(EventoProcesado.builder().eventId(sobre.getEventId())
                .eventType(sobre.getEventType() != null ? sobre.getEventType() : "matricula.*").build());
        }
    }

    static String estadoDe(String topic, String estadoEvento) {
        if (topic != null) {
            switch (topic) {
                case KafkaConfig.TOPIC_MATRICULA_CREADA: return "PRE_MATRICULA";
                case KafkaConfig.TOPIC_MATRICULA_CONFIRMADA: return "MATRICULADO";
                case KafkaConfig.TOPIC_MATRICULA_RETIRADA: return "RETIRADO";
                case KafkaConfig.TOPIC_MATRICULA_ANULADA: return "ANULADO";
                default: break;
            }
        }
        return estadoEvento != null ? estadoEvento : "MATRICULADO";
    }

    /** Carga inicial desde matricula-ms cuando la sección no tiene alumnos en la réplica. */
    @Transactional
    public int cargarInicialSiVacia(Long seccionId) {
        if (!repo.findBySeccionId(seccionId).isEmpty()) return 0;
        int n = 0;
        try {
            for (MatriculaClient.MatriculaInterna m : matriculaClient.deSeccion(seccionId)) {
                repo.save(MatriculaLocal.builder().matriculaId(m.matriculaId()).alumnoId(m.alumnoId())
                    .alumnoNombre(m.alumnoNombre()).anioId(m.anioId()).nivelId(m.nivelId()).gradoId(m.gradoId())
                    .seccionId(m.seccionId()).estado(m.estado()).build());
                n++;
            }
            log.info("Carga inicial de la sección {}: {} matrícula(s)", seccionId, n);
        } catch (Exception e) {
            log.warn("No se pudo hacer la carga inicial de la sección {}: {}", seccionId, e.getMessage());
        }
        return n;
    }
}
```

---

## 22. `PendientesService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/PendientesService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Pendientes`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.dto.Dtos.TareaPendienteResponse;
import pe.edu.upeu.eduspace.tareas.entity.Entrega;
import pe.edu.upeu.eduspace.tareas.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;
import pe.edu.upeu.eduspace.tareas.repository.EntregaRepository;
import pe.edu.upeu.eduspace.tareas.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.tareas.repository.TareaRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/** Tareas del alumno y de los hijos del apoderado (todas, o solo las pendientes). */
@Service
@RequiredArgsConstructor
public class PendientesService {

    private final TareaRepository tareaRepo;
    private final EntregaRepository entregaRepo;
    private final MatriculaLocalRepository matriculaRepo;

    @Transactional(readOnly = true)
    public List<TareaPendienteResponse> pendientes(Set<Long> alumnoIds) {
        return calcular(alumnoIds, true);
    }

    @Transactional(readOnly = true)
    public List<TareaPendienteResponse> todas(Set<Long> alumnoIds) {
        return calcular(alumnoIds, false);
    }

    private List<TareaPendienteResponse> calcular(Set<Long> alumnoIds, boolean soloPendientes) {
        if (alumnoIds.isEmpty()) return List.of();
        List<MatriculaLocal> matriculas = matriculaRepo.findByAlumnoIdIn(alumnoIds).stream()
            .filter(m -> "MATRICULADO".equals(m.getEstado())).toList();
        if (matriculas.isEmpty()) return List.of();
        Map<Long, List<MatriculaLocal>> porSeccion = matriculas.stream().collect(Collectors.groupingBy(MatriculaLocal::getSeccionId));
        Map<String, Entrega> entregas = new HashMap<>();
        for (Entrega e : entregaRepo.findByAlumnoIdIn(alumnoIds)) entregas.put(e.getTareaId() + ":" + e.getAlumnoId(), e);

        LocalDateTime ahora = LocalDateTime.now();
        List<Tarea> tareas = soloPendientes
            ? tareaRepo.findBySeccionIdInAndEstadoOrderByFechaEntregaAsc(porSeccion.keySet(), "PUBLICADA")
            : tareaRepo.findBySeccionIdInAndEstadoInOrderByFechaEntregaDesc(porSeccion.keySet(), List.of("PUBLICADA", "CERRADA"));
        List<TareaPendienteResponse> res = new ArrayList<>();
        for (Tarea t : tareas) {
            for (MatriculaLocal m : porSeccion.getOrDefault(t.getSeccionId(), List.of())) {
                Entrega e = entregas.get(t.getId() + ":" + m.getAlumnoId());
                String estado = e == null ? "SIN_ENTREGAR" : e.getEstado();
                boolean pendiente = e == null || "DEVUELTA".equals(e.getEstado());
                if (soloPendientes && !pendiente) continue;
                boolean vencida = ahora.isAfter(t.getFechaEntrega());
                if (soloPendientes && vencida && !Boolean.TRUE.equals(t.getPermiteTardia())) continue;
                res.add(new TareaPendienteResponse(t.getId(), t.getTitulo(), t.getCursoId(), t.getFechaEntrega(), vencida,
                    t.getPermiteTardia(), m.getAlumnoId(), m.getAlumnoNombre(), estado));
            }
        }
        return res;
    }
}
```

---

## 23. `TareaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/service/TareaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Tarea`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.client.PlanificacionClient;
import pe.edu.upeu.eduspace.tareas.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.tareas.config.KafkaConfig;
import pe.edu.upeu.eduspace.tareas.dto.Dtos.*;
import pe.edu.upeu.eduspace.tareas.dto.PageResponse;
import pe.edu.upeu.eduspace.tareas.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;
import pe.edu.upeu.eduspace.tareas.entity.TareaAdjunto;
import pe.edu.upeu.eduspace.tareas.event.TareaPublicadaEvent;
import pe.edu.upeu.eduspace.tareas.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.tareas.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.tareas.messaging.TareaEventProducer;
import pe.edu.upeu.eduspace.tareas.repository.EntregaRepository;
import pe.edu.upeu.eduspace.tareas.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.tareas.repository.TareaAdjuntoRepository;
import pe.edu.upeu.eduspace.tareas.repository.TareaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class TareaService {

    private final TareaRepository tareaRepo;
    private final TareaAdjuntoRepository adjuntoRepo;
    private final EntregaRepository entregaRepo;
    private final MatriculaLocalRepository matriculaRepo;
    private final MatriculaLocalService matriculaLocalService;
    private final PlanificacionGateway planificacion;
    private final ArchivoService archivos;
    private final TareaEventProducer producer;

    // ------------------------------------------------------------------ gestión

    @Transactional
    public TareaResponse crear(TareaCreateRequest req, Long usuarioId, boolean esAdmin) {
        Long docenteId = validarDocente(req.seccionId(), req.cursoId(), usuarioId, esAdmin, null);
        PlanificacionClient.Seccion seccion = planificacion.seccion(req.seccionId());
        PlanificacionClient.Periodo periodo = planificacion.periodo(req.periodoId());
        if (!seccion.anioId().equals(periodo.anioId())) {
            throw new BusinessRuleException("El periodo no pertenece al año de la sección.");
        }
        if (!"ACTIVO".equalsIgnoreCase(periodo.estado())) {
            throw new BusinessRuleException("El periodo '" + periodo.nombre() + "' no está ACTIVO (estado: " + periodo.estado() + ").");
        }
        Tarea t = tareaRepo.save(Tarea.builder()
            .anioId(seccion.anioId()).periodoId(req.periodoId()).seccionId(req.seccionId()).cursoId(req.cursoId())
            .docenteId(docenteId).titulo(req.titulo().trim()).descripcion(req.descripcion())
            .fechaEntrega(req.fechaEntrega())
            .permiteTardia(Boolean.TRUE.equals(req.permiteTardia()))
            .puntajeMaximo(req.puntajeMaximo() != null ? req.puntajeMaximo() : new BigDecimal("20"))
            .estado("BORRADOR").build());
        return toResponse(t);
    }

    /**
     * BORRADOR: se edita todo. PUBLICADA: solo descripción y fecha de entrega; el puntaje, título y política de
     * entrega tardía no cambian una vez publicada (y nunca el puntaje si ya hay notas).
     */
    @Transactional
    public TareaResponse actualizar(Long id, TareaUpdateRequest req, Long usuarioId, boolean esAdmin) {
        Tarea t = obtener(id);
        exigirDueno(t, usuarioId, esAdmin);
        if ("CERRADA".equals(t.getEstado())) {
            throw new BusinessRuleException("Una tarea CERRADA no se puede editar.");
        }
        if ("PUBLICADA".equals(t.getEstado())) {
            boolean cambiaTitulo = req.titulo() != null && !req.titulo().trim().equals(t.getTitulo());
            boolean cambiaTardia = req.permiteTardia() != null && !req.permiteTardia().equals(t.getPermiteTardia());
            boolean cambiaPuntaje = req.puntajeMaximo() != null && req.puntajeMaximo().compareTo(t.getPuntajeMaximo()) != 0;
            if (cambiaTitulo || cambiaTardia || cambiaPuntaje) {
                throw new BusinessRuleException("En una tarea PUBLICADA solo se pueden editar la descripción y la fecha de entrega"
                    + (cambiaPuntaje && entregaRepo.countByTareaIdAndEstado(id, "CALIFICADA") > 0 ? " (el puntaje no cambia: ya hay notas)." : "."));
            }
        } else {
            if (req.titulo() != null) t.setTitulo(req.titulo().trim());
            if (req.permiteTardia() != null) t.setPermiteTardia(req.permiteTardia());
            if (req.puntajeMaximo() != null) t.setPuntajeMaximo(req.puntajeMaximo());
        }
        if (req.descripcion() != null) t.setDescripcion(req.descripcion());
        if (req.fechaEntrega() != null) {
            if ("PUBLICADA".equals(t.getEstado()) && !req.fechaEntrega().isAfter(LocalDateTime.now())) {
                throw new BusinessRuleException("La nueva fecha de entrega debe ser futura.");
            }
            t.setFechaEntrega(req.fechaEntrega());
            t.setRecordatorioEnviado(false);
        }
        t.setActualizadaEn(LocalDateTime.now());
        return toResponse(tareaRepo.save(t));
    }

    @Transactional
    public TareaResponse publicar(Long id, Long usuarioId, boolean esAdmin) {
        Tarea t = obtener(id);
        exigirDueno(t, usuarioId, esAdmin);
        if (!"BORRADOR".equals(t.getEstado())) {
            throw new BusinessRuleException("Solo se puede publicar una tarea en BORRADOR (estado actual: " + t.getEstado() + ").");
        }
        if (!t.getFechaEntrega().isAfter(LocalDateTime.now())) {
            throw new BusinessRuleException("La fecha de entrega debe ser futura para publicar.");
        }
        matriculaLocalService.cargarInicialSiVacia(t.getSeccionId());
        t.setEstado("PUBLICADA");
        t.setPublicadaEn(LocalDateTime.now());
        t.setActualizadaEn(LocalDateTime.now());
        tareaRepo.save(t);
        List<Long> alumnoIds = alumnosDeSeccion(t.getSeccionId());
        producer.publicar(KafkaConfig.TOPIC_TAREA_PUBLICADA, String.valueOf(t.getId()), TareaPublicadaEvent.builder()
            .tareaId(t.getId()).seccionId(t.getSeccionId()).cursoId(t.getCursoId())
            .cursoNombre(planificacion.nombreCursoOpcional(t.getCursoId())).titulo(t.getTitulo())
            .fechaEntrega(t.getFechaEntrega()).alumnoIds(alumnoIds).build());
        log.info("Tarea {} publicada para {} alumno(s)", t.getId(), alumnoIds.size());
        return toResponse(t);
    }

    @Transactional
    public TareaResponse cerrar(Long id, Long usuarioId, boolean esAdmin) {
        Tarea t = obtener(id);
        exigirDueno(t, usuarioId, esAdmin);
        if (!"PUBLICADA".equals(t.getEstado())) {
            throw new BusinessRuleException("Solo se puede cerrar una tarea PUBLICADA.");
        }
        t.setEstado("CERRADA");
        t.setActualizadaEn(LocalDateTime.now());
        return toResponse(tareaRepo.save(t));
    }

    // ------------------------------------------------------------------ material del docente

    @Transactional
    public ArchivoUrlResponse urlAdjunto(Long id, ArchivoUrlRequest req, Long usuarioId, boolean esAdmin) {
        Tarea t = obtener(id);
        exigirDueno(t, usuarioId, esAdmin);
        if ("CERRADA".equals(t.getEstado())) throw new BusinessRuleException("La tarea está CERRADA.");
        archivos.validar(req.contentType(), req.tamanoBytes());
        String ruta = archivos.nuevaRuta("tareas/" + id + "/material/", req.nombreArchivo());
        adjuntoRepo.save(TareaAdjunto.builder().tareaId(id).nombreArchivo(req.nombreArchivo()).rutaStorage(ruta)
            .contentType(req.contentType()).tamanoBytes(req.tamanoBytes()).build());
        return new ArchivoUrlResponse(archivos.urlSubida(ruta), ruta, archivos.expiraMinutos());
    }

    @Transactional(readOnly = true)
    public DescargaResponse urlAdjuntoDescarga(Long tareaId, Long adjuntoId) {
        TareaAdjunto a = adjuntoRepo.findById(adjuntoId).filter(x -> x.getTareaId().equals(tareaId))
            .orElseThrow(() -> new ResourceNotFoundException("Adjunto no encontrado: " + adjuntoId));
        return new DescargaResponse(archivos.urlDescarga(a.getRutaStorage()), a.getNombreArchivo());
    }

    // ------------------------------------------------------------------ consultas

    @Transactional(readOnly = true)
    public PageResponse<TareaResponse> listar(Long seccionId, Long cursoId, Long periodoId, Long docenteId, String estado, Pageable pageable) {
        Page<Tarea> page = tareaRepo.buscar(seccionId, cursoId, periodoId, docenteId,
            estado == null || estado.isBlank() ? null : estado.toUpperCase(), pageable);
        return PageResponse.from(page.map(this::toResponseLiviano));
    }

    @Transactional(readOnly = true)
    public TareaResponse detalle(Long id) {
        return toResponse(obtener(id));
    }

    @Transactional(readOnly = true)
    public Tarea obtener(Long id) {
        return tareaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada: " + id));
    }

    /** El docente solo toca sus tareas; ADMIN todas. */
    public void exigirDueno(Tarea t, Long usuarioId, boolean esAdmin) {
        if (esAdmin) return;
        PlanificacionClient.Docente d = planificacion.docentePorUsuario(usuarioId);
        if (d == null || !Objects.equals(d.docenteId(), t.getDocenteId())) {
            throw new AccessDeniedException("La tarea pertenece a otro docente.");
        }
    }

    public List<Long> alumnosDeSeccion(Long seccionId) {
        return matriculaRepo.findBySeccionIdAndEstadoOrderByAlumnoNombre(seccionId, "MATRICULADO").stream()
            .map(MatriculaLocal::getAlumnoId).toList();
    }

    private Long validarDocente(Long seccionId, Long cursoId, Long usuarioId, boolean esAdmin, Long docenteForzado) {
        if (esAdmin) {
            PlanificacionClient.Docente d = planificacion.docentePorUsuario(usuarioId);
            if (d == null) {
                throw new BusinessRuleException("El ADMIN debe tener un docente asociado para crear tareas; use una cuenta de docente.");
            }
            return d.docenteId();
        }
        PlanificacionClient.Docente d = planificacion.docentePorUsuario(usuarioId);
        if (d == null || d.docenteId() == null) {
            throw new AccessDeniedException("El usuario no está registrado como docente.");
        }
        if (!planificacion.asignacionValida(d.docenteId(), seccionId, cursoId)) {
            throw new AccessDeniedException("El docente no está asignado a esta sección y curso.");
        }
        return d.docenteId();
    }

    private TareaResponse toResponseLiviano(Tarea t) {
        return new TareaResponse(t.getId(), t.getAnioId(), t.getPeriodoId(), t.getSeccionId(), t.getCursoId(), t.getDocenteId(),
            t.getTitulo(), t.getDescripcion(), t.getPublicadaEn(), t.getFechaEntrega(), t.getPermiteTardia(),
            t.getPuntajeMaximo(), t.getEstado(), null, null, null, null);
    }

    TareaResponse toResponse(Tarea t) {
        List<AdjuntoResponse> adj = adjuntoRepo.findByTareaIdOrderByIdAsc(t.getId()).stream()
            .map(a -> new AdjuntoResponse(a.getId(), a.getNombreArchivo(), a.getContentType(), a.getTamanoBytes())).toList();
        long entregadas = entregaRepo.countByTareaId(t.getId());
        long calificadas = entregaRepo.countByTareaIdAndEstado(t.getId(), "CALIFICADA");
        int total = matriculaRepo.findBySeccionIdAndEstadoOrderByAlumnoNombre(t.getSeccionId(), "MATRICULADO").size();
        return new TareaResponse(t.getId(), t.getAnioId(), t.getPeriodoId(), t.getSeccionId(), t.getCursoId(), t.getDocenteId(),
            t.getTitulo(), t.getDescripcion(), t.getPublicadaEn(), t.getFechaEntrega(), t.getPermiteTardia(),
            t.getPuntajeMaximo(), t.getEstado(), adj, (int) entregadas, (int) calificadas, (int) Math.max(0, total - entregadas));
    }
}
```

---

## 24. `MaterialController.java` — Controladores REST API

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/controller/MaterialController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Material`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.tareas.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.tareas.dto.Dtos.*;
import pe.edu.upeu.eduspace.tareas.security.IdentidadService;
import pe.edu.upeu.eduspace.tareas.service.MaterialService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/tareas/materiales")
@RequiredArgsConstructor
@Tag(name = "Materiales", description = "Materiales de curso que suben los docentes (archivos y enlaces)")
public class MaterialController {

    private final MaterialService service;
    private final IdentidadService identidad;

    @PostMapping("/archivo-url")
    @Operation(summary = "URL firmada para subir un archivo de material (DOCENTE asignado al curso)")
    public ArchivoUrlResponse urlSubida(@Valid @RequestBody MaterialArchivoUrlRequest req, @AuthenticationPrincipal Jwt jwt) {
        return service.urlSubida(req, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PostMapping
    @Operation(summary = "Publicar un material (archivo ya subido o enlace) y avisar a la familia")
    public ResponseEntity<MaterialResponse> crear(@Valid @RequestBody MaterialRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(req, identidad.usuarioId(jwt), identidad.esAdmin(jwt)));
    }

    @GetMapping
    @Operation(summary = "Materiales de un curso en una sección (personal, o familia con un alumno en la sección)")
    public List<MaterialResponse> listar(@RequestParam Long seccionId, @RequestParam Long cursoId, @AuthenticationPrincipal Jwt jwt) {
        boolean staff = identidad.esStaff(jwt);
        return service.listar(seccionId, cursoId, staff, staff ? Set.of() : identidad.alumnosDelUsuario(jwt));
    }

    @GetMapping("/{id}/url")
    @Operation(summary = "URL firmada de descarga de un material tipo archivo")
    public DescargaResponse descargar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        boolean staff = identidad.esStaff(jwt);
        return service.urlDescarga(id, staff, staff ? Set.of() : identidad.alumnosDelUsuario(jwt));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un material (el docente dueño o ADMIN)")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        service.eliminar(id, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
        return ResponseEntity.noContent().build();
    }
}
```

---

## 25. `TareaController.java` — Controladores REST API

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/controller/TareaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Tarea`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.tareas.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.tareas.dto.Dtos.*;
import pe.edu.upeu.eduspace.tareas.dto.PageResponse;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;
import pe.edu.upeu.eduspace.tareas.security.IdentidadService;
import pe.edu.upeu.eduspace.tareas.service.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/tareas")
@RequiredArgsConstructor
@Tag(name = "Tareas", description = "Publicación, entregas y calificación de tareas")
public class TareaController {

    private final TareaService tareaService;
    private final EntregaService entregaService;
    private final CalificacionService calificacionService;
    private final PendientesService pendientesService;
    private final IdentidadService identidad;

    // ---------------------------------------------------------------- gestión (docente)

    @PostMapping
    @Operation(summary = "Crear tarea en BORRADOR (DOCENTE asignado)")
    public ResponseEntity<TareaResponse> crear(@Valid @RequestBody TareaCreateRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tareaService.crear(req, identidad.usuarioId(jwt), identidad.esAdmin(jwt)));
    }

    @PutMapping("/{id}")
    public TareaResponse actualizar(@PathVariable Long id, @Valid @RequestBody TareaUpdateRequest req, @AuthenticationPrincipal Jwt jwt) {
        return tareaService.actualizar(id, req, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PatchMapping("/{id}/publicar")
    public TareaResponse publicar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return tareaService.publicar(id, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PatchMapping("/{id}/cerrar")
    public TareaResponse cerrar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return tareaService.cerrar(id, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PostMapping("/{id}/adjuntos/url")
    @Operation(summary = "URL firmada para subir material de la tarea (DOCENTE)")
    public ArchivoUrlResponse urlAdjunto(@PathVariable Long id, @Valid @RequestBody ArchivoUrlRequest req, @AuthenticationPrincipal Jwt jwt) {
        return tareaService.urlAdjunto(id, req, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @GetMapping("/{id}/adjuntos/{adjuntoId}/url")
    public DescargaResponse descargarAdjunto(@PathVariable Long id, @PathVariable Long adjuntoId, @AuthenticationPrincipal Jwt jwt) {
        exigirParticipante(tareaService.obtener(id), jwt);
        return tareaService.urlAdjuntoDescarga(id, adjuntoId);
    }

    @GetMapping
    @Operation(summary = "Listar tareas (DOCENTE, SECRETARIA, ADMIN)")
    public PageResponse<TareaResponse> listar(@RequestParam(required = false) Long seccionId,
                                              @RequestParam(required = false) Long cursoId,
                                              @RequestParam(required = false) Long periodoId,
                                              @RequestParam(required = false) String estado,
                                              Pageable pageable) {
        return tareaService.listar(seccionId, cursoId, periodoId, null, estado, pageable);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalle con adjuntos y contadores (participantes)")
    public TareaResponse detalle(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        Tarea t = tareaService.obtener(id);
        exigirParticipante(t, jwt);
        return tareaService.detalle(id);
    }

    // ---------------------------------------------------------------- entregas

    @PostMapping("/{id}/entregas/archivo-url")
    @Operation(summary = "URL firmada de subida de un archivo de la entrega (ALUMNO)")
    public ArchivoUrlResponse urlEntrega(@PathVariable Long id, @Valid @RequestBody ArchivoUrlRequest req, @AuthenticationPrincipal Jwt jwt) {
        return entregaService.urlSubida(id, req, alumnoPropio(jwt));
    }

    @PostMapping("/{id}/entregas")
    @Operation(summary = "Registrar o reenviar la entrega (ALUMNO)")
    public ResponseEntity<EntregaResponse> entregar(@PathVariable Long id, @Valid @RequestBody EntregaRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(entregaService.registrar(id, req, alumnoPropio(jwt)));
    }

    @GetMapping("/{id}/entregas")
    @Operation(summary = "Entregas de la tarea con estado de cada alumno (DOCENTE dueño, ADMIN)")
    public List<EntregaAlumno> entregas(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return entregaService.deLaTarea(id, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PatchMapping("/entregas/{id}/calificar")
    public EntregaResponse calificar(@PathVariable Long id, @Valid @RequestBody CalificarRequest req, @AuthenticationPrincipal Jwt jwt) {
        return calificacionService.calificar(id, req, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PatchMapping("/entregas/{id}/devolver")
    public EntregaResponse devolver(@PathVariable Long id, @Valid @RequestBody DevolverRequest req, @AuthenticationPrincipal Jwt jwt) {
        return calificacionService.devolver(id, req, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PatchMapping("/{id}/calificaciones")
    @Operation(summary = "Calificación masiva de entregas de una tarea (DOCENTE)")
    public CalificacionMasivaResultado calificarMasivo(@PathVariable Long id, @Valid @RequestBody CalificacionMasivaRequest req, @AuthenticationPrincipal Jwt jwt) {
        return calificacionService.calificarMasivo(id, req, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @GetMapping("/entregas/{id}/archivos/{archivoId}/url")
    public DescargaResponse descargarArchivo(@PathVariable Long id, @PathVariable Long archivoId, @AuthenticationPrincipal Jwt jwt) {
        boolean docente = identidad.esDocente(jwt);
        Set<Long> propios = docente || identidad.esAdmin(jwt) ? Set.of() : identidad.alumnosDelUsuario(jwt);
        return entregaService.urlArchivo(id, archivoId, identidad.usuarioId(jwt), identidad.esAdmin(jwt), propios, docente);
    }

    // ---------------------------------------------------------------- alumno / apoderado

    @GetMapping("/mias/pendientes")
    public List<TareaPendienteResponse> pendientes(@AuthenticationPrincipal Jwt jwt) {
        return pendientesService.pendientes(identidad.alumnosDelUsuario(jwt));
    }

    @GetMapping("/mias")
    public List<TareaPendienteResponse> mias(@AuthenticationPrincipal Jwt jwt) {
        return pendientesService.todas(identidad.alumnosDelUsuario(jwt));
    }

    // ---------------------------------------------------------------- utilidades

    private Long alumnoPropio(Jwt jwt) {
        Set<Long> ids = identidad.alumnosDelUsuario(jwt);
        if (ids.size() != 1) {
            throw new AccessDeniedException("Solo un alumno puede realizar entregas con su propia cuenta.");
        }
        return ids.iterator().next();
    }

    /** Participante: personal (docente/secretaría/admin) o alumno/apoderado de la sección de la tarea. */
    private void exigirParticipante(Tarea t, Jwt jwt) {
        if (identidad.esStaff(jwt)) return;
        boolean participa = entregaService.deSeccion(t.getSeccionId(), identidad.alumnosDelUsuario(jwt));
        if (!participa) throw new AccessDeniedException("No participa en esta tarea.");
    }
}
```

---

## 26. `MatriculaEventConsumer.java` — Mensajería Kafka

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/messaging/MatriculaEventConsumer.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Apache Kafka. Escucha mensajes de un topic específico y procesa los eventos de dominio recibidos de otros microservicios.

```java
package pe.edu.upeu.eduspace.tareas.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.tareas.config.KafkaConfig;
import pe.edu.upeu.eduspace.tareas.event.EventoSobre;
import pe.edu.upeu.eduspace.tareas.event.MatriculaEvent;
import pe.edu.upeu.eduspace.tareas.service.MatriculaLocalService;
import tools.jackson.databind.ObjectMapper;

@Slf4j
@Component
@RequiredArgsConstructor
public class MatriculaEventConsumer {

    private final MatriculaLocalService service;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = {
        KafkaConfig.TOPIC_MATRICULA_CREADA, KafkaConfig.TOPIC_MATRICULA_CONFIRMADA, KafkaConfig.TOPIC_MATRICULA_TRASLADADA,
        KafkaConfig.TOPIC_MATRICULA_RETIRADA, KafkaConfig.TOPIC_MATRICULA_ANULADA}, groupId = "tareas-ms")
    public void onMatricula(String json) {
        EventoSobre<MatriculaEvent> sobre;
        try {
            sobre = EventoSobre.leer(objectMapper, json, MatriculaEvent.class);
        } catch (Exception e) {
            log.error("matricula.* mal formado descartado: {}", e.getMessage());
            return;
        }
        if (sobre.getTraceId() != null) MDC.put("traceId", sobre.getTraceId());
        try {
            service.procesar(sobre);
        } finally {
            MDC.remove("traceId");
        }
    }
}
```

---

## 27. `TareaEventProducer.java` — Mensajería Kafka

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/messaging/TareaEventProducer.java`

### **¿Qué hace esta clase?**
Productor/publicador de eventos Apache Kafka. Envía eventos de dominio hacia topics específicos para que otros microservicios los procesen de forma asíncrona.

```java
package pe.edu.upeu.eduspace.tareas.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import pe.edu.upeu.eduspace.tareas.event.EventoSobre;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.UUID;

/** Publica eventos con el sobre estándar. Dentro de una transacción espera al commit; si hace rollback no envía nada. */
@Slf4j
@Component
@RequiredArgsConstructor
public class TareaEventProducer {

    private final KafkaTemplate<String, String> kafka;
    private final ObjectMapper objectMapper;

    public <T> void publicar(String topic, String clave, T payload) {
        String json = EventoSobre.escribir(objectMapper, EventoSobre.<T>builder()
            .eventId(UUID.randomUUID())
            .eventType(topic)
            .occurredAt(LocalDateTime.now())
            .version(1)
            .traceId(MDC.get("traceId") != null ? MDC.get("traceId") : UUID.randomUUID().toString())
            .payload(payload)
            .build());
        Runnable enviar = () -> kafka.send(topic, clave, json).whenComplete((r, ex) -> {
            if (ex != null) log.error("No se pudo publicar {} (clave {}): {}", topic, clave, ex.getMessage());
            else log.debug("Evento {} publicado (clave {})", topic, clave);
        });
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
}
```

---

## 28. `EventoSobre.java` — Eventos de Dominio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/EventoSobre.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.event;

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

## 29. `MaterialPublicadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/MaterialPublicadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/** Un docente publicó material de un curso: se avisa a los alumnos de la sección y a sus apoderados. */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaterialPublicadoEvent {
    private Long materialId;
    private Long seccionId;
    private Long cursoId;
    private String cursoNombre;
    private String titulo;
    private List<Long> alumnoIds;
}
```

---

## 30. `MatriculaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/MatriculaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.event;

import lombok.Data;
import lombok.NoArgsConstructor;

/** Copia propia del contrato matricula.* (solo lo que asistencia necesita). */
@Data
@NoArgsConstructor
public class MatriculaEvent {
    private Long matriculaId;
    private Long alumnoId;
    private String alumnoNombre;
    private Long anioId;
    private Long nivelId;
    private Long gradoId;
    private Long seccionId;
    private String estado;
}
```

---

## 31. `TareaCalificadaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/TareaCalificadaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/** Contrato con calificaciones-ms y notificaciones-ms. {@code nota} ya está en escala 0–20. */
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
    private BigDecimal nota;
    private BigDecimal puntajeMaximo;
    private BigDecimal puntajeObtenido;
}
```

---

## 32. `TareaEntregadaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/TareaEntregadaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TareaEntregadaEvent {
    private Long tareaId;
    private Long entregaId;
    private Long alumnoId;
    private Long matriculaId;
    private Long seccionId;
    private Short version;
    private Boolean esTardia;
}
```

---

## 33. `TareaPublicadaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/event/TareaPublicadaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/** También se usa para tarea.recordatorio (mismos datos, alumnoIds = quienes no han entregado). */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TareaPublicadaEvent {
    private Long tareaId;
    private Long seccionId;
    private Long cursoId;
    private String cursoNombre;
    private String titulo;
    private LocalDateTime fechaEntrega;
    private List<Long> alumnoIds;
}
```

---

## 34. `CierreAutomaticoJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/scheduler/CierreAutomaticoJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.tareas.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;
import pe.edu.upeu.eduspace.tareas.repository.TareaRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class CierreAutomaticoJob {

    private final TareaRepository tareaRepo;

    @Scheduled(cron = "0 10 * * * *", zone = "America/Lima")
    @SchedulerLock(name = "tareas_cierre_automatico_job", lockAtLeastFor = "30s", lockAtMostFor = "10m")
    @Transactional
    public void cerrarVencidas() {
        ejecutar();
    }

    public int ejecutar() {
        var vencidas = tareaRepo.vencidasSinTardia(LocalDateTime.now());
        for (Tarea t : vencidas) {
            t.setEstado("CERRADA");
            t.setActualizadaEn(LocalDateTime.now());
            tareaRepo.save(t);
        }
        if (!vencidas.isEmpty()) log.info("{} tarea(s) vencidas cerradas automáticamente", vencidas.size());
        return vencidas.size();
    }
}
```

---

## 35. `LimpiezaJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/scheduler/LimpiezaJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.tareas.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.repository.EventoProcesadoRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class LimpiezaJob {

    private final EventoProcesadoRepository eventoRepo;

    @Scheduled(cron = "0 0 3 * * *", zone = "America/Lima")
    @SchedulerLock(name = "tareas_limpieza_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void limpiar() {
        long n = eventoRepo.deleteByProcesadoEnBefore(LocalDateTime.now().minusDays(30));
        log.info("Limpieza técnica: {} eventos procesados eliminados.", n);
    }
}
```

---

## 36. `RecordatorioJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/scheduler/RecordatorioJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.tareas.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.tareas.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.tareas.config.KafkaConfig;
import pe.edu.upeu.eduspace.tareas.entity.Entrega;
import pe.edu.upeu.eduspace.tareas.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;
import pe.edu.upeu.eduspace.tareas.event.TareaPublicadaEvent;
import pe.edu.upeu.eduspace.tareas.messaging.TareaEventProducer;
import pe.edu.upeu.eduspace.tareas.repository.EntregaRepository;
import pe.edu.upeu.eduspace.tareas.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.tareas.repository.TareaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/** Cada hora avisa (una sola vez por tarea) a quienes no han entregado una tarea que vence en menos de 24 h. */
@Slf4j
@Component
@RequiredArgsConstructor
public class RecordatorioJob {

    private final TareaRepository tareaRepo;
    private final EntregaRepository entregaRepo;
    private final MatriculaLocalRepository matriculaRepo;
    private final PlanificacionGateway planificacion;
    private final TareaEventProducer producer;

    @Scheduled(cron = "0 5 * * * *", zone = "America/Lima")
    @SchedulerLock(name = "tareas_recordatorio_job", lockAtLeastFor = "30s", lockAtMostFor = "10m")
    @Transactional
    public void enviarRecordatorios() {
        ejecutar();
    }

    public int ejecutar() {
        LocalDateTime ahora = LocalDateTime.now();
        int n = 0;
        for (Tarea t : tareaRepo.porVencer(ahora, ahora.plusHours(24))) {
            Set<Long> entregaron = entregaRepo.findByTareaIdOrderByEntregadaEnAsc(t.getId()).stream()
                .filter(e -> !"DEVUELTA".equals(e.getEstado())).map(Entrega::getAlumnoId).collect(Collectors.toSet());
            List<Long> pendientes = matriculaRepo.findBySeccionIdAndEstadoOrderByAlumnoNombre(t.getSeccionId(), "MATRICULADO").stream()
                .map(MatriculaLocal::getAlumnoId).filter(a -> !entregaron.contains(a)).toList();
            t.setRecordatorioEnviado(true);
            tareaRepo.save(t);
            if (!pendientes.isEmpty()) {
                producer.publicar(KafkaConfig.TOPIC_TAREA_RECORDATORIO, String.valueOf(t.getId()), TareaPublicadaEvent.builder()
                    .tareaId(t.getId()).seccionId(t.getSeccionId()).cursoId(t.getCursoId())
                    .cursoNombre(planificacion.nombreCursoOpcional(t.getCursoId())).titulo(t.getTitulo())
                    .fechaEntrega(t.getFechaEntrega()).alumnoIds(pendientes).build());
                n++;
            }
        }
        if (n > 0) log.info("Recordatorio enviado para {} tarea(s)", n);
        return n;
    }
}
```

---

## 37. `CacheConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/CacheConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    public static final String CACHE_ASIGNACIONES = "asignacionesCache";   // 60 s
    public static final String CACHE_PERIODOS = "periodosCache";           // 5 min
    public static final String CACHE_HIJOS = "hijosCache";                 // 5 min
    public static final String CACHE_DOCENTE = "docenteCache";             // 5 min

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager m = new SimpleCacheManager();
        m.setCaches(List.of(
            cache(CACHE_ASIGNACIONES, 60, TimeUnit.SECONDS),
            cache(CACHE_PERIODOS, 5, TimeUnit.MINUTES),
            cache(CACHE_HIJOS, 5, TimeUnit.MINUTES),
            cache(CACHE_DOCENTE, 5, TimeUnit.MINUTES)));
        return m;
    }

    private CaffeineCache cache(String nombre, long t, TimeUnit u) {
        return new CaffeineCache(nombre, Caffeine.newBuilder().expireAfterWrite(t, u).maximumSize(2000).build());
    }
}
```

---

## 38. `FeignConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/FeignConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

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

## 39. `KafkaConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/KafkaConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class KafkaConfig {

    public static final String TOPIC_TAREA_PUBLICADA = "tarea.publicada";
    public static final String TOPIC_TAREA_ENTREGADA = "tarea.entregada";
    public static final String TOPIC_TAREA_CALIFICADA = "tarea.calificada";
    public static final String TOPIC_TAREA_RECORDATORIO = "tarea.recordatorio";
    public static final String TOPIC_MATERIAL_PUBLICADO = "material.publicado";

    public static final String TOPIC_MATRICULA_CREADA = "matricula.creada";
    public static final String TOPIC_MATRICULA_CONFIRMADA = "matricula.confirmada";
    public static final String TOPIC_MATRICULA_TRASLADADA = "matricula.trasladada";
    public static final String TOPIC_MATRICULA_RETIRADA = "matricula.retirada";
    public static final String TOPIC_MATRICULA_ANULADA = "matricula.anulada";

    @Bean
    NewTopic tareaPublicada() { return TopicBuilder.name(TOPIC_TAREA_PUBLICADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic tareaEntregada() { return TopicBuilder.name(TOPIC_TAREA_ENTREGADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic tareaCalificada() { return TopicBuilder.name(TOPIC_TAREA_CALIFICADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic tareaRecordatorio() { return TopicBuilder.name(TOPIC_TAREA_RECORDATORIO).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic materialPublicado() { return TopicBuilder.name(TOPIC_MATERIAL_PUBLICADO).partitions(3).replicas(1).build(); }
}
```

---

## 40. `KafkaErrorHandlingConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/KafkaErrorHandlingConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

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

## 41. `MinioConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/MinioConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

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

    @Value("${app.minio.bucket-entregas:tareas-entregas}")
    private String bucketEntregas;

    @Bean
    public MinioClient minioClient() {
        MinioClient client = MinioClient.builder()
            .endpoint(endpoint)
            .credentials(accessKey, secretKey)
            .build();

        try {
            boolean exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucketEntregas).build());
            if (!exists) {
                client.makeBucket(MakeBucketArgs.builder().bucket(bucketEntregas).build());
                log.info("Bucket creado en MinIO: {}", bucketEntregas);
            }
        } catch (Exception e) {
            log.warn("No se pudo verificar/crear el bucket {} en MinIO (puede ser creado externamente): {}", bucketEntregas, e.getMessage());
        }

        return client;
    }
}
```

---

## 42. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

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
                .title("EduSpace - Tareas Microservice API")
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

## 43. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

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

                // Materiales del curso: el docente sube y borra; los demás los ven si participan (filtro fino en el servicio)
                .requestMatchers(HttpMethod.POST, "/api/v1/tareas/materiales", "/api/v1/tareas/materiales/archivo-url").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/tareas/materiales/*").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/tareas/materiales", "/api/v1/tareas/materiales/*/url").authenticated()

                // Alumno / apoderado
                .requestMatchers(HttpMethod.GET, "/api/v1/tareas/mias", "/api/v1/tareas/mias/pendientes").hasAnyRole("ALUMNO", "APODERADO")
                .requestMatchers(HttpMethod.POST, "/api/v1/tareas/*/entregas", "/api/v1/tareas/*/entregas/archivo-url").hasRole("ALUMNO")

                // Docente
                .requestMatchers(HttpMethod.POST, "/api/v1/tareas", "/api/v1/tareas/*/adjuntos/url").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/tareas/*").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/v1/tareas/*/publicar", "/api/v1/tareas/*/cerrar", "/api/v1/tareas/*/calificaciones",
                    "/api/v1/tareas/entregas/*/calificar", "/api/v1/tareas/entregas/*/devolver").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/tareas/*/entregas").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/tareas").hasAnyRole("DOCENTE", "SECRETARIA", "ADMIN")

                // Detalle y descargas: participantes (filtro fino en el controlador)
                .requestMatchers(HttpMethod.GET, "/api/v1/tareas/*", "/api/v1/tareas/*/adjuntos/*/url",
                    "/api/v1/tareas/entregas/*/archivos/*/url").authenticated()
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

## 44. `ShedLockConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/ShedLockConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.tareas.config;

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

## 45. `TareasProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/config/TareasProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.upeu.eduspace.tareas.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.tareas")
public class TareasProperties {

    private int archivoMaxMb = 10;
    private int entregaMaxMb = 25;
    private int maxArchivosEntrega = 5;
    private List<String> tiposArchivo = List.of("application/pdf", "image/jpeg", "image/png", "application/zip", "text/plain");
}
```

---

## 46. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.tareas.exception;

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

## 47. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.upeu.eduspace.tareas.exception;

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

## 48. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.tareas.exception;

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

## 49. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.tareas.exception;

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

## 50. `ServicioNoDisponibleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/exception/ServicioNoDisponibleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.tareas.exception;

/** Un servicio del que depende la operación no responde (se mapea a 503). */
public class ServicioNoDisponibleException extends RuntimeException {
    public ServicioNoDisponibleException(String mensaje) {
        super(mensaje);
    }
}
```

---

## 51. `AlumnosClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/AlumnosClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.tareas.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/** Contrato interno de alumnos-ms (adenda A3). */
@FeignClient(name = "alumnos-ms")
public interface AlumnosClient {

    @GetMapping("/internal/alumnos/usuario/{usuarioId}")
    AlumnoUsuario alumnoDeUsuario(@PathVariable("usuarioId") Long usuarioId);

    @GetMapping("/internal/apoderados/usuario/{usuarioId}/alumnos")
    List<Hijo> hijosDeUsuario(@PathVariable("usuarioId") Long usuarioId);

    record AlumnoUsuario(Long alumnoId) {}

    record Hijo(Long alumnoId, String codigo, String nombreCompleto, String estado, String parentesco) {}
}
```

---

## 52. `AlumnosGateway.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/AlumnosGateway.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `tareas-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.tareas.client;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.tareas.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.tareas.exception.ServicioNoDisponibleException;

import java.util.Collections;
import java.util.List;

/** alumnos-ms con circuit breaker: sin validar al alumno no se puede matricular (503). */
@Slf4j
@Service
@RequiredArgsConstructor
public class AlumnosGateway {

    private final AlumnosClient client;

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
    @org.springframework.cache.annotation.Cacheable(value = pe.edu.upeu.eduspace.tareas.config.CacheConfig.CACHE_HIJOS, key = "#usuarioId")
    public List<AlumnosClient.Hijo> hijosDeUsuario(Long usuarioId) {
        try {
            return client.hijosDeUsuario(usuarioId);
        } catch (FeignException.NotFound e) {
            return Collections.emptyList();
        }
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

## 53. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.upeu.eduspace.tareas.filter;

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

## 54. `IdentidadService.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/security/IdentidadService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Identidad`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.tareas.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.tareas.client.AlumnosClient;
import pe.edu.upeu.eduspace.tareas.client.AlumnosGateway;

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

    public boolean esAdmin(Jwt jwt) {
        return roles(jwt).contains("ADMIN");
    }

    public boolean esDocente(Jwt jwt) {
        return roles(jwt).contains("DOCENTE");
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

## 55. `MatriculaClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/MatriculaClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.tareas.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/** Carga inicial de la réplica cuando una sección aún no tiene alumnos locales. */
@FeignClient(name = "matricula-ms")
public interface MatriculaClient {

    @GetMapping("/internal/matriculas/seccion/{seccionId}")
    List<MatriculaInterna> deSeccion(@PathVariable("seccionId") Long seccionId);

    record MatriculaInterna(Long matriculaId, Long alumnoId, String alumnoNombre, Long anioId, Long nivelId,
                            Long gradoId, Long seccionId, String estado, String tipo) {}
}
```

---

## 56. `PlanificacionClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/PlanificacionClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.tareas.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

/** Contrato interno de planificacion-ms (adenda A2). */
@FeignClient(name = "planificacion-ms")
public interface PlanificacionClient {

    @GetMapping("/internal/docentes/usuario/{usuarioId}")
    Docente docentePorUsuario(@PathVariable("usuarioId") Long usuarioId);

    @GetMapping("/internal/asignaciones/validar")
    Boolean validarAsignacion(@RequestParam("docenteId") Long docenteId, @RequestParam("seccionId") Long seccionId,
                              @RequestParam("cursoId") Long cursoId);

    @GetMapping("/internal/secciones/{id}")
    Seccion seccion(@PathVariable("id") Long id);

    @GetMapping("/internal/periodos/{id}")
    Periodo periodo(@PathVariable("id") Long id);

    @GetMapping("/internal/cursos/{id}")
    Curso curso(@PathVariable("id") Long id);

    record Docente(Long docenteId, String nombre, String estado) {}

    record Seccion(Long id, String nombre, Long gradoId, Long nivelId, Long anioId, Short capacidad, String turno,
                   Long tutorDocenteId) {}

    record Periodo(Long id, Long anioId, Short numero, String nombre, LocalDate fechaInicio, LocalDate fechaFin, String estado) {}

    record Curso(Long id, String codigo, String nombre, String area, Boolean activo) {}
}
```

---

## 57. `PlanificacionGateway.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/client/PlanificacionGateway.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `tareas-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.tareas.client;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.tareas.config.CacheConfig;
import pe.edu.upeu.eduspace.tareas.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.tareas.exception.ServicioNoDisponibleException;

/** planificacion-ms con circuit breaker y caché; el fallback de autorización es DENEGAR. */
@Slf4j
@Service
@RequiredArgsConstructor
public class PlanificacionGateway {

    private final PlanificacionClient client;

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "docenteFallback")
    @Cacheable(value = CacheConfig.CACHE_DOCENTE, key = "#usuarioId", unless = "#result == null")
    public PlanificacionClient.Docente docentePorUsuario(Long usuarioId) {
        try {
            return client.docentePorUsuario(usuarioId);
        } catch (FeignException.NotFound e) {
            return null;
        }
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "validarFallback")
    @Cacheable(value = CacheConfig.CACHE_ASIGNACIONES, key = "#docenteId + ':' + #seccionId + ':' + #cursoId")
    public boolean asignacionValida(Long docenteId, Long seccionId, Long cursoId) {
        return Boolean.TRUE.equals(client.validarAsignacion(docenteId, seccionId, cursoId));
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "seccionFallback")
    public PlanificacionClient.Seccion seccion(Long id) {
        try {
            return client.seccion(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Sección no encontrada: " + id);
        }
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "periodoFallback")
    @Cacheable(value = CacheConfig.CACHE_PERIODOS, key = "#id")
    public PlanificacionClient.Periodo periodo(Long id) {
        try {
            return client.periodo(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Periodo no encontrado: " + id);
        }
    }

    /** Solo informativo (notificaciones): si falla devuelve null. */
    public String nombreCursoOpcional(Long cursoId) {
        try {
            PlanificacionClient.Curso c = client.curso(cursoId);
            return c == null ? null : c.nombre();
        } catch (Exception e) {
            log.debug("Sin nombre de curso {}: {}", cursoId, e.getMessage());
            return null;
        }
    }

    PlanificacionClient.Docente docenteFallback(Long usuarioId, Throwable t) { throw caido(t); }

    boolean validarFallback(Long docenteId, Long seccionId, Long cursoId, Throwable t) { throw caido(t); }

    PlanificacionClient.Seccion seccionFallback(Long id, Throwable t) { throw caido(t); }

    PlanificacionClient.Periodo periodoFallback(Long id, Throwable t) { throw caido(t); }

    private RuntimeException caido(Throwable t) {
        if (t instanceof ResourceNotFoundException r) return r;
        log.warn("planificacion-ms no disponible: {}", t.toString());
        return new ServicioNoDisponibleException("No se puede validar con planificacion-ms en este momento; intente nuevamente.");
    }
}
```

---

## 58. `TareasApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/TareasApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.upeu.eduspace.tareas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;
import pe.edu.upeu.eduspace.tareas.config.TareasProperties;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties(TareasProperties.class)
public class TareasApplication {

    public static void main(String[] args) {
        SpringApplication.run(TareasApplication.class, args);
    }
}
```

---

