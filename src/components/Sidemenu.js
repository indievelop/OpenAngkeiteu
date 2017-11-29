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

    const myWritingAngkeiteuButton = (
      <Link to={`/showWritingAngkeiteu/${this.props.authenticateStatus.currentUser.email}`}>
        <i className='material-icons'>account_box</i>
            my writing Angkeiteu
      </Link>
    );

    const myParticipationAngkeiteuButton = (
      <Link to={`/showParticipationAngkeiteu/${this.props.authenticateStatus.currentUser._id}`}>
        <i className='material-icons'>account_box</i>
            my participation Angkeiteu
      </Link>
    );

    return (
      <div>
        <ul id='slide-out' className='side-nav'>
          <li>{searchButton}</li>
          <li>{writeButton}</li>
          <li>{this.props.authenticateStatus.isLoggedIn ? myWritingAngkeiteuButton : undefined}</li>
          <li>{this.props.authenticateStatus.isLoggedIn ? myParticipationAngkeiteuButton : undefined}</li>
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
