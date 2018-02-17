import React from 'react'
import PropTypes from 'prop-types'
import {List, Angkeiteu, LinkBtn } from 'components'

class SearchList extends React.Component {
  render() {
    const {result} = this.props
    return (
      <div>
        <h5>search result</h5>
        <List data={result.data}>
          <Angkeiteu>
            <LinkBtn>open</LinkBtn>
          </Angkeiteu>
        </List>
      </div>
    )
  }
}

SearchList.propTypes = {
  result: PropTypes.object.isRequired
}

export default SearchList
