import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { Apoderado, AlumnoResumen, ESTADOS_ALUMNO, EstadoAlumno, PARENTESCOS, Parentesco } from '../../core/models/alumno.model';
import { Matricula } from '../../core/models/matricula.model';
import { Anio } from '../../core/models/planificacion.model';
import { AlumnoService } from '../../core/services/alumno.service';
import { MatriculaService } from '../../core/services/matricula.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { NotificationService } from '../../core/services/notification.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { CLASE_SITUACION, Situacion, TEXTO_SITUACION, puedeMatricular, situacionDe } from './matricula-alumno';

const CLASE_ESTADO: Record<EstadoAlumno, string> = {
  ACTIVO: 'badge-ok', INACTIVO: 'badge-gray', RETIRADO: 'badge-danger', TRASLADADO: 'badge-violet', EGRESADO: 'badge'
};

@Component({
  selector: 'app-alumnos',
  imports: [ReactiveFormsModule, RouterLink, ModalComponent, PageHeaderComponent],
  templateUrl: './alumnos.component.html',
  styles: `
    .casilla-matricular { display: flex; align-items: flex-start; gap: 10px; margin-top: 14px; padding: 12px 14px; border: 1.5px solid var(--primary); border-radius: 12px; background: var(--primary-soft); cursor: pointer; }
    .casilla-matricular input { width: 18px; height: 18px; margin-top: 2px; }
    .casilla-matricular span { display: flex; flex-direction: column; }
    .casilla-matricular small { color: var(--ink-2); }
  `
})
export class AlumnosComponent implements OnInit {
  private readonly api = inject(AlumnoService);
  private readonly avisos = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly ruta = inject(ActivatedRoute);
  private readonly matriculas = inject(MatriculaService);
  private readonly plan = inject(PlanificacionService);

  protected readonly estados = ESTADOS_ALUMNO;
  protected readonly parentescos = PARENTESCOS;
  protected readonly alumnos = signal<AlumnoResumen[]>([]);
  protected readonly total = signal(0);
  protected readonly paginas = signal(1);
  protected readonly pagina = signal(0);
  protected readonly cargando = signal(false);

  protected readonly abierto = signal(false);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);

  protected readonly filtro = this.fb.nonNullable.group({ q: '', estado: '' as EstadoAlumno | '' });

  // --- alta ---
  protected readonly usarExistente = signal(false);
  protected readonly resultadosApoderado = signal<Apoderado[]>([]);
  protected readonly apoderadoElegido = signal<Apoderado | null>(null);
  protected readonly busquedaApoderado = this.fb.nonNullable.control('');

  protected readonly form = this.fb.nonNullable.group({
    tipoDocumento: ['DNI'],
    numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: [''],
    fechaNacimiento: ['', Validators.required],
    sexo: ['', Validators.required],
    nacionalidad: ['Peruana'],
    direccion: [''],
    distrito: [''],
    telefono: [''],
    email: ['', Validators.email],
    colegioProcedencia: [''],
    parentesco: ['MADRE' as Parentesco, Validators.required]
  });
  /** Al registrar un alumno nuevo se ofrece matricularlo enseguida (abre el asistente de matrícula). */
  protected readonly matricularAhora = this.fb.nonNullable.control(true);

  protected readonly formApoderado = this.fb.nonNullable.group({
    tipoDocumento: ['DNI'],
    numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    telefono: [''],
    email: ['', Validators.email]
  });

  // --- matrícula del año activo: cómo está cada alumno; «Matricular» abre el asistente de matrícula ---
  protected readonly anioActivo = signal<Anio | null>(null);
  private readonly matriculasAnio = signal<Matricula[]>([]);
  protected readonly matriculaCargada = signal(false);
  protected readonly textoSituacion = TEXTO_SITUACION;
  protected readonly claseSituacion = CLASE_SITUACION;

  protected situacion(a: AlumnoResumen): Situacion {
    return situacionDe(a.id, this.matriculasAnio());
  }

  protected opcionMatricular(a: AlumnoResumen): { puede: boolean; motivo?: string } {
    return puedeMatricular(a.estado, this.situacion(a), !!this.anioActivo());
  }

  private cargarMatriculas(): void {
    this.plan.anios().pipe(catchError(() => of(null))).subscribe(anios => {
      const activo = anios?.find(x => x.estado === 'ACTIVO') ?? null;
      this.anioActivo.set(activo);
      if (!activo) { this.matriculaCargada.set(true); return; }
      this.matriculas.listar({ anioId: activo.id, size: 100 }).pipe(catchError(() => of(null))).subscribe(p => {
        this.matriculasAnio.set(p?.contenido ?? []);
        this.matriculaCargada.set(true);
      });
    });
  }

  ngOnInit(): void {
    this.cargarMatriculas();
    this.cargar(0);
    // Enlace desde el inicio: ?nuevo=1 abre el formulario de alta.
    if (this.ruta.snapshot.queryParamMap.get('nuevo')) this.nuevo();
  }

  protected clase(e: EstadoAlumno): string {
    return CLASE_ESTADO[e];
  }

  protected buscar(): void {
    this.cargar(0);
  }

  protected irA(pagina: number): void {
    if (pagina >= 0 && pagina < this.paginas()) {
      this.cargar(pagina);
    }
  }

  private cargar(pagina: number): void {
    const f = this.filtro.getRawValue();
    this.cargando.set(true);
    this.api.listar(f.q.trim(), f.estado, pagina).subscribe({
      next: p => {
        this.alumnos.set(p.contenido);
        this.total.set(p.totalElementos);
        this.paginas.set(Math.max(1, p.totalPaginas));
        this.pagina.set(p.pagina);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar la lista de alumnos.'));
      }
    });
  }

  // --- alta ---
  protected nuevo(): void {
    this.form.reset({ tipoDocumento: 'DNI', nacionalidad: 'Peruana', parentesco: 'MADRE' });
    this.formApoderado.reset({ tipoDocumento: 'DNI' });
    this.usarExistente.set(false);
    this.apoderadoElegido.set(null);
    this.resultadosApoderado.set([]);
    this.busquedaApoderado.setValue('');
    this.errorForm.set(null);
    this.matricularAhora.setValue(true);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  protected modoApoderado(existente: boolean): void {
    this.usarExistente.set(existente);
    this.apoderadoElegido.set(null);
  }

  protected buscarApoderado(): void {
    const q = this.busquedaApoderado.value.trim();
    if (q.length < 2) {
      this.resultadosApoderado.set([]);
      return;
    }
    this.api.buscarApoderados(q).subscribe({
      next: p => this.resultadosApoderado.set(p.contenido),
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  protected elegirApoderado(a: Apoderado): void {
    this.apoderadoElegido.set(a);
    this.resultadosApoderado.set([]);
  }

  protected guardar(): void {
    const existente = this.usarExistente();
    const apoderadoValido = existente ? !!this.apoderadoElegido() : this.formApoderado.valid;
    if (this.form.invalid || !apoderadoValido) {
      this.form.markAllAsTouched();
      this.formApoderado.markAllAsTouched();
      this.errorForm.set(existente && !this.apoderadoElegido() ? 'Elige un apoderado de la lista.' : 'Revisa los campos obligatorios.');
      return;
    }
    const v = this.form.getRawValue();
    const limpio = (s: string): string | undefined => s.trim() || undefined;
    const apo = this.formApoderado.getRawValue();
    const vinculo = {
      parentesco: v.parentesco,
      esPrincipal: true,
      esResponsablePago: true,
      viveConAlumno: true,
      puedeRecoger: true,
      ...(existente
        ? { apoderadoId: this.apoderadoElegido()!.id }
        : {
            apoderado: {
              tipoDocumento: apo.tipoDocumento,
              numeroDocumento: apo.numeroDocumento.trim(),
              nombres: apo.nombres.trim(),
              apellidos: apo.apellidos.trim(),
              telefono: limpio(apo.telefono),
              email: limpio(apo.email)
            }
          })
    };
    this.guardando.set(true);
    this.errorForm.set(null);
    this.api
      .crear({
        tipoDocumento: v.tipoDocumento,
        numeroDocumento: v.numeroDocumento.trim(),
        nombres: v.nombres.trim(),
        apellidoPaterno: v.apellidoPaterno.trim(),
        apellidoMaterno: limpio(v.apellidoMaterno),
        fechaNacimiento: v.fechaNacimiento,
        sexo: v.sexo,
        nacionalidad: limpio(v.nacionalidad),
        direccion: limpio(v.direccion),
        distrito: limpio(v.distrito),
        telefono: limpio(v.telefono),
        email: limpio(v.email),
        colegioProcedencia: limpio(v.colegioProcedencia),
        apoderados: [vinculo]
      })
      .subscribe({
        next: alumno => {
          this.guardando.set(false);
          this.cerrar();
          if (this.matricularAhora.value) {
            // Sigue la matrícula: ya tiene apoderado, así que el asistente continúa por los documentos.
            this.avisos.success(`Alumno ${alumno.codigo} registrado. Sigamos con su matrícula.`);
            this.router.navigate(['/matricula/asistente'], { queryParams: { alumnoId: alumno.id, paso: 'documentos' } });
          } else {
            this.avisos.success(`Alumno ${alumno.codigo} registrado. Sube y verifica sus documentos para poder matricularlo.`);
            this.router.navigate(['/alumnos', alumno.id]);
          }
        },
        error: e => {
          this.guardando.set(false);
          this.errorForm.set(mensajeError(e));
        }
      });
  }
}
