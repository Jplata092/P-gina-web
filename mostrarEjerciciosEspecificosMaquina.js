document.addEventListener("DOMContentLoaded", function () {
    // Obtener el grupo muscular seleccionado desde localStorage
    const grupoMuscular = localStorage.getItem("grupoMuscularSeleccionado");

    // Verificar si el grupo muscular existe en localStorage
    if (!grupoMuscular) {
        console.error("No se encontró el grupo muscular seleccionado.");
        return;
    }
    
    // Cambiar el título dinámicamente según el grupo muscular seleccionado
    console.log("Grupo muscular seleccionado:", grupoMuscular);  // Depuración
    const tituloElement = document.getElementById("titulo");
    if (tituloElement) {
        tituloElement.textContent = grupoMuscular.charAt(0).toUpperCase() + grupoMuscular.slice(1);
    } else {
        console.error("Elemento con id 'titulo' no encontrado en el HTML.");
    }

    // Cargar los ejercicios específicos desde el JSON
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "obtener-ejercicios.php", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const ejercicios = JSON.parse(xhr.responseText);
            console.log("Ejercicios cargados desde JSON:", ejercicios);  // Depuración
            mostrarEjerciciosEspecificos(ejercicios, grupoMuscular);
        } else {
            console.error("Error al cargar los ejercicios:", xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Error al cargar el archivo JSON.");
    };

    xhr.send();
});

// Función para mostrar ejercicios específicos de un grupo muscular y de tipo 'maquina'
function mostrarEjerciciosEspecificos(ejercicios, grupoMuscular) {
    // Filtrar ejercicios para el grupo muscular específico y de tipo 'maquina'
    const ejerciciosFiltrados = ejercicios.filter(ej => ej.musculo === grupoMuscular && ej.tipo === "maquina");
    console.log("Ejercicios filtrados para mostrar (tipo maquina):", ejerciciosFiltrados);  // Depuración

    // Seleccionar el contenedor de la lista de ejercicios
    const contenedor = document.querySelector(".grid-ejercicios");

    if (!contenedor) {
        console.error("Contenedor de ejercicios no encontrado en el HTML.");
        return;
    }

    // Limpiar el contenedor antes de añadir nuevos elementos
    contenedor.innerHTML = "";

    // Si no hay ejercicios filtrados, mostrar un mensaje en consola
    if (ejerciciosFiltrados.length === 0) {
        console.warn("No se encontraron ejercicios de tipo 'maquina' para este grupo muscular.");
        return;
    }

    // Agregar cada ejercicio filtrado al contenedor
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

        const textContainer = document.createElement("div");
        textContainer.classList.add("text-container");
        textContainer.innerHTML = `<p>${ejercicio.nombre}</p>`;

        enlace.appendChild(img);
        li.appendChild(enlace);
        li.appendChild(textContainer);

        contenedor.appendChild(li);
    });
}

// Función para guardar el ejercicio seleccionado y redirigir
function guardarEjercicioYRedirigir(ejercicio) {
    localStorage.setItem("ejercicioSeleccionado", JSON.stringify(ejercicio));
    window.location.href = "Ventana_emergente.html";
}
