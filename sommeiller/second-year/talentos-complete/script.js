/* ========================
   TALENTOS - script.js
   (Countdown + Counters + Navbar + Slideshow)
   ======================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Smooth scroll for all internal links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- COUNTDOWN to April 30, 2026 ---- */
  var LAUNCH_DATE = new Date('2026-04-30T23:59:59').getTime();

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    var now = Date.now();
    var diff = LAUNCH_DATE - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent    = '00';
      document.getElementById('cd-hours').textContent   = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent    = pad(days);
    document.getElementById('cd-hours').textContent   = pad(hours);
    document.getElementById('cd-minutes').textContent = pad(minutes);
    document.getElementById('cd-seconds').textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---- Counter animation for stats ---- */
  function animateCounter(el) {
    var raw = el.getAttribute('data-target');
    var isDecimal = raw.includes('.');
    var suffix = raw.replace(/[\d.,]/g, '');
    var target = parseFloat(raw.replace(/[^0-9.]/g, ''));
    var duration = 1600;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }

  var countersStarted = false;
  var counters = document.querySelectorAll('.numeri-val[data-target]');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(animateCounter);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) { observer.observe(el); });

  /* ---- Navbar scroll shadow ---- */
  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 8) {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
    } else {
      navbar.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
    }
  });

  /* ============================
     IMAGE SLIDESHOW
     ============================ */
  var slides     = document.querySelectorAll('.slide');
  var dots       = document.querySelectorAll('.dot');
  var thumbs     = document.querySelectorAll('.thumb');
  var prevBtn    = document.getElementById('slide-prev');
  var nextBtn    = document.getElementById('slide-next');
  var current    = 0;
  var autoTimer  = null;
  var INTERVAL   = 3500;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    thumbs[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    thumbs[current].classList.add('active');
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      goTo(current + 1);
    }, INTERVAL);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(current - 1);
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(current + 1);
      startAuto();
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(this.getAttribute('data-index'), 10));
      startAuto();
    });
  });

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      goTo(parseInt(this.getAttribute('data-index'), 10));
      startAuto();
    });
  });

  /* Pause on hover */
  var stage = document.querySelector('.slideshow-stage');
  if (stage) {
    stage.addEventListener('mouseenter', stopAuto);
    stage.addEventListener('mouseleave', startAuto);
  }

  /* Keyboard navigation */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  /* Touch swipe support */
  var touchStartX = null;
  var slideshowSection = document.getElementById('gallery');
  if (slideshowSection) {
    slideshowSection.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    slideshowSection.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
      }
      touchStartX = null;
    }, { passive: true });
  }

  startAuto();

});
