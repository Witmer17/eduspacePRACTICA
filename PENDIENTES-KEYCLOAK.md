# Pendientes: Keycloak completo y sistema limpio

Estado al 2026-11-01 (tarde). Sincronización de cuentas con Keycloak **activa y probada de punta a punta**; sistema limpio con solo `admin`.

## Ya hecho

- `auth-ms` conserva la fila local (id numérico, usado como `usuario_id` por los demás servicios) y la refleja en Keycloak con la Admin REST API
  (`KeycloakAdminClient`, enlazada por el atributo `usuarioId`). Cubre: crear cuenta/usuario, editar, roles, activar/desactivar, desbloquear y restablecer clave.
- `/usuarios` y `/cuentas` visibles con Keycloak; se quitó el enlace a la consola de Keycloak.
- Cambio de clave propio: `POST /api/v1/auth/cambiar-clave` (valida contra Keycloak y la actualiza allí) y `GET /api/v1/auth/estado-clave`
  (obliga a cambiarla en el primer ingreso).
- `auth-ms` acepta también tokens de Keycloak (`aceptar-tokens: true` en `auth-ms-dev.yml`).
- Limpieza: en `auth_db` solo queda `admin` (id 1, ADMIN); personas y actividad en cero en las 10 bases. Se conservó la información del colegio
  (estructura académica, cupos, tarifas, conceptos, series, escalas, plantillas).
- Información del colegio recortada a 3 de cada tipo (coherente entre servicios): grados 1 (3 años), 4 (1° Primaria) y 12 (3° Secundaria);
  secciones 2, 5 y 20 (una por grado, sin tutor); 3 aulas; 3 cursos (Matemática, Comunicación, Educación Física) y 3 vínculos grado-curso;
  3 bloques horarios; 3 cupos de sección (ocupados 0). Criterios de evaluación en 0 (eran de una sección eliminada).
  Se dejaron completos porque recortarlos rompería el sistema: niveles (3), año, periodos (4), feriado, campaña, conceptos de pago (4),
  tarifas (6 = 3 niveles × matrícula/pensión), series de comprobante, escalas (4), parámetros (3) y las 21 plantillas de notificación.
  Los volcados de `backups/2026-11-01/` y el esquema `respaldo_20261101` son anteriores a este recorte y conservan todo.
- Respaldos: (a) esquema `respaldo_20261101` dentro de cada base; (b) archivos `pg_dump` en `backups/2026-11-01/*.sql` (ignorado por git; incluyen el esquema de respaldo, es decir, los datos de antes de la limpieza).
- Cliente de servicio `eduspace-admin` creado en Keycloak (permisos mínimos: manage-users, view-users, query-users, view-realm).
  Secreto aleatorio en `infra/keycloak/.secreto-admin` (ignorado por git, permisos 600).
- `auth-ms` lee su activación y el secreto de `services/auth-ms/config/application.yml` (local, ignorado por git; Spring lo carga solo).
- Keycloak: solo existe `admin` (con rol ADMIN y `usuarioId=1`). `eduspace-realm.json` solo lleva `admin`;
  `levantar-dev.sh` crea el cliente de administración si existe `.secreto-admin`.
- Prueba de punta a punta: alta de una cuenta de ALUMNO por `/internal/cuentas` → apareció en Keycloak con rol y `usuarioId`, el login con el documento
  devolvió un token correcto; luego se borró la cuenta de prueba (local y Keycloak).
- Tests: `auth-ms` 17/17 (los de integración necesitan `DOCKER_HOST` apuntando al socket de Podman, ver abajo) y frontend 73/73.

## Pendiente

### 1. Probar desde la interfaz (lo hace el usuario, o con el asistente)
- Entrar como `admin` en `http://localhost:4200` (**la clave de `admin` en Keycloak no se verificó**: en los logs hubo intentos fallidos y bloqueos;
  si no entra, restablecerla con `kcadm.sh set-password -r eduspace --username admin --new-password '<clave>'`).
- Crear desde `/cuentas` un alumno, un docente y un apoderado; iniciar sesión con cada uno (clave inicial = documento, mínimo 8 caracteres).
- Comprobar que lo manda a `/cambiar-clave`, que la clave nueva funciona y la anterior no.
- Probar cambiar roles, desactivar, desbloquear y restablecer clave.

### 2. Limpiezas menores
- Archivos subidos (documentos de alumnos, entregas de tareas) siguen en MinIO (`e2e-minio`) como huérfanos.
- Kafka conserva eventos viejos; normalmente no se reprocesan, pero si se reinician los offsets de un consumidor podrían reaparecer.
- Eureka marcaba `planificacion-ms` como no registrado; revisar si fue pasajero.
- Cuando se confirme que todo va bien, borrar los esquemas `respaldo_20261101` de cada base (los `.sql` de `backups/` ya los contienen).
- `docs/` y `PENDIENTES.md` ya tenían cambios sin guardar antes de esta sesión; decidir qué entra en el commit.
- Hacer commit (nada se ha commiteado): revisar `git status`; los secretos y los respaldos ya están en `.gitignore`.

### 3. Si se recrea el contenedor de Keycloak
`./infra/keycloak/levantar-dev.sh` importa el realm (solo `admin` con clave `admin123`) y crea el cliente `eduspace-admin`.
La base H2 de Keycloak vive dentro del contenedor: al borrarlo se pierden las cuentas creadas desde la app. Las cuentas siguen en `auth_db`,
pero habría que volver a sincronizarlas (no existe todavía una acción de «sincronizar todo»; sus claves quedarían por restablecer).

## Cómo correr los tests de auth-ms con Podman
```
systemctl --user start podman.socket
cd services/auth-ms
DOCKER_HOST=unix:///run/user/$(id -u)/podman/podman.sock TESTCONTAINERS_RYUK_DISABLED=true ./mvnw -o test
```

## Antes de producción (no está listo hoy)

- Keycloak corre en `start-dev` (una instancia, base H2 dentro del contenedor, 640 MB de memoria, HTTP). Pasar a modo producción con PostgreSQL, HTTPS y varias réplicas.
- Cada login consume CPU (hash de clave): un pico de inicios de sesión lo satura. Falta límite de intentos de login en el gateway, prueba de carga y alertas.
- El bloqueo tras 5 intentos fallidos permite que alguien bloquee cuentas ajenas a propósito.
- El login por formulario con usuario y clave (direct grant) sirve en la red local. Para internet conviene el flujo con redirección y PKCE
  sobre HTTPS, con un tema de Keycloak que imite el diseño de EduSpace.
- El secreto de `eduspace-admin` y el token de servicio de `/internal` (`eduspace-dev-service-token`) deben salir de un gestor de secretos, no de archivos locales.

## Cómo deshacer la limpieza

Desde los archivos: `psql` sobre `backups/2026-11-01/<base>.sql` en una base vacía; o dentro de cada base:
`INSERT INTO public.t SELECT * FROM respaldo_20261101.t;` (respetando el orden de llaves foráneas; en `auth_db` los usuarios van antes que `usuario_roles`).
Las cuentas restauradas en `auth_db` no existirán en Keycloak hasta sincronizarlas.
