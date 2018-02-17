import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from 'containers'

class Login extends React.Component {
  render() {
    const {history} = this.props
    return (
      <div className='container auth'>
        <div className='card'>
          <div className='header blue white-text center'>
            <div className='card-content'>
              LOGIN
            </div>
          </div>
          <div className='card-content'>
            <LoginForm history={history}/>
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
    )
  }
}

export default Login
