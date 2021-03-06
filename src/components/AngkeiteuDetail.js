import React from 'react'
import TimeAgo from 'react-timeago'
import { AngkeiteuHeader, ImageView } from 'components'

class AngkeiteuDetail extends React.Component {
  render() {
    const {data, children} = this.props
    const renderChildren = (children) => {
      let optionsElements = null
      let selectBtnElement = null

      React.Children.forEach(this.props.children, child => {
        if(child === null) return
        if(child.type.name === 'List') {
          optionsElements = React.cloneElement(child, {
            'data': this.props.data.options
          })
        } else if(child.type.name === 'SelectBtn') {
          selectBtnElement = React.cloneElement(child)
        }
      })
      return (
        <div>
          <div className='card-content'>
            options
          </div>
          <div className='card-content'>
            {optionsElements}
          </div>
          <div className='card-action'>
            {selectBtnElement}
          </div>
        </div>
      )
    }
    return (
      <div className='card'>
        <AngkeiteuHeader type={typeof data.accountParticipation !== 'undefined' ? 'PARTICIPATED' : 'UNPARTICIPATED'}/>
        <div className='card-content'>
          <div className='card-title'>
            <h3>{data.title}</h3>
          </div>
        </div>
        <div className='card-content'>
          <p>writer: {data.writer}</p>
          <p>{data.viewCount} views</p>
          <TimeAgo date={data.createdDate}/>
        </div>
        <div className='divider'></div>
        <div className='card-content'>
          <h5>description: {data.description}</h5>
        </div>
        <div className='card-content'>
          {typeof data._id !== 'undefined' ? <ImageView objId={data._id} width={400} height={400}/> : undefined}
        </div>
        {renderChildren(children)}
      </div>
    )
  }
}

export default AngkeiteuDetail
