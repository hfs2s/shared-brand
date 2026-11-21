const lessMotion = matchMedia('(prefers-reduced-motion: reduce)');
const tokens = getComputedStyle(document.documentElement);
const fast = parseFloat(tokens.getPropertyValue('--motion-fast')) || 120;
const enter = parseFloat(tokens.getPropertyValue('--motion-enter')) || 220;
const ease = tokens.getPropertyValue('--motion-ease').trim() || 'ease-out';

const lab = document.querySelector('[data-easing-lab]');
if (lab) {
  const tracks = [...lab.querySelectorAll('[data-easing]')];
  const duration = lab.querySelector('select');
  const play = lab.querySelector('[data-easing-play]');
  const pause = lab.querySelector('[data-easing-pause]');
  const reset = lab.querySelector('[data-easing-reset]');
  const status = lab.querySelector('[data-easing-status]');
  let animations = [];
  let generation = 0;
  let paused = false;

  function clear() {
    generation += 1;
    for (const animation of animations) animation.cancel();
    animations = [];
    paused = false;
    pause.disabled = true;
    pause.textContent = 'Pause';
  }

  play.addEventListener('click', () => {
    clear();
    const run = generation;
    const reduced = lessMotion.matches;
    animations = tracks.map(lane => {
      const track = lane.querySelector('.easing-track');
      const marker = track.firstElementChild;
      const distance = Math.max(0, track.clientWidth - marker.offsetWidth);
      return marker.animate(
        [{transform: 'translateX(0)'}, {transform: `translateX(${distance}px)`}],
        {duration: reduced ? 0 : Number(duration.value), easing: lane.dataset.easing, fill: 'both'}
      );
    });
    status.textContent = reduced ? 'Reduced motion · end positions shown' : 'Playing';
    pause.disabled = reduced;
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (run !== generation) return;
      pause.disabled = true;
      pause.textContent = 'Pause';
      if (!reduced) status.textContent = 'Complete';
    });
  });
  pause.addEventListener('click', () => {
    paused = !paused;
    for (const animation of animations) paused ? animation.pause() : animation.play();
    pause.textContent = paused ? 'Resume' : 'Pause';
    status.textContent = paused ? 'Paused' : 'Playing';
  });
  reset.addEventListener('click', () => {
    clear();
    status.textContent = 'Ready';
  });
  lessMotion.addEventListener('change', () => {
    clear();
    status.textContent = lessMotion.matches ? 'Reduced motion enabled' : 'Ready';
  });
  let trackWidth = lab.clientWidth;
  new ResizeObserver(() => {
    if (trackWidth === lab.clientWidth) return;
    trackWidth = lab.clientWidth;
    clear();
    status.textContent = 'Ready';
  }).observe(lab);
}

for (const button of document.querySelectorAll('[data-motion-play]')) {
  const stage = button.closest('.motion-example-stage');
  const receipt = stage.querySelector('[role="status"]');
  button.addEventListener('click', () => {
    stage.removeAttribute('data-motion-running');
    void stage.offsetWidth;
    stage.setAttribute('data-motion-running', '');
    receipt.textContent = button.dataset.motionMessage;
  });
}

for (const button of document.querySelectorAll('[data-motion-toggle]')) {
  button.addEventListener('click', () => {
    const on = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(on));
    button.querySelector('[data-toggle-status]').textContent = on ? 'On' : 'Off';
  });
}

for (const group of document.querySelectorAll('[data-motion-segments]')) {
  const buttons = [...group.querySelectorAll('button')];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      group.toggleAttribute('data-second', button === buttons[1]);
      for (const choice of buttons) choice.setAttribute('aria-pressed', String(choice === button));
    });
  }
}

for (const stage of document.querySelectorAll('[data-motion-drawer]')) {
  const trigger = stage.querySelector('[aria-controls]');
  const drawer = document.getElementById(trigger.getAttribute('aria-controls'));
  const close = drawer.querySelector('[data-motion-dismiss]');
  function setOpen(open) {
    trigger.setAttribute('aria-expanded', String(open));
    drawer.inert = !open;
    drawer.toggleAttribute('data-open', open);
    (open ? close : trigger).focus({preventScroll: true});
  }
  trigger.addEventListener('click', () => setOpen(trigger.getAttribute('aria-expanded') !== 'true'));
  close.addEventListener('click', () => setOpen(false));
  stage.addEventListener('keydown', event => {
    if (event.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setOpen(false);
    }
  });
}

for (const button of document.querySelectorAll('[data-motion-dialog-open]')) {
  const dialog = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('[data-motion-dialog-close]').addEventListener('click', () => dialog.close());
}

for (const example of document.querySelectorAll('[data-motion-views]')) {
  const mode = example.dataset.motionViews;
  const buttons = [...example.querySelectorAll('[data-motion-view]')];
  const panes = [...example.querySelectorAll('[data-motion-pane]')];
  let selected = 0;
  let generation = 0;
  let effects = [];

  for (const [index, button] of buttons.entries()) {
    button.addEventListener('click', () => {
      if (selected === index) return;
      const run = ++generation;
      const from = panes[selected];
      const to = panes[index];
      const direction = index > selected ? 1 : -1;
      const fromOpacity = getComputedStyle(from).opacity;
      const fromTransform = getComputedStyle(from).transform;
      const targetWasVisible = !to.hidden;
      const previous = targetWasVisible ? getComputedStyle(to) : null;
      const startOpacity = previous?.opacity ?? 0;
      const startTransform = previous?.transform ?? (mode === 'slide' || mode === 'step' ? `translateX(${direction * 19}px)` : 'none');
      for (const effect of effects) effect.cancel();
      selected = index;
      for (const [candidate, pane] of panes.entries()) {
        const active = candidate === selected;
        pane.inert = !active;
        if (active) pane.removeAttribute('aria-hidden');
        else pane.setAttribute('aria-hidden', 'true');
        pane.hidden = !active;
        buttons[candidate].setAttribute('aria-pressed', String(active));
      }
      if (lessMotion.matches) return;
      from.hidden = false;
      const duration = mode === 'fade' ? fast : enter;
      const exitTransform = mode === 'slide' || mode === 'step' ? `translateX(${direction * -14}px)` : 'none';
      effects = [
        from.animate([{opacity: fromOpacity, transform: fromTransform}, {opacity: 0, transform: exitTransform}], {duration, easing: ease, fill: 'forwards'}),
        to.animate([{opacity: startOpacity, transform: startTransform}, {opacity: 1, transform: 'none'}], {duration, easing: ease}),
      ];
      if (mode === 'shared') {
        effects.push(to.querySelector('.motion-shared-key').animate(
          [{transform: index ? 'scale(.78)' : 'scale(1.18)'}, {transform: 'none'}], {duration, easing: ease}
        ));
      }
      Promise.allSettled(effects.map(effect => effect.finished)).then(() => {
        if (run !== generation) return;
        from.hidden = true;
        for (const effect of effects) effect.cancel();
        effects = [];
      });
    });
  }
}

for (const example of document.querySelectorAll('[data-motion-list]')) {
  const list = example.querySelector('ol');
  const receipt = example.querySelector('[role="status"]');
  example.querySelector('[data-motion-reorder]').addEventListener('click', () => {
    const items = [...list.children];
    const positions = items.map(item => item.getBoundingClientRect().top);
    for (const item of items) for (const effect of item.getAnimations()) effect.cancel();
    list.append(items[0]);
    if (!lessMotion.matches) {
      for (const [index, item] of items.entries()) {
        const delta = positions[index] - item.getBoundingClientRect().top;
        item.animate([{transform: `translateY(${delta}px)`}, {transform: 'none'}], {duration: enter, easing: ease});
      }
    }
    receipt.textContent = items[0].textContent + ' moved to the end.';
  });
}

for (const example of document.querySelectorAll('[data-motion-highlight]')) {
  const count = example.querySelector('[data-motion-count]');
  example.querySelector('[data-motion-increment]').addEventListener('click', () => {
    for (const effect of count.getAnimations()) effect.cancel();
    count.textContent = String(Number(count.textContent) + 1);
    if (!lessMotion.matches) count.animate(
      [{backgroundColor:'var(--lemon)'}, {backgroundColor:'transparent'}],
      {duration: 360, easing: ease}
    );
  });
}

const handoff = document.querySelector('[data-handoff]');
if (handoff) {
  const scenes = {
    call: {
      context: 'Elio Live', from: 'Conversation', to: 'Stage',
      kind: 'Launch brief', title: 'Opening remarks', detail: 'Draft by Elio',
      send: 'Share on Stage', undo: 'Return to conversation',
      ready: 'In conversation', received: 'Shared on Stage'
    },
    room: {
      context: 'Launch room', from: 'Room chat', to: 'Pinned in room',
      kind: 'Room note', title: 'Decisions from today', detail: 'Launch team',
      send: 'Pin to room', undo: 'Unpin note',
      ready: 'In room chat', received: 'Pinned in the launch room'
    },
    review: {
      context: 'Editorial review', from: 'In review', to: 'Approved',
      kind: 'Cover proof', title: 'Sunday edition', detail: 'Issue 08',
      send: 'Approve proof', undo: 'Reopen review',
      ready: 'Awaiting approval', received: 'Approved for publication'
    }
  };
  const sheet = handoff.querySelector('.handoff-sheet');
  const beds = handoff.querySelectorAll('.handoff-bed');
  const corners = [...sheet.querySelectorAll('.handoff-corner')];
  const action = handoff.querySelector('[data-transfer]');
  const status = handoff.querySelector('output');
  const slow = handoff.querySelector('[data-slow]');
  const choices = [...handoff.querySelectorAll('[data-scene]')];
  let scene = scenes.call;
  let delivered = false;

  function stopMovement() {
    for (const animation of sheet.getAnimations({subtree: true})) animation.cancel();
  }

  function updateResult() {
    action.textContent = delivered ? scene.undo : scene.send;
    status.textContent = delivered ? scene.received : scene.ready;
    sheet.toggleAttribute('data-registered', delivered);
  }

  function transfer() {
    const previous = sheet.getBoundingClientRect();
    stopMovement();
    delivered = !delivered;
    beds[Number(delivered)].append(sheet);
    updateResult();
    if (lessMotion.matches) return;

    const next = sheet.getBoundingClientRect();
    const speed = slow.checked ? 4 : 1;
    const travel = enter * speed;
    sheet.animate([
      {transform: 'translate(' + (previous.x - next.x) + 'px, ' + (previous.y - next.y) + 'px)'},
      {transform: 'none'}
    ], {duration: travel, easing: ease});
    if (delivered) {
      corners.forEach((corner, index) => {
        const offset = index === 0 ? '-4px, -4px' : '4px, 4px';
        corner.animate([{opacity: 0}, {opacity: 1}], {delay: travel, duration: 1, fill: 'backwards'});
        corner.animate([
          {transform: 'translate(' + offset + ')'},
          {transform: 'none'}
        ], {delay: travel, duration: fast * speed, easing: 'steps(2, end)', fill: 'backwards'});
      });
    }
  }

  action.addEventListener('click', transfer);
  for (const choice of choices) {
    choice.addEventListener('click', () => {
      if (scene === scenes[choice.dataset.scene]) return;
      stopMovement();
      scene = scenes[choice.dataset.scene];
      delivered = false;
      beds[0].append(sheet);
      for (const key of ['context', 'from', 'to', 'kind', 'title', 'detail']) {
        handoff.querySelector('[data-' + key + ']').textContent = scene[key];
      }
      handoff.querySelector('.handoff-context img').hidden = scene !== scenes.call;
      for (const button of choices) button.setAttribute('aria-pressed', String(button === choice));
      updateResult();
    });
  }
  lessMotion.addEventListener('change', stopMovement);
  let boardWidth = handoff.clientWidth;
  new ResizeObserver(() => {
    if (boardWidth !== handoff.clientWidth) stopMovement();
    boardWidth = handoff.clientWidth;
  }).observe(handoff);
}
