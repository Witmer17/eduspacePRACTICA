package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Datos de la institución. Hay una sola fila (id = 1). */
@Entity
@Table(name = "colegio")
@Getter
@Setter
public class Colegio {
    public static final short ID = 1;

    @Id
    private Short id = ID;
    private String nombre;
    private String nombreCorto;
    private String lema;
    private String codigoModular;
    private String ruc;
    private String ugel;
    private String gestion = "PRIVADA";
    private String director;
    private String direccion;
    private String distrito;
    private String provincia;
    private String departamento;
    private String telefono;
    private String email;
    private String sitioWeb;
    private LocalDateTime actualizadoEn;

    @PrePersist
    @PreUpdate
    void alGuardar() {
        actualizadoEn = LocalDateTime.now();
    }
}
