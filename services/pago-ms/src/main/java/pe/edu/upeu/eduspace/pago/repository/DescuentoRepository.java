package pe.edu.upeu.eduspace.pago.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.Descuento;

import java.util.List;
import java.util.Optional;

@Repository
public interface DescuentoRepository extends JpaRepository<Descuento, Long> {

    List<Descuento> findByActivoTrue();

    Optional<Descuento> findByCodigoIgnoreCaseAndActivoTrue(String codigo);

    Optional<Descuento> findByCodigoIgnoreCase(String codigo);
}

