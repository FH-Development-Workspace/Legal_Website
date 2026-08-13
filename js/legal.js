'use strict';

window.LEGAL_CONFIG = {
  API_BASE: 'https://backend-mczn.onrender.com/api/v1',
  MAIN_SITE: 'https://fh-development.xyz',
  STATUS_URL: 'https://status.fh-development.xyz',
  SITE_NAME: 'FH Development Legal',
};

window.LEGAL = window.LEGAL || {};

LEGAL.escapeHtml = function (s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

LEGAL.renderNav = function (active) {
  const pages = [
    ['index.html', 'Terms of Service', 'terms'],
    ['privacy.html', 'Privacy Policy', 'privacy'],
    ['cookies.html', 'Cookie Policy', 'cookies'],
    ['refunds.html', 'Refund Policy', 'refunds'],
    ['acceptable-use.html', 'Acceptable Use', 'aup'],
    ['dmca.html', 'DMCA Policy', 'dmca'],
    ['security.html', 'Security Policy', 'security'],
  ];
  const mount = document.getElementById('legal-nav');
  if (!mount) return;
  mount.innerHTML = `
<header class="legal-header">
  <div class="legal-header-inner">
    <a href="${LEGAL_CONFIG.MAIN_SITE}" class="legal-brand">
      <img src=""https://cdn.fh-development.xyz/departmental/logos/Real_White_Logo.png"" alt="FH Development" width="36" height="36" />
      <span>FH Development</span>
    </a>
    <nav class="legal-nav-links" aria-label="Legal documents">
      ${pages.map(([href, label, id]) =>
        `<a href="${href}" class="legal-nav-link${active === id ? ' active' : ''}">${label}</a>`
      ).join('')}
    </nav>
    <a href="${LEGAL_CONFIG.MAIN_SITE}" class="legal-back">← Main Site</a>
  </div>
</header>`;
};

LEGAL.loadCompanyMeta = async function () {
  const el = document.getElementById('legal-company-meta');
  if (!el) return;
  try {
    const res = await fetch(LEGAL_CONFIG.API_BASE + '/company');
    const json = await res.json();
    const p = json.data?.profile || json.data;
    if (p?.email) {
      el.innerHTML = `Questions? Contact <a href="mailto:${LEGAL.escapeHtml(p.email)}">${LEGAL.escapeHtml(p.email)}</a>`;
    }
  } catch { /* static fallback in HTML */ }
};

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('legal-nav');
  if (mount) LEGAL.renderNav(mount.dataset.active || '');
  LEGAL.loadCompanyMeta();
});
