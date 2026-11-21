(() => {
  const frame = document.querySelector('#studio-view');
  const nav = document.querySelector('.studio-bar');
  const routeRail = nav.querySelector('nav');
  const documentRoutes = new Map(Object.entries(window.sharedStudioSectionRoutes ?? {}));
  const sectionRoutes = new Map([...documentRoutes].map(([route, file]) => [file.slice('/together'.length), route]));
  const loading = document.querySelector('#studio-loading');
  const status = loading.querySelector('[role="status"]');
  const knot = loading.querySelector('[data-torus-loader]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const companyPages = new Set(['/studio-index', '/films', '/identity', '/objects', '/practice']);
  const documentParameter = 'studio_document';
  let active;
  let startupComplete;
  let starting = claimDailyStartup();
  let startupFade;
  let focusOnReveal = false;

  function claimDailyStartup() {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const key = 'shared-studio:last-logo-day';
    try {
      if (localStorage.getItem(key) === today) return false;
      localStorage.setItem(key, today);
      return true;
    } catch {
      return false;
    }
  }

  const documentURL = url => {
    const next = new URL(url);
    next.pathname = documentRoutes.get(next.pathname) ??
      (next.pathname.startsWith('/brand-studies/') || companyPages.has(next.pathname)
        ? next.pathname : '/together' + next.pathname);
    next.searchParams.set(documentParameter, '1');
    return next;
  };
  const appURL = url => {
    const next = new URL(url);
    next.searchParams.delete(documentParameter);
    if (next.origin !== location.origin) return next;
    if (next.pathname === '/together') next.pathname = '/';
    else if (next.pathname.startsWith('/together/')) next.pathname = next.pathname.slice('/together'.length);
    if (next.pathname !== '/' && next.pathname !== '/brand-studies/' && next.pathname.endsWith('/')) {
      next.pathname = next.pathname.slice(0, -1);
    } else if (next.pathname === '/brand-studies') next.pathname = '/brand-studies/';
    else if (next.pathname.endsWith('/index.html')) next.pathname = next.pathname.slice(0, -'index.html'.length);
    else if (next.pathname.endsWith('.html')) next.pathname = next.pathname.slice(0, -'.html'.length);
    if (next.pathname === '/navigation') {
      next.pathname = '/brand';
      if (!next.hash) next.hash = 'navigation';
    }
    if (next.pathname === '/brand') {
      const hash = next.hash.slice(1);
      if (['photography', 'panel-photography', 'portraits', 'art-direction', 'crops', 'crop-photo',
        'crop-caption', 'photography-gallery-spec', 'social-photo-framing'].includes(hash) || hash.startsWith('photo-brief-')) {
        next.pathname = '/artifacts/photography';
        if (['photography', 'panel-photography', 'portraits'].includes(hash)) next.hash = 'art-direction';
        if (hash === 'crops') next.hash = 'photo-crops';
      }
    }
    if (next.pathname === '/visuals') next.pathname = '/photography';
    next.pathname = sectionRoutes.get(next.pathname) ?? next.pathname;
    return next;
  };
  const isPage = url => url.origin === location.origin &&
    /^(?:\/[\w-]+)*\/?$/.test(url.pathname) && !url.pathname.startsWith('/_studio/');
  // Anchor changes reuse the document and must not wait for a new load event.
  const documentKey = url => url.origin + url.pathname + url.search;
  const matches = (doc, target) => doc && documentKey(new URL(doc.URL)) === documentKey(target);

  function setLoading(error = false, startup = false) {
    startupFade?.cancel();
    startupFade = undefined;
    loading.classList.remove('is-leaving');
    frame.setAttribute('aria-busy', 'true');
    loading.hidden = false;
    loading.classList.toggle('is-error', error);
    loading.classList.toggle('is-startup', startup);
    status.hidden = !error;
    status.textContent = error ? 'This page couldn’t finish loading. Refresh this tab to retry.' : '';
  }

  function playStartup() {
    if (reducedMotion.matches) return;
    return new Promise(resolve => {
      knot.addEventListener('torus-finished', () => {
        if (!reducedMotion.matches && knot.classList.contains('animated')) setTimeout(resolve, 3000);
        else resolve();
      }, { once: true });
      const script = document.createElement('script');
      script.src = '/together/logo-motion.js';
      script.addEventListener('error', resolve, { once: true });
      document.head.append(script);
    });
  }

  function dismissLoading() {
    if (startupFade) return;
    if (!loading.classList.contains('is-startup') || reducedMotion.matches) {
      loading.hidden = true;
      return;
    }
    loading.classList.add('is-leaving');
    const fade = loading.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: 'ease-in-out', fill: 'forwards' });
    startupFade = fade;
    const finish = () => {
      if (startupFade !== fade) return;
      loading.hidden = true;
      startupFade = undefined;
      loading.classList.remove('is-leaving');
      fade.cancel();
    };
    void fade.finished.then(finish, finish);
  }

  async function showWhenReady() {
    const target = active;
    const doc = frame.contentDocument;
    const showError = async () => {
      await startupComplete;
      if (target === active) setLoading(true);
    };
    if (!doc) return showError();
    if (!target || !matches(doc, target) || doc.readyState !== 'complete') return;
    if (doc.contentType !== 'text/html') return showError();
    const stylesheetFailed = () => [...doc.querySelectorAll('link[rel~="stylesheet"]')].some(
      link => !link.disabled && (!link.media || doc.defaultView.matchMedia(link.media).matches) && !link.sheet
    );
    if (stylesheetFailed()) return showError();

    // Force layout so the browser discovers any fonts needed by this document.
    doc.body.getBoundingClientRect();
    await Promise.all([doc.fonts.ready, startupComplete]);
    // A newer navigation may have replaced the document while its fonts loaded.
    if (target !== active || doc !== frame.contentDocument || !matches(doc, target)) return;
    if (stylesheetFailed()) return setLoading(true);
    doc.addEventListener('click', intercept);
    document.title = frame.title = doc.title || 'Shared Studio';
    frame.setAttribute('aria-busy', 'false');
    dismissLoading();
    if (focusOnReveal) frame.focus();
    requestAnimationFrame(revealActiveRoute);
  }

  function revealActiveRoute() {
    const activeLink = routeRail.querySelector('[aria-current]');
    if (!activeLink) return;
    const bounds = activeLink.getBoundingClientRect();
    const viewport = routeRail.getBoundingClientRect();
    if (bounds.left < viewport.left) routeRail.scrollLeft += bounds.left - viewport.left;
    if (bounds.right > viewport.right) routeRail.scrollLeft += bounds.right - viewport.right;
  }

  function update(url, { push = false, focus = false } = {}) {
    if (push && url.href !== location.href) history.pushState(null, '', url);
    for (const link of routeRail.querySelectorAll('a[href]')) {
      const target = new URL(link.href);
      const exact = target.pathname === url.pathname && (!target.hash || target.hash === url.hash);
      const sectionActive = documentRoutes.has(url.pathname) && url.pathname.startsWith(target.pathname + '/');
      if (exact || sectionActive) link.setAttribute('aria-current', exact ? 'page' : 'location');
      else link.removeAttribute('aria-current');
    }
    requestAnimationFrame(revealActiveRoute);
    const target = documentURL(url);
    if (active?.href !== target.href) {
      focusOnReveal = focus;
      const sameDocument = matches(frame.contentDocument, target);
      if (!sameDocument) setLoading(false, starting);
      if (!active && starting) startupComplete = Promise.resolve(playStartup()).then(() => { starting = false; });
      active = target;
      frame.contentWindow.location.replace(target.href);
      if (sameDocument) void showWhenReady();
    } else if (focus && frame.getAttribute('aria-busy') === 'false') {
      frame.focus();
    }
  }

  function intercept(event) {
    const link = event.target.closest?.('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.shiftKey || event.altKey || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
    const url = appURL(link.href);
    if (!isPage(url)) return;
    event.preventDefault();
    update(url, { push: true, focus: true });
  }

  nav.addEventListener('click', intercept);
  frame.addEventListener('load', showWhenReady);
  window.addEventListener('popstate', () => update(new URL(location.href)));
  const initial = appURL(location.href);
  if (initial.href !== location.href) history.replaceState(null, '', initial);
  update(initial);
  void document.fonts.ready.then(() => requestAnimationFrame(revealActiveRoute));
})();
