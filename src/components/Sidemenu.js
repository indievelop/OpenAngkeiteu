import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidemenu extends React.Component {

  render() {

    const writeButton = (
        <li>
          <Link to='/writeAngkeiteu'>
                write Angkeiteu
          </Link>
        </li>
    );

    return (
        <ul id='slide-out' className='side-nav'>
          <li><a>search</a></li>
          <li><a>option1</a></li>
          <li><a>option2</a></li>
          {this.props.isLoggedIn ? writeButton : undefined}
        </ul>
    );
  }
}

Sidemenu.PropTypes = {
  isLoggedIn: PropTypes.bool
};

Sidemenu.defaultProps = {
  isLoggedIn: false
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    };
};

export default connect(mapStateToProps)(Sidemenu);
