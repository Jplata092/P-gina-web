// Función para cargar ejercicios desde el JSON
function cargarEjercicios(tipo) {
    fetch('ejercicios.json')
        .then(response => response.json())
        .then(data => {
            // Filtra los ejercicios del tipo seleccionado (hombro, pecho, etc.)
            const ejerciciosFiltrados = data.filter(ejercicio => ejercicio.tipo.includes(tipo));
            mostrarEjercicios(ejerciciosFiltrados, tipo);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

// Función para mostrar los ejercicios en la página
function mostrarEjercicios(ejercicios, tipo) {
    // Selecciona el contenedor de la sección correspondiente
    const contenedor = document.querySelector(`.grid-ejercicios[data-tipo="${tipo}"]`);
    
    // Limpia el contenedor antes de agregar nuevos ejercicios
    contenedor.innerHTML = '';

    // Itera sobre los ejercicios filtrados y agrega cada imagen al contenedor
    ejercicios.forEach(ejercicio => {
        const ejercicioItem = document.createElement('li');
        ejercicioItem.classList.add('ejercicio');

        ejercicioItem.innerHTML = `
            <a href="${ejercicio.video}" target="_blank">
                <img src="${ejercicio.imagen}" alt="${ejercicio.nombre}">
            </a>
        `;

        contenedor.appendChild(ejercicioItem);
    });
}

// Asocia eventos de clic a cada botón de agregar ejercicio
document.querySelectorAll('.add-ejercicio').forEach(boton => {
    boton.addEventListener('click', event => {
        event.preventDefault();
        const tipo = boton.getAttribute('data-tipo'); // Obtiene el tipo (hombro, pecho, etc.)
        cargarEjercicios(tipo);
    });
});
