import React from 'react'
import PropTypes from 'prop-types'
import { commentPostRequest, commentListRequest } from 'actions/comment'

class CommentForm extends React.Component {
  render() {
    const {content, handleChange, handlePost} = this.props
    return (
      <div className='row'>
        <div className='input-field col s12'>
          <label htmlFor='content'>add comment</label>
          <textarea id='content'
                    name='content'
                    type='text'
                    className='materialize-textarea validate'
                    onChange={handleChange}
                    value={content}>
          </textarea>
        </div>
        <div className='col s2 offset-s10'>
          <a className="waves-effect waves-light btn"
             onClick={handlePost}>
             <i className="material-icons center">comment</i>
          </a>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  content: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePost: PropTypes.func.isRequired
}

export default CommentForm
