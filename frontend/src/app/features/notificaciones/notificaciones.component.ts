import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CANALES, CanalNotificacion, Notificacion, Preferencia, TIPOS_NOTIFICACION } from '../../core/models/notificacion.model';
import { NotificacionService } from '../../core/services/notificacion.service';
import { NotificationService } from '../../core/services/notification.service';
import { mensajeError } from '../../core/utils/errores';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

type Pestana = 'todas' | 'sinLeer' | 'preferencias';

@Component({
  selector: 'app-notificaciones',
  imports: [DatePipe, PageHeaderComponent],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent implements OnInit {
  private readonly api = inject(NotificacionService);
  private readonly avisos = inject(NotificationService);

  protected readonly canales = CANALES;
  protected readonly tipos = TIPOS_NOTIFICACION;
  protected readonly pestana = signal<Pestana>('todas');
  protected readonly lista = signal<Notificacion[]>([]);
  protected readonly total = signal(0);
  protected readonly paginas = signal(1);
  protected readonly pagina = signal(0);
  protected readonly cargando = signal(false);
  protected readonly noLeidas = this.api.noLeidas;

  /** `tipo|canal` → habilitada. Lo que no figura se considera habilitado (así lo trata notificaciones-ms). */
  protected readonly prefs = signal<Record<string, boolean>>({});
  protected readonly guardando = signal(false);

  ngOnInit(): void {
    this.cargar(0);
  }

  protected elegir(p: Pestana): void {
    this.pestana.set(p);
    if (p === 'preferencias') {
      this.cargarPreferencias();
    } else {
      this.cargar(0);
    }
  }

  protected irA(p: number): void {
    if (p >= 0 && p < this.paginas()) this.cargar(p);
  }

  private cargar(pagina: number): void {
    this.cargando.set(true);
    this.api.mias(this.pestana() === 'sinLeer' ? false : undefined, pagina).subscribe({
      next: p => {
        this.lista.set(p.contenido);
        this.total.set(p.totalElementos);
        this.paginas.set(Math.max(1, p.totalPaginas));
        this.pagina.set(p.pagina);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron cargar las notificaciones.'));
      }
    });
    this.api.actualizarConteo().subscribe({ error: () => undefined });
  }

  /** Subtítulo del encabezado: cuántos avisos faltan por leer. */
  protected readonly subtitulo = computed(() => {
    const n = this.noLeidas();
    return n === 0 ? 'No tienes avisos sin leer.' : `Tienes ${n} aviso${n === 1 ? '' : 's'} sin leer.`;
  });

  /** Un clic marca el aviso como leído. En «Sin leer» desaparece de la lista al instante. */
  protected marcar(n: Notificacion): void {
    if (n.leida) return;
    this.api.marcarLeida(n.id).subscribe({
      next: () => {
        if (this.pestana() === 'sinLeer') {
          this.lista.update(l => l.filter(x => x.id !== n.id));
          this.total.update(t => Math.max(0, t - 1));
          // si la página quedó vacía, pedir la anterior (o recargar esta) para no dejar huecos
          if (this.lista().length === 0) this.cargar(Math.max(0, this.pagina() - 1));
        } else {
          this.lista.update(l => l.map(x => (x.id === n.id ? { ...x, leida: true } : x)));
        }
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  protected leerTodas(): void {
    this.api.leerTodas().subscribe({
      next: () => {
        this.avisos.success('Todas las notificaciones quedaron como leídas.');
        this.cargar(0);
      },
      error: e => this.avisos.error(mensajeError(e))
    });
  }

  protected etiqueta(tipo: string): string {
    if (tipo === 'AVISO_MANUAL') return 'Aviso del colegio';
    return this.tipos.find(t => t.codigo === tipo)?.etiqueta ?? tipo.replaceAll('_', ' ').toLowerCase();
  }

  // --- preferencias ---
  private cargarPreferencias(): void {
    this.api.preferencias().subscribe({
      next: lista => {
        const mapa: Record<string, boolean> = {};
        for (const p of lista ?? []) mapa[`${p.tipo}|${p.canal}`] = p.habilitada;
        this.prefs.set(mapa);
      },
      error: e => this.avisos.error(mensajeError(e, 'No se pudieron cargar las preferencias.'))
    });
  }

  protected activa(tipo: string, canal: CanalNotificacion): boolean {
    return this.prefs()[`${tipo}|${canal}`] ?? true;
  }

  protected cambiar(tipo: string, canal: CanalNotificacion, valor: boolean): void {
    this.prefs.update(m => ({ ...m, [`${tipo}|${canal}`]: valor }));
  }

  protected guardarPreferencias(): void {
    const body: Preferencia[] = [];
    for (const t of this.tipos) {
      for (const canal of t.canales) {
        body.push({ tipo: t.codigo, canal, habilitada: this.activa(t.codigo, canal) });
      }
    }
    this.guardando.set(true);
    this.api.guardarPreferencias(body).subscribe({
      next: () => {
        this.guardando.set(false);
        this.avisos.success('Preferencias guardadas.');
      },
      error: e => {
        this.guardando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudieron guardar las preferencias.'));
      }
    });
  }
}
