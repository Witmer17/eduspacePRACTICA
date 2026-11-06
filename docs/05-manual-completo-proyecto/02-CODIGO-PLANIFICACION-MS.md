# 📘 CÓDIGO COMPLETO — `planificacion-ms`

> **Microservicio:** `planificacion-ms`  
> **Puerto:** `8091`  
> **Base de datos:** `eduspace_planificacion`  
> **Propósito:** Columna vertebral del sistema educativo. Gestiona la estructura académica completa: Años Lectivos, Niveles (Inicial, Primaria, Secundaria), Grados, Secciones, Cursos, Áreas Curriculares, Periodos (Bimestres), Horarios, Turnos, Aulas, Pabellones y Personal docente/administrativo (RRHH). Es consultado por todos los demás microservicios.  
> **Total de clases incluidas:** 186 (100% completas, sin omisiones).

---

## 📑 Índice de Clases


### Entidades JPA

- 1. `AnioAcademico.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/AnioAcademico.java`
- 2. `Area.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Area.java`
- 3. `Asignacion.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Asignacion.java`
- 4. `AsistenciaPersonal.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/AsistenciaPersonal.java`
- 5. `Aula.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Aula.java`
- 6. `BloqueHorario.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/BloqueHorario.java`
- 7. `Colegio.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Colegio.java`
- 8. `ContratoPersonal.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/ContratoPersonal.java`
- 9. `CuentaDeposito.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/CuentaDeposito.java`
- 10. `Curso.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Curso.java`
- 11. `Docente.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Docente.java`
- 12. `EstadoDocente.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/EstadoDocente.java`
- 13. `EstadoPeriodo.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/EstadoPeriodo.java`
- 14. `Feriado.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Feriado.java`
- 15. `Grado.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Grado.java`
- 16. `GradoCurso.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/GradoCurso.java`
- 17. `Horario.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Horario.java`
- 18. `Nivel.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Nivel.java`
- 19. `Pabellon.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Pabellon.java`
- 20. `PagoPersonal.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/PagoPersonal.java`
- 21. `Periodo.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Periodo.java`
- 22. `PublicacionHorario.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/PublicacionHorario.java`
- 23. `Seccion.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Seccion.java`
- 24. `TipoAula.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/TipoAula.java`
- 25. `Turno.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Turno.java`

### Repositorios Spring Data JPA

- 26. `AnioAcademicoRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AnioAcademicoRepository.java`
- 27. `AreaRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AreaRepository.java`
- 28. `AsignacionRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AsignacionRepository.java`
- 29. `AsistenciaPersonalRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AsistenciaPersonalRepository.java`
- 30. `AulaRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AulaRepository.java`
- 31. `BloqueHorarioRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/BloqueHorarioRepository.java`
- 32. `ColegioRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/ColegioRepository.java`
- 33. `ContratoPersonalRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/ContratoPersonalRepository.java`
- 34. `CuentaDepositoRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/CuentaDepositoRepository.java`
- 35. `CursoRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/CursoRepository.java`
- 36. `DocenteRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/DocenteRepository.java`
- 37. `FeriadoRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/FeriadoRepository.java`
- 38. `GradoCursoRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/GradoCursoRepository.java`
- 39. `GradoRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/GradoRepository.java`
- 40. `HorarioRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/HorarioRepository.java`
- 41. `NivelRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/NivelRepository.java`
- 42. `PabellonRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PabellonRepository.java`
- 43. `PagoPersonalRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PagoPersonalRepository.java`
- 44. `PeriodoRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PeriodoRepository.java`
- 45. `PublicacionHorarioRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PublicacionHorarioRepository.java`
- 46. `SeccionRepository.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/SeccionRepository.java`

### DTOs (Data Transfer Objects)

- 47. `AnioRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AnioRequest.java`
- 48. `AnioResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AnioResponse.java`
- 49. `AreaRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AreaRequest.java`
- 50. `AreaResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AreaResponse.java`
- 51. `AreaUpdateRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AreaUpdateRequest.java`
- 52. `AsignacionDocenteRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionDocenteRequest.java`
- 53. `AsignacionInternaResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionInternaResponse.java`
- 54. `AsignacionRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionRequest.java`
- 55. `AsignacionResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionResponse.java`
- 56. `AsistenciaPersonalDtos.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsistenciaPersonalDtos.java`
- 57. `AulaRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AulaRequest.java`
- 58. `AulaResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AulaResponse.java`
- 59. `AulasPabellonRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AulasPabellonRequest.java`
- 60. `BloqueRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/BloqueRequest.java`
- 61. `BloqueResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/BloqueResponse.java`
- 62. `CambioEstadoRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CambioEstadoRequest.java`
- 63. `CapacidadesPabellonRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CapacidadesPabellonRequest.java`
- 64. `CatalogoUpdateRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CatalogoUpdateRequest.java`
- 65. `ColegioRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ColegioRequest.java`
- 66. `ColegioResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ColegioResponse.java`
- 67. `CursoHorasResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CursoHorasResponse.java`
- 68. `CursoRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CursoRequest.java`
- 69. `CursoResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CursoResponse.java`
- 70. `DocenteRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/DocenteRequest.java`
- 71. `DocenteResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/DocenteResponse.java`
- 72. `EsHabilResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/EsHabilResponse.java`
- 73. `FeriadoRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/FeriadoRequest.java`
- 74. `FeriadoResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/FeriadoResponse.java`
- 75. `GenerarHorarioRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GenerarHorarioRequest.java`
- 76. `GradoOfertaResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GradoOfertaResponse.java`
- 77. `GradoResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GradoResponse.java`
- 78. `GradosPabellonRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GradosPabellonRequest.java`
- 79. `HorarioDocenteResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioDocenteResponse.java`
- 80. `HorarioRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioRequest.java`
- 81. `HorarioResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioResponse.java`
- 82. `HorarioSeccionResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioSeccionResponse.java`
- 83. `InternalDocenteResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/InternalDocenteResponse.java`
- 84. `MallaGradoResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaGradoResponse.java`
- 85. `MallaHorasRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaHorasRequest.java`
- 86. `MallaItemResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaItemResponse.java`
- 87. `MallaLoteRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaLoteRequest.java`
- 88. `MallaLoteResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaLoteResponse.java`
- 89. `MallaRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaRequest.java`
- 90. `NivelResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/NivelResponse.java`
- 91. `OfertaGradosRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/OfertaGradosRequest.java`
- 92. `PabellonRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PabellonRequest.java`
- 93. `PabellonResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PabellonResponse.java`
- 94. `PageResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PageResponse.java`
- 95. `PeriodoRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PeriodoRequest.java`
- 96. `PeriodoResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PeriodoResponse.java`
- 97. `PreparacionSeccionResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PreparacionSeccionResponse.java`
- 98. `PublicacionResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PublicacionResponse.java`
- 99. `ResultadoGeneracion.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ResultadoGeneracion.java`
- 100. `ResultadoSeccionGeneracion.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ResultadoSeccionGeneracion.java`
- 101. `ResultadoValidacionHorario.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ResultadoValidacionHorario.java`
- 102. `RrhhDtos.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/RrhhDtos.java`
- 103. `SeccionInternaResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/SeccionInternaResponse.java`
- 104. `SeccionRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/SeccionRequest.java`
- 105. `SeccionResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/SeccionResponse.java`
- 106. `VincularUsuarioRequest.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/VincularUsuarioRequest.java`

### Servicios y Lógica de Negocio

- 107. `AnioAcademicoService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AnioAcademicoService.java`
- 108. `AnioAcademicoServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/AnioAcademicoServiceImpl.java`
- 109. `AsignacionService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AsignacionService.java`
- 110. `AsignacionServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/AsignacionServiceImpl.java`
- 111. `AsistenciaPersonalService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AsistenciaPersonalService.java`
- 112. `AulaService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AulaService.java`
- 113. `AulaServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/AulaServiceImpl.java`
- 114. `BloqueHorarioService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/BloqueHorarioService.java`
- 115. `BloqueHorarioServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/BloqueHorarioServiceImpl.java`
- 116. `CuentaDepositoService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/CuentaDepositoService.java`
- 117. `CursoService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/CursoService.java`
- 118. `CursoServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/CursoServiceImpl.java`
- 119. `DocenteService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/DocenteService.java`
- 120. `DocenteServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/DocenteServiceImpl.java`
- 121. `FeriadoService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/FeriadoService.java`
- 122. `FeriadoServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/FeriadoServiceImpl.java`
- 123. `GradoService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/GradoService.java`
- 124. `GradoServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/GradoServiceImpl.java`
- 125. `HorarioGeneradorService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/HorarioGeneradorService.java`
- 126. `HorarioGeneradorServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/HorarioGeneradorServiceImpl.java`
- 127. `HorarioService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/HorarioService.java`
- 128. `HorarioServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/HorarioServiceImpl.java`
- 129. `InternalConsultaService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/InternalConsultaService.java`
- 130. `InternalConsultaServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/InternalConsultaServiceImpl.java`
- 131. `MallaService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/MallaService.java`
- 132. `MallaServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/MallaServiceImpl.java`
- 133. `MiPersonalService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/MiPersonalService.java`
- 134. `NivelService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/NivelService.java`
- 135. `NivelServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/NivelServiceImpl.java`
- 136. `PeriodoService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/PeriodoService.java`
- 137. `PeriodoServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/PeriodoServiceImpl.java`
- 138. `PublicacionHorarioService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/PublicacionHorarioService.java`
- 139. `PublicacionHorarioServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/PublicacionHorarioServiceImpl.java`
- 140. `RrhhService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/RrhhService.java`
- 141. `SeccionService.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/SeccionService.java`
- 142. `SeccionServiceImpl.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/SeccionServiceImpl.java`

### Controladores REST API

- 143. `AnioAcademicoController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AnioAcademicoController.java`
- 144. `AreaController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AreaController.java`
- 145. `AsignacionController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AsignacionController.java`
- 146. `AsistenciaPersonalController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AsistenciaPersonalController.java`
- 147. `AulaController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AulaController.java`
- 148. `BloqueHorarioController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/BloqueHorarioController.java`
- 149. `ColegioController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/ColegioController.java`
- 150. `CursoController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/CursoController.java`
- 151. `DocenteController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/DocenteController.java`
- 152. `FeriadoController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/FeriadoController.java`
- 153. `HorarioController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/HorarioController.java`
- 154. `InternalController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/InternalController.java`
- 155. `MallaController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/MallaController.java`
- 156. `MiPersonalController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/MiPersonalController.java`
- 157. `NivelGradoController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/NivelGradoController.java`
- 158. `PabellonController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/PabellonController.java`
- 159. `PagoPersonalController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/PagoPersonalController.java`
- 160. `PeriodoController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/PeriodoController.java`
- 161. `RrhhController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/RrhhController.java`
- 162. `SeccionController.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/SeccionController.java`

### Mensajería Kafka

- 163. `OutboxConfig.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/messaging/outbox/OutboxConfig.java`
- 164. `OutboxRecorder.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/messaging/outbox/OutboxRecorder.java`
- 165. `OutboxRelay.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/messaging/outbox/OutboxRelay.java`

### Eventos de Dominio

- 166. `AnioActivadoEvent.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/AnioActivadoEvent.java`
- 167. `DomainEvent.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/DomainEvent.java`
- 168. `HorarioPublicadoEvent.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/HorarioPublicadoEvent.java`
- 169. `PeriodoCambiadoEvent.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/PeriodoCambiadoEvent.java`

### Configuración Spring Boot

- 170. `KafkaProducerConfig.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/KafkaProducerConfig.java`
- 171. `KafkaTopicsConfig.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/KafkaTopicsConfig.java`
- 172. `KafkaTopicsProperties.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/KafkaTopicsProperties.java`
- 173. `OpenApiConfig.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/OpenApiConfig.java`
- 174. `SecurityConfig.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/SecurityConfig.java`

### Manejo de Excepciones

- 175. `BusinessRuleException.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/BusinessRuleException.java`
- 176. `ErrorResponse.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/ErrorResponse.java`
- 177. `GlobalExceptionHandler.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/GlobalExceptionHandler.java`
- 178. `ResourceNotFoundException.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/ResourceNotFoundException.java`

### Seguridad, Filtros, Clientes y Utilidades

- 179. `CodigosAula.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/util/CodigosAula.java`
- 180. `CorrelationIdFilter.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/filter/CorrelationIdFilter.java`
- 181. `PlanificadorHorario.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/horario/PlanificadorHorario.java`
- 182. `Respuestas.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/util/Respuestas.java`
- 183. `ServiceTokenFilter.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/filter/ServiceTokenFilter.java`
- 184. `UsuarioActual.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/util/UsuarioActual.java`

### Clase Principal de Arranque

- 185. `PlanificacionMsApplication.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/PlanificacionMsApplication.java`

### Mappers

- 186. `PlanificacionMapper.java` — `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/mapper/PlanificacionMapper.java`

---

## 1. `AnioAcademico.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/AnioAcademico.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "anios_academicos")
@Getter
@Setter
public class AnioAcademico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    @Enumerated(EnumType.STRING)
    private EstadoPeriodo estado = EstadoPeriodo.PLANIFICADO;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
        actualizadoEn = creadoEn;
    }

    @PreUpdate
    void onUpdate() {
        actualizadoEn = LocalDateTime.now();
    }
}
```

---

## 2. `Area.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Area.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/** Área de trabajo del colegio (Dirección, Docencia, Tesorería…) a la que pertenece cada persona del personal. */
@Entity
@Table(name = "areas")
@Getter
@Setter
public class Area {
    /** Código del área cuyo personal puede dictar cursos y ser tutor. */
    public static final String DOCENCIA = "DOCENCIA";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nombre;
    private String descripcion;
    private Boolean activo = true;
}
```

---

## 3. `Asignacion.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Asignacion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "asignaciones")
@Getter
@Setter
public class Asignacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seccion_id")
    private Seccion seccion;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "curso_id")
    private Curso curso;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "docente_id")
    private Docente docente;
}
```

---

## 4. `AsistenciaPersonal.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/AsistenciaPersonal.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

/** Asistencia de una persona del personal en un día. */
@Entity
@Table(name = "asistencia_personal")
@Getter
@Setter
public class AsistenciaPersonal {
    /** Estados válidos; FALTA y JUSTIFICADA no llevan horas. */
    public static final java.util.Set<String> ESTADOS = java.util.Set.of("PRESENTE", "TARDANZA", "FALTA", "JUSTIFICADA", "PERMISO");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    private LocalDate fecha;
    private String estado;
    private LocalTime horaEntrada;
    private LocalTime horaSalida;
    private String observacion;
    private LocalDateTime actualizadoEn;

    @PrePersist
    @PreUpdate
    void alGuardar() {
        actualizadoEn = LocalDateTime.now();
    }

    public static boolean llevaHoras(String estado) {
        return "PRESENTE".equals(estado) || "TARDANZA".equals(estado);
    }
}
```

---

## 5. `Aula.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Aula.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "aulas")
@Getter
@Setter
public class Aula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nombre;
    @Enumerated(EnumType.STRING)
    private TipoAula tipo = TipoAula.AULA;
    private Short capacidad;
    private Boolean activo = true;
    /** Pabellón al que pertenece (opcional). */
    @ManyToOne
    @JoinColumn(name = "pabellon_id")
    private Pabellon pabellon;
}
```

---

## 6. `BloqueHorario.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/BloqueHorario.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bloques_horarios")
@Getter
@Setter
public class BloqueHorario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Turno turno;
    private Short orden;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private Boolean esReceso = false;
}
```

---

## 7. `Colegio.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Colegio.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
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
```

---

## 8. `ContratoPersonal.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/ContratoPersonal.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Contrato de una persona del personal. Estado guardado: VIGENTE o RESCINDIDO; "vencido" y "por vencer" se calculan por fecha. */
@Entity
@Table(name = "contratos_personal")
@Getter
@Setter
public class ContratoPersonal {
    public static final String VIGENTE = "VIGENTE";
    public static final String RESCINDIDO = "RESCINDIDO";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    /** PLAZO_FIJO, INDEFINIDO, POR_HORAS, LOCACION. */
    private String tipo;
    private String cargo;
    private LocalDate fechaInicio;
    /** Vacía en contratos indefinidos. */
    private LocalDate fechaFin;
    /** Remuneración mensual. */
    private BigDecimal remuneracion;
    private String estado = VIGENTE;
    private LocalDate fechaRescision;
    private String motivoRescision;
    private String observaciones;
    private LocalDateTime creadoEn;

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
    }

    /** VIGENTE, POR_VENCER (termina en 30 días o menos), VENCIDO, RESCINDIDO o POR_INICIAR. */
    public String estadoEfectivo(LocalDate hoy) {
        if (RESCINDIDO.equals(estado)) return RESCINDIDO;
        if (fechaInicio.isAfter(hoy)) return "POR_INICIAR";
        if (fechaFin != null && fechaFin.isBefore(hoy)) return "VENCIDO";
        if (fechaFin != null && !fechaFin.isAfter(hoy.plusDays(30))) return "POR_VENCER";
        return VIGENTE;
    }

    /** Fecha hasta la que rige: la rescisión si la hubo, si no el fin (o nada si es indefinido). */
    public LocalDate finEfectivo() {
        if (RESCINDIDO.equals(estado) && fechaRescision != null) {
            return fechaFin == null || fechaRescision.isBefore(fechaFin) ? fechaRescision : fechaFin;
        }
        return fechaFin;
    }
}
```

---

## 9. `CuentaDeposito.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/CuentaDeposito.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Cuenta donde se le deposita el pago a una persona del personal. */
@Entity
@Table(name = "cuentas_deposito_personal")
@Getter
@Setter
public class CuentaDeposito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    /** BCP, BBVA, INTERBANK… (ver {@code CuentaDepositoService.BANCOS}). */
    private String banco;
    /** AHORROS, CORRIENTE, SUELDO o BILLETERA (Yape, Plin: el número es el celular). */
    private String tipo;
    private String numero;
    /** Código de cuenta interbancario (20 dígitos); opcional. */
    private String cci;
    private String titular;
    private boolean principal;
    /** Falso = quitada (se conserva por historial pero ya no se ofrece). */
    private boolean activo = true;
    private LocalDateTime creadoEn;

    @PrePersist
    void alCrear() {
        creadoEn = LocalDateTime.now();
    }
}
```

---

## 10. `Curso.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Curso.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cursos")
@Getter
@Setter
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nombre;
    private String area;
    private Boolean activo = true;
}
```

---

## 11. `Docente.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Docente.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "docentes")
@Getter
@Setter
public class Docente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** Id en auth-ms; número simple, sin relación. */
    private Long usuarioId;
    private String tipoDocumento = "DNI";
    private String numeroDocumento;
    private String nombres;
    private String apellidos;
    private String email;
    private String telefono;
    private String especialidad;
    /** Puesto dentro del área (Director, Psicóloga, Cajero…). */
    private String cargo;
    /** Área de trabajo. Esta tabla es el registro de todo el personal; solo el área DOCENCIA dicta cursos. */
    @ManyToOne(optional = false)
    @JoinColumn(name = "area_id")
    private Area area;
    /** Cursos que puede dictar (su especialidad). Solo tiene sentido para el área DOCENCIA. */
    @ManyToMany
    @JoinTable(name = "docente_cursos", joinColumns = @JoinColumn(name = "docente_id"), inverseJoinColumns = @JoinColumn(name = "curso_id"))
    private Set<Curso> cursos = new LinkedHashSet<>();
    @Enumerated(EnumType.STRING)
    private EstadoDocente estado = EstadoDocente.ACTIVO;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;

    public String nombreCompleto() {
        return apellidos + ", " + nombres;
    }

    /** Puede dictar cursos y ser tutor. Sin área (solo ocurre en pruebas, la columna es obligatoria) se trata como docente. */
    public boolean esDocente() {
        return area == null || Area.DOCENCIA.equals(area.getCodigo());
    }

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
        actualizadoEn = creadoEn;
    }

    @PreUpdate
    void onUpdate() {
        actualizadoEn = LocalDateTime.now();
    }
}
```

---

## 12. `EstadoDocente.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/EstadoDocente.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

public enum EstadoDocente { ACTIVO, INACTIVO }
```

---

## 13. `EstadoPeriodo.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/EstadoPeriodo.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

/** Estado compartido por año académico y periodo. */
public enum EstadoPeriodo { PLANIFICADO, ACTIVO, CERRADO }
```

---

## 14. `Feriado.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Feriado.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "feriados")
@Getter
@Setter
public class Feriado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "anio_academico_id")
    private AnioAcademico anio;
    private LocalDate fecha;
    private String descripcion;
}
```

---

## 15. `Grado.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Grado.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "grados")
@Getter
@Setter
public class Grado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nivel_id")
    private Nivel nivel;
    private Short numero;
    private String nombre;
    private Boolean activo = true;
}
```

---

## 16. `GradoCurso.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/GradoCurso.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "grado_cursos")
@Getter
@Setter
public class GradoCurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "grado_id")
    private Grado grado;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "curso_id")
    private Curso curso;
    private Short horasSemanales = 2;
}
```

---

## 17. `Horario.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Horario.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "horarios")
@Getter
@Setter
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "asignacion_id")
    private Asignacion asignacion;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bloque_id")
    private BloqueHorario bloque;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aula_id")
    private Aula aula;
    /** 1 = lunes ... 7 = domingo. */
    private Short diaSemana;
}
```

---

## 18. `Nivel.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Nivel.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "niveles")
@Getter
@Setter
public class Nivel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nombre;
    private Short orden;
    private Boolean activo = true;
}
```

---

## 19. `Pabellon.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Pabellon.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
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
```

---

## 20. `PagoPersonal.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/PagoPersonal.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/** Una línea de la planilla: sueldo, bono, descuento o adelanto de un periodo (YYYY-MM). */
@Entity
@Table(name = "pagos_personal")
@Getter
@Setter
public class PagoPersonal {
    public static final String PENDIENTE = "PENDIENTE";
    /** Caja ya solicitó el pago (medio y referencia) y espera que el administrador lo apruebe. */
    public static final String POR_APROBAR = "POR_APROBAR";
    public static final String PAGADO = "PAGADO";
    public static final String SUELDO = "SUELDO";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "personal_id")
    private Docente personal;
    @ManyToOne
    @JoinColumn(name = "contrato_id")
    private ContratoPersonal contrato;
    private String periodo;
    /** SUELDO, BONO, DESCUENTO, ADELANTO u OTRO. DESCUENTO y ADELANTO restan. */
    private String concepto;
    private String descripcion;
    /** Siempre positivo; el signo lo da el concepto. */
    private BigDecimal monto;
    private String estado = PENDIENTE;
    private LocalDate fechaPago;
    private String medio;
    private String referencia;
    private LocalDateTime creadoEn;
    /** Quien pidió el pago (caja) y quien lo aprobó o rechazó (administrador). */
    private Long solicitadoPor;
    private LocalDateTime solicitadoEn;
    private Long aprobadoPor;
    private LocalDateTime aprobadoEn;
    /** Por qué el administrador devolvió el pago a pendiente; se borra al volver a solicitarlo. */
    private String motivoRechazo;

    @PrePersist
    void onCreate() {
        creadoEn = LocalDateTime.now();
    }

    public boolean resta() {
        return "DESCUENTO".equals(concepto) || "ADELANTO".equals(concepto);
    }
}
```

---

## 21. `Periodo.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Periodo.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "periodos")
@Getter
@Setter
public class Periodo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "anio_academico_id")
    private AnioAcademico anio;
    private Short numero;
    private String nombre;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    @Enumerated(EnumType.STRING)
    private EstadoPeriodo estado = EstadoPeriodo.PLANIFICADO;
}
```

---

## 22. `PublicacionHorario.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/PublicacionHorario.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "publicaciones_horario")
@Getter
@Setter
public class PublicacionHorario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seccion_id")
    private Seccion seccion;
    private Integer version;
    /** usuario_id en auth-ms (sin relación). */
    private Long publicadoPor;
    private LocalDateTime publicadoEn;

    @PrePersist
    void onCreate() {
        if (publicadoEn == null) {
            publicadoEn = LocalDateTime.now();
        }
    }
}
```

---

## 23. `Seccion.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Seccion.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "secciones")
@Getter
@Setter
public class Seccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "anio_academico_id")
    private AnioAcademico anio;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "grado_id")
    private Grado grado;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aula_id")
    private Aula aula;
    private String nombre;
    @Enumerated(EnumType.STRING)
    private Turno turno = Turno.MANANA;
    private Short capacidad = 30;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_docente_id")
    private Docente tutor;
    private Boolean activo = true;
}
```

---

## 24. `TipoAula.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/TipoAula.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

public enum TipoAula { AULA, LABORATORIO, COMPUTO, AUDITORIO, PATIO, OTRO }
```

---

## 25. `Turno.java` — Entidades JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/entity/Turno.java`

### **¿Qué hace esta clase?**
Entidad JPA (`@Entity`) que mapea una tabla de la base de datos PostgreSQL del microservicio `planificacion-ms`. Define las columnas, relaciones con otras tablas y restricciones de integridad.

```java
package pe.edu.eduspace.planificacion.entity;

public enum Turno { MANANA, TARDE }
```

---

## 26. `AnioAcademicoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AnioAcademicoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AnioAcademico`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.AnioAcademico;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;

public interface AnioAcademicoRepository extends JpaRepository<AnioAcademico, Long> {
    Optional<AnioAcademico> findFirstByEstado(EstadoPeriodo estado);

    boolean existsByNombre(String nombre);

    boolean existsByNombreAndIdNot(String nombre, Long id);

    boolean existsByEstado(EstadoPeriodo estado);
}
```

---

## 27. `AreaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AreaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Area`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Area;

public interface AreaRepository extends JpaRepository<Area, Long> {
    List<Area> findByActivoTrueOrderByNombre();

    List<Area> findAllByOrderByNombre();

    Optional<Area> findByCodigo(String codigo);

    boolean existsByCodigo(String codigo);
}
```

---

## 28. `AsignacionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AsignacionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Asignacion`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.planificacion.entity.Asignacion;

public interface AsignacionRepository extends JpaRepository<Asignacion, Long> {
    List<Asignacion> findBySeccionId(Long seccionId);

    List<Asignacion> findByDocenteId(Long docenteId);

    @Query("select a from Asignacion a where a.seccion.anio.id = :anioId order by a.seccion.id, a.curso.id")
    List<Asignacion> findByAnio(@Param("anioId") Long anioId);

    Optional<Asignacion> findBySeccionIdAndCursoId(Long seccionId, Long cursoId);

    boolean existsBySeccionIdAndCursoId(Long seccionId, Long cursoId);

    boolean existsByDocenteId(Long docenteId);

    boolean existsByDocenteIdAndSeccionIdAndCursoId(Long docenteId, Long seccionId, Long cursoId);

    @Query("""
            select a from Asignacion a
            where a.docente.id = :docenteId and (:anioId is null or a.seccion.anio.id = :anioId)
            """)
    List<Asignacion> findByDocenteAndAnio(@Param("docenteId") Long docenteId, @Param("anioId") Long anioId);

    @Query("""
            select count(a) > 0 from Asignacion a
            where a.seccion.grado.id = :gradoId and a.curso.id = :cursoId
            """)
    boolean existsByGradoAndCurso(@Param("gradoId") Long gradoId, @Param("cursoId") Long cursoId);
}
```

---

## 29. `AsistenciaPersonalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AsistenciaPersonalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `AsistenciaPersonal`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.AsistenciaPersonal;

public interface AsistenciaPersonalRepository extends JpaRepository<AsistenciaPersonal, Long> {
    List<AsistenciaPersonal> findByFechaBetweenOrderByFechaAscIdAsc(LocalDate desde, LocalDate hasta);

    List<AsistenciaPersonal> findByPersonalIdAndFechaBetweenOrderByFechaAsc(Long personalId, LocalDate desde, LocalDate hasta);

    Optional<AsistenciaPersonal> findByPersonalIdAndFecha(Long personalId, LocalDate fecha);

    boolean existsByPersonalId(Long personalId);
}
```

---

## 30. `AulaRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/AulaRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Aula`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Aula;
import pe.edu.eduspace.planificacion.entity.TipoAula;

public interface AulaRepository extends JpaRepository<Aula, Long> {
    List<Aula> findByTipoOrderByCodigo(TipoAula tipo);

    List<Aula> findAllByOrderByCodigo();

    /** Aulas que ya pertenecen a un pabellón (para no registrar más de las declaradas). */
    long countByPabellonId(Long pabellonId);

    List<Aula> findByPabellonIdOrderByCodigo(Long pabellonId);

    /** Alumnos que caben en todas las aulas de un pabellón. */
    @org.springframework.data.jpa.repository.Query("select coalesce(sum(a.capacidad), 0) from Aula a where a.pabellon.id = :pabellonId")
    long sumaCapacidad(@org.springframework.data.repository.query.Param("pabellonId") Long pabellonId);

    long countByPabellonIdAndIdNot(Long pabellonId, Long id);

    boolean existsByCodigo(String codigo);

    boolean existsByCodigoAndIdNot(String codigo, Long id);
}
```

---

## 31. `BloqueHorarioRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/BloqueHorarioRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `BloqueHorario`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.planificacion.entity.BloqueHorario;
import pe.edu.eduspace.planificacion.entity.Turno;

public interface BloqueHorarioRepository extends JpaRepository<BloqueHorario, Long> {
    List<BloqueHorario> findByTurnoOrderByOrden(Turno turno);

    List<BloqueHorario> findAllByOrderByTurnoAscOrdenAsc();

    boolean existsByTurnoAndOrden(Turno turno, Short orden);

    boolean existsByTurnoAndOrdenAndIdNot(Turno turno, Short orden, Long id);

    @Query("""
            select count(b) > 0 from BloqueHorario b
            where b.turno = :turno and (:excluirId is null or b.id <> :excluirId)
              and b.horaInicio < :fin and b.horaFin > :inicio
            """)
    boolean haySolapamiento(@Param("turno") Turno turno, @Param("inicio") LocalTime inicio,
                            @Param("fin") LocalTime fin, @Param("excluirId") Long excluirId);
}
```

---

## 32. `ColegioRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/ColegioRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Colegio`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Colegio;

public interface ColegioRepository extends JpaRepository<Colegio, Short> {
}
```

---

## 33. `ContratoPersonalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/ContratoPersonalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `ContratoPersonal`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.ContratoPersonal;

public interface ContratoPersonalRepository extends JpaRepository<ContratoPersonal, Long> {
    List<ContratoPersonal> findByPersonalIdOrderByFechaInicioDesc(Long personalId);

    List<ContratoPersonal> findAllByOrderByFechaInicioDesc();

    List<ContratoPersonal> findByEstado(String estado);

    boolean existsByPersonalId(Long personalId);
}
```

---

## 34. `CuentaDepositoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/CuentaDepositoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `CuentaDeposito`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.CuentaDeposito;

public interface CuentaDepositoRepository extends JpaRepository<CuentaDeposito, Long> {
    /** Las cuentas activas de una persona: la principal primero. */
    List<CuentaDeposito> findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(Long personalId);

    /** Las cuentas activas de todo el personal (para mostrar a cuál se deposita en la planilla). */
    List<CuentaDeposito> findByActivoTrueOrderByPersonalIdAscPrincipalDescIdAsc();

    boolean existsByPersonalIdAndBancoAndNumeroAndActivoTrue(Long personalId, String banco, String numero);

    boolean existsByPersonalIdAndBancoAndNumeroAndActivoTrueAndIdNot(Long personalId, String banco, String numero, Long id);
}
```

---

## 35. `CursoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/CursoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Curso`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findAllByOrderByNombre();

    List<Curso> findByIdIn(List<Long> ids);

    boolean existsByCodigo(String codigo);

    boolean existsByCodigoAndIdNot(String codigo, Long id);
}
```

---

## 36. `DocenteRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/DocenteRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Docente`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.planificacion.entity.Docente;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
    /** {@code q} nunca es nulo (texto vacío = sin filtro): PostgreSQL no infiere el tipo de un parámetro nulo en LIKE. */
    @Query("""
            select d from Docente d
            where lower(d.apellidos) like lower(concat('%', :q, '%'))
               or lower(d.nombres) like lower(concat('%', :q, '%'))
               or d.numeroDocumento like concat('%', :q, '%')
            order by d.id desc
            """)
    Page<Docente> buscar(@Param("q") String q, Pageable pageable);

    /** Igual que {@link #buscar}, pero solo el personal de un área. */
    @Query("""
            select d from Docente d
            where d.area.id = :areaId
              and (lower(d.apellidos) like lower(concat('%', :q, '%'))
                or lower(d.nombres) like lower(concat('%', :q, '%'))
                or d.numeroDocumento like concat('%', :q, '%'))
            order by d.id desc
            """)
    Page<Docente> buscarPorArea(@Param("q") String q, @Param("areaId") Long areaId, Pageable pageable);

    /** Igual que {@link #buscar}, pero solo las personas con ese estado (ACTIVO o INACTIVO). */
    @Query("""
            select d from Docente d
            where d.estado = :estado
              and (lower(d.apellidos) like lower(concat('%', :q, '%'))
                or lower(d.nombres) like lower(concat('%', :q, '%'))
                or d.numeroDocumento like concat('%', :q, '%'))
            order by d.id desc
            """)
    Page<Docente> buscarPorEstado(@Param("q") String q, @Param("estado") pe.edu.eduspace.planificacion.entity.EstadoDocente estado, Pageable pageable);

    /** Igual que {@link #buscarPorEstado}, pero solo el personal de un área. */
    @Query("""
            select d from Docente d
            where d.area.id = :areaId
              and d.estado = :estado
              and (lower(d.apellidos) like lower(concat('%', :q, '%'))
                or lower(d.nombres) like lower(concat('%', :q, '%'))
                or d.numeroDocumento like concat('%', :q, '%'))
            order by d.id desc
            """)
    Page<Docente> buscarPorAreaYEstado(@Param("q") String q, @Param("areaId") Long areaId,
                                       @Param("estado") pe.edu.eduspace.planificacion.entity.EstadoDocente estado, Pageable pageable);

    /** Personas del área con ese estado (para no desactivar un área con personal activo). */
    long countByAreaIdAndEstado(Long areaId, pe.edu.eduspace.planificacion.entity.EstadoDocente estado);

    Optional<Docente> findByUsuarioId(Long usuarioId);

    boolean existsByTipoDocumentoAndNumeroDocumento(String tipo, String numero);

    boolean existsByTipoDocumentoAndNumeroDocumentoAndIdNot(String tipo, String numero, Long id);

    boolean existsByUsuarioIdAndIdNot(Long usuarioId, Long id);
}
```

---

## 37. `FeriadoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/FeriadoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Feriado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Feriado;

public interface FeriadoRepository extends JpaRepository<Feriado, Long> {
    List<Feriado> findByAnioIdOrderByFecha(Long anioId);

    boolean existsByAnioIdAndFecha(Long anioId, LocalDate fecha);

    Optional<Feriado> findFirstByFecha(LocalDate fecha);
}
```

---

## 38. `GradoCursoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/GradoCursoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `GradoCurso`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.GradoCurso;

public interface GradoCursoRepository extends JpaRepository<GradoCurso, Long> {
    List<GradoCurso> findByGradoIdOrderByCursoNombre(Long gradoId);

    Optional<GradoCurso> findByGradoIdAndCursoId(Long gradoId, Long cursoId);

    boolean existsByGradoIdAndCursoId(Long gradoId, Long cursoId);

    long countByGradoId(Long gradoId);

    long countByCursoId(Long cursoId);
}
```

---

## 39. `GradoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/GradoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Grado`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Grado;

public interface GradoRepository extends JpaRepository<Grado, Long> {
    List<Grado> findByNivelIdOrderByNumero(Long nivelId);

    List<Grado> findAllByOrderByNivelOrdenAscNumeroAsc();

    Optional<Grado> findByNivelIdAndNumero(Long nivelId, Short numero);
}
```

---

## 40. `HorarioRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/HorarioRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Horario`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.planificacion.entity.Horario;

public interface HorarioRepository extends JpaRepository<Horario, Long> {

    @Query("""
            select h from Horario h
            where h.asignacion.seccion.id = :seccionId
            order by h.diaSemana, h.bloque.orden
            """)
    List<Horario> findBySeccion(@Param("seccionId") Long seccionId);

    @Query("""
            select h from Horario h
            where h.asignacion.docente.id = :docenteId
            order by h.diaSemana, h.bloque.turno, h.bloque.orden
            """)
    List<Horario> findByDocente(@Param("docenteId") Long docenteId);

    /** Choque de docente: mismo docente, día y bloque (en cualquier sección). */
    @Query("""
            select count(h) > 0 from Horario h
            where h.asignacion.docente.id = :docenteId and h.diaSemana = :dia and h.bloque.id = :bloqueId
              and (:excluirId is null or h.id <> :excluirId)
            """)
    boolean existsChoqueDocente(@Param("docenteId") Long docenteId, @Param("dia") Short dia,
                                @Param("bloqueId") Long bloqueId, @Param("excluirId") Long excluirId);

    @Query("""
            select count(h) > 0 from Horario h
            where h.aula.id = :aulaId and h.diaSemana = :dia and h.bloque.id = :bloqueId
              and (:excluirId is null or h.id <> :excluirId)
            """)
    boolean existsChoqueAula(@Param("aulaId") Long aulaId, @Param("dia") Short dia,
                             @Param("bloqueId") Long bloqueId, @Param("excluirId") Long excluirId);

    @Query("""
            select count(h) > 0 from Horario h
            where h.asignacion.seccion.id = :seccionId and h.diaSemana = :dia and h.bloque.id = :bloqueId
              and (:excluirId is null or h.id <> :excluirId)
            """)
    boolean existsChoqueSeccion(@Param("seccionId") Long seccionId, @Param("dia") Short dia,
                                @Param("bloqueId") Long bloqueId, @Param("excluirId") Long excluirId);

    /** Todas las clases de las secciones del año (el generador las usa como espacios ya ocupados). */
    @Query("select h from Horario h where h.asignacion.seccion.anio.id = :anioId")
    List<Horario> findByAnio(@Param("anioId") Long anioId);

    long countByAsignacionId(Long asignacionId);

    @Query("select count(h) from Horario h where h.asignacion.id = :asignacionId and (:excluirId is null or h.id <> :excluirId)")
    long countByAsignacionExcluyendo(@Param("asignacionId") Long asignacionId, @Param("excluirId") Long excluirId);

    boolean existsByAulaId(Long aulaId);

    boolean existsByBloqueId(Long bloqueId);
}
```

---

## 41. `NivelRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/NivelRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Nivel`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Nivel;

public interface NivelRepository extends JpaRepository<Nivel, Long> {
    List<Nivel> findAllByOrderByOrden();
}
```

---

## 42. `PabellonRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PabellonRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Pabellon`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.Pabellon;

public interface PabellonRepository extends JpaRepository<Pabellon, Long> {
    List<Pabellon> findAllByOrderByNombre();

    boolean existsByNombreIgnoreCase(String nombre);

    boolean existsByNombreIgnoreCaseAndIdNot(String nombre, Long id);
}
```

---

## 43. `PagoPersonalRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PagoPersonalRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `PagoPersonal`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.PagoPersonal;

public interface PagoPersonalRepository extends JpaRepository<PagoPersonal, Long> {
    List<PagoPersonal> findByPersonalIdOrderByPeriodoDescIdDesc(Long personalId);

    List<PagoPersonal> findByPeriodoOrderByIdAsc(String periodo);

    /** Pagos en un estado (p. ej. los que caja solicitó y el administrador debe aprobar), del más antiguo al más reciente. */
    List<PagoPersonal> findByEstadoOrderBySolicitadoEnAscIdAsc(String estado);

    long countByEstado(String estado);

    /** ¿Ya tiene esa persona un pago de ese concepto en el periodo (de cualquiera de sus contratos)? */
    boolean existsByPersonalIdAndPeriodoAndConcepto(Long personalId, String periodo, String concepto);

    boolean existsByContratoIdAndPeriodoAndConcepto(Long contratoId, String periodo, String concepto);

    boolean existsByPersonalId(Long personalId);
}
```

---

## 44. `PeriodoRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PeriodoRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Periodo`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;
import pe.edu.eduspace.planificacion.entity.Periodo;

public interface PeriodoRepository extends JpaRepository<Periodo, Long> {
    List<Periodo> findByAnioIdOrderByNumero(Long anioId);

    boolean existsByAnioIdAndNumero(Long anioId, Short numero);

    boolean existsByAnioIdAndNumeroAndIdNot(Long anioId, Short numero, Long id);

    boolean existsByAnioIdAndEstadoAndIdNot(Long anioId, EstadoPeriodo estado, Long id);

    @Query("""
            select count(p) > 0 from Periodo p
            where p.anio.id = :anioId and (:excluirId is null or p.id <> :excluirId)
              and p.fechaInicio <= :fin and p.fechaFin >= :inicio
            """)
    boolean haySolapamiento(@Param("anioId") Long anioId, @Param("inicio") LocalDate inicio,
                            @Param("fin") LocalDate fin, @Param("excluirId") Long excluirId);
}
```

---

## 45. `PublicacionHorarioRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/PublicacionHorarioRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `PublicacionHorario`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.eduspace.planificacion.entity.PublicacionHorario;

public interface PublicacionHorarioRepository extends JpaRepository<PublicacionHorario, Long> {
    Optional<PublicacionHorario> findFirstBySeccionIdOrderByVersionDesc(Long seccionId);

    List<PublicacionHorario> findBySeccionIdOrderByVersionDesc(Long seccionId);
}
```

---

## 46. `SeccionRepository.java` — Repositorios Spring Data JPA

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/repository/SeccionRepository.java`

### **¿Qué hace esta clase?**
Interfaz Spring Data JPA para la entidad `Seccion`. Define métodos CRUD automáticos y consultas personalizadas con JPQL/nativas para acceder a la tabla correspondiente en PostgreSQL.

```java
package pe.edu.eduspace.planificacion.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.eduspace.planificacion.entity.Seccion;

public interface SeccionRepository extends JpaRepository<Seccion, Long> {
    @Query("""
            select s from Seccion s
            where (:anioId is null or s.anio.id = :anioId) and (:gradoId is null or s.grado.id = :gradoId)
            order by s.grado.id, s.nombre
            """)
    List<Seccion> buscar(@Param("anioId") Long anioId, @Param("gradoId") Long gradoId);

    long countByGradoId(Long gradoId);

    boolean existsByAnioIdAndGradoIdAndNombre(Long anioId, Long gradoId, String nombre);

    boolean existsByAnioIdAndGradoIdAndNombreAndIdNot(Long anioId, Long gradoId, String nombre, Long id);

    long countByAulaId(Long aulaId);

    long countByAulaIdAndActivoTrue(Long aulaId);

    /** Secciones activas que usan un aula (para no dejarle al aula menos capacidad que la de una sección). */
    List<Seccion> findByAulaIdAndActivoTrue(Long aulaId);

    long countByTutorId(Long docenteId);
}
```

---

## 47. `AnioRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AnioRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Anio`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record AnioRequest(
        @NotBlank @Size(max = 20) String nombre,
        @NotNull LocalDate fechaInicio,
        @NotNull LocalDate fechaFin) {
}
```

---

## 48. `AnioResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AnioResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Anio`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalDate;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;

public record AnioResponse(Long id, String nombre, LocalDate fechaInicio, LocalDate fechaFin, EstadoPeriodo estado) {
}
```

---

## 49. `AreaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AreaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Area`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** Alta de un área de trabajo. El código no cambia después (lo usan las reglas, p. ej. DOCENCIA). */
public record AreaRequest(
        @NotBlank @Size(max = 30) @Pattern(regexp = "[A-Z0-9_]+", message = "El código usa solo mayúsculas, números y guion bajo") String codigo,
        @NotBlank @Size(max = 100) String nombre,
        @Size(max = 255) String descripcion) {
}
```

---

## 50. `AreaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AreaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Area`.

```java
package pe.edu.eduspace.planificacion.dto;

public record AreaResponse(Long id, String codigo, String nombre, String descripcion, Boolean activo) {
}
```

---

## 51. `AreaUpdateRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AreaUpdateRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `AreaUpdate`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AreaUpdateRequest(@NotBlank @Size(max = 100) String nombre, @Size(max = 255) String descripcion) {
}
```

---

## 52. `AsignacionDocenteRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionDocenteRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `AsignacionDocente`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotNull;

public record AsignacionDocenteRequest(@NotNull Long docenteId) {
}
```

---

## 53. `AsignacionInternaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionInternaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `AsignacionInterna`.

```java
package pe.edu.eduspace.planificacion.dto;

public record AsignacionInternaResponse(Long seccionId, Long cursoId, Long asignacionId) {
}
```

---

## 54. `AsignacionRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Asignacion`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotNull;

public record AsignacionRequest(@NotNull Long seccionId, @NotNull Long cursoId, @NotNull Long docenteId) {
}
```

---

## 55. `AsignacionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsignacionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Asignacion`.

```java
package pe.edu.eduspace.planificacion.dto;

public record AsignacionResponse(Long id, Long seccionId, String seccionNombre, Long cursoId, String cursoNombre,
                                 Long docenteId, String docenteNombre) {
}
```

---

## 56. `AsistenciaPersonalDtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AsistenciaPersonalDtos.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `AsistenciaPersonalDtos`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import pe.edu.eduspace.planificacion.entity.AsistenciaPersonal;

/** Asistencia del personal. */
public final class AsistenciaPersonalDtos {

    private AsistenciaPersonalDtos() {
    }

    /** {@code estado} vacío = dejar el día sin marcar (borra el registro si existía). */
    public record Marca(@NotNull Long personalId, String estado, LocalTime horaEntrada, LocalTime horaSalida, @Size(max = 255) String observacion) {
    }

    public record RegistroDia(@NotNull LocalDate fecha, @NotEmpty List<@Valid Marca> marcas) {
    }

    public record Asistencia(Long id, Long personalId, String personalNombre, String areaNombre, LocalDate fecha, String estado,
                             LocalTime horaEntrada, LocalTime horaSalida, String observacion) {

        public static Asistencia de(AsistenciaPersonal a) {
            var p = a.getPersonal();
            return new Asistencia(a.getId(), p.getId(), p.nombreCompleto(), p.getArea() == null ? null : p.getArea().getNombre(),
                    a.getFecha(), a.getEstado(), a.getHoraEntrada(), a.getHoraSalida(), a.getObservacion());
        }
    }

    public record ResultadoDia(LocalDate fecha, int guardadas, int borradas) {
    }
}
```

---

## 57. `AulaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AulaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Aula`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pe.edu.eduspace.planificacion.entity.TipoAula;

/** {@code pabellonId} es opcional: un aula puede no pertenecer a ningún pabellón. */
public record AulaRequest(
        @NotBlank @Size(max = 20) String codigo,
        @NotBlank @Size(max = 80) String nombre,
        TipoAula tipo,
        @NotNull @Min(1) Short capacidad,
        Boolean activo,
        Long pabellonId) {
}
```

---

## 58. `AulaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AulaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Aula`.

```java
package pe.edu.eduspace.planificacion.dto;

import pe.edu.eduspace.planificacion.entity.TipoAula;

public record AulaResponse(Long id, String codigo, String nombre, TipoAula tipo, Short capacidad, Boolean activo,
                           Long pabellonId, String pabellonNombre) {
}
```

---

## 59. `AulasPabellonRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/AulasPabellonRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `AulasPabellon`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

/** Cómo crear las aulas que le faltan a un pabellón. Sin capacidad, cada aula nace con 30. */
public record AulasPabellonRequest(@Min(1) @Max(500) Short capacidad) {
}
```

---

## 60. `BloqueRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/BloqueRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Bloque`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalTime;
import pe.edu.eduspace.planificacion.entity.Turno;

public record BloqueRequest(@NotNull Turno turno, @NotNull @Min(1) Short orden, @NotNull LocalTime horaInicio,
                            @NotNull LocalTime horaFin, Boolean esReceso) {
}
```

---

## 61. `BloqueResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/BloqueResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Bloque`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalTime;
import pe.edu.eduspace.planificacion.entity.Turno;

public record BloqueResponse(Long id, Turno turno, Short orden, LocalTime horaInicio, LocalTime horaFin,
                             Boolean esReceso) {
}
```

---

## 62. `CambioEstadoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CambioEstadoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `CambioEstado`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotNull;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;

public record CambioEstadoRequest(@NotNull EstadoPeriodo estado) {
}
```

---

## 63. `CapacidadesPabellonRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CapacidadesPabellonRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `CapacidadesPabellon`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/** La capacidad (alumnos que caben) de varias aulas de un pabellón, en un solo paso. */
public record CapacidadesPabellonRequest(@NotEmpty @Valid List<Item> aulas) {

    public record Item(@NotNull Long aulaId, @NotNull @Min(1) @Max(500) Short capacidad) {
    }
}
```

---

## 64. `CatalogoUpdateRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CatalogoUpdateRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `CatalogoUpdate`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Edición menor de niveles y grados: solo nombre y estado. */
public record CatalogoUpdateRequest(@NotBlank @Size(max = 50) String nombre, Boolean activo) {
}
```

---

## 65. `ColegioRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ColegioRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Colegio`.

```java
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
```

---

## 66. `ColegioResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ColegioResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Colegio`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalDateTime;

public record ColegioResponse(String nombre, String nombreCorto, String lema, String codigoModular, String ruc, String ugel,
                              String gestion, String director, String direccion, String distrito, String provincia,
                              String departamento, String telefono, String email, String sitioWeb, LocalDateTime actualizadoEn) {
}
```

---

## 67. `CursoHorasResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CursoHorasResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `CursoHoras`.

```java
package pe.edu.eduspace.planificacion.dto;

public record CursoHorasResponse(Long cursoId, String cursoNombre, int horasRequeridas, int horasProgramadas,
                                 String estado) {
}
```

---

## 68. `CursoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CursoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Curso`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CursoRequest(
        @NotBlank @Size(max = 20) String codigo,
        @NotBlank @Size(max = 100) String nombre,
        @Size(max = 60) String area,
        Boolean activo) {
}
```

---

## 69. `CursoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/CursoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Curso`.

```java
package pe.edu.eduspace.planificacion.dto;

public record CursoResponse(Long id, String codigo, String nombre, String area, Boolean activo) {
}
```

---

## 70. `DocenteRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/DocenteRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Docente`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

/** {@code areaId} vacío = área Docencia (así siguen funcionando quienes registran docentes sin indicar área). */
public record DocenteRequest(
        @Size(max = 10) String tipoDocumento,
        @NotBlank @Size(max = 20) String numeroDocumento,
        @NotBlank @Size(max = 100) String nombres,
        @NotBlank @Size(max = 100) String apellidos,
        @Email @Size(max = 150) String email,
        @Size(max = 20) String telefono,
        @Size(max = 100) String especialidad,
        @Size(max = 100) String cargo,
        Long areaId,
        /** Cursos que puede dictar (solo personal de Docencia). {@code null} = no cambiar los que ya tiene. */
        List<Long> cursoIds) {
}
```

---

## 71. `DocenteResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/DocenteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Docente`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;

/** Persona del personal del colegio con su área de trabajo (docente cuando el área es DOCENCIA) y los cursos que puede dictar. */
public record DocenteResponse(Long id, Long usuarioId, String tipoDocumento, String numeroDocumento, String nombres,
                              String apellidos, String email, String telefono, String especialidad, String cargo,
                              Long areaId, String areaCodigo, String areaNombre, EstadoDocente estado, List<Long> cursoIds) {
}
```

---

## 72. `EsHabilResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/EsHabilResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `EsHabil`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalDate;

public record EsHabilResponse(LocalDate fecha, boolean habil, String motivo) {
}
```

---

## 73. `FeriadoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/FeriadoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Feriado`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record FeriadoRequest(@NotNull Long anioId, @NotNull LocalDate fecha,
                             @NotBlank @Size(max = 150) String descripcion) {
}
```

---

## 74. `FeriadoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/FeriadoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Feriado`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalDate;

public record FeriadoResponse(Long id, Long anioId, LocalDate fecha, String descripcion) {
}
```

---

## 75. `GenerarHorarioRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GenerarHorarioRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `GenerarHorario`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * Pide armar el horario de varias secciones. {@code seccionIds} vacío = todas las del año. {@code reemplazar} borra las clases
 * actuales de esas secciones (si no, solo completa lo que falta). {@code asignarDocentes} asigna por especialidad a los cursos
 * que aún no tienen docente. {@code simular} calcula y devuelve el resultado sin guardar nada.
 */
public record GenerarHorarioRequest(@NotNull Long anioId, List<Long> seccionIds, Boolean reemplazar, Boolean asignarDocentes,
                                    Boolean simular) {
}
```

---

## 76. `GradoOfertaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GradoOfertaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `GradoOferta`.

```java
package pe.edu.eduspace.planificacion.dto;

/**
 * Un grado de la oferta estándar (Inicial 3 a 5 años, Primaria 1.° a 6.°, Secundaria 1.° a 5.°).
 * {@code seleccionado}: el colegio lo ofrece. {@code enUso}: ya tiene secciones o cursos en su malla, así que no se puede quitar.
 */
public record GradoOfertaResponse(Long gradoId, String nivelCodigo, String nivelNombre, int numero, String nombre,
                                  boolean seleccionado, boolean enUso, String detalleUso) {
}
```

---

## 77. `GradoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GradoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Grado`.

```java
package pe.edu.eduspace.planificacion.dto;

public record GradoResponse(Long id, Long nivelId, String nivelNombre, Short numero, String nombre, Boolean activo) {
}
```

---

## 78. `GradosPabellonRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/GradosPabellonRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `GradosPabellon`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

/** Los grados que usan un pabellón: reemplaza la lista anterior (vacía = ninguno). */
public record GradosPabellonRequest(@NotNull List<Long> gradoIds) {
}
```

---

## 79. `HorarioDocenteResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioDocenteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `HorarioDocente`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;

public record HorarioDocenteResponse(Long docenteId, String docenteNombre, List<HorarioResponse> clases) {
}
```

---

## 80. `HorarioRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Horario`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record HorarioRequest(@NotNull Long asignacionId, @NotNull Long bloqueId, Long aulaId,
                             @NotNull @Min(1) @Max(7) Short diaSemana) {
}
```

---

## 81. `HorarioResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Horario`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalTime;

public record HorarioResponse(Long id, Long asignacionId, Long seccionId, String seccionNombre, Long cursoId,
                              String cursoNombre, Long docenteId, String docenteNombre, Long bloqueId,
                              Short bloqueOrden, LocalTime horaInicio, LocalTime horaFin, Long aulaId,
                              String aulaNombre, Short diaSemana) {
}
```

---

## 82. `HorarioSeccionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/HorarioSeccionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `HorarioSeccion`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;
import pe.edu.eduspace.planificacion.entity.Turno;

/** Cuadrícula día × bloque de una sección: los bloques son las filas, cada clase se ubica por día y bloque. */
public record HorarioSeccionResponse(Long seccionId, String seccionNombre, Turno turno,
                                     List<BloqueResponse> bloques, List<HorarioResponse> clases) {
}
```

---

## 83. `InternalDocenteResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/InternalDocenteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `InternalDocente`.

```java
package pe.edu.eduspace.planificacion.dto;

import pe.edu.eduspace.planificacion.entity.EstadoDocente;

public record InternalDocenteResponse(Long docenteId, String nombre, EstadoDocente estado) {
}
```

---

## 84. `MallaGradoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaGradoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `MallaGrado`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;

public record MallaGradoResponse(Long gradoId, String gradoNombre, int totalHoras, List<MallaItemResponse> cursos) {
}
```

---

## 85. `MallaHorasRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaHorasRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `MallaHoras`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record MallaHorasRequest(@NotNull @Min(1) Short horasSemanales) {
}
```

---

## 86. `MallaItemResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaItemResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `MallaItem`.

```java
package pe.edu.eduspace.planificacion.dto;

public record MallaItemResponse(Long id, Long cursoId, String cursoCodigo, String cursoNombre, Short horasSemanales) {
}
```

---

## 87. `MallaLoteRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaLoteRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `MallaLote`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/** Agrega varios cursos a la malla de varios grados de una vez (p. ej. los cursos de Primaria a los 6 grados). */
public record MallaLoteRequest(@NotEmpty List<Long> gradoIds, @NotEmpty List<@Valid ItemLote> cursos, Boolean sobrescribir) {

    public record ItemLote(@NotNull Long cursoId, @NotNull @Min(1) @Max(40) Short horasSemanales) {
    }
}
```

---

## 88. `MallaLoteResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaLoteResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `MallaLote`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;

public record MallaLoteResponse(int creados, int actualizados, int omitidos, List<String> detalle) {
}
```

---

## 89. `MallaRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/MallaRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Malla`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record MallaRequest(@NotNull Long gradoId, @NotNull Long cursoId, @NotNull @Min(1) Short horasSemanales) {
}
```

---

## 90. `NivelResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/NivelResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Nivel`.

```java
package pe.edu.eduspace.planificacion.dto;

public record NivelResponse(Long id, String codigo, String nombre, Short orden, Boolean activo) {
}
```

---

## 91. `OfertaGradosRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/OfertaGradosRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `OfertaGrados`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/** Los grados que ofrece el colegio. Los que no estén en la lista se desactivan (si no tienen secciones ni malla). */
public record OfertaGradosRequest(@NotEmpty(message = "Elige al menos un grado") @Valid List<Clave> seleccionados) {

    public record Clave(@NotBlank String nivelCodigo, @NotNull Short numero) {
    }
}
```

---

## 92. `PabellonRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PabellonRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Pabellon`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** El nombre es libre (A, B, «Central»…); la cantidad es cuántas aulas tiene el pabellón. */
public record PabellonRequest(
        @NotBlank @Size(max = 30) String nombre,
        @NotNull @Min(0) @Max(500) Short cantidadAulas) {
}
```

---

## 93. `PabellonResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PabellonResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Pabellon`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;

/**
 * {@code aulasRegistradas}: las aulas del catálogo que ya pertenecen al pabellón (no puede superar {@code cantidadAulas}).
 * {@code capacidadAlumnos}: cuántos alumnos caben en total en esas aulas.
 * {@code gradoIds}: los grados que usan el pabellón (ordenados).
 */
public record PabellonResponse(Long id, String nombre, Short cantidadAulas, long aulasRegistradas, long capacidadAlumnos, List<Long> gradoIds) {
}
```

---

## 94. `PageResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PageResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Page`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;
import org.springframework.data.domain.Page;

public record PageResponse<T>(List<T> contenido, int pagina, int tamano, long total, int totalPaginas) {
    public static <T> PageResponse<T> of(Page<T> page) {
        return new PageResponse<>(page.getContent(), page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages());
    }
}
```

---

## 95. `PeriodoRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PeriodoRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Periodo`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record PeriodoRequest(
        @NotNull Long anioId,
        @NotNull @Min(1) @Max(12) Short numero,
        @NotBlank @Size(max = 40) String nombre,
        @NotNull LocalDate fechaInicio,
        @NotNull LocalDate fechaFin) {
}
```

---

## 96. `PeriodoResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PeriodoResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Periodo`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalDate;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;

public record PeriodoResponse(Long id, Long anioId, Short numero, String nombre, LocalDate fechaInicio,
                              LocalDate fechaFin, EstadoPeriodo estado) {
}
```

---

## 97. `PreparacionSeccionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PreparacionSeccionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `PreparacionSeccion`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;
import pe.edu.eduspace.planificacion.entity.Turno;

/** Qué le falta a una sección para poder armar su horario. {@code lista} = sin problemas pendientes. */
public record PreparacionSeccionResponse(Long seccionId, String nombre, Long gradoId, String gradoNombre, Long nivelId, String nivelNombre,
                                         Turno turno, String aula, int cursosMalla, int horasMalla, int espacios, List<String> sinDocente,
                                         int clasesProgramadas, boolean lista, List<String> problemas) {
}
```

---

## 98. `PublicacionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/PublicacionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Publicacion`.

```java
package pe.edu.eduspace.planificacion.dto;

import java.time.LocalDateTime;

public record PublicacionResponse(Long id, Long seccionId, Integer version, Long publicadoPor,
                                  LocalDateTime publicadoEn) {
}
```

---

## 99. `ResultadoGeneracion.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ResultadoGeneracion.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;

public record ResultadoGeneracion(boolean simulacion, int seccionesGeneradas, int seccionesOmitidas, int horasColocadas, int horasSinColocar,
                                  int docentesAsignados, List<ResultadoSeccionGeneracion> secciones) {
}
```

---

## 100. `ResultadoSeccionGeneracion.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ResultadoSeccionGeneracion.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;

/** {@code estado}: GENERADO, INCOMPLETO (quedaron horas sin lugar), SIN_CAMBIOS (ya estaba completo) u OMITIDO (no estaba lista). */
public record ResultadoSeccionGeneracion(Long seccionId, String nombre, String estado, int requeridas, int colocadas, List<String> mensajes) {
}
```

---

## 101. `ResultadoValidacionHorario.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/ResultadoValidacionHorario.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.dto;

import java.util.List;

public record ResultadoValidacionHorario(boolean valido, List<String> choques,
                                         List<CursoHorasResponse> cursosIncompletos) {
}
```

---

## 102. `RrhhDtos.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/RrhhDtos.java`

### **¿Qué hace esta clase?**
Contenedor de múltiples DTOs relacionados definidos como records o inner classes para `RrhhDtos`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import pe.edu.eduspace.planificacion.entity.ContratoPersonal;
import pe.edu.eduspace.planificacion.entity.PagoPersonal;

/** Contratos y pagos del personal (recursos humanos). */
public final class RrhhDtos {

    private RrhhDtos() {
    }

    public record ContratoRequest(
            @NotNull Long personalId,
            @NotBlank @Pattern(regexp = "PLAZO_FIJO|INDEFINIDO|POR_HORAS|LOCACION") String tipo,
            @Size(max = 100) String cargo,
            @NotNull LocalDate fechaInicio,
            LocalDate fechaFin,
            @NotNull @DecimalMin("0.00") BigDecimal remuneracion,
            @Size(max = 500) String observaciones) {
    }

    /** Renovación: el inicio lo pone el servidor (día siguiente al fin del contrato anterior). Lo que no se indique se hereda del anterior. */
    public record RenovarRequest(
            @Pattern(regexp = "PLAZO_FIJO|INDEFINIDO|POR_HORAS|LOCACION") String tipo,
            @Size(max = 100) String cargo,
            LocalDate fechaFin,
            @DecimalMin("0.00") BigDecimal remuneracion,
            @Size(max = 500) String observaciones) {
    }

    public record RescisionRequest(LocalDate fecha, @Size(max = 255) String motivo) {
    }

    public record ContratoResponse(
            Long id, Long personalId, String personalNombre, String areaNombre, String tipo, String cargo,
            LocalDate fechaInicio, LocalDate fechaFin, BigDecimal remuneracion, String estado, String estadoEfectivo,
            LocalDate fechaRescision, String motivoRescision, String observaciones) {

        public static ContratoResponse de(ContratoPersonal c) {
            var p = c.getPersonal();
            return new ContratoResponse(c.getId(), p.getId(), p.nombreCompleto(), p.getArea() == null ? null : p.getArea().getNombre(),
                    c.getTipo(), c.getCargo(), c.getFechaInicio(), c.getFechaFin(), c.getRemuneracion(), c.getEstado(),
                    c.estadoEfectivo(LocalDate.now()), c.getFechaRescision(), c.getMotivoRescision(), c.getObservaciones());
        }
    }

    public record PagoRequest(
            @NotNull Long personalId,
            Long contratoId,
            @NotBlank @Pattern(regexp = "\\d{4}-(0[1-9]|1[0-2])") String periodo,
            @NotBlank @Pattern(regexp = "SUELDO|BONO|DESCUENTO|ADELANTO|OTRO") String concepto,
            @Size(max = 200) String descripcion,
            @NotNull @DecimalMin(value = "0.01") BigDecimal monto) {
    }

    public record PagarRequest(LocalDate fechaPago, @Size(max = 30) String medio, @Size(max = 100) String referencia) {
    }

    /** El administrador rechaza un pago solicitado por caja: el motivo es obligatorio. */
    public record RechazoRequest(@NotBlank @Size(max = 300) String motivo) {
    }

    public record PagoResponse(
            Long id, Long personalId, String personalNombre, String areaNombre, Long contratoId, String periodo, String concepto,
            String descripcion, BigDecimal monto, BigDecimal montoFirmado, String estado, LocalDate fechaPago, String medio, String referencia,
            java.time.LocalDateTime solicitadoEn, String motivoRechazo) {

        public static PagoResponse de(PagoPersonal p) {
            var d = p.getPersonal();
            return new PagoResponse(p.getId(), d.getId(), d.nombreCompleto(), d.getArea() == null ? null : d.getArea().getNombre(),
                    p.getContrato() == null ? null : p.getContrato().getId(), p.getPeriodo(), p.getConcepto(), p.getDescripcion(),
                    p.getMonto(), p.resta() ? p.getMonto().negate() : p.getMonto(), p.getEstado(), p.getFechaPago(), p.getMedio(), p.getReferencia(),
                    p.getSolicitadoEn(), p.getMotivoRechazo());
        }
    }

    /** Cuenta para depósito. El número y el CCI solo llevan dígitos; la billetera (Yape, Plin) usa el celular de 9 dígitos. */
    public record CuentaRequest(
            @NotNull Long personalId,
            @NotBlank @Size(max = 30) String banco,
            @NotBlank @Pattern(regexp = "AHORROS|CORRIENTE|SUELDO|BILLETERA") String tipo,
            @NotBlank @Size(max = 30) String numero,
            @Size(max = 30) String cci,
            @NotBlank @Size(max = 150) String titular,
            Boolean principal) {
    }

    public record CuentaResponse(Long id, Long personalId, String personalNombre, String banco, String tipo, String numero, String cci, String titular, boolean principal) {
        public static CuentaResponse de(pe.edu.eduspace.planificacion.entity.CuentaDeposito c) {
            return new CuentaResponse(c.getId(), c.getPersonal().getId(), c.getPersonal().nombreCompleto(), c.getBanco(), c.getTipo(),
                    c.getNumero(), c.getCci(), c.getTitular(), c.isPrincipal());
        }
    }

    public record PlanillaGenerada(String periodo, int creados, int yaExistian) {
    }
}
```

---

## 103. `SeccionInternaResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/SeccionInternaResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `SeccionInterna`.

```java
package pe.edu.eduspace.planificacion.dto;

import pe.edu.eduspace.planificacion.entity.Turno;

public record SeccionInternaResponse(Long id, String nombre, Long gradoId, Long nivelId, Long anioId,
                                     Short capacidad, Turno turno, Long tutorDocenteId) {
}
```

---

## 104. `SeccionRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/SeccionRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `Seccion`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pe.edu.eduspace.planificacion.entity.Turno;

public record SeccionRequest(
        @NotNull Long anioId,
        @NotNull Long gradoId,
        Long aulaId,
        @NotBlank @Size(max = 10) String nombre,
        Turno turno,
        @Min(1) Short capacidad,
        Long tutorDocenteId,
        Boolean activo) {
}
```

---

## 105. `SeccionResponse.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/SeccionResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Seccion`.

```java
package pe.edu.eduspace.planificacion.dto;

import pe.edu.eduspace.planificacion.entity.Turno;

public record SeccionResponse(Long id, Long anioId, String anioNombre, Long gradoId, String gradoNombre,
                              Long nivelId, Long aulaId, String aulaNombre, String nombre, Turno turno,
                              Short capacidad, Long tutorDocenteId, String tutorNombre, Boolean activo) {
}
```

---

## 106. `VincularUsuarioRequest.java` — DTOs (Data Transfer Objects)

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/dto/VincularUsuarioRequest.java`

### **¿Qué hace esta clase?**
DTO de solicitud (Request). Encapsula y valida los datos enviados por el frontend para operaciones de `VincularUsuario`.

```java
package pe.edu.eduspace.planificacion.dto;

import jakarta.validation.constraints.NotNull;

public record VincularUsuarioRequest(@NotNull Long usuarioId) {
}
```

---

## 107. `AnioAcademicoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AnioAcademicoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `AnioAcademico`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.AnioRequest;
import pe.edu.eduspace.planificacion.dto.AnioResponse;

public interface AnioAcademicoService {
    List<AnioResponse> listar();

    AnioResponse obtener(Long id);

    AnioResponse activo();

    AnioResponse crear(AnioRequest request);

    AnioResponse actualizar(Long id, AnioRequest request);

    AnioResponse activar(Long id);

    AnioResponse cerrar(Long id);
}
```

---

## 108. `AnioAcademicoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/AnioAcademicoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `AnioAcademico`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.AnioRequest;
import pe.edu.eduspace.planificacion.dto.AnioResponse;
import pe.edu.eduspace.planificacion.entity.AnioAcademico;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;
import pe.edu.eduspace.planificacion.event.AnioActivadoEvent;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AnioAcademicoRepository;
import pe.edu.eduspace.planificacion.service.AnioAcademicoService;

@Service
@RequiredArgsConstructor
@Transactional
public class AnioAcademicoServiceImpl implements AnioAcademicoService {

    private final AnioAcademicoRepository repository;
    private final PlanificacionMapper mapper;
    private final ApplicationEventPublisher eventos;

    @Override
    @Transactional(readOnly = true)
    public List<AnioResponse> listar() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "fechaInicio")).stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AnioResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    @Transactional(readOnly = true)
    public AnioResponse activo() {
        return repository.findFirstByEstado(EstadoPeriodo.ACTIVO).map(mapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No hay un año académico ACTIVO"));
    }

    @Override
    public AnioResponse crear(AnioRequest request) {
        validarFechas(request);
        if (repository.existsByNombre(request.nombre())) {
            throw new BusinessRuleException("Ya existe un año académico con el nombre " + request.nombre());
        }
        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Override
    public AnioResponse actualizar(Long id, AnioRequest request) {
        AnioAcademico anio = buscar(id);
        if (anio.getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("Un año CERRADO es de solo lectura");
        }
        validarFechas(request);
        if (repository.existsByNombreAndIdNot(request.nombre(), id)) {
            throw new BusinessRuleException("Ya existe un año académico con el nombre " + request.nombre());
        }
        mapper.update(request, anio);
        return mapper.toResponse(repository.save(anio));
    }

    @Override
    public AnioResponse activar(Long id) {
        AnioAcademico anio = buscar(id);
        if (anio.getEstado() == EstadoPeriodo.ACTIVO) {
            throw new BusinessRuleException("El año " + anio.getNombre() + " ya está ACTIVO");
        }
        if (anio.getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("Un año CERRADO no puede volver a activarse");
        }
        repository.findFirstByEstado(EstadoPeriodo.ACTIVO).ifPresent(activo -> {
            throw new BusinessRuleException("El año " + activo.getNombre()
                    + " sigue ACTIVO: ciérrelo antes de activar otro");
        });
        anio.setEstado(EstadoPeriodo.ACTIVO);
        repository.saveAndFlush(anio);
        eventos.publishEvent(AnioActivadoEvent.of(anio.getId(), anio.getNombre(), anio.getFechaInicio(), anio.getFechaFin()));
        return mapper.toResponse(anio);
    }

    @Override
    public AnioResponse cerrar(Long id) {
        AnioAcademico anio = buscar(id);
        if (anio.getEstado() != EstadoPeriodo.ACTIVO) {
            throw new BusinessRuleException("Solo se puede cerrar un año ACTIVO");
        }
        anio.setEstado(EstadoPeriodo.CERRADO);
        return mapper.toResponse(repository.save(anio));
    }

    private AnioAcademico buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Año académico", id));
    }

    private void validarFechas(AnioRequest request) {
        if (!request.fechaFin().isAfter(request.fechaInicio())) {
            throw new BusinessRuleException("La fecha de fin debe ser posterior a la fecha de inicio");
        }
    }
}
```

---

## 109. `AsignacionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AsignacionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Asignacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.AsignacionRequest;
import pe.edu.eduspace.planificacion.dto.AsignacionResponse;

public interface AsignacionService {
    List<AsignacionResponse> listarPorSeccion(Long seccionId);

    List<AsignacionResponse> listarPorDocente(Long docenteId);

    /** Todas las asignaciones del año (una sola consulta en lugar de una por docente). */
    List<AsignacionResponse> listarPorAnio(Long anioId);

    AsignacionResponse obtener(Long id);

    AsignacionResponse crear(AsignacionRequest request);

    AsignacionResponse cambiarDocente(Long id, Long docenteId);

    void eliminar(Long id);
}
```

---

## 110. `AsignacionServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/AsignacionServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Asignacion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.AsignacionRequest;
import pe.edu.eduspace.planificacion.dto.AsignacionResponse;
import pe.edu.eduspace.planificacion.entity.*;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.*;
import pe.edu.eduspace.planificacion.service.AsignacionService;

@Service
@RequiredArgsConstructor
@Transactional
public class AsignacionServiceImpl implements AsignacionService {

    private final AsignacionRepository repository;
    private final SeccionRepository seccionRepository;
    private final CursoRepository cursoRepository;
    private final DocenteRepository docenteRepository;
    private final GradoCursoRepository mallaRepository;
    private final HorarioRepository horarioRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<AsignacionResponse> listarPorSeccion(Long seccionId) {
        return repository.findBySeccionId(seccionId).stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AsignacionResponse> listarPorDocente(Long docenteId) {
        return repository.findByDocenteId(docenteId).stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AsignacionResponse> listarPorAnio(Long anioId) {
        return repository.findByAnio(anioId).stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AsignacionResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public AsignacionResponse crear(AsignacionRequest request) {
        Seccion seccion = seccionRepository.findById(request.seccionId())
                .orElseThrow(() -> ResourceNotFoundException.of("Sección", request.seccionId()));
        anioEditable(seccion);
        Curso curso = cursoRepository.findById(request.cursoId())
                .orElseThrow(() -> ResourceNotFoundException.of("Curso", request.cursoId()));
        Docente docente = docenteActivo(request.docenteId());
        if (!mallaRepository.existsByGradoIdAndCursoId(seccion.getGrado().getId(), curso.getId())) {
            throw new BusinessRuleException("El curso " + curso.getNombre() + " no está en la malla de " + seccion.getGrado().getNombre());
        }
        if (repository.existsBySeccionIdAndCursoId(seccion.getId(), curso.getId())) {
            throw new BusinessRuleException("El curso " + curso.getNombre() + " ya tiene docente asignado en esta sección");
        }
        Asignacion asignacion = new Asignacion();
        asignacion.setSeccion(seccion);
        asignacion.setCurso(curso);
        asignacion.setDocente(docente);
        return mapper.toResponse(repository.save(asignacion));
    }

    @Override
    public AsignacionResponse cambiarDocente(Long id, Long docenteId) {
        Asignacion asignacion = buscar(id);
        anioEditable(asignacion.getSeccion());
        Docente docente = docenteActivo(docenteId);
        for (Horario h : horarioRepository.findBySeccion(asignacion.getSeccion().getId())) {
            if (h.getAsignacion().getId().equals(id)
                    && horarioRepository.existsChoqueDocente(docenteId, h.getDiaSemana(), h.getBloque().getId(), null)) {
                throw new BusinessRuleException("El docente " + docente.nombreCompleto() + " ya tiene clase en el bloque "
                        + h.getBloque().getOrden() + " del día " + h.getDiaSemana() + ": no se puede reasignar");
            }
        }
        asignacion.setDocente(docente);
        return mapper.toResponse(repository.save(asignacion));
    }

    @Override
    public void eliminar(Long id) {
        Asignacion asignacion = buscar(id);
        anioEditable(asignacion.getSeccion());
        if (horarioRepository.countByAsignacionId(id) > 0) {
            throw new BusinessRuleException("La asignación tiene clases en el horario: elimínelas primero");
        }
        repository.delete(asignacion);
    }

    private Docente docenteActivo(Long docenteId) {
        Docente docente = docenteRepository.findById(docenteId)
                .orElseThrow(() -> ResourceNotFoundException.of("Docente", docenteId));
        if (docente.getEstado() != EstadoDocente.ACTIVO) {
            throw new BusinessRuleException("El docente " + docente.nombreCompleto() + " está INACTIVO");
        }
        if (!docente.esDocente()) {
            throw new BusinessRuleException(docente.nombreCompleto() + " no pertenece al área Docencia, no puede dictar cursos");
        }
        return docente;
    }

    private void anioEditable(Seccion seccion) {
        if (seccion.getAnio().getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año " + seccion.getAnio().getNombre() + " está CERRADO (solo lectura)");
        }
    }

    private Asignacion buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Asignación", id));
    }
}
```

---

## 111. `AsistenciaPersonalService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AsistenciaPersonalService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `AsistenciaPersonal`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Marca;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.RegistroDia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.ResultadoDia;
import pe.edu.eduspace.planificacion.entity.AsistenciaPersonal;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.AsistenciaPersonalRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/** Asistencia diaria del personal: se registra el día completo de una vez y se consulta por rango de fechas. */
@Service
@RequiredArgsConstructor
@Transactional
public class AsistenciaPersonalService {

    /** Máximo de días que se consultan de una vez (un año). */
    static final int MAX_DIAS = 366;

    private final AsistenciaPersonalRepository repository;
    private final DocenteRepository personal;

    @Transactional(readOnly = true)
    public List<Asistencia> consultar(LocalDate desde, LocalDate hasta, Long personalId) {
        if (desde == null || hasta == null) throw new BusinessRuleException("Indica el rango de fechas (desde y hasta)");
        if (hasta.isBefore(desde)) throw new BusinessRuleException("La fecha final no puede ser anterior a la inicial");
        if (desde.plusDays(MAX_DIAS).isBefore(hasta)) throw new BusinessRuleException("El rango no puede pasar de " + MAX_DIAS + " días");
        var lista = personalId == null ? repository.findByFechaBetweenOrderByFechaAscIdAsc(desde, hasta)
                : repository.findByPersonalIdAndFechaBetweenOrderByFechaAsc(personalId, desde, hasta);
        return lista.stream().map(Asistencia::de).toList();
    }

    /** Guarda las marcas del día. Todo o nada: si una marca es inválida no se guarda ninguna. */
    public ResultadoDia registrarDia(RegistroDia r) {
        if (r.fecha().isAfter(LocalDate.now())) throw new BusinessRuleException("No se puede registrar asistencia de una fecha futura");
        Set<Long> vistos = new HashSet<>();
        int guardadas = 0;
        int borradas = 0;
        for (Marca m : r.marcas()) {
            if (!vistos.add(m.personalId())) throw new BusinessRuleException("La persona " + m.personalId() + " aparece repetida en el día");
            var existente = repository.findByPersonalIdAndFecha(m.personalId(), r.fecha());
            String estado = m.estado() == null ? "" : m.estado().trim().toUpperCase();
            if (estado.isEmpty()) {
                if (existente.isPresent()) {
                    repository.delete(existente.get());
                    borradas++;
                }
                continue;
            }
            if (!AsistenciaPersonal.ESTADOS.contains(estado)) throw new BusinessRuleException("Estado no válido: " + m.estado());
            Docente persona = personal.findById(m.personalId()).orElseThrow(() -> ResourceNotFoundException.of("Personal", m.personalId()));
            if (persona.getEstado() != EstadoDocente.ACTIVO) {
                throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le registra asistencia");
            }
            boolean horas = AsistenciaPersonal.llevaHoras(estado);
            if (horas && m.horaEntrada() != null && m.horaSalida() != null && m.horaSalida().isBefore(m.horaEntrada())) {
                throw new BusinessRuleException("La salida de " + persona.nombreCompleto() + " no puede ser anterior a su entrada");
            }
            AsistenciaPersonal a = existente.orElseGet(AsistenciaPersonal::new);
            a.setPersonal(persona);
            a.setFecha(r.fecha());
            a.setEstado(estado);
            a.setHoraEntrada(horas ? m.horaEntrada() : null);
            a.setHoraSalida(horas ? m.horaSalida() : null);
            a.setObservacion(m.observacion() == null || m.observacion().isBlank() ? null : m.observacion().trim());
            repository.save(a);
            guardadas++;
        }
        return new ResultadoDia(r.fecha(), guardadas, borradas);
    }
}
```

---

## 112. `AulaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/AulaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Aula`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.AulaRequest;
import pe.edu.eduspace.planificacion.dto.AulaResponse;
import pe.edu.eduspace.planificacion.entity.TipoAula;

public interface AulaService {
    List<AulaResponse> listar(TipoAula tipo);

    AulaResponse obtener(Long id);

    AulaResponse crear(AulaRequest request);

    AulaResponse actualizar(Long id, AulaRequest request);

    void eliminar(Long id);
}
```

---

## 113. `AulaServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/AulaServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Aula`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.AulaRequest;
import pe.edu.eduspace.planificacion.dto.AulaResponse;
import pe.edu.eduspace.planificacion.entity.Aula;
import pe.edu.eduspace.planificacion.entity.Pabellon;
import pe.edu.eduspace.planificacion.entity.TipoAula;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AulaRepository;
import pe.edu.eduspace.planificacion.repository.HorarioRepository;
import pe.edu.eduspace.planificacion.repository.PabellonRepository;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.service.AulaService;

@Service
@RequiredArgsConstructor
@Transactional
public class AulaServiceImpl implements AulaService {

    private final AulaRepository repository;
    private final PabellonRepository pabellonRepository;
    private final SeccionRepository seccionRepository;
    private final HorarioRepository horarioRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<AulaResponse> listar(TipoAula tipo) {
        List<Aula> aulas = tipo == null ? repository.findAllByOrderByCodigo() : repository.findByTipoOrderByCodigo(tipo);
        return aulas.stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AulaResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public AulaResponse crear(AulaRequest request) {
        if (repository.existsByCodigo(request.codigo())) {
            throw new BusinessRuleException("Ya existe un aula con el código " + request.codigo());
        }
        Aula aula = mapper.toEntity(request);
        aula.setTipo(request.tipo() == null ? TipoAula.AULA : request.tipo());
        aula.setActivo(request.activo() == null || request.activo());
        aula.setPabellon(pabellonPara(request.pabellonId(), null));
        return mapper.toResponse(repository.save(aula));
    }

    @Override
    public AulaResponse actualizar(Long id, AulaRequest request) {
        Aula aula = buscar(id);
        if (repository.existsByCodigoAndIdNot(request.codigo(), id)) {
            throw new BusinessRuleException("Ya existe un aula con el código " + request.codigo());
        }
        boolean desactivar = Boolean.FALSE.equals(request.activo()) && Boolean.TRUE.equals(aula.getActivo());
        if (desactivar && enUso(id)) {
            throw new BusinessRuleException("No se puede desactivar un aula usada en horarios o secciones vigentes");
        }
        Pabellon pabellon = pabellonPara(request.pabellonId(), id);
        mapper.update(request, aula);
        aula.setPabellon(pabellon);
        if (request.tipo() == null) {
            aula.setTipo(TipoAula.AULA);
        }
        if (request.activo() == null) {
            aula.setActivo(true);
        }
        return mapper.toResponse(repository.save(aula));
    }

    @Override
    public void eliminar(Long id) {
        Aula aula = buscar(id);
        if (seccionRepository.countByAulaId(id) > 0 || horarioRepository.existsByAulaId(id)) {
            throw new BusinessRuleException("El aula está en uso (secciones u horarios): desactívela en lugar de eliminarla");
        }
        repository.delete(aula);
    }

    /** El pabellón pedido (o ninguno). No deja registrar más aulas de las que el pabellón declara tener. */
    private Pabellon pabellonPara(Long pabellonId, Long aulaId) {
        if (pabellonId == null) return null;
        Pabellon pabellon = pabellonRepository.findById(pabellonId).orElseThrow(() -> ResourceNotFoundException.of("Pabellón", pabellonId));
        long yaRegistradas = aulaId == null ? repository.countByPabellonId(pabellonId) : repository.countByPabellonIdAndIdNot(pabellonId, aulaId);
        if (yaRegistradas >= pabellon.getCantidadAulas()) {
            throw new BusinessRuleException("El pabellón " + pabellon.getNombre() + " declara " + pabellon.getCantidadAulas()
                    + (pabellon.getCantidadAulas() == 1 ? " aula" : " aulas") + " y ya están registradas. Sube la cantidad del pabellón o elige otro.");
        }
        return pabellon;
    }

    private boolean enUso(Long aulaId) {
        return seccionRepository.countByAulaIdAndActivoTrue(aulaId) > 0 || horarioRepository.existsByAulaId(aulaId);
    }

    private Aula buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Aula", id));
    }
}
```

---

## 114. `BloqueHorarioService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/BloqueHorarioService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `BloqueHorario`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.BloqueRequest;
import pe.edu.eduspace.planificacion.dto.BloqueResponse;
import pe.edu.eduspace.planificacion.entity.Turno;

public interface BloqueHorarioService {
    List<BloqueResponse> listar(Turno turno);

    BloqueResponse obtener(Long id);

    BloqueResponse crear(BloqueRequest request);

    BloqueResponse actualizar(Long id, BloqueRequest request);

    void eliminar(Long id);
}
```

---

## 115. `BloqueHorarioServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/BloqueHorarioServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `BloqueHorario`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.BloqueRequest;
import pe.edu.eduspace.planificacion.dto.BloqueResponse;
import pe.edu.eduspace.planificacion.entity.BloqueHorario;
import pe.edu.eduspace.planificacion.entity.Turno;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.BloqueHorarioRepository;
import pe.edu.eduspace.planificacion.repository.HorarioRepository;
import pe.edu.eduspace.planificacion.service.BloqueHorarioService;

@Service
@RequiredArgsConstructor
@Transactional
public class BloqueHorarioServiceImpl implements BloqueHorarioService {

    private final BloqueHorarioRepository repository;
    private final HorarioRepository horarioRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<BloqueResponse> listar(Turno turno) {
        List<BloqueHorario> bloques = turno == null ? repository.findAllByOrderByTurnoAscOrdenAsc() : repository.findByTurnoOrderByOrden(turno);
        return bloques.stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BloqueResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public BloqueResponse crear(BloqueRequest request) {
        validar(request, null);
        BloqueHorario bloque = mapper.toEntity(request);
        bloque.setEsReceso(Boolean.TRUE.equals(request.esReceso()));
        return mapper.toResponse(repository.save(bloque));
    }

    @Override
    public BloqueResponse actualizar(Long id, BloqueRequest request) {
        BloqueHorario bloque = buscar(id);
        validar(request, id);
        if ((bloque.getTurno() != request.turno() || Boolean.TRUE.equals(request.esReceso()))
                && horarioRepository.existsByBloqueId(id)) {
            throw new BusinessRuleException("El bloque ya tiene clases programadas: no se puede cambiar su turno ni convertirlo en receso");
        }
        mapper.update(request, bloque);
        bloque.setEsReceso(Boolean.TRUE.equals(request.esReceso()));
        return mapper.toResponse(repository.save(bloque));
    }

    @Override
    public void eliminar(Long id) {
        BloqueHorario bloque = buscar(id);
        if (horarioRepository.existsByBloqueId(id)) {
            throw new BusinessRuleException("El bloque tiene clases programadas en el horario");
        }
        repository.delete(bloque);
    }

    private void validar(BloqueRequest r, Long excluirId) {
        if (!r.horaFin().isAfter(r.horaInicio())) {
            throw new BusinessRuleException("La hora de fin debe ser posterior a la hora de inicio");
        }
        boolean ordenRepetido = excluirId == null
                ? repository.existsByTurnoAndOrden(r.turno(), r.orden())
                : repository.existsByTurnoAndOrdenAndIdNot(r.turno(), r.orden(), excluirId);
        if (ordenRepetido) {
            throw new BusinessRuleException("Ya existe el bloque " + r.orden() + " en el turno " + r.turno());
        }
        if (repository.haySolapamiento(r.turno(), r.horaInicio(), r.horaFin(), excluirId)) {
            throw new BusinessRuleException("El bloque se solapa con otro del turno " + r.turno());
        }
    }

    private BloqueHorario buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Bloque horario", id));
    }
}
```

---

## 116. `CuentaDepositoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/CuentaDepositoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `CuentaDeposito`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.entity.CuentaDeposito;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.CuentaDepositoRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/**
 * Cuentas donde se le deposita el pago a cada persona. Puede tener varias; una sola es la principal (la primera que se agrega lo es). Las que se
 * quitan se desactivan, no se borran.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class CuentaDepositoService {

    static final Set<String> BANCOS = Set.of("BCP", "BBVA", "INTERBANK", "SCOTIABANK", "BANCO_NACION", "BANBIF", "MIBANCO", "PICHINCHA",
            "CAJA_AREQUIPA", "CAJA_HUANCAYO", "CAJA_PIURA", "YAPE", "PLIN", "OTRO");

    private final CuentaDepositoRepository cuentas;
    private final DocenteRepository personal;

    @Transactional(readOnly = true)
    public List<CuentaResponse> listar(Long personalId) {
        var lista = personalId == null ? cuentas.findByActivoTrueOrderByPersonalIdAscPrincipalDescIdAsc()
                : cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(personalId);
        return lista.stream().map(CuentaResponse::de).toList();
    }

    public CuentaResponse agregar(CuentaRequest r) {
        Docente persona = personal.findById(r.personalId()).orElseThrow(() -> ResourceNotFoundException.of("Personal", r.personalId()));
        if (persona.getEstado() != EstadoDocente.ACTIVO) {
            throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le agregan cuentas");
        }
        CuentaDeposito c = new CuentaDeposito();
        c.setPersonal(persona);
        aplicar(c, r);
        if (cuentas.existsByPersonalIdAndBancoAndNumeroAndActivoTrue(persona.getId(), c.getBanco(), c.getNumero())) {
            throw new BusinessRuleException(persona.nombreCompleto() + " ya tiene la cuenta " + c.getBanco() + " " + c.getNumero());
        }
        var actuales = cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(persona.getId());
        // La primera cuenta es la principal; si se pide que esta lo sea, las demás dejan de serlo.
        boolean sera = actuales.isEmpty() || Boolean.TRUE.equals(r.principal());
        if (sera) quitarPrincipal(actuales);
        c.setPrincipal(sera);
        return CuentaResponse.de(cuentas.save(c));
    }

    public CuentaResponse actualizar(Long id, CuentaRequest r) {
        CuentaDeposito c = cuenta(id);
        if (!c.getPersonal().getId().equals(r.personalId())) {
            throw new BusinessRuleException("No se puede cambiar de persona una cuenta: agrégala a la otra persona");
        }
        aplicar(c, r);
        if (cuentas.existsByPersonalIdAndBancoAndNumeroAndActivoTrueAndIdNot(c.getPersonal().getId(), c.getBanco(), c.getNumero(), id)) {
            throw new BusinessRuleException(c.getPersonal().nombreCompleto() + " ya tiene la cuenta " + c.getBanco() + " " + c.getNumero());
        }
        return CuentaResponse.de(cuentas.save(c));
    }

    /** Pasa a ser la cuenta principal de su persona (la que era principal deja de serlo). */
    public CuentaResponse hacerPrincipal(Long id) {
        CuentaDeposito c = cuenta(id);
        quitarPrincipal(cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(c.getPersonal().getId()));
        c.setPrincipal(true);
        return CuentaResponse.de(cuentas.save(c));
    }

    /** Quita la cuenta (queda desactivada). Si era la principal, la más antigua de las que quedan pasa a serlo. */
    public void quitar(Long id) {
        CuentaDeposito c = cuenta(id);
        boolean eraPrincipal = c.isPrincipal();
        c.setActivo(false);
        c.setPrincipal(false);
        cuentas.saveAndFlush(c);
        if (eraPrincipal) {
            cuentas.findByPersonalIdAndActivoTrueOrderByPrincipalDescIdAsc(c.getPersonal().getId()).stream()
                    .min(java.util.Comparator.comparing(CuentaDeposito::getId))
                    .ifPresent(otra -> { otra.setPrincipal(true); cuentas.save(otra); });
        }
    }

    private void aplicar(CuentaDeposito c, CuentaRequest r) {
        String banco = r.banco().trim().toUpperCase();
        if (!BANCOS.contains(banco)) throw new BusinessRuleException("Banco no reconocido: " + r.banco());
        String numero = r.numero().replaceAll("[\\s-]", "");
        String cci = r.cci() == null ? "" : r.cci().replaceAll("[\\s-]", "");
        boolean billetera = "BILLETERA".equals(r.tipo());
        if (billetera != ("YAPE".equals(banco) || "PLIN".equals(banco))) {
            throw new BusinessRuleException(billetera ? "Una billetera es Yape o Plin" : "Yape y Plin son billeteras: elige el tipo «Billetera»");
        }
        if (!numero.matches("\\d+")) throw new BusinessRuleException("El número de cuenta solo lleva dígitos");
        if (billetera) {
            if (numero.length() != 9) throw new BusinessRuleException("El celular de la billetera tiene 9 dígitos");
            if (!cci.isEmpty()) throw new BusinessRuleException("Una billetera no lleva CCI");
        } else {
            if (numero.length() < 8 || numero.length() > 20) throw new BusinessRuleException("El número de cuenta tiene entre 8 y 20 dígitos");
            if (!cci.isEmpty() && !cci.matches("\\d{20}")) throw new BusinessRuleException("El CCI tiene exactamente 20 dígitos");
        }
        c.setBanco(banco);
        c.setTipo(r.tipo());
        c.setNumero(numero);
        c.setCci(cci.isEmpty() ? null : cci);
        c.setTitular(r.titular().trim());
    }

    /** Deja sin principal a la persona. Se guarda al momento: el índice único de «una sola principal» exige que la anterior ya no lo sea. */
    private void quitarPrincipal(List<CuentaDeposito> actuales) {
        List<CuentaDeposito> principales = actuales.stream().filter(CuentaDeposito::isPrincipal).toList();
        principales.forEach(o -> o.setPrincipal(false));
        if (!principales.isEmpty()) cuentas.saveAllAndFlush(principales);
    }

    private CuentaDeposito cuenta(Long id) {
        return cuentas.findById(id).filter(CuentaDeposito::isActivo).orElseThrow(() -> ResourceNotFoundException.of("Cuenta", id));
    }
}
```

---

## 117. `CursoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/CursoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Curso`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.CursoRequest;
import pe.edu.eduspace.planificacion.dto.CursoResponse;

public interface CursoService {
    List<CursoResponse> listar();

    List<CursoResponse> porIds(List<Long> ids);

    CursoResponse obtener(Long id);

    CursoResponse crear(CursoRequest request);

    CursoResponse actualizar(Long id, CursoRequest request);

    void eliminar(Long id);
}
```

---

## 118. `CursoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/CursoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Curso`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.CursoRequest;
import pe.edu.eduspace.planificacion.dto.CursoResponse;
import pe.edu.eduspace.planificacion.entity.Curso;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.CursoRepository;
import pe.edu.eduspace.planificacion.repository.GradoCursoRepository;
import pe.edu.eduspace.planificacion.service.CursoService;

@Service
@RequiredArgsConstructor
@Transactional
public class CursoServiceImpl implements CursoService {

    private final CursoRepository repository;
    private final GradoCursoRepository mallaRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<CursoResponse> listar() {
        return repository.findAllByOrderByNombre().stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CursoResponse> porIds(List<Long> ids) {
        return repository.findByIdIn(ids).stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CursoResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public CursoResponse crear(CursoRequest request) {
        if (repository.existsByCodigo(request.codigo())) {
            throw new BusinessRuleException("Ya existe un curso con el código " + request.codigo());
        }
        Curso curso = mapper.toEntity(request);
        curso.setActivo(request.activo() == null || request.activo());
        return mapper.toResponse(repository.save(curso));
    }

    @Override
    public CursoResponse actualizar(Long id, CursoRequest request) {
        Curso curso = buscar(id);
        if (repository.existsByCodigoAndIdNot(request.codigo(), id)) {
            throw new BusinessRuleException("Ya existe un curso con el código " + request.codigo());
        }
        mapper.update(request, curso);
        if (request.activo() == null) {
            curso.setActivo(true);
        }
        return mapper.toResponse(repository.save(curso));
    }

    @Override
    public void eliminar(Long id) {
        Curso curso = buscar(id);
        if (mallaRepository.countByCursoId(id) > 0) {
            throw new BusinessRuleException("El curso forma parte de la malla de algún grado: quítelo de la malla primero");
        }
        repository.delete(curso);
    }

    private Curso buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Curso", id));
    }
}
```

---

## 119. `DocenteService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/DocenteService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Docente`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import org.springframework.data.domain.Pageable;
import pe.edu.eduspace.planificacion.dto.DocenteRequest;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.PageResponse;

public interface DocenteService {
    /** Solo el personal del área Docencia (lo que esperan los selectores de docente, tutor y asignaciones). */
    PageResponse<DocenteResponse> buscar(String q, Pageable pageable);

    /** Personal de un área; con {@code todas} (y sin área), el de todas las áreas. */
    PageResponse<DocenteResponse> buscar(String q, Long areaId, boolean todas, Pageable pageable);

    /** Como {@link #buscar(String, Long, boolean, Pageable)}, pero solo las personas con ese estado (null = todas). */
    PageResponse<DocenteResponse> buscar(String q, Long areaId, boolean todas, pe.edu.eduspace.planificacion.entity.EstadoDocente estado, Pageable pageable);

    DocenteResponse obtener(Long id);

    DocenteResponse crear(DocenteRequest request);

    DocenteResponse actualizar(Long id, DocenteRequest request);

    DocenteResponse vincularUsuario(Long id, Long usuarioId);

    /** Inactiva al docente si tiene asignaciones o tutorías; si no, lo elimina. */
    void eliminar(Long id);
}
```

---

## 120. `DocenteServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/DocenteServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Docente`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.DocenteRequest;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.PageResponse;
import pe.edu.eduspace.planificacion.entity.Area;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AreaRepository;
import pe.edu.eduspace.planificacion.repository.AsignacionRepository;
import pe.edu.eduspace.planificacion.repository.CursoRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.service.DocenteService;

/** Registro del personal del colegio. Cada persona pertenece a un área; solo la de Docencia dicta cursos y puede ser tutora. */
@Service
@RequiredArgsConstructor
@Transactional
public class DocenteServiceImpl implements DocenteService {

    private final DocenteRepository repository;
    private final AreaRepository areaRepository;
    private final CursoRepository cursoRepository;
    private final AsignacionRepository asignacionRepository;
    private final SeccionRepository seccionRepository;
    private final PlanificacionMapper mapper;
    private final pe.edu.eduspace.planificacion.service.RrhhService rrhh;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DocenteResponse> buscar(String q, Pageable pageable) {
        return buscar(q, null, false, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DocenteResponse> buscar(String q, Long areaId, boolean todas, Pageable pageable) {
        String texto = q == null ? "" : q.trim();
        if (areaId == null && todas) {
            return PageResponse.of(repository.buscar(texto, pageable).map(mapper::toResponse));
        }
        Long area = areaId != null ? areaId : areaDocencia().getId();
        return PageResponse.of(repository.buscarPorArea(texto, area, pageable).map(mapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DocenteResponse> buscar(String q, Long areaId, boolean todas, pe.edu.eduspace.planificacion.entity.EstadoDocente estado, Pageable pageable) {
        if (estado == null) {
            return buscar(q, areaId, todas, pageable);
        }
        String texto = q == null ? "" : q.trim();
        if (areaId == null && todas) {
            return PageResponse.of(repository.buscarPorEstado(texto, estado, pageable).map(mapper::toResponse));
        }
        Long area = areaId != null ? areaId : areaDocencia().getId();
        return PageResponse.of(repository.buscarPorAreaYEstado(texto, area, estado, pageable).map(mapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public DocenteResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public DocenteResponse crear(DocenteRequest request) {
        String tipo = tipoDocumento(request);
        if (repository.existsByTipoDocumentoAndNumeroDocumento(tipo, request.numeroDocumento())) {
            throw new BusinessRuleException("Ya existe una persona del personal con " + tipo + " " + request.numeroDocumento());
        }
        Docente docente = mapper.toEntity(request);
        docente.setTipoDocumento(tipo);
        docente.setEstado(EstadoDocente.ACTIVO);
        docente.setArea(request.areaId() == null ? areaDocencia() : areaActiva(request.areaId()));
        aplicarCursos(docente, request);
        return mapper.toResponse(repository.save(docente));
    }

    /**
     * Fija los cursos que puede dictar. Solo el área Docencia los tiene: para otra área, pedir cursos es un error y al pasar a otra
     * área se vacían. Si no se escribió una especialidad, se arma con los nombres de los cursos (así el armado automático la entiende).
     */
    private void aplicarCursos(Docente docente, DocenteRequest request) {
        if (!docente.esDocente()) {
            if (request.cursoIds() != null && !request.cursoIds().isEmpty()) {
                throw new BusinessRuleException("Solo el personal del área Docencia dicta cursos");
            }
            docente.getCursos().clear();
            return;
        }
        if (request.cursoIds() == null) return;
        var ids = new java.util.LinkedHashSet<>(request.cursoIds());
        var cursos = cursoRepository.findAllById(ids);
        if (cursos.size() != ids.size()) {
            throw new BusinessRuleException("Alguno de los cursos elegidos no existe");
        }
        docente.getCursos().clear();
        docente.getCursos().addAll(cursos);
        if ((docente.getEspecialidad() == null || docente.getEspecialidad().isBlank()) && !cursos.isEmpty()) {
            String nombres = cursos.stream().map(c -> c.getNombre()).sorted().collect(java.util.stream.Collectors.joining(", "));
            docente.setEspecialidad(nombres.length() <= 100 ? nombres : nombres.substring(0, 97) + "...");
        }
    }

    @Override
    public DocenteResponse actualizar(Long id, DocenteRequest request) {
        Docente docente = buscar(id);
        String tipo = tipoDocumento(request);
        if (repository.existsByTipoDocumentoAndNumeroDocumentoAndIdNot(tipo, request.numeroDocumento(), id)) {
            throw new BusinessRuleException("Ya existe otra persona del personal con " + tipo + " " + request.numeroDocumento());
        }
        Area nueva = request.areaId() == null ? docente.getArea() : areaActiva(request.areaId());
        if (docente.esDocente() && !Area.DOCENCIA.equals(nueva.getCodigo())
                && (asignacionRepository.existsByDocenteId(id) || seccionRepository.countByTutorId(id) > 0)) {
            throw new BusinessRuleException(docente.nombreCompleto() + " dicta cursos o es tutor(a): quita sus asignaciones antes de pasarla a otra área");
        }
        mapper.update(request, docente);
        docente.setTipoDocumento(tipo);
        docente.setArea(nueva);
        aplicarCursos(docente, request);
        return mapper.toResponse(repository.save(docente));
    }

    @Override
    public DocenteResponse vincularUsuario(Long id, Long usuarioId) {
        Docente docente = buscar(id);
        if (repository.existsByUsuarioIdAndIdNot(usuarioId, id)) {
            throw new BusinessRuleException("El usuario " + usuarioId + " ya está vinculado a otra persona del personal");
        }
        docente.setUsuarioId(usuarioId);
        return mapper.toResponse(repository.save(docente));
    }

    @Override
    public void eliminar(Long id) {
        Docente docente = buscar(id);
        if (asignacionRepository.existsByDocenteId(id) || seccionRepository.countByTutorId(id) > 0 || rrhh.tieneHistorial(id)) {
            docente.setEstado(EstadoDocente.INACTIVO);
            repository.save(docente);
        } else {
            repository.delete(docente);
        }
    }

    private Area areaDocencia() {
        return areaRepository.findByCodigo(Area.DOCENCIA)
                .orElseThrow(() -> new BusinessRuleException("Falta el área Docencia en el catálogo de áreas"));
    }

    private Area areaActiva(Long areaId) {
        Area area = areaRepository.findById(areaId).orElseThrow(() -> ResourceNotFoundException.of("Área", areaId));
        if (!Boolean.TRUE.equals(area.getActivo())) {
            throw new BusinessRuleException("El área " + area.getNombre() + " está inactiva");
        }
        return area;
    }

    private String tipoDocumento(DocenteRequest request) {
        return request.tipoDocumento() == null || request.tipoDocumento().isBlank() ? "DNI" : request.tipoDocumento();
    }

    private Docente buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Personal", id));
    }
}
```

---

## 121. `FeriadoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/FeriadoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Feriado`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.time.LocalDate;
import java.util.List;
import pe.edu.eduspace.planificacion.dto.EsHabilResponse;
import pe.edu.eduspace.planificacion.dto.FeriadoRequest;
import pe.edu.eduspace.planificacion.dto.FeriadoResponse;

public interface FeriadoService {
    List<FeriadoResponse> listar(Long anioId);

    FeriadoResponse crear(FeriadoRequest request);

    FeriadoResponse actualizar(Long id, FeriadoRequest request);

    void eliminar(Long id);

    EsHabilResponse esHabil(LocalDate fecha);
}
```

---

## 122. `FeriadoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/FeriadoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Feriado`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.EsHabilResponse;
import pe.edu.eduspace.planificacion.dto.FeriadoRequest;
import pe.edu.eduspace.planificacion.dto.FeriadoResponse;
import pe.edu.eduspace.planificacion.entity.AnioAcademico;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;
import pe.edu.eduspace.planificacion.entity.Feriado;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AnioAcademicoRepository;
import pe.edu.eduspace.planificacion.repository.FeriadoRepository;
import pe.edu.eduspace.planificacion.service.FeriadoService;

@Service
@RequiredArgsConstructor
@Transactional
public class FeriadoServiceImpl implements FeriadoService {

    private final FeriadoRepository repository;
    private final AnioAcademicoRepository anioRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<FeriadoResponse> listar(Long anioId) {
        List<Feriado> feriados = anioId == null ? repository.findAll() : repository.findByAnioIdOrderByFecha(anioId);
        return feriados.stream().map(mapper::toResponse).toList();
    }

    @Override
    public FeriadoResponse crear(FeriadoRequest request) {
        Feriado feriado = new Feriado();
        aplicar(feriado, request, true);
        return mapper.toResponse(repository.save(feriado));
    }

    @Override
    public FeriadoResponse actualizar(Long id, FeriadoRequest request) {
        Feriado feriado = buscar(id);
        aplicar(feriado, request, !feriado.getFecha().equals(request.fecha()) || !feriado.getAnio().getId().equals(request.anioId()));
        return mapper.toResponse(repository.save(feriado));
    }

    @Override
    public void eliminar(Long id) {
        repository.delete(buscar(id));
    }

    @Override
    @Transactional(readOnly = true)
    public EsHabilResponse esHabil(LocalDate fecha) {
        DayOfWeek dia = fecha.getDayOfWeek();
        if (dia == DayOfWeek.SATURDAY || dia == DayOfWeek.SUNDAY) {
            return new EsHabilResponse(fecha, false, "Fin de semana");
        }
        return repository.findFirstByFecha(fecha)
                .map(f -> new EsHabilResponse(fecha, false, f.getDescripcion()))
                .orElse(new EsHabilResponse(fecha, true, null));
    }

    private void aplicar(Feriado feriado, FeriadoRequest r, boolean validarDuplicado) {
        AnioAcademico anio = anioRepository.findById(r.anioId())
                .orElseThrow(() -> ResourceNotFoundException.of("Año académico", r.anioId()));
        if (anio.getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año " + anio.getNombre() + " está CERRADO (solo lectura)");
        }
        if (r.fecha().isBefore(anio.getFechaInicio()) || r.fecha().isAfter(anio.getFechaFin())) {
            throw new BusinessRuleException("El feriado debe estar dentro del año académico ("
                    + anio.getFechaInicio() + " a " + anio.getFechaFin() + ")");
        }
        if (validarDuplicado && repository.existsByAnioIdAndFecha(r.anioId(), r.fecha())) {
            throw new BusinessRuleException("Ya hay un feriado registrado el " + r.fecha());
        }
        feriado.setAnio(anio);
        feriado.setFecha(r.fecha());
        feriado.setDescripcion(r.descripcion());
    }

    private Feriado buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Feriado", id));
    }
}
```

---

## 123. `GradoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/GradoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Grado`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.GradoOfertaResponse;
import pe.edu.eduspace.planificacion.dto.GradoResponse;
import pe.edu.eduspace.planificacion.dto.OfertaGradosRequest;

public interface GradoService {
    /** Los grados que ofrece el colegio (activos). */
    List<GradoResponse> listar(Long nivelId);

    /** Los grados posibles (oferta estándar) marcando cuáles ofrece el colegio y cuáles están en uso. */
    List<GradoOfertaResponse> oferta();

    /** Deja como ofrecidos solo los grados indicados: crea o activa los elegidos y desactiva los demás si no están en uso. */
    List<GradoOfertaResponse> actualizarOferta(OfertaGradosRequest request);

    GradoResponse obtener(Long id);

    GradoResponse actualizar(Long id, CatalogoUpdateRequest request);
}
```

---

## 124. `GradoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/GradoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Grado`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.GradoOfertaResponse;
import pe.edu.eduspace.planificacion.dto.GradoResponse;
import pe.edu.eduspace.planificacion.dto.OfertaGradosRequest;
import pe.edu.eduspace.planificacion.entity.Grado;
import pe.edu.eduspace.planificacion.entity.Nivel;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.GradoCursoRepository;
import pe.edu.eduspace.planificacion.repository.GradoRepository;
import pe.edu.eduspace.planificacion.repository.NivelRepository;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.service.GradoService;

@Service
@RequiredArgsConstructor
@Transactional
public class GradoServiceImpl implements GradoService {

    /** Grados que tiene cada nivel en la oferta estándar: Inicial 3, 4 y 5 años; Primaria 1.° a 6.°; Secundaria 1.° a 5.°. */
    static final Map<String, Integer> GRADOS_POR_NIVEL = new LinkedHashMap<>(Map.of("INICIAL", 3, "PRIMARIA", 6, "SECUNDARIA", 5));

    private final GradoRepository repository;
    private final NivelRepository nivelRepository;
    private final SeccionRepository seccionRepository;
    private final GradoCursoRepository gradoCursoRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<GradoResponse> listar(Long nivelId) {
        List<Grado> grados = nivelId == null
                ? repository.findAllByOrderByNivelOrdenAscNumeroAsc()
                : repository.findByNivelIdOrderByNumero(nivelId);
        // Solo los grados que el colegio ofrece: el resto de pantallas no deben ofrecer los desactivados.
        return grados.stream().filter(g -> Boolean.TRUE.equals(g.getActivo())).map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public GradoResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public GradoResponse actualizar(Long id, CatalogoUpdateRequest request) {
        Grado grado = buscar(id);
        grado.setNombre(request.nombre());
        if (request.activo() != null) {
            grado.setActivo(request.activo());
        }
        return mapper.toResponse(repository.save(grado));
    }

    @Override
    @Transactional(readOnly = true)
    public List<GradoOfertaResponse> oferta() {
        List<GradoOfertaResponse> r = new ArrayList<>();
        for (Nivel nivel : nivelesEstandar()) {
            for (int numero = 1; numero <= GRADOS_POR_NIVEL.get(nivel.getCodigo()); numero++) {
                Grado existente = repository.findByNivelIdAndNumero(nivel.getId(), (short) numero).orElse(null);
                long secciones = existente == null ? 0 : seccionRepository.countByGradoId(existente.getId());
                long cursos = existente == null ? 0 : gradoCursoRepository.countByGradoId(existente.getId());
                r.add(new GradoOfertaResponse(existente == null ? null : existente.getId(), nivel.getCodigo(), nivel.getNombre(), numero,
                        nombreEstandar(nivel, numero), existente != null && Boolean.TRUE.equals(existente.getActivo()),
                        secciones + cursos > 0, detalleUso(secciones, cursos)));
            }
        }
        return r;
    }

    @Override
    public List<GradoOfertaResponse> actualizarOferta(OfertaGradosRequest request) {
        Set<String> elegidos = new HashSet<>();
        for (OfertaGradosRequest.Clave c : request.seleccionados()) {
            Integer max = GRADOS_POR_NIVEL.get(c.nivelCodigo());
            if (max == null || c.numero() < 1 || c.numero() > max) {
                throw new BusinessRuleException("«" + c.nivelCodigo() + " " + c.numero() + "» no es un grado de la oferta estándar");
            }
            elegidos.add(clave(c.nivelCodigo(), c.numero()));
        }

        // Primero se revisa todo: si algún grado desmarcado está en uso, no se cambia nada.
        List<String> enUso = new ArrayList<>();
        for (Nivel nivel : nivelesEstandar()) {
            for (int numero = 1; numero <= GRADOS_POR_NIVEL.get(nivel.getCodigo()); numero++) {
                if (elegidos.contains(clave(nivel.getCodigo(), numero))) continue;
                Grado existente = repository.findByNivelIdAndNumero(nivel.getId(), (short) numero).orElse(null);
                if (existente != null && Boolean.TRUE.equals(existente.getActivo())
                        && (seccionRepository.countByGradoId(existente.getId()) > 0 || gradoCursoRepository.countByGradoId(existente.getId()) > 0)) {
                    enUso.add(existente.getNombre());
                }
            }
        }
        if (!enUso.isEmpty()) {
            throw new BusinessRuleException("No se pueden quitar " + String.join(", ", enUso)
                    + ": tienen secciones o cursos en su malla. Quítalos primero de la estructura académica.");
        }

        for (Nivel nivel : nivelesEstandar()) {
            for (int numero = 1; numero <= GRADOS_POR_NIVEL.get(nivel.getCodigo()); numero++) {
                boolean elegido = elegidos.contains(clave(nivel.getCodigo(), numero));
                Grado existente = repository.findByNivelIdAndNumero(nivel.getId(), (short) numero).orElse(null);
                if (elegido && existente == null) {
                    Grado g = new Grado();
                    g.setNivel(nivel);
                    g.setNumero((short) numero);
                    g.setNombre(nombreEstandar(nivel, numero));
                    g.setActivo(true);
                    repository.save(g);
                } else if (existente != null && Boolean.TRUE.equals(existente.getActivo()) != elegido) {
                    existente.setActivo(elegido);
                    repository.save(existente);
                }
            }
        }
        return oferta();
    }

    private List<Nivel> nivelesEstandar() {
        return nivelRepository.findAllByOrderByOrden().stream().filter(n -> GRADOS_POR_NIVEL.containsKey(n.getCodigo())).toList();
    }

    /** «3 años» en Inicial (la edad); «1° de Primaria» en los demás niveles. */
    static String nombreEstandar(Nivel nivel, int numero) {
        return "INICIAL".equals(nivel.getCodigo()) ? (numero + 2) + " años" : numero + "° de " + nivel.getNombre();
    }

    private static String clave(String nivelCodigo, int numero) {
        return nivelCodigo + ":" + numero;
    }

    private static String detalleUso(long secciones, long cursos) {
        if (secciones + cursos == 0) return null;
        List<String> partes = new ArrayList<>();
        if (secciones > 0) partes.add(secciones + (secciones == 1 ? " sección" : " secciones"));
        if (cursos > 0) partes.add(cursos + (cursos == 1 ? " curso en su malla" : " cursos en su malla"));
        return String.join(" y ", partes);
    }

    private Grado buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Grado", id));
    }
}
```

---

## 125. `HorarioGeneradorService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/HorarioGeneradorService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `HorarioGenerador`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.GenerarHorarioRequest;
import pe.edu.eduspace.planificacion.dto.PreparacionSeccionResponse;
import pe.edu.eduspace.planificacion.dto.ResultadoGeneracion;

/** Armado automático de horarios a partir de la malla, los docentes asignados y los bloques de cada turno. */
public interface HorarioGeneradorService {

    /** Estado de cada sección del año antes de generar: qué tiene y qué le falta. */
    List<PreparacionSeccionResponse> preparacion(Long anioId);

    ResultadoGeneracion generar(GenerarHorarioRequest request);
}
```

---

## 126. `HorarioGeneradorServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/HorarioGeneradorServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `HorarioGenerador`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import pe.edu.eduspace.planificacion.dto.GenerarHorarioRequest;
import pe.edu.eduspace.planificacion.dto.PreparacionSeccionResponse;
import pe.edu.eduspace.planificacion.dto.ResultadoGeneracion;
import pe.edu.eduspace.planificacion.dto.ResultadoSeccionGeneracion;
import pe.edu.eduspace.planificacion.entity.*;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.horario.PlanificadorHorario;
import pe.edu.eduspace.planificacion.horario.PlanificadorHorario.Leccion;
import pe.edu.eduspace.planificacion.repository.*;
import pe.edu.eduspace.planificacion.service.HorarioGeneradorService;

@Service
@RequiredArgsConstructor
@Transactional
public class HorarioGeneradorServiceImpl implements HorarioGeneradorService {

    /** Lunes a viernes. */
    private static final int DIAS = 5;
    private static final long SEMILLA = 2026L;
    private static final Pattern GENERALISTA = Pattern.compile("primaria|polivalente|generalista|inicial|tutor");

    private final AnioAcademicoRepository anioRepository;
    private final SeccionRepository seccionRepository;
    private final GradoCursoRepository mallaRepository;
    private final AsignacionRepository asignacionRepository;
    private final BloqueHorarioRepository bloqueRepository;
    private final HorarioRepository horarioRepository;
    private final DocenteRepository docenteRepository;

    /** Datos del año leídos una sola vez. */
    private static final class Contexto {
        final Map<Long, List<GradoCurso>> malla = new HashMap<>();
        final Map<Turno, List<BloqueHorario>> bloques = new HashMap<>();
        final Map<Long, List<Asignacion>> asignaciones = new HashMap<>();
        final Map<Long, Integer> horasDocente = new HashMap<>();
        final Map<Long, Long> programadasPorAsignacion = new HashMap<>();
    }

    // ------------------------------------------------------------------ preparación
    @Override
    @Transactional(readOnly = true)
    public List<PreparacionSeccionResponse> preparacion(Long anioId) {
        anio(anioId);
        List<Seccion> secciones = seccionesActivas(anioId);
        Contexto ctx = cargar(secciones, anioId);
        return secciones.stream().map(s -> evaluar(s, ctx)).toList();
    }

    private PreparacionSeccionResponse evaluar(Seccion s, Contexto ctx) {
        List<GradoCurso> malla = ctx.malla.get(s.getGrado().getId());
        List<BloqueHorario> clase = bloquesDeClase(ctx, s.getTurno());
        int espacios = clase.size() * DIAS;
        int horas = malla.stream().mapToInt(m -> m.getHorasSemanales()).sum();
        List<Asignacion> asignadas = ctx.asignaciones.getOrDefault(s.getId(), List.of());
        Map<Long, Asignacion> porCurso = new HashMap<>();
        asignadas.forEach(a -> porCurso.put(a.getCurso().getId(), a));
        List<String> sinDocente = malla.stream().filter(m -> !porCurso.containsKey(m.getCurso().getId()))
                .map(m -> m.getCurso().getNombre()).toList();
        int programadas = asignadas.stream().mapToInt(a -> ctx.programadasPorAsignacion.getOrDefault(a.getId(), 0L).intValue()).sum();
        List<String> problemas = new ArrayList<>();
        if (malla.isEmpty()) {
            problemas.add("El grado no tiene cursos en la malla");
        }
        if (clase.isEmpty()) {
            problemas.add("El turno " + s.getTurno() + " no tiene bloques de clase");
        } else if (horas > espacios) {
            problemas.add("La malla suma " + horas + " horas y la semana solo tiene " + espacios + " espacios");
        }
        if (!sinDocente.isEmpty()) {
            problemas.add("Faltan docentes en: " + String.join(", ", sinDocente));
        }
        asignadas.stream().map(Asignacion::getDocente).distinct().forEach(d -> {
            int carga = ctx.horasDocente.getOrDefault(d.getId(), 0);
            if (!clase.isEmpty() && carga > espacios) {
                problemas.add("El docente " + d.nombreCompleto() + " tiene " + carga + " horas asignadas y solo hay " + espacios + " espacios");
            }
        });
        return new PreparacionSeccionResponse(s.getId(), nombre(s), s.getGrado().getId(), s.getGrado().getNombre(),
                s.getGrado().getNivel().getId(), s.getGrado().getNivel().getNombre(), s.getTurno(),
                s.getAula() == null ? null : s.getAula().getNombre(), malla.size(), horas, espacios, sinDocente, programadas,
                problemas.isEmpty(), problemas);
    }

    // ------------------------------------------------------------------ generación
    @Override
    public ResultadoGeneracion generar(GenerarHorarioRequest req) {
        AnioAcademico anio = anio(req.anioId());
        if (anio.getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año " + anio.getNombre() + " está CERRADO (solo lectura)");
        }
        boolean reemplazar = Boolean.TRUE.equals(req.reemplazar());
        boolean simular = Boolean.TRUE.equals(req.simular());
        List<Seccion> todas = seccionesActivas(req.anioId());
        Set<Long> pedidas = req.seccionIds() == null ? Set.of() : Set.copyOf(req.seccionIds());
        List<Seccion> elegidas = todas.stream().filter(s -> pedidas.isEmpty() || pedidas.contains(s.getId())).toList();
        if (elegidas.isEmpty()) {
            throw new BusinessRuleException("No hay secciones para generar el horario");
        }

        Contexto ctx = cargar(todas, req.anioId());
        int docentesAsignados = 0;
        if (Boolean.TRUE.equals(req.asignarDocentes())) {
            docentesAsignados = autoAsignar(elegidas, ctx);
            if (docentesAsignados > 0) {
                ctx = cargar(todas, req.anioId()); // recarga con las asignaciones nuevas
            }
        }

        List<ResultadoSeccionGeneracion> resultados = new ArrayList<>();
        List<Seccion> listas = new ArrayList<>();
        for (Seccion s : elegidas) {
            PreparacionSeccionResponse prep = evaluar(s, ctx);
            if (prep.lista()) {
                listas.add(s);
            } else {
                resultados.add(new ResultadoSeccionGeneracion(s.getId(), nombre(s), "OMITIDO", prep.horasMalla(), 0, prep.problemas()));
            }
        }

        int colocadas = 0;
        int sinColocar = 0;
        if (!listas.isEmpty()) {
            Resolucion r = resolver(listas, ctx, req.anioId(), reemplazar, simular);
            resultados.addAll(r.resultados);
            colocadas = r.colocadas;
            sinColocar = r.sinColocar;
        }
        if (simular) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly(); // nada de esto se guarda
        }
        int generadas = (int) resultados.stream().filter(x -> x.estado().equals("GENERADO") || x.estado().equals("INCOMPLETO")).count();
        int omitidas = (int) resultados.stream().filter(x -> x.estado().equals("OMITIDO")).count();
        resultados.sort(Comparator.comparing(ResultadoSeccionGeneracion::nombre));
        return new ResultadoGeneracion(simular, generadas, omitidas, colocadas, sinColocar, docentesAsignados, resultados);
    }

    private static final class Resolucion {
        final List<ResultadoSeccionGeneracion> resultados = new ArrayList<>();
        int colocadas;
        int sinColocar;
    }

    private Resolucion resolver(List<Seccion> listas, Contexto ctx, Long anioId, boolean reemplazar, boolean simular) {
        // bloques de clase de los turnos que intervienen: el espacio es (día, bloque) y un docente no puede repetirse entre turnos solapados
        List<BloqueHorario> bloques = new ArrayList<>();
        for (Turno t : listas.stream().map(Seccion::getTurno).distinct().sorted().toList()) {
            bloques.addAll(bloquesDeClase(ctx, t));
        }
        int nb = bloques.size();
        Map<Long, Integer> indiceBloque = new HashMap<>();
        for (int i = 0; i < nb; i++) indiceBloque.put(bloques.get(i).getId(), i);
        int e = DIAS * nb;

        Map<Long, Integer> idxSeccion = new HashMap<>();
        for (int i = 0; i < listas.size(); i++) idxSeccion.put(listas.get(i).getId(), i);
        Map<Long, Integer> idxDocente = new LinkedHashMap<>();
        Map<Long, Integer> idxAula = new LinkedHashMap<>();
        Map<Long, Integer> idxCurso = new LinkedHashMap<>();
        for (Seccion s : listas) {
            for (Asignacion a : ctx.asignaciones.getOrDefault(s.getId(), List.of())) {
                idxDocente.putIfAbsent(a.getDocente().getId(), idxDocente.size());
                idxCurso.putIfAbsent(a.getCurso().getId(), idxCurso.size());
            }
            if (s.getAula() != null) idxAula.putIfAbsent(s.getAula().getId(), idxAula.size());
        }

        boolean[][] permitido = new boolean[listas.size()][e];
        for (int i = 0; i < listas.size(); i++) {
            for (int d = 0; d < DIAS; d++) {
                for (int b = 0; b < nb; b++) permitido[i][d * nb + b] = bloques.get(b).getTurno() == listas.get(i).getTurno();
            }
        }
        boolean[][] ocupSeccion = new boolean[listas.size()][e];
        boolean[][] ocupDocente = new boolean[Math.max(idxDocente.size(), 1)][e];
        boolean[][] ocupAula = new boolean[Math.max(idxAula.size(), 1)][e];

        // clases que ya existen: ocupan espacios (las de las secciones a regenerar se borrarán, por eso no cuentan)
        Map<Long, Long> yaColocadas = new HashMap<>();
        List<Horario> aBorrar = new ArrayList<>();
        for (Horario h : horarioRepository.findByAnio(anioId)) {
            Long seccionId = h.getAsignacion().getSeccion().getId();
            boolean regenera = idxSeccion.containsKey(seccionId);
            if (regenera && reemplazar) {
                aBorrar.add(h);
                continue;
            }
            Integer ib = indiceBloque.get(h.getBloque().getId());
            if (ib == null || h.getDiaSemana() > DIAS) continue;
            int slot = (h.getDiaSemana() - 1) * nb + ib;
            if (regenera) {
                ocupSeccion[idxSeccion.get(seccionId)][slot] = true;
                yaColocadas.merge(h.getAsignacion().getId(), 1L, Long::sum);
            }
            Integer d = idxDocente.get(h.getAsignacion().getDocente().getId());
            if (d != null) ocupDocente[d][slot] = true;
            if (h.getAula() != null && idxAula.get(h.getAula().getId()) != null) ocupAula[idxAula.get(h.getAula().getId())][slot] = true;
        }

        // una lección por cada hora que falta de cada curso
        List<Leccion> lecciones = new ArrayList<>();
        List<Asignacion> deLeccion = new ArrayList<>();
        Map<Long, Integer> requeridasPorSeccion = new HashMap<>();
        for (Seccion s : listas) {
            Map<Long, Asignacion> porCurso = new HashMap<>();
            ctx.asignaciones.getOrDefault(s.getId(), List.of()).forEach(a -> porCurso.put(a.getCurso().getId(), a));
            int req = 0;
            for (GradoCurso m : ctx.malla.get(s.getGrado().getId())) {
                Asignacion a = porCurso.get(m.getCurso().getId());
                int faltan = m.getHorasSemanales() - yaColocadas.getOrDefault(a.getId(), 0L).intValue();
                req += m.getHorasSemanales();
                for (int h = 0; h < faltan; h++) {
                    lecciones.add(new Leccion(idxSeccion.get(s.getId()), idxDocente.get(a.getDocente().getId()),
                            idxCurso.get(m.getCurso().getId()), s.getAula() == null ? -1 : idxAula.get(s.getAula().getId())));
                    deLeccion.add(a);
                }
            }
            requeridasPorSeccion.put(s.getId(), req);
        }

        int[] sol = PlanificadorHorario.resolver(
                new PlanificadorHorario.Problema(DIAS, nb, lecciones, permitido, ocupSeccion, ocupDocente, ocupAula, idxCurso.size()), SEMILLA);

        if (reemplazar && !aBorrar.isEmpty()) {
            horarioRepository.deleteAll(aBorrar);
            horarioRepository.flush();
        }
        Resolucion out = new Resolucion();
        Map<Long, Integer> colocadasPorSeccion = new HashMap<>();
        Map<Long, Map<String, Integer>> faltanPorSeccion = new HashMap<>();
        List<Horario> nuevos = new ArrayList<>();
        for (int l = 0; l < lecciones.size(); l++) {
            Asignacion a = deLeccion.get(l);
            Long seccionId = a.getSeccion().getId();
            if (sol[l] < 0) {
                out.sinColocar++;
                faltanPorSeccion.computeIfAbsent(seccionId, k -> new LinkedHashMap<>()).merge(a.getCurso().getNombre(), 1, Integer::sum);
                continue;
            }
            Horario h = new Horario();
            h.setAsignacion(a);
            h.setBloque(bloques.get(sol[l] % nb));
            h.setDiaSemana((short) (sol[l] / nb + 1));
            h.setAula(a.getSeccion().getAula());
            nuevos.add(h);
            colocadasPorSeccion.merge(seccionId, 1, Integer::sum);
            out.colocadas++;
        }
        horarioRepository.saveAll(nuevos);

        for (Seccion s : listas) {
            int col = colocadasPorSeccion.getOrDefault(s.getId(), 0);
            int existentes = (int) existentesDe(s, ctx, yaColocadas);
            boolean teniaClases = existentes > 0 || aBorrar.stream().anyMatch(h -> h.getAsignacion().getSeccion().getId().equals(s.getId()));
            Map<String, Integer> faltan = faltanPorSeccion.getOrDefault(s.getId(), Map.of());
            List<String> msg = new ArrayList<>();
            faltan.forEach((curso, n) -> msg.add(curso + ": falta ubicar " + n + " hora(s)"));
            String estado;
            if (!faltan.isEmpty()) {
                estado = "INCOMPLETO";
                msg.add("Revisa si un docente está sobrecargado o si el turno tiene pocos bloques.");
            } else if (col == 0) {
                estado = "SIN_CAMBIOS";
                msg.add("El horario ya estaba completo.");
            } else {
                estado = "GENERADO";
                if (teniaClases && !simular) msg.add("Si el horario ya estaba publicado, vuelve a publicarlo para avisar a las familias.");
            }
            out.resultados.add(new ResultadoSeccionGeneracion(s.getId(), nombre(s), estado, requeridasPorSeccion.get(s.getId()),
                    col + existentes, msg));
        }
        return out;
    }

    private long existentesDe(Seccion s, Contexto ctx, Map<Long, Long> yaColocadas) {
        return ctx.asignaciones.getOrDefault(s.getId(), List.of()).stream().mapToLong(a -> yaColocadas.getOrDefault(a.getId(), 0L)).sum();
    }

    // ------------------------------------------------------------------ asignar docentes por especialidad
    private int autoAsignar(List<Seccion> elegidas, Contexto ctx) {
        // Solo el personal del área Docencia puede dictar cursos (el resto del personal no entra al armado de horarios).
        List<Docente> activos = docenteRepository.findAll().stream().filter(d -> d.getEstado() == EstadoDocente.ACTIVO && d.esDocente()).toList();
        int creadas = 0;
        for (Seccion s : elegidas) {
            Set<Long> conDocente = new java.util.HashSet<>();
            ctx.asignaciones.getOrDefault(s.getId(), List.of()).forEach(a -> conDocente.add(a.getCurso().getId()));
            int espacios = bloquesDeClase(ctx, s.getTurno()).size() * DIAS;
            for (GradoCurso m : ctx.malla.get(s.getGrado().getId())) {
                if (conDocente.contains(m.getCurso().getId())) continue;
                Docente elegido = null;
                int mejorPrioridad = Integer.MAX_VALUE;
                int menorCarga = Integer.MAX_VALUE;
                for (Docente d : activos) {
                    int prioridad = prioridad(d, m.getCurso(), s.getGrado().getNivel());
                    if (prioridad > 1) continue;
                    int carga = ctx.horasDocente.getOrDefault(d.getId(), 0);
                    if (espacios > 0 && carga + m.getHorasSemanales() > espacios) continue; // no entra en su semana
                    if (prioridad < mejorPrioridad || (prioridad == mejorPrioridad && carga < menorCarga)) {
                        elegido = d;
                        mejorPrioridad = prioridad;
                        menorCarga = carga;
                    }
                }
                if (elegido == null) continue;
                Asignacion a = new Asignacion();
                a.setSeccion(s);
                a.setCurso(m.getCurso());
                a.setDocente(elegido);
                asignacionRepository.save(a);
                ctx.horasDocente.merge(elegido.getId(), (int) m.getHorasSemanales(), Integer::sum);
                creadas++;
            }
        }
        asignacionRepository.flush();
        return creadas;
    }

    /** 0 = su especialidad es el curso; 1 = docente generalista del nivel (Primaria/Inicial); 2 = no corresponde. */
    static int prioridad(Docente d, Curso curso, Nivel nivel) {
        // Los cursos que se eligieron al contratarlo mandan sobre la especialidad escrita a mano.
        if (d.getCursos().stream().anyMatch(c -> c.getId() != null && c.getId().equals(curso.getId()))) return 0;
        String esp = normalizar(d.getEspecialidad());
        if (esp.isBlank()) return 2;
        String nombre = normalizar(curso.getNombre());
        String area = normalizar(curso.getArea());
        if (esp.contains(nombre) || (esp.length() >= 4 && nombre.contains(esp)) || (!area.isBlank() && area.length() >= 4 && esp.contains(area))) {
            return 0;
        }
        boolean nivelInicialOPrimaria = nivel != null && ("PRIMARIA".equals(nivel.getCodigo()) || "INICIAL".equals(nivel.getCodigo()));
        return nivelInicialOPrimaria && GENERALISTA.matcher(esp).find() ? 1 : 2;
    }

    static String normalizar(String texto) {
        if (texto == null) return "";
        return Normalizer.normalize(texto, Normalizer.Form.NFD).replaceAll("\\p{M}", "").toLowerCase().trim();
    }

    // ------------------------------------------------------------------ carga de datos
    private Contexto cargar(List<Seccion> secciones, Long anioId) {
        Contexto ctx = new Contexto();
        for (Seccion s : secciones) {
            ctx.malla.computeIfAbsent(s.getGrado().getId(), g -> mallaRepository.findByGradoIdOrderByCursoNombre(g));
            ctx.bloques.computeIfAbsent(s.getTurno(), bloqueRepository::findByTurnoOrderByOrden);
            List<Asignacion> asignadas = asignacionRepository.findBySeccionId(s.getId());
            ctx.asignaciones.put(s.getId(), asignadas);
            for (Asignacion a : asignadas) {
                ctx.programadasPorAsignacion.computeIfAbsent(a.getId(), horarioRepository::countByAsignacionId);
                int horas = ctx.malla.get(s.getGrado().getId()).stream().filter(m -> m.getCurso().getId().equals(a.getCurso().getId()))
                        .mapToInt(m -> m.getHorasSemanales()).sum();
                ctx.horasDocente.merge(a.getDocente().getId(), horas, Integer::sum);
            }
        }
        return ctx;
    }

    private List<BloqueHorario> bloquesDeClase(Contexto ctx, Turno turno) {
        return ctx.bloques.computeIfAbsent(turno, bloqueRepository::findByTurnoOrderByOrden).stream()
                .filter(b -> !Boolean.TRUE.equals(b.getEsReceso())).toList();
    }

    private List<Seccion> seccionesActivas(Long anioId) {
        return seccionRepository.buscar(anioId, null).stream().filter(s -> Boolean.TRUE.equals(s.getActivo())).toList();
    }

    private AnioAcademico anio(Long id) {
        return anioRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Año académico", id));
    }

    private String nombre(Seccion s) {
        return s.getGrado().getNombre() + " " + s.getNombre();
    }
}
```

---

## 127. `HorarioService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/HorarioService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Horario`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import pe.edu.eduspace.planificacion.dto.*;

public interface HorarioService {
    HorarioSeccionResponse porSeccion(Long seccionId);

    HorarioDocenteResponse porDocente(Long docenteId);

    /** Todas las clases del año (para ver qué aulas están ocupadas y cuáles libres en cada bloque). */
    java.util.List<HorarioResponse> porAnio(Long anioId);

    HorarioResponse crear(HorarioRequest request);

    HorarioResponse mover(Long id, HorarioRequest request);

    void eliminar(Long id);

    /** Validación global de la sección: choques y cursos con horas faltantes o sobrantes. */
    ResultadoValidacionHorario validar(Long seccionId);
}
```

---

## 128. `HorarioServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/HorarioServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Horario`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.*;
import pe.edu.eduspace.planificacion.entity.*;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.*;
import pe.edu.eduspace.planificacion.service.HorarioService;

@Service
@RequiredArgsConstructor
@Transactional
public class HorarioServiceImpl implements HorarioService {

    private static final String[] DIAS = {"", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"};
    private static final DateTimeFormatter HORA = DateTimeFormatter.ofPattern("HH:mm");

    private final HorarioRepository repository;
    private final AsignacionRepository asignacionRepository;
    private final BloqueHorarioRepository bloqueRepository;
    private final AulaRepository aulaRepository;
    private final SeccionRepository seccionRepository;
    private final DocenteRepository docenteRepository;
    private final GradoCursoRepository mallaRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public HorarioSeccionResponse porSeccion(Long seccionId) {
        Seccion seccion = seccion(seccionId);
        List<BloqueResponse> bloques = bloqueRepository.findByTurnoOrderByOrden(seccion.getTurno()).stream()
                .map(mapper::toResponse).toList();
        List<HorarioResponse> clases = repository.findBySeccion(seccionId).stream().map(mapper::toResponse).toList();
        return new HorarioSeccionResponse(seccion.getId(), nombre(seccion), seccion.getTurno(), bloques, clases);
    }

    @Override
    @Transactional(readOnly = true)
    public HorarioDocenteResponse porDocente(Long docenteId) {
        Docente docente = docenteRepository.findById(docenteId)
                .orElseThrow(() -> ResourceNotFoundException.of("Docente", docenteId));
        List<HorarioResponse> clases = repository.findByDocente(docenteId).stream().map(mapper::toResponse).toList();
        return new HorarioDocenteResponse(docente.getId(), docente.nombreCompleto(), clases);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HorarioResponse> porAnio(Long anioId) {
        return repository.findByAnio(anioId).stream().map(mapper::toResponse).toList();
    }

    @Override
    public HorarioResponse crear(HorarioRequest request) {
        Horario horario = new Horario();
        aplicar(horario, request, null);
        return mapper.toResponse(repository.save(horario));
    }

    @Override
    public HorarioResponse mover(Long id, HorarioRequest request) {
        Horario horario = buscar(id);
        aplicar(horario, request, id);
        return mapper.toResponse(repository.save(horario));
    }

    @Override
    public void eliminar(Long id) {
        Horario horario = buscar(id);
        if (horario.getAsignacion().getSeccion().getAnio().getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año está CERRADO (solo lectura)");
        }
        repository.delete(horario);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultadoValidacionHorario validar(Long seccionId) {
        Seccion seccion = seccion(seccionId);
        Set<String> choques = new LinkedHashSet<>();
        for (Horario h : repository.findBySeccion(seccionId)) {
            Asignacion a = h.getAsignacion();
            BloqueHorario b = h.getBloque();
            String donde = "el " + DIAS[h.getDiaSemana()] + " en el bloque " + b.getOrden();
            if (repository.existsChoqueDocente(a.getDocente().getId(), h.getDiaSemana(), b.getId(), h.getId())) {
                choques.add("El docente " + a.getDocente().nombreCompleto() + " tiene dos clases " + donde);
            }
            if (h.getAula() != null && repository.existsChoqueAula(h.getAula().getId(), h.getDiaSemana(), b.getId(), h.getId())) {
                choques.add("El aula " + h.getAula().getCodigo() + " está ocupada dos veces " + donde);
            }
            if (repository.existsChoqueSeccion(seccionId, h.getDiaSemana(), b.getId(), h.getId())) {
                choques.add("La sección " + nombre(seccion) + " tiene dos clases " + donde);
            }
            if (b.getTurno() != seccion.getTurno()) {
                choques.add("El bloque " + b.getOrden() + " (" + b.getTurno() + ") no corresponde al turno de la sección (" + seccion.getTurno() + ")");
            }
            if (h.getAula() != null && !cabe(h.getAula(), seccion)) {
                choques.add("El aula " + h.getAula().getCodigo() + " (capacidad " + h.getAula().getCapacidad()
                        + ") no alcanza para la sección " + nombre(seccion) + " (" + seccion.getCapacidad() + " alumnos)");
            }
            if (Boolean.TRUE.equals(b.getEsReceso())) {
                choques.add("Hay una clase programada en un receso " + donde);
            }
        }
        List<CursoHorasResponse> incompletos = new ArrayList<>();
        for (GradoCurso item : mallaRepository.findByGradoIdOrderByCursoNombre(seccion.getGrado().getId())) {
            var asignacion = asignacionRepository.findBySeccionIdAndCursoId(seccionId, item.getCurso().getId());
            int programadas = asignacion.map(a -> (int) repository.countByAsignacionId(a.getId())).orElse(0);
            int requeridas = item.getHorasSemanales();
            if (asignacion.isEmpty()) {
                incompletos.add(new CursoHorasResponse(item.getCurso().getId(), item.getCurso().getNombre(), requeridas, 0, "SIN_DOCENTE"));
            } else if (programadas < requeridas) {
                incompletos.add(new CursoHorasResponse(item.getCurso().getId(), item.getCurso().getNombre(), requeridas, programadas, "FALTANTE"));
            } else if (programadas > requeridas) {
                incompletos.add(new CursoHorasResponse(item.getCurso().getId(), item.getCurso().getNombre(), requeridas, programadas, "SOBRANTE"));
            }
        }
        return new ResultadoValidacionHorario(choques.isEmpty() && incompletos.isEmpty(), List.copyOf(choques), incompletos);
    }

    /** Valida las siete reglas del horario y asigna los campos a la clase (nueva o existente). */
    private void aplicar(Horario horario, HorarioRequest r, Long excluirId) {
        Asignacion asignacion = asignacionRepository.findById(r.asignacionId())
                .orElseThrow(() -> ResourceNotFoundException.of("Asignación", r.asignacionId()));
        Seccion seccion = asignacion.getSeccion();
        if (seccion.getAnio().getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año " + seccion.getAnio().getNombre() + " está CERRADO (solo lectura)");
        }
        BloqueHorario bloque = bloqueRepository.findById(r.bloqueId())
                .orElseThrow(() -> ResourceNotFoundException.of("Bloque horario", r.bloqueId()));
        Aula aula = null;
        Long aulaId = r.aulaId() != null ? r.aulaId() : (seccion.getAula() == null ? null : seccion.getAula().getId());
        if (aulaId != null) {
            aula = aulaRepository.findById(aulaId).orElseThrow(() -> ResourceNotFoundException.of("Aula", aulaId));
            if (!Boolean.TRUE.equals(aula.getActivo())) {
                throw new BusinessRuleException("El aula " + aula.getCodigo() + " está inactiva");
            }
        }
        String slot = "el " + DIAS[r.diaSemana()] + " en el bloque " + bloque.getOrden()
                + " (" + hora(bloque.getHoraInicio()) + "-" + hora(bloque.getHoraFin()) + ")";
        Docente docente = asignacion.getDocente();

        // (1) docente libre
        if (repository.existsChoqueDocente(docente.getId(), r.diaSemana(), bloque.getId(), excluirId)) {
            throw new BusinessRuleException("El docente " + docente.nombreCompleto() + " ya tiene clase " + slot);
        }
        // (2) aula libre
        if (aula != null && repository.existsChoqueAula(aula.getId(), r.diaSemana(), bloque.getId(), excluirId)) {
            throw new BusinessRuleException("El aula " + aula.getCodigo() + " ya está ocupada " + slot);
        }
        // (3) sección sin otra clase
        if (repository.existsChoqueSeccion(seccion.getId(), r.diaSemana(), bloque.getId(), excluirId)) {
            throw new BusinessRuleException("La sección " + nombre(seccion) + " ya tiene otra clase " + slot);
        }
        // (4) bloque del mismo turno que la sección
        if (bloque.getTurno() != seccion.getTurno()) {
            throw new BusinessRuleException("El bloque " + bloque.getOrden() + " es del turno " + bloque.getTurno()
                    + " y la sección " + nombre(seccion) + " es del turno " + seccion.getTurno());
        }
        // (5) no es receso
        if (Boolean.TRUE.equals(bloque.getEsReceso())) {
            throw new BusinessRuleException("El bloque " + bloque.getOrden() + " es un receso: no admite clases");
        }
        // (7) el aula tiene aforo para la sección
        if (aula != null && !cabe(aula, seccion)) {
            throw new BusinessRuleException("El aula " + aula.getCodigo() + " (capacidad " + aula.getCapacidad()
                    + ") no alcanza para la sección " + nombre(seccion) + " (" + seccion.getCapacidad() + " alumnos)");
        }
        // (6) no excede las horas semanales de la malla
        GradoCurso malla = mallaRepository.findByGradoIdAndCursoId(seccion.getGrado().getId(), asignacion.getCurso().getId())
                .orElseThrow(() -> new BusinessRuleException("El curso " + asignacion.getCurso().getNombre()
                        + " ya no está en la malla de " + seccion.getGrado().getNombre()));
        long actuales = repository.countByAsignacionExcluyendo(asignacion.getId(), excluirId);
        if (actuales + 1 > malla.getHorasSemanales()) {
            throw new BusinessRuleException("El curso " + asignacion.getCurso().getNombre() + " ya tiene sus "
                    + malla.getHorasSemanales() + " horas semanales programadas");
        }

        horario.setAsignacion(asignacion);
        horario.setBloque(bloque);
        horario.setAula(aula);
        horario.setDiaSemana(r.diaSemana());
    }

    /** Sin capacidad declarada en el aula no se puede afirmar que no alcance. */
    private boolean cabe(Aula aula, Seccion seccion) {
        return aula.getCapacidad() == null || seccion.getCapacidad() == null || aula.getCapacidad() >= seccion.getCapacidad();
    }

    private String hora(LocalTime t) {
        return t.format(HORA);
    }

    private String nombre(Seccion seccion) {
        return seccion.getGrado().getNombre() + " " + seccion.getNombre();
    }

    private Seccion seccion(Long id) {
        return seccionRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Sección", id));
    }

    private Horario buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Clase del horario", id));
    }
}
```

---

## 129. `InternalConsultaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/InternalConsultaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `InternalConsulta`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.*;

/** Lecturas livianas para otros servicios (adenda A2); sin paginación pesada. */
public interface InternalConsultaService {
    InternalDocenteResponse docentePorUsuario(Long usuarioId);

    List<AsignacionInternaResponse> asignacionesDeUsuario(Long usuarioId, Long anioId);

    boolean asignacionValida(Long docenteId, Long seccionId, Long cursoId);

    SeccionInternaResponse seccion(Long id);

    List<SeccionInternaResponse> secciones(Long anioId, Long gradoId);

    GradoResponse grado(Long id);

    NivelResponse nivel(Long id);

    List<PeriodoResponse> periodos(Long anioId);

    PeriodoResponse periodo(Long id);
}
```

---

## 130. `InternalConsultaServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/InternalConsultaServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `InternalConsulta`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.*;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.*;
import pe.edu.eduspace.planificacion.service.InternalConsultaService;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InternalConsultaServiceImpl implements InternalConsultaService {

    private final DocenteRepository docenteRepository;
    private final AsignacionRepository asignacionRepository;
    private final SeccionRepository seccionRepository;
    private final GradoRepository gradoRepository;
    private final NivelRepository nivelRepository;
    private final PeriodoRepository periodoRepository;
    private final PlanificacionMapper mapper;

    @Override
    public InternalDocenteResponse docentePorUsuario(Long usuarioId) {
        Docente d = docenteRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario " + usuarioId + " no está vinculado a un docente"));
        return new InternalDocenteResponse(d.getId(), d.nombreCompleto(), d.getEstado());
    }

    @Override
    public List<AsignacionInternaResponse> asignacionesDeUsuario(Long usuarioId, Long anioId) {
        Docente d = docenteRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario " + usuarioId + " no está vinculado a un docente"));
        return asignacionRepository.findByDocenteAndAnio(d.getId(), anioId).stream()
                .map(a -> new AsignacionInternaResponse(a.getSeccion().getId(), a.getCurso().getId(), a.getId())).toList();
    }

    @Override
    public boolean asignacionValida(Long docenteId, Long seccionId, Long cursoId) {
        return asignacionRepository.existsByDocenteIdAndSeccionIdAndCursoId(docenteId, seccionId, cursoId);
    }

    @Override
    public SeccionInternaResponse seccion(Long id) {
        return seccionRepository.findById(id).map(mapper::toInterna)
                .orElseThrow(() -> ResourceNotFoundException.of("Sección", id));
    }

    @Override
    public List<SeccionInternaResponse> secciones(Long anioId, Long gradoId) {
        return seccionRepository.buscar(anioId, gradoId).stream().map(mapper::toInterna).toList();
    }

    @Override
    public GradoResponse grado(Long id) {
        return gradoRepository.findById(id).map(mapper::toResponse)
                .orElseThrow(() -> ResourceNotFoundException.of("Grado", id));
    }

    @Override
    public NivelResponse nivel(Long id) {
        return nivelRepository.findById(id).map(mapper::toResponse)
                .orElseThrow(() -> ResourceNotFoundException.of("Nivel", id));
    }

    @Override
    public List<PeriodoResponse> periodos(Long anioId) {
        return periodoRepository.findByAnioIdOrderByNumero(anioId).stream().map(mapper::toResponse).toList();
    }

    @Override
    public PeriodoResponse periodo(Long id) {
        return periodoRepository.findById(id).map(mapper::toResponse)
                .orElseThrow(() -> ResourceNotFoundException.of("Periodo", id));
    }
}
```

---

## 131. `MallaService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/MallaService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Malla`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import pe.edu.eduspace.planificacion.dto.MallaGradoResponse;
import pe.edu.eduspace.planificacion.dto.MallaItemResponse;
import pe.edu.eduspace.planificacion.dto.MallaLoteRequest;
import pe.edu.eduspace.planificacion.dto.MallaLoteResponse;
import pe.edu.eduspace.planificacion.dto.MallaRequest;

public interface MallaService {
    MallaGradoResponse porGrado(Long gradoId);

    MallaItemResponse agregar(MallaRequest request);

    MallaItemResponse actualizarHoras(Long id, Short horasSemanales);

    /** Agrega o actualiza varios cursos en la malla de varios grados. */
    MallaLoteResponse agregarLote(MallaLoteRequest request);

    void eliminar(Long id);
}
```

---

## 132. `MallaServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/MallaServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Malla`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.MallaGradoResponse;
import pe.edu.eduspace.planificacion.dto.MallaItemResponse;
import pe.edu.eduspace.planificacion.dto.MallaLoteRequest;
import pe.edu.eduspace.planificacion.dto.MallaLoteResponse;
import pe.edu.eduspace.planificacion.dto.MallaRequest;
import java.util.ArrayList;
import pe.edu.eduspace.planificacion.entity.Curso;
import pe.edu.eduspace.planificacion.entity.Grado;
import pe.edu.eduspace.planificacion.entity.GradoCurso;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AsignacionRepository;
import pe.edu.eduspace.planificacion.repository.CursoRepository;
import pe.edu.eduspace.planificacion.repository.GradoCursoRepository;
import pe.edu.eduspace.planificacion.repository.GradoRepository;
import pe.edu.eduspace.planificacion.service.MallaService;

@Service
@RequiredArgsConstructor
@Transactional
public class MallaServiceImpl implements MallaService {

    private final GradoCursoRepository repository;
    private final GradoRepository gradoRepository;
    private final CursoRepository cursoRepository;
    private final AsignacionRepository asignacionRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public MallaGradoResponse porGrado(Long gradoId) {
        Grado grado = gradoRepository.findById(gradoId).orElseThrow(() -> ResourceNotFoundException.of("Grado", gradoId));
        List<MallaItemResponse> cursos = repository.findByGradoIdOrderByCursoNombre(gradoId).stream()
                .map(mapper::toResponse).toList();
        int total = cursos.stream().mapToInt(c -> c.horasSemanales()).sum();
        return new MallaGradoResponse(grado.getId(), grado.getNombre(), total, cursos);
    }

    @Override
    public MallaItemResponse agregar(MallaRequest request) {
        Grado grado = gradoRepository.findById(request.gradoId())
                .orElseThrow(() -> ResourceNotFoundException.of("Grado", request.gradoId()));
        Curso curso = cursoRepository.findById(request.cursoId())
                .orElseThrow(() -> ResourceNotFoundException.of("Curso", request.cursoId()));
        if (repository.existsByGradoIdAndCursoId(grado.getId(), curso.getId())) {
            throw new BusinessRuleException("El curso " + curso.getNombre() + " ya está en la malla de " + grado.getNombre());
        }
        GradoCurso item = new GradoCurso();
        item.setGrado(grado);
        item.setCurso(curso);
        item.setHorasSemanales(request.horasSemanales());
        return mapper.toResponse(repository.save(item));
    }

    @Override
    public MallaLoteResponse agregarLote(MallaLoteRequest request) {
        boolean sobrescribir = Boolean.TRUE.equals(request.sobrescribir());
        int creados = 0;
        int actualizados = 0;
        int omitidos = 0;
        List<String> detalle = new ArrayList<>();
        for (Long gradoId : request.gradoIds().stream().distinct().toList()) {
            Grado grado = gradoRepository.findById(gradoId).orElseThrow(() -> ResourceNotFoundException.of("Grado", gradoId));
            for (MallaLoteRequest.ItemLote it : request.cursos()) {
                Curso curso = cursoRepository.findById(it.cursoId()).orElseThrow(() -> ResourceNotFoundException.of("Curso", it.cursoId()));
                var existente = repository.findByGradoIdAndCursoId(grado.getId(), curso.getId());
                if (existente.isEmpty()) {
                    GradoCurso item = new GradoCurso();
                    item.setGrado(grado);
                    item.setCurso(curso);
                    item.setHorasSemanales(it.horasSemanales());
                    repository.save(item);
                    creados++;
                } else if (sobrescribir && !existente.get().getHorasSemanales().equals(it.horasSemanales())) {
                    existente.get().setHorasSemanales(it.horasSemanales());
                    repository.save(existente.get());
                    actualizados++;
                } else {
                    omitidos++;
                    detalle.add(curso.getNombre() + " ya estaba en " + grado.getNombre());
                }
            }
        }
        return new MallaLoteResponse(creados, actualizados, omitidos, detalle);
    }

    @Override
    public MallaItemResponse actualizarHoras(Long id, Short horasSemanales) {
        GradoCurso item = buscar(id);
        item.setHorasSemanales(horasSemanales);
        return mapper.toResponse(repository.save(item));
    }

    @Override
    public void eliminar(Long id) {
        GradoCurso item = buscar(id);
        if (asignacionRepository.existsByGradoAndCurso(item.getGrado().getId(), item.getCurso().getId())) {
            throw new BusinessRuleException("El curso está asignado a docentes en secciones de este grado: elimine esas asignaciones primero");
        }
        repository.delete(item);
    }

    private GradoCurso buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Elemento de la malla", id));
    }
}
```

---

## 133. `MiPersonalService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/MiPersonalService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `MiPersonal`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;

/**
 * Lo que cada persona del personal puede ver de sí misma: su ficha, su contrato, sus pagos, su asistencia y su cuenta de depósito.
 * La persona sale SIEMPRE de la sesión (claim usuarioId del JWT), nunca de un parámetro: nadie puede pedir los datos de otra persona.
 * Es solo lectura; los cambios los hace la administración.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MiPersonalService {

    private final DocenteRepository personal;
    private final DocenteService docentes;
    private final RrhhService rrhh;
    private final CuentaDepositoService cuentas;
    private final AsistenciaPersonalService asistencia;

    /** El id de la persona vinculada a la cuenta; 404 si la cuenta no está vinculada a nadie del personal. */
    private Long idDe(Long usuarioId) {
        if (usuarioId == null) throw new ResourceNotFoundException("Tu cuenta no está vinculada a una persona del personal");
        return personal.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Tu cuenta no está vinculada a una persona del personal")).getId();
    }

    public DocenteResponse ficha(Long usuarioId) {
        return docentes.obtener(idDe(usuarioId));
    }

    public List<ContratoResponse> contratos(Long usuarioId) {
        return rrhh.contratos(idDe(usuarioId));
    }

    public List<PagoResponse> pagos(Long usuarioId, String periodo) {
        return rrhh.pagos(idDe(usuarioId), periodo);
    }

    public List<CuentaResponse> cuentas(Long usuarioId) {
        return cuentas.listar(idDe(usuarioId));
    }

    public List<Asistencia> asistencia(Long usuarioId, LocalDate desde, LocalDate hasta) {
        return asistencia.consultar(desde, hasta, idDe(usuarioId));
    }
}
```

---

## 134. `NivelService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/NivelService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Nivel`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.NivelResponse;

public interface NivelService {
    List<NivelResponse> listar();

    NivelResponse obtener(Long id);

    NivelResponse actualizar(Long id, CatalogoUpdateRequest request);
}
```

---

## 135. `NivelServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/NivelServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Nivel`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.NivelResponse;
import pe.edu.eduspace.planificacion.entity.Nivel;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.NivelRepository;
import pe.edu.eduspace.planificacion.service.NivelService;

@Service
@RequiredArgsConstructor
@Transactional
public class NivelServiceImpl implements NivelService {

    private final NivelRepository repository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<NivelResponse> listar() {
        return repository.findAllByOrderByOrden().stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public NivelResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public NivelResponse actualizar(Long id, CatalogoUpdateRequest request) {
        Nivel nivel = buscar(id);
        nivel.setNombre(request.nombre());
        if (request.activo() != null) {
            nivel.setActivo(request.activo());
        }
        return mapper.toResponse(repository.save(nivel));
    }

    private Nivel buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Nivel", id));
    }
}
```

---

## 136. `PeriodoService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/PeriodoService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Periodo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.PeriodoRequest;
import pe.edu.eduspace.planificacion.dto.PeriodoResponse;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;

public interface PeriodoService {
    List<PeriodoResponse> listar(Long anioId);

    PeriodoResponse obtener(Long id);

    PeriodoResponse crear(PeriodoRequest request);

    PeriodoResponse actualizar(Long id, PeriodoRequest request);

    PeriodoResponse cambiarEstado(Long id, EstadoPeriodo estado);

    void eliminar(Long id);
}
```

---

## 137. `PeriodoServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/PeriodoServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Periodo`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.PeriodoRequest;
import pe.edu.eduspace.planificacion.dto.PeriodoResponse;
import pe.edu.eduspace.planificacion.entity.AnioAcademico;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;
import pe.edu.eduspace.planificacion.entity.Periodo;
import pe.edu.eduspace.planificacion.event.PeriodoCambiadoEvent;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AnioAcademicoRepository;
import pe.edu.eduspace.planificacion.repository.PeriodoRepository;
import pe.edu.eduspace.planificacion.service.PeriodoService;

@Service
@RequiredArgsConstructor
@Transactional
public class PeriodoServiceImpl implements PeriodoService {

    private final PeriodoRepository repository;
    private final AnioAcademicoRepository anioRepository;
    private final PlanificacionMapper mapper;
    private final ApplicationEventPublisher eventos;

    @Override
    @Transactional(readOnly = true)
    public List<PeriodoResponse> listar(Long anioId) {
        if (anioId == null) {
            return repository.findAll().stream().map(mapper::toResponse).toList();
        }
        return repository.findByAnioIdOrderByNumero(anioId).stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PeriodoResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public PeriodoResponse crear(PeriodoRequest request) {
        AnioAcademico anio = anioEditable(request.anioId());
        validar(request, anio, null);
        Periodo periodo = mapper.toEntity(request);
        periodo.setAnio(anio);
        periodo.setEstado(EstadoPeriodo.PLANIFICADO);
        return mapper.toResponse(repository.save(periodo));
    }

    @Override
    public PeriodoResponse actualizar(Long id, PeriodoRequest request) {
        Periodo periodo = buscar(id);
        if (!periodo.getAnio().getId().equals(request.anioId())) {
            throw new BusinessRuleException("No se puede mover un periodo a otro año académico");
        }
        AnioAcademico anio = anioEditable(request.anioId());
        if (periodo.getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("Un periodo CERRADO es de solo lectura");
        }
        validar(request, anio, id);
        mapper.update(request, periodo);
        return mapper.toResponse(repository.save(periodo));
    }

    @Override
    public PeriodoResponse cambiarEstado(Long id, EstadoPeriodo nuevo) {
        Periodo periodo = buscar(id);
        anioEditable(periodo.getAnio().getId());
        EstadoPeriodo actual = periodo.getEstado();
        if (actual == nuevo) {
            return mapper.toResponse(periodo);
        }
        if (nuevo.ordinal() < actual.ordinal()) {
            throw new BusinessRuleException("El estado de un periodo solo avanza: PLANIFICADO → ACTIVO → CERRADO");
        }
        if (nuevo == EstadoPeriodo.ACTIVO
                && repository.existsByAnioIdAndEstadoAndIdNot(periodo.getAnio().getId(), EstadoPeriodo.ACTIVO, id)) {
            throw new BusinessRuleException("Ya hay otro periodo ACTIVO en este año: ciérrelo primero");
        }
        periodo.setEstado(nuevo);
        repository.save(periodo);
        eventos.publishEvent(PeriodoCambiadoEvent.of(periodo.getId(), periodo.getNumero(), periodo.getNombre(),
                periodo.getEstado().name(), periodo.getAnio().getId()));
        return mapper.toResponse(periodo);
    }

    @Override
    public void eliminar(Long id) {
        Periodo periodo = buscar(id);
        if (periodo.getEstado() != EstadoPeriodo.PLANIFICADO) {
            throw new BusinessRuleException("Solo se elimina un periodo en estado PLANIFICADO");
        }
        repository.delete(periodo);
    }

    private void validar(PeriodoRequest r, AnioAcademico anio, Long excluirId) {
        if (!r.fechaFin().isAfter(r.fechaInicio())) {
            throw new BusinessRuleException("La fecha de fin debe ser posterior a la fecha de inicio");
        }
        if (r.fechaInicio().isBefore(anio.getFechaInicio()) || r.fechaFin().isAfter(anio.getFechaFin())) {
            throw new BusinessRuleException("El periodo debe estar dentro del rango del año académico ("
                    + anio.getFechaInicio() + " a " + anio.getFechaFin() + ")");
        }
        boolean numeroRepetido = excluirId == null
                ? repository.existsByAnioIdAndNumero(r.anioId(), r.numero())
                : repository.existsByAnioIdAndNumeroAndIdNot(r.anioId(), r.numero(), excluirId);
        if (numeroRepetido) {
            throw new BusinessRuleException("Ya existe el periodo número " + r.numero() + " en este año");
        }
        if (repository.haySolapamiento(r.anioId(), r.fechaInicio(), r.fechaFin(), excluirId)) {
            throw new BusinessRuleException("Las fechas se solapan con otro periodo del año");
        }
    }

    private AnioAcademico anioEditable(Long anioId) {
        AnioAcademico anio = anioRepository.findById(anioId)
                .orElseThrow(() -> ResourceNotFoundException.of("Año académico", anioId));
        if (anio.getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año " + anio.getNombre() + " está CERRADO (solo lectura)");
        }
        return anio;
    }

    private Periodo buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Periodo", id));
    }
}
```

---

## 138. `PublicacionHorarioService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/PublicacionHorarioService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `PublicacionHorario`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.PublicacionResponse;

public interface PublicacionHorarioService {
    PublicacionResponse publicar(Long seccionId, Long usuarioId);

    List<PublicacionResponse> historial(Long seccionId);
}
```

---

## 139. `PublicacionHorarioServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/PublicacionHorarioServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `PublicacionHorario`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.PublicacionResponse;
import pe.edu.eduspace.planificacion.dto.ResultadoValidacionHorario;
import pe.edu.eduspace.planificacion.entity.EstadoPeriodo;
import pe.edu.eduspace.planificacion.entity.Horario;
import pe.edu.eduspace.planificacion.entity.PublicacionHorario;
import pe.edu.eduspace.planificacion.entity.Seccion;
import pe.edu.eduspace.planificacion.event.HorarioPublicadoEvent;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.HorarioRepository;
import pe.edu.eduspace.planificacion.repository.PublicacionHorarioRepository;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.service.HorarioService;
import pe.edu.eduspace.planificacion.service.PublicacionHorarioService;

@Service
@RequiredArgsConstructor
@Transactional
public class PublicacionHorarioServiceImpl implements PublicacionHorarioService {

    private final PublicacionHorarioRepository repository;
    private final SeccionRepository seccionRepository;
    private final HorarioRepository horarioRepository;
    private final HorarioService horarioService;
    private final PlanificacionMapper mapper;
    private final ApplicationEventPublisher eventos;

    @Override
    public PublicacionResponse publicar(Long seccionId, Long usuarioId) {
        Seccion seccion = seccionRepository.findById(seccionId)
                .orElseThrow(() -> ResourceNotFoundException.of("Sección", seccionId));
        if (seccion.getAnio().getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año " + seccion.getAnio().getNombre() + " está CERRADO (solo lectura)");
        }
        List<Horario> clases = horarioRepository.findBySeccion(seccionId);
        if (clases.isEmpty()) {
            throw new BusinessRuleException("La sección no tiene clases programadas: no hay nada que publicar");
        }
        ResultadoValidacionHorario validacion = horarioService.validar(seccionId);
        if (!validacion.choques().isEmpty()) {
            throw new BusinessRuleException("El horario tiene choques y no se puede publicar: "
                    + String.join("; ", validacion.choques()));
        }
        int version = repository.findFirstBySeccionIdOrderByVersionDesc(seccionId).map(p -> p.getVersion() + 1).orElse(1);
        PublicacionHorario publicacion = new PublicacionHorario();
        publicacion.setSeccion(seccion);
        publicacion.setVersion(version);
        publicacion.setPublicadoPor(usuarioId);
        publicacion.setPublicadoEn(LocalDateTime.now());
        repository.saveAndFlush(publicacion);

        List<Long> docenteUsuarioIds = clases.stream()
                .map(h -> h.getAsignacion().getDocente().getUsuarioId())
                .filter(u -> u != null).distinct().toList();
        eventos.publishEvent(HorarioPublicadoEvent.of(seccionId,
                seccion.getGrado().getNombre() + " " + seccion.getNombre(), seccion.getAnio().getId(), version,
                docenteUsuarioIds, publicacion.getPublicadoEn()));
        return mapper.toResponse(publicacion);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicacionResponse> historial(Long seccionId) {
        return repository.findBySeccionIdOrderByVersionDesc(seccionId).stream().map(mapper::toResponse).toList();
    }
}
```

---

## 140. `RrhhService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/RrhhService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Rrhh`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PlanillaGenerada;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RenovarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest;
import pe.edu.eduspace.planificacion.entity.ContratoPersonal;
import pe.edu.eduspace.planificacion.entity.Docente;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.entity.PagoPersonal;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.ContratoPersonalRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;
import pe.edu.eduspace.planificacion.repository.PagoPersonalRepository;

/**
 * Contratos y pagos del personal. Cada persona tiene un solo contrato a la vez: si ya tiene uno vigente o por iniciar solo puede renovarse
 * (el nuevo empieza al día siguiente del fin del anterior) o rescindirse. Además, ningún contrato puede cruzarse en fechas con otro no
 * rescindido de la misma persona. Los contratos de personas distintas no se afectan entre sí, aunque tengan el mismo periodo.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RrhhService {

    private final ContratoPersonalRepository contratos;
    private final PagoPersonalRepository pagos;
    private final DocenteRepository personal;
    private final pe.edu.eduspace.planificacion.repository.AsistenciaPersonalRepository asistencias;

    // ---- Contratos ----

    @Transactional(readOnly = true)
    public List<ContratoResponse> contratos(Long personalId) {
        var lista = personalId == null ? contratos.findAllByOrderByFechaInicioDesc() : contratos.findByPersonalIdOrderByFechaInicioDesc(personalId);
        return lista.stream().map(ContratoResponse::de).toList();
    }

    public ContratoResponse crearContrato(ContratoRequest r) {
        Docente persona = persona(r.personalId());
        if (persona.getEstado() != EstadoDocente.ACTIVO) {
            throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le puede hacer un contrato");
        }
        // Cada persona tiene un solo contrato a la vez: si ya tiene uno que rige (o que está por empezar) no se crea otro; se renueva o se rescinde.
        LocalDate hoy = LocalDate.now();
        for (ContratoPersonal otro : contratos.findByPersonalIdOrderByFechaInicioDesc(persona.getId())) {
            String estado = otro.estadoEfectivo(hoy);
            if ("VIGENTE".equals(estado) || "POR_VENCER".equals(estado) || "POR_INICIAR".equals(estado)) {
                throw new BusinessRuleException(persona.nombreCompleto() + " ya tiene un contrato "
                        + ("POR_INICIAR".equals(estado) ? "por iniciar" : "vigente") + " (desde " + otro.getFechaInicio()
                        + (otro.getFechaFin() == null ? ", indefinido" : " hasta " + otro.getFechaFin())
                        + "). Cada persona tiene un solo contrato: para continuar usa «Renovar contrato», o rescíndelo antes de crear otro");
            }
        }
        ContratoPersonal c = new ContratoPersonal();
        c.setPersonal(persona);
        aplicar(c, r);
        return ContratoResponse.de(contratos.save(c));
    }

    /**
     * Renueva un contrato: el nuevo empieza el día siguiente al fin del anterior (sin huecos ni cruces) y el anterior queda como está, terminando
     * en su fecha. Solo se renueva el último contrato de la persona, que no esté rescindido y que tenga fecha de fin. Tipo, cargo y sueldo se
     * heredan del anterior si no se indican.
     */
    public ContratoResponse renovar(Long id, RenovarRequest r) {
        ContratoPersonal anterior = contrato(id);
        Docente persona = anterior.getPersonal();
        if (persona.getEstado() != EstadoDocente.ACTIVO) {
            throw new BusinessRuleException(persona.nombreCompleto() + " está dada de baja: no se le puede renovar el contrato");
        }
        if (ContratoPersonal.RESCINDIDO.equals(anterior.getEstado())) {
            throw new BusinessRuleException("Un contrato rescindido no se renueva: crea un contrato nuevo");
        }
        if (anterior.getFechaFin() == null) {
            throw new BusinessRuleException("Un contrato indefinido no necesita renovación");
        }
        boolean yaRenovado = contratos.findByPersonalIdOrderByFechaInicioDesc(persona.getId()).stream()
                .anyMatch(o -> !o.getId().equals(anterior.getId()) && !ContratoPersonal.RESCINDIDO.equals(o.getEstado())
                        && o.getFechaInicio().isAfter(anterior.getFechaInicio()));
        if (yaRenovado) {
            throw new BusinessRuleException("Este contrato ya fue renovado: renueva el más reciente de " + persona.nombreCompleto());
        }
        ContratoRequest nuevo = new ContratoRequest(persona.getId(), r.tipo() != null ? r.tipo() : anterior.getTipo(),
                r.cargo() != null && !r.cargo().isBlank() ? r.cargo() : anterior.getCargo(),
                anterior.getFechaFin().plusDays(1), r.fechaFin(),
                r.remuneracion() != null ? r.remuneracion() : anterior.getRemuneracion(), r.observaciones());
        ContratoPersonal c = new ContratoPersonal();
        c.setPersonal(persona);
        aplicar(c, nuevo);
        return ContratoResponse.de(contratos.save(c));
    }

    public ContratoResponse actualizarContrato(Long id, ContratoRequest r) {
        ContratoPersonal c = contrato(id);
        if (ContratoPersonal.RESCINDIDO.equals(c.getEstado())) {
            throw new BusinessRuleException("Un contrato rescindido no se puede modificar");
        }
        if (!c.getPersonal().getId().equals(r.personalId())) {
            throw new BusinessRuleException("No se puede cambiar de persona un contrato: crea uno nuevo");
        }
        aplicar(c, r);
        return ContratoResponse.de(contratos.save(c));
    }

    public ContratoResponse rescindir(Long id, RescisionRequest r) {
        ContratoPersonal c = contrato(id);
        if (ContratoPersonal.RESCINDIDO.equals(c.getEstado())) {
            throw new BusinessRuleException("El contrato ya está rescindido");
        }
        // Sin fecha indicada se rescinde hoy; si el contrato aún no empezó (p. ej. una renovación hecha por error), se cancela: queda rescindido el día
        // anterior a su inicio, es decir, sin llegar a regir ni un día (uno rescindido su primer día sí rigió ese día).
        boolean cancelacion = r.fecha() == null && LocalDate.now().isBefore(c.getFechaInicio());
        LocalDate fecha = r.fecha() != null ? r.fecha() : cancelacion ? c.getFechaInicio().minusDays(1) : LocalDate.now();
        if (cancelacion) {
            c.setEstado(ContratoPersonal.RESCINDIDO);
            c.setFechaRescision(fecha);
            c.setMotivoRescision(r.motivo());
            return ContratoResponse.de(contratos.save(c));
        }
        if (fecha.isBefore(c.getFechaInicio())) {
            throw new BusinessRuleException("La rescisión no puede ser anterior al inicio del contrato");
        }
        c.setEstado(ContratoPersonal.RESCINDIDO);
        c.setFechaRescision(fecha);
        c.setMotivoRescision(r.motivo());
        return ContratoResponse.de(contratos.save(c));
    }

    private void aplicar(ContratoPersonal c, ContratoRequest r) {
        boolean indefinido = "INDEFINIDO".equals(r.tipo());
        if (!indefinido && r.fechaFin() == null) {
            throw new BusinessRuleException("Un contrato de tipo " + r.tipo() + " necesita fecha de fin");
        }
        if (r.fechaFin() != null && r.fechaFin().isBefore(r.fechaInicio())) {
            throw new BusinessRuleException("La fecha de fin no puede ser anterior a la de inicio");
        }
        LocalDate fin = indefinido ? null : r.fechaFin();
        for (ContratoPersonal otro : contratos.findByPersonalIdOrderByFechaInicioDesc(c.getPersonal().getId())) {
            if (otro.getId().equals(c.getId()) || ContratoPersonal.RESCINDIDO.equals(otro.getEstado())) continue;
            if (seCruzan(r.fechaInicio(), fin, otro.getFechaInicio(), otro.getFechaFin())) {
                throw new BusinessRuleException("Las fechas se cruzan con otro contrato de " + c.getPersonal().nombreCompleto()
                        + " (desde " + otro.getFechaInicio() + (otro.getFechaFin() == null ? ", indefinido" : " hasta " + otro.getFechaFin())
                        + "). Rescíndelo o ajusta las fechas");
            }
        }
        c.setTipo(r.tipo());
        c.setCargo(r.cargo() != null && !r.cargo().isBlank() ? r.cargo().trim() : c.getPersonal().getCargo());
        c.setFechaInicio(r.fechaInicio());
        c.setFechaFin(fin);
        c.setRemuneracion(r.remuneracion());
        c.setObservaciones(r.observaciones());
    }

    /** Dos rangos de fechas se cruzan; un fin nulo es «sin límite». */
    static boolean seCruzan(LocalDate ini1, LocalDate fin1, LocalDate ini2, LocalDate fin2) {
        boolean empiezaAntesDeQueTermine = fin2 == null || !ini1.isAfter(fin2);
        boolean terminaDespuesDeQueEmpiece = fin1 == null || !fin1.isBefore(ini2);
        return empiezaAntesDeQueTermine && terminaDespuesDeQueEmpiece;
    }

    // ---- Pagos ----

    @Transactional(readOnly = true)
    public List<PagoResponse> pagos(Long personalId, String periodo) {
        List<PagoPersonal> lista;
        if (personalId != null) {
            lista = pagos.findByPersonalIdOrderByPeriodoDescIdDesc(personalId);
            if (periodo != null && !periodo.isBlank()) lista = lista.stream().filter(p -> periodo.equals(p.getPeriodo())).toList();
        } else if (periodo != null && !periodo.isBlank()) {
            lista = pagos.findByPeriodoOrderByIdAsc(periodo);
        } else {
            throw new BusinessRuleException("Indica la persona o el periodo (AAAA-MM)");
        }
        return lista.stream().map(PagoResponse::de).toList();
    }

    public PagoResponse registrarPago(PagoRequest r) {
        Docente persona = persona(r.personalId());
        PagoPersonal p = new PagoPersonal();
        p.setPersonal(persona);
        if (r.contratoId() != null) {
            ContratoPersonal c = contrato(r.contratoId());
            if (!c.getPersonal().getId().equals(persona.getId())) {
                throw new BusinessRuleException("Ese contrato no es de " + persona.nombreCompleto());
            }
            p.setContrato(c);
        }
        p.setPeriodo(r.periodo());
        p.setConcepto(r.concepto());
        p.setDescripcion(r.descripcion());
        p.setMonto(r.monto());
        return PagoResponse.de(pagos.save(p));
    }

    /**
     * Los pagos al personal ya no se marcan como pagados directamente: caja los SOLICITA ({@link #solicitar}) y el administrador los
     * APRUEBA ({@link #aprobar}). Se conserva el endpoint para dar un mensaje claro a quien aún lo use.
     */
    public PagoResponse pagar(Long id, PagarRequest r) {
        throw new BusinessRuleException("Los pagos al personal los registra caja y los aprueba el administrador: apruébalo desde «Por aprobar».");
    }

    /** Caja registra cómo se pagó (medio, fecha, referencia). El pago queda POR_APROBAR hasta que el administrador lo apruebe. */
    public PagoResponse solicitar(Long id, PagarRequest r, Long cajeroUsuarioId) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.PENDIENTE.equals(p.getEstado())) {
            throw new BusinessRuleException(PagoPersonal.PAGADO.equals(p.getEstado())
                    ? "Este pago ya está pagado" : "Este pago ya espera la aprobación del administrador");
        }
        if (r.medio() == null || r.medio().isBlank()) {
            throw new BusinessRuleException("Indica el medio con el que se paga");
        }
        p.setEstado(PagoPersonal.POR_APROBAR);
        p.setFechaPago(r.fechaPago() == null ? LocalDate.now() : r.fechaPago());
        p.setMedio(r.medio());
        p.setReferencia(r.referencia());
        p.setSolicitadoPor(cajeroUsuarioId);
        p.setSolicitadoEn(java.time.LocalDateTime.now());
        p.setMotivoRechazo(null);
        return PagoResponse.de(pagos.save(p));
    }

    /** El administrador aprueba: el pago pasa a PAGADO. */
    public PagoResponse aprobar(Long id, Long adminUsuarioId) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.POR_APROBAR.equals(p.getEstado())) {
            throw new BusinessRuleException("Este pago no está esperando aprobación");
        }
        p.setEstado(PagoPersonal.PAGADO);
        p.setAprobadoPor(adminUsuarioId);
        p.setAprobadoEn(java.time.LocalDateTime.now());
        return PagoResponse.de(pagos.save(p));
    }

    /** El administrador rechaza: vuelve a PENDIENTE y caja ve el motivo para corregirlo o volver a solicitarlo. */
    public PagoResponse rechazar(Long id, String motivo, Long adminUsuarioId) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.POR_APROBAR.equals(p.getEstado())) {
            throw new BusinessRuleException("Este pago no está esperando aprobación");
        }
        p.setEstado(PagoPersonal.PENDIENTE);
        p.setMotivoRechazo(motivo);
        p.setAprobadoPor(adminUsuarioId);
        p.setAprobadoEn(java.time.LocalDateTime.now());
        p.setFechaPago(null);
        p.setMedio(null);
        p.setReferencia(null);
        return PagoResponse.de(pagos.save(p));
    }

    @Transactional(readOnly = true)
    public List<PagoResponse> porAprobar() {
        return pagos.findByEstadoOrderBySolicitadoEnAscIdAsc(PagoPersonal.POR_APROBAR).stream().map(PagoResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public long contarPorAprobar() {
        return pagos.countByEstado(PagoPersonal.POR_APROBAR);
    }

    public void eliminarPago(Long id) {
        PagoPersonal p = pago(id);
        if (!PagoPersonal.PENDIENTE.equals(p.getEstado())) {
            throw new BusinessRuleException("Solo se elimina un pago pendiente: este ya está por aprobar o pagado");
        }
        pagos.delete(p);
    }

    /**
     * Crea el sueldo pendiente del periodo: UNO por persona y por mes (sin duplicar el ya generado). Si en ese mes se cruzan dos contratos de la misma
     * persona (el que termina y su renovación, que empieza al día siguiente), el sueldo es el del contrato que cubre más días del mes; en empate,
     * el más reciente. Así una renovación a mitad de mes no hace que se pague el mes dos veces.
     */
    public PlanillaGenerada generarPlanilla(String periodo) {
        YearMonth mes;
        try {
            mes = YearMonth.parse(periodo);
        } catch (Exception e) {
            throw new BusinessRuleException("El periodo debe tener el formato AAAA-MM");
        }
        LocalDate desde = mes.atDay(1);
        LocalDate hasta = mes.atEndOfMonth();
        // Por persona: el contrato elegido para este mes.
        java.util.Map<Long, ContratoPersonal> elegidos = new java.util.LinkedHashMap<>();
        for (ContratoPersonal c : contratos.findByEstado(ContratoPersonal.VIGENTE)) {
            if (c.getPersonal().getEstado() != EstadoDocente.ACTIVO) continue;
            if (!seCruzan(desde, hasta, c.getFechaInicio(), c.finEfectivo())) continue;
            // Un contrato sin remuneración (ad honorem) no genera sueldo: la base exige monto > 0.
            if (c.getRemuneracion().signum() <= 0) continue;
            elegidos.merge(c.getPersonal().getId(), c, (actual, otro) -> mejorParaElMes(actual, otro, desde, hasta));
        }
        int creados = 0;
        int existian = 0;
        for (ContratoPersonal c : elegidos.values()) {
            if (pagos.existsByPersonalIdAndPeriodoAndConcepto(c.getPersonal().getId(), periodo, PagoPersonal.SUELDO)) {
                existian++;
                continue;
            }
            PagoPersonal p = new PagoPersonal();
            p.setPersonal(c.getPersonal());
            p.setContrato(c);
            p.setPeriodo(periodo);
            p.setConcepto(PagoPersonal.SUELDO);
            p.setDescripcion("Sueldo " + periodo);
            p.setMonto(c.getRemuneracion());
            pagos.save(p);
            creados++;
        }
        return new PlanillaGenerada(periodo, creados, existian);
    }

    /** Entre dos contratos de la misma persona, el que cubre más días del mes; si empatan, el de inicio más reciente. */
    static ContratoPersonal mejorParaElMes(ContratoPersonal a, ContratoPersonal b, LocalDate desde, LocalDate hasta) {
        long da = diasEnElMes(a, desde, hasta);
        long db = diasEnElMes(b, desde, hasta);
        if (da != db) return da > db ? a : b;
        return a.getFechaInicio().isAfter(b.getFechaInicio()) ? a : b;
    }

    /** Días del mes en que rige un contrato (fechas inclusivas). */
    static long diasEnElMes(ContratoPersonal c, LocalDate desde, LocalDate hasta) {
        LocalDate ini = c.getFechaInicio().isAfter(desde) ? c.getFechaInicio() : desde;
        LocalDate fin = c.finEfectivo() == null || c.finEfectivo().isAfter(hasta) ? hasta : c.finEfectivo();
        return fin.isBefore(ini) ? 0 : java.time.temporal.ChronoUnit.DAYS.between(ini, fin) + 1;
    }

    /** ¿Tiene historial de contratos, pagos o asistencia? Entonces la persona se da de baja, no se borra. */
    @Transactional(readOnly = true)
    public boolean tieneHistorial(Long personalId) {
        return contratos.existsByPersonalId(personalId) || pagos.existsByPersonalId(personalId) || asistencias.existsByPersonalId(personalId);
    }

    private Docente persona(Long id) {
        return personal.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Personal", id));
    }

    private ContratoPersonal contrato(Long id) {
        return contratos.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Contrato", id));
    }

    private PagoPersonal pago(Long id) {
        return pagos.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Pago", id));
    }
}
```

---

## 141. `SeccionService.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/SeccionService.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Seccion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service;

import java.util.List;
import pe.edu.eduspace.planificacion.dto.SeccionRequest;
import pe.edu.eduspace.planificacion.dto.SeccionResponse;

public interface SeccionService {
    List<SeccionResponse> listar(Long anioId, Long gradoId);

    SeccionResponse obtener(Long id);

    SeccionResponse crear(SeccionRequest request);

    SeccionResponse actualizar(Long id, SeccionRequest request);

    void eliminar(Long id);
}
```

---

## 142. `SeccionServiceImpl.java` — Servicios y Lógica de Negocio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/service/impl/SeccionServiceImpl.java`

### **¿Qué hace esta clase?**
Servicio transaccional de lógica de negocio para `Seccion`. Implementa validaciones, reglas de negocio, persistencia y coordinación con otros servicios o mensajería Kafka.

```java
package pe.edu.eduspace.planificacion.service.impl;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.eduspace.planificacion.dto.SeccionRequest;
import pe.edu.eduspace.planificacion.dto.SeccionResponse;
import pe.edu.eduspace.planificacion.entity.*;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.*;
import pe.edu.eduspace.planificacion.service.SeccionService;

@Service
@RequiredArgsConstructor
@Transactional
public class SeccionServiceImpl implements SeccionService {

    private final SeccionRepository repository;
    private final AnioAcademicoRepository anioRepository;
    private final GradoRepository gradoRepository;
    private final AulaRepository aulaRepository;
    private final DocenteRepository docenteRepository;
    private final AsignacionRepository asignacionRepository;
    private final HorarioRepository horarioRepository;
    private final PlanificacionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<SeccionResponse> listar(Long anioId, Long gradoId) {
        return repository.buscar(anioId, gradoId).stream().map(mapper::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SeccionResponse obtener(Long id) {
        return mapper.toResponse(buscar(id));
    }

    @Override
    public SeccionResponse crear(SeccionRequest request) {
        Seccion seccion = new Seccion();
        aplicar(seccion, request, null);
        return mapper.toResponse(repository.save(seccion));
    }

    @Override
    public SeccionResponse actualizar(Long id, SeccionRequest request) {
        Seccion seccion = buscar(id);
        aplicar(seccion, request, id);
        return mapper.toResponse(repository.save(seccion));
    }

    @Override
    public void eliminar(Long id) {
        Seccion seccion = buscar(id);
        if (seccion.getAnio().getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año de la sección está CERRADO (solo lectura)");
        }
        if (!asignacionRepository.findBySeccionId(id).isEmpty()) {
            throw new BusinessRuleException("La sección tiene cursos asignados: elimine primero las asignaciones");
        }
        repository.delete(seccion);
    }

    private void aplicar(Seccion seccion, SeccionRequest r, Long id) {
        AnioAcademico anio = anioRepository.findById(r.anioId())
                .orElseThrow(() -> ResourceNotFoundException.of("Año académico", r.anioId()));
        if (anio.getEstado() == EstadoPeriodo.CERRADO) {
            throw new BusinessRuleException("El año " + anio.getNombre() + " está CERRADO (solo lectura)");
        }
        Grado grado = gradoRepository.findById(r.gradoId())
                .orElseThrow(() -> ResourceNotFoundException.of("Grado", r.gradoId()));
        boolean repetida = id == null
                ? repository.existsByAnioIdAndGradoIdAndNombre(r.anioId(), r.gradoId(), r.nombre())
                : repository.existsByAnioIdAndGradoIdAndNombreAndIdNot(r.anioId(), r.gradoId(), r.nombre(), id);
        if (repetida) {
            throw new BusinessRuleException("Ya existe la sección " + r.nombre() + " de " + grado.getNombre()
                    + " en el año " + anio.getNombre());
        }
        Aula aula = null;
        if (r.aulaId() != null) {
            aula = aulaRepository.findById(r.aulaId())
                    .orElseThrow(() -> ResourceNotFoundException.of("Aula", r.aulaId()));
            if (!Boolean.TRUE.equals(aula.getActivo())) {
                throw new BusinessRuleException("El aula " + aula.getCodigo() + " está inactiva");
            }
        }
        short capacidad = r.capacidad() == null ? 30 : r.capacidad();
        if (aula != null && capacidad > aula.getCapacidad()) {
            throw new BusinessRuleException("La capacidad de la sección (" + capacidad
                    + ") supera la del aula " + aula.getCodigo() + " (" + aula.getCapacidad() + ")");
        }
        Docente tutor = null;
        if (r.tutorDocenteId() != null) {
            tutor = docenteRepository.findById(r.tutorDocenteId())
                    .orElseThrow(() -> ResourceNotFoundException.of("Docente", r.tutorDocenteId()));
            if (tutor.getEstado() != EstadoDocente.ACTIVO) {
                throw new BusinessRuleException("El tutor debe ser un docente ACTIVO");
            }
            if (!tutor.esDocente()) {
                throw new BusinessRuleException("El tutor debe pertenecer al área Docencia");
            }
        }
        Turno turno = r.turno() == null ? Turno.MANANA : r.turno();
        if (id != null && seccion.getTurno() != turno && horarioHaySobre(id)) {
            throw new BusinessRuleException(
                    "No se puede cambiar el turno de una sección que ya tiene clases en el horario");
        }
        seccion.setAnio(anio);
        seccion.setGrado(grado);
        seccion.setAula(aula);
        seccion.setNombre(r.nombre());
        seccion.setTurno(turno);
        seccion.setCapacidad(capacidad);
        seccion.setTutor(tutor);
        seccion.setActivo(r.activo() == null || r.activo());
    }

    private boolean horarioHaySobre(Long seccionId) {
        return !horarioRepository.findBySeccion(seccionId).isEmpty();
    }

    private Seccion buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Sección", id));
    }
}
```

---

## 143. `AnioAcademicoController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AnioAcademicoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `AnioAcademico`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AnioRequest;
import pe.edu.eduspace.planificacion.dto.AnioResponse;
import pe.edu.eduspace.planificacion.service.AnioAcademicoService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/anios")
@RequiredArgsConstructor
public class AnioAcademicoController {

    private final AnioAcademicoService service;

    @GetMapping
    public List<AnioResponse> listar() {
        return service.listar();
    }

    @GetMapping("/activo")
    public AnioResponse activo() {
        return service.activo();
    }

    @GetMapping("/{id}")
    public AnioResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<AnioResponse> crear(@Valid @RequestBody AnioRequest request) {
        AnioResponse creado = service.crear(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    public AnioResponse actualizar(@PathVariable Long id, @Valid @RequestBody AnioRequest request) {
        return service.actualizar(id, request);
    }

    @PatchMapping("/{id}/activar")
    public AnioResponse activar(@PathVariable Long id) {
        return service.activar(id);
    }

    @PatchMapping("/{id}/cerrar")
    public AnioResponse cerrar(@PathVariable Long id) {
        return service.cerrar(id);
    }
}
```

---

## 144. `AreaController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AreaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Area`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AreaRequest;
import pe.edu.eduspace.planificacion.dto.AreaResponse;
import pe.edu.eduspace.planificacion.dto.AreaUpdateRequest;
import pe.edu.eduspace.planificacion.entity.Area;
import pe.edu.eduspace.planificacion.entity.EstadoDocente;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.AreaRepository;
import pe.edu.eduspace.planificacion.repository.DocenteRepository;
import pe.edu.eduspace.planificacion.util.Respuestas;

/**
 * Catálogo de áreas de trabajo del colegio. Cualquier usuario con sesión las consulta (por defecto solo las activas);
 * solo el administrador las crea, renombra, activa o desactiva.
 */
@RestController
@RequestMapping("/api/v1/planificacion/areas")
@RequiredArgsConstructor
public class AreaController {

    private final AreaRepository repository;
    private final DocenteRepository personal;
    private final PlanificacionMapper mapper;

    /** Con {@code todas=true} incluye las inactivas (para administrarlas). */
    @GetMapping
    @Transactional(readOnly = true)
    public List<AreaResponse> listar(@RequestParam(defaultValue = "false") boolean todas) {
        List<Area> areas = todas ? repository.findAllByOrderByNombre() : repository.findByActivoTrueOrderByNombre();
        return areas.stream().map(mapper::toResponse).toList();
    }

    @PostMapping
    @Transactional
    public ResponseEntity<AreaResponse> crear(@Valid @RequestBody AreaRequest request) {
        if (repository.existsByCodigo(request.codigo())) {
            throw new BusinessRuleException("Ya existe un área con el código " + request.codigo());
        }
        Area area = mapper.toEntity(request);
        area.setActivo(true);
        AreaResponse creada = mapper.toResponse(repository.save(area));
        return Respuestas.creado(creada.id(), creada);
    }

    @PutMapping("/{id}")
    @Transactional
    public AreaResponse actualizar(@PathVariable Long id, @Valid @RequestBody AreaUpdateRequest request) {
        Area area = buscar(id);
        area.setNombre(request.nombre().trim());
        area.setDescripcion(request.descripcion() == null || request.descripcion().isBlank() ? null : request.descripcion().trim());
        return mapper.toResponse(repository.save(area));
    }

    /** Activa o desactiva un área. Docencia no se desactiva y un área con personal activo tampoco. */
    @PatchMapping("/{id}/activo")
    @Transactional
    public AreaResponse cambiarEstado(@PathVariable Long id, @RequestParam boolean activo) {
        Area area = buscar(id);
        if (!activo) {
            if (Area.DOCENCIA.equals(area.getCodigo())) {
                throw new BusinessRuleException("El área Docencia no se puede desactivar: de ella salen los docentes que dictan cursos");
            }
            long activos = personal.countByAreaIdAndEstado(id, EstadoDocente.ACTIVO);
            if (activos > 0) {
                throw new BusinessRuleException("El área " + area.getNombre() + " tiene " + activos + " persona(s) activa(s): pásalas a otra área o dalas de baja antes de desactivarla");
            }
        }
        area.setActivo(activo);
        return mapper.toResponse(repository.save(area));
    }

    private Area buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Área", id));
    }
}
```

---

## 145. `AsignacionController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AsignacionController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Asignacion`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AsignacionDocenteRequest;
import pe.edu.eduspace.planificacion.dto.AsignacionRequest;
import pe.edu.eduspace.planificacion.dto.AsignacionResponse;
import pe.edu.eduspace.planificacion.service.AsignacionService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/asignaciones")
@RequiredArgsConstructor
public class AsignacionController {

    private final AsignacionService service;

    /** Filtra por sección, por docente o por año (uno de los tres). */
    @GetMapping
    public List<AsignacionResponse> listar(@RequestParam(required = false) Long seccionId,
                                           @RequestParam(required = false) Long docenteId,
                                           @RequestParam(required = false) Long anioId) {
        if (anioId != null) {
            return service.listarPorAnio(anioId);
        }
        if (seccionId != null) {
            return service.listarPorSeccion(seccionId);
        }
        if (docenteId != null) {
            return service.listarPorDocente(docenteId);
        }
        throw new IllegalArgumentException("Indique seccionId, docenteId o anioId");
    }

    @GetMapping("/{id}")
    public AsignacionResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<AsignacionResponse> crear(@Valid @RequestBody AsignacionRequest request) {
        AsignacionResponse creada = service.crear(request);
        return Respuestas.creado(creada.id(), creada);
    }

    @PatchMapping("/{id}/docente")
    public AsignacionResponse cambiarDocente(@PathVariable Long id, @Valid @RequestBody AsignacionDocenteRequest request) {
        return service.cambiarDocente(id, request.docenteId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 146. `AsistenciaPersonalController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AsistenciaPersonalController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `AsistenciaPersonal`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.RegistroDia;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.ResultadoDia;
import pe.edu.eduspace.planificacion.service.AsistenciaPersonalService;

/** Asistencia del personal: lectura y escritura solo para ADMIN y SECRETARIA (ver SecurityConfig). */
@RestController
@RequestMapping("/api/v1/planificacion/asistencia-personal")
@RequiredArgsConstructor
public class AsistenciaPersonalController {

    private final AsistenciaPersonalService service;

    @GetMapping
    public List<Asistencia> consultar(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta,
                                      @RequestParam(required = false) Long personalId) {
        return service.consultar(desde, hasta, personalId);
    }

    @PutMapping("/dia")
    public ResultadoDia registrarDia(@Valid @RequestBody RegistroDia request) {
        return service.registrarDia(request);
    }
}
```

---

## 147. `AulaController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/AulaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Aula`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AulaRequest;
import pe.edu.eduspace.planificacion.dto.AulaResponse;
import pe.edu.eduspace.planificacion.entity.TipoAula;
import pe.edu.eduspace.planificacion.service.AulaService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/aulas")
@RequiredArgsConstructor
public class AulaController {

    private final AulaService service;

    @GetMapping
    public List<AulaResponse> listar(@RequestParam(required = false) TipoAula tipo) {
        return service.listar(tipo);
    }

    @GetMapping("/{id}")
    public AulaResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<AulaResponse> crear(@Valid @RequestBody AulaRequest request) {
        AulaResponse creada = service.crear(request);
        return Respuestas.creado(creada.id(), creada);
    }

    @PutMapping("/{id}")
    public AulaResponse actualizar(@PathVariable Long id, @Valid @RequestBody AulaRequest request) {
        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 148. `BloqueHorarioController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/BloqueHorarioController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `BloqueHorario`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.BloqueRequest;
import pe.edu.eduspace.planificacion.dto.BloqueResponse;
import pe.edu.eduspace.planificacion.entity.Turno;
import pe.edu.eduspace.planificacion.service.BloqueHorarioService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/bloques")
@RequiredArgsConstructor
public class BloqueHorarioController {

    private final BloqueHorarioService service;

    @GetMapping
    public List<BloqueResponse> listar(@RequestParam(required = false) Turno turno) {
        return service.listar(turno);
    }

    @GetMapping("/{id}")
    public BloqueResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<BloqueResponse> crear(@Valid @RequestBody BloqueRequest request) {
        BloqueResponse creado = service.crear(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    public BloqueResponse actualizar(@PathVariable Long id, @Valid @RequestBody BloqueRequest request) {
        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 149. `ColegioController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/ColegioController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Colegio`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.edu.eduspace.planificacion.dto.ColegioRequest;
import pe.edu.eduspace.planificacion.dto.ColegioResponse;
import pe.edu.eduspace.planificacion.entity.Colegio;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.ColegioRepository;

/** Datos de la institución (nombre, código modular, dirección, contacto…). Consulta con sesión; solo el administrador los modifica. */
@RestController
@RequestMapping("/api/v1/planificacion/colegio")
@RequiredArgsConstructor
public class ColegioController {

    private final ColegioRepository repository;
    private final PlanificacionMapper mapper;

    @GetMapping
    @Transactional(readOnly = true)
    public ColegioResponse obtener() {
        return mapper.toResponse(fila());
    }

    @PutMapping
    @Transactional
    public ColegioResponse actualizar(@Valid @RequestBody ColegioRequest request) {
        Colegio colegio = fila();
        mapper.update(request, colegio);
        if (colegio.getGestion() == null || colegio.getGestion().isBlank()) colegio.setGestion("PRIVADA");
        return mapper.toResponse(repository.save(colegio));
    }

    private Colegio fila() {
        return repository.findById(Colegio.ID).orElseThrow(() -> ResourceNotFoundException.of("Colegio", (long) Colegio.ID));
    }
}
```

---

## 150. `CursoController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/CursoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Curso`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.CursoRequest;
import pe.edu.eduspace.planificacion.dto.CursoResponse;
import pe.edu.eduspace.planificacion.service.CursoService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/cursos")
@RequiredArgsConstructor
public class CursoController {

    private final CursoService service;

    @GetMapping
    public List<CursoResponse> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public CursoResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<CursoResponse> crear(@Valid @RequestBody CursoRequest request) {
        CursoResponse creado = service.crear(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    public CursoResponse actualizar(@PathVariable Long id, @Valid @RequestBody CursoRequest request) {
        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 151. `DocenteController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/DocenteController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Docente`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.DocenteRequest;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.InternalDocenteResponse;
import pe.edu.eduspace.planificacion.dto.PageResponse;
import pe.edu.eduspace.planificacion.dto.VincularUsuarioRequest;
import pe.edu.eduspace.planificacion.service.DocenteService;
import pe.edu.eduspace.planificacion.service.InternalConsultaService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/docentes")
@RequiredArgsConstructor
public class DocenteController {

    private final DocenteService service;
    private final InternalConsultaService internal;

    /** El docente de la sesión (por el claim usuarioId del JWT): el token no trae docenteId. 404 si el usuario no está vinculado. */
    @GetMapping("/mi")
    public InternalDocenteResponse mi(@AuthenticationPrincipal Jwt jwt) {
        return internal.docentePorUsuario(jwt.getClaim("usuarioId"));
    }

    /**
     * Sin {@code areaId} ni {@code todas}: solo el área Docencia (lo que esperan los selectores de docente y tutor).
     * Con {@code areaId}: el personal de esa área. Con {@code todas=true}: todo el personal.
     */
    @GetMapping
    public PageResponse<DocenteResponse> buscar(@RequestParam(required = false) String q,
                                                @RequestParam(required = false) Long areaId,
                                                @RequestParam(defaultValue = "false") boolean todas,
                                                @RequestParam(required = false) String estado,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "20") int size) {
        int tamano = Math.min(Math.max(size, 1), 100);
        // estado: ACTIVO o INACTIVO; vacío o TODOS = sin filtro
        var filtro = estado == null || estado.isBlank() || estado.equalsIgnoreCase("TODOS") ? null
                : pe.edu.eduspace.planificacion.entity.EstadoDocente.valueOf(estado.toUpperCase());
        return service.buscar(q, areaId, todas, filtro, PageRequest.of(Math.max(page, 0), tamano, Sort.by("apellidos", "nombres")));
    }

    @GetMapping("/{id}")
    public DocenteResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<DocenteResponse> crear(@Valid @RequestBody DocenteRequest request) {
        DocenteResponse creado = service.crear(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    public DocenteResponse actualizar(@PathVariable Long id, @Valid @RequestBody DocenteRequest request) {
        return service.actualizar(id, request);
    }

    @PatchMapping("/{id}/usuario")
    public DocenteResponse vincularUsuario(@PathVariable Long id, @Valid @RequestBody VincularUsuarioRequest request) {
        return service.vincularUsuario(id, request.usuarioId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 152. `FeriadoController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/FeriadoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Feriado`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.EsHabilResponse;
import pe.edu.eduspace.planificacion.dto.FeriadoRequest;
import pe.edu.eduspace.planificacion.dto.FeriadoResponse;
import pe.edu.eduspace.planificacion.service.FeriadoService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/feriados")
@RequiredArgsConstructor
public class FeriadoController {

    private final FeriadoService service;

    @GetMapping
    public List<FeriadoResponse> listar(@RequestParam(required = false) Long anioId) {
        return service.listar(anioId);
    }

    @GetMapping("/es-habil")
    public EsHabilResponse esHabil(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return service.esHabil(fecha);
    }

    @PostMapping
    public ResponseEntity<FeriadoResponse> crear(@Valid @RequestBody FeriadoRequest request) {
        FeriadoResponse creado = service.crear(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    public FeriadoResponse actualizar(@PathVariable Long id, @Valid @RequestBody FeriadoRequest request) {
        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 153. `HorarioController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/HorarioController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Horario`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.eduspace.planificacion.dto.*;
import pe.edu.eduspace.planificacion.service.HorarioGeneradorService;
import pe.edu.eduspace.planificacion.service.HorarioService;
import pe.edu.eduspace.planificacion.service.PublicacionHorarioService;
import pe.edu.eduspace.planificacion.util.UsuarioActual;

@RestController
@RequestMapping("/api/v1/planificacion/horarios")
@RequiredArgsConstructor
public class HorarioController {

    private final HorarioService service;
    private final PublicacionHorarioService publicacionService;
    private final HorarioGeneradorService generador;

    @GetMapping("/seccion/{seccionId}")
    public HorarioSeccionResponse porSeccion(@PathVariable Long seccionId) {
        return service.porSeccion(seccionId);
    }

    /** Clases de todo el año: base de la vista «Aulas disponibles». */
    @GetMapping("/anio/{anioId}")
    public List<HorarioResponse> porAnio(@PathVariable Long anioId) {
        return service.porAnio(anioId);
    }

    @GetMapping("/docente/{docenteId}")
    public HorarioDocenteResponse porDocente(@PathVariable Long docenteId) {
        return service.porDocente(docenteId);
    }

    /** Qué sección está lista para armar su horario y qué le falta a las demás. */
    @GetMapping("/preparacion")
    public List<PreparacionSeccionResponse> preparacion(@RequestParam Long anioId) {
        return generador.preparacion(anioId);
    }

    /** Arma automáticamente el horario sin cruces de docente, aula ni sección; con {@code simular=true} no guarda nada. */
    @PostMapping("/generar")
    public ResultadoGeneracion generar(@Valid @RequestBody GenerarHorarioRequest request) {
        return generador.generar(request);
    }

    @GetMapping("/validar/{seccionId}")
    public ResultadoValidacionHorario validar(@PathVariable Long seccionId) {
        return service.validar(seccionId);
    }

    @PostMapping
    public ResponseEntity<HorarioResponse> crear(@Valid @RequestBody HorarioRequest request) {
        HorarioResponse creado = service.crear(request);
        URI ubicacion = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(creado.id()).toUri();
        return ResponseEntity.created(ubicacion).body(creado);
    }

    @PutMapping("/{id}")
    public HorarioResponse mover(@PathVariable Long id, @Valid @RequestBody HorarioRequest request) {
        return service.mover(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/publicar/seccion/{seccionId}")
    public ResponseEntity<PublicacionResponse> publicar(@PathVariable Long seccionId) {
        PublicacionResponse publicada = publicacionService.publicar(seccionId, UsuarioActual.id());
        return ResponseEntity.status(201).body(publicada);
    }

    @GetMapping("/publicar/seccion/{seccionId}")
    public List<PublicacionResponse> historial(@PathVariable Long seccionId) {
        return publicacionService.historial(seccionId);
    }
}
```

---

## 154. `InternalController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/InternalController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Internal`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.*;
import pe.edu.eduspace.planificacion.service.AnioAcademicoService;
import pe.edu.eduspace.planificacion.service.CursoService;
import pe.edu.eduspace.planificacion.service.FeriadoService;
import pe.edu.eduspace.planificacion.service.HorarioService;
import pe.edu.eduspace.planificacion.service.InternalConsultaService;

/**
 * Lecturas livianas para otros servicios (adenda A2). El Gateway NO enruta {@code /internal/**}:
 * solo es alcanzable dentro de la red Docker.
 */
@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalController {

    private final InternalConsultaService internal;
    private final AnioAcademicoService anioService;
    private final CursoService cursoService;
    private final FeriadoService feriadoService;
    private final HorarioService horarioService;

    @GetMapping("/docentes/usuario/{usuarioId}")
    public InternalDocenteResponse docentePorUsuario(@PathVariable Long usuarioId) {
        return internal.docentePorUsuario(usuarioId);
    }

    @GetMapping("/docentes/usuario/{usuarioId}/asignaciones")
    public List<AsignacionInternaResponse> asignaciones(@PathVariable Long usuarioId,
                                                        @RequestParam(required = false) Long anioId) {
        return internal.asignacionesDeUsuario(usuarioId, anioId);
    }

    @GetMapping("/asignaciones/validar")
    public boolean validar(@RequestParam Long docenteId, @RequestParam Long seccionId, @RequestParam Long cursoId) {
        return internal.asignacionValida(docenteId, seccionId, cursoId);
    }

    @GetMapping("/secciones/{id}")
    public SeccionInternaResponse seccion(@PathVariable Long id) {
        return internal.seccion(id);
    }

    @GetMapping("/secciones")
    public List<SeccionInternaResponse> secciones(@RequestParam(required = false) Long anioId,
                                                  @RequestParam(required = false) Long gradoId) {
        return internal.secciones(anioId, gradoId);
    }

    /** Horario de una sección (matrícula en línea lo incluye en la constancia que se envía por correo). */
    @GetMapping("/horarios/seccion/{seccionId}")
    public HorarioSeccionResponse horario(@PathVariable Long seccionId) {
        return horarioService.porSeccion(seccionId);
    }

    @GetMapping("/anios/activo")
    public AnioResponse anioActivo() {
        return anioService.activo();
    }

    @GetMapping("/anios/{id}")
    public AnioResponse anio(@PathVariable Long id) {
        return anioService.obtener(id);
    }

    @GetMapping("/periodos")
    public List<PeriodoResponse> periodos(@RequestParam Long anioId) {
        return internal.periodos(anioId);
    }

    @GetMapping("/periodos/{id}")
    public PeriodoResponse periodo(@PathVariable Long id) {
        return internal.periodo(id);
    }

    @GetMapping("/cursos/{id}")
    public CursoResponse curso(@PathVariable Long id) {
        return cursoService.obtener(id);
    }

    @GetMapping("/cursos")
    public List<CursoResponse> cursos(@RequestParam List<Long> ids) {
        return cursoService.porIds(ids);
    }

    @GetMapping("/grados/{id}")
    public GradoResponse grado(@PathVariable Long id) {
        return internal.grado(id);
    }

    @GetMapping("/niveles/{id}")
    public NivelResponse nivel(@PathVariable Long id) {
        return internal.nivel(id);
    }

    @GetMapping("/feriados/es-habil")
    public boolean esHabil(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return feriadoService.esHabil(fecha).habil();
    }
}
```

---

## 155. `MallaController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/MallaController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Malla`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.MallaGradoResponse;
import pe.edu.eduspace.planificacion.dto.MallaLoteRequest;
import pe.edu.eduspace.planificacion.dto.MallaLoteResponse;
import pe.edu.eduspace.planificacion.dto.MallaHorasRequest;
import pe.edu.eduspace.planificacion.dto.MallaItemResponse;
import pe.edu.eduspace.planificacion.dto.MallaRequest;
import pe.edu.eduspace.planificacion.service.MallaService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/malla")
@RequiredArgsConstructor
public class MallaController {

    private final MallaService service;

    @GetMapping("/grado/{gradoId}")
    public MallaGradoResponse porGrado(@PathVariable Long gradoId) {
        return service.porGrado(gradoId);
    }

    @PostMapping
    public ResponseEntity<MallaItemResponse> agregar(@Valid @RequestBody MallaRequest request) {
        MallaItemResponse creado = service.agregar(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PostMapping("/lote")
    public MallaLoteResponse agregarLote(@Valid @RequestBody MallaLoteRequest request) {
        return service.agregarLote(request);
    }

    @PutMapping("/{id}")
    public MallaItemResponse actualizarHoras(@PathVariable Long id, @Valid @RequestBody MallaHorasRequest request) {
        return service.actualizarHoras(id, request.horasSemanales());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 156. `MiPersonalController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/MiPersonalController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `MiPersonal`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AsistenciaPersonalDtos.Asistencia;
import pe.edu.eduspace.planificacion.dto.DocenteResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.service.MiPersonalService;

/**
 * Los datos propios de quien trabaja en el colegio (docente, caja, secretaría…): su contrato, sus pagos, su asistencia y su cuenta de depósito.
 * Solo lectura y siempre de la persona de la sesión; no recibe ningún id (ver SecurityConfig: lectura para cualquier sesión iniciada).
 */
@RestController
@RequestMapping("/api/v1/planificacion/mi-personal")
@RequiredArgsConstructor
public class MiPersonalController {

    private final MiPersonalService service;

    @GetMapping
    public DocenteResponse ficha(@AuthenticationPrincipal Jwt jwt) {
        return service.ficha(jwt.getClaim("usuarioId"));
    }

    @GetMapping("/contratos")
    public List<ContratoResponse> contratos(@AuthenticationPrincipal Jwt jwt) {
        return service.contratos(jwt.getClaim("usuarioId"));
    }

    @GetMapping("/pagos")
    public List<PagoResponse> pagos(@AuthenticationPrincipal Jwt jwt, @RequestParam(required = false) String periodo) {
        return service.pagos(jwt.getClaim("usuarioId"), periodo);
    }

    @GetMapping("/cuentas")
    public List<CuentaResponse> cuentas(@AuthenticationPrincipal Jwt jwt) {
        return service.cuentas(jwt.getClaim("usuarioId"));
    }

    @GetMapping("/asistencia")
    public List<Asistencia> asistencia(@AuthenticationPrincipal Jwt jwt,
                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return service.asistencia(jwt.getClaim("usuarioId"), desde, hasta);
    }
}
```

---

## 157. `NivelGradoController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/NivelGradoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `NivelGrado`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.CatalogoUpdateRequest;
import pe.edu.eduspace.planificacion.dto.GradoOfertaResponse;
import pe.edu.eduspace.planificacion.dto.GradoResponse;
import pe.edu.eduspace.planificacion.dto.NivelResponse;
import pe.edu.eduspace.planificacion.dto.OfertaGradosRequest;
import pe.edu.eduspace.planificacion.service.GradoService;
import pe.edu.eduspace.planificacion.service.NivelService;

@RestController
@RequestMapping("/api/v1/planificacion")
@RequiredArgsConstructor
public class NivelGradoController {

    private final NivelService nivelService;
    private final GradoService gradoService;

    @GetMapping("/niveles")
    public List<NivelResponse> niveles() {
        return nivelService.listar();
    }

    @GetMapping("/niveles/{id}")
    public NivelResponse nivel(@PathVariable Long id) {
        return nivelService.obtener(id);
    }

    @PutMapping("/niveles/{id}")
    public NivelResponse actualizarNivel(@PathVariable Long id, @Valid @RequestBody CatalogoUpdateRequest request) {
        return nivelService.actualizar(id, request);
    }

    @GetMapping("/grados")
    public List<GradoResponse> grados(@RequestParam(required = false) Long nivelId) {
        return gradoService.listar(nivelId);
    }

    /** Los 14 grados posibles (Inicial, Primaria y Secundaria), marcando cuáles ofrece el colegio. */
    @GetMapping("/grados/oferta")
    public List<GradoOfertaResponse> oferta() {
        return gradoService.oferta();
    }

    /** Elige los grados que ofrece el colegio (solo el administrador). */
    @PutMapping("/grados/oferta")
    public List<GradoOfertaResponse> actualizarOferta(@Valid @RequestBody OfertaGradosRequest request) {
        return gradoService.actualizarOferta(request);
    }

    @GetMapping("/grados/{id}")
    public GradoResponse grado(@PathVariable Long id) {
        return gradoService.obtener(id);
    }

    @PutMapping("/grados/{id}")
    public GradoResponse actualizarGrado(@PathVariable Long id, @Valid @RequestBody CatalogoUpdateRequest request) {
        return gradoService.actualizar(id, request);
    }
}
```

---

## 158. `PabellonController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/PabellonController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Pabellon`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.AulaResponse;
import pe.edu.eduspace.planificacion.dto.AulasPabellonRequest;
import pe.edu.eduspace.planificacion.dto.CapacidadesPabellonRequest;
import pe.edu.eduspace.planificacion.dto.GradosPabellonRequest;
import pe.edu.eduspace.planificacion.dto.PabellonRequest;
import pe.edu.eduspace.planificacion.dto.PabellonResponse;
import pe.edu.eduspace.planificacion.entity.Aula;
import pe.edu.eduspace.planificacion.entity.Grado;
import pe.edu.eduspace.planificacion.entity.Pabellon;
import pe.edu.eduspace.planificacion.entity.Seccion;
import pe.edu.eduspace.planificacion.entity.TipoAula;
import pe.edu.eduspace.planificacion.mapper.PlanificacionMapper;
import pe.edu.eduspace.planificacion.repository.SeccionRepository;
import pe.edu.eduspace.planificacion.exception.BusinessRuleException;
import pe.edu.eduspace.planificacion.exception.ResourceNotFoundException;
import pe.edu.eduspace.planificacion.repository.AulaRepository;
import pe.edu.eduspace.planificacion.repository.GradoRepository;
import pe.edu.eduspace.planificacion.repository.PabellonRepository;
import pe.edu.eduspace.planificacion.util.CodigosAula;
import pe.edu.eduspace.planificacion.util.Respuestas;

/**
 * Pabellones del colegio: el nombre lo decide el usuario (A, B, «Central»…) y declara cuántas aulas tiene.
 * Se consultan con sesión; solo el administrador los crea, cambia o elimina.
 */
@RestController
@RequestMapping("/api/v1/planificacion/pabellones")
@RequiredArgsConstructor
public class PabellonController {

    private static final short DEFECTO_CAPACIDAD = 30;

    private final PabellonRepository repository;
    private final AulaRepository aulas;
    private final SeccionRepository secciones;
    private final GradoRepository grados;
    private final PlanificacionMapper mapper;

    @GetMapping
    @Transactional(readOnly = true)
    public List<PabellonResponse> listar() {
        return repository.findAllByOrderByNombre().stream().map(this::respuesta).toList();
    }

    @PostMapping
    @Transactional
    public ResponseEntity<PabellonResponse> crear(@Valid @RequestBody PabellonRequest request) {
        String nombre = request.nombre().trim();
        if (repository.existsByNombreIgnoreCase(nombre)) {
            throw new BusinessRuleException("Ya existe un pabellón llamado «" + nombre + "»");
        }
        Pabellon p = new Pabellon();
        p.setNombre(nombre);
        p.setCantidadAulas(request.cantidadAulas());
        PabellonResponse creado = respuesta(repository.save(p));
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    @Transactional
    public PabellonResponse actualizar(@PathVariable Long id, @Valid @RequestBody PabellonRequest request) {
        Pabellon p = buscar(id);
        String nombre = request.nombre().trim();
        if (repository.existsByNombreIgnoreCaseAndIdNot(nombre, id)) {
            throw new BusinessRuleException("Ya existe un pabellón llamado «" + nombre + "»");
        }
        long registradas = aulas.countByPabellonId(id);
        if (request.cantidadAulas() < registradas) {
            throw new BusinessRuleException("El pabellón " + p.getNombre() + " ya tiene " + registradas
                    + " aulas registradas: no puede declarar menos. Mueve o elimina aulas primero.");
        }
        p.setNombre(nombre);
        p.setCantidadAulas(request.cantidadAulas());
        return respuesta(repository.save(p));
    }

    /**
     * Crea las aulas que le faltan al pabellón para llegar a las que declara (códigos «A-01», «A-02»…). Si ya están todas, no hace nada.
     * Cada aula nace activa, de tipo AULA y con la capacidad indicada (30 por defecto).
     */
    @PostMapping("/{id}/aulas")
    @Transactional
    public PabellonResponse crearAulas(@PathVariable Long id, @Valid @RequestBody(required = false) AulasPabellonRequest request) {
        Pabellon p = buscar(id);
        long faltan = p.getCantidadAulas() - aulas.countByPabellonId(id);
        if (faltan > 0) {
            short capacidad = request == null || request.capacidad() == null ? DEFECTO_CAPACIDAD : request.capacidad();
            for (String codigo : CodigosAula.siguientes(p.getNombre(), (int) faltan, aulas::existsByCodigo)) {
                Aula aula = new Aula();
                aula.setCodigo(codigo);
                aula.setNombre("Aula " + codigo);
                aula.setTipo(TipoAula.AULA);
                aula.setCapacidad(capacidad);
                aula.setActivo(true);
                aula.setPabellon(p);
                aulas.save(aula);
            }
        }
        return respuesta(p);
    }

    /**
     * Fija cuántos alumnos caben en cada aula del pabellón, todo o nada. Rechaza una capacidad menor que las vacantes de una sección
     * que ya usa esa aula (hay que bajar primero las vacantes de la sección) y las aulas que no son del pabellón.
     */
    @PutMapping("/{id}/capacidades")
    @Transactional
    public List<AulaResponse> fijarCapacidades(@PathVariable Long id, @Valid @RequestBody CapacidadesPabellonRequest request) {
        Pabellon p = buscar(id);
        Map<Long, Aula> delPabellon = aulas.findByPabellonIdOrderByCodigo(id).stream().collect(Collectors.toMap(Aula::getId, a -> a));
        List<String> problemas = new ArrayList<>();
        for (CapacidadesPabellonRequest.Item item : request.aulas()) {
            Aula aula = delPabellon.get(item.aulaId());
            if (aula == null) {
                throw new BusinessRuleException("El aula " + item.aulaId() + " no pertenece al pabellón " + p.getNombre());
            }
            for (Seccion s : secciones.findByAulaIdAndActivoTrue(aula.getId())) {
                if (s.getCapacidad() > item.capacidad()) {
                    problemas.add(aula.getCodigo() + " la usa " + s.getGrado().getNombre() + " «" + s.getNombre() + "» con " + s.getCapacidad() + " vacantes");
                }
            }
        }
        if (!problemas.isEmpty()) {
            throw new BusinessRuleException("No se pudo cambiar: " + String.join("; ", problemas) + ". Baja primero las vacantes de esa sección.");
        }
        for (CapacidadesPabellonRequest.Item item : request.aulas()) {
            delPabellon.get(item.aulaId()).setCapacidad(item.capacidad());
        }
        aulas.saveAll(delPabellon.values());
        return aulas.findByPabellonIdOrderByCodigo(id).stream().map(mapper::toResponse).toList();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Pabellon p = buscar(id);
        long registradas = aulas.countByPabellonId(id);
        if (registradas > 0) {
            throw new BusinessRuleException("El pabellón " + p.getNombre() + " tiene " + registradas + " aulas registradas: muévelas a otro pabellón antes de eliminarlo");
        }
        repository.delete(p);
        return ResponseEntity.noContent().build();
    }

    /**
     * Fija los grados que usan el pabellón (reemplaza la lista anterior). Cada grado debe existir; un grado puede usar varios pabellones.
     */
    @PutMapping("/{id}/grados")
    @Transactional
    public PabellonResponse fijarGrados(@PathVariable Long id, @Valid @RequestBody GradosPabellonRequest request) {
        Pabellon p = buscar(id);
        Set<Long> pedidos = new LinkedHashSet<>(request.gradoIds());
        List<Long> existentes = grados.findAllById(pedidos).stream().map(Grado::getId).toList();
        List<Long> faltan = pedidos.stream().filter(g -> !existentes.contains(g)).toList();
        if (!faltan.isEmpty()) {
            throw new BusinessRuleException("No existen los grados " + faltan);
        }
        p.getGradoIds().clear();
        p.getGradoIds().addAll(pedidos);
        return respuesta(repository.save(p));
    }

    private PabellonResponse respuesta(Pabellon p) {
        return new PabellonResponse(p.getId(), p.getNombre(), p.getCantidadAulas(), aulas.countByPabellonId(p.getId()), aulas.sumaCapacidad(p.getId()),
                p.getGradoIds().stream().sorted().toList());
    }

    private Pabellon buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Pabellón", id));
    }
}
```

---

## 159. `PagoPersonalController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/PagoPersonalController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `PagoPersonal`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RechazoRequest;
import pe.edu.eduspace.planificacion.service.CuentaDepositoService;
import pe.edu.eduspace.planificacion.service.RrhhService;

/**
 * Pago al personal con aprobación. Caja ve la planilla del mes y SOLICITA cada pago (medio, fecha, referencia); el administrador lo APRUEBA
 * o lo RECHAZA con un motivo. Es un controlador aparte de {@code rrhh} (contratos, sueldos, cuentas: solo administrador) para que caja
 * llegue únicamente a lo que necesita. Ver SecurityConfig.
 */
@RestController
@RequestMapping("/api/v1/planificacion/pago-personal")
@RequiredArgsConstructor
public class PagoPersonalController {

    private final RrhhService service;
    private final CuentaDepositoService cuentas;

    /** Los pagos de un mes (pendientes, por aprobar y pagados): es lo que caja ve para pagar. */
    @GetMapping("/planilla")
    public List<PagoResponse> planilla(@RequestParam String periodo) {
        return service.pagos(null, periodo);
    }

    /** Dónde se le deposita a una persona (para que caja sepa a qué cuenta pagar). */
    @GetMapping("/cuentas")
    public List<CuentaResponse> cuentas(@RequestParam Long personalId) {
        return cuentas.listar(personalId);
    }

    @GetMapping("/por-aprobar")
    public List<PagoResponse> porAprobar() {
        return service.porAprobar();
    }

    @GetMapping("/por-aprobar/conteo")
    public Map<String, Long> conteo() {
        return Map.of("pendientes", service.contarPorAprobar());
    }

    @PostMapping("/pagos/{id}/solicitar")
    public PagoResponse solicitar(@PathVariable Long id, @Valid @RequestBody PagarRequest request, @AuthenticationPrincipal Jwt jwt) {
        return service.solicitar(id, request, usuarioId(jwt));
    }

    @PostMapping("/pagos/{id}/aprobar")
    public PagoResponse aprobar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return service.aprobar(id, usuarioId(jwt));
    }

    @PostMapping("/pagos/{id}/rechazar")
    public PagoResponse rechazar(@PathVariable Long id, @Valid @RequestBody RechazoRequest request, @AuthenticationPrincipal Jwt jwt) {
        return service.rechazar(id, request.motivo(), usuarioId(jwt));
    }

    private static Long usuarioId(Jwt jwt) {
        Object v = jwt.getClaim("usuarioId");
        if (v instanceof Number n) return n.longValue();
        return v == null ? null : Long.valueOf(v.toString());
    }
}
```

---

## 160. `PeriodoController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/PeriodoController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Periodo`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.CambioEstadoRequest;
import pe.edu.eduspace.planificacion.dto.PeriodoRequest;
import pe.edu.eduspace.planificacion.dto.PeriodoResponse;
import pe.edu.eduspace.planificacion.service.PeriodoService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/periodos")
@RequiredArgsConstructor
public class PeriodoController {

    private final PeriodoService service;

    @GetMapping
    public List<PeriodoResponse> listar(@RequestParam(required = false) Long anioId) {
        return service.listar(anioId);
    }

    @GetMapping("/{id}")
    public PeriodoResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<PeriodoResponse> crear(@Valid @RequestBody PeriodoRequest request) {
        PeriodoResponse creado = service.crear(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/{id}")
    public PeriodoResponse actualizar(@PathVariable Long id, @Valid @RequestBody PeriodoRequest request) {
        return service.actualizar(id, request);
    }

    @PatchMapping("/{id}/estado")
    public PeriodoResponse cambiarEstado(@PathVariable Long id, @Valid @RequestBody CambioEstadoRequest request) {
        return service.cambiarEstado(id, request.estado());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 161. `RrhhController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/RrhhController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Rrhh`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.ContratoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagarRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PagoResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.PlanillaGenerada;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RescisionRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaRequest;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.CuentaResponse;
import pe.edu.eduspace.planificacion.dto.RrhhDtos.RenovarRequest;
import pe.edu.eduspace.planificacion.service.CuentaDepositoService;
import pe.edu.eduspace.planificacion.service.RrhhService;
import pe.edu.eduspace.planificacion.util.Respuestas;

/** Contratos y pagos del personal. Información sensible: todo (también la lectura) es solo para ADMIN (ver SecurityConfig). */
@RestController
@RequestMapping("/api/v1/planificacion/rrhh")
@RequiredArgsConstructor
public class RrhhController {

    private final RrhhService service;
    private final CuentaDepositoService cuentasService;

    @GetMapping("/contratos")
    public List<ContratoResponse> contratos(@RequestParam(required = false) Long personalId) {
        return service.contratos(personalId);
    }

    @PostMapping("/contratos")
    public ResponseEntity<ContratoResponse> crearContrato(@Valid @RequestBody ContratoRequest request) {
        ContratoResponse creado = service.crearContrato(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PutMapping("/contratos/{id}")
    public ContratoResponse actualizarContrato(@PathVariable Long id, @Valid @RequestBody ContratoRequest request) {
        return service.actualizarContrato(id, request);
    }

    @PostMapping("/contratos/{id}/renovar")
    public ResponseEntity<ContratoResponse> renovar(@PathVariable Long id, @Valid @RequestBody RenovarRequest request) {
        ContratoResponse creado = service.renovar(id, request);
        return ResponseEntity.status(201).body(creado);
    }

    @GetMapping("/cuentas")
    public List<CuentaResponse> cuentas(@RequestParam(required = false) Long personalId) {
        return cuentasService.listar(personalId);
    }

    @PostMapping("/cuentas")
    public ResponseEntity<CuentaResponse> agregarCuenta(@Valid @RequestBody CuentaRequest request) {
        CuentaResponse creada = cuentasService.agregar(request);
        return Respuestas.creado(creada.id(), creada);
    }

    @PutMapping("/cuentas/{id}")
    public CuentaResponse actualizarCuenta(@PathVariable Long id, @Valid @RequestBody CuentaRequest request) {
        return cuentasService.actualizar(id, request);
    }

    @PostMapping("/cuentas/{id}/principal")
    public CuentaResponse hacerPrincipal(@PathVariable Long id) {
        return cuentasService.hacerPrincipal(id);
    }

    @DeleteMapping("/cuentas/{id}")
    public ResponseEntity<Void> quitarCuenta(@PathVariable Long id) {
        cuentasService.quitar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/contratos/{id}/rescindir")
    public ContratoResponse rescindir(@PathVariable Long id, @Valid @RequestBody RescisionRequest request) {
        return service.rescindir(id, request);
    }

    @GetMapping("/pagos")
    public List<PagoResponse> pagos(@RequestParam(required = false) Long personalId, @RequestParam(required = false) String periodo) {
        return service.pagos(personalId, periodo);
    }

    @PostMapping("/pagos")
    public ResponseEntity<PagoResponse> registrarPago(@Valid @RequestBody PagoRequest request) {
        PagoResponse creado = service.registrarPago(request);
        return Respuestas.creado(creado.id(), creado);
    }

    @PostMapping("/pagos/{id}/pagar")
    public PagoResponse pagar(@PathVariable Long id, @Valid @RequestBody PagarRequest request) {
        return service.pagar(id, request);
    }

    @DeleteMapping("/pagos/{id}")
    public ResponseEntity<Void> eliminarPago(@PathVariable Long id) {
        service.eliminarPago(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/planilla/{periodo}")
    public PlanillaGenerada generarPlanilla(@PathVariable String periodo) {
        return service.generarPlanilla(periodo);
    }
}
```

---

## 162. `SeccionController.java` — Controladores REST API

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/controller/SeccionController.java`

### **¿Qué hace esta clase?**
Controlador REST (`@RestController`) que expone los endpoints HTTP para `Seccion`. Recibe peticiones del API Gateway, delega al servicio correspondiente y retorna respuestas JSON.

```java
package pe.edu.eduspace.planificacion.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.eduspace.planificacion.dto.SeccionRequest;
import pe.edu.eduspace.planificacion.dto.SeccionResponse;
import pe.edu.eduspace.planificacion.service.SeccionService;
import pe.edu.eduspace.planificacion.util.Respuestas;

@RestController
@RequestMapping("/api/v1/planificacion/secciones")
@RequiredArgsConstructor
public class SeccionController {

    private final SeccionService service;

    @GetMapping
    public List<SeccionResponse> listar(@RequestParam(required = false) Long anioId,
                                        @RequestParam(required = false) Long gradoId) {
        return service.listar(anioId, gradoId);
    }

    @GetMapping("/{id}")
    public SeccionResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<SeccionResponse> crear(@Valid @RequestBody SeccionRequest request) {
        SeccionResponse creada = service.crear(request);
        return Respuestas.creado(creada.id(), creada);
    }

    @PutMapping("/{id}")
    public SeccionResponse actualizar(@PathVariable Long id, @Valid @RequestBody SeccionRequest request) {
        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 163. `OutboxConfig.java` — Mensajería Kafka

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/messaging/outbox/OutboxConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.planificacion.messaging.outbox;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class OutboxConfig {
}
```

---

## 164. `OutboxRecorder.java` — Mensajería Kafka

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/messaging/outbox/OutboxRecorder.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.messaging.outbox;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import pe.edu.eduspace.planificacion.config.KafkaTopicsProperties;
import pe.edu.eduspace.planificacion.event.DomainEvent;
import tools.jackson.databind.ObjectMapper;

/**
 * Guarda cada evento de dominio en {@code outbox_eventos} dentro de la MISMA transacción del negocio
 * (BEFORE_COMMIT): o se confirman los dos o ninguno. Tras el commit despierta al relay para baja latencia.
 */
@Component
public class OutboxRecorder {

    private final JdbcClient jdbc;
    private final KafkaTopicsProperties topics;
    private final ObjectMapper objectMapper;

    public OutboxRecorder(JdbcClient jdbc, KafkaTopicsProperties topics, ObjectMapper objectMapper) {
        this.jdbc = jdbc;
        this.topics = topics;
        this.objectMapper = objectMapper;
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT, fallbackExecution = true)
    public void registrar(DomainEvent event) {
        jdbc.sql("INSERT INTO outbox_eventos (topico, clave, payload) VALUES (:topico, :clave, :payload)")
                .param("topico", topics.topicFor(event.eventType()))
                .param("clave", event.key())
                .param("payload", objectMapper.writeValueAsString(event))
                .update();
    }
}
```

---

## 165. `OutboxRelay.java` — Mensajería Kafka

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/messaging/outbox/OutboxRelay.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.messaging.outbox;

import java.util.List;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import pe.edu.eduspace.planificacion.event.DomainEvent;

/**
 * Publica a Kafka los eventos pendientes del outbox. Varias instancias pueden correr a la vez:
 * {@code FOR UPDATE SKIP LOCKED} reparte las filas sin duplicar. Ante un fallo corta el lote para
 * conservar el orden por clave y reintenta en el siguiente ciclo.
 */
@Component
public class OutboxRelay {

    private static final Logger log = LoggerFactory.getLogger(OutboxRelay.class);

    private record Fila(long id, String topico, String clave, String payload) {}

    private final JdbcClient jdbc;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final int lote;
    private final long timeoutEnvioMs;
    private final TransactionTemplate tx;

    public OutboxRelay(JdbcClient jdbc, KafkaTemplate<String, String> kafkaTemplate, PlatformTransactionManager txManager,
                       @Value("${app.outbox.lote:100}") int lote,
                       @Value("${app.outbox.timeout-envio-ms:5000}") long timeoutEnvioMs) {
        this.jdbc = jdbc;
        this.kafkaTemplate = kafkaTemplate;
        this.lote = lote;
        this.timeoutEnvioMs = timeoutEnvioMs;
        this.tx = new TransactionTemplate(txManager);
        this.tx.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    }

    /** Disparo inmediato tras confirmar la transacción de negocio (el scheduler cubre lo que falle). */
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, fallbackExecution = true)
    public void alConfirmar(DomainEvent ignorado) {
        publicarPendientes();
    }

    @Scheduled(fixedDelayString = "${app.outbox.intervalo:PT2S}", initialDelayString = "${app.outbox.espera-inicial:PT5S}")
    public void programado() {
        publicarPendientes();
    }

    @Scheduled(cron = "${app.outbox.limpieza-cron:0 15 3 * * *}")
    @Transactional
    public void limpiarEnviados() {
        int n = jdbc.sql("DELETE FROM outbox_eventos WHERE enviado_en IS NOT NULL AND enviado_en < now() - interval '7 days'").update();
        if (n > 0) log.info("component=OutboxRelay status=LIMPIEZA eliminados={}", n);
    }

    public void publicarPendientes() {
        try {
            tx.executeWithoutResult(status -> lotePendiente());
        } catch (RuntimeException ex) {
            log.warn("component=OutboxRelay status=ERROR cause={}", ex.getMessage());
        }
    }

    private void lotePendiente() {
        List<Fila> filas = jdbc.sql("""
                SELECT id, topico, clave, payload FROM outbox_eventos
                WHERE enviado_en IS NULL ORDER BY id LIMIT :lote FOR UPDATE SKIP LOCKED""")
                .param("lote", lote)
                .query((rs, n) -> new Fila(rs.getLong("id"), rs.getString("topico"), rs.getString("clave"), rs.getString("payload")))
                .list();
        for (Fila f : filas) {
            try {
                kafkaTemplate.send(f.topico(), f.clave(), f.payload()).get(timeoutEnvioMs, TimeUnit.MILLISECONDS);
                jdbc.sql("UPDATE outbox_eventos SET enviado_en = now(), ultimo_error = NULL WHERE id = :id")
                        .param("id", f.id()).update();
                log.info("component=OutboxRelay topic={} key={} outboxId={} status=ENVIADO", f.topico(), f.clave(), f.id());
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
                return;
            } catch (Exception ex) {
                String causa = String.valueOf(ex.getMessage());
                jdbc.sql("UPDATE outbox_eventos SET intentos = intentos + 1, ultimo_error = :e WHERE id = :id")
                        .param("e", causa.substring(0, Math.min(causa.length(), 500))).param("id", f.id()).update();
                log.error("component=OutboxRelay topic={} key={} outboxId={} status=ERROR cause={}", f.topico(), f.clave(), f.id(), causa);
                return;
            }
        }
    }
}
```

---

## 166. `AnioActivadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/AnioActivadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.planificacion.event;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;
import org.slf4j.MDC;

public record AnioActivadoEvent(UUID eventId, String eventType, Instant occurredAt, int version, String traceId,
                                Long anioId, String nombre, LocalDate fechaInicio, LocalDate fechaFin)
        implements DomainEvent {

    public static final String TYPE = "anio.activado";

    public static AnioActivadoEvent of(Long anioId, String nombre, LocalDate fechaInicio, LocalDate fechaFin) {
        return new AnioActivadoEvent(UUID.randomUUID(), TYPE, Instant.now(), 1, MDC.get("traceId"),
                anioId, nombre, fechaInicio, fechaFin);
    }

    @Override
    public String key() {
        return String.valueOf(anioId);
    }
}
```

---

## 167. `DomainEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/DomainEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.planificacion.event;

/** Evento de dominio publicado a Kafka. El tipo coincide con el nombre del tópico (sobre estándar, adenda A1). */
public interface DomainEvent {
    String eventType();

    /** Clave del mensaje = id de la entidad principal (garantiza orden por entidad). */
    String key();
}
```

---

## 168. `HorarioPublicadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/HorarioPublicadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.planificacion.event;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.slf4j.MDC;

/**
 * Contrato {@code horario.publicado}. La versión del horario viaja en {@code versionHorario} porque
 * {@code version} del sobre estándar es la versión del contrato.
 */
public record HorarioPublicadoEvent(UUID eventId, String eventType, Instant occurredAt, int version, String traceId,
                                    Long seccionId, String seccionNombre, Long anioId, Integer versionHorario,
                                    List<Long> docenteUsuarioIds, LocalDateTime fecha) implements DomainEvent {

    public static final String TYPE = "horario.publicado";

    public static HorarioPublicadoEvent of(Long seccionId, String seccionNombre, Long anioId, Integer versionHorario,
                                           List<Long> docenteUsuarioIds, LocalDateTime fecha) {
        return new HorarioPublicadoEvent(UUID.randomUUID(), TYPE, Instant.now(), 1, MDC.get("traceId"),
                seccionId, seccionNombre, anioId, versionHorario, docenteUsuarioIds, fecha);
    }

    @Override
    public String key() {
        return String.valueOf(seccionId);
    }
}
```

---

## 169. `PeriodoCambiadoEvent.java` — Eventos de Dominio

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/event/PeriodoCambiadoEvent.java`

### **¿Qué hace esta clase?**
Clase de evento de dominio. Modela la estructura de datos del mensaje publicado o recibido a través de Apache Kafka para comunicación entre microservicios.

```java
package pe.edu.eduspace.planificacion.event;

import java.time.Instant;
import java.util.UUID;
import org.slf4j.MDC;

public record PeriodoCambiadoEvent(UUID eventId, String eventType, Instant occurredAt, int version, String traceId,
                                   Long periodoId, Short numero, String nombre, String estado, Long anioId)
        implements DomainEvent {

    public static final String TYPE = "periodo.cambiado";

    public static PeriodoCambiadoEvent of(Long periodoId, Short numero, String nombre, String estado, Long anioId) {
        return new PeriodoCambiadoEvent(UUID.randomUUID(), TYPE, Instant.now(), 1, MDC.get("traceId"),
                periodoId, numero, nombre, estado, anioId);
    }

    @Override
    public String key() {
        return String.valueOf(periodoId);
    }
}
```

---

## 170. `KafkaProducerConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/KafkaProducerConfig.java`

### **¿Qué hace esta clase?**
Productor/publicador de eventos Apache Kafka. Envía eventos de dominio hacia topics específicos para que otros microservicios los procesen de forma asíncrona.

```java
package pe.edu.eduspace.planificacion.config;

import java.util.Map;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.boot.kafka.autoconfigure.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

/**
 * Productor con clave String y valor JSON ya serializado como texto: el mensaje no lleva cabeceras de
 * tipo, así cada consumidor lo deserializa a su propia copia del contrato.
 */
@Configuration
public class KafkaProducerConfig {

    @Bean
    ProducerFactory<String, String> eventProducerFactory(KafkaProperties kafkaProperties) {
        Map<String, Object> props = kafkaProperties.buildProducerProperties();
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        return new DefaultKafkaProducerFactory<>(props);
    }

    @Bean
    KafkaTemplate<String, String> eventKafkaTemplate(ProducerFactory<String, String> eventProducerFactory) {
        return new KafkaTemplate<>(eventProducerFactory);
    }
}
```

---

## 171. `KafkaTopicsConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/KafkaTopicsConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.planificacion.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

/** Declara los 3 tópicos que produce este servicio (3 particiones, 1 réplica). */
@Configuration
@EnableConfigurationProperties(KafkaTopicsProperties.class)
public class KafkaTopicsConfig {

    @Bean
    NewTopic horarioPublicadoTopic(KafkaTopicsProperties props) {
        return TopicBuilder.name(props.horarioPublicado()).partitions(3).replicas(1).build();
    }

    @Bean
    NewTopic anioActivadoTopic(KafkaTopicsProperties props) {
        return TopicBuilder.name(props.anioActivado()).partitions(3).replicas(1).build();
    }

    @Bean
    NewTopic periodoCambiadoTopic(KafkaTopicsProperties props) {
        return TopicBuilder.name(props.periodoCambiado()).partitions(3).replicas(1).build();
    }
}
```

---

## 172. `KafkaTopicsProperties.java` — Configuración Spring Boot

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/KafkaTopicsProperties.java`

### **¿Qué hace esta clase?**
Clase de propiedades de configuración (`@ConfigurationProperties`). Lee valores del archivo `application.yml` y los expone como un bean tipado.

```java
package pe.edu.eduspace.planificacion.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import pe.edu.eduspace.planificacion.event.AnioActivadoEvent;
import pe.edu.eduspace.planificacion.event.HorarioPublicadoEvent;
import pe.edu.eduspace.planificacion.event.PeriodoCambiadoEvent;

/** Nombres de tópicos desde {@code app.kafka.topic.*}. */
@ConfigurationProperties(prefix = "app.kafka.topic")
public record KafkaTopicsProperties(String horarioPublicado, String anioActivado, String periodoCambiado) {

    public KafkaTopicsProperties {
        horarioPublicado = horarioPublicado == null ? HorarioPublicadoEvent.TYPE : horarioPublicado;
        anioActivado = anioActivado == null ? AnioActivadoEvent.TYPE : anioActivado;
        periodoCambiado = periodoCambiado == null ? PeriodoCambiadoEvent.TYPE : periodoCambiado;
    }

    public String topicFor(String eventType) {
        return switch (eventType) {
            case HorarioPublicadoEvent.TYPE -> horarioPublicado;
            case AnioActivadoEvent.TYPE -> anioActivado;
            case PeriodoCambiadoEvent.TYPE -> periodoCambiado;
            default -> eventType;
        };
    }
}
```

---

## 173. `OpenApiConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/OpenApiConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.planificacion.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI planificacionOpenApi() {
        return new OpenAPI()
                .info(new Info().title("EduSpace · planificacion-ms").version("v1")
                        .description("Estructura del colegio: año, periodos, grados, secciones, cursos, docentes y horario"))
                .components(new Components().addSecuritySchemes("bearer",
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearer"));
    }
}
```

---

## 174. `SecurityConfig.java` — Configuración Spring Boot

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/config/SecurityConfig.java`

### **¿Qué hace esta clase?**
Clase de configuración de Spring Boot (`@Configuration`). Define beans, propiedades, y parámetros de infraestructura necesarios para el funcionamiento del microservicio.

```java
package pe.edu.eduspace.planificacion.config;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

/**
 * Resource server (JWT RS256 de auth-ms). GET autenticado; escritura solo ADMIN, salvo horarios,
 * asignaciones y docentes que también puede SECRETARIA. {@code /internal/**} no pasa por el Gateway.
 */
@Configuration
public class SecurityConfig {

    @Value("${app.security.swagger-public:true}")
    private boolean swaggerPublic;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/actuator/health/**", "/actuator/info", "/actuator/prometheus").permitAll();
                    auth.requestMatchers("/internal/**").permitAll();
                    if (swaggerPublic) {
                        auth.requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll();
                    }
                    // Contratos y pagos del personal: sensibles, solo ADMIN también para leer (antes que la regla general de GET).
                    auth.requestMatchers("/api/v1/planificacion/rrhh/**").hasRole("ADMIN");
                    // Pago al personal con aprobación: caja solicita, el administrador aprueba o rechaza; ambos ven la planilla.
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/planificacion/pago-personal/pagos/*/solicitar").hasRole("CAJERO");
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/planificacion/pago-personal/pagos/*/aprobar",
                            "/api/v1/planificacion/pago-personal/pagos/*/rechazar").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.GET, "/api/v1/planificacion/pago-personal/**").hasAnyRole("ADMIN", "CAJERO");
                    // Asistencia del personal: ADMIN y SECRETARIA, también para leer.
                    auth.requestMatchers("/api/v1/planificacion/asistencia-personal/**").hasAnyRole("ADMIN", "SECRETARIA");
                    // Lo propio de cada persona del personal (su contrato, sus pagos…): solo lectura, solo personal; la persona sale del token.
                    auth.requestMatchers(HttpMethod.GET, "/api/v1/planificacion/mi-personal/**", "/api/v1/planificacion/mi-personal")
                            .hasAnyRole("ADMIN", "SECRETARIA", "DOCENTE", "CAJERO");
                    auth.requestMatchers(HttpMethod.GET, "/api/v1/planificacion/**").authenticated();
                    auth.requestMatchers("/api/v1/planificacion/horarios/**", "/api/v1/planificacion/asignaciones/**",
                            "/api/v1/planificacion/docentes/**").hasAnyRole("ADMIN", "SECRETARIA");
                    auth.requestMatchers("/api/v1/planificacion/**").hasRole("ADMIN");
                    auth.anyRequest().authenticated();
                })
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2ResourceServer(o -> o.jwt(j -> j.jwtAuthenticationConverter(jwtAuthenticationConverter())));
        return http.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new RealmRolesConverter());
        return converter;
    }

    /** Convierte {@code realm_access.roles} en autoridades con prefijo {@code ROLE_}. */
    static class RealmRolesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
        @Override
        @SuppressWarnings("unchecked")
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            Object realm = jwt.getClaim("realm_access");
            if (realm instanceof Map<?, ?> map && map.get("roles") instanceof Collection<?> roles) {
                return roles.stream().map(r -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + r)).toList();
            }
            return List.of();
        }
    }
}
```

---

## 175. `BusinessRuleException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/BusinessRuleException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.planificacion.exception;

/** Violación de una regla de negocio: se traduce a HTTP 409. */
public class BusinessRuleException extends RuntimeException {
    public BusinessRuleException(String message) {
        super(message);
    }
}
```

---

## 176. `ErrorResponse.java` — Manejo de Excepciones

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/ErrorResponse.java`

### **¿Qué hace esta clase?**
DTO de respuesta (Response). Estructura los datos devueltos por la API REST al frontend para `Error`.

```java
package pe.edu.eduspace.planificacion.exception;

import java.time.OffsetDateTime;
import java.util.List;

public record ErrorResponse(String codigo, String mensaje, String ruta, String traceId,
                            OffsetDateTime fecha, List<String> detalles) {
}
```

---

## 177. `GlobalExceptionHandler.java` — Manejo de Excepciones

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/GlobalExceptionHandler.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.planificacion.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.time.OffsetDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.FieldError;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> notFound(ResourceNotFoundException ex, HttpServletRequest req) {
        return build(HttpStatus.NOT_FOUND, "NO_ENCONTRADO", ex.getMessage(), req, List.of());
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ErrorResponse> rule(BusinessRuleException ex, HttpServletRequest req) {
        return build(HttpStatus.CONFLICT, "REGLA_DE_NEGOCIO", ex.getMessage(), req, List.of());
    }

    /** Validación de un parámetro completo (por ejemplo, una lista de objetos con @Valid). */
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse> parameterValidation(HandlerMethodValidationException ex, HttpServletRequest req) {
        List<String> detalles = ex.getParameterValidationResults().stream()
                .flatMap(r -> r.getResolvableErrors().stream())
                .map(e -> e instanceof FieldError fe ? fe.getField() + ": " + fe.getDefaultMessage() : e.getDefaultMessage())
                .toList();
        return build(HttpStatus.BAD_REQUEST, "VALIDACION", "Datos de entrada inválidos", req, detalles);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        List<String> detalles = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage()).toList();
        return build(HttpStatus.BAD_REQUEST, "VALIDACION", "Datos de entrada inválidos", req, detalles);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class,
            MissingServletRequestParameterException.class, IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> badRequest(Exception ex, HttpServletRequest req) {
        return build(HttpStatus.BAD_REQUEST, "PETICION_INVALIDA", "La petición no es válida", req, List.of());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> integrity(DataIntegrityViolationException ex, HttpServletRequest req) {
        log.warn("component=exception eventType=DataIntegrity key={} status=CONFLICT cause={}",
                req.getRequestURI(), ex.getMostSpecificCause().getMessage());
        return build(HttpStatus.CONFLICT, "DUPLICADO_O_REFERENCIADO",
                "La operación viola una restricción de unicidad o referencia de datos", req, List.of());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> denied(AccessDeniedException ex, HttpServletRequest req) {
        return build(HttpStatus.FORBIDDEN, "SIN_PERMISO", "No tiene permiso para esta operación", req, List.of());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> other(Exception ex, HttpServletRequest req) {
        // los errores HTTP propios de Spring MVC (ruta inexistente, método o tipo no soportado) conservan su estado
        if (ex instanceof org.springframework.web.ErrorResponse er && er.getStatusCode().is4xxClientError()) {
            HttpStatus status = HttpStatus.valueOf(er.getStatusCode().value());
            String codigo = switch (status) {
                case NOT_FOUND -> "NO_ENCONTRADO";
                case METHOD_NOT_ALLOWED -> "METODO_NO_PERMITIDO";
                case UNSUPPORTED_MEDIA_TYPE -> "TIPO_NO_SOPORTADO";
                default -> "PETICION_INVALIDA";
            };
            return build(status, codigo, status.getReasonPhrase(), req, List.of());
        }
        log.error("component=exception eventType=Unexpected key={} status=ERROR", req.getRequestURI(), ex);
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "ERROR_INTERNO", "Error interno del servidor", req, List.of());
    }

    private ResponseEntity<ErrorResponse> build(HttpStatus status, String codigo, String mensaje,
                                                HttpServletRequest req, List<String> detalles) {
        return ResponseEntity.status(status).body(new ErrorResponse(codigo, mensaje, req.getRequestURI(),
                MDC.get("traceId"), OffsetDateTime.now(), detalles));
    }
}
```

---

## 178. `ResourceNotFoundException.java` — Manejo de Excepciones

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/exception/ResourceNotFoundException.java`

### **¿Qué hace esta clase?**
Clase de excepción o manejo de errores para el microservicio. Permite retornar respuestas HTTP estructuradas ante errores de validación o reglas de negocio.

```java
package pe.edu.eduspace.planificacion.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException of(String recurso, Object id) {
        return new ResourceNotFoundException(recurso + " con id " + id + " no existe");
    }
}
```

---

## 179. `CodigosAula.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/util/CodigosAula.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.util;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

/** Códigos automáticos de las aulas de un pabellón: «A-01», «A-02»… sin repetir los que ya existen. */
public final class CodigosAula {

    private static final int LARGO_PREFIJO = 12;

    private CodigosAula() {
    }

    /** El nombre del pabellón como prefijo de código: sin tildes ni símbolos, en mayúsculas; «Central 2» → «CENTRAL2». */
    public static String prefijo(String nombrePabellon) {
        String limpio = Normalizer.normalize(nombrePabellon == null ? "" : nombrePabellon, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "").toUpperCase().replaceAll("[^A-Z0-9]", "");
        if (limpio.isEmpty()) return "P";
        return limpio.length() > LARGO_PREFIJO ? limpio.substring(0, LARGO_PREFIJO) : limpio;
    }

    /**
     * Los {@code cantidad} códigos siguientes que no existan: «A-01», «A-02»… Salta los ya tomados (aunque estén en otro pabellón)
     * para no chocar con el código único de cada aula.
     */
    public static List<String> siguientes(String nombrePabellon, int cantidad, Predicate<String> yaExiste) {
        String prefijo = prefijo(nombrePabellon);
        List<String> codigos = new ArrayList<>();
        for (int n = 1; codigos.size() < cantidad && n <= 9_999; n++) {
            String candidato = prefijo + "-" + String.format("%02d", n);
            if (!yaExiste.test(candidato)) codigos.add(candidato);
        }
        return codigos;
    }
}
```

---

## 180. `CorrelationIdFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/filter/CorrelationIdFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.eduspace.planificacion.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorrelationIdFilter extends OncePerRequestFilter {

    public static final String HEADER = "X-Trace-ID";
    public static final String MDC_KEY = "traceId";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String traceId = request.getHeader(HEADER);
        if (traceId == null || traceId.isBlank()) {
            traceId = UUID.randomUUID().toString();
        }
        MDC.put(MDC_KEY, traceId);
        response.setHeader(HEADER, traceId);
        try {
            chain.doFilter(request, response);
        } finally {
            MDC.remove(MDC_KEY);
        }
    }
}
```

---

## 181. `PlanificadorHorario.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/horario/PlanificadorHorario.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.horario;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * Armado automático de horarios sin cruces. No conoce JPA: trabaja con índices (secciones, docentes, aulas, cursos) y
 * "espacios" (día × bloque de clase), así se puede probar aislado.
 *
 * <p>Restricciones duras: una sección tiene una sola clase por espacio, un docente no puede estar en dos secciones a
 * la vez y un aula no se usa dos veces a la vez; además una sección solo usa los bloques de su turno. Las clases que ya
 * existen y no se tocan entran como espacios ocupados.
 *
 * <p>Método: (1) construcción voraz que coloca primero la clase con menos opciones libres (MRV) y prefiere repartir
 * cada curso en días distintos; (2) si quedan clases sin lugar, búsqueda local de mínimos conflictos con lista tabú:
 * se coloca la clase pendiente donde estorba a menos clases, y las desplazadas vuelven a buscar su lugar. Es
 * determinista para una misma semilla: simular y aplicar dan el mismo horario.
 */
public final class PlanificadorHorario {

    /** Una hora de clase por programar. Índices compactos; {@code aula = -1} si la sección no tiene aula. */
    public record Leccion(int seccion, int docente, int curso, int aula) {
    }

    /** Datos del problema. Espacio = {@code dia * bloques + bloque}. Las matrices {@code ocupado*} son clases fijas. */
    public static final class Problema {
        public final int dias;
        public final int bloques;
        public final List<Leccion> lecciones;
        public final boolean[][] permitido;   // [seccion][espacio]
        public final boolean[][] ocupSeccion; // [seccion][espacio]
        public final boolean[][] ocupDocente; // [docente][espacio]
        public final boolean[][] ocupAula;    // [aula][espacio]
        public final int cursos;

        public Problema(int dias, int bloques, List<Leccion> lecciones, boolean[][] permitido, boolean[][] ocupSeccion,
                        boolean[][] ocupDocente, boolean[][] ocupAula, int cursos) {
            this.dias = dias;
            this.bloques = bloques;
            this.lecciones = lecciones;
            this.permitido = permitido;
            this.ocupSeccion = ocupSeccion;
            this.ocupDocente = ocupDocente;
            this.ocupAula = ocupAula;
            this.cursos = cursos;
        }

        int espacios() {
            return dias * bloques;
        }
    }

    private static final int INTENTOS = 25;
    private static final int LIBRE = -1;
    private static final int FIJO = -2;

    private final Problema p;
    private final int e;
    private final int n;
    private final Random rng;

    // estado de la solución en curso
    private int[] espacio;
    private int[][] dueSeccion;
    private int[][] dueDocente;
    private int[][] dueAula;
    private int[][][] cursoDia;     // [seccion][curso][dia]
    private int[][] cargaDia;       // [seccion][dia]
    private int[][] cargaDocDia;    // [docente][dia]
    private int sinColocar;

    private PlanificadorHorario(Problema problema, long semilla) {
        this.p = problema;
        this.e = problema.espacios();
        this.n = problema.lecciones.size();
        this.rng = new Random(semilla);
    }

    /** Devuelve, por lección, el espacio asignado o -1 si no se logró colocar. */
    public static int[] resolver(Problema problema, long semilla) {
        PlanificadorHorario s = new PlanificadorHorario(problema, semilla);
        return s.resolver();
    }

    private int[] resolver() {
        int[] mejor = new int[n];
        Arrays.fill(mejor, -1);
        int mejorSin = n;
        long limite = System.nanoTime() + 20_000_000_000L; // tope de seguridad; en la práctica terminan antes los intentos
        for (int intento = 0; intento < INTENTOS && System.nanoTime() < limite; intento++) {
            reiniciar();
            construir();
            if (sinColocar > 0) {
                reparar(4000 + 30 * n, limite);
            }
            if (sinColocar < mejorSin) {
                mejorSin = sinColocar;
                mejor = espacio.clone();
            }
            if (mejorSin == 0) {
                break;
            }
        }
        return mejor;
    }

    // ------------------------------------------------------------------ estado
    private void reiniciar() {
        espacio = new int[n];
        Arrays.fill(espacio, -1);
        int ns = p.permitido.length;
        dueSeccion = marcar(p.ocupSeccion, ns);
        dueDocente = marcar(p.ocupDocente, p.ocupDocente.length);
        dueAula = marcar(p.ocupAula, p.ocupAula.length);
        cursoDia = new int[ns][Math.max(p.cursos, 1)][p.dias];
        cargaDia = new int[ns][p.dias];
        cargaDocDia = new int[p.ocupDocente.length][p.dias];
        sinColocar = n;
    }

    private int[][] marcar(boolean[][] fijo, int filas) {
        int[][] m = new int[filas][e];
        for (int i = 0; i < filas; i++) {
            for (int s = 0; s < e; s++) {
                m[i][s] = fijo[i][s] ? FIJO : LIBRE;
            }
        }
        return m;
    }

    private void colocar(int l, int s) {
        Leccion x = p.lecciones.get(l);
        int dia = s / p.bloques;
        espacio[l] = s;
        dueSeccion[x.seccion()][s] = l;
        dueDocente[x.docente()][s] = l;
        if (x.aula() >= 0) dueAula[x.aula()][s] = l;
        cursoDia[x.seccion()][x.curso()][dia]++;
        cargaDia[x.seccion()][dia]++;
        cargaDocDia[x.docente()][dia]++;
        sinColocar--;
    }

    private void quitar(int l) {
        Leccion x = p.lecciones.get(l);
        int s = espacio[l];
        int dia = s / p.bloques;
        dueSeccion[x.seccion()][s] = LIBRE;
        dueDocente[x.docente()][s] = LIBRE;
        if (x.aula() >= 0) dueAula[x.aula()][s] = LIBRE;
        cursoDia[x.seccion()][x.curso()][dia]--;
        cargaDia[x.seccion()][dia]--;
        cargaDocDia[x.docente()][dia]--;
        espacio[l] = -1;
        sinColocar++;
    }

    private boolean libre(Leccion x, int s) {
        return p.permitido[x.seccion()][s] && dueSeccion[x.seccion()][s] == LIBRE && dueDocente[x.docente()][s] == LIBRE
                && (x.aula() < 0 || dueAula[x.aula()][s] == LIBRE);
    }

    /** Menor es mejor: reparte el curso en días distintos (y, si repite el día, en bloques seguidos) y equilibra la carga. */
    private double puntaje(Leccion x, int s) {
        int dia = s / p.bloques;
        int bloque = s % p.bloques;
        int mismoDia = cursoDia[x.seccion()][x.curso()][dia];
        double pts = 0;
        if (mismoDia > 0) {
            boolean contiguo = false;
            for (int b : new int[] {bloque - 1, bloque + 1}) {
                if (b >= 0 && b < p.bloques) {
                    int otra = dueSeccion[x.seccion()][dia * p.bloques + b];
                    if (otra >= 0 && p.lecciones.get(otra).curso() == x.curso()) contiguo = true;
                }
            }
            pts += contiguo ? 5 : 14;
        }
        pts += cargaDia[x.seccion()][dia] + 0.25 * cargaDocDia[x.docente()][dia];
        return pts;
    }

    // ------------------------------------------------------------------ fase 1: voraz con MRV
    private void construir() {
        boolean[] descartada = new boolean[n];
        while (true) {
            int elegida = -1;
            int menor = Integer.MAX_VALUE;
            for (int l = 0; l < n; l++) {
                if (espacio[l] >= 0 || descartada[l]) continue;
                Leccion x = p.lecciones.get(l);
                int opciones = 0;
                for (int s = 0; s < e; s++) if (libre(x, s)) opciones++;
                if (opciones == 0) {
                    descartada[l] = true;
                    continue;
                }
                if (opciones < menor || (opciones == menor && rng.nextBoolean())) {
                    menor = opciones;
                    elegida = l;
                }
            }
            if (elegida < 0) return;
            Leccion x = p.lecciones.get(elegida);
            int mejor = -1;
            double mejorPts = Double.MAX_VALUE;
            for (int s = 0; s < e; s++) {
                if (!libre(x, s)) continue;
                double pts = puntaje(x, s) + rng.nextDouble() * 1.5;
                if (pts < mejorPts) {
                    mejorPts = pts;
                    mejor = s;
                }
            }
            colocar(elegida, mejor);
        }
    }

    // ------------------------------------------------------------------ fase 2: mínimos conflictos con tabú
    private void reparar(int maxIter, long limite) {
        int[][] tabu = new int[n][e];
        List<Integer> pendientes = new ArrayList<>();
        for (int l = 0; l < n; l++) if (espacio[l] < 0) pendientes.add(l);
        int[] mejorEstado = espacio.clone();
        int mejorSin = sinColocar;
        for (int iter = 1; iter <= maxIter && !pendientes.isEmpty(); iter++) {
            if ((iter & 255) == 0 && System.nanoTime() > limite) break;
            int l = pendientes.remove(rng.nextInt(pendientes.size()));
            Leccion x = p.lecciones.get(l);
            int mejorS = -1;
            int mejorCosto = Integer.MAX_VALUE;
            double mejorPts = Double.MAX_VALUE;
            for (int s = 0; s < e; s++) {
                if (!p.permitido[x.seccion()][s]) continue;
                int a = dueSeccion[x.seccion()][s];
                int b = dueDocente[x.docente()][s];
                int c = x.aula() >= 0 ? dueAula[x.aula()][s] : LIBRE;
                if (a == FIJO || b == FIJO || c == FIJO) continue; // choca con una clase que no se puede mover
                int costo = distintos(a, b, c);
                if (tabu[l][s] > iter && costo > 0) continue;
                double pts = puntaje(x, s) + rng.nextDouble();
                if (costo < mejorCosto || (costo == mejorCosto && pts < mejorPts)) {
                    mejorCosto = costo;
                    mejorPts = pts;
                    mejorS = s;
                }
            }
            if (mejorS < 0) {
                continue; // no tiene ningún espacio posible (p. ej. todo fijo): queda sin colocar
            }
            for (int o : new int[] {dueSeccion[x.seccion()][mejorS], dueDocente[x.docente()][mejorS],
                    x.aula() >= 0 ? dueAula[x.aula()][mejorS] : LIBRE}) {
                if (o >= 0 && espacio[o] >= 0) {
                    tabu[o][espacio[o]] = iter + 8 + rng.nextInt(12);
                    quitar(o);
                    pendientes.add(o);
                }
            }
            colocar(l, mejorS);
            if (sinColocar < mejorSin) {
                mejorSin = sinColocar;
                mejorEstado = espacio.clone();
            }
        }
        if (sinColocar > mejorSin) {
            // volver al mejor estado visto
            for (int l = 0; l < n; l++) if (espacio[l] >= 0) quitar(l);
            for (int l = 0; l < n; l++) if (mejorEstado[l] >= 0) colocar(l, mejorEstado[l]);
        }
    }

    private int distintos(int a, int b, int c) {
        int k = 0;
        if (a >= 0) k++;
        if (b >= 0 && b != a) k++;
        if (c >= 0 && c != a && c != b) k++;
        return k;
    }
}
```

---

## 182. `Respuestas.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/util/Respuestas.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.util;

import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public final class Respuestas {

    private Respuestas() {
    }

    /** 201 con cabecera {@code Location} apuntando a {@code <ruta actual>/{id}}. */
    public static <T> ResponseEntity<T> creado(Long id, T cuerpo) {
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(id).toUri()).body(cuerpo);
    }
}
```

---

## 183. `ServiceTokenFilter.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/filter/ServiceTokenFilter.java`

### **¿Qué hace esta clase?**
Filtro de servlet que intercepta las peticiones HTTP entrantes para agregar trazabilidad, validar tokens o propagar headers entre microservicios.

```java
package pe.edu.eduspace.planificacion.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** {@code /internal/**} solo responde a otro servicio: exige el header {@code X-Service-Token} con el token compartido. */
@Component
public class ServiceTokenFilter extends OncePerRequestFilter {

    public static final String HEADER = "X-Service-Token";

    private final byte[] esperado;

    public ServiceTokenFilter(@Value("${eduspace.service-token}") String token) {
        this.esperado = token.getBytes(StandardCharsets.UTF_8);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getRequestURI().startsWith("/internal/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String recibido = request.getHeader(HEADER);
        boolean valido = esperado.length > 0 && recibido != null
                && MessageDigest.isEqual(esperado, recibido.getBytes(StandardCharsets.UTF_8));
        if (!valido) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        chain.doFilter(request, response);
    }
}
```

---

## 184. `UsuarioActual.java` — Seguridad, Filtros, Clientes y Utilidades

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/util/UsuarioActual.java`

### **¿Qué hace esta clase?**
Clase de soporte del microservicio `planificacion-ms` que cumple funciones auxiliares de infraestructura, seguridad o utilidades.

```java
package pe.edu.eduspace.planificacion.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

/** Lee el claim {@code usuarioId} del token del usuario autenticado. */
public final class UsuarioActual {

    private UsuarioActual() {
    }

    public static Long id() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Jwt jwt) {
            Object claim = jwt.getClaim("usuarioId");
            if (claim instanceof Number n) {
                return n.longValue();
            }
            if (claim instanceof String s && !s.isBlank()) {
                return Long.valueOf(s);
            }
        }
        return null;
    }
}
```

---

## 185. `PlanificacionMsApplication.java` — Clase Principal de Arranque

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/PlanificacionMsApplication.java`

### **¿Qué hace esta clase?**
Clase principal de arranque de la aplicación Spring Boot (`@SpringBootApplication`). Punto de entrada del microservicio con anotaciones de descubrimiento Eureka y habilitación de clientes Feign.

```java
package pe.edu.eduspace.planificacion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PlanificacionMsApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlanificacionMsApplication.class, args);
    }
}
```

---

## 186. `PlanificacionMapper.java` — Mappers

**Ruta del archivo:** `services/planificacion-ms/src/main/java/pe/edu/eduspace/planificacion/mapper/PlanificacionMapper.java`

### **¿Qué hace esta clase?**
Clase de mapeo (Mapper) que convierte entre entidades JPA y DTOs de solicitud/respuesta.

```java
package pe.edu.eduspace.planificacion.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import pe.edu.eduspace.planificacion.dto.*;
import pe.edu.eduspace.planificacion.entity.*;

/** Conversiones entidad ↔ DTO. Las relaciones y el estado los resuelven los servicios, no el mapper. */
@Mapper
public interface PlanificacionMapper {

    // ---- Año ----
    AnioResponse toResponse(AnioAcademico anio);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    AnioAcademico toEntity(AnioRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    void update(AnioRequest request, @MappingTarget AnioAcademico anio);

    // ---- Periodo ----
    @Mapping(source = "anio.id", target = "anioId")
    PeriodoResponse toResponse(Periodo periodo);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "anio", ignore = true)
    @Mapping(target = "estado", ignore = true)
    Periodo toEntity(PeriodoRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "anio", ignore = true)
    @Mapping(target = "estado", ignore = true)
    void update(PeriodoRequest request, @MappingTarget Periodo periodo);

    // ---- Nivel / Grado ----
    NivelResponse toResponse(Nivel nivel);

    @Mapping(source = "nivel.id", target = "nivelId")
    @Mapping(source = "nivel.nombre", target = "nivelNombre")
    GradoResponse toResponse(Grado grado);

    // ---- Aula ----
    @Mapping(source = "pabellon.id", target = "pabellonId")
    @Mapping(source = "pabellon.nombre", target = "pabellonNombre")
    AulaResponse toResponse(Aula aula);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "pabellon", ignore = true)
    Aula toEntity(AulaRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "pabellon", ignore = true)
    void update(AulaRequest request, @MappingTarget Aula aula);

    // ---- Sección ----
    @Mapping(source = "anio.id", target = "anioId")
    @Mapping(source = "anio.nombre", target = "anioNombre")
    @Mapping(source = "grado.id", target = "gradoId")
    @Mapping(source = "grado.nombre", target = "gradoNombre")
    @Mapping(source = "grado.nivel.id", target = "nivelId")
    @Mapping(source = "aula.id", target = "aulaId")
    @Mapping(source = "aula.nombre", target = "aulaNombre")
    @Mapping(source = "tutor.id", target = "tutorDocenteId")
    @Mapping(target = "tutorNombre", expression = "java(seccion.getTutor() == null ? null : seccion.getTutor().nombreCompleto())")
    SeccionResponse toResponse(Seccion seccion);

    @Mapping(source = "anio.id", target = "anioId")
    @Mapping(source = "grado.id", target = "gradoId")
    @Mapping(source = "grado.nivel.id", target = "nivelId")
    @Mapping(source = "tutor.id", target = "tutorDocenteId")
    SeccionInternaResponse toInterna(Seccion seccion);

    // ---- Curso / Malla ----
    CursoResponse toResponse(Curso curso);

    @Mapping(target = "id", ignore = true)
    Curso toEntity(CursoRequest request);

    @Mapping(target = "id", ignore = true)
    void update(CursoRequest request, @MappingTarget Curso curso);

    @Mapping(source = "curso.id", target = "cursoId")
    @Mapping(source = "curso.codigo", target = "cursoCodigo")
    @Mapping(source = "curso.nombre", target = "cursoNombre")
    MallaItemResponse toResponse(GradoCurso gradoCurso);

    // ---- Colegio ----
    ColegioResponse toResponse(Colegio colegio);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    void update(ColegioRequest request, @MappingTarget Colegio colegio);

    // ---- Área / Docente (personal) ----
    AreaResponse toResponse(Area area);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "activo", ignore = true)
    Area toEntity(AreaRequest request);

    @Mapping(source = "area.id", target = "areaId")
    @Mapping(source = "area.codigo", target = "areaCodigo")
    @Mapping(source = "area.nombre", target = "areaNombre")
    @Mapping(target = "cursoIds", expression = "java(docente.getCursos().stream().map(c -> c.getId()).sorted().toList())")
    DocenteResponse toResponse(Docente docente);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    @Mapping(target = "area", ignore = true)
    @Mapping(target = "cursos", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    Docente toEntity(DocenteRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioId", ignore = true)
    @Mapping(target = "area", ignore = true)
    @Mapping(target = "cursos", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "creadoEn", ignore = true)
    @Mapping(target = "actualizadoEn", ignore = true)
    void update(DocenteRequest request, @MappingTarget Docente docente);

    // ---- Asignación ----
    @Mapping(source = "seccion.id", target = "seccionId")
    @Mapping(target = "seccionNombre", expression = "java(a.getSeccion().getGrado().getNombre() + \" \" + a.getSeccion().getNombre())")
    @Mapping(source = "curso.id", target = "cursoId")
    @Mapping(source = "curso.nombre", target = "cursoNombre")
    @Mapping(source = "docente.id", target = "docenteId")
    @Mapping(target = "docenteNombre", expression = "java(a.getDocente().nombreCompleto())")
    AsignacionResponse toResponse(Asignacion a);

    // ---- Bloques ----
    BloqueResponse toResponse(BloqueHorario bloque);

    @Mapping(target = "id", ignore = true)
    BloqueHorario toEntity(BloqueRequest request);

    @Mapping(target = "id", ignore = true)
    void update(BloqueRequest request, @MappingTarget BloqueHorario bloque);

    // ---- Horario ----
    @Mapping(source = "asignacion.id", target = "asignacionId")
    @Mapping(source = "asignacion.seccion.id", target = "seccionId")
    @Mapping(target = "seccionNombre", expression = "java(h.getAsignacion().getSeccion().getGrado().getNombre() + \" \" + h.getAsignacion().getSeccion().getNombre())")
    @Mapping(source = "asignacion.curso.id", target = "cursoId")
    @Mapping(source = "asignacion.curso.nombre", target = "cursoNombre")
    @Mapping(source = "asignacion.docente.id", target = "docenteId")
    @Mapping(target = "docenteNombre", expression = "java(h.getAsignacion().getDocente().nombreCompleto())")
    @Mapping(source = "bloque.id", target = "bloqueId")
    @Mapping(source = "bloque.orden", target = "bloqueOrden")
    @Mapping(source = "bloque.horaInicio", target = "horaInicio")
    @Mapping(source = "bloque.horaFin", target = "horaFin")
    @Mapping(source = "aula.id", target = "aulaId")
    @Mapping(source = "aula.nombre", target = "aulaNombre")
    HorarioResponse toResponse(Horario h);

    // ---- Publicación / Feriado ----
    @Mapping(source = "seccion.id", target = "seccionId")
    PublicacionResponse toResponse(PublicacionHorario publicacion);

    @Mapping(source = "anio.id", target = "anioId")
    FeriadoResponse toResponse(Feriado feriado);
}
```

---

