(() => {
  const select = query => document.querySelector(query);
  const byId = id => document.getElementById(id);
  const tabs = [...document.querySelectorAll('[data-document-menu] [role="tab"][data-tab]')];
  const legacy = {
    logo:'foundations', 'logo-lockup':'foundations', colour:'foundations', 'colour-actions':'foundations', contrast:'foundations',
    'type-scale':'type', layout:'type', 'icon-paper':'icons', 'icon-set':'icons',
    controls:'components', selection:'components', metadata:'components',
    handoff:'assets'
  };
  function activate(key) {
    const target = byId(key);
    const panel = target?.closest('.brand-panel');
    key = panel ? panel.id.slice(6) : (legacy[key] || key);
    const selected = tabs.find(tab => tab.dataset.tab === key) || tabs[0];
    for (const tab of tabs) {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      byId(tab.getAttribute('aria-controls')).hidden = !active;
    }
    const rail = selected.closest('[data-document-menu]');
    const tabBounds = selected.getBoundingClientRect();
    const railBounds = rail.getBoundingClientRect();
    if (tabBounds.left < railBounds.left) rail.scrollLeft += tabBounds.left - railBounds.left;
    if (tabBounds.right > railBounds.right) rail.scrollLeft += tabBounds.right - railBounds.right;
  }
  function activateURL() {
    const key = location.hash.slice(1);
    activate(key);
    const target = byId(key);
    if (target?.closest('.brand-panel')) target.scrollIntoView();
  }
  activateURL();
  window.addEventListener('hashchange', activateURL);
  for (const tab of tabs) {
    tab.addEventListener('keydown', event => {
      if (event.key === ' ') {
        event.preventDefault();
        tab.click();
        return;
      }
      const index = tabs.indexOf(tab);
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
  for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
      const color = button.dataset.copy;
      const output = byId('copy-state');
      try {
        await navigator.clipboard.writeText(color);
        output.value = color + ' copied.';
      } catch {
        output.value = 'Hex value ' + color;
      }
    });
  }
  const dialog = byId('share-dialog');
  const accessLevel = byId('access-level');
  const access = byId('access-pill');
  byId('open-sharing').addEventListener('click', () => {
    accessLevel.value = access.textContent;
    dialog.showModal();
  });
  byId('cancel-access').addEventListener('click', () => dialog.close());
  byId('save-access').addEventListener('click', () => {
    access.textContent = accessLevel.value;
    byId('access-result').value = 'Access saved for ' + accessLevel.value.toLowerCase() + '.';
    dialog.close();
  });
  const reactions = [...document.querySelectorAll('[data-reaction]')];
  for (const button of reactions) {
    button.addEventListener('click', () => {
      const newState = button.getAttribute('aria-pressed') === 'false';
      for (const sibling of reactions) sibling.setAttribute('aria-pressed', String(newState && sibling === button));
      byId('reaction-result').value = newState ? button.dataset.reaction + ' selected.' : 'No reaction selected.';
    });
  }
})();
