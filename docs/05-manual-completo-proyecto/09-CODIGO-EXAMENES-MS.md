# 📘 CÓDIGO COMPLETO — `examenes-ms`

> **Microservicio:** `examenes-ms`  
> **Puerto:** `8097`  
> **Base de datos:** `eduspace_examenes`  
> **Propósito:** Gestión de evaluaciones, banco de preguntas docentes, alternativas con autocorrección, intentos de estudiantes con cronómetro regresivo y publicación de notas vía Kafka (`examen.calificado`).  
> **Total de clases incluidas:** 69 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `EventoProcesado.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/EventoProcesado.java`
- 2. `Examen.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Examen.java`
- 3. `ExamenPregunta.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/ExamenPregunta.java`
- 4. `Intento.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Intento.java`
- 5. `MatriculaLocal.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/MatriculaLocal.java`
- 6. `OpcionPregunta.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/OpcionPregunta.java`
- 7. `Pregunta.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Pregunta.java`
- 8. `Respuesta.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Respuesta.java`

### Repositorios Spring Data JPA

- 9. `EventoProcesadoRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/EventoProcesadoRepository.java`
- 10. `ExamenPreguntaRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/ExamenPreguntaRepository.java`
- 11. `ExamenRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/ExamenRepository.java`
- 12. `IntentoRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/IntentoRepository.java`
- 13. `MatriculaLocalRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/MatriculaLocalRepository.java`
- 14. `OpcionPreguntaRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/OpcionPreguntaRepository.java`
- 15. `PreguntaRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/PreguntaRepository.java`
- 16. `RespuestaRepository.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/RespuestaRepository.java`

### DTOs (Data Transfer Objects)

- 17. `ExamenCreateRequest.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenCreateRequest.java`
- 18. `ExamenDetalleResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenDetalleResponse.java`
- 19. `ExamenDisponibleResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenDisponibleResponse.java`
- 20. `ExamenPreguntaItem.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenPreguntaItem.java`
- 21. `ExamenResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenResponse.java`
- 22. `GuardarRespuestaRequest.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/GuardarRespuestaRequest.java`
- 23. `IntentoIniciadoResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/IntentoIniciadoResponse.java`
- 24. `IntentoResultadoResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/IntentoResultadoResponse.java`
- 25. `OpcionRequest.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/OpcionRequest.java`
- 26. `OpcionResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/OpcionResponse.java`
- 27. `PageResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/PageResponse.java`
- 28. `PreguntaRequest.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/PreguntaRequest.java`
- 29. `PreguntaResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/PreguntaResponse.java`
- 30. `ResultadosExamenResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ResultadosExamenResponse.java`
- 31. `RevisionRequest.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/RevisionRequest.java`

### Servicios y Lógica de Negocio

- 32. `CalificacionAutomaticaService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/CalificacionAutomaticaService.java`
- 33. `ExamenService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/ExamenService.java`
- 34. `IntentoService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/IntentoService.java`
- 35. `MatriculaLocalService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/MatriculaLocalService.java`
- 36. `PreguntaService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/PreguntaService.java`
- 37. `RespuestaService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/RespuestaService.java`
- 38. `ResultadosService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/ResultadosService.java`
- 39. `RevisionService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/RevisionService.java`

### Controladores REST API

- 40. `ExamenController.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/controller/ExamenController.java`
- 41. `IntentoController.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/controller/IntentoController.java`
- 42. `PreguntaController.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/controller/PreguntaController.java`

### Mensajería Kafka

- 43. `ExamenEventProducer.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/messaging/ExamenEventProducer.java`
- 44. `MatriculaEventConsumer.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/messaging/MatriculaEventConsumer.java`

### Eventos de Dominio

- 45. `EventoSobre.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/EventoSobre.java`
- 46. `ExamenCalificadoEvent.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/ExamenCalificadoEvent.java`
- 47. `ExamenPublicadoEvent.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/ExamenPublicadoEvent.java`
- 48. `MatriculaEvent.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/MatriculaEvent.java`

### Tareas Programadas (Schedulers)

- 49. `CierreExamenJob.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/scheduler/CierreExamenJob.java`
- 50. `CierreIntentosJob.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/scheduler/CierreIntentosJob.java`
- 51. `LimpiezaJob.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/scheduler/LimpiezaJob.java`

### Configuración Spring Boot

- 52. `CacheConfig.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/CacheConfig.java`
- 53. `ExamenProperties.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/ExamenProperties.java`
- 54. `FeignConfig.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/FeignConfig.java`
- 55. `KafkaConfig.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/KafkaConfig.java`
- 56. `KafkaErrorHandlingConfig.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/KafkaErrorHandlingConfig.java`
- 57. `OpenApiConfig.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/OpenApiConfig.java`
- 58. `SecurityConfig.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/SecurityConfig.java`
- 59. `ShedLockConfig.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/ShedLockConfig.java`

### Manejo de Excepciones

- 60. `BusinessRuleException.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/BusinessRuleException.java`
- 61. `ErrorResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/ErrorResponse.java`
- 62. `GlobalExceptionHandler.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/GlobalExceptionHandler.java`
- 63. `ResourceNotFoundException.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/ResourceNotFoundException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 64. `AlumnosClient.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/client/AlumnosClient.java`
- 65. `AsignacionDocenteResponse.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/client/AsignacionDocenteResponse.java`
- 66. `CorrelationIdFilter.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/filter/CorrelationIdFilter.java`
- 67. `IdentidadService.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/security/IdentidadService.java`
- 68. `PlanificacionClient.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/client/PlanificacionClient.java`

### Clase Principal de Arranque

- 69. `ExamenesApplication.java` — `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/ExamenesApplication.java`

---

## 1. `EventoProcesado.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/EventoProcesado.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.examenes.entity;

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

## 2. `Examen.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Examen.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `examenes-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.examenes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "examenes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Examen {

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
    private String instrucciones;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDateTime fechaFin;

    @Column(name = "duracion_min", nullable = false)
    private Short duracionMin;

    @Column(name = "intentos_max", nullable = false)
    @Builder.Default
    private Short intentosMax = 1;

    @Column(name = "barajar_preguntas", nullable = false)
    @Builder.Default
    private Boolean barajarPreguntas = false;

    @Column(name = "puntaje_total", nullable = false, precision = 6, scale = 2)
    @Builder.Default
    private BigDecimal puntajeTotal = BigDecimal.ZERO;

    @Column(nullable = false, length = 15)
    @Builder.Default
    private String estado = "BORRADOR"; // BORRADOR, PUBLICADO, CERRADO, CALIFICADO

    @Column(name = "creado_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "publicado_en")
    private LocalDateTime publicadoEn;

    @OneToMany(mappedBy = "examen", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orden ASC")
    @Builder.Default
    private List<ExamenPregunta> preguntas = new ArrayList<>();
}
```

---

## 3. `ExamenPregunta.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/ExamenPregunta.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `examenes-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.examenes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "examen_preguntas", uniqueConstraints = {
    @UniqueConstraint(name = "uk_exam_preg", columnNames = {"examen_id", "pregunta_id"}),
    @UniqueConstraint(name = "uk_exam_orden", columnNames = {"examen_id", "orden"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamenPregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "examen_id", nullable = false)
    private Examen examen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    @Column(nullable = false)
    private Short orden;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal puntaje;
}
```

---

## 4. `Intento.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Intento.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `examenes-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.examenes.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "intentos", uniqueConstraints = {
    @UniqueConstraint(name = "uk_intento", columnNames = {"examen_id", "matricula_id", "numero"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Intento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "examen_id", nullable = false)
    private Examen examen;

    @Column(name = "matricula_id", nullable = false)
    private Long matriculaId;

    @Column(name = "alumno_id", nullable = false)
    private Long alumnoId;

    @Column(nullable = false)
    @Builder.Default
    private Short numero = 1;

    @Column(name = "iniciado_en", nullable = false)
    @Builder.Default
    private LocalDateTime iniciadoEn = LocalDateTime.now();

    @Column(name = "vence_en", nullable = false)
    private LocalDateTime venceEn;

    @Column(name = "enviado_en")
    private LocalDateTime enviadoEn;

    @Column(nullable = false, length = 12)
    @Builder.Default
    private String estado = "EN_CURSO"; // EN_CURSO, ENVIADO, CALIFICADO, VENCIDO

    @Column(name = "puntaje_obtenido", precision = 6, scale = 2)
    private BigDecimal puntajeObtenido;

    @Column(precision = 5, scale = 2)
    private BigDecimal nota; // Nota oficial 0-20

    @Column(name = "calificado_en")
    private LocalDateTime calificadoEn;

    @OneToMany(mappedBy = "intento", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Respuesta> respuestas = new ArrayList<>();
}
```

---

## 5. `MatriculaLocal.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/MatriculaLocal.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `examenes-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.examenes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

    @Column(name = "actualizado_en", nullable = false)
    @Builder.Default
    private LocalDateTime actualizadoEn = LocalDateTime.now();
}
```

---

## 6. `OpcionPregunta.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/OpcionPregunta.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `examenes-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.examenes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "opciones_pregunta", uniqueConstraints = {
    @UniqueConstraint(name = "uk_opcion_orden", columnNames = {"pregunta_id", "orden"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpcionPregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    @Column(nullable = false, length = 500)
    private String texto;

    @Column(name = "es_correcta", nullable = false)
    @Builder.Default
    private Boolean esCorrecta = false;

    @Column(nullable = false)
    @Builder.Default
    private Short orden = 1;
}
```

---

## 7. `Pregunta.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Pregunta.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `examenes-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.examenes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "preguntas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "curso_id", nullable = false)
    private Long cursoId;

    @Column(name = "docente_id", nullable = false)
    private Long docenteId;

    @Column(length = 100)
    private String tema;

    @Column(nullable = false, length = 20)
    private String tipo; // OPCION_UNICA, OPCION_MULTIPLE, VERDADERO_FALSO, ABIERTA

    @Column(nullable = false, columnDefinition = "TEXT")
    private String enunciado;

    @Column(nullable = false, precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal puntaje = BigDecimal.ONE;

    @Column(nullable = false)
    @Builder.Default
    private Boolean activa = true;

    @Column(name = "creada_en", nullable = false)
    @Builder.Default
    private LocalDateTime creadaEn = LocalDateTime.now();

    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orden ASC")
    @Builder.Default
    private List<OpcionPregunta> opciones = new ArrayList<>();
}
```

---

## 8. `Respuesta.java` — Entidades JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/entity/Respuesta.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `examenes-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.examenes.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "respuestas", uniqueConstraints = {
    @UniqueConstraint(name = "uk_respuesta", columnNames = {"intento_id", "pregunta_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "intento_id", nullable = false)
    private Intento intento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "opciones_ids", columnDefinition = "bigint[]")
    private List<Long> opcionesIds;

    @Column(name = "texto_respuesta", columnDefinition = "TEXT")
    private String textoRespuesta;

    @Column(name = "puntaje_obtenido", precision = 5, scale = 2)
    private BigDecimal puntajeObtenido;

    @Column(name = "requiere_revision", nullable = false)
    @Builder.Default
    private Boolean requiereRevision = false;

    @Column(name = "revisada_por")
    private Long revisadaPor;

    @Column(name = "guardada_en", nullable = false)
    @Builder.Default
    private LocalDateTime guardadaEn = LocalDateTime.now();
}
```

---

## 9. `EventoProcesadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/EventoProcesadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `EventoProcesado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.EventoProcesado;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface EventoProcesadoRepository extends JpaRepository<EventoProcesado, UUID> {

    boolean existsByEventId(UUID eventId);

    long deleteByProcesadoEnBefore(LocalDateTime fechaLimite);
}
```

---

## 10. `ExamenPreguntaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/ExamenPreguntaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `ExamenPregunta`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.ExamenPregunta;

import java.util.List;

@Repository
public interface ExamenPreguntaRepository extends JpaRepository<ExamenPregunta, Long> {

    List<ExamenPregunta> findByExamenIdOrderByOrdenAsc(Long examenId);

    void deleteByExamenId(Long examenId);
}
```

---

## 11. `ExamenRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/ExamenRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Examen`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.Examen;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, Long> {

    @Query("""
        SELECT e FROM Examen e
        WHERE (:seccionId IS NULL OR e.seccionId = :seccionId)
          AND (:cursoId IS NULL OR e.cursoId = :cursoId)
          AND (:docenteId IS NULL OR e.docenteId = :docenteId)
          AND (:estado IS NULL OR e.estado = :estado)
        ORDER BY e.fechaInicio DESC
    """)
    Page<Examen> findExamenesFiltrados(@Param("seccionId") Long seccionId,
                                      @Param("cursoId") Long cursoId,
                                      @Param("docenteId") Long docenteId,
                                      @Param("estado") String estado,
                                      Pageable pageable);

    @Query("""
        SELECT e FROM Examen e
        WHERE e.seccionId = :seccionId
          AND e.estado = 'PUBLICADO'
          AND :ahora BETWEEN e.fechaInicio AND e.fechaFin
        ORDER BY e.fechaFin ASC
    """)
    List<Examen> findExamenesDisponiblesAlumno(@Param("seccionId") Long seccionId,
                                              @Param("ahora") LocalDateTime ahora);

    @Query("""
        SELECT e FROM Examen e
        WHERE e.estado = 'PUBLICADO'
          AND e.fechaFin < :ahora
    """)
    List<Examen> findExamenesVencidosParaCierre(@Param("ahora") LocalDateTime ahora);
}
```

---

## 12. `IntentoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/IntentoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Intento`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.Intento;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface IntentoRepository extends JpaRepository<Intento, Long> {

    List<Intento> findByExamenIdAndMatriculaIdOrderByNumeroAsc(Long examenId, Long matriculaId);

    Optional<Intento> findFirstByExamenIdAndMatriculaIdAndEstado(Long examenId, Long matriculaId, String estado);

    short countByExamenIdAndMatriculaId(Long examenId, Long matriculaId);

    @Query("""
        SELECT i FROM Intento i
        WHERE i.estado = 'EN_CURSO'
          AND i.venceEn < :ahora
    """)
    List<Intento> findIntentosVencidosEnCurso(@Param("ahora") LocalDateTime ahora);

    List<Intento> findByExamenId(Long examenId);

    List<Intento> findByAlumnoIdOrderByIniciadoEnDesc(Long alumnoId);

    @Query("""
        SELECT DISTINCT i FROM Intento i
        JOIN i.respuestas r
        WHERE i.examen.id = :examenId
          AND r.requiereRevision = true
          AND r.puntajeObtenido IS NULL
    """)
    List<Intento> findIntentosPendientesRevision(@Param("examenId") Long examenId);
}
```

---

## 13. `MatriculaLocalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/MatriculaLocalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `MatriculaLocal`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.MatriculaLocal;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatriculaLocalRepository extends JpaRepository<MatriculaLocal, Long> {

    List<MatriculaLocal> findByAlumnoId(Long alumnoId);

    List<MatriculaLocal> findBySeccionIdAndEstado(Long seccionId, String estado);

    Optional<MatriculaLocal> findByAlumnoIdAndSeccionIdAndEstado(Long alumnoId, Long seccionId, String estado);
}
```

---

## 14. `OpcionPreguntaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/OpcionPreguntaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `OpcionPregunta`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.OpcionPregunta;

import java.util.List;

@Repository
public interface OpcionPreguntaRepository extends JpaRepository<OpcionPregunta, Long> {

    List<OpcionPregunta> findByPreguntaIdOrderByOrdenAsc(Long preguntaId);
}
```

---

## 15. `PreguntaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/PreguntaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Pregunta`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.Pregunta;

import java.util.List;

@Repository
public interface PreguntaRepository extends JpaRepository<Pregunta, Long> {

    /** {@code tema} nunca es nulo (texto vacío = sin filtro): PostgreSQL no infiere el tipo de un parámetro nulo en LIKE. */
    @Query("""
        SELECT p FROM Pregunta p
        WHERE p.cursoId = :cursoId
          AND (:docenteId IS NULL OR p.docenteId = :docenteId)
          AND (:tema = '' OR LOWER(p.tema) LIKE LOWER(CONCAT('%', :tema, '%')))
          AND (:tipo IS NULL OR p.tipo = :tipo)
          AND p.activa = true
        ORDER BY p.creadaEn DESC
    """)
    Page<Pregunta> findBancoPreguntas(@Param("cursoId") Long cursoId,
                                      @Param("docenteId") Long docenteId,
                                      @Param("tema") String tema,
                                      @Param("tipo") String tipo,
                                      Pageable pageable);

    List<Pregunta> findByCursoIdAndActivaTrue(Long cursoId);

    @Query("SELECT COUNT(ep) > 0 FROM ExamenPregunta ep WHERE ep.pregunta.id = :preguntaId AND ep.examen.estado != 'BORRADOR'")
    boolean isPreguntaEnUsoEnExamenPublicado(@Param("preguntaId") Long preguntaId);
}
```

---

## 16. `RespuestaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/repository/RespuestaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Respuesta`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.examenes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.examenes.entity.Respuesta;

import java.util.List;
import java.util.Optional;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta, Long> {

    Optional<Respuesta> findByIntentoIdAndPreguntaId(Long intentoId, Long preguntaId);

    List<Respuesta> findByIntentoId(Long intentoId);
}
```

---

## 17. `ExamenCreateRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenCreateRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `ExamenCreate`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ExamenCreateRequest {

    @NotNull(message = "El anioId es obligatorio")
    private Long anioId;

    @NotNull(message = "El periodoId es obligatorio")
    private Long periodoId;

    @NotNull(message = "El seccionId es obligatorio")
    private Long seccionId;

    @NotNull(message = "El cursoId es obligatorio")
    private Long cursoId;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 200)
    private String titulo;

    private String instrucciones;

    @NotNull(message = "La fechaInicio es obligatoria")
    private LocalDateTime fechaInicio;

    @NotNull(message = "La fechaFin es obligatoria")
    private LocalDateTime fechaFin;

    @NotNull(message = "La duración en minutos es obligatoria")
    @Min(value = 5, message = "La duración mínima es de 5 minutos")
    @Max(value = 360, message = "La duración máxima es de 360 minutos")
    private Short duracionMin;

    @Min(1)
    private Short intentosMax = 1;

    private Boolean barajarPreguntas = false;

    @NotEmpty(message = "Debe incluir al menos una pregunta para armar el examen")
    @Valid
    private List<ExamenPreguntaItem> preguntas;
}
```

---

## 18. `ExamenDetalleResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenDetalleResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ExamenDetalle`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ExamenDetalleResponse {
    private Long id;
    private Long anioId;
    private Long periodoId;
    private Long seccionId;
    private Long cursoId;
    private Long docenteId;
    private String titulo;
    private String instrucciones;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private Short duracionMin;
    private Short intentosMax;
    private Boolean barajarPreguntas;
    private BigDecimal puntajeTotal;
    private String estado;
    private List<PreguntaItemDetalle> preguntas;

    @Data
    @Builder
    public static class PreguntaItemDetalle {
        private Long preguntaId;
        private Short orden;
        private BigDecimal puntaje;
        private String tema;
        private String tipo;
        private String enunciado;
        private List<OpcionResponse> opciones;
    }
}
```

---

## 19. `ExamenDisponibleResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenDisponibleResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ExamenDisponible`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ExamenDisponibleResponse {
    private Long examenId;
    private Long cursoId;
    private String titulo;
    private String instrucciones;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private Short duracionMin;
    private Short intentosMax;
    private short intentosRealizados;
    private boolean puedeRendir;
    private BigDecimal puntajeTotal;
}
```

---

## 20. `ExamenPreguntaItem.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenPreguntaItem.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `examenes-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExamenPreguntaItem {

    @NotNull(message = "El preguntaId es obligatorio")
    private Long preguntaId;

    @NotNull(message = "El orden es obligatorio")
    private Short orden;

    @NotNull(message = "El puntaje es obligatorio")
    @DecimalMin(value = "0.25", message = "El puntaje debe ser mayor a 0")
    private BigDecimal puntaje;
}
```

---

## 21. `ExamenResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ExamenResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Examen`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ExamenResponse {
    private Long id;
    private Long anioId;
    private Long periodoId;
    private Long seccionId;
    private Long cursoId;
    private Long docenteId;
    private String titulo;
    private String instrucciones;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private Short duracionMin;
    private Short intentosMax;
    private Boolean barajarPreguntas;
    private BigDecimal puntajeTotal;
    private String estado;
    private LocalDateTime creadoEn;
    private LocalDateTime publicadoEn;
}
```

---

## 22. `GuardarRespuestaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/GuardarRespuestaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `GuardarRespuesta`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Data;

import java.util.List;

@Data
public class GuardarRespuestaRequest {

    private List<Long> opcionesIds;
    private String textoRespuesta;
}
```

---

## 23. `IntentoIniciadoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/IntentoIniciadoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `IntentoIniciado`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class IntentoIniciadoResponse {
    private Long intentoId;
    private Long examenId;
    private String tituloExamen;
    private Short numeroIntento;
    private LocalDateTime iniciadoEn;
    private LocalDateTime venceEn;
    private BigDecimal puntajeTotal;
    private List<PreguntaEstudianteDto> preguntas;

    @Data
    @Builder
    public static class PreguntaEstudianteDto {
        private Long preguntaId;
        private Short orden;
        private BigDecimal puntaje;
        private String tipo;
        private String enunciado;
        private List<OpcionEstudianteDto> opciones;
        // Si ya tenía respuesta guardada previamente (por reconexión)
        private List<Long> opcionesRespondidas;
        private String textoRespondido;
    }

    @Data
    @Builder
    public static class OpcionEstudianteDto {
        private Long id;
        private String texto;
        private Short orden;
    }
}
```

---

## 24. `IntentoResultadoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/IntentoResultadoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `IntentoResultado`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class IntentoResultadoResponse {
    private Long intentoId;
    private Long examenId;
    private String tituloExamen;
    private Short numeroIntento;
    private String estado;
    private BigDecimal puntajeObtenido;
    private BigDecimal puntajeTotal;
    private BigDecimal nota; // Escala 0-20
    private LocalDateTime iniciadoEn;
    private LocalDateTime enviadoEn;
    private LocalDateTime calificadoEn;
    private boolean requiereRevisionAbiertas;
}
```

---

## 25. `OpcionRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/OpcionRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Opcion`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpcionRequest {

    @NotBlank(message = "El texto de la opción es obligatorio")
    @Size(max = 500)
    private String texto;

    @Builder.Default
    private Boolean esCorrecta = false;
    @Builder.Default
    private Short orden = 1;
}
```

---

## 26. `OpcionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/OpcionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Opcion`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpcionResponse {
    private Long id;
    private String texto;
    private Boolean esCorrecta;
    private Short orden;
}
```

---

## 27. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Page`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

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

## 28. `PreguntaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/PreguntaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Pregunta`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PreguntaRequest {

    @NotNull(message = "El cursoId es obligatorio")
    private Long cursoId;

    @Size(max = 100)
    private String tema;

    @NotBlank(message = "El tipo de pregunta es obligatorio")
    @Pattern(regexp = "OPCION_UNICA|OPCION_MULTIPLE|VERDADERO_FALSO|ABIERTA",
             message = "Tipo debe ser OPCION_UNICA, OPCION_MULTIPLE, VERDADERO_FALSO o ABIERTA")
    private String tipo;

    @NotBlank(message = "El enunciado es obligatorio")
    private String enunciado;

    @NotNull(message = "El puntaje es obligatorio")
    @DecimalMin(value = "0.25", message = "El puntaje debe ser mayor a 0")
    private BigDecimal puntaje = BigDecimal.ONE;

    private Boolean activa = true;

    @Valid
    private List<OpcionRequest> opciones;
}
```

---

## 29. `PreguntaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/PreguntaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Pregunta`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PreguntaResponse {
    private Long id;
    private Long cursoId;
    private Long docenteId;
    private String tema;
    private String tipo;
    private String enunciado;
    private BigDecimal puntaje;
    private Boolean activa;
    private LocalDateTime creadaEn;
    private List<OpcionResponse> opciones;
}
```

---

## 30. `ResultadosExamenResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/ResultadosExamenResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ResultadosExamen`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ResultadosExamenResponse {
    private Long examenId;
    private String titulo;
    private BigDecimal puntajeTotal;
    private int totalIntentos;
    private int alumnosEvaluados;
    private BigDecimal promedioNotas;
    private BigDecimal notaMaxima;
    private BigDecimal notaMinima;
    private List<IntentoEstudianteResumen> intentos;

    @Data
    @Builder
    public static class IntentoEstudianteResumen {
        private Long intentoId;
        private Long alumnoId;
        private String alumnoNombre;
        private Short numeroIntento;
        private String estado;
        private BigDecimal puntajeObtenido;
        private BigDecimal nota;
        private boolean requiereRevision;
    }
}
```

---

## 31. `RevisionRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/dto/RevisionRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Revision`.

```java
package pe.edu.upeu.eduspace.examenes.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RevisionRequest {

    @NotNull(message = "El puntajeObtenido es obligatorio")
    @DecimalMin(value = "0.00", message = "El puntaje no puede ser negativo")
    private BigDecimal puntajeObtenido;
}
```

---

## 32. `CalificacionAutomaticaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/CalificacionAutomaticaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `CalificacionAutomatica`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.dto.IntentoResultadoResponse;
import pe.edu.upeu.eduspace.examenes.entity.*;
import pe.edu.upeu.eduspace.examenes.event.ExamenCalificadoEvent;
import pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.examenes.messaging.ExamenEventProducer;
import pe.edu.upeu.eduspace.examenes.repository.ExamenPreguntaRepository;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.repository.RespuestaRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalificacionAutomaticaService {

    private final IntentoRepository intentoRepository;
    private final RespuestaRepository respuestaRepository;
    private final ExamenPreguntaRepository examenPreguntaRepository;
    private final ExamenEventProducer examenEventProducer;

    @Transactional
    public IntentoResultadoResponse calificarIntento(Long intentoId) {
        Intento intento = intentoRepository.findById(intentoId)
            .orElseThrow(() -> new ResourceNotFoundException("Intento no encontrado: " + intentoId));

        Examen examen = intento.getExamen();
        List<ExamenPregunta> examenPreguntas = examenPreguntaRepository.findByExamenIdOrderByOrdenAsc(examen.getId());
        Map<Long, BigDecimal> puntajesPorPregunta = new HashMap<>();
        for (ExamenPregunta ep : examenPreguntas) {
            puntajesPorPregunta.put(ep.getPregunta().getId(), ep.getPuntaje());
        }

        List<Respuesta> respuestas = respuestaRepository.findByIntentoId(intentoId);
        Map<Long, Respuesta> mapRespuestas = new HashMap<>();
        for (Respuesta r : respuestas) {
            mapRespuestas.put(r.getPregunta().getId(), r);
        }

        BigDecimal sumaPuntaje = BigDecimal.ZERO;
        boolean tieneAbiertasPendientes = false;

        for (ExamenPregunta ep : examenPreguntas) {
            Pregunta p = ep.getPregunta();
            BigDecimal puntajeMaximoPregunta = ep.getPuntaje();
            Respuesta r = mapRespuestas.get(p.getId());

            if (r == null) {
                // No respondió esta pregunta
                continue;
            }

            if ("ABIERTA".equals(p.getTipo())) {
                r.setRequiereRevision(true);
                tieneAbiertasPendientes = true;
                respuestaRepository.save(r);
                continue;
            }

            // Calificación de preguntas objetivas
            BigDecimal puntajeGanado = evaluarPreguntaObjetiva(p, r, puntajeMaximoPregunta);
            r.setPuntajeObtenido(puntajeGanado);
            r.setRequiereRevision(false);
            respuestaRepository.save(r);

            sumaPuntaje = sumaPuntaje.add(puntajeGanado);
        }

        intento.setPuntajeObtenido(sumaPuntaje);

        if (!tieneAbiertasPendientes) {
            // Se calcula nota oficial 0-20: (puntajeObtenido / puntajeTotal) * 20
            BigDecimal nota = BigDecimal.ZERO;
            if (examen.getPuntajeTotal().compareTo(BigDecimal.ZERO) > 0) {
                nota = sumaPuntaje.multiply(BigDecimal.valueOf(20))
                    .divide(examen.getPuntajeTotal(), 2, RoundingMode.HALF_UP)
                    .min(BigDecimal.valueOf(20))
                    .max(BigDecimal.ZERO);
            }
            intento.setNota(nota);
            intento.setEstado("CALIFICADO");
            intento.setCalificadoEn(LocalDateTime.now());
            intentoRepository.save(intento);

            // Publicar evento examen.calificado
            examenEventProducer.publicarExamenCalificado(ExamenCalificadoEvent.builder()
                .examenId(examen.getId())
                .intentoId(intento.getId())
                .alumnoId(intento.getAlumnoId())
                .matriculaId(intento.getMatriculaId())
                .seccionId(examen.getSeccionId())
                .cursoId(examen.getCursoId())
                .periodoId(examen.getPeriodoId())
                .titulo(examen.getTitulo())
                .nota(nota)
                .build());

            log.info("Intento {} calificado automáticamente con nota {}", intentoId, nota);
        } else {
            intentoRepository.save(intento);
            log.info("Intento {} guardado con calificación parcial; requiere revisión de preguntas abiertas.", intentoId);
        }

        return IntentoResultadoResponse.builder()
            .intentoId(intento.getId())
            .examenId(examen.getId())
            .tituloExamen(examen.getTitulo())
            .numeroIntento(intento.getNumero())
            .estado(intento.getEstado())
            .puntajeObtenido(intento.getPuntajeObtenido())
            .puntajeTotal(examen.getPuntajeTotal())
            .nota(intento.getNota())
            .iniciadoEn(intento.getIniciadoEn())
            .enviadoEn(intento.getEnviadoEn())
            .calificadoEn(intento.getCalificadoEn())
            .requiereRevisionAbiertas(tieneAbiertasPendientes)
            .build();
    }

    private BigDecimal evaluarPreguntaObjetiva(Pregunta p, Respuesta r, BigDecimal puntajeMaximo) {
        if (r.getOpcionesIds() == null || r.getOpcionesIds().isEmpty()) {
            return BigDecimal.ZERO;
        }

        Set<Long> seleccionadas = new HashSet<>(r.getOpcionesIds());
        Set<Long> correctas = new HashSet<>();
        for (OpcionPregunta op : p.getOpciones()) {
            if (Boolean.TRUE.equals(op.getEsCorrecta())) {
                correctas.add(op.getId());
            }
        }

        if ("OPCION_UNICA".equals(p.getTipo()) || "VERDADERO_FALSO".equals(p.getTipo())) {
            return seleccionadas.equals(correctas) ? puntajeMaximo : BigDecimal.ZERO;
        }

        if ("OPCION_MULTIPLE".equals(p.getTipo())) {
            // Todo o nada para consistencia segura
            return seleccionadas.equals(correctas) ? puntajeMaximo : BigDecimal.ZERO;
        }

        return BigDecimal.ZERO;
    }
}
```

---

## 33. `ExamenService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/ExamenService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Examen`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.client.PlanificacionClient;
import pe.edu.upeu.eduspace.examenes.dto.*;
import pe.edu.upeu.eduspace.examenes.entity.*;
import pe.edu.upeu.eduspace.examenes.event.ExamenPublicadoEvent;
import pe.edu.upeu.eduspace.examenes.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.examenes.messaging.ExamenEventProducer;
import pe.edu.upeu.eduspace.examenes.repository.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExamenService {

    private final ExamenRepository examenRepository;
    private final ExamenPreguntaRepository examenPreguntaRepository;
    private final PreguntaRepository preguntaRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final IntentoRepository intentoRepository;
    private final PlanificacionClient planificacionClient;
    private final ExamenEventProducer examenEventProducer;
    private final CalificacionAutomaticaService calificacionAutomaticaService;

    @Transactional(readOnly = true)
    public PageResponse<ExamenResponse> listarExamenes(Long seccionId, Long cursoId, Long docenteId, String estado, Pageable pageable) {
        Page<Examen> page = examenRepository.findExamenesFiltrados(seccionId, cursoId, docenteId, estado, pageable);
        return PageResponse.from(page.map(this::toResponse));
    }

    @Transactional(readOnly = true)
    public ExamenDetalleResponse obtenerPorId(Long id) {
        Examen e = examenRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Examen no encontrado con ID: " + id));

        List<ExamenDetalleResponse.PreguntaItemDetalle> preguntasDetalle = new ArrayList<>();
        for (ExamenPregunta ep : e.getPreguntas()) {
            Pregunta p = ep.getPregunta();
            List<OpcionResponse> opciones = p.getOpciones().stream()
                .map(o -> OpcionResponse.builder()
                    .id(o.getId())
                    .texto(o.getTexto())
                    .esCorrecta(o.getEsCorrecta())
                    .orden(o.getOrden())
                    .build())
                .toList();

            preguntasDetalle.add(ExamenDetalleResponse.PreguntaItemDetalle.builder()
                .preguntaId(p.getId())
                .orden(ep.getOrden())
                .puntaje(ep.getPuntaje())
                .tema(p.getTema())
                .tipo(p.getTipo())
                .enunciado(p.getEnunciado())
                .opciones(opciones)
                .build());
        }

        return ExamenDetalleResponse.builder()
            .id(e.getId())
            .anioId(e.getAnioId())
            .periodoId(e.getPeriodoId())
            .seccionId(e.getSeccionId())
            .cursoId(e.getCursoId())
            .docenteId(e.getDocenteId())
            .titulo(e.getTitulo())
            .instrucciones(e.getInstrucciones())
            .fechaInicio(e.getFechaInicio())
            .fechaFin(e.getFechaFin())
            .duracionMin(e.getDuracionMin())
            .intentosMax(e.getIntentosMax())
            .barajarPreguntas(e.getBarajarPreguntas())
            .puntajeTotal(e.getPuntajeTotal())
            .estado(e.getEstado())
            .preguntas(preguntasDetalle)
            .build();
    }

    @Transactional
    public ExamenResponse crear(ExamenCreateRequest req, Long docenteId) {
        validarFechas(req);
        // docenteId == null => ADMIN: se crea a nombre de la asignación vigente, sin validar dueño
        if (docenteId == null) {
            throw new BusinessRuleException("El ADMIN no puede crear exámenes sin un docente asignado; use una cuenta de docente.");
        }
        validarAsignacion(docenteId, req.getSeccionId(), req.getCursoId());

        Examen examen = Examen.builder()
            .anioId(req.getAnioId())
            .periodoId(req.getPeriodoId())
            .seccionId(req.getSeccionId())
            .cursoId(req.getCursoId())
            .docenteId(docenteId)
            .titulo(req.getTitulo())
            .instrucciones(req.getInstrucciones())
            .fechaInicio(req.getFechaInicio())
            .fechaFin(req.getFechaFin())
            .duracionMin(req.getDuracionMin())
            .intentosMax(req.getIntentosMax() != null ? req.getIntentosMax() : 1)
            .barajarPreguntas(Boolean.TRUE.equals(req.getBarajarPreguntas()))
            .estado("BORRADOR")
            .creadoEn(LocalDateTime.now())
            .build();

        Examen guardado = examenRepository.save(examen);
        asignarPreguntas(guardado, req.getPreguntas());
        return toResponse(examenRepository.save(guardado));
    }

    @Transactional
    public ExamenResponse actualizar(Long id, ExamenCreateRequest req, Long docenteId) {
        Examen e = examenRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Examen no encontrado: " + id));
        verificarDueno(e, docenteId);
        if (!"BORRADOR".equals(e.getEstado())) {
            throw new BusinessRuleException("Solo se pueden editar exámenes en estado BORRADOR.");
        }
        validarFechas(req);
        validarAsignacion(e.getDocenteId(), req.getSeccionId(), req.getCursoId());

        e.setAnioId(req.getAnioId());
        e.setPeriodoId(req.getPeriodoId());
        e.setSeccionId(req.getSeccionId());
        e.setCursoId(req.getCursoId());
        e.setTitulo(req.getTitulo());
        e.setInstrucciones(req.getInstrucciones());
        e.setFechaInicio(req.getFechaInicio());
        e.setFechaFin(req.getFechaFin());
        e.setDuracionMin(req.getDuracionMin());
        e.setIntentosMax(req.getIntentosMax() != null ? req.getIntentosMax() : 1);
        e.setBarajarPreguntas(Boolean.TRUE.equals(req.getBarajarPreguntas()));
        e.getPreguntas().clear();
        examenRepository.saveAndFlush(e);
        asignarPreguntas(e, req.getPreguntas());
        return toResponse(examenRepository.save(e));
    }

    private void validarFechas(ExamenCreateRequest req) {
        if (!req.getFechaFin().isAfter(req.getFechaInicio())) {
            throw new BusinessRuleException("La fecha fin debe ser posterior a la fecha inicio.");
        }
    }

    private void validarAsignacion(Long docenteId, Long seccionId, Long cursoId) {
        Boolean asignado = planificacionClient.validarAsignacionDocente(docenteId, seccionId, cursoId);
        if (!Boolean.TRUE.equals(asignado)) {
            throw new BusinessRuleException(String.format(
                "El docente %d no tiene asignación vigente en la sección %d para el curso %d.", docenteId, seccionId, cursoId));
        }
    }

    private void verificarDueno(Examen e, Long docenteId) {
        if (docenteId != null && !docenteId.equals(e.getDocenteId())) {
            throw new org.springframework.security.access.AccessDeniedException("El examen pertenece a otro docente.");
        }
    }

    private void asignarPreguntas(Examen examen, List<ExamenPreguntaItem> items) {
        BigDecimal puntajeTotal = BigDecimal.ZERO;
        List<ExamenPregunta> lista = new ArrayList<>();
        for (ExamenPreguntaItem item : items) {
            Pregunta preg = preguntaRepository.findById(item.getPreguntaId())
                .orElseThrow(() -> new ResourceNotFoundException("Pregunta no encontrada: " + item.getPreguntaId()));
            lista.add(examenPreguntaRepository.save(ExamenPregunta.builder()
                .examen(examen).pregunta(preg).orden(item.getOrden()).puntaje(item.getPuntaje()).build()));
            puntajeTotal = puntajeTotal.add(item.getPuntaje());
        }
        examen.setPuntajeTotal(puntajeTotal);
        examen.getPreguntas().clear();
        examen.getPreguntas().addAll(lista);
    }

    @Transactional
    public ExamenResponse publicar(Long id, Long docenteId) {
        Examen e = examenRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Examen no encontrado: " + id));
        verificarDueno(e, docenteId);

        if (!"BORRADOR".equals(e.getEstado())) {
            throw new BusinessRuleException("Solo se pueden publicar exámenes en estado BORRADOR.");
        }
        if (e.getPreguntas().isEmpty()) {
            throw new BusinessRuleException("El examen no contiene preguntas.");
        }
        if (!e.getFechaFin().isAfter(LocalDateTime.now())) {
            throw new BusinessRuleException("La ventana del examen ya terminó; ajuste las fechas antes de publicar.");
        }
        validarAsignacion(e.getDocenteId(), e.getSeccionId(), e.getCursoId());

        e.setEstado("PUBLICADO");
        e.setPublicadoEn(LocalDateTime.now());
        Examen guardado = examenRepository.save(e);

        List<MatriculaLocal> matriculas = matriculaLocalRepository.findBySeccionIdAndEstado(e.getSeccionId(), "MATRICULADO");
        List<Long> alumnoIds = matriculas.stream().map(MatriculaLocal::getAlumnoId).toList();

        Map<String, Object> cursoInfo = planificacionClient.getCursoPorId(e.getCursoId());
        String cursoNombre = cursoInfo != null && cursoInfo.containsKey("nombre") ? cursoInfo.get("nombre").toString() : "Curso " + e.getCursoId();

        examenEventProducer.publicarExamenPublicado(ExamenPublicadoEvent.builder()
            .examenId(e.getId())
            .seccionId(e.getSeccionId())
            .cursoId(e.getCursoId())
            .cursoNombre(cursoNombre)
            .titulo(e.getTitulo())
            .fechaInicio(e.getFechaInicio())
            .fechaFin(e.getFechaFin())
            .alumnoIds(alumnoIds)
            .build());

        log.info("Examen ID {} publicado exitosamente para {} alumnos.", e.getId(), alumnoIds.size());
        return toResponse(guardado);
    }

    @Transactional
    public ExamenResponse cerrar(Long id, Long docenteId) {
        Examen e = examenRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Examen no encontrado: " + id));
        verificarDueno(e, docenteId);
        if ("CERRADO".equals(e.getEstado())) {
            throw new BusinessRuleException("El examen ya está cerrado.");
        }
        if ("BORRADOR".equals(e.getEstado())) {
            throw new BusinessRuleException("Un examen en BORRADOR no se cierra; elimínelo o publíquelo.");
        }
        // Los intentos abiertos se cierran y califican con lo respondido hasta ahora
        for (Intento i : intentoRepository.findByExamenId(e.getId())) {
            if ("EN_CURSO".equals(i.getEstado())) {
                i.setEstado("VENCIDO");
                i.setEnviadoEn(LocalDateTime.now());
                intentoRepository.save(i);
                calificacionAutomaticaService.calificarIntento(i.getId());
            }
        }
        e.setEstado("CERRADO");
        return toResponse(examenRepository.save(e));
    }

    @Transactional(readOnly = true)
    public List<ExamenDisponibleResponse> listarDisponiblesAlumno(Long alumnoId) {
        List<MatriculaLocal> matriculas = matriculaLocalRepository.findByAlumnoId(alumnoId);
        if (matriculas.isEmpty()) {
            return List.of();
        }

        LocalDateTime ahora = LocalDateTime.now();
        List<ExamenDisponibleResponse> disponibles = new ArrayList<>();

        for (MatriculaLocal m : matriculas) {
            if ("MATRICULADO".equals(m.getEstado())) {
                List<Examen> examenes = examenRepository.findExamenesDisponiblesAlumno(m.getSeccionId(), ahora);
                for (Examen e : examenes) {
                    short intentosUsados = intentoRepository.countByExamenIdAndMatriculaId(e.getId(), m.getMatriculaId());
                    boolean puedeRendir = intentosUsados < e.getIntentosMax();

                    disponibles.add(ExamenDisponibleResponse.builder()
                        .examenId(e.getId())
                        .cursoId(e.getCursoId())
                        .titulo(e.getTitulo())
                        .instrucciones(e.getInstrucciones())
                        .fechaInicio(e.getFechaInicio())
                        .fechaFin(e.getFechaFin())
                        .duracionMin(e.getDuracionMin())
                        .intentosMax(e.getIntentosMax())
                        .intentosRealizados(intentosUsados)
                        .puedeRendir(puedeRendir)
                        .puntajeTotal(e.getPuntajeTotal())
                        .build());
                }
            }
        }

        return disponibles;
    }

    public ExamenResponse toResponse(Examen e) {
        return ExamenResponse.builder()
            .id(e.getId())
            .anioId(e.getAnioId())
            .periodoId(e.getPeriodoId())
            .seccionId(e.getSeccionId())
            .cursoId(e.getCursoId())
            .docenteId(e.getDocenteId())
            .titulo(e.getTitulo())
            .instrucciones(e.getInstrucciones())
            .fechaInicio(e.getFechaInicio())
            .fechaFin(e.getFechaFin())
            .duracionMin(e.getDuracionMin())
            .intentosMax(e.getIntentosMax())
            .barajarPreguntas(e.getBarajarPreguntas())
            .puntajeTotal(e.getPuntajeTotal())
            .estado(e.getEstado())
            .creadoEn(e.getCreadoEn())
            .publicadoEn(e.getPublicadoEn())
            .build();
    }
}
```

---

## 34. `IntentoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/IntentoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Intento`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.config.ExamenProperties;
import pe.edu.upeu.eduspace.examenes.dto.IntentoIniciadoResponse;
import pe.edu.upeu.eduspace.examenes.dto.IntentoResultadoResponse;
import pe.edu.upeu.eduspace.examenes.entity.*;
import pe.edu.upeu.eduspace.examenes.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.examenes.repository.*;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class IntentoService {

    private final ExamenRepository examenRepository;
    private final IntentoRepository intentoRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;
    private final RespuestaRepository respuestaRepository;
    private final CalificacionAutomaticaService calificacionAutomaticaService;
    private final ExamenProperties examenProperties;

    @Transactional
    public IntentoIniciadoResponse iniciarIntento(Long examenId, Long alumnoId) {
        Examen examen = examenRepository.findById(examenId)
            .orElseThrow(() -> new ResourceNotFoundException("Examen no encontrado: " + examenId));

        if (!"PUBLICADO".equals(examen.getEstado())) {
            throw new BusinessRuleException("El examen no se encuentra en estado PUBLICADO.");
        }

        LocalDateTime ahora = LocalDateTime.now();
        if (ahora.isBefore(examen.getFechaInicio()) || ahora.isAfter(examen.getFechaFin())) {
            throw new BusinessRuleException("El examen no está en su ventana de fechas habilitada.");
        }

        MatriculaLocal matricula = matriculaLocalRepository.findByAlumnoIdAndSeccionIdAndEstado(alumnoId, examen.getSeccionId(), "MATRICULADO")
            .orElseThrow(() -> new BusinessRuleException("El alumno no está matriculado en la sección correspondiente a este examen."));

        // 1. Verificar si ya tiene un intento EN_CURSO vigente (Reanudación por corte de red)
        Optional<Intento> intentoActivo = intentoRepository.findFirstByExamenIdAndMatriculaIdAndEstado(examenId, matricula.getMatriculaId(), "EN_CURSO");
        if (intentoActivo.isPresent()) {
            Intento activo = intentoActivo.get();
            if (ahora.isBefore(activo.getVenceEn())) {
                log.info("Reanudando intento ID {} para alumno {}", activo.getId(), alumnoId);
                return construirIntentoResponse(activo, examen);
            } else {
                // Venció mientras estaba desconectado: cerrarlo y calificar
                activo.setEstado("VENCIDO");
                intentoRepository.save(activo);
                calificacionAutomaticaService.calificarIntento(activo.getId());
            }
        }

        // 2. Verificar número de intentos disponibles
        short usados = intentoRepository.countByExamenIdAndMatriculaId(examenId, matricula.getMatriculaId());
        if (usados >= examen.getIntentosMax()) {
            throw new BusinessRuleException(String.format("Ha alcanzado el límite máximo de intentos permitidos (%d).", examen.getIntentosMax()));
        }

        // 3. Calcular vencimiento en SERVIDOR: min(iniciado + duracion, fecha_fin)
        LocalDateTime duracionFin = ahora.plusMinutes(examen.getDuracionMin());
        LocalDateTime venceEn = duracionFin.isBefore(examen.getFechaFin()) ? duracionFin : examen.getFechaFin();

        Intento nuevoIntento = Intento.builder()
            .examen(examen)
            .matriculaId(matricula.getMatriculaId())
            .alumnoId(alumnoId)
            .numero((short) (usados + 1))
            .iniciadoEn(ahora)
            .venceEn(venceEn)
            .estado("EN_CURSO")
            .build();

        Intento guardado = intentoRepository.save(nuevoIntento);
        log.info("Iniciado intento ID {} (número {}) para alumno {}", guardado.getId(), guardado.getNumero(), alumnoId);

        return construirIntentoResponse(guardado, examen);
    }

    @Transactional
    public IntentoResultadoResponse enviarIntento(Long intentoId, Long alumnoId) {
        Intento intento = intentoRepository.findById(intentoId)
            .orElseThrow(() -> new ResourceNotFoundException("Intento no encontrado: " + intentoId));

        if (!intento.getAlumnoId().equals(alumnoId)) {
            throw new BusinessRuleException("No está autorizado para enviar este intento.");
        }

        if (!"EN_CURSO".equals(intento.getEstado())) {
            throw new BusinessRuleException("El intento ya fue enviado o cerrado previamente.");
        }

        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime limiteConGracia = intento.getVenceEn().plusSeconds(examenProperties.getMargenGraciaSegundos());

        intento.setEnviadoEn(ahora);
        if (ahora.isAfter(limiteConGracia)) {
            log.warn("Intento {} enviado después del límite con gracia. Marcado como VENCIDO.", intentoId);
            intento.setEstado("VENCIDO");
        } else {
            intento.setEstado("ENVIADO");
        }
        intentoRepository.save(intento);

        // Disparar calificación
        return calificacionAutomaticaService.calificarIntento(intentoId);
    }

    @Transactional(readOnly = true)
    public IntentoResultadoResponse obtenerResultado(Long intentoId) {
        Intento intento = intentoRepository.findById(intentoId)
            .orElseThrow(() -> new ResourceNotFoundException("Intento no encontrado: " + intentoId));

        boolean requiereRev = intento.getRespuestas().stream().anyMatch(Respuesta::getRequiereRevision);

        return IntentoResultadoResponse.builder()
            .intentoId(intento.getId())
            .examenId(intento.getExamen().getId())
            .tituloExamen(intento.getExamen().getTitulo())
            .numeroIntento(intento.getNumero())
            .estado(intento.getEstado())
            .puntajeObtenido(intento.getPuntajeObtenido())
            .puntajeTotal(intento.getExamen().getPuntajeTotal())
            .nota(intento.getNota())
            .iniciadoEn(intento.getIniciadoEn())
            .enviadoEn(intento.getEnviadoEn())
            .calificadoEn(intento.getCalificadoEn())
            .requiereRevisionAbiertas(requiereRev)
            .build();
    }

    private IntentoIniciadoResponse construirIntentoResponse(Intento intento, Examen examen) {
        List<ExamenPregunta> examenPreguntas = new ArrayList<>(examen.getPreguntas());
        if (Boolean.TRUE.equals(examen.getBarajarPreguntas())) {
            // Barajado determinista usando hash del intento para consistencia en reconexiones
            Collections.shuffle(examenPreguntas, new Random(intento.getId()));
        }

        Map<Long, Respuesta> respuestasPrevias = new HashMap<>();
        for (Respuesta r : intento.getRespuestas()) {
            respuestasPrevias.put(r.getPregunta().getId(), r);
        }

        List<IntentoIniciadoResponse.PreguntaEstudianteDto> listaPreguntas = new ArrayList<>();
        short orden = 1;
        for (ExamenPregunta ep : examenPreguntas) {
            Pregunta p = ep.getPregunta();
            Respuesta previa = respuestasPrevias.get(p.getId());

            List<IntentoIniciadoResponse.OpcionEstudianteDto> opcionesEst = p.getOpciones().stream()
                .map(o -> IntentoIniciadoResponse.OpcionEstudianteDto.builder()
                    .id(o.getId())
                    .texto(o.getTexto())
                    .orden(o.getOrden())
                    .build())
                .toList();

            listaPreguntas.add(IntentoIniciadoResponse.PreguntaEstudianteDto.builder()
                .preguntaId(p.getId())
                .orden(orden++)
                .puntaje(ep.getPuntaje())
                .tipo(p.getTipo())
                .enunciado(p.getEnunciado())
                .opciones(opcionesEst)
                .opcionesRespondidas(previa != null ? previa.getOpcionesIds() : null)
                .textoRespondido(previa != null ? previa.getTextoRespuesta() : null)
                .build());
        }

        return IntentoIniciadoResponse.builder()
            .intentoId(intento.getId())
            .examenId(examen.getId())
            .tituloExamen(examen.getTitulo())
            .numeroIntento(intento.getNumero())
            .iniciadoEn(intento.getIniciadoEn())
            .venceEn(intento.getVenceEn())
            .puntajeTotal(examen.getPuntajeTotal())
            .preguntas(listaPreguntas)
            .build();
    }
}
```

---

## 35. `MatriculaLocalService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/MatriculaLocalService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `MatriculaLocal`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.examenes.event.MatriculaEvent;
import pe.edu.upeu.eduspace.examenes.repository.MatriculaLocalRepository;

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
        ml.setActualizadoEn(LocalDateTime.now());

        log.info("Sincronizada matrícula local {} para alumno {} en examenes-ms", ml.getMatriculaId(), ml.getAlumnoId());
        return matriculaLocalRepository.save(ml);
    }
}
```

---

## 36. `PreguntaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/PreguntaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Pregunta`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.dto.*;
import pe.edu.upeu.eduspace.examenes.entity.OpcionPregunta;
import pe.edu.upeu.eduspace.examenes.entity.Pregunta;
import pe.edu.upeu.eduspace.examenes.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.examenes.repository.OpcionPreguntaRepository;
import pe.edu.upeu.eduspace.examenes.repository.PreguntaRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PreguntaService {

    private final PreguntaRepository preguntaRepository;
    private final OpcionPreguntaRepository opcionPreguntaRepository;

    @Transactional(readOnly = true)
    public PageResponse<PreguntaResponse> listarBanco(Long cursoId, Long docenteId, String tema, String tipo, Pageable pageable) {
        Page<Pregunta> page = preguntaRepository.findBancoPreguntas(cursoId, docenteId, tema == null ? "" : tema.trim(), tipo == null || tipo.isBlank() ? null : tipo, pageable);
        return PageResponse.from(page.map(this::toResponse));
    }

    @Transactional(readOnly = true)
    public PreguntaResponse obtenerPorId(Long id) {
        Pregunta p = preguntaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pregunta no encontrada con ID: " + id));
        return toResponse(p);
    }

    @Transactional
    public PreguntaResponse crear(PreguntaRequest req, Long docenteId) {
        validarReglasPregunta(req.getTipo(), req.getOpciones());

        Pregunta p = Pregunta.builder()
            .cursoId(req.getCursoId())
            .docenteId(docenteId)
            .tema(req.getTema())
            .tipo(req.getTipo())
            .enunciado(req.getEnunciado())
            .puntaje(req.getPuntaje())
            .activa(req.getActiva() != null ? req.getActiva() : true)
            .creadaEn(LocalDateTime.now())
            .build();

        Pregunta guardada = preguntaRepository.save(p);

        if (req.getOpciones() != null && !req.getOpciones().isEmpty()) {
            List<OpcionPregunta> opciones = new ArrayList<>();
            short orden = 1;
            for (OpcionRequest opReq : req.getOpciones()) {
                OpcionPregunta op = OpcionPregunta.builder()
                    .pregunta(guardada)
                    .texto(opReq.getTexto())
                    .esCorrecta(opReq.getEsCorrecta() != null ? opReq.getEsCorrecta() : false)
                    .orden(opReq.getOrden() != null ? opReq.getOrden() : orden++)
                    .build();
                opciones.add(opcionPreguntaRepository.save(op));
            }
            guardada.setOpciones(opciones);
        }

        return toResponse(guardada);
    }

    @Transactional
    public PreguntaResponse actualizar(Long id, PreguntaRequest req, Long docenteId) {
        Pregunta p = preguntaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pregunta no encontrada con ID: " + id));
        verificarDuenio(p, docenteId);

        // Regla: no se edita si ya se usó en un examen publicado
        if (preguntaRepository.isPreguntaEnUsoEnExamenPublicado(id)) {
            throw new BusinessRuleException("No se puede modificar una pregunta ya utilizada en un examen publicado. Debe duplicarla o crear una nueva.");
        }

        validarReglasPregunta(req.getTipo(), req.getOpciones());

        p.setTema(req.getTema());
        p.setTipo(req.getTipo());
        p.setEnunciado(req.getEnunciado());
        p.setPuntaje(req.getPuntaje());
        if (req.getActiva() != null) {
            p.setActiva(req.getActiva());
        }

        p.getOpciones().clear();
        if (req.getOpciones() != null) {
            short orden = 1;
            for (OpcionRequest opReq : req.getOpciones()) {
                OpcionPregunta op = OpcionPregunta.builder()
                    .pregunta(p)
                    .texto(opReq.getTexto())
                    .esCorrecta(opReq.getEsCorrecta() != null ? opReq.getEsCorrecta() : false)
                    .orden(opReq.getOrden() != null ? opReq.getOrden() : orden++)
                    .build();
                p.getOpciones().add(op);
            }
        }

        return toResponse(preguntaRepository.save(p));
    }

    @Transactional
    public void eliminar(Long id, Long docenteId) {
        Pregunta p = preguntaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pregunta no encontrada con ID: " + id));
        verificarDuenio(p, docenteId);
        if (preguntaRepository.isPreguntaEnUsoEnExamenPublicado(id)) {
            p.setActiva(false);
            preguntaRepository.save(p);
            log.info("Pregunta {} desactivada lógicamente por estar en exámenes publicados.", id);
            return;
        }
        preguntaRepository.deleteById(id);
    }

    /** Solo el docente que creó la pregunta puede modificarla o eliminarla. */
    private void verificarDuenio(Pregunta p, Long docenteId) {
        if (docenteId == null || !docenteId.equals(p.getDocenteId())) {
            throw new AccessDeniedException("La pregunta pertenece a otro docente");
        }
    }

    private void validarReglasPregunta(String tipo, List<OpcionRequest> opciones) {
        if ("ABIERTA".equals(tipo)) {
            return;
        }

        if (opciones == null || opciones.isEmpty()) {
            throw new BusinessRuleException("Las preguntas de tipo " + tipo + " deben tener opciones.");
        }

        long correctas = opciones.stream().filter(o -> Boolean.TRUE.equals(o.getEsCorrecta())).count();

        switch (tipo) {
            case "OPCION_UNICA" -> {
                if (correctas != 1) {
                    throw new BusinessRuleException("Las preguntas de OPCION_UNICA deben tener exactamente una opción marcada como correcta.");
                }
            }
            case "OPCION_MULTIPLE" -> {
                if (correctas < 1) {
                    throw new BusinessRuleException("Las preguntas de OPCION_MULTIPLE deben tener al menos una opción correcta.");
                }
            }
            case "VERDADERO_FALSO" -> {
                if (opciones.size() != 2) {
                    throw new BusinessRuleException("Las preguntas de VERDADERO_FALSO deben tener exactamente dos opciones.");
                }
                if (correctas != 1) {
                    throw new BusinessRuleException("Las preguntas de VERDADERO_FALSO deben tener exactamente una opción verdadera/correcta.");
                }
            }
        }
    }

    public PreguntaResponse toResponse(Pregunta p) {
        List<OpcionResponse> ops = p.getOpciones().stream()
            .map(o -> OpcionResponse.builder()
                .id(o.getId())
                .texto(o.getTexto())
                .esCorrecta(o.getEsCorrecta())
                .orden(o.getOrden())
                .build())
            .toList();

        return PreguntaResponse.builder()
            .id(p.getId())
            .cursoId(p.getCursoId())
            .docenteId(p.getDocenteId())
            .tema(p.getTema())
            .tipo(p.getTipo())
            .enunciado(p.getEnunciado())
            .puntaje(p.getPuntaje())
            .activa(p.getActiva())
            .creadaEn(p.getCreadaEn())
            .opciones(ops)
            .build();
    }
}
```

---

## 37. `RespuestaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/RespuestaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Respuesta`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.config.ExamenProperties;
import pe.edu.upeu.eduspace.examenes.dto.GuardarRespuestaRequest;
import pe.edu.upeu.eduspace.examenes.entity.Intento;
import pe.edu.upeu.eduspace.examenes.entity.Pregunta;
import pe.edu.upeu.eduspace.examenes.entity.Respuesta;
import pe.edu.upeu.eduspace.examenes.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.examenes.repository.ExamenPreguntaRepository;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.repository.PreguntaRepository;
import pe.edu.upeu.eduspace.examenes.repository.RespuestaRepository;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class RespuestaService {

    private final RespuestaRepository respuestaRepository;
    private final IntentoRepository intentoRepository;
    private final PreguntaRepository preguntaRepository;
    private final ExamenProperties examenProperties;
    private final ExamenPreguntaRepository examenPreguntaRepository;

    @Transactional
    public void guardarRespuestaIncremental(Long intentoId, Long preguntaId, GuardarRespuestaRequest req, Long alumnoId) {
        Intento intento = intentoRepository.findById(intentoId)
            .orElseThrow(() -> new ResourceNotFoundException("Intento no encontrado: " + intentoId));

        if (!intento.getAlumnoId().equals(alumnoId)) {
            throw new BusinessRuleException("No está autorizado para responder en este intento.");
        }

        if (!"EN_CURSO".equals(intento.getEstado())) {
            throw new BusinessRuleException("El intento no se encuentra en curso (estado: " + intento.getEstado() + ").");
        }

        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime limiteConGracia = intento.getVenceEn().plusSeconds(examenProperties.getMargenGraciaSegundos());
        if (ahora.isAfter(limiteConGracia)) {
            throw new BusinessRuleException("El tiempo límite para rendir este examen ha expirado.");
        }

        Pregunta pregunta = preguntaRepository.findById(preguntaId)
            .orElseThrow(() -> new ResourceNotFoundException("Pregunta no encontrada: " + preguntaId));

        if (examenPreguntaRepository.findByExamenIdOrderByOrdenAsc(intento.getExamen().getId()).stream()
                .noneMatch(ep -> ep.getPregunta().getId().equals(preguntaId))) {
            throw new BusinessRuleException("La pregunta " + preguntaId + " no pertenece a este examen.");
        }

        // UPSERT incremental
        Respuesta r = respuestaRepository.findByIntentoIdAndPreguntaId(intentoId, preguntaId)
            .orElseGet(() -> Respuesta.builder()
                .intento(intento)
                .pregunta(pregunta)
                .requiereRevision("ABIERTA".equals(pregunta.getTipo()))
                .build());

        r.setOpcionesIds(req.getOpcionesIds());
        r.setTextoRespuesta(req.getTextoRespuesta());
        r.setGuardadaEn(ahora);

        respuestaRepository.save(r);
        log.debug("Respuesta incremental guardada para intento {} pregunta {}", intentoId, preguntaId);
    }
}
```

---

## 38. `ResultadosService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/ResultadosService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Resultados`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.dto.ResultadosExamenResponse;
import pe.edu.upeu.eduspace.examenes.entity.Examen;
import pe.edu.upeu.eduspace.examenes.entity.Intento;
import pe.edu.upeu.eduspace.examenes.entity.MatriculaLocal;
import pe.edu.upeu.eduspace.examenes.entity.Respuesta;
import pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.examenes.repository.ExamenRepository;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.repository.MatriculaLocalRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ResultadosService {

    private final ExamenRepository examenRepository;
    private final IntentoRepository intentoRepository;
    private final MatriculaLocalRepository matriculaLocalRepository;

    @Transactional(readOnly = true)
    public ResultadosExamenResponse obtenerEstadisticasExamen(Long examenId) {
        Examen examen = examenRepository.findById(examenId)
            .orElseThrow(() -> new ResourceNotFoundException("Examen no encontrado: " + examenId));

        List<Intento> intentos = intentoRepository.findByExamenId(examenId);
        List<MatriculaLocal> matriculas = matriculaLocalRepository.findBySeccionIdAndEstado(examen.getSeccionId(), "MATRICULADO");
        Map<Long, String> nombresAlumnos = new HashMap<>();
        for (MatriculaLocal m : matriculas) {
            nombresAlumnos.put(m.getAlumnoId(), m.getAlumnoNombre());
        }

        List<ResultadosExamenResponse.IntentoEstudianteResumen> resumenes = new ArrayList<>();
        BigDecimal sumaNotas = BigDecimal.ZERO;
        BigDecimal notaMax = BigDecimal.ZERO;
        BigDecimal notaMin = BigDecimal.valueOf(20);
        int evaluados = 0;

        for (Intento i : intentos) {
            boolean requiereRev = i.getRespuestas().stream().anyMatch(Respuesta::getRequiereRevision);
            if (i.getNota() != null) {
                sumaNotas = sumaNotas.add(i.getNota());
                notaMax = notaMax.max(i.getNota());
                notaMin = notaMin.min(i.getNota());
                evaluados++;
            }

            resumenes.add(ResultadosExamenResponse.IntentoEstudianteResumen.builder()
                .intentoId(i.getId())
                .alumnoId(i.getAlumnoId())
                .alumnoNombre(nombresAlumnos.getOrDefault(i.getAlumnoId(), "Alumno " + i.getAlumnoId()))
                .numeroIntento(i.getNumero())
                .estado(i.getEstado())
                .puntajeObtenido(i.getPuntajeObtenido())
                .nota(i.getNota())
                .requiereRevision(requiereRev)
                .build());
        }

        BigDecimal promedio = evaluados > 0 ?
            sumaNotas.divide(BigDecimal.valueOf(evaluados), 2, RoundingMode.HALF_UP) : BigDecimal.ZERO;

        return ResultadosExamenResponse.builder()
            .examenId(examen.getId())
            .titulo(examen.getTitulo())
            .puntajeTotal(examen.getPuntajeTotal())
            .totalIntentos(intentos.size())
            .alumnosEvaluados(evaluados)
            .promedioNotas(promedio)
            .notaMaxima(evaluados > 0 ? notaMax : BigDecimal.ZERO)
            .notaMinima(evaluados > 0 ? notaMin : BigDecimal.ZERO)
            .intentos(resumenes)
            .build();
    }
}
```

---

## 39. `RevisionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/service/RevisionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Revision`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.dto.RevisionRequest;
import pe.edu.upeu.eduspace.examenes.entity.Examen;
import pe.edu.upeu.eduspace.examenes.entity.Intento;
import pe.edu.upeu.eduspace.examenes.entity.Respuesta;
import pe.edu.upeu.eduspace.examenes.event.ExamenCalificadoEvent;
import pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.examenes.messaging.ExamenEventProducer;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.repository.RespuestaRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RevisionService {

    private final RespuestaRepository respuestaRepository;
    private final IntentoRepository intentoRepository;
    private final ExamenEventProducer examenEventProducer;

    @Transactional
    public void revisarRespuestaAbierta(Long respuestaId, RevisionRequest req, Long docenteId) {
        Respuesta r = respuestaRepository.findById(respuestaId)
            .orElseThrow(() -> new ResourceNotFoundException("Respuesta no encontrada: " + respuestaId));

        r.setPuntajeObtenido(req.getPuntajeObtenido());
        r.setRequiereRevision(false);
        r.setRevisadaPor(docenteId);
        respuestaRepository.save(r);

        Intento intento = r.getIntento();
        List<Respuesta> todasRespuestas = respuestaRepository.findByIntentoId(intento.getId());
        boolean quedanPendientes = todasRespuestas.stream().anyMatch(resp -> Boolean.TRUE.equals(resp.getRequiereRevision()));

        if (!quedanPendientes) {
            BigDecimal sumaTotal = todasRespuestas.stream()
                .map(resp -> resp.getPuntajeObtenido() != null ? resp.getPuntajeObtenido() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            Examen examen = intento.getExamen();
            BigDecimal nota = BigDecimal.ZERO;
            if (examen.getPuntajeTotal().compareTo(BigDecimal.ZERO) > 0) {
                nota = sumaTotal.multiply(BigDecimal.valueOf(20))
                    .divide(examen.getPuntajeTotal(), 2, RoundingMode.HALF_UP)
                    .min(BigDecimal.valueOf(20))
                    .max(BigDecimal.ZERO);
            }

            intento.setPuntajeObtenido(sumaTotal);
            intento.setNota(nota);
            intento.setEstado("CALIFICADO");
            intento.setCalificadoEn(LocalDateTime.now());
            intentoRepository.save(intento);

            // Emitir evento examen.calificado actualizado
            examenEventProducer.publicarExamenCalificado(ExamenCalificadoEvent.builder()
                .examenId(examen.getId())
                .intentoId(intento.getId())
                .alumnoId(intento.getAlumnoId())
                .matriculaId(intento.getMatriculaId())
                .seccionId(examen.getSeccionId())
                .cursoId(examen.getCursoId())
                .periodoId(examen.getPeriodoId())
                .titulo(examen.getTitulo())
                .nota(nota)
                .build());

            log.info("Revisión completada para intento {}. Nota final: {}", intento.getId(), nota);
        }
    }
}
```

---

## 40. `ExamenController.java` — Controladores REST API

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/controller/ExamenController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Examen`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.examenes.controller;

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
import pe.edu.upeu.eduspace.examenes.dto.*;
import pe.edu.upeu.eduspace.examenes.entity.Intento;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.security.IdentidadService;
import pe.edu.upeu.eduspace.examenes.service.ExamenService;
import pe.edu.upeu.eduspace.examenes.service.ResultadosService;
import pe.edu.upeu.eduspace.examenes.service.RevisionService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/examenes")
@RequiredArgsConstructor
@Tag(name = "Exámenes", description = "Programación, publicación, rendición y resultados de exámenes")
public class ExamenController {

    private final ExamenService examenService;
    private final ResultadosService resultadosService;
    private final RevisionService revisionService;
    private final IntentoRepository intentoRepository;
    private final IdentidadService identidad;

    @GetMapping
    @Operation(summary = "Listado paginado de exámenes por sección, curso o estado")
    public ResponseEntity<PageResponse<ExamenResponse>> listar(
            @RequestParam(required = false) Long seccionId,
            @RequestParam(required = false) Long cursoId,
            @RequestParam(required = false) Long docenteId,
            @RequestParam(required = false) String estado,
            Pageable pageable) {
        return ResponseEntity.ok(examenService.listarExamenes(seccionId, cursoId, docenteId, estado, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle completo de un examen (para docente)")
    public ResponseEntity<ExamenDetalleResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(examenService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo examen en estado BORRADOR (DOCENTE)")
    public ResponseEntity<ExamenResponse> crear(@Valid @RequestBody ExamenCreateRequest req,
                                               @AuthenticationPrincipal Jwt jwt) {
        Long docenteId = identidad.docenteId(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(examenService.crear(req, docenteId));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar un examen en BORRADOR (DOCENTE dueño)")
    public ResponseEntity<ExamenResponse> actualizar(@PathVariable Long id,
                                                     @Valid @RequestBody ExamenCreateRequest req,
                                                     @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(examenService.actualizar(id, req, identidad.docenteId(jwt)));
    }

    @PatchMapping("/{id}/publicar")
    @Operation(summary = "Publicar examen y emitir evento Kafka (DOCENTE)")
    public ResponseEntity<ExamenResponse> publicar(@PathVariable Long id,
                                                   @AuthenticationPrincipal Jwt jwt) {
        Long docenteId = identidad.docenteId(jwt);
        return ResponseEntity.ok(examenService.publicar(id, docenteId));
    }

    @PatchMapping("/{id}/cerrar")
    @Operation(summary = "Cerrar examen manualmente (DOCENTE, ADMIN)")
    public ResponseEntity<ExamenResponse> cerrar(@PathVariable Long id,
                                                 @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(examenService.cerrar(id, identidad.docenteId(jwt)));
    }

    @GetMapping("/disponibles")
    @Operation(summary = "Exámenes disponibles para rendir hoy (ALUMNO)")
    public ResponseEntity<List<ExamenDisponibleResponse>> disponibles(@AuthenticationPrincipal Jwt jwt) {
        Long alumnoId = identidad.alumnoId(jwt);
        return ResponseEntity.ok(examenService.listarDisponiblesAlumno(alumnoId));
    }

    @GetMapping("/{id}/resultados")
    @Operation(summary = "Estadísticas y notas de alumnos en el examen (DOCENTE, ADMIN)")
    public ResponseEntity<ResultadosExamenResponse> resultados(@PathVariable Long id) {
        return ResponseEntity.ok(resultadosService.obtenerEstadisticasExamen(id));
    }

    @GetMapping("/{id}/pendientes-revision")
    @Operation(summary = "Intentos que tienen preguntas abiertas pendientes de calificar (DOCENTE)")
    public ResponseEntity<List<Long>> pendientesRevision(@PathVariable Long id) {
        List<Intento> pendientes = intentoRepository.findIntentosPendientesRevision(id);
        return ResponseEntity.ok(pendientes.stream().map(Intento::getId).toList());
    }

    @PatchMapping("/respuestas/{id}/revisar")
    @Operation(summary = "Calificar puntaje de una respuesta abierta (DOCENTE)")
    public ResponseEntity<Void> revisarRespuesta(@PathVariable Long id,
                                                @Valid @RequestBody RevisionRequest req,
                                                @AuthenticationPrincipal Jwt jwt) {
        Long docenteId = identidad.docenteId(jwt);
        revisionService.revisarRespuestaAbierta(id, req, docenteId);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 41. `IntentoController.java` — Controladores REST API

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/controller/IntentoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Intento`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.examenes.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.examenes.dto.GuardarRespuestaRequest;
import pe.edu.upeu.eduspace.examenes.dto.IntentoIniciadoResponse;
import pe.edu.upeu.eduspace.examenes.dto.IntentoResultadoResponse;
import pe.edu.upeu.eduspace.examenes.entity.Intento;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.security.IdentidadService;
import pe.edu.upeu.eduspace.examenes.service.IntentoService;
import pe.edu.upeu.eduspace.examenes.service.RespuestaService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/examenes")
@RequiredArgsConstructor
@Tag(name = "Intentos de Examen", description = "Rendición de exámenes por estudiantes")
public class IntentoController {

    private final IntentoService intentoService;
    private final RespuestaService respuestaService;
    private final IntentoRepository intentoRepository;
    private final IdentidadService identidad;

    @PostMapping("/{id}/intentos")
    @Operation(summary = "Iniciar o reanudar intento de examen (ALUMNO)")
    public ResponseEntity<IntentoIniciadoResponse> iniciarIntento(@PathVariable Long id,
                                                                 @AuthenticationPrincipal Jwt jwt) {
        Long alumnoId = identidad.alumnoId(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(intentoService.iniciarIntento(id, alumnoId));
    }

    @PutMapping("/intentos/{id}/respuestas/{preguntaId}")
    @Operation(summary = "Guardado incremental de respuesta a una pregunta (ALUMNO)")
    public ResponseEntity<Void> guardarRespuesta(@PathVariable Long id,
                                                @PathVariable Long preguntaId,
                                                @RequestBody GuardarRespuestaRequest req,
                                                @AuthenticationPrincipal Jwt jwt) {
        Long alumnoId = identidad.alumnoId(jwt);
        respuestaService.guardarRespuestaIncremental(id, preguntaId, req, alumnoId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/intentos/{id}/enviar")
    @Operation(summary = "Finalizar y enviar examen para calificación (ALUMNO)")
    public ResponseEntity<IntentoResultadoResponse> enviarIntento(@PathVariable Long id,
                                                                 @AuthenticationPrincipal Jwt jwt) {
        Long alumnoId = identidad.alumnoId(jwt);
        return ResponseEntity.ok(intentoService.enviarIntento(id, alumnoId));
    }

    @GetMapping("/intentos/{id}/resultado")
    @Operation(summary = "Consultar resultado y nota de un intento (ALUMNO, APODERADO, DOCENTE)")
    public ResponseEntity<IntentoResultadoResponse> obtenerResultado(@PathVariable Long id,
                                                                     @AuthenticationPrincipal Jwt jwt) {
        Intento intento = intentoRepository.findById(id)
            .orElseThrow(() -> new pe.edu.upeu.eduspace.examenes.exception.ResourceNotFoundException("Intento no encontrado: " + id));
        if (!identidad.roles(jwt).contains("ADMIN") && !identidad.roles(jwt).contains("DOCENTE")
                && !identidad.alumnosVisibles(jwt).contains(intento.getAlumnoId())) {
            throw new org.springframework.security.access.AccessDeniedException("No puede ver el resultado de este intento.");
        }
        return ResponseEntity.ok(intentoService.obtenerResultado(id));
    }

    @GetMapping("/mias")
    @Operation(summary = "Listar exámenes e intentos rendidos por el usuario o sus hijos")
    public ResponseEntity<List<IntentoResultadoResponse>> misIntentos(@AuthenticationPrincipal Jwt jwt) {
        List<IntentoResultadoResponse> respuestas = new ArrayList<>();
        for (Long alumnoId : identidad.alumnosVisibles(jwt)) {
            for (Intento i : intentoRepository.findByAlumnoIdOrderByIniciadoEnDesc(alumnoId)) {
                respuestas.add(intentoService.obtenerResultado(i.getId()));
            }
        }
        return ResponseEntity.ok(respuestas);
    }
}
```

---

## 42. `PreguntaController.java` — Controladores REST API

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/controller/PreguntaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Pregunta`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.examenes.controller;

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
import pe.edu.upeu.eduspace.examenes.dto.PageResponse;
import pe.edu.upeu.eduspace.examenes.dto.PreguntaRequest;
import pe.edu.upeu.eduspace.examenes.dto.PreguntaResponse;
import pe.edu.upeu.eduspace.examenes.service.PreguntaService;

@RestController
@RequestMapping("/api/v1/examenes/preguntas")
@RequiredArgsConstructor
@Tag(name = "Banco de Preguntas", description = "Gestión de preguntas y opciones del docente")
public class PreguntaController {

    private final PreguntaService preguntaService;
    private final pe.edu.upeu.eduspace.examenes.security.IdentidadService identidad;

    @GetMapping
    @Operation(summary = "Consultar banco de preguntas filtrado por curso, tema o tipo")
    public ResponseEntity<PageResponse<PreguntaResponse>> listar(
            @RequestParam Long cursoId,
            @RequestParam(required = false) Long docenteId,
            @RequestParam(required = false) String tema,
            @RequestParam(required = false) String tipo,
            Pageable pageable) {
        return ResponseEntity.ok(preguntaService.listarBanco(cursoId, docenteId, tema, tipo, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de pregunta por ID")
    public ResponseEntity<PreguntaResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(preguntaService.obtenerPorId(id));
    }

    @PostMapping
    @Operation(summary = "Crear nueva pregunta en el banco (DOCENTE)")
    public ResponseEntity<PreguntaResponse> crear(@Valid @RequestBody PreguntaRequest req,
                                                  @AuthenticationPrincipal Jwt jwt) {
        Long docenteId = identidad.docenteId(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(preguntaService.crear(req, docenteId));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar pregunta del banco (DOCENTE)")
    public ResponseEntity<PreguntaResponse> actualizar(@PathVariable Long id,
                                                       @Valid @RequestBody PreguntaRequest req,
                                                       @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(preguntaService.actualizar(id, req, identidad.docenteId(jwt)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar o desactivar pregunta (DOCENTE)")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        preguntaService.eliminar(id, identidad.docenteId(jwt));
        return ResponseEntity.noContent().build();
    }
}
```

---

## 43. `ExamenEventProducer.java` — Mensajería Kafka

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/messaging/ExamenEventProducer.java`

### **¿Qué hace esta clase?**
Productor/publicador de eventos Apache Kafka. Envía eventos de dominio hacia topics específicos para que otros microservicios los procesen de forma asíncrona.

```java
package pe.edu.upeu.eduspace.examenes.messaging;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.examenes.config.KafkaConfig;
import pe.edu.upeu.eduspace.examenes.event.EventoSobre;
import pe.edu.upeu.eduspace.examenes.event.ExamenCalificadoEvent;
import pe.edu.upeu.eduspace.examenes.event.ExamenPublicadoEvent;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExamenEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final pe.edu.upeu.eduspace.examenes.client.PlanificacionClient planificacionClient;
    private final ObjectMapper objectMapper;

    public void publicarExamenPublicado(ExamenPublicadoEvent event) {
        try {
            UUID eventId = UUID.randomUUID();
            String traceId = MDC.get("traceId");

            EventoSobre<ExamenPublicadoEvent> sobre = EventoSobre.<ExamenPublicadoEvent>builder()
                .eventId(eventId)
                .eventType(KafkaConfig.TOPIC_EXAMEN_PUBLICADO)
                .occurredAt(LocalDateTime.now())
                .version(1)
                .traceId(traceId != null ? traceId : UUID.randomUUID().toString())
                .payload(event)
                .build();

            String json = EventoSobre.escribir(objectMapper, sobre);
            kafkaTemplate.send(KafkaConfig.TOPIC_EXAMEN_PUBLICADO, String.valueOf(event.getExamenId()), json);
            log.info("Evento examen.publicado emitido para examen ID: {}", event.getExamenId());
        } catch (Exception e) {
            log.error("Error al emitir evento examen.publicado: {}", e.getMessage(), e);
        }
    }

    public void publicarExamenCalificado(ExamenCalificadoEvent event) {
        if (event.getCursoNombre() == null) {
            try {
                var curso = planificacionClient.getCursoPorId(event.getCursoId());
                if (curso != null && curso.get("nombre") != null) event.setCursoNombre(curso.get("nombre").toString());
            } catch (Exception ignored) {
                // el nombre es solo informativo para la notificación
            }
        }
        try {
            UUID eventId = UUID.randomUUID();
            String traceId = MDC.get("traceId");

            EventoSobre<ExamenCalificadoEvent> sobre = EventoSobre.<ExamenCalificadoEvent>builder()
                .eventId(eventId)
                .eventType(KafkaConfig.TOPIC_EXAMEN_CALIFICADO)
                .occurredAt(LocalDateTime.now())
                .version(1)
                .traceId(traceId != null ? traceId : UUID.randomUUID().toString())
                .payload(event)
                .build();

            String json = EventoSobre.escribir(objectMapper, sobre);
            kafkaTemplate.send(KafkaConfig.TOPIC_EXAMEN_CALIFICADO, String.valueOf(event.getExamenId()), json);
            log.info("Evento examen.calificado emitido para alumno {} en examen {} con nota {}",
                event.getAlumnoId(), event.getExamenId(), event.getNota());
        } catch (Exception e) {
            log.error("Error al emitir evento examen.calificado: {}", e.getMessage(), e);
        }
    }
}
```

---

## 44. `MatriculaEventConsumer.java` — Mensajería Kafka

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/messaging/MatriculaEventConsumer.java`

### **¿Qué hace esta clase?**
Consumidor de eventos Apache Kafka. Escucha mensajes de un topic específico y procesa los eventos de dominio recibidos de otros microservicios.

```java
package pe.edu.upeu.eduspace.examenes.messaging;

import tools.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.config.KafkaConfig;
import pe.edu.upeu.eduspace.examenes.entity.EventoProcesado;
import pe.edu.upeu.eduspace.examenes.event.EventoSobre;
import pe.edu.upeu.eduspace.examenes.event.MatriculaEvent;
import pe.edu.upeu.eduspace.examenes.repository.EventoProcesadoRepository;
import pe.edu.upeu.eduspace.examenes.service.MatriculaLocalService;

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
    }, groupId = "examenes-ms")
    @Transactional
    public void procesarEventoMatricula(String mensajeJson) {
        try {
            EventoSobre<MatriculaEvent> sobre = EventoSobre.leer(objectMapper, mensajeJson, MatriculaEvent.class);

            if (sobre.getTraceId() != null) {
                MDC.put("traceId", sobre.getTraceId());
            }

            if (eventoProcesadoRepository.existsByEventId(sobre.getEventId())) {
                log.info("Evento ya procesado previamente en examenes-ms: {}. Descartando.", sobre.getEventId());
                return;
            }

            eventoProcesadoRepository.save(EventoProcesado.builder()
                .eventId(sobre.getEventId())
                .eventType(sobre.getEventType())
                .procesadoEn(LocalDateTime.now())
                .build());

            MatriculaEvent event = sobre.getPayload();
            matriculaLocalService.sincronizarDesdeEvento(event);
        } catch (Exception e) {
            log.error("Error al procesar evento de matrícula en examenes-ms: {}", e.getMessage(), e);
            throw new RuntimeException("Fallo al consumir evento de matrícula", e);
        } finally {
            MDC.remove("traceId");
        }
    }
}
```

---

## 45. `EventoSobre.java` — Eventos de Dominio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/EventoSobre.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.examenes.event;

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

## 46. `ExamenCalificadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/ExamenCalificadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.examenes.event;

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
    private String cursoNombre;
    private String titulo;
    private BigDecimal nota; // Escala 0-20
}
```

---

## 47. `ExamenPublicadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/ExamenPublicadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.examenes.event;

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
public class ExamenPublicadoEvent {

    private Long examenId;
    private Long seccionId;
    private Long cursoId;
    private String cursoNombre;
    private String titulo;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private List<Long> alumnoIds;
}
```

---

## 48. `MatriculaEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/event/MatriculaEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.upeu.eduspace.examenes.event;

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

## 49. `CierreExamenJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/scheduler/CierreExamenJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.examenes.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.entity.Examen;
import pe.edu.upeu.eduspace.examenes.entity.Intento;
import pe.edu.upeu.eduspace.examenes.repository.ExamenRepository;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.service.CalificacionAutomaticaService;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class CierreExamenJob {

    private final ExamenRepository examenRepository;
    private final IntentoRepository intentoRepository;
    private final CalificacionAutomaticaService calificacionAutomaticaService;

    @Scheduled(fixedRate = 300000) // Cada 5 minutos
    @SchedulerLock(name = "examenes_cierre_examen_job", lockAtLeastFor = "30s", lockAtMostFor = "5m")
    @Transactional
    public void cerrarExamenesVencidos() {
        ejecutar();
    }

    @Transactional
    public int ejecutar() {
        LocalDateTime ahora = LocalDateTime.now();
        List<Examen> vencidos = examenRepository.findExamenesVencidosParaCierre(ahora);

        for (Examen e : vencidos) {
            log.info("Cerrando ventana de examen ID {} ('{}')", e.getId(), e.getTitulo());

            // Cerrar cualquier intento que haya quedado EN_CURSO
            List<Intento> abiertos = intentoRepository.findByExamenId(e.getId()).stream()
                .filter(i -> "EN_CURSO".equals(i.getEstado()))
                .toList();

            for (Intento i : abiertos) {
                i.setEstado("VENCIDO");
                intentoRepository.save(i);
                calificacionAutomaticaService.calificarIntento(i.getId());
            }

            e.setEstado("CERRADO");
            examenRepository.save(e);
        }
        return vencidos.size();
    }
}
```

---

## 50. `CierreIntentosJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/scheduler/CierreIntentosJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.examenes.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.entity.Intento;
import pe.edu.upeu.eduspace.examenes.repository.IntentoRepository;
import pe.edu.upeu.eduspace.examenes.service.CalificacionAutomaticaService;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class CierreIntentosJob {

    private final IntentoRepository intentoRepository;
    private final CalificacionAutomaticaService calificacionAutomaticaService;

    @Scheduled(fixedRate = 60000)
    @SchedulerLock(name = "examenes_cierre_intentos_job", lockAtLeastFor = "15s", lockAtMostFor = "2m")
    @Transactional
    public void cerrarIntentosVencidos() {
        ejecutar();
    }

    /** Separado del @Scheduled (con lock de ShedLock) para poder invocarlo directamente. */
    @Transactional
    public int ejecutar() {
        LocalDateTime ahora = LocalDateTime.now();
        List<Intento> intentosVencidos = intentoRepository.findIntentosVencidosEnCurso(ahora);

        for (Intento i : intentosVencidos) {
            log.info("Cerrando automáticamente intento vencido ID {} del alumno {}", i.getId(), i.getAlumnoId());
            i.setEstado("VENCIDO");
            intentoRepository.save(i);
            calificacionAutomaticaService.calificarIntento(i.getId());
        }
        return intentosVencidos.size();
    }
}
```

---

## 51. `LimpiezaJob.java` — Tareas Programadas (Schedulers)

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/scheduler/LimpiezaJob.java`

### **¿Qué hace esta clase?**
Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática.

```java
package pe.edu.upeu.eduspace.examenes.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.examenes.repository.EventoProcesadoRepository;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class LimpiezaJob {

    private final EventoProcesadoRepository eventoProcesadoRepository;

    @Scheduled(cron = "0 0 3 * * *", zone = "America/Lima")
    @SchedulerLock(name = "examenes_limpieza_job", lockAtLeastFor = "15s", lockAtMostFor = "10m")
    @Transactional
    public void limpiarTablasTecnicas() {
        LocalDateTime limite = LocalDateTime.now().minusDays(30);
        long eliminados = eventoProcesadoRepository.deleteByProcesadoEnBefore(limite);
        log.info("Limpieza técnica en examenes-ms: {} eventos procesados eliminados con más de 30 días.", eliminados);
    }
}
```

---

## 52. `CacheConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/CacheConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.examenes.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    public static final String CACHE_ASIGNACIONES = "asignacionesDocenteCache";
    public static final String CACHE_CURSOS = "infoCursoPeriodoCache";

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(CACHE_ASIGNACIONES, CACHE_CURSOS);
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .expireAfterWrite(2, TimeUnit.MINUTES)
            .maximumSize(500));
        return cacheManager;
    }
}
```

---

## 53. `ExamenProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/ExamenProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.upeu.eduspace.examenes.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.examenes")
public class ExamenProperties {

    private int margenGraciaSegundos = 60;
    private int maxPreguntasPorExamen = 50;
    private boolean calificacionMultipleParcial = true;
}
```

---

## 54. `FeignConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/FeignConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.examenes.config;

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

## 55. `KafkaConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/KafkaConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.examenes.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class KafkaConfig {

    public static final String TOPIC_EXAMEN_PUBLICADO = "examen.publicado";
    public static final String TOPIC_EXAMEN_CALIFICADO = "examen.calificado";

    public static final String TOPIC_MATRICULA_CREADA = "matricula.creada";
    public static final String TOPIC_MATRICULA_CONFIRMADA = "matricula.confirmada";
    public static final String TOPIC_MATRICULA_TRASLADADA = "matricula.trasladada";
    public static final String TOPIC_MATRICULA_RETIRADA = "matricula.retirada";
    public static final String TOPIC_MATRICULA_ANULADA = "matricula.anulada";

    @Bean
    public NewTopic examenPublicadoTopic() {
        return TopicBuilder.name(TOPIC_EXAMEN_PUBLICADO).partitions(3).replicas(1).build();
    }

    @Bean
    public NewTopic examenCalificadoTopic() {
        return TopicBuilder.name(TOPIC_EXAMEN_CALIFICADO).partitions(3).replicas(1).build();
    }
}
```

---

## 56. `KafkaErrorHandlingConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/KafkaErrorHandlingConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.examenes.config;

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

## 57. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.examenes.config;

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
                .title("EduSpace - Exámenes Microservice API")
                .version("1.0.0")
                .description("API de Banco de preguntas, programación de exámenes, intentos en línea y calificación"))
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

## 58. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.examenes.config;

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

                // Banco de preguntas
                .requestMatchers("/api/v1/examenes/preguntas/**").hasAnyRole("DOCENTE", "ADMIN")

                // Alumno rindiendo exámenes
                .requestMatchers("/api/v1/examenes/disponibles").hasRole("ALUMNO")
                .requestMatchers(HttpMethod.POST, "/api/v1/examenes/*/intentos").hasRole("ALUMNO")
                .requestMatchers(HttpMethod.PUT, "/api/v1/examenes/intentos/*/respuestas/*").hasRole("ALUMNO")
                .requestMatchers(HttpMethod.POST, "/api/v1/examenes/intentos/*/enviar").hasRole("ALUMNO")
                .requestMatchers(HttpMethod.GET, "/api/v1/examenes/intentos/*/resultado").hasAnyRole("ALUMNO", "APODERADO", "DOCENTE", "ADMIN")

                // Apoderado
                .requestMatchers("/api/v1/examenes/mias").hasAnyRole("APODERADO", "ALUMNO")

                // Docente: gestión, resultados, revisión de abiertas
                .requestMatchers("/api/v1/examenes/*/resultados", "/api/v1/examenes/*/pendientes-revision", "/api/v1/examenes/respuestas/*/revisar").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/examenes").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/examenes/*").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/v1/examenes/*/publicar", "/api/v1/examenes/*/cerrar").hasAnyRole("DOCENTE", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/examenes", "/api/v1/examenes/*").hasAnyRole("DOCENTE", "ADMIN", "SECRETARIA")

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

## 59. `ShedLockConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/config/ShedLockConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.examenes.config;

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

## 60. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.examenes.exception;

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

## 61. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.upeu.eduspace.examenes.exception;

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

## 62. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.examenes.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.MDC;
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

## 63. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.examenes.exception;

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

## 64. `AlumnosClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/client/AlumnosClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.examenes.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.List;

/** Contrato interno con alumnos-ms (adenda A3). */
@FeignClient(name = "alumnos-ms", fallback = AlumnosClient.AlumnosClientFallback.class)
public interface AlumnosClient {

    @GetMapping("/internal/alumnos/usuario/{usuarioId}")
    AlumnoUsuario alumnoDeUsuario(@PathVariable("usuarioId") Long usuarioId);

    @GetMapping("/internal/apoderados/usuario/{usuarioId}/alumnos")
    List<Hijo> hijosDeUsuario(@PathVariable("usuarioId") Long usuarioId);

    record AlumnoUsuario(Long alumnoId) {}

    record Hijo(Long alumnoId, String codigo, String nombreCompleto) {}

    @Component
    class AlumnosClientFallback implements AlumnosClient {
        @Override
        public AlumnoUsuario alumnoDeUsuario(Long usuarioId) {
            return null;
        }

        @Override
        public List<Hijo> hijosDeUsuario(Long usuarioId) {
            return Collections.emptyList();
        }
    }
}
```

---

## 65. `AsignacionDocenteResponse.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/client/AsignacionDocenteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `AsignacionDocente`.

```java
package pe.edu.upeu.eduspace.examenes.client;

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

## 66. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.upeu.eduspace.examenes.filter;

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

## 67. `IdentidadService.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/security/IdentidadService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Identidad`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.examenes.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.examenes.client.AlumnosClient;
import pe.edu.upeu.eduspace.examenes.client.PlanificacionClient;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Traduce la identidad del JWT (usuarioId de auth-ms) a las identidades de dominio
 * (docenteId de planificación, alumnoId de alumnos). Nunca se asume usuarioId == alumnoId.
 */
@Service
@RequiredArgsConstructor
public class IdentidadService {

    private final PlanificacionClient planificacionClient;
    private final AlumnosClient alumnosClient;

    public Long usuarioId(Jwt jwt) {
        Object v = jwt == null ? null : jwt.getClaim("usuarioId");
        if (v instanceof Number n) return n.longValue();
        if (v instanceof String s && s.matches("\\d+")) return Long.parseLong(s);
        throw new AccessDeniedException("El token no contiene el claim usuarioId.");
    }

    public Set<String> roles(Jwt jwt) {
        Set<String> roles = new HashSet<>();
        if (jwt == null) return roles;
        Object ra = jwt.getClaim("realm_access");
        if (ra instanceof Map<?, ?> m && m.get("roles") instanceof List<?> l) {
            l.forEach(r -> roles.add(r.toString().toUpperCase()));
        }
        List<String> directos = jwt.getClaimAsStringList("roles");
        if (directos != null) directos.forEach(r -> roles.add(r.toUpperCase()));
        return roles;
    }

    public boolean esAdmin(Jwt jwt) {
        return roles(jwt).contains("ADMIN");
    }

    /** docenteId de planificación; null si el usuario es ADMIN (acceso sin restricción de dueño). */
    public Long docenteId(Jwt jwt) {
        if (esAdmin(jwt)) return null;
        PlanificacionClient.DocenteInterno d;
        try {
            d = planificacionClient.getDocentePorUsuario(usuarioId(jwt));
        } catch (feign.FeignException.NotFound e) {
            d = null;
        }
        if (d == null || d.docenteId() == null) {
            throw new AccessDeniedException("El usuario no está registrado como docente.");
        }
        return d.docenteId();
    }

    public Long alumnoId(Jwt jwt) {
        AlumnosClient.AlumnoUsuario a = alumnoDeUsuarioOpcional(usuarioId(jwt));
        if (a == null || a.alumnoId() == null) {
            throw new AccessDeniedException("El usuario no está vinculado a un alumno.");
        }
        return a.alumnoId();
    }

    /** Alumnos cuyos datos puede ver el usuario: él mismo (ALUMNO) o sus hijos (APODERADO). */
    public Set<Long> alumnosVisibles(Jwt jwt) {
        Set<Long> ids = new HashSet<>();
        Set<String> roles = roles(jwt);
        Long uid = usuarioId(jwt);
        if (roles.contains("ALUMNO")) {
            AlumnosClient.AlumnoUsuario a = alumnoDeUsuarioOpcional(uid);
            if (a != null && a.alumnoId() != null) ids.add(a.alumnoId());
        }
        if (roles.contains("APODERADO")) {
            try {
                for (AlumnosClient.Hijo h : alumnosClient.hijosDeUsuario(uid)) ids.add(h.alumnoId());
            } catch (feign.FeignException.NotFound e) {
                // el usuario no tiene hijos registrados
            }
        }
        return ids;
    }

    /** alumnos-ms responde 404 si el usuario no es un alumno: se trata como "sin alumno", no como error. */
    private AlumnosClient.AlumnoUsuario alumnoDeUsuarioOpcional(Long usuarioId) {
        try {
            return alumnosClient.alumnoDeUsuario(usuarioId);
        } catch (feign.FeignException.NotFound e) {
            return null;
        }
    }
}
```

---

## 68. `PlanificacionClient.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/client/PlanificacionClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.examenes.client;

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

    @GetMapping("/internal/cursos/{id}")
    Map<String, Object> getCursoPorId(@PathVariable("id") Long cursoId);

    @GetMapping("/internal/docentes/usuario/{usuarioId}")
    DocenteInterno getDocentePorUsuario(@PathVariable("usuarioId") Long usuarioId);

    record DocenteInterno(Long docenteId, String nombre, String estado) {}

    @Component
    class PlanificacionClientFallback implements PlanificacionClient {

        @Override
        public List<AsignacionDocenteResponse> getAsignacionesDocente(Long usuarioId, Long anioId) {
            return Collections.emptyList();
        }

        @Override
        public Boolean validarAsignacionDocente(Long docenteId, Long seccionId, Long cursoId) {
            // Seguridad primero: si cae el servicio, denegar escritura (H2)
            return false;
        }

        @Override
        public Map<String, Object> getCursoPorId(Long cursoId) {
            return Map.of("id", cursoId, "nombre", "Curso " + cursoId);
        }

        @Override
        public DocenteInterno getDocentePorUsuario(Long usuarioId) {
            return null;
        }
    }
}
```

---

## 69. `ExamenesApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/ExamenesApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.upeu.eduspace.examenes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;
import pe.edu.upeu.eduspace.examenes.config.ExamenProperties;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties(ExamenProperties.class)
public class ExamenesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExamenesApplication.class, args);
    }
}
```

---



---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. ExamenMapper.java
**Ruta:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/mapper/ExamenMapper.java`

```java
package pe.edu.upeu.eduspace.examenes.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.examenes.dto.ExamenResponse;
import pe.edu.upeu.eduspace.examenes.dto.PreguntaResponse;
import pe.edu.upeu.eduspace.examenes.entity.Examen;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ExamenMapper {

    private final PreguntaMapper preguntaMapper;

    public ExamenResponse toResponse(Examen e) {
        if (e == null) return null;
        List<PreguntaResponse> preguntas = (e.getPreguntas() != null)
            ? e.getPreguntas().stream().map(preguntaMapper::toResponse).collect(Collectors.toList())
            : Collections.emptyList();

        return ExamenResponse.builder()
            .id(e.getId())
            .cursoId(e.getCursoId())
            .seccionId(e.getSeccionId())
            .docenteId(e.getDocenteId())
            .titulo(e.getTitulo())
            .descripcion(e.getDescripcion())
            .fechaInicio(e.getFechaInicio())
            .fechaFin(e.getFechaFin())
            .duracionMinutos(e.getDuracionMinutos())
            .puntajeMaximo(e.getPuntajeMaximo())
            .estado(e.getEstado())
            .preguntas(preguntas)
            .build();
    }
}
```

### 2. PreguntaMapper.java
**Ruta:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/mapper/PreguntaMapper.java`

```java
package pe.edu.upeu.eduspace.examenes.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.examenes.dto.PreguntaResponse;
import pe.edu.upeu.eduspace.examenes.entity.Pregunta;

@Component
public class PreguntaMapper {

    public PreguntaResponse toResponse(Pregunta p) {
        if (p == null) return null;
        return PreguntaResponse.builder()
            .id(p.getId())
            .enunciado(p.getEnunciado())
            .tipo(p.getTipo())
            .puntaje(p.getPuntaje())
            .orden(p.getOrden())
            .opciones(p.getOpciones())
            .build();
    }
}
```

### 3. IntentoMapper.java
**Ruta:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/mapper/IntentoMapper.java`

```java
package pe.edu.upeu.eduspace.examenes.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.examenes.dto.IntentoResponse;
import pe.edu.upeu.eduspace.examenes.entity.Intento;

@Component
public class IntentoMapper {

    public IntentoResponse toResponse(Intento i) {
        if (i == null) return null;
        return IntentoResponse.builder()
            .id(i.getId())
            .examenId(i.getExamen().getId())
            .alumnoId(i.getAlumnoId())
            .fechaInicio(i.getFechaInicio())
            .fechaFin(i.getFechaFin())
            .puntajeObtenido(i.getPuntajeObtenido())
            .estado(i.getEstado())
            .build();
    }
}
```
