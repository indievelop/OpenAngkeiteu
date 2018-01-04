import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngkeiteuCreator } from 'components'
import { init as angkeiteuCreatorInit } from 'actions/angkeiteuCreator';

class WriteAngkeiteu extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    this.props.angkeiteuCreatorInit();
  }

  render() {

    return (
      <div className='container writeAngkeiteu'>
        <AngkeiteuCreator history={this.props.history}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        angkeiteuCreatorStaus: state.angkeiteuCreator
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    angkeiteuCreatorInit: (triggerOption) => {
      return dispatch(angkeiteuCreatorInit(triggerOption));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteAngkeiteu);
