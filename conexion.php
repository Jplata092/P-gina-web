<?php
// Configuración de la base de datos
$servername = "sql102.infinityfree.com";
$username = "if0_37671919";
$password = "VQ1kT4KNE6";
$database = "if0_37671919_tutosgym";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Establece el conjunto de caracteres a UTF-8
$conn->set_charset("utf8mb4");

?>