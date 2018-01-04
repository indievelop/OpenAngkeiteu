import React from 'react';
import { ImageViewerModal, AngkeiteuExplorerModal, AngkeiteuCreatorModal } from 'components';

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
    let {history} =this.props;
    
    return (
      <div>
        <AngkeiteuCreatorModal history={history}/>
        <AngkeiteuExplorerModal/>
        <ImageViewerModal/>
      </div>
    );
  }
}

export default Modals;
