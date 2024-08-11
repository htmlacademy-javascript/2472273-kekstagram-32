import {isEscapeKey} from '../utils.js';
import {pristine, uploadForm, isFieldsInFocus} from './pristine-form-validation.js';
import {initEffectPicture, resetEffects} from './effects/effects-upload-form.js';
import {resetScale, onScaleClickSmaller, onScaleClickBigger} from './effects/scale-upload-form.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');

const uploadElement = document.querySelector('.img-upload');
const imagePreviewElement = uploadElement.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');
const submitButton = document.querySelector('.img-upload__submit');

// Текст для кнопки отправки
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправка...'
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Функция для загрузки изображения
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

// Функция для закрытия окна при нажатии на кнопку
const onUploadCancel = () => {
  imgUploadCancel.addEventListener('click', () => {
    closeUploadForm();
  });
};

// Выходит ли сообщение об ошибке
const isErrorMessageOpen = () => {
  const error = document.querySelector('.error');
  return Boolean(error);
};

// Функция для закрытия окна при нажатии на esc
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldsInFocus() && !isErrorMessageOpen()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

// Изменение состояния кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Функция для открытия окна загрузки
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  onUploadCancel();
  initEffectPicture();
  document.addEventListener('keydown', onEscKeydown);
  smallerScaleButton.addEventListener('click', onScaleClickSmaller);
  biggerScaleButton.addEventListener('click', onScaleClickBigger);
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
  document.removeEventListener('keydown', onEscKeydown);
}

const onSubmitForm = (callback) => {
  uploadForm.addEventListener('submit', async (evt) =>{
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      await callback(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

export {openUploadModal, closeUploadForm, onSubmitForm, uploadElement, imagePreviewElement, imgUploadInput};
