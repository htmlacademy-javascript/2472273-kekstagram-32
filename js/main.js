import {getPicturesFromServer} from './createPictures/create-pictures.js';
import {openUploadModal, closeUploadForm, onSubmitForm} from './uploadForm/upload-form.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './uploadForm/upload-message.js';

getPicturesFromServer();
openUploadModal();

onSubmitForm(async (data) => {
  try {
    await sendData(data);
    closeUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
