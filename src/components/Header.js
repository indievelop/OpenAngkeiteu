import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
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
            <a>
                <i className="material-icons">lock_open</i>
            </a>
        </li>
    );

    return(
      <nav>
        <div className="nav-wrapper green darken-1">
            <Link to='/' className='brand-logo center' >MyAngkeiteu</Link>

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

export default Header;
