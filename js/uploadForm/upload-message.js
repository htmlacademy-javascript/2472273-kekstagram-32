import {isEscapeKey} from '../utils';

const errorMessageUpload = document.querySelector('#error').content.querySelector('.error');
const successMessageUpload = document.querySelector('#success').content.querySelector('.success');

// функция для закрытия сообщения при нажатии esc
const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

// закрытие сообщение по клику на странице
const onDocumentClick = (evt) => {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    closeMessage();
  }
};

// функция для открытия сообщения
const showMessage = (template) => {
  const messageUpload = template.cloneNode(true);
  document.body.append(messageUpload);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  messageUpload.querySelector('.success__button, .error__button').addEventListener('click', closeMessage);
};

// функция для закрытия сообщения
function closeMessage () {
  const messageUpload = document.querySelector('.success') || document.querySelector('.error');
  if (messageUpload) {
    messageUpload.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showSuccessMessage = () => showMessage(successMessageUpload);
const showErrorMessage = () => showMessage(errorMessageUpload);

export {showErrorMessage, showSuccessMessage};
