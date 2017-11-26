import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment } from 'components';
import { commentListRequest } from 'actions/comment';

class CommentList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(typeof this.props.angkeiteuId === 'undefined' && typeof nextProps.angkeiteuId !== 'undefined')
        this.props.commentListRequest(true, nextProps.angkeiteuId).then(() => {
          console.log(this.props.commentListStatus.data);
        });
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
    return (
      <div>
        {mapToComponets(this.props.commentListStatus.data)}
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
