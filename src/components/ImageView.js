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
    }
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  }

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.objId !== 'undefined' && nextProps.objId !== this.props.objId)
      this.props.imageFileGetRequest(nextProps.objId);

    if(nextProps.imageFileGetStatus !== this.props.imageFileGetStatus) {
      let nextState = {};
      if(nextProps.imageFileGetStatus.data !== null) {
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
