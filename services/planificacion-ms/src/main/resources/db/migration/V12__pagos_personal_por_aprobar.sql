-- Pago al personal con aprobación: caja SOLICITA el pago (medio, fecha y referencia) y el administrador lo APRUEBA.
-- Estados: PENDIENTE -> POR_APROBAR -> PAGADO. Si el administrador lo rechaza vuelve a PENDIENTE con el motivo.
ALTER TABLE pagos_personal ADD COLUMN solicitado_por  BIGINT;
ALTER TABLE pagos_personal ADD COLUMN solicitado_en   TIMESTAMP;
ALTER TABLE pagos_personal ADD COLUMN aprobado_por    BIGINT;
ALTER TABLE pagos_personal ADD COLUMN aprobado_en     TIMESTAMP;
ALTER TABLE pagos_personal ADD COLUMN motivo_rechazo  VARCHAR(300);
CREATE INDEX idx_pagos_personal_estado ON pagos_personal (estado);
