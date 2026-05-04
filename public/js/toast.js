document.querySelectorAll('[data-toast]').forEach((toast) => {
  const close = toast.querySelector('[data-toast-close]');
  const timer = window.setTimeout(() => toast.remove(), 5200);

  if (close) {
    close.addEventListener('click', () => {
      window.clearTimeout(timer);
      toast.remove();
    });
  }
});
