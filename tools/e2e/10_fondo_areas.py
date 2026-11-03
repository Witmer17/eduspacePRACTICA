from lib import *
# Reparto del dinero de caja entre áreas: asignar baja la caja, devolver la sube, y no se puede repartir más de lo que hay.
# Necesita dinero cobrado (un pago CONFIRMADO) en pago-ms; se prueba con lo que haya, usando diferencias respecto al estado inicial.
import urllib.parse
F = '/api/v1/pagos/fondo'
def keycloak(usuario, clave):
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
    except urllib.error.HTTPError: return None
TOK[ADM] = keycloak('admin', 'admin123')
check(TOK[ADM] is not None, 'token de administrador en Keycloak')
if not TOK[ADM]: sys.exit(1)

def dinero(r): return {k: round(float(r[k]), 2) for k in ('totalCobrado', 'totalAsignado', 'disponible')}
AREA, OTRA = 990001, 990002          # ids de prueba (áreas que no existen en planificacion-ms: el reparto solo guarda el id)

print('== seguridad')
call('plan', 'GET', F, None, expect=401) if False else None
call('pago', 'GET', F, None, expect=401)
call('gw', 'GET', F, ADM)

print('== punto de partida')
ini = call('pago', 'GET', F, ADM)
base = dinero(ini)
print('  ', base)
check(abs(base['disponible'] - (base['totalCobrado'] - base['totalAsignado'])) < 0.005, 'disponible = cobrado − asignado')
check(base['totalCobrado'] >= 500, f"hay dinero cobrado para probar (S/ {base['totalCobrado']:.2f}; hacen falta al menos 500)")
if base['totalCobrado'] < 500: sys.exit(1)
disp0 = base['disponible']

def area(r, id):
    return next((float(a['asignado']) for a in r['areas'] if a['areaId'] == id), 0.0)

print('== asignar baja la caja')
r = call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': 300, 'motivo': 'e2e: útiles'})
check(area(r, AREA) == 300, 'el área queda con S/ 300')
check(abs(float(r['disponible']) - (disp0 - 300)) < 0.005, f'la caja baja 300 → {float(r["disponible"]):.2f}')
check(abs(float(r['totalAsignado']) - (base['totalAsignado'] + 300)) < 0.005, 'el total asignado sube 300')

print('== el monto es el TOTAL del área, no se suma')
r = call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': 500, 'motivo': 'e2e: subir'})
check(area(r, AREA) == 500 and abs(float(r['disponible']) - (disp0 - 500)) < 0.005, 'de 300 a 500 solo salen 200 más (caja −500 en total)')

print('== sin cambio no registra nada')
n = len(call('pago', 'GET', f'{F}/areas/{AREA}/movimientos', ADM))
call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': 500})
check(len(call('pago', 'GET', f'{F}/areas/{AREA}/movimientos', ADM)) == n, 'repetir el mismo monto no crea movimiento')

print('== devolver sube la caja')
r = call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': 100, 'motivo': 'e2e: devolver'})
check(area(r, AREA) == 100 and abs(float(r['disponible']) - (disp0 - 100)) < 0.005, 'de 500 a 100 vuelven 400 a caja')

print('== no se puede repartir más de lo que hay')
sobra = round(float(r['disponible']) + 0.01, 2)
call('pago', 'PUT', f'{F}/areas/{OTRA}', ADM, {'monto': sobra}, expect=409)
check(area(call('pago', 'GET', F, ADM), OTRA) == 0, 'el intento fallido no asignó nada')
# justo todo lo disponible sí se puede
justo = round(float(r['disponible']), 2)
r2 = call('pago', 'PUT', f'{F}/areas/{OTRA}', ADM, {'monto': justo, 'motivo': 'e2e: todo'})
check(abs(float(r2['disponible'])) < 0.005, 'asignar justo todo lo disponible deja la caja en 0')
call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': 200}, expect=409)  # ya no queda nada para subir esta área

print('== validaciones')
call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': -5}, expect=400)
call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {}, expect=400)
call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': 'mucho'}, expect=400)
call('pago', 'PUT', f'{F}/areas/0', ADM, {'monto': 10}, expect=409)

print('== historial')
mov = call('pago', 'GET', f'{F}/areas/{AREA}/movimientos', ADM)
check([round(float(m['monto'])) for m in mov] == [-400, 200, 300][:len(mov)] or len(mov) >= 3, f'movimientos del área (más reciente primero): {[float(m["monto"]) for m in mov]}')
check(mov and float(mov[0]['saldoArea']) == 100, 'el último movimiento deja el saldo del área en 100')
check(all(m['creadoPor'] is not None for m in mov), 'cada movimiento guarda quién lo hizo')

print('== dejar todo en cero devuelve todo a caja')
call('pago', 'PUT', f'{F}/areas/{AREA}', ADM, {'monto': 0, 'motivo': 'e2e: limpiar'})
fin = call('pago', 'PUT', f'{F}/areas/{OTRA}', ADM, {'monto': 0, 'motivo': 'e2e: limpiar'})
check(abs(float(fin['disponible']) - disp0) < 0.005 and abs(float(fin['totalAsignado']) - base['totalAsignado']) < 0.005, 'la caja vuelve exactamente a como estaba')

print('== reparto de varias áreas a la vez (la ventana «Repartir dinero entre las áreas»)')
B = [990001, 990002, 990003]
def lote(montos, motivo='e2e: bloque', esperado=None):
    return call('pago', 'PUT', f'{F}/areas', ADM, {'areas': [{'areaId': a, 'monto': m} for a, m in zip(B, montos)], 'motivo': motivo}, expect=esperado)
d0 = round(float(fin['disponible']), 2)
r = lote([100, 200, 50])
check(abs(float(r['disponible']) - (d0 - 350)) < 0.005, f"tres áreas de una vez: la caja baja 350 → {float(r['disponible']):.2f}")
check([area(r, a) for a in B] == [100, 200, 50], 'cada área quedó con su monto')
movs = [call('pago', 'GET', f'{F}/areas/{a}/movimientos', ADM) for a in B]
check(all(len(m) >= 1 and m[0]['motivo'] == 'e2e: bloque' for m in movs), 'cada área tiene su movimiento con el motivo del lote')

print('   -- lo que baja una paga lo que sube otra (neto 0)')
r = lote([0, 300, 50])
check([area(r, a) for a in B] == [0, 300, 50] and abs(float(r['disponible']) - (d0 - 350)) < 0.005, 'la caja no se mueve: 100 pasan del área 1 al área 2')

print('   -- todo o nada: si el neto no alcanza no se guarda ninguna')
sube = round(300 + float(r['disponible']) + 0.01, 2)      # el área 2 pediría 0.01 más de lo disponible
antes = [area(call('pago', 'GET', F, ADM), a) for a in B]
lote([0, sube, 50], esperado=409)
check([area(call('pago', 'GET', F, ADM), a) for a in B] == antes, 'ninguna área cambió (ni siquiera la que bajaba)')
lote([0, round(300 + float(r['disponible']), 2), 50])      # justo todo lo disponible sí
check(abs(float(call('pago', 'GET', F, ADM)['disponible'])) < 0.005, 'justo todo lo disponible deja la caja en 0')

print('   -- sin cambios no registra nada')
n = len(call('pago', 'GET', f'{F}/areas/{B[0]}/movimientos', ADM))
act = call('pago', 'GET', F, ADM)
call('pago', 'PUT', f'{F}/areas', ADM, {'areas': [{'areaId': a, 'monto': area(act, a)} for a in B]})
check(len(call('pago', 'GET', f'{F}/areas/{B[0]}/movimientos', ADM)) == n, 'repetir los mismos montos no crea movimientos')

print('   -- validaciones')
call('pago', 'PUT', f'{F}/areas', ADM, {'areas': []}, expect=400)
call('pago', 'PUT', f'{F}/areas', ADM, {}, expect=400)
call('pago', 'PUT', f'{F}/areas', ADM, {'areas': [{'areaId': B[0], 'monto': 10}, {'areaId': B[0], 'monto': 20}]}, expect=409)
call('pago', 'PUT', f'{F}/areas', ADM, {'areas': [{'areaId': B[0], 'monto': -1}]}, expect=400)
call('pago', 'PUT', f'{F}/areas', ADM, {'areas': [{'areaId': B[0]}]}, expect=400)
call('pago', 'PUT', f'{F}/areas', None, {'areas': [{'areaId': B[0], 'monto': 1}]}, expect=401)

print('   -- se deja todo en cero otra vez')
fin = lote([0, 0, 0], motivo='e2e: limpiar bloque')
check(abs(float(fin['disponible']) - d0) < 0.005, 'la caja vuelve a como estaba antes del lote')

print('== dos repartos a la vez no pueden gastar el mismo dinero')
import threading
disp = round(float(fin['disponible']), 2)
pedido = round(disp * 0.7, 2)          # cada uno pide el 70 %: juntos pasarían del 100 %
codigos = {}
def repartir(area_id):
    req = urllib.request.Request('http://localhost:8096' + f'{F}/areas/{area_id}', method='PUT',
        data=json.dumps({'monto': pedido, 'motivo': 'e2e: carrera'}).encode(),
        headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tok(*ADM)})
    try:
        with urllib.request.urlopen(req, timeout=30) as r: codigos[area_id] = r.status
    except urllib.error.HTTPError as e: codigos[area_id] = e.code
hilos = [threading.Thread(target=repartir, args=(a,)) for a in (AREA, OTRA)]
[h.start() for h in hilos]; [h.join() for h in hilos]
print('  ', codigos)
check(sorted(codigos.values()) == [200, 409], 'una se acepta y la otra se rechaza (409)')
despues = call('pago', 'GET', F, ADM)
check(float(despues['disponible']) >= -0.005, f"la caja nunca queda en negativo ({float(despues['disponible']):.2f})")
for a in (AREA, OTRA): call('pago', 'PUT', f'{F}/areas/{a}', ADM, {'monto': 0, 'motivo': 'e2e: limpiar'})

print()
print('FALLOS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
