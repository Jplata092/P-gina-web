<?php

include 'conexion.php'; // Asegúrate de que esta conexión esté correctamente configurada

// Habilitar el reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verifica si la conexión es exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el ID del usuario desde la sesión
session_start();
$usuario_id = $_SESSION['usuario_id']; // Se asume que el ID de usuario está en la sesión

if (!$usuario_id) {
    echo json_encode(['error' => 'El usuario no está autenticado.']);
    exit;
}

// Obtener el ID de la rutina asociada al usuario
$sqlRutinaUsuario = "
    SELECT rutina_id
    FROM rutinas 
    WHERE usuario_id = ? 
    LIMIT 1
";
$stmtRutinaUsuario = $conn->prepare($sqlRutinaUsuario);
$stmtRutinaUsuario->bind_param("i", $usuario_id);
$stmtRutinaUsuario->execute();
$stmtRutinaUsuario->bind_result($rutina_id);
$stmtRutinaUsuario->fetch();
$stmtRutinaUsuario->close();

if (!$rutina_id) {
    echo json_encode(['error' => 'No tienes una rutina asociada.']);
    exit;
}

// Incluye rutina_id en la respuesta
$response = [
    'rutina_id' => $rutina_id,
    'ejercicios' => []
];

// Consulta para obtener ejercicios
$sql = "
    SELECT re.ejercicio_id, e.nombre, e.imagen
    FROM rutina_ejercicio re
    INNER JOIN ejercicios e ON re.ejercicio_id = e.ejercicio_id
    WHERE re.rutina_id = ?
    ORDER BY re.orden ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $rutina_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        $response['ejercicios'][] = $fila;
    }
}

header('Content-Type: application/json');
echo json_encode($response);

?>
