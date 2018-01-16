import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HotAngkeiteuList } from 'components'
import { hotAngkeiteuListRequest } from 'actions/angkeiteu'

class HotAngkeiteuListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPeriod: 'today'
    }
    this.handleExpand = this.handleExpand.bind(this)
    this.handleChangePeriod = this.handleChangePeriod.bind(this)
  }

  componentDidMount() {
    this.props.hotAngkeiteuListRequest(true, 'today')
  }

  handleChangePeriod(period) {
    this.props.hotAngkeiteuListRequest(true, period)
    this.setState({'selectedPeriod': period})
  }

  handleExpand() {
    let {list} = this.props
    this.props.hotAngkeiteuListRequest(false, this.state.selectedPeriod, 'old', list.data[list.data.length-1]._id)
  }

  render() {
    let {list, ...props} = this.props
    let {selectedPeriod} = this.state
    let {handleExpand, handleChangePeriod} = this
    return (
      <HotAngkeiteuList {...{ list, selectedPeriod, handleExpand, handleChangePeriod, ...props}}/>
    )
  }
}

HotAngkeiteuListContainer.propTypes = {
  list: PropTypes.object.isRequired,
  periodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
}

HotAngkeiteuListContainer.defaultProps = {
  periodItems: [
    {name: 'today', icon:''},
    {name: 'thisMonth', icon:''}
  ]
}

const mapStateToProps = (state) => {
  return {
    list: state.angkeiteu.hotList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hotAngkeiteuListRequest: (isInitial, period, listType ,id) => {
      return dispatch(hotAngkeiteuListRequest(isInitial, period, listType ,id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotAngkeiteuListContainer)
