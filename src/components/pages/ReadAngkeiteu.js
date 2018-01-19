import React from 'react';
import { AngkeiteuParticipationForm } from 'containers'

class ReadAngkeiteu extends React.Component {
  render() {
    const {match} = this.props
    return (
      <div className='container readAngkeiteu'>
        <div className='row'>
          <div className='col s12 m8'>
            <AngkeiteuParticipationForm match={match}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ReadAngkeiteu
