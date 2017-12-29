import React from 'react';
import PropTypes from 'prop-types';

class SelectBtn extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSelect(this.props.data);
  }

  render() {
    return (
      <a className='btn'
         onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export default SelectBtn;
