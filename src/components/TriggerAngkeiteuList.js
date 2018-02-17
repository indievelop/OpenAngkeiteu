import React from 'react'
import PropTypes from 'prop-types'
import { List, LinkBtn, Angkeiteu } from 'components'

class TriggerAngkeiteuList extends React.Component {
  render() {
    const {title, data} = this.props
    return (
      <div>
        <div className='divider'></div>
        <div className='section'>
          <h5>{`${title} of triggerAngkeiteu`}</h5>
          <List className='row' data={data}>
            <Angkeiteu className='col s12'>
              <LinkBtn>open</LinkBtn>
            </Angkeiteu>
          </List>
        </div>
      </div>
    )
  }
}

TriggerAngkeiteuList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TriggerAngkeiteuList
