import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { imageFileGetRequest } from 'actions/file';
import { selectObjId } from 'actions/imageViewer';

class ShowImgBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImagePath :''
    }
    this.handleOnShowImgModal = this.handleOnShowImgModal.bind(this);
  }

  componentDidMount() {
    if(typeof this.props.data._id !== 'undefined') {
      this.props.imageFileGetRequest(this.props.data._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.imageFileGetStatus.data !== this.props.imageFileGetStatus.data) {
      if(nextProps.imageFileGetStatus.data !== null && nextProps.imageFileGetStatus.data.connectedObj.id === this.props.data._id) {
        let nextState = {};
        nextState['uploadedImagePath'] = nextProps.imageFileGetStatus.data.path;
        this.setState(nextState);
      }
    }
  }

  handleOnShowImgModal() {
    this.props.selectObjId(this.props.data._id);
    $('#imageViewerModal').modal('open');
  }

  render() {
    return (
      <a className='btn'
         disabled={this.state.uploadedImagePath === ''? 'disabled': undefined}
         onClick={this.handleOnShowImgModal}>
        <i className='material-icons center'>image</i>
      </a>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      imageFileGetStatus: state.file.get
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        imageFileGetRequest: (objId) => {
            return dispatch(imageFileGetRequest(objId));
        },
        selectObjId: (obj) => {
          return dispatch(selectObjId(obj));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowImgBtn);
