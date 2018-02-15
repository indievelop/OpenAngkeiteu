import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ParticipationList } from 'components'
import { participationAngkeiteuListRequest } from 'actions/angkeiteu'

class ParticipationListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleExpandMore = this.handleExpandMore.bind(this)
  }

  componentDidMount() {
    this.props.listRequest(true, this.props.match.params.accountId)
  }

  componentWillReceiveProps(nextProps) {
    //update params.accountId
    if(nextProps.match.params.accountId !== this.props.match.params.accountId)
      this.props.listRequest(true, nextProps.match.params.accountId)
  }

  handleExpandMore() {
    const {list} = this.props
    this.props.listRequest(false, this.props.match.params.accountId, 'old', list.data[list.data.length-1]._id)
  }

  render() {
    const {list, ...props} = this.props
    const {handleExpand} = this
    return (
      <ParticipationList {...{list, handleExpand, ...props}}/>
    )
  }
}

ParticipationList.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    list: state.angkeiteu.participationList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listRequest: (isInitial, accountId, listType, id) => {
      return dispatch(participationAngkeiteuListRequest(isInitial, accountId, listType, id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipationListContainer)
