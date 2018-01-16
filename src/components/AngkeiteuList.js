import React from 'react'
import PropTypes from 'prop-types'
import { Angkeiteu, List, LinkBtn } from 'components'

class AngkeiteuList extends React.Component {
  render() {
    const {list, handleExpand} = this.props
    const expandMoreBtn = (
      <div className='center-align'>
        <a className='btn' onClick={handleExpand}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    )
    return (
      <div>
        <h5>recent angkeiteu</h5>
        <List className='row' data={list.data}>
          <Angkeiteu className={this.props.className || ''}>
            <LinkBtn>open</LinkBtn>
          </Angkeiteu>
        </List>
        {list.isLast ? undefined : expandMoreBtn}
      </div>
    )
  }
}

AngkeiteuList.propTypes = {
  list: PropTypes.object.isRequired,
  handleExpand: PropTypes.func.isRequired
}

export default AngkeiteuList
