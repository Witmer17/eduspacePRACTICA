package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

/** Pabellón del colegio. El nombre lo decide el usuario (A, B, «Central»…), declara cuántas aulas tiene y qué grados lo usan. */
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

    /** Los grados que usan este pabellón (tabla pabellon_grados). */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "pabellon_grados", joinColumns = @JoinColumn(name = "pabellon_id"))
    @Column(name = "grado_id")
    private Set<Long> gradoIds = new LinkedHashSet<>();
}
