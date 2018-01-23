import React from 'react'
import { ImageViewerModal } from 'components'
import { AngkeiteuFormModal, AngkeiteuExplorerModal } from 'containers'

class Modals extends React.Component {
  componentDidMount() {
    //modal Initialization.
    $(document).ready(() => {
      $('.modal').modal({
        ready: (modal, trigger) => { modal.scrollTop(0); }
      })
    })
  }

  render() {
    const {history} =this.props
    return (
      <div>
        <AngkeiteuFormModal {...{history}} />
        <AngkeiteuExplorerModal />
        <ImageViewerModal />
      </div>
    )
  }
}

export default Modals
