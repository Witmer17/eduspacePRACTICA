#!/usr/bin/env python3
"""
tools/actualizar_guias_con_mappers.py

Inserta las clases Mapper correspondientes directamente dentro de cada una
de las 10 guias de microservicios (01 a 10) en docs/05-manual-completo-proyecto/.
"""

from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT_DIR / "docs" / "05-manual-completo-proyecto"

MAPPERS_POR_GUIA = {
    "01-CODIGO-AUTH-MS.md": """
---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### UsuarioMapper.java
**Ruta:** `services/auth-ms/src/main/java/pe/edu/upeu/eduspace/auth/mapper/UsuarioMapper.java`

**Descripción:** Transforma la entidad `Usuario` en su DTO de salida `UsuarioResponse`, ocultando contraseñas y datos sensibles.

```java
package pe.edu.upeu.eduspace.auth.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.auth.dto.UsuarioResponse;
import pe.edu.upeu.eduspace.auth.entity.Usuario;

@Component
public class UsuarioMapper {

    public UsuarioResponse toResponse(Usuario u) {
        if (u == null) return null;
        return UsuarioResponse.builder()
            .id(u.getId())
            .username(u.getUsername())
            .email(u.getEmail())
            .nombres(u.getNombres())
            .apellidos(u.getApellidos())
            .rol(u.getRol())
            .activo(u.getActivo())
            .primerInicio(u.getPrimerInicio())
            .build();
    }
}
```
""",

    "04-CODIGO-MATRICULA-MS.md": """
---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. MatriculaMapper.java
**Ruta:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/mapper/MatriculaMapper.java`

```java
package pe.edu.upeu.eduspace.matricula.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.matricula.dto.MatriculaResponse;
import pe.edu.upeu.eduspace.matricula.entity.Matricula;

@Component
public class MatriculaMapper {

    public MatriculaResponse toResponse(Matricula m) {
        if (m == null) return null;
        return MatriculaResponse.builder()
            .id(m.getId())
            .alumnoId(m.getAlumnoId())
            .anioAcademicoId(m.getAnioAcademicoId())
            .gradoId(m.getGradoId())
            .seccionId(m.getSeccionId())
            .codigo(m.getCodigo())
            .estado(m.getEstado())
            .tipoMatricula(m.getTipoMatricula())
            .fechaMatricula(m.getFechaMatricula())
            .observaciones(m.getObservaciones())
            .build();
    }
}
```

### 2. CampaniaMapper.java
**Ruta:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/mapper/CampaniaMapper.java`

```java
package pe.edu.upeu.eduspace.matricula.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.matricula.dto.CampaniaResponse;
import pe.edu.upeu.eduspace.matricula.entity.Campania;

@Component
public class CampaniaMapper {

    public CampaniaResponse toResponse(Campania c) {
        if (c == null) return null;
        return CampaniaResponse.builder()
            .id(c.getId())
            .nombre(c.getNombre())
            .anioAcademicoId(c.getAnioAcademicoId())
            .fechaInicio(c.getFechaInicio())
            .fechaFin(c.getFechaFin())
            .estado(c.getEstado())
            .build();
    }
}
```

### 3. CupoMapper.java
**Ruta:** `services/matricula-ms/src/main/java/pe/edu/upeu/eduspace/matricula/mapper/CupoMapper.java`

```java
package pe.edu.upeu.eduspace.matricula.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.matricula.dto.CupoResponse;
import pe.edu.upeu.eduspace.matricula.entity.Cupo;

@Component
public class CupoMapper {

    public CupoResponse toResponse(Cupo c) {
        if (c == null) return null;
        return CupoResponse.builder()
            .id(c.getId())
            .gradoId(c.getGradoId())
            .seccionId(c.getSeccionId())
            .totalVacantes(c.getTotalVacantes())
            .vacantesOcupadas(c.getVacantesOcupadas())
            .vacantesDisponibles(c.getTotalVacantes() - c.getVacantesOcupadas())
            .build();
    }
}
```
""",

    "05-CODIGO-ASISTENCIA-MS.md": """
---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. AsistenciaMapper.java
**Ruta:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/mapper/AsistenciaMapper.java`

```java
package pe.edu.upeu.eduspace.asistencia.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.asistencia.dto.AsistenciaResponse;
import pe.edu.upeu.eduspace.asistencia.entity.Asistencia;

@Component
public class AsistenciaMapper {

    public AsistenciaResponse toResponse(Asistencia a) {
        if (a == null) return null;
        return AsistenciaResponse.builder()
            .id(a.getId())
            .alumnoId(a.getAlumnoId())
            .seccionId(a.getSeccionId())
            .fecha(a.getFecha())
            .estado(a.getEstado())
            .observacion(a.getObservacion())
            .registradoPor(a.getRegistradoPor())
            .creadoEn(a.getCreadoEn())
            .build();
    }
}
```

### 2. JustificacionMapper.java
**Ruta:** `services/asistencia-ms/src/main/java/pe/edu/upeu/eduspace/asistencia/mapper/JustificacionMapper.java`

```java
package pe.edu.upeu.eduspace.asistencia.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.asistencia.dto.JustificacionResponse;
import pe.edu.upeu.eduspace.asistencia.entity.Justificacion;

@Component
public class JustificacionMapper {

    public JustificacionResponse toResponse(Justificacion j) {
        if (j == null) return null;
        return JustificacionResponse.builder()
            .id(j.getId())
            .alumnoId(j.getAlumnoId())
            .fechaInasistencia(j.getFechaInasistencia())
            .motivo(j.getMotivo())
            .estado(j.getEstado())
            .documentoUrl(j.getDocumentoUrl())
            .revisadoPor(j.getRevisadoPor())
            .build();
    }
}
```
""",

    "06-CODIGO-TAREAS-MS.md": """
---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. TareaMapper.java
**Ruta:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/mapper/TareaMapper.java`

```java
package pe.edu.upeu.eduspace.tareas.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.tareas.dto.TareaResponse;
import pe.edu.upeu.eduspace.tareas.entity.Tarea;

@Component
public class TareaMapper {

    public TareaResponse toResponse(Tarea t) {
        if (t == null) return null;
        return TareaResponse.builder()
            .id(t.getId())
            .cursoId(t.getCursoId())
            .seccionId(t.getSeccionId())
            .docenteId(t.getDocenteId())
            .titulo(t.getTitulo())
            .descripcion(t.getDescripcion())
            .fechaPublicacion(t.getFechaPublicacion())
            .fechaLimite(t.getFechaLimite())
            .estado(t.getEstado())
            .puntajeMaximo(t.getPuntajeMaximo())
            .build();
    }
}
```

### 2. EntregaMapper.java
**Ruta:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/mapper/EntregaMapper.java`

```java
package pe.edu.upeu.eduspace.tareas.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.tareas.dto.EntregaResponse;
import pe.edu.upeu.eduspace.tareas.entity.Entrega;

@Component
public class EntregaMapper {

    public EntregaResponse toResponse(Entrega e) {
        if (e == null) return null;
        return EntregaResponse.builder()
            .id(e.getId())
            .tareaId(e.getTarea().getId())
            .alumnoId(e.getAlumnoId())
            .archivoUrl(e.getArchivoUrl())
            .fechaEntrega(e.getFechaEntrega())
            .calificacion(e.getCalificacion())
            .retroalimentacion(e.getRetroalimentacion())
            .estado(e.getEstado())
            .build();
    }
}
```

### 3. MaterialMapper.java
**Ruta:** `services/tareas-ms/src/main/java/pe/edu/upeu/eduspace/tareas/mapper/MaterialMapper.java`

```java
package pe.edu.upeu.eduspace.tareas.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.tareas.dto.MaterialResponse;
import pe.edu.upeu.eduspace.tareas.entity.Material;

@Component
public class MaterialMapper {

    public MaterialResponse toResponse(Material m) {
        if (m == null) return null;
        return MaterialResponse.builder()
            .id(m.getId())
            .cursoId(m.getCursoId())
            .seccionId(m.getSeccionId())
            .titulo(m.getTitulo())
            .archivoUrl(m.getArchivoUrl())
            .fechaPublicacion(m.getFechaPublicacion())
            .build();
    }
}
```
""",

    "08-CODIGO-PAGO-MS.md": """
---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. PagoMapper.java
**Ruta:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/mapper/PagoMapper.java`

```java
package pe.edu.upeu.eduspace.pago.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.pago.dto.ComprobanteResponse;
import pe.edu.upeu.eduspace.pago.dto.PagoResponse;
import pe.edu.upeu.eduspace.pago.entity.Comprobante;
import pe.edu.upeu.eduspace.pago.entity.Pago;
import pe.edu.upeu.eduspace.pago.entity.PagoDetalle;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PagoMapper {

    private final ComprobanteMapper comprobanteMapper;

    public PagoResponse toResponse(Pago p, Comprobante c) {
        if (p == null) return null;

        List<PagoResponse.PagoDetalleResponse> detResponses = new ArrayList<>();
        if (p.getDetalles() != null) {
            for (PagoDetalle d : p.getDetalles()) {
                detResponses.add(PagoResponse.PagoDetalleResponse.builder()
                    .id(d.getId())
                    .cuotaId(d.getCuota().getId())
                    .cuotaDescripcion(d.getCuota().getDescripcion())
                    .montoAplicado(d.getMontoAplicado())
                    .nuevoSaldoCuota(d.getCuota().getSaldo())
                    .nuevoEstadoCuota(d.getCuota().getEstado())
                    .build());
            }
        }

        ComprobanteResponse compResp = (c != null) ? comprobanteMapper.toResponse(c) : null;

        return PagoResponse.builder()
            .id(p.getId())
            .alumnoId(p.getAlumnoId())
            .pagadorNombre(p.getPagadorNombre())
            .pagadorDocumento(p.getPagadorDocumento())
            .montoTotal(p.getMontoTotal())
            .medio(p.getMedio())
            .referencia(p.getReferencia())
            .estado(p.getEstado())
            .cajaSesionId(p.getCajaSesion() != null ? p.getCajaSesion().getId() : null)
            .registradoPor(p.getRegistradoPor())
            .pagadoEn(p.getPagadoEn())
            .aprobadoEn(p.getAprobadoEn())
            .motivoRechazo(p.getMotivoRechazo())
            .idempotencyKey(p.getIdempotencyKey())
            .comprobante(compResp)
            .detalles(detResponses)
            .build();
    }
}
```

### 2. CuotaMapper.java
**Ruta:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/mapper/CuotaMapper.java`

```java
package pe.edu.upeu.eduspace.pago.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.pago.dto.CuotaResponse;
import pe.edu.upeu.eduspace.pago.entity.Cuota;

@Component
public class CuotaMapper {

    public CuotaResponse toResponse(Cuota cuota) {
        if (cuota == null) return null;
        return CuotaResponse.builder()
            .id(cuota.getId())
            .conceptoId(cuota.getConcepto().getId())
            .conceptoNombre(cuota.getConcepto().getNombre())
            .conceptoTipo(cuota.getConcepto().getTipo())
            .alumnoId(cuota.getAlumnoId())
            .matriculaId(cuota.getMatricula() != null ? cuota.getMatricula().getMatriculaId() : null)
            .mes(cuota.getMes())
            .numeroCuota(cuota.getNumeroCuota())
            .descripcion(cuota.getDescripcion())
            .fechaVencimiento(cuota.getFechaVencimiento())
            .montoOriginal(cuota.getMontoOriginal())
            .mora(cuota.getMora())
            .descuento(cuota.getDescuento())
            .montoTotal(cuota.getMontoTotal())
            .saldo(cuota.getSaldo())
            .estado(cuota.getEstado())
            .pagadoEn(cuota.getPagadoEn())
            .build();
    }
}
```

### 3. CajaSesionMapper.java
**Ruta:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/mapper/CajaSesionMapper.java`

```java
package pe.edu.upeu.eduspace.pago.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.pago.dto.CajaSesionResponse;
import pe.edu.upeu.eduspace.pago.entity.CajaSesion;

@Component
public class CajaSesionMapper {

    public CajaSesionResponse toResponse(CajaSesion s) {
        if (s == null) return null;
        return CajaSesionResponse.builder()
            .id(s.getId())
            .cajeroUsuarioId(s.getCajeroUsuarioId())
            .cajeroNombre(s.getCajeroNombre())
            .fechaApertura(s.getFechaApertura())
            .montoApertura(s.getMontoApertura())
            .estado(s.getEstado())
            .saldoFinalEfectivo(s.getSaldoFinalEfectivo())
            .diferencia(s.getDiferencia())
            .cerradoEn(s.getCerradoEn())
            .observaciones(s.getObservaciones())
            .build();
    }
}
```

### 4. ComprobanteMapper.java
**Ruta:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/mapper/ComprobanteMapper.java`

```java
package pe.edu.upeu.eduspace.pago.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.pago.dto.ComprobanteResponse;
import pe.edu.upeu.eduspace.pago.entity.Comprobante;

@Component
public class ComprobanteMapper {

    public ComprobanteResponse toResponse(Comprobante c) {
        if (c == null) return null;
        return ComprobanteResponse.builder()
            .id(c.getId())
            .tipo(c.getTipo())
            .serie(c.getSerie())
            .correlativo(c.getCorrelativo())
            .numeroCompleto(c.getNumeroCompleto())
            .fechaEmision(c.getFechaEmision())
            .clienteTipoDoc(c.getClienteTipoDoc())
            .clienteNumeroDoc(c.getClienteNumeroDoc())
            .clienteNombre(c.getClienteNombre())
            .montoTotal(c.getMontoTotal())
            .estado(c.getEstado())
            .hashSunat(c.getHashSunat())
            .build();
    }
}
```

### 5. TarifaMapper.java
**Ruta:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/mapper/TarifaMapper.java`

```java
package pe.edu.upeu.eduspace.pago.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.pago.dto.TarifaResponse;
import pe.edu.upeu.eduspace.pago.entity.Tarifa;

@Component
public class TarifaMapper {

    public TarifaResponse toResponse(Tarifa t) {
        if (t == null) return null;
        return TarifaResponse.builder()
            .id(t.getId())
            .conceptoId(t.getConcepto().getId())
            .conceptoNombre(t.getConcepto().getNombre())
            .anioAcademicoId(t.getAnioAcademicoId())
            .gradoId(t.getGradoId())
            .nivel(t.getNivel())
            .monto(t.getMonto())
            .build();
    }
}
```

### 6. ConceptoPagoMapper.java
**Ruta:** `services/pago-ms/src/main/java/pe/edu/upeu/eduspace/pago/mapper/ConceptoPagoMapper.java`

```java
package pe.edu.upeu.eduspace.pago.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.pago.dto.ConceptoPagoResponse;
import pe.edu.upeu.eduspace.pago.entity.ConceptoPago;

@Component
public class ConceptoPagoMapper {

    public ConceptoPagoResponse toResponse(ConceptoPago c) {
        if (c == null) return null;
        return ConceptoPagoResponse.builder()
            .id(c.getId())
            .codigo(c.getCodigo())
            .nombre(c.getNombre())
            .tipo(c.getTipo())
            .recurrente(c.getRecurrente())
            .permiteDescuento(c.getPermiteDescuento())
            .activo(c.getActivo())
            .build();
    }
}
```
""",

    "09-CODIGO-EXAMENES-MS.md": """
---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. ExamenMapper.java
**Ruta:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/mapper/ExamenMapper.java`

```java
package pe.edu.upeu.eduspace.examenes.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.examenes.dto.ExamenResponse;
import pe.edu.upeu.eduspace.examenes.dto.PreguntaResponse;
import pe.edu.upeu.eduspace.examenes.entity.Examen;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ExamenMapper {

    private final PreguntaMapper preguntaMapper;

    public ExamenResponse toResponse(Examen e) {
        if (e == null) return null;
        List<PreguntaResponse> preguntas = (e.getPreguntas() != null)
            ? e.getPreguntas().stream().map(preguntaMapper::toResponse).collect(Collectors.toList())
            : Collections.emptyList();

        return ExamenResponse.builder()
            .id(e.getId())
            .cursoId(e.getCursoId())
            .seccionId(e.getSeccionId())
            .docenteId(e.getDocenteId())
            .titulo(e.getTitulo())
            .descripcion(e.getDescripcion())
            .fechaInicio(e.getFechaInicio())
            .fechaFin(e.getFechaFin())
            .duracionMinutos(e.getDuracionMinutos())
            .puntajeMaximo(e.getPuntajeMaximo())
            .estado(e.getEstado())
            .preguntas(preguntas)
            .build();
    }
}
```

### 2. PreguntaMapper.java
**Ruta:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/mapper/PreguntaMapper.java`

```java
package pe.edu.upeu.eduspace.examenes.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.examenes.dto.PreguntaResponse;
import pe.edu.upeu.eduspace.examenes.entity.Pregunta;

@Component
public class PreguntaMapper {

    public PreguntaResponse toResponse(Pregunta p) {
        if (p == null) return null;
        return PreguntaResponse.builder()
            .id(p.getId())
            .enunciado(p.getEnunciado())
            .tipo(p.getTipo())
            .puntaje(p.getPuntaje())
            .orden(p.getOrden())
            .opciones(p.getOpciones())
            .build();
    }
}
```

### 3. IntentoMapper.java
**Ruta:** `services/examenes-ms/src/main/java/pe/edu/upeu/eduspace/examenes/mapper/IntentoMapper.java`

```java
package pe.edu.upeu.eduspace.examenes.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.examenes.dto.IntentoResponse;
import pe.edu.upeu.eduspace.examenes.entity.Intento;

@Component
public class IntentoMapper {

    public IntentoResponse toResponse(Intento i) {
        if (i == null) return null;
        return IntentoResponse.builder()
            .id(i.getId())
            .examenId(i.getExamen().getId())
            .alumnoId(i.getAlumnoId())
            .fechaInicio(i.getFechaInicio())
            .fechaFin(i.getFechaFin())
            .puntajeObtenido(i.getPuntajeObtenido())
            .estado(i.getEstado())
            .build();
    }
}
```
""",

    "10-CODIGO-CALIFICACIONES-MS.md": """
---

## 🔄 Capa Mapper (Traductores Entity <-> DTO)

### 1. NotaMapper.java
**Ruta:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/mapper/NotaMapper.java`

```java
package pe.edu.upeu.eduspace.calificaciones.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.calificaciones.dto.NotaResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.Nota;

@Component
public class NotaMapper {

    public NotaResponse toResponse(Nota n) {
        if (n == null) return null;
        return NotaResponse.builder()
            .id(n.getId())
            .matriculaId(n.getMatriculaId())
            .cursoId(n.getCursoId())
            .periodoId(n.getPeriodoId())
            .criterioId(n.getCriterio().getId())
            .criterioNombre(n.getCriterio().getNombre())
            .valor(n.getValor())
            .docenteId(n.getDocenteId())
            .fechaRegistro(n.getFechaRegistro())
            .build();
    }
}
```

### 2. CriterioMapper.java
**Ruta:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/mapper/CriterioMapper.java`

```java
package pe.edu.upeu.eduspace.calificaciones.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.calificaciones.dto.CriterioResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.Criterio;

@Component
public class CriterioMapper {

    public CriterioResponse toResponse(Criterio c) {
        if (c == null) return null;
        return CriterioResponse.builder()
            .id(c.getId())
            .cursoId(c.getCursoId())
            .periodoId(c.getPeriodoId())
            .nombre(c.getNombre())
            .peso(c.getPeso())
            .orden(c.getOrden())
            .build();
    }
}
```

### 3. BoletinMapper.java
**Ruta:** `services/calificaciones-ms/src/main/java/pe/edu/upeu/eduspace/calificaciones/mapper/BoletinMapper.java`

```java
package pe.edu.upeu.eduspace.calificaciones.mapper;

import org.springframework.stereotype.Component;
import pe.edu.upeu.eduspace.calificaciones.dto.BoletinResponse;
import pe.edu.upeu.eduspace.calificaciones.entity.Boletin;

@Component
public class BoletinMapper {

    public BoletinResponse toResponse(Boletin b) {
        if (b == null) return null;
        return BoletinResponse.builder()
            .id(b.getId())
            .matriculaId(b.getMatriculaId())
            .periodoId(b.getPeriodoId())
            .anio(b.getAnio())
            .promedioBimestre(b.getPromedioBimestre())
            .puesto(b.getPuesto())
            .estado(b.getEstado())
            .pdfUrl(b.getPdfUrl())
            .build();
    }
}
```
"""
}


def actualizar():
    for archivo, mapper_md in MAPPERS_POR_GUIA.items():
        doc_path = DOCS_DIR / archivo
        if not doc_path.exists():
            print(f"  [AVISO] No se encontro {archivo}")
            continue

        contenido = doc_path.read_text(encoding="utf-8")
        if "## 🔄 Capa Mapper" in contenido:
            print(f"  [SKIP] {archivo} ya tiene la capa Mapper")
            continue

        # Insertar antes de "## ⚡ Comandos Para Compilar" o al final
        if "## ⚡" in contenido:
            partes = contenido.split("## ⚡", 1)
            nuevo_contenido = partes[0] + mapper_md + "\n\n## ⚡" + partes[1]
        else:
            nuevo_contenido = contenido + "\n" + mapper_md

        doc_path.write_text(nuevo_contenido, encoding="utf-8")
        print(f"  [OK] Mappers agregados a {archivo}")


if __name__ == "__main__":
    actualizar()
