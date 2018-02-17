import React from 'react'
import { connect } from 'react-redux'
import { ImageViewer } from 'components'

class ImageViewerContainer extends React.Component {
  render() {
    const {imageViewerStatus} = this.props
    return (
      <ImageViewer {...{imageViewerStatus}} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    imageViewerStatus: state.imageViewer
  }
}

export default connect (mapStateToProps)(ImageViewerContainer)
