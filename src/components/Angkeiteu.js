import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

class Angkeiteu extends React.Component {
  constructor(props) {
      super(props);
      this.renderBtnChildren = this.renderBtnChildren.bind(this);
  }

  renderBtnChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        'data': this.props.data
      });
    });
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
          {this.renderBtnChildren()}
        </div>
      </div>
    );
  }
}

export default Angkeiteu;
