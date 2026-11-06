from lib import *
# Código de descuento en la matrícula en línea del sitio público: el administrador crea un descuento con código, la familia lo valida y lo usa
# al reservar, y el descuento se aplica a la cuota de matrícula. También prueba que un código inválido no deja un alumno a medias y que el
# campo trampa (la causa de «Solicitud no válida») sigue bloqueando a los robots. Limpia lo suyo (anula la matrícula y da de baja al alumno).
import urllib.parse
P = '/api/v1/pagos'
PUB = '/api/v1/publico/matricula'
def keycloak(usuario, clave):
    req = urllib.request.Request('http://localhost:18090/realms/eduspace/protocol/openid-connect/token', method='POST',
        data=urllib.parse.urlencode({'grant_type': 'password', 'client_id': 'eduspace-e2e', 'username': usuario, 'password': clave}).encode())
    with urllib.request.urlopen(req, timeout=30) as r: return json.loads(r.read())['access_token']
def psql(contenedor, base, sql):
    r = subprocess.run(['podman', 'exec', contenedor, 'psql', '-U', 'eduspace', '-d', base, '-At', '-c', sql], capture_output=True, text=True)
    return r.stdout.strip()
TOK[ADM] = keycloak('admin', 'admin123')
s = str(int(time.time()))[-6:]
CODIGO = 'UIPRUEBA' + s

print('== el administrador crea un descuento con código')
d = call('pago', 'POST', P + '/descuentos', ADM, {'nombre': 'UI Prueba código', 'tipo': 'PORCENTAJE', 'valor': 10, 'aplicaA': 'TODO', 'activo': True, 'codigo': CODIGO.lower()})
check(d and d.get('codigo') == CODIGO, 'el código se guarda en mayúsculas: ' + str((d or {}).get('codigo')))
r = call('pago', 'POST', P + '/descuentos', ADM, {'nombre': 'Otro', 'tipo': 'PORCENTAJE', 'valor': 5, 'aplicaA': 'PENSION', 'codigo': CODIGO}, expect=409)
check('Ya existe' in (r or {}).get('mensaje', ''), 'un código repetido se rechaza: ' + str((r or {}).get('mensaje', ''))[:80])
call('pago', 'POST', P + '/descuentos', ADM, {'nombre': 'Mal código', 'tipo': 'PORCENTAJE', 'valor': 5, 'aplicaA': 'PENSION', 'codigo': 'ab c'}, expect=400)
call('pago', 'POST', P + '/descuentos', ADM, {'nombre': 'Muy corto', 'tipo': 'PORCENTAJE', 'valor': 5, 'aplicaA': 'PENSION', 'codigo': 'ab'}, expect=400)
sin = call('pago', 'POST', P + '/descuentos', ADM, {'nombre': 'UI Prueba sin código', 'tipo': 'MONTO_FIJO', 'valor': 5, 'aplicaA': 'PENSION', 'codigo': ''})
check(sin and not sin.get('codigo'), 'un descuento sin código sigue siendo posible (solo lo asigna el administrador)')
e = call('pago', 'PUT', f"{P}/descuentos/{d['id']}", ADM, {'nombre': 'UI Prueba código', 'tipo': 'PORCENTAJE', 'valor': 10, 'aplicaA': 'TODO', 'activo': True, 'codigo': CODIGO})
check(e and e['codigo'] == CODIGO, 'editar un descuento conservando su código no choca consigo mismo')

print('== la familia valida el código (sin sesión)')
v = call('mat', 'GET', f'{PUB}/descuento/{CODIGO.lower()}', None, expect=200)
check(v and v['codigo'] == CODIGO and float(v['valor']) == 10 and v['aplicaA'] == 'TODO' and v['tipo'] == 'PORCENTAJE', 'el código sirve en minúsculas y devuelve su valor: ' + str(v))
check('id' not in (v or {}) and 'activo' not in (v or {}), 'solo se expone lo necesario (sin id ni estado del catálogo)')
r = call('mat', 'GET', f'{PUB}/descuento/NOEXISTE{s}', None, expect=409)
check('no existe' in (r or {}).get('mensaje', '') or 'vigente' in (r or {}).get('mensaje', ''), 'un código que no existe da un mensaje claro: ' + str((r or {}).get('mensaje', ''))[:90])
call('pago', 'PUT', f"{P}/descuentos/{d['id']}", ADM, {'nombre': 'UI Prueba código', 'tipo': 'PORCENTAJE', 'valor': 10, 'aplicaA': 'TODO', 'activo': False, 'codigo': CODIGO})
call('mat', 'GET', f'{PUB}/descuento/{CODIGO}', None, expect=409)
call('pago', 'PUT', f"{P}/descuentos/{d['id']}", ADM, {'nombre': 'UI Prueba código', 'tipo': 'PORCENTAJE', 'valor': 10, 'aplicaA': 'TODO', 'activo': True, 'codigo': CODIGO})
call('mat', 'GET', f'{PUB}/descuento/{CODIGO}', None, expect=200)
check(True, 'un descuento desactivado deja de valer y al reactivarlo vuelve a valer')

print('== reservar la matrícula')
oferta = call('mat', 'GET', PUB + '/oferta', None)
grado = next(g for n in oferta['niveles'] for g in n['grados'] if g['matricula'] and g['vacantes'] > 0)
base = float(grado['matricula'])
def solicitud(sufijo, **extra):
    return {'gradoId': grado['id'], 'acepto': True, 'sitio': '', **extra,
            'alumno': {'tipoDocumento': 'DNI', 'numeroDocumento': '88' + sufijo, 'nombres': 'UI', 'apellidoPaterno': 'Prueba Descuento', 'apellidoMaterno': sufijo,
                       'fechaNacimiento': '2018-05-10', 'sexo': 'F'},
            'apoderado': {'tipoDocumento': 'DNI', 'numeroDocumento': '89' + sufijo, 'nombres': 'UI', 'apellidos': 'Prueba Apoderado ' + sufijo, 'telefono': '987654321',
                          'email': None, 'parentesco': 'MADRE'}}
r = call('mat', 'POST', PUB, None, {**solicitud(s), 'sitio': 'http://spam.example'}, expect=400)
check('Solicitud no válida' in json.dumps(r, ensure_ascii=False), 'el campo trampa lleno (robot o autocompletar del navegador) da «Solicitud no válida»')
r = call('mat', 'POST', PUB, None, {**solicitud(s), 'codigoDescuento': 'NOEXISTE' + s}, expect=409)
check('descuento' in (r or {}).get('mensaje', ''), 'un código inválido se rechaza al reservar: ' + str((r or {}).get('mensaje', ''))[:90])
call('mat', 'POST', PUB, None, {**solicitud(s), 'codigoDescuento': 'con espacio'}, expect=400)
n_alumnos = psql('e2e-pg-alumnos', 'alumnos_db', f"select count(*) from alumnos where numero_documento = '88{s}'")
check(n_alumnos == '0', 'el código inválido NO dejó un alumno a medias (se validó antes de registrar): ' + n_alumnos)

ini = call('mat', 'POST', PUB, None, {**solicitud(s), 'codigoDescuento': CODIGO.lower()}, expect=201)
check(ini is not None, 'la reserva con código se crea')
if ini:
    desc = round(base * 0.10, 2)
    check(float(ini['montoBase']) == base and float(ini['descuento']) == desc and float(ini['montoMatricula']) == round(base - desc, 2),
          f"la matrícula sale con el descuento: base {ini.get('montoBase')} − {ini.get('descuento')} = {ini.get('montoMatricula')} (esperado {base} − {desc})")
    mat = psql('e2e-pg-pago', 'pago_db', f"select monto_base || '|' || descuento || '|' || monto_total || '|' || saldo from cuotas c join matriculas_local m on m.matricula_id = c.matricula_id where m.alumno_nombre like '%{s}%' limit 1")
    check(mat == f'{base:.2f}|{desc:.2f}|{base - desc:.2f}|{base - desc:.2f}', 'la cuota de matrícula en pago-ms lleva el descuento: ' + mat)
    asignado = psql('e2e-pg-pago', 'pago_db', f"select count(*) from descuentos_alumno da join descuentos d on d.id = da.descuento_id where d.id = {d['id']}")
    check(asignado == '1', 'el descuento quedó asignado al alumno (para las pensiones que se generen al confirmar): ' + asignado)
    resumen = call('mat', 'GET', f"{PUB}/{ini['referencia']}", None, None) if False else None

    print('== limpieza')
    mid = psql('e2e-pg-matricula', 'matricula_db', f"select id from matriculas where codigo = '{ini['codigo']}'")
    if mid: call('mat', 'PATCH', f'/api/v1/matriculas/{mid}/anular', ADM, {'motivo': 'Fin de la prueba'})
    aid = psql('e2e-pg-alumnos', 'alumnos_db', f"select id from alumnos where numero_documento = '88{s}'")
    if aid: call('alum', 'PATCH', f'/api/v1/alumnos/{aid}/estado', ADM, {'estado': 'INACTIVO', 'motivo': 'Prueba de descuento por código'})
# El catálogo no tiene API para borrar: los descuentos de prueba se quitan por SQL (y su asignación al alumno de prueba).
psql('e2e-pg-pago', 'pago_db', f"delete from descuentos_alumno where descuento_id in ({d['id']}, {sin['id']})")
psql('e2e-pg-pago', 'pago_db', f"delete from descuentos where id in ({d['id']}, {sin['id']})")

print('\nFALLAS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
