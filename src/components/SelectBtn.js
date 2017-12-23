import React from 'react';
import PropTypes from 'prop-types';

class SelectBtn extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onSelect(this.props.data);
  }

  render() {

    return (
      <a onClick={this.handleOnClick}>
        {this.props.children}
      </a>
    );
  }
}

export default SelectBtn;
