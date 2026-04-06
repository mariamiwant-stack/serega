document.addEventListener("DOMContentLoaded", () => {
  // 1. Базовые семейства
  document.documentElement.style.setProperty(
    "--font-heading",
    '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  );
  document.documentElement.style.setProperty(
    "--font-body",
    '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  );

  // 2. Заголовки
  const headings = document.querySelectorAll(
    "h1, h2, h3, .hero-title, .section-title, .materials-title, .care-title, .contact-title, .service-title, .materials-card-title"
  );
  headings.forEach(el => {
    el.style.fontFamily = '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    el.style.fontWeight = /H1|hero-title/.test(el.tagName + " " + el.className) ? "800" : "700";
  });

  // 3. Кнопки, навигация, бейджи
  const uiAccent = document.querySelectorAll(
    ".btn, .phone-pill, .nav-link, .hero-kicker, .service-tag, .project-tag, .materials-card-link, .benefit-badge-title, .contact-label, .contact-submit, .care-kicker"
  );
  uiAccent.forEach(el => {
    el.style.fontFamily = '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    el.style.fontWeight = "600";
    el.style.letterSpacing = "0.12em";
    el.style.textTransform = "uppercase";
  });

  // 4. Тело текста, описания, формы
  const bodyText = document.querySelectorAll(
    "p, li, input, textarea, .hero-subtitle, .hero-bullets li, .service-text, .materials-card-text, .materials-note, .services-note, .care-subtitle, .care-item-text, .contact-privacy, .contact-right-text"
  );
  bodyText.forEach(el => {
    el.style.fontFamily = '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    if (!["STRONG", "B", "H1", "H2", "H3"].includes(el.tagName)) {
      el.style.fontWeight ||= "400";
    }
  });

  // 5. Микротекст
  const microText = document.querySelectorAll(
    ".hero-secondary-note, .materials-note, .contact-privacy, .services-note, .benefit-badge-desc, .footer-note"
  );
  microText.forEach(el => {
    el.style.fontFamily = '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    el.style.fontSize = "12px";
    el.style.fontWeight = "400";
    el.style.letterSpacing = "0.02em";
  });

  // 6. Логотип
  const logoText = document.querySelectorAll(".logo-text");
  logoText.forEach(el => {
    el.style.fontFamily = '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    el.style.fontWeight = "800";
    el.style.letterSpacing = "0.06em";
    el.style.textTransform = "uppercase";
  });
});
