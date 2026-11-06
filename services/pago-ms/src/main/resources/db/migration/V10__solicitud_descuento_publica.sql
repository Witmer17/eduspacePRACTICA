-- =====================================================================
-- Descuento por hermano pedido desde la matrícula en línea del sitio público.
-- La familia declara los datos del hermano (documento y nombre) y sube sus documentos (se guardan en matricula-ms); la secretaría los revisa y
-- confirma el descuento. «origen» distingue estas solicitudes de las que piden la familia con sesión o la secretaría.
-- =====================================================================
ALTER TABLE solicitudes_descuento
    ADD COLUMN origen            VARCHAR(10) NOT NULL DEFAULT 'INTERNA',
    ADD COLUMN hermano_documento VARCHAR(20),
    ADD COLUMN hermano_nombre    VARCHAR(220);

ALTER TABLE solicitudes_descuento
    ADD CONSTRAINT ck_sol_desc_origen CHECK (origen IN ('INTERNA', 'PUBLICA'));
