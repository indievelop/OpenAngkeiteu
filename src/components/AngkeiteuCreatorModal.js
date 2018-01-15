import React from 'react';
import { connect } from 'react-redux';
import { AngkeiteuCreator } from 'components';

class AngkeiteuCreatorModal extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.angkeiteuCreatorStatus.status !== this.props.angkeiteuCreatorStatus.status) {
      if(nextProps.angkeiteuCreatorStatus.status === 'COMPLETE') {
        $('#angkeiteuCreatorModal').modal('close');
      }
    }
  }

  render() {
    let {history} = this.props;

    return (
      <div id='angkeiteuCreatorModal' className='modal'>
        <div className='modal-content'>
          <AngkeiteuCreator history={history}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    angkeiteuCreatorStatus: state.angkeiteuCreator
  }
};

export default connect(mapStateToProps)(AngkeiteuCreatorModal);
