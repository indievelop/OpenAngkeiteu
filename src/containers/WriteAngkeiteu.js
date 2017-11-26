import React from 'react';
import PropTypes from 'prop-types';
import { AngkeiteuForm } from 'components'

class WriteAngkeiteu extends React.Component {
  constructor(props) {
      super(props);
      this.handleCompleteCreate = this.handleCompleteCreate.bind(this);
  }

  handleCompleteCreate(id) {
    this.props.history.push('/readAngkeiteu/' + id);
  }

  render() {
    return (
      <div className='container writeAngkeiteu'>
        <div className='row'>
          <div className='col s8 offset-s2'>
            <AngkeiteuForm mode='RootAngkeiteu'
                           onCompleteCreate={this.handleCompleteCreate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WriteAngkeiteu;
