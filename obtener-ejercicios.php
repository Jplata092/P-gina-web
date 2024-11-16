<?php
include 'conexion.php';

$sql = "SELECT ejercicio_id, nombre, imagen, descripcion, video, tipo, musculo FROM ejercicios";
$result = $conn->query($sql);

$ejercicios = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $ejercicios[] = [
            'ejercicio_id' => $row['ejercicio_id'],
            'nombre' => $row['nombre'],
            'imagen' => $row['imagen'],
            'descripcion' => $row['descripcion'],
            'video' => $row['video'],
            'tipo' => $row['tipo'],
            'musculo' => $row['musculo'
            ]
        ];
    }
}


header('Content-Type: application/json');
echo json_encode($ejercicios);

$conn->close();
?>
