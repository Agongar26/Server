// Comportamiento del menú

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

let isOpen = false;

menuBtn?.addEventListener('click', () => {
  isOpen = !isOpen;

  if (isOpen) {
    mobileMenu.classList.remove('max-h-0', 'opacity-0');
    mobileMenu.classList.add('max-h-screen', 'opacity-100');
    menuBtn.textContent = '✕';
  } else {
    mobileMenu.classList.add('max-h-0', 'opacity-0');
    mobileMenu.classList.remove('max-h-screen', 'opacity-100');
    menuBtn.textContent = '☰';
  }
});

// Animación de las tarjetas de las categorías

const categoryCards = document.querySelectorAll('.category-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          'opacity-0',
          'translate-y-10',
          'scale-95'
        );
        entry.target.classList.add(
          'opacity-100',
          'translate-y-0',
          'scale-100'
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

categoryCards.forEach((card) => observer.observe(card));