import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment } from 'components';
import { commentListRequest } from 'actions/comment';

class CommentList extends React.Component {

  constructor(props) {
    super(props);
    this.handleExpandMoreCommentList = this.handleExpandMoreCommentList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(typeof this.props.angkeiteuId === 'undefined' && typeof nextProps.angkeiteuId !== 'undefined')
        this.props.commentListRequest(true, nextProps.angkeiteuId);
  }

  handleExpandMoreCommentList() {
    let commentList = this.props.commentListStatus.data;
    this.props.commentListRequest(false, this.props.angkeiteuId, 'old', commentList[commentList.length-1]._id);
  }

  render() {
    const mapToComponets = commentList => {
      return commentList.map((comment, i) => {
        return(
          <div key={comment._id}>
            <Comment data={comment}/>
            <div className='divider'></div>
          </div>
        )
      })
    }

    const expandMoreBtn = (
      <div className='center-align'>
        <a className='waves-effect waves-light btn'
           onClick={this.handleExpandMoreCommentList}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    );

    return (
      <div>
        {mapToComponets(this.props.commentListStatus.data)}
        {this.props.commentListStatus.isLast ? undefined : expandMoreBtn}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    commentListStatus: state.comment.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentListRequest: (isInitial, angkeiteuId, listType, id, email) => {
      return dispatch(commentListRequest(isInitial, angkeiteuId, listType, id, email));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
