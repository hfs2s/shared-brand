import {animate} from './motion-mini-13.2.0.js';

const quiet = matchMedia('(prefers-reduced-motion: reduce)');

const stories = document.querySelector('.stories');
const stage = stories.querySelector('.scene-stage');
const picker = stories.querySelector('.scene-picker');
const scenes = [...stage.querySelectorAll('.scene')];
const rotation = document.createElement('button');
rotation.type = 'button';
rotation.className = 'rotation-control';
picker.append(rotation);

let active = 0;
let playing = !quiet.matches;
let visible = false;
let timer;
const interval = 7000;

function schedule() {
  clearTimeout(timer);
  rotation.textContent = playing ? 'Ⅱ' : '▶';
  const label = playing ? 'Pause carousel' : 'Play carousel';
  rotation.setAttribute('aria-label', label);
  rotation.title = label;
  stage.setAttribute('aria-live', playing ? 'off' : 'polite');
  if (playing && visible && !document.hidden) {
    timer = setTimeout(() => select(active + 1), interval);
  }
}

function select(index) {
  active = (index + scenes.length) % scenes.length;
  scenes.forEach((scene, i) => {
    const current = i === active;
    scene.classList.toggle('current', current);
    scene.inert = !current;
    buttons[i].setAttribute('aria-pressed', String(current));
  });
  schedule();
}

function choose(index) {
  playing = false;
  select(index);
}

const buttons = scenes.map((scene, index) => {
  scene.id = 'story-' + scene.dataset.agent.toLowerCase();
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = scene.dataset.agent;
  button.setAttribute('aria-controls', scene.id);
  button.addEventListener('click', () => choose(index));
  picker.append(button);
  return button;
});

picker.addEventListener('keydown', event => {
  const direction = {ArrowRight:1, ArrowLeft:-1}[event.key];
  if (!direction) return;
  event.preventDefault();
  choose(active + direction);
  buttons[active].focus();
});
picker.addEventListener('focusin', event => {
  if (event.target !== rotation) {
    playing = false;
    schedule();
  }
});
rotation.addEventListener('click', () => {
  playing = !playing;
  schedule();
});

let touchStart;
stage.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1 ? event.touches[0] : null;
}, {passive:true});
stage.addEventListener('touchcancel', () => { touchStart = null; });
stage.addEventListener('touchend', event => {
  if (!touchStart) return;
  const end = event.changedTouches[0];
  const dx = end.clientX - touchStart.clientX;
  const dy = end.clientY - touchStart.clientY;
  touchStart = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) choose(active + (dx < 0 ? 1 : -1));
}, {passive:true});

stories.setAttribute('aria-roledescription', 'carousel');
select(0);
stage.classList.add('rotating');
picker.hidden = false;
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  schedule();
}, {threshold:0}).observe(stage);
document.addEventListener('visibilitychange', schedule);
quiet.addEventListener('change', () => {
  if (quiet.matches) playing = false;
  schedule();
});

const observer = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    if (!isIntersecting) continue;
    observer.unobserve(target);
    if (!quiet.matches) animate(target, {transform:['translateY(14px)', 'none'], opacity:[.65, 1]}, {duration:.55});
  }
}, {threshold:.15});
document.querySelectorAll('.spread > div,.qualities > div').forEach(item => observer.observe(item));

function setupHeroMotion(video) {
  const toggle = document.querySelector('.motion-toggle');
  const portrait = matchMedia('(max-width: 760px) and (orientation: portrait)');
  let onScreen = false;
  let pausedByUser = false;

  function sync() {
    toggle.hidden = quiet.matches || (!pausedByUser && video.readyState < 2);
    if (quiet.matches || document.hidden || !onScreen || pausedByUser) {
      video.pause();
      if (quiet.matches) video.classList.remove('has-frame');
      return;
    }
    const url = portrait.matches ? video.dataset.tall : video.dataset.wide;
    if (video.getAttribute('src') !== url) video.src = url;
    video.play().catch(error => {
      if (error.name === 'NotAllowedError' && !quiet.matches) {
        pausedByUser = true;
        toggle.hidden = false;
        toggle.setAttribute('aria-label', 'Resume hero motion');
        toggle.textContent = '▶';
      }
    });
  }

  video.addEventListener('playing', () => {
    video.classList.add('has-frame');
    toggle.hidden = false;
  });
  video.addEventListener('error', () => {
    toggle.hidden = true;
    video.classList.remove('has-frame');
  });
  toggle.addEventListener('click', () => {
    pausedByUser = !pausedByUser;
    toggle.setAttribute('aria-label', pausedByUser ? 'Resume hero motion' : 'Pause hero motion');
    toggle.textContent = pausedByUser ? '▶' : 'Ⅱ';
    sync();
  });
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  }).observe(video);
  document.addEventListener('visibilitychange', sync);
  quiet.addEventListener('change', sync);
  portrait.addEventListener('change', sync);
}
const heroMotion = document.querySelector('.hero-motion');
if (heroMotion) setupHeroMotion(heroMotion);
