#!/usr/bin/env bash
# Recorrido de «Mi trabajo» con Chrome real: prepara docentes/caja de prueba con contrato, pagos, asistencia y cuenta; prueba; y limpia.
# La librería se instala una vez FUERA del proyecto:  mkdir -p /tmp/pw-ui && cd /tmp/pw-ui && npm init -y && npm i playwright-core
# Necesita la web (4200), el Gateway, Keycloak, auth-ms y planificacion-ms levantados.
set -u
AQUI="$(cd "$(dirname "$0")" && pwd)"
PW="${PW_DIR:-/tmp/pw-ui}"
[ -d "$PW/node_modules/playwright-core" ] || { echo "Falta playwright-core en $PW (ver el comentario de este archivo)"; exit 2; }
cd "$AQUI"
python3 13_mi_trabajo.py --limpiar >/dev/null 2>&1
python3 13_mi_trabajo.py --preparar | grep -E "ERR|PREPARADO" | cut -c1-200 || true
[ -f /tmp/mi_trabajo_estado.json ] || { echo "No se pudieron preparar los datos"; exit 2; }
NODE_PATH="$PW/node_modules" node ui_mi_trabajo.cjs "${1:-http://localhost:4200}" "${2:-$PW/capturas-mi-trabajo}"
estado=$?
python3 13_mi_trabajo.py --limpiar >/dev/null 2>&1
exit $estado
