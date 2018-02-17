import React from 'react'
import PropTypes from 'prop-types'
import { AngkeiteuForm, Modal } from 'containers'


class AngkeiteuFormModal extends React.Component {
  render() {
    const name = 'angkeiteuFormModal'
    const {triggerOption, history, match} = this.props
    return (
      <Modal {...{name}}>
        <AngkeiteuForm {...{triggerOption, history, match}}/>
      </Modal>
    )
  }
}

AngkeiteuFormModal.propTypes = {
  triggerOption: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default AngkeiteuFormModal
