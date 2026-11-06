import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Alumno, Documento, Vinculo } from '../../core/models/alumno.model';
import { CuentasService } from '../../core/services/cuentas.service';
import { Matricula, MatriculaDetalle } from '../../core/models/matricula.model';
import { Seccion } from '../../core/models/planificacion.model';
import { AlumnoService } from '../../core/services/alumno.service';
import { MatriculaService } from '../../core/services/matricula.service';
import { NotificationService } from '../../core/services/notification.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { TipoRequerido, NOMBRE_REQUERIDO } from '../documentos/documentos';
import { DocumentosDatosService } from '../documentos/documentos-datos.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ETIQUETA_DOCUMENTO, estadoDelExpediente, FilaDocumento } from './asistente-matricula';

/** Del más reciente al más antiguo (por fecha de pago, o de creación si aún no se pagó). */
const porFechaDesc = (a: Matricula, b: Matricula): number => (b.pagadaEn ?? b.creadoEn ?? '').localeCompare(a.pagadaEn ?? a.creadoEn ?? '');

/**
 * Aprobación administrativa de matrículas. Una matrícula pagada (en línea o en caja) queda POR_APROBAR; la confirman la
 * administración y la secretaría. Antes de aprobar se revisa todo: el alumno, sus apoderados, la matrícula y el expediente.
 * Secretaría puede generar las fichas de los documentos que faltan (DNI, partida, SIAGIE) y verificarlos aquí mismo.
 */
@Component({
  selector: 'app-aprobaciones',
  imports: [ReactiveFormsModule, DatePipe, RouterLink, ModalComponent, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Matrículas por aprobar" subtitulo="Revisa cada matrícula pagada y apruébala: la familia recibe su acceso por correo" />

      <div class="aviso aviso-info" style="margin-bottom: 14px">
        <strong>Cómo funciona:</strong> el pago deja la matrícula «por aprobar» y reserva el cupo. Al aprobarla se matricula al alumno, se generan las pensiones
        y se envía al apoderado el correo con el <b>usuario, la clave inicial, la constancia y el horario</b>.
      </div>

      <div class="card">
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Código</th><th>Alumno</th><th>Sección</th><th>Origen</th><th>Forma de pago</th><th>Pagada</th><th></th></tr></thead>
            <tbody>
              @for (m of pendientes(); track m.id) {
                <tr>
                  <td>{{ m.codigo }}</td>
                  <td><strong>{{ m.alumnoNombre }}</strong></td>
                  <td>{{ nombreSeccion(m.seccionId) }}</td>
                  <td><span class="badge badge-gray">{{ enLinea(m) ? 'En línea' : 'Presencial' }}</span></td>
                  <td>{{ etiquetaPlan(m) }}</td>
                  <td class="muted">{{ (m.pagadaEn ?? m.creadoEn) | date: 'dd/MM/yyyy HH:mm' }}</td>
                  <td class="acciones"><button type="button" class="btn btn-sm btn-primary" (click)="revisar(m)">Revisar</button></td>
                </tr>
              } @empty {
                <tr><td colspan="7" class="vacio">{{ cargando() ? 'Cargando…' : 'No hay matrículas pendientes de aprobación. 🎉' }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    @if (detalle(); as d) {
      <app-modal [titulo]="'Revisar ' + d.matricula.codigo" [ancho]="760" (cerrar)="cerrar()">

        <h3 class="sec">Alumno</h3>
        @if (alumno(); as a) {
          <dl class="dl">
            <div><dt>Nombre completo</dt><dd>{{ a.nombreCompleto }}</dd></div>
            <div><dt>Código</dt><dd>{{ a.codigo }}</dd></div>
            <div><dt>{{ a.tipoDocumento ?? 'Documento' }}</dt><dd>{{ a.numeroDocumento }}</dd></div>
            <div><dt>Fecha de nacimiento</dt><dd>{{ a.fechaNacimiento | date: 'dd/MM/yyyy' }}</dd></div>
            <div><dt>Sexo</dt><dd>{{ a.sexo === 'F' ? 'Femenino' : a.sexo === 'M' ? 'Masculino' : a.sexo }}</dd></div>
            <div><dt>Nacionalidad</dt><dd>{{ a.nacionalidad ?? '—' }}</dd></div>
            <div><dt>Dirección</dt><dd>{{ a.direccion ?? '—' }}@if (a.distrito) { · {{ a.distrito }} }</dd></div>
            <div><dt>Teléfono</dt><dd>{{ a.telefono ?? '—' }}</dd></div>
            <div><dt>Correo</dt><dd>{{ a.email ?? '—' }}</dd></div>
            <div><dt>Colegio de procedencia</dt><dd>{{ a.colegioProcedencia ?? '—' }}</dd></div>
          </dl>
        } @else { <p class="muted">Cargando datos del alumno…</p> }

        <h3 class="sec">Apoderados</h3>
        @if (alumno(); as a) {
          @for (v of a.apoderados; track v.id) {
            <div class="fila-apod">
              <strong>{{ v.apoderado.apellidos }}, {{ v.apoderado.nombres }}</strong>
              <span class="muted">{{ v.parentesco.toLowerCase() }}</span>
              @if (v.esResponsablePago) { <span class="badge badge-violet">Responsable de pago</span> }
              @if (v.esPrincipal) { <span class="badge badge-gray">Principal</span> }
              <div class="muted">{{ v.apoderado.tipoDocumento ?? 'DNI' }} {{ v.apoderado.numeroDocumento }} · {{ v.apoderado.telefono ?? 'sin teléfono' }} · {{ v.apoderado.email ?? 'sin correo' }}</div>
            </div>
          } @empty { <p class="muted">Sin apoderados registrados.</p> }
        }

        <h3 class="sec">Cuentas de acceso</h3>
        @if (alumno(); as a) {
          <div class="fila-doc">
            <span class="badge" [class]="a.usuarioId ? 'badge-ok' : 'badge-warn'">{{ a.usuarioId ? 'Alumno: con cuenta' : 'Alumno: sin cuenta' }}</span>
            @if (!a.usuarioId) {
              <button type="button" class="btn btn-sm btn-primary" [disabled]="trabajando()" (click)="crearCuentaAlumno(a)">Crear cuenta del alumno</button>
            }
          </div>
          @for (v of a.apoderados; track v.id) {
            <div class="fila-doc">
              <span class="badge" [class]="v.apoderado.usuarioId ? 'badge-ok' : 'badge-warn'">{{ v.apoderado.usuarioId ? 'Apoderado ' + v.apoderado.nombres + ': con cuenta' : 'Apoderado ' + v.apoderado.nombres + ': sin cuenta' }}</span>
              @if (!v.apoderado.usuarioId) {
                <button type="button" class="btn btn-sm btn-primary" [disabled]="trabajando()" (click)="crearCuentaApoderado(a, v)">Crear cuenta del apoderado</button>
              }
            </div>
          }
          <p class="muted" style="font-size: .85rem; margin: 6px 0 0">La clave inicial de cada cuenta es su número de documento; el sistema pide cambiarla al entrar.</p>
        }

        <h3 class="sec">Matrícula</h3>
        <dl class="dl">
          <div><dt>Código</dt><dd>{{ d.matricula.codigo }}</dd></div>
          <div><dt>Año</dt><dd>{{ anioNombre(d.matricula) }}</dd></div>
          <div><dt>Grado y sección</dt><dd>{{ nombreSeccion(d.matricula.seccionId) }}@if (turnoDe(d.matricula.seccionId); as t) { · {{ t }} }</dd></div>
          <div><dt>Tipo</dt><dd>{{ d.matricula.tipo }}</dd></div>
          <div><dt>Forma de pago de las pensiones</dt><dd>{{ etiquetaPlan(d.matricula) }}</dd></div>
          <div><dt>Origen</dt><dd>{{ enLinea(d.matricula) ? 'Matrícula en línea (la familia pagó con tarjeta)' : 'Presencial (pagada en caja)' }}</dd></div>
          <div><dt>Pago de matrícula</dt><dd>Registrado el {{ (d.matricula.pagadaEn ?? d.matricula.creadoEn) | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
          @if (d.matricula.observaciones) { <div><dt>Observaciones</dt><dd>{{ d.matricula.observaciones }}</dd></div> }
        </dl>

        <h3 class="sec">Expediente y documentos</h3>
        @for (f of filasExpediente(); track f.tipo) {
          <div class="fila-doc">
            <span class="badge" [class]="claseFila(f)">{{ textoFila(f) }}</span>
            <span>{{ nombreDoc(f.tipo) }}</span>
            @if (f.documento && f.estado === 'sin-verificar') {
              <button type="button" class="btn btn-sm" [disabled]="trabajando()" (click)="verificar(f)">Verificar</button>
            }
          </div>
        }
        @if (faltanDocs().length) {
          <div class="aviso aviso-warn" style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap">
            <span>Faltan {{ faltanDocs().length }} documento(s). Se puede generar la ficha con los datos registrados del alumno; después hay que verificarla.</span>
            <button type="button" class="btn btn-sm btn-primary" [disabled]="trabajando()" (click)="generarFaltantes()">{{ trabajando() ? 'Generando…' : 'Generar documentos faltantes' }}</button>
          </div>
        } @else if (sinVerificar().length) {
          <p class="muted" style="margin-top: 8px">Todos los documentos están subidos. Verifica los que aún dicen «sin verificar».</p>
        }
        @if (alumno(); as a) { <p style="margin-top: 10px"><a [routerLink]="['/alumnos']" [queryParams]="{ alumnoId: a.id }">Abrir la ficha del alumno</a></p> }

        <h3 class="sec">Requisitos de la matrícula</h3>
        @for (r of d.requisitos; track r.id) {
          <div class="fila-req"><span [class]="'badge ' + (r.cumplido ? 'badge-ok' : 'badge-gray')">{{ r.cumplido ? 'Cumplido' : 'Pendiente' }}</span> {{ r.tipo.replaceAll('_', ' ').toLowerCase() }}</div>
        }

        @if (modo() === 'rechazar') {
          <form [formGroup]="formRechazo" (ngSubmit)="rechazar()" id="form-rechazo" novalidate style="margin-top: 14px">
            <div class="field">
              <label for="rech-motivo">Motivo del rechazo (se envía a la familia)</label>
              <textarea id="rech-motivo" rows="3" formControlName="motivo" style="padding: 10px 12px; min-height: 80px"></textarea>
              @if (formRechazo.controls.motivo.touched && formRechazo.controls.motivo.invalid) { <span class="error">El motivo es obligatorio.</span> }
            </div>
            <p class="muted" style="font-size: .85rem">Se libera el cupo. El pago de la matrícula se devuelve desde Finanzas → Cobranza.</p>
          </form>
        }
        @if (error()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ error() }}</div> }

        <ng-container footer>
          <button type="button" class="btn" (click)="cerrar()">Cerrar</button>
          @if (modo() === 'revisar') {
            <button type="button" class="btn btn-danger" [disabled]="guardando()" (click)="modo.set('rechazar')">Rechazar…</button>
            <button type="button" class="btn btn-primary" [disabled]="guardando()" (click)="aprobar()">{{ guardando() ? 'Aprobando…' : 'Aprobar matrícula' }}</button>
          } @else {
            <button type="button" class="btn" (click)="modo.set('revisar')">Volver</button>
            <button type="submit" form="form-rechazo" class="btn btn-danger" [disabled]="guardando()">{{ guardando() ? 'Rechazando…' : 'Confirmar rechazo' }}</button>
          }
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .fila-req { padding: 3px 0; text-transform: none; } .fila-req .badge { margin-right: 8px; }
    .sec { margin: 18px 0 6px; font-size: 1rem; }
    .fila-apod { padding: 6px 0; border-bottom: 1px solid var(--line, #eee); display: flex; flex-wrap: wrap; gap: 6px; align-items: baseline; }
    .fila-doc { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 4px 0; }
  `
})
export class AprobacionesComponent implements OnInit {
  private readonly api = inject(MatriculaService);
  private readonly alumnosApi = inject(AlumnoService);
  private readonly plan = inject(PlanificacionService);
  private readonly generador = inject(DocumentosDatosService);
  private readonly cuentas = inject(CuentasService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly pendientes = signal<Matricula[]>([]);
  protected readonly secciones = signal<Seccion[]>([]);
  protected readonly anios = signal<Record<number, string>>({});
  protected readonly cargando = signal(true);
  protected readonly detalle = signal<MatriculaDetalle | null>(null);
  protected readonly alumno = signal<Alumno | null>(null);
  protected readonly documentos = signal<Documento[]>([]);
  protected readonly filasExpediente = signal<FilaDocumento[]>([]);
  protected readonly faltanDocs = signal<TipoRequerido[]>([]);
  protected readonly sinVerificar = signal<FilaDocumento[]>([]);
  protected readonly modo = signal<'revisar' | 'rechazar'>('revisar');
  protected readonly guardando = signal(false);
  protected readonly trabajando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly formRechazo = this.fb.nonNullable.group({ motivo: ['', [Validators.required, Validators.maxLength(255)]] });

  ngOnInit(): void {
    this.plan.secciones().subscribe(s => this.secciones.set(s));
    this.plan.anios().subscribe(a => this.anios.set(Object.fromEntries(a.map(x => [x.id, x.nombre]))));
    this.cargar();
  }

  private cargar(): void {
    this.cargando.set(true);
    this.api.listar({ estado: 'POR_APROBAR', size: 100 }).subscribe({
      next: p => { this.pendientes.set([...p.contenido].sort(porFechaDesc)); this.cargando.set(false); },
      error: e => { this.cargando.set(false); this.avisos.error(mensajeError(e, 'No se pudieron cargar las matrículas por aprobar.')); }
    });
  }

  protected nombreSeccion(id: number): string {
    const s = this.secciones().find(x => x.id === id);
    return s ? `${s.gradoNombre} · ${s.nombre}` : `Sección ${id}`;
  }

  protected turnoDe(seccionId: number): string | null {
    const t = this.secciones().find(x => x.id === seccionId)?.turno;
    return t ? (t === 'TARDE' ? 'Tarde' : t === 'MANANA' ? 'Mañana' : t) : null;
  }

  protected anioNombre(m: Matricula): string {
    return this.anios()[m.anioId] ?? `Año ${m.anioId}`;
  }

  protected etiquetaPlan(m: Matricula): string {
    const p = m.planPago ?? 'MENSUAL';
    return ({ MENSUAL: 'Mensual', BIMESTRAL: 'Bimestral', SEMESTRAL: 'Semestral (5 % de descuento)', ANUAL: 'Anual (10 % de descuento)' } as Record<string, string>)[p] ?? p;
  }

  protected enLinea(m: Matricula): boolean {
    return (m.observaciones ?? '').toLowerCase().includes('en línea');
  }

  protected nombreDoc(tipo: string): string {
    return ETIQUETA_DOCUMENTO[tipo as keyof typeof ETIQUETA_DOCUMENTO] ?? tipo;
  }

  protected textoFila(f: FilaDocumento): string {
    return f.estado === 'verificado' ? 'Verificado' : f.estado === 'sin-verificar' ? 'Sin verificar' : 'Falta';
  }

  protected claseFila(f: FilaDocumento): string {
    return f.estado === 'verificado' ? 'badge-ok' : f.estado === 'sin-verificar' ? 'badge-warn' : 'badge-gray';
  }

  /** Recalcula el expediente del alumno a partir de sus documentos. */
  private aplicarDocumentos(docs: Documento[]): void {
    this.documentos.set(docs);
    const filas = estadoDelExpediente(docs);
    this.filasExpediente.set(filas);
    this.faltanDocs.set(filas.filter(f => f.estado === 'falta').map(f => f.tipo as TipoRequerido));
    this.sinVerificar.set(filas.filter(f => f.estado === 'sin-verificar'));
  }

  protected revisar(m: Matricula): void {
    this.error.set(null);
    this.modo.set('revisar');
    this.formRechazo.reset({ motivo: '' });
    this.alumno.set(null);
    this.api.detalle(m.id).subscribe({
      next: d => {
        this.detalle.set(d);
        this.alumnosApi.obtener(m.alumnoId).subscribe({ next: a => this.alumno.set(a), error: () => this.alumno.set(null) });
        this.alumnosApi.documentos(m.alumnoId).pipe(catchError(() => of([] as Documento[]))).subscribe(docs => this.aplicarDocumentos(docs));
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudo abrir la matrícula.'))
    });
  }

  protected cerrar(): void {
    this.detalle.set(null);
    this.alumno.set(null);
  }

  /** Genera las fichas de los documentos que faltan con los datos registrados del alumno y las sube a su expediente (quedan sin verificar). */
  protected generarFaltantes(): void {
    const a = this.alumno();
    const tipos = this.faltanDocs();
    if (!a || !tipos.length || this.trabajando()) return;
    this.trabajando.set(true);
    this.generador.cargar(a.id).pipe(
      switchMap(datos => forkJoin(tipos.map(t => this.generador.guardarRequerido(t, datos)))),
      switchMap(() => this.alumnosApi.documentos(a.id))
    ).subscribe({
      next: docs => {
        this.trabajando.set(false);
        this.aplicarDocumentos(docs);
        this.avisos.success(`Se generaron ${tipos.length} ${tipos.length === 1 ? 'documento' : 'documentos'} (${tipos.map(t => NOMBRE_REQUERIDO[t]).join(', ')}). Revísalos y verifícalos.`);
      },
      error: e => { this.trabajando.set(false); this.avisos.error(mensajeError(e, 'No se pudieron generar los documentos.')); }
    });
  }

  /** Verifica un documento del expediente (solo quien lo revisó en el original debe hacerlo). */
  protected verificar(f: FilaDocumento): void {
    const a = this.alumno();
    if (!a || !f.documento || this.trabajando()) return;
    this.trabajando.set(true);
    this.alumnosApi.verificarDocumento(a.id, f.documento.id, true).pipe(switchMap(() => this.alumnosApi.documentos(a.id))).subscribe({
      next: docs => { this.trabajando.set(false); this.aplicarDocumentos(docs); },
      error: e => { this.trabajando.set(false); this.avisos.error(mensajeError(e, 'No se pudo verificar el documento.')); }
    });
  }

  /** Crea la cuenta del alumno (usuario nombre.apellido, clave inicial su documento) y la vincula a su ficha. */
  protected crearCuentaAlumno(a: Alumno): void {
    if (this.trabajando()) return;
    this.trabajando.set(true);
    this.cuentas.crear({ tipo: 'ALUMNO', id: a.id, nombres: a.nombres, apellidos: [a.apellidoPaterno, a.apellidoMaterno].filter(Boolean).join(' '), documento: a.numeroDocumento }).subscribe({
      next: u => { this.avisos.success(`Cuenta del alumno creada: usuario ${u.username}, clave inicial su documento.`); this.recargarAlumno(a.id); },
      error: e => { this.trabajando.set(false); this.avisos.error(mensajeError(e, 'No se pudo crear la cuenta del alumno.')); }
    });
  }

  /** Crea la cuenta del apoderado y la vincula a su ficha (el alumno puede tener varios apoderados). */
  protected crearCuentaApoderado(a: Alumno, v: Vinculo): void {
    if (this.trabajando()) return;
    this.trabajando.set(true);
    const ap = v.apoderado;
    this.cuentas.crear({ tipo: 'APODERADO', id: ap.id, nombres: ap.nombres, apellidos: ap.apellidos, documento: ap.numeroDocumento, usuarioId: ap.usuarioId }).subscribe({
      next: u => { this.avisos.success(`Cuenta del apoderado creada: usuario ${u.username}, clave inicial su documento.`); this.recargarAlumno(a.id); },
      error: e => { this.trabajando.set(false); this.avisos.error(mensajeError(e, 'No se pudo crear la cuenta del apoderado.')); }
    });
  }

  private recargarAlumno(alumnoId: number): void {
    this.alumnosApi.obtener(alumnoId).subscribe({
      next: a => { this.alumno.set(a); this.trabajando.set(false); },
      error: () => this.trabajando.set(false)
    });
  }

  protected aprobar(): void {
    const d = this.detalle();
    if (!d) return;
    this.guardando.set(true);
    this.error.set(null);
    this.api.aprobar(d.matricula.id).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(this.enLinea(d.matricula)
          ? 'Matrícula aprobada. Enviamos al apoderado el correo con su usuario, clave inicial, constancia y horario.'
          : 'Matrícula aprobada. Se generaron las pensiones; las cuentas de acceso se crean en «Cuentas de acceso».');
        this.cerrar();
        this.cargar();
      },
      error: e => { this.guardando.set(false); this.error.set(mensajeError(e, 'No se pudo aprobar la matrícula.')); }
    });
  }

  protected rechazar(): void {
    const d = this.detalle();
    if (!d) return;
    if (this.formRechazo.invalid) { this.formRechazo.markAllAsTouched(); return; }
    this.guardando.set(true);
    this.error.set(null);
    this.api.rechazar(d.matricula.id, this.formRechazo.getRawValue().motivo.trim()).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success('Matrícula rechazada y cupo liberado.');
        this.cerrar();
        this.cargar();
      },
      error: e => { this.guardando.set(false); this.error.set(mensajeError(e, 'No se pudo rechazar la matrícula.')); }
    });
  }
}
