import {getRandomInteger, getRandomArrayElement} from '../utils';
import {NUMBER_OF_DESCRIPTIONS, MIN_ID_OBJECT, MAX_ID_OBJECT, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR, MIN_ID_COMMENT, MAX_ID_COMMENT, PHOTOS_NUMBER, TEXT_COMMENT, PHOTO_DESCRIPTION, NAME} from './variables';

// функция для поиска случайного уникального идентификатора
function randomUniqId(min, max) {
  const UNIQ_ARRAY = [];

  return function(){
    let randomId = getRandomInteger(min, max);
    if(UNIQ_ARRAY.length >= (max - min + 1)) {
      return null;
    }

    while (UNIQ_ARRAY.includes(randomId)){
      randomId = getRandomInteger(min, max);
    }

    UNIQ_ARRAY.push(randomId);
    return randomId;
  };
}

// Для создания случайного Id объекта
const getRandomIdObject = randomUniqId(MIN_ID_OBJECT, MAX_ID_OBJECT);

// Для создания случайного Id комментария
const getRandomIdComment = randomUniqId(MIN_ID_COMMENT, MAX_ID_COMMENT);

// функция, генерирующая комментарий
const getComment = () => ({
  id: getRandomIdComment(),
  avatar: `img/avatar-${getRandomInteger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`,
  message: getRandomArrayElement(TEXT_COMMENT),
  name: getRandomArrayElement(NAME),
});


// Функция, генерирующая объекты массива - описание фотографии
const descriptionOfTheObject = () => ({
  id: getRandomIdObject(),
  url: `photos/${getRandomArrayElement(PHOTOS_NUMBER)}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, getComment),
});

// функция, создающая массив из объектов, которые описывают фотографии
// eslint-disable-next-line no-unused-vars
const getObjects = () => Array.from({length: NUMBER_OF_DESCRIPTIONS}, descriptionOfTheObject);

export {getObjects};
