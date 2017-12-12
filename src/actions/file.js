import {
  IMAGE_FILE_UPLOAD,
  IMAGE_FILE_UPLOAD_SUCCESS,
  IMAGE_FILE_UPLOAD_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* image file uplaod */
export function imgFileUploadRequest(id, imgFile) {
  return (dispatch) => {
    let url = '/api/file/image';
    let formData = new FormData();
    let config = { headers: { 'Content-Type': 'multipart/form-data' } };

    formData.append('id', id);
    formData.append('imgFile', imgFile);
    dispatch(imgFileUpload());
    return axios.post(url, formData, config)
    .then((response) => {
        dispatch(imgFileUploadSuccess(response.data.id));
    }).catch((error) => {
        dispatch(imgFileUploadFailure(error.response.data.erroreMessage));
    });
  }
}

export function imgFileUpload() {
    return {
        type: IMAGE_FILE_UPLOAD
    };
}

export function imgFileUploadSuccess(id) {
    return {
        type: IMAGE_FILE_UPLOAD_SUCCESS,
        id
    };
}

export function imgFileUploadFailure(error) {
    return {
        type: IMAGE_FILE_UPLOAD_FAILURE,
        error
    };
}
