function guardarEjercicioYRedirigir(ejercicio) {
    // Guardar los datos del ejercicio en localStorage
    localStorage.setItem("ejercicioSeleccionado", JSON.stringify(ejercicio));

    // Redirigir a la ventana emergente
    window.location.href = "Ventana_emergente.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const ejerciciosLista = document.getElementById("ejercicios-lista");

    // Función para eliminar ejercicio de la rutina
    function eliminarEjercicio(ejercicioId) {
        fetch(`eliminarEjercicio.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ejercicioId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al eliminar el ejercicio.");
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    alert("Ejercicio eliminado con éxito.");
                    obtenerRutina(); // Recargar la lista de ejercicios
                } else {
                    console.error(data.error);
                    alert("No se pudo eliminar el ejercicio.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Ocurrió un error al intentar eliminar el ejercicio.");
            });
    }

    function obtenerRutina() {
        fetch(`obtenerRutina.php`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener la rutina, código de respuesta: " + response.status);
                }
                return response.json(); // Convertir directamente en JSON
            })
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }

                ejerciciosLista.innerHTML = ""; // Limpia la lista

                data.ejercicios.forEach((ejercicio) => {
                    const li = document.createElement("li");
                    li.classList.add("ejercicio");

                    const a = document.createElement("a");
                    a.href = "#";
                    a.addEventListener("click", function () {
                        guardarEjercicioYRedirigir(ejercicio);
                    });

                    const img = document.createElement("img");
                    img.src = `${ejercicio.imagen}`;
                    img.alt = ejercicio.nombre;
                    img.addEventListener("error", function () {
                        img.src = "Images/imagen-no-disponible.png";
                    });

                    const textContainer = document.createElement("div");
                    textContainer.classList.add("text-container");
                    const nombre = document.createElement("p");
                    nombre.textContent = ejercicio.nombre;
                    textContainer.appendChild(nombre);

                    const removeButton = document.createElement("div");
                    removeButton.classList.add("remove-exercise");
                    removeButton.textContent = "Eliminar ejercicio";
                    removeButton.addEventListener("click", function () {
                        eliminarEjercicio(ejercicio.ejercicio_id);
                    });

                    // Ensamblar los elementos
                    a.appendChild(img);
                    li.appendChild(a);
                    li.appendChild(textContainer);
                    li.appendChild(removeButton);

                    ejerciciosLista.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    obtenerRutina();
});
