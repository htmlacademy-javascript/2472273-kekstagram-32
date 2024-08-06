import {isEscapeKey} from '../utils.js';
import {pristine, uploadForm, isFieldsInFocus, onSubmitForm} from './pristineForm.js';
import {initEffectPicture, resetEffects} from './effectsUploadForm.js';
import {resetScale, onScaleClickSmaller, onScaleClickBigger} from './scaleUploadForm.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');

const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');

const uploadElement = document.querySelector('.img-upload');
const imagePreviewElement = uploadElement.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// функция для загрузки изображения
const initDownloadPicture = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreviewElement.src = URL.createObjectURL(file);
    previewEffects.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreviewElement.src}')`;
    });
  }
};

// функция для закрытия окна при нажатии esc
const handlerEscape = (e) => {
  if(isEscapeKey(e) && !isFieldsInFocus()) {
    e.preventDefault();
    closeUploadForm();
  }
};

// функция для закрытия окна при нажатии на кнопку
const onUploadCancel = () => {
  imgUploadCancel.addEventListener('click', () => {
    closeUploadForm();
  });
};

// функция для открытия окна загрузки
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  onUploadCancel();
  initEffectPicture();
  document.addEventListener('keydown', handlerEscape);
  uploadForm .addEventListener('submit', onSubmitForm);
  smallerScale.addEventListener('click', onScaleClickSmaller);
  biggerScale.addEventListener('click', onScaleClickBigger);
};

const openUploadModal = () => {
  imgUploadInput.addEventListener('input', () => {
    initDownloadPicture();
    openUploadForm();
  });
};

function closeUploadForm () {
  uploadForm.reset();
  pristine.reset();
  resetEffects();
  resetScale();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.removeEventListener('submit', onSubmitForm);
  document.removeEventListener('keydown', handlerEscape);
}

export {openUploadModal, closeUploadForm, uploadElement, imagePreviewElement};
