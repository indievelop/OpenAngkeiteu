import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { recommendCommentRequest } from 'actions/comment';


class Comment extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        data: props.data
      };
      this.handleRecommendComment = this.handleRecommendComment.bind(this);
  }

  componentDidMount() {
    let nextState = {};
    nextState['data'] = this.props.data;
    this.setState(nextState);
  }

  handleRecommendComment() {
    this.props.recommendCommentRequest(this.props.data._id).then(() => {
      if(this.props.recommendCommentStatus.status === 'SUCCESS') {
        this.setState({data: this.props.recommendCommentStatus.data});
      } else {
        let errorMessage = [
          'You are not logged in.',
          'Wrong Comment id.',
          'Duplicated Recommend.',
        ];
        let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.recommendCommentStatus.error-1] + '</span>');
        Materialize.toast($toastContent, 2000);
      }
    });
  }

  render() {
    const {data} = this.state;

    return (
      <div className='row'>
        <div className='col s12'>
          <a>{data.writer}</a>
          (<TimeAgo date={data.createdDate}/>)
        </div>
        <div className='col s12'>
          {data.content}
        </div>
        <div className='col s10'>
          recommendations: {data.recommendations.length}
        </div>
        <div className='col s2'>
          <a className='waves-effect waves-light btn-floating'
             onClick={this.handleRecommendComment}>
            <i className='material-icons md-dark'>
              thumb_up
            </i>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendCommentStatus: state.comment.recommend
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    recommendCommentRequest: (id) => {
      return dispatch(recommendCommentRequest(id));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
