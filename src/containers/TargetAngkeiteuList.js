import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TargetAngkeiteuList } from 'components'
import { targetAngkeiteuListRequest } from 'actions/angkeiteu'

class TargetAngkeiteuListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: {},
      data: [],
      isLast: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({'selectedOption':{}, 'data': [], 'title': ''})
    }

    if(nextProps.getStatus.data !== this.props.getStatus.data) {
      const {accountParticipation} = nextProps.getStatus.data
      if(typeof accountParticipation !== 'undefined') {
        const {selectedOptionId} = accountParticipation
        const selectedOption = nextProps.getStatus.data.options.find((option) => {
          return option._id === selectedOptionId
        })
        this.setState({'selectedOption': selectedOption})
        this.props.listRequest(true, selectedOptionId)
      }
    }

    if(nextProps.listStatus !== this.props.listStatus) {
      const {data, isLast} = nextProps.listStatus
      this.setState({'data': data, 'isLast': isLast})
    }
  }

  render() {
    const {selectedOption, data, isLast} = this.state
    const handleExpandMoreTargetAngkeiteuList = () => {
      const {accountParticipation} = this.props.getStatus.data
      const {data} = this.props.listStatus
      if(typeof accountParticipation !== 'undefined') {
        this.props.listRequest(false, accountParticipation.selectedOptionId,
                                              'old', data[data.length-1]._id)
      }
    }
    return (
      data.length != 0 ?
      <TargetAngkeiteuList {...{selectedOption, data, isLast,
          handleExpandMoreTargetAngkeiteuList}}/> : null
    )
  }
}

TargetAngkeiteuListContainer.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    getStatus: state.angkeiteu.get,
    listStatus: state.angkeiteu.targetList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listRequest: (isInitial, triggerOptionId, listType, id) => {
      return dispatch(targetAngkeiteuListRequest(isInitial, triggerOptionId, listType, id))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(TargetAngkeiteuListContainer)
