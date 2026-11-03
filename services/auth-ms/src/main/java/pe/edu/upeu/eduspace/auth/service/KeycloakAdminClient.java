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
