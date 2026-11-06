import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Anio, Asignacion, Aula, Bloque, Curso, Docente, Grado, HorarioSeccion, MallaGrado, MallaItem, Nivel, Seccion, Turno
} from '../../../core/models/planificacion.model';
import { Cupo } from '../../../core/models/matricula.model';
import { RUTA_ESTRUCTURA } from '../../../core/services/arbol-estructura.service';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { MatriculaService } from '../../../core/services/matricula.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AsignarDocenteComponent } from '../../dashboard/asignar-docente.component';
import { SeccionFormComponent } from '../../dashboard/seccion-form.component';
import { AgregarCursosGradoComponent } from '../cursos/agregar-cursos-grado.component';
import { detectarConflictos } from './conflictos';
import { claseNivel, emblema } from './nivel-estilo';

interface Fila {
  etiqueta: string;
  valor: string;
  detalle?: string;
  /** Resalta la fila cuando algo falta o no cuadra. */
  alerta?: boolean;
}

interface GrupoDatos {
  titulo: string;
  icono: string;
  filas: Fila[];
}

/**
 * Un grado en detalle. Arriba, una portada con el color de su nivel y sus cifras principales; luego sus datos agrupados en dos columnas
 * (matrícula, estructura, académico, horario) y, debajo, lo que se edita: secciones, horario y cursos con su docente por sección.
 */
@Component({
  selector: 'app-grado-detalle',
  imports: [ReactiveFormsModule, RouterLink, ModalComponent, SeccionFormComponent, AsignarDocenteComponent, AgregarCursosGradoComponent],
  templateUrl: './grado-detalle.component.html',
  styleUrl: './grado-detalle.component.css'
})
export class GradoDetalleComponent {
  private readonly api = inject(PlanificacionService);
  private readonly matriculas = inject(MatriculaService);
  private readonly auth = inject(AuthService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly padre = RUTA_ESTRUCTURA;
  /** Secciones y malla las modifica solo el administrador; asignar docentes, también la secretaría. */
  protected readonly puedeEditar = this.auth.isAdmin;
  protected readonly puedeAsignar = computed(() => this.auth.tieneAlgunRol(['ADMIN', 'SECRETARIA']));

  private readonly rutaActual = inject(ActivatedRoute);
  private readonly gradoId = toSignal(this.rutaActual.paramMap.pipe(map(p => Number(p.get('gradoId')))), { initialValue: 0 });

  protected readonly cargando = signal(true);
  protected readonly noExiste = signal(false);
  protected readonly grado = signal<Grado | null>(null);
  protected readonly nivel = signal<Nivel | null>(null);
  protected readonly anio = signal<Anio | null>(null);
  protected readonly seccionesAnio = signal<Seccion[]>([]);
  protected readonly aulas = signal<Aula[]>([]);
  protected readonly cursos = signal<Curso[]>([]);
  protected readonly bloques = signal<Bloque[]>([]);
  protected readonly malla = signal<MallaGrado | null>(null);
  protected readonly asignaciones = signal<Asignacion[]>([]);
  protected readonly docentes = signal<Docente[]>([]);
  protected readonly cupos = signal<Cupo[]>([]);
  protected readonly horarios = signal<Record<number, HorarioSeccion | null>>({});

  protected readonly seccionForm = signal<{ editar: Seccion | null } | null>(null);
  protected readonly asignar = signal<{ seccionId: number; cursoId: number; editar: Asignacion | null } | null>(null);
  protected readonly mallaForm = signal<{ item: MallaItem | null } | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly formMalla = this.fb.nonNullable.group({
    cursoId: [0, [Validators.required, Validators.min(1)]],
    horasSemanales: [2, [Validators.required, Validators.min(1), Validators.max(40)]]
  });

  /** Colores y emblema del nivel de este grado. */
  protected readonly clase = computed(() => claseNivel(this.nivel()?.codigo));
  protected readonly emblema = computed(() => (this.grado() ? emblema(this.grado()!, this.nivel()?.codigo) : ''));

  protected readonly secciones = computed(() => this.seccionesAnio().filter(s => s.gradoId === this.gradoId()).sort((a, b) => a.nombre.localeCompare(b.nombre)));
  private readonly activas = computed(() => this.secciones().filter(s => s.activo));
  private readonly cupoDe = computed(() => new Map(this.cupos().map(c => [c.seccionId, c])));

  protected readonly alumnos = computed(() => this.cupos().reduce((t, c) => t + c.ocupados, 0));
  protected readonly capacidad = computed(() => (this.cupos().length ? this.cupos().reduce((t, c) => t + c.capacidad, 0) : this.activas().reduce((t, s) => t + s.capacidad, 0)));
  protected readonly vacantes = computed(() => Math.max(this.capacidad() - this.alumnos(), 0));
  protected readonly porcentaje = computed(() => (this.capacidad() ? Math.min(Math.round((this.alumnos() / this.capacidad()) * 100), 100) : 0));

  protected readonly avisosGrado = computed(() => {
    const g = this.grado();
    if (!g) return [];
    return detectarConflictos({ grados: [g], secciones: this.seccionesAnio(), aulas: this.aulas(), cursos: this.cursos(), bloques: this.bloques(), mallas: { [g.id]: this.malla() } });
  });

  /** Cursos de la malla por sección: quién los dicta (o nadie todavía). */
  protected readonly filasCursos = computed(() =>
    (this.malla()?.cursos ?? []).map(item => ({
      item,
      porSeccion: this.activas().map(s => ({ seccion: s, asignacion: this.asignaciones().find(a => a.seccionId === s.id && a.cursoId === item.cursoId) ?? null }))
    }))
  );

  /** Lo que se programó en el horario de cada sección frente a las horas que pide la malla. */
  protected readonly filasHorario = computed(() => {
    const requeridas = this.malla()?.totalHoras ?? 0;
    return this.activas().map(s => {
      const h = this.horarios()[s.id];
      const programadas = h?.clases.length ?? 0;
      return { seccion: s, programadas, requeridas, disponible: h !== undefined && h !== null, porcentaje: requeridas ? Math.min(Math.round((programadas / requeridas) * 100), 100) : 0 };
    });
  });

  /** Cifras principales de la portada. */
  protected readonly destacados = computed(() => [
    { valor: this.alumnos(), etiqueta: this.alumnos() === 1 ? 'alumno' : 'alumnos' },
    { valor: this.vacantes(), etiqueta: this.vacantes() === 1 ? 'vacante' : 'vacantes' },
    { valor: this.activas().length, etiqueta: this.activas().length === 1 ? 'sección' : 'secciones' },
    { valor: this.malla()?.cursos.length ?? 0, etiqueta: (this.malla()?.cursos.length ?? 0) === 1 ? 'curso' : 'cursos' }
  ]);

  /** Los datos del grado, en cuatro grupos que la pantalla reparte en dos columnas. */
  protected readonly grupos = computed<GrupoDatos[]>(() => {
    const secciones = this.secciones();
    const activas = this.activas();
    const malla = this.malla();
    const cursosMalla = malla?.cursos.length ?? 0;
    const pares = cursosMalla * activas.length;
    const conDocente = this.filasCursos().reduce((t, f) => t + f.porSeccion.filter(x => x.asignacion).length, 0);
    const docentesGrado = new Set(this.asignaciones().filter(a => activas.some(s => s.id === a.seccionId)).map(a => a.docenteId)).size;
    const tutores = activas.filter(s => s.tutorDocenteId).length;
    const programadas = this.filasHorario().reduce((t, f) => t + f.programadas, 0);
    const requeridas = this.filasHorario().reduce((t, f) => t + f.requeridas, 0);
    const turnos = [...new Set(activas.map(s => this.turno(s.turno)))].join(' y ') || '—';
    const aulasEnUso = [...new Set(activas.map(s => this.aulas().find(a => a.id === s.aulaId)?.codigo).filter(Boolean))].join(', ') || '—';
    const avisos = this.avisosGrado().length;
    const cap = this.capacidad();
    return [
      {
        titulo: 'Matrícula', icono: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z',
        filas: [
          { etiqueta: 'Alumnos matriculados', valor: String(this.alumnos()), detalle: cap ? `de ${cap} cupos` : undefined },
          { etiqueta: 'Vacantes disponibles', valor: String(this.vacantes()), alerta: cap > 0 && this.alumnos() >= cap },
          { etiqueta: 'Cupos (capacidad total)', valor: String(cap) }
        ]
      },
      {
        titulo: 'Estructura', icono: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
        filas: [
          { etiqueta: 'Secciones', valor: String(activas.length), detalle: secciones.length > activas.length ? `${secciones.length - activas.length} inactiva(s)` : undefined, alerta: activas.length === 0 },
          { etiqueta: 'Turnos', valor: turnos },
          { etiqueta: 'Aulas en uso', valor: aulasEnUso }
        ]
      },
      {
        titulo: 'Académico', icono: 'M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5zM4 19.5V21h16',
        filas: [
          { etiqueta: 'Cursos en la malla', valor: String(cursosMalla), alerta: cursosMalla === 0 },
          { etiqueta: 'Horas por semana', valor: String(malla?.totalHoras ?? 0) },
          { etiqueta: 'Docentes que dictan', valor: String(docentesGrado), detalle: pares ? `${conDocente} de ${pares} cursos con docente` : undefined, alerta: pares > 0 && conDocente < pares },
          { etiqueta: 'Tutores', valor: `${tutores} de ${activas.length}`, alerta: activas.length > 0 && tutores < activas.length }
        ]
      },
      {
        titulo: 'Horario y avisos', icono: 'M4 5h16v15H4zM4 10h16M10 5v15',
        filas: [
          { etiqueta: 'Clases en el horario', valor: requeridas ? `${programadas} de ${requeridas} h` : '—', alerta: requeridas > 0 && programadas < requeridas },
          { etiqueta: 'Avisos y conflictos', valor: String(avisos), alerta: avisos > 0 }
        ]
      }
    ];
  });

  protected readonly cursosDisponibles = computed(() => {
    const yaEstan = new Set(this.malla()?.cursos.map(c => c.cursoId) ?? []);
    return this.cursos().filter(c => c.activo && !yaEstan.has(c.id));
  });

  constructor() {
    // El mismo componente sirve para cualquier grado: al cambiar el id de la URL se vuelve a cargar.
    effect(() => {
      const id = this.gradoId();
      if (id) untracked(() => this.cargar(id));
    });
  }

  protected turno(t: Turno): string {
    return t === 'MANANA' ? 'Mañana' : 'Tarde';
  }

  protected cargar(id: number = this.gradoId()): void {
    this.cargando.set(true);
    this.noExiste.set(false);
    forkJoin({ grados: this.api.grados(), niveles: this.api.niveles(), anios: this.api.anios() }).subscribe({
      next: ({ grados, niveles, anios }) => {
        const grado = grados.find(g => g.id === id) ?? null;
        if (!grado) {
          this.noExiste.set(true);
          this.cargando.set(false);
          return;
        }
        this.grado.set(grado);
        this.nivel.set(niveles.find(n => n.id === grado.nivelId) ?? null);
        // El año que venía en la URL (desde la tarjeta de Estructura académica); si no, el activo o el que se está abriendo.
        const pedido = Number(this.rutaActual.snapshot.queryParamMap.get('anioId'));
        const anio = anios.find(a => a.id === pedido) ?? anios.find(a => a.estado === 'ACTIVO') ?? null;
        this.anio.set(anio);
        this.cargarDatos(grado, anio);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar el grado.'));
      }
    });
  }

  private cargarDatos(grado: Grado, anio: Anio | null): void {
    const anioId = anio?.id ?? 0;
    forkJoin({
      secciones: anioId ? this.api.secciones(anioId) : of([] as Seccion[]),
      aulas: this.api.aulas(),
      cursos: this.api.cursos(),
      bloques: this.api.bloques(),
      malla: this.api.malla(grado.id).pipe(catchError(() => of(null))),
      asignaciones: anioId ? this.api.asignaciones(undefined, undefined, anioId).pipe(catchError(() => of([] as Asignacion[]))) : of([] as Asignacion[]),
      docentes: this.api.docentes('', 0, 200).pipe(map(p => p.contenido.filter(d => d.estado === 'ACTIVO')), catchError(() => of([] as Docente[]))),
      // El servicio de matrícula puede estar apagado: sin él los alumnos quedan en 0 y los cupos salen de la capacidad.
      cupos: anioId ? this.matriculas.cupos(anioId, grado.id).pipe(catchError(() => of([] as Cupo[]))) : of([] as Cupo[])
    }).subscribe({
      next: r => {
        this.seccionesAnio.set(r.secciones);
        this.aulas.set(r.aulas);
        this.cursos.set(r.cursos);
        this.bloques.set(r.bloques);
        this.malla.set(r.malla);
        this.asignaciones.set(r.asignaciones);
        this.docentes.set(r.docentes);
        this.cupos.set(r.cupos);
        const propias = r.secciones.filter(s => s.gradoId === grado.id && s.activo);
        if (!propias.length) {
          this.horarios.set({});
          this.cargando.set(false);
          return;
        }
        forkJoin(propias.map(s => this.api.horarioSeccion(s.id).pipe(catchError(() => of(null))))).subscribe(hs => {
          this.horarios.set(Object.fromEntries(propias.map((s, i) => [s.id, hs[i]])));
          this.cargando.set(false);
        });
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los datos del grado.'));
      }
    });
  }

  protected alumnosDe(s: Seccion): number {
    return this.cupoDe().get(s.id)?.ocupados ?? 0;
  }

  protected porcentajeDe(s: Seccion): number {
    return s.capacidad ? Math.min(Math.round((this.alumnosDe(s) / s.capacidad) * 100), 100) : 0;
  }

  protected aulaDe(s: Seccion): Aula | null {
    return this.aulas().find(a => a.id === s.aulaId) ?? null;
  }

  protected avisosDe(s: Seccion) {
    return this.avisosGrado().filter(c => c.seccionId === s.id);
  }

  // --- Secciones ---
  protected nuevaSeccion(): void {
    this.seccionForm.set({ editar: null });
  }

  protected editarSeccion(s: Seccion): void {
    this.seccionForm.set({ editar: s });
  }

  protected seccionGuardada(): void {
    this.seccionForm.set(null);
    this.cargar();
  }

  // --- Malla del grado ---
  protected readonly agregandoCursos = signal(false);

  /** Abre el cuadro para elegir varios cursos (sugeridos del nivel, existentes o nuevos) y agregarlos de una vez. */
  protected agregarCurso(): void {
    this.agregandoCursos.set(true);
  }

  protected cursosAgregados(): void {
    this.agregandoCursos.set(false);
    this.cargar();
  }

  protected cambiarHoras(item: MallaItem): void {
    this.formMalla.reset({ cursoId: item.cursoId, horasSemanales: item.horasSemanales });
    this.errorForm.set(null);
    this.mallaForm.set({ item });
  }

  protected cerrarMalla(): void {
    this.mallaForm.set(null);
  }

  protected guardarMalla(): void {
    const f = this.mallaForm();
    const g = this.grado();
    if (!f || !g) return;
    if (this.formMalla.invalid) {
      this.formMalla.markAllAsTouched();
      return;
    }
    const v = this.formMalla.getRawValue();
    this.guardando.set(true);
    (f.item ? this.api.cambiarHorasMalla(f.item.id, v.horasSemanales) : this.api.agregarCursoMalla(g.id, v.cursoId, v.horasSemanales)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(f.item ? 'Horas actualizadas.' : 'Curso agregado a la malla.');
        this.cerrarMalla();
        this.cargar();
      },
      error: e => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(e));
      }
    });
  }

  protected async quitarCurso(item: MallaItem): Promise<void> {
    const g = this.grado();
    if (!g || !(await this.confirmacion.confirmar(`¿Quitar ${item.cursoNombre} de la malla de ${g.nombre}?`, 'Quitar', true))) return;
    this.api.quitarCursoMalla(item.id).subscribe({
      next: () => {
        this.avisos.success('Curso quitado de la malla.');
        this.cargar();
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  // --- Docente de cada curso por sección ---
  protected abrirAsignar(seccion: Seccion, item: MallaItem, asignacion: Asignacion | null): void {
    this.asignar.set({ seccionId: seccion.id, cursoId: item.cursoId, editar: asignacion });
  }

  protected asignado(): void {
    this.asignar.set(null);
    this.cargar();
  }
}
