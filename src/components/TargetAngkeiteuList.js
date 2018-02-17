import React from 'react'
import PropTypes from 'prop-types'
import { List, Angkeiteu, LinkBtn } from 'components'

class TargetAngkeiteuList extends React.Component {
  render() {
    const {selectedOption, data, isLast,
           handleExpandMoreTargetAngkeiteuList} = this.props
    const expandMoreBtn = (
      <div className='center-align'>
        <a className='waves-effect waves-light btn'
           onClick={handleExpandMoreTargetAngkeiteuList}>
          <i className='material-icons'>expand_more</i>
        </a>
      </div>
    )
    return (
      <div>
        <div className='divider'></div>
        <div className='section'>
          <h5>{`${selectedOption.description} of targetAngkeiteu`}</h5>
          <List className='row' data={data}>
            <Angkeiteu className='col s12'>
              <LinkBtn>open</LinkBtn>
            </Angkeiteu>
          </List>
          {isLast ? undefined : expandMoreBtn }
        </div>
      </div>
    )
  }
}

TargetAngkeiteuList.propTypes = {
  selectedOption: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLast: PropTypes.bool.isRequired,
  handleExpandMoreTargetAngkeiteuList: PropTypes.func.isRequired
}

export default TargetAngkeiteuList
