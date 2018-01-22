import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CommentList } from 'components'
import { commentListRequest } from 'actions/comment'

class CommentListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleExpandMoreCommentList = this.handleExpandMoreCommentList.bind(this)
  }

  componentDidMount() {
    if(typeof this.props.angkeiteuId !== 'undefined')
      this.props.commentListRequest(true, this.props.angkeiteuId)
  }

  componentWillReceiveProps(nextProps) {
    if(typeof this.props.angkeiteuId === 'undefined' && typeof nextProps.angkeiteuId !== 'undefined')
      this.props.commentListRequest(true, nextProps.angkeiteuId)
  }

  handleExpandMoreCommentList() {
    let commentList = this.props.commentListStatus.data
    this.props.commentListRequest(false, this.props.angkeiteuId, 'old', commentList[commentList.length-1]._id)
  }

  render() {
    const {commentListStatus, countCommentStatus} = this.props
    const {handleExpandMoreCommentList} = this
    return (
      <CommentList {...{commentListStatus, countCommentStatus,
                        handleExpandMoreCommentList}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    commentListStatus: state.comment.list,
    countCommentStatus: state.comment.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentListRequest: (isInitial, angkeiteuId, listType, id, email) => {
      return dispatch(commentListRequest(isInitial, angkeiteuId, listType, id, email))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)
