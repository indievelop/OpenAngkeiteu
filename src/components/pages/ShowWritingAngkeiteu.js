import React from 'react'
import { WritingList } from 'containers'

class ShowWritingAngkeiteu extends React.Component {
  render() {
    const {match} = this.props
    return (
      <div className='container showWritingAngkeiteu'>
        <div className='row'>
          <div className='col s12'>
            <WritingList className='col s12 l3' {...{match}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowWritingAngkeiteu
