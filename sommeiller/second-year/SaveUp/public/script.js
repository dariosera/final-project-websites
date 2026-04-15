/* ===== NAVBAR ===== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('nav-drawer');

// Scrolled shadow
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navDrawer.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close drawer on link click
navDrawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navDrawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Close drawer on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navDrawer.classList.remove('open');
  }
});

/* ===== SMOOTH ACTIVE NAV LINK ===== */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--green-dark)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, suffix = '', duration = 1800) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const update = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = isDecimal
      ? (eased * target).toFixed(1)
      : Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Inject base reveal styles dynamically
const style = document.createElement('style');
style.textContent = `
  [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  [data-reveal].revealed {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);

revealEls.forEach((el, i) => {
  const delay = el.dataset.delay || 0;
  el.style.transitionDelay = `${delay}ms`;
  revealObserver.observe(el);
});

/* ===== CTA FORM ===== */
const ctaForm  = document.getElementById('cta-form');
const ctaInput = document.getElementById('cta-email');

if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = ctaInput.value.trim();
    if (!email) return;
    const btn = ctaForm.querySelector('button');
    btn.textContent = '🎉 You\'re on the list!';
    btn.disabled = true;
    btn.style.background = 'var(--green-dark)';
    ctaInput.value = '';
    ctaInput.placeholder = 'We\'ll be in touch soon!';
  });
}

/* ===== LAUNCH COUNTDOWN ===== */
(function () {
  const launchDate = new Date('2026-07-09T00:00:00');

  const cdDays    = document.getElementById('cd-days');
  const cdHours   = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  if (!cdDays) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now  = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
      cdDays.textContent = cdHours.textContent = cdMinutes.textContent = cdSeconds.textContent = '00';
      return;
    }

    cdDays.textContent    = pad(Math.floor(diff / 864e5));
    cdHours.textContent   = pad(Math.floor((diff % 864e5) / 36e5));
    cdMinutes.textContent = pad(Math.floor((diff % 36e5) / 6e4));
    cdSeconds.textContent = pad(Math.floor((diff % 6e4) / 1e3));
  }

  tick();
  setInterval(tick, 1000);
})();

/* ===== CAROUSEL ===== */
(function () {
  const track   = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsEl  = document.getElementById('carousel-dots');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  let current  = 0;
  let timer;

  // Build indicator dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsEl.appendChild(dot);
  });

  function updateDots() {
    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  nextBtn.addEventListener('click', () => { next(); resetTimer(); });
  prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

  function startTimer() { timer = setInterval(next, 4500); }
  function resetTimer()  { clearInterval(timer); startTimer(); }

  startTimer();

  // Pause auto-play on hover
  const wrapper = track.closest('.carousel-wrapper');
  wrapper.addEventListener('mouseenter', () => clearInterval(timer));
  wrapper.addEventListener('mouseleave', startTimer);

  // Swipe support
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = touchX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) { delta > 0 ? next() : prev(); resetTimer(); }
  });
})();
