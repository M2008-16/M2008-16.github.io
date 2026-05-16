// Espera a que el DOM esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Menú móvil: insertar botón hamburguesa dinámicamente (no modificar HTML)
    (function attachDynamicNavToggle() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        const navLinks = nav.querySelector('.nav-links');
        if (!navLinks) return;

        // Evitar insertar varias veces
        if (nav.querySelector('.nav-toggle')) return;

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.setAttribute('aria-expanded', 'false');
        const span = document.createElement('span');
        span.className = 'hamburger';
        toggle.appendChild(span);

        // Insertar antes de la lista de enlaces
        nav.insertBefore(toggle, navLinks);

        function openMenu(open) {
            navLinks.classList.toggle('open', open);
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(!!open));
            document.body.style.overflow = open ? 'hidden' : '';
        }

        toggle.addEventListener('click', () => {
            openMenu(!navLinks.classList.contains('open'));
        });

        // Cerrar menú al pulsar un enlace
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') openMenu(false);
        });

        // Responder a cambios de tamaño: en pantallas grandes asegurar menú visible
        function onResize() {
            if (window.innerWidth > 900) {
                navLinks.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }

        window.addEventListener('resize', onResize);
        // comprobar al inicio
        onResize();
    })();

    // Selecciona todas las diapositivas del carrusel
    const slides = document.querySelectorAll(".mv-slide");
    // Selecciona el botón para ir a la siguiente diapositiva
    const nextBtn = document.querySelector(".next");
    // Selecciona el botón para ir a la diapositiva anterior
    const prevBtn = document.querySelector(".prev");

    // Índice de la diapositiva actual
    let current = 0;

    // Muestra la diapositiva indicada y oculta las demás
    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    // Avanza a la siguiente diapositiva al hacer clic
    nextBtn.addEventListener("click", () => {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide(current);

    });

    // Retrocede a la diapositiva anterior al hacer clic
    prevBtn.addEventListener("click", () => {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

        showSlide(current);

    });

});