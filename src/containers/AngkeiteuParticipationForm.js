import React from 'react'
import { connect } from 'react-redux'
import { AngkeiteuParticipationForm } from 'components'
import { angkeiteuGetRequest, angkeiteuParticipateRequest} from 'actions/angkeiteu'
import { init as initAngkeiteuCreator} from 'actions/angkeiteuCreator'

class AngkeiteuParticipationFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOptionId: '',
      triggerOption: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loadAngkeiteu = this.loadAngkeiteu.bind(this)
    this.handleCreateTargetAngkeiteu = this.handleCreateTargetAngkeiteu.bind(this)
  }

  componentDidMount() {
    $(window).scrollTop(0)
    this.loadAngkeiteu(this.props.match.params.id, this.props.authenticateStatus.currentUser)
  }

  componentWillReceiveProps(nextProps) {
    // when change authenticateStatus, reload angkeiteudata .
    if(nextProps.authenticateStatus !== this.props.authenticateStatus)
      this.loadAngkeiteu(this.props.match.params.id,
                          nextProps.authenticateStatus.currentUser)
    // when change params.id, reload angkeiteudata.
    if(nextProps.match.params.id !== this.props.match.params.id)
      this.loadAngkeiteu(nextProps.match.params.id,
                          this.props.authenticateStatus.currentUser)
  }

  loadAngkeiteu(id, currentUser) {
    let accountId = undefined
    let msg = ''

    if(currentUser._id !== '')
      accountId = currentUser._id
    this.props.angkeiteuGetRequest(id, accountId).then(() => {
      if(this.props.angkeiteuGetStaus.status === 'FAILURE') {
        msg = this.props.angkeiteuGetStaus.error
        Materialize.toast($(`<span style="color: #FFB4BA">${msg}</span>`), 2000)
      }
    })
  }

  handleChange(e) {
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleCreateTargetAngkeiteu(triggerOption) {
    this.props.initAngkeiteuCreator(triggerOption)
  }

  handleSubmit() {
    let id = this.props.match.params.id
    let optionId = this.state.selectedOptionId
    let msg = ''
    let nextState = {}

    this.props.angkeiteuParticipateRequest(id, optionId).then(() => {
      if(this.props.participateStatus.status === 'SUCCESS') {
        this.loadAngkeiteu(id, this.props.authenticateStatus.currentUser)
      } else {
        msg = this.props.participateStatus.error.error
        Materialize.toast($(`<span style="color: #FFB4BA">${msg}</span>`), 2000)
      }
    })
  }

  render() {
    const {data} = this.props.angkeiteuGetStaus
    const {selectedOptionId} = this.state
    const {handleChange, handleCreateTargetAngkeiteu, handleSubmit} = this
    return (
      <AngkeiteuParticipationForm {...{data, selectedOptionId,
          handleChange, handleCreateTargetAngkeiteu, handleSubmit}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    angkeiteuGetStaus: state.angkeiteu.get,
    participateStatus: state.angkeiteu.participate,
    authenticateStatus: state.authentication.status,
    angkeiteuCreatorStaus: state.angkeiteuCreator
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuGetRequest: (id, accountId) => {
      return dispatch(angkeiteuGetRequest(id, accountId))
    },
    angkeiteuParticipateRequest: (id, optionId) => {
      return dispatch(angkeiteuParticipateRequest(id, optionId))
    },
    initAngkeiteuCreator: (triggerOption) => {
      return dispatch(initAngkeiteuCreator(triggerOption))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AngkeiteuParticipationFormContainer)
