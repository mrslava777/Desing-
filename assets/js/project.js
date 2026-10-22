/* GREEN DESIGN PINSK — project page behaviour */
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* mobile drawer */
  var burger = document.getElementById('burger'), drawer = document.getElementById('drawer');
  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.classList.toggle('on', open);
      drawer.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setDrawer(!drawer.classList.contains('on')); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
  }

  /* sticky header state */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (header) header.classList.toggle('stuck', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* reveal on scroll */
  var items = [].slice.call(document.querySelectorAll('.rv'));
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* back to top */
  var top = document.getElementById('toTop');
  if (top) {
    top.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }
})();
