for (const video of document.querySelectorAll('.video-card video')) {
  const title = document.getElementById(video.getAttribute('aria-labelledby'));
  const player = document.createElement('div');
  player.className = 'video-player';

  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'video-play';
  play.setAttribute('aria-label', `Play ${title.textContent}`);

  video.before(player);
  player.append(video, play);
  video.controls = false;

  play.addEventListener('click', () => {
    video.controls = true;
    play.remove();
    video.focus();
    void video.play().catch(() => {
      // The native player can show a load error and lets the viewer retry.
    });
  });
}
