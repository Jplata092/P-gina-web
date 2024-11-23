function guardarEjercicioYRedirigir(ejercicio) {
    // Guardar los datos del ejercicio en localStorage
    localStorage.setItem("ejercicioSeleccionado", JSON.stringify(ejercicio));

    // Redirigir a la ventana emergente
    window.location.href = "Ventana_emergente.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const ejerciciosLista = document.getElementById("ejercicios-lista");

    function obtenerRutina() {
        fetch(`obtenerRutina.php`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener la rutina, código de respuesta: " + response.status);
                }
                return response.json(); // Convertir directamente en JSON
            })
            .then((data) => {
                console.log("Respuesta del servidor:", data); // Muestra la respuesta del servidor

                if (data.error) {
                    throw new Error(data.error);
                }

                const rutinaId = data.rutina_id; // Obtener rutina_id dinámicamente
                console.log("Rutina ID:", rutinaId); // Para depuración

                ejerciciosLista.innerHTML = ""; // Limpia la lista

                data.ejercicios.forEach((ejercicio) => {
                    const li = document.createElement("li");
                    li.classList.add("ejercicio");

                    const a = document.createElement("a");
                    a.href = "#"; // Enlace vacío
                    a.addEventListener("click", function () {
                        guardarEjercicioYRedirigir(ejercicio); // Llamada a la función
                    });

                    const img = document.createElement("img");

                    // Depurar la ruta generada
                    const rutaImagen = `${ejercicio.imagen}`;
                    console.log(`Ruta generada para la imagen: ${rutaImagen}`);

                    img.src = rutaImagen; // Asignar ruta a la imagen
                    img.alt = ejercicio.nombre;

                    // Manejo de errores al cargar la imagen
                    img.addEventListener("error", function () {
                        console.error(`Error al cargar la imagen: ${rutaImagen}`);
                        img.src = "Images/imagen-no-disponible.png"; // Imagen por defecto
                    });

                    // Crear contenedor de texto con solo el nombre
                    const textContainer = document.createElement("div");
                    textContainer.classList.add("text-container");

                    const nombre = document.createElement("p");
                    nombre.textContent = ejercicio.nombre;

                    textContainer.appendChild(nombre);

                    // Ensamblar los elementos
                    a.appendChild(img);
                    li.appendChild(a);
                    li.appendChild(textContainer);

                    ejerciciosLista.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    obtenerRutina();
});
