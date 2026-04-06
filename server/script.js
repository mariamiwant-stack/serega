const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('.contact-submit');
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    // ✅ FormData вместо URLSearchParams
    const formData = new FormData();
    formData.append('name', document.getElementById('cf-name').value);
    formData.append('phone', document.getElementById('cf-phone').value);
    formData.append('idea', document.getElementById('cf-idea').value);

    const res = await fetch('/submit-form', {
      method: 'POST',
      body: formData, // ← Content-Type НЕ указываем вручную!
    });

    if (res.ok) {
      btn.textContent = 'Запрос отправлен ✓';
    } else {
      btn.textContent = 'Ошибка, попробуйте снова';
      btn.disabled = false;
    }
  });
}


// Уже существующий обработчик для .contact-form тут выше...

// ── CTA форма "Хотите похожую кухню или шкаф?" ──
const ctaForm = document.getElementById('ctaForm');

if (ctaForm) {
  ctaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = ctaForm.querySelector('.btn-primary');
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('name',    document.getElementById('name').value);
    formData.append('phone',   document.getElementById('phone').value);
    formData.append('type',    document.getElementById('type').value);
    formData.append('comment', document.getElementById('comment').value);

    try {
      const res = await fetch('/cta-form', {
        method: 'POST',
        body: formData, // без ручного Content-Type
      });

      if (res.ok) {
        btn.textContent = 'Заявка отправлена ✓';
      } else {
        btn.textContent = 'Ошибка, попробуйте снова';
        btn.disabled = false;
      }
    } catch (e2) {
      console.error(e2);
      btn.textContent = 'Ошибка соединения';
      btn.disabled = false;
    }
  });
}


// ── Форма ориентировочного расчёта (#calcFormReal) ──
const calcForm = document.getElementById('calcFormReal');

if (calcForm) {
  calcForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = calcForm.querySelector('.btn-primary');
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('name',    calcForm.querySelector('#name').value);
    formData.append('phone',   calcForm.querySelector('#phone').value);
    formData.append('type',    calcForm.querySelector('#type').value);
    formData.append('budget',  calcForm.querySelector('#budget').value);
    formData.append('comment', calcForm.querySelector('#comment').value);

    try {
      const res = await fetch('/calc-form', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        btn.textContent = 'Заявка отправлена ✓';
      } else {
        btn.textContent = 'Ошибка, попробуйте снова';
        btn.disabled = false;
      }
    } catch (e2) {
      console.error(e2);
      btn.textContent = 'Ошибка соединения';
      btn.disabled = false;
    }
  });
}
