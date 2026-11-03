import { describe, expect, it } from 'vitest';
import { Area, Docente } from '../../core/models/planificacion.model';

describe('Cálculo de personal por área en Dashboard', () => {
  const areasEjemplo: Area[] = [
    { id: 1, codigo: 'DIRECCION', nombre: 'Dirección general', activo: true, descripcion: 'Gestión institucional' },
    { id: 2, codigo: 'DOCENCIA', nombre: 'Docencia', activo: true, descripcion: 'Docentes de aula' },
    { id: 3, codigo: 'SECRETARIA', nombre: 'Secretaría académica', activo: true, descripcion: 'Atención a familias' },
    { id: 4, codigo: 'INACTIVA', nombre: 'Área obsoleta', activo: false }
  ];

  const personalEjemplo: Docente[] = [
    { id: 1, nombres: 'Carlos', apellidos: 'Ramírez', numeroDocumento: '12345678', estado: 'ACTIVO', areaId: 2, areaCodigo: 'DOCENCIA', areaNombre: 'Docencia' },
    { id: 2, nombres: 'Lucía', apellidos: 'Quispe', numeroDocumento: '87654321', estado: 'ACTIVO', areaId: 2, areaCodigo: 'DOCENCIA', areaNombre: 'Docencia' },
    { id: 3, nombres: 'Ana', apellidos: 'Torres', numeroDocumento: '11223344', estado: 'ACTIVO', areaId: 3, areaCodigo: 'SECRETARIA', areaNombre: 'Secretaría académica' }
  ];

  function calcularConteoPorArea(areas: Area[], personal: Docente[]) {
    const mapa = new Map<number, number>();
    for (const p of personal) {
      if (p.areaId) {
        mapa.set(p.areaId, (mapa.get(p.areaId) ?? 0) + 1);
      }
    }
    return areas
      .filter(a => a.activo)
      .map(a => ({
        id: a.id,
        codigo: a.codigo,
        nombre: a.nombre,
        descripcion: a.descripcion,
        cantidad: mapa.get(a.id) ?? 0
      }))
      .sort((a, b) => b.cantidad - a.cantidad || a.nombre.localeCompare(b.nombre, 'es'));
  }

  it('cuenta correctamente las personas asignadas a cada área activa', () => {
    const resultado = calcularConteoPorArea(areasEjemplo, personalEjemplo);

    // Debe excluir áreas inactivas
    expect(resultado.find(r => r.codigo === 'INACTIVA')).toBeUndefined();

    // Docencia tiene 2 personas
    const docencia = resultado.find(r => r.codigo === 'DOCENCIA');
    expect(docencia?.cantidad).toBe(2);

    // Secretaría tiene 1 persona
    const secretaria = resultado.find(r => r.codigo === 'SECRETARIA');
    expect(secretaria?.cantidad).toBe(1);

    // Dirección tiene 0 personas
    const direccion = resultado.find(r => r.codigo === 'DIRECCION');
    expect(direccion?.cantidad).toBe(0);
  });

  it('ordena primero las áreas que tienen personal y luego por orden alfabético', () => {
    const resultado = calcularConteoPorArea(areasEjemplo, personalEjemplo);

    expect(resultado.map(r => r.codigo)).toEqual(['DOCENCIA', 'SECRETARIA', 'DIRECCION']);
  });

  it('asigna 0 a áreas sin personal registrado', () => {
    const resultado = calcularConteoPorArea(areasEjemplo, []);

    expect(resultado.every(r => r.cantidad === 0)).toBe(true);
    // Orden alfabético cuando todas tienen 0
    expect(resultado.map(r => r.nombre)).toEqual(['Dirección general', 'Docencia', 'Secretaría académica']);
  });
});
