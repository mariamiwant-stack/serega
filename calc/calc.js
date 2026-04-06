
    const installationPrice = 25000;
    const plinthPricePerM   = 800;
    const MAXNumber    = "79991234567";

    const prices = {
      kitchen: { ldsp: [85000, 95000, 120000], mdf: [95000, 110000, 130000] },
      coupe:   [85000, 115000, 125000],
      swing:   [70000, 100000, 110000]
    };

    const materials = {
      ldsp: [
        { name: "Standard", furn: "Boyard / Sammet",          mat: "ЛДСП Lamarty / Толмесдрев" },
        { name: "Comfort",  furn: "DTC / Boyard / Samsung",   mat: "ЛДСП Egger"                 },
        { name: "Premium",  furn: "Hettich / Blum",           mat: "ЛДСП Egger"                 }
      ],
      mdf: [
        { name: "Standard", furn: "Boyard / Sammet",          mat: "МДФ китай Bliss"            },
        { name: "Comfort",  furn: "DTC / Boyard / Samsung",   mat: "МДФ Bliss / AGT"            },
        { name: "Premium",  furn: "Hettich / Blum",           mat: "МДФ Eterno / Acril / AGT"   }
      ]
    };

    const previewImages = {
      kitchen: [
        "/img_foto/kitchen1.jpeg",
        "/img_foto/kitch1.png",
        "/img_foto/kitchen3_1.jpg",
      ],
      coupe: [
        "https://megashkaf.ru/media-temp/img/goods/files_big/0Cxw8TkAJWtmZitNn_t8IcI.jpg",
        "https://megashkaf.ru/media-temp/img/goods/files_big/06crrlmdwNz2AboPE_aOAJJ.jpg",
        "https://megashkaf.ru/media-temp/img/goods/files_big/0VBIiwOX6W6NE4bf0_Rhlpl.jpg"
      ],
      swing: [
        "/img_foto/rasp_1.png",
        "https://static.tildacdn.com/tild3862-3562-4130-a362-653263396164/fasady-egger-kashemi.jpg",
        "/img_foto/rasp_2.png"
      ]
    };

    let currentType      = 0;
    let currentFacadeTab = 0;
    let selectedLevel    = 1;

    const rubFormatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    function formatRub(n) {
      return rubFormatter.format(n);
    }

    function renderCards() {
      const container = document.getElementById('cards');
      container.innerHTML = '';

      let data, basePrices;
      if (currentType === 0) {
        data = currentFacadeTab === 0 ? materials.ldsp : materials.mdf;
        basePrices = currentFacadeTab === 0 ? prices.kitchen.ldsp : prices.kitchen.mdf;
      } else {
        data = [{ name: "Standard" }, { name: "Comfort" }, { name: "Premium" }];
        basePrices = currentType === 1 ? prices.coupe : prices.swing;
      }

      data.forEach((item, i) => {
        const card = document.createElement('button');
        card.type = "button";
        card.className =
          `card-level w-full text-left px-4 py-4 ${i === selectedLevel ? 'card-active' : ''}`;

        const hasDetails = item.furn && item.mat;

        card.innerHTML = `
          <div class="flex flex-col gap-2">
            <div class="flex items-baseline justify-between gap-2">
              <div class="text-xs uppercase tracking-[0.16em] text-neutral-500">${item.name}</div>
              <div class="text-base font-medium text-neutral-100">${formatRub(basePrices[i])}</div>
            </div>
            ${hasDetails ? `
              <div class="text-[11px] leading-snug text-neutral-400">
                <span class="block">${item.furn}</span>
                <span class="block">${item.mat}</span>
              </div>
            ` : ''}
          </div>
        `;

        card.onclick = () => {
          selectedLevel = i;
          renderCards();
          updatePreview();
          calculate();
        };

        container.appendChild(card);
      });
    }

    function updatePreview() {
      const key = currentType === 0 ? 'kitchen' : (currentType === 1 ? 'coupe' : 'swing');
      const arr = previewImages[key];
      document.getElementById('preview').src = arr[selectedLevel];
    }

    function calculate() {
      const len = parseFloat(document.getElementById('length').value) || 0;
      let facadePrice = 0;

      if (currentType === 0) {
        facadePrice = currentFacadeTab === 0
          ? prices.kitchen.ldsp[selectedLevel]
          : prices.kitchen.mdf[selectedLevel];
      } else {
        facadePrice = currentType === 1
          ? prices.coupe[selectedLevel]
          : prices.swing[selectedLevel];
      }

      const totalFacade  = facadePrice * len;
      const totalCounter = currentType === 0
        ? parseFloat(document.getElementById('countertop').value) * len
        : 0;
      const delivery     = parseFloat(document.getElementById('delivery').value);
      const termExtra    = parseFloat(document.getElementById('term').value);
      const plinth       = document.getElementById('plinth').checked ? plinthPricePerM * len : 0;

      const total = Math.round(
        totalFacade + totalCounter + delivery + termExtra + plinth + installationPrice
      );

      document.getElementById('total').textContent = formatRub(total);
    }

    function switchFacadeTab(tab) {
      currentFacadeTab = tab;
      document.getElementById('tab0').classList.toggle('pill-tab-active', tab === 0);
      document.getElementById('tab1').classList.toggle('pill-tab-active', tab === 1);
      renderCards();
      calculate();
    }

    function selectType(type) {
      currentType = type;
      document.querySelectorAll('.type-pill').forEach((el, i) => {
        el.classList.toggle('type-pill-active', i === type);
      });

      document.getElementById('calc-title').textContent =
        type === 0 ? 'Рассчитать кухню под ключ' :
        type === 1 ? 'Рассчитать шкаф-купе под ключ' : 'Рассчитать распашной шкаф под ключ';

      document.getElementById('facade-tabs').classList.toggle('hidden', type !== 0);
      document.getElementById('countertop-block').classList.toggle('hidden', type !== 0);

      document.getElementById('length-label').textContent =
        type === 0 ? 'Длина кухни по фасадам, пог. м' : 'Ширина по фасадам, пог. м';

      renderCards();
      updatePreview();
      calculate();
    }

    function openForm()  {
      document.getElementById('modal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('modal').classList.add('hidden');
    }

   






















function savePDF() {
  fillPdfTemplate();

  const element = document.getElementById('calc-pdf-root');
  if (!element) {
    console.error('calc-pdf-root не найден');
    return;
  }

  // запоминаем текущий display
  const prevDisplay = element.style.display;
  
  // принудительно показываем блок
  element.style.display = 'block';

  const opt = {
    margin: [0, 0, 0, 0],
    filename: 'raschet-mebel-pod-klyuch.pdf',
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      // возвращаем обратно
      element.style.display = prevDisplay || 'none';
    });
}

function fillPdfTemplate() {
  // Тип изделия
  const typeText =
    currentType === 0 ? 'Кухня' :
    currentType === 1 ? 'Шкаф-купе' :
    'Распашной шкаф';

  const pdfTypeEl = document.getElementById('pdf-type');
  if (pdfTypeEl) {
    pdfTypeEl.textContent = 'Тип: ' + typeText;
  }

  // Уровень (Standard / Comfort / Premium)
  const levelNames = ['Standard', 'Comfort', 'Premium'];
  const pdfLevelEl = document.getElementById('pdf-level');
  if (pdfLevelEl) {
    pdfLevelEl.textContent = 'Уровень: ' + (levelNames[selectedLevel] || '—');
  }

  // Длина
  const lengthInput = document.getElementById('length');
  const len = lengthInput ? parseFloat(lengthInput.value || '0') : 0;
  const pdfLengthEl = document.getElementById('pdf-length');
  if (pdfLengthEl) {
    pdfLengthEl.textContent = 'Длина: ' + (len || '-') + ' м';
  }

  // Столешница (только для кухни)
  let countertopText = '—';
  if (currentType === 0) {
    const sel = document.getElementById('countertop');
    const opt = sel ? sel.options[sel.selectedIndex] : null;
    countertopText = opt ? opt.textContent.trim() : '—';
  }
  const pdfCountertopEl = document.getElementById('pdf-countertop');
  if (pdfCountertopEl) {
    pdfCountertopEl.textContent = 'Столешница: ' + countertopText;
  }

  // Доставка
  const delSel = document.getElementById('delivery');
  const delOpt = delSel ? delSel.options[delSel.selectedIndex] : null;
  const pdfDeliveryEl = document.getElementById('pdf-delivery');
  if (pdfDeliveryEl) {
    pdfDeliveryEl.textContent =
      'Доставка: ' + (delOpt ? delOpt.textContent.trim() : '—');
  }

  // Срок изготовления
  const termSel = document.getElementById('term');
  const termOpt = termSel ? termSel.options[termSel.selectedIndex] : null;
  const pdfTermEl = document.getElementById('pdf-term');
  if (pdfTermEl) {
    pdfTermEl.textContent =
      'Срок: ' + (termOpt ? termOpt.textContent.trim() : '—');
  }

  // Плинтус
  const plinthCheckbox = document.getElementById('plinth');
  const plinthChecked = plinthCheckbox ? plinthCheckbox.checked : false;
  const pdfPlinthEl = document.getElementById('pdf-plinth');
  if (pdfPlinthEl) {
    pdfPlinthEl.textContent =
      'Плинтус: ' + (plinthChecked ? 'Да (+800 ₽/м)' : 'Нет');
  }

  // Итоговая сумма
  const totalEl = document.getElementById('total');
  const pdfTotalEl = document.getElementById('pdf-total');
  if (pdfTotalEl) {
    pdfTotalEl.textContent = totalEl ? totalEl.textContent || '—' : '—';
  }

  // Картинка из текущего превью
  const previewImg = document.getElementById('preview');
  const pdfPreviewImg = document.getElementById('pdf-preview');
  if (pdfPreviewImg) {
    pdfPreviewImg.src = previewImg ? previewImg.src : '';
  }
}
















    window.onload = () => {
      selectType(0);
      document.getElementById('length').addEventListener('input', calculate);
      document.getElementById('countertop').addEventListener('change', calculate);
      document.getElementById('delivery').addEventListener('change', calculate);
      document.getElementById('term').addEventListener('change', calculate);
      document.getElementById('plinth').addEventListener('change', calculate);
      calculate();
    };



