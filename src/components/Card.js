import React from 'react'

class Card extends React.Component {
  render() {
    const {children, ...props} = this.props
    const renderCardContent = (children) => {
      return React.Children.map(children, (child) => {
        return (
          <div className='card-content'>
            {child}
          </div>
        )
      })
    }
    return (
      <div className='card'>
        {renderCardContent(children)}
      </div>
    )
  }
}

export default Card
