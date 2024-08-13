const uploadFormElement = document.querySelector('.img-upload__form');
const textHashtagsElement = document.querySelector('.text__hashtags');
const commentDescriptionElement = document.querySelector('.text__description');

//Данные для валидации
const VALID_HASHTAG = /^#[A-ZА-ЯЁa-zа-яё0-9]{1,19}$/;
const MAX_HASHTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const errorMessage = {
  INVALID_COUNT: `Максимальное количество хэштегов ${MAX_HASHTAGS}.`,
  REPEAT_HASHTAGS: 'Хэштеги не должны повторятся.',
  INVALID__HASHTAG: 'Введен невалидный хэштег.',
  INVALID_COMMENTS_LENGTH: `Длина комментария не может составлять больше  ${MAX_COMMENTS_LENGTH} символов.`
};

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Валидация хэштега
const normalizeString = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ').filter((hashtagsString) => Boolean(hashtagsString.length));
  return hashtags;
};

const checkValidHastags = (value) => normalizeString(value).every((tag) => VALID_HASHTAG.test(tag));

const checkHashtagsAmount = (value) => normalizeString(value).length <= MAX_HASHTAGS;

const checkUniqHashtags = (value) => {
  const hashtagsString = normalizeString(value);
  return hashtagsString.length === new Set(hashtagsString).size;
};

const checkCommentsLength = (value) => value.length <= MAX_COMMENTS_LENGTH;

// Проверка находятся ли поля в фокусе
const isFieldsInFocus = () => textHashtagsElement === document.activeElement || commentDescriptionElement === document.activeElement;

pristine.addValidator(
  textHashtagsElement,
  checkValidHastags,
  errorMessage.INVALID__HASHTAG
);

pristine.addValidator(
  textHashtagsElement,
  checkHashtagsAmount,
  errorMessage.INVALID_COUNT
);

pristine.addValidator(
  textHashtagsElement,
  checkUniqHashtags,
  errorMessage.REPEAT_HASHTAGS
);

pristine.addValidator(
  commentDescriptionElement,
  checkCommentsLength,
  errorMessage.INVALID_COMMENTS_LENGTH
);

export {pristine, uploadFormElement, isFieldsInFocus};


