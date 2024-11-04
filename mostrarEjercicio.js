document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ejercicio seleccionado de localStorage
    const ejercicio = JSON.parse(localStorage.getItem("ejercicioSeleccionado"));

    if (ejercicio) {
        // Actualizar el título
        document.querySelector(".titulo-ejercicio").textContent = ejercicio.nombre;

        // Actualizar el video
        const videoContainer = document.querySelector(".video-container iframe");
        videoContainer.src = ejercicio.video.replace("watch?v=", "embed/");

        // Actualizar la descripción
        document.querySelector(".descripcion-ejercicio").textContent = ejercicio.descripcion;
    } else {
        console.error("No se encontró información del ejercicio en localStorage.");
    }
});
