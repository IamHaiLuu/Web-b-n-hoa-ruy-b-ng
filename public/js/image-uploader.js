document.querySelectorAll('[data-image-input]').forEach((input) => {
  const preview = document.querySelector(input.dataset.imageInput);
  if (!preview) {
    return;
  }

  input.addEventListener('change', () => {
    preview.innerHTML = '';
    Array.from(input.files || []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const item = document.createElement('div');
        item.className = 'aspect-square overflow-hidden rounded-2xl border border-borderSoft bg-cream-100';
        item.innerHTML = `<img src="${reader.result}" alt="${file.name}" class="h-full w-full object-cover">`;
        preview.appendChild(item);
      };
      reader.readAsDataURL(file);
    });
  });
});
