<?php
session_start();
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];

    // Consulta para verificar si el correo existe
    $sql = "SELECT * FROM usuarios WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();
        
        // Verificar si la contraseña es correcta
        if (password_verify($contrasena, $usuario['contraseña'])) {
            $_SESSION['usuario_id'] = $usuario['usuario_id'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['apellido'] = $usuario['apellido'];
            $_SESSION['correo'] = $usuario['correo'];
            echo "Éxito: Inicio de sesión exitoso.";
        } else {
            echo "Error: La contraseña es incorrecta.";
        }
    } else {
        echo "Error: No se encontró una cuenta con este correo.";
    }

    $stmt->close();
    $conn->close();
}
?>
