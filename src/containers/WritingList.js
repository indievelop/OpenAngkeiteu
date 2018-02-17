import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WritingList } from 'components'
import { writingAngkeiteuListRequest } from 'actions/angkeiteu'

class WritingListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleExpand = this.handleExpand.bind(this)
  }

  componentDidMount() {
    this.props.listRequest(true, this.props.match.params.accountId)
  }

  componentWillReceiveProps(nextProps) {
    //update params.accountId
    if(nextProps.match.params.accountId !== this.props.match.params.accountId)
      this.props.listRequest(true, nextProps.match.params.accountId)
  }

  handleExpand() {
    const {list} = this.props
    this.props.listRequest(false, this.props.match.params.accountId, 'old', list.data[list.data.length-1]._id)
  }

  render() {
    const {list, ...props} = this.props
    const {handleExpand} = this
    return (
      <WritingList {...{list, handleExpand, ...props}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticateStatus: state.authentication.status,
    list: state.angkeiteu.writingList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listRequest: (isInitial, accountId, listType, id) => {
      return dispatch(writingAngkeiteuListRequest(isInitial, accountId, listType, id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WritingListContainer)
