import React from 'react'
import { ParticipationList } from 'containers'

class ShowParticipationAngkeiteu extends React.Component {
  render() {
    const {match} = this.props
    return (
      <div className='container showParticipationAngkeiteu'>
        <div className='row'>
          <div className='col s12'>
            <ParticipationList className='col s12 l3' {...{match}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowParticipationAngkeiteu
