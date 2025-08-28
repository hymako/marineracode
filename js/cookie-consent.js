<script>
// Cookie Consent para MarineraCode — GA4 (Consent Mode v2)
(function () {
  const KEY = 'mc_consent'; // 'granted' | 'denied'
  const hasGtag = () => typeof window.gtag === 'function';

  function set(state) {
    localStorage.setItem(KEY, state);
    if (hasGtag()) {
      window.gtag('consent', 'update', {
        analytics_storage: state === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      // dispara un page_view si pasamos a granted ahora
      if (state === 'granted') {
        window.gtag('event', 'page_view', {
          page_location: location.href,
          page_title: document.title,
        });
      }
    }
    hideBanner();
  }

  function get() { return localStorage.getItem(KEY); }

  function reset() {
    localStorage.removeItem(KEY);
    showBanner();
  }

  // --- Banner minimalista inyectado si no hay preferencia ---
  function showBanner() {
    if (document.getElementById('mc-cookie-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'mc-cookie-bar';
    bar.innerHTML = `
      <div style="
        position:fixed;left:0;right:0;bottom:0;z-index:9999;
        background:#fff;border-top:1px solid #e5e5e5;box-shadow:0 -6px 20px rgba(0,0,0,.06);
        padding:12px 16px;display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;
        font:14px/1.4 system-ui,Segoe UI,Arial,sans-serif;color:#241510">
        <span>Usamos cookies analíticas (GA4) para mejorar tu experiencia.</span>
        <a href="/cookies.html" style="text-decoration:underline;color:#241510">Más info</a>
        <div style="display:flex;gap:8px">
          <button id="mc-accept" style="background:#6b4a3b;color:#fff;border:0;border-radius:12px;padding:8px 14px;font-weight:600;cursor:pointer">Aceptar</button>
          <button id="mc-reject" style="background:#f3f3f3;color:#241510;border:1px solid #ddd;border-radius:12px;padding:8px 14px;font-weight:600;cursor:pointer">Rechazar</button>
        </div>
      </div>`;
    document.body.appendChild(bar);
    document.getElementById('mc-accept').onclick = () => set('granted');
    document.getElementById('mc-reject').onclick = () => set('denied');
  }

  function hideBanner() {
    const bar = document.getElementById('mc-cookie-bar');
    if (bar) bar.remove();
  }

  // Exponer API global (para /cookies.html o un enlace "Cambiar preferencias")
  window.CookieConsent = { set, get, reset, showBanner, hideBanner };

  // Inicialización al cargar la página:
  const saved = get();
  if (saved === 'granted') {
    // ya aceptó en otra visita → aplica a GA
    if (hasGtag()) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  } else if (saved === 'denied') {
    if (hasGtag()) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  } else {
    // sin preferencia → mostrar banner
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
</script>
