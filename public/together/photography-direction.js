(() => {
  const preview = document.querySelector('#crop-photo');
  const caption = document.querySelector('#crop-caption');
  const options = document.querySelectorAll('[data-crop]');
  for (const option of options) {
    option.addEventListener('click', () => {
      const phone = option.dataset.crop === 'phone';
      for (const button of options) button.setAttribute('aria-pressed', String(button === option));
      preview.classList.toggle('phone', phone);
      caption.textContent = phone ? 'Phone · 1.52:1' : 'Desktop · 2.30:1';
    });
  }
})();
