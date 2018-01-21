import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RecentAngkeiteuList } from 'components'
import { angkeiteuListRequest } from 'actions/angkeiteu'

class RecentAngkeiteuListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleExpand = this.handleExpand.bind(this)
  }

  componentDidMount() {
    this.props.angkeiteuListRequest(true)
  }

  handleExpand() {
    let {list, angkeiteuListRequest} = this.props
    angkeiteuListRequest(false, 'old', list.data[list.data.length-1]._id)
  }

  render() {
    const {list, ...props} = this.props
    const {handleExpand} = this
    return (
      <RecentAngkeiteuList {...{ list, handleExpand, ...props}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.angkeiteu.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuListRequest: (isInitial, listType ,id, email) => {
      return dispatch(angkeiteuListRequest(isInitial, listType, id, email))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentAngkeiteuListContainer)
