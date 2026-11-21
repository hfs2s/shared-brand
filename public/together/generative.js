// Generative UI: the request composer and the component registry table. A typed line is matched to a use case in the
// library; the view is built only from a specification that passes the registry. Everything runs on this page.
(() => {
  'use strict';

  const library = window.SharedGenerativeLibrary, kit = window.SharedGenerativeComponents, catalog = window.SharedGenerativeCatalog;
  const form = document.getElementById('gen-form');
  if (!library || !kit || !form) return;

  const request = document.getElementById('gen-request'), status = document.getElementById('gen-status');
  const preview = document.getElementById('gen-view'), raw = document.getElementById('gen-spec');
  const samples = [...form.querySelectorAll('[data-line]')];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const heading = text => Object.assign(el('h3', '', text), {id: 'gen-view-title', tabIndex: -1});

  // The previous view and its specification are always removed first, so a refused line never leaves stale controls.
  function show(title, ...children) {
    preview.replaceChildren(heading(title), ...children);
    raw.textContent = '';
  }

  function showUseCase(entry) {
    const spec = library.specFor(entry), view = library.frame(entry);
    if (!view) {
      show('That view could not be checked', el('p', '', 'Its specification does not pass the component registry, so nothing is shown.'));
      status.textContent = 'The view was refused.';
      return;
    }
    const more = el('p', 'gl-more');
    more.append(Object.assign(el('a', '', 'See this use case and its rule'), {href: '#' + entry.id}));
    show(entry.title, el('p', '', entry.shows), view, more);
    raw.textContent = JSON.stringify(spec, null, 2);
    status.textContent = 'Showing “' + entry.title + '”.';
  }

  function generate(line) {
    const result = library.match(line);
    if (result.kind === 'match') return showUseCase(result.useCase);
    if (result.kind === 'ask') {
      const options = el('div', 'gl-ask');
      options.setAttribute('role', 'group');
      options.setAttribute('aria-label', 'Possible meanings');
      for (const entry of result.options) {
        const choose = Object.assign(el('button', 'action', entry.title), {type: 'button'});
        choose.addEventListener('click', () => { showUseCase(entry); preview.querySelector('h3').focus(); });
        options.append(choose);
      }
      show('Which did you mean?', el('p', '', 'That line could ask for more than one view. Nando asks once before it shows anything.'), options);
      status.textContent = 'Nando needs to know which view you mean.';
      return;
    }
    const browse = el('p');
    browse.append(Object.assign(el('a', '', 'Browse the use cases'), {href: '#component-library'}));
    show('Nando would answer that in words', el('p', '', 'No view fits this line. A view appears only when it is clearer than a sentence. Try a sample line, or find a use case below.'), browse);
    status.textContent = 'No view for that line.';
  }

  const mark = () => { for (const sample of samples) sample.setAttribute('aria-pressed', String(request.value.trim() === sample.dataset.line)); };
  form.addEventListener('submit', event => { event.preventDefault(); generate(request.value.trim()); });
  for (const sample of samples) sample.addEventListener('click', () => { request.value = sample.dataset.line; mark(); generate(request.value); });
  request.addEventListener('input', mark);

  window.SharedGenerativeComposer = Object.freeze({
    say(line) {
      request.value = line;
      mark();
      generate(line);
      document.getElementById('prototype').scrollIntoView({block: 'start'});
      request.focus({preventScroll: true});
    }
  });
  mark();
  generate(request.value.trim());

  // The registry table: one row per component, with its brand guide source and how many use cases are built from it.
  const body = document.getElementById('gen-registry');
  if (body) {
    const uses = type => catalog.filter(entry => entry.view.some(component => component.type === type)).length;
    for (const [type, {name, source, shape}] of Object.entries(kit.registry)) {
      const row = el('tr'), key = el('th'), from = el('td'), data = el('td'), used = el('td');
      key.scope = 'row';
      key.append(el('code', '', type));
      from.append(Object.assign(el('a', '', name), {href: source}));
      data.textContent = Object.entries(shape).map(([field, rule]) => field + (rule.optional ? ' (optional)' : '')).join(', ');
      const total = uses(type), filter = Object.assign(el('button', 'gen-link', total + (total === 1 ? ' use case' : ' use cases')), {type: 'button'});
      filter.addEventListener('click', () => library.filterBy(name));
      used.append(filter);
      row.append(key, from, data, used);
      body.append(row);
    }
  }
})();
