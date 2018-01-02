import React from 'react';
import PropTypes from 'prop-types';

class FilterCondition extends React.Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if(child.type.name ==='SelectBtn')
        return React.cloneElement(child, {
          'data': this.props.data
        });
      else
        return undefined;
    });
  }
  
  render() {
    let {data} = this.props;
    return (
      <div className='row'>
        <div className='col s5'>
          {data.angkeiteu.title}
        </div>
        <div className='col s5'>
          {data.option.description}
        </div>
        <div className='col s2'>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}

export default FilterCondition;
