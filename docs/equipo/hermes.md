# Hermes — planificación, alumnos y notificaciones

Servicios a cargo: **`planificacion-ms`**, **`alumnos-ms`**, **`notificaciones-ms`**. También mantiene `auth-ms` como pieza de infraestructura.
Son la base del sistema: planificación es la *fuente de verdad* del año escolar (casi todos los demás la consultan), alumnos guarda el
expediente de cada persona y notificaciones es el único servicio que habla con las familias.

Pruebas automáticas aproximadas: planificación 68 · alumnos 38 · notificaciones 36. *(Actualizado al 2026-11-03.)*

---

## 1. `planificacion-ms` (puerto 8091 · `planificacion_db` · 15441)

**Para qué sirve.** Define *cómo está organizado el colegio en un año*: qué año está activo, qué periodos tiene, qué grados y secciones hay, qué aulas existen,
qué cursos se dictan en cada grado, qué docente dicta cada curso en cada sección y cuándo (horario).

| Área | Qué hace | Endpoints principales (`/api/v1/planificacion/…`) |
|---|---|---|
| Año y periodos | Un solo año ACTIVO; periodos (bimestres/trimestres) con estado | `anios`, `anios/activo`, `PATCH anios/{id}/activar\|cerrar`, `periodos`, `PATCH periodos/{id}/estado` |
| Niveles y grados | Catálogo (Inicial, Primaria, Secundaria). Inicial se nombra por edad: «3 años», «4 años», «5 años» | `niveles`, `grados` |
| Secciones | Grado + letra + turno + capacidad + aula + tutor | `secciones` (CRUD) |
| Aulas | Aulas físicas, tipo y capacidad | `aulas` (CRUD) |
| Cursos y malla | Catálogo de cursos y horas semanales por grado; carga en lote | `cursos`, `malla/grado/{id}`, `malla`, `malla/lote` |
| Docentes | Ficha, especialidad, vínculo con su usuario | `docentes`, `docentes/mi`, `PATCH docentes/{id}/usuario` |
| Asignaciones | Docente ↔ curso ↔ sección (una por curso/sección) | `asignaciones`, `PATCH asignaciones/{id}/docente` |
| Bloques horarios | Franjas del día y recesos, por turno | `bloques` (CRUD) |
| Horarios | Clases por sección; rechaza choques de docente, aula y sección; publicación versionada | `horarios/seccion/{id}`, `horarios/docente/{id}`, `horarios/anio/{id}`, `horarios` (POST/PUT/DELETE), `horarios/validar/{id}`, `horarios/publicar/seccion/{id}` |
| **Armado automático** | Genera el horario de varias secciones a la vez sin cruces | `GET horarios/preparacion`, `POST horarios/generar` (con `simular=true` no guarda) |
| Feriados | Días no hábiles (los usa asistencia) | `feriados`, `feriados/es-habil` |
| Colegio y pabellones | Datos del colegio (ficha única) y pabellones donde se agrupan las aulas | `colegio`, `pabellones` (CRUD) |
| Áreas de trabajo | Áreas del personal (Docencia, administración…); cada persona pertenece a una | `areas` (CRUD) |
| Personal, contratos y pagos | Contrato por persona (renovar, rescindir), pagos, planilla mensual, cuentas de depósito. Solo ADMIN | `rrhh/contratos`, `rrhh/pagos`, `rrhh/planilla/{AAAA-MM}`, `rrhh/cuentas` |
| Asistencia del personal | Una marca por persona y día; ADMIN y SECRETARIA | `asistencia-personal` (GET rango, `PUT /dia`) |
| Mi trabajo | Lo propio de quien inicia sesión (contrato, pagos, asistencia, cuenta). Solo lectura | `mi-personal`, `/contratos`, `/pagos`, `/cuentas`, `/asistencia` |
| Internos | Para otros servicios (con `X-Service-Token`) | `/internal/secciones`, `/internal/anios/activo`, `/internal/periodos`, `/internal/cursos`, `/internal/docentes/usuario/{id}/asignaciones`, `/internal/asignaciones/validar` |

**Tablas:** `anios_academicos`, `periodos`, `niveles`, `grados`, `secciones`, `aulas`, `cursos`, `grado_cursos` (malla), `docentes`, `asignaciones`,
`bloques_horarios`, `horarios`, `publicaciones_horario`, `feriados`, `outbox_eventos`, y desde las migraciones nuevas: `areas`, `colegio`, `pabellones`, `docente_cursos`,
`contratos_personal`, `pagos_personal`, `asistencia_personal`, `cuentas_deposito_personal`.

**Eventos que publica:** `horario.publicado`, `anio.activado`, `periodo.cambiado` (estos dos aún no los consume nadie). **No consume ninguno.**

**Reglas importantes**
- Un horario no admite: docente en dos secciones a la misma hora, aula ocupada dos veces, sección con dos clases a la vez, un bloque de otro turno, un receso, ni un aula con menos aforo que la sección. La validación de la sección además marca los cursos con horas faltantes o sobrantes respecto de la malla.
- Una sección no se crea repetida (año + grado + letra), no admite un tutor que no sea docente activo, ni se elimina si tiene cursos asignados; un año CERRADO es de solo lectura.
- Permisos: horarios, asignaciones y docentes los edita ADMIN y SECRETARIA; el resto de planificación solo ADMIN.

**Personal, contratos y pagos (nuevo).**
- *Áreas y cursos del docente.* Cada persona del personal pertenece a un área (V4); solo Docencia puede tener cursos (`docente_cursos`, V7; `cursoIds` en la ficha: `null` = no tocar, `[]` = quitar; otra área con cursos → 409). Los cursos elegidos mandan sobre la especialidad escrita en el armado automático.
- *Contratos (V8).* Un solo contrato vigente por persona; para continuar se **renueva** (inicio = fin anterior + 1 día, hereda tipo, cargo y sueldo; solo el último no rescindido con fin). No se cruzan fechas; el fin es obligatorio salvo INDEFINIDO; un contrato rescindido no se edita. Quien tiene contratos, pagos o asistencia se da de baja, no se borra.
- *Pagos y planilla.* `planilla/{AAAA-MM}` genera **un** sueldo pendiente por persona y mes (el contrato que cubre más días, sin duplicar); descuentos y adelantos restan; un pago ya pagado no se borra.
- *Cuentas de depósito (V10).* Varias por persona, una sola principal (la primera; si se quita, se promueve la más antigua); banco con cuenta de 8–20 dígitos y CCI de 20, o billetera Yape/Plin con celular de 9 dígitos; sin duplicados.
- *Asistencia (V9).* Una fila por persona y día; el registro del día es todo o nada; FALTA/JUSTIFICADA/PERMISO no llevan horas; no admite fechas futuras ni personas de baja.
- *Mi trabajo.* La persona sale **siempre** del claim `usuarioId` del JWT, nunca de un parámetro; 404 si la cuenta no tiene ficha. Roles ADMIN, SECRETARIA, DOCENTE y CAJERO.
- *Permisos.* `rrhh/**` solo ADMIN (también lectura); `asistencia-personal` ADMIN y SECRETARIA; reglas explícitas en `SecurityConfig` antes de la regla general de GET.
- *Descuento por inasistencias (en el frontend, `rrhh.ts`).* Valor del día = sueldo ÷ días reales del mes; faltas sin justificar + 1 día por cada 8 tardanzas, con tope en el sueldo; justificadas y permisos no descuentan.

**Armado automático (trabajo reciente).** `horario/PlanificadorHorario` resuelve el problema por secciones: cada clase ocupa un espacio día × bloque; las
restricciones duras (docente, aula, sección libres) nunca se violan; usa un orden por dificultad (MRV) con búsqueda local y lista tabú, con semilla fija
(2026) para que el resultado sea repetible. `HorarioGeneradorServiceImpl` prepara el problema, asigna docentes por especialidad si se pide
(`asignarDocentes`) y guarda; la *simulación* usa el mismo código y hace `setRollbackOnly`. Resultado en Primaria: 12 secciones, 288 clases, 0 cruces.
Pruebas: `PlanificadorHorarioTest`, `AsignacionPorEspecialidadTest`.

**Horario del docente (nuevo, solo frontend).** *Configuración → Personal → Horario del docente* (`/configuracion/horarios`, ADMIN y SECRETARIA): lista de docentes con su avance
(«Sin horario», «Incompleto», «Completo», «N de M h») y su semana en una grilla de rectángulos por turno. Se seleccionan rectángulos vacíos y se pone una clase de un curso que el
docente ya tiene o se le asigna un curso nuevo en el mismo paso. Usa las mismas APIs y tabla que «Horario por sección» (no hubo cambios de backend) y bloquea de antemano lo que el servidor
rechazaría (turno, sección ocupada, horas completas). Código en `features/configuracion/horarios/`. No arrastra clases ni publica el horario.

**Cursos y cobertura por sección (nuevo, solo frontend).** *Configuración → Cursos*: el cuadro del curso suma «Secciones donde se dicta», con un docente por sección (crea, cambia o quita la asignación al guardar).
La etiqueta se calcula por sección: **Con docente** (todas), **Faltan secciones** (algunas), **Sin asignar** (hay aptos pero ninguna sección), **Sin docente** (nadie puede dictarlo).

**Pantallas del frontend relacionadas** (espacios *Aulas y secciones*, *Cursos y docentes*, *Horarios*, *Año escolar*, *Personal*, *Configuración*):
Panel de aulas · Secciones · Aulas físicas · Panel de cursos · Cursos · Malla curricular · Docentes · Asignaciones · Armado automático ·
Horario por sección · Horario del docente · Aulas disponibles · Bloques horarios · Años y periodos · Feriados.
De personal: **Agregar personal** (Datos → Contrato → Cuenta de depósito → Cursos; el cargo y los cursos se piden una sola vez y la secretaría hace solo Datos → Cursos), Asistencia del personal, Pago al personal,
Áreas de trabajo y **Mi trabajo** (`/mi-trabajo`). Código en `frontend/src/app/features/planificacion/`, `…/personal/`, `…/configuracion/` y `…/dashboard/`.

**Migraciones:** `V1` (esquema), `V2` (outbox), `V3` (Inicial por edad), `V4` (áreas de trabajo), `V5` (datos del colegio), `V6` (pabellones), `V7` (cursos del docente), `V8` (contratos y pagos), `V9` (asistencia del personal), `V10` (cuentas de depósito).

---

## 2. `alumnos-ms` (puerto 8092 · `alumnos_db` · 15442)

**Para qué sirve.** Es el expediente de la persona: datos del alumno, sus apoderados, sus documentos y su ficha de salud.

| Área | Qué hace | Endpoints (`/api/v1/…`) |
|---|---|---|
| Alumno | Alta/edición, búsqueda por nombre o documento, cambio de estado con historial, vínculo con su usuario | `alumnos`, `alumnos/{id}`, `PATCH alumnos/{id}/estado`, `alumnos/{id}/estado/historial`, `PATCH alumnos/{id}/usuario`, `alumnos/mios` |
| Apoderados | Datos, parentesco, apoderado principal y responsable de pago | `apoderados`, `alumnos/{id}/apoderados` (POST/PUT/DELETE), `apoderados/{id}/hijos` |
| Documentos | Expediente en MinIO con URL firmada, verificación | `alumnos/{id}/documentos`, `…/descarga`, `PATCH …/verificado` |
| Salud | Ficha cerrada por defecto (datos sensibles de menores) | `alumnos/{id}/salud` |
| Importación | Carga masiva por CSV | `POST alumnos/importacion` (CSV, multipart) / pantalla «Importar alumnos» |
| Internos | Para matrícula, pago, notificaciones, asistencia… | `/internal/alumnos/{id}`, `…/contactos`, `…/expediente-completo`, `…/responsable-pago`, `…/usuario/{id}`, `…/lote`, `/internal/apoderados/usuario/{id}/alumnos` |

**Tablas:** `alumnos`, `apoderados`, `alumno_apoderado`, `alumno_documentos`, `alumno_salud`, `alumno_estado_historial`, `outbox_eventos`.
**Eventos:** publica `alumno.registrado`, `alumno.estado-cambiado` (nadie los consume aún). No consume.
**Reglas:** DNI único; el DNI y los datos de salud no se exponen a quien no corresponde; un apoderado solo ve a sus hijos (se valida con `/internal/apoderados/usuario/{id}/alumnos`).
**Pantallas:** *Matrícula → Alumnos* (lista, expediente, documentos, apoderados, salud) e *Importar alumnos*.
**Pendiente:** que salud valide «solo tutor y docentes de la sección» consultando a matrícula; cifrado en reposo (Ley 29733).

---

## 3. `notificaciones-ms` (puerto 8099 · `notificaciones_db` · 15449)

**Para qué sirve.** Convierte eventos del sistema (y envíos manuales del administrador) en avisos para las personas: bandeja dentro de la app, correo y push.

| Área | Qué hace | Endpoints (`/api/v1/notificaciones/…`) |
|---|---|---|
| Bandeja | Mis avisos, conteo de no leídos, marcar leídos | `mias`, `mias/no-leidas/conteo`, `PATCH {id}/leida`, `PATCH mias/leer-todas` |
| Preferencias y push | Canales por tipo, dispositivos | `preferencias`, `dispositivos` |
| Plantillas | Texto de cada tipo de aviso; las 15 del sistema no se pueden borrar (409) | `plantillas` (GET/POST/PUT/DELETE) |
| Envío manual | El ADMIN elige destinatarios y envía | `enviar` |
| Administración de avisos | Listar con filtros, editar, eliminar | `admin` (GET), `admin/{id}` (PUT/DELETE) |

**Tablas:** `notificaciones`, `plantillas_notificacion`, `preferencias_notificacion`, `dispositivos_push`, `intentos_envio`, `eventos_procesados`, `shedlock`.
**Consume (16 tópicos):** `matricula.creada/confirmada/anulada`, `pago.confirmado/vencido/por-vencer`, `asistencia.falta-registrada`, `tarea.publicada/recordatorio/calificada`, `material.publicado`,
`examen.publicado/calificado`, `boletin.generado`, `horario.publicado`, `justificacion.resuelta`. **No publica.**
**Reglas:** anti-duplicado por `eventos_procesados`; resuelve destinatarios con `alumnos-ms` (Feign con circuit breaker); reintentos de envío; el push usa un `LogPushSender` (no hay FCM real).
**Pantallas:** *Notificaciones* (bandeja, todos los roles) y *Avisos y cuentas → Avisos y plantillas* (ADMIN: enviar con selector de destinatarios —docentes, familias de una sección, alumnos concretos o por número de usuario—, plantillas y avisos enviados).
**Pendiente:** FCM/SMS/WhatsApp; apoderado sin cuenta (hoy `usuario_id` es obligatorio); vincular cuentas (`usuarioId`) a alumnos y docentes para que los avisos lleguen.

---

## 4. `auth-ms` (infraestructura, puerto 8090 · `auth_db` · 15440)
**Interno (nuevo):** `POST /internal/cuentas` crea la cuenta de una persona (token de servicio); lo usa la matrícula en línea. `alumnos-ms` suma `POST /internal/alumnos` y los vínculos `POST /internal/alumnos|apoderados/{id}/usuario`; `notificaciones-ms`, `POST /internal/correos` (HTML + adjuntos por SMTP); `planificacion-ms`, `GET /internal/horarios/seccion/{id}`.
**Cuentas de personas (nuevo):** `POST /api/v1/auth/usuarios/cuentas` (usuario `nombre.apellido`, clave inicial = documento, cambio obligatorio) y `POST /api/v1/auth/usuarios/{id}/restablecer-por-documento` (restaura la clave al documento; rechaza ADMIN). Pantalla: *Avisos y cuentas → Cuentas de acceso*. Ver `docs/sistema/alumnos-y-acceso.md`.

Login propio, JWT RS256 + JWKS, refresh con rotación, bloqueo por intentos, cambio de clave y administración de usuarios/roles (`ADMIN`, `SECRETARIA`, `DOCENTE`, `ALUMNO`, `APODERADO`, `CAJERO`).
En DEV el emisor por defecto es Keycloak (`infra/keycloak/`); en PROD `auth-ms`. Tablas: `usuarios`, `roles`, `usuario_roles`, `refresh_tokens`.

## 5. Dónde está el código
`services/planificacion-ms`, `services/alumnos-ms`, `services/notificaciones-ms`, `services/auth-ms` · configuración en `infra/eduspace-config/config-repo/` · SQL de referencia en `sql/` · informes originales en `docs/02-hermes-…/`.
