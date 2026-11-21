(() => {
  'use strict';

  const destinations = Object.freeze([
    ['index.html#work', 'Stories'],
    ['brand.html', 'Brand guide'],
    ['components.html', 'Components'],
    ['artifacts.html', 'Artifacts'],
    ['copy.html', 'Copy']
  ]);
  const mobile = '(max-width: 980px)';
  const create = (tag, text, attributes = {}) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
    return node;
  };
  const activePath = new URL(location.href).pathname.replace(/\/$/, '/index.html');
  const here = href => {
    const url = new URL(href, location.href);
    return !url.hash && url.pathname === activePath;
  };

  class SharedHeader extends HTMLElement {
    #controls;

    connectedCallback() {
      if (this.#controls) return;
      this.#controls = new AbortController();
      const options = { signal: this.#controls.signal };
      const header = create('header', '', { class: 'mast studio-mast', 'data-nav-ready': '' });
      const home = create('a', '', { href: 'index.html', 'aria-label': 'Shared home' });
      home.append(create('img', '', { class: 'logo', src: 'media/shared-09.svg', alt: '' }));
      if (here('index.html')) home.setAttribute('aria-current', 'page');

      const button = create('button', 'Menu', {
        type: 'button', class: 'action studio-nav-menu',
        'aria-controls': 'studio-nav-links', 'aria-expanded': 'false'
      });
      const nav = create('nav', '', { class: 'studio-nav', id: 'studio-nav-links', 'aria-label': 'Main' });
      const links = create('div', '', { class: 'studio-nav-links' });
      for (const [href, label] of destinations) {
        const link = create('a', label, { href });
        if (here(href)) link.setAttribute('aria-current', 'page');
        links.append(link);
      }
      nav.append(links);
      header.append(home, button, nav);
      this.replaceChildren(header);

      const narrow = matchMedia(mobile);
      const expanded = () => button.getAttribute('aria-expanded') === 'true';
      const close = () => button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', () => button.setAttribute('aria-expanded', String(!expanded())), options);
      header.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !expanded()) return;
        event.preventDefault();
        close();
        button.focus();
      }, options);
      nav.addEventListener('click', event => {
        const anchor = event.target.closest('a');
        if (narrow.matches && anchor?.pathname === activePath) close();
      }, options);
      narrow.addEventListener('change', () => {
        if (!narrow.matches && document.activeElement === button) links.firstElementChild.focus();
        close();
      }, options);
    }

    disconnectedCallback() {
      this.#controls?.abort();
      this.#controls = undefined;
    }
  }

  if (!customElements.get('shared-header')) customElements.define('shared-header', SharedHeader);
})();
