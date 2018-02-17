import React from 'react'
import PropTypes from 'prop-types'
import { ImageView } from 'components'

class ImageViewer extends React.Component {
  render() {
    const {imageViewerStatus} = this.props
    return (
      <div>
        { imageViewerStatus.selectedObjId !== '' ?
          <ImageView objId={imageViewerStatus.selectedObjId} height={500} width={500}/> : undefined }
      </div>
    )
  }
}

ImageViewer.propTypes = {
  imageViewerStatus: PropTypes.object.isRequired
}

export default ImageViewer
