// Плавный скролл по data-scroll / якорям
    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-scroll], a[href^='#']");
      if (!trigger) return;

      const targetSelector =
        trigger.getAttribute("data-scroll") || trigger.getAttribute("href");
      if (!targetSelector || targetSelector === "#") return;

      const el = document.querySelector(targetSelector);
      if (!el) return;

      e.preventDefault();
      const headerOffset = 72;
      const rect = el.getBoundingClientRect();
      const offset = rect.top + window.scrollY - headerOffset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    });
   
 
  (function scaleAllFonts(factor = 1.2) {
    const elems = document.querySelectorAll("*");

    elems.forEach((el) => {
      // не трогаем элементы внутри header или footer
      if (el.closest("header") || el.closest("footer")) return;

      const style = window.getComputedStyle(el);
      const size = style.fontSize;

      if (!size.endsWith("px")) return;

      const value = parseFloat(size);
      if (!value) return;

      el.style.fontSize = value * factor + "px";
    });
  })(1.2);
