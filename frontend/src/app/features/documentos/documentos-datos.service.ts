import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Documento } from '../../core/models/alumno.model';
import { EstadoCuenta } from '../../core/models/cobro.model';
import { Colegio, Seccion } from '../../core/models/planificacion.model';
import { AlumnoService } from '../../core/services/alumno.service';
import { CobroService } from '../../core/services/cobro.service';
import { MatriculaService } from '../../core/services/matricula.service';
import { PlanificacionService } from '../../core/services/planificacion.service';
import { DatosDocumento, TipoRequerido, armarRequerido, fechaCorta } from './documentos';
import { crearPdf } from './pdf-simple';

/** Reúne lo que existe del alumno para emitir sus documentos y guarda el PDF generado en su expediente. */
@Injectable({ providedIn: 'root' })
export class DocumentosDatosService {
  private readonly alumnos = inject(AlumnoService);
  private readonly matriculas = inject(MatriculaService);
  private readonly plan = inject(PlanificacionService);
  private readonly cobros = inject(CobroService);

  /** El alumno con su matrícula, secciones, cuenta y los datos del colegio (lo que no se pueda leer queda vacío y el documento lo dice). */
  cargar(alumnoId: number): Observable<DatosDocumento> {
    return this.alumnos.obtener(alumnoId).pipe(
      switchMap(alumno => forkJoin({
        colegio: this.plan.colegio().pipe(catchError(() => of(null as Colegio | null))),
        matriculas: this.matriculas.listar({ texto: alumno.apellidoPaterno || alumno.nombreCompleto.split(' ')[0], size: 100 }).pipe(catchError(() => of(null))),
        secciones: this.plan.secciones().pipe(catchError(() => of([] as Seccion[]))),
        cuenta: this.cobros.estadoCuenta(alumno.id).pipe(catchError(() => of(null as EstadoCuenta | null)))
      }).pipe(map(r => ({
        colegio: r.colegio, alumno, matriculas: (r.matriculas?.contenido ?? []).filter(m => m.alumnoId === alumno.id),
        secciones: r.secciones, cuenta: r.cuenta, fecha: new Date()
      } as DatosDocumento))))
    );
  }

  /** Nombre del archivo: «Constancia de matrícula 2026-11-04.pdf». */
  nombreArchivo(titulo: string, fecha: Date): string {
    const iso = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
    return `${titulo} ${iso}.pdf`;
  }

  /**
   * Genera la ficha de uno de los documentos requeridos (DNI, partida de nacimiento o ficha SIAGIE) con los datos registrados del alumno y la sube a su
   * expediente con ese tipo. Queda «subida, sin verificar»: la ficha no reemplaza al original, y verificar es una decisión de quien lo revisa.
   */
  guardarRequerido(tipo: TipoRequerido, datos: DatosDocumento): Observable<Documento> {
    const fecha = new Date();
    const doc = armarRequerido(tipo, { ...datos, fecha });
    const bytes = crearPdf(doc, datos.colegio);
    const archivo = new File([bytes.buffer as ArrayBuffer], this.nombreArchivo(doc.titulo, fecha), { type: 'application/pdf' });
    return this.alumnos.subirDocumento(datos.alumno.id, tipo, archivo);
  }

  /** «04/11/2026» para mostrar cuándo se emitió. */
  readonly fechaCorta = fechaCorta;
}
