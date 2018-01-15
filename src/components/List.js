import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }

  renderChildren(item) {
    let itemElement = null;

    return React.Children.map(this.props.children, child => {
      itemElement = React.cloneElement(child, {
        'data': item
      });
      return (
        <div className={child.props.className}>
           {itemElement}
        </div>
      );
    });
  }

  render() {
    const mapToComponets = list => {
      return list.map((item, i) => {
        return (
          <div key={item._id}>
            {this.renderChildren(item)}
          </div>
        );
      });
    }

    return (
      <div className={this.props.className || ''}>
        {mapToComponets(this.props.data)}
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.array
}

List.defaultProps = {
  data: []
}

export default List;
