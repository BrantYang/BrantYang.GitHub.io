document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname || '';
  const match = path.match(/\/(zh|en)\//);
  const lang = match ? match[1] : 'en';

  const isSubdirPage = Boolean(match);
  const componentsBase = isSubdirPage ? '../components' : './components';

  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // When opening pages directly from disk (file://), browsers commonly block fetch() for local files.
  // Show a helpful message instead of a confusing "Failed to load component".
  if (window.location.protocol === 'file:') {
    const msg =
      'Components are loaded via fetch(), which is blocked on file://. ' +
      'Preview this site with a local web server (e.g., VS Code Live Server) or open it via GitHub Pages.';

    if (navbarPlaceholder) {
      navbarPlaceholder.innerHTML = `<div class="container py-3"><div class="alert alert-info mb-0">${msg}</div></div>`;
    }
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = `<div class="container py-3"><div class="alert alert-info mb-0">${msg}</div></div>`;
    }
    return;
  }

  const loadInto = async (url, el) => {
    if (!el) return;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      el.innerHTML = await res.text();
    } catch (err) {
      // Fail softly: page content should still be accessible.
      el.innerHTML = `<div class="container py-3"><div class="alert alert-warning mb-0">Failed to load component: ${url}</div></div>`;
      // eslint-disable-next-line no-console
      console.warn('Component load failed:', url, err);
    }
  };

  loadInto(`${componentsBase}/navbar_${lang}.html`, navbarPlaceholder);
  loadInto(`${componentsBase}/footer_${lang}.html`, footerPlaceholder);
});
