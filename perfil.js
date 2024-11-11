document.addEventListener("DOMContentLoaded", () => {
    // Primero, verifica si la sesión está activa
    verificarSesion().then(sesionActiva => {
        if (sesionActiva) {
            // Si la sesión está activa, carga el perfil del usuario
            cargarPerfil();

            // Manejar el cierre de sesión
            const cerrarSesionButton = document.getElementById("cerrarSesion");
            if (cerrarSesionButton) {
                cerrarSesionButton.addEventListener("click", () => {
                    window.location.href = "cerrarsesion.php";
                });
            }
        }
        // Si la sesión no está activa, no hace nada y no intenta cargar el perfil
    }).catch(error => {
        console.error("Error al verificar la sesión:", error);
    });
});

// Función para verificar si la sesión está activa
function verificarSesion() {
    return fetch("verificarSesion.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo verificar la sesión.");
            }
            return response.json();
        })
        .then(data => {
            return data.sesionActiva; // Retorna verdadero o falso según el estado de la sesión
        });
}

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
            // Llenar el formulario con los datos del usuario si los elementos existen
            const nombreInput = document.getElementById("nombre");
            const apellidoInput = document.getElementById("apellido");
            const correoInput = document.getElementById("correo");

            if (nombreInput) nombreInput.value = data.nombre;
            if (apellidoInput) apellidoInput.value = data.apellido;
            if (correoInput) correoInput.value = data.correo;
        })
        .catch(error => {
            console.error("Error al cargar el perfil:", error);
        });
}
