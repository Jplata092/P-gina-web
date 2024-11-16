function cargarEjercicios() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "obtener-ejercicios.php", true); // Cambiado al endpoint PHP

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const ejercicios = JSON.parse(xhr.responseText);

                // Filtrar ejercicios de tipo 'maquina' y seleccionar los primeros 5
                const ejerciciosMaquina = ejercicios.filter(ej => ej.tipo === "maquina").slice(0, 5);
                const contenedorMaquina = document.querySelector(".ejercicios-con-maquina .grid-ejercicios");
                const ejercicioAddMaquina = document.querySelector(".ejercicios-con-maquina .ejercicio-add");

                ejerciciosMaquina.forEach(ejercicio => {
                    const li = document.createElement("li");
                    li.classList.add("ejercicio");

                    const enlace = document.createElement("a");
                    enlace.href = "#"; // Enlace vacío, el clic será manejado con JavaScript
                    enlace.addEventListener("click", function () {
                        guardarEjercicioYRedirigir(ejercicio);
                    });

                    const img = document.createElement("img");
                    img.src = ejercicio.imagen;
                    img.alt = ejercicio.nombre;

                    enlace.appendChild(img);
                    li.appendChild(enlace);
                    contenedorMaquina.insertBefore(li, ejercicioAddMaquina);
                });

                // Filtrar ejercicios de tipo 'nomaquina' y seleccionar los primeros 5
                const ejerciciosSinMaquina = ejercicios.filter(ej => ej.tipo === "nomaquina").slice(0, 5);
                const contenedorSinMaquina = document.querySelector(".ejercicios-sin-maquina .grid-ejercicios");
                const ejercicioAddSinMaquina = document.querySelector(".ejercicios-sin-maquina .ejercicio-add");

                ejerciciosSinMaquina.forEach(ejercicio => {
                    const li = document.createElement("li");
                    li.classList.add("ejercicio");

                    const enlace = document.createElement("a");
                    enlace.href = "#"; // Enlace vacío
                    enlace.addEventListener("click", function () {
                        guardarEjercicioYRedirigir(ejercicio);
                    });

                    const img = document.createElement("img");
                    img.src = ejercicio.imagen;
                    img.alt = ejercicio.nombre;

                    enlace.appendChild(img);
                    li.appendChild(enlace);
                    contenedorSinMaquina.insertBefore(li, ejercicioAddSinMaquina);
                });
            } catch (error) {
                console.error("Error al procesar los datos:", error);
            }
        } else {
            console.error("Error en la solicitud:", xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error("Error en la solicitud al servidor.");
    };

    xhr.send();
}

document.addEventListener("DOMContentLoaded", cargarEjercicios);
