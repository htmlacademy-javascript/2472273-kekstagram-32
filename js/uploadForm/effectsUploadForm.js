import {imagePreviewElement} from './uploadForm';

const uploadElement = document.querySelector('.img-upload');
const effectsOfElement = uploadElement.querySelector('.effects');
const sliderElement = uploadElement.querySelector('.effect-level__slider');
const sliderContainerElement = uploadElement.querySelector('.img-upload__effect-level');
const effectLevelElement = uploadElement.querySelector('.effect-level__value');

const effectsToImg = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectFilter = {
  [effectsToImg.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [effectsToImg.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [effectsToImg.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [effectsToImg.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [effectsToImg.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectSlider = {
  [effectsToImg.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effectsToImg.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effectsToImg.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effectsToImg.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effectsToImg.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effectsToImg.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
};

let selectedEffect = effectsToImg.DEFAULT;

const isDefault = () => selectedEffect === effectsToImg.DEFAULT;

//Функция для применения специальных эффектов для изображения
const setImageStyle = () => {
  if(isDefault()) {
    imagePreviewElement.style.filter = null;
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectFilter[selectedEffect];
  imagePreviewElement.style.filter = `${style}(${value}${unit})`;
};

//Показать слайдер
const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

//Скрыть слайдер
const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};


//Функция для получения значений слайдера
const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

//Создание слайдера эффектов с параметрами ввода данных
const createSlider = ({min, max, step}) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

//Обновление слайдера эффектов
const updateSlider = ({min, max, step}) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

//Установление состояния слайдара по умолчанию
const setSlider = () => {
  if(isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectSlider[selectedEffect]);
    showSlider();
  }
};

//Применение эффектов
const setEffect = (effect) => {
  selectedEffect = effect;
  setSlider();
  setImageStyle();
};

const onEffectsChange = (e) => {
  setEffect(e.target.value);
};

//Сброс эффектов
const resetEffects = () => {
  setEffect(effectsToImg.DEFAULT);
};

//Инициализация настроек слайдера
const initEffectPicture = () => {
  createSlider(effectSlider[selectedEffect]);
  effectsOfElement.addEventListener('change', onEffectsChange);
};

export { initEffectPicture, resetEffects };
