import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Anio, Aula, GradoOferta, Pabellon, Seccion, Turno } from '../../../core/models/planificacion.model';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlanificacionService } from '../../../core/services/planificacion.service';
import { mensajeError } from '../../../core/utils/errores';
import { ConfigHeroComponent } from '../../../shared/components/config-hero/config-hero.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { claseNivel } from '../estructura/nivel-estilo';

const clave = (g: Pick<GradoOferta, 'nivelCodigo' | 'numero'>): string => `${g.nivelCodigo}:${g.numero}`;

/** Lo que va en el emblema de un grado de la oferta: la edad en Inicial y el número de grado en el resto. */
export const emblemaOferta = (g: Pick<GradoOferta, 'nivelCodigo' | 'numero'>): string => (g.nivelCodigo === 'INICIAL' ? String(g.numero + 2) : `${g.numero}°`);

/** ¿Es el mismo conjunto de grados elegidos? */
export const mismoConjunto = (a: ReadonlySet<string>, b: ReadonlySet<string>): boolean => a.size === b.size && [...a].every(x => b.has(x));

/** Cómo se establece un grado nuevo: cuántas secciones nacen con él, en qué turno, con cuántas vacantes y en qué aula cada una. */
export interface ConfigGrado {
  secciones: number;
  turno: Turno;
  capacidad: number;
  /** Aula de cada sección, en orden (A, B, C…); 0 o ausente = sin aula por ahora. */
  aulas: number[];
}

/** Un aula que se puede ofrecer a una sección y, si no se puede usar, por qué. */
export interface OpcionAula {
  aula: Aula;
  disponible: boolean;
  motivo?: string;
}

/**
 * Las aulas que se pueden elegir para una sección nueva. Solo aulas activas; si se elige un pabellón (`pabellonId` > 0), solo las suyas.
 * Una aula no está disponible si no alcanza para las vacantes, si ya la usa otra sección en ese turno o si ya se eligió para otra sección del mismo grado.
 */
export function opcionesAula(
  aulas: readonly Aula[],
  p: { pabellonId: number; capacidad: number; ocupadas: ReadonlySet<number>; propias: readonly number[]; actual: number }
): OpcionAula[] {
  return aulas
    .filter(a => a.activo && (p.pabellonId <= 0 || a.pabellonId === p.pabellonId))
    .sort((a, b) => a.codigo.localeCompare(b.codigo, 'es', { numeric: true }))
    .map(aula => {
      if (aula.id === p.actual) return { aula, disponible: true };
      if (aula.capacidad < p.capacidad) return { aula, disponible: false, motivo: `no alcanza (cap. ${aula.capacidad})` };
      if (p.ocupadas.has(aula.id)) return { aula, disponible: false, motivo: 'ya la usa otra sección en ese turno' };
      if (p.propias.includes(aula.id)) return { aula, disponible: false, motivo: 'elegida para otra sección' };
      return { aula, disponible: true };
    });
}

export const MAX_SECCIONES = 8;

/** Una fila de la tabla «Seleccionar todos»: un grado con la cantidad de secciones que se le va a crear. */
export interface FilaTodos {
  clave: string;
  nivelCodigo: string;
  numero: number;
  nombre: string;
  nivel: string;
  /** Ya tiene secciones o cursos: no se toca. */
  fija: boolean;
  detalle: string;
  incluir: boolean;
  secciones: number;
  turno: Turno;
  capacidad: number;
}

/** Las filas de la tabla: todos los grados marcados de entrada (menos los fijos), con lo que ya se había establecido o los valores por defecto. */
export function filasParaTodos(oferta: readonly GradoOferta[], elegidos: ReadonlySet<string>, configs: Readonly<Record<string, ConfigGrado>>): FilaTodos[] {
  return oferta.map(g => {
    const k = clave(g);
    const c = configs[k];
    const fija = g.enUso && elegidos.has(k);
    return {
      clave: k, nivelCodigo: g.nivelCodigo, numero: g.numero, nombre: g.nombre, nivel: g.nivelNombre, fija, detalle: g.detalleUso ?? '',
      incluir: !fija, secciones: c?.secciones ?? 1, turno: c?.turno ?? 'MANANA', capacidad: c?.capacidad ?? capacidadSugerida(g.nivelCodigo)
    };
  });
}

/** ¿Los números de la fila sirven? (secciones de 0 a {@link MAX_SECCIONES}, vacantes de 1 a 60). */
export const filaValida = (f: Pick<FilaTodos, 'secciones' | 'capacidad'>): boolean =>
  Number.isInteger(f.secciones) && f.secciones >= 0 && f.secciones <= MAX_SECCIONES && Number.isInteger(f.capacidad) && f.capacidad >= 1 && f.capacidad <= 60;

/** Cuántos grados se aplican, cuántas secciones nuevas y cuántas vacantes sumarán (solo las filas marcadas y no fijas). */
export function totalesTodos(filas: readonly FilaTodos[]): { grados: number; secciones: number; vacantes: number } {
  const marcadas = filas.filter(f => f.incluir && !f.fija && filaValida(f));
  return { grados: filas.filter(f => f.incluir && !f.fija).length, secciones: marcadas.reduce((t, f) => t + f.secciones, 0), vacantes: marcadas.reduce((t, f) => t + f.secciones * f.capacidad, 0) };
}

/** Nombres de las secciones de un grado: A, B, C… (hasta {@link MAX_SECCIONES}). */
export const nombresSecciones = (cantidad: number): string[] =>
  Array.from({ length: Math.min(Math.max(Math.trunc(cantidad) || 0, 0), MAX_SECCIONES) }, (_, i) => String.fromCharCode(65 + i));

/** Copia de la lista con la posición `i` cambiada (rellena con 0 las posiciones intermedias que falten). */
export function reemplazar(lista: readonly number[], i: number, valor: number): number[] {
  const copia = Array.from({ length: Math.max(lista.length, i + 1) }, (_, j) => lista[j] ?? 0);
  copia[i] = valor;
  return copia;
}

/** Vacantes por sección con las que se propone empezar: Inicial agrupa menos niños. */
export const capacidadSugerida = (nivelCodigo: string): number => (nivelCodigo === 'INICIAL' ? 20 : 30);

/**
 * Texto corto de lo que se creará con un grado: «2 secciones (A, B) · Mañana · 30 vacantes».
 * Con la lista de aulas, añade cuál tiene cada sección: «· A: PRI-1A (pab. A), B: sin aula».
 */
export function resumenConfig(c: Pick<ConfigGrado, 'secciones' | 'turno' | 'capacidad'> & { aulas?: number[] }, aulas: readonly Aula[] = []): string {
  const n = nombresSecciones(c.secciones);
  const turno = c.turno === 'MANANA' ? 'Mañana' : 'Tarde';
  if (n.length === 0) return 'Solo el grado, sin secciones';
  const base = `${n.length} ${n.length === 1 ? 'sección' : 'secciones'} (${n.join(', ')}) · ${turno} · ${c.capacidad} vacantes`;
  if (!aulas.length) return base;
  const detalle = n.map((nombre, i) => {
    const a = aulas.find(x => x.id === c.aulas?.[i]);
    return `${nombre}: ${a ? a.codigo + (a.pabellonNombre ? ` (pab. ${a.pabellonNombre})` : '') : 'sin aula'}`;
  });
  return `${base} · ${detalle.join(', ')}`;
}

/**
 * Los grados que ofrece el colegio. Se muestran los 14 posibles (Inicial de 3 a 5 años, Primaria de 1.° a 6.° y Secundaria de 1.° a 5.°)
 * con los que ya están en uso marcados. Un grado con secciones o cursos en su malla no se puede quitar.
 * Al elegir un grado nuevo se abre un cuadro para establecerlo (secciones, turno y vacantes); se crea todo al guardar.
 */
@Component({
  selector: 'app-grados-oferta',
  imports: [ReactiveFormsModule, RouterLink, ConfigHeroComponent, ModalComponent],
  template: `
    <div class="page n-secundaria">
      <app-config-hero titulo="Niveles y grados" subtitulo="Elige los grados que ofrece el colegio. Al elegir uno nuevo se establece con sus secciones. Los que ya tienen secciones o cursos no se pueden quitar."
                       icono="M3 21h18M6 21V10l6-5 6 5v11M10 21v-6h4v6">
        @if (puedeEditar()) {
          <button type="button" class="btn" [disabled]="bloqueado() || guardando()" (click)="abrirTodos()" title="Elige todos los grados de una vez y asigna cuántas secciones tendrá cada uno">Seleccionar todos…</button>
          <button type="button" class="btn" [disabled]="!hayCambios() || guardando()" (click)="deshacer()">Deshacer</button>
          <button type="button" class="btn btn-primary" [disabled]="bloqueado() || !hayCambios() || guardando() || elegidos().size === 0" (click)="guardar()">
            {{ guardando() ? 'Guardando…' : 'Guardar cambios' }}
          </button>
        }
      </app-config-hero>

      @if (!puedeEditar()) {
        <div class="aviso aviso-warn">Solo el administrador puede modificar los grados; tú puedes consultarlos.</div>
      }

      <!-- Sin periodo activo, todos los grados salen desactivados: para activarlos primero se inicia un periodo nuevo -->
      @if (bloqueado()) {
        <div class="aviso aviso-warn sin-periodo-grados" role="status">
          <div><strong>No hay un periodo activo.</strong> Por eso todos los niveles y grados aparecen desactivados. Para activarlos, primero inicia un nuevo periodo: el asistente de apertura te deja elegir los grados y sus secciones.</div>
          @if (puedeEditar()) { <a class="btn btn-sm btn-primary" routerLink="/apertura" [queryParams]="{ asistente: 1 }">Iniciar nuevo periodo</a> }
        </div>
      }

      <div class="resumen">
        <strong>{{ contados() }}</strong> de {{ oferta().length }} grados elegidos
        @if (hayCambios()) { <span class="badge badge-warn">Cambios sin guardar</span> }
        @if (cargando()) { <span class="muted">Cargando…</span> }
      </div>
      @if (error()) { <div class="aviso aviso-danger" role="alert">{{ error() }}</div> }

      <div class="niveles">
        @for (n of niveles(); track n.codigo) {
          <section [class]="'cfg-bloque ' + n.clase" [attr.aria-label]="n.nombre">
            <div class="nivel-cab">
              <h2>{{ n.nombre }}</h2>
              <span class="cuenta">{{ n.elegidos }} de {{ n.grados.length }}</span>
            </div>
            @if (puedeEditar() && !bloqueado()) {
              <div class="atajos">
                <button type="button" class="enlace" (click)="marcarNivel(n.codigo, true)">Elegir todos</button>
                <button type="button" class="enlace" (click)="marcarNivel(n.codigo, false)">Quitar los libres</button>
              </div>
            }
            <div class="tiles" role="group" [attr.aria-label]="'Grados de ' + n.nombre">
              @for (g of n.grados; track g.numero) {
                <button type="button" class="tile" role="checkbox" [class.on]="estaElegido(g)" [class.fijo]="g.enUso && estaElegido(g)"
                        [attr.aria-checked]="estaElegido(g)" [disabled]="bloqueado() || !puedeEditar() || (g.enUso && estaElegido(g))" (click)="alternar(g)">
                  <span class="emblema" aria-hidden="true">{{ emblema(g) }}</span>
                  <span class="texto">
                    <strong>{{ g.nombre }}</strong>
                    @if (g.enUso && g.detalleUso) { <small>En uso: {{ g.detalleUso }}</small> }
                    @else if (configDe(g); as c) { <small class="nuevo">{{ resumen(c, aulas()) }}</small> }
                    @else if (estaElegido(g) && !g.gradoId) { <small>Se creará al guardar</small> }
                    @else if (bloqueado()) { <small>Desactivado: sin periodo activo</small> }
                    @else if (!estaElegido(g) && puedeEditar()) { <small>Toca para establecerlo</small> }
                  </span>
                  <span class="marca" aria-hidden="true">@if (g.enUso && estaElegido(g)) { 🔒 } @else if (estaElegido(g)) { ✓ }</span>
                </button>
              }
            </div>
          </section>
        }
      </div>
    </div>

    <!-- Seleccionar todos los grados de una vez, con la cantidad de secciones de cada uno en una tabla -->
    @if (todosAbierto()) {
      <app-modal titulo="Seleccionar todos los grados" [ancho]="820" (cerrar)="todosAbierto.set(false)">
        <p style="margin: 0 0 12px">Marca los grados que se ofrecen y escribe cuántas secciones tendrá cada uno (se nombran A, B, C…). Las aulas se asignan después, en Estructura académica. Los grados que ya tienen secciones o cursos quedan fijos.</p>
        <div class="aplicar-todos">
          <strong>Para todos los marcados:</strong>
          <label>Secciones <input type="number" min="0" [max]="maxSecciones" [value]="masivo().secciones" (input)="cambiarMasivo('secciones', +$any($event.target).value)" aria-label="Secciones para todos" /></label>
          <label>Turno
            <select [value]="masivo().turno" (change)="cambiarMasivo('turno', $any($event.target).value)" aria-label="Turno para todos"><option value="MANANA">Mañana</option><option value="TARDE">Tarde</option></select>
          </label>
          <label>Vacantes <input type="number" min="1" max="60" [value]="masivo().capacidad" (input)="cambiarMasivo('capacidad', +$any($event.target).value)" aria-label="Vacantes para todos" /></label>
          <button type="button" class="btn btn-sm" (click)="aplicarMasivo()">Aplicar a los marcados</button>
        </div>
        <div class="tabla-todos-wrap">
          <table class="tabla-todos">
            <thead>
              <tr>
                <th><input type="checkbox" [checked]="todasMarcadas()" (change)="marcarTodasFilas($any($event.target).checked)" aria-label="Marcar todos los grados" /></th>
                <th>Grado</th><th>Secciones</th><th>Turno</th><th>Vacantes</th><th>Vacantes en total</th>
              </tr>
            </thead>
            <tbody>
              @for (f of filasTodos(); track f.clave) {
                <tr [class.fija]="f.fija" [class.apagada]="!f.incluir">
                  <td><input type="checkbox" [checked]="f.incluir" [disabled]="f.fija" (change)="cambiarFila(f.clave, { incluir: $any($event.target).checked })" [attr.aria-label]="'Incluir ' + f.nombre" /></td>
                  <td><strong>{{ f.nombre }}</strong> <small class="muted">{{ f.nivel }}</small>@if (f.fija) { <small class="muted"> · ya establecido {{ f.detalle ? '(' + f.detalle + ')' : '' }}</small> }</td>
                  <td><input type="number" min="0" [max]="maxSecciones" [value]="f.secciones" [disabled]="f.fija || !f.incluir" (input)="cambiarFila(f.clave, { secciones: +$any($event.target).value })" [attr.aria-label]="'Secciones de ' + f.nombre" /></td>
                  <td>
                    <select [value]="f.turno" [disabled]="f.fija || !f.incluir" (change)="cambiarFila(f.clave, { turno: $any($event.target).value })" [attr.aria-label]="'Turno de ' + f.nombre"><option value="MANANA">Mañana</option><option value="TARDE">Tarde</option></select>
                  </td>
                  <td><input type="number" min="1" max="60" [value]="f.capacidad" [disabled]="f.fija || !f.incluir" (input)="cambiarFila(f.clave, { capacidad: +$any($event.target).value })" [attr.aria-label]="'Vacantes de ' + f.nombre" /></td>
                  <td class="num">{{ f.fija || !f.incluir ? '—' : f.secciones * f.capacidad }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="resumen-todos"><strong>{{ marcadasTodos() }}</strong> grados · <strong>{{ seccionesTodos() }}</strong> secciones · <strong>{{ vacantesTodos() }}</strong> vacantes</p>
        @if (hayInvalidasTodos()) { <div class="aviso aviso-danger" role="alert">Revisa los números: las secciones van de 0 a {{ maxSecciones }} y las vacantes de 1 a 60.</div> }
        <ng-container footer>
          <button type="button" class="btn" (click)="todosAbierto.set(false)">Cancelar</button>
          <button type="button" class="btn btn-primary" [disabled]="hayInvalidasTodos()" (click)="aceptarTodos()">Aplicar a {{ marcadasTodos() }} {{ marcadasTodos() === 1 ? 'grado' : 'grados' }}</button>
        </ng-container>
      </app-modal>
    }

    <!-- Establecer un grado nuevo: secciones, turno y vacantes -->
    @if (modal(); as g) {
      <app-modal [titulo]="'Establecer ' + g.nombre" [ancho]="640" (cerrar)="cerrarModal()">
        <div [class]="'ficha ' + claseNivel(g.nivelCodigo)">
          <span class="emblema-grande" aria-hidden="true">{{ emblema(g) }}</span>
          <div>
            <strong>{{ g.nombre }}</strong>
            <span class="muted">{{ g.nivelNombre }}</span>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="aceptarModal()" id="form-grado-nuevo" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="gn-sec">Secciones</label>
              <input id="gn-sec" type="number" min="0" [max]="maxSecciones" formControlName="secciones" />
              <span class="muted">De 0 a {{ maxSecciones }}. Se nombran A, B, C…</span>
            </div>
            <div class="field">
              <label for="gn-cap">Vacantes por sección</label>
              <input id="gn-cap" type="number" min="1" max="60" formControlName="capacidad" />
              @if (form.controls.capacidad.invalid) { <span class="error">Entre 1 y 60.</span> }
            </div>
            <div class="field full">
              <label for="gn-turno">Turno</label>
              <select id="gn-turno" formControlName="turno">
                <option value="MANANA">Mañana</option>
                <option value="TARDE">Tarde</option>
              </select>
            </div>
          </div>

          @if (nombresModal().length) {
            <div class="asignacion">
              <h3>Aula de cada sección</h3>
              @for (nombre of nombresModal(); track nombre; let i = $index) {
                <div class="fila-aula">
                  <span class="burbuja" aria-hidden="true">{{ nombre }}</span>
                  <div class="field">
                    <label [for]="'gn-pab-' + i">Pabellón</label>
                    <select [id]="'gn-pab-' + i" (change)="elegirPabellon(i, +$any($event.target).value)">
                      <option value="0" [selected]="!pabModal()[i]">Todos</option>
                      @for (p of pabellones(); track p.id) { <option [value]="p.id" [selected]="pabModal()[i] === p.id">Pabellón {{ p.nombre }}</option> }
                    </select>
                  </div>
                  <div class="field">
                    <label [for]="'gn-aula-' + i">Aula de la sección {{ nombre }}</label>
                    <select [id]="'gn-aula-' + i" (change)="elegirAula(i, +$any($event.target).value)">
                      <option value="0" [selected]="!aulasModal()[i]">Sin aula por ahora</option>
                      @for (o of opciones(i); track o.aula.id) {
                        <option [value]="o.aula.id" [disabled]="!o.disponible" [selected]="aulasModal()[i] === o.aula.id">{{ o.aula.codigo }} · cap. {{ o.aula.capacidad }}{{ o.motivo ? ' — ' + o.motivo : '' }}</option>
                      }
                    </select>
                  </div>
                </div>
                @if ((pabModal()[i] ?? 0) > 0 && !opciones(i).length) {
                  <p class="aviso aviso-warn sin-aulas">El pabellón {{ nombrePabellon(pabModal()[i]) }} aún no tiene aulas creadas.
                    <a routerLink="/configuracion/colegio" (click)="cerrarModal()">Créalas en Datos del colegio → Pabellones</a> («Crear las aulas») y vuelve.</p>
                } @else if ((pabModal()[i] ?? 0) > 0 && !opciones(i).some(o => o.disponible)) {
                  <p class="aviso aviso-warn sin-aulas">Ninguna aula del pabellón {{ nombrePabellon(pabModal()[i]) }} está libre para esta sección: no alcanzan para las vacantes o ya las usa otra sección en ese turno.</p>
                }
              }
              @if (!aulas().length) {
                <p class="muted" style="margin: 6px 0 0">Aún no hay aulas registradas: créalas en Estructura académica → Aulas físicas y vuelve a elegirlas.</p>
              } @else if (!pabellones().length) {
                <p class="muted" style="margin: 6px 0 0">Para filtrar por pabellón, créalos en Configuración → Datos del colegio.</p>
              }
            </div>
          }

          <div class="vista-previa" aria-live="polite">
            <span class="muted">Al guardar se creará</span>
            <strong>{{ vistaPrevia() }}</strong>
            @if (!anioActivo()) { <span class="aviso aviso-warn">No hay un año académico activo: se creará el grado, y las secciones podrás agregarlas cuando actives uno.</span> }
          </div>
          <p class="muted" style="margin: 10px 0 0">Las aulas y los cursos del grado se asignan después, en Estructura académica.</p>
        </form>

        <ng-container footer>
          @if (modalPendiente()) { <button type="button" class="btn btn-danger" style="margin-right: auto" (click)="quitarDelModal()">Quitar grado</button> }
          <button type="button" class="btn" (click)="cerrarModal()">Cancelar</button>
          <button type="submit" form="form-grado-nuevo" class="btn btn-primary">{{ modalPendiente() ? 'Actualizar' : 'Elegir este grado' }}</button>
        </ng-container>
      </app-modal>
    }
  `,
  styles: `
    .sin-periodo-grados { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
    .tile:disabled:not(.on) { opacity: .6; }
    .aplicar-todos { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 10px 12px; margin-bottom: 12px; border-radius: 12px; background: var(--nivel-suave); font-size: .85rem; }
    .aplicar-todos label { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
    .aplicar-todos input { width: 72px; }
    .tabla-todos-wrap { max-height: 48vh; overflow: auto; border: 1px solid var(--line); border-radius: 12px; }
    .tabla-todos { width: 100%; border-collapse: collapse; font-size: .88rem; }
    .tabla-todos th { position: sticky; top: 0; background: var(--card); text-align: left; padding: 8px 10px; font-size: .74rem; text-transform: uppercase; letter-spacing: .05em; color: var(--ink-2); border-bottom: 1px solid var(--line); }
    .tabla-todos td { padding: 6px 10px; border-top: 1px solid var(--line); }
    .tabla-todos td input[type=number] { width: 70px; }
    .tabla-todos td small { margin-left: 6px; }
    .tabla-todos tr.fija { background: var(--bg); }
    .tabla-todos tr.apagada td:not(:first-child):not(:nth-child(2)) { opacity: .5; }
    .tabla-todos .num { text-align: right; font-weight: 700; }
    .resumen-todos { margin: 10px 0 0; }
    .resumen { display: flex; align-items: center; gap: 12px; font-size: .95rem; }
    .resumen strong { font-size: 1.4rem; }
    .niveles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: start; }
    .nivel-cab { display: flex; justify-content: space-between; align-items: baseline; }
    .nivel-cab h2 { margin: 0 0 6px; font-size: 1.05rem; font-weight: 800; color: var(--nivel); }
    .cuenta { font-size: .8rem; font-weight: 700; color: var(--ink-2); }
    .atajos { display: flex; gap: 14px; margin-bottom: 10px; }
    .enlace { border: 0; background: none; padding: 0; font: inherit; font-size: .8rem; font-weight: 600; color: var(--nivel); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
    .tiles { display: flex; flex-direction: column; gap: 8px; }
    .tile {
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; text-align: left; font: inherit; color: inherit; cursor: pointer;
      background: var(--card); border: 1.5px solid var(--line-2); border-radius: 14px; transition: border-color .15s, background .15s, box-shadow .15s;
    }
    .tile:hover:not(:disabled) { border-color: var(--nivel); }
    .tile:focus-visible { outline: 2px solid var(--nivel); outline-offset: 2px; }
    .tile.on { border-color: var(--nivel); background: var(--nivel-suave); box-shadow: inset 4px 0 0 var(--nivel); }
    .tile:disabled { cursor: default; }
    .tile.fijo { opacity: .95; }
    .emblema { flex: none; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 13px; background: var(--line); color: var(--ink-2); font-weight: 900; font-size: 1.1rem; }
    .tile.on .emblema { background: linear-gradient(135deg, var(--nivel), var(--nivel-2)); color: #fff; }
    .texto { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .texto small { color: var(--ink-2); font-size: .74rem; }
    .texto small.nuevo { color: var(--nivel); font-weight: 600; }
    .marca { flex: none; width: 24px; text-align: center; font-weight: 800; color: var(--nivel); }
    .ficha { display: flex; align-items: center; gap: 14px; padding: 12px 14px; margin-bottom: 16px; border-radius: 16px; background: var(--nivel-suave); }
    .ficha strong { display: block; font-size: 1.1rem; }
    .emblema-grande { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 18px; background: linear-gradient(135deg, var(--nivel), var(--nivel-2)); color: #fff; font-weight: 900; font-size: 1.5rem; }
    .asignacion { margin-top: 16px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: var(--bg); }
    .asignacion h3 { margin: 0 0 8px; font-size: .78rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--nivel); }
    .fila-aula { display: grid; grid-template-columns: 36px minmax(0, 1fr) minmax(0, 1.5fr); gap: 10px; align-items: end; padding: 6px 0; }
    .fila-aula .burbuja { width: 34px; height: 34px; display: grid; place-items: center; margin-bottom: 4px; border-radius: 50%; background: var(--nivel); color: #fff; font-weight: 800; }
    .fila-aula .field label { font-size: .74rem; }
    .sin-aulas { margin: 2px 0 6px; font-size: .8rem; }
    @media (max-width: 560px) { .fila-aula { grid-template-columns: 36px 1fr; } .fila-aula .field:last-child { grid-column: 1 / -1; } }
    .vista-previa { display: flex; flex-direction: column; gap: 4px; margin-top: 16px; padding: 12px 14px; border-radius: 12px; border: 1.5px dashed var(--line-2); }
    .vista-previa strong { color: var(--ink); }
    @media (max-width: 1100px) { .niveles { grid-template-columns: minmax(0, 1fr); } }
  `
})
export class GradosOfertaComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly avisos = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  protected readonly puedeEditar = inject(AuthService).isAdmin;
  protected readonly cargando = signal(true);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly oferta = signal<GradoOferta[]>([]);
  protected readonly elegidos = signal<ReadonlySet<string>>(new Set());
  private readonly original = signal<ReadonlySet<string>>(new Set());
  protected readonly anioActivo = signal<Anio | null>(null);
  /** Ya se consultaron los años (para no avisar «sin periodo activo» antes de saberlo). */
  private readonly periodoListo = signal(false);
  /** Sin periodo activo, los niveles y grados salen desactivados y no se pueden activar: antes hay que iniciar un periodo nuevo. */
  protected readonly bloqueado = computed(() => this.periodoListo() && !this.anioActivo());
  /** Cuántos grados se ven elegidos (con el bloqueo, ninguno). */
  protected readonly contados = computed(() => (this.bloqueado() ? 0 : this.elegidos().size));

  // --- Seleccionar todos con una tabla ---
  protected readonly todosAbierto = signal(false);
  protected readonly filasTodos = signal<FilaTodos[]>([]);
  protected readonly masivo = signal<{ secciones: number; turno: Turno; capacidad: number }>({ secciones: 1, turno: 'MANANA', capacidad: 30 });
  protected readonly todasMarcadas = computed(() => { const l = this.filasTodos().filter(f => !f.fija); return l.length > 0 && l.every(f => f.incluir); });
  protected readonly marcadasTodos = computed(() => totalesTodos(this.filasTodos()).grados);
  protected readonly seccionesTodos = computed(() => totalesTodos(this.filasTodos()).secciones);
  protected readonly vacantesTodos = computed(() => totalesTodos(this.filasTodos()).vacantes);
  protected readonly hayInvalidasTodos = computed(() => this.filasTodos().some(f => f.incluir && !f.fija && !filaValida(f)));

  protected abrirTodos(): void {
    if (this.bloqueado()) return;
    this.filasTodos.set(filasParaTodos(this.oferta(), this.elegidos(), this.configs()));
    this.masivo.set({ secciones: 1, turno: 'MANANA', capacidad: 30 });
    this.todosAbierto.set(true);
  }

  protected cambiarMasivo(campo: 'secciones' | 'turno' | 'capacidad', valor: number | string): void {
    this.masivo.update(m => ({ ...m, [campo]: valor }));
  }

  /** Copia los valores de arriba a todas las filas marcadas. */
  protected aplicarMasivo(): void {
    const m = this.masivo();
    this.filasTodos.update(l => l.map(f => (f.incluir && !f.fija ? { ...f, secciones: m.secciones, turno: m.turno, capacidad: m.capacidad } : f)));
  }

  protected cambiarFila(clave: string, parche: Partial<FilaTodos>): void {
    this.filasTodos.update(l => l.map(f => (f.clave === clave ? { ...f, ...parche } : f)));
  }

  protected marcarTodasFilas(marcar: boolean): void {
    this.filasTodos.update(l => l.map(f => (f.fija ? f : { ...f, incluir: marcar })));
  }

  /** Deja elegidos los grados marcados con lo que se escribió en la tabla (se crean al «Guardar cambios») y quita los desmarcados que aún no existían. */
  protected aceptarTodos(): void {
    if (this.hayInvalidasTodos()) return;
    const s = new Set(this.elegidos());
    const c = { ...this.configs() };
    for (const f of this.filasTodos()) {
      if (f.fija) continue;
      if (f.incluir) {
        s.add(f.clave);
        c[f.clave] = { secciones: f.secciones, turno: f.turno, capacidad: f.capacidad, aulas: c[f.clave]?.aulas?.slice(0, f.secciones) ?? [] };
      } else {
        s.delete(f.clave);
        delete c[f.clave];
      }
    }
    this.elegidos.set(s);
    this.configs.set(c);
    this.todosAbierto.set(false);
    const t = totalesTodos(this.filasTodos());
    this.avisos.info(`${t.grados} ${t.grados === 1 ? 'grado marcado' : 'grados marcados'} con ${t.secciones} ${t.secciones === 1 ? 'sección' : 'secciones'}: pulsa «Guardar cambios» para crearlos.`);
  }

  /** Cómo se establecerá cada grado nuevo elegido (secciones, turno y vacantes), por clave de grado. */
  private readonly configs = signal<Record<string, ConfigGrado>>({});
  protected readonly modal = signal<GradoOferta | null>(null);
  protected readonly modalPendiente = computed(() => {
    const g = this.modal();
    return !!g && !!this.configs()[clave(g)];
  });

  protected readonly emblema = emblemaOferta;
  protected readonly claseNivel = claseNivel;
  protected readonly resumen = resumenConfig;
  protected readonly maxSecciones = MAX_SECCIONES;
  protected readonly hayCambios = computed(() => !mismoConjunto(this.elegidos(), this.original()));

  protected readonly formValores = signal<Pick<ConfigGrado, 'secciones' | 'turno' | 'capacidad'>>({ secciones: 1, turno: 'MANANA', capacidad: 30 });
  protected readonly form = this.fb.nonNullable.group({
    secciones: [1, [Validators.required, Validators.min(0), Validators.max(MAX_SECCIONES)]],
    capacidad: [30, [Validators.required, Validators.min(1), Validators.max(60)]],
    turno: ['MANANA' as Turno, Validators.required]
  });

  // --- Aula y pabellón de cada sección del grado que se está estableciendo ---
  protected readonly aulas = signal<Aula[]>([]);
  protected readonly pabellones = signal<Pabellon[]>([]);
  private readonly seccionesAnio = signal<Seccion[]>([]);
  /** Aula elegida para cada sección (A, B…); 0 = ninguna. */
  protected readonly aulasModal = signal<number[]>([]);
  /** Pabellón con el que se filtra el selector de aula de cada sección; 0 = todos. */
  protected readonly pabModal = signal<number[]>([]);
  protected readonly nombresModal = computed(() => nombresSecciones(Number(this.formValores().secciones)));

  /** Aulas que ya usa otra sección en el mismo turno: las de las secciones del año y las de otros grados que se están estableciendo. */
  private readonly ocupadas = computed<ReadonlySet<number>>(() => {
    const actual = this.modal();
    const turno = this.formValores().turno;
    const ids = new Set<number>();
    for (const s of this.seccionesAnio()) if (s.activo && s.turno === turno && s.aulaId) ids.add(s.aulaId);
    for (const [k, c] of Object.entries(this.configs())) {
      if (actual && k === clave(actual)) continue;
      if (c.turno === turno) c.aulas.filter(Boolean).forEach(id => ids.add(id));
    }
    return ids;
  });

  protected readonly vistaPrevia = computed(() => resumenConfig({ ...this.formValores(), aulas: this.aulasModal() }, this.aulas()));

  /** La oferta agrupada por nivel, con cuántos grados de cada uno están elegidos. */
  protected readonly niveles = computed(() => {
    const porNivel = new Map<string, { codigo: string; nombre: string; clase: string; grados: GradoOferta[] }>();
    for (const g of this.oferta()) {
      if (!porNivel.has(g.nivelCodigo)) porNivel.set(g.nivelCodigo, { codigo: g.nivelCodigo, nombre: g.nivelNombre, clase: claseNivel(g.nivelCodigo), grados: [] });
      porNivel.get(g.nivelCodigo)!.grados.push(g);
    }
    return [...porNivel.values()].map(n => ({ ...n, elegidos: n.grados.filter(g => this.estaElegido(g)).length }));
  });

  constructor() {
    this.form.valueChanges.subscribe(() => {
      this.formValores.set(this.form.getRawValue());
      this.quitarAulasInvalidas();
    });
  }

  ngOnInit(): void {
    this.cargar();
    this.api.aulas().pipe(catchError(() => of([] as Aula[]))).subscribe(a => this.aulas.set(a));
    this.api.pabellones().pipe(catchError(() => of([] as Pabellon[]))).subscribe(p => this.pabellones.set(p));
    this.api.anios().pipe(catchError(() => of(null))).subscribe(a => {
      if (!a) return; // sin poder consultar los años no se bloquea nada
      const activo = a.find(x => x.estado === 'ACTIVO') ?? null;
      this.anioActivo.set(activo);
      this.periodoListo.set(true);
      if (activo) this.api.secciones(activo.id).pipe(catchError(() => of([] as Seccion[]))).subscribe(s => this.seccionesAnio.set(s));
    });
  }

  /** Las aulas que se pueden elegir para la sección `i` (con el motivo cuando una no se puede usar). */
  protected opciones(i: number): OpcionAula[] {
    return opcionesAula(this.aulas(), {
      pabellonId: this.pabModal()[i] ?? 0,
      capacidad: Number(this.formValores().capacidad) || 0,
      ocupadas: this.ocupadas(),
      propias: this.aulasModal().filter((_, j) => j !== i),
      actual: this.aulasModal()[i] ?? 0
    });
  }

  /** El pabellón del grado (el que se le asignó en Datos del colegio → Pabellones), cuando tiene exactamente uno; si no, 0 (todos). */
  private pabellonDelGrado(g: GradoOferta): number {
    if (!g.gradoId) return 0;
    const propios = this.pabellones().filter(p => (p.gradoIds ?? []).includes(g.gradoId!));
    return propios.length === 1 ? propios[0].id : 0;
  }

  protected nombrePabellon(id: number): string {
    return this.pabellones().find(p => p.id === id)?.nombre ?? '';
  }

  protected elegirPabellon(i: number, pabellonId: number): void {
    this.pabModal.update(p => reemplazar(p, i, pabellonId));
    // Si el aula ya elegida no es de ese pabellón, se quita para no dejar una elección que no calza.
    const aula = this.aulas().find(a => a.id === this.aulasModal()[i]);
    if (pabellonId > 0 && aula && aula.pabellonId !== pabellonId) this.aulasModal.update(a => reemplazar(a, i, 0));
  }

  protected elegirAula(i: number, aulaId: number): void {
    this.aulasModal.update(a => reemplazar(a, i, aulaId));
    // Al elegir un aula se muestra su pabellón en el filtro.
    const aula = this.aulas().find(a => a.id === aulaId);
    if (aula?.pabellonId) this.pabModal.update(p => reemplazar(p, i, aula.pabellonId!));
  }

  /** Al cambiar el turno o las vacantes, las aulas elegidas que dejan de servir se quitan (ya no alcanzan o las usa otra sección). */
  private quitarAulasInvalidas(): void {
    if (!this.modal()) return;
    const n = this.nombresModal().length;
    this.aulasModal.update(actuales => {
      const finales: number[] = [];
      for (let i = 0; i < n; i++) {
        const id = actuales[i] ?? 0;
        const ok = id === 0 || opcionesAula(this.aulas(), {
          pabellonId: 0, capacidad: Number(this.formValores().capacidad) || 0, ocupadas: this.ocupadas(), propias: finales, actual: 0
        }).some(o => o.aula.id === id && o.disponible);
        finales.push(ok ? id : 0);
      }
      return finales;
    });
  }

  private cargar(): void {
    this.cargando.set(true);
    this.api.ofertaGrados().subscribe({
      next: o => this.aplicar(o),
      error: e => {
        this.cargando.set(false);
        this.avisos.error(mensajeError(e, 'No se pudo cargar la oferta de grados.'));
      }
    });
  }

  private aplicar(o: GradoOferta[]): void {
    const set = new Set(o.filter(g => g.seleccionado).map(clave));
    this.oferta.set(o);
    this.original.set(set);
    this.elegidos.set(new Set(set));
    this.configs.set({});
    this.cargando.set(false);
  }

  protected estaElegido(g: GradoOferta): boolean {
    return !this.bloqueado() && this.elegidos().has(clave(g));
  }

  protected configDe(g: GradoOferta): ConfigGrado | null {
    return this.configs()[clave(g)] ?? null;
  }

  /**
   * Un grado sin elegir abre el cuadro para establecerlo; uno recién elegido lo vuelve a abrir para ajustarlo o quitarlo;
   * uno que el colegio ya ofrece (y no está en uso) simplemente se desmarca.
   */
  protected alternar(g: GradoOferta): void {
    if (!this.puedeEditar() || (g.enUso && this.estaElegido(g))) return;
    if (!this.estaElegido(g) || this.configDe(g)) {
      this.abrirModal(g);
      return;
    }
    const s = new Set(this.elegidos());
    s.delete(clave(g));
    this.elegidos.set(s);
  }

  private abrirModal(g: GradoOferta): void {
    const previa = this.configDe(g) ?? { secciones: 1, turno: 'MANANA' as Turno, capacidad: capacidadSugerida(g.nivelCodigo), aulas: [] };
    this.modal.set(g);
    this.aulasModal.set([...previa.aulas]);
    // El filtro de pabellón de cada sección arranca en el pabellón de su aula, si ya tenía una; si no, en el pabellón del grado (si tiene uno solo).
    const delGrado = this.pabellonDelGrado(g);
    this.pabModal.set(nombresSecciones(previa.secciones).map((_, i) => this.aulas().find(a => a.id === previa.aulas[i])?.pabellonId ?? delGrado));
    this.form.reset({ secciones: previa.secciones, turno: previa.turno, capacidad: previa.capacidad });
    this.formValores.set({ secciones: previa.secciones, turno: previa.turno, capacidad: previa.capacidad });
  }

  protected cerrarModal(): void {
    this.modal.set(null);
  }

  protected aceptarModal(): void {
    const g = this.modal();
    if (!g) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const secciones = Math.trunc(Number(v.secciones));
    // Un aula por sección (0 = sin aula), sin pasar de las secciones que quedaron.
    const aulas = nombresSecciones(secciones).map((_, i) => this.aulasModal()[i] ?? 0);
    this.configs.update(c => ({ ...c, [clave(g)]: { secciones, turno: v.turno, capacidad: Math.trunc(Number(v.capacidad)), aulas } }));
    this.elegidos.set(new Set(this.elegidos()).add(clave(g)));
    this.modal.set(null);
  }

  protected quitarDelModal(): void {
    const g = this.modal();
    if (!g) return;
    this.configs.update(c => Object.fromEntries(Object.entries(c).filter(([k]) => k !== clave(g))));
    const s = new Set(this.elegidos());
    s.delete(clave(g));
    this.elegidos.set(s);
    this.modal.set(null);
  }

  /** Elige todos los grados de un nivel (sin secciones: se pueden agregar luego) o quita los que no están en uso. */
  protected marcarNivel(codigo: string, marcar: boolean): void {
    const s = new Set(this.elegidos());
    const c = { ...this.configs() };
    for (const g of this.oferta().filter(x => x.nivelCodigo === codigo)) {
      if (marcar) s.add(clave(g));
      else if (!g.enUso) {
        s.delete(clave(g));
        delete c[clave(g)];
      }
    }
    this.elegidos.set(s);
    this.configs.set(c);
  }

  protected deshacer(): void {
    this.elegidos.set(new Set(this.original()));
    this.configs.set({});
    this.error.set(null);
  }

  protected guardar(): void {
    const seleccionados = this.oferta().filter(g => this.estaElegido(g)).map(g => ({ nivelCodigo: g.nivelCodigo, numero: g.numero }));
    const pendientes = { ...this.configs() };
    this.guardando.set(true);
    this.error.set(null);
    this.api.guardarOfertaGrados(seleccionados).subscribe({
      next: o => {
        this.guardando.set(false);
        this.aplicar(o);
        this.avisos.success('Grados del colegio actualizados.');
        this.crearSecciones(o, pendientes);
      },
      error: e => {
        this.guardando.set(false);
        this.error.set(mensajeError(e));
      }
    });
  }

  /** Con los grados ya creados, crea las secciones que se establecieron en el cuadro (necesita un año activo). */
  private crearSecciones(o: GradoOferta[], pendientes: Record<string, ConfigGrado>): void {
    const pedidas = Object.entries(pendientes).filter(([, c]) => c.secciones > 0);
    if (!pedidas.length) return;
    const anio = this.anioActivo();
    if (!anio) {
      this.avisos.warning('Los grados se crearon, pero no hay año académico activo: crea las secciones cuando actives uno.');
      return;
    }
    const peticiones = pedidas.flatMap(([k, c]) => {
      const gradoId = o.find(g => clave(g) === k)?.gradoId;
      if (!gradoId) return [];
      return nombresSecciones(c.secciones).map((nombre, i) =>
        this.api.crearSeccion({ anioId: anio.id, gradoId, aulaId: c.aulas[i] || null, nombre, turno: c.turno, capacidad: c.capacidad, tutorDocenteId: null, activo: true }).pipe(
          catchError(() => of(null))
        )
      );
    });
    forkJoin(peticiones).subscribe(res => {
      const creadas = res.filter(Boolean).length;
      if (creadas === res.length) this.avisos.success(`Se crearon ${creadas} ${creadas === 1 ? 'sección' : 'secciones'}.`);
      else this.avisos.warning(`Se crearon ${creadas} de ${res.length} secciones: revisa el resto en Estructura académica.`);
      this.cargar();
    });
  }
}
