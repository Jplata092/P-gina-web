// Función para cargar y mostrar ejercicios en función del tipo y grupo muscular
function cargarEjercicios() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "obtener-ejercicios.php", true); // Cambiado al endpoint PHP

    xhr.onload = function () {
        if (xhr.status === 200) {
            const ejercicios = JSON.parse(xhr.responseText);

            // Filtrar y mostrar ejercicios para cada grupo muscular y tipo de ejercicio
            mostrarEjerciciosPorGrupo(ejercicios, "nomaquina", "pecho");
            mostrarEjerciciosPorGrupo(ejercicios, "nomaquina", "hombro");
            mostrarEjerciciosPorGrupo(ejercicios, "nomaquina", "brazo");
            mostrarEjerciciosPorGrupo(ejercicios, "nomaquina", "espalda");
            mostrarEjerciciosPorGrupo(ejercicios, "nomaquina", "pierna");
            mostrarEjerciciosPorGrupo(ejercicios, "nomaquina", "abdomen");
        }
    };

    xhr.onerror = function () {
        console.error("Error al cargar el archivo JSON.");
    };

    xhr.send();
}

// Función para mostrar ejercicios filtrados por tipo y grupo muscular
function mostrarEjerciciosPorGrupo(ejercicios, tipo, musculo) {
    const ejerciciosFiltrados = ejercicios.filter(ej => ej.tipo === tipo && ej.musculo === musculo).slice(0, 5);
    const contenedor = document.querySelector(`#${musculo} .grid-ejercicios`);
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

        contenedor.insertBefore(li, ejercicioAdd);
    });

    // Añadir evento al botón 'ejercicio-add' para redirigir con el grupo muscular
    ejercicioAdd.addEventListener("click", function () {
        guardarGrupoMuscularYRedirigir(musculo);
    });
}

// Función para guardar el grupo muscular y redirigir
function guardarGrupoMuscularYRedirigir(musculo) {
    // Guardar el grupo muscular en localStorage
    localStorage.setItem("grupoMuscularSeleccionado", musculo);

    // Redirigir a la página de ejercicios específicos
    window.location.href = "Ejercicios-especifico.html";
}

// Función para guardar el ejercicio seleccionado y redirigir
function guardarEjercicioYRedirigir(ejercicio) {
    localStorage.setItem("ejercicioSeleccionado", JSON.stringify(ejercicio));
    window.location.href = "Ventana_emergente.html";
}

document.addEventListener("DOMContentLoaded", cargarEjercicios);
