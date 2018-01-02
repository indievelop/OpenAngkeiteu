import React from 'react';
import { ImageViewerModal, AngkeiteuExplorerModal } from 'components';

class Modals extends React.Component {

  componentDidMount() {
    //modal Initialization.
    $(document).ready(() => {
      $('.modal').modal({
        ready: (modal, trigger) => { modal.scrollTop(0); }
      });
    });
  }

  render() {
    return (
      <div>
        <AngkeiteuExplorerModal/>
        <ImageViewerModal/>
      </div>
    );
  }
}

export default Modals;
