document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function sendMail(e){
  e.preventDefault();
  const to = "contato@ia4x.com.br";
  const nome = document.getElementById("nome").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const email = document.getElementById("email").value.trim();
  const tema = document.getElementById("tema").value.trim();
  const msg = document.getElementById("mensagem").value.trim();

  const subject = `Contato via site ia4x — ${empresa || "Empresa"} (${tema || "IA"})`;
  const body =
`Olá, ia4x!

Meu nome: ${nome}
Empresa: ${empresa}
E-mail: ${email}
Tema: ${tema || "-"}

Mensagem:
${msg}

(Enviado pelo site ia4x.com.br)`;

  window.location.href =
    `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return false;
}


/* ===============================
   COOKIE CONSENT (V13)
   =============================== */
(function(){
  const KEY = "ia4x_consent_v1";

  function getConsent(){
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch(e){ return null; }
  }
  function setConsent(obj){
    localStorage.setItem(KEY, JSON.stringify(obj));
    window.ia4xConsent = obj;
  }
  function applyConsent(obj){
    // Hook for future: load analytics/marketing scripts only if obj.analytics / obj.marketing are true.
    // No tracking is loaded by default.
  }

  function showBanner(){
    const banner = document.getElementById("cookieBanner");
    if(!banner) return;
    banner.classList.add("show");
  }
  function hideBanner(){
    const banner = document.getElementById("cookieBanner");
    if(!banner) return;
    banner.classList.remove("show");
    const prefs = document.getElementById("cookiePrefs");
    if(prefs) prefs.classList.remove("show");
  }

  function togglePrefs(show){
    const prefs = document.getElementById("cookiePrefs");
    if(!prefs) return;
    prefs.classList.toggle("show", !!show);
    prefs.setAttribute("aria-hidden", show ? "false" : "true");
  }

  document.addEventListener("DOMContentLoaded", function(){
    const existing = getConsent();
    if(existing){
      window.ia4xConsent = existing;
      applyConsent(existing);
      return;
    }
    showBanner();

    const accept = document.getElementById("cookieAccept");
    const decline = document.getElementById("cookieDecline");
    const link = document.getElementById("cookiePrefsLink");
    const close = document.getElementById("cookieClose");
    const save = document.getElementById("cookieSave");
    const analytics = document.getElementById("cookieAnalytics");
    const marketing = document.getElementById("cookieMarketing");

    if(link) link.addEventListener("click", () => togglePrefs(true));
    if(close) close.addEventListener("click", () => togglePrefs(false));

    if(accept) accept.addEventListener("click", function(){
      const c = { essential: true, analytics: true, marketing: true, ts: new Date().toISOString() };
      setConsent(c); applyConsent(c); hideBanner();
    });

    if(decline) decline.addEventListener("click", function(){
      const c = { essential: true, analytics: false, marketing: false, ts: new Date().toISOString() };
      setConsent(c); applyConsent(c); hideBanner();
    });

    if(save) save.addEventListener("click", function(){
      const c = {
        essential: true,
        analytics: !!(analytics && analytics.checked),
        marketing: !!(marketing && marketing.checked),
        ts: new Date().toISOString()
      };
      setConsent(c); applyConsent(c); hideBanner();
    });
  });
})();

