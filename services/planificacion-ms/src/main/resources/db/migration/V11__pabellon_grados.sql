-- Grados que usan cada pabellón (se eligen marcándolos en el pabellón). Un grado puede estar en más de un pabellón.
CREATE TABLE pabellon_grados (
    pabellon_id BIGINT NOT NULL,
    grado_id    BIGINT NOT NULL,
    PRIMARY KEY (pabellon_id, grado_id),
    CONSTRAINT fk_pabgrado_pabellon FOREIGN KEY (pabellon_id) REFERENCES pabellones (id) ON DELETE CASCADE,
    CONSTRAINT fk_pabgrado_grado    FOREIGN KEY (grado_id)    REFERENCES grados (id)     ON DELETE CASCADE
);
CREATE INDEX idx_pabgrado_grado ON pabellon_grados (grado_id);
