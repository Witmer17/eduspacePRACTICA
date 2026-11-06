# -*- coding: utf-8 -*-
"""
Script generador del MANUAL COMPLETO DE TODO EL PROYECTO EDUSPACE.
Genera 10 manuales de backend (uno por microservicio) + 1 manual de frontend.
Todos con explicaciones en español y código 100% completo sin omisiones.
"""
import os
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS_DIR = os.path.join(BASE_DIR, "docs", "05-manual-completo-proyecto")
os.makedirs(DOCS_DIR, exist_ok=True)

def read_file_safe(rel_path):
    full_path = os.path.join(BASE_DIR, rel_path.replace("/", os.sep).replace("\\", os.sep))
    if not os.path.exists(full_path):
        return None
    with open(full_path, "r", encoding="utf-8", errors="replace") as f:
        return f.read().rstrip()

def categorize_java(path):
    p = path.replace("\\", "/").lower()
    if "/entity/" in p: return 1, "Entidades JPA"
    if "/repository/" in p: return 2, "Repositorios Spring Data JPA"
    if "/dto/" in p: return 3, "DTOs (Data Transfer Objects)"
    if "/service/" in p: return 4, "Servicios y Lógica de Negocio"
    if "/controller/" in p: return 5, "Controladores REST API"
    if "/messaging/" in p: return 6, "Mensajería Kafka"
    if "/event/" in p: return 7, "Eventos de Dominio"
    if "/scheduler/" in p: return 8, "Tareas Programadas (Schedulers)"
    if "/config/" in p: return 9, "Configuración Spring Boot"
    if "/exception/" in p: return 10, "Manejo de Excepciones"
    if "application.java" in p: return 12, "Clase Principal de Arranque"
    if "/mapper/" in p: return 13, "Mappers"
    return 11, "Seguridad, Filtros, Clientes y Utilidades"

# ==================== EXPLICACIONES POR MICROSERVICIO ====================

EXPLANATIONS = {}

# ---- AUTH-MS ----
EXPLANATIONS["auth-ms"] = {
    "_desc": "Autenticación y autorización de usuarios. Gestiona el login con credenciales propias (usuario/contraseña), genera tokens JWT internos, administra roles (ADMIN, DOCENTE, CAJERO, ALUMNO, APODERADO), permite el cambio de contraseña y la creación de usuarios.",
    "_port": "8090",
    "_db": "eduspace_auth",
}

# ---- PLANIFICACION-MS ----
EXPLANATIONS["planificacion-ms"] = {
    "_desc": "Columna vertebral del sistema educativo. Gestiona la estructura académica completa: Años Lectivos, Niveles (Inicial, Primaria, Secundaria), Grados, Secciones, Cursos, Áreas Curriculares, Periodos (Bimestres), Horarios, Turnos, Aulas, Pabellones y Personal docente/administrativo (RRHH). Es consultado por todos los demás microservicios.",
    "_port": "8091",
    "_db": "eduspace_planificacion",
}

# ---- ALUMNOS-MS ----
EXPLANATIONS["alumnos-ms"] = {
    "_desc": "Gestión del expediente estudiantil completo. Registra datos personales del alumno (nombre, DNI, fecha de nacimiento, dirección), datos de los apoderados/tutores legales, documentos escaneados, fotos, historial académico previo y contactos de emergencia.",
    "_port": "8092",
    "_db": "eduspace_alumnos",
}

# ---- MATRICULA-MS ----
EXPLANATIONS["matricula-ms"] = {
    "_desc": "Proceso de matrícula escolar completa. Gestiona la inscripción del alumno en un año lectivo, grado y sección, validando cupos disponibles, requisitos documentarios y estados (EN_PROCESO, MATRICULADO, RETIRADO, TRASLADADO). Emite eventos Kafka para que los demás servicios repliquen la matrícula.",
    "_port": "8093",
    "_db": "eduspace_matricula",
}

# ---- ASISTENCIA-MS ----
EXPLANATIONS["asistencia-ms"] = {
    "_desc": "Control de asistencia diaria de alumnos. Registra el estado de asistencia (PRESENTE, TARDANZA, FALTA, JUSTIFICADO) por alumno y día, calcula porcentajes de asistencia por periodo y genera reportes estadísticos para docentes y directivos.",
    "_port": "8094",
    "_db": "eduspace_asistencia",
}

# ---- TAREAS-MS ----
EXPLANATIONS["tareas-ms"] = {
    "_desc": "Gestión de tareas y actividades académicas. Permite a los docentes crear, publicar y calificar tareas/trabajos asignados a secciones. Los alumnos pueden ver las tareas pendientes y entregar sus trabajos. Emite eventos `tarea.calificada` a Kafka para que calificaciones-ms registre las notas automáticamente.",
    "_port": "8098",
    "_db": "eduspace_tareas",
}

# ---- NOTIFICACIONES-MS ----
EXPLANATIONS["notificaciones-ms"] = {
    "_desc": "Sistema centralizado de notificaciones multi-canal. Escucha eventos de todos los microservicios (pagos confirmados, exámenes publicados, matrículas aprobadas) y envía notificaciones por EMAIL (Mailpit/SMTP), notificaciones internas en la aplicación y alertas para docentes, alumnos y apoderados.",
    "_port": "8099",
    "_db": "eduspace_notificaciones",
}

# ---- PAGO-MS ----
EXPLANATIONS["pago-ms"] = {
    "_desc": "Cobranza presencial en ventanilla de caja, cronograma de pensiones, emisión de recibos y boletas con correlativos protegidos, control de concurrencia optimista, idempotencia y publicación de eventos de pago mediante Outbox Pattern. Incluye créditos, órdenes de pago online y solicitudes de descuento.",
    "_port": "8096",
    "_db": "eduspace_pago",
}

# ---- EXAMENES-MS ----
EXPLANATIONS["examenes-ms"] = {
    "_desc": "Gestión de evaluaciones, banco de preguntas docentes, alternativas con autocorrección, intentos de estudiantes con cronómetro regresivo y publicación de notas vía Kafka (`examen.calificado`).",
    "_port": "8097",
    "_db": "eduspace_examenes",
}

# ---- CALIFICACIONES-MS ----
EXPLANATIONS["calificaciones-ms"] = {
    "_desc": "Registro auxiliar de notas por curso y sección, criterios ponderados con pesos que suman 100%, autocompletado reactivo de notas de exámenes y tareas por Kafka, promedios automáticos, cierre de actas y boletines escolares.",
    "_port": "8095",
    "_db": "eduspace_calificaciones",
}


def get_explanation_generic(rel_path, ms_name):
    """Generate explanation based on class name and package conventions."""
    fname = os.path.basename(rel_path)
    cname = os.path.splitext(fname)[0]
    
    # Generic rules
    if "Repository" in cname:
        entity = cname.replace("Repository", "")
        return f"Interfaz Spring Data JPA para la entidad `{entity}`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL."
    if "Request" in cname:
        return f"DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `{cname.replace('Request', '')}`."
    if "Response" in cname:
        return f"DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `{cname.replace('Response', '')}`."
    if cname.endswith("Service") or cname.endswith("ServiceImpl"):
        base = cname.replace("ServiceImpl", "").replace("Service", "")
        return f"Servicio transaccional de lógica de negocio para `{base}`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka."
    if "Controller" in cname:
        base = cname.replace("Controller", "")
        return f"Controlador REST (`@RestController`) que expone los endpoints HTTP para `{base}`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON."
    if "Consumer" in cname:
        return f"Consumidor de eventos Apache Kafka. Escucha mensajes de un topic específico y procesa los eventos de dominio recibidos de otros microservicios."
    if "Producer" in cname or "Publisher" in cname:
        return f"Productor/publicador de eventos Apache Kafka. Envía eventos de dominio hacia topics específicos para que otros microservicios los procesen de forma asíncrona."
    if "Job" in cname or "Scheduler" in cname:
        return f"Tarea programada en segundo plano (`@Scheduled`). Se ejecuta periódicamente mediante expresiones cron para procesos de mantenimiento, limpieza o conciliación automática."
    if "Event" in cname:
        return f"Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios."
    if "Config" in cname:
        return f"Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio."
    if "Exception" in cname or "Error" in cname:
        return f"Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio."
    if "Application" in cname:
        return f"Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign."
    if "Filter" in cname:
        return f"Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios."
    if "Client" in cname:
        return f"Cliente Feign (`@FeignClient`) para comunicación síncrona REST con otro microservicio a través del servicio de descubrimiento Eureka."
    if "Mapper" in cname:
        return f"Clase de mapeo (Mapper) que convierte entre entidades JPA y DTOs de solicitud/respuesta."
    if "Properties" in cname:
        return f"Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado."
    if "Dtos" in cname or "Dto" in cname:
        return f"Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `{cname}`."
    
    # Default for entities
    cat_num, cat_name = categorize_java(rel_path)
    if cat_num == 1:
        return f"Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `{ms_name}`. Define las columnas, relaciones con otras tablas y restricciones de integridad."
    
    return f"Clase de soporte del microservicio `{ms_name}` que cumple funciones auxiliares de infraestructura, seguridad o utilidades."


def process_microservice(ms_name, src_dir, output_file):
    info = EXPLANATIONS.get(ms_name, {})
    desc = info.get("_desc", f"Microservicio {ms_name}")
    port = info.get("_port", "????")
    db = info.get("_db", "????")
    
    full_src = os.path.join(BASE_DIR, src_dir.replace("/", os.sep))
    if not os.path.exists(full_src):
        print(f"  [AVISO] No existe: {full_src}")
        return
    
    java_files = []
    for dirpath, _, filenames in os.walk(full_src):
        for f in filenames:
            if f.endswith(".java"):
                full_path = os.path.join(dirpath, f)
                rel_path = os.path.relpath(full_path, BASE_DIR).replace("\\", "/")
                java_files.append(rel_path)

    java_files = sorted(java_files, key=lambda x: (categorize_java(x)[0], os.path.basename(x)))

    out_path = os.path.join(DOCS_DIR, output_file)
    with open(out_path, "w", encoding="utf-8") as out:
        out.write(f"# 📘 CÓDIGO COMPLETO — `{ms_name}`\n\n")
        out.write(f"> **Microservicio:** `{ms_name}`  \n")
        out.write(f"> **Puerto:** `{port}`  \n")
        out.write(f"> **Base de datos:** `{db}`  \n")
        out.write(f"> **Propósito:** {desc}  \n")
        out.write(f"> **Total de clases incluidas:** {len(java_files)} (100% completas, sin omisiones).\n\n")
        out.write("---\n\n")
        
        # Index
        out.write("## 📑 Índice de Clases\n\n")
        current_cat = None
        for idx, fpath in enumerate(java_files, 1):
            cat_num, cat_name = categorize_java(fpath)
            if cat_name != current_cat:
                current_cat = cat_name
                out.write(f"\n### {cat_name}\n\n")
            fname = os.path.basename(fpath)
            out.write(f"- {idx}. `{fname}` — `{fpath}`\n")

        out.write("\n---\n\n")

        # Content
        for idx, fpath in enumerate(java_files, 1):
            code = read_file_safe(fpath)
            if not code:
                continue
            fname = os.path.basename(fpath)
            cat_num, cat_name = categorize_java(fpath)
            explanation = get_explanation_generic(fpath, ms_name)

            out.write(f"## {idx}. `{fname}` — {cat_name}\n\n")
            out.write(f"**Ruta del archivo:** `{fpath}`\n\n")
            out.write(f"### **¿Qué hace esta clase?**\n")
            out.write(f"{explanation}\n\n")
            out.write("```java\n")
            out.write(code)
            out.write("\n```\n\n---\n\n")

    size_kb = os.path.getsize(out_path) / 1024
    print(f"  ✓ {output_file}: {len(java_files)} clases, {size_kb:.0f} KB")


def process_frontend():
    """Generate frontend manual organized by functional module."""
    root = os.path.join(BASE_DIR, "frontend", "src", "app")
    
    # Collect ALL non-spec .ts and .html files
    all_files = []
    for dirpath, _, filenames in os.walk(root):
        for f in filenames:
            if (f.endswith('.ts') or f.endswith('.html')) and not f.endswith('.spec.ts'):
                full = os.path.join(dirpath, f)
                rel = os.path.relpath(full, BASE_DIR).replace('\\', '/')
                all_files.append(rel)
    
    # Categorize by module
    def frontend_category(path):
        p = path.lower()
        if "/core/models/" in p: return 1, "Core — Modelos e Interfaces"
        if "/core/services/" in p: return 2, "Core — Servicios HTTP"
        if "/core/guards/" in p: return 3, "Core — Guards de Rutas"
        if "/core/interceptors/" in p: return 4, "Core — Interceptores HTTP"
        if "/core/config/" in p: return 5, "Core — Configuración"
        if "/core/utils/" in p: return 6, "Core — Utilidades"
        if "/core/testing/" in p: return 7, "Core — Testing"
        if "/shared/" in p: return 8, "Shared — Componentes Reutilizables"
        if "/features/auth/" in p: return 10, "Feature — Autenticación (Login)"
        if "/features/dashboard/" in p: return 11, "Feature — Dashboard Principal"
        if "/features/apertura/" in p: return 12, "Feature — Apertura de Año Lectivo"
        if "/features/configuracion/" in p: return 13, "Feature — Configuración del Colegio"
        if "/features/planificacion/" in p: return 14, "Feature — Planificación Académica"
        if "/features/alumnos/" in p: return 15, "Feature — Gestión de Alumnos"
        if "/features/apoderados/" in p: return 16, "Feature — Gestión de Apoderados"
        if "/features/matriculas/" in p: return 17, "Feature — Matrículas"
        if "/features/asistencia/" in p: return 18, "Feature — Asistencia"
        if "/features/docente/" in p: return 19, "Feature — Portal Docente"
        if "/features/caja/" in p: return 20, "Feature — Ventanilla de Caja"
        if "/features/pagos/" in p: return 21, "Feature — Gestión de Pagos (Admin)"
        if "/features/familia/" in p: return 22, "Feature — Portal Familia (Alumno/Apoderado)"
        if "/features/calificaciones/" in p: return 23, "Feature — Calificaciones y Boletines"
        if "/features/notificaciones/" in p: return 24, "Feature — Notificaciones"
        if "/features/personal/" in p: return 25, "Feature — RRHH y Personal"
        if "/features/usuarios/" in p: return 26, "Feature — Gestión de Usuarios"
        if "/features/publico/" in p: return 27, "Feature — Página Pública"
        if "/features/documentos/" in p: return 28, "Feature — Documentos"
        if "/features/finanzas/" in p: return 29, "Feature — Finanzas"
        if "/features/areas/" in p: return 30, "Feature — Áreas Curriculares"
        if "/features/" in p: return 31, "Feature — Otros Módulos"
        if "app.routes" in p or "app.component" in p or "app.config" in p: return 9, "App — Configuración Raíz"
        return 32, "Otros Archivos"
    
    all_files = sorted(all_files, key=lambda x: (frontend_category(x)[0], os.path.basename(x)))
    
    output_file = "11-CODIGO-FRONTEND.md"
    out_path = os.path.join(DOCS_DIR, output_file)
    with open(out_path, "w", encoding="utf-8") as out:
        out.write("# 📘 CÓDIGO COMPLETO — FRONTEND ANGULAR\n\n")
        out.write("> **Framework:** Angular 19 con Signals, Standalone Components y Lazy Loading  \n")
        out.write(f"> **Total de archivos incluidos:** {len(all_files)} (TypeScript y HTML, sin tests)  \n")
        out.write("> **Arquitectura:** Modular por Feature — cada módulo funcional agrupa su model, service, component.ts y component.html juntos.\n\n")
        out.write("---\n\n")
        
        # Index
        out.write("## 📑 Índice de Archivos\n\n")
        current_cat = None
        for idx, fpath in enumerate(all_files, 1):
            cat_num, cat_name = frontend_category(fpath)
            if cat_name != current_cat:
                current_cat = cat_name
                out.write(f"\n### {cat_name}\n\n")
            fname = os.path.basename(fpath)
            out.write(f"- {idx}. `{fname}` — `{fpath}`\n")

        out.write("\n---\n\n")

        # Content
        for idx, fpath in enumerate(all_files, 1):
            code = read_file_safe(fpath)
            if not code:
                continue
            fname = os.path.basename(fpath)
            cat_num, cat_name = frontend_category(fpath)
            lang = "html" if fpath.endswith(".html") else "typescript"
            
            # Simple explanation
            if ".model." in fname: expl = "Modelos e interfaces TypeScript que tipan los datos de la API REST y las vistas del módulo."
            elif ".service." in fname: expl = "Servicio Angular inyectable (`@Injectable`) que maneja peticiones HTTP hacia el API Gateway."
            elif fname.endswith(".component.ts"): expl = "Componente Angular (`@Component`) con lógica de vista, señales reactivas (Signals) y llamadas a servicios."
            elif fname.endswith(".component.html"): expl = "Plantilla HTML del componente Angular. Define la estructura visual, formularios y tablas."
            elif "guard" in fname: expl = "Guard de ruta Angular que protege el acceso a vistas según roles del usuario autenticado."
            elif "interceptor" in fname: expl = "Interceptor HTTP que agrega headers de autenticación (JWT) o maneja errores globales."
            elif ".routes." in fname or "routes" in fname: expl = "Definición de rutas del módulo con lazy loading para carga bajo demanda."
            elif "config" in fname: expl = "Configuración de la aplicación Angular (providers, modo de autenticación, variables de entorno)."
            elif "utils" in fname or "util" in fname: expl = "Funciones utilitarias reutilizables a lo largo de la aplicación."
            else: expl = f"Archivo TypeScript de soporte para el módulo `{cat_name}`."

            out.write(f"## {idx}. `{fname}` — {cat_name}\n\n")
            out.write(f"**Ruta del archivo:** `{fpath}`\n\n")
            out.write(f"### **¿Qué hace este archivo?**\n")
            out.write(f"{expl}\n\n")
            out.write(f"```{lang}\n")
            out.write(code)
            out.write("\n```\n\n---\n\n")

    size_kb = os.path.getsize(out_path) / 1024
    print(f"  ✓ {output_file}: {len(all_files)} archivos, {size_kb:.0f} KB")


# ==================== MAIN ====================

if __name__ == "__main__":
    print("=" * 60)
    print("GENERANDO MANUAL COMPLETO DE TODO EL PROYECTO EDUSPACE")
    print("=" * 60)
    
    MS_CONFIG = [
        ("auth-ms",          "services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth",                  "01-CODIGO-AUTH-MS.md"),
        ("planificacion-ms",  "services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion",     "02-CODIGO-PLANIFICACION-MS.md"),
        ("alumnos-ms",        "services/alumnos-ms/src/main/java/pe/edu/eduspace/alumnos",                 "03-CODIGO-ALUMNOS-MS.md"),
        ("matricula-ms",      "services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula",        "04-CODIGO-MATRICULA-MS.md"),
        ("asistencia-ms",     "services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia",      "05-CODIGO-ASISTENCIA-MS.md"),
        ("tareas-ms",         "services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas",              "06-CODIGO-TAREAS-MS.md"),
        ("notificaciones-ms", "services/notificaciones-ms/src/main/java/pe/edu/eduspace/notificaciones",   "07-CODIGO-NOTIFICACIONES-MS.md"),
        ("pago-ms",           "services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago",                  "08-CODIGO-PAGO-MS.md"),
        ("examenes-ms",       "services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes",          "09-CODIGO-EXAMENES-MS.md"),
        ("calificaciones-ms", "services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones","10-CODIGO-CALIFICACIONES-MS.md"),
    ]
    
    print("\n📦 BACKEND — 10 Microservicios:")
    for ms_name, src_dir, output_file in MS_CONFIG:
        process_microservice(ms_name, src_dir, output_file)
    
    print("\n🖥️ FRONTEND — Angular:")
    process_frontend()
    
    print(f"\n{'=' * 60}")
    print(f"¡COMPLETADO! Directorio: {DOCS_DIR}")
    print(f"{'=' * 60}")
