for (const lesson of document.querySelectorAll('[data-layout-lesson]')) {
  const toolbar = lesson.querySelector('[data-layout-settings]');
  const fit = lesson.querySelector('[data-layout-fit]');
  const canvas = lesson.querySelector('[data-layout-canvas]');
  const view = lesson.querySelector('[data-layout-view]');
  const width = lesson.querySelector('[data-layout-width]');
  const output = lesson.querySelector('[data-layout-size]');
  const toggle = lesson.querySelector('[data-layout-overlay]');
  const overlay = lesson.querySelector('.columns-overlay');
  let requestedWidth = Number(width.max);

  if (overlay) {
    overlay.replaceChildren(...Array.from({length: 12}, () => document.createElement('span')));
    toggle.addEventListener('change', () => canvas.toggleAttribute('data-show-grid', toggle.checked));
  }
  function reflow() {
    const style = getComputedStyle(fit);
    const available = Math.floor(fit.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
    if (available < 1) return;
    width.max = Math.min(1120, available);
    width.min = Math.min(280, Number(width.max));
    width.value = Math.min(requestedWidth, Number(width.max));
    width.disabled = width.min === width.max;
    canvas.style.setProperty('--preview-width', width.value + 'px');
    const columns = getComputedStyle(view).getPropertyValue('--columns').trim();
    output.textContent = overlay ? width.value + ' px · ' + columns + ' columns' : width.value + ' px';
  }
  width.addEventListener('input', () => {
    requestedWidth = Number(width.value);
    reflow();
  });
  toolbar.hidden = false;
  new ResizeObserver(reflow).observe(fit);
  reflow();
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
