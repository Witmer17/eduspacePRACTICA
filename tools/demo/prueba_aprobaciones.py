"""Prueba de las aprobaciones de caja y del administrador, por el Gateway.

1) Pagos de apoderados: el apoderado paga en línea -> queda PENDIENTE (las cuotas no se tocan) -> caja lo rechaza con motivo.
   (Con APROBAR=1 caja lo APRUEBA en vez de rechazarlo; ese paso modifica la cuota: anúlala después.)
2) Pago al personal: caja SOLICITA -> el administrador RECHAZA con motivo -> caja vuelve a solicitar -> el administrador APRUEBA.
   Toma el primer sueldo PENDIENTE de la planilla del mes (PERIODO=AAAA-MM). Al terminar queda PAGADO: restáuralo a PENDIENTE si era de prueba.

Si falta la cuenta de un rol (por ejemplo no hay cajero con clave conocida) esos pasos se OMITEN y se dice cuáles.
Necesita el backend arriba y los usuarios de tools/demo/lib.py.   Uso: python3 tools/demo/prueba_aprobaciones.py
"""
import os, sys, uuid, datetime
sys.path.insert(0, os.path.dirname(__file__))
from lib import call, Resultado

R = Resultado()
OMITIDOS = []
PERIODO = os.environ.get('PERIODO', datetime.date.today().strftime('%Y-%m'))
APROBAR = os.environ.get('APROBAR') == '1'


def llamar(metodo, ruta, usuario, cuerpo=None):
    """Como call(), pero devuelve (None, motivo) si ese usuario no tiene cuenta con clave conocida."""
    try:
        return call(metodo, ruta, usuario, cuerpo)
    except Exception as e:  # sin token: la cuenta no existe en este entorno
        return None, f'sin cuenta «{usuario}» ({e})'


def ok(nombre, res, esperado=(200, 201, 204)):
    if res[0] is None:
        OMITIDOS.append(nombre)
        print(f'SIN  {nombre:62} {res[1]}')
        return {}
    return R.ok(nombre, res, esperado)


print('== Permisos ==')
ok('caja ve los pagos por aprobar', llamar('GET', '/api/v1/pagos/por-aprobar', 'cajero'))
ok('el administrador también', llamar('GET', '/api/v1/pagos/por-aprobar', 'admin'))
ok('el apoderado NO ve los pagos por aprobar', llamar('GET', '/api/v1/pagos/por-aprobar', 'apoderado'), 403)
ok('la secretaría NO aprueba pagos', llamar('POST', '/api/v1/pagos/999999/aprobar', 'secretaria'), 403)
ok('caja ve morosos (solo lectura)', llamar('GET', '/api/v1/pagos/morosos', 'cajero'))
ok('caja ve la cobranza (solo lectura)', llamar('GET', '/api/v1/pagos/reportes/cobranza?size=1', 'cajero'))
ok('caja NO ve las alertas de administración', llamar('GET', '/api/v1/pagos/alertas', 'cajero'), 403)
ok('el administrador ve el conteo por aprobar', llamar('GET', '/api/v1/pagos/por-aprobar/conteo', 'admin'))

print('\n== Pago de un apoderado: queda por aprobar ==')
s, cuotas = llamar('GET', '/api/v1/pagos/mias/cuotas', 'apoderado')
libres = [c for c in (cuotas if isinstance(cuotas, list) else []) if c['estado'] in ('PENDIENTE', 'VENCIDA') and c['saldo'] > 0]
if s is None or not libres:
    OMITIDOS.append('pago en línea del apoderado (no hay apoderado con cuotas pendientes)')
    print('SIN  pago en línea del apoderado: no hay apoderado con cuotas pendientes en este entorno')
else:
    c = libres[0]
    cuerpo = {'alumnoId': c['alumnoId'], 'montoTotal': c['saldo'], 'medio': 'ONLINE_SIMULADO', 'idempotencyKey': str(uuid.uuid4()),
              'detalles': [{'cuotaId': c['id'], 'montoAplicado': c['saldo']}]}
    p = ok('el apoderado paga en línea', llamar('POST', '/api/v1/pagos/online', 'apoderado', cuerpo))
    if p.get('id'):
        if p.get('estado') != 'PENDIENTE' or p.get('comprobante'):
            R.fallos.append('el pago en línea debía quedar PENDIENTE y sin comprobante'); print('ERR  estado', p.get('estado'))
        _, ec = call('GET', f"/api/v1/pagos/alumnos/{c['alumnoId']}/estado-cuenta", 'admin')
        igual = next(x for x in ec['cuotas'] if x['id'] == c['id'])
        if igual['saldo'] != c['saldo'] or igual['estado'] != c['estado']:
            R.fallos.append('la cuota cambió antes de aprobar'); print('ERR  la cuota se tocó antes de aprobar')
        else:
            print('OK   la cuota sigue igual hasta que caja apruebe')
        s, _ = call('POST', '/api/v1/pagos/online', 'apoderado', dict(cuerpo, idempotencyKey=str(uuid.uuid4())))
        print(('OK   ' if 400 <= s < 500 else 'ERR  ') + f'la misma cuota no se paga dos veces mientras está en revisión ({s})')
        if not 400 <= s < 500: R.fallos.append('doble pago de la misma cuota')
        _, mias = call('GET', '/api/v1/pagos/mias/pendientes', 'apoderado')
        print(('OK   ' if any(x['id'] == p['id'] for x in mias) else 'ERR  ') + 'el apoderado lo ve en revisión')
        _, lista = call('GET', '/api/v1/pagos/por-aprobar', 'admin')
        print(('OK   ' if any(x['id'] == p['id'] for x in lista) else 'ERR  ') + 'caja lo ve por aprobar')
        R.ok('rechazar sin motivo no se permite', call('POST', f"/api/v1/pagos/{p['id']}/rechazar", 'admin', {}), 400)
        if APROBAR:
            r = R.ok('se APRUEBA', call('POST', f"/api/v1/pagos/{p['id']}/aprobar", 'admin'))
            print('OK   comprobante:', (r.get('comprobante') or {}).get('numeroCompleto'))
        else:
            r = R.ok('se rechaza con motivo', call('POST', f"/api/v1/pagos/{p['id']}/rechazar", 'admin', {'motivo': 'Prueba: no llegó el depósito'}))
            print(('OK   ' if r.get('estado') == 'RECHAZADO' else 'ERR  ') + 'estado', r.get('estado'))
            R.ok('no se aprueba uno ya rechazado', call('POST', f"/api/v1/pagos/{p['id']}/aprobar", 'admin'), (400, 409, 422))
        print('PAGO_DE_PRUEBA', p['id'])

print(f'\n== Pago al personal ({PERIODO}) ==')
s, plan = llamar('GET', f'/api/v1/planificacion/pago-personal/planilla?periodo={PERIODO}', 'admin')
ok('la planilla del mes se lee', (s, plan))
ok('la secretaría NO ve la planilla de pagos', llamar('GET', f'/api/v1/planificacion/pago-personal/planilla?periodo={PERIODO}', 'secretaria'), 403)
ok('el docente NO ve la planilla de pagos', llamar('GET', f'/api/v1/planificacion/pago-personal/planilla?periodo={PERIODO}', 'docente'), 403)
pend = [x for x in (plan if isinstance(plan, list) else []) if x['estado'] == 'PENDIENTE' and x['concepto'] == 'SUELDO']
if not pend:
    print('SIN  no hay sueldos pendientes en ese mes: se omite esta parte')
else:
    pid = pend[0]['id']
    base = f'/api/v1/planificacion/pago-personal/pagos/{pid}'
    datos = {'medio': 'TRANSFERENCIA', 'referencia': 'PRUEBA-1'}
    ok('el administrador NO solicita (lo hace caja)', llamar('POST', base + '/solicitar', 'admin', datos), 403)
    ok('el pago directo del administrador ya no existe', llamar('POST', f'/api/v1/planificacion/rrhh/pagos/{pid}/pagar', 'admin', {'medio': 'EFECTIVO'}), (400, 409, 422))
    r = ok('caja solicita el pago', llamar('POST', base + '/solicitar', 'cajero', datos))
    if r.get('estado') == 'POR_APROBAR':
        print('OK   estado POR_APROBAR')
        ok('caja NO aprueba', llamar('POST', base + '/aprobar', 'cajero'), 403)
        ok('no se solicita dos veces', llamar('POST', base + '/solicitar', 'cajero', datos), (400, 409, 422))
        _, lista = call('GET', '/api/v1/planificacion/pago-personal/por-aprobar', 'admin')
        print(('OK   ' if any(x['id'] == pid for x in lista) else 'ERR  ') + 'el administrador lo ve por aprobar')
        R.ok('rechazar sin motivo no se permite', call('POST', base + '/rechazar', 'admin', {}), 400)
        r = R.ok('el administrador rechaza con motivo', call('POST', base + '/rechazar', 'admin', {'motivo': 'Prueba: falta la operación'}))
        print(('OK   ' if r.get('estado') == 'PENDIENTE' and r.get('motivoRechazo') else 'ERR  ') + 'vuelve a PENDIENTE con motivo:', r.get('estado'))
        R.ok('caja vuelve a solicitar', call('POST', base + '/solicitar', 'cajero', {'medio': 'TRANSFERENCIA', 'referencia': 'PRUEBA-2'}))
        r = R.ok('el administrador aprueba', call('POST', base + '/aprobar', 'admin'))
        print(('OK   ' if r.get('estado') == 'PAGADO' else 'ERR  ') + 'estado', r.get('estado'))
        print('PAGO_PERSONAL_DE_PRUEBA', pid)
    else:
        print('SIN  sin cuenta de caja: no se prueba el ciclo solicitar -> rechazar -> aprobar')

if OMITIDOS:
    print('\nOMITIDOS (falta la cuenta de ese rol en este entorno):', len(OMITIDOS))
sys.exit(R.fin())
