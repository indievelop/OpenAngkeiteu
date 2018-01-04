import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngkeiteuForm } from 'components'
import { init, complete } from 'actions/angkeiteuCreator';

class AngkeiteuCreator extends React.Component {
  constructor(props) {
      super(props);
      this.handleCompleteCreate = this.handleCompleteCreate.bind(this);
  }

  handleCompleteCreate(id) {
    this.props.complete();
    this.props.history.push('/readAngkeiteu/' + id);
  }

  render() {
    let {angkeiteuCreatorStaus} = this.props;

    return (
      <div className='row'>
        <div className='col s12 m8 offset-m2 '>
          <AngkeiteuForm triggerOption={angkeiteuCreatorStaus.triggerOption}
                         onCompleteCreate={this.handleCompleteCreate}
          />
        </div>
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
    init: (triggerOption) => {
      return dispatch(init(triggerOption));
    },
    complete: () => {
      return dispatch(complete());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AngkeiteuCreator);
