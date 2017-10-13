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
                <li><a><i className="material-icons">search</i></a></li>
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
