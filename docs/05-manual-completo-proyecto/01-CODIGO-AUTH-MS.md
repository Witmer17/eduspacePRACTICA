# 📘 CÓDIGO COMPLETO — `auth-ms`

> **Microservicio:** `auth-ms`  
> **Puerto:** `8090`  
> **Base de datos:** `eduspace_auth`  
> **Propósito:** Autenticación y autorización de usuarios. Gestiona el login con credenciales propias (usuario/contraseña), genera tokens JWT internos, administra roles (ADMIN, DOCENTE, CAJERO, ALUMNO, APODERADO), permite el cambio de contraseña y la creación de usuarios.  
> **Total de clases incluidas:** 29 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `RefreshToken.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/entity/RefreshToken.java`
- 2. `Rol.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/entity/Rol.java`
- 3. `Usuario.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/entity/Usuario.java`

### Repositorios Spring Data JPA

- 4. `RefreshTokenRepository.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/repository/RefreshTokenRepository.java`
- 5. `RolRepository.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/repository/RolRepository.java`
- 6. `UsuarioRepository.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/repository/UsuarioRepository.java`

### DTOs (Data Transfer Objects)

- 7. `Dtos.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/dto/Dtos.java`

### Servicios y Lógica de Negocio

- 8. `AuthService.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/AuthService.java`
- 9. `JwtService.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/JwtService.java`
- 10. `KeycloakAdminClient.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/KeycloakAdminClient.java`
- 11. `RefreshTokenService.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/RefreshTokenService.java`
- 12. `UsuarioService.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/UsuarioService.java`

### Controladores REST API

- 13. `AuthController.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/AuthController.java`
- 14. `InternalCuentaController.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/InternalCuentaController.java`
- 15. `JwksController.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/JwksController.java`
- 16. `UsuarioController.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/UsuarioController.java`

### Configuración Spring Boot

- 17. `AuthProperties.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/AuthProperties.java`
- 18. `JwtKeyConfig.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/JwtKeyConfig.java`
- 19. `OpenApiConfig.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/OpenApiConfig.java`
- 20. `SecurityConfig.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/SecurityConfig.java`

### Manejo de Excepciones

- 21. `BusinessRuleException.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/BusinessRuleException.java`
- 22. `CredencialesInvalidasException.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/CredencialesInvalidasException.java`
- 23. `ErrorResponse.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/ErrorResponse.java`
- 24. `GlobalExceptionHandler.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/GlobalExceptionHandler.java`
- 25. `ResourceNotFoundException.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/ResourceNotFoundException.java`
- 26. `UsuarioBloqueadoException.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/UsuarioBloqueadoException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 27. `CorrelationIdFilter.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/filter/CorrelationIdFilter.java`
- 28. `ServiceTokenFilter.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/filter/ServiceTokenFilter.java`

### Clase Principal de Arranque

- 29. `AuthApplication.java` — `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/AuthApplication.java`

---

## 1. `RefreshToken.java` — Entidades JPA

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/entity/RefreshToken.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `auth-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "token_hash", nullable = false, length = 100, unique = true)
    private String tokenHash;

    @Column(name = "expira_en", nullable = false)
    private LocalDateTime expiraEn;

    @Builder.Default
    @Column(nullable = false)
    private Boolean revocado = false;

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
}
```

---

## 2. `Rol.java` — Entidades JPA

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/entity/Rol.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `auth-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.auth.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30, unique = true)
    private String nombre;

    @Column(length = 150)
    private String descripcion;
}
```

---

## 3. `Usuario.java` — Entidades JPA

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/entity/Usuario.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `auth-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.upeu.eduspace.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80, unique = true)
    private String username;

    @Column(nullable = false, length = 150, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;

    @Column(nullable = false, length = 100)
    private String nombres;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;

    @Builder.Default
    @Column(name = "intentos_fallidos", nullable = false)
    private Short intentosFallidos = 0;

    @Column(name = "bloqueado_hasta")
    private LocalDateTime bloqueadoHasta;

    @Builder.Default
    @Column(name = "debe_cambiar_clave", nullable = false)
    private Boolean debeCambiarClave = false;

    @Column(name = "ultimo_login")
    private LocalDateTime ultimoLogin;

    @Builder.Default
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Builder.Default
    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_roles", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "rol_id"))
    private Set<Rol> roles = new HashSet<>();

    public boolean estaBloqueado() {
        return bloqueadoHasta != null && bloqueadoHasta.isAfter(LocalDateTime.now());
    }

    public boolean esAdmin() {
        return roles.stream().anyMatch(r -> "ADMIN".equals(r.getNombre()));
    }
}
```

---

## 4. `RefreshTokenRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/repository/RefreshTokenRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `RefreshToken`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.auth.entity.RefreshToken;

import java.time.LocalDateTime;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    @Modifying
    @Query("UPDATE RefreshToken t SET t.revocado = true WHERE t.usuarioId = :usuarioId AND t.revocado = false")
    int revocarTodos(@Param("usuarioId") Long usuarioId);

    @Modifying
    @Query("DELETE FROM RefreshToken t WHERE t.expiraEn < :limite")
    int borrarVencidos(@Param("limite") LocalDateTime limite);
}
```

---

## 5. `RolRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/repository/RolRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Rol`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.eduspace.auth.entity.Rol;

import java.util.Collection;
import java.util.List;

public interface RolRepository extends JpaRepository<Rol, Long> {

    List<Rol> findByNombreIn(Collection<String> nombres);
}
```

---

## 6. `UsuarioRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/repository/UsuarioRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Usuario`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.upeu.eduspace.auth.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.upeu.eduspace.auth.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.username) = LOWER(:id) OR LOWER(u.email) = LOWER(:id)")
    Optional<Usuario> findByUsernameOrEmail(@Param("id") String identificador);

    boolean existsByUsernameIgnoreCase(String username);

    boolean existsByEmailIgnoreCase(String email);

    /** {@code texto} nunca es nulo (vacío = sin filtro): PostgreSQL no infiere el tipo de un parámetro nulo en LIKE. */
    @Query("""
        SELECT DISTINCT u FROM Usuario u LEFT JOIN u.roles r
        WHERE (:rol = '' OR r.nombre = :rol)
          AND (:activo IS NULL OR u.activo = :activo)
          AND (:texto = '' OR LOWER(u.username) LIKE LOWER(CONCAT('%', :texto, '%'))
               OR LOWER(u.email) LIKE LOWER(CONCAT('%', :texto, '%'))
               OR LOWER(CONCAT(u.nombres, ' ', u.apellidos)) LIKE LOWER(CONCAT('%', :texto, '%')))
        """)
    Page<Usuario> buscar(@Param("texto") String texto, @Param("rol") String rol, @Param("activo") Boolean activo, Pageable pageable);

    @Query("SELECT COUNT(DISTINCT u) FROM Usuario u JOIN u.roles r WHERE r.nombre = 'ADMIN' AND u.activo = true")
    long contarAdminsActivos();
}
```

---

## 7. `Dtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/dto/Dtos.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `Dtos`.

```java
package pe.edu.upeu.eduspace.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public final class Dtos {

    private Dtos() {}

    public record LoginRequest(@NotBlank(message = "El usuario es obligatorio") String username,
                               @NotBlank(message = "La clave es obligatoria") String password) {}

    public record RefreshRequest(@JsonProperty("refresh_token") @NotBlank(message = "refresh_token es obligatorio") String refreshToken) {}

    public record TokenResponse(@JsonProperty("access_token") String accessToken,
                                @JsonProperty("refresh_token") String refreshToken,
                                @JsonProperty("token_type") String tokenType,
                                @JsonProperty("expires_in") long expiresIn,
                                @JsonProperty("debe_cambiar_clave") boolean debeCambiarClave) {}

    public record CambiarClaveRequest(@NotBlank String claveActual, @NotBlank String claveNueva) {}

    public record EstadoClaveResponse(boolean debeCambiarClave) {}

    public record UsuarioCreateRequest(
        @NotBlank @Size(min = 3, max = 80) @Pattern(regexp = "[A-Za-z0-9._-]+", message = "username solo admite letras, números, punto, guion y guion bajo") String username,
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 100) String apellidos,
        @NotEmpty(message = "Indique al menos un rol") Set<String> roles,
        @Size(max = 72) String clave) {}

    public record UsuarioUpdateRequest(
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 100) String apellidos) {}

    /** Cuenta de una persona del colegio: usuario = nombre.apellido y clave inicial = su documento (debe cambiarla al entrar). */
    public record CuentaPersonaRequest(
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 100) String apellidos,
        @NotBlank @Size(min = 6, max = 20) @Pattern(regexp = "[A-Za-z0-9]+", message = "El documento solo admite letras y números") String documento,
        @NotBlank String rol,
        @Email @Size(max = 150) String email) {}

    public record RestablecerPorDocumentoRequest(
        @NotBlank @Size(min = 6, max = 20) @Pattern(regexp = "[A-Za-z0-9]+", message = "El documento solo admite letras y números") String documento) {}

    public record RolesRequest(@NotEmpty(message = "Indique al menos un rol") Set<String> roles) {}

    public record UsuarioResponse(Long id, String username, String email, String nombres, String apellidos, boolean activo,
                                  boolean bloqueado, boolean debeCambiarClave, List<String> roles, LocalDateTime ultimoLogin,
                                  LocalDateTime creadoEn) {}

    /** La clave temporal se entrega una sola vez, en la respuesta de creación / restablecimiento. */
    public record UsuarioConClaveTemporal(UsuarioResponse usuario, String claveTemporal) {}

    public record PageResponse<T>(List<T> contenido, int pagina, int tamano, long totalElementos, int totalPaginas) {}
}
```

---

## 8. `AuthService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/AuthService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Auth`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.auth.config.AuthProperties;
import pe.edu.upeu.eduspace.auth.dto.Dtos.TokenResponse;
import pe.edu.upeu.eduspace.auth.entity.Usuario;
import pe.edu.upeu.eduspace.auth.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.auth.exception.CredencialesInvalidasException;
import pe.edu.upeu.eduspace.auth.exception.UsuarioBloqueadoException;
import pe.edu.upeu.eduspace.auth.repository.UsuarioRepository;

import java.time.Duration;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    static final String MENSAJE_CREDENCIALES = "Usuario o clave incorrectos.";
    /** Hash de relleno para que "usuario inexistente" tarde lo mismo que "clave errónea". */
    private static final String HASH_RELLENO = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode("relleno-no-valido");

    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final RefreshTokenService refresh;
    private final AuthProperties props;
    private final KeycloakAdminClient keycloak;

    /** Los intentos fallidos se persisten aunque se lance la excepción. */
    @Transactional(noRollbackFor = {CredencialesInvalidasException.class, UsuarioBloqueadoException.class})
    public TokenResponse login(String identificador, String clave) {
        Usuario u = usuarios.findByUsernameOrEmail(identificador.trim()).orElse(null);
        if (u == null) {
            encoder.matches(clave, HASH_RELLENO);
            throw new CredencialesInvalidasException(MENSAJE_CREDENCIALES);
        }
        if (u.estaBloqueado()) {
            long min = Math.max(1, Duration.between(LocalDateTime.now(), u.getBloqueadoHasta()).toMinutes() + 1);
            throw new UsuarioBloqueadoException("Usuario bloqueado por intentos fallidos. Intente de nuevo en " + min + " minuto(s).");
        }
        if (!encoder.matches(clave, u.getPasswordHash()) || !Boolean.TRUE.equals(u.getActivo())) {
            registrarFallo(u);
            throw new CredencialesInvalidasException(MENSAJE_CREDENCIALES);
        }
        u.setIntentosFallidos((short) 0);
        u.setBloqueadoHasta(null);
        u.setUltimoLogin(LocalDateTime.now());
        usuarios.save(u);
        return emitir(u);
    }

    /** Sin rollback ante credenciales inválidas: la revocación de sesiones por reutilización debe persistir. */
    @Transactional(noRollbackFor = CredencialesInvalidasException.class)
    public TokenResponse refrescar(String refreshToken) {
        Long usuarioId = refresh.consumir(refreshToken).orElseThrow(() -> new CredencialesInvalidasException("Sesión inválida o vencida."));
        Usuario u = usuarios.findById(usuarioId).filter(x -> Boolean.TRUE.equals(x.getActivo()) && !x.estaBloqueado())
            .orElseThrow(() -> new CredencialesInvalidasException("Sesión inválida o vencida."));
        return emitir(u);
    }

    @Transactional
    public void logout(String refreshToken) {
        refresh.revocar(refreshToken);
    }

    @Transactional
    public void cambiarClave(Long usuarioId, String actual, String nueva) {
        Usuario u = usuarios.findById(usuarioId).orElseThrow(() -> new CredencialesInvalidasException("Sesión inválida."));
        // Con Keycloak la clave vigente es la de Keycloak (el hash local puede estar desfasado): se comprueba allí.
        boolean actualCorrecta = keycloak.habilitado() ? keycloak.verificarClave(u.getUsername(), actual) : encoder.matches(actual, u.getPasswordHash());
        if (!actualCorrecta) {
            throw new BusinessRuleException("La clave actual es incorrecta.");
        }
        validarClave(nueva);
        if (actual.equals(nueva)) {
            throw new BusinessRuleException("La clave nueva debe ser distinta de la actual.");
        }
        u.setPasswordHash(encoder.encode(nueva));
        u.setDebeCambiarClave(false);
        u.setActualizadoEn(LocalDateTime.now());
        usuarios.save(u);
        refresh.revocarTodos(usuarioId);        // cierra las demás sesiones
        keycloak.restablecerClave(u, nueva);    // clave definitiva (no temporal) en Keycloak y cierre de sus sesiones
    }

    /** Indica si la persona debe cambiar su clave antes de usar el sistema (clave temporal o inicial). */
    @Transactional(readOnly = true)
    public boolean debeCambiarClave(Long usuarioId) {
        return usuarios.findById(usuarioId).map(u -> Boolean.TRUE.equals(u.getDebeCambiarClave())).orElse(false);
    }

    void validarClave(String clave) {
        if (clave == null || clave.length() < props.getClaveMinima()) {
            throw new BusinessRuleException("La clave debe tener al menos " + props.getClaveMinima() + " caracteres.");
        }
        if (clave.length() > 72) throw new BusinessRuleException("La clave no puede superar 72 caracteres.");
        if (clave.chars().noneMatch(Character::isLetter) || clave.chars().noneMatch(Character::isDigit)) {
            throw new BusinessRuleException("La clave debe combinar letras y números.");
        }
    }

    private void registrarFallo(Usuario u) {
        int n = u.getIntentosFallidos() + 1;
        u.setIntentosFallidos((short) n);
        if (n >= props.getMaxIntentosFallidos()) {
            u.setBloqueadoHasta(LocalDateTime.now().plusMinutes(props.getBloqueoMinutos()));
            u.setIntentosFallidos((short) 0);
            log.warn("Usuario {} bloqueado {} min tras {} intentos fallidos", u.getUsername(), props.getBloqueoMinutos(), n);
        }
        usuarios.save(u);
    }

    private TokenResponse emitir(Usuario u) {
        return new TokenResponse(jwt.emitir(u), refresh.crear(u.getId()), "Bearer", jwt.vigencia().toSeconds(),
            Boolean.TRUE.equals(u.getDebeCambiarClave()));
    }
}
```

---

## 9. `JwtService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/JwtService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Jwt`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import pe.edu.upeu.eduspace.auth.config.AuthProperties;
import pe.edu.upeu.eduspace.auth.entity.Rol;
import pe.edu.upeu.eduspace.auth.entity.Usuario;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Emite el access token RS256 con el contrato que esperan todos los servicios:
 * sub, iss, iat, exp, preferred_username, email, usuarioId y realm_access.roles (sin prefijo ROLE_).
 */
@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtEncoder encoder;
    private final AuthProperties props;
    /** La clave que firma: su kid es el que debe ir en la cabecera (en DEV cambia en cada arranque). */
    private final com.nimbusds.jose.jwk.RSAKey claveActual;

    public String emitir(Usuario u) {
        Instant ahora = Instant.now();
        List<String> roles = u.getRoles().stream().map(Rol::getNombre).sorted().toList();
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer(props.getIssuer())
            .subject(String.valueOf(u.getId()))
            .issuedAt(ahora)
            .expiresAt(ahora.plus(vigencia()))
            .claim("preferred_username", u.getUsername())
            .claim("email", u.getEmail())
            .claim("usuarioId", u.getId())
            .claim("realm_access", Map.of("roles", roles))
            .build();
        JwsHeader header = JwsHeader.with(SignatureAlgorithm.RS256).keyId(claveActual.getKeyID()).build();
        return encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }

    public Duration vigencia() {
        return Duration.ofMinutes(props.getAccessTokenMinutos());
    }
}
```

---

## 10. `KeycloakAdminClient.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/KeycloakAdminClient.java`

### **¿Qué hace esta clase?**
Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka.

```java
package pe.edu.upeu.eduspace.auth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import pe.edu.upeu.eduspace.auth.config.AuthProperties;
import pe.edu.upeu.eduspace.auth.entity.Rol;
import pe.edu.upeu.eduspace.auth.entity.Usuario;
import pe.edu.upeu.eduspace.auth.exception.BusinessRuleException;

import java.net.URI;
import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Cliente de la Admin REST API de Keycloak. auth-ms sigue guardando la fila local (id numérico, que otros servicios usan como
 * {@code usuario_id}) y este cliente la refleja en Keycloak, enlazándolas con el atributo {@code usuarioId} que el realm ya
 * publica en el token. Con {@code app.auth.keycloak-admin.enabled=false} no hace nada.
 */
@Slf4j
@Component
public class KeycloakAdminClient {

    private static final ParameterizedTypeReference<Map<String, Object>> MAPA = new ParameterizedTypeReference<>() {};
    private static final ParameterizedTypeReference<List<Map<String, Object>>> LISTA = new ParameterizedTypeReference<>() {};

    private final AuthProperties.KeycloakAdmin cfg;
    private final RestClient token;
    private final RestClient admin;

    private volatile String accessToken;
    private volatile Instant vence = Instant.EPOCH;

    public KeycloakAdminClient(AuthProperties props) {
        this.cfg = props.getKeycloakAdmin();
        var fabrica = new SimpleClientHttpRequestFactory();
        fabrica.setConnectTimeout(Duration.ofSeconds(5));
        fabrica.setReadTimeout(Duration.ofSeconds(10));
        String base = cfg.getBaseUrl().replaceAll("/+$", "");
        this.token = RestClient.builder().requestFactory(fabrica)
            .baseUrl(base + "/realms/" + cfg.getRealm() + "/protocol/openid-connect/token").build();
        this.admin = RestClient.builder().requestFactory(fabrica)
            .baseUrl(base + "/admin/realms/" + cfg.getRealm())
            .requestInterceptor((req, body, ejecucion) -> {
                req.getHeaders().setBearerAuth(tokenVigente());
                return ejecucion.execute(req, body);
            }).build();
    }

    public boolean habilitado() {
        return cfg.isEnabled();
    }

    /**
     * Crea o actualiza al usuario en Keycloak (datos, estado activo, atributo usuarioId y roles).
     * Con {@code clave} no nula fija además esa contraseña.
     */
    public void sincronizar(Usuario u, String clave) {
        if (!habilitado()) return;
        ejecutar("sincronizar a " + u.getUsername(), () -> {
            String id = asegurarUsuario(u);
            reemplazarRoles(id, u.getRoles().stream().map(Rol::getNombre).toList());
            if (clave != null) fijarClave(id, clave, u);
        });
    }

    /** Fija una clave nueva (temporal si el usuario debe cambiarla) y cierra sus sesiones abiertas. */
    public void restablecerClave(Usuario u, String clave) {
        if (!habilitado()) return;
        ejecutar("restablecer la clave de " + u.getUsername(), () -> {
            String id = asegurarUsuario(u);
            fijarClave(id, clave, u);
            cerrarSesionesPorId(id);
        });
    }

    /** Comprueba la clave actual de un usuario pidiéndole un token a Keycloak (cuenta como intento ante la protección de fuerza bruta). */
    public boolean verificarClave(String username, String clave) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("client_id", cfg.getClientIdFormulario());
        form.add("username", username);
        form.add("password", clave);
        try {
            token.post().contentType(MediaType.APPLICATION_FORM_URLENCODED).body(form).retrieve().toBodilessEntity();
            return true;
        } catch (HttpClientErrorException e) {
            return false;       // 400/401: clave incorrecta, cuenta bloqueada o desactivada
        } catch (RestClientException e) {
            log.error("No se pudo verificar la clave en Keycloak: {}", e.getMessage());
            throw new BusinessRuleException("No se pudo comprobar la clave con Keycloak. Intenta de nuevo.");
        }
    }

    /** Quita el bloqueo por intentos fallidos de Keycloak (protección contra fuerza bruta). */
    public void desbloquear(Usuario u) {
        if (!habilitado()) return;
        ejecutar("desbloquear a " + u.getUsername(), () -> {
            String id = idPorUsername(u.getUsername());
            if (id != null) admin.delete().uri("/attack-detection/brute-force/users/{id}", id).retrieve().toBodilessEntity();
        });
    }

    /** Cierra las sesiones abiertas (el token vigente seguiría con los roles viejos o activo hasta vencer). */
    public void cerrarSesiones(Usuario u) {
        if (!habilitado()) return;
        ejecutar("cerrar sesiones de " + u.getUsername(), () -> {
            String id = idPorUsername(u.getUsername());
            if (id != null) cerrarSesionesPorId(id);
        });
    }

    // --- internos ---

    private String asegurarUsuario(Usuario u) {
        Map<String, Object> cuerpo = Map.of(
            "username", nombreKc(u),
            "email", u.getEmail(),
            "firstName", u.getNombres(),
            "lastName", u.getApellidos(),
            "enabled", Boolean.TRUE.equals(u.getActivo()),
            "emailVerified", true,
            "attributes", Map.of("usuarioId", List.of(String.valueOf(u.getId()))));
        String id = idPorUsername(u.getUsername());
        if (id == null) {
            URI ubicacion = admin.post().uri("/users").contentType(MediaType.APPLICATION_JSON).body(cuerpo)
                .retrieve().toBodilessEntity().getHeaders().getLocation();
            if (ubicacion == null) throw new BusinessRuleException("Keycloak creó el usuario pero no devolvió su id.");
            String ruta = ubicacion.getPath();
            return ruta.substring(ruta.lastIndexOf('/') + 1);
        }
        admin.put().uri("/users/{id}", id).contentType(MediaType.APPLICATION_JSON).body(cuerpo).retrieve().toBodilessEntity();
        return id;
    }

    private String idPorUsername(String username) {
        List<Map<String, Object>> r = admin.get()
            .uri(b -> b.path("/users").queryParam("username", username.toLowerCase()).queryParam("exact", true).build())
            .retrieve().body(LISTA);
        return r == null || r.isEmpty() ? null : String.valueOf(r.get(0).get("id"));
    }

    /**
     * Deja al usuario con exactamente los roles pedidos. Solo toca los roles de EduSpace (nombre en MAYÚSCULAS);
     * respeta los propios de Keycloak (default-roles-*, offline_access, uma_authorization).
     */
    private void reemplazarRoles(String id, List<String> deseados) {
        List<Map<String, Object>> actuales = admin.get().uri("/users/{id}/role-mappings/realm", id).retrieve().body(LISTA);
        Set<String> nombresActuales = new HashSet<>();
        List<Map<String, Object>> quitar = new java.util.ArrayList<>();
        if (actuales != null) {
            for (Map<String, Object> r : actuales) {
                String n = String.valueOf(r.get("name"));
                nombresActuales.add(n);
                if (n.equals(n.toUpperCase()) && !deseados.contains(n)) quitar.add(r);
            }
        }
        List<Map<String, Object>> agregar = new java.util.ArrayList<>();
        for (String n : deseados) {
            if (nombresActuales.contains(n)) continue;
            try {
                Map<String, Object> rol = admin.get().uri("/roles/{n}", n).retrieve().body(MAPA);
                agregar.add(Map.of("id", String.valueOf(rol.get("id")), "name", n));
            } catch (HttpClientErrorException.NotFound e) {
                throw new BusinessRuleException("El rol '" + n + "' no existe en Keycloak (realm " + cfg.getRealm() + ").");
            }
        }
        if (!quitar.isEmpty()) {
            admin.method(HttpMethod.DELETE).uri("/users/{id}/role-mappings/realm", id).contentType(MediaType.APPLICATION_JSON).body(quitar)
                .retrieve().toBodilessEntity();
        }
        if (!agregar.isEmpty()) {
            admin.post().uri("/users/{id}/role-mappings/realm", id).contentType(MediaType.APPLICATION_JSON).body(agregar)
                .retrieve().toBodilessEntity();
        }
    }

    private void fijarClave(String id, String clave, Usuario u) {
        boolean temporal = cfg.isExigirCambioClave() && Boolean.TRUE.equals(u.getDebeCambiarClave());
        admin.put().uri("/users/{id}/reset-password", id).contentType(MediaType.APPLICATION_JSON)
            .body(Map.of("type", "password", "value", clave, "temporary", temporal)).retrieve().toBodilessEntity();
    }

    private void cerrarSesionesPorId(String id) {
        admin.post().uri("/users/{id}/logout", id).retrieve().toBodilessEntity();
    }

    private static String nombreKc(Usuario u) {
        return u.getUsername().toLowerCase();
    }

    private String tokenVigente() {
        if (accessToken == null || Instant.now().isAfter(vence)) {
            synchronized (this) {
                if (accessToken == null || Instant.now().isAfter(vence)) {
                    MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
                    form.add("grant_type", "client_credentials");
                    form.add("client_id", cfg.getClientId());
                    form.add("client_secret", cfg.getClientSecret());
                    Map<String, Object> r = token.post().contentType(MediaType.APPLICATION_FORM_URLENCODED).body(form).retrieve().body(MAPA);
                    if (r == null || r.get("access_token") == null) throw new BusinessRuleException("Keycloak no entregó el token de administración.");
                    long segundos = ((Number) r.getOrDefault("expires_in", 60)).longValue();
                    accessToken = String.valueOf(r.get("access_token"));
                    vence = Instant.now().plusSeconds(Math.max(5, segundos - 20));
                }
            }
        }
        return accessToken;
    }

    private void ejecutar(String accion, Runnable tarea) {
        try {
            tarea.run();
        } catch (BusinessRuleException e) {
            throw e;
        } catch (HttpClientErrorException e) {
            log.warn("Keycloak rechazó '{}': {} {}", accion, e.getStatusCode(), e.getResponseBodyAsString());
            accessToken = null;     // por si el rechazo fue de un token caducado
            throw new BusinessRuleException("Keycloak rechazó la operación (" + e.getStatusCode().value() + "): " + resumen(e.getResponseBodyAsString()));
        } catch (RestClientException e) {
            log.error("No se pudo {} en Keycloak: {}", accion, e.getMessage());
            throw new BusinessRuleException("No se pudo sincronizar con Keycloak. Intenta de nuevo; si persiste, revisa que esté activo y que el cliente de administración esté configurado.");
        }
    }

    private static String resumen(String cuerpo) {
        if (cuerpo == null || cuerpo.isBlank()) return "sin detalle";
        return cuerpo.length() > 200 ? cuerpo.substring(0, 200) : cuerpo;
    }
}
```

---

## 11. `RefreshTokenService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/RefreshTokenService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `RefreshToken`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.auth.config.AuthProperties;
import pe.edu.upeu.eduspace.auth.entity.RefreshToken;
import pe.edu.upeu.eduspace.auth.repository.RefreshTokenRepository;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Optional;

/** El token se entrega una sola vez; en la base solo vive su SHA-256. Se rota en cada uso. */
@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final RefreshTokenRepository repo;
    private final AuthProperties props;

    @Transactional
    public String crear(Long usuarioId) {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        repo.save(RefreshToken.builder().usuarioId(usuarioId).tokenHash(hash(token))
            .expiraEn(LocalDateTime.now().plusDays(props.getRefreshTokenDias())).build());
        return token;
    }

    /**
     * Consume el token: si es válido lo revoca y devuelve el usuario dueño. Si se presenta uno ya revocado
     * (posible robo) se revocan TODAS las sesiones del usuario.
     */
    @Transactional(noRollbackFor = pe.edu.upeu.eduspace.auth.exception.CredencialesInvalidasException.class)
    public Optional<Long> consumir(String token) {
        Optional<RefreshToken> opt = repo.findByTokenHash(hash(token));
        if (opt.isEmpty()) return Optional.empty();
        RefreshToken t = opt.get();
        if (Boolean.TRUE.equals(t.getRevocado())) {
            log.warn("Refresh token revocado reutilizado (usuario {}): se cierran todas sus sesiones", t.getUsuarioId());
            repo.revocarTodos(t.getUsuarioId());
            return Optional.empty();
        }
        if (t.getExpiraEn().isBefore(LocalDateTime.now())) return Optional.empty();
        t.setRevocado(true);
        repo.save(t);
        return Optional.of(t.getUsuarioId());
    }

    @Transactional
    public void revocar(String token) {
        repo.findByTokenHash(hash(token)).ifPresent(t -> {
            t.setRevocado(true);
            repo.save(t);
        });
    }

    @Transactional
    public void revocarTodos(Long usuarioId) {
        repo.revocarTodos(usuarioId);
    }

    @Scheduled(cron = "0 0 3 * * *", zone = "America/Lima")
    @Transactional
    public void limpiarVencidos() {
        int n = repo.borrarVencidos(LocalDateTime.now().minusDays(1));
        if (n > 0) log.info("{} refresh token(s) vencidos eliminados", n);
    }

    static String hash(String token) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
}
```

---

## 12. `UsuarioService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/service/UsuarioService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Usuario`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.upeu.eduspace.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.eduspace.auth.dto.Dtos.*;
import pe.edu.upeu.eduspace.auth.entity.Rol;
import pe.edu.upeu.eduspace.auth.entity.Usuario;
import pe.edu.upeu.eduspace.auth.exception.BusinessRuleException;
import pe.edu.upeu.eduspace.auth.exception.ResourceNotFoundException;
import pe.edu.upeu.eduspace.auth.repository.RolRepository;
import pe.edu.upeu.eduspace.auth.repository.UsuarioRepository;

import java.security.SecureRandom;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Administración de usuarios (solo ADMIN). No hay borrado físico: otros servicios guardan {@code usuario_id}, así que
 * "eliminar" desactiva. Nunca se deja al sistema sin un ADMIN activo.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioService {

    private static final String ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UsuarioRepository usuarios;
    private final RolRepository roles;
    private final PasswordEncoder encoder;
    private final RefreshTokenService refresh;
    private final AuthService authService;
    /** Refleja cada cambio en Keycloak (si está habilitado). Si Keycloak falla, la excepción deshace también el cambio local. */
    private final KeycloakAdminClient keycloak;

    @Transactional(readOnly = true)
    public PageResponse<UsuarioResponse> listar(String texto, String rol, Boolean activo, Pageable pageable) {
        var page = usuarios.buscar(texto == null ? "" : texto.trim(), rol == null ? "" : rol.trim().toUpperCase(), activo, pageable);
        return new PageResponse<>(page.getContent().stream().map(UsuarioService::toResponse).toList(),
            page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtener(Long id) {
        return toResponse(buscar(id));
    }

    /** Sin {@code clave}: se genera una temporal y el usuario debe cambiarla en su primer ingreso. */
    @Transactional
    public UsuarioConClaveTemporal crear(UsuarioCreateRequest req) {
        if (usuarios.existsByUsernameIgnoreCase(req.username())) throw new BusinessRuleException("El usuario '" + req.username() + "' ya existe.");
        if (usuarios.existsByEmailIgnoreCase(req.email())) throw new BusinessRuleException("El correo '" + req.email() + "' ya está registrado.");
        boolean temporal = req.clave() == null || req.clave().isBlank();
        String clave = temporal ? generarClave() : req.clave();
        if (!temporal) authService.validarClave(clave);
        Usuario u = usuarios.save(Usuario.builder().username(req.username().trim()).email(req.email().trim())
            .nombres(req.nombres().trim()).apellidos(req.apellidos().trim()).passwordHash(encoder.encode(clave))
            .debeCambiarClave(temporal).roles(resolverRoles(req.roles())).build());
        keycloak.sincronizar(u, clave);
        return new UsuarioConClaveTemporal(toResponse(u), temporal ? clave : null);
    }

    /**
     * Cuenta para una persona del colegio (alumno, docente, apoderado, caja…): usuario {@code nombre.apellido} (con número si ya existe)
     * y clave inicial igual a su documento; queda obligada a cambiarla en el primer ingreso. Nunca crea cuentas de ADMIN.
     */
    @Transactional
    public UsuarioConClaveTemporal crearCuentaPersona(CuentaPersonaRequest req) {
        String rol = req.rol().trim().toUpperCase().replace("ROLE_", "");
        if ("ADMIN".equals(rol)) throw new BusinessRuleException("Las cuentas de administración no se crean desde aquí.");
        String username = usernameLibre(req.nombres(), req.apellidos());
        String email = req.email() == null || req.email().isBlank() ? username + "@cuentas.eduspace.pe" : req.email().trim();
        if (usuarios.existsByEmailIgnoreCase(email)) email = username + "@cuentas.eduspace.pe";
        Usuario u = usuarios.save(Usuario.builder().username(username).email(email).nombres(req.nombres().trim())
            .apellidos(req.apellidos().trim()).passwordHash(encoder.encode(req.documento().trim()))
            .debeCambiarClave(true).roles(resolverRoles(Set.of(rol))).build());
        keycloak.sincronizar(u, req.documento().trim());
        log.info("Cuenta creada: usuario={} rol={}", username, rol);
        return new UsuarioConClaveTemporal(toResponse(u), null);
    }

    /** Restaura la cuenta: la clave vuelve a ser el documento y debe cambiarse al entrar. No aplica a ADMIN. */
    @Transactional
    public UsuarioResponse restablecerPorDocumento(Long id, RestablecerPorDocumentoRequest req) {
        Usuario u = buscar(id);
        if (u.esAdmin()) throw new BusinessRuleException("Las cuentas de administración no se restauran desde aquí.");
        u.setPasswordHash(encoder.encode(req.documento().trim()));
        u.setDebeCambiarClave(true);
        u.setBloqueadoHasta(null);
        u.setIntentosFallidos((short) 0);
        u.setActivo(true);
        u.setActualizadoEn(LocalDateTime.now());
        usuarios.save(u);
        refresh.revocarTodos(id);
        keycloak.sincronizar(u, null);
        keycloak.desbloquear(u);
        keycloak.restablecerClave(u, req.documento().trim());
        return toResponse(u);
    }

    private String usernameLibre(String nombres, String apellidos) {
        String base = baseUsername(nombres, apellidos);
        String candidato = base;
        for (int n = 2; usuarios.existsByUsernameIgnoreCase(candidato); n++) candidato = base + n;
        return candidato;
    }

    /** Primer nombre + punto + primer apellido, en minúsculas y sin tildes ni símbolos (ej. «María José» «Aguilar Ortiz» → maria.aguilar). */
    static String baseUsername(String nombres, String apellidos) {
        String n = soloLetras(primera(nombres)), a = soloLetras(primera(apellidos));
        String base = (n + "." + a).replaceAll("^\\.|\\.$", "");
        return base.length() >= 3 ? base : (base + "usr");
    }

    private static String primera(String texto) {
        String[] partes = texto.trim().split("\\s+");
        return partes.length == 0 ? "" : partes[0];
    }

    private static String soloLetras(String texto) {
        return Normalizer.normalize(texto, Normalizer.Form.NFD).replaceAll("\\p{M}", "").toLowerCase().replaceAll("[^a-z0-9]", "");
    }

    @Transactional
    public UsuarioResponse actualizar(Long id, UsuarioUpdateRequest req) {
        Usuario u = buscar(id);
        if (!u.getEmail().equalsIgnoreCase(req.email()) && usuarios.existsByEmailIgnoreCase(req.email())) {
            throw new BusinessRuleException("El correo '" + req.email() + "' ya está registrado.");
        }
        u.setEmail(req.email().trim());
        u.setNombres(req.nombres().trim());
        u.setApellidos(req.apellidos().trim());
        u.setActualizadoEn(LocalDateTime.now());
        usuarios.save(u);
        keycloak.sincronizar(u, null);
        return toResponse(u);
    }

    @Transactional
    public UsuarioResponse asignarRoles(Long id, RolesRequest req) {
        Usuario u = buscar(id);
        Set<Rol> nuevos = resolverRoles(req.roles());
        boolean pierdeAdmin = u.esAdmin() && nuevos.stream().noneMatch(r -> "ADMIN".equals(r.getNombre()));
        if (pierdeAdmin) exigirOtroAdmin(u);
        u.setRoles(nuevos);
        u.setActualizadoEn(LocalDateTime.now());
        refresh.revocarTodos(id);                // el token vigente seguiría con los roles viejos hasta vencer
        usuarios.save(u);
        keycloak.sincronizar(u, null);
        keycloak.cerrarSesiones(u);
        return toResponse(u);
    }

    @Transactional
    public UsuarioResponse cambiarEstado(Long id, boolean activo) {
        Usuario u = buscar(id);
        if (!activo && u.esAdmin() && Boolean.TRUE.equals(u.getActivo())) exigirOtroAdmin(u);
        u.setActivo(activo);
        u.setActualizadoEn(LocalDateTime.now());
        if (!activo) refresh.revocarTodos(id);
        usuarios.save(u);
        keycloak.sincronizar(u, null);
        if (!activo) keycloak.cerrarSesiones(u);
        return toResponse(u);
    }

    @Transactional
    public UsuarioResponse desbloquear(Long id) {
        Usuario u = buscar(id);
        u.setBloqueadoHasta(null);
        u.setIntentosFallidos((short) 0);
        u.setActualizadoEn(LocalDateTime.now());
        usuarios.save(u);
        keycloak.desbloquear(u);
        return toResponse(u);
    }

    @Transactional
    public UsuarioConClaveTemporal restablecerClave(Long id) {
        Usuario u = buscar(id);
        String clave = generarClave();
        u.setPasswordHash(encoder.encode(clave));
        u.setDebeCambiarClave(true);
        u.setBloqueadoHasta(null);
        u.setIntentosFallidos((short) 0);
        u.setActualizadoEn(LocalDateTime.now());
        usuarios.save(u);
        refresh.revocarTodos(id);
        keycloak.sincronizar(u, null);
        keycloak.desbloquear(u);
        keycloak.restablecerClave(u, clave);
        return new UsuarioConClaveTemporal(toResponse(u), clave);
    }

    private void exigirOtroAdmin(Usuario u) {
        if (usuarios.contarAdminsActivos() <= 1 && Boolean.TRUE.equals(u.getActivo())) {
            throw new BusinessRuleException("No se puede quitar al último ADMIN activo del sistema.");
        }
    }

    private Set<Rol> resolverRoles(Set<String> nombres) {
        Set<String> pedidos = new HashSet<>();
        nombres.forEach(n -> pedidos.add(n.trim().toUpperCase().replace("ROLE_", "")));
        List<Rol> encontrados = roles.findByNombreIn(pedidos);
        if (encontrados.size() != pedidos.size()) {
            Set<String> faltan = new HashSet<>(pedidos);
            encontrados.forEach(r -> faltan.remove(r.getNombre()));
            throw new BusinessRuleException("Roles inexistentes: " + faltan);
        }
        return new HashSet<>(encontrados);
    }

    private Usuario buscar(Long id) {
        return usuarios.findById(id).orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + id));
    }

    static String generarClave() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) sb.append(ALFABETO.charAt(RANDOM.nextInt(ALFABETO.length())));
        return sb + "a1";           // garantiza letra y número
    }

    static UsuarioResponse toResponse(Usuario u) {
        return new UsuarioResponse(u.getId(), u.getUsername(), u.getEmail(), u.getNombres(), u.getApellidos(),
            Boolean.TRUE.equals(u.getActivo()), u.estaBloqueado(), Boolean.TRUE.equals(u.getDebeCambiarClave()),
            u.getRoles().stream().map(Rol::getNombre).sorted().toList(), u.getUltimoLogin(), u.getCreadoEn());
    }
}
```

---

## 13. `AuthController.java` — Controladores REST API

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/AuthController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Auth`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.auth.dto.Dtos.*;
import pe.edu.upeu.eduspace.auth.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación")
public class AuthController {

    private final AuthService service;

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión (usuario o correo + clave)")
    public TokenResponse login(@Valid @RequestBody LoginRequest req) {
        return service.login(req.username(), req.password());
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar el access token; el refresh token se rota en cada uso")
    public TokenResponse refresh(@Valid @RequestBody RefreshRequest req) {
        return service.refrescar(req.refreshToken());
    }

    @PostMapping("/logout")
    @Operation(summary = "Cerrar sesión (revoca el refresh token)")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshRequest req) {
        service.logout(req.refreshToken());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/cambiar-clave")
    @Operation(summary = "Cambiar la propia clave (también en Keycloak); cierra las demás sesiones")
    public ResponseEntity<Void> cambiarClave(@Valid @RequestBody CambiarClaveRequest req, @AuthenticationPrincipal Jwt jwt) {
        service.cambiarClave(usuarioId(jwt), req.claveActual(), req.claveNueva());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/estado-clave")
    @Operation(summary = "¿La persona de la sesión debe cambiar su clave antes de continuar?")
    public EstadoClaveResponse estadoClave(@AuthenticationPrincipal Jwt jwt) {
        return new EstadoClaveResponse(service.debeCambiarClave(usuarioId(jwt)));
    }

    private static long usuarioId(Jwt jwt) {
        Object id = jwt.getClaim("usuarioId");
        if (!(id instanceof Number n)) throw new AccessDeniedException("El token no contiene usuarioId.");
        return n.longValue();
    }
}
```

---

## 14. `InternalCuentaController.java` — Controladores REST API

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/InternalCuentaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `InternalCuenta`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.eduspace.auth.dto.Dtos.CuentaPersonaRequest;
import pe.edu.upeu.eduspace.auth.dto.Dtos.UsuarioResponse;
import pe.edu.upeu.eduspace.auth.service.UsuarioService;

/**
 * Altas de cuenta que otros servicios piden con el token de servicio (p. ej. matricula-ms al confirmar una matrícula en línea).
 * No pasa por el Gateway. Nunca crea cuentas de ADMIN.
 */
@RestController
@RequestMapping("/internal/cuentas")
@RequiredArgsConstructor
public class InternalCuentaController {

    private final UsuarioService usuarios;

    @PostMapping
    public ResponseEntity<UsuarioResponse> crear(@Valid @RequestBody CuentaPersonaRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarios.crearCuentaPersona(req).usuario());
    }
}
```

---

## 15. `JwksController.java` — Controladores REST API

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/JwksController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Jwks`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.auth.controller;

import com.nimbusds.jose.jwk.JWKSet;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Tag(name = "JWKS")
public class JwksController {

    private final JWKSet jwksPublico;

    @GetMapping(value = "/.well-known/jwks.json", produces = "application/json")
    @Operation(summary = "Claves públicas para validar los tokens (solo parte pública)")
    public Map<String, Object> jwks() {
        return jwksPublico.toJSONObject(true);
    }
}
```

---

## 16. `UsuarioController.java` — Controladores REST API

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/controller/UsuarioController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Usuario`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.upeu.eduspace.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Set;
import pe.edu.upeu.eduspace.auth.dto.Dtos.*;
import pe.edu.upeu.eduspace.auth.service.UsuarioService;

@RestController
@RequestMapping("/api/v1/auth/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios (solo ADMIN)")
public class UsuarioController {

    private final UsuarioService service;

    @GetMapping
    @Operation(summary = "Listar usuarios; filtros: texto, rol, activo")
    public PageResponse<UsuarioResponse> listar(@RequestParam(required = false) String texto,
                                                @RequestParam(required = false) String rol,
                                                @RequestParam(required = false) Boolean activo,
                                                Pageable pageable) {
        return service.listar(texto, rol, activo, pageable);
    }

    @GetMapping("/{id}")
    public UsuarioResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    @Operation(summary = "Crear usuario; sin 'clave' se genera una temporal que se muestra una sola vez")
    public ResponseEntity<UsuarioConClaveTemporal> crear(@Valid @RequestBody UsuarioCreateRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(req));
    }

    @PostMapping("/cuentas")
    @Operation(summary = "Crea la cuenta de una persona: usuario nombre.apellido y clave inicial = documento (cambio obligatorio al entrar)")
    public ResponseEntity<UsuarioConClaveTemporal> crearCuenta(@Valid @RequestBody CuentaPersonaRequest req, Authentication auth) {
        boolean admin = auth.getAuthorities().stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        if (!admin) {
            // La secretaría solo crea las cuentas de quienes atiende: alumnos, apoderados y docentes (no personal con permisos ni administradores)
            String rol = req.rol().trim().toUpperCase().replace("ROLE_", "");
            if (!Set.of("ALUMNO", "APODERADO", "DOCENTE").contains(rol)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "La secretaría solo puede crear cuentas de alumnos, apoderados y docentes.");
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crearCuentaPersona(req));
    }

    @PostMapping("/{id}/restablecer-por-documento")
    @Operation(summary = "Restaura la cuenta: la clave vuelve a ser el documento y debe cambiarse al entrar (no aplica a ADMIN)")
    public UsuarioResponse restablecerPorDocumento(@PathVariable Long id, @Valid @RequestBody RestablecerPorDocumentoRequest req) {
        return service.restablecerPorDocumento(id, req);
    }

    @PutMapping("/{id}")
    public UsuarioResponse actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioUpdateRequest req) {
        return service.actualizar(id, req);
    }

    @PutMapping("/{id}/roles")
    public UsuarioResponse roles(@PathVariable Long id, @Valid @RequestBody RolesRequest req) {
        return service.asignarRoles(id, req);
    }

    @PatchMapping("/{id}/activar")
    public UsuarioResponse activar(@PathVariable Long id) {
        return service.cambiarEstado(id, true);
    }

    @PatchMapping("/{id}/desactivar")
    public UsuarioResponse desactivar(@PathVariable Long id) {
        return service.cambiarEstado(id, false);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "No hay borrado físico (otros servicios guardan usuario_id): desactiva al usuario")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.cambiarEstado(id, false);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/desbloquear")
    public UsuarioResponse desbloquear(@PathVariable Long id) {
        return service.desbloquear(id);
    }

    @PostMapping("/{id}/restablecer-clave")
    @Operation(summary = "Genera una clave temporal (se muestra una sola vez) y obliga a cambiarla")
    public UsuarioConClaveTemporal restablecer(@PathVariable Long id) {
        return service.restablecerClave(id);
    }
}
```

---

## 17. `AuthProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/AuthProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.upeu.eduspace.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.auth")
public class AuthProperties {

    private String issuer = "http://localhost:8090";
    private int accessTokenMinutos = 30;
    private int refreshTokenDias = 7;
    private int maxIntentosFallidos = 5;
    private int bloqueoMinutos = 15;
    private int claveMinima = 8;
    private Jwt jwt = new Jwt();
    private KeycloakAdmin keycloakAdmin = new KeycloakAdmin();

    /**
     * Sincronización de cuentas hacia Keycloak (Admin REST API). Con {@code enabled=false} auth-ms funciona como antes.
     * El cliente debe ser confidencial, con "service accounts" y los roles de realm-management
     * {@code manage-users}, {@code view-users}, {@code query-users} y {@code view-realm}. El secreto va por variable de entorno.
     */
    @Getter
    @Setter
    public static class KeycloakAdmin {
        private boolean enabled = false;
        /** Los endpoints autenticados de auth-ms (cambiar-clave, estado-clave, usuarios) aceptan también tokens firmados por Keycloak. */
        private boolean aceptarTokens = false;
        private String baseUrl = "http://localhost:18090";
        private String realm = "eduspace";
        private String clientId = "eduspace-admin";
        private String clientSecret = "";
        /** Cliente público (direct grant) con el que auth-ms comprueba la clave actual de quien la cambia. */
        private String clientIdFormulario = "eduspace-web-form";
        /**
         * Marca la clave temporal en Keycloak con la acción UPDATE_PASSWORD. Déjalo en false con el login por formulario
         * (direct grant): Keycloak lo rechazaría. El cambio obligatorio lo exige EduSpace con su propio indicador
         * ({@code debe_cambiar_clave}, endpoint /api/v1/auth/estado-clave) y lo cumple /cambiar-clave, que actualiza la clave en Keycloak.
         */
        private boolean exigirCambioClave = false;
    }

    @Getter
    @Setter
    public static class Jwt {
        private String kid = "eduspace-key-1";
        private String privateKeyPath = "";
        private String publicKeyPath = "";
        private String publicKeyAnteriorPath = "";
        private String kidAnterior = "eduspace-key-0";
        private boolean generarClaveSiFalta = false;
    }
}
```

---

## 18. `JwtKeyConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/JwtKeyConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.auth.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

/**
 * Claves RSA de firma. PROD: se cargan de archivos PEM y, si faltan, el servicio NO arranca (una clave generada al
 * vuelo invalidaría todos los tokens en cada reinicio y las réplicas firmarían con claves distintas). DEV: con
 * {@code generar-clave-si-falta=true} se genera un par RSA 2048 al arrancar. Rotación: la clave pública anterior se
 * sigue publicando en el JWKS.
 */
@Slf4j
@Configuration
public class JwtKeyConfig {

    @Bean
    public RSAKey claveActual(AuthProperties props) throws Exception {
        AuthProperties.Jwt cfg = props.getJwt();
        boolean hayArchivos = !cfg.getPrivateKeyPath().isBlank() && !cfg.getPublicKeyPath().isBlank();
        if (hayArchivos) {
            RSAPrivateKey privada = (RSAPrivateKey) KeyFactory.getInstance("RSA")
                .generatePrivate(new PKCS8EncodedKeySpec(leerPem(cfg.getPrivateKeyPath())));
            RSAPublicKey publica = (RSAPublicKey) KeyFactory.getInstance("RSA")
                .generatePublic(new X509EncodedKeySpec(leerPem(cfg.getPublicKeyPath())));
            log.info("Clave JWT cargada desde archivo (kid={})", cfg.getKid());
            return new RSAKey.Builder(publica).privateKey(privada).keyID(cfg.getKid()).build();
        }
        if (!cfg.isGenerarClaveSiFalta()) {
            throw new IllegalStateException("No se configuraron las claves JWT (app.auth.jwt.private-key-path / public-key-path). "
                + "En PROD son obligatorias; en DEV use app.auth.jwt.generar-clave-si-falta=true.");
        }
        // DEV: el par generado se guarda en un archivo y se reutiliza en cada arranque. Sin esto, cada reinicio de auth-ms cambiaba
        // la clave: el Gateway y los servicios (que la guardan en caché) rechazaban todos los tokens y la web quedaba con sesión
        // "viva" pero sin datos. Para empezar de cero basta borrar el archivo.
        Path archivo = Path.of(System.getProperty("user.home"), ".eduspace-dev", "jwt-rsa-dev.der");
        KeyPair par = leerParDev(archivo);
        if (par == null) {
            KeyPairGenerator g = KeyPairGenerator.getInstance("RSA");
            g.initialize(2048);
            par = g.generateKeyPair();
            guardarParDev(archivo, par);
            log.warn("Clave JWT de DEV GENERADA y guardada en {} (kid={}). Solo para DEV.", archivo, cfg.getKid());
        } else {
            log.warn("Clave JWT de DEV reutilizada desde {} (kid={}): los tokens sobreviven a los reinicios. Solo para DEV.", archivo, cfg.getKid());
        }
        return new RSAKey.Builder((RSAPublicKey) par.getPublic()).privateKey(par.getPrivate()).keyID(cfg.getKid()).build();
    }

    private static KeyPair leerParDev(Path archivo) {
        try {
            if (!Files.exists(archivo)) return null;
            byte[] datos = Files.readAllBytes(archivo);
            int n = java.nio.ByteBuffer.wrap(datos, 0, 4).getInt();
            byte[] priv = java.util.Arrays.copyOfRange(datos, 4, 4 + n);
            byte[] pub = java.util.Arrays.copyOfRange(datos, 4 + n, datos.length);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return new KeyPair(kf.generatePublic(new X509EncodedKeySpec(pub)), kf.generatePrivate(new PKCS8EncodedKeySpec(priv)));
        } catch (Exception e) {
            log.warn("No se pudo leer la clave de DEV guardada ({}); se genera una nueva.", e.getMessage());
            return null;
        }
    }

    private static void guardarParDev(Path archivo, KeyPair par) {
        try {
            Files.createDirectories(archivo.getParent());
            byte[] priv = par.getPrivate().getEncoded();
            byte[] pub = par.getPublic().getEncoded();
            java.nio.ByteBuffer b = java.nio.ByteBuffer.allocate(4 + priv.length + pub.length);
            b.putInt(priv.length).put(priv).put(pub);
            Files.write(archivo, b.array());
            try {
                Files.setPosixFilePermissions(archivo, java.nio.file.attribute.PosixFilePermissions.fromString("rw-------"));
            } catch (UnsupportedOperationException ignorado) { /* sistema sin permisos POSIX */ }
        } catch (IOException e) {
            log.warn("No se pudo guardar la clave de DEV ({}): los tokens no sobrevivirán a un reinicio.", e.getMessage());
        }
    }

    /** JWKS público: clave actual y, si existe, la anterior (rotación). */
    @Bean
    public JWKSet jwksPublico(RSAKey claveActual, AuthProperties props) throws Exception {
        List<com.nimbusds.jose.jwk.JWK> claves = new ArrayList<>();
        claves.add(claveActual.toPublicJWK());
        String anterior = props.getJwt().getPublicKeyAnteriorPath();
        if (anterior != null && !anterior.isBlank()) {
            RSAPublicKey pub = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(leerPem(anterior)));
            claves.add(new RSAKey.Builder(pub).keyID(props.getJwt().getKidAnterior()).build());
        }
        return new JWKSet(claves);
    }

    @Bean
    public JwtEncoder jwtEncoder(RSAKey claveActual) {
        return new NimbusJwtEncoder(new ImmutableJWKSet<SecurityContext>(new JWKSet(claveActual)));
    }

    /**
     * Valida los tokens de los endpoints autenticados de auth-ms (cambiar-clave, estado-clave, usuarios): primero con la clave propia y,
     * si {@code app.auth.keycloak-admin.aceptar-tokens} está activo, con el JWKS de Keycloak (el frontend en modo Keycloak los envía).
     */
    @Bean
    public JwtDecoder jwtDecoder(RSAKey claveActual, AuthProperties props) throws Exception {
        JwtDecoder propio = NimbusJwtDecoder.withPublicKey(claveActual.toRSAPublicKey()).build();
        var kc = props.getKeycloakAdmin();
        if (!kc.isAceptarTokens()) return propio;
        String jwks = kc.getBaseUrl().replaceAll("/+$", "") + "/realms/" + kc.getRealm() + "/protocol/openid-connect/certs";
        JwtDecoder keycloak = NimbusJwtDecoder.withJwkSetUri(jwks).build();
        log.info("auth-ms acepta también tokens de Keycloak (JWKS {})", jwks);
        return token -> {
            try {
                return propio.decode(token);
            } catch (org.springframework.security.oauth2.jwt.JwtException e) {
                return keycloak.decode(token);
            }
        };
    }

    private static byte[] leerPem(String ruta) throws IOException {
        String pem = Files.readString(Path.of(ruta));
        String base64 = pem.replaceAll("-----(BEGIN|END)[A-Z ]+-----", "").replaceAll("\\s", "");
        return Base64.getDecoder().decode(base64);
    }
}
```

---

## 19. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.auth.config;

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

## 20. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.upeu.eduspace.auth.config;

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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
                .requestMatchers("/.well-known/jwks.json").permitAll()
                .requestMatchers("/internal/**").permitAll()   // protegido por ServiceTokenFilter (X-Service-Token)
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/login", "/api/v1/auth/refresh", "/api/v1/auth/logout").permitAll()
                // Secretaría puede crear las cuentas de alumnos, apoderados y docentes (el controlador le impide crear otros roles)
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/usuarios/cuentas").hasAnyRole("ADMIN", "SECRETARIA")
                .requestMatchers("/api/v1/auth/usuarios/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt(j -> j.jwtAuthenticationConverter(convertidor())));
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationConverter convertidor() {
        JwtAuthenticationConverter c = new JwtAuthenticationConverter();
        c.setJwtGrantedAuthoritiesConverter(new Converter<Jwt, Collection<GrantedAuthority>>() {
            @Override
            public Collection<GrantedAuthority> convert(Jwt jwt) {
                Set<GrantedAuthority> autoridades = new HashSet<>();
                if (jwt.getClaim("realm_access") instanceof Map<?, ?> ra && ra.get("roles") instanceof List<?> roles) {
                    roles.forEach(r -> autoridades.add(new SimpleGrantedAuthority("ROLE_" + r)));
                }
                return autoridades;
            }
        });
        return c;
    }
}
```

---

## 21. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.auth.exception;

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

## 22. `CredencialesInvalidasException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/CredencialesInvalidasException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.auth.exception;

/** Usuario inexistente, clave errónea, usuario inactivo o refresh token inválido: siempre el mismo mensaje (401). */
public class CredencialesInvalidasException extends RuntimeException {
    public CredencialesInvalidasException(String mensaje) {
        super(mensaje);
    }
}
```

---

## 23. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.upeu.eduspace.auth.exception;

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

## 24. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.auth.exception;

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


    @ExceptionHandler(CredencialesInvalidasException.class)
    public ResponseEntity<ErrorResponse> handleCredenciales(CredencialesInvalidasException ex, HttpServletRequest request) {
        return build(HttpStatus.UNAUTHORIZED, ex.getMessage(), request);
    }

    @ExceptionHandler(UsuarioBloqueadoException.class)
    public ResponseEntity<ErrorResponse> handleBloqueado(UsuarioBloqueadoException ex, HttpServletRequest request) {
        return build(HttpStatus.LOCKED, ex.getMessage(), request);
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

## 25. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.auth.exception;

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

## 26. `UsuarioBloqueadoException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/exception/UsuarioBloqueadoException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.upeu.eduspace.auth.exception;

/** Demasiados intentos fallidos (423). */
public class UsuarioBloqueadoException extends RuntimeException {
    public UsuarioBloqueadoException(String mensaje) {
        super(mensaje);
    }
}
```

---

## 27. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.upeu.eduspace.auth.filter;

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

## 28. `ServiceTokenFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/filter/ServiceTokenFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.upeu.eduspace.auth.filter;

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

## 29. `AuthApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/AuthApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.upeu.eduspace.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableScheduling;
import pe.edu.upeu.eduspace.auth.config.AuthProperties;

@SpringBootApplication
@EnableDiscoveryClient
@EnableScheduling
@EnableConfigurationProperties(AuthProperties.class)
public class AuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
```

---

