import React from 'react'
import PropTypes from 'prop-types'

class Modal extends React.Component {
  render() {
    const {name, children} = this.props
    return (
      <div id={name} className='modal'>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Modal
