import React from 'react'
import PropTypes from 'prop-types'

class List extends React.Component {
  render() {
    const {data, children} = this.props
    const renderChildren = (item) => {
      return React.Children.map(children, child => {
        return React.cloneElement(child, {'data': item})
      })
    }
    const mapToComponets = list => {
      return list.map((item, i) => {
        return (
          <div key={item._id}>
            {renderChildren(item)}
          </div>
        )
      })
    }
    return (
      <div className={this.props.className || ''}>
        {mapToComponets(data)}
      </div>
    )
  }
}

List.propTypes = {
  data: PropTypes.array
}

List.defaultProps = {
  data: []
}

export default List
