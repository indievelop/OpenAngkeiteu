import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { angkeiteuPostRequest } from 'actions/angkeiteu';
import { AngkeiteuForm } from 'components'

class WriteAngkeiteu extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: '',
        description: '',
        option_desc: '',
        options: [],
        isCompleted: false,

        forms:[
          {
            parent: '',
            title: '',
            description: '',
            options: []
          }
        ],
        subAngkeiteuTitle: '',
        linkOptionId: {},
        subAngkeiteuParentTitle: {}
      };
      this.handleChange = this.handleChange.bind(this);
      this.handlePost = this.handlePost.bind(this);
      this.handleCreateSubAngkeiteu = this.handleCreateSubAngkeiteu.bind(this);
      this.handleInputSubAngkeiteuTitle = this.handleInputSubAngkeiteuTitle.bind(this);
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  handlePost() {
    /*
    let title = this.state.title;
    let description = this.state.description;
    let options = this.state.options;
    let nextState = {};

    this.props.angkeiteuPostRequest(title, description, options).then(()=>{
      if(this.props.postStatus.status === 'SUCCESS') {
        nextState = update(this.state, {
          isCompleted:{ $set: true}
        });
        this.setState(nextState);
      } else {
        let errorMessage = [
          'You are not logged in.',
          'Please write title.',
          'Please write description',
          'Please add options'
        ];
        $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.postStatus.error-1] + 'Please add options</span>');
          Materialize.toast($toastContent, 2000);
      }
    });
    */
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCreateSubAngkeiteu(data) {
    let nextState = {};
    $('#modal').modal('open');
    console.log(data);
    nextState['subAngkeiteuParentTitle'] = data.title;
    nextState['linkOptionId'] = data.optionId;
    this.setState(nextState);
  }

  handleInputSubAngkeiteuTitle() {
    let nextState = {};
    nextState = update(this.state, {
      forms: {
        $push: [{
          parent: this.state.subAngkeiteuParentTitle,
          title: this.state.subAngkeiteuTitle,
          description: '',
          options: []
        }]
      }
    });
    this.setState(nextState);
  }

  render() {
    const subAngkeiteuTitleInputModal = (
      <div id='modal' className='modal'>
        <div className='modal-content'>
          <h4>create SubAngkeiteu</h4>
          <div className='input-field'>
            <label>SubAngkeiteu Title</label>
            <input name='subAngkeiteuTitle'
                   type='text'
                   onChange={this.handleChange}
                   value={this.state.subAngkeiteuTitle}>
            </input>
          </div>
        </div>
        <div className='modal-footer'>
          <a className='modal-action modal-close waves-effect waves-green btn-flat'
             onClick={this.handleInputSubAngkeiteuTitle}>
            OK
          </a>
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

    const mapToForms = forms => {
      return forms.map((form, i) => {
        return (
          <AngkeiteuForm  key={form.title}
                          parent={form.parent}
                          title={form.title}
                          onCreateSubAngkeiteu={this.handleCreateSubAngkeiteu}
          />
        );
      });
    }

    return (
      <div className='container writeAngkeiteu'>
        {this.state.isCompleted ? completeView : undefined}
        {mapToForms(this.state.forms)}
        {subAngkeiteuTitleInputModal}
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
