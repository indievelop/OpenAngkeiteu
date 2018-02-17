import React from 'react'
import { connect } from 'react-redux'
import { angkeiteuSearchRequest } from 'actions/search'
import { SearchList } from 'components'

class SearchListContainer extends React.Component {
  render() {
    const {result} = this.props.searchStatus
    return (
      <SearchList {...{result}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      searchStatus: state.search
  }
}

export default connect(mapStateToProps)(SearchListContainer)
