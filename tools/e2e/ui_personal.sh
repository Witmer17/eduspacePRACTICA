#!/usr/bin/env bash
# Recorrido de la interfaz de Personal y Áreas con Chrome real: limpia lo que dejó una ejecución anterior, prueba y vuelve a limpiar.
# La librería se instala una vez FUERA del proyecto:  mkdir -p /tmp/pw-ui && cd /tmp/pw-ui && npm init -y && npm i playwright-core
# Necesita la web (4200), el Gateway, Keycloak y los servicios levantados, y el contenedor e2e-pg-pago (podman).
# Para el paso del reparto de caja crea un cobro de prueba de S/ 1 000 en pago-ms (solo si no hay ya S/ 500 cobrados) y lo borra al terminar,
# junto con los movimientos de reparto de esta corrida.
set -u
AQUI="$(cd "$(dirname "$0")" && pwd)"
PW="${PW_DIR:-/tmp/pw-ui}"
PG="${PG_CONTENEDOR:-e2e-pg-pago}"
[ -d "$PW/node_modules/playwright-core" ] || { echo "Falta playwright-core en $PW (ver el comentario de este archivo)"; exit 2; }
sql() { podman exec -e PGPASSWORD="${DB_PASSWORD:-eduspace}" "$PG" psql -U "${DB_USER:-eduspace}" -d pago_db -At -c "$1"; }

cd "$AQUI"
python3 limpiar_pruebas_ui.py >/dev/null 2>&1
INICIO="$(sql "select now()" | cut -d. -f1)"
COBRADO="$(sql "select coalesce(sum(monto_total),0) from pagos where estado='CONFIRMADO'" | cut -d. -f1)"
PAGO_ID=""
if [ "${COBRADO:-0}" -lt 500 ]; then
  PAGO_ID="$(sql "insert into pagos (alumno_id, pagador_nombre, monto_total, medio, referencia, estado) values (999999, 'PRUEBA INTERFAZ CAJA', 1000.00, 'EFECTIVO', 'ui-fondo', 'CONFIRMADO') returning id" | head -1)"
  echo "Cobro de prueba creado (pago $PAGO_ID, S/ 1 000)"
fi

NODE_PATH="$PW/node_modules" node ui_personal.cjs "${1:-http://localhost:4200}" "${2:-$PW/capturas}"
estado=$?
# La primera tanda deja a una persona con los cursos de Matemática asignados: se limpia para que la segunda encuentre cursos libres.
python3 limpiar_pruebas_ui.py >/dev/null 2>&1
# El Gateway limita a 300 peticiones por minuto y por IP: se deja pasar la ventana para que la segunda tanda no reciba 429.
echo "(pausa de 40 s para no agotar el límite de peticiones del Gateway)"; sleep 40
echo
echo "######## Segunda tanda: cuenta de acceso, «← Datos», bonos, rescisión, docentes del curso, áreas desactivadas, secretaría y celular"
NODE_PATH="$PW/node_modules" node ui_personal_2.cjs "${1:-http://localhost:4200}" "${3:-$PW/capturas2}"
estado=$(( estado || $? ))

sql "delete from asignaciones_area where creado_en >= '$INICIO'" >/dev/null
[ -n "$PAGO_ID" ] && sql "delete from pagos where id = $PAGO_ID and referencia = 'ui-fondo'" >/dev/null && echo "Cobro de prueba y movimientos de la corrida borrados"
python3 limpiar_pruebas_ui.py >/dev/null 2>&1
exit $estado
