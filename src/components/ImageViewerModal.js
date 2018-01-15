import React from 'react';
import { ImageViewer } from 'components';

class ImageViewerModal extends React.Component {
  render() {
    return (
      <div id='imageViewerModal' className='modal'>
        <div className='modal-content'>
          <ImageViewer/>
        </div>
      </div>
    );
  }
}

export default ImageViewerModal;
