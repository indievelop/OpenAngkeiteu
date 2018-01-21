import React from 'react'
import { RecentAngkeiteuList, HotAngkeiteuList } from 'containers'

class Home extends React.Component {
  render() {
    return (
      <div className='container home'>
        <div className='row'>
          <div className='col s12'>
            <HotAngkeiteuList className='col s12 l3'/>
          </div>
        </div>
        <div className='row'>
          <div className='col s12'>
            <div className='divider'></div>
            <RecentAngkeiteuList className='col s12 l3'/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
