import React from 'react';
import PropTypes from 'prop-types';
import { Angkeiteu } from 'components';

class AngkeiteuList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const mapToComponets = angkeiteuList => {
      return angkeiteuList.map((angkeiteu, i) => {
        return (
          <div className={this.props.mode === 'only s12' ? 'col s12' : 'col s12 l3'}
               key={angkeiteu._id}>
            <Angkeiteu data={angkeiteu}/>
          </div>
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
  mode: PropTypes.string,
  data: PropTypes.array
}

AngkeiteuList.defaultProps = {
  mode: 'default',
  data:[]
}

export default AngkeiteuList;
