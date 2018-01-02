import React from 'react';
import { connect } from 'react-redux';
import { ImageView } from 'components';

class ImageViewer extends React.Component {
  render() {
    let {imageViewerStatus} = this.props;
    return (
      <div>
        { imageViewerStatus.selectedObjId !== '' ?
          <ImageView objId={imageViewerStatus.selectedObjId} height={500} width={500}/> : undefined }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imageViewerStatus: state.imageViewer
  };
}

export default connect (mapStateToProps)(ImageViewer);
