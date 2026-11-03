package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/** Pabellón del colegio. El nombre lo decide el usuario (A, B, «Central»…) y declara cuántas aulas tiene. */
@Entity
@Table(name = "pabellones")
@Getter
@Setter
public class Pabellon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private Short cantidadAulas = 0;
}
