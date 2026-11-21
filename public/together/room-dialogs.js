(() => {
  const guide = document;
  const byId = id => guide.getElementById(id);
  const sharing = byId('share-dialog');
  const select = byId('access-level');
  const descriptions = {
    'Team members':'Only members of the Shared workspace can open the file.',
    'People in this room':'People in Campaign review can open the file.',
    'Anyone with the link':'Anyone who has the link can open the file.'
  };
  const explain = () => {
    byId('scope-description').textContent = descriptions[select.value];
  };
  select.addEventListener('change', explain);
  byId('open-sharing').addEventListener('click', explain);
  sharing.querySelector('.studio-close').addEventListener('click', () => sharing.close());
})();
