
  // ----- DEMO PROJECT DATA -----
  const projectsData = [
    {
      id: 1,
      name: 'Кухня «Графит», ЖК «Серебристый бор»',
      type: 'kitchen',
      style: 'modern',
      material: 'mdf',
      size: '3-4',
      sizeLabel: '3,2 м',
      city: 'Санкт‑Петербург',
      year: '2025',
      description: '3,2 м, фасады МДФ мат, столешница кварц, фурнитура Blum.',
      priceFrom: 'от 198 000 ₽',
      tag: 'Реализован в 2025 г.',
      tags: ['МДФ', 'Современный стиль', 'Серый'],
      images: [
        '../portfolio/real_photo/kitchen.webp',
        '../portfolio/real_photo/kitchen2.webp',
        '../portfolio/real_photo/kitchen3.webp',
        '../portfolio/real_photo/kitchen4.webp',
      ]
    },
    {
      id: 2,
      name: 'Шкафы',
      type: 'wardrobe-coupe',
      style: 'minimal',
      material: 'ldsp',
      size: '2-4',
      sizeLabel: '2,4 м',
      city: 'Санкт‑Петербург',
      year: '2024',
      description: 'Корпус ЛДСП, фасады с зеркалом, система плавного закрывания.',
      priceFrom: 'от 95 000 ₽',
      tag: 'Прихожая, 2024 г.',
      tags: ['ЛДСП', 'Минимализм', 'Белый'],
      images: [
        '../portfolio/real_photo/shkaf.webp',
        '../portfolio/real_photo/shkaf2.webp',
        '../portfolio/real_photo/shkaf3.webp',
        '../portfolio/real_photo/shkaf4.webp',
        '../portfolio/real_photo/shkaf5.webp',
      ]
    },
    {
      id: 3,
      name: 'Обустройство комнат',
      type: 'wardrobe-swing',
      style: 'classic',
      material: 'mdf',
      size: '4-6',
      sizeLabel: '4,2 м',
      city: 'Пушкин',
      year: '2024',
      description: 'Фасады МДФ с фрезеровкой, интегрированная подсветка, штанги и ящики.',
      priceFrom: 'от 165 000 ₽',
      tag: 'Спальня, 2024 г.',
      tags: ['МДФ', 'Классика', 'Тёплый беж'],
      images: [
        '../portfolio/real_photo/room.webp',
        '../portfolio/real_photo/room2.webp',
        '../portfolio/real_photo/room3.webp',
        '../portfolio/real_photo/room4.webp',
        '../portfolio/real_photo/room5.webp',
      ]
    },
    {
      id: 4,
      name: 'Санузлы',
      type: 'closet',
      style: 'modern',
      material: 'premium',
      size: '4-6',
      sizeLabel: '5,0 м',
      city: 'Колпино',
      year: '2025',
      description: 'Открытые и закрытые секции, выдвижные корзины, обувные полки.',
      priceFrom: 'от 30 000 ₽',
      tag: 'Гардеробная, 2025 г.',
      tags: ['Премиум', 'Современный', 'Светлое дерево'],
      images: [
        '../portfolio/real_photo/toilet.webp',
        '../portfolio/real_photo/toilet2.webp',
        '../portfolio/real_photo/toilet3.webp',
        '../portfolio/real_photo/toilet4.webp',
      ]
    },
    {
      id: 5,
      name: 'Распашные шкафы',
      type: 'kitchen',
      style: 'loft',
      material: 'ldsp',
      size: '4-6',
      sizeLabel: '4,5 м',
      city: 'Санкт‑Петербург',
      year: '2023',
      description: 'Фасады под бетон, открытые полки, чёрная фурнитура и ручки.',
      priceFrom: 'от 175 000 ₽',
      tag: 'Лофт, 2023 г.',
      tags: ['ЛДСП', 'Лофт', 'Тёмный'],
      images: [
        '../portfolio/real_photo/wall.webp',
        '../portfolio/real_photo/wall2.webp',
        '../portfolio/real_photo/wall3.webp',
        '../portfolio/real_photo/wall4.webp',
        '../portfolio/real_photo/wall5.webp',
        '../portfolio/real_photo/wall6.webp',
        '../portfolio/real_photo/wall7.webp',
      ]
    },
    // {
    //   id: 6,
    //   name: 'Кухня с островом для семьи',
    //   type: 'kitchen',
    //   style: 'modern',
    //   material: 'premium',
    //   size: '6plus',
    //   sizeLabel: '6,2 м',
    //   city: 'Репино',
    //   year: '2025',
    //   description: 'Большой остров, фасады МДФ эмаль, встроенная техника и система хранения.',
    //   priceFrom: 'от 320 000 ₽',
    //   tag: 'Дом, 2025 г.',
    //   tags: ['Премиум', 'Остров', 'Белый + дерево'],
    //   images: [
    //     '/portfolio/foto/kitch.png',
    //     '/portfolio/foto/kitch2.png'
    //   ]
    // }
  ];

  const projectsGrid = document.getElementById('projectsGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const filterType = document.getElementById('filterType');
  const filterStyle = document.getElementById('filterStyle');
  const filterMaterial = document.getElementById('filterMaterial');
  const filterSize = document.getElementById('filterSize');
  const filterSort = document.getElementById('filterSort');

  let visibleCount = 6; // сколько карточек показываем
  let currentFilters = {
    type: 'all',
    style: 'all',
    material: 'all',
    size: 'all',
    sort: 'date'
  };

  function matchesFilter(project, filters) {
    if (filters.type !== 'all' && project.type !== filters.type) return false;
    if (filters.style !== 'all' && project.style !== filters.style) return false;
    if (filters.material !== 'all' && project.material !== filters.material) return false;
    if (filters.size !== 'all') {
      if (filters.size === '6plus' && project.size !== '6plus') return false;
      if (filters.size === '2-4' && project.size !== '3-4' && project.size !== '2-4') return false;
      if (filters.size === '4-6' && project.size !== '4-6') return false;
    }
    return true;
  }

  function sortProjects(list, sortKey) {
    const copy = [...list];
    if (sortKey === 'price') {
      copy.sort((a,b) => {
        const pa = parseInt(a.priceFrom.replace(/\D/g,''), 10);
        const pb = parseInt(b.priceFrom.replace(/\D/g,''), 10);
        return pa - pb;
      });
    } else if (sortKey === 'popular') {
      copy.sort((a,b) => a.id - b.id); // условная "популярность"
    } else { // date
      copy.sort((a,b) => (b.year || 0) - (a.year || 0));
    }
    return copy;
  }

  function renderProjects() {
    projectsGrid.innerHTML = '';
    const filtered = sortProjects(
      projectsData.filter(p => matchesFilter(p, currentFilters)),
      currentFilters.sort
    );
    const toShow = filtered.slice(0, visibleCount);
    toShow.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.dataset.id = project.id;

      card.innerHTML = `
        <div class="project-image-wrapper">
          <span class="project-tag">${project.tag}</span>
          <img src="${project.images[0]}" alt="${project.name}">
          <img src="${project.images[1]}" alt="${project.name}">
        </div>
        <div class="project-body">
          <div class="project-name">${project.name}</div>
          <div class="project-desc">${project.description}</div>
          <div class="project-tags-row">
            ${project.tags.map(t => `<span class="project-mini-tag">${t}</span>`).join('')}
          </div>
          <div class="project-price-row">
            <div class="project-price">${project.priceFrom}</div>
            <button class="project-btn" type="button">Подробнее</button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openProjectModal(project.id));
      projectsGrid.appendChild(card);
    });

    // Кнопка "Показать ещё"
    if (visibleCount >= filtered.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }
  }

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += 3;
    renderProjects();
  });

  [filterType, filterStyle, filterMaterial, filterSize, filterSort].forEach(select => {
    select.addEventListener('change', () => {
      currentFilters = {
        type: filterType.value,
        style: filterStyle.value,
        material: filterMaterial.value,
        size: filterSize.value,
        sort: filterSort.value
      };
      visibleCount = 6;
      renderProjects();
    });
  });

  // ----- MODAL -----
  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalGallery = document.getElementById('modalGallery');
  const modalTitle = document.getElementById('modalTitle');
  const modalInfo = document.getElementById('modalInfo');
  const modalDoneList = document.getElementById('modalDoneList');
  const modalPrice = document.getElementById('modalPrice');
  const modalRelated = document.getElementById('modalRelated');
  const modalCtaBtn = document.getElementById('modalCtaBtn');
  const commentField = document.getElementById('comment');

  function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    modalGallery.innerHTML = project.images
      .concat(project.images) // дублируем, чтобы набить сетку, если мало фото
      .slice(0,4)
      .map(src => `<img src="${src}" alt="${project.name}">`)
      .join('');

    modalTitle.textContent = project.name;
    modalInfo.textContent = `${project.sizeLabel}, фасады ${project.material.toUpperCase()}, стиль ${project.style}`;
    modalPrice.textContent = `Проект выполнен под ключ ${project.priceFrom}`;

    modalDoneList.innerHTML = `
      <li>Проектирование и 3D‑визуализация планировки и фасадов.</li>
      <li>Изготовление корпуса и фасадов на собственном производстве.</li>
      <li>Доставка, сборка, монтаж и вывоз упаковки.</li>
    `;

    const related = projectsData.filter(p => p.id !== id).slice(0,3);
    modalRelated.innerHTML = related.map(p => `
      <div class="modal-related-item">${p.name.split('«')[0].trim()}</div>
    `).join('');

    modalBackdrop.classList.add('active');

    modalCtaBtn.onclick = () => {
      const base = `Пользователь интересуется проектом «${project.name}».`;
      if (!commentField.value.includes(project.name)) {
        commentField.value = commentField.value
          ? base + ' ' + commentField.value
          : base;
      }
      scrollToForm();
      closeModal();
    };
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ----- SCROLL TO FORM & FIXED CTA -----

  const heroToFormBtn = document.getElementById('heroToFormBtn');
  const bottomToFormBtn = document.getElementById('bottomToFormBtn');
  const fixedToFormBtn = document.getElementById('fixedToFormBtn');
  const fixedCta = document.getElementById('fixedCta');
  const calcFormSection = document.getElementById('calcForm');

  function scrollToForm() {
    calcFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  heroToFormBtn.addEventListener('click', scrollToForm);
  bottomToFormBtn.addEventListener('click', scrollToForm);
  fixedToFormBtn.addEventListener('click', scrollToForm);

  window.addEventListener('scroll', () => {
    const offset = window.scrollY || window.pageYOffset;
    const showAfter = 400;
    if (offset > showAfter) {
      fixedCta.style.display = 'block';
    } else {
      fixedCta.style.display = 'none';
    }
  });

  // ----- FORM SUBMIT (демо) -----
  const ctaForm = document.getElementById('ctaForm');
  ctaForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Заявка отправлена (демо). Здесь можно подключить отправку на сервер.');
    ctaForm.reset();
  });

  // initial render
  renderProjects();

