import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/** Aviso de las pantallas que muestran información de un periodo cuando no hay ninguno activo (y por eso salen vacías). */
@Component({
  selector: 'app-sin-periodo-activo',
  imports: [RouterLink],
  template: `
    <div class="aviso aviso-warn sin-periodo" role="status">
      <div>
        <strong>No hay un periodo activo.</strong>
        <span> Esta pantalla muestra solo lo del periodo activo, así que por ahora no hay información para mostrar.</span>
      </div>
      @if (esAdmin()) { <a class="btn btn-sm btn-primary" routerLink="/apertura">Aperturar periodo</a> }
    </div>
  `,
  styles: `
    .sin-periodo { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
  `
})
export class SinPeriodoActivoComponent {
  protected readonly esAdmin = inject(AuthService).isAdmin;
}
