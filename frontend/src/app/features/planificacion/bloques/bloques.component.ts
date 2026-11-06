import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Bloque, BloqueRequest, Turno } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-bloques',
  imports: [ReactiveFormsModule, ModalComponent, PageHeaderComponent],
  templateUrl: './bloques.component.html'
})
export class BloquesComponent implements OnInit {
  private readonly api = inject(PlanificacionService);

  /** En planificación solo el ADMIN escribe (horarios, asignaciones y docentes también los edita SECRETARIA). */
  protected readonly puedeEditar = inject(AuthService).isAdmin;
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);
  private readonly fb = inject(FormBuilder);

  protected readonly bloques = signal<Bloque[]>([]);
  protected readonly cargando = signal(false);
  protected readonly abierto = signal(false);
  protected readonly editando = signal<Bloque | null>(null);
  protected readonly guardando = signal(false);
  protected readonly errorForm = signal<string | null>(null);
  protected readonly turno = this.fb.nonNullable.control<Turno | ''>('');

  protected readonly form = this.fb.nonNullable.group({
    turno: ['MANANA' as Turno, Validators.required],
    orden: [1, [Validators.required, Validators.min(1)]],
    horaInicio: ['08:00', Validators.required],
    horaFin: ['08:45', Validators.required],
    esReceso: [false]
  });

  // ---------------------------------------------------------- asistente de franjas
  protected readonly gen = this.fb.nonNullable.group({
    turno: ['MANANA' as Turno, Validators.required],
    inicio: ['08:00', Validators.required],
    duracion: [45, [Validators.required, Validators.min(10), Validators.max(120)]],
    hasta: ['12:00', Validators.required],
    recesoCada: [0, [Validators.min(0), Validators.max(10)]],
    recesoMin: [15, [Validators.min(5), Validators.max(60)]]
  });
  protected readonly generando = signal(false);
  protected readonly errorGen = signal<string | null>(null);

  /** Franjas que se crearían con los datos del asistente (la última clase no pasa de «hasta»). Se recalcula en cada cambio del formulario. */
  protected propuesta(): BloqueRequest[] {
    const v = this.gen.getRawValue();
    const ini = this.aMinutos(v.inicio);
    const fin = this.aMinutos(v.hasta);
    const out: BloqueRequest[] = [];
    if (v.inicio === '' || v.hasta === '' || fin <= ini || v.duracion < 10) return out;
    let cursor = ini;
    let clases = 0;
    let orden = 1;
    while (cursor + v.duracion <= fin) {
      out.push({ turno: v.turno, orden: orden++, horaInicio: this.aHora(cursor), horaFin: this.aHora(cursor + v.duracion), esReceso: false });
      cursor += v.duracion;
      clases++;
      if (v.recesoCada > 0 && clases % v.recesoCada === 0 && cursor + v.recesoMin <= fin) {
        out.push({ turno: v.turno, orden: orden++, horaInicio: this.aHora(cursor), horaFin: this.aHora(cursor + v.recesoMin), esReceso: true });
        cursor += v.recesoMin;
      }
    }
    return out;
  }

  /** El asistente solo crea franjas en un turno que todavía no tenga bloques (los que ya se usan en horarios no se pueden borrar). */
  protected turnoConBloques(): boolean {
    return this.bloques().some(b => b.turno === this.gen.controls.turno.value);
  }

  protected generarFranjas(): void {
    this.errorGen.set(null);
    if (this.gen.invalid) {
      this.gen.markAllAsTouched();
      this.errorGen.set('Revisa la duración (10 a 120 min) y las horas.');
      return;
    }
    const v = this.gen.getRawValue();
    if (this.aMinutos(v.hasta) <= this.aMinutos(v.inicio)) {
      this.errorGen.set('La hora límite debe ser posterior a la de inicio.');
      return;
    }
    const franjas = this.propuesta();
    if (franjas.length === 0) {
      this.errorGen.set('Con esa duración no entra ninguna clase antes de la hora límite.');
      return;
    }
    if (this.turnoConBloques()) {
      this.errorGen.set('Ese turno ya tiene bloques. Elimina los que no se usen o edítalos uno por uno.');
      return;
    }
    this.generando.set(true);
    forkJoin(franjas.map(b => this.api.crearBloque(b))).subscribe({
      next: () => {
        this.generando.set(false);
        this.avisos.success(`Se crearon ${franjas.length} franjas.`);
        this.cargar();
      },
      error: e => {
        this.generando.set(false);
        this.errorGen.set(mensajeError(e, 'No se pudieron crear las franjas.'));
        this.cargar();
      }
    });
  }

  private aMinutos(h: string): number {
    const [hh, mm] = h.split(':').map(Number);
    return (hh || 0) * 60 + (mm || 0);
  }

  private aHora(min: number): string {
    const hh = Math.floor(min / 60).toString().padStart(2, '0');
    const mm = (min % 60).toString().padStart(2, '0');
    return `${hh}:${mm}:00`;
  }

  ngOnInit(): void {
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.api.bloques(this.turno.value || undefined).subscribe({
      next: b => {
        this.bloques.set([...b].sort((x, y) => x.turno.localeCompare(y.turno) || x.orden - y.orden));
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar los bloques.'));
      }
    });
  }

  protected hora(h: string): string {
    return h.slice(0, 5);
  }

  protected nuevo(): void {
    const t = (this.turno.value || 'MANANA') as Turno;
    const ultimo = this.bloques().filter(b => b.turno === t).at(-1);
    this.form.reset({ turno: t, orden: (ultimo?.orden ?? 0) + 1, horaInicio: ultimo ? this.hora(ultimo.horaFin) : '08:00', horaFin: '', esReceso: false });
    this.editando.set(null);
    this.errorForm.set(null);
    this.abierto.set(true);
  }

  protected editar(b: Bloque): void {
    this.form.reset({ turno: b.turno, orden: b.orden, horaInicio: this.hora(b.horaInicio), horaFin: this.hora(b.horaFin), esReceso: b.esReceso });
    this.editando.set(b);
    this.errorForm.set(null);
    this.abierto.set(true);
  }

  protected cerrar(): void {
    this.abierto.set(false);
    this.editando.set(null);
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    if (v.horaFin <= v.horaInicio) {
      this.errorForm.set('La hora de fin debe ser posterior a la de inicio.');
      return;
    }
    const e = this.editando();
    this.guardando.set(true);
    (e ? this.api.actualizarBloque(e.id, v) : this.api.crearBloque(v)).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success(e ? 'Bloque actualizado.' : 'Bloque creado.');
        this.cerrar();
        this.cargar();
      },
      error: err => {
        this.guardando.set(false);
        this.errorForm.set(mensajeError(err));
      }
    });
  }

  protected async eliminar(b: Bloque): Promise<void> {
    if (!(await this.confirmacion.confirmar(`¿Eliminar el bloque ${b.orden} (${this.hora(b.horaInicio)}–${this.hora(b.horaFin)})?`, 'Eliminar', true))) return;
    this.api.eliminarBloque(b.id).subscribe({
      next: () => {
        this.avisos.success('Bloque eliminado.');
        this.cargar();
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }
}
