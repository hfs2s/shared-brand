(() => {
  const tabs = [...document.querySelectorAll('[data-document-menu] [role="tab"]')];
  const hero = document.querySelector('.artifact-hero');
  let current;
  const activateTab = () => {
    const hash = (location.hash || '#report').replace(/^#panel-/, '#');
    const selected = tabs.find(tab => tab.hash === hash) || tabs[0];
    for (const tab of tabs) {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    }
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (current && current !== selected && heroBottom < 0) {
      window.scrollBy({ top: heroBottom, behavior: 'instant' });
    }
    current = selected;
    const rail = selected.closest('[data-document-menu]');
    const tabBounds = selected.getBoundingClientRect();
    const railBounds = rail.getBoundingClientRect();
    if (tabBounds.left < railBounds.left) rail.scrollLeft += tabBounds.left - railBounds.left;
    if (tabBounds.right > railBounds.right) rail.scrollLeft += tabBounds.right - railBounds.right;
  };
  window.addEventListener('hashchange', activateTab);
  activateTab();
  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('keydown', event => {
      if (event.key === ' ') {
        event.preventDefault();
        tab.click();
        return;
      }
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus({ preventScroll: true });
      tabs[next].click();
    });
  }

  const deck = document.querySelector('.artifact-deck');
  const slides = [...deck.querySelectorAll('[data-slide]')];
  const picker = [...deck.querySelectorAll('[data-go]')];
  const back = deck.querySelector('[data-step="-1"]');
  const next = deck.querySelector('[data-step="1"]');
  const count = deck.querySelector('.deck-count');
  let activeSlide = 1;
  function go(number) {
    if (number < 1 || number > slides.length || number === activeSlide) return;
    activeSlide = number;
    for (const slide of slides) slide.hidden = Number(slide.dataset.slide) !== number;
    for (const button of picker) button.setAttribute('aria-pressed', String(Number(button.dataset.go) === number));
    count.textContent = `${number} of ${slides.length}`;
    const focused = document.activeElement;
    back.disabled = number === 1;
    next.disabled = number === slides.length;
    if ((focused === back && back.disabled) || (focused === next && next.disabled)) {
      picker[number - 1].focus({ preventScroll: true });
    }
  }
  for (const button of picker) button.addEventListener('click', () => go(Number(button.dataset.go)));
  back.addEventListener('click', () => go(activeSlide - 1));
  next.addEventListener('click', () => go(activeSlide + 1));
  deck.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    go(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
  });
})();
