import React from 'react';
import TimeAgo from 'react-timeago';

class Angkeiteu extends React.Component {
  constructor(props) {
      super(props);
      this.handleOpenAngkeiteu = this.handleOpenAngkeiteu.bind(this);
  }

  handleOpenAngkeiteu() {
    this.props.onOpenAngkeiteu(this.props.data._id);
  }

  render() {
    const {data} = this.props;

    return (
      <div className='col s12 l3'>
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
            <a onClick={this.handleOpenAngkeiteu}>open</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Angkeiteu;
