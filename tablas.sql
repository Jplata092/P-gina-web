-- Creación de la tabla de Usuarios
CREATE TABLE usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creación de la tabla de Ejercicios
CREATE TABLE ejercicios (
    ejercicio_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(255),
    descripcion TEXT,
    video VARCHAR(255),
    tipo VARCHAR(50),
    musculo VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creación de la tabla de Rutinas
CREATE TABLE rutinas (
    rutina_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    nombre VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creación de la tabla intermedia Rutina_Ejercicio
CREATE TABLE rutina_ejercicio (
    rutina_ejercicio_id INT PRIMARY KEY AUTO_INCREMENT,
    rutina_id INT,
    ejercicio_id INT,
    orden INT DEFAULT 1,
    FOREIGN KEY (rutina_id) REFERENCES rutinas(rutina_id) ON DELETE CASCADE,
    FOREIGN KEY (ejercicio_id) REFERENCES ejercicios(ejercicio_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
