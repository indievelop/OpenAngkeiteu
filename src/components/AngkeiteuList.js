import React from 'react';
import PropTypes from 'prop-types';
import { Angkeiteu, List, LinkBtn } from 'components';

class AngkeiteuList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List className='row' data={this.props.data}>
        <Angkeiteu className='col s12 l3'>
          <LinkBtn>open</LinkBtn>
        </Angkeiteu>
      </List>
    );
  }
}

AngkeiteuList.propTypes = {
  data: PropTypes.array
}

AngkeiteuList.defaultProps = {
  data: []
}

export default AngkeiteuList;
