import {openBigPicture} from './big-picture.js';
import {filterSorting} from '../filter-gallery.js';
import {getData} from '../api.js';
import {debounce, showAlert} from '../utils.js';

const userPostsList = document.querySelector('.pictures');
const userPostTemplate = document.querySelector('#picture').content.querySelector('.picture');

// массив для хранения картинок
let picturesList = [];

// создание миниатюры
const сurrentUserPost = ({id, url, description, likes, comments}) => {
  const userPost = userPostTemplate.cloneNode(true);
  userPost.id = id;
  userPost.querySelector('.picture__img').src = url;
  userPost.querySelector('.picture__img').alt = description;
  userPost.querySelector('.picture__likes').textContent = likes;
  userPost.querySelector('.picture__comments').textContent = comments.length;
  return userPost;
};

// отображение галлереи миниатюр
const renderPicturesPreviews = (previews, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());

  const postsFragment = document.createDocumentFragment();
  previews.forEach((picture) => {
    const formedUserPost = сurrentUserPost(picture);
    postsFragment.appendChild(formedUserPost);
  });
  container.appendChild(postsFragment);
};

// поиск картинки по id
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

// создание миниатюр на странице
const createUserPosts = (userPosts) => {

  picturesList = userPosts;
  renderPicturesPreviews(picturesList, userPostsList);
  userPostsList.addEventListener('click', onPictureClick);
};

// загрузка данных с сервера
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
