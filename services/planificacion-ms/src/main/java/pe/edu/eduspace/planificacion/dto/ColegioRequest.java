package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ColegioRequest(
        @NotBlank @Size(max = 150) String nombre,
        @Size(max = 60) String nombreCorto,
        @Size(max = 200) String lema,
        @Size(max = 20) String codigoModular,
        @Pattern(regexp = "\\d{11}", message = "El RUC tiene 11 dígitos") String ruc,
        @Size(max = 100) String ugel,
        @Pattern(regexp = "PRIVADA|PUBLICA", message = "La gestión es PRIVADA o PUBLICA") String gestion,
        @Size(max = 150) String director,
        @Size(max = 200) String direccion,
        @Size(max = 80) String distrito,
        @Size(max = 80) String provincia,
        @Size(max = 80) String departamento,
        @Size(max = 30) String telefono,
        @Email @Size(max = 150) String email,
        @Size(max = 150) String sitioWeb) {
}
