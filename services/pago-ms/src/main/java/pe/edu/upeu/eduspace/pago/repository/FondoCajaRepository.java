package pe.edu.upeu.eduspace.pago.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.FondoCaja;

@Repository
public interface FondoCajaRepository extends JpaRepository<FondoCaja, Long> {

    /** Bloquea la fila única hasta el final de la transacción: los repartos de dinero se hacen de uno en uno. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM FondoCaja f WHERE f.id = 1")
    FondoCaja bloquear();
}
