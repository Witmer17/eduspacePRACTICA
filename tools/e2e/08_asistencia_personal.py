from lib import *
# Asistencia del personal: validaciones, guardado del día completo, borrado al desmarcar y seguridad. Documentos únicos por ejecución.
import urllib.parse
P = '/api/v1/planificacion'
A = P + '/asistencia-personal'
sufijo = str(int(time.time()))[-7:]
def keycloak(usuario, clave):
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
    except urllib.error.HTTPError: return None
TOK[ADM] = keycloak('admin', 'admin123')
check(TOK[ADM] is not None, 'token de administrador en Keycloak')
if not TOK[ADM]: sys.exit(1)

hoy = datetime.date.today().isoformat()
ayer = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()
manana = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()

print('== seguridad')
call('plan', 'GET', f'{A}?desde={hoy}&hasta={hoy}', None, expect=401)
call('gw', 'GET', f'{A}?desde={hoy}&hasta={hoy}', ADM)

print('== personas de prueba')
a = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '7' + sufijo, 'nombres': 'Carla', 'apellidos': 'Prueba Asistencia', 'areaId': 9})
b = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '6' + sufijo, 'nombres': 'Diego', 'apellidos': 'Prueba Asistencia', 'areaId': 9})

print('== validaciones')
call('plan', 'GET', f'{A}?desde={hoy}', ADM, expect=400)                                   # falta hasta
call('plan', 'GET', f'{A}?desde={hoy}&hasta={ayer}', ADM, expect=409)                      # rango invertido
call('plan', 'GET', f'{A}?desde=2020-01-01&hasta={hoy}', ADM, expect=409)                  # más de un año
call('plan', 'PUT', A + '/dia', ADM, {'fecha': manana, 'marcas': [{'personalId': a['id'], 'estado': 'PRESENTE'}]}, expect=409)  # futuro
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': []}, expect=400)             # sin marcas
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': a['id'], 'estado': 'VOLANDO'}]}, expect=409)
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': 99999999, 'estado': 'PRESENTE'}]}, expect=404)
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': a['id'], 'estado': 'PRESENTE'}, {'personalId': a['id'], 'estado': 'FALTA'}]}, expect=409)  # repetida
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': a['id'], 'estado': 'PRESENTE', 'horaEntrada': '09:00', 'horaSalida': '08:00'}]}, expect=409)  # salida antes de entrada
check(not [r for r in call('plan', 'GET', f"{A}?desde={hoy}&hasta={hoy}&personalId={a['id']}", ADM)], 'una marca inválida no guarda nada (todo o nada)')

print('== guardar el día')
r = call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [
    {'personalId': a['id'], 'estado': 'TARDANZA', 'horaEntrada': '08:20', 'horaSalida': '16:00', 'observacion': 'Tráfico'},
    {'personalId': b['id'], 'estado': 'FALTA', 'horaEntrada': '08:00', 'observacion': 'Sin aviso'}]})
check(r and r['guardadas'] == 2, 'guarda las dos marcas')
dia = {x['personalId']: x for x in call('plan', 'GET', f'{A}?desde={hoy}&hasta={hoy}', ADM)}
check(dia[a['id']]['estado'] == 'TARDANZA' and dia[a['id']]['horaEntrada'].startswith('08:20') and dia[a['id']]['observacion'] == 'Tráfico', 'la tardanza conserva horas y observación')
check(dia[b['id']]['estado'] == 'FALTA' and dia[b['id']].get('horaEntrada') is None, 'la falta no lleva horas')

print('== corregir y desmarcar')
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': a['id'], 'estado': 'PRESENTE', 'horaEntrada': '08:00'}]})
una = call('plan', 'GET', f"{A}?desde={hoy}&hasta={hoy}&personalId={a['id']}", ADM)
check(len(una) == 1 and una[0]['estado'] == 'PRESENTE', 'volver a guardar actualiza, no duplica')
r = call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': a['id'], 'estado': ''}]})
check(r and r['borradas'] == 1, 'estado vacío borra el registro')
check(not call('plan', 'GET', f"{A}?desde={hoy}&hasta={hoy}&personalId={a['id']}", ADM), 'el día queda sin marcar')
call('plan', 'PUT', A + '/dia', ADM, {'fecha': ayer, 'marcas': [{'personalId': b['id'], 'estado': 'JUSTIFICADA', 'observacion': 'Cita médica'}]})
rango = call('plan', 'GET', f"{A}?desde={ayer}&hasta={hoy}&personalId={b['id']}", ADM)
check([x['estado'] for x in rango] == ['JUSTIFICADA', 'FALTA'], 'el rango devuelve los días en orden')

print('== baja de quien tiene asistencia')
call('plan', 'DELETE', f"{P}/docentes/{b['id']}", ADM, expect=204)
check(call('plan', 'GET', f"{P}/docentes/{b['id']}", ADM)['estado'] == 'INACTIVO', 'con asistencia se da de baja, no se borra')
call('plan', 'PUT', A + '/dia', ADM, {'fecha': hoy, 'marcas': [{'personalId': b['id'], 'estado': 'PRESENTE'}]}, expect=409)  # inactivo
call('plan', 'DELETE', f"{P}/docentes/{a['id']}", ADM, expect=204)

print()
print('FALLOS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
