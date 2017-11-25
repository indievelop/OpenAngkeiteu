import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

class Angkeiteu extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    const {data} = this.props;

    return (
      <div className='card small'>
        <div className='card-content'>
          <div className='row'>
            <div className='col 12'>
              <div className='card-title'>{data.title}</div>
            </div>
          </div>
        </div>
        <div className='card-content'>
          <div className='row'>
            <div className='col s12'>
              {data.viewCount} views
            </div>
            <div className='col s12'>
              <TimeAgo date={data.createdDate}/>
            </div>
            <div className='col s12'>
              {data.description}
            </div>
          </div>
        </div>
        <div className='card-action'>
          <Link to={`/readAngkeiteu/${data._id}`}>open</Link>
        </div>
      </div>
    );
  }
}

export default Angkeiteu;
