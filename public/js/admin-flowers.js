document.querySelectorAll('[data-confirm-submit]').forEach((button) => {
  button.addEventListener('click', (event) => {
    const message = button.dataset.confirmSubmit || 'Bạn chắc chắn muốn tiếp tục?';
    if (!window.confirm(message)) {
      event.preventDefault();
    }
  });
});
