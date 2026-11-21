// Generative UI: the registry of components a generated view may use.
// Every entry is a component the brand guide already defines (brand.html). A view names components and gives them
// data; this file checks the data and builds the markup with the brand guide's own classes. Nothing here accepts markup.
(() => {
  'use strict';

  let sequence = 0;
  const uid = name => 'gv-' + name + '-' + (++sequence);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const add = (parent, ...children) => { parent.append(...children.filter(Boolean)); return parent; };
  const button = (label, className = 'action') => Object.assign(el('button', className, label), {type: 'button'});
  const status = (text = '') => {
    const node = el('output', 'ds-status', text);
    node.setAttribute('role', 'status');
    return node;
  };
  const stack = (...children) => add(el('div', 'ds-stack'), ...children);
  const ICONS = new Set(['alert', 'bell', 'calendar', 'captions', 'check', 'close', 'exit', 'file', 'folder', 'key', 'lock',
    'microphone', 'monitor', 'mute', 'people', 'pin', 'play', 'reply', 'room', 'seat', 'share', 'spark', 'video', 'wave']);
  const icon = (name, size = 24) => {
    const image = el('img');
    image.src = 'icon-media/flat/' + (ICONS.has(name) ? name : 'file') + '.svg';
    image.width = image.height = size;
    image.alt = '';
    return image;
  };
  const PORTRAITS = new Set(['nando', 'juan', 'lola', 'maria', 'elio', 'milo', 'mor', 'lisa']);
  const IMAGES = {
    'floor-plan': 'media/group-studies/095-fitting-the-chairs-640.webp',
    'event-layout': 'media/group-studies/100-laying-out-the-public-event-640.webp',
    'welcome-table': 'media/group-studies/043-setting-the-welcome-table-640.webp'
  };
  const LINK = /^(?:brand|motion|copy|icons|photography)\.html(?:#[\w-]+)?$/;
  const one = unit => (unit === 'people' ? 'person' : unit.replace(/s$/, ''));
  const initials = name => name.split(/\s+/).slice(0, 2).map(word => word[0] || '').join('').toUpperCase();
  const tone = {ok: 'ds-badge success', wait: 'ds-badge review', bad: 'ds-badge error'};
  const chip = (text, kind) => el('span', tone[kind] || 'context-chip', text);

  /** A brand guide dialog (brand.html#modal). Returns a function that opens it from `opener`. */
  function dialog({title, summary, detail, action, danger, mark}, onClose) {
    const node = el('dialog', 'studio-dialog gl-dialog' + (danger ? ' studio-confirm' : ''));
    const titleId = uid('title'), summaryId = uid('summary');
    node.setAttribute('aria-labelledby', titleId);
    node.setAttribute('aria-describedby', summaryId);
    const heading = add(el('div', 'studio-dialog-heading'),
      Object.assign(el('h2', '', title), {id: titleId}), Object.assign(el('p', '', summary), {id: summaryId}));
    const close = Object.assign(el('button', 'studio-close'), {type: 'button'});
    close.setAttribute('aria-label', 'Close dialog');
    close.append(icon('close'));
    const head = add(el('header', 'studio-dialog-head'), add(el('div', 'studio-dialog-mark'), icon(mark || (danger ? 'alert' : 'check'))), heading, close);
    const body = el('div', 'studio-dialog-body');
    if (detail) {
      if (danger) body.append(add(el('div', 'dialog-warning'), el('strong', '', detail[0]), el('p', '', detail[1])));
      else body.append(add(el('div', 'dialog-resource room-summary'), icon(mark || 'people'), add(el('div'), el('strong', '', detail[0]), el('span', '', detail[1]))));
    }
    const cancel = button('Cancel');
    cancel.autofocus = true;
    const confirm = button(action, danger ? 'action studio-danger' : 'action filled');
    node.append(head, body, add(el('footer', 'studio-dialog-foot'), cancel, confirm));
    let result = false, opener;
    close.addEventListener('click', () => node.close());
    cancel.addEventListener('click', () => node.close());
    confirm.addEventListener('click', () => { result = true; node.close(); });
    node.addEventListener('close', () => { onClose(result); opener?.focus(); });
    return {node, open(from) { opener = from; result = false; node.showModal(); }};
  }

  const renderers = {
    facts({rows}) {
      const list = el('dl', 'facts');
      for (const [name, value] of rows) list.append(add(el('div'), el('dt', '', name), el('dd', '', value)));
      return list;
    },

    table({caption, columns, rows}) {
      const wrap = el('div', 'ds-table-scroll'), table = el('table', 'brand-data'), body = el('tbody');
      const head = el('tr'), first = el('th'), sort = button(columns[0], '');
      let order = rows.slice(), ascending = false;
      first.scope = 'col';
      first.setAttribute('aria-sort', 'none');
      first.append(sort);
      head.append(first, ...columns.slice(1).map(name => Object.assign(el('th', '', name), {scope: 'col'})));
      const paint = () => body.replaceChildren(...order.map(cells => add(el('tr'), ...cells.map(cell => el('td', '', cell)))));
      sort.addEventListener('click', () => {
        ascending = !ascending;
        order = rows.slice().sort((a, b) => (ascending ? 1 : -1) * a[0].localeCompare(b[0], undefined, {numeric: true}));
        first.setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
        paint();
      });
      paint();
      table.append(el('caption', '', caption), add(el('thead'), head), body);
      wrap.append(table);
      return wrap;
    },

    status({rows}) {
      const list = el('ul', 'asset-list');
      for (const [name, note, state, kind] of rows) list.append(add(el('li'), add(el('div'), el('strong', '', name), el('span', '', note)), chip(state, kind)));
      return list;
    },

    people({rows}) {
      const list = el('ul', 'asset-list');
      for (const [name, note, portrait] of rows) {
        const who = el('span', 'ds-avatar');
        if (PORTRAITS.has(portrait)) who.append(Object.assign(el('img'), {src: 'media/portraits/' + portrait + '.webp', alt: '', loading: 'lazy'}));
        else { const mark = el('i', '', initials(name)); mark.setAttribute('aria-hidden', 'true'); who.append(mark); }
        who.append(name);
        list.append(add(el('li'), who, el('span', '', note)));
      }
      return list;
    },

    queue({rows}) {
      const region = el('div', 'gl-rows'), said = status();
      for (const [name, note] of rows) {
        const state = el('small', '', note);
        const admit = button('Admit', 'action filled'), decline = button('Decline'), undo = button('Undo');
        undo.hidden = true;
        const set = (text, done) => { state.textContent = text; admit.hidden = decline.hidden = done; undo.hidden = !done; };
        admit.addEventListener('click', () => { set('Admitted', true); said.value = name + ' admitted.'; undo.focus(); });
        decline.addEventListener('click', () => { set('Declined', true); said.value = name + ' declined.'; undo.focus(); });
        undo.addEventListener('click', () => { set(note, false); said.value = name + ' is waiting again.'; admit.focus(); });
        region.append(add(el('div', 'ds-file'), add(el('span'), el('strong', '', name), state), stack(admit, decline, undo)));
      }
      region.append(said);
      return region;
    },

    files({rows}) {
      const region = el('div', 'gl-rows'), said = status();
      for (const [title, meta, action] of rows) {
        const act = button(action);
        act.addEventListener('click', () => { said.value = action + ': ' + title + '. Nothing leaves this page.'; });
        region.append(add(el('div', 'ds-file'), icon('file', 29), add(el('span'), el('strong', '', title), el('small', '', meta)), act));
      }
      region.append(said);
      return region;
    },

    choices({legend, options}) {
      const group = el('fieldset', 'ds-choices'), name = uid('choice'), said = status('Tap one. Nando hears it as if it were said.');
      group.append(el('legend', '', legend));
      for (const option of options) {
        const radio = Object.assign(el('input'), {type: 'radio', name});
        radio.addEventListener('change', () => { said.value = 'Nando hears: “' + option + '”.'; });
        group.append(add(el('label', 'ds-control'), radio, ' ' + option));
      }
      return add(el('div'), group, said);
    },

    checks({legend, items, on = []}) {
      const group = el('fieldset', 'ds-choices'), said = status();
      group.append(el('legend', '', legend));
      const boxes = items.map((item, index) => {
        const box = Object.assign(el('input'), {type: 'checkbox', checked: on.includes(index)});
        group.append(add(el('label', 'ds-control'), box, ' ' + item));
        return box;
      });
      const count = () => { said.value = boxes.filter(box => box.checked).length + ' of ' + boxes.length + ' ticked.'; };
      group.addEventListener('change', count);
      count();
      return add(el('div'), group, said);
    },

    switches({items, on = []}) {
      const region = el('div', 'ds-fields'), said = status();
      items.forEach((item, index) => {
        const input = Object.assign(el('input'), {type: 'checkbox', checked: on.includes(index)});
        input.setAttribute('role', 'switch');
        input.addEventListener('change', () => { said.value = item + ': ' + (input.checked ? 'on' : 'off') + '.'; });
        const track = el('span');
        track.setAttribute('aria-hidden', 'true');
        region.append(add(el('label', 'ds-switch'), input, track, ' ' + item));
      });
      return add(el('div'), region, said);
    },

    toggles({label, items, on = []}) {
      const group = stack(), said = status();
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', label);
      items.forEach((item, index) => {
        const toggle = button(item);
        toggle.setAttribute('aria-pressed', String(on.includes(index)));
        toggle.addEventListener('click', () => {
          const pressed = toggle.getAttribute('aria-pressed') !== 'true';
          toggle.setAttribute('aria-pressed', String(pressed));
          said.value = item + ' ' + (pressed ? 'on' : 'off') + '.';
        });
        group.append(toggle);
      });
      return add(el('div'), group, said);
    },

    segments({label, items, on = 0}) {
      const group = el('fieldset', 'gl-segments'), name = uid('segment'), said = status(items[on] + ' selected.');
      group.append(el('legend', '', label));
      items.forEach((item, index) => {
        const radio = Object.assign(el('input'), {type: 'radio', name, checked: index === on});
        radio.addEventListener('change', () => { said.value = item + ' selected.'; });
        group.append(add(el('label'), radio, el('span', '', item)));
      });
      return add(el('div'), group, said);
    },

    notice({tone: kind, title, text, action}) {
      const box = el('div', 'ds-notice' + (['warning', 'success', 'failure'].includes(kind) ? ' ' + kind : ''));
      box.append(el('strong', '', title), el('p', '', text));
      if (!action) return box;
      const said = status(), act = button(action);
      act.addEventListener('click', () => { said.value = action + ': done in this preview.'; });
      box.append(act, said);
      return box;
    },

    empty({text, action, result}) {
      const box = el('div', 'ds-empty'), line = el('p', '', text), act = button(action, 'action filled'), back = button('Start again', 'action quiet');
      line.setAttribute('role', 'status');
      back.hidden = true;
      act.addEventListener('click', () => { line.textContent = result; act.hidden = true; back.hidden = false; back.focus(); });
      back.addEventListener('click', () => { line.textContent = text; act.hidden = false; back.hidden = true; act.focus(); });
      return add(box, line, stack(act, back));
    },

    progress({label, steps, done = 0, value = 0, max, unit}) {
      const region = el('div', 'gl-progress'), bar = el('progress'), said = status();
      const total = steps ? steps.length : max;
      let at = steps ? done : value;
      bar.max = total;
      const list = steps && el('ol', 'gl-steps');
      const next = button(steps ? 'Finish the current step' : 'Advance'), again = button('Start again', 'action quiet');
      const paint = () => {
        bar.value = at;
        if (list) list.replaceChildren(...steps.map((step, index) => add(el('li', index === at ? 'gl-now' : ''), el('span', '', step),
          index < at ? chip('Done', 'ok') : index === at ? chip('Now') : null)));
        next.disabled = at >= total;
        said.value = steps
          ? (at >= total ? 'All ' + total + ' done.' : at + ' of ' + total + ' done. Now: ' + steps[at] + '.')
          : at + ' of ' + total + ' ' + unit + '.';
      };
      next.addEventListener('click', () => { at = Math.min(total, at + 1); paint(); if (next.disabled) again.focus(); });
      again.addEventListener('click', () => { at = 0; paint(); next.focus(); });
      region.append(add(el('label', '', label + ' '), bar));
      if (list) region.append(list);
      region.append(stack(next, again), said);
      paint();
      return region;
    },

    toast({text}) {
      const region = el('div'), box = el('div', 'ds-toast'), line = el('span', '', text), dismiss = button('Dismiss'), again = button('Show the receipt again', 'action quiet');
      line.setAttribute('role', 'status');
      again.hidden = true;
      dismiss.addEventListener('click', () => { box.hidden = true; again.hidden = false; again.focus(); });
      again.addEventListener('click', () => { box.hidden = false; again.hidden = true; dismiss.focus(); });
      return add(region, add(box, line, dismiss), again);
    },

    reactions({prompt}) {
      const picker = el('div', 'reaction-picker'), said = status('No reaction selected.');
      picker.setAttribute('role', 'group');
      picker.setAttribute('aria-label', prompt);
      const options = [['thumbs-up', 'Thumbs up'], ['heart', 'Heart'], ['check', 'Check'], ['eyes', 'Eyes'], ['thinking-face', 'Thinking face']];
      const buttons = options.map(([id, name]) => {
        const choose = Object.assign(el('button'), {type: 'button'});
        choose.setAttribute('aria-pressed', 'false');
        choose.append(Object.assign(el('img'), {src: 'icon-media/paper/emoji-' + id + '.svg', alt: ''}), el('span', '', name));
        choose.addEventListener('click', () => {
          const pressed = choose.getAttribute('aria-pressed') !== 'true';
          for (const other of buttons) other.setAttribute('aria-pressed', String(other === choose && pressed));
          said.value = pressed ? name + ' selected.' : 'No reaction selected.';
        });
        return choose;
      });
      picker.append(...buttons);
      return add(el('div'), el('p', '', prompt), picker, said);
    },

    toolbar({room}) {
      const demo = el('div', 'room-demo'), said = status(), bar = el('div', 'room-toolbar'), live = el('span', 'room-live', 'Connected');
      said.classList.add('room-receipt');
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', 'Call controls');
      const control = (label, name, glyph, on, off, pressed) => {
        const key = Object.assign(el('button', 'room-control'), {type: 'button'});
        const state = el('span', 'room-control-state', pressed ? on : off);
        state.setAttribute('aria-hidden', 'true');
        key.setAttribute('aria-label', name);
        key.setAttribute('aria-pressed', String(pressed));
        key.append(add(el('span', 'room-glyph'), icon(glyph)), el('span', 'room-control-label', label), state);
        key.addEventListener('click', () => {
          const now = key.getAttribute('aria-pressed') !== 'true';
          key.setAttribute('aria-pressed', String(now));
          state.textContent = now ? on : off;
          said.value = name + ': ' + (now ? on : off).toLowerCase() + '.';
        });
        return key;
      };
      const leave = Object.assign(el('button', 'room-control room-leave'), {type: 'button'});
      leave.setAttribute('aria-haspopup', 'dialog');
      leave.setAttribute('aria-label', 'Leave room');
      leave.append(add(el('span', 'room-glyph'), icon('exit')), el('span', 'room-control-label', 'Leave'));
      const rejoin = el('div', 'room-rejoin'), back = button('Rejoin the sample room', 'action filled');
      rejoin.hidden = true;
      rejoin.append(el('p', '', 'You left the sample room.'), back);
      const confirm = dialog({title: 'Leave ' + room + '?', summary: 'Your microphone, camera and screen share stop in this preview.',
        detail: [room, 'Sample room'], action: 'Leave room', danger: true, mark: 'exit'}, left => {
        if (!left) { said.value = 'You stayed in the room.'; return; }
        bar.hidden = true; rejoin.hidden = false; live.textContent = 'Left'; demo.dataset.connected = 'false'; said.value = 'You left ' + room + '.';
      });
      leave.addEventListener('click', () => confirm.open(leave));
      back.addEventListener('click', () => { bar.hidden = false; rejoin.hidden = true; live.textContent = 'Connected'; demo.dataset.connected = 'true'; said.value = 'You rejoined ' + room + '.'; leave.focus(); });
      bar.append(control('Mic', 'Microphone', 'microphone', 'On', 'Muted', true), control('Camera', 'Camera', 'video', 'On', 'Off', false),
        control('Captions', 'Captions', 'captions', 'On', 'Off', false), control('Share', 'Screen sharing', 'monitor', 'Sharing', 'Off', false), leave);
      demo.append(add(el('div', 'room-demo-head'), add(el('div'), icon('room'), el('strong', '', room)), live), bar, rejoin);
      return add(el('div'), demo, said, confirm.node);
    },

    stage({image, alt, caption}) {
      const figure = el('figure', 'ds-stage'), text = el('figcaption', '', caption), show = button('Show captions');
      const id = uid('caption');
      text.id = id;
      text.hidden = true;
      show.setAttribute('aria-controls', id);
      show.setAttribute('aria-expanded', 'false');
      show.addEventListener('click', () => {
        text.hidden = !text.hidden;
        show.setAttribute('aria-expanded', String(!text.hidden));
        show.textContent = text.hidden ? 'Show captions' : 'Hide captions';
      });
      figure.append(Object.assign(el('img'), {src: IMAGES[image], alt, width: 640, height: 427, loading: 'lazy'}), text);
      return add(el('div'), figure, show);
    },

    confirm(spec) {
      const said = status(), open = button(spec.open, spec.danger ? 'action danger-action' : 'action filled');
      open.setAttribute('aria-haspopup', 'dialog');
      const sheet = dialog(spec, yes => { said.value = yes ? spec.action + ': confirmed in this preview only.' : 'Cancelled. Nothing changed.'; });
      open.addEventListener('click', () => sheet.open(open));
      return add(el('div'), open, said, sheet.node);
    },

    form({fields, submit, alt, receipt}) {
      const form = el('form', 'ds-form'), set = el('div', 'ds-fields'), said = status(), controls = [];
      form.noValidate = true;
      for (const [name, kind, value, help] of fields) {
        let control;
        if (kind === 'select') {
          control = el('select');
          for (const option of value) control.append(el('option', '', option));
        } else if (kind === 'textarea') {
          control = Object.assign(el('textarea'), {rows: 3, maxLength: 280, value: value || ''});
        } else {
          control = Object.assign(el('input'), {type: kind === 'datetime' ? 'datetime-local' : kind});
          if (value != null && kind !== 'file') control.value = value;
        }
        const optional = /optional/i.test(name);
        control.required = !optional && kind !== 'select';
        const field = add(el('label', '', name), control);
        if (kind === 'textarea') {
          const count = el('output', '', control.value.length + ' / 280');
          control.addEventListener('input', () => { count.value = control.value.length + ' / 280'; });
          field.append(count);
        }
        if (help) field.append(el('small', '', help));
        controls.push([name, control]);
        set.append(add(el('div', 'ds-field'), field));
      }
      const send = Object.assign(button(submit, 'action filled'), {type: 'submit'});
      const actions = add(el('div', 'ds-actions'), send);
      if (alt) {
        const other = button(alt);
        other.addEventListener('click', () => { said.value = alt + ': recorded in this preview.'; });
        actions.append(other);
      }
      form.addEventListener('submit', event => {
        event.preventDefault();
        let missing;
        for (const [name, control] of controls) {
          const bad = !control.checkValidity();
          control.toggleAttribute('aria-invalid', bad);
          if (bad && !missing) missing = [name, control];
        }
        if (missing) { said.value = 'Fill in “' + missing[0] + '” first.'; missing[1].focus(); return; }
        said.value = receipt;
      });
      return add(form, set, actions, said);
    },

    accordion({rows}) {
      const region = el('div');
      for (const [summary, text] of rows) region.append(add(el('details', 'ds-disclosure'), el('summary', '', summary), el('p', '', text)));
      return region;
    },

    tabs({label, tabs}) {
      const region = el('div'), list = stack(), panels = [];
      list.setAttribute('role', 'tablist');
      list.setAttribute('aria-label', label);
      const keys = tabs.map(([name, text], index) => {
        const tab = button(name), tabId = uid('tab'), panelId = uid('panel');
        const panel = add(el('div', 'gl-tabpanel'), el('p', '', text));
        tab.id = tabId;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', panelId);
        panel.id = panelId;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabId);
        panels.push(panel);
        tab.addEventListener('click', () => select(index));
        return tab;
      });
      function select(index, focus) {
        keys.forEach((tab, i) => {
          tab.setAttribute('aria-selected', String(i === index));
          tab.tabIndex = i === index ? 0 : -1;
          panels[i].hidden = i !== index;
        });
        if (focus) keys[index].focus();
      }
      list.addEventListener('keydown', event => {
        const at = keys.indexOf(document.activeElement);
        const to = {ArrowRight: (at + 1) % keys.length, ArrowLeft: (at + keys.length - 1) % keys.length, Home: 0, End: keys.length - 1}[event.key];
        if (at < 0 || to === undefined) return;
        event.preventDefault();
        select(to, true);
      });
      list.append(...keys);
      select(0);
      return add(region, list, ...panels);
    },

    pager({unit, items}) {
      const region = el('div'), slide = el('div', 'gl-slide'), title = el('strong'), text = el('p');
      const pager = el('div', 'ds-pager'), back = button('Previous'), next = button('Next'), where = el('output');
      where.setAttribute('role', 'status');
      let at = 0;
      const paint = () => {
        [title.textContent, text.textContent] = items[at];
        where.value = unit + ' ' + (at + 1) + ' of ' + items.length;
        back.disabled = at === 0;
        next.disabled = at === items.length - 1;
      };
      back.addEventListener('click', () => { at--; paint(); if (back.disabled) next.focus(); });
      next.addEventListener('click', () => { at++; paint(); if (next.disabled) back.focus(); });
      paint();
      return add(region, add(slide, title, text), add(pager, back, where, next));
    },

    find({label, placeholder, items}) {
      const region = el('div'), input = Object.assign(el('input'), {type: 'search', placeholder}), list = el('ul', 'gl-found'), count = el('output');
      const id = uid('found');
      list.id = id;
      input.setAttribute('aria-controls', id);
      count.setAttribute('role', 'status');
      const paint = () => {
        const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
        const found = items.filter(item => words.every(word => item.toLowerCase().includes(word)));
        list.replaceChildren(...found.map(item => el('li', '', item)));
        count.value = found.length === 1 ? '1 result' : found.length + ' results' + (found.length ? '' : '. Try another word.');
      };
      input.addEventListener('input', paint);
      paint();
      return add(region, add(el('div', 'ds-field'), add(el('label', '', label), input)), list, count);
    },

    links({rows}) {
      const list = el('ul', 'asset-list');
      for (const [name, href, meta] of rows) list.append(add(el('li'), Object.assign(el('a', '', name), {href}), el('span', '', meta)));
      return list;
    },

    slider({label, marks, min = 0, max, value, unit = ''}) {
      const range = Object.assign(el('input'), {type: 'range', min, max: marks ? marks.length - 1 : max, step: 1, value});
      const out = el('output');
      const paint = () => { out.value = marks ? marks[Number(range.value)] : range.value + unit; };
      range.addEventListener('input', paint);
      paint();
      return add(el('div', 'ds-field'), add(el('label', '', label), range, out));
    },

    compare({options, pick}) {
      const region = el('div'), grid = el('div', 'ds-layout-example gl-even'), said = pick && status(), buttons = [];
      for (const [name, text] of options) {
        const pane = add(el('div'), el('strong', '', name), el('p', '', text));
        if (pick) {
          const choose = button(pick + ' this');
          choose.setAttribute('aria-pressed', 'false');
          choose.setAttribute('aria-label', pick + ' ' + name);
          choose.addEventListener('click', () => {
            for (const other of buttons) other.setAttribute('aria-pressed', String(other === choose));
            said.value = 'Chosen: ' + name + '.';
          });
          buttons.push(choose);
          pane.append(choose);
        }
        grid.append(pane);
      }
      return add(region, grid, said);
    },

    bars({rows, unit}) {
      const list = el('ul', 'gl-bars'), total = rows.reduce((sum, [, amount]) => sum + Number(amount), 0);
      for (const [name, amount] of rows) {
        const bar = el('progress');
        bar.max = total;
        bar.value = Number(amount);
        bar.setAttribute('aria-label', name + ': ' + amount + ' of ' + total + ' ' + unit);
        list.append(add(el('li'), el('span', '', name), el('strong', '', amount + ' ' + (Number(amount) === 1 ? one(unit) : unit)), bar));
      }
      return list;
    },

    thread({rows, compose}) {
      const region = el('div'), list = el('ul', 'gl-thread');
      const post = (who, text) => list.append(add(el('li'), el('strong', '', who), el('p', '', text)));
      for (const [who, text] of rows) post(who, text);
      region.append(list);
      if (!compose) return region;
      const form = el('form', 'ds-form'), field = Object.assign(el('textarea'), {rows: 2, maxLength: 280}), said = status();
      form.noValidate = true;
      form.addEventListener('submit', event => {
        event.preventDefault();
        const text = field.value.trim();
        if (!text) { said.value = 'Write a message first.'; field.focus(); return; }
        post('You', text);
        field.value = '';
        said.value = 'Posted in this preview.';
        field.focus();
      });
      form.append(add(el('div', 'ds-field'), add(el('label', '', compose), field)),
        add(el('div', 'ds-actions'), Object.assign(button('Send', 'action filled'), {type: 'submit'})), said);
      return add(region, form);
    },

    skeleton({waiting, ready, action}) {
      const region = el('div'), blocks = add(el('div', 'ds-placeholder'), el('i'), el('i')), line = el('p', '', waiting), act = button(action), again = button('Start again', 'action quiet');
      blocks.setAttribute('aria-hidden', 'true');
      line.setAttribute('role', 'status');
      again.hidden = true;
      act.addEventListener('click', () => { blocks.hidden = true; line.textContent = ready; act.hidden = true; again.hidden = false; again.focus(); });
      again.addEventListener('click', () => { blocks.hidden = false; line.textContent = waiting; act.hidden = false; again.hidden = true; act.focus(); });
      return add(region, blocks, line, stack(act, again));
    },

    breadcrumb({label, path}) {
      const nav = el('nav', 'ds-breadcrumb');
      nav.setAttribute('aria-label', label);
      path.forEach((part, index) => {
        if (index) { const slash = el('span', '', '/'); slash.setAttribute('aria-hidden', 'true'); nav.append(slash); }
        const item = el('span', '', part);
        if (index === path.length - 1) item.setAttribute('aria-current', 'page');
        nav.append(item);
      });
      return nav;
    },

    copy({label, value, scope}) {
      const said = status(), act = button(label);
      act.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(value); said.value = 'Copied: ' + value; }
        catch { said.value = 'Copy this address: ' + value; }
      });
      return add(el('div'), stack(act, el('span', 'context-chip', scope)), said);
    }
  };

  // What each component accepts. `rows:n` is a list of rows of exactly n to m short texts; the build turns this table
  // into the JSON schema, and `check` below is the same rule in the browser.
  const text = {kind: 'text'}, texts = {kind: 'texts'}, rows = (min, max = min) => ({kind: 'rows', min, max});
  const optional = shape => ({...shape, optional: true});
  const registry = {
    facts: {name: 'Key–value details', source: 'brand.html#definition-list', shape: {rows: rows(2)}},
    table: {name: 'Sortable table', source: 'brand.html#data-table', shape: {caption: text, columns: texts, rows: rows(2, 4)}},
    status: {name: 'Status chip', source: 'brand.html#status-chip', shape: {rows: rows(3, 4)}},
    people: {name: 'Avatar and identity', source: 'brand.html#avatar', shape: {rows: rows(2, 3)}},
    queue: {name: 'Guest lobby queue', source: 'brand.html#guest-queue', shape: {rows: rows(2)}},
    files: {name: 'File card', source: 'brand.html#file-card', shape: {rows: rows(3)}},
    choices: {name: 'Radio group', source: 'brand.html#radio', shape: {legend: text, options: texts}},
    checks: {name: 'Checkbox', source: 'brand.html#checkbox', shape: {legend: text, items: texts, on: optional({kind: 'indexes'})}},
    switches: {name: 'Switch', source: 'brand.html#switch', shape: {items: texts, on: optional({kind: 'indexes'})}},
    toggles: {name: 'Toggle group', source: 'brand.html#toggle-group', shape: {label: text, items: texts, on: optional({kind: 'indexes'})}},
    segments: {name: 'Treatment selector', source: 'brand.html#components', shape: {label: text, items: texts, on: optional({kind: 'int'})}},
    notice: {name: 'Inline notice', source: 'brand.html#notice', shape: {tone: {kind: 'enum', of: ['info', 'warning', 'success', 'failure']}, title: text, text, action: optional(text)}},
    empty: {name: 'Empty state', source: 'brand.html#empty', shape: {text, action: text, result: text}},
    progress: {name: 'Progress', source: 'brand.html#progress', shape: {label: text, steps: optional(texts), done: optional({kind: 'int'}), value: optional({kind: 'int'}), max: optional({kind: 'int'}), unit: optional(text)}},
    toast: {name: 'Toast', source: 'brand.html#toast', shape: {text}},
    reactions: {name: 'Reaction picker', source: 'brand.html#components', shape: {prompt: text}},
    toolbar: {name: 'Room toolbar', source: 'brand.html#room-toolbar', shape: {room: text}},
    stage: {name: 'Stage and captions', source: 'brand.html#stage-and-captions', shape: {image: {kind: 'enum', of: Object.keys(IMAGES)}, alt: text, caption: text}},
    confirm: {name: 'Modal dialog', source: 'brand.html#modal', shape: {open: text, title: text, summary: text, detail: {kind: 'texts'}, action: text, danger: optional({kind: 'bool'}), mark: optional({kind: 'enum', of: [...ICONS]})}},
    form: {name: 'Complete forms', source: 'brand.html#forms-group-2', shape: {fields: {kind: 'fields'}, submit: text, alt: optional(text), receipt: text}},
    accordion: {name: 'Accordion', source: 'brand.html#accordion', shape: {rows: rows(2)}},
    tabs: {name: 'Tabs', source: 'brand.html#tabs-component', shape: {label: text, tabs: rows(2)}},
    pager: {name: 'Pagination', source: 'brand.html#pagination', shape: {unit: text, items: rows(2)}},
    find: {name: 'Search and clear', source: 'brand.html#search-field', shape: {label: text, placeholder: text, items: texts}},
    links: {name: 'Link and download', source: 'brand.html#link', shape: {rows: {kind: 'links'}}},
    slider: {name: 'Range slider', source: 'brand.html#range', shape: {label: text, marks: optional(texts), min: optional({kind: 'int'}), max: optional({kind: 'int'}), value: {kind: 'int'}, unit: optional(text)}},
    compare: {name: 'Responsive split', source: 'brand.html#responsive-layout', shape: {options: rows(2), pick: optional(text)}},
    bars: {name: 'Progress', source: 'brand.html#progress', shape: {rows: {kind: 'amounts'}, unit: text}},
    thread: {name: 'Message and review composer', source: 'brand.html#composer', shape: {rows: rows(2), compose: optional(text)}},
    skeleton: {name: 'Loading placeholder', source: 'brand.html#skeleton', shape: {waiting: text, ready: text, action: text}},
    breadcrumb: {name: 'Breadcrumb', source: 'brand.html#breadcrumbs', shape: {label: text, path: texts}},
    copy: {name: 'Invite link', source: 'brand.html#guest-link', shape: {label: text, value: text, scope: text}}
  };

  const isText = value => typeof value === 'string' && value.length > 0 && value.length <= 280;
  const isList = (value, test, max = 12) => Array.isArray(value) && value.length > 0 && value.length <= max && value.every(test);
  const FIELD_KINDS = new Set(['text', 'email', 'tel', 'url', 'number', 'date', 'time', 'datetime', 'select', 'textarea', 'file']);
  const tests = {
    text: isText,
    texts: value => isList(value, isText),
    rows: (value, {min, max}) => isList(value, row => Array.isArray(row) && row.length >= min && row.length <= max && row.every(cell => typeof cell === 'string' && cell.length <= 280)),
    indexes: value => Array.isArray(value) && value.length <= 12 && value.every(Number.isInteger),
    int: Number.isInteger,
    bool: value => typeof value === 'boolean',
    enum: (value, {of}) => of.includes(value),
    amounts: value => isList(value, row => Array.isArray(row) && row.length === 2 && isText(row[0]) && Number.isFinite(row[1]) && row[1] >= 0),
    links: value => isList(value, row => Array.isArray(row) && row.length === 3 && isText(row[0]) && LINK.test(row[1]) && isText(row[2])),
    fields: value => isList(value, field => Array.isArray(field) && field.length >= 2 && field.length <= 4 && isText(field[0]) && FIELD_KINDS.has(field[1])
      && (field[1] === 'select' ? isList(field[2], isText) : field[2] == null || typeof field[2] === 'string')
      && (field[3] == null || isText(field[3])), 6)
  };

  /** True when a component's data is exactly what its entry in the registry allows. */
  function check(component) {
    if (!component || typeof component !== 'object' || Array.isArray(component) || !Object.hasOwn(registry, component.type)) return false;
    const {shape} = registry[component.type];
    for (const key of Object.keys(component)) if (key !== 'type' && !Object.hasOwn(shape, key)) return false;
    for (const [key, rule] of Object.entries(shape)) {
      if (component[key] === undefined) { if (rule.optional) continue; return false; }
      if (!tests[rule.kind](component[key], rule)) return false;
    }
    if (component.type === 'progress' && !component.steps && !(component.max > 0 && isText(component.unit))) return false;
    if (component.type === 'slider' && !component.marks && !Number.isInteger(component.max)) return false;
    if (component.type === 'confirm' && component.detail.length !== 2) return false;
    return true;
  }

  /** A whole view: one to three checked components, built in order. Returns null if any part fails the check. */
  function render(view) {
    if (!Array.isArray(view) || view.length < 1 || view.length > 3 || !view.every(check)) return null;
    const region = el('div', 'ds-preview gl-blocks');
    for (const component of view) {
      const block = renderers[component.type](component);
      block.dataset.component = component.type;
      region.append(block);
    }
    return region;
  }

  window.SharedGenerativeComponents = Object.freeze({registry, check, render, supports: type => Object.hasOwn(registry, type)});
})();
