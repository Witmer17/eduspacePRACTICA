from lib import *
# Quita lo que deja el recorrido de interfaz (ui_personal.cjs): las personas «UI Prueba Docente …» pierden sus asignaciones, sus pagos
# pendientes y su contrato vigente, y se dan de baja. Los pagos ya realizados y la asistencia se conservan (historial).
import urllib.parse
P = '/api/v1/planificacion'
def keycloak(usuario, clave):
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
    except urllib.error.HTTPError: return None
TOK[ADM] = keycloak('admin', 'admin123')
if not TOK[ADM]: print('No se pudo iniciar sesión en Keycloak'); sys.exit(1)

def pruebas():
    pagina, out = 0, []
    while True:
        r = call('plan', 'GET', f'{P}/docentes?todas=true&size=100&page={pagina}', ADM)
        out += [d for d in r['contenido'] if d['nombres'] == 'UI' and d['apellidos'].startswith('Prueba ')]
        pagina += 1
        if pagina >= r['totalPaginas']: return out

todas = pruebas()
# Aunque ya estén dadas de baja, se rescinden los contratos que les queden (p. ej. renovaciones futuras creadas por las pruebas).
for d in todas:
    if d['estado'] == 'ACTIVO': continue
    for c in call('plan', 'GET', f"{P}/rrhh/contratos?personalId={d['id']}", ADM):
        if c['estado'] == 'VIGENTE': call('plan', 'POST', f"{P}/rrhh/contratos/{c['id']}/rescindir", ADM, {'motivo': 'Limpieza de prueba'})
personas = [d for d in todas if d['estado'] == 'ACTIVO']
print(f'== {len(personas)} persona(s) de prueba de la interfaz por limpiar')
for d in personas:
    for a in call('plan', 'GET', f"{P}/asignaciones?docenteId={d['id']}", ADM): call('plan', 'DELETE', f"{P}/asignaciones/{a['id']}", ADM)
    for pago in call('plan', 'GET', f"{P}/rrhh/pagos?personalId={d['id']}", ADM):
        if pago['estado'] == 'PENDIENTE': call('plan', 'DELETE', f"{P}/rrhh/pagos/{pago['id']}", ADM)
    for c in call('plan', 'GET', f"{P}/rrhh/contratos?personalId={d['id']}", ADM):
        if c['estado'] == 'VIGENTE': call('plan', 'POST', f"{P}/rrhh/contratos/{c['id']}/rescindir", ADM, {'motivo': 'Limpieza de prueba'})
    call('plan', 'DELETE', f"{P}/docentes/{d['id']}", ADM)
# Las cuentas de acceso que crea la interfaz de prueba («ui.…») y la de secretaría se dejan desactivadas.
cuentas = [u for u in call('auth', 'GET', '/api/v1/auth/usuarios?size=100', ADM)['contenido']
           if (u['username'].startswith('ui.') or u['username'] == 'secretaria907') and u['activo']]
print(f'== {len(cuentas)} cuenta(s) de prueba por desactivar')
for u in cuentas: call('auth', 'PATCH', f"/api/v1/auth/usuarios/{u['id']}/desactivar", ADM)
print('FALLOS:', len(FAILS))
sys.exit(1 if FAILS else 0)
