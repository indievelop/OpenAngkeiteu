import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        eamail: "",
        password:""
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
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
                    className="validate"/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"/>
                </div>
                <a className="waves-effect waves-light btn">SUBMIT</a>
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

export default Login;
