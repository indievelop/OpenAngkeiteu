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
    this.uplaodImgfile = this.uplaodImgfile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.objId !== this.props.objId && nextProps.objId !== '') {
      this.uplaodImgfile(nextProps);
    }
  }

  uplaodImgfile(nextProps) {
    let imgFile = this.state.imgFile;
    const imgFileUploadErrorMessage = [
      'You are not logged in.',
      'Wrong angkeiteuId',
    ];

    if(imgFile !== '') {
      this.props.imgFileUploadRequest(nextProps.objId, this.props.objKind, imgFile).then(()=> {
        if(this.props.imgFileUploadStatus.status === 'FAILURE') {
          let $toastContent = $('<span style="color: #FFB4BA">' + this.props.imgFileUploadStatus.error + '</span>');
          Materialize.toast($toastContent, 2000);
        }
      });
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
                   disabled='disabled'
                   value=''
                   id="disabled"
                   type="text" />
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
  objId: PropTypes.string,
  objKind: PropTypes.string,
}

ImageUpload.defaultProps = {
  objId: '',
  objKind: ''
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
