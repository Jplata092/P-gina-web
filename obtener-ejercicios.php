<?php
include 'conexion.php';

$sql = "SELECT nombre, imagen, tipo FROM ejercicios";
$result = $conn->query($sql);

$ejercicios = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $ejercicios[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($ejercicios);

$conn->close();
?>
