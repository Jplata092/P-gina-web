<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Definir una respuesta que será devuelta en formato JSON
$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $video = $_POST['video'];
    $tipo = $_POST['tipo']; // Este valor debe obtenerse del formulario
    $musculo = $_POST['musculo']; // Lo mismo que el tipo, debe venir del formulario o alguna variable
    
    // Manejo del archivo de imagen
    $imagen = "";
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
        // Definir el directorio base donde se guardarán las imágenes
        $uploadBaseDir = 'Images/';
        
        // Determinar si el ejercicio es con máquina o sin máquina
        $categoria = ($tipo == 'maquina') ? 'con_maquina' : 'sin_maquina';
        
        // Crear la ruta completa donde se guardará la imagen según el tipo de ejercicio y músculo
        $uploadDir = $uploadBaseDir . $categoria . '/' . $musculo . '/';
        
        // Verificar si la carpeta existe, si no la crea
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Ruta final para guardar la imagen
        $uploadFile = $uploadDir . basename($_FILES['imagen']['name']);

        // Verificar el tipo de archivo (por ejemplo, solo permitir imágenes)
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (in_array($_FILES['imagen']['type'], $allowedTypes)) {
            // Mover la imagen del directorio temporal al directorio de destino
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadFile)) {
                $imagen = $uploadFile; // Guardar el path relativo de la imagen
            } else {
                $response['error'] = "Error al cargar la imagen.";
                echo json_encode($response); // Enviar respuesta y detener ejecución
                exit;
            }
        } else {
            $response['error'] = "Tipo de archivo no permitido.";
            echo json_encode($response); // Enviar respuesta y detener ejecución
            exit;
        }
    }

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO ejercicios (nombre, imagen, descripcion, video, tipo, musculo) 
            VALUES (?, ?, ?, ?, ?, ?)";

    // Preparar y ejecutar la consulta
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssssss", $nombre, $imagen, $descripcion, $video, $tipo, $musculo);
        
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Ejercicio creado exitosamente
            $response['success'] = "Ejercicio agregado correctamente.";
        } else {
            // Error al insertar
            $response['error'] = "Error al agregar el ejercicio: " . $stmt->error;
        }
        $stmt->close();
    } else {
        // Error al preparar la consulta
        $response['error'] = "Error al preparar la consulta: " . $conn->error;
    }
    
    // Cerrar la conexión
    $conn->close();
} else {
    // Si no es una solicitud POST
    $response['error'] = "Por favor, envíe el formulario correctamente.";
}

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
