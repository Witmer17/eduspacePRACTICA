# 📘 CÓDIGO COMPLETO — `asistencia-ms`

> **Microservicio:** `asistencia-ms`  
> **Puerto:** `8094`  
> **Base de datos:** `eduspace_asistencia`  
> **Propósito:** Control de asistencia diaria de alumnos. Registra el estado de asistencia (PRESENTE, TARDANZA, FALTA, JUSTIFICADO) por alumno y día, calcula porcentajes de asistencia por periodo y genera reportes estadísticos para docentes y directivos.  
> **Total de clases incluidas:** 54 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `AsistenciaAuditoria.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/AsistenciaAuditoria.java`
- 2. `AsistenciaDetalle.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/AsistenciaDetalle.java`
- 3. `EventoProcesado.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/EventoProcesado.java`
- 4. `Justificacion.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/Justificacion.java`
- 5. `MatriculaLocal.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/MatriculaLocal.java`
- 6. `SesionAsistencia.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/SesionAsistencia.java`

### Repositorios Spring Data JPA

- 7. `AuditoriaRepository.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/AuditoriaRepository.java`
- 8. `DetalleRepository.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/DetalleRepository.java`
- 9. `EventoProcesadoRepository.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/EventoProcesadoRepository.java`
- 10. `JustificacionRepository.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/JustificacionRepository.java`
- 11. `MatriculaLocalRepository.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/MatriculaLocalRepository.java`
- 12. `SesionRepository.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/SesionRepository.java`

### DTOs (Data Transfer Objects)

- 13. `Dtos.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/dto/Dtos.java`
- 14. `PageResponse.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/dto/PageResponse.java`

### Servicios y Lógica de Negocio

- 15. `ArchivoService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/ArchivoService.java`
- 16. `CierreSesionService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/CierreSesionService.java`
- 17. `CorreccionService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/CorreccionService.java`
- 18. `JustificacionService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/JustificacionService.java`
- 19. `MatriculaLocalService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/MatriculaLocalService.java`
- 20. `MatriculaNombres.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/MatriculaNombres.java`
- 21. `RegistroAsistenciaService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/RegistroAsistenciaService.java`
- 22. `ReporteService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/ReporteService.java`
- 23. `SesionService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/SesionService.java`

### Controladores REST API

- 24. `AsistenciaController.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/controller/AsistenciaController.java`

### Mensajería Kafka

- 25. `AsistenciaEventProducer.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/messaging/AsistenciaEventProducer.java`
- 26. `MatriculaEventConsumer.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/messaging/MatriculaEventConsumer.java`

### Eventos de Dominio

- 27. `AsistenciaFaltaRegistradaEvent.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/AsistenciaFaltaRegistradaEvent.java`
- 28. `EventoSobre.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/EventoSobre.java`
- 29. `JustificacionResueltaEvent.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/JustificacionResueltaEvent.java`
- 30. `MatriculaEvent.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/MatriculaEvent.java`

### Tareas Programadas (Schedulers)

- 31. `CierreNocturnoJob.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/scheduler/CierreNocturnoJob.java`
- 32. `LimpiezaJob.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/scheduler/LimpiezaJob.java`

### Configuración Spring Boot

- 33. `AsistenciaProperties.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/AsistenciaProperties.java`
- 34. `CacheConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/CacheConfig.java`
- 35. `FeignConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/FeignConfig.java`
- 36. `KafkaConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/KafkaConfig.java`
- 37. `KafkaErrorHandlingConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/KafkaErrorHandlingConfig.java`
- 38. `MinioConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/MinioConfig.java`
- 39. `OpenApiConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/OpenApiConfig.java`
- 40. `SecurityConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/SecurityConfig.java`
- 41. `ShedLockConfig.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/ShedLockConfig.java`

### Manejo de Excepciones

- 42. `BusinessRuleException.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/BusinessRuleException.java`
- 43. `ErrorResponse.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/ErrorResponse.java`
- 44. `GlobalExceptionHandler.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/GlobalExceptionHandler.java`
- 45. `ResourceNotFoundException.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/ResourceNotFoundException.java`
- 46. `ServicioNoDisponibleException.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/ServicioNoDisponibleException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 47. `AlumnosClient.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/AlumnosClient.java`
- 48. `AlumnosGateway.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/AlumnosGateway.java`
- 49. `CorrelationIdFilter.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/filter/CorrelationIdFilter.java`
- 50. `IdentidadService.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/security/IdentidadService.java`
- 51. `MatriculaClient.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/MatriculaClient.java`
- 52. `PlanificacionClient.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/PlanificacionClient.java`
- 53. `PlanificacionGateway.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/PlanificacionGateway.java`

### Clase Principal de Arranque

- 54. `AsistenciaApplication.java` — `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/AsistenciaApplication.java`

---

## 1. `AsistenciaAuditoria.java` — Entidades JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/AsistenciaAuditoria.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `asistencia-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.asistencia.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "asistencia_auditoria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsistenciaAuditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "detalle_id", nullable = false)
    private Long detalleId;

    @Column(name = "estado_anterior", length = 11)
    private String estadoAnterior;

    @Column(name = "estado_nuevo", nullable = false, length = 11)
    private String estadoNuevo;

    @Column(length = 300)
    private String motivo;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Builder.Default
    @Column(name = "cambiado_en", nullable = false)
    private LocalDateTime cambiadoEn = LocalDateTime.now();
}
```

---

## 2. `AsistenciaDetalle.java` — Entidades JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/AsistenciaDetalle.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `asistencia-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.asistencia.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "asistencia_detalle")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsistenciaDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sesion_id", nullable = false)
    private SesionAsistencia sesion;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(nullable = false, length = 11)
    private String estado;

    @Column(name = "minutos_tarde")
    private Short minutosTarde;

    @Column(length = 300)
    private String observacion;

    @Builder.Default
    @Column(name = "registrado_en", nullable = false)
    private LocalDateTime registradoEn = LocalDateTime.now();

    @Builder.Default
    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();

    @Builder.Default
    @Column(nullable = false)
    private Boolean confirmado = false;

    @Builder.Default
    @Column(name = "falta_notificada", nullable = false)
    private Boolean faltaNotificada = false;
}
```

---

## 3. `EventoProcesado.java` — Entidades JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/EventoProcesado.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.asistencia.entity;

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

## 4. `Justificacion.java` — Entidades JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/Justificacion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `asistencia-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.asistencia.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "justificaciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Justificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(name = "fecha_desde", nullable = false)
    private LocalDate fechaDesde;

    @Column(name = "fecha_hasta", nullable = false)
    private LocalDate fechaHasta;

    @Column(nullable = false, length = 10)
    private String tipo;

    @Column(nullable = false, length = 500)
    private String motivo;

    @Column(name = "ruta_archivo", length = 400)
    private String rutaArchivo;

    @Builder.Default
    @Column(nullable = false, length = 10)
    private String estado = "PENDIENTE";

    @Column(name = "solicitado_por", nullable = false)
    private Long solicitadoPor;

    @Column(name = "resuelto_por")
    private Long resueltoPor;

    @Column(name = "resuelto_en")
    private LocalDateTime resueltoEn;

    @Column(name = "comentario_resolucion", length = 300)
    private String comentarioResolucion;

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
}
```

---

## 5. `MatriculaLocal.java` — Entidades JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/MatriculaLocal.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `asistencia-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.asistencia.entity;

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

## 6. `SesionAsistencia.java` — Entidades JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/entity/SesionAsistencia.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `asistencia-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.asistencia.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "sesiones_asistencia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SesionAsistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "anio_id", nullable = false)
    private Long anioId;

    @Column(name = "periodo_id")
    private Long periodoId;

    @Column(name = "seccion_id", nullable = false)
    private Long seccionId;

    @Column(nullable = false)
    private LocalDate fecha;

    @Builder.Default
    @Column(nullable = false, length = 6)
    private String tipo = "DIA";

    @Column(name = "curso_id")
    private Long cursoId;

    @Column(name = "bloque_id")
    private Long bloqueId;

    @Column(name = "docente_id", nullable = false)
    private Long docenteId;

    @Builder.Default
    @Column(nullable = false, length = 8)
    private String estado = "ABIERTA";

    @Column(name = "abierta_por")
    private Long abiertaPor;

    @Builder.Default
    @Column(name = "creada_en", nullable = false)
    private LocalDateTime creadaEn = LocalDateTime.now();

    @Column(name = "cerrada_en")
    private LocalDateTime cerradaEn;

    @Column(name = "cerrada_por")
    private Long cerradaPor;
}
```

---

## 7. `AuditoriaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/AuditoriaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Auditoria`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.asistencia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaAuditoria;

import java.util.List;

public interface AuditoriaRepository extends JpaRepository<AsistenciaAuditoria, Long> {

    List<AsistenciaAuditoria> findByDetalleIdOrderByCambiadoEnDesc(Long detalleId);
}
```

---

## 8. `DetalleRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/DetalleRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Detalle`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.asistencia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaDetalle;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DetalleRepository extends JpaRepository<AsistenciaDetalle, Long> {

    List<AsistenciaDetalle> findBySesionIdOrderByIdAsc(Long sesionId);

    Optional<AsistenciaDetalle> findBySesionIdAndMatriculaId(Long sesionId, Long matriculaId);

    @Query("""
        SELECT d FROM AsistenciaDetalle d JOIN FETCH d.sesion s
        WHERE d.alumnoId = :alumnoId AND s.fecha BETWEEN :desde AND :hasta
        ORDER BY s.fecha DESC, d.id DESC
        """)
    List<AsistenciaDetalle> delAlumnoEnRango(@Param("alumnoId") Long alumnoId, @Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);

    @Query("""
        SELECT d FROM AsistenciaDetalle d JOIN FETCH d.sesion s
        WHERE s.seccionId = :seccionId AND s.fecha BETWEEN :desde AND :hasta
        """)
    List<AsistenciaDetalle> deSeccionEnRango(@Param("seccionId") Long seccionId, @Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);

    /** Faltas de una matrícula dentro de un rango, para convertirlas en JUSTIFICADO. */
    @Query("""
        SELECT d FROM AsistenciaDetalle d JOIN FETCH d.sesion s
        WHERE d.matriculaId = :matriculaId AND d.estado = 'FALTA' AND s.fecha BETWEEN :desde AND :hasta
        """)
    List<AsistenciaDetalle> faltasDeMatriculaEnRango(@Param("matriculaId") Long matriculaId, @Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);
}
```

---

## 9. `EventoProcesadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/EventoProcesadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EventoProcesado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.asistencia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.asistencia.entity.EventoProcesado;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface EventoProcesadoRepository extends JpaRepository<EventoProcesado, UUID> {

    boolean existsByEventId(UUID eventId);

    long deleteByProcesadoEnBefore(LocalDateTime fechaLimite);
}
```

---

## 10. `JustificacionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/JustificacionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Justificacion`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.asistencia.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.asistencia.entity.Justificacion;

import java.util.Collection;
import java.util.List;

public interface JustificacionRepository extends JpaRepository<Justificacion, Long> {

    Page<Justificacion> findByEstadoOrderByCreadoEnAsc(String estado, Pageable pageable);

    Page<Justificacion> findAllByOrderByCreadoEnDesc(Pageable pageable);

    List<Justificacion> findByAlumnoIdInOrderByCreadoEnDesc(Collection<Long> alumnoIds);
}
```

---

## 11. `MatriculaLocalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/MatriculaLocalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `MatriculaLocal`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.asistencia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.asistencia.entity.MatriculaLocal;

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

## 12. `SesionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/repository/SesionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Sesion`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.asistencia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.asistencia.entity.SesionAsistencia;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SesionRepository extends JpaRepository<SesionAsistencia, Long> {

    @Query("""
        SELECT s FROM SesionAsistencia s
        WHERE s.seccionId = :seccionId AND s.fecha = :fecha AND s.tipo = :tipo
          AND ((:cursoId IS NULL AND s.cursoId IS NULL) OR s.cursoId = :cursoId)
          AND ((:bloqueId IS NULL AND s.bloqueId IS NULL) OR s.bloqueId = :bloqueId)
        """)
    Optional<SesionAsistencia> buscarUnica(@Param("seccionId") Long seccionId, @Param("fecha") LocalDate fecha,
                                           @Param("tipo") String tipo, @Param("cursoId") Long cursoId,
                                           @Param("bloqueId") Long bloqueId);

    List<SesionAsistencia> findBySeccionIdAndFechaOrderByTipoAscIdAsc(Long seccionId, LocalDate fecha);

    List<SesionAsistencia> findByEstadoAndFechaBefore(String estado, LocalDate fecha);
}
```

---

## 13. `Dtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/dto/Dtos.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `Dtos`.

```java
package pe.edu.upeu.eduspace.asistencia.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public final class Dtos {

    private Dtos() {}

    public record SesionCreateRequest(
        @NotNull(message = "seccionId es obligatorio") Long seccionId,
        @NotNull(message = "fecha es obligatoria") LocalDate fecha,
        @NotBlank(message = "tipo es obligatorio") @Pattern(regexp = "DIA|CURSO", message = "tipo debe ser DIA o CURSO") String tipo,
        Long cursoId,
        Long bloqueId,
        Long docenteId) {}

    public record ItemRegistro(
        @NotNull(message = "matriculaId es obligatorio") Long matriculaId,
        @NotBlank(message = "estado es obligatorio") @Pattern(regexp = "PRESENTE|FALTA|TARDANZA", message = "estado debe ser PRESENTE, FALTA o TARDANZA") String estado,
        @Min(value = 1, message = "minutosTarde debe ser mayor a 0") Short minutosTarde,
        @Size(max = 300) String observacion) {}

    public record RegistroAsistenciaRequest(@NotEmpty(message = "Debe incluir al menos un alumno") @Valid List<ItemRegistro> items) {}

    public record CorreccionRequest(
        @NotBlank @Pattern(regexp = "PRESENTE|FALTA|TARDANZA|JUSTIFICADO", message = "estado inválido") String estado,
        @Min(1) Short minutosTarde,
        @NotBlank(message = "El motivo es obligatorio") @Size(max = 300) String motivo) {}

    public record DetalleResponse(Long detalleId, Long matriculaId, Long alumnoId, String alumnoNombre, String estado,
                                  Short minutosTarde, String observacion, boolean confirmado) {}

    public record SesionResponse(Long id, Long anioId, Long periodoId, Long seccionId, LocalDate fecha, String tipo,
                                 Long cursoId, Long bloqueId, Long docenteId, String estado, LocalDateTime cerradaEn,
                                 List<DetalleResponse> alumnos) {}

    public record JustificacionRequest(
        @NotNull Long alumnoId,
        @NotNull LocalDate fechaDesde,
        @NotNull LocalDate fechaHasta,
        @NotBlank @Pattern(regexp = "MEDICA|FAMILIAR|OTRO", message = "tipo debe ser MEDICA, FAMILIAR u OTRO") String tipo,
        @NotBlank @Size(max = 500) String motivo) {}

    public record ResolverJustificacionRequest(
        @NotBlank @Pattern(regexp = "APROBADA|RECHAZADA", message = "resolucion debe ser APROBADA o RECHAZADA") String resolucion,
        @Size(max = 300) String comentario) {}

    public record JustificacionResponse(Long id, Long matriculaId, Long alumnoId, LocalDate fechaDesde, LocalDate fechaHasta,
                                        String tipo, String motivo, String rutaArchivo, String estado, Long solicitadoPor,
                                        Long resueltoPor, LocalDateTime resueltoEn, String comentarioResolucion,
                                        LocalDateTime creadoEn, int faltasJustificadas) {}

    public record ArchivoUrlRequest(@NotBlank String nombreArchivo, @NotBlank String contentType) {}

    public record ArchivoUrlResponse(String uploadUrl, String ruta, int expiraMinutos) {}

    public record ConteoAsistencia(int sesiones, int presentes, int faltas, int tardanzas, int justificadas, double porcentajeAsistencia) {}

    public record ResumenAlumnoResponse(Long alumnoId, LocalDate desde, LocalDate hasta, Long periodoId,
                                        ConteoAsistencia dias, ConteoAsistencia cursos) {}

    public record FilaReporte(Long alumnoId, Long matriculaId, String alumnoNombre, ConteoAsistencia dias, boolean excesoFaltas) {}

    public record ReporteSeccionResponse(Long seccionId, LocalDate desde, LocalDate hasta, int totalAlumnos,
                                         List<FilaReporte> alumnos, List<FilaReporte> alertasExcesoFaltas) {}

    public record AsistenciaHijoResponse(Long alumnoId, String alumnoNombre, ResumenAlumnoResponse resumen, List<DetalleDia> ultimos) {}

    public record DetalleDia(LocalDate fecha, String tipo, Long cursoId, String estado, Short minutosTarde) {}
}
```

---

## 14. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Page`.

```java
package pe.edu.upeu.eduspace.asistencia.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public record PageResponse<T>(List<T> contenido, int pagina, int tamano, long totalElementos, int totalPaginas) {

    public static <T> PageResponse<T> from(Page<T> p) {
        return new PageResponse<>(p.getContent(), p.getNumber(), p.getSize(), p.getTotalElements(), p.getTotalPages());
    }
}
```

---

## 15. `ArchivoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/ArchivoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Archivo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.asistencia.config.AsistenciaProperties;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.ArchivoUrlResponse;
import pe.edu.upeu.eduspace.asistencia.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.asistencia.exception.ServicioNoDisponibleException;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/** URLs firmadas de MinIO para subir y descargar el sustento de una justificación. */
@Slf4j
@Service
@RequiredArgsConstructor
public class ArchivoService {

    private static final int EXPIRA_MIN = 15;
    private static final Map<String, String> EXTENSION_POR_TIPO = Map.of(
        "application/pdf", "pdf", "image/jpeg", "jpg", "image/png", "png");

    private final MinioClient minio;
    private final AsistenciaProperties props;

    @Value("${app.minio.bucket-justificaciones:justificaciones}")
    private String bucket;

    /** Valida tipo antes de firmar y devuelve URL de subida (PUT) + la ruta a guardar. */
    public ArchivoUrlResponse urlSubida(Long justificacionId, String nombreArchivo, String contentType) {
        if (!props.getTiposArchivo().contains(contentType)) {
            throw new BusinessRuleException("Tipo de archivo no permitido: " + contentType + ". Permitidos: " + props.getTiposArchivo());
        }
        String ruta = "justificaciones/" + justificacionId + "/" + UUID.randomUUID() + "-" + sanear(nombreArchivo, contentType);
        try {
            String url = minio.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .method(Method.PUT).bucket(bucket).object(ruta).expiry(EXPIRA_MIN, TimeUnit.MINUTES).build());
            return new ArchivoUrlResponse(url, ruta, EXPIRA_MIN);
        } catch (Exception e) {
            log.error("No se pudo firmar URL de subida: {}", e.getMessage());
            throw new ServicioNoDisponibleException("El almacenamiento de archivos no está disponible.");
        }
    }

    public String urlDescarga(String ruta) {
        try {
            return minio.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .method(Method.GET).bucket(bucket).object(ruta).expiry(EXPIRA_MIN, TimeUnit.MINUTES).build());
        } catch (Exception e) {
            log.error("No se pudo firmar URL de descarga: {}", e.getMessage());
            throw new ServicioNoDisponibleException("El almacenamiento de archivos no está disponible.");
        }
    }

    static String sanear(String nombre, String contentType) {
        String base = nombre == null ? "archivo" : nombre.replaceAll(".*[\\\\/]", "");
        base = base.replaceAll("[^A-Za-z0-9._-]", "_");
        if (base.length() > 80) base = base.substring(base.length() - 80);
        String ext = EXTENSION_POR_TIPO.getOrDefault(contentType, "bin");
        return base.toLowerCase().endsWith("." + ext) ? base : base + "." + ext;
    }
}
```

---

## 16. `CierreSesionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/CierreSesionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `CierreSesion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.asistencia.config.AsistenciaProperties;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.SesionResponse;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaDetalle;
import pe.edu.upeu.eduspace.asistencia.entity.SesionAsistencia;
import pe.edu.upeu.eduspace.asistencia.repository.DetalleRepository;
import pe.edu.upeu.eduspace.asistencia.repository.SesionRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CierreSesionService {

    private final SesionService sesionService;
    private final SesionRepository sesionRepo;
    private final DetalleRepository detalleRepo;
    private final RegistroAsistenciaService registro;
    private final AsistenciaProperties props;

    /** Cierre manual por el docente dueño (o ADMIN). Cerrar una sesión ya cerrada es idempotente. */
    @Transactional
    public SesionResponse cerrar(Long sesionId, Long usuarioId, boolean esAdmin) {
        SesionAsistencia s = sesionService.obtener(sesionId);
        sesionService.exigirDocenteDe(s, usuarioId, esAdmin);
        cerrarInterno(s, usuarioId, false);
        return sesionService.hoja(sesionId);
    }

    /** Job nocturno: cierra las sesiones ABIERTAS de días anteriores. Devuelve cuántas cerró. */
    @Transactional
    public int cerrarVencidas() {
        List<SesionAsistencia> abiertas = sesionRepo.findByEstadoAndFechaBefore("ABIERTA", LocalDate.now());
        for (SesionAsistencia s : abiertas) {
            cerrarInterno(s, null, props.isMarcarFaltaSinRegistro());
        }
        if (!abiertas.isEmpty()) log.info("Cierre nocturno: {} sesión(es) cerradas", abiertas.size());
        return abiertas.size();
    }

    private void cerrarInterno(SesionAsistencia s, Long usuarioId, boolean faltaSiNoRegistro) {
        if ("CERRADA".equals(s.getEstado())) return;
        if (faltaSiNoRegistro) {
            for (AsistenciaDetalle d : detalleRepo.findBySesionIdOrderByIdAsc(s.getId())) {
                if (!Boolean.TRUE.equals(d.getConfirmado()) && "PRESENTE".equals(d.getEstado())) {
                    d.setEstado("FALTA");
                    d.setActualizadoEn(LocalDateTime.now());
                    d = detalleRepo.save(d);
                    registro.notificarFaltaSiCorresponde(s, d);
                }
            }
        }
        s.setEstado("CERRADA");
        s.setCerradaEn(LocalDateTime.now());
        s.setCerradaPor(usuarioId);
        sesionRepo.save(s);
    }
}
```

---

## 17. `CorreccionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/CorreccionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Correccion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.CorreccionRequest;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.DetalleResponse;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaAuditoria;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaDetalle;
import pe.edu.upeu.eduspace.asistencia.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.asistencia.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.asistencia.repository.AuditoriaRepository;
import pe.edu.upeu.eduspace.asistencia.repository.DetalleRepository;

import java.time.LocalDateTime;

/** Corrección de una asistencia ya registrada (también en sesión cerrada): solo ADMIN/SECRETARIA, con motivo y auditoría. */
@Service
@RequiredArgsConstructor
public class CorreccionService {

    private final DetalleRepository detalleRepo;
    private final AuditoriaRepository auditoriaRepo;
    private final RegistroAsistenciaService registro;
    private final MatriculaNombres nombres;

    @Transactional
    public DetalleResponse corregir(Long detalleId, CorreccionRequest req, Long usuarioId) {
        AsistenciaDetalle d = detalleRepo.findById(detalleId)
            .orElseThrow(() -> new ResourceNotFoundException("Detalle de asistencia no encontrado: " + detalleId));
        if ("TARDANZA".equals(req.estado()) && (req.minutosTarde() == null || req.minutosTarde() <= 0)) {
            throw new BusinessRuleException("La tardanza requiere minutosTarde > 0.");
        }
        String anterior = d.getEstado();
        if (anterior.equals(req.estado()) && java.util.Objects.equals(d.getMinutosTarde(), "TARDANZA".equals(req.estado()) ? req.minutosTarde() : null)) {
            throw new BusinessRuleException("La corrección no cambia el estado actual (" + anterior + ").");
        }
        d.setEstado(req.estado());
        d.setMinutosTarde("TARDANZA".equals(req.estado()) ? req.minutosTarde() : null);
        d.setConfirmado(true);
        d.setActualizadoEn(LocalDateTime.now());
        d = detalleRepo.save(d);
        auditoriaRepo.save(AsistenciaAuditoria.builder().detalleId(d.getId()).estadoAnterior(anterior)
            .estadoNuevo(req.estado()).motivo(req.motivo()).usuarioId(usuarioId).build());
        registro.notificarFaltaSiCorresponde(d.getSesion(), d);
        return new DetalleResponse(d.getId(), d.getMatriculaId(), d.getAlumnoId(), nombres.de(d.getMatriculaId(), d.getAlumnoId()),
            d.getEstado(), d.getMinutosTarde(), d.getObservacion(), true);
    }
}
```

---

## 18. `JustificacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/JustificacionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Justificacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.asistencia.config.KafkaConfig;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.*;
import pe.edu.upeu.eduspace.asistencia.dto.PageResponse;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaAuditoria;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaDetalle;
import pe.edu.upeu.eduspace.asistencia.entity.Justificacion;
import pe.edu.upeu.eduspace.asistencia.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.asistencia.event.JustificacionResueltaEvent;
import pe.edu.upeu.eduspace.asistencia.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.asistencia.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.asistencia.messaging.AsistenciaEventProducer;
import pe.edu.upeu.eduspace.asistencia.repository.AuditoriaRepository;
import pe.edu.upeu.eduspace.asistencia.repository.DetalleRepository;
import pe.edu.upeu.eduspace.asistencia.repository.JustificacionRepository;
import pe.edu.upeu.eduspace.asistencia.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.asistencia.security.IdentidadService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class JustificacionService {

    private static final int MAX_DIAS_RANGO = 31;

    private final JustificacionRepository repo;
    private final DetalleRepository detalleRepo;
    private final AuditoriaRepository auditoriaRepo;
    private final MatriculaLocalRepository matriculaRepo;
    private final AsistenciaEventProducer producer;
    private final ArchivoService archivos;
    private final IdentidadService identidad;

    /** El apoderado solo puede justificar a sus hijos. */
    @Transactional
    public JustificacionResponse solicitar(JustificacionRequest req, org.springframework.security.oauth2.jwt.Jwt jwt) {
        Long usuarioId = identidad.usuarioId(jwt);
        identidad.exigirAcceso(jwt, req.alumnoId());
        if (req.fechaHasta().isBefore(req.fechaDesde())) {
            throw new BusinessRuleException("fechaHasta no puede ser anterior a fechaDesde.");
        }
        if (req.fechaDesde().plusDays(MAX_DIAS_RANGO).isBefore(req.fechaHasta())) {
            throw new BusinessRuleException("El rango de una justificación no puede superar " + MAX_DIAS_RANGO + " días.");
        }
        MatriculaLocal m = matriculaRepo.findFirstByAlumnoIdAndEstadoOrderByAnioIdDesc(req.alumnoId(), "MATRICULADO")
            .orElseThrow(() -> new BusinessRuleException("El alumno no tiene una matrícula vigente."));
        Justificacion j = repo.save(Justificacion.builder().matriculaId(m.getMatriculaId()).alumnoId(req.alumnoId())
            .fechaDesde(req.fechaDesde()).fechaHasta(req.fechaHasta()).tipo(req.tipo()).motivo(req.motivo())
            .solicitadoPor(usuarioId).build());
        return toResponse(j, 0);
    }

    @Transactional
    public ArchivoUrlResponse urlArchivo(Long id, ArchivoUrlRequest req, org.springframework.security.oauth2.jwt.Jwt jwt) {
        Justificacion j = obtener(id);
        if (!j.getSolicitadoPor().equals(identidad.usuarioId(jwt))) {
            throw new AccessDeniedException("Solo quien solicitó la justificación puede adjuntar el archivo.");
        }
        if (!"PENDIENTE".equals(j.getEstado())) {
            throw new BusinessRuleException("La justificación ya fue resuelta; no admite archivos.");
        }
        ArchivoUrlResponse r = archivos.urlSubida(id, req.nombreArchivo(), req.contentType());
        j.setRutaArchivo(r.ruta());
        repo.save(j);
        return r;
    }

    @Transactional(readOnly = true)
    public String urlDescarga(Long id, org.springframework.security.oauth2.jwt.Jwt jwt) {
        Justificacion j = obtener(id);
        identidad.exigirAcceso(jwt, j.getAlumnoId());
        if (j.getRutaArchivo() == null) throw new ResourceNotFoundException("La justificación no tiene archivo adjunto.");
        return archivos.urlDescarga(j.getRutaArchivo());
    }

    @Transactional(readOnly = true)
    public PageResponse<JustificacionResponse> bandeja(String estado, Pageable pageable) {
        Page<Justificacion> page = estado == null || estado.isBlank()
            ? repo.findAllByOrderByCreadoEnDesc(pageable)
            : repo.findByEstadoOrderByCreadoEnAsc(estado.toUpperCase(), pageable);
        return PageResponse.from(page.map(j -> toResponse(j, 0)));
    }

    @Transactional(readOnly = true)
    public java.util.List<JustificacionResponse> delosAlumnos(Set<Long> alumnoIds) {
        if (alumnoIds.isEmpty()) return java.util.List.of();
        return repo.findByAlumnoIdInOrderByCreadoEnDesc(alumnoIds).stream().map(j -> toResponse(j, 0)).toList();
    }

    /** Aprobar convierte exactamente las FALTAS del rango en JUSTIFICADO (con auditoría) y avisa al apoderado. */
    @Transactional
    public JustificacionResponse resolver(Long id, ResolverJustificacionRequest req, Long usuarioId) {
        Justificacion j = obtener(id);
        if (!"PENDIENTE".equals(j.getEstado())) {
            throw new BusinessRuleException("La justificación ya fue " + j.getEstado().toLowerCase() + ".");
        }
        int convertidas = 0;
        if ("APROBADA".equals(req.resolucion())) {
            for (AsistenciaDetalle d : detalleRepo.faltasDeMatriculaEnRango(j.getMatriculaId(), j.getFechaDesde(), j.getFechaHasta())) {
                d.setEstado("JUSTIFICADO");
                d.setMinutosTarde(null);
                d.setActualizadoEn(LocalDateTime.now());
                detalleRepo.save(d);
                auditoriaRepo.save(AsistenciaAuditoria.builder().detalleId(d.getId()).estadoAnterior("FALTA")
                    .estadoNuevo("JUSTIFICADO").motivo("Justificación " + j.getId() + " aprobada").usuarioId(usuarioId).build());
                convertidas++;
            }
        }
        j.setEstado(req.resolucion());
        j.setResueltoPor(usuarioId);
        j.setResueltoEn(LocalDateTime.now());
        j.setComentarioResolucion(req.comentario());
        repo.save(j);
        producer.publicar(KafkaConfig.TOPIC_JUSTIFICACION_RESUELTA, String.valueOf(j.getId()),
            JustificacionResueltaEvent.builder().justificacionId(j.getId()).alumnoId(j.getAlumnoId())
                .matriculaId(j.getMatriculaId()).resultado(req.resolucion())
                .fechaDesde(j.getFechaDesde()).fechaHasta(j.getFechaHasta()).build());
        log.info("Justificación {} {} ({} falta(s) justificadas)", id, req.resolucion(), convertidas);
        return toResponse(j, convertidas);
    }

    private Justificacion obtener(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Justificación no encontrada: " + id));
    }

    private JustificacionResponse toResponse(Justificacion j, int convertidas) {
        return new JustificacionResponse(j.getId(), j.getMatriculaId(), j.getAlumnoId(), j.getFechaDesde(), j.getFechaHasta(),
            j.getTipo(), j.getMotivo(), j.getRutaArchivo(), j.getEstado(), j.getSolicitadoPor(), j.getResueltoPor(),
            j.getResueltoEn(), j.getComentarioResolucion(), j.getCreadoEn(), convertidas);
    }
}
```

---

## 19. `MatriculaLocalService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/MatriculaLocalService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `MatriculaLocal`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.asistencia.client.MatriculaClient;
import pe.edu.upeu.eduspace.asistencia.config.KafkaConfig;
import pe.edu.upeu.eduspace.asistencia.entity.EventoProcesado;
import pe.edu.upeu.eduspace.asistencia.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.asistencia.event.EventoSobre;
import pe.edu.upeu.eduspace.asistencia.event.MatriculaEvent;
import pe.edu.upeu.eduspace.asistencia.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.asistencia.repository.MatriculaLocalRepository;

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

## 20. `MatriculaNombres.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/MatriculaNombres.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `asistencia-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.asistencia.repository.MatriculaLocalRepository;

@Component
@RequiredArgsConstructor
public class MatriculaNombres {

    private final MatriculaLocalRepository repo;

    public String de(Long matriculaId, Long alumnoId) {
        return repo.findById(matriculaId).map(m -> m.getAlumnoNombre()).orElse("Alumno " + alumnoId);
    }
}
```

---

## 21. `RegistroAsistenciaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/RegistroAsistenciaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `RegistroAsistencia`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.asistencia.config.KafkaConfig;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.ItemRegistro;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.RegistroAsistenciaRequest;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.SesionResponse;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaDetalle;
import pe.edu.upeu.eduspace.asistencia.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.asistencia.entity.SesionAsistencia;
import pe.edu.upeu.eduspace.asistencia.event.AsistenciaFaltaRegistradaEvent;
import pe.edu.upeu.eduspace.asistencia.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.asistencia.messaging.AsistenciaEventProducer;
import pe.edu.upeu.eduspace.asistencia.repository.DetalleRepository;
import pe.edu.upeu.eduspace.asistencia.repository.MatriculaLocalRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegistroAsistenciaService {

    private final SesionService sesionService;
    private final DetalleRepository detalleRepo;
    private final MatriculaLocalRepository matriculaRepo;
    private final AsistenciaEventProducer producer;

    /** Guarda el lote de toda la sección en UNA transacción. La falta se notifica una sola vez por detalle. */
    @Transactional
    public SesionResponse registrar(Long sesionId, RegistroAsistenciaRequest req, Long usuarioId, boolean esAdmin) {
        SesionAsistencia s = sesionService.obtener(sesionId);
        sesionService.exigirDocenteDe(s, usuarioId, esAdmin);
        if ("CERRADA".equals(s.getEstado())) {
            throw new BusinessRuleException("La sesión está CERRADA; solo ADMIN/SECRETARIA pueden corregirla con motivo.");
        }
        Set<Long> vistos = new HashSet<>();
        for (ItemRegistro it : req.items()) {
            if (!vistos.add(it.matriculaId())) {
                throw new BusinessRuleException("La matrícula " + it.matriculaId() + " aparece repetida en el registro.");
            }
            validarItem(it);
            MatriculaLocal m = matriculaRepo.findById(it.matriculaId())
                .filter(x -> x.getSeccionId().equals(s.getSeccionId()))
                .orElseThrow(() -> new BusinessRuleException("La matrícula " + it.matriculaId() + " no pertenece a la sección de la sesión."));
            AsistenciaDetalle d = detalleRepo.findBySesionIdAndMatriculaId(sesionId, it.matriculaId())
                .orElseGet(() -> AsistenciaDetalle.builder().sesion(s).matriculaId(m.getMatriculaId()).alumnoId(m.getAlumnoId()).estado("PRESENTE").build());
            d.setEstado(it.estado());
            d.setMinutosTarde("TARDANZA".equals(it.estado()) ? it.minutosTarde() : null);
            d.setObservacion(it.observacion());
            d.setConfirmado(true);
            d.setActualizadoEn(LocalDateTime.now());
            d = detalleRepo.save(d);
            notificarFaltaSiCorresponde(s, d);
        }
        return sesionService.hoja(sesionId);
    }

    static void validarItem(ItemRegistro it) {
        if ("TARDANZA".equals(it.estado()) && (it.minutosTarde() == null || it.minutosTarde() <= 0)) {
            throw new BusinessRuleException("La tardanza de la matrícula " + it.matriculaId() + " requiere minutosTarde > 0.");
        }
    }

    /** Publica asistencia.falta-registrada solo la primera vez que el detalle queda en FALTA. */
    void notificarFaltaSiCorresponde(SesionAsistencia s, AsistenciaDetalle d) {
        if (!"FALTA".equals(d.getEstado()) || Boolean.TRUE.equals(d.getFaltaNotificada())) return;
        d.setFaltaNotificada(true);
        detalleRepo.save(d);
        producer.publicar(KafkaConfig.TOPIC_FALTA_REGISTRADA, String.valueOf(d.getId()),
            AsistenciaFaltaRegistradaEvent.builder().asistenciaId(s.getId()).asistenciaDetalleId(d.getId())
                .alumnoId(d.getAlumnoId()).matriculaId(d.getMatriculaId()).seccionId(s.getSeccionId()).fecha(s.getFecha()).build());
    }
}
```

---

## 22. `ReporteService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/ReporteService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Reporte`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.asistencia.client.PlanificacionClient;
import pe.edu.upeu.eduspace.asistencia.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.asistencia.config.AsistenciaProperties;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.*;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaDetalle;
import pe.edu.upeu.eduspace.asistencia.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.asistencia.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.asistencia.repository.DetalleRepository;
import pe.edu.upeu.eduspace.asistencia.repository.MatriculaLocalRepository;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/** Reportes: solo leen la BD local (siguen disponibles aunque planificacion-ms o alumnos-ms estén caídos). */
@Service
@RequiredArgsConstructor
public class ReporteService {

    private final DetalleRepository detalleRepo;
    private final MatriculaLocalRepository matriculaRepo;
    private final PlanificacionGateway planificacion;
    private final AsistenciaProperties props;

    @Transactional(readOnly = true)
    public ResumenAlumnoResponse resumenAlumno(Long alumnoId, Long periodoId, LocalDate desde, LocalDate hasta) {
        LocalDate d = desde, h = hasta;
        if (periodoId != null) {
            PlanificacionClient.Periodo p = planificacion.periodo(periodoId);
            d = p.fechaInicio();
            h = p.fechaFin();
        }
        if (d == null) d = LocalDate.now().withDayOfYear(1);
        if (h == null) h = LocalDate.now();
        if (h.isBefore(d)) throw new BusinessRuleException("El rango de fechas es inválido.");
        List<AsistenciaDetalle> detalles = detalleRepo.delAlumnoEnRango(alumnoId, d, h);
        return new ResumenAlumnoResponse(alumnoId, d, h, periodoId,
            contar(detalles.stream().filter(x -> "DIA".equals(x.getSesion().getTipo())).toList()),
            contar(detalles.stream().filter(x -> "CURSO".equals(x.getSesion().getTipo())).toList()));
    }

    @Transactional(readOnly = true)
    public ReporteSeccionResponse reporteSeccion(Long seccionId, LocalDate desde, LocalDate hasta) {
        LocalDate d = desde != null ? desde : LocalDate.now().withDayOfYear(1);
        LocalDate h = hasta != null ? hasta : LocalDate.now();
        if (h.isBefore(d)) throw new BusinessRuleException("El rango de fechas es inválido.");
        Map<Long, List<AsistenciaDetalle>> porMatricula = detalleRepo.deSeccionEnRango(seccionId, d, h).stream()
            .filter(x -> "DIA".equals(x.getSesion().getTipo()))
            .collect(Collectors.groupingBy(AsistenciaDetalle::getMatriculaId));
        Map<Long, MatriculaLocal> matriculas = matriculaRepo.findBySeccionId(seccionId).stream()
            .filter(m -> "MATRICULADO".equals(m.getEstado()))
            .collect(Collectors.toMap(MatriculaLocal::getMatriculaId, m -> m));
        List<FilaReporte> filas = new ArrayList<>();
        for (MatriculaLocal m : matriculas.values()) {
            ConteoAsistencia c = contar(porMatricula.getOrDefault(m.getMatriculaId(), List.of()));
            boolean exceso = c.sesiones() > 0 && (c.faltas() * 100.0 / c.sesiones()) > props.getLimiteInasistenciaPorcentaje();
            filas.add(new FilaReporte(m.getAlumnoId(), m.getMatriculaId(), m.getAlumnoNombre(), c, exceso));
        }
        filas.sort(Comparator.comparing(FilaReporte::alumnoNombre));
        return new ReporteSeccionResponse(seccionId, d, h, filas.size(), filas, filas.stream().filter(FilaReporte::excesoFaltas).toList());
    }

    @Transactional(readOnly = true)
    public List<AsistenciaHijoResponse> deAlumnos(Set<Long> alumnoIds) {
        if (alumnoIds.isEmpty()) return List.of();
        LocalDate h = LocalDate.now(), d = h.minusDays(30);
        Map<Long, String> nombres = matriculaRepo.findByAlumnoIdIn(alumnoIds).stream()
            .collect(Collectors.toMap(MatriculaLocal::getAlumnoId, MatriculaLocal::getAlumnoNombre, (a, b) -> a));
        List<AsistenciaHijoResponse> res = new ArrayList<>();
        for (Long alumnoId : alumnoIds) {
            ResumenAlumnoResponse resumen = resumenAlumno(alumnoId, null, h.withDayOfYear(1), h);
            List<DetalleDia> ultimos = detalleRepo.delAlumnoEnRango(alumnoId, d, h).stream()
                .map(x -> new DetalleDia(x.getSesion().getFecha(), x.getSesion().getTipo(), x.getSesion().getCursoId(), x.getEstado(), x.getMinutosTarde()))
                .toList();
            res.add(new AsistenciaHijoResponse(alumnoId, nombres.getOrDefault(alumnoId, "Alumno " + alumnoId), resumen, ultimos));
        }
        return res;
    }

    /** Presente/tardanza/justificado cuentan como asistencia; FALTA es inasistencia injustificada. */
    static ConteoAsistencia contar(List<AsistenciaDetalle> detalles) {
        int presentes = 0, faltas = 0, tardanzas = 0, justificadas = 0;
        for (AsistenciaDetalle x : detalles) {
            switch (x.getEstado()) {
                case "PRESENTE" -> presentes++;
                case "FALTA" -> faltas++;
                case "TARDANZA" -> tardanzas++;
                case "JUSTIFICADO" -> justificadas++;
                default -> { }
            }
        }
        int total = detalles.size();
        double pct = total == 0 ? 0 : Math.round((presentes + tardanzas + justificadas) * 10000.0 / total) / 100.0;
        return new ConteoAsistencia(total, presentes, faltas, tardanzas, justificadas, pct);
    }
}
```

---

## 23. `SesionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/service/SesionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Sesion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;
import pe.edu.upeu.eduspace.asistencia.client.PlanificacionClient;
import pe.edu.upeu.eduspace.asistencia.client.PlanificacionGateway;
import pe.edu.upeu.eduspace.asistencia.config.AsistenciaProperties;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.*;
import pe.edu.upeu.eduspace.asistencia.entity.AsistenciaDetalle;
import pe.edu.upeu.eduspace.asistencia.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.asistencia.entity.SesionAsistencia;
import pe.edu.upeu.eduspace.asistencia.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.asistencia.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.asistencia.repository.DetalleRepository;
import pe.edu.upeu.eduspace.asistencia.repository.MatriculaLocalRepository;
import pe.edu.upeu.eduspace.asistencia.repository.SesionRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SesionService {

    private final SesionRepository sesionRepo;
    private final DetalleRepository detalleRepo;
    private final MatriculaLocalRepository matriculaRepo;
    private final MatriculaLocalService matriculaLocalService;
    private final PlanificacionGateway planificacion;
    private final AsistenciaProperties props;
    private final TransactionTemplate tx;

    public SesionService(SesionRepository sesionRepo, DetalleRepository detalleRepo, MatriculaLocalRepository matriculaRepo,
                         MatriculaLocalService matriculaLocalService, PlanificacionGateway planificacion,
                         AsistenciaProperties props, PlatformTransactionManager txm) {
        this.sesionRepo = sesionRepo;
        this.detalleRepo = detalleRepo;
        this.matriculaRepo = matriculaRepo;
        this.matriculaLocalService = matriculaLocalService;
        this.planificacion = planificacion;
        this.props = props;
        this.tx = new TransactionTemplate(txm);
    }

    /**
     * Abre la hoja de asistencia. Idempotente: si ya existe la misma sesión la devuelve.
     * Valida (en este orden): coherencia tipo/curso/bloque, fecha no futura, fecha hábil, docente asignado.
     */
    public SesionResponse abrir(SesionCreateRequest req, Long usuarioId, boolean esAdmin) {
        validarCoherencia(req);
        if (req.fecha().isAfter(LocalDate.now())) {
            throw new BusinessRuleException("No se puede abrir asistencia de una fecha futura.");
        }
        if (!planificacion.esHabil(req.fecha())) {
            throw new BusinessRuleException("La fecha " + req.fecha() + " no es un día hábil (feriado o fin de semana).");
        }
        PlanificacionClient.Seccion seccion = planificacion.seccion(req.seccionId());
        Long docenteId = resolverDocente(req, seccion, usuarioId, esAdmin);

        var existente = sesionRepo.buscarUnica(req.seccionId(), req.fecha(), req.tipo(), req.cursoId(), req.bloqueId());
        if (existente.isPresent()) {
            return hoja(existente.get().getId());
        }
        matriculaLocalService.cargarInicialSiVacia(req.seccionId());
        Long periodoId = planificacion.periodoDeFecha(seccion.anioId(), req.fecha());

        try {
            Long id = tx.execute(status -> {
                SesionAsistencia s = sesionRepo.save(SesionAsistencia.builder()
                    .anioId(seccion.anioId()).periodoId(periodoId).seccionId(req.seccionId()).fecha(req.fecha())
                    .tipo(req.tipo()).cursoId(req.cursoId()).bloqueId(req.bloqueId()).docenteId(docenteId)
                    .abiertaPor(usuarioId).build());
                String defecto = "FALTA".equalsIgnoreCase(props.getEstadoPorDefecto()) ? "FALTA" : "PRESENTE";
                for (MatriculaLocal m : matriculaRepo.findBySeccionIdAndEstadoOrderByAlumnoNombre(req.seccionId(), "MATRICULADO")) {
                    detalleRepo.save(AsistenciaDetalle.builder().sesion(s).matriculaId(m.getMatriculaId())
                        .alumnoId(m.getAlumnoId()).estado(defecto).build());
                }
                return s.getId();
            });
            return hoja(id);
        } catch (DataIntegrityViolationException e) {
            // Dos aperturas simultáneas: gana la primera, la otra devuelve esa misma hoja
            return hoja(sesionRepo.buscarUnica(req.seccionId(), req.fecha(), req.tipo(), req.cursoId(), req.bloqueId())
                .orElseThrow(() -> e).getId());
        }
    }

    @Transactional(readOnly = true)
    public SesionResponse hoja(Long sesionId) {
        SesionAsistencia s = obtener(sesionId);
        List<AsistenciaDetalle> detalles = detalleRepo.findBySesionIdOrderByIdAsc(sesionId);
        Map<Long, MatriculaLocal> matriculas = matriculaRepo.findAllById(detalles.stream().map(AsistenciaDetalle::getMatriculaId).toList())
            .stream().collect(Collectors.toMap(MatriculaLocal::getMatriculaId, Function.identity()));
        List<DetalleResponse> alumnos = detalles.stream()
            .map(d -> new DetalleResponse(d.getId(), d.getMatriculaId(), d.getAlumnoId(),
                matriculas.containsKey(d.getMatriculaId()) ? matriculas.get(d.getMatriculaId()).getAlumnoNombre() : "Alumno " + d.getAlumnoId(),
                d.getEstado(), d.getMinutosTarde(), d.getObservacion(), Boolean.TRUE.equals(d.getConfirmado())))
            .sorted(java.util.Comparator.comparing(DetalleResponse::alumnoNombre))
            .toList();
        return new SesionResponse(s.getId(), s.getAnioId(), s.getPeriodoId(), s.getSeccionId(), s.getFecha(), s.getTipo(),
            s.getCursoId(), s.getBloqueId(), s.getDocenteId(), s.getEstado(), s.getCerradaEn(), alumnos);
    }

    @Transactional(readOnly = true)
    public List<SesionResponse> buscar(Long seccionId, LocalDate fecha) {
        return sesionRepo.findBySeccionIdAndFechaOrderByTipoAscIdAsc(seccionId, fecha).stream().map(s -> hoja(s.getId())).toList();
    }

    @Transactional(readOnly = true)
    public SesionAsistencia obtener(Long id) {
        return sesionRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Sesión de asistencia no encontrada: " + id));
    }

    /** El docente solo opera sesiones propias; ADMIN puede todas. */
    public void exigirDocenteDe(SesionAsistencia s, Long usuarioId, boolean esAdmin) {
        if (esAdmin) return;
        PlanificacionClient.Docente d = planificacion.docentePorUsuario(usuarioId);
        if (d == null || !d.docenteId().equals(s.getDocenteId())) {
            throw new AccessDeniedException("La sesión pertenece a otro docente.");
        }
    }

    private Long resolverDocente(SesionCreateRequest req, PlanificacionClient.Seccion seccion, Long usuarioId, boolean esAdmin) {
        if (esAdmin) {
            Long docenteId = req.docenteId() != null ? req.docenteId() : seccion.tutorDocenteId();
            if (docenteId == null) {
                throw new BusinessRuleException("Indique docenteId: la sección no tiene tutor y el ADMIN no es docente.");
            }
            return docenteId;
        }
        PlanificacionClient.Docente d = planificacion.docentePorUsuario(usuarioId);
        if (d == null || d.docenteId() == null) {
            throw new AccessDeniedException("El usuario no está registrado como docente.");
        }
        boolean asignado;
        if ("CURSO".equals(req.tipo())) {
            asignado = planificacion.asignacionValida(d.docenteId(), req.seccionId(), req.cursoId());
        } else {
            asignado = d.docenteId().equals(seccion.tutorDocenteId())
                || planificacion.asignaciones(usuarioId, seccion.anioId()).stream().anyMatch(a -> req.seccionId().equals(a.seccionId()));
        }
        if (!asignado) {
            throw new AccessDeniedException("El docente no está asignado a esta sección" + ("CURSO".equals(req.tipo()) ? " y curso." : "."));
        }
        return d.docenteId();
    }

    private void validarCoherencia(SesionCreateRequest req) {
        if ("DIA".equals(req.tipo()) && (req.cursoId() != null || req.bloqueId() != null)) {
            throw new BusinessRuleException("Una sesión DIA no lleva cursoId ni bloqueId.");
        }
        if ("CURSO".equals(req.tipo()) && (req.cursoId() == null || req.bloqueId() == null)) {
            throw new BusinessRuleException("Una sesión CURSO requiere cursoId y bloqueId.");
        }
    }
}
```

---

## 24. `AsistenciaController.java` — Controladores REST API

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/controller/AsistenciaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Asistencia`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.asistencia.controller;

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
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.asistencia.dto.Dtos.*;
import pe.edu.upeu.eduspace.asistencia.dto.PageResponse;
import pe.edu.upeu.eduspace.asistencia.security.IdentidadService;
import pe.edu.upeu.eduspace.asistencia.service.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/asistencia")
@RequiredArgsConstructor
@Tag(name = "Asistencia", description = "Sesiones, registro masivo, correcciones, justificaciones y reportes")
public class AsistenciaController {

    private final SesionService sesionService;
    private final RegistroAsistenciaService registroService;
    private final CierreSesionService cierreService;
    private final CorreccionService correccionService;
    private final JustificacionService justificacionService;
    private final ReporteService reporteService;
    private final IdentidadService identidad;

    @PostMapping("/sesiones")
    @Operation(summary = "Abrir sesión de asistencia (DOCENTE asignado, ADMIN); idempotente")
    public ResponseEntity<SesionResponse> abrir(@Valid @RequestBody SesionCreateRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(sesionService.abrir(req, identidad.usuarioId(jwt), identidad.esAdmin(jwt)));
    }

    @GetMapping("/sesiones")
    @Operation(summary = "Hojas de asistencia de una sección en una fecha")
    public List<SesionResponse> sesiones(@RequestParam Long seccionId,
                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return sesionService.buscar(seccionId, fecha);
    }

    @GetMapping("/sesiones/{id}")
    public SesionResponse sesion(@PathVariable Long id) {
        return sesionService.hoja(id);
    }

    @PutMapping("/sesiones/{id}/registro")
    @Operation(summary = "Guardar la asistencia de toda la sección en una sola petición")
    public SesionResponse registrar(@PathVariable Long id, @Valid @RequestBody RegistroAsistenciaRequest req, @AuthenticationPrincipal Jwt jwt) {
        return registroService.registrar(id, req, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PatchMapping("/sesiones/{id}/cerrar")
    public SesionResponse cerrar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return cierreService.cerrar(id, identidad.usuarioId(jwt), identidad.esAdmin(jwt));
    }

    @PatchMapping("/detalle/{id}")
    @Operation(summary = "Corregir una asistencia con motivo (ADMIN, SECRETARIA)")
    public DetalleResponse corregir(@PathVariable Long id, @Valid @RequestBody CorreccionRequest req, @AuthenticationPrincipal Jwt jwt) {
        return correccionService.corregir(id, req, identidad.usuarioId(jwt));
    }

    @GetMapping("/alumnos/{alumnoId}/resumen")
    @Operation(summary = "Resumen de asistencia del alumno (dueño o personal)")
    public ResumenAlumnoResponse resumen(@PathVariable Long alumnoId,
                                         @RequestParam(required = false) Long periodoId,
                                         @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                         @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
                                         @AuthenticationPrincipal Jwt jwt) {
        identidad.exigirAcceso(jwt, alumnoId);
        return reporteService.resumenAlumno(alumnoId, periodoId, desde, hasta);
    }

    @GetMapping("/secciones/{id}/reporte")
    public ReporteSeccionResponse reporte(@PathVariable Long id,
                                          @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                          @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return reporteService.reporteSeccion(id, desde, hasta);
    }

    @GetMapping("/mias")
    @Operation(summary = "Asistencia de los hijos (APODERADO) o propia (ALUMNO)")
    public List<AsistenciaHijoResponse> mias(@AuthenticationPrincipal Jwt jwt) {
        return reporteService.deAlumnos(identidad.alumnosDelUsuario(jwt));
    }

    // ---------------------------------------------------------------- justificaciones

    @PostMapping("/justificaciones")
    @Operation(summary = "Solicitar justificación (APODERADO)")
    public ResponseEntity<JustificacionResponse> solicitar(@Valid @RequestBody JustificacionRequest req, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(justificacionService.solicitar(req, jwt));
    }

    @GetMapping("/justificaciones")
    @Operation(summary = "Bandeja de justificaciones (SECRETARIA, ADMIN)")
    public PageResponse<JustificacionResponse> bandeja(@RequestParam(required = false) String estado, Pageable pageable) {
        return justificacionService.bandeja(estado, pageable);
    }

    @GetMapping("/justificaciones/mias")
    public List<JustificacionResponse> misJustificaciones(@AuthenticationPrincipal Jwt jwt) {
        return justificacionService.delosAlumnos(identidad.alumnosDelUsuario(jwt));
    }

    @PatchMapping("/justificaciones/{id}/resolver")
    @Operation(summary = "Aprobar o rechazar (SECRETARIA, ADMIN)")
    public JustificacionResponse resolver(@PathVariable Long id, @Valid @RequestBody ResolverJustificacionRequest req, @AuthenticationPrincipal Jwt jwt) {
        return justificacionService.resolver(id, req, identidad.usuarioId(jwt));
    }

    @PostMapping("/justificaciones/{id}/archivo-url")
    @Operation(summary = "URL firmada de subida del sustento (APODERADO)")
    public ArchivoUrlResponse archivoUrl(@PathVariable Long id, @Valid @RequestBody ArchivoUrlRequest req, @AuthenticationPrincipal Jwt jwt) {
        return justificacionService.urlArchivo(id, req, jwt);
    }

    @GetMapping("/justificaciones/{id}/archivo")
    public Map<String, String> archivo(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return Map.of("urlDescarga", justificacionService.urlDescarga(id, jwt));
    }
}
```

---

## 25. `AsistenciaEventProducer.java` — Mensajería Kafka

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/messaging/AsistenciaEventProducer.java`

### **¿Qué hace esta clase?**
Productor/publicador de eventos Apache Kafka. Envía eventos de dominio hacia topics específicos para que otros microservicios los procesen de forma asíncrona.

```java
package pe.edu.upeu.eduspace.asistencia.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import pe.edu.upeu.eduspace.asistencia.event.EventoSobre;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.UUID;

/** Publica eventos con el sobre estándar. Dentro de una transacción espera al commit; si hace rollback no envía nada. */
@Slf4j
@Component
@RequiredArgsConstructor
public class AsistenciaEventProducer {

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

## 26. `MatriculaEventConsumer.java` — Mensajería Kafka

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/messaging/MatriculaEventConsumer.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Apache Kafka. Escucha mensajes de un topic específico y procesa los eventos de dominio recibidos de otros microservicios.

```java
package pe.edu.upeu.eduspace.asistencia.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.asistencia.config.KafkaConfig;
import pe.edu.upeu.eduspace.asistencia.event.EventoSobre;
import pe.edu.upeu.eduspace.asistencia.event.MatriculaEvent;
import pe.edu.upeu.eduspace.asistencia.service.MatriculaLocalService;
import tools.jackson.databind.ObjectMapper;

@Slf4j
@Component
@RequiredArgsConstructor
public class MatriculaEventConsumer {

    private final MatriculaLocalService service;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = {
        KafkaConfig.TOPIC_MATRICULA_CREADA, KafkaConfig.TOPIC_MATRICULA_CONFIRMADA, KafkaConfig.TOPIC_MATRICULA_TRASLADADA,
        KafkaConfig.TOPIC_MATRICULA_RETIRADA, KafkaConfig.TOPIC_MATRICULA_ANULADA}, groupId = "asistencia-ms")
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

## 27. `AsistenciaFaltaRegistradaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/AsistenciaFaltaRegistradaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.asistencia.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AsistenciaFaltaRegistradaEvent {
    private Long asistenciaId;          // sesión
    private Long asistenciaDetalleId;
    private Long alumnoId;
    private Long matriculaId;
    private Long seccionId;
    private LocalDate fecha;
}
```

---

## 28. `EventoSobre.java` — Eventos de Dominio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/EventoSobre.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.asistencia.event;

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

## 29. `JustificacionResueltaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/JustificacionResueltaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.asistencia.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JustificacionResueltaEvent {
    private Long justificacionId;
    private Long alumnoId;
    private Long matriculaId;
    private String resultado;           // APROBADA | RECHAZADA
    private LocalDate fechaDesde;
    private LocalDate fechaHasta;
}
```

---

## 30. `MatriculaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/event/MatriculaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.asistencia.event;

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

## 31. `CierreNocturnoJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/scheduler/CierreNocturnoJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.asistencia.scheduler;

import lombok.RequiredArgsConstructor;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.asistencia.service.CierreSesionService;

@Component
@RequiredArgsConstructor
public class CierreNocturnoJob {

    private final CierreSesionService service;

    @Scheduled(cron = "0 30 23 * * *", zone = "America/Lima")
    @SchedulerLock(name = "asistencia_cierre_nocturno", lockAtLeastFor = "30s", lockAtMostFor = "10m")
    public void cerrarSesionesDeDiasAnteriores() {
        service.cerrarVencidas();
    }
}
```

---

## 32. `LimpiezaJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/scheduler/LimpiezaJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.asistencia.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.asistencia.repository.EventoProcesadoRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class LimpiezaJob {

    private final EventoProcesadoRepository eventoRepo;

    @Scheduled(cron = "0 0 3 * * *", zone = "America/Lima")
    @SchedulerLock(name = "asistencia_limpieza_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void limpiar() {
        long n = eventoRepo.deleteByProcesadoEnBefore(LocalDateTime.now().minusDays(30));
        log.info("Limpieza técnica: {} eventos procesados eliminados.", n);
    }
}
```

---

## 33. `AsistenciaProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/AsistenciaProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.upeu.eduspace.asistencia.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.asistencia")
public class AsistenciaProperties {

    private String estadoPorDefecto = "PRESENTE";
    private boolean marcarFaltaSinRegistro = false;
    private int limiteInasistenciaPorcentaje = 30;
    private int archivoMaxMb = 5;
    private List<String> tiposArchivo = List.of("application/pdf", "image/jpeg", "image/png");
}
```

---

## 34. `CacheConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/CacheConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

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
    public static final String CACHE_FERIADOS = "feriadosCache";           // 24 h
    public static final String CACHE_HIJOS = "hijosCache";                 // 5 min
    public static final String CACHE_DOCENTE = "docenteCache";             // 5 min

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager m = new SimpleCacheManager();
        m.setCaches(List.of(
            cache(CACHE_ASIGNACIONES, 60, TimeUnit.SECONDS),
            cache(CACHE_FERIADOS, 24, TimeUnit.HOURS),
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

## 35. `FeignConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/FeignConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

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

## 36. `KafkaConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/KafkaConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class KafkaConfig {

    public static final String TOPIC_FALTA_REGISTRADA = "asistencia.falta-registrada";
    public static final String TOPIC_JUSTIFICACION_RESUELTA = "justificacion.resuelta";

    public static final String TOPIC_MATRICULA_CREADA = "matricula.creada";
    public static final String TOPIC_MATRICULA_CONFIRMADA = "matricula.confirmada";
    public static final String TOPIC_MATRICULA_TRASLADADA = "matricula.trasladada";
    public static final String TOPIC_MATRICULA_RETIRADA = "matricula.retirada";
    public static final String TOPIC_MATRICULA_ANULADA = "matricula.anulada";

    @Bean
    NewTopic faltaRegistrada() { return TopicBuilder.name(TOPIC_FALTA_REGISTRADA).partitions(3).replicas(1).build(); }

    @Bean
    NewTopic justificacionResuelta() { return TopicBuilder.name(TOPIC_JUSTIFICACION_RESUELTA).partitions(3).replicas(1).build(); }
}
```

---

## 37. `KafkaErrorHandlingConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/KafkaErrorHandlingConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

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

## 38. `MinioConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/MinioConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

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

    @Value("${app.minio.bucket-justificaciones:justificaciones}")
    private String bucketJustificaciones;

    @Bean
    public MinioClient minioClient() {
        MinioClient client = MinioClient.builder()
            .endpoint(endpoint)
            .credentials(accessKey, secretKey)
            .build();

        try {
            boolean exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucketJustificaciones).build());
            if (!exists) {
                client.makeBucket(MakeBucketArgs.builder().bucket(bucketJustificaciones).build());
                log.info("Bucket creado en MinIO: {}", bucketJustificaciones);
            }
        } catch (Exception e) {
            log.warn("No se pudo verificar/crear el bucket {} en MinIO (puede ser creado externamente): {}", bucketJustificaciones, e.getMessage());
        }

        return client;
    }
}
```

---

## 39. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

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
                .title("EduSpace - Asistencia Microservice API")
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

## 40. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

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

                // Alumno / apoderado: solo lo propio (filtro fino en el servicio)
                .requestMatchers(HttpMethod.GET, "/api/v1/asistencia/mias", "/api/v1/asistencia/justificaciones/mias").hasAnyRole("APODERADO", "ALUMNO")
                .requestMatchers(HttpMethod.GET, "/api/v1/asistencia/alumnos/*/resumen").hasAnyRole("ADMIN", "SECRETARIA", "DOCENTE", "APODERADO", "ALUMNO")
                .requestMatchers(HttpMethod.POST, "/api/v1/asistencia/justificaciones", "/api/v1/asistencia/justificaciones/*/archivo-url").hasRole("APODERADO")
                .requestMatchers(HttpMethod.GET, "/api/v1/asistencia/justificaciones/*/archivo").hasAnyRole("ADMIN", "SECRETARIA", "APODERADO", "ALUMNO")

                // Secretaría
                .requestMatchers(HttpMethod.GET, "/api/v1/asistencia/justificaciones").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers(HttpMethod.PATCH, "/api/v1/asistencia/justificaciones/*/resolver", "/api/v1/asistencia/detalle/*").hasAnyRole("ADMIN", "SECRETARIA")

                // Docente
                .requestMatchers(HttpMethod.POST, "/api/v1/asistencia/sesiones").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/asistencia/sesiones/*/registro").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/v1/asistencia/sesiones/*/cerrar").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/asistencia/sesiones/**", "/api/v1/asistencia/secciones/*/reporte").hasAnyRole("DOCENTE", "SECRETARIA", "ADMIN")
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

## 41. `ShedLockConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/config/ShedLockConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.asistencia.config;

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

## 42. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.asistencia.exception;

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

## 43. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.upeu.eduspace.asistencia.exception;

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

## 44. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.asistencia.exception;

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

## 45. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.asistencia.exception;

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

## 46. `ServicioNoDisponibleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/exception/ServicioNoDisponibleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.asistencia.exception;

/** Un servicio del que depende la operación no responde (se mapea a 503). */
public class ServicioNoDisponibleException extends RuntimeException {
    public ServicioNoDisponibleException(String mensaje) {
        super(mensaje);
    }
}
```

---

## 47. `AlumnosClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/AlumnosClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.asistencia.client;

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

## 48. `AlumnosGateway.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/AlumnosGateway.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `asistencia-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.asistencia.client;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.asistencia.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.asistencia.exception.ServicioNoDisponibleException;

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
    @org.springframework.cache.annotation.Cacheable(value = pe.edu.upeu.eduspace.asistencia.config.CacheConfig.CACHE_HIJOS, key = "#usuarioId")
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

## 49. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.upeu.eduspace.asistencia.filter;

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

## 50. `IdentidadService.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/security/IdentidadService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Identidad`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.asistencia.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.asistencia.client.AlumnosClient;
import pe.edu.upeu.eduspace.asistencia.client.AlumnosGateway;

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

## 51. `MatriculaClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/MatriculaClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.asistencia.client;

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

## 52. `PlanificacionClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/PlanificacionClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.asistencia.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

/** Contrato interno de planificacion-ms (adenda A2). */
@FeignClient(name = "planificacion-ms")
public interface PlanificacionClient {

    @GetMapping("/internal/docentes/usuario/{usuarioId}")
    Docente docentePorUsuario(@PathVariable("usuarioId") Long usuarioId);

    @GetMapping("/internal/docentes/usuario/{usuarioId}/asignaciones")
    List<Asignacion> asignaciones(@PathVariable("usuarioId") Long usuarioId, @RequestParam(value = "anioId", required = false) Long anioId);

    @GetMapping("/internal/asignaciones/validar")
    Boolean validarAsignacion(@RequestParam("docenteId") Long docenteId, @RequestParam("seccionId") Long seccionId,
                              @RequestParam("cursoId") Long cursoId);

    @GetMapping("/internal/feriados/es-habil")
    Boolean esHabil(@RequestParam("fecha") @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate fecha);

    @GetMapping("/internal/secciones/{id}")
    Seccion seccion(@PathVariable("id") Long id);

    @GetMapping("/internal/periodos")
    List<Periodo> periodos(@RequestParam("anioId") Long anioId);

    @GetMapping("/internal/periodos/{id}")
    Periodo periodo(@PathVariable("id") Long id);

    record Docente(Long docenteId, String nombre, String estado) {}

    record Asignacion(Long seccionId, Long cursoId, Long asignacionId) {}

    record Seccion(Long id, String nombre, Long gradoId, Long nivelId, Long anioId, Short capacidad, String turno,
                   Long tutorDocenteId) {}

    record Periodo(Long id, Long anioId, Short numero, String nombre, LocalDate fechaInicio, LocalDate fechaFin, String estado) {}
}
```

---

## 53. `PlanificacionGateway.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/client/PlanificacionGateway.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `asistencia-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.asistencia.client;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.asistencia.config.CacheConfig;
import pe.edu.upeu.eduspace.asistencia.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.asistencia.exception.ServicioNoDisponibleException;

import java.time.LocalDate;
import java.util.List;

/**
 * planificacion-ms con circuit breaker. Fallback de autorización = DENEGAR (nunca se asume permiso);
 * las lecturas de reportes no dependen de este servicio.
 */
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

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "asignacionesFallback")
    @Cacheable(value = CacheConfig.CACHE_ASIGNACIONES, key = "#usuarioId + ':' + #anioId")
    public List<PlanificacionClient.Asignacion> asignaciones(Long usuarioId, Long anioId) {
        try {
            return client.asignaciones(usuarioId, anioId);
        } catch (FeignException.NotFound e) {
            return List.of();
        }
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "validarFallback")
    @Cacheable(value = CacheConfig.CACHE_ASIGNACIONES, key = "'v:' + #docenteId + ':' + #seccionId + ':' + #cursoId")
    public boolean asignacionValida(Long docenteId, Long seccionId, Long cursoId) {
        return Boolean.TRUE.equals(client.validarAsignacion(docenteId, seccionId, cursoId));
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "habilFallback")
    @Cacheable(value = CacheConfig.CACHE_FERIADOS, key = "#fecha")
    public boolean esHabil(LocalDate fecha) {
        return Boolean.TRUE.equals(client.esHabil(fecha));
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "seccionFallback")
    public PlanificacionClient.Seccion seccion(Long id) {
        try {
            return client.seccion(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Sección no encontrada: " + id);
        }
    }

    /** Periodo que contiene la fecha, o null si no hay (la sesión queda sin periodo). */
    public Long periodoDeFecha(Long anioId, LocalDate fecha) {
        try {
            return client.periodos(anioId).stream()
                .filter(p -> p.fechaInicio() != null && p.fechaFin() != null
                    && !fecha.isBefore(p.fechaInicio()) && !fecha.isAfter(p.fechaFin()))
                .map(PlanificacionClient.Periodo::id).findFirst().orElse(null);
        } catch (Exception e) {
            log.warn("No se pudo resolver el periodo de {}: {}", fecha, e.getMessage());
            return null;
        }
    }

    @CircuitBreaker(name = "planificacionClient", fallbackMethod = "periodoFallback")
    public PlanificacionClient.Periodo periodo(Long id) {
        try {
            return client.periodo(id);
        } catch (FeignException.NotFound e) {
            throw new ResourceNotFoundException("Periodo no encontrado: " + id);
        }
    }

    PlanificacionClient.Docente docenteFallback(Long usuarioId, Throwable t) { throw caido(t); }

    List<PlanificacionClient.Asignacion> asignacionesFallback(Long usuarioId, Long anioId, Throwable t) { throw caido(t); }

    boolean validarFallback(Long docenteId, Long seccionId, Long cursoId, Throwable t) { throw caido(t); }

    boolean habilFallback(LocalDate fecha, Throwable t) { throw caido(t); }

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

## 54. `AsistenciaApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/AsistenciaApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.upeu.eduspace.asistencia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;
import pe.edu.upeu.eduspace.asistencia.config.AsistenciaProperties;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties(AsistenciaProperties.class)
public class AsistenciaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AsistenciaApplication.class, args);
    }
}
```

---



---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. AsistenciaMapper.java
**Ruta:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/mapper/AsistenciaMapper.java`

```java
package pe.edu.upeu.eduspace.asistencia.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.asistencia.dto.AsistenciaResponse;
import pe.edu.upeu.eduspace.asistencia.entity.Asistencia;

@Component
public class AsistenciaMapper {

    public AsistenciaResponse toResponse(Asistencia a) {
        if (a == null) return null;
        return AsistenciaResponse.builder()
            .id(a.getId())
            .alumnoId(a.getAlumnoId())
            .seccionId(a.getSeccionId())
            .fecha(a.getFecha())
            .estado(a.getEstado())
            .observacion(a.getObservacion())
            .registradoPor(a.getRegistradoPor())
            .creadoEn(a.getCreadoEn())
            .build();
    }
}
```

### 2. JustificacionMapper.java
**Ruta:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/mapper/JustificacionMapper.java`

```java
package pe.edu.upeu.eduspace.asistencia.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.asistencia.dto.JustificacionResponse;
import pe.edu.upeu.eduspace.asistencia.entity.Justificacion;

@Component
public class JustificacionMapper {

    public JustificacionResponse toResponse(Justificacion j) {
        if (j == null) return null;
        return JustificacionResponse.builder()
            .id(j.getId())
            .alumnoId(j.getAlumnoId())
            .fechaInasistencia(j.getFechaInasistencia())
            .motivo(j.getMotivo())
            .estado(j.getEstado())
            .documentoUrl(j.getDocumentoUrl())
            .revisadoPor(j.getRevisadoPor())
            .build();
    }
}
```
