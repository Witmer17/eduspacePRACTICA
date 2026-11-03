import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Colegio, ColegioRequest } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ConfigHeroComponent } from '../../../shared/components/config-hero/config-hero.component';
import { PabellonesComponent } from './pabellones.component';

/** Lo que identifica al colegio: nombre, códigos oficiales, dirección y contacto. Los modifica solo el administrador. */
@Component({
  selector: 'app-colegio-datos',
  imports: [ReactiveFormsModule, DatePipe, ConfigHeroComponent, PabellonesComponent],
  template: `
    <div class="page n-primaria">
      <app-config-hero titulo="Datos del colegio" subtitulo="Nombre, códigos oficiales, dirección y contacto de la institución." icono="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01" />

      @if (!puedeEditar()) {
        <div class="aviso aviso-warn">Solo el administrador puede modificar estos datos; tú puedes consultarlos.</div>
      }

      <form [formGroup]="form" (ngSubmit)="guardar()" id="form-colegio" novalidate>
        <div class="cfg-dos">
          <section class="cfg-bloque" aria-labelledby="c-id">
            <h2 id="c-id">Identidad</h2>
            <div class="form-grid">
              <div class="field full">
                <label for="c-nombre">Nombre oficial</label>
                <input id="c-nombre" formControlName="nombre" />
                @if (form.controls.nombre.touched && form.controls.nombre.invalid) { <span class="error">Obligatorio.</span> }
              </div>
              <div class="field">
                <label for="c-corto">Nombre corto</label>
                <input id="c-corto" formControlName="nombreCorto" placeholder="Horizonte del Valle" />
              </div>
              <div class="field">
                <label for="c-gestion">Gestión</label>
                <select id="c-gestion" formControlName="gestion">
                  <option value="PRIVADA">Privada</option>
                  <option value="PUBLICA">Pública</option>
                </select>
              </div>
              <div class="field full">
                <label for="c-lema">Lema</label>
                <input id="c-lema" formControlName="lema" />
              </div>
              <div class="field full">
                <label for="c-director">Director(a)</label>
                <input id="c-director" formControlName="director" />
              </div>
            </div>
          </section>

          <section class="cfg-bloque" aria-labelledby="c-cod">
            <h2 id="c-cod">Códigos oficiales</h2>
            <div class="form-grid">
              <div class="field">
                <label for="c-modular">Código modular</label>
                <input id="c-modular" formControlName="codigoModular" />
              </div>
              <div class="field">
                <label for="c-ruc">RUC</label>
                <input id="c-ruc" formControlName="ruc" inputmode="numeric" maxlength="11" />
                @if (form.controls.ruc.invalid) { <span class="error">Son 11 dígitos.</span> }
              </div>
              <div class="field full">
                <label for="c-ugel">UGEL</label>
                <input id="c-ugel" formControlName="ugel" placeholder="UGEL 03" />
              </div>
            </div>
          </section>

          <section class="cfg-bloque" aria-labelledby="c-dir">
            <h2 id="c-dir">Dirección</h2>
            <div class="form-grid">
              <div class="field full">
                <label for="c-direccion">Dirección</label>
                <input id="c-direccion" formControlName="direccion" />
              </div>
              <div class="field">
                <label for="c-distrito">Distrito</label>
                <input id="c-distrito" formControlName="distrito" />
              </div>
              <div class="field">
                <label for="c-provincia">Provincia</label>
                <input id="c-provincia" formControlName="provincia" />
              </div>
              <div class="field full">
                <label for="c-depto">Departamento</label>
                <input id="c-depto" formControlName="departamento" />
              </div>
            </div>
          </section>

          <section class="cfg-bloque" aria-labelledby="c-con">
            <h2 id="c-con">Contacto</h2>
            <div class="form-grid">
              <div class="field full">
                <label for="c-tel">Teléfono</label>
                <input id="c-tel" formControlName="telefono" />
              </div>
              <div class="field full">
                <label for="c-email">Correo</label>
                <input id="c-email" type="email" formControlName="email" />
                @if (form.controls.email.invalid) { <span class="error">Correo no válido.</span> }
              </div>
              <div class="field full">
                <label for="c-web">Sitio web</label>
                <input id="c-web" formControlName="sitioWeb" placeholder="https://…" />
              </div>
            </div>
          </section>
        </div>

        @if (error()) { <div class="aviso aviso-danger" style="margin-top: 14px" role="alert">{{ error() }}</div> }
        @if (puedeEditar()) {
          <div class="pie">
            <span class="muted">@if (actualizado()) { Última actualización: {{ actualizado() | date: 'dd/MM/yyyy HH:mm' }} }</span>
            <button type="submit" class="btn btn-primary" [disabled]="guardando() || cargando()">{{ guardando() ? 'Guardando…' : 'Guardar cambios' }}</button>
          </div>
        }
      </form>

      <!-- Pabellones y aulas: el nombre lo decide el usuario y declara cuántas aulas tiene cada uno -->
      <app-pabellones />
    </div>
  `,
  styles: `
    .pie { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 16px; }
  `
})
export class ColegioDatosComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly puedeEditar = inject(AuthService).isAdmin;
  protected readonly cargando = signal(true);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly actualizado = signal<string | undefined>(undefined);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    nombreCorto: [''],
    lema: [''],
    gestion: ['PRIVADA' as Colegio['gestion']],
    director: [''],
    codigoModular: [''],
    ruc: ['', Validators.pattern(/^(\d{11})?$/)],
    ugel: [''],
    direccion: [''],
    distrito: [''],
    provincia: [''],
    departamento: [''],
    telefono: [''],
    email: ['', Validators.email],
    sitioWeb: ['']
  });

  ngOnInit(): void {
    if (!this.puedeEditar()) this.form.disable();
    this.api.colegio().subscribe({
      next: c => {
        this.form.patchValue({ ...vacios(), ...quitarNulos(c) });
        this.actualizado.set(c.actualizadoEn);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los datos del colegio.'));
      }
    });
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Lo que se deja vacío se guarda como «sin dato»: el servidor valida el RUC y el correo solo si vienen.
    const v = this.form.getRawValue();
    const body = Object.fromEntries(Object.entries(v).map(([k, valor]) => [k, typeof valor === 'string' && valor.trim() === '' ? undefined : typeof valor === 'string' ? valor.trim() : valor])) as unknown as ColegioRequest;
    this.guardando.set(true);
    this.error.set(null);
    this.api.guardarColegio(body).subscribe({
      next: c => {
        this.guardando.set(false);
        this.actualizado.set(c.actualizadoEn);
        this.avisos.success('Datos del colegio guardados.');
      },
      error: e => {
        this.guardando.set(false);
        this.error.set(mensajeError(e));
      }
    });
  }
}

/** Valores vacíos de todos los campos: lo que el servidor no devuelve (nulo) se muestra como campo en blanco. */
function vacios(): Record<string, string> {
  return { nombreCorto: '', lema: '', director: '', codigoModular: '', ruc: '', ugel: '', direccion: '', distrito: '', provincia: '', departamento: '', telefono: '', email: '', sitioWeb: '' };
}

function quitarNulos(c: Colegio): Partial<Colegio> {
  return Object.fromEntries(Object.entries(c).filter(([, v]) => v !== null && v !== undefined && !(v === ''))) as Partial<Colegio>;
}
