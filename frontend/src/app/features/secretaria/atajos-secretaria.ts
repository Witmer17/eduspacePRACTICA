/** Accesos del Inicio de la secretaría: todo lo que hace en el día, con lo que sirve cada uno. */
export interface AtajoSecretaria {
  etiqueta: string;
  ayuda: string;
  ruta: string;
  consulta?: Record<string, string | number>;
  icono: string;
}

export const ATAJOS_SECRETARIA: AtajoSecretaria[] = [
  { etiqueta: 'Registrar un alumno', ayuda: 'Alta con su apoderado', ruta: '/alumnos', consulta: { nuevo: 1 }, icono: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6' },
  { etiqueta: 'Buscar un alumno', ayuda: 'Ficha, expediente y matrícula', ruta: '/alumnos', icono: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3' },
  { etiqueta: 'Apoderados', ayuda: 'Datos de contacto de las familias', ruta: '/apoderados', icono: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8' },
  { etiqueta: 'Documentos', ayuda: 'Constancias y fichas para imprimir', ruta: '/documentos', icono: 'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6' },
  { etiqueta: 'Cupos', ayuda: 'Vacantes libres por sección', ruta: '/matriculas/cupos', icono: 'M4 6h16M4 12h16M4 18h10' },
  { etiqueta: 'Justificaciones', ayuda: 'Faltas que las familias justifican', ruta: '/asistencia/justificaciones', icono: 'M7 3h8l4 4v14H7zM15 3v4h4M10 13h6M10 17h6' },
  { etiqueta: 'Reporte de asistencia', ayuda: 'Asistencia por sección', ruta: '/asistencia/reporte', icono: 'M3 20h18M6 20V10M12 20V4M18 20v-7' },
  { etiqueta: 'Libretas y boletines', ayuda: 'Notas de cada alumno', ruta: '/calificaciones/boletines', icono: 'M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4zM8 8h8' },
  { etiqueta: 'Asistencia del personal', ayuda: 'Marcar al personal del día', ruta: '/personal/asistencia', icono: 'M9 12l2 2 4-4M5 4h14v17H5zM9 2h6v4H9z' },
  { etiqueta: 'Horarios', ayuda: 'Armado y horario por sección', ruta: '/planificacion/horarios', icono: 'M4 5h16v15H4zM4 10h16M10 5v15' },
  { etiqueta: 'Campañas de matrícula', ayuda: 'Abrir y cerrar la campaña', ruta: '/matriculas/campanias', icono: 'M5 21V4M5 4h12l-2 4 2 4H5' },
  { etiqueta: 'Calendario', ayuda: 'Fechas y feriados del año', ruta: '/calendario', icono: 'M4 5h16v15H4zM4 10h16M9 3v4M15 3v4' }
];
