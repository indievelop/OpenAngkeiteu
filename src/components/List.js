import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }

  renderChildren(item) {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        'data': item
      });
    });
  }

  render() {
    const mapToComponets = list => {
      return list.map((item, i) => {
        return (
          <div className={this.props.mode === 'only s12' ? 'col s12' : 'col s12 l3'}
               key={item._id}>
            {this.renderChildren(item)}
          </div>
        );
      });
    }

    return (
      <div className='row'>
        {mapToComponets(this.props.data)}
      </div>
    );
  }
}

List.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.array
}

List.defaultProps = {
  mode: 'default',
  data: []
}

export default List;
