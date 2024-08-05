import { isEscapeKey } from "../utils";

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

// создание комментариев
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const socialItemCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommenTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommenShownCount = bigPicture.querySelector('.social__comment-shown-count');

const SOCIAL_PICTURE_WIDTH = 35;
const SOCIAL_PICTURE_HEIGHT = 35;

let commentsData = [];
let commentsShown = 0;
const SHOWN_COMMENTS = 5;

// функция для генерации комментария в большой фотографии

const getCommentForBigPicture = ({avatar, name, message}) => {
  const socialCommentElement = socialComment.cloneNode(true);
  socialCommentElement.querySelector('.social__picture').src = avatar;
  socialCommentElement.querySelector('.social__picture').alt = name;
  socialCommentElement.querySelector('.social__picture').width = SOCIAL_PICTURE_WIDTH;
  socialCommentElement.querySelector('.social__picture').height = SOCIAL_PICTURE_HEIGHT;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

const hideCommentsControls = () => {
  if(commentsShown >= commentsData.length) {
    socialCommentsLoader.classList.add('hidden');
    commentsShown = commentsData.length;
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

const setCommentsTextCount = () => {
  socialCommenShownCount.textContent = commentsShown;
  socialCommenTotalCount.textContent = commentsData.length;
};

const renderComments = () => {
  commentsShown += SHOWN_COMMENTS;
  hideCommentsControls();

  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = getCommentForBigPicture(commentsData[i]);
    commentFragment.append(comment);
  }

  socialComments.innerHTML = '';
  socialComments.append(commentFragment);
  setCommentsTextCount();
};

const onCommentsLoaderClick = () => renderComments();
socialCommentsLoader.addEventListener('click', onCommentsLoaderClick);

//Открытие поста на весь экран

const showBigPicture = () => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const hideBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsShown = 0;
};

const handlerEscape = (e) => {
  if(isEscapeKey(e)) {
    closeBigPicture();
  }
};

const removeEvents = () => {
  document.removeEventListener('keydown', handlerEscape);
  bigPictureCancel.removeEventListener('click', closeBigPicture);
};

const registerCloseEvents = () => {
  document.addEventListener('keydown', handlerEscape);
  bigPictureCancel.addEventListener('click', closeBigPicture);
};

const renderBigPicture = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const openBigPicture = (data) => {
  renderBigPicture(data);
  commentsData = data.comments;

  if(commentsData.length > 0) {
    renderComments();
    socialItemCommentCount.classList.remove('hidden');
    socialComments.classList.remove('hidden');
  } else {
    hideCommentsControls();
    socialItemCommentCount.classList.add('hidden');
    socialComments.classList.add('hidden');
  }

  showBigPicture();
  registerCloseEvents();
};

function closeBigPicture() {
  removeEvents();
  hideBigPicture();
}

export {openBigPicture};
