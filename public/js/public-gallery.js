document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const mainImage = gallery.querySelector('[data-gallery-main]');
  const buttons = gallery.querySelectorAll('[data-gallery-thumb]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const imageUrl = button.dataset.imageUrl;
      const imageAlt = button.dataset.imageAlt || '';
      if (!mainImage || !imageUrl) {
        return;
      }

      mainImage.src = imageUrl;
      mainImage.alt = imageAlt;
      buttons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
    });
  });
});
