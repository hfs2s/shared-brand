(() => {
  const rail = document.querySelector('[data-document-menu]');
  if (!rail) return;
  const reveal = item => {
    if (!item) return;
    const bounds = item.getBoundingClientRect();
    const viewport = rail.getBoundingClientRect();
    if (bounds.left < viewport.left) rail.scrollLeft += bounds.left - viewport.left;
    if (bounds.right > viewport.right) rail.scrollLeft += bounds.right - viewport.right;
  };
  void document.fonts.ready.then(() => reveal(rail.querySelector('[aria-current="page"],[aria-selected="true"]')));
  rail.addEventListener('focusin', event => reveal(event.target.closest('a')));
})();
