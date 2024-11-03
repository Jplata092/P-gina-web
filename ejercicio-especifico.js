// Cargar el JSON de ejercicios
fetch('ejercicios.json')
    .then(response => response.json())
    .then(data => {
        // Filtrar solo los ejercicios de hombro
        const ejerciciosHombro = data.filter(ejercicio => ejercicio.tipo.includes('hombro'));
        const ejerciciosContainer = document.getElementById('ejercicios-hombro');

        // Generar y agregar los ejercicios al contenedor
        ejerciciosHombro.forEach(ejercicio => {
            const ejercicioItem = document.createElement('li');
            ejercicioItem.classList.add('ejercicio');

            ejercicioItem.innerHTML = `
                <a href="${ejercicio.video}" target="_blank">
                    <img src="${ejercicio.imagen}" alt="${ejercicio.nombre}">
                </a>
                <div class="text-container"><p>${ejercicio.nombre}</p></div>
            `;

            ejerciciosContainer.appendChild(ejercicioItem);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
