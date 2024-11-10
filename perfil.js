// Función para cargar los datos del perfil del usuario
function cargarPerfil() {
    fetch("perfil.php") // Cambia "obtener_perfil.php" a "perfil.php"
        .then(response => {
            console.log("Estado de la respuesta:", response.status); // Mostrar el estado de la respuesta
            if (!response.ok) {
                throw new Error("No se pudo cargar el perfil.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data); // Verificar los datos recibidos

            if (data.error) {
                alert(data.error);
                window.location.href = "iniciar_sesion.html"; // Redirigir a inicio de sesión si no está autenticado
                return;
            }

            // Llenar el formulario con los datos del usuario
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("apellido").value = data.apellido;
            document.getElementById("correo").value = data.correo;
        })
        .catch(error => {
            console.error("Error al cargar el perfil:", error);
            alert("Hubo un error al cargar el perfil. Inténtalo de nuevo.");
        });
}

// Cargar el perfil al cargar la página
document.addEventListener("DOMContentLoaded", cargarPerfil);
