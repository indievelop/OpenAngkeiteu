import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AngkeiteuFormModal } from 'components'
import { complete } from 'actions/angkeiteuCreator'
import { showModal, hideModal} from 'actions/modal'

class AngkeiteuFormModalContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.angkeiteuCreatorStatus !== this.props.angkeiteuCreatorStatus) {
      if(nextProps.angkeiteuCreatorStatus.status === 'INIT')
        this.props.showModal('angkeiteuFormModal')
    }

    if(nextProps.angkeiteuPostStatus !== this.props.angkeiteuPostStatus) {
      if(nextProps.angkeiteuPostStatus.status === 'SUCCESS')
         this.props.hideModal('angkeiteuFormModal')
    }
  }

  render() {
    const {triggerOption} = this.props.angkeiteuCreatorStatus
    const {history} = this.props
    return (
      <AngkeiteuFormModal {...{triggerOption, history}}/>
    )
  }
}

AngkeiteuFormModal.propTypes = {
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    angkeiteuPostStatus: state.angkeiteu.post,
    angkeiteuCreatorStatus: state.angkeiteuCreator
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    complete: () => {
      return dispatch(complete())
    },
    showModal: (name) => {
      return dispatch(showModal(name))
    },
    hideModal: (name) => {
      return dispatch(hideModal(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AngkeiteuFormModalContainer)
