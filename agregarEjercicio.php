<?php
session_start();
include 'conexion.php';

header("Content-Type: application/json");

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["success" => false, "message" => "Usuario no autenticado."]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

// Leer los datos enviados desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['ejercicio_id'])) {
    echo json_encode(["success" => false, "message" => "Falta el ID del ejercicio."]);
    exit;
}

$ejercicio_id = $data['ejercicio_id'];

// Obtener la rutina activa del usuario
$sql_rutina = "SELECT rutina_id FROM rutinas WHERE usuario_id = ? ORDER BY fecha_creacion DESC LIMIT 1";
$stmt_rutina = $conn->prepare($sql_rutina);
$stmt_rutina->bind_param("i", $usuario_id);
$stmt_rutina->execute();
$result_rutina = $stmt_rutina->get_result();

if ($result_rutina->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "No se encontró una rutina activa para este usuario."]);
    exit;
}

$rutina = $result_rutina->fetch_assoc();
$rutina_id = $rutina['rutina_id'];

// Insertar el ejercicio en la tabla rutina_ejercicio
$sql_insert = "INSERT INTO rutina_ejercicio (rutina_id, ejercicio_id, orden) VALUES (?, ?, 1)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("ii", $rutina_id, $ejercicio_id);

if ($stmt_insert->execute()) {
    echo json_encode(["success" => true, "message" => "Ejercicio agregado a la rutina."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al agregar el ejercicio: " . $stmt_insert->error]);
}

// Cerrar las conexiones
$stmt_rutina->close();
$stmt_insert->close();
$conn->close();

?>
