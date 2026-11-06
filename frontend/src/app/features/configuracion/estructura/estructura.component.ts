import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Anio, Aula, Bloque, Curso, Grado, MallaGrado, Nivel, Seccion, Turno } from '../../../core/models/planificacion.model';
import { Cupo } from '../../../core/models/matricula.model';
import { MatriculaService } from '../../../core/services/matricula.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { AulasComponent } from '../../planificacion/aulas/aulas.component';
import { BloquesComponent } from '../../planificacion/bloques/bloques.component';
import { CursosComponent } from '../../planificacion/cursos/cursos.component';
import { Conflicto, DIAS_SEMANA, bloquesDeClase, detectarConflictos, sinRepetidos } from './conflictos';
import { CIRCUNFERENCIA, claseNivel, emblema, trazoAnillo } from './nivel-estilo';

type Catalogo = 'aulas' | 'cursos' | 'bloques';

/**
 * Estructura académica: una tarjeta por grado (alumnos, vacantes y sus secciones). Al pulsar una, el grado pasa a ser un «hijo» del
 * menú vertical y se abre su detalle (`GradoDetalleComponent`), donde se edita todo lo suyo. Aquí también se ven los conflictos entre
 * aulas, secciones, cursos y bloques, y los catálogos compartidos entre grados.
 */
@Component({
  selector: 'app-estructura',
  imports: [RouterLink, PageHeaderComponent, AulasComponent, CursosComponent, BloquesComponent],
  templateUrl: './estructura.component.html',
  styleUrl: './estructura.component.css'
})
export class EstructuraComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly matriculas = inject(MatriculaService);
  private readonly avisos = inject(NotificationService);
  private readonly ruta = inject(ActivatedRoute);

  protected readonly dias = DIAS_SEMANA;
  protected readonly circunferencia = CIRCUNFERENCIA;

  protected readonly anios = signal<Anio[]>([]);
  protected readonly anioId = signal(0);
  protected readonly anio = computed(() => this.anios().find(a => a.id === this.anioId()) ?? null);
  protected readonly grados = signal<Grado[]>([]);
  protected readonly niveles = signal<Nivel[]>([]);
  protected readonly secciones = signal<Seccion[]>([]);
  protected readonly aulas = signal<Aula[]>([]);
  protected readonly cursos = signal<Curso[]>([]);
  protected readonly bloques = signal<Bloque[]>([]);
  protected readonly cupos = signal<Cupo[]>([]);
  protected readonly mallas = signal<Record<number, MallaGrado | null>>({});
  protected readonly cargando = signal(true);

  protected readonly nivelFiltro = signal(0);
  protected readonly verConflictos = signal(false);
  protected readonly catalogo = signal<Catalogo | null>(null);

  /** Todo lo que no encaja, visto por grado. */
  private readonly conflictos = computed<Conflicto[]>(() =>
    detectarConflictos({ grados: this.grados(), secciones: this.secciones(), aulas: this.aulas(), cursos: this.cursos(), bloques: this.bloques(), mallas: this.mallas() })
  );
  protected readonly conflictosUnicos = computed(() => sinRepetidos(this.conflictos()));
  protected readonly graves = computed(() => this.conflictosUnicos().filter(c => c.gravedad === 'danger').length);

  /** Los niveles con la tarjeta de cada grado: alumnos, vacantes y sus secciones. */
  protected readonly grupos = computed(() => {
    const filtro = this.nivelFiltro();
    const conflictos = this.conflictos();
    return [...this.niveles()]
      .sort((a, b) => a.orden - b.orden)
      .filter(n => !filtro || n.id === filtro)
      .map(nivel => ({
        nivel,
        clase: claseNivel(nivel.codigo),
        tarjetas: this.grados()
          .filter(g => g.nivelId === nivel.id && g.activo !== false)
          .sort((a, b) => a.numero - b.numero)
          .map(grado => {
            const secciones = this.secciones().filter(s => s.gradoId === grado.id).sort((a, b) => a.nombre.localeCompare(b.nombre));
            const cuposGrado = this.cupos().filter(c => c.gradoId === grado.id);
            // Con cupos del servicio de matrícula se usan sus cifras; si aún no llegaron, se cuenta la capacidad de las secciones.
            const capacidad = cuposGrado.length ? cuposGrado.reduce((t, c) => t + c.capacidad, 0) : secciones.filter(s => s.activo).reduce((t, s) => t + s.capacidad, 0);
            const alumnos = cuposGrado.reduce((t, c) => t + c.ocupados, 0);
            const propios = conflictos.filter(c => c.gradoId === grado.id);
            // Cada sección con el aula que tiene asignada (y su pabellón, si lo tiene).
            const filas = secciones.map(s => ({ s, aula: this.aulas().find(a => a.id === s.aulaId) ?? null }));
            const porcentaje = capacidad ? Math.min(Math.round((alumnos / capacidad) * 100), 100) : 0;
            return {
              grado,
              emblema: emblema(grado, nivel.codigo),
              secciones,
              filas,
              alumnos,
              capacidad,
              vacantes: Math.max(capacidad - alumnos, 0),
              porcentaje,
              trazo: trazoAnillo(porcentaje),
              avisos: propios.length,
              graves: propios.filter(c => c.gravedad === 'danger').length,
              seccionesConAviso: new Set(propios.filter(c => c.seccionId).map(c => c.seccionId))
            };
          })
      }))
      .filter(g => g.tarjetas.length > 0);
  });

  /** Resumen de lo compartido entre grados. */
  protected readonly compartido = computed(() => {
    const enUso = new Set(this.secciones().filter(s => s.activo).map(s => s.aulaId));
    const enMalla = new Set(Object.values(this.mallas()).flatMap(m => m?.cursos.map(c => c.cursoId) ?? []));
    const aulasActivas = this.aulas().filter(a => a.activo);
    const cursosActivos = this.cursos().filter(c => c.activo);
    return {
      aulas: aulasActivas.length,
      aulasLibres: aulasActivas.filter(a => !enUso.has(a.id)).length,
      cursos: cursosActivos.length,
      cursosSinMalla: cursosActivos.filter(c => !enMalla.has(c.id)).length,
      manana: bloquesDeClase(this.bloques(), 'MANANA'),
      tarde: bloquesDeClase(this.bloques(), 'TARDE')
    };
  });

  ngOnInit(): void {
    this.api.anios().subscribe({
      next: a => {
        this.anios.set(a);
        // Solo se muestra lo del periodo ACTIVO (o el año que se pidió en la URL, p. ej. al volver desde un grado); sin activo, queda vacío.
        const pedido = Number(this.ruta.snapshot.queryParamMap.get('anioId'));
        this.anioId.set((a.find(x => x.id === pedido) ?? a.find(x => x.estado === 'ACTIVO'))?.id ?? 0);
        this.cargar();
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los años académicos.'));
      }
    });
  }

  protected cambiarAnio(id: number): void {
    this.anioId.set(id);
    this.cargar();
  }

  /** Vuelve a leer todo: lo que se relaciona cambia junto (un aula nueva puede resolver el aviso de una sección). */
  protected cargar(): void {
    this.cargando.set(true);
    const anioId = this.anioId();
    forkJoin({
      grados: this.api.grados(),
      niveles: this.api.niveles(),
      aulas: this.api.aulas(),
      cursos: this.api.cursos(),
      bloques: this.api.bloques(),
      secciones: anioId ? this.api.secciones(anioId) : of([] as Seccion[]),
      // El servicio de matrícula puede estar apagado: sin él la tarjeta usa la capacidad de las secciones.
      cupos: anioId ? this.matriculas.cupos(anioId).pipe(catchError(() => of([] as Cupo[]))) : of([] as Cupo[])
    }).subscribe({
      next: r => {
        // Si mientras tanto se eligió otro año, esta respuesta ya no vale (no debe pisar la del año actual).
        if (anioId !== this.anioId()) return;
        this.grados.set(r.grados);
        this.niveles.set(r.niveles);
        this.aulas.set(r.aulas);
        this.cursos.set(r.cursos);
        this.bloques.set(r.bloques);
        this.secciones.set(r.secciones);
        this.cupos.set(r.cupos);
        forkJoin(r.grados.map(g => this.api.malla(g.id).pipe(catchError(() => of(null))))).subscribe(ms => {
          if (anioId !== this.anioId()) return;
          this.mallas.set(Object.fromEntries(r.grados.map((g, i) => [g.id, ms[i]])));
          this.cargando.set(false);
        });
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar la estructura académica.'));
      }
    });
  }

  protected turno(t: Turno): string {
    return t === 'MANANA' ? 'Mañana' : 'Tarde';
  }

  // --- Catálogos compartidos (aulas, cursos, bloques) ---
  protected alternarCatalogo(c: Catalogo): void {
    const cierra = this.catalogo() === c;
    this.catalogo.set(cierra ? null : c);
    if (cierra) this.cargar(); // al cerrar, lo que se editó se refleja en las tarjetas
  }
}
