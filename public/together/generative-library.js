// Generative UI: the use-case library. Filters, the list of moments, the entries and their deep links.
(() => {
  'use strict';

  const root = document.getElementById('component-library');
  const catalog = window.SharedGenerativeCatalog, moments = window.SharedGenerativeMoments, kit = window.SharedGenerativeComponents;
  if (!root || !Array.isArray(catalog) || !Array.isArray(moments) || !kit) return;

  const SURFACE = {rooms: 'Nando Rooms', live: 'Nando Live', both: 'Rooms and Live'};
  const PLACE = {
    stage: 'On the stage, for everyone', host: 'For the host only', guest: 'For the person who asked', chat: 'In the room chat',
    lobby: 'Before joining', canvas: 'On the caller’s canvas', callstage: 'On the call’s stage', shared: 'On the stage or the canvas',
    presenter: 'For whoever is presenting'
  };
  const WHO = {host: 'The host says', guest: 'A guest says', anyone: 'Someone in the room says', caller: 'The caller says', either: 'The host or the caller says'};

  const byId = id => document.getElementById(id);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const add = (parent, ...children) => { parent.append(...children.filter(Boolean)); return parent; };
  const records = new Map(catalog.map(entry => [entry.id, entry]));
  const momentOf = new Map(moments.map(moment => [moment.id, moment]));
  const sources = entry => [...new Map(entry.view.map(component => [kit.registry[component.type].name, kit.registry[component.type]])).values()];

  // ── Words ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // Lines are compared as plain words: no accents, contractions written out, plurals and -ing endings dropped.
  const CONTRACTED = [[/n[’']t\b/g, ' not'], [/[’']re\b/g, ' are'], [/[’']ve\b/g, ' have'], [/[’']ll\b/g, ' will'], [/[’']m\b/g, ' am'], [/[’']d\b/g, ' would'], [/[’']s\b/g, ' is']];
  const normal = text => CONTRACTED.reduce((line, [from, to]) => line.replace(from, to), text.toLowerCase())
    .normalize('NFD').replace(/\p{M}+/gu, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const STOP = new Set(('a am an and are as at be been but by can could did do does for from get give go got had has have how i if in into is it its just let '
    + 'me my nando not of on or our out please put say so some that the their them then there these this to up us was we what when where which who why '
    + 'will with would you your').split(' '));
  const stem = word => {
    if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
    return word.length > 3 && word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word;
  };
  const words = text => normal(text).split(' ').filter(word => word.length > 1 && !STOP.has(word)).map(stem);
  const index = new Map(catalog.map(entry => {
    const weights = new Map();
    const weigh = (text, weight) => { for (const word of words(text)) weights.set(word, Math.max(weights.get(word) || 0, weight)); };
    weigh(entry.shows + ' ' + (entry.when || '') + ' ' + momentOf.get(entry.moment).title, 1);
    for (const line of entry.say || []) weigh(line, 3);
    weigh(entry.title, 4);
    const exact = new Set([entry.id, normal(entry.title), ...(entry.say || []).map(normal)]);
    const text = normal([entry.title, entry.shows, entry.rule, entry.when || '', ...(entry.say || []), momentOf.get(entry.moment).title,
      SURFACE[entry.surface], ...sources(entry).map(source => source.name)].join(' '));
    return [entry.id, {weights, exact, text}];
  }));
  // A word that appears in few use cases says more about which one is meant.
  const spread = new Map();
  for (const {weights} of index.values()) for (const [word, weight] of weights) if (weight > 1) spread.set(word, (spread.get(word) || 0) + 1);
  const rarity = word => Math.log(1 + catalog.length / (spread.get(word) || 1));

  /** What a typed line asks for: one use case, a short list to choose from, or nothing a view would help with. */
  function match(line) {
    const said = normal(line);
    if (!said) return {kind: 'none'};
    for (const entry of catalog) if (index.get(entry.id).exact.has(said)) return {kind: 'match', useCase: entry};
    const asked = [...new Set(words(line))];
    if (!asked.length) return {kind: 'none'};
    const whole = asked.reduce((sum, word) => sum + rarity(word), 0);
    const ranked = catalog.map(entry => {
      const {weights} = index.get(entry.id);
      const hits = asked.filter(word => weights.get(word) > 1);
      return {entry, score: hits.reduce((sum, word) => sum + weights.get(word) * rarity(word), 0), cover: hits.reduce((sum, word) => sum + rarity(word), 0) / whole};
    }).filter(item => item.cover >= 0.5).sort((a, b) => b.score - a.score || b.cover - a.cover);
    if (!ranked.length) return {kind: 'none'};
    const [best, next] = ranked;
    if (best.cover >= 0.6 && (!next || best.score >= next.score * 1.25)) return {kind: 'match', useCase: best.entry};
    return {kind: 'ask', options: ranked.filter(item => item.score >= best.score * 0.6).slice(0, 3).map(item => item.entry)};
  }

  // ── Specification ────────────────────────────────────────────────────────────────────────────────────────────────────
  const specFor = entry => ({version: 2, intent: 'use-case', useCase: entry.id, surface: entry.surface, place: entry.place, components: entry.view});
  const KEYS = ['version', 'intent', 'useCase', 'surface', 'place', 'components'];
  /** Builds a view only from a specification that names a known use case and passes the registry. */
  function renderSpec(spec) {
    if (!spec || typeof spec !== 'object' || Array.isArray(spec) || Object.keys(spec).length !== KEYS.length || !KEYS.every(key => Object.hasOwn(spec, key))) return null;
    const entry = records.get(spec.useCase);
    if (spec.version !== 2 || spec.intent !== 'use-case' || !entry || spec.surface !== entry.surface || spec.place !== entry.place) return null;
    return kit.render(spec.components);
  }

  /** The frame a view sits in: where it appears, on which surface, then the components. */
  function frame(entry) {
    const view = renderSpec(specFor(entry));
    if (!view) return null;
    const box = el('div', 'component-live gl-view');
    box.append(add(el('div', 'component-cue'), el('span', '', PLACE[entry.place]), el('span', 'context-chip', SURFACE[entry.surface])), view);
    return box;
  }

  function saidBlock(entry) {
    const block = el('div', 'gl-said');
    if (entry.when) block.append(add(el('p', 'gl-when'), el('span', '', 'When'), ' ' + entry.when));
    if (entry.say?.length) {
      block.append(el('p', 'gl-who', WHO[entry.who]));
      entry.say.forEach((line, i) => block.append(el('p', i ? 'gl-line gl-also' : 'gl-line', '“' + line + '”')));
    }
    return block;
  }

  // ── Entries ──────────────────────────────────────────────────────────────────────────────────────────────────────────
  const built = new Map();
  function entryNode(entry) {
    if (built.has(entry.id)) return built.get(entry.id);
    const article = el('article', 'brand-row ds-entry gl-entry');
    article.id = entry.id;
    const title = el('h4', '', entry.title);
    title.tabIndex = -1;
    const copy = el('div', 'row-copy');
    const from = el('p', 'gl-built', 'Built from ');
    sources(entry).forEach((source, i, all) => {
      from.append(Object.assign(el('a', '', source.name), {href: source.source}), i === all.length - 1 ? '.' : i === all.length - 2 ? ' and ' : ', ');
    });
    copy.append(title, saidBlock(entry), el('p', 'gl-shows', entry.shows), el('p', 'ds-behaviour', entry.rule), from);

    const sample = el('div', 'row-sample');
    let view = frame(entry);
    const note = el('output', 'ds-status');
    note.setAttribute('role', 'status');
    const actions = el('div', 'ds-stack gl-entry-actions');
    if (entry.say?.length) {
      const say = Object.assign(el('button', 'action', 'Say this to Nando'), {type: 'button'});
      say.addEventListener('click', () => window.SharedGenerativeComposer?.say(entry.say[0]));
      actions.append(say);
    }
    const reset = Object.assign(el('button', 'action quiet', 'Reset the preview'), {type: 'button'});
    reset.addEventListener('click', () => {
      const fresh = frame(entry);
      view.replaceWith(fresh);
      view = fresh;
      note.value = 'Preview reset.';
    });
    const link = Object.assign(el('a', '', 'Link to this use case'), {href: '#' + entry.id});
    actions.append(reset, link);

    const spec = el('details', 'ds-markup'), code = el('code'), copySpec = Object.assign(el('button', 'action', 'Copy the specification'), {type: 'button'});
    spec.append(el('summary', '', 'View specification'), add(el('pre'), code), copySpec);
    spec.addEventListener('toggle', () => { if (spec.open && !code.textContent) code.textContent = JSON.stringify(specFor(entry), null, 2); });
    copySpec.addEventListener('click', async () => {
      const text = JSON.stringify(specFor(entry), null, 2);
      try { await navigator.clipboard.writeText(text); note.value = 'Specification copied.'; }
      catch { note.value = 'Select the specification above to copy it.'; }
    });
    sample.append(view, actions, note, spec);
    article.append(copy, sample);
    built.set(entry.id, article);
    return article;
  }

  // ── Filters and the list ─────────────────────────────────────────────────────────────────────────────────────────────
  const search = byId('gl-search'), builtFrom = byId('gl-component'), momentPick = byId('gl-moment'), list = byId('gl-moments');
  const entries = byId('gl-entries'), count = byId('gl-count'), surfaces = [...root.querySelectorAll('input[name="gl-surface"]')];
  const state = {moment: moments[0].id};

  const names = [...new Set(Object.values(kit.registry).map(item => item.name))].sort((a, b) => a.localeCompare(b));
  for (const name of names) builtFrom.append(el('option', '', name));
  momentPick.append(Object.assign(el('option', '', 'All moments'), {value: 'all'}), ...moments.map(moment => Object.assign(el('option', '', moment.title), {value: moment.id})));

  const surface = () => surfaces.find(input => input.checked)?.value || '';
  function matching() {
    const asked = normal(search.value).split(' ').filter(Boolean), where = surface(), component = builtFrom.value;
    return catalog.filter(entry => (!where || entry.surface === where || entry.surface === 'both')
      && (!component || sources(entry).some(source => source.name === component))
      && asked.every(word => index.get(entry.id).text.includes(word)));
  }

  function paint() {
    const found = matching(), shown = state.moment === 'all' ? found : found.filter(entry => entry.moment === state.moment);
    const tally = id => found.filter(entry => entry.moment === id).length;
    const item = (id, title, total) => {
      const link = Object.assign(el('a'), {href: '#moment-' + id});
      link.dataset.moment = id;
      link.append(title + ' ', el('span', '', String(total)));
      if (id === state.moment) link.setAttribute('aria-current', 'true');
      if (!total) link.dataset.none = '';
      return add(el('li'), link);
    };
    list.replaceChildren(item('all', 'All moments', found.length), ...moments.map(moment => item(moment.id, moment.title, tally(moment.id))));
    momentPick.value = state.moment;

    const groups = moments.filter(moment => shown.some(entry => entry.moment === moment.id)).map(moment => {
      const group = el('section', 'gl-group');
      group.append(add(el('header', 'gl-group-head'), el('h3', '', moment.title), el('p', '', moment.about)),
        ...shown.filter(entry => entry.moment === moment.id).map(entryNode));
      return group;
    });
    if (!groups.length) {
      const none = el('div', 'ds-empty');
      none.append(el('p', '', state.moment === 'all' ? 'No use case matches these filters.' : 'No use case in “' + momentOf.get(state.moment).title + '” matches these filters.'));
      const widen = Object.assign(el('button', 'action filled', found.length ? 'Show the ' + found.length + ' elsewhere' : 'Clear the filters'), {type: 'button'});
      widen.addEventListener('click', () => { if (found.length) { state.moment = 'all'; paint(); } else clear(); });
      none.append(widen);
      groups.push(none);
    }
    entries.replaceChildren(...groups);

    const rooms = found.filter(entry => entry.surface !== 'live').length, live = found.filter(entry => entry.surface !== 'rooms').length;
    count.value = found.length + (found.length === 1 ? ' use case. ' : ' use cases. ') + rooms + ' apply in Nando Rooms, ' + live + ' on Nando Live.';
  }

  function clear() {
    search.value = builtFrom.value = '';
    surfaces[0].checked = true;
    state.moment = moments[0].id;
    paint();
    search.focus();
  }

  search.addEventListener('input', () => { if (search.value.trim()) state.moment = 'all'; paint(); });
  builtFrom.addEventListener('change', () => { if (builtFrom.value) state.moment = 'all'; paint(); });
  for (const input of surfaces) input.addEventListener('change', paint);
  momentPick.addEventListener('change', () => { state.moment = momentPick.value; paint(); });
  byId('gl-clear').addEventListener('click', clear);
  list.addEventListener('click', event => {
    const link = event.target.closest('a[data-moment]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    state.moment = link.dataset.moment;
    history.replaceState(null, '', '#moment-' + state.moment);
    paint();
    list.querySelector('[aria-current]')?.focus();
  });

  /** Shows one use case whatever the filters say, and moves to it. */
  function open(id, focus = true) {
    const entry = records.get(id);
    if (!entry) return false;
    if (!matching().includes(entry)) { search.value = builtFrom.value = ''; surfaces[0].checked = true; }
    state.moment = entry.moment;
    paint();
    const node = byId(id);
    node.scrollIntoView({block: 'start'});
    if (focus) node.querySelector('h4').focus({preventScroll: true});
    return true;
  }
  function fromHash(focus) {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (records.has(hash)) return open(hash, focus);
    const moment = hash.startsWith('moment-') && hash.slice(7);
    if (moment && (moment === 'all' || momentOf.has(moment))) { state.moment = moment; paint(); root.scrollIntoView({block: 'start'}); return true; }
    return false;
  }
  window.addEventListener('hashchange', () => fromHash(true));

  window.SharedGenerativeLibrary = Object.freeze({match, specFor, renderSpec, frame, saidBlock, open, labels: {SURFACE, PLACE, WHO},
    filterBy(component) { search.value = ''; surfaces[0].checked = true; builtFrom.value = component; state.moment = 'all'; paint(); root.scrollIntoView({block: 'start'}); }});

  paint();
  fromHash(false);
  for (const node of document.querySelectorAll('[data-use-case-count]')) node.textContent = String(catalog.length);
})();
