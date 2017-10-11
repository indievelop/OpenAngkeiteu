import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/register';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleRegister() {
    let id = this.state.email;
    let pw = this.state.password;

    return this.props.registerRequest(id, pw).then(
        () => {
            if(this.props.status === "SUCCESS") {
                Materialize.toast('Success! Please log in.', 2000);
                this.props.history.push('/login');
                return true;
            } else {
                /*
                    ERROR CODES:
                        1: BAD email
                        2: BAD PASSWORD
                        3: email EXISTS
                */
                let errorMessage = [
                    'Invalid email',
                    'Password is too short',
                    'email already exists'
                ];

                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                Materialize.toast($toastContent, 2000);
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
              REGISTER
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
                   onClick={this.handleRegister}>CREATE</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        status: state.register.status,
        errorCode: state.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
