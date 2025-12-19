const data = {
  retrato: {
    title: "Retrato",
    desc: "Fotografía de retrato profesional",
    image: "assets/images/retrato/retrato1.jpeg",
    photos: [
      "assets/images/retrato/retrato1.jpeg",
      "assets/images/retrato/retrato2.jpeg",
      "assets/images/retrato/retrato3.jpeg",
      "assets/images/retrato/retrato4.jpeg",
      "assets/images/retrato/retrato5.jpeg",
      "assets/images/retrato/retrato6.jpeg",
    ],
  },
  paisaje: {
    title: "Paisaje",
    desc: "Fotografía de paisajes impresionantes",
    image: "assets/images/paisaje/paisaje1.jpg",
    photos: [
      "assets/images/paisaje/paisaje1.jpg",
      "assets/images/paisaje/paisaje2.jpeg",
      "assets/images/paisaje/paisaje3.jpeg",
    ],
  },
  fauna: {
    title: "Fauna",
    desc: "Fotografía de animales en su hábitat natural",
    image: "assets/images/fauna/fauna1.jpg",
    photos: [
      "assets/images/fauna/fauna1.jpg",
      "assets/images/fauna/fauna2.jpeg",
    ],
  },
  astrofotografia: {
    title: "Astrofotografía",
    desc: "Fotografía del cielo y el universo",
    image: "assets/images/astro/astro1.jpg",
    photos: [
      "assets/images/astro/astro1.jpg",
      "assets/images/astro/astro1.jpg",
    ],
  },
  deporte: {
    title: "Deporte",
    desc: "Capturas de deportes y acción",
    image: "assets/images/deporte/deporte1.jpeg",
    photos: [
      "assets/images/deporte/deporte1.jpeg",
      "assets/images/deporte/deporte2.jpeg",
    ],
  },
};

const params = new URLSearchParams(window.location.search);
const category = params.get("cat");

if (data[category]) {
  const cat = data[category];

  document.getElementById("categoryTitle").textContent = cat.title;
  document.getElementById("categoryDesc").textContent = cat.desc;
  document.getElementById("categoryImage").src = cat.image;

  const slider = document.querySelector(".slick-slider");
  const gallery = document.querySelector(".gallery");

  cat.photos.forEach((photo) => {
    // Carrusel sin lightbox
    slider.innerHTML += `
    <div>
      <img src="${photo}"
        class="w-full h-96 object-cover cursor-default">
    </div>`;

    // Galería con lightbox
    gallery.innerHTML += `
    <img src="${photo}"
      class="w-full mb-8 break-inside-avoid cursor-zoom-in gallery-img gallery-item
      opacity-0 translate-y-8 scale-95
      transition-all duration-700 ease-out"
      data-full="${photo}">`;
  });

  $(document).ready(() => {
    $(".slick-slider").slick({
      dots: true,
      infinite: true,
      fade: true,
      slidesToScroll: 1,
      speed: 1600,
      autoplay: true,
      autoplaySpeed: 3500,
      pauseOnHover: true,
      pauseOnFocus: false,
      cssEase: "ease-in-out",
    });
  });

  // Marcar el enlace activo en la navegación
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    const linkCategory = link.href.split("=")[1]; // Obtener la categoría del enlace
    if (linkCategory === category) {
      link.classList.add("active"); // Agregar clase active al enlace correspondiente
    }
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

// Abrir lightbox
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery-img")) {
    lightboxImg.src = e.target.dataset.full;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden"; // bloquear scroll
  }
});

// Cerrar lightbox
lightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");
  lightboxImg.src = "";
  document.body.style.overflow = "";
});

// Animación de entrada galería
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-8", "scale-95");
        entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
        galleryObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
galleryItems.forEach((item) => galleryObserver.observe(item));
