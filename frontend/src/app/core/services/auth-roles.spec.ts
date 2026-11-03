import { usaBarraAula } from '../../layout/aula-nav';
import { usaBarraPersonal } from '../../layout/menu';
import { rolesDelSistema } from './auth.service';

describe('roles de la sesión', () => {
  // Lo que trae el token de una cuenta creada desde la aplicación (Keycloak agrega sus roles por defecto).
  const deKeycloak = ['SECRETARIA', 'offline_access', 'default-roles-eduspace', 'uma_authorization'];

  it('descarta los roles propios de Keycloak y conserva los del sistema', () => {
    expect(rolesDelSistema(deKeycloak)).toEqual(['SECRETARIA']);
    expect(rolesDelSistema(['ADMIN'])).toEqual(['ADMIN']);
    expect(rolesDelSistema(['DOCENTE', 'CAJERO', 'uma_authorization'])).toEqual(['DOCENTE', 'CAJERO']);
  });

  it('sin roles o con roles ajenos queda vacío', () => {
    expect(rolesDelSistema(undefined)).toEqual([]);
    expect(rolesDelSistema(null)).toEqual([]);
    expect(rolesDelSistema(['offline_access'])).toEqual([]);
  });

  it('con los roles ya filtrados, la secretaría usa su barra superior (antes, con los roles de Keycloak, no)', () => {
    expect(usaBarraPersonal(deKeycloak)).toBe(false);                       // el defecto que se encontró
    expect(usaBarraPersonal(rolesDelSistema(deKeycloak))).toBe(true);
  });

  it('lo mismo para docentes, alumnos y apoderados', () => {
    const docente = ['DOCENTE', 'offline_access', 'default-roles-eduspace'];
    expect(usaBarraAula(docente)).toBe(false);
    expect(usaBarraAula(rolesDelSistema(docente))).toBe(true);
    expect(usaBarraAula(rolesDelSistema(['ALUMNO', 'uma_authorization']))).toBe(true);
  });

  it('quien además de personal es docente sigue sin usar ninguna de las dos barras', () => {
    const roles = rolesDelSistema(['ADMIN', 'DOCENTE', 'offline_access']);
    expect(usaBarraPersonal(roles) && usaBarraAula(roles)).toBe(false);
    expect(usaBarraPersonal(roles)).toBe(false);
  });
});
