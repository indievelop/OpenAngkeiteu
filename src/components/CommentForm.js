import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentPostRequest, commentListRequest } from 'actions/comment';

class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.initFormData = this.initFormData.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  initFormData() {
    let nextState = {};
    nextState['content'] = '';
    this.setState(nextState);
  }

  handlePost() {
    this.props.commentPostRequest(this.props.angkeiteuId, this.state.content).then(() => {
      if(this.props.commentPostStatus.status === 'SUCCESS') {
        this.initFormData();
        this.props.commentListRequest(true, this.props.angkeiteuId);
      } else {
        let errorMessage = [
          'You are not logged in.',
          'Wrong Angkeiteu id.',
          'Please write content.',
        ];
        let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.commentPostStatus.error-1] + '</span>');
        Materialize.toast($toastContent, 2000);
      }
    });
  }

  render() {
    return (
      <div className='row'>
        <div className='input-field col s12'>
          <label htmlFor='content'>add comment</label>
          <textarea id='content'
                    name='content'
                    type='text'
                    className='materialize-textarea validate'
                    onChange={this.handleChange}
                    value={this.state.content}>
          </textarea>
        </div>
        <div className='col s2 offset-s10'>
          <a className="waves-effect waves-light btn"
             onClick={this.handlePost}>
             <i className="material-icons center">comment</i>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticateStatus: state.authentication.status,
    commentPostStatus: state.comment.post
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentPostRequest: (angkeiteuId, content) => {
      return dispatch(commentPostRequest(angkeiteuId, content));
    },
    commentListRequest: (isInitial, angkeiteuId, listType, id, email) => {
      return dispatch(commentListRequest(isInitial, angkeiteuId, listType, id, email));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
