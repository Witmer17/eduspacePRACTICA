import { Component, input } from '@angular/core';

/**
 * Portada de las pantallas de configuración: franja con el color de la pantalla (la clase `n-…` del contenedor), un ícono,
 * el título y una explicación corta. Las acciones (botones) se proyectan a la derecha.
 */
@Component({
  selector: 'app-config-hero',
  template: `
    <header class="hero">
      <span class="icono" aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path [attr.d]="icono()" /></svg>
      </span>
      <div class="textos">
        <span class="sobre">{{ sobre() }}</span>
        <h1>{{ titulo() }}</h1>
        @if (subtitulo()) { <p>{{ subtitulo() }}</p> }
      </div>
      <div class="acciones"><ng-content /></div>
    </header>
  `,
  styles: `
    .hero {
      position: relative; overflow: hidden; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; padding: 20px 24px; color: #fff;
      border-radius: 24px; background: linear-gradient(120deg, var(--nivel, #1d4ed8), var(--nivel-2, #38bdf8));
      box-shadow: 0 24px 40px -28px var(--nivel, #1d4ed8);
    }
    .hero::before { content: ''; position: absolute; right: -50px; top: -70px; width: 240px; height: 240px; border-radius: 50%; background: rgb(255 255 255 / .12); }
    .hero::after { content: ''; position: absolute; right: 140px; bottom: -90px; width: 170px; height: 170px; border-radius: 50%; background: rgb(255 255 255 / .08); }
    .hero > * { position: relative; z-index: 1; }
    .icono { flex: none; width: 64px; height: 64px; display: grid; place-items: center; border-radius: 20px; background: rgb(255 255 255 / .22); border: 2px solid rgb(255 255 255 / .5); }
    .textos { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 2px; }
    .sobre { font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; opacity: .85; }
    h1 { margin: 0; font-size: 1.7rem; font-weight: 900; letter-spacing: -.02em; line-height: 1.1; }
    p { margin: 4px 0 0; max-width: 62ch; font-size: .92rem; opacity: .92; }
    .acciones { display: flex; gap: 8px; flex-wrap: wrap; }
    .acciones:empty { display: none; }
    @media (max-width: 640px) { .hero { padding: 16px; } h1 { font-size: 1.4rem; } .icono { width: 52px; height: 52px; } }
  `
})
export class ConfigHeroComponent {
  readonly titulo = input.required<string>();
  readonly subtitulo = input('');
  /** Trazo SVG (24×24, estilo lineal). */
  readonly icono = input.required<string>();
  /** Texto pequeño sobre el título (el área de configuración). */
  readonly sobre = input('Configuración');
}
