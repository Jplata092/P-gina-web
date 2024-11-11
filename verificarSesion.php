<?php
header("Access-Control-Allow-Origin: *"); // Permitir todas las solicitudes de origen (para desarrollo)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Permitir el encabezado Content-Type

session_start();

header('Content-Type: application/json');

if (isset($_SESSION['usuario_id'])) {
    echo json_encode(["sesionActiva" => true]);
} else {
    echo json_encode(["sesionActiva" => false]);
}
?>
