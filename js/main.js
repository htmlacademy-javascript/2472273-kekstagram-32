const NUMBER_OF_DESCRIPTIONS = 25;

const INDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

const TEXT_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTION = [
  'Закат над тихим морем',
  'Уличный рынок в центре города',
  'Лесная тропинка в осеннем лесу',
  'Кафе на берегу реки',
  'Современный городской пейзаж',
  'Горная вершина в облаках',
  'Поле с цветущими подсолнухами',
  'Лодка на спокойном озере',
  'Вечеринка на крыше здания',
  'Древний храм в джунглях',
  'Традиционный сельский дом',
  'Колоритный уличный художник',
  'Десерт в модном ресторане',
  'Уличный музыкант с гитарой',
  'Небоскребы в ночных огнях',
  'Дети, играющие в парке',
  'Элегантная свадьба на природе',
  'Стадо диких животных на саванне',
  'Красивая библиотека с высокими стеллажами',
  'Водопад в тропическом лесу',
];

const NAME = ['Мария',
  'Даниил',
  'Амина',
  'Марк',
  'Фёдор',
  'Глеб',
  'Евгения',
  'Андрей',
  'Варвара',
  'Милана',
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// функция для поиска числа в массиве
function contains(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}

// функция для поиска случайного уникального идентификатора
function randomUniqId(min, max) {
  const UNIQ_ARRAY = [];

  return function(){
    let randomId = getRandomInteger(min, max);
    if(UNIQ_ARRAY.length >= (max - min + 1)) {
      return null;
    }

    while (contains(UNIQ_ARRAY, randomId) === true){
      randomId = getRandomInteger(min, max);
    }

    UNIQ_ARRAY.push(randomId);
    return randomId;
  };
}

// Для создания случайного Id объекта
const getRandomIdObject = randomUniqId(1, 25);

// Для создания случайного Id комментария
const getRandomIdComment = randomUniqId(0, 200);

// Для создания случайного количества комментариев
const getRandomNumberOfComments = randomUniqId(1, 30);

// функция, генерирующая комментарий
const getComment = () => ({
  id: getRandomIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(TEXT_COMMENT),
  name: getRandomArrayElement(NAME),
});

// Функция, генерирующая объекты массива - описание фотографии
const descriptionOfTheObject = () => ({
  id: getRandomIdObject(),
  url: `photos/${getRandomArrayElement(INDEX)}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomNumberOfComments()}, getComment),
});

// функция, создающая массив из объектов, которые описывают фотографии
// eslint-disable-next-line no-unused-vars
const getObjects = Array.from({length: NUMBER_OF_DESCRIPTIONS}, descriptionOfTheObject);
