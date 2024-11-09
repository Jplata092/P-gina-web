document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Esto previene la recarga de la página

    let formData = new FormData(this);

    fetch("registro.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const mensajeDiv = document.getElementById("mensaje");
        mensajeDiv.style.display = "block";
        mensajeDiv.innerText = data;
        mensajeDiv.style.color = data.includes("exitoso") ? "green" : "red";

        if (data.includes("exitoso")) {
            document.getElementById("registroForm").reset();
        }
    })
    .catch(error => {
        const mensajeDiv = document.getElementById("mensaje");
        mensajeDiv.style.display = "block";
        mensajeDiv.innerText = "Hubo un problema con el registro.";
        mensajeDiv.style.color = "red";
    });

    event.preventDefault();
console.log("Formulario enviado con AJAX"); // Esto debe aparecer en la consola

});

