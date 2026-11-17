// @ts-nocheck
// Premium motion layer for WDG React apps (router-agnostic, no re-mounting).
// - Press feedback on every button (Web Animations `scale`, never fights Tailwind transforms)
// - Page content glides in on first load and on every route change (no remount, so no state is lost)
// - Optional branded intro once per browser tab, skippable, never on public/customer paths
// Everything respects prefers-reduced-motion. Call installPremiumMotion() once before rendering.

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function installPress() {
  const sel = 'button:not(:disabled), [role="button"]:not([aria-disabled="true"]), input[type="submit"], [data-pm-press]';
  let held = null; // { el, anim }
  const release = () => {
    if (!held) return;
    const { el, anim } = held; held = null;
    anim.cancel();
    el.animate([{ scale: '0.97' }, { scale: '1' }], { duration: 200, easing: EASE_OUT });
  };
  document.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !(e.target instanceof Element)) return;
    const el = e.target.closest(sel);
    if (!el) return;
    release();
    held = { el, anim: el.animate([{ scale: '1' }, { scale: '0.97' }], { duration: 120, easing: EASE_OUT, fill: 'forwards' }) };
  }, { passive: true });
  ['pointerup', 'pointercancel', 'dragstart'].forEach((t) => document.addEventListener(t, release, { passive: true }));
  window.addEventListener('blur', release);
}

function animateContent(selector, reduce) {
  let root = document.querySelector(selector) || document.getElementById('root');
  if (!root) return;
  // Pages usually wrap everything in one div: step inside so the sections stagger, not the wrapper
  for (let depth = 0; depth < 3 && root.children.length === 1; depth++) root = root.children[0];
  const kids = Array.from(root.children).filter((c) => c.offsetParent !== null || c === root).slice(0, 10);
  const targets = kids.length > 1 ? kids : [root];
  targets.forEach((el, i) => {
    el.animate(
      reduce
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ opacity: 0, translate: '0 10px' }, { opacity: 1, translate: '0 0' }],
      { duration: reduce ? 180 : 380, delay: reduce ? 0 : Math.min(i, 6) * 40, easing: EASE_OUT, fill: 'backwards' }
    );
  });
}

function installRouteMotion(selector, reduce) {
  let last = location.pathname;
  const run = () => requestAnimationFrame(() => requestAnimationFrame(() => animateContent(selector, reduce)));
  const check = () => { if (location.pathname !== last) { last = location.pathname; run(); } };
  ['pushState', 'replaceState'].forEach((m) => {
    const orig = history[m];
    history[m] = function (...args) { const r = orig.apply(this, args); check(); return r; };
  });
  window.addEventListener('popstate', check);
  run();
}

function installIntro({ name, logo, background = '#0B0E14', color = '#fff', onlyPaths = null }) {
  try { if (sessionStorage.getItem('pm-intro-seen') === '1') return; } catch { return; }
  // Only on the app's own entry screens (e.g. /login, the dashboard) - never on public or customer pages
  if (onlyPaths && !onlyPaths.includes(location.pathname)) return;
  try { sessionStorage.setItem('pm-intro-seen', '1'); } catch { /* private mode */ }

  const reduce = prefersReduced();
  const el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = `position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:${background};color:${color};cursor:pointer`;
  const inner = document.createElement('div');
  inner.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:16px';
  if (logo) {
    const img = document.createElement('img');
    img.src = logo; img.alt = '';
    img.style.cssText = 'width:72px;height:72px;object-fit:contain';
    img.onerror = () => img.remove();
    inner.appendChild(img);
  }
  const word = document.createElement('div');
  word.style.cssText = 'font:600 26px/1 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.02em;display:flex';
  Array.from(name).forEach((ch) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? ' ' : ch;
    s.style.display = 'inline-block';
    word.appendChild(s);
  });
  inner.appendChild(word);
  el.appendChild(inner);
  document.body.appendChild(el);

  let gone = false;
  const leave = () => {
    if (gone) return; gone = true;
    const a = el.animate(reduce ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1 }, { opacity: 0, scale: '1.04' }],
      { duration: reduce ? 200 : 420, easing: 'cubic-bezier(0.7, 0, 0.84, 0)', fill: 'forwards' });
    a.finished.then(() => el.remove()).catch(() => el.remove());
    window.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') leave(); };
  el.addEventListener('click', leave);
  window.addEventListener('keydown', onKey);

  if (!reduce) {
    const logoEl = inner.querySelector('img');
    if (logoEl) logoEl.animate([{ opacity: 0, scale: '0.9', filter: 'blur(6px)' }, { opacity: 1, scale: '1', filter: 'blur(0)' }], { duration: 600, easing: EASE_OUT, fill: 'backwards' });
    Array.from(word.children).forEach((s, i) => s.animate([{ opacity: 0, translate: '0 10px', filter: 'blur(4px)' }, { opacity: 1, translate: '0 0', filter: 'blur(0)' }], { duration: 500, delay: 250 + i * 35, easing: EASE_OUT, fill: 'backwards' }));
  }
  setTimeout(leave, reduce ? 500 : 1300 + name.length * 35);
}

export function installPremiumMotion(options = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.__pmInstalled) return; window.__pmInstalled = true;
  if (!('animate' in Element.prototype)) return;
  const reduce = prefersReduced();
  const start = () => {
    installPress();
    installRouteMotion(options.contentSelector || 'main', reduce);
    if (options.intro) installIntro(options.intro);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
}
