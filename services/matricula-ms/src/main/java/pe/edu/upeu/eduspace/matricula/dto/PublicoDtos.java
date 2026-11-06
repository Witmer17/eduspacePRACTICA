package pe.edu.upeu.eduspace.matricula.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/** API pública (sin sesión) de la matrícula en línea del sitio web del colegio. */
public final class PublicoDtos {

    private PublicoDtos() {}

    // ----- oferta (qué grados hay, cuántas vacantes y cuánto cuesta)
    public record PensionOferta(BigDecimal total, int cuotas, BigDecimal mensual) {}

    public record GradoOferta(Long id, String nombre, int vacantes, BigDecimal matricula, PensionOferta pension) {}

    public record NivelOferta(Long id, String nombre, List<GradoOferta> grados) {}

    /** Una forma de pago de las pensiones con su descuento (semestral 5 %, anual 10 %: lo manda pago-ms). */
    public record PlanOferta(String id, String etiqueta, BigDecimal descuentoPorcentaje) {}

    /** Un descuento que la familia puede pedir por tener un hermano matriculado (lo confirma la secretaría). */
    public record DescuentoHermanoOferta(Long id, String nombre, String tipo, BigDecimal valor) {}

    public record Oferta(Long anioId, String anio, boolean abierta, String mensaje, List<NivelOferta> niveles, List<PlanOferta> planes,
                         List<DescuentoHermanoOferta> descuentosHermano) {}

    // ----- solicitud
    public record AlumnoSolicitud(
        @Pattern(regexp = "DNI|CE|PASAPORTE", message = "El tipo de documento del alumno debe ser DNI, CE o PASAPORTE") String tipoDocumento,
        @NotBlank(message = "El documento del alumno es obligatorio") @Pattern(regexp = "[A-Za-z0-9]{6,20}", message = "El documento del alumno solo admite letras y números (6 a 20)") String numeroDocumento,
        @NotBlank(message = "Los nombres del alumno son obligatorios") @Size(max = 100) String nombres,
        @NotBlank(message = "El apellido paterno del alumno es obligatorio") @Size(max = 80) String apellidoPaterno,
        @Size(max = 80) String apellidoMaterno,
        @NotNull(message = "La fecha de nacimiento es obligatoria") @Past(message = "La fecha de nacimiento no puede ser futura") LocalDate fechaNacimiento,
        @NotBlank(message = "El sexo es obligatorio") @Pattern(regexp = "[MF]", message = "El sexo debe ser M o F") String sexo,
        /** Datos opcionales del alumno: si la familia los escribe, quedan en su expediente. */
        @Size(max = 200, message = "La dirección es muy larga") String direccion,
        @Size(max = 80, message = "El distrito es muy largo") String distrito,
        @Size(max = 150, message = "El colegio de procedencia es muy largo") String colegioProcedencia,
        @Email(message = "El correo del alumno no es válido") @Size(max = 150) String email) {}

    public record ApoderadoSolicitud(
        @Pattern(regexp = "DNI|CE|PASAPORTE", message = "El tipo de documento del apoderado debe ser DNI, CE o PASAPORTE") String tipoDocumento,
        @NotBlank(message = "El documento del apoderado es obligatorio") @Pattern(regexp = "[A-Za-z0-9]{6,20}", message = "El documento del apoderado solo admite letras y números (6 a 20)") String numeroDocumento,
        @NotBlank(message = "Los nombres del apoderado son obligatorios") @Size(max = 100) String nombres,
        @NotBlank(message = "Los apellidos del apoderado son obligatorios") @Size(max = 150) String apellidos,
        @NotBlank(message = "El teléfono del apoderado es obligatorio") @Pattern(regexp = "[0-9+() -]{6,20}", message = "El teléfono no es válido") String telefono,
        @Email(message = "El correo no es válido") @Size(max = 150) String email,
        @NotBlank(message = "El parentesco es obligatorio") @Pattern(regexp = "PADRE|MADRE|ABUELO|ABUELA|TIO|TIA|HERMANO|TUTOR|OTRO", message = "Parentesco no válido") String parentesco) {}

    /** El hermano por el que se pide descuento: solo su documento. La secretaría lo busca y confirma el parentesco. */
    public record HermanoSolicitud(
        @NotBlank(message = "El documento del hermano es obligatorio") @Pattern(regexp = "[A-Za-z0-9]{6,20}", message = "El documento del hermano solo admite letras y números (6 a 20)") String numeroDocumento) {}

    public record Solicitud(
        @NotNull(message = "Elige el grado") Long gradoId,
        @NotNull @Valid AlumnoSolicitud alumno,
        @NotNull @Valid ApoderadoSolicitud apoderado,
        @AssertTrue(message = "Debes aceptar el tratamiento de datos personales") boolean acepto,
        /** Campo trampa: las personas no lo ven ni lo llenan; si llega con texto es un robot. */
        @Size(max = 0, message = "Solicitud no válida") String sitio,
        /** Código de descuento que la familia escribió (opcional); se valida en el servidor y se aplica a las cuotas del alumno. */
        @Size(max = 40, message = "El código de descuento es muy largo") @Pattern(regexp = "|[A-Za-z0-9_-]+", message = "El código de descuento solo lleva letras, números y guiones") String codigoDescuento,
        /** Forma de pago de las pensiones que acuerda la familia (opcional; sin dato es mensual). */
        @Pattern(regexp = "|MENSUAL|BIMESTRAL|SEMESTRAL|ANUAL", message = "La forma de pago debe ser MENSUAL, BIMESTRAL, SEMESTRAL o ANUAL") String planPago,
        /** Hermano matriculado por el que se pide descuento (opcional): hasta que la secretaría lo confirme no se puede pagar. */
        @Valid HermanoSolicitud hermano) {}

    /** El descuento de un código, tal como lo ve la familia antes de pagar. */
    public record DescuentoVista(String codigo, String nombre, String tipo, BigDecimal valor, String aplicaA) {}

    /** {@code montoBase} y {@code descuento} desglosan la matrícula: lo que se paga ahora ({@code montoMatricula}) es la base menos el descuento. */
    public record Inicio(String referencia, String token, String codigo, String alumno, String grado, String seccion, String turno,
                         BigDecimal montoMatricula, String vencePago, BigDecimal montoBase, BigDecimal descuento) {}

    // ----- pago (la pasarela es simulada)
    public record Tarjeta(
        @NotBlank(message = "Escribe el número de la tarjeta") @Size(max = 25) String numero,
        @NotBlank(message = "Escribe el nombre del titular") @Size(max = 80) String titular,
        @NotBlank(message = "Escribe el vencimiento (MM/AA)") @Size(max = 7) String vencimiento,
        @NotBlank(message = "Escribe el CVV") @Size(max = 4) String cvv) {}

    public record PagoRequest(@NotNull @Valid Tarjeta tarjeta) {}

    // ----- resumen de una matrícula (lo que se muestra al terminar y en la constancia)
    public record PensionResumen(String descripcion, String vence, BigDecimal monto) {}

    public record ClaseResumen(String dia, String hora, String curso, String docente) {}

    /**
     * Cómo va el descuento por hermano: EN_REVISION (la secretaría confirma el parentesco; aún no se puede pagar), APROBADO (se paga el monto ya
     * descontado) o RECHAZADO (se paga completo; {@code motivo} dice por qué). No revela datos del hermano: la familia solo ve el documento que escribió.
     */
    public record HermanoEstado(String estado, String descuento, String motivo, String documento) {}

    public record Resumen(String estado, String referencia, String codigo, String alumno, String alumnoDocumento, String apoderado,
                          String grado, String seccion, String turno, BigDecimal montoMatricula, String comprobante, String pagadoEn,
                          List<PensionResumen> pensiones, BigDecimal totalPensiones, List<ClaseResumen> horario, String usuarioAlumno,
                          String usuarioApoderado, String correo, String correoDestino, String mensajeCuentas,
                          HermanoEstado descuentoHermano) {}
}
