import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { angkeiteuPostRequest } from 'actions/angkeiteu';
import { imgFileUploadRequest } from 'actions/file';
import { ImageView } from 'components';

class AngkeiteuForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      option_desc: '',
      options: [],
      imgFile: '',
      imgUrl: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.initFormData = this.initFormData.bind(this);
    this.handleOnChangeImagefile = this.handleOnChangeImagefile.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.triggerOption._id !== this.props.triggerOption._id)
      this.initFormData();
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleAddOption() {
    let nextState = {};
    let optionId = this.state.option_desc;
    let optionDesc = this.state.option_desc;
    let duplicatedOption = this.state.options.find((option)=>{
      return option.description === optionDesc;
    });

    if(optionDesc === '')
      return;
    if(typeof duplicatedOption !== 'undefined')
      return;

    nextState = update(this.state, {
        option_desc: { $set: '' },
        options: {
            $push: [{id: optionId, description: optionDesc}]
        }
    });
    this.setState(nextState);
  }

  handleRemoveOption(optionId) {
    let nextState = {};
    let optionIdx = this.state.options.findIndex((option)=>{
      return option.id === optionId;
    });

    nextState = update(this.state, {
        options: {
          $splice: [[optionIdx, 1]]
        }
    });
    this.setState(nextState);
  }

  initFormData() {
    let nextState = {};
    nextState['title'] = '';
    nextState['description'] = '';
    nextState['option_desc'] = '';
    nextState['options'] = [];
    nextState['imgFile'] = '';
    nextState['imgUrl'] = '';
    this.setState(nextState);
  }

  handlePost() {
    let title = this.state.title;
    let description = this.state.description;
    let options = this.state.options;
    let triggerOptionId = this.props.triggerOption._id;
    let imgFile = this.state.imgFile;
    const angkeiteuPostErrorMessage = [
      'You are not logged in.',
      'Please write title.',
      'Please write description.',
      'Please add option.',
      'Wrong triggerOption id.'
    ];
    const imgFileUploadErrorMessage = [
      'You are not logged in.',
      'Wrong angkeiteuId',
    ];

    //let parentId = '';
    this.props.angkeiteuPostRequest(title, description, options, triggerOptionId).then(() => {
      if(this.props.postStatus.status === 'SUCCESS') {
        //imgFlile upload
        if(imgFile !== '') {
          this.props.imgFileUploadRequest(this.props.postStatus.id, 'angkeiteu', imgFile).then(() => {
            if(this.props.imgFileUploadStatus.status === 'FAILURE') {
              let $toastContent = $('<span style="color: #FFB4BA">' + this.props.imgFileUploadStatus.error + '</span>');
              Materialize.toast($toastContent, 2000);
            }
          });
        }
        this.initFormData();
        this.props.onCompleteCreate(this.props.postStatus.id);
      } else {
        let $toastContent = $('<span style="color: #FFB4BA">' + angkeiteuPostErrorMessage[this.props.postStatus.error-1] + '</span>');
        Materialize.toast($toastContent, 2000);
      }
    });
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
    const mapToOptions = options => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option.id}>
            <div className='col s8'>
              <input name='optionGroup'
                     type='radio'
                     disabled='disabled'/>
              <label>{option.description}</label>
            </div>
            <div className='col s2'>
              <a className="waves-effect waves-light btn"
                 onClick={() => this.handleRemoveOption(option.id)}>
                <i className="material-icons center">close</i>
              </a>
            </div>
            <div className='col s2'>
              <a className="waves-effect waves-light btn"
                 onClick={() => this.handleRemoveOption(option.id)}>
                <i className="material-icons center">close</i>
              </a>
            </div>
          </div>
        );
      });
    }

    return (
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <div className='header blue white-text center'>
              <div className='card-content'>
                {this.props.mode === 'RootAngkeiteu' ?
                  this.props.mode : this.props.triggerOption.description +" of "+ this.props.mode}
              </div>
            </div>
            <div className='card-content'>
              <div className='row'>
                <div className='input-field col s6'>
                  <label>Title</label>
                  <input name='title'
                         type='text'
                         className='validate'
                         onChange={this.handleChange}
                         value={this.state.title}>
                  </input>
                </div>
                <div className='input-field col s12'>
                  <label htmlFor="textarea1">Description</label>
                  <textarea id="textarea1"
                            name='description'
                            className="materialize-textarea validate"
                            onChange={this.handleChange}
                            value={this.state.description}>
                  </textarea>
                </div>
                <div className='file-field input-field col s12'>
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
                      {typeof this.state.imgFile.name !== 'undefined' ? this.state.imgFile.name : 'upload img file (.jpg, .jpeg, .png)'}
                    </label>
                  </div>
                </div>
                <div className='input-field col s12'>
                  {this.state.imgUrl !=='' ? <ImageView src={this.state.imgUrl} width={400} height={400} onRemoveClick={this.handleRemoveImage}/> : undefined}
                </div>
              </div>
            </div>
            <div className='card-content'>
              options
            </div>
            <div className='card-content'>
              {mapToOptions(this.state.options)}
            </div>
            <div className='card-content'>
               <div className="row">
                   <div className="input-field col s6">
                      <label>New option</label>
                       <input name="option_desc"
                              type="text"
                              className="validate"
                              onChange={this.handleChange}
                              value={this.state.option_desc}>
                       </input>
                   </div>
                   <div className="input-field col s6">
                       <a className="btn waves-effect waves-light"
                          onClick={this.handleAddOption}>
                          <i className="material-icons center">add</i>
                       </a>
                   </div>
               </div>
            </div>
            <div className='card-content'>
              <div className='row'>
                <a className='btn-large waves-effect waves-light col s6 offset-s3'
                    onClick={this.handlePost}>
                  <i className="material-icons center">create</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AngkeiteuForm.propTpes = {
  mode: PropTypes.string,
  triggerOption: PropTypes.object
}

AngkeiteuForm.defaultProps = {
  mode: '',
  triggerOption: {
    _id: ''
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.angkeiteu.post,
    imgFileUploadStatus: state.file.upload
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuPostRequest: (title, description, options, triggerOptionId) => {
      return dispatch(angkeiteuPostRequest(title, description, options, triggerOptionId));
    },
    imgFileUploadRequest: (objId ,objKind, imgFile) => {
      return dispatch(imgFileUploadRequest(objId, objKind, imgFile));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AngkeiteuForm);
