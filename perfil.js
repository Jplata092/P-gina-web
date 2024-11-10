document.addEventListener("DOMContentLoaded", () => {
    // Cargar el perfil del usuario
    cargarPerfil();

    // Manejar el cierre de sesión
    document.getElementById("cerrarSesion").addEventListener("click", () => {
        // Redirigir a cerrarsesion.php para cerrar la sesión
        window.location.href = "cerrarsesion.php";
    });
});

// Función para cargar los datos del perfil del usuario
function cargarPerfil() {
    fetch("perfil.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el perfil.");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.href = "Iniciar sesion.html";
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

document.addEventListener("DOMContentLoaded", () => {
    // Cargar el perfil del usuario
    cargarPerfil();

    // Manejar el cierre de sesión
    document.getElementById("cerrarSesion").addEventListener("click", () => {
        console.log("Botón de cerrar sesión presionado"); // Mensaje de depuración

        // Redirigir a cerrarsesion.php para cerrar la sesión
        window.location.href = "cerrarsesion.php";
    });
});
