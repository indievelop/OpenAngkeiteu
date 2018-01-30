import React from 'react'
import { AngkeiteuFormModal, AngkeiteuExplorerModal,
         ImageViewerModal } from 'containers'

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
    const {history, match} =this.props
    return (
      <div>
        <AngkeiteuFormModal {...{history, match}} />
        <AngkeiteuExplorerModal />
        <ImageViewerModal />
      </div>
    )
  }
}

export default Modals
