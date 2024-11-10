<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401); // No autorizado
    echo json_encode(["error" => "No has iniciado sesión."]);
    exit();
}

// Si el usuario está autenticado, enviar los datos en JSON
$response = [
    "nombre" => $_SESSION['nombre'],
    "apellido" => $_SESSION['apellido'],
    "correo" => $_SESSION['correo']
];

header('Content-Type: application/json');
echo json_encode($response);
?>
