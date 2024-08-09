import {getRandomInteger} from './utils';

const PICTURES_AMOUNT = 10;
const filterElement = document.querySelector('.img-filters');

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let selectedFilter = Filter.DEFAULT;
let gallery = [];

// Сортируем комментарии
const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredGallery = () => {
  switch (selectedFilter) {
    case Filter.RANDOM:
      return [...gallery].sort(getRandomInteger).slice(0, PICTURES_AMOUNT);
    case Filter.DISCUSSED:
      return [...gallery].sort(sortByComments);
    default:
      return [...gallery];
  }
};

// Переключаем класс у кнопки фильтрации
const toggleActiveClass = (selectedButton) => {
  const activeButton = filterElement.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  selectedButton.classList.add('img-filters__button--active');
};

const onFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {

    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const selectedButton = evt.target;
    if (selectedButton.id === selectedFilter) {
      return;
    }
    toggleActiveClass(selectedButton);
    selectedFilter = selectedButton.id;
    callback(getFilteredGallery());
  });
};

const filterSorting = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  gallery = [...loadedPictures];
  onFilterClick(callback);
};

export {filterSorting};
