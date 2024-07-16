import {getObjects} from './dataCreateObjects/dataCreateObjects';

const renderUserPosts = (root) => {
  const createPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const getPictures = getObjects();
  const listOfThumbnailFragment = document.createDocumentFragment();

  getPictures.forEach(({url, description, comments, likes}) => {
    const pictureElement = createPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    listOfThumbnailFragment.appendChild(pictureElement);
  });

  root.appendChild(listOfThumbnailFragment);
};

export {renderUserPosts};

