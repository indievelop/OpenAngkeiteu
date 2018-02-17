import React from 'react'
import PropTypes from 'prop-types'
import { Angkeiteu, List, LinkBtn } from 'components'

class WritingList extends React.Component {
  render() {
    const {list, handleExpand, match} = this.props
    const expandMoreBtn = (
      <div className='center-align'>
        <a className='waves-effect waves-light btn'
           onClick={handleExpand}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    )
    return (
      <div>
        <h5>{this.props.match.params.accountId} of writing angkeiteu</h5>
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

WritingList.propTypes = {
  list: PropTypes.object.isRequired,
  handleExpand: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default WritingList
