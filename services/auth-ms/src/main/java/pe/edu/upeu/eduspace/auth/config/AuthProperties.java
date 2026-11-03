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
