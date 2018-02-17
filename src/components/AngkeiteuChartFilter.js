import React from 'react'
import PropTypes from 'prop-types'
import { List, FilterCondition } from 'components'

class AngkeiteuChartFilter extends React.Component {
  render() {
    const {conditions, handleOnAngkeiteuExplorer} = this.props
    return (
      <div className='row'>
        <div className='col s12'>
          filtering conditions
          <List className='row'data={conditions}>
            <FilterCondition className='col s12'/>
          </List>
        </div>
        <div className="input-field col s6">
         <label>New filterCondition</label>
          <input name="option_desc"
                 type="text"
                 disabled='true'>
          </input>
        </div>
        <div className="input-field col s6">
          <a className="btn waves-effect waves-light"
             onClick={handleOnAngkeiteuExplorer}>
             <i className="material-icons center">add</i>
          </a>
        </div>
      </div>
    )
  }
}

AngkeiteuChartFilter.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnAngkeiteuExplorer: PropTypes.func.isRequired
}

export default AngkeiteuChartFilter
