import React from 'react';
import PropTypes from 'prop-types';
import { ImageView } from 'components';

class Option extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { option, accountParticipation, handleChange, selectedOptionId,
          handleCreateTargetAngkeiteu } = this.props;

    return (
      <div className='row'>
        <div className='col s10'>
          <input name='selectedOptionId'
                 type='radio'
                 onChange={handleChange}
                 checked={typeof accountParticipation === 'undefined' ?
                          selectedOptionId === option._id :
                          accountParticipation.selectedOptionId === option._id}
                 disabled={typeof accountParticipation !== 'undefined'}
                 value={option._id}
                 id={option._id}/>
          <label htmlFor={option._id}>{option.description}</label>
        </div>
        <div className='col s2'>
          <a className='waves-effect waves-light btn'
             onClick={() => {handleCreateTargetAngkeiteu(option)}}>
            <i className='material-icons center'>create</i>
          </a>
        </div>
        <div className='col s12'>
          <ImageView objId={option._id} width={400} height={400}/>
        </div>
      </div>
    );
  }
}

export default Option;
