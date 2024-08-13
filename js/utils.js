const ALERT_SHOW_TIME = 5000;
const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

// Функция для нахождения случайного числа
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция для закрытия окна через кнопку esc
const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Cообщения о ошибке
const showAlert = () => {
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomInteger, getRandomArrayElement, isEscapeKey, debounce, showAlert};
