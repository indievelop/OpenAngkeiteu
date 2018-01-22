import React from 'react'
import { connect } from 'react-redux'
import { TriggerAngkeiteuList } from 'components'
import { triggerAngkeiteuListRequest } from 'actions/angkeiteu'

class TriggerAngkeiteuListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      title: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({'data': [], 'title': ''})
    }

    if(nextProps.getStatus.data !== this.props.getStatus.data) {
      const {triggerOptionId} = nextProps.getStatus.data
      if(typeof triggerOptionId !== 'undefined')
        this.props.listRequest(triggerOptionId)
    }

    if(nextProps.listStatus !== this.props.listStatus) {
      const {data} = nextProps.listStatus
      const {title} = this.props.getStatus.data
      this.setState({'data': data, 'title': title})
    }
  }

  render() {
    const {getStatus, listStatus} = this.props
    const {data, title} = this.state
    return (
      data.length != 0 ? <TriggerAngkeiteuList {...{title, data}}/> : null
    )
  }
}

TriggerAngkeiteuListContainer.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    getStatus: state.angkeiteu.get,
    listStatus: state.angkeiteu.triggerList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listRequest: (triggerOptionId) => {
      return dispatch(triggerAngkeiteuListRequest(triggerOptionId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TriggerAngkeiteuListContainer)
