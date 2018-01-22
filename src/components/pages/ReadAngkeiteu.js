import React from 'react'
import { Card, AngkeiteuComment } from 'components'
import { AngkeiteuParticipationForm, AngkeiteuChart, AngkeiteuChartFilter } from 'containers'

class ReadAngkeiteu extends React.Component {
  render() {
    const {match} = this.props
    return (
      <div className='container readAngkeiteu'>
        <div className='row'>
          <div className='col s12 m8'>
            <AngkeiteuParticipationForm match={match}/>
          </div>
          <div className='col s12 m8'>
            <Card>
              <AngkeiteuChartFilter/>
              <AngkeiteuChart isOnFiltering={true} />
            </Card>
            <AngkeiteuComment angkeiteuId={match.params.id}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ReadAngkeiteu
