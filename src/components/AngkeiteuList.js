import React from 'react';
import PropTypes from 'prop-types';
import { Angkeiteu, List, LinkBtn } from 'components';

class AngkeiteuList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List mode={this.props.mode} data={this.props.data}>
        <Angkeiteu>
          <LinkBtn>open</LinkBtn>
        </Angkeiteu>
      </List>
    );
  }
}

AngkeiteuList.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.array
}

AngkeiteuList.defaultProps = {
  mode: 'default',
  data: []
}

export default AngkeiteuList;
