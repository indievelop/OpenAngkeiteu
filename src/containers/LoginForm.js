import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginRequest } from 'actions/authentication'
import { LoginForm } from 'components'

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange(e) {
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleLogin() {
    const {email, password} = this.state
    return this.props.loginRequest(email, password).then(
        () => {
            if(this.props.status === "SUCCESS") {
                // create session data
                let loginData = {
                    isLoggedIn: true,
                    email
                }

                document.cookie = 'key=' + btoa(JSON.stringify(loginData)) + '; Path=/'

                Materialize.toast('Welcome, ' + email + '!', 2000)
                this.props.history.push('/')
                return true
            } else {
                let $toastContent = $('<span style="color: #FFB4BA">Incorrect email or password</span>')
                Materialize.toast($toastContent, 2000)
                this.setState({password: ''})
                return false
            }
        }
    )
  }

  render() {
    const {email, password} = this.state
    const {handleChange, handleLogin} = this
    return (
      <LoginForm {...{email, password, handleChange, handleLogin}}/>
    )
  }
}

LoginFormContainer.propTypes = {
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)
