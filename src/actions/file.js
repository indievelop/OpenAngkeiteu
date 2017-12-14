import {
  IMAGE_FILE_UPLOAD,
  IMAGE_FILE_UPLOAD_SUCCESS,
  IMAGE_FILE_UPLOAD_FAILURE,
  IMAGE_FILE_GET,
  IMAGE_FILE_GET_SUCCESS,
  IMAGE_FILE_GET_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* image file uplaod */
export function imgFileUploadRequest(objId, objKind, imgFile) {
  return (dispatch) => {
    let url = '/api/file/image';
    let formData = new FormData();
    let config = { headers: { 'Content-Type': 'multipart/form-data' } };

    formData.append('connectedObj_id', objId);
    formData.append('connectedObj_kind', objKind);
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

/* image file get */
export function imageFileGetRequest(objId) {
  return (dispatch) => {
    let url = '/api/file/image';

    dispatch(imageFileGet());
    url = `${url}?connectedObj.id=${objId}`;
    return axios.get(url)
    .then((response) => {
      dispatch(imageFileGetSuccess(response.data));
    }).catch((error) => {
      dispatch(imageFileGetFailure(error));
    });
  }
}

export function imageFileGet() {
  return {
    type: IMAGE_FILE_GET
  };
}

export function imageFileGetSuccess(data) {
  return {
    type: IMAGE_FILE_GET_SUCCESS,
    data
  };
}

export function imageFileGetFailure(error) {
  return {
    type: IMAGE_FILE_GET_FAILURE,
    error
  };
}
