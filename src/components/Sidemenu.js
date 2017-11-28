import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openSearchView } from 'actions/search';

class Sidemenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const searchButton = (
      <a onClick={this.props.openSearchView}>
        <i className='material-icons'>search</i>
        search
      </a>
    );

    const writeButton = (
      <Link to='/writeAngkeiteu'>
        <i className='material-icons'>create</i>
            write Angkeiteu
      </Link>
    );

    const myAngkeiteuButton = (
      <Link to={`/showWritingAngkeiteu/${this.props.authenticateStatus.currentUser.email}`}>
        <i className='material-icons'>account_box</i>
            my writing Angkeiteu
      </Link>
    );

    return (
      <div>
        <ul id='slide-out' className='side-nav'>
          <li>{searchButton}</li>
          <li>{writeButton}</li>
          <li>{this.props.authenticateStatus.isLoggedIn ? myAngkeiteuButton : undefined}</li>
          <li><a>option2</a></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      authenticateStatus: state.authentication.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSearchView: () => {
      return dispatch(openSearchView());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu);
