-- Forma de pago de las pensiones que se acuerda al matricular: MENSUAL, BIMESTRAL, SEMESTRAL o ANUAL.
-- Llega en los eventos de matrícula; sin dato (matrículas anteriores) se sigue pagando mensual, como se generaban las cuotas.
ALTER TABLE matriculas_local ADD COLUMN plan_pago VARCHAR(12) NOT NULL DEFAULT 'MENSUAL';
ALTER TABLE matriculas_local ADD CONSTRAINT ck_pml_plan_pago CHECK (plan_pago IN ('MENSUAL','BIMESTRAL','SEMESTRAL','ANUAL'));
