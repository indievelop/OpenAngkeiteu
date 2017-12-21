import React from 'react';
import PropTypes from 'prop-types';
import { CommentForm, CommentList } from 'components';

class AngkeiteuComment extends React.Component {
  render() {
    let {angkeiteuId} = this.props;
    
    return (
      <div className='card'>
        <div className='card-content'>
          <CommentForm angkeiteuId={angkeiteuId}/>
        </div>
        <div className='card-content'>
          <div className='divider'></div>
          <CommentList angkeiteuId={angkeiteuId}/>
        </div>
      </div>
    );
  }
}

export default AngkeiteuComment;
