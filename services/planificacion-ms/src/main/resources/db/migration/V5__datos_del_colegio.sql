-- Datos de la institución (una sola fila, id = 1): lo que antes estaba fijo en las pantallas y documentos.
CREATE TABLE colegio (
    id             SMALLINT     PRIMARY KEY,
    nombre         VARCHAR(150) NOT NULL,
    nombre_corto   VARCHAR(60),
    lema           VARCHAR(200),
    codigo_modular VARCHAR(20),
    ruc            VARCHAR(11),
    ugel           VARCHAR(100),
    gestion        VARCHAR(10)  NOT NULL DEFAULT 'PRIVADA',
    director       VARCHAR(150),
    direccion      VARCHAR(200),
    distrito       VARCHAR(80),
    provincia      VARCHAR(80),
    departamento   VARCHAR(80),
    telefono       VARCHAR(30),
    email          VARCHAR(150),
    sitio_web      VARCHAR(150),
    actualizado_en TIMESTAMP    NOT NULL DEFAULT now(),
    CONSTRAINT ck_colegio_fila_unica CHECK (id = 1),
    CONSTRAINT ck_colegio_gestion CHECK (gestion IN ('PRIVADA', 'PUBLICA'))
);

INSERT INTO colegio (id, nombre, nombre_corto) VALUES (1, 'Colegio Horizonte del Valle', 'Horizonte del Valle');
