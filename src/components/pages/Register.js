import React from 'react'
import { RegisterForm } from 'containers'

class Register extends React.Component {
  render() {
    const {history} = this.props
    return (
      <div className='container auth'>
        <div className='card'>
          <div className='header blue white-text center'>
            <div className='card-content'>
              REGISTER
            </div>
          </div>
          <div className='card-content'>
            <RegisterForm history={history}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
