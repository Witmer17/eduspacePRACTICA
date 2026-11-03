from lib import *
# Un contrato por persona (solo se renueva), renovación sin huecos ni doble pago, y cuentas para depósito. Documentos únicos por ejecución.
import urllib.parse
P = '/api/v1/planificacion'
R = P + '/rrhh'
def keycloak(usuario, clave):
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
    except urllib.error.HTTPError: return None
TOK[ADM] = keycloak('admin', 'admin123')
check(TOK[ADM] is not None, 'token de administrador en Keycloak')
if not TOK[ADM]: sys.exit(1)
s = str(int(time.time()))[-6:]
a = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '21' + s, 'nombres': 'UI', 'apellidos': 'Prueba Cuenta A ' + s, 'cargo': 'Docente de aula'})
b = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '22' + s, 'nombres': 'UI', 'apellidos': 'Prueba Cuenta B ' + s})

print('== un solo contrato por persona')
base = {'tipo': 'PLAZO_FIJO', 'fechaInicio': '2026-01-01', 'fechaFin': '2026-12-31', 'remuneracion': 1500}
c1 = call('plan', 'POST', R + '/contratos', ADM, {**base, 'personalId': a['id']})
check(c1 and c1['estadoEfectivo'] in ('VIGENTE', 'POR_VENCER'), 'la persona A queda con su contrato vigente')
r = call('plan', 'POST', R + '/contratos', ADM, {**base, 'personalId': a['id'], 'fechaInicio': '2030-01-01', 'fechaFin': '2030-12-31'}, expect=409)
check('ya tiene un contrato vigente' in (r or {}).get('mensaje', '') and 'Renovar contrato' in r['mensaje'], 'otro contrato (aunque no se cruce en fechas) se rechaza y se sugiere renovar: ' + str((r or {}).get('mensaje', ''))[:110])
call('plan', 'POST', R + '/contratos', ADM, {**base, 'personalId': a['id'], 'tipo': 'INDEFINIDO', 'fechaFin': None}, expect=409)
cb = call('plan', 'POST', R + '/contratos', ADM, {**base, 'personalId': b['id']})
check(cb is not None, 'OTRA persona puede tener exactamente el mismo periodo (A y B con 01 ene → 31 dic 2026)')

print('== renovar')
r1 = call('plan', 'POST', f"{R}/contratos/{c1['id']}/renovar", ADM, {'fechaFin': '2027-12-31', 'observaciones': 'Renovación anual'})
check(r1 and r1['fechaInicio'] == '2027-01-01' and r1['fechaFin'] == '2027-12-31', 'el nuevo empieza el día siguiente al fin del anterior (2027-01-01)')
check(r1 and float(r1['remuneracion']) == 1500 and r1['cargo'] == 'Docente de aula' and r1['tipo'] == 'PLAZO_FIJO', 'hereda sueldo, cargo y tipo')
check(r1 and r1['estadoEfectivo'] == 'POR_INICIAR', 'queda «por iniciar» hasta que termine el anterior')
lista = call('plan', 'GET', f"{R}/contratos?personalId={a['id']}", ADM)
check(len(lista) == 2 and next(c for c in lista if c['id'] == c1['id'])['fechaFin'] == '2026-12-31', 'el anterior queda intacto, terminando en su fecha')
r = call('plan', 'POST', f"{R}/contratos/{c1['id']}/renovar", ADM, {'fechaFin': '2028-12-31'}, expect=409)
check('ya fue renovado' in (r or {}).get('mensaje', ''), 'un contrato ya renovado no se renueva otra vez')
call('plan', 'POST', R + '/contratos', ADM, {**base, 'personalId': a['id'], 'fechaInicio': '2031-01-01', 'fechaFin': '2031-12-31'}, expect=409)  # tampoco uno nuevo: tiene uno por iniciar
call('plan', 'POST', f"{R}/contratos/{r1['id']}/renovar", ADM, {'fechaFin': '2027-06-30'}, expect=409)     # fin antes del inicio de la renovación
call('plan', 'POST', f"{R}/contratos/{r1['id']}/renovar", ADM, {}, expect=409)                              # plazo fijo sin fin
call('plan', 'POST', f"{R}/contratos/{r1['id']}/renovar", ADM, {'tipo': 'XYZ', 'fechaFin': '2028-12-31'}, expect=400)
r2 = call('plan', 'POST', f"{R}/contratos/{r1['id']}/renovar", ADM, {'tipo': 'INDEFINIDO', 'remuneracion': 1800, 'cargo': 'Coordinadora'})
check(r2 and r2['fechaInicio'] == '2028-01-01' and r2['fechaFin'] is None and float(r2['remuneracion']) == 1800, 'se puede renovar pasando a indefinido y con otro sueldo')
r = call('plan', 'POST', f"{R}/contratos/{r2['id']}/renovar", ADM, {'fechaFin': '2029-12-31'}, expect=409)
check('indefinido' in (r or {}).get('mensaje', ''), 'un indefinido no se renueva')

print('== la renovación no duplica el sueldo del mes')
call('plan', 'POST', R + '/planilla/2026-11', ADM)
sueldos = [p for p in call('plan', 'GET', f"{R}/pagos?personalId={a['id']}", ADM) if p['concepto'] == 'SUELDO' and p['periodo'] == '2026-11']
check(len(sueldos) == 1 and float(sueldos[0]['monto']) == 1500, 'un solo sueldo en noviembre (los contratos futuros no cobran antes de empezar)')
for p in call('plan', 'GET', f"{R}/pagos?personalId={a['id']}", ADM): call('plan', 'DELETE', f"{R}/pagos/{p['id']}", ADM)
for p in call('plan', 'GET', f"{R}/pagos?personalId={b['id']}", ADM): call('plan', 'DELETE', f"{R}/pagos/{p['id']}", ADM)

print('== mes de la renovación: una renovación a mitad de mes NO hace pagar el mes dos veces')
def transicion(sufijo_nombre, doc, fin_viejo, sueldo_nuevo):
    p = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': doc + s, 'nombres': 'UI', 'apellidos': 'Prueba Cuenta ' + sufijo_nombre + ' ' + s})
    v = call('plan', 'POST', R + '/contratos', ADM, {'personalId': p['id'], 'tipo': 'PLAZO_FIJO', 'fechaInicio': '2026-01-01', 'fechaFin': fin_viejo, 'remuneracion': 1500})
    n = call('plan', 'POST', f"{R}/contratos/{v['id']}/renovar", ADM, {'fechaFin': '2027-12-31', 'remuneracion': sueldo_nuevo})
    return p, v, n
t, tv, tn = transicion('T', '24', '2026-12-10', 1800)      # 10 días del viejo, 21 del nuevo
u, uv, un = transicion('U', '25', '2026-12-20', 1800)      # 20 días del viejo, 11 del nuevo
check(tn['fechaInicio'] == '2026-12-11' and un['fechaInicio'] == '2026-12-21', 'las renovaciones empiezan el día siguiente (11 y 21 de diciembre)')
call('plan', 'POST', R + '/planilla/2026-12', ADM)
def sueldos_dic(p): return [x for x in call('plan', 'GET', f"{R}/pagos?personalId={p['id']}&periodo=2026-12", ADM) if x['concepto'] == 'SUELDO']
st, su = sueldos_dic(t), sueldos_dic(u)
check(len(st) == 1 and float(st[0]['monto']) == 1800 and st[0]['contratoId'] == tn['id'], f'{len(st)} sueldo en diciembre y es el del contrato NUEVO (cubre 21 días): S/ {[x["monto"] for x in st]}')
check(len(su) == 1 and float(su[0]['monto']) == 1500 and su[0]['contratoId'] == uv['id'], f'{len(su)} sueldo en diciembre y es el del contrato VIEJO (cubre 20 días): S/ {[x["monto"] for x in su]}')
pl = call('plan', 'POST', R + '/planilla/2026-12', ADM)
check(pl['creados'] == 0 and len(sueldos_dic(t)) == 1 and len(sueldos_dic(u)) == 1, 'regenerar la planilla no duplica nada')
for p in (a, b, t, u):
    for x in call('plan', 'GET', f"{R}/pagos?personalId={p['id']}", ADM): call('plan', 'DELETE', f"{R}/pagos/{x['id']}", ADM)

print('== rescindido no se renueva; y después se puede crear uno nuevo')
call('plan', 'POST', f"{R}/contratos/{cb['id']}/rescindir", ADM, {'motivo': 'prueba'})
call('plan', 'POST', f"{R}/contratos/{cb['id']}/renovar", ADM, {'fechaFin': '2027-12-31'}, expect=409)
nuevo = call('plan', 'POST', R + '/contratos', ADM, {**base, 'personalId': b['id'], 'fechaInicio': '2026-11-03', 'fechaFin': '2027-05-03'})
check(nuevo is not None, 'tras rescindir, la persona puede tener un contrato nuevo')

print('== cuentas para depósito')
C = R + '/cuentas'
check(call('plan', 'GET', f"{C}?personalId={a['id']}", ADM) == [], 'empieza sin cuentas')
bcp = {'personalId': a['id'], 'banco': 'BCP', 'tipo': 'AHORROS', 'numero': '194-1234 5678-901', 'titular': 'Ana Prueba'}
c_bcp = call('plan', 'POST', C, ADM, bcp)
check(c_bcp and c_bcp['principal'] and c_bcp['numero'] == '19412345678901', 'la primera cuenta es la principal y se guarda sin espacios ni guiones')
c_yape = call('plan', 'POST', C, ADM, {'personalId': a['id'], 'banco': 'YAPE', 'tipo': 'BILLETERA', 'numero': '987654321', 'titular': 'Ana Prueba'})
check(c_yape and not c_yape['principal'], 'la segunda no es principal')
call('plan', 'POST', C, ADM, bcp, expect=409)                                                                                    # duplicada
call('plan', 'POST', C, ADM, {**bcp, 'numero': '1234567'}, expect=409)                                                           # corta
call('plan', 'POST', C, ADM, {**bcp, 'numero': '1941234abc5678'}, expect=409)                                                    # letras
call('plan', 'POST', C, ADM, {**bcp, 'numero': '19412345678902', 'cci': '1234567890123456789'}, expect=409)                      # CCI de 19
call('plan', 'POST', C, ADM, {**bcp, 'banco': 'BANCO_FANTASMA'}, expect=409)
call('plan', 'POST', C, ADM, {**bcp, 'banco': 'YAPE', 'numero': '987654322'}, expect=409)                                        # Yape no es de ahorros
call('plan', 'POST', C, ADM, {**bcp, 'tipo': 'BILLETERA', 'numero': '987654322'}, expect=409)                                    # un banco no es billetera
call('plan', 'POST', C, ADM, {'personalId': a['id'], 'banco': 'PLIN', 'tipo': 'BILLETERA', 'numero': '98765432', 'titular': 'x'}, expect=409)  # celular de 8
call('plan', 'POST', C, ADM, {**bcp, 'numero': '19412345678903', 'titular': ''}, expect=400)
call('plan', 'POST', C, ADM, {**bcp, 'personalId': 99999999}, expect=404)
ok = call('plan', 'POST', C, ADM, {**bcp, 'banco': 'BBVA', 'numero': '001100001234567890', 'cci': '011 100 000123456789 12'.replace(' ', '')[:20], 'titular': 'Ana Prueba'})
check(ok is not None and ok['cci'] and len(ok['cci']) == 20, 'una cuenta con CCI de 20 dígitos se guarda')
yp = call('plan', 'POST', f"{C}/{c_yape['id']}/principal", ADM)
cuentas = call('plan', 'GET', f"{C}?personalId={a['id']}", ADM)
check(sum(1 for x in cuentas if x['principal']) == 1 and cuentas[0]['id'] == c_yape['id'] and cuentas[0]['principal'], 'hacer principal deja una sola principal (la elegida, primera de la lista)')
ed = call('plan', 'PUT', f"{C}/{c_bcp['id']}", ADM, {**bcp, 'titular': 'Ana P. Prueba'})
check(ed and ed['titular'] == 'Ana P. Prueba', 'editar la cuenta')
call('plan', 'PUT', f"{C}/{c_bcp['id']}", ADM, {**bcp, 'personalId': b['id']}, expect=409)                                      # no se cambia de persona
call('plan', 'DELETE', f"{C}/{c_yape['id']}", ADM, expect=204)                                                                   # quita la principal
cuentas = call('plan', 'GET', f"{C}?personalId={a['id']}", ADM)
check(len(cuentas) == 2 and sum(1 for x in cuentas if x['principal']) == 1, 'al quitar la principal, otra pasa a serlo (queda una sola)')
check(next(x for x in cuentas if x['principal'])['id'] == c_bcp['id'], 'la más antigua que queda es la principal')
call('plan', 'POST', f"{C}/{c_yape['id']}/principal", ADM, expect=404)                                                            # una quitada ya no existe
check(any(x['personalId'] == a['id'] for x in call('plan', 'GET', C, ADM)), 'sin personalId lista las cuentas de todo el personal')
call('plan', 'GET', C, None, expect=401)

print('== a quien está de baja no se le agregan cuentas')
call('plan', 'DELETE', f"{P}/docentes/{b['id']}", ADM, expect=204)
call('plan', 'POST', C, ADM, {**bcp, 'personalId': b['id']}, expect=409)

print('== limpieza de lo creado')
for p in (a, b, t, u):
    for x in call('plan', 'GET', f"{R}/pagos?personalId={p['id']}", ADM):
        if x['estado'] == 'PENDIENTE': call('plan', 'DELETE', f"{R}/pagos/{x['id']}", ADM)
    for c in call('plan', 'GET', f"{R}/contratos?personalId={p['id']}", ADM):
        if c['estado'] == 'VIGENTE': call('plan', 'POST', f"{R}/contratos/{c['id']}/rescindir", ADM, {'motivo': 'Limpieza de prueba'})
for p in (a, t, u): call('plan', 'DELETE', f"{P}/docentes/{p['id']}", ADM, expect=204)

print()
print('FALLOS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
