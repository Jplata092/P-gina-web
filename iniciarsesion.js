document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita la recarga de la página

    let formData = new FormData(this);

    fetch("iniciarsesion.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const mensajeDiv = document.getElementById("mensaje");

        if (data.includes("Éxito")) {
            // Redirige al perfil si el inicio de sesión fue exitoso
            window.location.href = "perfil.html";
        } else {
            // Muestra el mensaje de error
            mensajeDiv.innerText = data;
        }
    })
    .catch(error => {
        const mensajeDiv = document.getElementById("mensaje");
        mensajeDiv.innerText = "Hubo un problema con el inicio de sesión.";
    });
});
