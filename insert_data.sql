-- Insertar datos en tabla estado_solicitud
INSERT INTO estado_solicitud (estado, estados, createdat, updatedat) VALUES
('generado', 1, NOW(), NOW()),
('aceptado', 1, NOW(), NOW()),
('prestado', 1, NOW(), NOW()),
('cancelado', 1, NOW(), NOW()),
('entregado', 1, NOW(), NOW());

-- Insertar datos en tabla Estado_equipo
INSERT INTO Estado_equipo (estado, estados, createdat, updatedat) VALUES
('Disponible', 1, NOW(), NOW()),
('En uso', 1, NOW(), NOW()),
('Mantenimiento', 1, NOW(), NOW()),
('Dañado', 1, NOW(), NOW()),
('Retirado', 1, NOW(), NOW());
