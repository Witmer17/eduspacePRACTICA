-- =====================================================================
-- El descuento por hermano de la matrícula en línea se pide solo con el documento del hermano: la secretaría confirma el parentesco.
-- Ya no se suben archivos ni se elige el descuento en la web pública (lo decide el servidor), así que se quita lo que preparó V8.
-- =====================================================================
DROP TABLE IF EXISTS evidencias_hermano;
ALTER TABLE matriculas_publicas DROP COLUMN IF EXISTS hermano_descuento_id;
