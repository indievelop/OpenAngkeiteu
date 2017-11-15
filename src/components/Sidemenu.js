import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openSearchView } from 'actions/search';

class Sidemenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const searchButton = (
        <a onClick={this.props.openSearchView}>
          <i className='material-icons'>search</i>
          search
        </a>
    );

    const writeButton = (
        <Link to='/writeAngkeiteu'>
          <i className='material-icons'>create</i>
              write Angkeiteu
        </Link>
    );

    return (
      <div>
        <ul id='slide-out' className='side-nav'>
          <li>{searchButton}</li>
          <li>{writeButton}</li>
          <li><a>option1</a></li>
          <li><a>option2</a></li>
        </ul>
      </div>
    );
  }
}

Sidemenu.propTypes = {
  isLoggedIn: PropTypes.bool
};

Sidemenu.defaultProps = {
  isLoggedIn: false
};

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.authentication.status.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSearchView: () => {
      return dispatch(openSearchView());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu);
