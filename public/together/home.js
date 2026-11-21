import {animate} from './motion-mini-13.2.0.js';

const quiet = matchMedia('(prefers-reduced-motion: reduce)');
const film = document.querySelector('.screening');
const video = film.querySelector('video');
document.querySelector('.film-trigger').addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  film.showModal();
  video.play().catch(() => { /* Native controls remain available. */ });
});
film.addEventListener('close', () => video.pause());

const picker = document.querySelector('.scene-picker');
const scenes = [...document.querySelectorAll('.scene')];
scenes.forEach((scene, index) => {
  const button = document.createElement('button');
  scene.id = 'story-' + scene.dataset.agent.toLowerCase();
  button.type = 'button';
  button.textContent = scene.dataset.agent;
  button.setAttribute('aria-controls', scene.id);
  button.setAttribute('aria-pressed', String(index === 0));
  scene.hidden = index !== 0;
  button.addEventListener('click', () => {
    if (!scene.hidden) return;
    for (const panel of scenes) panel.hidden = scene !== panel;
    for (const tab of picker.children) tab.setAttribute('aria-pressed', String(tab === button));
    if (!quiet.matches) animate(scene, {opacity:[.55, 1], transform:['translateY(8px)', 'none']}, {duration:.36});
  });
  picker.append(button);
});
picker.hidden = false;

const hero = document.querySelector('.studio-hero');
const photo = hero.querySelector('picture img');
const release = document.createElement('button');
release.className = 'release-bird';
release.type = 'button';
release.setAttribute('aria-label', 'Release the pixel bird');
release.innerHTML = '<span aria-hidden="true">✦</span>';
hero.append(release);

// Keep the invitation beside the felt bird as the photograph crops.
function placeBird() {
  if (!photo.naturalWidth) return;
  const width = hero.clientWidth;
  const height = hero.clientHeight;
  const scale = Math.max(width / photo.naturalWidth, height / photo.naturalHeight);
  const [x, y] = getComputedStyle(photo).objectPosition.split(' ').map(n => parseFloat(n) / 100);
  release.style.left = (width * x + photo.naturalWidth * scale * (.55 - x)) + 'px';
  release.style.top = (height * y + photo.naturalHeight * scale * (.33 - y)) + 'px';
}
new ResizeObserver(placeBird).observe(hero);
photo.addEventListener('load', placeBird);
placeBird();

release.addEventListener('click', async () => {
  if (hero.querySelector('.flying-bird')) return;
  const bird = new Image();
  bird.alt = '';
  bird.className = 'flying-bird';
  bird.src = 'media/stamp-bird.png';
  bird.style.left = release.style.left;
  bird.style.top = release.style.top;
  hero.append(bird);
  if (quiet.matches) {
    setTimeout(() => bird.remove(), 1500);
    return;
  }
  const distance = -(release.offsetLeft + 100);
  const inks = ['var(--lemon)', 'var(--blue)', 'var(--mint)'];
  for (let i = 0; i < 9; i++) {
    const pixel = document.createElement('i');
    pixel.className = 'bird-pixel';
    pixel.setAttribute('aria-hidden', 'true');
    pixel.style.left = release.style.left;
    pixel.style.top = release.style.top;
    pixel.style.background = inks[i % inks.length];
    hero.append(pixel);
    const dx = -18 - 9 * i;
    const dy = -14 - 13 * (i % 4);
    animate(pixel, {
      transform:['scale(.1)', 'translate(' + dx + 'px,' + dy + 'px)', 'translate(' + (dx - 25) + 'px,' + (dy + 30) + 'px) scale(.3)'],
      opacity:[0, 1, 0]
    }, {duration:.72, delay:i * .035}).then(() => pixel.remove());
  }
  await animate(bird, {
    transform:['translate(-35%, -20%) scale(.34) rotate(-8deg)',
      'translate(7px, -65px) scale(1.1) rotate(-12deg)',
      'translate(' + distance * .45 + 'px, -115px) scale(.72) rotate(12deg)',
      'translate(' + distance + 'px, -180px) scale(.35) rotate(-8deg)'],
    opacity:[0, 1, 1, .15]
  }, {duration:2.15, ease:'easeInOut'});
  bird.remove();
});

const observer = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    if (!isIntersecting) continue;
    observer.unobserve(target);
    if (!quiet.matches) animate(target, {transform:['translateY(14px)', 'none'], opacity:[.65, 1]}, {duration:.55});
  }
}, {threshold:.15});
document.querySelectorAll('.spread > div,.qualities > div').forEach(item => observer.observe(item));
