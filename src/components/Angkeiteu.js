import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

class Angkeiteu extends React.Component {
  render() {
    const {children, data, className} = this.props
    const renderBtnChildren = (data) => {
      return React.Children.map(children, child => {
        return React.cloneElement(child, {'data': data})
      })
    }
    return (
      <div {...{className}}>
        <div className='card small'>
          <div className='card-content'>
            <div className='row'>
              <div className='col 12'>
                <div className='card-title'>{data.title}</div>
              </div>
            </div>
          </div>
          <div className='card-content'>
            <div className='row'>
              <div className='col s12'>
                {data.viewCount} views
              </div>
              <div className='col s12'>
                <TimeAgo date={data.createdDate}/>
              </div>
              <div className='col s12'>
                {data.description}
              </div>
            </div>
          </div>
          <div className='card-action'>
            {renderBtnChildren(data)}
          </div>
        </div>
      </div>
    )
  }
}

Angkeiteu.propTypes = {
  data: PropTypes.object
}

export default Angkeiteu
