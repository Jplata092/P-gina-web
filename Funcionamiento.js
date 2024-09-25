document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");

    // Mostrar la primera imagen
    showSlides(slideIndex);

    // Evento para el botón "Siguiente"
    nextButton.addEventListener("click", () => {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlides(slideIndex);
    });

    // Evento para el botón "Anterior"
    prevButton.addEventListener("click", () => {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlides(slideIndex);
    });

    // Cambio automático de imágenes
    setInterval(() => {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlides(slideIndex);
    }, 3000); // Cambia cada 3 segundos

    // Función para mostrar la imagen correspondiente
    function showSlides(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${-100 * index}%)`;
        });
    }
});
