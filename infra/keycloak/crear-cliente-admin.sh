#!/bin/bash
# Crea (o actualiza) en el realm "eduspace" el cliente de servicio "eduspace-admin" que usa auth-ms para administrar cuentas y roles
# por la Admin REST API de Keycloak. Es idempotente: se puede repetir. Hace falta porque el import del realm se omite si ya existe.
#
# Uso:  KEYCLOAK_ADMIN_SECRET='<secreto>' ./crear-cliente-admin.sh
# El MISMO secreto debe exportarse al arrancar auth-ms (variable KEYCLOAK_ADMIN_SECRET). No se guarda en el repositorio.
# Permisos mínimos: solo manage-users, view-users, query-users y view-realm de realm-management (no es admin del realm master).
CT=${CONTENEDORES:-podman}; NOMBRE=${KC_CONTENEDOR:-eduspace-keycloak}; REALM=eduspace; CLIENTE=eduspace-admin
KCADM="$CT exec $NOMBRE /opt/keycloak/bin/kcadm.sh"
[ -z "$KEYCLOAK_ADMIN_SECRET" ] && { echo "Define KEYCLOAK_ADMIN_SECRET (el secreto del cliente $CLIENTE)."; exit 1; }

$KCADM config credentials --server http://localhost:8080 --realm master \
  --user ${KC_ADMIN:-admin} --password ${KC_ADMIN_PASSWORD:-admin} >/dev/null || { echo "No pude entrar a Keycloak como admin de master."; exit 1; }

ID=$($KCADM get clients -r $REALM -q clientId=$CLIENTE --fields id --format csv --noquotes 2>/dev/null | tr -d '\r')
if [ -z "$ID" ]; then
  $KCADM create clients -r $REALM -s clientId=$CLIENTE -s name="EduSpace administración de cuentas (auth-ms)" -s enabled=true \
    -s publicClient=false -s serviceAccountsEnabled=true -s standardFlowEnabled=false -s directAccessGrantsEnabled=false \
    -s secret="$KEYCLOAK_ADMIN_SECRET" >/dev/null || exit 1
  echo "Cliente $CLIENTE creado."
else
  $KCADM update clients/$ID -r $REALM -s secret="$KEYCLOAK_ADMIN_SECRET" >/dev/null || exit 1
  echo "Cliente $CLIENTE ya existía: secreto actualizado."
fi

$KCADM add-roles -r $REALM --uusername service-account-$CLIENTE --cclientid realm-management \
  --rolename manage-users --rolename view-users --rolename query-users --rolename view-realm >/dev/null || exit 1
echo "Permisos asignados (manage-users, view-users, query-users, view-realm)."
