const sidebar = document.querySelector('[data-admin-sidebar]');
const overlay = document.querySelector('[data-sidebar-overlay]');
const openButton = document.querySelector('[data-sidebar-open]');
const closeButtons = document.querySelectorAll('[data-sidebar-close]');

function setSidebarOpen(isOpen) {
  if (!sidebar || !overlay) {
    return;
  }

  sidebar.classList.toggle('-translate-x-full', !isOpen);
  sidebar.classList.toggle('translate-x-0', isOpen);
  overlay.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('overflow-hidden', isOpen);

  if (openButton) {
    openButton.setAttribute('aria-expanded', String(isOpen));
  }
}

openButton?.addEventListener('click', () => setSidebarOpen(true));
overlay?.addEventListener('click', () => setSidebarOpen(false));
closeButtons.forEach((button) => {
  button.addEventListener('click', () => setSidebarOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setSidebarOpen(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    setSidebarOpen(false);
  }
});
