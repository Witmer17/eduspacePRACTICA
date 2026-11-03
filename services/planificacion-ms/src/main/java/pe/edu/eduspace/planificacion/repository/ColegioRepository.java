package pe.edu.eduspace.planificacion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Colegio;

public interface ColegioRepository extends JpaRepository<Colegio, Short> {
}
