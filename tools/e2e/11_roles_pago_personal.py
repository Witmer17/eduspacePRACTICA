from lib import *
# Quién puede qué en lo de contratos, pagos, asistencia del personal y reparto de caja: solo el ADMIN toca el dinero; la secretaría solo
# ve la asistencia del personal; docente y cajero no entran. Las cuentas de prueba se crean por auth-ms (que las sincroniza con Keycloak).
import urllib.parse
P = '/api/v1/planificacion'
R, A = P + '/rrhh', P + '/asistencia-personal'
F = '/api/v1/pagos/fondo'
CLAVE = 'Clave12345'
def keycloak(usuario, clave):
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
    except urllib.error.HTTPError as e:
        print('     (Keycloak respondió', e.code, e.read().decode()[:150] + ')'); return None

def cuenta(etiqueta, rol):
    """Crea la cuenta por auth-ms si no existe (la librería lo hace al primer uso) y devuelve su token de Keycloak."""
    tok(etiqueta, rol)                                   # crea la cuenta (y entra por auth-ms)
    usuario = f'{rol.lower()}{etiqueta}'
    t = keycloak(usuario, CLAVE)
    TOK[(etiqueta, rol)] = t
    return t

TOK[ADM] = keycloak('admin', 'admin123')
check(TOK[ADM] is not None, 'token de administrador en Keycloak')
if not TOK[ADM]: sys.exit(1)
SEC, DOC, CAJ = (907, 'SECRETARIA'), (905, 'DOCENTE'), (903, 'CAJERO')
NOMBRES = {f'{rol.lower()}{etiqueta}' for etiqueta, rol in (SEC, DOC, CAJ)}
def usuarios_prueba():
    return [u for u in call('auth', 'GET', '/api/v1/auth/usuarios?size=100', ADM)['contenido'] if u['username'] in NOMBRES]
# Si una ejecución anterior las dejó desactivadas, se reactivan (conservan su clave).
for u in usuarios_prueba():
    if not u['activo']: call('auth', 'PATCH', f"/api/v1/auth/usuarios/{u['id']}/activar", ADM)
for who in (SEC, DOC, CAJ):
    t = cuenta(*who)
    check(t is not None, f'la cuenta {who[1].lower()}{who[0]} puede iniciar sesión en Keycloak')
    if not t: print('  Sin token no se puede seguir probando este rol.'); sys.exit(1)

hoy = datetime.date.today().isoformat()
print('== secretaría: solo la asistencia del personal')
call('plan', 'GET', f'{A}?desde={hoy}&hasta={hoy}', SEC, expect=200)
call('plan', 'GET', R + '/contratos', SEC, expect=403)
call('plan', 'GET', R + '/pagos?periodo=2026-11', SEC, expect=403)
call('plan', 'POST', R + '/planilla/2026-11', SEC, expect=403)
call('plan', 'POST', R + '/contratos', SEC, {'personalId': 1, 'tipo': 'INDEFINIDO', 'fechaInicio': '2026-01-01', 'remuneracion': 1000}, expect=403)
call('pago', 'GET', F, SEC, expect=403)
call('pago', 'PUT', F + '/areas/1', SEC, {'monto': 10}, expect=403)
call('pago', 'GET', F + '/areas/1/movimientos', SEC, expect=403)

print('== docente: nada de esto')
call('plan', 'GET', f'{A}?desde={hoy}&hasta={hoy}', DOC, expect=403)
call('plan', 'PUT', A + '/dia', DOC, {'fecha': hoy, 'marcas': [{'personalId': 1, 'estado': 'PRESENTE'}]}, expect=403)
call('plan', 'GET', R + '/contratos', DOC, expect=403)
call('plan', 'POST', R + '/planilla/2026-11', DOC, expect=403)
call('pago', 'GET', F, DOC, expect=403)
call('pago', 'PUT', F + '/areas/1', DOC, {'monto': 10}, expect=403)

print('== cajero: tampoco')
call('plan', 'GET', R + '/contratos', CAJ, expect=403)
call('plan', 'GET', f'{A}?desde={hoy}&hasta={hoy}', CAJ, expect=403)
call('pago', 'GET', F, CAJ, expect=403)
call('pago', 'PUT', F + '/areas/1', CAJ, {'monto': 10}, expect=403)

print('== por el Gateway se aplica lo mismo')
call('gw', 'GET', R + '/contratos', SEC, expect=403)
call('gw', 'GET', F, DOC, expect=403)
call('gw', 'GET', f'{A}?desde={hoy}&hasta={hoy}', SEC, expect=200)
call('gw', 'GET', R + '/contratos', ADM, expect=200)

print('== el administrador sí')
call('plan', 'GET', R + '/contratos', ADM, expect=200)
call('plan', 'GET', f'{A}?desde={hoy}&hasta={hoy}', ADM, expect=200)
call('pago', 'GET', F, ADM, expect=200)

print('== se desactivan las cuentas de prueba (no se borran: auth-ms conserva el historial; la próxima ejecución las reactiva)')
for u in usuarios_prueba():
    if u['activo']: call('auth', 'PATCH', f"/api/v1/auth/usuarios/{u['id']}/desactivar", ADM)
check(all(not u['activo'] for u in usuarios_prueba()), 'las tres cuentas quedan desactivadas')
for who in (SEC, DOC, CAJ):
    check(keycloak(f'{who[1].lower()}{who[0]}', CLAVE) is None, f'{who[1].lower()}{who[0]} ya no puede entrar por Keycloak')

print()
print('FALLOS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
