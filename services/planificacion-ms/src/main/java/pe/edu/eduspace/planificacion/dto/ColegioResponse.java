package pe.edu.eduspace.planificacion.dto;

import java.time.LocalDateTime;

public record ColegioResponse(String nombre, String nombreCorto, String lema, String codigoModular, String ruc, String ugel,
                              String gestion, String director, String direccion, String distrito, String provincia,
                              String departamento, String telefono, String email, String sitioWeb, LocalDateTime actualizadoEn) {
}
