import { Campania } from '../../../core/models/matricula.model';
import { Anio, Area, Aula, Bloque, Colegio, Curso, Grado, GradoOferta, MallaGrado, Periodo, Seccion } from '../../../core/models/planificacion.model';

/** Lo que se sabe del colegio para juzgar cuánto falta configurar. `null` = no se pudo consultar. */
export interface DatosConfig {
  colegio: Colegio | null;
  oferta: GradoOferta[] | null;
  anios: Anio[] | null;
  /** Periodos del año activo. */
  periodos: Periodo[] | null;
  feriados: number | null;
  aulas: Aula[] | null;
  cursos: Curso[] | null;
  /** Grados que ofrece el colegio (activos). */
  grados: Grado[] | null;
  mallas: Record<number, MallaGrado | null | undefined>;
  /** Secciones del año activo. */
  secciones: Seccion[] | null;
  bloques: Bloque[] | null;
  areas: Area[] | null;
  personal: number | null;
  conceptos: number | null;
  tarifas: number | null;
  campanias: Campania[] | null;
}

/** ok: listo · pendiente: falta algo necesario · opcional: conviene pero no bloquea · sin-datos: no se pudo consultar. */
export type EstadoItem = 'ok' | 'pendiente' | 'opcional' | 'sin-datos';

export interface ItemConfig {
  id: string;
  grupo: string;
  titulo: string;
  detalle: string;
  estado: EstadoItem;
  ruta: string;
}

const plural = (n: number, uno: string, varios: string): string => `${n} ${n === 1 ? uno : varios}`;

/** Convierte lo que hay configurado en una lista de pasos con su estado, en el orden en que conviene hacerlos. */
export function evaluarConfiguracion(d: DatosConfig): ItemConfig[] {
  const sd = (id: string, grupo: string, titulo: string, ruta: string): ItemConfig => ({ id, grupo, titulo, ruta, estado: 'sin-datos', detalle: 'No se pudo consultar.' });
  const items: ItemConfig[] = [];

  // --- El colegio ---
  items.push(
    d.colegio === null ? sd('colegio', 'El colegio', 'Datos del colegio', '/configuracion/colegio')
      : { id: 'colegio', grupo: 'El colegio', titulo: 'Datos del colegio', ruta: '/configuracion/colegio',
          ...(d.colegio.codigoModular && d.colegio.direccion
            ? { estado: 'ok' as const, detalle: d.colegio.nombre }
            : { estado: 'pendiente' as const, detalle: `Falta ${!d.colegio.codigoModular ? 'el código modular' : 'la dirección'}${!d.colegio.codigoModular && !d.colegio.direccion ? ' y la dirección' : ''}.` }) }
  );

  const elegidos = d.oferta?.filter(g => g.seleccionado).length ?? 0;
  items.push(
    d.oferta === null ? sd('grados', 'El colegio', 'Niveles y grados', '/configuracion/grados')
      : { id: 'grados', grupo: 'El colegio', titulo: 'Niveles y grados', ruta: '/configuracion/grados',
          estado: elegidos > 0 ? 'ok' : 'pendiente', detalle: elegidos > 0 ? `${elegidos} de ${d.oferta.length} grados elegidos` : 'Elige los grados que ofrece el colegio.' }
  );

  // --- Año escolar ---
  const activo = d.anios?.find(a => a.estado === 'ACTIVO') ?? null;
  items.push(
    d.anios === null ? sd('anio', 'Año escolar', 'Año académico', '/planificacion/anios')
      : { id: 'anio', grupo: 'Año escolar', titulo: 'Año académico', ruta: '/planificacion/anios',
          estado: activo ? 'ok' : 'pendiente', detalle: activo ? `${activo.nombre} está activo` : d.anios.length ? 'Hay años creados, pero ninguno activo.' : 'Crea el año y actívalo.' }
  );
  items.push(
    d.periodos === null || d.anios === null ? sd('periodos', 'Año escolar', 'Periodos (bimestres, trimestres o semestres)', '/planificacion/anios')
      : { id: 'periodos', grupo: 'Año escolar', titulo: 'Periodos (bimestres, trimestres o semestres)', ruta: '/planificacion/anios',
          estado: !activo ? 'pendiente' : d.periodos.length > 0 ? 'ok' : 'pendiente',
          detalle: !activo ? 'Primero activa un año.' : d.periodos.length > 0 ? plural(d.periodos.length, 'periodo definido', 'periodos definidos') : 'Define el régimen del año.' }
  );
  items.push(
    d.feriados === null ? sd('feriados', 'Año escolar', 'Feriados', '/planificacion/feriados')
      : { id: 'feriados', grupo: 'Año escolar', titulo: 'Feriados', ruta: '/planificacion/feriados',
          estado: d.feriados > 0 ? 'ok' : 'opcional', detalle: d.feriados > 0 ? plural(d.feriados, 'feriado cargado', 'feriados cargados') : 'Sin feriados: se abrirían clases todos los días.' }
  );

  // --- Estructura académica ---
  const aulasActivas = d.aulas?.filter(a => a.activo).length ?? 0;
  items.push(
    d.aulas === null ? sd('aulas', 'Estructura', 'Aulas físicas', '/configuracion/estructura')
      : { id: 'aulas', grupo: 'Estructura', titulo: 'Aulas físicas', ruta: '/configuracion/estructura',
          estado: aulasActivas > 0 ? 'ok' : 'pendiente', detalle: aulasActivas > 0 ? plural(aulasActivas, 'aula activa', 'aulas activas') : 'Registra las aulas del colegio.' }
  );
  const cursosActivos = d.cursos?.filter(c => c.activo).length ?? 0;
  items.push(
    d.cursos === null ? sd('cursos', 'Estructura', 'Catálogo de cursos', '/configuracion/estructura')
      : { id: 'cursos', grupo: 'Estructura', titulo: 'Catálogo de cursos', ruta: '/configuracion/estructura',
          estado: cursosActivos > 0 ? 'ok' : 'pendiente', detalle: cursosActivos > 0 ? plural(cursosActivos, 'curso activo', 'cursos activos') : 'Crea los cursos que se dictan.' }
  );
  const grados = d.grados ?? [];
  const conMalla = grados.filter(g => (d.mallas[g.id]?.cursos.length ?? 0) > 0).length;
  items.push(
    d.grados === null ? sd('malla', 'Estructura', 'Cursos por grado (malla)', '/configuracion/estructura')
      : { id: 'malla', grupo: 'Estructura', titulo: 'Cursos por grado (malla)', ruta: '/configuracion/estructura',
          estado: grados.length > 0 && conMalla === grados.length ? 'ok' : 'pendiente',
          detalle: grados.length === 0 ? 'Primero elige los grados.' : `${conMalla} de ${grados.length} grados con cursos` }
  );
  const activas = d.secciones?.filter(s => s.activo) ?? [];
  const conSeccion = grados.filter(g => activas.some(s => s.gradoId === g.id)).length;
  items.push(
    d.secciones === null || d.grados === null ? sd('secciones', 'Estructura', 'Secciones y aulas por grado', '/configuracion/estructura')
      : { id: 'secciones', grupo: 'Estructura', titulo: 'Secciones y aulas por grado', ruta: '/configuracion/estructura',
          estado: grados.length > 0 && conSeccion === grados.length ? 'ok' : 'pendiente',
          detalle: !activo ? 'Primero activa un año.' : grados.length === 0 ? 'Primero elige los grados.' : `${conSeccion} de ${grados.length} grados con sección` }
  );
  const turnosUsados = new Set(activas.map(s => s.turno));
  const sinBloques = [...turnosUsados].filter(t => !d.bloques?.some(b => b.turno === t && !b.esReceso));
  items.push(
    d.bloques === null ? sd('bloques', 'Estructura', 'Bloques horarios', '/configuracion/estructura')
      : { id: 'bloques', grupo: 'Estructura', titulo: 'Bloques horarios', ruta: '/configuracion/estructura',
          estado: d.bloques.some(b => !b.esReceso) && sinBloques.length === 0 ? 'ok' : 'pendiente',
          detalle: sinBloques.length ? `Falta el turno ${sinBloques.map(t => (t === 'MANANA' ? 'mañana' : 'tarde')).join(' y ')}.` : d.bloques.length ? plural(d.bloques.filter(b => !b.esReceso).length, 'bloque de clase', 'bloques de clase') : 'Define las horas de clase de cada turno.' }
  );

  // --- Personal ---
  const areasActivas = d.areas?.filter(a => a.activo).length ?? 0;
  items.push(
    d.areas === null ? sd('areas', 'Personal', 'Áreas de trabajo', '/configuracion/areas')
      : { id: 'areas', grupo: 'Personal', titulo: 'Áreas de trabajo', ruta: '/configuracion/areas',
          estado: areasActivas > 0 && d.areas.some(a => a.activo && a.codigo === 'DOCENCIA') ? 'ok' : 'pendiente',
          detalle: areasActivas > 0 ? plural(areasActivas, 'área activa', 'áreas activas') : 'Crea las áreas del colegio.' }
  );
  items.push(
    d.personal === null ? sd('personal', 'Personal', 'Personal registrado', '/personal')
      : { id: 'personal', grupo: 'Personal', titulo: 'Personal registrado', ruta: '/personal',
          estado: d.personal > 0 ? 'ok' : 'pendiente', detalle: d.personal > 0 ? plural(d.personal, 'persona registrada', 'personas registradas') : 'Aún no hay personal: registra a los docentes y al equipo.' }
  );

  // --- Matrícula y cobranza ---
  const abierta = d.campanias?.some(c => (c.estado as string) === 'ABIERTA') ?? false;
  items.push(
    d.campanias === null ? sd('campania', 'Matrícula y cobranza', 'Campaña de matrícula', '/matriculas/campanias')
      : { id: 'campania', grupo: 'Matrícula y cobranza', titulo: 'Campaña de matrícula', ruta: '/matriculas/campanias',
          estado: abierta ? 'ok' : 'pendiente', detalle: abierta ? 'Hay una campaña abierta' : 'Sin campaña abierta no se puede matricular.' }
  );
  items.push(
    d.conceptos === null || d.tarifas === null ? sd('tarifas', 'Matrícula y cobranza', 'Conceptos y tarifas de pago', '/pagos/tarifas')
      : { id: 'tarifas', grupo: 'Matrícula y cobranza', titulo: 'Conceptos y tarifas de pago', ruta: '/pagos/tarifas',
          estado: d.conceptos > 0 && d.tarifas > 0 ? 'ok' : 'pendiente',
          detalle: d.tarifas > 0 ? `${plural(d.conceptos, 'concepto', 'conceptos')} y ${plural(d.tarifas, 'tarifa', 'tarifas')}` : 'Sin tarifa, la matrícula no genera cuotas.' }
  );
  return items;
}

/** Cuántos pasos necesarios están listos, para la barra de avance. Los opcionales y los que no se pudieron consultar no cuentan. */
export function avance(items: ItemConfig[]): { listos: number; total: number; porcentaje: number } {
  const contables = items.filter(i => i.estado === 'ok' || i.estado === 'pendiente');
  const listos = contables.filter(i => i.estado === 'ok').length;
  return { listos, total: contables.length, porcentaje: contables.length ? Math.round((listos / contables.length) * 100) : 0 };
}
