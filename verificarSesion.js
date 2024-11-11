document.addEventListener("DOMContentLoaded", function() {
    fetch("verificarSesion.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Verificación de sesión en index.html. Estado de la sesión:", data.sesionActiva);

            if (data.sesionActiva) {
                document.getElementById("misRutinas").style.display = "inline";
                document.getElementById("registro").style.display = "none";
                document.getElementById("inicioSesion").style.display = "none";
            }
        })
        .catch(error => console.error("Error al verificar la sesión:", error));
});
