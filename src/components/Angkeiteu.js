import React from 'react';
import TimeAgo from 'react-timeago';
import {connect} from 'react-redux';
import { angkeiteuGetRequest } from 'actions/angkeiteu';

class Angkeiteu extends React.Component {
  constructor(props) {
      super(props);
      this.handleOpenAngkeiteu = this.handleOpenAngkeiteu.bind(this);
  }

  handleOpenAngkeiteu() {
    this.props.angkeiteuGetRequest(this.props.data).then(()=>{
      if(this.props.status === 'SUCCESS') {
        this.props.onSelectAngkeiteu();
      }
    });
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
            <div className='row'>
              <div className='col s4'>
                {data.viewCount} views
              </div>
              <div className='col s6'>
                <TimeAgo date={data.createdDate}/>
              </div>
            </div>
          </div>
          <div className='card-content'>
            {data.description}
          </div>
          <div className='card-action'>
            <a onClick={this.handleOpenAngkeiteu}>open</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.angkeiteu.get.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        angkeiteuGetRequest: (data) => {
            return dispatch(angkeiteuGetRequest(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Angkeiteu);
