import React from 'react'
import { connect } from 'react-redux'
import { AngkeiteuExplorerModal } from 'components'
import { showModal, hideModal} from 'actions/modal'

class AngkeiteuExplorerModalContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.explorer !== this.props.explorer) {
      if(nextProps.explorer.status === 'INIT')
        this.props.showModal('angkeiteuExplorerModal')
      else if(nextProps.explorer.status === 'COMPLETE')
        this.props.hideModal('angkeiteuExplorerModal')
    }
  }

  render() {
    return (
      <AngkeiteuExplorerModal />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    explorer: state.angkeiteuExplorer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (name) => {
      return dispatch(showModal(name))
    },
    hideModal: (name) => {
      return dispatch(hideModal(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AngkeiteuExplorerModalContainer)
