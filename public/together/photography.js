(() => {
  const catalog = window.sharedPhotography;
  const page = document.querySelector('[data-photography-gallery]');
  if (!catalog || !page) return;
  const get = id => document.getElementById(id);
  const byId = new Map(catalog.map(shot => [shot.id, shot]));
  const cards = Array.from(page.querySelectorAll('[data-shot]'));
  const shelves = Array.from(page.querySelectorAll('[data-photo-industry]'));
  const search = get('photo-search');
  const industry = get('photo-industry');
  const cast = get('photo-cast');
  const result = get('photo-count');
  const empty = get('photo-empty');
  const dialog = get('photo-dialog');
  const title = get('photo-title');
  const frame = get('photo-frame');
  const back = get('photo-prev');
  const next = get('photo-next');
  const copy = get('photo-copy');
  const feedback = get('photo-feedback');
  let filtered = catalog;
  let active;
  let opener;

  function normalize(text) {
    return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  }

  function filter() {
    const tokens = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    filtered = catalog.filter(shot => {
      if (industry.value && industry.value !== shot.industry) return false;
      if (cast.value && !shot.cast.includes(cast.value)) return false;
      const parts = normalize([shot.id, shot.title, shot.industry, shot.scene, ...shot.cast].join(' '));
      return tokens.every(term => parts.includes(term));
    });
    const relevant = new Set(filtered.map(shot => shot.id));
    for (const card of cards) card.hidden = !relevant.has(card.dataset.shot);
    for (const shelf of shelves) shelf.hidden = !shelf.querySelector('[data-shot]:not([hidden])');
    result.textContent = filtered.length + (filtered.length === 1 ? ' photograph' : ' photographs');
    empty.hidden = filtered.length > 0;
  }

  function updateLink(shot) {
    const url = new URL(location.href);
    url.searchParams.set('shot', shot.id);
    history.replaceState(null, '', url);
  }

  function show(shot) {
    const index = filtered.indexOf(shot);
    active = shot;
    get('photo-label').textContent = shot.id + ' · ' + shot.industry;
    title.textContent = shot.title;
    frame.alt = shot.scene;
    frame.width = shot.width;
    frame.height = shot.height;
    frame.src = shot.full;
    get('photo-caption').textContent = shot.scene;
    get('photo-names').textContent = 'Reference cast · ' + shot.cast.join(', ');
    get('photo-download').href = shot.full;
    get('photo-prompt').textContent = shot.prompt;
    feedback.textContent = '';
    back.disabled = index <= 0;
    next.disabled = index < 0 || index >= filtered.length - 1;
    if (!dialog.open) {
      dialog.showModal();
      get('photo-close').focus();
    }
    updateLink(shot);
  }

  function move(step) {
    const shot = filtered[filtered.indexOf(active) + step];
    if (shot && filtered.includes(active)) show(shot);
  }

  for (const field of [search, industry, cast]) field.addEventListener('input', filter);
  get('photo-reset').addEventListener('click', () => {
    search.value = industry.value = cast.value = '';
    filter();
    search.focus();
  });
  page.addEventListener('click', event => {
    const link = event.target.closest('a[data-open-shot]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const shot = byId.get(link.dataset.openShot);
    if (!shot || !dialog.showModal) return;
    event.preventDefault();
    opener = link;
    show(shot);
  });
  get('photo-close').addEventListener('click', () => dialog.close());
  back.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
  dialog.addEventListener('close', () => {
    const url = new URL(location.href);
    url.searchParams.delete('shot');
    history.replaceState(null, '', url);
    if (opener && !opener.closest('[hidden]')) {
      opener.focus();
    } else {
      search.focus();
    }
  });
  copy.addEventListener('click', async () => {
    const shot = active;
    if (!shot) return;
    const stillOpen = () => dialog.open && active === shot;
    try {
      await navigator.clipboard.writeText(shot.prompt);
      if (stillOpen()) feedback.textContent = 'Prompt copied.';
    } catch {
      if (!stillOpen()) return;
      get('photo-prompt').closest('details').open = true;
      feedback.textContent = 'Select and copy the prompt below.';
    }
  });

  filter();
  const incoming = byId.get(new URL(location.href).searchParams.get('shot'));
  if (incoming && dialog.showModal) show(incoming);
})();
