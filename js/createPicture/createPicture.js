import {getObjects} from '../dataCreateObjects/dataCreateObjects';
import {openBigPicture} from '../bigPicture/bigPicture.js';

const createUserPosts = () => {
  const userPostsList = document.querySelector('.pictures');
  const userPostTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const receivedUserPosts = getObjects();

  const postsFragment = document.createDocumentFragment();

  const сurrentUserPost = ({id, url, description, likes, comments}) => {
    const userPost = userPostTemplate.cloneNode(true);
    userPost.id = id;
    userPost.querySelector('.picture__img').src = url;
    userPost.querySelector('.picture__img').alt = description;
    userPost.querySelector('.picture__likes').textContent = likes;
    userPost.querySelector('.picture__comments').textContent = comments.length;
    return userPost;
  };

  userPostsList.addEventListener('click', (event) => {
    if(event.target.closest('.picture')) {
      const correctId = event.target.closest('.picture').id;
      if (correctId) {
        const correctPost = receivedUserPosts.find((item) => String(item.id) === String(correctId));
        if(correctPost) {
          openBigPicture(correctPost);
        }
      }
    }
  });

  receivedUserPosts.forEach((element) => {
    const formedUserPost = сurrentUserPost(element);
    postsFragment.appendChild(formedUserPost);
  });

  userPostsList.appendChild(postsFragment);
};

export {createUserPosts};
