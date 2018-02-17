import React from 'react'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  render() {
    const {email, password, handleChange, handleLogin} = this.props
    return (
      <div className="row">
          <div className="input-field col s12">
              <label>Email</label>
              <input
              name="email"
              type="text"
              className="validate"
              onChange={handleChange}
              value={email}/>
          </div>
          <div className="input-field col s12">
              <label>Password</label>
              <input
              name="password"
              type="password"
              className="validate"
              onChange={handleChange}
              value={password}/>
          </div>
          <a className="waves-effect waves-light btn"
             onClick={handleLogin}>SUBMIT</a>
      </div>
    )
  }
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
