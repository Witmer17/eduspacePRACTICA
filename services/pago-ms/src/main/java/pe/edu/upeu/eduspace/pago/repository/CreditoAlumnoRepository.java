package pe.edu.upeu.eduspace.pago.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upeu.eduspace.pago.entity.CreditoAlumno;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditoAlumnoRepository extends JpaRepository<CreditoAlumno, Long> {

    /** Toma el crédito con bloqueo: dos depósitos o cobros a la vez sobre el mismo alumno se hacen uno tras otro. */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CreditoAlumno c WHERE c.alumnoId = :alumnoId")
    Optional<CreditoAlumno> bloquear(@Param("alumnoId") Long alumnoId);

    /** Los alumnos que tienen crédito disponible (los que el cobro automático debe revisar). */
    @Query("SELECT c.alumnoId FROM CreditoAlumno c WHERE c.saldo > 0")
    List<Long> alumnosConCredito();
}
