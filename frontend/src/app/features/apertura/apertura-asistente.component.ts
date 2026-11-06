import { Component, OnInit, computed, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Observable,
  catchError,
  firstValueFrom,
  forkJoin,
  of,
  retry,
  throwError,
  timer,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Campania } from '../../core/models/matricula.model';
import { Concepto, Tarifa } from '../../core/models/pago.model';
import {
  Anio,
  Asignacion,
  Docente,
  DocenteRequest,
  Feriado,
  Grado,
  GradoOferta as GradoOfertaCfg,
  MallaGrado,
  Nivel,
  Periodo,
  Seccion,
  Turno,
} from '../../core/models/planificacion.model';
import { ConfirmService } from '../../core/services/confirm.service';
import { MatriculaService } from '../../core/services/matricula.service';
import { NotificationService } from '../../core/services/notification.service';
import { PagoConfigService } from '../../core/services/pago-config.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { mensajeError } from '../../core/utils/errores';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { avisosDelAnio, fechasDelAnio, proponerAnio } from '../planificacion/anios/propuesta-anio';
import { REGIMENES, Regimen, proponerPeriodos } from '../planificacion/anios/regimen-periodos';
import { fechaCorta, soles } from '../personal/rrhh';
import { hoyLocal } from '../personal/asistencia-personal';
import { anioPorAbrir } from './apertura';
import {
  CursoPendiente,
  FilaSecciones,
  OpcionSeccion,
  cursosPendientes,
  evaluarListo,
  feriadosFijosDelAnio,
  filasDeSecciones,
  opcionesDeSecciones,
  proponerCampania,
  seleccionInicial,
  siguienteLetra,
  sugerirDocentes,
  tarifasFaltantes,
} from './apertura-asistente';

/**
 * El Gateway deja pasar unas 5 peticiones por segundo (300 por minuto, con una ráfaga de 50) y responde 429 si se pasa. El asistente crea decenas de cosas
 * seguidas (secciones, asignaciones…), así que se regula solo: una pausa corta entre una petición y otra y, si aun así recibe un 429, espera y reintenta.
 */
const PAUSA_ENTRE_PETICIONES_MS = 220;
const es429 = (e: unknown): boolean => (e as HttpErrorResponse)?.status === 429;
const reintentar429 = <T>(o: Observable<T>): Observable<T> =>
  o.pipe(retry({ count: 5, delay: (e) => (es429(e) ? timer(2500) : throwError(() => e)) }));
const pausa = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

type Clave =
  | 'anios'
  | 'docentes'
  | 'conceptos'
  | 'periodos'
  | 'feriados'
  | 'secciones'
  | 'asignaciones'
  | 'tarifas'
  | 'campanias';
type PasoId =
  'anio' | 'periodos' | 'feriados' | 'secciones' | 'docentes' | 'tarifas' | 'campania' | 'listo';

const PASOS: { id: PasoId; titulo: string; ayuda: string; requerido: boolean }[] = [
  {
    id: 'anio',
    titulo: 'Año',
    requerido: true,
    ayuda: 'El año escolar que vas a abrir, con su inicio y su fin.',
  },
  {
    id: 'periodos',
    titulo: 'Periodos',
    requerido: false,
    ayuda:
      'Cómo se divide el año (bimestres, trimestres o semestres). Las notas y las libretas los necesitan; se pueden definir después.',
  },
  {
    id: 'feriados',
    titulo: 'Feriados',
    requerido: false,
    ayuda:
      'Los días sin clases. Se cargan los feriados nacionales de fecha fija; los de Semana Santa se agregan a mano.',
  },
  {
    id: 'secciones',
    titulo: 'Secciones',
    requerido: true,
    ayuda:
      'Las secciones de cada grado con su turno y sus vacantes: sin secciones no hay dónde matricular.',
  },
  {
    id: 'docentes',
    titulo: 'Docentes',
    requerido: false,
    ayuda:
      'Quién dicta cada curso en cada sección. No impide matricular: se puede terminar después.',
  },
  {
    id: 'tarifas',
    titulo: 'Tarifas',
    requerido: true,
    ayuda:
      'Cuánto se cobra de matrícula y de pensión. Sin tarifa de matrícula el grado no se puede ofrecer.',
  },
  {
    id: 'campania',
    titulo: 'Campaña',
    requerido: true,
    ayuda:
      'El periodo en el que se reciben matrículas. Al abrirla, la página pública deja matricular.',
  },
  {
    id: 'listo',
    titulo: 'Listo',
    requerido: false,
    ayuda: 'Revisa que todo esté en orden y abre el año y la campaña.',
  },
];

interface ConfSeccion {
  cantidad: number;
  turno: Turno;
  capacidad: number;
}
interface ConfTarifa {
  matricula: number | null;
  pension: number | null;
  cuotas: number;
  mes: number;
  dia: number;
}

/**
 * Asistente de apertura de periodo, todo en una ventana: año, periodos, feriados, secciones, docentes, tarifas y campaña, hasta dejar el año listo
 * para que los alumnos se matriculen. Se hace aquí mismo cada paso; solo se pueden omitir los que no impiden matricular (periodos, feriados y docentes): año, secciones, tarifas y campaña son indispensables. Abrir el año y la campaña se puede dejar para después. Se puede volver atrás y
 * cerrar en cualquier momento: lo que ya se guardó, queda guardado.
 */
@Component({
  selector: 'app-apertura-asistente',
  imports: [FormsModule, RouterLink, ModalComponent],
  template: `
    <app-modal
      titulo="Asistente de apertura de periodo"
      [ancho]="1000"
      (cerrar)="cerrarAsistente()"
    >
      <!-- Pasos -->
      <ol class="pasos" aria-label="Pasos de la apertura">
        @for (p of pasos; track p.id; let i = $index) {
          <li>
            <button
              type="button"
              class="paso"
              [class.actual]="paso() === p.id"
              [class.hecho]="estadoPaso(p.id) === 'ok'"
              [attr.aria-current]="paso() === p.id ? 'step' : null"
              [disabled]="p.id !== 'anio' && (!anioId() || !!bloqueo(p.id))"
              [title]="bloqueo(p.id) ? 'Antes completa «' + tituloDe(bloqueo(p.id)!) + '»' : ''"
              (click)="ir(p.id)"
            >
              <span class="num">{{
                estadoPaso(p.id) === 'ok' && paso() !== p.id ? '✓' : i + 1
              }}</span>
              <span class="etq">{{ p.titulo }}</span>
            </button>
          </li>
        }
      </ol>

      @if (cargando()) {
        <p class="muted">Revisando el año…</p>
      } @else {
        <p class="ayuda-paso">
          {{ infoPaso().ayuda }}
          @if (!infoPaso().requerido && paso() !== 'listo') {
            <em>Opcional: puedes omitirlo.</em>
          } @else if (infoPaso().requerido) {
            <em class="indispensable">Indispensable para matricular: no se puede omitir.</em>
          }
        </p>
        @if (mensaje(); as m) {
          <div
            class="aviso"
            [class.aviso-ok]="m.tipo === 'ok'"
            [class.aviso-warn]="m.tipo === 'aviso'"
            [class.aviso-danger]="m.tipo === 'error'"
            role="status"
          >
            {{ m.texto }}
          </div>
        }

        @switch (paso()) {
          <!-- 1. AÑO -->
          @case ('anio') {
            <div class="cuerpo">
              @if (aniosElegibles().length) {
                <div class="lista-radios" role="radiogroup" aria-label="Año a abrir">
                  @for (a of aniosElegibles(); track a.id) {
                    <label class="radio" [class.on]="anioId() === a.id">
                      <input
                        type="radio"
                        name="anio-asistente"
                        [checked]="anioId() === a.id"
                        (change)="elegirAnio(a.id)"
                      />
                      <span
                        ><strong>Año {{ a.nombre }}</strong
                        ><small
                          >{{ fechaCorta(a.fechaInicio) }} → {{ fechaCorta(a.fechaFin) }} ·
                          {{ a.estado === 'ACTIVO' ? 'activo' : 'planificado' }}</small
                        ></span
                      >
                    </label>
                  }
                </div>
              }
              @if (!creandoAnio()) {
                <button type="button" class="btn" (click)="empezarAnioNuevo()">
                  + Crear un año nuevo
                </button>
              } @else {
                <div class="form-grid caja">
                  <div class="field">
                    <label for="as-an-nombre">Nombre</label
                    ><input
                      id="as-an-nombre"
                      [ngModel]="anioNuevo().nombre"
                      (ngModelChange)="cambiarNombreAnio($event)"
                    />
                  </div>
                  <div class="field">
                    <label for="as-an-ini">Inicio</label
                    ><input
                      id="as-an-ini"
                      type="date"
                      [ngModel]="anioNuevo().fechaInicio"
                      (ngModelChange)="anioNuevo.update((a) => ({ ...a, fechaInicio: $event }))"
                    />
                  </div>
                  <div class="field">
                    <label for="as-an-fin">Fin</label
                    ><input
                      id="as-an-fin"
                      type="date"
                      [ngModel]="anioNuevo().fechaFin"
                      (ngModelChange)="anioNuevo.update((a) => ({ ...a, fechaFin: $event }))"
                    />
                  </div>
                  <div class="field full">
                    <button type="button" class="chip" (click)="fechasHabituales()">
                      Usar las fechas habituales (primer lunes de marzo → último viernes antes del
                      20 de dic)
                    </button>
                    @for (x of avisosAnioNuevo(); track x) {
                      <span class="error">{{ x }}</span>
                    }
                  </div>
                  <div class="field full acciones-fila">
                    <button type="button" class="btn" (click)="creandoAnio.set(false)">
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      [disabled]="
                        ocupado() ||
                        !anioNuevo().nombre.trim() ||
                        !anioNuevo().fechaInicio ||
                        !anioNuevo().fechaFin
                      "
                      (click)="crearAnio()"
                    >
                      {{ ocupado() ? 'Creando…' : 'Crear el año' }}
                    </button>
                  </div>
                </div>
              }
              @if (!aniosElegibles().length && !creandoAnio()) {
                <p class="muted">Aún no hay un año por abrir: crea el primero.</p>
              }
            </div>
          }

          <!-- 2. PERIODOS -->
          @case ('periodos') {
            <div class="cuerpo">
              @if (periodos().length) {
                <div class="tabla-simple">
                  @for (p of periodos(); track p.id) {
                    <div>
                      <strong>{{ p.nombre }}</strong
                      ><span>{{ fechaCorta(p.fechaInicio) }} → {{ fechaCorta(p.fechaFin) }}</span>
                    </div>
                  }
                </div>
                <p class="muted">
                  El año ya tiene sus periodos. Para cambiarlos, usa «Años y periodos».
                </p>
              } @else {
                <div class="regimenes" role="radiogroup" aria-label="Régimen de periodos">
                  @for (r of regimenes; track r.id) {
                    <button
                      type="button"
                      role="radio"
                      class="regimen"
                      [class.on]="regimen() === r.id"
                      [attr.aria-checked]="regimen() === r.id"
                      (click)="regimen.set(r.id)"
                    >
                      <strong>{{ r.etiqueta }}</strong
                      ><small>{{ r.ayuda }}</small>
                    </button>
                  }
                </div>
                <div class="tabla-simple">
                  @for (p of periodosPropuestos(); track p.numero) {
                    <div>
                      <strong>{{ p.nombre }}</strong
                      ><span>{{ fechaCorta(p.fechaInicio) }} → {{ fechaCorta(p.fechaFin) }}</span>
                    </div>
                  }
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  [disabled]="ocupado() || !periodosPropuestos().length"
                  (click)="crearPeriodos()"
                >
                  {{
                    ocupado()
                      ? 'Creando…'
                      : 'Crear estos ' + periodosPropuestos().length + ' periodos'
                  }}
                </button>
              }
            </div>
          }

          <!-- 3. FERIADOS -->
          @case ('feriados') {
            <div class="cuerpo">
              <p class="muted">
                {{
                  feriados().length
                    ? feriados().length + ' feriados ya cargados.'
                    : 'Todavía no hay feriados cargados.'
                }}
              </p>
              @if (feriadosSugeridos().length) {
                <div class="lista-checks">
                  @for (f of feriadosSugeridos(); track f.fecha) {
                    <label class="check"
                      ><input
                        type="checkbox"
                        [checked]="feriadosSel().has(f.fecha)"
                        (change)="alternarFeriado(f.fecha)"
                      />
                      <span>{{ fechaCorta(f.fecha) }} · {{ f.descripcion }}</span></label
                    >
                  }
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  [disabled]="ocupado() || !feriadosSel().size"
                  (click)="cargarFeriados()"
                >
                  {{
                    ocupado()
                      ? 'Cargando…'
                      : 'Cargar ' +
                        feriadosSel().size +
                        (feriadosSel().size === 1 ? ' feriado' : ' feriados')
                  }}
                </button>
                <p class="muted">
                  Jueves y Viernes Santo cambian cada año: agrégalos en Planificación → Feriados.
                </p>
              } @else {
                <p class="muted">Ya están cargados todos los feriados de fecha fija de este año.</p>
              }
            </div>
          }

          <!-- 4. SECCIONES -->
          @case ('secciones') {
            <div class="cuerpo">
              @if (!catalogo().length && !grados().length) {
                <p class="muted">
                  No se pudo cargar la lista de grados. Elígelos en
                  <a routerLink="/configuracion/grados" (click)="cerrarAsistente()"
                    >Configuración → Niveles y grados</a
                  >.
                </p>
              } @else {
                <p class="muted">
                  Estos son los <strong>grados</strong> del colegio. Marca los que se ofrecen este
                  año y, dentro de cada uno, agrega sus <strong>secciones</strong> (sale la «A»; con
                  «+» agregas B, C…; pasa el cursor sobre cada letra para ver su estado). Si hay
                  secciones nuevas, junto a ellas eliges turno y vacantes. Si desmarcas un grado que
                  ya existe en el colegio, solo se deja
                  <strong>sin abrir en este periodo</strong> (sigue en el colegio y vuelves a
                  marcarlo cuando quieras).
                </p>
                <div class="grupos-secc">
                  @for (n of catalogoPorNivel(); track n.nombre) {
                    <h4 class="nivel-secc">{{ n.nombre }}</h4>
                    <div class="rejilla-grados">
                      @for (e of n.grados; track e.numero) {
                        <div class="grado-bloque" [class.on]="marcadoGrado(e)">
                          <label class="grado-oferta">
                            <input
                              type="checkbox"
                              [checked]="marcadoGrado(e)"
                              [disabled]="ocupado()"
                              (change)="alternarGrado(e, $event)"
                              [attr.aria-label]="'Ofrecer ' + e.nombre"
                            />
                            <strong>{{ e.nombre }}</strong>
                          </label>
                          @if (filaDe(e); as f) {
                            <section
                              class="fila-secc"
                              role="group"
                              [attr.aria-label]="'Secciones de ' + f.grado.nombre"
                            >
                              @for (o of opcionesVisibles(f.grado.id); track o.nombre) {
                                <label
                                  class="casilla"
                                  [class.on]="marcada(f.grado.id, o)"
                                  [class.fija]="o.estado === 'activa'"
                                  [class.inactiva]="o.estado === 'inactiva'"
                                  [attr.title]="etiquetaOpcion(o)"
                                >
                                  <input
                                    type="checkbox"
                                    [checked]="marcada(f.grado.id, o)"
                                    [disabled]="o.estado === 'activa'"
                                    (change)="alternarSeccion(f.grado.id, o)"
                                    [attr.aria-label]="
                                      'agregar ' + f.grado.nombre + ' (' + etiquetaOpcion(o) + ')'
                                    "
                                  />
                                  <span class="letra">{{ o.nombre }}</span>
                                </label>
                              }
                              <button
                                type="button"
                                class="casilla mas"
                                (click)="agregarExtra(f.grado.id)"
                                title="Agregar otra sección"
                                [attr.aria-label]="'Agregar otra sección a ' + f.grado.nombre"
                              >
                                +
                              </button>
                              @if (hayPorCrear(f.grado.id)) {
                                <select
                                  class="mini"
                                  [ngModel]="conf(f.grado.id).turno"
                                  (ngModelChange)="cambiarConf(f.grado.id, 'turno', $event)"
                                  [attr.aria-label]="'Turno de las nuevas de ' + f.grado.nombre"
                                >
                                  <option value="MANANA">Mañana</option>
                                  <option value="TARDE">Tarde</option>
                                </select>
                                <input
                                  type="number"
                                  min="1"
                                  max="60"
                                  class="mini corto"
                                  title="Vacantes por sección"
                                  [ngModel]="conf(f.grado.id).capacidad"
                                  (ngModelChange)="cambiarConf(f.grado.id, 'capacidad', +$event)"
                                  [attr.aria-label]="'Vacantes por sección de ' + f.grado.nombre"
                                />
                              }
                            </section>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
                @if (seccionesPorCrear() > 0) {
                  <button
                    type="button"
                    class="btn btn-primary"
                    [disabled]="ocupado()"
                    (click)="crearSecciones()"
                  >
                    {{ ocupado() ? 'Guardando…' : textoBotonSecciones() }}
                  </button>
                } @else {
                  <p class="muted">
                    {{
                      filasAbiertas().every((f) => f.activas.length)
                        ? '✓ Todos los grados tienen secciones. Marca otras si quieres más.'
                        : 'Marca las secciones que quieras crear.'
                    }}
                  </p>
                }
                <p class="muted">
                  Las aulas y los tutores se asignan después, en Configuración → Estructura
                  académica.
                </p>
              }
            </div>
          }

          <!-- 5. DOCENTES -->
          @case ('docentes') {
            <div class="cuerpo">
              @if (!pendientes().length) {
                <p class="ok-txt">
                  {{
                    secciones().some((s) => s.activo)
                      ? '✓ Todos los cursos tienen docente.'
                      : 'Primero crea las secciones.'
                  }}
                </p>
              } @else {
                <div class="barra-acc">
                  <span class="muted"
                    >{{ pendientes().length }}
                    {{ pendientes().length === 1 ? 'curso sin docente' : 'cursos sin docente' }}. El
                    docente elegido dicta el curso en todas las secciones de ese grado.</span
                  >
                  <button
                    type="button"
                    class="btn btn-sm"
                    [disabled]="ocupado()"
                    (click)="sugerirTodos()"
                  >
                    Sugerir docentes
                  </button>
                </div>
                <div class="tabla-form docentes">
                  @for (p of pendientes(); track p.clave) {
                    <div class="fila">
                      <span
                        ><strong>{{ p.cursoNombre }}</strong>
                        <small class="muted"
                          >{{ nombreGrado(p.gradoId) }} · {{ p.secciones.length }}
                          {{ p.secciones.length === 1 ? 'sección' : 'secciones' }}</small
                        ></span
                      >
                      <span>
                        <select
                          [ngModel]="eleccion()[p.clave] ?? 0"
                          (ngModelChange)="elegirDocente(p.clave, +$event)"
                          [attr.aria-label]="
                            'Docente de ' + p.cursoNombre + ' en ' + nombreGrado(p.gradoId)
                          "
                        >
                          <option [ngValue]="0">
                            {{
                              docentesPara(p).length
                                ? 'Sin elegir (se omite)'
                                : 'Ningún docente tiene este curso'
                            }}
                          </option>
                          @for (d of docentesPara(p); track d.id) {
                            <option [ngValue]="d.id">{{ d.apellidos }}, {{ d.nombres }}</option>
                          }
                        </select>
                      </span>
                    </div>
                  }
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  [disabled]="ocupado() || !elegidos()"
                  (click)="asignarDocentes()"
                >
                  {{
                    ocupado()
                      ? 'Asignando…'
                      : 'Asignar ' + elegidos() + (elegidos() === 1 ? ' curso' : ' cursos')
                  }}
                </button>
                <p class="muted">
                  Solo aparecen los docentes que tienen ese curso en su lista (el que eligieron al
                  registrarlos). Si un curso no tiene docentes, agrégalo en la ficha del docente
                  (Personal → Editar). Los horarios se arman después en Horarios.
                </p>
              }
            </div>
          }

          <!-- 6. TARIFAS -->
          @case ('tarifas') {
            <div class="cuerpo">
              @if (!nivelesConGrados().length) {
                <p class="muted">No hay grados ofrecidos todavía.</p>
              } @else {
                @if (copiable().length) {
                  <div class="barra-acc">
                    <span class="muted"
                      >El año {{ anioAnterior()?.nombre }} tiene {{ copiable().length }}
                      {{ copiable().length === 1 ? 'tarifa' : 'tarifas' }} que a este año le
                      faltan.</span
                    >
                    <button
                      type="button"
                      class="btn btn-sm"
                      [disabled]="ocupado()"
                      (click)="copiarTarifas()"
                    >
                      Copiar del {{ anioAnterior()?.nombre }}
                    </button>
                  </div>
                }
                <div class="tabla-form tarifas">
                  <div class="cab">
                    <span>Nivel</span><span>Matrícula (S/)</span
                    ><span>Pensión total del año (S/)</span><span>Cuotas</span
                    ><span>Mes de inicio</span>
                  </div>
                  @for (n of nivelesConGrados(); track n.nivel.id) {
                    <div class="fila">
                      <span
                        ><strong>{{ n.nivel.nombre }}</strong>
                        <small class="muted"
                          >{{ n.grados.length }}
                          {{ n.grados.length === 1 ? 'grado' : 'grados' }}</small
                        ></span
                      >
                      @if (n.falta.faltaMatricula) {
                        <span
                          ><input
                            type="number"
                            min="0"
                            step="0.01"
                            [ngModel]="confTarifa(n.nivel.id).matricula"
                            (ngModelChange)="cambiarTarifa(n.nivel.id, 'matricula', $event)"
                            [attr.aria-label]="'Matrícula de ' + n.nivel.nombre"
                        /></span>
                      } @else {
                        <span class="ok-txt">✓ {{ montoTarifa(n.nivel.id, 'MATRICULA') }}</span>
                      }
                      @if (n.falta.faltaPension) {
                        <span
                          ><input
                            type="number"
                            min="0"
                            step="0.01"
                            [ngModel]="confTarifa(n.nivel.id).pension"
                            (ngModelChange)="cambiarTarifa(n.nivel.id, 'pension', $event)"
                            [attr.aria-label]="'Pensión de ' + n.nivel.nombre"
                        /></span>
                        <span
                          ><input
                            type="number"
                            min="1"
                            max="12"
                            class="corto"
                            [ngModel]="confTarifa(n.nivel.id).cuotas"
                            (ngModelChange)="cambiarTarifa(n.nivel.id, 'cuotas', $event)"
                            [attr.aria-label]="'Cuotas de ' + n.nivel.nombre"
                        /></span>
                        <span
                          ><select
                            [ngModel]="confTarifa(n.nivel.id).mes"
                            (ngModelChange)="cambiarTarifa(n.nivel.id, 'mes', $event)"
                            [attr.aria-label]="'Mes de inicio de ' + n.nivel.nombre"
                          >
                            @for (m of meses; track m[0]) {
                              <option [ngValue]="m[0]">{{ m[1] }}</option>
                            }
                          </select></span
                        >
                      } @else {
                        <span class="ok-txt">✓ {{ montoTarifa(n.nivel.id, 'PENSION') }}</span
                        ><span class="muted">—</span><span class="muted">—</span>
                      }
                    </div>
                  }
                </div>
                @if (tarifasPorGuardar() > 0) {
                  <button
                    type="button"
                    class="btn btn-primary"
                    [disabled]="ocupado()"
                    (click)="guardarTarifas()"
                  >
                    {{
                      ocupado()
                        ? 'Guardando…'
                        : 'Guardar ' +
                          tarifasPorGuardar() +
                          (tarifasPorGuardar() === 1 ? ' tarifa' : ' tarifas')
                    }}
                  </button>
                } @else {
                  <p class="muted">
                    {{
                      tarifasPendientes()
                        ? 'Escribe los montos que quieras guardar.'
                        : '✓ Todos los niveles tienen su matrícula y su pensión.'
                    }}
                  </p>
                }
                <p class="muted">
                  La pensión es el total del año: se reparte en las cuotas elegidas, con vencimiento
                  el día 5 de cada mes. Descuentos y otros conceptos, en Cobros del año.
                </p>
              }
            </div>
          }

          <!-- 7. CAMPAÑA -->
          @case ('campania') {
            <div class="cuerpo">
              @for (c of campanias(); track c.id) {
                <div class="caja fila-campania">
                  <span
                    ><strong>{{ c.nombre }}</strong
                    ><small
                      >{{ fechaCorta(c.fechaInicio) }} → {{ fechaCorta(c.fechaFin) }}</small
                    ></span
                  >
                  <span [class]="'estado ' + c.estado">{{ c.estado }}</span>
                  @if (c.estado === 'PLANIFICADA') {
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      [disabled]="ocupado()"
                      (click)="abrirCampania(c)"
                    >
                      Abrir ahora
                    </button>
                  }
                </div>
              }
              @if (!campanias().length || creandoCampania()) {
                <div class="form-grid caja">
                  <div class="field full">
                    <label for="as-ca-nombre">Nombre de la campaña</label
                    ><input
                      id="as-ca-nombre"
                      [ngModel]="campaniaNueva().nombre"
                      (ngModelChange)="campaniaNueva.update((c) => ({ ...c, nombre: $event }))"
                    />
                  </div>
                  <div class="field">
                    <label for="as-ca-ini">Desde</label
                    ><input
                      id="as-ca-ini"
                      type="date"
                      [ngModel]="campaniaNueva().fechaInicio"
                      (ngModelChange)="campaniaNueva.update((c) => ({ ...c, fechaInicio: $event }))"
                    />
                  </div>
                  <div class="field">
                    <label for="as-ca-fin">Hasta</label
                    ><input
                      id="as-ca-fin"
                      type="date"
                      [ngModel]="campaniaNueva().fechaFin"
                      (ngModelChange)="campaniaNueva.update((c) => ({ ...c, fechaFin: $event }))"
                    />
                  </div>
                  <div class="field full acciones-fila">
                    @if (campanias().length) {
                      <button type="button" class="btn" (click)="creandoCampania.set(false)">
                        Cancelar
                      </button>
                    }
                    <button
                      type="button"
                      class="btn"
                      [disabled]="ocupado() || !campaniaValida()"
                      (click)="crearCampania(false)"
                    >
                      Crear (la abro después)
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      [disabled]="ocupado() || !campaniaValida()"
                      (click)="crearCampania(true)"
                    >
                      {{ ocupado() ? 'Creando…' : 'Crear y abrir ahora' }}
                    </button>
                  </div>
                </div>
              } @else {
                <button type="button" class="btn" (click)="empezarCampania()">
                  + Otra campaña
                </button>
              }
              <p class="muted">
                Solo puede haber una campaña abierta por año. La página pública solo deja matricular
                con una campaña abierta y el año activo.
              </p>
            </div>
          }

          <!-- 8. LISTO -->
          @case ('listo') {
            <div class="cuerpo">
              <ul class="revision">
                @for (i of listo().items; track i.id) {
                  <li
                    [class.ok]="i.ok"
                    [class.falta]="!i.ok && i.requerido"
                    [class.aviso]="!i.ok && !i.requerido"
                  >
                    <span class="marca">{{ i.ok ? '✓' : i.requerido ? '✕' : '!' }}</span
                    ><span>{{ i.texto }}</span>
                  </li>
                }
              </ul>
              <div class="finales">
                @if (anio()?.estado === 'PLANIFICADO') {
                  <button
                    type="button"
                    class="btn btn-primary"
                    [disabled]="ocupado()"
                    (click)="abrirAnio()"
                  >
                    Abrir el año {{ anio()!.nombre }}
                  </button>
                }
                @if (campaniaPlanificada(); as c) {
                  <button
                    type="button"
                    class="btn btn-primary"
                    [disabled]="ocupado()"
                    (click)="abrirCampania(c)"
                  >
                    Abrir la campaña «{{ c.nombre }}»
                  </button>
                }
              </div>
              @if (listo().puedeMatricular) {
                <div class="aviso aviso-ok" role="status">
                  <strong>¡Listo!</strong> Los alumnos ya pueden matricularse en la página pública.
                  <a routerLink="/matricula-en-linea" target="_blank"
                    >Ver la página de matrícula en línea</a
                  >
                </div>
              } @else {
                <p class="muted">
                  Cuando los puntos marcados con ✕ estén en orden, la página pública ya deja
                  matricular. Puedes volver a cualquier paso con los números de arriba.
                </p>
              }
            </div>
          }
        }
      }

      <ng-container footer>
        <button type="button" class="btn" (click)="cerrarAsistente()">Cerrar</button>
        <button
          type="button"
          class="btn"
          [disabled]="ocupado() || cargando()"
          (click)="actualizar()"
          title="Vuelve a consultar todo lo del año"
        >
          Actualizar
        </button>
        @if (paso() !== 'anio') {
          <button type="button" class="btn" (click)="atras()">← Atrás</button>
        }
        @if (paso() !== 'listo') {
          <button
            type="button"
            class="btn"
            [class.btn-primary]="puedeAvanzar() && estadoPaso(paso()) === 'ok'"
            [disabled]="!puedeAvanzar()"
            (click)="siguiente()"
            [title]="
              puedeAvanzar()
                ? ''
                : 'Este paso es indispensable para poder matricular: complétalo para seguir'
            "
          >
            {{
              !puedeAvanzar()
                ? 'Completa este paso para seguir'
                : estadoPaso(paso()) === 'ok'
                  ? 'Siguiente →'
                  : 'Omitir este paso →'
            }}
          </button>
        }
      </ng-container>
    </app-modal>
  `,
  styles: `
    .indispensable {
      color: var(--danger, #c0392b);
      font-style: normal;
      font-weight: 700;
    }
    .pasos {
      list-style: none;
      margin: 0 0 14px;
      padding: 0;
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    .paso {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px 6px 6px;
      font: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--ink-2);
      background: var(--bg);
      border: 1.5px solid var(--line-2);
      border-radius: 999px;
      cursor: pointer;
    }
    .paso:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .paso .num {
      width: 24px;
      height: 24px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--line);
      color: var(--ink-2);
      font-size: 0.75rem;
    }
    .paso.hecho .num {
      background: var(--ok);
      color: #fff;
    }
    .paso.actual {
      color: var(--primary);
      border-color: var(--primary);
      background: var(--primary-soft);
    }
    .paso.actual .num {
      background: var(--primary);
      color: #fff;
    }
    .ayuda-paso {
      margin: 0 0 12px;
      color: var(--ink-2);
      font-size: 0.92rem;
    }
    .ayuda-paso em {
      font-style: normal;
      font-weight: 700;
      color: var(--primary);
    }
    .cuerpo {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 260px;
    }
    .cuerpo > .btn {
      align-self: flex-start;
    }
    .caja {
      padding: 14px;
      border: 1.5px solid var(--line-2);
      border-radius: 14px;
      background: var(--bg);
    }
    .lista-radios {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .radio {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border: 1.5px solid var(--line-2);
      border-radius: 12px;
      cursor: pointer;
    }
    .radio.on {
      border-color: var(--primary);
      background: var(--primary-soft);
    }
    .radio span {
      display: flex;
      flex-direction: column;
    }
    .radio small {
      color: var(--ink-2);
    }
    .chip {
      align-self: flex-start;
      padding: 4px 12px;
      font: inherit;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary);
      background: var(--primary-soft);
      border: 1.5px solid transparent;
      border-radius: 999px;
      cursor: pointer;
      text-align: left;
    }
    .chip:hover {
      border-color: var(--primary);
    }
    .acciones-fila {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    .regimenes {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .regimen {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 12px;
      text-align: left;
      font: inherit;
      color: inherit;
      cursor: pointer;
      background: var(--card);
      border: 1.5px solid var(--line-2);
      border-radius: 14px;
    }
    .regimen small {
      color: var(--ink-2);
    }
    .regimen.on {
      border-color: var(--primary);
      background: var(--primary-soft);
    }
    .tabla-simple {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
    }
    .tabla-simple > div {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 14px;
      border-top: 1px solid var(--line);
      font-size: 0.9rem;
    }
    .tabla-simple > div:first-child {
      border-top: 0;
    }
    .tabla-simple span {
      color: var(--ink-2);
      font-variant-numeric: tabular-nums;
    }
    .lista-checks {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 4px 16px;
    }
    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .tabla-form {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
    }
    .grupos-secc {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .nivel-secc {
      margin: 8px 0 0;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ink-2);
    }
    .rejilla-grados {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    @media (max-width: 720px) {
      .rejilla-grados {
        grid-template-columns: 1fr;
      }
    }
    .grado-bloque {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px 10px;
      padding: 8px 12px;
      border: 1.5px solid var(--line-2);
      border-radius: 12px;
      background: var(--bg);
    }
    .grado-bloque.on {
      border-color: var(--primary);
      background: var(--primary-soft);
    }
    .grado-oferta {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      min-width: 120px;
    }
    .grado-oferta input {
      width: 18px;
      height: 18px;
      accent-color: var(--primary);
    }
    .rejilla-grados {
      align-items: start;
    }
    .fila-secc {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }
    .fila-secc .casilla {
      padding: 2px 7px 2px 5px;
      gap: 4px;
      border-radius: 9px;
      background: var(--card);
    }
    .fila-secc .casilla input {
      width: 15px;
      height: 15px;
    }
    .fila-secc .casilla .letra {
      font-size: 0.9rem;
    }
    .fila-secc .casilla.mas {
      padding: 2px 8px;
      font-size: 0.8rem;
    }
    .grado-oferta {
      min-width: 104px;
    }
    .fila-secc .mini {
      padding: 3px 6px;
      font: inherit;
      font-size: 0.8rem;
      border: 1.5px solid var(--line-2);
      border-radius: 8px;
      background: var(--card);
    }
    .fila-secc .mini.corto {
      width: 62px;
    }
    .grado-secc {
      margin: -4px 0 4px 22px;
      padding: 12px 14px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--card);
    }
    .enc-secc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .enc-secc small {
      margin-left: 4px;
    }
    .acc-secc {
      display: flex;
      gap: 6px;
    }
    .casillas {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .casilla {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px 7px 10px;
      border: 1.5px solid var(--line-2);
      border-radius: 12px;
      background: var(--bg);
      cursor: pointer;
      font: inherit;
      color: inherit;
    }
    .casilla input {
      width: 18px;
      height: 18px;
      accent-color: var(--primary);
      cursor: pointer;
      flex: none;
    }
    .casilla .letra {
      font-weight: 900;
      font-size: 1.05rem;
    }
    .casilla small {
      color: var(--ink-2);
      font-size: 0.72rem;
    }
    .casilla.on {
      border-color: var(--primary);
      background: var(--primary-soft);
    }
    .casilla.fija {
      border-color: var(--ok);
      background: var(--ok-soft);
      cursor: default;
    }
    .casilla.fija input {
      cursor: default;
    }
    .casilla.inactiva {
      border-style: dashed;
    }
    .casilla.mas {
      color: var(--primary);
      font-weight: 700;
      border-style: dashed;
      background: none;
    }
    .casilla.mas:hover {
      border-color: var(--primary);
    }
    .conf-secc {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 10px;
      font-size: 0.85rem;
      color: var(--ink-2);
    }
    .conf-secc label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .conf-secc select,
    .conf-secc input {
      padding: 5px 8px;
      font: inherit;
      border: 1.5px solid var(--line-2);
      border-radius: 8px;
      background: var(--card);
    }
    .conf-secc input.corto {
      width: 80px;
    }
    .tabla-form .cab,
    .tabla-form .fila {
      display: grid;
      grid-template-columns: minmax(150px, 1.4fr) repeat(3, minmax(0, 1fr));
      gap: 10px;
      align-items: center;
      padding: 8px 14px;
    }
    .tabla-form.tarifas .cab,
    .tabla-form.tarifas .fila {
      grid-template-columns: minmax(130px, 1.2fr) repeat(4, minmax(0, 1fr));
    }
    .tabla-form.docentes .fila {
      grid-template-columns: minmax(180px, 1.2fr) minmax(0, 1.5fr);
    }
    .tabla-form .cab {
      background: var(--bg);
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ink-2);
    }
    .tabla-form .fila {
      border-top: 1px solid var(--line);
    }
    .tabla-form input,
    .tabla-form select {
      width: 100%;
      min-width: 0;
      padding: 6px 8px;
      font: inherit;
      border: 1.5px solid var(--line-2);
      border-radius: 8px;
      background: var(--card);
    }
    .tabla-form input.corto {
      max-width: 90px;
    }
    .tabla-form .fila small {
      display: block;
    }
    .ok-txt {
      color: var(--ok);
      font-weight: 700;
    }
    .barra-acc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .fila-campania {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .fila-campania > span:first-child {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .fila-campania small {
      color: var(--ink-2);
    }
    .estado {
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      padding: 2px 10px;
      border-radius: 999px;
      background: var(--line);
    }
    .estado.ABIERTA {
      background: var(--ok-soft);
      color: var(--ok);
    }
    .estado.PLANIFICADA {
      background: var(--warn-soft);
      color: var(--warn);
    }
    .revision {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .revision li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--bg);
    }
    .revision .marca {
      flex: none;
      width: 22px;
      height: 22px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      font-weight: 900;
      font-size: 0.8rem;
      background: var(--line);
    }
    .revision li.ok .marca {
      background: var(--ok);
      color: #fff;
    }
    .revision li.falta .marca {
      background: var(--danger, #c0392b);
      color: #fff;
    }
    .revision li.aviso .marca {
      background: var(--warn);
      color: #fff;
    }
    .finales {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    @media (max-width: 760px) {
      .regimenes,
      .lista-checks {
        grid-template-columns: minmax(0, 1fr);
      }
      .tabla-form .cab {
        display: none;
      }
      .tabla-form .fila,
      .tabla-form.tarifas .fila,
      .tabla-form.docentes .fila {
        grid-template-columns: minmax(0, 1fr);
        gap: 6px;
      }
    }
  `,
})
export class AperturaAsistenteComponent implements OnInit {
  private readonly api = inject(PlanificacionService);
  private readonly pagos = inject(PagoConfigService);
  private readonly matriculas = inject(MatriculaService);
  private readonly avisos = inject(NotificationService);
  private readonly confirmacion = inject(ConfirmService);

  /** El asistente se cerró. */
  readonly cerrar = output<void>();
  /** Se guardó algo: la pantalla de atrás debe volver a revisar el estado. */
  readonly cambio = output<void>();

  protected readonly pasos = PASOS;
  protected readonly regimenes = REGIMENES;
  protected readonly fechaCorta = fechaCorta;
  protected readonly meses: [number, string][] = [
    [1, 'Enero'],
    [2, 'Febrero'],
    [3, 'Marzo'],
    [4, 'Abril'],
    [5, 'Mayo'],
    [6, 'Junio'],
    [7, 'Julio'],
    [8, 'Agosto'],
    [9, 'Septiembre'],
    [10, 'Octubre'],
    [11, 'Noviembre'],
    [12, 'Diciembre'],
  ];

  protected readonly cargando = signal(true);
  protected readonly ocupado = signal(false);
  protected readonly paso = signal<PasoId>('anio');
  protected readonly mensaje = signal<{ tipo: 'ok' | 'aviso' | 'error'; texto: string } | null>(
    null,
  );

  // ---- datos ----
  protected readonly anios = signal<Anio[]>([]);
  protected readonly anioId = signal(0);
  protected readonly grados = signal<Grado[]>([]);
  private readonly niveles = signal<Nivel[]>([]);
  /** Todos los grados posibles del colegio (por nivel), ofrecidos o no. */
  protected readonly catalogo = signal<GradoOfertaCfg[]>([]);
  protected readonly periodos = signal<Periodo[]>([]);
  protected readonly feriados = signal<Feriado[]>([]);
  protected readonly secciones = signal<Seccion[]>([]);
  private readonly mallas = signal<Record<number, MallaGrado | null>>({});
  private readonly asignaciones = signal<Asignacion[]>([]);
  private readonly docentes = signal<Docente[]>([]);
  private readonly conceptos = signal<Concepto[]>([]);
  private readonly tarifas = signal<Tarifa[]>([]);
  private readonly tarifasPrevias = signal<Tarifa[]>([]);
  protected readonly campanias = signal<Campania[]>([]);

  protected readonly anio = computed(
    () => this.anios().find((a) => a.id === this.anioId()) ?? null,
  );
  protected readonly aniosElegibles = computed(() =>
    this.anios()
      .filter((a) => a.estado !== 'CERRADO')
      .sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio)),
  );
  protected readonly infoPaso = computed(() => PASOS.find((p) => p.id === this.paso())!);

  ngOnInit(): void {
    this.cargarInicial();
  }

  // ---------------------------------------------------------------- carga

  /**
   * Carga lo que se necesita al abrir: grados, niveles y mallas (una sola vez), y luego los años, los docentes, los conceptos y todo lo del año elegido.
   * Después de cada acción solo se vuelve a pedir lo que cambió ({@link cargarClaves}): así no se gastan decenas de peticiones por cada clic.
   */
  private cargarInicial(): void {
    this.cargando.set(true);
    this.cargarGrados(() => {
      this.cargarClaves(['anios', 'docentes', 'conceptos'], () => {
        if (!this.anioId()) this.anioId.set(anioPorAbrir(this.anios())?.id ?? 0);
        this.cargarAnioCompleto(true);
      });
    });
  }

  /** Grados ofrecidos, niveles, mallas y el catálogo completo de grados (con su casilla «se ofrece»). */
  private cargarGrados(despues: () => void): void {
    forkJoin({
      grados: reintentar429(this.api.grados()).pipe(catchError(() => of(null))),
      niveles: reintentar429(this.api.niveles()).pipe(catchError(() => of(null))),
      catalogo: reintentar429(this.api.ofertaGrados()).pipe(catchError(() => of(null))),
    }).subscribe((b) => {
      if (b.grados) this.grados.set(b.grados.filter((g) => g.activo));
      if (b.niveles) this.niveles.set(b.niveles);
      if (b.catalogo) this.catalogo.set(b.catalogo);
      const gs = this.grados();
      (gs.length
        ? forkJoin(
            gs.map((g) => reintentar429(this.api.malla(g.id)).pipe(catchError(() => of(null)))),
          )
        : of([] as (MallaGrado | null)[])
      ).subscribe((ms) => {
        this.mallas.set(Object.fromEntries(gs.map((g, i) => [g.id, ms[i]])));
        despues();
      });
    });
  }

  /** Todo lo del año elegido y, para «copiar tarifas», las tarifas del año anterior más reciente que las tenga. */
  private cargarAnioCompleto(inicial = false): void {
    if (!this.anioId()) {
      this.cargando.set(false);
      return;
    }
    // Para «copiar tarifas»: el año anterior MÁS RECIENTE que tenga tarifas (se miran los 3 últimos).
    const anteriores = this.anios()
      .filter((a) => a.id !== this.anioId() && a.fechaInicio < (this.anio()?.fechaInicio ?? ''))
      .sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio))
      .slice(0, 3);
    (anteriores.length
      ? forkJoin(
          anteriores.map((a) =>
            reintentar429(this.pagos.tarifas(a.id)).pipe(
              catchError(() => of([] as Tarifa[])),
              map((t) => ({ anio: a, tarifas: t.filter((x) => x.activo) })),
            ),
          ),
        ).pipe(map((l) => l.find((x) => x.tarifas.length) ?? null))
      : of(null)
    ).subscribe((previas) => {
      this.tarifasPrevias.set(previas?.tarifas ?? []);
      this.anioAnterior.set(previas?.anio ?? null);
    });
    // Las secciones del año anterior (el más reciente de antes) se sugieren como casillas del paso «Secciones».
    const anterior = this.anios()
      .filter((x) => x.id !== this.anioId() && x.fechaInicio < (this.anio()?.fechaInicio ?? ''))
      .sort((x, y) => y.fechaInicio.localeCompare(x.fechaInicio))[0];
    (anterior
      ? reintentar429(this.api.secciones(anterior.id)).pipe(catchError(() => of([] as Seccion[])))
      : of([] as Seccion[])
    ).subscribe((l) => this.seccionesPrevias.set(l.filter((x) => x.activo)));
    this.cargarClaves(
      ['periodos', 'feriados', 'secciones', 'asignaciones', 'tarifas', 'campanias'],
      () => {
        this.cargando.set(false);
        if (inicial) this.prepararPaso();
      },
    );
  }

  /**
   * Vuelve a pedir SOLO las listas indicadas. Si una consulta falla (servicio caído o demasiadas peticiones seguidas) se conserva lo que ya había
   * en pantalla y se avisa, en vez de mostrar la lista como vacía.
   */
  private cargarClaves(claves: readonly Clave[], despues?: () => void): void {
    const id = this.anioId();
    const fuentes: Record<Clave, () => Observable<unknown>> = {
      anios: () => this.api.anios(),
      docentes: () =>
        this.api
          .docentes('', 0, 200)
          .pipe(map((p) => p.contenido.filter((d) => d.estado === 'ACTIVO'))),
      conceptos: () => this.pagos.conceptos(),
      periodos: () => this.api.periodos(id),
      feriados: () => this.api.feriados(id),
      secciones: () => this.api.secciones(id),
      asignaciones: () => this.api.asignaciones(undefined, undefined, id),
      tarifas: () => this.pagos.tarifas(id),
      campanias: () => this.matriculas.campanias(id),
    };
    const poner: Record<Clave, (v: never) => void> = {
      anios: (v) => this.anios.set(v),
      docentes: (v) => this.docentes.set(v),
      conceptos: (v) => this.conceptos.set(v),
      periodos: (v) => this.periodos.set(v),
      feriados: (v) => this.feriados.set(v),
      secciones: (v) => this.secciones.set(v),
      asignaciones: (v) => this.asignaciones.set(v),
      tarifas: (v) => this.tarifas.set(v),
      campanias: (v) => this.campanias.set(v),
    };
    const pedidos = Object.fromEntries(
      claves.map((c) => [
        c,
        reintentar429(fuentes[c]()).pipe(
          map((v) => ({ ok: true as const, v })),
          catchError(() => of({ ok: false as const, v: null })),
        ),
      ]),
    );
    forkJoin(pedidos).subscribe((r) => {
      const fallidas: string[] = [];
      for (const c of claves) {
        const x = (r as Record<string, { ok: boolean; v: unknown }>)[c];
        if (x.ok) poner[c](x.v as never);
        else fallidas.push(c);
      }
      if (fallidas.length)
        this.mensaje.set({
          tipo: 'aviso',
          texto:
            'No se pudo actualizar la pantalla (demasiadas consultas seguidas o un servicio no responde). Espera unos segundos y pulsa «Actualizar».',
        });
      despues?.();
    });
  }

  /** Vuelve a consultar todo lo del año (por si la actualización falló). */
  protected actualizar(): void {
    this.mensaje.set(null);
    this.cargarClaves(['anios', 'docentes', 'conceptos'], () => this.cargarAnioCompleto());
  }

  /** Corre una lista de tareas una tras otra y devuelve cuántas salieron bien y los mensajes de las que fallaron. */
  private async lote<T>(
    items: readonly T[],
    tarea: (x: T) => Promise<unknown>,
    nombre: (x: T) => string,
  ): Promise<{ hechas: number; fallos: string[] }> {
    let hechas = 0;
    const fallos: string[] = [];
    for (const x of items) {
      try {
        for (let intento = 0; ; intento++) {
          try {
            await tarea(x);
            break;
          } catch (e) {
            if (es429(e) && intento < 5) {
              await pausa(2500);
              continue;
            }
            throw e;
          }
        }
        hechas++;
      } catch (e) {
        fallos.push(`${nombre(x)}: ${mensajeError(e)}`);
      }
      await pausa(PAUSA_ENTRE_PETICIONES_MS);
    }
    return { hechas, fallos };
  }

  private informar(hechas: number, singular: string, plural: string, fallos: string[]): void {
    if (!fallos.length)
      this.mensaje.set({
        tipo: 'ok',
        texto: `${hechas} ${hechas === 1 ? singular : plural} ${hechas === 1 ? 'guardado' : 'guardados'}.`,
      });
    else
      this.mensaje.set({
        tipo: hechas ? 'aviso' : 'error',
        texto: `${hechas ? hechas + ' guardados. ' : ''}No se pudo: ${fallos.slice(0, 3).join(' · ')}${fallos.length > 3 ? '…' : ''}`,
      });
    if (hechas) this.cambio.emit();
  }

  private terminar(...claves: Clave[]): void {
    this.ocupado.set(false);
    this.cargarClaves(claves.length ? claves : ['anios']);
  }

  // ---------------------------------------------------------------- navegación

  protected cerrarAsistente(): void {
    this.cerrar.emit();
  }

  protected ir(p: PasoId): void {
    const falta = this.bloqueo(p);
    if (falta) {
      this.mensaje.set({
        tipo: 'aviso',
        texto: `Antes completa «${this.tituloDe(falta)}»: es indispensable para poder matricular.`,
      });
      this.paso.set(falta);
      this.prepararPaso();
      return;
    }
    this.mensaje.set(null);
    this.paso.set(p);
    this.prepararPaso();
  }

  private indice(): number {
    return PASOS.findIndex((p) => p.id === this.paso());
  }

  /** ¿Está cumplido lo que ese paso exige para poder matricular? (la campaña basta con que exista: abrirla y abrir el año se puede hacer después). */
  protected completo(id: PasoId): boolean {
    return id === 'campania'
      ? this.campanias().some((c) => c.estado === 'ABIERTA' || c.estado === 'PLANIFICADA')
      : this.estadoPaso(id) === 'ok';
  }

  /** El primer paso indispensable que todavía falta antes de `destino` (o el mismo paso actual si es indispensable y está incompleto). */
  protected bloqueo(destino: PasoId): PasoId | null {
    const hasta = PASOS.findIndex((p) => p.id === destino);
    return PASOS.slice(0, hasta).find((p) => p.requerido && !this.completo(p.id))?.id ?? null;
  }

  protected tituloDe(id: PasoId): string {
    return PASOS.find((p) => p.id === id)!.titulo;
  }

  protected puedeAvanzar(): boolean {
    const i = this.indice();
    return i >= PASOS.length - 1 || !PASOS[i].requerido || this.completo(PASOS[i].id);
  }

  protected siguiente(): void {
    const i = this.indice();
    if (!this.puedeAvanzar()) {
      this.mensaje.set({
        tipo: 'aviso',
        texto: `Completa «${PASOS[i].titulo}» para seguir: es indispensable para poder matricular.`,
      });
      return;
    }
    if (i < PASOS.length - 1) this.ir(PASOS[i + 1].id);
  }
  protected atras(): void {
    const i = this.indice();
    if (i > 0) this.ir(PASOS[i - 1].id);
  }

  /** Lo que cada paso propone al abrirse (campaña, feriados marcados…). */
  private prepararPaso(): void {
    const a = this.anio();
    if (this.paso() === 'campania' && a) this.campaniaNueva.set(proponerCampania(a, hoyLocal()));
    if (this.paso() === 'feriados')
      this.feriadosSel.set(new Set(this.feriadosSugeridos().map((f) => f.fecha)));
  }

  protected estadoPaso(id: PasoId): 'ok' | 'pendiente' {
    switch (id) {
      case 'anio':
        return this.anioId() ? 'ok' : 'pendiente';
      case 'periodos':
        return this.periodos().length ? 'ok' : 'pendiente';
      case 'feriados':
        return this.feriados().length ? 'ok' : 'pendiente';
      case 'secciones':
        return this.filasAbiertas().length && this.filasAbiertas().every((f) => f.activas.length)
          ? 'ok'
          : 'pendiente';
      case 'docentes':
        return this.secciones().some((s) => s.activo) && this.pendientes().length === 0
          ? 'ok'
          : 'pendiente';
      case 'tarifas':
        return !this.tarifasPendientes() && this.nivelesConGrados().length ? 'ok' : 'pendiente';
      case 'campania':
        return this.campanias().some((c) => c.estado === 'ABIERTA') ? 'ok' : 'pendiente';
      case 'listo':
        return this.listo().puedeMatricular ? 'ok' : 'pendiente';
    }
  }

  // ---------------------------------------------------------------- 1. año

  protected readonly creandoAnio = signal(false);
  protected readonly anioNuevo = signal({ nombre: '', fechaInicio: '', fechaFin: '' });
  private nombreAnioAnterior = '';
  protected readonly avisosAnioNuevo = computed(() => {
    const a = this.anioNuevo();
    return avisosDelAnio(a.nombre, a.fechaInicio, a.fechaFin, this.anios());
  });

  protected elegirAnio(id: number): void {
    this.anioId.set(id);
    this.mensaje.set(null);
    this.cargando.set(true);
    this.cargarAnioCompleto();
  }

  protected empezarAnioNuevo(): void {
    const p = proponerAnio(this.anios());
    this.anioNuevo.set(p);
    this.nombreAnioAnterior = p.nombre;
    this.creandoAnio.set(true);
  }

  /** Al escribir otro año («2028») las fechas lo siguen mientras sigan siendo las propuestas. */
  protected cambiarNombreAnio(nombre: string): void {
    const a = this.anioNuevo();
    const antes = fechasDelAnio(this.nombreAnioAnterior);
    const sinTocar =
      (!a.fechaInicio && !a.fechaFin) ||
      (!!antes && a.fechaInicio === antes.fechaInicio && a.fechaFin === antes.fechaFin);
    const nuevas = fechasDelAnio(nombre);
    this.anioNuevo.set(nuevas && sinTocar ? { nombre, ...nuevas } : { ...a, nombre });
    this.nombreAnioAnterior = nombre;
  }

  protected fechasHabituales(): void {
    const f = fechasDelAnio(this.anioNuevo().nombre);
    if (f) this.anioNuevo.update((a) => ({ ...a, ...f }));
    else
      this.mensaje.set({
        tipo: 'aviso',
        texto:
          'Escribe el nombre como un año de 4 dígitos (por ejemplo 2028) para proponer las fechas.',
      });
  }

  protected crearAnio(): void {
    const a = this.anioNuevo();
    this.ocupado.set(true);
    reintentar429(
      this.api.crearAnio({
        nombre: a.nombre.trim(),
        fechaInicio: a.fechaInicio,
        fechaFin: a.fechaFin,
      }),
    ).subscribe({
      next: (creado) => {
        this.creandoAnio.set(false);
        this.anioId.set(creado.id);
        this.mensaje.set({ tipo: 'ok', texto: `Año ${creado.nombre} creado.` });
        this.cambio.emit();
        this.ocupado.set(false);
        this.cargando.set(true);
        this.cargarClaves(['anios'], () => this.cargarAnioCompleto());
      },
      error: (e) => {
        this.ocupado.set(false);
        this.mensaje.set({ tipo: 'error', texto: mensajeError(e, 'No se pudo crear el año.') });
      },
    });
  }

  // ---------------------------------------------------------------- 2. periodos

  protected readonly regimen = signal<Regimen>('BIMESTRE');
  protected readonly periodosPropuestos = computed(() => {
    const a = this.anio();
    return a ? proponerPeriodos(this.regimen(), a.fechaInicio, a.fechaFin) : [];
  });

  protected async crearPeriodos(): Promise<void> {
    const a = this.anio();
    if (!a) return;
    this.ocupado.set(true);
    const r = await this.lote(
      this.periodosPropuestos(),
      (p) => firstValueFrom(this.api.crearPeriodo({ anioId: a.id, ...p })),
      (p) => p.nombre,
    );
    this.informar(r.hechas, 'periodo', 'periodos', r.fallos);
    this.terminar('periodos');
  }

  // ---------------------------------------------------------------- 3. feriados

  protected readonly feriadosSel = signal<ReadonlySet<string>>(new Set());
  protected readonly feriadosSugeridos = computed(() => {
    const a = this.anio();
    return a
      ? feriadosFijosDelAnio(
          a,
          this.feriados().map((f) => f.fecha),
        )
      : [];
  });

  protected alternarFeriado(fecha: string): void {
    const s = new Set(this.feriadosSel());
    if (s.has(fecha)) s.delete(fecha);
    else s.add(fecha);
    this.feriadosSel.set(s);
  }

  protected async cargarFeriados(): Promise<void> {
    const a = this.anio();
    if (!a) return;
    this.ocupado.set(true);
    const elegidos = this.feriadosSugeridos().filter((f) => this.feriadosSel().has(f.fecha));
    const r = await this.lote(
      elegidos,
      (f) =>
        firstValueFrom(
          this.api.crearFeriado({ anioId: a.id, fecha: f.fecha, descripcion: f.descripcion }),
        ),
      (f) => f.descripcion,
    );
    this.informar(r.hechas, 'feriado', 'feriados', r.fallos);
    this.terminar('feriados');
    this.feriadosSel.set(new Set());
  }

  // ---------------------------------------------------------------- 4. secciones

  protected readonly filasSecciones = computed(() =>
    filasDeSecciones(this.grados(), this.secciones(), this.mallas()),
  );
  /** Los grados que sí se abren en este periodo (sin los que se dejaron sin abrir). */
  private readonly filasAbiertas = computed(() =>
    this.filasSecciones().filter((f) => !this.sinAbrir().has(f.grado.id)),
  );
  private readonly seccionesPrevias = signal<Seccion[]>([]);
  private readonly confSecciones = signal<Record<number, ConfSeccion>>({});
  /** Las letras extra agregadas con «+ Otra sección», por grado. */
  private readonly extrasSecc = signal<Record<number, string[]>>({});
  /** Lo que la persona marcó por grado; mientras no toque un grado, vale la selección inicial (A, o las del año anterior). */
  private readonly marcadasSecc = signal<Record<number, string[]>>({});

  protected readonly catalogoPorNivel = computed(() => {
    const m = new Map<string, GradoOfertaCfg[]>();
    for (const e of this.catalogo()) m.set(e.nivelNombre, [...(m.get(e.nivelNombre) ?? []), e]);
    return [...m.entries()].map(([nombre, grados]) => ({
      nombre,
      grados: grados.sort((a, b) => a.numero - b.numero),
    }));
  });

  /** La fila de secciones de un grado del catálogo, solo si ese grado ya se ofrece. */
  protected filaDe(e: GradoOfertaCfg): FilaSecciones | undefined {
    return e.seleccionado && e.gradoId && !this.sinAbrir().has(e.gradoId)
      ? this.filasSecciones().find((f) => f.grado.id === e.gradoId)
      : undefined;
  }

  /** Grados que el colegio sigue ofreciendo pero que NO se abren en este periodo (no se les crean secciones). */
  protected readonly sinAbrir = signal<ReadonlySet<number>>(new Set());

  protected marcadoGrado(e: GradoOfertaCfg): boolean {
    return e.seleccionado && !(e.gradoId && this.sinAbrir().has(e.gradoId));
  }

  /**
   * Marca o quita un grado.
   * - Un grado que el colegio no ofrece se agrega a la oferta (servidor) y aparecen sus secciones.
   * - Un grado que ya tiene historia (secciones o cursos en su malla) NO se borra de la oferta: desmarcarlo solo significa «no abrirlo en este periodo».
   * - Uno sin historia se quita de la oferta.
   */
  protected async alternarGrado(e: GradoOfertaCfg, ev?: Event): Promise<void> {
    const casilla = ev?.target as HTMLInputElement | undefined;
    // El navegador ya cambió la casilla: después se deja como dice el estado real.
    const restaurar = () =>
      queueMicrotask(() => {
        if (casilla)
          casilla.checked = this.marcadoGrado(
            this.catalogo().find((x) => x.nivelCodigo === e.nivelCodigo && x.numero === e.numero) ??
              e,
          );
      });
    if (e.seleccionado && e.gradoId) {
      const id = e.gradoId;
      const omitido = this.sinAbrir().has(id);
      if (omitido) {
        this.sinAbrir.update((s) => {
          const n = new Set(s);
          n.delete(id);
          return n;
        });
        this.mensaje.set({ tipo: 'ok', texto: `${e.nombre} se abre otra vez en este periodo.` });
        restaurar();
        return;
      }
      if (this.filasSecciones().find((f) => f.grado.id === id)?.activas.length) {
        this.mensaje.set({
          tipo: 'aviso',
          texto: `${e.nombre} ya tiene secciones activas en este año: no se puede dejar sin abrir desde aquí.`,
        });
        restaurar();
        return;
      }
      if (e.enUso) {
        this.sinAbrir.update((s) => new Set(s).add(id));
        this.mensaje.set({
          tipo: 'ok',
          texto: `${e.nombre} sigue en el colegio, pero no se abrirá en este periodo (no se le crean secciones).`,
        });
        restaurar();
        return;
      }
    }
    this.ocupado.set(true);
    const sel = this.catalogo()
      .filter((x) => (x === e ? !x.seleccionado : x.seleccionado))
      .map((x) => ({ nivelCodigo: x.nivelCodigo, numero: x.numero }));
    try {
      await firstValueFrom(reintentar429(this.api.guardarOfertaGrados(sel)));
      await new Promise<void>((res) => this.cargarGrados(res));
      this.mensaje.set({
        tipo: 'ok',
        texto: e.seleccionado
          ? `Se quitó ${e.nombre} de la oferta.`
          : `${e.nombre} ahora se ofrece: agrégale sus secciones.`,
      });
    } catch (err) {
      this.mensaje.set({ tipo: 'error', texto: mensajeError(err) });
      await new Promise<void>((res) => this.cargarGrados(res));
    } finally {
      this.ocupado.set(false);
      restaurar();
    }
  }

  /** Todas las secciones que se pueden marcar en un grado: las que existen (activas e inactivas), las del año anterior, A–D y las extras. */
  protected opcionesGrado(gradoId: number): OpcionSeccion[] {
    return opcionesDeSecciones(
      this.secciones().filter((s) => s.gradoId === gradoId),
      this.seccionesPrevias()
        .filter((s) => s.gradoId === gradoId)
        .map((s) => s.nombre),
      this.extrasSecc()[gradoId] ?? [],
    );
  }

  /** Lo que se muestra de un grado: la «A», lo que ya existe, lo sugerido del año anterior y lo que se fue agregando con «+». Las demás letras no estorban. */
  protected opcionesVisibles(gradoId: number): OpcionSeccion[] {
    const m = this.marcadasDe(gradoId);
    return this.opcionesGrado(gradoId).filter(
      (o) =>
        o.nombre === 'A' || o.estado !== 'nueva' || o.delAnterior || o.extra || m.has(o.nombre),
    );
  }

  private marcadasDe(gradoId: number): Set<string> {
    return new Set(this.marcadasSecc()[gradoId] ?? seleccionInicial(this.opcionesGrado(gradoId)));
  }

  protected marcada(gradoId: number, o: OpcionSeccion): boolean {
    return o.estado === 'activa' || this.marcadasDe(gradoId).has(o.nombre);
  }

  protected alternarSeccion(gradoId: number, o: OpcionSeccion): void {
    if (o.estado === 'activa') return;
    const m = this.marcadasDe(gradoId);
    if (m.has(o.nombre)) m.delete(o.nombre);
    else m.add(o.nombre);
    this.marcadasSecc.update((x) => ({ ...x, [gradoId]: [...m] }));
  }

  protected marcarTodas(gradoId: number, on: boolean): void {
    this.marcadasSecc.update((x) => ({
      ...x,
      [gradoId]: on
        ? this.opcionesGrado(gradoId)
            .filter((o) => o.estado !== 'activa')
            .map((o) => o.nombre)
        : [],
    }));
  }

  /** «+ Otra sección»: agrega la próxima letra libre y la deja marcada. */
  protected agregarExtra(gradoId: number): void {
    const letra = siguienteLetra(this.opcionesVisibles(gradoId).map((o) => o.nombre));
    if (!letra) {
      this.mensaje.set({ tipo: 'aviso', texto: 'Ya están todas las letras de la A a la Z.' });
      return;
    }
    this.extrasSecc.update((x) => ({ ...x, [gradoId]: [...(x[gradoId] ?? []), letra] }));
    const m = this.marcadasDe(gradoId);
    m.add(letra);
    this.marcadasSecc.update((x) => ({ ...x, [gradoId]: [...m] }));
  }

  protected etiquetaOpcion(o: OpcionSeccion): string {
    if (o.estado === 'activa')
      return `ya existe · ${o.seccion?.turno === 'TARDE' ? 'tarde' : 'mañana'} · ${o.seccion?.capacidad} vac.`;
    if (o.estado === 'inactiva') return 'inactiva · se reactiva';
    return o.delAnterior ? 'del año anterior' : o.extra ? 'extra' : 'nueva';
  }

  /** Turno y vacantes de las secciones nuevas de un grado: lo que se cambió, o lo que tuvo el año anterior, o mañana y 30. */
  protected conf(gradoId: number): ConfSeccion {
    const previa = this.seccionesPrevias().find((s) => s.gradoId === gradoId);
    return (
      this.confSecciones()[gradoId] ?? {
        cantidad: 1,
        turno: previa?.turno ?? 'MANANA',
        capacidad: previa?.capacidad ?? 30,
      }
    );
  }

  protected cambiarConf(gradoId: number, campo: keyof ConfSeccion, valor: number | string): void {
    this.confSecciones.update((c) => ({
      ...c,
      [gradoId]: { ...this.conf(gradoId), [campo]: valor },
    }));
  }

  /** Lo marcado que todavía no es una sección activa: lo que se va a crear o reactivar. */
  private pendientesDeGrado(gradoId: number): OpcionSeccion[] {
    if (this.sinAbrir().has(gradoId)) return [];
    const m = this.marcadasDe(gradoId);
    return this.opcionesGrado(gradoId).filter((o) => o.estado !== 'activa' && m.has(o.nombre));
  }

  protected hayPorCrear(gradoId: number): boolean {
    return this.pendientesDeGrado(gradoId).some((o) => o.estado === 'nueva');
  }

  protected readonly seccionesPorCrear = computed(() =>
    this.grados().reduce((t, g) => t + this.pendientesDeGrado(g.id).length, 0),
  );

  protected textoBotonSecciones(): string {
    const todas = this.grados().flatMap((g) => this.pendientesDeGrado(g.id));
    const nuevas = todas.filter((o) => o.estado === 'nueva').length;
    const reactivar = todas.length - nuevas;
    const partes = [
      nuevas ? `Crear ${nuevas} ${nuevas === 1 ? 'sección' : 'secciones'}` : '',
      reactivar ? `${nuevas ? 'reactivar' : 'Reactivar'} ${reactivar}` : '',
    ].filter(Boolean);

    return partes.join(' y ');
  }

  protected async crearSecciones(): Promise<void> {
    const a = this.anio();
    if (!a) return;
    const trabajos: { grado: Grado; o: OpcionSeccion; c: ConfSeccion }[] = [];
    for (const g of this.grados())
      for (const o of this.pendientesDeGrado(g.id))
        trabajos.push({ grado: g, o, c: this.conf(g.id) });
    this.ocupado.set(true);
    const r = await this.lote(
      trabajos,
      (t) => {
        if (t.o.estado === 'inactiva' && t.o.seccion) {
          const x = t.o.seccion;
          return firstValueFrom(
            this.api.actualizarSeccion(x.id, {
              anioId: x.anioId,
              gradoId: x.gradoId,
              aulaId: x.aulaId ?? null,
              nombre: x.nombre,
              turno: x.turno,
              capacidad: x.capacidad,
              tutorDocenteId: x.tutorDocenteId ?? null,
              activo: true,
            }),
          );
        }
        return firstValueFrom(
          this.api.crearSeccion({
            anioId: a.id,
            gradoId: t.grado.id,
            aulaId: null,
            nombre: t.o.nombre,
            turno: t.c.turno,
            capacidad: Math.max(1, Math.trunc(t.c.capacidad || 30)),
            tutorDocenteId: null,
            activo: true,
          }),
        );
      },
      (t) => `${t.grado.nombre} ${t.o.nombre}`,
    );
    this.informar(r.hechas, 'sección', 'secciones', r.fallos);
    this.marcadasSecc.set({});
    this.extrasSecc.set({});
    this.terminar('secciones');
  }

  // ---------------------------------------------------------------- 5. docentes

  protected readonly pendientes = computed(() =>
    cursosPendientes(this.secciones(), this.mallas(), this.asignaciones()),
  );
  protected readonly eleccion = signal<Record<string, number>>({});
  protected readonly elegidos = computed(
    () => this.pendientes().filter((p) => (this.eleccion()[p.clave] ?? 0) > 0).length,
  );

  protected nombreGrado(gradoId: number): string {
    return this.grados().find((g) => g.id === gradoId)?.nombre ?? '';
  }

  protected elegirDocente(clave: string, docenteId: number): void {
    this.eleccion.update((e) => ({ ...e, [clave]: docenteId }));
  }

  /** Los docentes para elegir en un curso: SOLO los activos que tienen ese curso en su lista (el que eligieron al registrarlos), por apellido. */
  protected docentesPara(p: CursoPendiente): Docente[] {
    return this.docentes()
      .filter((d) => d.estado === 'ACTIVO' && !!d.cursoIds?.includes(p.cursoId))
      .sort(
        (a, b) =>
          a.apellidos.localeCompare(b.apellidos, 'es') || a.nombres.localeCompare(b.nombres, 'es'),
      );
  }

  protected sugerirTodos(): void {
    const s = sugerirDocentes(this.pendientes(), this.docentes(), this.asignaciones());
    this.eleccion.update((e) => ({ ...e, ...s }));
    const n = Object.keys(s).length;
    this.mensaje.set(
      n
        ? {
            tipo: 'ok',
            texto: `Se sugirió docente para ${n} de ${this.pendientes().length} cursos (entre los que ya tienen ese curso en su lista). Revisa y pulsa «Asignar».`,
          }
        : {
            tipo: 'aviso',
            texto: 'Ningún docente tiene esos cursos en su lista: elígelos a mano.',
          },
    );
  }

  protected async asignarDocentes(): Promise<void> {
    const trabajos = this.pendientes()
      .filter((p) => (this.eleccion()[p.clave] ?? 0) > 0)
      .flatMap((p) => p.secciones.map((s) => ({ p, s, docenteId: this.eleccion()[p.clave] })));
    if (!trabajos.length) return;
    this.ocupado.set(true);
    const r = await this.lote(
      trabajos,
      (t) =>
        firstValueFrom(
          this.api.crearAsignacion({
            seccionId: t.s.id,
            cursoId: t.p.cursoId,
            docenteId: t.docenteId,
          }),
        ),
      (t) => `${t.p.cursoNombre} (${t.s.gradoNombre} ${t.s.nombre})`,
    );
    // Quien dicta un curso queda como apto de ese curso (su lista de cursos), como en el cuadro del curso.
    const nuevos = new Map<number, Set<number>>();
    for (const t of trabajos) {
      const d = this.docentes().find((x) => x.id === t.docenteId);
      if (d && !d.cursoIds?.includes(t.p.cursoId))
        nuevos.set(d.id, (nuevos.get(d.id) ?? new Set<number>()).add(t.p.cursoId));
    }
    for (const [id, cursos] of nuevos) {
      const d = this.docentes().find((x) => x.id === id)!;
      const body: DocenteRequest = {
        tipoDocumento: d.tipoDocumento,
        numeroDocumento: d.numeroDocumento,
        nombres: d.nombres,
        apellidos: d.apellidos,
        email: d.email,
        telefono: d.telefono,
        especialidad: d.especialidad,
        cargo: d.cargo,
        areaId: d.areaId,
        cursoIds: [...new Set([...(d.cursoIds ?? []), ...cursos])],
      };
      await firstValueFrom(this.api.actualizarDocente(id, body).pipe(catchError(() => of(null))));
    }
    this.informar(r.hechas, 'asignación', 'asignaciones', r.fallos);
    this.eleccion.set({});
    this.terminar('asignaciones', 'docentes');
  }

  // ---------------------------------------------------------------- 6. tarifas

  protected readonly nivelesConGrados = computed(() => {
    const porNivel = new Map<number, Grado[]>();
    for (const g of this.grados()) porNivel.set(g.nivelId, [...(porNivel.get(g.nivelId) ?? []), g]);
    const faltan = new Map(tarifasFaltantes(porNivel, this.tarifas()).map((f) => [f.nivelId, f]));
    return [...porNivel.entries()]
      .map(([id, grados]) => ({
        nivel:
          this.niveles().find((n) => n.id === id) ??
          ({ id, nombre: grados[0].nivelNombre } as Nivel),
        grados,
        falta: faltan.get(id)!,
      }))
      .sort((a, b) => (a.nivel.orden ?? a.nivel.id) - (b.nivel.orden ?? b.nivel.id));
  });
  protected readonly tarifasPendientes = computed(() =>
    this.nivelesConGrados().some((n) => n.falta.faltaMatricula || n.falta.faltaPension),
  );
  private readonly confTarifas = signal<Record<number, ConfTarifa>>({});
  /** El año anterior más reciente que tiene tarifas (de donde se pueden copiar). */
  protected readonly anioAnterior = signal<Anio | null>(null);

  protected confTarifa(nivelId: number): ConfTarifa {
    return (
      this.confTarifas()[nivelId] ?? { matricula: null, pension: null, cuotas: 10, mes: 3, dia: 5 }
    );
  }

  protected cambiarTarifa(
    nivelId: number,
    campo: keyof ConfTarifa,
    valor: string | number | null,
  ): void {
    const v = valor === '' || valor === null ? null : Number(valor);
    this.confTarifas.update((c) => ({
      ...c,
      [nivelId]: { ...this.confTarifa(nivelId), [campo]: v },
    }));
  }

  protected montoTarifa(nivelId: number, codigo: string): string {
    const t =
      this.tarifas().find(
        (x) => x.activo && x.nivelId === nivelId && x.conceptoCodigo === codigo && !x.gradoId,
      ) ??
      this.tarifas().find((x) => x.activo && x.nivelId === nivelId && x.conceptoCodigo === codigo);
    return t ? soles(t.monto) + (codigo === 'PENSION' ? ` en ${t.numCuotas} cuotas` : '') : '';
  }

  protected readonly tarifasPorGuardar = computed(() =>
    this.nivelesConGrados().reduce((t, n) => {
      const c = this.confTarifa(n.nivel.id);
      return (
        t +
        (n.falta.faltaMatricula && (c.matricula ?? -1) >= 0 ? 1 : 0) +
        (n.falta.faltaPension && (c.pension ?? -1) >= 0 ? 1 : 0)
      );
    }, 0),
  );

  /** Las tarifas del año anterior que a este año le faltan (se pueden copiar tal cual, con el mismo monto y las mismas cuotas). */
  protected readonly copiable = computed(() => {
    const falta = new Map(this.nivelesConGrados().map((n) => [n.nivel.id, n.falta]));
    return this.tarifasPrevias().filter(
      (t) =>
        t.activo &&
        !t.gradoId &&
        (t.conceptoCodigo === 'MATRICULA'
          ? falta.get(t.nivelId)?.faltaMatricula
          : t.conceptoCodigo === 'PENSION'
            ? falta.get(t.nivelId)?.faltaPension
            : false),
    );
  });

  /** Crea los conceptos «Matrícula» y «Pensión» si el colegio aún no los tiene (las cuotas se generan a partir de ellos). */
  private async conceptoId(codigo: 'MATRICULA' | 'PENSION'): Promise<number> {
    const hay = this.conceptos().find(
      (c) => c.activo && (c.codigo === codigo || c.tipo === codigo),
    );
    if (hay) return hay.id;
    const creado = await firstValueFrom(
      this.pagos.crearConcepto({
        codigo,
        nombre: codigo === 'MATRICULA' ? 'Matrícula' : 'Pensión',
        tipo: codigo,
        activo: true,
      }),
    );
    this.conceptos.update((c) => [...c, creado]);
    return creado.id;
  }

  protected async copiarTarifas(): Promise<void> {
    const a = this.anio();
    if (!a) return;
    this.ocupado.set(true);
    const r = await this.lote(
      this.copiable(),
      async (t) =>
        firstValueFrom(
          this.pagos.crearTarifa({
            anioId: a.id,
            nivelId: t.nivelId,
            gradoId: null,
            conceptoId: await this.conceptoId(t.conceptoCodigo as 'MATRICULA' | 'PENSION'),
            monto: t.monto,
            numCuotas: t.numCuotas,
            mesInicio: t.mesInicio,
            diaVencimiento: t.diaVencimiento,
            activo: true,
          }),
        ),
      (t) => `${t.conceptoNombre}`,
    );
    this.informar(r.hechas, 'tarifa copiada', 'tarifas copiadas', r.fallos);
    this.terminar('tarifas', 'conceptos');
  }

  protected async guardarTarifas(): Promise<void> {
    const a = this.anio();
    if (!a) return;
    const trabajos: {
      nivelId: number;
      nombre: string;
      codigo: 'MATRICULA' | 'PENSION';
      monto: number;
      c: ConfTarifa;
    }[] = [];
    for (const n of this.nivelesConGrados()) {
      const c = this.confTarifa(n.nivel.id);
      if (n.falta.faltaMatricula && (c.matricula ?? -1) >= 0)
        trabajos.push({
          nivelId: n.nivel.id,
          nombre: `Matrícula de ${n.nivel.nombre}`,
          codigo: 'MATRICULA',
          monto: c.matricula!,
          c,
        });
      if (n.falta.faltaPension && (c.pension ?? -1) >= 0)
        trabajos.push({
          nivelId: n.nivel.id,
          nombre: `Pensión de ${n.nivel.nombre}`,
          codigo: 'PENSION',
          monto: c.pension!,
          c,
        });
    }
    this.ocupado.set(true);
    const r = await this.lote(
      trabajos,
      async (t) =>
        firstValueFrom(
          this.pagos.crearTarifa({
            anioId: a.id,
            nivelId: t.nivelId,
            gradoId: null,
            conceptoId: await this.conceptoId(t.codigo),
            monto: t.monto,
            numCuotas:
              t.codigo === 'MATRICULA'
                ? 1
                : Math.min(12, Math.max(1, Math.trunc(t.c.cuotas || 10))),
            mesInicio: t.codigo === 'MATRICULA' ? 1 : t.c.mes || 3,
            diaVencimiento: t.c.dia || 5,
            activo: true,
          }),
        ),
      (t) => t.nombre,
    );
    this.informar(r.hechas, 'tarifa', 'tarifas', r.fallos);
    this.terminar('tarifas', 'conceptos');
  }

  // ---------------------------------------------------------------- 7. campaña

  protected readonly creandoCampania = signal(false);
  protected readonly campaniaNueva = signal({ nombre: '', fechaInicio: '', fechaFin: '' });
  protected readonly campaniaValida = computed(() => {
    const c = this.campaniaNueva();
    return !!c.nombre.trim() && !!c.fechaInicio && !!c.fechaFin && c.fechaFin >= c.fechaInicio;
  });
  protected readonly campaniaPlanificada = computed(
    () => this.campanias().find((c) => c.estado === 'PLANIFICADA') ?? null,
  );

  protected empezarCampania(): void {
    const a = this.anio();
    if (a)
      this.campaniaNueva.set({
        ...proponerCampania(a, hoyLocal()),
        nombre: `Matrícula ${a.nombre} (2)`,
      });
    this.creandoCampania.set(true);
  }

  protected crearCampania(abrir: boolean): void {
    const a = this.anio();
    if (!a || !this.campaniaValida()) return;
    const c = this.campaniaNueva();
    this.ocupado.set(true);
    reintentar429(
      this.matriculas.crearCampania({
        anioId: a.id,
        nombre: c.nombre.trim(),
        fechaInicio: c.fechaInicio,
        fechaFin: c.fechaFin,
      }),
    ).subscribe({
      next: (creada) => {
        this.creandoCampania.set(false);
        this.cambio.emit();
        if (!abrir) {
          this.mensaje.set({
            tipo: 'ok',
            texto: `Campaña «${creada.nombre}» creada (aún no está abierta).`,
          });
          this.terminar('campanias');
          return;
        }
        this.abrirCampania(creada);
      },
      error: (e) => {
        this.ocupado.set(false);
        this.mensaje.set({ tipo: 'error', texto: mensajeError(e, 'No se pudo crear la campaña.') });
      },
    });
  }

  protected abrirCampania(c: Campania): void {
    this.ocupado.set(true);
    reintentar429(this.matriculas.abrirCampania(c.id)).subscribe({
      next: () => {
        this.mensaje.set({ tipo: 'ok', texto: `Campaña «${c.nombre}» abierta.` });
        this.cambio.emit();
        this.terminar('campanias');
      },
      error: (e) => {
        this.mensaje.set({ tipo: 'error', texto: mensajeError(e, 'No se pudo abrir la campaña.') });
        this.terminar('campanias');
      },
    });
  }

  // ---------------------------------------------------------------- 8. listo

  protected readonly listo = computed(() =>
    evaluarListo({
      anio: this.anio(),
      grados: this.grados(),
      secciones: this.secciones(),
      tarifas: this.tarifas(),
      campanias: this.campanias(),
      pendientesDocente: this.pendientes().length,
      periodos: this.periodos().length,
    }),
  );

  protected async abrirAnio(): Promise<void> {
    const a = this.anio();
    if (!a) return;
    const activo = this.anios().find((x) => x.estado === 'ACTIVO');
    const aviso = activo
      ? `¿Abrir el año ${a.nombre}? Pasará a ser el año activo y el año ${activo.nombre} dejará de serlo (se cierra). Las matrículas, los horarios y los cobros trabajarán con ${a.nombre}.`
      : `¿Abrir el año ${a.nombre}? Pasará a ser el año activo: las matrículas, los horarios y los cobros trabajarán con él.`;
    if (!(await this.confirmacion.confirmar(aviso, 'Abrir el año'))) return;
    this.ocupado.set(true);
    reintentar429(this.api.activarAnio(a.id)).subscribe({
      next: () => {
        this.avisos.success(`El año ${a.nombre} está abierto.`);
        this.mensaje.set({ tipo: 'ok', texto: `El año ${a.nombre} está abierto.` });
        this.cambio.emit();
        this.terminar('anios');
      },
      error: (e) => {
        this.mensaje.set({ tipo: 'error', texto: mensajeError(e, 'No se pudo abrir el año.') });
        this.terminar('anios');
      },
    });
  }
}
