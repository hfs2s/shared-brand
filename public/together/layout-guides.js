for (const lesson of document.querySelectorAll('[data-layout-lesson]')) {
  const toolbar = lesson.querySelector('[data-layout-settings]');
  const fit = lesson.querySelector('[data-layout-fit]');
  const view = lesson.querySelector('[data-layout-view]');
  const width = lesson.querySelector('[data-layout-width]');
  const output = lesson.querySelector('[data-layout-size]');
  const toggle = lesson.querySelector('[data-layout-overlay]');
  const canvases = [...lesson.querySelectorAll('[data-layout-canvas]')];
  const presets = [...lesson.querySelectorAll('[data-layout-preset]')];
  let requestedWidth = Number(width.max);

  if (toggle) {
    for (const overlay of lesson.querySelectorAll('.columns-overlay')) {
      overlay.replaceChildren(...Array.from({length: 12}, () => document.createElement('span')));
    }
    toggle.addEventListener('change', () => {
      for (const canvas of canvases) canvas.toggleAttribute('data-show-grid', toggle.checked);
    });
  }
  function reflow() {
    const style = getComputedStyle(fit);
    const available = Math.floor(fit.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
    if (available < 1) return;
    width.max = Math.min(1120, available);
    width.min = Math.min(280, Number(width.max));
    width.value = Math.min(requestedWidth, Number(width.max));
    width.disabled = width.min === width.max;
    fit.style.setProperty('--preview-width', width.value + 'px');
    for (const preset of presets) {
      preset.disabled = Number(preset.dataset.layoutPreset) > Number(width.max);
      preset.setAttribute('aria-pressed', String(preset.dataset.layoutPreset === width.value));
    }
    const columns = getComputedStyle(view).getPropertyValue('--columns').trim();
    output.textContent = toggle ? width.value + ' px · ' + columns + ' columns' : width.value + ' px';
  }
  width.addEventListener('input', () => {
    requestedWidth = Number(width.value);
    reflow();
  });
  for (const preset of presets) {
    preset.addEventListener('click', () => {
      requestedWidth = Number(preset.dataset.layoutPreset);
      reflow();
    });
  }
  toolbar.hidden = false;
  new ResizeObserver(reflow).observe(fit);
  reflow();
}

for (const form of document.querySelectorAll('[data-layout-form]')) {
  const preview = form.closest('[data-layout-view]');
  const access = form.elements.access;
  const summary = preview.querySelector('[data-layout-access]');
  const status = form.querySelector('[role="status"]');
  form.querySelector('button').disabled = false;
  access.addEventListener('change', () => {
    summary.textContent = access.value === 'invited'
      ? 'Invited people join with the address on their invitation.'
      : 'Anyone in the workspace can join this room.';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = 'Preview settings saved for ' + form.elements.room.value + '.';
  });
}

const brandTopics = document.querySelector('.brand-overview .document-tabrail');
if (brandTopics) {
  const phone = matchMedia('(max-width:650px)');
  const topicLinks = [...brandTopics.querySelectorAll('[role="tab"]')];
  function revealTopic() {
    if (!phone.matches || !topicLinks.some(link => link.hash === location.hash)) return;
    requestAnimationFrame(() => brandTopics.scrollIntoView({block: 'start'}));
  }
  revealTopic();
  window.addEventListener('hashchange', revealTopic);
}
