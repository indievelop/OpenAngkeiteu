import React from 'react'
import PropTypes from 'prop-types'
import { Comment, List } from 'components'

class CommentList extends React.Component {
  render() {
    const {commentListStatus, countCommentStatus,
           handleExpandMoreCommentList} = this.props
    const expandMoreBtn = (
      <div className='center-align'>
        <a className='waves-effect waves-light btn'
           onClick={handleExpandMoreCommentList}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    )
    return (
      <div className='row'>
        <div className='col s12'>
          <h5>{`${countCommentStatus.data.count} comments`}</h5>
          <List data={commentListStatus.data}>
            <Comment/>
            <div className='divider'></div>
          </List>
          {commentListStatus.isLast ? undefined : expandMoreBtn}
        </div>
      </div>
    )
  }
}

CommentList.propTypes = {
  commentListStatus: PropTypes.object.isRequired,
  countCommentStatus: PropTypes.object.isRequired,
  handleExpandMoreCommentList: PropTypes.func.isRequired
}

export default CommentList
