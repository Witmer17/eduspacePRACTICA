# 🗺️ MAPA DE VISTAS DE FRONTEND — GUÍA DE PRÁCTICA

Este mapa te indica **dónde se ubica cada vista**, **a quién le toca**, **qué archivos crear**, y **con qué microservicio backend se comunica**.

---

## 🧭 Resumen de Asignación de Carpetas

| Carpeta en `features/` | Responsable | Microservicio Backend | Propósito |
| :--- | :---: | :--- | :--- |
| **`01-auth/`** | 👤 **HERMES** | `auth-ms` (:8090) | Autenticación, JWT, usuarios y roles del colegio |
| **`02-planificacion/`** | 👤 **HERMES** | `planificacion-ms` (:8091) | Años escolares, grados, secciones, cursos, aulas y horarios |
| **`03-alumnos/`** | 👤 **HERMES** | `alumnos-ms` (:8092) | Padrón de alumnos, apoderados e importación masiva |
| **`04-matriculas/`** | 👤 **ANDRE** | `matricula-ms` (:8093) | Campañas, cupos, solicitudes de matrícula y constancias PDF |
| **`05-asistencia/`** | 👤 **ANDRE** | `asistencia-ms` (:8094) | Registro diario en aula, justificaciones y reportes |
| **`06-tareas/`** | 👤 **ANDRE** | `tareas-ms` (:8098) | Publicación de tareas por docente y entregas de estudiantes |
| **`07-notificaciones/`** | 👤 **HERMES** | `notificaciones-ms` (:8099) | Bandeja de entrada y avisos masivos institucionales |
| **`08-caja-pagos/`** | 👤 **WITMER** | `pago-ms` (:8096) | Ventanilla de cobro, recibos R001, pensiones, cobranza y morosos |
| **`09-examenes/`** | 👤 **WITMER** | `examenes-ms` (:8097) | Banco de preguntas, creación de exámenes y portal para rendir |
| **`10-calificaciones/`** | 👤 **WITMER** | `calificaciones-ms` (:8095) | Registro de notas por competencias, actas y libretas escolares |
| **`11-portal-publico/`** | 🌐 **COMPARTIDO** | Frontend público | Página web del colegio (Inicio, Admisión, Nosotros, Contacto) |
| **`12-comun/`** | 🌐 **COMPARTIDO** | Varios | Dashboard principal por rol, ayuda, calendario y mi-trabajo |

---

## 👤 1. HERMES — Módulos y Carpetas

### `features/01-auth/`
* `login/` → `login.component.ts`, `login.component.html` (Formulario de inicio de sesión con usuario y contraseña)
* `cambiar-clave/` → `cambiar-clave.component.ts`, `cambiar-clave.component.html` (Obligatorio en primer inicio o reseteo)
* `usuarios/` → `usuarios.component.ts`, `usuarios.component.html` (CRUD de cuentas: admin, docente, cajero, apoderado)
* `perfil/` → `perfil.component.ts`, `perfil.component.html` (Mi perfil de usuario y foto)

### `features/02-planificacion/`
* `anios/` → Gestión de años lectivos (ej. 2026) y periodos (bimestres/trimestres)
* `secciones/` → Aulas por grado (ej. 1° Primaria - Sección A, B)
* `cursos/` → Malla de asignaturas (Matemática, Comunicación, Ciencias)
* `aulas/` → Ambientes físicos (Pabellón A, Aula 101, Laboratorio)
* `horarios/` → Generación automática y visualización de horarios semanales
* `feriados/` → Calendario cívico y días no laborables
* `malla/` → Malla curricular por nivel educativo
* `apertura/` → Asistente guiado de apertura del año escolar
* `configuracion/` → Datos del colegio, RUC, dirección y parámetros MINEDU

### `features/03-alumnos/`
* `lista-alumnos/` → Tabla general de búsqueda de estudiantes con filtros
* `alumno-detalle/` → Ficha integral médica, académica y familiar del alumno
* `importar-alumnos/` → Carga masiva mediante archivo Excel (.xlsx / .csv)
* `apoderados/` → Directorio de padres de familia y tutores legales

### `features/07-notificaciones/`
* `bandeja/` → Bandeja de entrada de avisos y notificaciones en tiempo real
* `envio-admin/` → Formulario para que secretaría/director envíe comunicados por email o sistema

---

## 👤 2. ANDRE — Módulos y Carpetas

### `features/04-matriculas/`
* `matriculas/` → Listado de matrículas registradas y seguimiento de estado
* `asistente-matricula/` → Asistente paso a paso (wizard) para matricular a un estudiante
* `campanias/` → Campañas de matrícula ordinaria y extraordinaria
* `cupos/` → Control de vacantes disponibles por grado y sección
* `aprobaciones/` → Bandeja de revisión de solicitudes online para admitir o rechazar
* `documentos/` → Generación y descarga de constancias de matrícula y contratos en PDF

### `features/05-asistencia/`
* `docente-asistencia/` → Pantalla táctil rápida para que el profesor pase lista en clase (Presente, Falta, Tardanza)
* `justificaciones/` → Aprobación de cartas médicas o motivos de fuerza mayor
* `reporte-asistencia/` → Reporte mensual de inasistencias y porcentaje de asistencia
* `familia-asistencia/` → Vista para que los padres vean las faltas de sus hijos
* `personal-asistencia/` → Control de marcaciones del personal docente y administrativo

### `features/06-tareas/`
* `docente-tareas/` → Publicar tareas escolares con fecha de vencimiento y adjuntos
* `tarea-entregas/` → Bandeja de revisión de tareas de los alumnos y calificación
* `familia-tareas/` → Vista del estudiante para ver pendientes y subir su archivo de entrega

---

## 👤 3. WITMER — Módulos y Carpetas

### `features/08-caja-pagos/`
* `ventanilla-caja/` → Pantalla principal de cobro en ventanilla: ingreso de DNI/código, selección de cuotas, cobro (Efectivo/Yape/Plin), emisión e impresión del recibo oficial (`R001-00000019`), arqueo y cierre de caja.
* `cuentas-alumnos/` → Estado de cuenta corriente de cada estudiante (pagos realizados y deuda pendiente).
* `cobranza-morosos/` → Lista de deudores morosos y cartas de cobranza preventiva.
* `conceptos/` → Catálogo de conceptos de cobro (Matrícula, Pensión mensual, Cuota de ingreso, Certificado).
* `tarifas/` → Costos fijados por grado y nivel para el año lectivo.
* `descuentos/` → Políticas de descuento (hermanos, becas académicas, pronto pago).
* `finanzas-dashboard/` → Métricas y gráficos de recaudación diaria, mensual y acumulada.
* `familia-pagos/` → Portal web del padre de familia para consultar sus cuotas y descargar sus boletas en PDF.

### `features/09-examenes/`
* `docente-examenes/` → Creación de evaluaciones con fecha de inicio, fin y límite de tiempo en minutos.
* `banco-preguntas/` → Repositorio de preguntas (opción múltiple, verdadero/falso, desarrollo).
* `familia-examenes/` → Lista de exámenes asignados al alumno.
* `rendir-examen/` → Interfaz de examen para el alumno con temporizador regresivo y envío automático.

### `features/10-calificaciones/`
* `docente-notas/` → Registro de calificaciones por criterios y competencias pedagógicas del MINEDU.
* `cierre-periodo/` → Proceso de cierre de bimestre/trimestre con bloqueo de modificaciones.
* `boletines/` → Generador masivo de libretas escolares oficiales en PDF con promedio y puesto.
* `familia-notas/` → Consulta en vivo de notas por los padres y descarga del boletín.

---

## 🌐 4. COMPARTIDO — Portales Institucionales

### `features/11-portal-publico/`
* `inicio/` → Página de bienvenida del colegio con banners y noticias
* `nosotros/` → Misión, visión, valores e historia institucional
* `niveles/` → Información de Inicial, Primaria y Secundaria
* `admision/` → Requisitos y cronograma de admisión escolar
* `matricula-en-linea/` → Formulario público de preinscripción de nuevos postulantes
* `noticias/` → Comunicados y actividades escolares
* `contacto/` → Ubicación en mapa, teléfono, correo y formulario de contacto

### `features/12-comun/`
* `dashboard/` → Página de inicio según el rol del usuario logueado (Admin, Docente, Cajero, Familia)
* `calendario/` → Calendario general de eventos escolares
* `ayuda/` → Manual de usuario y preguntas frecuentes
* `mi-trabajo/` → Vista de contrato y resumen de pagos del trabajador
* `secretaria/` → Panel rápido de trámites de secretaría
* `personal/` → Directorio de trabajadores y planilla de personal

---

## 🛠️ Estructura que debe tener cada vista al programar

Dentro de cada subcarpeta, por ejemplo `features/08-caja-pagos/ventanilla-caja/`, se crean los archivos:

```text
ventanilla-caja/
├── caja.component.ts      ← Lógica de la vista, Signals, llamadas al servicio
├── caja.component.html    ← Plantilla visual con Tailwind CSS
├── caja.service.ts        ← HttpClient llamando a /api/v1/caja (Gateway)
└── caja.model.ts          ← Interfaces TypeScript (CobroRequest, ReciboResponse)
```

> **Todo el código fuente original para copiar y adaptar está documentado en:**
> 👉 [11-CODIGO-FRONTEND.md](11-CODIGO-FRONTEND.md)
