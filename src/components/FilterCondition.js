import React from 'react';
import PropTypes from 'prop-types';

class FilterCondition extends React.Component {
  render() {
    let {data} = this.props;
    return (
      <div className='row'>
        <div className='col s6'>
          angkeiteu title
        </div>
        <div className='col s6'>
          selected option
        </div>
      </div>
    );
  }
}

export default FilterCondition;
