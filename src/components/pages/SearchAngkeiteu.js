import React from 'react'
import { SearchBar } from 'components'
import { SearchList } from 'containers'

class SearchAngkeiteu extends React.Component {
  render() {
    return (
      <div className='container searchAngkeiteu'>
        <div className='row'>
          <div className='col s12'>
            <SearchBar/>
          </div>
          <div className='col s12'>
            <SearchList className='col s12 l3'/>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchAngkeiteu
