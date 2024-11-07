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

// Cargar y decodificar el archivo JSON
$jsonFile = 'exercises.json';
$jsonData = file_get_contents($jsonFile);
$ejercicios = json_decode($jsonData, true);

// Verificar que se haya decodificado correctamente el JSON
if ($ejercicios === null) {
    die("Error al decodificar el archivo JSON");
}

// Insertar cada ejercicio en la tabla
foreach ($ejercicios as $ejercicio) {
    $nombre = $conn->real_escape_string($ejercicio['nombre']);
    $imagen = $conn->real_escape_string($ejercicio['imagen']);
    $descripcion = $conn->real_escape_string($ejercicio['descripcion']);
    $video = $conn->real_escape_string($ejercicio['video']);
    $tipo = $conn->real_escape_string($ejercicio['tipo']);
    $musculo = $conn->real_escape_string($ejercicio['musculo']); // Paréntesis corregido aquí

    $sql = "INSERT INTO ejercicios (nombre, imagen, descripcion, video, tipo, musculo) 
            VALUES ('$nombre', '$imagen','$descripcion', '$video', '$tipo', '$musculo')";

    if (!$conn->query($sql)) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

echo "Datos insertados correctamente";
$conn->close();
?>
