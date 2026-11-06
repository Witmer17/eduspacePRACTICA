# 📘 CÓDIGO COMPLETO — `alumnos-ms`

> **Microservicio:** `alumnos-ms`  
> **Puerto:** `8092`  
> **Base de datos:** `eduspace_alumnos`  
> **Propósito:** Gestión del expediente estudiantil completo. Registra datos personales del alumno (nombre, DNI, fecha de nacimiento, dirección), datos de los apoderados/tutores legales, documentos escaneados, fotos, historial académico previo y contactos de emergencia.  
> **Total de clases incluidas:** 100 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `Alumno.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/Alumno.java`
- 2. `AlumnoApoderado.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoApoderado.java`
- 3. `AlumnoDocumento.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoDocumento.java`
- 4. `AlumnoEstadoHistorial.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoEstadoHistorial.java`
- 5. `AlumnoSalud.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoSalud.java`
- 6. `Apoderado.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/Apoderado.java`
- 7. `EstadoAlumno.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/EstadoAlumno.java`
- 8. `Parentesco.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/Parentesco.java`
- 9. `TipoDocumento.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/TipoDocumento.java`

### Repositorios Spring Data JPA

- 10. `AlumnoApoderadoRepository.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoApoderadoRepository.java`
- 11. `AlumnoDocumentoRepository.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoDocumentoRepository.java`
- 12. `AlumnoEstadoHistorialRepository.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoEstadoHistorialRepository.java`
- 13. `AlumnoRepository.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoRepository.java`
- 14. `AlumnoSaludRepository.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoSaludRepository.java`
- 15. `ApoderadoRepository.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/ApoderadoRepository.java`

### DTOs (Data Transfer Objects)

- 16. `AlumnoBasicoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoBasicoResponse.java`
- 17. `AlumnoCreateRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoCreateRequest.java`
- 18. `AlumnoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoResponse.java`
- 19. `AlumnoResumenResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoResumenResponse.java`
- 20. `AlumnoUpdateRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoUpdateRequest.java`
- 21. `AlumnoUsuarioResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoUsuarioResponse.java`
- 22. `ApoderadoContactoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ApoderadoContactoResponse.java`
- 23. `ApoderadoRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ApoderadoRequest.java`
- 24. `ApoderadoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ApoderadoResponse.java`
- 25. `CambioEstadoRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/CambioEstadoRequest.java`
- 26. `ContactosNotificacionResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ContactosNotificacionResponse.java`
- 27. `DescargaResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/DescargaResponse.java`
- 28. `DocumentoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/DocumentoResponse.java`
- 29. `ExpedienteCompletoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ExpedienteCompletoResponse.java`
- 30. `HijoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/HijoResponse.java`
- 31. `HistorialResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/HistorialResponse.java`
- 32. `ImportacionResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ImportacionResponse.java`
- 33. `PageResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/PageResponse.java`
- 34. `ResponsablePagoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ResponsablePagoResponse.java`
- 35. `SaludRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/SaludRequest.java`
- 36. `SaludResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/SaludResponse.java`
- 37. `VerificarDocumentoRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VerificarDocumentoRequest.java`
- 38. `VincularUsuarioRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VincularUsuarioRequest.java`
- 39. `VinculoApoderadoRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VinculoApoderadoRequest.java`
- 40. `VinculoResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VinculoResponse.java`
- 41. `VinculoUpdateRequest.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VinculoUpdateRequest.java`

### Servicios y Lógica de Negocio

- 42. `AccesoService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/AccesoService.java`
- 43. `AccesoServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/AccesoServiceImpl.java`
- 44. `AlumnoService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/AlumnoService.java`
- 45. `AlumnoServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/AlumnoServiceImpl.java`
- 46. `ApoderadoService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ApoderadoService.java`
- 47. `ApoderadoServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ApoderadoServiceImpl.java`
- 48. `ContactosService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ContactosService.java`
- 49. `ContactosServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ContactosServiceImpl.java`
- 50. `DocumentoService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/DocumentoService.java`
- 51. `DocumentoServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/DocumentoServiceImpl.java`
- 52. `EstadoAlumnoService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/EstadoAlumnoService.java`
- 53. `EstadoAlumnoServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/EstadoAlumnoServiceImpl.java`
- 54. `ExpedienteService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ExpedienteService.java`
- 55. `ExpedienteServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ExpedienteServiceImpl.java`
- 56. `ImportacionAlumnosService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ImportacionAlumnosService.java`
- 57. `ImportacionAlumnosServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ImportacionAlumnosServiceImpl.java`
- 58. `InternalConsultaService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/InternalConsultaService.java`
- 59. `InternalConsultaServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/InternalConsultaServiceImpl.java`
- 60. `SaludService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/SaludService.java`
- 61. `SaludServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/SaludServiceImpl.java`
- 62. `VinculoService.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/VinculoService.java`
- 63. `VinculoServiceImpl.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/VinculoServiceImpl.java`

### Controladores REST API

- 64. `AlumnoController.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/AlumnoController.java`
- 65. `ApoderadoController.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/ApoderadoController.java`
- 66. `DocumentoController.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/DocumentoController.java`
- 67. `InternalController.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/InternalController.java`
- 68. `SaludController.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/SaludController.java`
- 69. `VinculoController.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/VinculoController.java`

### Mensajería Kafka

- 70. `OutboxConfig.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/messaging/outbox/OutboxConfig.java`
- 71. `OutboxRecorder.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/messaging/outbox/OutboxRecorder.java`
- 72. `OutboxRelay.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/messaging/outbox/OutboxRelay.java`

### Eventos de Dominio

- 73. `AlumnoEstadoCambiadoEvent.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/event/AlumnoEstadoCambiadoEvent.java`
- 74. `AlumnoRegistradoEvent.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/event/AlumnoRegistradoEvent.java`
- 75. `DomainEvent.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/event/DomainEvent.java`

### Configuración Spring Boot

- 76. `DocumentosProperties.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/DocumentosProperties.java`
- 77. `ExpedienteProperties.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/ExpedienteProperties.java`
- 78. `KafkaProducerConfig.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/KafkaProducerConfig.java`
- 79. `KafkaTopicsConfig.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/KafkaTopicsConfig.java`
- 80. `KafkaTopicsProperties.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/KafkaTopicsProperties.java`
- 81. `OpenApiConfig.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/OpenApiConfig.java`
- 82. `SecurityConfig.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/SecurityConfig.java`
- 83. `StorageProperties.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/StorageProperties.java`

### Manejo de Excepciones

- 84. `BusinessRuleException.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/BusinessRuleException.java`
- 85. `DatosInvalidosException.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/DatosInvalidosException.java`
- 86. `DuplicateResourceException.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/DuplicateResourceException.java`
- 87. `ErrorResponse.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/ErrorResponse.java`
- 88. `GlobalExceptionHandler.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/GlobalExceptionHandler.java`
- 89. `ResourceNotFoundException.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/ResourceNotFoundException.java`
- 90. `StorageException.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/StorageException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 91. `AlmacenamientoArchivos.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/storage/AlmacenamientoArchivos.java`
- 92. `CorrelationIdFilter.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/filter/CorrelationIdFilter.java`
- 93. `CsvAlumnos.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/CsvAlumnos.java`
- 94. `DocumentoIdentidad.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/DocumentoIdentidad.java`
- 95. `MinioAlmacenamiento.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/storage/MinioAlmacenamiento.java`
- 96. `Respuestas.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/Respuestas.java`
- 97. `ServiceTokenFilter.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/filter/ServiceTokenFilter.java`
- 98. `UsuarioActual.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/UsuarioActual.java`

### Clase Principal de Arranque

- 99. `AlumnosMsApplication.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/AlumnosMsApplication.java`

### Mappers

- 100. `AlumnoMapper.java` — `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/mapper/AlumnoMapper.java`

---

## 1. `Alumno.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/Alumno.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "alumnos")
@Getter
@Setter
public class Alumno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    /** Id en auth-ms si el alumno tiene cuenta; número simple, sin relación. */
    private Long usuarioId;
    private String tipoDocumento = "DNI";
    private String numeroDocumento;
    private String nombres;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private LocalDate fechaNacimiento;
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(length = 1)
    private String sexo;
    private String nacionalidad;
    private String direccion;
    private String distrito;
    private String telefono;
    private String email;
    private String fotoUrl;
    private String colegioProcedencia;
    @Enumerated(EnumType.STRING)
    private EstadoAlumno estado = EstadoAlumno.ACTIVO;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;

    public String nombreCompleto() {
        String apellidos = apellidoMaterno == null || apellidoMaterno.isBlank()
                ? apellidoPaterno : apellidoPaterno + " " + apellidoMaterno;
        return apellidos + ", " + nombres;
    }

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
        actualizadoEn = creadoEn;
    }

    @PreUpdate
    void onUpdate() {
        actualizadoEn = LocalDateTime.now();
    }
}
```

---

## 2. `AlumnoApoderado.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoApoderado.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "alumno_apoderado")
@Getter
@Setter
public class AlumnoApoderado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "alumno_id")
    private Alumno alumno;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "apoderado_id")
    private Apoderado apoderado;
    @Enumerated(EnumType.STRING)
    private Parentesco parentesco;
    private Boolean esPrincipal = false;
    private Boolean esResponsablePago = false;
    private Boolean viveConAlumno = true;
    private Boolean puedeRecoger = true;
}
```

---

## 3. `AlumnoDocumento.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoDocumento.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "alumno_documentos")
@Getter
@Setter
public class AlumnoDocumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "alumno_id")
    private Alumno alumno;
    @Enumerated(EnumType.STRING)
    private TipoDocumento tipo;
    private String nombreArchivo;
    /** Clave del objeto en MinIO/S3. */
    private String rutaStorage;
    private String contentType;
    private Long tamanoBytes;
    private Boolean verificado = false;
    private LocalDateTime subidoEn;

    @PrePersist
    void onCreate() {
        if (subidoEn == null) {
            subidoEn = LocalDateTime.now();
        }
    }
}
```

---

## 4. `AlumnoEstadoHistorial.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoEstadoHistorial.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "alumno_estado_historial")
@Getter
@Setter
public class AlumnoEstadoHistorial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "alumno_id")
    private Alumno alumno;
    @Enumerated(EnumType.STRING)
    private EstadoAlumno estadoAnterior;
    @Enumerated(EnumType.STRING)
    private EstadoAlumno estadoNuevo;
    private String motivo;
    /** Quién hizo el cambio (usuario_id en auth-ms). */
    private Long usuarioId;
    private LocalDateTime cambiadoEn;

    @PrePersist
    void onCreate() {
        if (cambiadoEn == null) {
            cambiadoEn = LocalDateTime.now();
        }
    }
}
```

---

## 5. `AlumnoSalud.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/AlumnoSalud.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Ficha de salud básica: comparte la clave con {@link Alumno} (uno a uno). */
@Entity
@Table(name = "alumno_salud")
@Getter
@Setter
public class AlumnoSalud {
    @Id
    private Long alumnoId;
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "alumno_id")
    private Alumno alumno;
    private String grupoSanguineo;
    private String alergias;
    private String observaciones;
    private String seguroMedico;
    private String contactoEmergenciaNombre;
    private String contactoEmergenciaTelefono;
    private LocalDateTime actualizadoEn;

    @PrePersist
    @PreUpdate
    void touch() {
        actualizadoEn = LocalDateTime.now();
    }
}
```

---

## 6. `Apoderado.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/Apoderado.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "apoderados")
@Getter
@Setter
public class Apoderado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** Id en auth-ms (rol APODERADO); número simple, sin relación. */
    private Long usuarioId;
    private String tipoDocumento = "DNI";
    private String numeroDocumento;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String telefonoAlterno;
    private String email;
    private String direccion;
    private String ocupacion;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;

    public String nombreCompleto() {
        return apellidos + ", " + nombres;
    }

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
        actualizadoEn = creadoEn;
    }

    @PreUpdate
    void onUpdate() {
        actualizadoEn = LocalDateTime.now();
    }
}
```

---

## 7. `EstadoAlumno.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/EstadoAlumno.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

public enum EstadoAlumno { ACTIVO, RETIRADO, EGRESADO, TRASLADADO, INACTIVO }
```

---

## 8. `Parentesco.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/Parentesco.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

public enum Parentesco { PADRE, MADRE, ABUELO, ABUELA, TIO, TIA, HERMANO, TUTOR, OTRO }
```

---

## 9. `TipoDocumento.java` — Entidades JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/entity/TipoDocumento.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `alumnos-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.alumnos.entity;

/** Tipos de documento del expediente. */
public enum TipoDocumento {
    PARTIDA_NACIMIENTO, DNI, CERTIFICADO_ESTUDIOS, FICHA_SIAGIE, CARNET_VACUNACION, FOTO, OTRO
}
```

---

## 10. `AlumnoApoderadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoApoderadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AlumnoApoderado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.alumnos.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.alumnos.entity.AlumnoApoderado;

public interface AlumnoApoderadoRepository extends JpaRepository<AlumnoApoderado, Long> {

    @Query("select v from AlumnoApoderado v join fetch v.apoderado where v.alumno.id = :alumnoId order by v.id")
    List<AlumnoApoderado> findByAlumno(@Param("alumnoId") Long alumnoId);

    @Query("select v from AlumnoApoderado v join fetch v.alumno where v.apoderado.id = :apoderadoId order by v.alumno.apellidoPaterno, v.alumno.nombres")
    List<AlumnoApoderado> findByApoderado(@Param("apoderadoId") Long apoderadoId);

    @Query("select v from AlumnoApoderado v join fetch v.alumno where v.apoderado.usuarioId = :usuarioId order by v.alumno.apellidoPaterno, v.alumno.nombres")
    List<AlumnoApoderado> findByUsuarioDelApoderado(@Param("usuarioId") Long usuarioId);

    Optional<AlumnoApoderado> findByIdAndAlumnoId(Long id, Long alumnoId);

    boolean existsByAlumnoIdAndApoderadoId(Long alumnoId, Long apoderadoId);

    boolean existsByAlumnoIdAndApoderadoUsuarioId(Long alumnoId, Long usuarioId);

    long countByAlumnoId(Long alumnoId);

    @Query("select v from AlumnoApoderado v join fetch v.apoderado where v.alumno.id = :alumnoId and v.esResponsablePago = true")
    Optional<AlumnoApoderado> findResponsablePago(@Param("alumnoId") Long alumnoId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("update AlumnoApoderado v set v.esPrincipal = false where v.alumno.id = :alumnoId and v.id <> :excluirId and v.esPrincipal = true")
    int quitarPrincipalDeLosDemas(@Param("alumnoId") Long alumnoId, @Param("excluirId") Long excluirId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("update AlumnoApoderado v set v.esResponsablePago = false where v.alumno.id = :alumnoId and v.id <> :excluirId and v.esResponsablePago = true")
    int quitarResponsablePagoDeLosDemas(@Param("alumnoId") Long alumnoId, @Param("excluirId") Long excluirId);
}
```

---

## 11. `AlumnoDocumentoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoDocumentoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AlumnoDocumento`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.alumnos.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.alumnos.entity.AlumnoDocumento;

public interface AlumnoDocumentoRepository extends JpaRepository<AlumnoDocumento, Long> {
    List<AlumnoDocumento> findByAlumnoIdOrderBySubidoEnDesc(Long alumnoId);

    Optional<AlumnoDocumento> findByIdAndAlumnoId(Long id, Long alumnoId);
}
```

---

## 12. `AlumnoEstadoHistorialRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoEstadoHistorialRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AlumnoEstadoHistorial`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.alumnos.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.alumnos.entity.AlumnoEstadoHistorial;

public interface AlumnoEstadoHistorialRepository extends JpaRepository<AlumnoEstadoHistorial, Long> {
    List<AlumnoEstadoHistorial> findByAlumnoIdOrderByCambiadoEnDescIdDesc(Long alumnoId);
}
```

---

## 13. `AlumnoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Alumno`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.alumnos.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.alumnos.entity.Alumno;
import pe.edu.eduspace.alumnos.entity.EstadoAlumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    /** {@code q} nunca es nulo (texto vacío = sin filtro): PostgreSQL no infiere el tipo de un parámetro nulo en LIKE. */
    @Query("""
            select a from Alumno a
            where lower(a.nombres) like lower(concat('%', :q, '%'))
               or lower(a.apellidoPaterno) like lower(concat('%', :q, '%'))
               or lower(coalesce(a.apellidoMaterno, '')) like lower(concat('%', :q, '%'))
               or a.numeroDocumento like concat('%', :q, '%')
               or lower(a.codigo) like lower(concat('%', :q, '%'))
            order by a.id desc
            """)
    Page<Alumno> buscar(@Param("q") String q, Pageable pageable);

    @Query("""
            select a from Alumno a
            where a.estado = :estado and (
                  lower(a.nombres) like lower(concat('%', :q, '%'))
               or lower(a.apellidoPaterno) like lower(concat('%', :q, '%'))
               or lower(coalesce(a.apellidoMaterno, '')) like lower(concat('%', :q, '%'))
               or a.numeroDocumento like concat('%', :q, '%')
               or lower(a.codigo) like lower(concat('%', :q, '%')))
            order by a.id desc
            """)
    Page<Alumno> buscarPorEstado(@Param("q") String q, @Param("estado") EstadoAlumno estado, Pageable pageable);

    boolean existsByTipoDocumentoAndNumeroDocumento(String tipo, String numero);

    boolean existsByTipoDocumentoAndNumeroDocumentoAndIdNot(String tipo, String numero, Long id);

    boolean existsByUsuarioIdAndIdNot(Long usuarioId, Long id);

    Optional<Alumno> findByUsuarioId(Long usuarioId);

    /** Para ubicar a un hermano por su documento (matrícula en línea); si el mismo número existiera con otro tipo, vale el más antiguo. */
    Optional<Alumno> findFirstByNumeroDocumentoOrderByIdAsc(String numeroDocumento);

    List<Alumno> findByIdIn(Collection<Long> ids);

    /** Último código generado con ese prefijo (comparación de texto: los correlativos son de ancho fijo). */
    @Query("select max(a.codigo) from Alumno a where a.codigo like concat(:prefijo, '%')")
    Optional<String> ultimoCodigo(@Param("prefijo") String prefijo);
}
```

---

## 14. `AlumnoSaludRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/AlumnoSaludRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AlumnoSalud`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.alumnos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.alumnos.entity.AlumnoSalud;

public interface AlumnoSaludRepository extends JpaRepository<AlumnoSalud, Long> {
}
```

---

## 15. `ApoderadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/repository/ApoderadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Apoderado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.alumnos.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.alumnos.entity.Apoderado;

public interface ApoderadoRepository extends JpaRepository<Apoderado, Long> {

    /** {@code q} nunca es nulo (texto vacío = sin filtro). */
    @Query("""
            select a from Apoderado a
            where lower(a.nombres) like lower(concat('%', :q, '%'))
               or lower(a.apellidos) like lower(concat('%', :q, '%'))
               or a.numeroDocumento like concat('%', :q, '%')
            order by a.id desc
            """)
    Page<Apoderado> buscar(@Param("q") String q, Pageable pageable);

    Optional<Apoderado> findByTipoDocumentoAndNumeroDocumento(String tipo, String numero);

    boolean existsByTipoDocumentoAndNumeroDocumentoAndIdNot(String tipo, String numero, Long id);

    Optional<Apoderado> findByUsuarioId(Long usuarioId);

    boolean existsByUsuarioIdAndIdNot(Long usuarioId, Long id);
}
```

---

## 16. `AlumnoBasicoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoBasicoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `AlumnoBasico`.

```java
package pe.edu.eduspace.alumnos.dto;

import pe.edu.eduspace.alumnos.entity.EstadoAlumno;

public record AlumnoBasicoResponse(Long id, String codigo, String nombreCompleto, EstadoAlumno estado) {
}
```

---

## 17. `AlumnoCreateRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoCreateRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `AlumnoCreate`.

```java
package pe.edu.eduspace.alumnos.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public record AlumnoCreateRequest(
        @Size(max = 10) String tipoDocumento,
        @NotBlank @Size(max = 20) String numeroDocumento,
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 80) String apellidoPaterno,
        @Size(max = 80) String apellidoMaterno,
        @NotNull @Past(message = "la fecha de nacimiento no puede ser futura") LocalDate fechaNacimiento,
        @NotBlank @Pattern(regexp = "[MF]", message = "debe ser M o F") String sexo,
        @Size(max = 50) String nacionalidad,
        @Size(max = 200) String direccion,
        @Size(max = 80) String distrito,
        @Size(max = 20) String telefono,
        @Email @Size(max = 150) String email,
        @Size(max = 150) String colegioProcedencia,
        @NotEmpty(message = "el alumno necesita al menos un apoderado") List<@Valid VinculoApoderadoRequest> apoderados) {
}
```

---

## 18. `AlumnoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Alumno`.

```java
package pe.edu.eduspace.alumnos.dto;

import java.time.LocalDate;
import java.util.List;
import pe.edu.eduspace.alumnos.entity.EstadoAlumno;

public record AlumnoResponse(Long id, String codigo, Long usuarioId, String tipoDocumento, String numeroDocumento,
                             String nombres, String apellidoPaterno, String apellidoMaterno, String nombreCompleto,
                             LocalDate fechaNacimiento, String sexo, String nacionalidad, String direccion,
                             String distrito, String telefono, String email, String fotoUrl,
                             String colegioProcedencia, EstadoAlumno estado, List<VinculoResponse> apoderados) {
}
```

---

## 19. `AlumnoResumenResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoResumenResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `AlumnoResumen`.

```java
package pe.edu.eduspace.alumnos.dto;

import pe.edu.eduspace.alumnos.entity.EstadoAlumno;

/** Fila de listado. {@code usuarioId}, {@code nombres} y {@code apellidoPaterno} sirven para crear y reconocer la cuenta de acceso. */
public record AlumnoResumenResponse(Long id, String codigo, String nombreCompleto, String tipoDocumento,
                                    String numeroDocumento, EstadoAlumno estado, Long usuarioId, String nombres,
                                    String apellidoPaterno) {
}
```

---

## 20. `AlumnoUpdateRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoUpdateRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `AlumnoUpdate`.

```java
package pe.edu.eduspace.alumnos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record AlumnoUpdateRequest(
        @Size(max = 10) String tipoDocumento,
        @NotBlank @Size(max = 20) String numeroDocumento,
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 80) String apellidoPaterno,
        @Size(max = 80) String apellidoMaterno,
        @NotNull @Past(message = "la fecha de nacimiento no puede ser futura") LocalDate fechaNacimiento,
        @NotBlank @Pattern(regexp = "[MF]", message = "debe ser M o F") String sexo,
        @Size(max = 50) String nacionalidad,
        @Size(max = 200) String direccion,
        @Size(max = 80) String distrito,
        @Size(max = 20) String telefono,
        @Email @Size(max = 150) String email,
        @Size(max = 150) String colegioProcedencia) {
}
```

---

## 21. `AlumnoUsuarioResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/AlumnoUsuarioResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `AlumnoUsuario`.

```java
package pe.edu.eduspace.alumnos.dto;

public record AlumnoUsuarioResponse(Long alumnoId) {
}
```

---

## 22. `ApoderadoContactoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ApoderadoContactoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ApoderadoContacto`.

```java
package pe.edu.eduspace.alumnos.dto;

import pe.edu.eduspace.alumnos.entity.Parentesco;

public record ApoderadoContactoResponse(Long apoderadoId, Long usuarioId, String nombreCompleto, String email,
                                        String telefono, Boolean esPrincipal, Boolean esResponsablePago,
                                        Parentesco parentesco) {
}
```

---

## 23. `ApoderadoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ApoderadoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Apoderado`.

```java
package pe.edu.eduspace.alumnos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ApoderadoRequest(
        @Size(max = 10) String tipoDocumento,
        @NotBlank @Size(max = 20) String numeroDocumento,
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 150) String apellidos,
        @Size(max = 20) String telefono,
        @Size(max = 20) String telefonoAlterno,
        @Email @Size(max = 150) String email,
        @Size(max = 200) String direccion,
        @Size(max = 100) String ocupacion) {
}
```

---

## 24. `ApoderadoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ApoderadoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Apoderado`.

```java
package pe.edu.eduspace.alumnos.dto;

public record ApoderadoResponse(Long id, Long usuarioId, String tipoDocumento, String numeroDocumento, String nombres,
                                String apellidos, String telefono, String telefonoAlterno, String email,
                                String direccion, String ocupacion) {
}
```

---

## 25. `CambioEstadoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/CambioEstadoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `CambioEstado`.

```java
package pe.edu.eduspace.alumnos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pe.edu.eduspace.alumnos.entity.EstadoAlumno;

public record CambioEstadoRequest(@NotNull EstadoAlumno estado,
                                  @NotBlank(message = "el motivo es obligatorio") @Size(max = 300) String motivo) {
}
```

---

## 26. `ContactosNotificacionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ContactosNotificacionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ContactosNotificacion`.

```java
package pe.edu.eduspace.alumnos.dto;

import java.util.List;

/** Contrato interno con notificaciones-ms. */
public record ContactosNotificacionResponse(Long alumnoId, String nombreCompleto, Long usuarioId,
                                            List<ApoderadoContactoResponse> apoderados) {
}
```

---

## 27. `DescargaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/DescargaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Descarga`.

```java
package pe.edu.eduspace.alumnos.dto;

public record DescargaResponse(String url, long expiraEnSegundos, String nombreArchivo) {
}
```

---

## 28. `DocumentoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/DocumentoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Documento`.

```java
package pe.edu.eduspace.alumnos.dto;

import java.time.LocalDateTime;
import pe.edu.eduspace.alumnos.entity.TipoDocumento;

public record DocumentoResponse(Long id, Long alumnoId, TipoDocumento tipo, String nombreArchivo, String contentType,
                                Long tamanoBytes, Boolean verificado, LocalDateTime subidoEn) {
}
```

---

## 29. `ExpedienteCompletoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ExpedienteCompletoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ExpedienteCompleto`.

```java
package pe.edu.eduspace.alumnos.dto;

import java.util.List;
import pe.edu.eduspace.alumnos.entity.TipoDocumento;

public record ExpedienteCompletoResponse(boolean completo, List<TipoDocumento> faltantes) {
}
```

---

## 30. `HijoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/HijoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Hijo`.

```java
package pe.edu.eduspace.alumnos.dto;

import pe.edu.eduspace.alumnos.entity.EstadoAlumno;
import pe.edu.eduspace.alumnos.entity.Parentesco;

/** Un alumno visto desde su apoderado. */
public record HijoResponse(Long alumnoId, String codigo, String nombreCompleto, EstadoAlumno estado,
                           Parentesco parentesco) {
}
```

---

## 31. `HistorialResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/HistorialResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Historial`.

```java
package pe.edu.eduspace.alumnos.dto;

import java.time.LocalDateTime;
import pe.edu.eduspace.alumnos.entity.EstadoAlumno;

public record HistorialResponse(Long id, EstadoAlumno estadoAnterior, EstadoAlumno estadoNuevo, String motivo,
                                Long usuarioId, LocalDateTime cambiadoEn) {
}
```

---

## 32. `ImportacionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ImportacionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Importacion`.

```java
package pe.edu.eduspace.alumnos.dto;

import java.util.List;

/** Resultado de una importación masiva: cada fila se procesa por separado (una mala no tumba las demás). */
public record ImportacionResponse(int total, int creados, int fallidos, List<Fila> filas) {

    /** {@code linea} es la del archivo (la 1 es el encabezado). */
    public record Fila(int linea, String numeroDocumento, boolean creado, Long alumnoId, String codigo, String error) {
    }
}
```

---

## 33. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Page`.

```java
package pe.edu.eduspace.alumnos.dto;

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

## 34. `ResponsablePagoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/ResponsablePagoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `ResponsablePago`.

```java
package pe.edu.eduspace.alumnos.dto;

public record ResponsablePagoResponse(Long apoderadoId, Long usuarioId, String nombre) {
}
```

---

## 35. `SaludRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/SaludRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Salud`.

```java
package pe.edu.eduspace.alumnos.dto;

import jakarta.validation.constraints.Size;

public record SaludRequest(
        @Size(max = 5) String grupoSanguineo,
        @Size(max = 300) String alergias,
        @Size(max = 500) String observaciones,
        @Size(max = 100) String seguroMedico,
        @Size(max = 150) String contactoEmergenciaNombre,
        @Size(max = 20) String contactoEmergenciaTelefono) {
}
```

---

## 36. `SaludResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/SaludResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Salud`.

```java
package pe.edu.eduspace.alumnos.dto;

import java.time.LocalDateTime;

public record SaludResponse(Long alumnoId, String grupoSanguineo, String alergias, String observaciones,
                            String seguroMedico, String contactoEmergenciaNombre, String contactoEmergenciaTelefono,
                            LocalDateTime actualizadoEn) {
}
```

---

## 37. `VerificarDocumentoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VerificarDocumentoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `VerificarDocumento`.

```java
package pe.edu.eduspace.alumnos.dto;

public record VerificarDocumentoRequest(Boolean verificado) {
    public boolean valor() {
        return verificado == null || verificado;
    }
}
```

---

## 38. `VincularUsuarioRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VincularUsuarioRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `VincularUsuario`.

```java
package pe.edu.eduspace.alumnos.dto;

import jakarta.validation.constraints.NotNull;

public record VincularUsuarioRequest(@NotNull Long usuarioId) {
}
```

---

## 39. `VinculoApoderadoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VinculoApoderadoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `VinculoApoderado`.

```java
package pe.edu.eduspace.alumnos.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import pe.edu.eduspace.alumnos.entity.Parentesco;

/** Vincula un apoderado: uno existente ({@code apoderadoId}) o sus datos (se reutiliza si el documento ya existe). */
public record VinculoApoderadoRequest(
        Long apoderadoId,
        @Valid ApoderadoRequest apoderado,
        @NotNull Parentesco parentesco,
        Boolean esPrincipal,
        Boolean esResponsablePago,
        Boolean viveConAlumno,
        Boolean puedeRecoger) {
}
```

---

## 40. `VinculoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VinculoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Vinculo`.

```java
package pe.edu.eduspace.alumnos.dto;

import pe.edu.eduspace.alumnos.entity.Parentesco;

public record VinculoResponse(Long id, ApoderadoResponse apoderado, Parentesco parentesco, Boolean esPrincipal,
                              Boolean esResponsablePago, Boolean viveConAlumno, Boolean puedeRecoger) {
}
```

---

## 41. `VinculoUpdateRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/dto/VinculoUpdateRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `VinculoUpdate`.

```java
package pe.edu.eduspace.alumnos.dto;

import pe.edu.eduspace.alumnos.entity.Parentesco;

/** Campos nulos = sin cambio. */
public record VinculoUpdateRequest(Parentesco parentesco, Boolean esPrincipal, Boolean esResponsablePago,
                                   Boolean viveConAlumno, Boolean puedeRecoger) {
}
```

---

## 42. `AccesoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/AccesoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Acceso`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

/** Regla fina de propiedad: ALUMNO y APODERADO solo acceden a lo propio (el rol grueso lo aplica la anotación del endpoint). */
public interface AccesoService {

    /** Personal del colegio, o el propio alumno, o un apoderado del alumno. Si no, AccessDeniedException. */
    void verificarLecturaAlumno(Long alumnoId);

    /** Personal del colegio, o el propio apoderado. Si no, AccessDeniedException. */
    void verificarLecturaApoderado(Long apoderadoId);
}
```

---

## 43. `AccesoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/AccesoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Acceso`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.entity.Alumno;
import pe.edu.eduspace.alumnos.entity.Apoderado;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.repository.AlumnoApoderadoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.repository.ApoderadoRepository;
import pe.edu.eduspace.alumnos.service.AccesoService;
import pe.edu.eduspace.alumnos.util.UsuarioActual;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccesoServiceImpl implements AccesoService {

    private static final String[] PERSONAL = {"ADMIN", "SECRETARIA", "DOCENTE"};

    private final AlumnoRepository alumnoRepository;
    private final ApoderadoRepository apoderadoRepository;
    private final AlumnoApoderadoRepository vinculoRepository;

    @Override
    public void verificarLecturaAlumno(Long alumnoId) {
        Alumno alumno = alumnoRepository.findById(alumnoId)
                .orElseThrow(() -> ResourceNotFoundException.of("Alumno", alumnoId));
        if (UsuarioActual.tieneAlgunRol(PERSONAL)) {
            return;
        }
        Long yo = UsuarioActual.id();
        if (yo == null) {
            throw new AccessDeniedException("Sin usuario en el token");
        }
        boolean esElAlumno = UsuarioActual.tieneAlgunRol("ALUMNO") && yo.equals(alumno.getUsuarioId());
        boolean esApoderado = UsuarioActual.tieneAlgunRol("APODERADO")
                && vinculoRepository.existsByAlumnoIdAndApoderadoUsuarioId(alumnoId, yo);
        if (!esElAlumno && !esApoderado) {
            throw new AccessDeniedException("El alumno " + alumnoId + " no es suyo");
        }
    }

    @Override
    public void verificarLecturaApoderado(Long apoderadoId) {
        Apoderado apoderado = apoderadoRepository.findById(apoderadoId)
                .orElseThrow(() -> ResourceNotFoundException.of("Apoderado", apoderadoId));
        if (UsuarioActual.tieneAlgunRol("ADMIN", "SECRETARIA")) {
            return;
        }
        Long yo = UsuarioActual.id();
        if (yo == null || !UsuarioActual.tieneAlgunRol("APODERADO") || !yo.equals(apoderado.getUsuarioId())) {
            throw new AccessDeniedException("Solo puede ver sus propios datos");
        }
    }
}
```

---

## 44. `AlumnoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/AlumnoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Alumno`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import java.util.List;
import org.springframework.data.domain.Pageable;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.entity.EstadoAlumno;

public interface AlumnoService {
    PageResponse<AlumnoResumenResponse> buscar(String q, EstadoAlumno estado, Pageable pageable);

    /** Solo nombre, código y documento de los alumnos pedidos (no el expediente): lo usan quienes cobran o buscan. */
    java.util.List<AlumnoResumenResponse> resumenes(java.util.List<Long> ids);

    AlumnoResponse obtener(Long id);

    AlumnoResponse crear(AlumnoCreateRequest request);

    AlumnoResponse actualizar(Long id, AlumnoUpdateRequest request);

    AlumnoResponse vincularUsuario(Long id, Long usuarioId);

    /** Alumnos del usuario autenticado: sus hijos (APODERADO) o él mismo (ALUMNO). */
    List<HijoResponse> mios(Long usuarioId, boolean esApoderado);
}
```

---

## 45. `AlumnoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/AlumnoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Alumno`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.entity.*;
import pe.edu.eduspace.alumnos.event.AlumnoRegistradoEvent;
import pe.edu.eduspace.alumnos.exception.BusinessRuleException;
import pe.edu.eduspace.alumnos.exception.DuplicateResourceException;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoApoderadoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.service.AlumnoService;
import pe.edu.eduspace.alumnos.service.ApoderadoService;
import pe.edu.eduspace.alumnos.util.DocumentoIdentidad;

@Service
@RequiredArgsConstructor
@Transactional
public class AlumnoServiceImpl implements AlumnoService {

    private static final long LOCK_CODIGOS = 7001L;

    private final AlumnoRepository repository;
    private final AlumnoApoderadoRepository vinculoRepository;
    private final ApoderadoService apoderadoService;
    private final AlumnoMapper mapper;
    private final ApplicationEventPublisher eventos;
    private final EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AlumnoResumenResponse> buscar(String q, EstadoAlumno estado, Pageable pageable) {
        String texto = q == null ? "" : q.trim();
        Page<Alumno> page = estado == null ? repository.buscar(texto, pageable)
                : repository.buscarPorEstado(texto, estado, pageable);
        return PageResponse.of(page.map(mapper::toResumen));
    }

    @Override
    @Transactional(readOnly = true)
    public java.util.List<AlumnoResumenResponse> resumenes(java.util.List<Long> ids) {
        return repository.findAllById(ids).stream().map(mapper::toResumen).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AlumnoResponse obtener(Long id) {
        return respuesta(buscar(id));
    }

    @Override
    public AlumnoResponse crear(AlumnoCreateRequest request) {
        String tipo = DocumentoIdentidad.validar(request.tipoDocumento(), request.numeroDocumento());
        if (repository.existsByTipoDocumentoAndNumeroDocumento(tipo, request.numeroDocumento())) {
            throw new DuplicateResourceException("Ya existe un alumno con " + tipo + " " + request.numeroDocumento());
        }
        List<VinculoApoderadoRequest> vinculos = request.apoderados();
        validarVinculos(vinculos);

        // el correlativo del código se genera bajo un candado de transacción para que dos altas simultáneas no choquen
        entityManager.createNativeQuery("select count(*) from (select pg_advisory_xact_lock(" + LOCK_CODIGOS + ")) t").getSingleResult();
        Alumno alumno = mapper.toEntity(request);
        alumno.setTipoDocumento(tipo);
        alumno.setEstado(EstadoAlumno.ACTIVO);
        alumno.setCodigo(siguienteCodigo());
        alumno = repository.save(alumno);

        List<AlumnoApoderado> creados = new ArrayList<>();
        for (VinculoApoderadoRequest v : vinculos) {
            AlumnoApoderado vinculo = new AlumnoApoderado();
            vinculo.setAlumno(alumno);
            vinculo.setApoderado(apoderadoService.resolver(v.apoderadoId(), v.apoderado()));
            vinculo.setParentesco(v.parentesco());
            vinculo.setEsPrincipal(esPrincipal(v, vinculos.size()));
            vinculo.setEsResponsablePago(Boolean.TRUE.equals(v.esResponsablePago()));
            vinculo.setViveConAlumno(v.viveConAlumno() == null || v.viveConAlumno());
            vinculo.setPuedeRecoger(v.puedeRecoger() == null || v.puedeRecoger());
            creados.add(vinculo);
        }
        vinculoRepository.saveAllAndFlush(creados);

        // el evento solo lleva ids y nombre: nunca documento de identidad, salud ni archivos (privacidad de menores)
        List<Long> apoderadoIds = creados.stream().map(v -> v.getApoderado().getId()).toList();
        List<Long> usuarioIds = new ArrayList<>();
        if (alumno.getUsuarioId() != null) {
            usuarioIds.add(alumno.getUsuarioId());
        }
        creados.stream().map(v -> v.getApoderado().getUsuarioId()).filter(u -> u != null).forEach(usuarioIds::add);
        eventos.publishEvent(AlumnoRegistradoEvent.of(alumno.getId(), alumno.getCodigo(), alumno.nombreCompleto(),
                alumno.getFechaNacimiento(), apoderadoIds, usuarioIds.stream().distinct().toList(), LocalDateTime.now()));
        return mapper.toResponse(alumno, creados.stream().map(mapper::toResponse).toList());
    }

    @Override
    public AlumnoResponse actualizar(Long id, AlumnoUpdateRequest request) {
        Alumno alumno = buscar(id);
        String tipo = DocumentoIdentidad.validar(request.tipoDocumento(), request.numeroDocumento());
        if (repository.existsByTipoDocumentoAndNumeroDocumentoAndIdNot(tipo, request.numeroDocumento(), id)) {
            throw new DuplicateResourceException("Ya existe otro alumno con " + tipo + " " + request.numeroDocumento());
        }
        mapper.update(request, alumno);
        alumno.setTipoDocumento(tipo);
        repository.save(alumno);
        return respuesta(alumno);
    }

    @Override
    public AlumnoResponse vincularUsuario(Long id, Long usuarioId) {
        Alumno alumno = buscar(id);
        if (repository.existsByUsuarioIdAndIdNot(usuarioId, id)) {
            throw new DuplicateResourceException("El usuario " + usuarioId + " ya está vinculado a otro alumno");
        }
        alumno.setUsuarioId(usuarioId);
        repository.save(alumno);
        return respuesta(alumno);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HijoResponse> mios(Long usuarioId, boolean esApoderado) {
        if (usuarioId == null) {
            return List.of();
        }
        if (esApoderado) {
            return vinculoRepository.findByUsuarioDelApoderado(usuarioId).stream().map(mapper::toHijo).toList();
        }
        return repository.findByUsuarioId(usuarioId)
                .map(a -> List.of(new HijoResponse(a.getId(), a.getCodigo(), a.nombreCompleto(), a.getEstado(), null)))
                .orElse(List.of());
    }

    /** Exactamente un principal (si hay un solo apoderado se asume principal), como máximo un responsable de pago, sin repetidos. */
    private void validarVinculos(List<VinculoApoderadoRequest> vinculos) {
        long principales = vinculos.stream().filter(v -> esPrincipal(v, vinculos.size())).count();
        if (principales != 1) {
            throw new BusinessRuleException("El alumno necesita exactamente un apoderado principal (se marcaron " + principales + ")");
        }
        long pagadores = vinculos.stream().filter(v -> Boolean.TRUE.equals(v.esResponsablePago())).count();
        if (pagadores > 1) {
            throw new BusinessRuleException("Solo puede haber un responsable de pago (se marcaron " + pagadores + ")");
        }
        Set<String> claves = new HashSet<>();
        for (VinculoApoderadoRequest v : vinculos) {
            if ((v.apoderadoId() == null) == (v.apoderado() == null)) {
                throw new BusinessRuleException("Cada apoderado debe indicar su apoderadoId o sus datos, pero no ambos");
            }
            String clave = v.apoderadoId() != null ? "id:" + v.apoderadoId()
                    : "doc:" + (v.apoderado().tipoDocumento() == null ? "DNI" : v.apoderado().tipoDocumento().toUpperCase())
                    + ":" + v.apoderado().numeroDocumento();
            if (!claves.add(clave)) {
                throw new BusinessRuleException("El mismo apoderado aparece dos veces en la lista");
            }
        }
    }

    private boolean esPrincipal(VinculoApoderadoRequest v, int total) {
        return Boolean.TRUE.equals(v.esPrincipal()) || (total == 1 && v.esPrincipal() == null);
    }

    private String siguienteCodigo() {
        String prefijo = "AL" + LocalDate.now().getYear() + "-";
        int siguiente = repository.ultimoCodigo(prefijo)
                .map(c -> Integer.parseInt(c.substring(prefijo.length())) + 1).orElse(1);
        return prefijo + String.format("%05d", siguiente);
    }

    private AlumnoResponse respuesta(Alumno alumno) {
        List<VinculoResponse> apoderados = vinculoRepository.findByAlumno(alumno.getId()).stream().map(mapper::toResponse).toList();
        return mapper.toResponse(alumno, apoderados);
    }

    private Alumno buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Alumno", id));
    }
}
```

---

## 46. `ApoderadoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ApoderadoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Apoderado`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import java.util.List;
import org.springframework.data.domain.Pageable;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.entity.Apoderado;

public interface ApoderadoService {
    PageResponse<ApoderadoResponse> buscar(String q, Pageable pageable);

    ApoderadoResponse obtener(Long id);

    ApoderadoResponse actualizar(Long id, ApoderadoRequest request);

    List<HijoResponse> hijos(Long id);

    /** Reutiliza el apoderado con ese documento (completando sus datos de contacto) o crea uno nuevo. */
    Apoderado crearOReutilizar(ApoderadoRequest request);

    /** Apoderado existente por id o, si se envían sus datos, el reutilizado/creado por documento (exactamente uno de los dos). */
    Apoderado resolver(Long apoderadoId, ApoderadoRequest datos);

    /** Vincula la cuenta de auth-ms al apoderado. */
    ApoderadoResponse vincularUsuario(Long id, Long usuarioId);
}
```

---

## 47. `ApoderadoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ApoderadoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Apoderado`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.entity.Apoderado;
import pe.edu.eduspace.alumnos.exception.DatosInvalidosException;
import pe.edu.eduspace.alumnos.exception.DuplicateResourceException;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoApoderadoRepository;
import pe.edu.eduspace.alumnos.repository.ApoderadoRepository;
import pe.edu.eduspace.alumnos.service.ApoderadoService;
import pe.edu.eduspace.alumnos.util.DocumentoIdentidad;

@Service
@RequiredArgsConstructor
@Transactional
public class ApoderadoServiceImpl implements ApoderadoService {

    private final ApoderadoRepository repository;
    private final AlumnoApoderadoRepository vinculoRepository;
    private final AlumnoMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ApoderadoResponse> buscar(String q, Pageable pageable) {
        return PageResponse.of(repository.buscar(q == null ? "" : q.trim(), pageable).map(mapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public ApoderadoResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public ApoderadoResponse actualizar(Long id, ApoderadoRequest request) {
        Apoderado apoderado = buscar(id);
        String tipo = DocumentoIdentidad.validar(request.tipoDocumento(), request.numeroDocumento());
        if (repository.existsByTipoDocumentoAndNumeroDocumentoAndIdNot(tipo, request.numeroDocumento(), id)) {
            throw new DuplicateResourceException("Ya existe otro apoderado con " + tipo + " " + request.numeroDocumento());
        }
        mapper.update(request, apoderado);
        apoderado.setTipoDocumento(tipo);
        return mapper.toResponse(repository.save(apoderado));
    }

    @Override
    @Transactional(readOnly = true)
    public List<HijoResponse> hijos(Long id) {
        buscar(id);
        return vinculoRepository.findByApoderado(id).stream().map(mapper::toHijo).toList();
    }

    @Override
    public Apoderado crearOReutilizar(ApoderadoRequest request) {
        String tipo = DocumentoIdentidad.validar(request.tipoDocumento(), request.numeroDocumento());
        return repository.findByTipoDocumentoAndNumeroDocumento(tipo, request.numeroDocumento()).map(existente -> {
            // un apoderado con varios hijos: se completan los datos de contacto que traiga la nueva alta
            completar(existente, request);
            return repository.save(existente);
        }).orElseGet(() -> {
            Apoderado nuevo = mapper.toEntity(request);
            nuevo.setTipoDocumento(tipo);
            return repository.save(nuevo);
        });
    }

    @Override
    public Apoderado resolver(Long apoderadoId, ApoderadoRequest datos) {
        if ((apoderadoId == null) == (datos == null)) {
            throw new DatosInvalidosException("Indique el apoderadoId de uno existente o los datos del apoderado, pero no ambos");
        }
        return apoderadoId != null ? buscar(apoderadoId) : crearOReutilizar(datos);
    }

    @Override
    public ApoderadoResponse vincularUsuario(Long id, Long usuarioId) {
        Apoderado apoderado = buscar(id);
        if (repository.existsByUsuarioIdAndIdNot(usuarioId, id)) {
            throw new DuplicateResourceException("El usuario " + usuarioId + " ya está vinculado a otro apoderado");
        }
        apoderado.setUsuarioId(usuarioId);
        return mapper.toResponse(repository.save(apoderado));
    }

    private void completar(Apoderado a, ApoderadoRequest r) {
        if (noVacio(r.telefono())) {
            a.setTelefono(r.telefono());
        }
        if (noVacio(r.telefonoAlterno())) {
            a.setTelefonoAlterno(r.telefonoAlterno());
        }
        if (noVacio(r.email())) {
            a.setEmail(r.email());
        }
        if (noVacio(r.direccion())) {
            a.setDireccion(r.direccion());
        }
        if (noVacio(r.ocupacion())) {
            a.setOcupacion(r.ocupacion());
        }
    }

    private boolean noVacio(String s) {
        return s != null && !s.isBlank();
    }

    private Apoderado buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Apoderado", id));
    }
}
```

---

## 48. `ContactosService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ContactosService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Contactos`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import pe.edu.eduspace.alumnos.dto.ContactosNotificacionResponse;

public interface ContactosService {
    ContactosNotificacionResponse contactos(Long alumnoId);
}
```

---

## 49. `ContactosServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ContactosServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Contactos`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.dto.ContactosNotificacionResponse;
import pe.edu.eduspace.alumnos.entity.Alumno;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoApoderadoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.service.ContactosService;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactosServiceImpl implements ContactosService {

    private final AlumnoRepository alumnoRepository;
    private final AlumnoApoderadoRepository vinculoRepository;
    private final AlumnoMapper mapper;

    @Override
    public ContactosNotificacionResponse contactos(Long alumnoId) {
        Alumno alumno = alumnoRepository.findById(alumnoId).orElseThrow(() -> ResourceNotFoundException.of("Alumno", alumnoId));
        return new ContactosNotificacionResponse(alumno.getId(), alumno.nombreCompleto(), alumno.getUsuarioId(),
                vinculoRepository.findByAlumno(alumnoId).stream().map(mapper::toContacto).toList());
    }
}
```

---

## 50. `DocumentoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/DocumentoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Documento`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import java.io.InputStream;
import java.util.List;
import pe.edu.eduspace.alumnos.dto.DescargaResponse;
import pe.edu.eduspace.alumnos.dto.DocumentoResponse;
import pe.edu.eduspace.alumnos.entity.TipoDocumento;

public interface DocumentoService {
    List<DocumentoResponse> listar(Long alumnoId);

    DocumentoResponse subir(Long alumnoId, TipoDocumento tipo, String nombreArchivo, String contentType, long tamano,
                            InputStream contenido);

    DescargaResponse descargar(Long alumnoId, Long documentoId);

    DocumentoResponse verificar(Long alumnoId, Long documentoId, boolean verificado);

    void eliminar(Long alumnoId, Long documentoId);
}
```

---

## 51. `DocumentoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/DocumentoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Documento`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.config.DocumentosProperties;
import pe.edu.eduspace.alumnos.dto.DescargaResponse;
import pe.edu.eduspace.alumnos.dto.DocumentoResponse;
import pe.edu.eduspace.alumnos.entity.Alumno;
import pe.edu.eduspace.alumnos.entity.AlumnoDocumento;
import pe.edu.eduspace.alumnos.entity.TipoDocumento;
import pe.edu.eduspace.alumnos.exception.DatosInvalidosException;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoDocumentoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.service.DocumentoService;
import pe.edu.eduspace.alumnos.storage.AlmacenamientoArchivos;

@Service
@RequiredArgsConstructor
@Transactional
public class DocumentoServiceImpl implements DocumentoService {

    private static final Logger log = LoggerFactory.getLogger(DocumentoServiceImpl.class);

    private final AlumnoDocumentoRepository repository;
    private final AlumnoRepository alumnoRepository;
    private final AlmacenamientoArchivos almacenamiento;
    private final DocumentosProperties props;
    private final AlumnoMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<DocumentoResponse> listar(Long alumnoId) {
        existeAlumno(alumnoId);
        return repository.findByAlumnoIdOrderBySubidoEnDesc(alumnoId).stream().map(mapper::toResponse).toList();
    }

    @Override
    public DocumentoResponse subir(Long alumnoId, TipoDocumento tipo, String nombreArchivo, String contentType,
                                   long tamano, InputStream contenido) {
        Alumno alumno = alumnoRepository.findById(alumnoId).orElseThrow(() -> ResourceNotFoundException.of("Alumno", alumnoId));
        validar(contentType, tamano);
        String nombre = limpiar(nombreArchivo);
        String clave = "alumnos/" + alumnoId + "/" + UUID.randomUUID() + "-" + nombre;
        almacenamiento.guardar(clave, contenido, tamano, contentType);

        AlumnoDocumento doc = new AlumnoDocumento();
        doc.setAlumno(alumno);
        doc.setTipo(tipo);
        doc.setNombreArchivo(nombre);
        doc.setRutaStorage(clave);
        doc.setContentType(contentType);
        doc.setTamanoBytes(tamano);
        doc.setVerificado(false);
        try {
            return mapper.toResponse(repository.saveAndFlush(doc));
        } catch (RuntimeException ex) {
            // el archivo ya está en el almacenamiento: se compensa para no dejar huérfanos
            try {
                almacenamiento.eliminar(clave);
            } catch (RuntimeException limpieza) {
                log.warn("component=DocumentoService eventType=Compensacion status=ERROR key={} cause={}", clave, limpieza.getMessage());
            }
            throw ex;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public DescargaResponse descargar(Long alumnoId, Long documentoId) {
        AlumnoDocumento doc = buscar(alumnoId, documentoId);
        String url = almacenamiento.urlDescarga(doc.getRutaStorage(), props.vigenciaDescarga());
        return new DescargaResponse(url, props.vigenciaDescarga().toSeconds(), doc.getNombreArchivo());
    }

    @Override
    public DocumentoResponse verificar(Long alumnoId, Long documentoId, boolean verificado) {
        AlumnoDocumento doc = buscar(alumnoId, documentoId);
        doc.setVerificado(verificado);
        return mapper.toResponse(repository.save(doc));
    }

    @Override
    public void eliminar(Long alumnoId, Long documentoId) {
        AlumnoDocumento doc = buscar(alumnoId, documentoId);
        almacenamiento.eliminar(doc.getRutaStorage());
        repository.delete(doc);
    }

    private void validar(String contentType, long tamano) {
        if (tamano <= 0) {
            throw new DatosInvalidosException("El archivo está vacío");
        }
        if (tamano > props.maxBytes()) {
            throw new DatosInvalidosException("El archivo supera el máximo de " + props.maxBytes() / (1024 * 1024) + " MB");
        }
        if (contentType == null || !props.tiposPermitidos().contains(contentType.toLowerCase())) {
            throw new DatosInvalidosException("Tipo de archivo no permitido: " + contentType + " (permitidos: "
                    + String.join(", ", props.tiposPermitidos()) + ")");
        }
    }

    /** Deja solo caracteres seguros: el nombre forma parte de la clave del objeto. */
    private String limpiar(String nombre) {
        String base = nombre == null || nombre.isBlank() ? "archivo" : nombre.substring(Math.max(nombre.lastIndexOf('/'), nombre.lastIndexOf('\\')) + 1);
        String seguro = base.replaceAll("[^A-Za-z0-9._-]", "_");
        return seguro.length() > 100 ? seguro.substring(seguro.length() - 100) : seguro;
    }

    private AlumnoDocumento buscar(Long alumnoId, Long documentoId) {
        return repository.findByIdAndAlumnoId(documentoId, alumnoId)
                .orElseThrow(() -> ResourceNotFoundException.of("Documento", documentoId));
    }

    private void existeAlumno(Long alumnoId) {
        if (!alumnoRepository.existsById(alumnoId)) {
            throw ResourceNotFoundException.of("Alumno", alumnoId);
        }
    }
}
```

---

## 52. `EstadoAlumnoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/EstadoAlumnoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `EstadoAlumno`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import java.util.List;
import pe.edu.eduspace.alumnos.dto.AlumnoResumenResponse;
import pe.edu.eduspace.alumnos.dto.CambioEstadoRequest;
import pe.edu.eduspace.alumnos.dto.HistorialResponse;

public interface EstadoAlumnoService {
    AlumnoResumenResponse cambiar(Long alumnoId, CambioEstadoRequest request, Long usuarioId);

    List<HistorialResponse> historial(Long alumnoId);
}
```

---

## 53. `EstadoAlumnoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/EstadoAlumnoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `EstadoAlumno`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.dto.AlumnoResumenResponse;
import pe.edu.eduspace.alumnos.dto.CambioEstadoRequest;
import pe.edu.eduspace.alumnos.dto.HistorialResponse;
import pe.edu.eduspace.alumnos.entity.Alumno;
import pe.edu.eduspace.alumnos.entity.AlumnoEstadoHistorial;
import pe.edu.eduspace.alumnos.event.AlumnoEstadoCambiadoEvent;
import pe.edu.eduspace.alumnos.exception.BusinessRuleException;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoEstadoHistorialRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.service.EstadoAlumnoService;

/** Un alumno nunca se borra: cambia de estado y queda el historial con el motivo y quién lo hizo. */
@Service
@RequiredArgsConstructor
@Transactional
public class EstadoAlumnoServiceImpl implements EstadoAlumnoService {

    private final AlumnoRepository repository;
    private final AlumnoEstadoHistorialRepository historialRepository;
    private final AlumnoMapper mapper;
    private final ApplicationEventPublisher eventos;

    @Override
    public AlumnoResumenResponse cambiar(Long alumnoId, CambioEstadoRequest request, Long usuarioId) {
        Alumno alumno = repository.findById(alumnoId).orElseThrow(() -> ResourceNotFoundException.of("Alumno", alumnoId));
        if (alumno.getEstado() == request.estado()) {
            throw new BusinessRuleException("El alumno ya está en estado " + request.estado());
        }
        LocalDateTime ahora = LocalDateTime.now();
        AlumnoEstadoHistorial historial = new AlumnoEstadoHistorial();
        historial.setAlumno(alumno);
        historial.setEstadoAnterior(alumno.getEstado());
        historial.setEstadoNuevo(request.estado());
        historial.setMotivo(request.motivo());
        historial.setUsuarioId(usuarioId);
        historial.setCambiadoEn(ahora);
        historialRepository.save(historial);

        String anterior = alumno.getEstado().name();
        alumno.setEstado(request.estado());
        repository.save(alumno);
        eventos.publishEvent(AlumnoEstadoCambiadoEvent.of(alumnoId, anterior, request.estado().name(), request.motivo(), ahora));
        return mapper.toResumen(alumno);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HistorialResponse> historial(Long alumnoId) {
        if (!repository.existsById(alumnoId)) {
            throw ResourceNotFoundException.of("Alumno", alumnoId);
        }
        return historialRepository.findByAlumnoIdOrderByCambiadoEnDescIdDesc(alumnoId).stream().map(mapper::toResponse).toList();
    }
}
```

---

## 54. `ExpedienteService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ExpedienteService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Expediente`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import pe.edu.eduspace.alumnos.dto.ExpedienteCompletoResponse;

public interface ExpedienteService {
    /** Completo si todos los documentos requeridos (configurables) existen y están verificados. */
    ExpedienteCompletoResponse evaluar(Long alumnoId);
}
```

---

## 55. `ExpedienteServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ExpedienteServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Expediente`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.config.ExpedienteProperties;
import pe.edu.eduspace.alumnos.dto.ExpedienteCompletoResponse;
import pe.edu.eduspace.alumnos.entity.TipoDocumento;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.repository.AlumnoDocumentoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.service.ExpedienteService;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExpedienteServiceImpl implements ExpedienteService {

    private final AlumnoRepository alumnoRepository;
    private final AlumnoDocumentoRepository documentoRepository;
    private final ExpedienteProperties props;

    @Override
    public ExpedienteCompletoResponse evaluar(Long alumnoId) {
        if (!alumnoRepository.existsById(alumnoId)) {
            throw ResourceNotFoundException.of("Alumno", alumnoId);
        }
        Set<TipoDocumento> verificados = documentoRepository.findByAlumnoIdOrderBySubidoEnDesc(alumnoId).stream()
                .filter(d -> Boolean.TRUE.equals(d.getVerificado())).map(d -> d.getTipo()).collect(Collectors.toSet());
        List<TipoDocumento> faltantes = props.requeridos().stream().filter(t -> !verificados.contains(t)).toList();
        return new ExpedienteCompletoResponse(faltantes.isEmpty(), faltantes);
    }
}
```

---

## 56. `ImportacionAlumnosService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/ImportacionAlumnosService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `ImportacionAlumnos`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import java.io.InputStream;
import pe.edu.eduspace.alumnos.dto.ImportacionResponse;

public interface ImportacionAlumnosService {

    /**
     * Crea alumnos (con un apoderado cada uno) desde un CSV UTF-8. Encabezados esperados:
     * {@code tipoDocumento,numeroDocumento,nombres,apellidoPaterno,apellidoMaterno,fechaNacimiento,sexo,direccion,distrito,
     * telefono,email,apoderadoTipoDocumento,apoderadoNumeroDocumento,apoderadoNombres,apoderadoApellidos,
     * apoderadoParentesco,apoderadoTelefono,apoderadoEmail}.
     */
    ImportacionResponse importar(InputStream csv);
}
```

---

## 57. `ImportacionAlumnosServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/ImportacionAlumnosServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `ImportacionAlumnos`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.eduspace.alumnos.dto.AlumnoCreateRequest;
import pe.edu.eduspace.alumnos.dto.AlumnoResponse;
import pe.edu.eduspace.alumnos.dto.ApoderadoRequest;
import pe.edu.eduspace.alumnos.dto.ImportacionResponse;
import pe.edu.eduspace.alumnos.dto.VinculoApoderadoRequest;
import pe.edu.eduspace.alumnos.entity.Parentesco;
import pe.edu.eduspace.alumnos.exception.DatosInvalidosException;
import pe.edu.eduspace.alumnos.service.AlumnoService;
import pe.edu.eduspace.alumnos.service.ImportacionAlumnosService;
import pe.edu.eduspace.alumnos.util.CsvAlumnos;

/**
 * No es transaccional a propósito: cada fila llama a {@link AlumnoService#crear}, que abre su propia transacción,
 * así una fila inválida o duplicada no revierte las demás.
 */
@Service
@RequiredArgsConstructor
public class ImportacionAlumnosServiceImpl implements ImportacionAlumnosService {

    static final int MAX_FILAS = 500;
    private static final List<String> OBLIGATORIAS = List.of("numeroDocumento", "nombres", "apellidoPaterno",
            "fechaNacimiento", "sexo", "apoderadoNumeroDocumento", "apoderadoNombres", "apoderadoApellidos", "apoderadoParentesco");

    private final AlumnoService alumnoService;
    private final Validator validator;

    @Override
    public ImportacionResponse importar(InputStream csv) {
        List<String> lineas = leer(csv);
        if (lineas.isEmpty()) {
            throw new DatosInvalidosException("El archivo está vacío");
        }
        char delim = CsvAlumnos.detectarDelimitador(lineas.get(0));
        List<String> encabezados = CsvAlumnos.dividir(lineas.get(0), delim);
        List<String> faltan = OBLIGATORIAS.stream().filter(c -> !encabezados.contains(c)).toList();
        if (!faltan.isEmpty()) {
            throw new DatosInvalidosException("Faltan columnas obligatorias: " + String.join(", ", faltan));
        }
        if (lineas.size() - 1 > MAX_FILAS) {
            throw new DatosInvalidosException("Máximo " + MAX_FILAS + " alumnos por archivo");
        }

        List<ImportacionResponse.Fila> filas = new ArrayList<>();
        for (int i = 1; i < lineas.size(); i++) {
            List<String> valores = CsvAlumnos.dividir(lineas.get(i), delim);
            Map<String, String> fila = new java.util.HashMap<>();
            for (int c = 0; c < encabezados.size(); c++) {
                fila.put(encabezados.get(c), c < valores.size() && !valores.get(c).isEmpty() ? valores.get(c) : null);
            }
            filas.add(procesar(i + 1, fila));
        }
        int creados = (int) filas.stream().filter(ImportacionResponse.Fila::creado).count();
        return new ImportacionResponse(filas.size(), creados, filas.size() - creados, filas);
    }

    private ImportacionResponse.Fila procesar(int linea, Map<String, String> f) {
        String doc = f.get("numeroDocumento");
        try {
            AlumnoCreateRequest request = armar(f);
            String errores = validator.validate(request).stream()
                    .map((ConstraintViolation<AlumnoCreateRequest> v) -> v.getPropertyPath() + ": " + v.getMessage())
                    .sorted().collect(Collectors.joining("; "));
            if (!errores.isEmpty()) {
                return new ImportacionResponse.Fila(linea, doc, false, null, null, errores);
            }
            AlumnoResponse creado = alumnoService.crear(request);
            return new ImportacionResponse.Fila(linea, doc, true, creado.id(), creado.codigo(), null);
        } catch (RuntimeException ex) {
            return new ImportacionResponse.Fila(linea, doc, false, null, null, ex.getMessage());
        }
    }

    private AlumnoCreateRequest armar(Map<String, String> f) {
        LocalDate nacimiento;
        try {
            nacimiento = f.get("fechaNacimiento") == null ? null : LocalDate.parse(f.get("fechaNacimiento"));
        } catch (DateTimeParseException ex) {
            throw new DatosInvalidosException("fechaNacimiento debe ser AAAA-MM-DD");
        }
        Parentesco parentesco;
        try {
            parentesco = Parentesco.valueOf(String.valueOf(f.get("apoderadoParentesco")).toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new DatosInvalidosException("apoderadoParentesco inválido (use " + java.util.Arrays.toString(Parentesco.values()) + ")");
        }
        ApoderadoRequest apoderado = new ApoderadoRequest(f.get("apoderadoTipoDocumento"), f.get("apoderadoNumeroDocumento"),
                f.get("apoderadoNombres"), f.get("apoderadoApellidos"), f.get("apoderadoTelefono"), null,
                f.get("apoderadoEmail"), null, null);
        // único apoderado: es el principal y el responsable de pago
        VinculoApoderadoRequest vinculo = new VinculoApoderadoRequest(null, apoderado, parentesco, true, true, null, null);
        return new AlumnoCreateRequest(f.get("tipoDocumento"), f.get("numeroDocumento"), f.get("nombres"),
                f.get("apellidoPaterno"), f.get("apellidoMaterno"), nacimiento,
                f.get("sexo") == null ? null : f.get("sexo").toUpperCase(), null, f.get("direccion"), f.get("distrito"),
                f.get("telefono"), f.get("email"), null, List.of(vinculo));
    }

    private List<String> leer(InputStream in) {
        try (BufferedReader r = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            List<String> lineas = new ArrayList<>();
            String l;
            while ((l = r.readLine()) != null) {
                if (lineas.isEmpty() && l.startsWith("﻿")) {
                    l = l.substring(1);
                }
                if (!l.isBlank()) {
                    lineas.add(l);
                }
            }
            return lineas;
        } catch (IOException ex) {
            throw new DatosInvalidosException("No se pudo leer el archivo");
        }
    }
}
```

---

## 58. `InternalConsultaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/InternalConsultaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `InternalConsulta`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import java.util.List;
import pe.edu.eduspace.alumnos.dto.*;

/** Lecturas livianas para otros servicios (adenda A3). */
public interface InternalConsultaService {
    AlumnoBasicoResponse basico(Long alumnoId);

    /** Los apoderados de un alumno, con su documento (para comprobar que coincidan con los de un hermano). */
    List<pe.edu.eduspace.alumnos.dto.ApoderadoResponse> apoderadosDe(Long alumnoId);

    /** El alumno con ese número de documento (404 si no hay). */
    AlumnoBasicoResponse porDocumento(String numeroDocumento);

    AlumnoUsuarioResponse alumnoDeUsuario(Long usuarioId);

    List<HijoResponse> hijosDeUsuario(Long usuarioId);

    List<AlumnoBasicoResponse> lote(List<Long> ids);

    ResponsablePagoResponse responsablePago(Long alumnoId);
}
```

---

## 59. `InternalConsultaServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/InternalConsultaServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `InternalConsulta`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoApoderadoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.service.InternalConsultaService;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InternalConsultaServiceImpl implements InternalConsultaService {

    private final AlumnoRepository alumnoRepository;
    private final AlumnoApoderadoRepository vinculoRepository;
    private final AlumnoMapper mapper;

    @Override
    public AlumnoBasicoResponse basico(Long alumnoId) {
        return alumnoRepository.findById(alumnoId).map(mapper::toBasico)
                .orElseThrow(() -> ResourceNotFoundException.of("Alumno", alumnoId));
    }

    @Override
    public List<pe.edu.eduspace.alumnos.dto.ApoderadoResponse> apoderadosDe(Long alumnoId) {
        if (!alumnoRepository.existsById(alumnoId)) {
            throw ResourceNotFoundException.of("Alumno", alumnoId);
        }
        return vinculoRepository.findByAlumno(alumnoId).stream().map(v -> mapper.toResponse(v.getApoderado())).toList();
    }

    @Override
    public AlumnoBasicoResponse porDocumento(String numeroDocumento) {
        return alumnoRepository.findFirstByNumeroDocumentoOrderByIdAsc(numeroDocumento == null ? "" : numeroDocumento.trim()).map(mapper::toBasico)
                .orElseThrow(() -> new ResourceNotFoundException("No hay un alumno con ese documento"));
    }

    @Override
    public AlumnoUsuarioResponse alumnoDeUsuario(Long usuarioId) {
        return alumnoRepository.findByUsuarioId(usuarioId).map(a -> new AlumnoUsuarioResponse(a.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("El usuario " + usuarioId + " no es un alumno"));
    }

    @Override
    public List<HijoResponse> hijosDeUsuario(Long usuarioId) {
        return vinculoRepository.findByUsuarioDelApoderado(usuarioId).stream().map(mapper::toHijo).toList();
    }

    @Override
    public List<AlumnoBasicoResponse> lote(List<Long> ids) {
        return alumnoRepository.findByIdIn(ids).stream().map(mapper::toBasico).toList();
    }

    @Override
    public ResponsablePagoResponse responsablePago(Long alumnoId) {
        if (!alumnoRepository.existsById(alumnoId)) {
            throw ResourceNotFoundException.of("Alumno", alumnoId);
        }
        return vinculoRepository.findResponsablePago(alumnoId)
                .map(v -> new ResponsablePagoResponse(v.getApoderado().getId(), v.getApoderado().getUsuarioId(),
                        v.getApoderado().nombreCompleto()))
                .orElseThrow(() -> new ResourceNotFoundException("El alumno " + alumnoId + " no tiene responsable de pago"));
    }
}
```

---

## 60. `SaludService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/SaludService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Salud`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import pe.edu.eduspace.alumnos.dto.SaludRequest;
import pe.edu.eduspace.alumnos.dto.SaludResponse;

/** Dato sensible de menores: cada consulta y cada cambio quedan en el log con el usuario que los hizo. */
public interface SaludService {
    SaludResponse obtener(Long alumnoId, Long usuarioId);

    SaludResponse guardar(Long alumnoId, SaludRequest request, Long usuarioId);
}
```

---

## 61. `SaludServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/SaludServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Salud`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.dto.SaludRequest;
import pe.edu.eduspace.alumnos.dto.SaludResponse;
import pe.edu.eduspace.alumnos.entity.Alumno;
import pe.edu.eduspace.alumnos.entity.AlumnoSalud;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoSaludRepository;
import pe.edu.eduspace.alumnos.service.SaludService;
import pe.edu.eduspace.alumnos.util.UsuarioActual;

@Service
@RequiredArgsConstructor
@Transactional
public class SaludServiceImpl implements SaludService {

    private static final Logger log = LoggerFactory.getLogger(SaludServiceImpl.class);

    private final AlumnoSaludRepository repository;
    private final AlumnoRepository alumnoRepository;
    private final AlumnoMapper mapper;

    /**
     * El informe permite leer la ficha al "docente tutor", pero saber quién es tutor de qué alumno exige datos de
     * planificacion-ms y matricula-ms. Mientras no exista esa consulta, esta bandera decide si los DOCENTE leen.
     */
    @Value("${app.salud.docentes-pueden-leer:false}")
    private boolean docentesPuedenLeer;

    @Override
    @Transactional(readOnly = true)
    public SaludResponse obtener(Long alumnoId, Long usuarioId) {
        if (UsuarioActual.tieneAlgunRol("DOCENTE") && !UsuarioActual.tieneAlgunRol("ADMIN", "SECRETARIA") && !docentesPuedenLeer) {
            throw new AccessDeniedException("La ficha de salud está restringida a secretaría y administración");
        }
        AlumnoSalud salud = repository.findById(alumnoId).orElseThrow(() -> {
            if (!alumnoRepository.existsById(alumnoId)) {
                return ResourceNotFoundException.of("Alumno", alumnoId);
            }
            return new ResourceNotFoundException("El alumno " + alumnoId + " aún no tiene ficha de salud");
        });
        log.info("component=SaludService eventType=ConsultaFichaSalud key={} status=OK usuarioId={}", alumnoId, usuarioId);
        return mapper.toResponse(salud);
    }

    @Override
    public SaludResponse guardar(Long alumnoId, SaludRequest request, Long usuarioId) {
        Alumno alumno = alumnoRepository.findById(alumnoId).orElseThrow(() -> ResourceNotFoundException.of("Alumno", alumnoId));
        AlumnoSalud salud = repository.findById(alumnoId).orElseGet(() -> {
            AlumnoSalud nueva = new AlumnoSalud();
            nueva.setAlumno(alumno);
            return nueva;
        });
        mapper.update(request, salud);
        AlumnoSalud guardada = repository.save(salud);
        log.info("component=SaludService eventType=ActualizacionFichaSalud key={} status=OK usuarioId={}", alumnoId, usuarioId);
        return mapper.toResponse(guardada);
    }
}
```

---

## 62. `VinculoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/VinculoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Vinculo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service;

import java.util.List;
import pe.edu.eduspace.alumnos.dto.VinculoApoderadoRequest;
import pe.edu.eduspace.alumnos.dto.VinculoResponse;
import pe.edu.eduspace.alumnos.dto.VinculoUpdateRequest;

public interface VinculoService {
    List<VinculoResponse> listar(Long alumnoId);

    VinculoResponse agregar(Long alumnoId, VinculoApoderadoRequest request);

    VinculoResponse actualizar(Long alumnoId, Long vinculoId, VinculoUpdateRequest request);

    void quitar(Long alumnoId, Long vinculoId);
}
```

---

## 63. `VinculoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/service/impl/VinculoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Vinculo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.alumnos.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.alumnos.dto.VinculoApoderadoRequest;
import pe.edu.eduspace.alumnos.dto.VinculoResponse;
import pe.edu.eduspace.alumnos.dto.VinculoUpdateRequest;
import pe.edu.eduspace.alumnos.entity.Alumno;
import pe.edu.eduspace.alumnos.entity.Apoderado;
import pe.edu.eduspace.alumnos.entity.AlumnoApoderado;
import pe.edu.eduspace.alumnos.exception.BusinessRuleException;
import pe.edu.eduspace.alumnos.exception.DuplicateResourceException;
import pe.edu.eduspace.alumnos.exception.ResourceNotFoundException;
import pe.edu.eduspace.alumnos.mapper.AlumnoMapper;
import pe.edu.eduspace.alumnos.repository.AlumnoApoderadoRepository;
import pe.edu.eduspace.alumnos.repository.AlumnoRepository;
import pe.edu.eduspace.alumnos.service.ApoderadoService;
import pe.edu.eduspace.alumnos.service.VinculoService;

/** Las banderas "principal" y "responsable de pago" son únicas por alumno: se quitan de los demás antes de asignarlas. */
@Service
@RequiredArgsConstructor
@Transactional
public class VinculoServiceImpl implements VinculoService {

    private static final long NINGUNO = -1L;

    private final AlumnoApoderadoRepository repository;
    private final AlumnoRepository alumnoRepository;
    private final ApoderadoService apoderadoService;
    private final AlumnoMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<VinculoResponse> listar(Long alumnoId) {
        existeAlumno(alumnoId);
        return repository.findByAlumno(alumnoId).stream().map(mapper::toResponse).toList();
    }

    @Override
    public VinculoResponse agregar(Long alumnoId, VinculoApoderadoRequest request) {
        existeAlumno(alumnoId);
        boolean principal = Boolean.TRUE.equals(request.esPrincipal());
        boolean pagador = Boolean.TRUE.equals(request.esResponsablePago());
        if (repository.countByAlumnoId(alumnoId) == 0) {
            principal = true;
        }
        // primero se liberan las banderas únicas (las consultas masivas limpian el contexto de persistencia)
        if (principal) {
            repository.quitarPrincipalDeLosDemas(alumnoId, NINGUNO);
        }
        if (pagador) {
            repository.quitarResponsablePagoDeLosDemas(alumnoId, NINGUNO);
        }
        Alumno alumno = alumnoRepository.findById(alumnoId).orElseThrow();
        Apoderado apoderado = apoderadoService.resolver(request.apoderadoId(), request.apoderado());
        if (repository.existsByAlumnoIdAndApoderadoId(alumnoId, apoderado.getId())) {
            throw new DuplicateResourceException("El apoderado ya está vinculado a este alumno");
        }
        AlumnoApoderado vinculo = new AlumnoApoderado();
        vinculo.setAlumno(alumno);
        vinculo.setApoderado(apoderado);
        vinculo.setParentesco(request.parentesco());
        vinculo.setEsPrincipal(principal);
        vinculo.setEsResponsablePago(pagador);
        vinculo.setViveConAlumno(request.viveConAlumno() == null || request.viveConAlumno());
        vinculo.setPuedeRecoger(request.puedeRecoger() == null || request.puedeRecoger());
        return mapper.toResponse(repository.save(vinculo));
    }

    @Override
    public VinculoResponse actualizar(Long alumnoId, Long vinculoId, VinculoUpdateRequest request) {
        AlumnoApoderado actual = buscar(alumnoId, vinculoId);
        if (Boolean.FALSE.equals(request.esPrincipal()) && Boolean.TRUE.equals(actual.getEsPrincipal())) {
            throw new BusinessRuleException("El alumno no puede quedar sin apoderado principal: designe primero a otro como principal");
        }
        if (Boolean.TRUE.equals(request.esPrincipal())) {
            repository.quitarPrincipalDeLosDemas(alumnoId, vinculoId);
        }
        if (Boolean.TRUE.equals(request.esResponsablePago())) {
            repository.quitarResponsablePagoDeLosDemas(alumnoId, vinculoId);
        }
        AlumnoApoderado vinculo = buscar(alumnoId, vinculoId);
        if (request.parentesco() != null) {
            vinculo.setParentesco(request.parentesco());
        }
        if (request.esPrincipal() != null) {
            vinculo.setEsPrincipal(request.esPrincipal());
        }
        if (request.esResponsablePago() != null) {
            vinculo.setEsResponsablePago(request.esResponsablePago());
        }
        if (request.viveConAlumno() != null) {
            vinculo.setViveConAlumno(request.viveConAlumno());
        }
        if (request.puedeRecoger() != null) {
            vinculo.setPuedeRecoger(request.puedeRecoger());
        }
        return mapper.toResponse(repository.save(vinculo));
    }

    @Override
    public void quitar(Long alumnoId, Long vinculoId) {
        AlumnoApoderado vinculo = buscar(alumnoId, vinculoId);
        if (Boolean.TRUE.equals(vinculo.getEsPrincipal())) {
            throw new BusinessRuleException("No se puede quitar al apoderado principal: designe primero a otro como principal");
        }
        repository.delete(vinculo);
    }

    private AlumnoApoderado buscar(Long alumnoId, Long vinculoId) {
        return repository.findByIdAndAlumnoId(vinculoId, alumnoId)
                .orElseThrow(() -> ResourceNotFoundException.of("Vínculo", vinculoId));
    }

    private void existeAlumno(Long alumnoId) {
        if (!alumnoRepository.existsById(alumnoId)) {
            throw ResourceNotFoundException.of("Alumno", alumnoId);
        }
    }
}
```

---

## 64. `AlumnoController.java` — Controladores REST API

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/AlumnoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Alumno`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.alumnos.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.entity.EstadoAlumno;
import pe.edu.eduspace.alumnos.service.AccesoService;
import pe.edu.eduspace.alumnos.service.AlumnoService;
import pe.edu.eduspace.alumnos.service.EstadoAlumnoService;
import pe.edu.eduspace.alumnos.service.ImportacionAlumnosService;
import pe.edu.eduspace.alumnos.util.Respuestas;
import pe.edu.eduspace.alumnos.util.UsuarioActual;

@RestController
@RequestMapping("/api/v1/alumnos")
@RequiredArgsConstructor
public class AlumnoController {

    private final AlumnoService service;
    private final EstadoAlumnoService estadoService;
    private final AccesoService acceso;
    private final ImportacionAlumnosService importacion;

    /** El CAJERO también busca: necesita ubicar al alumno para cobrar. Solo recibe el resumen (nombre, código y documento). */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA','DOCENTE','CAJERO')")
    public PageResponse<AlumnoResumenResponse> buscar(@RequestParam(required = false) String q,
                                                      @RequestParam(required = false) EstadoAlumno estado,
                                                      @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "20") int size) {
        int tamano = Math.min(Math.max(size, 1), 100);
        return service.buscar(q, estado, PageRequest.of(Math.max(page, 0), tamano,
                Sort.by("apellidoPaterno", "apellidoMaterno", "nombres")));
    }

    /** Alumnos del usuario autenticado: para la app del apoderado (sus hijos) y del alumno (él mismo). */
    @GetMapping("/mios")
    @PreAuthorize("hasAnyRole('APODERADO','ALUMNO')")
    public List<HijoResponse> mios() {
        return service.mios(UsuarioActual.id(), UsuarioActual.tieneAlgunRol("APODERADO"));
    }

    /** Nombres de varios alumnos a la vez (máximo 200 ids). Solo datos de identificación. */
    @GetMapping("/resumen")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA','DOCENTE','CAJERO')")
    public List<AlumnoResumenResponse> resumen(@RequestParam List<Long> ids) {
        if (ids.size() > 200) {
            throw new IllegalArgumentException("Pida como máximo 200 alumnos por vez");
        }
        return service.resumenes(ids);
    }

    @GetMapping("/{id}")
    public AlumnoResponse obtener(@PathVariable Long id) {
        acceso.verificarLecturaAlumno(id);
        return service.obtener(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public ResponseEntity<AlumnoResponse> crear(@Valid @RequestBody AlumnoCreateRequest request) {
        AlumnoResponse creado = service.crear(request);
        return Respuestas.creado(creado.id(), creado);
    }

    /** Alta masiva desde CSV (UTF-8): un alumno con su apoderado por fila; el resultado detalla cada fila. */
    @PostMapping(value = "/importacion", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public ImportacionResponse importar(@RequestParam("archivo") org.springframework.web.multipart.MultipartFile archivo)
            throws java.io.IOException {
        return importacion.importar(archivo.getInputStream());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public AlumnoResponse actualizar(@PathVariable Long id, @Valid @RequestBody AlumnoUpdateRequest request) {
        return service.actualizar(id, request);
    }

    @PatchMapping("/{id}/usuario")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public AlumnoResponse vincularUsuario(@PathVariable Long id, @Valid @RequestBody VincularUsuarioRequest request) {
        return service.vincularUsuario(id, request.usuarioId());
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public AlumnoResumenResponse cambiarEstado(@PathVariable Long id, @Valid @RequestBody CambioEstadoRequest request) {
        return estadoService.cambiar(id, request, UsuarioActual.id());
    }

    @GetMapping("/{id}/estado/historial")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public List<HistorialResponse> historial(@PathVariable Long id) {
        return estadoService.historial(id);
    }
}
```

---

## 65. `ApoderadoController.java` — Controladores REST API

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/ApoderadoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Apoderado`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.alumnos.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.service.AccesoService;
import pe.edu.eduspace.alumnos.service.ApoderadoService;

@RestController
@RequestMapping("/api/v1/apoderados")
@RequiredArgsConstructor
public class ApoderadoController {

    private final ApoderadoService service;
    private final AccesoService acceso;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public PageResponse<ApoderadoResponse> buscar(@RequestParam(required = false) String q,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "20") int size) {
        int tamano = Math.min(Math.max(size, 1), 100);
        return service.buscar(q, PageRequest.of(Math.max(page, 0), tamano, Sort.by("apellidos", "nombres")));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA','APODERADO')")
    public ApoderadoResponse obtener(@PathVariable Long id) {
        acceso.verificarLecturaApoderado(id);
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public ApoderadoResponse actualizar(@PathVariable Long id, @Valid @RequestBody ApoderadoRequest request) {
        return service.actualizar(id, request);
    }

    @PatchMapping("/{id}/usuario")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public ApoderadoResponse vincularUsuario(@PathVariable Long id, @Valid @RequestBody VincularUsuarioRequest request) {
        return service.vincularUsuario(id, request.usuarioId());
    }

    @GetMapping("/{id}/hijos")
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA','APODERADO')")
    public List<HijoResponse> hijos(@PathVariable Long id) {
        acceso.verificarLecturaApoderado(id);
        return service.hijos(id);
    }
}
```

---

## 66. `DocumentoController.java` — Controladores REST API

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/DocumentoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Documento`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.alumnos.controller;

import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pe.edu.eduspace.alumnos.dto.DescargaResponse;
import pe.edu.eduspace.alumnos.dto.DocumentoResponse;
import pe.edu.eduspace.alumnos.dto.VerificarDocumentoRequest;
import pe.edu.eduspace.alumnos.entity.TipoDocumento;
import pe.edu.eduspace.alumnos.exception.StorageException;
import pe.edu.eduspace.alumnos.service.DocumentoService;
import pe.edu.eduspace.alumnos.util.Respuestas;

@RestController
@RequestMapping("/api/v1/alumnos/{alumnoId}/documentos")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
public class DocumentoController {

    private final DocumentoService service;

    @GetMapping
    public List<DocumentoResponse> listar(@PathVariable Long alumnoId) {
        return service.listar(alumnoId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentoResponse> subir(@PathVariable Long alumnoId, @RequestParam TipoDocumento tipo,
                                                   @RequestParam("archivo") MultipartFile archivo) {
        try {
            DocumentoResponse creado = service.subir(alumnoId, tipo, archivo.getOriginalFilename(),
                    archivo.getContentType(), archivo.getSize(), archivo.getInputStream());
            return Respuestas.creado(creado.id(), creado);
        } catch (IOException ex) {
            throw new StorageException("No se pudo leer el archivo recibido", ex);
        }
    }

    /** Devuelve una URL firmada de descarga con vencimiento corto (el archivo no pasa por el servicio). */
    @GetMapping("/{documentoId}/descarga")
    public DescargaResponse descargar(@PathVariable Long alumnoId, @PathVariable Long documentoId) {
        return service.descargar(alumnoId, documentoId);
    }

    @PatchMapping("/{documentoId}/verificado")
    public DocumentoResponse verificar(@PathVariable Long alumnoId, @PathVariable Long documentoId,
                                       @RequestBody(required = false) VerificarDocumentoRequest request) {
        boolean valor = request == null || request.valor();
        return service.verificar(alumnoId, documentoId, valor);
    }

    @DeleteMapping("/{documentoId}")
    public ResponseEntity<Void> eliminar(@PathVariable Long alumnoId, @PathVariable Long documentoId) {
        service.eliminar(alumnoId, documentoId);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 67. `InternalController.java` — Controladores REST API

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/InternalController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Internal`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.alumnos.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.alumnos.dto.*;
import jakarta.validation.Valid;
import pe.edu.eduspace.alumnos.service.AlumnoService;
import pe.edu.eduspace.alumnos.service.ApoderadoService;
import pe.edu.eduspace.alumnos.service.ContactosService;
import pe.edu.eduspace.alumnos.service.ExpedienteService;
import pe.edu.eduspace.alumnos.service.InternalConsultaService;

/**
 * Lecturas livianas para otros servicios (adenda A3). El Gateway NO enruta {@code /internal/**}: solo es
 * alcanzable dentro de la red Docker.
 */
@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalController {

    private final InternalConsultaService internal;
    private final ContactosService contactosService;
    private final ExpedienteService expedienteService;
    private final AlumnoService alumnoService;
    private final ApoderadoService apoderadoService;

    @GetMapping("/alumnos/{id}")
    public AlumnoBasicoResponse alumno(@PathVariable Long id) {
        return internal.basico(id);
    }

    @GetMapping("/alumnos/documento/{numero}")
    public AlumnoBasicoResponse porDocumento(@PathVariable String numero) {
        return internal.porDocumento(numero);
    }

    @GetMapping("/alumnos/{id}/apoderados")
    public List<pe.edu.eduspace.alumnos.dto.ApoderadoResponse> apoderados(@PathVariable Long id) {
        return internal.apoderadosDe(id);
    }

    @GetMapping("/alumnos/{id}/contactos")
    public ContactosNotificacionResponse contactos(@PathVariable Long id) {
        return contactosService.contactos(id);
    }

    @GetMapping("/alumnos/{id}/expediente-completo")
    public ExpedienteCompletoResponse expediente(@PathVariable Long id) {
        return expedienteService.evaluar(id);
    }

    @GetMapping("/alumnos/{id}/responsable-pago")
    public ResponsablePagoResponse responsablePago(@PathVariable Long id) {
        return internal.responsablePago(id);
    }

    @GetMapping("/alumnos/usuario/{usuarioId}")
    public AlumnoUsuarioResponse alumnoDeUsuario(@PathVariable Long usuarioId) {
        return internal.alumnoDeUsuario(usuarioId);
    }

    @GetMapping("/alumnos/lote")
    public List<AlumnoBasicoResponse> lote(@RequestParam List<Long> ids) {
        return internal.lote(ids);
    }

    @GetMapping("/apoderados/usuario/{usuarioId}/alumnos")
    public List<HijoResponse> hijosDeUsuario(@PathVariable Long usuarioId) {
        return internal.hijosDeUsuario(usuarioId);
    }

    /** Registro desde la matrícula en línea del sitio público (matricula-ms lo llama con el token de servicio). */
    @PostMapping("/alumnos")
    public AlumnoResponse registrar(@Valid @RequestBody AlumnoCreateRequest request) {
        return alumnoService.crear(request);
    }

    @PostMapping("/alumnos/{id}/usuario")
    public AlumnoResponse vincularAlumno(@PathVariable Long id, @Valid @RequestBody VincularUsuarioRequest request) {
        return alumnoService.vincularUsuario(id, request.usuarioId());
    }

    @PostMapping("/apoderados/{id}/usuario")
    public ApoderadoResponse vincularApoderado(@PathVariable Long id, @Valid @RequestBody VincularUsuarioRequest request) {
        return apoderadoService.vincularUsuario(id, request.usuarioId());
    }
}
```

---

## 68. `SaludController.java` — Controladores REST API

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/SaludController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Salud`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.alumnos.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.alumnos.dto.SaludRequest;
import pe.edu.eduspace.alumnos.dto.SaludResponse;
import pe.edu.eduspace.alumnos.service.SaludService;
import pe.edu.eduspace.alumnos.util.UsuarioActual;

@RestController
@RequestMapping("/api/v1/alumnos/{alumnoId}/salud")
@RequiredArgsConstructor
public class SaludController {

    private final SaludService service;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA','DOCENTE')")
    public SaludResponse obtener(@PathVariable Long alumnoId) {
        return service.obtener(alumnoId, UsuarioActual.id());
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
    public SaludResponse guardar(@PathVariable Long alumnoId, @Valid @RequestBody SaludRequest request) {
        return service.guardar(alumnoId, request, UsuarioActual.id());
    }
}
```

---

## 69. `VinculoController.java` — Controladores REST API

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/controller/VinculoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Vinculo`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.alumnos.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.alumnos.dto.VinculoApoderadoRequest;
import pe.edu.eduspace.alumnos.dto.VinculoResponse;
import pe.edu.eduspace.alumnos.dto.VinculoUpdateRequest;
import pe.edu.eduspace.alumnos.service.VinculoService;
import pe.edu.eduspace.alumnos.util.Respuestas;

@RestController
@RequestMapping("/api/v1/alumnos/{alumnoId}/apoderados")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','SECRETARIA')")
public class VinculoController {

    private final VinculoService service;

    @GetMapping
    public List<VinculoResponse> listar(@PathVariable Long alumnoId) {
        return service.listar(alumnoId);
    }

    @PostMapping
    public ResponseEntity<VinculoResponse> agregar(@PathVariable Long alumnoId,
                                                   @Valid @RequestBody VinculoApoderadoRequest request) {
        VinculoResponse creado = service.agregar(alumnoId, request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{vinculoId}")
    public VinculoResponse actualizar(@PathVariable Long alumnoId, @PathVariable Long vinculoId,
                                      @RequestBody VinculoUpdateRequest request) {
        return service.actualizar(alumnoId, vinculoId, request);
    }

    @DeleteMapping("/{vinculoId}")
    public ResponseEntity<Void> quitar(@PathVariable Long alumnoId, @PathVariable Long vinculoId) {
        service.quitar(alumnoId, vinculoId);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 70. `OutboxConfig.java` — Mensajería Kafka

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/messaging/outbox/OutboxConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.alumnos.messaging.outbox;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class OutboxConfig {
}
```

---

## 71. `OutboxRecorder.java` — Mensajería Kafka

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/messaging/outbox/OutboxRecorder.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.messaging.outbox;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import pe.edu.eduspace.alumnos.config.KafkaTopicsProperties;
import pe.edu.eduspace.alumnos.event.DomainEvent;
import tools.jackson.databind.ObjectMapper;

/**
 * Guarda cada evento de dominio en {@code outbox_eventos} dentro de la MISMA transacción del negocio
 * (BEFORE_COMMIT): o se confirman los dos o ninguno. Tras el commit despierta al relay para baja latencia.
 */
@Component
public class OutboxRecorder {

    private final JdbcClient jdbc;
    private final KafkaTopicsProperties topics;
    private final ObjectMapper objectMapper;

    public OutboxRecorder(JdbcClient jdbc, KafkaTopicsProperties topics, ObjectMapper objectMapper) {
        this.jdbc = jdbc;
        this.topics = topics;
        this.objectMapper = objectMapper;
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT, fallbackExecution = true)
    public void registrar(DomainEvent event) {
        jdbc.sql("INSERT INTO outbox_eventos (topico, clave, payload) VALUES (:topico, :clave, :payload)")
                .param("topico", topics.topicFor(event.eventType()))
                .param("clave", event.key())
                .param("payload", objectMapper.writeValueAsString(event))
                .update();
    }
}
```

---

## 72. `OutboxRelay.java` — Mensajería Kafka

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/messaging/outbox/OutboxRelay.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.messaging.outbox;

import java.util.List;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import pe.edu.eduspace.alumnos.event.DomainEvent;

/**
 * Publica a Kafka los eventos pendientes del outbox. Varias instancias pueden correr a la vez:
 * {@code FOR UPDATE SKIP LOCKED} reparte las filas sin duplicar. Ante un fallo corta el lote para
 * conservar el orden por clave y reintenta en el siguiente ciclo.
 */
@Component
public class OutboxRelay {

    private static final Logger log = LoggerFactory.getLogger(OutboxRelay.class);

    private record Fila(long id, String topico, String clave, String payload) {}

    private final JdbcClient jdbc;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final int lote;
    private final long timeoutEnvioMs;
    private final TransactionTemplate tx;

    public OutboxRelay(JdbcClient jdbc, KafkaTemplate<String, String> kafkaTemplate, PlatformTransactionManager txManager,
                       @Value("${app.outbox.lote:100}") int lote,
                       @Value("${app.outbox.timeout-envio-ms:5000}") long timeoutEnvioMs) {
        this.jdbc = jdbc;
        this.kafkaTemplate = kafkaTemplate;
        this.lote = lote;
        this.timeoutEnvioMs = timeoutEnvioMs;
        this.tx = new TransactionTemplate(txManager);
        this.tx.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    }

    /** Disparo inmediato tras confirmar la transacción de negocio (el scheduler cubre lo que falle). */
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, fallbackExecution = true)
    public void alConfirmar(DomainEvent ignorado) {
        publicarPendientes();
    }

    @Scheduled(fixedDelayString = "${app.outbox.intervalo:PT2S}", initialDelayString = "${app.outbox.espera-inicial:PT5S}")
    public void programado() {
        publicarPendientes();
    }

    @Scheduled(cron = "${app.outbox.limpieza-cron:0 15 3 * * *}")
    @Transactional
    public void limpiarEnviados() {
        int n = jdbc.sql("DELETE FROM outbox_eventos WHERE enviado_en IS NOT NULL AND enviado_en < now() - interval '7 days'").update();
        if (n > 0) log.info("component=OutboxRelay status=LIMPIEZA eliminados={}", n);
    }

    public void publicarPendientes() {
        try {
            tx.executeWithoutResult(status -> lotePendiente());
        } catch (RuntimeException ex) {
            log.warn("component=OutboxRelay status=ERROR cause={}", ex.getMessage());
        }
    }

    private void lotePendiente() {
        List<Fila> filas = jdbc.sql("""
                SELECT id, topico, clave, payload FROM outbox_eventos
                WHERE enviado_en IS NULL ORDER BY id LIMIT :lote FOR UPDATE SKIP LOCKED""")
                .param("lote", lote)
                .query((rs, n) -> new Fila(rs.getLong("id"), rs.getString("topico"), rs.getString("clave"), rs.getString("payload")))
                .list();
        for (Fila f : filas) {
            try {
                kafkaTemplate.send(f.topico(), f.clave(), f.payload()).get(timeoutEnvioMs, TimeUnit.MILLISECONDS);
                jdbc.sql("UPDATE outbox_eventos SET enviado_en = now(), ultimo_error = NULL WHERE id = :id")
                        .param("id", f.id()).update();
                log.info("component=OutboxRelay topic={} key={} outboxId={} status=ENVIADO", f.topico(), f.clave(), f.id());
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
                return;
            } catch (Exception ex) {
                String causa = String.valueOf(ex.getMessage());
                jdbc.sql("UPDATE outbox_eventos SET intentos = intentos + 1, ultimo_error = :e WHERE id = :id")
                        .param("e", causa.substring(0, Math.min(causa.length(), 500))).param("id", f.id()).update();
                log.error("component=OutboxRelay topic={} key={} outboxId={} status=ERROR cause={}", f.topico(), f.clave(), f.id(), causa);
                return;
            }
        }
    }
}
```

---

## 73. `AlumnoEstadoCambiadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/event/AlumnoEstadoCambiadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.alumnos.event;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;
import org.slf4j.MDC;

public record AlumnoEstadoCambiadoEvent(UUID eventId, String eventType, Instant occurredAt, int version,
                                        String traceId, Long alumnoId, String estadoAnterior, String estadoNuevo,
                                        String motivo, LocalDateTime fecha) implements DomainEvent {

    public static final String TYPE = "alumno.estado-cambiado";

    public static AlumnoEstadoCambiadoEvent of(Long alumnoId, String estadoAnterior, String estadoNuevo,
                                               String motivo, LocalDateTime fecha) {
        return new AlumnoEstadoCambiadoEvent(UUID.randomUUID(), TYPE, Instant.now(), 1, MDC.get("traceId"),
                alumnoId, estadoAnterior, estadoNuevo, motivo, fecha);
    }

    @Override
    public String key() {
        return String.valueOf(alumnoId);
    }
}
```

---

## 74. `AlumnoRegistradoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/event/AlumnoRegistradoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.alumnos.event;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.slf4j.MDC;

/** Contrato {@code alumno.registrado}. Privacidad de menores: sin DNI, salud ni documentos. */
public record AlumnoRegistradoEvent(UUID eventId, String eventType, Instant occurredAt, int version, String traceId,
                                    Long alumnoId, String codigo, String nombreCompleto, LocalDate fechaNacimiento,
                                    List<Long> apoderadoIds, List<Long> usuarioIds, LocalDateTime fecha)
        implements DomainEvent {

    public static final String TYPE = "alumno.registrado";

    public static AlumnoRegistradoEvent of(Long alumnoId, String codigo, String nombreCompleto,
                                           LocalDate fechaNacimiento, List<Long> apoderadoIds, List<Long> usuarioIds,
                                           LocalDateTime fecha) {
        return new AlumnoRegistradoEvent(UUID.randomUUID(), TYPE, Instant.now(), 1, MDC.get("traceId"), alumnoId,
                codigo, nombreCompleto, fechaNacimiento, apoderadoIds, usuarioIds, fecha);
    }

    @Override
    public String key() {
        return String.valueOf(alumnoId);
    }
}
```

---

## 75. `DomainEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/event/DomainEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.alumnos.event;

/** Evento de dominio publicado a Kafka. El tipo coincide con el nombre del tópico (sobre estándar, adenda A1). */
public interface DomainEvent {
    String eventType();

    /** Clave del mensaje = id de la entidad principal (garantiza orden por entidad). */
    String key();
}
```

---

## 76. `DocumentosProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/DocumentosProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.eduspace.alumnos.config;

import java.time.Duration;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

/** Reglas de subida y descarga de documentos del expediente. */
@ConfigurationProperties(prefix = "app.documentos")
public record DocumentosProperties(Long maxBytes, List<String> tiposPermitidos, Duration vigenciaDescarga) {

    public DocumentosProperties {
        maxBytes = maxBytes == null ? 5L * 1024 * 1024 : maxBytes;
        tiposPermitidos = tiposPermitidos == null || tiposPermitidos.isEmpty()
                ? List.of("application/pdf", "image/jpeg", "image/png") : tiposPermitidos;
        vigenciaDescarga = vigenciaDescarga == null ? Duration.ofMinutes(10) : vigenciaDescarga;
    }
}
```

---

## 77. `ExpedienteProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/ExpedienteProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.eduspace.alumnos.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import pe.edu.eduspace.alumnos.entity.TipoDocumento;

/** Documentos que el expediente debe tener verificados para considerarse completo (configurable). */
@ConfigurationProperties(prefix = "app.expediente")
public record ExpedienteProperties(List<TipoDocumento> requeridos) {

    public ExpedienteProperties {
        requeridos = requeridos == null || requeridos.isEmpty()
                ? List.of(TipoDocumento.PARTIDA_NACIMIENTO, TipoDocumento.DNI, TipoDocumento.FICHA_SIAGIE)
                : requeridos;
    }
}
```

---

## 78. `KafkaProducerConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/KafkaProducerConfig.java`

### **¿Qué hace esta clase?**
Productor/publicador de eventos Apache Kafka. Envía eventos de dominio hacia topics específicos para que otros microservicios los procesen de forma asíncrona.

```java
package pe.edu.eduspace.alumnos.config;

import java.util.Map;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.boot.kafka.autoconfigure.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

/**
 * Productor con clave String y valor JSON ya serializado como texto: el mensaje no lleva cabeceras de
 * tipo, así cada consumidor lo deserializa a su propia copia del contrato.
 */
@Configuration
public class KafkaProducerConfig {

    @Bean
    ProducerFactory<String, String> eventProducerFactory(KafkaProperties kafkaProperties) {
        Map<String, Object> props = kafkaProperties.buildProducerProperties();
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        return new DefaultKafkaProducerFactory<>(props);
    }

    @Bean
    KafkaTemplate<String, String> eventKafkaTemplate(ProducerFactory<String, String> eventProducerFactory) {
        return new KafkaTemplate<>(eventProducerFactory);
    }
}
```

---

## 79. `KafkaTopicsConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/KafkaTopicsConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.alumnos.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

/** Declara los 2 tópicos que produce este servicio (3 particiones, 1 réplica). */
@Configuration
@EnableConfigurationProperties({KafkaTopicsProperties.class, ExpedienteProperties.class, DocumentosProperties.class,
        StorageProperties.class})
public class KafkaTopicsConfig {

    @Bean
    NewTopic alumnoRegistradoTopic(KafkaTopicsProperties props) {
        return TopicBuilder.name(props.alumnoRegistrado()).partitions(3).replicas(1).build();
    }

    @Bean
    NewTopic alumnoEstadoCambiadoTopic(KafkaTopicsProperties props) {
        return TopicBuilder.name(props.alumnoEstadoCambiado()).partitions(3).replicas(1).build();
    }
}
```

---

## 80. `KafkaTopicsProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/KafkaTopicsProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.eduspace.alumnos.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import pe.edu.eduspace.alumnos.event.AlumnoEstadoCambiadoEvent;
import pe.edu.eduspace.alumnos.event.AlumnoRegistradoEvent;

/** Nombres de tópicos desde {@code app.kafka.topic.*}. */
@ConfigurationProperties(prefix = "app.kafka.topic")
public record KafkaTopicsProperties(String alumnoRegistrado, String alumnoEstadoCambiado) {

    public KafkaTopicsProperties {
        alumnoRegistrado = alumnoRegistrado == null ? AlumnoRegistradoEvent.TYPE : alumnoRegistrado;
        alumnoEstadoCambiado = alumnoEstadoCambiado == null ? AlumnoEstadoCambiadoEvent.TYPE : alumnoEstadoCambiado;
    }

    public String topicFor(String eventType) {
        return switch (eventType) {
            case AlumnoRegistradoEvent.TYPE -> alumnoRegistrado;
            case AlumnoEstadoCambiadoEvent.TYPE -> alumnoEstadoCambiado;
            default -> eventType;
        };
    }
}
```

---

## 81. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.alumnos.config;

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
    OpenAPI alumnosOpenApi() {
        return new OpenAPI()
                .info(new Info().title("EduSpace · alumnos-ms").version("v1")
                        .description("Expediente del alumno: datos, apoderados, documentos, ficha de salud e historial de estado"))
                .components(new Components().addSecuritySchemes("bearer",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearer"));
    }
}
```

---

## 82. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.alumnos.config;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
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
 * Resource server (JWT RS256 de auth-ms). El rol grueso se aplica con {@code @PreAuthorize} en cada
 * endpoint; la regla fina ("solo lo propio" para ALUMNO y APODERADO) la aplica {@code AccesoService}.
 * {@code /internal/**} no pasa por el Gateway.
 */
@Configuration
@EnableMethodSecurity
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
                    auth.requestMatchers("/internal/**").permitAll();
                    if (swaggerPublic) {
                        auth.requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll();
                    }
                    // la escritura se decide por URL (antes de leer y validar el cuerpo): quien no es personal recibe 403, no 400
                    for (HttpMethod metodo : List.of(HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH, HttpMethod.DELETE)) {
                        auth.requestMatchers(metodo, "/api/v1/alumnos/**", "/api/v1/apoderados/**").hasAnyRole("ADMIN", "SECRETARIA");
                    }
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

## 83. `StorageProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/config/StorageProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.eduspace.alumnos.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Conexión a MinIO. {@code publicEndpoint} es el host que el navegador puede alcanzar: con él se firman las
 * URL de descarga (no el nombre interno de Docker).
 */
@ConfigurationProperties(prefix = "app.storage")
public record StorageProperties(String endpoint, String publicEndpoint, String accessKey, String secretKey,
                                String bucket, Boolean crearBucketAlArrancar) {

    public StorageProperties {
        endpoint = endpoint == null ? "http://localhost:19000" : endpoint;
        publicEndpoint = publicEndpoint == null ? endpoint : publicEndpoint;
        accessKey = accessKey == null ? "minioadmin" : accessKey;
        secretKey = secretKey == null ? "minioadmin" : secretKey;
        bucket = bucket == null ? "alumnos-documentos" : bucket;
        crearBucketAlArrancar = crearBucketAlArrancar == null || crearBucketAlArrancar;
    }
}
```

---

## 84. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.alumnos.exception;

/** Violación de una regla de negocio: se traduce a HTTP 409. */
public class BusinessRuleException extends RuntimeException {
    public BusinessRuleException(String message) {
        super(message);
    }
}
```

---

## 85. `DatosInvalidosException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/DatosInvalidosException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.alumnos.exception;

/** Datos de entrada que pasan la validación de campos pero son incoherentes: HTTP 400 con el motivo exacto. */
public class DatosInvalidosException extends RuntimeException {
    public DatosInvalidosException(String message) {
        super(message);
    }
}
```

---

## 86. `DuplicateResourceException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/DuplicateResourceException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.alumnos.exception;

/** Recurso ya registrado (por ejemplo, documento de identidad repetido): HTTP 409. */
public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}
```

---

## 87. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.eduspace.alumnos.exception;

import java.time.OffsetDateTime;
import java.util.List;

public record ErrorResponse(String codigo, String mensaje, String ruta, String traceId,
                            OffsetDateTime fecha, List<String> detalles) {
}
```

---

## 88. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.alumnos.exception;

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
import org.springframework.web.multipart.MaxUploadSizeExceededException;

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

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> duplicate(DuplicateResourceException ex, HttpServletRequest req) {
        return build(HttpStatus.CONFLICT, "DUPLICADO", ex.getMessage(), req, List.of());
    }

    @ExceptionHandler(StorageException.class)
    public ResponseEntity<ErrorResponse> storage(StorageException ex, HttpServletRequest req) {
        log.error("component=exception eventType=Storage key={} status=BAD_GATEWAY cause={}", req.getRequestURI(),
                ex.getCause() == null ? ex.getMessage() : ex.getCause().getMessage());
        return build(HttpStatus.BAD_GATEWAY, "ALMACENAMIENTO", "El almacenamiento de archivos no está disponible", req, List.of());
    }

    @ExceptionHandler(DatosInvalidosException.class)
    public ResponseEntity<ErrorResponse> invalidData(DatosInvalidosException ex, HttpServletRequest req) {
        return build(HttpStatus.BAD_REQUEST, "DATOS_INVALIDOS", ex.getMessage(), req, List.of());
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

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> tooBig(MaxUploadSizeExceededException ex, HttpServletRequest req) {
        return build(HttpStatus.PAYLOAD_TOO_LARGE, "ARCHIVO_MUY_GRANDE", "El archivo supera el tamaño máximo permitido", req, List.of());
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

## 89. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.alumnos.exception;

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

## 90. `StorageException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/exception/StorageException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.alumnos.exception;

/** Fallo del almacenamiento de archivos (MinIO/S3): HTTP 502. */
public class StorageException extends RuntimeException {
    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

---

## 91. `AlmacenamientoArchivos.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/storage/AlmacenamientoArchivos.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.storage;

import java.io.InputStream;
import java.time.Duration;

/** Puerto de almacenamiento de archivos del expediente (MinIO/S3). Los errores se reportan como StorageException. */
public interface AlmacenamientoArchivos {

    void guardar(String clave, InputStream contenido, long tamano, String contentType);

    /** URL firmada de descarga con vencimiento corto. */
    String urlDescarga(String clave, Duration vigencia);

    void eliminar(String clave);
}
```

---

## 92. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.eduspace.alumnos.filter;

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

## 93. `CsvAlumnos.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/CsvAlumnos.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.util;

import java.util.ArrayList;
import java.util.List;

/** Lector CSV mínimo (comillas dobles, delimitador {@code ,} o {@code ;} detectado en el encabezado). */
public final class CsvAlumnos {

    private CsvAlumnos() {
    }

    public static char detectarDelimitador(String encabezado) {
        long comas = encabezado.chars().filter(c -> c == ',').count();
        long puntos = encabezado.chars().filter(c -> c == ';').count();
        return puntos > comas ? ';' : ',';
    }

    public static List<String> dividir(String linea, char delimitador) {
        List<String> campos = new ArrayList<>();
        StringBuilder actual = new StringBuilder();
        boolean entreComillas = false;
        for (int i = 0; i < linea.length(); i++) {
            char c = linea.charAt(i);
            if (entreComillas) {
                if (c == '"' && i + 1 < linea.length() && linea.charAt(i + 1) == '"') {
                    actual.append('"');
                    i++;
                } else if (c == '"') {
                    entreComillas = false;
                } else {
                    actual.append(c);
                }
            } else if (c == '"') {
                entreComillas = true;
            } else if (c == delimitador) {
                campos.add(actual.toString().trim());
                actual.setLength(0);
            } else {
                actual.append(c);
            }
        }
        campos.add(actual.toString().trim());
        return campos;
    }
}
```

---

## 94. `DocumentoIdentidad.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/DocumentoIdentidad.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.util;

import java.util.regex.Pattern;
import pe.edu.eduspace.alumnos.exception.DatosInvalidosException;

/** Validación del número de documento según su tipo. */
public final class DocumentoIdentidad {

    private static final Pattern DNI = Pattern.compile("\\d{8}");
    private static final Pattern CE = Pattern.compile("[A-Za-z0-9]{9,12}");
    private static final Pattern PASAPORTE = Pattern.compile("[A-Za-z0-9]{6,12}");

    private DocumentoIdentidad() {
    }

    /** Devuelve el tipo normalizado (DNI por defecto) o lanza {@link DatosInvalidosException}. */
    public static String validar(String tipo, String numero) {
        String t = tipo == null || tipo.isBlank() ? "DNI" : tipo.trim().toUpperCase();
        String n = numero == null ? "" : numero.trim();
        boolean ok = switch (t) {
            case "DNI" -> DNI.matcher(n).matches();
            case "CE" -> CE.matcher(n).matches();
            case "PASAPORTE" -> PASAPORTE.matcher(n).matches();
            default -> throw new DatosInvalidosException("Tipo de documento no válido: " + t + " (use DNI, CE o PASAPORTE)");
        };
        if (!ok) {
            throw new DatosInvalidosException("El número de documento no tiene el formato de un " + t);
        }
        return t;
    }
}
```

---

## 95. `MinioAlmacenamiento.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/storage/MinioAlmacenamiento.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.storage;

import io.minio.BucketExistsArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.http.Method;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.time.Duration;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import pe.edu.eduspace.alumnos.config.StorageProperties;
import pe.edu.eduspace.alumnos.exception.StorageException;

/**
 * Implementación sobre MinIO. Usa dos clientes: el interno (host de Docker) para subir y borrar, y uno con el
 * host público solo para firmar URL de descarga, porque la firma incluye el host y el navegador no resuelve
 * el nombre interno.
 */
@Component
public class MinioAlmacenamiento implements AlmacenamientoArchivos {

    private static final Logger log = LoggerFactory.getLogger(MinioAlmacenamiento.class);
    private static final String REGION = "us-east-1";

    private final StorageProperties props;
    private final MinioClient interno;
    private final MinioClient publico;
    private volatile boolean bucketListo;

    public MinioAlmacenamiento(StorageProperties props) {
        this.props = props;
        this.interno = MinioClient.builder().endpoint(props.endpoint()).credentials(props.accessKey(), props.secretKey())
                .region(REGION).build();
        this.publico = MinioClient.builder().endpoint(props.publicEndpoint()).credentials(props.accessKey(), props.secretKey())
                .region(REGION).build();
    }

    /** Crea el bucket al arrancar; si MinIO aún no responde, se reintenta en la primera subida. */
    @PostConstruct
    void inicializar() {
        if (!props.crearBucketAlArrancar()) {
            return;
        }
        try {
            asegurarBucket();
        } catch (StorageException ex) {
            log.warn("component=MinioAlmacenamiento eventType=BucketInit status=PENDIENTE bucket={} cause={}",
                    props.bucket(), ex.getCause() == null ? ex.getMessage() : ex.getCause().getMessage());
        }
    }

    @Override
    public void guardar(String clave, InputStream contenido, long tamano, String contentType) {
        try {
            asegurarBucket();
            interno.putObject(PutObjectArgs.builder().bucket(props.bucket()).object(clave)
                    .stream(contenido, tamano, -1).contentType(contentType).build());
        } catch (StorageException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new StorageException("No se pudo guardar el archivo " + clave, ex);
        }
    }

    @Override
    public String urlDescarga(String clave, Duration vigencia) {
        try {
            return publico.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder().method(Method.GET)
                    .bucket(props.bucket()).object(clave).expiry((int) vigencia.toSeconds(), TimeUnit.SECONDS).build());
        } catch (Exception ex) {
            throw new StorageException("No se pudo firmar la descarga de " + clave, ex);
        }
    }

    @Override
    public void eliminar(String clave) {
        try {
            interno.removeObject(RemoveObjectArgs.builder().bucket(props.bucket()).object(clave).build());
        } catch (Exception ex) {
            throw new StorageException("No se pudo eliminar el archivo " + clave, ex);
        }
    }

    private void asegurarBucket() {
        if (bucketListo) {
            return;
        }
        try {
            if (!interno.bucketExists(BucketExistsArgs.builder().bucket(props.bucket()).build())) {
                interno.makeBucket(MakeBucketArgs.builder().bucket(props.bucket()).region(REGION).build());
                log.info("component=MinioAlmacenamiento eventType=BucketCreado status=OK bucket={}", props.bucket());
            }
            bucketListo = true;
        } catch (Exception ex) {
            throw new StorageException("No se pudo verificar el bucket " + props.bucket(), ex);
        }
    }
}
```

---

## 96. `Respuestas.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/Respuestas.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.util;

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

## 97. `ServiceTokenFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/filter/ServiceTokenFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.eduspace.alumnos.filter;

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

## 98. `UsuarioActual.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/util/UsuarioActual.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `alumnos-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.alumnos.util;

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

## 99. `AlumnosMsApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/AlumnosMsApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.eduspace.alumnos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AlumnosMsApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlumnosMsApplication.class, args);
    }
}
```

---

## 100. `AlumnoMapper.java` — Mappers

**Ruta del archivo:** `services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos/mapper/AlumnoMapper.java`

### **¿Qué hace esta clase?**
Clase de mapeo (Mapper) que convierte entre entidades JPA y DTOs de solicitud/respuesta.

```java
package pe.edu.eduspace.alumnos.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import pe.edu.eduspace.alumnos.dto.*;
import pe.edu.eduspace.alumnos.entity.*;

/** Conversiones entidad ↔ DTO. La entidad nunca se expone. */
@Mapper
public interface AlumnoMapper {

    // ---- Alumno ----
    @Mapping(target = "nombreCompleto", expression = "java(alumno.nombreCompleto())")
    AlumnoResponse toResponse(Alumno alumno, List<VinculoResponse> apoderados);

    @Mapping(target = "nombreCompleto", expression = "java(alumno.nombreCompleto())")
    AlumnoResumenResponse toResumen(Alumno alumno);

    @Mapping(target = "nombreCompleto", expression = "java(alumno.nombreCompleto())")
    AlumnoBasicoResponse toBasico(Alumno alumno);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "codigo", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    @Mapping(target = "fotoUrl", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    Alumno toEntity(AlumnoCreateRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "codigo", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    @Mapping(target = "fotoUrl", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    void update(AlumnoUpdateRequest request, @MappingTarget Alumno alumno);

    // ---- Apoderado / vínculo ----
    ApoderadoResponse toResponse(Apoderado apoderado);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    Apoderado toEntity(ApoderadoRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    void update(ApoderadoRequest request, @MappingTarget Apoderado apoderado);

    VinculoResponse toResponse(AlumnoApoderado vinculo);

    @Mapping(source = "alumno.id", target = "alumnoId")
    @Mapping(source = "alumno.codigo", target = "codigo")
    @Mapping(target = "nombreCompleto", expression = "java(vinculo.getAlumno().nombreCompleto())")
    @Mapping(source = "alumno.estado", target = "estado")
    HijoResponse toHijo(AlumnoApoderado vinculo);

    @Mapping(source = "apoderado.id", target = "apoderadoId")
    @Mapping(source = "apoderado.usuarioId", target = "usuarioId")
    @Mapping(target = "nombreCompleto", expression = "java(vinculo.getApoderado().nombreCompleto())")
    @Mapping(source = "apoderado.email", target = "email")
    @Mapping(source = "apoderado.telefono", target = "telefono")
    ApoderadoContactoResponse toContacto(AlumnoApoderado vinculo);

    // ---- Documentos / salud / historial ----
    @Mapping(source = "alumno.id", target = "alumnoId")
    DocumentoResponse toResponse(AlumnoDocumento documento);

    SaludResponse toResponse(AlumnoSalud salud);

    @Mapping(target = "alumnoId", ignore = true)
    @Mapping(target = "alumno", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    void update(SaludRequest request, @MappingTarget AlumnoSalud salud);

    HistorialResponse toResponse(AlumnoEstadoHistorial historial);
}
```

---

