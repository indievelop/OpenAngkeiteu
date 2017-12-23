import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LinkBtn extends React.Component {

  render() {
    let {data} = this.props;
    
    return (
      <Link to={`/readAngkeiteu/${data._id}`}>
        {this.props.children}
      </Link>
    );
  }
}

export default LinkBtn;
