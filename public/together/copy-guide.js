(() => {
  const guide = document.querySelector('.cg-guide');
  if (!guide) return;
  const buttons = [...document.querySelectorAll('[data-tone]')];
  const panels = [...document.querySelectorAll('[data-tone-panel]')];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
      for (const panel of panels) panel.hidden = panel.dataset.tonePanel !== button.dataset.tone;
    });
  }
  guide.addEventListener('click', async event => {
    const button = event.target.closest('button[data-copy-example]');
    if (!button) return;
    const source = document.getElementById(button.dataset.copyExample);
    const feedback = button.nextElementSibling;
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      feedback.textContent = 'Copied.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(source);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = 'Text selected. Use your device’s copy shortcut.';
    }
  });
})();
