# EduSpace — Pendientes (2026-10-16)

## Hecho
Ver `INFORME-ESTADO.md` y `docs/05-integracion-y-correcciones.md`. De la ronda anterior (Hermes): patrón Outbox, DLT,
aforo del aula, importación CSV, ficha de salud cerrada por defecto.

## Hecho el 2026-10-23
- Gateway valida el JWT (RS256 vía JWKS de auth-ms), con CORS (`CORS_ALLOWED_ORIGINS`) y límite multipart; solo login/refresh/logout y actuator pasan sin token. Verificado levantado en la e2e (2026-10-23): token ausente o inválido → 401, preflight CORS OK, origen ajeno → 403.
- DLT (`<tópico>.DLT`) y `ErrorHandlingDeserializer` en pago, asistencia, tareas, examenes, calificaciones y matricula (matricula en realidad no tenía DLT).
- Zona horaria (C11): ya estaba en `config-repo` para los tres servicios de Hermes; el hallazgo era falso.
- Literal por nivel: se resuelve el código del nivel con `planificacion-ms`. Solo existe la escala PRIMARIA en la BD: los demás niveles caen a ella hasta que se definan sus escalas (decisión de producto).
- Boletín por alumno: elige la matrícula de la sección/año pedidos.
- Banco de preguntas: actualizar/eliminar exigen ser el docente dueño (403 si no).
- 125 pruebas de los 6 servicios tocados pasan y los 6 escenarios e2e dan OK con el Gateway nuevo.

- `GET /api/v1/planificacion/docentes/mi` (planificacion-ms): el docente de la sesión por el claim `usuarioId`; lo usa el launcher "Horario EduSpace" (modo docente). Con prueba de integración.
- `POST /api/v1/pagos/online` ahora verifica que el alumno sea hijo del apoderado y que todas las cuotas sean de ese alumno (403 si no). Antes cualquier APODERADO podía pagar cuotas de cualquier alumno. Prueba nueva en `PagoIntegrationTest` (24 pruebas).

## Hecho el 2026-10-26 (revisión de seguridad contra la guía de pagatu)
- `/internal/**` exige el header `X-Service-Token` (token compartido `eduspace.service-token`, comparación en tiempo constante) en alumnos, planificacion, matricula y pago; asistencia, calificaciones, examenes y tareas lo deniegan (`denyAll`). Los clientes Feign de los 7 servicios que llaman lo envían solo hacia `/internal/`. DEV: `SERVICE_TOKEN` con valor de desarrollo; PROD: obligatorio, sin valor por defecto (el servicio no arranca sin él). Pruebas 401 sin token / token erróneo en los 4 proveedores.
- Gateway: Dockerfile, `compose.yml` (único servicio publicado hacia fuera) y `eduspace-gateway-prod.yml` (CORS y JWKS obligatorios, `forward-headers-strategy`, sin detalles de salud).
- Gateway: límite de peticiones por IP (`RateLimitFilter`): API 300/min con ráfaga 50; login/refresh 10/min con ráfaga 5; responde 429 con `Retry-After`. Por réplica y en memoria.
- Gateway: solo `/actuator/health` e `info` sin token; el resto de actuator solo con `actuator-public: true` (DEV). Los 7 servicios que no limitaban actuator en PROD ahora exponen solo `health,info,prometheus`.
- Pruebas nuevas del Gateway (10): token ausente, firmado por otra clave, firma alterada y vencido dan 401; token válido pasa; actuator cerrado; rate limit.
- `kafka/compose.yml` (PROD): red `eduspace-prod-net` (antes `pagatu-prod-net`), host `kafka` (el que usan los servicios) y puertos de Kafka/Kafka UI solo en `127.0.0.1`.

- `pago-ms`: desactivar una tarifa con monto redondo (150) daba 409 porque se comparaba el monto con `equals` (150 ≠ 150.00); ahora `compareTo`, con prueba.

- Keycloak (DEV) como emisor alterno: `infra/keycloak/` (realm `eduspace`, clientes `eduspace-web` con PKCE y `eduspace-e2e`, usuarios con atributo `usuarioId`) y modo `keycloak` en el front. Verificado contra el sistema real: 13/13 comprobaciones por el Gateway (401 sin token y con firma alterada, 403 por rol, claim `usuarioId` en pago-ms y planificacion-ms, token de auth-ms rechazado), flujo código+PKCE completo, refresh con rotación y reuso rechazado, redirect_uri ajena y *password grant* rechazados, bloqueo por fuerza bruta.

## Hecho el 2026-10-27/28
- Inicio del admin (estadísticas, pre-matrículas, aulas con ficha, cursos y docentes), sitio público, datos para matricular, alineación con pagatu (Keycloak por defecto en DEV, `X-Trace-ID`), CRUD de notificaciones con selector de destinatarios y **armado automático de horarios**. Detalle, estado de los datos y pendientes: `docs/08-avance-2026-10-28.md`.

## Hecho el 2026-10-29
- Cuentas de personas: usuario `nombre.apellido`, clave inicial = documento, cambio obligatorio al primer ingreso, restauración por el ADMIN (no aplica a cuentas ADMIN); pantalla *Avisos y cuentas → Cuentas de acceso* y tarjeta en la ficha del alumno. Solo con el login propio (`auth-ms`); con Keycloak las cuentas se crean en su consola (ver `docs/sistema/alumnos-y-acceso.md`).
- Documentación completa del sistema con métricas (`docs/sistema/`, `mkdocs.yml`), un documento por persona (`docs/equipo/`).

- Matrícula en línea desde el sitio público (reserva, pago simulado, confirmación, cuentas, constancia PDF y correo): `docs/sistema/matricula-en-linea.md`.

## Pendiente

| Pendiente | Motivo / qué lo destraba |
|---|---|
| `auth-ms`: PROD y extras | Claves RSA persistentes y claves de semillas fuera del repositorio; validación del JWT en el Gateway y CORS; endpoint para que `notificaciones-ms` envíe "a todos los de un rol" (hoy `GET /api/v1/auth/usuarios?rol=` ya lista por rol); recuperación de clave por correo. |
| Front | Hecho el 2026-10-26: panel ADMIN/SECRETARIA en `frontend/` (login, usuarios y roles, planificación, cobranza). Alumnos y matrícula (lista, expediente, documentos, apoderados, salud, traslado, retiro, ratificación, campañas, cupos) también hechos el 2026-10-27. Faltan horarios, reportes e importación CSV, y las apps de docente, caja y apoderado/alumno. |
| Consumidor de `tarea.entregada` | Nadie lo consume aún (útil para avisar al docente). |
| Salud: "solo tutor y docentes de la sección" | Ahora existe `/internal/matriculas/alumno/{id}` en matricula-ms; falta que alumnos-ms lo consulte. |
| Apoderado sin cuenta (correo/SMS directo) | Requiere cambiar `notificaciones.usuario_id` (NOT NULL) y la fila marcadora; definir canal y consentimiento. |
| FCM / SMS / WhatsApp | Credenciales y proveedor por decidir (hoy `LogPushSender`). |
| Ratificación: "aprobó el año" | En el MVP lo decide secretaría; luego consultar `resultados_anuales` de calificaciones-ms. |
| Unificar paquetes | `pe.edu.eduspace` (Hermes) vs `pe.edu.upeu.eduspace` (Witmer/Andre). |
| PROD en `eduspace-prod-net` y pruebas de carga | Entorno real necesario. |
| Cifrado en reposo de salud, soft-delete, derechos ARCO | Decisión legal/de producto (Ley 29733). |
| Auditoría general de cambios | Mejor como `auditoria-ms` que consuma eventos. |

## Hallazgos de la verificación del 2026-10-16 (detalle en `docs/07-verificacion-plan-y-pagatu.md`)

| Pendiente | Detalle |
|---|---|
| Circuit breaker propio (C5) | calificaciones-ms y examenes-ms usan solo fallback de Feign. |
| `fail-fast` del Config Server en PROD (C10) | Hoy todos usan `optional:`. |
| Token de servicio en `/internal/**` (C14) | Hecho el 2026-10-26 (ver arriba). Falta rotarlo y guardarlo como secreto en PROD; a futuro, mTLS o token firmado por servicio. |
| Verificar C8 y C16 | URL firmada de MinIO en tareas/alumnos; limpieza de tablas técnicas en todos. |
| Consumidores de eventos sin uso | `alumno.registrado`, `alumno.estado-cambiado`, `anio.activado`, `periodo.cambiado`. |
| Observabilidad (S10) | Un panel de Grafana por servicio (hoy solo el stack base). |
| Alinear con pagatu | `application.yml` mínimo (config al Config Server), un solo paquete base, mappers MapStruct reales en Andre/Witmer, estilo único de autorización, `mkdocs`/`uso-rapido`/`CLAUDE.md` en la raíz. |
| Fase 2 del plan | H14 recuperación y orden de mérito, H15 panel del director, H16 pasarela/SUNAT, H17 alta automática de cuentas. |

## Seguridad: lo que sigue abierto (revisión 2026-10-26)
| Pendiente | Detalle |
|---|---|
| Cuentas semilla | La migración V1 de `auth-ms` crea `admin`, `secretaria` y `cajero` con `debe_cambiar_clave = FALSE`; en PROD deben forzar el cambio o no crearse. |
| Contraseña por defecto en compose PROD | `auth-ms/compose.yml` y otros usan `eduspace_prod_secret` como valor de respaldo para la base. |
| Sin 2FA, sin `aud` en el JWT, sin revocación de access tokens | El access token dura 30 minutos aunque se haga logout. |
| Actuator y Swagger en los servicios | `/actuator/**` y Swagger siguen en `permitAll` en cada servicio; en PROD solo se limitó la exposición. Cerrar a la red de observabilidad. |
| Rate limit distribuido | El actual es por réplica del Gateway; con varias réplicas, usar Redis. |

## Keycloak: lo que queda (2026-10-27)
| Pendiente | Detalle |
|---|---|
| Pasarela de pago real y correo real (matrícula en línea) | Integrar un proveedor en `POST /internal/pagos/matricula-en-linea`; configurar `SMTP_*` en `notificaciones-ms` (en DEV el correo lo recibe Mailpit). Definir el prorrateo de pensiones si se matricula a mitad de año. |
| Cuentas de personas con Keycloak | Crearlas también en Keycloak (Admin API) y que `auth-ms` acepte el token de Keycloak del ADMIN; hoy la pantalla de cuentas solo funciona en modo `auth-ms`. |
| Usuarios en un solo lugar | Con Keycloak, `auth-ms` debería administrar los usuarios por la Admin API (cuenta de servicio) y guardar el `usuarioId` como atributo; hoy el alta y el `usuarioId` son manuales. |
| PROD con Keycloak | Base propia, HTTPS, sin el cliente `eduspace-e2e`, `sslRequired` externo; hoy solo hay perfil de DEV. |
| e2e con Keycloak | `tools/e2e/lib.py` crea usuarios por `auth-ms`; para correrlo con Keycloak habría que crearlos en el realm. |
| Comprobación en navegador | Verificada con Chrome headless (Playwright) para todos los roles; falta una prueba manual de rendir un examen con varios intentos. |
| Web: huecos conocidos | Revisión de preguntas abiertas (sin endpoint de respuestas), comprobante PDF, `descuentos/asignar` devolvió 409 en una prueba (regla sin investigar). |

## Hecho el 2026-10-29 y 2026-10-30
Detalle completo en `docs/10-avance-2026-10-30.md`: app móvil Flutter (docente, alumno, apoderado), aprobación de matrículas por el ADMIN con correo de acceso,
materiales de curso, acceso desde otros equipos (CORS por patrones, nombres de equipo, `uuid` sin https), tres modos de login y `tools/e2e/modo.sh`,
matrícula en línea repetible, material de presentación y correcciones.

## Pendiente (2026-10-30)
- **Caja aprueba los pagos antes que el administrador** (matrícula y pensiones en línea): estado de pago «por verificar» en `pago-ms`, pantalla de Caja y regla de matrícula.
- App Flutter con Keycloak (exponer Keycloak al móvil) y `realm-admin` para el admin del colegio en Keycloak.
- Pruebas de integración de los servicios con contenedores (no se ejecutaron en esta ronda).

## Contratos y pagos del personal (2026-11-02): lo que no se pudo hacer o comprobar
Lo hecho: `planificacion-ms` V8 (`contratos_personal`, `pagos_personal`), `/api/v1/planificacion/rrhh/**` solo ADMIN, modales «Contratos y pagos» y «Planilla de pagos» en Personal, y el script `tools/e2e/07_rrhh_contratos_pagos.py` (0 fallos con sesión de ADMIN en Keycloak).

| Pendiente | Detalle |
|---|---|
| ~~Pruebas de integración de Java sin ejecutar~~ | **Hecho (2026-11-02):** corren con el socket de Podman (`DOCKER_HOST=unix:///run/user/$(id -u)/podman/podman.sock TESTCONTAINERS_RYUK_DISABLED=true mvn -o test`): `planificacion-ms` 68 pruebas (con las migraciones V8 y V9) y `pago-ms` 36 (con la V3), todas verdes. Siguen sin pruebas de integración propias (solo e2e por scripts) los endpoints `/rrhh`, `/asistencia-personal` y `/fondo`. |
| ~~403 de otros roles sin probar~~ | **Hecho (2026-11-02):** `tools/e2e/11_roles_pago_personal.py` crea (y luego desactiva) cuentas de secretaría, docente y cajero y comprueba: solo el ADMIN toca contratos, pagos, planilla y reparto de caja; la secretaría solo lee y marca la asistencia del personal; docente y cajero no entran a nada de eso; por el Gateway pasa lo mismo. 0 fallos. |
| Pantallas sin probar en navegador | Los modales de contratos, pagos y planilla, y la selección de docentes en Cursos, solo tienen pruebas unitarias de la lógica y el build; falta una prueba manual o con Playwright. |
| Scripts E2E 01–06 desactualizados | `tools/e2e/lib.py` pide el token a `auth-ms` (8090), pero el sistema está en modo Keycloak y los servicios lo rechazan con 401. Hay que obtener el token de Keycloak (cliente `eduspace-e2e`) como hace el script 07. Las semillas `secretaria` y `cajero` ya no existen en `auth_db`. |
| Planilla sin prorrateo | El sueldo es el mensual completo. Un contrato rescindido a mitad de mes no genera sueldo de ese mes si se rescinde antes de generar la planilla, y uno que empieza a mitad de mes cobra el mes entero. Definir la regla de prorrateo. |
| Sin cálculo de planilla legal | No hay AFP/ONP, EsSalud, gratificaciones, CTS ni descuentos de ley: los pagos son registro manual. |
| Contrato en PDF | No se genera el documento del contrato; solo se registran sus datos. |
| Contrato en 0 (ad honorem) | No genera sueldo (la base exige `monto > 0`); si se quiere registrar el pago simbólico, hay que cambiar la restricción `ck_pago_monto`. |
| Datos de prueba en la base de desarrollo | El script 07 dejó 2 personas inactivas («Prueba RRHH», «Prueba Honorario»), sus contratos y un sueldo ya pagado (los pagos realizados no se pueden borrar desde el sistema). Limpiar por SQL si estorban. |
| Avisos de contratos por vencer solo dentro del modal | No hay alerta en el inicio del administrador ni correo; hoy solo se ve al abrir «Contratos y pagos» de cada persona. |
| Comprobante de pago | No se emite boleta ni constancia del pago al personal. |

## Dinero de caja por área (2026-11-02)
Configuración → **Áreas de trabajo** (solo administrador): arriba, **Disponible en caja** (cobrado − asignado a las áreas), junto con lo cobrado y lo asignado; en cada área, «Dinero asignado» con una barra y el botón **Asignar dinero**. La ventana pide el monto TOTAL que debe tener el área (con atajos +100, +500, +1 000, «Todo lo disponible» y «Dejar en 0»), muestra en vivo cuánto sale o vuelve a caja y cómo queda la caja, impide pasar de lo disponible y lista los últimos movimientos del área. Backend: `pago-ms` V3 (`asignaciones_area` como libro de movimientos y `fondo_caja` como fila que se bloquea), `/api/v1/pagos/fondo` solo ADMIN. Probado de punta a punta con `tools/e2e/10_fondo_areas.py` (0 fallos, incluida una carrera de dos repartos simultáneos: se acepta uno y se rechaza el otro) y 9 pruebas unitarias del servicio.

| Pendiente | Detalle |
|---|---|
| «Caja» = todo lo cobrado | El dinero en caja es la suma de los pagos CONFIRMADO de toda la historia (efectivo y demás medios), no el efectivo físico de una sesión de caja. No descuenta gastos ni el pago de sueldos al personal: pagar la planilla no baja la caja. |
| Caja en negativo | Si se anula un pago después de repartir el dinero, la caja puede quedar en negativo; la pantalla lo avisa y solo permite devolver dinero a caja hasta cuadrarla. |
| Áreas inexistentes | `pago-ms` guarda solo el id del área (otra base) y no valida que exista. La pantalla ya avisa del dinero que sigue asignado a áreas **desactivadas** (con enlace para mostrarlas y devolverlo) y del asignado a ids que ya no existen (este último no se puede devolver desde la pantalla). Ese aviso no se probó en navegador. |
| Gastar lo asignado | El área solo «tiene» un monto: aún no se registran gastos contra él ni se muestra el saldo restante tras gastar. |
| Por periodo o año | El reparto es acumulado, sin cortes por año escolar ni por mes. |
| Probado en navegador | El recorrido principal (ver el recuadro «Verificación en navegador real»): banner de caja, bloqueo de «No alcanza», asignar con atajos y devolver. |
| Datos de prueba | Se creó y se borró un cobro de S/ 1 000 y movimientos de áreas ficticias (990001/990002) para probar; la base quedó con S/ 0 cobrado, como estaba. |

## Un contrato por persona, renovar y cuenta para depósito (2026-11-02)
**Regla:** cada persona tiene un solo contrato a la vez. Si ya tiene uno vigente, por vencer o por iniciar, no se puede crear otro (409: «ya tiene un contrato vigente… usa Renovar contrato»); se **renueva** o se rescinde. El periodo solo se compara **dentro de la misma persona**; dos personas distintas pueden tener exactamente el mismo periodo (comprobado). Un contrato vencido o rescindido sí permite crear uno nuevo (reingreso).
- **Renovar contrato** (`POST /rrhh/contratos/{id}/renovar`): el nuevo empieza el día siguiente al fin del anterior (sin huecos ni cruces), hereda tipo, cargo y sueldo (se pueden cambiar, incluso a indefinido), y el anterior queda intacto. Solo se renueva el último contrato, no rescindido y con fecha de fin. En la ventana «Contratos»: botón «Renovar contrato», atajos 3 meses / 6 meses / 1 año / fin de año, resumen en vivo y aviso del cambio de sueldo.
- **Cancelar una renovación por error:** un contrato que aún no empezó se puede rescindir (queda rescindido desde su propio inicio, sin llegar a regir). Antes daba error «la rescisión no puede ser anterior al inicio».
- **Cuenta para depósito** (`/rrhh/cuentas`, solo ADMIN): pestaña «Cuenta de depósito» en la ventana de cada persona: banco o billetera (BCP, BBVA, Interbank, Scotiabank, Banco de la Nación, BanBif, Mibanco, Pichincha, cajas, Yape, Plin, otro), tipo, número (8 a 20 dígitos; Yape/Plin = celular de 9, sin CCI), CCI opcional de 20 dígitos, titular y principal. Varias por persona, una sola principal (la primera lo es); «Hacer principal», editar, quitar (se desactiva) y copiar número/CCI. La tarjeta de Pago muestra «Depósito: banco · •••• 8901» o «Sin cuenta de depósito · Agregar cuenta», y la ventana «Pagar» muestra a dónde depositar con los datos para copiar.
- **Defectos encontrados al probarlo y corregidos:** (1) **doble pago en el mes de la renovación:** con una renovación a mitad de mes (p. ej. el viejo termina el 10 de dic y el nuevo empieza el 11), la planilla de ese mes generaba **dos sueldos completos** (S/ 1 800 + S/ 1 500). Ahora hay un sueldo por persona y mes, del contrato que cubre más días del mes (en empate, el más reciente). (2) La tarjeta mostraba el contrato **cancelado** de una renovación como si fuera el del mes; ahora aplica la misma regla que la planilla y ignora los cancelados antes de empezar. (3) Docentes del curso: si se reabría un curso antes de que terminara de recargar la lista, el docente aparecía sin marcar; los cursos se bloquean mientras se recarga.

| Pendiente | Detalle |
|---|---|
| Sin prorrateo en el mes de la renovación | Se paga el sueldo mensual completo del contrato que cubre más días; no se divide entre el sueldo viejo y el nuevo por días (como el resto de la planilla, que no prorratea). |
| Una persona con dos contratos a la vez ya no es posible | Por la regla pedida («uno solo, salvo renovación»); un docente por horas en dos niveles tendría que tener un solo contrato. Si se necesita, habría que volver a permitir contratos simultáneos con una marca explícita. |
| Cuenta de depósito en el alta | La cuenta se agrega desde «Contratos y pagos» → «Cuenta de depósito» (o desde la tarjeta); no es un paso del asistente «Agregar personal». |
| No se valida el banco contra el número | Se comprueban largo y dígitos, pero cada banco usa su propio largo (BCP 14, Interbank 13, BBVA 18…); un número de otro largo válido pasa. |
| Los datos bancarios se ven completos | Solo el administrador los ve (también el CCI y el titular); no hay cifrado en reposo (ver también la nota de Ley 29733). |
| Sin pagar por transferencia masiva | Hay datos de depósito y copiar, pero no se genera un archivo de pagos para subir al banco. |

## Repartir dinero entre todas las áreas en una sola ventana (2026-11-02)
Configuración → Áreas de trabajo → **«Repartir dinero entre las áreas»**: una ventana con todas las áreas (y las inactivas que aún tienen dinero), un campo de monto por área, «Asignado hoy», el cambio de cada fila, totales en vivo (disponible, lo que sale o vuelve a caja y cómo queda la caja), atajos («Repartir lo disponible en partes iguales», «Poner todo en 0», «Dejar todo como estaba», ↺ por fila), un motivo común y un solo botón «Guardar N cambios». Backend: `PUT /api/v1/pagos/fondo/areas` (todo o nada; solo cuenta el cambio NETO contra lo disponible: lo que baja una área paga lo que sube otra; las áreas sin cambio no generan movimiento). Verificado con 6 pruebas unitarias nuevas del servicio (16 en total), 10 pruebas de la lógica del frontend, el script `10_fondo_areas.py` y el recorrido de navegador (escritorio y celular).

| Pendiente | Detalle |
|---|---|
| «Partes iguales» no pondera | Reparte lo disponible a partes iguales entre las áreas activas (sumado a lo que ya tienen); no hay porcentajes por área ni «copiar el reparto del mes anterior». |
| Un motivo para todo el lote | El motivo se anota igual en cada movimiento; no hay un motivo distinto por área (se puede usar la ventana de una sola área para eso). |
| Reparto simultáneo | Dos administradores repartiendo a la vez: el segundo recibe «No hay suficiente dinero en caja» si el primero ya lo gastó; la ventana del segundo no se refresca sola hasta intentar guardar. |

## Defecto corregido: asistencia del personal perdía lo marcado si se marcaba antes de que cargara (2026-11-02)
El recorrido de navegador lo detectó: la lista de personal aparecía antes que la asistencia del día, y si se marcaba a alguien mientras llegaba la respuesta, esta reemplazaba lo marcado (quedaba «Sin marcar» y «Guardar el día» desactivado, sin aviso). Ahora la lista aparece cuando ya cargó el día y los controles se bloquean mientras se carga una fecha. Recorrido de interfaz completo: 69 pasos (31 + 38), todos verdes, 0 respuestas 429.

## Verificación en navegador real (2026-11-02)
`tools/e2e/ui_personal.sh` (Chrome del sistema + `playwright-core` instalado fuera del proyecto, ver el comentario del script) recorre la interfaz como administrador y verifica **25/25 pasos**: tabla de Personal y sus pestañas; «Agregar personal» de docente en tres pasos (datos → contrato → cursos) con vista previa en vivo, botón bloqueado sin sueldo y asignación de cursos; asistencia del día y resumen del mes; tarjeta de Pago al personal (contrato, periodo, asistencia, desglose sueldo ÷ días del mes con la regla de 8 tardanzas, generar planilla, descontar inasistencia con confirmación, pagar); y Áreas de trabajo (caja, bloqueo de «No alcanza», asignar con atajos, devolver). Sin errores en la consola ni respuestas 4xx/5xx. Limpia lo que crea (personas «UI Prueba», un cobro de S/ 1 000 y los movimientos del reparto).
Defectos reales que encontró y se corrigieron: los títulos de sección del paso del contrato se montaban sobre los campos (margen negativo fuera de `.form-grid`) y la vista previa decía «sin fin / Indefinido» en un plazo fijo sin fecha de fin.

| Pendiente | Detalle |
|---|---|
| ~~Sigue sin probarse en navegador~~ | **Hecho (2026-11-02), segunda tanda `tools/e2e/ui_personal_2.cjs` (37 pasos, todos verdes):** crear cuenta de acceso dentro del flujo (los datos de acceso salen al terminar y «← Datos» desaparece); «← Datos» (edita sin duplicar) y «Omitir por ahora»; un área que no es Docencia tiene 2 pasos; Pago al personal con filtros por estado y área y con el mes anterior; «Bonos y descuentos» (registra un bono que aparece en la tarjeta) y «Contratos» → «Rescindir» con confirmación; Cursos → docentes del curso (se marca y queda al reabrir); áreas desactivadas con dinero (aviso, «Mostrarlas» y devolver a caja); y el flujo completo como **secretaría** (menú sin Pago ni Cuentas, `/personal/pagos` por la barra de direcciones no muestra el pago, marca asistencia, «Guardar y asignar cursos →» sin contrato ni cuenta, y no ve el dinero de caja). Total de la verificación de interfaz: 62 pasos. |
| ~~Ver con el celular o pantallas angostas~~ | **Hecho (390 × 844):** ninguna de las cuatro pantallas ensancha la página, las tarjetas de Pago ocupan una columna y las ventanas «Agregar personal» y «Asignar dinero» caben. Se revisaron las capturas de Pago al personal. |
| Defecto encontrado y corregido: diseño equivocado para cuentas creadas en la aplicación | Las cuentas creadas desde la aplicación traen en el token roles de Keycloak (`offline_access`, `default-roles-eduspace`, `uma_authorization`) y `usaBarraPersonal`/`usaBarraAula` (que exigen «solo roles del sistema») daban falso: la secretaría veía el menú lateral oscuro en lugar de su barra superior (afectaba también a docentes, alumnos y apoderados). `AuthService` ahora conserva solo los roles del sistema (`rolesDelSistema`, 5 pruebas nuevas). Solo el `admin` importado del realm no tenía esos roles, por eso no se había notado. |
| Límite de peticiones del Gateway | 300 por minuto y por IP (ráfaga 50). Peticiones al abrir cada pantalla: Personal 10–11, Pago al personal 6, Asistencia 4, Cursos 13, Áreas 5. Con la automatización (que hace en segundos lo que una persona en minutos) aparecieron 429; con pausas, 0. Riesgo real para producción: todo el personal de un colegio detrás de la misma IP (NAT) comparte ese cupo; revisar el límite o limitar por usuario, y evitar las recargas completas tras cada guardado. |
| Sigue sin probarse en navegador | Solo lo que ni el recorrido ni los scripts alcanzan: tablet, orientación horizontal del celular, otros navegadores (Firefox/Safari) y lectores de pantalla. |
| La prueba escribe en la base de desarrollo | Crea y limpia datos en las bases e2e; las personas de prueba quedan dadas de baja con su historial (pagos realizados, asistencia). |

## Contrato desde «Agregar personal» (2026-11-02)
La ventana de «Agregar personal» (y «Editar personal») tiene, para el administrador, el botón **«Guardar y crear contrato →»**: guarda a la persona (y su cuenta de acceso si se pidió) y pasa, en la misma ventana, al paso 2 «Contrato». Indicador de pasos, tipos de contrato como tarjetas, atajos de fechas (Hoy, 1.º del próximo mes; 3 meses, 6 meses, 1 año, Fin de año) y un resumen en vivo (periodo, duración, sueldo, valor del día, regla de descuentos y qué falta). «Omitir por ahora» deja a la persona sin contrato y «← Datos» vuelve a editarla.

| Pendiente | Detalle |
|---|---|
| Paso «Cursos» para docentes | Si la persona es de Docencia hay un tercer paso: elige secciones y cursos del año activo (o planificado) y crea las asignaciones. Pasos: Datos → Contrato (solo administrador) → Cursos (solo docentes). La secretaría, que no hace contratos, va de Datos directo a Cursos («Guardar y asignar cursos →»). Muestra los cursos del grado que el docente puede dictar primero («Su curso»), marca los que ya tienen docente, suma las horas semanales y tiene «Elegir todos los sugeridos libres». Si una asignación falla (otro la tomó antes) dice cuál y se puede reintentar. Verificado de punta a punta con `tools/e2e/09_asignar_docente.py` (0 fallos). |
| Asignar no cambia sus «cursos que dicta» | Asignarle un curso fuera de su lista de cursos aptos funciona, pero no lo agrega a esa lista. |
| Asignar no arma horario | Solo crea docente-curso-sección; los bloques del horario se arman aparte (Horarios → Armado automático). |
| Probado en navegador (parcial) | Datos → Contrato → Cursos como administrador: guardar y seguir, vista previa, botón bloqueado sin sueldo, crear contrato, elegir sugeridos, asignar. Falta «← Datos», «Omitir», «crear cuenta» y el flujo de secretaría (ver «Verificación en navegador real»). |
| Persona guardada y contrato fallido | Si el contrato falla (p. ej. fechas que se cruzan al editar a alguien que ya tenía uno), la persona ya quedó guardada; se corrige en la misma ventana o se omite. |
| Cuenta creada y «← Datos» | Si en el paso 1 se creó la cuenta de acceso, «← Datos» no se ofrece (para no crearla dos veces); los datos de acceso se muestran al terminar el contrato. |
| Solo el administrador | La secretaría no ve el botón: los contratos son del administrador en el backend. |

## Pago al personal en tarjetas, dentro de Personal (2026-11-02)
Personal → **Pago al personal** (`/personal/pagos`, solo ADMIN): una tarjeta por persona con su contrato y periodo, la asistencia del mes elegido (presentes, tardanzas, faltas, justificadas, permisos y % de asistencia), el detalle del pago (sueldo, bonos, descuentos), el neto, lo pagado y lo que falta, con el botón **Pagar** en la misma tarjeta. Arriba: mes, «Generar planilla», totales del mes y filtros por área, estado del pago y búsqueda. Junto a ella, **Asistencia del personal** (`/personal/asistencia`, ADMIN y SECRETARIA). Ya no existe el menú «Pago al personal» de la barra superior ni las páginas «Contratos y sueldos» y «Planilla del mes» (las reemplaza la tarjeta).

| Pendiente | Detalle |
|---|---|
| Descuento por inasistencias | Valor del día = sueldo ÷ días reales del mes (28, 29, 30 o 31). Cada falta sin justificar descuenta 1 día y **cada 8 tardanzas descuentan 1 día** (las que sobran no se acumulan al mes siguiente). Las faltas justificadas y los permisos no descuentan. El botón «Descontar inasistencias» pide confirmación, solo aparece mientras el sueldo está pendiente y descuenta la **diferencia** con lo ya descontado (líneas «Descuento por inasistencias…»). Lo manda la regla del colegio; si cambia (otro divisor, otro número de tardanzas), se ajusta `TARDANZAS_POR_DIA` y `descuentoAsistencia` en `rrhh.ts`. |
| Descuento sin días laborables | El divisor son los días calendario del mes, no los días laborables ni los feriados; el sábado y el domingo cuentan para el valor del día. |
| Descuento ya descontado que ya no corresponde | Si se corrige una falta marcada por error después de descontar, el descuento ya registrado no se revierte solo: hay que quitarlo a mano en «Bonos y descuentos» (si sigue pendiente). |
| Pagar es por persona y por mes | «Pagar» marca como pagadas todas las líneas pendientes del mes (sueldo, bonos y descuentos) con un solo medio, fecha y referencia. No hay pago parcial ni por línea desde la tarjeta (sí desde «Bonos y descuentos»). |
| Contrato del mes | La tarjeta muestra el contrato que se cruza con el mes elegido; si hubo cambio de contrato a mitad de mes, solo se ve uno. El sueldo sigue sin prorratear. |
| Probado en navegador (parcial) | Tarjeta con contrato, periodo, asistencia y desglose, generar planilla, descontar inasistencia, pagar y quedar «Pagado». Faltan meses anteriores, los filtros y las ventanas «Bonos y descuentos»/«Contratos». |
| Avisos de contratos por vencer | Se ven en la tarjeta del mes en curso, pero siguen sin alerta en el inicio ni por correo. |
| Muchas personas | Las tarjetas se pintan todas a la vez (sin paginar); con cientos de personas conviene paginar o virtualizar. |

## Asistencia del personal (2026-11-02)
`planificacion-ms` V9 (`asistencia_personal`), `/api/v1/planificacion/asistencia-personal` (ADMIN y SECRETARIA, también para leer), pestaña **Personal → Asistencia del personal** (registro del día y resumen del mes) y `tools/e2e/08_asistencia_personal.py` (0 fallos).

| Pendiente | Detalle |
|---|---|
| Probado en navegador | Marcar una falta, guardar el día y ver el resumen del mes. |
| ~~403 de roles no permitidos~~ | Hecho: ver `tools/e2e/11_roles_pago_personal.py`. |
| Sin reloj marcador ni biometría | La asistencia se marca a mano; no se importa de un reloj o huella. |
| Sin horario esperado por persona | La tardanza se marca a mano: el sistema no compara la hora de entrada con un horario laboral. |
| Faltas no descuentan del sueldo | La asistencia y la planilla están separadas; no hay descuento automático por faltas o tardanzas. |
| Sin reporte exportable | El resumen del mes solo se ve en pantalla (sin Excel/PDF) y no hay resumen por rango libre. |
| Fecha del servidor | «No registrar fechas futuras» usa la fecha del servidor (`LocalDate.now()`); si el servidor está en otra zona horaria que el colegio, el límite se corre. |
| Gateway tras reiniciar un servicio | Durante ~30 s después de reiniciar `planificacion-ms` el Gateway responde 500 («Unable to find instance»): es el retraso de Eureka, no un error del servicio. |

## Cursos: docentes del curso (2026-11-02)
En Configuración → Cursos, el cuadro «Establecer curso» ahora tiene «Docentes que lo dictan»: se marcan los docentes aptos para el curso (se actualiza la lista de cursos de cada uno) y muestra en qué secciones ya se dicta.

| Pendiente | Detalle |
|---|---|
| Asignar el docente a una sección desde Cursos | Marcar a un docente solo lo deja **apto** (su `cursoIds`). Fijar el docente de una sección concreta se sigue haciendo en Horarios/Asignaciones; falta poder hacerlo desde el curso. |
| Sin probar en navegador | La selección de docentes en el cuadro de Cursos solo tiene prueba unitaria de la regla (`cambiosDocentesDeCurso`) y el build. |
| Lista limitada a 200 docentes | Cursos carga los docentes con `docentes('', 0, 200)`; con más de 200 los demás no aparecen. |

## «Mi trabajo» en los portales del docente y de caja (2026-11-02)
- Nueva pantalla `/mi-trabajo` (barra superior del docente, menú lateral de caja y un recuadro en el inicio del docente): su contrato (con aviso si vence), su asistencia del mes con el **descuento estimado** (sueldo ÷ días del mes; 8 tardanzas = 1 día), sus pagos por mes (neto, pagado/pendiente, lo cobrado en el año) y la cuenta donde le depositan (número enmascarado). Es **solo lectura**.
- Backend: `GET /api/v1/planificacion/mi-personal` (+ `/contratos`, `/pagos?periodo=`, `/cuentas`, `/asistencia?desde&hasta`). La persona sale SIEMPRE del claim `usuarioId` del token, nunca de un parámetro (poner `personalId` de otro no cambia nada). Roles ADMIN, SECRETARIA, DOCENTE y CAJERO; familias, 401 sin sesión y 404 si la cuenta no está vinculada a una ficha.
- Pruebas: `MiPersonalServiceTest` (3), `tools/e2e/13_mi_trabajo.py` (API, aislamiento entre personas, 0 fallas) y `tools/e2e/ui_mi_trabajo.sh` (navegador: docente, caja, cuenta sin ficha y celular; 15/15). Frontend 274.
- Lo que no se hizo: el docente/caja **no puede editar** su cuenta de depósito ni pedir cambios (los hace la administración); la secretaría y el administrador no tienen «Mi trabajo» aunque tengan ficha; el contrato no se puede descargar/imprimir; no hay aviso por notificación cuando se registra un pago o falta.
- Los pagos ya realizados no se pueden borrar: las pruebas dejan, como mucho, historial de una persona de prueba dada de baja.

## Páginas de las áreas de trabajo (2026-11-02)
- (Es una vista de gestión del administrador y la secretaría, no un portal para quien trabaja en el área; los portales siguen siendo docente, familia y caja.)
- Nuevo panel `/areas` (pestaña «Páginas de áreas» en Personal) con una tarjeta por área y página `/areas/:codigo` con personal, asistencia del mes, contratos/cuentas por atender, funciones, accesos y (solo ADMIN) dinero asignado y últimos movimientos.
- Las áreas que ya tenían sección propia (Académica, Docencia, Secretaría, Tesorería, Administración) no tienen página nueva: su tarjeta lleva a esa sección (`areas-paginas.ts`, `PAGINAS_PROPIAS`). Administración solo para ADMIN; la secretaría ve la página genérica.
- Funciones y accesos de las áreas están fijados por código en el frontend; un área nueva muestra su descripción y no tiene accesos hasta que se agreguen en `areas-paginas.ts`.
- «Marcar asistencia del área» y «Agregar personal» llegan con `?areaId=` / `?nuevo=1`.
- Sin recorrido en navegador real todavía para estas páginas (solo pruebas unitarias y compilación).
