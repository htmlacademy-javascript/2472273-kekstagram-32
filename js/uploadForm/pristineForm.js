const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const commentDescription = document.querySelector('.text__description');

//данные для валидации
const VALID_HASHTAG = /^#[A-ZА-ЯЁa-zа-яё0-9]{1,19}$/;
const MAX_HASHTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const errorMessage = {
  INVALID_COUNT: `Максимальное количество хэштегов ${MAX_HASHTAGS}.`,
  REPEAT_HASHTAGS: 'Хэштеги не должны повторятся.',
  INVALID__HASHTAG: 'Введен невалидный хэштег.',
  INVALID_COMMENTS_LENGTH: `Длина комментария не может составлять больше  ${MAX_COMMENTS_LENGTH} символов.`
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// валидация хэштега
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
const isFieldsInFocus = () => textHashtags === document.activeElement || commentDescription === document.activeElement;

pristine.addValidator(
  textHashtags,
  checkValidHastags,
  errorMessage.INVALID__HASHTAG
);

pristine.addValidator(
  textHashtags,
  checkHashtagsAmount,
  errorMessage.INVALID_COUNT
);

pristine.addValidator(
  textHashtags,
  checkUniqHashtags,
  errorMessage.REPEAT_HASHTAGS
);

pristine.addValidator(
  commentDescription,
  checkCommentsLength,
  errorMessage.INVALID_COMMENTS_LENGTH
);

const onSubmitForm = (e) => {
  e.preventDefault();
  pristine.validate();
};

export {pristine, uploadForm, isFieldsInFocus, onSubmitForm};


