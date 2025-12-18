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
