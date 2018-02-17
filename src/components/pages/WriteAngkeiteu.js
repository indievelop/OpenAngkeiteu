import React from 'react'
import PropTypes from 'prop-types'
import { AngkeiteuForm } from 'containers'

class WriteAngkeiteu extends React.Component {
  render() {
    const {history, match} = this.props
    return (
      <div className='container writeAngkeiteu'>
        <div className='row'>
          <div className='col s12 m8 offset-m2 '>
            <AngkeiteuForm {...{history, match}}/>
          </div>
        </div>
      </div>
    )
  }
}

WriteAngkeiteu.propTpes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default WriteAngkeiteu
