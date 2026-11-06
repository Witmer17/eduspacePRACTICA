package pe.edu.upeu.eduspace.matricula.event;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Datos de negocio de matricula.* (el sobre estándar los lleva planos junto a eventId, eventType, etc.). */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MatriculaEvent {

    private Long matriculaId;
    private Long alumnoId;
    private String alumnoNombre;
    private String anio;
    private Long anioId;
    private Long nivelId;
    private Long gradoId;
    private String gradoNombre;
    private Long seccionId;
    private String seccionNombre;
    private String estado;
    private String tipo;
    private Long seccionAnteriorId;
    private String motivo;
    /** Forma de pago de las pensiones acordada al matricular: pago-ms genera las cuotas según el plan. */
    private String planPago;
    private Long responsablePagoUsuarioId;
    private String responsablePagoNombre;
}
