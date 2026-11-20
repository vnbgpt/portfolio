// =====================================================================
//  PORTFOLIO — VITALII YURINA — script.js
//  ---------------------------------------------------------------------
//  SOMMAIRE
//  1. Configuration (menu + infos du footer)  <- à modifier ici seulement
//  2. Navbar & footer (injectés dans toutes les pages)
//  3. Lien actif, navbar au scroll, menu mobile
//  4. Curseur personnalisé
//  5. Fond animé (hexagones)
//  6. Apparition au scroll
//  7. Effet 3D sur les cartes
//  8. Formulaire de contact
// =====================================================================


// ---------- 1. CONFIGURATION ----------
const SITE = {
  owner:   'Vitalii Yurina',
  tagline: 'Portfolio BTS SIO SISR',
  email:   'vitaliy.yurina2011@gmail.com',
};

// Pour ajouter / renommer une page du menu, il suffit de modifier cette liste.
const MENU = [
  { href: 'index.html',    label: 'Accueil' },
  { href: 'apropos.html',  label: 'À propos' },
  { href: 'ecole.html',    label: 'Entreprise' },
  { href: 'missions.html', label: 'Épreuve E5' },
  { href: 'projets.html',  label: 'Épreuve E6' },
  { href: 'veille.html',   label: 'Veille' },
  { href: 'contact.html',  label: 'Contact' },
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');


// ---------- 2. NAVBAR & FOOTER ----------
const navbar = document.getElementById('navbar');
if (navbar) {
  const items = MENU.map(item => {
    if (!item.children) {
      return `<li><a href="${item.href}" class="nav-link" data-page="${item.href}">${esc(item.label)}</a></li>`;
    }
    const sub = item.children.map(c => `
          <li><a href="${c.href}" class="dropdown-link">
            <span class="drop-icon">${c.icon}</span>
            <span><span class="drop-title">${esc(c.title)}</span><span class="drop-sub">${esc(c.sub)}</span></span>
          </a></li>`).join('');
    return `
      <li class="nav-dropdown">
        <a href="${item.href}" class="nav-link" data-page="${item.href}">${esc(item.label)} <span class="dropdown-arrow">▾</span></a>
        <ul class="dropdown-menu">${sub}
        </ul>
      </li>`;
  }).join('');

  navbar.innerHTML = `
    <a href="index.html" class="nav-logo"><span class="logo-bracket">&lt;</span>VY<span class="logo-bracket">/&gt;</span></a>
    <ul class="nav-links" id="nav-links">${items}</ul>
    <div class="nav-status"><span class="status-dot"></span><span>Online</span></div>
    <button class="nav-toggle" id="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>`;
}

const footer = document.getElementById('footer');
if (footer) {
  footer.innerHTML = `
    <span class="footer-logo">&lt;VY /&gt;</span>
    <span class="footer-text">© ${new Date().getFullYear()} ${esc(SITE.owner)} — ${esc(SITE.tagline)}</span>`;
}


// ---------- 3. LIEN ACTIF, SCROLL, MENU MOBILE ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  if (link.dataset.page === currentPage) link.classList.add('active');
});

if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById('nav-toggle');
  const setOpen = open => {
    navbar.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  };
  if (toggle) toggle.addEventListener('click', () => setOpen(!navbar.classList.contains('open')));
  navbar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
}


// ---------- 4. CURSEUR PERSONNALISÉ ----------
const cursor      = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');
if (cursor || cursorTrail) {
  document.addEventListener('mousemove', e => {
    if (cursor)      { cursor.style.left = e.clientX + 'px';      cursor.style.top = e.clientY + 'px'; }
    if (cursorTrail) { cursorTrail.style.left = e.clientX + 'px'; cursorTrail.style.top = e.clientY + 'px'; }
  });
}


// ---------- 5. FOND ANIMÉ : HEXAGONES FLOTTANTS ----------
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const HEX_COUNT = window.innerWidth < 700 ? 9 : 18;   // moins d'hexagones sur mobile
  const hexagons = Array.from({ length: HEX_COUNT }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     20 + Math.random() * 60,
    vx:    (Math.random() - 0.5) * 0.3,
    vy:    (Math.random() - 0.5) * 0.3,
    rot:   Math.random() * Math.PI * 2,
    vrot:  (Math.random() - 0.5) * 0.004,
    alpha: 0.04 + Math.random() * 0.1,
    color: Math.random() > 0.5 ? '#ef6f5e' : '#06b6d4',
  }));

  function drawHex(h) {
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.rotate(h.rot);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      const px = h.r * Math.cos(a), py = h.r * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = h.color;
    ctx.lineWidth   = 1;
    ctx.globalAlpha = h.alpha;
    ctx.stroke();
    ctx.restore();
  }

  function drawConnections() {
    for (let i = 0; i < hexagons.length; i++) {
      for (let j = i + 1; j < hexagons.length; j++) {
        const dx = hexagons[i].x - hexagons[j].x;
        const dy = hexagons[i].y - hexagons[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          ctx.beginPath();
          ctx.moveTo(hexagons[i].x, hexagons[i].y);
          ctx.lineTo(hexagons[j].x, hexagons[j].y);
          ctx.strokeStyle = '#ef6f5e';
          ctx.lineWidth   = 0.4;
          ctx.globalAlpha = 0.06 * (1 - dist / 220);
          ctx.stroke();
        }
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    hexagons.forEach(h => {
      drawHex(h);
      h.x += h.vx; h.y += h.vy; h.rot += h.vrot;
      if (h.x < -h.r)    h.x = W + h.r;
      if (h.x > W + h.r) h.x = -h.r;
      if (h.y < -h.r)    h.y = H + h.r;
      if (h.y > H + h.r) h.y = -h.r;
    });
    if (!reduceMotion) requestAnimationFrame(frame);
  }
  frame();
}


// ---------- 6. APPARITION AU SCROLL ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}


// ---------- 7. EFFET 3D SUR LES CARTES (.tilt-card) ----------
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top)  / r.height - .5) * -7;
    const ry = ((e.clientX - r.left) / r.width  - .5) *  7;
    card.style.transform  = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.transition = 'transform .08s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
  });
});


// ---------- 8. FORMULAIRE DE CONTACT ----------
// Le site est statique (pas de serveur) : le formulaire ouvre la messagerie
// de l'utilisateur avec le message déjà rédigé, adressé à SITE.email.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const subject = d.sujet?.trim() || `Contact portfolio — ${d.prenom} ${d.nom}`;
    const body = `${d.message}\n\n—\n${d.prenom} ${d.nom}\n${d.email}`;
    const note = document.getElementById('form-note');
    if (note) { note.textContent = '✅ Ouverture de votre messagerie…'; note.classList.add('ok'); }
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

console.log('%c⚡ Vitalii Yurina — Portfolio BTS SIO SISR', 'color:#ff8a78;font-size:14px;font-weight:bold;');


// ---------- 9. BOUTONS « DOCUMENTATION » PAS ENCORE DISPONIBLES ----------
// Pour activer un bouton : remplace  href="#" class="doc-btn soon"
// par  href="docs/MON_FICHIER.pdf" target="_blank" class="doc-btn"
document.querySelectorAll('.doc-btn.soon, .r-link.soon').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = '📄 Documentation bientôt disponible';
    t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2200);
  });
});
