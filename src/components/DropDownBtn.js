import React from 'react'
import PropTypes from 'prop-types'

class DropDownBtn extends React.Component {
  componentDidMount() {
      $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    })
  }

  render() {
    const {topName, items, handleClick} = this.props
    const Item = ({name, icon}) => {
      return (
        <li>
          <a name={name} onClickCapture={(e) => {handleClick(name); e.stopPropagation();}} >
            <div className='row'>
              <div className='col s6'>
                {name}
              </div>
              <div className='col s6'>
                <i className='material-icons right'>{icon}</i>
              </div>
            </div>
          </a>
        </li>
      )
    }
    return (
      <div>
        <a className='dropdown-button btn' data-activates='dropdown'>
          {topName}
          <i className='material-icons right'>arrow_drop_down</i>
        </a>

        <ul id='dropdown' className='dropdown-content'>
          {items.map(item => <Item key={item.name} {...item} />)}
        </ul>
      </div>
    )
  }
}

DropDownBtn.propTypes = {
  topName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default DropDownBtn
