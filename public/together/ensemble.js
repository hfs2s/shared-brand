(() => {
  const loader = document.querySelector('#logo-loader');
  const replay = loader.querySelector('button');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function play() {
    loader.classList.remove('playing');
    if (reducedMotion.matches) return;
    loader.getBoundingClientRect();
    loader.classList.add('playing');
  }
  function syncPreference() {
    replay.hidden = reducedMotion.matches;
    play();
  }
  replay.addEventListener('click', play);
  reducedMotion.addEventListener('change', syncPreference);
  syncPreference();
})();
