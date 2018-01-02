import React from 'react';
import { AngkeiteuExplorer } from 'components';

class AngkeiteuExplorerModal extends React.Component {
  render() {

    return (
      <div id='angkeiteuExplorerModal' className='modal'>
        <div className='modal-content'>
          <AngkeiteuExplorer/>
        </div>
      </div>
    );
  }
}

export default AngkeiteuExplorerModal;
