-- Forma de pago de las pensiones que se acuerda al matricular: MENSUAL, BIMESTRAL, SEMESTRAL o ANUAL (semestral y anual llevan descuento).
-- Viaja en los eventos matricula.* para que pago-ms genere las cuotas según el plan. Las matrículas anteriores quedan en MENSUAL.
ALTER TABLE matriculas ADD COLUMN plan_pago VARCHAR(12) NOT NULL DEFAULT 'MENSUAL';
ALTER TABLE matriculas ADD CONSTRAINT ck_matricula_plan_pago CHECK (plan_pago IN ('MENSUAL','BIMESTRAL','SEMESTRAL','ANUAL'));
