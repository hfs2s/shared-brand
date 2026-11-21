(() => {
  const talk = document.querySelector('[data-talk-demo]');
  if (talk) initTalk(talk);

  function initTalk(root) {
    const control = name => root.querySelector(`[data-talk-${name}]`);
    const main = control('main');
    const scenario = control('scenario');
    const type = control('type');
    const end = control('end');
    const form = control('form');
    const input = form.querySelector('input');
    const transcript = control('transcript');
    const stateLabel = control('state');
    const caption = control('caption');
    const buttons = {
      ready: 'Start call', connecting: 'Connecting…', turn: 'Open microphone',
      listening: 'Finish turn', thinking: 'Interrupt', speaking: 'Interrupt',
      blocked: 'Retry microphone', reconnecting: 'Reconnect', ended: 'Start new call',
    };
    let state = 'ready';
    let timer;
    let interrupted = false;
    let micBlocked = false;

    function show(next, label, text) {
      clearTimeout(timer);
      state = next;
      stateLabel.textContent = label;
      stateLabel.classList.toggle('page-state-live', next === 'listening' || next === 'speaking');
      if (text !== undefined) caption.textContent = text;
      main.textContent = buttons[next];
      main.setAttribute('aria-disabled', String(next === 'connecting'));
      const active = next !== 'ready' && next !== 'ended';
      type.hidden = end.hidden = !active;
      form.querySelector('button').disabled = next === 'connecting' || next === 'reconnecting';
      if (!active) {
        form.hidden = true;
        type.textContent = 'Type a message';
        type.setAttribute('aria-expanded', 'false');
      }
    }

    function revealTyping(open) {
      form.hidden = !open;
      type.textContent = open ? 'Hide typing' : 'Type a message';
      type.setAttribute('aria-expanded', String(open));
      if (open) input.focus();
    }

    function turn(speaker, words) {
      const item = document.createElement('li');
      const name = document.createElement('strong');
      name.textContent = speaker;
      item.append(name, document.createTextNode(words));
      transcript.append(item);
      control('empty').hidden = true;
    }

    function readyForTurn(text) {
      if (micBlocked) show('blocked', 'Microphone blocked', text ?? 'Allow microphone access in your browser, or type here.');
      else show('turn', 'Your turn', text);
    }

    function reply(words) {
      turn('You', words);
      show('thinking', 'Thinking', 'Elio is preparing a reply.');
      timer = setTimeout(() => {
        const response = 'The workshop starts at 10:30 in the main studio.';
        turn('Elio', response);
        show('speaking', 'Speaking', response);
        timer = setTimeout(() => readyForTurn(), 2200);
      }, 650);
    }

    function connect() {
      show('connecting', 'Connecting', 'Opening the conversation with Elio.');
      timer = setTimeout(() => {
        const greeting = 'Hi, I’m Elio. What would you like to know about Open Studio?';
        turn('Elio', greeting);
        readyForTurn(micBlocked ? undefined : greeting);
        if (micBlocked) revealTyping(true);
      }, 550);
    }

    function beginTurn() {
      if (scenario.value === 'dropped' && !interrupted) {
        interrupted = true;
        show('reconnecting', 'Reconnecting', 'The connection dropped. Reconnect to pick up where you left off.');
      } else {
        show('listening', 'Listening', 'Select Finish turn to send a sample spoken question.');
      }
    }

    function tryTurn(words) {
      if (scenario.value === 'dropped' && !interrupted) {
        interrupted = true;
        show('reconnecting', 'Reconnecting', 'Your message is still here. Reconnect, then send it.');
        main.focus();
        return;
      }
      input.value = '';
      reply(words);
    }

    function reset() {
      interrupted = false;
      micBlocked = scenario.value === 'blocked';
      input.value = '';
      transcript.replaceChildren();
      control('empty').hidden = false;
    }

    form.id = 'sample-typing';
    type.setAttribute('aria-controls', form.id);
    type.setAttribute('aria-expanded', 'false');
    scenario.addEventListener('change', () => {
      reset();
      show('ready', 'Ready', 'Ask about the Open Studio programme.');
    });
    main.addEventListener('click', () => {
      switch (state) {
        case 'ready':
        case 'ended': reset(); connect(); break;
        case 'turn': beginTurn(); break;
        case 'listening': reply('What time does the workshop start?'); break;
        case 'thinking':
        case 'speaking': readyForTurn('Reply interrupted. You can take another turn.'); break;
        case 'blocked': readyForTurn('The microphone is still blocked in this scenario. You can keep typing.'); break;
        case 'reconnecting':
          readyForTurn('Connection restored. Pick up where you left off.');
          if (!form.hidden) input.focus();
          break;
      }
    });
    type.addEventListener('click', () => revealTyping(form.hidden));
    end.addEventListener('click', () => {
      show('ended', 'Call ended', 'Open the transcript to read the conversation.');
      main.focus();
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (state === 'connecting' || state === 'reconnecting') return;
      const words = input.value.trim();
      if (words) tryTurn(words);
    });
  }

  function switchPanel(buttons, panels, value) {
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.getAttribute('aria-controls') === value));
    for (const panel of panels) panel.hidden = panel.id !== value;
  }

  const workbench = document.querySelector('[data-elio-workbench]');
  if (workbench) {
    const views = workbench.querySelectorAll('[data-work-view]');
    const modes = workbench.querySelectorAll('[data-work-mode]');
    const panels = workbench.querySelectorAll('[data-work-panel]');
    const sheets = workbench.querySelectorAll('[data-work-sheet]');
    const title = workbench.querySelector('[data-work-title]');
    const form = workbench.querySelector('form');
    const input = form.querySelector('input');
    const status = workbench.querySelector('[data-work-status]');
    for (const button of views) {
      button.addEventListener('click', () => {
        switchPanel(views, panels, button.getAttribute('aria-controls'));
        title.textContent = button.textContent;
      });
    }
    for (const button of modes) {
      button.addEventListener('click', () => switchPanel(modes, sheets, button.getAttribute('aria-controls')));
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      const words = input.value.trim();
      if (!words) return;
      const item = document.createElement('li');
      const sender = document.createElement('strong');
      const text = document.createElement('p');
      sender.textContent = 'You';
      text.textContent = words;
      item.append(sender, text);
      workbench.querySelector('[data-work-transcript]').append(item);
      input.value = '';
      status.textContent = 'Message added to sample Chat.';
      input.focus();
    });
  }

  const room = document.querySelector('[data-room-preview]');
  if (room) {
    const find = name => room.querySelector(`[data-room-${name}]`);
    const join = room.querySelector('[data-join-demo]');
    const enter = join.querySelector('button');
    const active = find('active');
    const lobby = find('lobby');
    const status = find('state');
    const dock = find('dock');
    const leave = find('leave');
    const guest = find('guest');
    const mic = find('mic');
    const camera = find('camera');
    const captions = find('captions');
    const caption = room.querySelector('#room-caption');
    const views = room.querySelectorAll('[data-room-view]');
    const panels = room.querySelectorAll('[data-room-panel]');
    const guestStatus = guest.querySelector('[data-guest-status]');
    const decisions = guest.querySelectorAll('[data-guest-decision]');
    let decided = false;

    function applySwitch(button, on) {
      button.setAttribute('aria-pressed', String(on));
      button.querySelector('span').textContent = on ? 'on' : 'off';
      if (button === camera) find('self').textContent = on ? 'You · Camera on' : 'You · Camera off';
      if (button === captions) caption.hidden = !on;
    }
    for (const button of [mic, camera, captions]) {
      button.addEventListener('click', () => applySwitch(button, button.getAttribute('aria-pressed') !== 'true'));
    }
    for (const button of views) {
      button.addEventListener('click', () => switchPanel(views, panels, button.getAttribute('aria-controls')));
    }
    join.addEventListener('submit', event => {
      event.preventDefault();
      if (enter.disabled) return;
      enter.disabled = true;
      status.textContent = 'Connecting…';
      setTimeout(() => {
        enter.disabled = false;
        applySwitch(mic, join.elements['join-audio'].checked);
        applySwitch(camera, join.elements['join-video'].checked);
        applySwitch(captions, false);
        switchPanel(views, panels, 'room-people');
        decided = false;
        for (const button of decisions) button.removeAttribute('aria-disabled');
        guestStatus.textContent = 'Waiting in the lobby';
        status.textContent = 'Connected';
        status.classList.add('page-state-live');
        lobby.hidden = true;
        active.hidden = guest.hidden = dock.hidden = false;
        views[0].focus();
        join.hidden = true;
      }, 400);
    });
    leave.addEventListener('click', () => {
      status.textContent = 'Lobby · You left the preview';
      status.classList.remove('page-state-live');
      join.hidden = lobby.hidden = false;
      enter.focus();
      active.hidden = guest.hidden = dock.hidden = true;
    });
    for (const button of decisions) {
      button.addEventListener('click', () => {
        if (decided) return;
        decided = true;
        guestStatus.textContent = button.dataset.guestDecision;
        for (const decision of decisions) decision.setAttribute('aria-disabled', 'true');
      });
    }
  }

  const search = document.querySelector('[data-search-demo]');
  if (search) {
    const query = search.querySelector('input');
    const filter = search.querySelector('select');
    const rooms = [...search.querySelectorAll('li')];
    const count = search.querySelector('[data-search-count]');
    const empty = search.querySelector('[data-search-empty]');
    function update() {
      const term = query.value.trim().toLowerCase();
      let visible = 0;
      for (const room of rooms) {
        const matchesName = room.querySelector('strong').textContent.toLowerCase().includes(term);
        const matchesStatus = !filter.value || room.querySelector('.page-state').textContent === filter.value;
        room.hidden = !(matchesName && matchesStatus);
        if (!room.hidden) visible += 1;
      }
      count.textContent = `${visible} ${visible === 1 ? 'room' : 'rooms'}`;
      empty.hidden = visible !== 0;
    }
    query.addEventListener('input', update);
    filter.addEventListener('change', update);
    search.querySelector('[data-clear-filters]').addEventListener('click', () => {
      query.value = filter.value = '';
      update();
      query.focus();
    });
  }

  const review = document.querySelector('[data-review-demo]');
  if (review) {
    const note = review.querySelector('textarea');
    const optional = review.querySelector('[data-note-optional]');
    const result = review.querySelector('[role=status]');
    const decision = review.elements['review-choice'];
    review.querySelector('fieldset').addEventListener('change', () => {
      note.required = decision.value === 'Changes requested';
      optional.textContent = note.required ? '(required)' : '(optional)';
      note.setCustomValidity('');
    });
    note.addEventListener('input', () => note.setCustomValidity(''));
    review.addEventListener('submit', event => {
      event.preventDefault();
      if (note.required && !note.value.trim()) {
        note.setCustomValidity('Add a note explaining what should change.');
        note.reportValidity();
        return;
      }
      document.querySelector('[data-review-state]').textContent = decision.value;
      result.textContent = `Preview saved. Revision 3 · ${decision.value}.`;
    });
  }

  const retry = document.querySelector('[data-retry-demo]');
  if (retry) {
    const button = retry.querySelector('[data-retry-button]');
    const title = retry.querySelector('[data-retry-title]');
    const status = retry.querySelector('[data-retry-status]');
    let pending = false;
    button.addEventListener('click', () => {
      if (pending) return;
      if (button.textContent === 'Reset preview') {
        title.textContent = 'Summary couldn’t load';
        status.textContent = 'Your recording is available. Try loading the summary again.';
        button.textContent = 'Retry summary';
        return;
      }
      pending = true;
      button.setAttribute('aria-disabled', 'true');
      button.textContent = 'Retrying…';
      status.textContent = 'Loading the summary again.';
      setTimeout(() => {
        pending = false;
        title.textContent = 'Recording summary';
        status.textContent = 'The studio chose the lead photograph and assigned the first edit.';
        button.textContent = 'Reset preview';
        button.removeAttribute('aria-disabled');
      }, 650);
    });
  }
})();
