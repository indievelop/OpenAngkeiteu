import React from 'react'
import PropTypes from 'prop-types'
import { RegisterForm } from 'components'
import { connect } from 'react-redux'
import { registerRequest } from 'actions/authentication'

class RegisterFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(e) {
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleRegister() {
    let id = this.state.email
    let pw = this.state.password
    let confirm_pw = this.state.confirmPassword

    if(pw !== confirm_pw) {
      this.setState({confirmPassword:''})
      Materialize.toast('Confirm your password.', 2000)
      return false
    }

    return this.props.registerRequest(id, pw).then(
        () => {
            if(this.props.status === "SUCCESS") {
                Materialize.toast('Success! Please log in.', 2000)
                this.props.history.push('/login')
                return true
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
                ]

                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>')
                Materialize.toast($toastContent, 2000)
                return false
            }
        }
    )
  }

  render() {
    const {email, password, confirmPassword} = this.state
    const {handleChange, handleRegister} = this
    return (
      <RegisterForm {...{email, password, confirmPassword, handleChange, handleRegister}}/>
    )
  }
}

RegisterFormContainer.propTypes = {
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormContainer)
