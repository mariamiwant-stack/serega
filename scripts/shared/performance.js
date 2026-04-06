(function () {
  const imgs = document.querySelectorAll('img');
  imgs.forEach((img, index) => {
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }

    const isLikelyHero = index < 1 || img.closest('.hero, .hero-main, .hero-inner, .furniture-ambient');
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', isLikelyHero ? 'eager' : 'lazy');
    }

    if (isLikelyHero && !img.hasAttribute('fetchpriority')) {
      img.setAttribute('fetchpriority', 'high');
    }
  });

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.setAttribute('aria-label', `Позвонить: ${link.textContent.trim()}`);
  });
})();
