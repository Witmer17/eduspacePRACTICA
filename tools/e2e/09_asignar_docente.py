from lib import *
# Asignar cursos a un docente recién registrado: la misma secuencia que sigue el paso «Cursos» de Personal → Agregar personal.
import urllib.parse
P = '/api/v1/planificacion'
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

print('== año, secciones y malla (lo que carga el paso)')
anios = call('plan', 'GET', P + '/anios', ADM)
anio = next((a for a in anios if a['estado'] == 'ACTIVO'), None) or next((a for a in anios if a['estado'] == 'PLANIFICADO'), None)
check(anio is not None, 'hay un año activo o planificado')
if not anio: sys.exit(1)
secciones = [s for s in call('plan', 'GET', f"{P}/secciones?anioId={anio['id']}", ADM) if s['activo']]
check(len(secciones) > 0, f'el año {anio["nombre"]} tiene secciones activas ({len(secciones)})')
if not secciones: sys.exit(1)
mallas = {g: call('plan', 'GET', f'{P}/malla/grado/{g}', ADM) for g in sorted({s['gradoId'] for s in secciones})}
sec = next((s for s in secciones if mallas[s['gradoId']] and mallas[s['gradoId']]['cursos']), None)
check(sec is not None, 'alguna sección tiene cursos en la malla de su grado')
if not sec: sys.exit(1)
curso = mallas[sec['gradoId']]['cursos'][0]
print(f"  usando {sec['gradoNombre']} {sec['nombre']} · {curso['cursoNombre']}")

print('== docente nuevo (área Docencia) con ese curso como especialidad')
doc = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '5' + sufijo, 'nombres': 'Elena', 'apellidos': 'Prueba Cursos', 'cursoIds': [curso['cursoId']]})
check(doc and doc.get('areaCodigo') == 'DOCENCIA' and doc['cursoIds'] == [curso['cursoId']], 'el docente queda en Docencia con su curso')

print('== asignar')
a = call('plan', 'POST', P + '/asignaciones', ADM, {'seccionId': sec['id'], 'cursoId': curso['cursoId'], 'docenteId': doc['id']})
check(a and a['docenteId'] == doc['id'], 'asignación creada')
propias = call('plan', 'GET', f"{P}/asignaciones?anioId={anio['id']}", ADM)
check(any(x['docenteId'] == doc['id'] and x['seccionId'] == sec['id'] for x in propias), 'aparece entre las asignaciones del año (así sabe el paso que «ya lo dicta»)')
call('plan', 'POST', P + '/asignaciones', ADM, {'seccionId': sec['id'], 'cursoId': curso['cursoId'], 'docenteId': doc['id']}, expect=409)  # ya tiene docente
otro = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '4' + sufijo, 'nombres': 'Mario', 'apellidos': 'Prueba Cursos'})
call('plan', 'POST', P + '/asignaciones', ADM, {'seccionId': sec['id'], 'cursoId': curso['cursoId'], 'docenteId': otro['id']}, expect=409)  # la sección-curso ya tiene docente (falla de «alguien la tomó»)

print('== reglas')
adm = call('plan', 'POST', P + '/docentes', ADM, {'numeroDocumento': '3' + sufijo, 'nombres': 'Rosa', 'apellidos': 'Prueba Admin', 'areaId': 9})
call('plan', 'POST', P + '/asignaciones', ADM, {'seccionId': sec['id'], 'cursoId': curso['cursoId'], 'docenteId': adm['id']}, expect=409)  # no es de Docencia
# un curso que no está en la malla del grado
fuera = next((c for c in call('plan', 'GET', P + '/cursos', ADM) if c['id'] not in [x['cursoId'] for x in mallas[sec['gradoId']]['cursos']]), None)
if fuera:
    call('plan', 'POST', P + '/asignaciones', ADM, {'seccionId': sec['id'], 'cursoId': fuera['id'], 'docenteId': otro['id']}, expect=409)
else:
    print('  -- todos los cursos están en la malla de ese grado: se omite la prueba de curso fuera de malla')

print('== limpieza de lo creado para la prueba')
call('plan', 'DELETE', f"{P}/asignaciones/{a['id']}", ADM, expect=204)
for p in (doc, otro, adm): call('plan', 'DELETE', f"{P}/docentes/{p['id']}", ADM, expect=204)

print()
print('FALLOS:', len(FAILS))
for f in FAILS: print('  ', f)
sys.exit(1 if FAILS else 0)
