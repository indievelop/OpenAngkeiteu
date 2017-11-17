import React from 'react';
import PropTypes from 'prop-types';
import { AngkeiteuForm } from 'components'

class WriteAngkeiteu extends React.Component {
  constructor(props) {
      super(props);
      this.handleCompleteCreate = this.handleCompleteCreate.bind(this);
  }

  handleCompleteCreate(id) {
    this.props.history.push('/readAngkeiteu/'+id);
  }

  render() {
    return (
      <div className='container writeAngkeiteu'>
        <AngkeiteuForm mode='createNewAngkeiteu'
                       onCompleteCreate={this.handleCompleteCreate}
        />
      </div>
    );
  }
}

export default WriteAngkeiteu;
