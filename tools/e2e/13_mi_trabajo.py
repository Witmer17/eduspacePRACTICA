from lib import *
# «Mi trabajo»: cada persona del personal (docente, caja) ve SOLO lo suyo — ficha, contrato, pagos, asistencia y cuenta de depósito —
# y no puede ver lo de otra persona ni cambiar nada; familias y cuentas sin ficha no entran. Las cuentas de prueba se crean y se desactivan al final.
import urllib.parse
P = '/api/v1/planificacion'
R, A, M = P + '/rrhh', P + '/asistencia-personal', P + '/mi-personal'
CLAVE = 'Clave12345'
def keycloak(usuario, clave):
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
    except urllib.error.HTTPError as e:
        print('     (Keycloak respondió', e.code, e.read().decode()[:150] + ')'); return None
def cuenta(who):
    tok(*who)                                            # crea la cuenta por auth-ms si no existe
    TOK[who] = keycloak(f'{who[1].lower()}{who[0]}', CLAVE)
    return TOK[who]

ESTADO = '/tmp/mi_trabajo_estado.json'
def limpiar(e):
    """Borra lo de prueba: asistencia, pagos pendientes, cuentas; rescinde contratos, da de baja a las personas y desactiva las cuentas de acceso."""
    print('== limpieza')
    for f in e['fechas']: call('plan', 'PUT', A + '/dia', ADM, {'fecha': f, 'marcas': [{'personalId': i, 'estado': ''} for i in e['personas']]})
    for i in e['personas']:
        # un pago ya realizado no se elimina (regla del sistema): queda de historial de la persona de prueba, que se da de baja
        for x in call('plan', 'GET', f"{R}/pagos?personalId={i}", ADM):
            if x['estado'] == 'PENDIENTE': call('plan', 'DELETE', f"{R}/pagos/{x['id']}", ADM)
    for i in e['cuentas']: call('plan', 'DELETE', f"{R}/cuentas/{i}", ADM)
    for i in e['contratos']: call('plan', 'POST', f"{R}/contratos/{i}/rescindir", ADM, {'fecha': e['hoy'], 'motivo': 'Fin de la prueba'})
    for i in e['personas']: call('plan', 'DELETE', f"{P}/docentes/{i}", ADM)
    for u in call('auth', 'GET', '/api/v1/auth/usuarios?size=100', ADM)['contenido']:
        if u['username'] in e['usuarios'] and u['activo']: call('auth', 'PATCH', f"/api/v1/auth/usuarios/{u['id']}/desactivar", ADM)

TOK[ADM] = keycloak('admin', 'admin123')
check(TOK[ADM] is not None, 'token de administrador en Keycloak')
if not TOK[ADM]: sys.exit(1)
if '--limpiar' in sys.argv:       # limpia lo que dejó --preparar
    if os.path.exists(ESTADO):
        limpiar(json.load(open(ESTADO))); os.remove(ESTADO)
    sys.exit(1 if FAILS else 0)
s = str(int(time.time()))[-6:]
base = int(s) + 7_000_000
D1, D2, CJ, AP, SIN = (base, 'DOCENTE'), (base + 1, 'DOCENTE'), (base + 2, 'CAJERO'), (base + 3, 'APODERADO'), (base + 4, 'DOCENTE')
for who in (D1, D2, CJ, AP, SIN):
    check(cuenta(who) is not None, f'la cuenta {who[1].lower()}{who[0]} inicia sesión en Keycloak')
    if not TOK[who]: sys.exit(1)

hoy = datetime.date.today().isoformat()
mes = hoy[:7]
p1 = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '31' + s, 'nombres': 'UI', 'apellidos': 'Prueba Mi Trabajo Uno ' + s, 'cargo': 'Docente de aula'})
p2 = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '32' + s, 'nombres': 'UI', 'apellidos': 'Prueba Mi Trabajo Dos ' + s})
p3 = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '33' + s, 'nombres': 'UI', 'apellidos': 'Prueba Mi Trabajo Caja ' + s, 'cargo': 'Cajera'})
for p, who in ((p1, D1), (p2, D2), (p3, CJ)):
    call('plan', 'PATCH', f"{P}/docentes/{p['id']}/usuario", ADM, {'usuarioId': uid(who)})

c1 = call('plan', 'POST', R + '/contratos', ADM, {'personalId': p1['id'], 'tipo': 'PLAZO_FIJO', 'fechaInicio': '2026-01-01', 'fechaFin': '2026-12-31', 'remuneracion': 1500})
c2 = call('plan', 'POST', R + '/contratos', ADM, {'personalId': p2['id'], 'tipo': 'INDEFINIDO', 'fechaInicio': '2026-01-01', 'remuneracion': 2000})
pg1 = call('plan', 'POST', R + '/pagos', ADM, {'personalId': p1['id'], 'contratoId': c1['id'], 'periodo': '2020-01', 'concepto': 'SUELDO', 'monto': 1500})   # periodo antiguo: el pagado queda de historial sin ensuciar los meses reales
call('plan', 'POST', f"{R}/pagos/{pg1['id']}/pagar", ADM, {'medio': 'TRANSFERENCIA'})
pg1b = call('plan', 'POST', R + '/pagos', ADM, {'personalId': p1['id'], 'contratoId': c1['id'], 'periodo': '2026-11', 'concepto': 'DESCUENTO', 'monto': 50, 'descripcion': 'Prueba'})
pg2 = call('plan', 'POST', R + '/pagos', ADM, {'personalId': p2['id'], 'contratoId': c2['id'], 'periodo': '2026-10', 'concepto': 'SUELDO', 'monto': 2000})
cu1 = call('plan', 'POST', R + '/cuentas', ADM, {'personalId': p1['id'], 'banco': 'BCP', 'tipo': 'AHORROS', 'numero': '19412345678901', 'titular': 'UI Prueba Uno'})
cu2 = call('plan', 'POST', R + '/cuentas', ADM, {'personalId': p2['id'], 'banco': 'YAPE', 'tipo': 'BILLETERA', 'numero': '987654321', 'titular': 'UI Prueba Dos'})
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': p1['id'], 'estado': 'PRESENTE', 'horaEntrada': '07:50:00'}, {'personalId': p2['id'], 'estado': 'FALTA'}]})
ayer = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()
call('plan', 'PUT', A + '/dia', ADM, {'fecha': ayer, 'marcas': [{'personalId': p1['id'], 'estado': 'FALTA'}]})     # una falta para ver el descuento en pantalla
E = {'hoy': hoy, 'fechas': [hoy, ayer], 'personas': [p1['id'], p2['id'], p3['id']], 'contratos': [c1['id'], c2['id']], 'cuentas': [cu1['id'], cu2['id']],
     'usuarios': [f'{w[1].lower()}{w[0]}' for w in (D1, D2, CJ, AP, SIN)], 'docente': f'{D1[1].lower()}{D1[0]}', 'caja': f'{CJ[1].lower()}{CJ[0]}', 'sin_ficha': f'{SIN[1].lower()}{SIN[0]}'}
if '--preparar' in sys.argv:      # deja los datos para el recorrido de la interfaz; se quitan con --limpiar
    json.dump(E, open(ESTADO, 'w')); print('PREPARADO', json.dumps(E)); sys.exit(1 if FAILS else 0)

print('== docente 1: ve lo suyo, y solo lo suyo')
f = call('plan', 'GET', M, D1, expect=200)
check(f and f['id'] == p1['id'] and f['cargo'] == 'Docente de aula', 'su ficha es la de su persona')
ct = call('plan', 'GET', M + '/contratos', D1, expect=200)
check(len(ct) == 1 and ct[0]['id'] == c1['id'] and ct[0]['personalId'] == p1['id'], 've su contrato (y solo ese)')
pa = call('plan', 'GET', M + '/pagos', D1, expect=200)
check({x['id'] for x in pa} == {pg1['id'], pg1b['id']}, 've sus dos pagos (el pagado y el descuento pendiente) y ninguno del colega')
check(all(x['personalId'] == p1['id'] for x in pa), 'todos los pagos son suyos')
pm = call('plan', 'GET', M + '/pagos?periodo=2020-01', D1, expect=200)
check([x['id'] for x in pm] == [pg1['id']], 'puede filtrar sus pagos por mes')
cus = call('plan', 'GET', M + '/cuentas', D1, expect=200)
check([x['id'] for x in cus] == [cu1['id']] and cus[0]['principal'], 've solo su cuenta de depósito, la principal')
asi = call('plan', 'GET', f'{M}/asistencia?desde={mes}-01&hasta={hoy}', D1, expect=200)
check(all(x['personalId'] == p1['id'] for x in asi) and any(x['fecha'] == hoy and x['estado'] == 'PRESENTE' for x in asi), 've su asistencia (hoy presente) y nada de los demás')

print('== no puede pedir lo de otra persona')
ct = call('plan', 'GET', f"{M}/contratos?personalId={p2['id']}", D1, expect=200)
check(all(x['personalId'] == p1['id'] for x in ct), 'poner personalId de otra persona no cambia nada: sigue viendo lo suyo')
pa = call('plan', 'GET', f"{M}/pagos?personalId={p2['id']}", D1, expect=200)
check(pg2['id'] not in {x['id'] for x in pa}, 'el pago del colega no aparece')
asi = call('plan', 'GET', f"{M}/asistencia?desde={hoy}&hasta={hoy}&personalId={p2['id']}", D1, expect=200)
check(all(x['personalId'] == p1['id'] for x in asi), 'la asistencia del colega no aparece')
call('plan', 'GET', f"{R}/contratos?personalId={p2['id']}", D1, expect=403)      # la vía del administrador sigue cerrada
call('plan', 'GET', f"{A}?desde={hoy}&hasta={hoy}", D1, expect=403)

print('== docente 2 y caja: cada uno lo suyo')
f2 = call('plan', 'GET', M, D2, expect=200)
check(f2['id'] == p2['id'], 'el colega ve su propia ficha')
pa2 = call('plan', 'GET', M + '/pagos', D2, expect=200)
check([x['id'] for x in pa2] == [pg2['id']], 'el colega ve solo su pago')
cus2 = call('plan', 'GET', M + '/cuentas', D2, expect=200)
check(len(cus2) == 1 and cus2[0]['banco'] == 'YAPE', 'el colega ve su billetera Yape')
asi2 = call('plan', 'GET', f'{M}/asistencia?desde={hoy}&hasta={hoy}', D2, expect=200)
check(len(asi2) == 1 and asi2[0]['estado'] == 'FALTA', 'el colega ve su falta')
fc = call('plan', 'GET', M, CJ, expect=200)
check(fc['id'] == p3['id'], 'caja entra con su ficha')
check(call('plan', 'GET', M + '/contratos', CJ, expect=200) == [] and call('plan', 'GET', M + '/cuentas', CJ, expect=200) == [], 'caja sin contrato ni cuenta ve listas vacías (no las de otros)')

print('== solo lectura y solo personal')
call('plan', 'POST', M + '/cuentas', D1, {'personalId': p1['id'], 'banco': 'BCP', 'tipo': 'AHORROS', 'numero': '19412345678999', 'titular': 'X'}, expect=403)
call('plan', 'DELETE', M + '/cuentas', D1, expect=403)
call('plan', 'GET', M, AP, expect=403)
call('plan', 'GET', M + '/contratos', AP, expect=403)
call('plan', 'GET', M, None, expect=401)
call('plan', 'GET', M, SIN, expect=404)
call('plan', 'GET', M + '/pagos', SIN, expect=404)
call('plan', 'GET', M + '/cuentas', SIN, expect=404)

print('== por el Gateway')
call('gw', 'GET', M, D1, expect=200)
call('gw', 'GET', M + '/pagos', D1, expect=200)

limpiar(E)

print('\nFALLAS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
