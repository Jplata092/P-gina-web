// Función para cargar y mostrar ejercicios en función del tipo y grupo muscular
function cargarEjercicios() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "exercises.json", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const ejercicios = JSON.parse(xhr.responseText);

            // Filtrar y mostrar ejercicios para cada grupo muscular y tipo de ejercicio
            mostrarEjerciciosPorGrupo(ejercicios, "maquina", "pecho");
            mostrarEjerciciosPorGrupo(ejercicios, "maquina", "hombro");
            mostrarEjerciciosPorGrupo(ejercicios, "maquina", "brazo");
            mostrarEjerciciosPorGrupo(ejercicios, "maquina", "espalda");
            mostrarEjerciciosPorGrupo(ejercicios, "maquina", "pierna");
            mostrarEjerciciosPorGrupo(ejercicios, "maquina", "abdomen");

        }
    };

    xhr.onerror = function () {
        console.error("Error al cargar el archivo JSON.");
    };

    xhr.send();
}

// Función para mostrar ejercicios filtrados por tipo y grupo muscular
function mostrarEjerciciosPorGrupo(ejercicios, tipo, musculo) {
    // Filtrar ejercicios según el tipo y el grupo muscular y limitar a los primeros 5
    const ejerciciosFiltrados = ejercicios.filter(ej => ej.tipo === tipo && ej.musculo === musculo).slice(0, 5);

    // Seleccionar el contenedor específico según el grupo muscular
    const contenedor = document.querySelector(`#${musculo} .grid-ejercicios`);

    // Referencia al elemento 'ejercicio-add' para mantenerlo al final
    const ejercicioAdd = contenedor.querySelector(".ejercicio-add");

    ejerciciosFiltrados.forEach(ejercicio => {
        const li = document.createElement("li");
        li.classList.add("ejercicio");

        const enlace = document.createElement("a");
        enlace.href = "#";
        enlace.addEventListener("click", function () {
            guardarEjercicioYRedirigir(ejercicio);
        });

        const img = document.createElement("img");
        img.src = ejercicio.imagen;
        img.alt = ejercicio.nombre;

        enlace.appendChild(img);
        li.appendChild(enlace);

        // Insertar antes de 'ejercicio-add' para mantenerlo al final
        contenedor.insertBefore(li, ejercicioAdd);
    });
}

// Función para guardar el ejercicio seleccionado y redirigir
function guardarEjercicioYRedirigir(ejercicio) {
    // Guardar los datos del ejercicio en localStorage
    localStorage.setItem("ejercicioSeleccionado", JSON.stringify(ejercicio));

    // Redirigir a la ventana emergente
    window.location.href = "Ventana_emergente.html";
}

// Ejecutar la función para cargar ejercicios al cargar la página
document.addEventListener("DOMContentLoaded", cargarEjercicios);
