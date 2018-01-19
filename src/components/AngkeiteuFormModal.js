import React from 'react'
import PropTypes from 'prop-types'
import { AngkeiteuForm, Modal } from 'containers'

class AngkeiteuFormModal extends React.Component {
  render() {
    const {name, triggerOption, history} = this.props
    return (
      <Modal {...{name}}>
        <AngkeiteuForm {...{triggerOption, history}}/>
      </Modal>
    )
  }
}

AngkeiteuFormModal.propTypes = {
  name: PropTypes.string.isRequired,
  triggerOption: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default AngkeiteuFormModal
