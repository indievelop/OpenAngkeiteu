import React from 'react';
import PropTypes from 'prop-types';
import { Angkeiteu } from 'components';
import { connect } from 'react-redux';

class AngkeiteuList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const mapToComponets = angkeiteuList => {
      return angkeiteuList.map((angkeiteu, i) => {
        return (
          <Angkeiteu data={angkeiteu}
                     key={angkeiteu._id}
          />
        );
      });
    }

    return (
      <div>
        {mapToComponets(this.props.data)}
      </div>
    );
  }
}

AngkeiteuList.propTypes = {
  data: PropTypes.array
}

AngkeiteuList.defaultProps = {
  data:[]
}

export default AngkeiteuList;
