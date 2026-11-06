# 🚀 GUÍA MAESTRA — MANUAL COMPLETO DE TODO EL PROYECTO EDUSPACE
## 10 Microservicios Backend + Frontend Angular 19

Este directorio contiene el **código fuente 100% completo** de los 10 microservicios y todo el frontend del proyecto EduSpace, organizado para que puedas **vaciar todas las carpetas y recodificar todo el proyecto desde cero**.

> **⚠️ IMPORTANTE:** Antes de borrar cualquier archivo, crea tu rama de práctica:
> ```powershell
> git checkout -b practica-desde-cero
> ```
> Para volver al proyecto funcional en cualquier momento: `git checkout main`

---

## 📊 Resumen del Proyecto Completo

| # | Microservicio | Puerto | Base de Datos | Clases | Manual |
|:-:|:---|:---:|:---|:---:|:---|
| 1 | `auth-ms` | 8090 | `eduspace_auth` | 29 | [01-CODIGO-AUTH-MS.md](01-CODIGO-AUTH-MS.md) |
| 2 | `planificacion-ms` | 8091 | `eduspace_planificacion` | 186 | [02-CODIGO-PLANIFICACION-MS.md](02-CODIGO-PLANIFICACION-MS.md) |
| 3 | `alumnos-ms` | 8092 | `eduspace_alumnos` | 100 | [03-CODIGO-ALUMNOS-MS.md](03-CODIGO-ALUMNOS-MS.md) |
| 4 | `matricula-ms` | 8093 | `eduspace_matricula` | 64 | [04-CODIGO-MATRICULA-MS.md](04-CODIGO-MATRICULA-MS.md) |
| 5 | `asistencia-ms` | 8094 | `eduspace_asistencia` | 54 | [05-CODIGO-ASISTENCIA-MS.md](05-CODIGO-ASISTENCIA-MS.md) |
| 6 | `tareas-ms` | 8098 | `eduspace_tareas` | 58 | [06-CODIGO-TAREAS-MS.md](06-CODIGO-TAREAS-MS.md) |
| 7 | `notificaciones-ms` | 8099 | `eduspace_notificaciones` | 101 | [07-CODIGO-NOTIFICACIONES-MS.md](07-CODIGO-NOTIFICACIONES-MS.md) |
| 8 | `pago-ms` | 8096 | `eduspace_pago` | 130 | [08-CODIGO-PAGO-MS.md](08-CODIGO-PAGO-MS.md) |
| 9 | `examenes-ms` | 8097 | `eduspace_examenes` | 69 | [09-CODIGO-EXAMENES-MS.md](09-CODIGO-EXAMENES-MS.md) |
| 10 | `calificaciones-ms` | 8095 | `eduspace_calificaciones` | 83 | [10-CODIGO-CALIFICACIONES-MS.md](10-CODIGO-CALIFICACIONES-MS.md) |
| — | **Frontend Angular** | 4200 | — | 279 | [11-CODIGO-FRONTEND.md](11-CODIGO-FRONTEND.md) |
| | **TOTAL** | | | **1,153** | |

---

## 🔄 Orden Recomendado Para Codificar Desde Cero

### Backend — Orden por Capas (dentro de cada microservicio):

```
1. entity/       → Primero: las tablas de la base de datos
2. repository/   → Segundo: interfaces de acceso a datos
3. dto/          → Tercero: objetos de entrada/salida de la API
4. service/      → Cuarto: lógica de negocio y transacciones
5. controller/   → Quinto: endpoints REST
6. messaging/    → Sexto: productores y consumidores de Kafka
7. config/       → Séptimo: configuraciones de Spring
```

### Backend — Orden por Microservicio (los que dependen de otros van después):

```
1. auth-ms           → No depende de nadie. Login y JWT.
2. planificacion-ms   → No depende de nadie. Base de la estructura académica.
3. alumnos-ms         → Puede consultar planificacion-ms.
4. matricula-ms       → Depende de planificacion-ms y alumnos-ms.
5. asistencia-ms      → Escucha eventos de matricula-ms.
6. tareas-ms          → Escucha eventos de matricula-ms.
7. examenes-ms        → Escucha eventos de matricula-ms.
8. calificaciones-ms  → Escucha eventos de examenes-ms y tareas-ms.
9. pago-ms            → Escucha eventos de matricula-ms.
10. notificaciones-ms → Escucha eventos de TODOS los demás.
```

### Frontend — Estructura por Módulo Funcional:

```
frontend/src/app/
├── core/                    → Modelos, servicios HTTP, guards, interceptores
│   ├── models/              → Interfaces TypeScript (tipado de datos)
│   ├── services/            → Servicios HTTP (@Injectable)
│   ├── guards/              → Protección de rutas por rol
│   ├── interceptors/        → Headers JWT y manejo de errores
│   ├── config/              → Configuración de autenticación
│   └── utils/               → Funciones auxiliares
├── shared/                  → Componentes reutilizables (modal, buscador, paginador)
├── features/                → Un módulo por cada pantalla/funcionalidad
│   ├── auth/                → Login, registro
│   ├── dashboard/           → Página de inicio por rol
│   ├── caja/                → Ventanilla de caja (cajero)
│   ├── docente/             → Notas, exámenes, tareas del profesor
│   ├── familia/             → Portal alumno/apoderado: notas, pagos, exámenes
│   ├── alumnos/             → CRUD de alumnos
│   ├── matriculas/          → Proceso de matrícula
│   ├── configuracion/       → Config. del colegio, grados, secciones
│   ├── pagos/               → Admin de tarifas, conceptos, morosos
│   ├── calificaciones/      → Boletines, cierre de periodo
│   ├── planificacion/       → Cursos, horarios
│   └── ...                  → Otros módulos funcionales
├── app.routes.ts            → Rutas principales con lazy loading
├── app.component.ts         → Componente raíz
└── app.config.ts            → Providers de la aplicación
```

---

## ⚡ Comandos Para Compilar y Verificar

```powershell
# Compilar un microservicio específico (reemplaza NOMBRE):
mvn -f services/NOMBRE/pom.xml clean compile

# Compilar TODOS los microservicios:
@('auth-ms','planificacion-ms','alumnos-ms','matricula-ms','asistencia-ms','tareas-ms','notificaciones-ms','pago-ms','examenes-ms','calificaciones-ms') | ForEach-Object { Write-Host "Compilando $_..."; mvn -f "services/$_/pom.xml" compile -q }

# Compilar el frontend:
npm --prefix frontend run build

# Levantar el frontend en modo desarrollo:
npm --prefix frontend start
```

---

## 🏗️ Arquitectura General del Sistema

```
                    ┌─────────────┐
                    │  Frontend   │  Angular 19
                    │  :4200      │  Signals + Standalone
                    └──────┬──────┘
                           │ HTTP
                    ┌──────▼──────┐
                    │  Gateway    │  Spring Cloud Gateway
                    │  :18080     │  Proxy + JWT
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
    │ auth-ms   │   │planific-ms│   │alumnos-ms │   ... (10 servicios)
    │ :8090     │   │ :8091     │   │ :8092     │
    └───────────┘   └───────────┘   └───────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │ Kafka (eventos)
                    ┌──────▼──────┐
                    │  Apache     │
                    │  Kafka      │
                    │  :19092     │
                    └─────────────┘
```
