'use strict';

document.querySelectorAll('[data-demo]').forEach(card => {
  const kind = card.dataset.demo;
  const run = card.querySelector('.run');
  const pause = card.querySelector('.pause');
  const status = card.querySelector('.state');
  const progress = card.querySelector('progress');
  const output = card.querySelector('output');
  const buttonLabel = card.querySelector('.sample-button b');
  const skeleton = card.querySelector('.skeleton');
  const loadedCard = card.querySelector('.loaded-card');
  const ticket = card.querySelector('.ticket b');
  const stages = Array.from(card.querySelectorAll('.steps li'));
  const transition = ['disclose', 'toast', 'swap'].includes(kind);
  const duration = transition ? 1350 : 4200;
  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  let retry = false;
  let phase = 'ready';

  function announce(message) {
    if (status.textContent !== message) status.textContent = message;
  }

  function update(fraction) {
    if (progress) {
      const percent = Math.floor(fraction * 100);
      progress.value = percent;
      output.textContent = percent + '%';
    }
    if (skeleton && skeleton.hidden !== (fraction === 1)) {
      skeleton.hidden = fraction === 1;
      loadedCard.hidden = fraction < 1;
    }
    if (stages.length) {
      const current = Math.min(stages.length - 1, Math.floor(fraction * stages.length));
      stages.forEach((item, index) => item.classList.toggle('active', index <= current));
      if (fraction < 1) announce(stages[current].textContent);
    }
    if (ticket) {
      const message = retry ? 'Retrying export' : 'Waiting in queue';
      ticket.textContent = message;
      announce(retry ? 'Retrying' : 'Queued');
    }
    if (buttonLabel) buttonLabel.textContent = fraction < 1 ? 'Saving…' : 'Draft saved';
    if (transition) card.classList.toggle('shown', fraction >= .28);
  }

  function tick(now) {
    elapsed += now - previous;
    previous = now;
    const fraction = Math.min(1, elapsed / duration);
    update(fraction);
    if (fraction < 1) {
      frame = requestAnimationFrame(tick);
      return;
    }
    phase = ticket && !retry ? 'failed' : 'complete';
    pause.disabled = true;
    card.classList.remove('playing');
    if (ticket) ticket.textContent = retry ? 'Export complete' : 'Connection lost';
    announce(phase === 'failed' ? 'Retry available' : 'Complete');
    setRun(phase === 'failed' ? 'Retry' : 'Replay');
  }

  const name = card.querySelector('h3').textContent.toLowerCase();
  function setRun(label) {
    run.textContent = label;
    run.setAttribute('aria-label', label + ' ' + name);
  }
  function setPause(label) {
    pause.textContent = label;
    pause.setAttribute('aria-label', label + ' ' + name);
  }

  run.addEventListener('click', () => {
    cancelAnimationFrame(frame);
    retry = phase === 'failed';
    phase = 'playing';
    elapsed = transition && matchMedia('(prefers-reduced-motion: reduce)').matches ? duration : 0;
    previous = performance.now();
    card.classList.remove('playing', 'paused', 'shown');
    void card.offsetWidth;
    card.classList.add('playing');
    setRun('Replay');
    setPause('Pause');
    pause.disabled = false;
    announce('Running');
    update(0);
    frame = requestAnimationFrame(tick);
  });

  pause.addEventListener('click', () => {
    if (phase === 'playing') {
      cancelAnimationFrame(frame);
      phase = 'paused';
      card.classList.add('paused');
      setPause('Resume');
      announce('Paused');
    } else if (phase === 'paused') {
      phase = 'playing';
      previous = performance.now();
      card.classList.remove('paused');
      setPause('Pause');
      announce('Running');
      frame = requestAnimationFrame(tick);
    }
  });
});
