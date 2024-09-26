    // JavaScript para manejar la apertura y cierre del modal
    var modal = document.getElementById("modalMapa");
    var btnDireccion = document.getElementById("direccion");
    var span = document.getElementsByClassName("close")[0];
    var mapaIframe = document.getElementById("mapaIframe");

    // Cuando el usuario hace clic en el enlace de dirección, abre el modal
    btnDireccion.onclick = function() {
        modal.style.display = "flex";
        // Añade aquí el enlace a la ubicación de Google Maps
        mapaIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9457.766420520426!2d-74.04680234424544!3d4.682646266667036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a977b6502c9%3A0x502b2e1ab14b506f!2sUniversidad%20Militar%20Nueva%20Granada!5e0!3m2!1ses!2sco!4v1727328063502!5m2!1ses!2sco";
    }

    // Cuando el usuario hace clic en la 'x', cierra el modal
    span.onclick = function() {
        modal.style.display = "none";
        mapaIframe.src = ""; // Limpia el src del iframe
    }

    // Cuando el usuario hace clic en cualquier lugar fuera del modal, ciérralo
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            mapaIframe.src = ""; // Limpia el src del iframe
        }
    }
