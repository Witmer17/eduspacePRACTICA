package pe.edu.eduspace.planificacion.config;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
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
 * Resource server (JWT RS256 de auth-ms). GET autenticado; escritura solo ADMIN, salvo horarios,
 * asignaciones y docentes que también puede SECRETARIA. {@code /internal/**} no pasa por el Gateway.
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
                    auth.requestMatchers("/internal/**").permitAll();
                    if (swaggerPublic) {
                        auth.requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll();
                    }
                    // Contratos y pagos del personal: sensibles, solo ADMIN también para leer (antes que la regla general de GET).
                    auth.requestMatchers("/api/v1/planificacion/rrhh/**").hasRole("ADMIN");
                    // Asistencia del personal: ADMIN y SECRETARIA, también para leer.
                    auth.requestMatchers("/api/v1/planificacion/asistencia-personal/**").hasAnyRole("ADMIN", "SECRETARIA");
                    // Lo propio de cada persona del personal (su contrato, sus pagos…): solo lectura, solo personal; la persona sale del token.
                    auth.requestMatchers(HttpMethod.GET, "/api/v1/planificacion/mi-personal/**", "/api/v1/planificacion/mi-personal")
                            .hasAnyRole("ADMIN", "SECRETARIA", "DOCENTE", "CAJERO");
                    auth.requestMatchers(HttpMethod.GET, "/api/v1/planificacion/**").authenticated();
                    auth.requestMatchers("/api/v1/planificacion/horarios/**", "/api/v1/planificacion/asignaciones/**",
                            "/api/v1/planificacion/docentes/**").hasAnyRole("ADMIN", "SECRETARIA");
                    auth.requestMatchers("/api/v1/planificacion/**").hasRole("ADMIN");
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
        @SuppressWarnings("unchecked")
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            Object realm = jwt.getClaim("realm_access");
            if (realm instanceof Map<?, ?> map && map.get("roles") instanceof Collection<?> roles) {
                return roles.stream().map(r -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + r)).toList();
            }
            return List.of();
        }
    }
}
