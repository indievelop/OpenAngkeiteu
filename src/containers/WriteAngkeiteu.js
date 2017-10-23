import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { angkeiteuPostRequest } from 'actions/angkeiteu';

class WriteAngkeiteu extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: '',
        description: '',
        option_desc: '',
        options:[],
        isCompleted: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleRemoveOption = this.handleRemoveOption.bind(this);
      this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    console.log(this.props.postStatus)
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
            $push: [{id:optionId, description: optionDesc}]
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

  handlePost() {
    let title = this.state.title;
    let description = this.state.description;
    let options = this.state.options;
    let nextState = {};

    this.props.angkeiteuPostRequest(title, description, options).then(()=>{
      //console.log(this.props.postStatus);
      if(this.props.postStatus.status === 'SUCCESS') {
        nextState = update(this.state, {
          isCompleted:{ $set: true}
        });
        this.setState(nextState);
      } else {
        let $toastContent;
        switch(this.props.postStatus.error) {
          case 1:
            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
            Materialize.toast($toastContent, 2000);
            setTimeout(()=> {location.reload(false);}, 2000);
            break;

          case 2:
            $toastContent = $('<span style="color: #FFB4BA">Please write title</span>');
            Materialize.toast($toastContent, 2000);
            break;

          case 3:
            $toastContent = $('<span style="color: #FFB4BA">Please write description</span>');
            Materialize.toast($toastContent, 2000);
            break;

          case 4:
            $toastContent = $('<span style="color: #FFB4BA">Please add options</span>');
            Materialize.toast($toastContent, 2000);
            break;

        }
      }

    });

  }

  render() {

    const mapToOptions = options => {
      return options.map((option, i) => {
        return (
          <div className='row'
               key={option.id}>
            <div className='col s10'>
              <input name='optionGroup'
                     type='radio'
                     disabled='disabled'/>
              <label htmlFor='test1'>{option.description}</label>
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

    const writeView = (
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <div className='header blue white-text center'>
              <div className='card-content'>
                NEW ANGKEITEU
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
                            value={this.state.description}
                            >
                  </textarea>
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
                <div className='center-align'>
                  <a className='btn-large waves-effect waves-light col s6 offset-s3'
                      onClick={this.handlePost}>
                    <i className="material-icons center">create</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const completeView = (
        <div className='row'>
          <div className='col s12'>
            <div className='card'>
              <div className='card-content'>
                <div className='card-title'>
                  <h3>{this.state.title}</h3>
                  <div className='divider'></div>
                </div>
              </div>
              <div className='card-content'>
                <h5>angkeiteu is successfully created.</h5>
              </div>
            </div>
          </div>
        </div>
    );

    return (
      <div className='container writeAngkeiteu'>
        {this.state.isCompleted ? completeView : writeView}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.angkeiteu.post
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuPostRequest: (title, description, options) => {
      return dispatch(angkeiteuPostRequest(title, description, options));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteAngkeiteu);
