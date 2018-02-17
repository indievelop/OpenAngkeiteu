import React from 'react'
import PropTypes from 'prop-types'
import { AngkeiteuExplorer, Modal } from 'containers'

class AngkeiteuExplorerModal extends React.Component {
  render() {
    const name = 'angkeiteuExplorerModal'
    return (
      <Modal {...{name}}>
        <AngkeiteuExplorer />
      </Modal>
    )
  }
}

export default AngkeiteuExplorerModal
