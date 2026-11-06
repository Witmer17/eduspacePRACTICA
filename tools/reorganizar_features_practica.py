#!/usr/bin/env python3
"""
tools/reorganizar_features_practica.py

Reorganiza la carpeta frontend/src/app/features/ en una estructura limpia,
numerada por dominio y por integrante, vaciando todos los archivos de codigo
y dejando exclusivamente las carpetas con .gitkeep listas para la practica.

NUMERACIÓN Y RESPONSABLES:
  01-auth/            -> HERMES  (auth-ms)
  02-planificacion/   -> HERMES  (planificacion-ms)
  03-alumnos/         -> HERMES  (alumnos-ms)
  04-matriculas/      -> ANDRE   (matricula-ms)
  05-asistencia/      -> ANDRE   (asistencia-ms)
  06-tareas/          -> ANDRE   (tareas-ms)
  07-notificaciones/  -> HERMES  (notificaciones-ms)
  08-caja-pagos/      -> WITMER  (pago-ms)
  09-examenes/        -> WITMER  (examenes-ms)
  10-calificaciones/  -> WITMER  (calificaciones-ms)
  11-portal-publico/  -> WEB INSTITUCIONAL
  12-comun/           -> DASHBOARD Y PANELES GENERALES
"""

import shutil
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
FEATURES_DIR = ROOT_DIR / "frontend" / "src" / "app" / "features"

NUEVA_ESTRUCTURA = {
    "01-auth": [
        "login",
        "cambiar-clave",
        "usuarios",
        "perfil"
    ],
    "02-planificacion": [
        "anios",
        "secciones",
        "cursos",
        "aulas",
        "horarios",
        "feriados",
        "malla",
        "apertura",
        "configuracion"
    ],
    "03-alumnos": [
        "lista-alumnos",
        "alumno-detalle",
        "importar-alumnos",
        "apoderados"
    ],
    "04-matriculas": [
        "matriculas",
        "asistente-matricula",
        "campanias",
        "cupos",
        "aprobaciones",
        "documentos"
    ],
    "05-asistencia": [
        "docente-asistencia",
        "justificaciones",
        "reporte-asistencia",
        "familia-asistencia",
        "personal-asistencia"
    ],
    "06-tareas": [
        "docente-tareas",
        "tarea-entregas",
        "familia-tareas"
    ],
    "07-notificaciones": [
        "bandeja",
        "envio-admin"
    ],
    "08-caja-pagos": [
        "ventanilla-caja",
        "cuentas-alumnos",
        "cobranza-morosos",
        "conceptos",
        "tarifas",
        "descuentos",
        "finanzas-dashboard",
        "familia-pagos"
    ],
    "09-examenes": [
        "docente-examenes",
        "banco-preguntas",
        "familia-examenes",
        "rendir-examen"
    ],
    "10-calificaciones": [
        "docente-notas",
        "cierre-periodo",
        "boletines",
        "familia-notas"
    ],
    "11-portal-publico": [
        "inicio",
        "nosotros",
        "niveles",
        "admision",
        "matricula-en-linea",
        "noticias",
        "contacto"
    ],
    "12-comun": [
        "dashboard",
        "calendario",
        "ayuda",
        "mi-trabajo",
        "secretaria",
        "personal"
    ]
}


def reorganizar():
    print("=" * 70)
    print(" REORGANIZANDO FRONTEND/SRC/APP/FEATURES EN ARQUITECTURA LIMPIA")
    print("=" * 70)

    # 1. Eliminar contenido anterior de features si existe
    if FEATURES_DIR.exists():
        for item in FEATURES_DIR.iterdir():
            if item.is_dir():
                shutil.rmtree(item)
            elif item.name != ".gitkeep":
                item.unlink()
    else:
        FEATURES_DIR.mkdir(parents=True, exist_ok=True)

    # 2. Crear las nuevas carpetas numeradas con .gitkeep en cada una
    total_carpetas = 0
    for modulo, subcarpetas in NUEVA_ESTRUCTURA.items():
        modulo_dir = FEATURES_DIR / modulo
        modulo_dir.mkdir(parents=True, exist_ok=True)
        (modulo_dir / ".gitkeep").touch()
        total_carpetas += 1

        for sub in subcarpetas:
            sub_dir = modulo_dir / sub
            sub_dir.mkdir(parents=True, exist_ok=True)
            (sub_dir / ".gitkeep").touch()
            total_carpetas += 1

        print(f"  [OK] {modulo:<22} -> {len(subcarpetas)} vistas creadas (vacias con .gitkeep)")

    print("=" * 70)
    print(f" Total de modulos creados: {len(NUEVA_ESTRUCTURA)}")
    print(f" Total de carpetas de vistas listas: {total_carpetas}")
    print(" Todos los archivos de codigo en features han sido vaciados.")
    print("=" * 70)


if __name__ == "__main__":
    reorganizar()
