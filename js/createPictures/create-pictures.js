import {openBigPicture} from './big-picture.js';
import {filterSorting} from '../filter-gallery.js';
import {getData} from '../api.js';
import {debounce, showAlert} from '../utils.js';

const userPostsListElement = document.querySelector('.pictures');
const userPostTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

// Массив для хранения картинок
let picturesList = [];

// Создание миниатюры
const getCurrentUserPost = ({id, url, description, likes, comments}) => {
  const userPost = userPostTemplateElement.cloneNode(true);
  userPost.id = id;
  userPost.querySelector('.picture__img').src = url;
  userPost.querySelector('.picture__img').alt = description;
  userPost.querySelector('.picture__likes').textContent = likes;
  userPost.querySelector('.picture__comments').textContent = comments.length;
  return userPost;
};

// Отображение галлереи миниатюр
const renderPicturesPreviews = (previews, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());

  const postsFragment = document.createDocumentFragment();
  previews.forEach((picture) => {
    const formedUserPost = getCurrentUserPost(picture);
    postsFragment.appendChild(formedUserPost);
  });
  container.appendChild(postsFragment);
};

// Поиск картинки по id
const onPictureClick = (evt) => {
  if(evt.target.closest('.picture')) {
    const correctId = evt.target.closest('.picture').id;
    if (correctId) {
      const correctPost = picturesList.find((item) => String(item.id) === String(correctId));
      if(correctPost) {
        openBigPicture(correctPost);
      }
    }
  }
};

// Создание миниатюр на странице
const createUserPosts = (userPosts) => {

  picturesList = userPosts;
  renderPicturesPreviews(picturesList, userPostsListElement);
  userPostsListElement.addEventListener('click', onPictureClick);
};

// Загрузка данных с сервера
const getPicturesFromServer = async () => {
  try {
    const data = await getData();
    const debouncedRenderGallery = debounce(createUserPosts);
    await new Promise((res)=>
      res()).then(()=>
      createUserPosts(data));
    filterSorting(data, debouncedRenderGallery);
  } catch {
    showAlert();
  }
};

export {getPicturesFromServer};
