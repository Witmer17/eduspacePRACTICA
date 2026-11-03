from lib import *
# Contratos y pagos del personal: reglas de negocio, planilla y seguridad. Cada ejecución usa documentos únicos.
P = '/api/v1/planificacion'
R = P + '/rrhh'
sufijo = str(int(time.time()))[-7:]
import urllib.parse
def keycloak(usuario, clave):
    """Token de Keycloak (cliente de pruebas eduspace-e2e). None si la cuenta no existe en el realm."""
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
    except urllib.error.HTTPError: return None
# Los servicios validan contra Keycloak: se reemplazan los tokens de auth-ms por los de Keycloak.
SEC, DOC = (907, 'SECRETARIA'), (905, 'DOCENTE')
TOK[ADM] = keycloak('admin', 'admin123')
check(TOK[ADM] is not None, 'token de administrador en Keycloak')
if not TOK[ADM]: sys.exit(1)
TOK[SEC] = keycloak('secretaria', 'secre123')
TOK[DOC] = keycloak('docente', 'docente123')

print('== seguridad: solo ADMIN (también para leer)')
for rol, t in ((SEC, 'secretaria'), (DOC, 'docente')):
    if TOK[rol]:
        call('plan', 'GET', R + '/contratos', rol, expect=403)
        call('plan', 'POST', R + '/planilla/2026-11', rol, expect=403)
    else:
        print(f'  -- sin cuenta «{t}» en Keycloak: se omite su prueba de 403')
call('plan', 'GET', R + '/contratos', None, expect=401)
call('gw', 'GET', R + '/contratos', ADM)

print('== personas de prueba')
ana = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '9' + sufijo, 'nombres': 'Ana', 'apellidos': 'Prueba RRHH', 'cargo': 'Contadora', 'areaId': 9})
ben = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '8' + sufijo, 'nombres': 'Beto', 'apellidos': 'Prueba Honorario', 'areaId': 9})

print('== contratos: validaciones')
base = {'personalId': ana['id'], 'tipo': 'INDEFINIDO', 'fechaInicio': '2026-01-01', 'remuneracion': 1500}
call('plan', 'POST', R + '/contratos', ADM, {**base, 'tipo': 'PLAZO_FIJO'}, expect=409)            # plazo fijo sin fin
call('plan', 'POST', R + '/contratos', ADM, {**base, 'tipo': 'PLAZO_FIJO', 'fechaFin': '2025-12-31'}, expect=409)  # fin antes del inicio
call('plan', 'POST', R + '/contratos', ADM, {**base, 'tipo': 'XYZ'}, expect=400)                    # tipo inválido
call('plan', 'POST', R + '/contratos', ADM, {**base, 'remuneracion': -5}, expect=400)               # remuneración negativa
call('plan', 'POST', R + '/contratos', ADM, {**base, 'personalId': 99999999}, expect=404)           # persona inexistente
c1 = call('plan', 'POST', R + '/contratos', ADM, base)
check(c1 and c1['estadoEfectivo'] == 'VIGENTE' and c1['cargo'] == 'Contadora', 'contrato indefinido vigente, hereda el cargo de la persona')
call('plan', 'POST', R + '/contratos', ADM, {**base, 'fechaInicio': '2027-01-01'}, expect=409)    # se cruza con el indefinido
c_cero = call('plan', 'POST', R + '/contratos', ADM, {'personalId': ben['id'], 'tipo': 'LOCACION', 'fechaInicio': '2026-01-01', 'fechaFin': '2026-12-31', 'remuneracion': 0})
check(c_cero is not None, 'contrato sin remuneración (ad honorem) permitido')
c1b = call('plan', 'PUT', f"{R}/contratos/{c1['id']}", ADM, {**base, 'remuneracion': 1800})
check(c1b and c1b['remuneracion'] == 1800, 'editar la remuneración')
call('plan', 'PUT', f"{R}/contratos/{c1['id']}", ADM, {**base, 'personalId': ben['id']}, expect=409)  # no se cambia de persona

print('== planilla')
pl = call('plan', 'POST', R + '/planilla/2026-11', ADM)
check(pl and pl['creados'] >= 1, 'genera el sueldo del mes')
pagos_ana = call('plan', 'GET', f"{R}/pagos?personalId={ana['id']}", ADM)
sueldos = [p for p in pagos_ana if p['concepto'] == 'SUELDO' and p['periodo'] == '2026-11']
check(len(sueldos) == 1 and sueldos[0]['monto'] == 1800 and sueldos[0]['estado'] == 'PENDIENTE', 'un sueldo pendiente por 1800')
pl2 = call('plan', 'POST', R + '/planilla/2026-11', ADM)
check(pl2 and pl2['creados'] == 0 and pl2['yaExistian'] >= 1, 'regenerar no duplica')
check(len([p for p in call('plan', 'GET', f"{R}/pagos?personalId={ana['id']}", ADM) if p['concepto'] == 'SUELDO']) == 1, 'sigue habiendo un solo sueldo')
check(not [p for p in call('plan', 'GET', f"{R}/pagos?personalId={ben['id']}", ADM)], 'contrato en 0 no genera sueldo (y no da 500)')
call('plan', 'POST', R + '/planilla/2025-12', ADM)
check(not [p for p in call('plan', 'GET', f"{R}/pagos?personalId={ana['id']}&periodo=2025-12", ADM)], 'no genera sueldo antes de que empiece el contrato')
call('plan', 'POST', R + '/planilla/2026-13', ADM, expect=409)
call('plan', 'GET', R + '/pagos', ADM, expect=409)   # sin persona ni periodo

print('== pagos')
call('plan', 'POST', R + '/pagos', ADM, {'personalId': ana['id'], 'periodo': '2026-11', 'concepto': 'BONO', 'monto': 0}, expect=400)
call('plan', 'POST', R + '/pagos', ADM, {'personalId': ana['id'], 'periodo': '2026-13', 'concepto': 'BONO', 'monto': 50}, expect=400)
call('plan', 'POST', R + '/pagos', ADM, {'personalId': ana['id'], 'contratoId': c_cero['id'], 'periodo': '2026-11', 'concepto': 'BONO', 'monto': 50}, expect=409)  # contrato ajeno
desc = call('plan', 'POST', R + '/pagos', ADM, {'personalId': ana['id'], 'contratoId': c1['id'], 'periodo': '2026-11', 'concepto': 'DESCUENTO', 'monto': 200, 'descripcion': 'Tardanzas'})
check(desc and desc['montoFirmado'] == -200, 'el descuento resta')
pag = call('plan', 'POST', f"{R}/pagos/{sueldos[0]['id']}/pagar", ADM, {'medio': 'TRANSFERENCIA', 'referencia': 'OP-1'})
check(pag and pag['estado'] == 'PAGADO' and pag['fechaPago'], 'marcar pagado (fecha por defecto = hoy)')
call('plan', 'POST', f"{R}/pagos/{sueldos[0]['id']}/pagar", ADM, {}, expect=409)   # ya pagado
call('plan', 'DELETE', f"{R}/pagos/{sueldos[0]['id']}", ADM, expect=409)           # pagado no se borra
call('plan', 'DELETE', f"{R}/pagos/{desc['id']}", ADM, expect=204)                 # pendiente sí

print('== rescisión')
call('plan', 'POST', f"{R}/contratos/{c1['id']}/rescindir", ADM, {'fecha': '2025-01-01'}, expect=409)  # antes del inicio
res = call('plan', 'POST', f"{R}/contratos/{c1['id']}/rescindir", ADM, {'motivo': 'Renuncia'})
check(res and res['estadoEfectivo'] == 'RESCINDIDO', 'rescindido')
call('plan', 'POST', f"{R}/contratos/{c1['id']}/rescindir", ADM, {}, expect=409)   # ya rescindido
call('plan', 'PUT', f"{R}/contratos/{c1['id']}", ADM, base, expect=409)            # no se edita
call('plan', 'POST', R + '/planilla/2027-06', ADM)
check(not [p for p in call('plan', 'GET', f"{R}/pagos?personalId={ana['id']}&periodo=2027-06", ADM)], 'rescindido no genera sueldos posteriores')
c2 = call('plan', 'POST', R + '/contratos', ADM, {**base, 'fechaInicio': '2027-01-01'})
check(c2 is not None, 'tras rescindir se puede crear uno nuevo en fechas que antes se cruzaban')

print('== baja de quien tiene historial')
call('plan', 'DELETE', f"{P}/docentes/{ana['id']}", ADM, expect=204)
check(call('plan', 'GET', f"{P}/docentes/{ana['id']}", ADM)['estado'] == 'INACTIVO', 'con historial se da de baja, no se borra')
call('plan', 'POST', R + '/contratos', ADM, {**base, 'fechaInicio': '2030-01-01'}, expect=409)  # persona dada de baja
call('plan', 'DELETE', f"{P}/docentes/{ben['id']}", ADM, expect=204)

print()
print('FALLOS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
