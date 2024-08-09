import {imagePreviewElement} from '../upload-form.js';

const scaleImg = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const scaleValue = document.querySelector('.scale__control--value');

//Функция для изменения размера изображения
const scalePicture = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  scaleValue.setAttribute('value', `${value}%`);
};

//Функция для кнопки уменьшения изображения
const onScaleClickSmaller = () => {
  scalePicture(Math.max(parseInt(scaleValue.value, 10) - scaleImg.STEP, scaleImg.MIN));
};

//Функция для кнопки увеличения изображения
const onScaleClickBigger = () => {
  scalePicture(Math.min(parseInt(scaleValue.value, 10) + scaleImg.STEP, scaleImg.MAX));
};

//Функция для сброса до первоначальных данных
const resetScale = () => scalePicture(scaleImg.DEFAULT);

export {resetScale, onScaleClickSmaller, onScaleClickBigger};
