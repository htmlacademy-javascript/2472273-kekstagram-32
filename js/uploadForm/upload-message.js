import {isEscapeKey} from '../utils';

const errorMessageUploadElement = document.querySelector('#error').content.querySelector('.error');
const successMessageUploadElement = document.querySelector('#success').content.querySelector('.success');

// Функция для закрытия сообщения при нажатии esc
const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

// Закрытие сообщение по клику на странице
const onDocumentClick = (evt) => {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    closeMessage();
  }
};

// Функция для открытия сообщения
const showMessage = (template) => {
  const messageUpload = template.cloneNode(true);
  document.body.append(messageUpload);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  messageUpload.querySelector('.success__button, .error__button').addEventListener('click', closeMessage);
};

// Функция для закрытия сообщения
function closeMessage () {
  const messageUpload = document.querySelector('.success') || document.querySelector('.error');
  if (messageUpload) {
    messageUpload.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showSuccessMessage = () => showMessage(successMessageUploadElement);
const showErrorMessage = () => showMessage(errorMessageUploadElement);

export {showErrorMessage, showSuccessMessage};
