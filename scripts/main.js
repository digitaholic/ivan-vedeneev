(function () {
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Scroll reveal — progressive enhancement only.
  // Content is fully visible without JS or with prefers-reduced-motion;
  // the .js-reveal class (which starts elements at opacity:0) is added
  // here, at runtime, so a no-JS visitor never sees hidden content.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var selector = [
      '.hero-title', '.hero-foot',
      '.section-title', '.case-card',
      '#about .about-heading', '#about .about-quote', '#about .about-text',
      '#about .exp-list', '#about .edu-list',
      'main section', 'main > .max-w-content'
    ].join(', ');
    var targets = document.querySelectorAll(selector);
    targets.forEach(function (el, i) {
      el.classList.add('js-reveal');
      el.style.setProperty('--reveal-index', i % 4);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }
})();
