-- =====================================================================
-- Pagos de apoderados por aprobar
-- El pago en línea del apoderado ya no confirma las cuotas al instante:
-- queda PENDIENTE hasta que caja (o el administrador) lo apruebe, o lo
-- RECHACE con un motivo. Mientras está pendiente las cuotas no se tocan.
-- =====================================================================
ALTER TABLE pagos DROP CONSTRAINT ck_pago_estado;
ALTER TABLE pagos ADD CONSTRAINT ck_pago_estado CHECK (estado IN ('CONFIRMADO','ANULADO','PENDIENTE','RECHAZADO'));

ALTER TABLE pagos ADD COLUMN aprobado_por     BIGINT;       -- quien aprobó o rechazó
ALTER TABLE pagos ADD COLUMN aprobado_en      TIMESTAMP;
ALTER TABLE pagos ADD COLUMN motivo_rechazo   VARCHAR(300);
ALTER TABLE pagos ADD COLUMN tipo_comprobante VARCHAR(10);  -- el que pidió el apoderado; se emite al aprobar

CREATE INDEX idx_pagos_estado ON pagos (estado, pagado_en) WHERE estado = 'PENDIENTE';
