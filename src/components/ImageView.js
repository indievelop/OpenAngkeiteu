import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentForm from 'components';
import { imageFileGetRequest } from 'actions/file';

class ImageView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedImagePath: ''
    };
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });

    if(typeof this.props.objId !== 'undefined')
      this.props.imageFileGetRequest(this.props.objId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.imageFileGetStatus.data !== this.props.imageFileGetStatus.data) {
      if(nextProps.imageFileGetStatus.data !== null && nextProps.imageFileGetStatus.data.connectedObj.id === this.props.objId) {
        let nextState = {};
        nextState['uploadedImagePath'] = nextProps.imageFileGetStatus.data.path;
        this.setState(nextState);
      }
    }
  }

  render() {
    let {src, height, width, onRemoveClick} = this.props;
    let { uploadedImagePath } = this.state;
    let defaults = {
      height: height || 100,
      width: width || 100,
    };

    const removeBtn = (
      <a className='btn' onClick={onRemoveClick}>remove</a>
    );

    return (
      <div>
        <img className='materialboxed responsive-img'
             src={uploadedImagePath !== '' ? uploadedImagePath : src} {...defaults}/>
        {typeof onRemoveClick !== 'undefined' ?  removeBtn :undefined}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      imageFileGetStatus: state.file.get
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        imageFileGetRequest: (objId) => {
            return dispatch(imageFileGetRequest(objId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageView);
