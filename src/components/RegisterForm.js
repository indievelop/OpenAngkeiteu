import React from 'react'
import PropTypes from 'prop-types'

class RegisterForm extends React.Component {
  render() {
    const {email, password, confirmPassword, handleChange, handleRegister} = this.props
    return (
      <div className="row">
          <div className="input-field col s12 email">
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
          <div className="input-field col s12">
              <label>Confirm Password</label>
              <input
              name="confirmPassword"
              type="password"
              className="validate"
              onChange={handleChange}
              value={confirmPassword}/>
          </div>
          <a className="waves-effect waves-light btn"
             onClick={handleRegister}>CREATE</a>
      </div>
    )
  }
}

RegisterForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired
}

export default RegisterForm
