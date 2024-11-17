document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ejercicio seleccionado de localStorage
    const ejercicio = JSON.parse(localStorage.getItem("ejercicioSeleccionado"));

    if (ejercicio) {
        console.log("Ejercicio en localStorage:", ejercicio);  // Verifica si el objeto existe y contiene un ID
        // Actualizar el título
        document.querySelector(".titulo-ejercicio").textContent = ejercicio.nombre;

        // Actualizar el video
        const videoContainer = document.querySelector(".video-container iframe");
        videoContainer.src = ejercicio.video.replace("watch?v=", "embed/");

        // Actualizar la descripción
        document.querySelector(".descripcion-ejercicio").textContent = ejercicio.descripcion;

        // Capturar el evento click del botón
        document.querySelector(".add-exercise").addEventListener("click", function () {
            if (!ejercicio.ejercicio_id) {
                console.error("El ejercicio no tiene un ID.");
                return;
            }

            // Datos a enviar al servidor
            const data = {
                ejercicio_id: ejercicio.ejercicio_id // Asegúrate de que `ejercicio.id` exista en localStorage
            };

            // Enviar la solicitud al servidor
            fetch("agregarEjercicio.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        alert("Ejercicio agregado exitosamente a la rutina.");
                    } else {
                        alert("Error al agregar el ejercicio: " + result.message);
                    }
                })
                .catch((error) => {
                    console.error("Error en la solicitud:", error);
                });
        });
    } else {
        console.error("No se encontró información del ejercicio en localStorage.");
    }
});
