import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ImageView } from 'components';
import { imgFileUploadRequest } from 'actions/file';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgFile: '',
      imgUrl: ''
    }
    this.handleOnChangeImagefile = this.handleOnChangeImagefile.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.uploadImgFile = this.uploadImgFile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.objId !== this.props.objId) {
      if(nextProps.objId !== '') {
        this.uploadImgFile(nextProps);
      }
    }
  }

  uploadImgFile(nextProps) {
    let imgFile = this.state.imgFile;
    const imgFileUploadErrorMessage = [
      'You are not logged in.',
      'Wrong angkeiteuId',
    ];

    if(imgFile !== '') {
      this.props.imgFileUploadRequest(nextProps.objId, this.props.objKind, imgFile).then(()=> {
        this.props.onUpload(nextProps.objId);
        if(this.props.imgFileUploadStatus.status === 'SUCCESS') {
          //SUCCESS
        } else if(this.props.imgFileUploadStatus.status === 'FAILURE') {
          let $toastContent = $('<span style="color: #FFB4BA">' + this.props.imgFileUploadStatus.error + '</span>');
          Materialize.toast($toastContent, 2000);
        }
      });
    } else {
      this.props.onUpload(nextProps.objId);
    }
  }

  handleOnChangeImagefile(e) {
    let nextState = {};
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      this.setState({'imgFile': file, 'imgUrl': reader.result});
    };
    reader.readAsDataURL(file);
  }

  handleRemoveImage() {
    let nextState = {};
    nextState['imgFile'] = '';
    nextState['imgUrl'] = '';
    this.setState(nextState);
  }

  render() {
    let {imgFile, imgUrl} = this.state;

    return (
      <div>
        <div className='file-field'>
          <div className="waves-effect waves-light btn">
            <i className='large material-icons'>image</i>
            <input name="angkeiteuImg"
                   type="file"
                   onChange={this.handleOnChangeImagefile}
                   accept='.jpg, .jpeg, .png'
                   value=''/>
          </div>
          <div className="file-path-wrapper input-field">
            <input className="validate"
                   type="text"
                   disabled='disabled'
                   value=''/>
            <label htmlFor="disabled">
              {typeof imgFile.name !== 'undefined' ? imgFile.name : 'upload img file (.jpg, .jpeg, .png)'}
            </label>
          </div>
        </div>
        {imgUrl !== '' ? <ImageView src={this.state.imgUrl} width={400} height={400} onRemoveClick={this.handleRemoveImage}/> : undefined}
      </div>
    );
  }
}

ImageUpload.propTpes = {
  objId: PropTypes.string.isRequired,
  objKind: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    imgFileUploadStatus: state.file.upload
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    imgFileUploadRequest: (objId ,objKind, imgFile) => {
      return dispatch(imgFileUploadRequest(objId, objKind, imgFile));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
