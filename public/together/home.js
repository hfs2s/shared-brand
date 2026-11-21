import {animate} from './motion-mini-13.2.0.js';

const quiet = matchMedia('(prefers-reduced-motion: reduce)');

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

const observer = new IntersectionObserver(entries => {
  for (const {target, isIntersecting} of entries) {
    if (!isIntersecting) continue;
    observer.unobserve(target);
    if (!quiet.matches) animate(target, {transform:['translateY(14px)', 'none'], opacity:[.65, 1]}, {duration:.55});
  }
}, {threshold:.15});
document.querySelectorAll('.spread > div,.qualities > div').forEach(item => observer.observe(item));
