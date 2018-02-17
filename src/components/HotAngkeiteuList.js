import React from 'react'
import PropTypes from 'prop-types'
import { Angkeiteu, List, LinkBtn, DropDownBtn } from 'components'

class HotAngkeiteuList extends React.Component {
  render() {
    const {list, handleExpand, selectedPeriod, periodItems, handleChangePeriod} = this.props
    const expandMoreBtn = (
      <div className='center-align'>
        <a className='btn' onClick={handleExpand}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    )
    return (
      <div>
        <h5>hot angkeiteu</h5>
        <DropDownBtn topName={selectedPeriod}
                     items={periodItems}
                     handleClick={handleChangePeriod}/>
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

HotAngkeiteuList.propTypes = {
  list: PropTypes.object.isRequired,
  handleExpand: PropTypes.func.isRequired,
  selectedPeriod: PropTypes.string.isRequired,
  periodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChangePeriod: PropTypes.func.isRequired
}

export default HotAngkeiteuList
