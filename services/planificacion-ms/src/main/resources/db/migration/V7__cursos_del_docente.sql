-- Cursos que cada docente puede dictar (su especialidad, elegida al contratarlo). El armado de horarios los usa para proponer docente.
CREATE TABLE docente_cursos (
    docente_id BIGINT NOT NULL,
    curso_id   BIGINT NOT NULL,
    PRIMARY KEY (docente_id, curso_id),
    CONSTRAINT fk_docente_cursos_docente FOREIGN KEY (docente_id) REFERENCES docentes (id) ON DELETE CASCADE,
    CONSTRAINT fk_docente_cursos_curso   FOREIGN KEY (curso_id)   REFERENCES cursos (id)   ON DELETE CASCADE
);
CREATE INDEX idx_docente_cursos_curso ON docente_cursos (curso_id);
