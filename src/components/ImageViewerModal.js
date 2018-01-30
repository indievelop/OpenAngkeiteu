import React from 'react'
import { ImageViewer, Modal } from 'containers'

class ImageViewerModal extends React.Component {
  render() {
    const name = 'imageViewerModal'
    return (
      <Modal {...{name}}>
        <ImageViewer/>
      </Modal>
    )
  }
}

export default ImageViewerModal
