-- Código de descuento: un descuento con código lo puede canjear la familia en la matrícula en línea del sitio público.
-- Sin código, el descuento solo lo asigna el administrador desde Cuentas por alumno (como hasta ahora).
ALTER TABLE descuentos ADD COLUMN codigo VARCHAR(40);

-- Un código no se repite (sin importar mayúsculas); los descuentos sin código no cuentan.
CREATE UNIQUE INDEX uk_descuentos_codigo ON descuentos (UPPER(codigo)) WHERE codigo IS NOT NULL;
