<?php

include 'conexion.php'; // Asegúrate de que esta conexión esté correctamente configurada

// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verifica si la conexión es exitosa
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Conexión fallida: " . $conn->connect_error]));
}

// Leer los datos enviados en JSON
$data = json_decode(file_get_contents("php://input"), true);
$ejercicioId = $data['ejercicioId'] ?? null;

// Validar que el ejercicioId no esté vacío
if (!$ejercicioId) {
    echo json_encode(['success' => false, 'error' => 'ID de ejercicio no proporcionado.']);
    exit;
}

// Obtener el ID del usuario desde la sesión
session_start();
$usuarioId = $_SESSION['usuario_id'] ?? null;

// Validar que el usuario esté autenticado
if (!$usuarioId) {
    echo json_encode(['success' => false, 'error' => 'El usuario no está autenticado.']);
    exit;
}

// Eliminar el ejercicio de la rutina
$sql = "DELETE FROM rutina_ejercicio WHERE ejercicio_id = ? AND rutina_id IN (
    SELECT rutina_id FROM rutinas WHERE usuario_id = ?
)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $ejercicioId, $usuarioId);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$stmt->close();
$conn->close();
?>
