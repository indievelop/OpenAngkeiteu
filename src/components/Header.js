import React from 'react';
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
            <li>
                <Link to='/login'>
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

    const logoutButton = (
        <li>
            <a onClick={this.handleLogout}>
                <i className="material-icons">lock_open</i>
            </a>
        </li>
    );

    return(
      <nav>
        <div className="nav-wrapper s12 darken-1">
            <Link to='/' className='brand-logo center' >My Angkeiteu</Link>

            <ul>
                <li><a><i data-activates='slide-out' className="material-icons menu">menu</i></a></li>
            </ul>

            <div className="right">
                <ul>
                  {this.props.isLoggedIn ? logoutButton : loginButton}
                </ul>
            </div>
        </div>
      </nav>
    );
  }
}

Header.PropTypes = {
  isLoggedIn: React.PropTypes.bool,
  onLogout: React.PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => { console.error("logout function not defined");}
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
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
