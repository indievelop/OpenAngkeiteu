import React from 'react'
import PropTypes from 'prop-types'
import { CommentForm } from 'components'
import { connect } from 'react-redux'
import { commentPostRequest, commentListRequest } from 'actions/comment'

class CommentFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.initFormData = this.initFormData.bind(this)
  }

  handleChange(e) {
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  initFormData() {
    let nextState = {}
    nextState['content'] = ''
    this.setState(nextState)
  }

  handlePost() {
    this.props.commentPostRequest(this.props.angkeiteuId, this.state.content).then(() => {
      if(this.props.commentPostStatus.status === 'SUCCESS') {
        this.initFormData()
        this.props.commentListRequest(true, this.props.angkeiteuId)
      } else {
        let errorMessage = [
          'You are not logged in.',
          'Wrong Angkeiteu id.',
          'Please write content.',
        ]
        let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.commentPostStatus.error-1] + '</span>')
        Materialize.toast($toastContent, 2000)
      }
    })
  }

  render() {
    const {content} = this.state
    const {handleChange, handlePost} = this
    return (
      <CommentForm {...{content, handleChange, handlePost}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticateStatus: state.authentication.status,
    commentPostStatus: state.comment.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentPostRequest: (angkeiteuId, content) => {
      return dispatch(commentPostRequest(angkeiteuId, content))
    },
    commentListRequest: (isInitial, angkeiteuId, listType, id, email) => {
      return dispatch(commentListRequest(isInitial, angkeiteuId, listType, id, email))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormContainer)
