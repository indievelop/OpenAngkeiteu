import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class Comment extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    const {data} = this.props;

    return (
      <div className='row'>
        <div className='col s6'>
          <a>{data.writer}</a>
        </div>
        <div className='col s6'>
          <TimeAgo date={data.createdDate}/>
        </div>
        <div className='col s12'>
          {data.content}
        </div>
      </div>
    );
  }
}

export default Comment;
