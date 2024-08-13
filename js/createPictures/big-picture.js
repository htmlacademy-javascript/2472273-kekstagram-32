import {isEscapeKey} from '../utils';

const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

// Создание комментариев
const socialCommentsElement = document.querySelector('.social__comments');
const socialCommentTemplateElement = socialCommentsElement.querySelector('.social__comment');
const socialItemCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const socialCommentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');

const SOCIAL_PICTURE_WIDTH = 35;
const SOCIAL_PICTURE_HEIGHT = 35;

const SHOWN_COMMENTS = 5;
let commentsData = [];
let commentsShown = 0;

// Функция для генерации комментария
const getCommentForBigPicture = ({avatar, name, message}) => {
  const socialCommentElement = socialCommentTemplateElement.cloneNode(true);
  socialCommentElement.querySelector('.social__picture').src = avatar;
  socialCommentElement.querySelector('.social__picture').alt = name;
  socialCommentElement.querySelector('.social__picture').width = SOCIAL_PICTURE_WIDTH;
  socialCommentElement.querySelector('.social__picture').height = SOCIAL_PICTURE_HEIGHT;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

const hideCommentsControls = () => {
  if(commentsShown >= commentsData.length) {
    socialCommentsLoaderElement.classList.add('hidden');
    commentsShown = commentsData.length;
  } else {
    socialCommentsLoaderElement.classList.remove('hidden');
  }
};

const setCommentsTextCount = () => {
  socialCommentShownCountElement.textContent = commentsShown;
  socialCommentTotalCountElement.textContent = commentsData.length;
};

const renderComments = () => {
  commentsShown += SHOWN_COMMENTS;
  hideCommentsControls();

  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = getCommentForBigPicture(commentsData[i]);
    commentFragment.append(comment);
  }

  socialCommentsElement.innerHTML = '';
  socialCommentsElement.append(commentFragment);
  setCommentsTextCount();
};

const onCommentsLoaderClick = () => renderComments();
socialCommentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

//Открытие фотографии на весь экран
const showBigPicture = () => {
  body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
};

const hideBigPicture = () => {
  body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  commentsShown = 0;
};

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const removeEvents = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCancelElement.removeEventListener('click', closeBigPicture);
};

const registerCloseEvents = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancelElement.addEventListener('click', closeBigPicture);
};

const renderBigPicture = ({url, description, likes}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
};

const openBigPicture = (data) => {
  renderBigPicture(data);
  commentsData = data.comments;

  if(commentsData.length > 0) {
    renderComments();
    socialItemCommentCountElement.classList.remove('hidden');
    socialCommentsElement.classList.remove('hidden');
  } else {
    hideCommentsControls();
    socialItemCommentCountElement.classList.add('hidden');
    socialCommentsElement.classList.add('hidden');
  }

  showBigPicture();
  registerCloseEvents();
};

function closeBigPicture() {
  removeEvents();
  hideBigPicture();
}

export {openBigPicture};
