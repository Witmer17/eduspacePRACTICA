import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno, AlumnoResumen } from '../../core/models/alumno.model';
import { Colegio } from '../../core/models/planificacion.model';
import { NotificationService } from '../../core/services/notification.service';
import { mensajeError } from '../../core/utils/errores';
import { BuscadorAlumnoComponent } from '../../shared/components/buscador-alumno/buscador-alumno.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { DatosDocumento, Disponibilidad, TipoDocumento, armar, disponibilidad } from './documentos';
import { DocumentosDatosService } from './documentos-datos.service';

/**
 * Generador de documentos: se elige al alumno y se ofrecen los documentos que se pueden emitir con lo que ya existe en el sistema
 * (constancias de matrícula, de estudios y de no adeudo, ficha del alumno y estado de cuenta). Se ven en una hoja y se imprimen o se guardan como PDF.
 */
@Component({
  selector: 'app-documentos',
  imports: [BuscadorAlumnoComponent, PageHeaderComponent],
  template: `
    <div class="page">
      <app-page-header titulo="Documentos" subtitulo="Genera constancias y fichas con la información que ya existe del alumno. Se imprimen o se guardan como PDF." />

      <section class="card no-imprimir">
        <div class="card-body"><app-buscador-alumno [soloActivos]="false" (elegidoAlumno)="elegir($event)" /></div>
      </section>

      @if (!alumno() && !cargando()) {
        <div class="vacio-guia no-imprimir"><strong>Busca a un alumno</strong><span>Verás qué documentos se le pueden emitir y por qué no los que faltan.</span></div>
      }
      @if (cargando()) { <p class="muted no-imprimir">Reuniendo la información del alumno…</p> }

      @if (datos(); as d) {
        <section class="opciones no-imprimir" aria-label="Documentos disponibles">
          @for (o of opciones(); track o.tipo) {
            <article class="opcion" [class.apagada]="!o.disponible" [class.elegida]="actual() === o.tipo">
              <div>
                <h3>{{ o.titulo }}</h3>
                <p class="muted">{{ o.descripcion }}</p>
                @if (!o.disponible) { <p class="motivo">{{ o.motivo }}</p> }
              </div>
              <button type="button" class="btn btn-sm" [class.btn-primary]="o.disponible" [disabled]="!o.disponible" (click)="generar(o.tipo)">{{ actual() === o.tipo ? 'Ver de nuevo' : 'Generar' }}</button>
            </article>
          }
        </section>

        @if (documento(); as doc) {
          <div class="barra-doc no-imprimir">
            <strong>{{ doc.titulo }}</strong>
            <span class="muted">N.º {{ doc.numero }}</span>
            <span class="espacio"></span>
            <button type="button" class="btn" (click)="actual.set(null)">Cerrar vista</button>
            <button type="button" class="btn btn-primary" (click)="imprimir()">Imprimir / guardar como PDF</button>
          </div>

          <article class="hoja-documento" aria-label="Vista del documento">
            <header class="hoja-cab">
              <img src="/img/colegio-escudo.svg" alt="" class="hoja-escudo" />
              <div>
                <strong class="hoja-colegio">{{ d.colegio?.nombre ?? 'Colegio' }}</strong>
                @if (d.colegio?.lema) { <em>{{ d.colegio?.lema }}</em> }
                <small>{{ lineaColegio(d.colegio) }}</small>
              </div>
            </header>
            <h1 class="hoja-titulo">{{ doc.titulo }}</h1>
            <div class="hoja-num">N.º {{ doc.numero }}</div>
            <div class="hoja-cuerpo">
              @for (b of doc.bloques; track $index) {
                @switch (b.k) {
                  @case ('titulo') { <h2 class="hoja-sub">{{ b.texto }}</h2> }
                  @case ('parrafo') { <p [class.destacado]="b.destacado">{{ b.texto }}</p> }
                  @case ('datos') {
                    <dl class="hoja-datos">
                      @for (f of b.filas; track f[0]) { <div><dt>{{ f[0] }}</dt><dd>{{ f[1] }}</dd></div> }
                    </dl>
                  }
                  @case ('tabla') {
                    <table class="hoja-tabla">
                      <thead><tr>@for (c of b.columnas; track c) { <th>{{ c }}</th> }</tr></thead>
                      <tbody>
                        @for (fila of b.filas; track $index) { <tr>@for (celda of fila; track $index) { <td>{{ celda }}</td> }</tr> } @empty { <tr><td [attr.colspan]="b.columnas.length" class="vacio-celda">Sin registros.</td></tr> }
                      </tbody>
                    </table>
                  }
                }
              }
            </div>
            <footer class="hoja-pie">
              <p class="hoja-fecha">{{ doc.lugarYFecha }}</p>
              <div class="hoja-firma"><span class="linea"></span><strong>{{ doc.firma.nombre }}</strong><small>{{ doc.firma.cargo }}</small></div>
            </footer>
          </article>
        }
      }
    </div>
  `,
  styles: `
    .opciones { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 12px; }
    .opcion { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 16px; border: 1.5px solid var(--line-2); border-radius: 14px; background: var(--card); }
    .opcion h3 { margin: 0 0 2px; font-size: 1rem; }
    .opcion p { margin: 0; }
    .opcion.apagada { background: var(--bg); }
    .opcion.apagada h3 { color: var(--ink-2); }
    .opcion.elegida { border-color: var(--primary); box-shadow: inset 0 0 0 1px var(--primary); }
    .motivo { margin-top: 4px !important; font-size: .8rem; color: var(--warn); font-weight: 600; }
    .barra-doc { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .barra-doc .espacio { flex: 1; }

    /* La hoja: papel blanco con proporción de A4 */
    .hoja-documento { width: min(100%, 794px); min-height: 1000px; margin: 8px auto 24px; padding: 56px 64px; background: #fff; color: #1a1f2e; border: 1px solid var(--line); border-radius: 6px; box-shadow: 0 10px 30px -18px rgb(0 0 0 / .35); font-family: Georgia, 'Times New Roman', serif; line-height: 1.6; }
    .hoja-cab { display: flex; align-items: center; gap: 16px; padding-bottom: 14px; border-bottom: 2px solid #1a1f2e; }
    .hoja-escudo { width: 64px; height: 64px; }
    .hoja-cab div { display: flex; flex-direction: column; }
    .hoja-colegio { font-size: 1.25rem; letter-spacing: .02em; }
    .hoja-cab em { font-size: .85rem; color: #4a5266; }
    .hoja-cab small { font-size: .78rem; color: #4a5266; }
    .hoja-titulo { margin: 34px 0 4px; text-align: center; font-size: 1.6rem; text-transform: uppercase; letter-spacing: .08em; }
    .hoja-num { text-align: center; font-size: .85rem; color: #4a5266; margin-bottom: 26px; }
    .hoja-cuerpo p { margin: 0 0 14px; text-align: justify; font-size: 1.02rem; }
    .hoja-sub { margin: 22px 0 10px; font-size: 1.05rem; text-align: center; letter-spacing: .12em; }
    .hoja-datos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px 24px; margin: 6px 0 16px; }
    .hoja-datos div { display: flex; flex-direction: column; padding: 4px 0; border-bottom: 1px solid #e4e8f1; }
    .hoja-datos dt { font-size: .75rem; color: #4a5266; text-transform: uppercase; letter-spacing: .05em; }
    .hoja-datos dd { margin: 0; font-weight: 600; }
    .hoja-tabla { width: 100%; border-collapse: collapse; font-size: .85rem; margin-bottom: 16px; }
    .hoja-tabla th, .hoja-tabla td { padding: 6px 8px; border: 1px solid #cfd5e3; text-align: left; }
    .hoja-tabla th { background: #f1f4fa; font-size: .75rem; text-transform: uppercase; letter-spacing: .04em; }
    .vacio-celda { text-align: center !important; color: #4a5266; }
    .hoja-pie { margin-top: 64px; }
    .hoja-fecha { text-align: right; margin: 0 0 70px; }
    .hoja-firma { display: flex; flex-direction: column; align-items: center; width: 280px; margin: 0 auto; }
    .hoja-firma .linea { width: 100%; border-top: 1.5px solid #1a1f2e; margin-bottom: 6px; }
    .hoja-firma small { color: #4a5266; }
    @media (max-width: 720px) { .hoja-documento { padding: 28px 20px; min-height: 0; } .hoja-datos { grid-template-columns: 1fr; } }
  `
})
export class DocumentosComponent {
  private readonly datosSvc = inject(DocumentosDatosService);
  private readonly avisos = inject(NotificationService);
  private readonly ruta = inject(ActivatedRoute);

  protected readonly alumno = signal<Alumno | null>(null);
  protected readonly cargando = signal(false);
  protected readonly datos = signal<DatosDocumento | null>(null);
  protected readonly actual = signal<TipoDocumento | null>(null);

  protected readonly opciones = computed<Disponibilidad[]>(() => (this.datos() ? disponibilidad(this.datos()!) : []));
  protected readonly documento = computed(() => {
    const d = this.datos();
    const t = this.actual();
    return d && t ? armar(t, d) : null;
  });

  constructor() {
    // Desde «Expediente y documentos» de un alumno se llega con ?alumnoId=: se carga solo.
    const id = Number(this.ruta.snapshot.queryParamMap.get('alumnoId'));
    if (id) this.cargarPor(id);
  }

  protected elegir(a: AlumnoResumen | null): void {
    this.alumno.set(null);
    this.datos.set(null);
    this.actual.set(null);
    if (a) this.cargarPor(a.id);
  }

  private cargarPor(alumnoId: number): void {
    this.cargando.set(true);
    this.datosSvc.cargar(alumnoId).subscribe({
      next: d => {
        this.alumno.set(d.alumno);
        this.datos.set(d);
        this.cargando.set(false);
      },
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo reunir la información del alumno.'));
      }
    });
  }

  protected generar(t: TipoDocumento): void {
    // La fecha del documento es la de hoy, aunque la pantalla se haya dejado abierta.
    const d = this.datos();
    if (d) this.datos.set({ ...d, fecha: new Date() });
    this.actual.set(t);
    queueMicrotask(() => document.querySelector('.hoja-documento')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  protected imprimir(): void {
    window.print();
  }

  /** Una línea con lo que identifica al colegio: dirección, teléfono, correo, RUC. */
  protected lineaColegio(c: Colegio | null): string {
    if (!c) return '';
    return [[c.direccion, c.distrito].filter(Boolean).join(', '), c.telefono && `Tel. ${c.telefono}`, c.email, c.ruc && `RUC ${c.ruc}`].filter(Boolean).join(' · ');
  }
}
