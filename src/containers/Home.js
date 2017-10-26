import React from 'react';
import { AngkeiteuList } from 'components';
import {connect} from 'react-redux';
import { angkeiteuListRequest } from 'actions/angkeiteu';


class Home extends React.Component {
  constructor(props) {
      super(props);
      this.handleOpenAngkeiteu = this.handleOpenAngkeiteu.bind(this);
  }

  componentDidMount() {
    this.props.angkeiteuListRequest(true);
  }

  handleOpenAngkeiteu(id) {
    this.props.history.push('/readAngkeiteu/'+id);
  }

  render() {
    return (
      <div className='container home'>
        <div className='row'>
          <div className='col s12'>
            <div className='section'>
              <h5>hot angkeiteu</h5>
                <AngkeiteuList onOpenAngkeiteu={this.handleOpenAngkeiteu}
                               data={this.props.angkeiteuListStatus.data}/>
            </div>
          </div>
          <div className='col s12'>
            <div className='divider'></div>
            <div className='section'>
              <h5>recent angkeiteu</h5>
                <AngkeiteuList data={this.props.angkeiteuListStatus.data}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      angkeiteuListStatus: state.angkeiteu.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      angkeiteuListRequest: (isInitial, id, email) => {
          return dispatch(angkeiteuListRequest(isInitial, id, email));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
