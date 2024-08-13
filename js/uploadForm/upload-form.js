import {isEscapeKey} from '../utils.js';
import {pristine, uploadFormElement, isFieldsInFocus} from './pristine-form-validation.js';
import {initEffectPicture, resetEffects} from './effects/effects-upload-form.js';
import {resetScale, onScaleClickSmaller, onScaleClickBigger} from './effects/scale-upload-form.js';

const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const imgUploadInputElement = document.querySelector('.img-upload__input');

const smallerScaleButtonElement = document.querySelector('.scale__control--smaller');
const biggerScaleButtonElement = document.querySelector('.scale__control--bigger');

const uploadElement = document.querySelector('.img-upload');
const imagePreviewElement = uploadElement.querySelector('.img-upload__preview img');
const previewEffectsElement = document.querySelectorAll('.effects__preview');
const submitButtonElement = document.querySelector('.img-upload__submit');

// Текст для кнопки отправки
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправка...'
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Функция для загрузки изображения
const initDownloadPicture = () => {
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreviewElement.src = URL.createObjectURL(file);
    previewEffectsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreviewElement.src}')`;
    });
  }
};

// Функция для закрытия окна при нажатии на кнопку
const onUploadCancel = () => {
  imgUploadCancelElement.addEventListener('click', () => {
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
const toggleSubmitButton = (submitElement, value, disabled) => {
  submitElement.disabled = disabled;
  submitElement.textContent = value;
};

// Функция для открытия окна загрузки
const openUploadForm = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  onUploadCancel();
  initEffectPicture();
  document.addEventListener('keydown', onEscKeydown);
  smallerScaleButtonElement.addEventListener('click', onScaleClickSmaller);
  biggerScaleButtonElement.addEventListener('click', onScaleClickBigger);
};

const openUploadModal = () => {
  imgUploadInputElement.addEventListener('input', () => {
    initDownloadPicture();
    openUploadForm();
  });
};

function closeUploadForm () {
  uploadFormElement.reset();
  pristine.reset();
  resetEffects();
  resetScale();
  imgUploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

const onSubmitForm = (callback) => {
  uploadFormElement.addEventListener('submit', async (evt) =>{
    evt.preventDefault();
    if (pristine.validate()) {
      toggleSubmitButton(submitButtonElement, SubmitButtonText.SENDING, true);
      await callback(new FormData(uploadFormElement));
      toggleSubmitButton(submitButtonElement, SubmitButtonText.IDLE, null);
    }
  });
};

export {openUploadModal, closeUploadForm, onSubmitForm, uploadElement, imagePreviewElement};
