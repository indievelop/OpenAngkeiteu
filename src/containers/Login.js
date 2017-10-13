import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }

  handleLogin() {
    let id = this.state.email;
    let pw = this.state.password;

    return this.props.loginRequest(id, pw).then(
        () => {
            if(this.props.status === "SUCCESS") {
                // create session data
                let loginData = {
                    isLoggedIn: true,
                    email: id
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                Materialize.toast('Welcome, ' + id + '!', 2000);
                this.props.history.push('/');
                return true;
            } else {
                let $toastContent = $('<span style="color: #FFB4BA">Incorrect email or password</span>');
                Materialize.toast($toastContent, 2000);
                this.setState({password:''});
                return false;
            }
        }
    );
  }

  render() {
    return (
      <div className='container auth'>
        <div className='card'>
          <div className='header blue white-text center'>
            <div className='card-content'>
              LOGIN
            </div>
          </div>
          <div className='card-content'>
            <div className="row">
                <div className="input-field col s12 email">
                    <label>Email</label>
                    <input
                    name="email"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.email}/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}/>
                </div>
                <a className="waves-effect waves-light btn"
                   onClick={this.handleLogin}>SUBMIT</a>
            </div>
          </div>

          <div className='footer'>
            <div className='card-content'>
              <div className='right'>
                New Here? <Link to='/register'>Create an account</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
