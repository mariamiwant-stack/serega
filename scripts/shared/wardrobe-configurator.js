document.addEventListener('DOMContentLoaded', function () {
  const wardrobeImage = document.getElementById('wardrobeImage');
  const swatches = document.querySelectorAll('.material-swatch');
  const currentName = document.querySelector('.wardrobe-current-name');
  const heightRange = document.getElementById('heightRange');
  const widthRange = document.getElementById('widthRange');
  const heightValue = document.getElementById('heightValue');
  const widthValue = document.getElementById('widthValue');
  const priceValue = document.getElementById('priceValue');
  const hotspot = document.querySelector('.wardrobe-hotspot');

  const basePrice = 142500;
  const pricePer50mmHeight = 150;
  const pricePer50mmWidth = 200;

  function formatPrice(value) {
    return value.toLocaleString('ru-RU') + ' ₽';
  }

  function changeTexture(textureKey, label) {
    const newSrc = 'img/wardrobe/' + textureKey + '.png';

    wardrobeImage.style.opacity = '0';
    setTimeout(() => {
      wardrobeImage.src = newSrc;
      wardrobeImage.onload = () => {
        wardrobeImage.style.opacity = '1';
      };
    }, 180);

    if (label && currentName) {
      currentName.textContent = 'Шкаф-купе Premium • ' + label;
    }
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const textureKey = swatch.dataset.texture;
      const label = swatch.dataset.label;

      swatches.forEach((s) => s.classList.remove('is-active'));
      swatch.classList.add('is-active');

      changeTexture(textureKey, label);
    });
  });

  if (hotspot) {
    hotspot.addEventListener('click', () => {
      const materialsBlock = document.querySelector('.wardrobe-materials');
      if (materialsBlock) {
        materialsBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  function updateSizeAndPrice() {
    const h = Number(heightRange.value);
    const w = Number(widthRange.value);

    heightValue.textContent = h;
    widthValue.textContent = w;

    const extraHeightSteps = (h - 2400) / 50;
    const extraWidthSteps = (w - 1800) / 50;

    const price =
      basePrice +
      extraHeightSteps * pricePer50mmHeight +
      extraWidthSteps * pricePer50mmWidth;

    priceValue.textContent = formatPrice(price);
  }

  heightRange.addEventListener('input', updateSizeAndPrice);
  widthRange.addEventListener('input', updateSizeAndPrice);

  updateSizeAndPrice();
});
