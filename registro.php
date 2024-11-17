<?php
include 'conexion.php'; // Asegúrate de que esta conexión esté correctamente configurada

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];
    $confirmar_contrasena = $_POST['confirmar_contrasena'];

    // Verificar que las contraseñas coincidan
    if ($contrasena !== $confirmar_contrasena) {
        echo "Las contraseñas no coinciden.";
        exit;
    }

    // Verificar si el correo ya está registrado
    $sql_check = "SELECT correo FROM usuarios WHERE correo = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $email);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        echo "El correo ya está registrado. Intente con otro correo.";
        $stmt_check->close();
        exit;
    }
    $stmt_check->close();

    // Encriptar la contraseña
    $hashed_password = password_hash($contrasena, PASSWORD_BCRYPT);

    // Preparar la inserción en la base de datos
    $sql = "INSERT INTO usuarios (nombre, apellido, correo, contraseña) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nombre, $apellido, $email, $hashed_password);

    // Ejecutar y verificar la inserción
    if ($stmt->execute()) {
        // Obtener el ID del usuario recién insertado
        $usuario_id = $conn->insert_id;

        // Insertar en la tabla de rutinas con el usuario_id correspondiente
        $sql_rutinas = "INSERT INTO `rutinas` (`rutina_id`, `usuario_id`, `nombre`, `fecha_creacion`) VALUES (NULL, ?, '', current_timestamp())";
        $stmt_rutinas = $conn->prepare($sql_rutinas);
        $stmt_rutinas->bind_param("i", $usuario_id);

        if ($stmt_rutinas->execute()) {
            echo "Registro exitoso y rutina creada.";
        } else {
            echo "Error al crear la rutina: " . $stmt_rutinas->error;
        }

        $stmt_rutinas->close();
    } else {
        echo "Error en el registro: " . $stmt->error;
    }

    // Cerrar la conexión
    $stmt->close();
    $conn->close();
}
?>
