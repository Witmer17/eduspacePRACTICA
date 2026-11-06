import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Apoderado } from '../../core/models/alumno.model';
import { Hijo } from '../../core/models/familia.model';
import { AlumnoService } from '../../core/services/alumno.service';
import { NotificationService } from '../../core/services/notification.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

/** Nombre completo de un apoderado: «Apellidos, Nombres». */
export const nombreApoderado = (a: Pick<Apoderado, 'nombres' | 'apellidos'>): string => `${a.apellidos}, ${a.nombres}`.trim();

/**
 * Apoderados del colegio: se buscan por nombre o documento, se ve si tienen cuenta de acceso, se corrigen sus datos de contacto
 * y se consultan sus hijos (con enlace al expediente de cada uno). Las altas se hacen al registrar al alumno.
 */
@Component({
  selector: 'app-apoderados',
  imports: [ReactiveFormsModule, RouterLink, ModalComponent, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Apoderados" subtitulo="Los adultos responsables de cada alumno: contacto, cuenta de acceso y sus hijos. Se registran junto con el alumno." />

      <form class="toolbar" [formGroup]="filtro" (ngSubmit)="buscar()">
        <input class="input grow" type="search" formControlName="q" placeholder="Buscar por nombre, apellido o documento" aria-label="Buscar apoderado" />
        <button type="submit" class="btn">Buscar</button>
      </form>

      <div class="card">
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Apoderado</th><th>Documento</th><th>Teléfono</th><th>Correo</th><th>Cuenta</th><th></th></tr></thead>
            <tbody>
              @for (a of apoderados(); track a.id) {
                <tr>
                  <td><strong>{{ nombre(a) }}</strong>@if (a.ocupacion) { <small class="muted"> · {{ a.ocupacion }}</small> }</td>
                  <td>{{ a.tipoDocumento ?? 'DNI' }} {{ a.numeroDocumento }}</td>
                  <td>{{ a.telefono || '—' }}</td>
                  <td>{{ a.email || '—' }}</td>
                  <td><span [class]="'badge ' + (a.usuarioId ? 'badge-ok' : 'badge-gray')">{{ a.usuarioId ? 'Con cuenta' : 'Sin cuenta' }}</span></td>
                  <td class="acciones">
                    <button type="button" class="btn btn-sm" (click)="verHijos(a)">Hijos</button>
                    <button type="button" class="btn btn-sm" (click)="editar(a)">Editar</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="6" class="vacio">{{ cargando() ? 'Cargando…' : 'No hay apoderados con esa búsqueda.' }}</td></tr>
              }
            </tbody>
          </table>
        </div>
        <div class="toolbar" style="padding: 12px 16px; justify-content: space-between">
          <span class="muted">{{ total() }} apoderados · página {{ pagina() + 1 }} de {{ paginas() }}</span>
          <span>
            <button type="button" class="btn btn-sm" [disabled]="pagina() === 0" (click)="irA(pagina() - 1)">Anterior</button>
            <button type="button" class="btn btn-sm" [disabled]="pagina() + 1 >= paginas()" (click)="irA(pagina() + 1)">Siguiente</button>
          </span>
        </div>
      </div>
    </div>

    <!-- Hijos del apoderado -->
    @if (paraHijos(); as a) {
      <app-modal [titulo]="'Hijos de ' + nombre(a)" [ancho]="560" (cerrar)="paraHijos.set(null)">
        @if (cargandoHijos()) { <p class="muted">Cargando…</p> }
        @else if (!hijos().length) { <p class="muted">Este apoderado no tiene alumnos vinculados.</p> }
        @else {
          <ul class="lista-hijos">
            @for (h of hijos(); track h.alumnoId) {
              <li>
                <span><strong>{{ h.nombreCompleto }}</strong> <small class="muted">{{ h.codigo }}{{ h.parentesco ? ' · ' + h.parentesco.toLowerCase() : '' }}</small></span>
                <span class="fila-der"><span class="badge">{{ h.estado }}</span> <a class="btn btn-sm" [routerLink]="['/alumnos', h.alumnoId]" (click)="paraHijos.set(null)">Ver expediente</a></span>
              </li>
            }
          </ul>
        }
        <ng-container footer><button type="button" class="btn" (click)="paraHijos.set(null)">Cerrar</button></ng-container>
      </app-modal>
    }

    <!-- Datos de contacto -->
    @if (editando(); as a) {
      <app-modal [titulo]="'Editar a ' + nombre(a)" [ancho]="560" (cerrar)="editando.set(null)">
        <form [formGroup]="form" (ngSubmit)="guardar()" id="form-apoderado" novalidate>
          <div class="form-grid">
            <div class="field"><label for="ap-nom">Nombres</label><input id="ap-nom" formControlName="nombres" /></div>
            <div class="field"><label for="ap-ape">Apellidos</label><input id="ap-ape" formControlName="apellidos" /></div>
            <div class="field"><label for="ap-tel">Teléfono</label><input id="ap-tel" formControlName="telefono" /></div>
            <div class="field"><label for="ap-tel2">Teléfono alterno</label><input id="ap-tel2" formControlName="telefonoAlterno" /></div>
            <div class="field full"><label for="ap-mail">Correo</label><input id="ap-mail" type="email" formControlName="email" />
              @if (form.controls.email.invalid) { <span class="error">Correo no válido.</span> }</div>
            <div class="field full"><label for="ap-dir">Dirección</label><input id="ap-dir" formControlName="direccion" /></div>
            <div class="field full"><label for="ap-ocu">Ocupación</label><input id="ap-ocu" formControlName="ocupacion" /></div>
          </div>
          <p class="muted" style="margin: 10px 0 0">El documento ({{ a.tipoDocumento ?? 'DNI' }} {{ a.numeroDocumento }}) no se cambia desde aquí.</p>
          @if (errorForm()) { <div class="aviso aviso-danger" style="margin-top: 12px" role="alert">{{ errorForm() }}</div> }
        </form>
        <ng-container footer>
          <button type="button" class="btn" (click)="editando.set(null)">Cancelar</button>
          <button type="submit" form="form-apoderado" class="btn btn-primary" [disabled]="guardando() || form.invalid">{{ guardando() ? 'Guardando…' : 'Guardar' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .lista-hijos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .lista-hijos li { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; }
    .lista-hijos small { margin-left: 6px; }
    .fila-der { display: inline-flex; align-items: center; gap: 8px; }
  `
})
export class ApoderadosComponent implements OnInit {
  private readonly api = inject(AlumnoService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly nombre = nombreApoderado;
  protected readonly apoderados = signal<Apoderado[]>([]);
  protected readonly total = signal(0);
  protected readonly paginas = signal(1);
  protected readonly pagina = signal(0);
  protected readonly cargando = signal(false);
  protected readonly filtro = this.fb.nonNullable.group({ q: '' });

  protected readonly paraHijos = signal<Apoderado | null>(null);
  protected readonly hijos = signal<Hijo[]>([]);
  protected readonly cargandoHijos = signal(false);

  protected readonly editando = signal<Apoderado | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    telefono: [''],
    telefonoAlterno: [''],
    email: ['', Validators.email],
    direccion: [''],
    ocupacion: ['']
  });

  ngOnInit(): void {
    this.cargar(0);
  }

  protected buscar(): void {
    this.cargar(0);
  }

  protected irA(p: number): void {
    if (p >= 0 && p < this.paginas()) this.cargar(p);
  }

  private cargar(pagina: number): void {
    this.cargando.set(true);
    this.api.buscarApoderados(this.filtro.getRawValue().q.trim(), pagina, 15).subscribe({
      next: p => {
        this.apoderados.set(p.contenido);
        this.total.set(p.totalElementos);
        this.paginas.set(Math.max(1, p.totalPaginas));
        this.pagina.set(p.pagina);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar la lista de apoderados.'));
      }
    });
  }

  protected verHijos(a: Apoderado): void {
    this.paraHijos.set(a);
    this.hijos.set([]);
    this.cargandoHijos.set(true);
    this.api.hijosDeApoderado(a.id).subscribe({
      next: h => { this.hijos.set(h); this.cargandoHijos.set(false); },
      error: e => { this.cargandoHijos.set(false); this.avisos.error(mensajeError(e, 'No se pudieron cargar los hijos.')); }
    });
  }

  protected editar(a: Apoderado): void {
    this.form.reset({
      nombres: a.nombres, apellidos: a.apellidos, telefono: a.telefono ?? '', telefonoAlterno: a.telefonoAlterno ?? '',
      email: a.email ?? '', direccion: a.direccion ?? '', ocupacion: a.ocupacion ?? ''
    });
    this.errorForm.set(null);
    this.editando.set(a);
  }

  protected guardar(): void {
    const a = this.editando();
    if (!a || this.form.invalid) return;
    const v = this.form.getRawValue();
    this.guardando.set(true);
    this.errorForm.set(null);
    this.api.actualizarApoderado(a.id, {
      tipoDocumento: a.tipoDocumento, numeroDocumento: a.numeroDocumento, nombres: v.nombres.trim(), apellidos: v.apellidos.trim(),
      telefono: v.telefono.trim() || undefined, telefonoAlterno: v.telefonoAlterno.trim() || undefined, email: v.email.trim() || undefined,
      direccion: v.direccion.trim() || undefined, ocupacion: v.ocupacion.trim() || undefined
    }).subscribe({
      next: () => {
        this.guardando.set(false);
        this.editando.set(null);
        this.avisos.success('Datos del apoderado actualizados.');
        this.cargar(this.pagina());
      },
      error: e => { this.guardando.set(false); this.errorForm.set(mensajeError(e)); }
    });
  }
}
