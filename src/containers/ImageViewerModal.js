import React from 'react'
import { connect } from 'react-redux'
import { ImageViewerModal } from 'components'
import { showModal } from 'actions/modal'

class ImageViewerModalContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.imageViewerStatus !== this.props.imageViewerStatus) {
      if(nextProps.imageViewerStatus.selectedObjId !== '')
        this.props.showModal('imageViewerModal')
    }
  }

  render() {
    return (
      <ImageViewerModal/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    imageViewerStatus: state.imageViewer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (name) => {
      return dispatch(showModal(name))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(ImageViewerModalContainer)
