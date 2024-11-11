<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401); // No autorizado
    echo json_encode(["error" => "No has iniciado sesión."]);
    exit();
}

// Mensaje de depuración para verificar si las variables de sesión existen
if (isset($_SESSION['nombre']) && isset($_SESSION['apellido']) && isset($_SESSION['correo'])) {
    $response = [
        "nombre" => $_SESSION['nombre'],
        "apellido" => $_SESSION['apellido'],
        "correo" => $_SESSION['correo']
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    http_response_code(500); // Error interno del servidor
    echo json_encode(["error" => "Datos de sesión faltantes."]);
}
?>
