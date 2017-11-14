import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutRequest } from 'actions/authentication';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutRequest().then(
        () => {
            Materialize.toast('Good Bye!', 2000);

            // EMPTIES THE SESSION
            let loginData = {
                isLoggedIn: false,
                email: ''
            };
            document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        }
    );
  }

  componentDidMount() {
    // Initialize menu button
    $('.menu').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
  }

  render () {
    const loginButton = (
      <Link to='/login'>
        <i className="material-icons">vpn_key</i>
      </Link>
    );

    const logoutButton = (
      <a onClick={this.handleLogout}>
        <i className="material-icons">lock_open</i>
      </a>
    );

    return(
      <div className={!this.props.searchStatus.view.isOpen ? 'navbar-fixed' : ''}>
        <nav>
          <div className="nav-wrapper s12 darken-1">
            <Link to='/' className='brand-logo center' >Open Angkeiteu</Link>
            <ul>
              <li><a><i data-activates='slide-out' className="material-icons menu">menu</i></a></li>
            </ul>
            <div className="right">
              <ul>
                <li>{this.props.isLoggedIn ? logoutButton : loginButton}</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        searchStatus: state.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutRequest: (id, pw) => {
            return dispatch(logoutRequest(id,pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
