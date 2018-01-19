import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'components'
import { connect } from 'react-redux'

class ModalContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {name} = this.props
    if(nextProps.modalStatus !== this.props.modalStatus) {
      if(typeof nextProps.modalStatus[name] !== 'undefined') {
          $(`#${name}`).modal(nextProps.modalStatus[name] ? 'open' : 'close')
      }
    }
  }
  render() {
    const {name, children} = this.props
    return (
      <Modal {...{name, children}}/>
    )
  }
}

ModalContainer.propTypes = {
  name: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modal
  }
}

export default connect(mapStateToProps)(ModalContainer)
