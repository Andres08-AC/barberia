-- Crear base de datos (ejecutar una vez en PostgreSQL)
-- CREATE DATABASE peluqueria_db;

-- Conectar a la base y ejecutar lo siguiente:

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) DEFAULT 0,
    duracion_minutos INT DEFAULT 60,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS citas (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id) ON DELETE CASCADE,
    servicio_id INT REFERENCES servicios(id) ON DELETE SET NULL,
    empleado_id INT REFERENCES empleados(id) ON DELETE SET NULL,
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mensajes_contacto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO servicios (nombre, descripcion, precio, duracion_minutos) VALUES
('Corte personalizado', 'Corte adaptado a tu estilo y rostro.', 35.00, 45),
('Coloración profesional', 'Mechas, balayage y tonos personalizados.', 80.00, 90),
('Tratamiento capilar', 'Hidratación y reconstrucción para tu cabello.', 40.00, 60)
ON CONFLICT DO NOTHING;

INSERT INTO empleados (nombre, especialidad) VALUES
('Ana López', 'Cortes y color'),
('Marta Ruiz', 'Tratamientos capilares')
ON CONFLICT DO NOTHING;
