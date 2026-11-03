# Diseño del frontend y funciones de cada pantalla

Inventario del frontend de EduSpace (`frontend/`) tal como está armado. Sirve de punto de partida para los cambios de diseño.
Actualizado el 2026-11-01. Las rutas y roles salen de `app.routes.ts`; los espacios de trabajo, de `layout/hubs.ts`.

## 1. Base técnica

- Angular con componentes independientes (*standalone*), carga diferida de cada pantalla (`loadComponent`) y estado con *signals*.
- Pruebas con Vitest (`npx ng test --watch=false`). Servidor de desarrollo en `http://localhost:4200`, que además hace de proxy:
  `/api` → gateway (`:18080`) y `/kc` → Keycloak (`:18090`).
- Configuración de arranque en `public/config.json`: `authMode` (`eduspace`, `keycloak` o `keycloak-form`) y datos de Keycloak.
- Roles del sistema: `ADMIN`, `SECRETARIA`, `DOCENTE`, `APODERADO`, `ALUMNO`, `CAJERO`.
  En el código se agrupan como PERSONAL (ADMIN + SECRETARIA), DOCENTE, FAMILIA (APODERADO + ALUMNO) y SOLO_ADMIN.

## 2. Estructura de carpetas (`src/app`)

| Carpeta | Contenido |
|---|---|
| `core/` | Lo que no es visual: `services/` (API y sesión), `guards/`, `interceptors/`, `models/`, `utils/`, `config/`. |
| `layout/` | La «cáscara» del portal: `shell/` (estructura), `menu.ts`, `hubs.ts`, `aula-nav.ts`. |
| `shared/` | Piezas reutilizables: `components/` (modal, toast, confirmación, cabecera de página, buscadores…) y `aula/` (tarjetas y cabeceras de curso). |
| `features/` | Una carpeta por área funcional, con sus pantallas (ver sección 6). |

## 3. Las tres «cáscaras» de la aplicación

1. **Sitio público** (`features/publico/`, sin sesión): `PublicoLayoutComponent` con cabecera y pie del colegio; envuelve inicio, nosotros, niveles, admisión, matrícula en línea, noticias y contacto.
2. **Pantallas de acceso**: `/login` (solo para quien no tiene sesión) y `/cambiar-clave` (clave temporal o cambio voluntario).
3. **Portal con sesión** (`layout/shell/ShellComponent`), que según el rol dibuja una de tres formas:

| Forma | Quién la usa | Cómo es |
|---|---|---|
| **Barra horizontal del personal** *(nueva)* | `ADMIN` y/o `SECRETARIA` | Barra fija arriba con el escudo y solo tres opciones: **Inicio**, **Personal** (personas contratadas: Áreas del personal, cuentas de acceso, usuarios y roles) y **Configuración** (información del colegio y edición de sus datos: años y periodos, feriados, aulas, secciones, cursos, malla y bloques). A la derecha, buscador (Ctrl+K), notificaciones y menú de la persona. Al abrir una opción, el contenido lleva a su izquierda un menú vertical con las pantallas de ese espacio, cada una con su ícono. Reemplaza al menú lateral para estos roles. Las demás pantallas (matrícula, horarios, asistencia y notas, finanzas, avisos…) siguen existiendo y se abren con Ctrl+K o por su ruta, hasta ubicarlas en el nuevo diseño. |
| **Barra de aula** | `DOCENTE`, `ALUMNO`, `APODERADO` (solo estos roles) | Misma barra, con enlaces cortos: Mis cursos, Horario, Asistencia, Exámenes/Notas, Pagos (solo apoderado). |
| **Menú lateral** | `CAJERO`, o quien mezcla roles (p. ej. ADMIN + DOCENTE) | Menú vertical oscuro con grupos (General, Mi trabajo, Mi familia, Ventanilla, Gestión del colegio, Administración), buscador y datos de la sesión. En móvil se abre con la hamburguesa. |

Reglas: `usaBarraPersonal(roles)` (en `menu.ts`) y `usaBarraAula(roles)` (en `aula-nav.ts`) deciden la forma; nunca coinciden. El resto del shell es común:
aviso de servicio caído, paleta de búsqueda (Ctrl+K) y contador de notificaciones sin leer (se consulta al entrar y cada minuto).

**Menú de la persona** (avatar): Mi perfil, Notificaciones, Calendario, Ayuda, Cambiar clave, Sitio del colegio y Cerrar sesión.

## 4. Navegación

- **`MENU`** (`layout/menu.ts`): grupos y elementos del menú lateral, cada uno con ruta, ícono y roles. La barra del personal reutiliza de aquí «Inicio» y los espacios de trabajo.
- **`HUBS`** (`layout/hubs.ts`): nueve **espacios de trabajo** que agrupan en pestañas las pantallas que se usan juntas: Matrícula, Aulas y secciones (panel), Cursos y docentes (panel y asignaciones), Horarios, Asistencia y notas, Finanzas, Avisos, **Personal** y **Configuración**. Una ruta solo puede estar en un espacio (lo comprueba `menu.spec.ts`). La barra de pestañas aparece sobre cualquier pantalla que figure en un espacio; `hubDe(url)` encuentra el espacio y la pestaña más específica.
- **`NAV_AULA`** (`layout/aula-nav.ts`): enlaces de la barra de aula, con `prefijos` para mantener resaltado «Mis cursos» dentro de las páginas de un curso.
- **Paleta de búsqueda (Ctrl+K)**: salta a cualquier pantalla permitida para el rol y, para el personal, busca alumnos por nombre o documento.
- **Pantalla de inicio por rol** (`core/utils/landing.ts`, ruta `/portal`): personal → `/inicio`; docente → `/docente/inicio`; familia → `/familia/inicio`; caja → `/caja`; otros → `/notificaciones`.
- **Guards**: `authGuard` (exige sesión y manda a `/cambiar-clave` si la clave es temporal), `guestGuard` (solo sin sesión), `roleGuard` (`data: { roles }`; el backend vuelve a validar), `modoGuard` (pantallas de un solo modo de autenticación; ya no lo usa ninguna ruta).

## 5. Sistema visual (`src/styles.css`)

- **Colores** (variables CSS): `--ink` (texto), `--ink-2` (secundario), `--line`, `--bg`, `--card`, `--primary` (azul `#1e40af`) con `--primary-soft`, `--ok`, `--warn`, `--danger`, `--violet` y sus versiones `-soft`. Radio base `--radius: 12px`.
- **Clases base**: `.btn` (`-primary`, `-danger`, `-sm`), `.card` / `.card-body`, `.table` (+ `.table-wrap`, `td.acciones`), `.badge` (`-ok`, `-warn`, `-danger`, `-violet`, `-gray`), `.aviso` (`-ok`, `-warn`, `-danger`), `.form-grid` / `.field`, `.input`, `.muted`, `.page` (columna con separación), `.kpis` / `.kpi`.
- **Identidad**: escudo del colegio (`/img/colegio-escudo.svg`), azul marino institucional con acentos dorados; en el sitio público, fotografías del campus.
- **Accesibilidad**: foco visible, roles ARIA en pestañas y paleta, tamaños táctiles de 44 px.

## 6. Pantallas por área

### Sitio público (sin sesión)
| Ruta | Función |
|---|---|
| `/` | Portada del colegio: banner con foto del campus, próximos eventos, niveles y noticias destacadas. |
| `/nosotros` | Presentación del colegio. |
| `/niveles` | Inicial, Primaria y Secundaria. |
| `/admision` | Proceso de admisión. |
| `/matricula-en-linea` | Trámite de matrícula en línea: registra al alumno, simula el pago y deja la matrícula por aprobar. |
| `/noticias` | Noticias del colegio. |
| `/contacto` | Datos de contacto. |

### Acceso y cuenta
| Ruta | Roles | Función |
|---|---|---|
| `/login` | sin sesión | Formulario propio de usuario y clave (con `keycloak-form` la valida Keycloak). |
| `/cambiar-clave` | con sesión | Cambia la clave: pide la actual y la nueva; obligatorio si es temporal. |
| `/mi-perfil` | todos | Cuenta de la persona y lo que puede hacer en el sistema. |
| `/notificaciones` | todos | Avisos del colegio (asistencia, notas, pagos, matrícula); marcar como leídos. |
| `/calendario` | todos | Calendario escolar: feriados, periodos y fechas importantes. |
| `/ayuda` | todos | Guías paso a paso. |

### Personal: inicio y matrícula
| Ruta | Roles | Función |
|---|---|---|
| `/inicio` | ADMIN, SECRETARIA | **Vaciado a propósito** (saludo y mensaje). El panel anterior (pendientes, indicadores, estadísticas de matrícula, pre-matrículas, aulas, cursos, accesos rápidos) está oculto con `mostrarPanel = false` en `dashboard.component.ts` y no carga datos. |
| `/matriculas` | personal | Crear, trasladar, retirar y ratificar matrículas; la pre-matrícula pasa a matrícula al pagarse. |
| `/matriculas/aprobaciones` | ADMIN | Revisar y aprobar matrículas pagadas; la familia recibe su acceso por correo. |
| `/matriculas/campanias` | personal | Campañas de matrícula (solo se matricula con una abierta). |
| `/matriculas/cupos` | personal | Vacantes por sección. |
| `/alumnos` | personal | Expediente de cada alumno: datos, apoderados, documentos, salud, estado. |
| `/alumnos/:id` | personal | Ficha del alumno (cuenta de acceso, matrícula, historial). |
| `/alumnos/importar` | personal | Carga masiva por CSV (hasta 500; cada fila se procesa por separado). |

### Personal: planificación académica
| Ruta | Función |
|---|---|
| `/configuracion` | **Resumen de configuración.** Lista, en el orden en que conviene hacerlos, los pasos para dejar el colegio funcionando (datos del colegio, grados, año y periodos, feriados, aulas, cursos, malla, secciones, bloques, áreas, personal, campaña, tarifas), con su estado (listo, pendiente, opcional, sin datos), un avance en % y un enlace a cada pantalla. La lógica está en `estado-configuracion.ts` (con pruebas). |
| `/configuracion/colegio` | **Datos del colegio:** nombre oficial y corto, lema, gestión, director(a), código modular, RUC, UGEL, dirección, distrito/provincia/departamento, teléfono, correo y sitio web (tabla `colegio`, una sola fila). Edita solo el ADMIN. |
| `/configuracion/colegio` (bloque «Pabellones y aulas») | Debajo de los datos del colegio: **pabellones** con el nombre que decida el usuario (A, B, «Central»…) y la **cantidad de aulas** de cada uno, con avance de las aulas ya registradas. Al registrar un aula se elige su pabellón y el sistema no deja pasar de las declaradas (`pabellones` + `aulas.pabellon_id`, migración V6; `/api/v1/planificacion/pabellones`). No se puede declarar menos aulas de las registradas ni eliminar un pabellón con aulas. **La cantidad declarada no crea aulas por sí sola:** al crear un pabellón hay una casilla «Crear también las aulas ahora» (con la capacidad de cada una) y, si faltan aulas, la tarjeta del pabellón muestra «Crear las N aulas» (`POST /pabellones/{id}/aulas`). Los códigos son automáticos (`A-01`, `A-02`…, saltando los ya tomados) y nacen activas, tipo AULA, con la capacidad indicada (30 por defecto). **Alumnos por aula:** el botón «Alumnos por aula» de cada pabellón abre un cuadro con todas sus aulas y cuántos alumnos entran en cada una, con «Aplicar a todas» y el total del pabellón; se guarda todo o nada (`PUT /pabellones/{id}/capacidades`) y no deja bajar un aula por debajo de las vacantes de una sección activa que la usa. La tarjeta del pabellón muestra la capacidad total en alumnos. |
| `/configuracion/grados` | **Niveles y grados:** los 14 grados posibles (Inicial 3–5 años, Primaria 1.°–6.°, Secundaria 1.°–5.°) como fichas seleccionables por nivel; los ya ofrecidos aparecen marcados y los que tienen secciones o cursos en su malla quedan bloqueados (🔒). Al tocar un grado sin elegir se abre un **cuadro para establecerlo**: cuántas secciones nacen con él (0 a 8, nombradas A, B, C…), el turno y las vacantes por sección (20 en Inicial, 30 en los demás), y, **por cada sección, su pabellón y su aula**: el selector de pabellón filtra las aulas y el de aula solo deja elegir las que se pueden usar (muestra el motivo de las que no: no alcanza para las vacantes, ya la usa otra sección en ese turno, o ya se eligió para otra sección del grado). Todo con vista previa de lo que se creará. Al «Guardar cambios» se crean los grados y, si hay año activo, sus secciones; los cursos del grado se asignan luego en Estructura académica (y el aula de una sección se puede cambiar cuando se quiera). Un grado recién elegido se puede reabrir para ajustarlo o quitarlo antes de guardar. Edita solo el ADMIN. |
| `/configuracion/areas` | **Áreas de trabajo:** crear, renombrar, activar y desactivar las áreas del personal (Docencia no se desactiva y un área con personal activo tampoco). Edita solo el ADMIN. |
| `/planificacion/anios` | **Años y periodos.** Crear y activar el año académico; **«Definir periodos» / «Cambiar régimen»:** elige bimestres (4), trimestres (3) o semestres (2) y las fechas se reparten por todo el año sin huecos (se pueden ajustar luego con «Editar»); solo se rehacen mientras ningún periodo haya empezado. |
| `/configuracion/estructura` | **Estructura académica** (Configuración). Una tarjeta por grado, agrupadas por nivel y con el color del nivel: banda con el emblema y el nombre del grado, anillo de ocupación con las cifras de alumnos y vacantes y, abajo, una burbuja por cada sección (en ámbar si tiene avisos; ⚠ si el grado tiene conflictos). Arriba, el año, el filtro de nivel y el botón de conflictos. Abajo, «Compartido entre grados» (aulas, cursos y bloques) con sus catálogos para administrar. Reúne lo que antes eran Aulas físicas, Secciones, Cursos, Malla curricular y Bloques horarios (esas rutas siguen existiendo pero ya no figuran en el menú). |
| `/configuracion/estructura/:gradoId` | **Detalle de un grado.** Se abre al pulsar su tarjeta o su nombre en el árbol del menú vertical (que lista todos los grados). Portada con el color del nivel y cuatro cifras; debajo, los datos del grado en dos columnas: alumnos matriculados, vacantes, cupos, secciones, turnos, aulas en uso, cursos y horas de la malla, docentes que dictan (y cursos sin docente), tutores, clases ya programadas en el horario y avisos. Debajo se edita: **Secciones** (alta y edición, solo ADMIN), **Cursos y docentes** (malla del grado y docente de cada curso por sección; asignar docente lo puede hacer también la SECRETARIA) y **Horario** (horas programadas frente a las que pide la malla, con enlace al editor de horarios de esa sección). |
| `/planificacion/panel` | Panel de aulas: elegir una sección y gestionar tutor, alumnos, cursos y docentes. |
| `/planificacion/secciones` | Grupos de alumnos por grado y año; la capacidad define los cupos. |
| `/planificacion/aulas` | Aulas físicas; su capacidad limita los cupos de la sección. |
| `/planificacion/cursos-docentes` | Panel de cursos: crear cursos, asignarlos a un grado y elegir docente por sección. |
| `/planificacion/cursos` | Catálogo de cursos. |
| `/planificacion/malla` | Malla curricular: cursos de cada grado y sus horas semanales. |
| `/personal` (modal «Agregar personal») | El modal tiene la casilla **«Crear también su cuenta de acceso al sistema»** (solo el ADMIN la ve, y solo si la persona aún no tiene cuenta; también aparece al editar a alguien sin cuenta). Al marcarla se elige el **rol de acceso** (Docente, Secretaría o Caja; se sugiere según el área: Docencia → Docente, Tesorería → Caja, Secretaría y Admisión → Secretaría) y se muestra el usuario previsto (`nombre.apellido`) y que la clave inicial es su documento, que debe tener 8 a 20 letras o números. Tras guardar, un cuadro muestra el usuario y la clave inicial para entregárselos. Si la cuenta falla, la persona queda registrada y se avisa cómo completarla. |
| `/personal` | **Personal por áreas** (reemplaza a «Docentes»). Una sola línea con el combo de áreas, el buscador y el botón «Agregar personal»; debajo, la tabla del personal con su área y cargo. Al elegir un área se filtra a quienes pertenecen a ella. Los docentes son el personal del área Docencia. |
| `/planificacion/asignaciones` | Qué docente dicta cada curso en cada sección. |
| `/planificacion/horarios-auto` | Armado automático de horarios sin cruces de docente, aula ni sección. |
| `/planificacion/horarios` | Horario semanal por sección (rechaza choques). |
| `/planificacion/aulas-disponibles` | Aulas libres por bloque antes de armar o mover un horario. |
| `/planificacion/bloques` | Horas de clase de cada turno. |
| `/planificacion/anios` | Años académicos (el activo lo usan matrícula, asistencia, notas y cobranza) y sus periodos. |
| `/planificacion/feriados` | Feriados (no se abren asistencias ni clases). |

### Personal: asistencia y notas
| Ruta | Función |
|---|---|
| `/asistencia/justificaciones` | Aprobar o rechazar justificaciones de inasistencia enviadas por los apoderados. |
| `/asistencia/reporte` | Asistencia por alumno en una sección y rango de fechas; marca exceso de faltas. |
| `/calificaciones/cierre` | Cierre de periodo: congela promedios por alumno y curso. |
| `/calificaciones/boletines` | Libretas: notas por curso y periodo, resultado anual y boletines oficiales. |

### Finanzas
| Ruta | Roles | Función |
|---|---|---|
| `/finanzas` | personal | Resumen: lo cobrado, lo que falta y lo que vence pronto. |
| `/pagos/cuentas` | personal | Cuotas, descuentos, mora y saldos de cada alumno. |
| `/pagos/cobranza` | personal | Pagos registrados por periodo y medio, con comprobante. |
| `/pagos/morosos` | personal | Cuotas vencidas y situaciones de cobranza a atender. |
| `/pagos/conceptos` | ADMIN | Conceptos de pago (matrícula, pensión…). |
| `/pagos/tarifas` | ADMIN | Montos y calendario de cuotas por año, nivel y grado; sin tarifa, la matrícula no genera cuotas. |
| `/pagos/descuentos` | ADMIN | Catálogo de descuentos. |
| `/caja` | CAJERO | Caja: abrir/cerrar sesión de caja, cobrar en ventanilla y emitir comprobantes. |

### Administración (ADMIN)
| Ruta | Función |
|---|---|
| `/notificaciones/envio` | Enviar comunicados, administrar plantillas de los avisos automáticos y revisar lo enviado. |
| `/cuentas` | Cuentas de acceso: crea las de alumnos, docentes y apoderados (usuario `nombre.apellido`, clave inicial = documento) y restaura la clave. Sincroniza con Keycloak. |
| `/usuarios` | Usuarios y roles: crear, editar, asignar roles, activar/desactivar, desbloquear y restablecer clave (se muestra una sola vez). |

### Docente (barra de aula)
| Ruta | Función |
|---|---|
| `/docente/inicio` | «Mis cursos»: tarjetas con alumnos matriculados, aula, turno y accesos a Notas, Asistencia, Tareas y Exámenes. |
| `/docente/curso/:seccionId/:cursoId` | Página de un curso con sus pestañas (tareas, notas, materiales…). |
| `/docente/alumnos` | Las secciones donde dicta y quiénes están matriculados. |
| `/docente/horario` | Sus clases de la semana (lo publica Secretaría). |
| `/docente/asistencia` | Pasar lista de su sección (guardar dos veces no duplica faltas). |
| `/docente/tareas`, `/docente/tareas/:id` | Crear y publicar tareas; calificar las entregas. |
| `/docente/examenes` | Armar exámenes con preguntas del banco, publicarlos y ver resultados (el tiempo lo controla el servidor). |
| `/docente/banco` | Banco de preguntas por curso (cada docente ve solo las suyas). |
| `/docente/notas` | Criterios de evaluación por curso (pesos suman 100) y registro de notas de 0 a 20. |

### Familia: apoderado y alumno (barra de aula)
| Ruta | Roles | Función |
|---|---|---|
| `/familia/inicio` | familia | «Mis cursos» del alumno (o de cada hijo). |
| `/familia/curso/:cursoId` | familia | Página de un curso: tareas, exámenes, materiales. |
| `/familia/asistencia` | familia | Asistencia del alumno; el apoderado puede justificar faltas. |
| `/familia/notas` | familia | Notas y boletines. |
| `/familia/boletines` | familia | Boletines oficiales por periodo, para descargar. |
| `/familia/horario` | familia | Horario de clases. |
| `/familia/tareas` | familia | Tareas y estado de la entrega; subir la entrega. |
| `/familia/examenes`, `/familia/examenes/:id/rendir` | familia | Rendir exámenes en línea y ver resultados. |
| `/familia/pagos` | solo APODERADO | Cuotas, pagos y comprobantes. |

## 7. Servicios y utilidades (`core/`)

**Sesión y seguridad**
- `AuthService`: sesión en los tres modos (`eduspace`, `keycloak`, `keycloak-form`): login, renovación del token (una sola a la vez), cierre de sesión, cambio de clave, roles del usuario y si debe cambiar la clave.
- `KeycloakService`: envoltorio de `keycloak-js` (login con redirección, token, cuenta y consola de administración).
- `authInterceptor`: agrega el token solo a la API propia, añade `X-Trace-ID`, renueva ante un 401 y cierra la sesión si el servidor ya no la acepta; marca el servicio como caído ante 0/502/503/504.
- `EstadoServicioService` y `AvisoServicioComponent`: franja fija cuando un módulo no responde, con reintento.
- `NotificationService` (avisos emergentes) y `ConfirmService` (confirmaciones propias, dibujadas por `app-confirm`).

**API por área**: `AlumnoService`, `MatriculaService`, `MatriculaPublicaService` (sitio público), `PlanificacionService`, `AsistenciaService`, `CalificacionService`, `TareaService`, `ExamenService`, `MaterialService` (archivos con URL firmada), `CobroService` (cobros, caja, comprobantes), `PagoConfigService` (conceptos, tarifas, descuentos, alertas, morosos), `NotificacionService` (bandeja y contador), `UsuarioService` y `CuentasService` (usuarios y cuentas de acceso).

**Contextos**: `DocenteContextoService` (quién es el docente, año/periodo activo y qué cursos dicta; se carga una vez), `FamiliaContextoService` (hijo seleccionado y su matrícula vigente), `NombresAlumnoService` (resuelve nombres a partir de ids).

**Utilidades**: `rutaInicial` (inicio por rol), `mensajeError` (error HTTP → texto legible), `uuid`, `crypto-polyfill` (SHA-256 para PKCE cuando no hay Web Crypto), `publicas` (rutas del sitio público).

## 8. Componentes compartidos (`shared/`)

| Componente | Función |
|---|---|
| `PageHeaderComponent` | Título de página con subtítulo y espacio a la derecha para acciones. |
| `ModalComponent` | Diálogo modal; el contenido se proyecta y los botones van en `footer`. |
| `ToastComponent` | Avisos emergentes (los alimenta `NotificationService`). |
| `ConfirmComponent` | Cuadro de confirmación (lo usa `ConfirmService`). |
| `BuscadorAlumnoComponent` | Búsqueda de alumnos por nombre, código o documento. |
| `SelectorHijoComponent` | Botones para elegir de qué hijo se ven los datos (no aparece con un solo hijo). |
| `AvisoServicioComponent` | Franja de «servicio sin conexión». |
| `aula/CursoTarjetaComponent`, `CursoCabeceraComponent`, `PestanasCursoComponent`, `MaterialesCursoComponent` | Tarjeta de curso, cabecera de la página de un curso, pestañas internas con contador de pendientes y lista de materiales. `curso-visual.ts` da a cada curso su color e ícono estable; `nombres.ts` convierte «Apellidos, Nombres» en «Nombres Apellidos». |

Componentes de apoyo de `features/dashboard/` que reutilizan los paneles de Aulas y de Cursos: `AulasPanelComponent`, `CursosDocentesComponent`, `SeccionFormComponent`, `AsignarDocenteComponent`, `MatricularEnSeccionComponent`, `TrasladarAlumnoComponent`.

## 9. Qué más falta poder configurar (hallazgos de la revisión de módulos)

Revisados los servicios, esto es lo que hoy **no** se puede editar desde la aplicación y haría falta para configurar todo el colegio:

| Módulo | Falta | Situación actual |
|---|---|---|
| Calificaciones | Escala de notas (literales AD/A/B/C), nota mínima aprobatoria y parámetros de evaluación | Existen las tablas `escalas_literales` y `parametros_evaluacion` y están cargadas, pero **no hay ningún endpoint** para leerlas ni editarlas |
| Asistencia | Umbral de faltas (el reporte marca «exceso de faltas»), tolerancia de tardanza | Sin endpoint de configuración |
| Pagos | Series de comprobante (B001, R001), mora o interés por atraso, día de vencimiento por defecto | `series_comprobante` sin endpoint; mora sin configuración |
| Matrícula | Lista de requisitos de matrícula (documentos exigidos) | Los requisitos se guardan por matrícula, sin catálogo editable |
| Horarios | Días de clase por semana | Fijo en 5 en el generador de horarios |
| Institución | Logo y colores | No hay dónde subirlos (el escudo está fijo en `public/img`) |
| Notificaciones | Plantillas de avisos | Ya se editan, en el espacio «Avisos» |
| Seguridad | Roles y permisos finos | Roles fijos (ADMIN, SECRETARIA, DOCENTE, APODERADO, ALUMNO, CAJERO) |

El *Resumen de configuración* ya mide lo que sí se puede configurar; estos puntos requieren primero un endpoint en su servicio.

## 10. Historial de cambios de diseño

- **2026-11-01 · Barra horizontal del personal.** ADMIN y SECRETARIA pasan del menú lateral a una barra superior con Inicio y los ocho espacios de trabajo (`shell.component.*`, `menu.ts`, tests en `menu.spec.ts`). Para volver al menú lateral basta con que `usaBarraPersonal` devuelva `false`.
- **2026-11-01 · Barra reducida a Inicio, Personal y Configuración.** Se crearon los espacios `personal` (Docentes, Cuentas de acceso, Usuarios y roles) y `configuracion` (Años y periodos, Feriados, Aulas físicas, Secciones, Cursos, Malla curricular, Bloques horarios) moviendo esas pestañas desde Aulas y secciones, Cursos y docentes, Horarios, Año escolar (que desaparece) y Avisos y cuentas (que pasa a llamarse «Avisos»). La SECRETARIA ve Docentes en Personal y toda Configuración; cuentas y usuarios son solo del ADMIN.
- **2026-11-01 · Cuenta de acceso al agregar personal.** El modal de personal ofrece, como casilla opcional, crear la cuenta de la persona en el mismo paso (`CuentasService.crearParaPersonal`: crea la cuenta en auth-ms, que la sincroniza con Keycloak, y la vincula a la ficha). Lógica y reglas en `features/personal/cuenta-personal.ts`.
- **2026-11-01 · Alumnos por aula, donde se crean los pabellones.** Cada pabellón tiene «Alumnos por aula»: edición de la capacidad de cada salón (o la misma para todos) en el mismo lugar donde se crea el pabellón. Backend: `PUT /api/v1/planificacion/pabellones/{id}/capacidades` (solo ADMIN, transaccional) y `capacidadAlumnos` en la respuesta del pabellón.
- **2026-11-01 · Aulas reales para los pabellones.** Se comprobó que los pabellones A, B y C declaraban 10 aulas cada uno pero tenían 0 registradas, por lo que el selector de aula de una sección salía vacío al elegir un pabellón. Ahora las aulas declaradas se pueden crear (al dar de alta el pabellón o con «Crear las N aulas»), y el modal de establecer un grado explica por qué no hay aulas cuando el pabellón elegido aún no las tiene.
- **2026-11-01 · Aula destacada y modal para establecer un grado.** En la tarjeta del grado cada sección es ahora una fila: la burbuja, el aula en una etiqueta grande con ícono de puerta y color del nivel (o «Sin aula asignada» en ámbar con borde discontinuo) y, a la derecha, el pabellón y el turno. En Niveles y grados, elegir un grado nuevo abre un modal (secciones, turno y vacantes) y la creación de las secciones se hace al guardar.
- **2026-11-01 · Aula en la tarjeta del grado y pabellones.** La tarjeta del grado muestra bajo cada burbuja de sección su aula (código y pabellón; «Sin aula» en ámbar si falta), y el detalle del grado y el formulario de secciones indican también el pabellón del aula. En Datos del colegio se añadió el bloque de pabellones (nombre libre y cantidad de aulas); en Aulas, el selector de pabellón y su columna.
- **2026-11-01 · Configuración completa y ordenada.** Tras revisar cada módulo, Configuración queda con un menú vertical **con encabezados de grupo**: *Resumen* · **El colegio** (Datos del colegio, Niveles y grados, Estructura académica) · **Año escolar** (Años y periodos, Feriados) · **Personal** (Áreas de trabajo) · **Matrícula** (Campañas de matrícula) · **Cobranza** (Conceptos de pago, Tarifas, Descuentos). Campañas y tarifas se movieron desde Matrícula y Finanzas porque son configuración. Backend (planificacion-ms): migración `V5__datos_del_colegio.sql`; `GET/PUT /colegio`; `GET/PUT /grados/oferta` (la oferta estándar de 14 grados, que no deja quitar uno en uso y no aplica nada si alguno falla); `POST/PUT/PATCH` de `/areas` (`GET ?todas=true` incluye inactivas); `GET /grados` ahora solo devuelve los grados activos, así que ninguna pantalla ofrece uno desactivado. Frontend: portada compartida `ConfigHeroComponent`, un color por pantalla y rejilla de dos columnas (`.cfg-dos` / `.cfg-bloque` en `styles.css`).
- **2026-11-01 · Rediseño de las tarjetas, del detalle y árbol de grados.** Cada nivel tiene su color (`.n-inicial` ámbar, `.n-primaria` azul, `.n-secundaria` violeta, `.n-otro` verdeazulado, en `styles.css`) y se usa en el árbol, las tarjetas y el detalle. **Tarjeta:** banda de color con emblema (la edad en Inicial, «1°»… en el resto), anillo de ocupación, cifras de alumnos y vacantes, y una burbuja por sección (con borde ámbar si tiene avisos). **Detalle:** portada de color con el emblema, el anillo y cuatro cifras (alumnos, vacantes, secciones, cursos); los datos en cuatro grupos repartidos en **dos columnas** (Matrícula, Estructura, Académico, Horario y avisos); Secciones y Horario lado a lado, y Cursos y docentes a todo el ancho. **Árbol del menú vertical:** al abrir «Estructura académica» (o cualquiera de sus grados) se despliegan **todos los grados del colegio, agrupados por nivel**, con una flecha en la opción; `ArbolEstructuraService` lee los grados una vez y la opción padre solo se resalta cuando no hay un grado abierto. Sustituye al servicio anterior de «grados abiertos».
- **2026-11-01 · Estructura académica en una sola pestaña.** Configuración queda con tres: Años y periodos, Feriados y **Estructura académica** (`/configuracion/estructura`, `features/configuracion/estructura/`). La pantalla une aulas, secciones, cursos (malla) y bloques por grado y detecta conflictos con `conflictos.ts` (con pruebas): sección sin aula, capacidad mayor que la del aula, misma aula en el mismo turno para dos secciones, turno sin bloques de clase, malla con más horas que los bloques de la semana (bloques de clase × 5 días), grado con secciones y sin cursos, curso inactivo en una malla, aula inactiva en uso. Qué no se une por grado: las aulas (una puede servir a varios grados en turnos distintos), el catálogo de cursos (un curso está en varias mallas) y los bloques (son del turno, no del grado); por eso van en «Compartido entre grados».
- **2026-11-01 · Áreas de trabajo y «Personal por áreas».** La pestaña «Docentes» de Personal se reemplaza por «Áreas» (`/personal`, `features/personal/`). Backend (planificacion-ms): migración `V4__areas_de_trabajo.sql` con la tabla `areas` (14 áreas: Dirección general, Coordinación académica, Docencia, Auxiliares de educación, Psicología y tutoría, Secretaría académica, Admisión y comunicaciones, Tesorería y caja, Administración y recursos humanos, Tecnología e informática, Biblioteca y laboratorios, Tópico y salud, Seguridad, Mantenimiento y limpieza); `docentes` pasa a ser el registro de todo el personal con `area_id` y `cargo`. `GET /api/v1/planificacion/areas` lista el catálogo; `GET /docentes` sin parámetros sigue devolviendo solo Docencia (los selectores de docente y tutor no cambian), con `areaId` filtra por área y con `todas=true` devuelve a todos. Solo el área Docencia puede dictar cursos, ser tutor o entrar al armado automático de horarios.
- **2026-11-01 · Menú vertical con íconos.** Las pestañas de cada espacio de trabajo (Personal, Configuración, Matrícula…) dejan de ser una franja horizontal y pasan a un **menú vertical a la izquierda del contenido**, con un ícono por opción (`Pestana.icono` en `hubs.ts`; estilos `.menu-v*` en `shell.component.css`). Es fijo al desplazarse; en pantallas de menos de 900 px pasa arriba como una fila deslizable. Solo aplica a la barra superior del personal: el menú lateral de caja y de roles mezclados conserva sus pestañas horizontales.
- **2026-11-01 · Inicio vaciado.** `/inicio` muestra solo el saludo; el panel anterior queda oculto (`mostrarPanel = false`).
