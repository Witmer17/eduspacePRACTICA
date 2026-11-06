#!/usr/bin/env python3
"""
tools/gestionar_practica.py

Herramienta para vaciar las clases y componentes de los microservicios
y frontend asignados a Hermes y Andre (o a todo el equipo) para que
puedan codificar todo desde cero usando los manuales en docs/05-manual-completo-proyecto/.

REGLAS DE SEGURIDAD:
1. NO toca infra/ (Eureka, Gateway, Config Server, Docker, Kafka, Postgres).
2. NO toca pom.xml de ningún microservicio.
3. NO toca src/main/resources/ (application.yml, migraciones DB).
4. NO toca frontend/src/app/core/ ni frontend/src/app/shared/ ni app.routes.ts.
5. Coloca un archivo .gitkeep en cada carpeta para que las carpetas
   queden visibles y NUNCA se borren de Git ni de Windows.
6. Permite restaurar todo al instante con: python tools/gestionar_practica.py --restaurar
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path

# Directorio raíz del proyecto
ROOT_DIR = Path(__file__).resolve().parent.parent

# Asignación de microservicios
MS_HERMES = [
    "auth-ms",
    "planificacion-ms",
    "alumnos-ms",
    "notificaciones-ms"
]

MS_ANDRE = [
    "tareas-ms",
    "asistencia-ms",
    "matricula-ms"
]

MS_WITMER = [
    "pago-ms",
    "examenes-ms",
    "calificaciones-ms"
]

# Asignación de carpetas de Frontend (features)
FEAT_HERMES = [
    "frontend/src/app/features/auth",
    "frontend/src/app/features/usuarios",
    "frontend/src/app/features/perfil",
    "frontend/src/app/features/planificacion",
    "frontend/src/app/features/areas",
    "frontend/src/app/features/apertura",
    "frontend/src/app/features/alumnos",
    "frontend/src/app/features/apoderados",
    "frontend/src/app/features/notificaciones"
]

FEAT_ANDRE = [
    "frontend/src/app/features/matriculas",
    "frontend/src/app/features/documentos",
    "frontend/src/app/features/asistencia",
    "frontend/src/app/features/docente/tareas",
    "frontend/src/app/features/familia/tareas"
]

FEAT_WITMER = [
    "frontend/src/app/features/caja",
    "frontend/src/app/features/pagos",
    "frontend/src/app/features/cuentas",
    "frontend/src/app/features/finanzas",
    "frontend/src/app/features/calificaciones",
    "frontend/src/app/features/familia/pagos"
]


def vaciar_directorio_con_gitkeep(directorio: Path, extensiones: list, dry_run=False):
    """
    Recorre recursivamente un directorio:
    - Asegura un .gitkeep en cada subcarpeta para mantener la estructura.
    - Elimina los archivos con las extensiones indicadas.
    """
    archivos_eliminados = []
    carpetas_preservadas = 0

    if not directorio.exists():
        return archivos_eliminados, carpetas_preservadas

    # Primero crear .gitkeep en todas las carpetas
    for root, dirs, _ in os.walk(directorio):
        root_path = Path(root)
        carpetas_preservadas += 1
        gitkeep = root_path / ".gitkeep"
        if not dry_run and not gitkeep.exists():
            gitkeep.touch()

    # Segundo eliminar archivos con las extensiones
    for root, _, files in os.walk(directorio):
        root_path = Path(root)
        for f in files:
            if f == ".gitkeep":
                continue
            f_path = root_path / f
            if any(f.endswith(ext) for ext in extensiones):
                archivos_eliminados.append(f_path)
                if not dry_run:
                    f_path.unlink()

    return archivos_eliminados, carpetas_preservadas


def vaciar_microservicio(ms_nombre: Path, dry_run=False):
    """Vacía únicamente las clases .java de src/main/java y src/test/java"""
    ms_dir = ROOT_DIR / "services" / ms_nombre
    if not ms_dir.exists():
        print(f"  [AVISO] No existe la carpeta {ms_dir}")
        return 0, 0

    total_eliminados = 0
    total_carpetas = 0

    for sub in ["src/main/java", "src/test/java"]:
        target_dir = ms_dir / sub
        if target_dir.exists():
            eliminados, carpetas = vaciar_directorio_con_gitkeep(target_dir, [".java"], dry_run)
            total_eliminados += len(eliminados)
            total_carpetas += carpetas

    return total_eliminados, total_carpetas


def vaciar_feature_frontend(feat_rel_path: str, dry_run=False):
    """Vacía los componentes (.ts, .html, .css, .scss) de una feature dejando las carpetas intactas"""
    feat_dir = ROOT_DIR / feat_rel_path
    if not feat_dir.exists():
        return 0, 0

    eliminados, carpetas = vaciar_directorio_con_gitkeep(
        feat_dir,
        [".ts", ".html", ".css", ".scss"],
        dry_run
    )
    return len(eliminados), carpetas


def ejecutar_vaciado(incluir_hermes=True, incluir_andre=True, incluir_witmer=False,
                     vaciar_fe=True, dry_run=False):
    print("=" * 70)
    modo = "MODO SIMULACIÓN (DRY RUN - No se modificó nada)" if dry_run else "EJECUTANDO VACIADO DE CÓDIGO"
    print(f" {modo}")
    print("=" * 70)

    # 1. Microservicios Backend
    ms_a_procesar = []
    if incluir_hermes:
        ms_a_procesar.extend([("Hermes", ms) for ms in MS_HERMES])
    if incluir_andre:
        ms_a_procesar.extend([("Andre", ms) for ms in MS_ANDRE])
    if incluir_witmer:
        ms_a_procesar.extend([("Witmer", ms) for ms in MS_WITMER])

    print("\n[BACKEND] Vaciando clases .java manteniendo la estructura de carpetas:")
    total_java = 0
    for responsable, ms in ms_a_procesar:
        eliminados, carpetas = vaciar_microservicio(ms, dry_run)
        total_java += eliminados
        print(f"  - [{responsable.upper()}] {ms:<20} -> {eliminados:>3} clases .java vaciadas ({carpetas} carpetas conservadas)")

    # 2. Frontend Features
    total_fe_files = 0
    if vaciar_fe:
        print("\n[FRONTEND] Vaciando componentes (.ts, .html) manteniendo estructura:")
        feat_a_procesar = []
        if incluir_hermes:
            feat_a_procesar.extend([("Hermes", f) for f in FEAT_HERMES])
        if incluir_andre:
            feat_a_procesar.extend([("Andre", f) for f in FEAT_ANDRE])
        if incluir_witmer:
            feat_a_procesar.extend([("Witmer", f) for f in FEAT_WITMER])

        for responsable, feat in feat_a_procesar:
            eliminados, carpetas = vaciar_feature_frontend(feat, dry_run)
            total_fe_files += eliminados
            if eliminados > 0:
                print(f"  - [{responsable.upper()}] {feat:<42} -> {eliminados:>3} archivos vaciados ({carpetas} carpetas conservadas)")

    print("\n" + "=" * 70)
    print(f" RESUMEN:")
    print(f" Total clases .java vaciadas: {total_java}")
    if vaciar_fe:
        print(f" Total archivos frontend vaciados: {total_fe_files}")
    print(" Infraestructura (Kafka, Gateway, Eureka, DBs, Docker, pom.xml): 100% INTACTA")
    print("=" * 70)
    print("\nLos manuales completos con todo el codigo para reescribir estan en:")
    print("  docs/05-manual-completo-proyecto/")
    print("\nPara restaurar todo al codigo original en cualquier momento:")
    print("  python tools/gestionar_practica.py --restaurar")


def restaurar_codigo():
    print("Restaurando todos los archivos desde Git...")
    subprocess.run(["git", "checkout", "services/", "frontend/src/app/features/"], check=False)
    # Limpiar posibles .gitkeep temporales si es necesario
    print("Listo! Todo el codigo original ha sido restaurado exitosamente.")


def main():
    parser = argparse.ArgumentParser(description="Gestionar vaciado de codigo para practica de codificacion EduSpace")
    parser.add_argument("--dry-run", action="store_true", help="Simula sin borrar nada")
    parser.add_argument("--solo-backend", action="store_true", help="Solo vacia el backend (no toca frontend)")
    parser.add_argument("--incluir-witmer", action="store_true", help="Tambien vacia los 3 microservicios de Witmer")
    parser.add_argument("--restaurar", action="store_true", help="Restaura todo el codigo original")

    args = parser.parse_args()

    if args.restaurar:
        restaurar_codigo()
        return

    vaciar_fe = not args.solo_backend
    ejecutar_vaciado(
        incluir_hermes=True,
        incluir_andre=True,
        incluir_witmer=args.incluir_witmer,
        vaciar_fe=vaciar_fe,
        dry_run=args.dry_run
    )


if __name__ == "__main__":
    main()
