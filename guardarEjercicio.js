function guardarEjercicioYRedirigir(ejercicio) {
    // Guardar los datos del ejercicio en localStorage
    localStorage.setItem("ejercicioSeleccionado", JSON.stringify(ejercicio));

    // Redirigir a la ventana emergente
    window.location.href = "Ventana_emergente.html";
}
