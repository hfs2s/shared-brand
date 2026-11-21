const phoneNav = matchMedia('(max-width:800px)');
const appDescriptions = {
  Overview: 'See what’s happening across Elio’s workspace.',
  Work: 'Open current tasks and the drafts people are reviewing.',
  Mail: 'Read and draft messages in Elio’s inbox.',
  Rooms: 'Open a room for a call with other people and a shared stage.',
  Live: 'Talk to Elio and use the workbench to follow what he shows.',
  Settings: 'Review account and workspace preferences.',
};

for (const example of document.querySelectorAll('[data-side-example]')) {
  const toggle = example.querySelector('[data-side-toggle]');
  const rail = example.querySelector('.side-rail');
  const content = example.querySelector('[data-side-content]');
  const routes = [...rail.querySelectorAll('[data-side-route]')];
  const outline = [...rail.querySelectorAll('[data-side-anchor]')].map(link => ({
    link,
    heading: document.getElementById(link.hash.slice(1)),
  }));

  function setOpen(open) {
    const drawerOpen = phoneNav.matches && open;
    example.toggleAttribute('data-side-open', drawerOpen);
    toggle.setAttribute('aria-expanded', String(drawerOpen));
    rail.inert = phoneNav.matches && !drawerOpen;
    content.inert = drawerOpen;
    if (drawerOpen) {
      const current = rail.querySelector('[aria-current="location"]') ?? rail.querySelector('[aria-current="page"]') ?? rail.querySelector('a');
      const group = current.closest('details');
      if (group) group.open = true;
      current.focus();
    }
  }

  function dismiss() {
    setOpen(false);
    toggle.focus();
  }

  function markOutline(selected) {
    for (const item of outline) {
      if (item === selected) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    }
  }

  example.setAttribute('data-side-ready', '');
  setOpen(false);

  phoneNav.addEventListener('change', () => {
    const hadRailFocus = rail.contains(document.activeElement);
    setOpen(false);
    if (phoneNav.matches && hadRailFocus) toggle.focus();
  });
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  example.querySelector('[data-side-scrim]').addEventListener('click', dismiss);
  example.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !example.hasAttribute('data-side-open')) return;
    event.preventDefault();
    dismiss();
  });

  rail.addEventListener('click', event => {
    const link = event.target.closest('[data-side-route], [data-side-anchor]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    if (link.hasAttribute('data-side-route')) {
      const title = link.textContent.trim();
      const heading = example.querySelector('[data-side-heading]');
      example.querySelector('[data-side-title]').textContent = heading.textContent = title;
      example.querySelector('[data-side-description]').textContent = appDescriptions[title];
      for (const route of routes) route.removeAttribute('aria-current');
      link.setAttribute('aria-current', 'page');
      if (phoneNav.matches) {
        setOpen(false);
        heading.focus({preventScroll: true});
      }
      return;
    }
    const selected = outline.find(item => item.link === link);
    setOpen(false);
    content.scrollTop = selected.heading.offsetTop;
    markOutline(selected);
    selected.heading.focus({preventScroll: true});
  });

  if (outline.length) {
    content.addEventListener('scroll', () => {
      const selected = outline.findLast(item => item.heading.offsetTop <= content.scrollTop + 12);
      markOutline(selected ?? outline[0]);
    }, {passive:true});
  }
}
